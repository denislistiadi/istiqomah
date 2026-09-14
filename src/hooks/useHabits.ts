import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Habit, HabitCategory, TimeOfDay, PrayerData } from '@/types';

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
    prayerData?: PrayerData;
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
      prayerData: habitData.prayerData,
    };

    await db.habits.add(newHabit);
    return newHabit;
  };

  const updateHabit = async (
    habitId: string,
    updates: {
      title: string;
      category?: HabitCategory;
      timeOfDay: TimeOfDay;
      description?: string;
      prayerData?: PrayerData;
    }
  ) => {
    const habit = await db.habits.get(habitId);
    if (!habit) return;

    // Amalan wajib tidak dapat diubah kategorinya
    const category = habit.category === 'wajib' ? 'wajib' : (updates.category ?? habit.category);

    await db.habits.update(habitId, {
      title: updates.title.trim(),
      category,
      timeOfDay: updates.timeOfDay,
      description: updates.description?.trim() || undefined,
      ...(updates.prayerData !== undefined ? { prayerData: updates.prayerData } : {}),
    });
  };

  const deleteHabit = async (habitId: string) => {
    const habit = await db.habits.get(habitId);
    // Amalan wajib tidak dapat dihapus
    if (habit?.category === 'wajib') {
      return;
    }

    await db.habits.delete(habitId);
    // Hapus juga catatan harian terkait amalan ini
    const todayLogs = await db.dailyLogs.where('habitId').equals(habitId).toArray();
    if (todayLogs.length > 0) {
      await db.dailyLogs.where('habitId').equals(habitId).delete();
    }
  };

  return {
    habits: habits || [],
    isLoading: habits === undefined,
    addHabit,
    updateHabit,
    deleteHabit,
  };
}
