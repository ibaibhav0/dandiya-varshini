import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultConfig } from './config';
import { NameForm } from './components/NameForm';
import { InvitationCard } from './components/InvitationCard';
import { YesScreen } from './components/YesScreen';
import { FloatingPetals, AmbientGlow, DivaLamp, HeartParticle } from './components/Decorations';

// Music player hook
const useMusic = (src) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing, src]);

  return { playing, toggle };
};

// Heart tracker component
const HeartsOverlay = React.forwardRef((_, ref) => {
  const [hearts, setHearts] = useState([]);

  React.useImperativeHandle(ref, () => ({
    addHearts: (count = 3, burst = false) => {
      const newHearts = Array.from({ length: count }).map(() => ({
        id: Date.now() + Math.random(),
        x: burst ? Math.random() * 100 - 50 : Math.random() * 40 - 20,
        scale: Math.random() * 0.5 + 0.8,
        rotation: Math.random() * 60 - 30,
        duration: burst ? Math.random() * 2 + 3 : 2.5,
      }));
      setHearts(h => [...h, ...newHearts]);
      setTimeout(() => {
        setHearts(h => h.filter(hh => !newHearts.find(n => n.id === hh.id)));
      }, 6000);
    }
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      <AnimatePresence>
        {hearts.map(heart => (
          <HeartParticle key={heart.id} {...heart} />
        ))}
      </AnimatePresence>
    </div>
  );
});

// Music toggle button
const MusicButton = ({ playing, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 40,
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '999px',
      padding: '0.5rem 1rem',
      color: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      backdropFilter: 'blur(8px)',
    }}
  >
    {playing ? '🔊' : '🔇'}
    <span>{playing ? 'Music On' : 'Music Off'}</span>
  </motion.button>
);

// Main scenes
const SCENES = {
  FORM: 'form',
  INVITE: 'invite',
  YES: 'yes',
};

export default function App() {
  const [scene, setScene] = useState(SCENES.FORM);
  const [customName, setCustomName] = useState('');
  const heartsRef = useRef(null);

  // Build config based on custom name (or default)
  const config = {
    ...defaultConfig,
    herName: customName || defaultConfig.herName,
  };

  const { playing, toggle: toggleMusic } = useMusic(config.song);

  // Check URL for pre-filled name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('for') || params.get('name');
    if (nameParam) {
      setCustomName(nameParam);
      setScene(SCENES.INVITE);
    }
  }, []);

  const handleFormSubmit = (name) => {
    setCustomName(name);
    setScene(SCENES.INVITE);
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('for', name);
    window.history.replaceState({}, '', url.toString());
  };

  const handleYes = () => {
    heartsRef.current?.addHearts(8, true);
    setTimeout(() => setScene(SCENES.YES), 200);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100%',
      background: 'var(--color-dandiya-bg1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 0',
    }}>
      {/* Background layers */}
      <AmbientGlow />
      <FloatingPetals />

      {/* Decorative lamps */}
      <DivaLamp style={{
        position: 'fixed',
        top: '1.5rem',
        left: '1rem',
        zIndex: 5,
        opacity: 0.8,
      }} />
      <DivaLamp style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1rem',
        zIndex: 5,
        opacity: 0.7,
        fontSize: '2rem',
      }} />

      {/* Rangoli circles */}
      <div style={{
        position: 'fixed',
        top: '-100px',
        right: '-100px',
        zIndex: 0,
        opacity: 0.15,
      }}>
        <div style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '2px solid var(--color-dandiya-gold)',
          animation: 'rotate-rangoli 30s linear infinite',
        }} />
      </div>

      {/* Hearts overlay */}
      <HeartsOverlay ref={heartsRef} />

      {/* Music button */}
      <MusicButton playing={playing} onToggle={toggleMusic} />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 20, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {scene === SCENES.FORM && (
            <motion.div key="form" style={{ width: '100%' }}>
              <NameForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}
          {scene === SCENES.INVITE && (
            <motion.div key="invite" style={{ width: '100%' }}>
              <InvitationCard
                config={config}
                onYes={handleYes}
                heartsRef={heartsRef}
              />
            </motion.div>
          )}
          {scene === SCENES.YES && (
            <motion.div key="yes" style={{ width: '100%' }}>
              <YesScreen config={config} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: '0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.6875rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.05em',
        }}>
          Made with ❤️ for Navratri 2025
        </p>
      </div>
    </div>
  );
}
