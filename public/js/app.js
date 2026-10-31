/**
 * Grand Line 3D Portal (V2) — Modular Era-Safe Controller, Road Poneglyph Quest,
 * Bounty Evolution Stepper, Search/Sort, Sound FX & 7-Tab Explorer
 *
 * Security compliance (mandatory-secure-web-skills):
 * - Zero usage of innerHTML, outerHTML, insertAdjacentHTML, document.write, or eval
 * - All DOM nodes constructed strictly via OP_DOM.el() (createElement + textContent)
 * - Validated localStorage state & zero blocking native dialogs
 */

'use strict';

(function () {
  const DATA = window.ONE_PIECE_DATA;
  const HELPERS = window.OP_HELPERS;
  const {
    el,
    clearNode,
    formatBerry,
    loadPortalProgress,
    savePortalProgress,
    countPoneglyphs
  } = window.OP_DOM;

  const I18N = window.OnePieceI18n;
  const ANALYTICS = window.OnePieceAnalytics;
  const saved = loadPortalProgress();
  const soundFX = new window.OnePieceSoundFX(saved.soundEnabled);

  function getInitialTheme() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const urlTheme = params.get('theme');
      if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme;
      const stored = window.localStorage.getItem('onepiece-theme-pref');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (_e) {
      // Ignore storage errors
    }
    return 'light';
  }

  const state = {
    lang: I18N ? I18N.getInitialLanguage() : 'en',
    theme: getInitialTheme(),
    activeNarrationText: '',
    activeTab: 'characters', // 'characters' | 'globe' | 'maps' | 'ships' | 'devil-fruits' | 'crew' | 'timeline' | 'lore'
    eraFilter: 'egghead',
    showQuestDrawer: false,
    justUnlockedBanner: '',
    soundEnabled: saved.soundEnabled,
    poneglyphs: saved.poneglyphs,
    budgetMode: saved.budgetMode,
    crewDraft: saved.crewDraft,

    selectedLocationId: 'east-blue',
    globeCategoryFilter: 'All',

    activeMapId: 'grandline-sea-chart',
    selectedHotspotIndex: 0,

    activeArcIndex: 0,
    autoSailInterval: null,

    selectedShipId: 'thousand-sunny',
    selectedDockChannel: 2,
    selectedShipRoomId: 'gaon-figurehead',

    selectedCharacterId: 'luffy',
    selectedBountyIndex: null, // null = latest unlocked milestone for active era
    luffyUseGear5Photo: true,
    rivalCharacterId: 'kaido',
    characterFactionFilter: 'All',
    characterSearch: '',
    characterSort: 'story', // 'story' | 'bounty' | 'power'
    activeArtBanner: 'strawhat', // 'strawhat' | 'yonko' | 'warlords' | 'favorites' | 'egghead'
    charDrawerCombat: false,
    charDrawerClash: false,
    charDrawerArt: false,

    selectedFruitId: 'gomu-nika',
    fruitCategoryFilter: 'All',
    fruitSearch: '',
    activeZukanBanner: 'paramecia',

    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    selectedQuizOption: null
  };

  let engine3D = null;

  function getStrings() {
    return I18N ? I18N.getStrings(state.lang) : {};
  }

  function syncReadAloudButtonsUI(speaking) {
    const t = getStrings();
    const label = speaking ? (t.stopReading || '⏹ Stop Reading') : (t.readAloud || '🗣️ Read Aloud');
    const mainBtn = document.getElementById('btn-read-aloud-main');
    if (mainBtn) {
      mainBtn.textContent = label;
      mainBtn.classList.toggle('speaking', Boolean(speaking));
      mainBtn.setAttribute('aria-pressed', speaking ? 'true' : 'false');
    }
    const cardBtns = document.querySelectorAll('.card-read-aloud-btn');
    cardBtns.forEach((btn) => {
      btn.textContent = label;
      btn.classList.toggle('speaking', Boolean(speaking));
      btn.setAttribute('aria-pressed', speaking ? 'true' : 'false');
    });
  }

  function applyThemeMode(themeMode, persistUserChoice = false) {
    state.theme = themeMode === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = state.theme;
    try {
      window.localStorage.removeItem('onepiece-theme');
      if (persistUserChoice) {
        window.localStorage.setItem('onepiece-theme-pref', state.theme);
      }
    } catch (_e) {
      // Ignore storage error
    }
    const t = getStrings();
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.textContent =
        state.theme === 'dark' ? (t.themeLight || '☀️ Light') : (t.themeDark || '🌙 Dark');
      themeBtn.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
    }
  }

  function populateVoiceOptions() {
    const voiceSelect = document.getElementById('narrator-voice-select');
    if (!voiceSelect) return;
    const t = getStrings();
    const prevValue = voiceSelect.value;
    clearNode(voiceSelect);
    voiceSelect.appendChild(
      el('option', { value: '', text: t.autoVoice || '✨ Best Voice (Auto)' })
    );
    const voices = soundFX.getVoicesForLang(state.lang);
    voices.forEach((v) => {
      const tag = v.localService ? 'HQ' : 'Cloud';
      voiceSelect.appendChild(
        el('option', {
          value: v.voiceURI || v.name,
          text: v.name + ' (' + v.lang + ' · ' + tag + ')'
        })
      );
    });
    if (prevValue && Array.from(voiceSelect.options).some((o) => o.value === prevValue)) {
      voiceSelect.value = prevValue;
    } else {
      voiceSelect.value = '';
      soundFX.setPreferredVoiceURI('');
    }
  }

  function applyLanguageUI() {
    if (!I18N) return;
    const meta = I18N.getLanguageMeta(state.lang);
    const t = I18N.getStrings(state.lang);
    const isYue = state.lang === 'yue';
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir || 'ltr';

    const langSelect = document.getElementById('lang-select');
    if (langSelect && langSelect.value !== meta.code) {
      langSelect.value = meta.code;
    }

    const brandTitle = document.getElementById('portal-brand-title');
    if (brandTitle && t.brandTitle) brandTitle.textContent = t.brandTitle;

    const brandSub = document.getElementById('portal-brand-subtitle');
    if (brandSub && t.brandSubtitle) brandSub.textContent = t.brandSubtitle;

    const moreSummary = document.querySelector('#header-more-menu > summary');
    if (moreSummary) {
      moreSummary.textContent = t.moreMenuBtn || (isYue ? '⚙️ 更多設定' : '⚙️ More');
    }

    const langLabel = document.querySelector('label[for="lang-select"]');
    if (langLabel) {
      langLabel.textContent = t.langMenuLabel || (isYue ? '🌐 語言' : '🌐 Language');
    }

    const voiceLabel = document.getElementById('narrator-voice-label');
    if (voiceLabel && t.voiceLabel) voiceLabel.textContent = t.voiceLabel;

    const cookieSettingsBtn = document.getElementById('btn-cookie-settings');
    if (cookieSettingsBtn) {
      cookieSettingsBtn.textContent =
        t.cookiePrefsBtn || (isYue ? '🍪 私隱及分析設定' : '🍪 Privacy Preferences');
    }

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.textContent = state.soundEnabled
        ? (t.soundOn || '🔊 Sound FX: ON')
        : (t.soundOff || '🔇 Sound FX: OFF');
    }

    const spoilerLabel = document.getElementById('spoiler-shield-label');
    if (spoilerLabel && t.spoilerLabel) spoilerLabel.textContent = t.spoilerLabel;

    const optEgghead = document.getElementById('spoiler-opt-egghead');
    if (optEgghead && t.spoilerEgghead) optEgghead.textContent = t.spoilerEgghead;
    const optWano = document.getElementById('spoiler-opt-wano');
    if (optWano && t.spoilerWano) optWano.textContent = t.spoilerWano;
    const optPre = document.getElementById('spoiler-opt-pre');
    if (optPre && t.spoilerPreTimeskip) optPre.textContent = t.spoilerPreTimeskip;
    const optEast = document.getElementById('spoiler-opt-east');
    if (optEast && t.spoilerEastBlue) optEast.textContent = t.spoilerEastBlue;

    const tabMap = {
      globe: t.tabWorld,
      maps: t.tabMaps,
      timeline: t.tabTimeline,
      ships: t.tabShips,
      characters: t.tabCharacters,
      crew: t.tabCrew,
      'devil-fruits': t.tabFruits,
      lore: t.tabLore
    };
    document.querySelectorAll('[data-tab-btn]').forEach((btn) => {
      const key = btn.getAttribute('data-tab-btn');
      if (tabMap[key]) btn.textContent = tabMap[key];
    });

    const viewSwitchLabels = isYue
      ? {
          '3d-globe': '🌍 立體星球',
          'grandline-sea-chart': '🗺️ 偉大航道',
          'reverse-mountain-x-map': '⛰️ 顛倒山',
          'vertical-cross-section-map': '☁️ 空島與深海',
          'wano-onigashima-woodblock-map': '🐉 和之國',
          'thousand-sunny-cutaway': '⛵ 千陽號藍圖',
          'egghead-elbaph-map': '🧠 蛋頭島與艾爾巴夫'
        }
      : {
          '3d-globe': '🌍 3D Globe',
          'grandline-sea-chart': '🗺️ Grand Line',
          'reverse-mountain-x-map': '⛰️ Reverse Mtn',
          'vertical-cross-section-map': '☁️ Sky & Depth',
          'wano-onigashima-woodblock-map': '🐉 Wano',
          'thousand-sunny-cutaway': '⛵ Sunny Blueprint',
          'egghead-elbaph-map': '🧠 Egghead & Elbaph'
        };
    document.querySelectorAll('[data-view-switch]').forEach((btn) => {
      const key = btn.getAttribute('data-view-switch');
      if (viewSwitchLabels[key]) btn.textContent = viewSwitchLabels[key];
    });

    const btnZoomIn = document.getElementById('hud-zoom-in');
    if (btnZoomIn && t.zoomIn) btnZoomIn.textContent = t.zoomIn;
    const btnZoomOut = document.getElementById('hud-zoom-out');
    if (btnZoomOut && t.zoomOut) btnZoomOut.textContent = t.zoomOut;
    const btnReset = document.getElementById('hud-reset');
    if (btnReset && t.resetView) btnReset.textContent = t.resetView;
    const btnSpin = document.getElementById('hud-toggle-spin');
    if (btnSpin && engine3D) {
      btnSpin.textContent = engine3D.autoRotate
        ? (t.pauseSpin || '⏸ Pause Spin')
        : (t.autoSpin || '▶ Auto Spin');
    }
    const btnTiltX = document.getElementById('hud-tilt-x');
    if (btnTiltX && engine3D) {
      btnTiltX.textContent = engine3D.useCanonicalTilt
        ? (t.tilt45 || '🧭 45° X-Tilt')
        : (t.tiltFlat || '🧭 Flat Tilt');
    }

    const cookieTitle = document.getElementById('cookie-banner-title');
    if (cookieTitle && t.cookieTitle) cookieTitle.textContent = t.cookieTitle;
    const cookieText = document.getElementById('cookie-banner-text');
    if (cookieText && t.cookieText) cookieText.textContent = t.cookieText;
    const cookieAccept = document.getElementById('btn-cookie-accept');
    if (cookieAccept && t.cookieAccept) cookieAccept.textContent = t.cookieAccept;
    const cookieDecline = document.getElementById('btn-cookie-decline');
    if (cookieDecline && t.cookieDecline) cookieDecline.textContent = t.cookieDecline;

    updatePoneglyphHeaderUI();
    applyThemeMode(state.theme);
    populateVoiceOptions();
    syncReadAloudButtonsUI(soundFX.isSpeaking);
  }

  function enhanceInspectorWithI18nAndReadAloud(container) {
    if (!container || !I18N) return;
    const t = I18N.getStrings(state.lang);
    const isYue = state.lang === 'yue';

    // Localize common section subheads inside the rendered inspector
    container.querySelectorAll('.section-subhead').forEach((sub) => {
      const txt = sub.textContent || '';
      if (txt.includes('Explorer Notes for Kids')) sub.textContent = t.explorerNotes;
      else if (txt.includes('Bounty Evolution')) sub.textContent = t.bountyEvolution;
      else if (txt.includes('Devil Fruit / Fighting Style')) sub.textContent = t.devilFruitStyle;
      else if (txt.includes('Haki Mastery')) sub.textContent = t.hakiMastery;
      else if (txt.includes('Signature Techniques')) sub.textContent = t.signatureMoves;
      else if (txt.includes('6-Axis Power Radar')) sub.textContent = t.powerRadarTitle;
      else if (txt.includes('1v1 Grand Line Clash Simulator')) sub.textContent = t.clashSimulatorTitle;
      else if (txt.includes('Natural Weakness')) sub.textContent = t.naturalWeakness;
      else if (txt.includes('Test Haki in the 3D Viewport')) sub.textContent = t.testHakiViewport;
    });

    // Attach a Read Aloud button to every feature card & wanted poster card
    const cards = container.querySelectorAll('.feature-card, .wanted-poster-card');
    let firstNarration = '';

    cards.forEach((card) => {
      const isVisibleForSpeech = (node) =>
        !node.closest('details:not([open])');

      const titleEl = card.querySelector('.card-title, .wanted-char-name');
      const subEl = card.querySelector('.card-subtitle, .wanted-epithet');
      const bodyEls = Array.from(card.querySelectorAll('.card-body-text')).filter(isVisibleForSpeech);
      const factEls = Array.from(card.querySelectorAll('.fact-item, .lore-step-block')).filter(
        isVisibleForSpeech
      );

      const title = titleEl ? titleEl.textContent.trim() : '';
      const subtitle = subEl ? subEl.textContent.trim() : '';
      const summary = bodyEls
        .map((n) => n.textContent.trim())
        .filter(Boolean)
        .join(isYue ? ' ' : ' ');
      let notes = factEls
        .map((n) => {
          if (n.classList && n.classList.contains('lore-step-block')) {
            const h = n.querySelector('.lore-step-heading');
            const d = n.querySelector('.lore-step-detail');
            if (h && d) {
              return h.textContent.trim() + (isYue ? '：' : ': ') + d.textContent.trim();
            }
          }
          return n.textContent.trim();
        })
        .filter(Boolean);

      // For interactive Quiz cards without .card-body-text, include quiz options & explanation so Read Aloud reads the full quiz!
      if (!summary && notes.length === 0) {
        const quizOpts = Array.from(card.querySelectorAll('.quiz-opt-btn, .lesson-callout p'))
          .filter(isVisibleForSpeech)
          .map((n) => n.textContent.trim())
          .filter(Boolean);
        if (quizOpts.length > 0) {
          notes = quizOpts;
        }
      }

      const narration = I18N.buildCardNarrationText(state.lang, {
        title: title,
        subtitle: subtitle,
        summary: summary,
        notes: notes
      });

      if (!firstNarration && (title || summary)) {
        firstNarration = narration;
      }

      const kickerRow = card.querySelector('.card-kicker-row');
      if (kickerRow && !kickerRow.querySelector('.card-read-aloud-btn')) {
        const readBtn = el('button', {
          type: 'button',
          className: 'card-read-aloud-btn' + (soundFX.isSpeaking ? ' speaking' : ''),
          text: soundFX.isSpeaking ? (t.stopReading || '⏹ Stop Reading') : (t.readAloud || '🗣️ Read Aloud'),
          ariaPressed: soundFX.isSpeaking ? 'true' : 'false',
          onClick: () => {
            soundFX.speakText(narration, state.lang);
            if (ANALYTICS) {
              ANALYTICS.trackEvent('read_aloud', { tab: state.activeTab, lang: state.lang, title: title });
            }
          }
        });
        kickerRow.appendChild(readBtn);
      }
    });

    if (firstNarration) {
      state.activeNarrationText = firstNarration;
    }
  }

  function persistState() {
    savePortalProgress({
      soundEnabled: state.soundEnabled,
      poneglyphs: state.poneglyphs,
      budgetMode: state.budgetMode,
      crewDraft: state.crewDraft
    });
  }

  function isEraAllowed(itemEra) {
    return HELPERS.isEraAllowed(itemEra, state.eraFilter);
  }

  function getSafeCharacterById(charId) {
    const raw = DATA.characters.find((c) => c.id === charId) || DATA.characters[0];
    return HELPERS.getCharacterForEra(raw, state.eraFilter, state.lang);
  }

  function getAllowedMaps() {
    const allowed = DATA.canonicalMaps.filter((m) => isEraAllowed(m.era));
    const list = allowed.length > 0 ? allowed : [DATA.canonicalMaps[0]];
    return list.map((m) =>
      HELPERS.getMapForLang ? HELPERS.getMapForLang(m, state.lang) : m
    );
  }

  function getMapById(mapId) {
    const allowed = getAllowedMaps();
    return allowed.find((m) => m.id === mapId) || allowed[0];
  }

  function syncLaughTaleEngineLock() {
    if (!engine3D) return;
    const allFour = countPoneglyphs(state.poneglyphs) === 4;
    engine3D.setLaughTaleUnlocked(allFour && isEraAllowed('wano'));
  }

  function updatePoneglyphHeaderUI() {
    const btn = document.getElementById('poneglyph-status-btn');
    if (!btn) return;
    const t = getStrings();
    const isYue = state.lang === 'yue';
    const count = countPoneglyphs(state.poneglyphs);
    if (count === 4) {
      btn.textContent =
        t.poneglyphUnlocked || (isYue ? '👑 拉夫德爾已解鎖 (4/4)！' : '👑 Laugh Tale Unlocked (4/4)!');
      btn.classList.add('quest-complete');
    } else {
      btn.textContent =
        (t.poneglyphCountPrefix || (isYue ? '🟥 路標歷史本文：' : '🟥 Road Poneglyphs:')) +
        ' ' +
        count +
        '/4';
      btn.classList.remove('quest-complete');
    }
    syncLaughTaleEngineLock();
  }

  function awardPoneglyph(key, label) {
    if (!state.poneglyphs[key]) {
      state.poneglyphs[key] = true;
      persistState();
      const newCount = countPoneglyphs(state.poneglyphs);
      const isYue = state.lang === 'yue';
      soundFX.playTreasureFanfare();
      if (newCount === 4) {
        state.justUnlockedBanner = isYue
          ? '👑 四嚿路標歷史本文全部解讀完成！最終之島「拉夫德爾」嘅赤紅交叉座標已經喺立體星球上面發光解鎖！'
          : '👑 ALL 4 ROAD PONEGLYPHS DECIPHERED! Crimson X-Coordinates to LAUGH TALE are now glowing on the 3D Planet Globe!';
      } else {
        state.justUnlockedBanner = isYue
          ? '🟥 發現路標歷史本文（' + newCount + '/4）：' + label + '！'
          : '🟥 ROAD PONEGLYPH FOUND (' + newCount + '/4): ' + label + '!';
      }
      updatePoneglyphHeaderUI();
    }
  }

  function checkLocationPoneglyphs(locationId) {
    const isYue = state.lang === 'yue';
    if (locationId === 'zou' || locationId === 'zou-zunesha') {
      awardPoneglyph('zou', isYue ? '象主鯨魚森林拓本' : 'Whale Forest Rubbing on Zunesha');
    } else if (locationId === 'whole-cake' || locationId === 'whole-cake-island') {
      awardPoneglyph(
        'wholeCake',
        isYue ? '布魯克潛入萬國寶物庫拓印嘅拓本' : "Brook's Secret Rubbing from Whole Cake Vault"
      );
    } else if (locationId === 'wano' || locationId === 'wano-country') {
      awardPoneglyph(
        'wano',
        isYue ? '沉睡喺舊和之國海底深處嘅拓本' : 'Submerged Old Wano Rubbing beneath Mt. Fuji'
      );
    }
  }

  function stopAutoSail() {
    if (state.autoSailInterval) {
      clearInterval(state.autoSailInterval);
      state.autoSailInterval = null;
    }
  }

  function syncViewportMapButtons() {
    const allowedIds = new Set(getAllowedMaps().map((m) => m.id));
    const viewBtns = document.querySelectorAll('[data-view-switch]');
    viewBtns.forEach((btn) => {
      const key = btn.getAttribute('data-view-switch');
      if (key === '3d-globe') {
        btn.hidden = false;
        return;
      }
      const allowed = allowedIds.has(key);
      btn.hidden = !allowed;
    });

    if (engine3D && engine3D.mode === 'manga-map' && !allowedIds.has(state.activeMapId)) {
      const fallback = getAllowedMaps()[0];
      openMangaMapInViewport(fallback.id);
    }
  }

  function updateViewportSwitcherHighlight(activeViewKey) {
    const viewBtns = document.querySelectorAll('[data-view-switch]');
    viewBtns.forEach((btn) => {
      const key = btn.getAttribute('data-view-switch');
      btn.classList.toggle('active', key === activeViewKey);
    });
  }

  function openMangaMapInViewport(mapId) {
    stopAutoSail();
    const isYue = state.lang === 'yue';
    const mapObj = getMapById(mapId);
    state.activeMapId = mapObj.id;
    state.selectedHotspotIndex = 0;

    if (mapObj.id === 'wano-onigashima-woodblock-map') {
      awardPoneglyph('wano', isYue ? '舊和之國浮世繪海圖卷軸' : 'Old Wano Cartography Scroll');
    }

    engine3D.setActiveMangaMap(mapObj.id);
    engine3D.setMode('manga-map');
    updateViewportSwitcherHighlight(mapObj.id);

    const viewportBadge = document.getElementById('viewport-mode-badge');
    const viewportHint = document.getElementById('viewport-hint-text');
    if (viewportBadge) viewportBadge.textContent = '🗺️ ' + mapObj.badge.toUpperCase();
    if (viewportHint) {
      viewportHint.textContent = isYue
        ? '拖動或用方向鍵平移海圖 • 滾輪放大縮小 • 點擊任何角色地標圖釘睇詳情！'
        : 'Drag or Arrow-keys to pan • Scroll or pinch to zoom • Click any Character Pin!';
    }
  }

  function syncWorkspaceLayout(tabId) {
    const needsViewport =
      tabId === 'globe' ||
      tabId === 'maps' ||
      tabId === 'timeline' ||
      tabId === 'ships' ||
      tabId === 'devil-fruits';

    const portalMain = document.getElementById('portal-main');
    const viewportSection = document.getElementById('viewport-section');
    const mapSwitcher = document.getElementById('viewport-map-switcher');
    const tiltBtn = document.getElementById('hud-tilt-x');

    if (portalMain) {
      portalMain.dataset.layout = needsViewport ? 'split' : 'full';
    }
    if (viewportSection) {
      viewportSection.hidden = !needsViewport;
    }
    if (mapSwitcher) {
      mapSwitcher.hidden = !(tabId === 'globe' || tabId === 'maps');
    }
    if (tiltBtn) {
      tiltBtn.hidden = !(tabId === 'globe' || tabId === 'timeline');
    }
    if (engine3D && typeof engine3D.setViewportVisible === 'function') {
      engine3D.setViewportVisible(needsViewport);
    }
  }

  function switchTab(tabId, silentSound) {
    stopAutoSail();
    soundFX.stopSpeech();
    state.activeTab = tabId;
    if (!silentSound) {
      soundFX.playDenDenMushi();
    }
    if (ANALYTICS) {
      ANALYTICS.trackEvent('switch_tab', { tab: tabId, lang: state.lang });
    }

    const navButtons = document.querySelectorAll('[data-tab-btn]');
    navButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab-btn') === tabId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      btn.setAttribute('tabindex', isMatch ? '0' : '-1');
    });

    syncWorkspaceLayout(tabId);

    const isYue = state.lang === 'yue';
    const viewportBadge = document.getElementById('viewport-mode-badge');
    const viewportHint = document.getElementById('viewport-hint-text');

    if (tabId === 'maps') {
      openMangaMapInViewport(state.activeMapId);
    } else if (tabId === 'ships') {
      const safeShipId = isEraAllowed('pre-timeskip') ? state.selectedShipId : 'going-merry';
      state.selectedShipId = safeShipId;
      engine3D.setShip(safeShipId);
      engine3D.setSelectedDockChannel(state.selectedDockChannel);
      engine3D.setMode('ship-dock');
      updateViewportSwitcherHighlight('3d-globe');
      if (viewportBadge) {
        viewportBadge.textContent = isYue ? '⛵ 水之七島立體造船塢' : '⛵ 3D WATER 7 SHIPWRIGHT DOCK';
      }
      if (viewportHint) {
        viewportHint.textContent = isYue
          ? '拖動 360 度旋轉船體 • 切換透視剖面 • 發射獅吼炮同風來噴射！'
          : 'Drag to rotate 360° • Toggle X-Ray Cutaway • Fire Gaon Cannon & Coup de Burst!';
      }
    } else if (tabId === 'devil-fruits') {
      engine3D.setMode('devil-fruit');
      updateViewportSwitcherHighlight('3d-globe');
      const rawFruit =
        DATA.devilFruits.find((f) => f.id === state.selectedFruitId && isEraAllowed(f.era)) ||
        DATA.devilFruits[0];
      state.selectedFruitId = rawFruit.id;
      engine3D.setDevilFruit(HELPERS.getDevilFruitForEra(rawFruit, state.eraFilter, state.lang));
      if (viewportBadge) {
        viewportBadge.textContent = isYue ? '🍇 立體惡魔果實全息圖鑑' : '🍇 3D DEVIL FRUIT HOLODECK';
      }
      if (viewportHint) {
        viewportHint.textContent = isYue
          ? '拖動或縮放觀察立體惡魔果實 • 點擊「釋放能力特效！」體驗霸氣同果實爆發'
          : 'Drag or pinch to inspect the 3D Devil Fruit • Click "Unleash Power!" for 3D effects';
      }
    } else if (tabId === 'timeline') {
      engine3D.setMode('timeline');
      updateViewportSwitcherHighlight('3d-globe');
      engine3D.focusTimelineArc(state.activeArcIndex);
      if (viewportBadge) {
        viewportBadge.textContent = isYue ? '🧭 記錄指針立體航程' : '🧭 3D LOG POSE VOYAGE';
      }
      if (viewportHint) {
        viewportHint.textContent = isYue
          ? '追蹤黃金梅利號同千陽號橫越偉大航道嘅立體航線！'
          : 'Watch the Going Merry & Thousand Sunny sail shortest-arc routes across the 3D globe!';
      }
    } else if (tabId === 'globe') {
      engine3D.setMode('globe');
      updateViewportSwitcherHighlight('3d-globe');
      if (viewportBadge) {
        viewportBadge.textContent = isYue ? '🌍 海賊王立體星球儀' : '🌍 3D ONE PIECE PLANET GLOBE';
      }
      if (viewportHint) {
        viewportHint.textContent = isYue
          ? '拖動旋轉星球 • 滾輪放大縮小 • 點擊任何發光島嶼地標！'
          : 'Drag to spin • Pinch/scroll to zoom • Click any glowing island pin!';
      }
    }

    renderActivePanel();
  }

  function renderQuestBannerAndDrawer(container) {
    const isYue = state.lang === 'yue';
    if (state.justUnlockedBanner) {
      const toast = el('div', { className: 'poneglyph-toast-banner' }, [
        el('span', { text: state.justUnlockedBanner }),
        el('button', {
          type: 'button',
          className: 'toast-dismiss-btn',
          text: '✕',
          attrs: { 'aria-label': isYue ? '關閉尋寶提示' : 'Dismiss treasure notification' },
          onClick: () => {
            state.justUnlockedBanner = '';
            renderActivePanel();
          }
        })
      ]);
      container.appendChild(toast);
    }

    if (!state.showQuestDrawer) return;

    const quests = [
      {
        key: 'zou',
        title: isYue ? '1. 佐烏鯨魚森林拓本' : '1. Whale Forest Rubbing (Zou)',
        hint: isYue
          ? '喺立體星球造訪佐烏（象主），或者喺時間線航行到佐烏篇！'
          : 'Visit Zou (Zunesha) on the 3D Globe or reach Zou on the Log Pose Timeline!',
        actionText: isEraAllowed('wano')
          ? (isYue ? '🐘 飛往佐烏' : '🐘 Fly to Zou')
          : (isYue ? '🔒 和之國進度解鎖' : '🔒 Unlocks in Wano Mode'),
        canJump: isEraAllowed('wano'),
        onJump: () => {
          state.selectedLocationId = 'zou';
          checkLocationPoneglyphs('zou');
          switchTab('globe');
          engine3D.focusLocation('zou', false);
        }
      },
      {
        key: 'wholeCake',
        title: isYue ? '2. 萬國大媽寶物庫拓本' : "2. Big Mom's Vault Rubbing (Whole Cake)",
        hint: isYue
          ? '查看萬國蛋糕島，或者打開卡塔庫栗／大媽嘅懸賞令！'
          : 'Inspect Whole Cake Island or open Katakuri / Big Mom Wanted Poster!',
        actionText: isEraAllowed('wano')
          ? (isYue ? '🍰 飛往萬國蛋糕島' : '🍰 Fly to Whole Cake')
          : (isYue ? '🔒 和之國進度解鎖' : '🔒 Unlocks in Wano Mode'),
        canJump: isEraAllowed('wano'),
        onJump: () => {
          state.selectedLocationId = 'whole-cake';
          checkLocationPoneglyphs('whole-cake');
          switchTab('globe');
          engine3D.focusLocation('whole-cake', false);
        }
      },
      {
        key: 'wano',
        title: isYue ? '3. 舊和之國海底深處拓本' : '3. Submerged Old Wano Rubbing',
        hint: isYue
          ? '查看和之國、打開和之國海圖，或者釋放任何一粒立體惡魔果實能力！'
          : 'Inspect Wano Country, open the Wano Map, or Unleash any 3D Devil Fruit!',
        actionText: isYue ? '🍇 釋放立體惡魔果實' : '🍇 Unleash a 3D Fruit',
        canJump: true,
        onJump: () => {
          switchTab('devil-fruits');
        }
      },
      {
        key: 'quiz',
        title: isYue ? '4. 航海學者問答試煉' : '4. Navigator Scholar Trial',
        hint: isYue
          ? '答啱任何一條海賊王問答題，或者進行一場一對一霸氣模擬對決！'
          : 'Answer any One Piece Quiz question right or run a 1v1 Haki Clash!',
        actionText: isYue ? '📜 前往問答與霸氣道場' : '📜 Go to Quiz & Haki Dojo',
        canJump: true,
        onJump: () => {
          switchTab('lore');
        }
      }
    ];

    const count = countPoneglyphs(state.poneglyphs);
    const drawer = el('section', { className: 'quest-drawer-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill crimson',
          text: isYue
            ? '🟥 路標歷史本文尋寶任務（' + count + '/4）'
            : '🟥 ROAD PONEGLYPH TREASURE HUNT (' + count + '/4)'
        }),
        el('div', { className: 'chip-row' }, [
          el('button', {
            type: 'button',
            className: 'chip-btn',
            text: isYue ? '🔄 重設尋寶進度' : '🔄 Reset Quest',
            onClick: () => {
              state.poneglyphs = { zou: false, wholeCake: false, wano: false, quiz: false };
              state.justUnlockedBanner = '';
              persistState();
              updatePoneglyphHeaderUI();
              renderActivePanel();
            }
          }),
          el('button', {
            type: 'button',
            className: 'chip-btn active',
            text: isYue ? '關閉' : 'Close',
            onClick: () => {
              state.showQuestDrawer = false;
              renderActivePanel();
            }
          })
        ])
      ]),
      el('p', {
        className: 'card-body-text',
        text:
          count === 4
            ? (isYue
                ? '🎉 太勁喇！你已經集齊全部四嚿赤紅路標歷史本文！切換去「立體世界」（和之國或蛋頭島進度）即可見到四道紅光交匯鎖定拉夫德爾！'
                : '🎉 AMAZING! All 4 Crimson Road Poneglyphs are yours! Switch to the 3D Globe (in Wano Spoiler Mode) to see the 4 red laser beams cross over Laugh Tale!')
            : (isYue
                ? '集齊隱藏喺圖鑑入面嘅四嚿赤紅「路標歷史本文」，即可喺立體星球解鎖海賊王羅傑抵達嘅最終之島——拉夫德爾！'
                : "Find all 4 Crimson Road Poneglyphs hidden across the portal to unlock Gol D. Roger's final island, Laugh Tale, on the 3D Globe!")
      }),
      el(
        'div',
        { className: 'quest-checklist-grid' },
        quests.map((q) => {
          const done = Boolean(state.poneglyphs[q.key]);
          return el('div', { className: 'quest-item-box' + (done ? ' done' : '') }, [
            el('div', {
              className: 'quest-item-title',
              text: (done ? '✅ ' : '⬜ ') + q.title
            }),
            el('p', { className: 'quest-item-hint', text: q.hint }),
            !done && q.canJump
              ? el('button', {
                  type: 'button',
                  className: 'inline-link-btn',
                  text: q.actionText,
                  onClick: q.onJump
                })
              : null
          ]);
        })
      )
    ]);

    container.appendChild(drawer);
  }

  function renderActivePanel() {
    const container = document.getElementById('inspector-content');
    if (!container) return;

    // Preserve active text input focus & cursor position across re-renders (e.g. live Search)
    const prevActive = document.activeElement;
    const prevInputId = prevActive && prevActive.id ? prevActive.id : null;
    const prevSelStart =
      prevInputId && typeof prevActive.selectionStart === 'number'
        ? prevActive.selectionStart
        : null;

    clearNode(container);
    renderQuestBannerAndDrawer(container);

    if (state.activeTab === 'globe') {
      renderGlobeInspector(container);
    } else if (state.activeTab === 'maps') {
      renderMangaMapsInspector(container);
    } else if (state.activeTab === 'timeline') {
      renderTimelineInspector(container);
    } else if (state.activeTab === 'ships') {
      renderShipsInspector(container);
    } else if (state.activeTab === 'characters') {
      renderCharactersInspector(container);
    } else if (state.activeTab === 'crew') {
      window.OP_CREW_BUILDER.renderCrewBuilderTab(container, {
        eraFilter: state.eraFilter,
        lang: state.lang,
        budgetMode: state.budgetMode,
        crewDraft: state.crewDraft,
        setBudgetMode: (mode) => {
          state.budgetMode = mode;
          soundFX.playLogPoseChime();
          persistState();
          renderActivePanel();
        },
        onCrewChanged: () => {
          soundFX.playLogPoseChime();
          persistState();
          renderActivePanel();
        },
        inspectCharacter: (charId) => {
          state.selectedCharacterId = charId;
          state.selectedBountyIndex = null;
          switchTab('characters');
        }
      });
    } else if (state.activeTab === 'devil-fruits') {
      renderDevilFruitsInspector(container);
    } else if (state.activeTab === 'lore') {
      renderLoreAndQuizInspector(container);
    }

    enhanceInspectorWithI18nAndReadAloud(container);

    if (prevInputId) {
      const restored = document.getElementById(prevInputId);
      if (restored) {
        restored.focus();
        if (prevSelStart !== null && typeof restored.setSelectionRange === 'function') {
          restored.setSelectionRange(prevSelStart, prevSelStart);
        }
      }
    }
  }

  // =========================================================================
  // TAB 1: 3D WORLD GLOBE & OCEANS INSPECTOR
  // =========================================================================
  function getFilteredLocations() {
    const allComplete = countPoneglyphs(state.poneglyphs) === 4;
    return DATA.worldLocations
      .filter((loc) => {
        if (!isEraAllowed(loc.era)) return false;
        if (loc.id === 'laugh-tale' && !allComplete) {
          // Keep Laugh Tale inspectable in Wano mode with Poneglyph lock hint if <4 rubbings
        }
        if (state.globeCategoryFilter !== 'All' && loc.category !== state.globeCategoryFilter) {
          return false;
        }
        return true;
      })
      .map((loc) => (HELPERS.getLocationForLang ? HELPERS.getLocationForLang(loc, state.lang) : loc));
  }

  function renderGlobeInspector(container) {
    const isYue = state.lang === 'yue';
    const categories = [
      { value: 'All', label: isYue ? '全部海域' : 'All' },
      { value: 'Four Blues', label: isYue ? '四海' : 'Four Blues' },
      { value: 'World Geography', label: isYue ? '世界地理奇觀' : 'World Geography' },
      { value: 'Grand Line — Paradise', label: isYue ? '偉大航道・樂園' : 'Grand Line — Paradise' },
      { value: 'Grand Line — New World', label: isYue ? '偉大航道・新世界' : 'Grand Line — New World' },
      { value: 'Sky Sea', label: isYue ? '一萬米空島' : 'Sky Sea' },
      { value: 'Undersea Gateway', label: isYue ? '一萬米深海' : 'Undersea Gateway' }
    ];

    const filterRow = el('div', {
      className: 'chip-row',
      attrs: { role: 'group', 'aria-label': isYue ? '篩選世界海域' : 'Filter world regions' }
    });
    categories.forEach((cat) => {
      filterRow.appendChild(
        el('button', {
          type: 'button',
          className: 'chip-btn' + (state.globeCategoryFilter === cat.value ? ' active' : ''),
          text: cat.label,
          onClick: () => {
            state.globeCategoryFilter = cat.value;
            renderActivePanel();
          }
        })
      );
    });

    const locations = getFilteredLocations();
    const fallbackLoc = HELPERS.getLocationForLang
      ? HELPERS.getLocationForLang(DATA.worldLocations[0], state.lang)
      : DATA.worldLocations[0];
    const activeLoc =
      locations.find((l) => l.id === state.selectedLocationId) ||
      locations[0] ||
      fallbackLoc;

    const locationGrid = el('div', { className: 'location-pill-grid' });
    locations.forEach((loc) => {
      const shortTitle = loc.name.split(' (')[0].split('（')[0];
      const heroChar = getSafeCharacterById(loc.heroCharacterId);
      const isLaughTaleLocked = loc.id === 'laugh-tale' && countPoneglyphs(state.poneglyphs) < 4;

      const pill = el(
        'button',
        {
          type: 'button',
          className: 'location-pill' + (loc.id === activeLoc.id ? ' selected' : ''),
          onClick: () => {
            state.selectedLocationId = loc.id;
            soundFX.playLogPoseChime();
            checkLocationPoneglyphs(loc.id);
            engine3D.setMode('globe');
            updateViewportSwitcherHighlight('3d-globe');
            engine3D.focusLocation(loc.id, false);
            renderActivePanel();
          }
        },
        [
          el('img', {
            className: 'pill-avatar',
            src: heroChar.image,
            alt: heroChar.name
          }),
          el('span', { text: (isLaughTaleLocked ? '🔒 ' : '') + shortTitle })
        ]
      );
      locationGrid.appendChild(pill);
    });

    const heroChar = getSafeCharacterById(activeLoc.heroCharacterId);
    const linkedMap = getMapById(activeLoc.mapId);
    const isLockedLT = activeLoc.id === 'laugh-tale' && countPoneglyphs(state.poneglyphs) < 4;

    const factItems = (
      isLockedLT
        ? [
            isYue
              ? '集齊全部四嚿赤紅路標歷史本文（打開頂部「更多設定」嘅尋寶任務），即可喺立體星球投射四道紅光解鎖拉夫德爾！'
              : 'Collect all 4 Crimson Road Poneglyphs (click the red badge in the top bar!) to project the 4 laser coordinates to Laugh Tale on the 3D Globe!',
            ...activeLoc.keyFacts.slice(0, 1)
          ]
        : activeLoc.keyFacts
    ).map((fact) => el('li', { className: 'fact-item', text: fact }));

    const detailCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill',
          text: activeLoc.categoryDisplay || activeLoc.category
        }),
        el('span', {
          className: 'coord-badge',
          text:
            activeLoc.altitude > 0.1
              ? (isYue ? '☁️ 高空一萬米白白海' : '☁️ +10,000m Sky Sea')
              : activeLoc.altitude < -0.05
              ? (isYue ? '🫧 海底一萬米深海' : '🫧 -10,000m Undersea')
              : (isYue ? '🌊 海平面' : '🌊 Sea Level')
        })
      ]),
      el('div', { className: 'island-hero-header' }, [
        el('img', {
          className: 'island-hero-portrait',
          src: heroChar.image,
          alt: heroChar.name
        }),
        el('div', {}, [
          el('h2', { className: 'card-title', text: activeLoc.name }),
          el('p', { className: 'card-subtitle', text: activeLoc.subtitle }),
          el('button', {
            type: 'button',
            className: 'inline-link-btn',
            text: isYue
              ? '🏴‍☠️ 代表人物：' +
                heroChar.name +
                '（懸賞金 ฿ ' +
                heroChar.bountyText +
                '）→ 查看懸賞令'
              : '🏴‍☠️ Featured Pirate/Hero: ' +
                heroChar.name +
                ' (฿ ' +
                heroChar.bountyText +
                ') → Open Wanted Poster',
            onClick: () => {
              state.selectedCharacterId = heroChar.id;
              state.selectedBountyIndex = null;
              switchTab('characters');
            }
          })
        ])
      ]),
      el('p', { className: 'card-body-text', text: activeLoc.summary }),
      el('h3', {
        className: 'section-subhead',
        text: isYue ? '✨ 小航海家趣味筆記' : '🧭 Explorer Notes for Kids'
      }),
      el('ul', { className: 'fact-list' }, factItems),
      el('div', { className: 'embedded-map-preview' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('strong', {
            className: 'section-subhead',
            text: (isYue ? '🗺️ 對應漫畫海圖：' : '🗺️ Canonical Manga/Anime Map: ') + linkedMap.title
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold compact',
            text: isYue ? '🔍 喺主視窗打開海圖' : '🔍 Open Map in Main Viewport',
            onClick: () => {
              state.activeMapId = linkedMap.id;
              switchTab('maps');
            }
          })
        ]),
        el('img', {
          className: 'map-preview-img',
          src: linkedMap.imageUrl,
          alt: linkedMap.title,
          onClick: () => {
            state.activeMapId = linkedMap.id;
            switchTab('maps');
          }
        })
      ])
    ]);

    container.appendChild(filterRow);
    container.appendChild(locationGrid);
    container.appendChild(detailCard);
  }

  // =========================================================================
  // TAB 2: CANONICAL MANGA & ANIME MAPS ATLAS INSPECTOR
  // =========================================================================
  function renderMangaMapsInspector(container) {
    const isYue = state.lang === 'yue';
    const allowedMaps = getAllowedMaps();
    const activeMap = getMapById(state.activeMapId);
    state.activeMapId = activeMap.id;

    const mapSelectorGrid = el('div', { className: 'map-cards-grid' });
    allowedMaps.forEach((m) => {
      const isSelected = m.id === activeMap.id;
      const cardBtn = el(
        'button',
        {
          type: 'button',
          className: 'map-thumb-btn' + (isSelected ? ' selected active' : ''),
          onClick: () => {
            soundFX.playLogPoseChime();
            openMangaMapInViewport(m.id);
            renderActivePanel();
          }
        },
        [
          el('img', {
            className: 'map-thumb-img',
            src: m.imageUrl,
            alt: m.title
          }),
          el('div', { className: 'map-thumb-info' }, [
            el('span', { className: 'map-thumb-badge', text: m.badge }),
            el('strong', { className: 'map-thumb-title', text: m.title })
          ])
        ]
      );
      mapSelectorGrid.appendChild(cardBtn);
    });

    const hotspots = engine3D.getFilteredHotspotsForMap(activeMap);
    if (state.selectedHotspotIndex >= hotspots.length) {
      state.selectedHotspotIndex = 0;
    }
    const activeHotspot = hotspots[state.selectedHotspotIndex] ||
      (activeMap.hotspots && activeMap.hotspots[0]);
    const hsChar = getSafeCharacterById(activeHotspot ? activeHotspot.characterId : 'luffy');

    const hotspotGrid = el('div', { className: 'location-pill-grid' });
    hotspots.forEach((hs, idx) => {
      const c = getSafeCharacterById(hs.characterId);
      hotspotGrid.appendChild(
        el(
          'button',
          {
            type: 'button',
            className:
              'location-pill' + (idx === state.selectedHotspotIndex ? ' selected' : ''),
            onClick: () => {
              state.selectedHotspotIndex = idx;
              engine3D.selectedHotspotIndex = idx;
              soundFX.playLogPoseChime();
              checkLocationPoneglyphs(hs.locationId);
              renderActivePanel();
            }
          },
          [
            el('img', {
              className: 'pill-avatar',
              src: c.image,
              alt: c.name
            }),
            el('span', { text: hs.label })
          ]
        )
      );
    });

    const mapDetailCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', { className: 'badge-pill', text: '🗺️ ' + activeMap.badge }),
        el('button', {
          type: 'button',
          className: 'action-btn secondary compact',
          text: isYue ? '🌍 返回立體旋轉星球' : '🌍 Switch Back to 3D Spinning Globe',
          onClick: () => {
            engine3D.setMode('globe');
            updateViewportSwitcherHighlight('3d-globe');
          }
        })
      ]),
      el('h2', { className: 'card-title', text: activeMap.title }),
      el('p', { className: 'card-body-text', text: activeMap.description }),
      el('h3', {
        className: 'section-subhead',
        text: isYue
          ? '📍 點擊海圖上嘅圖釘（或下方按鈕）查看詳情：'
          : '📍 Click Any Pin on the Map (or Below) to Inspect:'
      }),
      hotspotGrid,
      activeHotspot
        ? el('div', { className: 'lesson-callout hotspot-focus-box' }, [
            el('div', { className: 'island-hero-header' }, [
              el('img', {
                className: 'island-hero-portrait',
                src: hsChar.image,
                alt: hsChar.name
              }),
              el('div', {}, [
                el('strong', { text: activeHotspot.label }),
                el('p', { text: activeHotspot.note }),
                el('div', { className: 'hotspot-action-links' }, [
                  el('button', {
                    type: 'button',
                    className: 'inline-link-btn',
                    text: isYue ? '🌍 喺立體星球飛往此地' : '🌍 Fly to Location on 3D Globe',
                    onClick: () => {
                      state.selectedLocationId = activeHotspot.locationId;
                      checkLocationPoneglyphs(activeHotspot.locationId);
                      switchTab('globe');
                      engine3D.focusLocation(activeHotspot.locationId, false);
                    }
                  }),
                  el('button', {
                    type: 'button',
                    className: 'inline-link-btn',
                    text: isYue
                      ? '🏴‍☠️ 查看' + hsChar.name + '懸賞令'
                      : '🏴‍☠️ Open ' + hsChar.name + ' Wanted Poster',
                    onClick: () => {
                      state.selectedCharacterId = hsChar.id;
                      state.selectedBountyIndex = null;
                      switchTab('characters');
                    }
                  })
                ])
              ])
            ])
          ])
        : null
    ]);

    container.appendChild(mapSelectorGrid);
    container.appendChild(mapDetailCard);
  }

  // =========================================================================
  // TAB 3: 3D LOG POSE TIMELINE VOYAGE
  // =========================================================================
  function getFilteredArcs() {
    return DATA.timelineArcs
      .filter((arc) => isEraAllowed(arc.era))
      .map((arc) => (HELPERS.getArcForLang ? HELPERS.getArcForLang(arc, state.lang) : arc));
  }

  function renderTimelineInspector(container) {
    const isYue = state.lang === 'yue';
    const arcs = getFilteredArcs();
    if (state.activeArcIndex >= arcs.length) {
      state.activeArcIndex = Math.max(0, arcs.length - 1);
    }
    const currentArc = arcs[state.activeArcIndex];
    checkLocationPoneglyphs(currentArc.locationId);

    const heroChar = getSafeCharacterById(currentArc.heroCharacterId || 'luffy');
    const arcMap = getMapById(currentArc.mapId || 'grandline-sea-chart');

    const prevBtn = el('button', {
      type: 'button',
      className: 'action-btn secondary',
      text: isYue ? '⬅ 上一站島嶼' : '⬅ Previous Island',
      disabled: state.activeArcIndex === 0,
      onClick: () => {
        stopAutoSail();
        if (state.activeArcIndex > 0) {
          state.activeArcIndex -= 1;
          soundFX.playLogPoseChime();
          engine3D.focusTimelineArc(state.activeArcIndex);
          renderActivePanel();
        }
      }
    });

    const autoSailBtn = el('button', {
      type: 'button',
      className: 'action-btn gold',
      text: state.autoSailInterval
        ? (isYue ? '⏸ 暫停航行' : '⏸ Pause Voyage')
        : (isYue ? '⛵ 自動航行偉大航道' : '⛵ Auto-Sail Grand Line'),
      onClick: () => {
        if (state.autoSailInterval) {
          stopAutoSail();
          renderActivePanel();
          return;
        }
        soundFX.playLogPoseChime();
        state.autoSailInterval = setInterval(() => {
          const currentArcs = getFilteredArcs();
          state.activeArcIndex = (state.activeArcIndex + 1) % currentArcs.length;
          engine3D.focusTimelineArc(state.activeArcIndex);
          renderActivePanel();
        }, 3800);
        renderActivePanel();
      }
    });

    const nextBtn = el('button', {
      type: 'button',
      className: 'action-btn primary',
      text: isYue ? '下一站島嶼 ➡' : 'Next Island ➡',
      disabled: state.activeArcIndex >= arcs.length - 1,
      onClick: () => {
        stopAutoSail();
        if (state.activeArcIndex < arcs.length - 1) {
          state.activeArcIndex += 1;
          soundFX.playLogPoseChime();
          engine3D.focusTimelineArc(state.activeArcIndex);
          renderActivePanel();
        }
      }
    });

    const controlsRow = el('div', { className: 'voyage-controls' }, [
      prevBtn,
      autoSailBtn,
      nextBtn
    ]);

    const stepperRail = el('div', { className: 'timeline-stepper', attrs: { role: 'list' } });
    arcs.forEach((arc, idx) => {
      const stepBtn = el(
        'button',
        {
          type: 'button',
          className:
            'step-node' +
            (idx === state.activeArcIndex ? ' active' : '') +
            (idx < state.activeArcIndex ? ' completed' : ''),
          title: arc.saga + '：' + arc.title,
          onClick: () => {
            stopAutoSail();
            state.activeArcIndex = idx;
            soundFX.playLogPoseChime();
            engine3D.setMode('timeline');
            updateViewportSwitcherHighlight('3d-globe');
            engine3D.focusTimelineArc(idx);
            renderActivePanel();
          }
        },
        [
          el('span', { className: 'step-num', text: String(idx + 1) }),
          el('span', { className: 'step-saga', text: arc.saga.replace(' Saga', '') })
        ]
      );
      stepperRail.appendChild(stepBtn);
    });

    const crewTags =
      currentArc.crewJoined.length > 0
        ? currentArc.crewJoined.map((name) => el('span', { className: 'crew-tag', text: '+ ' + name }))
        : [el('span', { className: 'crew-tag muted', text: isYue ? '全員齊心協力航行' : 'Crew Holds Strong' })];

    const arcPortraitSrc =
      currentArc.id === 'onigashima-gear5' && isEraAllowed('wano')
        ? '/assets/characters/luffy-gear5.jpg'
        : heroChar.image;

    const arcCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill',
          text: isYue
            ? '記錄指針第 ' + (state.activeArcIndex + 1) + ' / ' + arcs.length + ' 站 • ' + currentArc.saga
            : 'Log Pose Stop ' +
              (state.activeArcIndex + 1) +
              ' of ' +
              arcs.length +
              ' • ' +
              currentArc.saga
        }),
        el('span', { className: 'coord-badge', text: '⛵ ' + currentArc.ship })
      ]),
      el('div', { className: 'island-hero-header' }, [
        el('img', {
          className: 'island-hero-portrait',
          src: arcPortraitSrc,
          alt: heroChar.name
        }),
        el('div', {}, [
          el('h2', { className: 'card-title', text: currentArc.title }),
          el('p', {
            className: 'card-subtitle',
            text: isYue
              ? currentArc.episodes + ' • 懸賞金里程碑：฿ ' + currentArc.bountyMilestone
              : currentArc.episodes + ' • Bounty Milestone: ฿ ' + currentArc.bountyMilestone
          })
        ])
      ]),
      el('p', { className: 'card-body-text', text: currentArc.storySummary }),
      el('div', { className: 'meta-two-col' }, [
        el('div', { className: 'meta-box' }, [
          el('span', { className: 'meta-label', text: isYue ? '新加入夥伴' : 'Crewmates Joined' }),
          el('div', { className: 'tag-wrap' }, crewTags)
        ]),
        el('div', { className: 'meta-box' }, [
          el('span', { className: 'meta-label', text: isYue ? '篇章主要強敵' : 'Main Arc Antagonists' }),
          el('p', { className: 'meta-val', text: currentArc.mainBoss })
        ])
      ]),
      el('div', { className: 'lesson-callout' }, [
        el('strong', {
          text: isYue
            ? '💡 海賊王世界觀重點解密：'
            : '💡 What We Learn About the One Piece World:'
        }),
        el('p', { text: currentArc.worldLesson })
      ]),
      el('button', {
        type: 'button',
        className: 'action-btn gold full-width',
        text: isYue
          ? '🗺️ 喺視窗打開「' + arcMap.badge + '」海圖'
          : '🗺️ View ' + arcMap.badge + ' in Viewport',
        onClick: () => {
          openMangaMapInViewport(arcMap.id);
        }
      })
    ]);

    container.appendChild(controlsRow);
    container.appendChild(stepperRail);
    container.appendChild(arcCard);
  }

  // =========================================================================
  // TAB 4: 3D WATER 7 SHIPWRIGHT DOCK (THOUSAND SUNNY & GOING MERRY CUTAWAY)
  // =========================================================================
  function renderShipsInspector(container) {
    const isYue = state.lang === 'yue';
    const allowedShips = (DATA.ships || [])
      .filter((s) => isEraAllowed(s.era))
      .map((s) => (HELPERS.getShipForLang ? HELPERS.getShipForLang(s, state.lang) : s));
    const activeShip =
      allowedShips.find((s) => s.id === state.selectedShipId) || allowedShips[0];
    if (!activeShip) return;
    state.selectedShipId = activeShip.id;
    engine3D.setShip(activeShip.id);

    const shipSelectorRow = el(
      'div',
      {
        className: 'chip-row',
        attrs: { role: 'group', 'aria-label': isYue ? '選擇草帽海賊船' : 'Select Straw Hat Ship' }
      },
      allowedShips.map((s) =>
        el('button', {
          type: 'button',
          className: 'chip-btn' + (s.id === activeShip.id ? ' active' : ''),
          text: (s.id === 'thousand-sunny' ? '🦁 ' : '🐑 ') + s.shortName,
          onClick: () => {
            state.selectedShipId = s.id;
            state.selectedDockChannel = 0;
            state.selectedShipRoomId = s.rooms && s.rooms[0] ? s.rooms[0].id : '';
            engine3D.setShip(s.id);
            engine3D.setSelectedDockChannel(0);
            engine3D.setMode('ship-dock');
            soundFX.playLogPoseChime();
            renderActivePanel();
          }
        })
      )
    );

    const isSunny = activeShip.id === 'thousand-sunny';
    const xrayOn = Boolean(engine3D && engine3D.shipXrayCutaway);

    const actionButtons = [
      el('button', {
        type: 'button',
        className: 'action-btn ' + (xrayOn ? 'primary' : 'secondary'),
        text: isYue
          ? (xrayOn ? '🩻 船體透視剖面：已開啟' : '🩻 切換立體船體透視剖面')
          : (xrayOn ? '🩻 Hull X-Ray Cutaway: ON' : '🩻 Toggle 3D Hull X-Ray Cutaway'),
        onClick: () => {
          engine3D.setMode('ship-dock');
          engine3D.toggleShipXray();
          soundFX.playLogPoseChime();
          renderActivePanel();
        }
      }),
      el('button', {
        type: 'button',
        className: 'action-btn gold',
        text: isSunny
          ? (isYue ? '🚀 發射風來噴射！（消耗三桶可樂）' : '🚀 Fire Coup de Burst! (3 Cola Barrels)')
          : (isYue ? '🕊️ 啟動加雅島飛天模式跳躍！' : '🕊️ Activate Jaya Flying Model Leap!'),
        onClick: () => {
          engine3D.setMode('ship-dock');
          engine3D.triggerCoupDeBurst();
          soundFX.playCoupDeBurst();
          if (ANALYTICS) {
            ANALYTICS.trackEvent('ship_coup_de_burst', { ship: activeShip.id });
          }
        }
      })
    ];

    if (isSunny) {
      actionButtons.push(
        el('button', {
          type: 'button',
          className: 'action-btn primary',
          text: isYue ? '🦁 發射獅吼炮！（消耗五桶可樂）' : '🦁 Fire Gaon Cannon! (5 Cola Barrels)',
          onClick: () => {
            engine3D.setMode('ship-dock');
            engine3D.triggerGaonCannon();
            soundFX.playGaonCannon();
            if (ANALYTICS) {
              ANALYTICS.trackEvent('ship_gaon_cannon', { ship: activeShip.id });
            }
          }
        })
      );
    }

    const allowedChannels = (activeShip.channels || []).filter((ch) => isEraAllowed(ch.era));
    if (state.selectedDockChannel >= allowedChannels.length) {
      state.selectedDockChannel = 0;
    }
    const activeChannel = allowedChannels[state.selectedDockChannel] || allowedChannels[0];

    const channelGrid = el(
      'div',
      { className: 'dock-channel-grid' },
      allowedChannels.map((ch, idx) =>
        el(
          'button',
          {
            type: 'button',
            className: 'dock-channel-btn' + (idx === state.selectedDockChannel ? ' active' : ''),
            onClick: () => {
              state.selectedDockChannel = idx;
              engine3D.setMode('ship-dock');
              engine3D.setSelectedDockChannel(idx);
              if (!engine3D.shipXrayCutaway && isSunny) {
                engine3D.toggleShipXray();
              }
              soundFX.playLogPoseChime();
              renderActivePanel();
            }
          },
          [
            el('span', { className: 'dock-ch-num', text: ch.channel }),
            el('span', { className: 'dock-ch-vehicle', text: ch.name })
          ]
        )
      )
    );

    const rooms = activeShip.rooms || [];
    const activeRoom =
      rooms.find((r) => r.id === state.selectedShipRoomId) || rooms[0];
    if (activeRoom) state.selectedShipRoomId = activeRoom.id;

    const roomPills = el(
      'div',
      { className: 'location-pill-grid' },
      rooms.map((rm) =>
        el(
          'button',
          {
            type: 'button',
            className: 'location-pill' + (activeRoom && rm.id === activeRoom.id ? ' selected' : ''),
            onClick: () => {
              state.selectedShipRoomId = rm.id;
              soundFX.playLogPoseChime();
              renderActivePanel();
            }
          },
          [el('span', { text: rm.icon + ' ' + rm.name })]
        )
      )
    );

    const shipwrightChar = getSafeCharacterById(isSunny ? 'franky' : 'usopp');
    const blueprintMap = getMapById(activeShip.blueprintMapId);

    const shipCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', { className: 'badge-pill', text: '⛵ ' + activeShip.classType }),
        el('span', { className: 'coord-badge', text: activeShip.dimensions })
      ]),
      el('div', { className: 'island-hero-header' }, [
        el('img', {
          className: 'island-hero-portrait',
          src: shipwrightChar.image,
          alt: shipwrightChar.name
        }),
        el('div', {}, [
          el('h2', { className: 'card-title', text: activeShip.name }),
          el('p', { className: 'card-subtitle', text: '🔨 ' + activeShip.shipwright })
        ])
      ]),
      el('p', { className: 'card-body-text', text: activeShip.summary }),
      el('div', { className: 'ship-action-grid' }, actionButtons),
      el('h3', {
        className: 'section-subhead',
        text: isSunny
          ? (isYue
              ? '⚙️ 士兵船塢系統旋轉艙（零號至五號頻道）'
              : '⚙️ Soldier Dock System Turntable (Channels 0–5)')
          : (isYue
              ? '🐑 黃金梅利號經典船匠構造'
              : '🐑 Going Merry Signature Shipwright Features')
      }),
      channelGrid,
      activeChannel
        ? el('div', { className: 'lesson-callout' }, [
            el('strong', { text: activeChannel.channel + ' — ' + activeChannel.name }),
            el('p', { text: activeChannel.summary })
          ])
        : null,
      el('h3', {
        className: 'section-subhead',
        text: isYue
          ? '🏠 船艙內部甲板、廚房、水族館吧台與房間'
          : '🏠 Interior Decks, Galley, Aquarium Bar & Rooms'
      }),
      roomPills,
      activeRoom
        ? el('div', { className: 'lesson-callout' }, [
            el('strong', {
              text: activeRoom.icon + ' ' + activeRoom.name + '（' + activeRoom.deck + '）'
            }),
            el('p', { text: activeRoom.detail })
          ])
        : null,
      el('div', { className: 'embedded-map-preview' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('strong', {
            className: 'section-subhead',
            text: (isYue ? '📐 官方船體建築藍圖：' : '📐 Official Architectural Blueprint: ') + blueprintMap.title
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold compact',
            text: isYue ? '🔍 喺主視窗打開藍圖' : '🔍 Open Blueprint in Main Viewport',
            onClick: () => {
              state.activeMapId = blueprintMap.id;
              switchTab('maps');
            }
          })
        ]),
        el('img', {
          className: 'map-preview-img',
          src: blueprintMap.imageUrl,
          alt: blueprintMap.title,
          onClick: () => {
            state.activeMapId = blueprintMap.id;
            switchTab('maps');
          }
        })
      ])
    ]);

    container.appendChild(shipSelectorRow);
    container.appendChild(shipCard);
  }

  // =========================================================================
  // TAB 5: CHARACTERS, VIVRE CARDS, SIGNATURE LAUGHS & 1v1 CLASH
  // =========================================================================
  function getFilteredAndSortedCharacters() {
    const query = state.characterSearch.trim().toLowerCase();
    const list = DATA.characters
      .filter((raw) => isEraAllowed(raw.era))
      .map((raw) => ({
        raw,
        ch: HELPERS.getCharacterForEra(raw, state.eraFilter, state.lang)
      }))
      .filter((item) => {
        const ch = item.ch;
        const raw = item.raw;
        if (state.characterFactionFilter !== 'All' && ch.faction !== state.characterFactionFilter) {
          return false;
        }
        if (query) {
          const hay = (
            ch.name +
            ' ' +
            ch.epithet +
            ' ' +
            ch.devilFruit +
            ' ' +
            ch.faction +
            ' ' +
            (ch.laugh || '') +
            ' ' +
            raw.name +
            ' ' +
            raw.epithet +
            ' ' +
            raw.devilFruit +
            ' ' +
            (raw.laugh || '')
          ).toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      })
      .map((item) => item.ch);

    if (state.characterSort === 'bounty') {
      list.sort((a, b) => (b.bounty || 0) - (a.bounty || 0) || b.powerScore - a.powerScore);
    } else if (state.characterSort === 'power') {
      list.sort((a, b) => b.powerScore - a.powerScore || (b.bounty || 0) - (a.bounty || 0));
    }
    return list;
  }

  function renderCharactersInspector(container) {
    const isYue = state.lang === 'yue';
    const t = getStrings();
    const factions = [
      { value: 'All', label: t.factionAll || 'All Characters' },
      { value: 'Straw Hat Pirates', label: t.factionStrawHats || '👒 Straw Hats' },
      { value: 'Four Emperors (Yonko)', label: t.factionEmperors || '👑 Emperors' },
      { value: 'Worst Generation', label: t.factionWorstGen || '🔥 Worst Gen' },
      { value: 'Marines & World Gov', label: t.factionMarines || '⚖️ Marines & Gov' },
      { value: 'Seven Warlords / Legends', label: t.factionWarlords || '🗡️ Warlords' },
      { value: 'Revolutionary Army', label: t.factionRev || '🐉 Revolutionaries' },
      { value: 'Legends', label: t.factionLegends || '🏴‍☠️ Legends' }
    ];

    const chars = getFilteredAndSortedCharacters();
    const activeChar =
      chars.find((c) => c.id === state.selectedCharacterId) ||
      chars[0] ||
      getSafeCharacterById('luffy');

    if (activeChar.id === 'katakuri' || activeChar.id === 'big-mom') {
      awardPoneglyph('wholeCake', isYue ? '大媽寶物庫拓本' : "Big Mom's Treasure Room Rubbing");
    }

    // 1. Clean Single-Bar Search, Faction & Sort Header
    const toolbarHeader = el('section', { className: 'char-dashboard-header' }, [
      el('div', { className: 'char-search-toolbar' }, [
        el('input', {
          id: 'char-search-input',
          type: 'search',
          className: 'portal-search-input',
          value: state.characterSearch,
          placeholder:
            t.searchPlaceholder || '🔍 Search 38 characters, bounties, Devil Fruits, or laughs...',
          attrs: { 'aria-label': isYue ? '搜尋角色' : 'Search characters' },
          onInput: (e) => {
            state.characterSearch = e.target.value;
            renderActivePanel();
          }
        }),
        el(
          'select',
          {
            className: 'portal-select',
            attrs: { 'aria-label': isYue ? '排序方式' : 'Sort characters by' },
            onChange: (e) => {
              state.characterSort = e.target.value;
              renderActivePanel();
            }
          },
          [
            { val: 'story', label: t.sortStory || 'Sort: Crew & Story' },
            { val: 'bounty', label: t.sortBounty || 'Sort: Highest Bounty' },
            { val: 'power', label: t.sortPower || 'Sort: Power Score' }
          ].map((opt) =>
            el('option', {
              value: opt.val,
              selected: state.characterSort === opt.val,
              text: opt.label
            })
          )
        ),
        el('span', {
          className: 'char-count-pill',
          text: isYue
            ? chars.length + ' ' + (t.charCountSuffix || '位角色')
            : chars.length + (chars.length === 1 ? ' Character' : ' Characters')
        })
      ]),
      el(
        'div',
        { className: 'char-filter-pills' },
        factions.map((fac) =>
          el('button', {
            type: 'button',
            className:
              'filter-pill-btn' + (state.characterFactionFilter === fac.value ? ' active' : ''),
            text: fac.label,
            onClick: () => {
              state.characterFactionFilter = fac.value;
              renderActivePanel();
            }
          })
        )
      )
    ]);

    // 2. Visual Portrait Gallery Grid (Left / Main Column)
    const portraitGrid = el('div', { className: 'char-portrait-grid' });
    if (chars.length === 0) {
      portraitGrid.appendChild(
        el('div', { className: 'empty-roster-state' }, [
          el('p', {
            className: 'card-body-text',
            text: isYue
              ? '喺目前嘅防劇透進度入面搵唔到符合條件嘅角色，請重設篩選條件。'
              : 'No characters matched your search in this Era. Clear your filter to view the crew.'
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold',
            text: isYue ? '重設篩選條件' : 'Reset Filters',
            onClick: () => {
              state.characterSearch = '';
              state.characterFactionFilter = 'All';
              renderActivePanel();
            }
          })
        ])
      );
    } else {
      chars.forEach((ch) => {
        const cardPhoto =
          ch.id === 'luffy' && ch.canUseGear5Photo && state.luffyUseGear5Photo
            ? ch.altImage
            : ch.image;
        const bountyBadgeText =
          ch.bounty > 0 ? '฿ ' + formatBerry(ch.bounty) : ch.bountyText || ch.tier;

        portraitGrid.appendChild(
          el(
            'button',
            {
              type: 'button',
              className: 'char-portrait-card' + (ch.id === activeChar.id ? ' selected' : ''),
              onClick: () => {
                state.selectedCharacterId = ch.id;
                state.selectedBountyIndex = null;
                soundFX.playLogPoseChime();
                renderActivePanel();
                if (window.innerWidth < 980) {
                  const spot = document.getElementById('char-spotlight-card');
                  if (spot) spot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }
            },
            [
              el('div', { className: 'char-card-img-wrap' }, [
                el('img', {
                  className: 'char-card-img',
                  src: cardPhoto,
                  alt: ch.name,
                  loading: 'lazy'
                }),
                el('span', {
                  className: 'char-card-pwr-tag',
                  text: String(ch.powerScore)
                })
              ]),
              el('div', { className: 'char-card-body' }, [
                el('span', { className: 'char-card-name', text: ch.name }),
                el('span', { className: 'char-card-role', text: ch.role || ch.faction }),
                el('span', { className: 'char-card-bounty', text: bountyBadgeText })
              ])
            ]
          )
        );
      });
    }

    // Optional Collapsed Group Illustration Sheets at Bottom of Gallery Column
    const banners = [
      {
        key: 'strawhat',
        era: 'east-blue',
        btnText: isYue ? '👒 草帽一夥' : '👒 Straw Hats',
        src: '/assets/characters/strawhat_crew_banner.jpg',
        caption: isYue ? '草帽海賊團全員與懸賞令合集' : 'Straw Hat Pirates Crew & Wanted Posters'
      },
      {
        key: 'warlords',
        era: 'pre-timeskip',
        btnText: isYue ? '🔥 七武海與海軍' : '🔥 Warlords & Marines',
        src: '/assets/characters/warlords_marines_grid.jpg',
        caption: isYue
          ? '艾斯、薩波、鷹眼、卡普、赤犬、黑鬍子與傳說強者'
          : 'Ace, Sabo, Mihawk, Garp, Akainu, Blackbeard & Legends'
      },
      {
        key: 'favorites',
        era: 'wano',
        btnText: isYue ? '⭐ 超人氣角色' : '⭐ Fan Favorites',
        src: '/assets/characters/fan_favorites_grid.jpg',
        caption: isYue
          ? '巴基、克洛克達爾、多佛朗明哥、女帝、大和、御田、黃猿與青雉'
          : 'Buggy, Crocodile, Doflamingo, Boa Hancock, Yamato, Oden, Kizaru & Aokiji'
      },
      {
        key: 'yonko',
        era: 'wano',
        btnText: isYue ? '⚡ 四皇與五檔' : '⚡ Emperors & Gear 5',
        src: '/assets/characters/yonko_gear5_banner.jpg',
        caption: isYue
          ? '五檔路飛決戰凱多、紅髮、白鬍子、羅傑、羅與基德'
          : 'Gear 5 Luffy vs. Kaido + Shanks, Whitebeard, Roger, Law & Kid'
      },
      {
        key: 'egghead',
        era: 'egghead',
        btnText: isYue ? '🧠 蛋頭島與艾爾巴夫' : '🧠 Egghead & Elbaph',
        src: '/assets/characters/egghead_legends_grid.jpg',
        caption: isYue
          ? '貝加龐克博士、大熊、波妮、土星聖、路奇與巨兵海賊團'
          : 'Dr. Vegapunk, Kuma, Jewelry Bonney, Saint Saturn, Lucci & Dorry/Brogy'
      }
    ].filter((b) => isEraAllowed(b.era));

    const activeBanner = banners.find((b) => b.key === state.activeArtBanner) || banners[0];
    state.activeArtBanner = activeBanner.key;

    const artSheetDrawer = el('details', { className: 'clean-drawer art-sheet-drawer' }, [
      el('summary', {
        className: 'clean-drawer-summary',
        text: isYue
          ? '🖼️ 全角色漫畫設定插畫集（共 ' + banners.length + ' 幅）'
          : '🖼️ Full-Cast Manga Art Sheets (' + banners.length + ' Plates)'
      }),
      el('div', { className: 'clean-drawer-body' }, [
        el(
          'div',
          { className: 'chip-row' },
          banners.map((b) =>
            el('button', {
              type: 'button',
              className: 'chip-btn' + (activeBanner.key === b.key ? ' active' : ''),
              text: b.btnText,
              onClick: () => {
                state.activeArtBanner = b.key;
                state.charDrawerArt = true;
                renderActivePanel();
              }
            })
          )
        ),
        el('img', {
          className: 'hero-art-banner-img',
          src: activeBanner.src,
          alt: activeBanner.caption,
          loading: 'lazy'
        }),
        el('p', { className: 'hero-art-caption', text: activeBanner.caption })
      ])
    ]);
    artSheetDrawer.open = Boolean(state.charDrawerArt);
    artSheetDrawer.addEventListener('toggle', () => {
      state.charDrawerArt = artSheetDrawer.open;
    });

    const galleryColumn = el('div', { className: 'char-gallery-column' }, [
      portraitGrid,
      artSheetDrawer
    ]);

    // 3. Sticky Right Spotlight Dossier (Clean Wanted Poster + Essential Facts + Progressive Drawers)
    const history = activeChar.bountyHistory || [];
    const maxIdx = Math.max(0, history.length - 1);
    const activeBountyIdx =
      state.selectedBountyIndex === null || state.selectedBountyIndex > maxIdx
        ? maxIdx
        : state.selectedBountyIndex;
    const activeMilestone = history[activeBountyIdx] || {
      label: isYue ? '目前懸賞金' : 'Known Bounty',
      bounty: activeChar.bounty,
      text: activeChar.bountyText
    };

    const posterPhotoUrl =
      activeChar.canUseGear5Photo && state.luffyUseGear5Photo
        ? activeChar.altImage
        : activeChar.image;

    const gear5ToggleBtn = activeChar.canUseGear5Photo
      ? el('button', {
          type: 'button',
          className: 'chip-btn active full-width',
          text: state.luffyUseGear5Photo
            ? t.switchClassicHat || '👒 Switch Photo to Classic Straw Hat'
            : t.switchGear5 || '⚡ Switch Photo to Gear 5',
          onClick: () => {
            state.luffyUseGear5Photo = !state.luffyUseGear5Photo;
            soundFX.playDrumsOfLiberation();
            renderActivePanel();
          }
        })
      : null;

    const posterHeaderText = activeChar.posterHeader || (isYue ? '通緝令' : 'WANTED');
    const posterConditionText =
      activeMilestone.condition || activeChar.posterCondition || (isYue ? '生死不論' : 'DEAD OR ALIVE');
    const posterFooterText = activeChar.posterFooter || (isYue ? '— 海軍本部' : '— MARINE');

    // Collapsible Drawer 1: Haki, Signature Moves & Bounty Timeline
    const hakiBadges =
      activeChar.haki && activeChar.haki.length > 0
        ? activeChar.haki.map((h) =>
            el('span', {
              className: 'haki-badge' + (h.advanced ? ' advanced' : ''),
              text: (h.advanced ? (isYue ? '⚡ 高階：' : '⚡ ADV: ') : '🛡️ ') + h.name
            })
          )
        : [
            el('span', {
              className: 'haki-badge muted',
              text: isYue ? '體術、科學兵器與戰術專家' : 'Martial Arts, Tech & Tactical Specialist'
            })
          ];

    const moveItems = (activeChar.signatureMoves || []).map((m) =>
      el('li', { className: 'fact-item', text: m })
    );

    const bountyEvolutionBox =
      history.length > 1
        ? el('div', { className: 'bounty-evolution-box' }, [
            el('span', {
              className: 'meta-label',
              text:
                (isYue ? '📜 懸賞金演變歷程（' : '📜 Bounty Timeline (') +
                (activeBountyIdx + 1) +
                '/' +
                history.length +
                (isYue ? '）：' : '): ') +
                activeMilestone.label
            }),
            el('input', {
              type: 'range',
              className: 'bounty-range-slider',
              min: 0,
              max: maxIdx,
              step: 1,
              value: activeBountyIdx,
              attrs: {
                'aria-label': isYue
                  ? '滑動查看各篇章懸賞金演變'
                  : 'Scrub character bounty history across story arcs'
              },
              onInput: (e) => {
                state.selectedBountyIndex = Number(e.target.value);
                state.charDrawerCombat = true;
                soundFX.playLogPoseChime();
                renderActivePanel();
              }
            }),
            el(
              'div',
              { className: 'chip-row' },
              history.map((m, idx) =>
                el('button', {
                  type: 'button',
                  className: 'chip-btn' + (idx === activeBountyIdx ? ' active' : ''),
                  text: m.bounty > 0 ? '฿ ' + formatBerry(m.bounty) : m.label,
                  onClick: () => {
                    state.selectedBountyIndex = idx;
                    state.charDrawerCombat = true;
                    soundFX.playLogPoseChime();
                    renderActivePanel();
                  }
                })
              )
            )
          ])
        : null;

    const combatDrawer = el('details', { className: 'clean-drawer' }, [
      el('summary', {
        className: 'clean-drawer-summary',
        text: isYue
          ? '⚡ 霸氣造詣、招牌必殺技與懸賞金演變'
          : '⚡ Haki, Signature Techniques & Bounty History'
      }),
      el('div', { className: 'clean-drawer-body' }, [
        bountyEvolutionBox,
        el('h3', { className: 'section-subhead', text: t.hakiMastery || '⚡ Haki Mastery' }),
        el('div', { className: 'tag-wrap' }, hakiBadges),
        el('h3', {
          className: 'section-subhead',
          text: t.signatureMoves || '🔥 Signature Techniques'
        }),
        el('ul', { className: 'fact-list' }, moveItems)
      ])
    ]);
    combatDrawer.open = Boolean(state.charDrawerCombat);
    combatDrawer.addEventListener('toggle', () => {
      state.charDrawerCombat = combatDrawer.open;
    });

    // Collapsible Drawer 2: 6-Axis Power Radar & 1v1 Clash Simulator
    const radarCanvas = el('canvas', {
      className: 'radar-canvas',
      attrs: {
        width: '270',
        height: '225',
        'aria-label': isYue ? '六維角色戰力雷達圖' : '6-axis character power radar chart'
      }
    });

    const allAllowedChars = DATA.characters
      .filter((c) => isEraAllowed(c.era))
      .map((c) => HELPERS.getCharacterForEra(c, state.eraFilter, state.lang));
    const rivalChar =
      allAllowedChars.find((c) => c.id === state.rivalCharacterId) ||
      allAllowedChars[Math.min(1, allAllowedChars.length - 1)] ||
      allAllowedChars[0];

    const rivalSelect = el(
      'select',
      {
        className: 'portal-select full-width',
        attrs: { 'aria-label': isYue ? '揀選一對一模擬對決對手' : 'Select opponent for 1v1 comparison' },
        onChange: (e) => {
          state.rivalCharacterId = e.target.value;
          state.charDrawerClash = true;
          soundFX.playHakiBoom();
          awardPoneglyph('quiz', isYue ? '偉大航道戰術對決分析' : 'Grand Line Tactical Clash Analysis');
          renderActivePanel();
        }
      },
      allAllowedChars.map((c) =>
        el('option', {
          value: c.id,
          selected: c.id === rivalChar.id,
          text: isYue ? c.name + '（戰力 ' + c.powerScore + '）' : c.name + ' (PWR ' + c.powerScore + ')'
        })
      )
    );

    const clashVerdict = computeClashVerdict(activeChar, rivalChar);

    const clashDrawer = el('details', { className: 'clean-drawer' }, [
      el('summary', {
        className: 'clean-drawer-summary',
        text: isYue
          ? '⚔️ 六維戰力雷達及一對一模擬對決：' + rivalChar.name
          : '⚔️ Power Radar & 1v1 Clash vs. ' + rivalChar.name
      }),
      el('div', { className: 'clean-drawer-body' }, [
        el('div', { className: 'char-radar-col' }, [radarCanvas]),
        el('div', { className: 'clash-faceoff-banner' }, [
          el('div', { className: 'clash-fighter-box' }, [
            el('img', {
              className: 'clash-portrait-img gold-ring',
              src: posterPhotoUrl,
              alt: activeChar.name
            }),
            el('span', {
              className: 'clash-fighter-tag',
              text: activeChar.name + ' (' + activeChar.powerScore + ')'
            })
          ]),
          el('span', { className: 'vs-badge', text: isYue ? '對決' : 'VS' }),
          el('div', { className: 'clash-fighter-box' }, [
            el('img', {
              className: 'clash-portrait-img blue-ring',
              src: rivalChar.image,
              alt: rivalChar.name
            }),
            rivalSelect
          ])
        ]),
        el('p', { className: 'clash-verdict-text', text: clashVerdict })
      ])
    ]);
    clashDrawer.open = Boolean(state.charDrawerClash);
    clashDrawer.addEventListener('toggle', () => {
      state.charDrawerClash = clashDrawer.open;
      if (clashDrawer.open) {
        window.renderOnePieceRadarChart(radarCanvas, activeChar, rivalChar);
      }
    });

    const spotlightCard = el(
      'article',
      { id: 'char-spotlight-card', className: 'wanted-poster-card spotlight-dossier-card' },
      [
        el('div', { className: 'card-kicker-row' }, [
          el('span', {
            className: 'vivre-id-pill',
            text:
              (isYue ? '生命卡 ' : 'VIVRE ') +
              (activeChar.vivreId || '#0001') +
              ' • ' +
              activeChar.tier
          })
        ]),
        el('div', { className: 'wanted-parchment-frame' }, [
          el('div', { className: 'wanted-header' }, [
            el('span', { className: 'wanted-title', text: posterHeaderText })
          ]),
          el('div', { className: 'wanted-photo-box' }, [
            el('img', {
              className: 'wanted-portrait-img',
              src: posterPhotoUrl,
              alt: activeChar.name
            })
          ]),
          el('div', { className: 'wanted-dead-or-alive', text: posterConditionText }),
          el('div', { className: 'wanted-name-block' }, [
            el('h2', { className: 'wanted-char-name', text: activeChar.name.toUpperCase() }),
            el('p', { className: 'wanted-epithet', text: activeChar.epithet })
          ]),
          el('div', { className: 'wanted-bounty-row' }, [
            el('span', { className: 'berry-symbol', text: '฿' }),
            el('span', { className: 'bounty-amount', text: activeMilestone.text }),
            el('span', { className: 'berry-dash', text: posterFooterText })
          ])
        ]),
        gear5ToggleBtn,
        el('p', { className: 'card-body-text', text: activeChar.kidBio }),
        el('div', { className: 'vivre-meta-grid' }, [
          el('div', { className: 'vivre-meta-cell' }, [
            el('span', { className: 'vivre-meta-label', text: t.vivrePower || '🍇 Power / Style' }),
            el('span', { className: 'vivre-meta-val', text: activeChar.devilFruit })
          ]),
          el('div', { className: 'vivre-meta-cell' }, [
            el('span', { className: 'vivre-meta-label', text: t.vivreOrigin || '🌊 Origin' }),
            el('span', {
              className: 'vivre-meta-val',
              text: activeChar.originSea || (isYue ? '偉大航道' : 'Grand Line')
            })
          ]),
          el('div', { className: 'vivre-meta-cell' }, [
            el('span', { className: 'vivre-meta-label', text: t.vivreBirthday || '🎂 Birthday' }),
            el('span', {
              className: 'vivre-meta-val',
              text: activeChar.birthday || (isYue ? '未知' : 'Unknown')
            })
          ]),
          el('div', { className: 'vivre-meta-cell' }, [
            el('span', {
              className: 'vivre-meta-label',
              text: t.vivreFood || '🍖 Favorite Food'
            }),
            el('span', {
              className: 'vivre-meta-val',
              text: activeChar.favoriteFood || (isYue ? '海賊宴會大餐' : 'Pirate Banquet')
            })
          ])
        ]),
        activeChar.laugh
          ? el('div', { className: 'signature-laugh-bar' }, [
              el('div', { className: 'laugh-quote-col' }, [
                el('span', {
                  className: 'laugh-quote-text',
                  text: isYue ? '😂 「' + activeChar.laugh + '」' : '😂 "' + activeChar.laugh + '"'
                }),
                activeChar.laughNote
                  ? el('span', { className: 'laugh-note-text', text: activeChar.laughNote })
                  : null
              ]),
              el('button', {
                type: 'button',
                className: 'laugh-play-btn',
                text: t.laughBtn || '🔊 Laugh',
                onClick: () => {
                  soundFX.playSignatureLaugh(
                    activeChar.laugh,
                    activeChar.laughPitch,
                    activeChar.laughRate,
                    state.lang
                  );
                  if (ANALYTICS) {
                    ANALYTICS.trackEvent('play_signature_laugh', {
                      character: activeChar.id,
                      laugh: activeChar.laugh
                    });
                  }
                }
              })
            ])
          : null,
        combatDrawer,
        clashDrawer
      ]
    );

    const spotlightColumn = el('div', { className: 'char-spotlight-column' }, [spotlightCard]);

    const dashboardGrid = el('div', { className: 'char-dashboard-grid' }, [
      galleryColumn,
      spotlightColumn
    ]);

    container.appendChild(toolbarHeader);
    container.appendChild(dashboardGrid);

    window.renderOnePieceRadarChart(radarCanvas, activeChar, rivalChar);
  }

  function computeClashVerdict(charA, charB) {
    const isYue = state.lang === 'yue';
    if (charA.id === charB.id) {
      if (isYue) {
        return (
          '鏡像對決！兩個' +
          charA.name +
          '正面交鋒，霸氣衝擊足以撕裂偉大航道上空嘅雲層，戰成平手！'
        );
      }
      return (
        'Mirror Match! Two ' +
        charA.name +
        's clashing would split the clouds above the Grand Line in an even draw!'
      );
    }
    const diff = charA.powerScore - charB.powerScore;
    const winner = diff >= 0 ? charA : charB;
    const loser = diff >= 0 ? charB : charA;
    const absDiff = Math.abs(diff);

    if (absDiff <= 2) {
      if (isYue) {
        return (
          '🌩️ 裂天級極限死鬥！' +
          charA.name +
          '（戰力 ' +
          charA.powerScore +
          '）同' +
          charB.name +
          '（戰力 ' +
          charB.powerScore +
          '）實力旗鼓相當！呢場大戰隨時激戰幾日幾夜，最後由' +
          winner.name +
          '憑住極高戰鬥智商（' +
          winner.stats.battleIQ +
          '）同霸氣造詣（' +
          winner.stats.haki +
          '）險勝一線！'
        );
      }
      return (
        '🌩️ SKY-SPLITTING EXTREME-DIFF CLASH! ' +
        charA.name +
        ' (PWR ' +
        charA.powerScore +
        ') and ' +
        charB.name +
        ' (PWR ' +
        charB.powerScore +
        ') are nearly dead even! This duel could rage for days before ' +
        winner.name +
        ' edges out a narrow victory through Battle IQ (' +
        winner.stats.battleIQ +
        ') and Haki (' +
        winner.stats.haki +
        ')!'
      );
    }
    if (absDiff <= 7) {
      const topMove =
        (winner.signatureMoves && winner.signatureMoves[0]) ||
        (isYue ? '終極必殺技' : 'finishing move');
      if (isYue) {
        return (
          '🔥 偉大航道高難度激戰！' +
          loser.name +
          '全力逼使' +
          winner.name +
          '使出「' +
          topMove +
          '」，不過' +
          winner.name +
          '憑住更勝一籌嘅' +
          (winner.stats.haki >= loser.stats.haki ? '霸氣修為' : '速度與防禦力') +
          '成功奪得勝利！'
        );
      }
      return (
        '🔥 HIGH-DIFFICULTY GRAND LINE SHOWDOWN! ' +
        loser.name +
        ' pushes ' +
        winner.name +
        ' to unleash ' +
        topMove +
        ", but " +
        winner.name +
        "'s superior " +
        (winner.stats.haki >= loser.stats.haki ? 'Haki mastery' : 'speed and durability') +
        ' secures the win!'
      );
    }
    if (isYue) {
      return (
        '💥 壓倒性戰力差距！' +
        winner.name +
        '（' +
        winner.tier +
        '，戰力 ' +
        winner.powerScore +
        '）喺正面戰鬥規模上全面壓制' +
        loser.name +
        '（' +
        loser.tier +
        '，戰力 ' +
        loser.powerScore +
        '），不過憑住' +
        loser.name +
        '嘅機智戰術，依然有機會成功突圍撤退！'
      );
    }
    return (
      '💥 OVERWHELMING GRAND LINE VICTORY! ' +
      winner.name +
      ' (' +
      winner.tier +
      ', PWR ' +
      winner.powerScore +
      ') outclasses ' +
      loser.name +
      ' (' +
      loser.tier +
      ', PWR ' +
      loser.powerScore +
      ') in raw combat scale, though ' +
      loser.name +
      "'s clever skills could still pull off a tactical escape!"
    );
  }

  // =========================================================================
  // TAB 7: 3D DEVIL FRUIT ENCYCLOPEDIA (21 Era-Safe Fruits + Live Search!)
  // =========================================================================
  function getFilteredFruits() {
    const q = state.fruitSearch.trim().toLowerCase();
    return DATA.devilFruits
      .filter((raw) => isEraAllowed(raw.era))
      .map((raw) => ({
        raw,
        df: HELPERS.getDevilFruitForEra(raw, state.eraFilter, state.lang)
      }))
      .filter((item) => {
        const df = item.df;
        const raw = item.raw;
        if (
          state.fruitCategoryFilter !== 'All' &&
          !df.category.toLowerCase().includes(state.fruitCategoryFilter.toLowerCase())
        ) {
          return false;
        }
        if (q) {
          const hay = (
            df.name +
            ' ' +
            df.englishName +
            ' ' +
            df.user +
            ' ' +
            (df.categoryDisplay || df.category) +
            ' ' +
            raw.name +
            ' ' +
            raw.englishName +
            ' ' +
            raw.user +
            ' ' +
            raw.category
          ).toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .map((item) => item.df);
  }

  function renderDevilFruitsInspector(container) {
    const isYue = state.lang === 'yue';
    const t = getStrings();
    // Era-filtered Illustrated Akuma no Mi Zukan (Devil Fruit Encyclopedia) Plates
    const zukanPlates = [
      {
        key: 'paramecia',
        era: 'east-blue',
        btnText: isYue ? '📖 圖鑑第一卷：超人系與動物系' : '📖 Zukan Plate I: Paramecia & Zoan',
        src: '/assets/banners/zukan-paramecia-zoan.jpg',
        caption: isYue
          ? '📖 惡魔果實圖鑑第一卷 —— 橡膠、手術、人人、四分五裂、花花與青龍果實！'
          : '📖 Akuma no Mi Zukan Plate I — Gomu Gomu, Ope Ope, Hito Hito, Bara Bara, Hana Hana & Dragon!'
      },
      {
        key: 'logia',
        era: 'pre-timeskip',
        btnText: isYue ? '🔥 圖鑑第二卷：自然系與傳說' : '🔥 Zukan Plate II: Logia & Legends',
        src: '/assets/banners/zukan-logia-legends.jpg',
        caption: isYue
          ? '🔥 惡魔果實圖鑑第二卷 —— 燒燒、暗暗、震震、沙沙、糯糯與不死鳥果實！'
          : '🔥 Akuma no Mi Zukan Plate II — Mera Mera, Yami Yami, Gura Gura, Suna Suna, Mochi Mochi & Phoenix!'
      },
      {
        key: 'admirals',
        era: 'wano',
        btnText: isYue ? '⚡ 圖鑑第三卷：海軍大將與和之國' : '⚡ Zukan Plate III: Admirals & Wano',
        src: '/assets/banners/zukan-admirals-wano.jpg',
        caption: isYue
          ? '⚡ 惡魔果實圖鑑第三卷 —— 黃泉、線線、閃閃、冰凍、岩漿與大口真神果實！'
          : '⚡ Akuma no Mi Zukan Plate III — Yomi Yomi, Ito Ito, Pika Pika, Hie Hie, Magu Magu & Wolf Deity!'
      },
      {
        key: 'egghead',
        era: 'egghead',
        btnText: isYue ? '🧠 圖鑑第四卷：蛋頭島篇' : '🧠 Zukan Plate IV: Egghead Arc',
        src: '/assets/banners/zukan-egghead.jpg',
        caption: isYue
          ? '🧠 惡魔果實圖鑑第四卷 —— 肉球、腦腦與歲歲果實！'
          : '🧠 Akuma no Mi Zukan Plate IV — Nikyu Nikyu (Paw), Nomi Nomi (Brain) & Toshi Toshi (Age)!'
      }
    ].filter((p) => isEraAllowed(p.era));

    const activePlate =
      zukanPlates.find((p) => p.key === state.activeZukanBanner) || zukanPlates[0];
    state.activeZukanBanner = activePlate.key;

    const zukanGalleryBox = el('section', { className: 'art-gallery-banner' }, [
      el(
        'div',
        { className: 'chip-row' },
        zukanPlates.map((p) =>
          el('button', {
            type: 'button',
            className: 'chip-btn' + (activePlate.key === p.key ? ' active' : ''),
            text: p.btnText,
            onClick: () => {
              state.activeZukanBanner = p.key;
              renderActivePanel();
            }
          })
        )
      ),
      el('img', {
        className: 'hero-art-banner-img zukan-plate-img',
        src: activePlate.src,
        alt: activePlate.caption
      }),
      el('p', { className: 'hero-art-caption', text: activePlate.caption })
    ]);

    const searchRow = el('div', { className: 'search-sort-bar' }, [
      el('input', {
        id: 'fruit-search-input',
        type: 'search',
        className: 'portal-search-input',
        value: state.fruitSearch,
        placeholder:
          t.fruitSearchPlaceholder ||
          '🔍 Search 21 Devil Fruits or wielders (e.g. Paw, Brain, Law, Magma, Phoenix)...',
        attrs: { 'aria-label': isYue ? '搜尋惡魔果實' : 'Search Devil Fruits' },
        onInput: (e) => {
          state.fruitSearch = e.target.value;
          renderActivePanel();
        }
      })
    ]);

    const types = [
      { val: 'All', label: isYue ? '全部惡魔果實' : 'All Devil Fruits' },
      { val: 'Paramecia', label: isYue ? '超人系' : 'Paramecia Type' },
      { val: 'Zoan', label: isYue ? '動物系' : 'Zoan Type' },
      { val: 'Logia', label: isYue ? '自然系' : 'Logia Type' }
    ];
    const chipRow = el('div', { className: 'chip-row' });
    types.forEach((tOpt) => {
      chipRow.appendChild(
        el('button', {
          type: 'button',
          className: 'chip-btn' + (state.fruitCategoryFilter === tOpt.val ? ' active' : ''),
          text: tOpt.label,
          onClick: () => {
            state.fruitCategoryFilter = tOpt.val;
            renderActivePanel();
          }
        })
      );
    });

    const fruits = getFilteredFruits();
    const activeFruit =
      fruits.find((f) => f.id === state.selectedFruitId) ||
      fruits[0] ||
      HELPERS.getDevilFruitForEra(DATA.devilFruits[0], state.eraFilter, state.lang);

    const fruitGrid = el('div', { className: 'location-pill-grid' });
    fruits.forEach((df) => {
      const wielder = getSafeCharacterById(df.characterId || 'luffy');
      fruitGrid.appendChild(
        el(
          'button',
          {
            type: 'button',
            className: 'location-pill' + (df.id === activeFruit.id ? ' selected' : ''),
            onClick: () => {
              state.selectedFruitId = df.id;
              soundFX.playLogPoseChime();
              engine3D.setMode('devil-fruit');
              engine3D.setDevilFruit(df);
              renderActivePanel();
            }
          },
          [
            el('img', {
              className: 'pill-avatar fruit-pill-avatar',
              src: df.image || wielder.image,
              alt: df.name
            }),
            el('span', { text: df.englishName.split(' (')[0].split('（')[0] })
          ]
        )
      );
    });

    const wielderChar = getSafeCharacterById(activeFruit.characterId || 'luffy');
    const wielderImgUrl =
      activeFruit.id === 'gomu-nika' && isEraAllowed('wano')
        ? '/assets/characters/luffy-gear5.jpg'
        : wielderChar.image;

    const shortFruitName = activeFruit.englishName.split(' (')[0].split('（')[0];
    const unleashBtn = el('button', {
      type: 'button',
      className: 'action-btn gold full-width',
      text: isYue
        ? '⚡ 喺立體視窗釋放「' + shortFruitName + '」能力特效！'
        : '⚡ Unleash ' + shortFruitName + ' Power in 3D Holodeck!',
      onClick: () => {
        engine3D.setMode('devil-fruit');
        engine3D.setDevilFruit(activeFruit);
        engine3D.triggerPowerBurst();
        if (activeFruit.id === 'gomu-nika' && isEraAllowed('wano')) {
          soundFX.playDrumsOfLiberation();
        } else {
          soundFX.playHakiBoom();
        }
        awardPoneglyph('wano', isYue ? '立體惡魔果實覺醒研究' : '3D Devil Fruit Awakening Study');
        renderActivePanel();
      }
    });

    const detailCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill',
          text: activeFruit.categoryDisplay || activeFruit.category
        }),
        el('span', {
          className: 'coord-badge',
          text: activeFruit.awakened
            ? isYue
              ? '🌟 已確認果實覺醒！'
              : '🌟 Awakened Confirmed!'
            : isYue
              ? '📖 惡魔果實圖鑑'
              : '📖 Akuma no Mi Zukan'
        })
      ]),
      el('div', { className: 'zukan-fruit-showcase' }, [
        el('div', { className: 'zukan-fruit-art-frame' }, [
          el('img', {
            className: 'zukan-fruit-art-img',
            src: activeFruit.image,
            alt: activeFruit.name
          }),
          el('span', {
            className: 'zukan-fruit-art-caption',
            text: isYue ? '📖 官方惡魔果實圖鑑型態' : '📖 Official Akuma no Mi Zukan Form'
          })
        ]),
        el('div', { className: 'zukan-fruit-meta-col' }, [
          el('div', { className: 'island-hero-header' }, [
            el('img', {
              className: 'island-hero-portrait',
              src: wielderImgUrl,
              alt: activeFruit.user
            }),
            el('div', {}, [
              el('h2', { className: 'card-title', text: activeFruit.name }),
              el('p', {
                className: 'card-subtitle',
                text: isYue
                  ? activeFruit.englishName + ' • 能力者：' + activeFruit.user
                  : activeFruit.englishName + ' • Wielded by: ' + activeFruit.user
              })
            ])
          ]),
          activeFruit.zukanShape
            ? el('div', { className: 'zukan-shape-callout' }, [
                el('strong', {
                  text: isYue
                    ? '🍇 漫畫果實外觀與設定來源：'
                    : '🍇 Canonical Manga Morphology & Source:'
                }),
                el('p', { text: activeFruit.zukanShape })
              ])
            : null,
          el('button', {
            type: 'button',
            className: 'inline-link-btn',
            text: isYue
              ? '🏴‍☠️ 查看' + wielderChar.name + '懸賞令與能力值 →'
              : '🏴‍☠️ Inspect ' + wielderChar.name + ' Poster & Stats →',
            onClick: () => {
              state.selectedCharacterId = wielderChar.id;
              state.selectedBountyIndex = null;
              switchTab('characters');
            }
          }),
          unleashBtn
        ])
      ]),
      el('p', { className: 'card-body-text', text: activeFruit.powerSummary }),
      el('div', { className: 'lesson-callout' }, [
        el('strong', {
          text: isYue ? '🌊 自然弱點與剋星：' : '🌊 Natural Weakness & Counter:'
        }),
        el('p', { text: activeFruit.weakness })
      ])
    ]);

    container.appendChild(zukanGalleryBox);
    container.appendChild(searchRow);
    container.appendChild(chipRow);
    container.appendChild(fruitGrid);
    container.appendChild(detailCard);
  }

  // =========================================================================
  // TAB 7: ONE PIECE WORLD LORE, HAKI DOJO & ERA-SAFE KID'S QUIZ
  // =========================================================================
  function renderLoreAndQuizInspector(container) {
    const isYue = state.lang === 'yue';
    if (isEraAllowed('pre-timeskip')) {
      const hakiDojoCard = el('section', { className: 'feature-card haki-dojo-card' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('span', {
            className: 'badge-pill',
            text: isYue ? '⚡ 互動立體霸氣道場' : '⚡ Interactive 3D Haki Dojo'
          }),
          el('span', {
            className: 'coord-badge',
            text: isYue ? '體驗三大霸氣！' : 'Try All 3 Haki Types!'
          })
        ]),
        el('h2', {
          className: 'card-title',
          text: isYue ? '喺立體視窗測試霸氣威力！' : 'Test Haki in the Viewport!'
        }),
        el('p', {
          className: 'card-body-text',
          text: isYue
            ? '撳下面任何一個霸氣掣，即可喺立體視窗釋放見聞色、武裝色或者霸王色霸氣衝擊波！'
            : "Click any Haki button below to unleash Observation, Armament, or Conqueror's Haki shockwaves across the 3D viewport!"
        }),
        el('div', { className: 'voyage-controls' }, [
          el('button', {
            type: 'button',
            className: 'action-btn secondary',
            text: isYue ? '👁️ 見聞色（預知雷達）' : '👁️ Observation (Radar)',
            onClick: () => {
              soundFX.playLogPoseChime();
              engine3D.triggerHakiDemo('observation');
            }
          }),
          el('button', {
            type: 'button',
            className: 'action-btn primary',
            text: isYue ? '🥊 武裝色（黑雷硬化）' : '🥊 Armament (Armor)',
            onClick: () => {
              soundFX.playHakiBoom();
              engine3D.triggerHakiDemo('armament');
            }
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold',
            text: isYue ? '⚡ 霸王色（皇者閃電）' : "⚡ Conqueror's Lightning",
            onClick: () => {
              soundFX.playHakiBoom();
              engine3D.triggerHakiDemo('conqueror');
            }
          })
        ])
      ]);
      container.appendChild(hakiDojoCard);
    }

    const indexedQuestions = DATA.quizQuestions.map((q, origIdx) => ({ raw: q, origIdx }));
    const filteredQuestions = indexedQuestions.filter((item) => isEraAllowed(item.raw.era));
    const safeIndexed =
      filteredQuestions.length > 0 ? filteredQuestions : indexedQuestions.slice(0, 3);
    const safeList = safeIndexed.map((item) =>
      HELPERS.getQuizForLang
        ? HELPERS.getQuizForLang(item.raw, item.origIdx, state.lang)
        : item.raw
    );
    const currentQ = safeList[state.quizIndex % safeList.length];

    const optionButtons = currentQ.options.map((optText, idx) => {
      let btnClass = 'quiz-opt-btn';
      if (state.quizAnswered) {
        if (idx === currentQ.correctIndex) btnClass += ' correct';
        else if (idx === state.selectedQuizOption) btnClass += ' wrong';
      }
      return el('button', {
        type: 'button',
        className: btnClass,
        text: optText,
        disabled: state.quizAnswered,
        onClick: () => {
          state.quizAnswered = true;
          state.selectedQuizOption = idx;
          if (idx === currentQ.correctIndex) {
            state.quizScore += 1;
            soundFX.playTreasureFanfare();
            engine3D.triggerHakiDemo('conqueror');
            awardPoneglyph(
              'quiz',
              isYue ? '偉大航道航海家問答滿分認證' : 'Navigator Scholar Quiz Mastery'
            );
          } else {
            soundFX.playDenDenMushi();
          }
          renderActivePanel();
        }
      });
    });

    const quizFeedback = state.quizAnswered
      ? el('div', { className: 'lesson-callout' }, [
          el('strong', {
            text:
              state.selectedQuizOption === currentQ.correctIndex
                ? isYue
                  ? '🎉 超級正確！答得好！'
                  : '🎉 SUUUPER! Correct Answer!'
                : isYue
                  ? '🧭 差少少咋！偉大航道秘密揭曉：'
                  : '🧭 Good try, Sailor! Here is the Grand Line secret:'
          }),
          el('p', { text: currentQ.explanation }),
          el('button', {
            type: 'button',
            className: 'action-btn gold',
            text: isYue ? '下一條問題 ➡' : 'Next Question ➡',
            onClick: () => {
              state.quizIndex = (state.quizIndex + 1) % safeList.length;
              state.quizAnswered = false;
              state.selectedQuizOption = null;
              renderActivePanel();
            }
          })
        ])
      : null;

    const quizCard = el('section', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill',
          text: isYue
            ? '🏴‍☠️ 偉大航道航海家問答挑戰（第 ' +
              ((state.quizIndex % safeList.length) + 1) +
              ' / ' +
              safeList.length +
              ' 題）'
            : '🏴‍☠️ Grand Line Explorer Quiz (' +
              ((state.quizIndex % safeList.length) + 1) +
              ' / ' +
              safeList.length +
              ')'
        }),
        el('span', {
          className: 'coord-badge',
          text: isYue ? '⭐ 得分：' + state.quizScore : '⭐ Score: ' + state.quizScore
        })
      ]),
      el('h3', { className: 'card-title', text: currentQ.question }),
      el('div', { className: 'quiz-options-list' }, optionButtons),
      quizFeedback
    ]);
    container.appendChild(quizCard);

    const allowedLore = DATA.loreTopics
      .filter((tItem) => isEraAllowed(tItem.era))
      .map((tItem) => (HELPERS.getLoreForLang ? HELPERS.getLoreForLang(tItem, state.lang) : tItem));
    allowedLore.forEach((topic) => {
      const stepBlocks = topic.steps.map((st) =>
        el('div', { className: 'lore-step-block' }, [
          el('h4', { className: 'lore-step-heading', text: st.heading }),
          el('p', { className: 'lore-step-detail', text: st.detail })
        ])
      );

      const card = el('article', { className: 'feature-card' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('span', { className: 'badge-pill', text: topic.icon + ' ' + topic.badge })
        ]),
        el('h2', { className: 'card-title', text: topic.title }),
        el('p', { className: 'card-body-text', text: topic.summary }),
        el('div', { className: 'lore-steps-container' }, stepBlocks)
      ]);
      container.appendChild(card);
    });
  }

  // =========================================================================
  // INITIALIZE PORTAL ON DOM READY
  // =========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('globe-canvas');
    engine3D = new window.OnePiece3DEngine(canvas, {
      onSelectLocation: (loc) => {
        state.selectedLocationId = loc.id;
        soundFX.playLogPoseChime();
        checkLocationPoneglyphs(loc.id);
        if (state.activeTab !== 'globe') {
          switchTab('globe', true);
        } else {
          renderActivePanel();
        }
      },
      onSelectMapHotspot: (hotspot, hotspotIndex) => {
        state.selectedHotspotIndex = hotspotIndex;
        state.selectedLocationId = hotspot.locationId;
        soundFX.playLogPoseChime();
        checkLocationPoneglyphs(hotspot.locationId);
        state.activeTab = 'maps';
        renderActivePanel();
      }
    });

    updatePoneglyphHeaderUI();
    syncViewportMapButtons();

    if (ANALYTICS) {
      ANALYTICS.initCookieConsent();
    }

    soundFX.onSpeechStateChange((speaking) => {
      syncReadAloudButtonsUI(speaking);
    });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.onvoiceschanged = () => {
          populateVoiceOptions();
        };
      } catch (_e) {
        // Ignore onvoiceschanged assignment error
      }
    }

    // 11-Language Selector
    const langSelect = document.getElementById('lang-select');
    if (langSelect && I18N) {
      langSelect.value = state.lang;
      langSelect.addEventListener('change', (e) => {
        soundFX.stopSpeech();
        state.lang = I18N.saveLanguage(e.target.value);
        applyLanguageUI();
        renderActivePanel();
        if (ANALYTICS) {
          ANALYTICS.trackEvent('switch_language', { lang: state.lang });
        }
      });
    }

    // Topbar Read Aloud Button
    const readAloudMainBtn = document.getElementById('btn-read-aloud-main');
    if (readAloudMainBtn) {
      readAloudMainBtn.addEventListener('click', () => {
        const textToRead =
          state.activeNarrationText ||
          (I18N
            ? I18N.buildCardNarrationText(state.lang, {
                title: getStrings().brandTitle,
                summary: getStrings().brandSubtitle
              })
            : 'Welcome to the One Piece 3D Grand Line Portal.');
        soundFX.speakText(textToRead, state.lang);
        if (ANALYTICS) {
          ANALYTICS.trackEvent('read_aloud', { tab: state.activeTab, lang: state.lang, source: 'header' });
        }
      });
    }

    // Narrator Voice Selector
    const voiceSelect = document.getElementById('narrator-voice-select');
    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        soundFX.setPreferredVoiceURI(e.target.value || '');
        if (soundFX.isSpeaking && state.activeNarrationText) {
          soundFX.stopSpeech();
          soundFX.speakText(state.activeNarrationText, state.lang);
        }
      });
    }

    // Dark / Light Theme Mode Toggle Button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyThemeMode(nextTheme, true);
        soundFX.playLogPoseChime();
        if (ANALYTICS) {
          ANALYTICS.trackEvent('toggle_theme', { theme: nextTheme });
        }
      });
    }

    // Sound Toggle Button
    const soundBtn = document.getElementById('sound-toggle-btn');
    const syncSoundBtn = () => {
      if (!soundBtn) return;
      const t = getStrings();
      soundBtn.textContent = state.soundEnabled
        ? (t.soundOn || '🔊 Sound FX: ON')
        : (t.soundOff || '🔇 Sound FX: OFF');
      soundBtn.setAttribute('aria-pressed', state.soundEnabled ? 'true' : 'false');
    };
    syncSoundBtn();
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundFX.setEnabled(state.soundEnabled);
        syncSoundBtn();
        persistState();
      });
    }

    applyLanguageUI();

    // Compact "More" Header Menu auto-dismiss on outside click or Escape
    const moreMenu = document.getElementById('header-more-menu');
    if (moreMenu) {
      document.addEventListener('click', (e) => {
        if (moreMenu.open && !moreMenu.contains(e.target)) {
          moreMenu.open = false;
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && moreMenu.open) {
          moreMenu.open = false;
        }
      });
      const cookieSettingsBtn = document.getElementById('btn-cookie-settings');
      if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', () => {
          moreMenu.open = false;
        });
      }
    }

    // Road Poneglyph Quest Header Pill
    const questBtn = document.getElementById('poneglyph-status-btn');
    if (questBtn) {
      questBtn.addEventListener('click', () => {
        if (moreMenu) moreMenu.open = false;
        state.showQuestDrawer = !state.showQuestDrawer;
        soundFX.playDenDenMushi();
        renderActivePanel();
      });
    }

    // Top Navigation Tabs + WAI-ARIA Roving Tabindex (ArrowLeft / ArrowRight / Home / End)
    const tabBtns = Array.from(document.querySelectorAll('[data-tab-btn]'));
    tabBtns.forEach((btn, idx) => {
      btn.setAttribute('tabindex', idx === 0 ? '0' : '-1');
      btn.addEventListener('click', () => {
        switchTab(btn.getAttribute('data-tab-btn'));
      });
      btn.addEventListener('keydown', (e) => {
        let nextIdx = null;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabBtns.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabBtns.length) % tabBtns.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabBtns.length - 1;

        if (nextIdx !== null) {
          e.preventDefault();
          const targetBtn = tabBtns[nextIdx];
          targetBtn.focus();
          switchTab(targetBtn.getAttribute('data-tab-btn'));
        }
      });
    });

    // Viewport Quick Switcher between 3D Planet Globe and Canonical Manga Maps
    const viewSwitchBtns = document.querySelectorAll('[data-view-switch]');
    viewSwitchBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-view-switch');
        soundFX.playLogPoseChime();
        if (key === '3d-globe') {
          engine3D.setMode('globe');
          updateViewportSwitcherHighlight('3d-globe');
          const viewportBadge = document.getElementById('viewport-mode-badge');
          const t = getStrings();
          if (viewportBadge) {
            viewportBadge.textContent = t.badge3dGlobe || '🌍 3D ONE PIECE PLANET GLOBE';
          }
        } else {
          openMangaMapInViewport(key);
          if (state.activeTab !== 'maps') {
            state.activeTab = 'maps';
            syncWorkspaceLayout('maps');
            tabBtns.forEach((nb) => {
              const isMatch = nb.getAttribute('data-tab-btn') === 'maps';
              nb.classList.toggle('active', isMatch);
              nb.setAttribute('aria-selected', isMatch ? 'true' : 'false');
            });
          }
          renderActivePanel();
        }
      });
    });

    // Spoiler Shield Selector
    const spoilerSelect = document.getElementById('spoiler-select');
    if (spoilerSelect) {
      spoilerSelect.addEventListener('change', (e) => {
        state.eraFilter = e.target.value;
        state.activeArcIndex = 0;
        state.quizIndex = 0;
        state.quizAnswered = false;
        state.selectedBountyIndex = null;
        engine3D.setEraFilter(state.eraFilter);
        syncLaughTaleEngineLock();
        syncViewportMapButtons();

        if (state.activeTab === 'devil-fruits') {
          const rawFruit =
            DATA.devilFruits.find((f) => f.id === state.selectedFruitId && isEraAllowed(f.era)) ||
            DATA.devilFruits[0];
          engine3D.setDevilFruit(
            HELPERS.getDevilFruitForEra(rawFruit, state.eraFilter, state.lang)
          );
        } else if (state.activeTab === 'ships') {
          const safeShip = isEraAllowed('pre-timeskip') ? state.selectedShipId : 'going-merry';
          state.selectedShipId = safeShip;
          engine3D.setShip(safeShip);
        }

        soundFX.playLogPoseChime();
        renderActivePanel();
      });
    }

    // 3D Viewport HUD Camera Controls (including Canonical 45° X-Axis Tilt!)
    const btnZoomIn = document.getElementById('hud-zoom-in');
    const btnZoomOut = document.getElementById('hud-zoom-out');
    const btnReset = document.getElementById('hud-reset');
    const btnSpin = document.getElementById('hud-toggle-spin');
    const btnTiltX = document.getElementById('hud-tilt-x');

    if (btnSpin) {
      const tInit = getStrings();
      btnSpin.textContent = engine3D.autoRotate
        ? tInit.pauseSpin || '⏸ Pause Spin'
        : tInit.autoSpin || '🔄 Auto-Spin';
    }

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (engine3D.mode === 'manga-map') {
          engine3D.targetMapZoom = Math.min(2.5, engine3D.targetMapZoom + 0.25);
        } else {
          engine3D.targetZoom = Math.min(1.9, engine3D.targetZoom + 0.18);
        }
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (engine3D.mode === 'manga-map') {
          engine3D.targetMapZoom = Math.max(0.85, engine3D.targetMapZoom - 0.25);
        } else {
          engine3D.targetZoom = Math.max(0.72, engine3D.targetZoom - 0.18);
        }
      });
    }
    if (btnTiltX) {
      btnTiltX.addEventListener('click', () => {
        const tilted = engine3D.toggleCanonicalTilt();
        const t = getStrings();
        btnTiltX.textContent = tilted
          ? t.tilt45 || '🧭 45° X-Tilt: ON'
          : t.tiltFlat || '🧭 Upright North';
        btnTiltX.classList.toggle('active-hud', tilted);
        soundFX.playLogPoseChime();
      });
    }
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        engine3D.resetCamera();
        soundFX.playLogPoseChime();
      });
    }
    if (btnSpin) {
      btnSpin.addEventListener('click', () => {
        engine3D.autoRotate = !engine3D.autoRotate;
        const t = getStrings();
        btnSpin.textContent = engine3D.autoRotate
          ? t.pauseSpin || '⏸ Pause Spin'
          : t.autoSpin || '🔄 Auto-Spin';
      });
    }

    // Keyboard Arrow panning on 2D Manga Maps AND rotation on 3D Globe!
    canvas.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        engine3D.panOrRotateBy(1, 0);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        engine3D.panOrRotateBy(-1, 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        engine3D.panOrRotateBy(0, 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        engine3D.panOrRotateBy(0, -1);
      }
    });

    syncWorkspaceLayout(state.activeTab);
    renderActivePanel();
  });
})();
