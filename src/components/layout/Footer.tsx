'use client';

import React from 'react';
import SparkLogo from './SparkLogo';
import { Phone, Mail, MapPin, Globe, ArrowRight } from 'lucide-react';
import { BlurText, ScrollCard } from '@/components/ui';

interface FooterProps {
  onOpenBooking?: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, { duration: 1.2, offset: 0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#040406',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* MAIN FOOTER */}
      <div
        style={{
          position: 'relative',
          padding: '80px 0 30px',
          backgroundColor: '#040406',
          backgroundImage: "url('/images/sections/bg-2.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="luxury-container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 1.2fr) 1px minmax(180px, 0.9fr) 1px minmax(280px, 1.4fr)',
              gap: '40px 30px',
              alignItems: 'center',
              marginBottom: '60px',
            }}
            className="footer-exact-grid"
          >
            {/* Column 1: Logo, Beauty Creates Confidence & Social Icons below Logo */}
            <ScrollCard direction="left" delay={0.06}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
                  <SparkLogo size="hero" variant="stacked" showTagline={false} />
                </div>

                <BlurText
                  as="div"
                  text="BEAUTY CREATES CONFIDENCE"
                  delay={30}
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    marginTop: '10px',
                  }}
                />

                {/* Social Media Icons below logo - clean and borderless */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', marginTop: '22px' }}>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    style={{
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      textDecoration: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    style={{
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      textDecoration: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    style={{
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      textDecoration: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#040406" />
                    </svg>
                  </a>

                  {/* Globe */}
                  <a
                    href="https://sparksalon.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Website"
                    style={{
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      textDecoration: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Globe size={19} />
                  </a>
                </div>
              </div>
            </ScrollCard>

            {/* Vertical Red Divider Line */}
            <div
              style={{
                width: '1px',
                height: '180px',
                background: 'linear-gradient(to bottom, transparent, #c41e3a, transparent)',
              }}
              className="footer-divider-line"
            />

            {/* Column 2: Navigation Links matching footer.png */}
            <ScrollCard direction="bottom" delay={0.12}>
              <div className="footer-col-nav" style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '20px' }}>
                {[
                  { label: 'HOME', id: 'hero' },
                  { label: 'ABOUT', id: 'statement' },
                  { label: 'SERVICES', id: 'services' },
                  { label: 'GALLERY', id: 'gallery' },
                  { label: 'EXPERIENCE', id: 'experience' },
                  { label: 'CONTACT', id: 'final-cta' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: '#ffffff',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </ScrollCard>

            {/* Vertical Red Divider Line */}
            <div
              style={{
                width: '1px',
                height: '180px',
                background: 'linear-gradient(to bottom, transparent, #c41e3a, transparent)',
              }}
              className="footer-divider-line"
            />

            {/* Column 3: Let's Connect + Contact Info + Button */}
            <ScrollCard direction="right" delay={0.18}>
              <div className="footer-col-contact" style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingLeft: '20px' }}>
                <BlurText
                  as="h4"
                  text="LET'S CONNECT"
                  delay={30}
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.24em',
                    color: 'var(--gold-light)',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                />

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-light)',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <a
                    href="tel:+918543097899"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    +91 98765 43210 / +91 8543097899
                  </a>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-light)',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <a
                    href="mailto:concierge@sparksalon.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    concierge@sparksalon.com
                  </a>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-light)',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <span
                    style={{
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Kochi &amp; Kozhikode, Kerala
                  </span>
                </div>



                {/* Crimson CTA Button matching footer.png */}
                <button
                  onClick={() => {
                    if (onOpenBooking) onOpenBooking();
                    else {
                      const el = document.getElementById('hero');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-primary-crimson squircle-sm"
                  style={{
                    marginTop: '10px',
                    padding: '14px 28px',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: 'fit-content',
                  }}
                >
                  <span>BOOK YOUR EXPERIENCE</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </ScrollCard>
          </div>

          {/* Bottom Bar matching footer.png */}
          <ScrollCard direction="bottom" delay={0.1}>
            <div
              className="footer-bottom-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                }}
              >
                SPARK LUXURY ATELIER
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                }}
              >
                © 2026 BYJU SPARK INTERNATIONAL SALON. ALL RIGHTS RESERVED.
              </div>
            </div>
          </ScrollCard>
        </div>
      </div>
    </footer>
  );
}
