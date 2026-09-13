import React from 'react';
import { Moon, Sun, Monitor } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { themeSetting, setTheme } = useTheme();

  const options = [
    { id: 'dark' as const, label: 'Gelap', icon: Moon },
    { id: 'light' as const, label: 'Terang', icon: Sun },
    { id: 'system' as const, label: 'Sistem', icon: Monitor },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
        Tema Tampilan
      </label>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = themeSetting === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/20'
                  : 'bg-zinc-100 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-900'
              }`}
            >
              <Icon size={16} weight={isSelected ? 'fill' : 'regular'} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
