import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { GeminiModel } from '@/types';
import { ModelSelector } from '@/components/settings/ModelSelector';
import { ApiKeyInput } from '@/components/settings/ApiKeyInput';
import { ApiKeyGuide } from '@/components/settings/ApiKeyGuide';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { DataManager } from '@/components/settings/DataManager';
import { ToastMessage, ToastContainer } from '@/components/ui/Toast';
import { Info, Heart } from '@phosphor-icons/react';

export const SettingsPage: React.FC = () => {
  const settings = useLiveQuery(() => db.settings.get('main'));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSaveApiKey = async (encryptedData: { encrypted: string; salt: string; iv: string }) => {
    await db.settings.update('main', {
      encryptedApiKey: encryptedData.encrypted,
      apiKeySalt: encryptedData.salt,
      apiKeyIv: encryptedData.iv,
    });
    addToast('success', 'API Key berhasil dienkripsi dan disimpan.');
  };

  const handleRemoveApiKey = async () => {
    await db.settings.update('main', {
      encryptedApiKey: undefined,
      apiKeySalt: undefined,
      apiKeyIv: undefined,
    });
    addToast('info', 'API Key telah dihapus dari perangkat.');
  };

  const handleSelectModel = async (model: GeminiModel) => {
    await db.settings.update('main', { geminiModel: model });
    addToast('success', `Model AI aktif diubah ke ${model}`);
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    await db.settings.update('main', { notificationsEnabled: enabled });
    addToast('success', enabled ? 'Notifikasi harian diaktifkan' : 'Notifikasi harian dinonaktifkan');
  };

  const handleUpdateTime = async (field: 'subuhTime' | 'maghribTime', time: string) => {
    await db.settings.update('main', { [field]: time });
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="pt-1">
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          Preferensi
        </span>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5">
          Pengaturan Aplikasi
        </h1>
      </div>

      {/* Theme Settings */}
      <section className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
        <ThemeToggle />
      </section>

      {/* Gemini AI & Model Selector */}
      <section className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 space-y-6 shadow-xs">
        <ApiKeyInput
          hasKey={Boolean(settings?.encryptedApiKey)}
          onSaveKey={handleSaveApiKey}
          onRemoveKey={handleRemoveApiKey}
        />

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <ModelSelector
            selectedModel={settings?.geminiModel || 'gemini-2.0-flash'}
            onSelectModel={handleSelectModel}
          />
        </div>

        <div className="pt-2">
          <ApiKeyGuide />
        </div>
      </section>

      {/* Notifications */}
      <section className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
        <NotificationSettings
          enabled={settings?.notificationsEnabled || false}
          subuhTime={settings?.subuhTime || '04:30'}
          maghribTime={settings?.maghribTime || '18:00'}
          onToggleNotifications={handleToggleNotifications}
          onUpdateTime={handleUpdateTime}
        />
      </section>

      {/* Data Management */}
      <section className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
        <DataManager
          onSuccess={(msg) => addToast('success', msg)}
          onError={(msg) => addToast('error', msg)}
        />
      </section>

      {/* About Application */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-slate-50 to-white dark:from-zinc-900/80 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-3 text-center shadow-xs">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <Info size={16} />
          <span>Tentang Istiqomah</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
          Aplikasi PWA pelacak kebiasaan ibadah Islami harian yang 100% berjalan di peramban perangkat Anda (IndexedDB), tanpa peladen eksternal, menjaga privasi data Anda sepenuhnya.
        </p>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center gap-1 text-[11px] text-zinc-500">
          <span>Dibuat dengan</span>
          <Heart size={12} weight="fill" className="text-rose-500" />
          <span>untuk ummat Islam sedunia • Versi 1.0.0</span>
        </div>
      </section>

      {/* Toast Feedback */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
};
