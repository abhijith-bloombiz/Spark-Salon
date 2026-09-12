'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas, { HeroCanvasHandle } from './HeroCanvas';
import HeroOverlay, { HeroOverlayHandle } from './HeroOverlay';
import HeroLoader from './HeroLoader';
import { HERO_FRAME_SET, getBreakpointConfig } from './heroConfig';
import { useHeroFrameSequence } from './useHeroFrameSequence';

// Register GSAP plugin safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SparkSalonHeroProps {
  onOpenBooking?: () => void;
  onExploreServices?: () => void;
  onComplete?: () => void;
}

export default function SparkSalonHero({
  onOpenBooking,
  onExploreServices,
  onComplete,
}: SparkSalonHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HeroCanvasHandle | null>(null);
  const overlayRef = useRef<HeroOverlayHandle | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Initialize frame sequence & loader
  const { loaderRef, loaderState } = useHeroFrameSequence({
    config: HERO_FRAME_SET,
  });

  // Check reduced motion and device constraints
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /**
   * Main GSAP ScrollTrigger Setup (synced via root SmoothScrollProvider)
   */
  const initScrollTrigger = useCallback(() => {
    const container = containerRef.current;
    if (!container || reducedMotion || typeof window === 'undefined') return;

    // Clean up any existing instances first
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const viewportW = window.innerWidth;
    const bp = getBreakpointConfig(viewportW);

    let lastProgress = -1;
    let lastPriorityFrame = -1;

    // Create the master ScrollTrigger pinned timeline
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: bp.scrollEnd,
      pin: true,
      scrub: bp.scrub,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));

        // Skip redundant execution if progress hasn't changed
        if (Math.abs(progress - lastProgress) < 0.001) return;
        // If already completed (progress === 1) and user is scrolling lower sections, do not perform canvas work
        if (progress >= 1.0 && lastProgress >= 1.0) return;
        lastProgress = progress;

        // Render frame sequence with smooth cross-dissolve blend between hero-bg and video sequence
        canvasRef.current?.renderProgress(progress);

        // Update overlay transform & opacity directly in DOM
        overlayRef.current?.updateProgress(progress);

        // Only calculate and re-prioritize frame download queue while inside Hero (< 0.99)
        if (progress < 0.99) {
          const priorityFrame = Math.min(
            HERO_FRAME_SET.frameCount - 1,
            Math.max(0, Math.round(progress * (HERO_FRAME_SET.frameCount - 1)))
          );

          if (priorityFrame !== lastPriorityFrame) {
            lastPriorityFrame = priorityFrame;
            loaderRef.current?.setPriorityFrame(priorityFrame);
          }
        }

        // Fire onComplete handoff callback when sequence reaches 100%
        if (progress >= 0.99 && onComplete) {
          onComplete();
        }
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
      scrollTriggerRef.current = null;
    };
  }, [reducedMotion, loaderRef, onComplete]);

  // Set up ScrollTrigger once critical window is ready
  useEffect(() => {
    if (!loaderState.isCriticalWindowLoaded || reducedMotion) return;
    const cleanup = initScrollTrigger();
    return () => {
      if (cleanup) cleanup();
    };
  }, [loaderState.isCriticalWindowLoaded, reducedMotion, initScrollTrigger]);

  // Handle viewport resize to update ScrollTrigger pin distance
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="spark-salon-cinematic-hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '600px',
        backgroundColor: '#040406',
        overflow: 'hidden',
        contain: 'paint layout',
      }}
    >
      {/* 1. Canvas 2D frame sequence renderer */}
      <HeroCanvas
        ref={canvasRef}
        loader={loaderRef.current}
        config={HERO_FRAME_SET}
      />

      {/* 2. Interactive text, brand mark, headline, focusable CTAs */}
      <HeroOverlay
        ref={overlayRef}
        onOpenBooking={onOpenBooking}
        onExploreServices={onExploreServices}
      />

      {/* 3. Minimal, progress-driven critical window loader (< 15% window) */}
      <HeroLoader
        progress={loaderState.criticalProgress}
        isReady={loaderState.isCriticalWindowLoaded || reducedMotion}
      />

      {/* 4. Accessible <noscript> fallback with static poster and core content */}
      <noscript>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${HERO_FRAME_SET.posterPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', color: '#ffffff' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Spark Salon • Luxury Atelier
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Where Beauty Meets Experience. Premium beauty, styling and self-care, designed around you.
            </p>
          </div>
        </div>
      </noscript>
    </section>
  );
}
