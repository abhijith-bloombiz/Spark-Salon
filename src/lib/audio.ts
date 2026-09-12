// Web Audio API Procedural Luxury Ambient & Chime Engine

class SparkAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playEntryChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Play an ethereal 3-note luxury chime (F# - A# - C#)
      const notes = [369.99, 466.16, 554.37, 739.99];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.15);

        gain.gain.setValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.08, this.ctx!.currentTime + idx * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.15 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.15);
        osc.stop(this.ctx!.currentTime + idx * 0.15 + 2.0);
      });
    } catch (e) {
      console.warn('Audio chime notice:', e);
    }
  }

  public playChime() {
    this.playEntryChime();
  }

  public playClick() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  public toggleAmbient(): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.isPlaying) {
        this.stopAmbient();
        return false;
      } else {
        this.startAmbient();
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  public startAmbient() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stopAmbient();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3.0);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      // Warm harmonic chords (D minor 9 / A luxury frequency)
      const freqs = [146.83, 220.00, 261.63, 329.63, 440.00];

      freqs.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // Subtle detune for rich spatial warmth
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx!.currentTime);

        oscGain.gain.setValueAtTime(0.02, this.ctx!.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.filter!);
        osc.start();
        this.oscillators.push(osc);
      });

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.isPlaying = true;
    } catch (e) {
      console.warn('Ambient start notice:', e);
    }
  }

  public stopAmbient() {
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); } catch (e) {}
          });
          this.oscillators = [];
          this.isPlaying = false;
        }, 1000);
      } catch (e) {
        this.isPlaying = false;
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const sparkAudio = new SparkAudioEngine();
