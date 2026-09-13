import React from 'react';
import { motion } from 'motion/react';
import { Flame, Trophy, CalendarCheck } from '@phosphor-icons/react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
  activeDaysCount: number;
  todayCompletion: {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  currentStreak,
  longestStreak,
  activeDaysCount,
  todayCompletion,
}) => {
  return (
    <Card variant="elevated" className="relative overflow-hidden border-zinc-200 dark:border-zinc-800/80 p-5 shadow-lg shadow-zinc-200/50 dark:shadow-2xl">
      {/* Background hero image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-emerald-50/40 dark:from-zinc-950 dark:via-zinc-950/70 dark:to-emerald-950/30 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 shadow-inner">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Flame size={28} weight="fill" />
              </motion.div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {currentStreak}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Hari Istiqomah
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {currentStreak > 0
                  ? 'Alhamdulillah, jaga terus semangat ibadahnya ya!'
                  : 'Bismillah, yuk mulai kebiasaan baik hari ini!'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 flex flex-col items-center shadow-xs">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                <Trophy size={12} className="text-amber-500" />
                <span>Terbaik</span>
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{longestStreak}h</span>
            </div>

            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 flex flex-col items-center shadow-xs">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                <CalendarCheck size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>Total</span>
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{activeDaysCount}h</span>
            </div>
          </div>
        </div>

        {/* Progress bar today */}
        <div className="pt-1">
          <ProgressBar
            value={todayCompletion.percentage}
            label="Progres Hari Ini"
            sublabel={`${todayCompletion.completedCount}/${todayCompletion.totalCount} Amalan (${todayCompletion.percentage}%)`}
            color="emerald"
            size="sm"
          />
        </div>
      </div>
    </Card>
  );
};
