'use client';

import React, { useRef, useCallback } from 'react';

interface ModernTiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  maxTilt?: number;
  borderRadius?: string;
}

export default function ModernTiltCard({
  children,
  className = 'squircle-lg',
  style,
  innerStyle,
  maxTilt = 10,
  borderRadius = 'var(--squircle-xl, 24px)',
}: ModernTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      // Normalized coordinates from -1 (left/top) to +1 (right/bottom)
      const xPercent = (x / width) * 2 - 1;
      const yPercent = (y / height) * 2 - 1;

      const rotY = (xPercent * maxTilt).toFixed(2);
      const rotX = (-yPercent * maxTilt).toFixed(2);
      const glareX = ((x / width) * 100).toFixed(1);
      const glareY = ((y / height) * 100).toFixed(1);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        card.style.setProperty('--rot-x', `${rotX}deg`);
        card.style.setProperty('--rot-y', `${rotY}deg`);
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
        card.style.setProperty('--card-scale', '1.018');
        card.style.setProperty('--glare-opacity', '1');
        card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.55)');
        card.style.setProperty(
          '--card-shadow',
          '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.18)'
        );
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.setProperty('--card-scale', '1.018');
    card.style.setProperty('--glare-opacity', '1');
    card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.55)');
    card.style.setProperty(
      '--card-shadow',
      '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.18)'
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    card.style.transition =
      'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
    card.style.setProperty('--rot-x', '0deg');
    card.style.setProperty('--rot-y', '0deg');
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '50%');
    card.style.setProperty('--card-scale', '1');
    card.style.setProperty('--glare-opacity', '0');
    card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.22)');
    card.style.setProperty(
      '--card-shadow',
      '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.4)'
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={
        {
          position: 'relative',
          borderRadius,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          '--rot-x': '0deg',
          '--rot-y': '0deg',
          '--glare-x': '50%',
          '--glare-y': '50%',
          '--card-scale': '1',
          '--glare-opacity': '0',
          '--border-color': 'rgba(212, 175, 55, 0.22)',
          '--card-shadow': '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.4)',
          transform:
            'perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) scale3d(var(--card-scale), var(--card-scale), var(--card-scale))',
          transition:
            'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
          background: 'rgba(11, 10, 16, 0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
          overflow: 'hidden',
          willChange: 'transform',
          ...style,
        } as React.CSSProperties
      }
    >
      {/* Dynamic Specular Glare */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 'var(--glare-opacity)' as any,
          transition: 'opacity 0.3s ease',
          background:
            'radial-gradient(circle 380px at var(--glare-x) var(--glare-y), rgba(212, 175, 55, 0.2) 0%, rgba(255, 255, 255, 0.06) 30%, transparent 75%)',
        }}
      />

      {/* Border Highlight Following Cursor to Border Sides */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 5,
          border: '1.5px solid transparent',
          opacity: 'var(--glare-opacity)' as any,
          transition: 'opacity 0.3s ease',
          background:
            'radial-gradient(circle 360px at var(--glare-x) var(--glare-y), rgba(212, 175, 55, 0.85) 0%, rgba(212, 175, 55, 0.15) 45%, transparent 80%) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Main Card Inner Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
