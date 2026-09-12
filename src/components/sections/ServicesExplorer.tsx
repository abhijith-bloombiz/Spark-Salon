'use client';

import React, { useState } from 'react';
import { ArrowRight, Scissors, Sparkles, Crown, Palette, Heart, Gem, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { BlurText, ScrollCard, ModernTiltCard, SectionCornerAccent } from '@/components/ui';

interface ServicesExplorerProps {
  onOpenBooking?: (studio: string) => void;
}

export default function ServicesExplorer({ onOpenBooking }: ServicesExplorerProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const categories = [
    {
      num: '01',
      name: 'HAIR CARE',
      title: 'LUXURY HAIR CARE & RITUALS',
      subtitle: 'RESTORATIVE CELLULAR INFUSION',
      description: 'Rejuvenate damaged strands with botanical caviar, Kérastase Fusio-Dose, 24K gold infusions, and scalp revitalizations.',
      icon: <Scissors size={20} color="var(--gold-light)" />,
      image: '/images/experience/exp-hair.jpg',
      duration: '60 - 90 MINS',
      price: 'FROM ₹2,500',
      highlights: ['Fusio-Dose Customized Booster', 'Deep Scalp Cryotherapy', 'Thermal Silk Seal Finish'],
      studio: 'hair',
    },
    {
      num: '02',
      name: 'CUT & STYLE',
      title: 'ARCHITECTURAL CUT & STYLING',
      subtitle: 'SCULPTED TO YOUR CRANIAL PROFILE',
      description: 'Precision Japanese shears cutting, face-contouring layers, dimensional French blowouts, and bespoke runway styling.',
      icon: <Sparkles size={20} color="var(--gold-light)" />,
      image: '/images/gallery/precision-shears-cutting.webp',
      duration: '45 - 60 MINS',
      price: 'FROM ₹1,800',
      highlights: ['Face-Contouring Architecture', 'Weightless Slide Cutting', 'Bespoke Blow-Dry Finish'],
      studio: 'hair',
    },
    {
      num: '03',
      name: 'BRIDAL COUTURE',
      title: 'REGAL BRIDAL MASTERPIECE',
      subtitle: 'UNPARALLELED WEDDING PERFECTION',
      description: 'Exclusive Muhurtham bridal hair sculpting, couture jewellery setting, and high-definition bridal glow artistry.',
      icon: <Crown size={20} color="var(--gold-light)" />,
      image: '/images/experience/exp-bridal.jpg',
      duration: '180 - 240 MINS',
      price: 'FROM ₹18,000',
      highlights: ['Private Bridal VIP Dressing Suite', 'Jewellery & Saree Drape Synchrony', 'Touch-up Concierge Kit'],
      studio: 'bridal',
    },
    {
      num: '04',
      name: 'HIGH-DEF MAKEUP',
      title: 'AIRBRUSH RED CARPET GLOW',
      subtitle: 'CAMERA-READY RADIANCE',
      description: 'Ultra-lightweight HD mineral pigments, micro-contouring, and humidity-resistant skin prep for lasting elegance.',
      icon: <Palette size={20} color="var(--gold-light)" />,
      image: '/images/gallery/glamour-makeup-portrait.webp',
      duration: '60 - 75 MINS',
      price: 'FROM ₹4,500',
      highlights: ['18-Hour Humidity Proof', 'Temptu Pro HD Airbrush', 'Custom Silk Lash Sculpting'],
      studio: 'bridal',
    },
    {
      num: '05',
      name: 'SKIN THERAPY',
      title: 'CELLULAR RADIANCE DERMA-SPA',
      subtitle: 'ILLUMINATE FROM WITHIN',
      description: 'HydraFacial MD deep infusion, 24K gold foil anti-aging facial, lymphatic facial massage, and LED phototherapy.',
      icon: <Heart size={20} color="var(--gold-light)" />,
      image: '/images/experience/exp-skin.jpg',
      duration: '75 - 90 MINS',
      price: 'FROM ₹3,800',
      highlights: ['HydraFacial Vortex Infusion', 'Cryo-Sculpting Facial Contouring', 'Medical-Grade Collagen Mask'],
      studio: 'skin',
    },
    {
      num: '06',
      name: 'NAIL ATELIER',
      title: 'RUSSIAN APEX NAIL SCULPTING',
      subtitle: 'PRECISION GLASS FINISH',
      description: 'Diamond drill cuticle care, hard gel architectural extension, and hand-painted metallic luxury nail couture.',
      icon: <Gem size={20} color="var(--gold-light)" />,
      image: '/images/gallery/luxury-marble-manicure.webp',
      duration: '60 - 90 MINS',
      price: 'FROM ₹2,200',
      highlights: ['Diamond Micro-Cuticle Care', 'Non-Toxic Gel Formulations', 'Haute Metallic Embellishments'],
      studio: 'spa',
    },
  ];

  const current = categories[activeIdx];

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking(current.studio);
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        minHeight: '850px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 90px',
        backgroundColor: '#040406',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '30px',
            alignItems: 'stretch',
          }}
          className="services-exact-grid"
        >
          {/* Column 1: Stacked Title & 6 Interactive Category Selectors */}
          <ScrollCard direction="left" delay={0.06}>
            <div
              className="services-selectors-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: '520px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
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
                    03 — BESPOKE PROTOCOLS
                  </span>
                </div>

                <BlurText
                  as="h2"
                  text={'YOUR\nSIGNATURE\nSERVICES.'}
                  highlightWords={['SIGNATURE']}
                  delay={80}
                  direction="top"
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    marginBottom: '26px',
                  }}
                />
              </div>

              <div className="services-categories-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categories.map((cat, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={cat.num}
                      onClick={() => setActiveIdx(idx)}
                      className={`squircle-sm services-category-btn ${isActive ? 'is-active' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 18px',
                        border: isActive
                          ? '1px solid var(--gold-primary)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isActive
                          ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.08) 100%)'
                          : 'rgba(14, 13, 20, 0.94)',
                        color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isActive ? '0 4px 20px rgba(212, 175, 55, 0.25)' : 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        outline: 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                          e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                          e.currentTarget.style.color = '#ffffff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.background = 'rgba(12, 11, 18, 0.65)';
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: isActive ? 'var(--gold-light)' : 'var(--gold-primary)',
                          }}
                        >
                          {cat.num}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: isActive ? '#ffffff' : 'inherit',
                          }}
                        >
                          {cat.name}
                        </span>
                      </div>

                      <ArrowRight
                        size={14}
                        color={isActive ? 'var(--gold-light)' : 'var(--text-dim)'}
                        style={{
                          transform: isActive ? 'translateX(4px)' : 'none',
                          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollCard>

          {/* Column 2: Active Service Ritual Architecture Card */}
          <ScrollCard direction="bottom" delay={0.14}>
            <div
              className="squircle"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '520px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), var(--gold-glow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('.service-card-bg-img') as HTMLElement | null;
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('.service-card-bg-img') as HTMLElement | null;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Full-Bleed Card Background Image with Smooth Crossfade */}
              <img
                key={current.name}
                src={current.image}
                alt={current.name}
                className="service-card-bg-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Luxury Gradient Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(8, 7, 14, 0.6) 0%, rgba(6, 6, 10, 0.82) 42%, rgba(4, 4, 6, 0.96) 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* Inner Content Container */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: '520px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--squircle-capsule, 14px)',
                        backgroundColor: 'rgba(8, 7, 12, 0.65)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid var(--gold-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                      }}
                    >
                      {current.icon}
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold-light)',
                        fontWeight: 700,
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                      }}
                    >
                      ATELIER PROTOCOL
                    </div>
                  </div>

                  <BlurText
                    as="h3"
                    text={current.title}
                    delay={35}
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      marginBottom: '10px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                    }}
                  />

                  <BlurText
                    as="p"
                    text={current.description}
                    delay={20}
                    style={{
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.84rem',
                      lineHeight: 1.6,
                      color: 'rgba(235, 235, 240, 0.85)',
                      marginBottom: '24px',
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold-primary)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        marginBottom: '2px',
                      }}
                    >
                      RITUAL HIGHLIGHTS
                    </div>
                    {current.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={14} color="var(--gold-light)" />
                        <span
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.78rem',
                            color: '#ffffff',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    marginTop: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.75)' }}>
                    <Clock size={13} />
                    <span style={{ fontFamily: 'var(--font-sans-display)', fontSize: '0.74rem', letterSpacing: '0.12em' }}>
                      {current.duration}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)' }}>
                    <ShieldCheck size={14} />
                    <span style={{ fontFamily: 'var(--font-sans-display)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      {current.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </ScrollCard>

        {/* Column 3: Service Detail Action Card (Matching Architectural Container) */}
        <ScrollCard direction="right" delay={0.22}>
          <ModernTiltCard
            className="squircle"
            maxTilt={8}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '520px',
              boxSizing: 'border-box',
            }}
            innerStyle={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <BlurText
                as="div"
                text={current.subtitle}
                delay={25}
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              />

              <BlurText
                as="h3"
                text="Elevate Your Personal Aesthetic"
                delay={35}
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '16px',
                  lineHeight: 1.25,
                }}
              />

              <BlurText
                as="p"
                delay={20}
                text="Every treatment begins with an in-depth private consultation with our senior stylists and dermatologists, tailoring formulas and techniques specifically to your natural texture and skin profile."
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.84rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              />

              {/* Luxury Feature Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '0.64rem',
                    letterSpacing: '0.14em',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ BESPOKE BLEND
                </span>
                <span
                  style={{
                    fontSize: '0.64rem',
                    letterSpacing: '0.14em',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ PRIVATE SUITE
                </span>
                <span
                  style={{
                    fontSize: '0.64rem',
                    letterSpacing: '0.14em',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ MASTER ARTISANS
                </span>
              </div>

              {/* Luxury Liquid Gold CTA Button */}
              <button
                onClick={handleBookingClick}
                className="btn-secondary-gold squircle-sm"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: '0.76rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <span>RESERVE THIS EXPERIENCE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom 01 — 06 indicator aligned with Column 2 bottom baseline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                marginTop: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                EXPERIENCE PROTOCOL
              </span>

              <div
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>{current.num}</span>
                <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--gold-primary)' }} />
                <span>06</span>
              </div>
            </div>
          </ModernTiltCard>
        </ScrollCard>
        </div>
      </div>

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
