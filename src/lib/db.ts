import Dexie, { type EntityTable } from 'dexie';
import { Settings, Habit, DailyLog, QuranState, Ayah } from '@/types';
import { DEFAULT_HABITS, DEFAULT_SETTINGS, DEFAULT_QURAN_STATE } from './constants';

export class IstiqomahDatabase extends Dexie {
  settings!: EntityTable<Settings, 'id'>;
  habits!: EntityTable<Habit, 'id'>;
  dailyLogs!: EntityTable<DailyLog, 'id'>;
  quranState!: EntityTable<QuranState, 'id'>;
  ayahs!: EntityTable<Ayah, 'number'>;

  constructor() {
    super('IstiqomahDB');

    this.version(1).stores({
      settings: 'id',
      habits: 'id, category, timeOfDay, order',
      dailyLogs: '++id, date, habitId, completed, [date+habitId]',
      quranState: 'id',
      ayahs: 'number, surahNumber, juz, numberInSurah',
    });

    this.on('populate', () => {
      this.settings.add(DEFAULT_SETTINGS);
      this.habits.bulkAdd(DEFAULT_HABITS);
      this.quranState.add(DEFAULT_QURAN_STATE);
    });
  }
}

export const db = new IstiqomahDatabase();

// Initializer to ensure default data exists even if database was created without populate trigger
export async function ensureInitialDbData() {
  try {
    const settingsCount = await db.settings.count();
    if (settingsCount === 0) {
      await db.settings.add(DEFAULT_SETTINGS);
    }

    const habitsCount = await db.habits.count();
    if (habitsCount === 0) {
      await db.habits.bulkAdd(DEFAULT_HABITS);
    }

    const quranStateCount = await db.quranState.count();
    if (quranStateCount === 0) {
      await db.quranState.add(DEFAULT_QURAN_STATE);
    }
  } catch (error) {
    console.error('Error initializing default database data:', error);
  }
}
