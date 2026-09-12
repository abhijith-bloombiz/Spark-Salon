'use client';

import React, { useState } from 'react';

interface MenuButtonProps {
  scrolled?: boolean;
  isOpen?: boolean;
  onClick: () => void;
}

export default function MenuButton({ scrolled = false, isOpen = false, onClick }: MenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const size = scrolled ? 38 : 44;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="spark-menu-btn"
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(201, 164, 92, 0.45)',
        boxShadow: isHovered
          ? '0 6px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(201, 164, 92, 0.4)'
          : '0 4px 15px rgba(0, 0, 0, 0.45), 0 0 10px rgba(201, 164, 92, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        flexShrink: 0,
      }}
    >
      {/* Three Refined Horizontal Bars matching reference image */}
      <span
        style={{
          display: 'block',
          width: '18px',
          height: '1.6px',
          borderRadius: '1px',
          backgroundColor: isHovered ? '#e5c158' : '#e0ded8',
          transition: 'all 0.28s ease',
        }}
      />
      <span
        style={{
          display: 'block',
          width: isHovered ? '14px' : '18px',
          height: '1.6px',
          borderRadius: '1px',
          backgroundColor: isHovered ? '#e5c158' : '#e0ded8',
          transition: 'all 0.28s ease',
        }}
      />
      <span
        style={{
          display: 'block',
          width: '18px',
          height: '1.6px',
          borderRadius: '1px',
          backgroundColor: isHovered ? '#e5c158' : '#e0ded8',
          transition: 'all 0.28s ease',
        }}
      />
    </button>
  );
}
