import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo, useDragControls } from 'motion/react';
import { X } from '@phosphor-icons/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  const [mounted, setMounted] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged downwards more than 80px or with strong downward velocity (> 300px/s)
    if (info.offset.y > 80 || (info.offset.y > 30 && info.velocity.y > 300)) {
      onClose();
    }
  };

  const maxWClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    full: 'sm:max-w-3xl',
  }[maxWidth];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-0"
            aria-hidden="true"
          />

          {/* Modal Panel Container with Drag to Dismiss */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            className={`relative w-full ${maxWClasses} glass-modal rounded-t-[32px] sm:rounded-3xl px-5 pt-3 pb-8 sm:px-6 sm:pt-5 sm:pb-6 shadow-2xl shadow-zinc-950/50 dark:shadow-black/95 max-h-[88dvh] sm:max-h-[85vh] flex flex-col z-10 text-zinc-900 dark:text-zinc-100 touch-manipulation`}
            style={{
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 2rem, 2rem)',
            }}
          >
            {/* Mobile Sheet Pull Indicator Area */}
            <div
              className="w-full flex items-center justify-center py-2 -mt-1 mb-1 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors" />
            </div>

            {/* Header */}
            {(title || subtitle) && (
              <div className="flex items-start justify-between pb-3.5 mb-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
                <div className="pr-2 min-w-0">
                  {title && (
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 -mr-1 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors shrink-0 cursor-pointer"
                  aria-label="Tutup popup"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
            )}

            {/* Content body with responsive scrolling & bottom breathing room */}
            <div className="overflow-y-auto flex-1 pr-1 pb-4 sm:pb-2 overscroll-contain custom-scroll">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
};


