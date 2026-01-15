/**
 * JournalCalendarModal Component
 *
 * A bottom-slide modal for selecting month and year
 * Features:
 * - Month grid selector
 * - Year navigation (previous/next)
 * - Current month highlight
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  getThemedColors,
  withAlpha,
  SIZES,
} from '../../lib/ui/theme';

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

export interface JournalCalendarModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Currently selected date */
  selectedDate: Date;
  /** Handler when a month/year is selected */
  onSelect: (date: Date) => void;
  /** Handler to close the modal */
  onClose: () => void;
  /** Test ID for testing */
  testID?: string;
}

export function JournalCalendarModal({
  visible,
  selectedDate,
  onSelect,
  onClose,
  testID = 'journal-calendar-modal',
}: JournalCalendarModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [viewingYear, setViewingYear] = useState(selectedDate.getFullYear());

  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const handlePreviousYear = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewingYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewingYear((prev) => prev + 1);
  };

  const handleMonthSelect = (monthIndex: number) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newDate = new Date(viewingYear, monthIndex, 1);
    onSelect(newDate);
  };

  const handleGoToToday = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setViewingYear(currentYear);
    onSelect(new Date());
  };

  // Reset viewing year when modal opens
  React.useEffect(() => {
    if (visible) {
      setViewingYear(selectedDate.getFullYear());
    }
  }, [visible, selectedDate]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={testID}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
        testID={`${testID}-overlay`}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              testID={`${testID}-close-btn`}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Month</Text>
            <TouchableOpacity
              style={styles.todayButton}
              onPress={handleGoToToday}
              testID={`${testID}-today-btn`}
            >
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          </View>

          {/* Year Selector */}
          <View style={styles.yearSelector}>
            <TouchableOpacity
              style={styles.yearNavButton}
              onPress={handlePreviousYear}
              testID={`${testID}-prev-year-btn`}
            >
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.yearText}>{viewingYear}</Text>
            <TouchableOpacity
              style={styles.yearNavButton}
              onPress={handleNextYear}
              testID={`${testID}-next-year-btn`}
            >
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Month Grid */}
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.monthGrid}
            showsVerticalScrollIndicator={false}
          >
            {MONTHS.map((month, index) => {
              const isCurrentMonth = index === currentMonth && viewingYear === currentYear;
              const isSelectedMonth = index === selectedMonth && viewingYear === selectedYear;

              return (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthButton,
                    isSelectedMonth && styles.monthButtonSelected,
                    isCurrentMonth && !isSelectedMonth && styles.monthButtonCurrent,
                  ]}
                  onPress={() => handleMonthSelect(index)}
                  testID={`${testID}-month-${index}`}
                >
                  <Text
                    style={[
                      styles.monthText,
                      isSelectedMonth && styles.monthTextSelected,
                      isCurrentMonth && !isSelectedMonth && styles.monthTextCurrent,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  _isDark: boolean
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withAlpha(COLORS.black, 0.5),
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      maxHeight: '60%',
      paddingBottom: SPACING.xxxl,
      ...SHADOWS.lg,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    closeButton: {
      minWidth: 60,
    },
    closeButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.primary,
      fontWeight: '600',
    },
    headerTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    todayButton: {
      minWidth: 60,
      alignItems: 'flex-end',
    },
    todayButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.primary,
      fontWeight: '600',
    },
    yearSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      gap: SPACING.xl,
    },
    yearNavButton: {
      width: SIZES.tapTarget,
      height: SIZES.tapTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yearText: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      minWidth: 100,
      textAlign: 'center',
    },
    scrollContainer: {
      flexGrow: 0,
    },
    monthGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.lg,
    },
    monthButton: {
      width: '33.33%',
      paddingVertical: SPACING.lg,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RADII.md,
    },
    monthButtonSelected: {
      backgroundColor: COLORS.primary,
    },
    monthButtonCurrent: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
    },
    monthText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    monthTextSelected: {
      color: COLORS.primaryText,
      fontWeight: '700',
    },
    monthTextCurrent: {
      color: COLORS.primary,
      fontWeight: '600',
    },
  });

export default JournalCalendarModal;
