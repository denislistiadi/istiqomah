import React from 'react';
import { CheckCircle, Flame, BookOpen, TrendUp } from '@phosphor-icons/react';
import { Card } from '../ui/Card';

export interface StatsCardProps {
  totalCompletedLogs: number;
  currentStreak: number;
  longestStreak: number;
  totalAyahsRead: number;
  consistencyRate: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  totalCompletedLogs,
  currentStreak,
  longestStreak,
  totalAyahsRead,
  consistencyRate,
}) => {
  const stats = [
    {
      label: 'Amalan Tuntas',
      value: totalCompletedLogs.toLocaleString('id-ID'),
      unit: 'kali',
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    },
    {
      label: 'Streak Aktif',
      value: currentStreak.toString(),
      unit: `hari (rekor: ${longestStreak}h)`,
      icon: Flame,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    },
    {
      label: 'Ayat Dibaca',
      value: totalAyahsRead.toLocaleString('id-ID'),
      unit: 'ayat',
      icon: BookOpen,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20',
    },
    {
      label: 'Konsistensi',
      value: `${consistencyRate}%`,
      unit: 'rata-rata pekan ini',
      icon: TrendUp,
      color: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <Card key={idx} variant="default" padding="sm" className="space-y-2 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 truncate">
                {s.label}
              </span>
              <div className={`p-1.5 rounded-xl border ${s.bg} ${s.color}`}>
                <Icon size={16} weight="fill" />
              </div>
            </div>

            <div>
              <div className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                {s.unit}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
