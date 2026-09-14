import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { encryptApiKey } from '@/lib/crypto';
import { logError } from '@/lib/logger';
import { db } from '@/lib/db';
import { Key, Eye, EyeSlash, ShieldCheck, Sparkle, ArrowSquareOut, GearSix } from '@phosphor-icons/react';

export interface ApiKeyPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSettings: () => void;
  onSuccessSave?: () => void;
}

export const ApiKeyPromptModal: React.FC<ApiKeyPromptModalProps> = ({
  isOpen,
  onClose,
  onGoToSettings,
  onSuccessSave,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;

    setIsSaving(true);
    try {
      const encryptedData = await encryptApiKey(apiKeyInput.trim());
      await db.settings.update('main', {
        encryptedApiKey: encryptedData.encrypted,
        apiKeySalt: encryptedData.salt,
        apiKeyIv: encryptedData.iv,
      });
      setApiKeyInput('');
      if (onSuccessSave) onSuccessSave();
      onClose();
    } catch (err) {
      logError('Failed to encrypt and save API key:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Aktifkan Asisten Doa Cerdas"
      subtitle="Hubungkan Google Gemini AI untuk mencari doa & dzikir shahih sesuai keadaan hatimu"
      maxWidth="md"
    >
      <div className="space-y-4 pt-1 text-zinc-900 dark:text-zinc-100">
        {/* Value Proposition Hero Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-zinc-900 dark:to-zinc-900 border border-emerald-200 dark:border-emerald-500/30 flex items-start gap-3 shadow-xs">
          <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <Sparkle size={20} weight="fill" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck size={15} weight="fill" />
              <span>Privasi Terjaga & 100% Gratis</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Kunci API milikmu dienkripsi dengan standar militer AES-GCM 256-bit dan tersimpan hanya di memori perangkatmu sendiri, tanpa server perantara.
            </p>
          </div>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              API Key Google Gemini
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Tempelkan API Key (AIzaSy...)"
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl pl-10 pr-11 py-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs font-mono"
              />
              <Key
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
                aria-label={showPassword ? 'Sembunyikan API key' : 'Tampilkan API key'}
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!apiKeyInput.trim() || isSaving}
          >
            {isSaving ? 'Mengenkripsi & Menyimpan...' : 'Simpan & Aktifkan Sekarang'}
          </Button>
        </form>

        {/* Quick Accordion Guide */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="w-full p-3 flex items-center justify-between text-left font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span>Belum punya API Key? Lihat cara dapat gratis (1 menit)</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
              {isGuideOpen ? 'Tutup' : 'Lihat'}
            </span>
          </button>

          {isGuideOpen && (
            <div className="p-3.5 pt-1 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 space-y-2">
              <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed text-[11px]">
                <li>
                  Buka{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Google AI Studio <ArrowSquareOut size={11} />
                  </a>
                </li>
                <li>Login dengan akun Google Anda.</li>
                <li>Klik tombol <strong>"Create API key"</strong>.</li>
                <li>Salin kode kuncinya (diawali <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">AIzaSy...</code>) lalu tempel ke kolom di atas.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Action Buttons: Later / Go to Settings */}
        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          >
            Nanti Saja
          </button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onGoToSettings}
            className="border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
          >
            <GearSix size={16} />
            <span>Isi Nanti di Pengaturan</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
