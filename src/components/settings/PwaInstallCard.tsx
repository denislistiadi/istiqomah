import React from 'react';
import { DeviceMobile, DownloadSimple, CheckCircle } from '@phosphor-icons/react';
import { Button } from '../ui/Button';

export interface PwaInstallCardProps {
  isInstalled: boolean;
  isStandalone: boolean;
  onOpenInstallModal: () => void;
}

export const PwaInstallCard: React.FC<PwaInstallCardProps> = ({
  isInstalled,
  isStandalone,
  onOpenInstallModal,
}) => {
  const isAppMode = isInstalled || isStandalone;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DeviceMobile size={18} className="text-emerald-600 dark:text-emerald-400" />
          <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Aplikasi Web Progresif (PWA)
          </label>
        </div>
        {isAppMode && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle size={14} weight="fill" />
            <span>Terpasang</span>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
        <p className="leading-relaxed">
          {isAppMode
            ? 'Istiqomah telah terpasang sebagai aplikasi mandiri di perangkat ini. Anda dapat mengakses seluruh fitur secara offline kapan saja.'
            : 'Pasang aplikasi Istiqomah langsung ke layar utama ponsel atau komputer Anda untuk akses kilat dan pengalaman layar penuh tanpa bilah browser.'}
        </p>

        {!isAppMode && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onOpenInstallModal}
            className="border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
          >
            <DownloadSimple size={16} weight="bold" />
            <span>Buka Menu Pemasangan Aplikasi</span>
          </Button>
        )}
      </div>
    </div>
  );
};
