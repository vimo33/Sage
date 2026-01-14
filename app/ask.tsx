import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Linking,
  useColorScheme,
  BackHandler,
} from 'react-native';
import { useSageStore, type ChatMessage, type SessionSummary } from '../lib/storage/store';
import { generateAssistantResult, regenerateAssistantResult, generateSessionSummary, shouldGenerateSessionSummary, generateToneVariants, type RegenerateOptions, type ToneVariants, type ToneVariantType, type AssistantResult } from '../lib/chat/service';
import { isModelReady, getModelStatus } from '../lib/llm/inference';
import { getWisdomDBDiagnostics } from '../lib/retrieval/search';
import { speakAssistantReply, stopSpeaking, type TTSEventCallbacks } from '../lib/tts/service';
import { HapticPatterns } from '../lib/haptics';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';
import { calculateReadingTime } from '../lib/ui/text-metrics';
import {
  analyzeCrisisSignals,
  getSupportMessage,
  getDefaultResources,
  type CrisisAnalysisResult,
  type CrisisResource,
} from '../lib/safety';
import { JournalEntryModal } from '../components/journal/JournalEntryModal';
import { PracticeOptionsModal, PracticeSessionModal, BreathTimerModal } from '../components/practice';
import { RegenerateOptionsModal, SessionSummaryModal, ToneVariantsModal } from '../components/chat';
import { PassageContextModal } from '../components/chat/PassageContextModal';
import { generatePracticeOptions, type PracticeOption, type BreathingPattern } from '../lib/practice';
import { VoiceInputButton } from '../components/voice';

export default function AskScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { prompt } = useLocalSearchParams<{ prompt?: string }>();

  const [input, setInput] = useState('');
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);
  const [crisisResult, setCrisisResult] = useState<CrisisAnalysisResult | null>(null);
  const [crisisResources, setCrisisResources] = useState<CrisisResource[]>([]);
  const [savedVerses, setSavedVerses] = useState<Set<string>>(new Set());
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [journalInitialContent, setJournalInitialContent] = useState('');
  const [practiceOptionsVisible, setPracticeOptionsVisible] = useState(false);
  const [practiceSessionVisible, setPracticeSessionVisible] = useState(false);
  const [practiceOptions, setPracticeOptions] = useState<PracticeOption[]>([]);
  const [selectedPractice, setSelectedPractice] = useState<PracticeOption | null>(null);
  const [practiceContext, setPracticeContext] = useState<string>('');
  const [regenerateModalVisible, setRegenerateModalVisible] = useState(false);
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [toneVariantsModalVisible, setToneVariantsModalVisible] = useState(false);
  const [toneVariantsMessageId, setToneVariantsMessageId] = useState<string | null>(null);
  const [toneVariants, setToneVariants] = useState<ToneVariants | null>(null);
  const [isGeneratingToneVariants, setIsGeneratingToneVariants] = useState(false);
  const [sessionSummaryVisible, setSessionSummaryVisible] = useState(false);
  const [currentSessionSummary, setCurrentSessionSummary] = useState<SessionSummary | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [breathTimerVisible, setBreathTimerVisible] = useState(false);
  const [passageContextVisible, setPassageContextVisible] = useState(false);
  const [selectedCitationRef, setSelectedCitationRef] = useState<string>('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [llmTestResult, setLlmTestResult] = useState<string>('');
  const [wisdomDbStatus, setWisdomDbStatus] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const sessionStartTimeRef = useRef<number>(Date.now());

  const chatHistory = useSageStore((s) => s.chatHistory);
  const addChatMessage = useSageStore((s) => s.addChatMessage);
  const updateChatMessage = useSageStore((s) => s.updateChatMessage);
  const isGenerating = useSageStore((s) => s.isGenerating);
  const setIsGenerating = useSageStore((s) => s.setIsGenerating);
  const preferences = useSageStore((s) => s.preferences);
  const saveInsight = useSageStore((s) => s.saveInsight);
  const isVerseSaved = useSageStore((s) => s.isVerseSaved);
  const isSpeaking = useSageStore((s) => s.isSpeaking);
  const speakingMessageId = useSageStore((s) => s.speakingMessageId);
  const setTTSState = useSageStore((s) => s.setTTSState);
  const startTimeSession = useSageStore((s) => s.startTimeSession);
  const endTimeSession = useSageStore((s) => s.endTimeSession);
  const startPracticeSession = useSageStore((s) => s.startPracticeSession);
  const completePracticeSession = useSageStore((s) => s.completePracticeSession);
  const addJournalEntry = useSageStore((s) => s.addJournalEntry);
  const markSessionSummarySavedToJournal = useSageStore((s) => s.markSessionSummarySavedToJournal);
  const clearChatHistory = useSageStore((s) => s.clearChatHistory);
  const addToSearchHistory = useSageStore((s) => s.addToSearchHistory);

  // Track chat session time
  const chatSessionIdRef = useRef<string | null>(null);

  // Handle session summary generation when leaving the screen
  const handleExitWithSummary = useCallback(async () => {
    const durationMs = Date.now() - sessionStartTimeRef.current;

    if (shouldGenerateSessionSummary(chatHistory, durationMs)) {
      setIsGeneratingSummary(true);
      setSessionSummaryVisible(true);

      try {
        const summary = await generateSessionSummary(
          chatHistory,
          preferences,
          chatSessionIdRef.current || '',
          durationMs
        );
        setCurrentSessionSummary(summary);
      } catch (error) {
        console.error('[Sage] Failed to generate session summary:', error);
        // Close the modal if summary generation fails
        setSessionSummaryVisible(false);
      } finally {
        setIsGeneratingSummary(false);
      }
    }
  }, [chatHistory, preferences]);

  useFocusEffect(
    useCallback(() => {
      // Start time tracking when screen comes into focus
      chatSessionIdRef.current = startTimeSession('chat');
      sessionStartTimeRef.current = Date.now();

      return () => {
        // End time tracking when screen loses focus
        if (chatSessionIdRef.current) {
          endTimeSession(chatSessionIdRef.current);
          chatSessionIdRef.current = null;
        }
      };
    }, [startTimeSession, endTimeSession])
  );

  // Handle back button press on Android to show summary
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const durationMs = Date.now() - sessionStartTimeRef.current;

      // If session qualifies for summary and modal isn't already visible
      if (shouldGenerateSessionSummary(chatHistory, durationMs) && !sessionSummaryVisible) {
        handleExitWithSummary();
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior
    });

    return () => backHandler.remove();
  }, [chatHistory, sessionSummaryVisible, handleExitWithSummary]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory, isGenerating]);

  // Pre-fill input from query parameter (for quick re-ask functionality)
  useEffect(() => {
    if (prompt) {
      setInput(prompt);
    }
  }, [prompt]);

  // Start TTS for a specific message
  const startTTSForMessage = useCallback((messageId: string, content: string) => {
    const callbacks: TTSEventCallbacks = {
      onStart: () => setTTSState(true, messageId),
      onDone: () => setTTSState(false, null),
      onStopped: () => setTTSState(false, null),
      onError: () => setTTSState(false, null),
    };
    // Trigger haptic feedback when TTS starts
    void HapticPatterns.startTTS();
    void speakAssistantReply(content, preferences, callbacks);
  }, [preferences, setTTSState]);

  // Stop TTS playback
  const handleStopTTS = useCallback(() => {
    stopSpeaking();
    setTTSState(false, null);
  }, [setTTSState]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput('');

    // Scan for crisis signals before processing
    const crisisAnalysis = analyzeCrisisSignals(userText);

    if (crisisAnalysis.shouldShowResources) {
      // Store crisis result and show resources modal
      setCrisisResult(crisisAnalysis);
      setCrisisResources(getDefaultResources());
      setCrisisModalVisible(true);
    }

    addChatMessage({ role: 'user', content: userText });

    setIsGenerating(true);
    try {
      const result = await generateAssistantResult(userText, preferences, chatHistory);
      addChatMessage({
        role: 'assistant',
        content: result.content,
        citedVerses: result.citedVerses,
      });

      // Add to search history for quick re-ask functionality
      const responsePreview = result.content.length > 150
        ? result.content.slice(0, 150) + '...'
        : result.content;
      addToSearchHistory({
        question: userText,
        responsePreview,
        citedVerses: result.citedVerses,
      });

      // TTS will be started after message is added, using the new message ID
      // The message ID is generated in addChatMessage, so we need to get it from the updated chatHistory
      if (preferences.narrateResponses) {
        // Generate message ID in the same way the store does
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const callbacks: TTSEventCallbacks = {
          onStart: () => setTTSState(true, messageId),
          onDone: () => setTTSState(false, null),
          onStopped: () => setTTSState(false, null),
          onError: () => setTTSState(false, null),
        };
        void speakAssistantReply(result.content, preferences, callbacks);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      addChatMessage({
        role: 'assistant',
        content: "I'm sorry, I encountered an error while reflecting. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Voice input handler - receives transcription and sets it as input
  const handleVoiceTranscript = useCallback((transcript: string) => {
    setInput(transcript);
  }, []);

  // Voice recording state handlers
  const handleVoiceRecordingStart = useCallback(() => {
    setIsVoiceRecording(true);
  }, []);

  const handleVoiceRecordingEnd = useCallback(() => {
    setIsVoiceRecording(false);
  }, []);

  const handleDismissCrisisModal = () => {
    setCrisisModalVisible(false);
    setCrisisResult(null);
  };

  const handleCallResource = (contact: string) => {
    // Extract phone number if present
    const phoneMatch = contact.match(/(\d{3,})/);
    if (phoneMatch) {
      const phoneNumber = phoneMatch[0];
      Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
        console.error('Failed to open phone:', err)
      );
    }
  };

  const handleTextResource = (contact: string) => {
    // Extract phone number for SMS
    const phoneMatch = contact.match(/(\d{5,})/);
    if (phoneMatch) {
      const phoneNumber = phoneMatch[0];
      Linking.openURL(`sms:${phoneNumber}`).catch((err) =>
        console.error('Failed to open SMS:', err)
      );
    }
  };

  const getVerseKey = (content: string, sourceRef: string) => `${content}::${sourceRef}`;

  const handleSaveVerse = useCallback((verseContent: string, sourceRef: string) => {
    const key = getVerseKey(verseContent, sourceRef);

    // Check for duplicates using the store's helper
    if (isVerseSaved(verseContent, sourceRef) || savedVerses.has(key)) {
      return;
    }

    saveInsight({
      verseContent,
      sourceRef,
    });

    // Trigger haptic feedback for save insight action
    void HapticPatterns.saveInsight();

    // Update local state for immediate UI feedback
    setSavedVerses((prev) => new Set(prev).add(key));
  }, [isVerseSaved, saveInsight, savedVerses]);

  const isVerseAlreadySaved = useCallback((content: string, sourceRef: string) => {
    const key = getVerseKey(content, sourceRef);
    return savedVerses.has(key) || isVerseSaved(content, sourceRef);
  }, [savedVerses, isVerseSaved]);

  const handleCitationTap = useCallback((sourceRef: string) => {
    setSelectedCitationRef(sourceRef);
    setPassageContextVisible(true);
    void HapticPatterns.buttonPress();
  }, []);

  const handleClosePassageContext = useCallback(() => {
    setPassageContextVisible(false);
    setSelectedCitationRef('');
  }, []);

  const handleSaveToJournal = useCallback((assistantMessage: ChatMessage) => {
    // Find the preceding user message
    const msgIndex = chatHistory.findIndex((m) => m.id === assistantMessage.id);
    const userMessage = msgIndex > 0 ? chatHistory[msgIndex - 1] : null;

    // Format the content for journal entry
    let journalContent = '';

    if (userMessage && userMessage.role === 'user') {
      journalContent += `My Question:\n${userMessage.content}\n\n`;
    }

    journalContent += `Sage's Guidance:\n${assistantMessage.content}`;

    // Add citations if present
    if (assistantMessage.citedVerses && assistantMessage.citedVerses.length > 0) {
      journalContent += '\n\nWisdom Sources:';
      assistantMessage.citedVerses.forEach((verse) => {
        journalContent += `\n- ${verse.sourceRef}`;
      });
    }

    journalContent += '\n\n---\n\nMy Reflections:\n';

    setJournalInitialContent(journalContent);
    setJournalModalVisible(true);
  }, [chatHistory]);

  const handleCloseJournalModal = useCallback(() => {
    setJournalModalVisible(false);
    setJournalInitialContent('');
  }, []);

  // Practice handlers
  const handleOpenPracticeOptions = useCallback((assistantMessage: ChatMessage) => {
    // Get conversation context from the user's message and assistant's response
    const msgIndex = chatHistory.findIndex((m) => m.id === assistantMessage.id);
    const userMessage = msgIndex > 0 ? chatHistory[msgIndex - 1] : null;

    const context = userMessage?.role === 'user'
      ? `${userMessage.content} ${assistantMessage.content}`
      : assistantMessage.content;

    setPracticeContext(context);

    // Generate practice options based on conversation context
    const options = generatePracticeOptions(context, preferences.tone);
    setPracticeOptions(options);
    setPracticeOptionsVisible(true);
  }, [chatHistory, preferences.tone]);

  const handleSelectPractice = useCallback((option: PracticeOption) => {
    setSelectedPractice(option);
    setPracticeOptionsVisible(false);

    // Start practice session in store
    startPracticeSession(option.templateId, option.duration, practiceContext);

    // Open practice session modal
    setPracticeSessionVisible(true);
  }, [startPracticeSession, practiceContext]);

  const handleClosePracticeOptions = useCallback(() => {
    setPracticeOptionsVisible(false);
    setPracticeOptions([]);
  }, []);

  const handleClosePracticeSession = useCallback(() => {
    setPracticeSessionVisible(false);
    setSelectedPractice(null);
  }, []);

  const handleCompletePractice = useCallback((reflection?: string) => {
    completePracticeSession(reflection);
    setPracticeSessionVisible(false);
    setSelectedPractice(null);
  }, [completePracticeSession]);

  // Breath timer handlers
  const handleOpenBreathTimer = useCallback(() => {
    setBreathTimerVisible(true);
  }, []);

  const handleCloseBreathTimer = useCallback(() => {
    setBreathTimerVisible(false);
  }, []);

  const handleCompleteBreathTimer = useCallback((cycles: number, pattern: BreathingPattern) => {
    // Track the breath practice session
    const sessionId = startPracticeSession('grounding_breath', 'short', `Breath timer: ${pattern.name}`);
    // Mark it as complete immediately
    completePracticeSession(`Completed ${cycles} rounds of ${pattern.name}`);
    setBreathTimerVisible(false);
  }, [startPracticeSession, completePracticeSession]);

  // Regenerate handlers
  const handleOpenRegenerateModal = useCallback((messageId: string) => {
    setRegeneratingMessageId(messageId);
    setRegenerateModalVisible(true);
  }, []);

  const handleCloseRegenerateModal = useCallback(() => {
    if (!isRegenerating) {
      setRegenerateModalVisible(false);
      setRegeneratingMessageId(null);
    }
  }, [isRegenerating]);

  const handleRegenerate = useCallback(async (options: RegenerateOptions) => {
    if (!regeneratingMessageId) return;

    // Find the assistant message and the preceding user message
    const msgIndex = chatHistory.findIndex((m) => m.id === regeneratingMessageId);
    if (msgIndex < 0) return;

    const assistantMessage = chatHistory[msgIndex];
    if (assistantMessage.role !== 'assistant') return;

    // Find the user message that triggered this response
    let userMessage: ChatMessage | null = null;
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (chatHistory[i].role === 'user') {
        userMessage = chatHistory[i];
        break;
      }
    }

    if (!userMessage) return;

    // Get messages up to (but not including) the current user message for context
    const previousMessages = chatHistory
      .slice(0, msgIndex - 1)
      .map((m) => ({ role: m.role, content: m.content }));

    setIsRegenerating(true);

    try {
      const result = await regenerateAssistantResult(
        userMessage.content,
        preferences,
        previousMessages,
        options
      );

      // Update the existing message with new content
      updateChatMessage(regeneratingMessageId, {
        content: result.content,
        citedVerses: result.citedVerses,
      });

      // Close modal on success
      setRegenerateModalVisible(false);
      setRegeneratingMessageId(null);
    } catch (error) {
      console.error('Regeneration failed:', error);
      // Keep modal open on failure so user can try again
    } finally {
      setIsRegenerating(false);
    }
  }, [regeneratingMessageId, chatHistory, preferences, updateChatMessage]);

  // Tone variants handlers
  const handleOpenToneVariants = useCallback(async (messageId: string) => {
    // Find the assistant message and the preceding user message
    const msgIndex = chatHistory.findIndex((m) => m.id === messageId);
    if (msgIndex < 0) return;

    const assistantMessage = chatHistory[msgIndex];
    if (assistantMessage.role !== 'assistant') return;

    // Find the user message that triggered this response
    let userMessage: ChatMessage | null = null;
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (chatHistory[i].role === 'user') {
        userMessage = chatHistory[i];
        break;
      }
    }

    if (!userMessage) return;

    // Get messages up to (but not including) the current user message for context
    const previousMessages = chatHistory
      .slice(0, msgIndex - 1)
      .map((m) => ({ role: m.role, content: m.content }));

    setToneVariantsMessageId(messageId);
    setToneVariantsModalVisible(true);
    setIsGeneratingToneVariants(true);
    setToneVariants(null);

    try {
      const variants = await generateToneVariants(userMessage.content, previousMessages);
      setToneVariants(variants);
    } catch (error) {
      console.error('Tone variants generation failed:', error);
      // Close modal on failure
      setToneVariantsModalVisible(false);
      setToneVariantsMessageId(null);
    } finally {
      setIsGeneratingToneVariants(false);
    }
  }, [chatHistory]);

  const handleCloseToneVariants = useCallback(() => {
    if (!isGeneratingToneVariants) {
      setToneVariantsModalVisible(false);
      setToneVariantsMessageId(null);
      setToneVariants(null);
    }
  }, [isGeneratingToneVariants]);

  const handleSelectToneVariant = useCallback((tone: ToneVariantType, result: AssistantResult) => {
    if (!toneVariantsMessageId) {
      console.warn('[Sage] handleSelectToneVariant: No message ID');
      return;
    }

    // Safeguard: Don't update if result has no content (would make response disappear)
    if (!result || !result.content || result.content.trim().length === 0) {
      console.warn('[Sage] handleSelectToneVariant: Empty result, not updating message');
      // Just close the modal without updating
      setToneVariantsModalVisible(false);
      setToneVariantsMessageId(null);
      setToneVariants(null);
      return;
    }

    console.log('[Sage] handleSelectToneVariant: Updating message with', tone, 'variant, content length:', result.content.length);

    // Update the existing message with the selected tone variant
    updateChatMessage(toneVariantsMessageId, {
      content: result.content,
      citedVerses: result.citedVerses,
    });

    // Close the modal
    setToneVariantsModalVisible(false);
    setToneVariantsMessageId(null);
    setToneVariants(null);
  }, [toneVariantsMessageId, updateChatMessage]);

  // Session summary handlers
  const handleCloseSessionSummary = useCallback(() => {
    setSessionSummaryVisible(false);
    setCurrentSessionSummary(null);
    // Clear chat history after showing summary
    clearChatHistory();
    router.back();
  }, [clearChatHistory]);

  const handleSaveSummaryToJournal = useCallback(() => {
    if (!currentSessionSummary) return;

    // Format the summary as a journal entry
    let journalContent = `Session Summary\n\n`;
    journalContent += currentSessionSummary.summaryText;

    if (currentSessionSummary.themes.length > 0) {
      const themeLabels = currentSessionSummary.themes.map(
        (t) => t.charAt(0).toUpperCase() + t.slice(1)
      );
      journalContent += `\n\nThemes: ${themeLabels.join(', ')}`;
    }

    if (currentSessionSummary.keyInsights.length > 0) {
      journalContent += '\n\nWisdom Sources:';
      currentSessionSummary.keyInsights.forEach((insight) => {
        journalContent += `\n- ${insight.sourceRef}`;
      });
    }

    const durationMins = Math.round(currentSessionSummary.durationMs / 60000);
    journalContent += `\n\n---\nSession: ${currentSessionSummary.messageCount} messages, ${durationMins} min`;

    addJournalEntry({
      content: journalContent,
      mood: undefined,
      linkedInsightIds: [],
    });

    // Mark summary as saved
    markSessionSummarySavedToJournal(currentSessionSummary.id);
    setCurrentSessionSummary({
      ...currentSessionSummary,
      savedToJournal: true,
    });
  }, [currentSessionSummary, addJournalEntry, markSessionSummarySavedToJournal]);

  // Handle back button press to show session summary
  const handleBackPress = useCallback(() => {
    const durationMs = Date.now() - sessionStartTimeRef.current;

    if (shouldGenerateSessionSummary(chatHistory, durationMs) && !sessionSummaryVisible) {
      handleExitWithSummary();
    } else {
      router.back();
    }
  }, [chatHistory, sessionSummaryVisible, handleExitWithSummary]);

  const styles = createStyles(colors, isDark);

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.role === 'user';
    
    if (isUser) {
      return (
        <View key={msg.id} style={styles.userMessageContainer}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{msg.content}</Text>
          </View>
        </View>
      );
    }

    // Calculate reading time for assistant messages
    const readingTime = calculateReadingTime(msg.content);

    return (
      <View key={msg.id} style={styles.assistantMessageContainer}>
        <View style={styles.assistantAvatar}>
          <Text style={styles.avatarEmoji}>🌿</Text>
        </View>
        <View style={styles.assistantBubble}>
          <Text style={styles.assistantText}>{msg.content}</Text>
          {/* Reading time indicator */}
          <View style={styles.readingTimeContainer} testID="reading-time-indicator">
            <Text style={styles.readingTimeIcon}>⏱</Text>
            <Text style={styles.readingTimeText}>{readingTime.formatted}</Text>
          </View>
          {preferences.showCitations && msg.citedVerses && msg.citedVerses.length > 0 && (
            <View testID="citations-container" style={styles.citationsContainer}>
              <Text style={styles.citationsTitle}>CITATIONS</Text>
              <Text style={styles.citationsHint}>Tap to see full context</Text>
              {msg.citedVerses.map((c: { content: string; sourceRef: string }, idx: number) => {
                const isSaved = isVerseAlreadySaved(c.content, c.sourceRef);
                return (
                  <View key={idx} style={styles.citationItem}>
                    <TouchableOpacity
                      testID={`citation-tap-${idx}`}
                      style={styles.citationTappable}
                      onPress={() => handleCitationTap(c.sourceRef)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.citationText} numberOfLines={2}>• {c.sourceRef}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID={`save-insight-btn-${idx}`}
                      style={[styles.saveBtn, isSaved && styles.saveBtnSaved]}
                      onPress={() => handleSaveVerse(c.content, c.sourceRef)}
                      disabled={isSaved}
                    >
                      <Text style={[styles.saveBtnText, isSaved && styles.saveBtnTextSaved]}>
                        {isSaved ? 'Saved' : 'Save'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
          {/* Message actions: TTS control and Save to Journal */}
          <View style={styles.messageActionsContainer}>
            {/* TTS Button - Listen or Stop depending on state */}
            {preferences.narrateResponses && (
              <TouchableOpacity
                testID="tts-control-btn"
                style={[
                  styles.ttsBtn,
                  isSpeaking && speakingMessageId === msg.id && styles.ttsBtnActive,
                ]}
                onPress={() => {
                  if (isSpeaking && speakingMessageId === msg.id) {
                    handleStopTTS();
                  } else {
                    startTTSForMessage(msg.id, msg.content);
                  }
                }}
              >
                {isSpeaking && speakingMessageId === msg.id ? (
                  <>
                    <View style={styles.ttsSpeakingIndicator}>
                      <View style={styles.ttsSpeakingDot} />
                      <View style={[styles.ttsSpeakingDot, styles.ttsSpeakingDotDelayed]} />
                      <View style={[styles.ttsSpeakingDot, styles.ttsSpeakingDotDelayed2]} />
                    </View>
                    <Text style={styles.ttsBtnTextActive}>Stop</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.ttsBtnIcon}>🔊</Text>
                    <Text style={styles.ttsBtnText}>Listen</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity
              testID="regenerate-btn"
              style={styles.regenerateBtn}
              onPress={() => handleOpenRegenerateModal(msg.id)}
              disabled={isGenerating || isRegenerating}
            >
              <Text style={styles.regenerateBtnIcon}>🔄</Text>
              <Text style={styles.regenerateBtnText}>Regenerate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="save-to-journal-btn"
              style={styles.saveToJournalBtn}
              onPress={() => handleSaveToJournal(msg)}
            >
              <Text style={styles.saveToJournalIcon}>📝</Text>
              <Text style={styles.saveToJournalText}>Save to Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="start-practice-btn"
              style={styles.practiceBtn}
              onPress={() => handleOpenPracticeOptions(msg)}
            >
              <Text style={styles.practiceBtnIcon}>🧘</Text>
              <Text style={styles.practiceBtnText}>Practice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="breathe-btn"
              style={styles.breatheBtn}
              onPress={handleOpenBreathTimer}
            >
              <Text style={styles.breatheBtnIcon}>🌬️</Text>
              <Text style={styles.breatheBtnText}>Breathe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="tone-variants-btn"
              style={styles.toneVariantsBtn}
              onPress={() => handleOpenToneVariants(msg.id)}
              disabled={isGenerating || isRegenerating || isGeneratingToneVariants}
            >
              <Text style={styles.toneVariantsBtnIcon}>✨</Text>
              <Text style={styles.toneVariantsBtnText}>Tones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backBtn} testID="back-btn">
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ask Sage</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Debug indicator with test button */}
        {(() => {
          const status = getModelStatus();
          const backgroundColor = status.ready ? '#22c55e' : (status.contextExists ? '#f59e0b' : '#ef4444');
          const statusText = status.ready
            ? '✅ READY (Verified)'
            : (status.contextExists
                ? `⚠️ CONTEXT EXISTS but NOT VERIFIED`
                : '❌ NO CONTEXT');

          const runLLMTest = async () => {
            setLlmTestResult('Testing...');
            try {
              const { generateChat } = require('../lib/llm/inference');
              const result = await generateChat(
                [{ role: 'user', content: 'Say hello in one word' }],
                { nPredict: 10, temperature: 0.5 }
              );
              setLlmTestResult(`OK: "${(result.content || result.text || 'empty').substring(0, 50)}" (${result.tokensPredicted} tokens)`);
            } catch (error: unknown) {
              setLlmTestResult(`ERR: ${error instanceof Error ? error.message : String(error)}`);
            }
          };

          const runWisdomDBTest = async () => {
            setWisdomDbStatus('Checking...');
            try {
              const diag = await getWisdomDBDiagnostics();
              const sizeKB = Math.round(diag.dbSize / 1024);
              const shortPath = diag.dbPath?.split('/').slice(-3).join('/') || 'null';
              const shortActual = diag.actualDbPath?.split('/').slice(-3).join('/') || 'null';
              setWisdomDbStatus(
                `Loaded: ${diag.dbLoaded ? '✅' : '❌'} | ` +
                `Exists: ${diag.dbExists ? '✅' : '❌'} | ` +
                `${sizeKB}KB | ` +
                `Chunks: ${diag.chunkCount}\n` +
                `CopyPath: ${shortPath}\n` +
                `ActualDB: ${shortActual}`
              );
            } catch (error: unknown) {
              setWisdomDbStatus(`ERR: ${error instanceof Error ? error.message : String(error)}`);
            }
          };

          return (
            <View style={{ backgroundColor, padding: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600', flex: 1 }}>
                  LLM: {statusText}
                </Text>
                <TouchableOpacity
                  onPress={runLLMTest}
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 4 }}
                >
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>LLM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={runWisdomDBTest}
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}
                >
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>DB</Text>
                </TouchableOpacity>
              </View>
              {llmTestResult ? (
                <Text style={{ color: '#fff', fontSize: 10, marginTop: 4 }}>{llmTestResult}</Text>
              ) : null}
              {wisdomDbStatus ? (
                <Text style={{ color: '#fff', fontSize: 10, marginTop: 2 }}>{wisdomDbStatus}</Text>
              ) : null}
            </View>
          );
        })()}

        <ScrollView 
          ref={scrollViewRef}
          style={styles.flex}
          contentContainerStyle={styles.scrollContainer}
        >
          {chatHistory.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✨</Text>
              <Text style={styles.emptyTitle}>What's alive for you?</Text>
              <Text style={styles.emptySubtitle}>Share a thought, a fear, or a question. Sage will reflect with you.</Text>
            </View>
          )}
          
          {chatHistory.map(renderMessage)}
          
          {isGenerating && (
            <View style={styles.assistantMessageContainer}>
              <View style={styles.assistantAvatar}>
                <Text style={styles.avatarEmoji}>🌿</Text>
              </View>
              <View style={[styles.assistantBubble, styles.loadingBubble]}>
                <ActivityIndicator color={COLORS.primary} size="small" />
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={isVoiceRecording ? 'Listening...' : "What's alive for you right now?"}
              placeholderTextColor={isVoiceRecording ? COLORS.primary : colors.textMuted}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              editable={!isVoiceRecording}
            />
            <VoiceInputButton
              onTranscript={handleVoiceTranscript}
              onRecordingStart={handleVoiceRecordingStart}
              onRecordingEnd={handleVoiceRecordingEnd}
              disabled={isGenerating}
              testID="voice-input-btn"
            />
            <TouchableOpacity
              style={[styles.sendBtn, (!input.trim() || isGenerating) && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!input.trim() || isGenerating}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>Not medical advice • All data stays on device</Text>
        </View>
      </KeyboardAvoidingView>

      {/* Crisis Resources Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={crisisModalVisible}
        onRequestClose={handleDismissCrisisModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.crisisModal}>
            <View style={styles.crisisHeader}>
              <Text style={styles.crisisHeaderIcon}>💚</Text>
              <Text style={styles.crisisHeaderTitle}>You Matter</Text>
            </View>

            <Text style={styles.crisisSupportMessage}>
              {crisisResult ? getSupportMessage(crisisResult.severity) : ''}
            </Text>

            <View style={styles.crisisResourcesContainer}>
              <Text style={styles.crisisResourcesTitle}>IMMEDIATE SUPPORT</Text>
              {crisisResources.map((resource, index) => (
                <View key={index} style={styles.crisisResourceItem}>
                  <View style={styles.crisisResourceInfo}>
                    <Text style={styles.crisisResourceName}>{resource.name}</Text>
                    <Text style={styles.crisisResourceDescription}>{resource.description}</Text>
                    <Text style={styles.crisisResourceContact}>{resource.contact}</Text>
                  </View>
                  <View style={styles.crisisResourceActions}>
                    {resource.isTextBased ? (
                      <TouchableOpacity
                        style={styles.crisisActionBtn}
                        onPress={() => handleTextResource(resource.contact)}
                      >
                        <Text style={styles.crisisActionText}>Text</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.crisisActionBtn}
                        onPress={() => handleCallResource(resource.contact)}
                      >
                        <Text style={styles.crisisActionText}>Call</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.crisisDismissBtn}
              onPress={handleDismissCrisisModal}
            >
              <Text style={styles.crisisDismissText}>I understand, continue to Sage</Text>
            </TouchableOpacity>

            <Text style={styles.crisisDisclaimer}>
              Sage is not a substitute for professional mental health care.
              If you are in immediate danger, please call emergency services.
            </Text>
          </View>
        </View>
      </Modal>

      {/* Journal Entry Modal */}
      <JournalEntryModal
        visible={journalModalVisible}
        onClose={handleCloseJournalModal}
        initialContent={journalInitialContent}
      />

      {/* Practice Options Modal */}
      <PracticeOptionsModal
        visible={practiceOptionsVisible}
        onClose={handleClosePracticeOptions}
        onSelectPractice={handleSelectPractice}
        options={practiceOptions}
        conversationContext={practiceContext}
      />

      {/* Practice Session Modal */}
      <PracticeSessionModal
        visible={practiceSessionVisible}
        onClose={handleClosePracticeSession}
        onComplete={handleCompletePractice}
        practiceOption={selectedPractice}
      />

      {/* Regenerate Options Modal */}
      <RegenerateOptionsModal
        visible={regenerateModalVisible}
        onClose={handleCloseRegenerateModal}
        onRegenerate={handleRegenerate}
        isRegenerating={isRegenerating}
      />

      {/* Tone Variants Modal */}
      <ToneVariantsModal
        visible={toneVariantsModalVisible}
        onClose={handleCloseToneVariants}
        onSelectTone={handleSelectToneVariant}
        toneVariants={toneVariants}
        isGenerating={isGeneratingToneVariants}
      />

      {/* Session Summary Modal */}
      <SessionSummaryModal
        visible={sessionSummaryVisible}
        summary={currentSessionSummary}
        isGenerating={isGeneratingSummary}
        onClose={handleCloseSessionSummary}
        onSaveToJournal={handleSaveSummaryToJournal}
        chatHistory={chatHistory}
      />

      {/* Breath Timer Modal */}
      <BreathTimerModal
        visible={breathTimerVisible}
        onClose={handleCloseBreathTimer}
        onComplete={handleCompleteBreathTimer}
      />

      {/* Passage Context Modal */}
      <PassageContextModal
        visible={passageContextVisible}
        sourceRef={selectedCitationRef}
        onClose={handleClosePassageContext}
        onSaveVerse={handleSaveVerse}
        isVerseSaved={isVerseAlreadySaved}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: withAlpha(COLORS.white, 0.05),
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 24,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: SPACING.xl,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
    borderTopRightRadius: 4,
    maxWidth: '85%',
    ...SHADOWS.sm,
  },
  userText: {
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  assistantMessageContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  assistantAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  avatarEmoji: {
    fontSize: 18,
  },
  assistantBubble: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
    borderTopLeftRadius: 4,
    ...SHADOWS.sm,
  },
  loadingBubble: {
    flex: 0,
    paddingHorizontal: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  assistantText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  // Reading time indicator styles
  readingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  readingTimeIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
  readingTimeText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  citationsContainer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: withAlpha(COLORS.white, 0.1),
  },
  citationsTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  citationsHint: {
    fontSize: 10,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  citationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  citationTappable: {
    flex: 1,
    paddingVertical: SPACING.xs,
  },
  citationText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primary,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  saveBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.primary, 0.15),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  saveBtnSaved: {
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    borderColor: withAlpha(COLORS.primary, 0.3),
  },
  saveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  saveBtnTextSaved: {
    color: withAlpha(COLORS.primary, 0.5),
  },
  messageActionsContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: withAlpha(COLORS.white, 0.05),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  saveToJournalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    borderWidth: 1,
    borderColor: withAlpha(COLORS.primary, 0.3),
    gap: SPACING.xs,
  },
  saveToJournalIcon: {
    fontSize: 14,
  },
  saveToJournalText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Practice Button Styles
  practiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.info, 0.1),
    borderWidth: 1,
    borderColor: withAlpha(COLORS.info, 0.3),
    gap: SPACING.xs,
  },
  practiceBtnIcon: {
    fontSize: 14,
  },
  practiceBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.info,
  },
  // Breathe Button Styles
  breatheBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha('#06b6d4', 0.1), // cyan
    borderWidth: 1,
    borderColor: withAlpha('#06b6d4', 0.3),
    gap: SPACING.xs,
  },
  breatheBtnIcon: {
    fontSize: 14,
  },
  breatheBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#06b6d4', // cyan
  },
  // Tone Variants Button Styles
  toneVariantsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha('#8b5cf6', 0.1), // purple
    borderWidth: 1,
    borderColor: withAlpha('#8b5cf6', 0.3),
    gap: SPACING.xs,
  },
  toneVariantsBtnIcon: {
    fontSize: 14,
  },
  toneVariantsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8b5cf6', // purple
  },
  // Regenerate Button Styles
  regenerateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.warning, 0.1),
    borderWidth: 1,
    borderColor: withAlpha(COLORS.warning, 0.3),
    gap: SPACING.xs,
  },
  regenerateBtnIcon: {
    fontSize: 14,
  },
  regenerateBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.warning,
  },
  // TTS Button Styles
  ttsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.white, 0.05),
    borderWidth: 1,
    borderColor: withAlpha(COLORS.white, 0.1),
    gap: SPACING.xs,
    opacity: 0.6,
  },
  ttsBtnActive: {
    backgroundColor: withAlpha(COLORS.primary, 0.15),
    borderColor: COLORS.primary,
    opacity: 1,
  },
  ttsBtnIcon: {
    fontSize: 12,
  },
  ttsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  ttsBtnTextActive: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  ttsSpeakingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: 2,
  },
  ttsSpeakingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  ttsSpeakingDotDelayed: {
    opacity: 0.7,
  },
  ttsSpeakingDotDelayed2: {
    opacity: 0.4,
  },
  inputArea: {
    backgroundColor: colors.background,
    padding: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
    borderTopWidth: 1,
    borderTopColor: withAlpha(COLORS.white, 0.05),
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.surfaceAlt,
    opacity: 0.5,
  },
  sendIcon: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
  // Crisis Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: withAlpha(COLORS.black, 0.85),
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  crisisModal: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xxl,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: COLORS.danger,
    ...SHADOWS.md,
  },
  crisisHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  crisisHeaderIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  crisisHeaderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  crisisSupportMessage: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  crisisResourcesContainer: {
    marginBottom: SPACING.xl,
  },
  crisisResourcesTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.danger,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  crisisResourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  crisisResourceInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  crisisResourceName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  crisisResourceDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  crisisResourceContact: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  crisisResourceActions: {
    flexDirection: 'row',
  },
  crisisActionBtn: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADII.full,
  },
  crisisActionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  crisisDismissBtn: {
    backgroundColor: colors.surfaceAlt,
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  crisisDismissText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  crisisDisclaimer: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
