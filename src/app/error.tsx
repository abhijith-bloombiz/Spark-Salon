'use client';

import React, { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import SparkLogo from '@/components/layout/SparkLogo';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Spark Salon Runtime Error Caught:', error);
  }, [error]);

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
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <div style={{ marginBottom: '28px' }}>
          <SparkLogo size="md" showTagline={false} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            color: '#ffffff',
            fontWeight: 800,
            marginBottom: '16px',
          }}
        >
          An Unexpected Disturbance
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans-display)',
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          A temporary disturbance occurred in the salon digital atelier. Please reset the session or
          refresh to restore the experience.
        </p>

        <button
          onClick={() => reset()}
          className="btn-primary-crimson squircle-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            fontSize: '0.84rem',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={16} />
          <span>RESTORE EXPERIENCE</span>
        </button>
      </div>
    </main>
  );
}
