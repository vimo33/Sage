import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export type ReminderFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';

export interface NotificationPreferences {
  enabled: boolean;
  reminderTime: string; // HH:MM format (24-hour)
  frequency: ReminderFrequency;
  customDays: number[]; // 1-7 for Sunday-Saturday (1=Sunday, 7=Saturday)
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enabled: false,
  reminderTime: '09:00',
  frequency: 'daily',
  customDays: [1, 2, 3, 4, 5, 6, 7], // All days
};

// Respectful, encouraging reminder messages
const REMINDER_MESSAGES = [
  {
    title: 'A moment for reflection',
    body: 'Take a pause. Your journal awaits when you are ready.',
  },
  {
    title: 'Time for stillness',
    body: 'A few quiet moments can shift your entire day.',
  },
  {
    title: 'Your daily practice',
    body: 'Wisdom grows through small, consistent steps.',
  },
  {
    title: 'A gentle reminder',
    body: 'Your thoughts matter. Consider writing them down.',
  },
  {
    title: 'Space for insight',
    body: 'What wisdom might today offer you?',
  },
  {
    title: 'Check in with yourself',
    body: 'How are you really feeling right now?',
  },
  {
    title: 'A mindful moment',
    body: 'Pause, breathe, and notice what arises.',
  },
  {
    title: 'Your inner compass',
    body: 'Journaling helps you find your way.',
  },
];

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log('[Notifications] Must use physical device for push notifications');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('[Notifications] Permission not granted');
    return false;
  }

  // Android requires a notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Daily Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#37ec13',
      description: 'Gentle reminders for daily check-ins',
    });
  }

  return true;
}

export async function checkNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted';
}

function getRandomMessage(): { title: string; body: string } {
  const index = Math.floor(Math.random() * REMINDER_MESSAGES.length);
  return REMINDER_MESSAGES[index];
}

function parseTime(timeString: string): { hour: number; minute: number } {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour, minute };
}

function getDaysForFrequency(frequency: ReminderFrequency, customDays: number[]): number[] {
  switch (frequency) {
    case 'daily':
      return [1, 2, 3, 4, 5, 6, 7];
    case 'weekdays':
      return [2, 3, 4, 5, 6]; // Monday-Friday
    case 'weekends':
      return [1, 7]; // Sunday and Saturday
    case 'custom':
      return customDays;
    default:
      return [1, 2, 3, 4, 5, 6, 7];
  }
}

export async function scheduleNotifications(
  preferences: NotificationPreferences
): Promise<string[]> {
  // Cancel all existing scheduled notifications first
  await cancelAllNotifications();

  if (!preferences.enabled) {
    return [];
  }

  const hasPermission = await checkNotificationPermissions();
  if (!hasPermission) {
    console.log('[Notifications] Cannot schedule - no permission');
    return [];
  }

  const { hour, minute } = parseTime(preferences.reminderTime);
  const days = getDaysForFrequency(preferences.frequency, preferences.customDays);
  const scheduledIds: string[] = [];

  // Schedule a notification for each day
  for (const weekday of days) {
    const message = getRandomMessage();

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: message.title,
        body: message.body,
        data: { type: 'daily_reminder' },
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday,
        hour,
        minute,
      },
    });

    scheduledIds.push(identifier);
  }

  console.log(`[Notifications] Scheduled ${scheduledIds.length} notifications`);
  return scheduledIds;
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('[Notifications] Cancelled all scheduled notifications');
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return Notifications.getAllScheduledNotificationsAsync();
}

export function formatTimeForDisplay(time: string): string {
  const { hour, minute } = parseTime(time);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

export function getFrequencyLabel(frequency: ReminderFrequency): string {
  switch (frequency) {
    case 'daily':
      return 'Every day';
    case 'weekdays':
      return 'Weekdays only';
    case 'weekends':
      return 'Weekends only';
    case 'custom':
      return 'Custom days';
    default:
      return 'Every day';
  }
}

export function getDayName(day: number): string {
  const days = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day] || '';
}

export function getFullDayName(day: number): string {
  const days = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day] || '';
}
