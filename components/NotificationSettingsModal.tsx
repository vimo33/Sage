import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';
import {
  type ReminderFrequency,
  formatTimeForDisplay,
  getFrequencyLabel,
} from '../lib/notifications';

interface NotificationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

const FREQUENCIES: { id: ReminderFrequency; label: string; description: string }[] = [
  { id: 'daily', label: 'Every day', description: 'Receive reminders daily' },
  { id: 'weekdays', label: 'Weekdays', description: 'Monday through Friday' },
  { id: 'weekends', label: 'Weekends', description: 'Saturday and Sunday only' },
  { id: 'custom', label: 'Custom', description: 'Choose specific days' },
];

const DAYS = [
  { id: 1, short: 'S', full: 'Sunday' },
  { id: 2, short: 'M', full: 'Monday' },
  { id: 3, short: 'T', full: 'Tuesday' },
  { id: 4, short: 'W', full: 'Wednesday' },
  { id: 5, short: 'T', full: 'Thursday' },
  { id: 6, short: 'F', full: 'Friday' },
  { id: 7, short: 'S', full: 'Saturday' },
];

export function NotificationSettingsModal({
  visible,
  onClose,
}: NotificationSettingsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const notificationPermissionGranted = useSageStore((s) => s.notificationPermissionGranted);
  const setNotificationPreferences = useSageStore((s) => s.setNotificationPreferences);

  const notifPrefs = preferences.notificationPreferences;

  // Local state for time picker
  const [selectedHour, setSelectedHour] = useState(() => {
    const [h] = notifPrefs.reminderTime.split(':').map(Number);
    return h;
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    const [, m] = notifPrefs.reminderTime.split(':').map(Number);
    // Round to nearest 15 minutes
    return Math.round(m / 15) * 15;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Update local state when preferences change
  useEffect(() => {
    const [h, m] = notifPrefs.reminderTime.split(':').map(Number);
    setSelectedHour(h);
    setSelectedMinute(Math.round(m / 15) * 15);
  }, [notifPrefs.reminderTime]);

  const handleToggleEnabled = useCallback(async (enabled: boolean) => {
    await setNotificationPreferences({ enabled });
  }, [setNotificationPreferences]);

  const handleFrequencyChange = useCallback(async (frequency: ReminderFrequency) => {
    await setNotificationPreferences({ frequency });
  }, [setNotificationPreferences]);

  const handleTimeChange = useCallback(async () => {
    const hour = selectedHour.toString().padStart(2, '0');
    const minute = selectedMinute.toString().padStart(2, '0');
    await setNotificationPreferences({ reminderTime: `${hour}:${minute}` });
    setShowTimePicker(false);
  }, [selectedHour, selectedMinute, setNotificationPreferences]);

  const handleToggleDay = useCallback(async (dayId: number) => {
    const currentDays = notifPrefs.customDays;
    let newDays: number[];

    if (currentDays.includes(dayId)) {
      newDays = currentDays.filter((d) => d !== dayId);
    } else {
      newDays = [...currentDays, dayId].sort((a, b) => a - b);
    }

    // Ensure at least one day is selected
    if (newDays.length === 0) {
      return;
    }

    await setNotificationPreferences({ customDays: newDays, frequency: 'custom' });
  }, [notifPrefs.customDays, setNotificationPreferences]);

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reminders</Text>
            <TouchableOpacity
              testID="notification-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Enable/Disable Toggle */}
            <View style={styles.section}>
              <View style={styles.row}>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Daily Reminders</Text>
                  <Text style={styles.rowSublabel}>
                    Gentle nudges for your practice
                  </Text>
                </View>
                <Switch
                  testID="notification-enabled-toggle"
                  value={notifPrefs.enabled}
                  onValueChange={handleToggleEnabled}
                  trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                />
              </View>

              {!notificationPermissionGranted && notifPrefs.enabled && (
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    Notification permission is required. Please enable it in your device settings.
                  </Text>
                </View>
              )}
            </View>

            {notifPrefs.enabled && (
              <>
                {/* Time Selection */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Reminder Time</Text>
                  <TouchableOpacity
                    testID="notification-time-picker"
                    style={styles.timeButton}
                    onPress={() => setShowTimePicker(!showTimePicker)}
                  >
                    <Text style={styles.timeButtonText}>
                      {formatTimeForDisplay(notifPrefs.reminderTime)}
                    </Text>
                    <Text style={styles.timeButtonArrow}>
                      {showTimePicker ? '^' : 'v'}
                    </Text>
                  </TouchableOpacity>

                  {showTimePicker && (
                    <View style={styles.timePicker}>
                      <View style={styles.timePickerRow}>
                        <View style={styles.timePickerColumn}>
                          <Text style={styles.timePickerLabel}>Hour</Text>
                          <ScrollView
                            style={styles.timePickerScroll}
                            showsVerticalScrollIndicator={false}
                          >
                            {HOURS.map((hour) => (
                              <TouchableOpacity
                                key={hour}
                                style={[
                                  styles.timePickerItem,
                                  selectedHour === hour && styles.timePickerItemActive,
                                ]}
                                onPress={() => setSelectedHour(hour)}
                              >
                                <Text
                                  style={[
                                    styles.timePickerItemText,
                                    selectedHour === hour && styles.timePickerItemTextActive,
                                  ]}
                                >
                                  {hour.toString().padStart(2, '0')}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                        <Text style={styles.timePickerSeparator}>:</Text>
                        <View style={styles.timePickerColumn}>
                          <Text style={styles.timePickerLabel}>Minute</Text>
                          <ScrollView
                            style={styles.timePickerScroll}
                            showsVerticalScrollIndicator={false}
                          >
                            {MINUTES.map((minute) => (
                              <TouchableOpacity
                                key={minute}
                                style={[
                                  styles.timePickerItem,
                                  selectedMinute === minute && styles.timePickerItemActive,
                                ]}
                                onPress={() => setSelectedMinute(minute)}
                              >
                                <Text
                                  style={[
                                    styles.timePickerItemText,
                                    selectedMinute === minute && styles.timePickerItemTextActive,
                                  ]}
                                >
                                  {minute.toString().padStart(2, '0')}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                      <TouchableOpacity
                        testID="notification-time-confirm"
                        style={styles.timeConfirmButton}
                        onPress={handleTimeChange}
                      >
                        <Text style={styles.timeConfirmButtonText}>Set Time</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Frequency Selection */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Frequency</Text>
                  <View style={styles.frequencyList}>
                    {FREQUENCIES.map((freq) => (
                      <TouchableOpacity
                        key={freq.id}
                        testID={`notification-frequency-${freq.id}`}
                        style={[
                          styles.frequencyItem,
                          notifPrefs.frequency === freq.id && styles.frequencyItemActive,
                        ]}
                        onPress={() => handleFrequencyChange(freq.id)}
                      >
                        <View style={styles.frequencyRadio}>
                          {notifPrefs.frequency === freq.id && (
                            <View style={styles.frequencyRadioInner} />
                          )}
                        </View>
                        <View style={styles.frequencyContent}>
                          <Text style={styles.frequencyLabel}>{freq.label}</Text>
                          <Text style={styles.frequencyDescription}>{freq.description}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Custom Days Selection */}
                {notifPrefs.frequency === 'custom' && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Days</Text>
                    <View style={styles.daysRow}>
                      {DAYS.map((day) => (
                        <TouchableOpacity
                          key={day.id}
                          testID={`notification-day-${day.id}`}
                          style={[
                            styles.dayButton,
                            notifPrefs.customDays.includes(day.id) && styles.dayButtonActive,
                          ]}
                          onPress={() => handleToggleDay(day.id)}
                        >
                          <Text
                            style={[
                              styles.dayButtonText,
                              notifPrefs.customDays.includes(day.id) && styles.dayButtonTextActive,
                            ]}
                          >
                            {day.short}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Info Text */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoText}>
                    You'll receive a gentle reminder at {formatTimeForDisplay(notifPrefs.reminderTime)}{' '}
                    {getFrequencyLabel(notifPrefs.frequency).toLowerCase()}.
                  </Text>
                  <Text style={styles.infoTextMuted}>
                    Messages are respectful and non-intrusive.
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      padding: SPACING.xl,
      paddingBottom: 40,
      maxHeight: '85%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    modalCloseBtn: {
      width: 32,
      height: 32,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCloseText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    section: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    rowContent: {
      flex: 1,
      marginRight: SPACING.md,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    rowSublabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    warningBox: {
      backgroundColor: COLORS.warningLight,
      padding: SPACING.md,
      borderRadius: RADII.sm,
      marginTop: SPACING.md,
    },
    warningText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.warning,
    },
    timeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    timeButtonText: {
      fontSize: 24,
      fontWeight: '700',
      color: COLORS.primary,
    },
    timeButtonArrow: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    timePicker: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      marginTop: SPACING.md,
    },
    timePickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timePickerColumn: {
      alignItems: 'center',
    },
    timePickerLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },
    timePickerScroll: {
      height: 120,
      width: 60,
    },
    timePickerItem: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      borderRadius: RADII.sm,
      alignItems: 'center',
    },
    timePickerItemActive: {
      backgroundColor: COLORS.primaryLight,
    },
    timePickerItemText: {
      fontSize: 18,
      color: colors.text,
    },
    timePickerItemTextActive: {
      color: COLORS.primary,
      fontWeight: '700',
    },
    timePickerSeparator: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginHorizontal: SPACING.md,
    },
    timeConfirmButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginTop: SPACING.lg,
    },
    timeConfirmButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    frequencyList: {
      gap: SPACING.sm,
    },
    frequencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    frequencyItemActive: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primaryLight,
    },
    frequencyRadio: {
      width: 20,
      height: 20,
      borderRadius: RADII.full,
      borderWidth: 2,
      borderColor: colors.textMuted,
      marginRight: SPACING.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    frequencyRadioInner: {
      width: 10,
      height: 10,
      borderRadius: RADII.full,
      backgroundColor: COLORS.primary,
    },
    frequencyContent: {
      flex: 1,
    },
    frequencyLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    frequencyDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dayButton: {
      width: 40,
      height: 40,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayButtonActive: {
      backgroundColor: COLORS.primary,
    },
    dayButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    dayButtonTextActive: {
      color: '#FFFFFF',
    },
    infoSection: {
      marginTop: SPACING.md,
      padding: SPACING.lg,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
    },
    infoText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      textAlign: 'center',
    },
    infoTextMuted: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: SPACING.xs,
      fontStyle: 'italic',
    },
  });

export default NotificationSettingsModal;
