/**
 * Grand Line 3D Portal — 18 Devil Fruits, Era-Safe Lore Topics & 10 Era-Tagged Quiz Questions
 */

'use strict';

(function (root) {
  const devilFruits = [
    {
      id: 'gomu-nika',
      name: 'Gomu Gomu no Mi',
      wanoTrueName: 'Gomu Gomu no Mi / Hito Hito no Mi, Model: Nika',
      englishName: 'Gum-Gum Fruit',
      wanoEnglishName: 'Gum-Gum Fruit (Awakened Sun God Nika)',
      category: 'Paramecia / Zoan (Mythical)',
      era: 'east-blue',
      user: 'Monkey D. Luffy',
      characterId: 'luffy',
      awakened: true,
      image: '/assets/fruits/gomu-nika.jpg',
      sprite: '/assets/fruits/gomu-nika.png',
      zukanShape: 'Spherical violet melon with interlocking S-swirls & green T-spiral stem (Ch. 1 • OP Mag Vol. 1)',
      shapeType: 'sphere',
      primaryColor: '#8b5cf6',
      secondaryColor: '#ddd6fe',
      auraColor: '#fde047',
      effectType: 'gear5',
      powerSummary:
        "Turns the user's entire body into super-stretchy, bullet-bouncing, lightning-proof rubber! By pumping his blood faster or inflating his bones, Luffy invented Gear 2 and Gear 3.",
      wanoPowerSummary:
        'Grants a rubber body — and in Wano Country awakens its true secret nature as the Mythical Zoan Model: Nika (Gear 5)! With cloud-white hair and the "Drums of Liberation" heartbeat, Luffy turns the ground and even lightning bolts into bouncy rubber!',
      weakness: 'Seawater, Sea Prism Stone, and sharp slashing blades.'
    },
    {
      id: 'bara-bara',
      name: 'Bara Bara no Mi',
      englishName: 'Chop-Chop Fruit',
      category: 'Paramecia',
      era: 'east-blue',
      user: 'Buggy the Star Clown',
      characterId: 'buggy',
      awakened: false,
      image: '/assets/fruits/bara-bara.jpg',
      sprite: '/assets/fruits/bara-bara.png',
      zukanShape: 'Oval crimson-magenta berry cluster of detachable swirl-marked spheres & green crown leaves (Ch. 19 • OP Mag Vol. 2)',
      shapeType: 'pineapple',
      primaryColor: '#be185d',
      secondaryColor: '#fbcfe8',
      auraColor: '#f43f5e',
      effectType: 'chop',
      powerSummary:
        'Allows the user to split their body into floating, levitating pieces at will — making Buggy completely immune to being cut or sliced by even the World\'s Greatest Swordsman, Dracule Mihawk!',
      weakness: 'Buggy\'s feet must remain on the ground so the rest of his body can fly within an invisible sphere around them!'
    },
    {
      id: 'hito-chopper',
      name: 'Hito Hito no Mi',
      englishName: 'Human-Human Fruit',
      category: 'Zoan',
      era: 'east-blue',
      user: 'Tony Tony Chopper',
      characterId: 'chopper',
      awakened: false,
      image: '/assets/fruits/hito-chopper.jpg',
      sprite: '/assets/fruits/hito-chopper.png',
      zukanShape: 'Crimson Amanita mushroom cap covered in curly S-swirls on a cream stalk with a curled top T-stem (SBS Vol. 45 • OP Mag Vol. 1)',
      shapeType: 'mushroom',
      primaryColor: '#e11d48',
      secondaryColor: '#fef3c7',
      auraColor: '#f472b6',
      effectType: 'chopper',
      powerSummary:
        'When eaten by a blue-nosed reindeer, it grants human intelligence, speech, and medical genius! By inventing the Rumble Ball, Chopper unlocked 7 transformations including Kung Fu Point and giant Monster Point.',
      weakness: 'Extended Monster Point transforms Chopper into a tiny pint-sized "Baby Geezer" while he rests!'
    },
    {
      id: 'suna-suna',
      name: 'Suna Suna no Mi',
      englishName: 'Sand-Sand Fruit',
      category: 'Logia',
      era: 'pre-timeskip',
      user: 'Sir Crocodile',
      characterId: 'crocodile',
      awakened: false,
      image: '/assets/fruits/suna-suna.jpg',
      sprite: '/assets/fruits/suna-suna.png',
      zukanShape: 'Spherical sandy-tan barrel cactus with two upward arms, S-swirl ribs & curled green T-stem (OP Mag Vol. 10)',
      shapeType: 'cactus',
      primaryColor: '#d97706',
      secondaryColor: '#fde68a',
      auraColor: '#fbbf24',
      effectType: 'sand',
      powerSummary:
        'Transforms the user into desert sand! Crocodile can whip up massive Desert Spada sand-blades, summon city-swallowing Sables tornadoes, and absorb every drop of moisture with his right hand.',
      weakness: 'Water or any liquid clumps the sand grains solid so punches can connect even without Haki!'
    },
    {
      id: 'mera-mera',
      name: 'Mera Mera no Mi',
      englishName: 'Flame-Flame Fruit',
      category: 'Logia',
      era: 'pre-timeskip',
      user: 'Portgas D. Ace',
      wanoUser: 'Portgas D. Ace → Inherited by Sabo!',
      characterId: 'ace',
      awakened: false,
      image: '/assets/fruits/mera-mera.jpg',
      sprite: '/assets/fruits/mera-mera.png',
      zukanShape: 'Blazing orange-gold round fruit of upward flame tongues each bearing a swirl & swirled green T-stem (Ch. 700 • OP Mag Vol. 1)',
      shapeType: 'flame',
      primaryColor: '#f97316',
      secondaryColor: '#facc15',
      auraColor: '#fb923c',
      effectType: 'fire',
      powerSummary:
        'An elemental Logia Devil Fruit that lets the user create, control, and transform into roaring fire — launching ship-smashing Fire Fists and miniature suns!',
      weakness: 'Seawater, Armament Haki, and even hotter volcanic Magma.'
    },
    {
      id: 'hana-hana',
      name: 'Hana Hana no Mi',
      englishName: 'Flower-Flower Fruit',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Nico Robin',
      characterId: 'robin',
      awakened: false,
      image: '/assets/fruits/hana-hana.jpg',
      sprite: '/assets/fruits/hana-hana.png',
      zukanShape: 'Multi-layered blooming rose-pink dahlia of swirl-marked petals with a curled green top T-stem (OP Mag Vol. 2)',
      shapeType: 'flower',
      primaryColor: '#ec4899',
      secondaryColor: '#fbcfe8',
      auraColor: '#f472b6',
      effectType: 'petals',
      powerSummary:
        'Sprouts copies of the user\'s limbs (arms, legs, eyes, ears, or giant clones!) like blooming pink flower petals on any surface within sight — no matter how fast the target moves!',
      weakness: 'Damage taken by sprouted limbs transfers back to the user\'s real body.'
    },
    {
      id: 'yomi-yomi',
      name: 'Yomi Yomi no Mi',
      englishName: 'Revive-Revive Fruit',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Soul King Brook',
      characterId: 'brook',
      awakened: false,
      image: '/assets/fruits/yomi-yomi.jpg',
      sprite: '/assets/fruits/yomi-yomi.png',
      zukanShape: 'Golden spherical fruit with S-swirls & four bottom tooth-like lobes forming a subtle skull silhouette (OP Mag Vol. 13)',
      shapeType: 'skull',
      primaryColor: '#eab308',
      secondaryColor: '#fef08a',
      auraColor: '#34d399',
      effectType: 'soul',
      powerSummary:
        'Grants the user\'s soul a second life! Brook can project his glowing soul through walls, reattach his own bones, and channel the icy chill of the Underworld into his cane sword.',
      weakness: 'Seawater and Sea Prism Stone drain his soul energy (though he\'s light enough to sprint on top of waves!).'
    },
    {
      id: 'ope-ope',
      name: 'Ope Ope no Mi',
      englishName: 'Op-Op Fruit ("Ultimate Devil Fruit")',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Trafalgar D. Water Law',
      characterId: 'law',
      awakened: true,
      image: '/assets/fruits/ope-ope.jpg',
      sprite: '/assets/fruits/ope-ope.png',
      zukanShape: 'Crimson strawberry-heart fruit covered in S-swirls with a tall spiral-curled top stem (Ch. 765 • OP Mag Vol. 3)',
      shapeType: 'heart',
      primaryColor: '#e11d48',
      secondaryColor: '#fda4af',
      auraColor: '#38bdf8',
      effectType: 'room',
      powerSummary:
        'Creates a blue spherical operating dome called "ROOM" where Law has total surgical control over space and gravity — swapping places ("Shambles!") and unleashing internal shockwaves!',
      weakness: 'Maintaining giant ROOMs drains stamina quickly; cannot teleport foes with overwhelmingly stronger Haki.'
    },
    {
      id: 'gura-gura',
      name: 'Gura Gura no Mi',
      englishName: 'Tremor-Tremor Fruit',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Whitebeard → Blackbeard',
      characterId: 'whitebeard',
      awakened: false,
      image: '/assets/fruits/gura-gura.jpg',
      sprite: '/assets/fruits/gura-gura.png',
      zukanShape: 'Cobalt-blue pear with upper S-swirls, quake-fractured fissured lower rind & curled green T-stem (OP Mag Vol. 8)',
      shapeType: 'pear',
      primaryColor: '#2563eb',
      secondaryColor: '#93c5fd',
      auraColor: '#60a5fa',
      effectType: 'quake',
      powerSummary:
        'Feared as the strongest Paramecia with the power to "destroy the world"! Punches visible glass-like cracks straight into the air, tilting seas and shaking entire islands.',
      weakness: 'Uncontrolled shockwaves can shake the user\'s own crewmates and ship.'
    },
    {
      id: 'yami-yami',
      name: 'Yami Yami no Mi',
      englishName: 'Dark-Dark Fruit',
      category: 'Logia (Unique)',
      era: 'pre-timeskip',
      user: 'Marshall D. Teach (Blackbeard)',
      characterId: 'blackbeard',
      awakened: false,
      image: '/assets/fruits/yami-yami.jpg',
      sprite: '/assets/fruits/yami-yami.png',
      zukanShape: 'Round violet cluster of spiky swirl-marked teardrop segments crowned with sprouting green leaves (Ch. 440 • OP Mag Vol. 5)',
      shapeType: 'pinecone',
      primaryColor: '#6d28d9',
      secondaryColor: '#c4b5fd',
      auraColor: '#7c3aed',
      effectType: 'darkness',
      powerSummary:
        'Commands infinite darkness and black-hole gravity! Most terrifying of all, grabbing another Devil Fruit user with "Black Vortex" completely switches off their Devil Fruit powers on touch!',
      weakness: 'Unlike other Logia fruits, attacks do NOT pass through Blackbeard — the darkness pulls hits in with double pain!'
    },
    {
      id: 'pika-pika',
      name: 'Pika Pika no Mi',
      englishName: 'Glint-Glint Fruit (Light)',
      category: 'Logia',
      era: 'pre-timeskip',
      user: 'Admiral Borsalino (Kizaru)',
      characterId: 'kizaru',
      awakened: false,
      image: '/assets/fruits/pika-pika.jpg',
      sprite: '/assets/fruits/pika-pika.png',
      zukanShape: 'Golden 5-pointed starfruit with S-swirls & curled green T-stem (Unrevealed in Manga — Zukan-Style Reconstruction)',
      shapeType: 'starfruit',
      primaryColor: '#facc15',
      secondaryColor: '#fef9c3',
      auraColor: '#fde047',
      effectType: 'light',
      powerSummary:
        'Transforms the user into pure photons of light! Grants lightspeed kicks, fingertip laser beams, a solid light-sword (Ama no Murakumo), and instant reflection travel via the Yata Mirror.',
      weakness: 'Light beams bounce in straight lines — Observation + Armament Haki masters like Rayleigh can intercept them!'
    },
    {
      id: 'hie-hie',
      name: 'Hie Hie no Mi',
      englishName: 'Ice-Ice Fruit (Chilly-Chilly)',
      category: 'Logia',
      era: 'pre-timeskip',
      user: 'Kuzan (Aokiji)',
      characterId: 'aokiji',
      awakened: false,
      image: '/assets/fruits/hie-hie.jpg',
      sprite: '/assets/fruits/hie-hie.png',
      zukanShape: 'Frost-cyan faceted crystalline melon with S-swirls & curled T-stem (Unrevealed in Manga — Zukan-Style Reconstruction)',
      shapeType: 'crystal',
      primaryColor: '#38bdf8',
      secondaryColor: '#e0f2fe',
      auraColor: '#7dd3fc',
      effectType: 'ice',
      powerSummary:
        'Turns the user into sub-zero ice! Aokiji never worries about falling into the ocean — he touches the water ("Ice Age!") and freezes miles of sea solid so he can ride his bicycle across the waves!',
      weakness: 'Volcanic magma and intense quake vibrations.'
    },
    {
      id: 'magu-magu',
      name: 'Magu Magu no Mi',
      englishName: 'Magma-Magma Fruit',
      category: 'Logia',
      era: 'pre-timeskip',
      user: 'Sakazuki (Akainu)',
      characterId: 'akainu',
      awakened: false,
      image: '/assets/fruits/magu-magu.jpg',
      sprite: '/assets/fruits/magu-magu.png',
      zukanShape: 'Craggy crimson-lava melon with glowing orange S-swirls & green T-stem (Unrevealed in Manga — Zukan-Style Reconstruction)',
      shapeType: 'magma',
      primaryColor: '#dc2626',
      secondaryColor: '#fb923c',
      auraColor: '#ef4444',
      effectType: 'magma',
      powerSummary:
        'Boasts top-tier offensive heat! Turns the user into molten volcanic rock that vaporizes giant icebergs in seconds and rains meteor volcanoes from the sky.',
      weakness: 'Supreme Conqueror\'s & Armament Haki blades (like Shanks\' Gryphon) can block magma punches cleanly.'
    },
    {
      id: 'tori-phoenix',
      name: 'Tori Tori no Mi, Model: Phoenix',
      englishName: 'Bird-Bird Fruit, Model: Phoenix',
      category: 'Zoan (Mythical)',
      era: 'pre-timeskip',
      user: 'Marco the Phoenix (Whitebeard 1st Div.)',
      characterId: 'whitebeard',
      awakened: false,
      image: '/assets/fruits/tori-phoenix.jpg',
      sprite: '/assets/fruits/tori-phoenix.png',
      zukanShape: 'Oval teal-green pineapple of prickly swirl-centered fruitlets crowned by cyan-gold phoenix-flame blades (OP Mag Vol. 20)',
      shapeType: 'pineapple',
      primaryColor: '#0d9488',
      secondaryColor: '#fde047',
      auraColor: '#22d3ee',
      effectType: 'phoenix',
      powerSummary:
        'Even rarer than a Logia! Wraps the user in mythical "Blue Flames of Resurrection" that aren\'t hot — instead they instantly regenerate injuries and warm allies!',
      weakness: 'Regenerating huge attacks drains stamina over long battles, and Sea Prism Stone cuffs block the flames.'
    },
    {
      id: 'ito-ito',
      name: 'Ito Ito no Mi',
      englishName: 'String-String Fruit',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Donquixote Doflamingo',
      characterId: 'doflamingo',
      awakened: true,
      image: '/assets/fruits/ito-ito.jpg',
      sprite: '/assets/fruits/ito-ito.png',
      zukanShape: 'Pale-lilac pear embedded all over with interlocking S-swirls & topped with a curly fuchsia stem (Ch. 782 • OP Mag Vol. 3)',
      shapeType: 'pear',
      primaryColor: '#e9d5ff',
      secondaryColor: '#c026d3',
      auraColor: '#ec4899',
      effectType: 'strings',
      powerSummary:
        'Generates razor-thin, nearly invisible strings! Doflamingo hooks strings onto clouds to "fly" across the ocean and puppeteer enemies from above.',
      wanoPowerSummary:
        'Generates razor-thin, nearly invisible strings! Doflamingo hooks strings onto clouds to "fly" across the ocean, creates an island-spanning Birdcage, and with Awakening turns entire stone buildings into giant waves of string!',
      weakness: 'Gear 4 Haki-compressed rubber elasticity can snap through even Awakened God Thread!'
    },
    {
      id: 'mochi-mochi',
      name: 'Mochi Mochi no Mi',
      englishName: 'Mochi-Mochi Fruit',
      category: 'Paramecia (Special)',
      era: 'wano',
      user: 'Charlotte Katakuri',
      characterId: 'katakuri',
      awakened: true,
      image: '/assets/fruits/mochi-mochi.jpg',
      sprite: '/assets/fruits/mochi-mochi.png',
      zukanShape: 'Single creamy-white swirl-patterned fruit pinching near the lower half into a puffed mochi base with curled green T-stem (OP Mag Vol. 4)',
      shapeType: 'mochi',
      primaryColor: '#fef3c7',
      secondaryColor: '#fffbeb',
      auraColor: '#e879f9',
      effectType: 'mochi',
      powerSummary:
        'The only known "Special Paramecia"! Creates and transforms into sticky rice-cake Mochi. Paired with Future Sight Haki, Katakuri opens holes in his mochi body before punches land!',
      weakness: 'Water or tea loosens sticky mochi traps.'
    },
    {
      id: 'uo-seiryu',
      name: 'Uo Uo no Mi, Model: Seiryu',
      englishName: 'Fish-Fish Fruit, Model: Azure Dragon',
      category: 'Zoan (Mythical)',
      era: 'wano',
      user: 'Emperor Kaido',
      characterId: 'kaido',
      awakened: false,
      image: '/assets/fruits/uo-seiryu.jpg',
      sprite: '/assets/fruits/uo-seiryu.png',
      zukanShape: 'Azure-blue dragon-scale pinecone with base spirals, crowned by orange leaves & purple/light-pink horn stems (Ch. 1096 • OP Mag Vol. 13)',
      shapeType: 'dragon',
      primaryColor: '#0284c7',
      secondaryColor: '#38bdf8',
      auraColor: '#60a5fa',
      effectType: 'dragon',
      powerSummary:
        'Transforms the user into a sky-filling Azure Dragon covered in armored scales, conjuring Flame Clouds to lift entire islands into the sky and firing mountain-melting Bolo Breath!',
      weakness: 'Internal Destruction Ryuo and Supreme King Conqueror\'s Coating pierce dragon scales.'
    },
    {
      id: 'inu-makami',
      name: 'Inu Inu no Mi, Model: Okuchi no Makami',
      englishName: 'Dog-Dog Fruit, Model: Wolf Deity',
      category: 'Zoan (Mythical)',
      era: 'wano',
      user: 'Yamato',
      characterId: 'yamato',
      awakened: false,
      image: '/assets/fruits/inu-makami.jpg',
      sprite: '/assets/fruits/inu-makami.png',
      zukanShape: 'Flattened orange persimmon with brownish calyx, upper fishhook swirls & left-curled light-orange T-stem (OP Mag Vol. 13)',
      shapeType: 'persimmon',
      primaryColor: '#ea580c',
      secondaryColor: '#fdba74',
      auraColor: '#2dd4bf',
      effectType: 'ice',
      powerSummary:
        'Wano\'s legendary Guardian Deity Mythical Zoan! Transforms Yamato into a sacred white-and-aqua wolf spirit firing Namuji Glacier Fang ice blasts strong enough to clash evenly with Kaido\'s Bolo Breath and coat herself in Mirror Mountain ice armor!',
      weakness: 'Standard Devil Fruit weakness to seawater and Sea Prism Stone handcuffs.'
    },
    {
      id: 'nikyu-nikyu',
      name: 'Nikyu Nikyu no Mi',
      englishName: 'Paw-Paw Fruit',
      category: 'Paramecia',
      era: 'pre-timeskip',
      user: 'Bartholomew Kuma',
      characterId: 'kuma',
      awakened: false,
      image: '/assets/fruits/nikyu-nikyu.jpg',
      sprite: '/assets/fruits/nikyu-nikyu.png',
      zukanShape: 'Flesh-pink swirl-patterned round fruit topped by three rounded lumps forming a 3-digit paw silhouette & middle curled T-stem (Ch. 1096)',
      shapeType: 'sphere',
      primaryColor: '#f472b6',
      secondaryColor: '#fbcfe8',
      auraColor: '#f472b6',
      effectType: 'paw',
      powerSummary:
        'Revealed in Chapter 1096 at God Valley! Grants fleshy paw pads on the user\'s palms capable of repelling ANYTHING at the speed of light — compressed air ("Ursus Shock"), incoming attacks, travelers across oceans for 3 days, and even intangible pain or memories into glowing paw bubbles!',
      weakness: 'If the user\'s palms cannot intercept an attack in time, their body can still be struck.'
    },
    {
      id: 'nomi-nomi',
      name: 'Nomi Nomi no Mi',
      englishName: 'Brain-Brain Fruit',
      category: 'Paramecia',
      era: 'egghead',
      user: 'Dr. Vegapunk ("Stella")',
      characterId: 'vegapunk',
      awakened: false,
      image: '/assets/fruits/nomi-nomi.jpg',
      sprite: '/assets/fruits/nomi-nomi.png',
      zukanShape: 'Coral-pink bi-lobed cerebral apple with brain-gyri S-swirls & curled green T-stem (Unrevealed in Manga — Zukan-Style Reconstruction)',
      shapeType: 'cloud',
      primaryColor: '#f43f5e',
      secondaryColor: '#fda4af',
      auraColor: '#38bdf8',
      effectType: 'brain',
      powerSummary:
        'Allows the user\'s brain to store an INFINITE amount of knowledge without ever forgetting a single detail! However, the physical brain grows larger with every book learned — growing so colossal that Dr. Vegapunk housed his giant brain inside Egghead\'s floating Punk Records dome and synced it via an apple antenna!',
      weakness: 'Grants zero innate superhuman strength — and makes your head grow as tall as a giant!'
    },
    {
      id: 'toshi-toshi',
      name: 'Toshi Toshi no Mi',
      englishName: 'Age-Age Fruit',
      category: 'Paramecia',
      era: 'egghead',
      user: 'Jewelry Bonney',
      characterId: 'bonney',
      awakened: false,
      image: '/assets/fruits/toshi-toshi.jpg',
      sprite: '/assets/fruits/toshi-toshi.png',
      zukanShape: 'Rose-magenta hourglass gourd covered in organic S-swirls & curled green T-stem (Unrevealed in Manga — Zukan-Style Reconstruction)',
      shapeType: 'pear',
      primaryColor: '#e11d48',
      secondaryColor: '#fda4af',
      auraColor: '#fb7185',
      effectType: 'nika-future',
      powerSummary:
        'Originally bestowed via Saturn\'s Devil Fruit extract experiment when Bonney was an infant! Lets Bonney freely age or de-age living beings and objects — and through "Distorted Future," temporarily transform herself into ANY possible future she truly believes in, including a white-haired Sun God Nika form alongside Luffy!',
      weakness: 'Age shifts on living foes wear off over time, and Distorted Future weakens if the user doubts that future.'
    }
  ];

  const loreTopics = [
    {
      id: 'oceans-and-all-blue',
      era: 'east-blue',
      title: 'How the Oceans, Red Line, Calm Belt & All Blue Work',
      badge: 'World Geography',
      icon: '🌊',
      summary:
        'The One Piece planet is divided like a giant puzzle globe with two ribbons crossing each other at 90-degree angles: the towering rock continent (Red Line) and the chaotic pirate sea (Grand Line).',
      steps: [
        {
          heading: '1. The 45° Diagonal "X" & The Four Blues (North, South, East, West)',
          detail:
            'Because the Red Line and Grand Line form a 45-degree diagonal "X" around the planet (try the "🧭 45° Manga X-Axis" button below the 3D Globe!), the remaining water forms four separate oceans sitting directly North, South, East, and West!'
        },
        {
          heading: '2. Reverse Mountain & The Calm Belts',
          detail:
            'Water from all 4 Blues rushes uphill through Reverse Mountain\'s 4 diagonal canals and plunges into the Grand Line! Meanwhile, windless Calm Belts infested with giant Sea Kings guard both sides of the Grand Line.'
        },
        {
          heading: "3. What is Sanji's Dream — The All Blue?",
          detail:
            'Chefs tell legends of a miraculous sea called the All Blue where fish from East, West, North, and South Blue all swim together! Reverse Mountain and Fish-Man Island are the exact points where all four currents converge!'
        }
      ]
    },
    {
      id: 'devil-fruit-rules',
      era: 'east-blue',
      title: 'The 3 Types of Devil Fruits & Sea Prism Stone',
      badge: 'Power System',
      icon: '🍎',
      summary:
        'Devil Fruits are swirl-patterned fruits that grant miraculous superpowers after a single terrible-tasting bite! Only ONE of each fruit can exist at a time — when its user passes on, the fruit reincarnates somewhere in the world.',
      steps: [
        {
          heading: '1. Paramecia (Superhuman & Quirky Powers)',
          detail:
            'The most common class! Grants wild body changes or abilities like Buggy splitting into floating pieces, Robin blooming extra arms, or Whitebeard shaking the air.'
        },
        {
          heading: '2. Zoan (Animal Transformations — Normal, Ancient & Mythical)',
          detail:
            'Transforms the user into an animal plus a human-animal hybrid! Ancient Zoans turn into prehistoric dinosaurs, while super-rare Mythical Zoans turn into legends of myth!'
        },
        {
          heading: '3. Logia (Forces of Nature) & The Curse of the Sea',
          detail:
            'Turns the user into a natural element (Sand, Fire, Ice, Light, Magma)! However, ALL Devil Fruit users sink like hammers in deep water, and Sea Prism Stone (Kairoseki) emits the same energy as the ocean to lock their powers!'
        }
      ]
    },
    {
      id: 'haki-system',
      era: 'pre-timeskip',
      title: "Haki Explained: Observation, Armament & Conqueror's!",
      badge: 'Haki Dojo',
      icon: '⚡',
      summary:
        'Unlike Devil Fruits, Haki ("Ambition / Willpower") is a spiritual energy sleeping inside EVERY living creature! Through training and courageous battles, fighters awaken two main types — and 1 in several million are born with a third!',
      steps: [
        {
          heading: '1. Observation Haki (Kenbunshoku — "Mantra" in Skypiea)',
          detail:
            'Lets you sense hidden enemies, emotions, and incoming attacks even blindfolded! At its highest level (Future Sight), masters can see several seconds into the future!'
        },
        {
          heading: '2. Armament Haki (Busoshoku)',
          detail:
            'Turns your willpower into invisible or jet-black armor that boosts strikes and lets you grab intangible Logia Devil Fruit users like Fire, Light, or Sand!'
        },
        {
          heading: "3. Conqueror's Haki (Haoshoku — Color of the Supreme King)",
          detail:
            'Only those born with the spirit of a King possess it! A burst of willpower knocks out armies without touching them, and top legends clash hard enough to split the clouds in half!'
        }
      ]
    },
    {
      id: 'what-is-one-piece',
      era: 'wano',
      title: 'What is the One Piece & How Do You Reach Laugh Tale?',
      badge: 'Core Mystery',
      icon: '👑',
      summary:
        'The "One Piece" is a real, physical treasure left on the final island Laugh Tale by Joy Boy 800 years ago and discovered by Gol D. Roger! Creator Eiichiro Oda confirmed it is an actual treasure tied to the Void Century and the Will of D.',
      steps: [
        {
          heading: "1. Why Log Poses Stop at Lodestar Island",
          detail:
            'Following a Log Pose to the end of the New World leads to Lodestar Island (the 2nd-to-last island). There pirates learn that one final hidden island exists — Laugh Tale — and no compass can point to it!'
        },
        {
          heading: '2. The 4 Crimson Road Poneglyphs',
          detail:
            'Out of 30 indestructible Poneglyph stones, 4 are bright red Road Poneglyphs. Each reveals one coordinate; drawing lines between all 4 coordinates forms a giant X whose center is Laugh Tale!'
        },
        {
          heading: '3. Where Are the 4 Stones?',
          detail:
            '• Stone #1: Inside the Whale Tree on Zou (Zunesha)\n• Stone #2: Big Mom\'s vault on Whole Cake Island (copied by Brook!)\n• Stone #3: Deep beneath Mt. Fuji in Old Wano\n• Stone #4: Mysterious final stone (rumored with the "Man Marked by Flames")!'
        }
      ]
    },
    {
      id: 'three-ancient-weapons',
      era: 'wano',
      title: 'The Three Ancient Weapons: Pluton, Poseidon & Uranus!',
      badge: 'Void Century Lore',
      icon: '🔱',
      summary:
        'Handed down from the Void Century 800 years ago and recorded on the Poneglyphs, three world-shaking powers named after ancient gods can reshape entire oceans and islands!',
      steps: [
        {
          heading: '1. PLUTON (The Ancient Super-Battleship Under Old Wano)',
          detail:
            'Built in Water 7 during the Void Century (whose counter-blueprints Franky memorized and burned at Enies Lobby!). The Alabasta Poneglyph revealed that Pluton sleeps deep beneath submerged Old Wano under Mt. Fuji — unleashed only if Wano\'s outer walls are torn down!'
        },
        {
          heading: '2. POSEIDON (Mermaid Princess Shirahoshi & The Sea Kings)',
          detail:
            'Revealed on the Skypiea Golden Bell Poneglyph and confirmed at Fish-Man Island: Poseidon isn\'t a machine, but a living Mermaid Princess born once every few centuries who can speak with and command the colossal Sea Kings ("Noah\'s Ark" promise to Joy Boy)!'
        },
        {
          heading: '3. URANUS (The Sky-Borne God Weapon)',
          detail:
            'First named by King Neptune on Fish-Man Island as the third Ancient Weapon alongside Pluton and Poseidon — tied to the skies and the deepest secrets of the World Government!'
        }
      ]
    },
    {
      id: 'den-den-vivre-kairoseki',
      era: 'pre-timeskip',
      title: 'Grand Line Science: Den Den Mushi, Vivre Cards & Sea Prism Stone',
      badge: 'Navigator Tech',
      icon: '🐌',
      summary:
        'How do pirates talk across oceans without satellites, track crewmates without GPS, or cage Logia Devil Fruit users? With three iconic Grand Line wonders!',
      steps: [
        {
          heading: '1. Den Den Mushi (Telepathic Transponder Snails!)',
          detail:
            'Wild snails that naturally communicate via telepathic radio waves ("Puru puru puru... Gacha!")! When speaking, a Den Den Mushi mimics the caller\'s exact facial expressions, mustache, sunglasses, and even crying!'
        },
        {
          heading: '2. Vivre Cards (The Paper of Life)',
          detail:
            'Crafted in the New World from a person\'s fingernail clippings! Completely waterproof and fireproof, a torn piece always slides gently toward its owner\'s main card — and shrinks/smolders if their life force is in danger!'
        },
        {
          heading: '3. Sea Prism Stone (Kairoseki — Solidified Sea Energy)',
          detail:
            'Originating in Wano Country and as hard as diamond! Emits the exact same wavelength as the ocean: touching it drains Devil Fruit users\' strength, while lining Marine warship hulls hides ships from Calm Belt Sea Kings!'
        }
      ]
    },
    {
      id: 'vegapunk-sinking-world',
      era: 'egghead',
      title: 'Dr. Vegapunk\'s Egghead Broadcast: Why the World Is Sinking 200m!',
      badge: 'Final Saga Revelation',
      icon: '📡',
      summary:
        'Transmitted from Iron Giant Emeth\'s hidden Visual Den Den Mushi on Egghead, Dr. Vegapunk revealed the breathtaking truth connecting Joy Boy, the Four Blues, and the Void Century!',
      steps: [
        {
          heading: '1. Joy Boy: The Very First Pirate (900–800 Years Ago)',
          detail:
            'Born in a dazzlingly advanced Ancient Kingdom during the Void Century, Joy Boy possessed the stretching power of Sun God Nika and sailed the seas as history\'s very first pirate — opposing the 20 Allied Kingdoms that became today\'s World Government!'
        },
        {
          heading: '2. The 200-Meter Cataclysm & Ancient Continents Underwater!',
          detail:
            'During the 100-year war of the Void Century, Ancient Weapons caused global sea levels to rise by 200 METERS! Today\'s scattered islands are actually just the surviving mountain peaks of drowned ancient continents!'
        },
        {
          heading: '3. The Mother Flame & Who Claims the One Piece',
          detail:
            'After Lulusia\'s destruction raised global sea levels by another 1 meter and triggered worldwide earthquakes, Vegapunk declared before the entire planet: the fate of the world will hinge on WHO finds the One Piece!'
        }
      ]
    }
  ];

  const quizQuestions = [
    {
      era: 'east-blue',
      question: "Why don't normal magnetic compasses work inside the Grand Line?",
      options: [
        'Every Grand Line island has powerful magnetic minerals that pull needles wildly, so sailors need a Log Pose!',
        'Sea Kings eat all metal compasses at Reverse Mountain.',
        'Devil Fruits turn compass needles into rubber.',
        'There is no North Blue in One Piece.'
      ],
      correctIndex: 0,
      explanation:
        "Correct! Each Grand Line island generates strong magnetic waves, so Nami uses a wrist Log Pose to lock onto the next island's pull!"
    },
    {
      era: 'east-blue',
      question: 'How do pirates from East, West, North, and South Blue enter the start of the Grand Line?',
      options: [
        'By climbing straight over the 10,000m Red Line with ladders',
        'By riding uphill ocean currents up Reverse Mountain\'s 4 diagonal canals!',
        'By taking a submarine under Dawn Island',
        'By flying on giant seagulls'
      ],
      correctIndex: 1,
      explanation:
        'Nailed it! Currents from all four Blues rush UPHILL to the peak of Reverse Mountain and shoot down a 5th canal into Twin Capes!'
    },
    {
      era: 'east-blue',
      question: 'Why couldn\'t World\'s Greatest Swordsman Dracule Mihawk hurt Buggy the Clown by slicing him?',
      options: [
        'Buggy wore invisible diamond armor',
        'Buggy\'s Chop-Chop Fruit (Bara Bara no Mi) lets his body split harmlessly into floating pieces whenever sliced!',
        'Buggy moved faster than light',
        'Mihawk used a wooden sword'
      ],
      correctIndex: 1,
      explanation:
        'Flashy answer! Because Buggy is a Splitting Human, even the sharpest sword slash in the world just separates him into floating segments!'
    },
    {
      era: 'pre-timeskip',
      question: 'How did Luffy manage to punch Sir Crocodile\'s intangible Sand-Sand Logia body in Alabasta before learning Haki?',
      options: [
        'By wetting his fists with water so the sand grains clumped solid!',
        'By blowing the sand away with a giant fan',
        'By freezing him with Aokiji\'s bicycle',
        'By throwing Pop Greens'
      ],
      correctIndex: 0,
      explanation:
        'Smart thinking! Liquid makes dry sand clump together, letting Luffy land his Gum-Gum Storm!'
    },
    {
      era: 'pre-timeskip',
      question: 'How do Marine warships safely sail across the windless Calm Belt without being attacked by giant Sea Kings?',
      options: [
        'They line the bottom of their hulls with Sea Prism Stone (Kairoseki) so Sea Kings only sense the ocean above them!',
        'They paint giant eyes on the sails',
        'They tow Laboon in front of the fleet',
        'They wait for winter snow'
      ],
      correctIndex: 0,
      explanation:
        'Awesome job! Dr. Vegapunk lined Marine hulls with Sea Prism Stone, camouflaging warships from the monsters below!'
    },
    {
      era: 'pre-timeskip',
      question: 'How does sunlight reach Fish-Man Island 10,000 meters underwater beneath the Red Line?',
      options: [
        'Giant electric spotlights built by Franky',
        'Through the giant roots of Sunlight Tree Eve, which carries light all the way down from Sabaody!',
        'Admiral Kizaru shines lasers down every morning',
        'Volcanoes on the seafloor'
      ],
      correctIndex: 1,
      explanation:
        'Spot on! Sunlight Tree Eve absorbs sunlight at the surface and channels both light and air into Fish-Man Island\'s deep-sea bubble!'
    },
    {
      era: 'pre-timeskip',
      question: 'Which type of Haki acts like spiritual armor and lets a fighter grab or strike fluid Logia Devil Fruit users?',
      options: [
        'Observation Haki (Kenbunshoku)',
        'Armament Haki (Busoshoku)',
        'Rumble Ball Wavelength',
        'Mirage Tempo'
      ],
      correctIndex: 1,
      explanation:
        'Bullseye! Armament Haki coats your body or weapon in willpower armor capable of hitting any Logia user\'s real body!'
    },
    {
      era: 'wano',
      question: 'How many crimson Road Poneglyphs do you need to read to pinpoint the exact coordinates of Laugh Tale?',
      options: [
        'Just 1 stone at Marineford',
        '4 crimson Road Poneglyphs — where their 4 coordinates cross in an X!',
        '7 golden bells in Skypiea',
        '100 Wanted Posters'
      ],
      correctIndex: 1,
      explanation:
        'Exact! Four red Road Poneglyphs each mark one coordinate; their intersection reveals Laugh Tale!'
    },
    {
      era: 'wano',
      question: 'Why can\'t a Log Pose ever point to the island of Zou in the New World?',
      options: [
        'Zou is invisible under a Mirage Tempo',
        'Zou is carried on the back of Zunesha, a living 1,000-year-old giant elephant constantly walking across the sea!',
        'Zou floats at +20,000 meters in space',
        'Doflamingo cut its magnetic field'
      ],
      correctIndex: 1,
      explanation:
        'Yes! Because Zunesha is a living creature rather than a mineral landmass, Zou has no magnetic field — you need a Vivre Card to find it!'
    },
    {
      era: 'wano',
      question: "What did Gol D. Roger, Rayleigh, and Kozuki Oden do when they finally read Joy Boy's story on the last island?",
      options: [
        'They cried for 100 days',
        'They burst out laughing together and named the final island "Laugh Tale"!',
        'They sank the Oro Jackson',
        'They built Reverse Mountain'
      ],
      correctIndex: 1,
      explanation:
        'You got it! Roger laughed with pure joy at Joy Boy\'s 800-year-old tale and named the final island "Laugh Tale"!'
    },
    {
      era: 'pre-timeskip',
      question: 'What legendary wood and secret fuel power the Thousand Sunny\'s 1-kilometer Coup de Burst jump?',
      options: [
        'Yarukiman Mangrove wood and jet kerosene',
        'Treasure Tree Adam wood and 3 giant barrels of fizzy COLA!',
        'Sunlight Tree Eve bark and hot soup',
        'Wapometal iron and Rumble Balls'
      ],
      correctIndex: 1,
      explanation:
        'SUUUUPER! Franky built the Thousand Sunny from indestructible Treasure Tree Adam wood and fueled its Coup de Burst rocket with 3 barrels of cola!'
    },
    {
      era: 'egghead',
      question: 'In Dr. Vegapunk\'s global broadcast from Egghead, what shocking secret did he reveal about the One Piece world\'s oceans?',
      options: [
        'Sea levels rose 200 METERS during the Void Century war — today\'s islands are the mountaintops of drowned ancient continents!',
        'The Four Blues are made of sweet soda',
        'Skypiea used to be underwater beneath Impel Down',
        'Reverse Mountain was built yesterday by Buggy'
      ],
      correctIndex: 0,
      explanation:
        'Quasar-level genius! Vegapunk revealed that Ancient Weapons raised global sea levels by 200 meters during the Void Century, submerging entire ancient continents!'
    }
  ];

  const payload = { devilFruits, loreTopics, quizQuestions };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_FRUITS_AND_LORE = payload;
})(typeof window !== 'undefined' ? window : globalThis);
