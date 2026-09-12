'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { HeroFrameLoader, FrameLoaderState } from './heroFrameLoader';
import { HERO_FRAME_SET, HeroFrameSet } from './heroConfig';

export interface UseHeroFrameSequenceOptions {
  config?: HeroFrameSet;
  onFrameChange?: (frameIndex: number, frameNumber: number) => void;
}

export function useHeroFrameSequence({
  config = HERO_FRAME_SET,
  onFrameChange,
}: UseHeroFrameSequenceOptions = {}) {
  const loaderRef = useRef<HeroFrameLoader | null>(null);
  const currentFrameIndexRef = useRef(0);
  const lastRenderedIndexRef = useRef<number | null>(null);

  const [loaderState, setLoaderState] = useState<FrameLoaderState>({
    isCriticalFrameLoaded: false,
    isCriticalWindowLoaded: false,
    criticalProgress: 0,
    totalLoaded: 0,
    totalFailed: 0,
  });

  // Initialize loader once on mount
  useEffect(() => {
    const loader = new HeroFrameLoader(config);
    loaderRef.current = loader;

    const unsubscribeProgress = loader.onProgress((state) => {
      setLoaderState(state);
    });

    loader.loadCriticalWindow();

    return () => {
      unsubscribeProgress();
      loader.destroy();
      loaderRef.current = null;
    };
  }, [config]);

  /**
   * Translates 0.0..1.0 scroll progress to a 0-indexed frame integer
   * Clamped strictly between 0 and frameCount - 1
   */
  const getIndexFromProgress = useCallback(
    (progress: number): number => {
      const raw = Math.round(progress * (config.frameCount - 1));
      return Math.max(0, Math.min(config.frameCount - 1, raw));
    },
    [config.frameCount]
  );

  /**
   * Updates target frame from scroll progress without triggering React state updates
   */
  const setProgress = useCallback(
    (progress: number) => {
      const newIndex = getIndexFromProgress(progress);
      if (newIndex !== currentFrameIndexRef.current) {
        currentFrameIndexRef.current = newIndex;
        loaderRef.current?.setPriorityFrame(newIndex);
        if (onFrameChange) {
          onFrameChange(newIndex, newIndex + 1);
        }
      }
    },
    [getIndexFromProgress, onFrameChange]
  );

  /**
   * Retrieves the current frame (or nearest loaded fallback)
   */
  const getCurrentFrameImage = useCallback((): HTMLImageElement | null => {
    if (!loaderRef.current) return null;
    const targetIdx = currentFrameIndexRef.current;
    return loaderRef.current.getNearestFrame(targetIdx);
  }, []);

  return {
    loaderRef,
    loaderState,
    currentFrameIndexRef,
    lastRenderedIndexRef,
    setProgress,
    getCurrentFrameImage,
  };
}
