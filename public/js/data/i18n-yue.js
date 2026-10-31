/**
 * Grand Line 3D Portal (V3) — Full Authentic Hong Kong Cantonese (粵語 / 廣東話) Dataset Localization
 * Covers all 38 Characters (with 4-tier Spoiler Shield era snapshots), 20 World Locations,
 * 6 Canonical Maps, 14 Timeline Arcs, 2 Ships, 21 Devil Fruits, 7 Lore Topics & 12 Quiz Questions.
 * Zero English sentences so Web Speech API (`zh-HK` / `yue-HK`) narrates 100% pure Cantonese.
 */

'use strict';

(function (root) {
  const CATEGORY_LABELS_YUE = {
    All: '全部地區',
    'Four Blues': '四海海域',
    'World Geography': '世界地理奇觀',
    'Grand Line — Paradise': '偉大航道・樂園',
    'Grand Line — New World': '偉大航道・新世界',
    'Sky Sea': '萬米空島白海',
    'Undersea Gateway': '萬米深海魚人島'
  };

  const FRUIT_CATEGORY_LABELS_YUE = {
    Paramecia: '超人系',
    'Paramecia (Special)': '特殊超人系',
    'Paramecia / Zoan (Mythical)': '超人系 ／ 動物系・幻獸種',
    Zoan: '動物系',
    'Zoan (Mythical)': '動物系・幻獸種',
    'Zoan (Awakened)': '動物系・覺醒型態',
    Logia: '自然系',
    'Logia (Unique)': '特殊自然系'
  };

  const characters = {
    luffy: {
      name: '蒙奇・D・路飛',
      epithet: '「草帽」路飛 —— 新世界四皇',
      role: '草帽海賊團船長',
      tier: '四皇級巔峰戰力',
      bountyText: '3,000,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '橡膠果實（覺醒真名：動物系人人果實・幻獸種・尼卡型態）',
      originSea: '東海（風車村）',
      birthday: '5月5日（兒童節）',
      favoriteFood: '所有肉類（最愛帶骨海賊大烤肉！）',
      laugh: '嘻嘻嘻嘻！',
      laughNote: '路飛每次見到新冒險嗰陣最招牌、最無憂無慮嘅燦爛大笑！',
      wanoLaughNote: '路飛招牌嘅「嘻嘻嘻嘻！」（加上五檔覺醒嗰陣自由奔放嘅「啊哈哈哈哈！」）',
      haki: [
        { name: '見聞色霸氣（預見未來）', advanced: true },
        { name: '武裝色霸氣（流櫻內部破壞）', advanced: true },
        { name: '霸王色霸氣（霸王色纏繞）', advanced: true }
      ],
      signatureMoves: [
        '五檔・橡膠猿神槍（島嶼級巨拳！）',
        '橡膠雷電（徒手捉住閃電掟出去！）',
        '四檔・蛇人及彈跳人',
        '橡膠火拳槍'
      ],
      kidBio:
        '路飛細個喺風車村唔小心食咗橡膠果實，全身變成好似彈弓咁有彈性嘅橡膠人！撒古斯救咗佢之後將心愛嘅草帽託付畀佢，路飛就立志集齊最可靠嘅夥伴闖入偉大航道。去到和之國鬼島決戰，佢仲覺醒咗果實真正嘅力量「五檔太陽神尼卡」，用解放之鼓嘅心跳聲同笑聲帶畀全世界自由！',
      bountyLabels: [
        '打敗惡龍後首次懸賞（東海最高！）',
        '阿拉巴斯坦打敗七武海克洛克達爾',
        '司法島救出魯賓・全員懸賞',
        '頂上戰爭震驚世界',
        '德雷斯羅薩打敗多佛朗明哥',
        '萬國篇後被封為「海上第五皇」',
        '鬼島打敗凱多・正式登頂新四皇！'
      ],
      eraSnapshots: {
        'east-blue': {
          epithet: '「草帽」路飛 —— 東海超新星船長',
          bountyText: '30,000,000',
          tier: '東海頭號超新星',
          devilFruit: '橡膠果實（超人系 —— 全身變成超強彈性橡膠！）',
          haki: [],
          signatureMoves: ['橡膠手槍！', '橡膠火箭炮！', '橡膠戰斧（一腳劈開惡龍領域！）'],
          kidBio:
            '路飛細個食咗橡膠果實變成橡膠人，戴住紅髮撒古斯託付嘅草帽由東海風車村出海！佢先後搵到卓洛、奈美、烏索普同山治做夥伴，仲一腳劈冧惡龍領域，攞到東海最高嘅三千萬貝里懸賞金！'
        },
        'pre-timeskip': {
          epithet: '「草帽」路飛 —— 超新星船長',
          bountyText: '400,000,000',
          tier: '偉大航道超新星王牌',
          devilFruit: '橡膠果實（研發出二檔加速同三檔骨氣球！）',
          haki: [{ name: '霸王色霸氣（潛意識爆發）', advanced: false }],
          signatureMoves: ['二檔・橡膠噴射機關槍！', '三檔・橡膠巨人手槍！', '橡膠暴風雨！'],
          kidBio:
            '路飛帶領草帽海賊團衝過顛倒山、拯救阿拉巴斯坦王國、飛上萬米高空嘅空島敲響黃金鐘，仲喺司法島研發出「二檔」同「三檔」救返魯賓，成為懸賞四億貝里嘅超新星！'
        }
      }
    },
    zoro: {
      name: '羅羅諾亞・卓洛',
      epithet: '「海賊獵人」卓洛 —— 閻王三刀流',
      role: '草帽海賊團劍士（戰鬥員）',
      tier: '四皇最高幹部級',
      bountyText: '1,111,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 三刀流極致劍術（和道一文字、三代鬼徹、閻魔）',
      originSea: '東海（霜月村）',
      birthday: '11月11日',
      favoriteFood: '白飯、海王類肉塊同埋美酒',
      laugh: '哼！咕咕咕咕……',
      laughNote: '卓洛面對強敵或者試用妖刀嗰陣無所畏懼嘅自信冷笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（黑刀硬化・流櫻）', advanced: true },
        { name: '霸王色霸氣（閻王三刀流纏繞！）', advanced: true }
      ],
      signatureMoves: [
        '閻王三刀流・一百三情飛龍侍極',
        '鬼氣九刀流・阿修羅拔劍亡者戲',
        '三刀流奧義・三千世界'
      ],
      kidBio:
        '路飛第一個招募嘅夥伴！卓洛雙手各揸一把刀、口咬第三把「和道一文字」，立誓要成為世界第一大劍豪。雖然佢係超級大路痴，行直線都會迷路，但一到戰鬥就會化身守護全團嘅鋼鐵劍豪，喺和之國仲馴服咗光月御田留下嘅名刀「閻魔」！',
      bountyLabels: [
        '阿拉巴斯坦斬鐵開眼（打敗達茲・波尼斯）',
        '司法島九刀流阿修羅覺醒',
        '德雷斯羅薩一刀劈開琵卡石像',
        '和之國懸賞提升',
        '鬼島打敗炎災燼・突破十一億貝里！'
      ],
      eraSnapshots: {
        'east-blue': {
          epithet: '「海賊獵人」卓洛',
          bountyText: '劍豪新星（即將懸賞）',
          tier: '東海頂尖劍士',
          haki: [],
          signatureMoves: ['三刀流・鬼斬！', '虎狩！', '三刀流奧義・三千世界！'],
          kidBio:
            '路飛第一個夥伴！自創雙手加口咬嘅「三刀流」，喺海上餐廳挑戰世界第一大劍豪「鷹眼」密佛格之後，流住眼淚向路飛發誓以後絕對唔會再輸任何一場！'
        },
        'pre-timeskip': {
          epithet: '「海賊獵人」卓洛 —— 十一位超新星之一',
          bountyText: '120,000,000',
          tier: '超新星大劍豪',
          haki: [],
          signatureMoves: ['一刀流居合・獅子歌歌（斬鐵！）', '鬼氣九刀流・阿修羅壹霧銀', '百八煩惱鳳'],
          kidBio:
            '喺阿拉巴斯坦領悟「斬鐵」境界，喺司法島施展九刀流阿修羅，仲喺恐怖三桅帆船默默承受晒路飛所有痛苦與疲勞，講出一句震撼人心嘅「乜事都冇發生過」！'
        }
      }
    },
    sanji: {
      name: '文斯莫克・山治',
      epithet: '「黑足」山治',
      role: '草帽海賊團廚師',
      tier: '四皇最高幹部級',
      bountyText: '1,032,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 黑足踢技及魔神風腳蒼藍高熱火焰！',
      originSea: '北海出生（喺東海海上餐廳巴拉蒂長大）',
      birthday: '3月2日',
      favoriteFood: '香辣海鮮意粉配紅茶',
      laugh: '靚女呀～！哈哈哈！',
      laughNote: '山治每次端出大餐招待奈美小姐同魯賓小姐嗰陣轉圈歡呼嘅笑聲！',
      haki: [
        { name: '見聞色霸氣（極速感知專家）', advanced: true },
        { name: '武裝色霸氣（外骨骼加乘高熱火焰）', advanced: true }
      ],
      signatureMoves: [
        '魔神風腳・牛肉爆裂踢！（藍白色閃電高熱火焰！）',
        '惡魔風腳・一級絞肉踢',
        '空中步行（月步飛天！）'
      ],
      kidBio:
        '草帽海賊團嘅一流海上廚師！為咗保護用來煮餸嘅雙手，山治堅持只用雙腳戰鬥。佢嘅夢想係搵到傳說中集合東南西北四海所有魚類嘅奇蹟之海「蔚藍海域」。無論肚餓嘅係朋友定敵人，山治都絕對唔會見死不救；喺鬼島仲覺醒咗超高速「魔神風腳」打飛疫災奎因！',
      bountyLabels: [
        '司法島後首張手繪搞笑懸賞令！',
        '德雷斯羅薩「只限活捉」懸賞令',
        '萬國蛋糕島篇後懸賞飆升',
        '和之國篇中期紀錄',
        '鬼島打敗疫災奎因・突破十億貝里！'
      ],
      eraSnapshots: {
        'east-blue': {
          name: '山治',
          bountyText: '巴拉蒂副料理長',
          tier: '東海踢技高手',
          devilFruit: '無惡魔果實 —— 紅腳哲普親傳黑足踢技！',
          haki: [],
          signatureMoves: ['羊肉踢！', '肩肉踢！', '首肉踢！'],
          kidBio:
            '東海海上餐廳巴拉蒂嘅副料理長，由「紅腳」哲普一手養大！為咗保護廚師神聖嘅雙手只用雙腳踢擊，懷住尋找奇蹟之海「蔚藍海域」嘅夢想加入草帽海賊團！'
        },
        'pre-timeskip': {
          name: '山治',
          bountyText: '77,000,000（搞笑手繪畫像！）',
          tier: '偉大航道主力幹部',
          devilFruit: '無惡魔果實 —— 高速旋轉摩擦點燃「惡魔風腳」！',
          haki: [],
          signatureMoves: ['惡魔風腳・畫龍點睛踢！', '粗碎踢', '「王子先生」奇謀破壞行動'],
          kidBio:
            '喺阿拉巴斯坦化名「王子先生」智破克洛克達爾，喺空島潛入方舟箴言破壞引擎，仲喺司法島高速旋轉雙腳擦出烈火「惡魔風腳」擊敗狼人加布拉！'
        }
      }
    },
    nami: {
      name: '奈美',
      epithet: '「小賊貓」奈美',
      role: '草帽海賊團航海士',
      tier: '四皇幹部級（宙斯天候棒！）',
      bountyText: '366,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 魔法天候棒配合雷雲宙斯！',
      originSea: '東海（可可亞西村）',
      birthday: '7月3日',
      favoriteFood: '蜜柑同各式新鮮生果',
      laugh: '唔呵呵呵～！',
      laughNote: '奈美見到貝里財寶或者計緊三倍利息嗰陣眼閃閃嘅笑聲！',
      haki: [],
      signatureMoves: [
        '宙斯微風雷霆（追蹤閃電狼牙棒！）',
        '海市蜃樓天候（空氣折射隱形術）',
        '狂風暴雨天候'
      ],
      kidBio:
        '草帽海賊團不可或缺嘅天才航海士！奈美單靠皮膚感覺海風、氣壓同雲層變化，就可以提前預測偉大航道最狂暴嘅反常天氣，夢想係親手畫出全世界嘅完整海圖。武器係烏索普同芬奇打造嘅天候棒，裡面仲住咗貪食雷雲拍檔「宙斯」！',
      bountyLabels: [
        '司法島打敗卡莉法後首次懸賞',
        '德雷斯羅薩篇後懸賞提升',
        '萬國篇收服雷雲宙斯',
        '鬼島決戰擊敗烏爾蒂！'
      ],
      eraSnapshots: {
        'east-blue': {
          bountyText: '天才航海士',
          tier: '東海頂尖航海家',
          devilFruit: '無惡魔果實 —— 氣象直覺與三節長棍術',
          signatureMoves: ['三節長棍連擊', '風暴氣壓預判', '繪製世界海圖'],
          kidBio:
            '來自東海可可亞西村嘅天才航海士！路飛幫佢擊潰惡龍海賊團、奪回自由之後，奈美正式掌管前進梅利號嘅航線，向繪製全世界海圖嘅夢想出發！'
        },
        'pre-timeskip': {
          bountyText: '16,000,000',
          tier: '偉大航道天候魔術師',
          devilFruit: '無惡魔果實 —— 完全版天候棒（冷氣泡、熱氣泡、電氣泡！）',
          signatureMoves: ['雷霆天候！', '海市蜃樓天候（折射分身！）', '黑雲旋風天候'],
          kidBio:
            '精準帶領前進梅利號衝上空島激流，仲用烏索普研發嘅天候棒控制冷熱氣流製造真實閃電同海市蜃樓，喺司法島智取秘密諜報員卡莉法！'
        }
      }
    },
    usopp: {
      name: '烏索普',
      epithet: '「大神」烏索普 —— 狙擊王',
      role: '草帽海賊團狙擊手',
      tier: '四皇幹部級神射手',
      bountyText: '500,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 黑兜彈弓與波音列島突擊植物種子！',
      originSea: '東海（西羅布村）',
      birthday: '4月1日（愚人節！）',
      favoriteFood: '秋島出產嘅鮮美秋刀魚',
      laugh: '呀哈哈哈哈！我有八千個部下跟住我㗎！',
      laughNote: '勇敢海上戰士烏索普船長最經典嘅吹牛大笑！',
      haki: [{ name: '見聞色霸氣（超遠距離透視鎖定！）', advanced: false }],
      signatureMoves: [
        '必殺・綠星骷髏爆炸草！',
        '超遠程袋鼠彈（德雷斯羅薩隔牆神射！）',
        '必殺・火鳥星（司法島射穿世界政府旗幟！）'
      ],
      kidBio:
        '雖然平時好驚青又鍾意講大話，但只要同伴嘅夢想俾人嘲笑或者陷入危機，烏索普永遠都會挺身而出，成為真正「勇敢嘅海上戰士」！佢喺小花園受巨人族東利同布洛基啟發，一直夢想踏上巨人王國艾爾巴夫，仲喺德雷斯羅薩覺醒見聞色霸氣，獲得五億貝里「大神烏索普」稱號！',
      bountyLabels: [
        '司法島化身「狙擊王」首次懸賞！',
        '德雷斯羅薩拯救數千玩具・封號「大神」烏索普！',
        '和之國篇懸賞紀錄',
        '鬼島大戰後懸賞飆升至五億貝里！'
      ],
      eraSnapshots: {
        'east-blue': {
          epithet: '神射手烏索普',
          bountyText: '百發百中狙擊手',
          tier: '東海神射手',
          devilFruit: '無惡魔果實 —— 彈弓百發百中與機智陷阱！',
          haki: [],
          signatureMoves: ['必殺・火藥星！', '必殺・鉛星及雞蛋星！', '烏索普鐵鎚心理戰！'],
          kidBio:
            '紅髮海賊團神射手耶穌布個仔！為咗守護西羅布村同可雅小姐挺身作戰，立志成為「勇敢嘅海上戰士」，仲親手畫出草帽海賊團嘅海賊旗！'
        },
        'pre-timeskip': {
          epithet: '「狙擊王」—— 來自狙擊島嘅英雄',
          bountyText: '30,000,000',
          tier: '偉大航道傳奇神射手',
          devilFruit: '無惡魔果實 —— 巨型彈弓「兜」配空島衝擊貝！',
          haki: [],
          signatureMoves: ['必殺・火鳥星（射穿世界政府旗幟！）', '向日葵星連射', '十噸黃金鐵鎚大作戰！'],
          kidBio:
            '戴上面具化身「狙擊王」衝入司法島！企喺正義之塔頂端逆風遠距離精準射開魯賓手銬鎖匙，幫全團創造奇蹟！'
        }
      }
    },
    chopper: {
      name: '托尼托尼・喬巴',
      epithet: '「最愛棉花糖」喬巴',
      role: '草帽海賊團船醫',
      tier: '天才船醫與七段變身戰士',
      bountyText: '1,000（俾海軍誤當係寵物！）',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '人人果實（動物系 —— 加上自製藍波球七段變身！）',
      originSea: '偉大航道（磁鼓島）',
      birthday: '12月24日（平安夜）',
      favoriteFood: '棉花糖、朱古力同所有甜品！',
      laugh: '誒嘿嘿嘿～就算你讚我得意，我都唔會開心㗎你個衰鬼！',
      laughNote: '喬巴俾人讚嗰陣一邊扭身扭勢跳舞、一邊口不對心嘅可愛笑聲！',
      haki: [],
      signatureMoves: [
        '怪物強化（受凱撒指點後可持續作戰三十分鐘！）',
        '柔力強化・刻蹄櫻吹雪',
        '戰場極速冰鬼病毒抗體研製'
      ],
      kidBio:
        '原本係磁鼓島一隻天生藍鼻嘅馴鹿，食咗「人人果實」之後獲得人類智慧同說話能力。喺希魯魯克醫生同古蕾娃醫娘教導下，喬巴立志成為「乜嘢病都醫得好嘅萬能藥」！雖然海軍一直以為佢係草帽團寵物只懸賞一千貝里，但佢嘅怪物強化曾經一掌打飛疫災奎因！',
      bountyLabels: [
        '司法島後俾海軍當成寵物首次懸賞（50貝里！）',
        '德雷斯羅薩篇後加價到100貝里！',
        '和之國篇紀錄',
        '鬼島硬撼奎因同拯救全場傷兵（1,000貝里！）'
      ],
      eraSnapshots: {
        'east-blue': {
          bountyText: '磁鼓島天才小船醫',
          signatureMoves: ['藍波球七段變身', '刻蹄・十字架！', '毛皮強化防禦氣墊！'],
          kidBio:
            '磁鼓島嘅藍鼻小馴鹿，食咗人人果實後跟希魯魯克同朵麗兒醫娘學醫，夢想成為能夠醫治世上所有疾病嘅「萬能藥」！'
        },
        'pre-timeskip': {
          bountyText: '50（俾海軍誤當成寵物！）',
          signatureMoves: ['藍波球・腕力強化刻蹄櫻！', '頭腦強化・弱點診斷', '失控暴走・怪物強化！'],
          kidBio:
            '草帽海賊團嘅可愛天才船醫！自製「藍波球」突破動物系三段變身極限變成七段變身，喺司法島擊敗偎取，卻因為太得意俾海軍當成寵物只懸賞五十貝里！'
        }
      }
    },
    robin: {
      name: '妮歌・魯賓',
      epithet: '「惡魔之子」妮歌・魯賓 —— 革命之燈',
      role: '草帽海賊團考古學家',
      tier: '四皇幹部級・唯一歷史本文解讀者',
      bountyText: '930,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '花花果實（超人系 —— 喺任何地方長出無數手臂與巨大分身！）',
      originSea: '西海（考古學聖地奧哈拉）',
      birthday: '2月6日',
      favoriteFood: '三文治、蛋糕配香濃咖啡',
      laugh: '嗲嘞嘻嘻嘻嘻！呵呵呵……',
      laughNote: '巨人薩烏羅教細個嘅魯賓喺難過嗰陣都要笑出聲嘅「嗲嘞嘻嘻嘻」！',
      haki: [],
      signatureMoves: [
        '惡魔風・萬紫千紅巨大樹關節技！',
        '萬紫千紅・魚人空手道花傘擊',
        '百花繚亂・大飛燕草'
      ],
      kidBio:
        '八歲就考獲奧哈拉考古學博士資格嘅天才學者，亦係現今世上極少數識得解讀古代文字「歷史本文」嘅關鍵人物！以前一直孤身逃亡，直到喺司法島大喊出「我想活下去！」之後，將性命完全交託畀草帽一夥。喺鬼島決戰擊敗黑色瑪利亞，懸賞高達九億三千萬貝里！',
      bountyLabels: [
        '八歲奧哈拉倖存者首次懸賞',
        '司法島奪還戰後懸賞更新',
        '德雷斯羅薩篇後懸賞提升',
        '鬼島化身惡魔花擊敗黑色瑪利亞・懸賞九億三千萬！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '80,000,000',
          tier: '奧哈拉歷史本文學者',
          signatureMoves: ['三十輪花・絞殺！', '百花繚亂・大飛燕草（花翼滑翔）', '六輪花・關節折'],
          kidBio:
            '唯一能夠解讀「歷史本文」石碑嘅考古學家！喺司法島面對全團唔顧世界政府宣戰都要救佢嘅真心，終於喊住講出「我想活下去！帶我一齊去大海啦！」'
        }
      }
    },
    franky: {
      name: '芬奇',
      epithet: '「鐵人」改造人芬奇',
      role: '草帽海賊團船匠',
      tier: '四皇幹部級天才船匠',
      bountyText: '394,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 可樂動力改造人及芬奇將軍合體機械人！',
      originSea: '南海出生（喺水之七島長大）',
      birthday: '3月9日',
      favoriteFood: '漢堡包、炸薯條配冰凍可樂！',
      laugh: '超——級——！納哈哈哈！',
      laughNote: '改造人芬奇雙手合出藍色星星姿勢嗰陣最熱血嘅吶喊同笑聲！',
      haki: [],
      signatureMoves: [
        '芬奇鐳射光束！（貝加龐克設計圖高能激光！）',
        '鐵人海賊・芬奇將軍（瓦波合金合體機甲！）',
        '風來炮！（高壓可樂空氣衝擊炮！）'
      ],
      kidBio:
        '傳奇船匠湯姆先生嘅徒弟（湯姆正正就係幫海賊王羅傑建造黃金傑克森號嘅大師）！芬奇用無價之寶「寶樹亞當」親手打造出夢幻海賊船「千陽號」，為咗見證愛船繞行世界一周而上船做船匠。佢個肚入面裝住三枝冰凍可樂做燃料，仲可以用瓦波合金合體成「芬奇將軍」！',
      bountyLabels: [
        '司法島燒毀冥王設計圖後首次懸賞',
        '德雷斯羅薩硬漢決鬥擊敗粉紅先生（懸賞相片竟然係芬奇將軍！）',
        '鬼島擊敗飛六胞佐佐木（懸賞相片變咗千陽號船頭！）'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '「改造人」芬奇',
          bountyText: '44,000,000',
          devilFruit: '無惡魔果實 —— 可樂動力改造人重裝武器庫！',
          signatureMoves: ['風來炮！', '強壯右手飛拳！', '武器左手連射炮！'],
          kidBio:
            '水之七島嘅熱血改造人船匠！親手燒毀古代兵器冥王設計圖保護世界，再用寶樹亞當為草帽一夥建造出「千陽號」一齊闖蕩大海！'
        }
      }
    },
    brook: {
      name: '布魯克',
      epithet: '「靈魂之王」布魯克',
      role: '草帽海賊團音樂家及劍士',
      tier: '四皇幹部級・黃泉寒氣劍士',
      bountyText: '383,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '黃泉果實（超人系 —— 靈魂出竅與黃泉極寒劍術！）',
      originSea: '西海',
      birthday: '4月3日',
      favoriteFood: '紅茶、章魚燒同補鈣鮮奶！',
      laugh: '喲呵呵呵呵！骷髏頭冷笑話！',
      laughNote: '世界巡迴搖滾巨星「靈魂之王」布魯克最標誌性嘅骷髏笑聲！',
      haki: [],
      signatureMoves: [
        '鼻唄三丁・矢筈斬（行過三步敵人先發現中劍結冰！）',
        '靈魂之王演唱會催眠曲',
        '黃泉寒氣・掠奪之歌吹雪斬'
      ],
      kidBio:
        '頂住爆炸頭嘅風趣骷髏音樂家！五十年前布魯克同倫巴海賊團喺顛倒山應承過小鯨魚「拉布」，繞行偉大航道一周之後一定返去見佢。食咗黃泉果實復活嘅布魯克體重極輕，可以直接喺海面上狂奔，喺萬國篇仲單挑大媽成功拓印路標歷史本文！',
      bountyLabels: [
        '五十年前倫巴海賊團生前懸賞',
        '兩年後世界巡迴搖滾巨星「靈魂之王」海報懸賞',
        '萬國智盜拓印本及鬼島大戰後懸賞三億八千三百萬！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '「鼻唄」布魯克',
          bountyText: '33,000,000',
          devilFruit: '黃泉果實（賜予第二次生命嘅爆炸頭骷髏劍士！）',
          signatureMoves: ['鼻唄三丁・矢筈斬！', '催眠曲・輪舞', '賓克斯的美酒大合唱！'],
          kidBio:
            '喺魔鬼三角地帶漂流五十年嘅爆炸頭骷髏音樂家！為咗履行同雙子岬島嶼鯨魚「拉布」重逢嘅約定，正式成為草帽一夥期待已久嘅音樂家！'
        }
      }
    },
    jinbe: {
      name: '甚平',
      epithet: '「海俠」甚平',
      role: '草帽海賊團掌舵手',
      tier: '四皇最高幹部級・前王下七武海',
      bountyText: '1,100,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 魚人空手道及魚人柔術宗師（大海就係武器！）',
      originSea: '魚人島（海底一萬米）',
      birthday: '4月2日',
      favoriteFood: '醋漬水雲海藻配新鮮生果',
      laugh: '哇哈哈哈哈！',
      laughNote: '海俠甚平豪邁仗義、穩如泰山嘅掌舵手大笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（梅花皮全身鋼鐵防禦）', advanced: true }
      ],
      signatureMoves: [
        '魚人空手道奧義・鬼瓦正拳！',
        '魚人柔術・海流一本背負投（直接舉起整條海浪拋擲！）',
        '五千枚瓦正拳'
      ],
      kidBio:
        '重情重義嘅鯨鯊魚人宗師、前太陽海賊團船長及前王下七武海！喺推進城、頂上戰爭同魚人島多次拼命守護路飛並捐血救佢一命，喺大媽面前霸氣敬酒退團，講出「我未來係海賊王嘅同伴，點會驚區區四皇」！由佢掌舵，千陽號連巨浪內部都可以當隧道衝過去！',
      bountyLabels: [
        '加入七武海後凍結懸賞',
        '頂上戰爭辭去七武海後懸賞突破四億',
        '鬼島擊敗福茲・胡・懸賞高達十一億貝里！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '250,000,000（辭去七武海前）',
          haki: [],
          kidBio:
            '被譽為「海俠」嘅鯨鯊魚人、王下七武海之一！為咗反對與白鬍子開戰寧願被關入推進城，之後一路同路飛並肩衝上馬林梵多，喺絕境中拯救路飛！'
        }
      }
    },
    buggy: {
      name: '「千兩道化」巴基',
      epithet: '「天才小丑」—— 新世界四皇・十字公會總裁！',
      role: '巴基速遞及十字公會表面領袖',
      tier: '四皇頭銜（運氣點滿傳奇！）',
      bountyText: '3,189,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '四分五裂果實（超人系 —— 全身自由分裂免疫一切斬擊！）',
      originSea: '偉大航道',
      birthday: '8月8日',
      favoriteFood: '熱狗腸仔包',
      laugh: '嘎哈哈哈哈！',
      laughNote: '巴基船長最誇張、最華麗嘅馬戲團大笑！',
      haki: [],
      signatureMoves: [
        '特製巴基炮彈（同小型馬基炮彈！）',
        '四分五裂嘉年華（免疫鷹眼黑刀斬擊！）',
        '向十字公會激昂大喊：「我哋一齊去搶大秘寶啦！」'
      ],
      kidBio:
        '曾經同紅髮撒古斯一齊喺海賊王羅傑船上做見習生！雖然戰鬥力唔高，但巴基憑住天跌落嚟嘅搞笑好運同誤會，由推進城逃犯一路升做七武海，甚至因為海軍誤會鷹眼同克洛克達爾係佢手下而被封為「新四皇」！但去到最終章，佢竟然真係重拾少年初心公開爭奪大秘寶！',
      bountyLabels: [
        '東海橘子鎮初期懸賞',
        '加入王下七武海後凍結懸賞',
        '十字公會誤會加成・高達三十一億八千九百萬新四皇！'
      ],
      eraSnapshots: {
        'east-blue': {
          epithet: '「小丑」巴基',
          bountyText: '15,000,000',
          tier: '東海海賊船長',
          signatureMoves: ['特製巴基炮彈！', '四分五裂飛刀陣', '四分五裂緊急逃脫！'],
          kidBio:
            '佔據東海橘子鎮嘅馬戲團海賊船長！食咗四分五裂果實令全身可以分開飛舞，最忌人哋笑佢個大紅鼻，曾經刺穿路飛頂草帽而俾路飛一腳轟飛！'
        },
        'pre-timeskip': {
          epithet: '「小丑」巴基 —— 前羅傑海賊團見習生',
          bountyText: '15,000,000（推進城人氣王！）',
          tier: '偉大航道風雲人物',
          signatureMoves: ['特製馬基炮彈（藏喺鞋底！）', '四分五裂免疫斬擊（硬接鷹眼黑刀！）', '電話蟲直播騷！'],
          kidBio:
            '喺推進城同路飛聯手越獄，仲喺頂上戰爭發現佢原來係海賊王羅傑船上嘅見習生、紅髮撒古斯嘅舊拍檔，意外收服大批囚犯追隨者！'
        }
      }
    },
    roger: {
      name: '哥爾・D・羅傑',
      epithet: '「海賊王」',
      role: '羅傑海賊團船長（唯一征服偉大航道之人）',
      tier: '傳說海賊王級',
      bountyText: '5,564,800,000（史上最高海賊懸賞！）',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實！純靠震天動地嘅霸氣與無上大快刀「艾斯」！',
      originSea: '東海（羅格鎮）',
      birthday: '12月31日（除夕）',
      favoriteFood: '鯊魚扒配頂級美酒',
      laugh: '哇哈哈哈哈！佢開懷大笑！',
      laughNote: '海賊王羅傑喺最終之島親眼見到喬伊波伊留低嘅大秘寶嗰陣震動歷史嘅大笑！',
      haki: [
        { name: '見聞色霸氣（傾聽萬物之聲）', advanced: true },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（隔空對撞震裂蒼穹！）', advanced: true }
      ],
      signatureMoves: [
        '神避！（霸王色纏繞一閃轟飛光月御田！）',
        '與白鬍子雙皇霸氣隔空裂天斬'
      ],
      kidBio:
        '八百年來第一位帶領船員繞行地球一周、抵達最終之島「拉夫德爾」嘅傳奇船長！羅傑完全冇食過惡魔果實，全靠登峰造極嘅霸氣同無畏冒險心稱霸大海。當佢讀完喬伊波伊留低嘅歷史故事後開懷大笑，臨終前喺羅格鎮一句說話開啟咗「大海賊時代」！',
      eraSnapshots: {
        'east-blue': {
          bountyText: '傳說中嘅海賊王',
          haki: [],
          signatureMoves: ['征服偉大航道全海域', '開啟大海賊時代嘅臨終宣言！'],
          kidBio:
            '獲得財富、名聲、力量世上一切嘅傳說海賊王！喺東海羅格鎮行刑台上笑住宣布：「想要我嘅財寶咩？想要嘅話就出海搵啦！我將全世界嘅一切都擺晒喺嗰度！」'
        }
      }
    },
    whitebeard: {
      name: '愛德華・紐蓋特（白鬍子）',
      epithet: '「世界最強男人」',
      role: '白鬍子海賊團船長',
      tier: '傳說四皇巔峰',
      bountyText: '5,046,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '震震果實（超人系最強 —— 徒手震裂空氣同大海！）',
      originSea: '新世界（斯芬克斯島）',
      birthday: '4月6日',
      favoriteFood: '頂級美酒配平價酒館家常菜',
      laugh: '咕啦啦啦啦！',
      laughNote: '世界最強男人白鬍子同「兒子們」飲酒談心嗰陣豪邁震海嘅笑聲！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（裂天級纏繞）', advanced: true }
      ],
      signatureMoves: [
        '海震！（雙手抓裂大氣掀起巨型海嘯！）',
        '無上大快刀「叢雲切」震波斬',
        '兜割空震重拳'
      ],
      kidBio:
        '同海賊王羅傑平起平坐嘅傳奇大海賊！但白鬍子一生從來唔貪金銀財寶，佢最渴望嘅寶物就係「屋企人」，將全船同伴都當成親生仔女咁痛錫。頂上戰爭最後一刻，佢屹立不倒向全世界高呼：「大秘寶係真實存在㗎！」'
    },
    shanks: {
      name: '「紅髮」撒古斯',
      epithet: '「紅髮」撒古斯 —— 新世界四皇',
      role: '紅髮海賊團大頭目',
      tier: '四皇巔峰霸氣王者',
      bountyText: '4,048,900,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 預見十秒未來與當代最強霸王色霸氣！',
      originSea: '西海（神之谷）',
      birthday: '3月9日',
      favoriteFood: '龍蝦炒飯配泡菜',
      laugh: '大哈哈哈哈！',
      laughNote: '紅髮撒古斯喺酒館同夥伴舉杯暢飲嗰陣爽朗豁達嘅笑聲！',
      haki: [
        { name: '見聞色霸氣（預見未來十秒及「見聞殺」）', advanced: true },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（數十里外雷霆威壓！）', advanced: true }
      ],
      signatureMoves: [
        '神避！（傳承自羅傑船長嘅霸王色劍技！）',
        '名劍「格里芬」隔海霸王色威懾'
      ],
      kidBio:
        '啟發路飛出海嘅人生導師！當年喺東海風車村為咗喺近海之王口中救出細個嘅路飛，撒古斯甘願犧牲左臂，並將羅傑傳落嚟嘅草帽戴喺路飛頭上：「等你成為出色嘅海賊嗰陣先還畀我啦！」即使唔食惡魔果實，佢依然係君臨新世界嘅四皇！',
      eraSnapshots: {
        'east-blue': {
          epithet: '「紅髮」撒古斯 —— 路飛嘅啟蒙恩人',
          bountyText: '偉大航道大海賊',
          signatureMoves: ['名劍格里芬劍術', '一個眼神嚇退近海之王！'],
          kidBio:
            '停泊喺風車村嘅爽朗大海賊！平時就算俾山賊淋酒都只係哈哈大笑，但一旦有人傷害佢嘅朋友就絕對唔會原諒，救咗路飛一命並託付草帽訂立再會之約！'
        }
      }
    },
    kaido: {
      name: '「百獸」凱多',
      epithet: '「百獸之王」—— 海陸空最強生物',
      role: '百獸海賊團總督（鬼島）',
      tier: '四皇級最強肉體',
      bountyText: '4,611,100,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '魚魚果實・幻獸種・青龍型態（召喚焰雲托起成座鬼島！）',
      originSea: '偉大航道（伏特加王國）',
      birthday: '5月1日',
      favoriteFood: '烈酒配香脆魚皮下酒菜',
      laugh: '唔囉囉囉囉囉！',
      laughNote: '百獸凱多化身為擎天青龍震動雲霄嘅狂暴大笑！',
      haki: [
        { name: '見聞色霸氣（預見未來）', advanced: true },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（雷鳴八卦霸王纏繞！）', advanced: true }
      ],
      signatureMoves: [
        '雷鳴八卦！（狼牙棒「八齋戒」光速突襲！）',
        '熱息！（一炮融化山頂嘅龍炎吐息！）',
        '火龍大炬（全身化為熔岩巨龍嘅終極大招！）'
      ],
      kidBio:
        '被世人稱為「單挑最強生物」嘅百獸海賊團總督！食咗青龍幻獸種果實之後，可以化身為盤旋天際嘅巨大藍龍，仲用焰雲將成座鬼島托上和之國高空，最終喺鬼島屋頂同覺醒五檔嘅路飛展開驚天動地嘅決戰！'
    },
    'big-mom': {
      name: '夏洛特・玲玲（大媽）',
      epithet: '新世界四皇 —— 萬國托特蘭女王',
      role: '大媽海賊團船長',
      tier: '四皇級天災戰力',
      bountyText: '4,388,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '魂魂果實（超人系 —— 賦予雷雲宙斯、太陽普羅米修斯同巨劍拿破崙生命！）',
      originSea: '偉大航道',
      birthday: '2月15日',
      favoriteFood: '巨型結婚蛋糕、泡芙塔同天下所有甜品！',
      laugh: '媽媽媽媽媽！哈哈哈！',
      laughNote: '四皇大媽開茶會食甜品嗰陣響徹萬國三十四座甜品島嘅笑聲！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（天生鋼鐵氣球防禦）', advanced: true },
        { name: '霸王色霸氣（霸王色纏繞）', advanced: true }
      ],
      signatureMoves: [
        '威國！（巨劍拿破崙劈開大海嘅衝擊波！）',
        '鳴光炮（雷火劍三合一合體炮！）',
        '靈魂咒文：「留低甜品定係留低壽命？」'
      ],
      kidBio:
        '統治由三十四座甜品島組成嘅「萬國托特蘭」嘅四皇女王！佢利用魂魂果實令花草樹木、餅乾士兵甚至雷雲同太陽都開口唱歌，天生擁有刀槍不入嘅「鋼鐵氣球」體質，最後喺鬼島俾羅同基德聯手覺醒大招擊落！'
    },
    blackbeard: {
      name: '馬歇爾・D・汀奇（黑鬍子）',
      epithet: '新世界四皇 —— 史上唯一雙惡魔果實能力者',
      role: '黑鬍子海賊團提督',
      tier: '四皇級宿命強敵',
      bountyText: '3,996,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '暗暗果實 ＋ 震震果實（雙果實同時發動！）',
      originSea: '偉大航道',
      birthday: '8月3日',
      favoriteFood: '車厘子批配烤肉串！',
      laugh: '賊哈哈哈哈哈哈！',
      laughNote: '黑鬍子汀奇喺加雅島高呼「人嘅夢想係唔會終結㗎！」之後最邪氣嘅招牌大笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: false }
      ],
      signatureMoves: [
        '暗水！（黑洞引力吸住對手並令惡魔果實能力瞬間失效！）',
        '暗穴道（吞沒整座城鎮嘅黑暗重力！）',
        '雙手齊發：左手黑暗引力 ＋ 右手震震空氣裂擊！'
      ],
      kidBio:
        '路飛爭奪海賊王寶座路上最深不可測嘅宿敵！喺加雅島酒館雖然口味同路飛完全相反，但同樣深信空島同夢想真實存在。佢打破歷史鐵律，同時奪得「暗暗果實」同白鬍子嘅「震震果實」兩種逆天力量！',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '「黑鬍子」汀奇 —— 新任王下七武海',
          bountyText: '0（剛從隱藏實力中崛起！）',
          tier: '危險野心家'
        }
      }
    },
    oden: {
      name: '光月御田',
      epithet: '九里大名 —— 和之國傳說大武士！',
      role: '白鬍子海賊團二番隊隊長 ／ 羅傑海賊團夥伴',
      tier: '傳說大劍豪級',
      bountyText: '和之國傳說豪傑',
      posterHeader: '和之國傳奇',
      posterCondition: '光月家大名',
      posterFooter: '— 和之國・九里',
      devilFruit: '無惡魔果實 —— 御田二刀流（名刀「天羽羽斬」與「閻魔」！）',
      originSea: '新世界（和之國・花之都）',
      birthday: '2月22日（熱辣辣關東煮日！）',
      favoriteFood: '滾燙關東煮（「越煮越入味先係御田！」）',
      laugh: '哇哈哈哈哈！關東煮就係要滾燙煮先好食！',
      laughNote: '光月御田豪氣干雲、頂天立地嘅傳說武士大笑！',
      haki: [
        { name: '見聞色霸氣（傾聽萬物之聲）', advanced: false },
        { name: '武裝色霸氣（極致流櫻！）', advanced: true },
        { name: '霸王色霸氣（霸王色纏繞）', advanced: true }
      ],
      signatureMoves: [
        '御田二刀流・桃源十拳！（喺青龍凱多身上留低唯一巨大十字傷疤！）',
        '御田二刀流・銃擬鬼',
        '傳說一小時釜刑（一人舉起赤鞘九俠撐足一小時！）'
      ],
      kidBio:
        '和之國自由奔放、義薄雲天嘅傳說武士！先後跟隨白鬍子同海賊王羅傑出海，憑祖傳雕刻技術幫羅傑解讀路標歷史本文並一齊抵達最終之島「拉夫德爾」，返國後為守護家臣同開國夢想留低千古傳奇！'
    },
    yamato: {
      name: '大和',
      epithet: '和之國護國明王化身',
      role: '光月御田意志繼承者・和之國守護者',
      tier: '四皇最高幹部級',
      bountyText: '和之國守護神',
      posterHeader: '和之國守護者',
      posterCondition: '鬼島反抗英雄',
      posterFooter: '— 和之國',
      devilFruit: '犬犬果實・幻獸種・大口真神型態（神聖冰狼守護神！）',
      originSea: '新世界（鬼島）',
      birthday: '11月3日',
      favoriteFood: '熱騰騰關東煮同大啖咬生三文魚',
      laugh: '啊哈哈哈哈！我就係光月御田！',
      laughNote: '大和捧住御田航海日誌嚮往大海嗰陣最熱血開朗嘅笑聲！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（雷鳴八卦霸王纏繞！）', advanced: true }
      ],
      signatureMoves: [
        '雷鳴八卦！（同父親凱多正面硬撼嘅霸王色狼牙棒！）',
        '無侍冰牙（抵消青龍熱息嘅極寒冰柱吐息！）',
        '鏡山（神聖冰甲護盾！）'
      ],
      kidBio:
        '雖然身為凱多嘅仔女，但細個親眼目睹光月御田壯烈事蹟並執到御田嘅航海日誌之後，立志繼承御田開國嘅意志！喺鬼島屋頂化身神聖白狼「大口真神」單挑拖住凱多，直到路飛重返戰場！'
    },
    law: {
      name: '特拉法爾加・D・瓦鐵爾・羅',
      epithet: '「死亡外科醫生」',
      role: '紅心海賊團船長（極惡世代同盟）',
      tier: '三十億大海賊級',
      bountyText: '3,000,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '手術果實（覺醒超人系 —— 手術空間瞬移與內部衝擊波！）',
      originSea: '北海（白色城鎮弗雷凡斯）',
      birthday: '10月6日',
      favoriteFood: '飯糰配烤魚（最憎食麵包！）',
      laugh: '呵呵……手術空間・屠宰場。',
      laughNote: '死亡外科醫生羅啟動藍色手術空間嗰陣冷靜沉著嘅微笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（強大霸氣可瞬間解除果實狀態異常！）', advanced: true }
      ],
      signatureMoves: [
        '手術果實覺醒・穿刺波動！（大刀貫穿鬼島直達地底岩漿！）',
        '伽馬刀（無外傷內部電擊手術刀）',
        '手術空間・瞬移交換！'
      ],
      kidBio:
        '駕駛黃色潛水艇「極地潛水號」嘅天才醫生船長！喺頂上戰爭救返重傷嘅路飛一命，之後同草帽一夥結成海賊同盟（雖然成日俾路飛亂衝亂撞搞到頭都大埋！），喺鬼島同基德聯手覺醒擊敗四皇大媽，獲得三十億貝里懸賞！',
      bountyLabels: [
        '香波地群島十一位超新星登場',
        '德雷斯羅薩與路飛聯手擊敗多佛朗明哥',
        '鬼島聯手擊敗四皇大媽・懸賞高達三十億貝里！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '200,000,000',
          signatureMoves: ['手術空間・屠宰場！', '位置瞬移交換！', '掃描與無痛分割術'],
          kidBio:
            '香波地群島懸賞兩億貝里嘅冷酷超新星醫生！喺頂上戰爭最危急關頭駕駛潛水艇衝入戰場，施展緊急手術救活路飛同甚平！'
        }
      }
    },
    kid: {
      name: '尤斯塔斯・「船長」・基德',
      epithet: '基德海賊團船長',
      role: '極惡世代超新星競爭對手',
      tier: '三十億大海賊級',
      bountyText: '3,000,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '磁磁果實（覺醒超人系 —— 電磁炮與賦予敵人磁極！）',
      originSea: '南海',
      birthday: '1月10日',
      favoriteFood: '椰菜卷肉',
      laugh: '大哈哈哈哈！電磁巨臂擊！',
      laughNote: '基德船長吸附全場鋼鐵組裝巨型機械臂嗰陣狂野霸氣嘅大笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: false },
        { name: '霸王色霸氣', advanced: false }
      ],
      signatureMoves: [
        '電磁炮！（超高壓磁軌激光巨炮！）',
        '果實覺醒・賦予磁極！（令對手變成生體大磁石吸晒全場鋼鐵！）',
        '龐克腐敗・巨型鋼鐵魔牛衝撞！'
      ],
      kidBio:
        '同路飛、羅並列嘅熱血超新星船長！利用磁磁果實將無數武器同廢鐵吸埋一齊砌成巨型機械公牛同超電磁炮，喺鬼島同羅並肩作戰將四皇大媽轟落海底岩漿，一齊贏得三十億貝里懸賞！',
      bountyLabels: [
        '香波地群島十一位超新星最高懸賞（3億1500萬！）',
        '兩年後闖入新世界懸賞紀錄',
        '鬼島聯手擊敗四皇大媽・懸賞三十億貝里！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '315,000,000',
          signatureMoves: ['磁氣反射！', '龐克巨臂重拳！', '金屬風暴吸納']
        }
      }
    },
    mihawk: {
      name: '喬拉可爾・「鷹眼」・密佛格',
      epithet: '「世界第一大劍豪」',
      role: '十字公會最高幹部 ／ 前王下七武海',
      tier: '四皇級巔峰大劍豪',
      bountyText: '3,590,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 無上大快刀十二工最強黑刀「夜」！',
      originSea: '偉大航道',
      birthday: '3月9日',
      favoriteFood: '紅酒配香煎牛扒',
      laugh: '咕咕咕咕……哇哈哈哈！',
      laughNote: '鷹眼密佛格喺東海遇見寧死不退嘅卓洛嗰陣難得露出嘅讚賞笑聲！',
      haki: [
        { name: '見聞色霸氣（「千里眼」極致洞察！）', advanced: true },
        { name: '武裝色霸氣（永久煉成世界最強黑刀「夜」！）', advanced: true }
      ],
      signatureMoves: [
        '黑刀「夜」・世界最強斬擊（一劍橫斷馬林梵多巨型冰山！）',
        '十字架小刀精準劍術（東海試煉卓洛！）'
      ],
      kidBio:
        '立於全天下所有劍士頂點嘅男人，亦係卓洛畢生追趕嘅終極目標！以前經常同紅髮撒古斯切磋劍術，喺東海巴拉蒂認同卓洛嘅氣魄，高聲鼓勵佢：「超越呢把劍吧！超越我吧，羅羅諾亞！」現時喺十字公會懸賞高達三十五億九千萬貝里！',
      eraSnapshots: {
        'east-blue': { bountyText: '王下七武海（懸賞凍結）' },
        'pre-timeskip': { bountyText: '王下七武海（懸賞凍結）' }
      }
    },
    crocodile: {
      name: '沙・克洛克達爾',
      epithet: '「沙漠之王」',
      role: '十字公會創辦人 ／ 前王下七武海',
      tier: '頂尖七武海及新世界智將',
      bountyText: '1,965,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '沙沙果實（自然系 —— 沙漠風暴與瞬間吸乾水分！）',
      originSea: '偉大航道',
      birthday: '9月5日',
      favoriteFood: '鱷魚肉配番茄（唔鍾意茄汁！）',
      laugh: '庫哈哈哈哈哈！',
      laughNote: '克洛克達爾叼住雪茄運籌帷幄嗰陣低沉霸氣嘅冷笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: false }
      ],
      signatureMoves: [
        '沙漠寶刀！（劈開大地嘅巨型流沙利刃！）',
        '沙嵐！（吞沒綠洲嘅巨型沙塵龍捲風！）',
        '侵蝕輪迴（右手觸碰地面瞬間化為荒漠！）'
      ],
      kidBio:
        '路飛喺偉大航道第一位擊敗嘅王下七武海！能夠全身化為流沙免疫普通物理攻擊，直到路飛發現「水會令沙凝結」嘅自然剋星秘密！後來喺頂上戰爭多次出手幫路飛擋住赤犬同鷹眼，現與鷹眼共同創立「十字公會」，懸賞近二十億貝里！',
      bountyLabels: [
        '阿拉巴斯坦篇前王下七武海凍結懸賞',
        '創立十字公會後最新懸賞（十九億六千五百萬！）'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '81,000,000（七武海凍結懸賞）',
          haki: []
        }
      }
    },
    doflamingo: {
      name: '唐吉訶德・多佛朗明哥',
      epithet: '「天夜叉」',
      role: '唐吉訶德家族少主 ／ 前王下七武海',
      tier: '果實覺醒七武海霸主',
      bountyText: '340,000,000（七武海凍結懸賞）',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '線線果實（覺醒超人系 —— 雲端飛行、鳥籠與白線海浪！）',
      originSea: '聖地瑪麗喬亞（前天龍人）',
      birthday: '10月23日',
      favoriteFood: '龍蝦刺身',
      laugh: '咈咈咈咈咈！',
      laughNote: '天夜叉多佛朗明哥戴住太陽眼鏡披住粉紅羽毛大衣嗰陣狂妄刺耳嘅笑聲！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: false },
        { name: '霸王色霸氣', advanced: false }
      ],
      signatureMoves: [
        '鳥籠！（封鎖成座德雷斯羅薩島嘅不滅絲線巨籠！）',
        '果實覺醒・十六發神聖兇彈「神誅殺」！',
        '寄生線與超過鞭擊（一鞭切斷大樓！）'
      ],
      kidBio:
        '披住粉紅色火烈鳥羽毛大衣嘅前天龍人兼王下七武海！能夠將透明絲線勾上雲朵喺大海高空漫步，仲第一次向路飛展示「超人系惡魔果實覺醒」，將整條街嘅石屋全部變成純白巨浪絲線，最終俾路飛四檔「大猿王槍」一拳轟入地底！',
      eraSnapshots: {
        'pre-timeskip': {
          role: '神秘王下七武海',
          devilFruit: '神秘操縱絲線能力（手指一郁就能操控對手！）',
          haki: [],
          signatureMoves: ['隱形寄生操縱線', '真空手指切割斬'],
          kidBio:
            '頂上戰爭期間一臉狂笑嘅神秘王下七武海，只靠郁動手指就能隨意操縱強者同切斷巨漢魔人奧茲嘅腳！'
        }
      }
    },
    hancock: {
      name: '波雅・漢考克',
      epithet: '「海賊女帝」',
      role: '亞馬遜百合皇帝 ・ 九蛇海賊團船長',
      tier: '霸王色女帝級',
      bountyText: '1,659,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '迷戀果實（超人系 —— 迷戀甘風與芳香腳石化粉碎！）',
      originSea: '無風帶（女兒島亞馬遜百合）',
      birthday: '9月2日',
      favoriteFood: '養顏火鍋',
      laugh: '喔呵呵呵呵！無論哀家做乜都會獲得原諒，因為哀家實在太靚喇！',
      laughNote: '海賊女帝漢考克向後仰頭手指天嗰陣高傲又搞笑嘅招牌台詞！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（九蛇全員精通霸氣！）', advanced: true },
        { name: '霸王色霸氣', advanced: false }
      ],
      signatureMoves: [
        '迷戀甘風！（粉紅心形光束瞬間石化敵軍！）',
        '芳香腳！（踢中物件連同和平主義者機械人都直接石化粉碎！）',
        '俘虜之箭（漫天愛心箭雨！）'
      ],
      kidBio:
        '統治無風帶女兒島「亞馬遜百合」嘅蛇姬女帝！九蛇海賊船由兩條巨型毒海蛇拉動，所以可以自由穿越充滿海王類嘅無風帶。發現路飛純真善良、毫無私心嘅一面之後成為路飛最忠實嘅盟友，偷偷帶路飛潛入推進城救艾斯，現懸賞高達十六億五千九百萬貝里！',
      bountyLabels: [
        '首次遠征即獲邀加入七武海（八千萬凍結）',
        '廢除七武海制度後最新女帝懸賞（十六億五千九百萬！）'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '80,000,000（七武海凍結懸賞）'
        }
      }
    },
    garp: {
      name: '蒙奇・D・卡普',
      epithet: '「鐵拳」卡普 —— 海軍傳說英雄',
      role: '海軍本部中將（路飛親生阿爺！）',
      tier: '傳說海軍英雄級',
      bountyText: '3,000,000,000（★★★ 三星皇冠）',
      posterHeader: '十字公會懸賞',
      posterCondition: '★★★ 三星皇冠海軍目標',
      posterFooter: '— 十字公會',
      devilFruit: '無惡魔果實 —— 純靠毀天滅地嘅雙拳與霸王色霸氣！',
      originSea: '東海（哥雅王國）',
      birthday: '5月2日',
      favoriteFood: '仙貝米餅配熱茶（同埋冬甩！）',
      laugh: '哇哈哈哈哈哈！',
      laughNote: '鐵拳卡普一路食仙貝一路大笑（有時笑笑吓仲會突然瞓著覺！）',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（徒手打平八座大山練拳！）', advanced: true },
        { name: '霸王色霸氣（拳骨衝突隔空摧毀全鎮！）', advanced: true }
      ],
      signatureMoves: [
        '拳骨衝突！（喺蜂巢島高空一拳轟平整座海賊城鎮！）',
        '拳骨隕石（徒手掟炮彈比大炮仲快！）',
        '愛之鐵拳（唯一打得痛橡膠路飛嘅阿爺鐵拳！）'
      ],
      kidBio:
        '路飛豪邁搞笑嘅親生阿爺！當年多次將海賊王羅傑逼入絕境，為咗唔想聽天龍人直接指揮而多次拒絕升做大將。去到最終章，年過七十八歲嘅卡普為咗救愛徒克比單槍匹馬殺入黑鬍子大本營蜂巢島，一招「拳骨衝突」震撼全世界！',
      eraSnapshots: {
        'pre-timeskip': {
          posterHeader: '海軍本部檔案',
          posterCondition: '傳說海軍英雄',
          posterFooter: '— 世界政府・海軍',
          bountyText: '海軍英雄中將',
          signatureMoves: ['拳骨隕石（徒手投擲千顆炮彈！）', '超巨型鐵球投擲！', '愛之鐵拳！']
        }
      }
    },
    akainu: {
      name: '盃（赤犬）',
      epithet: '海軍本部元帥 ——「赤犬」',
      role: '海軍本部最高統帥・元帥',
      tier: '海軍元帥級巔峰戰力',
      bountyText: '5,000,000,000（★★★★★ 五星皇冠）',
      posterHeader: '十字公會懸賞',
      posterCondition: '★★★★★ 五星皇冠海軍元帥',
      posterFooter: '— 十字公會',
      devilFruit: '岩漿果實（自然系 —— 最頂級攻擊力高熱火山岩漿！）',
      originSea: '北海',
      birthday: '8月16日',
      favoriteFood: '滾燙白飯配紅辣椒',
      laugh: '哼哈哈哈哈……徹底嘅正義！',
      laughNote: '赤犬元帥拳頭冒出滾燙黑煙同熔岩嗰陣冷酷威嚴嘅沉笑！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（流櫻氣障防禦）', advanced: true }
      ],
      signatureMoves: [
        '大噴火！（天空降下巨型熔岩鐵拳！）',
        '流星火山（漫天火山彈暴雨轟炸！）'
      ],
      kidBio:
        '信奉「徹底嘅正義」嘅現任海軍本部元帥！喺龐克哈薩德同青雉激戰十日十夜，將成座島一半變成烈火火山、一半變成萬年冰原後勝出接掌海軍，被十字公會開出與四皇同級嘅五十億貝里五星皇冠懸賞！',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '海軍本部最高戰力 ——「赤犬」大將',
          role: '海軍本部三大將之一',
          posterHeader: '海軍本部檔案',
          posterCondition: '海軍最高戰力大將',
          posterFooter: '— 海軍本部',
          bountyText: '海軍本部大將',
          kidBio:
            '海軍本部三大將中最冷酷強硬嘅一人！食咗自然系岩漿果實，喺頂上戰爭瞬間融化比戰艦更大嘅巨型冰山，展現壓倒性火力！'
        }
      }
    },
    kizaru: {
      name: '波爾薩利諾（黃猿大將）',
      epithet: '「黃猿」—— 海軍本部大將',
      role: '海軍本部最高戰力大將',
      tier: '海軍大將級光速戰力',
      bountyText: '3,000,000,000（★★★ 三星皇冠）',
      posterHeader: '十字公會懸賞',
      posterCondition: '★★★ 三星皇冠海軍大將',
      posterFooter: '— 十字公會',
      devilFruit: '閃閃果實（自然系 —— 純粹光子光速踢擊與激光！）',
      originSea: '北海',
      birthday: '11月23日',
      favoriteFood: '味噌拉麵、生薑配香蕉',
      laugh: '喔嘟嘟嘟～真係好得人驚呀～！',
      laughNote: '黃猿大將明明擁有最快光速，偏偏用最慢吞吞語氣拖長尾音講笑嘅反差腔調！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（高等防禦氣障）', advanced: true }
      ],
      signatureMoves: [
        '八咫鏡！（折線反射光束瞬間移動，蛋頭島極速穿梭！）',
        '八尺瓊勾玉（漫天光速激光彈幕！）',
        '天叢雲劍（凝聚光子化成實體光劍！）'
      ],
      kidBio:
        '講嘢慢吞吞、但出腳擁有真正「光速」嘅海軍本部大將！全身可以化為金色光子，用指尖發射激光或者踩住炮彈登場。喺未來島蛋頭島篇，佢一邊承受與老朋友貝加龐克同大熊對立嘅內心煎熬，一邊同五檔路飛展開超光速空戰！',
      eraSnapshots: {
        'pre-timeskip': {
          posterHeader: '海軍本部檔案',
          posterCondition: '海軍最高戰力大將',
          posterFooter: '— 海軍本部',
          bountyText: '海軍本部大將'
        }
      }
    },
    aokiji: {
      name: '庫山（青雉）',
      epithet: '「青雉」—— 前海軍本部大將',
      role: '前海軍大將 ／ 新世界十號船船長',
      tier: '大將級極寒戰力',
      bountyText: '前海軍本部大將',
      posterHeader: '前海軍大將',
      posterCondition: '新世界頂尖強者',
      posterFooter: '— 偉大航道',
      devilFruit: '冰凍果實（自然系 —— 一掌冰封整片大海！）',
      originSea: '南海',
      birthday: '9月21日',
      favoriteFood: '雪山鮮奶配冰鎮飲品',
      laugh: '啊啦啦啦～冷靜啲、放鬆啲啦……',
      laughNote: '青雉庫山戴住眼罩踩單車喺結冰海面散步嗰陣最慵懶隨和嘅口頭禪！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（前卡普親傳重拳訓練！）', advanced: true }
      ],
      signatureMoves: [
        '冰河時代！（雙手掂海瞬間冰封數十海里海面足足一星期！）',
        '冰塊・暴雉嘴（巨型冰鳳凰衝擊！）',
        '冰球與冰刀軍艦拳！'
      ],
      kidBio:
        '曾經信奉「慵懶嘅正義」嘅海軍大將，亦係唯一完全唔怕跌落海嘅惡魔果實能力者——因為佢隻手一掂到海水就會發動「冰河時代」，然後悠閒咁踩住單車過海！當年喺奧哈拉放走年幼嘅魯賓，現時帶住神秘目的潛入新世界風暴中心！',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '「青雉」—— 海軍本部大將',
          role: '海軍本部三大將之一',
          posterHeader: '海軍本部檔案',
          posterCondition: '海軍最高戰力大將',
          posterFooter: '— 海軍本部',
          bountyText: '海軍本部大將'
        }
      }
    },
    ace: {
      name: '波特卡斯・D・艾斯',
      epithet: '「火拳」艾斯',
      role: '白鬍子海賊團二番隊隊長（路飛結拜大佬！）',
      tier: '四皇最高幹部級',
      bountyText: '550,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '燒燒果實（自然系 —— 熊熊烈火之身！）',
      originSea: '南海（巴苔里拉島出生，東海高爾波山長大）',
      birthday: '1月1日（元旦）',
      favoriteFood: '辣椒意粉同大胃王套餐（食食吓會突然瞓著！）',
      laugh: '啊哈哈哈哈！多謝大家咁錫我！',
      laughNote: '艾斯既有食飯突然瞓著嘅搞笑一面，更有對路飛同白鬍子全團無悔感恩嘅溫暖笑容！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: false },
        { name: '霸王色霸氣（童年救路飛時覺醒！）', advanced: false }
      ],
      signatureMoves: [
        '大炎戒・炎帝！（凝聚出整座島咁大嘅小型太陽火球！）',
        '火拳！（一拳轟穿五艘戰艦！）',
        '神火・不知火与螢火・火達摩'
      ],
      kidBio:
        '同路飛、薩波細個喺高爾波山飲過結義交杯酒嘅好大佬！禮貌又講義氣（雖然成日食食吓飯突然一頭栽落隻碟度瞓著覺！），靠火焰動力小艇衝浪航海，仲去過和之國同小玉同大和結下深厚情誼！'
    },
    sabo: {
      name: '薩波',
      epithet: '「炎帝」—— 革命軍總參謀長',
      role: '革命軍第二把交椅（路飛與艾斯結拜兄弟！）',
      tier: '四皇最高幹部＋級',
      bountyText: '602,000,000＋',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 世界政府',
      devilFruit: '燒燒果實（繼承自兄弟艾斯！）＋ 龍爪拳武術！',
      originSea: '東海（哥雅王國）',
      birthday: '3月20日',
      favoriteFood: '清湯拉麵',
      laugh: '啊哈哈哈！路飛背後就交畀我守護啦！',
      laughNote: '薩波壓低禮帽、繼承艾斯火焰守護細佬路飛嗰陣溫柔堅定嘅笑容！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（龍之吐息震碎核心！）', advanced: true }
      ],
      signatureMoves: [
        '火焰・龍王！（龍爪拳結合燒燒果實烈焰螺旋轟擊！）',
        '龍之鉤爪（捏碎鋼鐵大炮如豆腐！）',
        '龍之吐息（一拳震塌鬥牛競技場地面！）'
      ],
      kidBio:
        '路飛同艾斯失散多年嘅結拜二哥！當年出海遇險獲路飛父親龍救起，苦練成革命軍僅次於龍嘅總參謀長。喺德雷斯羅薩重拾記憶同路飛團聚，親口食下艾斯留下嘅「燒燒果實」，並勇闖聖地瑪麗喬亞救出大熊，被世人尊稱為「炎帝」！'
    },
    katakuri: {
      name: '夏洛特・卡塔庫栗',
      epithet: '甜點三將星之首 —— 不敗傳說',
      role: '大媽海賊團最高幹部（次子）',
      tier: '四皇皇副級',
      bountyText: '1,057,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '糯糯果實（特殊超人系 —— 覺醒年糕變化！）',
      originSea: '偉大航道',
      birthday: '11月25日',
      favoriteFood: '超甜冬甩配熱紅茶！',
      laugh: '冬～～～甩呀～！呵呵呵！',
      laughNote: '平日冷酷完美嘅卡塔庫栗一到下午茶時間攤喺地下食冬甩嗰陣幸福到極點嘅反差萌歌聲！',
      haki: [
        { name: '見聞色霸氣（預見未來宗師！）', advanced: true },
        { name: '武裝色霸氣（斬切年糕方塊重拳！）', advanced: true },
        { name: '霸王色霸氣', advanced: false }
      ],
      signatureMoves: [
        '斬・切・年糕！（高速旋轉狼牙棒年糕重錘！）',
        '無雙年糕（果實覺醒令四周空間變成飄浮年糕巨拳！）',
        '三叉戟「土龍」高速突刺'
      ],
      kidBio:
        '大媽海賊團最強嘅哥哥，為咗保護細佬妹維持「背部從未掂過地」嘅不敗神話（但私底下超鍾意攤喺甜品屋入面大啖食冬甩！）。喺鏡世界同路飛展開堂堂正正嘅男子漢決鬥，促成路飛領悟「預見未來」見聞色霸氣！'
    },
    vegapunk: {
      name: '貝加龐克博士（「本體」）',
      epithet: '「世界第一大腦袋」超越人類五百年嘅天才科學家',
      role: '蛋頭島研究所所長（本體連同六大衛星分身！）',
      tier: '世界首席科學家',
      bountyText: '無價世界級頭腦',
      posterHeader: '未來島蛋頭島',
      posterCondition: '世界最高科學權威',
      posterFooter: '— 龐克紀錄館',
      devilFruit: '腦腦果實（超人系 —— 無限記憶容量，大腦存放喺空中巨蛋「龐克紀錄」！）',
      originSea: '偉大航道（機關島巴爾基摩亞）',
      birthday: '8月9日',
      favoriteFood: '蘋果、熱咖啡配冬甩',
      laugh: '類星體呀！嗲哈哈哈哈！',
      laughNote: '貝加龐克博士伸長條脷、頭頂插住蘋果天線諗到新發明嗰陣興奮到手舞足蹈嘅笑聲！',
      haki: [],
      signatureMoves: [
        '龐克紀錄雲端同步（與莉莉絲、愛迪生、畢達哥拉斯、阿特拉斯、釋迦、約克共享智慧！）',
        '巨大機械人「貝加神力一號」及泡泡防禦盾槍',
        '海樓石軍艦船底塗層、和平主義者與熾天使研發者'
      ],
      kidBio:
        '領先人類科技足足五百年嘅善良科學老爺爺！食咗腦腦果實令記憶無限增長，個腦大到要獨立擺喺蛋頭島上空嘅巨蛋「龐克紀錄」入面，自己頭頂裝條蘋果天線無線連線！喺最終章佢透過全地球影像電話蟲直播，揭開空白一百年「世界沉沒二百米」嘅驚天真相！'
    },
    kuma: {
      name: '巴索羅繆・大熊',
      epithet: '巴卡尼亞族英雄 ＆ 最溫柔偉大嘅父親',
      role: '革命軍創始幹部 ／ 前王下七武海',
      tier: '頂尖革命軍統帥級',
      bountyText: '296,000,000（七武海凍結）',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 世界政府',
      devilFruit: '肉球果實（超人系 —— 雙掌肉墊以光速彈開世上一切事物！）',
      originSea: '西海（索爾貝王國）',
      birthday: '2月9日',
      favoriteFood: '蜂蜜配三文魚（仲有陪波妮一齊食薄餅！）',
      laugh: '嗯……如果要去旅行，你想去邊度？',
      laughNote: '大熊發動肉球果實送人飛越天空之前低沉溫柔嘅問句！',
      eggheadLaugh: '呵呵……波妮，祝你十歲生日快樂。',
      eggheadLaughNote: '大熊陪女兒波妮跳太陽神尼卡「咚噠哆哆」節奏舞嗰陣最溫暖慈祥嘅父親笑容！',
      eggheadFavoriteFood: '蜂蜜配三文魚（同埋陪波妮食瑪格麗特薄餅！）',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（跨越世界守護女兒嘅父親鐵拳！）', advanced: true }
      ],
      signatureMoves: [
        '熊之衝擊！（將整片大氣壓縮成小型肉球引爆嘅超巨型氣壓彈！）',
        '壓力炮（光速空氣肉球連射！）',
        '三天三夜肉球空中旅行及痛苦記憶氣泡彈出！'
      ],
      kidBio:
        '雖然世界政府抹黑佢做「暴君」，但大熊其實係成套海賊王入面最善良、最無私嘅爸爸！身為信奉太陽神尼卡嘅巨人血統「巴卡尼亞族」後裔，佢喺香波地拍飛草帽全團救晒九個人嘅命，用傷痕累累嘅身軀守護千陽號足足兩年，仲喺蛋頭島跨越紅土大陸趕嚟保護愛女波妮！',
      bountyLabels: [
        '王下七武海時期凍結懸賞',
        '蛋頭島守護波妮與草帽一夥嘅傳奇英雄'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '「暴君」—— 王下七武海',
          role: '王下七武海 ＆ 香波地神秘恩人',
          haki: [{ name: '見聞色霸氣', advanced: false }],
          kidBio:
            '手捧聖經、身形巨大嘅王下七武海！喺香波地群島絕境中，佢用肉球果實將草帽一夥逐個拍飛去最適合佢哋修煉變強嘅島嶼，仲默默留低保護千陽號！'
        },
        wano: {
          epithet: '革命軍創始幹部 ＆ 前王下七武海',
          role: '獲薩波小隊從聖地救出嘅革命軍元老',
          haki: [
            { name: '見聞色霸氣', advanced: false },
            { name: '武裝色霸氣', advanced: false }
          ],
          kidBio:
            '同龍、伊娃柯夫一齊創立革命軍嘅溫柔幹部！當年喺香波地拯救草帽全團並死守千陽號兩年，喺世界會議期間獲薩波與革命軍隊長們成功救出！'
        }
      }
    },
    bonney: {
      name: '珠寶・波妮',
      epithet: '「大胃王」—— 波妮海賊團船長',
      role: '極惡世代超新星（巴索羅繆・大熊嘅愛女！）',
      tier: '超新星新星（扭曲未來・尼卡共鳴！）',
      bountyText: '320,000,000',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '歲歲果實（超人系 —— 自由改變年齡與「扭曲未來」尼卡變身！）',
      originSea: '南海（索爾貝王國長大）',
      birthday: '9月1日',
      favoriteFood: '新鮮出爐芝士瑪格麗特薄餅！',
      laugh: '嘎哈哈哈！老闆，再嚟十塊大薄餅！',
      laughNote: '大胃王波妮一啖吞晒成疊熱辣辣薄餅嗰陣豪爽率真嘅笑聲！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣', advanced: true }
      ],
      signatureMoves: [
        '扭曲未來・「最自由嘅未來」！（化身白髮太陽神尼卡型態同五檔路飛雙人出拳！）',
        '瀕死體驗衝擊腳（踢出彩色寶石記憶波！）',
        '年齡操作（一摸就將海軍士兵變成蘇蝦仔或者公公婆婆！）'
      ],
      kidBio:
        '為咗搵返爸爸巴索羅繆・大熊而出海嘅勇敢十幾歲小女孩（靠歲歲果實變大人做海賊船長）！喺蛋頭島睇完大熊催淚嘅記憶氣泡之後，波妮親眼見到路飛嘅五檔太陽神姿態，重拾信念發動「最自由嘅未來」，同路飛一齊變成雙重白髮尼卡並肩戰鬥，懸賞升至三億二千萬貝里！',
      bountyLabels: [
        '香波地群島十一位超新星登場',
        '蛋頭島覺醒「最自由嘅未來」並掌控全體和平主義者最高權限！'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          bountyText: '140,000,000',
          tier: '香波地十一位超新星',
          role: '波妮海賊團船長（極惡世代）',
          devilFruit: '年齡操控果實（一掂對手就能變成小朋友或者老人家！）',
          signatureMoves: ['年齡逆轉（將敵兵變成啼哭小童！）', '急速老化觸碰', '薄餅能量極速補充！'],
          kidBio:
            '香波地群島十一位超新星當中唯一嘅女船長！食量驚人，曾經變做細路女飛撲抱住索隆阻止佢砍天龍人，避免大將提前趕到！'
        },
        wano: {
          bountyText: '140,000,000',
          tier: '極惡世代超新星船長',
          role: '潛入聖地尋找大熊嘅超新星船長',
          devilFruit: '年齡操控果實（自由改變自己同他人年紀潛入任何地方！）',
          signatureMoves: ['王太后變裝潛入術', '年齡逆轉反擊', '闖入新世界暖流漩渦'],
          kidBio:
            '極惡世代大胃王女船長！變裝成索爾貝王國王太后潛入世界會議尋找大熊，之後喺未來島蛋頭島海域被捲入暖水漩渦遇見草帽一夥！'
        }
      }
    },
    saturn: {
      name: '傑伊戈路西亞・薩坦聖',
      epithet: '五老星 —— 科學防衛武神',
      role: '世界政府最高權力・五老星之一',
      tier: '五老星深淵魔物級',
      bountyText: '五老星最高權力',
      posterHeader: '世界政府五老星',
      posterCondition: '最高世界權威',
      posterFooter: '— 聖地瑪麗喬亞',
      devilFruit: '牛鬼幻獸覺醒型態（黑色魔法陣召喚、劇毒蛛腿與不死再生！）',
      originSea: '聖地瑪麗喬亞',
      birthday: '五老星機密檔案',
      favoriteFood: '瑪麗喬亞宮廷料理',
      laugh: '哼……螻蟻根本無法理解。',
      laughNote: '科學防衛武神薩坦聖從黑色五芒星魔法陣降臨蛋頭島嗰陣冰冷傲慢嘅低語！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣', advanced: true },
        { name: '霸王色霸氣（震撼全島嘅黑色閃電魔氣！）', advanced: true }
      ],
      signatureMoves: [
        '深淵五芒星魔法陣傳送（瞬間召喚其餘四位五老星降臨！）',
        '劇毒牛鬼蛛刺連擊與凝視爆破',
        '高爆毒液球吐息（俾五檔路飛用棒球棍一棒打返轉頭！）'
      ],
      kidBio:
        '長居聖地瑪麗喬亞權力之間嘅世界政府最高掌權者「五老星」之一！喺蛋頭島篇罕有親自踏上戰場，從黑色閃電五芒星陣化身為牛角蜘蛛巨怪「牛鬼」，並召喚全體五老星圍攻草帽一夥，最終俾大熊、五檔路飛、波妮同古代機械人埃米特聯手擊退！'
    },
    lucci: {
      name: '羅布・路奇',
      epithet: '「殺戮兵器」—— 世界政府直屬秘密間諜機關零號王牌',
      role: '秘密間諜機關最高戰力特工（白鴿哈特拍檔）',
      tier: '覺醒動物系王牌特工',
      bountyText: '秘密間諜機關王牌',
      posterHeader: '世界政府諜報機關',
      posterCondition: '最高機密特工',
      posterFooter: '— 神之盾零號',
      devilFruit: '貓貓果實・花豹型態（黑色焰雲覺醒型態！）',
      originSea: '偉大航道',
      birthday: '6月2日',
      favoriteFood: '血淋淋生牛扒配威士忌（白鴿哈特食粟米粒！）',
      laugh: '哼哈哈哈……必要嘅黑暗正義。',
      laughNote: '戴住白色面具嘅路奇連同膊頭白鴿哈特一齊散發冰冷殺氣嘅低笑！',
      haki: [
        { name: '見聞色霸氣', advanced: true },
        { name: '武裝色霸氣（六式鐵塊與手槍強化）', advanced: true }
      ],
      signatureMoves: [
        '果實覺醒・手槍斑！（黑焰雲纏繞嘅光速豹爪連擊！）',
        '六式奧義・最大輪六王槍！',
        '嵐腳・凱鳥與剃高速瞬移'
      ],
      kidBio:
        '當年喺水之七島潛伏五年做船匠、喺司法島將二檔三檔路飛逼到體力極限嘅史上最強諜報員！兩年後晉升為白衣面具最高諜報特工，仲練成纏繞黑色焰雲嘅「覺醒花豹型態」，喺蛋頭島先後單挑五檔路飛同三刀流卓洛！',
      eraSnapshots: {
        'pre-timeskip': {
          epithet: '九號秘密諜報機關八百年最強天才',
          role: '司法島諜報首領（潛伏卡雷拉一號船塢船匠）',
          posterHeader: '司法島諜報檔案',
          posterFooter: '— 司法之島',
          bountyText: '道力值 4000（史上最強！）',
          tier: '司法島最強頭目',
          devilFruit: '貓貓果實・花豹型態 ＋ 海軍六式全精通！',
          haki: [],
          signatureMoves: ['六式奧義・六王槍！', '指槍・黃蓮連打！', '嵐腳・凱鳥！'],
          kidBio:
            '潛伏水之七島靠白鴿哈特腹語講嘢嘅冷酷諜報首領！精通剃、鐵塊、月步、紙繪、嵐腳、指槍全套六式，喺司法島同路飛展開最經典嘅肉搏死鬥！'
        },
        wano: {
          role: '世界政府最高諜報機關面具長官',
          devilFruit: '貓貓果實・花豹型態 ＋ 霸氣強化六式！',
          signatureMoves: ['霸氣指槍・斑', '六王槍', '極速剃與月步空戰'],
          kidBio:
            '重返世界政府最高諜報機關「神之盾零號」嘅白衣面具特工，率領艦隊執行世界會議同新世界最高機密任務！'
        }
      }
    },
    'dorry-brogy': {
      name: '東利與布洛基船長',
      epithet: '艾爾巴夫「青鬼」東利 ＆「赤鬼」布洛基',
      role: '巨兵海賊團雙船長（紅髮撒古斯嘅生死摯友！）',
      tier: '四皇盟友巨人傳奇',
      bountyText: '每人 1,800,000,000（雙人合共 36 億！）',
      posterHeader: '懸賞通緝',
      posterCondition: '生死不論',
      posterFooter: '— 海軍本部',
      devilFruit: '無惡魔果實 —— 純粹艾爾巴夫巨人神力與太陽之盾！',
      originSea: '新世界（戰士之國艾爾巴夫）',
      birthday: '10月2日（東利）＆ 5月1日（布洛基）',
      favoriteFood: '炭烤恐龍大排骨配巨型木桶艾爾巴夫麥酒！',
      laugh: '嘰嘎嘎嘎嘎！嘎巴巴巴巴！',
      laughNote: '青鬼東利「嘰嘎嘎嘎！」同赤鬼布洛基「嘎巴巴巴！」響徹小花園與艾爾巴夫嘅二重唱豪笑！',
      haki: [
        { name: '見聞色霸氣', advanced: false },
        { name: '武裝色霸氣（劈開大海嘅霸國合擊！）', advanced: true }
      ],
      signatureMoves: [
        '霸國！（雙人合力揮出貫穿大海與巨獸嘅艾爾巴夫最強槍波！）',
        '太陽之盾「斯瓦爾」防禦陣（硬擋五老星水星封豨衝撞！）',
        '小花園一百年火山榮耀決鬥（共戰 73,466 場！）'
      ],
      kidBio:
        '曾經喺太古之島小花園為咗戰士榮耀足足決鬥一百年（打咗七萬三千四百六十六場！），深深啟發烏索普立志成為海上勇敢戰士嘅兩位二十二米高巨人船長！去到蛋頭島篇，佢哋帶住每人十八億貝里（合共三十六億！）嘅最新驚人懸賞率領巨兵海賊團殺到，護送「太陽神」路飛同草帽一夥直奔艾爾巴夫！',
      bountyLabels: [
        '一百年前舊時代懸賞（每人一億貝里）',
        '最終章復出最新懸賞（每人十八億 ／ 雙人三十六億貝里！）'
      ],
      eraSnapshots: {
        'pre-timeskip': {
          role: '巨兵海賊團傳說雙船長（太古之島小花園）',
          bountyText: '每人 100,000,000（百年前紀錄）',
          tier: '偉大航道巨人傳說',
          haki: [],
          signatureMoves: ['霸國！（一擊貫穿食島怪開闢航道！）', '泰利劍與布魯梅爾巨斧交鋒', '火山噴發信號百年決鬥'],
          kidBio:
            '喺小花園決鬥足足一百年嘅兩位重情重義巨人船長！為咗報答草帽一夥識破蠟燭人陰謀，雙人揮出耗盡武器壽命嘅「霸國」一炮射穿超巨型食島怪，送前進梅利號出航！'
        },
        wano: {
          role: '巨兵海賊團傳說雙船長',
          bountyText: '每人 100,000,000（凍結紀錄）',
          tier: '新世界巨人族傳奇',
          signatureMoves: ['霸國（艾爾巴夫之槍 —— 連凱多同大媽合體技都致敬嘅神技！）', '劍斧合擊', '艾爾巴夫戰士驕傲'],
          kidBio:
            '啟發烏索普、奧伊摩同卡西嘅艾爾巴夫傳說巨人雙船長，佢哋嘅合體絕技「霸國」正正就係巨人族最強奧義！'
        }
      }
    }
  };

  const worldLocations = {
    'east-blue': {
      name: '東海（黎明島風車村、巴拉蒂、惡龍領域及羅格鎮）',
      subtitle: '路飛、卓洛、奈美、烏索普同海賊王羅傑嘅故鄉！',
      summary:
        '被紅土大陸同無風帶分隔開嘅四大海洋之一。雖然偉大航道啲海賊成日笑東海係「最和平最弱之海」，但其實海賊王哥爾・D・羅傑、海軍英雄卡普、革命軍首領龍同新四皇路飛全部都係喺東海出發！',
      keyFacts: [
        '路飛、艾斯同薩波三兄弟細個就喺黎明島風車村後山一齊長大，飲下結義交杯酒！',
        '海上餐廳「巴拉蒂」泊喺顛倒山入口附近，正正係山治煮飯同卓洛挑戰鷹眼嘅地方。',
        '「開始與結束之鎮」羅格鎮係海賊王羅傑出世同開啟大海賊時代嘅傳奇港口。'
      ]
    },
    'west-blue': {
      name: '西海（考古學聖地奧哈拉與學者之海）',
      subtitle: '紅髮撒古斯、布魯克、魯賓同大熊嘅故鄉海域！',
      summary:
        '位於世界對角線「X」形版圖嘅西方海域！呢度曾經矗立住擁有五千年歷史嘅奧哈拉「全知之樹」大圖書館，妮歌・魯賓八歲就喺度成為能夠解讀歷史本文嘅考古學家。',
      keyFacts: [
        '紅髮撒古斯喺請白鬍子飲西海家鄉靚酒嗰陣提過自己來自西海。',
        '巨人族海軍中將薩烏羅喺奧哈拉救走年幼嘅魯賓，仲將奧哈拉珍貴典籍運往艾爾巴夫保存！'
      ]
    },
    'north-blue': {
      name: '北海（傑爾馬王國與冒險繪本之海）',
      subtitle: '山治、特拉法爾加・羅同「大話王諾蘭度」傳說嘅發源地！',
      summary:
        '位於世界北方嘅廣闊海洋，家家戶戶細路都睇過「大話王蒙布朗・諾蘭度」嘅連環圖（其實諾蘭度講黃金鄉係真話，只係黃金城俾沖天海流射咗上一萬米高空！）。',
      keyFacts: [
        '山治細個由北海橫跨紅土大陸嚟到東海巴拉蒂跟紅腳哲普學廚藝。',
        '特拉法爾加・羅同赤犬盃、黃猿波爾薩利諾全部都係北海出身！'
      ]
    },
    'south-blue': {
      name: '南海（巴苔里拉島、機關島與珍獸王國）',
      subtitle: '芬奇、艾斯、基德同波妮成長嘅熱血海域！',
      summary:
        '充滿奇珍異獸同機械發明嘅南方海域！有火拳艾斯出世嘅巴苔里拉島、喬巴修煉兩年學醫嘅巨鳥王國托里諾，仲有盛產機械天才嘅島嶼。',
      keyFacts: [
        '極惡世代嘅尤斯塔斯・基德、基拉同珠寶・波妮都由南海揚帆闖入偉大航道！',
        '芬奇喺南海出世，四歲先嚟到水之七島拜湯姆先生為師學造船。'
      ]
    },
    'red-line': {
      name: '紅土大陸（環繞地球一周嘅一萬米赤紅岩壁！）',
      subtitle: '將地球分成兩半、直插雲霄嘅不滅赤色大陸！',
      summary:
        '同現實地球唔同，海賊王星球只有唯一一條好似紅色絲帶咁繞地球一圈嘅超巨大大陸「紅土大陸」！佢同一萬米寬嘅「偉大航道」成九十度垂直交叉，將全球海洋切開做東南西北四海。',
      keyFacts: [
        '顛倒山正正位於第一個交叉點；而頂端聖地「瑪麗喬亞」同海底一萬米「魚人島」就位於地球對面第二個交叉點！',
        '一般海賊船根本無可能翻越一萬米高壁，必須喺香波地鍍膜潛落海底穿過紅土大陸底部洞穴先去到新世界！'
      ]
    },
    'calm-belt': {
      name: '無風帶（超巨型海王類嘅巢穴！）',
      subtitle: '一絲海風都冇、一點海流都冇嘅恐怖禁區！',
      summary:
        '夾喺偉大航道南北兩側嘅兩條無風海域。因為成年完全冇風，普通帆船一駛入去就會原地停死，緊接住身長幾百米嘅超巨型「海王類」就會由深海浮上水面圍攻船隻！',
      keyFacts: [
        '貝加龐克博士喺海軍軍艦船底鑲滿「海樓石」，令海王類以為上面只係普通海水，安全橫渡無風帶！',
        '海底大監獄「推進城」同海賊女帝嘅「女兒島亞馬遜百合」都隱藏喺無風帶入面。'
      ]
    },
    'reverse-mountain': {
      name: '顛倒山與雙子岬（島嶼鯨魚拉布！）',
      subtitle: '東南西北四海激流竟然「逆流衝上山頂」湧入偉大航道！',
      summary:
        '可樂斯醫生海圖上面最經典嘅「X」形奇山！來自東海、西海、北海、南海嘅四條急速海流會沿住四條斜角運河逆流衝上山頂，匯聚之後沿住第五條運河俯衝入偉大航道起點雙子岬！',
      keyFacts: [
        '雙子岬燈塔下面住住巨大又溫柔嘅島嶼鯨魚「拉布」，佢足足等咗布魯克五十年！',
        '入到雙子岬之後普通指南針會徹底失靈，航海士必須改戴手腕「記錄指針」鎖定磁力航線。'
      ]
    },
    alabasta: {
      name: '阿拉巴斯坦王國（聖多拉大沙漠與雨地）',
      subtitle: '薇薇公主深愛嘅沙漠古國 ＆ 路飛決戰沙・克洛克達爾！',
      summary:
        '被巨大聖多拉河一分為二嘅文明沙漠大國！草帽一夥為咗幫夥伴薇薇公主制止內戰，全力擊潰巴洛克工作社同七武海克洛克達爾，左臂畫上嘅「X」記號成為永遠嘅夥伴印記！',
      keyFacts: [
        '王室地下葬祭殿藏有一塊歷史本文，妮歌・魯賓喺度首次讀到古代兵器「冥王」嘅線索！',
        '草帽一夥高舉左臂「X」無聲告別薇薇同跑得快鴨，係漫畫史上最催淚名場面之一。'
      ]
    },
    skypiea: {
      name: '空島・斯卡皮亞（白白海一萬米高空雲島！）',
      subtitle: '實體海雲島嶼、巨大豆蔓與黃金鄉山多拉大鐘樓！',
      summary:
        '飄浮喺加雅島正上方一萬米高空「白白海」上面嘅奇蹟雲島！無數海賊嘲笑空島只係童話故事，但路飛一夥乘住爆炸性「沖天海流」飛上雲端，打敗雷神艾尼路並敲響沉默四百年嘅黃金鐘！',
      keyFacts: [
        '黃金大鐘底座刻有海賊王羅傑留低嘅古代文字留言：「我來到此地，將此文引導至世界盡頭」！',
        '前進梅利號嘅船精靈「克拉巴特曼」就喺空島迷霧中著住雨衣拎住木槌偷偷幫大家修船。'
      ]
    },
    'water7-enies': {
      name: '水之七島與司法島（水上之都與不夜懸空大瀑布）',
      subtitle: '千陽號誕生之地、路飛二檔開眼與魯賓「我想活下去！」',
      summary:
        '由海上列車「冒煙湯姆號」連接住嘅兩大奇觀島嶼！水之七島好似巨型噴泉水都咁擁有世界最強造船廠，而司法島就懸浮喺永不入夜嘅無底大海洞瀑布正中央！',
      keyFacts: [
        '烏索普化身「狙擊王」一箭射穿世界政府旗幟，魯賓流淚大喊「我想活下去！」，全團死戰救回夥伴！',
        '前進梅利號走完最後一程奇蹟航行後化為火光道別，芬奇隨即用寶樹亞當建成「千陽號」！'
      ]
    },
    'impel-down': {
      name: '海底大監獄推進城與正義之門三角海流',
      subtitle: '直插無風帶海底嘅六層銅牆鐵壁要塞！',
      summary:
        '由無風帶海床一路向上興建嘅世界第一海底大監獄！司法島、馬林梵多同推進城由三扇超巨型「正義之門」同三角迴旋急流「塔拉伊海流」緊密相連。',
      keyFacts: [
        '路飛為救大佬艾斯單槍匹馬闖入推進城，聯同巴基、克洛克達爾、甚平、伊娃柯夫同馮・克雷發動史上最大越獄！',
        '小馮馮（馮・克雷）留守控制室假扮麥哲倫打開正義之門，以友誼之名送路飛衝往馬林梵多。'
      ]
    },
    'sabaody-marineford': {
      name: '香波地群島與海軍本部馬林梵多月牙灣',
      subtitle: '偉大航道前半段七條航線終點 ＆ 震動時代嘅頂上戰爭！',
      summary:
        '緊貼紅土大陸前方嘅香波地群島由七十九棵巨型亞爾其曼紅樹組成，樹根分泌出飄浮樹脂泡泡！隔離就係月牙灣要塞馬林梵多——白鬍子海賊團與海軍本部十萬精銳爆發頂上戰爭嘅歷史戰場。',
      keyFacts: [
        '工匠雷利（「冥王」西爾巴茲・雷利！）幫千陽號包上紅樹樹脂泡泡膜，令船隻可以潛落一萬米深海。',
        '頂上戰爭後，路飛敲響十六下奧克斯大鐘，與全團立下「兩年後香波地重聚」嘅修煉誓言！'
      ]
    },
    'fishman-island': {
      name: '魚人島（紅土大陸正下方海底一萬米夢幻龍宮！）',
      subtitle: '由陽樹夏娃樹根傳遞陽光與空氣嘅雙層大氣泡海底樂園！',
      summary:
        '位於海底一萬米、穿過紅土大陸底部巨大岩洞嘅必經海底關口！全靠超巨型「陽樹夏娃」將海面陽光同氧氣一路傳落海底，先令深海綻放出五彩斑斕嘅珊瑚龍宮王國！',
      keyFacts: [
        '人魚公主白星正正就係數百年先誕生一次、能夠號令超巨型海王類嘅古代兵器「海皇波塞冬」！',
        '海之森收藏住八百年前「喬伊波伊」寫畀魚人島公主嘅謝罪歷史本文同巨船諾亞。'
      ]
    },
    dressrosa: {
      name: '德雷斯羅薩與格林比特（熱情玩具與向日葵鬥技場之島）',
      subtitle: '路飛四檔登場、薩波重逢繼承火焰 ＆ 草帽大船團結成！',
      summary:
        '四周被尖銳岩石高牆包圍嘅新世界熱情國度！路飛同羅嘅海賊同盟喺度揭穿多佛朗明哥將國民變成玩具嘅陰謀，路飛首次變身「四檔彈跳人」一拳擊碎鳥籠！',
      keyFacts: [
        '薩波喺鬥牛競技場同路飛感人重逢，並食下艾斯留低嘅燒燒果實！',
        '戰後七個強大海賊團共五千六百名戰士自願飲下子分盃，組成「草帽大船團」！'
      ]
    },
    'zou-zunesha': {
      name: '佐烏 —— 行走一千年嘅超巨型象主！',
      subtitle: '馱喺二十公里高活體巨象背上嘅毛皮族公國 ＆ 第一塊路標歷史本文！',
      summary:
        '佐烏根本唔係固定喺海床嘅島嶼，所以任何記錄指針都永遠搵唔到佢！一頭活咗超過一千年嘅擎天巨象「象主」日夜喺新世界大海上面行走，背脊森林住住重情重義嘅毛皮族！',
      keyFacts: [
        '鯨魚森林大樹內部隱藏住鮮紅色嘅「第一塊路標歷史本文」，揭開通往最終之島嘅四點交叉秘密！',
        '路飛同桃之助都聽得見象主心靈深處嘅「萬物之聲」！'
      ]
    },
    'whole-cake': {
      name: '萬國蛋糕島（托特蘭三十四座甜品群島）',
      subtitle: '四皇大媽嘅童話糖果海域、奪還山治 ＆ 第二塊路標歷史本文！',
      summary:
        '主島形狀好似一座超巨型多層結婚蛋糕，四周環繞住朱古力島、堅果島、餅乾島同芝士島等三十四座美味島嶼！草帽小隊闖入茶會成功救回山治，山治仲親手焗出極品結婚蛋糕平息大媽暴走！',
      keyFacts: [
        '「靈魂之王」布魯克潛入寶物庫智鬥大媽，成功將第二塊路標歷史本文拓印本藏入自己個骷髏頭入面帶走！',
        '路飛喺鏡世界激戰卡塔庫栗，成功突破極限練成「預見未來」見聞色霸氣！'
      ]
    },
    'wano-country': {
      name: '和之國與鬼島骷髏巨頂（瀑布要塞武士之國）',
      subtitle: '鯉魚逆流大瀑布、六大氣候鄉里、富士山底舊和之國 ＆ 五檔覺醒！',
      summary:
        '屹立喺高聳瀑布斷崖頂端嘅閉關武士強國，海賊船要靠巨型錦鯉拉住先衝得上瀑布！內海分布住花之都、九里、兔丼、白舞、鈴後同希美六大地區，對開海面仲有百獸凱多盤踞嘅角狀骷髏島「鬼島」！',
      keyFacts: [
        '花之都富士山正下方嘅淹沒「舊和之國」藏有第三塊路標歷史本文，以及沉睡嘅古代兵器戰艦「冥王」！',
        '鬼島屋頂決戰之中，路飛伴隨解放之鼓覺醒「五檔太陽神尼卡」，擊敗凱多解放和之國！'
      ]
    },
    'laugh-tale': {
      name: '拉夫德爾（四塊路標歷史本文「X」座標交匯嘅最終之島！）',
      subtitle: '哥爾・D・羅傑同光月御田開懷大笑、留低大秘寶嘅世界盡頭！',
      summary:
        '世上冇任何指南針或記錄指針可以指向拉夫德爾！海賊團必須集齊四塊鮮紅色「路標歷史本文」嘅古代文字座標，喺世界海圖連成對角十字「X」，正中心交匯點就係八百年無人踏足嘅最終之島！',
      keyFacts: [
        '羅傑讀完喬伊波伊留低嘅八百年前故事後笑到飆眼淚，於是將呢座島命名為「歡笑傳說（拉夫德爾）」！',
        '點擊頂部紅色路標歷史本文按鈕集齊四塊拓印，即可喺 3D 地球儀解鎖四道紅光交匯特效！'
      ]
    },
    egghead: {
      name: '未來島蛋頭島（龐克紀錄巨蛋與五百年後科學都市）',
      subtitle: '貝加龐克博士嘅全息研究所、大熊記憶氣泡 ＆ 震撼全球直播！',
      summary:
        '由全島空調系統調節恆溫嘅世界政府頭號科學島！下層係充滿全息投影怪獸同自動煮食機嘅「製造層」，上層雲端飄浮住裂開巨蛋形狀嘅「研究層」與貝加龐克巨腦「龐克紀錄」！',
      keyFacts: [
        '大熊跨越紅土大陸趕抵蛋頭島救下愛女波妮，波妮仲與五檔路飛雙雙化身白髮太陽神尼卡！',
        '沉睡二百年嘅古代鐵巨人「埃米特」聽到解放之鼓甦醒，釋放喬伊波伊留低嘅最強霸王色霸氣結繩震退五老星！'
      ]
    },
    elbaph: {
      name: '艾爾巴夫 —— 戰士之國與擎天寶樹亞當',
      subtitle: '烏索普夢寐以求嘅巨人王國、薩烏羅重逢 ＆ 世界樹三層神話國度！',
      summary:
        '草帽一夥喺東利同布洛基「巨兵海賊團」護送下，終於踏上自小花園篇起憧憬咗超過二十年嘅巨人王國艾爾巴夫！整座國度建立喺比雲層更高嘅超巨型「寶樹亞當」之上，分為冥界、陽界同天界三層壯麗世界！',
      keyFacts: [
        '妮歌・魯賓喺艾爾巴夫貓頭鷹圖書館同救命恩人薩烏羅中將催淚重逢，再次笑出「嗲嘞嘻嘻嘻」！',
        '製造海賊王黃金傑克森號同草帽一夥千陽號嘅無敵木材，正正就係來自艾爾巴夫呢棵神聖寶樹亞當！'
      ]
    }
  };

  const canonicalMaps = {
    'reverse-mountain-x-map': {
      title: '顛倒山與世界對角線「X」形海圖（四海＋無風帶）',
      badge: '漫畫第 101 話 ／ 動畫第 62 集經典海圖',
      description:
        '點解偉大航道繞地球一圈，四片海洋卻叫做東、南、西、北海呢？可樂斯醫生嘅海圖揭曉答案：紅土大陸同偉大航道係以「45度斜角對角線」交叉成一個大「X」！所以四片三角形海洋正正位於正北、正東、正南、正西，四海海流仲會齊齊衝上顛倒山匯入偉大航道！',
      hotspots: [
        { label: '🧭 北海', note: '山治、羅嘅出生地，亦係蒙布朗・諾蘭度繪本傳說之海！' },
        { label: '🌅 東海', note: '路飛、卓洛、奈美、烏索普同海賊王羅傑嘅故鄉！' },
        { label: '📚 西海', note: '紅髮撒古斯、布魯克與考古學聖地奧哈拉所在海域！' },
        { label: '🔧 南海', note: '芬奇、艾斯、基德同波妮成長嘅冒險海域！' },
        { label: '🌀 顛倒山山頂匯流口', note: '四海激流逆流衝上山頂，再一齊俯衝入偉大航道！' },
        { label: '🐍 無風帶（海王類巢穴！）', note: '夾住偉大航道兩側嘅無風海域，住滿超巨型海王類！' },
        { label: '🧱 赤紅之壁・紅土大陸', note: '高達一萬米、環繞地球一周嘅不滅岩石大陸。' }
      ]
    },
    'vertical-cross-section-map': {
      title: '世界二萬米垂直剖面圖：＋10,000米空島至－10,000米魚人島',
      badge: '空島白白海與海底魚人島立體圖解',
      description:
        '海賊王世界垂直跨度足足高達兩萬米！高空正一萬米飄浮住白白海上面嘅空島斯卡皮亞（要乘搭爆炸性沖天海流先上到去）；海平面零米係紅土大陸旁邊嘅香波地群島；而海底負一萬米嘅紅土大陸洞穴大氣泡入面，就係由陽樹夏娃照亮嘅魚人島！',
      hotspots: [
        { label: '☁️ 空島斯卡皮亞與神之島（＋10,000米）', note: '黃金鄉山多拉遺址與黃金大鐘飄浮喺實體海雲之上！' },
        { label: '🌊 沖天海流海底間歇泉', note: '海底蒸氣大爆發形成嘅擎天水柱，將海賊船直送上雲海！' },
        { label: '🫧 香波地紅樹泡泡林（0米海平面）', note: '亞爾其曼紅樹分泌天然樹脂泡泡，幫海賊船鍍膜潛入深海。' },
        { label: '🧱 紅土大陸萬米絕壁（＋10,000米）', note: '海賊船無法翻越岩壁，必須鍍膜潛入海底穿過底部洞穴！' },
        { label: '🧜‍♀️ 魚人島雙層大氣泡（－10,000米）', note: '靠陽樹夏娃巨大樹根將海面陽光同空氣傳送到萬米深海！' }
      ]
    },
    'grandline-sea-chart': {
      title: '偉大航道全海圖：七條磁力航線與四塊路標歷史本文',
      badge: '奈美與犬嵐公爵漫畫航海圖',
      description:
        '結合雙子岬可樂斯（第 105 話）與佐烏犬嵐公爵（第 818 話）嘅完整航道圖！由左邊顛倒山出發，海賊喺「樂園」七條記錄指針磁力航線揀一條前進，全部匯聚於香波地與馬林梵多，再潛入負一萬米魚人島闖入「新世界」，集齊四塊紅色路標歷史本文解鎖拉夫德爾！',
      hotspots: [
        { label: '⛰️ 顛倒山與鯨魚拉布', note: '偉大航道入口，島嶼鯨魚拉布一直喺度守候倫巴海賊團！' },
        { label: '🏜️ 阿拉巴斯坦王國', note: '沙漠大國，路飛喺度擊敗克洛克達爾，魯賓其後登船！' },
        { label: '☁️ 空島斯卡皮亞（＋10,000米高空航線）', note: '乘搭沖天海流衝上白白海敲響黃金鐘！' },
        { label: '🌊 水之七島與司法島', note: '芬奇打造千陽號、路飛研發二檔救回魯賓嘅熱血舞台！' },
        { label: '⛓️ 海底監獄推進城與三角海流', note: '無風帶海底要塞，以漩渦正義之門連接司法島與馬林梵多！' },
        { label: '🫧 香波地群島與馬林梵多', note: '樂園七條航線終點匯聚處及頂上戰爭歷史戰場！' },
        { label: '🧜‍♀️ 海底萬米魚人島', note: '穿過紅土大陸底部進入新世界嘅深海泡泡龍宮關口。' },
        { label: '🌻 德雷斯羅薩（新世界）', note: '路飛與羅同盟擊敗多佛朗明哥、薩波繼承燒燒果實之地！' },
        { label: '🐘 佐烏巨象（第一塊路標歷史本文）', note: '千年巨象象主背負毛皮族與第一塊紅色路標歷史本文！' },
        { label: '🎂 萬國蛋糕島（第二塊路標歷史本文）', note: '大媽領地，布魯克智盜拓印本、路飛練成預見未來！' },
        { label: '🐉 和之國與鬼島（第三塊路標歷史本文）', note: '武士瀑布要塞，五檔路飛、羅與基德聯手擊敗凱多同大媽！' },
        { label: '👑 最終之島拉夫德爾（十字交匯點！）', note: '四塊紅色路標歷史本文座標交叉點，大秘寶沉睡之地！' }
      ]
    },
    'wano-onigashima-woodblock-map': {
      title: '和之國六大鄉里浮世繪海圖與空中鬼島骷髏城',
      badge: '和之國第一至三幕漫畫浮世繪海圖',
      description:
        '漫畫和之國每一幕開幕都會展示嘅傳統浮世繪海圖！和之國高踞喺湍急大瀑布頂端嘅天然城牆內，內海環繞住六大氣候迥異嘅鄉里（花之都與富士山、九里、兔丼、白舞、鈴後、希美），外海仲有百獸凱多盤踞嘅角狀骷髏島「鬼島」！',
      hotspots: [
        { label: '🐟 巨型錦鯉攀瀑入口', note: '千陽號勾住巨型錦鯉一路逆流衝上和之國高聳大瀑布！' },
        { label: '🌸 花之都與富士山', note: '和之國中心都城——富士山正下方沉睡住舊和之國與第三塊路標石碑！' },
        { label: '⚔️ 九里與御田城遺址', note: '傳說武士光月御田治理嘅鄉里，討伐鬼島大計就喺度籌備！' },
        { label: '⛓️ 兔丼囚犯採石場', note: '豹五郎大叔喺度教識路飛高等武裝色霸氣「流櫻」內部破壞！' },
        { label: '❄️ 常冬之地鈴後（名刀閻魔與龍馬）', note: '白雪皚皚嘅刀塚之地，卓洛喺劫道橋激戰並獲贈御田名刀閻魔！' },
        { label: '💀 鬼島骷髏巨頂（五檔覺醒與大和！）', note: '凱多用焰雲將鬼島托上半空，路飛與大和聯手守護和之國！' }
      ]
    },
    'thousand-sunny-cutaway': {
      title: '千陽號造船剖面藍圖：寶樹亞當船身、水族館酒吧與士兵船塢系統',
      badge: '芬奇與冰山社長親手繪製設計藍圖',
      description:
        '喺水之七島選用無價之寶「寶樹亞當」木材建成嘅夢幻海賊船！芬奇嘅建築剖面圖完整展示獅頭船首隱藏嘅「獅吼炮」、船底轉盤式「士兵船塢系統（零至五號頻道）」、環迴玻璃「水族館酒吧」、山治設密碼鎖嘅廚房、奈美蜜柑園、卓洛瞭望台健身室，以及船尾三桶可樂噴射「風來爆破」！',
      hotspots: [
        { label: '🦁 獅子船首像與獅吼炮', note: '金色鬃毛可以好似螺旋槳咁高速旋轉倒船，張開口仲可以發射超強可樂空氣炮「獅吼炮」！' },
        { label: '⚙️ 士兵船塢系統（零至五號頻道）', note: '船腹大型轉盤倉庫，收納外輪槳、白木馬一號、迷你梅利二號、鯊魚潛水艇三號、黑犀牛四號同腕龍戰車五號！' },
        { label: '🐠 環迴水族館酒吧與密碼鎖廚房', note: '整面牆都係活生生海洋魚缸嘅休息室，經升降餐梯直通山治「7326」密碼鎖大雪櫃！' },
        { label: '🍊 綠茵真草皮甲板與奈美蜜柑樹', note: '甲板鋪滿真實泥土草皮最啱瞓晏覺，屋頂種住貝爾梅爾果園三棵蜜柑樹同魯賓圖書館！' },
        { label: '🏋️ 前桅瞭望台天文室與卓洛健身房', note: '24小時全天候瞭望圓頂，放滿幾噸重槓鈴畀卓洛日夜鍛煉！' },
        { label: '🚀 船尾風來爆破可樂噴射引擎', note: '一次過引爆三桶特大可樂，將整艘五十六米巨船直送飛越一公里高空脫險！' }
      ]
    },
    'egghead-elbaph-map': {
      title: '最終章新世界海圖：未來島蛋頭島與巨人王國艾爾巴夫',
      badge: '漫畫第 1061 至 1130＋話最終章海圖',
      description:
        '離開和之國大瀑布後，草帽一夥向東南駛入機械海獸巡邏嘅暖流冬島海域，抵達貝加龐克博士「領先五百年」嘅未來島蛋頭島（分為下層製造層同雲上研究層龐克紀錄）！喺東利與布洛基巨兵海賊團支援下衝破屠魔令重圍，向東北揚帆直達艾爾巴夫同擎天寶樹亞當！',
      hotspots: [
        { label: '🧠 雲上研究層與龐克紀錄巨蛋', note: '飄浮喺島雲之上並受邊境激光圓頂保護，存放住貝加龐克巨大共享大腦！' },
        { label: '🤖 下層製造層與巨大機械人機庫', note: '全島冷暖空調恆溫嘅霓虹全息未來都市，路飛、甚平、喬巴同波妮最先登陸之地！' },
        { label: '🐾 大熊奇蹟趕到與突破包圍網', note: '巴索羅繆・大熊跨越紅土大陸趕抵蛋頭島，喺薩坦聖同黃猿面前拼命守護愛女波妮！' },
        { label: '🛡️ 巨兵海賊團大船「偉大埃里克號」', note: '東利同布洛基（每人十八億懸賞！）使出霸國震退五老星，護送千陽號前往艾爾巴夫！' },
        { label: '🌳 戰士之國艾爾巴夫與擎天寶樹亞當', note: '傳說巨人王國！貫穿冥界、陽界、天界嘅世界大樹，實現烏索普與路飛二十年來嘅夢想！' }
      ]
    }
  };

  const timelineArcs = {
    'romance-dawn-east-blue': {
      saga: '東海篇',
      title: '冒險黎明、橘子鎮、巴拉蒂、惡龍領域與羅格鎮',
      episodes: '第 1–61 集',
      ship: '小木桶 ➔ 前進梅利號',
      bountyMilestone: '30,000,000 貝里（路飛首次懸賞！）',
      crewJoined: ['路飛', '卓洛', '奈美', '烏索普', '山治'],
      mainBoss: '小丑巴基、克利克提督、惡龍及斯摩格上校',
      storySummary:
        '戴住撒古斯草帽嘅橡膠少年路飛由木桶跳出展開大冒險！先後招募三刀流劍士卓洛、天才航海士奈美、神射手烏索普同海上廚師山治，駕駛前進梅利號一腳踏平惡龍領域，喺羅格鎮迎住暴風雨衝向偉大航道！',
      worldLesson:
        '東海係全球四大海洋中最和平嘅一片海，要進入偉大航道，五位夥伴就喺暴雨中將腳踏上木桶立下各自夢想嘅誓言！'
    },
    'enter-grand-line': {
      saga: '阿拉巴斯坦篇（前篇）',
      title: '顛倒山逆流運河、鯨魚拉布與磁鼓島冬櫻',
      episodes: '第 62–91 集',
      ship: '前進梅利號',
      bountyMilestone: '30,000,000 貝里',
      crewJoined: ['托尼托尼・喬巴'],
      mainBoss: '蠟燭人加爾迪諾 ＆ 吞吞果實瓦波爾國王',
      storySummary:
        '前進梅利號順住激流衝上顛倒山山頂俯衝入偉大航道！喺雙子岬遇見守候五十年嘅巨鯨拉布並護送薇薇公主，途經太古之島小花園結識巨人東利與布洛基，再喺冰雪磁鼓島綻放粉紅櫻花奇蹟，邀請藍鼻船醫喬巴上船！',
      worldLesson:
        '偉大航道每座島都有強烈礦物磁場，普通指南針完全失靈，必須依靠手腕上嘅「記錄指針」儲滿磁力先可以航向下一個島！'
    },
    'alabasta-kingdom': {
      saga: '阿拉巴斯坦篇（決戰）',
      title: '沙漠大國阿拉巴斯坦王都決戰',
      episodes: '第 92–130 集',
      ship: '前進梅利號',
      bountyMilestone: '100,000,000 貝里（路飛）＆ 60,000,000（卓洛）',
      crewJoined: ['妮歌・魯賓'],
      mainBoss: '王下七武海「沙・克洛克達爾」',
      storySummary:
        '為咗阻止巴洛克工作社挑起沙漠王國大內戰，草帽一夥全員浴血奮戰！路飛經歷兩次敗北後發現水分可以凝固流沙，最終以「橡膠暴風雨」將克洛克達爾轟穿地層，天降甘霖拯救全國！神秘考古學家妮歌・魯賓隨即加入船隊。',
      worldLesson:
        '首次揭示三大勢力之一「王下七武海」、不可摧毀嘅古代石碑「歷史本文」，以及沉睡嘅古代兵器「冥王」！'
    },
    'skypiea-arc': {
      saga: '空島篇',
      title: '加雅島沖天海流與一萬米高空空島斯卡皮亞',
      episodes: '第 144–195 集',
      ship: '前進梅利號（飛行模式！）',
      bountyMilestone: '100,000,000 貝里',
      crewJoined: [],
      mainBoss: '鬣狗貝拉密 ＆ 響雷果實「神」艾尼路',
      storySummary:
        '喺加雅島聽完黑鬍子高呼「人嘅夢想係唔會終結㗎！」之後，草帽一夥乘搭爆炸性沖天海流直飛一萬米高空嘅白白海！路飛憑天然絕緣嘅橡膠身軀克制艾尼路兩億伏特雷電，一拳敲響黃金大鐘，將巨大身影投射落青海證明黃金鄉真實存在！',
      worldLesson:
        '證明海賊王世界向上延伸至一萬米雲海，而海賊王羅傑二十多年前早已上過空島並喺黃金鐘留低古代文字指引！'
    },
    'water7-enies-lobby': {
      saga: '水之七島・司法島篇',
      title: '水之七島、司法島奪還戰與新船千陽號誕生',
      episodes: '第 229–325 集',
      ship: '前進梅利號 ➔ 千陽號',
      bountyMilestone: '300,000,000 貝里（路飛）—— 草帽全員懸賞！',
      crewJoined: ['芬奇'],
      mainBoss: '青雉大將、羅布・路奇及九號秘密諜報機關',
      storySummary:
        '為救出甘願犧牲自己保護同伴嘅魯賓，草帽一夥乘搭海上列車殺入不夜瀑布要塞司法島，射穿世界政府旗幟宣戰！路飛開啟「二檔」同「三檔」擊敗路奇，前進梅利號奇蹟趕到救出全員後溫暖道別，船匠芬奇隨即用寶樹亞當建成千陽號入團！',
      worldLesson:
        '介紹三大政府中樞（司法島、推進城、馬林梵多）連接嘅「正義之門」，以及無堅不摧嘅「寶樹亞當」與士兵船塢黑科技！'
    },
    'thriller-bark-sabaody': {
      saga: '恐怖三桅帆船・香波地篇',
      title: '骷髏音樂家布魯克入團與十一位超新星齊聚',
      episodes: '第 337–405 集',
      ship: '千陽號',
      bountyMilestone: '300,000,000 貝里',
      crewJoined: ['布魯克'],
      mainBoss: '月光・摩利亞、巴索羅繆・大熊 ＆ 黃猿大將',
      storySummary:
        '千陽號穿越魔鬼三角地帶奪回眾人影子，正式迎接拉布苦等五十年嘅音樂家布魯克！去到紅土大陸前嘅香波地泡泡群島，路飛為保護魚人朋友一拳打飛天龍人引來黃猿大將圍捕，幸得大熊用肉球果實將全團拍飛往世界各地修煉保命！',
      worldLesson:
        '樂園全部七條磁力航線都會匯聚喺香波地群島；海賊船必須用亞爾其曼紅樹樹脂鍍膜，先可以潛入萬米海底前往新世界！'
    },
    'summit-war-marineford': {
      saga: '頂上戰爭篇',
      title: '女兒島、推進城大越獄、馬林梵多頂上戰爭與兩年修煉之約',
      episodes: '第 408–516 集',
      ship: '九蛇海賊船 ＆ 海軍軍艦',
      bountyMilestone: '400,000,000 貝里（路飛）',
      crewJoined: [],
      mainBoss: '麥哲倫署長、赤犬／黃猿／青雉三大將 ＆ 黑鬍子',
      storySummary:
        '喺女帝漢考克協助下，路飛勇闖海底監獄推進城聯同甚平、巴基、克洛克達爾衝往海軍本部馬林梵多營救哥哥艾斯！經歷震撼時代嘅頂上戰爭與白鬍子「大秘寶真實存在」宣言後，路飛喺甚平同雷利扶持下重新振作，全團展開兩年刻苦修煉！',
      worldLesson:
        '全面揭開見聞色、武裝色、霸王色「三色霸氣」體系——進入新世界抗衡自然系強者與四皇嘅必備力量！'
    },
    'fishman-island-return': {
      saga: '魚人島篇',
      title: '兩年後香波地重聚與潛入負一萬米深海魚人島',
      episodes: '第 517–574 集',
      ship: '鍍膜千陽號',
      bountyMilestone: '400,000,000 貝里',
      crewJoined: [],
      mainBoss: '霍迪・瓊斯 ＆ 范德・戴肯九世',
      storySummary:
        '經過兩年修行實力脫胎換骨嘅草帽九人喺香波地重聚，乘坐鍍膜千陽號潛落海底一萬米抵達珊瑚樂園魚人島！路飛用五萬人瞬間暈倒嘅霸王色霸氣守護龍宮王國，甚平捐出同血型鮮血救路飛，打破人類與魚人隔閡！',
      worldLesson:
        '揭曉陽樹夏娃點樣照亮萬米海底、白星公主身為古代兵器「海皇波塞冬」嘅秘密，以及喬伊波伊嘅八百年約定！'
    },
    'punk-hazard-dressrosa': {
      saga: '龐克哈薩德・德雷斯羅薩篇',
      title: '羅海賊同盟、四檔彈跳人登場與草帽大船團結義',
      episodes: '第 579–746 集',
      ship: '千陽號',
      bountyMilestone: '500,000,000 貝里（路飛）',
      crewJoined: [],
      mainBoss: '凱撒・庫朗 ＆ 王下七武海唐吉訶德・多佛朗明哥',
      storySummary:
        '衝上冰火島龐克哈薩德後，路飛與羅結成同盟劍指四皇凱多！喺德雷斯羅薩路飛與結拜二哥薩波感人重逢，烏索普覺醒見聞色封號「大神」，路飛更開啟霸氣結合彈性嘅「四檔」將多佛朗明哥連同鳥籠一拳轟碎，五千六百名強者自組草帽大船團！',
      worldLesson:
        '首次展示「惡魔果實覺醒」改變周圍環境嘅境界，以及新世界「三指針記錄指針」探測最危險磁場航線嘅規則！'
    },
    'zou-whole-cake': {
      saga: '佐烏・萬國蛋糕島篇',
      title: '千年巨象路標歷史本文與闖入四皇大媽蛋糕城',
      episodes: '第 751–877 集',
      ship: '千陽號',
      bountyMilestone: '1,500,000,000 貝里（「海上第五皇」路飛！）',
      crewJoined: ['甚平（正式宣誓入團！）'],
      mainBoss: '旱災傑克、夏洛特・卡塔庫栗 ＆ 四皇大媽',
      storySummary:
        '登上千年活體巨象佐烏後，毛皮族向草帽一夥展示第一塊紅色「路標歷史本文」！隨後路飛帶隊闖入四皇大媽嘅萬國蛋糕島接返山治，布魯克智盜第二塊拓印本，甚平霸氣退團加入草帽，路飛更喺鏡世界激戰卡塔庫栗練成預見未來！',
      worldLesson:
        '解開通往最終之島「拉夫德爾」嘅終極地圖謎題：集齊四塊鮮紅色路標歷史本文，四點連線中心就係大秘寶所在！'
    },
    'wano-country-act1-2': {
      saga: '和之國篇（前中篇）',
      title: '和之國六大鄉里、光月御田傳奇航海與流櫻修行',
      episodes: '第 890–999 集',
      ship: '千陽號',
      bountyMilestone: '1,500,000,000 貝里',
      crewJoined: ['甚平（掌舵手正式歸隊！）'],
      mainBoss: '四皇「百獸」凱多（青龍）＆ 黑炭大蛇將軍',
      storySummary:
        '草帽同盟乘錦鯉衝上大瀑布潛入閉關武士之國！路飛喺兔丼採石場苦練內部破壞霸氣「流櫻」，卓洛獲贈光月御田曾斬傷凱多嘅名刀「閻魔」，並揭曉當年御田隨白鬍子與羅傑抵達拉夫德爾開懷大笑嘅壯闊歷史！',
      worldLesson:
        '展示和之國天然瀑布要塞地理、世界海樓石鍛造發源工藝，以及羅傑命名最終之島「拉夫德爾」嘅真相！'
    },
    'onigashima-gear5': {
      saga: '和之國篇（鬼島最高潮）',
      title: '鬼島火祭大決戰、五檔太陽神覺醒與新四皇誕生！',
      episodes: '第 1000–1085 集',
      ship: '千陽號（十人全員齊集！）',
      bountyMilestone: '3,000,000,000 貝里（新四皇蒙奇・D・路飛！）',
      crewJoined: ['草帽十人全團集結完成！'],
      mainBoss: '四皇凱多 ＆ 四皇大媽雙皇同盟',
      storySummary:
        '火祭之夜，甚平掌舵率領武士、毛皮族與三大超新星奇襲空中鬼島！卓洛與山治雙翼齊飛擊敗燼與奎因，羅與基德聯手覺醒擊落大媽，而路飛伴隨解放之鼓覺醒「五檔太陽神尼卡」，一招猿神槍擊潰青龍凱多，正式登頂新世界四皇！',
      worldLesson:
        '揭曉橡膠果實隱藏八百年嘅真名「人人果實・幻獸種・尼卡型態」，以及富士山底沉睡嘅第三塊路標石碑與古代兵器冥王！'
    },
    'future-island-egghead': {
      saga: '最終章（蛋頭島篇）',
      title: '未來島蛋頭島、大熊催淚記憶與貝加龐克全球直播！',
      episodes: '第 1086–1122＋集（漫畫 1060–1125 話）',
      ship: '千陽號 ＆ 巨兵海賊團大船',
      bountyMilestone: '3,000,000,000 貝里（四皇路飛）＆ 320,000,000（波妮）',
      crewJoined: ['貝加龐克莉莉絲 ＆ 波妮同行出航！'],
      mainBoss: '覺醒路奇、黃猿大將 ＆ 五老星全員降臨（薩坦聖！）',
      storySummary:
        '草帽一夥登陸貝加龐克嘅未來島蛋頭島，見證大熊一生守護女兒波妮嘅感人記憶！面對史上最大百艦屠魔令同五老星全員真身降臨，大熊奇蹟趕到，路飛與波妮化身雙重白髮尼卡，聯同東利、布洛基及古代鐵巨人埃米特霸王色結繩突圍成功！',
      worldLesson:
        '貝加龐克向全球廣播揭露驚天秘密：空白一百年大戰曾令全球海平面暴漲二百米，現今無數島嶼其實係淹沒古代大陸嘅山頂！'
    },
    'elbaph-giants-kingdom': {
      saga: '最終章（艾爾巴夫篇）',
      title: '戰士之國艾爾巴夫、擎天寶樹亞當與奧哈拉催淚重逢！',
      episodes: '漫畫第 1126 話起最新連載',
      ship: '千陽號 ＆ 偉大埃里克號',
      bountyMilestone: '每人 1,800,000,000 貝里（東利與布洛基雙船長！）',
      crewJoined: [],
      mainBoss: '神之騎士團 ＆ 冥界未知強敵',
      storySummary:
        '喺東利與布洛基盛大歡迎下，路飛同烏索普終於踏上夢想二十多年嘅巨人王國艾爾巴夫，仰望直通冥界、陽界、天界嘅超巨型寶樹亞當！魯賓更喺貓頭鷹圖書館同救命恩人薩烏羅中將重逢相擁而泣，向最終之島拉夫德爾邁進！',
      worldLesson:
        '呈現艾爾巴夫世界樹三層宏偉構造，以及巨人族將奧哈拉全體學者遺留書籍完整守護傳承嘅歷史奇蹟！'
    }
  };

  const ships = {
    'thousand-sunny': {
      name: '千陽號（「好似太陽咁燦爛穿越千重海洋嘅夢幻之船」）',
      shortName: '千陽號',
      classType: '雙桅橫帆單桅帆船（寶樹亞當無敵船體）',
      shipwright: '改造人芬奇、冰山社長及卡雷拉公司首席船匠（水之七島）',
      dimensions: '全高：56米 • 全長：39米 • 動力燃料：冰凍可樂木桶！',
      summary:
        '喺水之七島由芬奇與冰山社長不眠不休五日五夜，選用同海賊王羅傑「黃金傑克森號」一模一樣嘅無價神木「寶樹亞當」打造而成！千陽號擁有真實綠草皮甲板、奈美蜜柑果園、360度環迴水族館酒吧、六頻道轉盤「士兵船塢系統」、獅頭隱藏「獅吼炮」，以及消耗三桶可樂就能帶整艘船飛越一公里天空嘅「風來爆破」！',
      channels: [
        {
          channel: '零號頻道',
          name: '可樂動力外輪推進器',
          summary:
            '船體左右兩側「0」號艙門展開化成雙側高速可樂外輪船槳，就算喺完全無風嘅無風帶或者狂暴大漩渦都可以全速破浪前進！'
        },
        {
          channel: '一號頻道',
          name: '白木馬一號（單人高速威霸水上電單車）',
          summary:
            '原本係奈美喺空島帶落嚟嘅噴射貝威霸，經芬奇改裝加上可愛白馬頭造型同強力車頭燈，水上極速破表！'
        },
        {
          channel: '二號頻道',
          name: '迷你梅利二號（四人座蒸汽外輪小船）',
          summary:
            '芬奇送畀草帽一夥嘅暖心驚喜禮物！船頭保留咗前進梅利號最親切嘅白羊頭像，最啱四個人輕鬆登島買餸探險。'
        },
        {
          channel: '三號頻道',
          name: '鯊魚潛水艇三號（五千米深海偵察潛艇）',
          summary:
            '可乘坐三人嘅鯊魚造型深海偵察潛水艇，配備電話蟲潛望鏡通訊系統，潛航深度極限足足去到海底五千米！'
        },
        {
          channel: '四號頻道',
          name: '黑犀牛四號（瓦波合金重裝三輪電單車）',
          summary:
            '兩年後新研發嘅瓦波合金裝甲突擊電單車，能夠同五號頻道腕龍戰車瞬間合體成為「鐵人海賊・芬奇將軍」！'
        },
        {
          channel: '五號頻道',
          name: '腕龍戰車五號（喬巴司令官重型履帶坦克）',
          summary:
            '由「喬巴司令官」探頭指揮嘅恐龍造型重型火炮戰車，同黑犀牛四號合體即可變身超巨型機械人芬奇將軍！'
        }
      ],
      rooms: [
        {
          id: 'gaon-figurehead',
          name: '黃金獅頭船首像與獅吼炮',
          deck: '船首甲板',
          detail:
            '金色獅子鬃毛可以好似飛機螺旋槳咁高速旋轉緊急倒船；張開獅口仲隱藏住超強空氣主炮「獅吼炮」，配合船尾反作用力噴射可轟平整支敵艦隊（每次消耗五桶可樂）！'
        },
        {
          id: 'lawn-mikan',
          name: '天然綠茵草皮甲板與奈美蜜柑園',
          deck: '中央主甲板及船尾上層',
          detail:
            '中央甲板鋪滿真實泥土同軟綿綿青草，上層屋頂種住奈美由可可亞西村貝爾梅爾果園移植嘅三棵珍貴蜜柑樹同烏索普嘅綠星花園！'
        },
        {
          id: 'aquarium-bar',
          name: '360度環迴水族館酒吧休息室',
          deck: '二樓船艙內部',
          detail:
            '巨型圓柱體海水魚缸包圍成間休息室，夥伴可以一邊欣賞捉返嚟嘅偉大航道珍奇海魚（路飛成日想釣走入面啲鯊魚！），一邊飲山治由升降餐梯送落嚟嘅特飲。'
        },
        {
          id: 'kitchen-1000-lock',
          name: '山治五星級廚房與「7326」密碼鎖大雪櫃',
          deck: '上層建築主艙',
          detail:
            '配備餐廳級大焗爐，最特別係裝咗粗鋼鎖鏈加四位數密碼鎖（秘密密碼係「7326」代表奈美同魯賓生日諧音！）嘅巨型雪櫃，專門防止路飛半夜偷食晒全星期啲肉！'
        },
        {
          id: 'infirmary-library',
          name: '喬巴醫務室、魯賓圓形圖書館與日式大浴場',
          deck: '船尾圓頂艙樓',
          detail:
            '喬巴張旋轉椅診症室直通全員藏書豐富嘅圓形圖書館（除咗路飛之外個個都有放書！），頂層仲有熱氣騰騰嘅日式錢湯大浴池。'
        },
        {
          id: 'crows-nest-coup',
          name: '前桅瞭望台健身房與船尾風來爆破火箭',
          deck: '主桅最高點及船尾',
          detail:
            '主桅頂端圓頂瞭望台放滿卓洛鍛煉用嘅超重槓鈴；而船尾噴射口只要點燃三桶特大可樂，就會發動「風來爆破」帶千陽號直飛一公里高空！'
        }
      ]
    },
    'going-merry': {
      name: '前進梅利號（永遠珍愛嘅第一位海賊船夥伴！）',
      shortName: '前進梅利號',
      classType: '卡拉維爾三角帆船（艙內舵桿操控）',
      shipwright: '西羅布村管家梅利設計 • 可雅小姐贈送',
      dimensions: '全高：13米 • 全長：16米 • 船首像：白羊特等席！',
      summary:
        '喺東海西羅布村獲可雅小姐贈送之後，前進梅利號載住路飛、卓洛、奈美、烏索普、山治、喬巴同魯賓橫越東海、衝上顛倒山、橫跨阿拉巴斯坦、乘沖天海流飛上一萬米空島，最後仲憑住深愛夥伴嘅船精靈「克拉巴特曼」創造奇蹟，獨自衝過水之諸神大風暴去到司法島接全團返屋企！',
      channels: [
        {
          channel: '特色一',
          name: '白羊彎角船首像（「路飛船長特等席」）',
          summary:
            '彎彎嘅白色綿羊角正正係路飛最鍾意坐喺上面吹海風、高呼「向偉大航道全速前進！」嘅專屬寶座！'
        },
        {
          channel: '特色二',
          name: '古典艙內直立舵桿（會議室操舵）',
          summary:
            '梅利號冇傳統圓形舵輪，而係採用十五世紀帆船經典嘅羊頭直立操舵桿，左右推動就能靈活轉向！'
        },
        {
          channel: '特色三',
          name: '空島飛行模式（加雅島公雞冠與木翅膀）',
          summary:
            '由加雅島猿山聯合軍幫梅利號加裝木製滑翔雙翼同公雞頭冠，令佢能夠喺一萬米高空海雲上面展翅滑翔！'
        },
        {
          channel: '特色四',
          name: '船精靈克拉巴特曼（愛船化生嘅守護精靈）',
          summary:
            '因為草帽一夥真心將梅利號當成親密同伴愛護，身穿雨衣手執木槌嘅船精靈喺空島現身修船，最後更獨自揚帆衝入司法島救走全體夥伴！'
        }
      ],
      rooms: [
        {
          id: 'merry-ram',
          name: '白羊船首像與艦首主炮艙',
          deck: '船首甲板',
          detail:
            '路飛特等席正下方船頭炮門設有一門前主炮，配合船尾兩門火炮守護航程。'
        },
        {
          id: 'merry-lounge',
          name: '溫馨會議餐廳、山治廚房與直立舵桿',
          deck: '中央主船艙',
          detail:
            '全團圍坐開大餐、奈美畫海圖同掌舵嘅溫暖木製船艙，充滿東海至空島每一段歡笑回憶。'
        },
        {
          id: 'merry-mikan',
          name: '奈美三棵蜜柑樹與女生船尾房',
          deck: '船尾上層甲板',
          detail:
            '來自可可亞西村嘅三棵清香蜜柑樹佇立喺奈美同魯賓房間上方（山治同烏索普死命保護唔畀路飛偷摘！）。'
        },
        {
          id: 'merry-klabautermann',
          name: '前進梅利號之魂（克拉巴特曼）',
          deck: '龍骨之心',
          detail:
            '「多謝你哋一直以嚟咁珍惜我……」就算龍骨斷裂，梅利號依然懇求冰山先生幫佢做最後一次修補，穿越暴風雨帶每一位草帽夥伴平安歸來。'
        }
      ]
    }
  };

  const devilFruits = {
    'gomu-nika': {
      name: '橡膠果實',
      wanoTrueName: '橡膠果實 ／ 人人果實・幻獸種・尼卡型態',
      englishName: '超人系橡膠果實',
      wanoEnglishName: '覺醒太陽神尼卡果實（五檔）',
      user: '蒙奇・D・路飛',
      zukanShape: '紫羅蘭色圓球蜜瓜造型，表皮佈滿連環「S」形唐草螺旋紋及綠色「T」形捲曲果蒂（漫畫第 1 話・惡魔果實圖鑑第一期）',
      powerSummary:
        '將食用者全身變成彈力十足、不怕子彈撞擊而且完全絕緣閃電嘅橡膠之軀！路飛仲憑住加速血液循環同吹脹骨頭研發出「二檔」同「三檔」。',
      wanoPowerSummary:
        '賜予極富彈性嘅橡膠身軀——去到和之國鬼島更覺醒隱藏八百年嘅真正姿態「動物系人人果實・幻獸種・太陽神尼卡（五檔）」！頭髮與衣衫化作純白雲霧，伴隨「解放之鼓」心跳聲，連大地同天空閃電都可以變成彈床同橡膠武器！',
      weakness: '海水、海樓石，以及鋒利嘅刀劍斬擊。'
    },
    'bara-bara': {
      name: '四分五裂果實',
      englishName: '分裂人間果實',
      user: '「千兩道化」巴基',
      zukanShape: '紫紅色橢圓漿果串造型，由多顆可分離螺旋紋圓球組成並配綠色葉冠（漫畫第 19 話・圖鑑第二期）',
      powerSummary:
        '能夠隨心所欲將身體分裂成無數浮空碎塊自由飛舞——令巴基完全免疫世上一切刀劍斬擊，就算係世界第一大劍豪「鷹眼」密佛格劈落嚟都傷唔到佢分毫！',
      weakness: '雙腳腳板必須留喺地面做支點，其餘身體部位只可以喺雙腳周圍一定半徑範圍內浮空飛行！'
    },
    'hito-chopper': {
      name: '人人果實',
      englishName: '人類智慧變身果實',
      user: '托尼托尼・喬巴',
      zukanShape: '鮮紅傘蓋配乳白菌柄嘅蘑菇造型，傘面佈滿捲曲螺旋紋及頂端綠色「T」形果蒂（單行本第 45 卷・圖鑑第一期）',
      powerSummary:
        '藍鼻小馴鹿食咗之後獲得人類智慧、語言能力同醫學天賦！喬巴仲成功研發秘藥「藍波球」，突破三段變身極限解鎖柔力強化、功夫強化同超巨型「怪物強化」等七段變身！',
      weakness: '長時間維持怪物強化之後，喬巴會暫時縮細變成手掌咁大嘅「迷你公公喬巴」休息回氣！'
    },
    'suna-suna': {
      name: '沙沙果實',
      englishName: '沙漠流沙果實',
      user: '沙・克洛克達爾',
      zukanShape: '沙黃色圓球仙人掌造型，左右伸出兩隻向上短臂，果皮帶螺旋稜紋及捲曲綠蒂（惡魔果實圖鑑第十期）',
      powerSummary:
        '將身體完全化為乾燥沙漠流沙！克洛克達爾可以揮出劈開大地嘅「沙漠寶刀」、捲起吞沒城鎮嘅巨型沙塵暴，右手一掂更能吸乾一切水分！',
      weakness: '只要掂到水或者任何液體，沙粒就會凝結變實，就算未識霸氣嘅拳頭都可以直接打中本體！'
    },
    'mera-mera': {
      name: '燒燒果實',
      englishName: '烈焰元素果實',
      user: '波特卡斯・D・艾斯',
      wanoUser: '波特卡斯・D・艾斯 ➔ 結拜兄弟薩波繼承！',
      zukanShape: '熾熱橙金色火焰圓果造型，果面由向上升騰嘅螺旋紋火舌組成（漫畫第 700 話・圖鑑第一期）',
      powerSummary:
        '能夠自由製造、操控並全身化為熊熊烈火嘅自然系惡魔果實——隨手一拳「火拳」就能轟穿整排海賊船，甚至凝聚出小型太陽「炎帝」！',
      weakness: '海水、武裝色霸氣，以及溫度更高一籌嘅火山岩漿。'
    },
    'hana-hana': {
      name: '花花果實',
      englishName: '百花綻放果實',
      user: '妮歌・魯賓',
      zukanShape: '層層盛開嘅玫瑰粉紅大麗花造型，每塊花瓣都印有螺旋紋並配頂端捲曲綠蒂（圖鑑第二期）',
      powerSummary:
        '只要喺視線範圍之內，無論目標郁得幾快，都可以好似粉紅花瓣盛開咁喺任何表面長出無數手臂、雙腳、耳仔甚至超巨型分身！',
      weakness: '咲出嚟嘅分身手腳一旦受傷，痛楚同傷害都會同步傳返去魯賓本體身上。'
    },
    'yomi-yomi': {
      name: '黃泉果實',
      englishName: '靈魂復活果實',
      user: '「靈魂之王」布魯克',
      zukanShape: '金黃色圓球果實，下方帶有四瓣牙齒狀凸起隱約構成骷髏輪廓，果面佈滿螺旋紋（圖鑑第十三期）',
      powerSummary:
        '賜予食用者靈魂第二次生命！布魯克唔單止可以靈魂出竅穿牆偵察、飲牛奶瞬間駁返斷骨，仲可以將黃泉極寒之氣注入拐杖劍瞬間冰封對手！',
      weakness: '浸入海水或海樓石會抽乾靈魂力氣（不過因為副白骨太輕，布魯克可以直接喺海面上狂奔唔沉落水！）。'
    },
    'ope-ope': {
      name: '手術果實',
      englishName: '空間手術果實（價值五十億「究極惡魔果實」）',
      user: '特拉法爾加・D・瓦鐵爾・羅',
      zukanShape: '鮮紅色心形士多啤梨果實，滿佈精緻螺旋紋及修長捲曲果蒂（漫畫第 765 話・圖鑑第三期）',
      powerSummary:
        '展開半透明藍色球體「手術空間」，喺領域內羅擁有絕對外科支配權——自由交換物體位置、無痛分割重組，覺醒後更能將大刀伸長貫穿地底釋放內部衝擊波！',
      weakness: '維持超大型手術空間同覺醒技會急劇消耗體力；面對霸氣遠超自己嘅強敵時無法強行瞬移對方。'
    },
    'gura-gura': {
      name: '震震果實',
      englishName: '大氣海震果實',
      user: '白鬍子 ➔ 黑鬍子',
      zukanShape: '鈷藍色西洋梨造型，上半部印有螺旋紋，下半部呈現地震碎裂紋理（圖鑑第八期）',
      powerSummary:
        '被戰國元帥畏懼為「足以毀滅世界」嘅超人系最強果實！一拳揮出就能好似打碎玻璃咁直接震裂空氣，令整片大海傾斜掀起百米海嘯！',
      weakness: '震波威力過於龐大，若果唔精準控制連自己友同埋座駕船隻都會一齊震傷。'
    },
    'yami-yami': {
      name: '暗暗果實',
      englishName: '黑洞引力果實',
      user: '馬歇爾・D・汀奇（黑鬍子）',
      zukanShape: '深紫色圓團松果簇造型，由無數帶尖刺螺旋紋水滴果瓣組成，頂端生有綠葉（漫畫第 440 話・圖鑑第五期）',
      powerSummary:
        '操控無盡黑暗同黑洞級重力！最恐怖嘅係「暗水」引力——只要黑鬍子親手捉住任何惡魔果實能力者，對方嘅果實超能力就會喺觸碰期間完全消失！',
      weakness: '同其他自然系唔同，物理攻擊並唔會穿過黑鬍子身體，反而會因為黑暗引力承受雙倍痛楚！'
    },
    'pika-pika': {
      name: '閃閃果實',
      englishName: '光速光子果實',
      user: '波爾薩利諾（黃猿大將）',
      zukanShape: '金光閃耀嘅五角楊桃造型，果稜佈滿螺旋紋及捲曲綠蒂（圖鑑風格還原）',
      powerSummary:
        '將全身化為純粹光子嘅自然系果實！能夠踢出真正光速重腳、由指尖發射高爆激光、凝聚實體光劍「天叢雲劍」，並透過「八咫鏡」折線光束瞬間移動！',
      weakness: '光束反射沿直線前進，頂級見聞色加武裝色霸氣高手（例如冥王雷利同五檔路飛）能夠預判截擊！'
    },
    'hie-hie': {
      name: '冰凍果實',
      englishName: '極寒冰封果實',
      user: '庫山（青雉）',
      zukanShape: '冰晶青藍色多面體哈密瓜造型，晶面刻有螺旋紋及捲曲果蒂（圖鑑風格還原）',
      powerSummary:
        '將身體變成零下極寒堅冰！青雉係唯一完全唔怕跌落大海嘅能力者——雙手一掂水面發動「冰河時代」，幾十海里大海即刻結成厚冰畀佢踩單車過海！',
      weakness: '高熱火山岩漿以及強烈震動衝擊波。'
    },
    'magu-magu': {
      name: '岩漿果實',
      englishName: '熔岩火山果實',
      user: '盃（赤犬元帥）',
      zukanShape: '赤紅熔岩裂紋圓瓜造型，縫隙透出亮橙色螺旋火紋及綠蒂（圖鑑風格還原）',
      powerSummary:
        '擁有全惡魔果實最頂尖級別嘅破壞火力！全身化為滾燙火山岩漿，幾秒內蒸發整座巨型冰山，並向天空噴發漫天「流星火山」！',
      weakness: '纏繞頂級霸王色與武裝色霸氣嘅名劍（例如紅髮撒古斯嘅格里芬）能夠正面擋住岩漿重拳。'
    },
    'tori-phoenix': {
      name: '鳥鳥果實・幻獸種・不死鳥型態',
      englishName: '青炎不死鳥果實',
      user: '「不死鳥」馬可（白鬍子一番隊隊長）',
      zukanShape: '青綠色菠蘿造型，果鱗中央印有螺旋紋，頂端綻放青金色鳳凰火羽葉冠（圖鑑第二十期）',
      powerSummary:
        '比自然系更加罕有嘅神話幻獸種！全身包裹住「復活之青炎」——呢種藍色火焰並唔灼熱，反而能夠令馬可瞬間再生任何傷勢，仲可以幫同伴溫暖療傷！',
      weakness: '連續承受超大型攻擊再生會消耗大量體力，戴上海樓石手銬時青炎亦會被封鎖。'
    },
    'ito-ito': {
      name: '線線果實',
      englishName: '極細操縱絲線果實',
      user: '唐吉訶德・多佛朗明哥',
      zukanShape: '淡紫丁香色西洋梨造型，果皮嵌滿交錯「S」形螺旋紋及紫紅捲蒂（漫畫第 782 話・圖鑑第三期）',
      powerSummary:
        '由指尖彈出肉眼幾乎睇唔見嘅鋒利絲線！多佛朗明哥將絲線勾住天空雲朵喺海面高空「飛行」，仲可以好似扯線公仔咁操控敵人。',
      wanoPowerSummary:
        '彈出鋒利無比嘅極細絲線！除咗勾雲飛行同封鎖全島嘅「鳥籠」之外，果實覺醒後更能將整座城鎮嘅石頭建築全部化為翻天覆地嘅純白絲線巨浪！',
      weakness: '路飛四檔纏繞高密度武裝色霸氣嘅彈力重拳「大猿王槍」足以正面轟斷覺醒神誅殺！'
    },
    'mochi-mochi': {
      name: '糯糯果實',
      englishName: '煙韌年糕果實',
      user: '夏洛特・卡塔庫栗',
      zukanShape: '乳白色飽滿年糕團造型，下半部微束呈軟糯麻糬底座，佈滿螺旋紋（圖鑑第四期）',
      powerSummary:
        '全書唯一認證嘅「特殊超人系」！能夠自由製造並將身體變成煙韌黏力十足嘅年糕，配合卡塔庫栗「預見未來」見聞色霸氣，喺對手出拳前主動喺身體開窿完美閃避！',
      weakness: '大量清水或者熱茶可以沖淡年糕嘅黏性束縛。'
    },
    'uo-seiryu': {
      name: '魚魚果實・幻獸種・青龍型態',
      englishName: '神話青龍果實',
      user: '「百獸」凱多',
      zukanShape: '蔚藍色龍鱗松果造型，底部帶螺旋紋，頂端生有橙葉與紫粉色雙龍角果蒂（漫畫第 1096 話・圖鑑第十三期）',
      powerSummary:
        '化身為遮天蔽日、全身覆蓋金剛龍鱗嘅神話青龍！能夠召喚「焰雲」踩雲騰飛甚至將成座鬼島托上半空，一記「熱息」足以瞬間蒸發整座山頭！',
      weakness: '流櫻內部破壞霸氣與霸王色纏繞斬擊能夠穿透堅不可摧嘅青龍鱗甲。'
    },
    'inu-makami': {
      name: '犬犬果實・幻獸種・大口真神型態',
      englishName: '和之國護國狼神果實',
      user: '大和',
      zukanShape: '扁圓鮮橙色柿子造型，帶棕褐色果萼、魚鉤狀螺旋紋及左捲淺橙果蒂（圖鑑第十三期）',
      powerSummary:
        '和之國世代傳頌嘅護國明王幻獸種！令大和變身為雪白配青綠焰毛嘅神聖狼神，噴出足以同凱多熱息平分秋色嘅極寒「無侍冰牙」，並披上「鏡山」冰甲反彈重擊！',
      weakness: '標準惡魔果實弱點（海水與海樓石手銬）。'
    },
    'nikyu-nikyu': {
      name: '肉球果實',
      englishName: '光速彈射肉墊果實',
      user: '巴索羅繆・大熊',
      zukanShape: '粉肉色圓果造型，頂端鼓起三個圓潤肉墊凸起構成可愛掌印輪廓（漫畫第 1096 話神之谷登場）',
      powerSummary:
        '漫畫第 1096 話揭開真身！雙手掌心長出柔軟肉球掌墊，能夠以「光速」彈開世上任何有形與無形之物——包括壓縮空氣炸彈「熊之衝擊」、將旅人拍飛越洋三天三夜，甚至將人體內嘅痛楚與記憶彈成發光肉球氣泡！',
      weakness: '若果雙掌肉墊趕唔切擋住超高速攻擊，身體其他部位仍然會受傷。'
    },
    'nomi-nomi': {
      name: '腦腦果實',
      englishName: '無限知識記憶果實',
      user: '貝加龐克博士（「本體」）',
      zukanShape: '珊瑚粉紅雙葉大腦蘋果造型，果紋酷似腦迴螺旋紋並配捲曲綠蒂（圖鑑風格還原）',
      powerSummary:
        '令食用者大腦擁有「無限儲存容量」，睇過嘅書同研究永遠過目不忘！不過每吸收新知識大腦體積就會不斷長大，大到貝加龐克要將巨腦獨立存放喺蛋頭島空中巨蛋「龐克紀錄」，靠頭頂蘋果天線無線連線！',
      weakness: '本身唔會增加肉體戰鬥力，而且個頭會越學越大變成巨人咁高！'
    },
    'toshi-toshi': {
      name: '歲歲果實',
      englishName: '時間年齡與扭曲未來果實',
      user: '珠寶・波妮',
      zukanShape: '玫紅色沙漏葫蘆造型，果皮佈滿有機螺旋紋及捲曲綠蒂（圖鑑風格還原）',
      powerSummary:
        '可以自由改變任何生物同死物嘅年齡歲數（令敵兵瞬間變回嬰兒或令鋼鎖生鏽老化）——最神奇嘅絕招「扭曲未來」仲可以令波妮短暫變身成佢內心深信嘅任何未來姿態，喺蛋頭島更化身白髮「最自由嘅太陽神尼卡」同路飛並肩出拳！',
      weakness: '施加喺活人身上嘅年齡變化過一段時間會復原；如果內心開始懷疑嗰個未來，「扭曲未來」嘅威力亦會減弱。'
    }
  };

  const loreTopics = {
    'oceans-and-all-blue': {
      title: '東南西北四海、紅土大陸、無風帶與「蔚藍海域」點樣運作？',
      badge: '世界地理百科',
      summary:
        '海賊王星球好似一個立體幾何地球儀，由兩條互相垂直成九十度嘅巨型絲帶切開：一條係高達一萬米嘅岩石大陸「紅土大陸」，另一條係狂風暴雨嘅海賊航道「偉大航道」。',
      steps: [
        {
          heading: '1. 四十五度斜角大「X」與東南西北四海',
          detail:
            '因為紅土大陸同偉大航道係以 45 度對角線交叉環繞地球（試吓撳 3D 視窗下面嘅「🧭 45° 傾斜視角」掣！），剩低嘅四片三角形大洋就正正坐落喺正北、正南、正東同正西！'
        },
        {
          heading: '2. 顛倒山運河與兩側無風帶',
          detail:
            '來自東南西北四海嘅海流會沿住顛倒山四條斜角運河逆流衝上山頂，再一齊俯衝入偉大航道！而偉大航道南北兩邊就俾完全無風、住滿超巨型海王類嘅「無風帶」緊緊封鎖。'
        },
        {
          heading: '3. 山治嘅夢想「蔚藍海域」喺邊度？',
          detail:
            '海上廚師相傳有一片匯聚東南西北四海所有魚類嘅夢幻食材之海「蔚藍海域」！睇返立體地球儀就會發現：顛倒山同紅土大陸底下嘅魚人島，正正就係四海海流交匯嘅十字中心！'
        }
      ]
    },
    'devil-fruit-rules': {
      title: '惡魔果實三大分類與海樓石剋星法則',
      badge: '超能力圖鑑',
      summary:
        '惡魔果實係表皮生滿神秘螺旋唐草紋嘅奇異果實，雖然味道難食到極點，但只要咬一啖就會獲得神奇超能力！同一時間世上每一種果實只會存在唯一一粒，當能力者離世後果實先會喺世界某處重生。',
      steps: [
        {
          heading: '1. 超人系（千奇百怪嘅超人體質與空間異能）',
          detail:
            '數目最多、創意最豐富嘅一系！例如巴基全身四分五裂、魯賓隨處開花長出手臂、羅展開手術空間，或者白鬍子徒手震裂大氣。'
        },
        {
          heading: '2. 動物系（普通種、古代種恐龍與神話幻獸種！）',
          detail:
            '令能力者變身成動物同人獸混合型態！當中「古代種」可以變成遠古恐龍，而比自然系更稀有嘅「幻獸種」更加可以化身不死鳥、青龍、大口真神甚至太陽神尼卡！'
        },
        {
          heading: '3. 自然系（大自然元素化身）與大海詛咒',
          detail:
            '將身體變成火、冰、沙、光、岩漿等自然元素，普通攻擊會直接穿過！不過所有惡魔果實能力者一浸入深水就會全身無力沉底，而「海樓石」散發出同大海一樣嘅能量波長，一掂就會鎖死果實能力！'
        }
      ]
    },
    'haki-system': {
      title: '三色霸氣全解構：見聞色、武裝色與霸王色！',
      badge: '霸氣道場',
      summary:
        '同惡魔果實唔同，「霸氣」係潛藏喺世上所有生物體內嘅精神氣魄與意志力量！透過刻苦鍛煉同生死激戰，戰士可以喚醒見聞色同武裝色——而數百萬人之中只有一人天生擁有第三種王者資質！',
      steps: [
        {
          heading: '1. 見聞色霸氣（空島稱為「心網」）',
          detail:
            '就算蒙住雙眼都可以清晰感知敵人位置、人數、情緒同下一步攻擊！修煉到極致（例如卡塔庫栗、撒古斯同路飛）更加可以「預見幾秒後嘅未來」！'
        },
        {
          heading: '2. 武裝色霸氣（和之國稱為「流櫻」）',
          detail:
            '將強烈意志化作無形或者漆黑光亮嘅鋼鐵鎧甲，大幅提升攻防力，仲可以直接捉住火焰、閃光、流沙等自然系能力者嘅實體！高等「流櫻」更能隔空從內部破壞對手！'
        },
        {
          heading: '3. 霸王色霸氣（王者嘅資質）',
          detail:
            '無法單靠後天修煉獲得，只有天生具備王者氣魄嘅人先擁有！一個眼神就能震暈幾萬大軍，巔峰強者將霸王色纏繞喺拳刀對撞嗰陣，連天空雲層都會一分為二！'
        }
      ]
    },
    'what-is-one-piece': {
      title: '乜嘢係「大秘寶」？點樣先去到最終之島拉夫德爾？',
      badge: '終極核心謎團',
      summary:
        '「大秘寶」並非純粹比喻友誼，而係八百年前喬伊波伊留喺最終之島「拉夫德爾」、並由哥爾・D・羅傑親眼見證嘅真實巨大寶藏！作者尾田榮一郎親自確認佢係實實在在嘅寶物，連繫住空白一百年同「D之一族」嘅意志。',
      steps: [
        {
          heading: '1. 點解記錄指針去到「水先星島」就會停低？',
          detail:
            '順住記錄指針行到新世界盡頭會抵達倒數第二座島「水先星島」。去到嗰度海賊先會發現：前方仲隱藏住最後一座神秘島嶼「拉夫德爾」，世上冇任何指南針指得到！'
        },
        {
          heading: '2. 四塊鮮紅色「路標歷史本文」十字交匯法',
          detail:
            '全球三十塊堅不可摧嘅歷史本文石碑之中，有四塊係鮮紅色嘅「路標歷史本文」。每一塊記載住一個座標點，將四個座標喺海圖連成十字「X」，正中心交匯點就係拉夫德爾！'
        },
        {
          heading: '3. 四塊紅色石碑分別藏喺邊度？',
          detail:
            '• 第一塊：佐烏千年巨象背上鯨魚大樹內部\n• 第二塊：萬國蛋糕島大媽寶物庫（已由布魯克成功拓印！）\n• 第三塊：和之國富士山正下方淹沒嘅舊和之國地底\n• 第四塊：行蹤成謎嘅最後一塊（傳聞喺「燒傷男」手上）！'
        }
      ]
    },
    'three-ancient-weapons': {
      title: '三大古代兵器：冥王普魯托、海皇波塞冬與天王烏拉諾斯！',
      badge: '空白一百年秘史',
      summary:
        '由八百年前「空白一百年」傳承落嚟、記載喺歷史本文上面嘅三大滅世級力量，以遠古神明命名，每一件都擁有改寫整片海洋同島嶼版圖嘅驚人威力！',
      steps: [
        {
          heading: '1. 冥王普魯托（沉睡喺舊和之國地底嘅遠古超級戰艦）',
          detail:
            '八百年前由水之七島船匠建造、一炮足以轟平一座島嘅超級戰艦（芬奇喺司法島親手燒毀咗對抗設計圖！）。阿拉巴斯坦石碑揭曉冥王正沉睡喺和之國富士山底，唯有推倒和之國天然高牆「開國」先會重現人間！'
        },
        {
          heading: '2. 海皇波塞冬（人魚公主白星與超巨型海王類）',
          detail:
            '空島黃金鐘歷史本文指引、並喺魚人島證實：海皇並非機械，而係數百年先誕生一位、能夠同深海超巨型海王類心靈對話並號令佢哋拉動誓約之舟「諾亞」嘅人魚公主白星！'
        },
        {
          heading: '3. 天王烏拉諾斯（來自天空嘅神秘神罰兵器）',
          detail:
            '由魚人島尼普頓國王首次提及與冥王、海皇並列嘅第三大古代兵器，與高空毀滅光束及世界政府最深層秘密息息相關！'
        }
      ]
    },
    'den-den-vivre-kairoseki': {
      title: '偉大航道三大科學奇蹟：電話蟲、生命卡與海樓石',
      badge: '航海黑科技',
      summary:
        '喺冇人造衛星同手機訊號嘅大海上面，海賊同海軍點樣跨海視像通話、萬里追蹤夥伴平安，或者困住自然系能力者呢？全靠偉大航道三大神奇發明！',
      steps: [
        {
          heading: '1. 電話蟲（識得模仿表情嘅心靈感應蝸牛！）',
          detail:
            '天生識得用腦電波跨海通訊嘅神奇野生蝸牛（「波嚕波嚕波嚕……咔嚓！」）！講電話嗰陣，電話蟲仲會百分百模仿講話者嘅表情、鬍鬚、太陽眼鏡甚至喊樣！'
        },
        {
          heading: '2. 生命卡（新世界命運紙片）',
          detail:
            '喺新世界將一個人嘅指甲碎混入紙漿製成嘅奇蹟紙片！完全防水防火，撕落嚟嘅碎紙會永遠朝住主人本體方向輕輕移動；如果主人生命垂危，紙片就會開始燒焦縮細！'
        },
        {
          heading: '3. 海樓石（凝固嘅大海能量結晶）',
          detail:
            '原產自和之國、硬度媲美鑽石嘅神秘礦石！會持續散發同大海完全相同嘅能量波長：惡魔果實能力者一掂到即刻全身無力，而鑲喺海軍軍艦船底更加可以喺海王類面前隱形！'
        }
      ]
    },
    'vegapunk-sinking-world': {
      title: '貝加龐克蛋頭島全球直播：點解全世界曾沉沒二百米？',
      badge: '最終章驚天真相',
      summary:
        '透過藏喺古代鐵巨人埃米特體內嘅影像電話蟲，貝加龐克博士喺蛋頭島向全球同步廣播，首次串連起喬伊波伊、四海地形與空白一百年嘅震撼真相！',
      steps: [
        {
          heading: '1. 喬伊波伊：歷史上第一位海賊（九百至八百年前）',
          detail:
            '誕生於空白一百年科技高度發達嘅「巨大王國」，喬伊波伊擁有好似太陽神尼卡咁自由伸縮嘅力量，係人類史上第一位揚帆出海嘅「海賊」，當年與後來組成世界政府嘅二十國聯軍爆發大戰！'
        },
        {
          heading: '2. 海平面暴漲二百米！沉睡海底嘅遠古大陸！',
          detail:
            '喺空白一百年長達一個世紀嘅戰爭中，古代兵器發動導致全球海平面足足上升咗「二百米」！今日大家住緊嘅零散島嶼，其實只係當年遠古大陸未被淹沒嘅高山山頂！'
        },
        {
          heading: '3. 母火種危機與「邊個搵到大秘寶」嘅世界命運',
          detail:
            '隨住露露西亞王國被毀引發全球地震、海平面再度上升一米，貝加龐克向全人類宣告：呢個世界未來嘅命運，將會取決於「邊個率先奪得大秘寶」！'
        }
      ]
    }
  };

  const quizQuestions = [
    {
      question: '點解普通磁鐵指南針一入到偉大航道就會完全失靈？',
      options: [
        '因為偉大航道每座島都蘊含強烈磁性礦物互相干擾，航海士必須改戴「記錄指針」鎖定下一座島嘅磁力！',
        '因為海王類喺顛倒山食晒所有金屬指南針。',
        '因為惡魔果實會將指南針變成橡膠。',
        '因為海賊王世界根本冇北方。'
      ],
      explanation:
        '完全正確！偉大航道每座島嶼都會發出獨特強烈磁波，所以奈美必須用手腕上嘅「記錄指針」儲滿磁力先可以安全領航！'
    },
    {
      question: '來自東海、西海、北海同南海嘅海賊船，係點樣進入偉大航道起點㗎？',
      options: [
        '搬長梯直接爬過一萬米高嘅紅土大陸',
        '順住逆流而上嘅海流衝上「顛倒山」四條斜角運河山頂，再俯衝落雙子岬！',
        '喺風車村搭潛水艇鑽地底過去',
        '騎住超巨型海鷗飛過去'
      ],
      explanation:
        '答得超準！四海激流會喺顛倒山逆流衝上山頂匯合，再沿第五條運河直衝入偉大航道入口雙子岬！'
    },
    {
      question: '點解世界第一大劍豪「鷹眼」密佛格用黑刀點斬都傷唔到小丑巴基？',
      options: [
        '因為巴基著咗隱形鑽石盔甲',
        '因為巴基食咗「四分五裂果實」，無論俾幾鋒利嘅刀劍劈中都會自動分裂成浮空碎塊毫髮無損！',
        '因為巴基速度快過閃電',
        '因為鷹眼用木劍斬佢'
      ],
      explanation:
        '華麗滿分！巴基係分裂人間，就算世上最鋒利嘅黑刀劈落去，佢都只會自動分開一截截浮喺半空再拼返埋一齊！'
    },
    {
      question: '喺阿拉巴斯坦篇未學識霸氣之前，路飛點樣先打得中克洛克達爾嘅自然系流沙身體？',
      options: [
        '用水整濕雙拳，令鬆散嘅沙粒遇水凝結變實！',
        '用大風扇吹走晒啲沙',
        '借青雉架單車冰封佢',
        '掟綠星植物種子綁住佢'
      ],
      explanation:
        '醒目過人！水分係沙沙果實嘅自然剋星，沙粒濕水後無法分散流走，路飛先可以一拳轟出橡膠暴風雨反敗為勝！'
    },
    {
      question: '海軍本部嘅大型軍艦點樣安全橫渡完全無風、住滿海王類嘅「無風帶」？',
      options: [
        '由貝加龐克喺軍艦船底鑲滿「海樓石」，令水底海王類以為上面只係普通大海而察覺唔到船隻！',
        '喺船帆畫對大眼睛嚇走海王類',
        '請鯨魚拉布喺前面開路',
        '等到冬天落雪結冰先過去'
      ],
      explanation:
        '太犀利喇！海樓石散發出同海水一模一樣嘅波長，鑲喺船底加上外輪推進就可以喺海王類頭頂隱形通過！'
    },
    {
      question: '位於紅土大陸正下方海底一萬米嘅「魚人島」，點解會有燦爛陽光同新鮮空氣？',
      options: [
        '全靠芬奇安裝嘅巨型海底電燈膽',
        '全靠超巨型「陽樹夏娃」嘅樹根將海面陽光同氧氣一路傳導落萬米深海氣泡！',
        '黃猿大將每日朝早落去射激光照明',
        '靠海底火山噴火發光'
      ],
      explanation:
        '一矢中的！陽樹夏娃喺海面吸收陽光，再經龐大樹根將溫暖光芒同空氣注入魚人島嘅雙層泡泡入面！'
    },
    {
      question: '邊一種霸氣好似無形鋼鐵鎧甲咁，能夠令戰士直接捉住或打中火焰、閃光等自然系惡魔果實能力者？',
      options: [
        '見聞色霸氣',
        '武裝色霸氣',
        '藍波球波長',
        '海市蜃樓天候'
      ],
      explanation:
        '正中紅心！武裝色霸氣將意志硬化成鎧甲纏繞拳腳或刀劍，能夠直接觸碰任何自然系能力者嘅實體！'
    },
    {
      question: '海賊團一共要集齊幾多塊鮮紅色「路標歷史本文」，先可以畫出十字交匯點搵到最終之島拉夫德爾？',
      options: [
        '馬林梵多門口一塊就夠',
        '集齊全部 4 塊紅色路標歷史本文 —— 四個座標連成「X」交叉點就係拉夫德爾！',
        '空島七個黃金鐘',
        '一百張懸賞通緝令'
      ],
      explanation:
        '完全正確！四塊鮮紅色路標歷史本文各自記錄一個座標，四點交叉中心就會揭開最終之島拉夫德爾嘅神秘位置！'
    },
    {
      question: '點解手腕上嘅「記錄指針」永遠都指唔到新世界嘅「佐烏」島？',
      options: [
        '因為佐烏俾奈美用海市蜃樓隱形咗',
        '因為佐烏並非固定喺海床嘅岩石島，而係馱喺行走咗一千年嘅活體巨象「象主」背脊上面！',
        '因為佐烏飛咗上兩萬米外太空',
        '因為多佛朗明哥切斷咗磁場'
      ],
      explanation:
        '答啱晒！象主係一頭不斷喺大海上行走嘅巨大生物而唔係礦物島嶼，所以完全冇磁場，必須靠毛皮族嘅「生命卡」先搵到！'
    },
    {
      question: '當哥爾・D・羅傑、雷利同光月御田終於抵達最後一座島讀完喬伊波伊嘅故事嗰陣，佢哋做咗乜嘢？',
      options: [
        '抱頭大喊咗一百日',
        '全船人一齊笑到飆晒眼淚，並將呢座最終之島命名為「拉夫德爾（歡笑傳說）」！',
        '鑿沉咗黃金傑克森號',
        '動手起咗座顛倒山'
      ],
      explanation:
        '冇錯！羅傑對住喬伊波伊留低嘅八百年奇妙故事開懷大笑，於是將最終之島改名為「拉夫德爾」！'
    },
    {
      question: '草帽海賊團嘅「千陽號」係用邊種傳說神木建造，而且靠乜嘢秘密燃料發動飛越一公里嘅「風來爆破」？',
      options: [
        '亞爾其曼紅樹配飛機火水',
        '無堅不摧嘅「寶樹亞當」木材，配 3 大木桶氣泡冰凍可樂！',
        '陽樹夏娃樹皮配熱湯',
        '瓦波合金配藍波球'
      ],
      explanation:
        '超——級——正確！芬奇用寶樹亞當打造千陽號船身，再喺船尾一次過引爆三桶特大可樂衝上天際！'
    },
    {
      question: '喺蛋頭島向全球同步播出嘅影像廣播入面，貝加龐克博士揭曉咗關於海賊王世界海洋嘅乜嘢驚人真相？',
      options: [
        '空白一百年戰爭期間海平面曾暴漲「二百米」——現今無數島嶼其實係淹沒遠古大陸嘅高山山頂！',
        '東南西北四海全部係甜汽水變出嚟',
        '空島以前喺推進城海底下面',
        '顛倒山係尋日巴基砌出嚟嘅'
      ],
      explanation:
        '類星體級滿分智慧！貝加龐克揭開歷史真相：遠古兵器曾令全球海平面上升二百米，整片遠古大陸至今仍沉睡喺深海之下！'
    }
  ];

  function isYue(lang) {
    return lang === 'yue';
  }

  function localizeCharacter(projectedChar, eraFilter, lang, isEraAllowedFn) {
    if (!projectedChar || !isYue(lang)) return projectedChar;
    const entry = characters[projectedChar.id];
    if (!entry) return projectedChar;

    let snapYue = null;
    if (entry.eraSnapshots && eraFilter !== 'egghead') {
      if (eraFilter === 'wano') {
        snapYue = entry.eraSnapshots.wano || null;
      } else if (eraFilter === 'pre-timeskip') {
        snapYue = entry.eraSnapshots['pre-timeskip'] || entry.eraSnapshots['east-blue'] || null;
      } else if (eraFilter === 'east-blue') {
        snapYue = entry.eraSnapshots['east-blue'] || entry.eraSnapshots['pre-timeskip'] || null;
      }
    }

    const checkEra =
      typeof isEraAllowedFn === 'function'
        ? isEraAllowedFn
        : function (itemEra, activeEra) {
            const order = { 'east-blue': 0, 'pre-timeskip': 1, wano: 2, egghead: 3 };
            return (order[itemEra] ?? 2) <= (order[activeEra] ?? 3);
          };

    const unlockedWano = checkEra('wano', eraFilter);
    const unlockedEgghead = checkEra('egghead', eraFilter);

    const out = {
      ...projectedChar,
      name: entry.name || projectedChar.name,
      englishName: projectedChar.name,
      epithet: entry.epithet || projectedChar.epithet,
      role: entry.role || projectedChar.role,
      tier: entry.tier || projectedChar.tier,
      bountyText: entry.bountyText || projectedChar.bountyText,
      posterHeader: entry.posterHeader || '懸賞通緝',
      posterCondition: entry.posterCondition || '生死不論',
      posterFooter: entry.posterFooter || '— 海軍本部',
      devilFruit: entry.devilFruit || projectedChar.devilFruit,
      originSea: entry.originSea || projectedChar.originSea,
      birthday: entry.birthday || projectedChar.birthday,
      favoriteFood: entry.favoriteFood || projectedChar.favoriteFood,
      laugh: entry.laugh || projectedChar.laugh,
      laughNote: entry.laughNote || projectedChar.laughNote,
      kidBio: entry.kidBio || projectedChar.kidBio
    };

    if (Array.isArray(entry.haki)) {
      out.haki = entry.haki;
    }
    if (Array.isArray(entry.signatureMoves)) {
      out.signatureMoves = entry.signatureMoves;
    }

    if (snapYue) {
      Object.assign(out, snapYue);
    }

    if (unlockedWano && entry.wanoLaughNote) {
      out.laughNote = entry.wanoLaughNote;
    }
    if (unlockedEgghead) {
      if (entry.eggheadLaugh) out.laugh = entry.eggheadLaugh;
      if (entry.eggheadLaughNote) out.laughNote = entry.eggheadLaughNote;
      if (entry.eggheadFavoriteFood) out.favoriteFood = entry.eggheadFavoriteFood;
    }

    if (Array.isArray(projectedChar.bountyHistory)) {
      out.bountyHistory = projectedChar.bountyHistory.map((bh, idx) => {
        const yueLabel =
          entry.bountyLabels && entry.bountyLabels[idx]
            ? entry.bountyLabels[idx]
            : bh.label === 'Current Known Bounty'
            ? '目前已知懸賞'
            : bh.label === 'Initial Record'
            ? '初期懸賞紀錄'
            : bh.label;
        let yueText = bh.text;
        if (typeof yueText === 'string') {
          yueText = yueText
            .replace(/EACH/gi, '（每人）')
            .replace(/FROZEN/gi, '凍結')
            .replace(/ONLY ALIVE/gi, '只限活捉');
        }
        return {
          ...bh,
          label: yueLabel,
          text: yueText,
          condition: bh.condition === 'ONLY ALIVE' ? '只限活捉' : out.posterCondition
        };
      });
    }

    return out;
  }

  function localizeLocation(loc, lang) {
    if (!loc || !isYue(lang)) return loc;
    const entry = worldLocations[loc.id];
    const categoryDisplay = CATEGORY_LABELS_YUE[loc.category] || loc.category;
    if (!entry) return { ...loc, categoryDisplay };
    return {
      ...loc,
      name: entry.name || loc.name,
      subtitle: entry.subtitle || loc.subtitle,
      summary: entry.summary || loc.summary,
      keyFacts: Array.isArray(entry.keyFacts) ? entry.keyFacts : loc.keyFacts,
      categoryDisplay
    };
  }

  function localizeMap(mapObj, lang) {
    if (!mapObj || !isYue(lang)) return mapObj;
    const entry = canonicalMaps[mapObj.id];
    if (!entry) return mapObj;
    const hotspots = Array.isArray(mapObj.hotspots)
      ? mapObj.hotspots.map((hs, idx) => {
          const hsYue = entry.hotspots && entry.hotspots[idx];
          if (!hsYue) return hs;
          return {
            ...hs,
            label: hsYue.label || hs.label,
            note: hsYue.note || hs.note
          };
        })
      : mapObj.hotspots;
    return {
      ...mapObj,
      title: entry.title || mapObj.title,
      badge: entry.badge || mapObj.badge,
      description: entry.description || mapObj.description,
      hotspots
    };
  }

  function localizeArc(arc, lang) {
    if (!arc || !isYue(lang)) return arc;
    const entry = timelineArcs[arc.id];
    if (!entry) return arc;
    return {
      ...arc,
      ...entry
    };
  }

  function localizeShip(ship, lang) {
    if (!ship || !isYue(lang)) return ship;
    const entry = ships[ship.id];
    if (!entry) return ship;
    const channels = Array.isArray(ship.channels)
      ? ship.channels.map((ch, idx) => {
          const chYue = entry.channels && entry.channels[idx];
          return chYue ? { ...ch, ...chYue } : ch;
        })
      : ship.channels;
    const rooms = Array.isArray(ship.rooms)
      ? ship.rooms.map((rm) => {
          const rmYue = entry.rooms && entry.rooms.find((r) => r.id === rm.id);
          return rmYue ? { ...rm, ...rmYue } : rm;
        })
      : ship.rooms;
    return {
      ...ship,
      name: entry.name || ship.name,
      shortName: entry.shortName || ship.shortName,
      classType: entry.classType || ship.classType,
      shipwright: entry.shipwright || ship.shipwright,
      dimensions: entry.dimensions || ship.dimensions,
      summary: entry.summary || ship.summary,
      channels,
      rooms
    };
  }

  function localizeFruit(projectedFruit, eraFilter, lang, isEraAllowedFn) {
    if (!projectedFruit || !isYue(lang)) return projectedFruit;
    const entry = devilFruits[projectedFruit.id];
    const categoryDisplay =
      FRUIT_CATEGORY_LABELS_YUE[projectedFruit.category] || projectedFruit.category;
    if (!entry) return { ...projectedFruit, categoryDisplay };

    const checkEra =
      typeof isEraAllowedFn === 'function'
        ? isEraAllowedFn
        : function (itemEra, activeEra) {
            const order = { 'east-blue': 0, 'pre-timeskip': 1, wano: 2, egghead: 3 };
            return (order[itemEra] ?? 2) <= (order[activeEra] ?? 3);
          };
    const unlockedWano = checkEra('wano', eraFilter);

    return {
      ...projectedFruit,
      categoryDisplay,
      name: unlockedWano && entry.wanoTrueName ? entry.wanoTrueName : entry.name,
      englishName:
        unlockedWano && entry.wanoEnglishName ? entry.wanoEnglishName : entry.englishName,
      user: unlockedWano && entry.wanoUser ? entry.wanoUser : entry.user,
      zukanShape: entry.zukanShape || projectedFruit.zukanShape,
      powerSummary:
        unlockedWano && entry.wanoPowerSummary ? entry.wanoPowerSummary : entry.powerSummary,
      weakness: entry.weakness || projectedFruit.weakness
    };
  }

  function localizeLore(topic, lang) {
    if (!topic || !isYue(lang)) return topic;
    const entry = loreTopics[topic.id];
    if (!entry) return topic;
    return {
      ...topic,
      title: entry.title || topic.title,
      badge: entry.badge || topic.badge,
      summary: entry.summary || topic.summary,
      steps: Array.isArray(entry.steps) ? entry.steps : topic.steps
    };
  }

  function localizeQuiz(q, index, lang) {
    if (!q || !isYue(lang)) return q;
    const entry = quizQuestions[index];
    if (!entry) return q;
    return {
      ...q,
      question: entry.question || q.question,
      options: Array.isArray(entry.options) ? entry.options : q.options,
      explanation: entry.explanation || q.explanation
    };
  }

  const OP_I18N_YUE = {
    CATEGORY_LABELS_YUE,
    FRUIT_CATEGORY_LABELS_YUE,
    characters,
    worldLocations,
    canonicalMaps,
    timelineArcs,
    ships,
    devilFruits,
    loreTopics,
    quizQuestions,
    localizeCharacter,
    localizeLocation,
    localizeMap,
    localizeArc,
    localizeShip,
    localizeFruit,
    localizeLore,
    localizeQuiz
  };

  root.OP_I18N_YUE = OP_I18N_YUE;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OP_I18N_YUE;
  }
})(typeof window !== 'undefined' ? window : globalThis);
