/* Lærarinnhald for Del 1 · Språkhistorie (første halvdel): bakgrunnen før 1850,
   Ivar Aasen, reisene til Aasen og språkstriden. Formatet står i larer/README.md. */

Larar.register("historie-bakgrunn", {
  tittelnotat: "Mange elevar trur at nynorsk og bokmål alltid har funnist, eller at nynorsk er ein dialekt. Start med å slå fast at i fleire hundre år skreiv ingen i Noreg norsk i det heile: dei skreiv dansk. Det er utgangspunktet for heile Del 1.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>finne ut kvifor folk i Noreg <strong>skreiv dansk</strong></li>
        <li>skilje mellom <strong>skriftspråk</strong> og <strong>talemål</strong></li>
        <li>forstå kvifor <strong>1814</strong> gjorde språket til eit spørsmål</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Sei at dette er bakgrunnen for alt som kjem i Del 1: utan å vite kvifor Noreg skreiv dansk, gir verken Ivar Aasen eller språkstriden meining.",
    },
    {
      type: "diskuter",
      title: "Skriv du slik du snakkar?",
      prompt: `<p>Tenk på dialekta di.</p>
        <p>Kva ord seier du på ein måte, men skriv på ein annan?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Lat elevane kome med døme frå eigen dialekt og skriv nokre på tavla. Uttale som <em>æ</em> eller <em>i</em> for eg, eller ulike former av ikkje, fungerer godt. Poenget er at alle alt lever med ein avstand mellom tale og skrift. Seinare i timen ser vi at denne avstanden var mykje større før 1850, fordi skriftspråket var eit anna språk.",
    },
    {
      title: "1380: union med Danmark",
      steps: [
        "<p class=\"stor\">Noreg og Danmark i union i <strong>over 400 år</strong></p>",
        "<p class=\"stor\">Det gamalnorske skriftspråket <strong>forsvann</strong></p>",
        "<p class=\"stor\">Embetsmenn, prestar og forfattarar skreiv <strong>dansk</strong></p>",
        "<p class=\"stor\">Og i skulen lærte ein <strong>dansk</strong></p>",
      ],
      notes: "Rekn saman med klassen: frå 1380 til 1814 er over 400 år, altså mange generasjonar. Mange elevar trur at Danmark «forbaud» norsk. Det står ikkje i modulen, og det er heller ikkje poenget: dansk vart skriftspråket fordi det var språket til makta, kyrkja og skulen, og det gamle norske skriftspråket gjekk ut av bruk.",
    },
    {
      title: "To språk i same land",
      body: `<div class="to-kol">
          <div class="boks"><h3>Skriftspråket</h3><p class="stor">dansk</p><p>i bøker, lover, kyrkje og skule</p></div>
          <div class="boks"><h3>Talemålet</h3><p class="stor">norske dialektar</p><p>i heimen, på garden, på sjøen</p></div>
        </div>`,
      steps: ["<p class=\"midt\">Folk <strong>snakka</strong> norsk, men <strong>skreiv</strong> dansk.</p>"],
      notes: "Dette er det viktigaste lysbiletet i timen. Modulen nemner ein bonde på Vestlandet, ein fiskar i Nord-Noreg og ein handverkar på Austlandet: dei snakka kvar sin norske dialekt, sjølv om dei skreiv dansk, om dei skreiv i det heile. Spør: kva ville det bety for deg å lære å skrive på eit språk du ikkje snakkar?",
    },
    {
      type: "sporsmal",
      question: "Ein fiskar i Nord-Noreg i 1780. Kva språk <strong>snakka</strong> han?",
      options: ["Dansk", "Ein norsk dialekt", "Gamalnorsk", "Svensk"],
      correct: 1,
      explain: "Talemålet heldt fram med å vere norsk heile unionstida. Det var berre skriftspråket som var dansk.",
      notes: "Mange elevar vel dansk, fordi dei blandar saman skrift og tale. Spør då: kva skreiv han, og kva snakka han? Fleire kjem kanskje til å svare gamalnorsk. Forklar at dialektane hadde utvikla seg vidare frå gamalnorsk, slik alle språk endrar seg.",
    },
    {
      title: "Embetsmannsspråket",
      steps: [
        "<p class=\"stor\">I byane: embetsmenn og borgarskap</p>",
        "<p class=\"stor\">Talemål tett på <strong>dansk skrift</strong></p>",
        "<p class=\"stor\">… men med <strong>norsk tonefall</strong></p>",
        "<p class=\"kjempe midt\">= dansk-norsk</p>",
      ],
      notes: "Embetsmannsspråket blir viktig i modulen om språkstriden: det var dette danna talemålet i byane Knud Knudsen seinare ville føre skrifta nærare. Knyt gjerne til i dag: spør om elevane kjenner folk som «snakkar som det står skrive», og kva det seier om kven som hadde makt over språket.",
    },
    {
      type: "sporsmal",
      question: "Kva er <em class=\"nn\">embetsmannsspråket</em>?",
      options: [
        "Gamalnorsk slik det vart skrive i mellomalderen",
        "Dansk skrift uttala med norsk tonefall",
        "Dialekta til bøndene på Austlandet",
        "Det første norske skriftspråket",
      ],
      correct: 1,
      explain: "Embetsmenn og borgarskap i byane snakka eit språk som låg nær dansk skrift, men med norsk uttale. Det blir kalla dansk-norsk eller embetsmannsspråket.",
      notes: "Lat elevane svare med fingrane: ein til fire. Dei som vel C, har kanskje festa seg ved ordet «embete» og tenkt på bygda. Spør: kvar budde embetsmennene?",
    },
    {
      type: "bilete",
      title: "1814",
      src: "bilete/eidsvoll-1814.jpg",
      alt: "Måleri av riksforsamlinga på Eidsvoll i 1814, mange menn i ein stor sal",
      caption: "Riksforsamlinga på Eidsvoll. Måleri av Oscar Wergeland, 1885 (offentleg eigedom).",
      body: "<p class=\"stor\">Eiga grunnlov.<br>Eige storting.</p>",
      steps: ["<p class=\"stor\">Skriftspråket? <strong>Framleis dansk.</strong></p>"],
      notes: "Mange elevar kjenner biletet frå samfunnsfag. Spør kva som skjedde i 1814 før du trykkjer vidare. Legg merke til at måleriet er frå 1885, over 70 år etter hendinga: det er ei framstilling, ikkje eit fotografi. Det same året, 1885, vart landsmålet jamstilt, som vi kjem til seinare.",
    },
    {
      title: "Ein ny situasjon",
      steps: [
        "<p class=\"stor\">Noreg blir løyst frå Danmark</p>",
        "<p class=\"stor\">… og går i union med <strong>Sverige</strong></p>",
        "<p class=\"stor\">Eiga grunnlov og eige storting</p>",
        "<p class=\"stor merk\">Kan eit fritt land ha eit anna lands språk som sitt einaste skriftspråk?</p>",
      ],
      notes: "Ei vanleg misoppfatning er at Noreg vart heilt sjølvstendig i 1814. Modulen seier at Noreg gjekk i union med Sverige. Poenget her er spørsmålet på slutten: det er dette som set i gang språkdebatten. Les det høgt og la det henge att til neste lysbilete.",
    },
    {
      type: "diskuter",
      title: "Halde på dansk eller lage noko nytt?",
      prompt: `<div class="to-kol">
          <div class="boks"><h3>Halde på dansk</h3><p>Kva talar for det?</p></div>
          <div class="boks"><h3>Nytt norsk skriftspråk</h3><p>Kva talar for det?</p></div>
        </div>`,
      form: "Grupper på tre",
      tid: 4,
      svar: "For dansk: alle bøker og lover var alt skrivne på dansk, og det ville vere upraktisk å byte. For norsk: det er lettare å lære å lese og skrive når skriftspråket liknar på det ein snakkar.",
      notes: "Lat halve klassen finne argument for kvar side, og ta ein kort runde etterpå. Argumenta i svaret er dei same som i leseoppgåva i modulen, så elevane har nytte av samtalen når dei arbeider sjølve. Hald fram at begge sider hadde gode grunnar: dei som ville halde på dansk, var ikkje nødvendigvis mot Noreg.",
    },
    {
      type: "sitat",
      title: "Tenk deg …",
      text: "Når du byrjar på skulen, lærer du å lese og skrive på dansk. Læraren rettar deg når du skriv slik du snakkar.",
      kjelde: "Frå leseoppgåva i modulen, om ein elev i Noreg rundt 1830",
      notes: "Les sitatet høgt, sakte. Spør: korleis ville det kjennast? Knyt til elevar som har eit anna morsmål enn norsk: mange av dei kjenner denne situasjonen frå sin eigen kvardag, men vent med å peike nokon ut. La dei som vil, fortelje.",
    },
    {
      type: "sporsmal",
      question: "Kva skjedde <strong>ikkje</strong> i 1814?",
      options: [
        "Noreg fekk eiga grunnlov",
        "Noreg fekk eige storting",
        "Noreg gjekk i union med Sverige",
        "Noreg fekk eit norsk skriftspråk",
      ],
      correct: 3,
      explain: "Skriftspråket var framleis dansk. Det første arbeidet med eit norsk skriftspråk kom først fleire tiår seinare.",
      notes: "Spørsmålet er vrangvendt med vilje: les det høgt og legg trykk på «ikkje». Dei som vel C, trur ofte at Noreg vart heilt fritt i 1814.",
    },
    {
      title: "Vegen vidare",
      body: `<ol class="tidslinje">
          <li><span class="aar">1380</span><span class="hend">Noreg går i union med Danmark. Dansk blir etter kvart det einaste skriftspråket.</span></li>
          <li><span class="aar">1814</span><span class="hend">Eiga grunnlov og eige storting. Kan eit fritt land ha eit anna lands skriftspråk?</span></li>
          <li><span class="aar">1836</span><span class="hend">Ivar Aasen, 22 år gamal, skriv planen om eit norsk skriftspråk bygd på dialektane.</span></li>
          <li><span class="aar">1848–1850</span><span class="hend">Aasen gjev ut grammatikk og ordbok over «det norske Folkesprog».</span></li>
          <li><span class="aar">1885</span><span class="hend">Stortinget jamstiller landsmål og det dansk-norske skriftspråket.</span></li>
          <li><span class="aar">1929</span><span class="hend">Namna blir nynorsk og bokmål.</span></li>
          <li><span class="aar">1981</span><span class="hend">Samnorskpolitikken blir oppgitt. Dei to skriftspråka utviklar seg kvar for seg.</span></li>
          <li><span class="aar">2022</span><span class="hend">Ny språklov: bokmål og nynorsk er likeverdige skriftspråk.</span></li>
        </ol>`,
      notes: "Dette er same tidslinje som står i modulen. I dag har vi berre sett på dei to første punkta. Peik på 1836: Ivar Aasen var 22 år, altså ikkje så mykje eldre enn elevane. Det er ein fin overgang til neste modul. Elevane treng ikkje hugse alle årstala no: dei kjem att i dei neste modulane.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les fagteksten og sjå på tidslinja.</li>
          <li>Gjer fleirvalsoppgåvene og para saman omgrepa.</li>
          <li>Les «Les og tenk over» og svar på spørsmåla.</li>
          <li>Skriv refleksjonen til slutt: 80 til 150 ord på nynorsk.</li>
        </ul>`,
      tid: 20,
      notes: "Gå rundt og les refleksjonane undervegs. Sjekklista i modulen krev at eleven nemner unionen og skilnaden mellom skriftspråk og talemål. Mange skriv berre årstal: spør «kvifor vart det viktig?» for å få dei til å forklare samanhengen. Dei som blir tidleg ferdige, kan byrje på modulen om Ivar Aasen.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">I over 400 år var <strong>dansk</strong> skriftspråket i Noreg.</p>",
        "<p class=\"stor\">Folk <strong>snakka</strong> norske dialektar heile tida.</p>",
        "<p class=\"stor\">I byane voks <strong>dansk-norsk</strong> fram.</p>",
        "<p class=\"stor\">Etter <strong>1814</strong>: burde eit fritt land ha sitt eige skriftspråk?</p>",
      ],
      notes: "Be elevane forklare skilnaden på skriftspråk og talemål til sidemannen med éi setning kvar før du viser steg to.",
    },
    {
      type: "diskuter",
      title: "Exit-lapp",
      prompt: "<p class=\"stor\">Kvifor skreiv folk i Noreg dansk?</p><p>Svar med éi setning på nynorsk.</p>",
      form: "Kvar for seg, på ein lapp",
      tid: 2,
      notes: "Samle inn lappane i døra. Sjå særleg etter om elevane skil mellom skrift og tale, og om nokon skriv at danskane forbaud norsk. Ta det opp att i starten av neste time.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen legg grunnlaget for heile Del 1: i over 400 år, frå unionen med Danmark i 1380 til 1814, var dansk det einaste skriftspråket i Noreg, medan folk snakka norske dialektar. I byane voks det fram eit dansk-norsk embetsmannsspråk. Etter 1814 byrja mange å spørje om eit fritt land kunne ha eit anna lands språk som sitt einaste skriftspråk. Utan denne bakgrunnen gir arbeidet til Ivar Aasen og språkstriden lite meining.</p>",
    mal: [
      "Elevane kan forklare kvifor dansk var skriftspråket i Noreg fram til midten av 1800-talet.",
      "Elevane kan skilje mellom skriftspråk og talemål, og forklare at talemålet heile tida var norsk.",
      "Elevane kan forklare kva embetsmannsspråket eller dansk-norsk var.",
      "Elevane kan gjere greie for kvifor språkspørsmålet vart viktig etter 1814.",
    ],
    lareplan: [15, 16, 10],
    forkunnskapar: "Ingen særlege. Det hjelper om elevane kjenner 1814 frå samfunnsfag, og at dei har tenkt litt over si eiga dialekt.",
    forebuing: [
      "Test presentasjonen på tavla, særleg biletet på lysbilete 9 og tidslinja på lysbilete 14.",
      "Tenk ut nokre døme frå dialekta på staden der du underviser, til samtalen på lysbilete 3.",
      "Ha lappar klare til exit-lappen til slutt.",
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane samanlikne sitt eige talemål med skriftspråket.</p>", lysbilete: "2 og 3" },
      { fase: "Unionstida", min: 7, gjer: "<p>Forklar unionen, skilnaden mellom skrift og tale og embetsmannsspråket. Ta dei to spørsmåla med heile klassen.</p>", lysbilete: "4 til 8" },
      { fase: "1814", min: 9, gjer: "<p>Vis biletet frå Eidsvoll, gå gjennom den nye situasjonen og la gruppene finne argument for og mot å halde på dansk. Les sitatet og ta kontrollspørsmålet.</p>", lysbilete: "9 til 13" },
      { fase: "Vegen vidare", min: 2, gjer: "<p>Vis tidslinja og peik fram mot Ivar Aasen i neste modul.</p>", lysbilete: "14" },
      { fase: "Eigenarbeid", min: 20, gjer: "<p>Elevane arbeider i modulen og skriv refleksjonen til slutt.</p>", lysbilete: "15" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive exit-lappen.</p>", lysbilete: "16 og 17" },
    ],
    misoppfatningar: [
      { feil: "«Folk i Noreg snakka dansk før 1814.»", hjelp: "Skil mellom skrift og tale. Talemålet var heile tida norske dialektar. Det var berre skriftspråket som var dansk, og i byane eit dansk-norsk talemål blant embetsmenn og borgarskap." },
      { feil: "«Danskane forbaud norsk.»", hjelp: "Modulen seier at det gamalnorske skriftspråket forsvann i løpet av unionstida, og at dansk vart språket i skulen, kyrkja og forvaltninga. Hald fast ved det, og unngå å gjere historia til ei forteljing om forbod." },
      { feil: "«I 1814 vart Noreg heilt fritt og fekk sitt eige språk.»", hjelp: "Noreg fekk eiga grunnlov og eige storting, men gjekk i union med Sverige, og skriftspråket var framleis dansk. Nettopp difor vart språket eit spørsmål." },
      { feil: "«Nynorsk er eldre enn bokmål» eller «bokmål er eldre enn nynorsk».", hjelp: "Ingen av dei fanst før 1850. Begge voks fram som svar på det same problemet: eit fritt land med dansk skriftspråk." },
    ],
    samtale: [
      "Kva hadde det betydd for deg å lære å skrive på eit språk som ikkje liknar det du snakkar?",
      "Kvifor trur du det gamalnorske skriftspråket forsvann, sjølv om folk heldt fram med å snakke norsk?",
      "Kven hadde fordel av at skriftspråket var dansk, og kven hadde ulempe av det?",
      "Finst det i dag situasjonar der folk må skrive på eit anna språk enn det dei snakkar?",
    ],
    tilpassing: {
      stotte: [
        "Teikn to kolonnar på tavla, skrift og tale, og la elevane sortere omgrepa frå timen inn i dei.",
        "La elevane skrive refleksjonen med sjekklista frå modulen som ramme, gjerne med setningsstartarar som «Fordi …» og «Etter 1814 …».",
        "Gi elevar som strevar med nynorsk lov til å skrive refleksjonen munnleg eller i kortare form.",
      ],
      utfordring: [
        "Be elevane finne ut kva språk som var skriftspråk i eit anna land som har vore under eit anna rike, og samanlikne med Noreg.",
        "La elevane skrive refleksjonen som eit innlegg frå 1830, der dei argumenterer for eller mot eit nytt norsk skriftspråk.",
      ],
    },
    vurdering: [
      "Spørsmåla på tavla og exit-lappen viser om elevane skil mellom skriftspråk og talemål.",
      "Refleksjonsteksten i modulen viser om eleven kan forklare samanhengen mellom 1814 og språkspørsmålet, ikkje berre ramse opp årstal.",
      "Kjenneteikn på god måloppnåing: eleven forklarar med eigne ord kvifor dansk var skriftspråket, nemner embetsmannsspråket og viser kvifor sjølvstendet i 1814 gjorde språket til eit politisk spørsmål.",
    ],
    vidare: "Gå vidare til modulen Ivar Aasen og landsmålet, som viser korleis Aasen svarte på spørsmålet frå 1814. Tidslinja frå denne modulen kjem att i skrivemodulen til slutt i Del 1.",
  },
});

Larar.register("historie-aasen", {
  tittelnotat: "Ivar Aasen er ein god inngang for elevane fordi han var ung, fattig og sjølvlærd. Legg vekt på metoden hans: han valde ikkje éi dialekt, men leita etter det dialektane hadde felles. Det er det viktigaste elevane skal ta med seg frå timen.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>bli kjende med <strong>Ivar Aasen</strong></li>
        <li>finne ut kva han gjorde på <strong>reisene</strong> sine</li>
        <li>forstå <strong>korleis</strong> han bygde landsmålet</li>
        <li>lære kvifor det heiter <strong>nynorsk</strong></li>
      </ul>`,
      notes: "Minn om førre time: skriftspråket var dansk, talemålet norsk, og etter 1814 spurde mange om Noreg burde ha sitt eige skriftspråk. I dag møter vi mannen som gav eitt svar.",
    },
    {
      type: "diskuter",
      title: "Lag eit skriftspråk!",
      prompt: `<p>De skal lage eitt skriftspråk for heile Noreg.</p>
        <p>Folk snakkar hundrevis av ulike dialektar. <strong>Korleis gjer de det?</strong></p>`,
      form: "Grupper på tre",
      tid: 3,
      notes: "Skriv forslaga til gruppene på tavla og la dei stå. Typiske forslag er å velje dialekta i hovudstaden, å velje den dialekta flest snakkar, eller å røyste. Vi kjem tilbake til lista på lysbilete 12 og samanliknar med kva Aasen faktisk gjorde.",
    },
    {
      type: "bilete",
      title: "Ivar Aasen (1813–1896)",
      src: "bilete/aasen-1871.jpg",
      alt: "Portrett av Ivar Aasen i 1871, ein mann med briller og mørk frakk",
      caption: "Ivar Aasen i 1871. Foto: C. C. Wischmann / Ivar Aasen-tunet (CC BY-SA 3.0)",
      steps: [
        "<p class=\"stor\">Voks opp på ein liten gard i <strong>Ørsta</strong> på Sunnmøre</p>",
        "<p class=\"stor\">Fattig familie, tidleg ut i arbeid</p>",
        "<p class=\"stor\"><strong>Sjølvlærd:</strong> dansk og latin, seinare tysk, engelsk, fransk og fleire</p>",
      ],
      notes: "Spør elevane om nokon har vore i Ørsta eller på Sunnmøre. Legg vekt på at han lærte seg språka på eiga hand: han gjekk ikkje på universitetet. Mange elevar ser for seg Aasen som ein gammal professor fordi dei berre har sett portrett av han som eldre. Biletet er frå 1871, då han var over femti.",
    },
    {
      type: "sporsmal",
      question: "Kor gamal var Aasen då han skreiv planen om eit norsk skriftspråk bygd på dialektane, i 1836?",
      options: ["12 år", "22 år", "35 år", "50 år"],
      correct: 1,
      explain: "Aasen var berre 22 år. Planen kom tolv år før grammatikken.",
      notes: "Årstalet står på tidslinja i førre modul. Mange gjettar høgt. Poenget er at ein ung mann utan utdanning tok på seg ei enorm oppgåve. Spør: kva kunne de tenkje dykk å ta på dykk om fem til ti år?",
    },
    {
      title: "Reisene 1842–1846",
      steps: [
        "<p class=\"stor\">Stipend frå <strong>Det Kongelige Norske Videnskabers Selskab</strong></p>",
        "<p class=\"stor\"><strong>Fire år</strong> rundt i store delar av Noreg</p>",
        "<p class=\"stor\">Han <strong>lytta</strong> og <strong>skreiv ned</strong> ord og bøyingar</p>",
        "<p class=\"midt\">Følg ruta på 3D-kartet: <a href=\"aasen-reise.html\" target=\"_blank\">Reisene til Ivar Aasen</a></p>",
      ],
      notes: "Hald dette kort: reisene har ein eigen modul med kart, og der går vi i djupna. Om du har tid, opne kartet i ein ny fane og vis ruta i nokre sekund. Spør: kvifor måtte han reise, kunne han ikkje berre skrive ned sitt eige mål?",
    },
    {
      type: "sporsmal",
      question: "Kven betalte for reisene til Aasen?",
      options: [
        "Stortinget",
        "Det Kongelige Norske Videnskabers Selskab",
        "Han betalte sjølv",
        "Kongen i Danmark",
      ],
      correct: 1,
      explain: "Aasen fekk stipend frå Det Kongelige Norske Videnskabers Selskab i Trondheim.",
      notes: "Mange vel Stortinget. Det kjem i modulen om reisene: Stortinget gav han stipend først seinare. Kongen i Danmark er eit felle for dei som trur Noreg framleis var dansk.",
    },
    {
      type: "bilete",
      title: "Tre bøker",
      src: "bilete/grammatik-1848.jpg",
      alt: "Tittelsida til Det norske Folkesprogs Grammatik frå 1848",
      caption: "Tittelsida til grammatikken frå 1848 (offentleg eigedom)",
      steps: [
        "<p class=\"stor\"><strong>1848</strong> <em class=\"nn\">Det norske Folkesprogs Grammatik</em></p>",
        "<p class=\"stor\"><strong>1850</strong> <em class=\"nn\">Ordbog over det norske Folkesprog</em></p>",
        "<p class=\"stor\"><strong>1853</strong> <em class=\"nn\">Prøver af Landsmaalet i Norge</em></p>",
      ],
      notes: "Peik på tittelsida: boka om det norske folkespråket er skriven på dansk. Aasen skreiv sjølv dansk, fordi det var skriftspråket. Forklar kva som er kva: ein grammatikk viser korleis orda blir bøygde og sett saman, ei ordbok samlar orda, og prøvene viste korleis språket kunne sjå ut i tekstar.",
    },
    {
      title: "Landsmål",
      steps: [
        "<p class=\"kjempe midt\">landsmål</p>",
        "<p class=\"stor midt\">= språket for <strong>heile landet</strong></p>",
        "<p class=\"stor midt\">Frå <strong>1929</strong>: <em class=\"nn\">nynorsk</em></p>",
      ],
      notes: "Spør kva elevane trur ordet landsmål tyder før du viser steg to. Mange trur det tyder «språket på landet» i motsetnad til byen. Aasen meinte språket for heile landet. Det er ikkje heilt feil å tenkje på bygdene, for det var der han fann talemålet han bygde på, men namnet peikar på heile Noreg.",
    },
    {
      title: "Korleis bygde han det opp?",
      body: `<div class="tre-kol">
          <div class="boks midt">dialekt</div>
          <div class="boks midt">dialekt</div>
          <div class="boks midt">dialekt</div>
        </div>`,
      steps: [
        "<p class=\"stor midt\">↓ Kva har dei <strong>felles</strong>? Kva er dei <strong>eldre</strong> formene?</p>",
        "<p class=\"kjempe midt\">landsmålet</p>",
        "<p class=\"midt\">Han vekta gjerne <strong>vestnorske</strong> former og former frå <strong>dei inste bygdene</strong>.</p>",
      ],
      notes: "Dette er kjernen i timen. Aasen valde ikkje éi dialekt. Han leita etter dei eldre, fellesgjeldande formene som dialektane hadde til felles. Vestnorske former og former frå dei indre bygdene fekk ofte vekt fordi dei stod nærare gamalnorsk. Elevane misforstår ofte og trur nynorsk er «vestlandsdialekt skriven ned». Då kan du svare at han samla frå heile landet, men valde eldre former når dei ulike dialektane skilde seg.",
    },
    {
      type: "sporsmal",
      question: "Kvifor la Aasen ofte vekt på vestnorske former og former frå dei inste bygdene?",
      options: [
        "Fordi flest folk budde der",
        "Fordi han sjølv kom derifrå",
        "Fordi dei ofte stod nærare gamalnorsk",
        "Fordi dei var lettast å skrive",
      ],
      correct: 2,
      explain: "Desse formene hadde endra seg mindre og låg nærare det gamle språket. Aasen ville finne dei eldre formene som dialektane hadde til felles.",
      notes: "Alternativ B er ei naturleg gjetting, sidan han kom frå Sunnmøre. Men då hadde han jo berre kunna bruke sitt eige mål. Poenget er at dei eldre formene fungerte som ein felles nemnar.",
    },
    {
      type: "diskuter",
      title: "Tilbake til forslaga dykkar",
      prompt: `<p>Likna forslaga dykkar på metoden til Aasen?</p>
        <p><strong>Kvifor valde han ikkje berre si eiga dialekt?</strong></p>`,
      form: "Heile klassen",
      tid: 3,
      svar: "Eit skriftspråk bygd på éi dialekt ville favorisere dei som snakka akkurat den dialekta. Ved å leite etter det dialektane hadde felles, ville Aasen lage eit språk som høyrde til heile landet.",
      notes: "Gå tilbake til lista frå lysbilete 3. Kryss av forslag som liknar på Aasen, og spør kva som ville ha skjedd med dei andre forslaga. Denne samtalen førebur skriveoppgåva i modulen, som spør om kvifor det var viktig at han lytta til folk i ulike delar av landet.",
    },
    {
      title: "Nynorsk: eit nytt språk?",
      steps: [
        "<p class=\"stor\">Namnet <em class=\"nn\">nynorsk</em> kom i <strong>1929</strong>.</p>",
        "<p class=\"stor\">Det er <strong>ikkje</strong> eit nytt språk.</p>",
        "<p class=\"stor\">Det er eit skriftspråk bygd på det <strong>levande norske talemålet</strong>.</p>",
      ],
      notes: "Ordet nynorsk forvirrar mange: dei trur det er eit nyare og kunstigare språk enn bokmål. Minn om at både nynorsk og bokmål er yngre enn 1850, og at nynorsk er bygd på talemål som er mykje eldre. Spør: kva er eigentleg «nytt» med nynorsk?",
    },
    {
      type: "sporsmal",
      question: "Kva år fekk landsmålet namnet <em class=\"nn\">nynorsk</em>?",
      options: ["1850", "1885", "1929", "1981"],
      correct: 2,
      explain: "Namnet vart endra i 1929. Språket var det same.",
      notes: "Alle alternativa er årstal elevane kjem til å møte i Del 1. Bruk svaret til å minne om at eit nytt namn ikkje er eit nytt språk.",
    },
    {
      type: "bilete",
      title: "Ivar Aasen-tunet",
      src: "bilete/aasentunet.jpg",
      alt: "Ivar Aasen-tunet i Ørsta, eit moderne museumsbygg ved den gamle garden",
      caption: "Ivar Aasen-tunet i Ørsta. Foto: Andrva (CC BY-SA 3.0)",
      body: "<p class=\"stor\">Museum og dokumentasjonssenter for nynorsk skriftkultur</p><p>på heimegarden Åsen i Ørsta</p>",
      notes: "Vis at arbeidet til Aasen framleis blir teke vare på, på same garden der han voks opp. Knyt til elevane: kven av dei har vore på eit museum om ein person? Kva seier det om kor viktig ein person er, at han får eit eige museum?",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les fagteksten om Ivar Aasen.</li>
          <li>Para saman årstal, gjer fleirval og sortering.</li>
          <li>Fyll ut setningane.</li>
          <li>Skriv refleksjonen: 60 til 120 ord på nynorsk.</li>
        </ul>`,
      tid: 15,
      notes: "Sorteringsoppgåva har med Knud Knudsen og samnorsk, som elevane ikkje har lært om enno. Sei at dei kan gjette ut frå kva som ikkje høyrer til Aasen: fasiten forklarar det, og det kjem i modulen om språkstriden. I refleksjonen bør elevane bruke eit døme. Dei som blir tidleg ferdige, kan opne kartet med reisene.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Ivar Aasen (1813–1896) frå <strong>Ørsta</strong>, sjølvlærd</p>",
        "<p class=\"stor\"><strong>1842–1846:</strong> reiste og samla dialektar</p>",
        "<p class=\"stor\">Grammatikk <strong>1848</strong>, ordbok <strong>1850</strong>, prøver <strong>1853</strong></p>",
        "<p class=\"stor\">Landsmålet: det <strong>felles</strong> i dialektane. Frå 1929: <em class=\"nn\">nynorsk</em></p>",
      ],
      notes: "Be elevane forklare metoden til Aasen til sidemannen med eigne ord før du viser det siste steget. Den som klarer det, har forstått det viktigaste.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen presenterer Ivar Aasen (1813–1896), som voks opp på ein liten gard i Ørsta og lærte seg språk på eiga hand. Med stipend frå Det Kongelige Norske Videnskabers Selskab reiste han rundt i Noreg i fire år, frå 1842 til 1846, og samla dialektar. Resultatet vart grammatikken (1848), ordboka (1850) og tekstprøvene (1853), der han viste landsmålet. Hovudpoenget er metoden: Aasen valde ikkje éi dialekt, men leita etter dei eldre formene som dialektane hadde felles. Frå 1929 heitte språket nynorsk.</p>",
    mal: [
      "Elevane kan fortelje kven Ivar Aasen var og kva han gjorde på reisene sine.",
      "Elevane kan namngi og tidfeste grammatikken, ordboka og tekstprøvene.",
      "Elevane kan forklare korleis Aasen bygde opp landsmålet, og kvifor han ikkje valde éi dialekt.",
      "Elevane kan forklare kva landsmål tyder, og at namnet nynorsk kom i 1929.",
    ],
    lareplan: [15, 16, 9, 10],
    forkunnskapar: "Elevane bør ha arbeidd med modulen Norsk språk før 1850, slik at dei veit at skriftspråket var dansk og talemålet norske dialektar.",
    forebuing: [
      "Test presentasjonen på tavla, særleg bileta på lysbilete 4, 8 og 15.",
      "Opne aasen-reise.html på førehand om du vil vise kartet kort på lysbilete 6. Det kan ta litt tid å laste.",
      "Ha klar ein stad på tavla der forslaga frå samtalen på lysbilete 3 kan stå til lysbilete 12.",
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la gruppene foreslå korleis dei ville lage eit skriftspråk for heile landet. Skriv forslaga på tavla.</p>", lysbilete: "2 og 3" },
      { fase: "Oppveksten", min: 4, gjer: "<p>Presenter Aasen og ta spørsmålet om alderen hans i 1836.</p>", lysbilete: "4 og 5" },
      { fase: "Reisene", min: 4, gjer: "<p>Fortel kort om reisene og stipendet. Vis eventuelt kartet i ein ny fane.</p>", lysbilete: "6 og 7" },
      { fase: "Bøkene og landsmålet", min: 5, gjer: "<p>Gå gjennom dei tre bøkene og kva ordet landsmål tyder.</p>", lysbilete: "8 og 9" },
      { fase: "Metoden", min: 7, gjer: "<p>Forklar korleis Aasen bygde opp landsmålet, ta spørsmålet og samanlikn med forslaga til elevane.</p>", lysbilete: "10 til 12" },
      { fase: "Namnet nynorsk", min: 3, gjer: "<p>Rydd opp i misforståinga om at nynorsk er eit nytt språk, og vis Ivar Aasen-tunet.</p>", lysbilete: "13 til 15" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane arbeider i modulen og skriv refleksjonen til slutt.</p>", lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer, og lat elevane forklare metoden til Aasen for kvarandre.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Nynorsk er sunnmørsdialekten til Aasen.»", hjelp: "Aasen samla dialektar frå store delar av landet og leita etter det dei hadde felles. Han valde ikkje sitt eige mål. Samanlikn med forslaga elevane kom med i starten av timen." },
      { feil: "«Nynorsk er vestlandsdialekt skriven ned.»", hjelp: "Aasen vekta ofte vestnorske former og former frå dei inste bygdene, men fordi dei stod nær gamalnorsk og dermed var felles eldre former, ikkje fordi dei var vestlandske." },
      { feil: "«Nynorsk er eit nytt og kunstig språk.»", hjelp: "Namnet nynorsk kom først i 1929. Språket er eit skriftspråk bygd på levande talemål som er mykje eldre. Både nynorsk og bokmål er skriftspråk som voks fram etter 1850." },
      { feil: "«Aasen skreiv på nynorsk heile livet.»", hjelp: "Vis tittelsida til grammatikken: ho er på dansk. Aasen skreiv dansk fordi det var skriftspråket, og titlane på bøkene hans er danske." },
    ],
    samtale: [
      "Kvifor var det lurt av Aasen å lytte til folk i heile landet, og ikkje berre bruke si eiga dialekt?",
      "Kva meiner vi med at eit skriftspråk er «rettferdig» for ulike grupper?",
      "Kvifor trur du Aasen valde namnet landsmål?",
      "Kva kan vi lære av at ein sjølvlærd gardsgut frå Ørsta laga eit skriftspråk?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei enkel tidslinje med 1813, 1842–1846, 1848, 1850, 1853, 1929 og 1896 som dei fyller ut undervegs.",
        "Bruk figuren på lysbilete 10 som ramme for refleksjonen: mange dialektar, det dei har felles, landsmålet.",
        "La elevane skrive refleksjonen i punkt først og så binde punkta saman.",
      ],
      utfordring: [
        "La elevane opne kartet med reisene og finne ut kvar Aasen var lengst, og kvifor han valde nettopp dei stadene.",
        "Be elevane skrive refleksjonen som eit brev frå Aasen til ein venn, der han forklarar kvifor han ikkje kan bruke berre sunnmørsdialekten.",
      ],
    },
    vurdering: [
      "Spørsmåla på tavla og samtalen på lysbilete 12 viser om elevane har forstått metoden til Aasen.",
      "Refleksjonen i modulen viser om eleven kan forklare kvifor det var viktig at Aasen lytta til folk i ulike delar av landet, med minst eitt døme.",
      "Kjenneteikn på god måloppnåing: eleven forklarar metoden med eigne ord, skil mellom landsmål og ei enkelt dialekt og plasserer bøkene rett i tid.",
    ],
    vidare: "Følg opp med modulen Reisene til Ivar Aasen, der elevane følgjer ruta hans på eit 3D-kart. Deretter kjem Språkstriden og samnorsk, der Aasen blir samanlikna med Knud Knudsen.",
  },
});

Larar.register("historie-aasen-reise", {
  tittelnotat: "Denne modulen er ei eiga side med eit 3D-kart der elevane følgjer Aasen stad for stad, kapittel for kapittel, med oppgåver undervegs. Presentasjonen oppsummerer kapitla. Har du god skjerm, kan du opne kartet i ein eigen fane og vise det medan du går gjennom lysbileta.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>følgje Ivar Aasen <strong>stad for stad</strong></li>
        <li>finne ut <strong>korleis</strong> han arbeidde</li>
        <li>forstå <strong>kvifor</strong> han måtte reise</li>
      </ul>`,
      notes: "Minn om førre modul: Aasen ville byggje skriftspråket på det dialektane hadde felles. I dag ser vi kva det kravde i praksis.",
    },
    {
      title: "Opne kartet",
      body: `<p class="stor midt"><a href="aasen-reise.html" target="_blank">Reisene til Ivar Aasen</a></p>
        <ul>
          <li>Knappane eller piltastane: neste kapittel</li>
          <li>Dra i kartet for å snu det</li>
        </ul>`,
      notes: "Opne kartet i ein ny fane (lenkja opnar ein ny fane) og vis det på tavla. Gå gjerne gjennom innleiinga og det første kapitlet på kartet saman med klassen, så elevane ser korleis det verkar før dei arbeider sjølve. Du kan byte mellom presentasjonen og kartet undervegs: lysbileta nedanfor følgjer kapitla i same rekkjefølgje. Ruta er ei forenkling: stader som ikkje lét seg plassere sikkert, er utelatne.",
    },
    {
      type: "diskuter",
      title: "Reise i 1840-åra",
      prompt: `<p>Du skal frå Ørsta til Kristiansand i 1844.</p>
        <p><strong>Korleis kjem du deg fram? Kor lang tid tek det?</strong></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "Aasen reiste til fots, med hest og med båt. Han brukte fleire år på langferda, og vart ofte verande veker eller månader på same stad.",
      notes: "Elevane tenkjer i fly, tog og bil. Det finst ikkje her. La dei gjette tid før du viser svaret. Poenget er at reisa i seg sjølv var eit stort arbeid, og at Aasen ikkje berre reiste forbi: han budde hjå folk.",
    },
    {
      title: "Eit land utan eige skriftspråk",
      kicker: "Før 1842",
      steps: [
        "<p class=\"stor\">1814: eiga grunnlov, men <strong>dansk</strong> skriftspråk</p>",
        "<p class=\"stor\">Aasen: skriftspråket må byggjast på det folk <strong>faktisk sa</strong></p>",
        "<p class=\"stor\">1836, 22 år gamal: planen <em class=\"nn\">«Om vort Skriftsprog»</em></p>",
        "<p class=\"stor merk\">Men då måtte nokon reise og lytte.</p>",
      ],
      notes: "Dette er innleiingskapitlet på kartet. Legg merke til at Aasen skreiv planen på dansk: tittelen «Om vort Skriftsprog» tyder om lag «Om skriftspråket vårt». Spør elevane om dei kan omsetje han.",
    },
    {
      title: "Åsen og Ekset",
      kicker: "1813",
      steps: [
        "<p class=\"stor\">Fødd <strong>5. august 1813</strong> på garden Åsen i Ørsta</p>",
        "<p class=\"stor\">Yngst av ni søsken. Mista mora som treåring, faren som trettenåring</p>",
        "<p class=\"stor\">Lånte bøker hjå lensmann Sivert Aarflot på <strong>Ekset</strong></p>",
        "<p class=\"stor\">18 år: omgangsskulelærar i heimbygda</p>",
      ],
      notes: "Aarflot hadde bibliotek, trykkjeri og avis på Ekset ved Voldsfjorden. Forklar kva ein omgangsskulelærar var: læraren flytta frå gard til gard og heldt skule der, fordi bygda ikkje hadde eigne skulehus. Spør elevane kva det betyr at Aasen vart lærar sjølv utan å ha gått mykje på skule.",
    },
    {
      type: "sitat",
      text: "med en vis Graadighed",
      kjelde: "Ivar Aasen om korleis han las bøkene han lånte på Ekset",
      steps: ["<p class=\"midt\">«med ein viss grådigheit»</p>"],
      notes: "Lat elevane gjette kva det tyder før du viser omsetjinga. Legg merke til at Aasen skreiv dansk: det var skriftspråket han hadde. Knyt til elevane: kva les eller ser de «med ein viss grådigheit»?",
    },
    {
      title: "Solnør: sju år som huslærar",
      kicker: "1833–1842",
      steps: [
        "<p class=\"stor\">20 år: til prost Thoresen i <strong>Herøy</strong> for å lære meir</p>",
        "<p class=\"stor\">1835: huslærar hjå kaptein Daae på <strong>Solnør</strong></p>",
        "<p class=\"stor\">Lærte seg norrønt, dansk, engelsk, fransk, tysk og latin</p>",
        "<p class=\"stor\">Skreiv ein grammatikk over <strong>sunnmørsdialekten</strong></p>",
      ],
      notes: "Grammatikken over sunnmørsdialekten, «Den søndmørske Dialekt», var første gongen Aasen granska sitt eige mål grundig. Det var ei øving før det store arbeidet. Spør: kvifor var det lurt å starte med si eiga dialekt?",
    },
    {
      title: "Bergen 1841: stipendet",
      kicker: "Sommaren 1841",
      steps: [
        "<p class=\"stor\">Til Bergen med plantesamlinga og grammatikken</p>",
        "<p class=\"stor\">Biskop Jacob Neumann vart imponert</p>",
        "<p class=\"stor\">Bergens Stiftstidende: «denne mærkelige unge Bonde»</p>",
        "<p class=\"stor\">Frå Trondheim: <strong>150 spesidalar</strong> i året</p>",
      ],
      notes: "Artiklane i Bergens Stiftstidende vart lesne i Trondheim, der Frederik Moltke Bugge leidde Det Kongelige Norske Videnskabers Selskab. Han sytte for stipendet, som først galdt dialektane i Bergens stift. Knyt til i dag: Aasen vart «oppdaga» fordi nokon skreiv om han i avisa. Kva svarar til det i dag?",
    },
    {
      type: "sporsmal",
      question: "Stipendet var 150 spesidalar i året. Kor mykje var det for ein dreng på ein gard?",
      options: ["Om lag ei månadsløn", "Om lag ei årsløn", "Om lag seks årsløner", "Om lag hundre årsløner"],
      correct: 2,
      explain: "Ein dreng fekk 24 til 25 spesidalar i året, pluss kost og losji. Rekna etter prisane svarar stipendet til om lag 70 000 kroner i dag, men lønene var mykje lågare den gongen. Ein rektor kunne ha 900 spesidalar.",
      notes: "Poenget er at pengeverdi er vanskeleg å samanlikne over tid. Etter prisane i dag var stipendet lite, men målt i løner var det nok til å reise heile året utan anna arbeid. Det var ikkje rikdom.",
    },
    {
      type: "sitat",
      text: "Intet kan sammenlignes med Reiser",
      kjelde: "Ivar Aasen i dagboka etter Bergensturen, 1841",
      notes: "Spør: kva meinte han? Og er de einige? La nokre elevar fortelje om ei reise som har gjort inntrykk på dei. Skreiv han det før eller etter at han hadde reist mykje? (Før: langferda starta året etter.)",
    },
    {
      title: "Slik arbeidde han",
      steps: [
        "<p class=\"stor\"><strong>Budde</strong> hjå folk</p>",
        "<p class=\"stor\"><strong>Lytta</strong> og <strong>spurde</strong></p>",
        "<p class=\"stor\"><strong>Skreiv ned</strong> ord, bøyingar og uttale</p>",
        "<p class=\"stor\"><strong>Samanlikna</strong> kvar bygd med dei førre</p>",
        "<p class=\"stor\">Om vinteren: ordna notata og skreiv rapportar</p>",
      ],
      notes: "Dette er metoden, og han er viktigare enn stadnamna. Modulen seier at arbeidet med å skrive reint, ordne og samanlikne tok like lang tid som sjølve reisinga. Knyt til elevane sine eigne prosjekt: å samle inn er ofte den lette delen, å ordne det er den tunge.",
    },
    {
      title: "Langferda 1842–1844",
      body: `<ol class="tidslinje">
          <li><span class="aar">Hausten 1842</span><span class="hend">Frå Ekset gjennom Nordfjord og Sunnfjord til Sogn og Lærdal.</span></li>
          <li><span class="aar">Vinteren 1842–43</span><span class="hend">Heile vinteren i Sogndal. Om våren til Eivindvik i Gulen.</span></li>
          <li><span class="aar">1843–44</span><span class="hend">Nordhordland og Bergen. Ni månader på Litlebergen i Meland.</span></li>
          <li><span class="aar">Våren 1844</span><span class="hend">Voss og Hardanger. God tid på kvar stad.</span></li>
          <li><span class="aar">Hausten 1844</span><span class="hend">Ryfylke, Stavanger, Jæren og langs kysten til Kristiansand.</span></li>
          <li><span class="aar">Desember 1844</span><span class="hend">Opp Setesdal midt på vinteren, til Homme i Valle.</span></li>
        </ol>`,
      notes: "Vis gjerne kapitla på kartet medan du går gjennom tidslinja. Peik på at han tok seg god tid: fem veker på Vossevangen, sju veker i Ullensvang, ti veker i Skånevik, seks veker på Mossige på Jæren. Reisa starta 29. september 1842. Oppdraget var først Bergens stift, men vart utvida til fleire landsdelar.",
    },
    {
      title: "Langferda 1845–1846",
      body: `<ol class="tidslinje">
          <li><span class="aar">Vinteren 1845</span><span class="hend">Aust-Agder og Telemark. Vinteren i Seljord.</span></li>
          <li><span class="aar">Sommaren 1845</span><span class="hend">Hallingdal, og ni dagar i Christiania.</span></li>
          <li><span class="aar">Hausten 1845</span><span class="hend">Valdres, Gudbrandsdalen og over Dovrefjell til Trondheim.</span></li>
          <li><span class="aar">Sommaren 1846</span><span class="hend">Nordmøre, Fosen og med båt nord til Helgeland.</span></li>
          <li><span class="aar">Hausten 1846</span><span class="hend">Namdalen og Innherad. Tilbake i Trondheim 5. desember.</span></li>
        </ol>`,
      notes: "Seljord var den tredje vinteren på reise. Trondheim er byen stipendet kom frå. Helgeland var det lengste nord han kom på langferda. Spør elevane om nokon av dei bur nær ein av stadene, og la dei finne heimstaden sin på kartet.",
    },
    {
      title: "Bygdene, ikkje byane",
      steps: [
        "<p class=\"stor\">Christiania: berre <strong>ni dagar</strong></p>",
        "<p class=\"stor\">Han leita etter det <strong>nedervde talemålet</strong>, og det fann han hjå bøndene</p>",
        "<p class=\"stor\">Voss, Hardanger, Sogn, Setesdal og Telemark: mange <strong>gamle former frå norrønt</strong></p>",
      ],
      notes: "Dette knyter reisa til metoden frå førre modul. I byane var talemålet meir blanda, jamfør embetsmannsspråket. Dei indre bygdene hadde halde på gamle former, og slike former kom til å vege tungt i landsmålet. Mange elevar trur Aasen mislikte byane. Det seier ikkje modulen: dei interesserte han mindre fordi han leita etter noko anna.",
    },
    {
      type: "sporsmal",
      question: "Kvifor var bygder som Voss, Hardanger og Setesdal så viktige for Aasen?",
      options: [
        "Der var det lettast å reise",
        "Måla der hadde halde på mange gamle former frå norrønt",
        "Der budde dei fleste folka i Noreg",
        "Stipendet kravde at han var der",
      ],
      correct: 1,
      explain: "Dei avsidesliggjande bygdene hadde halde på mange gamle former. Slike former vog tungt når Aasen skulle velje kva som skulle inn i landsmålet.",
      notes: "Dei som vel A, kan du spørje om det var lett å gå opp Setesdal midt på vinteren. Knyt svaret til metoden: eldre former var felles nemnarar for dialektane.",
    },
    {
      type: "sporsmal",
      question: "Kor langt reiste Aasen på langferda 1842–1846?",
      options: ["Om lag 450 kilometer", "Om lag 4550 kilometer", "Om lag 45 500 kilometer"],
      correct: 1,
      explain: "På fire år reiste han om lag 4550 kilometer, til fots, med hest og med båt.",
      notes: "Samanlikn med noko elevane kjenner: kor langt er det til næraste by, eller frå Oslo til Trondheim? Legg vekt på at farten var låg og at han budde lenge på kvar stad.",
    },
    {
      title: "Frå notat til bok",
      kicker: "1847–1851",
      steps: [
        "<p class=\"stor\">Ni månader i Trondheim: skreiv på grammatikken</p>",
        "<p class=\"stor\">1847: flytte til <strong>Christiania</strong> for resten av livet</p>",
        "<p class=\"stor\"><strong>1848</strong> grammatikken, <strong>1850</strong> ordboka med nær 24 000 ord</p>",
        "<p class=\"stor\"><strong>1851:</strong> første statsstipendiat, og namnet <em class=\"nn\">landsmål</em></p>",
      ],
      notes: "Aasen skreiv at arbeidet «ikke vel kunne udføres andensteds end i en stor By»: der fanst bibliotek, prenteverk og lærde folk å drøfte med. Det er eit fint poeng å stoppe ved etter lysbiletet om bygdene: han trong bygdene for å samle, men byen for å skrive. Stortinget gav han 300 spesidalar i året, like mykje som ein universitetsstipendiat. Modulen om Aasen seier at han kalla språket landsmål i tekstprøvene frå 1853. Her står det at han gav det namnet i 1851. Begge delar går saman: namnet kom i 1851, og i 1853 viste han språket fram.",
    },
    {
      title: "Lofoten og Tromsø",
      kicker: "Sommaren 1851",
      steps: [
        "<p class=\"stor\">Med båt nordover langs heile kysten</p>",
        "<p class=\"stor\"><strong>Tromsø</strong>, 13. til 18. juli: lengst nord han kom</p>",
        "<p class=\"stor\">I Finnmark var han aldri</p>",
        "<p class=\"stor\">Seinare: innsamlingsreise nesten kvar sommar</p>",
      ],
      notes: "Frå no av budde han fast i Christiania og reiste om somrane: kvar sommar 1852 til 1861 og 1864 til 1868. Spør elevane frå Nord-Noreg, om du har nokon, kva det betyr at dialektane deira var mindre med i grunnlaget. Det er ikkje ein feil i metoden, men det viser at ingen kunne høyre alt.",
    },
    {
      title: "Alt i alt",
      kicker: "1853–1896",
      body: `<div class="tre-kol">
          <div class="boks midt"><p class="kjempe">28 350</p><p>kilometer</p></div>
          <div class="boks midt"><p class="kjempe">2794</p><p>dagar på farten</p></div>
          <div class="boks midt"><p class="kjempe">½</p><p>av dagens kommunar</p></div>
        </div>`,
      steps: ["<p class=\"midt\">1853 prøvene · 1864 <em class=\"nn\">Norsk Grammatik</em> · 1873 <em class=\"nn\">Norsk Ordbog</em> · 1885 jamstilling · død 1896</p>"],
      notes: "Norsk Ordbog frå 1873 hadde om lag 45 000 oppslagsord, nesten dobbelt så mange som den første ordboka. Aasen døydde i Kristiania 23. september 1896, 83 år gamal. Han fekk altså oppleve jamstillingsvedtaket i 1885. Spør: kva seier tala om kor viktig det var for han å høyre språket sjølv?",
    },
    {
      type: "oppgave",
      title: "Følg reisa sjølve",
      body: `<ul>
          <li>Opne kartet og gå gjennom kapitla i rekkjefølgje.</li>
          <li>Svar på oppgåvene mellom kapitla.</li>
          <li>Finn heimstaden din, eller næraste stad Aasen var.</li>
        </ul>`,
      tid: 14,
      notes: "Oppgåvene i denne modulen viser rett svar med ein gong, fordi dei står langt frå teksten dei byggjer på. Be elevane lese forklaringa når dei svarer feil. Gå rundt og spør kvar Aasen er no, og kvifor han vart verande lenge på nett den staden. Kartet kan vere tungt på eldre maskiner: la elevane i så fall arbeide to og to.",
    },
    {
      type: "diskuter",
      title: "Kvifor måtte han reise?",
      prompt: "<p class=\"stor\">Forklar med éi setning kvifor Aasen ikkje kunne byggje landsmålet heime i Ørsta.</p>",
      form: "Kvar for seg, så til sidemannen",
      tid: 3,
      svar: "Han ville finne det dialektane hadde felles, og då måtte han høyre korleis folk snakka i heile landet.",
      notes: "Dette er hovudpoenget i modulen. Lat nokre elevar lese setninga si høgt. Dei beste svara knyter reisa til metoden: det felles i mange dialektar.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei eiga side, <a href=\"aasen-reise.html\">aasen-reise.html</a>, med eit 3D-kart der elevane følgjer Ivar Aasen stad for stad. Forelesinga er delt i kapittel frå oppveksten i Ørsta, via åra som huslærar på Solnør og stipendet frå Trondheim, gjennom langferda 1842–1846 og fram til grammatikken, ordboka og dei seinare reisene. Mellom kapitla er det oppgåver av same slag som elles i kurset, og elevane får rett svar med ein gong. Hovudpoenget er å vise kva metoden til Aasen kravde i praksis: han måtte høyre talemålet i heile landet.</p>",
    mal: [
      "Elevane kan fortelje om oppveksten til Aasen og korleis han fekk stipendet.",
      "Elevane kan skildre korleis Aasen arbeidde på reisene, og kvifor han tok seg god tid i dei indre bygdene.",
      "Elevane kan forklare samanhengen mellom reisene og metoden hans for å byggje landsmålet.",
      "Elevane kan plassere dei viktigaste delane av ruta på kartet over Noreg.",
    ],
    lareplan: [15, 16, 9],
    forkunnskapar: "Elevane bør ha arbeidd med modulane Norsk språk før 1850 og Ivar Aasen og landsmålet, slik at dei kjenner metoden til Aasen.",
    forebuing: [
      "Opne aasen-reise.html på tavlemaskina på førehand og sjekk at kartet lastar. Ha det klart i ein eigen fane.",
      "Test at elevmaskinene klarer kartet. Er dei trege, planlegg arbeid to og to.",
      "Test presentasjonen, særleg tidslinjene på lysbilete 13 og 14.",
      "Finn ut kva stad på ruta som ligg nærast skulen, så du kan bruke han som døme.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla, opne kartet i ein ny fane og la elevane tenkje over korleis ein reiste i 1840-åra.</p>", lysbilete: "2 til 4" },
      { fase: "Før reisa", min: 9, gjer: "<p>Gå gjennom innleiinga, oppveksten, Solnør og stipendet. Ta spørsmålet om spesidalar og sitata. Vis gjerne dei første kapitla på kartet.</p>", lysbilete: "5 til 11" },
      { fase: "Langferda", min: 10, gjer: "<p>Gå gjennom tidslinjene og vis kapitla på kartet. Knyt reisa til metoden med lysbiletet om bygdene og dei to spørsmåla.</p>", lysbilete: "12 til 17" },
      { fase: "Bøkene og dei seinare reisene", min: 4, gjer: "<p>Fortel om flyttinga til Christiania, bøkene, statsstipendet og turen til Tromsø, og vis tala til slutt.</p>", lysbilete: "18 til 20" },
      { fase: "Eigenarbeid", min: 14, gjer: "<p>Elevane går gjennom kartet sjølve og svarar på oppgåvene mellom kapitla.</p>", lysbilete: "21" },
      { fase: "Avslutning", min: 4, gjer: "<p>Elevane forklarar med éi setning kvifor Aasen måtte reise.</p>", lysbilete: "22" },
    ],
    misoppfatningar: [
      { feil: "«Aasen reiste rundt og skreiv ned éi dialekt som han likte best.»", hjelp: "Han samanlikna kvar bygd med dei førre. Målet var å finne det dialektane hadde felles, og difor måtte han høyre mange." },
      { feil: "«Aasen var rik fordi han fekk stipend.»", hjelp: "Vis spørsmålet om spesidalar: stipendet var nok til å reise heile året, men langt frå rikdom. Han levde enkelt heile livet." },
      { feil: "«Aasen mislikte byane.»", hjelp: "Byane interesserte han mindre som kjelde, fordi han leita etter det nedervde talemålet. Men han flytta sjølv til Christiania for å skrive, fordi der var bibliotek og prenteverk." },
      { feil: "«Aasen var over heile Noreg.»", hjelp: "Han kom aldri lenger nord enn Tromsø og var aldri i Finnmark. Ruta på kartet er dessutan ei forenkling." },
    ],
    samtale: [
      "Kvifor tok Aasen seg så god tid på nokre stader?",
      "Aasen trong bygdene for å samle, men byen for å skrive. Kvifor?",
      "Kva ville ein språkforskar i dag gjort annleis for å samle inn dialektar?",
      "Kva betyr det for eit skriftspråk at nokre landsdelar vart vitja meir enn andre?",
    ],
    tilpassing: {
      stotte: [
        "Lat elevane arbeide to og to, der den eine styrer kartet og den andre les høgt.",
        "Gi elevane ei liste med fem stader dei skal finne på kartet og skrive éi setning om: Ørsta, Bergen, Sogndal, Christiania og Trondheim.",
        "Gå gjennom dei tre første kapitla på tavla før elevane arbeider sjølve.",
      ],
      utfordring: [
        "Be elevane skrive eit dagboknotat frå éin av stadene på ruta, slik oppgåve 4 i skrivemodulen i Del 1 ber om.",
        "La elevane finne ut kva som særmerkjer dialekta på ein stad Aasen var lenge, og kva for trekk frå den dialekta som finst i nynorsk i dag.",
      ],
    },
    vurdering: [
      "Oppgåvene mellom kapitla gir elevane rett svar med ein gong, så bruk heller spørsmåla på tavla og exit-samtalen til å sjå kva som sit.",
      "Setninga på lysbilete 22 viser om eleven har forstått samanhengen mellom reisene og metoden.",
      "Kjenneteikn på god måloppnåing: eleven forklarar kvifor Aasen måtte reise, kvifor han tok seg tid i dei indre bygdene, og korleis reisenotata vart til grammatikk og ordbok.",
    ],
    vidare: "Gå vidare til Språkstriden og samnorsk, der Aasen blir samanlikna med Knud Knudsen. Dagboknotatet i skrivemodulen til slutt i Del 1 byggjer direkte på denne modulen.",
  },
});

Larar.register("historie-striden", {
  tittelnotat: "Modulen dekkjer over hundre år: frå Knud Knudsen og jamstillinga i 1885, gjennom samnorskpolitikken og foreldreaksjonen, til 1981. Mange elevar ser ingen grunn til at folk krangla om rettskriving. Poenget med timen er å vise at språk handlar om identitet, ikkje berre om reglar.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>samanlikne <strong>Aasen</strong> og <strong>Knud Knudsen</strong></li>
        <li>forstå <strong>jamstillingsvedtaket</strong> frå 1885</li>
        <li>finne ut kva <strong>samnorsk</strong> var, og kvifor det vart strid</li>
        <li>forklare kvifor vi i dag har <strong>to skriftspråk</strong></li>
      </ul>`,
      notes: "Minn om at både Aasen og Knudsen ville løyse det same problemet: at Noreg skreiv dansk. Dei gjekk berre kvar sin veg.",
    },
    {
      type: "diskuter",
      title: "To vegar",
      prompt: `<div class="to-kol">
          <div class="boks"><h3>Veg 1</h3><p>Byggje eit nytt skriftspråk frå dialektane</p></div>
          <div class="boks"><h3>Veg 2</h3><p>Endre dansken litt etter litt</p></div>
        </div>
        <p class="midt"><strong>Kva ville du valt, og kvifor?</strong></p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Lat elevane stemme med handa etterpå. Spør etter fordelar og ulemper med begge: veg 2 er mindre dramatisk og kjennest kjend for dei som alt skriv dansk, veg 1 kjem nærare talemålet til folk flest. Sei at begge vegane faktisk vart valde, og at det er difor vi har to skriftspråk.",
    },
    {
      type: "bilete",
      title: "Knud Knudsen (1812–1895)",
      src: "bilete/knud-knudsen.jpg",
      alt: "Portrett av Knud Knudsen, ein eldre mann med kvitt hår",
      caption: "Knud Knudsen. Ukjend fotograf (offentleg eigedom)",
      steps: [
        "<p class=\"stor\">Ville <strong>fornorske</strong> dansk skrift</p>",
        "<p class=\"stor\">steg for steg</p>",
        "<p class=\"stor\">mot det <strong>danna talemålet</strong> i byane</p>",
        "<p class=\"stor\">→ riksmål → <strong>bokmål</strong></p>",
      ],
      notes: "Knudsen var nesten jamgamal med Aasen. Minn om embetsmannsspråket frå den første modulen: det var dette danna talemålet i byane Knudsen ville føre skrifta nærare. Elevar trur ofte at bokmål «er dansk». Det er for enkelt: bokmål er dansk skrift som er fornorska over lang tid.",
    },
    {
      title: "To menn, to metodar",
      body: `<table>
          <thead><tr><th></th><th>Ivar Aasen</th><th>Knud Knudsen</th></tr></thead>
          <tbody>
            <tr><td>Utgangspunkt</td><td>Dei norske dialektane</td><td>Dansk skrift</td></tr>
            <tr><td>Metode</td><td>Samla dei eldre formene dialektane hadde felles</td><td>Fornorska dansk skrift steg for steg</td></tr>
            <tr><td>Førte til</td><td>Landsmål, seinare nynorsk</td><td>Riksmål, seinare bokmål</td></tr>
          </tbody>
        </table>`,
      notes: "Tabellen står i faktabanken i skrivemodulen til slutt i Del 1, så elevane kan finne han att. Spør: kva hadde dei felles? Svar: begge ville gi Noreg eit norsk skriftspråk i staden for dansk. Det er eit punkt elevane lett gløymer når dei skriv samanliknande tekst.",
    },
    {
      type: "sporsmal",
      question: "Kva skriftspråk voks fram av lina til Knud Knudsen?",
      options: ["Nynorsk", "Bokmål", "Samnorsk", "Landsmål"],
      correct: 1,
      explain: "Lina til Knudsen vart riksmål og seinare bokmål. Lina til Aasen vart landsmål og seinare nynorsk.",
      notes: "Ein enkel kontroll. Dei som vel samnorsk, har kanskje høyrt ordet før: det kjem om nokre minutt.",
    },
    {
      title: "1885: jamstillingsvedtaket",
      steps: [
        "<p class=\"stor\"><strong>Stortinget</strong> vedtek:</p>",
        "<p class=\"stor\">landsmål og det norsk-danske skriftspråket er <em class=\"nn\">jamstilte</em></p>",
        "<p class=\"stor\">= likeverdige i <strong>skule</strong> og <strong>forvaltning</strong></p>",
        "<p class=\"stor merk\">Landsmålet får offisiell status.</p>",
      ],
      notes: "Aasen levde då og fekk oppleve vedtaket. Forklar ordet jamstilt: jamt, likt. Mange elevar trur vedtaket tvinga folk til å skrive landsmål. Det gjorde det ikkje: det gjorde landsmålet til eit offisielt alternativ.",
    },
    {
      type: "sporsmal",
      question: "Etter vedtaket i 1885: måtte alle skrive landsmål?",
      options: [
        "Ja, landsmålet vart det einaste skriftspråket",
        "Nei, begge skriftspråka vart likeverdige",
        "Nei, landsmålet vart forbode i byane",
      ],
      correct: 1,
      explain: "Vedtaket gjorde landsmålet offisielt, men tvinga ingen til å bruke det. Begge skriftspråka skulle vere likeverdige i skule og forvaltning.",
      notes: "Knyt til i dag: elevane har eitt hovudmål og eitt sidemål. Det er ei direkte følgje av at det finst to jamstilte skriftspråk.",
    },
    {
      title: "Samnorsk: to språk blir eitt?",
      steps: [
        "<p class=\"stor\">Frå tidleg 1900-tal til 1960-talet</p>",
        "<p class=\"stor\">Ein <strong>politikk</strong>: føre bokmål og nynorsk <strong>saman</strong></p>",
        "<p class=\"stor\">Rettskrivingsreformer i <strong>1907, 1917 og 1938</strong></p>",
        "<p class=\"stor\">Endra <strong>både</strong> bokmål og nynorsk</p>",
      ],
      notes: "Understrek ordet politikk: samnorsk var ikkje eit ferdig språk som nokon skreiv, men eit mål styresmaktene arbeidde mot gjennom rettskrivingsreformer. Tanken var at dei to språka skulle nærme seg kvarandre til dei vart eitt.",
    },
    {
      type: "diskuter",
      title: "Tenk deg …",
      prompt: `<p>Styresmaktene bestemmer at mange ord du skriv kvar dag, skal skrivast på ein ny måte.</p>
        <p><strong>Korleis reagerer du? Korleis reagerer foreldra dine?</strong></p>`,
      form: "Grupper på tre",
      tid: 3,
      notes: "La elevane tenkje på ord dei brukar på mobilen eller i chat. Mange reagerer med «det bryr eg meg ikkje om», andre med irritasjon. Spør særleg kva foreldra ville sagt om lærebøkene til borna fekk nye former. Det leier rett inn i foreldreaksjonen.",
    },
    {
      title: "Foreldreaksjonen",
      steps: [
        "<p class=\"stor\">Starta på slutten av <strong>1940-talet</strong></p>",
        "<p class=\"stor\">Særleg på Austlandet og i byane</p>",
        "<p class=\"stor\">Foreldre retta <strong>lærebøkene</strong> med blekk</p>",
        "<p class=\"stor\">Hard strid på <strong>1950-talet</strong></p>",
      ],
      notes: "Modulen fortel at foreldra sletta ut samnorske former med blekk og skreiv inn dei eldre formene attmed. Aksjonen vart organisert som Foreldreaksjonen mot samnorsk i 1951. Spør elevane: ville foreldra dykkar gjort noko slikt? Kva seier det om kor sterke kjensler språk vekkjer?",
    },
    {
      type: "sitat",
      text: "Striden viste at språk handlar om identitet, ikkje berre om reglar.",
      kjelde: "Frå leseteksten om foreldreaksjonen i modulen",
      steps: ["<p class=\"midt\">Kva meiner teksten med <strong>identitet</strong>?</p>"],
      notes: "Dette spørsmålet er òg med i leseoppgåva i modulen, så ta ein kort samtale no og la elevane skrive svaret sjølve seinare. Hjelp dei på veg: kjenner de dykk som ein del av ein stad når de snakkar dialekt? Korleis ville det kjennast om nokon sa at dialekta di var feil?",
    },
    {
      title: "1981: kvar sin veg",
      steps: [
        "<p class=\"stor\">Stortinget: samnorskpolitikken skal <strong>ikkje lenger gjelde</strong></p>",
        "<p class=\"stor\">Bokmål og nynorsk utviklar seg <strong>kvar for seg</strong></p>",
        "<p class=\"stor\">Moderne rettskriving: bokmål <strong>2005</strong>, nynorsk <strong>2012</strong></p>",
      ],
      notes: "Politikken vart altså aldri gjennomført fullt ut. Rettskrivinga frå 2012 er den elevane lærer i dag. Spør: kva ville ha vore annleis for dykk om samnorsk hadde vorte gjennomført?",
    },
    {
      type: "sporsmal",
      question: "Kva er samnorsk?",
      options: [
        "Eit felles skriftspråk som blir brukt i dag",
        "Ein politikk som ville føre bokmål og nynorsk saman",
        "Eit anna namn på landsmål",
        "Dialekta i Oslo",
      ],
      correct: 1,
      explain: "Samnorsk var ein politikk, ikkje eit ferdig språk. Han vart aldri gjennomført fullt ut og vart formelt avslutta i 1981.",
      notes: "Den vanlegaste feilen er A: elevane trur samnorsk er eit språk som finst. Minn om ordet politikk frå lysbilete 9.",
    },
    {
      title: "Dei to linene i eitt bilete",
      body: `<div class="toliner">
          <div class="line aasen">
            <div class="boks">Dei norske dialektane</div>
            <div class="pil">↓ Ivar Aasen samlar og byggjer</div>
            <div class="boks">Landsmål (1853)</div>
            <div class="pil">↓ nytt namn 1929</div>
            <div class="boks sterk">Nynorsk</div>
          </div>
          <div class="line midt">
            <div class="boks svak">1885: jamstilte</div>
            <div class="boks svak">1907, 1917, 1938: samnorsk-reformer prøver å føre dei saman</div>
            <div class="boks svak">1981: oppgitt, kvar sin veg</div>
          </div>
          <div class="line knudsen">
            <div class="boks">Dansk skriftspråk</div>
            <div class="pil">↓ Knud Knudsen fornorskar steg for steg</div>
            <div class="boks">Riksmål</div>
            <div class="pil">↓ nytt namn 1929</div>
            <div class="boks sterk">Bokmål</div>
          </div>
        </div>`,
      notes: "Dette er same figur som i modulen. Gå gjennom han frå toppen: to utgangspunkt, to metodar, to resultat. I midten står det som skjedde mellom dei. Be elevane forklare figuren til sidemannen: den som klarer det, har forstått heile modulen.",
    },
    {
      type: "sporsmal",
      question: "Kva år fekk landsmål og riksmål namna nynorsk og bokmål?",
      options: ["1885", "1907", "1929", "1981"],
      correct: 2,
      explain: "Begge fekk nye namn i 1929. Språka var dei same.",
      notes: "Peik i figuren: nytt namn 1929 står på begge linene.",
    },
    {
      type: "diskuter",
      title: "Éitt felles skriftspråk?",
      prompt: `<p class="stor">Burde Noreg hatt éitt felles skriftspråk?</p>
        <p>Finn eitt argument <strong>for</strong> og eitt <strong>mot</strong>.</p>`,
      form: "Grupper på tre",
      tid: 4,
      svar: "For: det kunne vore enklare og spart tid å lære eitt skriftspråk. Mot: mange opplevde at reformene gjorde skriftspråket framandt for dei, fordi språk handlar om identitet.",
      notes: "Dette førebur drøftingsoppgåva i modulen, der elevane skal gi eitt argument for, eitt mot og eit eige standpunkt. Skriv argumenta på tavla, så dei kan bruke dei når dei skriv. Pass på at begge sider får plass: målet er å argumentere sakleg, ikkje å vinne.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les fagteksten og sjå på figuren med dei to linene.</li>
          <li>Gjer fleirval, para saman og fyll inn.</li>
          <li>Set om setninga til nynorsk.</li>
          <li>Les kjelda om foreldreaksjonen, og skriv drøftinga: 100 til 180 ord.</li>
        </ul>`,
      tid: 12,
      notes: "I omsetjingsoppgåva er både jamstilte og likestilte godtekne, men jamstilte er fagomgrepet frå 1885. Mange skriv være: minn om vere. I drøftinga bør elevane skilje mellom argument og eige standpunkt. Dei som blir ferdige, kan gå vidare til modulen om nynorsk i dag.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\"><strong>Aasen</strong>: frå dialektane. <strong>Knudsen</strong>: fornorska dansk.</p>",
        "<p class=\"stor\"><strong>1885</strong>: jamstilte skriftspråk</p>",
        "<p class=\"stor\"><strong>Samnorsk</strong>: ein politikk, oppgitt i <strong>1981</strong></p>",
        "<p class=\"stor\">Språk handlar om <strong>identitet</strong>.</p>",
      ],
      notes: "Be elevane skrive ned det dei synest var mest overraskande i dag på ein lapp. Mange nemner foreldra som retta lærebøkene.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen viser korleis Noreg fekk to skriftspråk. Knud Knudsen (1812–1895) ville fornorske dansk skrift steg for steg, og den lina vart riksmål og seinare bokmål, medan lina til Aasen vart landsmål og seinare nynorsk. I 1885 jamstilte Stortinget dei to skriftspråka. Frå tidleg 1900-tal prøvde styresmaktene å føre dei saman til samnorsk gjennom reformene i 1907, 1917 og 1938. Foreldreaksjonen mot samnorsk frå slutten av 1940-talet viste kor sterke kjensler språk vekkjer, og i 1981 vart samnorskpolitikken oppgitt. Poenget er at språk handlar om identitet, ikkje berre om reglar.</p>",
    mal: [
      "Elevane kan samanlikne metodane til Ivar Aasen og Knud Knudsen og kva dei førte til.",
      "Elevane kan forklare kva jamstillingsvedtaket i 1885 innebar.",
      "Elevane kan forklare kva samnorskpolitikken var, kvifor han møtte motstand og korleis han enda.",
      "Elevane kan drøfte om Noreg burde hatt eitt felles skriftspråk, med argument for og mot.",
    ],
    lareplan: [15, 16, 9, 10, 11],
    forkunnskapar: "Elevane bør ha arbeidd med dei tidlegare modulane i Del 1, særleg Norsk språk før 1850 (embetsmannsspråket) og Ivar Aasen og landsmålet.",
    forebuing: [
      "Test presentasjonen på tavla, særleg tabellen på lysbilete 5 og figuren med dei to linene på lysbilete 15.",
      "Ha ein stad på tavla klar for argumenta frå samtalen på lysbilete 17, så elevane kan bruke dei i drøftinga.",
      "Ha lappar klare til oppsummeringa.",
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane velje mellom dei to vegane til eit norsk skriftspråk.</p>", lysbilete: "2 og 3" },
      { fase: "To liner", min: 6, gjer: "<p>Presenter Knud Knudsen, samanlikn han med Aasen i tabellen og ta kontrollspørsmålet.</p>", lysbilete: "4 til 6" },
      { fase: "1885", min: 3, gjer: "<p>Forklar jamstillingsvedtaket og rydd opp i misforståinga om at alle måtte skrive landsmål.</p>", lysbilete: "7 og 8" },
      { fase: "Samnorsk og foreldreaksjonen", min: 8, gjer: "<p>Forklar samnorskpolitikken, la elevane tenkje seg inn i situasjonen, og fortel om foreldreaksjonen. Snakk om sitatet om identitet.</p>", lysbilete: "9 til 12" },
      { fase: "1981 og oversikta", min: 4, gjer: "<p>Fortel korleis samnorskpolitikken enda, ta spørsmåla og gå gjennom figuren med dei to linene.</p>", lysbilete: "13 til 16" },
      { fase: "Drøfting", min: 5, gjer: "<p>Gruppene finn argument for og mot eitt felles skriftspråk. Skriv dei på tavla.</p>", lysbilete: "17" },
      { fase: "Eigenarbeid", min: 12, gjer: "<p>Elevane arbeider i modulen og skriv drøftinga til slutt.</p>", lysbilete: "18" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive kva som overraska dei mest.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Samnorsk er eit språk som finst.»", hjelp: "Samnorsk var ein politikk som ville føre bokmål og nynorsk saman. Han vart aldri gjennomført fullt ut og vart avslutta i 1981." },
      { feil: "«Bokmål er dansk.»", hjelp: "Bokmål byggjer på dansk skrift, men er fornorska steg for steg etter lina til Knud Knudsen. Vis figuren med dei to linene." },
      { feil: "«I 1885 måtte alle byrje å skrive landsmål.»", hjelp: "Jamstilling tyder at begge skriftspråka vart likeverdige i skule og forvaltning. Ingen vart tvinga til å bruke landsmål." },
      { feil: "«Språkstriden handla berre om rettskriving.»", hjelp: "Bruk sitatet frå leseteksten: striden viste at språk handlar om identitet. Folk opplevde at endringar i skriftspråket endra noko ved dei sjølve." },
    ],
    samtale: [
      "Kva hadde Aasen og Knudsen felles, sjølv om dei gjekk kvar sin veg?",
      "Kvifor trur du foreldra reagerte så sterkt at dei retta lærebøkene med blekk?",
      "Kva meiner vi når vi seier at språk handlar om identitet?",
      "Ville det vore betre eller verre for deg om Noreg hadde hatt eitt felles skriftspråk?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane figuren med dei to linene på papir, så dei kan skrive stikkord inn i han undervegs.",
        "Gi ein skrivemal til drøftinga: «Eit argument for er … Eit argument mot er … Eg meiner … fordi …».",
        "La elevane bruke argumenta frå tavla i staden for å finne eigne.",
      ],
      utfordring: [
        "Be elevane samanlikne striden om samnorsk med ein språkdebatt i dag, til dømes om sidemål eller om engelske ord i norsk.",
        "La elevane skrive drøftinga som eit lesarinnlegg frå 1950-talet, med rett tone for tida, men på moderne nynorsk.",
      ],
    },
    vurdering: [
      "Spørsmåla på tavla viser om elevane skil mellom jamstilling, samnorsk og dei to linene.",
      "Drøftinga i modulen viser om eleven kan gi argument for og mot og grunngi eit eige standpunkt sakleg.",
      "Kjenneteikn på god måloppnåing: eleven forklarar kva samnorsk var og kvifor politikken møtte motstand, samanliknar Aasen og Knudsen presist og skil mellom fakta og meining i drøftinga.",
    ],
    vidare: "Gå vidare til modulen Nynorsk i dag og den moderne debatten, som tek opp språklova, sidemålsdebatten og nynorsk i media. Samanlikninga av Aasen og Knudsen er òg ei eiga oppgåve i skrivemodulen til slutt i Del 1.",
  },
});
