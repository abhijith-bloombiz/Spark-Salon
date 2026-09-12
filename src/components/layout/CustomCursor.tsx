'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const cursorTextRef = useRef('');

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isClickingRef.current = isClicking;
  }, [isClicking]);

  useEffect(() => {
    cursorTextRef.current = cursorText;
  }, [cursorText]);

  useEffect(() => {
    // Disable completely on touch / mobile devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;
    let isLoopRunning = false;

    const renderLoop = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.16;
      ringY += dy * 0.16;

      if (ringRef.current) {
        const scale = isClickingRef.current
          ? 0.86
          : isHoveredRef.current
          ? cursorTextRef.current
            ? 1.55
            : 1.35
          : 1;

        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // If ring is still settling towards mouse, continue RAF; otherwise sleep
      if (Math.abs(dx) > 0.06 || Math.abs(dy) > 0.06) {
        animFrameId = requestAnimationFrame(renderLoop);
      } else {
        isLoopRunning = false;
      }
    };

    const scheduleLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Direct instant positioning for inner precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      scheduleLoop();
    };

    const onMouseDown = () => {
      setIsClicking(true);
      scheduleLoop();
    };

    const onMouseUp = () => {
      setIsClicking(false);
      scheduleLoop();
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (isLoopRunning) {
        cancelAnimationFrame(animFrameId);
        isLoopRunning = false;
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      scheduleLoop();
    };

    // Event delegation with guarded state updates to avoid redundant re-renders
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], [role="menuitem"], .spark-tour-btn, .btn-primary-crimson, .btn-secondary-gold, .btn-ghost-luxury, .fill-btn, .editorial-cta-btn, .spark-booking-btn, .spark-search-btn, .spark-menu-btn, .btn-nav-control, .why-spark-card, .glass-panel-interactive'
      );

      const customBadge = target.closest('[data-cursor]') as HTMLElement | null;

      let nextText = '';
      let nextHover = false;

      if (customBadge) {
        nextText = customBadge.getAttribute('data-cursor') || '';
        nextHover = true;
      } else if (interactive) {
        nextText = '';
        nextHover = true;
      }

      if (isHoveredRef.current !== nextHover) {
        setIsHovered(nextHover);
        scheduleLoop();
      }
      if (cursorTextRef.current !== nextText) {
        setCursorText(nextText);
        scheduleLoop();
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Precision Metallic Gold Pointer Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          backgroundColor: '#d4af37',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: isVisible ? (isHovered && cursorText ? 0 : 1) : 0,
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 18px rgba(255, 235, 170, 0.6)',
          transition: 'width 0.22s ease, height 0.22s ease, opacity 0.22s ease',
          willChange: 'transform',
        }}
      />

      {/* Trailing Fluid Luxury Glass Halo Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`custom-cursor-ring ${cursorText ? 'cursor-' + cursorText.toLowerCase() : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? '68px' : isHovered ? '46px' : '34px',
          height: cursorText ? '68px' : isHovered ? '46px' : '34px',
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid rgba(212, 175, 55, 0.85)'
            : '1px solid rgba(212, 175, 55, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(212, 175, 55, 0.12)'
            : 'rgba(212, 175, 55, 0.02)',
          boxShadow: isHovered
            ? '0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 12px rgba(212, 175, 55, 0.2)'
            : '0 0 8px rgba(212, 175, 55, 0.12)',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: isVisible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition:
            'width 0.26s cubic-bezier(0.16, 1, 0.3, 1), height 0.26s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.26s ease, border-color 0.26s ease, box-shadow 0.26s ease, opacity 0.22s ease',
          willChange: 'transform',
        }}
      >
        {cursorText && (
          <span
            style={{
              fontFamily: 'var(--font-sans-display)',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#ffffff',
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8)',
              userSelect: 'none',
              pointerEvents: 'none',
              textTransform: 'uppercase',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
