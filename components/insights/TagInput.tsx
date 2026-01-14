import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../../lib/ui/theme';
import { TagChip } from './TagChip';

interface TagInputProps {
  currentTags: string[];
  allTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  testID?: string;
}

export function TagInput({
  currentTags,
  allTags,
  onAddTag,
  onRemoveTag,
  testID,
}: TagInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input and exclude already added tags
  const suggestions = allTags
    .filter((tag) => !currentTags.includes(tag))
    .filter((tag) =>
      inputValue.trim() === '' || tag.toLowerCase().includes(inputValue.toLowerCase().trim())
    )
    .slice(0, 5);

  const handleAddTag = useCallback(() => {
    const tag = inputValue.trim().toLowerCase();
    if (tag && !currentTags.includes(tag)) {
      onAddTag(tag);
      setInputValue('');
      setShowSuggestions(false);
    }
  }, [inputValue, currentTags, onAddTag]);

  const handleSelectSuggestion = useCallback(
    (tag: string) => {
      if (!currentTags.includes(tag)) {
        onAddTag(tag);
      }
      setInputValue('');
      setShowSuggestions(false);
    },
    [currentTags, onAddTag]
  );

  const handleInputFocus = useCallback(() => {
    setShowSuggestions(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow tap on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  }, []);

  return (
    <View style={styles.container} testID={testID}>
      {/* Current Tags */}
      {currentTags.length > 0 && (
        <View style={styles.tagsContainer}>
          {currentTags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              removable
              onRemove={() => onRemoveTag(tag)}
              size="medium"
              testID={`tag-chip-${tag}`}
            />
          ))}
        </View>
      )}

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Add a tag..."
          placeholderTextColor={colors.textMuted}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onSubmitEditing={handleAddTag}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID ? `${testID}-input` : undefined}
        />
        {inputValue.trim() && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTag}
            testID={testID ? `${testID}-add-button` : undefined}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsLabel}>SUGGESTIONS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsScroll}
          >
            {suggestions.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                onPress={() => handleSelectSuggestion(tag)}
                size="small"
                testID={`tag-suggestion-${tag}`}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      gap: SPACING.md,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.sm,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    input: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      color: colors.text,
      fontSize: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    addButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
    },
    addButtonText: {
      color: COLORS.primaryText,
      fontWeight: '600',
      fontSize: 14,
    },
    suggestionsContainer: {
      marginTop: SPACING.xs,
    },
    suggestionsLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.xs,
    },
    suggestionsScroll: {
      gap: SPACING.sm,
    },
  });
