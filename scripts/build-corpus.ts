import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_TEXTS_DIR = path.join(__dirname, '..', 'assets', 'data', 'raw');
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'data');
const DB_PATH = path.join(OUTPUT_DIR, 'wisdom.db');

type ThemeTag = 'action' | 'detachment' | 'suffering' | 'purpose' | 'discipline' | 
                'compassion' | 'self' | 'impermanence' | 'devotion' | 'knowledge' |
                'meditation' | 'desire' | 'peace' | 'duty' | 'truth';

type ToneTag = 'poetic' | 'philosophical' | 'direct' | 'devotional';

interface WisdomChunk {
  id: string;
  content: string;
  sourceRef: string;
  book: string;
  theme: ThemeTag;
  tone: ToneTag;
  chapter?: string;
  verseNum?: string;
}

const THEME_KEYWORDS: Record<ThemeTag, string[]> = {
  action: ['action', 'work', 'deed', 'karma', 'activity', 'perform', 'act', 'doing', 'effort'],
  detachment: ['detach', 'renounce', 'surrender', 'let go', 'abandon', 'free from', 'unattached', 'non-attachment'],
  suffering: ['suffer', 'pain', 'sorrow', 'grief', 'misery', 'affliction', 'distress', 'anguish'],
  purpose: ['purpose', 'meaning', 'destiny', 'calling', 'mission', 'goal', 'aim'],
  discipline: ['discipline', 'control', 'restrain', 'practice', 'austerity', 'tapas', 'self-control'],
  compassion: ['compassion', 'love', 'kindness', 'mercy', 'benevolence', 'care', 'tender'],
  self: ['self', 'atman', 'soul', 'spirit', 'ego', 'identity', 'consciousness', 'awareness'],
  impermanence: ['impermanent', 'transient', 'change', 'passing', 'mortal', 'decay', 'death', 'birth'],
  devotion: ['devot', 'worship', 'faith', 'surrender', 'bhakti', 'lord', 'divine', 'god'],
  knowledge: ['knowledge', 'wisdom', 'understand', 'know', 'jnana', 'truth', 'realize', 'insight'],
  meditation: ['meditat', 'contempl', 'focus', 'concentrate', 'dhyana', 'yoga', 'still', 'silent'],
  desire: ['desire', 'want', 'crave', 'lust', 'passion', 'attachment', 'longing'],
  peace: ['peace', 'calm', 'tranquil', 'serene', 'quiet', 'still', 'harmony'],
  duty: ['duty', 'dharma', 'obligation', 'righteous', 'virtue', 'moral'],
  truth: ['truth', 'real', 'eternal', 'absolute', 'ultimate', 'brahman'],
};

function detectTheme(text: string): ThemeTag {
  const lowerText = text.toLowerCase();
  let maxScore = 0;
  let bestTheme: ThemeTag = 'knowledge';
  
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        score += matches.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestTheme = theme as ThemeTag;
    }
  }
  
  return bestTheme;
}

function detectTone(text: string): ToneTag {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('o ') || lowerText.includes('thou') || lowerText.includes('thee')) {
    return 'poetic';
  }
  if (lowerText.includes('lord') || lowerText.includes('worship') || lowerText.includes('divine')) {
    return 'devotional';
  }
  if (lowerText.includes('therefore') || lowerText.includes('thus') || lowerText.includes('hence')) {
    return 'philosophical';
  }
  return 'direct';
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractGitaVerses(text: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];
  
  const gutenbergStart = text.indexOf('*** START OF');
  const gutenbergEnd = text.indexOf('*** END OF');
  if (gutenbergStart !== -1 && gutenbergEnd !== -1) {
    text = text.substring(gutenbergStart, gutenbergEnd);
  }
  
  const chapterPattern = /CHAPTER\s+([IVXLC]+)\s*\n([^\n]+)/gi;
  const sections = text.split(/CHAPTER\s+[IVXLC]+/i);
  
  let chapterNum = 0;
  for (const section of sections.slice(1)) {
    chapterNum++;
    const lines = section.split('\n').filter(l => l.trim().length > 30);
    
    let verseNum = 0;
    let currentVerse = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length < 20) continue;
      
      currentVerse += ' ' + trimmed;
      
      if (currentVerse.length > 200 || trimmed.endsWith('.') || trimmed.endsWith('!')) {
        if (currentVerse.trim().length > 50) {
          verseNum++;
          const content = cleanText(currentVerse);
          chunks.push({
            id: `gita_${chapterNum}_${verseNum}`,
            content,
            sourceRef: `Chapter ${chapterNum}, Verse ${verseNum}`,
            book: 'bhagavad-gita',
            theme: detectTheme(content),
            tone: detectTone(content),
            chapter: String(chapterNum),
            verseNum: String(verseNum),
          });
        }
        currentVerse = '';
      }
    }
  }
  
  return chunks;
}

function extractUpanishadVerses(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];
  
  const gutenbergStart = text.indexOf('*** START OF');
  const gutenbergEnd = text.indexOf('*** END OF');
  if (gutenbergStart !== -1) {
    const startIdx = text.indexOf('\n', gutenbergStart) + 1;
    text = gutenbergEnd !== -1 ? text.substring(startIdx, gutenbergEnd) : text.substring(startIdx);
  }
  
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');
  text = text.replace(/\[\d+\]/g, '');
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/Produced by.*?\n/gi, '');
  
  const paragraphs = text.split(/\n\s*\n/);
  let chunkNum = 0;
  let currentUpanishad = 'unknown';
  
  for (const para of paragraphs) {
    let cleaned = para.replace(/\s+/g, ' ').trim();
    
    const upanishadMatch = cleaned.match(/^(Isa|Katha|Kena|Mundaka|Mandukya|Prasna|Taittiriya|Aitareya|Chandogya|Brihadaranyaka|Svetasvatara|Maitri)/i);
    if (upanishadMatch) {
      currentUpanishad = upanishadMatch[1].toLowerCase();
      continue;
    }
    
    if (cleaned.match(/^(Contents|Introduction|Preface|Editor|PART|CHAPTER|BOOK|INDEX|Title|Translator|\*\*\*)/i)) {
      continue;
    }
    
    if (cleaned.length > 60 && cleaned.length < 2500) {
      const hasWisdomContent = cleaned.match(/soul|self|truth|brahman|atman|mind|consciousness|spirit|divine|eternal|knowledge|wisdom|meditat|peace|bliss|immortal|god|lord|being|existence|life|death|birth|world|universe/i);
      
      if (hasWisdomContent) {
        chunkNum++;
        chunks.push({
          id: `${bookId}_${chunkNum}`,
          content: cleaned,
          sourceRef: currentUpanishad !== 'unknown' ? `${currentUpanishad} Upanishad` : `Passage ${chunkNum}`,
          book: bookId,
          theme: detectTheme(cleaned),
          tone: detectTone(cleaned),
        });
      }
    }
  }
  
  return chunks;
}

function extractVedicHymns(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];
  
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');
  text = text.replace(/\[\d+\]/g, '');
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/Hymns of the Atharva Veda.*?\n/gi, '');
  
  const hymnMatches = text.split(/HYMN\s+[IVXLC]+/i);
  let hymnNum = 0;
  
  for (const hymnSection of hymnMatches.slice(1)) {
    const lines = hymnSection.split('\n');
    let currentVerse = '';
    let hymnTitle = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (!hymnTitle && trimmed.length > 10 && trimmed.length < 100 && !trimmed.match(/^\[/)) {
        hymnTitle = trimmed;
        continue;
      }
      
      if (trimmed.match(/^HYMN|^BOOK/i)) break;
      
      if (trimmed.length > 5 && !trimmed.match(/^\[/)) {
        currentVerse += ' ' + trimmed;
      }
      
      if (currentVerse.length > 150 && (trimmed.endsWith('.') || trimmed.endsWith('!'))) {
        const cleaned = cleanText(currentVerse);
        if (cleaned.length > 80 && cleaned.length < 1500) {
          hymnNum++;
          chunks.push({
            id: `${bookId}_hymn_${hymnNum}`,
            content: cleaned,
            sourceRef: hymnTitle ? `${hymnTitle}` : `Hymn ${hymnNum}`,
            book: bookId,
            theme: detectTheme(cleaned),
            tone: detectTone(cleaned),
          });
        }
        currentVerse = '';
      }
    }
  }
  
  return chunks;
}

/**
 * Extract passages from epic texts (Ramayana, Mahabharata)
 * These are narrative texts, so we extract meaningful paragraphs
 */
function extractEpicPassages(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];

  // Remove header info
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');

  // Split into sections by book markers or double newlines
  const sections = text.split(/={10,}|BOOK\s+\d+|CANTO\s+[IVXLC]+/i);

  let chunkNum = 0;
  let currentBook = '';
  let currentCanto = '';

  for (const section of sections) {
    // Try to detect book/canto markers
    const bookMatch = section.match(/^.*?Book\s+(\d+|[IVXLC]+)/i);
    const cantoMatch = section.match(/Canto\s+([IVXLC]+)[:\s]+([^\n]+)/i);

    if (bookMatch) currentBook = bookMatch[1];
    if (cantoMatch) currentCanto = cantoMatch[2]?.trim() || cantoMatch[1];

    // Split into paragraphs
    const paragraphs = section.split(/\n\s*\n/);

    for (const para of paragraphs) {
      let cleaned = para.replace(/\s+/g, ' ').trim();

      // Skip navigation, headers, short content
      if (cleaned.length < 100 || cleaned.length > 3000) continue;
      if (cleaned.match(/^(Contents|Index|Title|Chapter|BOOK|Introduction|Preface)/i)) continue;
      if (cleaned.match(/Next:|Previous:|Home|sacred-texts/i)) continue;

      // Check for wisdom content
      const hasWisdomContent = cleaned.match(/dharma|duty|soul|truth|virtue|wisdom|righteous|karma|fate|destiny|god|divine|sacrifice|devotion|honor|courage|peace|war|love|death|life|immortal|eternal|spirit|heart|mind|king|hero|warrior|sage|lord|heaven|earth/i);

      if (hasWisdomContent) {
        chunkNum++;
        const sourceRef = currentCanto
          ? `${currentBook ? `Book ${currentBook}, ` : ''}${currentCanto}`
          : `Passage ${chunkNum}`;

        chunks.push({
          id: `${bookId}_${chunkNum}`,
          content: cleaned,
          sourceRef,
          book: bookId,
          theme: detectTheme(cleaned),
          tone: detectTone(cleaned),
        });
      }
    }
  }

  return chunks;
}

/**
 * Extract passages from Purana texts (Vishnu Purana, Garuda Purana)
 */
function extractPuranaPassages(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];

  // Clean up text
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');
  text = text.replace(/\[\d+\]/g, '');

  const paragraphs = text.split(/\n\s*\n/);
  let chunkNum = 0;
  let currentChapter = '';

  for (const para of paragraphs) {
    let cleaned = para.replace(/\s+/g, ' ').trim();

    // Detect chapter markers
    const chapterMatch = cleaned.match(/CHAPTER\s+([IVXLC\d]+)/i);
    if (chapterMatch) {
      currentChapter = chapterMatch[1];
      continue;
    }

    // Skip navigation, headers
    if (cleaned.length < 80 || cleaned.length > 2500) continue;
    if (cleaned.match(/^(Contents|Index|Title|Footnote|Note:|BOOK|Part)/i)) continue;

    // Check for wisdom content
    const hasWisdomContent = cleaned.match(/vishnu|brahma|shiva|krishna|soul|atman|dharma|karma|moksha|liberation|divine|eternal|truth|wisdom|devotion|sacrifice|worship|meditation|yoga|god|lord|heaven|creation|universe|cosmic|spirit|immortal|rebirth|death|life/i);

    if (hasWisdomContent) {
      chunkNum++;
      chunks.push({
        id: `${bookId}_${chunkNum}`,
        content: cleaned,
        sourceRef: currentChapter ? `Chapter ${currentChapter}` : `Passage ${chunkNum}`,
        book: bookId,
        theme: detectTheme(cleaned),
        tone: detectTone(cleaned),
      });
    }
  }

  return chunks;
}

/**
 * Extract teachings from Gospel of Ramakrishna
 */
function extractRamakrishnaTeachings(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];

  // Clean up
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');

  const paragraphs = text.split(/\n\s*\n/);
  let chunkNum = 0;

  for (const para of paragraphs) {
    let cleaned = para.replace(/\s+/g, ' ').trim();

    if (cleaned.length < 60 || cleaned.length > 2000) continue;
    if (cleaned.match(/^(Contents|Index|Title|Chapter|PART)/i)) continue;

    // Ramakrishna's teachings often contain these keywords
    const hasTeachingContent = cleaned.match(/god|divine|brahman|maya|devotion|love|truth|wisdom|soul|spirit|mind|ego|liberation|bliss|consciousness|meditation|yoga|worship|pray|temple|holy|sacred|master|disciple|teach|learn|realize|knowledge|ignorance|attachment|desire|peace|joy|suffering/i);

    if (hasTeachingContent) {
      chunkNum++;
      chunks.push({
        id: `${bookId}_${chunkNum}`,
        content: cleaned,
        sourceRef: `Teaching ${chunkNum}`,
        book: bookId,
        theme: detectTheme(cleaned),
        tone: detectTone(cleaned),
      });
    }
  }

  return chunks;
}

/**
 * Generic wisdom text extractor for yoga and philosophy texts
 */
function extractWisdomText(text: string, bookId: string): WisdomChunk[] {
  const chunks: WisdomChunk[] = [];

  // Clean up
  text = text.replace(/at sacred-texts\.com/gi, '');
  text = text.replace(/\[p\.\s*[a-z0-9]+\]/gi, '');
  text = text.replace(/\[\d+\]/g, '');

  const paragraphs = text.split(/\n\s*\n/);
  let chunkNum = 0;

  for (const para of paragraphs) {
    let cleaned = para.replace(/\s+/g, ' ').trim();

    if (cleaned.length < 60 || cleaned.length > 2500) continue;
    if (cleaned.match(/^(Contents|Index|Title|Chapter|Footnote|Note:|Editor)/i)) continue;

    const hasWisdomContent = cleaned.match(/soul|self|truth|brahman|atman|mind|consciousness|spirit|divine|eternal|knowledge|wisdom|meditat|peace|bliss|immortal|god|lord|being|existence|life|death|birth|world|universe|yoga|liberation|moksha|dharma|karma|devotion|practice|discipline|breath|prana|chakra|kundalini|energy/i);

    if (hasWisdomContent) {
      chunkNum++;
      chunks.push({
        id: `${bookId}_${chunkNum}`,
        content: cleaned,
        sourceRef: `Passage ${chunkNum}`,
        book: bookId,
        theme: detectTheme(cleaned),
        tone: detectTone(cleaned),
      });
    }
  }

  return chunks;
}

function processAllTexts(): WisdomChunk[] {
  const allChunks: WisdomChunk[] = [];

  const textFiles = fs.readdirSync(RAW_TEXTS_DIR).filter(f => f.endsWith('.txt'));

  for (const file of textFiles) {
    const filePath = path.join(RAW_TEXTS_DIR, file);
    const text = fs.readFileSync(filePath, 'utf-8');
    const bookId = file.replace('.txt', '');

    console.log(`Processing ${file}...`);

    let chunks: WisdomChunk[];

    // Route to appropriate extractor based on text type
    if (bookId === 'bhagavad-gita') {
      chunks = extractGitaVerses(text);
    } else if (bookId.includes('upanishad') || bookId === 'yoga-sutras') {
      chunks = extractUpanishadVerses(text, bookId);
    } else if (bookId.includes('vedic') || bookId.includes('atharva')) {
      chunks = extractVedicHymns(text, bookId);
    } else if (bookId === 'ramayana' || bookId === 'mahabharata') {
      chunks = extractEpicPassages(text, bookId);
    } else if (bookId.includes('purana') || bookId === 'vishnu-purana' || bookId === 'garuda-purana') {
      chunks = extractPuranaPassages(text, bookId);
    } else if (bookId === 'gospel-ramakrishna') {
      chunks = extractRamakrishnaTeachings(text, bookId);
    } else if (bookId.includes('yoga') || bookId.includes('kundalini')) {
      chunks = extractWisdomText(text, bookId);
    } else {
      // Default to generic wisdom extractor
      chunks = extractWisdomText(text, bookId);
    }

    console.log(`  Extracted ${chunks.length} chunks from ${bookId}`);
    allChunks.push(...chunks);
  }

  return allChunks;
}

function createDatabase(chunks: WisdomChunk[]): void {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }
  
  const db = new Database(DB_PATH);
  
  db.exec(`
    CREATE TABLE chunks (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      source_ref TEXT NOT NULL,
      book TEXT NOT NULL,
      theme TEXT NOT NULL,
      tone TEXT NOT NULL,
      chapter TEXT,
      verse_num TEXT
    );
    
    CREATE VIRTUAL TABLE chunks_fts USING fts5(
      content,
      theme,
      content=chunks,
      content_rowid=rowid
    );
    
    CREATE TRIGGER chunks_ai AFTER INSERT ON chunks BEGIN
      INSERT INTO chunks_fts(rowid, content, theme) VALUES (NEW.rowid, NEW.content, NEW.theme);
    END;
    
    CREATE TRIGGER chunks_ad AFTER DELETE ON chunks BEGIN
      INSERT INTO chunks_fts(chunks_fts, rowid, content, theme) VALUES('delete', OLD.rowid, OLD.content, OLD.theme);
    END;
    
    CREATE TRIGGER chunks_au AFTER UPDATE ON chunks BEGIN
      INSERT INTO chunks_fts(chunks_fts, rowid, content, theme) VALUES('delete', OLD.rowid, OLD.content, OLD.theme);
      INSERT INTO chunks_fts(rowid, content, theme) VALUES (NEW.rowid, NEW.content, NEW.theme);
    END;
    
    CREATE INDEX idx_chunks_book ON chunks(book);
    CREATE INDEX idx_chunks_theme ON chunks(theme);
  `);
  
  const insert = db.prepare(`
    INSERT INTO chunks (id, content, source_ref, book, theme, tone, chapter, verse_num)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const insertMany = db.transaction((chunks: WisdomChunk[]) => {
    for (const chunk of chunks) {
      insert.run(
        chunk.id,
        chunk.content,
        chunk.sourceRef,
        chunk.book,
        chunk.theme,
        chunk.tone,
        chunk.chapter || null,
        chunk.verseNum || null
      );
    }
  });
  
  insertMany(chunks);
  db.close();
}

async function main(): Promise<void> {
  console.log('Sage Corpus Builder');
  console.log('===================\n');
  
  if (!fs.existsSync(RAW_TEXTS_DIR)) {
    console.error('Raw texts directory not found. Run download-sources.ts first.');
    process.exit(1);
  }
  
  console.log('Processing texts...\n');
  const chunks = processAllTexts();
  
  console.log(`\nTotal chunks extracted: ${chunks.length}`);
  
  const themeCounts: Record<string, number> = {};
  for (const chunk of chunks) {
    themeCounts[chunk.theme] = (themeCounts[chunk.theme] || 0) + 1;
  }
  
  console.log('\nTheme distribution:');
  for (const [theme, count] of Object.entries(themeCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${theme}: ${count}`);
  }
  
  console.log('\nCreating SQLite database...');
  createDatabase(chunks);
  
  const dbStats = fs.statSync(DB_PATH);
  console.log(`\nDatabase created: ${DB_PATH}`);
  console.log(`Database size: ${(dbStats.size / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
