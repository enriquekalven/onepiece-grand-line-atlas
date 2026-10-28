# 🏴‍☠️ One Piece: Grand Line 3D & Manga Atlas

**Live Portal:** [https://onepiece-grand-line-atlas.web.app](https://onepiece-grand-line-atlas.web.app)

An interactive, kid-friendly 3D **One Piece** world globe, canonical manga/anime map atlas, Log Pose timeline, 30-character Wanted Poster & power radar vault, 5-Pirate Dream Crew Builder, 18-Devil-Fruit 3D holodeck, and Road Poneglyph treasure hunt.

Built with **zero external npm dependencies** and hardened with strict CSP, XSS-free DOM construction, and path-traversal defenses.

## 🚀 Local Development & Tests

```bash
npm start
# Opens locally at http://127.0.0.1:4173/

npm test
# Runs automated data integrity, Spoiler Shield, spherical math, ETag/CSP & DOM safety suite
```

## ☁️ Firebase Hosting Deployment (`project-maui`)

Configured via [`firebase.json`](./firebase.json) and [`.firebaserc`](./.firebaserc) targeting site `onepiece-grand-line-atlas`:

```bash
firebase deploy --only hosting --project project-maui
```

## 🌟 Key Interactive Modes

1. **🌍 3D World & Oceans**: Custom HTML5 3D sphere featuring the Red Line, Grand Line, Calm Belts, 18 sculpted 3D island silhouettes, **Canonical 45° Manga X-Axis Tilt** + Compass Rose (`N / E / S / W`), and **4 Road Poneglyph crimson laser beams** once Laugh Tale is unlocked.
2. **🗺️ Manga & Anime Maps**: Pan, pinch-zoom, or use keyboard Arrow keys across 4 illustrated maps (*Grand Line & Road Poneglyph Sea Chart*, *Crocus's Reverse Mountain X-Map*, *+10km Skypiea / -10km Fish-Man Cross-Section*, and *Wano & Onigashima Woodblock Map*).
3. **🧭 3D Log Pose Timeline**: Sail the Going Merry and Thousand Sunny across 12 sagas with shortest-arc spherical ship navigation.
4. **🏴‍☠️ Characters & Power (30)**: Search & sort 30 legends, slide through **Wanted Poster Bounty Evolution** milestones across arcs, and run **1v1 Grand Line Clash** simulations on a 6-axis radar chart.
5. **⚓ Build Pirate Crew**: Draft a 5-role crew (`Captain`, `First Mate`, `Navigator`, `Cook/Doctor`, `Helmsman`) under the **฿ 6.5 Billion Yonko Salary Cap** or Free-Play Mode.
6. **🍇 3D Devil Fruits (18)**: Spin pre-cached 3D Paramecia, Zoan, and Logia fruits and unleash 3D Haki / Awakening particle bursts.
7. **📜 Lore, Haki & Quiz + 🛡️ Spoiler Shield**: Switch anytime between *East Blue*, *Pre-Timeskip*, and *Up to Wano Country* with zero spoiler leaks!
