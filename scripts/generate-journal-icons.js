/**
 * Generate PNG images from SVG journal mood/type icons
 * Creates @1x, @2x, and @3x versions for React Native
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const JOURNAL_DIR = path.join(__dirname, '..', 'assets', 'images', 'journal');

// Journal icon names
const icons = ['morning-sun', 'night-moon', 'lightning-bolt', 'heavy-cloud'];

// Generate images at multiple resolutions
async function generateImages() {
  for (const icon of icons) {
    const svgPath = path.join(JOURNAL_DIR, `${icon}.svg`);

    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${icon}: SVG not found`);
      continue;
    }

    const svgBuffer = fs.readFileSync(svgPath);

    // Generate @1x (160x160)
    await sharp(svgBuffer)
      .resize(160, 160)
      .png()
      .toFile(path.join(JOURNAL_DIR, `${icon}.png`));
    console.log(`Generated ${icon}.png (160x160)`);

    // Generate @2x (320x320)
    await sharp(svgBuffer)
      .resize(320, 320)
      .png()
      .toFile(path.join(JOURNAL_DIR, `${icon}@2x.png`));
    console.log(`Generated ${icon}@2x.png (320x320)`);

    // Generate @3x (480x480)
    await sharp(svgBuffer)
      .resize(480, 480)
      .png()
      .toFile(path.join(JOURNAL_DIR, `${icon}@3x.png`));
    console.log(`Generated ${icon}@3x.png (480x480)`);
  }

  console.log('\nAll journal icons generated successfully!');
}

generateImages().catch(console.error);
