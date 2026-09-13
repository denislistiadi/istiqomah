import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { evaluateBadges } from '@/lib/badges';
import { DEFAULT_QURAN_STATE } from '@/lib/constants';

export function useBadges() {
  const dailyLogs = useLiveQuery(() => db.dailyLogs.toArray(), []);
  const quranState = useLiveQuery(() => db.quranState.get('main'), []);

  const badges = useMemo(() => {
    return evaluateBadges(dailyLogs || [], quranState || DEFAULT_QURAN_STATE);
  }, [dailyLogs, quranState]);

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalCount = badges.length;

  return {
    badges,
    unlockedCount,
    totalCount,
    isLoading: dailyLogs === undefined || quranState === undefined,
  };
}
