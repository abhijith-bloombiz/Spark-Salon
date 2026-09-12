'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { BlurText, ScrollCard, ModernTiltCard } from '@/components/ui';

export default function BrandStatement() {
  return (
    <section
      id="statement"
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 80px',
        backgroundColor: '#040406',
        backgroundImage: "url('/images/sections/bg-2.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px 80px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Stacked Monumental Typography & Section Number */}
          <ScrollCard direction="left" delay={0.06} distance={55} duration={0.85}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--gold-primary)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.24em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                  }}
                >
                  02 — THE PHILOSOPHY
                </span>
              </div>

              <BlurText
                as="h2"
                text={"BEAUTY\nIS NOT\nA LOOK.\nIT'S A\nSIGNATURE."}
                highlightWords={["IT'S", "A"]}
                highlightStyle={{ color: 'var(--gold-light)' }}
                delay={80}
                direction="top"
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(2.4rem, 4.4vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.04,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '24px',
                }}
              />

              <BlurText
                as="p"
                delay={20}
                text="A sanctuary where cutting-edge dermatological science, bespoke hair artistry, and deep tranquil luxury converge to reveal your most radiant self."
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.92rem',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  maxWidth: '440px',
                }}
              />
            </div>
          </ScrollCard>

          {/* Right Column: Chiaroscuro Sculpture with Liquid Gold Ribbons & Atelier Creed */}
          <ScrollCard direction="right" delay={0.12} distance={70} duration={0.85}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <ModernTiltCard
              maxTilt={8}
              className="squircle-lg creed-tilt-card"
              borderRadius="var(--squircle-xl, 26px)"
              style={{
                width: '100%',
                maxWidth: '490px',
                height: '520px',
                position: 'relative',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.12)',
              }}
              innerStyle={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 'inherit',
              }}
            >
              {/* Full-Bleed High-Fashion Atelier Background Image */}
              <img
                src="/images/sections/atelier-creed.jpg"
                alt="The Spark Atelier Creed"
                className="creed-bg-image"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  zIndex: 0,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Luxury Obsidian Gradient Scrim Overlay for optimal contrast & text readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at center, rgba(14, 12, 20, 0.65) 0%, rgba(8, 8, 12, 0.84) 65%, rgba(4, 4, 6, 0.96) 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* Elegant Gold Orbital Filaments Framing the Card */}
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: 0.6,
                }}
                viewBox="0 0 520 560"
                fill="none"
              >
                <defs>
                  <linearGradient id="goldFilament" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff2be" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#d4af37" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8c6a08" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="goldFilament2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                    <stop offset="60%" stopColor="#fff2be" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M -30 460 C 120 440, 160 300, 260 280 C 380 260, 420 420, 550 360"
                  stroke="url(#goldFilament)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M -10 140 C 90 220, 280 180, 380 100 C 440 50, 480 30, 530 10"
                  stroke="url(#goldFilament2)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Subtle decorative orbital ring in top-right corner */}
                <circle cx="430" cy="90" r="45" stroke="url(#goldFilament)" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
              </svg>

              {/* Luxury Obsidian Glass Center with Glowing Gold Emblem */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '36px 28px',
                  textAlign: 'center',
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.18)',
                    border: '1px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    marginBottom: '20px',
                    boxShadow: '0 0 28px rgba(212, 175, 55, 0.3)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <Sparkles size={26} color="#e5c158" />
                </div>

                <BlurText
                  as="h3"
                  text="The Spark Atelier Creed"
                  delay={45}
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#ffffff',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                />

                <BlurText
                  as="p"
                  delay={20}
                  text="“Every curve, cut, and touch is an ode to individuality. We do not replicate trends; we sculpt your distinct signature.”"
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: 'rgba(235, 235, 240, 0.85)',
                    maxWidth: '340px',
                    letterSpacing: '0.03em',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                />

                <div
                  className="squircle-sm"
                  style={{
                    marginTop: '24px',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                  }}
                >
                  HAUTE COUTURE PHILOSOPHY
                </div>
              </div>
            </ModernTiltCard>
          </div>
          </ScrollCard>
        </div>
      </div>

      {/* Dynamic Background Image Zoom on Tilt Card Hover */}
      <style jsx global>{`
        .creed-tilt-card:hover .creed-bg-image {
          transform: scale(1.07) !important;
        }
      `}</style>
    </section>
  );
}
