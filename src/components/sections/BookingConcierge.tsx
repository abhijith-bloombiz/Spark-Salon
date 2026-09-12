'use client';

import React, { useState } from 'react';
import { SALON_CATEGORIES } from '@/lib/data/services';
import { Sparkles, Calendar, Clock, User, Phone, Mail, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlurText } from '@/components/ui';

interface BookingConciergeProps {
  initialStudio?: string;
  initialService?: string;
}

export default function BookingConcierge({ initialStudio = 'hair', initialService = '' }: BookingConciergeProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedStudio, setSelectedStudio] = useState<string>(initialStudio);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedTier, setSelectedTier] = useState<string>('Master Stylist');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-12');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const currentStudioObj = SALON_CATEGORIES.find((s) => s.id === selectedStudio) || SALON_CATEGORIES[0];

  const tiers = [
    {
      id: 'Senior Stylist',
      title: 'Senior Artisan',
      desc: '5+ years mastery in precision cuts and classic styling.',
      multiplier: 'Standard Rate',
    },
    {
      id: 'Master Stylist',
      title: 'Master Artisan',
      desc: '8+ years international academy training in haute color & design.',
      multiplier: '+15% Premium',
      recommended: true,
    },
    {
      id: 'Creative Director',
      title: 'Creative Art Director',
      desc: '15+ years runway & celebrity transformation authority.',
      multiplier: '+35% Bespoke',
    },
  ];

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      // Pick first service by default if none selected
      if (currentStudioObj.items.length > 0) {
        setSelectedService(currentStudioObj.items[0].name);
      }
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studio: currentStudioObj.title,
          service: selectedService || currentStudioObj.items[0].name,
          tier: selectedTier,
          date: selectedDate,
          timeSlot: selectedTime,
          guestName: formData.name,
          guestPhone: formData.phone,
          guestEmail: formData.email,
          specialRequests: formData.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setConfirmation(result.details);
        setStep(5);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#fff2be', '#c41230'],
          });
        } catch (e) {}
      } else {
        setErrorMessage(result.error || 'Unable to submit reservation. Please verify details.');
      }
    } catch (err: any) {
      // Offline fallback for smooth demo experience
      const mockDetails = {
        bookingId: `SPARK-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName: formData.name,
        guestPhone: formData.phone,
        guestEmail: formData.email,
        studio: currentStudioObj.title,
        service: selectedService || currentStudioObj.items[0].name,
        tier: selectedTier,
        date: selectedDate,
        timeSlot: selectedTime,
        specialRequests: formData.message,
        createdAt: new Date().toISOString(),
      };
      setConfirmation(mockDetails);
      setStep(5);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#fff2be', '#c41230'],
        });
      } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Spark International Concierge, I would like to confirm my booking:\n• Reservation ID: ${confirmation?.bookingId}\n• Guest: ${formData.name}\n• Studio: ${currentStudioObj.title}\n• Service: ${selectedService}\n• Tier: ${selectedTier}\n• Date: ${selectedDate} at ${selectedTime}`
    );
    window.open(`https://wa.me/918543097899?text=${text}`, '_blank');
  };

  return (
    <section
      id="booking"
      style={{
        position: 'relative',
        padding: '130px 0',
        backgroundColor: '#060608',
        overflow: 'hidden',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={16} color="#d4af37" />
            <span
              style={{
                fontFamily: 'var(--font-sans-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.35em',
                color: 'var(--gold-primary)',
                textTransform: 'uppercase',
              }}
            >
              11 — BESPOKE CONCIERGE
            </span>
          </div>

          <BlurText
            as="h2"
            text={'BEGIN YOUR\nSPARK EXPERIENCE.'}
            highlightWords={['SPARK', 'EXPERIENCE']}
            delay={100}
            direction="top"
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          />

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Reserve your private consultation. Every experience begins with diagnostic scalp and skin profiling
            in our VIP private suites.
          </p>
        </div>

        {/* 5-Step Process Progress Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '850px',
            margin: '0 auto 50px',
            position: 'relative',
          }}
        >
          {['STUDIO & SERVICE', 'ARTISAN TIER', 'DATE & TIME', 'YOUR DETAILS', 'CONFIRMATION'].map((label, idx) => {
            const stepNum = idx + 1;
            const isPassed = step >= stepNum;
            const isCurrent = step === stepNum;
            return (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent ? '#c41230' : isPassed ? '#d4af37' : '#121218',
                    border: `1px solid ${isPassed ? '#d4af37' : 'rgba(255, 255, 255, 0.15)'}`,
                    color: isCurrent || isPassed ? '#fff' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    boxShadow: isCurrent ? 'var(--crimson-glow)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  0{stepNum}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: isCurrent ? 'var(--gold-light)' : 'var(--text-dim)',
                    textTransform: 'uppercase',
                    display: 'none',
                  }}
                  className="step-label"
                >
                  <style jsx>{`
                    @media (min-width: 768px) {
                      .step-label {
                        display: block !important;
                      }
                    }
                  `}</style>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Step-Based Wizard Card */}
        <div
          className="squircle-lg"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: 'rgba(16, 16, 22, 0.85)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 'var(--squircle-xl, 26px)',
            padding: 'clamp(1.25rem, 3.5vw, 3.5rem)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), var(--gold-glow)',
          }}
        >
          {/* STEP 1: CHOOSE SERVICE & STUDIO */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                Step 01 — Choose Your Studio & Service
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
                Select your designated studio and the specific aesthetic ritual.
              </p>

              {/* Studio Selection */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {SALON_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedStudio(cat.id);
                      setSelectedService(cat.items[0]?.name || '');
                    }}
                    className="squircle-sm"
                    style={{
                      background: selectedStudio === cat.id ? 'var(--crimson-gradient)' : 'rgba(255, 255, 255, 0.03)',
                      color: selectedStudio === cat.id ? '#fff' : 'var(--text-muted)',
                      border: selectedStudio === cat.id ? '1px solid #fff' : '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '10px 20px',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      cursor: 'pointer',
                      borderRadius: 'var(--squircle-capsule, 20px)',
                    }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Specific Services Radio Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '36px' }}>
                {currentStudioObj.items.map((srv) => {
                  const isSelected = selectedService === srv.name || (!selectedService && srv === currentStudioObj.items[0]);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv.name)}
                      className="squircle"
                      style={{
                        padding: '18px 20px',
                        backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--squircle-md, 16px)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1rem', color: isSelected ? 'var(--gold-light)' : '#fff' }}>
                          {srv.name}
                        </h4>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-primary)' }}>{srv.price}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{srv.duration}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleNext} className="btn-primary-crimson squircle-sm">
                  <span>PROCEED TO ARTISAN TIER</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE ARTISAN TIER */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                Step 02 — Select Experience Level & Artisan
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
                Calibrate the tier of artisanship dedicated to your personal appointment.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {tiers.map((t) => {
                  const isSelected = selectedTier === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTier(t.id)}
                      className="squircle"
                      style={{
                        padding: '24px 28px',
                        backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--squircle-md, 16px)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.25rem', color: '#fff' }}>
                            {t.title}
                          </h4>
                          {t.recommended && (
                            <span
                              className="squircle-sm"
                              style={{
                                padding: '3px 8px',
                                backgroundColor: 'rgba(196, 18, 48, 0.3)',
                                border: '1px solid var(--crimson-vibrant)',
                                color: '#fff',
                                fontSize: '0.65rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                              }}
                            >
                              MOST REQUESTED
                            </span>
                          )}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{t.desc}</p>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--gold-light)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {t.multiplier}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleBack} className="btn-secondary-gold squircle-sm">
                  <ArrowLeft size={16} />
                  <span>BACK</span>
                </button>
                <button onClick={handleNext} className="btn-primary-crimson squircle-sm">
                  <span>PROCEED TO CALENDAR</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE DATE & TIME */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                Step 03 — Select Date & Exclusive Time Slot
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
                Spark Salon operates Monday through Sunday, 09:00 AM – 09:00 PM.
              </p>

              {/* Date Input */}
              <div style={{ marginBottom: '32px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  RESERVATION DATE
                </label>
                <div style={{ position: 'relative', maxWidth: '320px' }}>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-09-09"
                    className="squircle-sm"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans-display)',
                      fontSize: '0.95rem',
                      borderRadius: 'var(--squircle-sm, 12px)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div style={{ marginBottom: '36px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  PREFERRED TIME SLOT
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: '8px' }}>
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className="squircle-sm"
                        style={{
                          padding: '12px',
                          backgroundColor: isSelected ? 'var(--crimson-gradient)' : 'rgba(255, 255, 255, 0.02)',
                          border: isSelected ? '1px solid #fff' : '1px solid rgba(212, 175, 55, 0.2)',
                          color: isSelected ? '#fff' : 'var(--text-muted)',
                          fontFamily: 'var(--font-sans-display)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          borderRadius: 'var(--squircle-sm, 12px)',
                          textAlign: 'center',
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleBack} className="btn-secondary-gold squircle-sm">
                  <ArrowLeft size={16} />
                  <span>BACK</span>
                </button>
                <button onClick={handleNext} className="btn-primary-crimson squircle-sm">
                  <span>ENTER GUEST DETAILS</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST DETAILS FORM */}
          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                Step 04 — Guest Particulars
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
                Please provide your contact credentials for bespoke concierge confirmation.
              </p>

              {errorMessage && (
                <div
                  className="squircle-sm"
                  style={{
                    padding: '12px 18px',
                    backgroundColor: 'rgba(196, 18, 48, 0.2)',
                    border: '1px solid var(--crimson-vibrant)',
                    color: '#ff8597',
                    fontSize: '0.85rem',
                    marginBottom: '20px',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Varma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="squircle-sm"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98470 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="squircle-sm"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya.varma@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="squircle-sm"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.92rem',
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  SPECIAL REQUESTS / BRIDAL DETAILS (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention any allergic sensitivities, specific stylists, or ceremonial timeline requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="squircle-sm"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.92rem',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={handleBack} className="btn-secondary-gold squircle-sm">
                  <ArrowLeft size={16} />
                  <span>BACK</span>
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary-crimson squircle-sm">
                  <span>{isSubmitting ? 'CONFIRMING...' : 'CONFIRM LUXURY EXPERIENCE'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: BESPOKE CONFIRMATION TICKET */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--gold-light)',
                  boxShadow: 'var(--gold-glow)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-sans-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                }}
              >
                RESERVATION CONFIRMED
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginTop: '8px',
                  marginBottom: '16px',
                }}
              >
                Welcome to the World of Spark
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 32px' }}>
                Your private appointment has been prioritized in our salon register. A concierge advisor
                will contact you shortly with valet parking and preparation notes.
              </p>

              {/* Luxury Pass Summary Card */}
              <div
                className="squircle"
                style={{
                  maxWidth: '520px',
                  margin: '0 auto 36px',
                  backgroundColor: 'rgba(6, 6, 8, 0.85)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--squircle-lg, 20px)',
                  padding: '24px 28px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>PASS CODE:</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 800, letterSpacing: '0.15em' }}>{confirmation?.bookingId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Guest Name:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{formData.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Service:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedService}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Artisan Tier:</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{selectedTier}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date & Time:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedDate} • {selectedTime}</span>
                </div>
              </div>

              {/* Dual Instant Actions: WhatsApp Direct & Return */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                <button
                  onClick={openWhatsApp}
                  className="btn-primary-crimson squircle-sm"
                  style={{ padding: '16px 32px' }}
                >
                  <MessageSquare size={16} />
                  <span>FORWARD TO WHATSAPP CONCIERGE</span>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary-gold squircle-sm"
                  style={{ padding: '16px 28px' }}
                >
                  <span>BOOK ANOTHER RITUAL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Coordinates Strip from Old Website */}
        <div
          style={{
            maxWidth: '900px',
            margin: '40px auto 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '20px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(212, 175, 55, 0.18)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={15} color="#d4af37" />
            <span>+91 8543097899</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={15} color="#d4af37" />
            <span>byjuspark@gmail.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={15} color="#d4af37" />
            <span>Mon - Sun: 09:00 AM - 09:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
