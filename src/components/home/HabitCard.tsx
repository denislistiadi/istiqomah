import React from 'react';
import { motion } from 'motion/react';
import { Check, Trash, PencilSimple, BookOpen } from '@phosphor-icons/react';
import { Habit } from '@/types';
import { Badge } from '../ui/Badge';

export interface HabitCardProps {
  habit: Habit;
  completed: boolean;
  onToggle: (habitId: string) => void;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habit: Habit) => void;
  onReadPrayer?: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  completed,
  onToggle,
  onEdit,
  onDelete,
  onReadPrayer,
}) => {
  const categoryBadge = {
    wajib: <Badge variant="emerald" size="sm">Wajib</Badge>,
    sunnah: <Badge variant="gold" size="sm">Sunnah</Badge>,
    dzikir: <Badge variant="sky" size="sm">Dzikir</Badge>,
  }[habit.category];

  const canDelete = habit.category !== 'wajib' && Boolean(onDelete);

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.98, y: -1 }}
      className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer shadow-xs ${
        completed
          ? 'bg-emerald-50/80 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-500/35'
          : 'bg-white dark:bg-zinc-900/80 hover:bg-slate-50/80 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80'
      }`}
      onClick={() => onToggle(habit.id)}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
        {/* Toggle Checkbox */}
        <button
          type="button"
          aria-label={completed ? 'Tandai belum selesai' : 'Tandai selesai'}
          className={`relative flex items-center justify-center w-7 h-7 rounded-xl border transition-all duration-200 shrink-0 ${
            completed
              ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-500 dark:border-emerald-400 text-white dark:text-zinc-950 shadow-md shadow-emerald-950/20'
              : 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 text-transparent'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
        >
          <motion.div
            initial={false}
            animate={{ scale: completed ? 1 : 0, opacity: completed ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check size={16} weight="bold" />
          </motion.div>
        </button>

        {/* Habit text info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-sm font-semibold tracking-tight transition-colors duration-200 truncate ${
                completed ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {habit.title}
            </h4>
            {categoryBadge}
            {habit.prayerData && onReadPrayer && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReadPrayer(habit);
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors shrink-0 shadow-2xs"
                title="Buka lafaz & terjemahan doa"
              >
                <BookOpen size={12} weight="bold" />
                <span>Baca Doa</span>
              </button>
            )}
          </div>
          {habit.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              {habit.description}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons: Read prayer, Edit & Delete */}
      <div className="flex items-center gap-1 shrink-0 ml-1">
        {habit.prayerData && onReadPrayer && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReadPrayer(habit);
            }}
            className="p-1.5 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            title="Baca doa"
            aria-label={`Baca doa ${habit.title}`}
          >
            <BookOpen size={16} weight="bold" />
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(habit);
            }}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors opacity-70 group-hover:opacity-100 focus:opacity-100"
            title="Edit amalan"
            aria-label={`Edit amalan ${habit.title}`}
          >
            <PencilSimple size={16} weight="bold" />
          </button>
        )}

        {canDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(habit);
            }}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors opacity-70 group-hover:opacity-100 focus:opacity-100"
            title="Hapus amalan"
            aria-label={`Hapus amalan ${habit.title}`}
          >
            <Trash size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};
