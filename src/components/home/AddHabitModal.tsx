import React, { useState } from 'react';
import { HabitCategory, TimeOfDay } from '@/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    category: HabitCategory;
    timeOfDay: TimeOfDay;
    description?: string;
  }) => void;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HabitCategory>('sunnah');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('kapanpun');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      category,
      timeOfDay,
      description: description.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('sunnah');
    setTimeOfDay('kapanpun');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Amalan Kustom"
      subtitle="Buat target ibadah harian baru sesuai rencana Anda"
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
            placeholder="Contoh: Sedekah Shubuh, Baca Surah Al-Kahfi"
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Kategori Amalan
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'wajib' as HabitCategory, label: 'Wajib' },
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
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Waktu Pelaksanaan
          </label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 shadow-xs"
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
            placeholder="Contoh: Minimal Rp 10.000 / Setiap hari Jumat"
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        <div className="pt-2 flex gap-2">
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!title.trim()}
          >
            Simpan Amalan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
