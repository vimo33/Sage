import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../lib/ui/theme';
import { getTroubleshootingSteps, importModelFromUri, type ModelValidationResult } from '../lib/llm/model-validator';

interface ModelErrorScreenProps {
  validationResult: ModelValidationResult;
  onRetry: () => void;
  onContinueWithoutModel?: () => void;
  onModelImported?: () => void;
}

export function ModelErrorScreen({ validationResult, onRetry, onContinueWithoutModel, onModelImported }: ModelErrorScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleImportModel = async () => {
    try {
      setIsImporting(true);
      setImportError(null);

      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDir: true,
      });

      if (result.canceled) {
        setIsImporting(false);
        return;
      }

      const file = result.assets[0];
      if (!file.name.endsWith('.gguf')) {
        setImportError('Please select a .gguf model file');
        setIsImporting(false);
        return;
      }

      console.log('[Sage] Selected file:', file.uri);
      const importResult = await importModelFromUri(file.uri);

      if (importResult.status === 'valid') {
        onModelImported?.();
        onRetry();
      } else {
        setImportError(importResult.error || 'Failed to import model');
      }
    } catch (error) {
      console.error('[Sage] Import error:', error);
      setImportError(`Import failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsImporting(false);
    }
  };
  const colors = getThemedColors(isDark);

  const styles = createStyles(colors, isDark);

  const troubleshootingSteps = getTroubleshootingSteps(validationResult);

  const getStatusTitle = (): string => {
    switch (validationResult.status) {
      case 'missing':
        return 'Model Not Found';
      case 'corrupted':
        return 'Model Corrupted';
      case 'unknown':
        return 'Model Error';
      default:
        return 'Model Error';
    }
  };

  const getStatusDescription = (): string => {
    switch (validationResult.status) {
      case 'missing':
        return 'The AI model (869MB) is not yet downloaded. You can still use journaling and other features - AI responses will be unavailable until the model is installed.';
      case 'corrupted':
        return 'The AI model file appears to be damaged or incomplete. Please re-download the model file.';
      case 'unknown':
        return 'An unexpected error occurred while checking the AI model. Please try again or contact support if the issue persists.';
      default:
        return 'There was a problem with the AI model.';
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="model-error-screen">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.errorIcon}>!</Text>
        </View>

        {/* Title */}
        <Text style={styles.title} testID="model-error-title">
          {getStatusTitle()}
        </Text>

        {/* Description */}
        <Text style={styles.description} testID="model-error-description">
          {getStatusDescription()}
        </Text>

        {/* Technical Error Details */}
        {validationResult.error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorBoxTitle}>Technical Details</Text>
            <Text style={styles.errorBoxText} testID="model-error-details">
              {validationResult.error}
            </Text>
          </View>
        )}

        {/* Troubleshooting Steps */}
        <View style={styles.troubleshootingSection}>
          <Text style={styles.sectionTitle}>Troubleshooting Steps</Text>
          {troubleshootingSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText} testID={`troubleshooting-step-${index}`}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Additional Help */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>
            If the problem persists after trying these steps, please reach out for assistance.
          </Text>
          <TouchableOpacity
            style={styles.helpLink}
            onPress={() => Linking.openURL('https://github.com/anthropics/sage-ai/issues')}
            testID="report-issue-link"
          >
            <Text style={styles.helpLinkText}>Report an Issue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Import Error */}
      {importError && (
        <View style={styles.importErrorContainer}>
          <Text style={styles.importErrorText}>{importError}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {validationResult.status === 'missing' && (
          <TouchableOpacity
            style={styles.importButton}
            onPress={handleImportModel}
            disabled={isImporting}
            testID="import-button"
          >
            {isImporting ? (
              <ActivityIndicator color={COLORS.primaryText} />
            ) : (
              <Text style={styles.importButtonText}>Import Model from Files</Text>
            )}
          </TouchableOpacity>
        )}
        {onContinueWithoutModel && validationResult.status === 'missing' && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onContinueWithoutModel}
            testID="continue-button"
          >
            <Text style={styles.continueButtonText}>Continue Without AI</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.retryButton, validationResult.status === 'missing' && styles.retryButtonSecondary]}
          onPress={onRetry}
          disabled={isImporting}
          testID="retry-button"
        >
          <Text style={[styles.retryButtonText, validationResult.status === 'missing' && styles.retryButtonTextSecondary]}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: withAlpha(COLORS.danger, 0.15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.xxl,
  },
  errorIcon: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.danger,
  },
  title: {
    ...TYPOGRAPHY.styles.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.md,
  },
  errorBox: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.danger, 0.3),
  },
  errorBoxTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  errorBoxText: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  troubleshootingSection: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.styles.h4,
    color: colors.text,
    marginBottom: SPACING.lg,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  helpSection: {
    width: '100%',
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  helpText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  helpLink: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  helpLinkText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  importErrorContainer: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: withAlpha(COLORS.danger, 0.1),
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.danger, 0.3),
  },
  importErrorText: {
    fontSize: 14,
    color: COLORS.danger,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.md,
    ...SHADOWS.md,
  },
  importButton: {
    backgroundColor: COLORS.info,
    borderRadius: RADII.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  importButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  retryButtonTextSecondary: {
    color: colors.textSecondary,
  },
});
