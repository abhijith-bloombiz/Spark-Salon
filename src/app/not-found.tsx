'use client';

import React from 'react';
import Link from 'next/link';
import SparkLogo from '@/components/layout/SparkLogo';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040406',
        padding: '30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '540px' }}>
        <div style={{ marginBottom: '32px' }}>
          <SparkLogo size="md" showTagline={false} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(5rem, 12vw, 8.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            color: 'transparent',
            backgroundImage: 'var(--gold-text-gradient)',
            WebkitBackgroundClip: 'text',
            marginBottom: '16px',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
            color: '#ffffff',
            fontWeight: 700,
            marginBottom: '14px',
          }}
        >
          Aura Not Found
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}
        >
          The page or private suite you are attempting to visit has been moved or exists solely in
          the imagination. Return to the main salon atelier.
        </p>

        <Link
          href="/"
          className="btn-primary-crimson squircle-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            fontSize: '0.84rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>RETURN TO ATELIER</span>
        </Link>
      </div>
    </main>
  );
}
