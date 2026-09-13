import { BadgeItem, DailyLog, QuranState } from '@/types';
import { calculateStreak } from './streak';

export const ALL_BADGES: BadgeItem[] = [
  {
    id: 'pemula',
    title: 'Langkah Awal Keberkahan',
    description: 'Menyelesaikan amalan harian pertama Anda di Istiqomah.',
    category: 'general',
    iconName: 'Sparkle',
    isUnlocked: false,
    hadithQuote: 'Amalan yang paling dicintai oleh Allah adalah amalan yang kontinu walaupun sedikit.',
    hadithSource: 'HR. Muslim no. 782',
  },
  {
    id: 'seminggu',
    title: 'Istiqomah 7 Hari',
    description: 'Menjaga rutinitas ibadah tanpa terputus selama satu pekan.',
    category: 'streak',
    iconName: 'Flame',
    isUnlocked: false,
    hadithQuote: 'Barangsiapa beristiqomah di atas perintah Allah, niscaya Allah akan mudahkan urusannya.',
    hadithSource: 'Tafsir Ibn Kathir',
  },
  {
    id: 'sebulan',
    title: 'Pejuang 30 Hari',
    description: 'Mencapai konsistensi ibadah selama 30 hari penuh.',
    category: 'streak',
    iconName: 'Trophy',
    isUnlocked: false,
    hadithQuote: 'Sesungguhnya orang-orang yang berkata: Tuhan kami adalah Allah kemudian mereka beristiqomah, malaikat akan turun kepada mereka.',
    hadithSource: 'QS. Fussilat: 30',
  },
  {
    id: 'pembaca100',
    title: 'Cahaya 100 Ayat',
    description: 'Telah membaca dan mentadaburi lebih dari 100 ayat Al-Quran.',
    category: 'quran',
    iconName: 'BookOpen',
    isUnlocked: false,
    hadithQuote: 'Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya.',
    hadithSource: 'HR. Bukhari no. 5027',
  },
  {
    id: 'juzamma',
    title: 'Sahabat Juz \'Amma',
    description: 'Membaca atau mengkhatamkan surah-surah di Juz 30.',
    category: 'quran',
    iconName: 'Star',
    isUnlocked: false,
    hadithQuote: 'Bacalah Al-Quran, karena ia akan datang pada hari kiamat sebagai pemberi syafaat bagi pembacanya.',
    hadithSource: 'HR. Muslim no. 804',
  },
  {
    id: 'khatam',
    title: 'Penjaga Mahkota Khatam',
    description: 'Menuntaskan tilawah 30 Juz Al-Quran (6.236 ayat).',
    category: 'quran',
    iconName: 'Crown',
    isUnlocked: false,
    hadithQuote: 'Siapa yang membaca 100 ayat dalam satu malam, maka dicatat baginya pahala sholat semalam suntuk.',
    hadithSource: 'HR. Ahmad',
  },
];

export function evaluateBadges(dailyLogs: DailyLog[], quranState: QuranState): BadgeItem[] {
  const { currentStreak, activeDaysCount } = calculateStreak(dailyLogs);
  const totalAyahs = quranState?.totalAyahsRead || 0;
  const khatamCount = quranState?.khatamCount || 0;

  return ALL_BADGES.map(badge => {
    let isUnlocked = false;

    switch (badge.id) {
      case 'pemula':
        isUnlocked = activeDaysCount >= 1;
        break;
      case 'seminggu':
        isUnlocked = currentStreak >= 7 || activeDaysCount >= 7;
        break;
      case 'sebulan':
        isUnlocked = currentStreak >= 30 || activeDaysCount >= 30;
        break;
      case 'pembaca100':
        isUnlocked = totalAyahs >= 100;
        break;
      case 'juzamma':
        isUnlocked = totalAyahs >= 564 || (Boolean(quranState?.lastReadSurah) && (quranState.lastReadSurah || 0) >= 78);
        break;
      case 'khatam':
        isUnlocked = khatamCount >= 1 || totalAyahs >= 6236;
        break;
      default:
        isUnlocked = false;
    }

    return {
      ...badge,
      isUnlocked,
    };
  });
}
