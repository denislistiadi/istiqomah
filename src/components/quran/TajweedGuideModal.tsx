import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { TAJWEED_CATEGORIES, TAJWEED_RULES } from '@/lib/tajweed';
import { MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';

export interface TajweedGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRuleId?: string;
}

export const TajweedGuideModal: React.FC<TajweedGuideModalProps> = ({
  isOpen,
  onClose,
  initialRuleId,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allRules = Object.values(TAJWEED_RULES);

  const filteredRules = allRules.filter((rule) => {
    const matchesCategory =
      selectedCategoryId === 'all' ||
      (selectedCategoryId === 'nun_tanwin' && rule.category.includes('Nun')) ||
      (selectedCategoryId === 'qalqalah' && rule.category.includes('Qalqalah')) ||
      (selectedCategoryId === 'ghunnah' && rule.category.includes('Ghunnah')) ||
      (selectedCategoryId === 'mim_sukun' && rule.category.includes('Mim')) ||
      (selectedCategoryId === 'mad' && rule.category.includes('Mad')) ||
      (selectedCategoryId === 'silent' && (rule.category.includes('Khusus') || rule.category.includes('Idgham Lainnya')));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      rule.name.toLowerCase().includes(q) ||
      rule.arabicName.includes(q) ||
      rule.description.toLowerCase().includes(q) ||
      rule.colorName.toLowerCase().includes(q) ||
      (rule.letters && rule.letters.some((l) => l.includes(q)));

    return matchesCategory && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Panduan Lengkap Ilmu Tajwid"
      subtitle="Kamus warna dan kaidah hukum membaca Al-Quran sesuai kaidah shahih"
      maxWidth="xl"
    >
      <div className="space-y-5 pb-2">
        {/* Search & Category Filter */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari hukum tajwid (misal: Ikhfa, Qalqalah, Mad, Dengung)..."
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scroll text-xs">
            <button
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategoryId === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Semua Hukum ({allRules.length})
            </button>
            {TAJWEED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedCategoryId === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Rules Grid */}
        <div className="space-y-3">
          {filteredRules.map((rule) => {
            const isInitial = initialRuleId === rule.id;

            return (
              <div
                key={rule.id}
                className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 ${
                  isInitial
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {/* Header: Color Indicator + Rule Name + Category */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs ring-2 ring-white dark:ring-zinc-800"
                      style={{ backgroundColor: rule.colorHex }}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {rule.name}
                        </h4>
                        <span className="font-arabic text-base font-semibold text-emerald-600 dark:text-emerald-400">
                          {rule.arabicName}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                        {rule.category} • Warna: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{rule.colorName}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    {rule.harakat}
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {rule.description}
                </p>

                {/* How to read card */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-xs">
                  <CheckCircle size={15} weight="bold" className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    <strong className="text-zinc-900 dark:text-white">Cara Baca:</strong> {rule.howToRead}
                  </span>
                </div>

                {/* Letters and Examples */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {rule.letters && rule.letters.length > 0 && (
                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                        Huruf-Huruf ({rule.letters.length}):
                      </span>
                      <div className="flex flex-wrap gap-1 font-arabic text-sm text-zinc-800 dark:text-zinc-200 font-bold">
                        {rule.letters.map((ltr, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600"
                          >
                            {ltr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                      Contoh Potongan Ayat:
                    </span>
                    <p className={`font-arabic text-base font-bold ${rule.textColorClass} text-right py-0.5`}>
                      {rule.exampleArabic}
                    </p>
                    <p className="text-[10px] text-zinc-500 italic truncate">
                      {rule.exampleTrans}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredRules.length === 0 && (
            <div className="text-center py-12 text-zinc-500 text-xs">
              Tidak ada hukum tajwid yang cocok dengan "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
