import { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSageStore, DEFAULT_DEVELOPER_SETTINGS, type DeveloperSettings } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';

interface DeveloperSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ParameterControlProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onDecrease: () => void;
  onIncrease: () => void;
  formatValue?: (value: number) => string;
  colors: ReturnType<typeof getThemedColors>;
}

function ParameterControl({
  label,
  description,
  value,
  min,
  max,
  step,
  defaultValue,
  onDecrease,
  onIncrease,
  formatValue = (v) => v.toFixed(2),
  colors,
}: ParameterControlProps) {
  const isDefault = Math.abs(value - defaultValue) < step / 2;
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <View style={paramStyles.container}>
      <View style={paramStyles.header}>
        <View style={paramStyles.labelContainer}>
          <Text style={[paramStyles.label, { color: colors.text }]}>{label}</Text>
          {isDefault && (
            <View style={paramStyles.defaultBadge}>
              <Text style={paramStyles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <Text style={[paramStyles.value, { color: COLORS.primary }]}>
          {formatValue(value)}
        </Text>
      </View>
      <Text style={[paramStyles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
      <View style={paramStyles.controlRow}>
        <TouchableOpacity
          style={[paramStyles.controlBtn, { backgroundColor: colors.surfaceAlt }]}
          onPress={onDecrease}
          disabled={value <= min}
        >
          <Text style={[paramStyles.controlBtnText, { color: colors.text, opacity: value <= min ? 0.3 : 1 }]}>-</Text>
        </TouchableOpacity>
        <View style={[paramStyles.track, { backgroundColor: colors.surfaceAlt }]}>
          <View style={[paramStyles.trackFill, { width: `${progress}%` }]} />
        </View>
        <TouchableOpacity
          style={[paramStyles.controlBtn, { backgroundColor: colors.surfaceAlt }]}
          onPress={onIncrease}
          disabled={value >= max}
        >
          <Text style={[paramStyles.controlBtnText, { color: colors.text, opacity: value >= max ? 0.3 : 1 }]}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={paramStyles.rangeRow}>
        <Text style={[paramStyles.rangeLabel, { color: colors.textMuted }]}>{formatValue(min)}</Text>
        <Text style={[paramStyles.rangeLabel, { color: colors.textMuted }]}>{formatValue(max)}</Text>
      </View>
    </View>
  );
}

const paramStyles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    ...TYPOGRAPHY.styles.caption,
    marginBottom: SPACING.sm,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  controlBtn: {
    width: 32,
    height: 32,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 40,
  },
  rangeLabel: {
    fontSize: 11,
  },
});

export function DeveloperSettingsModal({
  visible,
  onClose,
}: DeveloperSettingsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const developerSettings = preferences.developerSettings;

  const updateSetting = useCallback(<K extends keyof DeveloperSettings>(
    key: K,
    value: DeveloperSettings[K]
  ) => {
    setPreferences({
      developerSettings: {
        ...developerSettings,
        [key]: value,
      },
    });
  }, [developerSettings, setPreferences]);

  const handleToggleEnabled = useCallback((enabled: boolean) => {
    updateSetting('enabled', enabled);
  }, [updateSetting]);

  const handleResetToDefaults = useCallback(() => {
    setPreferences({
      developerSettings: {
        ...DEFAULT_DEVELOPER_SETTINGS,
        enabled: developerSettings.enabled,
      },
    });
  }, [developerSettings.enabled, setPreferences]);

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
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>Developer Settings</Text>
              <View style={styles.devBadge}>
                <Text style={styles.devBadgeText}>DEV</Text>
              </View>
            </View>
            <TouchableOpacity
              testID="developer-settings-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>Power User Settings</Text>
              <Text style={styles.warningText}>
                These settings control the LLM inference parameters. Incorrect values may produce poor quality responses.
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.row}>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Enable Custom Parameters</Text>
                  <Text style={styles.rowSublabel}>
                    Override default LLM settings
                  </Text>
                </View>
                <Switch
                  testID="developer-settings-enabled-toggle"
                  value={developerSettings.enabled}
                  onValueChange={handleToggleEnabled}
                  trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                />
              </View>
            </View>

            {developerSettings.enabled && (
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Model Parameters</Text>
                  <View style={styles.parametersCard}>
                    <ParameterControl
                      label="Temperature"
                      description="Controls randomness. Lower = more focused, higher = more creative"
                      value={developerSettings.temperature}
                      min={0.0}
                      max={2.0}
                      step={0.1}
                      defaultValue={DEFAULT_DEVELOPER_SETTINGS.temperature}
                      onDecrease={() => updateSetting('temperature', Math.max(0, developerSettings.temperature - 0.1))}
                      onIncrease={() => updateSetting('temperature', Math.min(2, developerSettings.temperature + 0.1))}
                      colors={colors}
                    />

                    <View style={styles.parameterDivider} />

                    <ParameterControl
                      label="Top-K"
                      description="Limits vocabulary to top K tokens. Lower = more focused"
                      value={developerSettings.topK}
                      min={1}
                      max={100}
                      step={5}
                      defaultValue={DEFAULT_DEVELOPER_SETTINGS.topK}
                      onDecrease={() => updateSetting('topK', Math.max(1, developerSettings.topK - 5))}
                      onIncrease={() => updateSetting('topK', Math.min(100, developerSettings.topK + 5))}
                      formatValue={(v) => Math.round(v).toString()}
                      colors={colors}
                    />

                    <View style={styles.parameterDivider} />

                    <ParameterControl
                      label="Top-P"
                      description="Nucleus sampling. Lower = more deterministic"
                      value={developerSettings.topP}
                      min={0.0}
                      max={1.0}
                      step={0.05}
                      defaultValue={DEFAULT_DEVELOPER_SETTINGS.topP}
                      onDecrease={() => updateSetting('topP', Math.max(0, developerSettings.topP - 0.05))}
                      onIncrease={() => updateSetting('topP', Math.min(1, developerSettings.topP + 0.05))}
                      colors={colors}
                    />

                    <View style={styles.parameterDivider} />

                    <ParameterControl
                      label="Repeat Penalty"
                      description="Penalizes repetition. Higher = less repetitive"
                      value={developerSettings.repeatPenalty}
                      min={0.0}
                      max={2.0}
                      step={0.1}
                      defaultValue={DEFAULT_DEVELOPER_SETTINGS.repeatPenalty}
                      onDecrease={() => updateSetting('repeatPenalty', Math.max(0, developerSettings.repeatPenalty - 0.1))}
                      onIncrease={() => updateSetting('repeatPenalty', Math.min(2, developerSettings.repeatPenalty + 0.1))}
                      colors={colors}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  testID="developer-settings-reset"
                  style={styles.resetButton}
                  onPress={handleResetToDefaults}
                >
                  <Text style={styles.resetButtonText}>Reset to Defaults</Text>
                </TouchableOpacity>

                <View style={styles.currentValuesBox}>
                  <Text style={styles.currentValuesTitle}>Current Values</Text>
                  <Text style={styles.currentValuesText}>
                    temperature={developerSettings.temperature.toFixed(2)}{'\n'}
                    top_k={Math.round(developerSettings.topK)}{'\n'}
                    top_p={developerSettings.topP.toFixed(2)}{'\n'}
                    repeat_penalty={developerSettings.repeatPenalty.toFixed(2)}
                  </Text>
                </View>
              </>
            )}

            <View style={styles.footerNote}>
              <Text style={styles.footerNoteText}>
                Access this panel by long-pressing the version text in Settings
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
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    devBadge: {
      backgroundColor: COLORS.warning,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    devBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#000000',
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
    warningBox: {
      backgroundColor: COLORS.warningLight,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    warningTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.warning,
      marginBottom: SPACING.xs,
    },
    warningText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
    },
    section: {
      marginBottom: SPACING.lg,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    rowContent: {
      flex: 1,
      marginRight: SPACING.md,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    rowSublabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    parametersCard: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    parameterDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: SPACING.md,
    },
    resetButton: {
      backgroundColor: colors.surfaceAlt,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    resetButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    currentValuesBox: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    currentValuesTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },
    currentValuesText: {
      fontFamily: 'monospace',
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    footerNote: {
      padding: SPACING.lg,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
    },
    footerNoteText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

export default DeveloperSettingsModal;
