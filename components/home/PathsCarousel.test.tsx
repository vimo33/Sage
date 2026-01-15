import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PathsCarousel } from './PathsCarousel';
import type { ThemePack } from '../../lib/theme-packs/types';

// Mock useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(() => 'light'),
}));

// Mock getThemeImage
jest.mock('../../lib/theme-packs/images', () => ({
  getThemeImage: jest.fn(() => null),
}));

describe('PathsCarousel', () => {
  const mockPaths: ThemePack[] = [
    {
      id: 'acceptance_journey',
      title: 'Path of Acceptance',
      description: 'A 7-day journey into embracing what is.',
      icon: '🌸',
      image: 'acceptance',
      theme: 'peace' as const,
      color: '#E8B4BC',
      dayCount: 7,
      estimatedMinutesPerDay: 10,
      days: [],
    },
    {
      id: 'purpose_journey',
      title: 'Finding Purpose',
      description: 'A 7-day exploration of meaning and direction.',
      icon: '🧭',
      image: 'purpose',
      theme: 'purpose' as const,
      color: '#7B68EE',
      dayCount: 7,
      estimatedMinutesPerDay: 10,
      days: [],
    },
    {
      id: 'stillness_journey',
      title: 'Journey into Stillness',
      description: 'A 7-day practice of cultivating inner quiet.',
      icon: '🪷',
      image: 'stillness',
      theme: 'meditation' as const,
      color: '#5F9EA0',
      dayCount: 7,
      estimatedMinutesPerDay: 10,
      days: [],
    },
  ];

  const mockOnPathPress = jest.fn();
  const mockOnViewAllPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the paths carousel section', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        onViewAllPress={mockOnViewAllPress}
        testID="test-paths-carousel"
      />
    );

    expect(getByTestId('test-paths-carousel')).toBeTruthy();
  });

  it('displays the section title', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        sectionTitle="Paths"
        testID="test-paths-carousel"
      />
    );

    const title = getByTestId('test-paths-carousel-title');
    expect(title.props.children).toBe('Paths');
  });

  it('displays custom section title when provided', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        sectionTitle="Custom Title"
        testID="test-paths-carousel"
      />
    );

    const title = getByTestId('test-paths-carousel-title');
    expect(title.props.children).toBe('Custom Title');
  });

  it('displays View all link when onViewAllPress is provided', () => {
    const { getByTestId, getByText } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        onViewAllPress={mockOnViewAllPress}
        testID="test-paths-carousel"
      />
    );

    const viewAll = getByTestId('test-paths-carousel-view-all');
    expect(viewAll).toBeTruthy();
    // Check that "View all" text exists
    expect(getByText('View all')).toBeTruthy();
  });

  it('does not display View all link when onViewAllPress is not provided', () => {
    const { queryByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        testID="test-paths-carousel"
      />
    );

    const viewAll = queryByTestId('test-paths-carousel-view-all');
    expect(viewAll).toBeNull();
  });

  it('calls onViewAllPress when View all is pressed', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        onViewAllPress={mockOnViewAllPress}
        testID="test-paths-carousel"
      />
    );

    const viewAll = getByTestId('test-paths-carousel-view-all');
    fireEvent.press(viewAll);
    expect(mockOnViewAllPress).toHaveBeenCalledTimes(1);
  });

  it('renders all path cards', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        testID="test-paths-carousel"
      />
    );

    expect(getByTestId('test-paths-carousel-card-acceptance_journey')).toBeTruthy();
    expect(getByTestId('test-paths-carousel-card-purpose_journey')).toBeTruthy();
    expect(getByTestId('test-paths-carousel-card-stillness_journey')).toBeTruthy();
  });

  it('calls onPathPress with correct path id when card is pressed', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        testID="test-paths-carousel"
      />
    );

    const acceptanceCard = getByTestId('test-paths-carousel-card-acceptance_journey');
    fireEvent.press(acceptanceCard);
    expect(mockOnPathPress).toHaveBeenCalledWith('acceptance_journey');
  });

  it('returns null when paths array is empty', () => {
    const { queryByTestId } = render(
      <PathsCarousel
        paths={[]}
        onPathPress={mockOnPathPress}
        testID="test-paths-carousel"
      />
    );

    expect(queryByTestId('test-paths-carousel')).toBeNull();
  });

  it('renders scroll view container', () => {
    const { getByTestId } = render(
      <PathsCarousel
        paths={mockPaths}
        onPathPress={mockOnPathPress}
        testID="test-paths-carousel"
      />
    );

    expect(getByTestId('test-paths-carousel-scroll-view')).toBeTruthy();
  });
});
