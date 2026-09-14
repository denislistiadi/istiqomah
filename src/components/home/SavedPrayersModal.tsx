import React, { useState } from 'react';
import { SavedPrayer, Habit } from '@/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  MagnifyingGlass,
  BookBookmark,
  BookOpen,
  Plus,
  Trash,
  Sparkle,
  Check,
} from '@phosphor-icons/react';

export interface SavedPrayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrayers: SavedPrayer[];
  habits: Habit[];
  onOpenPrayerReader: (prayer: {
    title: string;
    prayerData: {
      arabic: string;
      latin: string;
      translation: string;
      source: string;
      benefit?: string;
    };
    habitId?: string;
    isCompleted?: boolean;
  }) => void;
  onAddAsHabit: (prayer: SavedPrayer) => void;
  onDeletePrayer: (id: string) => void;
  onOpenSearchModal: () => void;
}

export const SavedPrayersModal: React.FC<SavedPrayersModalProps> = ({
  isOpen,
  onClose,
  savedPrayers,
  habits,
  onOpenPrayerReader,
  onAddAsHabit,
  onDeletePrayer,
  onOpenSearchModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prayerToDelete, setPrayerToDelete] = useState<SavedPrayer | null>(null);

  const filteredPrayers = savedPrayers.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.source.toLowerCase().includes(q) ||
      p.translation.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const isAlreadyInHabits = (prayer: SavedPrayer) => {
    return habits.some(
      (h) =>
        h.title.toLowerCase() === prayer.title.toLowerCase() ||
        (h.prayerData && h.prayerData.arabic === prayer.arabic)
    );
  };

  const handleConfirmDelete = () => {
    if (prayerToDelete) {
      onDeletePrayer(prayerToDelete.id);
      setPrayerToDelete(null);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Koleksi Doa & Dzikir Tersimpan"
        subtitle="Rujukan doa dari Al-Quran dan Hadis yang tersimpan di perangkat Anda"
        maxWidth="lg"
      >
        <div className="space-y-4 pt-1">
          {/* Search bar & Action */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari doa tersimpan..."
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenSearchModal();
              }}
              className="border-amber-400/40 text-amber-700 dark:text-amber-300 shrink-0"
            >
              <Sparkle size={15} weight="fill" className="text-amber-500" />
              <span>Cari Baru</span>
            </Button>
          </div>

          {/* List of Saved Prayers */}
          {filteredPrayers.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <BookBookmark
                size={36}
                className="mx-auto text-zinc-300 dark:text-zinc-600 mb-2"
              />
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {searchQuery ? 'Tidak ada doa yang cocok' : 'Belum ada doa yang tersimpan'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
                {searchQuery
                  ? 'Coba gunakan kata kunci pencarian yang berbeda.'
                  : 'Gunakan fitur Cari Doa Shahih untuk menemukan rujukan doa dengan AI dan simpan di sini.'}
              </p>
              {!searchQuery && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onOpenSearchModal();
                  }}
                  className="mt-4"
                >
                  <Sparkle size={15} weight="fill" />
                  <span>Cari Doa Shahih Sekarang</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 custom-scroll">
              {filteredPrayers.map((prayer) => {
                const alreadyAdded = isAlreadyInHabits(prayer);
                return (
                  <div
                    key={prayer.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col gap-2.5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {prayer.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          <BookBookmark size={13} className="text-amber-500 shrink-0" />
                          <span className="truncate">{prayer.source}</span>
                        </div>
                      </div>
                      {prayer.category && (
                        <Badge variant="emerald" size="sm">
                          {prayer.category}
                        </Badge>
                      )}
                    </div>

                    {/* Arabic preview snippet */}
                    <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/60 text-right">
                      <p
                        dir="rtl"
                        className="font-arabic text-base text-zinc-800 dark:text-zinc-200 truncate leading-relaxed"
                      >
                        {prayer.arabic}
                      </p>
                    </div>

                    {/* Translation preview */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 italic">
                      "{prayer.translation}"
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            onOpenPrayerReader({
                              title: prayer.title,
                              prayerData: {
                                arabic: prayer.arabic,
                                latin: prayer.latin,
                                translation: prayer.translation,
                                source: prayer.source,
                                benefit: prayer.benefit,
                              },
                            });
                          }}
                          className="text-xs py-1.5 px-3"
                        >
                          <BookOpen size={14} weight="bold" />
                          <span>Baca Lengkap</span>
                        </Button>

                        {!alreadyAdded ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAddAsHabit(prayer)}
                            className="text-xs py-1.5 px-2.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                          >
                            <Plus size={14} weight="bold" />
                            <span>Jadikan Amalan</span>
                          </Button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium px-2 py-1">
                            <Check size={13} weight="bold" />
                            <span>Ada di Amalan</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setPrayerToDelete(prayer)}
                        className="p-1.5 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Hapus dari koleksi"
                        aria-label={`Hapus ${prayer.title}`}
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Single Prayer Confirmation */}
      <Modal
        isOpen={!!prayerToDelete}
        onClose={() => setPrayerToDelete(null)}
        title="Hapus Doa dari Koleksi"
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Apakah Anda yakin ingin menghapus doa{' '}
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
              {prayerToDelete?.title}
            </strong>{' '}
            dari koleksi tersimpan?
          </p>
          <div className="pt-2 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => setPrayerToDelete(null)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="danger"
              fullWidth
              onClick={handleConfirmDelete}
            >
              Hapus Doa
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
