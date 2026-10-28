/**
 * Grand Line 3D Portal — Interactive 5-Pirate Dream Crew Builder
 * Kids draft a 5-role crew (Captain, First Mate, Navigator, Cook/Doctor, Helmsman)
 * under either the ฿ 6.5 Billion Yonko Challenge Cap or Free-Play Unlimited Mode!
 */

'use strict';

(function (root) {
  const YONKO_BERRY_CAP = 6500000000;

  const CREW_SLOTS = [
    { key: 'captain', title: '👑 Ship Captain', desc: 'Leads the crew & clashes with Emperors' },
    { key: 'first-mate', title: '⚔️ First Mate / Ace', desc: 'Right-hand combat powerhouse' },
    { key: 'navigator', title: '🧭 Navigator / Strategist', desc: 'Reads Log Poses, weather & Poneglyphs' },
    { key: 'cook-doctor', title: '🍖 Cook / Ship Doctor', desc: 'Keeps the crew fed, healed & battle-ready' },
    { key: 'helmsman', title: '舵 Helmsman / Shipwright', desc: 'Steers through Knock Up Streams & repairs hull' }
  ];

  const EMPEROR_BENCHMARK = {
    stats: {
      strength: 92,
      speed: 88,
      durability: 91,
      haki: 90,
      devilFruit: 86,
      battleIQ: 90
    }
  };

  function classifyCrewThreat(avgPower, totalBounty, overCap) {
    if (overCap) {
      return {
        rank: '⚠️ OVER YONKO SALARY CAP!',
        badgeClass: 'danger',
        summary:
          'Your crew costs more than ฿ 6.5 Billion Berries! Swap in a clever low-bounty specialist (like Chopper, Nami, or Brook) or switch to Free-Play Mode!'
      };
    }
    if (avgPower >= 93 || totalBounty >= 6000000000) {
      return {
        rank: '👑 PIRATE KING CALIBER CREW!',
        badgeClass: 'gold',
        summary:
          'Marine HQ Code Red! Five Elders & Fleet Admiral alerted — this crew has the Haki, brains, and firepower to reach Laugh Tale!'
      };
    }
    if (avgPower >= 86 || totalBounty >= 3500000000) {
      return {
        rank: '🔥 EMPEROR OF THE SEA (YONKO) FLEET',
        badgeClass: 'gold',
        summary:
          'Your ship commands New World territory! Even Admirals need a Buster Call fleet before challenging your flag.'
      };
    }
    if (avgPower >= 78 || totalBounty >= 1000000000) {
      return {
        rank: '⚡ WORST GENERATION SUPERNOVA CREW',
        badgeClass: 'ocean',
        summary:
          'Fierce Grand Line contenders! Ready to conquer Paradise, Sabaody, and enter the New World.'
      };
    }
    return {
      rank: '⛵ RISING EAST BLUE ROOKIES',
      badgeClass: 'ocean',
      summary:
        'Ascrappy, high-heart rookie crew setting sail over Reverse Mountain! Great room to grow bounties.'
    };
  }

  function renderCrewBuilderTab(container, ctx) {
    const { el, formatBerry } = root.OP_DOM;
    const { isEraAllowed, getCharacterForEra } = root.OP_HELPERS;
    const allAllowedChars = root.ONE_PIECE_DATA.characters
      .filter((c) => isEraAllowed(c.era, ctx.eraFilter))
      .map((c) => getCharacterForEra(c, ctx.eraFilter));

    const byId = new Map(allAllowedChars.map((c) => [c.id, c]));

    // Ensure every slot points to a valid era-unlocked character without duplicates if possible
    const usedIds = new Set();
    CREW_SLOTS.forEach((slot) => {
      const currentId = ctx.crewDraft[slot.key];
      if (currentId && byId.has(currentId) && !usedIds.has(currentId)) {
        usedIds.add(currentId);
        return;
      }
      const preferred =
        allAllowedChars.find((c) => c.crewSlot === slot.key && !usedIds.has(c.id)) ||
        allAllowedChars.find((c) => !usedIds.has(c.id)) ||
        allAllowedChars[0];
      if (preferred) {
        ctx.crewDraft[slot.key] = preferred.id;
        usedIds.add(preferred.id);
      }
    });

    const isCapMode = ctx.budgetMode !== 'unlimited';

    // Mode Toggle Header Card
    const modeRow = el('div', { className: 'chip-row' }, [
      el('button', {
        type: 'button',
        className: 'chip-btn' + (isCapMode ? ' active' : ''),
        text: '🏆 Yonko Cap Challenge (฿ 6.5B Max)',
        onClick: () => {
          ctx.setBudgetMode('yonko-cap');
        }
      }),
      el('button', {
        type: 'button',
        className: 'chip-btn' + (!isCapMode ? ' active' : ''),
        text: '🌟 Free-Play Dream Mode (No Cap)',
        onClick: () => {
          ctx.setBudgetMode('unlimited');
        }
      }),
      el('button', {
        type: 'button',
        className: 'chip-btn gold-chip',
        text: '🎲 Randomize Valid Crew!',
        onClick: () => {
          const shuffled = [...allAllowedChars].sort(() => Math.random() - 0.5);
          const picked = new Set();
          let runningBounty = 0;
          CREW_SLOTS.forEach((slot, idx) => {
            const remainingSlots = CREW_SLOTS.length - idx - 1;
            const candidates = shuffled.filter((c) => {
              if (picked.has(c.id)) return false;
              if (!isCapMode) return true;
              return runningBounty + (c.bounty || 0) <= YONKO_BERRY_CAP - remainingSlots * 1000;
            });
            const roleMatch = candidates.find((c) => c.crewSlot === slot.key) || candidates[0] || shuffled[0];
            if (roleMatch) {
              ctx.crewDraft[slot.key] = roleMatch.id;
              picked.add(roleMatch.id);
              runningBounty += roleMatch.bounty || 0;
            }
          });
          ctx.onCrewChanged();
        }
      })
    ]);

    // Gather active 5 members
    const selectedMembers = CREW_SLOTS.map((slot) => ({
      slot,
      char: byId.get(ctx.crewDraft[slot.key]) || allAllowedChars[0]
    })).filter((entry) => Boolean(entry.char));

    const totalBounty = selectedMembers.reduce((sum, m) => sum + (m.char.bounty || 0), 0);
    const overCap = isCapMode && totalBounty > YONKO_BERRY_CAP;
    const capPercent = Math.min(100, Math.round((totalBounty / YONKO_BERRY_CAP) * 100));

    // Compute 6-axis crew stats (taking top specialist contribution + team average blend!)
    const axes = ['strength', 'speed', 'durability', 'haki', 'devilFruit', 'battleIQ'];
    const crewStats = {};
    axes.forEach((axis) => {
      const vals = selectedMembers.map((m) => (m.char.stats && m.char.stats[axis]) || 50);
      const maxVal = Math.max(...vals);
      const avgVal = vals.reduce((a, b) => a + b, 0) / Math.max(1, vals.length);
      crewStats[axis] = Math.round(maxVal * 0.55 + avgVal * 0.45);
    });
    const avgPower = Math.round(
      selectedMembers.reduce((sum, m) => sum + (m.char.powerScore || 70), 0) /
        Math.max(1, selectedMembers.length)
    );
    const verdict = classifyCrewThreat(avgPower, totalBounty, overCap);

    // Budget Meter Bar
    const meterFill = el('div', {
      className: 'budget-meter-fill' + (overCap ? ' over-cap' : ''),
      style: { width: (isCapMode ? capPercent : 100) + '%' }
    });

    const budgetBox = el('div', { className: 'crew-budget-box' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'meta-label',
          text: isCapMode ? 'YONKO CHALLENGE SALARY CAP (฿ 6,500,000,000)' : 'COMBINED CREW BOUNTY (FREE PLAY)'
        }),
        el('span', {
          className: 'bounty-total-pill' + (overCap ? ' over-cap' : ''),
          text: '฿ ' + formatBerry(totalBounty) + (isCapMode ? ' / ฿ 6,500,000,000' : '')
        })
      ]),
      el('div', { className: 'budget-meter-track' }, [meterFill])
    ]);

    // Visual Ship Deck Row (5 circular portraits)
    const deckVisual = el(
      'div',
      { className: 'crew-deck-strip' },
      selectedMembers.map(({ slot, char }) =>
        el(
          'button',
          {
            type: 'button',
            className: 'crew-deck-avatar-card',
            title: 'Inspect ' + char.name + ' Wanted Poster',
            onClick: () => ctx.inspectCharacter(char.id)
          },
          [
            el('img', {
              className: 'crew-deck-avatar',
              src: char.image,
              alt: char.name
            }),
            el('span', { className: 'crew-deck-role', text: slot.title.split(' ')[0] + ' ' + slot.key.toUpperCase() }),
            el('span', { className: 'crew-deck-name', text: char.name })
          ]
        )
      )
    );

    // 5 Role Selectors Grid
    const slotsGrid = el(
      'div',
      { className: 'crew-slots-grid' },
      CREW_SLOTS.map((slot) => {
        const activeId = ctx.crewDraft[slot.key];
        const specialists = allAllowedChars.filter((c) => c.crewSlot === slot.key);
        const others = allAllowedChars.filter((c) => c.crewSlot !== slot.key);
        const orderedOptions = [...specialists, ...others];

        const selectNode = el(
          'select',
          {
            className: 'portal-select full-width',
            attrs: { 'aria-label': 'Select pirate for ' + slot.title },
            onChange: (e) => {
              ctx.crewDraft[slot.key] = e.target.value;
              ctx.onCrewChanged();
            }
          },
          orderedOptions.map((c) => {
            const prefix = c.crewSlot === slot.key ? '⭐ ' : '⚓ ';
            const bText = c.bounty > 0 ? '฿ ' + formatBerry(c.bounty) : c.bountyText;
            return el('option', {
              value: c.id,
              selected: c.id === activeId,
              text: prefix + c.name + ' — ' + bText + ' (Pwr ' + c.powerScore + ')'
            });
          })
        );

        return el('div', { className: 'crew-slot-card' }, [
          el('div', { className: 'crew-slot-title', text: slot.title }),
          el('div', { className: 'crew-slot-desc', text: slot.desc }),
          selectNode
        ]);
      })
    );

    // Crew Synergy Radar Chart + Threat Verdict
    const radarCanvas = el('canvas', {
      className: 'radar-canvas',
      attrs: { 'aria-label': '6-axis Crew Synergy Radar vs Emperor Benchmark' }
    });

    const summaryCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill ' + verdict.badgeClass,
          text: verdict.rank
        }),
        el('span', {
          className: 'coord-badge',
          text: 'Crew Power Avg: ' + avgPower + ' / 100'
        })
      ]),
      el('h2', { className: 'card-title', text: '⚓ Dream Pirate Crew Builder' }),
      el('p', { className: 'card-body-text', text: verdict.summary }),
      budgetBox,
      deckVisual,
      slotsGrid,
      el('div', { className: 'char-split-row' }, [
        el('div', { className: 'char-details-col' }, [
          el('h3', { className: 'section-subhead', text: '🧠 Crew Balance Breakdown' }),
          el(
            'ul',
            { className: 'fact-list' },
            [
              'Total Combined Bounty: ฿ ' + formatBerry(totalBounty),
              'Team Haki Mastery: ' + crewStats.haki + ' / 100 • Battle IQ: ' + crewStats.battleIQ + ' / 100',
              'Tip: Click any pirate medal on your ship deck above to open their full Wanted Poster!'
            ].map((line) => el('li', { className: 'fact-item', text: line }))
          )
        ]),
        el('div', { className: 'char-radar-col' }, [
          el('h3', {
            className: 'section-subhead center',
            text: '📊 Your Crew (Gold) vs Yonko Fleet (Blue)'
          }),
          radarCanvas
        ])
      ])
    ]);

    container.appendChild(modeRow);
    container.appendChild(summaryCard);

    requestAnimationFrame(() => {
      root.renderOnePieceRadarChart(radarCanvas, { stats: crewStats }, EMPEROR_BENCHMARK);
    });
  }

  root.OP_CREW_BUILDER = {
    CREW_SLOTS,
    YONKO_BERRY_CAP,
    renderCrewBuilderTab
  };
})(typeof window !== 'undefined' ? window : globalThis);
