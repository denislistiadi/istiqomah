import React from 'react';
import { Bell, Clock } from '@phosphor-icons/react';
import { Toggle } from '../ui/Toggle';
import { requestNotificationPermission } from '@/lib/notifications';

export interface NotificationSettingsProps {
  enabled: boolean;
  subuhTime: string;
  maghribTime: string;
  onToggleNotifications: (enabled: boolean) => Promise<void>;
  onUpdateTime: (field: 'subuhTime' | 'maghribTime', time: string) => Promise<void>;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  enabled,
  subuhTime,
  maghribTime,
  onToggleNotifications,
  onUpdateTime,
}) => {
  const handleToggle = async (checked: boolean) => {
    if (checked) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        alert('Biar nggak kelewatan amalan, yuk izinkan notifikasi di browser atau ponselmu ya!');
        return;
      }
    }
    await onToggleNotifications(checked);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bell size={18} className="text-emerald-600 dark:text-emerald-400" />
        <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Alarm & Pengingat Ibadah
        </label>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
        <Toggle
          checked={enabled}
          onChange={handleToggle}
          label="Nyalakan Pengingat Harian"
          description="Saling mengingatkan di waktu Subuh dan evaluasi santai ba'da Maghrib"
        />

        {enabled && (
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                <Clock size={13} />
                <span>Waktu Subuh</span>
              </label>
              <input
                type="time"
                value={subuhTime}
                onChange={(e) => onUpdateTime('subuhTime', e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                <Clock size={13} />
                <span>Waktu Maghrib</span>
              </label>
              <input
                type="time"
                value={maghribTime}
                onChange={(e) => onUpdateTime('maghribTime', e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
