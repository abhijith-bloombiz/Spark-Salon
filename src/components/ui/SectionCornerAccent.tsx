'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SectionCornerAccentProps {
  corner?: 'both' | 'top-left' | 'bottom-right';
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  width?: string;
  zIndex?: number;
}

export default function SectionCornerAccent({
  corner = 'both',
  className = '',
  style = {},
  opacity = 1,
  width = 'clamp(280px, 32vw, 540px)',
  zIndex = 50,
}: SectionCornerAccentProps) {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Trigger when entering view, re-animates smoothly on forward and reverse scroll
  const isInView = useInView(wrapperRef, {
    once: false,
    amount: 0.12,
    margin: '0px 0px -40px 0px',
  });

  const showTopLeft = corner === 'both' || corner === 'top-left';
  const showBottomRight = corner === 'both' || corner === 'bottom-right';

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex,
        overflow: 'hidden',
        ...style,
      }}
      className={`section-corner-accents ${className}`.trim()}
      aria-hidden="true"
    >
      {/* TOP-LEFT CORNER ACCENT */}
      {showTopLeft && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            lineHeight: 0,
          }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { x: '-35%', y: '-35%', opacity: 0, scale: 0.92 }}
            animate={
              shouldReduceMotion
                ? { opacity }
                : isInView
                ? { x: '0%', y: '0%', opacity, scale: 1 }
                : { x: '-35%', y: '-35%', opacity: 0, scale: 0.92 }
            }
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transformOrigin: 'top left',
              willChange: 'transform, opacity',
            }}
          >
            <Image
              src="/images/sections/top-left-part.png"
              alt=""
              width={580}
              height={680}
              sizes="(max-width: 768px) 280px, (max-width: 1200px) 420px, 540px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none',
              }}
              loading="lazy"
            />
          </motion.div>
        </div>
      )}

      {/* BOTTOM-RIGHT CORNER ACCENT */}
      {showBottomRight && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width,
            lineHeight: 0,
          }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { x: '35%', y: '35%', opacity: 0, scale: 0.92 }}
            animate={
              shouldReduceMotion
                ? { opacity }
                : isInView
                ? { x: '0%', y: '0%', opacity, scale: 1 }
                : { x: '35%', y: '35%', opacity: 0, scale: 0.92 }
            }
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transformOrigin: 'bottom right',
              willChange: 'transform, opacity',
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
              loading="lazy"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
