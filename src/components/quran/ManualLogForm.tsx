import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface ManualLogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ayahsCount: number) => void;
}

export const ManualLogForm: React.FC<ManualLogFormProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [logType, setLogType] = useState<'halaman' | 'juz' | 'ayat'>('halaman');
  const [count, setCount] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count <= 0) return;

    let calculatedAyahs = count;
    if (logType === 'halaman') {
      calculatedAyahs = Math.round(count * 15);
    } else if (logType === 'juz') {
      calculatedAyahs = Math.round(count * (6236 / 30));
    }

    onSave(calculatedAyahs);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Catat Tilawah Manual"
      subtitle="Tambahkan progres tilawah yang Anda baca langsung dari Mushaf cetak"
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
            Satuan Tilawah
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'halaman' as const, label: 'Halaman' },
              { id: 'juz' as const, label: 'Juz' },
              { id: 'ayat' as const, label: 'Ayat' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setLogType(t.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  logType === t.id
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Jumlah {logType === 'halaman' ? 'Halaman' : logType === 'juz' ? 'Juz' : 'Ayat'} Dibaca
          </label>
          <input
            type="number"
            min={1}
            max={logType === 'juz' ? 30 : 6236}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-4 py-3 text-base font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 shadow-xs"
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
          >
            Simpan Tilawah
          </Button>
        </div>
      </form>
    </Modal>
  );
};
