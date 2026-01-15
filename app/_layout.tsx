import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSageStore } from '../lib/storage/store';
import { ModelErrorScreen } from '../components/ModelErrorScreen';
import { OfflineIndicator } from '../components/OfflineIndicator';
import type { ModelValidationResult } from '../lib/llm/model-validator';
import {
  initializeQuickActions,
  handleQuickAction,
  getInitialQuickAction,
  subscribeToQuickActions,
} from '../lib/quick-actions';
import { initWidgetService } from '../lib/widget';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const initializeApp = useSageStore((state) => state.initialize);
  const validateAndLoadModel = useSageStore((state) => state.validateAndLoadModel);
  const isInitialized = useSageStore((state) => state.isInitialized);
  const modelValidationStatus = useSageStore((state) => state.modelValidationStatus);
  const hasCompletedOnboarding = useSageStore(
    (state) => state.preferences.hasCompletedOnboarding
  );

  const [isValidatingModel, setIsValidatingModel] = useState(true);
  const [validationResult, setValidationResult] = useState<ModelValidationResult | null>(null);
  const [skipModelCheck, setSkipModelCheck] = useState(false);
  const pendingQuickActionRef = useRef<(() => void) | null>(null);

  const runModelValidation = useCallback(async () => {
    setIsValidatingModel(true);
    try {
      console.log('[Sage] Running model validation...');
      const result = await validateAndLoadModel();
      setValidationResult(result);
    } catch (e) {
      console.error('[Sage] Model validation error:', e);
      setValidationResult({
        status: 'unknown',
        error: `Validation error: ${e instanceof Error ? e.message : String(e)}`,
      });
    } finally {
      setIsValidatingModel(false);
    }
  }, [validateAndLoadModel]);

  useEffect(() => {
    const runInit = async () => {
      try {
        console.log('[Sage] Initializing store...');
        await initializeApp();
        console.log('[Sage] Store initialized.');

        // After store is initialized, validate the model
        console.log('[Sage] About to run model validation...');
        try {
          await runModelValidation();
          console.log('[Sage] Model validation completed.');
        } catch (modelError) {
          console.error('[Sage] Model validation error:', modelError);
          // Continue even if model validation fails - show error screen
          setValidationResult({
            status: 'unknown',
            error: `Model validation crashed: ${modelError instanceof Error ? modelError.message : String(modelError)}`,
          });
          setIsValidatingModel(false);
          return; // Don't proceed with other initializations if model fails
        }

        // Initialize quick actions after app is ready
        console.log('[Sage] Initializing quick actions...');
        try {
          await initializeQuickActions();
        } catch (qaError) {
          console.error('[Sage] Quick actions error:', qaError);
          // Non-fatal, continue
        }

        // Initialize Android widget service
        console.log('[Sage] Initializing widget service...');
        try {
          await initWidgetService();
        } catch (widgetError) {
          console.error('[Sage] Widget service error:', widgetError);
          // Non-fatal, continue
        }

        // Check if app was launched from a quick action
        const initialAction = getInitialQuickAction();
        if (initialAction) {
          // Store the action to be handled after navigation is ready
          pendingQuickActionRef.current = () => handleQuickAction(initialAction);
        }
      } catch (e) {
        console.error('[Sage] Initialization failed:', e);
        setValidationResult({
          status: 'unknown',
          error: `App initialization failed: ${e instanceof Error ? e.message : String(e)}\n\nStack: ${e instanceof Error ? e.stack : 'No stack'}`,
        });
        setIsValidatingModel(false);
      }
    };
    void runInit();
  }, [initializeApp, runModelValidation]);

  // Subscribe to quick actions while app is running
  useEffect(() => {
    const unsubscribe = subscribeToQuickActions((action) => {
      // Only handle if app is fully ready
      if (isInitialized && !isValidatingModel && modelValidationStatus === 'valid') {
        handleQuickAction(action);
      } else {
        // Store for later if app isn't ready
        pendingQuickActionRef.current = () => handleQuickAction(action);
      }
    });
    return unsubscribe;
  }, [isInitialized, isValidatingModel, modelValidationStatus]);

  // Handle pending quick actions once app is ready
  useEffect(() => {
    if (
      isInitialized &&
      !isValidatingModel &&
      modelValidationStatus === 'valid' &&
      hasCompletedOnboarding &&
      pendingQuickActionRef.current
    ) {
      // Small delay to ensure navigation is ready
      const timeout = setTimeout(() => {
        pendingQuickActionRef.current?.();
        pendingQuickActionRef.current = null;
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isInitialized, isValidatingModel, modelValidationStatus, hasCompletedOnboarding]);

  useEffect(() => {
    // Don't navigate until model validation is complete
    // Allow navigation if model check is skipped or model is valid
    console.log('[Sage] Navigation effect - isInitialized:', isInitialized, ', isValidatingModel:', isValidatingModel, ', hasCompletedOnboarding:', hasCompletedOnboarding, ', modelValidationStatus:', modelValidationStatus);

    if (!isInitialized || isValidatingModel) {
      console.log('[Sage] Navigation blocked - waiting for init/validation');
      return;
    }
    if (modelValidationStatus !== 'valid' && !skipModelCheck) {
      console.log('[Sage] Navigation blocked - model not valid and not skipped');
      return;
    }

    const inOnboarding = segments[0] === 'onboarding';
    console.log('[Sage] Navigation check - inOnboarding:', inOnboarding, ', hasCompletedOnboarding:', hasCompletedOnboarding);

    if (!hasCompletedOnboarding && !inOnboarding) {
      console.log('[Sage] Navigating to onboarding (hasCompletedOnboarding is false)');
      setTimeout(() => router.replace('/onboarding'), 0);
      return;
    }

    if (hasCompletedOnboarding && inOnboarding) {
      console.log('[Sage] Navigating away from onboarding (already completed)');
      setTimeout(() => router.replace('/(tabs)'), 0);
    }
  }, [hasCompletedOnboarding, isInitialized, isValidatingModel, modelValidationStatus, skipModelCheck, router, segments]);

  // Show loading screen while initializing
  if (!isInitialized || isValidatingModel) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🌿</Text>
          <Text style={styles.loadingText}>Loading Sage...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Show model error screen if validation failed (unless user chose to skip)
  if (validationResult && validationResult.status !== 'valid' && !skipModelCheck) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <ModelErrorScreen
          validationResult={validationResult}
          onRetry={runModelValidation}
          onContinueWithoutModel={() => setSkipModelCheck(true)}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootLayoutContent />
    </SafeAreaProvider>
  );
}

function RootLayoutContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.indicatorWrapper, { paddingTop: insets.top }]}>
        <OfflineIndicator />
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#132210' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="tone-selection"
          options={{ headerShown: false, presentation: 'card' }}
        />
        <Stack.Screen
          name="narration-settings"
          options={{ headerShown: false, presentation: 'card' }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132210',
  },
  indicatorWrapper: {
    backgroundColor: '#132210',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#132210',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});
