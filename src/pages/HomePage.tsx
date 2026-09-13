import React, { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useStreak } from '@/hooks/useStreak';
import { formatDateIndonesian, getTodayDateString } from '@/lib/streak';
import { StreakIndicator } from '@/components/home/StreakIndicator';
import { HabitGroup } from '@/components/home/HabitGroup';
import { PrayerSearchModal } from '@/components/home/PrayerSearchModal';
import { AddHabitModal } from '@/components/home/AddHabitModal';
import { Button } from '@/components/ui/Button';
import { Sparkle, Plus } from '@phosphor-icons/react';

export interface HomePageProps {
  onOpenSettings: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSettings }) => {
  const { habits, addHabit, deleteHabit } = useHabits();
  const { isHabitCompleted, toggleHabit } = useDailyLog();
  const { currentStreak, longestStreak, activeDaysCount, todayCompletion } = useStreak();

  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);

  const todayStr = getTodayDateString();
  const formattedDate = formatDateIndonesian(todayStr);

  const wajibHabits = habits.filter(h => h.category === 'wajib');
  const sunnahHabits = habits.filter(h => h.category === 'sunnah');
  const dzikirHabits = habits.filter(h => h.category === 'dzikir');

  const handleAddPrayerAsHabit = async (title: string, description: string) => {
    await addHabit({
      title,
      category: 'dzikir',
      timeOfDay: 'kapanpun',
      description,
    });
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            {formattedDate}
          </span>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Assalamualaikum
          </h1>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsPrayerModalOpen(true)}
          className="border-amber-400/40 text-amber-700 dark:text-amber-300 hover:border-amber-500/50"
        >
          <Sparkle size={16} weight="fill" className="text-amber-500" />
          <span className="font-semibold">Cari Doa Shahih</span>
        </Button>
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
          onDeleteHabit={deleteHabit}
        />

        <HabitGroup
          title="Amalan Sunnah & Tilawah"
          subtitle="Penambah pahala dan keberkahan"
          habits={sunnahHabits}
          isHabitCompleted={isHabitCompleted}
          onToggleHabit={toggleHabit}
          onDeleteHabit={deleteHabit}
        />

        <HabitGroup
          title="Dzikir & Doa Harian"
          subtitle="Penyejuk hati dan benteng diri di setiap waktu"
          habits={dzikirHabits}
          isHabitCompleted={isHabitCompleted}
          onToggleHabit={toggleHabit}
          onDeleteHabit={deleteHabit}
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
        onOpenSettings={onOpenSettings}
      />

      <AddHabitModal
        isOpen={isAddHabitModalOpen}
        onClose={() => setIsAddHabitModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
};
