import React from 'react';
import { render } from '@testing-library/react-native';
import { PathCard } from './PathCard';
import type { ThemePack } from '../../lib/theme-packs/types';

// Mock useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(() => 'light'),
}));

// Mock getThemeImage
jest.mock('../../lib/theme-packs/images', () => ({
  getThemeImage: jest.fn(() => null),
}));

describe('PathCard', () => {
  const mockPack: ThemePack = {
    id: 'test_journey',
    title: 'Test Journey',
    description: 'A test journey description for testing purposes.',
    icon: '🧪',
    image: 'test',
    theme: 'peace' as const,
    color: '#E8B4BC',
    dayCount: 7,
    estimatedMinutesPerDay: 10,
    days: [],
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the path card', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    expect(getByTestId('test-path-card')).toBeTruthy();
  });

  it('displays the pack title', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const title = getByTestId('test-path-card-title');
    expect(title.props.children).toBe('Test Journey');
  });

  it('displays the description', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const description = getByTestId('test-path-card-description');
    expect(description.props.children).toContain('A test journey description');
  });

  it('displays the days badge with correct text', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const badge = getByTestId('test-path-card-badge');
    // The badge contains [7, " DAYS"] as separate children
    const badgeText = badge.props.children.props.children;
    expect(badgeText).toEqual([7, ' DAYS']);
  });

  it('displays the chevron', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const chevron = getByTestId('test-path-card-chevron');
    expect(chevron.props.children).toBe('›');
  });

  it('displays emoji icon when no image available', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const emoji = getByTestId('test-path-card-emoji');
    expect(emoji.props.children).toBe('🧪');
  });

  it('calls onPress when card is pressed', () => {
    const { getByTestId } = render(
      <PathCard pack={mockPack} onPress={mockOnPress} testID="test-path-card" />
    );

    const card = getByTestId('test-path-card');
    // Simulate press - using fireEvent for proper event handling
    const { fireEvent } = require('@testing-library/react-native');
    fireEvent.press(card);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
