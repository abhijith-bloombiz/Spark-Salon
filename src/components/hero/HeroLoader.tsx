'use client';

import React from 'react';

export interface HeroLoaderProps {
  progress: number; // 0.0 to 1.0
  isReady: boolean;
}

export default function HeroLoader({ progress, isReady }: HeroLoaderProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div
      className={`hero-critical-loader ${isReady ? 'is-ready' : ''}`}
      aria-hidden={isReady}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#040406',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.65s linear',
        opacity: isReady ? 0 : 1,
        visibility: isReady ? 'hidden' : 'visible',
        pointerEvents: isReady ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '300px', width: '100%', padding: '0 20px' }}>
        {/* Monogram Brand Kicker */}
        <div
          style={{
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.35em',
            color: 'var(--gold-primary)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          SPARK SALON
        </div>

        {/* Minimal Hairline Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '1px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-primary) 50%, var(--gold-light) 100%)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              transition: 'width 0.2s ease-out',
            }}
          />
        </div>

        {/* Subtle Progress % */}
        <div
          style={{
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.68rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
          }}
        >
          INITIALIZING ATELIER • {percentage}%
        </div>
      </div>
    </div>
  );
}
