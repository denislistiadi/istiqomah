import React from 'react';

export interface BadgeProps {
  variant?: 'emerald' | 'gold' | 'zinc' | 'sky' | 'rose';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'emerald',
  size = 'sm',
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-semibold',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
  }[size];

  const variantClasses = {
    emerald: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30',
    gold: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30',
    zinc: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60',
    sky: 'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-500/30',
    rose: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 leading-none ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
