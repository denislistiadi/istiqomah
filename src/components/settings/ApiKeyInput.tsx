import React, { useState } from 'react';
import { Key, Eye, EyeSlash, Trash, ShieldCheck } from '@phosphor-icons/react';
import { encryptApiKey } from '@/lib/crypto';
import { Button } from '../ui/Button';

export interface ApiKeyInputProps {
  hasKey: boolean;
  onSaveKey: (encryptedData: { encrypted: string; salt: string; iv: string }) => Promise<void>;
  onRemoveKey: () => Promise<void>;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  hasKey,
  onSaveKey,
  onRemoveKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;

    setIsSaving(true);
    try {
      const encryptedData = await encryptApiKey(apiKeyInput.trim());
      await onSaveKey(encryptedData);
      setApiKeyInput('');
    } catch (err) {
      console.error('Failed to encrypt and save API key:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Key size={18} className="text-emerald-600 dark:text-emerald-400" />
          <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            API Key Google Gemini
          </label>
        </div>
        {hasKey && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck size={14} weight="fill" />
            <span>Terenkripsi AES-256</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-2.5">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder={hasKey ? '•••••••••••••••••••••••• (Tersimpan)' : 'Masukkan API Key (AIzaSy...)'}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-2xl pl-4 pr-11 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label={showPassword ? 'Sembunyikan API key' : 'Tampilkan API key'}
          >
            {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            fullWidth
            disabled={!apiKeyInput.trim() || isSaving}
          >
            {isSaving ? 'Mengenkripsi...' : hasKey ? 'Perbarui API Key' : 'Simpan & Enkripsi'}
          </Button>

          {hasKey && (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onRemoveKey}
              title="Hapus API Key dari perangkat"
            >
              <Trash size={16} />
              <span>Hapus</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
