import React from 'react';
import { motion } from 'motion/react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <label className={`flex items-center justify-between gap-4 cursor-pointer select-none ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {(label || description) && (
        <div className="flex-1">
          {label && <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</div>}
          {description && <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</div>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          checked ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-800'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
};
