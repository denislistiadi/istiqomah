import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, WarningCircle, Info, X } from '@phosphor-icons/react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icon = {
            success: <CheckCircle size={20} weight="fill" className="text-emerald-400 shrink-0" />,
            error: <WarningCircle size={20} weight="fill" className="text-rose-400 shrink-0" />,
            info: <Info size={20} weight="fill" className="text-sky-400 shrink-0" />,
          }[toast.type];

          const borderColors = {
            success: 'border-emerald-500/30 bg-zinc-900/95',
            error: 'border-rose-500/30 bg-zinc-900/95',
            info: 'border-sky-500/30 bg-zinc-900/95',
          }[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl shadow-black/60 border ${borderColors} backdrop-blur-md`}
            >
              <div className="flex items-center gap-2.5">
                {icon}
                <span className="text-xs font-medium text-zinc-100 leading-snug">
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} weight="bold" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
