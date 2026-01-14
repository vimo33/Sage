# Android Setup Guide for Sage AI

## Prerequisites
1. Install Android Studio: https://developer.android.com/studio
2. Install Java Development Kit (JDK 17)

## Setup Steps

### 1. Install Android Studio
```bash
# Download from: https://developer.android.com/studio
# After installation, open Android Studio
```

### 2. Configure Android SDK
In Android Studio:
- Open Settings (⌘,)
- Go to: Appearance & Behavior → System Settings → Android SDK
- Check these items to install:
  - ✅ Android 13.0 (Tiramisu) - API Level 33
  - ✅ Android SDK Build-Tools
  - ✅ Android SDK Platform-Tools
  - ✅ Android Emulator

### 3. Setup Android Emulator
```bash
# In Android Studio:
# 1. Tools → Device Manager
# 2. Click "Create Virtual Device"
# 3. Choose "Pixel 6" or "Pixel 7"
# 4. Download system image: API 33 (Android 13)
# 5. Finish setup and start emulator
```

### 4. OR Use Physical Android Device
```bash
# On your Android phone:
# 1. Settings → About Phone → Tap "Build Number" 7 times
# 2. Settings → Developer Options → Enable "USB Debugging"
# 3. Connect phone via USB
# 4. Accept "Allow USB Debugging" prompt on phone

# Verify connection:
adb devices
# Should show your device
```

### 5. Build and Run Sage AI
```bash
cd /Users/vimo/Projects/OpenCode/Sage_AI

# First time build (takes 5-10 minutes)
npx expo run:android

# The app will:
# ✅ Build for Android
# ✅ Install on device/emulator
# ✅ Load the 462MB LLM model
# ✅ Enable full AI chat functionality
```

### 6. Test LLM Functionality
Once running:
1. Tap "Ask Sage" button
2. Type: "How can I find inner peace?"
3. Wait 5-10 seconds for first response (model initialization)
4. You should get a real LLM response with:
   - Guidance section
   - Reflection questions
   - Practice suggestion
   - Citations from wisdom texts

## Troubleshooting

### "adb: command not found"
```bash
# Add Android SDK to PATH:
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

### Build fails with "SDK not found"
```bash
# Set ANDROID_HOME manually:
export ANDROID_HOME=$HOME/Library/Android/sdk
npx expo run:android
```

### Emulator is slow
- Increase emulator RAM in Device Manager
- Or use physical Android device for better performance
