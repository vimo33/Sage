/**
 * AboutModal Component
 *
 * Displays information about the Sage app including:
 * - Centered Sage leaf logo
 * - "About Sage" heading
 * - App description paragraph
 * - Terms of Service link
 * - Privacy Policy link
 * - Version number
 */

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Linking,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

// App constants
const APP_VERSION = '1.0.0';
const TERMS_URL = 'https://sage-app.example.com/terms';
const PRIVACY_URL = 'https://sage-app.example.com/privacy';

// Sage Leaf Logo Component
function SageLeafLogo({ size = 80, color = COLORS.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <G id="sage-leaf">
        {/* Center leaf (tallest) */}
        <Path
          d="M32 8C32 8 24 20 24 32C24 44 32 52 32 52C32 52 40 44 40 32C40 20 32 8 32 8Z"
          fill={color}
        />
        {/* Left leaf */}
        <Path
          d="M20 20C20 20 12 28 12 36C12 44 20 48 20 48C20 48 24 40 24 32C24 28 22 24 20 20Z"
          fill={color}
        />
        {/* Right leaf */}
        <Path
          d="M44 20C44 20 52 28 52 36C52 44 44 48 44 48C44 48 40 40 40 32C40 28 42 24 44 20Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export function AboutModal({ visible, onClose }: AboutModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('[AboutModal] Failed to open URL:', error);
    }
  };

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>About</Text>
            <TouchableOpacity
              testID="about-modal-close-button"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Centered Sage Leaf Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <SageLeafLogo size={64} color={COLORS.primary} />
              </View>
            </View>

            {/* About Sage Heading */}
            <Text style={styles.heading}>About Sage</Text>

            {/* App Description */}
            <Text style={styles.description}>
              Sage is your personal companion for mindful reflection and inner wisdom.
              Powered by on-device AI, Sage provides thoughtful guidance while keeping
              your conversations completely private. No data ever leaves your device.
            </Text>

            {/* Links Section */}
            <View style={styles.linksSection}>
              <TouchableOpacity
                testID="about-terms-link"
                style={styles.linkRow}
                onPress={() => handleOpenLink(TERMS_URL)}
              >
                <Text style={styles.linkText}>Terms of Service</Text>
                <Text style={styles.linkArrow}>{'>'}</Text>
              </TouchableOpacity>

              <View style={styles.linkDivider} />

              <TouchableOpacity
                testID="about-privacy-link"
                style={styles.linkRow}
                onPress={() => handleOpenLink(PRIVACY_URL)}
              >
                <Text style={styles.linkText}>Privacy Policy</Text>
                <Text style={styles.linkArrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>

            {/* Version Number */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionLabel}>Version</Text>
              <Text style={styles.versionNumber}>{APP_VERSION}</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Made with care for mindful living
              </Text>
              <Text style={styles.copyrightText}>
                Fully on-device wisdom
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      padding: SPACING.xl,
      paddingBottom: 40,
      maxHeight: '85%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    modalCloseBtn: {
      width: 32,
      height: 32,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCloseText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: SPACING.xl,
    },
    // Logo Section
    logoContainer: {
      marginBottom: SPACING.xl,
      alignItems: 'center',
    },
    logoBackground: {
      width: 100,
      height: 100,
      borderRadius: RADII['2xl'],
      backgroundColor: COLORS.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Heading
    heading: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      marginBottom: SPACING.lg,
      textAlign: 'center',
    },
    // Description
    description: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.md,
    },
    // Links Section
    linksSection: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      marginBottom: SPACING.xxl,
      overflow: 'hidden',
    },
    linkRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: SPACING.lg,
    },
    linkText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      fontWeight: '500',
    },
    linkArrow: {
      fontSize: 18,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    linkDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: SPACING.lg,
    },
    // Version Section
    versionContainer: {
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    versionLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: SPACING.xs,
    },
    versionNumber: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
    },
    // Footer
    footer: {
      alignItems: 'center',
    },
    footerText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      fontStyle: 'italic',
    },
    copyrightText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: SPACING.xs,
      opacity: 0.7,
    },
  });

export default AboutModal;
