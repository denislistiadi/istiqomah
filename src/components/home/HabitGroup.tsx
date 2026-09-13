import React from 'react';
import { motion } from 'motion/react';
import { Habit } from '@/types';
import { HabitCard } from './HabitCard';

export interface HabitGroupProps {
  title: string;
  subtitle?: string;
  habits: Habit[];
  isHabitCompleted: (id: string) => boolean;
  onToggleHabit: (id: string) => void;
  onDeleteHabit?: (id: string) => void;
}

export const HabitGroup: React.FC<HabitGroupProps> = ({
  title,
  subtitle,
  habits,
  isHabitCompleted,
  onToggleHabit,
  onDeleteHabit,
}) => {
  if (habits.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2.5"
    >
      <div className="flex items-baseline justify-between px-1">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {habits.filter(h => isHabitCompleted(h.id)).length}/{habits.length}
        </span>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={isHabitCompleted(habit.id)}
            onToggle={onToggleHabit}
            onDelete={onDeleteHabit}
          />
        ))}
      </div>
    </motion.div>
  );
};
