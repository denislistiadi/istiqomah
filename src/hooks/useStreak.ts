import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { calculateStreak, getTodayDateString } from '@/lib/streak';

export function useStreak() {
  const allLogs = useLiveQuery(() => db.dailyLogs.toArray(), []);
  const habits = useLiveQuery(() => db.habits.toArray(), []);
  const today = getTodayDateString();

  const streakData = useMemo(() => {
    return calculateStreak(allLogs || []);
  }, [allLogs]);

  const todayCompletion = useMemo(() => {
    if (!allLogs || !habits || habits.length === 0) {
      return { completedCount: 0, totalCount: habits?.length || 0, percentage: 0 };
    }

    const todayLogs = allLogs.filter(l => l.date === today && l.completed);
    const completedHabitIds = new Set(todayLogs.map(l => l.habitId));
    
    // Only count active habits
    const validCompleted = habits.filter(h => completedHabitIds.has(h.id)).length;
    const total = habits.length;
    const percentage = total > 0 ? Math.round((validCompleted / total) * 100) : 0;

    return {
      completedCount: validCompleted,
      totalCount: total,
      percentage,
    };
  }, [allLogs, habits, today]);

  return {
    ...streakData,
    todayCompletion,
    isLoading: allLogs === undefined || habits === undefined,
  };
}
