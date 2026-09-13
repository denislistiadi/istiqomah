import { db } from './db';
import { DEFAULT_HABITS, DEFAULT_SETTINGS, DEFAULT_QURAN_STATE } from './constants';

export async function exportUserData(): Promise<string> {
  const settings = await db.settings.toArray();
  const habits = await db.habits.toArray();
  const dailyLogs = await db.dailyLogs.toArray();
  const quranState = await db.quranState.toArray();

  const exportPayload = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    settings,
    habits,
    dailyLogs,
    quranState,
  };

  return JSON.stringify(exportPayload, null, 2);
}

export function downloadJsonFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importUserData(jsonString: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonString);

    if (!data.settings || !data.habits || !data.dailyLogs) {
      throw new Error('Format berkas cadangan tidak valid');
    }

    await db.transaction('rw', [db.settings, db.habits, db.dailyLogs, db.quranState], async () => {
      await db.settings.clear();
      await db.settings.bulkAdd(data.settings);

      await db.habits.clear();
      await db.habits.bulkAdd(data.habits);

      await db.dailyLogs.clear();
      await db.dailyLogs.bulkAdd(data.dailyLogs);

      if (data.quranState && data.quranState.length > 0) {
        await db.quranState.clear();
        await db.quranState.bulkAdd(data.quranState);
      }
    });

    return true;
  } catch (error) {
    console.error('Failed to import user data:', error);
    throw error;
  }
}

export async function resetAllData(): Promise<void> {
  await db.transaction('rw', [db.settings, db.habits, db.dailyLogs, db.quranState, db.ayahs], async () => {
    await db.settings.clear();
    await db.settings.add(DEFAULT_SETTINGS);

    await db.habits.clear();
    await db.habits.bulkAdd(DEFAULT_HABITS);

    await db.dailyLogs.clear();

    await db.quranState.clear();
    await db.quranState.add(DEFAULT_QURAN_STATE);

    await db.ayahs.clear();
  });
}
