import type { ThemePack, ThemePackDay } from './types';
import type { ThemeTag } from '../retrieval/search';

/**
 * Curated 7-Day Theme Packs
 *
 * Each pack offers a week-long journey into a specific theme,
 * with daily prompts, teachings, and practices for deep exploration.
 */

// Helper to create days with consistent structure
function createDay(
  dayNumber: number,
  title: string,
  subtitle: string,
  theme: ThemeTag,
  openingReflection: string,
  coreTeaching: string,
  practicePrompt: string,
  closingThought: string,
  wisdomKeywords: string[]
): ThemePackDay {
  return {
    dayNumber,
    title,
    subtitle,
    theme,
    openingReflection,
    coreTeaching,
    practicePrompt,
    closingThought,
    wisdomKeywords,
  };
}

/**
 * Acceptance Pack - 7 days exploring radical acceptance
 */
const ACCEPTANCE_PACK: ThemePack = {
  id: 'acceptance_journey',
  title: 'Path of Acceptance',
  description: 'A 7-day journey into embracing what is, finding peace with the present moment, and releasing resistance.',
  icon: '🌸',
  image: 'acceptance',
  theme: 'peace' as ThemeTag,
  color: '#E8B4BC',
  dayCount: 7,
  estimatedMinutesPerDay: 10,
  days: [
    createDay(
      1,
      'Meeting the Present',
      'Acknowledging what is here now',
      'peace' as ThemeTag,
      'Take a breath and notice what is present in this moment. What sensations, thoughts, or feelings arise without you summoning them?',
      'Acceptance begins not with approval, but with acknowledgment. Before we can work with our experience, we must first see it clearly. The Bhagavad Gita teaches us to witness without judgment — to observe the flow of life as a detached seer.',
      'Today, practice simple noticing. Three times throughout the day, pause and silently name what you observe: "There is tension in my shoulders," "There is worry about tomorrow," "There is the sound of rain." No fixing, just witnessing.',
      'What we resist persists. What we acknowledge can begin to transform.',
      ['acceptance', 'peace', 'witness', 'present']
    ),
    createDay(
      2,
      'The Weight of Resistance',
      'Understanding what we push away',
      'suffering' as ThemeTag,
      'Where in your life are you fighting against what is? What situation, feeling, or truth are you resisting?',
      'Resistance is natural — it is the mind\'s attempt to protect us. Yet the sages remind us that suffering often comes not from the experience itself, but from our war with it. The Yoga Sutras speak of "dvesha" — aversion — as one of the kleshas that bind us.',
      'Choose one small thing you\'ve been resisting today. Instead of pushing against it, simply sit with it. Notice what happens when you stop fighting, even for a moment.',
      'Between stimulus and response, there is a space. In that space lies our freedom.',
      ['resistance', 'suffering', 'aversion', 'liberation']
    ),
    createDay(
      3,
      'Accepting Our Limits',
      'Finding peace with imperfection',
      'self' as ThemeTag,
      'What limitation in yourself have you struggled to accept? What would it mean to make peace with this aspect of your being?',
      'The ancient texts remind us that the self is not defined by its limitations, but by its essential nature. Our imperfections are not failures — they are the texture of our humanity. True strength comes not from being without flaw, but from accepting our whole selves with compassion.',
      'Write down one limitation you carry. Then, write a letter of acceptance to yourself about this limitation. Speak to yourself as you would to a dear friend.',
      'We are not broken. We are human.',
      ['self', 'imperfection', 'compassion', 'wholeness']
    ),
    createDay(
      4,
      'Accepting Others',
      'Releasing the need to change those around us',
      'compassion' as ThemeTag,
      'Think of someone whose behavior frustrates you. What would it look like to accept them exactly as they are?',
      'Just as we struggle with our own imperfections, we struggle with those of others. Yet the wisdom traditions teach that others walk their own path, guided by their own karma. Our work is not to fix others, but to find peace in our relationship to them.',
      'When you encounter frustration with someone today, silently say: "May you be well on your path." This is not approval — it is release.',
      'Acceptance of others is a gift we give ourselves.',
      ['compassion', 'others', 'release', 'peace']
    ),
    createDay(
      5,
      'Accepting Uncertainty',
      'Making peace with not knowing',
      'impermanence' as ThemeTag,
      'What uncertainty in your life causes you the most discomfort? What would it feel like to accept that you cannot know the outcome?',
      'The mind craves certainty, yet life offers none. The Upanishads teach that even the gods do not know all outcomes. Accepting uncertainty is not resignation — it is wisdom. It is recognizing that we can act fully in the present without controlling the future.',
      'Today, when you notice anxiety about the unknown, place your hand on your heart and say: "I do not need to know. I can be here now."',
      'In the space of not-knowing, infinite possibilities remain alive.',
      ['uncertainty', 'impermanence', 'future', 'trust']
    ),
    createDay(
      6,
      'Accepting Change',
      'Flowing with impermanence',
      'impermanence' as ThemeTag,
      'What change in your life have you been resisting? What would it mean to stop holding on and begin flowing?',
      'Everything changes — this is the first teaching of impermanence. The river never steps into the same water twice. Fighting change is fighting the nature of existence itself. Acceptance of change is not passive; it is aligning ourselves with the flow of life.',
      'Notice three things today that have changed since yesterday — in your body, your environment, or your thoughts. Acknowledge each change with a simple nod of recognition.',
      'The only constant is change. In accepting this, we find stable ground.',
      ['impermanence', 'change', 'flow', 'letting go']
    ),
    createDay(
      7,
      'Living Acceptance',
      'Integrating the practice',
      'peace' as ThemeTag,
      'As this journey completes, what has shifted in your relationship with acceptance? What truth has emerged?',
      'Acceptance is not a destination but a practice — something we return to again and again. It is not resignation or passivity, but a profound act of courage. To accept is to say yes to life, with all its beauty and difficulty.',
      'Create a simple ritual of acceptance for yourself. It might be a phrase you say each morning, a breath practice, or a gesture. Let this be your reminder to return to acceptance.',
      'This journey ends, but the practice continues. May you walk in peace.',
      ['acceptance', 'peace', 'integration', 'practice']
    ),
  ],
};

/**
 * Purpose Pack - 7 days exploring life's meaning and direction
 */
const PURPOSE_PACK: ThemePack = {
  id: 'purpose_journey',
  title: 'Finding Purpose',
  description: 'A 7-day exploration of meaning, direction, and dharma — discovering what calls to your deepest self.',
  icon: '🧭',
  image: 'purpose',
  theme: 'purpose' as ThemeTag,
  color: '#7B68EE',
  dayCount: 7,
  estimatedMinutesPerDay: 10,
  days: [
    createDay(
      1,
      'What Calls to You',
      'Listening for the inner voice',
      'purpose' as ThemeTag,
      'In quiet moments, what pulls at your heart? What keeps returning to your thoughts, asking for attention?',
      'The Bhagavad Gita speaks of "svadharma" — one\'s own path, one\'s own duty. Purpose is not imposed from outside; it arises from within, like a seed already planted in the soil of our being. Our work is to listen, to notice what calls.',
      'Find a quiet moment today and ask yourself: "What wants to be born through me?" Don\'t answer immediately. Let the question sit. Notice what arises over the coming hours.',
      'Your purpose is already seeking you. Will you listen?',
      ['purpose', 'dharma', 'calling', 'listen']
    ),
    createDay(
      2,
      'Gifts and Abilities',
      'Recognizing what you bring',
      'self' as ThemeTag,
      'What do you do naturally that others find difficult? What abilities feel so effortless you might overlook them?',
      'Our gifts are clues to our purpose. The Vedic tradition teaches that each soul is born with unique capacities — not by accident, but by design. What comes easily to us is often where we are meant to serve.',
      'Ask someone who knows you well: "What do you see as my greatest strength?" Listen without deflecting. Let yourself receive their perception.',
      'What feels ordinary to you may be extraordinary to the world.',
      ['gifts', 'abilities', 'self', 'strengths']
    ),
    createDay(
      3,
      'What Pains You',
      'Finding purpose in what hurts',
      'suffering' as ThemeTag,
      'What suffering in the world most moves you? What injustice or pain do you feel compelled to address?',
      'Purpose often emerges from our own wounds and the pain we see in others. The bodhisattva vow speaks of this — the commitment to ease suffering because we understand it deeply. Our sensitivity to certain pains may be pointing us toward our work.',
      'Reflect on a time you witnessed suffering that deeply affected you. What was it about that moment? What would you want to offer to ease such pain?',
      'Where your pain meets the world\'s need, purpose may be waiting.',
      ['suffering', 'compassion', 'service', 'healing']
    ),
    createDay(
      4,
      'Beyond Success',
      'Distinguishing purpose from achievement',
      'detachment' as ThemeTag,
      'How might your sense of purpose be tangled with desires for recognition, status, or validation?',
      'The Gita\'s teaching of "nishkama karma" — action without attachment to fruits — applies deeply to purpose. True dharma transcends personal gain. It is about offering, not acquiring. When we disentangle purpose from ego, something purer emerges.',
      'Imagine doing your meaningful work in complete anonymity — no recognition, no reward. What remains? What still calls? This is closer to pure purpose.',
      'Purpose serves life itself, not just our life.',
      ['detachment', 'ego', 'service', 'humility']
    ),
    createDay(
      5,
      'Small Steps, Deep Meaning',
      'Purpose in the ordinary',
      'action' as ThemeTag,
      'How might your sense of purpose show up not in grand gestures, but in small, daily acts?',
      'Purpose need not be dramatic. The karma yogi finds meaning in each action, however small. A kind word, a task done with care, full presence in a conversation — these too are expressions of dharma. Purpose lives in how we do things, not just what we do.',
      'Choose one ordinary task today and do it as if it were your sacred duty. Washing dishes, answering email, walking — bring complete attention and intention.',
      'There are no ordinary moments for the one who lives with purpose.',
      ['action', 'karma', 'mindfulness', 'presence']
    ),
    createDay(
      6,
      'Obstacles as Teachers',
      'When the path feels blocked',
      'discipline' as ThemeTag,
      'What obstacles stand between you and living your sense of purpose? What might these obstacles be teaching you?',
      'Obstacles on the path are not separate from the path — they are the path. The sages teach that resistance is often where growth awaits. Our blocks may be protecting us from moving too fast, or they may be inviting us to deepen our resolve.',
      'Name an obstacle to your purpose. Then ask: "What is this teaching me? What quality in me is being strengthened?" Write what arises.',
      'The obstacle is the way.',
      ['obstacles', 'discipline', 'growth', 'perseverance']
    ),
    createDay(
      7,
      'Living Your Dharma',
      'Committing to the path',
      'purpose' as ThemeTag,
      'As this week concludes, what clarity has emerged about your path? What will you commit to, however small?',
      'Purpose unfolds over a lifetime. We do not find it once and possess it forever; we live into it, step by step. The question is not "What is my purpose?" but "What is my next step in service of what matters?"',
      'Write a simple commitment to yourself — one way you will honor your sense of purpose this coming week. Make it specific, achievable, and meaningful.',
      'Your purpose is not a destination. It is the way you walk.',
      ['purpose', 'dharma', 'commitment', 'path']
    ),
  ],
};

/**
 * Stillness Pack - 7 days cultivating inner quiet and peace
 */
const STILLNESS_PACK: ThemePack = {
  id: 'stillness_journey',
  title: 'Journey into Stillness',
  description: 'A 7-day practice of cultivating inner quiet, finding the still point within, and resting in presence.',
  icon: '🪷',
  image: 'stillness',
  theme: 'meditation' as ThemeTag,
  color: '#5F9EA0',
  dayCount: 7,
  estimatedMinutesPerDay: 10,
  days: [
    createDay(
      1,
      'The Busy Mind',
      'Noticing our inner noise',
      'meditation' as ThemeTag,
      'How would you describe the quality of your mind right now? Is it still, turbulent, scattered, focused?',
      'The mind is like the surface of a lake — sometimes calm, sometimes stormy. The Yoga Sutras define yoga as "chitta vritti nirodha" — the stilling of the fluctuations of the mind. Before we can cultivate stillness, we must first notice our current state.',
      'Set a timer for two minutes. Sit quietly and simply count how many distinct thoughts arise. No judgment — just notice the traffic of the mind.',
      'We cannot still what we do not first see clearly.',
      ['mind', 'meditation', 'awareness', 'thoughts']
    ),
    createDay(
      2,
      'The Body\'s Stillness',
      'Quieting the physical',
      'meditation' as ThemeTag,
      'Where does your body hold tension? What would it feel like to truly let your body be still?',
      'Stillness begins in the body. The restless body agitates the mind; the settled body creates conditions for inner quiet. This is why asana — physical posture — precedes pranayama and meditation in the yogic path.',
      'Find a comfortable position and remain completely still for five minutes. When the urge to move arises, simply notice it without acting. What do you discover?',
      'The body is the first doorway to stillness.',
      ['body', 'stillness', 'meditation', 'posture']
    ),
    createDay(
      3,
      'The Breath as Anchor',
      'Using breath to settle',
      'meditation' as ThemeTag,
      'What is your breath doing right now? Is it shallow, deep, smooth, irregular?',
      'The breath is the bridge between body and mind, the one function that is both automatic and voluntary. By gently guiding the breath, we guide the mind toward stillness. This is the essence of pranayama — breath as pathway.',
      'Practice this simple technique: Breathe in for four counts, hold for four counts, breathe out for four counts, hold for four counts. Continue for three minutes. Notice how your state shifts.',
      'The breath is always here, always available as an anchor to presence.',
      ['breath', 'pranayama', 'meditation', 'anchor']
    ),
    createDay(
      4,
      'The Space Between Thoughts',
      'Discovering natural stillness',
      'meditation' as ThemeTag,
      'Have you ever noticed the gap between one thought and the next? What exists in that space?',
      'Stillness is not something we create; it is what remains when the noise settles. The Upanishads point to this — the silent awareness that witnesses all thoughts yet is not a thought itself. We do not manufacture stillness; we uncover it.',
      'Sit quietly and wait for a thought to complete. Then, before the next thought arises, notice the gap — however brief. That gap is always available. Rest there when you find it.',
      'Stillness is not the absence of thoughts, but the presence of awareness.',
      ['stillness', 'awareness', 'witness', 'space']
    ),
    createDay(
      5,
      'Stillness in Action',
      'Carrying quiet into daily life',
      'action' as ThemeTag,
      'How might stillness be present even in the midst of activity? What would it feel like to move from a place of inner quiet?',
      'True stillness is not dependent on external conditions. The sage moves through the marketplace with the same inner quiet as in the meditation hall. This is the teaching of karma yoga — action rooted in stillness.',
      'Choose one regular activity today — eating, walking, or working — and practice doing it from a place of inner stillness. Let the action flow from quiet rather than agitation.',
      'Stillness is not what we retreat to, but what we bring.',
      ['action', 'stillness', 'movement', 'presence']
    ),
    createDay(
      6,
      'The Noise We Invite',
      'Choosing what enters',
      'discipline' as ThemeTag,
      'What noise do you voluntarily bring into your life — through media, conversation, or habit? What would reduce?',
      'Much of our mental agitation is self-generated. We fill silence with noise, stillness with stimulation. Pratyahara — sense withdrawal — is not about rejecting the world but about conscious choice regarding what we allow in.',
      'Today, intentionally create pockets of sensory quiet. Turn off background noise. Put away the phone for set periods. Notice how this affects your inner state.',
      'We guard what we value. Do you value your inner peace?',
      ['discipline', 'senses', 'quiet', 'choice']
    ),
    createDay(
      7,
      'Resting in Stillness',
      'Making stillness home',
      'peace' as ThemeTag,
      'As this journey ends, what has your relationship with stillness become? What will you carry forward?',
      'Stillness is our natural state — the background of awareness that is always present. Through these seven days, you have not created something new but remembered something ancient. This stillness is always available, one breath away.',
      'Create a daily touchpoint for stillness — perhaps the first breath upon waking, a pause before eating, or a moment before sleep. Let this be your ongoing practice of returning.',
      'The journey into stillness never ends. It only deepens.',
      ['stillness', 'peace', 'presence', 'practice']
    ),
  ],
};

/**
 * Quick Paths - Short 3-day beginner journeys
 * Perfect for those new to reflection or wanting a quick introduction to a theme.
 */

/**
 * Mindfulness Basics - 3-day intro to mindfulness
 */
const MINDFULNESS_BASICS_PATH: ThemePack = {
  id: 'mindfulness_basics',
  title: 'Mindfulness Basics',
  description: 'A gentle 3-day introduction to present-moment awareness.',
  icon: '🧘',
  image: 'stillness',
  theme: 'meditation' as ThemeTag,
  color: '#4CAF50',
  dayCount: 3,
  estimatedMinutesPerDay: 5,
  isQuickPath: true,
  days: [
    createDay(
      1,
      'Being Present',
      'Arriving in this moment',
      'meditation' as ThemeTag,
      'Right now, where is your attention? Is it here, or wandering elsewhere?',
      'Mindfulness simply means being present to what is happening right now. The mind naturally wanders — this is not a problem. The practice is in the gentle return.',
      'Set a timer for just 2 minutes. Focus on your breath. When your mind wanders, gently return. That\'s it — that\'s the whole practice.',
      'You don\'t have to be perfect at this. You just have to begin.',
      ['presence', 'breath', 'beginning', 'awareness']
    ),
    createDay(
      2,
      'Noticing Thoughts',
      'Watching the mind without judgment',
      'meditation' as ThemeTag,
      'What kind of thoughts tend to dominate your mind? Planning? Worrying? Remembering?',
      'Thoughts are not the enemy. In mindfulness, we learn to observe thoughts like clouds passing through the sky. We notice them, but we don\'t have to chase them.',
      'Today, simply notice when you\'re lost in thought. Each time you notice, silently say "thinking" and return to the present moment.',
      'The magic is in the noticing, not in having no thoughts.',
      ['thoughts', 'awareness', 'observation', 'clarity']
    ),
    createDay(
      3,
      'Mindful Living',
      'Bringing awareness into daily life',
      'meditation' as ThemeTag,
      'How might your day be different if you brought more presence to ordinary moments?',
      'Mindfulness is not just for meditation — it\'s a way of being. Washing dishes mindfully. Walking mindfully. Listening mindfully. Every moment is an opportunity.',
      'Choose one daily activity and do it with full attention today. Notice colors, textures, sounds, sensations. Be fully there.',
      'The present moment is the only moment. This is where life happens.',
      ['daily', 'presence', 'practice', 'awareness']
    ),
  ],
};

/**
 * Stress Relief - 3-day path to calm
 */
const STRESS_RELIEF_PATH: ThemePack = {
  id: 'stress_relief',
  title: 'Stress Relief',
  description: 'A 3-day journey to find calm in the midst of daily pressures.',
  icon: '🌊',
  image: 'calm',
  theme: 'peace' as ThemeTag,
  color: '#2196F3',
  dayCount: 3,
  estimatedMinutesPerDay: 5,
  isQuickPath: true,
  days: [
    createDay(
      1,
      'Recognizing Stress',
      'Awareness is the first step',
      'peace' as ThemeTag,
      'Where do you feel stress in your body right now? Shoulders? Jaw? Stomach?',
      'Stress often lives in the body before we recognize it in the mind. By tuning into physical sensations, we catch stress earlier and can address it sooner.',
      'Scan your body from head to toe. Notice any areas of tension. Take three deep breaths and imagine breathing into those areas.',
      'What we can feel, we can begin to release.',
      ['stress', 'body', 'awareness', 'tension']
    ),
    createDay(
      2,
      'The Breath of Calm',
      'Your built-in stress reliever',
      'peace' as ThemeTag,
      'How does your breathing change when you\'re stressed? Does it become shallow, fast, or held?',
      'The breath is your direct line to the nervous system. Slow, deep breathing activates your body\'s natural calming response. This is ancient wisdom confirmed by modern science.',
      'Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times. Notice the shift.',
      'Calm is always one breath away.',
      ['breath', 'calm', 'nervous system', 'peace']
    ),
    createDay(
      3,
      'Creating Calm Spaces',
      'Building peace into your day',
      'peace' as ThemeTag,
      'What small moments of peace could you create in your daily routine?',
      'We cannot eliminate all stress from life, but we can create regular moments of calm. Small pauses throughout the day act like pressure release valves.',
      'Identify three transition moments in your day (waking, lunch, evening). At each, take three conscious breaths before moving on.',
      'Peace is not something we find. It\'s something we create.',
      ['peace', 'routine', 'practice', 'daily']
    ),
  ],
};

/**
 * Gratitude Practice - 3-day path to appreciation
 */
const GRATITUDE_PATH: ThemePack = {
  id: 'gratitude_practice',
  title: 'Gratitude Practice',
  description: 'A 3-day practice to cultivate appreciation and positivity.',
  icon: '🙏',
  image: 'acceptance',
  theme: 'devotion' as ThemeTag,
  color: '#FF9800',
  dayCount: 3,
  estimatedMinutesPerDay: 5,
  isQuickPath: true,
  days: [
    createDay(
      1,
      'Simple Thanks',
      'Noticing what we often overlook',
      'devotion' as ThemeTag,
      'What simple things in your life do you usually take for granted?',
      'Gratitude begins by noticing what is already present. We often overlook the most fundamental gifts — breath, sight, shelter, connection. The practice is in the seeing.',
      'List 5 things you\'re grateful for that you usually don\'t think about: clean water, a working body, a roof overhead...',
      'Gratitude turns what we have into enough.',
      ['gratitude', 'appreciation', 'simple', 'presence']
    ),
    createDay(
      2,
      'Grateful for People',
      'Appreciating those in your life',
      'devotion' as ThemeTag,
      'Who has positively impacted your life? Have you told them?',
      'Our lives are shaped by others. Expressing gratitude for people deepens our connections and reminds us we don\'t walk alone.',
      'Think of one person who has helped you. Send them a message of appreciation today, even if it\'s brief.',
      'Unexpressed gratitude is like a wrapped gift never given.',
      ['gratitude', 'people', 'connection', 'appreciation']
    ),
    createDay(
      3,
      'Gratitude as Practice',
      'Making thankfulness a habit',
      'devotion' as ThemeTag,
      'How would your outlook shift if gratitude became a daily habit?',
      'Gratitude is like a muscle — it strengthens with use. Regular practice rewires our brain to notice the positive, building resilience and contentment.',
      'Start a simple evening practice: Before sleep, name three things from the day you\'re grateful for. Make this your new ritual.',
      'What you appreciate, appreciates.',
      ['gratitude', 'habit', 'practice', 'joy']
    ),
  ],
};

/**
 * Inner Peace - 3-day path to tranquility
 */
const INNER_PEACE_PATH: ThemePack = {
  id: 'inner_peace',
  title: 'Inner Peace',
  description: 'A 3-day exploration of finding tranquility within.',
  icon: '☮️',
  image: 'stillness',
  theme: 'peace' as ThemeTag,
  color: '#9C27B0',
  dayCount: 3,
  estimatedMinutesPerDay: 5,
  isQuickPath: true,
  days: [
    createDay(
      1,
      'What Disturbs Peace',
      'Understanding our inner turbulence',
      'peace' as ThemeTag,
      'What most often disturbs your sense of inner peace?',
      'We cannot cultivate peace without understanding what disrupts it. Our triggers reveal where our work lies.',
      'Notice what disturbs your peace today. Don\'t try to fix it — just observe with curiosity.',
      'Awareness of what disturbs us is the beginning of peace.',
      ['peace', 'awareness', 'triggers', 'observation']
    ),
    createDay(
      2,
      'The Peace Within',
      'Finding stillness beneath the waves',
      'peace' as ThemeTag,
      'Beneath all your thoughts and emotions, is there a quiet space that remains untouched?',
      'Like the depths of the ocean remain calm while storms rage on the surface, there is a place within us that is always at peace. The practice is learning to access it.',
      'Sit quietly and imagine diving below the surface waves of your thoughts. What do you find in the depths?',
      'Peace is not something we create. It is something we uncover.',
      ['peace', 'stillness', 'depth', 'presence']
    ),
    createDay(
      3,
      'Protecting Your Peace',
      'Boundaries for tranquility',
      'peace' as ThemeTag,
      'What boundaries might you need to set to protect your inner peace?',
      'Inner peace requires guardianship. This means choosing what we allow into our minds and how we spend our energy. Peace is a practice of wise choices.',
      'Identify one thing that consistently drains your peace. What boundary could you set? Take one small step to protect your tranquility.',
      'You are the guardian of your own peace. Guard it well.',
      ['peace', 'boundaries', 'protection', 'choice']
    ),
  ],
};

/**
 * All Quick Paths (short, beginner-friendly paths)
 */
export const QUICK_PATHS: ThemePack[] = [
  MINDFULNESS_BASICS_PATH,
  STRESS_RELIEF_PATH,
  GRATITUDE_PATH,
  INNER_PEACE_PATH,
];

/**
 * All 7-Day Journeys (longer, deeper explorations)
 */
export const JOURNEYS: ThemePack[] = [
  ACCEPTANCE_PACK,
  PURPOSE_PACK,
  STILLNESS_PACK,
];

/**
 * All available theme packs (both paths and journeys)
 */
export const THEME_PACKS: ThemePack[] = [
  ...QUICK_PATHS,
  ...JOURNEYS,
];

/**
 * Get a theme pack by ID
 */
export function getThemePackById(id: string): ThemePack | undefined {
  return THEME_PACKS.find((pack) => pack.id === id);
}

/**
 * Get all available theme packs
 */
export function getAllThemePacks(): ThemePack[] {
  return THEME_PACKS;
}

/**
 * Get only quick paths (short, beginner paths)
 */
export function getQuickPaths(): ThemePack[] {
  return QUICK_PATHS;
}

/**
 * Get only journeys (longer, multi-day programs)
 */
export function getJourneys(): ThemePack[] {
  return JOURNEYS;
}

/**
 * Get a specific day from a pack
 */
export function getThemePackDay(
  packId: string,
  dayNumber: number
): ThemePackDay | undefined {
  const pack = getThemePackById(packId);
  if (!pack) return undefined;
  return pack.days.find((day) => day.dayNumber === dayNumber);
}
