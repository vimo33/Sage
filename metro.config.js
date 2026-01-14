const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add db as asset extension so it can be bundled
config.resolver.assetExts.push('db');

// Exclude only the models directory from Metro bundling
// Models are too large (800MB+) and loaded from device filesystem at runtime
config.resolver.blockList = [
  /assets\/models\/.*/,
];

// Configure asset scales to prevent bundling large files
// This ensures large GGUF files are copied as raw assets instead of being inlined
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
  // Disable asset inlining for large files
  assetPlugins: [],
};

module.exports = config;
