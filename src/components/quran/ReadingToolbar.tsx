import React from 'react';
import { QuranReadingMode } from '@/types';
import { Palette, BookOpen } from '@phosphor-icons/react';

export interface ReadingToolbarProps {
  readingMode: QuranReadingMode;
  onSelectReadingMode: (mode: QuranReadingMode) => void;
  enableTajweed: boolean;
  onToggleTajweed: () => void;
  arabicFontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onOpenTajweedGuide: () => void;
}

export const ReadingToolbar: React.FC<ReadingToolbarProps> = ({
  readingMode,
  onSelectReadingMode,
  enableTajweed,
  onToggleTajweed,
  arabicFontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onOpenTajweedGuide,
}) => {
  return (
    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
      {/* Top Row: Reading Mode Switcher */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
          Pilihan Mode Tampilan
        </span>
        <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl">
          <button
            type="button"
            onClick={() => onSelectReadingMode('full')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
              readingMode === 'full'
                ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Lengkap
          </button>
          <button
            type="button"
            onClick={() => onSelectReadingMode('arabic-only')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
              readingMode === 'arabic-only'
                ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Arab Saja
          </button>
          <button
            type="button"
            onClick={() => onSelectReadingMode('arabic-translation')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
              readingMode === 'arabic-translation'
                ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Arab + Arti
          </button>
        </div>
      </div>

      {/* Bottom Row: Tajweed Toggle + Font Size Controls + Tajweed Guide Trigger */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex-wrap">
        {/* Tajweed Color Toggle */}
        <button
          type="button"
          onClick={onToggleTajweed}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            enableTajweed
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-300 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Palette size={15} weight={enableTajweed ? 'fill' : 'regular'} className={enableTajweed ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span>Warna Tajwid: {enableTajweed ? 'Aktif' : 'Nonaktif'}</span>
        </button>

        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
          <button
            type="button"
            onClick={onDecreaseFontSize}
            disabled={arabicFontSize <= 22}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30 transition-colors"
            title="Kecilkan Huruf Arab"
            aria-label="Kecilkan Huruf Arab"
          >
            A-
          </button>
          <span className="text-[11px] font-semibold text-zinc-500 px-1 min-w-[28px] text-center">
            {arabicFontSize}
          </span>
          <button
            type="button"
            onClick={onIncreaseFontSize}
            disabled={arabicFontSize >= 48}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30 transition-colors"
            title="Besarkan Huruf Arab"
            aria-label="Besarkan Huruf Arab"
          >
            A+
          </button>
        </div>

        {/* Tajweed Guide Modal Trigger */}
        <button
          type="button"
          onClick={onOpenTajweedGuide}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-100/80 dark:hover:bg-amber-900/40 transition-colors"
        >
          <BookOpen size={15} weight="fill" className="text-amber-600 dark:text-amber-400" />
          <span>Ilmu Tajwid</span>
        </button>
      </div>
    </div>
  );
};
