/**
 * Grand Line 3D Portal — Procedural Web Audio Sound FX Synthesizer
 * Zero external audio files required; synthesizes playful anime-inspired sound effects safely in browser.
 */

'use strict';

(function (root) {
  class OnePieceSoundFX {
    constructor(initialEnabled) {
      this.enabled = initialEnabled !== false;
      this.ctx = null;
    }

    ensureContext() {
      if (!this.enabled) return null;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    setEnabled(flag) {
      this.enabled = Boolean(flag);
      if (this.enabled) {
        this.playLogPoseChime();
      }
    }

    tone(freqStart, freqEnd, durationSec, type, gainPeak, delaySec) {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const start = ctx.currentTime + (delaySec || 0);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freqStart, start);
      if (freqEnd && freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), start + durationSec);
      }
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(gainPeak || 0.12, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + durationSec + 0.02);
    }

    /** Den Den Mushi "Puru puru... Gacha!" */
    playDenDenMushi() {
      this.tone(520, 620, 0.07, 'triangle', 0.08, 0);
      this.tone(540, 650, 0.07, 'triangle', 0.08, 0.09);
      this.tone(880, 440, 0.09, 'square', 0.05, 0.2);
    }

    /** Crystalline Log Pose needle lock chime */
    playLogPoseChime() {
      this.tone(660, 990, 0.14, 'sine', 0.09, 0);
      this.tone(1320, 1320, 0.18, 'sine', 0.06, 0.07);
    }

    /** Drums of Liberation — Gear 5 rhythmic tom-tom heartbeat! */
    playDrumsOfLiberation() {
      // Doom-dut-da-da!
      this.tone(135, 58, 0.18, 'sine', 0.22, 0.0);
      this.tone(190, 95, 0.11, 'triangle', 0.15, 0.21);
      this.tone(240, 125, 0.09, 'triangle', 0.14, 0.34);
      this.tone(280, 140, 0.14, 'triangle', 0.16, 0.45);
      this.tone(784, 1046, 0.22, 'sine', 0.08, 0.52);
    }

    /** Conqueror's Haki deep bass wave + lightning snap */
    playHakiBoom() {
      this.tone(110, 32, 0.42, 'sawtooth', 0.14, 0);
      this.tone(920, 180, 0.16, 'square', 0.07, 0.03);
      this.tone(680, 120, 0.14, 'square', 0.06, 0.12);
    }

    /** Treasure / Road Poneglyph / Quiz victory arpeggio */
    playTreasureFanfare() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      for (let i = 0; i < notes.length; i++) {
        this.tone(notes[i], notes[i], 0.16, 'triangle', 0.11, i * 0.09);
      }
    }
  }

  root.OnePieceSoundFX = OnePieceSoundFX;
})(typeof window !== 'undefined' ? window : globalThis);
