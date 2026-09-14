import React from 'react';
import { BookOpen, Trophy, Plus, BookmarkSimple } from '@phosphor-icons/react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { TOTAL_AYAH_IN_QURAN } from '@/lib/constants';
import { QuranState } from '@/types';

export interface KhatamProgressProps {
  quranState: QuranState;
  onOpenManualLog: () => void;
  onContinueLastRead?: () => void;
}

export const KhatamProgress: React.FC<KhatamProgressProps> = ({
  quranState,
  onOpenManualLog,
  onContinueLastRead,
}) => {
  const totalRead = quranState.totalAyahsRead || 0;
  const currentAyah = totalRead % TOTAL_AYAH_IN_QURAN;
  const rawPercentage = (currentAyah / TOTAL_AYAH_IN_QURAN) * 100;
  const displayPercentage =
    currentAyah === 0
      ? 0
      : rawPercentage < 1
      ? Number(rawPercentage.toFixed(1))
      : Math.round(rawPercentage);

  return (
    <Card variant="glow" className="space-y-4 p-5 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <BookOpen size={16} weight="bold" />
            <span>Target Khatam 30 Juz</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              Khatam ke-{quranState.khatamCount + 1}
            </h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              ({currentAyah.toLocaleString('id-ID')} dari {TOTAL_AYAH_IN_QURAN.toLocaleString('id-ID')} ayat)
            </span>
          </div>
        </div>

        {quranState.khatamCount > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Trophy size={14} weight="fill" />
            <span>{quranState.khatamCount}x Khatam</span>
          </div>
        )}
      </div>

      <ProgressBar
        value={rawPercentage}
        sublabel={`${displayPercentage}%`}
        color="emerald"
        size="md"
      />

      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
        {/* Info Terakhir Dibaca */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <BookmarkSimple size={15} weight="fill" className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-zinc-500 dark:text-zinc-400 shrink-0">Terakhir:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {quranState.lastReadSurahName || 'Al-Fatihah'}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
              Ayat {quranState.lastReadAyah || 1}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenManualLog}
            className="flex-1 text-xs text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80"
          >
            <Plus size={14} weight="bold" />
            <span>Catat Tilawah</span>
          </Button>

          {onContinueLastRead && (
            <Button
              variant="primary"
              size="sm"
              onClick={onContinueLastRead}
              className="flex-1 text-xs shadow-xs"
            >
              <BookOpen size={14} weight="bold" />
              <span>Lanjut Baca</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

