/**
 * Grand Line 3D Portal — 30 Canonical Characters with Anime Portraits, Era-Safe Snapshots & Bounty History!
 * Every East Blue / Pre-Timeskip character carries eraSnapshots so Spoiler Shield NEVER leaks Wano bounties or Gear 5!
 */

'use strict';

(function (root) {
  const characters = [
    {
      id: 'luffy',
      name: 'Monkey D. Luffy',
      epithet: '"Straw Hat" Luffy — Emperor of the Sea',
      faction: 'Straw Hat Pirates',
      crewSlot: 'captain',
      role: 'Captain',
      era: 'east-blue',
      image: '/assets/characters/luffy.jpg',
      altImage: '/assets/characters/luffy-gear5.jpg',
      bounty: 3000000000,
      bountyText: '3,000,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'East Blue (Arlong Park)', bounty: 30000000, text: '30,000,000' },
        { era: 'pre-timeskip', label: 'Alabasta (Beat Crocodile)', bounty: 100000000, text: '100,000,000' },
        { era: 'pre-timeskip', label: 'Enies Lobby (Gear 2 & 3)', bounty: 300000000, text: '300,000,000' },
        { era: 'pre-timeskip', label: 'Post-Marineford', bounty: 400000000, text: '400,000,000' },
        { era: 'wano', label: 'Dressrosa (Gear 4)', bounty: 500000000, text: '500,000,000' },
        { era: 'wano', label: 'Whole Cake ("5th Emperor")', bounty: 1500000000, text: '1,500,000,000' },
        { era: 'wano', label: 'Wano (Gear 5 Yonko!)', bounty: 3000000000, text: '3,000,000,000' }
      ],
      tier: 'Yonko / Emperor',
      powerScore: 97,
      accentColor: '#ef4444',
      devilFruit: 'Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika — Awakened Mythical Zoan)',
      haki: [
        { name: 'Observation (Future Sight)', advanced: true },
        { name: 'Armament (Internal Destruction Ryuo)', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 98, speed: 97, durability: 99, haki: 97, devilFruit: 100, battleIQ: 94 },
      signatureMoves: [
        'Gear 5: Bajrang Gun (Island-Sized Fist!)',
        'Gear 4: Snakeman — King Cobra',
        'Gum-Gum Red Roc (Ryuo Flame Fist)',
        'Gear 5: Gum-Gum Lightning'
      ],
      kidBio:
        'The cheerful, meat-loving captain of the Straw Hat Pirates whose dream is to find the One Piece and become the freest person on the seas! Starting in a wooden barrel, Luffy mastered all three Advanced forms of Haki and awakened Gear 5 in Wano Country, fighting with pure joy and imagination!',
      eraSnapshots: {
        'east-blue': {
          epithet: '"Straw Hat" Luffy — East Blue Rookie',
          bounty: 30000000,
          bountyText: '30,000,000',
          tier: 'East Blue Champion',
          powerScore: 68,
          devilFruit: 'Gomu Gomu no Mi (Gum-Gum Fruit — Paramecia Rubber Boy)',
          haki: [],
          stats: { strength: 76, speed: 72, durability: 80, haki: 20, devilFruit: 72, battleIQ: 78 },
          signatureMoves: ['Gum-Gum Pistol!', 'Gum-Gum Bazooka!', 'Gum-Gum Battle Axe (Smashed Arlong Park!)'],
          kidBio:
            '17-year-old rubber boy from Windmill Village wearing Red-Haired Shanks\' prized Straw Hat! After defeating Buggy, Don Krieg, and Arlong, Luffy earned East Blue\'s highest bounty of 30,000,000 Berries!'
        },
        'pre-timeskip': {
          epithet: '"Straw Hat" Luffy — Supernova Captain',
          bounty: 400000000,
          bountyText: '400,000,000',
          tier: 'Supernova Ace',
          powerScore: 81,
          devilFruit: 'Gomu Gomu no Mi (Gum-Gum Fruit — Gear 2 & Gear 3!)',
          haki: [{ name: "Conqueror's Haki (Unconscious Burst!)", advanced: false }],
          stats: { strength: 85, speed: 88, durability: 86, haki: 55, devilFruit: 84, battleIQ: 86 },
          signatureMoves: ['Gear 2: Gum-Gum Jet Gatling!', 'Gear 3: Giant Pistol!', 'Gum-Gum Storm'],
          kidBio:
            'After toppling Crocodile, Enel, and Rob Lucci, Luffy stormed Enies Lobby, Impel Down, and Marineford — pushing his rubber body with supersonic Gear 2 and giant-bone Gear 3!'
        }
      }
    },
    {
      id: 'zoro',
      name: 'Roronoa Zoro',
      epithet: '"Pirate Hunter" Zoro — King of Hell',
      faction: 'Straw Hat Pirates',
      crewSlot: 'first-mate',
      role: 'Swordsman (Three-Sword Style)',
      era: 'east-blue',
      image: '/assets/characters/zoro.jpg',
      bounty: 1111000000,
      bountyText: '1,111,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'East Blue Debut', bounty: 0, text: 'Pirate Hunter (Pre-Bounty)' },
        { era: 'pre-timeskip', label: 'Alabasta (Cut Steel!)', bounty: 60000000, text: '60,000,000' },
        { era: 'pre-timeskip', label: 'Enies Lobby (Ashura)', bounty: 120000000, text: '120,000,000' },
        { era: 'wano', label: 'Dressrosa (Sliced Pica!)', bounty: 320000000, text: '320,000,000' },
        { era: 'wano', label: 'Wano (Beat King!)', bounty: 1111000000, text: '1,111,000,000' }
      ],
      tier: '1st Commander+',
      powerScore: 91,
      accentColor: '#22c55e',
      devilFruit: 'None — Pure Three-Sword Style & Supreme Haki!',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament (Enma Flow)', advanced: true },
        { name: "Conqueror's (King of Hell Coating)", advanced: true }
      ],
      stats: { strength: 95, speed: 89, durability: 96, haki: 93, devilFruit: 88, battleIQ: 90 },
      signatureMoves: [
        'King of Hell: 103 Mercies Dragon Damnation',
        "Nine-Sword Style: Ashura — Dead Man's Game",
        'Billion-Fold World Trichiliocosm'
      ],
      kidBio:
        "Luffy's first crewmate and master of Three-Sword Style! Zoro promised Kuina he would surpass Dracule Mihawk as the World's Greatest Swordsman — even if he gets lost walking down a straight hallway!",
      eraSnapshots: {
        'east-blue': {
          epithet: '"Pirate Hunter" Zoro',
          bounty: 0,
          bountyText: 'Feared Across East Blue!',
          tier: 'East Blue Ace',
          powerScore: 66,
          haki: [],
          stats: { strength: 76, speed: 72, durability: 79, haki: 25, devilFruit: 70, battleIQ: 75 },
          signatureMoves: ['Oni Giri (Demon Slash!)', 'Three Thousand Worlds', 'Tatsu Maki (Dragon Twister)'],
          kidBio:
            'Wielding three katanas at once (one in his teeth!), Zoro challenged Hawk-Eyes Mihawk at Baratie and vowed never to lose again until he becomes the Greatest Swordsman!'
        },
        'pre-timeskip': {
          epithet: '"Pirate Hunter" Zoro — Supernova Swordsman',
          bounty: 120000000,
          bountyText: '120,000,000',
          tier: 'Supernova Ace',
          powerScore: 79,
          haki: [],
          stats: { strength: 84, speed: 81, durability: 90, haki: 50, devilFruit: 80, battleIQ: 82 },
          signatureMoves: ['Lion\'s Song (Cuts Solid Steel!)', 'Nine-Sword Style: Ashura', '108 Pound Phoenix'],
          kidBio:
            'Learned to slice solid steel in Alabasta, unlocked Nine-Sword Style Ashura at Enies Lobby, and heroically endured all of Luffy\'s battle fatigue at Thriller Bark ("Nothing happened!").'
        }
      }
    },
    {
      id: 'sanji',
      name: 'Vinsmoke Sanji',
      epithet: '"Black Leg" Sanji',
      faction: 'Straw Hat Pirates',
      crewSlot: 'cook-doctor',
      role: 'Cook & Aerial Martial Artist',
      era: 'east-blue',
      image: '/assets/characters/sanji.jpg',
      bounty: 1032000000,
      bountyText: '1,032,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'Baratie Sous-Chef', bounty: 0, text: 'Sous-Chef (Pre-Bounty)' },
        { era: 'pre-timeskip', label: 'Enies Lobby (Drawn Sketch!)', bounty: 77000000, text: '77,000,000 (Hand-Drawn Sketch!)' },
        { era: 'wano', label: 'Dressrosa (ONLY ALIVE!)', bounty: 177000000, text: '177,000,000', condition: 'ONLY ALIVE' },
        { era: 'wano', label: 'Whole Cake Island', bounty: 330000000, text: '330,000,000' },
        { era: 'wano', label: 'Wano (Ifrit Jambe!)', bounty: 1032000000, text: '1,032,000,000' }
      ],
      tier: '1st Commander+',
      powerScore: 89,
      accentColor: '#3b82f6',
      devilFruit: 'None — Awakened Exoskeleton & Blue-Flame Kicks!',
      haki: [
        { name: 'Observation (Elite Radar)', advanced: false },
        { name: 'Armament Haki', advanced: false }
      ],
      stats: { strength: 90, speed: 97, durability: 93, haki: 85, devilFruit: 86, battleIQ: 92 },
      signatureMoves: [
        'Ifrit Jambe: Boeuf Burst (Blue Lightning Flames!)',
        'Diable Jambe: Flambage Shot',
        'Sky Walk (Supersonic Air Kicks)'
      ],
      kidBio:
        "The Straw Hats' world-class chef who fights strictly with kicks to protect his cooking hands! In Wano he ignited blue-hot Ifrit Jambe flames, and his lifelong dream is finding the All Blue!",
      eraSnapshots: {
        'east-blue': {
          name: 'Sanji',
          bounty: 0,
          bountyText: 'Baratie Fighting Chef',
          tier: 'East Blue Ace',
          powerScore: 64,
          devilFruit: 'None — Red-Leg Zeff\'s Black Leg Kick Style!',
          haki: [],
          stats: { strength: 72, speed: 76, durability: 70, haki: 20, devilFruit: 68, battleIQ: 82 },
          signatureMoves: ['Mouton Shot!', 'Collier Strike', 'Anti-Manner Kick Course'],
          kidBio:
            'Trained under Red-Leg Zeff aboard the ocean restaurant Baratie! Sanji joins Luffy so he can find the legendary All Blue ocean where fish from every sea swim together.'
        },
        'pre-timeskip': {
          name: 'Sanji',
          bounty: 77000000,
          bountyText: '77,000,000 (Hilarious Hand-Drawn Poster!)',
          tier: 'Grand Line Officer',
          powerScore: 77,
          devilFruit: 'None — Blazing Diable Jambe Friction Kicks!',
          haki: [],
          stats: { strength: 80, speed: 84, durability: 78, haki: 42, devilFruit: 76, battleIQ: 89 },
          signatureMoves: ['Diable Jambe: Flambage Shot!', 'Concassé', 'Mr. Prince Tactical Sabotage'],
          kidBio:
            'Outsmarted Crocodile as "Mr. Prince" in Alabasta, sabotaged Enel\'s flying ark Maxim, and spun fast enough at Enies Lobby to ignite his leg into blazing Diable Jambe!'
        }
      }
    },
    {
      id: 'nami',
      name: 'Nami',
      epithet: '"Cat Burglar" Nami',
      faction: 'Straw Hat Pirates',
      crewSlot: 'navigator',
      role: 'Navigator',
      era: 'east-blue',
      image: '/assets/characters/nami.jpg',
      bounty: 366000000,
      bountyText: '366,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'Cocoyasi Cartographer', bounty: 0, text: '0 (Navigator)' },
        { era: 'pre-timeskip', label: 'Enies Lobby', bounty: 16000000, text: '16,000,000' },
        { era: 'wano', label: 'Dressrosa', bounty: 66000000, text: '66,000,000' },
        { era: 'wano', label: 'Wano (With Zeus!)', bounty: 366000000, text: '366,000,000' }
      ],
      tier: 'Yonko Officer',
      powerScore: 79,
      accentColor: '#f97316',
      devilFruit: 'None — Sorcery Clima-Tact + Zeus (Emperor Thundercloud)!',
      haki: [],
      stats: { strength: 66, speed: 78, durability: 70, haki: 65, devilFruit: 91, battleIQ: 96 },
      signatureMoves: [
        'Zeus Breeze Tempo: Homing Lightning!',
        'Mirage Tempo (Optical Invisibility)',
        'Thunderbolt Tempo'
      ],
      kidBio:
        'The genius navigator whose dream is to draw a map of the entire world! In Wano, thundercloud homie Zeus fused with her Sorcery Clima-Tact for homing lightning strikes!',
      eraSnapshots: {
        'east-blue': {
          bounty: 0,
          bountyText: 'Straw Hat Navigator',
          tier: 'Master Navigator',
          powerScore: 55,
          devilFruit: 'None — Weather Prediction & Bo-Staff Skills!',
          signatureMoves: ['Cyclone Weather Prediction', 'Three-Section Collapsible Bo Staff'],
          kidBio:
            'Freed from Arlong\'s map-room by Luffy! Nami can predict freak storms just by feeling the breeze on her skin and sets sail to chart the whole planet.'
        },
        'pre-timeskip': {
          bounty: 16000000,
          bountyText: '16,000,000',
          tier: 'Grand Line Officer',
          powerScore: 68,
          devilFruit: 'None — Skypiea Dial-Powered Perfect Clima-Tact!',
          signatureMoves: ['Thunderbolt Tempo!', 'Mirage Tempo: Fata Morgana', 'Cyclone Tempo'],
          kidBio:
            'Using Usopp\'s Clima-Tact upgraded with Skypiea Weather Dials, Nami conjures real indoor thunderclouds and optical mirages to defeat CP9\'s Kalifa!'
        }
      }
    },
    {
      id: 'usopp',
      name: 'Usopp',
      epithet: '"God" Usopp — King of Snipers',
      faction: 'Straw Hat Pirates',
      crewSlot: 'navigator',
      role: 'Sniper',
      era: 'east-blue',
      image: '/assets/characters/usopp.jpg',
      bounty: 500000000,
      bountyText: '500,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'Syrup Village Marksman', bounty: 0, text: '0 (Brave Warrior)' },
        { era: 'pre-timeskip', label: 'Enies Lobby ("Sogeking"!)', bounty: 30000000, text: '30,000,000' },
        { era: 'wano', label: 'Dressrosa ("God" Usopp!)', bounty: 200000000, text: '200,000,000' },
        { era: 'wano', label: 'Post-Wano', bounty: 500000000, text: '500,000,000' }
      ],
      tier: 'Grand Line Hero',
      powerScore: 74,
      accentColor: '#eab308',
      devilFruit: 'None — Pop Green Botanical Slingshot Mastery!',
      haki: [{ name: 'Observation Haki (Long-Range Aura Sight)', advanced: false }],
      stats: { strength: 64, speed: 75, durability: 78, haki: 76, devilFruit: 80, battleIQ: 92 },
      signatureMoves: [
        'Green Star: Skull Exploding Grass',
        'Green Star: Impact Wolf',
        'Bagworm: Mile-Long Haki Snipe!'
      ],
      kidBio:
        'Even when scared, Usopp stands tall whenever his friends\' dreams are mocked! Armed with Pop Green plants and Observation Haki awakened on Dressrosa, he aims to become a brave warrior of the sea!',
      eraSnapshots: {
        'east-blue': {
          epithet: 'Sharpshooter Usopp',
          bounty: 0,
          bountyText: 'Back-of-Luffy\'s-Head Cameo!',
          tier: 'East Blue Marksman',
          powerScore: 54,
          devilFruit: 'None — Trick Slingshot & Tabasco Star!',
          haki: [],
          signatureMoves: ['Firebird Star', 'Exploding Star', 'Usopp Pound Hammer!'],
          kidBio:
            'Son of Red-Hair Pirate sniper Yasopp! Usopp defended Syrup Village to earn the Going Merry and defeated Fish-Man officer Chew with clever tricks and courage.'
        },
        'pre-timeskip': {
          epithet: '"Sogeking" — King of Snipers!',
          bounty: 30000000,
          bountyText: '30,000,000 (Wanted as Sogeking!)',
          tier: 'Grand Line Sniper',
          powerScore: 67,
          devilFruit: 'None — Giant Kabuto Slingshot & Impact Dial!',
          haki: [],
          signatureMoves: ['Firebird Star (Shot Down Enies Lobby Flag!)', 'Atlas Comet', 'Impact Dial Recoil'],
          kidBio:
            'Donning the golden mask of Sniper King from Sniper Island, Usopp sniped Marines from atop the Tower of Law across an impossible wind gap to save Nico Robin!'
        }
      }
    },
    {
      id: 'chopper',
      name: 'Tony Tony Chopper',
      epithet: '"Cotton Candy Lover" Chopper',
      faction: 'Straw Hat Pirates',
      crewSlot: 'cook-doctor',
      role: 'Doctor',
      era: 'east-blue',
      image: '/assets/characters/chopper.jpg',
      bounty: 1000,
      bountyText: '1,000 (Mistaken for Pet!)',
      bountyHistory: [
        { era: 'east-blue', label: 'Drum Island Doctor', bounty: 0, text: '0 (Doctor)' },
        { era: 'pre-timeskip', label: 'Enies Lobby', bounty: 50, text: '50 (Pet Bounty!)' },
        { era: 'wano', label: 'Dressrosa', bounty: 100, text: '100' },
        { era: 'wano', label: 'Wano', bounty: 1000, text: '1,000' }
      ],
      tier: 'Grand Line Hero',
      powerScore: 77,
      accentColor: '#f472b6',
      devilFruit: 'Hito Hito no Mi (Human-Human Fruit — Zoan + Rumble Ball)',
      haki: [],
      stats: { strength: 84, speed: 77, durability: 85, haki: 62, devilFruit: 86, battleIQ: 94 },
      signatureMoves: [
        'Monster Point: Kokutei Palme (30-Minute Giant Form!)',
        'Kung Fu Point',
        'Virus Antidote Phage Cannon (Medical Genius!)'
      ],
      kidBio:
        'A blue-nosed reindeer who ate the Human-Human Fruit and trained under Dr. Hiriluk and Dr. Kureha! Using his Rumble Ball, Chopper shifts between 7 battle forms and cures impossible plagues!',
      eraSnapshots: {
        'east-blue': {
          bounty: 0,
          bountyText: 'Drum Island Miracle Doctor',
          powerScore: 64,
          signatureMoves: ['Kokutei Roseo (Cloven Hoof Cherry Blossom!)', 'Arm Point & Guard Point', 'Scope Diagnostics'],
          kidBio:
            'Recruited under Dr. Hiriluk\'s pink cherry-blossom snow clouds on Drum Island! Chopper can talk to animals and humans alike and vows to become a doctor who can cure any disease.'
        },
        'pre-timeskip': {
          bounty: 50,
          bountyText: '50 (Marines Thought He Was a Pet!)',
          powerScore: 71,
          signatureMoves: ['Kokutei Roseo Metel', 'Horn Point', 'Emergency Monster Point'],
          kidBio:
            'Defeated CP9 fighter Kumadori at Enies Lobby — yet because he was eating cotton candy afterward, the Marines only gave him a 50-Berry pet bounty!'
        }
      }
    },
    {
      id: 'robin',
      name: 'Nico Robin',
      epithet: '"Devil Child" Nico Robin — Light of the Revolution',
      faction: 'Straw Hat Pirates',
      crewSlot: 'navigator',
      role: 'Archaeologist (Poneglyph Reader)',
      era: 'pre-timeskip',
      image: '/assets/characters/robin.jpg',
      bounty: 930000000,
      bountyText: '930,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Age 8 (Ohara Scholar)', bounty: 79000000, text: '79,000,000' },
        { era: 'pre-timeskip', label: 'Enies Lobby', bounty: 80000000, text: '80,000,000' },
        { era: 'wano', label: 'Dressrosa', bounty: 130000000, text: '130,000,000' },
        { era: 'wano', label: 'Wano (Demonio Fleur!)', bounty: 930000000, text: '930,000,000' }
      ],
      tier: 'Yonko Officer',
      powerScore: 82,
      accentColor: '#a855f7',
      devilFruit: 'Hana Hana no Mi (Flower-Flower Fruit — Paramecia)',
      haki: [],
      stats: { strength: 80, speed: 80, durability: 78, haki: 72, devilFruit: 90, battleIQ: 96 },
      signatureMoves: [
        'Demonio Fleur: Gran Jacuzzi Clutch',
        'Gigante Fleur: Sea Serpent',
        'Cien Fleur: Wing (Petal Flight)'
      ],
      kidBio:
        'The sole surviving scholar of Ohara who can read the ancient Poneglyph stones! Without Robin, no crew can decipher the 4 Road Poneglyphs to reach Laugh Tale.',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 80000000,
          bountyText: '80,000,000',
          tier: 'Grand Line Officer',
          powerScore: 74,
          signatureMoves: ['Treinta Fleur: Clutch!', 'Cien Fleur: Wing', 'Ochenta Fleur'],
          kidBio:
            'Joined the Going Merry after Alabasta and shouted "I WANT TO LIVE!" across the waterfall of Enies Lobby when the entire crew declared war to bring her home!'
        }
      }
    },
    {
      id: 'franky',
      name: 'Franky',
      epithet: '"Iron Man" Franky',
      faction: 'Straw Hat Pirates',
      crewSlot: 'helmsman',
      role: 'Shipwright (Cyborg BF-37)',
      era: 'pre-timeskip',
      image: '/assets/characters/franky.jpg',
      bounty: 394000000,
      bountyText: '394,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Enies Lobby', bounty: 44000000, text: '44,000,000' },
        { era: 'wano', label: 'Dressrosa', bounty: 94000000, text: '94,000,000' },
        { era: 'wano', label: 'Wano (Sunny Poster Gag!)', bounty: 394000000, text: '394,000,000' }
      ],
      tier: 'Yonko Officer',
      powerScore: 81,
      accentColor: '#38bdf8',
      devilFruit: 'None — Cola-Powered Cyborg & General Franky Mecha!',
      haki: [],
      stats: { strength: 87, speed: 74, durability: 90, haki: 65, devilFruit: 86, battleIQ: 89 },
      signatureMoves: [
        'Franky Radical Beam (Vegapunk Laser!)',
        'General Cannon (Gaon Cannon)',
        'Coup de Vent'
      ],
      kidBio:
        'The "SUUUPER!" cola-powered cyborg shipwright who built the Thousand Sunny and pilots the giant robot Iron Pirate General Franky!',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '"Cyborg" Franky (BF-36)',
          bounty: 44000000,
          bountyText: '44,000,000',
          powerScore: 73,
          devilFruit: 'None — Cola-Powered Cyborg BF-36!',
          signatureMoves: ['Coup de Vent (Air Blast Cannon!)', 'Strong Right', 'Weapons Left'],
          kidBio:
            'Apprentice of legendary shipwright Tom (who built Gol D. Roger\'s Oro Jackson)! Franky built the Thousand Sunny so he could sail it around the entire globe.'
        }
      }
    },
    {
      id: 'brook',
      name: 'Brook',
      epithet: '"Soul King" Brook',
      faction: 'Straw Hat Pirates',
      crewSlot: 'first-mate',
      role: 'Musician & Fencing Master',
      era: 'pre-timeskip',
      image: '/assets/characters/brook.jpg',
      bounty: 383000000,
      bountyText: '383,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Rumbar Pirates Era', bounty: 33000000, text: '33,000,000' },
        { era: 'wano', label: 'Dressrosa ("Soul King")', bounty: 83000000, text: '83,000,000' },
        { era: 'wano', label: 'Post-Wano', bounty: 383000000, text: '383,000,000' }
      ],
      tier: 'Yonko Officer',
      powerScore: 80,
      accentColor: '#a78bfa',
      devilFruit: 'Yomi Yomi no Mi (Revive-Revive Fruit — Paramecia)',
      haki: [],
      stats: { strength: 78, speed: 95, durability: 82, haki: 68, devilFruit: 86, battleIQ: 88 },
      signatureMoves: [
        'Soul Solid: Three-Verse Humming — Arrow-Notch Slash!',
        "Phrase d'Armes: Orchestra",
        "Binks' Brew Concert Illusion"
      ],
      kidBio:
        '"Yohohoho!" A living skeleton musician so light he can sprint across ocean water! Brook channels Underworld ice into his cane sword and looks forward to reuniting with Laboon at Twin Capes.',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '"Humming" Brook',
          bounty: 33000000,
          bountyText: '33,000,000',
          powerScore: 71,
          signatureMoves: ['Yahazu Giri (Three-Verse Humming)', ' Aubade Coup Droit', "Lullaby Parry"],
          kidBio:
            'After 50 lonely years adrift in the Florian Triangle, Brook got his shadow back with Luffy\'s help and joined as the musician Luffy wanted since Day 1!'
        }
      }
    },
    {
      id: 'jinbe',
      name: 'Jinbe',
      epithet: '"Knight of the Sea" Jinbe',
      faction: 'Straw Hat Pirates',
      crewSlot: 'helmsman',
      role: 'Helmsman & Fish-Man Karate Master',
      era: 'pre-timeskip',
      image: '/assets/characters/jinbe.jpg',
      bounty: 1100000000,
      bountyText: '1,100,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Sun Pirates Captain', bounty: 250000000, text: '250,000,000' },
        { era: 'wano', label: 'Post-Marineford', bounty: 438000000, text: '438,000,000' },
        { era: 'wano', label: 'Wano (Straw Hat Helmsman!)', bounty: 1100000000, text: '1,100,000,000' }
      ],
      tier: '1st Commander+',
      powerScore: 87,
      accentColor: '#06b6d4',
      devilFruit: 'None — Master of Fish-Man Karate & Ocean Currents!',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament (Full-Body Koka)', advanced: false }
      ],
      stats: { strength: 90, speed: 84, durability: 91, haki: 86, devilFruit: 88, battleIQ: 93 },
      signatureMoves: [
        'Fish-Man Karate Secret Art: Demon Brick Fist',
        'Ocean Current Shoulder Throw',
        'Five Thousand Tile True Punch'
      ],
      kidBio:
        'A whale shark fish-man and former Warlord who saved Luffy at Impel Down and Marineford before taking the wheel of the Thousand Sunny as the Straw Hats\' unstoppable Helmsman!',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 250000000,
          bountyText: '250,000,000 (Former Warlord)',
          powerScore: 84,
          haki: [],
          kidBio:
            'Resigned his Warlord title rather than fight Whitebeard, broke out of Impel Down alongside Luffy, and summoned a school of whale sharks to cross the Calm Belt!'
        }
      }
    },
    {
      id: 'buggy',
      name: 'Buggy the Star Clown',
      epithet: '"The Genius Jester" — Emperor of the Sea!',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'captain',
      role: 'Figurehead President of Cross Guild',
      era: 'east-blue',
      image: '/assets/characters/buggy.jpg',
      bounty: 3189000000,
      bountyText: '3,189,000,000',
      bountyHistory: [
        { era: 'east-blue', label: 'Orange Town (East Blue)', bounty: 15000000, text: '15,000,000' },
        { era: 'pre-timeskip', label: 'Warlord Invitation!', bounty: 15000000, text: '15,000,000 (Frozen as Warlord)' },
        { era: 'wano', label: 'Post-Wano EMPEROR (!)', bounty: 3189000000, text: '3,189,000,000' }
      ],
      tier: 'Lucky Legend',
      powerScore: 65,
      accentColor: '#f43f5e',
      devilFruit: 'Bara Bara no Mi (Chop-Chop Fruit — Slash-Proof Paramecia!)',
      haki: [],
      stats: { strength: 52, speed: 65, durability: 82, haki: 20, devilFruit: 78, battleIQ: 76 },
      signatureMoves: [
        'Muggy Ball (Tiny Shoe-Sized Mega Cannonball!)',
        'Bara Bara Festival (Floating Body Swarm)',
        'Failing Upwards Into Becoming a Yonko!'
      ],
      kidBio:
        'Shanks\' childhood crewmate on Gol D. Roger\'s ship! Even though Luffy sent him flying in East Blue, Buggy\'s hilarious luck at Impel Down and Marineford convinced thousands of pirates he is a mastermind — making him one of the new Four Emperors with a higher bounty than Luffy!',
      eraSnapshots: {
        'east-blue': {
          epithet: '"Buggy the Clown"',
          bounty: 15000000,
          bountyText: '15,000,000',
          tier: 'East Blue Boss',
          powerScore: 52,
          signatureMoves: ['Special Buggy Ball Cannon', 'Bara Bara Car', 'Flying Knife Chop'],
          kidBio:
            'Flashy pirate captain of Orange Town who hates it when anyone talks about his big red nose! Ate the Chop-Chop Fruit as an apprentice alongside young Shanks.'
        },
        'pre-timeskip': {
          epithet: '"Buggy the Star Clown" — Impel Down Savior?!',
          bounty: 15000000,
          bountyText: '15,000,000 (Invited to Seven Warlords!)',
          tier: 'Grand Line Trickster',
          powerScore: 60,
          signatureMoves: ['Muggy Ball!', 'Bara Bara Emergency Escape (Survived Mihawk\'s Slash!)'],
          kidBio:
            'Accidentally became the hero of hundreds of Impel Down escapees and broadcast himself live across the world from Marineford!'
        }
      }
    },
    {
      id: 'roger',
      name: 'Gol D. Roger',
      epithet: 'King of the Pirates',
      faction: 'Legends',
      crewSlot: 'captain',
      role: 'Captain of the Roger Pirates',
      era: 'east-blue',
      image: '/assets/characters/roger.jpg',
      bounty: 5564800000,
      bountyText: '5,564,800,000 (Highest Pirate Bounty Ever!)',
      tier: 'PK / Legend',
      powerScore: 100,
      accentColor: '#facc15',
      devilFruit: 'None — Conquered the Grand Line with Haki Alone!',
      haki: [
        { name: 'Observation + Voice of All Things', advanced: true },
        { name: 'Armament (Supreme Grade Cutlass Ace)', advanced: true },
        { name: "Conqueror's (Sky-Splitting Mastery)", advanced: true }
      ],
      stats: { strength: 100, speed: 98, durability: 98, haki: 100, devilFruit: 95, battleIQ: 99 },
      signatureMoves: [
        'Kamusari (Divine Departure!)',
        "Sky-Splitting Conqueror's Clash (vs. Whitebeard)"
      ],
      kidBio:
        'The legendary man who sailed every sea, reached the final island Laugh Tale, and sparked the Great Pirate Era! Roger had no Devil Fruit — he conquered the world with pure willpower, friendship, and Supreme Haki!',
      eraSnapshots: {
        'east-blue': {
          bountyText: 'Legendary King of the Pirates!',
          haki: [],
          signatureMoves: ['Conquered the Entire Grand Line!', 'Sparked the Great Pirate Era at Loguetown'],
          kidBio:
            '"You want my treasure? You can have it! I left everything I gathered together in one place — now you just have to find it!"'
        }
      }
    },
    {
      id: 'whitebeard',
      name: 'Edward Newgate (Whitebeard)',
      epithet: '"The Strongest Man in the World"',
      faction: 'Legends',
      crewSlot: 'captain',
      role: 'Captain of the Whitebeard Pirates',
      era: 'pre-timeskip',
      image: '/assets/characters/whitebeard.jpg',
      bounty: 5046000000,
      bountyText: '5,046,000,000',
      tier: 'PK / Legend',
      powerScore: 99,
      accentColor: '#38bdf8',
      devilFruit: 'Gura Gura no Mi (Tremor-Tremor Fruit — Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: true },
        { name: 'Armament Haki', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 100, speed: 92, durability: 100, haki: 98, devilFruit: 100, battleIQ: 96 },
      signatureMoves: [
        'Shima Yurashi (Tilts the Entire Ocean & Island!)',
        'Quake Bubble Fist',
        'Murakumogiri Supreme Naginata Slash'
      ],
      kidBio:
        'Roger\'s greatest rival whose only dream was having a "Family"! At Marineford he stood tall without a single coward\'s scar on his back and roared: "THE ONE PIECE IS REAL!"'
    },
    {
      id: 'shanks',
      name: 'Shanks',
      epithet: '"Red-Haired" Shanks — Emperor of the Sea',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'captain',
      role: 'Chief of the Red Hair Pirates',
      era: 'east-blue',
      image: '/assets/characters/shanks.jpg',
      bounty: 4048900000,
      bountyText: '4,048,900,000',
      tier: 'Yonko / Emperor',
      powerScore: 98,
      accentColor: '#dc2626',
      devilFruit: "None — Unrivaled Conqueror's Haki Master!",
      haki: [
        { name: 'Observation (10-Sec Future Sight)', advanced: true },
        { name: 'Armament Haki', advanced: true },
        { name: "Conqueror's (Mile-Wide Lightning Haki)", advanced: true }
      ],
      stats: { strength: 96, speed: 99, durability: 93, haki: 100, devilFruit: 95, battleIQ: 99 },
      signatureMoves: [
        "Mile-Wide Conqueror's Haki Burst!",
        'Gryphon Supreme Haki Slash'
      ],
      kidBio:
        'Saved young Luffy from a Sea King in East Blue and entrusted him with his Straw Hat! Shanks ended the Marineford War just by arriving, and his Conqueror\'s Haki can stretch across miles of ocean!',
      eraSnapshots: {
        'east-blue': {
          epithet: '"Red-Haired" Shanks',
          bountyText: 'Great Grand Line Pirate',
          signatureMoves: ['Sea-King Scaring Glare!', 'Gryphon Sabre Mastery'],
          kidBio:
            'The cool, easygoing captain who inspired Luffy to become a pirate and bet his left arm on the "New Era"!'
        }
      }
    },
    {
      id: 'kaido',
      name: 'Kaido',
      epithet: '"King of the Beasts" — Strongest Creature',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'captain',
      role: 'Governor-General of the Beasts Pirates',
      era: 'wano',
      image: '/assets/characters/kaido.jpg',
      bounty: 4611100000,
      bountyText: '4,611,100,000',
      tier: 'Yonko / Emperor',
      powerScore: 98,
      accentColor: '#6366f1',
      devilFruit: 'Uo Uo no Mi, Model: Seiryu (Azure Dragon — Mythical Zoan)',
      haki: [
        { name: 'Observation (Future Sight)', advanced: true },
        { name: 'Armament Haki', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 100, speed: 96, durability: 100, haki: 97, devilFruit: 98, battleIQ: 94 },
      signatureMoves: [
        'Raimei Hakke (Thunder Bagua)',
        'Bolo Breath (Mountain-Melting Blast)',
        'Flame Dragon Torch'
      ],
      kidBio:
        '"In a one-on-one fight, always bet on Kaido!" Transforms into a colossal blue Eastern Dragon capable of lifting the entire island of Onigashima into the clouds while battling nonstop!'
    },
    {
      id: 'big-mom',
      name: 'Charlotte Linlin (Big Mom)',
      epithet: 'Emperor of the Sea — Queen of Totto Land',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'captain',
      role: 'Captain of the Big Mom Pirates',
      era: 'wano',
      image: '/assets/characters/big-mom.jpg',
      bounty: 4388000000,
      bountyText: '4,388,000,000',
      tier: 'Yonko / Emperor',
      powerScore: 96,
      accentColor: '#ec4899',
      devilFruit: 'Soru Soru no Mi (Soul-Soul Fruit — Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 99, speed: 88, durability: 99, haki: 94, devilFruit: 97, battleIQ: 88 },
      signatureMoves: [
        'Maser Cannon (Combined Prometheus + Hera + Napoleon Beam!)',
        'Ikoku Sovereignty',
        'Heavenly Bonbon'
      ],
      kidBio:
        'Ruler of 34 dessert islands in Totto Land! Using her Soul-Soul Fruit, she brings a mini-sun (Prometheus), thundercloud (Hera), and giant hat-sword (Napoleon) to life!'
    },
    {
      id: 'blackbeard',
      name: 'Marshall D. Teach (Blackbeard)',
      epithet: 'Emperor of the Sea — Dual Devil Fruit User',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'captain',
      role: 'Admiral of the Blackbeard Pirates',
      era: 'pre-timeskip',
      image: '/assets/characters/blackbeard.jpg',
      bounty: 3996000000,
      bountyText: '3,996,000,000',
      tier: 'Yonko / Emperor',
      powerScore: 96,
      accentColor: '#7c3aed',
      devilFruit: 'Yami Yami no Mi (Darkness) + Gura Gura no Mi (Quake)!',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false }
      ],
      stats: { strength: 95, speed: 85, durability: 96, haki: 90, devilFruit: 100, battleIQ: 95 },
      signatureMoves: [
        'Kurouzu (Black Vortex — Cancels Devil Fruits on Touch!)',
        'Black Hole: Liberation',
        'Dual Quake & Darkness Crash'
      ],
      kidBio:
        '"Zehahaha!" The only person in known history to wield TWO Devil Fruits at once — gravity-pulling Darkness in one hand and world-shaking Earthquakes in the other!',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '"Blackbeard" — Scheming Warlord',
          bounty: 0,
          bountyText: '0 (Hid in Whitebeard\'s Shadow!)',
          tier: 'Top Tier Threat',
          powerScore: 92
        }
      }
    },
    {
      id: 'oden',
      name: 'Kozuki Oden',
      epithet: 'Daimyo of Kuri — Legendary Samurai of Wano!',
      faction: 'Legends',
      crewSlot: 'first-mate',
      role: 'Samurai & Poneglyph Reader (Whitebeard & Roger Crewmate!)',
      era: 'wano',
      image: '/assets/characters/oden.jpg',
      bounty: 1500000000,
      bountyText: 'Legendary Samurai of Wano',
      tier: 'Yonko / Emperor',
      powerScore: 95,
      accentColor: '#fb923c',
      devilFruit: 'None — Oden Two-Sword Style (Enma & Ame no Habakiri)!',
      haki: [
        { name: 'Observation + Voice of All Things', advanced: true },
        { name: 'Armament (Master of Ryuo!)', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 98, speed: 93, durability: 98, haki: 96, devilFruit: 92, battleIQ: 91 },
      signatureMoves: [
        'Oden Nitoryu: Togen Totsuka (Paradise Totsuka — Scarred Dragon Kaido!)',
        'Togen Shirataki (Paradise Waterfall)',
        'Legendary Hour (Held Up All 9 Scabbards!)'
      ],
      kidBio:
        '"Oden wouldn\'t be Oden if it wasn\'t boiled!" A larger-than-life samurai hero who sailed with BOTH Whitebeard and Gol D. Roger, read the Road Poneglyphs to reach Laugh Tale, and gave Kaido his permanent X-shaped scar!'
    },
    {
      id: 'yamato',
      name: 'Yamato',
      epithet: 'Guardian Deity Spirit of Wano',
      faction: 'Legends',
      crewSlot: 'first-mate',
      role: 'Protector of Wano & Momonosuke',
      era: 'wano',
      image: '/assets/characters/yamato.jpg',
      bounty: 1000000000,
      bountyText: 'Protector of Wano Country',
      tier: '1st Commander+',
      powerScore: 90,
      accentColor: '#2dd4bf',
      devilFruit: 'Inu Inu no Mi, Model: Okuchi no Makami (Mythical Ice Wolf)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: true },
        { name: "Conqueror's (Supreme King Coating)", advanced: true }
      ],
      stats: { strength: 92, speed: 91, durability: 93, haki: 91, devilFruit: 91, battleIQ: 88 },
      signatureMoves: [
        'Raimei Hakke (Thunder Bagua)',
        'Namuji Hyoga (Glacier Fang Ice Blast)',
        'Kagamiyama (Mirror Mountain Ice Armor)'
      ],
      kidBio:
        'Inspired by Kozuki Oden\'s logbook and friends with Portgas D. Ace! Yamato rebelled against her father Kaido, holding the Onigashima rooftop 1-on-1 until Luffy returned to awaken Gear 5!'
    },
    {
      id: 'law',
      name: 'Trafalgar D. Water Law',
      epithet: '"Surgeon of Death"',
      faction: 'Worst Generation',
      crewSlot: 'cook-doctor',
      role: 'Captain & Doctor of the Heart Pirates',
      era: 'pre-timeskip',
      image: '/assets/characters/law.jpg',
      bounty: 3000000000,
      bountyText: '3,000,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Sabaody Supernova', bounty: 200000000, text: '200,000,000' },
        { era: 'wano', label: 'Dressrosa', bounty: 500000000, text: '500,000,000' },
        { era: 'wano', label: 'Wano (Beat Big Mom!)', bounty: 3000000000, text: '3,000,000,000' }
      ],
      tier: 'Admiral / Top Tier',
      powerScore: 92,
      accentColor: '#eab308',
      devilFruit: 'Ope Ope no Mi (Op-Op Fruit — Awakened Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false }
      ],
      stats: { strength: 86, speed: 94, durability: 89, haki: 88, devilFruit: 99, battleIQ: 99 },
      signatureMoves: [
        'K-ROOM: Puncture Wille!',
        'ROOM: Shambles (Instant Swap)',
        'Gamma Knife'
      ],
      kidBio:
        'Saved Luffy\'s life in his yellow submarine Polar Tang at Marineford and teamed up to defeat Doflamingo and Big Mom using his spherical surgical ROOM!',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 200000000,
          bountyText: '200,000,000',
          powerScore: 80,
          signatureMoves: ['ROOM: Shambles!', 'Amputate', 'Takt'],
          kidBio:
            'Cool-headed Supernova surgeon from North Blue who rescued Luffy and Jinbe from Marineford in his Polar Tang submarine!'
        }
      }
    },
    {
      id: 'kid',
      name: 'Eustass "Captain" Kid',
      epithet: 'Captain of the Kid Pirates',
      faction: 'Worst Generation',
      crewSlot: 'helmsman',
      role: 'Captain & Magnetic Engineer',
      era: 'pre-timeskip',
      image: '/assets/characters/kid.jpg',
      bounty: 3000000000,
      bountyText: '3,000,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Sabaody (#1 Supernova)', bounty: 315000000, text: '315,000,000' },
        { era: 'wano', label: 'New World', bounty: 470000000, text: '470,000,000' },
        { era: 'wano', label: 'Wano (Beat Big Mom!)', bounty: 3000000000, text: '3,000,000,000' }
      ],
      tier: 'Admiral / Top Tier',
      powerScore: 91,
      accentColor: '#f43f5e',
      devilFruit: 'Jiki Jiki no Mi (Magnet-Magnet Fruit — Awakened Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false },
        { name: "Conqueror's Haki", advanced: false }
      ],
      stats: { strength: 94, speed: 86, durability: 93, haki: 86, devilFruit: 95, battleIQ: 87 },
      signatureMoves: [
        'Damned Punk (Electromagnetic Railgun!)',
        'Awakening: Assign (Living Magnet)',
        'Punk Corna Dio (Giant Metal Bull)'
      ],
      kidBio:
        'Builds colossal metal mechs, bulls, and electromagnetic railguns out of scrap steel — teaming up with Law to defeat Big Mom in Wano!',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 315000000,
          bountyText: '315,000,000',
          powerScore: 80,
          signatureMoves: ['Punk Gibson (Giant Scrap-Metal Arm!)', 'Repel']
        }
      }
    },
    {
      id: 'mihawk',
      name: 'Dracule "Hawk-Eyes" Mihawk',
      epithet: '"The World\'s Greatest Swordsman"',
      faction: 'Seven Warlords / Legends',
      crewSlot: 'first-mate',
      role: 'Supreme Swordsman (Wielder of Yoru)',
      era: 'east-blue',
      image: '/assets/characters/mihawk.jpg',
      bounty: 3590000000,
      bountyText: '3,590,000,000',
      tier: 'Yonko / Emperor',
      powerScore: 97,
      accentColor: '#c084fc',
      devilFruit: 'None — Supreme Black Blade Yoru!',
      haki: [
        { name: 'Observation ("Hawk-Eyes")', advanced: true },
        { name: 'Armament (Permanent Black Blade)', advanced: true }
      ],
      stats: { strength: 97, speed: 97, durability: 94, haki: 99, devilFruit: 95, battleIQ: 98 },
      signatureMoves: [
        "Yoru World's Strongest Slash (Slices a Frozen Tsunami in Half!)",
        'Gentle Sword Redirection'
      ],
      kidBio:
        "Zoro's ultimate goal and Shanks' former rival! Mihawk sails the Grand Line solo in a tiny candle-lit boat and wields Yoru — the strongest Black Blade in the world.",
      eraSnapshots: {
        'east-blue': {
          bounty: 600000000,
          bountyText: 'Warlord (Bounty Frozen!)'
        },
        'pre-timeskip': {
          bounty: 600000000,
          bountyText: 'Seven Warlords of the Sea'
        }
      }
    },
    {
      id: 'crocodile',
      name: 'Sir Crocodile',
      epithet: '"Desert King"',
      faction: 'Seven Warlords / Legends',
      crewSlot: 'navigator',
      role: 'Mastermind Strategist (Former Warlord & Cross Guild)',
      era: 'pre-timeskip',
      image: '/assets/characters/crocodile.jpg',
      bounty: 1965000000,
      bountyText: '1,965,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: 'Alabasta Warlord (Frozen)', bounty: 81000000, text: '81,000,000 (Frozen Warlord)' },
        { era: 'wano', label: 'Post-Wano Cross Guild!', bounty: 1965000000, text: '1,965,000,000' }
      ],
      tier: '1st Commander+',
      powerScore: 87,
      accentColor: '#d97706',
      devilFruit: 'Suna Suna no Mi (Sand-Sand Fruit — Logia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false }
      ],
      stats: { strength: 83, speed: 84, durability: 84, haki: 82, devilFruit: 93, battleIQ: 97 },
      signatureMoves: [
        'Sables (Giant Desert Sandstorm Tornado!)',
        'Desert La Spada (Razor Sand Blades)',
        'Ground Death (Turns Stone to Sand!)'
      ],
      kidBio:
        'The golden-hooked Sand-Logia mastermind who pushed Luffy to three grueling rounds in Alabasta — and later helped Luffy and Jinbe break out of Impel Down and fight at Marineford!',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 81000000,
          bountyText: '81,000,000 (Frozen as Warlord)',
          powerScore: 80,
          haki: []
        }
      }
    },
    {
      id: 'doflamingo',
      name: 'Donquixote Doflamingo',
      epithet: '"Heavenly Yaksha"',
      faction: 'Seven Warlords / Legends',
      crewSlot: 'navigator',
      role: 'Former King of Dressrosa & Warlord',
      era: 'pre-timeskip',
      image: '/assets/characters/doflamingo.jpg',
      bounty: 340000000,
      bountyText: '340,000,000 (Frozen Warlord)',
      tier: 'Yonko Commander',
      powerScore: 86,
      accentColor: '#ec4899',
      devilFruit: 'Ito Ito no Mi (String-String Fruit — Awakened Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false },
        { name: "Conqueror's Haki", advanced: false }
      ],
      stats: { strength: 86, speed: 88, durability: 88, haki: 85, devilFruit: 95, battleIQ: 94 },
      signatureMoves: [
        'Awakening: Sixteen Holy Bullets — God Thread!',
        'Birdcage (Island-Spanning String Dome)',
        'Overheat Whip & Sky-Cloud Swinging'
      ],
      kidBio:
        'Wearing his signature pink feather coat and sunglasses, Doflamingo swings from clouds on invisible strings and pushed Luffy to unveil Gear 4: Bounce-Man on Dressrosa!',
      eraSnapshots: {
        'pre-timeskip': {
          role: 'Seven Warlords of the Sea',
          devilFruit: 'Ito Ito no Mi (String-String Fruit — Paramecia)',
          haki: [],
          signatureMoves: ['Parasite (Invisible Puppeteer Strings!)', 'Five Color Strings'],
          kidBio:
            'A flamboyant, scheming Warlord in a pink feather coat who debuted in Jaya and Marineford, controlling pirates like puppets with unseen strings!'
        }
      }
    },
    {
      id: 'hancock',
      name: 'Boa Hancock',
      epithet: '"Pirate Empress"',
      faction: 'Seven Warlords / Legends',
      crewSlot: 'captain',
      role: 'Empress of Amazon Lily & Captain of the Kuja Pirates',
      era: 'pre-timeskip',
      image: '/assets/characters/hancock.jpg',
      bounty: 1659000000,
      bountyText: '1,659,000,000',
      bountyHistory: [
        { era: 'pre-timeskip', label: '1st Voyage (Warlord Invite!)', bounty: 80000000, text: '80,000,000 (Frozen Warlord)' },
        { era: 'wano', label: 'Post-Warlord Abolition!', bounty: 1659000000, text: '1,659,000,000' }
      ],
      tier: '1st Commander+',
      powerScore: 89,
      accentColor: '#f43f5e',
      devilFruit: 'Mero Mero no Mi (Love-Love Fruit — Petrifying Paramecia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament (Kuja Haki Kicks)', advanced: true },
        { name: "Conqueror's Haki", advanced: false }
      ],
      stats: { strength: 86, speed: 91, durability: 85, haki: 90, devilFruit: 94, battleIQ: 89 },
      signatureMoves: [
        'Perfume Femur (Turns Anything She Kicks — Even Pacifista Robots — to Stone!)',
        'Slave Arrow Volley',
        'Mero Mero Mellow'
      ],
      kidBio:
        'Ruler of warrior-island Amazon Lily inside the Calm Belt (where every warrior trains in Haki)! Because Luffy was selfless and immune to her stone beam, Hancock became Luffy\'s fiercest ally and snuck him into Impel Down!',
      eraSnapshots: {
        'pre-timeskip': {
          bounty: 80000000,
          bountyText: '80,000,000 (Frozen after 1st Voyage!)'
        }
      }
    },
    {
      id: 'garp',
      name: 'Monkey D. Garp',
      epithet: '"Garp the Fist" — Hero of the Marines',
      faction: 'Marines & World Gov',
      crewSlot: 'captain',
      role: "Marine Vice Admiral (Luffy's Grandfather)",
      era: 'pre-timeskip',
      image: '/assets/characters/garp.jpg',
      posterHeader: 'CROSS GUILD',
      posterCondition: '★★★ 3-CROWN MARINE TARGET',
      posterFooter: '— CROSS GUILD',
      bounty: 3000000000,
      bountyText: '3,000,000,000 (★★★ 3 Crowns)',
      tier: 'PK / Legend',
      powerScore: 96,
      accentColor: '#60a5fa',
      devilFruit: 'None — Pure Fists & Mountain-Smashing Haki!',
      haki: [
        { name: 'Observation Haki', advanced: true },
        { name: 'Armament (Mountain-Crushing Fists)', advanced: true },
        { name: "Conqueror's Haki", advanced: true }
      ],
      stats: { strength: 99, speed: 94, durability: 96, haki: 99, devilFruit: 90, battleIQ: 95 },
      signatureMoves: [
        'Galaxy Impact! (Conqueror\'s Shockwave Fist)',
        'Fist of Love (Hurts Rubber Luffy Through Pure Grandpa Spirit!)',
        '8-Mountain Warmup Smash'
      ],
      kidBio:
        "Luffy's booming, rice-cracker-munching grandfather who cornered Gol D. Roger across the seas and refused promotions to Admiral so he could stay free!",
      eraSnapshots: {
        'pre-timeskip': {
          posterHeader: 'MARINE HQ',
          posterCondition: 'HERO OF THE MARINES',
          posterFooter: '— WORLD GOV',
          bountyText: 'Hero of the Marines (Vice Admiral)',
          signatureMoves: [
            'Fist of Love (Hurts Rubber Luffy!)',
            'Meteor Cannonball Pitch',
            '8-Mountain Warmup Smash'
          ]
        }
      }
    },
    {
      id: 'akainu',
      name: 'Sakazuki (Akainu)',
      epithet: 'Fleet Admiral of the Marines — "Red Dog"',
      faction: 'Marines & World Gov',
      crewSlot: 'captain',
      role: 'Fleet Admiral of Marine HQ',
      era: 'pre-timeskip',
      image: '/assets/characters/akainu.jpg',
      posterHeader: 'CROSS GUILD',
      posterCondition: '★★★★★ 5-CROWN FLEET ADMIRAL',
      posterFooter: '— CROSS GUILD',
      bounty: 5000000000,
      bountyText: '5,000,000,000 (★★★★★ 5 Crowns)',
      tier: 'Yonko / Emperor',
      powerScore: 96,
      accentColor: '#f97316',
      devilFruit: 'Magu Magu no Mi (Magma-Magma Fruit — Logia)',
      haki: [
        { name: 'Observation Haki', advanced: true },
        { name: 'Armament (Emission Barrier)', advanced: true }
      ],
      stats: { strength: 97, speed: 90, durability: 97, haki: 95, devilFruit: 99, battleIQ: 94 },
      signatureMoves: [
        'Dai Funka (Great Volcanic Eruption)',
        'Ryusei Kazan (Meteor Volcano Shower)'
      ],
      kidBio:
        'Fought Admiral Aokiji for 10 straight days on Punk Hazard — permanently turning half the island into blazing volcanoes and half into glaciers! Cross Guild placed an Emperor-level 5-Crown (5 Billion!) reward on the Fleet Admiral seat!',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '"Red Dog" — Marine HQ Admiral',
          role: 'Marine HQ Admiral',
          posterHeader: 'MARINE HQ',
          posterCondition: 'THOROUGH JUSTICE',
          posterFooter: '— WORLD GOV',
          bounty: 3000000000,
          bountyText: 'Marine HQ Admiral',
          kidBio:
            'One of Marine Headquarters\' three powerhouse Logia Admirals at Marineford, commanding molten volcanic magma!'
        }
      }
    },
    {
      id: 'kizaru',
      name: 'Borsalino (Admiral Kizaru)',
      epithet: '"Yellow Monkey" — Marine HQ Admiral',
      faction: 'Marines & World Gov',
      crewSlot: 'first-mate',
      role: 'Marine Admiral (Speed of Light!)',
      era: 'pre-timeskip',
      image: '/assets/characters/kizaru.jpg',
      posterHeader: 'CROSS GUILD',
      posterCondition: '★★★ 3-CROWN ADMIRAL TARGET',
      posterFooter: '— CROSS GUILD',
      bounty: 3000000000,
      bountyText: '3,000,000,000 (★★★ 3 Crowns)',
      tier: 'Admiral / Top Tier',
      powerScore: 94,
      accentColor: '#facc15',
      devilFruit: 'Pika Pika no Mi (Glint-Glint Light Fruit — Logia)',
      haki: [
        { name: 'Observation Haki', advanced: true },
        { name: 'Armament (Emission Barrier)', advanced: true }
      ],
      stats: { strength: 90, speed: 100, durability: 91, haki: 92, devilFruit: 98, battleIQ: 92 },
      signatureMoves: [
        'Yasakani no Magatama (Golden Photon Rain!)',
        'Yata no Kagami (Light Reflection Teleport)',
        'Ama no Murakumo (Blade of Pure Light)'
      ],
      kidBio:
        'Talks super slowly ("Oooooh~ scary~") despite being the fastest man in the Marines who moves and kicks at the literal speed of light!',
      eraSnapshots: {
        'pre-timeskip': {
          posterHeader: 'MARINE HQ',
          posterCondition: 'UNCLEAR JUSTICE',
          posterFooter: '— WORLD GOV',
          bountyText: 'Marine HQ Admiral'
        }
      }
    },
    {
      id: 'aokiji',
      name: 'Kuzan (Aokiji)',
      epithet: '"Blue Pheasant" — Former Marine Admiral',
      faction: 'Marines & World Gov',
      crewSlot: 'helmsman',
      role: 'Ice-Age Wanderer (Garp\'s Former Student)',
      era: 'pre-timeskip',
      image: '/assets/characters/aokiji.jpg',
      posterHeader: 'FORMER ADMIRAL',
      posterCondition: 'ROGUE NEW WORLD POWERHOUSE',
      bounty: 3000000000,
      bountyText: 'Former Marine HQ Admiral',
      tier: 'Admiral / Top Tier',
      powerScore: 95,
      accentColor: '#38bdf8',
      devilFruit: 'Hie Hie no Mi (Ice-Ice Fruit — Logia)',
      haki: [
        { name: 'Observation Haki', advanced: true },
        { name: 'Armament Haki', advanced: true }
      ],
      stats: { strength: 94, speed: 92, durability: 95, haki: 94, devilFruit: 98, battleIQ: 94 },
      signatureMoves: [
        'Ice Age! (Freezes Miles of Ocean & Giant Tsunamis Solid in One Second!)',
        'Pheasant Beak',
        'Ice Block: Partisan'
      ],
      kidBio:
        'A laid-back bicycle rider who wears a sleep mask on his forehead! Kuzan froze two giant tsunamis solid at Marineford and helped young Nico Robin escape Ohara.',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '"Blue Pheasant" — Marine HQ Admiral',
          role: 'Marine HQ Admiral',
          posterHeader: 'MARINE HQ',
          posterCondition: 'LAZY JUSTICE',
          posterFooter: '— WORLD GOV',
          bountyText: 'Marine HQ Admiral'
        }
      }
    },
    {
      id: 'ace',
      name: 'Portgas D. Ace',
      epithet: '"Fire Fist" Ace',
      faction: 'Legends',
      crewSlot: 'first-mate',
      role: '2nd Division Commander of the Whitebeard Pirates',
      era: 'pre-timeskip',
      image: '/assets/characters/ace.jpg',
      bounty: 550000000,
      bountyText: '550,000,000',
      tier: '1st Commander+',
      powerScore: 86,
      accentColor: '#fb923c',
      devilFruit: 'Mera Mera no Mi (Flame-Flame Fruit — Logia)',
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament Haki', advanced: false },
        { name: "Conqueror's Haki (Awakened as a Kid!)", advanced: false }
      ],
      stats: { strength: 87, speed: 88, durability: 85, haki: 84, devilFruit: 92, battleIQ: 87 },
      signatureMoves: [
        'Dai Enkai: Entei (Flame Emperor Giant Sun!)',
        'Hiken (Fire Fist — Wrecks 5 Ships in One Punch!)',
        'Firefly Fiery Doll'
      ],
      kidBio:
        "Luffy and Sabo's sworn big brother who set sail 3 years ahead of Luffy, visited Wano where he befriended Tama and Yamato, and sailed proudly under Whitebeard's mark!"
    },
    {
      id: 'sabo',
      name: 'Sabo',
      epithet: '"Flame Emperor" — Chief of Staff',
      faction: 'Revolutionary Army',
      crewSlot: 'first-mate',
      role: 'No. 2 of the Revolutionary Army',
      era: 'wano',
      image: '/assets/characters/sabo.jpg',
      bounty: 602000000,
      bountyText: '602,000,000+',
      tier: 'Admiral / Top Tier',
      powerScore: 91,
      accentColor: '#f59e0b',
      devilFruit: "Mera Mera no Mi (Inherited Ace's Flame-Flame Fruit!)",
      haki: [
        { name: 'Observation Haki', advanced: false },
        { name: 'Armament (Ryusoken Dragon Claw)', advanced: true }
      ],
      stats: { strength: 90, speed: 93, durability: 89, haki: 93, devilFruit: 92, battleIQ: 95 },
      signatureMoves: [
        "Ryusoken: Dragon's Breath (Shatters Entire Arena Floors!)",
        'Flaming Dragon King Fist!',
        'Hiken (Fire Fist!)'
      ],
      kidBio:
        'Luffy and Ace\'s sworn brother who became Chief of Staff of the Revolutionary Army and inherited Ace\'s Flame-Flame Fruit inside Dressrosa\'s Colosseum!'
    },
    {
      id: 'katakuri',
      name: 'Charlotte Katakuri',
      epithet: 'Undefeated Sweet 3 General',
      faction: 'Four Emperors (Yonko)',
      crewSlot: 'first-mate',
      role: '1st Commander of the Big Mom Pirates',
      era: 'wano',
      image: '/assets/characters/katakuri.jpg',
      bounty: 1057000000,
      bountyText: '1,057,000,000',
      tier: '1st Commander+',
      powerScore: 90,
      accentColor: '#e879f9',
      devilFruit: 'Mochi Mochi no Mi (Awakened Special Paramecia)',
      haki: [
        { name: 'Observation (Future Sight Master!)', advanced: true },
        { name: 'Armament (Block Mochi)', advanced: true },
        { name: "Conqueror's Haki", advanced: false }
      ],
      stats: { strength: 91, speed: 94, durability: 89, haki: 94, devilFruit: 93, battleIQ: 96 },
      signatureMoves: [
        'Zangiri Mochi (Buzz Cut Mochi)',
        'Awakening: Muso Donuts',
        'Future Sight Morphing Dodge'
      ],
      kidBio:
        'Loves giant frosted donuts and protects his siblings fiercely! Katakuri sees seconds into the future with Observation Haki, pushing Luffy to reach a whole new level in their honorable duel!'
    }
  ];

  const payload = { characters };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_CHARACTERS = payload;
})(typeof window !== 'undefined' ? window : globalThis);
