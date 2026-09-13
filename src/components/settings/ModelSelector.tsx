import React from 'react';
import { motion } from 'motion/react';
import { Check, Brain, Sparkle } from '@phosphor-icons/react';
import { GeminiModel, GEMINI_MODELS } from '@/types';
import { Badge } from '../ui/Badge';

export interface ModelSelectorProps {
  selectedModel: GeminiModel;
  onSelectModel: (model: GeminiModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-emerald-600 dark:text-emerald-400" />
          <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Model Gemini AI
          </label>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Pilih kecerdasan AI
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {GEMINI_MODELS.map((model) => {
          const isSelected = selectedModel === model.value;

          return (
            <motion.div
              key={model.value}
              whileTap={{ scale: 0.98, y: -1 }}
              onClick={() => onSelectModel(model.value)}
              className={`relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none flex items-start justify-between gap-3 shadow-xs ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/25 border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-zinc-900/80 hover:bg-slate-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80'
              }`}
            >
              <div className="space-y-1 flex-1 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {model.label}
                  </span>
                  {model.badge && (
                    <Badge
                      variant={model.isPaidRecommended ? 'gold' : 'emerald'}
                      size="sm"
                    >
                      {model.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {model.description}
                </p>
              </div>

              {/* Radio circle */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-500 dark:border-emerald-400 text-white dark:text-zinc-950 shadow-sm'
                    : 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-transparent'
                }`}
              >
                {isSelected && <Check size={14} weight="bold" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/60 flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
        <Sparkle size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <span>
          Model <strong>Flash</strong> adalah pilihan default gratis dari Google. Kalau kamu punya API key berbayar dan ingin tafsir atau rujukan hadis yang lebih lengkap, silakan pilih <strong>Gemini 2.5 Pro</strong> ya.
        </span>
      </div>
    </div>
  );
};
