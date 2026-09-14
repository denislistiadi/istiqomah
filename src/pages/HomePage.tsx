import React, { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useStreak } from '@/hooks/useStreak';
import { useSavedPrayers } from '@/hooks/useSavedPrayers';
import { formatDateIndonesian, getTodayDateString } from '@/lib/streak';
import { StreakIndicator } from '@/components/home/StreakIndicator';
import { HabitGroup } from '@/components/home/HabitGroup';
import { PrayerSearchModal } from '@/components/home/PrayerSearchModal';
import { AddHabitModal } from '@/components/home/AddHabitModal';
import { EditHabitModal } from '@/components/home/EditHabitModal';
import { PrayerReaderModal } from '@/components/home/PrayerReaderModal';
import { SavedPrayersModal } from '@/components/home/SavedPrayersModal';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Sparkle, Plus, BookBookmark } from '@phosphor-icons/react';
import { Habit, GeminiPrayerResponse, SavedPrayer, PrayerData } from '@/types';

export interface HomePageProps {
  onOpenSettings: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSettings }) => {
  const { habits, addHabit, updateHabit, deleteHabit } = useHabits();
  const { isHabitCompleted, toggleHabit } = useDailyLog();
  const { currentStreak, longestStreak, activeDaysCount, todayCompletion } = useStreak();
  const { savedPrayers, savePrayer, deleteSavedPrayer } = useSavedPrayers();

  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isSavedPrayersOpen, setIsSavedPrayersOpen] = useState(false);
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [readingPrayer, setReadingPrayer] = useState<{
    title: string;
    prayerData: PrayerData;
    habitId?: string;
    isCompleted?: boolean;
  } | null>(null);

  const todayStr = getTodayDateString();
  const formattedDate = formatDateIndonesian(todayStr);

  const wajibHabits = habits.filter(h => h.category === 'wajib');
  const sunnahHabits = habits.filter(h => h.category === 'sunnah');
  const dzikirHabits = habits.filter(h => h.category === 'dzikir');

  const handleAddPrayerAsHabit = async (prayer: GeminiPrayerResponse) => {
    // 1. Save full prayer to collection so it is always preserved
    await savePrayer({
      title: prayer.title,
      arabic: prayer.arabic,
      latin: prayer.latin,
      translation: prayer.translation,
      source: prayer.source,
      benefit: prayer.benefit,
      category: prayer.category,
    });

    // 2. Add as daily habit with full prayerData attached
    await addHabit({
      title: prayer.title,
      category: 'dzikir',
      timeOfDay: 'kapanpun',
      description: `${prayer.source}${prayer.benefit ? `: ${prayer.benefit}` : ''}`,
      prayerData: {
        arabic: prayer.arabic,
        latin: prayer.latin,
        translation: prayer.translation,
        source: prayer.source,
        benefit: prayer.benefit,
      },
    });
  };

  const handleSavePrayerOnly = async (prayer: GeminiPrayerResponse) => {
    await savePrayer({
      title: prayer.title,
      arabic: prayer.arabic,
      latin: prayer.latin,
      translation: prayer.translation,
      source: prayer.source,
      benefit: prayer.benefit,
      category: prayer.category,
    });
  };

  const handleAddSavedPrayerToHabits = async (prayer: SavedPrayer) => {
    await addHabit({
      title: prayer.title,
      category: 'dzikir',
      timeOfDay: 'kapanpun',
      description: `${prayer.source}${prayer.benefit ? `: ${prayer.benefit}` : ''}`,
      prayerData: {
        arabic: prayer.arabic,
        latin: prayer.latin,
        translation: prayer.translation,
        source: prayer.source,
        benefit: prayer.benefit,
      },
    });
  };

  const handleReadPrayer = (habit: Habit) => {
    if (habit.prayerData) {
      setReadingPrayer({
        title: habit.title,
        prayerData: habit.prayerData,
        habitId: habit.id,
        isCompleted: isHabitCompleted(habit.id),
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!habitToDelete) return;
    await deleteHabit(habitToDelete.id);
    setHabitToDelete(null);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block truncate">
            {formattedDate}
          </span>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5 truncate">
            Assalamualaikum
          </h1>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Saved Prayers Library Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSavedPrayersOpen(true)}
            className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/50"
            title="Koleksi Doa Tersimpan"
          >
            <BookBookmark size={16} weight="fill" className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold hidden xs:inline">Koleksi Doa</span>
            {savedPrayers.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white leading-none">
                {savedPrayers.length}
              </span>
            )}
          </Button>

          {/* AI Search Prayer Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsPrayerModalOpen(true)}
            className="border-amber-400/40 text-amber-700 dark:text-amber-300 hover:border-amber-500/50"
            title="Cari doa shahih dengan AI"
          >
            <Sparkle size={16} weight="fill" className="text-amber-500" />
            <span className="font-semibold hidden xs:inline">Cari Doa AI</span>
          </Button>
        </div>
      </div>

      {/* Hero Streak Card */}
      <StreakIndicator
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        activeDaysCount={activeDaysCount}
        todayCompletion={todayCompletion}
      />

      {/* Amalan Sections */}
      <div className="space-y-6 pt-1">
        <HabitGroup
          title="Sholat Wajib 5 Waktu"
          subtitle="Tiang agama yang paling utama"
          habits={wajibHabits}
          isHabitCompleted={isHabitCompleted}
          onToggleHabit={toggleHabit}
          onEditHabit={setEditingHabit}
          onDeleteHabit={setHabitToDelete}
          onReadPrayerHabit={handleReadPrayer}
        />

        <HabitGroup
          title="Amalan Sunnah & Tilawah"
          subtitle="Penambah pahala dan keberkahan"
          habits={sunnahHabits}
          isHabitCompleted={isHabitCompleted}
          onToggleHabit={toggleHabit}
          onEditHabit={setEditingHabit}
          onDeleteHabit={setHabitToDelete}
          onReadPrayerHabit={handleReadPrayer}
        />

        <HabitGroup
          title="Dzikir & Doa Harian"
          subtitle="Penyejuk hati dan benteng diri di setiap waktu"
          habits={dzikirHabits}
          isHabitCompleted={isHabitCompleted}
          onToggleHabit={toggleHabit}
          onEditHabit={setEditingHabit}
          onDeleteHabit={setHabitToDelete}
          onReadPrayerHabit={handleReadPrayer}
        />
      </div>

      {/* Add Custom Habit Button */}
      <div className="pt-2">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setIsAddHabitModalOpen(true)}
          className="border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Target Amalan Pribadi</span>
        </Button>
      </div>

      {/* Modals */}
      <PrayerSearchModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        onAddAsHabit={handleAddPrayerAsHabit}
        onSavePrayerOnly={handleSavePrayerOnly}
        onOpenSettings={onOpenSettings}
      />

      <SavedPrayersModal
        isOpen={isSavedPrayersOpen}
        onClose={() => setIsSavedPrayersOpen(false)}
        savedPrayers={savedPrayers}
        habits={habits}
        onOpenPrayerReader={setReadingPrayer}
        onAddAsHabit={handleAddSavedPrayerToHabits}
        onDeletePrayer={deleteSavedPrayer}
        onOpenSearchModal={() => setIsPrayerModalOpen(true)}
      />

      <PrayerReaderModal
        isOpen={!!readingPrayer}
        onClose={() => setReadingPrayer(null)}
        prayer={readingPrayer}
        onToggleHabit={toggleHabit}
      />

      <AddHabitModal
        isOpen={isAddHabitModalOpen}
        onClose={() => setIsAddHabitModalOpen(false)}
        onAdd={addHabit}
      />

      <EditHabitModal
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        habit={editingHabit}
        onUpdate={updateHabit}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!habitToDelete}
        onClose={() => setHabitToDelete(null)}
        title="Hapus Amalan"
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Apakah Anda yakin ingin menghapus amalan{' '}
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
              {habitToDelete?.title}
            </strong>
            ?
          </p>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300">
            Riwayat centang amalan ini juga akan dibersihkan dari catatan harian.
          </div>
          <div className="pt-2 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => setHabitToDelete(null)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="danger"
              fullWidth
              onClick={handleConfirmDelete}
            >
              Hapus Amalan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
