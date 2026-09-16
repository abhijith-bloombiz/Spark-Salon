'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, PhoneCall, Calendar } from 'lucide-react';
import { BlurText, ScrollCard, ModernTiltCard, SectionCornerAccent } from '@/components/ui';

export default function FinalCta() {
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
    <section
      id="final-cta"
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(70px, 7.5vw, 100px) 0',
        backgroundColor: '#040406',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Main Content Grid */}
      <div className="luxury-container" style={{ position: 'relative', zIndex: 3, margin: 'auto auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.3fr)',
            gap: '50px 70px',
            alignItems: 'center',
          }}
          className="final-cta-grid"
        >
          {/* Left: Atelier VIP Concierge Invitation Capsule */}
          <ScrollCard direction="left" delay={0.1}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <ModernTiltCard
                className="squircle-lg"
                maxTilt={9}
                style={{
                  width: '100%',
                  maxWidth: '460px',
                }}
                innerStyle={{
                  padding: 'clamp(24px, 4vw, 44px) clamp(20px, 3.5vw, 36px)',
                  height: '100%',
                }}
              >
                {/* 3D Tier XL: Floating Gold Sparkles Emblem */}
                <div
                  className="tilt-z-xl"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    marginBottom: '24px',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.25)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <Sparkles size={28} color="#e5c158" />
                </div>

                {/* 3D Tier SM: Subtitle */}
                <div className="tilt-z-sm" style={{ marginBottom: '8px' }}>
                  <BlurText
                    as="div"
                    text="PRIVATE ATELIER ACCESS"
                    delay={30}
                    style={{
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.22em',
                      color: 'var(--gold-primary)',
                      textTransform: 'uppercase',
                    }}
                  />
                </div>

                {/* 3D Tier MD: Heading */}
                <div className="tilt-z-md" style={{ marginBottom: '16px' }}>
                  <BlurText
                    as="h3"
                    text="Bespoke Appointments"
                    delay={35}
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '1.65rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  />
                </div>

                {/* 3D Tier XS: Paragraph */}
                <div className="tilt-z-xs" style={{ marginBottom: '28px' }}>
                  <BlurText
                    as="p"
                    delay={20}
                    text="Experience tailored hair sculpture, clinical skin therapies, and private bridal luxury designed exclusively around your schedule."
                    style={{
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.86rem',
                      lineHeight: 1.7,
                      color: 'var(--text-muted)',
                    }}
                  />
                </div>

                {/* 3D Tier LG: Concierge Perks */}
                <div className="tilt-z-lg" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Complimentary Digital Scalp & Hair Diagnostics',
                    'Private VIP Suite Dressing for Bridal Parties',
                    'Direct Concierge WhatsApp Assistance',
                  ].map((perk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={15} color="var(--gold-light)" />
                      <span style={{ fontFamily: 'var(--font-sans-display)', fontSize: '0.8rem', color: '#ffffff' }}>
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </ModernTiltCard>
            </div>
          </ScrollCard>

          {/* Right: Dramatic Typography & Action Buttons */}
          <ScrollCard direction="right" delay={0.25}>
            <div>
              <BlurText
                as="h2"
                text={'READY TO\nSPARK?'}
                highlightWords={['SPARK']}
                delay={120}
                direction="top"
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(2.8rem, 5.8vw, 4.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '16px',
                }}
              />

              <BlurText
                as="p"
                text="Your signature look starts here."
                delay={25}
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom: '36px',
                }}
              />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <button
                  onClick={() => scrollTo('booking')}
                  className="btn-primary-crimson squircle-sm"
                  style={{ padding: '18px 36px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <Calendar size={15} />
                  <span>BOOK YOUR EXPERIENCE</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => scrollTo('tour')}
                  className="btn-secondary-gold squircle-sm"
                  style={{ padding: '17px 32px', fontSize: '0.78rem' }}
                >
                  <span>VISIT THE SALON</span>
                </button>
              </div>
            </div>
          </ScrollCard>
        </div>
      </div>

      {/* Bottom Bar matching design reference */}
      <div className="luxury-container" style={{ position: 'relative', zIndex: 3, marginTop: '40px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            paddingTop: '20px',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
          }}
        >
          <div style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>
            09
          </div>

          <div>
            BYJU SPARK INTERNATIONAL SALON &amp; SPA • KOZHIKODE
          </div>
        </div>
      </div>

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
