import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { defaultConfig } from '../config';

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
};

export const YesScreen = ({ config }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);

  const cfg = { ...defaultConfig, ...config };
  const { yesMessage, celebrationBottomLine1, celebrationBottomLine2 } = cfg;

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(true), 400);
    const t2 = setTimeout(() => setRecycleConfetti(false), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, type: 'spring', bounce: 0.4 }}
      style={{
        position: 'relative',
        zIndex: 30,
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '400px',
        justifyContent: 'center',
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={recycleConfetti}
          numberOfPieces={width < 768 ? 100 : 250}
          gravity={0.15}
          initialVelocityY={20}
          colors={['#F4C95D', '#F26A73', '#E85B91', '#ffffff', '#9333ea']}
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
      )}

      <div className="glass-card-premium" style={{
        position: 'relative',
        borderRadius: '2rem',
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Pink glow blob */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '160px', height: '160px',
          background: 'var(--color-dandiya-pink)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.2,
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Big emoji */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}
          >
            💃🏻
          </motion.div>

          {/* YAYYY */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 7vw, 3rem)',
            background: 'linear-gradient(180deg, #FFF1F5, #F4C95D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            marginBottom: '0.5rem',
            textAlign: 'center',
          }}>
            YAYYYYY! 🎉🎊
          </h1>

          {/* Sticks row */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
            {['🥢', '✨', '🥢'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ rotate: i === 1 ? [0, 360] : [-10, 10, -10] }}
                transition={{ duration: i === 1 ? 3 : 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          {/* Status section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center', width: '100%', marginBottom: '1.25rem' }}>
            <p style={{
              color: 'var(--color-dandiya-gold)',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              It's official!
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.125rem, 4vw, 1.375rem)',
              color: '#fff',
              fontWeight: 600,
              lineHeight: 1.375,
              whiteSpace: 'pre-line',
            }}>
              {yesMessage}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', paddingTop: '0.25rem' }}>
              Navratri just got a whole lot more fun. 🌟
            </p>
          </div>
        </motion.div>

        {/* Status card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="glass-status"
          style={{
            width: '100%',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '1.25rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Row 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}>
                Partner Status
              </span>
              <span style={{
                fontWeight: 700,
                color: '#86efac',
                background: 'rgba(5,223,114,0.1)',
                border: '1px solid rgba(5,223,114,0.2)',
                padding: '0.125rem 0.5rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                boxShadow: '0 0 8px rgba(74,222,128,0.3)',
              }}>
                CONFIRMED ✅
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />

            {/* Row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}>
                Mission Dandiya
              </span>
              <span style={{
                fontWeight: 700,
                color: 'var(--color-dandiya-gold)',
                background: 'rgba(244,201,93,0.1)',
                border: '1px solid rgba(244,201,93,0.2)',
                padding: '0.125rem 0.5rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                boxShadow: '0 0 8px rgba(244,201,93,0.3)',
              }}>
                ACCEPTED 🎯
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <p style={{
            fontSize: '0.8125rem',
            color: 'rgba(252,231,243,0.9)',
            fontStyle: 'italic',
            lineHeight: 1.375,
            padding: '0 1rem',
          }}>
            {celebrationBottomLine1}
          </p>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--color-dandiya-cream)',
            fontWeight: 600,
            letterSpacing: '0.025em',
          }}>
            {celebrationBottomLine2}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
