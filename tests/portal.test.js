/**
 * Automated Verification Suite for Grand Line 3D Portal (V3)
 * Run via: npm test (uses Node built-in node:test & node:assert/strict)
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const { ONE_PIECE_DATA, OP_HELPERS } = require('../public/js/data/index.js');
const { createPortalServer } = require('../server.js');

function requestLocal(port, method, reqPath, headers) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        method,
        path: reqPath,
        headers: headers || {}
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks)
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

test('Dataset completeness & referential integrity across maps, globe, arcs, ships, characters, Vivre Cards, and fruits', () => {
  assert.equal(ONE_PIECE_DATA.characters.length, 38, 'Expected 38 canonical characters');
  assert.equal(ONE_PIECE_DATA.worldLocations.length, 20, 'Expected 20 sculpted world locations');
  assert.equal(ONE_PIECE_DATA.canonicalMaps.length, 6, 'Expected 6 canonical maps');
  assert.equal(ONE_PIECE_DATA.timelineArcs.length, 14, 'Expected 14 timeline arcs');
  assert.equal(ONE_PIECE_DATA.devilFruits.length, 21, 'Expected 21 Devil Fruits');
  assert.equal(ONE_PIECE_DATA.ships.length, 2, 'Expected 2 ships (Thousand Sunny & Going Merry)');
  assert.equal(ONE_PIECE_DATA.loreTopics.length, 7, 'Expected 7 lore topics');
  assert.equal(ONE_PIECE_DATA.quizQuestions.length, 12, 'Expected 12 quiz questions');

  const charIds = new Set(ONE_PIECE_DATA.characters.map((c) => c.id));
  const locIds = new Set(ONE_PIECE_DATA.worldLocations.map((l) => l.id));
  const mapIds = new Set(ONE_PIECE_DATA.canonicalMaps.map((m) => m.id));

  // Verify every character image, altImage, Vivre Card metadata, and Signature Laugh
  for (const ch of ONE_PIECE_DATA.characters) {
    assert.ok(ch.image, `Character ${ch.id} missing image`);
    const diskImg = path.join(PUBLIC_DIR, ch.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskImg), `Missing portrait file on disk: ${ch.image}`);
    if (ch.altImage) {
      const diskAlt = path.join(PUBLIC_DIR, ch.altImage.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskAlt), `Missing altImage file on disk: ${ch.altImage}`);
    }
    assert.ok(
      ['captain', 'first-mate', 'navigator', 'cook-doctor', 'helmsman'].includes(ch.crewSlot),
      `Character ${ch.id} has invalid crewSlot: ${ch.crewSlot}`
    );
    assert.ok(ch.vivreId, `Character ${ch.id} missing vivreId`);
    assert.ok(ch.birthday, `Character ${ch.id} missing birthday`);
    assert.ok(ch.originSea, `Character ${ch.id} missing originSea`);
    assert.ok(ch.favoriteFood, `Character ${ch.id} missing favoriteFood`);
    assert.ok(ch.laugh, `Character ${ch.id} missing signature laugh`);
  }

  // Verify Shipwright Dock ships & Soldier Dock system
  const sunny = ONE_PIECE_DATA.ships.find((s) => s.id === 'thousand-sunny');
  const merry = ONE_PIECE_DATA.ships.find((s) => s.id === 'going-merry');
  assert.ok(sunny && merry, 'Expected both Thousand Sunny and Going Merry');
  assert.equal(sunny.channels.length, 6, 'Thousand Sunny must have Soldier Dock Channels 0-5');
  assert.equal(merry.era, 'east-blue', 'Going Merry must be available in East Blue mode');
  assert.equal(sunny.era, 'pre-timeskip', 'Thousand Sunny must unlock in Pre-Timeskip mode');
  for (const ship of ONE_PIECE_DATA.ships) {
    assert.ok(mapIds.has(ship.blueprintMapId), `Invalid blueprintMapId on ship ${ship.id}`);
    assert.ok(ship.rooms && ship.rooms.length >= 4, `Expected deck rooms on ship ${ship.id}`);
  }

  // Verify every worldLocation points to valid character & map
  for (const loc of ONE_PIECE_DATA.worldLocations) {
    assert.ok(charIds.has(loc.heroCharacterId), `Invalid heroCharacterId on ${loc.id}`);
    assert.ok(mapIds.has(loc.mapId), `Invalid mapId on ${loc.id}`);
  }

  // Verify every canonicalMap image exists and hotspots point to valid locations & characters
  for (const m of ONE_PIECE_DATA.canonicalMaps) {
    const mapDisk = path.join(PUBLIC_DIR, m.imageUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(mapDisk), `Missing map image on disk: ${m.imageUrl}`);
    for (const hs of m.hotspots) {
      assert.ok(locIds.has(hs.locationId), `Invalid hotspot locationId ${hs.locationId} on ${m.id}`);
      assert.ok(charIds.has(hs.characterId), `Invalid hotspot characterId ${hs.characterId} on ${m.id}`);
    }
  }

  // Verify timeline arcs point to valid worldLocations, maps, and characters
  for (const arc of ONE_PIECE_DATA.timelineArcs) {
    assert.ok(locIds.has(arc.locationId), `Invalid locationId on arc ${arc.id}`);
    assert.ok(mapIds.has(arc.mapId), `Invalid mapId on arc ${arc.id}`);
    assert.ok(charIds.has(arc.heroCharacterId), `Invalid heroCharacterId on arc ${arc.id}`);
  }

  // Verify all 21 Devil Fruits have canonical Zukan card artwork, transparent 3D cutout sprites, and morphology notes
  for (const df of ONE_PIECE_DATA.devilFruits) {
    assert.ok(df.image, `Devil Fruit ${df.id} missing canonical image`);
    assert.ok(df.sprite, `Devil Fruit ${df.id} missing 3D sprite`);
    assert.ok(df.zukanShape && df.zukanShape.length > 15, `Devil Fruit ${df.id} missing zukanShape`);
    assert.ok(
      fs.existsSync(path.join(PUBLIC_DIR, df.image.replace(/^\//, ''))),
      `Missing Devil Fruit card file on disk: ${df.image}`
    );
    assert.ok(
      fs.existsSync(path.join(PUBLIC_DIR, df.sprite.replace(/^\//, ''))),
      `Missing Devil Fruit 3D sprite file on disk: ${df.sprite}`
    );
  }

  // Verify Egghead character grid and Zukan Plate IV exist on disk
  assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'assets/characters/egghead_legends_grid.jpg')));
  assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'assets/banners/zukan-egghead.jpg')));
});

test('4-Tier Spoiler Shield strictly isolates East Blue, Pre-Timeskip, Wano, and Egghead/Elbaph revelations', () => {
  assert.equal(OP_HELPERS.isEraAllowed('egghead', 'egghead'), true);
  assert.equal(OP_HELPERS.isEraAllowed('egghead', 'wano'), false);
  assert.equal(OP_HELPERS.isEraAllowed('wano', 'egghead'), true);
  assert.equal(OP_HELPERS.isEraAllowed('wano', 'pre-timeskip'), false);

  const rawLuffy = ONE_PIECE_DATA.characters.find((c) => c.id === 'luffy');
  const eastBlueLuffy = OP_HELPERS.getCharacterForEra(rawLuffy, 'east-blue');
  assert.equal(eastBlueLuffy.bounty, 30000000);
  assert.equal(eastBlueLuffy.bountyText, '30,000,000');
  assert.equal(eastBlueLuffy.canUseGear5Photo, false);

  const ebSerialized = JSON.stringify(eastBlueLuffy);
  assert.ok(!ebSerialized.includes('Nika'), 'East Blue Luffy leaked Nika!');
  assert.ok(!ebSerialized.includes('Gear 5'), 'East Blue Luffy leaked Gear 5!');
  assert.ok(!ebSerialized.includes('3,000,000,000'), 'East Blue Luffy leaked 3B Wano bounty!');

  const preTsLuffy = OP_HELPERS.getCharacterForEra(rawLuffy, 'pre-timeskip');
  assert.equal(preTsLuffy.bounty, 400000000);
  assert.equal(preTsLuffy.canUseGear5Photo, false);
  const preSerialized = JSON.stringify(preTsLuffy);
  assert.ok(!preSerialized.includes('Nika'), 'Pre-Timeskip Luffy leaked Nika!');
  assert.ok(!preSerialized.includes('Gear 5'), 'Pre-Timeskip Luffy leaked Gear 5!');

  const wanoLuffy = OP_HELPERS.getCharacterForEra(rawLuffy, 'wano');
  assert.equal(wanoLuffy.bounty, 3000000000);
  assert.equal(wanoLuffy.canUseGear5Photo, true);

  const eggheadLuffy = OP_HELPERS.getCharacterForEra(rawLuffy, 'egghead');
  assert.equal(eggheadLuffy.bounty, 3000000000);
  assert.equal(eggheadLuffy.canUseGear5Photo, true);

  // Sanji Vinsmoke surname gated until Whole Cake / Wano
  const rawSanji = ONE_PIECE_DATA.characters.find((c) => c.id === 'sanji');
  assert.equal(OP_HELPERS.getCharacterForEra(rawSanji, 'east-blue').name, 'Sanji');
  assert.equal(OP_HELPERS.getCharacterForEra(rawSanji, 'pre-timeskip').name, 'Sanji');
  assert.equal(OP_HELPERS.getCharacterForEra(rawSanji, 'wano').name, 'Vinsmoke Sanji');
  assert.equal(OP_HELPERS.getCharacterForEra(rawSanji, 'egghead').name, 'Vinsmoke Sanji');

  // Marine Cross Guild 5-Crown Fleet Admiral vs Pre-Timeskip Marine HQ Dossier
  const rawAkainu = ONE_PIECE_DATA.characters.find((c) => c.id === 'akainu');
  assert.equal(OP_HELPERS.getCharacterForEra(rawAkainu, 'pre-timeskip').posterHeader, 'MARINE HQ');
  assert.equal(OP_HELPERS.getCharacterForEra(rawAkainu, 'wano').posterHeader, 'CROSS GUILD');
  assert.equal(OP_HELPERS.getCharacterForEra(rawAkainu, 'egghead').bounty, 5000000000);

  // Egghead-specific spoiler guards on Bonney, Kuma, and Dorry & Brogy in Wano / Pre-Timeskip!
  const rawBonney = ONE_PIECE_DATA.characters.find((c) => c.id === 'bonney');
  const wanoBonney = OP_HELPERS.getCharacterForEra(rawBonney, 'wano');
  assert.equal(wanoBonney.bounty, 140000000);
  assert.ok(!JSON.stringify(wanoBonney).includes('Nika'), 'Wano Bonney leaked Distorted Future Nika!');
  assert.equal(OP_HELPERS.getCharacterForEra(rawBonney, 'egghead').bounty, 320000000);

  const rawGiants = ONE_PIECE_DATA.characters.find((c) => c.id === 'dorry-brogy');
  const wanoGiants = OP_HELPERS.getCharacterForEra(rawGiants, 'wano');
  assert.equal(wanoGiants.bounty, 200000000);
  assert.ok(wanoGiants.bountyText.includes('100,000,000 EACH'));
  assert.ok(
    !JSON.stringify(wanoGiants).includes('1,800,000,000'),
    'Wano Dorry & Brogy leaked 1.8B Egghead bounty!'
  );
  assert.equal(OP_HELPERS.getCharacterForEra(rawGiants, 'egghead').bounty, 3600000000);
  assert.ok(OP_HELPERS.getCharacterForEra(rawGiants, 'egghead').bountyText.includes('1,800,000,000 EACH'));

  const rawKuma = ONE_PIECE_DATA.characters.find((c) => c.id === 'kuma');
  const preKuma = OP_HELPERS.getCharacterForEra(rawKuma, 'pre-timeskip');
  assert.ok(!JSON.stringify(preKuma).includes('Buccaneer'), 'Pre-Timeskip Kuma leaked Buccaneer lineage!');

  // Devil Fruit Nika check across eras
  const rawGomu = ONE_PIECE_DATA.devilFruits.find((f) => f.id === 'gomu-nika');
  const ebGomu = OP_HELPERS.getDevilFruitForEra(rawGomu, 'east-blue');
  assert.ok(!ebGomu.name.includes('Nika'));
  assert.equal(ebGomu.awakened, false);

  const eggGomu = OP_HELPERS.getDevilFruitForEra(rawGomu, 'egghead');
  assert.ok(eggGomu.name.includes('Nika'));
  assert.equal(eggGomu.awakened, true);
});

test('Canonical 4-Blues quadrant geography & shortest-arc dateline interpolation math', () => {
  const byId = Object.fromEntries(ONE_PIECE_DATA.worldLocations.map((l) => [l.id, l]));
  const revMtn = byId['reverse-mountain'];
  assert.equal(revMtn.lat, 0);
  assert.equal(revMtn.lon, -90);

  assert.ok(byId['north-blue'].lat > 0 && byId['north-blue'].lon < -90);
  assert.ok(byId['east-blue'].lat > 0 && byId['east-blue'].lon > -90);
  assert.ok(byId['south-blue'].lat < 0 && byId['south-blue'].lon > -90);
  assert.ok(byId['west-blue'].lat < 0 && byId['west-blue'].lon < -90);
  assert.ok(byId['egghead'], 'Expected Egghead Future Island on 3D globe');
  assert.ok(byId['elbaph'], 'Expected Elbaph Warland on 3D globe');

  // Dateline wrap: Wano (+168°) to Laugh Tale (-104°) is +88° eastward across ±180°, midpoint = -148°
  const midLon = OP_HELPERS.lerpLonDeg(168, -104, 0.5);
  assert.equal(midLon, -148);
});

test('Static Zero-Dependency Server enforces security headers, ETag 304 caching, and traversal defense', async () => {
  const srv = createPortalServer();
  await new Promise((resolve) => srv.listen(0, '127.0.0.1', resolve));
  const { port } = srv.address();

  try {
    // 1. Root HTML + Security Headers
    const rootRes = await requestLocal(port, 'GET', '/');
    assert.equal(rootRes.statusCode, 200);
    assert.ok(rootRes.headers['content-security-policy'].includes("default-src 'self'"));
    assert.equal(rootRes.headers['x-content-type-options'], 'nosniff');
    assert.equal(rootRes.headers['x-frame-options'], 'DENY');

    // 2. Portrait asset ETag + Cache-Control + 304 Not Modified
    const imgRes = await requestLocal(port, 'GET', '/assets/characters/vegapunk.jpg');
    assert.equal(imgRes.statusCode, 200);
    assert.ok(
      imgRes.headers['cache-control'].startsWith('public, max-age=3600'),
      'Expected public max-age Cache-Control header'
    );
    assert.ok(imgRes.headers.etag, 'Expected ETag header on image asset');

    const cachedRes = await requestLocal(port, 'GET', '/assets/characters/vegapunk.jpg', {
      'If-None-Match': imgRes.headers.etag
    });
    assert.equal(cachedRes.statusCode, 304);
    assert.equal(cachedRes.body.length, 0);

    // 3. Reject non-GET/HEAD methods
    const postRes = await requestLocal(port, 'POST', '/');
    assert.equal(postRes.statusCode, 405);

    // 4. Reject path traversal & unapproved extensions
    const travRes = await requestLocal(port, 'GET', '/../server.js');
    assert.ok([403, 404].includes(travRes.statusCode));
  } finally {
    await new Promise((resolve) => srv.close(resolve));
  }
});

test('Zero unsafe DOM sinks or blocking dialogs in all public/js modules (including ships.js)', () => {
  const jsFiles = [
    'public/js/i18n.js',
    'public/js/analytics.js',
    'public/js/data/maps-and-world.js',
    'public/js/data/characters.js',
    'public/js/data/fruits-and-lore.js',
    'public/js/data/ships.js',
    'public/js/data/index.js',
    'public/js/sound.js',
    'public/js/engine/islands3d.js',
    'public/js/engine/globe3d.js',
    'public/js/ui/dom.js',
    'public/js/ui/crew-builder.js',
    'public/js/app.js'
  ];

  // Strip comments before scanning so docblocks mentioning forbidden sinks don't false-positive
  const forbidden = [
    /\.innerHTML\b/,
    /\.outerHTML\b/,
    /\.insertAdjacentHTML\b/,
    /\bdocument\.write\s*\(/,
    /\beval\s*\(/,
    /\balert\s*\(/,
    /\bconfirm\s*\(/,
    /\bprompt\s*\(/
  ];

  for (const rel of jsFiles) {
    const raw = fs.readFileSync(path.join(ROOT_DIR, rel), 'utf8');
    const codeOnly = raw
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    for (const pattern of forbidden) {
      assert.equal(
        pattern.test(codeOnly),
        false,
        `Forbidden pattern ${pattern} detected in ${rel}`
      );
    }
  }
});

test('11-Language i18n (with V3 Shipwright & Egghead labels), Signature Laugh Audio, Dark/Light Theme, and Opt-In GA4', () => {
  const i18n = require('../public/js/i18n.js');
  const analytics = require('../public/js/analytics.js');
  const { OnePieceSoundFX, LANG_SPEECH_CODES } = require('../public/js/sound.js');

  const expectedLangs = ['en', 'es', 'zh', 'yue', 'ja', 'ko', 'pt', 'fr', 'it', 'de', 'ar'];
  assert.deepEqual(
    i18n.SUPPORTED_LANGUAGES.map((l) => l.code),
    expectedLangs,
    'Expected exact 11-language matrix matching Atlas of Wonder'
  );

  for (const code of expectedLangs) {
    const strings = i18n.getStrings(code);
    assert.ok(strings.brandTitle, `Missing brandTitle for ${code}`);
    assert.ok(strings.tabShips, `Missing tabShips for ${code}`);
    assert.ok(strings.spoilerEgghead, `Missing spoilerEgghead for ${code}`);
    assert.ok(strings.spoilerPreTimeskip, `Missing spoilerPreTimeskip for ${code}`);
    assert.ok(strings.readAloud, `Missing readAloud for ${code}`);
    assert.ok(strings.stopReading, `Missing stopReading for ${code}`);
    assert.ok(strings.themeDark, `Missing themeDark for ${code}`);
    assert.ok(strings.themeLight, `Missing themeLight for ${code}`);
    assert.ok(strings.cookieAccept, `Missing cookieAccept for ${code}`);
    assert.ok(LANG_SPEECH_CODES[code], `Missing BCP-47 speech code for ${code}`);
  }

  assert.equal(i18n.getLanguageMeta('ar').dir, 'rtl');
  assert.equal(i18n.getLanguageMeta('en').dir, 'ltr');
  assert.equal(i18n.resolveLanguage('zh-HK'), 'yue');
  assert.equal(i18n.resolveLanguage('zh-CN'), 'zh');
  assert.equal(i18n.resolveLanguage('es-MX'), 'es');

  // Verify GA4 Measurement ID and Firebase Web App ID
  assert.equal(analytics.GA_MEASUREMENT_ID, 'G-3XD1EEG3BC');
  assert.equal(analytics.FIREBASE_APP_ID, '1:697625214430:web:4eb1c198ecde36fc82f14f');

  // Verify SoundFX speech, Signature Laugh, Coup de Burst, and Gaon Cannon methods exist
  const sfx = new OnePieceSoundFX(true);
  assert.equal(typeof sfx.speakText, 'function');
  assert.equal(typeof sfx.stopSpeech, 'function');
  assert.equal(typeof sfx.playSignatureLaugh, 'function');
  assert.equal(typeof sfx.playCoupDeBurst, 'function');
  assert.equal(typeof sfx.playGaonCannon, 'function');
  assert.equal(sfx.getSpeechBcp47('yue'), 'zh-HK');

  // Verify V3 HTML hooks and default Light Theme exist
  const indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
  assert.ok(indexHtml.includes('data-theme="light"'), 'Expected default data-theme="light" on <html> in index.html');
  assert.ok(indexHtml.includes('id="spoiler-opt-egghead"'), 'Expected #spoiler-opt-egghead in index.html');
  assert.ok(indexHtml.includes('data-tab-btn="ships"'), 'Expected ships tab button in index.html');
  assert.ok(indexHtml.includes('/js/data/ships.js'), 'Expected ships.js script tag in index.html');
  assert.ok(indexHtml.includes('id="theme-toggle-btn"'), 'Expected #theme-toggle-btn in index.html');

  const appJs = fs.readFileSync(path.join(PUBLIC_DIR, 'js', 'app.js'), 'utf8');
  assert.ok(appJs.includes("return 'light';"), 'Expected getInitialTheme() in app.js to default to light');

  const baseCss = fs.readFileSync(path.join(PUBLIC_DIR, 'styles', 'base.css'), 'utf8');
  assert.ok(baseCss.includes('html[data-theme="light"]'), 'Expected Light Theme CSS rules in base.css');
});
