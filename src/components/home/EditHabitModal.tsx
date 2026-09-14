import React, { useState, useEffect } from 'react';
import { Habit, HabitCategory, TimeOfDay } from '@/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LockSimple } from '@phosphor-icons/react';

export interface EditHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit | null;
  onUpdate: (
    habitId: string,
    data: {
      title: string;
      category: HabitCategory;
      timeOfDay: TimeOfDay;
      description?: string;
    }
  ) => Promise<void> | void;
}

export const EditHabitModal: React.FC<EditHabitModalProps> = ({
  isOpen,
  onClose,
  habit,
  onUpdate,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HabitCategory>('sunnah');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('kapanpun');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setCategory(habit.category);
      setTimeOfDay(habit.timeOfDay);
      setDescription(habit.description || '');
    }
  }, [habit]);

  if (!habit) return null;

  const isWajib = habit.category === 'wajib';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onUpdate(habit.id, {
        title: title.trim(),
        category: isWajib ? 'wajib' : category,
        timeOfDay,
        description: description.trim() || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Amalan"
      subtitle="Perbarui rincian target amalan ibadah harian"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Nama Amalan
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nama amalan ibadah"
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Kategori Amalan
          </label>
          {isWajib ? (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70">
              <div className="flex items-center gap-2">
                <Badge variant="emerald" size="sm">Wajib</Badge>
                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                  Amalan Fardhu
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <LockSimple size={14} weight="bold" />
                <span>Kategori Wajib Terkunci</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'sunnah' as HabitCategory, label: 'Sunnah' },
                { id: 'dzikir' as HabitCategory, label: 'Dzikir' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    category === cat.id
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Waktu Pelaksanaan
          </label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
          >
            <option value="subuh">Waktu Subuh</option>
            <option value="siang">Waktu Siang / Dzuhur / Ashar</option>
            <option value="maghrib">Waktu Maghrib</option>
            <option value="malam">Waktu Malam / Isya</option>
            <option value="kapanpun">Fleksibel / Kapanpun</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Catatan Tambahan (Opsional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contoh: Berjamaah di masjid, rakaat pertama awal waktu"
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        <div className="pt-2 flex gap-2">
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
