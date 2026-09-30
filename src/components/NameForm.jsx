import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const NameForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a name 🥺');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(trimmed);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="glass-card-premium" style={{
        width: '100%',
        borderRadius: '2rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
      }}>
        {/* Badge */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '999px',
          padding: '0.375rem 1rem',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-dandiya-cream)', fontWeight: 500 }}>
            💃🏻 Dandiya Invitation 🕺🏻
          </span>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #FFF1F5, #F4C95D, #E85B91)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
          }}>
            One Tiny Question...
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
            🕯️ Navratri is almost here 🕯️
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(244,201,93,0.3), transparent)',
        }} />

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', paddingLeft: '0.5rem' }}>
              Her Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Varshini"
              maxLength={50}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.1)',
                border: `1px solid ${name ? '#F4C95D' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: '#fff',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontSize: '1rem',
              }}
            />
          </div>

          {error && (
            <p style={{
              color: '#ff6568',
              fontSize: '0.875rem',
              background: 'rgba(255,101,104,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,101,104,0.2)',
            }}>
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              background: 'linear-gradient(to right, var(--color-dandiya-pink), var(--color-dandiya-coral))',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              boxShadow: '0 4px 15px rgba(232,91,145,0.4)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '1rem',
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Creating...' : 'Create Invitation 💌'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
