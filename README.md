# 🏴‍☠️ One Piece: Grand Line 3D & Manga Atlas

**Live Portal:** [https://onepiece-grand-line-atlas.web.app](https://onepiece-grand-line-atlas.web.app)

An interactive, kid-friendly 3D **One Piece** world globe, **3D Shipwright Cutaway Dock (*Thousand Sunny* & *Going Merry*)**, 6 canonical manga/anime maps, 14-saga Log Pose timeline, 38-character **Vivre Card & Playable Signature Laughs** vault, 5-Pirate Dream Crew Builder, 21-fruit **Akuma no Mi Zukan** 3D holodeck, 11-language Read Aloud TTS, Dark/Light parchment themes, and a 4-tier Spoiler Shield up to **Egghead & Elbaph (Ep 1086+)**.

Built with **zero external npm dependencies** and hardened with strict CSP, XSS-free DOM construction, opt-in kid-safe GA4 telemetry, and path-traversal defenses.

## 🚀 Local Development & Tests

```bash
npm start
# Opens locally at http://127.0.0.1:4173/

npm test
# Runs 6 automated suites: dataset referential integrity, 4-tier Spoiler Shield isolation,
# spherical dateline math, ETag/CSP server security, zero-XSS DOM audit, and 11-language i18n/audio
```

## ☁️ Firebase Hosting Deployment (`project-maui`)

Configured via [`firebase.json`](./firebase.json) and [`.firebaserc`](./.firebaserc) targeting site `onepiece-grand-line-atlas`:

```bash
firebase deploy --only hosting:onepiece-grand-line-atlas --project project-maui
```

## 🌟 8 Interactive Explorer Modes (V3)

1. **🌍 3D World & Oceans (20 Sculpted Islands)**: Custom HTML5 3D sphere featuring the Red Line, Grand Line, Calm Belts, 20 sculpted 3D island silhouettes (now including **Egghead Punk Records** and **Elbaph Treasure Tree Adam**), **Canonical 45° Manga X-Axis Tilt** + Compass Rose (`N / E / S / W`), and **4 Road Poneglyph crimson laser beams** once Laugh Tale is unlocked.
2. **🗺️ Manga & Anime Maps (6 Charts & Blueprints)**: Pan, pinch-zoom, or use keyboard Arrow keys across 6 illustrated maps (*Grand Line & Road Poneglyph Sea Chart*, *Crocus's Reverse Mountain X-Map*, *+10km Skypiea / -10km Fish-Man Cross-Section*, *Wano & Onigashima Woodblock Map*, ***Thousand Sunny* & Soldier Dock Blueprint**, and **Egghead & Elbaph Final Saga Sea Chart**).
3. **🧭 3D Log Pose Timeline (14 Sagas)**: Sail the Going Merry and Thousand Sunny from East Blue all the way to Egghead Future Island and Elbaph Warland with shortest-arc spherical ship navigation.
4. **⛵ 3D Shipwright Dock (*Thousand Sunny* & *Going Merry*)**: Orbit Franky's Adam Wood brigantine sloop and Kaya's caravel in 3D, toggle **X-Ray Hull Cutaway** to inspect the rotating **Soldier Dock System (Channels 0–5)**, cyan **Aquarium Bar**, and **3 Cola Barrels**, fire the **Gaon Cannon**, or launch a **1 km Coup de Burst**!
5. **🏴‍☠️ Characters & Vivre Cards (38)**: Search & sort 38 legends across Pirates, Cross Guild Crown-bounty Marines, Five Elders, and Elbaph Giants; inspect **Official Vivre Card #IDs**, birthdays, origin seas, favorite foods, and **🔊 Playable Signature Laughs** (*"Shishishishi!"*, *"Zehahahaha!"*, *"Dereshishishi!"*, *"Gegyagyagya! Gababababa!"*); and run **1v1 Grand Line Clash** simulations.
6. **⚓ Build Pirate Crew**: Draft a 5-role crew (`Captain`, `First Mate`, `Navigator`, `Cook/Doctor`, `Helmsman`) under the **฿ 6.5 Billion Yonko Salary Cap** or Free-Play Mode.
7. **🍇 3D Devil Fruits (21 Canonical *Akuma no Mi Zukan* Specimens)**: Spin 21 manga-accurate fruits across 4 Zukan Botanical Plates (explicitly distinguishing Oda-illustrated Zukan fruits from honest Zukan-Style Reconstructions) and trigger custom 3D Awakening / Paw / Punk-Records particle bursts.
8. **📜 Lore, Haki & 12-Question Quiz + 🛡️ 4-Tier Spoiler Shield**: Switch anytime between *East Blue*, *Pre-Timeskip*, *Wano Country*, and *Egghead & Elbaph* with zero cross-era spoiler leaks, 11-language Read Aloud narration, and Dark/Light themes!
