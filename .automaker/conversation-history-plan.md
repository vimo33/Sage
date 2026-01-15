# Conversation History & Management - Implementation Plan

## 📋 Executive Summary

**Problem:** The current "Ask Sage" chat system has a clunky UX with:
- Blocking session summary modal on exit (requires multiple user interactions)
- No persistent conversation history
- Lost context when navigating away
- No way to return to past conversations

**Solution:** Implement an auto-save conversation system with:
- Zero-friction auto-save (no manual save needed)
- Conversation history sidebar with smart grouping
- Background session summary generation
- Context-aware conversation bundling

---

## 🎯 Chat Entry Points Analysis

### All Routes to `/ask` Screen

| **Source** | **Entry Point** | **Context Passed** | **User Intent** |
|------------|----------------|-------------------|----------------|
| **Home Screen** | Daily Wisdom Widget | None | Start fresh conversation |
| **Home Screen** | Ask Sage FAB | None | Start fresh conversation |
| **Home Screen** | Recent Questions | `?prompt={question}` | Re-ask previous question |
| **Home Screen** | Community Prompts | `?prompt={promptText}` | Ask community-curated question |
| **Explore Screen** | Ask Sage FAB | None | Start fresh conversation |
| **Explore Screen** | Search Submit | `?prompt={searchQuery}` | Ask typed question |
| **Explore Screen** | Theme Card | `?theme={themeId}` | Theme-based exploration |
| **Theme Detail** | Start Session Button | `theme.route` | Theme-specific session |
| **Theme Detail** | Exercise Card | `?theme={themeId}&exercise={exerciseId}` | Guided exercise |
| **Theme Detail** | Contrast Card | `?theme={themeId}&contrast={contrastId}` | Contrast exploration |
| **Quick Actions** | "Ask Sage" icon press | None | Start fresh conversation |
| **Quick Actions** | "Today's Wisdom" | `?prompt={wisdomPrompt}` | Daily wisdom prompt |

---

## 📊 New Data Model

### ConversationContext

```typescript
export type ConversationSource =
  | 'quick_ask'           // FAB, Daily Wisdom Widget, Quick Actions
  | 'theme_exploration'   // Theme packs, exercises, contrasts
  | 'search'              // Search bar submit
  | 'community_prompt'    // Community prompt
  | 'recent_question';    // Re-ask from history

export interface ConversationContext {
  source: ConversationSource;

  // Optional metadata based on source
  themeId?: string;
  exerciseId?: string;
  contrastId?: string;
  communityPromptId?: string;

  // Timestamps
  startedAt: number;
  lastActiveAt: number;
}
```

### Conversation

```typescript
export interface Conversation {
  id: string;
  title: string;              // Auto-generated from first message or context
  messages: ChatMessage[];
  context: ConversationContext;

  // Metadata
  createdAt: number;
  updatedAt: number;
  summary?: SessionSummary;   // Generated async in background
  isPinned?: boolean;
  isArchived?: boolean;
  tags?: string[];            // Auto-tagged based on content/themes
}
```

### Store Changes

```typescript
// REPLACE in lib/storage/store.ts:
// OLD:
chatHistory: ChatMessage[]

// NEW:
conversations: Conversation[]
activeConversationId: string | null
archivedConversations: Conversation[]  // Separate archived list

// NEW ACTIONS:
createConversation: (context: ConversationContext, initialMessage?: ChatMessage) => string
switchConversation: (id: string) => void
deleteConversation: (id: string) => void
archiveConversation: (id: string) => void
unarchiveConversation: (id: string) => void
renameConversation: (id: string, title: string) => void
pinConversation: (id: string) => void
getActiveConversation: () => Conversation | null
addMessageToConversation: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
updateConversationSummary: (conversationId: string, summary: SessionSummary) => void
getConversationsByDate: (startDate: number, endDate: number) => Conversation[]
searchConversations: (query: string) => Conversation[]
```

---

## 🧠 Smart Conversation Management

### When to Create New vs. Continue?

```typescript
// lib/chat/conversation-manager.ts

export function shouldContinueConversation(
  existingConversations: Conversation[],
  newContext: ConversationContext
): Conversation | null {
  const todayStart = getStartOfDay(new Date());

  // Filter conversations from today with matching context
  const candidateConversations = existingConversations.filter(conv => {
    // Must be from today
    if (conv.createdAt < todayStart) return false;

    // Must have same source type
    if (conv.context.source !== newContext.source) return false;

    // For theme-based conversations, must have same themeId
    if (newContext.source === 'theme_exploration') {
      return conv.context.themeId === newContext.themeId;
    }

    // For quick asks, search, and community prompts, group all same-day conversations
    return true;
  });

  if (candidateConversations.length > 0) {
    // Continue the most recently updated conversation
    return candidateConversations.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }

  return null; // Create new conversation
}

export function generateConversationTitle(
  firstUserMessage: string,
  context: ConversationContext
): string {
  // For theme-based conversations, use theme name
  if (context.themeId) {
    const theme = getThemePackById(context.themeId);
    if (theme) {
      if (context.exerciseId) {
        return `${theme.icon} ${theme.title} - Exercise`;
      }
      return `${theme.icon} ${theme.title}`;
    }
  }

  // For community prompts, use prompt text (truncated)
  if (context.communityPromptId) {
    return truncateText(firstUserMessage, 40);
  }

  // Default: use first user message
  return truncateText(firstUserMessage, 40);
}

function truncateText(text: string, maxLength: number): string {
  const cleaned = text.trim();
  return cleaned.length > maxLength
    ? cleaned.slice(0, maxLength) + '...'
    : cleaned;
}

function getStartOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
```

---

## 📅 Conversation Grouping Strategy

### Primary: Group by Date

```typescript
// lib/chat/conversation-grouping.ts

export type DateGroupKey =
  | 'today'
  | 'yesterday'
  | 'this_week'
  | 'last_week'
  | 'earlier';

export interface ConversationGroup {
  key: DateGroupKey;
  label: string;
  conversations: Conversation[];
}

export function groupConversationsByDate(
  conversations: Conversation[]
): ConversationGroup[] {
  const now = new Date();
  const todayStart = getStartOfDay(now);
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const thisWeekStart = getStartOfWeek(now);
  const lastWeekStart = thisWeekStart - 7 * 24 * 60 * 60 * 1000;

  const groups: Record<DateGroupKey, Conversation[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    last_week: [],
    earlier: [],
  };

  for (const conv of conversations) {
    if (conv.createdAt >= todayStart) {
      groups.today.push(conv);
    } else if (conv.createdAt >= yesterdayStart) {
      groups.yesterday.push(conv);
    } else if (conv.createdAt >= thisWeekStart) {
      groups.this_week.push(conv);
    } else if (conv.createdAt >= lastWeekStart) {
      groups.last_week.push(conv);
    } else {
      groups.earlier.push(conv);
    }
  }

  // Sort conversations within each group by updatedAt (most recent first)
  Object.values(groups).forEach(group => {
    group.sort((a, b) => b.updatedAt - a.updatedAt);
  });

  // Return only non-empty groups
  return [
    { key: 'today', label: 'Today', conversations: groups.today },
    { key: 'yesterday', label: 'Yesterday', conversations: groups.yesterday },
    { key: 'this_week', label: 'This Week', conversations: groups.this_week },
    { key: 'last_week', label: 'Last Week', conversations: groups.last_week },
    { key: 'earlier', label: 'Earlier', conversations: groups.earlier },
  ].filter(group => group.conversations.length > 0);
}
```

### Secondary: Context Badges

Display context badges on conversation items:
- 🌿 Quick Ask
- 🧘 [Theme Name]
- 🔍 Search
- 💬 Community

---

## 🚀 Implementation Phases

## Phase 1: Data Model & Core Logic (Week 1)

### 1.1 Update Store Types

**File:** `lib/storage/store.ts`

```typescript
// Add new types (around line 50)
export type ConversationSource =
  | 'quick_ask'
  | 'theme_exploration'
  | 'search'
  | 'community_prompt'
  | 'recent_question';

export interface ConversationContext {
  source: ConversationSource;
  themeId?: string;
  exerciseId?: string;
  contrastId?: string;
  communityPromptId?: string;
  startedAt: number;
  lastActiveAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  context: ConversationContext;
  createdAt: number;
  updatedAt: number;
  summary?: SessionSummary;
  isPinned?: boolean;
  isArchived?: boolean;
  tags?: string[];
}
```

### 1.2 Add Store State & Actions

**File:** `lib/storage/store.ts`

```typescript
// Add to SageState interface (around line 193)
interface SageState {
  // ... existing state ...

  // NEW: Conversation state
  conversations: Conversation[];
  activeConversationId: string | null;
  archivedConversations: Conversation[];

  // NEW: Conversation actions
  createConversation: (context: ConversationContext, initialMessage?: ChatMessage) => string;
  switchConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  unarchiveConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  pinConversation: (id: string, pinned: boolean) => void;
  getActiveConversation: () => Conversation | null;
  addMessageToConversation: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateConversationSummary: (conversationId: string, summary: SessionSummary) => void;
  getConversationsByDate: (startDate: number, endDate: number) => Conversation[];
  searchConversations: (query: string) => Conversation[];
}
```

### 1.3 Implement Persistence

```typescript
// Add storage keys (around line 370)
const CONVERSATIONS_KEY = 'sage.conversations.v1';
const ARCHIVED_CONVERSATIONS_KEY = 'sage.archived_conversations.v1';

// Add load/persist functions
async function loadStoredConversations(): Promise<Conversation[]> {
  try {
    const raw = await SecureStore.getItemAsync(CONVERSATIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}

async function persistConversations(conversations: Conversation[]): Promise<void> {
  try {
    // Keep last 100 conversations to avoid storage bloat
    const recent = conversations.slice(0, 100);
    await SecureStore.setItemAsync(CONVERSATIONS_KEY, JSON.stringify(recent));
  } catch {
    return;
  }
}
```

### 1.4 Implement Store Actions

```typescript
// Add to useSageStore create function (around line 664)
createConversation: (context, initialMessage) => {
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const newConversation: Conversation = {
    id: conversationId,
    title: '', // Will be set when first message is added
    messages: initialMessage ? [{
      ...initialMessage,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
    }] : [],
    context,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isPinned: false,
    isArchived: false,
  };

  set((state) => {
    const updated = [newConversation, ...state.conversations];
    void persistConversations(updated);
    return {
      conversations: updated,
      activeConversationId: conversationId,
    };
  });

  return conversationId;
},

switchConversation: (id) => {
  set({ activeConversationId: id });
},

addMessageToConversation: (conversationId, message) => {
  const newMessage: ChatMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
  };

  set((state) => {
    const updated = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        // Generate title from first user message if not set
        const title = conv.title || (
          message.role === 'user'
            ? generateConversationTitle(message.content, conv.context)
            : conv.title
        );

        return {
          ...conv,
          title,
          messages: [...conv.messages, newMessage],
          updatedAt: Date.now(),
          context: {
            ...conv.context,
            lastActiveAt: Date.now(),
          },
        };
      }
      return conv;
    });

    void persistConversations(updated);
    return { conversations: updated };
  });
},

getActiveConversation: () => {
  const { conversations, activeConversationId } = get();
  return conversations.find(c => c.id === activeConversationId) ?? null;
},

deleteConversation: (id) => {
  set((state) => {
    const updated = state.conversations.filter(c => c.id !== id);
    void persistConversations(updated);
    return {
      conversations: updated,
      activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    };
  });
},

archiveConversation: (id) => {
  set((state) => {
    const convToArchive = state.conversations.find(c => c.id === id);
    if (!convToArchive) return state;

    const updated = state.conversations.filter(c => c.id !== id);
    const archived = [...state.archivedConversations, { ...convToArchive, isArchived: true }];

    void persistConversations(updated);
    // TODO: persist archived conversations separately

    return {
      conversations: updated,
      archivedConversations: archived,
      activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    };
  });
},

renameConversation: (id, title) => {
  set((state) => {
    const updated = state.conversations.map(c =>
      c.id === id ? { ...c, title } : c
    );
    void persistConversations(updated);
    return { conversations: updated };
  });
},

pinConversation: (id, pinned) => {
  set((state) => {
    const updated = state.conversations.map(c =>
      c.id === id ? { ...c, isPinned: pinned } : c
    );
    void persistConversations(updated);
    return { conversations: updated };
  });
},

searchConversations: (query) => {
  const { conversations } = get();
  const lowerQuery = query.toLowerCase();

  return conversations.filter(conv =>
    conv.title.toLowerCase().includes(lowerQuery) ||
    conv.messages.some(m => m.content.toLowerCase().includes(lowerQuery)) ||
    conv.tags?.some(t => t.toLowerCase().includes(lowerQuery))
  );
},
```

### 1.5 Create Conversation Manager

**File:** `lib/chat/conversation-manager.ts`

```typescript
import { Conversation, ConversationContext, ConversationSource } from '../storage/store';
import { getThemePackById } from '../theme-packs';

export function shouldContinueConversation(
  existingConversations: Conversation[],
  newContext: ConversationContext
): Conversation | null {
  const todayStart = getStartOfDay(new Date());

  const candidateConversations = existingConversations.filter(conv => {
    if (conv.createdAt < todayStart) return false;
    if (conv.context.source !== newContext.source) return false;

    if (newContext.source === 'theme_exploration') {
      return conv.context.themeId === newContext.themeId;
    }

    return true;
  });

  if (candidateConversations.length > 0) {
    return candidateConversations.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }

  return null;
}

export function generateConversationTitle(
  firstUserMessage: string,
  context: ConversationContext
): string {
  if (context.themeId) {
    const theme = getThemePackById(context.themeId);
    if (theme) {
      if (context.exerciseId) {
        return `${theme.icon} ${theme.title} - Exercise`;
      }
      return `${theme.icon} ${theme.title}`;
    }
  }

  return truncateText(firstUserMessage, 40);
}

export function determineConversationSource(
  urlParams: {
    prompt?: string;
    theme?: string;
    exercise?: string;
    contrast?: string;
  }
): ConversationSource {
  if (urlParams.theme || urlParams.exercise || urlParams.contrast) {
    return 'theme_exploration';
  }

  if (urlParams.prompt) {
    // Could be community prompt or search, default to search
    return 'search';
  }

  return 'quick_ask';
}

function truncateText(text: string, maxLength: number): string {
  const cleaned = text.trim();
  return cleaned.length > maxLength
    ? cleaned.slice(0, maxLength) + '...'
    : cleaned;
}

function getStartOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
```

### 1.6 Create Grouping Helper

**File:** `lib/chat/conversation-grouping.ts`

```typescript
import { Conversation } from '../storage/store';

export type DateGroupKey =
  | 'today'
  | 'yesterday'
  | 'this_week'
  | 'last_week'
  | 'earlier';

export interface ConversationGroup {
  key: DateGroupKey;
  label: string;
  conversations: Conversation[];
}

export function groupConversationsByDate(
  conversations: Conversation[]
): ConversationGroup[] {
  const now = new Date();
  const todayStart = getStartOfDay(now);
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const thisWeekStart = getStartOfWeek(now);
  const lastWeekStart = thisWeekStart - 7 * 24 * 60 * 60 * 1000;

  const groups: Record<DateGroupKey, Conversation[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    last_week: [],
    earlier: [],
  };

  for (const conv of conversations) {
    if (conv.createdAt >= todayStart) {
      groups.today.push(conv);
    } else if (conv.createdAt >= yesterdayStart) {
      groups.yesterday.push(conv);
    } else if (conv.createdAt >= thisWeekStart) {
      groups.this_week.push(conv);
    } else if (conv.createdAt >= lastWeekStart) {
      groups.last_week.push(conv);
    } else {
      groups.earlier.push(conv);
    }
  }

  Object.values(groups).forEach(group => {
    group.sort((a, b) => b.updatedAt - a.updatedAt);
  });

  return [
    { key: 'today', label: 'Today', conversations: groups.today },
    { key: 'yesterday', label: 'Yesterday', conversations: groups.yesterday },
    { key: 'this_week', label: 'This Week', conversations: groups.this_week },
    { key: 'last_week', label: 'Last Week', conversations: groups.last_week },
    { key: 'earlier', label: 'Earlier', conversations: groups.earlier },
  ].filter(group => group.conversations.length > 0);
}

function getStartOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function getStartOfWeek(date: Date): number {
  const d = new Date(date);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d.getTime();
}
```

### 1.7 Update ask.tsx Screen

**File:** `app/ask.tsx`

```typescript
// Add imports
import {
  shouldContinueConversation,
  determineConversationSource
} from '../lib/chat/conversation-manager';
import type { ConversationContext } from '../lib/storage/store';

// Add store actions
const conversations = useSageStore((s) => s.conversations);
const activeConversationId = useSageStore((s) => s.activeConversationId);
const createConversation = useSageStore((s) => s.createConversation);
const switchConversation = useSageStore((s) => s.switchConversation);
const getActiveConversation = useSageStore((s) => s.getActiveConversation);
const addMessageToConversation = useSageStore((s) => s.addMessageToConversation);

// Handle conversation initialization
useEffect(() => {
  const context: ConversationContext = {
    source: determineConversationSource({ prompt, theme, exercise, contrast }),
    themeId: theme,
    exerciseId: exercise,
    contrastId: contrast,
    startedAt: Date.now(),
    lastActiveAt: Date.now(),
  };

  const existingConv = shouldContinueConversation(conversations, context);

  if (existingConv) {
    console.log('[Sage] Continuing existing conversation:', existingConv.id);
    switchConversation(existingConv.id);
  } else {
    console.log('[Sage] Creating new conversation');
    const newConvId = createConversation(context);
    switchConversation(newConvId);
  }
}, [theme, exercise, contrast]);

// Update handleSend to use conversations
const handleSend = async () => {
  if (!input.trim() || isGenerating) return;

  const activeConv = getActiveConversation();
  if (!activeConv) {
    console.error('[Sage] No active conversation');
    return;
  }

  const userText = input.trim();
  setInput('');

  // Scan for crisis signals
  const crisisAnalysis = analyzeCrisisSignals(userText);
  if (crisisAnalysis.shouldShowResources) {
    setCrisisResult(crisisAnalysis);
    setCrisisResources(getDefaultResources());
    setCrisisModalVisible(true);
  }

  // Add user message to conversation
  addMessageToConversation(activeConv.id, { role: 'user', content: userText });

  setIsGenerating(true);
  try {
    const result = await generateAssistantResult(userText, preferences, activeConv.messages);

    // Add assistant message to conversation
    addMessageToConversation(activeConv.id, {
      role: 'assistant',
      content: result.content,
      citedVerses: result.citedVerses,
    });

    // Still add to search history for quick re-ask
    const responsePreview = result.content.length > 150
      ? result.content.slice(0, 150) + '...'
      : result.content;
    addToSearchHistory({
      question: userText,
      responsePreview,
      citedVerses: result.citedVerses,
    });

    // TTS if enabled
    if (preferences.narrateResponses) {
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
    addMessageToConversation(activeConv.id, {
      role: 'assistant',
      content: "I'm sorry, I encountered an error while reflecting. Please try again.",
    });
  } finally {
    setIsGenerating(false);
  }
};

// Update chat rendering to use active conversation
const activeConv = getActiveConversation();
const displayMessages = activeConv?.messages || [];

// Update ScrollView to render displayMessages instead of chatHistory
{displayMessages.map(renderMessage)}
```

---

## Phase 2: Conversation History UI (Week 2)

### 2.1 Create Conversation Sidebar Component

**File:** `components/chat/ConversationSidebar.tsx`

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSageStore } from '../../lib/storage/store';
import { groupConversationsByDate } from '../../lib/chat/conversation-grouping';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';

interface ConversationSidebarProps {
  visible: boolean;
  onClose: () => void;
  onConversationSelect: (conversationId: string) => void;
}

export function ConversationSidebar({ visible, onClose, onConversationSelect }: ConversationSidebarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const conversations = useSageStore(s => s.conversations);
  const activeConversationId = useSageStore(s => s.activeConversationId);
  const createConversation = useSageStore(s => s.createConversation);
  const deleteConversation = useSageStore(s => s.deleteConversation);
  const pinConversation = useSageStore(s => s.pinConversation);

  const grouped = groupConversationsByDate(conversations);

  const handleNewConversation = () => {
    const newId = createConversation({
      source: 'quick_ask',
      startedAt: Date.now(),
      lastActiveAt: Date.now(),
    });
    onConversationSelect(newId);
    onClose();
  };

  const handleSelectConversation = (id: string) => {
    onConversationSelect(id);
    onClose();
  };

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Conversations</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* New Conversation Button */}
          <TouchableOpacity style={styles.newButton} onPress={handleNewConversation}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.newButtonText}>New Conversation</Text>
          </TouchableOpacity>

          {/* Conversation List */}
          <ScrollView style={styles.scrollView}>
            {grouped.map(group => (
              <View key={group.key} style={styles.group}>
                <Text style={styles.groupLabel}>{group.label}</Text>
                {group.conversations.map(conv => (
                  <ConversationListItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeConversationId}
                    onPress={() => handleSelectConversation(conv.id)}
                    onDelete={() => deleteConversation(conv.id)}
                    onPin={(pinned) => pinConversation(conv.id, pinned)}
                    colors={colors}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ... ConversationListItem component and styles (see next section)
```

### 2.2 Conversation List Item

```typescript
interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onPress: () => void;
  onDelete: () => void;
  onPin: (pinned: boolean) => void;
  colors: ReturnType<typeof getThemedColors>;
}

function ConversationListItem({
  conversation,
  isActive,
  onPress,
  onDelete,
  onPin,
  colors
}: ConversationListItemProps) {
  const [showActions, setShowActions] = useState(false);

  const getContextIcon = () => {
    switch (conversation.context.source) {
      case 'theme_exploration': return '🧘';
      case 'search': return '🔍';
      case 'community_prompt': return '💬';
      default: return '🌿';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        isActive && styles.conversationItemActive,
      ]}
      onPress={onPress}
      onLongPress={() => setShowActions(true)}
    >
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationIcon}>{getContextIcon()}</Text>
          <Text
            style={[styles.conversationTitle, isActive && styles.conversationTitleActive]}
            numberOfLines={1}
          >
            {conversation.title || 'Untitled'}
          </Text>
          {conversation.isPinned && (
            <Ionicons name="pin" size={14} color={COLORS.primary} />
          )}
        </View>
        <Text style={styles.conversationPreview} numberOfLines={1}>
          {conversation.messages[conversation.messages.length - 1]?.content || '...'}
        </Text>
        <Text style={styles.conversationTime}>
          {formatRelativeTime(conversation.updatedAt)}
        </Text>
      </View>

      {showActions && (
        <View style={styles.actionsOverlay}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              onPin(!conversation.isPinned);
              setShowActions(false);
            }}
          >
            <Text style={styles.actionButtonText}>
              {conversation.isPinned ? 'Unpin' : 'Pin'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonDanger]}
            onPress={() => {
              onDelete();
              setShowActions(false);
            }}
          >
            <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMins = Math.floor((now - timestamp) / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
```

### 2.3 Update ask.tsx to Add Sidebar

```typescript
// Add state for sidebar
const [sidebarVisible, setSidebarVisible] = useState(false);

// Update header to add menu button
<AppHeader
  variant="back"
  title={activeConv?.title || "Ask Sage"}
  onBack={handleBackPress}
  leftAction={() => setSidebarVisible(true)}  // Menu button
  showProfile={false}
  testID="ask-header"
/>

// Add sidebar component before </SafeAreaView>
<ConversationSidebar
  visible={sidebarVisible}
  onClose={() => setSidebarVisible(false)}
  onConversationSelect={(id) => {
    switchConversation(id);
    setSidebarVisible(false);
  }}
/>
```

---

## Phase 3: Background Summary & Polish (Week 3)

### 3.1 Non-Blocking Session Summary

**Update:** `app/ask.tsx`

```typescript
// Remove blocking modal from handleBackPress
const handleBackPress = useCallback(() => {
  // Navigate back immediately - no blocking
  router.back();

  // Generate summary in background
  setTimeout(async () => {
    const activeConv = getActiveConversation();
    if (!activeConv) return;

    const durationMs = Date.now() - sessionStartTimeRef.current;

    if (shouldGenerateSessionSummary(activeConv.messages, durationMs)) {
      try {
        const summary = await generateSessionSummary(
          activeConv.messages,
          preferences,
          activeConv.id,
          durationMs
        );

        updateConversationSummary(activeConv.id, summary);

        // Optional: Show subtle toast notification
        // Toast.show({ text: 'Session saved to history' });
      } catch (error) {
        console.error('[Sage] Failed to generate session summary:', error);
      }
    }
  }, 100);
}, [getActiveConversation, preferences, updateConversationSummary]);

// Remove SessionSummaryModal component entirely
```

### 3.2 Migration from chatHistory

**File:** `lib/chat/migration.ts`

```typescript
import { useSageStore } from '../storage/store';

export async function migrateToConversations() {
  const store = useSageStore.getState();
  const oldChatHistory = store.chatHistory;

  if (!oldChatHistory || oldChatHistory.length === 0) {
    console.log('[Migration] No chat history to migrate');
    return;
  }

  console.log('[Migration] Migrating', oldChatHistory.length, 'messages to conversations');

  // Create a single "Legacy Conversation" with all old messages
  const legacyConvId = store.createConversation({
    source: 'quick_ask',
    startedAt: oldChatHistory[0]?.timestamp || Date.now(),
    lastActiveAt: oldChatHistory[oldChatHistory.length - 1]?.timestamp || Date.now(),
  });

  // Add all messages to the legacy conversation
  for (const message of oldChatHistory) {
    store.addMessageToConversation(legacyConvId, {
      role: message.role,
      content: message.content,
      citedVerses: message.citedVerses,
    });
  }

  // Rename the conversation
  store.renameConversation(legacyConvId, 'Past Conversations');

  // Clear old chat history
  store.clearChatHistory();

  console.log('[Migration] Migration complete');
}

// Call this in app initialization
// store.initialize() should check if migration is needed
```

---

## 📱 UX Flow Examples

### Example 1: User starts chat from home

```
1. User taps "Ask Sage" FAB on home screen
2. Routes to /ask
3. System checks: Any quick_ask conversations from today?
   - NO → Create new conversation
   - YES → Continue most recent
4. User types and sends message
5. Message auto-saves to active conversation
6. User can navigate away anytime (no blocking modal)
```

### Example 2: User explores theme

```
1. User taps "Inner Peace Journey" theme
2. Routes to /theme-detail?id=inner_peace
3. User taps "Start Session"
4. Routes to /ask?theme=inner_peace
5. System checks: Any theme_exploration conversations from today with themeId=inner_peace?
   - NO → Create new with title "🧘 Inner Peace Journey"
   - YES → Continue existing conversation
6. Chat auto-saves, user can leave anytime
```

### Example 3: User browses history

```
1. User opens /ask screen
2. User taps hamburger menu icon
3. Sidebar slides in from left
4. Shows conversations grouped by date:
   - Today (3 conversations)
   - Yesterday (2 conversations)
   - This Week (5 conversations)
5. User taps a conversation
6. Sidebar closes, conversation loads
```

---

## ✅ Success Metrics

1. **Zero blocking modals** - User never interrupted
2. **100% auto-save** - All messages persisted immediately
3. **<1s sidebar open** - Quick access to history
4. **Smart continuation** - Same-day same-context chats continue automatically
5. **Background summaries** - Generated async, no waiting

---

## 🧪 Testing Checklist

- [ ] New conversation created when source changes
- [ ] Existing conversation continued when same source + day
- [ ] Messages persist after app restart
- [ ] Sidebar shows correct date grouping
- [ ] Delete conversation removes from list
- [ ] Pin conversation keeps at top
- [ ] Search finds conversations by content
- [ ] Migration from old chatHistory works
- [ ] Background summary generation doesn't block
- [ ] Theme-based conversations group correctly

---

## 📦 Files to Create/Modify

### New Files
- `lib/chat/conversation-manager.ts`
- `lib/chat/conversation-grouping.ts`
- `lib/chat/migration.ts`
- `components/chat/ConversationSidebar.tsx`

### Modified Files
- `lib/storage/store.ts` (add conversation types & actions)
- `app/ask.tsx` (integrate conversation management)
- `components/navigation/AppHeader.tsx` (add menu button support)

---

## 🚀 Deployment Strategy

1. **Week 1:** Implement core data model & logic (no UI changes yet)
2. **Week 2:** Add sidebar UI & integrate with ask.tsx
3. **Week 3:** Remove blocking modal, add background summary
4. **Testing:** 1 week of internal testing
5. **Release:** Gradual rollout with migration

---

This plan provides a complete, smooth chat history system that respects user time and makes conversations easily accessible!
