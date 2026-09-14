import { logError } from './logger';
import { logWarn } from './logger';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    logWarn('Notification API is not supported in this browser.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  try {
    new Notification(title, {
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      ...options,
    });
  } catch (err) {
    logError('Failed to trigger notification:', err);
  }
}

export function scheduleDailyNotification(timeString: string, title: string, body: string): number | null {
  const [hours, minutes] = timeString.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  const timeoutId = window.setTimeout(() => {
    showNotification(title, { body });
    // Reschedule for next day
    scheduleDailyNotification(timeString, title, body);
  }, delay);

  return timeoutId;
}
