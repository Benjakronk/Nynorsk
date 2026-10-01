/* Innhaldet i «Aasen: Språkvandringa», kapittel 1: Ørsta (1826–1831).

   Scenario og design: sjå designdokumentet «Aasen-spelet: scenario og design».
   Ivar Aasen samlar ord, og kvart ord blir ein galdr. Lydfamilien til ordet
   avgjer kva galdren gjer. Kanselliblekket er ei naturkraft som skriv vidare
   av seg sjølv, og der det breier seg, blir talen til folk stiv og framand.

   Årstal og fakta om Aasen er frå modulane i kurset (fødd 1813 på Åsen i
   Ørsta, mora døydde då han var tre, faren då han var tretten, 1831
   omgangsskulelærar). Konfirmasjonen frå 1736, haugianarane og Aarflot på
   Ekset (død 1817) er historiske. Hendingane i spelet er dikta.

   Språket i dialogen: embetsmenn og blekket talar dansk (skrivemåten frå
   1800-talet), bygdefolk og forteljaren nynorsk. Knud Knudsen (frå kapittel 4)
   byrjar nesten som dansk og blir meir og meir lik bokmål utover i historia.
   Den framande (speilfiguren, utan namn enno) vil ha kontroll over språket
   for å kontrollere magien: den som rår over orda, rår over galdrane.

   Dialektformene i ORD er vanlege variantar frå ordlista i designdokumentet.
   Dei bør sjekkast mot Aasens ordbok og Norsk Ordbok før dei blir låste.
   Dei danske formene har skrivemåten frå 1800-talet.

   Karta er skrivne som tekst. Kvart teikn er ei flis (sjå js/rpg/pikslar.js).
   Siffer og symbola @ % $ ! & * er merke: dei blir liggjande som golvflisa
   til kartet, og posisjonen blir brukt til dører, startpunkt og personar.

   Manus er lister med steg som spelet køyrer i rekkjefølgje:
     { s: "Namn", t: "Replikk" }        replikk (s kan sløyfast for forteljar)
                                        ⟪ord⟫ i replikken blir utheva
     { lytt: ["stein", "stæin"] }       Ivar høyrer ei form av eit ord (id, form)
     { tilbod: ["snjo", "snjo"] }       huldra seier eit ord: skrive ned eller berre lytte?
     { val: "Spørsmål", alt: ["A", "B"], svar: [[…], […]] }  val med eigne steg
     { fort: ["linje", …] }             forteljing på svart skjerm
     { flagg: "x" } / { uflagg: "x" }   set eller fjern eit flagg
     { gi: "ting", n: 2 }               gi ting eller nøkkelting
     { pengar: 60 }                     skilling
     { parti: "huldra" }                ny i partiet
     { kamp: ["blekkdrope"], boss: 1, rettleiing: 1 }
     { stev: "steinstevet" }              Ivar lærer eit stev
     { forvandling: [før, etter], tekst } eit bilete glir over i eit anna (vetten får namnet att)
     { til: ["kart", "merke"] }         flytt
     { fjern: "&" }                     personen på merket går sin veg
     { dersom: fn, da: […], elles: […] }
     { lagre: 1 }, { lækje: 1 }, { butikk: [...] }, { kapittelslutt: 1 }

   Scenemotoren (sjå js/rpg/README.md for heile lista):
     { scene: "id" }                    spel ei scene frå SCENER (kort med stad og tid først)
                                        hopp: true på scena: ein mellomsekvens som kan hoppast over (X/Esc)
     { gaa: "Namn", mot: "Ivar" }       gå bort til nokon og snu seg mot han
     { gaa: "Namn", rute: [x, y] }      gå til ei rute (eller eit merke: rute: "@")
     { gaa: "Namn", sti: "h3o2" }       gå ein fast sti (n ned, o opp, v venstre, h høgre)
                                        ut: true på eit gaa-steg: borte når han er framme (inn ei dør)
     { snu: "Namn", retning: "opp" }    eller { snu: "Namn", mot: "Ivar" }, eller ryggen til: fraa: "Ivar"
     { pose: "Namn", p: "knele" }       knele, sitje, peike, liggje eller sove (p: null tek posen bort)
     { inn: { namn, u, rute, retning } } ny person på kartet (vesen: "blekklatten" i staden for u: eit vesen)
     { byt: "Namn", namn, u }           nytt namn eller ny utsjånad (vesen) på ein person på kartet
     { kamera: "Namn" | [x, y] | null } kameraet glir til nokon (og følgjer), til ei rute, eller attende
     { saman: [[…], […]] }              fleire lister samstundes
     { vent: ms }, { blink: 1 }, { rist: ms }, { ton: "svart" | "kvitt" | "inn" }
     { kort: ["Stad", "tid"] }, { naerbilete: "bilete/…png", tekst }
     { val, alt, svar, id: "x" }        valet blir hugsa i st.val.x (sjå valt())
     { traad: "id", tekst } / { traad: "id", lukk: 1 }   opnar eller lukkar ein forteljartråd
     { dagbok: "tekst" }                ei linje i Dagboka
     { parti: "huldra", fra: "Huldra" } ny i partiet: følgjet står der personen stod
     { partiUt: "huldra" }              går ut av partiet
     { scenekart: "id", merke, retning, fylgje: true } / { scenekart: null }
                                        til eit kart som berre finst for scena (scene: true), og attende
     ikkjeVent: true på eit registeg lèt manus gå vidare medan det skjer */
window.RPGData = (function () {
  "use strict";

  /* ---------- Lydfamiliane ---------- */
  // Kvar familie gir ei slags evne. «sterk» seier om ei form har lyden som gir kraft.
  const FAMILIAR = {
    diftong: {
      namn: "Diftongane", evne: "Vern", rost: 3, farge: "#f8d840",
      tekst: "Dansk har gjort ei, au og øy til enkle vokalar, mens mange bygdemål har teke vare på dei. Galdrane gir vern.",
      hint: "Diftongen (ei, au, øy) gir kraft.",
      sterk: f => /(ei|æi|ai|au|øy|ey|øu)/i.test(f),
      kvifor: (f, o) => `«${f}» har ingen diftong. Der har dansk gjort han til ein enkel vokal. «${o.aasen}» held på han.`,
    },
    hard: {
      namn: "Dei harde konsonantane", evne: "Åtak", rost: 2, farge: "#e86a50",
      tekst: "Dansk har mjuka opp p, t og k etter vokal, så kake vart Kage og gate vart Gade. Formene med harde konsonantar er åtaksgaldrar.",
      hint: "Den harde konsonanten (p, t, k) gir kraft.",
      sterk: (f, o) => f.toLowerCase() !== o.dansk.toLowerCase(),
      kvifor: (f, o) => `«${f}» er dansk, med mjuk konsonant. «${o.aasen}» har den harde.`,
    },
    sporjeord: {
      namn: "Spørjeorda", evne: "Avsløring", rost: 2, farge: "#7fd0f0",
      tekst: "Der dansk skriv hv, har mange bygdemål kv eller k. Spørjeorda avslører veikskapar hos fiendar og løyndomar i verda.",
      hint: "Kv eller k, ikkje hv, gir kraft.",
      sterk: f => !/^hv/i.test(f),
      kvifor: (f, o) => `«${f}» har den danske hv-en. I bygdemåla heiter det mellom anna «${o.former[0]}» og «${o.former[1]}».`,
    },
    j: {
      namn: "J-orda", evne: "Lindring", rost: 3, farge: "#9ff09f",
      tekst: "Mange bygdemål har teke vare på ein j som dansk miste. Desse orda lækjer og lindrar.",
      hint: "J-en gir kraft.",
      sterk: f => /j/i.test(f),
      kvifor: (f, o) => `«${f}» har mista j-en, slik dansk gjorde. «${o.aasen}» har han att.`,
    },
    smaaord: {
      namn: "Småorda", evne: "Raske galdrar", rost: 1, farge: "#d8c8f8",
      tekst: "Småorda blir brukte heile tida og har svært mange former. Dei gir billige galdrar som kan brukast ofte, utan spørsmål.",
    },
    nokkel: {
      namn: "Nøkkelorda", evne: "Legender", rost: 0, farge: "#f0e8c8",
      tekst: "Nokre ord ber sjølve temaet. Dei finst berre ved å rekonstruere rota frå mange bygder, og dei driv hovudhistoria framover.",
    },
  };

  /* ---------- Orda (frå ordlista i designdokumentet) ---------- */
  // verknad: kva galdren gjer i kamp. mot: fiendeslag der ordet passar ekstra godt.
  const ORD = {
    stein: { fam: "diftong", aasen: "stein", former: ["stein", "stæin", "sten"], norront: "steinn", dansk: "Steen", tyding: "stein, berg", verknad: { vern: 3 }, tekst: "Vern for heile partiet." },
    heim: { fam: "diftong", aasen: "heim", former: ["heim", "heime", "hjem"], norront: "heimr", dansk: "Hjem", tyding: "heim, bustad", verknad: { vern: 3, lækje: 10 }, tekst: "Vern og litt lækjing for heile partiet." },
    auga: { fam: "diftong", aasen: "auga", former: ["auga", "auge", "øye"], norront: "auga", dansk: "Øie", tyding: "auge", verknad: { vern: 2, avslor: "alle" }, tekst: "Vern, og auga ser veikskapane til alle fiendane." },
    draum: { fam: "diftong", aasen: "draum", former: ["draum", "drøm"], norront: "draumr", dansk: "Drøm", tyding: "draum", verknad: { vern: 3, sov: true }, tekst: "Vern, og éin fiende kan sovne og miste ein tur." },
    hoyra: { fam: "diftong", aasen: "høyra", former: ["høyra", "høyre", "høre"], norront: "heyra", dansk: "høre", tyding: "høyre, lytte", verknad: { vern: 4 }, tekst: "Sterkt vern for heile partiet." },
    laus: { fam: "diftong", aasen: "laus", former: ["laus", "løs"], norront: "lauss", dansk: "løs", tyding: "laus, fri", verknad: { vern: 2, loys: true }, tekst: "Vern, og alle rettskrivne ord blir sette fri." },
    kaka: { fam: "hard", aasen: "kaka", former: ["kaka", "kake"], norront: "kaka", dansk: "Kage", tyding: "kake, flatbrød", verknad: { skade: 16 }, tekst: "Åtak på éin fiende." },
    gata: { fam: "hard", aasen: "gata", former: ["gata", "gate"], norront: "gata", dansk: "Gade", tyding: "gate, fegate mellom gjerde", verknad: { skade: 11, alle: true }, tekst: "Åtak som går gjennom alle fiendane." },
    bok: { fam: "hard", aasen: "bok", former: ["bok"], norront: "bók", dansk: "Bog", tyding: "bok", verknad: { skade: 15 }, mot: ["bok"], tekst: "Åtak på éin fiende. Særleg sterkt mot protokollar." },
    vita: { fam: "hard", aasen: "vita", former: ["vita", "vite"], norront: "vita", dansk: "vide", tyding: "vite, kjenne til", verknad: { skade: 14, gjennom: true }, tekst: "Åtak som går rett gjennom vernet til fienden." },
    mat: { fam: "hard", aasen: "mat", former: ["mat"], norront: "matr", dansk: "Mad", tyding: "mat", verknad: { skade: 13, meto: 8 }, tekst: "Åtak, og den som syng, blir mett og får litt liv att." },
    kvat: { fam: "sporjeord", aasen: "kvat", former: ["kva", "ka", "kå", "hva"], norront: "hvat", dansk: "hvad", tyding: "kva", verknad: { avslor: "ein" }, tekst: "Avslører éin fiende: han tek meir skade ei stund." },
    kven: { fam: "sporjeord", aasen: "kven", former: ["kven", "kem", "kæm", "hvem"], norront: "hverr", dansk: "hvem", tyding: "kven", verknad: { avslor: "ein" }, mot: ["vette"], tekst: "Avslører éin fiende. Ein vette som blir spurd kven han er, blir forvirra." },
    kvar: { fam: "sporjeord", aasen: "kvar", former: ["kvar", "kor", "kar", "hvor"], norront: "hvar", dansk: "hvor", tyding: "kvar, kor", verknad: { avslor: "alle" }, felt: "leit", tekst: "Avslører alle fiendane. Utanfor kamp finn han gøymde ting." },
    ljos: { fam: "j", aasen: "ljos", former: ["ljos", "jos", "lys"], norront: "ljós", dansk: "Lys", tyding: "lys", verknad: { lækje: 16, alle: true, skadeMot: 10 }, mot: ["blekk"], felt: "lækje", tekst: "Lækjer heile partiet og brenn blekkvesen." },
    snjo: { fam: "j", aasen: "snjo", former: ["snjo", "snjø", "snø"], norront: "snjór", dansk: "Snee", tyding: "snø", verknad: { lækje: 24, skadeMot: 22 }, mot: ["eld"], felt: "lækje", tekst: "Lækjer éin og sløkkjer irrbloss." },
    mjolk: { fam: "j", aasen: "mjølk", former: ["mjølk", "mjelk", "mjøkk"], norront: "mjólk", dansk: "Mælk", tyding: "mjølk", verknad: { lækje: 34 }, felt: "lækje", tekst: "Lækjer éin godt." },
    eg: { fam: "smaaord", aasen: "eg", former: ["eg", "e", "æ", "jæ", "i"], norront: "ek", dansk: "jeg", tyding: "eg", verknad: { snogg: true }, tekst: "Den som syng, får neste tur med ein gong." },
    ikkje: { fam: "smaaord", aasen: "ikkje", former: ["ikkje", "ikke", "ittj", "itte", "inte"], norront: "ekki", dansk: "ikke", tyding: "ikkje", verknad: { stopp: true }, tekst: "Stoppar éin fiende: målaren hans går attende til null." },
    berre: { fam: "smaaord", aasen: "berre", former: ["berre", "bære", "bare"], norront: "", dansk: "kun", tyding: "berre", verknad: { skade: 6, alle: true }, tekst: "Eit lite, billig åtak på alle." },
    maal: { fam: "nokkel", aasen: "maal (mål)", former: ["mål"], norront: "mál", dansk: "Sprog", tyding: "språk, tale", tekst: "Eit nøkkelord. Rota kan rekonstruerast seinare i spelet." },
    tunga: { fam: "nokkel", aasen: "tunga", former: ["tunga", "tunge"], norront: "tunga", dansk: "Tunge", tyding: "tunge, språk", tekst: "Eit nøkkelord. Rota kan rekonstruerast seinare i spelet." },
    hugsa: { fam: "nokkel", aasen: "hugsa", former: ["hugsa", "hugse", "huske"], norront: "hugsa", dansk: "huske, erindre", tyding: "hugse, minnast", tekst: "Eit nøkkelord. Rota kan rekonstruerast seinare i spelet." },
    minne: { fam: "nokkel", aasen: "minne", former: ["minne"], norront: "minni", dansk: "Minde", tyding: "minne", tekst: "Eit nøkkelord. Rota kan rekonstruerast seinare i spelet." },
  };

  /* ---------- Utsjånad ---------- */
  const U = {
    ivar: { kjensler: ["ivrig", "les"], siger: ["ivrig"], hud: "#e8b890", har: "#6a4428", jakke: "#3f5a7a", bukse: "#5a4a3a", sekk: true, belte: true },
    huldra: { hud: "#f0c8a0", har: "#e8c870", frisyre: "hestehale", jakke: "#ece6d0", kjole: "#2f6a3a", kort: true, sjal: "#6a4aa8", hale: true, band: "#d8b040", blom: true,
      // Eige, handteikna ark (tools/pikselkunst/huldra_figur.py). Eigne kjensler i tillegg til standardsettet:
      kjensler: ["lokk", "sky"], siger: ["lokk", "glad"] },
    bror: { hud: "#e2b890", har: "#8a6a3a", jakke: "#7a5a3a", bukse: "#4a4034", belte: true },
    syster: { hud: "#ecc4a4", frisyre: "skaut", skaut: "#2c4288", jakke: "#ecebf0", kjole: "#6a3a2a", forkle: "#ecebf0" },
    granne: { hud: "#e0b890", har: "#d8d8e0", frisyre: "skalle", jakke: "#5a5060", bukse: "#3a3a44", skjegg: "#d8d8e0", strompe: "#e4e0d6", stav: "lang" },
    budeie: { hud: "#ecc4a4", frisyre: "skaut", skaut: "#d06a64", jakke: "#ecebf0", kjole: "#3a5a8a", forkle: "#ecebf0" },
    framande: { hud: "#e8c8b0", har: "#2a2030", jakke: "#2a2438", bukse: "#1c1824", flosshatt: "#141018", briller: true },
    prest: { hud: "#e8c0a0", har: "#d8d8e0", frisyre: "skalle", jakke: "#1c1c28", kjole: "#1c1c28", krage: true, kappe: true },
    klokkar: { hud: "#e0b890", har: "#8a6a3a", jakke: "#4a3a5a", bukse: "#2a2a30" },
    predikant: { hud: "#dcb088", har: "#4a3a2a", jakke: "#4a4a58", bukse: "#3a3a44", hatt: "#2a2a30", skjegg: "#4a3a2a" },
    kone: { hud: "#e0c0a8", frisyre: "skaut", skaut: "#3a3a44", jakke: "#5a3f2a", kjole: "#2a2a30", krokrygg: true },
    kremmar: { hud: "#e2b890", har: "#8a6a3a", jakke: "#3f7a4a", bukse: "#4a4034", hatt: "#5a3a2a" },
    bonde: { hud: "#dcb088", har: "#6a4428", jakke: "#d8d0b8", bukse: "#3a3444", lue: "#b0282c", strompe: "#e4e0d6", belte: true },
    gjetar: { hud: "#ecc4a4", har: "#e8c870", jakke: "#6b8f4a", bukse: "#5a4a3a", lue: "#b0282c" },
    tenestejente: { hud: "#ecc4a4", frisyre: "skaut", skaut: "#ecebf0", jakke: "#2a2a30", kjole: "#2a2a30", forkle: "#ecebf0" },
    haugbonde: { hud: "#8a9a86", har: "#c8ccd4", frisyre: "skalle", jakke: "#4a4a5a", kjole: "#4a4a5a", hatt: "#4e6a4a", skjegg: "#c8ccd4", krokrygg: true, stav: "lang" },
    // Haugbonden med namnet att: raud luve og varm hud, som i forvandlinga (vette3_restored).
    haugbonde_namn: { hud: "#e0b088", har: "#a8a8b0", frisyre: "skalle", jakke: "#5c5c6a", bukse: "#6a4a30", lue: "#c0302c", skjegg: "#b8b8c0", krokrygg: true, stav: "lang" },
    tenar: { hud: "#e2c09e", har: "#d8d4cc", jakke: "#2f3f5f", bukse: "#2a2a30" },
    fiskar: { hud: "#d9b08e", har: "#6b4a2a", jakke: "#d9b441", bukse: "#3a3a44", hatt: "#d9b441", skjegg: "#6b4a2a" },
    mor: { hud: "#e8c0a0", frisyre: "skaut", skaut: "#6a3a7a", jakke: "#8a2638", kjole: "#3a3a44" },
    dotter: { hud: "#f0c8a8", har: "#c8a050", frisyre: "langt", jakke: "#ecebf0", kjole: "#8a2638" },
    bestefar: { hud: "#dcb898", har: "#bcbccc", frisyre: "skalle", jakke: "#d8d0b8", bukse: "#3a3a44", skjegg: "#bcbccc", strompe: "#e4e0d6", belte: true, stav: "stokk" },
  };

  /* Kjensler i manus: { s: "Presten", t: "…", kjensle: "sint" } gjeld den som talar, og
     { s: "Storebror", t: "…", kjensle: "trist", kven: "Ivar" } gjeld ein annan. Alle figurar har
     standardsettet glad, trist, sint, sjokk, tenkje og nikk. Ivar har i tillegg ivrig og les,
     huldra lokk og sky. Kjensla blir vist på figuren, og i portrettet om det finst ein variant
     (PORTRETT_KJENSLER). Ho varer til samtalen er slutt eller figuren går. */
  /* Posar i scener: { pose: "Syster", p: "knele" } set ein figur i ein pose, og p: null tek han
     bort. Posen varer til figuren går, eller til hendinga er slutt, og han går framfor kjensla.
     Knele, sitje og peike står i rad 9 til 12 i figurarket (ned, opp, venstre, høgre), så
     figuren held retninga si. Liggje og sove brukar ramma for slått ut, og sove har Zz over. */
  const POSAR = ["knele", "sitje", "peike", "liggje", "sove"];
  // Figurane blir teikna med tools/pikselkunst/figur.py til bilete/spel/figurar/<id>.png.
  // Spelet brukar arket når det er lasta, og teiknar figuren i kode til då.
  for (const id in U) U[id].id = id;

  /* ---------- Portrett i samtaleboksen ----------
     Namnet på den som talar -> fila bilete/spel/portrett/<id>.png (48 x 48). Portretta
     blir teikna person for person i tools/pikselkunst/portrett.py. */
  const PORTRETT = {
    "Ivar": "ivar", "Storebror": "storebror", "Syster": "syster", "Granne": "granne", "Budeia": "budeia",
    "Ein framand": "framande", "Den framande": "framande", "Huldra": "huldra", "Presten": "presten", "Haugbonden": "haugbonden",
    // Småroller deler fellesansikt (som dei generiske portretta i Fire Emblem).
    "Bonde": "bygd-mann", "Far": "bygd-mann", "Husmann": "bygd-mann", "Fiskar": "bygd-mann", "Kremmaren": "bygd-mann",
    "Klokkaren": "bygd-mann", "Lekpredikanten": "bygd-mann",
    "Dottera": "bygd-kvinne", "Tenestejenta": "bygd-kvinne", "Ei kvinne ved setra": "bygd-kvinne",
    "Bestefaren": "bygd-gamal-mann", "Tenaren på Ekset": "bygd-gamal-mann",
    "Gamal kone": "bygd-gamal-kone", "Mora": "bygd-gamal-kone", "Kone frå bygda": "bygd-gamal-kone",
    "Gjetarguten": "bygd-gut",
  };

  // Portrett med kjensler: bilete/spel/portrett/<id>-<kjensle>.png (laga med portrett.py).
  const PORTRETT_KJENSLER = { ivar: ["glad", "trist", "sint", "sjokk", "tenkje", "nikk", "ivrig", "les"] };

  /* ---------- Karta ---------- */
  const KART = {
    "asen-stova": {
      namn: "Stova på Åsen", stemning: "inne", golv: "P", inne: true, bakgrunn: "inne",
      // Inventaret er figurar laga med tools/pikselkunst/inventar.py. «(» er fast golv under dei.
      bygg: [{ id: "inne-grue", x: 1, y: 0, h: 2 }, { id: "inne-hylle", x: 5, y: 0, h: 1 }, { id: "inne-sengebenk", x: 9, y: 1, h: 1 }, { id: "inne-langbord", x: 2, y: 3, h: 2 }, { id: "inne-rokk", x: 9, y: 6, h: 1 }],
      rader: [
        "XXXXXXXXXXXX",
        "X(PPPPPPP((X",
        "XPPPPPPPPPPX",
        "XP((((PP@PPX",
        "XP((((PPPPKX",
        "XP%PPP1PPPPX",
        "XLPPP2PPP(PX",
        "XXXXXEXXXXXX",
      ],
      dorer: [{ ved: [5, 7], til: ["asen", "3"] }],
      kvile: "minne_far",                                              // første kvilen ved lampa
      kister: [{ ved: [10, 4], ting: "flatbrod", n: 2, id: "k-stova" }],
      folk: [
        { merke: "@", u: "bror", namn: "Storebror", atferd: "snu", retning: 2, snu: [0, 2, 3], tale: "bror" },
        { merke: "%", u: "syster", namn: "Syster", atferd: "stille", retning: 1, pose: "sitje", tale: "syster" },   // sit ved langbordet
      ],
    },
    /* Scenekart (scene: true) finst berre for ei scene: dei er ikkje med i verda, og spelet
       lagrar aldri at Ivar står der (sjå scenekart-steget i README). */
    "minne-far": {
      namn: "Bøen på Åsen", scene: true, stemning: "minne", golv: ".", bakgrunn: "tun",
      bygg: [{ id: "loe", x: 6, y: 1, h: 3 }],
      rader: [
        "################",
        "#.t...RRRRRR..t#",
        "#.....RRRRRR...#",
        "#..o..WWvDWW.o.#",
        "#........=.....#",
        "#..\"....1...\"..#",
        "#...........t..#",
        "#.o......@.....#",
        "#______________#",
        "#~~~~~~~~~~~~~~#",
        "################",
      ],
      folk: [
        { merke: "@", u: "bonde", namn: "Far", atferd: "stille", retning: 0, tale: "far" },
      ],
    },
    asen: {
      namn: "Åsen i Hovdebygda", bygg: [{ id: "stove", x: 4, y: 2, h: 3 }, { id: "loe", x: 18, y: 2, h: 3 }, { id: "stabbur", x: 17, y: 9, h: 2 }], stemning: "morgon", golv: ".", bakgrunn: "tun",
      rader: [
        "#############4##############",
        "#..o.#....t..=............o#",
        "#..#RRRRR#...=....RRRRRR...#",
        "#...RRRRR....=.t..RRRRRR...#",
        "#...WvDvW....=....WWvDWW...#",
        "#.....3.t....=.......=.....#",
        "#.....=.&....=.@.....=%....#",
        "#.....===================..#",
        "#..\".....\"..............=..#",
        "#..||||.\"........RRR....=t.#",
        "#..YYYY...\"...t..WDW....=..#",
        "#..YYYY....\"...o..=========2",
        "#..YYYY....................#",
        "#.L........................#",
        "#______..o_.____....__...._#",
        "#~~~~~~~~~~~~~~~~~~~~~~~~~~#",
        "############################",
      ],
      dorer: [
        { ved: [6, 4], til: ["asen-stova", "2"] },
        { ved: [13, 0], til: ["utmarka", "1"], kant: true, vakt: { flagg: "skiftebrev", manus: "ikkje_enno" } },
        { ved: [27, 11], til: ["bygda", "1"], kant: true, vakt: { flagg: "skiftebrev", manus: "skiftebrev" } },
      ],
      folk: [
        { merke: "@", u: "granne", namn: "Granne", atferd: "gaa", radius: 1, retning: 2, tale: "granne" },
        { merke: "%", u: "budeie", namn: "Budeia", atferd: "gaa", radius: 2, retning: 3, tale: "budeie" },
        { merke: "&", u: "framande", namn: "Ein framand", atferd: "stille", retning: 1, tale: "framande", vis: st => !st.flagg.framande1 },
      ],
      inngang: [{ merke: "3", manus: "ut_forste" }],
    },
    utmarka: {
      namn: "Utmarka", bygg: [{ id: "seter", x: 22, y: 4, h: 3 }], stemning: "kveld", golv: ",", bakgrunn: "utmark",
      fiendar: { lag: [["vette"], ["irrbloss"], ["vette", "irrbloss"], ["vette", "vette"]] },
      rader: [
        "################################",
        "#,,###,,##########~~###,####o.,#",
        "#,#,,##,#,###,,,##,~~,o,,#,##,##",
        "#,,#,,,,,,,,,,,,,,,~~,,,,,,,####",
        "###,,,,,,,,,,,.,,,,~~,RRRR,,####",
        "####,,.,,,,,,,,,,,,~~,RRRR,,,###",
        "##,#,,,hhh,,,,,,,,,~~,WWDW,,#,,#",
        "#,,,,,,hhh,,,,,,,,,~~...=...####",
        "#,,,,,..@..,o,,,,,~~,...=.%.####",
        "#,##,t.....,,,,,,,~~,...=...#,,#",
        "####,,,.=,,,,,,,,,~~,,,,=,,,o#,#",
        "###,,,,,=,,,,,,,,~~,o,,,=,,,.#,#",
        "#,,#,,.,=========QQ======,,,####",
        "#,##,,,,,,,,,,,=,~~,,,,,,,,,,###",
        "#,##,,,,\",,,,,,=,~~,,,,,,,...,##",
        "#,,,,,,,,,,,$,,=,~~,,,,,,,..!,##",
        "##,#\",,,,,,.,,,=,~~,,,,,,,...#.#",
        "###\",,,,,,t,,,,=\"~~,,,,,,,,,,###",
        "##,#\",,,,.,,,,,=,,~~,,,,,,.,#,##",
        "#,,#,,,,,,,,,,,=,,~~,,,,,,t,#,,#",
        "##,#,,,,,,,,,,,=,,~~t,,,,,\",,#,#",
        "###############1################",
      ],
      dorer: [
        { ved: [15, 21], til: ["asen", "4"], kant: true },
        { ved: [24, 6], laast: "Setra er stengd. Buskapen er ikkje komen til fjells enno." },
      ],
      kister: [{ ved: [28, 15], pengar: 48, id: "k-utmark", gøymd: true }],
      folk: [
        { merke: "@", u: "haugbonde", namn: "Vetten", atferd: "stille", retning: 0, tale: "haugbonde", vis: st => !st.flagg.haug },
        { merke: "%", u: "huldra", namn: "Ei kvinne ved setra", atferd: "snu", retning: 2, snu: [0, 2], tale: "huldra", vis: st => !st.flagg.huldra_med },
        { merke: "$", u: "gjetar", namn: "Gjetarguten", atferd: "gaa", radius: 2, retning: 3, tale: "gjetar" },
      ],
    },
    bygda: {
      namn: "Hovdebygda", bygg: [{ id: "kyrkje", x: 12, y: 3, h: 3 }, { id: "prestegard", x: 28, y: 3, h: 3 }, { id: "stove", x: 3, y: 14, h: 3 }, { id: "stove-bak", x: 34, y: 14, h: 3 }], stemning: "morgon", golv: ".", bakgrunn: "tun",
      rader: [
        "############################################",
        "#.......jjjjjjjjjjjjjjj....................#",
        "#.......j.............j....t...............#",
        "#.......j.x.rrrIrrr.x.jt....rrrrrrrrr......#",
        "#....t..j...rrrIrrr...j...t.rrrrrrrrr....t.#",
        "#....t..j.x.wVwdwVw.x.j.....wVwVdVwVw......#",
        "#.......j......3......j.........4......tt..#",
        "#......tj..x.x.=.x.x..j.........=..........#",
        "#.......jjjjjjj=jjjjjjj....t....=..........#",
        "#.............&=................=..........#",
        "#..............=................=..........#",
        "1==========================================2",
        "#=........!.........\"..............=...\"...#",
        "#=....\"................o..*.t....@oD.......#",
        "#=.RRRRR...o.........\"t...\".......RRRRRtt..#",
        "#=.RRRRR..........o$..............RRRRR....#",
        "#=.WvDvW..........................WvvWW....#",
        "#====5.............t..\"................t...#",
        "#.....................||||||...............#",
        "#.....................YYYYYY...............#",
        "#.....................YYYYYY...............#",
        "#............t.........t...................#",
        "############################################",
      ],
      dorer: [
        { ved: [0, 11], til: ["asen", "2"], kant: true },
        { ved: [43, 11], til: ["vegen", "1"], kant: true },
        { ved: [15, 5], til: ["kyrkja", "1"] },
        { ved: [32, 5], til: ["prestegarden", "1"], krev: "prest_bed", laast: "Døra til prestegarden er stengd. Innanfor høyrer du noko som dryp." },
        { ved: [5, 16], til: ["nedre-hovde", "1"] },
        { ved: [35, 13], laast: "Bakdøra til bua er stengd. Kremmaren sel frå steinen ved vegen." },
      ],
      folk: [
        { merke: "&", u: "framande", namn: "Den framande", atferd: "stille", retning: 1, tale: "framande2", vis: st => st.flagg.framande1 && !st.flagg.framande2 },
        { merke: "*", u: "kone", namn: "Gamal kone", atferd: "gaa", radius: 1, retning: 2, tale: "kone" },
        { merke: "@", u: "kremmar", namn: "Kremmaren", atferd: "stille", retning: 1, tale: "kremmar" },
        { merke: "$", u: "predikant", namn: "Lekpredikanten", atferd: "snu", retning: 0, snu: [0, 2, 3], tale: "predikant" },
        { merke: "!", u: "bonde", namn: "Bonde", atferd: "gaa", radius: 2, retning: 3, tale: "bonde" },
      ],
    },
    kyrkja: {
      namn: "Hovdekyrkja", stemning: "kyrkje", golv: "q", inne: true, fristad: true, bakgrunn: "kyrkje",
      // Inventaret (altartavle, alterring, preikestol, lysekrone) er figurar laga med tools/pikselkunst/inventar.py.
      bygg: [{ id: "inne-altartavle", x: 5, y: 0, h: 2 }, { id: "inne-altarring", x: 4, y: 2, h: 1 }, { id: "inne-preikestol", x: 1, y: 3, h: 1 }, { id: "inne-lysekrone", x: 6, y: 5, h: 1, over: true }],
      rader: [
        "GGuGGGGGGGuGG",
        "GqqqLaaaqqqqG",
        "Gqqq++%++qqqG",
        "G(qqqqlqqqqqG",
        "GeeeeeleeeeeG",
        "Gq@qqqlqqqqqG",
        "GeeeeeleeeeeG",
        "GqqqqqlqqqqqG",
        "GeeeeeleeeeeG",
        "Gqqqqq1qqqqqG",
        "GGGGGGEGGGGGG",
      ],
      dorer: [{ ved: [6, 10], til: ["bygda", "3"] }],
      folk: [
        // Presten kneler framfor altarringen og bed til blekket er borte. Etter det står han innanfor ringen.
        { merke: "p", u: "prest", namn: "Presten", atferd: "stille", retning: 1, pose: "knele", tale: "prest", vis: st => !st.flagg.latt },
        { merke: "%", u: "prest", namn: "Presten", atferd: "stille", retning: 0, tale: "prest", vis: st => !!st.flagg.latt },
        { merke: "@", u: "klokkar", namn: "Klokkaren", atferd: "snu", retning: 3, snu: [0, 1, 3], tale: "klokkar" },
      ],
    },
    prestegarden: {
      namn: "Prestegarden", stemning: "inne", golv: "P", inne: true, bakgrunn: "inne",
      // Embetsmannsheimen: mahogni, kakkelomn og golvur, ikkje grue og furu som i bondestova.
      bygg: [{ id: "inne-skatoll", x: 1, y: 0, h: 2 }, { id: "inne-golvur", x: 3, y: 0, h: 2 }, { id: "inne-spisebord", x: 6, y: 1, h: 2 },
        { id: "inne-sofa", x: 3, y: 3, h: 1 }, { id: "inne-kakkelomn", x: 1, y: 4, h: 2 }],
      rader: [
        "XXXXXXXXXXXEXX",
        "X(((PP((PPP2PX",
        "XPPPPP((PPPPPX",
        "XPP(((PPP@PPPX",
        "X(PPPPPPPPPPKX",
        "X(PPPPPPPPPPLX",
        "XPPPPP1PPPPPPX",
        "XXXXXXEXXXXXXX",
      ],
      dorer: [
        { ved: [6, 7], til: ["bygda", "4"] },
        { ved: [11, 0], til: ["kontoret", "1"] },
      ],
      kister: [{ ved: [12, 4], ting: "kaffi", n: 1, id: "k-preste" }],
      folk: [{ merke: "@", u: "tenestejente", namn: "Tenestejenta", atferd: "gaa", radius: 1, retning: 2, tale: "tenestejente" }],
    },
    kontoret: {
      namn: "Kontoret i prestegarden", stemning: "inne", golv: "P", inne: true, bakgrunn: "arkiv",
      bygg: [{ id: "inne-skrivepult", x: 3, y: 3, h: 2 }, { id: "inne-skrivepult", x: 12, y: 8, h: 2 }],
      fiendar: { alle: true, lag: [["blekkdrope", "blekkdrope"], ["blekkflekk"], ["fjorpennen"], ["blekkdrope", "fjorpennen"]] },
      rader: [
        "XXXXXXXXXXXXXXXXXXXEXX",
        "XyyyyPPPyyyyPPPyyyP2PX",
        "XPPPPPPnPPPPPPPPPPPPPX",
        "XPP((PPPPPPyyyyPPnPPPX",
        "XPP((PPnPPPPPPPPPPPPPX",
        "XPPPPPPPPPPPPPPPPPPKPX",
        "XyyyyPPPPyyyyPPPPPnPPX",
        "XPPPPPPnPPPPPPPPPPPPPX",
        "XPPnPPPPPPPP((PPPPPPPX",
        "XPPPPPPPPPPP((PPPPnPPX",
        "XyyyyPPPPyyyyPPPPPPPPX",
        "XPPP!PPPPPPPPPPPPPPPPX",
        "XPPPPPPPPP1PPPPPPPLPPX",
        "XXXXXXXXXXEXXXXXXXXXXX",
      ],
      dorer: [
        { ved: [10, 13], til: ["prestegarden", "2"] },
        { ved: [19, 0], til: ["arkivet", "1"], krevOrd: "ljos", laast: "Døra ned til arkivet står open, men det er bekmørkt der nede. Blekket et opp lyset frå lampa. Du treng eit sterkare ljos." },
      ],
      kister: [
        { ved: [19, 5], ting: "luktesalt", n: 1, id: "k-kontor" },
        { ved: [4, 11], ting: "romegraut", n: 2, id: "k-kontor-gøymd", gøymd: true },
      ],
    },
    arkivet: {
      namn: "Arkivet", stemning: "mork", golv: "g", inne: true, bakgrunn: "arkiv",
      // Kyrkjeboka ligg open på lesepulten i det innerste rommet. Opninga i hylleveggen (5) fører inn dit.
      bygg: [{ id: "inne-lesebord", x: 9, y: 3, h: 1 }],
      fiendar: { alle: true, lag: [["protokollen"], ["stempelet"], ["fjorpennen", "blekkflekk"], ["blekkdrope", "protokollen"]] },
      rader: [
        "cccccccccccccccccccc",
        "cyyyyyyygggyyyyyyyyc",
        "cgggggngggggggnggggc",
        "cgggggggg(((gggggggc",
        "cyyyggggnggggnggyyyc",
        "cggggggggggggggggggc",
        "cyyyyyyyyy5yyyyyyyyc",
        "cggggggggggggggggggc",
        "cyyyggggLggggggyyyyc",
        "cggggggngggggggggggc",
        "cgg!gggggggggnggyyyc",
        "cggggggggg1ggggggggc",
        "ccccccccccEccccccccc",
      ],
      dorer: [{ ved: [10, 12], til: ["kontoret", "2"] }],
      kister: [{ ved: [3, 10], ting: "kaffi", n: 2, id: "k-arkiv-gøymd", gøymd: true }],
      inngang: [{ merke: "5", manus: "blekklatten" }],
    },
    "nedre-hovde": {
      namn: "Stova på Nedre Hovde", stemning: "inne", golv: "P", inne: true, bakgrunn: "inne",
      bygg: [{ id: "inne-grue", x: 1, y: 0, h: 2 }, { id: "inne-hylle", x: 5, y: 0, h: 1 }, { id: "inne-sengebenk", x: 9, y: 1, h: 1 }, { id: "inne-langbord", x: 2, y: 3, h: 2 }],
      rader: [
        "XXXXXXXXXXXX",
        "X(PPPPPPP((X",
        "XPP@PPPPPPPX",
        "XP((((PP%PPX",
        "XP((((PPPPPX",
        "XPPPPPPP$PPX",
        "XPPPP1PPPPPX",
        "XXXXXEXXXXXX",
      ],
      dorer: [{ ved: [5, 7], til: ["bygda", "5"] }],
      folk: [
        { merke: "@", u: "mor", namn: "Mora", atferd: "snu", retning: 2, snu: [0, 2, 3], tale: "mor" },
        { merke: "%", u: "dotter", namn: "Dottera", atferd: "gaa", radius: 1, retning: 0, tale: "dotter" },
        { merke: "$", u: "bestefar", namn: "Bestefaren", atferd: "stille", retning: 2, tale: "bestefar" },
      ],
    },
    vegen: {
      namn: "Vegen til Ekset", stemning: "kveld", golv: ",", bakgrunn: "veg",
      fiendar: { lag: [["blekkdrope"], ["blekkdrope", "blekkdrope"], ["vette"], ["blekkflekk"]] },
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
        { ved: [0, 4], til: ["bygda", "2"], kant: true },
        { ved: [27, 11], til: ["ekset", "1"], kant: true },
      ],
      kister: [{ ved: [25, 13], ting: "kaffi", n: 1, id: "k-vegen" }],
      folk: [{ merke: "@", u: "fiskar", namn: "Fiskar", atferd: "snu", retning: 2, snu: [0, 2], tale: "fiskar" }],
    },
    ekset: {
      namn: "Ekset i Volda", bygg: [{ id: "ekset-hovud", x: 7, y: 1, h: 3 }, { id: "seter", x: 20, y: 1, h: 3 }], stemning: "morgon", golv: ".", bakgrunn: "tun",
      rader: [
        "##########################",
        "#......RRRRRR.......RRRR.#",
        "#.t....RRRRRR.......RRRR.#",
        "#......WvWDWv..t....WWDW.#",
        "#.........=...........===#",
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
        { ved: [22, 3], laast: "Trykkjeriet til lensmann Aarflot har stått stille sidan han døydde i 1817." },
      ],
      folk: [
        { merke: "@", u: "bonde", namn: "Husmann", atferd: "gaa", radius: 2, retning: 0, tale: "husmann" },
        { merke: "%", u: "kone", namn: "Kone frå bygda", atferd: "snu", retning: 1, snu: [0, 1, 3], tale: "ekset_kone" },
      ],
    },
    "ekset-stova": {
      namn: "Boksamlinga på Ekset", stemning: "inne", golv: "P", inne: true, bakgrunn: "inne",
      bygg: [{ id: "inne-bokreol-brei", x: 1, y: 1, h: 1 }, { id: "inne-bokreol-brei", x: 8, y: 1, h: 1 }, { id: "inne-bokreol", x: 1, y: 3, h: 2 },
        { id: "inne-bokreol", x: 11, y: 3, h: 2 }, { id: "inne-lesebord", x: 5, y: 3, h: 1 }, { id: "inne-stol", x: 5, y: 4, h: 1 }, { id: "inne-stol", x: 7, y: 4, h: 1 }],
      rader: [
        "XXXXXXXXXXXXXX",
        "X(((((PP(((((X",
        "XPPPPPPPPPPPPX",
        "X((PP(((PPP((X",
        "X((PP(@(PPP((X",
        "XPPPPPPPPPPPPX",
        "XPPPPPP1PPPPLX",
        "XXXXXXXEXXXXXX",
      ],
      dorer: [{ ved: [7, 7], til: ["ekset", "d"] }],
      folk: [{ merke: "@", u: "tenar", namn: "Tenaren på Ekset", atferd: "stille", retning: 1, tale: "tenar" }],
    },
  };
  // Merke som ikkje står i karta (framfor dører som fører ut att).
  const EKSTRA_MERKE = { ekset: { d: [10, 4] }, kyrkja: { p: [7, 3] } };     // p: der presten kneler, attmed løparen

  /* ---------- Verdskartet (frå kapittel 2) ---------- */
  const STADER = [];

  /* ---------- Fiendar ---------- */
  // slag: blekk, bok, vette, eld. Ord med «mot» same slag gjer ekstra verknad.
  // spesial.type: «skade» (standard) eller «rettskriv» (gjer eit ord om til dansk).
  const FIENDAR = {
    blekkdrope: { namn: "Blekkdrope", bilete: "blekkdrope", slag: "blekk", hp: 20, atk: 5, def: 1, spd: 8, xp: 5, pengar: 4, fall: [["flatbrod", 0.2]], tekst: "Ein dråpe kanselliblekk som har rent ut av eit brev. Han vil helst inn i munnen på folk." },
    blekkflekk: { namn: "Blekkflekk", bilete: "blekkflekk", slag: "blekk", hp: 38, atk: 7, def: 2, spd: 7, xp: 10, pengar: 8, fall: [["flatbrod", 0.3]], spesial: { kvar: 3, type: "rettskriv", tekst: "Blekkflekken sprutar kanselliskrift!" }, tekst: "Ein flekk som har vakse seg stor på ei side i kyrkjeboka. Han rettskriv galdrar til dansk." },
    fjorpennen: { namn: "Fjørpennen", bilete: "fjorpennen", slag: "blekk", hp: 30, atk: 9, def: 1, spd: 13, xp: 11, pengar: 9, fall: [["kaffi", 0.15]], spesial: { kvar: 2, type: "rettskriv", tekst: "Fjørpennen skrapar: «Rettelse!»" }, tekst: "Ein penn som skriv av seg sjølv. Rask, og glad i å rette på andre." },
    protokollen: { namn: "Protokollen", bilete: "protokollen", slag: "bok", hp: 64, atk: 8, def: 4, spd: 6, xp: 17, pengar: 14, fall: [["romegraut", 0.2]], spesial: { kvar: 3, alle: true, faktor: 0.8, tekst: "Protokollen les opp paragrafar for alle!" }, tekst: "Ei kyrkjebok som har fått auge. Ho les opp paragrafar til alle står stive." },
    stempelet: { namn: "Stempelet", bilete: "stempelet", slag: "blekk", hp: 52, atk: 11, def: 5, spd: 5, xp: 15, pengar: 12, spesial: { kvar: 3, faktor: 1.6, tekst: "Stempelet slår i bordet: «Approberet!»" }, tekst: "Eit embetsstempel med raud lakk. Det slår sjeldan, men hardt." },
    vette: { namn: "Namnlaus vette", bilete: "vette", slag: "vette", hp: 26, atk: 6, def: 2, spd: 9, xp: 7, pengar: 0, fall: [["flatbrod", 0.25]], tekst: "Ein vette som har gløymt namnet sitt. Utan namn blir han sur og redd." },
    irrbloss: { namn: "Irrbloss", bilete: "irrbloss", slag: "eld", hp: 20, atk: 7, def: 0, spd: 15, xp: 7, pengar: 2, tekst: "Eit lite ljos som lokkar folk ut i myra. Snø og kulde sløkkjer det." },
    haugbonden: { namn: "Haugbonden", bilete: "haugbonden", slag: "vette", hp: 130, atk: 10, def: 4, spd: 8, xp: 40, pengar: 0, spesial: { kvar: 3, alle: true, faktor: 0.9, tekst: "Haugbonden brølar: «KVEN ER EG?»" }, tekst: "Den gamle vetten i haugen. Han har budd der sidan før kyrkja vart bygd." },
    blekklatten: { namn: "Blekklatten", bilete: "blekklatten", slag: "blekk", hp: 340, atk: 12, def: 4, spd: 9, xp: 90, pengar: 60, spesial: { kvar: 2, type: "rettskriv", veksle: { kvar: 4, alle: true, faktor: 1.1, tekst: "Blekkflaum! Blekklatten skyl over heile partiet!" }, tekst: "Blekklatten: «Alt skal skrives rigtigt!»" }, tekst: "Alt blekket frå kyrkjebøkene i Hovdebygda, samla i éin klump. Det han skriv, står." },
  };

  /* ---------- Partiet ---------- */
  const PARTI = {
    ivar: { namn: "Ivar", u: "ivar", hp: 42, rost: 14, atk: 6, def: 3, spd: 10, vekst: { hp: 7, rost: 2, atk: 1.3, def: 0.8, spd: 0.4 }, evner: [] },
    huldra: { namn: "Huldra", u: "huldra", hp: 50, rost: 12, atk: 9, def: 4, spd: 12, vekst: { hp: 7, rost: 1.5, atk: 1.5, def: 0.8, spd: 0.4 }, evner: ["kulokk", "huldrelokk"] },
  };
  // Songane til huldra (ikkje ord frå ordboka)
  const EVNER = {
    kulokk: { namn: "Kulokk", rost: 4, type: "lækje", mal: "alle", kraft: 16, tekst: "Ein lokk som lækjer heile partiet." },
    huldrelokk: { namn: "Huldrelokk", rost: 3, type: "sov", mal: "ein", tekst: "Lokkar éin fiende inn i ein draum, så han mistar ein tur." },
  };

  /* ---------- Ting (pris i skilling) ---------- */
  const TING = {
    flatbrod: { namn: "Flatbrød", pris: 10, lækje: 30, tekst: "Lækjer 30 HP." },
    romegraut: { namn: "Rømmegraut", pris: 30, lækje: 80, tekst: "Lækjer 80 HP." },
    kaffi: { namn: "Kaffi", pris: 24, rost: 12, tekst: "Gir 12 røyst att." },
    luktesalt: { namn: "Luktesalt", pris: 40, vekk: 0.5, tekst: "Vekkjer ein som har falle, med halv HP." },
  };
  const NOKKELTING = {
    ordboka: { namn: "Ordboka", tekst: "Ei bok med skinnband frå den framande. På første sida står det: «Det som er skrive, står.»" },
    prestenokkel: { namn: "Nøkkelen til prestegarden", tekst: "Presten gav han til Ivar, med ei åtvaring om trolldom." },
    sagabok: { namn: "Ei gamal kongesoge", tekst: "Frå boksamlinga på Ekset. Nokre av orda liknar på dei Ivar høyrer heime. Han kan ikkje lese norrønt enno." },
  };

  /* ---------- Gåver frå kurset ---------- */
  const GAAVER = [
    { id: "tidsauga", namn: "Tidsauga", modular: ["historie-bakgrunn"], tekst: "Du får halvparten meir tid på formspørsmåla." },
    { id: "heimbygda", namn: "Heimbygda", modular: ["historie-aasen"], tekst: "Ivar får 15 ekstra HP." },
    { id: "reisestav", namn: "Reisestaven", modular: ["historie-aasen-reise"], tekst: "10 % meir røynsle etter kvar kamp." },
    { id: "oppslagsord", namn: "Oppslagsordet", modular: ["ordbok-grunnform", "ordbok-artikkel"], tekst: "Galdrane kostar éin røyst mindre." },
    { id: "smaaordring", namn: "Småordringen", modular: ["grammatikk-pronomen", "trening-smaord", "feil-smaord"], tekst: "Småorda kostar ingen røyst." },
    { id: "vaktaren", namn: "Vaktaren", modular: ["feil-bokmalsord"], tekst: "Halvparten av rettskrivingane prellar av." },
  ];

  /* ---------- Kapittelplan (vist etter kapittel 1) ---------- */
  const KAPITTEL = [
    { nr: 1, namn: "Ørsta", tid: "1826–1831", tekst: "Ivar lærer å lytte. Dei første orda og det første blekket." },
    { nr: 2, namn: "Solnør", tid: "1830-åra", tekst: "Huslærar i Skodje. Bøker, gamle tekstar og norrønt. Ivar lærer å rekonstruere rota." },
    { nr: 3, namn: "Bergen", tid: "1841", tekst: "Biskop Neumann gir oppdraget, og blekket ventar i byen." },
    { nr: 4, namn: "Reiseåra", tid: "1842–1846", tekst: "Til fots gjennom dalane. Knud Knudsen, Asbjørnsen og Moe." },
    { nr: 5, namn: "Christiania", tid: "frå 1847", tekst: "Grammatikken og ordboka. Kven er den framande, og kva vel Ivar å ta med i norma?" },
  ];

  /* ---------- Stev: dei sterkaste galdrane (prototype, sjå js/rpg/stev.js) ----------
     Det finst eit fast tal stev. Ivar lærer eit stev av nokon han møter, men
     hola i stevet må fyllast med ord han har funne sjølv. Trykktunge ord er
     merkte med ^, hol står som [holId]. «rett» er formene som rimar.
     Verknad: vern (rundar), lækjeProsent (av maks HP), skade (kraft), alle, mot. */
  const STEVGALDR = {
    steinstevet: {
      namn: "Steinstevet", kjelde: "Haugbonden", kapittel: 1,
      liner: [
        "Eg ^står her i ^stormen så ^fast som ein [stein],",
        "med ^rota i ^jorda og ^marg i kvart ^bein.",
        "Og ^kjem det eit ^mørker, så ^ber eg ein [draum]",
        "som ^renn gjennom ^natta så ^klår som ein ^straum.",
      ],
      hol: {
        stein: { ord: "stein", rett: ["stein", "stæin"], rimPaa: "bein" },
        draum: { ord: "draum", rett: ["draum"], rimPaa: "straum" },
      },
      verknad: { vern: 4, lækjeProsent: 50 },
      tekst: "Vern i fire rundar og lækjing for heile partiet.",
    },
    tungestevet: {
      namn: "Tungestevet", kjelde: "Huldra", kapittel: 2,
      liner: [
        "Det ^låg under ^tele, det ^låg i eit [minne],",
        "men ^den som vil ^lytte, kan ^grave og ^finne.",
        "Det ^bur i ei ^vogge, det ^bur på ei [tunga]",
        "og ^vaknar når ^mødrene ^syng for dei ^unga.",
      ],
      hol: {
        minne: { ord: "minne", rett: ["minne"], rimPaa: "finne" },
        tunga: { ord: "tunga", rett: ["tunga"], rimPaa: "unga" },
      },
      verknad: { skade: 75, alle: true, mot: ["blekk"] },
      tekst: "Eit stort åtak på alle fiendane, sterkast mot blekk. Hola krev nøkkelord frå kapittel 2.",
    },
  };

  /* ---------- Manus ---------- */
  const harOrd = id => st => !!st.ord[id];
  const talOrd = st => Object.keys(st.ord).length;
  /* Haugbonden (scena «haugbonde»). Vetten står framfor haugen. Med rett namn får han fargane att,
     lærer Ivar Steinstevet og går inn i haugen att. Med feil namn blir det kamp først.
     byt i forvandlinga gir han namnet og den nye utsjånaden medan biletet dekkjer kartet. */
  const HAUG_FARGAR = { forvandling: ["bilete/spel/vette3_nameless_1x.png", "bilete/spel/vette3_restored_1x.png"], byt: "Haugbonden", u: "haugbonde_namn" };
  const HAUG_UT = [
    { snu: "Haugbonden", retning: "opp" }, { vent: 300 },
    { gaa: "Haugbonden", rute: [8, 7], ut: true, fart: 520 },         // inn i haugen
  ];
  const HAUG_NAMN = [
    { ...HAUG_FARGAR, tekst: "Fargane kjem attende i vetten. Luva blir raud, og auga blir varme." },
    { s: "Haugbonden", t: "Du må ⟪høyre⟫ etter, gut. Det er heile kunsta. Eg har høyrt på folket her i tusen år.", kjensle: "glad" },
    { lytt: ["hoyra", "høyre"] },
    { s: "Haugbonden", t: "No er eg ⟪laus⟫ frå gløymska. Sauene kan gå forbi haugen att." },
    { lytt: ["laus", "laus"] },
    { flagg: "haug" },
    { s: "Haugbonden", t: "Og så skal du få eit stev. Eg har kvede det over denne haugen sidan før kyrkja vart bygd.", kjensle: "nikk" },
    { stev: "steinstevet" },
    { dersom: st => st.flagg.huldra_med && !st.flagg.huldra_auga, da: [
      { snu: "Huldra", mot: "Ivar" },
      { s: "Huldra", t: "Du gav han namnet att. Då skal du få eit ord av meg òg. Eg ser med ⟪auga⟫ det ingen andre ser.", kjensle: "lokk" },
      { tilbod: ["auga", "auga"] }, { flagg: "huldra_auga" },
    ] },
    ...HAUG_UT,
  ];
  const HAUG_FEIL = [
    { s: "Vetten", t: "NEI!", kjensle: "sint" },
    { rist: 500, styrke: 3 },
    { kamp: ["haugbonden"], boss: 1 },
    { ...HAUG_FARGAR, namn: "Haugbonden", byt: "Vetten", tekst: "Kampen ristar gløymska av han. Fargane kjem attende, og han hugsar kven han er." },
    { s: "Haugbonden", t: "Haugbonden … Det var namnet mitt. Du må ⟪høyre⟫ betre etter, gut.", kjensle: "tenkje" },
    { lytt: ["hoyra", "høyre"] }, { flagg: "haug" },
    { s: "Haugbonden", t: "Du slost godt. Eit stev skal du få likevel.", kjensle: "nikk" },
    { stev: "steinstevet" },
    ...HAUG_UT,
  ];
  const valt = (id, i) => st => st.val[id] === i;

  /* ---------- Scener ----------
     Ei scene har same mal som manuset i designdokumentet: stad og tid (vist som kort),
     kven som er med, og stega. Utfallet (ord, ting, trådar) står som steg i lista.
     hopp: true gjer scena til ein mellomsekvens som spelaren kan hoppe over (sjå README). */
  const SCENER = {
    heime: {
      namn: "Heime", stad: "Stova på Åsen", tid: "våren 1826", med: ["Ivar", "Storebror"], hopp: true,
      steg: [
        { vent: 300 },
        { snu: "Storebror", mot: "Ivar" },
        { s: "Storebror", t: "Ivar, du er vaken." },
        { gaa: "Storebror", mot: "Ivar" },
        { snu: "Ivar", mot: "Storebror" },
        { s: "Storebror", t: "Det er mykje som skal gjerast på garden no, når far er borte.", kjensle: "trist", kven: "Ivar" },
        { s: "Storebror", t: "Snakk med folk før du går. Du har alltid vore flink til å høyre etter." },
        { gaa: "Storebror", rute: "@", ikkjeVent: true },
      ],
    },
    framande: {
      namn: "Ein framand på tunet", stad: "Åsen i Hovdebygda", tid: "same morgon", kort: false, hopp: true, med: ["Ivar", "Ein framand"],
      steg: [
        { snu: "Ein framand", mot: "Ivar" },
        { s: "Ein framand", t: "God dag, unge mann." },
        { gaa: "Ein framand", mot: "Ivar", fart: 330 },
        { snu: "Ivar", mot: "Ein framand" },
        { s: "Ein framand", t: "Eg er på gjennomreise. Eg samlar på ting som elles ville gått tapt." },
        { s: "Ein framand", t: "Sommarfuglar, til dømes. Eg fester dei med ei nål, så held dei seg vakre for alltid." },
        { s: "Ein framand", t: "Du lyttar godt, ser eg. Då treng du denne. Ei tom bok. Skriv ned orda du høyrer, før dei flyg sin veg." },
        { gi: "ordboka" },
        { t: "Ivar fekk ei tom bok med skinnband. På første sida står det berre: «Det som er skrive, står.»" },
        { s: "Ein framand", t: "Vi møtest nok att. Folk som oss finn kvarandre." },
        { flagg: "framande1" },
        { saman: [
          [{ gaa: "Ein framand", rute: [13, 1], fart: 300 }, { gaa: "Ein framand", sti: "o3", fart: 300 }],
          [{ vent: 400 }, { kamera: "Ein framand", ms: 1200 }],
        ] },
        { fjern: "Ein framand" },
        { kamera: null, ms: 900 },
        { s: "Ivar", t: "Kven var det?", kjensle: "tenkje" },
        { traad: "framande", tekst: "Kven var mannen som gav Ivar ordboka?" },
        { dagbok: "Ein framand mann gav meg ei tom bok. «Det som er skrive, står», stod det. Eg veit ikkje kva han meinte." },
      ],
    },
    // Syster står opp frå bordet og gir Ivar niste. Etter hendinga sit ho att.
    syster_kake: {
      namn: "Niste", stad: "Stova på Åsen", kort: false, med: ["Ivar", "Syster"],
      steg: [
        { pose: "Syster", p: null },
        { s: "Syster", t: "Ta med deg ei ⟪kake⟫ i skreppa. Du blir svolten ute på bøen." },
        { lytt: ["kaka", "kake"] },
        { snu: "Syster", retning: "opp" },
        { vent: 450 },
        { snu: "Syster", mot: "Ivar" },
        { gi: "flatbrod", n: 1 }, { t: "Ivar fekk eit flatbrød.", kjensle: "glad" },
        { snu: "Syster", retning: "opp" },
      ],
    },
    /* Den første kampen. Syster spring ut av stova med skiftebrevet, og storebror kjem etter.
       Ivar står ved kanten mot bygda, langt frå stova, så kameraet følgjer syster bort til han.
       Etterpå går dei inn att (ut: true), og Ivar kan gå vidare sjølv. Dei finst berre i stova. */
    skiftebrev: {
      namn: "Skiftebrevet", stad: "Åsen i Hovdebygda", tid: "same dag", kort: false, hopp: true, med: ["Ivar", "Syster", "Storebror"],
      steg: [
        // Døra er i veggen, og taket dekkjer ruta hennar: den som står der, er inne enno.
        { inn: { namn: "Syster", u: "syster", rute: [6, 4], retning: "ned" } },
        { kamera: "Syster", ms: 1200 },
        { gaa: "Syster", sti: "n1", fart: 150 },
        { s: "Syster", t: "Ivar! Brevet frå sorenskrivaren, skiftebrevet etter far … det rører seg!", kjensle: "sjokk" },
        { snu: "Ivar", retning: "venstre" },
        { saman: [
          [{ gaa: "Syster", mot: "Ivar", fart: 150 }],
          [{ vent: 500 }, { inn: { namn: "Storebror", u: "bror", rute: [6, 4], retning: "ned" } }, { gaa: "Storebror", rute: [26, 10], fart: 170 }],
        ] },
        { kamera: null, ms: 500 },
        { snu: "Storebror", retning: "ned" },
        { rist: 600, styrke: 2 },
        { t: "Frå det danske brevet renn blekket ut på tunet. Det samlar seg til ein dråpe med gule auge og kryp mot Ivar.", kjensle: "sjokk" },
        { kamp: ["blekkdrope"], rettleiing: 1 },
        { s: "Syster", t: "Du sa eit ord, og blekket vart borte! Korleis gjorde du det?", kjensle: "glad" },
        { s: "Ivar", t: "Eg veit ikkje. Orda hadde liksom kraft i seg, når eg sa dei slik vi seier dei her.", kjensle: "tenkje" },
        { snu: "Storebror", mot: "Ivar" },
        { s: "Storebror", t: "Folk seier at blekket kjem frå kyrkjebøkene. Presten har bede om hjelp. Gå ned i bygda og snakk med han. Han er i kyrkja." },
        { flagg: "skiftebrev" },
        { gaa: "Storebror", rute: [6, 4], ut: true, ikkjeVent: true },
        { vent: 400 },
        { gaa: "Syster", rute: [6, 4], ut: true, ikkjeVent: true },
        { lagre: 1 },
      ],
    },
    // Eit minne om far, første gong Ivar kviler ved lampa i stova (kvile på kartet).
    minne_far: {
      namn: "Minnet om far", stad: "Bøen på Åsen", tid: "sommaren 1821", kort: false, hopp: true, med: ["Ivar", "Far"],
      steg: [
        { pose: "Ivar", p: "sitje" },
        { t: "Ivar set seg ved lampa. Ljoset flakkar, og auga glir att." },
        { scenekart: "minne-far", merke: "1", retning: "ned", ms: 1400 },
        { kort: ["Bøen på Åsen", "sommaren 1821"] },
        { s: "Far", t: "Kom hit, Ivar. Sjå utover." },
        { gaa: "Ivar", mot: "Far", fart: 380 },
        { snu: "Ivar", retning: "ned" },
        { snu: "Far", retning: "høgre" },
        { pose: "Far", p: "peike" },
        { s: "Far", t: "Neset der ute, bekken og kvar stein i åkeren. Alt har eit namn. Bestefar lærte meg dei, og no lærer eg deg dei." },
        { s: "Ivar", t: "Kven var det som fann på namna?", kjensle: "tenkje" },
        { pose: "Far", p: null },
        { snu: "Far", mot: "Ivar" },
        { s: "Far", t: "Folk som budde her før oss. Namna står ikkje i noka bok." },
        { s: "Far", t: "Men så lenge nokon seier dei, er dei ikkje borte.", kjensle: "glad" },
        { vent: 800 },
        { scenekart: null, ms: 1400 },
        { s: "Ivar", t: "Far …", kjensle: "trist" },
        { dagbok: "Ved lampa i stova kom eg til å tenkje på far. Han lærte meg namna på alle plassane rundt Åsen." },
      ],
    },
    /* Den framande i bygda, andre gongen. Han står ved kyrkjestien og viser fram sommarfuglane.
       Lekpredikanten høyrer kva han seier, og kjem opp til vegen. Etterpå går den framande austover vegen mot Ekset,
       og kameraet blir ståande til han er ute av biletet. */
    framande2: {
      namn: "Sommarfuglane", stad: "Hovdebygda", kort: false, hopp: true, med: ["Ivar", "Den framande", "Lekpredikanten", "Gamal kone"],
      steg: [
        { snu: "Ivar", mot: "Den framande" },
        { s: "Den framande", t: "Sjå her. Er dei ikkje vakre? Kvar sommarfugl har si eiga nål.", kjensle: "glad" },
        { snu: "Den framande", retning: "opp" },                       // opp mot kyrkja
        { s: "Den framande", t: "Kvar gong eit ord blir sagt, blir det litt annleis. Er ikkje det ei sorg? Eg vil at dei skal stå stille.", kjensle: "trist" },
        { snu: "Den framande", mot: "Ivar" },
        { s: "Den framande", t: "Du har skrive mykje i boka di alt. Godt. Det som er skrive, står." },
        // Lekpredikanten høyrer det og kjem opp til vegen.
        { saman: [
          [{ vent: 300 }, { gaa: "Lekpredikanten", rute: [17, 12] }, { snu: "Lekpredikanten", mot: "Den framande", kjensle: "sint", kven: "Lekpredikanten" }],
          [{ s: "Den framande", t: "Har du merka det? Orda har kraft. Men krafta held seg berre så lenge ingen kan endre dei. Den som rår over orda, rår over galdrane.", kjensle: "tenkje" }],
        ] },
        { s: "Den framande", t: "Tenk på det, Ivar. Eit mål med éi rett form for kvart ord. Då kan ingen syngje ein galdr utan lov.", kjensle: "glad" },
        { flagg: "framande2" },
        { saman: [
          [{ gaa: "Den framande", rute: [15, 11], fart: 330 }, { gaa: "Den framande", sti: "h21", fart: 220 }],
          [{ vent: 700 }, { kamera: [24, 10], ms: 2200 }, { snu: "Gamal kone", retning: "opp", kjensle: "sjokk", kven: "Gamal kone" }],
        ] },
        { fjern: "Den framande" },
        { kamera: null, ms: 900 },
        { gaa: "Lekpredikanten", rute: "$", ikkjeVent: true },
        { kjensle: "tenkje", kven: "Ivar" }, { vent: 600 },
        { dagbok: "Den framande var i bygda att. Han vil at orda skal stå stille, som sommarfuglane på nålene hans." },
      ],
    },
    /* Presten kneler framfor altarringen og står opp når Ivar kjem. Han peikar mot prestegarden,
       og klokkaren kjem bort for å høyre. Når Ivar har fått nøkkelen, kneler presten att. */
    presten: {
      namn: "Presten", stad: "Hovdekyrkja", kort: false, hopp: true, med: ["Ivar", "Presten", "Klokkaren"],
      steg: [
        { pose: "Presten", p: null },
        { snu: "Presten", mot: "Ivar" },
        { s: "Presten", t: "Ah, De maa være Ivar fra Aasen. Jeg har hørt, at De er flink til at læse." },
        { snu: "Presten", retning: "høgre" }, { pose: "Presten", p: "peike" },   // mot prestegarden
        { s: "Presten", t: "Blækket i Kirkebøgerne vil ikke holde op at skrive. Det løber ud over Siderne og ned ad Væggene i Præstegaarden." },
        { pose: "Presten", p: null }, { snu: "Presten", mot: "Ivar" },
        { saman: [
          [{ gaa: "Klokkaren", rute: [5, 5] }, { snu: "Klokkaren", retning: "opp" }],
          [{ s: "Presten", t: "Tjenestefolkene taler saa underligt stift. Jeg tør ikke gaa ned i Arkivet alene.", kjensle: "trist" }],
        ] },
        { s: "Presten", t: "Her er Nøglen. Men sig mig, min Søn: De har vel ikke med Trolddom at gjøre?", kjensle: "tenkje" },
        { val: "Kva svarer Ivar?", alt: ["Det er berre ord.", "Kanskje litt."], id: "trolldom", svar: [
          [{ s: "Presten", t: "Berre ord? Hm. Ordet er Guds Gave. Brug det vel.", kjensle: "nikk" }],
          [
            { snu: "Presten", fraa: "Ivar", kjensle: "sjokk", kven: "Klokkaren" },
            { s: "Presten", t: "Lidt? Jeg vil ikke høre mere. Men Blækket maa bort." },
            { snu: "Presten", mot: "Ivar" },
          ],
        ] },
        { gi: "prestenokkel" }, { flagg: "prest_bed" }, { t: "Ivar fekk nøkkelen til prestegarden." },
        { gaa: "Klokkaren", rute: "@", ikkjeVent: true },
        { snu: "Presten", retning: "opp" }, { pose: "Presten", p: "knele" },
      ],
    },
    /* Skammen på Nedre Hovde. Bestefaren talar for første gong sidan hausten, mora går bort
       til han, og dottera kjem etter. Feil svar: han snur ryggen til, og Ivar kan prøve att. */
    skammen: {
      namn: "Skammen", stad: "Stova på Nedre Hovde", kort: false, med: ["Ivar", "Bestefaren", "Mora", "Dottera"],
      steg: [
        { s: "Bestefaren", t: "…", kjensle: "trist" },
        { val: "Bestefaren ser ned i golvet. Kva seier Ivar?", alt: ["Fortel korleis de sa det i gamle dagar.", "Du bør snakke fint, du òg."], svar: [
          [
            { s: "Bestefaren", t: "Korleis vi sa det? Då eg var gut, sa vi at vi skulle ⟪heime⟫ før det vart mørkt.", kjensle: "tenkje" },
            { lytt: ["heim", "heime"] },
            { snu: "Dottera", mot: "Bestefaren", kjensle: "sjokk", kven: "Dottera" },
            { snu: "Mora", mot: "Bestefaren" },
            { s: "Bestefaren", t: "Heim. Vi hadde ikkje skam for det. Det var berre slik det heitte.", kjensle: "nikk" },
            { gaa: "Mora", mot: "Bestefaren" },
            { snu: "Bestefaren", mot: "Mora" },
            { s: "Mora", t: "Far … Du har rett. Det er ⟪ikkje⟫ noko skam i å tale som mor mi gjorde.", kjensle: "trist" },
            { lytt: ["ikkje", "ikkje"] },
            { gaa: "Dottera", mot: "Bestefaren", kjensle: "glad", kven: "Dottera" },
            { blink: 1 },
            { t: "Noko løyser seg i stova. Skammen lettar som tåke. Ivar kjenner seg sterkare.", kjensle: "glad" },
            { flagg: "skam_loyst" },
            { snu: "Mora", mot: "Ivar" },
            { gi: "romegraut", n: 2 }, { t: "Mora gav Ivar to skåler rømmegraut.", kjensle: "glad", kven: "Mora" },
            { gaa: "Mora", rute: "@", ikkjeVent: true },
          ],
          [
            { s: "Bestefaren", t: "…" },
            { snu: "Bestefaren", fraa: "Ivar" },
            { t: "Bestefaren snur seg mot veggen. Kanskje det var feil ting å seie.", kjensle: "trist" },
          ],
        ] },
      ],
    },
    /* Huldra ved setra. Ho står med ryggen til, så halen syner, og snur seg. Då ho seier kven ho er,
       får ho namnet sitt (byt). Ho kjenner snøen frå fjellet bak setra og slår seg i lag med Ivar:
       følgjet står der ho stod (parti med fra). Stevet blir vist sjølv om scena blir hoppa over. */
    huldra: {
      namn: "Huldra", stad: "Setra i utmarka", kort: false, hopp: true, med: ["Ivar", "Huldra"],
      steg: [
        { snu: "Ei kvinne ved setra", fraa: "Ivar" },
        { t: "Ved setra står ei kvinne med hår som kveldssol. Bak skjørtet hennar skimtar du noko som liknar ein kuhale.", kjensle: "sjokk" },
        { snu: "Ei kvinne ved setra", mot: "Ivar" },
        { s: "Ei kvinne ved setra", t: "Du går her og lyttar. Ikkje mange gjer det lenger.", kjensle: "lokk" },
        { byt: "Ei kvinne ved setra", namn: "Huldra" },
        { s: "Huldra", t: "Eg er huldra. Eg kan dei eldste orda, frå før nokon skreiv noko ned.", kjensle: "glad" },
        { snu: "Huldra", retning: "opp" },                             // mot fjellet bak setra
        { s: "Huldra", t: "Kjenner du det? Det luktar ⟪snjo⟫ i lufta, sjølv om det er vår." },
        { snu: "Huldra", mot: "Ivar" },
        { tilbod: ["snjo", "snjo"] },
        { s: "Huldra", t: "Blekket kveler alt som lever. Eg går med deg eit stykke. Men ikkje skriv ned alt eg seier.", kjensle: "trist" },
        { parti: "huldra", fra: "Huldra" }, { flagg: "huldra_med" },
        { s: "Huldra", t: "Eg kan eit stev om det gamle målet. Men to av orda i det har eg gløymt. Dei ligg djupare enn det nokon i bygda kan hugse.", kjensle: "tenkje" },
        { stev: "tungestevet" },
      ],
    },
    // Vetten ved haugen spør kven han er (sjå HAUG_NAMN og HAUG_FEIL over).
    haugbonde: {
      namn: "Haugbonden", stad: "Utmarka", kort: false, hopp: true, med: ["Ivar", "Vetten"],
      steg: [
        { snu: "Vetten", mot: "Ivar" },
        { t: "Ein gråbleik vette står framfor haugen. Mose gror på hatten hans, og auga lyser som is." },
        { rist: 400, styrke: 2 },
        { s: "Vetten", t: "KVEN … ER … EG?", kjensle: "sint" },
        { val: "Kven er vetten?", alt: ["Du er haugbonden.", "Du er nøkken.", "Du er ein tuss."], svar: [
          [{ byt: "Vetten", namn: "Haugbonden" }, { s: "Haugbonden", t: "Haugbonden … Ja. Det er meg. Eg hadde gløymt det.", kjensle: "sjokk" }, ...HAUG_NAMN],
          HAUG_FEIL,
          HAUG_FEIL,
        ] },
      ],
    },
    /* Tenaren på Ekset står ved lesebordet mellom stolane. Han hentar ei kongesoge frå hylla,
       så Ivar går til sides og slepper han ut. Etterpå går han attende til bordet. */
    tenar: {
      namn: "Boksamlinga", stad: "Boksamlinga på Ekset", kort: false, hopp: true, med: ["Ivar", "Tenaren på Ekset"],
      steg: [
        { snu: "Tenaren på Ekset", mot: "Ivar" },
        { s: "Tenaren på Ekset", t: "Lensmann Aarflot døydde i 1817, men bøkene hans står her enno. Folk frå heile Søre Sunnmøre har lånt av dei." },
        { s: "Tenaren på Ekset", t: "Den som vil ⟪vite⟫ noko, må lese. Og den som les, må vite kva han les.", kjensle: "nikk" },
        { lytt: ["vita", "vite"] },
        { gaa: "Ivar", rute: [5, 5] }, { snu: "Ivar", mot: "Tenaren på Ekset" },
        { gaa: "Tenaren på Ekset", rute: [9, 2] }, { snu: "Tenaren på Ekset", retning: "opp" }, { vent: 500 },
        { gaa: "Tenaren på Ekset", mot: "Ivar" },
        { snu: "Ivar", mot: "Tenaren på Ekset" },
        { t: "Ivar blar i ei gamal kongesoge. Mykje forstår han ikkje. Men nokre av dei gamle orda liknar på dei han høyrer heime.", kjensle: "les" },
        { gi: "sagabok" }, { t: "Ivar fekk låne ei gamal kongesoge.", kjensle: "les" },
        { gaa: "Tenaren på Ekset", rute: "@", ikkjeVent: true },
      ],
    },
    /* Blekklatten. Ivar går gjennom opninga i hylleveggen. Ein dråpe renn ut av kyrkjeboka på
       lesepulten og veks til blekklatten (eit vesen på kartet, sjå byt). Etter kampen renn han
       saman til ein dråpe og siv ned i golvet, og Ivar går bort og les i boka.
       Kapittelslutten står etter scena i manus, så han kjem sjølv om scena blir hoppa over. */
    blekklatten: {
      namn: "Blekklatten", stad: "Arkivet", kort: false, hopp: true, med: ["Ivar", "Blekklatten"],
      steg: [
        { snu: "Ivar", retning: "opp" },
        { inn: { namn: "Blekklatten", vesen: "blekkdrope", rute: [10, 4] } },
        { t: "Midt i arkivet ligg kyrkjeboka for Hovdebygda. Blekket renn ut av henne og samlar seg til ein stor, glinsande klump." },
        { rist: 700, styrke: 3 },
        { blink: 1, byt: "Blekklatten", vesen: "blekklatten" },
        { s: "Blekklatten", t: "Alt skal skrives ned. Alt skal skrives rigtigt. Hvad der ikke staar skrevet, har aldrig været til." },
        { s: "Ivar", t: "Far står skriven i den boka. Men han snakka ikkje slik. Ingen her snakkar slik!", kjensle: "sjokk" },
        { kamp: ["blekklatten"], boss: 1 },
        { flagg: "latt" },
        { blink: 1, byt: "Blekklatten", vesen: "blekkdrope" }, { vent: 500 },
        { fjern: "Blekklatten" },
        { t: "Blekklatten renn saman til ein liten dråpe og siv ned i golvsprekkene. Kyrkjeboka er stille." },
        { gaa: "Ivar", rute: [10, 4] }, { snu: "Ivar", retning: "opp" },
        { t: "På den siste sida står namnet til far, skrive med presten si hand. Ved sida av har nokon rissa inn med fin, fin skrift: «Det som er skrive, står.»" },
        { s: "Ivar", t: "Det same som i boka mi …", kjensle: "les" },
        { dagbok: "I kyrkjeboka stod namnet til far. Ved sida av hadde nokon skrive: «Det som er skrive, står.» Same ord som i boka mi." },
      ],
    },
  };

  const MANUS = {
    start: [
      { fort: [
        "For lenge sidan hadde Noreg sitt eige skriftmål. Etter Svartedauden gjekk det i knas, og bitane hamna i talen til folk i bygdene.",
        "I fleire hundre år skreiv kanselliet i København for landet. Kanselliet forsvann med 1814, men blekket slutta ikkje å skrive.",
        "No skriv det av seg sjølv, i kyrkjebøker, tingbøker og lovtekstar. Der det breier seg, blir talen til folk stiv og framand.",
        "Hovdebygda i Ørsta, våren 1826. Ivar Aasen er tretten år. Mor døydde då han var tre. I vinter døydde far.",
      ] },
      { scene: "heime" },
    ],
    bror: [{ dersom: harOrd("stein"), da: [
      { s: "Storebror", t: "Folk seier det er blekk i kyrkjebøkene nede i bygda. Eg skjønar meg ikkje på slikt.", kjensle: "tenkje" },
    ], elles: [
      { s: "Storebror", t: "Den store ⟪steinen⟫ midt i åkeren må vekk før vi pløyer. Far fekk han aldri flytt." },
      { lytt: ["stein", "stein"] },
    ] }],
    syster: [{ dersom: harOrd("kaka"), da: [
      { s: "Syster", t: "Pass deg for folk som snakkar som bøker, Ivar." },
    ], elles: [{ scene: "syster_kake" }] }],
    granne: [{ dersom: harOrd("kvat"), da: [
      { s: "Granne", t: "Du ser på folk som om du ville skrive dei ned, gut." },
    ], elles: [
      { s: "Granne", t: "⟪Ka⟫ er det du glaner etter? Du ser ut som du høyrer etter noko.", kjensle: "tenkje" },
      { lytt: ["kvat", "ka"] },
    ] }],
    budeie: [{ dersom: harOrd("mjolk"), da: [
      { s: "Budeia", t: "Kyrne er urolege. Dei kjenner blekket, trur eg.", kjensle: "trist" },
    ], elles: [
      { s: "Budeia", t: "Drikk litt ⟪mjølk⟫ før du går. Ho gir kraft både til folk og fe." },
      { lytt: ["mjolk", "mjølk"] },
    ] }],
    far: [{ s: "Far", t: "Sjå utover, Ivar." }],                     // berre i minnet (scenekartet minne-far)
    // Rettleiinga står etter scena, så ho kjem sjølv om mellomsekvensen blir hoppa over.
    framande: [{ scene: "framande" }, { t: "Ordboka ligg i menyen (X eller Esc). Der ser du orda du har høyrt, formene deira og kven som sa dei." }],
    // Vakta ved kantane: Ivar står på kantruta og snur attende eitt steg.
    ikkje_enno: [{ t: "Ivar vil sjå seg om på tunet og i stova først. Kanskje nokon har noko å seie." }, { gaa: "Ivar", sti: "n1" }],
    skiftebrev: [{ dersom: st => talOrd(st) >= 3, da: [{ scene: "skiftebrev" }], elles: [
      { t: "Ivar kjenner at han ikkje er ferdig på tunet enno. Han har berre høyrt nokre få ord." },
      { t: "Snakk med folk. Når nokon seier eit ord på sitt eige mål, lyttar Ivar." },
      { gaa: "Ivar", sti: "v1" },
    ] }],
    /* Hovdebygda */
    bonde: [{ dersom: harOrd("eg"), da: [
      { s: "Bonde", t: "Presten er ein god mann. Men når han snakkar, kjenner eg meg dum.", kjensle: "trist" },
    ], elles: [
      { s: "Bonde", t: "Jeg … altså … Presten seier vi skal tale ordentleg, som det står i bøkene.", kjensle: "tenkje" },
      { s: "Bonde", t: "⟪E⟫ veit ikkje lenger korleis eg skal seie det. Det kjennest som om munnen min er full av blekk.", kjensle: "trist" },
      { lytt: ["eg", "e"] },
    ] }],
    kone: [{ dersom: harOrd("draum"), da: [
      { s: "Gamal kone", t: "Spør vetten kven han er, og gi han det rette svaret. Det er haugbonden, veit du.", kjensle: "nikk" },
    ], elles: [
      { s: "Gamal kone", t: "I natt hadde eg ein ⟪draum⟫ om haugen oppe i utmarka.", kjensle: "tenkje" },
      { lytt: ["draum", "draum"] },
      { snu: "Gamal kone", retning: "venstre" },                     // ser bort mot Åsen og utmarka
      { s: "Gamal kone", t: "Den gamle haugbonden har gløymt namnet sitt. Og når ein vette gløymer namnet sitt, blir han vond.", kjensle: "trist" },
      { flagg: "hint_haugbonde" },
    ] }],
    kremmar: [
      { dersom: harOrd("mat"), da: [], elles: [
        { s: "Kremmaren", t: "Treng du ⟪mat⟫ til vegen? Eg har flatbrød, graut og kaffi frå byen.", kjensle: "glad" },
        { lytt: ["mat", "mat"] },
      ] },
      { dersom: st => st.ord.kaka && !st.ord.kaka.former.kaka, da: [
        { s: "Kremmaren", t: "Og ⟪kaka⟫ er fersk i dag. Kake, kaka, same kva du kallar ho.", kjensle: "nikk" },
        { lytt: ["kaka", "kaka"] },
      ] },
      { butikk: ["flatbrod", "romegraut", "kaffi", "luktesalt"] },
    ],
    // Lekpredikanten talar ut mot vegen, og så til Ivar.
    predikant: [{ dersom: harOrd("ljos"), da: [
      { s: "Lekpredikanten", t: "Eg er ingen prest, berre ein bonde som talar. Men det var Hauge òg.", kjensle: "nikk" },
    ], elles: [
      { snu: "Lekpredikanten", retning: "opp" },
      { s: "Lekpredikanten", t: "Høyr her, folk! Guds ord toler å bli sagt på vårt eige mål!" },
      { s: "Lekpredikanten", t: "Johannes skriv at i opphavet var Ordet. Og på pinsedagen høyrde kvar mann bodskapen på sitt eige mål.", kjensle: "glad" },
      { snu: "Lekpredikanten", mot: "Ivar" }, { pose: "Lekpredikanten", p: "peike" },
      { s: "Lekpredikanten", t: "Du der, gut. Du lyttar betre enn dei fleste. Gå med ⟪ljos⟫. Det mørke blekket toler ikkje ljoset." },
      { lytt: ["ljos", "ljos"] },
    ] }],
    framande2: [{ scene: "framande2" }],
    /* Nedre Hovde: skammen */
    mor: [{ dersom: st => st.flagg.skam_loyst, da: [
      { s: "Mora", t: "Det er godt å høyre far snakke att. Takk, Ivar.", kjensle: "glad" },
    ], elles: [
      { s: "Mora", t: "Goddag. Vi … vi taler ikke saadan her i huset.", kjensle: "sjokk" },
      { snu: "Mora", fraa: "Ivar" },
      { s: "Mora", t: "Presten sa at ungane må lære å tale rett. Så no talar vi rett. Alle saman.", kjensle: "trist" },
    ] }],
    dotter: [{ dersom: st => st.flagg.skam_loyst, da: [
      { s: "Dottera", t: "Bestefar fortel om gamle dagar no. Han hugsar så mange ord!", kjensle: "glad" },
    ], elles: [
      { s: "Dottera", t: "Mor seier vi må snakke fint, som presten. Elles blir vi til narr.", kjensle: "trist" },
      { snu: "Dottera", mot: "Bestefaren" },
      { s: "Dottera", t: "Bestefar har ikkje sagt eit ord sidan hausten. Kanskje han ikkje veit korleis ein talar fint.", kjensle: "tenkje" },
    ] }],
    bestefar: [{ dersom: st => st.flagg.skam_loyst, da: [
      { s: "Bestefaren", t: "Eg hadde nær gløymt korleis det kjendest å seie det rett ut.", kjensle: "glad" },
    ], elles: [{ scene: "skammen" }] }],
    /* Kyrkja */
    prest: [{ dersom: st => st.flagg.latt, da: [
      { s: "Presten", t: "Kirkebøgerne er stille igjen. De har gjort Sognet en stor Tjeneste, Ivar.", kjensle: "glad" },
    ], elles: [{ dersom: st => st.flagg.prest_bed, da: [
      // Presten står opp frå bøna, talar, og kneler att ved altarringen.
      { pose: "Presten", p: null }, { snu: "Presten", mot: "Ivar" },
      { s: "Presten", t: "Gud være med Dem i Arkivet. Døren er i Kontoret, bag Tjenestepigen." },
      { snu: "Presten", retning: "opp" }, { pose: "Presten", p: "knele" },
    ], elles: [{ scene: "presten" }] }] }],
    klokkar: [{ dersom: harOrd("bok"), da: [
      { s: "Klokkaren", t: "Lysestaken ved altaret brenn alltid. Her inne har blekket ingen makt.", kjensle: "glad" },
    ], elles: [
      { s: "Klokkaren", t: "Sidan 1736 har alle måtta lese for presten før dei vart konfirmerte. Difor kan folk her lese, sjølv om det er på dansk." },
      { s: "Klokkaren", t: "Ei ⟪bok⟫ er ei bok, same kva mål ho er skriven på. Det har eg alltid sagt.", kjensle: "nikk" },
      { lytt: ["bok", "bok"] },
      { s: "Klokkaren", t: "Kyrkja er ein fristad. Blekket kjem ikkje inn her. Syng med oss ved lysestaken når du er trøytt.", kjensle: "glad" },
    ] }],
    tenestejente: [{ dersom: st => st.flagg.latt, da: [
      { s: "Tenestejenta", t: "Eg kan snakke som eg vil att! Det var som å ha blekk i munnen.", kjensle: "glad" },
    ], elles: [
      { s: "Tenestejenta", t: "Hr. Pastoren er ikke hjemme. Arkivet er … eg meiner … det er noko som søl der inne.", kjensle: "sjokk" },
      { snu: "Tenestejenta", retning: "opp" },                       // mot døra til kontoret
      { s: "Tenestejenta", t: "Døra er bak kontoret. Pass deg for pennane. Dei rettar på alt ein seier.", kjensle: "trist" },
    ] }],
    /* Utmarka */
    gjetar: [
      { dersom: harOrd("kven"), da: [], elles: [
        { s: "Gjetarguten", t: "⟪Kem⟫ er du? Eg har aldri sett deg her oppe før.", kjensle: "sjokk" },
        { lytt: ["kven", "kem"] },
      ] },
      { dersom: harOrd("kvar"), da: [
        { s: "Gjetarguten", t: "Prøv å spørje «kor» sjølv, i menyen under Galdr. Då finn du kanskje det som er gøymt.", kjensle: "nikk" },
      ], elles: [
        { snu: "Gjetarguten", retning: "opp" },                       // opp mot haugen
        { s: "Gjetarguten", t: "⟪Kor⟫ har sauene blitt av? Dei vil ikkje gå forbi haugen lenger.", kjensle: "trist" },
        { lytt: ["kvar", "kor"] },
        { snu: "Gjetarguten", mot: "Ivar" },
        { s: "Gjetarguten", t: "Bestefar sa at den som spør «kor», finn det som er gøymt. Eg har aldri funne noko." },
      ] },
    ],
    huldra: [{ scene: "huldra" }],
    haugbonde: [{ scene: "haugbonde" }],
    /* Vegen og Ekset */
    fiskar: [{ dersom: harOrd("berre"), da: [
      { snu: "Fiskar", retning: "venstre" },                         // ut mot elva
      { s: "Fiskar", t: "Blekket kjem ned elva frå bygda. Det er ikkje rett.", kjensle: "trist" },
    ], elles: [
      { s: "Fiskar", t: "Det er ⟪bære⟫ blekk i garnet mitt no! Ikkje ein einaste fisk.", kjensle: "sint" },
      { lytt: ["berre", "bære"] },
    ] }],
    // Husmannen snur seg mot trykkjeriet (aust for tunet), kona ved vatnet mot hovudhuset.
    husmann: [{ dersom: harOrd("gata"), da: [
      { snu: "Husmann", retning: "høgre" },
      { s: "Husmann", t: "Lensmann Aarflot trykte aviser og bøker her. No er det stilt.", kjensle: "trist" },
    ], elles: [
      { s: "Husmann", t: "Kyrne går heim langs ⟪gata⟫ mellom gjerda. Men i dag ville dei ikkje. Det er blekk på vegen.", kjensle: "sint" },
      { lytt: ["gata", "gata"] },
    ] }],
    ekset_kone: [
      { snu: "Kone frå bygda", retning: "opp" },
      { s: "Kone frå bygda", t: "Boksamlinga på Ekset står open for den som vil lese. Aarflot ville at bøndene skulle lære.", kjensle: "nikk" },
    ],
    tenar: [{ dersom: harOrd("vita"), da: [
      { s: "Tenaren på Ekset", t: "Kom att når du vil. Bøkene går ingen stad.", kjensle: "glad" },
    ], elles: [{ scene: "tenar" }] }],
    /* Arkivet: kapittelslutten kjem etter scena */
    blekklatten: [{ dersom: st => st.flagg.latt, da: [], elles: [{ scene: "blekklatten" }, { kapittelslutt: 1 }] }],
  };

  // Første gong Ivar går ut, kjem den framande bort til han.
  MANUS.ut_forste = [{ dersom: st => !st.flagg.framande1, da: MANUS.framande }];

  return { FAMILIAR, ORD, U, KART, EKSTRA_MERKE, STADER, FIENDAR, PARTI, EVNER, TING, NOKKELTING, GAAVER, KAPITTEL, STEVGALDR, PORTRETT, PORTRETT_KJENSLER, POSAR, SCENER, MANUS, valt };
})();
