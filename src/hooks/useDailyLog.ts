import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { getTodayDateString } from '@/lib/streak';
import { DailyLog } from '@/types';
import { logError } from '@/lib/logger';

export function useDailyLog(selectedDate?: string) {
  const targetDate = selectedDate || getTodayDateString();

  const logs = useLiveQuery(
    () => db.dailyLogs.where('date').equals(targetDate).toArray(),
    [targetDate]
  );

  const allLogs = useLiveQuery(
    () => db.dailyLogs.toArray(),
    []
  );

  const toggleHabit = async (habitId: string) => {
    try {
      const existingLog = await db.dailyLogs
        .where('date')
        .equals(targetDate)
        .and(l => l.habitId === habitId)
        .first();

      if (existingLog) {
        if (existingLog.id !== undefined) {
          await db.dailyLogs.update(existingLog.id, {
            completed: !existingLog.completed,
            completedAt: new Date().toISOString(),
          });
        }
      } else {
        const newLog: DailyLog = {
          date: targetDate,
          habitId,
          completed: true,
          completedAt: new Date().toISOString(),
        };
        await db.dailyLogs.add(newLog);
      }
    } catch (err) {
      logError('Error toggling habit:', err);
    }
  };

  const isHabitCompleted = (habitId: string): boolean => {
    if (!logs) return false;
    const log = logs.find(l => l.habitId === habitId);
    return log ? log.completed : false;
  };

  return {
    todayLogs: logs || [],
    allLogs: allLogs || [],
    targetDate,
    toggleHabit,
    isHabitCompleted,
    isLoading: logs === undefined,
  };
}
