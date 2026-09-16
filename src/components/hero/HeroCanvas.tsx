'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { HERO_FRAME_SET, HeroFrameSet } from './heroConfig';
import { HeroFrameLoader } from './heroFrameLoader';

export interface HeroCanvasProps {
  loader: HeroFrameLoader | null;
  config?: HeroFrameSet;
  className?: string;
  style?: React.CSSProperties;
}

export interface HeroCanvasHandle {
  renderFrame: (index: number) => void;
  renderProgress: (progress: number) => void;
  drawCurrent: () => void;
}

/**
 * Pure cover-fit calculation to scale & center an image inside arbitrary canvas dimensions
 */
export function getCoverParams(imgW: number, imgH: number, canvasW: number, canvasH: number) {
  if (imgW <= 0 || imgH <= 0 || canvasW <= 0 || canvasH <= 0) {
    return { drawWidth: 0, drawHeight: 0, offsetX: 0, offsetY: 0 };
  }
  const scale = Math.max(canvasW / imgW, canvasH / imgH);
  const drawWidth = imgW * scale;
  const drawHeight = imgH * scale;
  return {
    drawWidth,
    drawHeight,
    offsetX: (canvasW - drawWidth) / 2,
    offsetY: (canvasH - drawHeight) / 2,
  };
}

const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(function HeroCanvas(
  { loader, config = HERO_FRAME_SET, className = '', style = {} },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastRenderedIndexRef = useRef<number>(-1);
  const lastRenderedImageRef = useRef<HTMLImageElement | null>(null);
  const currentProgressRef = useRef<number>(0);
  const currentFrameTargetRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Cached geometry
  const cssDimsRef = useRef({ width: 0, height: 0 });
  const dprRef = useRef<number>(1);

  /**
   * Dual-layer Canvas Draw with Smooth Alpha Blending
   */
  const drawFrameWithBlend = useCallback(
    (mainImg: HTMLImageElement | null, blendImg: HTMLImageElement | null, blendAlpha: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctxRef.current = ctx;
      }

      const { width: cssW, height: cssH } = cssDimsRef.current;
      if (cssW <= 0 || cssH <= 0) return;

      const dpr = dprRef.current;
      const backingW = Math.round(cssW * dpr);
      const backingH = Math.round(cssH * dpr);

      // If blendAlpha is 1.0 (or mainImg is not yet loaded), draw only blendImg (hero-bg)
      if (blendAlpha >= 0.999 || (!mainImg && blendImg)) {
        if (blendImg && blendImg.complete && blendImg.naturalWidth > 0) {
          const cover = getCoverParams(blendImg.naturalWidth, blendImg.naturalHeight, backingW, backingH);
          ctx.globalAlpha = 1.0;
          ctx.drawImage(blendImg, cover.offsetX, cover.offsetY, cover.drawWidth, cover.drawHeight);
          lastRenderedImageRef.current = blendImg;
        }
        return;
      }

      // Draw base video frame
      if (mainImg && mainImg.complete && mainImg.naturalWidth > 0) {
        const cover = getCoverParams(mainImg.naturalWidth, mainImg.naturalHeight, backingW, backingH);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(mainImg, cover.offsetX, cover.offsetY, cover.drawWidth, cover.drawHeight);
        lastRenderedImageRef.current = mainImg;
      }

      // Blend initial hero-bg on top with smooth easing alpha
      if (blendAlpha > 0.001 && blendImg && blendImg.complete && blendImg.naturalWidth > 0) {
        const cover = getCoverParams(blendImg.naturalWidth, blendImg.naturalHeight, backingW, backingH);
        ctx.globalAlpha = blendAlpha;
        ctx.drawImage(blendImg, cover.offsetX, cover.offsetY, cover.drawWidth, cover.drawHeight);
        ctx.globalAlpha = 1.0; // reset
      }
    },
    []
  );

  /**
   * Renders the given frame index directly
   */
  const renderFrame = useCallback(
    (index: number) => {
      currentFrameTargetRef.current = index;
      if (!loader) return;
      const img = loader.getNearestFrame(index);
      if (!img) return;

      if (index === lastRenderedIndexRef.current && img === lastRenderedImageRef.current) {
        return;
      }

      drawFrameWithBlend(img, null, 0.0);
      lastRenderedIndexRef.current = index;
    },
    [loader, drawFrameWithBlend]
  );

  /**
   * Renders smooth scroll progress directly across the video frame sequence
   */
  const renderProgress = useCallback(
    (progress: number) => {
      currentProgressRef.current = progress;
      if (!loader) return;

      const clamped = Math.max(0, Math.min(1, progress));
      const targetIndex = Math.min(
        config.frameCount - 1,
        Math.max(0, Math.round(clamped * (config.frameCount - 1)))
      );

      const frameImg = loader.getNearestFrame(targetIndex);
      drawFrameWithBlend(frameImg, null, 0.0);
      lastRenderedIndexRef.current = targetIndex;
    },
    [loader, config.frameCount, drawFrameWithBlend]
  );

  const drawCurrent = useCallback(() => {
    renderProgress(currentProgressRef.current);
  }, [renderProgress]);

  // Imperative handle for parent ScrollTrigger loop
  useImperativeHandle(
    ref,
    () => ({
      renderFrame,
      renderProgress,
      drawCurrent,
    }),
    [renderFrame, renderProgress, drawCurrent]
  );

  // When loader completes any frame, only redraw if that specific frame is the current target and Hero is in view
  useEffect(() => {
    if (!loader) return;
    const unsub = loader.onFrameLoaded((index: number) => {
      if (currentProgressRef.current < 0.99 && index === currentFrameTargetRef.current) {
        drawCurrent();
      }
    });
    return unsub;
  }, [loader, drawCurrent]);

  /**
   * Resize handling with DPR capping and backing resolution setup
   */
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const newWidth = Math.round(rect.width);
    const newHeight = Math.round(rect.height);

    if (newWidth <= 0 || newHeight <= 0) return;

    // Check if dimensions truly changed (prevents iOS address bar spurious micro-shifts)
    if (newWidth === cssDimsRef.current.width && newHeight === cssDimsRef.current.height) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    cssDimsRef.current = { width: newWidth, height: newHeight };

    // Set backing store dimensions
    canvas.width = Math.round(newWidth * dpr);
    canvas.height = Math.round(newHeight * dpr);

    if (ctxRef.current) {
      ctxRef.current.imageSmoothingEnabled = true;
      ctxRef.current.imageSmoothingQuality = 'medium';
    }

    // CSS dimensions remain independent of dpr
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    // Redraw current visual state matching current progress
    drawCurrent();
  }, [drawCurrent]);

  // Attach ResizeObserver & initial draw
  useEffect(() => {
    handleResize();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    observer.observe(container);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleResize]);

  // Initial critical frame draw as soon as loader mounts
  useEffect(() => {
    if (loader) {
      drawCurrent();
    }
  }, [loader, drawCurrent]);

  return (
    <div
      ref={containerRef}
      className={`hero-canvas-viewport ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#040406',
        backgroundImage: "url('/hero/poster.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </div>
  );
});

export default HeroCanvas;
