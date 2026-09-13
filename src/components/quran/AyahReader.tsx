import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CaretLeft, CaretRight, BookmarkSimple, Check } from '@phosphor-icons/react';
import { Ayah, SurahMeta, QuranReadingMode } from '@/types';
import { Button } from '../ui/Button';
import { AyahReaderSkeleton } from '../ui/Skeleton';
import { TajweedText } from './TajweedText';
import { ReadingToolbar } from './ReadingToolbar';
import { TajweedGuideModal } from './TajweedGuideModal';

export interface AyahReaderProps {
  surahMeta: SurahMeta;
  ayahs: Ayah[];
  isLoading: boolean;
  lastReadAyahNumber: number;
  isCurrentSurahBookmarked: boolean;
  onBack: () => void;
  onSelectNextSurah?: () => void;
  onSelectPrevSurah?: () => void;
  onBookmarkAyah: (ayahNumberInSurah: number) => void;
}

export const AyahReader: React.FC<AyahReaderProps> = ({
  surahMeta,
  ayahs,
  isLoading,
  lastReadAyahNumber,
  isCurrentSurahBookmarked,
  onBack,
  onSelectNextSurah,
  onSelectPrevSurah,
  onBookmarkAyah,
}) => {
  const [readingMode, setReadingMode] = useState<QuranReadingMode>('full');
  const [enableTajweed, setEnableTajweed] = useState<boolean>(true);
  const [arabicFontSize, setArabicFontSize] = useState<number>(30);
  const [isTajweedGuideOpen, setIsTajweedGuideOpen] = useState<boolean>(false);
  const [selectedGuideRuleId, setSelectedGuideRuleId] = useState<string | undefined>();

  const showBismillah = surahMeta.number !== 1 && surahMeta.number !== 9;

  const handleOpenTajweedGuideWithRule = (ruleId?: string) => {
    setSelectedGuideRuleId(ruleId);
    setIsTajweedGuideOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          aria-label="Kembali ke daftar surah"
        >
          <ArrowLeft size={16} weight="bold" />
          <span className="text-xs font-semibold">Daftar Surah</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
            {surahMeta.englishName}
          </h2>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Surah ke-{surahMeta.number} • {surahMeta.numberOfAyahs} Ayat
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onSelectPrevSurah}
            disabled={!onSelectPrevSurah}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Surah Sebelumnya"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            onClick={onSelectNextSurah}
            disabled={!onSelectNextSurah}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Surah Berikutnya"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Surah Header Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-emerald-950/40 dark:via-zinc-900 dark:to-zinc-950 border border-emerald-200 dark:border-emerald-500/20 text-center space-y-3 shadow-md">
        <span dir="rtl" lang="ar" className="font-arabic text-3xl text-emerald-700 dark:text-emerald-400 font-bold block">
          {surahMeta.name}
        </span>
        <div>
          <h1 className="text-xl font-black text-zinc-900 dark:text-white">
            {surahMeta.englishName}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            "{surahMeta.englishNameTranslation}" • Golongan {surahMeta.revelationType === 'Meccan' ? 'Makkiyyah' : 'Madaniyyah'}
          </p>
        </div>

        {showBismillah && (
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
            <p dir="rtl" lang="ar" className="font-arabic text-2xl text-zinc-800 dark:text-zinc-200 leading-loose">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic mt-1">
              Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
            </p>
          </div>
        )}
      </div>

      {/* Reading Controls Toolbar */}
      <ReadingToolbar
        readingMode={readingMode}
        onSelectReadingMode={setReadingMode}
        enableTajweed={enableTajweed}
        onToggleTajweed={() => setEnableTajweed(prev => !prev)}
        arabicFontSize={arabicFontSize}
        onIncreaseFontSize={() => setArabicFontSize(prev => Math.min(prev + 2, 48))}
        onDecreaseFontSize={() => setArabicFontSize(prev => Math.max(prev - 2, 22))}
        onOpenTajweedGuide={() => handleOpenTajweedGuideWithRule()}
      />

      {/* Ayahs List or Skeleton */}
      {isLoading ? (
        <AyahReaderSkeleton />
      ) : (
        <div className="space-y-4">
          {ayahs.map((ayah) => {
            const isBookmarkedAyah = isCurrentSurahBookmarked && lastReadAyahNumber === ayah.numberInSurah;

            return (
              <motion.div
                key={ayah.numberInSurah}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl border transition-all duration-200 space-y-4 shadow-xs ${
                  isBookmarkedAyah
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-500/40 shadow-sm'
                    : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80'
                }`}
              >
                {/* Header bar per Ayah: Number badge + Bookmark action */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50">
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Juz {ayah.juz}
                    </span>
                  </div>

                  <Button
                    variant={isBookmarkedAyah ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onBookmarkAyah(ayah.numberInSurah)}
                    className="text-xs"
                  >
                    {isBookmarkedAyah ? (
                      <>
                        <Check size={14} weight="bold" />
                        <span>Terakhir Dibaca</span>
                      </>
                    ) : (
                      <>
                        <BookmarkSimple size={14} />
                        <span>Tandai Terakhir</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Arabic Text with Tajweed Coloring */}
                <div className="text-right py-2">
                  <TajweedText
                    arabicText={ayah.arabicText}
                    tajweedText={ayah.tajweedText}
                    enableTajweed={enableTajweed}
                    fontSize={arabicFontSize}
                    onOpenTajweedGuide={handleOpenTajweedGuideWithRule}
                  />
                </div>

                {/* Transliteration (Shown in 'full' mode only) */}
                {readingMode === 'full' && ayah.latinText && (
                  <div className="space-y-1">
                    <p className="text-xs italic text-emerald-800 dark:text-emerald-400/90 leading-relaxed">
                      {ayah.latinText}
                    </p>
                  </div>
                )}

                {/* Indonesian Translation (Shown in 'full' and 'arabic-translation' modes) */}
                {readingMode !== 'arabic-only' && (
                  <div className="space-y-1 pt-1">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {ayah.translation}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Tajweed Educational Guide Modal */}
      <TajweedGuideModal
        isOpen={isTajweedGuideOpen}
        onClose={() => {
          setIsTajweedGuideOpen(false);
          setSelectedGuideRuleId(undefined);
        }}
        initialRuleId={selectedGuideRuleId}
      />
    </div>
  );
};

