import type { PracticeTemplate } from './types';
import type { ThemeTag } from '../retrieval/search';

/**
 * Core practice templates with 1-minute, 5-minute, and daily variants
 * Each practice is designed to be accessible and grounding
 */
export const PRACTICE_TEMPLATES: PracticeTemplate[] = [
  // Breath-based practices
  {
    id: 'grounding_breath',
    category: 'breath',
    themes: ['peace', 'suffering', 'meditation'] as ThemeTag[],
    icon: '🌬️',
    variants: {
      short: {
        title: 'Three Breaths',
        description: 'Return to the present with three conscious breaths',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Pause whatever you are doing. Let your body settle.', durationSeconds: 10 },
          { instruction: 'Take one deep breath. Feel it fill you completely.', durationSeconds: 15 },
          { instruction: 'Take a second breath. Notice where you feel tension.', durationSeconds: 15 },
          { instruction: 'Take a third breath. Let something soften.', durationSeconds: 15 },
        ],
        closingPrompt: 'What shifted in you?',
      },
      medium: {
        title: 'Breathing Space',
        description: 'Create space between you and what troubles you',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Find a comfortable position. Close your eyes if that feels right.', durationSeconds: 20 },
          { instruction: 'Notice the natural rhythm of your breath without changing it.', durationSeconds: 30 },
          { instruction: 'Now, consciously slow your exhale. Make it slightly longer than your inhale.', durationSeconds: 60 },
          { instruction: 'With each exhale, imagine creating more space inside yourself.', durationSeconds: 60 },
          { instruction: 'Notice any thoughts or feelings. Let them be there, but keep returning to the breath.', durationSeconds: 60 },
          { instruction: 'Imagine breathing out anything you are ready to release.', durationSeconds: 60 },
          { instruction: 'Gently return your attention to your body. Feel the ground beneath you.', durationSeconds: 30 },
        ],
        closingPrompt: 'What do you notice now that you have created some space?',
      },
      long: {
        title: 'Daily Breath Practice',
        description: 'A morning ritual to ground your day in presence',
        estimatedMinutes: 10,
        steps: [
          { instruction: 'Before rising or checking your phone, stay still. Notice you are alive.', durationSeconds: 30 },
          { instruction: 'Take 10 slow breaths, counting each one. If you lose count, start again at 1.', durationSeconds: 120 },
          { instruction: 'On the last breath, set a simple intention for your day. One word is enough.', durationSeconds: 30 },
          { instruction: 'Breathe normally for a minute, letting your intention settle.', durationSeconds: 60 },
          { instruction: 'Imagine your intention as a seed. Each breath waters it throughout the day.', durationSeconds: 60 },
          { instruction: 'Open your eyes slowly. Let the first thing you see receive your full attention.', durationSeconds: 30 },
          { instruction: 'Move into your day carrying this quality of attention.', durationSeconds: 30 },
        ],
        closingPrompt: 'What intention did you plant today?',
      },
    },
  },

  // Self-inquiry practices
  {
    id: 'self_inquiry',
    category: 'inquiry',
    themes: ['self', 'truth', 'knowledge'] as ThemeTag[],
    icon: '🔍',
    variants: {
      short: {
        title: 'One Question',
        description: 'Ask yourself a single, honest question',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Pause. Take one breath to arrive.', durationSeconds: 10 },
          { instruction: 'Ask yourself: "What am I avoiding right now?"', durationSeconds: 20 },
          { instruction: 'Listen. Not for an answer, but for what arises.', durationSeconds: 20 },
          { instruction: 'Whatever came up, simply acknowledge it.', durationSeconds: 10 },
        ],
        closingPrompt: 'What did you notice?',
      },
      medium: {
        title: 'Who Is Here?',
        description: 'Explore the one who is experiencing this moment',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Settle into stillness. Let your attention turn inward.', durationSeconds: 30 },
          { instruction: 'Ask yourself: "What am I feeling right now?" Name it without judgment.', durationSeconds: 45 },
          { instruction: 'Now ask: "Who is feeling this?" Notice the one who observes.', durationSeconds: 45 },
          { instruction: 'Rest in this noticing. You are not only the feeling - you are also the one aware of it.', durationSeconds: 60 },
          { instruction: 'Ask: "What does this feeling need?" Listen gently.', durationSeconds: 60 },
          { instruction: 'Offer yourself the kindness you would offer a friend.', durationSeconds: 60 },
        ],
        closingPrompt: 'What did you discover about who is here?',
      },
      long: {
        title: 'Morning Self-Inquiry',
        description: 'Begin each day by meeting yourself with curiosity',
        estimatedMinutes: 15,
        steps: [
          { instruction: 'Sit quietly before beginning your day. Let the mind settle.', durationSeconds: 60 },
          { instruction: 'Ask: "How am I arriving in this day?" Notice body, heart, and mind.', durationSeconds: 120 },
          { instruction: 'Ask: "What story am I telling myself about today?" Notice the narrative.', durationSeconds: 120 },
          { instruction: 'Ask: "Is this story true? Can I know it for certain?"', durationSeconds: 120 },
          { instruction: 'Ask: "Who would I be today without this story?"', durationSeconds: 120 },
          { instruction: 'Rest in the spaciousness beyond your stories. You are larger than any thought.', durationSeconds: 120 },
          { instruction: 'Set an intention to meet this day with curiosity rather than assumption.', durationSeconds: 60 },
        ],
        closingPrompt: 'What story are you willing to hold more lightly today?',
      },
    },
  },

  // Movement practices
  {
    id: 'mindful_movement',
    category: 'movement',
    themes: ['action', 'discipline', 'meditation'] as ThemeTag[],
    icon: '🧘',
    variants: {
      short: {
        title: 'Body Check',
        description: 'Quickly tune into your physical presence',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Stand or sit tall. Feel your feet on the ground.', durationSeconds: 15 },
          { instruction: 'Roll your shoulders back once. Let them drop.', durationSeconds: 10 },
          { instruction: 'Unclench your jaw. Soften your face.', durationSeconds: 10 },
          { instruction: 'Take one full breath into your belly.', durationSeconds: 15 },
          { instruction: 'Notice: you have a body. You are here.', durationSeconds: 10 },
        ],
        closingPrompt: 'What did your body tell you?',
      },
      medium: {
        title: 'Gentle Movement',
        description: 'Release tension through mindful stretching',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Stand with feet hip-width apart. Close your eyes.', durationSeconds: 20 },
          { instruction: 'Slowly roll your head in a circle, noticing any tightness.', durationSeconds: 40 },
          { instruction: 'Raise your arms overhead. Stretch toward the sky. Hold for 3 breaths.', durationSeconds: 30 },
          { instruction: 'Fold forward slowly, letting your head hang heavy. Stay for 3 breaths.', durationSeconds: 40 },
          { instruction: 'Roll up slowly, stacking vertebra by vertebra. Notice your spine.', durationSeconds: 30 },
          { instruction: 'Twist gently to the right, then left. Let your arms swing naturally.', durationSeconds: 40 },
          { instruction: 'Return to center. Stand still. Feel the aliveness in your body.', durationSeconds: 30 },
        ],
        closingPrompt: 'Where does your body feel more open?',
      },
      long: {
        title: 'Daily Body Practice',
        description: 'A morning movement ritual to awaken fully',
        estimatedMinutes: 10,
        steps: [
          { instruction: 'Begin lying flat. Notice every point where your body touches the floor.', durationSeconds: 60 },
          { instruction: 'Stretch your whole body from fingertips to toes. Hold, then release.', durationSeconds: 30 },
          { instruction: 'Roll to your side and slowly press up to sitting.', durationSeconds: 30 },
          { instruction: 'Cat-cow stretches: arch your back, then round it. 5 cycles.', durationSeconds: 60 },
          { instruction: 'Come to standing. Ground through your feet.', durationSeconds: 30 },
          { instruction: 'Flow through 3 sun salutations or simple standing stretches.', durationSeconds: 180 },
          { instruction: 'Return to stillness. Feel the energy circulating through you.', durationSeconds: 60 },
          { instruction: 'Set an intention to move mindfully through your day.', durationSeconds: 30 },
        ],
        closingPrompt: 'How does your body want to move today?',
      },
    },
  },

  // Writing practices
  {
    id: 'reflective_writing',
    category: 'writing',
    themes: ['self', 'knowledge', 'truth'] as ThemeTag[],
    icon: '✍️',
    variants: {
      short: {
        title: 'One Sentence',
        description: 'Capture your state in a single honest sentence',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Take a breath and arrive in this moment.', durationSeconds: 10 },
          { instruction: 'Complete this sentence: "Right now, I feel..."', durationSeconds: 30 },
          { instruction: 'Read what you wrote. Let it be true.', durationSeconds: 20 },
        ],
        closingPrompt: 'What did naming your feeling do?',
      },
      medium: {
        title: 'Stream of Presence',
        description: 'Write without stopping for 3 minutes',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Have paper or your journal ready.', durationSeconds: 20 },
          { instruction: 'Set a timer for 3 minutes.', durationSeconds: 10 },
          { instruction: 'Write continuously about what is alive in you. Do not stop to think or edit.', durationSeconds: 180 },
          { instruction: 'When the timer ends, stop. Read what you wrote.', durationSeconds: 30 },
          { instruction: 'Circle or underline anything that surprises you.', durationSeconds: 30 },
        ],
        closingPrompt: 'What emerged that you did not expect?',
      },
      long: {
        title: 'Morning Pages',
        description: 'Daily stream-of-consciousness writing practice',
        estimatedMinutes: 15,
        steps: [
          { instruction: 'Before doing anything else, open your journal.', durationSeconds: 30 },
          { instruction: 'Write three full pages of whatever comes to mind.', durationSeconds: 720 },
          { instruction: 'Do not censor. Do not reread. Just keep the pen moving.', durationSeconds: 0, isOptional: true },
          { instruction: 'When finished, close the journal without reading.', durationSeconds: 30 },
          { instruction: 'Take three breaths before beginning your day.', durationSeconds: 30 },
        ],
        closingPrompt: 'What did you clear by writing today?',
      },
    },
  },

  // Stillness practices
  {
    id: 'simply_being',
    category: 'stillness',
    themes: ['peace', 'detachment', 'impermanence'] as ThemeTag[],
    icon: '🪷',
    variants: {
      short: {
        title: 'Pause',
        description: 'Stop completely for 60 seconds',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Stop. Completely.', durationSeconds: 5 },
          { instruction: 'Do nothing. Think nothing. Just be.', durationSeconds: 50 },
          { instruction: 'Return gently to activity.', durationSeconds: 5 },
        ],
        closingPrompt: 'What is different after stopping?',
      },
      medium: {
        title: 'Sitting Still',
        description: 'Practice pure presence without agenda',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Sit comfortably. Let your hands rest. Close your eyes.', durationSeconds: 20 },
          { instruction: 'Let thoughts come and go like clouds. You are the sky.', durationSeconds: 60 },
          { instruction: 'If you catch yourself planning or analyzing, gently return to now.', durationSeconds: 60 },
          { instruction: 'Notice sounds around you. Let them be background.', durationSeconds: 60 },
          { instruction: 'Rest in the simplicity of being alive, breathing, here.', durationSeconds: 60 },
          { instruction: 'Slowly open your eyes. See the world fresh.', durationSeconds: 20 },
        ],
        closingPrompt: 'What is it like to simply be?',
      },
      long: {
        title: 'Daily Stillness',
        description: 'A daily practice of doing nothing',
        estimatedMinutes: 20,
        steps: [
          { instruction: 'Find a quiet space. Sit down. Set a timer for 20 minutes.', durationSeconds: 30 },
          { instruction: 'For the entire time, simply sit. No technique. No goal.', durationSeconds: 1140 },
          { instruction: 'When the mind wanders, notice it without judgment. Return to sitting.', durationSeconds: 0, isOptional: true },
          { instruction: 'When the timer sounds, take three breaths before rising.', durationSeconds: 30 },
        ],
        closingPrompt: 'What do you learn from stillness?',
      },
    },
  },

  // Gratitude practices
  {
    id: 'gratitude_practice',
    category: 'gratitude',
    themes: ['devotion', 'peace', 'compassion'] as ThemeTag[],
    icon: '🙏',
    variants: {
      short: {
        title: 'One Gratitude',
        description: 'Name one thing you are grateful for',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Pause. Let your attention settle.', durationSeconds: 10 },
          { instruction: 'Name one thing you are grateful for in this moment.', durationSeconds: 20 },
          { instruction: 'Feel the gratitude in your body. Let it warm you.', durationSeconds: 20 },
          { instruction: 'Whisper "thank you" silently or aloud.', durationSeconds: 10 },
        ],
        closingPrompt: 'What did gratitude feel like in your body?',
      },
      medium: {
        title: 'Gratitude Expansion',
        description: 'Expand gratitude from self to others to all',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Think of something your body did for you today. Thank it.', durationSeconds: 45 },
          { instruction: 'Think of someone who helped you recently. Send them silent thanks.', durationSeconds: 45 },
          { instruction: 'Think of something in nature you appreciate. Acknowledge it.', durationSeconds: 45 },
          { instruction: 'Think of a challenge that taught you something. Bow to it.', durationSeconds: 45 },
          { instruction: 'Expand your gratitude to include all beings seeking peace.', durationSeconds: 45 },
          { instruction: 'Rest in the feeling of abundance that gratitude reveals.', durationSeconds: 30 },
        ],
        closingPrompt: 'How does gratitude change your perspective?',
      },
      long: {
        title: 'Evening Gratitude',
        description: 'End each day by counting blessings',
        estimatedMinutes: 10,
        steps: [
          { instruction: 'Before sleep, review your day from morning to now.', durationSeconds: 60 },
          { instruction: 'Find 5 things you are grateful for. Write them down if you can.', durationSeconds: 180 },
          { instruction: 'For each one, pause and really feel the gratitude.', durationSeconds: 120 },
          { instruction: 'Think of one person who made your day better. Send them a blessing.', durationSeconds: 60 },
          { instruction: 'Thank yourself for making it through another day.', durationSeconds: 30 },
          { instruction: 'Let gratitude be the last thought before sleep.', durationSeconds: 30 },
        ],
        closingPrompt: 'What surprised you on your gratitude list?',
      },
    },
  },

  // Compassion practices
  {
    id: 'self_compassion',
    category: 'compassion',
    themes: ['compassion', 'suffering', 'self'] as ThemeTag[],
    icon: '💚',
    variants: {
      short: {
        title: 'Kind Word',
        description: 'Offer yourself a single kind thought',
        estimatedMinutes: 1,
        steps: [
          { instruction: 'Place your hand on your heart.', durationSeconds: 10 },
          { instruction: 'Say silently: "May I be kind to myself right now."', durationSeconds: 20 },
          { instruction: 'Feel the warmth of your own hand. You are your own ally.', durationSeconds: 20 },
          { instruction: 'Take one breath of self-compassion.', durationSeconds: 10 },
        ],
        closingPrompt: 'What did it feel like to be kind to yourself?',
      },
      medium: {
        title: 'Loving-Kindness',
        description: 'Extend compassion to yourself and others',
        estimatedMinutes: 5,
        steps: [
          { instruction: 'Sit comfortably. Bring to mind someone you love easily.', durationSeconds: 30 },
          { instruction: 'Silently wish them: "May you be happy. May you be at peace."', durationSeconds: 45 },
          { instruction: 'Now bring yourself to mind with the same gentleness.', durationSeconds: 30 },
          { instruction: 'Silently wish yourself: "May I be happy. May I be at peace."', durationSeconds: 45 },
          { instruction: 'Think of someone neutral - a stranger. Extend the same wishes.', durationSeconds: 45 },
          { instruction: 'Finally, extend loving-kindness to all beings everywhere.', durationSeconds: 45 },
          { instruction: 'Rest in the feeling of universal compassion.', durationSeconds: 30 },
        ],
        closingPrompt: 'How does extending compassion change you?',
      },
      long: {
        title: 'Daily Compassion Practice',
        description: 'Begin each day by cultivating compassion',
        estimatedMinutes: 10,
        steps: [
          { instruction: 'Sit quietly. Let your heart soften.', durationSeconds: 30 },
          { instruction: 'Recall a time someone showed you kindness. Feel it again.', durationSeconds: 60 },
          { instruction: 'Generate the same feeling and direct it toward yourself.', durationSeconds: 90 },
          { instruction: 'Think of someone struggling. Send them compassion.', durationSeconds: 90 },
          { instruction: 'Expand to include all beings: "May all beings be free from suffering."', durationSeconds: 90 },
          { instruction: 'Set an intention to notice one person today and offer silent compassion.', durationSeconds: 60 },
          { instruction: 'Return to your breath. Carry compassion into your day.', durationSeconds: 60 },
        ],
        closingPrompt: 'Who will receive your silent compassion today?',
      },
    },
  },
];

/**
 * Get a practice template by ID
 */
export function getPracticeTemplateById(id: string): PracticeTemplate | undefined {
  return PRACTICE_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get practice templates by theme
 */
export function getPracticeTemplatesByTheme(theme: ThemeTag): PracticeTemplate[] {
  return PRACTICE_TEMPLATES.filter((t) => t.themes.includes(theme));
}

/**
 * Get practice templates by category
 */
export function getPracticeTemplatesByCategory(category: PracticeTemplate['category']): PracticeTemplate[] {
  return PRACTICE_TEMPLATES.filter((t) => t.category === category);
}

/**
 * Get all practice templates
 */
export function getAllPracticeTemplates(): PracticeTemplate[] {
  return PRACTICE_TEMPLATES;
}
