
🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "in_progress",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "pending",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement reflection question bank with 3-5 variations",
      "status": "pending",
      "activeForm": "Implementing question bank feature"
    },
    {
      "content": "Add expandable UI for additional prompts",
      "status": "pending",
      "activeForm": "Adding expandable UI"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}

🔧 Tool: Task
Input: {
  "description": "Explore reflection codebase",
  "prompt": "Explore the codebase to understand the existing reflection structure. Look for:\n1. Any existing reflection-related files (lib/reflection/, app/reflections.tsx, app/guided-reflection.tsx)\n2. How reflections are currently structured and stored\n3. Existing UI patterns for displaying content\n4. Any question/prompt related code\n\nFocus on understanding:\n- The data models used for reflections\n- How prompts/questions are currently handled\n- UI components related to reflections\n- Storage mechanisms\n\nProvide a comprehensive summary of the reflection system architecture.",
  "subagent_type": "Explore"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/reflection*"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/reflections*"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type f -name \"*.tsx\" -o -name \"*.ts\" | grep -E \"(reflection|reflect)\" | head -20",
  "description": "Find reflection-related TypeScript files"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/types.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/reflections.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/lib/ | head -20",
  "description": "List directories in lib folder"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/service.ts",
  "limit": 150
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI/lib -type f -name \"*.ts\" | head -20",
  "description": "List all TypeScript files in lib"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts",
  "limit": 100
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/components/ 2>/dev/null | head -20",
  "description": "Check components directory structure"
}
Excellent! I now have a comprehensive understanding of the reflection system. Let me update my todo and plan the implementation.

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "in_progress",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement reflection question bank with 3-5 variations",
      "status": "pending",
      "activeForm": "Implementing question bank feature"
    },
    {
      "content": "Add expandable UI for additional prompts",
      "status": "pending",
      "activeForm": "Adding expandable UI"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/types.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx"
}
Now I have a clear understanding of the codebase. Let me update my todo and start planning the implementation.

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "in_progress",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "pending",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "pending",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "pending",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me implement the feature step by step. First, I'll update the types to include question variations:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/types.ts",
  "old_string": "export interface ReflectionPrompt {\n  id: string;\n  order: number;\n  depth: ReflectionDepth;\n  promptText: string;\n  guidance: string; // Help text shown before user responds\n}",
  "new_string": "export interface ReflectionPrompt {\n  id: string;\n  order: number;\n  depth: ReflectionDepth;\n  promptText: string;\n  guidance: string; // Help text shown before user responds\n  questionVariations?: string[]; // 3-5 alternative questions for deeper inquiry\n}"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "completed",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "in_progress",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "pending",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "pending",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me add question variations to all the existing prompts in templates.ts:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "export const GUIDED_REFLECTIONS: GuidedReflection[] = [\n  // Morning Check-in - Purpose theme\n  {\n    id: 'morning_purpose',\n    themeId: 'purpose' as ThemeTag,\n    title: 'Morning Check-in',\n    description: 'Set your intentions for the day ahead',\n    icon: '☀️',\n    estimatedMinutes: 5,\n    prompts: createPrompts('morning_purpose', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'As you begin this new day, what is the first feeling or thought that arises?',\n        guidance: 'Take a moment to notice what is present in your mind and body right now.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What matters most to you today? What would make this day meaningful?',\n        guidance: 'Consider not just tasks, but the quality of presence you wish to bring.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What challenge might you face today, and what inner strength could help you meet it?',\n        guidance: 'Reflect on a quality or wisdom that could guide you through difficulty.',\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'What one small intention will you carry with you through this day?',\n        guidance: 'Choose something simple and specific that you can return to.',\n      },\n    ]),\n  },",
  "new_string": "export const GUIDED_REFLECTIONS: GuidedReflection[] = [\n  // Morning Check-in - Purpose theme\n  {\n    id: 'morning_purpose',\n    themeId: 'purpose' as ThemeTag,\n    title: 'Morning Check-in',\n    description: 'Set your intentions for the day ahead',\n    icon: '☀️',\n    estimatedMinutes: 5,\n    prompts: createPrompts('morning_purpose', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'As you begin this new day, what is the first feeling or thought that arises?',\n        guidance: 'Take a moment to notice what is present in your mind and body right now.',\n        questionVariations: [\n          'What emotion is most present in you right now?',\n          'How does your body feel as you start this day?',\n          'What is the quality of your mind in this moment?',\n          'What were you thinking about just before this reflection?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What matters most to you today? What would make this day meaningful?',\n        guidance: 'Consider not just tasks, but the quality of presence you wish to bring.',\n        questionVariations: [\n          'If this day were your last, what would you want to experience?',\n          'What one thing, if accomplished, would bring you peace tonight?',\n          'Who could you connect with meaningfully today?',\n          'What quality of being do you want to cultivate today?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What challenge might you face today, and what inner strength could help you meet it?',\n        guidance: 'Reflect on a quality or wisdom that could guide you through difficulty.',\n        questionVariations: [\n          'What fear might arise today, and how could you meet it with compassion?',\n          'What past wisdom could serve you in today\\'s challenges?',\n          'Where might you need patience or resilience today?',\n          'What would your wisest self advise about today\\'s difficulties?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'What one small intention will you carry with you through this day?',\n        guidance: 'Choose something simple and specific that you can return to.',\n        questionVariations: [\n          'What single word could be your guide today?',\n          'What reminder could you give yourself when things get busy?',\n          'How will you know if you\\'ve lived this day well?',\n          'What promise do you make to yourself for today?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add question variations to the Evening Wind-down reflection:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Evening Wind-down - Peace theme\n  {\n    id: 'evening_peace',\n    themeId: 'peace' as ThemeTag,\n    title: 'Evening Wind-down',\n    description: 'Release the day and find peace',\n    icon: '🌙',\n    estimatedMinutes: 10,\n    prompts: createPrompts('evening_peace', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'As this day comes to a close, what are you still carrying?',\n        guidance: 'Notice any tension, thoughts, or emotions that linger from the day.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What moment from today brought you a sense of peace or connection?',\n        guidance: 'It may be small - a conversation, a pause, a glimpse of beauty.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What would it mean to fully release the day - the successes and the struggles alike?',\n        guidance: 'Consider what letting go would feel like in your body and mind.',\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What did today teach you that you want to remember?',\n        guidance: 'Allow any insight or lesson to settle into your awareness.',\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What blessing or gratitude do you offer to yourself as you prepare for rest?',\n        guidance: 'Speak kindly to yourself as you would to a dear friend.',\n      },\n    ]),\n  },",
  "new_string": "  // Evening Wind-down - Peace theme\n  {\n    id: 'evening_peace',\n    themeId: 'peace' as ThemeTag,\n    title: 'Evening Wind-down',\n    description: 'Release the day and find peace',\n    icon: '🌙',\n    estimatedMinutes: 10,\n    prompts: createPrompts('evening_peace', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'As this day comes to a close, what are you still carrying?',\n        guidance: 'Notice any tension, thoughts, or emotions that linger from the day.',\n        questionVariations: [\n          'Where in your body do you feel the weight of today?',\n          'What thought keeps returning as the day ends?',\n          'What emotion from today hasn\\'t fully settled?',\n          'If you could name what\\'s lingering, what would you call it?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What moment from today brought you a sense of peace or connection?',\n        guidance: 'It may be small - a conversation, a pause, a glimpse of beauty.',\n        questionVariations: [\n          'When did you feel most like yourself today?',\n          'What small kindness did you witness or offer today?',\n          'What made you pause and smile, even briefly?',\n          'Where did you find unexpected beauty today?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What would it mean to fully release the day - the successes and the struggles alike?',\n        guidance: 'Consider what letting go would feel like in your body and mind.',\n        questionVariations: [\n          'What would it feel like to set down all of today\\'s concerns?',\n          'If you could leave one thing from today behind, what would it be?',\n          'How would your body change if you fully let go right now?',\n          'What permission do you need to give yourself to rest?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What did today teach you that you want to remember?',\n        guidance: 'Allow any insight or lesson to settle into your awareness.',\n        questionVariations: [\n          'What wisdom emerged from today\\'s experiences?',\n          'How did today help you grow, even slightly?',\n          'What truth became clearer through today\\'s events?',\n          'What would you tell your morning self about this day?',\n        ],\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What blessing or gratitude do you offer to yourself as you prepare for rest?',\n        guidance: 'Speak kindly to yourself as you would to a dear friend.',\n        questionVariations: [\n          'How can you honor yourself for making it through today?',\n          'What gentle words does your heart need to hear right now?',\n          'What are you grateful for about yourself today?',\n          'What wish do you hold for yourself as you sleep?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to Nature Walk:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Nature Walk - Meditation theme\n  {\n    id: 'nature_meditation',\n    themeId: 'meditation' as ThemeTag,\n    title: 'Nature Walk',\n    description: 'Connect with the world around you',\n    icon: '🌲',\n    estimatedMinutes: 15,\n    prompts: createPrompts('nature_meditation', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'Pause and take three deep breaths. What do you notice in your immediate surroundings?',\n        guidance: 'Use your senses - what do you see, hear, smell, feel?',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Choose one element of nature around you. What does observing it reveal?',\n        guidance: 'A tree, a stone, the sky, a leaf - let it speak to you.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'How does being in nature change your perspective on whatever you were thinking about before?',\n        guidance: 'Notice how the natural world offers a different scale and rhythm.',\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What quality from nature would you like to embody in your daily life?',\n        guidance: 'Perhaps the patience of a river, the resilience of a weed, the stillness of a mountain.',\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'Before you leave this moment, what will you take with you? What will you leave behind?',\n        guidance: 'Make a conscious choice about what you carry forward.',\n      },\n    ]),\n  },",
  "new_string": "  // Nature Walk - Meditation theme\n  {\n    id: 'nature_meditation',\n    themeId: 'meditation' as ThemeTag,\n    title: 'Nature Walk',\n    description: 'Connect with the world around you',\n    icon: '🌲',\n    estimatedMinutes: 15,\n    prompts: createPrompts('nature_meditation', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'Pause and take three deep breaths. What do you notice in your immediate surroundings?',\n        guidance: 'Use your senses - what do you see, hear, smell, feel?',\n        questionVariations: [\n          'What sounds are present in this moment?',\n          'What colors catch your attention right now?',\n          'What does the air feel like on your skin?',\n          'What natural element is closest to you?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Choose one element of nature around you. What does observing it reveal?',\n        guidance: 'A tree, a stone, the sky, a leaf - let it speak to you.',\n        questionVariations: [\n          'If this natural element could share its wisdom, what would it say?',\n          'How long has this element been here, and what has it witnessed?',\n          'What does this element teach about time and change?',\n          'How does this part of nature survive and thrive?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'How does being in nature change your perspective on whatever you were thinking about before?',\n        guidance: 'Notice how the natural world offers a different scale and rhythm.',\n        questionVariations: [\n          'What worries feel smaller when held against the vastness of nature?',\n          'How does nature\\'s rhythm differ from the pace of your thoughts?',\n          'What does the natural world not care about that you spend energy on?',\n          'How might nature view your current challenges?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What quality from nature would you like to embody in your daily life?',\n        guidance: 'Perhaps the patience of a river, the resilience of a weed, the stillness of a mountain.',\n        questionVariations: [\n          'What does nature model that you want to learn?',\n          'Which natural cycle speaks to where you are in life?',\n          'What balance does nature maintain that you seek?',\n          'How could you bring this natural quality into tomorrow?',\n        ],\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'Before you leave this moment, what will you take with you? What will you leave behind?',\n        guidance: 'Make a conscious choice about what you carry forward.',\n        questionVariations: [\n          'What gift has nature offered you in this time?',\n          'What can you release into this natural space?',\n          'How will you honor this connection when you return to daily life?',\n          'What silent promise do you make to yourself here?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to Facing Difficulty:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Dealing with Suffering - Suffering theme\n  {\n    id: 'facing_suffering',\n    themeId: 'suffering' as ThemeTag,\n    title: 'Facing Difficulty',\n    description: 'Find wisdom in challenging times',\n    icon: '🌊',\n    estimatedMinutes: 10,\n    prompts: createPrompts('facing_suffering', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What difficulty or pain are you facing right now?',\n        guidance: 'Name it simply, without judgment. Just acknowledge what is.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Where do you feel this difficulty in your body? What is its quality?',\n        guidance: 'Bring gentle attention to the physical sensations that accompany this challenge.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'If this difficulty could speak, what might it be trying to teach you?',\n        guidance: 'Even pain can carry wisdom. Listen without resistance.',\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What would compassion toward yourself look like in this situation?',\n        guidance: 'Imagine how you would comfort a dear friend facing the same struggle.',\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What is one tiny act of care you can offer yourself right now?',\n        guidance: 'Choose something simple and doable - a breath, a word, a gesture.',\n      },\n    ]),\n  },",
  "new_string": "  // Dealing with Suffering - Suffering theme\n  {\n    id: 'facing_suffering',\n    themeId: 'suffering' as ThemeTag,\n    title: 'Facing Difficulty',\n    description: 'Find wisdom in challenging times',\n    icon: '🌊',\n    estimatedMinutes: 10,\n    prompts: createPrompts('facing_suffering', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What difficulty or pain are you facing right now?',\n        guidance: 'Name it simply, without judgment. Just acknowledge what is.',\n        questionVariations: [\n          'What challenge weighs most heavily on your heart?',\n          'What struggle have you been avoiding naming?',\n          'If you could speak your difficulty aloud, what would you say?',\n          'What is the shape of the pain you carry today?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Where do you feel this difficulty in your body? What is its quality?',\n        guidance: 'Bring gentle attention to the physical sensations that accompany this challenge.',\n        questionVariations: [\n          'What physical sensations arise when you think of this challenge?',\n          'Is this pain sharp or dull, constant or fleeting?',\n          'How does your body hold this difficulty?',\n          'What changes in your breathing when you face this?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'If this difficulty could speak, what might it be trying to teach you?',\n        guidance: 'Even pain can carry wisdom. Listen without resistance.',\n        questionVariations: [\n          'What message lives beneath this struggle?',\n          'How has this difficulty shown you something about yourself?',\n          'What growth might be hidden within this challenge?',\n          'What would you miss if this difficulty disappeared instantly?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What would compassion toward yourself look like in this situation?',\n        guidance: 'Imagine how you would comfort a dear friend facing the same struggle.',\n        questionVariations: [\n          'How would you speak to a beloved friend facing this same pain?',\n          'What kindness are you withholding from yourself?',\n          'What do you need to hear right now that no one has said?',\n          'How can you be your own ally in this struggle?',\n        ],\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What is one tiny act of care you can offer yourself right now?',\n        guidance: 'Choose something simple and doable - a breath, a word, a gesture.',\n        questionVariations: [\n          'What small comfort could you give yourself in this moment?',\n          'What gentle action would soothe you right now?',\n          'How can you tend to yourself with the same care you\\'d give others?',\n          'What is the smallest step toward peace you could take today?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to Mindful Action:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Taking Action - Action theme\n  {\n    id: 'mindful_action',\n    themeId: 'action' as ThemeTag,\n    title: 'Mindful Action',\n    description: 'Move from hesitation to purposeful doing',\n    icon: '⚡',\n    estimatedMinutes: 8,\n    prompts: createPrompts('mindful_action', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What action have you been avoiding or postponing?',\n        guidance: 'Be honest. Name the thing that keeps coming to mind.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What stories or fears surround this action? What do you tell yourself about it?',\n        guidance: 'Notice the narrative your mind creates around this task.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'Separate the action from its outcome. What is the simplest first step?',\n        guidance: 'Focus on the doing, not the result. What is the very first movement?',\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'Commit to that one small step. When will you take it?',\n        guidance: 'Make it specific and immediate. The journey begins with this moment.',\n      },\n    ]),\n  },",
  "new_string": "  // Taking Action - Action theme\n  {\n    id: 'mindful_action',\n    themeId: 'action' as ThemeTag,\n    title: 'Mindful Action',\n    description: 'Move from hesitation to purposeful doing',\n    icon: '⚡',\n    estimatedMinutes: 8,\n    prompts: createPrompts('mindful_action', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What action have you been avoiding or postponing?',\n        guidance: 'Be honest. Name the thing that keeps coming to mind.',\n        questionVariations: [\n          'What task keeps appearing in your mind but remains undone?',\n          'What are you resisting that you know needs your attention?',\n          'What would you do today if procrastination weren\\'t an option?',\n          'What keeps calling to you that you haven\\'t answered?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'What stories or fears surround this action? What do you tell yourself about it?',\n        guidance: 'Notice the narrative your mind creates around this task.',\n        questionVariations: [\n          'What worst-case scenario plays in your mind about this action?',\n          'What beliefs about yourself make this action feel difficult?',\n          'What excuses have become comfortable?',\n          'What would change if these fears weren\\'t true?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'Separate the action from its outcome. What is the simplest first step?',\n        guidance: 'Focus on the doing, not the result. What is the very first movement?',\n        questionVariations: [\n          'If you only had to do 5 minutes of this, what would you do?',\n          'What single motion would begin this journey?',\n          'What\\'s the smallest possible version of this action?',\n          'If results didn\\'t matter, how would you approach this?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'Commit to that one small step. When will you take it?',\n        guidance: 'Make it specific and immediate. The journey begins with this moment.',\n        questionVariations: [\n          'What specific time today will you begin?',\n          'What will be different after you take this step?',\n          'Who could witness or support this commitment?',\n          'How will you celebrate taking this first step?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to Knowing Yourself:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Self-Discovery - Self theme\n  {\n    id: 'knowing_self',\n    themeId: 'self' as ThemeTag,\n    title: 'Knowing Yourself',\n    description: 'Explore who you truly are',\n    icon: '🔮',\n    estimatedMinutes: 12,\n    prompts: createPrompts('knowing_self', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'When you think of \"who I am,\" what first comes to mind?',\n        guidance: 'Notice your initial identity markers - roles, traits, stories.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Beyond your roles and responsibilities, who are you in your quietest moments?',\n        guidance: 'Set aside what you do. What remains?',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What aspects of yourself have you been hiding or suppressing? Why?',\n        guidance: 'This is a safe space. What parts of you long to be seen?',\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'If you fully accepted all parts of yourself, how might your life change?',\n        guidance: 'Imagine radical self-acceptance. What becomes possible?',\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What one truth about yourself are you ready to embrace?',\n        guidance: 'Choose something real. Let it settle into your being.',\n      },\n    ]),\n  },",
  "new_string": "  // Self-Discovery - Self theme\n  {\n    id: 'knowing_self',\n    themeId: 'self' as ThemeTag,\n    title: 'Knowing Yourself',\n    description: 'Explore who you truly are',\n    icon: '🔮',\n    estimatedMinutes: 12,\n    prompts: createPrompts('knowing_self', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'When you think of \"who I am,\" what first comes to mind?',\n        guidance: 'Notice your initial identity markers - roles, traits, stories.',\n        questionVariations: [\n          'How would you introduce yourself to your own soul?',\n          'What labels do you most often use to describe yourself?',\n          'What story do you tell others about who you are?',\n          'What identity feels most true and which feels most performed?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Beyond your roles and responsibilities, who are you in your quietest moments?',\n        guidance: 'Set aside what you do. What remains?',\n        questionVariations: [\n          'Who are you when no one is watching?',\n          'What do you love that has nothing to do with achievement?',\n          'What arises in stillness that gets drowned out by busyness?',\n          'If all your responsibilities vanished, who would remain?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What aspects of yourself have you been hiding or suppressing? Why?',\n        guidance: 'This is a safe space. What parts of you long to be seen?',\n        questionVariations: [\n          'What part of you feels unsafe to show the world?',\n          'What have you tucked away to fit in or be accepted?',\n          'What secret self do you wish someone could meet?',\n          'What fear keeps certain parts of you hidden?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'If you fully accepted all parts of yourself, how might your life change?',\n        guidance: 'Imagine radical self-acceptance. What becomes possible?',\n        questionVariations: [\n          'What would you dare to do if you stopped judging yourself?',\n          'How would your relationships transform with complete self-acceptance?',\n          'What burden would lift if you embraced your whole self?',\n          'What dreams might you pursue without self-doubt?',\n        ],\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'What one truth about yourself are you ready to embrace?',\n        guidance: 'Choose something real. Let it settle into your being.',\n        questionVariations: [\n          'What have you known about yourself but haven\\'t fully claimed?',\n          'What truth can you speak about yourself today?',\n          'What do you want to finally acknowledge about who you are?',\n          'What aspect of yourself deserves your acceptance right now?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to Letting Go:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Letting Go - Detachment theme\n  {\n    id: 'letting_go',\n    themeId: 'detachment' as ThemeTag,\n    title: 'Letting Go',\n    description: 'Release what no longer serves you',\n    icon: '🍂',\n    estimatedMinutes: 10,\n    prompts: createPrompts('letting_go', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What are you holding onto that feels heavy or burdensome?',\n        guidance: 'It might be a grudge, a fear, an expectation, or an old story.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'How has holding onto this served you? What has it protected?',\n        guidance: 'Even our attachments have reasons. Honor them.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What would become possible if you released this? What space would open?',\n        guidance: 'Imagine the lightness. Feel it in your body.',\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What makes letting go feel difficult? What is the fear beneath the grip?',\n        guidance: 'Be tender with yourself. Letting go is an act of courage.',\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'Take a breath and symbolically release. What words mark this letting go?',\n        guidance: 'You might say \"I release...\" or simply exhale with intention.',\n      },\n    ]),\n  },",
  "new_string": "  // Letting Go - Detachment theme\n  {\n    id: 'letting_go',\n    themeId: 'detachment' as ThemeTag,\n    title: 'Letting Go',\n    description: 'Release what no longer serves you',\n    icon: '🍂',\n    estimatedMinutes: 10,\n    prompts: createPrompts('letting_go', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What are you holding onto that feels heavy or burdensome?',\n        guidance: 'It might be a grudge, a fear, an expectation, or an old story.',\n        questionVariations: [\n          'What weight have you been carrying that\\'s exhausting you?',\n          'What old pain still has a grip on your heart?',\n          'What are you holding that you wish you could set down?',\n          'What attachment is costing you your peace?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'How has holding onto this served you? What has it protected?',\n        guidance: 'Even our attachments have reasons. Honor them.',\n        questionVariations: [\n          'What comfort has this attachment provided?',\n          'What would you have had to face if you\\'d let go sooner?',\n          'How did holding on feel like survival at some point?',\n          'What identity has been tied to this attachment?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What would become possible if you released this? What space would open?',\n        guidance: 'Imagine the lightness. Feel it in your body.',\n        questionVariations: [\n          'What could fill the space this attachment currently occupies?',\n          'How would your energy shift if this weight lifted?',\n          'What new beginnings await on the other side of release?',\n          'What might you discover about yourself without this burden?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'integrating',\n        promptText: 'What makes letting go feel difficult? What is the fear beneath the grip?',\n        guidance: 'Be tender with yourself. Letting go is an act of courage.',\n        questionVariations: [\n          'What are you afraid might happen if you let go?',\n          'What part of you is not ready to release this?',\n          'What loss do you fear in the letting go?',\n          'What do you think you might lose along with this release?',\n        ],\n      },\n      {\n        order: 5,\n        depth: 'closing',\n        promptText: 'Take a breath and symbolically release. What words mark this letting go?',\n        guidance: 'You might say \"I release...\" or simply exhale with intention.',\n        questionVariations: [\n          'What ritual could honor both the holding and the releasing?',\n          'What would you say to this attachment as you let it go?',\n          'How will you remember this moment of release?',\n          'What blessing do you offer as you open your hands?',\n        ],\n      },\n    ]),\n  },"
}
Now let me add variations to the final reflection - Gratitude Practice:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.ts",
  "old_string": "  // Gratitude Practice - Devotion theme\n  {\n    id: 'gratitude_devotion',\n    themeId: 'devotion' as ThemeTag,\n    title: 'Gratitude Practice',\n    description: 'Cultivate thankfulness and appreciation',\n    icon: '🙏',\n    estimatedMinutes: 7,\n    prompts: createPrompts('gratitude_devotion', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What is one thing you are grateful for in this very moment?',\n        guidance: 'Start with something immediate and tangible.',\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Think of someone who has helped you recently. What did their support mean?',\n        guidance: 'Consider the web of care that surrounds you.',\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What challenge or difficulty has, in retrospect, brought you growth?',\n        guidance: 'Find gratitude even in the harder moments.',\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'How can you carry this sense of gratitude into your next hour?',\n        guidance: 'Let thankfulness become a way of moving through the world.',\n      },\n    ]),\n  },\n];",
  "new_string": "  // Gratitude Practice - Devotion theme\n  {\n    id: 'gratitude_devotion',\n    themeId: 'devotion' as ThemeTag,\n    title: 'Gratitude Practice',\n    description: 'Cultivate thankfulness and appreciation',\n    icon: '🙏',\n    estimatedMinutes: 7,\n    prompts: createPrompts('gratitude_devotion', [\n      {\n        order: 1,\n        depth: 'opening',\n        promptText: 'What is one thing you are grateful for in this very moment?',\n        guidance: 'Start with something immediate and tangible.',\n        questionVariations: [\n          'What small blessing are you often blind to?',\n          'What in your immediate surroundings brings you comfort?',\n          'What simple pleasure did you enjoy today?',\n          'What do you have now that you once wished for?',\n        ],\n      },\n      {\n        order: 2,\n        depth: 'exploring',\n        promptText: 'Think of someone who has helped you recently. What did their support mean?',\n        guidance: 'Consider the web of care that surrounds you.',\n        questionVariations: [\n          'Whose kindness has touched you lately?',\n          'What unexpected help have you received recently?',\n          'Who has believed in you when you doubted yourself?',\n          'What relationship has sustained you through difficulty?',\n        ],\n      },\n      {\n        order: 3,\n        depth: 'deepening',\n        promptText: 'What challenge or difficulty has, in retrospect, brought you growth?',\n        guidance: 'Find gratitude even in the harder moments.',\n        questionVariations: [\n          'What struggle are you now grateful for having faced?',\n          'How has a past hardship shaped you positively?',\n          'What lesson came wrapped in difficulty?',\n          'What strength emerged from a challenging time?',\n        ],\n      },\n      {\n        order: 4,\n        depth: 'closing',\n        promptText: 'How can you carry this sense of gratitude into your next hour?',\n        guidance: 'Let thankfulness become a way of moving through the world.',\n        questionVariations: [\n          'What small act of appreciation could you offer someone today?',\n          'How might gratitude change your next interaction?',\n          'What reminder of thankfulness will you set for yourself?',\n          'How can you let gratitude guide your next decision?',\n        ],\n      },\n    ]),\n  },\n];"
}
Excellent! All question variations have been added. Now let me update the todo and create the expandable UI component:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "completed",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "completed",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "in_progress",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "pending",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}

🔧 Tool: Glob
Input: {
  "pattern": "components/**/*.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}
Now I have enough context. Let me create the expandable QuestionVariations component:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/reflection/QuestionVariations.tsx",
  "content": "import { useState, useCallback } from 'react';\nimport {\n  View,\n  Text,\n  StyleSheet,\n  TouchableOpacity,\n  Animated,\n  LayoutAnimation,\n  Platform,\n  UIManager,\n} from 'react-native';\nimport { COLORS, SPACING, RADII, TYPOGRAPHY, withAlpha, getThemedColors } from '../../lib/ui/theme';\n\n// Enable LayoutAnimation for Android\nif (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {\n  UIManager.setLayoutAnimationEnabledExperimental(true);\n}\n\ninterface QuestionVariationsProps {\n  variations: string[];\n  isDark: boolean;\n  onSelectVariation?: (question: string) => void;\n}\n\nexport function QuestionVariations({ variations, isDark, onSelectVariation }: QuestionVariationsProps) {\n  const [isExpanded, setIsExpanded] = useState(false);\n  const colors = getThemedColors(isDark);\n\n  const toggleExpanded = useCallback(() => {\n    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);\n    setIsExpanded(!isExpanded);\n  }, [isExpanded]);\n\n  const handleSelectVariation = useCallback((question: string) => {\n    onSelectVariation?.(question);\n  }, [onSelectVariation]);\n\n  if (!variations || variations.length === 0) {\n    return null;\n  }\n\n  const dynamicStyles = createStyles(colors, isDark);\n\n  return (\n    <View style={dynamicStyles.container}>\n      <TouchableOpacity\n        style={dynamicStyles.toggleButton}\n        onPress={toggleExpanded}\n        activeOpacity={0.7}\n      >\n        <View style={dynamicStyles.toggleContent}>\n          <Text style={dynamicStyles.toggleIcon}>{isExpanded ? '-' : '+'}</Text>\n          <Text style={dynamicStyles.toggleText}>\n            {isExpanded ? 'Hide alternative prompts' : `${variations.length} more prompts for deeper inquiry`}\n          </Text>\n        </View>\n        <Text style={dynamicStyles.chevron}>{isExpanded ? '\\u25B2' : '\\u25BC'}</Text>\n      </TouchableOpacity>\n\n      {isExpanded && (\n        <View style={dynamicStyles.variationsContainer}>\n          {variations.map((variation, index) => (\n            <TouchableOpacity\n              key={index}\n              style={dynamicStyles.variationItem}\n              onPress={() => handleSelectVariation(variation)}\n              activeOpacity={0.7}\n            >\n              <View style={dynamicStyles.variationBullet}>\n                <Text style={dynamicStyles.bulletText}>{index + 1}</Text>\n              </View>\n              <Text style={dynamicStyles.variationText}>{variation}</Text>\n            </TouchableOpacity>\n          ))}\n          <Text style={dynamicStyles.hint}>Tap a prompt to consider it for your reflection</Text>\n        </View>\n      )}\n    </View>\n  );\n}\n\nconst createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>\n  StyleSheet.create({\n    container: {\n      marginTop: SPACING.sm,\n    },\n    toggleButton: {\n      flexDirection: 'row',\n      alignItems: 'center',\n      justifyContent: 'space-between',\n      paddingVertical: SPACING.sm,\n      paddingHorizontal: SPACING.md,\n      backgroundColor: withAlpha(COLORS.primary, 0.05),\n      borderRadius: RADII.sm,\n      borderWidth: 1,\n      borderColor: withAlpha(COLORS.primary, 0.15),\n      borderStyle: 'dashed',\n    },\n    toggleContent: {\n      flexDirection: 'row',\n      alignItems: 'center',\n      flex: 1,\n    },\n    toggleIcon: {\n      fontSize: 16,\n      fontWeight: '600',\n      color: COLORS.primary,\n      marginRight: SPACING.sm,\n      width: 20,\n      textAlign: 'center',\n    },\n    toggleText: {\n      ...TYPOGRAPHY.styles.caption,\n      color: COLORS.primary,\n      flex: 1,\n    },\n    chevron: {\n      fontSize: 10,\n      color: COLORS.primary,\n      marginLeft: SPACING.sm,\n    },\n    variationsContainer: {\n      marginTop: SPACING.sm,\n      paddingLeft: SPACING.sm,\n    },\n    variationItem: {\n      flexDirection: 'row',\n      alignItems: 'flex-start',\n      paddingVertical: SPACING.sm,\n      paddingHorizontal: SPACING.sm,\n      marginBottom: SPACING.xs,\n      backgroundColor: withAlpha(colors.surface, isDark ? 0.5 : 0.8),\n      borderRadius: RADII.sm,\n      borderLeftWidth: 2,\n      borderLeftColor: withAlpha(COLORS.primary, 0.3),\n    },\n    variationBullet: {\n      width: 20,\n      height: 20,\n      borderRadius: 10,\n      backgroundColor: withAlpha(COLORS.primary, 0.15),\n      justifyContent: 'center',\n      alignItems: 'center',\n      marginRight: SPACING.sm,\n      marginTop: 2,\n    },\n    bulletText: {\n      fontSize: 11,\n      fontWeight: '600',\n      color: COLORS.primary,\n    },\n    variationText: {\n      ...TYPOGRAPHY.styles.body,\n      color: colors.text,\n      flex: 1,\n      lineHeight: 22,\n      fontStyle: 'italic',\n    },\n    hint: {\n      ...TYPOGRAPHY.styles.caption,\n      color: colors.textMuted,\n      textAlign: 'center',\n      marginTop: SPACING.sm,\n      fontStyle: 'italic',\n    },\n  });\n\nexport default QuestionVariations;\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "completed",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "completed",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "completed",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "in_progress",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me integrate the QuestionVariations component into the guided-reflection screen:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "old_string": "import {\n  getGuidedReflectionById,\n  generateReflectionResponse,\n  getCurrentPrompt,\n  getSessionProgress,\n  isSessionComplete,\n  generateSessionSummary,\n  REFLECTION_DEPTH_LABELS,\n} from '../lib/reflection';\nimport { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';",
  "new_string": "import {\n  getGuidedReflectionById,\n  generateReflectionResponse,\n  getCurrentPrompt,\n  getSessionProgress,\n  isSessionComplete,\n  generateSessionSummary,\n  REFLECTION_DEPTH_LABELS,\n} from '../lib/reflection';\nimport { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';\nimport { QuestionVariations } from '../components/reflection/QuestionVariations';"
}
Now let me add the state for tracking the selected variation and add the QuestionVariations component to the current prompt card:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "old_string": "  const [input, setInput] = useState('');\n  const [isGenerating, setIsGenerating] = useState(false);\n  const [sessionSummary, setSessionSummary] = useState<string | null>(null);\n  const scrollViewRef = useRef<ScrollView>(null);",
  "new_string": "  const [input, setInput] = useState('');\n  const [isGenerating, setIsGenerating] = useState(false);\n  const [sessionSummary, setSessionSummary] = useState<string | null>(null);\n  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);\n  const scrollViewRef = useRef<ScrollView>(null);"
}
Now let me add a handler for when a variation is selected and clear the selection when moving to the next step:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "old_string": "  const handleSubmit = useCallback(async () => {\n    if (!input.trim() || isGenerating || !activeSession || !reflection) return;\n\n    const userResponse = input.trim();\n    setInput('');\n    setIsGenerating(true);\n\n    const currentPrompt = getCurrentPrompt(activeSession);\n    if (!currentPrompt) {\n      setIsGenerating(false);\n      return;\n    }\n\n    try {\n      const previousResponses = activeSession.responses.map((r) => ({\n        userResponse: r.userResponse,\n        sageResponse: r.sageResponse,\n      }));\n\n      const result = await generateReflectionResponse(\n        reflection.id,\n        currentPrompt.id,\n        userResponse,\n        preferences,\n        previousResponses\n      );\n\n      addReflectionResponse(currentPrompt.id, userResponse, result.sageResponse);\n      advanceReflectionStep();",
  "new_string": "  const handleSelectVariation = useCallback((question: string) => {\n    setSelectedVariation(question);\n    // Scroll to the selected variation indicator\n    scrollViewRef.current?.scrollToEnd({ animated: true });\n  }, []);\n\n  const handleSubmit = useCallback(async () => {\n    if (!input.trim() || isGenerating || !activeSession || !reflection) return;\n\n    const userResponse = input.trim();\n    setInput('');\n    setIsGenerating(true);\n    setSelectedVariation(null); // Clear selected variation when submitting\n\n    const currentPrompt = getCurrentPrompt(activeSession);\n    if (!currentPrompt) {\n      setIsGenerating(false);\n      return;\n    }\n\n    try {\n      const previousResponses = activeSession.responses.map((r) => ({\n        userResponse: r.userResponse,\n        sageResponse: r.sageResponse,\n      }));\n\n      const result = await generateReflectionResponse(\n        reflection.id,\n        currentPrompt.id,\n        userResponse,\n        preferences,\n        previousResponses\n      );\n\n      addReflectionResponse(currentPrompt.id, userResponse, result.sageResponse);\n      advanceReflectionStep();"
}
Now let me find and update the current prompt rendering to include the QuestionVariations component and show the selected variation:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "offset": 260,
  "limit": 80
}
Now let me update the current prompt section to include the QuestionVariations component and show the selected variation:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "old_string": "          {/* Current prompt (if not complete) */}\n          {currentPrompt && !isComplete && (\n            <View style={dynamicStyles.currentPromptContainer}>\n              <View style={dynamicStyles.promptCard}>\n                <Text style={dynamicStyles.promptLabel}>\n                  {REFLECTION_DEPTH_LABELS[currentPrompt.depth]}\n                </Text>\n                <Text style={dynamicStyles.promptText}>{currentPrompt.promptText}</Text>\n                <Text style={dynamicStyles.promptGuidance}>{currentPrompt.guidance}</Text>\n              </View>\n            </View>\n          )}",
  "new_string": "          {/* Current prompt (if not complete) */}\n          {currentPrompt && !isComplete && (\n            <View style={dynamicStyles.currentPromptContainer}>\n              <View style={dynamicStyles.promptCard}>\n                <Text style={dynamicStyles.promptLabel}>\n                  {REFLECTION_DEPTH_LABELS[currentPrompt.depth]}\n                </Text>\n                <Text style={dynamicStyles.promptText}>{currentPrompt.promptText}</Text>\n                <Text style={dynamicStyles.promptGuidance}>{currentPrompt.guidance}</Text>\n\n                {/* Question Variations - Expandable Section */}\n                {currentPrompt.questionVariations && currentPrompt.questionVariations.length > 0 && (\n                  <QuestionVariations\n                    variations={currentPrompt.questionVariations}\n                    isDark={isDark}\n                    onSelectVariation={handleSelectVariation}\n                  />\n                )}\n              </View>\n\n              {/* Selected Variation Indicator */}\n              {selectedVariation && (\n                <View style={dynamicStyles.selectedVariationContainer}>\n                  <Text style={dynamicStyles.selectedVariationLabel}>Considering:</Text>\n                  <Text style={dynamicStyles.selectedVariationText}>{selectedVariation}</Text>\n                </View>\n              )}\n            </View>\n          )}"
}
Now I need to add the styles for the selected variation indicator. Let me find where the styles are defined:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "offset": 380,
  "limit": 150
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "offset": 510,
  "limit": 150
}
Now let me add the styles for the selected variation indicator. I'll add them before the closing of the createStyles function:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/guided-reflection.tsx",
  "old_string": "    currentPromptContainer: {\n      marginBottom: SPACING.lg,\n    },\n    userResponseContainer: {",
  "new_string": "    currentPromptContainer: {\n      marginBottom: SPACING.lg,\n    },\n    selectedVariationContainer: {\n      backgroundColor: withAlpha(COLORS.primary, 0.1),\n      borderRadius: RADII.md,\n      padding: SPACING.md,\n      borderWidth: 1,\n      borderColor: withAlpha(COLORS.primary, 0.2),\n      marginTop: SPACING.sm,\n    },\n    selectedVariationLabel: {\n      ...TYPOGRAPHY.styles.label,\n      color: COLORS.primary,\n      marginBottom: SPACING.xs,\n    },\n    selectedVariationText: {\n      ...TYPOGRAPHY.styles.body,\n      color: colors.text,\n      fontStyle: 'italic',\n      lineHeight: 22,\n    },\n    userResponseContainer: {"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "completed",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "completed",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "completed",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "completed",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "in_progress",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me check if Playwright is set up in this project and create a verification test:

🔧 Tool: Glob
Input: {
  "pattern": "**/playwright*.{ts,js,json}"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}
This is a React Native app, so Playwright wouldn't be the appropriate testing framework. Playwright is for web browsers, not mobile apps. For React Native, we should use Jest with @testing-library/react-native. Let me check if there's an existing test setup and create a verification test accordingly:

🔧 Tool: Glob
Input: {
  "pattern": "**/*.test.{ts,tsx}"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/jest.config.js"
}
There's a Jest setup with jest-expo. Let me create a verification test for the QuestionVariations component using Jest and @testing-library/react-native:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/__mocks__/llama.rn.ts"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/reflection/QuestionVariations.test.tsx",
  "content": "import React from 'react';\nimport { render, fireEvent, screen } from '@testing-library/react-native';\nimport { QuestionVariations } from './QuestionVariations';\n\ndescribe('QuestionVariations', () => {\n  const mockVariations = [\n    'What emotion is most present in you right now?',\n    'How does your body feel as you start this day?',\n    'What is the quality of your mind in this moment?',\n    'What were you thinking about just before this reflection?',\n  ];\n\n  const defaultProps = {\n    variations: mockVariations,\n    isDark: false,\n    onSelectVariation: jest.fn(),\n  };\n\n  beforeEach(() => {\n    jest.clearAllMocks();\n  });\n\n  it('renders the toggle button with correct count', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    expect(screen.getByText('4 more prompts for deeper inquiry')).toBeTruthy();\n  });\n\n  it('does not render when variations array is empty', () => {\n    const { queryByText } = render(\n      <QuestionVariations {...defaultProps} variations={[]} />\n    );\n\n    expect(queryByText(/more prompts/)).toBeNull();\n  });\n\n  it('does not render when variations is undefined', () => {\n    const { queryByText } = render(\n      <QuestionVariations {...defaultProps} variations={undefined as any} />\n    );\n\n    expect(queryByText(/more prompts/)).toBeNull();\n  });\n\n  it('expands to show variations when toggle is pressed', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    // Initially, variations should not be visible\n    expect(screen.queryByText(mockVariations[0])).toBeNull();\n\n    // Press the toggle button\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n\n    // Now variations should be visible\n    expect(screen.getByText(mockVariations[0])).toBeTruthy();\n    expect(screen.getByText(mockVariations[1])).toBeTruthy();\n    expect(screen.getByText(mockVariations[2])).toBeTruthy();\n    expect(screen.getByText(mockVariations[3])).toBeTruthy();\n  });\n\n  it('shows hide text when expanded', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    // Expand\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n\n    // Should now show hide text\n    expect(screen.getByText('Hide alternative prompts')).toBeTruthy();\n  });\n\n  it('collapses when toggle is pressed again', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    // Expand\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n    expect(screen.getByText(mockVariations[0])).toBeTruthy();\n\n    // Collapse\n    fireEvent.press(screen.getByText('Hide alternative prompts'));\n\n    // Variations should not be visible\n    expect(screen.queryByText(mockVariations[0])).toBeNull();\n  });\n\n  it('calls onSelectVariation when a variation is tapped', () => {\n    const mockOnSelect = jest.fn();\n    render(<QuestionVariations {...defaultProps} onSelectVariation={mockOnSelect} />);\n\n    // Expand\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n\n    // Tap a variation\n    fireEvent.press(screen.getByText(mockVariations[1]));\n\n    expect(mockOnSelect).toHaveBeenCalledWith(mockVariations[1]);\n  });\n\n  it('shows numbered bullets for each variation', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    // Expand\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n\n    // Check for numbered bullets\n    expect(screen.getByText('1')).toBeTruthy();\n    expect(screen.getByText('2')).toBeTruthy();\n    expect(screen.getByText('3')).toBeTruthy();\n    expect(screen.getByText('4')).toBeTruthy();\n  });\n\n  it('shows hint text when expanded', () => {\n    render(<QuestionVariations {...defaultProps} />);\n\n    // Expand\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n\n    expect(screen.getByText('Tap a prompt to consider it for your reflection')).toBeTruthy();\n  });\n\n  it('works correctly with dark mode', () => {\n    render(<QuestionVariations {...defaultProps} isDark={true} />);\n\n    // Should render without errors in dark mode\n    expect(screen.getByText('4 more prompts for deeper inquiry')).toBeTruthy();\n\n    // Expand and check variations render\n    fireEvent.press(screen.getByText('4 more prompts for deeper inquiry'));\n    expect(screen.getByText(mockVariations[0])).toBeTruthy();\n  });\n\n  it('renders correctly with 3 variations', () => {\n    const threeVariations = mockVariations.slice(0, 3);\n    render(<QuestionVariations {...defaultProps} variations={threeVariations} />);\n\n    expect(screen.getByText('3 more prompts for deeper inquiry')).toBeTruthy();\n  });\n\n  it('renders correctly with 5 variations', () => {\n    const fiveVariations = [...mockVariations, 'A fifth variation question?'];\n    render(<QuestionVariations {...defaultProps} variations={fiveVariations} />);\n\n    expect(screen.getByText('5 more prompts for deeper inquiry')).toBeTruthy();\n  });\n});\n"
}
Now let's run the test to verify the feature works:

🔧 Tool: Bash
Input: {
  "command": "npm test -- --testPathPattern=\"QuestionVariations\" --passWithNoTests 2>&1 | head -100",
  "description": "Run QuestionVariations component test",
  "timeout": 120000
}
All 12 tests pass. Let me also verify that the templates have the correct structure with question variations:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.test.ts",
  "content": "import { GUIDED_REFLECTIONS, getGuidedReflectionById } from './templates';\n\ndescribe('Guided Reflections with Question Variations', () => {\n  it('all reflections should exist', () => {\n    expect(GUIDED_REFLECTIONS).toHaveLength(8);\n  });\n\n  it('all prompts should have 3-5 question variations', () => {\n    for (const reflection of GUIDED_REFLECTIONS) {\n      for (const prompt of reflection.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(Array.isArray(prompt.questionVariations)).toBe(true);\n        expect(prompt.questionVariations!.length).toBeGreaterThanOrEqual(3);\n        expect(prompt.questionVariations!.length).toBeLessThanOrEqual(5);\n      }\n    }\n  });\n\n  it('all question variations should be non-empty strings', () => {\n    for (const reflection of GUIDED_REFLECTIONS) {\n      for (const prompt of reflection.prompts) {\n        for (const variation of prompt.questionVariations!) {\n          expect(typeof variation).toBe('string');\n          expect(variation.trim().length).toBeGreaterThan(0);\n        }\n      }\n    }\n  });\n\n  describe('Morning Check-in', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('morning_purpose');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(4);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Evening Wind-down', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('evening_peace');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(5);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Nature Walk', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('nature_meditation');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(5);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Facing Difficulty', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('facing_suffering');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(5);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Mindful Action', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('mindful_action');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(4);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Knowing Yourself', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('knowing_self');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(5);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Letting Go', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('letting_go');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(5);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  describe('Gratitude Practice', () => {\n    it('should have question variations for all prompts', () => {\n      const reflection = getGuidedReflectionById('gratitude_devotion');\n      expect(reflection).toBeDefined();\n      expect(reflection!.prompts).toHaveLength(4);\n\n      for (const prompt of reflection!.prompts) {\n        expect(prompt.questionVariations).toBeDefined();\n        expect(prompt.questionVariations!.length).toBe(4);\n      }\n    });\n  });\n\n  it('question variations should be unique within each prompt', () => {\n    for (const reflection of GUIDED_REFLECTIONS) {\n      for (const prompt of reflection.prompts) {\n        const uniqueVariations = new Set(prompt.questionVariations);\n        expect(uniqueVariations.size).toBe(prompt.questionVariations!.length);\n      }\n    }\n  });\n\n  it('question variations should be different from the main prompt text', () => {\n    for (const reflection of GUIDED_REFLECTIONS) {\n      for (const prompt of reflection.prompts) {\n        for (const variation of prompt.questionVariations!) {\n          expect(variation.toLowerCase()).not.toBe(prompt.promptText.toLowerCase());\n        }\n      }\n    }\n  });\n});\n"
}

🔧 Tool: Bash
Input: {
  "command": "npm test -- --testPathPattern=\"templates\" --passWithNoTests 2>&1 | head -100",
  "description": "Run templates test to verify variations",
  "timeout": 120000
}
All 13 tests pass. Now let me also run the TypeScript type checker to ensure everything is correctly typed:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1 | head -50",
  "description": "Run TypeScript type checker",
  "timeout": 120000
}
The TypeScript errors are pre-existing and not related to my changes. Let me check if my changes introduce any new type errors by checking just the files I modified:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit lib/reflection/types.ts lib/reflection/templates.ts components/reflection/QuestionVariations.tsx app/guided-reflection.tsx 2>&1",
  "description": "Check TypeScript for changed files",
  "timeout": 60000
}
These are pre-existing TypeScript errors related to React Native and DOM type conflicts - they are not related to my changes. Let me verify our changes by running the full test suite:

🔧 Tool: Bash
Input: {
  "command": "npm test -- --testPathPattern=\"(QuestionVariations|templates)\" 2>&1",
  "description": "Run all feature-related tests",
  "timeout": 120000
}
All 25 tests pass. Now let me delete the test files as per the requirement (these are temporary verification tests):

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/components/reflection/QuestionVariations.test.tsx /Users/vimo/Projects/OpenCode/Sage_AI/lib/reflection/templates.test.ts",
  "description": "Delete temporary test files"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing reflection structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for question bank feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Add questionVariations field to ReflectionPrompt type",
      "status": "completed",
      "activeForm": "Adding questionVariations type"
    },
    {
      "content": "Add 3-5 question variations to all existing prompts in templates",
      "status": "completed",
      "activeForm": "Adding question variations"
    },
    {
      "content": "Create expandable UI component for question variations",
      "status": "completed",
      "activeForm": "Creating expandable UI"
    },
    {
      "content": "Integrate expanded questions into guided-reflection screen",
      "status": "completed",
      "activeForm": "Integrating into reflection screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "completed",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
<summary>
## Summary: Enhanced Reflection section with 3-5 question variations per response

### Changes Implemented
- Added `questionVariations` optional field to `ReflectionPrompt` type interface for storing 3-5 alternative questions per prompt
- Added 4 unique question variations to every prompt across all 8 guided reflections (36 prompts total = 144 new question variations)
- Created a new `QuestionVariations` component with expandable/collapsible UI that:
  - Shows a dashed toggle button indicating the number of available alternative prompts
  - Expands to reveal numbered question variations when tapped
  - Allows users to tap individual variations to "consider" them for their reflection
  - Includes helpful hint text and visual styling that works in both light and dark modes
- Integrated the `QuestionVariations` component into the guided-reflection screen:
  - Displays beneath the current prompt's guidance text
  - Shows a "Considering:" indicator when a user selects a variation
  - Automatically clears the selection when the user submits their response

### Files Modified
- `lib/reflection/types.ts` - Added `questionVariations?: string[]` to `ReflectionPrompt` interface
- `lib/reflection/templates.ts` - Added 4 question variations to each of the 36 prompts across 8 reflections
- `components/reflection/QuestionVariations.tsx` - New component (created)
- `app/guided-reflection.tsx` - Integrated `QuestionVariations` component and added selection state/styles

### Verification Status
- Created temporary Jest tests for both the `QuestionVariations` component (12 tests) and the templates structure (13 tests)
- All 25 tests passed successfully
- Tests verified:
  - Component renders correctly with 3-5 variations
  - Toggle expand/collapse functionality works
  - Selection callback fires correctly
  - Dark mode support works
  - All 8 reflections have question variations on all prompts
  - All variations are unique and non-empty strings
- Test files deleted after successful verification as per requirements

### Notes for Developer
- The question variations are designed to offer different angles of inquiry while maintaining the same depth level (opening, exploring, deepening, integrating, closing)
- Each reflection theme has contextually appropriate variations (e.g., nature-themed questions for Nature Walk, action-oriented questions for Mindful Action)
- The UI uses LayoutAnimation for smooth expand/collapse transitions
- The selected variation serves as a visual reminder to the user but does not affect the LLM prompt generation - users can choose to address any question in their response
- Pre-existing TypeScript errors in the project (unrelated to this feature) remain in `lib/storage/store.ts` and `scripts/` files
</summary>