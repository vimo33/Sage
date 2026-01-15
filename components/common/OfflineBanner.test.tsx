import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { OfflineBanner } from './OfflineBanner';

// Mock useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(() => 'light'),
}));

// Mock useNetworkState hook
jest.mock('@/lib/connectivity/useNetworkState', () => ({
  useNetworkState: jest.fn(() => ({
    isConnected: false,
    isLoading: false,
    connectionType: 'none',
  })),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('OfflineBanner', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the offline banner when visible is true', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    expect(getByTestId('offline-banner')).toBeTruthy();
  });

  it('displays the correct title text', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const title = getByTestId('offline-banner-title');
    expect(title.props.children).toBe("You're currently offline");
  });

  it('displays the correct subtitle text', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const subtitle = getByTestId('offline-banner-subtitle');
    expect(subtitle.props.children).toBe('Reflections are saved locally');
  });

  it('displays the RETRY button', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const retryButton = getByTestId('offline-banner-retry-button');
    expect(retryButton).toBeTruthy();
  });

  it('displays RETRY text on the button', () => {
    const { getByText } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    expect(getByText('RETRY')).toBeTruthy();
  });

  it('calls onRetry when RETRY button is pressed', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const retryButton = getByTestId('offline-banner-retry-button');
    fireEvent.press(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render when visible is false', () => {
    const { queryByTestId } = render(
      <OfflineBanner visible={false} onRetry={mockOnRetry} testID="offline-banner" />
    );

    expect(queryByTestId('offline-banner')).toBeNull();
  });

  it('renders the cloud-offline icon', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const icon = getByTestId('offline-banner-icon');
    expect(icon).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const banner = getByTestId('offline-banner');
    expect(banner.props.accessibilityRole).toBe('alert');
  });

  it('has correct accessibility label', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} testID="offline-banner" />
    );

    const banner = getByTestId('offline-banner');
    expect(banner.props.accessibilityLabel).toBe(
      "You're currently offline. Reflections are saved locally."
    );
  });

  it('uses default testID when not provided', () => {
    const { getByTestId } = render(
      <OfflineBanner visible={true} onRetry={mockOnRetry} />
    );

    expect(getByTestId('offline-banner')).toBeTruthy();
  });
});
