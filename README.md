<img src="./.github/assets/icon.png" alt="Voice Assistant App Icon" width="100" height="100">

# React-Native Voice Assistant

A voice assistant application built with [LiveKit Agents](https://docs.livekit.io/agents/overview/) that provides a simple voice interface using the [LiveKit React-Native SDK](https://github.com/livekit/client-sdk-react-native) and [Expo Plugin](https://github.com/livekit/client-sdk-react-native-expo-plugin).

## Getting started

The easiest way to get this app running is with the [Sandbox for LiveKit Cloud](https://cloud.livekit.io/projects/p_/sandbox) and the [LiveKit CLI](https://docs.livekit.io/home/cli/cli-setup/).

First, create a new [Sandbox Token Server](https://cloud.livekit.io/projects/p_mytc7vpzfkt/sandbox/templates/token-server) for your LiveKit Cloud project.

### Prerequisites

- Node.js (v16 or later)
- Android Studio (for Android development) / just Android Emulator
- Xcode (for iOS development, macOS only)
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd handii-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your LiveKit credentials to `.env.local`

4. Run the application:
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

### Configuration

Edit the `hooks/useConnectionDetails.ts` file to configure your LiveKit connection details. You can use either:
- A `sandboxID` (if using a [Sandbox Token Server](https://cloud.livekit.io/projects/p_/sandbox/templates/token-server))
- A manually generated URL and token

## Troubleshooting

### Android Emulator Issues

If you encounter connection errors when running `npx expo run:android`, such as:
```
Error: could not connect to TCP port 5554: cannot connect to 127.0.0.1:5554
```

This typically means the Android emulator is not running. Follow these steps to resolve:

1. **Check available emulators:**
   ```bash
   emulator -list-avds
   ```

2. **Start the emulator manually:**
   ```bash
   # Replace 'Pixel_API_30' with your emulator name from step 1
   emulator -avd Pixel_API_30
   ```
   
   Or run in background:
   ```bash
   start /b emulator -avd Pixel_API_30 -no-snapshot-load
   ```

3. **Verify emulator connection:**
   ```bash
   adb devices
   ```
   You should see your emulator listed (e.g., `emulator-5554 device`)

4. **If ADB connection issues persist:**
   ```bash
   adb kill-server
   adb start-server
   adb devices
   ```

5. **Now try running the app again:**
   ```bash
   npx expo run:android
   ```

> [!TIP]
> Make sure you have Android Studio installed with the Android SDK and emulator properly configured. The emulator needs to be fully booted (showing the Android home screen) before running the Expo command.

## Production Deployment

In a production environment, you will need to:

1. **Token Generation**: Implement a secure solution to [generate tokens for your users](https://docs.livekit.io/home/server/generating-tokens/) integrated with your authentication system.

2. **Environment Configuration**:
   - Disable sandbox token server
   - Update `hooks/useConnectionDetails.ts` to use your production token server
   - Configure proper environment variables for production

3. **Android Release**:
   - Generate a release keystore (do not commit to version control)
   - Update `android/app/build.gradle` with release signing configuration
   - Build signed APK/AAB for Google Play Store

## Package Information

- **Package Name**: `io.livekit.voiceassistantreactnative`
- **Version**: 1.0.0

## Contributing

We welcome contributions! Please open a PR or issue through GitHub.
