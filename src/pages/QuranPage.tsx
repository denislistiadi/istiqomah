import React, { useState, useEffect } from 'react';
import { useQuranReader } from '@/hooks/useQuranReader';
import { KhatamProgress } from '@/components/quran/KhatamProgress';
import { SurahList } from '@/components/quran/SurahList';
import { AyahReader } from '@/components/quran/AyahReader';
import { ManualLogForm } from '@/components/quran/ManualLogForm';
import { TajweedGuideModal } from '@/components/quran/TajweedGuideModal';
import { ToastMessage, ToastContainer } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { BookOpen } from '@phosphor-icons/react';
import { scrollToTop } from '@/lib/scroll';

export const QuranPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'reader'>('list');
  const [isManualLogOpen, setIsManualLogOpen] = useState(false);
  const [isTajweedGuideOpen, setIsTajweedGuideOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const {
    activeSurahNumber,
    setActiveSurahNumber,
    ayahs,
    allSurahs,
    isLoadingAyahs,
    quranState,
    setLastRead,
    logTilawahPages,
  } = useQuranReader();

  const activeSurahMeta = allSurahs.find(s => s.number === activeSurahNumber) || allSurahs[0];

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Scroll to top on view mode or active surah change
  useEffect(() => {
    scrollToTop('smooth');
  }, [viewMode, activeSurahNumber]);

  const handleSelectSurah = (surahNumber: number) => {
    setActiveSurahNumber(surahNumber);
    setViewMode('reader');
    scrollToTop('smooth');
  };

  const handleBackToList = () => {
    setViewMode('list');
    scrollToTop('smooth');
  };

  const handleBookmarkAyah = async (ayahNumber: number) => {
    await setLastRead(activeSurahNumber, ayahNumber, activeSurahMeta.englishName);
    addToast('success', `Bookmark disimpan: ${activeSurahMeta.englishName} ayat ${ayahNumber}`);
  };

  const handleSaveManualTilawah = async (count: number) => {
    await logTilawahPages(count);
    addToast('success', `Berhasil mencatat ${count} ayat tilawah`);
  };

  const handleSelectNextSurah = () => {
    if (activeSurahNumber < 114) {
      setActiveSurahNumber(activeSurahNumber + 1);
      scrollToTop('smooth');
    }
  };

  const handleSelectPrevSurah = () => {
    if (activeSurahNumber > 1) {
      setActiveSurahNumber(activeSurahNumber - 1);
      scrollToTop('smooth');
    }
  };

  return (
    <div className="space-y-6">
      {viewMode === 'list' ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Kalamullah
              </span>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5">
                Al-Quran Al-Karim
              </h1>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsTajweedGuideOpen(true)}
              className="border-amber-400/40 text-amber-800 dark:text-amber-300 hover:border-amber-500/50"
            >
              <BookOpen size={16} weight="fill" className="text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">Ilmu Tajwid</span>
            </Button>
          </div>

          {/* Khatam Progress Card */}
          <KhatamProgress
            quranState={quranState}
            onOpenManualLog={() => setIsManualLogOpen(true)}
            onContinueLastRead={() => handleSelectSurah(quranState.lastReadSurah || 1)}
          />

          {/* Surah Explorer */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 tracking-tight">
              Daftar 114 Surah
            </h3>
            <SurahList
              surahs={allSurahs}
              lastReadSurahNumber={quranState.lastReadSurah || 1}
              onSelectSurah={handleSelectSurah}
            />
          </div>
        </>
      ) : (
        <AyahReader
          surahMeta={activeSurahMeta}
          ayahs={ayahs}
          isLoading={isLoadingAyahs}
          lastReadAyahNumber={quranState.lastReadAyah || 1}
          isCurrentSurahBookmarked={quranState.lastReadSurah === activeSurahNumber}
          onBack={handleBackToList}
          onSelectNextSurah={activeSurahNumber < 114 ? handleSelectNextSurah : undefined}
          onSelectPrevSurah={activeSurahNumber > 1 ? handleSelectPrevSurah : undefined}
          onBookmarkAyah={handleBookmarkAyah}
        />
      )}

      {/* Manual Tilawah Log Modal */}
      <ManualLogForm
        isOpen={isManualLogOpen}
        onClose={() => setIsManualLogOpen(false)}
        onSave={handleSaveManualTilawah}
      />

      {/* Tajweed Educational Guide Modal (from main list) */}
      <TajweedGuideModal
        isOpen={isTajweedGuideOpen}
        onClose={() => setIsTajweedGuideOpen(false)}
      />

      {/* Toast Feedback */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
};

