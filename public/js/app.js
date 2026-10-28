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

  const saved = loadPortalProgress();
  const soundFX = new window.OnePieceSoundFX(saved.soundEnabled);

  const state = {
    activeTab: 'globe', // 'globe' | 'maps' | 'timeline' | 'characters' | 'crew' | 'devil-fruits' | 'lore'
    eraFilter: 'wano',
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

    selectedCharacterId: 'luffy',
    selectedBountyIndex: null, // null = latest unlocked milestone for active era
    luffyUseGear5Photo: true,
    rivalCharacterId: 'kaido',
    characterFactionFilter: 'All',
    characterSearch: '',
    characterSort: 'story', // 'story' | 'bounty' | 'power'
    activeArtBanner: 'strawhat', // 'strawhat' | 'yonko' | 'warlords' | 'favorites'

    selectedFruitId: 'gomu-nika',
    fruitCategoryFilter: 'All',
    fruitSearch: '',

    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    selectedQuizOption: null
  };

  let engine3D = null;

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
    return HELPERS.getCharacterForEra(raw, state.eraFilter);
  }

  function getAllowedMaps() {
    const allowed = DATA.canonicalMaps.filter((m) => isEraAllowed(m.era));
    return allowed.length > 0 ? allowed : [DATA.canonicalMaps[0]];
  }

  function getMapById(mapId) {
    const allowed = getAllowedMaps();
    return allowed.find((m) => m.id === mapId) || allowed[0];
  }

  function syncLaughTaleEngineLock() {
    if (!engine3D) return;
    const allFour = countPoneglyphs(state.poneglyphs) === 4;
    engine3D.setLaughTaleUnlocked(allFour && state.eraFilter === 'wano');
  }

  function updatePoneglyphHeaderUI() {
    const btn = document.getElementById('poneglyph-status-btn');
    if (!btn) return;
    const count = countPoneglyphs(state.poneglyphs);
    if (count === 4) {
      btn.textContent = '👑 Laugh Tale Unlocked (4/4)!';
      btn.classList.add('quest-complete');
    } else {
      btn.textContent = '🟥 Road Poneglyphs: ' + count + '/4';
      btn.classList.remove('quest-complete');
    }
    syncLaughTaleEngineLock();
  }

  function awardPoneglyph(key, label) {
    if (!state.poneglyphs[key]) {
      state.poneglyphs[key] = true;
      persistState();
      const newCount = countPoneglyphs(state.poneglyphs);
      soundFX.playTreasureFanfare();
      if (newCount === 4) {
        state.justUnlockedBanner =
          '👑 ALL 4 ROAD PONEGLYPHS DECIPHERED! Crimson X-Coordinates to LAUGH TALE are now glowing on the 3D Planet Globe!';
      } else {
        state.justUnlockedBanner =
          '🟥 ROAD PONEGLYPH FOUND (' + newCount + '/4): ' + label + '!';
      }
      updatePoneglyphHeaderUI();
    }
  }

  function checkLocationPoneglyphs(locationId) {
    if (locationId === 'zou') {
      awardPoneglyph('zou', 'Whale Forest Rubbing on Zunesha');
    } else if (locationId === 'whole-cake') {
      awardPoneglyph('wholeCake', "Brook's Secret Rubbing from Whole Cake Vault");
    } else if (locationId === 'wano') {
      awardPoneglyph('wano', 'Submerged Old Wano Rubbing beneath Mt. Fuji');
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
    const mapObj = getMapById(mapId);
    state.activeMapId = mapObj.id;
    state.selectedHotspotIndex = 0;

    if (mapObj.id === 'wano-onigashima-woodblock-map') {
      awardPoneglyph('wano', 'Old Wano Cartography Scroll');
    }

    engine3D.setActiveMangaMap(mapObj.id);
    engine3D.setMode('manga-map');
    updateViewportSwitcherHighlight(mapObj.id);

    const viewportBadge = document.getElementById('viewport-mode-badge');
    const viewportHint = document.getElementById('viewport-hint-text');
    if (viewportBadge) viewportBadge.textContent = '🗺️ ' + mapObj.badge.toUpperCase();
    if (viewportHint) {
      viewportHint.textContent =
        'Drag or Arrow-keys to pan • Scroll or pinch to zoom • Click any Character Pin!';
    }
  }

  function switchTab(tabId, silentSound) {
    stopAutoSail();
    state.activeTab = tabId;
    if (!silentSound) {
      soundFX.playDenDenMushi();
    }

    const navButtons = document.querySelectorAll('[data-tab-btn]');
    navButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab-btn') === tabId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      btn.setAttribute('tabindex', isMatch ? '0' : '-1');
    });

    const viewportBadge = document.getElementById('viewport-mode-badge');
    const viewportHint = document.getElementById('viewport-hint-text');

    if (tabId === 'maps') {
      openMangaMapInViewport(state.activeMapId);
    } else if (tabId === 'devil-fruits') {
      engine3D.setMode('devil-fruit');
      updateViewportSwitcherHighlight('3d-globe');
      const rawFruit =
        DATA.devilFruits.find((f) => f.id === state.selectedFruitId && isEraAllowed(f.era)) ||
        DATA.devilFruits[0];
      state.selectedFruitId = rawFruit.id;
      engine3D.setDevilFruit(HELPERS.getDevilFruitForEra(rawFruit, state.eraFilter));
      if (viewportBadge) viewportBadge.textContent = '🍇 3D DEVIL FRUIT HOLODECK';
      if (viewportHint) {
        viewportHint.textContent =
          'Drag or pinch to inspect the 3D Devil Fruit • Click "Unleash Power!" for 3D effects';
      }
    } else if (tabId === 'timeline') {
      engine3D.setMode('timeline');
      updateViewportSwitcherHighlight('3d-globe');
      engine3D.focusTimelineArc(state.activeArcIndex);
      if (viewportBadge) viewportBadge.textContent = '🧭 3D LOG POSE VOYAGE';
      if (viewportHint) {
        viewportHint.textContent =
          'Watch the Going Merry & Thousand Sunny sail shortest-arc routes across the 3D globe!';
      }
    } else {
      engine3D.setMode('globe');
      updateViewportSwitcherHighlight('3d-globe');
      if (viewportBadge) viewportBadge.textContent = '🌍 3D ONE PIECE PLANET GLOBE';
      if (viewportHint) {
        viewportHint.textContent =
          'Drag to spin • Pinch/scroll to zoom • Toggle 🧭 45° X-Tilt below to match Crocus\'s map!';
      }
    }

    renderActivePanel();
  }

  function renderQuestBannerAndDrawer(container) {
    if (state.justUnlockedBanner) {
      const toast = el('div', { className: 'poneglyph-toast-banner' }, [
        el('span', { text: state.justUnlockedBanner }),
        el('button', {
          type: 'button',
          className: 'toast-dismiss-btn',
          text: '✕',
          attrs: { 'aria-label': 'Dismiss treasure notification' },
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
        title: '1. Whale Forest Rubbing (Zou)',
        hint: 'Visit Zou (Zunesha) on the 3D Globe or reach Zou on the Log Pose Timeline!',
        actionText: isEraAllowed('wano') ? '🐘 Fly to Zou' : '🔒 Unlocks in Wano Mode',
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
        title: "2. Big Mom's Vault Rubbing (Whole Cake)",
        hint: 'Inspect Whole Cake Island or open Katakuri / Big Mom Wanted Poster!',
        actionText: isEraAllowed('wano') ? '🍰 Fly to Whole Cake' : '🔒 Unlocks in Wano Mode',
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
        title: '3. Submerged Old Wano Rubbing',
        hint: 'Inspect Wano Country, open the Wano Map, or Unleash any 3D Devil Fruit!',
        actionText: '🍇 Unleash a 3D Fruit',
        canJump: true,
        onJump: () => {
          switchTab('devil-fruits');
        }
      },
      {
        key: 'quiz',
        title: '4. Navigator Scholar Trial',
        hint: 'Answer any One Piece Quiz question right or run a 1v1 Haki Clash!',
        actionText: '📜 Go to Quiz & Haki Dojo',
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
          text: '🟥 ROAD PONEGLYPH TREASURE HUNT (' + count + '/4)'
        }),
        el('div', { className: 'chip-row' }, [
          el('button', {
            type: 'button',
            className: 'chip-btn',
            text: '🔄 Reset Quest',
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
            text: 'Close',
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
            ? '🎉 AMAZING! All 4 Crimson Road Poneglyphs are yours! Switch to the 3D Globe (in Wano Spoiler Mode) to see the 4 red laser beams cross over Laugh Tale!'
            : 'Find all 4 Crimson Road Poneglyphs hidden across the portal to unlock Gol D. Roger\'s final island, Laugh Tale, on the 3D Globe!'
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
    } else if (state.activeTab === 'characters') {
      renderCharactersInspector(container);
    } else if (state.activeTab === 'crew') {
      window.OP_CREW_BUILDER.renderCrewBuilderTab(container, {
        eraFilter: state.eraFilter,
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
    return DATA.worldLocations.filter((loc) => {
      if (!isEraAllowed(loc.era)) return false;
      if (loc.id === 'laugh-tale' && !allComplete) {
        // Still allow seeing Laugh Tale in Wano mode or mark it mysterious! Let's keep it inspectable in Wano mode,
        // and show a Poneglyph lock hint if <4 rubbings!
      }
      if (state.globeCategoryFilter !== 'All' && loc.category !== state.globeCategoryFilter) {
        return false;
      }
      return true;
    });
  }

  function renderGlobeInspector(container) {
    const categories = [
      'All',
      'Four Blues',
      'World Geography',
      'Grand Line — Paradise',
      'Grand Line — New World',
      'Sky Sea',
      'Undersea Gateway'
    ];

    const filterRow = el('div', {
      className: 'chip-row',
      attrs: { role: 'group', 'aria-label': 'Filter world regions' }
    });
    categories.forEach((cat) => {
      filterRow.appendChild(
        el('button', {
          type: 'button',
          className: 'chip-btn' + (state.globeCategoryFilter === cat ? ' active' : ''),
          text: cat,
          onClick: () => {
            state.globeCategoryFilter = cat;
            renderActivePanel();
          }
        })
      );
    });

    const locations = getFilteredLocations();
    const activeLoc =
      locations.find((l) => l.id === state.selectedLocationId) ||
      locations[0] ||
      DATA.worldLocations[0];

    const locationGrid = el('div', { className: 'location-pill-grid' });
    locations.forEach((loc) => {
      const shortTitle = loc.name.split(' (')[0];
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
            'Collect all 4 Crimson Road Poneglyphs (click the red badge in the top bar!) to project the 4 laser coordinates to Laugh Tale on the 3D Globe!',
            ...activeLoc.keyFacts.slice(0, 1)
          ]
        : activeLoc.keyFacts
    ).map((fact) => el('li', { className: 'fact-item', text: fact }));

    const detailCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', { className: 'badge-pill', text: activeLoc.category }),
        el('span', {
          className: 'coord-badge',
          text:
            activeLoc.altitude > 0.1
              ? '☁️ +10,000m Sky Sea'
              : activeLoc.altitude < -0.05
              ? '🫧 -10,000m Undersea'
              : '🌊 Sea Level'
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
            text:
              '🏴‍☠️ Featured Pirate/Hero: ' +
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
      el('h3', { className: 'section-subhead', text: '🧭 Explorer Notes for Kids' }),
      el('ul', { className: 'fact-list' }, factItems),
      el('div', { className: 'embedded-map-preview' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('strong', {
            className: 'section-subhead',
            text: '🗺️ Canonical Manga/Anime Map: ' + linkedMap.title
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold compact',
            text: '🔍 Open Map in Main Viewport',
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
          text: '🌍 Switch Back to 3D Spinning Globe',
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
        text: '📍 Click Any Pin on the Map (or Below) to Inspect:'
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
                    text: '🌍 Fly to Location on 3D Globe',
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
                    text: '🏴‍☠️ Open ' + hsChar.name + ' Wanted Poster',
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
    return DATA.timelineArcs.filter((arc) => isEraAllowed(arc.era));
  }

  function renderTimelineInspector(container) {
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
      text: '⬅ Previous Island',
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
      text: state.autoSailInterval ? '⏸ Pause Voyage' : '⛵ Auto-Sail Grand Line',
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
      text: 'Next Island ➡',
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
          title: arc.saga + ': ' + arc.title,
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
        : [el('span', { className: 'crew-tag muted', text: 'Crew Holds Strong' })];

    const arcPortraitSrc =
      currentArc.id === 'onigashima-gear5' && state.eraFilter === 'wano'
        ? '/assets/characters/luffy-gear5.jpg'
        : heroChar.image;

    const arcCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill',
          text:
            'Log Pose Stop ' +
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
            text: currentArc.episodes + ' • Bounty Milestone: ฿ ' + currentArc.bountyMilestone
          })
        ])
      ]),
      el('p', { className: 'card-body-text', text: currentArc.storySummary }),
      el('div', { className: 'meta-two-col' }, [
        el('div', { className: 'meta-box' }, [
          el('span', { className: 'meta-label', text: 'Crewmates Joined' }),
          el('div', { className: 'tag-wrap' }, crewTags)
        ]),
        el('div', { className: 'meta-box' }, [
          el('span', { className: 'meta-label', text: 'Main Arc Antagonists' }),
          el('p', { className: 'meta-val', text: currentArc.mainBoss })
        ])
      ]),
      el('div', { className: 'lesson-callout' }, [
        el('strong', { text: '💡 What We Learn About the One Piece World:' }),
        el('p', { text: currentArc.worldLesson })
      ]),
      el('button', {
        type: 'button',
        className: 'action-btn gold full-width',
        text: '🗺️ View ' + arcMap.badge + ' in Viewport',
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
  // TAB 4: CHARACTERS, ARTWORK, BOUNTY EVOLUTION SLIDER & 1v1 CLASH
  // =========================================================================
  function getFilteredAndSortedCharacters() {
    const query = state.characterSearch.trim().toLowerCase();
    const list = DATA.characters
      .filter((raw) => isEraAllowed(raw.era))
      .map((raw) => HELPERS.getCharacterForEra(raw, state.eraFilter))
      .filter((ch) => {
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
            ch.faction
          ).toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

    if (state.characterSort === 'bounty') {
      list.sort((a, b) => (b.bounty || 0) - (a.bounty || 0) || b.powerScore - a.powerScore);
    } else if (state.characterSort === 'power') {
      list.sort((a, b) => b.powerScore - a.powerScore || (b.bounty || 0) - (a.bounty || 0));
    }
    return list;
  }

  function renderCharactersInspector(container) {
    // Era-filtered Key Visual Art Banners (never leaks Gear 5 / Wano in beginner modes!)
    const banners = [
      {
        key: 'strawhat',
        era: 'east-blue',
        btnText: '👒 Straw Hat Crew Art',
        src: '/assets/characters/strawhat_crew_banner.jpg',
        caption: '👒 Straw Hat Pirates Crew & Wanted Posters!'
      },
      {
        key: 'warlords',
        era: 'pre-timeskip',
        btnText: '🔥 Brothers, Warlords & Marines',
        src: '/assets/characters/warlords_marines_grid.jpg',
        caption: '🔥 Ace, Sabo, Mihawk, Garp, Akainu, Blackbeard & Legends!'
      },
      {
        key: 'favorites',
        era: 'wano',
        btnText: '⭐ Fan Favorites & Legends Sheet',
        src: '/assets/characters/fan_favorites_grid.jpg',
        caption: '⭐ Buggy, Crocodile, Doflamingo, Boa Hancock, Yamato, Oden, Kizaru & Aokiji!'
      },
      {
        key: 'yonko',
        era: 'wano',
        btnText: '⚡ Gear 5 vs. Kaido & Emperors',
        src: '/assets/characters/yonko_gear5_banner.jpg',
        caption: '⚡ Wano Climax: Gear 5 Luffy vs. Kaido + Shanks, Whitebeard, Roger, Law & Kid!'
      }
    ].filter((b) => isEraAllowed(b.era));

    const activeBanner = banners.find((b) => b.key === state.activeArtBanner) || banners[0];
    state.activeArtBanner = activeBanner.key;

    const artGalleryBox = el('section', { className: 'art-gallery-banner' }, [
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
              renderActivePanel();
            }
          })
        )
      ),
      el('img', {
        className: 'hero-art-banner-img',
        src: activeBanner.src,
        alt: activeBanner.caption
      }),
      el('p', { className: 'hero-art-caption', text: activeBanner.caption })
    ]);

    // Search + Sort Toolbar
    const searchSortBar = el('div', { className: 'search-sort-bar' }, [
      el('input', {
        id: 'char-search-input',
        type: 'search',
        className: 'portal-search-input',
        value: state.characterSearch,
        placeholder: '🔍 Search 30+ pirates, Marines, or Devil Fruits...',
        attrs: { 'aria-label': 'Search characters' },
        onInput: (e) => {
          state.characterSearch = e.target.value;
          renderActivePanel();
        }
      }),
      el(
        'select',
        {
          className: 'portal-select',
          attrs: { 'aria-label': 'Sort characters by' },
          onChange: (e) => {
            state.characterSort = e.target.value;
            renderActivePanel();
          }
        },
        [
          { val: 'story', label: '📖 Sort: Crew / Story' },
          { val: 'bounty', label: '💰 Sort: Highest Bounty' },
          { val: 'power', label: '⚡ Sort: Highest Power' }
        ].map((opt) =>
          el('option', {
            value: opt.val,
            selected: state.characterSort === opt.val,
            text: opt.label
          })
        )
      )
    ]);

    const factions = [
      'All',
      'Straw Hat Pirates',
      'Four Emperors (Yonko)',
      'Legends',
      'Worst Generation',
      'Marines & World Gov',
      'Seven Warlords / Legends',
      'Revolutionary Army'
    ];

    const factionRow = el('div', { className: 'chip-row' });
    factions.forEach((fac) => {
      factionRow.appendChild(
        el('button', {
          type: 'button',
          className: 'chip-btn' + (state.characterFactionFilter === fac ? ' active' : ''),
          text: fac,
          onClick: () => {
            state.characterFactionFilter = fac;
            renderActivePanel();
          }
        })
      );
    });

    const chars = getFilteredAndSortedCharacters();
    const activeChar =
      chars.find((c) => c.id === state.selectedCharacterId) ||
      chars[0] ||
      getSafeCharacterById('luffy');

    if (activeChar.id === 'katakuri' || activeChar.id === 'big-mom') {
      awardPoneglyph('wholeCake', "Big Mom's Treasure Room Rubbing");
    }

    const charGrid = el('div', { className: 'character-roster-grid' });
    if (chars.length === 0) {
      charGrid.appendChild(
        el('p', {
          className: 'card-body-text',
          text: 'No characters matched your search in this Spoiler Era! Try clearing search.'
        })
      );
    } else {
      chars.forEach((ch) => {
        charGrid.appendChild(
          el(
            'button',
            {
              type: 'button',
              className: 'roster-btn' + (ch.id === activeChar.id ? ' selected' : ''),
              onClick: () => {
                state.selectedCharacterId = ch.id;
                state.selectedBountyIndex = null;
                soundFX.playLogPoseChime();
                renderActivePanel();
              }
            },
            [
              el('img', {
                className: 'roster-avatar-img',
                src: ch.image,
                alt: ch.name
              }),
              el('div', { className: 'roster-text-col' }, [
                el('span', { className: 'roster-name', text: ch.name }),
                el('span', {
                  className: 'roster-tier',
                  text: 'PWR ' + ch.powerScore + ' • ' + ch.tier
                })
              ])
            ]
          )
        );
      });
    }

    // Bounty Evolution Milestone Stepper (era-filtered by getCharacterForEra!)
    const history = activeChar.bountyHistory || [];
    const maxIdx = Math.max(0, history.length - 1);
    const activeBountyIdx =
      state.selectedBountyIndex === null || state.selectedBountyIndex > maxIdx
        ? maxIdx
        : state.selectedBountyIndex;
    const activeMilestone = history[activeBountyIdx] || {
      label: 'Known Bounty',
      bounty: activeChar.bounty,
      text: activeChar.bountyText
    };

    const bountyEvolutionBox =
      history.length > 1
        ? el('div', { className: 'bounty-evolution-box' }, [
            el('div', { className: 'card-kicker-row' }, [
              el('span', {
                className: 'meta-label',
                text:
                  '📜 BOUNTY EVOLUTION (' +
                  (activeBountyIdx + 1) +
                  '/' +
                  history.length +
                  '): ' +
                  activeMilestone.label
              }),
              el('span', {
                className: 'coord-badge',
                text: 'Slide through story arcs!'
              })
            ]),
            el('input', {
              type: 'range',
              className: 'bounty-range-slider',
              min: 0,
              max: maxIdx,
              step: 1,
              value: activeBountyIdx,
              attrs: { 'aria-label': 'Scrub character bounty history across story arcs' },
              onInput: (e) => {
                state.selectedBountyIndex = Number(e.target.value);
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
                    soundFX.playLogPoseChime();
                    renderActivePanel();
                  }
                })
              )
            )
          ])
        : null;

    const posterPhotoUrl =
      activeChar.canUseGear5Photo && state.luffyUseGear5Photo
        ? activeChar.altImage
        : activeChar.image;

    const gear5ToggleBtn = activeChar.canUseGear5Photo
      ? el('button', {
          type: 'button',
          className: 'action-btn gold full-width',
          text: state.luffyUseGear5Photo
            ? '👒 Switch Wanted Photo to Classic Straw Hat Luffy'
            : '⚡ Transform Wanted Photo to GEAR 5 (Sun God Nika)!',
          onClick: () => {
            state.luffyUseGear5Photo = !state.luffyUseGear5Photo;
            soundFX.playDrumsOfLiberation();
            renderActivePanel();
          }
        })
      : null;

    const hakiBadges =
      activeChar.haki && activeChar.haki.length > 0
        ? activeChar.haki.map((h) =>
            el('span', {
              className: 'haki-badge' + (h.advanced ? ' advanced' : ''),
              text: (h.advanced ? '⚡ ADV: ' : '🛡️ ') + h.name
            })
          )
        : [
            el('span', {
              className: 'haki-badge muted',
              text: 'Tech / Martial Arts / Tactics Specialist (Pre-Haki or Science!)'
            })
          ];

    const moveItems = (activeChar.signatureMoves || []).map((m) =>
      el('li', { className: 'fact-item', text: m })
    );

    const radarCanvas = el('canvas', {
      className: 'radar-canvas',
      attrs: { width: '280', height: '240', 'aria-label': '6-axis character power radar chart' }
    });

    const wantedPoster = el('article', { className: 'wanted-poster-card' }, [
      el('div', { className: 'wanted-parchment-frame' }, [
        el('div', { className: 'wanted-header' }, [
          el('span', { className: 'wanted-title', text: 'WANTED' })
        ]),
        el('div', { className: 'wanted-photo-box' }, [
          el('img', {
            className: 'wanted-portrait-img',
            src: posterPhotoUrl,
            alt: activeChar.name
          })
        ]),
        el('div', { className: 'wanted-dead-or-alive', text: 'DEAD OR ALIVE' }),
        el('div', { className: 'wanted-name-block' }, [
          el('h2', { className: 'wanted-char-name', text: activeChar.name.toUpperCase() }),
          el('p', { className: 'wanted-epithet', text: activeChar.epithet })
        ]),
        el('div', { className: 'wanted-bounty-row' }, [
          el('span', { className: 'berry-symbol', text: '฿' }),
          el('span', { className: 'bounty-amount', text: activeMilestone.text }),
          el('span', { className: 'berry-dash', text: '— MARINE' })
        ])
      ]),
      bountyEvolutionBox,
      gear5ToggleBtn,
      el('div', { className: 'power-tier-strip' }, [
        el('span', { className: 'tier-pill', text: 'Tier: ' + activeChar.tier }),
        el('span', {
          className: 'power-score-pill',
          text: 'Overall Power Level: ' + activeChar.powerScore + ' / 100'
        })
      ]),
      el('p', { className: 'card-body-text', text: activeChar.kidBio }),
      el('div', { className: 'char-split-row' }, [
        el('div', { className: 'char-details-col' }, [
          el('h3', { className: 'section-subhead', text: '🍇 Devil Fruit / Fighting Style' }),
          el('p', { className: 'df-highlight', text: activeChar.devilFruit }),
          el('h3', { className: 'section-subhead', text: '⚡ Haki Mastery' }),
          el('div', { className: 'tag-wrap' }, hakiBadges),
          el('h3', { className: 'section-subhead', text: '🔥 Signature Techniques' }),
          el('ul', { className: 'fact-list' }, moveItems)
        ]),
        el('div', { className: 'char-radar-col' }, [
          el('h3', { className: 'section-subhead center', text: '📊 6-Axis Power Radar' }),
          radarCanvas
        ])
      ])
    ]);

    // 1v1 Grand Line Clash Simulator (strictly era-projected!)
    const allAllowedChars = DATA.characters
      .filter((c) => isEraAllowed(c.era))
      .map((c) => HELPERS.getCharacterForEra(c, state.eraFilter));
    const rivalChar =
      allAllowedChars.find((c) => c.id === state.rivalCharacterId) ||
      allAllowedChars[Math.min(1, allAllowedChars.length - 1)] ||
      allAllowedChars[0];

    const rivalSelect = el(
      'select',
      {
        className: 'portal-select',
        attrs: { 'aria-label': 'Select opponent for 1v1 comparison' },
        onChange: (e) => {
          state.rivalCharacterId = e.target.value;
          soundFX.playHakiBoom();
          awardPoneglyph('quiz', 'Grand Line Tactical Clash Analysis');
          renderActivePanel();
        }
      },
      allAllowedChars.map((c) =>
        el('option', {
          value: c.id,
          selected: c.id === rivalChar.id,
          text: c.name + ' (PWR ' + c.powerScore + ')'
        })
      )
    );

    const clashVerdict = computeClashVerdict(activeChar, rivalChar);

    const clashBox = el('section', { className: 'clash-simulator-card' }, [
      el('h3', {
        className: 'section-subhead',
        text: '⚔️ 1v1 Grand Line Clash Simulator (Yellow vs. Blue on Radar)'
      }),
      el('div', { className: 'clash-faceoff-banner' }, [
        el('div', { className: 'clash-fighter-box' }, [
          el('img', {
            className: 'clash-portrait-img gold-ring',
            src: posterPhotoUrl,
            alt: activeChar.name
          }),
          el('span', {
            className: 'clash-fighter-tag',
            text: '🟡 ' + activeChar.name + ' (PWR ' + activeChar.powerScore + ')'
          })
        ]),
        el('span', { className: 'vs-badge', text: '⚡ VS ⚡' }),
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
    ]);

    container.appendChild(artGalleryBox);
    container.appendChild(searchSortBar);
    container.appendChild(factionRow);
    container.appendChild(charGrid);
    container.appendChild(wantedPoster);
    container.appendChild(clashBox);

    window.renderOnePieceRadarChart(radarCanvas, activeChar, rivalChar);
  }

  function computeClashVerdict(charA, charB) {
    if (charA.id === charB.id) {
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
      const topMove = (winner.signatureMoves && winner.signatureMoves[0]) || 'finishing move';
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
  // TAB 6: 3D DEVIL FRUIT ENCYCLOPEDIA (18 Era-Safe Fruits + Live Search!)
  // =========================================================================
  function getFilteredFruits() {
    const q = state.fruitSearch.trim().toLowerCase();
    return DATA.devilFruits
      .filter((df) => isEraAllowed(df.era))
      .map((df) => HELPERS.getDevilFruitForEra(df, state.eraFilter))
      .filter((df) => {
        if (
          state.fruitCategoryFilter !== 'All' &&
          !df.category.toLowerCase().includes(state.fruitCategoryFilter.toLowerCase())
        ) {
          return false;
        }
        if (q) {
          const hay = (df.name + ' ' + df.englishName + ' ' + df.user + ' ' + df.category).toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
  }

  function renderDevilFruitsInspector(container) {
    const searchRow = el('div', { className: 'search-sort-bar' }, [
      el('input', {
        id: 'fruit-search-input',
        type: 'search',
        className: 'portal-search-input',
        value: state.fruitSearch,
        placeholder: '🔍 Search 18 Devil Fruits or wielders (e.g. Law, Ice, Magma, Phoenix)...',
        attrs: { 'aria-label': 'Search Devil Fruits' },
        onInput: (e) => {
          state.fruitSearch = e.target.value;
          renderActivePanel();
        }
      })
    ]);

    const types = ['All', 'Paramecia', 'Zoan', 'Logia'];
    const chipRow = el('div', { className: 'chip-row' });
    types.forEach((t) => {
      chipRow.appendChild(
        el('button', {
          type: 'button',
          className: 'chip-btn' + (state.fruitCategoryFilter === t ? ' active' : ''),
          text: t === 'All' ? 'All Devil Fruits' : t + ' Type',
          onClick: () => {
            state.fruitCategoryFilter = t;
            renderActivePanel();
          }
        })
      );
    });

    const fruits = getFilteredFruits();
    const activeFruit =
      fruits.find((f) => f.id === state.selectedFruitId) ||
      fruits[0] ||
      HELPERS.getDevilFruitForEra(DATA.devilFruits[0], state.eraFilter);

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
              className: 'pill-avatar',
              src: wielder.image,
              alt: wielder.name
            }),
            el('span', { text: df.englishName.split(' (')[0] })
          ]
        )
      );
    });

    const wielderChar = getSafeCharacterById(activeFruit.characterId || 'luffy');
    const wielderImgUrl =
      activeFruit.id === 'gomu-nika' && state.eraFilter === 'wano'
        ? '/assets/characters/luffy-gear5.jpg'
        : wielderChar.image;

    const unleashBtn = el('button', {
      type: 'button',
      className: 'action-btn gold full-width',
      text: '⚡ Unleash ' + activeFruit.englishName.split(' (')[0] + ' Power in 3D Viewport!',
      onClick: () => {
        engine3D.setMode('devil-fruit');
        engine3D.setDevilFruit(activeFruit);
        engine3D.triggerPowerBurst();
        if (activeFruit.id === 'gomu-nika' && state.eraFilter === 'wano') {
          soundFX.playDrumsOfLiberation();
        } else {
          soundFX.playHakiBoom();
        }
        awardPoneglyph('wano', '3D Devil Fruit Awakening Study');
        renderActivePanel();
      }
    });

    const detailCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', { className: 'badge-pill', text: activeFruit.category }),
        el('span', {
          className: 'coord-badge',
          text: activeFruit.awakened ? '🌟 Awakened Confirmed!' : '🍇 Devil Fruit Power'
        })
      ]),
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
            text: activeFruit.englishName + ' • Wielded by: ' + activeFruit.user
          })
        ])
      ]),
      unleashBtn,
      el('p', { className: 'card-body-text', text: activeFruit.powerSummary }),
      el('div', { className: 'lesson-callout' }, [
        el('strong', { text: '🌊 Natural Weakness & Counter:' }),
        el('p', { text: activeFruit.weakness })
      ])
    ]);

    container.appendChild(searchRow);
    container.appendChild(chipRow);
    container.appendChild(fruitGrid);
    container.appendChild(detailCard);
  }

  // =========================================================================
  // TAB 7: ONE PIECE WORLD LORE, HAKI DOJO & ERA-SAFE KID'S QUIZ
  // =========================================================================
  function renderLoreAndQuizInspector(container) {
    if (isEraAllowed('pre-timeskip')) {
      const hakiDojoCard = el('section', { className: 'feature-card haki-dojo-card' }, [
        el('div', { className: 'card-kicker-row' }, [
          el('span', { className: 'badge-pill', text: '⚡ Interactive 3D Haki Dojo' }),
          el('span', { className: 'coord-badge', text: 'Try All 3 Haki Types!' })
        ]),
        el('h2', { className: 'card-title', text: 'Test Haki in the Viewport!' }),
        el('p', {
          className: 'card-body-text',
          text: 'Click any Haki button below to unleash Observation, Armament, or Conqueror\'s Haki shockwaves across the 3D viewport!'
        }),
        el('div', { className: 'voyage-controls' }, [
          el('button', {
            type: 'button',
            className: 'action-btn secondary',
            text: '👁️ Observation (Radar)',
            onClick: () => {
              soundFX.playLogPoseChime();
              engine3D.triggerHakiDemo('observation');
            }
          }),
          el('button', {
            type: 'button',
            className: 'action-btn primary',
            text: '🥊 Armament (Armor)',
            onClick: () => {
              soundFX.playHakiBoom();
              engine3D.triggerHakiDemo('armament');
            }
          }),
          el('button', {
            type: 'button',
            className: 'action-btn gold',
            text: "⚡ Conqueror's Lightning",
            onClick: () => {
              soundFX.playHakiBoom();
              engine3D.triggerHakiDemo('conqueror');
            }
          })
        ])
      ]);
      container.appendChild(hakiDojoCard);
    }

    const qList = DATA.quizQuestions.filter((q) => isEraAllowed(q.era));
    const safeList = qList.length > 0 ? qList : DATA.quizQuestions.slice(0, 3);
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
            awardPoneglyph('quiz', 'Navigator Scholar Quiz Mastery');
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
                ? '🎉 SUUUPER! Correct Answer!'
                : '🧭 Good try, Sailor! Here is the Grand Line secret:'
          }),
          el('p', { text: currentQ.explanation }),
          el('button', {
            type: 'button',
            className: 'action-btn gold',
            text: 'Next Question ➡',
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
          text:
            '🏴‍☠️ Grand Line Explorer Quiz (' +
            ((state.quizIndex % safeList.length) + 1) +
            ' / ' +
            safeList.length +
            ')'
        }),
        el('span', { className: 'coord-badge', text: '⭐ Score: ' + state.quizScore })
      ]),
      el('h3', { className: 'card-title', text: currentQ.question }),
      el('div', { className: 'quiz-options-list' }, optionButtons),
      quizFeedback
    ]);
    container.appendChild(quizCard);

    const allowedLore = DATA.loreTopics.filter((t) => isEraAllowed(t.era));
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

    // Sound Toggle Button
    const soundBtn = document.getElementById('sound-toggle-btn');
    const syncSoundBtn = () => {
      if (!soundBtn) return;
      soundBtn.textContent = state.soundEnabled ? '🔊 Sound FX: ON' : '🔇 Sound FX: OFF';
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

    // Road Poneglyph Quest Header Pill
    const questBtn = document.getElementById('poneglyph-status-btn');
    if (questBtn) {
      questBtn.addEventListener('click', () => {
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
          if (viewportBadge) viewportBadge.textContent = '🌍 3D ONE PIECE PLANET GLOBE';
        } else {
          openMangaMapInViewport(key);
          if (state.activeTab !== 'maps') {
            state.activeTab = 'maps';
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
          engine3D.setDevilFruit(HELPERS.getDevilFruitForEra(rawFruit, state.eraFilter));
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
      btnSpin.textContent = engine3D.autoRotate ? '⏸ Pause Spin' : '🔄 Auto-Spin';
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
        btnTiltX.textContent = tilted ? '🧭 45° X-Tilt: ON' : '🧭 Upright North';
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
        btnSpin.textContent = engine3D.autoRotate ? '⏸ Pause Spin' : '🔄 Auto-Spin';
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

    renderActivePanel();
  });
})();
