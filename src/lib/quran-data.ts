import { db } from './db';
import { Ayah, SurahMeta } from '@/types';
import { SURAH_LIST_METADATA } from './constants';

// Initial offline data for Al-Fatihah and Surah Pendek with Tajweed annotations
const INITIAL_OFFLINE_AYAHS: Ayah[] = [
  // Al-Fatihah
  {
    number: 1,
    numberInSurah: 1,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    tajweedText: 'بِسْمِ [h:1[ٱ]للَّهِ [h:2[ٱ][l[ل]رَّحْمَ[n[ـٰ]نِ [h:3[ٱ][l[ل]رَّح[p[ِي]مِ',
    latinText: 'Bismillaahir-Rahmaanir-Rahiim',
    translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
  },
  {
    number: 2,
    numberInSurah: 2,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    tajweedText: '[h:4[ٱ][l[ل]ْحَمْدُ لِلَّهِ رَبِّ [h:5[ٱ]لْعَ[n[ـٰ]لَم[p[ِي]نَ',
    latinText: 'Al-hamdu lillaahi Rabbil-\'aalamiin',
    translation: 'Segala puji bagi Allah, Tuhan semesta alam.',
  },
  {
    number: 3,
    numberInSurah: 3,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'الرَّحْمَٰنِ الرَّحِيمِ',
    tajweedText: '[h:6[ٱ][l[ل]رَّحْمَ[n[ـٰ]نِ [h:7[ٱ][l[ل]رَّح[p[ِي]مِ',
    latinText: 'Ar-Rahmaanir-Rahiim',
    translation: 'Yang Maha Pengasih, Maha Penyayang.',
  },
  {
    number: 4,
    numberInSurah: 4,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'مَالِكِ يَوْمِ الدِّينِ',
    tajweedText: 'مَ[n[ـٰ]لِكِ يَوْمِ [h:8[ٱ][l[ل]دّ[p[ِي]نِ',
    latinText: 'Maaliki Yawmid-Diin',
    translation: 'Pemilik hari pembalasan.',
  },
  {
    number: 5,
    numberInSurah: 5,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    tajweedText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَع[p[ِي]نُ',
    latinText: 'Iyyaaka na\'budu wa iyyaaka nasta\'iin',
    translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
  },
  {
    number: 6,
    numberInSurah: 6,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    tajweedText: '[h:9[ٱ]هْدِنَا [h:10[ٱ][l[ل]صِّرَ[n[ٲ]طَ [h:11[ٱ]لْمُسْتَق[p[ِي]مَ',
    latinText: 'Ihdinas-Siraatal-Mustaqiim',
    translation: 'Tunjukilah kami jalan yang lurus,',
  },
  {
    number: 7,
    numberInSurah: 7,
    juz: 1,
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    surahEnglishName: 'The Opening',
    arabicText: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    tajweedText: 'صِرَ[n[ٲ]طَ [h:12[ٱ]لَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ [h:13[ٱ]لْمَغْضُوبِ عَلَيْهِمْ وَلَا [h:14[ٱ][l[ل]ضّ[m[َا]ٓلّ[p[ِي]نَ',
    latinText: 'Siraatal-laziina an\'amta \'alaihim ghayril-maghduubi \'alaihim wa lad-daalliin',
    translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya, bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
  },
  // Al-Ikhlas
  {
    number: 6222,
    numberInSurah: 1,
    juz: 30,
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    surahEnglishName: 'Sincerity',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    tajweedText: 'قُلْ هُوَ [h:6222[ٱ]للَّهُ أَحَ[q:6222[دٌ]',
    latinText: 'Qul Huwallahu Ahad',
    translation: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
  },
  {
    number: 6223,
    numberInSurah: 2,
    juz: 30,
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    surahEnglishName: 'Sincerity',
    arabicText: 'اللَّهُ الصَّمَدُ',
    tajweedText: '[h:6223[ٱ]للَّهُ [h:6224[ٱ][l[ل]صَّمَ[q:6224[دُ]',
    latinText: 'Allahus-Samad',
    translation: 'Allah tempat meminta segala sesuatu.',
  },
  {
    number: 6224,
    numberInSurah: 3,
    juz: 30,
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    surahEnglishName: 'Sincerity',
    arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    tajweedText: 'لَمْ يَلِ[q:6225[دْ] وَلَمْ يُولَ[q:6226[دْ]',
    latinText: 'Lam yalid wa lam yuulad',
    translation: '(Allah) tidak beranak dan tidak pula diperanakkan,',
  },
  {
    number: 6225,
    numberInSurah: 4,
    juz: 30,
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    surahEnglishName: 'Sincerity',
    arabicText: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    tajweedText: 'وَلَمْ يَك[u:6227[ُن ل]َّهُ[n[ۥ] كُفُوًا أَحَ[q:6228[دٌۢ]',
    latinText: 'Wa lam yakul-lahu kufuwan ahad',
    translation: 'dan tidak ada sesuatu yang setara dengan Dia.',
  },
];

export async function initOfflineQuranData() {
  const count = await db.ayahs.count();
  if (count === 0) {
    await db.ayahs.bulkPut(INITIAL_OFFLINE_AYAHS);
  }
}

export async function getSurahAyahs(surahNumber: number): Promise<Ayah[]> {
  // Check local database first
  const localAyahs = await db.ayahs
    .where('surahNumber')
    .equals(surahNumber)
    .sortBy('numberInSurah');

  const surahMeta = SURAH_LIST_METADATA.find(s => s.number === surahNumber);
  const expectedCount = surahMeta ? surahMeta.numberOfAyahs : 0;

  // If local ayahs exist and already have tajweedText populated
  if (
    localAyahs.length >= expectedCount &&
    expectedCount > 0 &&
    localAyahs.some(a => Boolean(a.tajweedText))
  ) {
    return localAyahs;
  }

  // Fetch from API with 4 editions: Uthmani (Arabic), Indonesian Translation, Transliteration, and Quran Tajweed
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian,en.transliteration,quran-tajweed`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch surah: ${response.status}`);
    }

    const data = await response.json();
    if (data.code !== 200 || !data.data || data.data.length < 2) {
      throw new Error('Invalid Quran API response');
    }

    const arabicEdition = data.data[0];
    const indonesianEdition = data.data[1];
    const transliterationEdition = data.data[2] || { ayahs: [] };
    const tajweedEdition = data.data[3] || { ayahs: [] };

    const surahName = surahMeta?.englishName || arabicEdition.englishName;
    const surahEnglishName = surahMeta?.englishNameTranslation || arabicEdition.englishNameTranslation;

    const ayahsToSave: Ayah[] = arabicEdition.ayahs.map((ayahItem: any, index: number) => {
      const indoAyah = indonesianEdition.ayahs[index];
      const transAyah = transliterationEdition.ayahs[index];
      const tajweedAyah = tajweedEdition.ayahs ? tajweedEdition.ayahs[index] : null;

      return {
        number: ayahItem.number,
        numberInSurah: ayahItem.numberInSurah,
        juz: ayahItem.juz,
        surahNumber: surahNumber,
        surahName: surahName,
        surahEnglishName: surahEnglishName,
        arabicText: ayahItem.text,
        tajweedText: tajweedAyah ? tajweedAyah.text : undefined,
        latinText: transAyah ? transAyah.text : '',
        translation: indoAyah ? indoAyah.text : '',
      };
    });

    // Save to Dexie for future offline reading
    await db.ayahs.bulkPut(ayahsToSave);

    return ayahsToSave;
  } catch (err) {
    console.error('Fetch surah error:', err);
    // Return whatever local data we have if offline
    if (localAyahs.length > 0) {
      return localAyahs;
    }
    throw err;
  }
}

export function getAllSurahs(): SurahMeta[] {
  return SURAH_LIST_METADATA.map(s => ({
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    englishNameTranslation: s.englishNameTranslation,
    numberOfAyahs: s.numberOfAyahs,
    revelationType: s.revelationType as 'Meccan' | 'Medinan',
  }));
}

