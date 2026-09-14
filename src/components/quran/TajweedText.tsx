import React, { useState } from 'react';
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
              className={`cursor-pointer transition-colors duration-150 inline ${rule.textColorClass} ${
                isSelected ? 'underline decoration-emerald-500 decoration-2 underline-offset-8' : 'hover:opacity-80'
              }`}
              title={`${rule.name} (${rule.colorName}): ${rule.howToRead}`}
            >
              {seg.text}
            </span>
          );
        })}
      </p>

      {/* Floating Interactive Rule Mini-Popup when a tajweed letter is clicked */}
      {activeRule && (
        <div
          dir="ltr"
          className="fixed bottom-24 left-4 right-4 z-40 max-w-lg mx-auto sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:mt-3 sm:z-10 p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl shadow-zinc-950/30 dark:shadow-black/80 text-left animate-in fade-in slide-in-from-bottom-3 duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
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
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                  {activeRule.harakat}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                {activeRule.howToRead}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 shrink-0">
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
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
