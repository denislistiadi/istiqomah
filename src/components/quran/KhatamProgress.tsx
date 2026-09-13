import React from 'react';
import { BookOpen, Trophy, Plus } from '@phosphor-icons/react';
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

      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
          Terakhir: <span className="text-zinc-900 dark:text-zinc-200 font-bold">{quranState.lastReadSurahName || 'Al-Fatihah'}</span> (Ayat {quranState.lastReadAyah || 1})
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenManualLog}
            className="text-xs text-zinc-700 dark:text-zinc-300"
          >
            <Plus size={14} weight="bold" />
            <span>Catat Tilawah</span>
          </Button>

          {onContinueLastRead && (
            <Button
              variant="primary"
              size="sm"
              onClick={onContinueLastRead}
            >
              Lanjut Baca
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
