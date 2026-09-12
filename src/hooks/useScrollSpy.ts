'use client';

import { useState, useEffect, useCallback } from 'react';

export function useScrollSpy(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollY(current);
      setScrolled(current > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, { duration: 1.2, offset: 0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { scrolled, scrollY, scrollTo };
}
