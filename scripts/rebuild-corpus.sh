#!/bin/bash

# Rebuild Wisdom Corpus Script
# This script downloads all texts and rebuilds the wisdom database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "============================================"
echo "Sage Wisdom Corpus Builder"
echo "============================================"
echo ""

# Check if better-sqlite3 is installed
if ! npm list better-sqlite3 >/dev/null 2>&1; then
  echo "Installing better-sqlite3 for database operations..."
  npm install --save-dev better-sqlite3 @types/better-sqlite3
fi

# Step 1: Download bulk text files (.txt.gz)
echo ""
echo "Step 1: Downloading bulk text sources..."
echo "----------------------------------------"
npx tsx scripts/download-sources.ts

# Step 2: Fetch epic texts (Ramayana, Mahabharata) - HTML scraping
echo ""
echo "Step 2: Fetching epic texts (Ramayana, Mahabharata)..."
echo "This may take 10-20 minutes due to rate limiting..."
echo "------------------------------------------------------"
npx tsx scripts/fetch-epics.ts

# Step 3: Build the SQLite database
echo ""
echo "Step 3: Building wisdom database..."
echo "-----------------------------------"
npx tsx scripts/build-corpus.ts

# Step 4: Copy to Android assets
echo ""
echo "Step 4: Copying to Android assets..."
echo "------------------------------------"
ANDROID_ASSETS="android/app/src/main/assets"
if [ -d "$ANDROID_ASSETS" ]; then
  cp assets/data/wisdom.db "$ANDROID_ASSETS/"
  echo "Copied wisdom.db to $ANDROID_ASSETS/"
else
  echo "Android assets directory not found, skipping..."
fi

echo ""
echo "============================================"
echo "Corpus rebuild complete!"
echo "============================================"
echo ""
echo "Database location: assets/data/wisdom.db"
echo ""
echo "Next steps:"
echo "  1. Run 'npx expo prebuild --clean' to update native projects"
echo "  2. Rebuild your iOS/Android app"
echo ""
