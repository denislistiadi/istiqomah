import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'elevated' | 'glow';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  }[padding];

  const variantClasses = {
    default: 'bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-sm',
    glass: 'glass-card text-zinc-900 dark:text-zinc-100',
    elevated: 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-zinc-200/50 dark:shadow-black/40 text-zinc-900 dark:text-zinc-100',
    glow: 'bg-white dark:bg-zinc-900/90 border border-emerald-500/30 shadow-md shadow-emerald-500/10 text-zinc-900 dark:text-zinc-100',
  }[variant];

  return (
    <motion.div
      className={`rounded-2xl ${paddingClasses} ${variantClasses} transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
