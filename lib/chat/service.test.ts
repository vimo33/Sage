import { regenerateAssistantResult, generateToneVariants, type RegenerateOptions, type ToneVariants } from './service';
import type { UserPreferences } from '../storage/store';

// Mock llama.rn and its exports
jest.mock('llama.rn', () => ({
  initLlama: jest.fn(),
  releaseAllLlama: jest.fn(),
}));

// Mock the inference module
jest.mock('../llm/inference', () => ({
  generateChat: jest.fn().mockResolvedValue({
    text: 'Test regenerated response',
    content: 'Guidance:\nThis is a test regenerated response.\n\nReflection:\n- What is this testing?\n- How can we verify?\n\nPractice:\n- Take a test breath.',
    reasoningContent: '',
    toolCalls: [],
    tokensPredicted: 50,
    tokensEvaluated: 100,
    timings: {},
  }),
  isModelReady: jest.fn().mockReturnValue(true),
}));

// Mock the search module
jest.mock('../retrieval/search', () => ({
  searchWisdom: jest.fn().mockResolvedValue([
    {
      id: 'test-1',
      content: 'Test wisdom passage 1',
      sourceRef: 'Test Source 1:1',
      book: 'Test Book',
      theme: 'action',
      tone: 'direct',
    },
    {
      id: 'test-2',
      content: 'Test wisdom passage 2',
      sourceRef: 'Test Source 2:2',
      book: 'Test Book',
      theme: 'purpose',
      tone: 'philosophical',
    },
  ]),
  detectIntentThemes: jest.fn().mockReturnValue(['action']),
}));

describe('regenerateAssistantResult', () => {
  const mockPreferences: UserPreferences = {
    tone: 'practical',
    fontSize: 'medium',
    voiceSpeed: 1.0,
    narrateResponses: false,
    showCitations: true,
    preferredThemes: [],
    preferredTraditions: [],
    crossTraditionBlending: true,
    hasCompletedOnboarding: true,
    biometricLockEnabled: false,
    notificationPreferences: {
      enabled: false,
      reminderTime: '09:00',
      frequency: 'daily',
      customDays: [1, 2, 3, 4, 5, 6, 7],
    },
    analyticsPreferences: {
      enabled: false,
      crashReportingEnabled: false,
      usageMetricsEnabled: false,
      consentGiven: false,
      consentTimestamp: null,
      consentVersion: '1.0.0',
    },
    developerSettings: {
      enabled: false,
      temperature: 0.8,
      topK: 40,
      topP: 0.9,
      repeatPenalty: 1.2,
    },
    accentColor: 'green',
  };

  const mockPreferencesWithDevSettings: UserPreferences = {
    ...mockPreferences,
    developerSettings: {
      enabled: true,
      temperature: 1.5,
      topK: 60,
      topP: 0.85,
      repeatPenalty: 1.0,
    },
  };

  const mockPreviousMessages = [
    { role: 'user' as const, content: 'Hello' },
    { role: 'assistant' as const, content: 'Hi there!' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should regenerate with low temperature (focused)', async () => {
    const options: RegenerateOptions = {
      temperature: 'low',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('citedVerses');
    expect(result.content).toContain('Guidance');
    expect(Array.isArray(result.citedVerses)).toBe(true);
  });

  test('should regenerate with medium temperature (balanced)', async () => {
    const options: RegenerateOptions = {
      temperature: 'medium',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result.content).toBeTruthy();
  });

  test('should regenerate with high temperature (creative)', async () => {
    const options: RegenerateOptions = {
      temperature: 'high',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result.content).toBeTruthy();
  });

  test('should handle useDifferentWisdom option', async () => {
    const options: RegenerateOptions = {
      temperature: 'medium',
      useDifferentWisdom: true,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('citedVerses');
  });

  test('should return valid structure with citedVerses', async () => {
    const options: RegenerateOptions = {
      temperature: 'medium',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      mockPreviousMessages,
      options
    );

    expect(result.citedVerses).toBeDefined();
    expect(result.citedVerses.length).toBeGreaterThan(0);
    expect(result.citedVerses[0]).toHaveProperty('content');
    expect(result.citedVerses[0]).toHaveProperty('sourceRef');
  });

  test('should work with empty previous messages', async () => {
    const options: RegenerateOptions = {
      temperature: 'medium',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferences,
      [],
      options
    );

    expect(result).toHaveProperty('content');
    expect(result.content).toBeTruthy();
  });

  test('should use developer settings when enabled', async () => {
    const options: RegenerateOptions = {
      temperature: 'medium',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      mockPreferencesWithDevSettings,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result.content).toBeTruthy();
    // The log should show devSettings: ON
  });

  test('should still work with developer settings disabled', async () => {
    const preferencesWithDisabledDevSettings: UserPreferences = {
      ...mockPreferencesWithDevSettings,
      developerSettings: {
        ...mockPreferencesWithDevSettings.developerSettings,
        enabled: false,
      },
    };

    const options: RegenerateOptions = {
      temperature: 'high',
      useDifferentWisdom: false,
    };

    const result = await regenerateAssistantResult(
      'Test query',
      preferencesWithDisabledDevSettings,
      mockPreviousMessages,
      options
    );

    expect(result).toHaveProperty('content');
    expect(result.content).toBeTruthy();
  });
});

describe('generateToneVariants', () => {
  const mockPreviousMessages = [
    { role: 'user' as const, content: 'Hello' },
    { role: 'assistant' as const, content: 'Hi there!' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should generate all three tone variants (practical, poetic, deep)', async () => {
    const result = await generateToneVariants('Test query', mockPreviousMessages);

    // Verify the result has all three tone variants
    expect(result).toHaveProperty('practical');
    expect(result).toHaveProperty('poetic');
    expect(result).toHaveProperty('deep');
  });

  test('each tone variant should have content and citedVerses', async () => {
    const result = await generateToneVariants('Test query', mockPreviousMessages);

    // Check practical variant structure
    expect(result.practical).toHaveProperty('content');
    expect(result.practical).toHaveProperty('citedVerses');
    expect(result.practical.content).toBeTruthy();
    expect(Array.isArray(result.practical.citedVerses)).toBe(true);

    // Check poetic variant structure
    expect(result.poetic).toHaveProperty('content');
    expect(result.poetic).toHaveProperty('citedVerses');
    expect(result.poetic.content).toBeTruthy();
    expect(Array.isArray(result.poetic.citedVerses)).toBe(true);

    // Check deep variant structure
    expect(result.deep).toHaveProperty('content');
    expect(result.deep).toHaveProperty('citedVerses');
    expect(result.deep.content).toBeTruthy();
    expect(Array.isArray(result.deep.citedVerses)).toBe(true);
  });

  test('should work with empty previous messages', async () => {
    const result = await generateToneVariants('Test query', []);

    expect(result).toHaveProperty('practical');
    expect(result).toHaveProperty('poetic');
    expect(result).toHaveProperty('deep');
  });

  test('cited verses should be the same across all tone variants', async () => {
    const result = await generateToneVariants('Test query', mockPreviousMessages);

    // All three variants should have the same citations
    // (since they use the same wisdom passages)
    expect(result.practical.citedVerses.length).toBe(result.poetic.citedVerses.length);
    expect(result.practical.citedVerses.length).toBe(result.deep.citedVerses.length);

    // If there are citations, they should have the same sources
    if (result.practical.citedVerses.length > 0) {
      expect(result.practical.citedVerses[0].sourceRef).toBe(result.poetic.citedVerses[0].sourceRef);
      expect(result.practical.citedVerses[0].sourceRef).toBe(result.deep.citedVerses[0].sourceRef);
    }
  });
});
