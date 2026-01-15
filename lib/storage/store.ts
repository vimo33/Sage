import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { initModel } from '../llm/inference';
import { validateModel, type ModelValidationResult, type ModelValidationStatus } from '../llm/model-validator';
import { checkBiometricSupport, authenticateWithBiometric, type BiometricSupportResult } from '../auth/biometric';
import type { ContrastSet, ContrastPair } from '../retrieval/contrasts';
import type { GuidedReflectionSession } from '../reflection/types';
import type { PracticeSession, PracticeDuration, PracticeCompletion } from '../practice/types';
import type { ThemePackProgress, ThemePackSession, ThemePackDayCompletion } from '../theme-packs/types';
import { getThemePackById } from '../theme-packs/templates';
import {
  type NotificationPreferences,
  DEFAULT_NOTIFICATION_PREFERENCES,
  scheduleNotifications,
  cancelAllNotifications,
  requestNotificationPermissions,
  checkNotificationPermissions,
} from '../notifications';
import {
  type AnalyticsPreferences,
  DEFAULT_ANALYTICS_PREFERENCES,
  CURRENT_CONSENT_VERSION,
  recordUsageEvent,
  clearAllAnalyticsData,
} from '../analytics';
import type {
  CommunityPrompt,
  CommunityPromptSubmission,
  CommunityPreferences,
  CommunityPromptCategory,
} from '../community-prompts/types';
import { DEFAULT_COMMUNITY_PREFERENCES } from '../community-prompts/types';
import { createSubmission, submissionToPrompt } from '../community-prompts/service';
import {
  type DonationPreferences,
  type DonationRecord,
  DEFAULT_DONATION_PREFERENCES,
  calculateTotalDonated,
} from '../donations';
import { addToSyncQueue, initOfflineSync } from '../offline-sync';

export type TonePreference = 'practical' | 'poetic' | 'minimal' | 'deep';
export type FontSizePreference = 'small' | 'medium' | 'large';
export type ThemeTag = 'action' | 'detachment' | 'suffering' | 'purpose' | 'discipline' | 'compassion' | 'self' | 'impermanence' | 'devotion' | 'knowledge' | 'meditation' | 'desire' | 'peace' | 'duty' | 'truth';
export type TimeSessionType = 'chat' | 'journal' | 'reflection' | 'practice' | 'theme-pack';
export type { ThemePackProgress, ThemePackSession, ThemePackDayCompletion };
export type { PracticeSession, PracticeDuration, PracticeCompletion };

// Session Summary types
export interface SessionSummary {
  id: string;
  sessionId: string;
  messageCount: number;
  durationMs: number;
  themes: ThemeTag[];
  summaryText: string;
  keyInsights: Array<{
    content: string;
    sourceRef: string;
  }>;
  createdAt: number;
  savedToJournal: boolean;
}

export type { ContrastSet, ContrastPair };
export type { GuidedReflectionSession };
export type { NotificationPreferences };
export type { AnalyticsPreferences };
export type { CommunityPrompt, CommunityPromptSubmission, CommunityPreferences };
export type { DonationPreferences, DonationRecord };

// Time tracking types
export interface TimeSession {
  id: string;
  type: TimeSessionType;
  startedAt: number;
  endedAt: number | null;
  durationMs: number;
}

export interface TimeTrackingStats {
  totalMinutes: number;
  weeklyMinutes: number;
  monthlyMinutes: number;
  breakdown: {
    chat: number;
    journal: number;
    reflection: number;
    practice: number;
    'theme-pack': number;
  };
}

// Streak tracking types
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD format
  isInGracePeriod: boolean;
  gracePeriodEndsAt: number | null; // timestamp
  totalActiveDays: number;
}

export interface StreakInfo {
  streak: StreakData;
  motivationalMessage: string;
  motivationalTier: 'starting' | 'building' | 'strong' | 'exceptional';
}

export interface DeveloperSettings {
  enabled: boolean;
  temperature: number;      // 0.0 - 2.0, default 0.8
  topK: number;             // 1 - 100, default 40
  topP: number;             // 0.0 - 1.0, default 0.9
  repeatPenalty: number;    // 0.0 - 2.0, default 1.2
}

export const DEFAULT_DEVELOPER_SETTINGS: DeveloperSettings = {
  enabled: false,
  temperature: 0.8,
  topK: 40,
  topP: 0.9,
  repeatPenalty: 1.2,
};

export type AccentColorKey = 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'teal';

// Safety settings types
export type ContentLimitLevel = 'standard' | 'sensitive' | 'restrictive';

export interface SafetySettings {
  contentLimitLevel: ContentLimitLevel;
  showCrisisResources: boolean;
  crisisResourcesRegion: string;
}

export const DEFAULT_SAFETY_SETTINGS: SafetySettings = {
  contentLimitLevel: 'standard',
  showCrisisResources: true,
  crisisResourcesRegion: 'United States',
};

export interface UserPreferences {
  tone: TonePreference;
  fontSize: FontSizePreference;
  voiceSpeed: number;
  narrateResponses: boolean;
  selectedVoiceId: string | null; // For voice picker
  showCitations: boolean;
  preferredThemes: ThemeTag[];
  preferredTraditions: string[];
  crossTraditionBlending: boolean;
  hasCompletedOnboarding: boolean;
  biometricLockEnabled: boolean;
  notificationPreferences: NotificationPreferences;
  analyticsPreferences: AnalyticsPreferences;
  developerSettings: DeveloperSettings;
  accentColor: AccentColorKey;
  safetySettings: SafetySettings;
  // User profile data
  userName: string | null;
  profileImageUri: string | null;
}

export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood?: string;
  tags?: string[];
  createdAt: number;
  linkedInsightIds: string[];
}

export interface SavedInsight {
  id: string;
  verseContent: string;
  sourceRef: string;
  userNote?: string;
  tags?: string[];
  createdAt: number;
}

export interface DailyWisdom {
  id: string;
  content: string;
  sourceRef: string;
  book: string;
  theme: string;
  date: string; // YYYY-MM-DD format
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  citedVerses?: Array<{
    content: string;
    sourceRef: string;
  }>;
}

export interface SearchHistoryItem {
  id: string;
  question: string;
  responsePreview: string;
  timestamp: number;
  citedVerses?: Array<{
    content: string;
    sourceRef: string;
  }>;
}

interface SageState {
  isInitialized: boolean;
  isModelLoaded: boolean;
  isGenerating: boolean;
  modelValidationStatus: ModelValidationStatus;
  modelValidationError: string | null;

  // TTS state
  isSpeaking: boolean;
  speakingMessageId: string | null;

  // Biometric auth state
  biometricSupport: BiometricSupportResult | null;
  isAuthenticated: boolean;
  lastAuthTimestamp: number | null;

  // Guided reflection state
  activeReflectionSession: GuidedReflectionSession | null;
  completedReflectionSessions: GuidedReflectionSession[];

  preferences: UserPreferences;
  chatHistory: ChatMessage[];
  journalEntries: JournalEntry[];
  savedInsights: SavedInsight[];
  savedContrasts: ContrastSet[];
  dailyWisdom: DailyWisdom | null;
  searchHistory: SearchHistoryItem[];

  initialize: () => Promise<void>;
  validateAndLoadModel: () => Promise<ModelValidationResult>;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  setPreferencesAsync: (prefs: Partial<UserPreferences>) => Promise<boolean>;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateChatMessage: (messageId: string, updates: Partial<Omit<ChatMessage, 'id' | 'timestamp'>>) => void;
  clearChatHistory: () => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateJournalEntry: (entryId: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => void;
  deleteJournalEntry: (entryId: string) => void;
  importJournalEntries: (entries: Array<{ content: string; mood?: string; createdAt: number }>) => number;
  saveInsight: (insight: Omit<SavedInsight, 'id' | 'createdAt'>) => void;
  updateInsight: (insightId: string, updates: Partial<Omit<SavedInsight, 'id' | 'createdAt'>>) => void;
  deleteInsight: (insightId: string) => void;

  // Tag management actions
  addTagToInsight: (insightId: string, tag: string) => void;
  removeTagFromInsight: (insightId: string, tag: string) => void;
  getAllTags: () => string[];
  getInsightsByTag: (tag: string) => SavedInsight[];
  searchInsights: (query: string, filterTags?: string[]) => SavedInsight[];

  setIsGenerating: (generating: boolean) => void;
  setModelLoaded: (loaded: boolean) => void;
  loadModel: () => Promise<void>;
  setDailyWisdom: (wisdom: DailyWisdom) => void;
  isWisdomSaved: (wisdomId: string) => boolean;
  isVerseSaved: (verseContent: string, sourceRef: string) => boolean;
  setTTSState: (isSpeaking: boolean, messageId: string | null) => void;

  // Contrast actions
  saveContrastSet: (contrastSet: ContrastSet) => void;
  deleteContrastSet: (contrastSetId: string) => void;
  isContrastSetSaved: (contrastSetId: string) => boolean;

  // Biometric auth actions
  initBiometricSupport: () => Promise<void>;
  setBiometricLockEnabled: (enabled: boolean) => Promise<boolean>;
  authenticateUser: () => Promise<boolean>;
  setAuthenticated: (authenticated: boolean) => void;
  requiresAuthentication: () => boolean;

  // Guided reflection actions
  startReflectionSession: (reflectionId: string) => void;
  addReflectionResponse: (promptId: string, userResponse: string, sageResponse: string) => void;
  advanceReflectionStep: () => void;
  completeReflectionSession: () => void;
  cancelReflectionSession: () => void;
  getReflectionProgress: () => { currentStep: number; totalSteps: number } | null;

  // Time tracking actions
  timeSessions: TimeSession[];
  activeTimeSession: TimeSession | null;
  startTimeSession: (type: TimeSessionType) => string;
  endTimeSession: (sessionId: string) => void;
  getTimeTrackingStats: () => TimeTrackingStats;

  // Notification actions
  notificationPermissionGranted: boolean;
  initNotifications: () => Promise<void>;
  setNotificationPreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  requestNotificationPermission: () => Promise<boolean>;

  // Analytics actions
  setAnalyticsPreferences: (prefs: Partial<AnalyticsPreferences>) => Promise<void>;
  giveAnalyticsConsent: (crashReporting: boolean, usageMetrics: boolean) => Promise<void>;
  revokeAnalyticsConsent: () => Promise<void>;
  clearAnalyticsData: () => Promise<void>;

  // Practice actions
  activePracticeSession: PracticeSession | null;
  completedPracticeSessions: PracticeCompletion[];
  startPracticeSession: (templateId: string, duration: PracticeDuration, conversationContext?: string) => string;
  advancePracticeStep: () => void;
  completePracticeSession: (userReflection?: string) => void;
  cancelPracticeSession: () => void;
  getPracticeProgress: () => { currentStep: number; totalSteps: number } | null;

  // Session summary actions
  pendingSessionSummary: SessionSummary | null;
  sessionSummaries: SessionSummary[];
  setPendingSessionSummary: (summary: SessionSummary | null) => void;
  saveSessionSummary: (summary: SessionSummary) => void;
  markSessionSummarySavedToJournal: (summaryId: string) => void;
  getSessionSummaries: () => SessionSummary[];

  // Streak tracking actions
  streakData: StreakData;
  getStreakInfo: () => StreakInfo;
  recordDailyActivity: () => void;

  // Theme pack actions
  themePackProgress: Record<string, ThemePackProgress>;
  activeThemePackSession: ThemePackSession | null;
  startThemePack: (packId: string) => void;
  startThemePackDay: (packId: string, dayNumber: number) => void;
  completeThemePackDay: (packId: string, dayNumber: number, userReflection?: string) => void;
  getThemePackProgress: (packId: string) => ThemePackProgress | null;
  getAllThemePackProgress: () => Record<string, ThemePackProgress>;
  cancelThemePackSession: () => void;

  // Community prompts actions
  communityPrompts: CommunityPrompt[];
  communitySubmissions: CommunityPromptSubmission[];
  communityPreferences: CommunityPreferences;
  upvotedPromptIds: string[];
  loadCommunityPrompts: () => Promise<void>;
  submitCommunityPrompt: (promptText: string, category: CommunityPromptCategory) => CommunityPromptSubmission | null;
  upvotePrompt: (promptId: string) => void;
  removeUpvote: (promptId: string) => void;
  isPromptUpvoted: (promptId: string) => boolean;
  setCommunityPreferences: (prefs: Partial<CommunityPreferences>) => void;
  acceptCommunityPrivacyPolicy: () => void;

  // Donation/Tip jar actions
  donationPreferences: DonationPreferences;
  recordDonation: (record: DonationRecord) => void;
  markTipJarSeen: () => void;
  markTipJarDismissed: () => void;

  // Search history actions
  addToSearchHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  clearSearchHistory: () => void;
  deleteSearchHistoryItem: (id: string) => void;
  getRecentSearchHistory: (limit?: number) => SearchHistoryItem[];
}

const DEFAULT_PREFERENCES: UserPreferences = {
  tone: 'practical',
  fontSize: 'medium',
  voiceSpeed: 1.0,
  narrateResponses: false,
  selectedVoiceId: null,
  showCitations: true,
  preferredThemes: [],
  preferredTraditions: [],
  crossTraditionBlending: true,
  hasCompletedOnboarding: false,
  biometricLockEnabled: false,
  notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  analyticsPreferences: DEFAULT_ANALYTICS_PREFERENCES,
  developerSettings: DEFAULT_DEVELOPER_SETTINGS,
  accentColor: 'green',
  safetySettings: DEFAULT_SAFETY_SETTINGS,
  userName: null,
  profileImageUri: null,
};

// SecureStore keys - MUST use only alphanumeric, '.', '-', '_' characters (NO colons!)
const PREFERENCES_KEY = 'sage.preferences.v1';
const DAILY_WISDOM_KEY = 'sage.daily_wisdom.v1';
const TIME_SESSIONS_KEY = 'sage.time_sessions.v1';
const STREAK_DATA_KEY = 'sage.streak_data.v1';
const THEME_PACK_PROGRESS_KEY = 'sage.theme_pack_progress.v1';
const COMMUNITY_DATA_KEY = 'sage.community_data.v1';
const DONATION_PREFS_KEY = 'sage.donation_prefs.v1';
const SAVED_INSIGHTS_KEY = 'sage.saved_insights.v1';
const SEARCH_HISTORY_KEY = 'sage.search_history.v1';

const DEFAULT_STREAK_DATA: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  isInGracePeriod: false,
  gracePeriodEndsAt: null,
  totalActiveDays: 0,
};

async function loadStoredPreferences(): Promise<Partial<UserPreferences> | null> {
  try {
    // Validate key before calling SecureStore to prevent "invalid key" errors
    if (!PREFERENCES_KEY || typeof PREFERENCES_KEY !== 'string' || PREFERENCES_KEY.length === 0) {
      console.error('[Sage] Invalid PREFERENCES_KEY:', PREFERENCES_KEY);
      return null;
    }
    console.log('[Sage] Loading preferences with key:', PREFERENCES_KEY);
    const raw = await SecureStore.getItemAsync(PREFERENCES_KEY);
    if (!raw) {
      console.log('[Sage] No stored preferences found');
      return null;
    }
    const prefs = JSON.parse(raw) as Partial<UserPreferences>;
    console.log('[Sage] Loaded preferences, hasCompletedOnboarding:', prefs.hasCompletedOnboarding);
    return prefs;
  } catch (error) {
    console.error('[Sage] Failed to load preferences:', error);
    console.error('[Sage] Key used:', PREFERENCES_KEY, 'Type:', typeof PREFERENCES_KEY);
    return null;
  }
}

async function persistPreferences(preferences: UserPreferences): Promise<boolean> {
  try {
    const data = JSON.stringify(preferences);
    console.log('[Sage] Persisting preferences, data length:', data.length, ', hasCompletedOnboarding:', preferences.hasCompletedOnboarding);
    await SecureStore.setItemAsync(PREFERENCES_KEY, data);
    console.log('[Sage] ✅ Preferences persisted successfully!');

    // Verify the write by reading it back
    const verification = await SecureStore.getItemAsync(PREFERENCES_KEY);
    if (verification) {
      const parsed = JSON.parse(verification);
      console.log('[Sage] ✅ Verification read-back OK, hasCompletedOnboarding:', parsed.hasCompletedOnboarding);
    } else {
      console.error('[Sage] ⚠️ Verification failed - could not read back preferences');
    }
    return true;
  } catch (error) {
    console.error('[Sage] ❌ Failed to persist preferences:', error);
    console.error('[Sage] Error details:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function loadStoredDailyWisdom(): Promise<DailyWisdom | null> {
  try {
    const raw = await SecureStore.getItemAsync(DAILY_WISDOM_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyWisdom;
  } catch {
    return null;
  }
}

async function persistDailyWisdom(wisdom: DailyWisdom): Promise<void> {
  try {
    await SecureStore.setItemAsync(DAILY_WISDOM_KEY, JSON.stringify(wisdom));
  } catch {
    return;
  }
}

async function loadStoredTimeSessions(): Promise<TimeSession[] | null> {
  try {
    const raw = await SecureStore.getItemAsync(TIME_SESSIONS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TimeSession[];
  } catch {
    return null;
  }
}

async function loadStoredStreakData(): Promise<StreakData | null> {
  try {
    const raw = await SecureStore.getItemAsync(STREAK_DATA_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StreakData;
  } catch {
    return null;
  }
}

async function persistStreakData(data: StreakData): Promise<void> {
  try {
    await SecureStore.setItemAsync(STREAK_DATA_KEY, JSON.stringify(data));
  } catch {
    return;
  }
}

async function persistTimeSessions(sessions: TimeSession[]): Promise<void> {
  try {
    // Only persist sessions from the last 60 days to avoid bloat
    const sixtyDaysAgo = Date.now() - 60 * 24 * 60 * 60 * 1000;
    const recentSessions = sessions.filter(s => s.startedAt > sixtyDaysAgo);
    await SecureStore.setItemAsync(TIME_SESSIONS_KEY, JSON.stringify(recentSessions));
  } catch {
    return;
  }
}

async function loadStoredThemePackProgress(): Promise<Record<string, ThemePackProgress> | null> {
  try {
    const raw = await SecureStore.getItemAsync(THEME_PACK_PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, ThemePackProgress>;
  } catch {
    return null;
  }
}

async function persistThemePackProgress(progress: Record<string, ThemePackProgress>): Promise<void> {
  try {
    await SecureStore.setItemAsync(THEME_PACK_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    return;
  }
}

// Community data types for persistence
interface StoredCommunityData {
  submissions: CommunityPromptSubmission[];
  preferences: CommunityPreferences;
  upvotedPromptIds: string[];
}

async function loadStoredCommunityData(): Promise<StoredCommunityData | null> {
  try {
    const raw = await SecureStore.getItemAsync(COMMUNITY_DATA_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredCommunityData;
  } catch {
    return null;
  }
}

async function persistCommunityData(data: StoredCommunityData): Promise<void> {
  try {
    await SecureStore.setItemAsync(COMMUNITY_DATA_KEY, JSON.stringify(data));
  } catch {
    return;
  }
}

async function loadStoredDonationPrefs(): Promise<DonationPreferences | null> {
  try {
    const raw = await SecureStore.getItemAsync(DONATION_PREFS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DonationPreferences;
  } catch {
    return null;
  }
}

async function persistDonationPrefs(prefs: DonationPreferences): Promise<void> {
  try {
    await SecureStore.setItemAsync(DONATION_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    return;
  }
}

async function loadStoredSavedInsights(): Promise<SavedInsight[] | null> {
  try {
    const raw = await SecureStore.getItemAsync(SAVED_INSIGHTS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedInsight[];
  } catch {
    return null;
  }
}

async function persistSavedInsights(insights: SavedInsight[]): Promise<void> {
  try {
    await SecureStore.setItemAsync(SAVED_INSIGHTS_KEY, JSON.stringify(insights));
  } catch {
    return;
  }
}

async function loadStoredSearchHistory(): Promise<SearchHistoryItem[] | null> {
  try {
    const raw = await SecureStore.getItemAsync(SEARCH_HISTORY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SearchHistoryItem[];
  } catch {
    return null;
  }
}

async function persistSearchHistory(items: SearchHistoryItem[]): Promise<void> {
  try {
    // Keep only last 50 items to avoid storage bloat
    const recent = items.slice(0, 50);
    await SecureStore.setItemAsync(SEARCH_HISTORY_KEY, JSON.stringify(recent));
  } catch {
    return;
  }
}

async function persistJournalEntries(entries: JournalEntry[]): Promise<void> {
  try {
    // Keep last 500 entries to avoid storage bloat
    const recent = entries.slice(0, 500);
    await SecureStore.setItemAsync('journal_entries', JSON.stringify(recent));
  } catch (error) {
    console.error('[Sage] Failed to persist journal entries:', error);
  }
}

async function loadJournalEntries(): Promise<JournalEntry[]> {
  try {
    const raw = await SecureStore.getItemAsync('journal_entries');
    if (!raw) return [];
    return JSON.parse(raw) as JournalEntry[];
  } catch (error) {
    console.error('[Sage] Failed to load journal entries:', error);
    return [];
  }
}

// Helper function to get start of week (Sunday)
function getStartOfWeek(date: Date): number {
  const d = new Date(date);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d.getTime();
}

// Helper function to get start of month
function getStartOfMonth(date: Date): number {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

// Helper function to get date string in YYYY-MM-DD format
function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Helper function to get start of day timestamp
function getStartOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

// Helper function to calculate days between two dates
function getDaysBetween(dateStr1: string, dateStr2: string): number {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Motivational messages based on streak tier
const STREAK_MESSAGES = {
  starting: [
    'Every journey begins with a single step.',
    'The path of wisdom awaits you.',
    'Today is a new beginning.',
    'Small steps lead to great transformations.',
  ],
  building: [
    'Your dedication is taking root.',
    'Consistency is the mother of mastery.',
    'Each day strengthens your practice.',
    'You are building something meaningful.',
  ],
  strong: [
    'Your commitment shines brightly.',
    'Discipline has become your nature.',
    'The seeds of practice bear fruit.',
    'You walk the path with purpose.',
  ],
  exceptional: [
    'You embody the spirit of perseverance.',
    'Your practice has become a way of life.',
    'Few achieve such dedication.',
    'You inspire through your commitment.',
  ],
};

function getMotivationalTier(streak: number): 'starting' | 'building' | 'strong' | 'exceptional' {
  if (streak < 3) return 'starting';
  if (streak < 7) return 'building';
  if (streak < 30) return 'strong';
  return 'exceptional';
}

function getRandomMotivationalMessage(tier: 'starting' | 'building' | 'strong' | 'exceptional'): string {
  const messages = STREAK_MESSAGES[tier];
  return messages[Math.floor(Math.random() * messages.length)];
}

export const useSageStore = create<SageState>((set, get) => ({
  isInitialized: false,
  isModelLoaded: false,
  isGenerating: false,
  modelValidationStatus: 'unknown' as ModelValidationStatus,
  modelValidationError: null,

  // TTS state
  isSpeaking: false,
  speakingMessageId: null,

  // Biometric auth state
  biometricSupport: null,
  isAuthenticated: false,
  lastAuthTimestamp: null,

  // Guided reflection state
  activeReflectionSession: null,
  completedReflectionSessions: [],

  preferences: DEFAULT_PREFERENCES,
  chatHistory: [],
  journalEntries: [],
  savedInsights: [],
  savedContrasts: [],
  dailyWisdom: null,
  searchHistory: [],
  timeSessions: [],
  activeTimeSession: null,
  notificationPermissionGranted: false,
  activePracticeSession: null,
  completedPracticeSessions: [],
  pendingSessionSummary: null,
  sessionSummaries: [],
  streakData: DEFAULT_STREAK_DATA,
  themePackProgress: {},
  activeThemePackSession: null,

  // Community prompts state
  communityPrompts: [],
  communitySubmissions: [],
  communityPreferences: DEFAULT_COMMUNITY_PREFERENCES,
  upvotedPromptIds: [],

  // Donation/Tip jar state
  donationPreferences: DEFAULT_DONATION_PREFERENCES,

  initialize: async () => {
    const stored = await loadStoredPreferences();
    const storedWisdom = await loadStoredDailyWisdom();
    const storedTimeSessions = await loadStoredTimeSessions();
    const storedStreakData = await loadStoredStreakData();
    const storedThemePackProgress = await loadStoredThemePackProgress();
    const storedCommunityData = await loadStoredCommunityData();
    const storedDonationPrefs = await loadStoredDonationPrefs();
    const storedSavedInsights = await loadStoredSavedInsights();
    const storedSearchHistory = await loadStoredSearchHistory();
    const storedJournalEntries = await loadJournalEntries();

    const nextPreferences: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      ...stored,
      preferredThemes: stored?.preferredThemes ?? DEFAULT_PREFERENCES.preferredThemes,
      preferredTraditions: stored?.preferredTraditions ?? DEFAULT_PREFERENCES.preferredTraditions,
      crossTraditionBlending: stored?.crossTraditionBlending ?? DEFAULT_PREFERENCES.crossTraditionBlending,
      notificationPreferences: {
        ...DEFAULT_NOTIFICATION_PREFERENCES,
        ...stored?.notificationPreferences,
      },
      analyticsPreferences: {
        ...DEFAULT_ANALYTICS_PREFERENCES,
        ...stored?.analyticsPreferences,
      },
      developerSettings: {
        ...DEFAULT_DEVELOPER_SETTINGS,
        ...stored?.developerSettings,
      },
      safetySettings: {
        ...DEFAULT_SAFETY_SETTINGS,
        ...stored?.safetySettings,
      },
    };

    // Check if stored wisdom is from today
    const today = new Date().toISOString().split('T')[0];
    const dailyWisdom = storedWisdom?.date === today ? storedWisdom : null;

    // Calculate current streak status based on stored data
    let streakData = storedStreakData ?? DEFAULT_STREAK_DATA;

    if (streakData.lastActiveDate) {
      const todayStr = getDateString(new Date());
      const daysSinceActive = getDaysBetween(streakData.lastActiveDate, todayStr);

      // If more than 2 days have passed (missed yesterday and grace period expired)
      if (daysSinceActive > 2) {
        // Streak is broken
        streakData = {
          ...streakData,
          currentStreak: 0,
          isInGracePeriod: false,
          gracePeriodEndsAt: null,
        };
        void persistStreakData(streakData);
      } else if (daysSinceActive === 2) {
        // Yesterday was missed, check grace period
        const now = Date.now();
        if (streakData.gracePeriodEndsAt && now < streakData.gracePeriodEndsAt) {
          // Still in grace period
          streakData = { ...streakData, isInGracePeriod: true };
        } else if (!streakData.gracePeriodEndsAt) {
          // Start grace period (ends at end of today)
          const endOfToday = getStartOfDay(new Date()) + 24 * 60 * 60 * 1000 - 1;
          streakData = {
            ...streakData,
            isInGracePeriod: true,
            gracePeriodEndsAt: endOfToday,
          };
          void persistStreakData(streakData);
        } else {
          // Grace period expired, streak broken
          streakData = {
            ...streakData,
            currentStreak: 0,
            isInGracePeriod: false,
            gracePeriodEndsAt: null,
          };
          void persistStreakData(streakData);
        }
      } else {
        // Active yesterday or today, streak is intact
        streakData = {
          ...streakData,
          isInGracePeriod: false,
          gracePeriodEndsAt: null,
        };
      }
    }

    set({
      preferences: nextPreferences,
      dailyWisdom,
      timeSessions: storedTimeSessions ?? [],
      streakData,
      themePackProgress: storedThemePackProgress ?? {},
      communitySubmissions: storedCommunityData?.submissions ?? [],
      communityPreferences: storedCommunityData?.preferences ?? DEFAULT_COMMUNITY_PREFERENCES,
      upvotedPromptIds: storedCommunityData?.upvotedPromptIds ?? [],
      donationPreferences: storedDonationPrefs ?? DEFAULT_DONATION_PREFERENCES,
      savedInsights: storedSavedInsights ?? [],
      searchHistory: storedSearchHistory ?? [],
      journalEntries: storedJournalEntries ?? [],
      isInitialized: true,
    });

    // Initialize offline sync service
    void initOfflineSync();
  },

  validateAndLoadModel: async () => {
    console.log('[Sage] Starting model validation...');

    try {
      const validationResult = await validateModel();

      set({
        modelValidationStatus: validationResult.status,
        modelValidationError: validationResult.error ?? null,
      });

      if (validationResult.status === 'valid' && validationResult.localUri) {
        console.log('[Sage] Model validation passed.');

        // Platform-specific model loading
        // iOS: Currently disabled due to llama.rn crash
        // Android: Enabled
        const Platform = require('react-native').Platform;
        const isIOS = Platform.OS === 'ios';

        // Attempt to load model on both iOS and Android
        // Using conservative settings for iOS physical devices
        const modelConfig = isIOS ? {
          modelPath: validationResult.localUri,
          isModelAsset: false,
          nCtx: 1024,       // Smaller context for iOS stability
          nGpuLayers: 0,    // CPU only for iOS (safer)
          nThreads: 2,      // Fewer threads for iOS
          useMlock: false,  // Don't lock memory
        } : {
          modelPath: validationResult.localUri,
          isModelAsset: false,
          nCtx: 2048,
          nGpuLayers: 1,
          nThreads: 4,
        };

        console.log(`[Sage] ${isIOS ? 'iOS' : 'Android'} detected - attempting to load model...`);
        console.log('[Sage] Model config:', JSON.stringify(modelConfig, null, 2));

        try {
          console.log('[Sage] 🔄 About to call initModel...');
          const loadedContext = await initModel(modelConfig);
          console.log('[Sage] initModel returned:', loadedContext ? 'CONTEXT OBJECT' : 'NULL');

          // Import isModelReady to verify
          const { isModelReady } = require('../llm/inference');
          const modelReadyAfterInit = isModelReady();
          console.log('[Sage] isModelReady() after initModel:', modelReadyAfterInit);

          set({
            isModelLoaded: true,
            modelValidationStatus: 'valid',
            modelValidationError: null,
          });
          console.log(`[Sage] ✅ Model loaded successfully on ${isIOS ? 'iOS' : 'Android'}! State updated.`);
          console.log('[Sage] Store state - isModelLoaded:', true);
        } catch (loadError) {
          console.error('[Sage] ❌ Model load failed:', loadError);
          console.error('[Sage] Error details:', loadError instanceof Error ? loadError.message : String(loadError));
          console.error('[Sage] Error stack:', loadError instanceof Error ? loadError.stack : 'No stack');
          set({
            modelValidationStatus: 'valid', // Don't block the app
            modelValidationError: null,
            isModelLoaded: false, // Fallback to template responses
          });
          console.log('[Sage] ⚠️ Falling back to template responses due to load error');
        }
      } else {
        console.log('[Sage] Model validation failed:', validationResult.status, validationResult.error);
      }

      return validationResult;
    } catch (error) {
      console.error('[Sage] validateAndLoadModel caught error:', error);
      const errorResult: ModelValidationResult = {
        status: 'unknown',
        error: `Validation crashed: ${error instanceof Error ? error.message : String(error)}`,
      };
      set({
        modelValidationStatus: 'unknown',
        modelValidationError: errorResult.error,
      });
      return errorResult;
    }
  },

  setPreferences: (prefs) => {
    set((state) => {
      const nextPreferences: UserPreferences = { ...state.preferences, ...prefs };
      void persistPreferences(nextPreferences);
      return { preferences: nextPreferences };
    });
  },

  setPreferencesAsync: async (prefs) => {
    const state = get();
    const nextPreferences: UserPreferences = { ...state.preferences, ...prefs };
    console.log('[Sage] setPreferencesAsync called, hasCompletedOnboarding:', prefs.hasCompletedOnboarding);
    const success = await persistPreferences(nextPreferences);
    if (success) {
      set({ preferences: nextPreferences });
      console.log('[Sage] setPreferencesAsync completed successfully');
    } else {
      console.error('[Sage] setPreferencesAsync failed to persist');
    }
    return success;
  },
  
  addChatMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
    };
    set((state) => ({
      chatHistory: [...state.chatHistory, newMessage],
    }));
  },
  
  clearChatHistory: () => {
    set({ chatHistory: [] });
  },

  updateChatMessage: (messageId, updates) => {
    set((state) => ({
      chatHistory: state.chatHistory.map((msg) =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      ),
    }));
  },
  
  addJournalEntry: (entry) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `journal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
    };
    set((state) => {
      const updatedEntries = [newEntry, ...state.journalEntries];
      void persistJournalEntries(updatedEntries);
      return { journalEntries: updatedEntries };
    });
    // Add to offline sync queue
    void addToSyncQueue('journal_entry', 'create', newEntry.id, newEntry, 1);
  },

  updateJournalEntry: (entryId, updates) => {
    set((state) => {
      const updatedEntries = state.journalEntries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      );
      const updatedEntry = updatedEntries.find(e => e.id === entryId);
      if (updatedEntry) {
        // Add to offline sync queue
        void addToSyncQueue('journal_entry', 'update', entryId, updatedEntry, 1);
      }
      void persistJournalEntries(updatedEntries);
      return { journalEntries: updatedEntries };
    });
  },

  deleteJournalEntry: (entryId) => {
    // Add to offline sync queue before deletion
    void addToSyncQueue('journal_entry', 'delete', entryId, { id: entryId }, 1);
    set((state) => {
      const updatedEntries = state.journalEntries.filter((entry) => entry.id !== entryId);
      void persistJournalEntries(updatedEntries);
      return { journalEntries: updatedEntries };
    });
  },

  importJournalEntries: (entries) => {
    const newEntries: JournalEntry[] = entries.map((entry) => ({
      ...entry,
      id: `journal_${entry.createdAt}_${Math.random().toString(36).slice(2, 9)}`,
      linkedInsightIds: [],
    }));

    // Sort by createdAt descending (newest first) before merging
    const sortedNewEntries = [...newEntries].sort((a, b) => b.createdAt - a.createdAt);

    set((state) => {
      // Merge and re-sort all entries by createdAt (newest first)
      const allEntries = [...sortedNewEntries, ...state.journalEntries]
        .sort((a, b) => b.createdAt - a.createdAt);
      void persistJournalEntries(allEntries);
      return { journalEntries: allEntries };
    });

    return newEntries.length;
  },

  saveInsight: (insight) => {
    const newInsight: SavedInsight = {
      ...insight,
      id: `insight_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
    };
    set((state) => {
      const newInsights = [newInsight, ...state.savedInsights];
      void persistSavedInsights(newInsights);
      return { savedInsights: newInsights };
    });
    // Add to offline sync queue
    void addToSyncQueue('saved_insight', 'create', newInsight.id, newInsight, 1);
  },

  updateInsight: (insightId, updates) => {
    set((state) => {
      const newInsights = state.savedInsights.map((insight) =>
        insight.id === insightId ? { ...insight, ...updates } : insight
      );
      void persistSavedInsights(newInsights);
      const updatedInsight = newInsights.find(i => i.id === insightId);
      if (updatedInsight) {
        // Add to offline sync queue
        void addToSyncQueue('saved_insight', 'update', insightId, updatedInsight, 1);
      }
      return { savedInsights: newInsights };
    });
  },

  deleteInsight: (insightId) => {
    // Add to offline sync queue before deletion
    void addToSyncQueue('saved_insight', 'delete', insightId, { id: insightId }, 1);
    set((state) => {
      const newInsights = state.savedInsights.filter((insight) => insight.id !== insightId);
      void persistSavedInsights(newInsights);
      return { savedInsights: newInsights };
    });
  },

  // Tag management actions
  addTagToInsight: (insightId, tag) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (!normalizedTag) return;

    set((state) => {
      const newInsights = state.savedInsights.map((insight) =>
        insight.id === insightId
          ? {
              ...insight,
              tags: insight.tags
                ? insight.tags.includes(normalizedTag)
                  ? insight.tags
                  : [...insight.tags, normalizedTag]
                : [normalizedTag],
            }
          : insight
      );
      void persistSavedInsights(newInsights);
      return { savedInsights: newInsights };
    });
  },

  removeTagFromInsight: (insightId, tag) => {
    set((state) => {
      const newInsights = state.savedInsights.map((insight) =>
        insight.id === insightId && insight.tags
          ? {
              ...insight,
              tags: insight.tags.filter((t) => t !== tag),
            }
          : insight
      );
      void persistSavedInsights(newInsights);
      return { savedInsights: newInsights };
    });
  },

  getAllTags: () => {
    const { savedInsights } = get();
    const tagSet = new Set<string>();
    for (const insight of savedInsights) {
      if (insight.tags) {
        for (const tag of insight.tags) {
          tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet).sort();
  },

  getInsightsByTag: (tag) => {
    const { savedInsights } = get();
    return savedInsights.filter((insight) => insight.tags?.includes(tag));
  },

  searchInsights: (query, filterTags) => {
    const { savedInsights } = get();
    const lowerQuery = query.toLowerCase().trim();

    return savedInsights.filter((insight) => {
      // If filter tags are provided, check that insight has all of them
      if (filterTags && filterTags.length > 0) {
        const hasAllTags = filterTags.every((tag) => insight.tags?.includes(tag));
        if (!hasAllTags) return false;
      }

      // If no query, return (already passed tag filter)
      if (!lowerQuery) return true;

      // Search in content, source ref, user note, and tags
      const matchesContent = insight.verseContent.toLowerCase().includes(lowerQuery);
      const matchesSource = insight.sourceRef.toLowerCase().includes(lowerQuery);
      const matchesNote = insight.userNote?.toLowerCase().includes(lowerQuery) ?? false;
      const matchesTags = insight.tags?.some((tag) => tag.includes(lowerQuery)) ?? false;

      return matchesContent || matchesSource || matchesNote || matchesTags;
    });
  },

  setIsGenerating: (generating) => {
    set({ isGenerating: generating });
  },
  
  setModelLoaded: (loaded) => {
    set({ isModelLoaded: loaded });
  },
  
  loadModel: async () => {
    if (get().isModelLoaded) return;

    try {
      // Model is stored in documents directory (not bundled due to size)
      const modelPath = `${FileSystem.documentDirectory}models/sage-model.gguf`;
      const fileInfo = await FileSystem.getInfoAsync(modelPath);

      if (!fileInfo.exists) {
        console.log('[Sage] Model file not found at:', modelPath);
        console.log('[Sage] Model needs to be downloaded separately (869MB)');
        return;
      }

      await initModel({
        modelPath: modelPath,
        isModelAsset: false,
        nCtx: 2048,
      });
      set({ isModelLoaded: true });
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  },

  setDailyWisdom: (wisdom) => {
    void persistDailyWisdom(wisdom);
    set({ dailyWisdom: wisdom });
  },

  isWisdomSaved: (wisdomId) => {
    const { savedInsights, dailyWisdom } = get();
    if (!dailyWisdom) return false;
    // Check if this wisdom has been saved by matching content and source
    return savedInsights.some(
      (insight) =>
        insight.verseContent === dailyWisdom.content &&
        insight.sourceRef === dailyWisdom.sourceRef
    );
  },

  isVerseSaved: (verseContent, sourceRef) => {
    const { savedInsights } = get();
    return savedInsights.some(
      (insight) =>
        insight.verseContent === verseContent &&
        insight.sourceRef === sourceRef
    );
  },

  setTTSState: (isSpeaking, messageId) => {
    set({ isSpeaking, speakingMessageId: messageId });
  },

  // Contrast actions
  saveContrastSet: (contrastSet) => {
    set((state) => ({
      savedContrasts: [contrastSet, ...state.savedContrasts],
    }));
  },

  deleteContrastSet: (contrastSetId) => {
    set((state) => ({
      savedContrasts: state.savedContrasts.filter((c) => c.id !== contrastSetId),
    }));
  },

  isContrastSetSaved: (contrastSetId) => {
    const { savedContrasts } = get();
    return savedContrasts.some((c) => c.id === contrastSetId);
  },

  // Biometric auth actions
  initBiometricSupport: async () => {
    const support = await checkBiometricSupport();
    set({ biometricSupport: support });
  },

  setBiometricLockEnabled: async (enabled: boolean) => {
    const { biometricSupport, setPreferences } = get();

    // If trying to enable but biometrics not supported/enrolled, return false
    if (enabled && (!biometricSupport?.isSupported || !biometricSupport?.isEnrolled)) {
      return false;
    }

    // If enabling, verify the user can authenticate first
    if (enabled) {
      const result = await authenticateWithBiometric({
        promptMessage: 'Authenticate to enable biometric lock',
      });
      if (!result.success) {
        return false;
      }
    }

    setPreferences({ biometricLockEnabled: enabled });
    // When enabling, mark as authenticated since they just authenticated
    if (enabled) {
      set({ isAuthenticated: true, lastAuthTimestamp: Date.now() });
    }
    return true;
  },

  authenticateUser: async () => {
    const result = await authenticateWithBiometric({
      promptMessage: 'Authenticate to access your private content',
    });

    if (result.success) {
      set({ isAuthenticated: true, lastAuthTimestamp: Date.now() });
      return true;
    }
    return false;
  },

  setAuthenticated: (authenticated: boolean) => {
    set({
      isAuthenticated: authenticated,
      lastAuthTimestamp: authenticated ? Date.now() : null,
    });
  },

  requiresAuthentication: () => {
    const { preferences, isAuthenticated, biometricSupport } = get();

    // If biometric lock is not enabled, no auth required
    if (!preferences.biometricLockEnabled) {
      return false;
    }

    // If biometrics not supported, no auth required
    if (!biometricSupport?.isSupported || !biometricSupport?.isEnrolled) {
      return false;
    }

    // Auth required if not authenticated
    return !isAuthenticated;
  },

  // Guided reflection actions
  startReflectionSession: (reflectionId: string) => {
    const newSession: GuidedReflectionSession = {
      reflectionId,
      currentStep: 0,
      responses: [],
      startedAt: Date.now(),
      completedAt: null,
    };
    set({ activeReflectionSession: newSession });
  },

  addReflectionResponse: (promptId: string, userResponse: string, sageResponse: string) => {
    set((state) => {
      if (!state.activeReflectionSession) return state;

      const response = {
        promptId,
        userResponse,
        sageResponse,
        timestamp: Date.now(),
      };

      return {
        activeReflectionSession: {
          ...state.activeReflectionSession,
          responses: [...state.activeReflectionSession.responses, response],
        },
      };
    });
  },

  advanceReflectionStep: () => {
    set((state) => {
      if (!state.activeReflectionSession) return state;

      return {
        activeReflectionSession: {
          ...state.activeReflectionSession,
          currentStep: state.activeReflectionSession.currentStep + 1,
        },
      };
    });
  },

  completeReflectionSession: () => {
    set((state) => {
      if (!state.activeReflectionSession) return state;

      const completedSession: GuidedReflectionSession = {
        ...state.activeReflectionSession,
        completedAt: Date.now(),
      };

      return {
        activeReflectionSession: null,
        completedReflectionSessions: [completedSession, ...state.completedReflectionSessions],
      };
    });
  },

  cancelReflectionSession: () => {
    set({ activeReflectionSession: null });
  },

  getReflectionProgress: () => {
    const { activeReflectionSession } = get();
    if (!activeReflectionSession) return null;

    // Import the reflection to get total steps
    // Note: This is a simplified version - in practice you might want to store totalSteps in the session
    return {
      currentStep: activeReflectionSession.currentStep,
      totalSteps: activeReflectionSession.responses.length + 1, // Approximation
    };
  },

  // Time tracking actions
  startTimeSession: (type: TimeSessionType) => {
    const sessionId = `time_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newSession: TimeSession = {
      id: sessionId,
      type,
      startedAt: Date.now(),
      endedAt: null,
      durationMs: 0,
    };
    set({ activeTimeSession: newSession });
    return sessionId;
  },

  endTimeSession: (sessionId: string) => {
    const { activeTimeSession, timeSessions, recordDailyActivity } = get();

    if (!activeTimeSession || activeTimeSession.id !== sessionId) {
      return;
    }

    const endedAt = Date.now();
    const durationMs = endedAt - activeTimeSession.startedAt;

    // Only track sessions longer than 5 seconds to avoid accidental navigations
    if (durationMs < 5000) {
      set({ activeTimeSession: null });
      return;
    }

    const completedSession: TimeSession = {
      ...activeTimeSession,
      endedAt,
      durationMs,
    };

    const updatedSessions = [completedSession, ...timeSessions];
    set({
      activeTimeSession: null,
      timeSessions: updatedSessions,
    });

    // Persist to secure storage
    void persistTimeSessions(updatedSessions);

    // Record daily activity for streak tracking
    recordDailyActivity();
  },

  getTimeTrackingStats: () => {
    const { timeSessions } = get();
    const now = new Date();
    const weekStart = getStartOfWeek(now);
    const monthStart = getStartOfMonth(now);

    let totalMs = 0;
    let weeklyMs = 0;
    let monthlyMs = 0;
    const breakdown: Record<TimeSessionType, number> = { chat: 0, journal: 0, reflection: 0, practice: 0, 'theme-pack': 0 };

    for (const session of timeSessions) {
      if (session.endedAt === null) continue;

      totalMs += session.durationMs;
      breakdown[session.type] += session.durationMs;

      if (session.startedAt >= weekStart) {
        weeklyMs += session.durationMs;
      }
      if (session.startedAt >= monthStart) {
        monthlyMs += session.durationMs;
      }
    }

    return {
      totalMinutes: Math.round(totalMs / 60000),
      weeklyMinutes: Math.round(weeklyMs / 60000),
      monthlyMinutes: Math.round(monthlyMs / 60000),
      breakdown: {
        chat: Math.round(breakdown.chat / 60000),
        journal: Math.round(breakdown.journal / 60000),
        reflection: Math.round(breakdown.reflection / 60000),
        practice: Math.round(breakdown.practice / 60000),
        'theme-pack': Math.round(breakdown['theme-pack'] / 60000),
      },
    };
  },

  // Notification actions
  initNotifications: async () => {
    const hasPermission = await checkNotificationPermissions();
    set({ notificationPermissionGranted: hasPermission });

    // If notifications were enabled and we have permission, reschedule them
    const { preferences } = get();
    if (hasPermission && preferences.notificationPreferences.enabled) {
      await scheduleNotifications(preferences.notificationPreferences);
    }
  },

  requestNotificationPermission: async () => {
    const granted = await requestNotificationPermissions();
    set({ notificationPermissionGranted: granted });
    return granted;
  },

  setNotificationPreferences: async (prefs: Partial<NotificationPreferences>) => {
    const { preferences, setPreferences, notificationPermissionGranted } = get();

    const nextNotificationPrefs: NotificationPreferences = {
      ...preferences.notificationPreferences,
      ...prefs,
    };

    // If trying to enable but no permission, request it first
    if (prefs.enabled && !notificationPermissionGranted) {
      const granted = await requestNotificationPermissions();
      set({ notificationPermissionGranted: granted });
      if (!granted) {
        // Can't enable without permission
        nextNotificationPrefs.enabled = false;
      }
    }

    // Update preferences in store
    setPreferences({ notificationPreferences: nextNotificationPrefs });

    // Schedule or cancel notifications based on new preferences
    if (nextNotificationPrefs.enabled) {
      await scheduleNotifications(nextNotificationPrefs);
    } else {
      await cancelAllNotifications();
    }
  },

  // Analytics actions
  setAnalyticsPreferences: async (prefs: Partial<AnalyticsPreferences>) => {
    const { preferences, setPreferences } = get();

    const nextAnalyticsPrefs: AnalyticsPreferences = {
      ...preferences.analyticsPreferences,
      ...prefs,
    };

    // If disabling, also disable sub-options
    if (prefs.enabled === false) {
      nextAnalyticsPrefs.crashReportingEnabled = false;
      nextAnalyticsPrefs.usageMetricsEnabled = false;
    }

    // Update preferences in store
    setPreferences({ analyticsPreferences: nextAnalyticsPrefs });

    console.log('[Analytics] Preferences updated:', nextAnalyticsPrefs);
  },

  giveAnalyticsConsent: async (crashReporting: boolean, usageMetrics: boolean) => {
    const { setPreferences } = get();

    const nextAnalyticsPrefs: AnalyticsPreferences = {
      enabled: crashReporting || usageMetrics,
      crashReportingEnabled: crashReporting,
      usageMetricsEnabled: usageMetrics,
      consentGiven: true,
      consentTimestamp: Date.now(),
      consentVersion: CURRENT_CONSENT_VERSION,
    };

    setPreferences({ analyticsPreferences: nextAnalyticsPrefs });

    // Record consent event if usage metrics are enabled
    if (usageMetrics) {
      void recordUsageEvent('setting_changed', { setting: 'analytics_consent_given' }, nextAnalyticsPrefs);
    }

    console.log('[Analytics] Consent given:', nextAnalyticsPrefs);
  },

  revokeAnalyticsConsent: async () => {
    const { setPreferences } = get();

    // Clear all analytics data when revoking consent
    await clearAllAnalyticsData();

    const nextAnalyticsPrefs: AnalyticsPreferences = {
      enabled: false,
      crashReportingEnabled: false,
      usageMetricsEnabled: false,
      consentGiven: false,
      consentTimestamp: null,
      consentVersion: CURRENT_CONSENT_VERSION,
    };

    setPreferences({ analyticsPreferences: nextAnalyticsPrefs });

    console.log('[Analytics] Consent revoked and data cleared');
  },

  clearAnalyticsData: async () => {
    await clearAllAnalyticsData();
    console.log('[Analytics] Data cleared (preferences retained)');
  },

  // Practice actions
  startPracticeSession: (templateId: string, duration: PracticeDuration, conversationContext?: string) => {
    const sessionId = `practice_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newSession: PracticeSession = {
      id: sessionId,
      templateId,
      duration,
      conversationContext,
      currentStepIndex: 0,
      startedAt: Date.now(),
      completedAt: null,
    };
    set({ activePracticeSession: newSession });

    // Also start time tracking for this practice
    const { startTimeSession } = get();
    startTimeSession('practice');

    return sessionId;
  },

  advancePracticeStep: () => {
    set((state) => {
      if (!state.activePracticeSession) return state;

      return {
        activePracticeSession: {
          ...state.activePracticeSession,
          currentStepIndex: state.activePracticeSession.currentStepIndex + 1,
        },
      };
    });
  },

  completePracticeSession: (userReflection?: string) => {
    const { activePracticeSession, completedPracticeSessions, activeTimeSession, endTimeSession } = get();

    if (!activePracticeSession) return;

    const completedAt = Date.now();
    const completion: PracticeCompletion = {
      sessionId: activePracticeSession.id,
      templateId: activePracticeSession.templateId,
      duration: activePracticeSession.duration,
      durationMs: completedAt - activePracticeSession.startedAt,
      userReflection,
      completedAt,
    };

    // End the time tracking session
    if (activeTimeSession) {
      endTimeSession(activeTimeSession.id);
    }

    set({
      activePracticeSession: null,
      completedPracticeSessions: [completion, ...completedPracticeSessions].slice(0, 100), // Keep last 100
    });
  },

  cancelPracticeSession: () => {
    const { activeTimeSession, endTimeSession } = get();

    // End the time tracking session even if cancelled
    if (activeTimeSession) {
      endTimeSession(activeTimeSession.id);
    }

    set({ activePracticeSession: null });
  },

  getPracticeProgress: () => {
    const { activePracticeSession } = get();
    if (!activePracticeSession) return null;

    // We need to dynamically get the total steps from the template
    // This will be calculated in the component using the template
    return {
      currentStep: activePracticeSession.currentStepIndex,
      totalSteps: 0, // Will be filled in by component with template data
    };
  },

  // Session summary actions
  setPendingSessionSummary: (summary: SessionSummary | null) => {
    set({ pendingSessionSummary: summary });
  },

  saveSessionSummary: (summary: SessionSummary) => {
    set((state) => ({
      sessionSummaries: [summary, ...state.sessionSummaries].slice(0, 50), // Keep last 50
      pendingSessionSummary: null,
    }));
  },

  markSessionSummarySavedToJournal: (summaryId: string) => {
    set((state) => ({
      sessionSummaries: state.sessionSummaries.map((s) =>
        s.id === summaryId ? { ...s, savedToJournal: true } : s
      ),
      pendingSessionSummary: state.pendingSessionSummary?.id === summaryId
        ? { ...state.pendingSessionSummary, savedToJournal: true }
        : state.pendingSessionSummary,
    }));
  },

  getSessionSummaries: () => {
    return get().sessionSummaries;
  },

  // Streak tracking actions
  getStreakInfo: () => {
    const { streakData } = get();
    const tier = getMotivationalTier(streakData.currentStreak);
    const message = getRandomMotivationalMessage(tier);

    return {
      streak: streakData,
      motivationalMessage: message,
      motivationalTier: tier,
    };
  },

  recordDailyActivity: () => {
    const { streakData } = get();
    const todayStr = getDateString(new Date());

    // If already recorded activity today, do nothing
    if (streakData.lastActiveDate === todayStr) {
      return;
    }

    let newStreak: StreakData;

    if (!streakData.lastActiveDate) {
      // First ever activity
      newStreak = {
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: todayStr,
        isInGracePeriod: false,
        gracePeriodEndsAt: null,
        totalActiveDays: 1,
      };
    } else {
      const daysSinceActive = getDaysBetween(streakData.lastActiveDate, todayStr);

      if (daysSinceActive === 1) {
        // Consecutive day - extend streak
        const newCurrentStreak = streakData.currentStreak + 1;
        newStreak = {
          currentStreak: newCurrentStreak,
          longestStreak: Math.max(streakData.longestStreak, newCurrentStreak),
          lastActiveDate: todayStr,
          isInGracePeriod: false,
          gracePeriodEndsAt: null,
          totalActiveDays: streakData.totalActiveDays + 1,
        };
      } else if (daysSinceActive === 2 && streakData.isInGracePeriod) {
        // Within grace period - preserve and extend streak
        const newCurrentStreak = streakData.currentStreak + 1;
        newStreak = {
          currentStreak: newCurrentStreak,
          longestStreak: Math.max(streakData.longestStreak, newCurrentStreak),
          lastActiveDate: todayStr,
          isInGracePeriod: false,
          gracePeriodEndsAt: null,
          totalActiveDays: streakData.totalActiveDays + 1,
        };
      } else if (daysSinceActive === 0) {
        // Same day, should not happen due to guard above
        return;
      } else {
        // Streak broken, start fresh
        newStreak = {
          currentStreak: 1,
          longestStreak: streakData.longestStreak,
          lastActiveDate: todayStr,
          isInGracePeriod: false,
          gracePeriodEndsAt: null,
          totalActiveDays: streakData.totalActiveDays + 1,
        };
      }
    }

    set({ streakData: newStreak });
    void persistStreakData(newStreak);
  },

  // Theme pack actions
  startThemePack: (packId: string) => {
    const pack = getThemePackById(packId);
    if (!pack) return;

    const { themePackProgress } = get();

    // If already started, don't reset progress
    if (themePackProgress[packId]) {
      return;
    }

    const newProgress: ThemePackProgress = {
      packId,
      startedAt: Date.now(),
      currentDay: 1,
      completedDays: [],
      lastActivityAt: Date.now(),
      isComplete: false,
      completedAt: null,
    };

    const updatedProgress = {
      ...themePackProgress,
      [packId]: newProgress,
    };

    set({ themePackProgress: updatedProgress });
    void persistThemePackProgress(updatedProgress);
  },

  startThemePackDay: (packId: string, dayNumber: number) => {
    const pack = getThemePackById(packId);
    if (!pack) return;

    const { themePackProgress, startTimeSession } = get();
    const progress = themePackProgress[packId];

    // Ensure pack is started
    if (!progress) {
      // Auto-start the pack
      get().startThemePack(packId);
    }

    // Start the session
    const session: ThemePackSession = {
      packId,
      dayNumber,
      startedAt: Date.now(),
    };

    set({ activeThemePackSession: session });

    // Start time tracking
    startTimeSession('theme-pack');
  },

  completeThemePackDay: (packId: string, dayNumber: number, userReflection?: string) => {
    const { themePackProgress, activeTimeSession, endTimeSession, recordDailyActivity } = get();
    const progress = themePackProgress[packId];

    if (!progress) return;

    const pack = getThemePackById(packId);
    if (!pack) return;

    // Add this day to completed days if not already there
    const completedDays = progress.completedDays.includes(dayNumber)
      ? progress.completedDays
      : [...progress.completedDays, dayNumber].sort((a, b) => a - b);

    // Check if pack is now complete
    const isComplete = completedDays.length >= pack.dayCount;

    const updatedPackProgress: ThemePackProgress = {
      ...progress,
      completedDays,
      currentDay: isComplete ? pack.dayCount : Math.min(dayNumber + 1, pack.dayCount),
      lastActivityAt: Date.now(),
      isComplete,
      completedAt: isComplete ? Date.now() : null,
    };

    const updatedProgress = {
      ...themePackProgress,
      [packId]: updatedPackProgress,
    };

    set({
      themePackProgress: updatedProgress,
      activeThemePackSession: null,
    });

    // End time tracking session
    if (activeTimeSession) {
      endTimeSession(activeTimeSession.id);
    }

    // Record daily activity for streak
    recordDailyActivity();

    void persistThemePackProgress(updatedProgress);
  },

  getThemePackProgress: (packId: string) => {
    const { themePackProgress } = get();
    return themePackProgress[packId] ?? null;
  },

  getAllThemePackProgress: () => {
    const { themePackProgress } = get();
    return themePackProgress;
  },

  cancelThemePackSession: () => {
    const { activeTimeSession, endTimeSession } = get();

    // End time tracking even if cancelled
    if (activeTimeSession) {
      endTimeSession(activeTimeSession.id);
    }

    set({ activeThemePackSession: null });
  },

  // Community prompts actions
  loadCommunityPrompts: async () => {
    // Community prompts are loaded from templates + any approved user submissions
    // In a full implementation, this could fetch from a server
    // For now, we just ensure state is initialized
    const storedData = await loadStoredCommunityData();
    if (storedData) {
      set({
        communitySubmissions: storedData.submissions,
        communityPreferences: storedData.preferences,
        upvotedPromptIds: storedData.upvotedPromptIds,
      });
    }
  },

  submitCommunityPrompt: (promptText: string, category: CommunityPromptCategory) => {
    const { communityPreferences, communitySubmissions } = get();

    if (!communityPreferences.hasAcceptedPrivacyPolicy) {
      console.log('[Community] Privacy policy not accepted, cannot submit');
      return null;
    }

    const submission = createSubmission(promptText, category);
    if (!submission) {
      console.log('[Community] Submission validation failed');
      return null;
    }

    const updatedSubmissions = [submission, ...communitySubmissions];
    set({ communitySubmissions: updatedSubmissions });

    // Persist
    void persistCommunityData({
      submissions: updatedSubmissions,
      preferences: communityPreferences,
      upvotedPromptIds: get().upvotedPromptIds,
    });

    console.log('[Community] Prompt submitted:', submission.id);
    return submission;
  },

  upvotePrompt: (promptId: string) => {
    const { upvotedPromptIds, communitySubmissions, communityPreferences } = get();

    if (upvotedPromptIds.includes(promptId)) {
      return; // Already upvoted
    }

    const updatedUpvotes = [...upvotedPromptIds, promptId];
    set({ upvotedPromptIds: updatedUpvotes });

    // Persist
    void persistCommunityData({
      submissions: communitySubmissions,
      preferences: communityPreferences,
      upvotedPromptIds: updatedUpvotes,
    });
  },

  removeUpvote: (promptId: string) => {
    const { upvotedPromptIds, communitySubmissions, communityPreferences } = get();

    const updatedUpvotes = upvotedPromptIds.filter(id => id !== promptId);
    set({ upvotedPromptIds: updatedUpvotes });

    // Persist
    void persistCommunityData({
      submissions: communitySubmissions,
      preferences: communityPreferences,
      upvotedPromptIds: updatedUpvotes,
    });
  },

  isPromptUpvoted: (promptId: string) => {
    const { upvotedPromptIds } = get();
    return upvotedPromptIds.includes(promptId);
  },

  setCommunityPreferences: (prefs: Partial<CommunityPreferences>) => {
    const { communityPreferences, communitySubmissions, upvotedPromptIds } = get();

    const updatedPrefs = { ...communityPreferences, ...prefs };
    set({ communityPreferences: updatedPrefs });

    // Persist
    void persistCommunityData({
      submissions: communitySubmissions,
      preferences: updatedPrefs,
      upvotedPromptIds,
    });
  },

  acceptCommunityPrivacyPolicy: () => {
    const { communityPreferences, communitySubmissions, upvotedPromptIds } = get();

    const updatedPrefs = {
      ...communityPreferences,
      hasAcceptedPrivacyPolicy: true,
      allowPromptSubmission: true,
    };
    set({ communityPreferences: updatedPrefs });

    // Persist
    void persistCommunityData({
      submissions: communitySubmissions,
      preferences: updatedPrefs,
      upvotedPromptIds,
    });
  },

  // Donation/Tip jar actions
  recordDonation: (record: DonationRecord) => {
    const { donationPreferences } = get();

    const updatedHistory = [record, ...donationPreferences.donationHistory];
    const updatedTotal = calculateTotalDonated(updatedHistory);

    const updatedPrefs: DonationPreferences = {
      ...donationPreferences,
      donationHistory: updatedHistory,
      totalDonated: updatedTotal,
    };

    set({ donationPreferences: updatedPrefs });
    void persistDonationPrefs(updatedPrefs);

    console.log('[Donations] Donation recorded:', record.tierId, record.amount);
  },

  markTipJarSeen: () => {
    const { donationPreferences } = get();

    if (donationPreferences.hasSeenTipJar) return;

    const updatedPrefs: DonationPreferences = {
      ...donationPreferences,
      hasSeenTipJar: true,
    };

    set({ donationPreferences: updatedPrefs });
    void persistDonationPrefs(updatedPrefs);
  },

  markTipJarDismissed: () => {
    const { donationPreferences } = get();

    const updatedPrefs: DonationPreferences = {
      ...donationPreferences,
      hasSeenTipJar: true,
      lastDismissedAt: Date.now(),
    };

    set({ donationPreferences: updatedPrefs });
    void persistDonationPrefs(updatedPrefs);
  },

  // Search history actions
  addToSearchHistory: (item) => {
    const newItem: SearchHistoryItem = {
      ...item,
      id: `search_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
    };
    set((state) => {
      const updated = [newItem, ...state.searchHistory];
      void persistSearchHistory(updated);
      return { searchHistory: updated };
    });
  },

  clearSearchHistory: () => {
    set({ searchHistory: [] });
    void persistSearchHistory([]);
  },

  deleteSearchHistoryItem: (id: string) => {
    set((state) => {
      const updated = state.searchHistory.filter((item) => item.id !== id);
      void persistSearchHistory(updated);
      return { searchHistory: updated };
    });
  },

  getRecentSearchHistory: (limit = 10) => {
    const { searchHistory } = get();
    return searchHistory.slice(0, limit);
  },
}));
