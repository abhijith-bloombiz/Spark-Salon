'use client';

import React, { useState } from 'react';

interface MenuButtonProps {
  scrolled?: boolean;
  isOpen?: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen = false, onClick }: MenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className={`spark-menu-btn ${isOpen ? 'is-open' : ''}`}
      style={{
        position: 'relative',
        width: '38px',
        height: '38px',
        borderRadius: '8px',
        backgroundColor: isOpen
          ? 'rgba(201, 164, 92, 0.18)'
          : isHovered
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(255, 255, 255, 0.04)',
        border: isOpen
          ? '1.5px solid rgba(229, 193, 88, 0.95)'
          : isHovered
          ? '1.5px solid rgba(229, 193, 88, 0.9)'
          : '1.5px solid rgba(212, 175, 55, 0.65)',
        boxShadow: isOpen
          ? '0 6px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(201, 164, 92, 0.45)'
          : isHovered
          ? '0 6px 20px rgba(0, 0, 0, 0.5), 0 0 16px rgba(201, 164, 92, 0.4)'
          : '0 4px 15px rgba(0, 0, 0, 0.45), 0 0 10px rgba(212, 175, 55, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        margin: 0,
        transform: isHovered && !isOpen ? 'scale(1.04)' : 'scale(1)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Subtle Upper Specular Light Glint matching reference */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 245, 210, 0.75) 50%, transparent 100%)',
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Animated Hamburger / Close Morph Container with Fluid 180° Spin */}
      <div
        style={{
          position: 'relative',
          width: '18px',
          height: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        {/* Top Bar: slides down 6.1px and rotates 45° to form the forward diagonal of the 'X' */}
        <span
          style={{
            display: 'block',
            width: '18px',
            height: '1.8px',
            borderRadius: '2px',
            backgroundColor: '#e5c158',
            transform: isOpen ? 'translateY(6.1px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
            transformOrigin: 'center center',
            transition:
              'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.28s ease, box-shadow 0.28s ease',
            boxShadow: isOpen
              ? '0 0 8px rgba(229, 193, 88, 0.8)'
              : '0 0 4px rgba(229, 193, 88, 0.3)',
          }}
        />

        {/* Middle Bar: collapses horizontally and dissolves to opacity 0 */}
        <span
          style={{
            display: 'block',
            width: isHovered && !isOpen ? '13px' : '18px',
            height: '1.8px',
            borderRadius: '2px',
            backgroundColor: '#e5c158',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: 'center center',
            boxShadow: '0 0 4px rgba(229, 193, 88, 0.3)',
            transition:
              'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, width 0.25s ease, background-color 0.28s ease',
          }}
        />

        {/* Bottom Bar: slides up 6.1px and rotates -45° to form the backward diagonal of the 'X' */}
        <span
          style={{
            display: 'block',
            width: '18px',
            height: '1.8px',
            borderRadius: '2px',
            backgroundColor: '#e5c158',
            transform: isOpen ? 'translateY(-6.1px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
            transformOrigin: 'center center',
            transition:
              'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.28s ease, box-shadow 0.28s ease',
            boxShadow: isOpen
              ? '0 0 8px rgba(229, 193, 88, 0.8)'
              : '0 0 4px rgba(229, 193, 88, 0.3)',
          }}
        />
      </div>
    </button>
  );
}
