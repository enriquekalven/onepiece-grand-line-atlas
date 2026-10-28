/**
 * Grand Line 3D Portal — Procedural Web Audio Sound FX + Multi-Language Read Aloud Narrator
 * Zero external audio files required; synthesizes playful anime-inspired sound effects
 * and provides chunked Web Speech API narration across all 11 languages.
 */

'use strict';

(function (root) {
  var LANG_SPEECH_CODES = {
    en: 'en-US',
    es: 'es-ES',
    zh: 'zh-CN',
    yue: 'zh-HK',
    ja: 'ja-JP',
    ko: 'ko-KR',
    pt: 'pt-BR',
    fr: 'fr-FR',
    it: 'it-IT',
    de: 'de-DE',
    ar: 'ar-SA'
  };

  class OnePieceSoundFX {
    constructor(initialEnabled) {
      this.enabled = initialEnabled !== false;
      this.ctx = null;
      this.isSpeaking = false;
      this.preferredVoiceURI = '';
      this.speechTimer = null;
      this.speechSessionId = 0;
      this.speechListeners = [];
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
      } else {
        this.stopSpeech();
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

    /** Register a callback invoked whenever speaking state changes */
    onSpeechStateChange(listener) {
      if (typeof listener === 'function') {
        this.speechListeners.push(listener);
      }
    }

    notifySpeechState(speaking) {
      this.isSpeaking = Boolean(speaking);
      for (let i = 0; i < this.speechListeners.length; i++) {
        try {
          this.speechListeners[i](this.isSpeaking);
        } catch (_e) {
          // Ignore listener errors
        }
      }
    }

    setPreferredVoiceURI(uri) {
      this.preferredVoiceURI = uri || '';
    }

    getSpeechBcp47(langCode) {
      return LANG_SPEECH_CODES[langCode] || 'en-US';
    }

    getVoicesForLang(langCode) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
      const voices = window.speechSynthesis.getVoices() || [];
      const targetBcp = this.getSpeechBcp47(langCode).toLowerCase();
      const prefix = targetBcp.split('-')[0];

      // For Cantonese (yue -> zh-HK), prioritize zh-hk / yue voices before general zh
      if (langCode === 'yue') {
        const hkVoices = voices.filter((v) => {
          const vl = (v.lang || '').toLowerCase();
          return vl.includes('hk') || vl.includes('yue') || (v.name || '').toLowerCase().includes('cantonese') || (v.name || '').toLowerCase().includes('hong kong');
        });
        if (hkVoices.length > 0) return hkVoices;
      }

      const exact = voices.filter((v) => (v.lang || '').toLowerCase().replace('_', '-') === targetBcp);
      const partial = voices.filter((v) => {
        const vl = (v.lang || '').toLowerCase().replace('_', '-');
        return vl !== targetBcp && vl.startsWith(prefix);
      });
      return exact.concat(partial);
    }

    pickBestVoice(langCode, preferLocalOnly) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
      const allVoices = window.speechSynthesis.getVoices() || [];
      if (this.preferredVoiceURI && !preferLocalOnly) {
        const chosen = allVoices.find((v) => v.voiceURI === this.preferredVoiceURI || v.name === this.preferredVoiceURI);
        if (chosen) return chosen;
      }
      const candidates = this.getVoicesForLang(langCode);
      const pool = preferLocalOnly ? candidates.filter((v) => v.localService) : candidates;
      if (pool.length === 0) return candidates[0] || null;

      return (
        pool.find((v) => /Natural|Premium|Enhanced|Google|Siri|Samantha|Kyoko|Ting-Ting|Sin-ji|Mei-Jia|Yuna|Paulina|Monica|Thomas|Anna|Maged/i.test(v.name)) ||
        pool.find((v) => v.localService) ||
        pool[0]
      );
    }

    stopSpeech() {
      this.speechSessionId += 1;
      if (this.speechTimer) {
        clearTimeout(this.speechTimer);
        this.speechTimer = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (_e) {
          // Ignore cancel error
        }
      }
      this.notifySpeechState(false);
    }

    speakText(text, langCode) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) {
        return false;
      }

      if (this.isSpeaking) {
        this.stopSpeech();
        return false;
      }

      this.stopSpeech();
      const sessionId = ++this.speechSessionId;
      const targetBcp = this.getSpeechBcp47(langCode || 'en');

      const cleaned = String(text)
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleaned) return false;

      const rawSentences = cleaned.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [cleaned];
      const chunks = rawSentences.map((s) => s.trim()).filter((s) => s.length > 0);
      if (chunks.length === 0) return false;

      this.notifySpeechState(true);

      this.speechTimer = setTimeout(() => {
        if (sessionId !== this.speechSessionId) return;
        let index = 0;

        const speakNextChunk = (useLocalFallback) => {
          if (sessionId !== this.speechSessionId) return;
          if (index >= chunks.length) {
            this.notifySpeechState(false);
            return;
          }

          const chunkText = chunks[index];
          const utterance = new SpeechSynthesisUtterance(chunkText);
          utterance.lang = targetBcp;
          utterance.rate = 0.96;
          utterance.pitch = 1.0;

          const voice = this.pickBestVoice(langCode || 'en', Boolean(useLocalFallback));
          if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang || targetBcp;
          }

          utterance.onend = () => {
            if (sessionId !== this.speechSessionId) return;
            index += 1;
            speakNextChunk(useLocalFallback);
          };

          utterance.onerror = (err) => {
            if (sessionId !== this.speechSessionId) return;
            if (err && (err.error === 'interrupted' || err.error === 'canceled')) {
              return;
            }
            if (!useLocalFallback) {
              speakNextChunk(true);
            } else {
              index += 1;
              speakNextChunk(true);
            }
          };

          window.speechSynthesis.speak(utterance);
        };

        speakNextChunk(false);
      }, 45);

      return true;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OnePieceSoundFX, LANG_SPEECH_CODES };
  }
  root.OnePieceSoundFX = OnePieceSoundFX;
})(typeof window !== 'undefined' ? window : globalThis);
