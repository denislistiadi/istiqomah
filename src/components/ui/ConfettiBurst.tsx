import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ConfettiBurstProps {
  active: boolean;
  onComplete?: () => void;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ffffff', '#6ee7b7'];
      const newParticles = Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * 360 * (Math.PI / 180);
        const distance = Math.random() * 160 + 60;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          color: colors[i % colors.length],
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
        };
      });
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: 1,
                rotate: p.rotation + 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.id % 2 === 0 ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
