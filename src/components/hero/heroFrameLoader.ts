/**
 * SparkSalon Hero Frame Loader
 * Manages Phase 1 (critical frame), Phase 2 (critical window), Phase 3 (prioritized background load),
 * in-memory cache, AbortController cancellation, and nearest-frame fallback.
 */

import { HERO_FRAME_SET, CRITICAL_WINDOW_FRAME_COUNT, BACKGROUND_LOAD_CONCURRENCY, getFrameUrl } from './heroConfig';

export interface FrameLoaderState {
  isCriticalFrameLoaded: boolean;
  isCriticalWindowLoaded: boolean;
  criticalProgress: number; // 0.0 to 1.0
  totalLoaded: number;
  totalFailed: number;
}

export class HeroFrameLoader {
  private cache = new Map<number, HTMLImageElement>();
  private inFlight = new Map<number, { img: HTMLImageElement; abortController: AbortController }>();
  private queue: number[] = [];
  private activeConcurrency = 0;
  private destroyed = false;
  private currentTargetIndex = 0;

  private onProgressCallbacks = new Set<(state: FrameLoaderState) => void>();
  private onFrameLoadedCallbacks = new Set<(index: number, img: HTMLImageElement) => void>();

  private criticalProgress = 0;
  private isCriticalFrameLoaded = false;
  private isCriticalWindowLoaded = false;
  private totalLoaded = 0;
  private totalFailed = 0;

  constructor(private config = HERO_FRAME_SET) {
    // Populate queue with all background frames (after critical window)
    for (let i = CRITICAL_WINDOW_FRAME_COUNT; i < this.config.frameCount; i++) {
      this.queue.push(i);
    }
  }

  /**
   * Subscribe to overall loader state changes (e.g. for critical progress bar)
   */
  public onProgress(callback: (state: FrameLoaderState) => void): () => void {
    this.onProgressCallbacks.add(callback);
    callback(this.getState());
    return () => this.onProgressCallbacks.delete(callback);
  }

  /**
   * Subscribe to individual frame completions (to update canvas if frame was pending)
   */
  public onFrameLoaded(callback: (index: number, img: HTMLImageElement) => void): () => void {
    this.onFrameLoadedCallbacks.add(callback);
    return () => this.onFrameLoadedCallbacks.delete(callback);
  }

  public getState(): FrameLoaderState {
    return {
      isCriticalFrameLoaded: this.isCriticalFrameLoaded,
      isCriticalWindowLoaded: this.isCriticalWindowLoaded,
      criticalProgress: this.criticalProgress,
      totalLoaded: this.totalLoaded,
      totalFailed: this.totalFailed,
    };
  }

  /**
   * Phase 1 & 2: Loads critical frame (index 0) and the critical window (0..17)
   */
  public async loadCriticalWindow(): Promise<void> {
    if (this.destroyed) return;

    // Phase 1: Load frame 0 immediately and decode
    try {
      await this.loadSingleFrame(0, true);
      this.isCriticalFrameLoaded = true;
      this.notifyProgress();
    } catch {
      // Fall back to poster if frame 0 fails
      console.warn('[HeroFrameLoader] Critical frame 0 failed; continuing critical window');
    }

    // Phase 2: Load the remaining critical window frames (1..CRITICAL_WINDOW_FRAME_COUNT - 1)
    const criticalPromises: Promise<void>[] = [];
    let criticalLoaded = this.cache.has(0) ? 1 : 0;

    for (let i = 1; i < CRITICAL_WINDOW_FRAME_COUNT; i++) {
      const p = this.loadSingleFrame(i, true)
        .then(() => {
          criticalLoaded++;
          this.criticalProgress = Math.min(1.0, criticalLoaded / CRITICAL_WINDOW_FRAME_COUNT);
          this.notifyProgress();
        })
        .catch(() => {
          criticalLoaded++;
          this.criticalProgress = Math.min(1.0, criticalLoaded / CRITICAL_WINDOW_FRAME_COUNT);
          this.notifyProgress();
        });
      criticalPromises.push(p);
    }

    await Promise.all(criticalPromises);
    this.isCriticalWindowLoaded = true;
    this.criticalProgress = 1.0;
    this.notifyProgress();

    // Begin Phase 3 background loading
    this.pumpBackgroundQueue();
  }

  /**
   * Updates current scroll frame target to re-prioritize pending requests by proximity
   */
  public setPriorityFrame(index: number): void {
    if (this.destroyed || index === this.currentTargetIndex) return;
    this.currentTargetIndex = Math.max(0, Math.min(this.config.frameCount - 1, Math.round(index)));

    // Abort in-flight background requests that are far from the new target (> 20 frames away)
    this.inFlight.forEach(({ abortController }, frameIdx) => {
      if (Math.abs(frameIdx - this.currentTargetIndex) > 20) {
        abortController.abort();
        this.inFlight.delete(frameIdx);
        this.activeConcurrency = Math.max(0, this.activeConcurrency - 1);
        if (!this.cache.has(frameIdx) && !this.queue.includes(frameIdx)) {
          this.queue.push(frameIdx);
        }
      }
    });

    // Re-sort the queue so closest frames to target are processed first
    this.queue.sort((a, b) => {
      const distA = Math.abs(a - this.currentTargetIndex);
      const distB = Math.abs(b - this.currentTargetIndex);
      return distA - distB;
    });

    this.pumpBackgroundQueue();
  }

  /**
   * Retrieves exact frame if loaded
   */
  public getFrame(index: number): HTMLImageElement | null {
    return this.cache.get(index) || null;
  }

  /**
   * Missing-frame fallback: returns the closest loaded frame to the requested index.
   * Guarantees canvas is never blank or flickering.
   */
  public getNearestFrame(index: number): HTMLImageElement | null {
    if (this.cache.has(index)) {
      return this.cache.get(index)!;
    }

    // Search outwards from index
    let step = 1;
    const maxDistance = Math.max(index, this.config.frameCount - index);

    while (step <= maxDistance) {
      const left = index - step;
      if (left >= 0 && this.cache.has(left)) {
        return this.cache.get(left)!;
      }
      const right = index + step;
      if (right < this.config.frameCount && this.cache.has(right)) {
        return this.cache.get(right)!;
      }
      step++;
    }

    // If no frames in sequence loaded yet, return frame 0 if available
    return this.cache.get(0) || null;
  }

  /**
   * Loads a single image, decodes it, and caches it
   */
  private loadSingleFrame(index: number, isCritical = false): Promise<HTMLImageElement> {
    if (this.cache.has(index)) {
      return Promise.resolve(this.cache.get(index)!);
    }

    if (this.inFlight.has(index)) {
      return Promise.resolve(this.inFlight.get(index)!.img);
    }

    const abortController = new AbortController();
    const url = getFrameUrl(index, this.config);
    const img = new Image();

    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.src = url;

      const onAbort = () => {
        img.src = '';
        this.inFlight.delete(index);
        // Cleanly resolve on abort so it doesn't trigger unhandled promise rejection
        resolve(img);
      };

      if (abortController.signal.aborted) {
        onAbort();
        return;
      }

      abortController.signal.addEventListener('abort', onAbort, { once: true });

      const handleSuccess = async () => {
        if (this.destroyed) return;
        if (isCritical) {
          try {
            if ('decode' in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode error if image loaded fine
          }
        }
        if (this.destroyed) return;

        this.cache.set(index, img);
        this.inFlight.delete(index);
        this.totalLoaded++;
        this.notifyFrameLoaded(index, img);
        resolve(img);
      };

      const handleError = () => {
        this.inFlight.delete(index);
        this.totalFailed++;
        // Resolve instead of unhandled reject to avoid runtime overlay errors
        resolve(img);
      };

      if (img.complete && img.naturalWidth > 0) {
        handleSuccess();
      } else {
        img.onload = () => handleSuccess();
        img.onerror = handleError;
      }
    });

    this.inFlight.set(index, { img, abortController });
    return loadPromise;
  }

  /**
   * Processes the background queue up to BACKGROUND_LOAD_CONCURRENCY limit
   */
  private pumpBackgroundQueue(): void {
    if (this.destroyed) return;

    while (this.activeConcurrency < BACKGROUND_LOAD_CONCURRENCY && this.queue.length > 0) {
      const nextIndex = this.queue.shift();
      if (nextIndex === undefined) break;

      if (this.cache.has(nextIndex) || this.inFlight.has(nextIndex)) {
        continue;
      }

      this.activeConcurrency++;
      this.loadSingleFrame(nextIndex)
        .catch(() => {
          // Gracefully swallow any background load cancellation or network glitch
        })
        .finally(() => {
          this.activeConcurrency = Math.max(0, this.activeConcurrency - 1);
          this.pumpBackgroundQueue();
        });
    }
  }

  private notifyProgress(): void {
    const state = this.getState();
    this.onProgressCallbacks.forEach((cb) => cb(state));
  }

  private notifyFrameLoaded(index: number, img: HTMLImageElement): void {
    this.onFrameLoadedCallbacks.forEach((cb) => cb(index, img));
  }

  /**
   * Cleans up all in-flight image decodes and listeners
   */
  public destroy(): void {
    this.destroyed = true;
    this.inFlight.forEach(({ abortController }) => abortController.abort());
    this.inFlight.clear();
    this.queue = [];
    this.onProgressCallbacks.clear();
    this.onFrameLoadedCallbacks.clear();
    this.cache.clear();
  }
}
