/**
 * Grand Line 3D Portal — Safe DOM Helper & Validated LocalStorage State Persistence
 * Strictly avoids innerHTML, outerHTML, insertAdjacentHTML, and document.write (XSS-safe by design).
 */

'use strict';

(function (root) {
  const STORAGE_KEY = 'onepiece_3d_portal_v2_state';
  const PONEGLYPH_KEYS = ['zou', 'wholeCake', 'wano', 'quiz'];

  function el(tag, options, children) {
    const node = document.createElement(tag);
    const opts = options || {};

    if (opts.className) node.className = opts.className;
    if (opts.id) node.id = opts.id;
    if (opts.text !== undefined && opts.text !== null) {
      node.textContent = String(opts.text);
    }
    if (opts.type) node.type = opts.type;
    if (opts.value !== undefined) node.value = String(opts.value);
    if (opts.placeholder) node.placeholder = opts.placeholder;
    if (opts.disabled) node.disabled = Boolean(opts.disabled);
    if (opts.selected) node.selected = Boolean(opts.selected);
    if (opts.src) {
      const rawSrc = String(opts.src);
      node.src =
        rawSrc.startsWith('/assets/characters/') && !rawSrc.includes('?')
          ? `${rawSrc}?v=4`
          : rawSrc;
    }
    if (opts.alt !== undefined) node.alt = opts.alt;
    if (opts.loading) node.loading = opts.loading;
    if (opts.title) node.title = opts.title;
    if (opts.min !== undefined) node.min = String(opts.min);
    if (opts.max !== undefined) node.max = String(opts.max);
    if (opts.step !== undefined) node.step = String(opts.step);

    if (opts.attrs) {
      Object.entries(opts.attrs).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          node.setAttribute(k, String(v));
        }
      });
    }

    if (opts.style) {
      Object.entries(opts.style).forEach(([k, v]) => {
        node.style[k] = v;
      });
    }

    if (typeof opts.onClick === 'function') {
      node.addEventListener('click', opts.onClick);
    }
    if (typeof opts.onChange === 'function') {
      node.addEventListener('change', opts.onChange);
    }
    if (typeof opts.onInput === 'function') {
      node.addEventListener('input', opts.onInput);
    }

    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child instanceof Node) {
          node.appendChild(child);
        } else if (typeof child === 'string') {
          node.appendChild(document.createTextNode(child));
        }
      });
    }

    return node;
  }

  function clearNode(node) {
    while (node && node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function formatBerry(amount) {
    const num = Number(amount) || 0;
    if (num <= 0) return '0';
    return num.toLocaleString('en-US');
  }

  function loadPortalProgress() {
    const defaults = {
      soundEnabled: true,
      poneglyphs: {
        zou: false,
        wholeCake: false,
        wano: false,
        quiz: false
      },
      budgetMode: 'yonko-cap',
      crewDraft: {
        captain: 'luffy',
        'first-mate': 'zoro',
        navigator: 'nami',
        'cook-doctor': 'sanji',
        helmsman: 'jinbe'
      }
    };

    try {
      if (!root.localStorage) return defaults;
      const raw = root.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return defaults;

      const safePoneglyphs = { ...defaults.poneglyphs };
      if (parsed.poneglyphs && typeof parsed.poneglyphs === 'object') {
        PONEGLYPH_KEYS.forEach((key) => {
          safePoneglyphs[key] = Boolean(parsed.poneglyphs[key]);
        });
      }

      const safeCrew = { ...defaults.crewDraft };
      if (parsed.crewDraft && typeof parsed.crewDraft === 'object') {
        Object.keys(safeCrew).forEach((slot) => {
          if (typeof parsed.crewDraft[slot] === 'string' && parsed.crewDraft[slot].length < 40) {
            safeCrew[slot] = parsed.crewDraft[slot];
          }
        });
      }

      return {
        soundEnabled: parsed.soundEnabled !== false,
        poneglyphs: safePoneglyphs,
        budgetMode: parsed.budgetMode === 'unlimited' ? 'unlimited' : 'yonko-cap',
        crewDraft: safeCrew
      };
    } catch (_err) {
      return defaults;
    }
  }

  function savePortalProgress(progress) {
    try {
      if (!root.localStorage || !progress) return;
      const payload = {
        soundEnabled: progress.soundEnabled !== false,
        poneglyphs: {
          zou: Boolean(progress.poneglyphs && progress.poneglyphs.zou),
          wholeCake: Boolean(progress.poneglyphs && progress.poneglyphs.wholeCake),
          wano: Boolean(progress.poneglyphs && progress.poneglyphs.wano),
          quiz: Boolean(progress.poneglyphs && progress.poneglyphs.quiz)
        },
        budgetMode: progress.budgetMode === 'unlimited' ? 'unlimited' : 'yonko-cap',
        crewDraft: progress.crewDraft || {}
      };
      root.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_err) {
      // Ignore storage quota / privacy mode errors cleanly
    }
  }

  function countPoneglyphs(poneglyphs) {
    if (!poneglyphs) return 0;
    return PONEGLYPH_KEYS.reduce((acc, k) => acc + (poneglyphs[k] ? 1 : 0), 0);
  }

  root.OP_DOM = {
    el,
    clearNode,
    formatBerry,
    loadPortalProgress,
    savePortalProgress,
    countPoneglyphs,
    PONEGLYPH_KEYS
  };
})(typeof window !== 'undefined' ? window : globalThis);
