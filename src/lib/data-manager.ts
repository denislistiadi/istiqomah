import { db } from './db';
import { DEFAULT_HABITS, DEFAULT_SETTINGS, DEFAULT_QURAN_STATE } from './constants';
import { logError } from './logger';

// SEC-01: Strip sensitive cryptographic material from export payload
export async function exportUserData(): Promise<string> {
  const settings = await db.settings.toArray();
  const habits = await db.habits.toArray();
  const dailyLogs = await db.dailyLogs.toArray();
  const quranState = await db.quranState.toArray();

  const sanitizedSettings = settings.map(s => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encryptedApiKey, apiKeySalt, apiKeyIv, ...safe } = s;
    return safe;
  });

  const exportPayload = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    settings: sanitizedSettings,
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

// SEC-03: Schema validation helpers for imported data
const VALID_CATEGORIES: readonly string[] = ['wajib', 'sunnah', 'dzikir'];
const VALID_TIMES: readonly string[] = ['subuh', 'siang', 'maghrib', 'malam', 'kapanpun'];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const MAX_STRING_LEN = 500;

function isSafeObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val) && !('__proto__' in val);
}

function isValidHabit(h: unknown): boolean {
  if (!isSafeObject(h)) return false;
  return (
    typeof h.id === 'string' && h.id.length < MAX_STRING_LEN &&
    typeof h.title === 'string' && h.title.length < MAX_STRING_LEN &&
    VALID_CATEGORIES.includes(h.category as string) &&
    VALID_TIMES.includes(h.timeOfDay as string) &&
    typeof h.isCustom === 'boolean' &&
    typeof h.order === 'number' && Number.isFinite(h.order)
  );
}

function isValidDailyLog(log: unknown): boolean {
  if (!isSafeObject(log)) return false;
  return (
    typeof log.date === 'string' && DATE_REGEX.test(log.date) &&
    typeof log.habitId === 'string' && log.habitId.length < MAX_STRING_LEN &&
    typeof log.completed === 'boolean'
  );
}

function isValidSettings(s: unknown): boolean {
  if (!isSafeObject(s)) return false;
  return typeof s.id === 'string' && s.id === 'main';
}

function isValidQuranState(qs: unknown): boolean {
  if (!isSafeObject(qs)) return false;
  return (
    typeof qs.id === 'string' && qs.id === 'main' &&
    typeof qs.totalAyahsRead === 'number' && Number.isFinite(qs.totalAyahsRead)
  );
}

export async function importUserData(jsonString: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonString);

    if (!Array.isArray(data.settings) || !Array.isArray(data.habits) || !Array.isArray(data.dailyLogs)) {
      throw new Error('Format berkas cadangan tidak valid');
    }

    // SEC-03: Validate and sanitize all records
    const validSettings = data.settings.filter(isValidSettings);
    const validHabits = data.habits.filter(isValidHabit);
    const validDailyLogs = data.dailyLogs.filter(isValidDailyLog);
    const validQuranState = Array.isArray(data.quranState)
      ? data.quranState.filter(isValidQuranState)
      : [];

    if (validSettings.length === 0) {
      throw new Error('Tidak ditemukan data pengaturan yang valid dalam berkas cadangan');
    }

    // SEC-01: Strip crypto material from imported settings to prevent overwrite injection
    const sanitizedSettings = validSettings.map((s: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { encryptedApiKey, apiKeySalt, apiKeyIv, ...safe } = s;
      return safe;
    });

    await db.transaction('rw', [db.settings, db.habits, db.dailyLogs, db.quranState], async () => {
      await db.settings.clear();
      await db.settings.bulkAdd(sanitizedSettings);

      await db.habits.clear();
      if (validHabits.length > 0) await db.habits.bulkAdd(validHabits);

      await db.dailyLogs.clear();
      if (validDailyLogs.length > 0) await db.dailyLogs.bulkAdd(validDailyLogs);

      if (validQuranState.length > 0) {
        await db.quranState.clear();
        await db.quranState.bulkAdd(validQuranState);
      }
    });

    return true;
  } catch (error) {
    logError('Failed to import user data:', error);
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

