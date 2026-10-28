/**
 * Grand Line 3D Portal — Canonical Manga Maps, 18 World Locations & 12 Log Pose Timeline Arcs
 * Works in both Browser (window.OP_MAPS_AND_WORLD) and Node.js (module.exports) for automated tests.
 */

'use strict';

(function (root) {
  const canonicalMaps = [
    {
      id: 'reverse-mountain-x-map',
      title: 'Reverse Mountain & The Diagonal "X" World Map (4 Blues + Calm Belts)',
      badge: 'Chapter 101 / Episode 62 Map',
      era: 'east-blue',
      imageUrl: '/assets/maps/world_reverse_mountain_map.jpg',
      description:
        'Why are the seas called North, South, East, and West Blue if the Grand Line wraps around the planet? In Crocus\'s manga map, the Red Line and Grand Line cross each other at a 45-degree DIAGONAL "X" angle! That puts the 4 triangular oceans directly North, East, South, and West — and currents from all 4 Blues rush uphill into Reverse Mountain\'s 4 canals and down into the Grand Line!',
      hotspots: [
        {
          x: 28,
          y: 16,
          era: 'east-blue',
          label: '🧭 North Blue',
          locationId: 'north-blue',
          characterId: 'sanji',
          note: 'Birthplace of Sanji and the fairytale of Mont Blanc Noland!'
        },
        {
          x: 78,
          y: 28,
          era: 'east-blue',
          label: '🌅 East Blue',
          locationId: 'east-blue',
          characterId: 'luffy',
          note: 'Home of Luffy, Zoro, Nami, Usopp, and Pirate King Gol D. Roger!'
        },
        {
          x: 15,
          y: 74,
          era: 'east-blue',
          label: '📚 West Blue',
          locationId: 'west-blue',
          characterId: 'shanks',
          note: 'Home of Red-Haired Shanks and the ancient library island of Ohara!'
        },
        {
          x: 63,
          y: 78,
          era: 'east-blue',
          label: '🔧 South Blue',
          locationId: 'south-blue',
          characterId: 'chopper',
          note: 'Rugged southern sea famous for Torino Kingdom and Karakuri Island!'
        },
        {
          x: 50,
          y: 49,
          era: 'east-blue',
          label: '🌀 Reverse Mountain Summit',
          locationId: 'reverse-mountain',
          characterId: 'luffy',
          note: 'Four ocean currents climb uphill and plunge straight into the Grand Line!'
        },
        {
          x: 26,
          y: 39,
          era: 'east-blue',
          label: '🐍 Calm Belt (Sea Kings!)',
          locationId: 'calm-belt',
          characterId: 'mihawk',
          note: 'Windless ocean strips bordering the Grand Line — filled with giant Sea Kings!'
        },
        {
          x: 59,
          y: 22,
          era: 'east-blue',
          label: '🧱 Crimson Red Line Continent',
          locationId: 'red-line',
          characterId: 'roger',
          note: '10,000m high indestructible rock continent wrapping the globe.'
        }
      ]
    },
    {
      id: 'vertical-cross-section-map',
      title: 'World Vertical Cross-Section: +10,000m Skypiea to -10,000m Fish-Man Island',
      badge: 'Skypiea & Fish-Man Island Diagram',
      era: 'pre-timeskip',
      imageUrl: '/assets/maps/skypiea_fishman_map.jpg',
      description:
        'The One Piece world stretches 20,000 meters vertically! High in the clouds at +10,000m floats Sky Island (Skypiea) on the White-White Sea, reached via the explosive Knock Up Stream geyser. At sea level (0m) sits Sabaody Archipelago beside the towering Red Line. And 10,000m below the surface (-10,000m) inside a giant bubble lit by the roots of Sunlight Tree Eve lies Fish-Man Island!',
      hotspots: [
        {
          x: 28,
          y: 14,
          era: 'pre-timeskip',
          label: '☁️ Skypiea & Upper Yard (+10,000m)',
          locationId: 'skypiea',
          characterId: 'luffy',
          note: 'City of Gold Shandora & the Golden Bell floating on solid Sea Clouds!'
        },
        {
          x: 32,
          y: 42,
          era: 'pre-timeskip',
          label: '🌊 Knock Up Stream Geyser',
          locationId: 'skypiea',
          characterId: 'nami',
          note: 'Giant exploding underwater steam current that launches ships into the sky!'
        },
        {
          x: 66,
          y: 46,
          era: 'pre-timeskip',
          label: '🫧 Sabaody Mangrove Groves (0m)',
          locationId: 'sabaody-marineford',
          characterId: 'kizaru',
          note: 'Yarukiman Mangrove trees secrete bubble resin used to coat ships for the deep sea.'
        },
        {
          x: 92,
          y: 36,
          era: 'pre-timeskip',
          label: '🧱 The Red Line Wall (+10,000m)',
          locationId: 'red-line',
          characterId: 'whitebeard',
          note: 'Pirates cannot sail over the Red Line — their coated ships must dive under it!'
        },
        {
          x: 34,
          y: 78,
          era: 'pre-timeskip',
          label: '🧜‍♀️ Fish-Man Island Bubble (-10,000m)',
          locationId: 'fishman-island',
          characterId: 'jinbe',
          note: 'Lit by the glowing deep-sea roots of Sunlight Tree Eve!'
        }
      ]
    },
    {
      id: 'grandline-sea-chart',
      title: 'Grand Line Sea Chart: 7 Log Pose Routes & 4 Road Poneglyphs to Laugh Tale',
      badge: "Nami & Inuarashi's Manga Chart",
      era: 'pre-timeskip',
      imageUrl: '/assets/maps/grandline_road_poneglyph_map.jpg',
      description:
        'Shown by Crocus at Twin Capes (Chapter 105) and expanded by Duke Inuarashi on Zou (Chapter 818)! Starting from Reverse Mountain on the left, pirates choose 1 of 7 magnetic Log Pose routes across Paradise. All 7 routes converge at Sabaody & Marineford before diving 10,000m through Fish-Man Island into the New World!',
      hotspots: [
        {
          x: 8,
          y: 44,
          era: 'east-blue',
          label: '⛰️ Reverse Mountain & Laboon',
          locationId: 'reverse-mountain',
          characterId: 'chopper',
          note: 'Entry to the Grand Line where Laboon the island whale waits!'
        },
        {
          x: 34,
          y: 52,
          era: 'pre-timeskip',
          label: '🏜️ Alabasta (Route 4)',
          locationId: 'alabasta',
          characterId: 'crocodile',
          note: 'Desert kingdom where Robin joined and Luffy defeated Warlord Sir Crocodile.'
        },
        {
          x: 36,
          y: 23,
          era: 'pre-timeskip',
          label: '☁️ Skypiea (+10,000m Sky Route)',
          locationId: 'skypiea',
          characterId: 'usopp',
          note: 'Reached via the Knock Up Stream geyser!'
        },
        {
          x: 41,
          y: 38,
          era: 'pre-timeskip',
          label: '🌊 Water 7 & Enies Lobby',
          locationId: 'water7-enies',
          characterId: 'franky',
          note: 'Where Franky built the Thousand Sunny and Luffy unlocked Gear 2!'
        },
        {
          x: 46,
          y: 48,
          era: 'pre-timeskip',
          label: '⛓️ Impel Down & Tarai Current',
          locationId: 'impel-down',
          characterId: 'hancock',
          note: 'Underwater Calm Belt fortress connected to Enies Lobby & Marineford by whirlpool gates!'
        },
        {
          x: 50,
          y: 24,
          era: 'pre-timeskip',
          label: '🫧 Sabaody & Marineford',
          locationId: 'sabaody-marineford',
          characterId: 'whitebeard',
          note: 'All 7 Paradise Log Pose routes converge here before the Red Line!'
        },
        {
          x: 50,
          y: 67,
          era: 'pre-timeskip',
          label: '🧜‍♀️ Fish-Man Island (-10,000m)',
          locationId: 'fishman-island',
          characterId: 'jinbe',
          note: 'Underwater bubble gateway through the base of the Red Line.'
        },
        {
          x: 61,
          y: 49,
          era: 'wano',
          label: '🌻 Dressrosa (New World)',
          locationId: 'dressrosa',
          characterId: 'doflamingo',
          note: 'Where Luffy & Law defeated Doflamingo and Sabo ate the Flame-Flame Fruit!'
        },
        {
          x: 69,
          y: 35,
          era: 'wano',
          label: '🐘 Zou — Walking Elephant (Poneglyph #1)',
          locationId: 'zou-zunesha',
          characterId: 'law',
          note: '1,000-year-old giant elephant Zunesha carrying the Mink Tribe and Road Poneglyph #1!'
        },
        {
          x: 76,
          y: 78,
          era: 'wano',
          label: '🎂 Whole Cake Island (Poneglyph #2)',
          locationId: 'whole-cake',
          characterId: 'katakuri',
          note: "Big Mom's candy territory where Brook stole Road Poneglyph #2 & Luffy unlocked Future Sight!"
        },
        {
          x: 76,
          y: 25,
          era: 'wano',
          label: '🐉 Wano Country (Poneglyph #3)',
          locationId: 'wano-country',
          characterId: 'kaido',
          note: 'Samurai fortress where Gear 5 Luffy, Law & Kid defeated Kaido & Big Mom!'
        },
        {
          x: 76,
          y: 51,
          era: 'wano',
          label: '👑 LAUGH TALE (The X Intersection!)',
          locationId: 'laugh-tale',
          characterId: 'roger',
          note: 'Where the 4 crimson Road Poneglyph coordinates cross to reveal the One Piece!'
        }
      ]
    },
    {
      id: 'wano-onigashima-woodblock-map',
      title: 'Wano Country 6-Region Woodblock Map & Flying Onigashima Skull Dome',
      badge: 'Wano Act 1–3 Manga Map',
      era: 'wano',
      imageUrl: '/assets/maps/wano_onigashima_map.jpg',
      description:
        "Every Act of Wano in the manga opens with this traditional Ukiyo-e map! Wano Country sits high atop a natural fortress wall surrounded by raging waterfalls that giant Koi fish swim up. Inside its inland sea lie 6 distinct climate regions (Flower Capital with Mt. Fuji, Kuri, Udon, Hakumai, Ringo, and Kibi), plus Emperor Kaido's horned skull island Onigashima!",
      hotspots: [
        {
          x: 16,
          y: 68,
          era: 'wano',
          label: '🐟 Giant Waterfall Koi Climb',
          locationId: 'wano-country',
          characterId: 'luffy',
          note: 'The Thousand Sunny hitched a ride behind giant Koi carp to climb straight up the waterfall!'
        },
        {
          x: 48,
          y: 49,
          era: 'wano',
          label: '🌸 Flower Capital & Mt. Fuji',
          locationId: 'wano-country',
          characterId: 'robin',
          note: 'Center of Wano — deep underneath Mt. Fuji lies submerged Old Wano and Road Poneglyph #3!'
        },
        {
          x: 31,
          y: 28,
          era: 'wano',
          label: '⚔️ Kuri & Oden Castle Ruins',
          locationId: 'wano-country',
          characterId: 'oden',
          note: "Legendary samurai Kozuki Oden's beloved region where the Raid on Onigashima was planned."
        },
        {
          x: 55,
          y: 24,
          era: 'wano',
          label: '⛓️ Udon Prisoner Mines',
          locationId: 'wano-country',
          characterId: 'luffy',
          note: 'Where Old Man Hyogoro taught Luffy Advanced Armament Haki ("Ryuo")!'
        },
        {
          x: 70,
          y: 36,
          era: 'wano',
          label: '❄️ Snowy Ringo (Enma & Ryuma)',
          locationId: 'wano-country',
          characterId: 'zoro',
          note: "Eternal winter region where Zoro fought on Bandit's Bridge and received Oden's blade Enma."
        },
        {
          x: 79,
          y: 72,
          era: 'wano',
          label: '💀 Onigashima Skull Dome (Gear 5 & Yamato!)',
          locationId: 'wano-country',
          characterId: 'yamato',
          note: 'Kaido lifted Onigashima into the sky on Flame Clouds while Luffy & Yamato defended Wano!'
        }
      ]
    }
  ];

  const worldLocations = [
    {
      id: 'east-blue',
      name: 'East Blue (Dawn Island, Baratie, Arlong Park & Loguetown)',
      category: 'Four Blues',
      era: 'east-blue',
      lat: 26,
      lon: -46,
      altitude: 0,
      color: '#38bdf8',
      islandShape: 'windmill',
      heroCharacterId: 'luffy',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Home of Luffy, Zoro, Nami, Usopp & Gol D. Roger!',
      summary:
        'One of the four great oceans separated by the Red Line and Calm Belts. Even though Grand Line pirates call East Blue the "most peaceful sea" (average bounty ~3,000,000 Berries), it produced Pirate King Gol D. Roger, Monkey D. Garp, and Monkey D. Luffy!',
      keyFacts: [
        'Islands: Dawn Island (Windmill Village), Shells Town, Orange Town (Buggy!), Syrup Village, Baratie, Arlong Park, Loguetown.',
        'Entry to Grand Line: Pirates sail from Loguetown ("Town of the Beginning and the End") straight up Reverse Mountain.',
        'Fun Kid Fact: Normal magnetic compasses work fine in the Four Blues — they only spin wildly once you enter the Grand Line!'
      ]
    },
    {
      id: 'west-blue',
      name: 'West Blue (Ohara & Sea of Scholars)',
      category: 'Four Blues',
      era: 'east-blue',
      lat: -28,
      lon: -135,
      altitude: 0,
      color: '#60a5fa',
      islandShape: 'tree',
      heroCharacterId: 'shanks',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Home of Red-Haired Shanks, Brook & the Scholars of Ohara!',
      summary:
        "Sitting in the western quadrant of the X-shaped world! West Blue was home to the giant Tree of Knowledge on Ohara, as well as Red-Haired Shanks' hometown famous for the finest sake in the world.",
      keyFacts: [
        'Famous Natives: Nico Robin, Brook, Red-Haired Shanks, Capone "Gang" Bege, Gecko Moria.',
        'Giant Landmark: The 5,000-year-old Tree of Knowledge towered above Ohara like a natural library skyscraper!'
      ]
    },
    {
      id: 'north-blue',
      name: 'North Blue (Germa & Sea of Adventurers)',
      category: 'Four Blues',
      era: 'east-blue',
      lat: 28,
      lon: -135,
      altitude: 0,
      color: '#818cf8',
      islandShape: 'castle',
      heroCharacterId: 'sanji',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Birthplace of Sanji, Trafalgar Law & the Tale of Noland!',
      summary:
        'The northern ocean quadrant known for the picture-book legend of "Mont Blanc Noland the Liar" (who actually told the truth about the City of Gold!) and the snail-powered floating castle of Germa 66.',
      keyFacts: [
        'Famous Natives: Vinsmoke Sanji, Trafalgar D. Water Law, Bepo, X Drake, Basil Hawkins.',
        'Dream Connection: Sanji crossed the Red Line from North Blue to East Blue as a kid and dreams of finding the All Blue!'
      ]
    },
    {
      id: 'south-blue',
      name: 'South Blue (Baterilla & Karakuri Island)',
      category: 'Four Blues',
      era: 'east-blue',
      lat: -32,
      lon: -46,
      altitude: 0,
      color: '#34d399',
      islandShape: 'gears',
      heroCharacterId: 'chopper',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Home of Franky, Portgas D. Ace, Eustass Kid & Genius Inventors!',
      summary:
        'A rugged southern ocean famous for Baterilla, Torino Kingdom (giant birds and medicinal plants!), and snow-covered Karakuri Island (birthplace of the genius scientist Dr. Vegapunk!).',
      keyFacts: [
        'Famous Natives: Portgas D. Ace, Franky, Eustass Kid, Killer, Jewelry Bonney, Sengoku.',
        'Mechanical Wonder: Karakuri Island is packed with giant gears, cyborg animals, and futuristic blueprints!'
      ]
    },
    {
      id: 'red-line',
      name: 'The Red Line (The Crimson Continent)',
      category: 'World Geography',
      era: 'east-blue',
      lat: 18,
      lon: -90,
      altitude: 0.04,
      color: '#ef4444',
      islandShape: 'peaks',
      heroCharacterId: 'roger',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'A 10,000-meter-high crimson rock wall wrapping the entire planet!',
      summary:
        'Unlike real Earth, the One Piece world has only ONE massive ribbon-like continent called the Red Line! Together with the Grand Line (crossing it at a 90-degree X-angle), the Red Line divides the planet into the Four Blues.',
      keyFacts: [
        'Two Crossing Points: Pirates can only cross the Red Line at Reverse Mountain (entering Paradise) or by diving 10,000m under it through Fish-Man Island.',
        'Indestructible Wall: Its sheer red cliffs reach 10,000m into the clouds and plunge all the way to the ocean floor.'
      ]
    },
    {
      id: 'calm-belt',
      name: 'The Calm Belts (Nest of the Giant Sea Kings!)',
      category: 'World Geography',
      era: 'east-blue',
      lat: 14,
      lon: -18,
      altitude: 0,
      color: '#14b8a6',
      islandShape: 'seaking',
      heroCharacterId: 'mihawk',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Zero wind, zero currents, and giant ocean monsters!',
      summary:
        'Two strips of ocean running directly along the north and south borders of the Grand Line. Because there is never any wind or current in the Calm Belt, normal sailing ships get stranded — and giant Sea Kings (monsters the size of islands!) rise from the deep!',
      keyFacts: [
        'Secret Crossing Tech: Marine warships line their hulls with Sea Prism Stone (Kairoseki) so Sea Kings swim right underneath without noticing them!',
        'Amazon Lily: Boa Hancock\'s Kuja Pirates live inside the Calm Belt on an island pulled by giant Yuda sea-snakes!'
      ]
    },
    {
      id: 'reverse-mountain',
      name: 'Reverse Mountain & Twin Capes (Laboon!)',
      category: 'Grand Line — Paradise',
      era: 'east-blue',
      lat: 0,
      lon: -90,
      altitude: 0.06,
      color: '#f59e0b',
      islandShape: 'x-mountain',
      heroCharacterId: 'chopper',
      mapId: 'reverse-mountain-x-map',
      subtitle: 'Where four ocean currents flow UP a mountain into the Grand Line!',
      summary:
        "The famous X-shaped mountain on the Red Line shown in Crocus's map! Canals from East, West, North, and South Blue rush UPHILL to the summit, combine at the peak, and shoot down a fifth canal straight into the Grand Line where Laboon the island whale waits!",
      keyFacts: [
        'The Log Pose Secret: At Twin Capes lighthouse, Crocus gives Nami her first Log Pose — a special wrist compass that locks onto Grand Line magnetic waves.',
        'Seven Starting Paths: From Reverse Mountain, a pirate crew chooses one of 7 magnetic paths through Paradise.'
      ]
    },
    {
      id: 'alabasta',
      name: 'Alabasta Kingdom (Sandora Desert & Rainbase)',
      category: 'Grand Line — Paradise',
      era: 'pre-timeskip',
      lat: -3,
      lon: -55,
      altitude: 0.02,
      color: '#fbbf24',
      islandShape: 'pyramid',
      heroCharacterId: 'crocodile',
      mapId: 'grandline-sea-chart',
      subtitle: "Princess Vivi's desert kingdom & Luffy's clash with Warlord Sir Crocodile!",
      summary:
        'A vast desert kingdom cut in half by the giant Sandora River! Here the Straw Hats battled Baroque Works and Sand-Logia Warlord Sir Crocodile to stop a civil war. Hidden beneath Alubarna\'s royal tomb rests an ancient Poneglyph stone!',
      keyFacts: [
        "Symbol of Friendship: The silent X mark raised on the Straw Hats' left arms is one of the most iconic moments in One Piece.",
        'Crew Addition: Archaeologist Nico Robin joins the Going Merry right after leaving Alabasta!'
      ]
    },
    {
      id: 'skypiea',
      name: 'Skypiea — Sky Island (+10,000m in the Clouds!)',
      category: 'Sky Sea',
      era: 'pre-timeskip',
      lat: 6,
      lon: -32,
      altitude: 0.24,
      color: '#fef08a',
      islandShape: 'cloud-bell',
      heroCharacterId: 'usopp',
      mapId: 'vertical-cross-section-map',
      subtitle: 'An island of solid Sea Clouds, Giant Jack & the Shandora Golden Bell!',
      summary:
        'Floating 10,000 meters above Jaya on the White-White Sea! Most pirates laugh and think Sky Island is a fairy tale, but the Straw Hats rode the giant Knock Up Stream geyser straight into the clouds, defeated Lightning "God" Enel, and rang the Golden Bell!',
      keyFacts: [
        'The Skull Map Puzzle: Upper Yard was originally the missing right eye and skull half of Jaya Island before the Knock Up Stream blasted it into the clouds 400 years ago!',
        "Roger's Message: Gol D. Roger visited Skypiea 20+ years earlier and left an encouraging message beside the Golden Bell."
      ]
    },
    {
      id: 'water7-enies',
      name: 'Water 7 & Enies Lobby (City of Water & Judicial Waterfall)',
      category: 'Grand Line — Paradise',
      era: 'pre-timeskip',
      lat: -2,
      lon: -6,
      altitude: 0.02,
      color: '#38bdf8',
      islandShape: 'fountain',
      heroCharacterId: 'franky',
      mapId: 'grandline-sea-chart',
      subtitle: 'Birthplace of the Thousand Sunny, Gear 2 & Robin\'s "I Want to Live!"',
      summary:
        'Connected across the sea by the Puffing Tom Sea Train! Water 7 rises like a giant Venetian fountain city, while Enies Lobby hovers above a bottomless ocean waterfall hole where night never falls. Here Luffy unlocked Gear 2 & Gear 3, and Franky built the Thousand Sunny!',
      keyFacts: [
        "Going Merry's Klabautermann: The spirit of the beloved Going Merry sailed through a storm one final time to save every Straw Hat.",
        'New Shipwright: Cyborg Franky joins the crew after building the Thousand Sunny from legendary Treasure Tree Adam wood!'
      ]
    },
    {
      id: 'impel-down',
      name: 'Impel Down & The Tarai Whirlpool Current',
      category: 'World Geography',
      era: 'pre-timeskip',
      lat: -8,
      lon: 48,
      altitude: -0.06,
      color: '#a855f7',
      islandShape: 'fortress',
      heroCharacterId: 'hancock',
      mapId: 'grandline-sea-chart',
      subtitle: 'Six-level underwater fortress linked by the 3 Gates of Justice!',
      summary:
        'Built straight down onto the Calm Belt ocean floor! A giant triangular whirlpool called the Tarai Current connects Enies Lobby, Impel Down, and Marineford behind towering Gates of Justice. With Boa Hancock\'s help, Luffy snuck inside and teamed up with Buggy, Crocodile, and Jinbe!',
      keyFacts: [
        'Six Wild Levels: Crimson Hell, Wild Beast Hell, Starvation Desert, Blazing Hell, Freezing Hell, and Eternal Level 6!',
        'Unlikely Escape Team: Luffy, Buggy the Clown, Jinbe, Sir Crocodile, Ivankov, and Mr. 3 led the biggest breakout in history — riding whale sharks out into the sea!'
      ]
    },
    {
      id: 'sabaody-marineford',
      name: 'Sabaody Archipelago & Marineford Crescent Bay',
      category: 'Grand Line — Paradise',
      era: 'pre-timeskip',
      lat: 3,
      lon: 80,
      altitude: 0.02,
      color: '#f43f5e',
      islandShape: 'mangrove',
      heroCharacterId: 'whitebeard',
      mapId: 'vertical-cross-section-map',
      subtitle: 'Where all 7 Paradise routes converge & the Summit War of Marineford!',
      summary:
        'Right before the Red Line stands Sabaody — 79 giant Yarukiman Mangrove trees that blow floating resin bubbles! Nearby stands crescent-shaped Marineford, where Whitebeard\'s fleet and Luffy charged past Admirals Akainu, Kizaru, and Aokiji to rescue Ace.',
      keyFacts: [
        "Why Sabaody Has No Magnetic Pull: Sabaody isn't rock — it's a giant forest of trees growing from the seafloor, so Log Poses can't lock onto it!",
        'Resin Coating: Silvers Rayleigh coats the Thousand Sunny in bubble resin so it can dive 10,000m underwater.'
      ]
    },
    {
      id: 'fishman-island',
      name: 'Fish-Man Island (-10,000m Under the Red Line!)',
      category: 'Undersea Gateway',
      era: 'pre-timeskip',
      lat: -1,
      lon: 90,
      altitude: -0.16,
      color: '#2dd4bf',
      islandShape: 'bubble',
      heroCharacterId: 'jinbe',
      mapId: 'vertical-cross-section-map',
      subtitle: 'An underwater paradise inside a giant bubble lit by Sunlight Tree Eve!',
      summary:
        'Located 10,000 meters beneath the surface inside a giant double-layered bubble directly inside a cave tunnel through the base of the Red Line! Sunlight from Sabaody travels 10km down through the glowing roots of Sunlight Tree Eve.',
      keyFacts: [
        "Joy Boy's Apology: Holds a special Poneglyph containing an ancient apology letter from Joy Boy and the secret of Poseidon (Princess Shirahoshi!).",
        '3-Needle Log Pose: Leaving Fish-Man Island requires a New World Log Pose with 3 needles — whichever needle jiggles wildly points to the most dangerous island!'
      ]
    },
    {
      id: 'dressrosa',
      name: 'Dressrosa & Green Bit (Colosseum Island)',
      category: 'Grand Line — New World',
      era: 'wano',
      lat: 3,
      lon: 118,
      altitude: 0.02,
      color: '#ec4899',
      islandShape: 'colosseum',
      heroCharacterId: 'doflamingo',
      mapId: 'grandline-sea-chart',
      subtitle: 'Gear 4 Bounce-Man, Sabo\'s Return & the Straw Hat Grand Fleet!',
      summary:
        'Ringed by giant jagged rock cliffs in the New World! Here Luffy and Trafalgar Law allied to topple Warlord Donquixote Doflamingo, Sabo reunited with Luffy in the Corrida Colosseum to inherit Ace\'s Flame-Flame Fruit, and Luffy unveiled Gear 4!',
      keyFacts: [
        'Devil Fruit Awakening: Doflamingo revealed that an Awakened Paramecia can transform entire city streets into strings!',
        'God Usopp: Usopp awakened Observation Haki here for a legendary long-range snipe!'
      ]
    },
    {
      id: 'zou-zunesha',
      name: 'Zou — Zunesha the 1,000-Year Walking Elephant!',
      category: 'Grand Line — New World',
      era: 'wano',
      questPoneglyphId: 'zou',
      lat: 8,
      lon: 133,
      altitude: 0.09,
      color: '#34d399',
      islandShape: 'elephant',
      heroCharacterId: 'law',
      mapId: 'grandline-sea-chart',
      subtitle: 'A living island on the back of a 20km-tall elephant & Road Poneglyph #1!',
      summary:
        'Zou isn\'t rooted to the ocean floor — so no Log Pose can ever find it! For over 1,000 years, the colossal elephant Zunesha has marched across the New World carrying the Mokomo Dukedom of the warrior Mink Tribe on its back!',
      keyFacts: [
        'Road Poneglyph #1 Revealed: Inside the sacred Whale Tree, Inuarashi and Nekomamushi showed Robin the first crimson Road Poneglyph and explained how all 4 stones point to Laugh Tale!',
        'Voice of All Things: Only Luffy and Momonosuke could hear Zunesha\'s booming telepathic voice!'
      ]
    },
    {
      id: 'whole-cake',
      name: 'Whole Cake Island (Totto Land — 34 Dessert Islands)',
      category: 'Grand Line — New World',
      era: 'wano',
      questPoneglyphId: 'whole-cake',
      lat: -5,
      lon: 148,
      altitude: 0.02,
      color: '#c084fc',
      islandShape: 'cake',
      heroCharacterId: 'katakuri',
      mapId: 'grandline-sea-chart',
      subtitle: "Big Mom's candy archipelago, Road Poneglyph #2 & Future Sight!",
      summary:
        "Shaped like a giant multi-tiered wedding cake surrounded by 34 dessert islands (Cacao, Nuts, Biscuits, Cheese)! Soul King Brook heroically snuck into Big Mom's treasure vault to copy Road Poneglyph #2, and Luffy battled Katakuri in the Mirror-World to unlock Future Sight!",
      keyFacts: [
        'Road Poneglyph #2 Secured: Brook hid the Poneglyph rubbing right inside his own skull!',
        'Fifth Emperor Headline: After escaping Totto Land with Sanji and Jinbe\'s help, Luffy\'s bounty soared to 1,500,000,000 Berries!'
      ]
    },
    {
      id: 'wano-country',
      name: 'Wano Country & Onigashima Skull Dome',
      category: 'Grand Line — New World',
      era: 'wano',
      questPoneglyphId: 'wano',
      lat: 5,
      lon: 168,
      altitude: 0.05,
      color: '#facc15',
      islandShape: 'wano-skull',
      heroCharacterId: 'kaido',
      mapId: 'wano-onigashima-woodblock-map',
      subtitle: 'Waterfall Fortress, 6 Climate Regions, Mt. Fuji & GEAR 5!',
      summary:
        'Perched atop towering waterfalls that ships climb behind giant Koi carp! Deep beneath Mt. Fuji lies submerged Old Wano (holding Road Poneglyph #3 and Ancient Weapon Pluton). On Fire Festival night, Luffy, Zoro, Sanji, Law, Kid, and Yamato raided flying Onigashima and Luffy awakened GEAR 5!',
      keyFacts: [
        "Three Wano Power-Ups: Advanced Armament (Ryuo), Supreme King Conqueror's Coating, and Gear 5 Devil Fruit Awakening!",
        'New Emperors of the Sea: After liberating Wano, both Luffy and Buggy the Clown (!) were named among the new Four Emperors!'
      ]
    },
    {
      id: 'laugh-tale',
      name: 'Laugh Tale (Where the 4 Road Poneglyphs Cross!)',
      category: 'Grand Line — New World',
      era: 'wano',
      lat: 0,
      lon: -104,
      altitude: 0.03,
      color: '#fde047',
      islandShape: 'x-treasure',
      heroCharacterId: 'roger',
      mapId: 'grandline-sea-chart',
      subtitle: 'Where Gol D. Roger & Kozuki Oden laughed and left the One Piece!',
      summary:
        'No Log Pose can ever point to Laugh Tale! To reach it, a crew must find all 4 crimson Road Poneglyphs and draw lines connecting their 4 coordinates across the globe — the exact X-intersection is Laugh Tale!',
      keyFacts: [
        'Why "Laugh Tale"?: When Roger, Rayleigh, and Kozuki Oden read the true 800-year-old story left by Joy Boy, the entire crew burst into tears of laughter and named the island Laugh Tale!',
        'Treasure Hunt Tip: Collect all 4 Road Poneglyph rubbings in this portal to unlock the Golden Laugh Tale Celebration!'
      ]
    }
  ];

  const timelineArcs = [
    {
      step: 1,
      id: 'romance-dawn-east-blue',
      saga: 'East Blue Saga',
      title: 'Romance Dawn, Orange Town, Baratie, Arlong Park & Loguetown',
      era: 'east-blue',
      ship: 'Going Merry',
      locationId: 'east-blue',
      heroCharacterId: 'luffy',
      mapId: 'reverse-mountain-x-map',
      episodes: 'Episodes 1–61',
      bountyMilestone: "30,000,000 Berries (Luffy's 1st Bounty)",
      crewJoined: ['Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji'],
      mainBoss: 'Buggy the Clown, Don Krieg, Arlong & Captain Smoker',
      storySummary:
        'Inspired by Red-Haired Shanks, 17-year-old Monkey D. Luffy bursts out of a barrel to start his crew! He recruits Zoro, Nami, Usopp, and Sanji, earns the Going Merry, sends Buggy and Arlong flying, and races out of Loguetown toward the Grand Line!',
      worldLesson:
        'Introduces the Devil Fruit sea curse, Mihawk\'s Supreme Black Blade at Baratie, and the dream of sailing into the Grand Line!'
    },
    {
      step: 2,
      id: 'enter-grand-line',
      saga: 'Alabasta Saga (Part 1)',
      title: 'Reverse Mountain X-Canals, Laboon & Drum Island',
      era: 'east-blue',
      ship: 'Going Merry',
      locationId: 'reverse-mountain',
      heroCharacterId: 'chopper',
      mapId: 'reverse-mountain-x-map',
      episodes: 'Episodes 62–91',
      bountyMilestone: '30,000,000 Berries',
      crewJoined: ['Tony Tony Chopper'],
      mainBoss: 'Mr. 3 & King Wapol',
      storySummary:
        "The Going Merry rides Reverse Mountain's uphill canal straight into the Grand Line! The crew makes a promise to Laboon the whale, learns how the 7 Log Pose paths work from Crocus, visits prehistoric Little Garden, and recruits blue-nosed reindeer doctor Chopper on snowy Drum Island.",
      worldLesson:
        "Crocus's map reveals how the Red Line and Grand Line cross in a 45-degree diagonal X, and why normal compasses fail inside the Grand Line."
    },
    {
      step: 3,
      id: 'alabasta-kingdom',
      saga: 'Alabasta Saga (Part 2)',
      title: 'Showdown in Alabasta Kingdom',
      era: 'pre-timeskip',
      ship: 'Going Merry',
      locationId: 'alabasta',
      heroCharacterId: 'crocodile',
      mapId: 'grandline-sea-chart',
      episodes: 'Episodes 92–130',
      bountyMilestone: '100,000,000 Berries (Luffy) & 60,000,000 (Zoro)',
      crewJoined: ['Nico Robin'],
      mainBoss: 'Sir Crocodile (Seven Warlords of the Sea)',
      storySummary:
        "Crossing the Sandora Desert to save Princess Vivi's kingdom, Luffy reunites with his older brother Fire Fist Ace and figures out how liquids let him punch Sand-Logia user Sir Crocodile through solid bedrock!",
      worldLesson:
        'Introduces the Seven Warlords of the Sea, Logia intangibility, the "Will of D.", indestructible Poneglyph stones, and Ancient Weapon Pluton.'
    },
    {
      step: 4,
      id: 'skypiea-arc',
      saga: 'Sky Island Saga',
      title: 'Jaya Knock Up Stream & Skypiea (+10,000m)',
      era: 'pre-timeskip',
      ship: 'Going Merry (Flying Model)',
      locationId: 'skypiea',
      heroCharacterId: 'nami',
      mapId: 'vertical-cross-section-map',
      episodes: 'Episodes 144–195',
      bountyMilestone: '100,000,000 Berries',
      crewJoined: [],
      mainBoss: 'Bellamy the Hyena & "God" Enel (Lightning Logia)',
      storySummary:
        'When Nami\'s Log Pose points straight UP into the clouds, the crew solves the skull-shaped Jaya map puzzle and rides the explosive Knock Up Stream geyser 10,000m into the White-White Sea! Rubber Luffy is immune to Enel\'s 200-million-volt lightning and rings the Golden Bell!',
      worldLesson:
        'Introduces "Mantra" (Observation Haki), the +10,000m Sky Sea cross-section, and Roger\'s message carved beside the Golden Bell Poneglyph.'
    },
    {
      step: 5,
      id: 'water7-enies-lobby',
      saga: 'Water 7 Saga',
      title: 'Water 7, Enies Lobby & The Thousand Sunny',
      era: 'pre-timeskip',
      ship: 'Going Merry → Thousand Sunny',
      locationId: 'water7-enies',
      heroCharacterId: 'franky',
      mapId: 'grandline-sea-chart',
      episodes: 'Episodes 229–325',
      bountyMilestone: '300,000,000 Berries (Luffy) — Entire Crew Wanted!',
      crewJoined: ['Franky'],
      mainBoss: 'Admiral Aokiji, Rob Lucci & CP9',
      storySummary:
        'After surviving an icy encounter with Admiral Aokiji, the crew rides the Sea Train to Enies Lobby to rescue Nico Robin! Luffy unveils Gear 2 and Gear 3, the crew bids an emotional farewell to the Going Merry, and cyborg shipwright Franky builds the lion-headed Thousand Sunny!',
      worldLesson:
        "Vice Admiral Garp reveals the Three Great Powers (Marines, Seven Warlords, and the Four Emperors ruling the New World)!"
    },
    {
      step: 6,
      id: 'thriller-bark-sabaody',
      saga: 'Thriller Bark & Sabaody',
      title: 'Soul King Brook Joins & The 11 Supernovas',
      era: 'pre-timeskip',
      ship: 'Thousand Sunny',
      locationId: 'sabaody-marineford',
      heroCharacterId: 'brook',
      mapId: 'vertical-cross-section-map',
      episodes: 'Episodes 337–405',
      bountyMilestone: '300,000,000 Berries',
      crewJoined: ['Brook'],
      mainBoss: 'Gecko Moria, Bartholomew Kuma & Admiral Kizaru',
      storySummary:
        "In the spooky Florian Triangle, skeleton musician Brook joins the crew (he's the musician Laboon has waited 50 years to see again!). At bubble-filled Sabaody Archipelago, the crew meets Law, Kid, Silvers Rayleigh, and light-speed Admiral Kizaru.",
      worldLesson:
        'Shows how all 7 Paradise Log Pose routes converge at Sabaody before the 10,000m Red Line wall.'
    },
    {
      step: 7,
      id: 'summit-war-marineford',
      saga: 'Summit War Saga',
      title: 'Amazon Lily, Impel Down, Marineford & 3D2Y Training',
      era: 'pre-timeskip',
      ship: 'Kuja Ship & Polar Tang Submarine',
      locationId: 'impel-down',
      heroCharacterId: 'whitebeard',
      mapId: 'grandline-sea-chart',
      episodes: 'Episodes 408–516',
      bountyMilestone: '400,000,000 Berries (Luffy)',
      crewJoined: [],
      mainBoss: 'Magellan, Admirals Akainu/Kizaru/Aokiji & Blackbeard',
      storySummary:
        "Helped by Pirate Empress Boa Hancock, Luffy breaks into Impel Down (freeing Buggy, Crocodile, and Jinbe!) and rides the Tarai Current to Marineford alongside Whitebeard's armada. Afterward, the Straw Hats train for 2 years ('3D2Y') to master Haki for the New World!",
      worldLesson:
        'Rayleigh teaches the 3 types of Haki (Observation, Armament, Conqueror\'s) and Whitebeard confirms to the world: "THE ONE PIECE IS REAL!"'
    },
    {
      step: 8,
      id: 'fishman-island-return',
      saga: 'Fish-Man Island Saga',
      title: 'Return to Sabaody & Dive to Fish-Man Island (-10,000m)',
      era: 'pre-timeskip',
      ship: 'Thousand Sunny (Bubble Coated)',
      locationId: 'fishman-island',
      heroCharacterId: 'jinbe',
      mapId: 'vertical-cross-section-map',
      episodes: 'Episodes 517–574',
      bountyMilestone: '400,000,000 Berries',
      crewJoined: [],
      mainBoss: 'Hody Jones & Vander Decken IX',
      storySummary:
        'Reunited and stronger after 2 years, the Straw Hats dive 10,000 meters under the Red Line inside a glowing bubble! Luffy knocks out 50,000 foes with one Conqueror\'s Haki burst, protects Princess Shirahoshi, and earns a 3-Needle New World Log Pose!',
      worldLesson:
        'Explains Sunlight Tree Eve, Joy Boy\'s 800-year-old promise on the Ryugu Poneglyph, and the 3-Needle Log Pose.'
    },
    {
      step: 9,
      id: 'punk-hazard-dressrosa',
      saga: 'Dressrosa Saga',
      title: 'Pirate Alliance, Gear 4 & The Straw Hat Grand Fleet',
      era: 'wano',
      ship: 'Thousand Sunny',
      locationId: 'dressrosa',
      heroCharacterId: 'doflamingo',
      mapId: 'grandline-sea-chart',
      episodes: 'Episodes 579–746',
      bountyMilestone: '500,000,000 Berries (Luffy)',
      crewJoined: [],
      mainBoss: 'Caesar Clown & Warlord Donquixote Doflamingo',
      storySummary:
        "Rising into the blazing/frozen waters of Punk Hazard, Luffy forms an alliance with Trafalgar Law! On Dressrosa, Luffy reunites with his surviving brother Sabo, unleashes Gear 4: Bounce-Man to defeat Doflamingo's awakened strings, and inspires the 5,640-pirate Straw Hat Grand Fleet!",
      worldLesson:
        'Introduces Devil Fruit Awakening and launches the Four-Emperor Saga against Kaido and Big Mom.'
    },
    {
      step: 10,
      id: 'zou-whole-cake',
      saga: 'Zou & Whole Cake Saga',
      title: "Zunesha's Road Poneglyph Map & Whole Cake Chateau",
      era: 'wano',
      questPoneglyphId: 'zou',
      ship: 'Thousand Sunny',
      locationId: 'zou-zunesha',
      heroCharacterId: 'katakuri',
      mapId: 'grandline-sea-chart',
      episodes: 'Episodes 751–877',
      bountyMilestone: '1,500,000,000 Berries ("Fifth Emperor" Luffy)',
      crewJoined: ['Jinbe (Officially Pledged)'],
      mainBoss: 'Jack the Drought, Charlotte Katakuri & Big Mom',
      storySummary:
        "Atop the giant walking elephant Zunesha on Zou, the Mink Tribe unveils Road Poneglyph #1! Next, the crew infiltrates Big Mom's candy islands to rescue Sanji, Brook copies Road Poneglyph #2, and Luffy unlocks Future Sight against undefeated commander Katakuri!",
      worldLesson:
        'Reveals the exact map of how the 4 crimson Road Poneglyph coordinates cross in a red X to pinpoint Laugh Tale!'
    },
    {
      step: 11,
      id: 'wano-country-act1-2',
      saga: 'Wano Country Saga (Part 1)',
      title: "Wano's 6 Regions, Kozuki Oden's Voyage & Ryuo Training",
      era: 'wano',
      questPoneglyphId: 'whole-cake',
      ship: 'Thousand Sunny',
      locationId: 'wano-country',
      heroCharacterId: 'oden',
      mapId: 'wano-onigashima-woodblock-map',
      episodes: 'Episodes 890–999',
      bountyMilestone: '1,500,000,000 Berries',
      crewJoined: ['Jinbe (Joins at the Helmsman Wheel!)'],
      mainBoss: 'Emperor Kaido (Azure Dragon) & Shogun Orochi',
      storySummary:
        'Climbing Wano\'s giant waterfall behind Koi carp, Luffy trains in Udon to master Internal Destruction "Ryuo," Zoro receives Oden\'s sword Enma, and Kozuki Oden\'s legendary flashback reveals his voyage with Whitebeard and Gol D. Roger all the way to Laugh Tale!',
      worldLesson:
        "Shows how Wano's Kozuki Clan stonemasons carved the indestructible Poneglyphs 800 years ago."
    },
    {
      step: 12,
      id: 'onigashima-gear5',
      saga: 'Wano Country Saga (Climax)',
      title: 'Raid on Onigashima, Gear 5 Awakening & New Four Emperors!',
      era: 'wano',
      questPoneglyphId: 'wano',
      ship: 'Thousand Sunny',
      locationId: 'wano-country',
      heroCharacterId: 'luffy',
      mapId: 'wano-onigashima-woodblock-map',
      episodes: 'Episodes 1000–1085',
      bountyMilestone: '3,000,000,000 Berries (Emperor Monkey D. Luffy!)',
      crewJoined: ['All 10 Straw Hats Complete'],
      mainBoss: 'Emperor Kaido & Emperor Big Mom',
      storySummary:
        'As Kaido lifts Onigashima into the sky and Yamato holds the rooftop, Sanji ignites blue Ifrit Jambe, Zoro unlocks King of Hell, Law & Kid awaken their fruits to defeat Big Mom, and Luffy awakens GEAR 5 to defeat Kaido with the Drums of Liberation!',
      worldLesson:
        'With Road Poneglyph #3 found deep under Mt. Fuji, the Straw Hats hold 3 of the 4 crimson stones — and Luffy & Buggy join Shanks & Blackbeard as the new Four Emperors!'
    }
  ];

  const payload = { canonicalMaps, worldLocations, timelineArcs };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_MAPS_AND_WORLD = payload;
})(typeof window !== 'undefined' ? window : globalThis);
