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

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
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
          pointerEvents: 'none',
          transition: 'top 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
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

      {/* Global CSS for Navbar responsiveness & animations */}
      <style jsx global>{`
        /* Clean Borderless GlassSurface styling */
        .spark-floating-navbar {
          border: none !important;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.24),
                      inset 0 -1px 1px 0 rgba(0, 0, 0, 0.35),
                      inset 0 0 20px 0 rgba(212, 175, 55, 0.04),
                      0 20px 50px -10px rgba(0, 0, 0, 0.8),
                      0 0 20px rgba(212, 175, 55, 0.06) !important;
        }

        .spark-floating-navbar.is-scrolled {
          border: none !important;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28),
                      inset 0 -1px 1px 0 rgba(0, 0, 0, 0.45),
                      inset 0 0 20px 0 rgba(212, 175, 55, 0.05),
                      0 24px 60px -10px rgba(0, 0, 0, 0.9),
                      0 0 25px rgba(212, 175, 55, 0.1) !important;
        }

        /* Remove hamburger menu from desktop */
        @media (min-width: 1041px) {
          .spark-menu-wrapper {
            display: none !important;
          }
          .spark-floating-navbar .spark-floating-navbar-content {
            padding-right: 22px !important;
          }
        }

        @media (max-width: 1040px) {
          .spark-desktop-nav-links {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .spark-search-wrapper,
          .spark-nav-divider {
            display: none !important;
          }
        }

        .spark-nav-link {
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
        }

        .spark-nav-link:hover {
          color: #c9a45c !important;
          transform: translateY(-1px) !important;
        }

        .spark-nav-link:hover .spark-nav-underline {
          transform: scaleX(1) !important;
          opacity: 1 !important;
          box-shadow: 0 0 8px #c9a45c, 0 0 16px rgba(201, 164, 92, 0.6) !important;
        }

        .spark-search-btn:hover {
          border-color: #e5c158 !important;
          color: #e5c158 !important;
          transform: scale(1.05) !important;
          box-shadow: 0 0 16px rgba(201, 164, 92, 0.45) !important;
        }

        .spark-search-btn:hover .spark-search-icon {
          color: #e5c158 !important;
          transform: scale(1.05);
        }

        .spark-menu-close-btn:hover {
          border-color: #e5c158 !important;
          color: #e5c158 !important;
          transform: rotate(90deg) scale(1.05) !important;
          box-shadow: 0 0 20px rgba(201, 164, 92, 0.5) !important;
        }

        .spark-fullscreen-item:hover {
          background-color: rgba(201, 164, 92, 0.08) !important;
          border-color: rgba(201, 164, 92, 0.55) !important;
          transform: translateX(8px) !important;
        }

        .spark-fullscreen-item:hover h2 {
          color: #e5c158 !important;
          text-shadow: 0 0 16px rgba(201, 164, 92, 0.4) !important;
        }

        .spark-logo-panel:hover {
          filter: brightness(1.06);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .spark-floating-navbar,
          .spark-nav-link,
          .spark-booking-btn,
          .spark-search-btn,
          .spark-menu-btn,
          .spark-fullscreen-item {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
