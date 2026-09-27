/* Innhaldet i «Blekkranet», kapittel 1: Guten frå Åsen (1826–1841).

   Fakta om livet til Ivar Aasen er henta frå modulane i kurset (Ivar Aasen og
   landsmålet, Reisene til Ivar Aasen). Blekklatten, skreppa som snakkar og
   fiendane er dikta.

   Karta er skrivne som tekst. Kvart teikn er ei flis (sjå js/rpg/pikslar.js).
   Siffer og symbol er merke: dei blir liggjande som golvflisa til kartet, og
   posisjonen blir brukt til dører, startpunkt og personar.

   Manus (tale, hendingar) er lister med steg som motoren køyrer i rekkjefølgje:
     { s: "Namn", t: "Replikk" }        replikk (s kan sløyfast for forteljar)
     { fort: ["linje", …] }             forteljing på svart skjerm
     { flagg: "x" } / { uflagg: "x" }   set eller fjern eit flagg
     { gi: "ting", n: 2 }               gi ting
     { pengar: 60 }                     skilling (120 skilling = 1 spesidalar)
     { ord: ["tun", …] }                ord i notatboka
     { evne: "vokalskifte" }            ny ordkunst
     { parti: "skreppa" }               ny i partiet
     { kamp: ["setjekasse"], boss: 1 }  kamp
     { til: ["kart", "merke"] }         flytt
     { opne: "stad" }                   opne ein stad på verdskartet
     { verd: 1 }                        gå til verdskartet
     { dersom: fn, da: […], elles: […] }
     { lagre: 1 }, { lækje: 1 }, { kapittelslutt: 1 } */
window.RPGData = (function () {
  "use strict";

  /* ---------- Utsjånad ---------- */
  const U = {
    ivar: { hud: "#e6c7a6", har: "#5a3f2a", jakke: "#3f4a6a", bukse: "#5a4a3a", sekk: true },
    bror: { hud: "#e2c09e", har: "#8a6a3a", jakke: "#7a5a3a", bukse: "#4a4034" },
    syster: { hud: "#ecccae", har: "#c9a060", jakke: "#e9e4d4", kjole: "#3d6fa0" },
    aarflot: { hud: "#e2c09e", har: "#d8d4cc", jakke: "#2f3f5f", bukse: "#2a2a30", hatt: "#1c1d20" },
    fiskar: { hud: "#d9b08e", har: "#6b4a2a", jakke: "#d9b441", bukse: "#3a3a44", hatt: "#d9b441", skjegg: "#6b4a2a" },
    kone: { hud: "#e8c6a4", har: "#7a5a3a", jakke: "#9c3b2e", kjole: "#5a3f2a" },
    typograf: { hud: "#e2c09e", har: "#2a2a30", jakke: "#e9e4d4", bukse: "#3a3a44" },
    daae: { hud: "#e2c09e", har: "#9a9a9a", jakke: "#2f4f8a", bukse: "#e9e4d4", skjegg: "#9a9a9a" },
    elev: { hud: "#ecccae", har: "#c9a060", jakke: "#6b8f4a", bukse: "#5a4a3a" },
    elev2: { hud: "#ecccae", har: "#3a2a1a", jakke: "#e9e4d4", kjole: "#9c3b2e" },
    tenar: { hud: "#e2c09e", har: "#6b4a2a", jakke: "#e9e4d4", kjole: "#2a2a30" },
    neumann: { hud: "#e2c09e", har: "#e9e4d4", jakke: "#1c1d20", bukse: "#1c1d20" },
    borgar: { hud: "#e2c09e", har: "#4a3a2a", jakke: "#6b3f6f", bukse: "#2a2a30", hatt: "#2a2a30" },
    kremmar: { hud: "#e2c09e", har: "#8a6a3a", jakke: "#3f7a4a", bukse: "#4a4034" },
    gamal: { hud: "#e2c09e", har: "#e9e4d4", jakke: "#5a5060", bukse: "#3a3a44", skjegg: "#e9e4d4" },
  };

  /* ---------- Karta ---------- */
  const KART = {
    "asen-stova": {
      namn: "Stova på Åsen", golv: "P", inne: true,
      rader: [
        "XXXXXXXXXXXX",
        "XfPPPBBPPbPX",
        "XPPPPPPPPbPX",
        "XPPkkPPP@PPX",
        "XPzkkzPPPPKX",
        "XP%PPP1PPPPX",
        "XLPPPPPPPPPX",
        "XXXXXEXXXXXX",
      ],
      dorer: [{ ved: [5, 7], til: ["asen", "d"] }],
      kister: [{ ved: [10, 4], ting: "flatbrod", n: 2, id: "k-stova" }],
      folk: [
        { merke: "@", u: "bror", namn: "Storebror", tale: "bror" },
        { merke: "%", u: "syster", namn: "Syster", tale: "syster" },
      ],
    },
    asen: {
      namn: "Åsen i Ørsta", golv: ".", stad: "aasen",
      rader: [
        "#########################",
        "#....RRRRR........t.....#",
        "#....RRRRR..............#",
        "#....WvDvW.....RRRR..t..#",
        "#......=.......RRRR.....#",
        "#.\"\"...=...|||.WvWW..o..#",
        "#......=...|YY.....=....#",
        "#..t...=...|YY.....=....#",
        "#......=============....#",
        "#......=..........=.====2",
        "#..o...=...\"\".....=.....#",
        "#......=...\"\"..@..=..t..#",
        "#..t...=..........=.....#",
        "#......L....o.....=.....#",
        "#~~~~~~~~~~~~~~~~~~~~~~~#",
        "#########################",
      ],
      dorer: [
        { ved: [7, 3], til: ["asen-stova", "1"] },
        { ved: [24, 9], til: ["vegen", "1"], kant: true },
      ],
      folk: [{ merke: "@", u: "gamal", namn: "Granne", tale: "granne" }],
    },
    vegen: {
      namn: "Vegen til Ekset", golv: ",", fiendar: { sjanse: 1, lag: [["blekkflekk"], ["blekkflekk", "blekkflekk"], ["stavefeil"]] },
      rader: [
        "############################",
        "#,,,,,,,,,,#,,,,,,,,,,,,,,,#",
        "#,,,,t,,,,,,,,,,,t,,,,,,,,,#",
        "#,,,,,,,,,,,,,,,,,,,,,o,,,,#",
        "1=======,,,,,,,,,,,,,,,,,,,#",
        "#,,,,,,=,,,,,,,,,,,,,,,,,,,#",
        "#,,t,,,=========,,,,,,,,,,,#",
        "#,,,,,,,,,,,,,,=,,,,,t,,,,,#",
        "#,,,,,o,,,,,,,,=,,,,,,,,,,,#",
        "#,,,,,,,,,,,,,,=======,,,,,#",
        "#,,,,,,,,t,,,,,,,,,,,=,,,,,#",
        "#QQQQ,,,,,,,,,,,,,,,,======2",
        "#~~~QQ@,,,,,,,t,,,,,,,,,,,,#",
        "#~~~~~~~,,,,,,,,,,,,,,,,,K,#",
        "#~~~~~~~~~~~~~~~~~~~~~~~~~~#",
        "############################",
      ],
      dorer: [
        { ved: [0, 4], til: ["asen", "2"], kant: true },
        { ved: [27, 11], til: ["ekset", "1"], kant: true },
      ],
      kister: [{ ved: [25, 13], ting: "kaffi", n: 1, id: "k-vegen" }],
      folk: [{ merke: "@", u: "fiskar", namn: "Fiskar", tale: "fiskar" }],
      inngang: [{ merke: "1", manus: "vegen_forste" }],
    },
    ekset: {
      namn: "Ekset", golv: ".", stad: "ekset",
      rader: [
        "##########################",
        "#......RRRRRR.......RRRR.#",
        "#.t....RRRRRR.......RRRR.#",
        "#......WvWDWv..t....WWDW.#",
        "#.........=.............=#",
        "#....\"\"...=.......@....=.#",
        "#.........=============..#",
        "1=========.......=.......#",
        "#......t..........=...o..#",
        "#..%..............L......#",
        "#~~~~~~~~~QQQ~~~~~~~~~~~~#",
        "##########################",
      ],
      dorer: [
        { ved: [0, 7], til: ["vegen", "2"], kant: true },
        { ved: [10, 3], til: ["ekset-stova", "1"] },
        { ved: [22, 3], til: ["trykkeriet", "1"], krev: "trykkeri_ope", laast: "Døra til trykkeriet er stengd. Innanfor høyrer du noko som klaskar." },
      ],
      folk: [
        { merke: "@", u: "typograf", namn: "Typograf", tale: "typograf" },
        { merke: "%", u: "kone", namn: "Kone frå bygda", tale: "kone" },
      ],
    },
    "ekset-stova": {
      namn: "Boksamlinga på Ekset", golv: "P", inne: true,
      rader: [
        "XXXXXXXXXXXXXX",
        "XBBBBBPPBBBBBX",
        "XPPPPPPPPPPPPX",
        "XBBPPkkkPPPBBX",
        "XBBPPz@zPPPBBX",
        "XPPPPPPPPPPPPX",
        "XPPPPPP1PPPPLX",
        "XXXXXXXEXXXXXX",
      ],
      dorer: [{ ved: [7, 7], til: ["ekset", "d"] }],
      folk: [{ merke: "@", u: "aarflot", namn: "Sivert Aarflot", tale: "aarflot" }],
    },
    trykkeriet: {
      namn: "Trykkeriet", golv: "g", inne: true, fiendar: { sjanse: 1, alle: true, lag: [["blekkflekk", "blekkflekk"], ["stavefeil"], ["stavefeil", "blekkflekk"]] },
      rader: [
        "GGGGGGGGGGGGGGGGGGGG",
        "GSSgggpgggSSgggpgggG",
        "GgggggggggggggggggnG",
        "GggpgggSSgggpgggg@gG",
        "GggggggggggggggggggG",
        "GSSgggggpggSSggggggG",
        "GggggpggggggggpggggG",
        "GgggggggggSSgggggggG",
        "G1gggggggggggggggggG",
        "GGEGGGGGGGGGGGGGGGGG",
      ],
      dorer: [{ ved: [2, 9], til: ["ekset", "t"] }],
      folk: [{ merke: "@", u: "typograf", namn: "Setjekassa", usynleg: true, tale: "setjekasse", flis: "S" }],
    },
    solnor: {
      namn: "Solnør i Skodje", golv: ".", stad: "solnor",
      rader: [
        "###########################",
        "#..t....rrrrrrrrr.....t...#",
        "#.......rrrrrrrrr.........#",
        "#.......wVwVwdwVw....t....#",
        "#............=............#",
        "#..\"\"\"..t.....=......\"\"\"..#",
        "#....t.......=...@........#",
        "#..\"\"\"........=...........#",
        "#......=================..2",
        "#......=..........L.......#",
        "#..o...=.....t........t...#",
        "#......1..................#",
        "###########################",
      ],
      dorer: [
        { ved: [13, 3], til: ["solnor-stova", "1"] },
        { ved: [26, 8], til: ["skogen", "1"], kant: true },
        { ved: [7, 11], verd: true, kant: true },
      ],
      folk: [{ merke: "@", u: "elev", namn: "Guten på garden", tale: "elev" }],
    },
    "solnor-stova": {
      namn: "Stova på Solnør", golv: "P", inne: true,
      rader: [
        "XXXXXXXXXXXXXXXX",
        "XBBBPPfPPPPBBBBX",
        "XPPPPPPPPPPPPPPX",
        "XPkkPPPPPP@PPbPX",
        "XPz$PPPPPPPPPbPX",
        "XPPPPP%PPPPPPPPX",
        "XLPPPPPP1PPPPPKX",
        "XXXXXXXXEXXXXXXX",
      ],
      dorer: [{ ved: [8, 7], til: ["solnor", "d"] }],
      kister: [{ ved: [14, 6], ting: "romegraut", n: 1, id: "k-solnor" }],
      folk: [
        { merke: "@", u: "daae", namn: "Kaptein Daae", tale: "daae" },
        { merke: "%", u: "elev2", namn: "Dotter på garden", tale: "elev2" },
        { merke: "$", u: "ivar", namn: "Skrivepulten", usynleg: true, tale: "pult", flis: "k" },
      ],
    },
    skogen: {
      namn: "Skogen ved Solnør", golv: ",", fiendar: { sjanse: 1, lag: [["glose"], ["stavefeil", "blekkflekk"], ["glose", "blekkflekk"]] },
      rader: [
        "##########################",
        "#,,,,#,,,,,,u,,,,,#,,,,,,#",
        "#,u,,,,,,#,,,,,,,,,,,,,u,#",
        "#,,,,,,,,,,,,,t,,,,,,,,,,#",
        "#,,,t,,,,,,,,,,,,,,,,#,,,#",
        "1,,,,,,,,#,,,,,,,,,,,,,,,#",
        "#,,,,,,,,,,,,,,u,,,,,,,,,#",
        "#,,#,,,,,,,,,,,,,,,,t,,,,#",
        "#,,,,,,t,,,,,,,,,,,,,,,,,#",
        "#,,,,,,,,,,,,,,,,#,,,,@u,#",
        "#,,,,,,,,,,,,,,,,,,,,,,,,#",
        "##########################",
      ],
      dorer: [{ ved: [0, 5], til: ["solnor", "2"], kant: true }],
      planter: true,
      folk: [{ merke: "@", u: "gamal", namn: "Kanselli-kråka", usynleg: true, tale: "kraake", flis: "," }],
    },
    bergen: {
      namn: "Bergen", golv: "=", stad: "bergen",
      rader: [
        "############################",
        "#rrrrr..rrrrrr..rrrrr..rrrr#",
        "#rrrrr..rrrrrr..rrrrr..rrrr#",
        "#wVdVw..WvWDWv..wVwdw..WDWW#",
        "#====================!=====#",
        "#==@=====t======t=====L==$=#",
        "#==========================#",
        "#==========%===============#",
        "#QQQQQQQQQQQQQQQQQQQQQQQQQQ#",
        "#~~~~~~~~~~~Q~~~~~~~~~~~~~~#",
        "#~~~~~~~~~~~Q~~~~~~~~~~~~~~#",
        "############1###############",
      ],
      dorer: [
        { ved: [11, 3], til: ["bispegarden", "1"] },
        { ved: [12, 11], verd: true, kant: true },
      ],
      folk: [
        { merke: "@", u: "borgar", namn: "Bergensar", tale: "bergensar" },
        { merke: "%", u: "fiskar", namn: "Fiskehandlar", tale: "fiskehandlar" },
        { merke: "$", u: "kremmar", namn: "Kremmar", tale: "kremmar" },
      ],
    },
    bispegarden: {
      namn: "Bispegarden", golv: "P", inne: true,
      rader: [
        "XXXXXXXXXXXXXX",
        "XBBBBPPPPBBBBX",
        "XPPPPPPPPPPPPX",
        "XPPPkkk@PPPPPX",
        "XPPPPPPPPPPP%X",
        "XPPPPP1PPPPPPX",
        "XXXXXXEXXXXXXX",
      ],
      dorer: [{ ved: [6, 6], til: ["bergen", "d"] }],
      folk: [
        { merke: "@", u: "neumann", namn: "Biskop Neumann", tale: "neumann" },
        { merke: "%", u: "tenar", namn: "Tenestejente", tale: "tenestejente" },
      ],
    },
  };
  // Merke som ikkje står i rada: «d» er ruta framfor ei dør inn frå eit anna kart, «t» framfor trykkeriet.
  const EKSTRA_MERKE = {
    asen: { d: [7, 4] }, ekset: { d: [10, 4], t: [22, 4] },
    solnor: { d: [13, 4] }, bergen: { d: [11, 4] },
  };

  /* ---------- Verdskartet ---------- */
  const STADER = [
    { id: "aasen", namn: "Ørsta", kart: "asen", merke: "d", tekst: "Heimbygda. Åsen og Ekset." },
    { id: "heroy", namn: "Herøy", manus: "heroy", tekst: "Prost Thoresen, som tek imot unge som vil lære." },
    { id: "solnor", namn: "Solnør", kart: "solnor", merke: "1", tekst: "Herregarden til kaptein Daae i Skodje." },
    { id: "bergen", namn: "Bergen", kart: "bergen", merke: "1", tekst: "Byen med biskopen og avisa." },
  ];

  /* ---------- Fiendar ---------- */
  const FIENDAR = {
    blekkflekk: { namn: "Blekkflekk", bilete: "blekkflekk", hp: 18, atk: 5, def: 1, spd: 8, xp: 6, pengar: 4, fall: [["flatbrod", 0.15]] },
    stavefeil: { namn: "Stavefeil", bilete: "stavefeil", hp: 24, atk: 6, def: 2, spd: 11, xp: 9, pengar: 6, fall: [["kaffi", 0.1]] },
    glose: { namn: "Latinsk gloseorm", bilete: "glose", hp: 34, atk: 8, def: 3, spd: 7, xp: 14, pengar: 9, fall: [["romegraut", 0.08]] },
    setjekasse: { namn: "Setjekassa", bilete: "setjekasse", hp: 90, atk: 8, def: 3, spd: 7, xp: 60, pengar: 40, boss: true,
      spesial: { kvar: 3, namn: "Blysats", faktor: 1.8, tekst: "Setjekassa kastar ein heil sats med blybokstavar!" } },
    kraake: { namn: "Kanselli-kråka", bilete: "kraake", hp: 150, atk: 11, def: 4, spd: 12, xp: 110, pengar: 70, boss: true,
      spesial: { kvar: 3, namn: "Kanselliskrik", faktor: 1.4, alle: true, tekst: "«Skriv dansk!», skrik kråka, og det skjer i øyra." } },
    skugge: { namn: "Skuggen av Blekklatten", bilete: "skugge", hp: 260, atk: 15, def: 5, spd: 10, xp: 220, pengar: 0, boss: true,
      spesial: { kvar: 3, namn: "Blekkregn", faktor: 1.3, alle: true, tekst: "Fire hundre år med kanselliblekk regnar ned over dykk." } },
  };

  /* ---------- Partiet ---------- */
  const PARTI = {
    ivar: { namn: "Ivar", u: "ivar", hp: 46, mp: 12, atk: 7, def: 3, spd: 9, vekst: { hp: 9, mp: 2, atk: 1.2, def: 0.8, spd: 0.3 } },
    skreppa: { namn: "Skreppa", u: "skreppa", hp: 38, mp: 10, atk: 6, def: 4, spd: 11, vekst: { hp: 8, mp: 2, atk: 1, def: 1, spd: 0.4 }, evner: ["nistepakke", "reimeslag"] },
  };

  /* ---------- Ordkunst ----------
     type: skade, lækje, vern. sporsmal: kva slags nynorskspørsmål som avgjer
     kor godt formelen verkar (sjå js/rpg/kamp.js). */
  const EVNER = {
    kjonnsord: { namn: "Kjønnsord", mp: 2, type: "skade", kraft: 16, sporsmal: "kjonn", mal: "ein", tekst: "Kjenn kjønnet på ordet, og ordet slår til. Svarar du rett, treffer du hardt." },
    vokalskifte: { namn: "Vokalskifte", mp: 4, type: "skade", kraft: 30, sporsmal: "vokal", mal: "ein", tekst: "Rett form av eit sterkt verb utløyser ei kraftig trolldom." },
    danaar: { namn: "Den gongen då", mp: 3, type: "lækje", kraft: 34, sporsmal: "danaar", mal: "venn", tekst: "Eit godt minne lækjer. Vel rett mellom då og når." },
    andreplass: { namn: "Andreplass", mp: 3, type: "vern", kraft: 3, sporsmal: "v2", mal: "alle", tekst: "Verbalet på plass to held setninga oppe og vernar heile partiet i nokre rundar." },
    nistepakke: { namn: "Nistepakke", mp: 3, type: "lækje", kraft: 30, mal: "venn", tekst: "Skreppa finn fram flatbrød og spekekjøt. Lækjer utan spørsmål." },
    reimeslag: { namn: "Reimeslag", mp: 2, type: "skade", kraft: 14, mal: "ein", tekst: "Skreppa slår med skinnreimene. Treffer alltid." },
  };

  /* ---------- Ting ---------- */
  const TING = {
    flatbrod: { namn: "Flatbrød", tekst: "Lækjer 30 HP.", lækje: 30, pris: 20 },
    romegraut: { namn: "Rømmegraut", tekst: "Lækjer 90 HP.", lækje: 90, pris: 60 },
    kaffi: { namn: "Kaffi", tekst: "Gir att 10 blekk (MP).", blekk: 10, pris: 45 },
    luktesalt: { namn: "Luktesalt", tekst: "Vekkjer ein som har falle, med halv HP.", vekk: 0.5, pris: 90 },
  };
  const NOKKELTING = {
    boka: { namn: "Lånebok frå Ekset", tekst: "Ei bok Ivar har lånt av Sivert Aarflot. Ho skal leverast attende." },
    lanebrev: { namn: "Lånebrevet", tekst: "Frå Aarflot: Ivar kan låne bøker på Ekset så mykje han vil." },
    plantesamling: { namn: "Plantesamlinga", tekst: "Pressa planter frå skogane rundt Solnør." },
    grammatikk: { namn: "Den søndmørske Dialekt", tekst: "Grammatikken Ivar skreiv over sunnmørsmålet." },
    skriftsprog: { namn: "Om vort Skriftsprog", tekst: "Planen frå 1836: eit norsk skriftspråk bygd på det dialektane har felles." },
    stipend: { namn: "Stipendbrevet", tekst: "150 spesidalar i året frå Det Kongelige Norske Videnskabers Selskab i Trondheim." },
  };

  /* ---------- Gåver frå kurset: fullførte modular gir hjelp i spelet ---------- */
  const GAAVER = [
    { id: "kjonnsring", namn: "Kjønnsringen", modular: ["grammatikk-substantiv", "trening-substantiv"], tekst: "Kjønnsord viser berre to av dei tre artiklane." },
    { id: "vokalstav", namn: "Vokalstaven", modular: ["grammatikk-verb", "trening-verb"], tekst: "Vokalskifte gjer 25 % meir skade." },
    { id: "v2kompass", namn: "V2-kompasset", modular: ["omgrep-setning", "trening-setning"], tekst: "Andreplass varer to rundar lenger." },
    { id: "tidsauga", namn: "Tidsauga", modular: ["feil-smaord", "trening-smaord"], tekst: "Du får halvparten meir tid på kvart spørsmål." },
    { id: "heimbygda", namn: "Heimbygda", modular: ["historie-aasen"], tekst: "Ivar får 15 ekstra HP." },
    { id: "reisestav", namn: "Reisestaven", modular: ["historie-aasen-reise"], tekst: "10 % meir røynsle etter kvar kamp." },
  ];

  /* ---------- Manus ---------- */
  const harOrd = n => st => st.notatboka.length >= n;
  const MANUS = {
    start: [
      { fort: ["Noreg, 1826.", "I fire hundre år har landet skrive på eit anna lands språk. Blekket frå kanselliet i København har sige inn i lover, skular og kyrkjebøker.", "Folk snakkar norsk. Dei skriv dansk.", "Men blekket har vakna. Det et orda folk seier, og legg dansk i staden."] },
      { fort: ["På garden Åsen i Ørsta bur ein gut på tretten år. Han er den yngste av ni søsken.", "Mora døydde då han var tre. I vår døydde faren.", "Guten heiter Ivar. Han les alt han kjem over."] },
    ],
    bror: st => st.flagg.boka_levert ? [{ s: "Storebror", t: "Aarflot lét deg låne fleire bøker? Du er ein rar kar, Ivar. Men far ville ha vore stolt." }]
      : st.flagg.fekk_boka ? [{ s: "Storebror", t: "Ekset ligg aust for garden. Følg vegen langs fjorden." }]
      : [
        { s: "Storebror", t: "Ivar. No som far er borte, må alle ta i eit tak her på garden." },
        { s: "Storebror", t: "Men eg veit kvar tankane dine er. Ligg ikkje boka frå Ekset der på benken?" },
        { s: "Ivar", t: "Eg har lese henne to gonger. Ho skal attende til Aarflot." },
        { s: "Storebror", t: "Så gå med henne, då. Men pass deg på vegen. Folk snakkar om noko svart som sig fram i graset. Dei som møter det, gløymer ord." },
        { gi: "boka" }, { flagg: "fekk_boka" },
        { t: "Ivar fekk «Lånebok frå Ekset»." },
        { t: "Trykk X eller Esc for menyen. Gå til leselampar for å lagre." },
      ],
    syster: st => st.flagg.fekk_boka ? [
      { s: "Syster", t: "Veit du kva oldemor kalla det vesle vindauget i taket? Ljore." },
      { ord: ["ljore"] },
      { t: "Ivar skreiv «ljore» i notatboka." },
    ] : [{ s: "Syster", t: "Storebror vil snakke med deg." }],
    granne: [
      { s: "Granne", t: "Presten skriv «Gaard» i kyrkjeboka, men vi seier tun når vi meiner plassen mellom husa. Rart, det." },
      { ord: ["tun"] },
      { t: "Ivar skreiv «tun» i notatboka." },
    ],
    fiskar: st => st.flagg.fiskar ? [{ s: "Fiskar", t: "Naust, sa eg. Hugs det, gut." }] : [
      { s: "Fiskar", t: "Du der med boka. Ein skrivar frå byen var her i går og spurde kva huset til båten heiter." },
      { s: "Fiskar", t: "Eg sa naust. Han skreiv «Baadhus». Og så kom det ein blekkflekk krypande opp frå papiret hans!" },
      { ord: ["naust"] }, { flagg: "fiskar" },
      { t: "Ivar skreiv «naust» i notatboka." },
    ],
    vegen_forste: st => st.flagg.vegen_sett ? [] : [
      { flagg: "vegen_sett" },
      { t: "Graset langs vegen er mørkt og tett. Her kan blekkflekkane lure." },
      { t: "I kamp vel du Angrip, Ordkunst eller Ting. Ordkunst kostar blekk (MP), men verkar best: svarar du rett på nynorskspørsmålet, slår formelen til med full kraft." },
    ],
    typograf: st => st.flagg.setjekasse_slegen ? [{ s: "Typograf", t: "Pressa går att! Og bokstavane står der dei skal." }] : [
      { s: "Typograf", t: "Hjelp! Eg sette ei side med dansk kanselliskrift i går, og i natt byrja blekket å leve." },
      { s: "Typograf", t: "No har setjekassa vakna òg. Ho stavar feil med vilje!" },
    ],
    kone: [
      { s: "Kone frå bygda", t: "Løa var full av høy i fjor. I år har ho nesten tomt. Men ordet har vi framleis." },
      { ord: ["løe"] },
      { t: "Ivar skreiv «løe» i notatboka." },
    ],
    aarflot: st => st.flagg.setjekasse_slegen ? (st.flagg.lanebrev ? [{ s: "Sivert Aarflot", t: "Les, Ivar. Les alt. Og skriv ned det du høyrer." }] : [
      { s: "Sivert Aarflot", t: "Du slo setjekassa! Og kven er det der, ein skreppe med auge?" },
      { s: "Skreppa", t: "Eg låg under pressa i førti år og høyrde på orda. No har eg tenkt å sjå meg om i verda." },
      { s: "Sivert Aarflot", t: "Ta dette lånebrevet. Heretter lånar du det du vil av boksamlinga mi." },
      { gi: "lanebrev" }, { t: "Ivar fekk «Lånebrevet»." },
      { s: "Sivert Aarflot", t: "Og ta med deg denne grammatikken. Sterke verb skiftar vokal: drikk, drakk, drukke. Den som kan det, kan meir enn han trur." },
      { evne: "vokalskifte" }, { t: "Ivar lærte ordkunsta «Vokalskifte»." },
      { flagg: "lanebrev" },
      { fort: ["Åra går. Ivar låner bøker på Ekset og les, som han seier sjølv, «med en vis Graadighed».", "1831: Atten år gamal blir han omgangsskulelærar i heimbygda. Han går frå gard til gard og lærer ungane å lese.", "Den som lærer andre, lærer sjølv. Ungane blandar stendig «då» og «når»."] },
      { evne: "danaar" }, { t: "Ivar lærte ordkunsta «Den gongen då»." },
      { fort: ["1833: Ivar er tjue år. Han vil lære meir enn bygda kan gi han.", "Han legg ut til prost Thoresen i Herøy."] },
      { opne: "heroy" }, { verd: 1 },
    ]) : st.flagg.trykkeri_ope ? [{ s: "Sivert Aarflot", t: "Trykkeriet ligg aust på tunet. Ver varsam der inne." }] : [
      { s: "Sivert Aarflot", t: "Ivar Aasen frå Åsen. Kom du med boka?" },
      { s: "Ivar", t: "Ho er her. Takk for lånet." },
      { ta: "boka" }, { flagg: "boka_levert" },
      { s: "Sivert Aarflot", t: "Du les fort. Men no har vi eit problem. Trykkeriet mitt er fullt av blekk som lever." },
      { s: "Sivert Aarflot", t: "Det kom med ei side dansk kanselliskrift. Blekket et orda folk seier og spyttar ut stavefeil." },
      { s: "Sivert Aarflot", t: "Du er ung og kan orda frå bygda. Vil du sjå kva du kan gjere? Her er nøkkelen." },
      { flagg: "trykkeri_ope" }, { t: "Døra til trykkeriet er open." },
    ],
    setjekasse: st => st.flagg.setjekasse_slegen ? [{ t: "Setjekassa står stille. Bokstavane ligg i rette rader." }] : [
      { s: "Setjekassa", t: "K-L-A-K-K. Eg set orda slik eg vil. «Gaard». «Baadhus». «Pige»." },
      { s: "Ivar", t: "Folk her seier tun, naust og jente." },
      { s: "Setjekassa", t: "Ikkje på trykk!" },
      { kamp: ["setjekasse"], boss: 1 },
      { flagg: "setjekasse_slegen" },
      { t: "Bokstavane dett ut av setjekassa og legg seg i rette rader." },
      { s: "???", t: "Pst. Her nede. Under pressa." },
      { s: "Skreppa", t: "Eg er ei skreppe. Eg har lege her i førti år og høyrt på orda som vart sette. No vil eg ut og høyre dei orda som ikkje vart det." },
      { parti: "skreppa" }, { t: "Skreppa vart med i partiet!" },
      { s: "Skreppa", t: "Gå til Aarflot. Han vil takke deg." },
    ],
    heroy: st => st.flagg.heroy ? [{ fort: ["Prostegarden i Herøy. Prost Thoresen har bøkene sine opne for Ivar."] }, { verd: 1 }] : [
      { fort: ["Herøy, 1833.", "Prost Thoresen tek imot unge menn som vil lære. Ivar les grammatikkar og lærer seg korleis språk er bygde."] },
      { s: "Prost Thoresen", t: "Ei setning er som eit hus, Ivar. Verbalet er den berande bjelken, og han står på plass nummer to." },
      { evne: "andreplass" }, { t: "Ivar lærte ordkunsta «Andreplass»." },
      { fort: ["1835: Ivar blir huslærar hjå kaptein Daae på Solnør i Skodje.", "Der skal han vere i sju år."] },
      { flagg: "heroy" }, { opne: "solnor" }, { verd: 1 },
    ],
    elev: [
      { s: "Guten på garden", t: "Lærar Aasen! Kaptein seier du skal lære oss latin. Men eg vil heller lære kva ein kvern er på latin." },
      { ord: ["kvern"] }, { t: "Ivar skreiv «kvern» i notatboka." },
    ],
    elev2: [
      { s: "Dotter på garden", t: "Mor kallar den vesle bua der vi har maten for stabbur. Er det eit fint ord?" },
      { s: "Ivar", t: "Eit av dei finaste." },
      { ord: ["stabbur"] }, { t: "Ivar skreiv «stabbur» i notatboka." },
    ],
    daae: st => st.flagg.til_bergen ? [{ s: "Kaptein Daae", t: "Bergen ventar. Vis biskopen kva du har gjort." }]
      : (st.flagg.planter_ferdig && st.flagg.grammatikk) ? [
        { s: "Kaptein Daae", t: "Ein grammatikk over målet vårt, og ei plantesamling som får botanikarane til å måpe. Du er meir enn ein huslærar, Aasen." },
        { s: "Kaptein Daae", t: "Reis til Bergen og vis det fram for biskop Neumann. Han er ein lærd mann." },
        { fort: ["Sommaren 1841.", "Ivar legg ut mot Bergen med plantesamlinga og grammatikken i skreppa."] },
        { flagg: "til_bergen" }, { opne: "bergen" }, { verd: 1 },
      ] : st.flagg.daae_helst ? [
        { s: "Kaptein Daae", t: `Planter: ${st.flagg.planter_ferdig ? "ferdig" : `${st.planter} av 5`}. Grammatikken: ${st.flagg.grammatikk ? "ferdig" : "ikkje skriven"}.` },
        { s: "Kaptein Daae", t: "Plantene finn du i skogen aust for garden. Grammatikken skriv du ved pulten når notatboka har minst 15 ord." },
      ] : [
        { s: "Kaptein Daae", t: "Velkomen til Solnør, Aasen. Borna mine treng ein lærar, og du treng tid til bøkene dine." },
        { s: "Kaptein Daae", t: "Eg har høyrt at du samlar planter òg. Skogen aust for garden er full av dei. Finn fem sjeldne, så skal vi pressa dei." },
        { s: "Kaptein Daae", t: "Og skriv ned målet vårt. Ein grammatikk over sunnmørsmålet ville vere noko nytt." },
        { flagg: "daae_helst" },
        { t: "Oppdrag: Finn fem planter i skogen. Skriv grammatikken ved pulten når notatboka har minst 15 ord." },
      ],
    pult: st => [
      ...(!st.flagg.skriftsprog ? [
        { fort: ["1836. Om kvelden sit Ivar ved pulten.", "Han skriv ned ein plan: eit norsk skriftspråk, bygd ikkje på éin dialekt, men på det dialektane har felles."] },
        { gi: "skriftsprog" }, { flagg: "skriftsprog" }, { t: "Ivar skreiv «Om vort Skriftsprog»." },
      ] : []),
      { dersom: st2 => st2.flagg.grammatikk, da: [{ t: "Grammatikken ligg ferdig på pulten." }], elles: [
        { dersom: harOrd(15), da: [
          { fort: ["Ivar legg notatboka ved sida av seg og skriv.", "Om kjønnet på orda. Om bøyinga. Om korleis folk på Sunnmøre faktisk snakkar."] },
          { gi: "grammatikk" }, { flagg: "grammatikk" }, { t: "Ivar skreiv «Den søndmørske Dialekt»!" },
        ], elles: [
          { t: "Ivar har for få ord i notatboka til å skrive ein grammatikk. Han treng minst 15. Ord får han ved å snakke med folk og ved å svare rett i ordkunsta." },
        ] },
      ] },
    ],
    kraake: st => st.flagg.kraake_slegen ? [] : [
      { s: "Kanselli-kråka", t: "KRAA! Plante? PLANTE? Det heiter Plante på dansk òg, men du uttaler det feil!" },
      { s: "Skreppa", t: "Ho vaktar den siste planten. Og ho har embetsmannshatt." },
      { kamp: ["kraake"], boss: 1 },
      { flagg: "kraake_slegen" },
      { t: "Kråka flaksar av garde med hatten på skakke." },
    ],
    bergensar: [{ s: "Bergensar", t: "Du er ikkje herifrå? Nei, det høyrest. Men det er fint å høyre." }, { ord: ["gut"] }, { t: "Ivar skreiv «gut» i notatboka." }],
    fiskehandlar: [{ s: "Fiskehandlar", t: "Sei, torsk og sild! Vi seier sei, og ingen i byen skriv det." }, { ord: ["sei"] }, { t: "Ivar skreiv «sei» i notatboka." }],
    kremmar: [{ s: "Kremmar", t: "Godt og billeg for reisande!" }, { butikk: ["flatbrod", "romegraut", "kaffi", "luktesalt"] }],
    tenestejente: [{ s: "Tenestejente", t: "Biskopen les alt som kjem frå bygdene. Han seier det finst meir lærdom i ei løe enn i mange bøker." }],
    neumann: st => st.flagg.stipend ? [{ s: "Biskop Neumann", t: "Gud signe reisa di, Aasen." }] : [
      { s: "Biskop Neumann", t: "Så du er bondeguten frå Sunnmøre som har skrive ein grammatikk?" },
      { s: "Ivar", t: "Over målet i heimbygda. Og her er plantesamlinga mi." },
      { s: "Biskop Neumann", t: "Dette er merkeleg. Ein bonde som har lært seg latin, tysk og fransk på eiga hand, og som ser at målet hans følgjer reglar." },
      { fort: ["Få dagar seinare står det i Bergens Stiftstidende om «denne mærkelige unge Bonde».", "Artikkelen blir lesen i Trondheim, der Frederik Moltke Bugge leier Det Kongelige Norske Videnskabers Selskab."] },
      { s: "Biskop Neumann", t: "Eit brev frå Trondheim! Selskapet vil gi deg eit stipend på 150 spesidalar i året, så du kan reise og granske dialektane." },
      { gi: "stipend" }, { pengar: 18000 }, { flagg: "stipend" },
      { t: "Ivar fekk «Stipendbrevet» og 150 spesidalar." },
      { s: "Skreppa", t: "150 spesidalar! Det er seks årsløner for ein dreng. Men Ivar, sjå ut vindauget. Himmelen over Vågen er svart." },
      { flagg: "skugge_kjem" },
    ],
    skugge: st => (!st.flagg.skugge_kjem || st.flagg.skugge_slegen) ? [] : [
      { s: "???", t: "Så det er du som samlar orda mine att." },
      { s: "Skuggen av Blekklatten", t: "Eg er fire hundre år med kanselliblekk. Eg er i kvar lov og kvar kyrkjebok. Kva er du? Ein bondegut med ei skreppe." },
      { s: "Ivar", t: "Eg er ein som lyttar." },
      { kamp: ["skugge"], boss: 1 },
      { flagg: "skugge_slegen" },
      { s: "Skuggen av Blekklatten", t: "Dette var berre skuggen min. Blekklatten sjølv ligg i ei skuff i Christiania og veks for kvart ord han et." },
      { s: "Skreppa", t: "Då får vi gå dit. Via kvar bygd i landet, ser det ut til." },
      { kapittelslutt: 1 },
    ],
  };

  return { U, KART, EKSTRA_MERKE, STADER, FIENDAR, PARTI, EVNER, TING, NOKKELTING, GAAVER, MANUS };
})();
