'use client';

import React, { useState } from 'react';
import { Play, MapPin, Clock, X, Sparkles, Layers, Compass, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlurText, ScrollCard, ModernTiltCard, SectionCornerAccent } from '@/components/ui';

export default function VirtualTour() {
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [activeZone, setActiveZone] = useState<number>(0);

  const zones = [
    {
      name: 'Master Hair Arena',
      tagline: '14 Ergonomic Stations & Italian Hydraulic Basins',
      desc: 'Engineered with daylight-balanced CRI 98+ illumination to ensure color accuracy down to the half-tone.',
      image: '/images/experience/exp-hair.jpg',
    },
    {
      name: 'Private Bridal Sanctuary',
      tagline: 'Soundproof Royal Suite with Tri-Fold Mirrors',
      desc: 'A dedicated private dressing haven for brides and wedding parties, featuring private wash areas and luxury lounge seating.',
      image: '/images/experience/exp-bridal.jpg',
    },
    {
      name: 'Aroma Spa Chambers',
      tagline: 'Nero Marquina Volcanic Stone Beds & Steam Suites',
      desc: 'Tranquil sound-dampened treatment rooms with custom acoustic therapy, aroma diffusers, and warm massage stone tables.',
      image: '/images/about/massage-suite.jpg',
    },
    {
      name: 'Golden Marquina Lounge',
      tagline: 'Concierge Bar & Bespoke Consultation Salon',
      desc: 'Relax before your appointment with freshly pressed juices, gourmet organic teas, and personal consultation with our directors.',
      image: '/images/about/spa-lounge.jpg',
    },
  ];

  return (
    <section
      id="tour"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(70px, 7.5vw, 92px) 0 36px',
        backgroundColor: '#040406',
        backgroundImage: "url('/images/sections/bg-2.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Main Content Area */}
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2, margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.12fr) minmax(320px, 1.18fr)',
            gap: '36px 56px',
            alignItems: 'center',
            marginBottom: '40px',
          }}
          className="virtual-tour-grid"
        >
          {/* Left: Monumental Headline & Play Trigger */}
          <ScrollCard direction="left" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                <BlurText as="span" text="THE SALON ARCHITECTURE" delay={25} />
              </div>

              <BlurText
                as="h2"
                text={'STEP INTO\nSPARK.'}
                highlightWords={['SPARK']}
                delay={100}
                direction="top"
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '14px',
                }}
              />

              <BlurText
                as="p"
                text="CALICUT’S LANDMARK BEAUTY MALL & LUXURY ATELIER."
                delay={20}
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-light)',
                  textTransform: 'uppercase',
                  marginBottom: '26px',
                }}
              />

              {/* Architectural Luxury Specs Grid to balance height */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginBottom: '26px',
                }}
              >
                {[
                  { value: '15,000', unit: 'SQ.FT', label: 'Flagship Atelier', icon: Layers },
                  { value: '4', unit: 'LEVELS', label: 'Bespoke Suites', icon: Compass },
                  { value: '360°', unit: '4K VR', label: 'Immersive Tour', icon: Eye },
                ].map((spec, idx) => {
                  const IconComp = spec.icon;
                  return (
                    <div
                      key={idx}
                      className="squircle-sm"
                      style={{
                        padding: '11px 12px',
                        background: 'linear-gradient(145deg, rgba(16, 15, 24, 0.75) 0%, rgba(8, 8, 12, 0.88) 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-serif-display)',
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: '#ffffff',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {spec.value}{' '}
                          <span style={{ fontSize: '0.6rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-sans-display)' }}>
                            {spec.unit}
                          </span>
                        </span>
                        <IconComp size={13} color="#d4af37" style={{ opacity: 0.85 }} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.64rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {spec.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action row with Liquid Gold Play Trigger and Live Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsPlayingTour(true)}
                  className="spark-tour-btn squircle-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 22px 10px 12px',
                    border: '1.5px solid var(--gold-primary)',
                  }}
                >
                  <div
                    className="tour-play-circle"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--squircle-sm, 10px)',
                      backgroundColor: 'var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Play size={17} fill="#000000" style={{ marginLeft: '2px' }} />
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                      }}
                    >
                      START 3D TOUR
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans-display)',
                        fontSize: '0.66rem',
                        color: 'var(--gold-light)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Cinematic 360° Walkthrough
                    </div>
                  </div>
                </button>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 14px',
                    borderRadius: 'var(--squircle-capsule, 12px)',
                    background: 'rgba(212, 175, 55, 0.06)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: 'var(--gold-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--gold-primary)',
                      boxShadow: '0 0 8px var(--gold-primary)',
                    }}
                  />
                  <span>Zone 0{activeZone + 1} Selected</span>
                </div>
              </div>
            </div>
          </ScrollCard>

          {/* Right: Interactive Floorplan Zones Showcase */}
          <ScrollCard direction="right" delay={0.2}>
            <ModernTiltCard
              className="squircle-lg"
              maxTilt={8}
              innerStyle={{
                padding: '28px 24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                  }}
                >
                  EXPLORE ATELIER ZONES
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                  }}
                >
                  Interactive Preview
                </span>
              </div>

              {/* Zones Tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {zones.map((zone, idx) => {
                  const isActive = activeZone === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveZone(idx)}
                      className="squircle-sm"
                      style={{
                        padding: '10px 15px',
                        background: isActive
                          ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.04) 100%)'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: isActive ? '1px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.12)',
                        boxShadow: isActive ? 'inset 3px 0 0 var(--gold-primary), 0 4px 16px rgba(0, 0, 0, 0.4)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            color: isActive ? '#ffffff' : 'var(--text-muted)',
                          }}
                        >
                          {zone.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans-display)',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '0.15em',
                            color: isActive ? 'var(--gold-light)' : 'var(--text-dim)',
                          }}
                        >
                          0{idx + 1}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.71rem',
                          color: isActive ? 'var(--gold-light)' : 'var(--text-dim)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {zone.tagline}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Zone Visual Showcase Card with Buttery Smooth Crossfade */}
              <div
                className="squircle-sm"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '148px',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZone}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <img
                      src={zones[activeZone].image}
                      alt={zones[activeZone].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(6, 6, 10, 0.25) 0%, rgba(6, 6, 10, 0.7) 45%, rgba(4, 4, 6, 0.95) 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Zone Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '12px',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    background: 'rgba(4, 4, 8, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    borderRadius: 'var(--squircle-capsule, 12px)',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: 'var(--gold-primary)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Sparkles size={11} color="#d4af37" />
                  <span>{zones[activeZone].name}</span>
                </div>

                {/* Description text */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.78rem',
                    lineHeight: 1.5,
                    color: 'rgba(240, 240, 245, 0.92)',
                  }}
                >
                  {zones[activeZone].desc}
                </div>
              </div>
            </ModernTiltCard>
          </ScrollCard>
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <ScrollCard direction="bottom" delay={0.1}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              borderTop: '1px solid rgba(212, 175, 55, 0.22)',
              paddingTop: '18px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans-display)',
              fontSize: '0.76rem',
              letterSpacing: '0.14em',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--gold-primary)', fontSize: '0.85rem' }}>
              07
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#e5c158" />
                <span>Mavoor Rd, Kottooli, Kozhikode, Kerala 673016</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} color="#e5c158" />
                <span>Mon - Sun | 09:00 AM - 09:00 PM</span>
              </div>
            </div>
          </div>
        </ScrollCard>
      </div>

      {/* Virtual Tour Video Modal */}
      {isPlayingTour && (
        <div
          data-lenis-prevent
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setIsPlayingTour(false)}
        >
          <div
            data-lenis-prevent
            className="squircle-lg"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              aspectRatio: '16/9',
              backgroundColor: '#0c0c12',
              borderRadius: 'var(--squircle-xl, 26px)',
              border: '1px solid var(--gold-primary)',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0,0,0,0.9), var(--gold-glow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlayingTour(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(12, 10, 18, 0.65)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid var(--gold-primary)',
                color: '#ffffff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <video
              autoPlay
              controls
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
