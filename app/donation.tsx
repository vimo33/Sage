/**
 * Donation Screen
 *
 * Full-screen donation experience with amount selector and payment methods.
 * Features:
 * - Close/restore header
 * - Heart icon in green circle
 * - "Keep Sage free for everyone" heading
 * - Benefits card with 3 items
 * - Amount selector grid (CHF 2, 5, 10, Custom)
 * - Payment method selector
 * - "Donate CHF X" CTA button
 * - "Maybe later" link
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/navigation/AppHeader';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
  SHADOWS,
  withAlpha,
} from '@/lib/ui/theme';
import { processDonation, createDonationRecord } from '@/lib/donations';
import { useSageStore } from '@/lib/storage/store';

// Donation amount options in CHF (stored as cents)
const AMOUNT_OPTIONS = [
  { label: 'CHF 2', value: 200 },
  { label: 'CHF 5', value: 500 },
  { label: 'CHF 10', value: 1000 },
  { label: 'Custom', value: 0 },
];

// Payment method options
const PAYMENT_METHODS = [
  { id: 'apple-pay', label: 'Apple Pay', icon: 'logo-apple' as const },
  { id: 'google-pay', label: 'Google Pay', icon: 'logo-google' as const },
  { id: 'card', label: 'Credit Card', icon: 'card-outline' as const },
];

// Benefits list
const BENEFITS = [
  { icon: '🌱', text: 'Help Sage remain free for everyone' },
  { icon: '🚀', text: 'Support continuous improvements' },
  { icon: '💚', text: 'Join our community of supporters' },
];

export default function DonationScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const recordDonation = useSageStore((s) => s.recordDonation);

  const [selectedAmount, setSelectedAmount] = useState<number>(500); // Default CHF 5
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('apple-pay');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate the display amount
  const displayAmount = isCustomSelected
    ? customAmount
      ? `CHF ${customAmount}`
      : 'CHF 0'
    : `CHF ${selectedAmount / 100}`;

  // Get the amount in cents for processing
  const getAmountInCents = (): number => {
    if (isCustomSelected) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : Math.round(parsed * 100);
    }
    return selectedAmount;
  };

  const handleAmountSelect = (value: number, isCustom: boolean) => {
    if (isCustom) {
      setIsCustomSelected(true);
      setSelectedAmount(0);
    } else {
      setIsCustomSelected(false);
      setSelectedAmount(value);
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    const parts = filtered.split('.');
    if (parts.length > 2) {
      return; // Don't allow multiple decimal points
    }
    if (parts[1] && parts[1].length > 2) {
      return; // Don't allow more than 2 decimal places
    }
    setCustomAmount(filtered);
  };

  const handleDonate = useCallback(async () => {
    const amountInCents = getAmountInCents();
    if (amountInCents <= 0) {
      return; // Don't process zero or negative amounts
    }

    setIsProcessing(true);

    try {
      // Create a donation tier object for processing
      const donationTier = {
        id: 'custom-donation',
        name: 'Custom Donation',
        amount: amountInCents,
        currency: 'CHF' as const,
        icon: '💚',
        description: 'One-time donation',
        type: 'one-time' as const,
      };

      const result = await processDonation(donationTier);

      if (result.success) {
        // Record the donation
        const record = createDonationRecord(donationTier, result.transactionId);
        recordDonation(record);

        // Navigate to success screen
        router.replace({
          pathname: '/donation-success',
          params: { amount: displayAmount },
        });
      }
    } catch (error) {
      console.error('[Donation] Error processing donation:', error);
    } finally {
      setIsProcessing(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayAmount, recordDonation, isCustomSelected, customAmount, selectedAmount]);

  const handleMaybeLater = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const isValidAmount = getAmountInCents() > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        variant="close"
        title=""
        showProfile={false}
        onBack={handleClose}
        showBorder={false}
        testID="donation-header"
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Heart Icon in Green Circle */}
          <View style={styles.iconContainer} testID="donation-heart-icon">
            <Ionicons name="heart" size={48} color={COLORS.white} />
          </View>

          {/* Heading */}
          <Text style={styles.heading} testID="donation-heading">
            Keep Sage free for everyone.
          </Text>

          {/* Subheading */}
          <Text style={styles.subheading}>
            Your support helps us maintain and improve Sage for the entire community.
          </Text>

          {/* Benefits Card */}
          <View style={styles.benefitsCard} testID="donation-benefits-card">
            {BENEFITS.map((benefit, index) => (
              <View
                key={index}
                style={[
                  styles.benefitRow,
                  index < BENEFITS.length - 1 && styles.benefitRowBorder,
                ]}
              >
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>

          {/* Amount Selector */}
          <Text style={styles.sectionTitle}>Select amount</Text>
          <View style={styles.amountGrid} testID="donation-amount-grid">
            {AMOUNT_OPTIONS.map((option, index) => {
              const isCustom = option.value === 0;
              const isSelected = isCustom ? isCustomSelected : (!isCustomSelected && selectedAmount === option.value);

              return (
                <TouchableOpacity
                  key={option.label}
                  style={[
                    styles.amountButton,
                    isSelected && styles.amountButtonSelected,
                  ]}
                  onPress={() => handleAmountSelect(option.value, isCustom)}
                  activeOpacity={0.8}
                  testID={`donation-amount-${isCustom ? 'custom' : option.value}`}
                >
                  <Text
                    style={[
                      styles.amountButtonText,
                      isSelected && styles.amountButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom Amount Input */}
          {isCustomSelected && (
            <View style={styles.customAmountContainer}>
              <Text style={styles.currencyPrefix}>CHF</Text>
              <TextInput
                style={styles.customAmountInput}
                value={customAmount}
                onChangeText={handleCustomAmountChange}
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
                keyboardType="decimal-pad"
                testID="donation-custom-amount-input"
              />
            </View>
          )}

          {/* Payment Method Selector */}
          <Text style={styles.sectionTitle}>Payment method</Text>
          <View style={styles.paymentMethods} testID="donation-payment-methods">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedPaymentMethod === method.id;

              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodButton,
                    isSelected && styles.paymentMethodSelected,
                  ]}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                  activeOpacity={0.8}
                  testID={`donation-payment-${method.id}`}
                >
                  <Ionicons
                    name={method.icon}
                    size={24}
                    color={isSelected ? COLORS.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.paymentMethodText,
                      isSelected && styles.paymentMethodTextSelected,
                    ]}
                  >
                    {method.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.paymentCheckmark}>
                      <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={[
              styles.ctaButton,
              (!isValidAmount || isProcessing) && styles.ctaButtonDisabled,
            ]}
            onPress={handleDonate}
            disabled={!isValidAmount || isProcessing}
            activeOpacity={0.8}
            testID="donation-cta-button"
          >
            {isProcessing ? (
              <ActivityIndicator color={COLORS.primaryText} size="small" />
            ) : (
              <View style={styles.ctaContent}>
                <Text style={styles.ctaButtonText}>
                  Donate {displayAmount}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={COLORS.primaryText}
                  style={styles.ctaArrow}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Maybe Later Link */}
          <TouchableOpacity
            style={styles.maybeLaterButton}
            onPress={handleMaybeLater}
            activeOpacity={0.7}
            testID="donation-maybe-later"
          >
            <Text style={styles.maybeLaterText}>Maybe later</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    keyboardAvoid: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING['4xl'],
      alignItems: 'center',
    },
    // Heart Icon
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: SPACING.xl,
      marginBottom: SPACING.xxl,
      ...SHADOWS.primary,
    },
    // Heading
    heading: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: SPACING.md,
    },
    subheading: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.md,
      lineHeight: 22,
    },
    // Benefits Card
    benefitsCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      borderWidth: 1,
      borderColor: colors.border,
      width: '100%',
      marginBottom: SPACING.xxl,
      overflow: 'hidden',
    },
    benefitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
    },
    benefitRowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    benefitIcon: {
      fontSize: 24,
      marginRight: SPACING.md,
    },
    benefitText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      flex: 1,
    },
    // Section Title
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      alignSelf: 'flex-start',
      marginBottom: SPACING.md,
    },
    // Amount Grid
    amountGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.md,
      width: '100%',
      marginBottom: SPACING.xl,
    },
    amountButton: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: SPACING.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    amountButtonSelected: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderColor: COLORS.primary,
    },
    amountButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    amountButtonTextSelected: {
      color: COLORS.primary,
    },
    // Custom Amount Input
    customAmountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: COLORS.primary,
      paddingHorizontal: SPACING.lg,
      width: '100%',
      marginBottom: SPACING.xl,
    },
    currencyPrefix: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginRight: SPACING.sm,
    },
    customAmountInput: {
      flex: 1,
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
      paddingVertical: SPACING.lg,
    },
    // Payment Methods
    paymentMethods: {
      width: '100%',
      gap: SPACING.md,
      marginBottom: SPACING.xxl,
    },
    paymentMethodButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
    },
    paymentMethodSelected: {
      borderColor: COLORS.primary,
      backgroundColor: withAlpha(COLORS.primary, 0.08),
    },
    paymentMethodText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      marginLeft: SPACING.md,
      flex: 1,
    },
    paymentMethodTextSelected: {
      fontWeight: '600',
    },
    paymentCheckmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: withAlpha(COLORS.primary, 0.2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    // CTA Button
    ctaButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.md,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xxl,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 56,
      ...SHADOWS.primary,
    },
    ctaButtonDisabled: {
      backgroundColor: colors.surfaceAlt,
      ...SHADOWS.none,
    },
    ctaContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ctaButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
      fontSize: 17,
    },
    ctaArrow: {
      marginLeft: SPACING.sm,
    },
    // Maybe Later
    maybeLaterButton: {
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      marginTop: SPACING.md,
    },
    maybeLaterText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textDecorationLine: 'underline',
    },
  });
