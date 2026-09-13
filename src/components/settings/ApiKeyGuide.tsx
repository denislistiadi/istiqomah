import React, { useState } from 'react';
import { CaretDown, Question, ArrowSquareOut } from '@phosphor-icons/react';

export const ApiKeyGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          <Question size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>Cara Mudah Mendapatkan Google Gemini API Key Gratis</span>
        </div>
        <CaretDown
          size={14}
          className={`text-zinc-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5 border-t border-zinc-200 dark:border-zinc-800/50">
          <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
            <li>
              Buka situs resmi{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                Google AI Studio <ArrowSquareOut size={12} />
              </a>
            </li>
            <li>Login menggunakan akun Google kamu.</li>
            <li>Klik tombol <strong>"Create API key"</strong>.</li>
            <li>Salin kode kuncinya (yang diawali <code className="text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">AIzaSy...</code>).</li>
            <li>Tempelkan ke kolom di atas, lalu klik "Simpan & Enkripsi". Selesai!</li>
          </ol>
          <p className="text-[11px] text-zinc-500 italic">
            Tenang, kunci API milikmu langsung dienkripsi dan disimpan aman di HP/laptopmu sendiri, tanpa dikirim ke server mana pun.
          </p>
        </div>
      )}
    </div>
  );
};
