/**
 * Donation Service
 *
 * Handles tip jar functionality with support for:
 * - One-time donations
 * - Recurring subscriptions (monthly/yearly)
 * - External payment links (for platforms without IAP)
 *
 * Uses Linking API to open payment URLs as a fallback
 * Can be extended to support expo-in-app-purchases
 */

import { Linking, Platform } from 'react-native';
import type {
  DonationTier,
  DonationType,
  DonationFrequency,
  DonationResult,
  DonationRecord,
} from './types';

// Donation tiers - amounts in cents
export const DONATION_TIERS: DonationTier[] = [
  // One-time donations
  {
    id: 'coffee',
    name: 'Buy a Coffee',
    description: 'A small token of appreciation',
    amount: 300,
    currency: 'USD',
    type: 'one-time',
    icon: '☕',
  },
  {
    id: 'meal',
    name: 'Buy a Meal',
    description: 'Support development costs',
    amount: 1000,
    currency: 'USD',
    type: 'one-time',
    icon: '🍜',
  },
  {
    id: 'generous',
    name: 'Generous Gift',
    description: 'Help fund new features',
    amount: 2500,
    currency: 'USD',
    type: 'one-time',
    icon: '🎁',
  },
  // Recurring donations
  {
    id: 'supporter-monthly',
    name: 'Monthly Supporter',
    description: 'Steady support for ongoing development',
    amount: 500,
    currency: 'USD',
    type: 'recurring',
    frequency: 'monthly',
    icon: '💚',
  },
  {
    id: 'patron-monthly',
    name: 'Monthly Patron',
    description: 'Champion the project',
    amount: 1000,
    currency: 'USD',
    type: 'recurring',
    frequency: 'monthly',
    icon: '🌟',
  },
];

// CHF donation tiers for the Support Sage card - amounts in cents
export const CHF_DONATION_TIERS: DonationTier[] = [
  {
    id: 'chf-coffee',
    name: 'Coffee',
    description: 'Buy me a coffee',
    amount: 200,
    currency: 'CHF',
    type: 'one-time',
    icon: '☕',
  },
  {
    id: 'chf-lunch',
    name: 'Lunch',
    description: 'Buy me lunch',
    amount: 500,
    currency: 'CHF',
    type: 'one-time',
    icon: '🍽️',
  },
  {
    id: 'chf-dinner',
    name: 'Dinner',
    description: 'Buy me dinner',
    amount: 1000,
    currency: 'CHF',
    type: 'one-time',
    icon: '🥘',
  },
];

/**
 * Get CHF donation tiers
 */
export function getChfTiers(): DonationTier[] {
  return CHF_DONATION_TIERS;
}

/**
 * Format amount for display
 */
export function formatAmount(amountCents: number, currency: string = 'USD'): string {
  const amount = amountCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get one-time donation tiers
 */
export function getOneTimeTiers(): DonationTier[] {
  return DONATION_TIERS.filter((tier) => tier.type === 'one-time');
}

/**
 * Get recurring donation tiers
 */
export function getRecurringTiers(): DonationTier[] {
  return DONATION_TIERS.filter((tier) => tier.type === 'recurring');
}

/**
 * Get tier by ID
 */
export function getTierById(tierId: string): DonationTier | undefined {
  return DONATION_TIERS.find((tier) => tier.id === tierId);
}

/**
 * Get frequency label for display
 */
export function getFrequencyLabel(frequency?: DonationFrequency): string {
  if (!frequency) return '';
  switch (frequency) {
    case 'monthly':
      return '/month';
    case 'yearly':
      return '/year';
    default:
      return '';
  }
}

/**
 * Build external payment URL
 * This can be customized to point to:
 * - Buy Me a Coffee
 * - Ko-fi
 * - GitHub Sponsors
 * - Stripe payment links
 * - PayPal.me
 */
export function buildPaymentUrl(tier: DonationTier): string {
  // Default to a configurable payment URL
  // In production, this would link to your actual payment page
  const baseUrl = 'https://example.com/support';
  const params = new URLSearchParams({
    tier: tier.id,
    amount: tier.amount.toString(),
    type: tier.type,
    ...(tier.frequency && { frequency: tier.frequency }),
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Open external payment link
 */
export async function openPaymentLink(tier: DonationTier): Promise<boolean> {
  const url = buildPaymentUrl(tier);

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
      return true;
    }
    return false;
  } catch (error) {
    console.error('[Donations] Failed to open payment link:', error);
    return false;
  }
}

/**
 * Process a donation (stub for IAP integration)
 *
 * In a full implementation, this would:
 * 1. Initialize IAP connection
 * 2. Request purchase for the product
 * 3. Verify receipt
 * 4. Return result
 *
 * For now, it opens an external payment link
 */
export async function processDonation(tier: DonationTier): Promise<DonationResult> {
  console.log('[Donations] Processing donation:', tier.id, formatAmount(tier.amount, tier.currency));

  // For this implementation, we open an external payment link
  // This can be replaced with expo-in-app-purchases integration
  const opened = await openPaymentLink(tier);

  if (opened) {
    // Since we can't track external payments directly,
    // we return success to indicate the link was opened
    // The actual payment tracking would need server-side verification
    return {
      success: true,
      transactionId: `external_${Date.now()}`,
    };
  }

  return {
    success: false,
    error: 'Could not open payment link. Please try again later.',
  };
}

/**
 * Create a donation record for tracking
 */
export function createDonationRecord(
  tier: DonationTier,
  transactionId?: string
): DonationRecord {
  return {
    id: `donation_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    tierId: tier.id,
    amount: tier.amount,
    currency: tier.currency,
    type: tier.type,
    frequency: tier.frequency,
    donatedAt: Date.now(),
    transactionId,
  };
}

/**
 * Get total donations from history
 */
export function calculateTotalDonated(history: DonationRecord[]): number {
  return history.reduce((total, record) => total + record.amount, 0);
}

/**
 * Check if user is a supporter (has donated before)
 */
export function isSupporter(history: DonationRecord[]): boolean {
  return history.length > 0;
}

/**
 * Get supporter tier based on total donations
 */
export function getSupporterTier(totalCents: number): 'none' | 'friend' | 'supporter' | 'patron' {
  if (totalCents === 0) return 'none';
  if (totalCents < 1000) return 'friend';
  if (totalCents < 5000) return 'supporter';
  return 'patron';
}

/**
 * Get supporter tier display info
 */
export function getSupporterTierInfo(tier: 'none' | 'friend' | 'supporter' | 'patron'): {
  label: string;
  icon: string;
  description: string;
} {
  switch (tier) {
    case 'friend':
      return {
        label: 'Friend',
        icon: '💚',
        description: 'Thank you for your support!',
      };
    case 'supporter':
      return {
        label: 'Supporter',
        icon: '⭐',
        description: 'Your generosity helps keep this project alive!',
      };
    case 'patron':
      return {
        label: 'Patron',
        icon: '🌟',
        description: 'You are a true champion of this project!',
      };
    default:
      return {
        label: '',
        icon: '',
        description: '',
      };
  }
}

/**
 * Get a thank you message based on donation amount
 */
export function getThankYouMessage(tier: DonationTier): string {
  const messages: Record<string, string> = {
    coffee: 'Thank you for the coffee! Your kindness warms our hearts.',
    meal: 'Your generosity nourishes both code and spirit. Thank you!',
    generous: 'What a generous gift! We are deeply grateful for your support.',
    'supporter-monthly': 'Your ongoing support means the world to us. Thank you!',
    'patron-monthly': 'You are a true patron of wisdom. We are honored by your support.',
  };
  return messages[tier.id] || 'Thank you for your generous support!';
}
