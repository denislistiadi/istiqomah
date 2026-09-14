import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import {
  DownloadSimple,
  DeviceMobile,
  WifiSlash,
  Sparkle,
  ShareNetwork,
  PlusSquare,
  CheckCircle,
} from '@phosphor-icons/react';

export interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<void>;
  isIos: boolean;
  isInstalled?: boolean;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isIos,
  isInstalled = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pasang Aplikasi Istiqomah"
      subtitle="Jadikan aplikasi mandiri di ponsel atau komputer Anda"
      maxWidth="md"
    >
      <div className="space-y-4 pt-1 text-zinc-900 dark:text-zinc-100">
        {/* App Hero Badge */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white dark:from-emerald-950/40 dark:via-zinc-900 dark:to-zinc-900 border border-emerald-200 dark:border-emerald-500/30">
          <img
            src="/icons/icon-192.png"
            alt="Logo Istiqomah"
            className="w-14 h-14 rounded-2xl shadow-md border border-emerald-500/20 shrink-0 bg-zinc-950 object-cover"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              Istiqomah PWA
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Pelacak Ibadah Harian & Al-Quran 30 Juz
            </p>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkle size={13} weight="fill" />
              <span>Ringan, Cepat & Bebas Iklan</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex sm:flex-col items-center sm:items-start gap-2.5 text-left">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <DeviceMobile size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                1-Tap Layar Utama
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
                Buka instan tanpa perlu mengetik URL peramban.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex sm:flex-col items-center sm:items-start gap-2.5 text-left">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <WifiSlash size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Akses Penuh Offline
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
                Tetap bisa tilawah dan ceklis amalan di mana saja.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex sm:flex-col items-center sm:items-start gap-2.5 text-left">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Layar Penuh Mandiri
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
                Pengalaman aplikasi native tanpa bilah peramban.
              </div>
            </div>
          </div>
        </div>

        {/* Content for iOS vs Android/Desktop */}
        {isIos ? (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs">
            <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ShareNetwork size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Panduan Pemasangan untuk iPhone / iPad (Safari)</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1.5 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
              <li>
                Ketuk tombol <strong>Bagikan (Share)</strong>{' '}
                <ShareNetwork size={13} className="inline text-emerald-600" /> pada bilah menu
                bawah Safari.
              </li>
              <li>
                Gulir ke bawah dan pilih opsi{' '}
                <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>{' '}
                <PlusSquare size={13} className="inline text-emerald-600" />.
              </li>
              <li>
                Ketuk <strong>Tambah</strong> di sudut kanan atas layar ponsel Anda.
              </li>
            </ol>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Nanti Saja
          </Button>

          {!isIos ? (
            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={onInstall}
              disabled={isInstalled}
            >
              <DownloadSimple size={16} weight="bold" />
              <span>{isInstalled ? 'Sudah Terpasang' : 'Pasang Sekarang'}</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={onClose}
            >
              <span>Saya Mengerti</span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
