import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav, NavTab } from './BottomNav';
import { ParticleBackground } from '../ui/ParticleBackground';
import { scrollToTop } from '@/lib/scroll';

export interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  // Ensure smooth scroll to top when active tab changes or animates
  useEffect(() => {
    scrollToTop('smooth');
  }, [activeTab]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-background-dark text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-700 dark:selection:text-emerald-200 transition-colors duration-200">
      {/* Spiritual ambient floating particles */}
      <ParticleBackground />

      {/* Main app container */}
      <div className="relative z-10 flex-1 w-full max-w-lg mx-auto flex flex-col px-4 pt-4 pb-24 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onAnimationStart={() => scrollToTop('instant')}
            onAnimationComplete={() => scrollToTop('instant')}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

