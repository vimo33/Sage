import { useEffect, useState, useCallback, type ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useSageStore } from '../../lib/storage/store';
import { getBiometricTypeName } from '../../lib/auth/biometric';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors } from '../../lib/ui/theme';

interface BiometricGateProps {
  children: ReactNode;
}

export function BiometricGate({ children }: BiometricGateProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const biometricSupport = useSageStore((s) => s.biometricSupport);
  const requiresAuthentication = useSageStore((s) => s.requiresAuthentication);
  const authenticateUser = useSageStore((s) => s.authenticateUser);
  const initBiometricSupport = useSageStore((s) => s.initBiometricSupport);

  const styles = createStyles(colors, isDark);

  // Initialize biometric support check on mount
  useEffect(() => {
    if (!biometricSupport) {
      void initBiometricSupport();
    }
  }, [biometricSupport, initBiometricSupport]);

  const handleAuthenticate = useCallback(async () => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const success = await authenticateUser();
      if (!success) {
        setAuthError('Authentication failed. Please try again.');
      }
    } catch {
      setAuthError('An error occurred. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  }, [authenticateUser]);

  // Auto-authenticate on mount when required
  useEffect(() => {
    if (requiresAuthentication() && biometricSupport && !isAuthenticating) {
      void handleAuthenticate();
    }
  }, [biometricSupport, requiresAuthentication, handleAuthenticate, isAuthenticating]);

  // If authentication is not required, render children directly
  if (!requiresAuthentication()) {
    return <>{children}</>;
  }

  // Show authentication screen
  const biometricName = biometricSupport?.biometricType
    ? getBiometricTypeName(biometricSupport.biometricType)
    : 'Biometric';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.lockIcon}>
            {biometricSupport?.biometricType === 'facial' ? '🔐' : '👆'}
          </Text>
        </View>

        <Text style={styles.title}>Authentication Required</Text>
        <Text style={styles.subtitle}>
          Use {biometricName} to access your private content
        </Text>

        {authError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{authError}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.authButton, isAuthenticating && styles.authButtonDisabled]}
          onPress={handleAuthenticate}
          disabled={isAuthenticating}
          testID="biometric-authenticate-button"
        >
          {isAuthenticating ? (
            <ActivityIndicator color={COLORS.primaryText} />
          ) : (
            <Text style={styles.authButtonText}>Authenticate with {biometricName}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
    },
    content: {
      alignItems: 'center',
      maxWidth: 320,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.xxl,
      ...SHADOWS.md,
    },
    lockIcon: {
      fontSize: 32,
      color: COLORS.primary,
    },
    title: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: SPACING.sm,
    },
    subtitle: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xxl,
    },
    errorContainer: {
      backgroundColor: `${COLORS.danger}20`,
      padding: SPACING.md,
      borderRadius: RADII.sm,
      marginBottom: SPACING.lg,
      width: '100%',
    },
    errorText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.danger,
      textAlign: 'center',
    },
    authButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.xxl,
      paddingVertical: SPACING.lg,
      borderRadius: RADII.lg,
      minWidth: 200,
      alignItems: 'center',
      ...SHADOWS.primary,
    },
    authButtonDisabled: {
      opacity: 0.7,
    },
    authButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
    },
  });
