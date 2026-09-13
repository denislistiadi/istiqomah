import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Habit, HabitCategory, TimeOfDay } from '@/types';

export function useHabits() {
  const habits = useLiveQuery(
    () => db.habits.orderBy('order').toArray(),
    []
  );

  const addHabit = async (habitData: {
    title: string;
    category: HabitCategory;
    timeOfDay: TimeOfDay;
    description?: string;
  }) => {
    const currentCount = (await db.habits.count()) || 0;
    const newHabit: Habit = {
      id: `custom-${Date.now()}`,
      title: habitData.title.trim(),
      category: habitData.category,
      timeOfDay: habitData.timeOfDay,
      description: habitData.description?.trim(),
      isCustom: true,
      createdAt: new Date().toISOString(),
      order: currentCount + 1,
    };

    await db.habits.add(newHabit);
    return newHabit;
  };

  const deleteHabit = async (habitId: string) => {
    await db.habits.delete(habitId);
    // Also delete today's log for this habit if any
    const todayLogs = await db.dailyLogs.where('habitId').equals(habitId).toArray();
    if (todayLogs.length > 0) {
      await db.dailyLogs.where('habitId').equals(habitId).delete();
    }
  };

  return {
    habits: habits || [],
    isLoading: habits === undefined,
    addHabit,
    deleteHabit,
  };
}
