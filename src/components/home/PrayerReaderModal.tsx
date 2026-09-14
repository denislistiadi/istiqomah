import React, { useState } from 'react';
import { PrayerData } from '@/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { BookBookmark, Copy, Check, CheckCircle } from '@phosphor-icons/react';

export interface PrayerReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayer: {
    title: string;
    prayerData: PrayerData;
    habitId?: string;
    isCompleted?: boolean;
  } | null;
  onToggleHabit?: (habitId: string) => void;
}

export const PrayerReaderModal: React.FC<PrayerReaderModalProps> = ({
  isOpen,
  onClose,
  prayer,
  onToggleHabit,
}) => {
  const [copied, setCopied] = useState(false);

  if (!prayer) return null;

  const { title, prayerData, habitId, isCompleted } = prayer;

  const handleCopy = async () => {
    try {
      const fullText = `${title}

${prayerData.arabic}

Transliterasi:
${prayerData.latin}

Artinya:
"${prayerData.translation}"

Sumber: ${prayerData.source}${prayerData.benefit ? `\nKeutamaan: ${prayerData.benefit}` : ''}`;

      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleMarkDone = () => {
    if (habitId && onToggleHabit) {
      onToggleHabit(habitId);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={prayerData.source}
      maxWidth="lg"
    >
      <div className="space-y-4 pt-1 pb-2">
        {/* Source Badge and Copy Button Header */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <BookBookmark size={15} className="text-amber-500" />
            <span className="font-medium">{prayerData.source}</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              copied
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600/40'
                : 'bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {copied ? (
              <>
                <Check size={14} weight="bold" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Salin Doa</span>
              </>
            )}
          </button>
        </div>

        {/* Arabic Display Card */}
        <div className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-50 text-right leading-[2.3] sm:leading-[2.4] select-text"
          >
            {prayerData.arabic}
          </p>
        </div>

        {/* Latin Transliteration */}
        {prayerData.latin && (
          <div className="space-y-1 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/30">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Transliterasi
            </span>
            <p className="text-xs sm:text-sm italic text-emerald-900 dark:text-emerald-200 leading-relaxed select-text">
              {prayerData.latin}
            </p>
          </div>
        )}

        {/* Indonesian Translation */}
        <div className="space-y-1.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Arti Terjemahan
          </span>
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed select-text">
            "{prayerData.translation}"
          </p>
        </div>

        {/* Benefit / Keutamaan */}
        {prayerData.benefit && (
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold">Keutamaan: </span>
            <span>{prayerData.benefit}</span>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
          {habitId && onToggleHabit && (
            <Button
              type="button"
              variant={isCompleted ? 'secondary' : 'primary'}
              fullWidth
              onClick={handleMarkDone}
              className="order-1 sm:order-2"
            >
              <CheckCircle size={17} weight={isCompleted ? 'fill' : 'bold'} />
              <span>{isCompleted ? 'Sudah Selesai Dibaca' : 'Tandai Selesai Dibaca'}</span>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onClose}
            className="order-2 sm:order-1"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};
