/**
 * TipJarModal Component
 *
 * A respectful, non-intrusive tip jar for users who want to support development.
 * Features:
 * - One-time donation options
 * - Recurring subscription options
 * - Thank you messages for supporters
 * - Accessible and themed design
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';
import {
  getOneTimeTiers,
  getRecurringTiers,
  formatAmount,
  getFrequencyLabel,
  processDonation,
  createDonationRecord,
  getSupporterTier,
  getSupporterTierInfo,
  getThankYouMessage,
  type DonationTier,
} from '../lib/donations';

interface TipJarModalProps {
  visible: boolean;
  onClose: () => void;
}

type TabType = 'one-time' | 'recurring';

export function TipJarModal({ visible, onClose }: TipJarModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const donationPreferences = useSageStore((s) => s.donationPreferences);
  const recordDonation = useSageStore((s) => s.recordDonation);
  const markTipJarSeen = useSageStore((s) => s.markTipJarSeen);

  const [activeTab, setActiveTab] = useState<TabType>('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');

  const oneTimeTiers = getOneTimeTiers();
  const recurringTiers = getRecurringTiers();
  const currentTiers = activeTab === 'one-time' ? oneTimeTiers : recurringTiers;

  const supporterTier = getSupporterTier(donationPreferences.totalDonated);
  const supporterInfo = getSupporterTierInfo(supporterTier);
  const isSupporter = supporterTier !== 'none';

  const handleClose = useCallback(() => {
    if (!donationPreferences.hasSeenTipJar) {
      markTipJarSeen();
    }
    setShowThankYou(false);
    setSelectedTier(null);
    onClose();
  }, [donationPreferences.hasSeenTipJar, markTipJarSeen, onClose]);

  const handleDonate = useCallback(async (tier: DonationTier) => {
    setSelectedTier(tier.id);
    setIsProcessing(true);

    try {
      const result = await processDonation(tier);

      if (result.success) {
        // Record the donation in preferences
        const record = createDonationRecord(tier, result.transactionId);
        recordDonation(record);

        // Show thank you message
        setThankYouMessage(getThankYouMessage(tier));
        setShowThankYou(true);
      }
    } catch (error) {
      console.error('[TipJar] Donation error:', error);
    } finally {
      setIsProcessing(false);
      setSelectedTier(null);
    }
  }, [recordDonation]);

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Support Sage</Text>
            <TouchableOpacity
              testID="tip-jar-close-button"
              onPress={handleClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {showThankYou ? (
              // Thank You State
              <View style={styles.thankYouContainer}>
                <Text style={styles.thankYouIcon}>🙏</Text>
                <Text style={styles.thankYouTitle}>Thank You!</Text>
                <Text style={styles.thankYouMessage}>{thankYouMessage}</Text>
                <TouchableOpacity
                  testID="tip-jar-done-button"
                  style={styles.doneButton}
                  onPress={handleClose}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* Supporter Badge */}
                {isSupporter && (
                  <View style={styles.supporterBadge}>
                    <Text style={styles.supporterIcon}>{supporterInfo.icon}</Text>
                    <View style={styles.supporterInfo}>
                      <Text style={styles.supporterLabel}>{supporterInfo.label}</Text>
                      <Text style={styles.supporterDescription}>
                        {supporterInfo.description}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Introduction */}
                <View style={styles.introSection}>
                  <Text style={styles.introText}>
                    Sage is free and open-source. Your support helps fund development
                    and keeps this project alive.
                  </Text>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    testID="tip-jar-one-time-tab"
                    style={[
                      styles.tab,
                      activeTab === 'one-time' && styles.tabActive,
                    ]}
                    onPress={() => setActiveTab('one-time')}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'one-time' && styles.tabTextActive,
                      ]}
                    >
                      One-time
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="tip-jar-recurring-tab"
                    style={[
                      styles.tab,
                      activeTab === 'recurring' && styles.tabActive,
                    ]}
                    onPress={() => setActiveTab('recurring')}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'recurring' && styles.tabTextActive,
                      ]}
                    >
                      Recurring
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Donation Tiers */}
                <View style={styles.tiersContainer}>
                  {currentTiers.map((tier) => (
                    <TouchableOpacity
                      key={tier.id}
                      testID={`tip-jar-tier-${tier.id}`}
                      style={styles.tierCard}
                      onPress={() => handleDonate(tier)}
                      disabled={isProcessing}
                    >
                      <View style={styles.tierHeader}>
                        <Text style={styles.tierIcon}>{tier.icon}</Text>
                        <View style={styles.tierInfo}>
                          <Text style={styles.tierName}>{tier.name}</Text>
                          <Text style={styles.tierDescription}>
                            {tier.description}
                          </Text>
                        </View>
                        <View style={styles.tierPriceContainer}>
                          {isProcessing && selectedTier === tier.id ? (
                            <ActivityIndicator color={COLORS.primary} size="small" />
                          ) : (
                            <>
                              <Text style={styles.tierPrice}>
                                {formatAmount(tier.amount, tier.currency)}
                              </Text>
                              {tier.frequency && (
                                <Text style={styles.tierFrequency}>
                                  {getFrequencyLabel(tier.frequency)}
                                </Text>
                              )}
                            </>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Footer Note */}
                <View style={styles.footerNote}>
                  <Text style={styles.footerNoteText}>
                    {activeTab === 'recurring'
                      ? 'Subscriptions can be cancelled anytime.'
                      : 'All donations are processed securely.'}
                  </Text>
                  <Text style={styles.footerNoteTextMuted}>
                    Your support makes a real difference. Thank you!
                  </Text>
                </View>
              </>
            )}
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
    // Supporter Badge
    supporterBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primaryLight,
      borderRadius: RADII.md,
      padding: SPACING.md,
      marginBottom: SPACING.lg,
    },
    supporterIcon: {
      fontSize: 24,
      marginRight: SPACING.md,
    },
    supporterInfo: {
      flex: 1,
    },
    supporterLabel: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
    },
    supporterDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
    },
    // Introduction
    introSection: {
      marginBottom: SPACING.xl,
    },
    introText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    // Tab Selector
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.xs,
      marginBottom: SPACING.xl,
    },
    tab: {
      flex: 1,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      borderRadius: RADII.sm,
    },
    tabActive: {
      backgroundColor: colors.background,
    },
    tabText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: COLORS.primary,
    },
    // Donation Tiers
    tiersContainer: {
      gap: SPACING.md,
    },
    tierCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tierHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tierIcon: {
      fontSize: 28,
      marginRight: SPACING.md,
    },
    tierInfo: {
      flex: 1,
    },
    tierName: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    tierDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    tierPriceContainer: {
      alignItems: 'flex-end',
      minWidth: 70,
    },
    tierPrice: {
      ...TYPOGRAPHY.styles.h3,
      color: COLORS.primary,
    },
    tierFrequency: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    // Footer Note
    footerNote: {
      marginTop: SPACING.xl,
      padding: SPACING.lg,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
    },
    footerNoteText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      textAlign: 'center',
    },
    footerNoteTextMuted: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: SPACING.xs,
      fontStyle: 'italic',
    },
    // Thank You State
    thankYouContainer: {
      alignItems: 'center',
      paddingVertical: SPACING.xxxl,
    },
    thankYouIcon: {
      fontSize: 64,
      marginBottom: SPACING.xl,
    },
    thankYouTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      marginBottom: SPACING.md,
    },
    thankYouMessage: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.xl,
      lineHeight: 22,
    },
    doneButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xxxl,
      borderRadius: RADII.md,
    },
    doneButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
  });

export default TipJarModal;
