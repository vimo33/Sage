import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, withAlpha, getThemedColors } from '../../lib/ui/theme';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface QuestionVariationsProps {
  variations: string[];
  isDark: boolean;
  onSelectVariation?: (question: string) => void;
}

export function QuestionVariations({ variations, isDark, onSelectVariation }: QuestionVariationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getThemedColors(isDark);

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleSelectVariation = useCallback((question: string) => {
    onSelectVariation?.(question);
  }, [onSelectVariation]);

  if (!variations || variations.length === 0) {
    return null;
  }

  const dynamicStyles = createStyles(colors, isDark);

  return (
    <View style={dynamicStyles.container}>
      <TouchableOpacity
        style={dynamicStyles.toggleButton}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={dynamicStyles.toggleContent}>
          <Text style={dynamicStyles.toggleIcon}>{isExpanded ? '-' : '+'}</Text>
          <Text style={dynamicStyles.toggleText}>
            {isExpanded ? 'Hide alternative prompts' : `${variations.length} more prompts for deeper inquiry`}
          </Text>
        </View>
        <Text style={dynamicStyles.chevron}>{isExpanded ? '\u25B2' : '\u25BC'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={dynamicStyles.variationsContainer}>
          {variations.map((variation, index) => (
            <TouchableOpacity
              key={index}
              style={dynamicStyles.variationItem}
              onPress={() => handleSelectVariation(variation)}
              activeOpacity={0.7}
            >
              <View style={dynamicStyles.variationBullet}>
                <Text style={dynamicStyles.bulletText}>{index + 1}</Text>
              </View>
              <Text style={dynamicStyles.variationText}>{variation}</Text>
            </TouchableOpacity>
          ))}
          <Text style={dynamicStyles.hint}>Tap a prompt to consider it for your reflection</Text>
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: SPACING.sm,
    },
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      backgroundColor: withAlpha(COLORS.primary, 0.05),
      borderRadius: RADII.sm,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.15),
      borderStyle: 'dashed',
    },
    toggleContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    toggleIcon: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.primary,
      marginRight: SPACING.sm,
      width: 20,
      textAlign: 'center',
    },
    toggleText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      flex: 1,
    },
    chevron: {
      fontSize: 10,
      color: COLORS.primary,
      marginLeft: SPACING.sm,
    },
    variationsContainer: {
      marginTop: SPACING.sm,
      paddingLeft: SPACING.sm,
    },
    variationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.sm,
      marginBottom: SPACING.xs,
      backgroundColor: withAlpha(colors.surface, isDark ? 0.5 : 0.8),
      borderRadius: RADII.sm,
      borderLeftWidth: 2,
      borderLeftColor: withAlpha(COLORS.primary, 0.3),
    },
    variationBullet: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.sm,
      marginTop: 2,
    },
    bulletText: {
      fontSize: 11,
      fontWeight: '600',
      color: COLORS.primary,
    },
    variationText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      flex: 1,
      lineHeight: 22,
      fontStyle: 'italic',
    },
    hint: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: SPACING.sm,
      fontStyle: 'italic',
    },
  });

export default QuestionVariations;
