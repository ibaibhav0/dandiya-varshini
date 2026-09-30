import React from 'react';
import { motion } from 'framer-motion';

// Floating petals background
const PetalParticle = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      fontSize: '1.2rem',
      pointerEvents: 'none',
      ...style
    }}
  >
    🌸
  </div>
);

const FloatingPetals = () => {
  const petals = React.useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animDuration: `${6 + Math.random() * 8}s`,
      animDelay: `${Math.random() * 6}s`,
      size: `${0.7 + Math.random() * 0.8}rem`,
      opacity: 0.15 + Math.random() * 0.3,
    })), []
  );

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animation: `petal-fall ${p.animDuration} linear ${p.animDelay} infinite`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

// Ambient glow blobs
const AmbientGlow = () => (
  <>
    <div style={{
      position: 'fixed', top: '-10%', left: '-10%',
      width: '50vw', height: '50vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(232,91,145,0.12) 0%, transparent 70%)',
      animation: 'ambient-glow 6s ease-in-out infinite',
      pointerEvents: 'none', zIndex: 0,
    }} />
    <div style={{
      position: 'fixed', bottom: '-10%', right: '-10%',
      width: '60vw', height: '60vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(244,201,93,0.08) 0%, transparent 70%)',
      animation: 'ambient-glow 8s ease-in-out 2s infinite',
      pointerEvents: 'none', zIndex: 0,
    }} />
  </>
);

// Candle/lamp decoration
const DivaLamp = ({ style }) => (
  <motion.div
    style={{
      fontSize: '2.5rem',
      filter: 'drop-shadow(0 0 10px rgba(244,201,93,0.8))',
      ...style
    }}
    animate={{ scale: [1, 1.05, 1], rotate: [-3, 3, -3] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    🪔
  </motion.div>
);

// Rangoli ring decoration
const RangoliRing = ({ size = 200, style }) => (
  <div style={{
    width: size, height: size,
    borderRadius: '50%',
    border: '2px solid rgba(244,201,93,0.2)',
    position: 'absolute',
    animation: 'rotate-rangoli 20s linear infinite',
    ...style
  }}>
    {['🌟','✨','⭐','💫'].map((s, i) => (
      <span key={i} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: `rotate(${i * 90}deg) translateY(-${size/2}px) translateX(-50%)`,
        fontSize: '0.7rem',
      }}>{s}</span>
    ))}
  </div>
);

// Sticks decoration
const DandiyaSticks = ({ style }) => (
  <motion.div
    style={{ fontSize: '3rem', ...style }}
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    🥢
  </motion.div>
);

// Heart burst component
const HeartParticle = ({ x, scale, rotation, duration, onDone }) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `calc(50% + ${x}px)`,
        bottom: '40%',
        fontSize: `${scale * 1.5}rem`,
        pointerEvents: 'none',
        zIndex: 100,
      }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -200, rotate: rotation }}
      transition={{ duration, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      ❤️
    </motion.div>
  );
};

export {
  FloatingPetals,
  AmbientGlow,
  DivaLamp,
  RangoliRing,
  DandiyaSticks,
  HeartParticle,
};
