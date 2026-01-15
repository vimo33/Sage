/**
 * Generate PNG images from SVG theme icons
 * Creates @1x, @2x, and @3x versions for React Native
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'assets', 'images', 'themes');

// Theme configurations with their base sizes
const themes = ['acceptance', 'purpose', 'stillness'];

// Generate images at multiple resolutions
async function generateImages() {
  for (const theme of themes) {
    const svgPath = path.join(THEMES_DIR, `${theme}.svg`);

    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${theme}: SVG not found`);
      continue;
    }

    const svgBuffer = fs.readFileSync(svgPath);

    // Generate @1x (160x160)
    await sharp(svgBuffer)
      .resize(160, 160)
      .png()
      .toFile(path.join(THEMES_DIR, `${theme}.png`));
    console.log(`Generated ${theme}.png (160x160)`);

    // Generate @2x (320x320)
    await sharp(svgBuffer)
      .resize(320, 320)
      .png()
      .toFile(path.join(THEMES_DIR, `${theme}@2x.png`));
    console.log(`Generated ${theme}@2x.png (320x320)`);

    // Generate @3x (480x480)
    await sharp(svgBuffer)
      .resize(480, 480)
      .png()
      .toFile(path.join(THEMES_DIR, `${theme}@3x.png`));
    console.log(`Generated ${theme}@3x.png (480x480)`);
  }

  console.log('\nAll theme images generated successfully!');
}

generateImages().catch(console.error);
