'use client';

import React from 'react';
import { Scissors, Sparkles, Crown, Gem, ArrowRight } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow';
import { BlurText, ScrollCard, SectionCornerAccent } from '@/components/ui';

export default function SparkExperience() {
  const cards = [
    {
      id: 'hair',
      num: '01',
      title: 'HAIR',
      subtitle: 'Haute Sculpting & Balayage',
      desc: 'Precision cuts, personalized couture shades, and bespoke scalp and strand revitalizations.',
      icon: <Scissors size={26} color="var(--gold-light)" />,
      image: '/images/experience/exp-hair.jpg',
    },
    {
      id: 'skin',
      num: '02',
      title: 'SKIN',
      subtitle: 'Clinical & Luminous Rituals',
      desc: 'HydraFacial MD, medical-grade skin peel rejuvenations, and radiant glow protocols.',
      icon: <Sparkles size={26} color="var(--gold-light)" />,
      image: '/images/experience/exp-skin.jpg',
    },
    {
      id: 'style',
      num: '03',
      title: 'STYLE',
      subtitle: 'Bridal & Red-Carpet Glamour',
      desc: 'Couture drapery, destination bridal styling, bespoke royal makeup, and VIP suites.',
      icon: <Crown size={26} color="var(--gold-light)" />,
      image: '/images/experience/exp-bridal.jpg',
    },
    {
      id: 'signature',
      num: '04',
      title: 'SIGNATURE',
      subtitle: 'Holistic Spa & Body Sanctuary',
      desc: 'Deep-tissue Swedish therapies, detox mineral scrubs, and tranquil head-spa journeys.',
      icon: <Gem size={26} color="var(--gold-light)" />,
      image: '/images/experience/exp-spa.jpg',
    },
  ];

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '95px 0 75px',
        backgroundColor: '#040406',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header Grid: Title on Left, Tagline on Right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '44px',
          }}
        >
          <BlurText
            as="h2"
            text={'THE\nSPARK\nEXPERIENCE'}
            highlightWords={['SPARK']}
            delay={90}
            direction="top"
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          />

          <BlurText
            as="div"
            text={"MORE THAN A SALON.\nIT'S A FEELING."}
            delay={35}
            style={{
              fontFamily: 'var(--font-sans-display)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              textAlign: 'right',
              marginBottom: '6px',
            }}
          />
        </div>

        {/* 4 Narrow Tall Rectangular Cards with Thin Gold Borders */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
          className="experience-cards-grid"
        >
          {cards.map((card, idx) => {
            const direction = idx === 0 ? 'left' : idx === cards.length - 1 ? 'right' : 'bottom';
            const delay = idx * 0.08;
            return (
              <ScrollCard key={card.id} direction={direction} delay={delay}>
                <BorderGlow
                  className="squircle"
                  innerClassName="squircle"
                  edgeSensitivity={32}
                  glowColor="43 75 65"
                  backgroundColor="rgba(14, 13, 20, 0.95)"
                  borderRadius={22}
                  glowRadius={40}
                  glowIntensity={1.2}
                  coneSpread={26}
                  colors={['#d4af37', '#f3e7c4', '#c59b27']}
                  style={{
                    minHeight: '450px',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  innerStyle={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '450px',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    const img = e.currentTarget.querySelector('.experience-card-img') as HTMLElement | null;
                    if (img) img.style.transform = 'scale(1.08)';
                    const arrow = e.currentTarget.querySelector('.card-action-arrow') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    const img = e.currentTarget.querySelector('.experience-card-img') as HTMLElement | null;
                    if (img) img.style.transform = 'scale(1)';
                    const arrow = e.currentTarget.querySelector('.card-action-arrow') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                  onClick={() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {/* Full-Bleed Card Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0,
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="experience-card-img"
                  />

                  {/* Luxury Gradient Scrim Overlay for contrast and readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(8, 7, 12, 0.4) 0%, rgba(8, 7, 12, 0.68) 40%, rgba(6, 6, 9, 0.92) 75%, rgba(4, 4, 6, 0.98) 100%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Card Foreground Content */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      minHeight: '450px',
                    }}
                  >
                    {/* Top: Icon and Number */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(8, 7, 12, 0.65)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                        }}
                      >
                        {card.icon}
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.2em',
                          color: 'var(--gold-primary)',
                          fontWeight: 800,
                          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        }}
                      >
                        {card.num}
                      </span>
                    </div>

                    {/* Bottom: Info & Action */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          color: 'var(--gold-light)',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}
                      >
                        {card.subtitle}
                      </div>

                      <BlurText
                        as="h3"
                        text={card.title}
                        delay={40}
                        style={{
                          fontFamily: 'var(--font-serif-display)',
                          fontSize: '1.55rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          color: '#ffffff',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                        }}
                      />

                      <BlurText
                        as="p"
                        text={card.desc}
                        delay={20}
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.78rem',
                          lineHeight: 1.55,
                          color: 'rgba(235, 235, 240, 0.82)',
                          marginBottom: '16px',
                        }}
                      />

                      {/* Bottom: Action link */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.18em',
                          color: 'var(--gold-primary)',
                          textTransform: 'uppercase',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <span>EXPLORE SERVICES</span>
                        <ArrowRight
                          size={13}
                          className="card-action-arrow"
                          style={{ transition: 'transform 0.3s ease' }}
                        />
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </ScrollCard>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <ScrollCard direction="bottom" delay={0.1}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-sans-display)',
                fontSize: '0.78rem',
                letterSpacing: '0.3em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              DISCOVER A MORE CONFIDENT YOU
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary-gold squircle-sm"
              style={{ padding: '16px 36px', fontSize: '0.75rem' }}
            >
              <span>VIEW ALL SERVICES</span>
            </button>
          </div>
        </ScrollCard>
      </div>

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
