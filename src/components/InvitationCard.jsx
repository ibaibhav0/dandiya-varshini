import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultConfig } from '../config';

// Dancing sticks decoration
const DancingSticks = () => (
  <motion.div
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '0.5rem' }}
  >
    🥢
  </motion.div>
);

// Decorative divider
const GoldDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    margin: '0.25rem 0',
  }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(244,201,93,0.4))' }} />
    <span style={{ color: 'var(--color-dandiya-gold)', fontSize: '0.875rem' }}>✦</span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(244,201,93,0.4))' }} />
  </div>
);

// YES Button with animated glow
const YesButton = ({ scale, onClick }) => (
  <motion.button
    onClick={onClick}
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, var(--color-dandiya-pink), var(--color-dandiya-coral))',
      border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff',
      fontWeight: 600,
      padding: '0.75rem 2.5rem',
      borderRadius: '999px',
      boxShadow: '0 4px 15px rgba(232,91,145,0.4)',
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none',
      zIndex: 20,
      scale,
    }}
    animate={{
      boxShadow: [
        '0 0 10px rgba(232,91,145,0.4)',
        '0 0 20px rgba(232,91,145,0.7)',
        '0 0 10px rgba(232,91,145,0.4)',
      ]
    }}
    transition={{ boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
    whileHover={{ scale: scale * 1.05 }}
    whileTap={{ scale: scale * 0.95 }}
  >
    <span style={{ position: 'relative', zIndex: 10, fontSize: '1.25rem', letterSpacing: '0.025em' }}>
      YES 💃
    </span>
  </motion.button>
);

// NO Button - gets smaller as user clicks YES
const NoButton = ({ scale, onClick }) => (
  <motion.button
    onClick={onClick}
    style={{
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.9)',
      fontWeight: 500,
      padding: '0.75rem 2rem',
      borderRadius: '999px',
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none',
      zIndex: 10,
      scale,
    }}
    whileHover={{ scale: scale > 0.5 ? scale + 0.05 : scale }}
    whileTap={{ scale: scale > 0.5 ? scale - 0.05 : scale }}
  >
    <span style={{ fontSize: '1.125rem' }}>NO 🙅</span>
  </motion.button>
);

export const InvitationCard = ({ config, onYes, heartsRef }) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [shake, setShake] = useState(false);

  const cfg = { ...defaultConfig, ...config };
  const {
    herName, question, subtext, funnySubtext, bottomLine, noMessages
  } = cfg;

  const yesScale = Math.min(1 + noClickCount * 0.15, 1.8);
  const noScale = Math.max(1 - noClickCount * 0.1, 0.5);

  const currentMessage = noClickCount === 0
    ? funnySubtext
    : noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];

  const handleNo = () => {
    setNoClickCount(c => c + 1);
    setShake(true);
    heartsRef?.current?.addHearts(3);
    setTimeout(() => setShake(false), 300);
  };

  const displayName = herName || 'you';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="glass-card-premium"
        style={{
          width: '100%',
          borderRadius: '2rem',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '160px', height: '160px',
          background: 'var(--color-dandiya-pink)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.15,
          pointerEvents: 'none',
        }} />

        {/* Top badge */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '999px',
          padding: '0.375rem 1rem',
          marginBottom: '1.25rem',
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-dandiya-cream)' }}>
            🌙 One tiny question for you... 🌙
          </span>
        </div>

        {/* Hey line */}
        <h2 style={{
          position: 'relative',
          zIndex: 10,
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.95rem, 3vw, 1.05rem)',
          fontWeight: 500,
          color: 'var(--color-dandiya-cream)',
          marginBottom: '0.25rem',
          width: '100%',
        }}>
          Hey {displayName}... 🫶
        </h2>

        <p style={{
          position: 'relative',
          zIndex: 10,
          fontSize: '0.8125rem',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 500,
          letterSpacing: '0.025em',
          marginBottom: '1.25rem',
        }}>
          I have a tiny question for you...
        </p>

        {/* Main question */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', marginBottom: '0.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 6vw, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '0.025em',
            background: 'linear-gradient(135deg, #FFF1F5, #F4C95D, #E85B91)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            whiteSpace: 'pre-line',
          }}>
            {question}
          </h1>
        </div>

        <GoldDivider />

        {/* Subtext + rotating message */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
          <p style={{
            color: 'var(--color-dandiya-gold)',
            fontWeight: 500,
            fontSize: '0.9375rem',
            lineHeight: 1.375,
            marginBottom: '0.75rem',
          }}>
            {subtext}
          </p>
          <div style={{ height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: 'rgba(255,241,245,0.9)',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.625,
                }}
              >
                {currentMessage}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* YES/NO Buttons */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          marginBottom: '1rem',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 4vw, 1.5rem)',
          }}>
            <YesButton scale={yesScale} onClick={onYes} />
            <NoButton scale={noScale} onClick={handleNo} />
          </div>
        </div>

        {/* Bottom line */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: '0.5rem',
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            {bottomLine}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
