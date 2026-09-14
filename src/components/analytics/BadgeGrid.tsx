import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkle, Flame, Trophy, BookOpen, Star, Crown, LockSimple, CheckCircle } from '@phosphor-icons/react';
import { BadgeItem } from '@/types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

export interface BadgeGridProps {
  badges: BadgeItem[];
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Sparkle: <Sparkle size={26} weight="fill" />,
    Flame: <Flame size={26} weight="fill" />,
    Trophy: <Trophy size={26} weight="fill" />,
    BookOpen: <BookOpen size={26} weight="fill" />,
    Star: <Star size={26} weight="fill" />,
    Crown: <Crown size={26} weight="fill" />,
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Lencana & Mahkota Amal
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {badges.filter(b => b.isUnlocked).length} dari {badges.length} lencana tercapai
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => {
          const icon = iconMap[badge.iconName] || <Sparkle size={26} weight="fill" />;

          return (
            <motion.button
              key={badge.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBadge(badge)}
              className={`relative p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all shadow-xs ${
                badge.isUnlocked
                  ? 'bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-amber-500/15 dark:to-emerald-500/10 border-amber-300 dark:border-amber-500/40 text-amber-600 dark:text-amber-400'
                  : 'bg-zinc-100/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80 text-zinc-400 dark:text-zinc-600 opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div className="relative">
                {icon}
                {!badge.isUnlocked && (
                  <div className="absolute -top-1 -right-2 p-0.5 rounded-full bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 shadow-xs">
                    <LockSimple size={12} weight="bold" />
                  </div>
                )}
              </div>

              {/* Title */}
              <span className={`text-xs font-bold leading-tight line-clamp-2 ${badge.isUnlocked ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'}`}>
                {badge.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Badge Detail Modal with Hadith */}
      <Modal
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge?.title}
        maxWidth="md"
      >
        {selectedBadge && (
          <div className="space-y-4 pt-1 text-center">
            {/* Large Icon Preview */}
            <div className="flex justify-center">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center border ${
                  selectedBadge.isUnlocked
                    ? 'bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-500/20 dark:to-emerald-500/20 border-amber-300 dark:border-amber-500/40 text-amber-600 dark:text-amber-400 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'
                }`}
              >
                {iconMap[selectedBadge.iconName] || <Sparkle size={40} weight="fill" />}
              </div>
            </div>

            <div className="space-y-1">
              <Badge variant={selectedBadge.isUnlocked ? 'gold' : 'zinc'} size="md">
                {selectedBadge.isUnlocked ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" />
                    <span>Telah Diraih</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <LockSimple size={14} weight="bold" />
                    <span>Terkunci</span>
                  </span>
                )}
              </Badge>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 pt-2 leading-relaxed font-medium">
                {selectedBadge.description}
              </p>
            </div>

            {/* Hadith Quote Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/90 border border-emerald-200 dark:border-emerald-500/20 text-left space-y-2">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Dalil & Nasihat Ulama
              </span>
              <p className="text-xs italic text-zinc-800 dark:text-zinc-200 leading-relaxed">
                "{selectedBadge.hadithQuote}"
              </p>
              <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 text-right">
                {selectedBadge.hadithSource}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
