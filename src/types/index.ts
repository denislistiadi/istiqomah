export type GeminiModel =
  | 'gemini-3.6-flash'
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro';

export interface GeminiModelOption {
  value: GeminiModel;
  label: string;
  description: string;
  badge?: string;
  isPaidRecommended?: boolean;
}

export const GEMINI_MODELS: GeminiModelOption[] = [
  {
    value: 'gemini-3.6-flash',
    label: 'Gemini 3.6 Flash',
    description: 'Model generasi terbaru. Respons kilat, pemahaman hadis tajam, dan 100% gratis kuota harian dari Google.',
    badge: 'Gratis (Rekomendasi)',
  },
  {
    value: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    description: 'Model alternatif yang stabil dan ringan. Gratis kuota harian dari Google.',
    badge: 'Gratis',
  },
  {
    value: 'gemini-2.5-pro',
    label: 'Gemini 2.5 Pro',
    description: 'Penalaran paling mendalam untuk telaah komprehensif (khusus API Key tier berbayar / Pay-as-you-go).',
    badge: 'Berbayar (Pro)',
    isPaidRecommended: true,
  },
];

export interface Settings {
  id: string; // 'main'
  theme: 'dark' | 'light' | 'system';
  encryptedApiKey?: string;
  apiKeySalt?: string;
  apiKeyIv?: string;
  geminiModel: GeminiModel;
  notificationsEnabled: boolean;
  subuhTime: string; // '04:30'
  maghribTime: string; // '18:00'
  userName?: string;
  streakFrozenUntil?: string;
}

export type HabitCategory = 'wajib' | 'sunnah' | 'dzikir';
export type TimeOfDay = 'subuh' | 'siang' | 'maghrib' | 'malam' | 'kapanpun';

export interface PrayerData {
  arabic: string;
  latin: string;
  translation: string;
  source: string;
  benefit?: string;
}

export interface SavedPrayer extends PrayerData {
  id: string;
  title: string;
  category?: string;
  createdAt: string;
  habitId?: string;
}

export interface Habit {
  id: string;
  title: string;
  category: HabitCategory;
  timeOfDay: TimeOfDay;
  description?: string;
  isCustom: boolean;
  createdAt: string;
  order: number;
  prayerData?: PrayerData;
}

export interface DailyLog {
  id?: number;
  date: string; // 'YYYY-MM-DD'
  habitId: string;
  completed: boolean;
  completedAt: string;
}

export interface QuranState {
  id: string; // 'main'
  lastReadSurah: number;
  lastReadAyah: number;
  lastReadSurahName: string;
  lastReadTimestamp: string;
  totalAyahsRead: number;
  khatamCount: number;
}

export type QuranReadingMode = 'full' | 'arabic-only' | 'arabic-translation';

export interface Ayah {
  number: number; // 1 to 6236
  numberInSurah: number;
  juz: number;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  arabicText: string;
  tajweedText?: string;
  latinText: string;
  translation: string;
}

export interface TajweedSegment {
  text: string;
  tag?: string;
  rule?: TajweedRule;
}

export interface TajweedRule {
  id: string;
  tag: string;
  name: string;
  arabicName: string;
  category: string;
  colorName: string;
  colorHex: string;
  textColorClass: string;
  bgColorClass: string;
  borderColorClass: string;
  description: string;
  howToRead: string;
  harakat: string;
  letters?: string[];
  exampleArabic: string;
  exampleTrans: string;
}

export interface TajweedCategory {
  id: string;
  title: string;
  description: string;
  rules: TajweedRule[];
}

export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: 'streak' | 'quran' | 'general';
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  hadithQuote: string;
  hadithSource: string;
}

export interface GeminiPrayerResponse {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
  category: string;
  benefit: string;
}
