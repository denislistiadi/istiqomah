import React from 'react';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useHabits } from '@/hooks/useHabits';
import { useStreak } from '@/hooks/useStreak';
import { useBadges } from '@/hooks/useBadges';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { StatsCard } from '@/components/analytics/StatsCard';
import { Heatmap } from '@/components/analytics/Heatmap';
import { BarChart } from '@/components/analytics/BarChart';
import { BadgeGrid } from '@/components/analytics/BadgeGrid';

export const AnalyticsPage: React.FC = () => {
  const { allLogs } = useDailyLog();
  const { habits } = useHabits();
  const { currentStreak, longestStreak } = useStreak();
  const { badges } = useBadges();
  const quranState = useLiveQuery(() => db.quranState.get('main'), []);

  const totalCompletedLogs = allLogs.filter(l => l.completed).length;
  const totalAyahs = quranState?.totalAyahsRead || 0;

  // Calculate consistency rate for last 7 days
  const today = new Date();
  let past7DaysCompleted = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const completedOnDate = allLogs.filter(l => l.date === dateStr && l.completed).length;
    past7DaysCompleted += completedOnDate;
  }
  const maxPossibleIn7Days = (habits.length || 1) * 7;
  const consistencyRate = Math.min(100, Math.round((past7DaysCompleted / maxPossibleIn7Days) * 100));

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="pt-1">
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          Statistik Ibadah
        </span>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5">
          Analisis & Evaluasi
        </h1>
      </div>

      {/* Summary KPI Cards */}
      <StatsCard
        totalCompletedLogs={totalCompletedLogs}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        totalAyahsRead={totalAyahs}
        consistencyRate={consistencyRate}
      />

      {/* 7-Day Bar Chart */}
      <BarChart dailyLogs={allLogs} habits={habits} />

      {/* 10-Week Consistency Heatmap */}
      <Heatmap dailyLogs={allLogs} habits={habits} />

      {/* Gamification Badges */}
      <BadgeGrid badges={badges} />
    </div>
  );
};
