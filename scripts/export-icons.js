const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

// Icon configurations
// React Native uses @2x and @3x suffixes for higher resolution images
// The base filename (no suffix) is used for 1x resolution
const icons = [
  {
    name: 'sage-leaf',
    svg: path.join(assetsDir, 'sage-leaf.svg'),
    sizes: [
      { scale: '', size: 64 },      // 1x (base)
      { scale: '@2x', size: 128 },  // 2x
      { scale: '@3x', size: 192 },  // 3x
    ],
  },
  {
    name: 'sage-app-icon',
    svg: path.join(assetsDir, 'sage-app-icon.svg'),
    sizes: [
      { scale: '', size: 80 },      // 1x (base)
      { scale: '@2x', size: 160 },  // 2x
      { scale: '@3x', size: 240 },  // 3x
    ],
  },
];

async function exportIcons() {
  for (const icon of icons) {
    console.log(`Processing ${icon.name}...`);
    const svgBuffer = fs.readFileSync(icon.svg);

    for (const sizeConfig of icon.sizes) {
      const outputPath = path.join(assetsDir, `${icon.name}${sizeConfig.scale}.png`);

      await sharp(svgBuffer)
        .resize(sizeConfig.size, sizeConfig.size)
        .png()
        .toFile(outputPath);

      const displayName = sizeConfig.scale || '(1x base)';
      console.log(`  Created: ${icon.name}${sizeConfig.scale}.png (${sizeConfig.size}x${sizeConfig.size}) ${displayName}`);
    }
  }
  console.log('Done!');
}

exportIcons().catch(console.error);
