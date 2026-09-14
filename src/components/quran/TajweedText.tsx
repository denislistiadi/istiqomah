import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { parseTajweed } from '@/lib/tajweed';
import { TajweedRule } from '@/types';
import { Info } from '@phosphor-icons/react';

export interface TajweedTextProps {
  arabicText: string;
  tajweedText?: string;
  enableTajweed: boolean;
  fontSize?: number;
  onOpenTajweedGuide?: (ruleId?: string) => void;
  className?: string;
}

export const TajweedText: React.FC<TajweedTextProps> = ({
  arabicText,
  tajweedText,
  enableTajweed,
  fontSize = 30,
  onOpenTajweedGuide,
  className = '',
}) => {
  const [activeRule, setActiveRule] = useState<TajweedRule | null>(null);

  // If Tajweed is disabled or no tajweed text is available, render clean Uthmani Arabic text
  if (!enableTajweed || !tajweedText) {
    return (
      <p
        dir="rtl"
        lang="ar"
        className={`font-arabic text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/40 text-right ${className}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: 2.3 }}
      >
        {arabicText}
      </p>
    );
  }

  const segments = parseTajweed(tajweedText);

  const handleRuleClick = (e: React.MouseEvent, rule?: TajweedRule) => {
    e.stopPropagation();
    if (rule) {
      setActiveRule(prev => (prev?.id === rule.id ? null : rule));
    } else {
      setActiveRule(null);
    }
  };

  return (
    <div className="relative">
      <p
        dir="rtl"
        lang="ar"
        className={`font-arabic text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/40 text-right ${className}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: 2.3 }}
      >
        {segments.map((seg, idx) => {
          if (!seg.rule) {
            return <span key={idx} className="inline">{seg.text}</span>;
          }

          const { rule } = seg;
          const isSelected = activeRule?.id === rule.id;

          return (
            <span
              key={idx}
              onClick={(e) => handleRuleClick(e, rule)}
              className={`cursor-pointer transition-all duration-150 inline rounded px-0.5 ${rule.textColorClass} ${
                isSelected
                  ? 'bg-emerald-500/15 dark:bg-emerald-500/25 underline decoration-emerald-500 decoration-2 underline-offset-8 ring-1 ring-emerald-500/40'
                  : 'hover:opacity-80'
              }`}
              title={`${rule.name} (${rule.colorName}): ${rule.howToRead}`}
            >
              {seg.text}
            </span>
          );
        })}
      </p>

      {/* Contextual Tajweed Explanation Card right below the clicked Ayah */}
      <AnimatePresence>
        {activeRule && (
          <motion.div
            key={activeRule.id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            dir="ltr"
            className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-zinc-50/95 dark:bg-zinc-900/95 border border-emerald-500/40 dark:border-emerald-500/30 shadow-md shadow-zinc-950/5 dark:shadow-black/50 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-hidden backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div
                className="w-4 h-4 rounded-full mt-1 shrink-0 ring-2 ring-white dark:ring-zinc-800 shadow-xs"
                style={{ backgroundColor: activeRule.colorHex }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {activeRule.name}
                  </span>
                  <span className="font-arabic text-base text-emerald-600 dark:text-emerald-400" dir="rtl">
                    ({activeRule.arabicName})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    {activeRule.harakat}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                  {activeRule.howToRead}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/80 dark:border-zinc-800 shrink-0">
              {onOpenTajweedGuide && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenTajweedGuide(activeRule.id);
                    setActiveRule(null);
                  }}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60"
                >
                  <Info size={14} />
                  <span>Pelajari Kaidah</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveRule(null)}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
