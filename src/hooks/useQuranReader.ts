import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { getSurahAyahs, getAllSurahs, initOfflineQuranData } from '@/lib/quran-data';
import { Ayah, SurahMeta } from '@/types';
import { DEFAULT_QURAN_STATE, TOTAL_AYAH_IN_QURAN } from '@/lib/constants';

export function useQuranReader(initialSurah: number = 1) {
  const [activeSurahNumber, setActiveSurahNumber] = useState<number>(initialSurah);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const quranState = useLiveQuery(
    () => db.quranState.get('main'),
    []
  );

  const allSurahs: SurahMeta[] = getAllSurahs();

  // Load ayahs when activeSurahNumber changes
  const loadSurah = useCallback(async (surahNum: number) => {
    setIsLoadingAyahs(true);
    setFetchError(null);
    try {
      await initOfflineQuranData();
      const loadedAyahs = await getSurahAyahs(surahNum);
      setAyahs(loadedAyahs);
    } catch (err: any) {
      console.error('Error loading surah ayahs:', err);
      setFetchError('Tidak dapat memuat ayat Al-Quran. Periksa koneksi internet Anda untuk mengunduh pertama kali.');
    } finally {
      setIsLoadingAyahs(false);
    }
  }, []);

  useEffect(() => {
    loadSurah(activeSurahNumber);
  }, [activeSurahNumber, loadSurah]);

  // Set bookmark / last read
  const setLastRead = async (surahNumber: number, ayahNumber: number, surahName: string) => {
    const currentState = quranState || DEFAULT_QURAN_STATE;
    const previousTotal = currentState.totalAyahsRead || 0;
    
    // Estimate total ayahs read
    const newTotal = Math.max(previousTotal, previousTotal + 1);
    const newKhatam = Math.floor(newTotal / TOTAL_AYAH_IN_QURAN);

    await db.quranState.put({
      id: 'main',
      lastReadSurah: surahNumber,
      lastReadAyah: ayahNumber,
      lastReadSurahName: surahName,
      lastReadTimestamp: new Date().toISOString(),
      totalAyahsRead: newTotal,
      khatamCount: Math.max(currentState.khatamCount || 0, newKhatam),
    });
  };

  // Add manual log for tilawah
  const logTilawahPages = async (ayahCount: number) => {
    const currentState = quranState || DEFAULT_QURAN_STATE;
    const newTotal = (currentState.totalAyahsRead || 0) + ayahCount;
    const newKhatam = Math.floor(newTotal / TOTAL_AYAH_IN_QURAN);

    await db.quranState.put({
      ...currentState,
      id: 'main',
      totalAyahsRead: newTotal,
      khatamCount: Math.max(currentState.khatamCount || 0, newKhatam),
      lastReadTimestamp: new Date().toISOString(),
    });
  };

  return {
    activeSurahNumber,
    setActiveSurahNumber,
    ayahs,
    allSurahs,
    isLoadingAyahs,
    fetchError,
    quranState: quranState || DEFAULT_QURAN_STATE,
    setLastRead,
    logTilawahPages,
    reloadSurah: () => loadSurah(activeSurahNumber),
  };
}
