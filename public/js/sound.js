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

  function formatCantoneseInteger(numValue) {
    var n = Math.floor(Math.abs(Number(numValue) || 0));
    if (!isFinite(n) || n === 0) return '零';
    var yi = Math.floor(n / 100000000);
    var remAfterYi = n % 100000000;
    var wan = Math.floor(remAfterYi / 10000);
    var rem = remAfterYi % 10000;
    var out = '';
    if (yi > 0) out += String(yi) + '億';
    if (wan > 0) out += String(wan) + '萬';
    if (rem > 0 || out === '') out += String(rem);
    return out;
  }

  function isCantoneseVoiceObj(v) {
    if (!v) return false;
    var vl = String(v.lang || '').toLowerCase().replace(/_/g, '-');
    var vn = String((v.name || '') + ' ' + (v.voiceURI || ''));
    if (/^(yue|zh-hk|zh-mo|zh-hant-hk|zh-hant-mo)/i.test(vl)) return true;
    if (/Sinji|Sin-ji|HiuGaai|HiuMaan|WanLung|Cantonese|Hong\s*Kong|Macau|粵|粤|廣東|广东|香港/i.test(vn)) return true;
    return false;
  }

  class OnePieceSoundFX {
    constructor(initialEnabled) {
      this.enabled = initialEnabled !== false;
      this.ctx = null;
      this.isSpeaking = false;
      this.preferredVoiceURI = '';
      this.speechTimer = null;
      this.speechSessionId = 0;
      this.speechListeners = [];
      this._voicesBound = false;
      this.prewarmVoices();
    }

    prewarmVoices() {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.getVoices();
        if (!this._voicesBound && typeof window.speechSynthesis.addEventListener === 'function') {
          this._voicesBound = true;
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            try {
              window.speechSynthesis.getVoices();
            } catch (_e) {
              // Ignore voice refresh errors
            }
          });
        }
      } catch (_e) {
        // Ignore prewarm errors in headless environments
      }
    }

    ensureVoicesReady(callback, timeoutMs) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !window.speechSynthesis) {
        callback();
        return;
      }
      let existing = [];
      try {
        existing = window.speechSynthesis.getVoices() || [];
      } catch (_e) {
        existing = [];
      }
      if (existing.length > 0 || typeof window.speechSynthesis.addEventListener !== 'function') {
        callback();
        return;
      }
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (typeof window.speechSynthesis.removeEventListener === 'function') {
          try {
            window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
          } catch (_e) {
            // Ignore remove listener error
          }
        }
        callback();
      };
      const onVoices = () => finish();
      try {
        window.speechSynthesis.addEventListener('voiceschanged', onVoices);
      } catch (_e) {
        finish();
        return;
      }
      setTimeout(finish, typeof timeoutMs === 'number' ? timeoutMs : 300);
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

    ensureCtx() {
      return this.ensureContext();
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

      // For Cantonese (yue -> zh-HK / yue-HK), strictly prioritize Hong Kong / Macau Cantonese voices
      if (langCode === 'yue') {
        const hkVoices = voices.filter((v) => isCantoneseVoiceObj(v));
        if (hkVoices.length > 0) return hkVoices;
        const zhFallback = voices.filter((v) => {
          const vl = String(v.lang || '').toLowerCase().replace(/_/g, '-');
          return vl.startsWith('zh-tw') || vl.startsWith('zh-hant') || vl.startsWith('zh');
        });
        return zhFallback;
      }

      const exact = voices.filter((v) => (v.lang || '').toLowerCase().replace(/_/g, '-') === targetBcp);
      const partial = voices.filter((v) => {
        const vl = (v.lang || '').toLowerCase().replace(/_/g, '-');
        return vl !== targetBcp && vl.startsWith(prefix);
      });
      return exact.concat(partial);
    }

    pickBestVoice(langCode, preferLocalOnly) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
      const allVoices = window.speechSynthesis.getVoices() || [];
      if (this.preferredVoiceURI && !preferLocalOnly) {
        const chosen = allVoices.find((v) => v.voiceURI === this.preferredVoiceURI || v.name === this.preferredVoiceURI);
        if (chosen) {
          if (langCode !== 'yue' || isCantoneseVoiceObj(chosen)) {
            return chosen;
          }
        }
      }
      const candidates = this.getVoicesForLang(langCode);
      const pool = preferLocalOnly ? candidates.filter((v) => v.localService) : candidates;
      const activePool = pool.length > 0 ? pool : candidates;
      if (activePool.length === 0) return null;

      if (langCode === 'yue') {
        return (
          activePool.find((v) => /Natural|Neural|Premium|Enhanced/i.test(v.name) && isCantoneseVoiceObj(v)) ||
          activePool.find((v) => /Sinji|Sin-ji|HiuGaai|HiuMaan|WanLung|Google.*(粵|粤|Cantonese|Hong\s*Kong|香港)/i.test(String(v.name || '') + ' ' + String(v.voiceURI || ''))) ||
          activePool.find((v) => v.localService && isCantoneseVoiceObj(v)) ||
          activePool[0]
        );
      }

      return (
        activePool.find((v) => /Natural|Neural|Premium|Enhanced|Google|Siri|Samantha|Kyoko|Ting-Ting|Sinji|Sin-ji|Mei-Jia|Yuna|Paulina|Monica|Thomas|Anna|Maged/i.test(v.name)) ||
        activePool.find((v) => v.localService) ||
        activePool[0]
      );
    }

    prepareSpeechText(rawText, langCode) {
      if (!rawText) return '';
      let text = String(rawText)
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (langCode === 'yue') {
        text = text
          .replace(/฿\s*([0-9][0-9,]*)/g, (_m, numStr) => {
            const digits = Number(String(numStr).replace(/,/g, ''));
            return formatCantoneseInteger(digits) + '貝里';
          })
          .replace(/\b([0-9]{1,3}(?:,[0-9]{3})+)\b/g, (_m, numStr) => {
            const digits = Number(String(numStr).replace(/,/g, ''));
            return formatCantoneseInteger(digits);
          })
          .replace(/\b3D\b/gi, '立體')
          .replace(/\b2D\b/gi, '平面')
          .replace(/\b1v1\b/gi, '一對一')
          .replace(/\bVS\.?\b/gi, '對決')
          .replace(/\bCP0\b/gi, '世界政府最高諜報機關')
          .replace(/\bCP9\b/gi, '九號諜報機關')
          .replace(/\bSSG\b/gi, '特殊科學班')
          .replace(/\bMADS\b/gi, '非法科學研究團隊')
          .replace(/\bSMILE\b/gi, '人造惡魔果實')
          .replace(/\bDNA\b/gi, '基因')
          .replace(/\bVIVRE\b/gi, '生命卡')
          .replace(/\bPWR\b/gi, '戰力')
          .replace(/\bOne\s+Piece\b/gi, '大秘寶')
          .replace(/[A-Za-z]{2,}/g, ' ')
          .replace(/(^|[^・A-Za-z])[A-Za-z](?![・之A-Za-z])/g, '$1')
          .replace(/\s*[•·]\s*/g, '，')
          .replace(/([\u4e00-\u9fff，。！？：；、「」『』（）])\s+([\u4e00-\u9fff，。！？：；、「」『』（）])/g, '$1$2')
          .replace(/([\u4e00-\u9fff，。！？：；、「」『』（）])\s+([\u4e00-\u9fff，。！？：；、「」『』（）])/g, '$1$2')
          .replace(/[，,]{2,}/g, '，')
          .replace(/\s+/g, ' ')
          .trim();
      }
      return text;
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
      const activeLang = langCode || 'en';
      const sessionId = ++this.speechSessionId;
      const targetBcp = this.getSpeechBcp47(activeLang);

      const cleaned = this.prepareSpeechText(text, activeLang);
      if (!cleaned) return false;

      const rawSentences = cleaned.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [cleaned];
      const chunks = rawSentences.map((s) => s.trim()).filter((s) => s.length > 0);
      if (chunks.length === 0) return false;

      this.notifySpeechState(true);

      this.speechTimer = setTimeout(() => {
        if (sessionId !== this.speechSessionId) return;
        this.ensureVoicesReady(() => {
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
            utterance.rate = activeLang === 'yue' ? 0.94 : 0.96;
            utterance.pitch = 1.0;

            const voice = this.pickBestVoice(activeLang, Boolean(useLocalFallback));
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
        }, 300);
      }, 45);

      return true;
    }

    /**
     * Plays a character's iconic One Piece laugh ("Shishishishi!", "Zehahahaha!", "Gurararara!", or Cantonese "嘻嘻嘻嘻！")
     * using custom pitch/rate Web Speech synthesis + comic bounce chime fallback!
     */
    playSignatureLaugh(laughText, pitch, rate, langCode) {
      this.playLogPoseChime();
      if (
        !laughText ||
        typeof window === 'undefined' ||
        !('speechSynthesis' in window) ||
        typeof window.SpeechSynthesisUtterance !== 'function'
      ) {
        return false;
      }
      this.stopSpeech();
      const activeLang = langCode || 'en';
      const sessionId = ++this.speechSessionId;
      const targetBcp = this.getSpeechBcp47(activeLang);
      const cleaned = this.prepareSpeechText(laughText, activeLang);
      if (!cleaned) return false;

      this.speechTimer = setTimeout(() => {
        if (sessionId !== this.speechSessionId) return;
        this.ensureVoicesReady(() => {
          if (sessionId !== this.speechSessionId) return;
          const utterance = new SpeechSynthesisUtterance(cleaned);
          utterance.lang = targetBcp;
          utterance.pitch = typeof pitch === 'number' ? Math.max(0.4, Math.min(1.8, pitch)) : 1.05;
          utterance.rate = typeof rate === 'number' ? Math.max(0.65, Math.min(1.4, rate)) : 1.05;
          const voice = this.pickBestVoice(activeLang, false);
          if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang || targetBcp;
          }
          window.speechSynthesis.speak(utterance);
        }, 300);
      }, 40);
      return true;
    }

    // Thousand Sunny Coup de Burst (3 Barrels of Cola Rocket Launch!)
    playCoupDeBurst() {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Rising cola pressure whistle + rocket blast
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.85);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.88);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.9);
    }

    // Thousand Sunny Lion Mane Gaon Cannon Beam!
    playGaonCannon() {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      this.tone(220, now, 0.18, 'triangle', 0.1);
      this.tone(440, now + 0.14, 0.22, 'sine', 0.12);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(620, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.95);
      gain.gain.setValueAtTime(0.14, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.98);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.28);
      osc.stop(now + 1.0);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OnePieceSoundFX, LANG_SPEECH_CODES };
  }
  root.OnePieceSoundFX = OnePieceSoundFX;
})(typeof window !== 'undefined' ? window : globalThis);

