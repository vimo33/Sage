import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';
import { getAvailableBooks, initWisdomDB } from '../lib/retrieval/search';

interface TraditionSelectorModalProps {
  visible: boolean;
  onClose: () => void;
}

interface TraditionInfo {
  book: string;
  count: number;
}

export function TraditionSelectorModal({
  visible,
  onClose,
}: TraditionSelectorModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const [traditions, setTraditions] = useState<TraditionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTraditions, setSelectedTraditions] = useState<string[]>(
    preferences.preferredTraditions
  );

  // Load available traditions on mount
  useEffect(() => {
    const loadTraditions = async () => {
      setIsLoading(true);
      try {
        await initWisdomDB();
        const books = await getAvailableBooks();
        setTraditions(books);
      } catch (error) {
        console.error('[TraditionSelector] Failed to load traditions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (visible) {
      loadTraditions();
      // Reset selection to current preferences when modal opens
      setSelectedTraditions(preferences.preferredTraditions);
    }
  }, [visible, preferences.preferredTraditions]);

  const handleToggleTradition = useCallback((tradition: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTraditions((prev) => {
      if (prev.includes(tradition)) {
        return prev.filter((t) => t !== tradition);
      } else {
        return [...prev, tradition];
      }
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (selectedTraditions.length === traditions.length) {
      // Deselect all (use all traditions, no filter)
      setSelectedTraditions([]);
    } else {
      // Select all
      setSelectedTraditions(traditions.map((t) => t.book));
    }
  }, [selectedTraditions, traditions]);

  const handleSave = useCallback(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setPreferences({ preferredTraditions: selectedTraditions });
    onClose();
  }, [selectedTraditions, setPreferences, onClose]);

  const handleToggleCrossTradition = useCallback((value: boolean) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreferences({ crossTraditionBlending: value });
  }, [setPreferences]);

  const styles = createStyles(colors, isDark);

  const totalChunks = traditions.reduce((sum, t) => sum + t.count, 0);
  const selectedChunks = traditions
    .filter((t) => selectedTraditions.length === 0 || selectedTraditions.includes(t.book))
    .reduce((sum, t) => sum + t.count, 0);

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
            <Text style={styles.modalTitle}>Wisdom Traditions</Text>
            <TouchableOpacity
              testID="tradition-selector-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Select which wisdom traditions resonate with you. When none are selected, all traditions will be used.
          </Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading traditions...</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Stats summary */}
              <View style={styles.statsCard}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {selectedTraditions.length || traditions.length}
                  </Text>
                  <Text style={styles.statLabel}>
                    {selectedTraditions.length === 0 ? 'All' : 'Selected'} Traditions
                  </Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{selectedChunks.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Wisdom Passages</Text>
                </View>
              </View>

              {/* Select/Deselect All button */}
              <TouchableOpacity
                style={styles.selectAllBtn}
                onPress={handleSelectAll}
                testID="select-all-traditions"
              >
                <Text style={styles.selectAllText}>
                  {selectedTraditions.length === traditions.length
                    ? 'Clear Selection (Use All)'
                    : selectedTraditions.length === 0
                      ? 'All Traditions Active'
                      : 'Select All'}
                </Text>
              </TouchableOpacity>

              {/* Tradition list */}
              <View style={styles.traditionsContainer}>
                {traditions.map((tradition) => {
                  const isSelected = selectedTraditions.includes(tradition.book);
                  const isEffectivelyActive = selectedTraditions.length === 0 || isSelected;

                  return (
                    <TouchableOpacity
                      key={tradition.book}
                      testID={`tradition-${tradition.book.replace(/\s+/g, '-').toLowerCase()}`}
                      style={[
                        styles.traditionCard,
                        isSelected && styles.traditionCardSelected,
                      ]}
                      onPress={() => handleToggleTradition(tradition.book)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.traditionInfo}>
                        <Text
                          style={[
                            styles.traditionName,
                            isSelected && styles.traditionNameSelected,
                          ]}
                        >
                          {tradition.book}
                        </Text>
                        <Text style={styles.traditionCount}>
                          {tradition.count.toLocaleString()} passages
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                          !isSelected && selectedTraditions.length === 0 && styles.checkboxMuted,
                        ]}
                      >
                        {(isSelected || selectedTraditions.length === 0) && (
                          <Text style={styles.checkmark}>
                            {selectedTraditions.length === 0 ? '✓' : '✓'}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Cross-tradition blending option */}
              <View style={styles.blendingSection}>
                <Text style={styles.sectionTitle}>Advanced</Text>
                <View style={styles.blendingCard}>
                  <View style={styles.blendingInfo}>
                    <Text style={styles.blendingTitle}>Cross-Tradition Blending</Text>
                    <Text style={styles.blendingDescription}>
                      When enabled, Sage may occasionally include wisdom from other traditions for broader perspective
                    </Text>
                  </View>
                  <Switch
                    value={preferences.crossTraditionBlending}
                    onValueChange={handleToggleCrossTradition}
                    trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                    testID="cross-tradition-blending-toggle"
                  />
                </View>
              </View>

              {/* Save button */}
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
                testID="save-tradition-preferences"
              >
                <Text style={styles.saveBtnText}>Save Preferences</Text>
              </TouchableOpacity>

              <Text style={styles.footerNote}>
                Your selection helps Sage offer wisdom that resonates with your spiritual path
              </Text>
            </ScrollView>
          )}
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
      marginBottom: SPACING.lg,
    },
    loadingContainer: {
      padding: SPACING.xxl,
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.md,
    },
    loadingText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    statsCard: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      ...TYPOGRAPHY.styles.h2,
      color: COLORS.primary,
    },
    statLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      backgroundColor: colors.border,
      marginHorizontal: SPACING.md,
    },
    selectAllBtn: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      marginBottom: SPACING.md,
      alignSelf: 'flex-start',
    },
    selectAllText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.primary,
      fontWeight: '600',
    },
    traditionsContainer: {
      gap: SPACING.sm,
    },
    traditionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    traditionCardSelected: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primaryLight,
    },
    traditionInfo: {
      flex: 1,
    },
    traditionName: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    traditionNameSelected: {
      color: COLORS.primary,
    },
    traditionCount: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: RADII.sm,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxSelected: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary,
    },
    checkboxMuted: {
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    blendingSection: {
      marginTop: SPACING.xxl,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    blendingCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
    },
    blendingInfo: {
      flex: 1,
      marginRight: SPACING.md,
    },
    blendingTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    blendingDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 4,
    },
    saveBtn: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.md,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xl,
      alignItems: 'center',
      marginTop: SPACING.xl,
    },
    saveBtnText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    footerNote: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: SPACING.lg,
      fontStyle: 'italic',
    },
  });

export default TraditionSelectorModal;
