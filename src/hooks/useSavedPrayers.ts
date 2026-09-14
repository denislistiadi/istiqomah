import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { SavedPrayer } from '@/types';

export function useSavedPrayers() {
  const savedPrayers = useLiveQuery(
    () => db.savedPrayers.reverse().sortBy('createdAt'),
    []
  );

  const savePrayer = async (
    prayerData: Omit<SavedPrayer, 'id' | 'createdAt'> & { id?: string }
  ): Promise<SavedPrayer> => {
    // Check if prayer with same title already exists
    const existing = prayerData.id
      ? await db.savedPrayers.get(prayerData.id)
      : await db.savedPrayers.where('title').equalsIgnoreCase(prayerData.title.trim()).first();

    if (existing) {
      const updated: SavedPrayer = {
        ...existing,
        ...prayerData,
        id: existing.id,
        title: prayerData.title.trim(),
        createdAt: existing.createdAt,
      };
      await db.savedPrayers.put(updated);
      return updated;
    }

    const newPrayer: SavedPrayer = {
      id: `prayer-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: prayerData.title.trim(),
      arabic: prayerData.arabic,
      latin: prayerData.latin,
      translation: prayerData.translation,
      source: prayerData.source,
      benefit: prayerData.benefit,
      category: prayerData.category || 'Doa & Dzikir',
      createdAt: new Date().toISOString(),
      habitId: prayerData.habitId,
    };

    await db.savedPrayers.add(newPrayer);
    return newPrayer;
  };

  const deleteSavedPrayer = async (id: string) => {
    await db.savedPrayers.delete(id);
  };

  return {
    savedPrayers: savedPrayers || [],
    isLoading: savedPrayers === undefined,
    savePrayer,
    deleteSavedPrayer,
  };
}
