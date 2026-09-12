/**
 * SparkSalon Hero Frame Sequence Configuration
 * Extracted from bg-hero-video.mp4 to public/hero/sequence/ (120 frames at 1280x720, WebP, 4-digit zero-padded)
 */

export interface HeroFrameSet {
  frameCount: number;
  basePath: string;
  digits: number;
  width: number;
  height: number;
  posterPath: string;
}

export interface HeroBreakpointConfig {
  name: 'mobile' | 'tablet' | 'desktop';
  minWidth: number;
  scrollEnd: string;
  scrub: number;
}

// 120 high-fidelity WebP frames extracted from bg-hero-video.mp4 (1280x720)
// Indices 0..119 directly mapped to /hero/sequence/frame_0001.webp .. frame_0120.webp
export const HERO_FRAME_SET: HeroFrameSet = {
  frameCount: 120,
  basePath: '/hero/sequence/frame_',
  digits: 4,
  width: 1280,
  height: 720,
  posterPath: '/hero/sequence/frame_0001.webp',
};

// Critical window: first 4 frames required before unmasking loader
export const CRITICAL_WINDOW_FRAME_COUNT = 4;

// Concurrency cap for background image fetching & decoding (keeps network & CPU free for 120fps scrolling)
export const BACKGROUND_LOAD_CONCURRENCY = 2;

// Per-breakpoint ScrollTrigger configuration
export const BREAKPOINTS: HeroBreakpointConfig[] = [
  {
    name: 'mobile',
    minWidth: 0,
    scrollEnd: '+=175%',
    scrub: 0.45,
  },
  {
    name: 'tablet',
    minWidth: 768,
    scrollEnd: '+=225%',
    scrub: 0.5,
  },
  {
    name: 'desktop',
    minWidth: 1024,
    scrollEnd: '+=275%',
    scrub: 0.5,
  },
];

/**
 * Derives the static asset path for a 0-indexed frame number:
 * Index 0 -> /hero/sequence/frame_0001.webp
 * Index 119 -> /hero/sequence/frame_0120.webp
 * @param index 0-indexed frame index (0..frameCount - 1)
 */
export function getFrameUrl(index: number, config: HeroFrameSet = HERO_FRAME_SET): string {
  const frameNumber = Math.max(1, Math.min(config.frameCount, Math.round(index) + 1));
  const padded = String(frameNumber).padStart(config.digits, '0');
  return `${config.basePath}${padded}.webp`;
}

/**
 * Derives the active breakpoint pin distance based on viewport width
 */
export function getBreakpointConfig(width: number): HeroBreakpointConfig {
  if (width >= 1024) return BREAKPOINTS[2]; // desktop
  if (width >= 768) return BREAKPOINTS[1];  // tablet
  return BREAKPOINTS[0];                    // mobile
}
