'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export interface NavLinkItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavLinkItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'statement', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'final-cta', label: 'Contact' },
];

interface NavLinksProps {
  scrolled?: boolean;
  onNavigate?: (id: string) => void;
}

export default function NavLinks({ scrolled = false, onNavigate }: NavLinksProps) {
  const [activeId, setActiveId] = useState<string>('hero');
  const activeIdRef = useRef<string>('hero');
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPos = window.scrollY + 260;
        const sections = [
          { id: 'hero', name: 'hero' },
          { id: 'statement', name: 'statement' },
          { id: 'services', name: 'services' },
          { id: 'gallery', name: 'gallery' },
          { id: 'final-cta', name: 'final-cta' },
        ];

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el && el.offsetTop <= scrollPos) {
            if (activeIdRef.current !== sections[i].name) {
              activeIdRef.current = sections[i].name;
              setActiveId(sections[i].name);
            }
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Initialize hardware acceleration (force3D) on mount
  useEffect(() => {
    const allFront = document.querySelectorAll<HTMLElement>('.mdx-char-front');
    const allBack = document.querySelectorAll<HTMLElement>('.mdx-char-back');
    if (allFront.length > 0 && allBack.length > 0) {
      gsap.set([...Array.from(allFront), ...Array.from(allBack)], { yPercent: 0, force3D: true });
    }
  }, []);

  /**
   * HorizonX Signature Character Rolling Flip on Mouse Enter
   * Front letters roll up (-100%) with stagger, back letters roll into place
   */
  const handleMouseEnter = useCallback((id: string) => {
    const btn = buttonRefs.current[id];
    if (!btn) return;

    const frontChars = btn.querySelectorAll<HTMLElement>('.mdx-char-front');
    const backChars = btn.querySelectorAll<HTMLElement>('.mdx-char-back');
    const all = [...Array.from(frontChars), ...Array.from(backChars)];

    gsap.set(all, { willChange: 'transform' });
    const enterAnim = {
      yPercent: -100,
      duration: 0.6,
      stagger: 0.025,
      ease: 'expo.out',
      overwrite: 'auto' as const,
    };
    gsap.to(Array.from(frontChars), enterAnim);
    gsap.to(Array.from(backChars), enterAnim);
  }, []);

  /**
   * HorizonX Signature Character Rolling Flip on Mouse Leave
   * Smoothly returns to resting state (0%) with power3.in easing
   */
  const handleMouseLeave = useCallback((id: string) => {
    const btn = buttonRefs.current[id];
    if (!btn) return;

    const frontChars = btn.querySelectorAll<HTMLElement>('.mdx-char-front');
    const backChars = btn.querySelectorAll<HTMLElement>('.mdx-char-back');
    const all = [...Array.from(frontChars), ...Array.from(backChars)];

    const leaveAnim = {
      yPercent: 0,
      duration: 0.45,
      stagger: 0.018,
      ease: 'power3.in',
      overwrite: 'auto' as const,
      onComplete: () => {
        gsap.set(all, { clearProps: 'willChange' });
      },
    };
    gsap.to(Array.from(frontChars), leaveAnim);
    gsap.to(Array.from(backChars), leaveAnim);
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveId(id);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ul
      role="menubar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: scrolled ? '26px' : '34px',
        listStyle: 'none',
        margin: 0,
        padding: '0 8px',
        transition: 'gap 0.3s ease',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;

        return (
          <li key={item.id} role="none">
            <button
              ref={(el) => {
                buttonRefs.current[item.id] = el;
              }}
              role="menuitem"
              onClick={() => handleLinkClick(item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              aria-label={`Navigate to ${item.label}`}
              className={`spark-nav-link ${isActive ? 'is-active' : ''}`}
              style={{
                position: 'relative',
                background: 'transparent',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '6px 4px',
                fontFamily: 'var(--font-sans-display), "Inter", -apple-system, sans-serif',
                fontSize: scrolled ? '0.85rem' : '0.92rem',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.08em',
                color: isActive ? '#c9a45c' : '#f4f1ea',
                textShadow: isActive
                  ? '0 0 12px rgba(201, 164, 92, 0.45), 0 0 24px rgba(201, 164, 92, 0.25)'
                  : 'none',
                transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1), font-size 0.3s ease',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              {/* HorizonX Character Rolling Mask Container */}
              <span className="mdx-link-content">
                {item.label.split('').map((char, i) => (
                  <span key={i} className="mdx-link-char-mask">
                    <span
                      className="mdx-char-front"
                      style={{
                        color: isActive ? '#c9a45c' : '#f4f1ea',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                    <span
                      className="mdx-char-back"
                      aria-hidden="true"
                      style={{
                        color: '#e5c158',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                ))}
              </span>

            </button>
          </li>
        );
      })}
    </ul>
  );
}
