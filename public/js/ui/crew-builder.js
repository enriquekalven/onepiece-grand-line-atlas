/**
 * Grand Line 3D Portal — Interactive 5-Pirate Dream Crew Builder
 * Kids draft a 5-role crew (Captain, First Mate, Navigator, Cook/Doctor, Helmsman)
 * under either the ฿ 6.5 Billion Yonko Challenge Cap or Free-Play Unlimited Mode!
 */

'use strict';

(function (root) {
  const YONKO_BERRY_CAP = 6500000000;

  const CREW_SLOTS = [
    { key: 'captain', title: '👑 Ship Captain', titleYue: '👑 船長', shortYue: '👑 船長', desc: 'Leads the crew & clashes with Emperors', descYue: '率領全團衝鋒陷陣，正面硬撼四皇！' },
    { key: 'first-mate', title: '⚔️ First Mate / Ace', titleYue: '⚔️ 副船長／王牌戰鬥員', shortYue: '⚔️ 副船長', desc: 'Right-hand combat powerhouse', descYue: '船長最強左右手，斬開一切強敵！' },
    { key: 'navigator', title: '🧭 Navigator / Strategist', titleYue: '🧭 航海士／軍師參謀', shortYue: '🧭 航海士', desc: 'Reads Log Poses, weather & Poneglyphs', descYue: '解讀記錄指針、異常氣候同歷史本文！' },
    { key: 'cook-doctor', title: '🍖 Cook / Ship Doctor', titleYue: '🍖 廚師／船醫', shortYue: '🍖 船醫廚師', desc: 'Keeps the crew fed, healed & battle-ready', descYue: '負責全員美食補給同急救治療，保持巔峰狀態！' },
    { key: 'helmsman', title: '舵 Helmsman / Shipwright', titleYue: '舵 掌舵手／船匠', shortYue: '舵 掌舵船匠', desc: 'Steers through Knock Up Streams & repairs hull', descYue: '駕馭衝天海流、維修船體同發射緊急加速！' }
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

  function classifyCrewThreat(avgPower, totalBounty, overCap, lang) {
    const isYue = lang === 'yue';
    if (overCap) {
      return {
        rank: isYue ? '⚠️ 超出四皇懸賞金上限！' : '⚠️ OVER YONKO SALARY CAP!',
        badgeClass: 'danger',
        summary: isYue
          ? '你嘅海賊團總懸賞金超過咗六十五億貝里上限！試下換入懸賞金較低但實力超強嘅奇兵（例如索柏、娜美或者布魯克），或者切換去「自由夢幻模式」啦！'
          : 'Your crew costs more than ฿ 6.5 Billion Berries! Swap in a clever low-bounty specialist (like Chopper, Nami, or Brook) or switch to Free-Play Mode!'
      };
    }
    if (avgPower >= 93 || totalBounty >= 6000000000) {
      return {
        rank: isYue ? '👑 海賊王級傳說船隊！' : '👑 PIRATE KING CALIBER CREW!',
        badgeClass: 'gold',
        summary: isYue
          ? '海軍本部發出最高紅色警報！五老星同元帥全面戒備——呢支海賊團擁有足以抵達最終之島拉夫德爾嘅霸氣、智慧同壓倒性火力！'
          : 'Marine HQ Code Red! Five Elders & Fleet Admiral alerted — this crew has the Haki, brains, and firepower to reach Laugh Tale!'
      };
    }
    if (avgPower >= 86 || totalBounty >= 3500000000) {
      return {
        rank: isYue ? '🔥 新世界四皇級大艦隊' : '🔥 EMPEROR OF THE SEA (YONKO) FLEET',
        badgeClass: 'gold',
        summary: isYue
          ? '你嘅海賊旗已經稱霸新世界海域！就算係海軍大將都要出動屠魔令艦隊先敢挑戰你哋。'
          : 'Your ship commands New World territory! Even Admirals need a Buster Call fleet before challenging your flag.'
      };
    }
    if (avgPower >= 78 || totalBounty >= 1000000000) {
      return {
        rank: isYue ? '⚡ 最惡世代超新星海賊團' : '⚡ WORST GENERATION SUPERNOVA CREW',
        badgeClass: 'ocean',
        summary: isYue
          ? '威震偉大航道嘅超新星勁旅！隨時準備突破香波地群島，正式殺入新世界！'
          : 'Fierce Grand Line contenders! Ready to conquer Paradise, Sabaody, and enter the New World.'
      };
    }
    return {
      rank: isYue ? '⛵ 東海熱血新星海賊團' : '⛵ RISING EAST BLUE ROOKIES',
      badgeClass: 'ocean',
      summary: isYue
        ? '充滿熱血同鬥志嘅新星海賊團，正準備衝上顛倒山闖入偉大航道！未來懸賞金升幅無可限量！'
        : 'A scrappy, high-heart rookie crew setting sail over Reverse Mountain! Great room to grow bounties.'
    };
  }

  function renderCrewBuilderTab(container, ctx) {
    const { el, formatBerry } = root.OP_DOM;
    const { isEraAllowed, getCharacterForEra } = root.OP_HELPERS;
    const isYue = ctx && ctx.lang === 'yue';
    const allAllowedChars = root.ONE_PIECE_DATA.characters
      .filter((c) => isEraAllowed(c.era, ctx.eraFilter))
      .map((c) => getCharacterForEra(c, ctx.eraFilter, ctx.lang));

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
        text: isYue ? '🏆 四皇懸賞上限挑戰（最高六十五億貝里）' : '🏆 Yonko Cap Challenge (฿ 6.5B Max)',
        onClick: () => {
          ctx.setBudgetMode('yonko-cap');
        }
      }),
      el('button', {
        type: 'button',
        className: 'chip-btn' + (!isCapMode ? ' active' : ''),
        text: isYue ? '🌟 自由夢幻組隊模式（無上限）' : '🌟 Free-Play Dream Mode (No Cap)',
        onClick: () => {
          ctx.setBudgetMode('unlimited');
        }
      }),
      el('button', {
        type: 'button',
        className: 'chip-btn gold-chip',
        text: isYue ? '🎲 隨機抽籤組建海賊團！' : '🎲 Randomize Valid Crew!',
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
    const verdict = classifyCrewThreat(avgPower, totalBounty, overCap, ctx.lang);

    // Budget Meter Bar
    const meterFill = el('div', {
      className: 'budget-meter-fill' + (overCap ? ' over-cap' : ''),
      style: { width: (isCapMode ? capPercent : 100) + '%' }
    });

    const budgetBox = el('div', { className: 'crew-budget-box' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'meta-label',
          text: isYue
            ? (isCapMode ? '四皇挑戰懸賞金上限（฿ 6,500,000,000）' : '海賊團總懸賞金（自由模式）')
            : (isCapMode ? 'YONKO CHALLENGE SALARY CAP (฿ 6,500,000,000)' : 'COMBINED CREW BOUNTY (FREE PLAY)')
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
            title: isYue ? ('查看' + char.name + '懸賞令') : ('Inspect ' + char.name + ' Wanted Poster'),
            onClick: () => ctx.inspectCharacter(char.id)
          },
          [
            el('img', {
              className: 'crew-deck-avatar',
              src: char.image,
              alt: char.name
            }),
            el('span', {
              className: 'crew-deck-role',
              text: isYue ? slot.shortYue : (slot.title.split(' ')[0] + ' ' + slot.key.toUpperCase())
            }),
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
        const slotLabel = isYue ? slot.titleYue : slot.title;
        const slotDesc = isYue ? slot.descYue : slot.desc;

        const selectNode = el(
          'select',
          {
            className: 'portal-select full-width',
            attrs: { 'aria-label': slotLabel },
            onChange: (e) => {
              ctx.crewDraft[slot.key] = e.target.value;
              ctx.onCrewChanged();
            }
          },
          orderedOptions.map((c) => {
            const prefix = c.crewSlot === slot.key ? '⭐ ' : '⚓ ';
            const bText = c.bounty > 0 ? '฿ ' + formatBerry(c.bounty) : c.bountyText;
            const pwrLabel = isYue ? ('戰力 ' + c.powerScore) : ('Pwr ' + c.powerScore);
            return el('option', {
              value: c.id,
              selected: c.id === activeId,
              text: prefix + c.name + ' — ' + bText + ' (' + pwrLabel + ')'
            });
          })
        );

        return el('div', { className: 'crew-slot-card' }, [
          el('div', { className: 'crew-slot-title', text: slotLabel }),
          el('div', { className: 'crew-slot-desc', text: slotDesc }),
          selectNode
        ]);
      })
    );

    // Crew Synergy Radar Chart + Threat Verdict
    const radarCanvas = el('canvas', {
      className: 'radar-canvas',
      attrs: { 'aria-label': isYue ? '海賊團六維戰力雷達圖' : '6-axis Crew Synergy Radar vs Emperor Benchmark' }
    });

    const summaryCard = el('article', { className: 'feature-card' }, [
      el('div', { className: 'card-kicker-row' }, [
        el('span', {
          className: 'badge-pill ' + verdict.badgeClass,
          text: verdict.rank
        }),
        el('span', {
          className: 'coord-badge',
          text: isYue ? ('平均戰力：' + avgPower + ' / 100') : ('Crew Power Avg: ' + avgPower + ' / 100')
        })
      ]),
      el('h2', { className: 'card-title', text: isYue ? '⚓ 夢幻五人海賊團組建器' : '⚓ Dream Pirate Crew Builder' }),
      el('p', { className: 'card-body-text', text: verdict.summary }),
      budgetBox,
      deckVisual,
      slotsGrid,
      el('div', { className: 'char-split-row' }, [
        el('div', { className: 'char-details-col' }, [
          el('h3', { className: 'section-subhead', text: isYue ? '🧠 團隊戰力平衡分析' : '🧠 Crew Balance Breakdown' }),
          el(
            'ul',
            { className: 'fact-list' },
            (isYue
              ? [
                  '海賊團總懸賞金：฿ ' + formatBerry(totalBounty),
                  '團隊霸氣掌握度：' + crewStats.haki + ' 分 • 戰鬥智商：' + crewStats.battleIQ + ' 分',
                  '小貼士：點擊上方甲板任何一位船員頭像，即可打開佢嘅完整懸賞令同生命卡！'
                ]
              : [
                  'Total Combined Bounty: ฿ ' + formatBerry(totalBounty),
                  'Team Haki Mastery: ' + crewStats.haki + ' / 100 • Battle IQ: ' + crewStats.battleIQ + ' / 100',
                  'Tip: Click any pirate medal on your ship deck above to open their full Wanted Poster!'
                ]
            ).map((line) => el('li', { className: 'fact-item', text: line }))
          )
        ]),
        el('div', { className: 'char-radar-col' }, [
          el('h3', {
            className: 'section-subhead center',
            text: isYue ? '📊 你嘅海賊團（金色）對比 四皇基準（藍色）' : '📊 Your Crew (Gold) vs Yonko Fleet (Blue)'
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
