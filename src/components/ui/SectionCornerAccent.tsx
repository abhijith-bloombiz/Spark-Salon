'use client';

import React, { useRef, useMemo, memo } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, type Variants, type Transition } from 'motion/react';

export interface SectionCornerAccentProps {
  corner?: 'both' | 'top-left' | 'bottom-right';
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  width?: string;
  zIndex?: number;
  duration?: number;
}

// Static ease curve shared across all instances
const EASE_CURVE = [0.37, 0, 0.63, 1] as const;

// Base hardware-accelerated style for the outer anchor wrapper
// contain: 'paint' + isolation: 'isolate' prevents drop-shadow filter repaints from invalidating parent sections
const BASE_WRAPPER_STYLE: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  lineHeight: 0,
  contain: 'paint',
  isolation: 'isolate',
  transform: 'translateZ(0)',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
};

// Base motion div style for GPU composited clip-path transforms
const MOTION_BASE_STYLE: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
  transform: 'translateZ(0)',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
  willChange: 'clip-path, transform, opacity',
};

function SectionCornerAccentComponent({
  corner = 'both',
  className = '',
  style,
  opacity = 1,
  width = 'clamp(280px, 32vw, 540px)',
  zIndex = 50,
  duration = 2,
}: SectionCornerAccentProps) {
  const shouldReduceMotion = useReducedMotion();

  // Independent observers: triggers ONLY when the viewport reaches that SPECIFIC part image
  const topLeftRef = useRef<HTMLDivElement>(null);
  const isTopLeftInView = useInView(topLeftRef, {
    once: false,
    amount: 0.1,
  });

  const bottomRightRef = useRef<HTMLDivElement>(null);
  const isBottomRightInView = useInView(bottomRightRef, {
    once: false,
    amount: 0.1,
  });

  const showTopLeft = corner === 'both' || corner === 'top-left';
  const showBottomRight = corner === 'both' || corner === 'bottom-right';

  // Memoized transition configuration based on duration
  const transition = useMemo<Transition>(
    () => ({
      clipPath: {
        duration,
        ease: EASE_CURVE,
      },
      opacity: {
        duration: Math.min(duration * 0.5, 1.0),
        ease: EASE_CURVE,
      },
      scale: {
        duration,
        ease: EASE_CURVE,
      },
    }),
    [duration]
  );

  // Memoized Motion variants to eliminate per-render allocations and enable pre-compiled deltas
  const topLeftVariants = useMemo<Variants>(
    () => ({
      hidden: {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 0,
        scale: 0.98,
      },
      visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity,
        scale: 1,
      },
    }),
    [opacity]
  );

  const bottomRightVariants = useMemo<Variants>(
    () => ({
      hidden: {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
        scale: 0.98,
      },
      visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity,
        scale: 1,
      },
    }),
    [opacity]
  );

  return (
    <>
      {/* TOP-LEFT CORNER ACCENT: Triggers strictly when reaching the top-left part image */}
      {showTopLeft && (
        <div
          ref={topLeftRef}
          style={{
            ...BASE_WRAPPER_STYLE,
            top: 0,
            left: 0,
            width,
            zIndex,
            filter: 'drop-shadow(0 6px 28px rgba(196, 30, 58, 0.24))',
            ...style,
          }}
          className={`section-corner-accent-top-left ${className}`.trim()}
          aria-hidden="true"
        >
          <motion.div
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={
              shouldReduceMotion
                ? { opacity }
                : isTopLeftInView
                ? 'visible'
                : 'hidden'
            }
            variants={topLeftVariants}
            transition={transition}
            style={{
              ...MOTION_BASE_STYLE,
              transformOrigin: 'top left',
            }}
          >
            <Image
              src="/images/sections/top-left-part.png"
              alt=""
              width={580}
              height={393}
              sizes="(max-width: 768px) 280px, (max-width: 1200px) 420px, 540px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none',
              }}
              decoding="async"
              loading="lazy"
            />
          </motion.div>
        </div>
      )}

      {/* BOTTOM-RIGHT CORNER ACCENT: Triggers strictly when reaching the bottom-right part image */}
      {showBottomRight && (
        <div
          ref={bottomRightRef}
          style={{
            ...BASE_WRAPPER_STYLE,
            right: 0,
            bottom: 0,
            width,
            zIndex,
            filter: 'drop-shadow(0 -6px 28px rgba(196, 30, 58, 0.24))',
            ...style,
          }}
          className={`section-corner-accent-bottom-right ${className}`.trim()}
          aria-hidden="true"
        >
          <motion.div
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={
              shouldReduceMotion
                ? { opacity }
                : isBottomRightInView
                ? 'visible'
                : 'hidden'
            }
            variants={bottomRightVariants}
            transition={transition}
            style={{
              ...MOTION_BASE_STYLE,
              transformOrigin: 'bottom right',
            }}
          >
            <Image
              src="/images/sections/bottom-right-part.png"
              alt=""
              width={680}
              height={580}
              sizes="(max-width: 768px) 280px, (max-width: 1200px) 420px, 540px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none',
              }}
              decoding="async"
              loading="lazy"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}

const SectionCornerAccent = memo(SectionCornerAccentComponent);
export default SectionCornerAccent;
