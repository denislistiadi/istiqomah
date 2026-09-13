import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DailyLog, Habit } from '@/types';
import { formatDateIndonesian } from '@/lib/streak';

export interface HeatmapProps {
  dailyLogs: DailyLog[];
  habits: Habit[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ dailyLogs, habits }) => {
  const [selectedDayInfo, setSelectedDayInfo] = useState<{
    date: string;
    completed: number;
    total: number;
    percentage: number;
  } | null>(null);

  // Generate the last 70 days (10 weeks)
  const totalDays = 70;
  const days = [];
  const today = new Date();

  // Create lookup map of completed habits per date
  const dateToCompletedMap = new Map<string, number>();
  for (const log of dailyLogs) {
    if (log.completed) {
      dateToCompletedMap.set(log.date, (dateToCompletedMap.get(log.date) || 0) + 1);
    }
  }

  const totalHabitsCount = habits.length || 1;

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;

    const completed = dateToCompletedMap.get(dateStr) || 0;
    const percentage = Math.min(100, Math.round((completed / totalHabitsCount) * 100));

    days.push({
      date: dateStr,
      dayOfWeek: d.getDay(),
      completed,
      total: totalHabitsCount,
      percentage,
    });
  }

  const getColorClass = (percentage: number) => {
    if (percentage === 0) return 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700/40';
    if (percentage < 30) return 'bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-900/60';
    if (percentage < 60) return 'bg-emerald-300 dark:bg-emerald-800 border-emerald-400 dark:border-emerald-700/60';
    if (percentage < 90) return 'bg-emerald-500 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-500/80';
    return 'bg-emerald-600 dark:bg-emerald-400 border-emerald-700 dark:border-emerald-300 shadow-sm shadow-emerald-500/30';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Peta Konsistensi (10 Pekan Terakhir)
        </h3>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Ketuk kotak untuk detail
        </span>
      </div>

      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 space-y-3 overflow-x-auto shadow-xs">
        <div className="flex items-start gap-2">
          {/* Day of week labels */}
          <div className="grid grid-rows-7 gap-1.5 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 pt-0.5 shrink-0">
            <span>Min</span>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
          </div>

          {/* Grid cells */}
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 flex-1 min-w-[280px]">
            {days.map((dayItem) => (
              <motion.button
                key={dayItem.date}
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setSelectedDayInfo(dayItem)}
                className={`w-3.5 h-3.5 rounded-md border transition-all ${getColorClass(
                  dayItem.percentage
                )} ${selectedDayInfo?.date === dayItem.date ? 'ring-2 ring-emerald-500 scale-110' : ''}`}
                title={`${dayItem.date}: ${dayItem.completed} amalan (${dayItem.percentage}%)`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
          <span>Kurang</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 dark:bg-emerald-950" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 dark:bg-emerald-400" />
          </div>
          <span>Sangat Konsisten</span>
        </div>

        {/* Selected date preview popup */}
        {selectedDayInfo && (
          <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-1">
            <div className="font-bold text-zinc-900 dark:text-zinc-200">
              {formatDateIndonesian(selectedDayInfo.date)}
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>Amalan terlaksana:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {selectedDayInfo.completed} dari {selectedDayInfo.total} ({selectedDayInfo.percentage}%)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
