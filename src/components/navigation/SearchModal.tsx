'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { SALON_CATEGORIES } from '@/lib/data/services';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTreatment: (studio?: string) => void;
}

export default function SearchModal({ isOpen, onClose, onBookTreatment }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allServices = SALON_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryTitle: cat.title, categoryId: cat.id }))
  );

  const filtered = query.trim()
    ? allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase()) ||
          s.categoryTitle.toLowerCase().includes(query.toLowerCase())
      )
    : allServices.slice(0, 6);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Salon Treatments"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(4, 4, 6, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '120px 20px 40px',
        animation: 'sparkFadeIn 0.25s ease forwards',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="squircle-lg"
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#0a0a0f',
          border: '1px solid rgba(201, 164, 92, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 30px rgba(201, 164, 92, 0.2)',
          padding: '24px 28px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            borderBottom: '1px solid rgba(201, 164, 92, 0.25)',
            paddingBottom: '16px',
            marginBottom: '18px',
          }}
        >
          <Search size={22} color="#c9a45c" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bespoke treatments, balayage, bridal, rituals..."
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-sans-display), sans-serif',
              fontSize: '1.05rem',
              letterSpacing: '0.04em',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div
          data-lenis-prevent
          style={{
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingRight: '4px',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No bespoke treatments found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="squircle"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(201, 164, 92, 0.15)',
                  borderRadius: '16px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c9a45c';
                  e.currentTarget.style.backgroundColor = 'rgba(201, 164, 92, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.15)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--gold-primary)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={11} />
                    <span>{item.categoryTitle} • {item.duration}</span>
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem', marginTop: '3px' }}>
                    {item.name}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.price}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onBookTreatment(item.categoryId);
                    }}
                    className="btn-primary-crimson squircle-sm"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.78rem',
                      borderRadius: '18px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Book</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
