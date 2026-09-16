'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';
import LogoPanel from './LogoPanel';
import NavLinks from './NavLinks';
import SearchButton from './SearchButton';
import BookingButton from './BookingButton';
import MenuButton from './MenuButton';
import SearchModal from './SearchModal';
import './Navbar.css';

interface NavbarProps {
  onOpenBooking?: () => void;
  isRevealed?: boolean;
}

const MOBILE_NAV_LINKS = [
  { id: 'hero', number: '01', title: 'HOME' },
  { id: 'statement', number: '02', title: 'ABOUT' },
  { id: 'services', number: '03', title: 'SERVICES' },
  { id: 'gallery', number: '04', title: 'GALLERY' },
  { id: 'experience', number: '05', title: 'EXPERIENCE' },
  { id: 'final-cta', number: '06', title: 'CONTACT' },
];

export default function Navbar({ onOpenBooking, isRevealed = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navRafRef = useRef<number | null>(null);

  // Close expanded mobile menu on window resize above mobile breakpoint or ESC
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1040 && menuOpen) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Scroll listener: hides navbar to top when scrolling, reverses back when scrolling pauses or scrolls up
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let lastScrolled = false;
    let idleTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isPast = currentY > 30;

      if (isPast !== lastScrolled) {
        lastScrolled = isPast;
        setScrolled(isPast);
      }

      // At top of page, always keep navbar in natural position
      if (currentY <= 30) {
        if (idleTimer) clearTimeout(idleTimer);
        setNavHidden(false);
        lastY = currentY;
        return;
      }

      const delta = Math.abs(currentY - lastY);
      lastY = currentY;

      // When actively scrolling in ANY direction (including reverse/up):
      // Hide the navbar by translating it to the top!
      if (delta > 1.5) {
        setNavHidden(true);
      }

      // When not scrolling (user stops moving):
      // Reverse back quickly and smoothly down into view!
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setNavHidden(false);
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
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

  const handleMobileNavClick = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      handleSelectSection(id);
    }, 180);
  };

  const isEffectivelyHidden = !isRevealed || (navHidden && !menuOpen && !searchOpen);
  const genieClass = !isRevealed
    ? 'macos-genie-prereveal'
    : isEffectivelyHidden
    ? 'macos-genie-minimized'
    : 'macos-genie-opened';

  // Fixed compact height and border radius matching Image 2 reference
  const isMobileExpanded = menuOpen;
  const navHeight = isMobileExpanded ? 440 : 58;
  const navRadius = isMobileExpanded ? 24 : 20;

  return (
    <>
      {/* Dimmed backdrop when mobile glass navbar is expanded */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(4, 4, 6, 0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 995,
          opacity: isMobileExpanded ? 1 : 0,
          pointerEvents: isMobileExpanded ? 'auto' : 'none',
          transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      />

      <header
        style={{
          position: 'fixed',
          top: '14px',
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          pointerEvents: isEffectivelyHidden ? 'none' : 'auto',
          transition: 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <GlassSurface
          ref={navRef}
          as="nav"
          role="navigation"
          aria-label="Main Navigation"
          width="clamp(320px, 94vw, 1380px)"
          height={navHeight}
          borderRadius={navRadius}
          borderWidth={0.07}
          brightness={50}
          opacity={0.92}
          blur={11}
          displace={0}
          backgroundOpacity={0.16}
          saturation={1.8}
          distortionScale={-130}
          redOffset={2}
          greenOffset={8}
          blueOffset={14}
          onMouseMove={handleMouseMove}
          className={`spark-floating-navbar is-scrolled ${genieClass} ${isMobileExpanded ? 'is-expanded' : ''}`}
          style={{
            pointerEvents: isEffectivelyHidden ? 'none' : 'auto',
            position: 'relative',
            border: 'none',
            outline: 'none',
            userSelect: 'none',
            transition:
              'height 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), background 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          contentClassName="spark-floating-navbar-content"
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            padding: 0,
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            boxSizing: 'border-box',
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

          {/* Bottom Ambient Refraction Edge (Glides to bottom of expanded container) */}
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
                'radial-gradient(circle at var(--nav-mx, 50%) var(--nav-my, 50%), rgba(255, 255, 255, 0.06) 0%, transparent 35%)',
              pointerEvents: 'none',
              zIndex: 2,
              transition: 'background 0.15s ease-out',
            }}
          />

          {/* TOP BAR ROW: Logo, Desktop Links, Action Buttons & Hamburger Box */}
          <div
            className="spark-top-bar-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '58px',
              boxSizing: 'border-box',
              flexShrink: 0,
              position: 'relative',
              zIndex: 5,
            }}
          >
            {/* LEFT: Luxury Logo Panel Capsule */}
            <LogoPanel scrolled={true} onLogoClick={() => handleMobileNavClick('hero')} />

            {/* CENTER: Navigation Links (Visible on desktop) */}
            <div className="spark-desktop-nav-links" style={{ display: 'flex', alignItems: 'center' }}>
              <NavLinks scrolled={true} onNavigate={handleSelectSection} />
            </div>

            {/* RIGHT: Search + Divider + Book CTA + Menu Hamburger */}
            <div
              className="spark-right-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
                zIndex: 5,
                transition: 'gap 0.3s ease',
              }}
            >
              {/* Search Button (Hidden on mobile) */}
              <div className="spark-search-wrapper">
                <SearchButton scrolled={true} onClick={() => setSearchOpen(true)} />
              </div>

              {/* Vertical Separator Line */}
              <div
                className="spark-nav-divider"
                style={{
                  width: '1px',
                  height: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                }}
              />

              {/* Primary Booking CTA Button (Hidden on mobile) */}
              <div className="spark-booking-wrapper">
                <BookingButton scrolled={true} onClick={handleBookingClick} />
              </div>

              {/* Hamburger Box Button (Hidden on desktop) */}
              <div className="spark-menu-wrapper">
                <MenuButton
                  scrolled={true}
                  isOpen={menuOpen}
                  onClick={() => setMenuOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          {/* MOBILE EXPANDING GLASS DRAWER CONTENT */}
          <div
            className="spark-mobile-expanded-drawer"
            style={{
              width: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              transition:
                'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isMobileExpanded ? 1 : 0,
              transform: isMobileExpanded ? 'translateY(0)' : 'translateY(-10px)',
              pointerEvents: isMobileExpanded ? 'auto' : 'none',
              boxSizing: 'border-box',
            }}
          >
            {/* Delicate Gold Separator Line */}
            <div
              style={{
                height: '1px',
                margin: '0 16px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.35) 20%, rgba(255, 245, 210, 0.6) 50%, rgba(212, 175, 55, 0.35) 80%, transparent 100%)',
                opacity: isMobileExpanded ? 0.85 : 0,
                transition: isMobileExpanded
                  ? 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.05s'
                  : 'opacity 0.15s ease',
              }}
            />

            {/* Editorial Navigation List View (One by One with Smooth Staggered Drop Down) */}
            <div
              className="spark-drawer-grid"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6.5px',
                boxSizing: 'border-box',
              }}
            >
              {MOBILE_NAV_LINKS.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  className="spark-mobile-glass-nav-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '38px',
                    padding: '0 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    color: '#f4f1ea',
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none',
                    backdropFilter: 'none',
                    WebkitBackdropFilter: 'none',
                    boxSizing: 'border-box',
                    opacity: isMobileExpanded ? 1 : 0,
                    transform: isMobileExpanded
                      ? 'translateY(0) scale(1)'
                      : 'translateY(-16px) scale(0.96)',
                    transition: isMobileExpanded
                      ? `transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + index * 0.045}s, opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + index * 0.045}s, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease`
                      : 'transform 0.2s ease, opacity 0.15s ease',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--gold-primary, #c9a45c)',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {item.number}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: '#ffffff',
                        textTransform: 'lowercase',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Subtle Elegant Forward Indicator */}
                  <ArrowRight
                    size={14}
                    className="spark-nav-item-arrow"
                    style={{
                      color: 'rgba(201, 164, 92, 0.5)',
                      transition: 'transform 0.2s ease, color 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* VIP Booking CTA Action in the Expanded Glass Drawer */}
            <div
              className="spark-drawer-cta"
              style={{
                boxSizing: 'border-box',
                opacity: isMobileExpanded ? 1 : 0,
                transform: isMobileExpanded
                  ? 'translateY(0) scale(1)'
                  : 'translateY(-16px) scale(0.96)',
                transition: isMobileExpanded
                  ? `transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + MOBILE_NAV_LINKS.length * 0.045}s, opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + MOBILE_NAV_LINKS.length * 0.045}s`
                  : 'transform 0.2s ease, opacity 0.15s ease',
                willChange: 'transform, opacity',
              }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleBookingClick();
                }}
                className="spark-booking-btn"
                style={{
                  width: '100%',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(212, 175, 55, 0.75)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                }}
              >
                <span>Book Appointment</span>
                <ArrowRight size={15} color="#f3e5ab" />
              </button>
            </div>
          </div>
        </GlassSurface>
      </header>

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
