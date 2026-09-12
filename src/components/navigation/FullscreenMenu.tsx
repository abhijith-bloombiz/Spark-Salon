'use client';

import React, { useEffect } from 'react';
import { X, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (id: string) => void;
  onOpenBooking: () => void;
}

const MENU_LINKS = [
  { id: 'hero', number: '01', title: 'HOME', subtitle: 'Atelier & Luxury Salon' },
  { id: 'statement', number: '02', title: 'ABOUT', subtitle: 'The Philosophy of Beauty' },
  { id: 'services', number: '03', title: 'SERVICES', subtitle: 'Bespoke Hair, Skin & Rituals' },
  { id: 'gallery', number: '04', title: 'GALLERY', subtitle: 'Signature Looks & Transformations' },
  { id: 'experience', number: '05', title: 'EXPERIENCE', subtitle: 'Sensory Luxury & Craftsmanship' },
  { id: 'final-cta', number: '06', title: 'CONTACT', subtitle: 'VIP Concierge & Studio Coordinates' },
];

export default function FullscreenMenu({
  isOpen,
  onClose,
  onSelectSection,
  onOpenBooking,
}: FullscreenMenuProps) {
  // ESC key listener to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Navigation Menu"
      data-lenis-prevent
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#060608',
        backgroundImage:
          'radial-gradient(circle at 10% 20%, rgba(201, 164, 92, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(139, 36, 31, 0.08) 0%, transparent 60%)',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 4vw, 56px) clamp(24px, 6vw, 84px)',
        overflowY: 'auto',
        animation: 'sparkFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {/* Decorative Gold Ambient Line Top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #aa8210 20%, #fff0b8 50%, #aa8210 80%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar inside Menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(201, 164, 92, 0.18)',
          paddingBottom: '20px',
        }}
      >
        {/* Brand Crest */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src="/images/logo-emblem-crop.png"
            alt="Spark Logo"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif-display), "Cinzel", serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.14em',
              }}
            >
              BYJU SPARK
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans-display), sans-serif',
                fontSize: '0.52rem',
                fontWeight: 600,
                color: 'var(--gold-primary)',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
              }}
            >
              LUXURY ATELIER &amp; SPA
            </span>
          </div>
        </div>

        {/* Circular Close Button with Gold Glow */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="spark-menu-close-btn"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(201, 164, 92, 0.45)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(201, 164, 92, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f4f1ea',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Main Navigation Links with Editorial Numbers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: ' clamp(16px, 2.5vw, 36px)',
          margin: 'clamp(28px, 4vh, 48px) 0',
        }}
      >
        {MENU_LINKS.map((link, idx) => (
          <div
            key={link.id}
            onClick={() => {
              onSelectSection(link.id);
              onClose();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectSection(link.id);
                onClose();
              }
            }}
            className="spark-fullscreen-item squircle-sm"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '18px',
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(201, 164, 92, 0.12)',
              cursor: 'pointer',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: `sparkSlideIn 0.4s ease forwards ${0.08 * (idx + 1)}s`,
              opacity: 0,
              outline: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans-display), sans-serif',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--gold-primary)',
                letterSpacing: '0.15em',
              }}
            >
              {link.number}
            </span>

            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif-display), "Cinzel", "Playfair Display", serif',
                  fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: '#f4f1ea',
                  margin: 0,
                  lineHeight: 1.1,
                  transition: 'color 0.25s ease',
                }}
              >
                {link.title}
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-sans-display), sans-serif',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-dim)',
                  display: 'block',
                  marginTop: '4px',
                }}
              >
                {link.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Coordinates & Book CTA */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          borderTop: '1px solid rgba(201, 164, 92, 0.18)',
          paddingTop: '24px',
        }}
      >
        {/* Coordinates */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} color="var(--gold-primary)" />
            <span>Mon - Sun, 09am - 09pm</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={14} color="var(--gold-primary)" />
            <a href="tel:+918543097899" style={{ color: 'inherit', textDecoration: 'none' }}>
              +91 8543097899
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} color="var(--gold-primary)" />
            <span>Kozhikode, Kerala</span>
          </div>
        </div>

        {/* Primary Booking CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
          className="btn-primary-crimson squircle-sm"
          style={{
            padding: '14px 28px',
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '24px',
          }}
        >
          <span>BOOK YOUR EXPERIENCE</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <style jsx>{`
        @keyframes sparkFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes sparkSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
