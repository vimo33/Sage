/**
 * Fetch Ramayana and Mahabharata from sacred-texts.com
 * These texts don't have bulk .txt.gz downloads, so we scrape HTML pages
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_TEXTS_DIR = path.join(__dirname, '..', 'assets', 'data', 'raw');

interface EpicConfig {
  id: string;
  name: string;
  baseUrl: string;
  pages: { start: number; end: number; prefix: string }[];
}

const EPICS: EpicConfig[] = [
  {
    id: 'ramayana',
    name: 'Ramayana (Ralph Griffith)',
    baseUrl: 'https://sacred-texts.com/hin/rama/',
    // ry000.htm to ry501.htm (plus index pages)
    pages: [{ start: 1, end: 501, prefix: 'ry' }],
  },
  {
    id: 'mahabharata',
    name: 'Mahabharata (Kisari Mohan Ganguli)',
    baseUrl: 'https://sacred-texts.com/hin/',
    // 18 books: m01, m02, ... m18
    // Each book has many sections
    pages: [
      { start: 1, end: 237, prefix: 'm01/m01' },   // Book 1: Adi Parva
      { start: 1, end: 81, prefix: 'm02/m02' },    // Book 2: Sabha Parva
      { start: 1, end: 313, prefix: 'm03/m03' },   // Book 3: Vana Parva
      { start: 1, end: 72, prefix: 'm04/m04' },    // Book 4: Virata Parva
      { start: 1, end: 199, prefix: 'm05/m05' },   // Book 5: Udyoga Parva
      { start: 1, end: 124, prefix: 'm06/m06' },   // Book 6: Bhishma Parva
      { start: 1, end: 203, prefix: 'm07/m07' },   // Book 7: Drona Parva
      { start: 1, end: 96, prefix: 'm08/m08' },    // Book 8: Karna Parva
      { start: 1, end: 65, prefix: 'm09/m09' },    // Book 9: Shalya Parva
      { start: 1, end: 18, prefix: 'm10/m10' },    // Book 10: Sauptika Parva
      { start: 1, end: 27, prefix: 'm11/m11' },    // Book 11: Stri Parva
      { start: 1, end: 365, prefix: 'm12/m12' },   // Book 12: Santi Parva
      { start: 1, end: 168, prefix: 'm13/m13' },   // Book 13: Anusasana Parva
      { start: 1, end: 118, prefix: 'm14/m14' },   // Book 14: Aswamedhika Parva
      { start: 1, end: 47, prefix: 'm15/m15' },    // Book 15: Asramavasika Parva
      { start: 1, end: 9, prefix: 'm16/m16' },     // Book 16: Mausala Parva
      { start: 1, end: 3, prefix: 'm17/m17' },     // Book 17: Mahaprasthanika Parva
      { start: 1, end: 6, prefix: 'm18/m18' },     // Book 18: Svargarohanika Parva
    ],
  },
];

// Rate limiting to be respectful to the server
// 500ms delay between requests to avoid 429 errors
const DELAY_MS = 500;
const RETRY_DELAY_MS = 5000; // Wait 5 seconds on rate limit
const MAX_RETRIES = 3;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function fetchPageOnce(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          fetchPageOnce(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode === 429) {
        reject(new Error(`RATE_LIMITED`));
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchPage(url: string): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetchPageOnce(url);
    } catch (error) {
      if (error instanceof Error && error.message === 'RATE_LIMITED') {
        if (attempt < MAX_RETRIES) {
          console.log(`    [RATE LIMITED] Waiting ${RETRY_DELAY_MS / 1000}s before retry ${attempt + 1}/${MAX_RETRIES}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

function stripHtml(html: string): string {
  // Remove script and style tags completely
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove navigation and header content
  html = html.replace(/<div class="nav">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Convert common HTML entities
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/&amp;/g, '&');
  html = html.replace(/&lt;/g, '<');
  html = html.replace(/&gt;/g, '>');
  html = html.replace(/&quot;/g, '"');
  html = html.replace(/&#39;/g, "'");
  html = html.replace(/&mdash;/g, '—');
  html = html.replace(/&ndash;/g, '–');
  html = html.replace(/&rsquo;/g, "'");
  html = html.replace(/&lsquo;/g, "'");
  html = html.replace(/&rdquo;/g, '"');
  html = html.replace(/&ldquo;/g, '"');

  // Replace paragraph and line breaks with newlines
  html = html.replace(/<br\s*\/?>/gi, '\n');
  html = html.replace(/<\/p>/gi, '\n\n');
  html = html.replace(/<p[^>]*>/gi, '');

  // Remove all other tags
  html = html.replace(/<[^>]+>/g, '');

  // Clean up whitespace
  html = html.replace(/\r\n/g, '\n');
  html = html.replace(/[ \t]+/g, ' ');
  html = html.replace(/\n[ \t]+/g, '\n');
  html = html.replace(/[ \t]+\n/g, '\n');
  html = html.replace(/\n{3,}/g, '\n\n');

  return html.trim();
}

async function fetchEpic(config: EpicConfig): Promise<void> {
  const outputPath = path.join(RAW_TEXTS_DIR, `${config.id}.txt`);

  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size > 100000) { // Skip if file exists and is > 100KB
      console.log(`  [SKIP] ${config.name} already exists (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      return;
    }
  }

  console.log(`  [FETCH] ${config.name}...`);

  let fullText = `${config.name}\n${'='.repeat(config.name.length)}\n\n`;
  let totalPages = 0;
  let successPages = 0;

  for (const pageRange of config.pages) {
    const bookMatch = pageRange.prefix.match(/m(\d+)/);
    const bookNum = bookMatch ? parseInt(bookMatch[1]) : null;

    if (bookNum) {
      fullText += `\n\n${'='.repeat(60)}\nBOOK ${bookNum}\n${'='.repeat(60)}\n\n`;
    }

    for (let i = pageRange.start; i <= pageRange.end; i++) {
      totalPages++;
      const pageNum = i.toString().padStart(3, '0');
      const url = `${config.baseUrl}${pageRange.prefix}${pageNum}.htm`;

      try {
        const html = await fetchPage(url);
        const text = stripHtml(html);

        if (text.length > 100) {
          fullText += text + '\n\n';
          successPages++;
        }

        // Progress indicator
        if (successPages % 50 === 0) {
          console.log(`    ... fetched ${successPages} pages`);
        }

        await sleep(DELAY_MS);
      } catch (error) {
        // Skip 404s silently (some page numbers don't exist)
        if (!(error instanceof Error && error.message.includes('404'))) {
          console.warn(`    [WARN] Failed to fetch ${url}: ${error}`);
        }
      }
    }
  }

  fs.writeFileSync(outputPath, fullText);
  const stats = fs.statSync(outputPath);
  console.log(`  [DONE] ${config.name}: ${successPages}/${totalPages} pages, ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

async function main(): Promise<void> {
  console.log('Sage Epic Texts Fetcher');
  console.log('=======================\n');
  console.log('Fetching Ramayana and Mahabharata from sacred-texts.com');
  console.log('(This may take several minutes due to rate limiting)\n');

  if (!fs.existsSync(RAW_TEXTS_DIR)) {
    fs.mkdirSync(RAW_TEXTS_DIR, { recursive: true });
  }

  for (const epic of EPICS) {
    try {
      await fetchEpic(epic);
    } catch (error) {
      console.error(`  [ERROR] Failed to fetch ${epic.name}:`, error);
    }
  }

  console.log('\nEpic texts fetch complete!');
}

main().catch(console.error);
