'use client';

import React from 'react';

interface SparkLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'text-only';
}

export default function SparkLogo({
  size = 'md',
  showTagline = false,
  showText = false,
  className = '',
  variant = 'horizontal',
}: SparkLogoProps) {
  const heightMap = {
    sm: 42,
    md: 52,
    lg: 72,
    hero: 110,
  };

  const h = heightMap[size];

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: variant === 'horizontal' ? 'row' : 'column',
        alignItems: variant === 'horizontal' ? 'center' : 'center',
        gap: variant === 'horizontal' ? '12px' : '4px',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {variant !== 'text-only' && (
        <img
          src="/images/loading/logo.png"
          alt="BYJU SPARK INTERNATIONAL SALON"
          style={{
            height: `${h}px`,
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.7))',
            display: 'block',
          }}
        />
      )}

      {(showText || variant === 'text-only') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: variant === 'stacked' ? 'center' : 'flex-start' }}>
          <span
            style={{
              fontFamily: 'var(--font-proto, var(--font-sans-display))',
              fontSize: size === 'hero' ? '2.4rem' : size === 'lg' ? '1.8rem' : size === 'md' ? '1.25rem' : '0.95rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#ffffff',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
          >
            SPARK
          </span>
          <span
            style={{
              fontFamily: 'var(--font-proto, var(--font-sans-display))',
              fontSize: size === 'hero' ? '0.85rem' : size === 'lg' ? '0.7rem' : size === 'md' ? '0.55rem' : '0.45rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: 'var(--gold-primary)',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            INTERNATIONAL SALON
          </span>
        </div>
      )}

      {showTagline && (
        <span
          style={{
            fontFamily: 'var(--font-proto, var(--font-sans-display))',
            fontSize: '0.68rem',
            letterSpacing: '0.24em',
            color: 'var(--gold-primary)',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}
        >
          Beauty Creates Confidence
        </span>
      )}
    </div>
  );
}

