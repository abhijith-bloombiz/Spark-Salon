'use client';

import React from 'react';

interface LogoPanelProps {
  scrolled?: boolean;
  onLogoClick?: () => void;
}

export default function LogoPanel({ scrolled = false, onLogoClick }: LogoPanelProps) {
  const handleClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      const el = document.getElementById('hero');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Spark International Salon & Spa - Return to top"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="spark-logo-panel"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: scrolled ? '18px' : '22px',
        paddingRight: '16px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      {/* Subtle Ambient Radial Glow Behind the Brand Emblem */}
      <div
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70px',
          height: '70px',
          background: 'radial-gradient(circle, rgba(201, 164, 92, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo Content: Brand Emblem + Typography */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transform: 'translateZ(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Authentic High-Res Spark Crest (Red crescent with white SB monogram) */}
        <div
          style={{
            position: 'relative',
            height: scrolled ? '34px' : '40px',
            width: scrolled ? '46px' : '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <img
            src="/images/logo-emblem-crop.png"
            alt="Spark Emblem"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 6px rgba(201, 164, 92, 0.2))',
              display: 'block',
            }}
          />
        </div>

        {/* Brand Typography: SPARK / INTERNATIONAL / SALON & SPA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-display), "Cinzel", "Playfair Display", serif',
              fontSize: scrolled ? '0.94rem' : '1.05rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#ffffff',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))',
              transition: 'font-size 0.3s ease',
            }}
          >
            SPARK
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans-display), "Inter", sans-serif',
              fontSize: scrolled ? '0.45rem' : '0.52rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              color: 'rgba(244, 241, 234, 0.85)',
              textTransform: 'uppercase',
              marginTop: '3px',
              transition: 'font-size 0.3s ease',
            }}
          >
            INTERNATIONAL
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans-display), "Inter", sans-serif',
              fontSize: scrolled ? '0.38rem' : '0.44rem',
              fontWeight: 600,
              letterSpacing: '0.32em',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              marginTop: '2px',
              transition: 'font-size 0.3s ease',
            }}
          >
            SALON &amp; SPA
          </span>
        </div>
      </div>

      {/* Elegant Vertical Gold Tapered Hairline Divider */}
      <div
        style={{
          marginLeft: '20px',
          width: '1px',
          height: scrolled ? '22px' : '28px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(201, 164, 92, 0.45) 50%, transparent 100%)',
          transition: 'height 0.3s ease',
        }}
      />
    </div>
  );
}
