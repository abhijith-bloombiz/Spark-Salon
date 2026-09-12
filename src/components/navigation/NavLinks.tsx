'use client';

import React, { useState, useEffect, useRef } from 'react';

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
              role="menuitem"
              onClick={() => handleLinkClick(item.id)}
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
                padding: '6px 2px',
                fontFamily: 'var(--font-sans-display), "Inter", -apple-system, sans-serif',
                fontSize: scrolled ? '0.85rem' : '0.92rem',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.08em',
                color: isActive ? '#c9a45c' : '#f4f1ea',
                textShadow: isActive
                  ? '0 0 12px rgba(201, 164, 92, 0.45), 0 0 24px rgba(201, 164, 92, 0.25)'
                  : 'none',
                transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), font-size 0.3s ease',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <span>{item.label}</span>

              {/* Refined Metallic Gold Underline with Glow and Scale Animation */}
              <span
                className="spark-nav-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #aa8210 0%, #fff0b8 50%, #aa8210 100%)',
                  borderRadius: 'var(--squircle-capsule, 2px)',
                  boxShadow: isActive
                    ? '0 0 8px #c9a45c, 0 0 16px rgba(201, 164, 92, 0.7)'
                    : 'none',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center',
                  opacity: isActive ? 1 : 0,
                  transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                }}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
