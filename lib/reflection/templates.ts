import type { GuidedReflection, ReflectionPrompt } from './types';
import type { ThemeTag } from '../retrieval/search';

// Helper to create prompts with consistent IDs
function createPrompts(themeId: string, prompts: Omit<ReflectionPrompt, 'id'>[]): ReflectionPrompt[] {
  return prompts.map((p, idx) => ({
    ...p,
    id: `${themeId}_prompt_${idx + 1}`,
  }));
}

export const GUIDED_REFLECTIONS: GuidedReflection[] = [
  // Morning Check-in - Purpose theme
  {
    id: 'morning_purpose',
    themeId: 'purpose' as ThemeTag,
    title: 'Morning Check-in',
    description: 'Set your intentions for the day ahead',
    icon: '☀️',
    estimatedMinutes: 5,
    prompts: createPrompts('morning_purpose', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'As you begin this new day, what is the first feeling or thought that arises?',
        guidance: 'Take a moment to notice what is present in your mind and body right now.',
        questionVariations: [
          'What emotion is most present in you right now?',
          'How does your body feel as you start this day?',
          'What is the quality of your mind in this moment?',
          'What were you thinking about just before this reflection?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'What matters most to you today? What would make this day meaningful?',
        guidance: 'Consider not just tasks, but the quality of presence you wish to bring.',
        questionVariations: [
          'If this day were your last, what would you want to experience?',
          'What one thing, if accomplished, would bring you peace tonight?',
          'Who could you connect with meaningfully today?',
          'What quality of being do you want to cultivate today?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'What challenge might you face today, and what inner strength could help you meet it?',
        guidance: 'Reflect on a quality or wisdom that could guide you through difficulty.',
        questionVariations: [
          'What fear might arise today, and how could you meet it with compassion?',
          'What past wisdom could serve you in today\'s challenges?',
          'Where might you need patience or resilience today?',
          'What would your wisest self advise about today\'s difficulties?',
        ],
      },
      {
        order: 4,
        depth: 'closing',
        promptText: 'What one small intention will you carry with you through this day?',
        guidance: 'Choose something simple and specific that you can return to.',
        questionVariations: [
          'What single word could be your guide today?',
          'What reminder could you give yourself when things get busy?',
          'How will you know if you\'ve lived this day well?',
          'What promise do you make to yourself for today?',
        ],
      },
    ]),
  },

  // Evening Wind-down - Peace theme
  {
    id: 'evening_peace',
    themeId: 'peace' as ThemeTag,
    title: 'Evening Wind-down',
    description: 'Release the day and find peace',
    icon: '🌙',
    estimatedMinutes: 10,
    prompts: createPrompts('evening_peace', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'As this day comes to a close, what are you still carrying?',
        guidance: 'Notice any tension, thoughts, or emotions that linger from the day.',
        questionVariations: [
          'Where in your body do you feel the weight of today?',
          'What thought keeps returning as the day ends?',
          'What emotion from today hasn\'t fully settled?',
          'If you could name what\'s lingering, what would you call it?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'What moment from today brought you a sense of peace or connection?',
        guidance: 'It may be small - a conversation, a pause, a glimpse of beauty.',
        questionVariations: [
          'When did you feel most like yourself today?',
          'What small kindness did you witness or offer today?',
          'What made you pause and smile, even briefly?',
          'Where did you find unexpected beauty today?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'What would it mean to fully release the day - the successes and the struggles alike?',
        guidance: 'Consider what letting go would feel like in your body and mind.',
        questionVariations: [
          'What would it feel like to set down all of today\'s concerns?',
          'If you could leave one thing from today behind, what would it be?',
          'How would your body change if you fully let go right now?',
          'What permission do you need to give yourself to rest?',
        ],
      },
      {
        order: 4,
        depth: 'integrating',
        promptText: 'What did today teach you that you want to remember?',
        guidance: 'Allow any insight or lesson to settle into your awareness.',
        questionVariations: [
          'What wisdom emerged from today\'s experiences?',
          'How did today help you grow, even slightly?',
          'What truth became clearer through today\'s events?',
          'What would you tell your morning self about this day?',
        ],
      },
      {
        order: 5,
        depth: 'closing',
        promptText: 'What blessing or gratitude do you offer to yourself as you prepare for rest?',
        guidance: 'Speak kindly to yourself as you would to a dear friend.',
        questionVariations: [
          'How can you honor yourself for making it through today?',
          'What gentle words does your heart need to hear right now?',
          'What are you grateful for about yourself today?',
          'What wish do you hold for yourself as you sleep?',
        ],
      },
    ]),
  },

  // Nature Walk - Meditation theme
  {
    id: 'nature_meditation',
    themeId: 'meditation' as ThemeTag,
    title: 'Nature Walk',
    description: 'Connect with the world around you',
    icon: '🌲',
    estimatedMinutes: 15,
    prompts: createPrompts('nature_meditation', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'Pause and take three deep breaths. What do you notice in your immediate surroundings?',
        guidance: 'Use your senses - what do you see, hear, smell, feel?',
        questionVariations: [
          'What sounds are present in this moment?',
          'What colors catch your attention right now?',
          'What does the air feel like on your skin?',
          'What natural element is closest to you?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'Choose one element of nature around you. What does observing it reveal?',
        guidance: 'A tree, a stone, the sky, a leaf - let it speak to you.',
        questionVariations: [
          'If this natural element could share its wisdom, what would it say?',
          'How long has this element been here, and what has it witnessed?',
          'What does this element teach about time and change?',
          'How does this part of nature survive and thrive?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'How does being in nature change your perspective on whatever you were thinking about before?',
        guidance: 'Notice how the natural world offers a different scale and rhythm.',
        questionVariations: [
          'What worries feel smaller when held against the vastness of nature?',
          'How does nature\'s rhythm differ from the pace of your thoughts?',
          'What does the natural world not care about that you spend energy on?',
          'How might nature view your current challenges?',
        ],
      },
      {
        order: 4,
        depth: 'integrating',
        promptText: 'What quality from nature would you like to embody in your daily life?',
        guidance: 'Perhaps the patience of a river, the resilience of a weed, the stillness of a mountain.',
        questionVariations: [
          'What does nature model that you want to learn?',
          'Which natural cycle speaks to where you are in life?',
          'What balance does nature maintain that you seek?',
          'How could you bring this natural quality into tomorrow?',
        ],
      },
      {
        order: 5,
        depth: 'closing',
        promptText: 'Before you leave this moment, what will you take with you? What will you leave behind?',
        guidance: 'Make a conscious choice about what you carry forward.',
        questionVariations: [
          'What gift has nature offered you in this time?',
          'What can you release into this natural space?',
          'How will you honor this connection when you return to daily life?',
          'What silent promise do you make to yourself here?',
        ],
      },
    ]),
  },

  // Dealing with Suffering - Suffering theme
  {
    id: 'facing_suffering',
    themeId: 'suffering' as ThemeTag,
    title: 'Facing Difficulty',
    description: 'Find wisdom in challenging times',
    icon: '🌊',
    estimatedMinutes: 10,
    prompts: createPrompts('facing_suffering', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'What difficulty or pain are you facing right now?',
        guidance: 'Name it simply, without judgment. Just acknowledge what is.',
        questionVariations: [
          'What challenge weighs most heavily on your heart?',
          'What struggle have you been avoiding naming?',
          'If you could speak your difficulty aloud, what would you say?',
          'What is the shape of the pain you carry today?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'Where do you feel this difficulty in your body? What is its quality?',
        guidance: 'Bring gentle attention to the physical sensations that accompany this challenge.',
        questionVariations: [
          'What physical sensations arise when you think of this challenge?',
          'Is this pain sharp or dull, constant or fleeting?',
          'How does your body hold this difficulty?',
          'What changes in your breathing when you face this?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'If this difficulty could speak, what might it be trying to teach you?',
        guidance: 'Even pain can carry wisdom. Listen without resistance.',
        questionVariations: [
          'What message lives beneath this struggle?',
          'How has this difficulty shown you something about yourself?',
          'What growth might be hidden within this challenge?',
          'What would you miss if this difficulty disappeared instantly?',
        ],
      },
      {
        order: 4,
        depth: 'integrating',
        promptText: 'What would compassion toward yourself look like in this situation?',
        guidance: 'Imagine how you would comfort a dear friend facing the same struggle.',
        questionVariations: [
          'How would you speak to a beloved friend facing this same pain?',
          'What kindness are you withholding from yourself?',
          'What do you need to hear right now that no one has said?',
          'How can you be your own ally in this struggle?',
        ],
      },
      {
        order: 5,
        depth: 'closing',
        promptText: 'What is one tiny act of care you can offer yourself right now?',
        guidance: 'Choose something simple and doable - a breath, a word, a gesture.',
        questionVariations: [
          'What small comfort could you give yourself in this moment?',
          'What gentle action would soothe you right now?',
          'How can you tend to yourself with the same care you\'d give others?',
          'What is the smallest step toward peace you could take today?',
        ],
      },
    ]),
  },

  // Taking Action - Action theme
  {
    id: 'mindful_action',
    themeId: 'action' as ThemeTag,
    title: 'Mindful Action',
    description: 'Move from hesitation to purposeful doing',
    icon: '⚡',
    estimatedMinutes: 8,
    prompts: createPrompts('mindful_action', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'What action have you been avoiding or postponing?',
        guidance: 'Be honest. Name the thing that keeps coming to mind.',
        questionVariations: [
          'What task keeps appearing in your mind but remains undone?',
          'What are you resisting that you know needs your attention?',
          'What would you do today if procrastination weren\'t an option?',
          'What keeps calling to you that you haven\'t answered?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'What stories or fears surround this action? What do you tell yourself about it?',
        guidance: 'Notice the narrative your mind creates around this task.',
        questionVariations: [
          'What worst-case scenario plays in your mind about this action?',
          'What beliefs about yourself make this action feel difficult?',
          'What excuses have become comfortable?',
          'What would change if these fears weren\'t true?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'Separate the action from its outcome. What is the simplest first step?',
        guidance: 'Focus on the doing, not the result. What is the very first movement?',
        questionVariations: [
          'If you only had to do 5 minutes of this, what would you do?',
          'What single motion would begin this journey?',
          'What\'s the smallest possible version of this action?',
          'If results didn\'t matter, how would you approach this?',
        ],
      },
      {
        order: 4,
        depth: 'closing',
        promptText: 'Commit to that one small step. When will you take it?',
        guidance: 'Make it specific and immediate. The journey begins with this moment.',
        questionVariations: [
          'What specific time today will you begin?',
          'What will be different after you take this step?',
          'Who could witness or support this commitment?',
          'How will you celebrate taking this first step?',
        ],
      },
    ]),
  },

  // Self-Discovery - Self theme
  {
    id: 'knowing_self',
    themeId: 'self' as ThemeTag,
    title: 'Knowing Yourself',
    description: 'Explore who you truly are',
    icon: '🔮',
    estimatedMinutes: 12,
    prompts: createPrompts('knowing_self', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'When you think of "who I am," what first comes to mind?',
        guidance: 'Notice your initial identity markers - roles, traits, stories.',
        questionVariations: [
          'How would you introduce yourself to your own soul?',
          'What labels do you most often use to describe yourself?',
          'What story do you tell others about who you are?',
          'What identity feels most true and which feels most performed?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'Beyond your roles and responsibilities, who are you in your quietest moments?',
        guidance: 'Set aside what you do. What remains?',
        questionVariations: [
          'Who are you when no one is watching?',
          'What do you love that has nothing to do with achievement?',
          'What arises in stillness that gets drowned out by busyness?',
          'If all your responsibilities vanished, who would remain?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'What aspects of yourself have you been hiding or suppressing? Why?',
        guidance: 'This is a safe space. What parts of you long to be seen?',
        questionVariations: [
          'What part of you feels unsafe to show the world?',
          'What have you tucked away to fit in or be accepted?',
          'What secret self do you wish someone could meet?',
          'What fear keeps certain parts of you hidden?',
        ],
      },
      {
        order: 4,
        depth: 'integrating',
        promptText: 'If you fully accepted all parts of yourself, how might your life change?',
        guidance: 'Imagine radical self-acceptance. What becomes possible?',
        questionVariations: [
          'What would you dare to do if you stopped judging yourself?',
          'How would your relationships transform with complete self-acceptance?',
          'What burden would lift if you embraced your whole self?',
          'What dreams might you pursue without self-doubt?',
        ],
      },
      {
        order: 5,
        depth: 'closing',
        promptText: 'What one truth about yourself are you ready to embrace?',
        guidance: 'Choose something real. Let it settle into your being.',
        questionVariations: [
          'What have you known about yourself but haven\'t fully claimed?',
          'What truth can you speak about yourself today?',
          'What do you want to finally acknowledge about who you are?',
          'What aspect of yourself deserves your acceptance right now?',
        ],
      },
    ]),
  },

  // Letting Go - Detachment theme
  {
    id: 'letting_go',
    themeId: 'detachment' as ThemeTag,
    title: 'Letting Go',
    description: 'Release what no longer serves you',
    icon: '🍂',
    estimatedMinutes: 10,
    prompts: createPrompts('letting_go', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'What are you holding onto that feels heavy or burdensome?',
        guidance: 'It might be a grudge, a fear, an expectation, or an old story.',
        questionVariations: [
          'What weight have you been carrying that\'s exhausting you?',
          'What old pain still has a grip on your heart?',
          'What are you holding that you wish you could set down?',
          'What attachment is costing you your peace?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'How has holding onto this served you? What has it protected?',
        guidance: 'Even our attachments have reasons. Honor them.',
        questionVariations: [
          'What comfort has this attachment provided?',
          'What would you have had to face if you\'d let go sooner?',
          'How did holding on feel like survival at some point?',
          'What identity has been tied to this attachment?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'What would become possible if you released this? What space would open?',
        guidance: 'Imagine the lightness. Feel it in your body.',
        questionVariations: [
          'What could fill the space this attachment currently occupies?',
          'How would your energy shift if this weight lifted?',
          'What new beginnings await on the other side of release?',
          'What might you discover about yourself without this burden?',
        ],
      },
      {
        order: 4,
        depth: 'integrating',
        promptText: 'What makes letting go feel difficult? What is the fear beneath the grip?',
        guidance: 'Be tender with yourself. Letting go is an act of courage.',
        questionVariations: [
          'What are you afraid might happen if you let go?',
          'What part of you is not ready to release this?',
          'What loss do you fear in the letting go?',
          'What do you think you might lose along with this release?',
        ],
      },
      {
        order: 5,
        depth: 'closing',
        promptText: 'Take a breath and symbolically release. What words mark this letting go?',
        guidance: 'You might say "I release..." or simply exhale with intention.',
        questionVariations: [
          'What ritual could honor both the holding and the releasing?',
          'What would you say to this attachment as you let it go?',
          'How will you remember this moment of release?',
          'What blessing do you offer as you open your hands?',
        ],
      },
    ]),
  },

  // Gratitude Practice - Devotion theme
  {
    id: 'gratitude_devotion',
    themeId: 'devotion' as ThemeTag,
    title: 'Gratitude Practice',
    description: 'Cultivate thankfulness and appreciation',
    icon: '🙏',
    estimatedMinutes: 7,
    prompts: createPrompts('gratitude_devotion', [
      {
        order: 1,
        depth: 'opening',
        promptText: 'What is one thing you are grateful for in this very moment?',
        guidance: 'Start with something immediate and tangible.',
        questionVariations: [
          'What small blessing are you often blind to?',
          'What in your immediate surroundings brings you comfort?',
          'What simple pleasure did you enjoy today?',
          'What do you have now that you once wished for?',
        ],
      },
      {
        order: 2,
        depth: 'exploring',
        promptText: 'Think of someone who has helped you recently. What did their support mean?',
        guidance: 'Consider the web of care that surrounds you.',
        questionVariations: [
          'Whose kindness has touched you lately?',
          'What unexpected help have you received recently?',
          'Who has believed in you when you doubted yourself?',
          'What relationship has sustained you through difficulty?',
        ],
      },
      {
        order: 3,
        depth: 'deepening',
        promptText: 'What challenge or difficulty has, in retrospect, brought you growth?',
        guidance: 'Find gratitude even in the harder moments.',
        questionVariations: [
          'What struggle are you now grateful for having faced?',
          'How has a past hardship shaped you positively?',
          'What lesson came wrapped in difficulty?',
          'What strength emerged from a challenging time?',
        ],
      },
      {
        order: 4,
        depth: 'closing',
        promptText: 'How can you carry this sense of gratitude into your next hour?',
        guidance: 'Let thankfulness become a way of moving through the world.',
        questionVariations: [
          'What small act of appreciation could you offer someone today?',
          'How might gratitude change your next interaction?',
          'What reminder of thankfulness will you set for yourself?',
          'How can you let gratitude guide your next decision?',
        ],
      },
    ]),
  },
];

/**
 * Get a guided reflection by its ID
 */
export function getGuidedReflectionById(id: string): GuidedReflection | undefined {
  return GUIDED_REFLECTIONS.find((r) => r.id === id);
}

/**
 * Get guided reflections by theme
 */
export function getGuidedReflectionsByTheme(themeId: ThemeTag): GuidedReflection[] {
  return GUIDED_REFLECTIONS.filter((r) => r.themeId === themeId);
}

/**
 * Get all available guided reflections
 */
export function getAllGuidedReflections(): GuidedReflection[] {
  return GUIDED_REFLECTIONS;
}

/**
 * Get featured reflections for the home screen
 * Returns a curated selection of reflections good for discovery
 */
export function getFeaturedReflections(): GuidedReflection[] {
  return [
    GUIDED_REFLECTIONS.find((r) => r.id === 'morning_purpose')!,
    GUIDED_REFLECTIONS.find((r) => r.id === 'evening_peace')!,
    GUIDED_REFLECTIONS.find((r) => r.id === 'nature_meditation')!,
  ].filter(Boolean);
}
