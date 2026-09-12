'use client';

import React, { useState, useEffect, useRef } from 'react';
import GlassSurface from '@/components/ui/GlassSurface';
import LogoPanel from './LogoPanel';
import NavLinks from './NavLinks';
import SearchButton from './SearchButton';
import BookingButton from './BookingButton';
import MenuButton from './MenuButton';
import FullscreenMenu from './FullscreenMenu';
import SearchModal from './SearchModal';
import './Navbar.css';

interface NavbarProps {
  onOpenBooking?: () => void;
  isRevealed?: boolean;
}

export default function Navbar({ onOpenBooking, isRevealed = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navRafRef = useRef<number | null>(null);

  // Scroll listener for sticky contraction
  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isPast = window.scrollY > 30;
      if (isPast !== lastScrolled) {
        lastScrolled = isPast;
        setScrolled(isPast);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle mouse-following specular light via CSS variables (zero React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const rect = nav.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    if (navRafRef.current) cancelAnimationFrame(navRafRef.current);
    navRafRef.current = requestAnimationFrame(() => {
      nav.style.setProperty('--nav-mx', `${x}%`);
      nav.style.setProperty('--nav-my', `${y}%`);
    });
  };

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('final-cta');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrolled ? '14px' : '24px',
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          pointerEvents: isRevealed ? 'none' : 'none',
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(-22px)',
          transition:
            'top 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
        }}
      >
        <GlassSurface
          ref={navRef}
          as="nav"
          role="navigation"
          aria-label="Main Navigation"
          width="clamp(320px, 94vw, 1380px)"
          height={64}
          borderRadius={22}
          borderWidth={0.07}
          brightness={scrolled ? 48 : 55}
          opacity={0.92}
          blur={11}
          displace={0}
          backgroundOpacity={scrolled ? 0.32 : 0.16}
          saturation={1.8}
          distortionScale={scrolled ? -130 : -160}
          redOffset={2}
          greenOffset={8}
          blueOffset={14}
          onMouseMove={handleMouseMove}
          className={`spark-floating-navbar ${scrolled ? 'is-scrolled' : ''}`}
          style={{
            pointerEvents: 'auto',
            position: 'relative',
            border: 'none',
            outline: 'none',
            userSelect: 'none',
            transition:
              'box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), background 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          contentClassName="spark-floating-navbar-content"
          contentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px 0 0',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top Specular Rim Reflection - Ultra-Fine Modern Optical Bevel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '48px',
              right: '48px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.15) 15%, rgba(255, 255, 255, 0.45) 35%, rgba(255, 248, 220, 0.75) 50%, rgba(255, 255, 255, 0.45) 65%, rgba(212, 175, 55, 0.15) 85%, transparent 100%)',
              borderRadius: '28px',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Bottom Ambient Refraction Edge */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '60px',
              right: '60px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.12) 35%, rgba(255, 245, 210, 0.28) 50%, rgba(212, 175, 55, 0.12) 65%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Subtle Mouse-Following Specular Glass Highlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at var(--nav-mx, 50%) var(--nav-my, 50%), rgba(201, 164, 92, 0.08) 0%, transparent 35%)',
              pointerEvents: 'none',
              zIndex: 2,
              transition: 'background 0.15s ease-out',
            }}
          />

          {/* LEFT: Luxury Logo Panel Capsule */}
          <LogoPanel scrolled={scrolled} onLogoClick={() => handleSelectSection('hero')} />

          {/* CENTER: Navigation Links (Visible on desktop) */}
          <div className="spark-desktop-nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            <NavLinks scrolled={scrolled} onNavigate={handleSelectSection} />
          </div>

          {/* RIGHT: Search + Divider + Book CTA + Menu Hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: scrolled ? '12px' : '16px',
              position: 'relative',
              zIndex: 5,
              transition: 'gap 0.3s ease',
            }}
          >
            {/* Search Button (Hidden on very narrow mobile) */}
            <div className="spark-search-wrapper">
              <SearchButton scrolled={scrolled} onClick={() => setSearchOpen(true)} />
            </div>

            {/* Vertical Separator Line matching reference */}
            <div
              className="spark-nav-divider"
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
              }}
            />

            {/* Primary Booking CTA Button */}
            <BookingButton scrolled={scrolled} onClick={handleBookingClick} />

            {/* Circular Menu / Hamburger Button (Hidden on desktop) */}
            <div className="spark-menu-wrapper">
              <MenuButton
                scrolled={scrolled}
                isOpen={menuOpen}
                onClick={() => setMenuOpen(true)}
              />
            </div>
          </div>
        </GlassSurface>
      </header>

      {/* Fullscreen Editorial Navigation Overlay */}
      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectSection={handleSelectSection}
        onOpenBooking={handleBookingClick}
      />

      {/* Treatment Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onBookTreatment={() => {
          setSearchOpen(false);
          handleBookingClick();
        }}
      />

    </>
  );
}
