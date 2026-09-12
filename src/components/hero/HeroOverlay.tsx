'use client';

import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { BlurText } from '@/components/ui';

export interface HeroSlide {
  eyebrow: string;
  headline: string;
  highlightWords: string[];
  subtitle: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: 'SPARK SALON • LUXURY ATELIER',
    headline: 'WHERE BEAUTY\nMEETS EXPERIENCE.',
    highlightWords: ['MEETS', 'EXPERIENCE'],
    subtitle:
      'Premium hair sculpture, clinical skin therapies, and bespoke bridal care designed exclusively around your signature aesthetic.',
  },
  {
    eyebrow: 'BESPOKE CRAFT • MASTER ARTISTRY',
    headline: 'SCULPTED TO\nPURE PERFECTION.',
    highlightWords: ['PURE', 'PERFECTION'],
    subtitle:
      'World-class hair architects and colorists crafting radiant silhouettes tailored to your individuality.',
  },
  {
    eyebrow: 'PRIVATE SUITES • SENSORY EQUILIBRIUM',
    headline: 'AN ELEVATED\nSENSORY ESCAPE.',
    highlightWords: ['SENSORY', 'ESCAPE'],
    subtitle:
      'Acoustically isolated private sanctuaries designed for restorative clinical facials, bridal rituals, and tranquil luxury.',
  },
];

export interface HeroOverlayProps {
  onOpenBooking?: () => void;
  onExploreServices?: () => void;
  isRevealed?: boolean;
}

export interface HeroOverlayHandle {
  updateProgress: (progress: number) => void;
}

const HeroOverlay = forwardRef<HeroOverlayHandle, HeroOverlayProps>(function HeroOverlay(
  { onOpenBooking, onExploreServices, isRevealed = true },
  ref
) {
  const [activeChapter, setActiveChapter] = useState(0);
  const activeChapterRef = useRef(0);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  /**
   * ScrollTrigger scrub synchronization:
   * Smoothly changes text chapters using the signature BlurText effect as the user scrolls
   * Incorporates hysteresis buffers (0.04) to eliminate boundary flicker on slow scrub
   */
  useImperativeHandle(
    ref,
    () => ({
      updateProgress: (progress: number) => {
        let nextChapter = activeChapterRef.current;

        if (activeChapterRef.current === 0) {
          if (progress >= 0.33) nextChapter = 1;
        } else if (activeChapterRef.current === 1) {
          if (progress < 0.29) nextChapter = 0;
          else if (progress >= 0.67) nextChapter = 2;
        } else if (activeChapterRef.current === 2) {
          if (progress < 0.63) nextChapter = 1;
        }

        if (nextChapter !== activeChapterRef.current) {
          activeChapterRef.current = nextChapter;
          setActiveChapter(nextChapter);
        }

        // Scroll indicator fades out as user scrolls (0.00 -> 0.08)
        const scrollIndicatorProgress = Math.min(1, Math.max(0, progress / 0.08));
        const indicatorOpacity = 1 - scrollIndicatorProgress;

        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = `${indicatorOpacity.toFixed(3)}`;
          scrollIndicatorRef.current.style.pointerEvents = indicatorOpacity < 0.1 ? 'none' : 'auto';
        }
      },
    }),
    []
  );

  const currentSlide = HERO_SLIDES[activeChapter];

  return (
    <div
      className="hero-overlay-layer"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 'clamp(40px, 8vh, 80px)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {/* Main Content Area aligned with navbar luxury-container */}
      <div className="luxury-container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div
          className="hero-overlay-content"
          style={{
            maxWidth: '840px',
            pointerEvents: 'auto',
          }}
        >
          {/* Reserved Height Text Stage to prevent CTA layout shifts */}
          <div
            style={{
              position: 'relative',
              minHeight: 'clamp(250px, 30vh, 340px)',
              width: '100%',
              marginBottom: '28px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ width: '100%' }}
              >
                {/* Top Brand Tag with BlurText */}
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={
                    isRevealed
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 16, filter: 'blur(6px)' }
                  }
                  transition={{
                    duration: 0.75,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.3em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <Sparkles size={15} color="#d4af37" />
                  <BlurText
                    as="span"
                    text={currentSlide.eyebrow}
                    threshold={0.01}
                    delay={25}
                    ready={isRevealed}
                  />
                </motion.div>

                {/* Monumental Headline with signature word-by-word BlurText effect */}
                <BlurText
                  as="h1"
                  text={currentSlide.headline}
                  highlightWords={currentSlide.highlightWords}
                  delay={85}
                  direction="top"
                  threshold={0.01}
                  ready={isRevealed}
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '0.03em',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.85)',
                  }}
                />

                {/* Body Description with signature BlurText effect */}
                <BlurText
                  as="p"
                  threshold={0.01}
                  delay={18}
                  text={currentSlide.subtitle}
                  ready={isRevealed}
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: 'clamp(0.92rem, 1.3vw, 1.12rem)',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.88)',
                    maxWidth: '580px',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
                    margin: 0,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action CTAs (Persistent, Anchored & Always Interactive) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={
              isRevealed
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 24, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.85,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <button
              onClick={onOpenBooking}
              className="btn-primary-crimson squircle-sm"
              style={{
                padding: '16px 34px',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <Calendar size={15} />
              <span>BOOK APPOINTMENT</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={onExploreServices}
              className="btn-secondary-gold squircle-sm"
              style={{
                padding: '15px 30px',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              <span>EXPLORE SERVICES</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: '4px',
            pointerEvents: 'none',
          }}
        >
          <div
            ref={scrollIndicatorRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-sans-display)',
              fontSize: '0.74rem',
              letterSpacing: '0.22em',
              color: 'var(--gold-light)',
              textTransform: 'uppercase',
              pointerEvents: 'auto',
              transition: 'opacity 0.15s linear',
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <div
              style={{
                width: '18px',
                height: '30px',
                borderRadius: '12px',
                border: '1.5px solid var(--gold-primary)',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '6px',
                  backgroundColor: 'var(--gold-primary)',
                  borderRadius: '2px',
                  animation: 'bounce 1.6s infinite ease-in-out',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default HeroOverlay;
