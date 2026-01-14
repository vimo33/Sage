import { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSageStore, type AccentColorKey } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
  ACCENT_COLORS,
  type AccentColorDefinition,
} from '../lib/ui/theme';

interface AccentColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
}

const ACCENT_COLOR_OPTIONS: AccentColorDefinition[] = Object.values(ACCENT_COLORS);

export function AccentColorPickerModal({
  visible,
  onClose,
}: AccentColorPickerModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const handleColorSelect = useCallback((colorKey: AccentColorKey) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreferences({ accentColor: colorKey });
  }, [setPreferences]);

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
            <Text style={styles.modalTitle}>Accent Color</Text>
            <TouchableOpacity
              testID="accent-color-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Choose an accent color to personalize your Sage experience
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.colorGrid}>
              {ACCENT_COLOR_OPTIONS.map((colorOption) => {
                const isSelected = preferences.accentColor === colorOption.key;
                return (
                  <TouchableOpacity
                    key={colorOption.key}
                    testID={`accent-color-${colorOption.key}`}
                    style={[
                      styles.colorCard,
                      isSelected && styles.colorCardSelected,
                      isSelected && { borderColor: colorOption.primary },
                    ]}
                    onPress={() => handleColorSelect(colorOption.key)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: colorOption.primary },
                      ]}
                    >
                      {isSelected && (
                        <View style={styles.checkmark}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.colorName,
                        isSelected && { color: colorOption.primary },
                      ]}
                    >
                      {colorOption.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.previewSection}>
              <Text style={styles.sectionTitle}>Preview</Text>
              <View style={styles.previewCard}>
                <View
                  style={[
                    styles.previewButton,
                    {
                      backgroundColor:
                        ACCENT_COLORS[preferences.accentColor]?.primary ??
                        COLORS.primary,
                    },
                  ]}
                >
                  <Text style={styles.previewButtonText}>Primary Button</Text>
                </View>
                <View style={styles.previewRow}>
                  <View
                    style={[
                      styles.previewBadge,
                      {
                        backgroundColor:
                          ACCENT_COLORS[preferences.accentColor]?.primaryLight ??
                          COLORS.primaryLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.previewBadgeText,
                        {
                          color:
                            ACCENT_COLORS[preferences.accentColor]?.primary ??
                            COLORS.primary,
                        },
                      ]}
                    >
                      Active
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.previewDot,
                      {
                        backgroundColor:
                          ACCENT_COLORS[preferences.accentColor]?.primary ??
                          COLORS.primary,
                      },
                    ]}
                  />
                </View>
              </View>
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
      marginBottom: SPACING.md,
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
    description: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      marginBottom: SPACING.xl,
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.md,
      justifyContent: 'space-between',
    },
    colorCard: {
      width: '30%',
      aspectRatio: 0.9,
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    colorCardSelected: {
      borderWidth: 2,
    },
    colorSwatch: {
      width: 48,
      height: 48,
      borderRadius: RADII.full,
      marginBottom: SPACING.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      width: 24,
      height: 24,
      borderRadius: RADII.full,
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmarkText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#000000',
    },
    colorName: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      fontWeight: '600',
      textAlign: 'center',
    },
    previewSection: {
      marginTop: SPACING.xxl,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    previewCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      gap: SPACING.md,
    },
    previewButton: {
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xl,
      borderRadius: RADII.md,
      alignItems: 'center',
    },
    previewButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    previewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
    },
    previewBadge: {
      paddingVertical: 4,
      paddingHorizontal: SPACING.sm,
      borderRadius: RADII.sm,
    },
    previewBadgeText: {
      fontSize: 12,
      fontWeight: '700',
    },
    previewDot: {
      width: 12,
      height: 12,
      borderRadius: RADII.full,
    },
  });

export default AccentColorPickerModal;
