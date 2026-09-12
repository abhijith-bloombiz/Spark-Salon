'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlurText, ScrollCard, ModernTiltCard, SectionCornerAccent } from '@/components/ui';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials = [
    {
      id: '1',
      name: 'Anjali Menon',
      location: 'Kochi',
      service: 'Haute Balayage & Keratin Infusion',
      quote: 'Absolutely transformed my hair. The precision, diagnostic consultation, and tranquility at Spark is unmatched anywhere in South India.',
      initials: 'AM',
      rating: 5,
      image: '/images/testimonials/client-anjali.jpg',
    },
    {
      id: '2',
      name: 'Dr. Rehana Cheriyan',
      location: 'Kozhikode',
      service: 'HydraFacial MD & Scalp Rejuvenation',
      quote: 'The level of clinical precision, hygiene, and private VIP luxury at Spark sets an international benchmark. Truly a world-class atelier experience.',
      initials: 'RC',
      rating: 5,
      image: '/images/testimonials/client-rehana.jpg',
    },
    {
      id: '3',
      name: 'Aiswarya Varma',
      location: 'Calicut',
      service: 'Royal Bridal Muhurtham Couture',
      quote: 'From the private bridal suite to the bespoke jewellery drapery, the master stylists made my wedding styling completely stress-free and magical.',
      initials: 'AV',
      rating: 5,
      image: '/images/testimonials/client-aiswarya.jpg',
    },
    {
      id: '4',
      name: 'Zameel Hameed',
      location: 'Dubai & Calicut',
      service: 'Executive Grooming & Deep Tissue Therapy',
      quote: 'Every visit is seamless. The attention to cranial anatomy and bespoke beard sculpting is the best in Kerala. Highly recommended.',
      initials: 'ZH',
      rating: 5,
      image: '/images/testimonials/client-zameel.jpg',
    },
  ];

  const current = testimonials[currentIdx];

  const next = () => setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        padding: 'clamp(70px, 7.5vw, 95px) 0 65px',
        backgroundColor: '#040406',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2, margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(320px, 1.05fr)',
            gap: '36px 60px',
            alignItems: 'stretch',
          }}
          className="testimonials-grid"
        >
          {/* Left Column: Monumental Headline, Quote, Controls */}
          <ScrollCard direction="left" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.24em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--gold-primary)' }} />
                  <BlurText as="span" text="CLIENT ACCLAIM" delay={25} />
                </div>

                <BlurText
                  as="h2"
                  text={'HEAR\nFROM OUR\nCLIENTS.'}
                  highlightWords={['CLIENTS']}
                  delay={100}
                  direction="top"
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)',
                    fontWeight: 800,
                    lineHeight: 1.04,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    marginBottom: '26px',
                  }}
                />

                {/* Dynamic Quote Block with Buttery-Smooth Crossfade */}
                <div style={{ position: 'relative', minHeight: '175px', marginBottom: '28px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-serif-display)',
                          fontSize: 'clamp(1.1rem, 1.8vw, 1.32rem)',
                          lineHeight: 1.62,
                          color: '#ffffff',
                          fontStyle: 'italic',
                          marginBottom: '20px',
                        }}
                      >
                        “{current.quote}”
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          className="squircle-sm"
                          style={{
                            position: 'relative',
                            width: '54px',
                            height: '54px',
                            border: '1.5px solid var(--gold-primary)',
                            overflow: 'hidden',
                            boxShadow: '0 4px 18px rgba(212, 175, 55, 0.35)',
                            backgroundColor: 'rgba(212, 175, 55, 0.15)',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={current.image}
                            alt={current.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              display: 'block',
                            }}
                          />
                        </div>

                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-sans-display)',
                              fontSize: '0.92rem',
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <span>{current.name}</span>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '2px 7px',
                                borderRadius: 'var(--squircle-capsule, 6px)',
                                backgroundColor: 'rgba(212, 175, 55, 0.14)',
                                border: '1px solid rgba(212, 175, 55, 0.4)',
                                fontFamily: 'var(--font-sans-display)',
                                fontSize: '0.58rem',
                                letterSpacing: '0.12em',
                                color: 'var(--gold-primary)',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                              }}
                            >
                              VIP Client
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-sans-display)',
                              fontSize: '0.74rem',
                              letterSpacing: '0.1em',
                              color: 'var(--gold-light)',
                              textTransform: 'uppercase',
                              marginTop: '3px',
                            }}
                          >
                            {current.location} • {current.service}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation Controls & Section Number Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={prev}
                    aria-label="Previous Testimonial"
                    className="btn-nav-control"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next Testimonial"
                    className="btn-nav-control"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {testimonials.map((t, i) => {
                      const isActive = currentIdx === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentIdx(i)}
                          aria-label={`Select ${t.name}`}
                          className="squircle-sm"
                          style={{
                            position: 'relative',
                            width: '38px',
                            height: '38px',
                            border: isActive ? '2px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.22)',
                            padding: 0,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            opacity: isActive ? 1 : 0.45,
                            transform: isActive ? 'scale(1.12)' : 'scale(1)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: isActive ? '0 0 16px rgba(212, 175, 55, 0.7), 0 4px 12px rgba(0,0,0,0.8)' : 'none',
                            backgroundColor: '#0c0c10',
                          }}
                        >
                          <img
                            src={t.image}
                            alt={t.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    color: 'var(--gold-primary)',
                  }}
                >
                  08
                </div>
              </div>
            </div>
          </ScrollCard>

          {/* Right Column: VIP Guest Seal & Rating Sculpture Card */}
          <ScrollCard direction="right" delay={0.2}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
              <ModernTiltCard
                className="squircle-lg"
                maxTilt={9}
                style={{
                  width: '100%',
                  maxWidth: '490px',
                  height: '100%',
                }}
                innerStyle={{
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                {/* Top: Gold Quote Box + 5 Gold Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--squircle-sm, 12px)',
                      backgroundColor: 'rgba(212, 175, 55, 0.12)',
                      border: '1px solid var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-light)',
                      boxShadow: '0 4px 16px rgba(212, 175, 55, 0.25)',
                    }}
                  >
                    <Quote size={22} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      ))}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.62rem',
                        color: 'var(--gold-light)',
                        letterSpacing: '0.14em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      5.0 EXCELLENCE SCORE
                    </span>
                  </div>
                </div>

                {/* Middle Content: Title, Description, and Trust Metrics Grid */}
                <div>
                  <BlurText
                    as="h3"
                    text="The Spark Standard"
                    delay={35}
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '10px',
                      letterSpacing: '0.02em',
                    }}
                  />

                  <p
                    style={{
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.84rem',
                      lineHeight: 1.65,
                      color: 'var(--text-muted)',
                      marginBottom: '22px',
                    }}
                  >
                    Over 50,000 discerning clients across Kerala, Bangalore, and the Middle East trust Spark International for bespoke bridal transformations, dermatological care, and signature couture hair styling.
                  </p>

                  {/* 3 Luxury Trust Metric Badges */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      marginBottom: '22px',
                    }}
                  >
                    {[
                      { val: '4.98 ★', lbl: 'VIP RATING' },
                      { val: '50K+', lbl: 'GUESTS' },
                      { val: '100%', lbl: 'SATISFACTION' },
                    ].map((m, idx) => (
                      <div
                        key={idx}
                        className="squircle-sm"
                        style={{
                          padding: '10px 8px',
                          textAlign: 'center',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(212, 175, 55, 0.18)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.88rem',
                            fontWeight: 800,
                            color: 'var(--gold-primary)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {m.val}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.58rem',
                            color: 'var(--text-dim)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginTop: '2px',
                          }}
                        >
                          {m.lbl}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom verified badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={15} color="var(--gold-light)" />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        color: 'var(--gold-light)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      100% Verified VIP Client Reviews
                    </span>
                  </div>

                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--gold-primary)',
                      boxShadow: '0 0 8px var(--gold-primary)',
                    }}
                  />
                </div>
              </ModernTiltCard>
            </div>
          </ScrollCard>
        </div>
      </div>

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
