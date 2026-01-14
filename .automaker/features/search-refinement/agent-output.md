
🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "in_progress",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "pending",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "pending",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "pending",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "pending",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright test"
    }
  ]
}
Let me explore the codebase to understand the existing search and retrieval structure.

🔧 Tool: Task
Input: {
  "description": "Explore search/retrieval code",
  "prompt": "Explore this codebase to understand the existing search and retrieval structure. I need to understand:\n\n1. How the current FTS (Full-Text Search) query generation works\n2. The structure of lib/retrieval/search.ts\n3. How the wisdom database is structured\n4. Any existing query processing or text manipulation utilities\n\nFocus on finding:\n- The main search function and its query processing logic\n- Any existing stop word handling\n- How queries are constructed for SQLite FTS\n- The database schema for the wisdom.db\n\nBe thorough and provide code snippets from the relevant files.",
  "subagent_type": "Explore"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/migrations.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/sage.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/service.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "scripts/**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -name \"*.sql\" -o -name \"build*\" -type f 2>/dev/null | head -20",
  "description": "Find SQL schema files and build scripts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/scripts/build-corpus.ts"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type f -name \"*.ts\" -path \"*/lib/*\" | xargs grep -l \"CREATE TABLE\\|FTS\\|chunks\" 2>/dev/null",
  "description": "Find files mentioning database schema creation"
}

🔧 Tool: Grep
Input: {
  "pattern": "prepareSearchQuery|STOP_WORDS|query.*process|normalize.*query",
  "type": "ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib",
  "output_mode": "files_with_matches"
}

🔧 Tool: Grep
Input: {
  "pattern": "bm25|MATCH|FTS",
  "type": "ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib",
  "output_mode": "content",
  "head_limit": 50
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/inference.ts",
  "limit": 100
}
Excellent! Now I have a comprehensive understanding of the existing search structure. Let me update my todos and plan the implementation.

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "in_progress",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "pending",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "pending",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "pending",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright test"
    }
  ]
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}
Now I have a complete picture of the current implementation. Let me plan the implementation approach:

## Implementation Plan

1. **Synonym Expansion**: Add a synonym map for wisdom-related concepts that expands query terms to include related words
2. **Phrase Detection**: Detect quoted phrases and multi-word concepts that should be searched as exact phrases
3. **Better Stop Word Handling**: 
   - Context-aware stop word filtering (preserve meaningful short words in context)
   - Add wisdom-specific stop words
   - Handle negations properly

Let me update my todos and start implementing:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "in_progress",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "pending",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "pending",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright test"
    }
  ]
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "old_string": "const STOP_WORDS = new Set([\n  'how',\n  'what',\n  'why',\n  'when',\n  'where',\n  'who',\n  'which',\n  'can',\n  'could',\n  'should',\n  'would',\n  'do',\n  'does',\n  'did',\n  'is',\n  'are',\n  'was',\n  'were',\n  'am',\n  'be',\n  'been',\n  'being',\n  'have',\n  'has',\n  'had',\n  'having',\n  'the',\n  'a',\n  'an',\n  'and',\n  'or',\n  'but',\n  'in',\n  'on',\n  'at',\n  'to',\n  'for',\n  'of',\n  'with',\n  'by',\n  'from',\n  'as',\n  'into',\n  'through',\n  'during',\n  'before',\n  'after',\n  'above',\n  'below',\n  'between',\n  'under',\n  'again',\n  'further',\n  'then',\n  'once',\n  'here',\n  'there',\n  'all',\n  'each',\n  'few',\n  'more',\n  'most',\n  'other',\n  'some',\n  'such',\n  'no',\n  'nor',\n  'not',\n  'only',\n  'own',\n  'same',\n  'so',\n  'than',\n  'too',\n  'very',\n  'just',\n  'i',\n  'me',\n  'my',\n  'myself',\n  'we',\n  'our',\n  'you',\n  'your',\n  'he',\n  'him',\n  'his',\n  'she',\n  'her',\n  'it',\n  'its',\n  'they',\n  'them',\n  'their',\n  'this',\n  'that',\n  'these',\n  'those',\n]);",
  "new_string": "const STOP_WORDS = new Set([\n  'how',\n  'what',\n  'why',\n  'when',\n  'where',\n  'who',\n  'which',\n  'can',\n  'could',\n  'should',\n  'would',\n  'do',\n  'does',\n  'did',\n  'is',\n  'are',\n  'was',\n  'were',\n  'am',\n  'be',\n  'been',\n  'being',\n  'have',\n  'has',\n  'had',\n  'having',\n  'the',\n  'a',\n  'an',\n  'and',\n  'or',\n  'but',\n  'in',\n  'on',\n  'at',\n  'to',\n  'for',\n  'of',\n  'with',\n  'by',\n  'from',\n  'as',\n  'into',\n  'through',\n  'during',\n  'before',\n  'after',\n  'above',\n  'below',\n  'between',\n  'under',\n  'again',\n  'further',\n  'then',\n  'once',\n  'here',\n  'there',\n  'all',\n  'each',\n  'few',\n  'more',\n  'most',\n  'other',\n  'some',\n  'such',\n  'no',\n  'nor',\n  'not',\n  'only',\n  'own',\n  'same',\n  'so',\n  'than',\n  'too',\n  'very',\n  'just',\n  'i',\n  'me',\n  'my',\n  'myself',\n  'we',\n  'our',\n  'you',\n  'your',\n  'he',\n  'him',\n  'his',\n  'she',\n  'her',\n  'it',\n  'its',\n  'they',\n  'them',\n  'their',\n  'this',\n  'that',\n  'these',\n  'those',\n  // Additional common question/conversational words\n  'tell',\n  'give',\n  'get',\n  'need',\n  'want',\n  'like',\n  'about',\n  'really',\n  'something',\n  'anything',\n  'please',\n  'help',\n]);\n\n// Words that are stop words UNLESS they appear in meaningful context\nconst CONTEXTUAL_STOP_WORDS = new Set(['self', 'one', 'way', 'life', 'mind']);\n\n// Synonym expansion map for wisdom-related concepts\nconst SYNONYM_MAP: Record<string, string[]> = {\n  // Emotional states\n  peace: ['calm', 'tranquil', 'serenity', 'stillness', 'quiet'],\n  calm: ['peace', 'tranquil', 'serenity', 'stillness'],\n  anxiety: ['worry', 'fear', 'unease', 'restless'],\n  fear: ['anxiety', 'worry', 'dread', 'afraid'],\n  anger: ['wrath', 'rage', 'fury', 'resentment'],\n  happy: ['joy', 'bliss', 'content', 'delight'],\n  joy: ['happy', 'bliss', 'delight', 'gladness'],\n  sad: ['sorrow', 'grief', 'melancholy', 'despair'],\n  sorrow: ['sad', 'grief', 'suffering', 'pain'],\n  suffering: ['pain', 'sorrow', 'anguish', 'distress'],\n\n  // Spiritual concepts\n  soul: ['spirit', 'atman', 'self', 'essence'],\n  spirit: ['soul', 'atman', 'essence', 'divine'],\n  atman: ['soul', 'self', 'spirit', 'essence'],\n  brahman: ['divine', 'absolute', 'supreme', 'eternal'],\n  enlightenment: ['awakening', 'liberation', 'moksha', 'realization'],\n  moksha: ['liberation', 'freedom', 'enlightenment', 'release'],\n  liberation: ['moksha', 'freedom', 'release', 'awakening'],\n  karma: ['action', 'deed', 'consequence', 'fate'],\n  dharma: ['duty', 'righteousness', 'law', 'path'],\n  yoga: ['union', 'discipline', 'practice', 'path'],\n\n  // Virtues and qualities\n  wisdom: ['knowledge', 'understanding', 'insight', 'discernment'],\n  knowledge: ['wisdom', 'understanding', 'learning', 'truth'],\n  truth: ['reality', 'dharma', 'satya', 'verity'],\n  love: ['compassion', 'devotion', 'bhakti', 'affection'],\n  compassion: ['love', 'kindness', 'mercy', 'empathy'],\n  devotion: ['love', 'bhakti', 'worship', 'dedication'],\n  discipline: ['practice', 'tapas', 'austerity', 'control'],\n  detachment: ['renunciation', 'vairagya', 'letting go', 'non-attachment'],\n\n  // Mental states\n  mind: ['consciousness', 'thought', 'intellect', 'awareness'],\n  thought: ['mind', 'thinking', 'reflection', 'contemplation'],\n  meditation: ['contemplation', 'dhyana', 'focus', 'stillness'],\n  concentration: ['focus', 'attention', 'dhyana', 'meditation'],\n  awareness: ['consciousness', 'mindfulness', 'attention', 'presence'],\n\n  // Life concepts\n  death: ['mortality', 'impermanence', 'passing', 'end'],\n  life: ['existence', 'being', 'living', 'world'],\n  birth: ['origin', 'beginning', 'creation', 'arising'],\n  desire: ['craving', 'longing', 'attachment', 'want'],\n  attachment: ['desire', 'clinging', 'bond', 'craving'],\n  action: ['karma', 'deed', 'work', 'effort'],\n  duty: ['dharma', 'obligation', 'responsibility', 'purpose'],\n  purpose: ['meaning', 'goal', 'aim', 'dharma'],\n\n  // Common query reformulations\n  stressed: ['stress', 'tension', 'pressure', 'overwhelm'],\n  worried: ['worry', 'anxious', 'concern', 'fear'],\n  depressed: ['depression', 'sad', 'despair', 'hopeless'],\n  lonely: ['alone', 'isolation', 'solitude', 'loneliness'],\n  confused: ['confusion', 'lost', 'uncertain', 'doubt'],\n  lost: ['confused', 'directionless', 'uncertain', 'seeking'],\n};"
}
Good, now let me update the `prepareSearchQuery` function to incorporate all three features: synonym expansion, phrase detection, and better stop word handling:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "completed",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "in_progress",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "pending",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright test"
    }
  ]
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "old_string": "function prepareSearchQuery(query: string): string {\n  const terms = query\n    .toLowerCase()\n    .replace(/[^\\w\\s]/g, ' ')\n    .split(/\\s+/)\n    .filter((term) => term.length > 2 && !STOP_WORDS.has(term));\n\n  if (terms.length === 0) {\n    return `\"${query.trim().replace(/[^\\w\\s]/g, '')}\"`;\n  }\n\n  return terms.map((term) => `${term}*`).join(' OR ');\n}",
  "new_string": "// Common multi-word phrases that should be searched together\nconst PHRASE_PATTERNS: Array<{ pattern: RegExp; phrase: string }> = [\n  { pattern: /inner\\s+peace/i, phrase: 'inner peace' },\n  { pattern: /self\\s+knowledge/i, phrase: 'self knowledge' },\n  { pattern: /self\\s+realization/i, phrase: 'self realization' },\n  { pattern: /self\\s+awareness/i, phrase: 'self awareness' },\n  { pattern: /true\\s+self/i, phrase: 'true self' },\n  { pattern: /higher\\s+self/i, phrase: 'higher self' },\n  { pattern: /eternal\\s+soul/i, phrase: 'eternal soul' },\n  { pattern: /supreme\\s+being/i, phrase: 'supreme being' },\n  { pattern: /divine\\s+love/i, phrase: 'divine love' },\n  { pattern: /spiritual\\s+practice/i, phrase: 'spiritual practice' },\n  { pattern: /letting\\s+go/i, phrase: 'letting go' },\n  { pattern: /non[\\s-]?attachment/i, phrase: 'non-attachment' },\n  { pattern: /path\\s+of\\s+knowledge/i, phrase: 'path of knowledge' },\n  { pattern: /path\\s+of\\s+devotion/i, phrase: 'path of devotion' },\n  { pattern: /path\\s+of\\s+action/i, phrase: 'path of action' },\n  { pattern: /cycle\\s+of\\s+birth/i, phrase: 'cycle of birth' },\n  { pattern: /birth\\s+and\\s+death/i, phrase: 'birth and death' },\n  { pattern: /good\\s+and\\s+evil/i, phrase: 'good and evil' },\n  { pattern: /right\\s+action/i, phrase: 'right action' },\n  { pattern: /right\\s+path/i, phrase: 'right path' },\n  { pattern: /worldly\\s+desire/i, phrase: 'worldly desire' },\n  { pattern: /material\\s+world/i, phrase: 'material world' },\n  { pattern: /ultimate\\s+truth/i, phrase: 'ultimate truth' },\n  { pattern: /absolute\\s+reality/i, phrase: 'absolute reality' },\n];\n\n/**\n * Detects quoted phrases in the query string\n * Returns phrases wrapped in quotes and the remaining query\n */\nfunction extractQuotedPhrases(query: string): { phrases: string[]; remaining: string } {\n  const phrases: string[] = [];\n  const remaining = query.replace(/\"([^\"]+)\"/g, (_match, phrase) => {\n    phrases.push(phrase.trim());\n    return ' ';\n  });\n  return { phrases, remaining: remaining.trim() };\n}\n\n/**\n * Detects common multi-word phrases in the query\n */\nfunction detectPhrases(query: string): { phrases: string[]; remaining: string } {\n  const foundPhrases: string[] = [];\n  let remaining = query;\n\n  for (const { pattern, phrase } of PHRASE_PATTERNS) {\n    if (pattern.test(remaining)) {\n      foundPhrases.push(phrase);\n      remaining = remaining.replace(pattern, ' ');\n    }\n  }\n\n  return { phrases: foundPhrases, remaining: remaining.trim() };\n}\n\n/**\n * Expands a term to include synonyms\n * Returns an array of the original term plus its synonyms\n */\nfunction expandWithSynonyms(term: string, maxSynonyms: number = 2): string[] {\n  const synonyms = SYNONYM_MAP[term];\n  if (!synonyms) {\n    return [term];\n  }\n  // Return original term plus limited synonyms to avoid query explosion\n  return [term, ...synonyms.slice(0, maxSynonyms)];\n}\n\n/**\n * Determines if a term should be treated as a stop word based on context\n */\nfunction isStopWord(term: string, allTerms: string[]): boolean {\n  // Always filter standard stop words\n  if (STOP_WORDS.has(term)) {\n    return true;\n  }\n\n  // Contextual stop words are kept if they're the only meaningful term\n  // or if they appear with related wisdom terms\n  if (CONTEXTUAL_STOP_WORDS.has(term)) {\n    const meaningfulTerms = allTerms.filter(\n      (t) => !STOP_WORDS.has(t) && !CONTEXTUAL_STOP_WORDS.has(t) && t.length > 2\n    );\n    // Keep contextual stop words if they're significant\n    if (meaningfulTerms.length <= 1) {\n      return false; // Keep the contextual word\n    }\n    // Also keep if the contextual word has synonyms (indicating it's meaningful)\n    if (SYNONYM_MAP[term]) {\n      return false;\n    }\n  }\n\n  return false;\n}\n\n/**\n * Enhanced query preparation with synonym expansion, phrase detection,\n * and improved stop word handling\n */\nfunction prepareSearchQuery(query: string): string {\n  // Step 1: Extract explicitly quoted phrases\n  const { phrases: quotedPhrases, remaining: afterQuotes } = extractQuotedPhrases(query);\n\n  // Step 2: Detect common multi-word phrases\n  const { phrases: detectedPhrases, remaining: afterPhrases } = detectPhrases(afterQuotes);\n\n  // Step 3: Process remaining terms\n  const allTerms = afterPhrases\n    .toLowerCase()\n    .replace(/[^\\w\\s]/g, ' ')\n    .split(/\\s+/)\n    .filter((term) => term.length > 0);\n\n  // Step 4: Filter stop words with context awareness\n  const filteredTerms = allTerms.filter((term) => {\n    if (term.length <= 2 && !CONTEXTUAL_STOP_WORDS.has(term)) {\n      return false;\n    }\n    return !isStopWord(term, allTerms);\n  });\n\n  // Step 5: Expand terms with synonyms\n  const expandedTermGroups: string[][] = filteredTerms.map((term) => expandWithSynonyms(term));\n\n  // Step 6: Build FTS query parts\n  const queryParts: string[] = [];\n\n  // Add quoted phrases as exact matches (higher priority)\n  for (const phrase of quotedPhrases) {\n    const cleanPhrase = phrase.replace(/[^\\w\\s]/g, ' ').trim();\n    if (cleanPhrase) {\n      queryParts.push(`\"${cleanPhrase}\"`);\n    }\n  }\n\n  // Add detected phrases as exact matches\n  for (const phrase of detectedPhrases) {\n    const cleanPhrase = phrase.replace(/[^\\w\\s]/g, ' ').trim();\n    if (cleanPhrase) {\n      queryParts.push(`\"${cleanPhrase}\"`);\n    }\n  }\n\n  // Add expanded terms (each group with OR, groups connected with AND for relevance)\n  for (const termGroup of expandedTermGroups) {\n    if (termGroup.length === 1) {\n      // Single term with prefix matching\n      queryParts.push(`${termGroup[0]}*`);\n    } else {\n      // Term with synonyms - use OR within the group\n      const synonymQuery = termGroup.map((t) => `${t}*`).join(' OR ');\n      queryParts.push(`(${synonymQuery})`);\n    }\n  }\n\n  // Step 7: Handle empty query fallback\n  if (queryParts.length === 0) {\n    const fallback = query.trim().replace(/[^\\w\\s]/g, '');\n    if (fallback) {\n      return `\"${fallback}\"`;\n    }\n    return '';\n  }\n\n  // Combine with OR for broader matching (since we want any relevant results)\n  // For phrase + terms, we use a mix of exact phrases and expanded terms\n  if (queryParts.length === 1) {\n    return queryParts[0];\n  }\n\n  return queryParts.join(' OR ');\n}\n\n/**\n * Exported for testing purposes\n */\nexport function _testPrepareSearchQuery(query: string): string {\n  return prepareSearchQuery(query);\n}"
}
Now let me update the todos to mark the completed tasks:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "completed",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "completed",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "completed",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "in_progress",
      "activeForm": "Verifying with Playwright test"
    }
  ]
}
Now I need to verify the implementation. This is a React Native/Expo project, so Playwright wouldn't be appropriate for testing this. Let me check what testing framework is available in this project:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}
This is a React Native/Expo project with Jest for testing. Since this is a mobile app and Playwright is for web browser testing, I should use Jest instead. Let me check the Jest configuration and create a test file for the search refinement functionality:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/jest.config.js"
}
Let me check the mocks directory to understand the testing patterns:

🔧 Tool: Glob
Input: {
  "pattern": "**/__mocks__/**/*"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/__mocks__/llama.rn.ts"
}
Now let me create a test file for verifying the search refinement functionality. Since the project uses Jest with jest-expo, I'll write a unit test for the query preparation logic:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.test.ts",
  "content": "/**\n * Verification tests for search refinement feature\n * Tests: synonym expansion, phrase detection, and stop word handling\n */\n\nimport { _testPrepareSearchQuery } from './search';\n\ndescribe('Search Query Refinement', () => {\n  describe('Basic Query Processing', () => {\n    it('should process simple single-word queries', () => {\n      const result = _testPrepareSearchQuery('peace');\n      // Should include synonyms for 'peace'\n      expect(result).toContain('peace*');\n      expect(result).toContain('calm*');\n    });\n\n    it('should filter stop words', () => {\n      const result = _testPrepareSearchQuery('how can I find peace');\n      // Stop words like 'how', 'can', 'I' should be filtered\n      expect(result).not.toContain('how*');\n      expect(result).not.toContain('can*');\n      expect(result).toContain('peace*');\n      expect(result).toContain('find*');\n    });\n\n    it('should handle queries with only stop words by using fallback', () => {\n      const result = _testPrepareSearchQuery('how can I');\n      // Should fall back to phrase search when only stop words remain\n      expect(result).toBe('\"how can I\"');\n    });\n  });\n\n  describe('Synonym Expansion', () => {\n    it('should expand peace with synonyms', () => {\n      const result = _testPrepareSearchQuery('peace');\n      expect(result).toContain('peace*');\n      expect(result).toContain('calm*');\n      expect(result).toContain('tranquil*');\n    });\n\n    it('should expand meditation with synonyms', () => {\n      const result = _testPrepareSearchQuery('meditation');\n      expect(result).toContain('meditation*');\n      expect(result).toContain('contemplation*');\n      expect(result).toContain('dhyana*');\n    });\n\n    it('should expand spiritual concepts', () => {\n      const result = _testPrepareSearchQuery('soul');\n      expect(result).toContain('soul*');\n      expect(result).toContain('spirit*');\n      expect(result).toContain('atman*');\n    });\n\n    it('should expand wisdom-related terms', () => {\n      const result = _testPrepareSearchQuery('wisdom');\n      expect(result).toContain('wisdom*');\n      expect(result).toContain('knowledge*');\n      expect(result).toContain('understanding*');\n    });\n\n    it('should not expand terms without synonyms', () => {\n      const result = _testPrepareSearchQuery('banana');\n      expect(result).toBe('banana*');\n    });\n  });\n\n  describe('Phrase Detection', () => {\n    it('should detect \"inner peace\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('I want inner peace');\n      expect(result).toContain('\"inner peace\"');\n    });\n\n    it('should detect \"self realization\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('path to self realization');\n      expect(result).toContain('\"self realization\"');\n    });\n\n    it('should detect \"letting go\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('letting go of attachment');\n      expect(result).toContain('\"letting go\"');\n    });\n\n    it('should detect \"birth and death\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('cycle of birth and death');\n      expect(result).toContain('\"birth and death\"');\n    });\n\n    it('should handle multiple phrases in one query', () => {\n      const result = _testPrepareSearchQuery('inner peace through self awareness');\n      expect(result).toContain('\"inner peace\"');\n      expect(result).toContain('\"self awareness\"');\n    });\n  });\n\n  describe('Quoted Phrase Handling', () => {\n    it('should preserve explicitly quoted phrases', () => {\n      const result = _testPrepareSearchQuery('\"eternal truth\"');\n      expect(result).toContain('\"eternal truth\"');\n    });\n\n    it('should handle quoted phrases with other terms', () => {\n      const result = _testPrepareSearchQuery('finding \"divine love\" daily');\n      expect(result).toContain('\"divine love\"');\n      expect(result).toContain('finding*');\n      expect(result).toContain('daily*');\n    });\n\n    it('should handle multiple quoted phrases', () => {\n      const result = _testPrepareSearchQuery('\"inner peace\" and \"outer calm\"');\n      expect(result).toContain('\"inner peace\"');\n      expect(result).toContain('\"outer calm\"');\n    });\n  });\n\n  describe('Stop Word Handling', () => {\n    it('should remove common stop words', () => {\n      const result = _testPrepareSearchQuery('the way to happiness');\n      expect(result).not.toContain('the*');\n      expect(result).toContain('happiness*');\n    });\n\n    it('should remove question words', () => {\n      const result = _testPrepareSearchQuery('what is the meaning of life');\n      expect(result).not.toContain('what*');\n      expect(result).not.toContain('is*');\n      expect(result).not.toContain('the*');\n      expect(result).not.toContain('of*');\n      expect(result).toContain('meaning*');\n    });\n\n    it('should keep contextual stop words when they are significant', () => {\n      // 'life' is a contextual stop word but should be kept when it's the main term\n      const result = _testPrepareSearchQuery('life');\n      expect(result).toContain('life*');\n    });\n\n    it('should keep \"mind\" as it has synonyms', () => {\n      const result = _testPrepareSearchQuery('mind');\n      expect(result).toContain('mind*');\n    });\n\n    it('should handle conversational stop words', () => {\n      const result = _testPrepareSearchQuery('please tell me about meditation');\n      expect(result).not.toContain('please*');\n      expect(result).not.toContain('tell*');\n      expect(result).not.toContain('about*');\n      expect(result).toContain('meditation*');\n    });\n  });\n\n  describe('Complex Query Combinations', () => {\n    it('should handle complex queries with phrases, synonyms, and stop words', () => {\n      const result = _testPrepareSearchQuery('how do I find inner peace through meditation');\n      // Should detect phrase\n      expect(result).toContain('\"inner peace\"');\n      // Should expand meditation\n      expect(result).toContain('meditation*');\n      // Should filter stop words\n      expect(result).not.toContain('how*');\n      expect(result).not.toContain('do*');\n    });\n\n    it('should use OR to combine query parts', () => {\n      const result = _testPrepareSearchQuery('peace wisdom');\n      expect(result).toContain('OR');\n    });\n\n    it('should handle empty queries', () => {\n      const result = _testPrepareSearchQuery('');\n      expect(result).toBe('');\n    });\n\n    it('should handle special characters', () => {\n      const result = _testPrepareSearchQuery('peace & love!');\n      // Special chars should be cleaned\n      expect(result).not.toContain('&');\n      expect(result).not.toContain('!');\n      expect(result).toContain('peace*');\n      expect(result).toContain('love*');\n    });\n  });\n\n  describe('Edge Cases', () => {\n    it('should handle very short terms', () => {\n      const result = _testPrepareSearchQuery('I am at peace');\n      // Short terms like 'I', 'am', 'at' should be filtered\n      expect(result).toContain('peace*');\n    });\n\n    it('should handle repeated terms', () => {\n      const result = _testPrepareSearchQuery('peace peace peace');\n      // Should not have duplicates\n      const peaceCount = (result.match(/peace\\*/g) || []).length;\n      expect(peaceCount).toBe(1);\n    });\n\n    it('should handle mixed case', () => {\n      const result = _testPrepareSearchQuery('PEACE Meditation WISDOM');\n      expect(result).toContain('peace*');\n      expect(result).toContain('meditation*');\n      expect(result).toContain('wisdom*');\n    });\n  });\n});\n"
}
Now let me run the tests to verify the implementation:

🔧 Tool: Bash
Input: {
  "command": "npm test -- lib/retrieval/search.test.ts 2>&1",
  "description": "Run Jest tests for search refinement",
  "timeout": 120000
}
Most tests pass! Let me fix the two failing tests. The "cycle of birth" phrase is being detected because of the pattern matching order, and we need to handle duplicate terms. Let me update the code:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "offset": 504,
  "limit": 80
}
I see the issue. The "cycle of birth" pattern matches before "birth and death" can match. I need to reorder the patterns (longer/more specific first) and add deduplication. Let me fix these issues:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "old_string": "// Common multi-word phrases that should be searched together\nconst PHRASE_PATTERNS: Array<{ pattern: RegExp; phrase: string }> = [\n  { pattern: /inner\\s+peace/i, phrase: 'inner peace' },\n  { pattern: /self\\s+knowledge/i, phrase: 'self knowledge' },\n  { pattern: /self\\s+realization/i, phrase: 'self realization' },\n  { pattern: /self\\s+awareness/i, phrase: 'self awareness' },\n  { pattern: /true\\s+self/i, phrase: 'true self' },\n  { pattern: /higher\\s+self/i, phrase: 'higher self' },\n  { pattern: /eternal\\s+soul/i, phrase: 'eternal soul' },\n  { pattern: /supreme\\s+being/i, phrase: 'supreme being' },\n  { pattern: /divine\\s+love/i, phrase: 'divine love' },\n  { pattern: /spiritual\\s+practice/i, phrase: 'spiritual practice' },\n  { pattern: /letting\\s+go/i, phrase: 'letting go' },\n  { pattern: /non[\\s-]?attachment/i, phrase: 'non-attachment' },\n  { pattern: /path\\s+of\\s+knowledge/i, phrase: 'path of knowledge' },\n  { pattern: /path\\s+of\\s+devotion/i, phrase: 'path of devotion' },\n  { pattern: /path\\s+of\\s+action/i, phrase: 'path of action' },\n  { pattern: /cycle\\s+of\\s+birth/i, phrase: 'cycle of birth' },\n  { pattern: /birth\\s+and\\s+death/i, phrase: 'birth and death' },\n  { pattern: /good\\s+and\\s+evil/i, phrase: 'good and evil' },\n  { pattern: /right\\s+action/i, phrase: 'right action' },\n  { pattern: /right\\s+path/i, phrase: 'right path' },\n  { pattern: /worldly\\s+desire/i, phrase: 'worldly desire' },\n  { pattern: /material\\s+world/i, phrase: 'material world' },\n  { pattern: /ultimate\\s+truth/i, phrase: 'ultimate truth' },\n  { pattern: /absolute\\s+reality/i, phrase: 'absolute reality' },\n];",
  "new_string": "// Common multi-word phrases that should be searched together\n// IMPORTANT: Longer/more specific phrases should come FIRST to match before shorter ones\nconst PHRASE_PATTERNS: Array<{ pattern: RegExp; phrase: string }> = [\n  // Longer phrases first (4+ words)\n  { pattern: /cycle\\s+of\\s+birth\\s+and\\s+death/i, phrase: 'cycle of birth and death' },\n  { pattern: /path\\s+of\\s+knowledge/i, phrase: 'path of knowledge' },\n  { pattern: /path\\s+of\\s+devotion/i, phrase: 'path of devotion' },\n  { pattern: /path\\s+of\\s+action/i, phrase: 'path of action' },\n  // 3-word phrases\n  { pattern: /birth\\s+and\\s+death/i, phrase: 'birth and death' },\n  { pattern: /good\\s+and\\s+evil/i, phrase: 'good and evil' },\n  { pattern: /cycle\\s+of\\s+birth/i, phrase: 'cycle of birth' },\n  // 2-word phrases\n  { pattern: /inner\\s+peace/i, phrase: 'inner peace' },\n  { pattern: /self\\s+knowledge/i, phrase: 'self knowledge' },\n  { pattern: /self\\s+realization/i, phrase: 'self realization' },\n  { pattern: /self\\s+awareness/i, phrase: 'self awareness' },\n  { pattern: /true\\s+self/i, phrase: 'true self' },\n  { pattern: /higher\\s+self/i, phrase: 'higher self' },\n  { pattern: /eternal\\s+soul/i, phrase: 'eternal soul' },\n  { pattern: /supreme\\s+being/i, phrase: 'supreme being' },\n  { pattern: /divine\\s+love/i, phrase: 'divine love' },\n  { pattern: /spiritual\\s+practice/i, phrase: 'spiritual practice' },\n  { pattern: /letting\\s+go/i, phrase: 'letting go' },\n  { pattern: /non[\\s-]?attachment/i, phrase: 'non-attachment' },\n  { pattern: /right\\s+action/i, phrase: 'right action' },\n  { pattern: /right\\s+path/i, phrase: 'right path' },\n  { pattern: /worldly\\s+desire/i, phrase: 'worldly desire' },\n  { pattern: /material\\s+world/i, phrase: 'material world' },\n  { pattern: /ultimate\\s+truth/i, phrase: 'ultimate truth' },\n  { pattern: /absolute\\s+reality/i, phrase: 'absolute reality' },\n];"
}
Now let me add deduplication for repeated terms:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "offset": 610,
  "limit": 80
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts",
  "old_string": "  // Step 4: Filter stop words with context awareness\n  const filteredTerms = allTerms.filter((term) => {\n    if (term.length <= 2 && !CONTEXTUAL_STOP_WORDS.has(term)) {\n      return false;\n    }\n    return !isStopWord(term, allTerms);\n  });\n\n  // Step 5: Expand terms with synonyms\n  const expandedTermGroups: string[][] = filteredTerms.map((term) => expandWithSynonyms(term));",
  "new_string": "  // Step 4: Filter stop words with context awareness and deduplicate\n  const seenTerms = new Set<string>();\n  const filteredTerms = allTerms.filter((term) => {\n    // Skip duplicates\n    if (seenTerms.has(term)) {\n      return false;\n    }\n    if (term.length <= 2 && !CONTEXTUAL_STOP_WORDS.has(term)) {\n      return false;\n    }\n    if (isStopWord(term, allTerms)) {\n      return false;\n    }\n    seenTerms.add(term);\n    return true;\n  });\n\n  // Step 5: Expand terms with synonyms\n  const expandedTermGroups: string[][] = filteredTerms.map((term) => expandWithSynonyms(term));"
}
Now let me update the test case for "birth and death" since the current test expects a specific string but the query now also uses the more specific 4-word pattern. Let me update the test to be more realistic:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.test.ts",
  "old_string": "    it('should detect \"birth and death\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('cycle of birth and death');\n      expect(result).toContain('\"birth and death\"');\n    });",
  "new_string": "    it('should detect \"birth and death\" as a phrase', () => {\n      const result = _testPrepareSearchQuery('birth and death is inevitable');\n      expect(result).toContain('\"birth and death\"');\n    });\n\n    it('should detect \"cycle of birth and death\" as a longer phrase', () => {\n      const result = _testPrepareSearchQuery('the cycle of birth and death continues');\n      // Should detect the longer phrase\n      expect(result).toContain('\"cycle of birth and death\"');\n    });"
}
Now let's run the tests again:

🔧 Tool: Bash
Input: {
  "command": "npm test -- lib/retrieval/search.test.ts 2>&1",
  "description": "Run Jest tests for search refinement",
  "timeout": 120000
}
All 29 tests pass. Now let me also run the TypeScript type check to ensure there are no type errors:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1",
  "description": "Run TypeScript type check",
  "timeout": 60000
}
The TypeScript errors are pre-existing in the codebase (not related to my changes) - they're all in other files like `app/ask.tsx`, `lib/ui/`, `app/debug.tsx`, and `scripts/`. My changes to `lib/retrieval/search.ts` don't have any type errors.

Let me verify this by checking if any of the errors are in the search.ts file:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1 | grep -E \"lib/retrieval/search\\.\" || echo \"No type errors in search.ts\"",
  "description": "Check for type errors in search.ts"
}
The search refinement code has no type errors. Now let me delete the test file as instructed (it was a verification test, not permanent):

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.test.ts",
  "description": "Delete verification test file"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing search/retrieval structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for search refinement",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement synonym expansion",
      "status": "completed",
      "activeForm": "Implementing synonym expansion"
    },
    {
      "content": "Implement phrase detection",
      "status": "completed",
      "activeForm": "Implementing phrase detection"
    },
    {
      "content": "Implement better stop word handling",
      "status": "completed",
      "activeForm": "Implementing stop word handling"
    },
    {
      "content": "Verify implementation with Jest tests",
      "status": "completed",
      "activeForm": "Verifying with Jest tests"
    }
  ]
}
<summary>
## Summary: Improve FTS Query Generation with Synonym Expansion, Phrase Detection, and Better Stop Word Handling

### Changes Implemented

1. **Synonym Expansion**: Added a comprehensive `SYNONYM_MAP` with 40+ term mappings for wisdom-related concepts:
   - Emotional states (peace, calm, anxiety, fear, anger, joy, suffering, etc.)
   - Spiritual concepts (soul, spirit, atman, brahman, enlightenment, moksha, karma, dharma, yoga)
   - Virtues and qualities (wisdom, knowledge, truth, love, compassion, devotion, discipline, detachment)
   - Mental states (mind, thought, meditation, concentration, awareness)
   - Life concepts (death, life, birth, desire, attachment, action, duty, purpose)
   - Common query reformulations (stressed, worried, depressed, lonely, confused, lost)

2. **Phrase Detection**: Added `PHRASE_PATTERNS` with 26+ multi-word phrase patterns:
   - Longer phrases matched first (e.g., "cycle of birth and death", "path of knowledge")
   - Common wisdom phrases (e.g., "inner peace", "self realization", "letting go", "birth and death")
   - Support for explicitly quoted phrases via `extractQuotedPhrases()`

3. **Better Stop Word Handling**:
   - Extended `STOP_WORDS` with conversational words (tell, give, get, need, want, please, help, etc.)
   - Added `CONTEXTUAL_STOP_WORDS` for words that should be kept when significant (self, one, way, life, mind)
   - Context-aware filtering via `isStopWord()` function
   - Deduplication of repeated terms

4. **Enhanced `prepareSearchQuery()` function** with:
   - Step 1: Extract explicitly quoted phrases
   - Step 2: Detect common multi-word phrases
   - Step 3: Process remaining terms with lowercase and special char removal
   - Step 4: Filter stop words with context awareness and deduplicate
   - Step 5: Expand terms with synonyms (max 2 synonyms per term)
   - Step 6: Build FTS query with exact phrase matches and expanded term groups
   - Step 7: Empty query fallback handling

5. **Exported test helper**: Added `_testPrepareSearchQuery()` for testing purposes

### Files Modified
- `lib/retrieval/search.ts` - Main search module with all refinement logic

### Verification Status
- Created Jest unit test with 29 test cases covering:
  - Basic query processing
  - Synonym expansion for various term categories
  - Phrase detection (quoted and auto-detected)
  - Stop word handling (standard, contextual, conversational)
  - Complex query combinations
  - Edge cases (empty queries, repeated terms, special characters, mixed case)
- All 29 tests passed successfully
- No TypeScript type errors in the modified file
- Test file deleted after successful verification (as requested)

### Notes for Developer
- The synonym expansion is limited to 2 synonyms per term to avoid query explosion
- Phrase patterns are ordered by length (longer first) to ensure proper matching
- The `CONTEXTUAL_STOP_WORDS` set contains words like "self", "life", "mind" that are preserved when they are the main query terms or have synonym mappings
- The exported `_testPrepareSearchQuery` function can be used for future testing/debugging
</summary>