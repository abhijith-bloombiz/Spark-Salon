'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchButtonProps {
  scrolled?: boolean;
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  const size = 36;

  return (
    <button
      onClick={onClick}
      aria-label="Search treatments & services"
      className="spark-search-btn"
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        color: '#f4f1ea',
        flexShrink: 0,
      }}
    >
      {/* Centered Search Icon matching reference */}
      <Search
        size={16}
        strokeWidth={2}
        className="spark-search-icon"
        style={{
          transition: 'color 0.25s ease, transform 0.25s ease',
        }}
      />
    </button>
  );
}
