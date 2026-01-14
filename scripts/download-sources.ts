import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import * as zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_TEXTS_DIR = path.join(__dirname, '..', 'assets', 'data', 'raw');

interface TextSource {
  id: string;
  name: string;
  url: string;
  type: 'gutenberg' | 'ista';
  format: 'txt' | 'htm' | 'gz';
}

const SOURCES: TextSource[] = [
  // === EXISTING SOURCES ===
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita (Edwin Arnold)',
    url: 'https://www.gutenberg.org/cache/epub/2388/pg2388.txt',
    type: 'gutenberg',
    format: 'txt',
  },
  {
    id: 'upanishads',
    name: 'The Upanishads (Swami Paramananda)',
    url: 'https://www.gutenberg.org/cache/epub/3283/pg3283.txt',
    type: 'gutenberg',
    format: 'txt',
  },
  {
    id: 'yoga-sutras',
    name: 'Yoga Sutras of Patanjali',
    url: 'https://www.gutenberg.org/cache/epub/2526/pg2526.txt',
    type: 'gutenberg',
    format: 'txt',
  },
  {
    id: 'vedic-hymns-1',
    name: 'Vedic Hymns Part I (SBE32) - Hymns to Maruts, Rudra',
    url: 'https://sacred-texts.com/hin/sbe32/sbe32.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'vedic-hymns-2',
    name: 'Vedic Hymns Part II (SBE46) - Hymns to Agni',
    url: 'https://sacred-texts.com/hin/sbe46/sbe46.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'atharva-veda',
    name: 'Atharva Veda',
    url: 'https://sacred-texts.com/hin/av/av.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'upanishads-sbe01',
    name: 'Upanishads Part 1 (SBE01) - Max Muller',
    url: 'https://sacred-texts.com/hin/sbe01/sbe01.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'upanishads-sbe15',
    name: 'Upanishads Part 2 (SBE15) - Max Muller',
    url: 'https://sacred-texts.com/hin/sbe15/sbe15.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'thirty-upanishads',
    name: 'Thirty Minor Upanishads',
    url: 'https://sacred-texts.com/hin/tmu/tmu.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'songs-of-kabir',
    name: 'Songs of Kabir',
    url: 'https://sacred-texts.com/hin/sok/sok.txt.gz',
    type: 'ista',
    format: 'gz',
  },

  // === NEW SOURCES (Priority 1) ===
  {
    id: 'vishnu-purana',
    name: 'Vishnu Purana',
    url: 'https://sacred-texts.com/hin/vp/vp.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'gospel-ramakrishna',
    name: 'The Gospel of Ramakrishna',
    url: 'https://sacred-texts.com/hin/gork/gork.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'garuda-purana',
    name: 'The Garuda Purana',
    url: 'https://sacred-texts.com/hin/gpu/gpu.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'yoga-vashisht',
    name: 'Yoga Vashisht (Laghu Yoga Vashishta)',
    url: 'https://sacred-texts.com/hin/yvhf/yvhf.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'kundalini-yoga',
    name: 'Kundalini - The Mother of the Universe',
    url: 'https://sacred-texts.com/hin/kmu/kmu.txt.gz',
    type: 'ista',
    format: 'gz',
  },
  {
    id: 'hindu-mythology',
    name: 'Hindu Mythology, Vedic and Puranic',
    url: 'https://sacred-texts.com/hin/hmvp/hmvp.txt.gz',
    type: 'ista',
    format: 'gz',
  },
];

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(dest);
          downloadFile(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadSource(source: TextSource): Promise<void> {
  const outputPath = path.join(RAW_TEXTS_DIR, `${source.id}.txt`);
  
  if (fs.existsSync(outputPath)) {
    console.log(`  [SKIP] ${source.name} already exists`);
    return;
  }
  
  console.log(`  [DOWNLOAD] ${source.name}...`);
  
  const tempPath = path.join(RAW_TEXTS_DIR, `${source.id}.temp`);
  await downloadFile(source.url, tempPath);
  
  if (source.format === 'gz') {
    const compressed = fs.readFileSync(tempPath);
    const decompressed = zlib.gunzipSync(compressed);
    fs.writeFileSync(outputPath, decompressed);
    fs.unlinkSync(tempPath);
  } else {
    fs.renameSync(tempPath, outputPath);
  }
  
  console.log(`  [DONE] ${source.name}`);
}

async function main(): Promise<void> {
  console.log('Sage Corpus Downloader');
  console.log('======================\n');
  
  ensureDir(RAW_TEXTS_DIR);
  
  console.log('Downloading public domain texts from Project Gutenberg...\n');
  
  for (const source of SOURCES) {
    try {
      await downloadSource(source);
    } catch (error) {
      console.error(`  [ERROR] Failed to download ${source.name}:`, error);
    }
  }
  
  console.log('\nDownload complete!');
  console.log(`Raw texts saved to: ${RAW_TEXTS_DIR}`);
}

main().catch(console.error);
