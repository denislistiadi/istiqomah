import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MagnifyingGlass, BookmarkSimple } from '@phosphor-icons/react';
import { SurahMeta } from '@/types';
import { Badge } from '../ui/Badge';

export interface SurahListProps {
  surahs: SurahMeta[];
  lastReadSurahNumber: number;
  onSelectSurah: (surahNumber: number) => void;
}

export const SurahList: React.FC<SurahListProps> = ({
  surahs,
  lastReadSurahNumber,
  onSelectSurah,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return surahs;

    return surahs.filter((s) => {
      const numMatch = s.number.toString() === q;
      const nameMatch = s.name.toLowerCase().includes(q);
      const englishMatch = s.englishName.toLowerCase().includes(q);
      const transMatch = s.englishNameTranslation.toLowerCase().includes(q);
      return numMatch || nameMatch || englishMatch || transMatch;
    });
  }, [surahs, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari surah (misal: Al-Kahf, Yasin, 18, Sapi Betina)..."
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
        />
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        />
      </div>

      {/* Surah List Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {filteredSurahs.map((surah, idx) => {
          const isBookmarked = surah.number === lastReadSurahNumber;

          return (
            <motion.div
              key={surah.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.3) }}
              whileTap={{ scale: 0.98, y: -1 }}
              onClick={() => onSelectSurah(surah.number)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer select-none shadow-xs ${
                isBookmarked
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-500/40'
                  : 'bg-white dark:bg-zinc-900/70 hover:bg-slate-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80'
              }`}
            >
              {/* Left info: Number + Title */}
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold text-xs shrink-0 ${
                    isBookmarked
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {surah.number}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {surah.englishName}
                    </h4>
                    {isBookmarked && (
                      <Badge variant="emerald" size="sm">
                        <BookmarkSimple size={11} weight="fill" />
                        <span>Bookmark</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat
                  </p>
                </div>
              </div>

              {/* Right info: Arabic script name */}
              <div className="text-right shrink-0">
                <span dir="rtl" lang="ar" className="font-arabic text-2xl font-bold text-emerald-700 dark:text-emerald-400/90 leading-normal">
                  {surah.name}
                </span>
              </div>
            </motion.div>
          );
        })}

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Tidak ada surah yang cocok dengan "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
