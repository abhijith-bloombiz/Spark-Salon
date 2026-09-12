'use client';

import { useState } from 'react';
import { sparkAudio } from '@/lib/audio';

export function useSound() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const active = sparkAudio.toggleAmbient();
    setIsPlaying(active);
    return active;
  };

  const playClick = () => {
    sparkAudio.playClick();
  };

  const playChime = () => {
    sparkAudio.playChime();
  };

  return { isPlaying, toggle, playClick, playChime };
}
