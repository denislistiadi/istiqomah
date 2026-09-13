import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  color?: 'emerald' | 'gold' | 'sky';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  color = 'emerald',
  size = 'md',
}) => {
  const safeValue = isNaN(value) ? 0 : value;
  const clampedValue = Math.min(100, Math.max(0, safeValue));

  const heightClass = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }[size];

  const colorGradient = {
    emerald: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400',
    gold: 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400',
    sky: 'bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400',
  }[color];

  return (
    <div className="w-full space-y-1.5">
      {(label || sublabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>}
          {sublabel && <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{sublabel}</span>}
        </div>
      )}
      <div className={`w-full bg-zinc-200 dark:bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-zinc-300/60 dark:border-zinc-700/40 ${heightClass}`}>
        <div
          style={{
            width: `${clampedValue}%`,
            minWidth: clampedValue > 0 ? '6px' : '0px',
          }}
          className={`h-full rounded-full shadow-sm transition-all duration-500 ease-out ${colorGradient}`}
        />
      </div>
    </div>
  );
};
