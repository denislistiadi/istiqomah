import React, { useRef, useState } from 'react';
import { DownloadSimple, UploadSimple, ArrowsClockwise, Warning } from '@phosphor-icons/react';
import { exportUserData, downloadJsonFile, importUserData, resetAllData } from '@/lib/data-manager';
import { logError } from '@/lib/logger';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export interface DataManagerProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const DataManager: React.FC<DataManagerProps> = ({ onSuccess, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      const json = await exportUserData();
      const filename = `istiqomah_backup_${new Date().toISOString().split('T')[0]}.json`;
      downloadJsonFile(json, filename);
      onSuccess('Alhamdulillah, berkas cadangan data berhasil diunduh.');
    } catch (err) {
      logError('Failed to export data:', err);
      onError('Maaf, gagal membuat berkas cadangan data.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const text = await file.text();
      await importUserData(text);
      onSuccess('Alhamdulillah, seluruh data amalan dan khatam berhasil dipulihkan.');
    } catch (err: any) {
      logError('Failed to import data:', err);
      onError('Format berkas tidak sesuai atau data rusak.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReset = async () => {
    try {
      setIsProcessing(true);
      await resetAllData();
      setIsResetModalOpen(false);
      onSuccess('Data aplikasi telah dikembalikan ke awal.');
    } catch (err) {
      logError('Failed to reset data:', err);
      onError('Gagal mereset data.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
        Simpan & Cadangan Data
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
          disabled={isProcessing}
        >
          <DownloadSimple size={16} />
          <span>Cadangkan (Backup)</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
        >
          <UploadSimple size={16} />
          <span>Pulihkan (Restore)</span>
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="pt-1">
        <Button
          variant="danger"
          size="sm"
          fullWidth
          onClick={() => setIsResetModalOpen(true)}
          disabled={isProcessing}
        >
          <ArrowsClockwise size={16} />
          <span>Mulai dari Awal (Reset)</span>
        </Button>
      </div>

      {/* Confirmation Modal for Data Reset */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Mulai Ulang dari Awal?"
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-start gap-3 text-rose-800 dark:text-rose-300 text-xs">
            <Warning size={20} className="shrink-0 mt-0.5 text-rose-600" />
            <p className="leading-relaxed">
              Semua catatan amalan, riwayat tilawah, dan progres khatam akan dihapus bersih. Kalau masih ingin datanya, pastikan sudah kamu cadangkan (backup) dulu ya.
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setIsResetModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={handleReset}
              disabled={isProcessing}
            >
              Ya, Reset Saja
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
