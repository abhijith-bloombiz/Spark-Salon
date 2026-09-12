'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface BookingButtonProps {
  scrolled?: boolean;
  onClick: () => void;
}

export default function BookingButton({ scrolled = false, onClick }: BookingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Book VIP Appointment"
      className="spark-booking-btn squircle-sm"
      style={{
        position: 'relative',
        height: '38px',
        padding: '0 18px',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '9px',
        cursor: 'pointer',
        outline: 'none',
        overflow: 'hidden',
        userSelect: 'none',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle Upper Specular Light Glint matching reference image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '12%',
          right: '12%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 245, 210, 0.5) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Button Label matching reference */}
      <span
        style={{
          fontFamily: 'var(--font-sans-display), "Inter", -apple-system, sans-serif',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: '#f4f1ea',
          whiteSpace: 'nowrap',
        }}
      >
        Book Appointment
      </span>

      {/* Right Arrow matching reference */}
      <ArrowRight
        size={14}
        color="#f3e5ab"
        strokeWidth={2}
        style={{
          transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </button>
  );
}
