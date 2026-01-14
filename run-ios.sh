#!/bin/bash

# Sage AI - iOS Run Script
# This script helps run the iOS app with proper environment setup

set -e

echo "🚀 Starting Sage AI iOS Build..."
echo ""

# Set UTF-8 encoding for CocoaPods
export LANG=en_US.UTF-8

# Clean build artifacts
echo "📦 Cleaning build artifacts..."
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ios/build

# Install pods
echo "📱 Installing CocoaPods dependencies..."
cd ios && pod install && cd ..

# List available simulators
echo ""
echo "📋 Available iOS Simulators:"
xcrun simctl list devices available | grep "iPhone\|iPad" | grep -v "unavailable"

echo ""
echo "🏗️  Building and running on iPhone 17 simulator..."
echo ""

# Run the app
npm run ios -- --device "iPhone 17"
