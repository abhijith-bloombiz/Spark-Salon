'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Inner component to synchronize Lenis with GSAP ScrollTrigger
 * and drive animation frames exclusively via gsap.ticker
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Expose instance globally for convenience (e.g. lenis.scrollTo)
    (window as any).lenis = lenis;

    // Synchronize ScrollTrigger on every Lenis scroll step
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    // Feed Lenis's RAF directly into GSAP's ticker to avoid two competing RAF loops
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    // Disable lag smoothing in GSAP to prevent any jumps or jitter during smooth scrolling
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.off('scroll', onScroll);
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
    };
  }, [lenis]);

  return null;
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Weighted, silky Lenis configuration matching https://lenis.dev feel
  const options: LenisOptions = useMemo(
    () => ({
      duration: 1.15,
      // Curated exponential ease-out curve for a weighted, responsive feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
      // Exclude internally-scrollable elements (modals, dropdowns, panels)
      prevent: (node: Node) => {
        if (!node || !(node instanceof HTMLElement)) return false;
        return (
          node.hasAttribute('data-lenis-prevent') ||
          Boolean(node.closest('[data-lenis-prevent]'))
        );
      },
    }),
    []
  );

  // If user prefers reduced motion, render native tree without Lenis wrapper
  if (reducedMotion || !mounted) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={options} autoRaf={false}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
