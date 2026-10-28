/**
 * Grand Line 3D Portal (V3) — 3D Shipwright Dock Cutaways & Official Vivre Card / SBS / Signature Laughs
 * Works in both Browser (window.OP_SHIPS_AND_VIVRE) and Node.js (module.exports).
 */

'use strict';

(function (root) {
  const ships = [
    {
      id: 'thousand-sunny',
      name: 'Thousand Sunny ("A Ship That Sails a Thousand Seas Like the Sun")',
      shortName: 'Thousand Sunny',
      era: 'pre-timeskip',
      classType: 'Brigantine Sloop (Treasure Tree Adam Hull)',
      shipwright: 'Cyborg Franky, Iceburg & Galley-La Foremen (Water 7)',
      dimensions: 'Height: 56m • Length: 39m • Fuel: Cola Barrels!',
      blueprintMapId: 'thousand-sunny-cutaway',
      accentColor: '#facc15',
      hullColor: '#b91c1c',
      summary:
        'Built in 5 sleepless days at Water 7 from priceless Treasure Tree Adam wood (the exact same indestructible timber used for Gol D. Roger\'s Oro Jackson)! Designed by Franky and named by Iceburg, the Thousand Sunny features a real green grass lawn, Nami\'s mikan tangerine grove, a wraparound Aquarium Bar, the rotating 6-channel Soldier Dock System, the bow-mounted Gaon Cannon, and an aft Coup de Burst rocket that launches the entire ship 1 kilometer through the air on 3 barrels of cola!',
      channels: [
        {
          channel: 'Channel 0',
          name: 'Cola-Powered Side Paddlewheels',
          era: 'pre-timeskip',
          summary:
            'Number "0" compartments split out from both sides of the hull as twin cola-driven paddlewheels, letting the Sunny cruise through windless Calm Belts or raging Grand Line whirlpools!'
        },
        {
          channel: 'Channel 1',
          name: 'Shiro Mokuba I (White Wooden Horse Waver)',
          era: 'pre-timeskip',
          summary:
            'Nami\'s high-speed Skypiea Jet-Dial waver upgraded by Franky with a cute white horse head and headlights!'
        },
        {
          channel: 'Channel 2',
          name: 'Mini Merry II (4-Seat Steam Paddleboat)',
          era: 'pre-timeskip',
          summary:
            'Franky\'s surprise gift honoring the Going Merry! A 4-person steamboat with Merry\'s beloved white sheep figurehead for island shopping trips.'
        },
        {
          channel: 'Channel 3',
          name: 'Shark Submerge III (5,000m Scout Submarine)',
          era: 'pre-timeskip',
          summary:
            'A 3-person shark-shaped reconnaissance submarine equipped with a Den Den Mushi periscope phone and rated down to 5,000 meters!'
        },
        {
          channel: 'Channel 4',
          name: 'Kurosai FR-U IV (Black Rhino Motorcycle)',
          era: 'wano',
          summary:
            'Post-timeskip Wapometal combat trike with treads and horn ram — docks with Brachio Tank V to form Iron Pirate: General Franky!'
        },
        {
          channel: 'Channel 5',
          name: 'Brachio Tank V (Chopper\'s Heavy Tank)',
          era: 'wano',
          summary:
            'Armored dinosaur artillery tank commanded by "Commander Chopper" — combines with Channel 4 via Wapometal alloy into the giant mecha General Franky!'
        }
      ],
      rooms: [
        {
          id: 'gaon-figurehead',
          icon: '🦁',
          name: 'Lion Mane Figurehead & Gaon Cannon',
          deck: 'Bow Deck',
          detail:
            'Behind the spinning golden lion mane (which can also spin like a propeller to reverse the ship!) hides the devastating Gaon Cannon — firing a cola-fueled compressed-air beam balanced by an aft recoil blast (total cost: 5 barrels of cola)!'
        },
        {
          id: 'lawn-mikan',
          icon: '🍊',
          name: 'Turf Grass Deck & Nami\'s Mikan Tangerine Grove',
          deck: 'Main & Upper Stern Deck',
          detail:
            'Real soil and green grass cover the main deck for naps and play, while Nami\'s 3 precious mikan trees from Bell-mère\'s orchard and Usopp\'s Pop Green garden flourish atop the roof!'
        },
        {
          id: 'aquarium-bar',
          icon: '🐠',
          name: 'Wraparound Aquarium Bar & Lounge',
          deck: '2nd Deck Interior',
          detail:
            'A giant cylindrical saltwater aquarium wraps the entire lounge wall so the crew can watch live Grand Line fish (except the sharks Luffy tries to catch!) while Sanji sends drinks down via kitchen dumbwaiter.'
        },
        {
          id: 'kitchen-1000-lock',
          icon: '🍳',
          name: 'Sanji\'s Gourmet Galley & 7326 Locked Fridge',
          deck: 'Upper Superstructure',
          detail:
            'Features a giant restaurant oven and a heavy steel padlock + 4-digit combination fridge (secret code "7326" — Na-Mi-Sa-N / Ro-Bi-N!) to stop Luffy from eating a week\'s supply of meat overnight!'
        },
        {
          id: 'infirmary-library',
          icon: '🩺',
          name: 'Chopper\'s Infirmary, Robin\'s Library & Bathhouse',
          deck: 'Upper Aft Dome',
          detail:
            'Chopper\'s swivel-chair medical clinic connects straight to a circular library bench (holding every crewmate\'s books except Luffy\'s!) topped by a warm Japanese sento bathhouse.'
        },
        {
          id: 'crows-nest-coup',
          icon: '🚀',
          name: 'Crow\'s Nest Gym & Aft Coup de Burst Rocket',
          deck: 'Fore-Mast Peak & Stern',
          detail:
            'High atop the foremast sits a domed observatory where Zoro trains with giant weights — while at the stern, 3 giant barrels of cola ignite Coup de Burst to blast the Sunny 1km across the sky!'
        }
      ]
    },
    {
      id: 'going-merry',
      name: 'Going Merry (The First Cherished Nakama Ship!)',
      shortName: 'Going Merry',
      era: 'east-blue',
      classType: 'Caravel (Whipstaff Rudder & Lateen Stern Sail)',
      shipwright: 'Designed by Merry (Syrup Village) • Gifted by Kaya',
      dimensions: 'Height: 13m • Length: 16m • Figurehead: White Ram!',
      blueprintMapId: 'reverse-mountain-x-map',
      accentColor: '#fef08a',
      hullColor: '#92400e',
      summary:
        'Gifted to the Straw Hats in Syrup Village after saving Kaya, the Going Merry carried Luffy, Zoro, Nami, Usopp, Sanji, Chopper, and Robin across East Blue, up Reverse Mountain, across Alabasta, 10,000 meters up the Knock Up Stream into Skypiea, and one miraculous final voyage through Aqua Laguna to Enies Lobby — animated by her loving Klabautermann ship spirit!',
      channels: [
        {
          channel: 'Feature 1',
          name: 'White Ram Figurehead ("Luffy\'s Special Seat")',
          era: 'east-blue',
          summary:
            'Curved white sheep horns where Captain Luffy always perched at the bow — shouting "Head straight into the Grand Line!"'
        },
        {
          channel: 'Feature 2',
          name: 'Whipstaff Rudder Pole (Inside Lounge)',
          era: 'east-blue',
          summary:
            'Instead of a spoked wheel, Merry used a classic 15th-century caravel whipstaff lever tilted left or right to turn the rudder!'
        },
        {
          channel: 'Feature 3',
          name: 'Flying Model (Jaya Chicken Crest & Wings)',
          era: 'pre-timeskip',
          summary:
            'Modified by Masira and Shoujou\'s Saruyama Alliance on Jaya with wooden wings and a rooster crest so Merry could glide onto Skypiea\'s Sea Clouds!'
        },
        {
          channel: 'Feature 4',
          name: 'Klabautermann (The Loving Ship Fairy)',
          era: 'pre-timeskip',
          summary:
            'Because the Straw Hats loved Merry like a true crewmate, a raincoated Klabautermann spirit manifested with a mallet in Skypiea and sailed Merry alone to save the crew at Enies Lobby!'
        }
      ],
      rooms: [
        {
          id: 'merry-ram',
          icon: '🐑',
          name: 'Sheep Figurehead & Forward Cannon',
          deck: 'Bow Deck',
          detail:
            'Houses 1 forward cannon inside the bow port directly beneath Luffy\'s favorite ram-head perch (plus 2 stern cannons aft).'
        },
        {
          id: 'merry-lounge',
          icon: '🧭',
          name: 'Meeting Lounge, Galley & Whipstaff Helm',
          deck: 'Main Cabin',
          detail:
            'Cozy wooden dining room where Sanji cooked, Nami drew her sea charts, and the crew steered via the ram-topped whipstaff pole.'
        },
        {
          id: 'merry-mikan',
          icon: '🍊',
          name: 'Nami\'s 3 Mikan Trees & Women\'s Quarters',
          deck: 'Stern Quarterdeck',
          detail:
            'Three tangerine trees from Bell-mère\'s grove in Cocoyasi Village stood proudly above Nami and Robin\'s cabin (protected fiercely by Sanji and Usopp!).'
        },
        {
          id: 'merry-klabautermann',
          icon: '✨',
          name: 'The Spirit of Going Merry (Klabautermann)',
          deck: 'Heart of the Keel',
          detail:
            '"Thank you for treasuring me..." Even with a broken keel, Merry begged Iceburg for one final repair and braved the storm to bring every Straw Hat home.'
        }
      ]
    }
  ];

  /**
   * Canonical Vivre Card — One Piece Visual Dictionary & Eiichiro Oda SBS Metadata
   * Covers all 38 characters (32 base + 6 Egghead/Elbaph legends).
   */
  const vivreMetadata = {
    luffy: {
      vivreId: '#0001',
      birthday: 'May 5 (Children\'s Day / Go-Mu)',
      originSea: 'East Blue (Foosha Village)',
      favoriteFood: 'ALL Kinds of Meat (Pirate Bone-In Roast!)',
      laugh: 'Shishishishi!',
      laughNote: 'Luffy\'s iconic carefree ear-to-ear grin laugh whenever adventure calls!',
      wanoLaughNote: 'Luffy\'s carefree ear-to-ear grin laugh (plus his joyful "Ahahahaha!" in Gear 5!)',
      laughPitch: 1.24,
      laughRate: 1.15
    },
    zoro: {
      vivreId: '#0002',
      birthday: 'November 11',
      originSea: 'East Blue (Shimotsuki Village)',
      favoriteFood: 'White Rice, Sea King Meat & Sake',
      laugh: 'Heh! Kukukuku...',
      laughNote: 'Zoro\'s fearless swordsman smirk before testing a cursed blade',
      laughPitch: 0.76,
      laughRate: 0.94
    },
    nami: {
      vivreId: '#0003',
      birthday: 'July 3 (Na-Mi)',
      originSea: 'East Blue (Cocoyasi Village)',
      favoriteFood: 'Mikan Tangerines & Fresh Fruit',
      laugh: 'Ufufufu~!',
      laughNote: 'Nami\'s sparkling Berry-treasure chuckle when negotiating a 300% loan!',
      laughPitch: 1.32,
      laughRate: 1.08
    },
    usopp: {
      vivreId: '#0004',
      birthday: 'April 1 (April Fools\' Day!)',
      originSea: 'East Blue (Syrup Village)',
      favoriteFood: 'Pike from an Autumn Island',
      laugh: 'Nyahahahaha! I have 8,000 followers!',
      laughNote: 'Brave Warrior Captain Usopp\'s boastful sniper laugh!',
      laughPitch: 1.15,
      laughRate: 1.12
    },
    sanji: {
      vivreId: '#0005',
      birthday: 'March 2 (Sa-N-Ji)',
      originSea: 'North Blue (Raised on Baratie, East Blue)',
      favoriteFood: 'Spicy Seafood Pasta & Black Tea',
      laugh: 'Mellorine~! Hahaha!',
      laughNote: 'Black Leg Sanji\'s joyful chef whirl whenever serving Nami-swan & Robin-chwan!',
      laughPitch: 1.05,
      laughRate: 1.1
    },
    chopper: {
      vivreId: '#0006',
      birthday: 'December 24 (Christmas Eve)',
      originSea: 'Grand Line (Drum Island)',
      favoriteFood: 'Cotton Candy, Chocolate & Sweet Treats!',
      laugh: 'Ehehehehe~ Calling me cute won\'t make me happy, you jerk!',
      laughNote: 'Doctor Chopper\'s wiggly noodle-dance giggle when complimented!',
      laughPitch: 1.52,
      laughRate: 1.16
    },
    robin: {
      vivreId: '#0007',
      birthday: 'February 6 (Ni-Ko)',
      originSea: 'West Blue (Ohara)',
      favoriteFood: 'Sandwiches, Cake & Rich Coffee',
      laugh: 'Dereshishishishi! Fufufu...',
      laughNote: 'Jaguar D. Saul taught little Robin to laugh "Dereshishishi" whenever life felt hard!',
      laughPitch: 1.12,
      laughRate: 0.98
    },
    franky: {
      vivreId: '#0008',
      birthday: 'March 9 (Cyborg / Sa-i-bo-gu)',
      originSea: 'South Blue (Raised in Water 7)',
      favoriteFood: 'Hamburgers, French Fries & Ice-Cold Cola!',
      laugh: 'SUUUUPER! Nahahaha!',
      laughNote: 'Cyborg Franky\'s forearm-star pose battle cry and booming laugh!',
      laughPitch: 0.82,
      laughRate: 1.04
    },
    brook: {
      vivreId: '#0009',
      birthday: 'April 3 (Yo-Mi)',
      originSea: 'West Blue',
      favoriteFood: 'Tea, Takoyaki & Bone-Building Milk!',
      laugh: 'Yohohohoho! Skull Joke!',
      laughNote: 'Soul King Brook\'s world-famous skeleton musician laugh!',
      laughPitch: 1.28,
      laughRate: 1.14
    },
    jinbe: {
      vivreId: '#0010',
      birthday: 'April 2',
      originSea: 'Fish-Man Island (-10,000m)',
      favoriteFood: 'Mozuku Seaweed in Vinegar & Fresh Fruit',
      laugh: 'Wahahahaha!',
      laughNote: 'First Son of the Sea Jinbe\'s warm, honorable helmsman belly laugh!',
      laughPitch: 0.68,
      laughRate: 0.92
    },
    buggy: {
      vivreId: '#0017',
      birthday: 'August 8 (Ba-Ra)',
      originSea: 'Grand Line',
      favoriteFood: 'Hot Dogs',
      laugh: 'Gyahahahaha!',
      laughNote: 'Genius Jester Buggy\'s flashy circus-tent cackle!',
      laughPitch: 1.22,
      laughRate: 1.18
    },
    roger: {
      vivreId: '#0014',
      birthday: 'December 31 (New Year\'s Eve)',
      originSea: 'East Blue (Loguetown)',
      favoriteFood: 'Higuma Shark Steak & Finest Sake',
      laugh: 'Wahahahaha! He laughed!',
      laughNote: 'Pirate King Gol D. Roger\'s legendary laugh upon beholding Joy Boy\'s treasure on Laugh Tale!',
      laughPitch: 0.78,
      laughRate: 1.02
    },
    whitebeard: {
      vivreId: '#0255',
      birthday: 'April 6 (Shi-Ro)',
      originSea: 'New World (Sphinx Island)',
      favoriteFood: 'Finest Sake & Cheap Diner Food',
      laugh: 'Gurarararara!',
      laughNote: 'Strongest Man in the World Edward Newgate\'s sea-shaking Quake-Quake laugh!',
      laughPitch: 0.58,
      laughRate: 0.88
    },
    shanks: {
      vivreId: '#0015',
      birthday: 'March 9',
      originSea: 'West Blue (God Valley)',
      favoriteFood: 'Lobster Fried Rice & Kimchi',
      laugh: 'Dahahahaha!',
      laughNote: 'Red-Haired Shanks\'s hearty tavern laugh with his crew!',
      laughPitch: 0.86,
      laughRate: 1.04
    },
    kaido: {
      vivreId: '#0961',
      birthday: 'May 1',
      originSea: 'Grand Line (Vodka Kingdom)',
      favoriteFood: 'Sake & Fish Skin Bar Snacks',
      laugh: 'Worororororo!',
      laughNote: 'King of the Beasts Kaido\'s thunderous dragon roar-laugh!',
      laughPitch: 0.55,
      laughRate: 0.94
    },
    'big-mom': {
      vivreId: '#0850',
      birthday: 'February 15',
      originSea: 'Grand Line',
      favoriteFood: 'Wedding Cake, Croquembouche & All Sweets!',
      laugh: 'Mamamamama! Hahaha!',
      laughNote: 'Emperor Charlotte Linlin\'s booming tea-party laugh across Totto Land!',
      laughPitch: 0.92,
      laughRate: 1.06
    },
    blackbeard: {
      vivreId: '#0220',
      birthday: 'August 3 (Ya-Mi)',
      originSea: 'Grand Line (Shade Port)',
      favoriteFood: 'Cherry Pie & Kebab!',
      laugh: 'Zehahahahahaha!',
      laughNote: 'Marshall D. Teach\'s unmistakable dream-chasing "Zehahaha!"',
      laughPitch: 0.64,
      laughRate: 1.08
    },
    oden: {
      vivreId: '#1070',
      birthday: 'February 22 (Boiling Hot Oden Day!)',
      originSea: 'New World (Wano Country — Flower Capital)',
      favoriteFood: 'Piping-Hot Oden Stew ("Oden Wouldn\'t Be Oden If It Wasn\'t Boiled!")',
      laugh: 'Wahahahaha! Born to Boil!',
      laughNote: 'Daimyo Kozuki Oden\'s fearless, larger-than-life samurai laugh!',
      laughPitch: 0.74,
      laughRate: 1.05
    },
    yamato: {
      vivreId: '#1099',
      birthday: 'November 3',
      originSea: 'New World (Onigashima)',
      favoriteFood: 'Oden & Raw Salmon Bite-by-Bite',
      laugh: 'Ahahahaha! I am Kozuki Oden!',
      laughNote: 'Yamato\'s exuberant adventurer laugh reading Oden\'s logbook!',
      laughPitch: 1.18,
      laughRate: 1.12
    },
    law: {
      vivreId: '#0399',
      birthday: 'October 6',
      originSea: 'North Blue (Flevance)',
      favoriteFood: 'Onigiri Rice Balls & Grilled Fish (Hates Bread!)',
      laugh: 'Fufu... Room: Shambles.',
      laughNote: 'Surgeon of Death Trafalgar Law\'s dry, tactical smirk!',
      laughPitch: 0.82,
      laughRate: 0.95
    },
    kid: {
      vivreId: '#0398',
      birthday: 'January 10',
      originSea: 'South Blue',
      favoriteFood: 'Cabbage Rolls',
      laugh: 'Dahahahaha! Punk Gibson!',
      laughNote: 'Captain Eustass Kid\'s wild metallic grin charging into Emperor territory!',
      laughPitch: 0.8,
      laughRate: 1.1
    },
    mihawk: {
      vivreId: '#0046',
      birthday: 'March 9',
      originSea: 'Grand Line',
      favoriteFood: 'Red Wine',
      laugh: 'Kukukuku... Wahahaha!',
      laughNote: 'Hawk-Eyes Mihawk\'s rare, thrilled laugh when Roronoa Zoro earns his respect!',
      laughPitch: 0.72,
      laughRate: 0.9
    },
    crocodile: {
      vivreId: '#0137',
      birthday: 'September 5',
      originSea: 'Grand Line',
      favoriteFood: 'Crocodile Meat & Tomatoes',
      laugh: 'Kuhahahahaha!',
      laughNote: 'Sir Crocodile\'s deep, cigar-chomping mastermind laugh ("Ah-ah-ah-ah!")!',
      laughPitch: 0.62,
      laughRate: 0.92
    },
    doflamingo: {
      vivreId: '#0212',
      birthday: 'October 23',
      originSea: 'Mary Geoise (Raised in North Blue)',
      favoriteFood: 'Lobster',
      laugh: 'Fuffuffuffuffu!',
      laughNote: 'Heavenly Yaksha Doflamingo\'s chilling pink-feathered "Fuffuffu!"',
      laughPitch: 1.08,
      laughRate: 1.18
    },
    hancock: {
      vivreId: '#0427',
      birthday: 'September 2',
      originSea: 'Calm Belt (Amazon Lily)',
      favoriteFood: 'Hot Pot',
      laugh: 'Ohohohoho! You are forgiven because I am beautiful!',
      laughNote: 'Pirate Empress Boa Hancock\'s royal, head-tilted-back laugh!',
      laughPitch: 1.25,
      laughRate: 1.04
    },
    garp: {
      vivreId: '#0081',
      birthday: 'May 2',
      originSea: 'East Blue (Goa Kingdom)',
      favoriteFood: 'Senbei Rice Crackers & Hot Tea',
      laugh: 'Bwahahahaha!',
      laughNote: 'Hero of the Marines Monkey D. Garp\'s booming grandpa laugh (right before falling asleep)!',
      laughPitch: 0.68,
      laughRate: 1.06
    },
    akainu: {
      vivreId: '#0364',
      birthday: 'August 16',
      originSea: 'North Blue',
      favoriteFood: 'White Rice & Spicy Peppers',
      laugh: 'Fuhahahaha... Thorough Justice!',
      laughNote: 'Fleet Admiral Sakazuki\'s grim volcanic rumble',
      laughPitch: 0.56,
      laughRate: 0.86
    },
    kizaru: {
      vivreId: '#0409',
      birthday: 'November 23',
      originSea: 'North Blue',
      favoriteFood: 'Miso Ramen, Pickled Ginger & Banana',
      laugh: 'Ototototo~ How scary~!',
      laughNote: 'Admiral Borsalino\'s famously slow, drawn-out sarcasm at the speed of light!',
      laughPitch: 0.88,
      laughRate: 0.76
    },
    aokiji: {
      vivreId: '#0275',
      birthday: 'September 21',
      originSea: 'South Blue',
      favoriteFood: 'Sherbet Ice & Snow Crab',
      laugh: 'Ararara~ Relax, relax...',
      laughNote: 'Kuzan\'s laid-back sleepy sigh before flash-freezing an entire ocean!',
      laughPitch: 0.75,
      laughRate: 0.84
    },
    ace: {
      vivreId: '#0134',
      birthday: 'January 1',
      originSea: 'South Blue (Baterilla — Raised in Foosha Village)',
      favoriteFood: 'Ghost Peppers (Alabasta Scorching Chili!)',
      laugh: 'Ahahahaha! Thanks for loving me!',
      laughNote: 'Fire Fist Portgas D. Ace\'s warm big-brother grin (right before falling asleep in his soup)!',
      laughPitch: 0.96,
      laughRate: 1.08
    },
    sabo: {
      vivreId: '#0531',
      birthday: 'March 20',
      originSea: 'East Blue (Goa Kingdom)',
      favoriteFood: 'Ramen Noodles',
      laugh: 'Ahahaha! Leave Luffy\'s back to me!',
      laughNote: 'Flame Emperor Sabo\'s bright brotherly laugh!',
      laughPitch: 1.02,
      laughRate: 1.08
    },
    katakuri: {
      vivreId: '#0860',
      birthday: 'November 25',
      originSea: 'Grand Line (Aboard Ship)',
      favoriteFood: 'Giant Frosted Donuts ("Merenda Time!")',
      laugh: 'Dooooonuts~! Fufufu!',
      laughNote: 'Katakuri\'s secret blissful song during his private 3 PM donut break!',
      laughPitch: 0.66,
      laughRate: 0.92
    },
    vegapunk: {
      vivreId: '#1141',
      birthday: 'August 9 (Pa-N-Ku / Punk!)',
      originSea: 'South Blue (Karakuri Island)',
      favoriteFood: 'Apples, Coffee & Domed Puddings',
      laugh: 'Quasar! Dehahahaha!',
      laughNote: 'Genius Scientist Dr. Vegapunk\'s "Quasar!" exclamation whenever a breakthrough strikes!',
      laughPitch: 1.18,
      laughRate: 1.14
    },
    kuma: {
      vivreId: '#0213',
      birthday: 'February 9 (Ni-Kyu / Paw!)',
      originSea: 'West Blue (Sorbet Kingdom)',
      favoriteFood: 'Honey & Salmon',
      eggheadFavoriteFood: 'Honey & Salmon (and Bonney\'s Margherita Pizza!)',
      laugh: 'Hmm... If you were to take a trip, where would you like to go?',
      laughNote: 'Bartholomew Kuma\'s quiet, solemn question before repelling travelers across the seas',
      eggheadLaugh: 'Heh... Happy 10th Birthday, Bonney.',
      eggheadLaughNote: 'Bartholomew Kuma\'s gentle, radiant Buccaneer father smile (dancing to Nika\'s "Dong-Da-Tot-To" rhythm!)',
      laughPitch: 0.64,
      laughRate: 0.88
    },
    bonney: {
      vivreId: '#0401',
      birthday: 'September 1',
      originSea: 'South Blue (Sorbet Kingdom)',
      favoriteFood: 'Margherita Pizza!',
      laugh: 'Gyahahaha! More pizza, barkeep!',
      laughNote: '"Big Eater" Jewelry Bonney\'s boisterous Sabaody tavern laugh over towering stacks of pizza!',
      eggheadLaugh: 'Ahahahaha! Give me a future just like Nika!',
      eggheadLaughNote: 'Jewelry Bonney\'s joyous laugh soaring alongside Luffy in Distorted Future Nika form!',
      laughPitch: 1.34,
      laughRate: 1.15
    },
    saturn: {
      vivreId: '#0215',
      birthday: 'World Gov Classified (Centuries Old)',
      originSea: 'Holy Land Mary Geoise',
      favoriteFood: 'Fine Tea & Royal Cuisine',
      laugh: 'Hmm... Insects do not comprehend.',
      laughNote: 'Elder Saint Jaygarcia Saturn\'s cold, abyssal Gyuki rumble',
      laughPitch: 0.52,
      laughRate: 0.82
    },
    lucci: {
      vivreId: '#0301',
      birthday: 'June 2',
      originSea: 'Grand Line',
      favoriteFood: 'Brandy on the Rocks',
      laugh: 'Fuhahaha... Dark Justice.',
      laughNote: 'CP0 Assassin Rob Lucci\'s predatory leopard purr-chuckle (and Hattori\'s "Coo!")',
      laughPitch: 0.74,
      laughRate: 0.94
    },
    'dorry-brogy': {
      vivreId: '#0107',
      birthday: 'October 2 (Dorry) & May 1 (Brogy)',
      originSea: 'New World (Elbaph — Warland)',
      favoriteFood: 'Roasted Dinosaur Ribs & Giant Barrels of Elbaph Ale!',
      laugh: 'Gegyagyagyagya! Gabababababa!',
      laughNote: 'The iconic duet of Dorry ("Gegyagyagya!") and Brogy ("Gababababa!") echoing across Little Garden & Elbaph!',
      laughPitch: 0.56,
      laughRate: 0.96
    }
  };

  const payload = { ships, vivreMetadata };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_SHIPS_AND_VIVRE = payload;
})(typeof window !== 'undefined' ? window : globalThis);
