import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';
import dayjs from 'dayjs';

const BIRTH_DATE = dayjs('2025-02-18');

// Helper function to request notification permission (Android 13+)
async function requestNotificationPermissionIfNeeded() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export async function checkAndNotifyMonthComplete() {
  const today = dayjs();
  const monthsCompleted = today.diff(BIRTH_DATE, 'month');
  const isExactAnniversary = BIRTH_DATE.add(monthsCompleted, 'month').isSame(today, 'day');

  if (isExactAnniversary) {
    const key = `monthNotification-${monthsCompleted}`;
    const alreadyNotified = await AsyncStorage.getItem(key);

    if (!alreadyNotified) {
      const permissionGranted = await requestNotificationPermissionIfNeeded();
      if (!permissionGranted) return;

      await notifee.requestPermission(); // Handles iOS and fallback

      await notifee.createChannel({
        id: 'milestones',
        name: 'Baby Milestones',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: '🎉 Congratulations Gautam & Nici!',
        body: `Your baby is now ${monthsCompleted} month${monthsCompleted > 1 ? 's' : ''} old! 🍼👶`,
        android: {
          channelId: 'milestones',
          smallIcon: 'ic_launcher', // Make sure this icon exists
          pressAction: {
            id: 'default',
          },
        },
      });

      await AsyncStorage.setItem(key, 'sent');
    }
  }
}
