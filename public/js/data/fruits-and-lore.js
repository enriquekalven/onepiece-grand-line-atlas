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
      shapeType: 'sphere',
      primaryColor: '#a855f7',
      secondaryColor: '#f8fafc',
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
      shapeType: 'pear',
      primaryColor: '#ec4899',
      secondaryColor: '#38bdf8',
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
      shapeType: 'cloud',
      primaryColor: '#e11d48',
      secondaryColor: '#fde68a',
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
      shapeType: 'pear',
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
      shapeType: 'sphere',
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
      shapeType: 'sphere',
      primaryColor: '#eab308',
      secondaryColor: '#a855f7',
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
      shapeType: 'pear',
      primaryColor: '#cbd5e1',
      secondaryColor: '#38bdf8',
      auraColor: '#e2e8f0',
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
      shapeType: 'pear',
      primaryColor: '#4c1d95',
      secondaryColor: '#a855f7',
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
      shapeType: 'flame',
      primaryColor: '#facc15',
      secondaryColor: '#fef08a',
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
      shapeType: 'pear',
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
      shapeType: 'flame',
      primaryColor: '#dc2626',
      secondaryColor: '#f97316',
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
      user: 'Marco the Phoenix',
      characterId: 'whitebeard',
      awakened: false,
      shapeType: 'flame',
      primaryColor: '#06b6d4',
      secondaryColor: '#facc15',
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
      era: 'wano',
      user: 'Donquixote Doflamingo',
      characterId: 'doflamingo',
      awakened: true,
      shapeType: 'pear',
      primaryColor: '#f472b6',
      secondaryColor: '#f8fafc',
      auraColor: '#ec4899',
      effectType: 'strings',
      powerSummary:
        'Generates razor-thin, nearly invisible strings! Doflamingo hooks strings onto clouds to "fly" across the ocean, creates an indestructible Birdcage, and with Awakening turns entire stone buildings into giant waves of string!',
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
      shapeType: 'pear',
      primaryColor: '#f472b6',
      secondaryColor: '#fdf2f8',
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
      shapeType: 'flame',
      primaryColor: '#e0f2fe',
      secondaryColor: '#2dd4bf',
      auraColor: '#38bdf8',
      effectType: 'ice',
      powerSummary:
        'Wano\'s legendary Guardian Deity Mythical Zoan! Transforms Yamato into a sacred white-and-aqua wolf spirit firing Namuji Glacier Fang ice blasts strong enough to clash evenly with Kaido\'s Bolo Breath and coat herself in Mirror Mountain ice armor!',
      weakness: 'Standard Devil Fruit weakness to seawater and Sea Prism Stone handcuffs.'
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
            '• Stone #1: Inside the Whale Tree on Zou (Zunesha)\n• Stone #2: Big Mom\'s vault on Whole Cake Island (copied by Brook!)\n• Stone #3: Deep beneath Mt. Fuji in Old Wano\n• Stone #4: Mysterious final stone!'
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
    }
  ];

  const payload = { devilFruits, loreTopics, quizQuestions };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_FRUITS_AND_LORE = payload;
})(typeof window !== 'undefined' ? window : globalThis);
