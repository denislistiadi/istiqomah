import { DailyLog } from '@/types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateIndonesian(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

export function calculateStreak(dailyLogs: DailyLog[]): {
  currentStreak: number;
  longestStreak: number;
  activeDaysCount: number;
} {
  if (!dailyLogs || dailyLogs.length === 0) {
    return { currentStreak: 0, longestStreak: 0, activeDaysCount: 0 };
  }

  // Filter completed logs and extract unique dates
  const completedLogs = dailyLogs.filter(log => log.completed);
  const uniqueDates = Array.from(new Set(completedLogs.map(log => log.date))).sort();

  if (uniqueDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, activeDaysCount: 0 };
  }

  const today = getTodayDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  const dateSet = new Set(uniqueDates);

  // Check if today or yesterday has activity
  let currentStreak = 0;
  let checkDate = dateSet.has(today) ? new Date() : (dateSet.has(yesterday) ? yesterdayDate : null);

  if (checkDate) {
    const cur = new Date(checkDate);
    while (true) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      const dStr = `${y}-${m}-${d}`;

      if (dateSet.has(dStr)) {
        currentStreak++;
        cur.setDate(cur.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let running = 0;
  let prevDate: Date | null = null;

  for (const dStr of uniqueDates) {
    const cur = new Date(dStr + 'T00:00:00');
    if (!prevDate) {
      running = 1;
    } else {
      const diffTime = cur.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        running++;
      } else if (diffDays > 1) {
        running = 1;
      }
    }
    if (running > longestStreak) {
      longestStreak = running;
    }
    prevDate = cur;
  }

  return {
    currentStreak,
    longestStreak,
    activeDaysCount: uniqueDates.length,
  };
}
