'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import { BlurText, ScrollCard, SectionCornerAccent } from '@/components/ui';
import './GallerySection.css';

interface GalleryCardData {
  id: string;
  title: string;
  category: string;
  image: string;
  depthTier: 'foreground' | 'middle' | 'background';
  baseZ: number; // base translateZ in px
  rect: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  zIndex: number;
  microOverlay?: {
    lines: string[];
  };
}

const GALLERY_CARDS: GalleryCardData[] = [
  // 1. Signature Brunette Hairstyle (Large Left Portrait)
  {
    id: 'card-brunette',
    title: 'Signature Brunette Waves & Texture',
    category: 'Hair Couture',
    image: '/images/gallery/signature-brunette.webp',
    depthTier: 'foreground',
    baseZ: 28,
    rect: { left: '3.5%', top: '8.5%', width: '25.5%', height: '53.5%' },
    zIndex: 10,
    microOverlay: {
      lines: ['HAIR', 'BEAUTY', 'CONFIDENCE'],
    },
  },
  // 2. Bridal Updo Profile (Upper Center-Left)
  {
    id: 'card-updo',
    title: 'Haute Parisian Chignon Profile',
    category: 'Haute Styling',
    image: '/images/gallery/bridal-updo-profile.webp',
    depthTier: 'middle',
    baseZ: 10,
    rect: { left: '30.2%', top: '2.8%', width: '24.8%', height: '28.6%' },
    zIndex: 5,
  },
  // 3. Dewy Skin Radiance (Center Close-up)
  {
    id: 'card-skin',
    title: 'Cellular Liquid Gold Dermal Radiance',
    category: 'Aesthetic Glow',
    image: '/images/gallery/dewy-skin-radiance.webp',
    depthTier: 'foreground',
    baseZ: 25,
    rect: { left: '29.8%', top: '32.5%', width: '25.5%', height: '31.5%' },
    zIndex: 9,
  },
  // 4. Precision Shears Cutting (Upper Center-Right)
  {
    id: 'card-shears',
    title: 'Master Japanese 440C Shears Slide-Cutting',
    category: 'Artisanal Cutting',
    image: '/images/gallery/precision-shears-cutting.webp',
    depthTier: 'background',
    baseZ: -14,
    rect: { left: '56.4%', top: '8.2%', width: '17.5%', height: '30.2%' },
    zIndex: 3,
  },
  // 5. Regal Bridal Couture (Upper Right Portrait)
  {
    id: 'card-bridal',
    title: 'Royal Heritage Bridal Adornment',
    category: 'Royal Bridal',
    image: '/images/gallery/regal-bridal-couture.webp',
    depthTier: 'middle',
    baseZ: 14,
    rect: { left: '74.8%', top: '11.5%', width: '23.4%', height: '36.2%' },
    zIndex: 6,
  },
  // 6. Cellular Facial Mask (Lower Left)
  {
    id: 'card-mask',
    title: 'Cryo-Infused Marine Collagen Treatment',
    category: 'Thermal Spa',
    image: '/images/gallery/cellular-facial-mask.webp',
    depthTier: 'background',
    baseZ: -8,
    rect: { left: '6.8%', top: '63.2%', width: '21.2%', height: '31.0%' },
    zIndex: 4,
  },
  // 7. Glamour Makeup Portrait (Lower Center)
  {
    id: 'card-glamour',
    title: 'Couture Red-Carpet Evening Glamour',
    category: 'Luxury Makeup',
    image: '/images/gallery/glamour-makeup-portrait.webp',
    depthTier: 'foreground',
    baseZ: 20,
    rect: { left: '28.2%', top: '65.0%', width: '23.0%', height: '31.4%' },
    zIndex: 8,
  },
  // 8. Luxury Marble Manicure (Lower Center-Right)
  {
    id: 'card-nails',
    title: 'Architectural Obsidian Manicure',
    category: 'Nail Artistry',
    image: '/images/gallery/luxury-marble-manicure.webp',
    depthTier: 'middle',
    baseZ: 6,
    rect: { left: '52.5%', top: '58.0%', width: '18.8%', height: '35.8%' },
    zIndex: 5,
    microOverlay: {
      lines: ['DETAILS', 'MAKE MAGIC'],
    },
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeLightboxCard, setActiveLightboxCard] = useState<GalleryCardData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Parallax physics coordinates & scroll-reveal intro
  const targetCoord = useRef({ x: 0, y: 0 });
  const currentCoord = useRef({ x: 0, y: 0 });
  const introProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // Directional scroll entrance mapping per card location
  const getCardDirection = (cardId: string): { introX: number; introY: number } => {
    switch (cardId) {
      case 'card-brunette':
        return { introX: -90, introY: 0 }; // Left
      case 'card-mask':
        return { introX: -70, introY: 50 }; // Left bottom
      case 'card-updo':
        return { introX: 0, introY: -50 }; // Top
      case 'card-skin':
        return { introX: 0, introY: 65 }; // Bottom
      case 'card-glamour':
        return { introX: -20, introY: 70 }; // Bottom
      case 'card-shears':
        return { introX: 50, introY: -40 }; // Right top
      case 'card-bridal':
        return { introX: 90, introY: 0 }; // Right
      case 'card-nails':
        return { introX: 60, introY: 60 }; // Right bottom
      default:
        return { introX: 0, introY: 50 };
    }
  };

  // Set card ref helper
  const registerCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current.set(id, el);
    } else {
      cardsRef.current.delete(id);
    }
  }, []);

  // IntersectionObserver to pause parallax when offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        } else {
          // Reset on exit so both forward and reverse scroll always play entrance animations
          setHasEntered(false);
          introProgress.current = 0;
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mouse Move tracking over stage
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Disable parallax on mobile
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    targetCoord.current.x = Math.max(-1, Math.min(1, nx));
    targetCoord.current.y = Math.max(-1, Math.min(1, ny));
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetCoord.current.x = 0;
    targetCoord.current.y = 0;
  }, []);

  // Smooth RAF Animation Loop with scroll-in entrance transitions
  useEffect(() => {
    if (!isVisible) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    let running = true;
    const lerpFactor = 0.075; // Silky inertia smoothing

    const tick = () => {
      if (!running) return;

      // Smoothly advance entrance progress when scrolled into view
      if (hasEntered && introProgress.current < 1) {
        introProgress.current = Math.min(1, introProgress.current + 0.022);
      }
      // Cubic easing for luxury smooth entrance
      const easeT = 1 - Math.pow(1 - introProgress.current, 3);

      // Interpolate coordinates
      currentCoord.current.x += (targetCoord.current.x - currentCoord.current.x) * lerpFactor;
      currentCoord.current.y += (targetCoord.current.y - currentCoord.current.y) * lerpFactor;

      const cx = currentCoord.current.x;
      const cy = currentCoord.current.y;

      // Apply 3D physics per depth tier + directional entrance offset
      cardsRef.current.forEach((el, id) => {
        const cardData = GALLERY_CARDS.find((c) => c.id === id);
        if (!cardData || !el) return;

        const isHovered = hoveredCardId === id;

        // Depth multipliers
        let multiplierX = 14;
        let multiplierY = 12;
        let rotMultiplier = 2.0;

        if (cardData.depthTier === 'foreground') {
          multiplierX = 22;
          multiplierY = 18;
          rotMultiplier = 2.8;
        } else if (cardData.depthTier === 'background') {
          multiplierX = 8;
          multiplierY = 7;
          rotMultiplier = 1.2;
        }

        const dx = cx * multiplierX;
        const dy = cy * multiplierY;
        const rotX = -cy * rotMultiplier;
        const rotY = cx * rotMultiplier;
        const z = cardData.baseZ + (isHovered ? 40 : 0);
        const scale = isHovered ? 1.03 : 1.0;

        // Directional scroll entrance offsets (glide from left/right/bottom)
        const { introX, introY } = getCardDirection(cardData.id);
        const curIntroX = introX * (1 - easeT);
        const curIntroY = introY * (1 - easeT);

        el.style.transform = `translate3d(${(dx + curIntroX).toFixed(2)}px, ${(dy + curIntroY).toFixed(2)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${(scale * (0.94 + 0.06 * easeT)).toFixed(3)})`;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, hasEntered, hoveredCardId]);

  return (
    <section id="gallery" ref={sectionRef} className="gallery-section-root">
      <div
        className="luxury-container"
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {/* Section Eyebrow Header */}
        <div
          style={{
            marginBottom: 'clamp(10px, 1.8vh, 22px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
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
            01 — SIGNATURE LOOKS
          </span>
        </div>

        {/* DESKTOP & TABLET: ASYMMETRIC 3D COLLAGE */}
        <div className="gallery-stage-container">
          <div
            ref={stageRef}
            className="gallery-stage-canvas"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 8 Asymmetric Independent Editorial Cards */}
            {GALLERY_CARDS.map((card, index) => {
              const isHovered = hoveredCardId === card.id;

              return (
                <div
                  key={card.id}
                  ref={(el) => registerCardRef(card.id, el)}
                  className="editorial-gallery-card squircle-lg"
                  style={{
                    left: card.rect.left,
                    top: card.rect.top,
                    width: card.rect.width,
                    height: card.rect.height,
                    zIndex: card.zIndex,
                    opacity: hasEntered ? 1 : 0,
                    transition: hasEntered
                      ? `opacity 0.7s ease ${index * 0.06}s, border-color 0.4s ease, box-shadow 0.4s ease`
                      : 'none',
                  }}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => setActiveLightboxCard(card)}
                >
                  <div className="editorial-card-inner">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="editorial-card-img"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Subtle Cinematic Vignette */}
                    <div className="editorial-card-vignette" />

                    {/* Micro-Typography Overlays (Card 1 & Card 8) */}
                    {card.microOverlay && (
                      <div className="card-micro-overlay">
                        {card.microOverlay.lines.map((line) => (
                          <span key={line} className="card-micro-text">
                            {line}
                          </span>
                        ))}
                        <div className="card-micro-line" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Right Editorial Typography & CTA Panel matching reference image */}
            <ScrollCard direction="right" delay={0.15}>
              <div className="editorial-text-panel">
                <BlurText
                  as="h2"
                  text={'BEAUTY\nLIVES\nHERE.'}
                  className="editorial-headline"
                  delay={75}
                  direction="top"
                />

                <div className="editorial-sub-categories">
                  <span>HAIR</span>
                  <span className="editorial-sub-dot">•</span>
                  <span>MAKEUP</span>
                  <span className="editorial-sub-dot">•</span>
                  <span>NAILS</span>
                  <span className="editorial-sub-dot">•</span>
                  <span>SKIN</span>
                </div>

                <button
                  className="editorial-cta-btn squircle-sm"
                  onClick={() => {
                    // Open first signature look in lightbox or trigger concierge
                    setActiveLightboxCard(GALLERY_CARDS[0]);
                  }}
                >
                  <span>EXPLORE OUR GALLERY</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </ScrollCard>
          </div>
        </div>

        {/* MOBILE LAYOUT: CURATED EDITORIAL STACK (< 768px) */}
        <div className="gallery-mobile-layout">
          <div className="gallery-mobile-header">
            <BlurText
              as="h2"
              text={'BEAUTY\nLIVES HERE.'}
              delay={75}
              direction="top"
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '2.4rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            />
            <div className="editorial-sub-categories" style={{ justifyContent: 'center' }}>
              <span>HAIR</span>
              <span className="editorial-sub-dot">•</span>
              <span>MAKEUP</span>
              <span className="editorial-sub-dot">•</span>
              <span>NAILS</span>
              <span className="editorial-sub-dot">•</span>
              <span>SKIN</span>
            </div>
          </div>

          {/* Featured Primary Card */}
          <ScrollCard direction="left" delay={0.1}>
            <div
              className="gallery-mobile-card-featured squircle-lg"
              onClick={() => setActiveLightboxCard(GALLERY_CARDS[0])}
            >
              <img
                src={GALLERY_CARDS[0].image}
                alt={GALLERY_CARDS[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="card-micro-overlay">
                <span className="card-micro-text">HAIR</span>
                <span className="card-micro-text">BEAUTY</span>
                <span className="card-micro-text">CONFIDENCE</span>
                <div className="card-micro-line" />
              </div>
            </div>
          </ScrollCard>

          {/* 2-Column Supporting Curated Cards */}
          <div className="gallery-mobile-card-grid">
            <ScrollCard direction="left" delay={0.2} style={{ width: '100%' }}>
              <div
                className="gallery-mobile-card squircle-lg"
                onClick={() => setActiveLightboxCard(GALLERY_CARDS[4])}
              >
                <img
                  src={GALLERY_CARDS[4].image}
                  alt={GALLERY_CARDS[4].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollCard>
            <ScrollCard direction="right" delay={0.3} style={{ width: '100%' }}>
              <div
                className="gallery-mobile-card squircle-lg"
                onClick={() => setActiveLightboxCard(GALLERY_CARDS[2])}
              >
                <img
                  src={GALLERY_CARDS[2].image}
                  alt={GALLERY_CARDS[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollCard>
          </div>

          {/* Manicure Details Card */}
          <ScrollCard direction="bottom" delay={0.2}>
            <div
              className="gallery-mobile-card-featured squircle-lg"
              style={{ aspectRatio: '16 / 9' }}
              onClick={() => setActiveLightboxCard(GALLERY_CARDS[7])}
            >
              <img
                src={GALLERY_CARDS[7].image}
                alt={GALLERY_CARDS[7].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="card-micro-overlay">
                <span className="card-micro-text">DETAILS</span>
                <span className="card-micro-text">MAKE MAGIC</span>
                <div className="card-micro-line" />
              </div>
            </div>
          </ScrollCard>

          <div className="gallery-mobile-footer">
            <button
              className="editorial-cta-btn squircle-sm"
              onClick={() => setActiveLightboxCard(GALLERY_CARDS[0])}
            >
              <span>EXPLORE OUR GALLERY</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* LUXURY LIGHTBOX MODAL */}
      {activeLightboxCard && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setActiveLightboxCard(null)}
        >
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxCard(null)}
              aria-label="Close Lightbox"
              style={{
                position: 'absolute',
                top: '-48px',
                right: '0',
                background: 'rgba(12, 10, 18, 0.65)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activeLightboxCard.image}
              alt={activeLightboxCard.title}
              className="gallery-lightbox-img squircle-lg"
            />

            <div
              style={{
                marginTop: '18px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {activeLightboxCard.category}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                }}
              >
                {activeLightboxCard.title}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Bottom-Right Corner Accent */}
      <SectionCornerAccent />
    </section>
  );
}
