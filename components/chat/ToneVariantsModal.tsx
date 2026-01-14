import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  Dimensions,
  FlatList,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import type { ToneVariants, ToneVariantType, AssistantResult } from '../../lib/chat/service';

interface ToneVariantsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTone: (tone: ToneVariantType, result: AssistantResult) => void;
  toneVariants: ToneVariants | null;
  isGenerating: boolean;
}

interface ToneConfig {
  type: ToneVariantType;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const TONE_CONFIGS: ToneConfig[] = [
  {
    type: 'practical',
    label: 'Practical',
    emoji: '🎯',
    description: 'Clear, actionable guidance',
    color: '#3b82f6', // blue
  },
  {
    type: 'poetic',
    label: 'Poetic',
    emoji: '🌸',
    description: 'Beautiful, evocative language',
    color: '#ec4899', // pink
  },
  {
    type: 'deep',
    label: 'Deep',
    emoji: '🔮',
    description: 'Philosophical exploration',
    color: '#8b5cf6', // purple
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTENT_WIDTH = SCREEN_WIDTH - SPACING.xl * 2 - SPACING.xxl * 2;

export function ToneVariantsModal({
  visible,
  onClose,
  onSelectTone,
  toneVariants,
  isGenerating,
}: ToneVariantsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CONTENT_WIDTH);
    setCurrentIndex(index);
  }, []);

  const handleDotPress = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  }, []);

  const handleSelectCurrent = useCallback(() => {
    if (!toneVariants) {
      console.warn('[Sage] ToneVariantsModal: No tone variants available');
      return;
    }
    const currentTone = TONE_CONFIGS[currentIndex];
    const selectedVariant = toneVariants[currentTone.type];

    // Don't allow selection if the variant has no content
    if (!selectedVariant || !selectedVariant.content || selectedVariant.content.trim().length === 0) {
      console.warn('[Sage] ToneVariantsModal: Selected variant has no content');
      return;
    }

    console.log('[Sage] ToneVariantsModal: Selecting', currentTone.type, 'variant');
    onSelectTone(currentTone.type, selectedVariant);
  }, [currentIndex, toneVariants, onSelectTone]);

  const handleClose = useCallback(() => {
    if (!isGenerating) {
      onClose();
      // Reset to first item when closing
      setCurrentIndex(0);
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
    }
  }, [isGenerating, onClose]);

  const renderToneContent = useCallback(({ item, index }: { item: ToneConfig; index: number }) => {
    const content = toneVariants?.[item.type]?.content || '';

    return (
      <View style={[styles.toneCard, { width: CONTENT_WIDTH }]}>
        <View style={[styles.toneCardHeader, { borderBottomColor: item.color }]}>
          <Text style={styles.toneEmoji}>{item.emoji}</Text>
          <View style={styles.toneLabelContainer}>
            <Text style={[styles.toneLabel, { color: item.color }]}>{item.label}</Text>
            <Text style={styles.toneDescription}>{item.description}</Text>
          </View>
        </View>
        <ScrollView
          style={styles.toneContentScroll}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <Text style={styles.toneContent}>{content}</Text>
        </ScrollView>
      </View>
    );
  }, [toneVariants, styles]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleClose}
          activeOpacity={1}
          disabled={isGenerating}
        />
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.headerIcon}>✨</Text>
            <Text style={styles.headerTitle}>Same Wisdom, Different Voices</Text>
            <Text style={styles.headerSubtitle}>
              Swipe to discover your preferred communication style
            </Text>
          </View>

          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Generating 3 unique perspectives...</Text>
              <Text style={styles.loadingSubtext}>This may take a moment</Text>
            </View>
          ) : toneVariants ? (
            <>
              {/* Swipeable Content */}
              <View style={styles.carouselContainer}>
                <FlatList
                  ref={flatListRef}
                  data={TONE_CONFIGS}
                  renderItem={renderToneContent}
                  keyExtractor={(item) => item.type}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  getItemLayout={(_, index) => ({
                    length: CONTENT_WIDTH,
                    offset: CONTENT_WIDTH * index,
                    index,
                  })}
                  snapToInterval={CONTENT_WIDTH}
                  decelerationRate="fast"
                />
              </View>

              {/* Dot Indicators */}
              <View style={styles.dotsContainer}>
                {TONE_CONFIGS.map((config, index) => (
                  <TouchableOpacity
                    key={config.type}
                    onPress={() => handleDotPress(index)}
                    style={[
                      styles.dot,
                      currentIndex === index && {
                        backgroundColor: config.color,
                        width: 24,
                      },
                    ]}
                    testID={`tone-dot-${config.type}`}
                  />
                ))}
              </View>

              {/* Tone Selector Pills */}
              <View style={styles.tonePillsContainer}>
                {TONE_CONFIGS.map((config, index) => (
                  <TouchableOpacity
                    key={config.type}
                    style={[
                      styles.tonePill,
                      currentIndex === index && {
                        borderColor: config.color,
                        backgroundColor: withAlpha(config.color, 0.1),
                      },
                    ]}
                    onPress={() => handleDotPress(index)}
                    testID={`tone-pill-${config.type}`}
                  >
                    <Text style={styles.tonePillEmoji}>{config.emoji}</Text>
                    <Text
                      style={[
                        styles.tonePillText,
                        currentIndex === index && { color: config.color },
                      ]}
                    >
                      {config.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Action Buttons */}
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  { backgroundColor: TONE_CONFIGS[currentIndex].color },
                ]}
                onPress={handleSelectCurrent}
                testID="tone-select-btn"
              >
                <Text style={styles.selectButtonText}>
                  Use {TONE_CONFIGS[currentIndex].label} Response
                </Text>
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
            disabled={isGenerating}
            testID="tone-variants-cancel"
          >
            <Text style={[styles.cancelButtonText, isGenerating && styles.cancelButtonTextDisabled]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: withAlpha(COLORS.black, 0.6),
    },
    modalContainer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING['4xl'],
      maxHeight: '90%',
      ...SHADOWS.lg,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: RADII.full,
      alignSelf: 'center',
      marginTop: SPACING.md,
      marginBottom: SPACING.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    headerIcon: {
      fontSize: 40,
      marginBottom: SPACING.sm,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: SPACING['4xl'],
    },
    loadingText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginTop: SPACING.lg,
    },
    loadingSubtext: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: SPACING.xs,
    },
    carouselContainer: {
      height: 280,
      marginBottom: SPACING.md,
    },
    toneCard: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.lg,
      overflow: 'hidden',
      marginHorizontal: 0,
      height: '100%',
    },
    toneCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SPACING.md,
      borderBottomWidth: 2,
      gap: SPACING.sm,
    },
    toneEmoji: {
      fontSize: 28,
    },
    toneLabelContainer: {
      flex: 1,
    },
    toneLabel: {
      fontSize: 18,
      fontWeight: '700',
    },
    toneDescription: {
      fontSize: 12,
      color: colors.textMuted,
    },
    toneContentScroll: {
      flex: 1,
      padding: SPACING.md,
    },
    toneContent: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.text,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.sm,
      marginBottom: SPACING.md,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
    },
    tonePillsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: SPACING.sm,
      marginBottom: SPACING.lg,
    },
    tonePill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.full,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
      gap: SPACING.xs,
    },
    tonePillEmoji: {
      fontSize: 14,
    },
    tonePillText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    selectButton: {
      borderRadius: RADII.full,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    selectButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.white,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: SPACING.sm,
    },
    cancelButtonText: {
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
    },
    cancelButtonTextDisabled: {
      opacity: 0.5,
    },
  });
