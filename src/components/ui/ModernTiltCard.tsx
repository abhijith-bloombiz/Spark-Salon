'use client';

import React, { useRef, useCallback } from 'react';
import './ModernTiltCard.css';

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

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        card.style.setProperty('--rot-x', `${rotX}deg`);
        card.style.setProperty('--rot-y', `${rotY}deg`);
        card.style.setProperty('--tilt-x', `${xPercent.toFixed(3)}`);
        card.style.setProperty('--tilt-y', `${yPercent.toFixed(3)}`);
        card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.45)');
        card.style.setProperty(
          '--card-shadow',
          '0 18px 42px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08)'
        );
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.add('is-hovered');
    card.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.45)');
    card.style.setProperty(
      '--card-shadow',
      '0 18px 42px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08)'
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove('is-hovered');
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    card.style.transition =
      'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
    card.style.setProperty('--rot-x', '0deg');
    card.style.setProperty('--rot-y', '0deg');
    card.style.setProperty('--tilt-x', '0');
    card.style.setProperty('--tilt-y', '0');
    card.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.22)');
    card.style.setProperty(
      '--card-shadow',
      '0 10px 28px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)'
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`modern-tilt-card ${className}`.trim()}
      style={
        {
          position: 'relative',
          borderRadius,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          '--rot-x': '0deg',
          '--rot-y': '0deg',
          '--tilt-x': '0',
          '--tilt-y': '0',
          '--border-color': 'rgba(212, 175, 55, 0.22)',
          '--card-shadow': '0 10px 28px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)',
          transform:
            'perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y))',
          transition:
            'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
          background: '#000000',
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
      {/* Main Card 3D Spatial Content Container */}
      <div
        className="modern-tilt-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          transformStyle: 'preserve-3d',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
