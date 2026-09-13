import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20 active:bg-emerald-700',
    secondary: 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 active:bg-zinc-300 dark:active:bg-zinc-900',
    ghost: 'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-800',
    danger: 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 active:bg-rose-200 dark:active:bg-rose-600/40',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-950/20',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98, y: -1 }}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
