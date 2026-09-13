import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const variantClass = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 my-1',
  }[variant];

  const style: React.CSSProperties = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-zinc-200/80 dark:bg-zinc-800/60 ${variantClass} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent animate-shimmer" />
    </div>
  );
};

export const AyahReaderSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="rectangular" width={60} height={24} />
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton variant="rectangular" height={36} className="w-full" />
            <Skeleton variant="rectangular" height={28} className="w-3/4 ml-auto" />
          </div>
          <div className="pt-2 space-y-2">
            <Skeleton variant="text" className="w-4/5" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
