'use client';

import React from 'react';
import Image from 'next/image';
import { BlurText, ScrollCard, SectionCornerAccent } from '@/components/ui';

export default function WhySpark() {
  const pillars = [
    {
      id: 'precision',
      title: 'PRECISION.',
      subtitle: 'Because every detail matters.',
      image: '/images/why-spark/diamond.webp',
      bgImage: '/images/gallery/precision-shears-cutting.webp',
      tag: 'Couture Craft',
    },
    {
      id: 'expertise',
      title: 'EXPERTISE.',
      subtitle: 'Driven by passion. Backed by experience.',
      image: '/images/why-spark/lotus.webp',
      bgImage: '/images/experience/exp-hair.jpg',
      tag: 'Master Artists',
    },
    {
      id: 'protection',
      title: 'PROTECTION.',
      subtitle: 'Care that goes beyond beauty.',
      image: '/images/why-spark/wings.webp',
      bgImage: '/images/experience/exp-skin.jpg',
      tag: 'Clinical Care',
    },
    {
      id: 'perfection',
      title: 'PERFECTION.',
      subtitle: "A signature you'll always love.",
      image: '/images/why-spark/infinity.webp',
      bgImage: '/images/gallery/signature-brunette.webp',
      tag: 'Bespoke Finish',
    },
  ];

  return (
    <section
      id="why-spark"
      style={{
        position: 'relative',
        padding: 'clamp(70px, 7.5vw, 100px) 0',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2, margin: '0 auto', width: '100%' }}>
        {/* Section Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            color: '#9e781e',
            textTransform: 'uppercase',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ width: '24px', height: '1.5px', backgroundColor: '#9e781e' }} />
          <BlurText as="span" text="THE ATELIER PHILOSOPHY" delay={25} />
        </div>

        {/* Monumental Headline */}
        <BlurText
          as="h2"
          text={'WHY\nSPARK?'}
          highlightWords={['SPARK']}
          highlightStyle={{ color: '#9e781e' }}
          delay={120}
          direction="top"
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#0d0c12',
            marginBottom: '44px',
          }}
        />

        {/* 4 Gold Metallic Pillar Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '48px',
          }}
          className="why-spark-cards"
        >
          {pillars.map((p, idx) => {
            const direction = idx === 0 ? 'left' : idx === pillars.length - 1 ? 'right' : 'bottom';
            const delay = idx * 0.08;
            return (
              <ScrollCard key={p.id} direction={direction} delay={delay}>
                <div className="why-spark-card squircle-lg">
                  {/* Full-Bleed Atmospheric Background Image */}
                  <img
                    src={p.bgImage}
                    alt={p.title}
                    className="why-spark-bg-img"
                  />

                  {/* Cinematic Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.72) 45%, #000000 100%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Ambient Gold Spotlight Halo */}
                  <div className="why-spark-halo" />

                  {/* Top Row: Pillar Number & Tag */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        color: 'var(--gold-primary)',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '3px 8px',
                        borderRadius: 'var(--squircle-capsule, 8px)',
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: 'var(--gold-light)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  {/* 3D Gold Emblem Sculpture with Radiant Depth */}
                  <div className="why-spark-icon-wrap">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={90}
                      height={90}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  {/* Bottom Typography & Reveal Line */}
                  <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.98rem',
                        fontWeight: 800,
                        letterSpacing: '0.22em',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        textAlign: 'center',
                      }}
                    >
                      {p.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.8rem',
                        color: 'rgba(235, 235, 240, 0.78)',
                        lineHeight: 1.55,
                        margin: '0 auto 16px',
                        maxWidth: '220px',
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {p.subtitle}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span className="why-spark-accent-line" />
                    </div>
                  </div>
                </div>
              </ScrollCard>
            );
          })}
        </div>

        {/* Bottom Information Bar */}
        <ScrollCard direction="bottom" delay={0.1}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              paddingTop: '18px',
              color: '#555162',
              fontFamily: 'var(--font-sans-display)',
              fontSize: '0.76rem',
              letterSpacing: '0.14em',
            }}
          >
            <div style={{ fontWeight: 800, color: '#9e781e', fontSize: '0.85rem' }}>
              06
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span
                style={{
                  color: '#9e781e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                Uncompromising Standards • Calicut Flagship Atelier
              </span>
            </div>
          </div>
        </ScrollCard>
      </div>

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
