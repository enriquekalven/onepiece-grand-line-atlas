/**
 * Grand Line 3D Portal (V3) — Unified Dataset & Pure Era-Safe / Geometry Helpers
 * Exposes window.ONE_PIECE_DATA and window.OP_HELPERS in browser, and module.exports in Node.js tests.
 */

'use strict';

(function (root) {
  const mapsAndWorld =
    root.OP_MAPS_AND_WORLD ||
    (typeof require === 'function' ? require('./maps-and-world.js') : {});
  const charsMod =
    root.OP_CHARACTERS || (typeof require === 'function' ? require('./characters.js') : {});
  const fruitsAndLore =
    root.OP_FRUITS_AND_LORE ||
    (typeof require === 'function' ? require('./fruits-and-lore.js') : {});
  const shipsAndVivre =
    root.OP_SHIPS_AND_VIVRE ||
    (typeof require === 'function' ? require('./ships.js') : {});

  const ERA_ORDER = {
    'east-blue': 0,
    'pre-timeskip': 1,
    wano: 2,
    egghead: 3
  };

  function isEraAllowed(itemEra, eraFilter) {
    const activeRank = ERA_ORDER[eraFilter] !== undefined ? ERA_ORDER[eraFilter] : 3;
    const itemRank = ERA_ORDER[itemEra] !== undefined ? ERA_ORDER[itemEra] : 2;
    return itemRank <= activeRank;
  }

  /**
   * Returns a spoiler-safe projection of a character for the active eraFilter,
   * plus only the bountyHistory milestones unlocked up to eraFilter.
   */
  function getCharacterForEra(rawChar, eraFilter) {
    if (!rawChar) return null;
    let snap = null;
    if (rawChar.eraSnapshots && eraFilter !== 'egghead') {
      if (eraFilter === 'wano') {
        snap = rawChar.eraSnapshots.wano || null;
      } else if (eraFilter === 'pre-timeskip') {
        snap = rawChar.eraSnapshots['pre-timeskip'] || rawChar.eraSnapshots['east-blue'] || null;
      } else if (eraFilter === 'east-blue') {
        snap = rawChar.eraSnapshots['east-blue'] || rawChar.eraSnapshots['pre-timeskip'] || null;
      }
    }

    const fullHistory = Array.isArray(rawChar.bountyHistory)
      ? rawChar.bountyHistory
      : [
          {
            era: rawChar.era,
            label: 'Current Known Bounty',
            bounty: rawChar.bounty,
            text: rawChar.bountyText
          }
        ];

    const allowedHistory = fullHistory.filter((h) => isEraAllowed(h.era, eraFilter));
    const safeHistory =
      allowedHistory.length > 0
        ? allowedHistory
        : [
            {
              era: rawChar.era,
              label: 'Initial Record',
              bounty: snap && snap.bounty !== undefined ? snap.bounty : rawChar.bounty,
              text: snap && snap.bountyText ? snap.bountyText : rawChar.bountyText
            }
          ];

    const {
      eraSnapshots,
      wanoLaughNote,
      eggheadLaugh,
      eggheadLaughNote,
      eggheadFavoriteFood,
      ...baseChar
    } = rawChar;

    const unlockedWano = isEraAllowed('wano', eraFilter);
    const unlockedEgghead = isEraAllowed('egghead', eraFilter);

    const projected = {
      ...baseChar,
      ...(snap || {}),
      bountyHistory: safeHistory,
      canUseGear5Photo: rawChar.id === 'luffy' && unlockedWano
    };

    if (unlockedWano && wanoLaughNote) {
      projected.laughNote = wanoLaughNote;
    }
    if (unlockedEgghead) {
      if (eggheadLaugh) projected.laugh = eggheadLaugh;
      if (eggheadLaughNote) projected.laughNote = eggheadLaughNote;
      if (eggheadFavoriteFood) projected.favoriteFood = eggheadFavoriteFood;
    }

    return projected;
  }

  function getDevilFruitForEra(rawFruit, eraFilter) {
    if (!rawFruit) return null;
    const unlockedWano = isEraAllowed('wano', eraFilter);
    return {
      ...rawFruit,
      name: unlockedWano && rawFruit.wanoTrueName ? rawFruit.wanoTrueName : rawFruit.name,
      englishName:
        unlockedWano && rawFruit.wanoEnglishName ? rawFruit.wanoEnglishName : rawFruit.englishName,
      user: unlockedWano && rawFruit.wanoUser ? rawFruit.wanoUser : rawFruit.user,
      powerSummary:
        unlockedWano && rawFruit.wanoPowerSummary
          ? rawFruit.wanoPowerSummary
          : rawFruit.powerSummary,
      awakened: unlockedWano ? rawFruit.awakened : false
    };
  }

  /**
   * Shortest-arc longitude interpolation in degrees (-180..180), fixing dateline wrap
   * (e.g. Wano +168 deg -> Laugh Tale -104 deg moves +88 deg forward, never -272 deg backwards).
   */
  function lerpLonDeg(lonA, lonB, t) {
    let delta = ((lonB - lonA + 540) % 360) - 180;
    let res = lonA + delta * t;
    if (res > 180) res -= 360;
    if (res < -180) res += 360;
    return res;
  }

  const vivreMap = shipsAndVivre.vivreMetadata || {};
  const enrichedCharacters = (charsMod.characters || []).map((c) => ({
    ...(vivreMap[c.id] || {}),
    ...c
  }));

  const ONE_PIECE_DATA = {
    canonicalMaps: mapsAndWorld.canonicalMaps || [],
    worldLocations: mapsAndWorld.worldLocations || [],
    timelineArcs: mapsAndWorld.timelineArcs || [],
    characters: enrichedCharacters,
    devilFruits: fruitsAndLore.devilFruits || [],
    loreTopics: fruitsAndLore.loreTopics || [],
    quizQuestions: fruitsAndLore.quizQuestions || [],
    ships: shipsAndVivre.ships || []
  };

  const OP_HELPERS = {
    ERA_ORDER,
    isEraAllowed,
    getCharacterForEra,
    getDevilFruitForEra,
    lerpLonDeg
  };

  root.ONE_PIECE_DATA = ONE_PIECE_DATA;
  root.OP_HELPERS = OP_HELPERS;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ONE_PIECE_DATA, OP_HELPERS };
  }
})(typeof window !== 'undefined' ? window : globalThis);
