'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export type ScrollRevealDirection = 'left' | 'right' | 'bottom' | 'top';

export interface ScrollCardProps {
  children: React.ReactNode;
  direction?: ScrollRevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: boolean;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export const ScrollCard: React.FC<ScrollCardProps> = ({
  children,
  direction = 'bottom',
  delay = 0,
  duration = 0.85,
  distance = 42,
  scale = true,
  className = '',
  style = {},
  once = false, // Always trigger on both forward & reverse scroll
  amount = 0.12,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useInView observes the static wrapper element that NEVER translates.
  // This completely eliminates the IntersectionObserver feedback loop / jitter!
  const isInView = useInView(wrapperRef, {
    once,
    amount,
    margin: '0px 0px -40px 0px',
  });

  if (shouldReduceMotion) {
    return (
      <div className={className} style={{ height: '100%', ...style }}>
        {children}
      </div>
    );
  }

  const getInitialOffset = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'top':
        return { x: 0, y: -distance };
      case 'bottom':
      default:
        return { x: 0, y: distance };
    }
  };

  const offset = getInitialOffset();

  // High-performance GPU-optimized Framer Motion variants:
  // - "visible": full cinematic deceleration on scroll entrance (both forward & reverse)
  // - "hidden": gentle, non-snapping exit (0.35s) so reverse scrolling feels natural and never jumps
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scale ? 0.985 : 1,
      transition: {
        duration: 0.35,
        delay: 0,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={cardVariants}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollCard;

