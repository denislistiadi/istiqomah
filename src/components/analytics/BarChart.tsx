import React from 'react';
import { motion } from 'motion/react';
import { DailyLog, Habit } from '@/types';

export interface BarChartProps {
  dailyLogs: DailyLog[];
  habits: Habit[];
}

export const BarChart: React.FC<BarChartProps> = ({ dailyLogs, habits }) => {
  // Last 7 days data
  const days = [];
  const today = new Date();
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const dateToCompletedMap = new Map<string, number>();
  for (const log of dailyLogs) {
    if (log.completed) {
      dateToCompletedMap.set(log.date, (dateToCompletedMap.get(log.date) || 0) + 1);
    }
  }

  const totalHabits = habits.length || 1;

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;

    const completed = dateToCompletedMap.get(dateStr) || 0;
    const percentage = Math.min(100, Math.round((completed / totalHabits) * 100));

    days.push({
      date: dateStr,
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      percentage,
      completed,
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Progres 7 Hari Terakhir
        </h3>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Target per hari
        </span>
      </div>

      <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
        {/* Bars Container */}
        <div className="h-36 flex items-end justify-between gap-2 pt-6 pb-1">
          {days.map((item, idx) => (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              {/* Percentage label above bar */}
              <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                {item.percentage}%
              </span>

              {/* Animated Bar */}
              <div className="w-full max-w-[28px] h-full bg-zinc-100 dark:bg-zinc-800/80 rounded-xl overflow-hidden flex flex-col justify-end p-0.5 border border-zinc-200 dark:border-zinc-700/30">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.percentage}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-lg bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-sm"
                />
              </div>

              {/* Day Label */}
              <div className="text-center">
                <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                  {item.dayName}
                </div>
                <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium">
                  {item.dayNum}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
