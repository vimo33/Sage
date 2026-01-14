/**
 * Donation/Tip Jar Types
 *
 * Supports one-time and recurring donation options
 * with respectful, non-intrusive presentation
 */

export type DonationType = 'one-time' | 'recurring';

export type DonationFrequency = 'monthly' | 'yearly';

export interface DonationTier {
  id: string;
  name: string;
  description: string;
  amount: number; // in cents
  currency: string;
  type: DonationType;
  frequency?: DonationFrequency;
  icon: string;
  productId?: string; // For in-app purchase integration
}

export interface DonationPreferences {
  hasSeenTipJar: boolean;
  lastDismissedAt: number | null;
  totalDonated: number; // in cents
  donationHistory: DonationRecord[];
  preferredCurrency: string;
}

export interface DonationRecord {
  id: string;
  tierId: string;
  amount: number;
  currency: string;
  type: DonationType;
  frequency?: DonationFrequency;
  donatedAt: number;
  transactionId?: string;
}

export interface DonationResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const DEFAULT_DONATION_PREFERENCES: DonationPreferences = {
  hasSeenTipJar: false,
  lastDismissedAt: null,
  totalDonated: 0,
  donationHistory: [],
  preferredCurrency: 'USD',
};
