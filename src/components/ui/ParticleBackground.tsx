import React, { useMemo } from 'react';

export const ParticleBackground: React.FC = () => {
  // Generate random static particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      size: Math.random() * 4 + 2,
      duration: `${Math.random() * 4 + 5}s`,
      delay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.4 + 0.2,
      color: i % 2 === 0 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(251, 191, 36, 0.35)',
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-float blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
