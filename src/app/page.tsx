'use client';

import React, { useState } from 'react';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/navigation/Navbar';
import { SparkSalonHero } from '@/components/hero';
import BrandStatement from '@/components/sections/BrandStatement';
import SparkExperience from '@/components/sections/SparkExperience';
import ServicesExplorer from '@/components/sections/ServicesExplorer';
import GallerySection from '@/components/sections/GallerySection';
import WhySpark from '@/components/sections/WhySpark';
import VirtualTour from '@/components/sections/VirtualTour';
import Testimonials from '@/components/sections/Testimonials';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/layout/Footer';
import BookingConcierge from '@/components/sections/BookingConcierge';
import { X } from 'lucide-react';

let hasShownPreloader = false;

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(() => hasShownPreloader);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [initialStudio, setInitialStudio] = useState('hair');

  const handlePreloaderComplete = () => {
    hasShownPreloader = true;
    setPreloaderDone(true);
  };

  const handleOpenBooking = (studio = 'hair') => {
    setInitialStudio(studio);
    setBookingModalOpen(true);
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#040406' }}>
      {/* 01 — 3D CINEMATIC INTRO PRELOADER (matching loading.png) */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* ULTRA LUXURY FLOATING NAVBAR MATCHING EXACT REFERENCE IMAGE */}
      <Navbar onOpenBooking={() => handleOpenBooking('hair')} />

      {/* 02 — CINEMATIC SCROLL-DRIVEN FRAME-SEQUENCE HERO */}
      <SparkSalonHero
        onOpenBooking={() => handleOpenBooking('hair')}
        onExploreServices={() => {
          const el = document.getElementById('services');
          if (!el) return;
          if (typeof window !== 'undefined' && (window as any).lenis) {
            (window as any).lenis.scrollTo(el, { duration: 1.2, offset: 0 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 03 — BRAND STATEMENT (matching scroll effect.png) */}
      <BrandStatement />

      {/* 04 — THE SPARK EXPERIENCE (matching 3d cards.png) */}
      <SparkExperience />

      {/* 05 — SERVICES (matching services.png) */}
      <ServicesExplorer onOpenBooking={(studio) => handleOpenBooking(studio)} />

      {/* 06 — SIGNATURE LOOKS GALLERY (matching gallery.png) */}
      <GallerySection />

      {/* 09 — WHY SPARK (matching why spark.png) */}
      <WhySpark />

      {/* 10 — THE SALON / VIRTUAL TOUR (matching salon virtual tour.png) */}
      <VirtualTour />

      {/* 11 — TESTIMONIALS (matching testimonials.png) */}
      <Testimonials />

      {/* 12 — FINAL CTA (matching cta.png) */}
      <FinalCta />

      {/* 13 — FOOTER + SCROLL EXPERIENCE PREVIEW (matching footer.png + scroll experience picture dem.png) */}
      <Footer onOpenBooking={() => handleOpenBooking('hair')} />

      {/* VIP LUXURY BOOKING MODAL */}
      {bookingModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(2, 2, 4, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            data-lenis-prevent
            className="squircle-lg"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: '#07070a',
              border: '1px solid var(--gold-primary)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.95), var(--gold-glow)',
              padding: '36px 30px',
            }}
          >
            <button
              onClick={() => setBookingModalOpen(false)}
              aria-label="Close Booking Modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>

            <BookingConcierge initialStudio={initialStudio} />
          </div>
        </div>
      )}
    </main>
  );
}
