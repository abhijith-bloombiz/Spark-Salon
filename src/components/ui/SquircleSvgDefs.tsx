'use client';

import React from 'react';
import { SQUIRCLE_CLIP_PATH_N4, SQUIRCLE_CLIP_PATH_N5 } from '@/lib/squircle';

/**
 * Global SVG Definitions for True Superellipse / Apple Squircle Clamping
 * Renders zero-dimension defs accessible to any CSS clip-path or SVG use
 */
export default function SquircleSvgDefs() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Apple iOS Classic Squircle (n = 4 Superellipse) */}
        <clipPath id="apple-squircle" clipPathUnits="objectBoundingBox">
          <path d={SQUIRCLE_CLIP_PATH_N4} />
        </clipPath>

        {/* Soft Display Superellipse (n = 5 Continuous Curvature) */}
        <clipPath id="apple-squircle-soft" clipPathUnits="objectBoundingBox">
          <path d={SQUIRCLE_CLIP_PATH_N5} />
        </clipPath>
      </defs>
    </svg>
  );
}
