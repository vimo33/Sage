import * as SQLite from 'expo-sqlite';
import { defaultDatabaseDirectory, openDatabaseAsync, importDatabaseFromAssetAsync } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { runMigrations, getCurrentVersion, getLatestVersion } from '../storage/migrations';

export type ThemeTag =
  | 'action'
  | 'detachment'
  | 'suffering'
  | 'purpose'
  | 'discipline'
  | 'compassion'
  | 'self'
  | 'impermanence'
  | 'devotion'
  | 'knowledge'
  | 'meditation'
  | 'desire'
  | 'peace'
  | 'duty'
  | 'truth';

export type ToneTag = 'poetic' | 'philosophical' | 'direct' | 'devotional';

export interface WisdomChunk {
  id: string;
  content: string;
  sourceRef: string;
  book: string;
  theme: ThemeTag;
  tone: ToneTag;
  chapter?: string;
  verseNum?: string;
  score?: number;
}

export interface SearchOptions {
  limit?: number;
  themes?: ThemeTag[];
  tones?: ToneTag[];
  books?: string[];
  minScore?: number;
}

const DEFAULT_SEARCH_OPTIONS: Required<Pick<SearchOptions, 'limit' | 'minScore'>> = {
  limit: 5,
  minScore: 0,
};

let db: SQLite.SQLiteDatabase | null = null;

const DB_NAME = 'wisdom.db';

function getSqliteDirectoryUri(): string {
  // Always use documentDirectory/SQLite for file operations
  // This is where we'll copy the DB and where we'll tell expo-sqlite to look
  return `${FileSystem.documentDirectory}SQLite`;
}

/**
 * SDK 52 FIX: Use importDatabaseFromAssetAsync for pre-populated database loading
 *
 * The previous approach using `asset.downloadAsync()` fails silently on iOS release builds
 * because bundled assets use `file://` protocol instead of HTTP URLs.
 *
 * This fix uses two approaches:
 * 1. Primary: SDK 52's `importDatabaseFromAssetAsync` function (same as SQLiteProvider.assetSource)
 * 2. Fallback: Asset.loadAsync() + FileSystem.copyAsync() (NOT downloadAsync!)
 *
 * See: https://github.com/expo/expo/issues/26502
 */
export async function initWisdomDB(): Promise<void> {
  if (db) return;

  try {
    console.log('[Sage] Initializing Wisdom DB with SDK 52 importDatabaseFromAssetAsync...');

    // Check if database already exists and is valid
    const sqliteDir = getSqliteDirectoryUri();
    const dbPath = `${sqliteDir}/${DB_NAME}`;
    const dbInfo = await FileSystem.getInfoAsync(dbPath);
    const needsImport = !dbInfo.exists || (dbInfo.exists && (dbInfo as any).size < 1000000);

    if (needsImport) {
      // Delete corrupted/empty database if it exists
      if (dbInfo.exists) {
        console.log('[Sage] Existing DB is too small, deleting:', (dbInfo as any).size);
        await FileSystem.deleteAsync(dbPath, { idempotent: true });
      }

      // PRIMARY APPROACH: Use SDK 52's importDatabaseFromAssetAsync
      // This is the official API used by SQLiteProvider's assetSource prop
      // It handles asset resolution correctly across development and release builds
      try {
        console.log('[Sage] Attempting SDK 52 importDatabaseFromAssetAsync...');

        await importDatabaseFromAssetAsync(DB_NAME, {
          assetId: require('../../assets/data/wisdom.db'),
          forceOverwrite: false, // Only copy if doesn't exist
        });

        console.log('[Sage] ✅ Database imported via importDatabaseFromAssetAsync');
      } catch (importError) {
        console.log('[Sage] importDatabaseFromAssetAsync failed, trying fallback:', importError);

        // FALLBACK APPROACH: Use Asset.loadAsync() + copyAsync()
        // CRITICAL: Uses loadAsync (NOT downloadAsync!) which works with file:// URIs
        console.log('[Sage] Attempting fallback with Asset.loadAsync + copyAsync...');

        // Ensure SQLite directory exists
        const dirInfo = await FileSystem.getInfoAsync(sqliteDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
          console.log('[Sage] Created SQLite directory');
        }

        // Load asset using loadAsync (returns localUri that works in release builds!)
        // This is different from downloadAsync which fails with file:// URIs
        const [asset] = await Asset.loadAsync(require('../../assets/data/wisdom.db'));

        if (!asset.localUri) {
          throw new Error('Failed to load database asset - localUri is null');
        }

        console.log('[Sage] Asset loaded, localUri:', asset.localUri);

        // Copy using copyAsync (works with file:// URIs, unlike downloadAsync)
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: dbPath,
        });

        // Verify copy succeeded
        const copiedInfo = await FileSystem.getInfoAsync(dbPath);
        console.log('[Sage] ✅ Database copied via fallback, size:', (copiedInfo as any).size);
      }
    } else {
      console.log('[Sage] Database already exists, size:', (dbInfo as any).size);
    }

    // Open the database
    db = await SQLite.openDatabaseAsync(DB_NAME);
    console.log('[Sage] ✅ Database opened');
    console.log('[Sage] Database path:', (db as any).databasePath);

    // Verify the database has content
    await verifyDatabaseContent();

    // Run any pending migrations
    const { applied, currentVersion } = await runMigrations(db);
    if (applied.length > 0) {
      console.log(`[Sage] Applied ${applied.length} migration(s), now at v${currentVersion}`);
    }

  } catch (error) {
    console.error('[Sage] ❌ Failed to initialize Wisdom DB:', error);
    db = null;
    // Don't rethrow - app should continue without wisdom features
  }
}

/**
 * Verify the database was loaded correctly with content
 */
async function verifyDatabaseContent(): Promise<void> {
  if (!db) return;

  try {
    // Check FTS5 is enabled
    const fts5Result = await db.getFirstAsync<{ fts5_enabled: number }>(
      "SELECT sqlite_compileoption_used('ENABLE_FTS5') as fts5_enabled"
    );
    console.log('[Sage] FTS5 enabled:', fts5Result?.fts5_enabled === 1);

    // List all tables
    const tables = await db.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' OR type='virtual'"
    );
    console.log('[Sage] Tables found:', tables.map(t => t.name).join(', '));

    // Count chunks
    const countResult = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM chunks'
    );
    console.log('[Sage] ✅ Wisdom DB chunk count:', countResult?.count);

    // Check for FTS5 tables
    const ftsTables = await db.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE sql LIKE '%fts5%'"
    );
    console.log('[Sage] FTS5 tables:', ftsTables.map(t => t.name).join(', ') || 'none');

    // Verify chunks_fts exists and works
    try {
      const ftsCount = await db.getFirstAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM chunks_fts'
      );
      console.log('[Sage] chunks_fts row count:', ftsCount?.count);
    } catch (ftsErr) {
      console.warn('[Sage] chunks_fts table not accessible:', ftsErr);
    }

  } catch (verifyErr) {
    console.error('[Sage] Database verification failed:', verifyErr);
  }
}

/**
 * Diagnostic function to check wisdom DB status
 */
export async function getWisdomDBDiagnostics(): Promise<{
  dbLoaded: boolean;
  dbPath: string;
  dbExists: boolean;
  dbSize: number;
  chunkCount: number;
  bundleDir: string | null;
  defaultDir: string | null;
  actualDbPath: string | null;
  initAttempted: boolean;
  error?: string;
}> {
  const sqliteDir = getSqliteDirectoryUri();
  const dbPath = `${sqliteDir}/${DB_NAME}`;

  try {
    const dbInfo = await FileSystem.getInfoAsync(dbPath);
    let chunkCount = 0;
    let initAttempted = false;

    // Try to init if db is null
    if (!db) {
      initAttempted = true;
      await initWisdomDB();
    }

    if (db) {
      try {
        const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM chunks');
        chunkCount = result?.count ?? 0;
      } catch (e) {
        // Try to get table list to debug
        console.log('[Sage] Diagnostics: Failed to count chunks:', e);
      }
    }

    // Re-check file info after init
    const dbInfoAfter = await FileSystem.getInfoAsync(dbPath);

    return {
      dbLoaded: db !== null,
      dbPath,
      dbExists: dbInfoAfter.exists,
      dbSize: (dbInfoAfter as any).size ?? 0,
      chunkCount,
      bundleDir: FileSystem.bundleDirectory,
      defaultDir: defaultDatabaseDirectory,
      actualDbPath: db ? (db as any).databasePath : null,
      initAttempted,
    };
  } catch (error) {
    return {
      dbLoaded: false,
      dbPath,
      dbExists: false,
      dbSize: 0,
      chunkCount: 0,
      bundleDir: FileSystem.bundleDirectory,
      defaultDir: defaultDatabaseDirectory,
      actualDbPath: null,
      initAttempted: true,
      error: String(error),
    };
  }
}

export async function getSchemaVersion(): Promise<number> {
  if (!db) {
    await initWisdomDB();
  }
  if (!db) {
    return 0;
  }
  return getCurrentVersion(db);
}

export function getTargetSchemaVersion(): number {
  return getLatestVersion();
}

export async function closeWisdomDB(): Promise<void> {
  if (!db) return;
  await db.closeAsync();
  db = null;
}

export async function searchWisdom(
  query: string,
  options: SearchOptions = {}
): Promise<WisdomChunk[]> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init (e.g., wisdom.db not available in release build), return empty
  if (!db) {
    console.warn('[Sage] searchWisdom: DB not available');
    return [];
  }

  const opts: SearchOptions = { ...DEFAULT_SEARCH_OPTIONS, ...options };
  const searchTerms = prepareSearchQuery(query);

  if (!searchTerms) {
    return [];
  }

  let sql = `
    SELECT 
      c.id,
      c.content,
      c.source_ref as sourceRef,
      c.book,
      c.theme,
      c.tone,
      c.chapter,
      c.verse_num as verseNum,
      bm25(chunks_fts) as score
    FROM chunks_fts
    JOIN chunks c ON chunks_fts.rowid = c.rowid
    WHERE chunks_fts MATCH ?
  `;

  const params: (string | number)[] = [searchTerms];

  if (opts.themes && opts.themes.length > 0) {
    const placeholders = opts.themes.map(() => '?').join(', ');
    sql += ` AND c.theme IN (${placeholders})`;
    params.push(...opts.themes);
  }

  if (opts.tones && opts.tones.length > 0) {
    const placeholders = opts.tones.map(() => '?').join(', ');
    sql += ` AND c.tone IN (${placeholders})`;
    params.push(...opts.tones);
  }

  if (opts.books && opts.books.length > 0) {
    const placeholders = opts.books.map(() => '?').join(', ');
    sql += ` AND c.book IN (${placeholders})`;
    params.push(...opts.books);
  }

  sql += ` ORDER BY score LIMIT ?`;
  params.push(opts.limit ?? DEFAULT_SEARCH_OPTIONS.limit);

  const results = await db.getAllAsync<WisdomChunk>(sql, params);

  const minScore = opts.minScore ?? DEFAULT_SEARCH_OPTIONS.minScore;
  return results
    .map((r) => ({
      ...r,
      score: Math.abs(r.score ?? 0),
    }))
    .filter((r) => (r.score ?? 0) >= minScore);
}

export async function searchByTheme(
  theme: ThemeTag,
  options: Omit<SearchOptions, 'themes'> = {}
): Promise<WisdomChunk[]> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return empty
  if (!db) {
    console.warn('[Sage] searchByTheme: DB not available');
    return [];
  }

  const opts: SearchOptions = { ...DEFAULT_SEARCH_OPTIONS, ...options, themes: [theme] };

  let sql = `
    SELECT 
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum
    FROM chunks
    WHERE theme = ?
  `;

  const params: (string | number)[] = [theme];

  if (opts.tones && opts.tones.length > 0) {
    const placeholders = opts.tones.map(() => '?').join(', ');
    sql += ` AND tone IN (${placeholders})`;
    params.push(...opts.tones);
  }

  if (opts.books && opts.books.length > 0) {
    const placeholders = opts.books.map(() => '?').join(', ');
    sql += ` AND book IN (${placeholders})`;
    params.push(...opts.books);
  }

  sql += ` ORDER BY RANDOM() LIMIT ?`;
  params.push(opts.limit ?? DEFAULT_SEARCH_OPTIONS.limit);

  return db.getAllAsync<WisdomChunk>(sql, params);
}

export async function getRandomWisdom(
  options: SearchOptions = {}
): Promise<WisdomChunk | null> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return null
  if (!db) {
    console.warn('[Sage] getRandomWisdom: DB not available');
    return null;
  }

  let sql = `
    SELECT 
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum
    FROM chunks
    WHERE 1=1
  `;

  const params: (string | number)[] = [];

  if (options.themes && options.themes.length > 0) {
    const placeholders = options.themes.map(() => '?').join(', ');
    sql += ` AND theme IN (${placeholders})`;
    params.push(...options.themes);
  }

  if (options.tones && options.tones.length > 0) {
    const placeholders = options.tones.map(() => '?').join(', ');
    sql += ` AND tone IN (${placeholders})`;
    params.push(...options.tones);
  }

  if (options.books && options.books.length > 0) {
    const placeholders = options.books.map(() => '?').join(', ');
    sql += ` AND book IN (${placeholders})`;
    params.push(...options.books);
  }

  sql += ` ORDER BY RANDOM() LIMIT 1`;

  const results = await db.getAllAsync<WisdomChunk>(sql, params);
  return results[0] ?? null;
}

export async function getChunkCount(
  options: Pick<SearchOptions, 'themes' | 'books'> = {}
): Promise<number> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return 0
  if (!db) {
    return 0;
  }

  let sql = `SELECT COUNT(*) as count FROM chunks WHERE 1=1`;
  const params: (string | number)[] = [];

  if (options.themes && options.themes.length > 0) {
    const placeholders = options.themes.map(() => '?').join(', ');
    sql += ` AND theme IN (${placeholders})`;
    params.push(...options.themes);
  }

  if (options.books && options.books.length > 0) {
    const placeholders = options.books.map(() => '?').join(', ');
    sql += ` AND book IN (${placeholders})`;
    params.push(...options.books);
  }

  const result = await db.getFirstAsync<{ count: number }>(sql, params);
  return result?.count ?? 0;
}

export async function getAvailableBooks(): Promise<Array<{ book: string; count: number }>> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return empty array
  if (!db) {
    return [];
  }

  return db.getAllAsync<{ book: string; count: number }>(
    `SELECT book, COUNT(*) as count FROM chunks GROUP BY book ORDER BY count DESC`
  );
}

export async function getThemeDistribution(): Promise<Array<{ theme: ThemeTag; count: number }>> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return empty array
  if (!db) {
    return [];
  }

  return db.getAllAsync<{ theme: ThemeTag; count: number }>(
    `SELECT theme, COUNT(*) as count FROM chunks GROUP BY theme ORDER BY count DESC`
  );
}

const STOP_WORDS = new Set([
  'how',
  'what',
  'why',
  'when',
  'where',
  'who',
  'which',
  'can',
  'could',
  'should',
  'would',
  'do',
  'does',
  'did',
  'is',
  'are',
  'was',
  'were',
  'am',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'as',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'between',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'all',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  'just',
  'i',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'you',
  'your',
  'he',
  'him',
  'his',
  'she',
  'her',
  'it',
  'its',
  'they',
  'them',
  'their',
  'this',
  'that',
  'these',
  'those',
  // Additional common question/conversational words
  'tell',
  'give',
  'get',
  'need',
  'want',
  'like',
  'about',
  'really',
  'something',
  'anything',
  'please',
  'help',
]);

// Words that are stop words UNLESS they appear in meaningful context
const CONTEXTUAL_STOP_WORDS = new Set(['self', 'one', 'way', 'life', 'mind']);

// Synonym expansion map for wisdom-related concepts
const SYNONYM_MAP: Record<string, string[]> = {
  // Emotional states
  peace: ['calm', 'tranquil', 'serenity', 'stillness', 'quiet'],
  calm: ['peace', 'tranquil', 'serenity', 'stillness'],
  anxiety: ['worry', 'fear', 'unease', 'restless'],
  fear: ['anxiety', 'worry', 'dread', 'afraid'],
  anger: ['wrath', 'rage', 'fury', 'resentment'],
  happy: ['joy', 'bliss', 'content', 'delight'],
  joy: ['happy', 'bliss', 'delight', 'gladness'],
  sad: ['sorrow', 'grief', 'melancholy', 'despair'],
  sorrow: ['sad', 'grief', 'suffering', 'pain'],
  suffering: ['pain', 'sorrow', 'anguish', 'distress'],

  // Spiritual concepts
  soul: ['spirit', 'atman', 'self', 'essence'],
  spirit: ['soul', 'atman', 'essence', 'divine'],
  atman: ['soul', 'self', 'spirit', 'essence'],
  brahman: ['divine', 'absolute', 'supreme', 'eternal'],
  enlightenment: ['awakening', 'liberation', 'moksha', 'realization'],
  moksha: ['liberation', 'freedom', 'enlightenment', 'release'],
  liberation: ['moksha', 'freedom', 'release', 'awakening'],
  karma: ['action', 'deed', 'consequence', 'fate'],
  dharma: ['duty', 'righteousness', 'law', 'path'],
  yoga: ['union', 'discipline', 'practice', 'path'],

  // Virtues and qualities
  wisdom: ['knowledge', 'understanding', 'insight', 'discernment'],
  knowledge: ['wisdom', 'understanding', 'learning', 'truth'],
  truth: ['reality', 'dharma', 'satya', 'verity'],
  love: ['compassion', 'devotion', 'bhakti', 'affection'],
  compassion: ['love', 'kindness', 'mercy', 'empathy'],
  devotion: ['love', 'bhakti', 'worship', 'dedication'],
  discipline: ['practice', 'tapas', 'austerity', 'control'],
  detachment: ['renunciation', 'vairagya', 'letting go', 'non-attachment'],

  // Mental states
  mind: ['consciousness', 'thought', 'intellect', 'awareness'],
  thought: ['mind', 'thinking', 'reflection', 'contemplation'],
  meditation: ['contemplation', 'dhyana', 'focus', 'stillness'],
  concentration: ['focus', 'attention', 'dhyana', 'meditation'],
  awareness: ['consciousness', 'mindfulness', 'attention', 'presence'],

  // Life concepts
  death: ['mortality', 'impermanence', 'passing', 'end'],
  life: ['existence', 'being', 'living', 'world'],
  birth: ['origin', 'beginning', 'creation', 'arising'],
  desire: ['craving', 'longing', 'attachment', 'want'],
  attachment: ['desire', 'clinging', 'bond', 'craving'],
  action: ['karma', 'deed', 'work', 'effort'],
  duty: ['dharma', 'obligation', 'responsibility', 'purpose'],
  purpose: ['meaning', 'goal', 'aim', 'dharma'],

  // Common query reformulations
  stressed: ['stress', 'tension', 'pressure', 'overwhelm'],
  worried: ['worry', 'anxious', 'concern', 'fear'],
  depressed: ['depression', 'sad', 'despair', 'hopeless'],
  lonely: ['alone', 'isolation', 'solitude', 'loneliness'],
  confused: ['confusion', 'lost', 'uncertain', 'doubt'],
  lost: ['confused', 'directionless', 'uncertain', 'seeking'],
};

// Common multi-word phrases that should be searched together
// IMPORTANT: Longer/more specific phrases should come FIRST to match before shorter ones
const PHRASE_PATTERNS: Array<{ pattern: RegExp; phrase: string }> = [
  // Longer phrases first (4+ words)
  { pattern: /cycle\s+of\s+birth\s+and\s+death/i, phrase: 'cycle of birth and death' },
  { pattern: /path\s+of\s+knowledge/i, phrase: 'path of knowledge' },
  { pattern: /path\s+of\s+devotion/i, phrase: 'path of devotion' },
  { pattern: /path\s+of\s+action/i, phrase: 'path of action' },
  // 3-word phrases
  { pattern: /birth\s+and\s+death/i, phrase: 'birth and death' },
  { pattern: /good\s+and\s+evil/i, phrase: 'good and evil' },
  { pattern: /cycle\s+of\s+birth/i, phrase: 'cycle of birth' },
  // 2-word phrases
  { pattern: /inner\s+peace/i, phrase: 'inner peace' },
  { pattern: /self\s+knowledge/i, phrase: 'self knowledge' },
  { pattern: /self\s+realization/i, phrase: 'self realization' },
  { pattern: /self\s+awareness/i, phrase: 'self awareness' },
  { pattern: /true\s+self/i, phrase: 'true self' },
  { pattern: /higher\s+self/i, phrase: 'higher self' },
  { pattern: /eternal\s+soul/i, phrase: 'eternal soul' },
  { pattern: /supreme\s+being/i, phrase: 'supreme being' },
  { pattern: /divine\s+love/i, phrase: 'divine love' },
  { pattern: /spiritual\s+practice/i, phrase: 'spiritual practice' },
  { pattern: /letting\s+go/i, phrase: 'letting go' },
  { pattern: /non[\s-]?attachment/i, phrase: 'non-attachment' },
  { pattern: /right\s+action/i, phrase: 'right action' },
  { pattern: /right\s+path/i, phrase: 'right path' },
  { pattern: /worldly\s+desire/i, phrase: 'worldly desire' },
  { pattern: /material\s+world/i, phrase: 'material world' },
  { pattern: /ultimate\s+truth/i, phrase: 'ultimate truth' },
  { pattern: /absolute\s+reality/i, phrase: 'absolute reality' },
];

/**
 * Detects quoted phrases in the query string
 * Returns phrases wrapped in quotes and the remaining query
 */
function extractQuotedPhrases(query: string): { phrases: string[]; remaining: string } {
  const phrases: string[] = [];
  const remaining = query.replace(/"([^"]+)"/g, (_match, phrase) => {
    phrases.push(phrase.trim());
    return ' ';
  });
  return { phrases, remaining: remaining.trim() };
}

/**
 * Detects common multi-word phrases in the query
 */
function detectPhrases(query: string): { phrases: string[]; remaining: string } {
  const foundPhrases: string[] = [];
  let remaining = query;

  for (const { pattern, phrase } of PHRASE_PATTERNS) {
    if (pattern.test(remaining)) {
      foundPhrases.push(phrase);
      remaining = remaining.replace(pattern, ' ');
    }
  }

  return { phrases: foundPhrases, remaining: remaining.trim() };
}

/**
 * Expands a term to include synonyms
 * Returns an array of the original term plus its synonyms
 */
function expandWithSynonyms(term: string, maxSynonyms: number = 2): string[] {
  const synonyms = SYNONYM_MAP[term];
  if (!synonyms) {
    return [term];
  }
  // Return original term plus limited synonyms to avoid query explosion
  return [term, ...synonyms.slice(0, maxSynonyms)];
}

/**
 * Determines if a term should be treated as a stop word based on context
 */
function isStopWord(term: string, allTerms: string[]): boolean {
  // Always filter standard stop words
  if (STOP_WORDS.has(term)) {
    return true;
  }

  // Contextual stop words are kept if they're the only meaningful term
  // or if they appear with related wisdom terms
  if (CONTEXTUAL_STOP_WORDS.has(term)) {
    const meaningfulTerms = allTerms.filter(
      (t) => !STOP_WORDS.has(t) && !CONTEXTUAL_STOP_WORDS.has(t) && t.length > 2
    );
    // Keep contextual stop words if they're significant
    if (meaningfulTerms.length <= 1) {
      return false; // Keep the contextual word
    }
    // Also keep if the contextual word has synonyms (indicating it's meaningful)
    if (SYNONYM_MAP[term]) {
      return false;
    }
  }

  return false;
}

/**
 * Enhanced query preparation with synonym expansion, phrase detection,
 * and improved stop word handling
 */
function prepareSearchQuery(query: string): string {
  // Step 1: Extract explicitly quoted phrases
  const { phrases: quotedPhrases, remaining: afterQuotes } = extractQuotedPhrases(query);

  // Step 2: Detect common multi-word phrases
  const { phrases: detectedPhrases, remaining: afterPhrases } = detectPhrases(afterQuotes);

  // Step 3: Process remaining terms
  const allTerms = afterPhrases
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 0);

  // Step 4: Filter stop words with context awareness and deduplicate
  const seenTerms = new Set<string>();
  const filteredTerms = allTerms.filter((term) => {
    // Skip duplicates
    if (seenTerms.has(term)) {
      return false;
    }
    if (term.length <= 2 && !CONTEXTUAL_STOP_WORDS.has(term)) {
      return false;
    }
    if (isStopWord(term, allTerms)) {
      return false;
    }
    seenTerms.add(term);
    return true;
  });

  // Step 5: Expand terms with synonyms
  const expandedTermGroups: string[][] = filteredTerms.map((term) => expandWithSynonyms(term));

  // Step 6: Build FTS query parts
  const queryParts: string[] = [];

  // Add quoted phrases as exact matches (higher priority)
  for (const phrase of quotedPhrases) {
    const cleanPhrase = phrase.replace(/[^\w\s]/g, ' ').trim();
    if (cleanPhrase) {
      queryParts.push(`"${cleanPhrase}"`);
    }
  }

  // Add detected phrases as exact matches
  for (const phrase of detectedPhrases) {
    const cleanPhrase = phrase.replace(/[^\w\s]/g, ' ').trim();
    if (cleanPhrase) {
      queryParts.push(`"${cleanPhrase}"`);
    }
  }

  // Add expanded terms (each group with OR, groups connected with AND for relevance)
  for (const termGroup of expandedTermGroups) {
    if (termGroup.length === 1) {
      // Single term with prefix matching
      queryParts.push(`${termGroup[0]}*`);
    } else {
      // Term with synonyms - use OR within the group
      const synonymQuery = termGroup.map((t) => `${t}*`).join(' OR ');
      queryParts.push(`(${synonymQuery})`);
    }
  }

  // Step 7: Handle empty query fallback
  if (queryParts.length === 0) {
    const fallback = query.trim().replace(/[^\w\s]/g, '');
    if (fallback) {
      return `"${fallback}"`;
    }
    return '';
  }

  // Combine with OR for broader matching (since we want any relevant results)
  // For phrase + terms, we use a mix of exact phrases and expanded terms
  if (queryParts.length === 1) {
    return queryParts[0];
  }

  return queryParts.join(' OR ');
}

/**
 * Exported for testing purposes
 */
export function _testPrepareSearchQuery(query: string): string {
  return prepareSearchQuery(query);
}

const INTENT_THEME_MAP: Record<string, ThemeTag[]> = {
  stress: ['peace', 'detachment', 'meditation'],
  anxious: ['peace', 'meditation', 'detachment'],
  anxiety: ['peace', 'meditation', 'detachment'],
  worried: ['peace', 'detachment', 'impermanence'],
  angry: ['peace', 'compassion', 'detachment'],
  anger: ['peace', 'compassion', 'detachment'],
  sad: ['suffering', 'impermanence', 'compassion'],
  depressed: ['suffering', 'purpose', 'self'],
  lonely: ['compassion', 'self', 'devotion'],
  confused: ['knowledge', 'truth', 'self'],
  lost: ['purpose', 'self', 'knowledge'],
  stuck: ['action', 'purpose', 'discipline'],
  overwhelm: ['peace', 'detachment', 'discipline'],
  work: ['action', 'duty', 'purpose'],
  job: ['action', 'duty', 'purpose'],
  career: ['purpose', 'action', 'duty'],
  relationship: ['compassion', 'detachment', 'duty'],
  family: ['duty', 'compassion', 'devotion'],
  friend: ['compassion', 'truth', 'duty'],
  death: ['impermanence', 'self', 'truth'],
  loss: ['impermanence', 'suffering', 'detachment'],
  change: ['impermanence', 'detachment', 'action'],
  decision: ['knowledge', 'duty', 'action'],
  conflict: ['peace', 'duty', 'compassion'],
  meaning: ['purpose', 'truth', 'self'],
  purpose: ['purpose', 'duty', 'action'],
  happiness: ['peace', 'detachment', 'self'],
  peace: ['peace', 'meditation', 'detachment'],
  calm: ['peace', 'meditation', 'discipline'],
  focus: ['meditation', 'discipline', 'action'],
  motivation: ['action', 'purpose', 'discipline'],
  strength: ['discipline', 'self', 'action'],
  wisdom: ['knowledge', 'truth', 'self'],
  truth: ['truth', 'knowledge', 'self'],
  enlighten: ['knowledge', 'self', 'truth'],
  meditat: ['meditation', 'peace', 'discipline'],
  spiritual: ['self', 'devotion', 'truth'],
  god: ['devotion', 'truth', 'self'],
  divine: ['devotion', 'self', 'truth'],
};

export function detectIntentThemes(query: string): ThemeTag[] {
  const lowerQuery = query.toLowerCase();
  const themes: ThemeTag[] = [];

  for (const [keyword, mappedThemes] of Object.entries(INTENT_THEME_MAP)) {
    if (!lowerQuery.includes(keyword)) continue;
    for (const theme of mappedThemes) {
      if (!themes.includes(theme)) {
        themes.push(theme);
      }
    }
  }

  return themes.slice(0, 3);
}

export interface SurroundingContextResult {
  targetChunk: WisdomChunk;
  beforeChunks: WisdomChunk[];
  afterChunks: WisdomChunk[];
}

/**
 * Get surrounding verses/paragraphs for a given wisdom chunk.
 * Returns the target chunk plus adjacent chunks from the same book/chapter.
 */
export interface BrowseChunksOptions {
  offset?: number;
  limit?: number;
  themes?: ThemeTag[];
  tones?: ToneTag[];
}

export interface BrowseChunksResult {
  chunks: WisdomChunk[];
  totalCount: number;
  hasMore: boolean;
}

/**
 * Get chunks by source book with pagination
 */
export async function getChunksByBook(
  book: string,
  options: BrowseChunksOptions = {}
): Promise<BrowseChunksResult> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return empty result
  if (!db) {
    return { chunks: [], totalCount: 0, hasMore: false };
  }

  const { offset = 0, limit = 20, themes, tones } = options;

  let countSql = `SELECT COUNT(*) as count FROM chunks WHERE book = ?`;
  let chunksSql = `
    SELECT
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum
    FROM chunks
    WHERE book = ?
  `;

  const countParams: (string | number)[] = [book];
  const chunksParams: (string | number)[] = [book];

  if (themes && themes.length > 0) {
    const placeholders = themes.map(() => '?').join(', ');
    countSql += ` AND theme IN (${placeholders})`;
    chunksSql += ` AND theme IN (${placeholders})`;
    countParams.push(...themes);
    chunksParams.push(...themes);
  }

  if (tones && tones.length > 0) {
    const placeholders = tones.map(() => '?').join(', ');
    countSql += ` AND tone IN (${placeholders})`;
    chunksSql += ` AND tone IN (${placeholders})`;
    countParams.push(...tones);
    chunksParams.push(...tones);
  }

  chunksSql += ` ORDER BY chapter, verse_num, rowid LIMIT ? OFFSET ?`;
  chunksParams.push(limit, offset);

  const [countResult, chunks] = await Promise.all([
    db.getFirstAsync<{ count: number }>(countSql, countParams),
    db.getAllAsync<WisdomChunk>(chunksSql, chunksParams),
  ]);

  const totalCount = countResult?.count ?? 0;

  return {
    chunks,
    totalCount,
    hasMore: offset + chunks.length < totalCount,
  };
}

/**
 * Get chunks by theme with pagination
 */
export async function getChunksByThemeWithPagination(
  theme: ThemeTag,
  options: Omit<BrowseChunksOptions, 'themes'> = {}
): Promise<BrowseChunksResult> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return empty result
  if (!db) {
    return { chunks: [], totalCount: 0, hasMore: false };
  }

  const { offset = 0, limit = 20, tones } = options;

  let countSql = `SELECT COUNT(*) as count FROM chunks WHERE theme = ?`;
  let chunksSql = `
    SELECT
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum
    FROM chunks
    WHERE theme = ?
  `;

  const countParams: (string | number)[] = [theme];
  const chunksParams: (string | number)[] = [theme];

  if (tones && tones.length > 0) {
    const placeholders = tones.map(() => '?').join(', ');
    countSql += ` AND tone IN (${placeholders})`;
    chunksSql += ` AND tone IN (${placeholders})`;
    countParams.push(...tones);
    chunksParams.push(...tones);
  }

  chunksSql += ` ORDER BY book, chapter, verse_num, rowid LIMIT ? OFFSET ?`;
  chunksParams.push(limit, offset);

  const [countResult, chunks] = await Promise.all([
    db.getFirstAsync<{ count: number }>(countSql, countParams),
    db.getAllAsync<WisdomChunk>(chunksSql, chunksParams),
  ]);

  const totalCount = countResult?.count ?? 0;

  return {
    chunks,
    totalCount,
    hasMore: offset + chunks.length < totalCount,
  };
}

/**
 * Get a single chunk by ID
 */
export async function getChunkById(id: string): Promise<WisdomChunk | null> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return null
  if (!db) {
    return null;
  }

  const sql = `
    SELECT
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum
    FROM chunks
    WHERE id = ?
    LIMIT 1
  `;

  const result = await db.getFirstAsync<WisdomChunk>(sql, [id]);
  return result ?? null;
}

export async function getSurroundingContext(
  sourceRef: string,
  contextSize: number = 2
): Promise<SurroundingContextResult | null> {
  if (!db) {
    await initWisdomDB();
  }

  // If db is still null after init, return null
  if (!db) {
    return null;
  }

  // First, find the target chunk by sourceRef
  const targetSql = `
    SELECT
      id,
      content,
      source_ref as sourceRef,
      book,
      theme,
      tone,
      chapter,
      verse_num as verseNum,
      rowid
    FROM chunks
    WHERE source_ref = ?
    LIMIT 1
  `;

  const targetResults = await db.getAllAsync<WisdomChunk & { rowid: number }>(
    targetSql,
    [sourceRef]
  );

  if (targetResults.length === 0) {
    return null;
  }

  const target = targetResults[0];
  const { book, chapter, verseNum, rowid } = target;

  // Build query for surrounding chunks
  // Strategy: Get chunks from the same book, preferring same chapter, ordered by rowid proximity
  let beforeSql: string;
  let afterSql: string;
  let beforeParams: (string | number)[];
  let afterParams: (string | number)[];

  if (chapter && verseNum) {
    // If we have chapter and verse, get verses from same book/chapter
    beforeSql = `
      SELECT
        id,
        content,
        source_ref as sourceRef,
        book,
        theme,
        tone,
        chapter,
        verse_num as verseNum
      FROM chunks
      WHERE book = ? AND chapter = ? AND rowid < ?
      ORDER BY rowid DESC
      LIMIT ?
    `;
    beforeParams = [book, chapter, rowid, contextSize];

    afterSql = `
      SELECT
        id,
        content,
        source_ref as sourceRef,
        book,
        theme,
        tone,
        chapter,
        verse_num as verseNum
      FROM chunks
      WHERE book = ? AND chapter = ? AND rowid > ?
      ORDER BY rowid ASC
      LIMIT ?
    `;
    afterParams = [book, chapter, rowid, contextSize];
  } else {
    // Fallback: Get chunks from same book by rowid proximity
    beforeSql = `
      SELECT
        id,
        content,
        source_ref as sourceRef,
        book,
        theme,
        tone,
        chapter,
        verse_num as verseNum
      FROM chunks
      WHERE book = ? AND rowid < ?
      ORDER BY rowid DESC
      LIMIT ?
    `;
    beforeParams = [book, rowid, contextSize];

    afterSql = `
      SELECT
        id,
        content,
        source_ref as sourceRef,
        book,
        theme,
        tone,
        chapter,
        verse_num as verseNum
      FROM chunks
      WHERE book = ? AND rowid > ?
      ORDER BY rowid ASC
      LIMIT ?
    `;
    afterParams = [book, rowid, contextSize];
  }

  const [beforeResults, afterResults] = await Promise.all([
    db.getAllAsync<WisdomChunk>(beforeSql, beforeParams),
    db.getAllAsync<WisdomChunk>(afterSql, afterParams),
  ]);

  // Reverse beforeResults to get chronological order
  const beforeChunks = beforeResults.reverse();

  return {
    targetChunk: {
      id: target.id,
      content: target.content,
      sourceRef: target.sourceRef,
      book: target.book,
      theme: target.theme,
      tone: target.tone,
      chapter: target.chapter,
      verseNum: target.verseNum,
    },
    beforeChunks,
    afterChunks: afterResults,
  };
}
