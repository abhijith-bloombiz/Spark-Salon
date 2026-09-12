'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sparkAudio } from '@/lib/audio';

interface PreloaderProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

export default function Preloader({ onComplete, onExitStart }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'done'>('loading');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  const finishLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);

    try {
      sparkAudio.playEntryChime();
    } catch {
      // Graceful fallback if chime cannot play
    }

    timerRef.current = setTimeout(() => {
      setStage('done');
      onExitStart?.();
      exitTimerRef.current = setTimeout(() => {
        onComplete();
      }, 700);
    }, 450);
  }, [onComplete, onExitStart]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  // Synchronize progress with video time updates
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const currentPercent = Math.min(
      Math.round((video.currentTime / video.duration) * 100),
      100
    );
    setProgress((prev) => Math.max(prev, currentPercent));

    if (currentPercent >= 98) {
      finishLoading();
    }
  };

  // When video completes natural playback
  const handleEnded = () => {
    finishLoading();
  };

  // Video autoplay & safety fallback timer matching 3s video duration
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay fallback
      });
    }

    // Safety fallback timer matching the 3s video duration (increments ~3.3% per 100ms)
    const fallbackInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fallbackInterval);
          finishLoading();
          return 100;
        }
        const inc = Math.floor(Math.random() * 3) + 3;
        const next = Math.min(prev + inc, 100);
        if (next >= 100) {
          clearInterval(fallbackInterval);
          finishLoading();
        }
        return next;
      });
    }, 100);

    return () => clearInterval(fallbackInterval);
  }, [finishLoading]);

  // Click anywhere to skip
  const handleSkip = () => {
    finishLoading();
  };

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999990,
        backgroundColor: '#040406',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.75s ease',
        transform: stage === 'done' ? 'translateY(-100%)' : 'translateY(0)',
        opacity: stage === 'done' ? 0 : 1,
        pointerEvents: stage === 'done' ? 'none' : 'auto',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Cinematic Loading Video */}
      <video
        ref={videoRef}
        src="/images/loading/loading-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
          opacity: videoLoaded ? 1 : 0.85,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Subtle cinematic vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(4, 4, 6, 0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </div>
  );
}
