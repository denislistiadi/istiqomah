import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { searchIslamicPrayer } from '@/lib/gemini';
import { GeminiPrayerResponse } from '@/types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { MagnifyingGlass, Sparkle, PlusCircle, BookBookmark, WarningCircle } from '@phosphor-icons/react';

export interface PrayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsHabit: (title: string, description: string) => void;
  onOpenSettings: () => void;
}

export const PrayerSearchModal: React.FC<PrayerSearchModalProps> = ({
  isOpen,
  onClose,
  onAddAsHabit,
  onOpenSettings,
}) => {
  const settings = useLiveQuery(() => db.settings.get('main'));
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeminiPrayerResponse | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);

  const hasApiKey = Boolean(settings?.encryptedApiKey);
  const activeModel = settings?.geminiModel || 'gemini-2.0-flash';

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isLoading) return;

    if (!hasApiKey) {
      setErrorType('API_KEY_MISSING');
      return;
    }

    setIsLoading(true);
    setErrorType(null);
    setResult(null);

    try {
      const data = await searchIslamicPrayer(query);
      setResult(data);
    } catch (err: any) {
      setErrorType(err?.message || 'UNKNOWN_ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToHabits = () => {
    if (result) {
      onAddAsHabit(result.title, `${result.source}: ${result.benefit}`);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cari Doa & Dzikir Shahih"
      subtitle="Temukan rujukan doa yang tepat dari Al-Quran dan Hadis sesuai hajat atau keadaanmu"
      maxWidth="lg"
    >
      <div className="space-y-4 pt-1">
        {/* Active Model Indicator */}
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <Sparkle size={14} className="text-amber-500" />
            <span>Pencarian Cerdas:</span>
          </div>
          <Badge variant="gold" size="sm">
            {activeModel}
          </Badge>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tulis hajatmu (misal: hati sedang gelisah, rezeki halal)..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl pl-10 pr-4 py-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
            />
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!query.trim() || isLoading}
          >
            {isLoading ? 'Mencari Rujukan Doa Shahih...' : 'Cari Rujukan Doa'}
          </Button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            'Hati lagi cemas',
            'Biar rezeki berkah',
            'Mohon kesembuhan',
            'Kebaikan dunia akhirat',
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setQuery(chip);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Error States */}
        {errorType === 'API_KEY_MISSING' && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <WarningCircle size={16} />
              <span>API Key Gemini Belum Diisi</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300">
              Yuk masukkan dulu API Key Google Gemini gratis kamu di Pengaturan agar fitur pencarian doa shahih ini bisa digunakan.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
            >
              Buka Pengaturan API
            </Button>
          </div>
        )}

        {errorType && errorType !== 'API_KEY_MISSING' && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
            <WarningCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Belum berhasil memuat doa</p>
              <p className="text-zinc-600 dark:text-zinc-300 mt-0.5">
                {errorType === 'API_KEY_INVALID'
                  ? 'Kunci API tampaknya kurang pas atau sudah kedaluwarsa.'
                  : errorType === 'QUOTA_EXCEEDED'
                  ? 'Batas kuota harian Gemini sedang penuh. Coba sebentar lagi ya.'
                  : errorType === 'MODEL_UNSUPPORTED'
                  ? 'Model Gemini ini tidak didukung oleh akunmu. Coba ganti ke model Flash ya.'
                  : 'Coba periksa koneksi internetmu sebentar ya.'}
              </p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/60 space-y-3 animate-pulse">
            <Skeleton variant="text" className="w-1/2 h-5" />
            <Skeleton variant="rectangular" height={50} className="w-full" />
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="rectangular" height={36} className="w-full" />
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/90 border border-emerald-500/30 space-y-3.5 shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {result.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  <BookBookmark size={13} className="text-amber-500" />
                  <span>{result.source}</span>
                </div>
              </div>
              <Badge variant="emerald" size="sm">{result.category}</Badge>
            </div>

            {/* Arabic Text */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/60 text-right">
              <p className="font-arabic text-xl text-zinc-900 dark:text-zinc-100 leading-loose">
                {result.arabic}
              </p>
            </div>

            {/* Transliteration */}
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Transliterasi
              </span>
              <p className="text-xs italic text-emerald-800 dark:text-emerald-300">
                {result.latin}
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Arti Terjemahan
              </span>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                "{result.translation}"
              </p>
            </div>

            {/* Benefit */}
            {result.benefit && (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="font-semibold">Keutamaan: </span>
                {result.benefit}
              </div>
            )}

            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleAddToHabits}
              className="mt-2"
            >
              <PlusCircle size={16} weight="bold" />
              <span>Simpan ke Amalan Harian</span>
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
