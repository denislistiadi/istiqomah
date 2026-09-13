import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, BookOpen, ChartBar, GearSix } from '@phosphor-icons/react';

export type NavTab = 'home' | 'quran' | 'analytics' | 'settings';

export interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home' as NavTab,
      label: 'Hari Ini',
      icon: CalendarCheck,
    },
    {
      id: 'quran' as NavTab,
      label: 'Al-Quran',
      icon: BookOpen,
    },
    {
      id: 'analytics' as NavTab,
      label: 'Analisis',
      icon: ChartBar,
    },
    {
      id: 'settings' as NavTab,
      label: 'Pengaturan',
      icon: GearSix,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-auto">
      <div className="max-w-lg mx-auto px-4 pb-2 pt-1">
        <div className="glass-nav rounded-3xl p-1.5 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl flex-1 transition-all duration-200 select-none group outline-none focus:outline-none focus:ring-0"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl shadow-sm"
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    size={22}
                    weight={isActive ? 'fill' : 'regular'}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                        : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'
                    }`}
                  />
                  <span
                    className={`text-[11px] mt-1 font-medium transition-colors duration-200 ${
                      isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
