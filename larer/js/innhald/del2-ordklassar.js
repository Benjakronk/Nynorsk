/* Lærarinnhald for Del 2 · Ordklassar: substantiv, verb, pronomen og adjektiv. Formatet står i larer/README.md. */

/* ======================================================================
   SUBSTANTIV: KJØNN OG BØYING
   ====================================================================== */
Larar.register("grammatikk-substantiv", {
  tittelnotat: "Substantivbøying er det elevane oftast bommar på i sidemålstekstar, og det er lett å rette når dei kan tre små mønster. Sei det høgt: når timen er over, skal de aldri meir skrive <em>jenten</em> eller <em>husene</em> på nynorsk.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>finne <strong>kjønnet</strong> på eit substantiv</li>
        <li>bøye i <strong>fire former</strong></li>
        <li>hugse endingane i <strong>hokjønn</strong> og <strong>inkjekjønn</strong></li>
        <li>unngå dei vanlegaste <strong>bokmålsfeila</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Minn elevane om at substantiv er namn på ting, personar, dyr, stader og omgrep, og at dei kan setje ein artikkel framfor: ein, ei eller eit.",
    },
    {
      type: "diskuter",
      title: "Ein, ei eller eit?",
      prompt: `<p class="stor midt"><em class="nn">bil</em> &nbsp;·&nbsp; <em class="nn">bok</em> &nbsp;·&nbsp; <em class="nn">hus</em> &nbsp;·&nbsp; <em class="nn">sol</em> &nbsp;·&nbsp; <em class="nn">eple</em> &nbsp;·&nbsp; <em class="nn">skog</em></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">ein bil, ei bok, eit hus, ei sol, eit eple, ein skog</em>",
      notes: "Lat elevane seie orda høgt med artikkel. Mange frå bokmålsområde seier «en bok» og «en sol» og har ikkje hokjønn i talemålet sitt. Det er heilt normalt. Poenget er at nynorsk alltid skil mellom tre kjønn, så vi må lære kva kjønn orda har.",
    },
    {
      title: "Tre kjønn",
      body: `<div class="kjonnkort">
          <div class="kort han"><span class="artikkel">ein</span><span class="ord">gut</span><span class="former">guten · gutar · gutane</span></div>
          <div class="kort ho"><span class="artikkel">ei</span><span class="ord">jente</span><span class="former">jenta · jenter · jentene</span></div>
          <div class="kort inkje"><span class="artikkel">eit</span><span class="ord">hus</span><span class="former">huset · hus · husa</span></div>
        </div>`,
      steps: [
        "<p class=\"stor midt\">Kjønnet styrer <strong>artikkelen</strong> og alle <strong>endingane</strong>.</p>",
      ],
      notes: "Peik på korta éin etter éin og les formene høgt. Understrek at kjønnet ikkje har noko med biologisk kjønn å gjere: <em>ei jente</em> er hokjønn, men det er òg <em>ei bok</em> og <em>ei sol</em>. Fargane på korta går att i heile modulen.",
    },
    {
      title: "Korleis finn eg kjønnet?",
      steps: [
        "<p class=\"stor\">1. Prøv med <em class=\"nn\">ein</em>, <em class=\"nn\">ei</em> og <em class=\"nn\">eit</em>. Kva høyrest rett ut?</p>",
        "<p class=\"stor\">2. Ord på <strong>-ing</strong> er ofte hokjønn: <em class=\"nn\">ei øving, ei samling</em></p>",
        "<p class=\"stor\">3. Er du usikker: slå opp i <strong>Nynorskordboka</strong>.</p>",
      ],
      notes: "Det finst ingen sikker regel som seier kva kjønn eit ord har, så ordboka er det viktigaste verktøyet. Vis gjerne ordbokene.no og slå opp eit ord saman, til dømes <em>sol</em>, og peik på at ordboka skriv «hokjønn» eller «f.» Elevar som seier «en» om hokjønnsord i talemålet, kan ikkje stole på øyret, og då er ordboka ekstra viktig.",
    },
    {
      type: "drill",
      title: "Kva kjønn har ordet?",
      intro: "Klassen svarer høgt med artikkelen før du viser svaret.",
      spec: { bank: "nouns", tasks: ["gender"], mode: "choice" },
      n: 6,
      notes: "Be elevane seie heile forma med artikkel, til dømes «ei bok», ikkje berre «hokjønn». Då trenar dei øyret samstundes. Trykk «Nye oppgåver» om klassen vil ha ein runde til.",
    },
    {
      title: "Fire former",
      body: `<table>
          <thead><tr><th></th><th>Ubest. eintal</th><th>Best. eintal</th><th>Ubest. fleirtal</th><th>Best. fleirtal</th></tr></thead>
          <tbody>
            <tr><td>Hankjønn</td><td><em class="nn">ein gut</em></td><td><em class="nn">gut<strong>en</strong></em></td><td><em class="nn">gut<strong>ar</strong></em></td><td><em class="nn">gut<strong>ane</strong></em></td></tr>
            <tr><td>Hokjønn</td><td><em class="nn">ei jente</em></td><td><em class="nn">jent<strong>a</strong></em></td><td><em class="nn">jent<strong>er</strong></em></td><td><em class="nn">jent<strong>ene</strong></em></td></tr>
            <tr><td>Inkjekjønn</td><td><em class="nn">eit hus</em></td><td><em class="nn">hus<strong>et</strong></em></td><td><em class="nn">hus</em></td><td><em class="nn">hus<strong>a</strong></em></td></tr>
          </tbody>
        </table>`,
      notes: "Gå gjennom kolonnane med spørsmål: ein, denne, mange, alle. <em>ein gut, denne guten, mange gutar, alle gutane.</em> Dei fire hjelpeorda gjer det lett å høyre kva form ein treng. Legg merke til at inkjekjønn ikkje får noka ending i ubestemt fleirtal: <em>mange hus</em>.",
    },
    {
      title: "Endingane du må hugse",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Hankjønn</h3><p class="stor">-en</p><p class="stor">-ar</p><p class="stor">-ane</p></div>
          <div class="boks"><h3>Hokjønn</h3><p class="stor">-a</p><p class="stor">-er</p><p class="stor">-ene</p></div>
          <div class="boks"><h3>Inkjekjønn</h3><p class="stor">-et</p><p class="stor">(inga)</p><p class="stor">-a</p></div>
        </div>`,
      steps: ["<p class=\"midt merk\">Hokjønn: <strong>-a</strong> i bestemt eintal. Inkjekjønn: <strong>-a</strong> i bestemt fleirtal.</p>"],
      notes: "Dette er lysbiletet elevane bør ta bilete av. Les kolonnane høgt i kor: «en, ar, ane». Dei to a-endingane i det siste steget er dei som oftast blir feil hos bokmålsbrukarar, så gjenta dei.",
    },
    {
      type: "sporsmal",
      question: "Kva er bestemt form eintal av <em class=\"nn\">ei bok</em>?",
      options: ["<em>boken</em>", "<em>boka</em>", "<em>boki</em>", "<em>bokene</em>"],
      correct: 1,
      explain: "<em class=\"nn\">bok</em> er hokjønn, og hokjønn får <em class=\"nn\">-a</em> i bestemt eintal: <em class=\"nn\">boka</em>. <em class=\"bm\">boken</em> er bokmål.",
      notes: "Lat elevane vise svaret med fingrane: ein til fire. Spør dei som vel <em>boken</em>: kva kjønn har ordet? Då ser dei feilen sjølve.",
    },
    {
      type: "drill",
      title: "Bøy substantivet",
      intro: "Sei forma høgt før du ser svaret.",
      spec: { bank: "nouns", tasks: ["defSg", "indefPl", "defPl"], mode: "mixed" },
      n: 6,
      notes: "Bruk hjelpeorda frå tabellen: denne, mange, alle. Når nokon svarar feil, spør: kva kjønn har ordet? Då finn dei som regel rett ending sjølve.",
    },
    {
      title: "Inkjekjønn: to mønster",
      body: `<div class="to-kol">
          <div class="boks"><h3>eit hus</h3><p class="stor"><em class="nn">huset · hus · husa</em></p></div>
          <div class="boks"><h3>eit eple</h3><p class="stor"><em class="nn">eplet · eple · epla</em></p></div>
        </div>`,
      steps: [
        "<p class=\"stor midt\">Ubestemt fleirtal: <strong>ingen ending</strong>. <em class=\"nn\">mange eple</em></p>",
        "<p class=\"stor midt\">Bestemt fleirtal: <strong>-a</strong>. <em class=\"nn\">alle epla</em></p>",
      ],
      notes: "Ord som <em>eple</em> endar på -e, og då fell -e bort før endinga: <em>epl-et, epl-a</em>. Det same gjeld <em>eit rike, eit stykke</em>. Bokmål seier <em>epler</em> og <em>eplene</em>, så her bommar mange. Andre vanlege ord i same gruppe: <em>barn, år, tre, dyr</em>.",
    },
    {
      type: "sporsmal",
      question: "Eg har kjøpt tre ___ .",
      options: ["<em>epler</em>", "<em>eplar</em>", "<em>eple</em>", "<em>epla</em>"],
      correct: 2,
      explain: "<em class=\"nn\">eple</em> er inkjekjønn, og inkjekjønn har inga ending i ubestemt fleirtal: <em class=\"nn\">tre eple</em>. <em class=\"nn\">epla</em> er bestemt form: <em class=\"nn\">epla er raude</em>.",
      notes: "Mange vel <em>epla</em> fordi dei hugsar at inkjekjønn har -a i fleirtal. Spør då: er det bestemt eller ubestemt form? «Tre eple» er ubestemt, «epla» tyder «dei bestemte epla».",
    },
    {
      title: "Hokjønn med vokalskifte",
      body: `<table>
          <thead><tr><th>Ubest. eintal</th><th>Best. eintal</th><th>Ubest. fleirtal</th><th>Best. fleirtal</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">ei bok</em></td><td><em class="nn">boka</em></td><td><em class="nn">b<strong>ø</strong>ker</em></td><td><em class="nn">b<strong>ø</strong>kene</em></td></tr>
            <tr><td><em class="nn">ei hand</em></td><td><em class="nn">handa</em></td><td><em class="nn">h<strong>e</strong>nder</em></td><td><em class="nn">h<strong>e</strong>ndene</em></td></tr>
            <tr><td><em class="nn">ei natt</em></td><td><em class="nn">natta</em></td><td><em class="nn">n<strong>e</strong>tter</em></td><td><em class="nn">n<strong>e</strong>ttene</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Vokalen skifter i fleirtal, men endingane er som vanleg hokjønn.</p>"],
      notes: "Dette kallar vi omlyd. Det er berre ei lita gruppe ord, og elevane kjenner dei frå bokmål: <em>bøker, hender, netter</em>. Det nye er eintalsforma <em>boka, handa, natta</em>.",
    },
    {
      title: "Bokmål eller nynorsk?",
      body: `<table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">jenten</em></td><td><em class="nn">jenta</em></td></tr>
            <tr><td><em class="bm">boken</em></td><td><em class="nn">boka</em></td></tr>
            <tr><td><em class="bm">husene</em></td><td><em class="nn">husa</em></td></tr>
            <tr><td><em class="bm">bilene</em></td><td><em class="nn">bilane</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\"><em class=\"nn\">bøkene</em> er likt på begge skriftspråka.</p>"],
      notes: "Dekk til høgre kolonne og lat elevane gjette nynorskforma før du viser steget. Poenget med <em>bøkene</em> er at elevane skal tenkje på kjønnet, ikkje berre byte ut alle -ene med -a: <em>bok</em> er hokjønn, og hokjønn har -ene i bestemt fleirtal.",
    },
    {
      type: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter forma på nynorsk?",
      spec: { bank: "nouns", tasks: ["fromBm"], mode: "mixed" },
      n: 6,
      notes: "Be elevane seie kjønnet på ordet før dei gir svaret. Då blir det tydeleg at det er kjønnet som avgjer endinga.",
    },
    {
      type: "diskuter",
      title: "Set om til nynorsk",
      prompt: `<p class="stor midt"><em class="bm">Jenten leste boken i hele dag.</em></p>`,
      form: "Skriv saman i par",
      tid: 3,
      svar: "<em class=\"nn\">Jenta las boka heile dagen.</em> (Òg rett: <em class=\"nn\">Jenta las boka i heile dag.</em>)",
      notes: "Denne setninga står òg i modulen. <em>lese</em> er eit sterkt verb: <em>lese, les, las, har lese</em>. Det kjem vi tilbake til i verbmodulen. Be eit par skrive svaret sitt på tavla, og la klassen rette.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les fagteksten og sorter substantiva etter kjønn.</li>
          <li>Gjer utfyllingsoppgåvene i bestemt eintal og fleirtal.</li>
          <li>Skriv fem setningar med ord frå alle tre kjønna.</li>
        </ul>`,
      tid: 15,
      notes: "Gå rundt og spør: kva kjønn har ordet, og korleis veit du det? Oppmuntre elevane til å slå opp i Nynorskordboka når dei er usikre. Dei som blir tidleg ferdige, kan gå vidare til mengdetreninga Substantiv: kjønn og bøying.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Nynorsk har <strong>tre kjønn</strong>: <em class=\"nn\">ein, ei, eit</em>.</p>",
        "<p class=\"stor\">Hokjønn: <em class=\"nn\">jent<strong>a</strong></em>, ikkje <em class=\"bm\">jenten</em>.</p>",
        "<p class=\"stor\">Inkjekjønn: <em class=\"nn\">hus<strong>a</strong></em>, ikkje <em class=\"bm\">husene</em>.</p>",
        "<p class=\"stor\">Usikker på kjønnet? <strong>Slå opp.</strong></p>",
      ],
      notes: "Be elevane skrive eitt hokjønnsord og eitt inkjekjønnsord i alle fire formene på ein lapp dei leverer i døra. Då ser du raskt kven som treng meir hjelp.",
    },
  ],
  guide: {
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen tek for seg dei tre kjønna i nynorsk og korleis substantiva blir bøygde i ubestemt og bestemt form, eintal og fleirtal. Elevar med bokmål som hovudmål bommar særleg på to endingar: <em class=\"nn\">-a</em> i bestemt eintal hokjønn (<em class=\"nn\">jenta</em>) og <em class=\"nn\">-a</em> i bestemt fleirtal inkjekjønn (<em class=\"nn\">husa</em>). Når desse sit, forsvinn ein stor del av feila i sidemålstekstane.</p>",
    mal: [
      "Elevane kan avgjere kjønnet på eit substantiv og bruke ordboka når dei er usikre.",
      "Elevane kan bøye substantiv i hankjønn, hokjønn og inkjekjønn i alle fire formene.",
      "Elevane kan bøye inkjekjønnsord rett i fleirtal (<em class=\"nn\">hus, husa, eple, epla</em>).",
      "Elevane kan rette typiske bokmålsformer som <em class=\"bm\">jenten</em> og <em class=\"bm\">husene</em>.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør vite kva eit substantiv er. Modulen Ordklassane: ei oversikt og bøyingsdelen av grunnomgrepa i Del 2 gir eit godt grunnlag, men modulen kan òg brukast åleine.",
    forebuing: [
      "Test presentasjonen på tavla, særleg dei tre tavleøvingane på lysbilete 6, 10 og 15.",
      "Ha ordbokene.no opne i ei eiga fane, så du kan slå opp ord saman med klassen.",
      "Ha små lappar klare til exit-lappen til slutt.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og lat elevane seie ein, ei eller eit om seks ord.</p>", lysbilete: "2 og 3" },
      { fase: "Kjønn", min: 10, gjer: "<p>Vis kjønnskorta, snakk om korleis ein finn kjønnet, og køyr tavleøvinga om kjønn.</p>", lysbilete: "4 til 6" },
      { fase: "Bøying", min: 14, gjer: "<p>Gå gjennom tabellen og endingane, ta spørsmålet om <em class=\"nn\">boka</em> og køyr ein tavlerunde med bøying.</p>", lysbilete: "7 til 10" },
      { fase: "Inkjekjønn, omlyd og bokmål", min: 13, gjer: "<p>Vis dei to inkjekjønnsmønstra, hokjønnsorda med vokalskifte og bokmålsfeila. Avslutt med tavleøving og omsetjing i par.</p>", lysbilete: "11 til 16" },
      { fase: "Eigenarbeid", min: 14, gjer: "<p>Elevane arbeider i modulen. Dei som blir ferdige, går vidare til mengdetreninga.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 4, gjer: "<p>Oppsummer og lat elevane skrive eit hokjønnsord og eit inkjekjønnsord i alle fire formene på ein exit-lapp.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Det heiter <em>jenten</em> og <em>boken</em>.»", hjelp: "Spør kva kjønn ordet har. Hokjønn får alltid <em class=\"nn\">-a</em> i bestemt eintal: <em class=\"nn\">jenta, boka, sola</em>." },
      { feil: "«Inkjekjønn får -ene i bestemt fleirtal, som på bokmål.»", hjelp: "Inkjekjønn får <em class=\"nn\">-a</em>: <em class=\"nn\">husa, barna, epla</em>. Lat elevane seie «alle husa» høgt til det sit." },
      { feil: "«Alle ord som endar på -e, er hokjønn.»", hjelp: "Vis motdøme: <em class=\"nn\">ein hage</em> er hankjønn og <em class=\"nn\">eit eple</em> er inkjekjønn. Kjønnet står i ordboka, ikkje i endinga." },
      { feil: "«Kjønnet har med biologisk kjønn å gjere.»", hjelp: "Grammatisk kjønn er ein ordklasse, ikkje eit biologisk kjønn. <em class=\"nn\">ei bok</em> og <em class=\"nn\">ei sol</em> er hokjønn, <em class=\"nn\">eit barn</em> er inkjekjønn." },
    ],
    samtale: [
      "Har du hokjønn i talemålet ditt? Seier du «boka» eller «boken»?",
      "Kvifor trur du nynorsk har tre kjønn medan mange bokmålsbrukarar berre bruker to?",
      "Kva gjer du når du ikkje veit kva kjønn eit ord har?",
      "Finst det språk du kan som har kjønn på substantiva, og korleis fungerer det der?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein huskelapp med dei tre kjønnskorta og endingane.",
        "Lat elevane bruke hjelpeorda ein, denne, mange, alle når dei bøyer.",
        "Start med vanlege ord dei kjenner godt, som <em class=\"nn\">gut, jente, hus</em>.",
      ],
      utfordring: [
        "Lat elevane finne fem hokjønnsord og fem inkjekjønnsord i ein nynorsktekst frå Del 5 og bøye dei.",
        "Be elevane undersøkje ord med særleg bøying i Nynorskordboka, til dømes <em class=\"nn\">ein fot</em> (<em class=\"nn\">føter</em>) og <em class=\"nn\">ein bror</em> (<em class=\"nn\">brør</em>).",
      ],
    },
    vurdering: [
      "Tavleøvingane viser raskt om klassen har skjønt kjønn og endingar.",
      "Skriveoppgåva i modulen viser om eleven brukar alle tre kjønna og bøyer rett i eigen tekst.",
      "Kjenneteikn på god måloppnåing: eleven bøyer hokjønns- og inkjekjønnsord rett utan hjelp og slår opp kjønnet når han eller ho er usikker.",
    ],
    vidare: "Følg opp med mengdetreninga Substantiv: kjønn og bøying i Del 2. Adjektivmodulen byggjer vidare på kjønna, sidan adjektivet rettar seg etter kjønnet til substantivet.",
  },
});

/* ======================================================================
   VERB: STERKE OG SVAKE
   ====================================================================== */
Larar.register("grammatikk-verb", {
  tittelnotat: "Verbbøying er den andre store feilkjelda i sidemålstekstar, særleg presens av a-verb (<em>kastar</em>) og preteritum av sterke verb. Fortel elevane at dei kan mykje av dette frå før: dei sterke verba liknar på bokmål og engelsk.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>bøye verb i <strong>presens, preteritum og perfektum</strong></li>
        <li>skilje <strong>svake</strong> og <strong>sterke</strong> verb</li>
        <li>hugse <strong>-ar</strong> i presens av a-verb</li>
        <li>lære dei vanlegaste <strong>sterke verba</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Minn elevane om at verb er ord for handlingar og hendingar, og at dei står etter «å» i infinitiv: <em>å kaste, å skrive</em>.",
    },
    {
      type: "diskuter",
      title: "Kva gjorde du i går?",
      prompt: `<p class="stor">Sei tre setningar om kva du gjorde i går.</p><p><em class="nn">I går <strong>åt</strong> eg …</em></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "Skriv nokre av verba på tavla. Vi sorterer dei etterpå: fekk verbet ei ending, eller skifte det vokal?",
      notes: "Skriv verba elevane seier på tavla i preteritum, og gjer dei om til nynorsk om dei kjem på bokmål. Behald lista: du kan bruke henne når de kjem til svake og sterke verb på lysbilete 6.",
    },
    {
      title: "Tempus: tidene",
      body: `<div class="tempuslinje">
          <div class="tl-akse"><span class="tl-fortid">fortid</span><span class="tl-no">no</span><span class="tl-framtid">framtid</span></div>
          <div class="tl-punkt" style="--x: 8%"><b>hadde kasta</b><small>preteritum perfektum: ferdig før noko anna i fortida</small></div>
          <div class="tl-punkt" style="--x: 30%"><b>kasta</b><small>preteritum: i går</small></div>
          <div class="tl-punkt tl-bru" style="--x: 50%"><b>har kasta</b><small>presens perfektum: har skjedd, og gjeld framleis no</small></div>
          <div class="tl-punkt tl-naa" style="--x: 64%"><b>kastar</b><small>presens: no, vanlegvis</small></div>
          <div class="tl-punkt" style="--x: 88%"><b>skal kaste</b><small>framtid: med hjelpeverb</small></div>
        </div>`,
      steps: ["<p class=\"midt\">Perfektum = <em class=\"nn\">har</em> + <strong>perfektum partisipp</strong></p>"],
      notes: "Hugsereglane: presens er no eller vanlegvis, preteritum er i går, perfektum er «har gjort». I modulen øver elevane på dei tre formene presens, preteritum og perfektum partisipp. Når dei kan dei tre, kan dei lage alle tidene, for preteritum perfektum er berre <em>hadde</em> + den same partisippen.",
    },
    {
      title: "Svake og sterke verb",
      body: `<div class="vokalskifte" data-spel>
          <div class="vs-rad svak"><span class="vs-namn">svakt verb: ending</span><span class="vs-form">kast<b>ar</b></span><span class="vs-pil">→</span><span class="vs-form">kast<b>a</b></span><span class="vs-pil">→</span><span class="vs-form">har kast<b>a</b></span></div>
          <div class="vs-rad sterk"><span class="vs-namn">sterkt verb: vokalskifte</span><span class="vs-form">skr<b>i</b>v</span><span class="vs-pil">→</span><span class="vs-form">skr<b>ei</b>v</span><span class="vs-pil">→</span><span class="vs-form">har skr<b>i</b>ve</span></div>
          <div class="vs-rad sterk"><span class="vs-namn"></span><span class="vs-form">f<b>i</b>nn</span><span class="vs-pil">→</span><span class="vs-form">f<b>a</b>nn</span><span class="vs-pil">→</span><span class="vs-form">har f<b>u</b>nne</span></div>
        </div>`,
      notes: "Svake verb får ei ending i preteritum. Sterke verb skifter vokal og får inga ending i preteritum. Peik på dei utheva bokstavane: hos det svake verbet er det endinga som endrar seg, hos dei sterke er det vokalen inne i ordet.",
    },
    {
      title: "Testen: sei «i går»",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">I går kast<strong>a</strong> eg ballen.</em> → ending → <strong>svakt</strong></p>",
        "<p class=\"stor\"><em class=\"nn\">I går høyr<strong>de</strong> eg musikk.</em> → ending → <strong>svakt</strong></p>",
        "<p class=\"stor\"><em class=\"nn\">I går skr<strong>ei</strong>v eg ein tekst.</em> → vokalskifte → <strong>sterkt</strong></p>",
      ],
      notes: "Gå tilbake til lista frå byrjinga av timen og sorter verba der med same test. Svake verb endar på -a, -de, -te eller -dde i preteritum. Sterke verb har ingen slik ending.",
    },
    {
      title: "Svake verb: fire klassar",
      body: `<table>
          <thead><tr><th>Klasse</th><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perf. part.</th></tr></thead>
          <tbody>
            <tr><td>a-verb</td><td><em class="nn">å kaste</em></td><td><em class="nn">kast<strong>ar</strong></em></td><td><em class="nn">kast<strong>a</strong></em></td><td><em class="nn">har kast<strong>a</strong></em></td></tr>
            <tr><td>e-verb</td><td><em class="nn">å høyre</em></td><td><em class="nn">høyr<strong>er</strong></em></td><td><em class="nn">høyr<strong>de</strong></em></td><td><em class="nn">har høyr<strong>t</strong></em></td></tr>
            <tr><td>j-verb</td><td><em class="nn">å spørje</em></td><td><em class="nn">spør</em></td><td><em class="nn">spur<strong>de</strong></em></td><td><em class="nn">har spur<strong>t</strong></em></td></tr>
            <tr><td>kortverb</td><td><em class="nn">å bu</em></td><td><em class="nn">bu<strong>r</strong></em></td><td><em class="nn">bu<strong>dde</strong></em></td><td><em class="nn">har bu<strong>dd</strong></em></td></tr>
          </tbody>
        </table>`,
      notes: "Klassane har namn etter endinga: a-verba har -a, e-verba har -er i presens. Kurset bruker e-infinitiv (<em>å kaste</em>), men a-infinitiv (<em>å kasta</em>) er òg rett nynorsk. Nemn det om nokon har det i talemålet, men lat elevane halde seg til éi form i same tekst.",
    },
    {
      title: "a-verb: -ar i presens",
      body: `<p class="kjempe midt"><em class="nn">Eg kast<strong>ar</strong> ballen.</em></p>`,
      steps: [
        "<p class=\"stor midt\">ikkje <em class=\"bm\">kaster</em></p>",
        "<p class=\"midt\">Tips: <em class=\"bm\">kastet</em> på bokmål gir ofte eit a-verb: <em class=\"nn\">kasta, kastar</em></p>",
      ],
      notes: "Dette er den vanlegaste verbfeilen i sidemålstekstar: elevane skriv <em>kaster, snakker, hopper</em>. A-verba er den største gruppa, og alle har -ar i presens. Tipset i siste steget er ein peikepinn, ikkje ein regel: <em>svare</em> er eit a-verb på nynorsk (<em>svarar, svara</em>) sjølv om bokmål ofte har <em>svarte</em>. Er du usikker, slå opp.",
    },
    {
      type: "sporsmal",
      question: "Vel rett presensform: <em class=\"nn\">Kari ___ med venninna si.</em> (å snakke)",
      options: ["<em>snakker</em>", "<em>snakkar</em>", "<em>snakka</em>", "<em>snakke</em>"],
      correct: 1,
      explain: "<em class=\"nn\">snakke</em> er eit a-verb og får <em class=\"nn\">-ar</em> i presens: <em class=\"nn\">snakkar</em>. <em class=\"nn\">snakka</em> er preteritum.",
      notes: "Spør dei som vel <em>snakka</em>: skjer det no eller i går? Presens er no, så det må vere <em>snakkar</em>.",
    },
    {
      type: "drill",
      title: "Presens av svake verb",
      intro: "Sei presensforma høgt: <em class=\"nn\">Eg … no.</em>",
      spec: { bank: "verbs", filter: { cls: ["a", "e", "j", "kort"] }, tasks: ["pres"], mode: "mixed" },
      n: 6,
      notes: "Lat elevane setje verbet inn i ei setning, til dømes «Eg … kvar dag». Når dei høyrer setninga, merkar dei ofte sjølve om -ar eller -er er rett.",
    },
    {
      title: "e-verb, j-verb og kortverb",
      body: `<div class="tre-kol">
          <div class="boks"><h3>e-verb</h3><p><em class="nn">kjøper · kjøp<strong>te</strong> · kjøp<strong>t</strong></em></p><p><em class="nn">lærer · lær<strong>te</strong> · lær<strong>t</strong></em></p></div>
          <div class="boks"><h3>j-verb</h3><p><em class="nn">spør · spur<strong>de</strong> · spur<strong>t</strong></em></p><p><em class="nn">vel · val<strong>de</strong> · val<strong>t</strong></em></p></div>
          <div class="boks"><h3>kortverb</h3><p><em class="nn">bur · bu<strong>dde</strong> · bu<strong>dd</strong></em></p><p><em class="nn">trur · tru<strong>dde</strong> · tru<strong>dd</strong></em></p></div>
        </div>`,
      notes: "e-verba får -de eller -te i preteritum og -d eller -t i perfektum partisipp. j-verba mistar j-en utanom i infinitiv: <em>å spørje, spør; å velje, vel</em>. Kortverba er korte ord som endar på vokal: <em>bu, tru, nå, sy</em>. Dei får -r i presens og -dde i preteritum.",
    },
    {
      type: "drill",
      title: "Kva klasse er verbet?",
      intro: "Bøy verbet i hovudet først: «i går …»",
      spec: { bank: "verbs", tasks: ["cls"], mode: "choice" },
      n: 6,
      notes: "Be elevane seie preteritumsforma høgt før dei vel klasse. Det er preteritum som avslører klassen: -a gir a-verb, -de eller -te gir e-verb, vokalskifte gir sterkt verb.",
    },
    {
      title: "Sterke verb: lær dei utanåt",
      body: `<table>
          <thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perf. part.</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">å skrive</em></td><td><em class="nn">skriv</em></td><td><em class="nn">skreiv</em></td><td><em class="nn">har skrive</em></td></tr>
            <tr><td><em class="nn">å finne</em></td><td><em class="nn">finn</em></td><td><em class="nn">fann</em></td><td><em class="nn">har funne</em></td></tr>
            <tr><td><em class="nn">å gå</em></td><td><em class="nn">går</em></td><td><em class="nn">gjekk</em></td><td><em class="nn">har gått</em></td></tr>
            <tr><td><em class="nn">å vere</em></td><td><em class="nn">er</em></td><td><em class="nn">var</em></td><td><em class="nn">har vore</em></td></tr>
            <tr><td><em class="nn">å sjå</em></td><td><em class="nn">ser</em></td><td><em class="nn">såg</em></td><td><em class="nn">har sett</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Som «irregular verbs» i engelsk: 20 til 30 vanlege verb dekkjer det meste.</p>"],
      notes: "Les rekkjene høgt i kor, gjerne i rytme: «skrive, skriv, skreiv, har skrive». Legg merke til at mange sterke verb ikkje får ending i presens: <em>skriv, finn</em>. Perfektum partisipp endar ofte på -e: <em>skrive, funne</em>. Merk òg <em>gjekk</em> og <em>vore</em>, som skil seg mykje frå bokmål.",
    },
    {
      type: "drill",
      title: "Preteritum av sterke verb",
      intro: "Kva gjorde du i går?",
      spec: { bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pret"], mode: "type" },
      n: 6,
      notes: "Her kjem ingen alternativ, så klassen må hente forma fram sjølv. Lat alle skrive svaret på ein kladdelapp eller ei mini-tavle før du viser løysinga.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett perfektum av <em class=\"nn\">å skrive</em>?",
      options: ["<em>har skreiv</em>", "<em>har skrive</em>", "<em>har skrivd</em>", "<em>har skrivet</em>"],
      correct: 1,
      explain: "Sterke verb har eiga perfektumsform: <em class=\"nn\">skrive, skriv, skreiv, har skrive</em>. <em class=\"bm\">skrevet</em> er bokmål.",
      notes: "<em>har skreiv</em> blandar preteritum og perfektum. <em>har skrivet</em> kjem av bokmål <em>skrevet</em>. Spør elevane kvifor kvart av dei gale svara kan verke freistande.",
    },
    {
      title: "Skilnader frå bokmål",
      steps: [
        "<p class=\"stor\"><em class=\"bm\">spise</em> → <em class=\"nn\">ete, et, åt, har ete</em></p>",
        "<p class=\"stor\"><em class=\"bm\">gjør</em> → <em class=\"nn\">gjere, gjer, gjorde, har gjort</em></p>",
        "<p class=\"stor\"><em class=\"bm\">sier</em> → <em class=\"nn\">seie, seier, sa, har sagt</em></p>",
        "<p class=\"stor\"><em class=\"bm\">gikk</em> → <em class=\"nn\">gjekk</em> &nbsp;·&nbsp; <em class=\"bm\">så</em> → <em class=\"nn\">såg</em></p>",
      ],
      notes: "Desse verba er så vanlege at dei dukkar opp i nesten alle tekstar. <em>ete</em> er det vanlege nynorske ordet, så bruk det. Lat elevane lage ei setning med kvart verb i preteritum.",
    },
    {
      type: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter verbforma på nynorsk?",
      spec: { bank: "verbs", tasks: ["fromBm"], mode: "mixed" },
      n: 5,
      notes: "Be elevane seie heile rekkja for verbet når dei har svart: infinitiv, presens, preteritum, perfektum. Då øver dei på heile mønsteret, ikkje berre éi form.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Sorter verba og gjer utfyllingsoppgåvene i presens, preteritum og perfektum.</li>
          <li>Set om <em class="bm">Vi gikk hjem og spiste middag.</em></li>
          <li>Skriv ein dag-tekst med minst fem verb i preteritum.</li>
        </ul>`,
      tid: 15,
      notes: "Gå rundt og les dag-tekstane. Når du finn ein feil, peik på verbet og spør: er det svakt eller sterkt? Dei som blir tidleg ferdige, kan gå vidare til mengdetreninga Verb: tider og klassar.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\"><strong>Svake</strong> verb får ending: <em class=\"nn\">kasta, høyrde</em></p>",
        "<p class=\"stor\"><strong>Sterke</strong> verb skifter vokal: <em class=\"nn\">skreiv, fann</em></p>",
        "<p class=\"stor\">a-verb: <em class=\"nn\">kast<strong>ar</strong></em> i presens</p>",
        "<p class=\"stor\">Lær dei vanlegaste sterke verba <strong>utanåt</strong>.</p>",
      ],
      notes: "Be elevane skrive ned tre sterke verb dei vil lære seg denne veka, med alle formene. Følg opp med ein kort munnleg test i neste time.",
    },
  ],
  guide: {
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen gir elevane oversikt over verbsystemet i nynorsk: dei fire klassane av svake verb (a-verb, e-verb, j-verb og kortverb) og dei sterke verba med vokalskifte. Dei viktigaste feilkjeldene er presens av a-verb (<em class=\"bm\">kaster</em> i staden for <em class=\"nn\">kastar</em>) og preteritum og perfektum av sterke verb. Elevane lærer ein enkel test for å skilje svake og sterke verb og øver på dei vanlegaste verba som skil seg frå bokmål.</p>",
    mal: [
      "Elevane kan bøye verb i presens, preteritum og perfektum.",
      "Elevane kan skilje svake og sterke verb med «i går»-testen.",
      "Elevane kan bruke <em class=\"nn\">-ar</em> i presens av a-verb.",
      "Elevane kan bøye vanlege sterke verb og verb som skil seg frå bokmål, som <em class=\"nn\">ete, gjere, seie</em>.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør vite kva eit verb er og kjenne omgrepa infinitiv, presens og preteritum. Bøyingsdelen av grunnomgrepa i Del 2 dekkjer tempus grundigare.",
    forebuing: [
      "Test presentasjonen på tavla, særleg tempuslinja på lysbilete 4 og tavleøvingane.",
      "Førebu ei liste med 20 til 30 vanlege sterke verb som elevane kan få med seg.",
      "Ha kladdelappar eller mini-tavler klare til tavleøvinga utan alternativ på lysbilete 14.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og lat elevane fortelje kva dei gjorde i går. Skriv verba på tavla.</p>", lysbilete: "2 og 3" },
      { fase: "Tempus, svake og sterke verb", min: 9, gjer: "<p>Vis tempuslinja, skilnaden på ending og vokalskifte, og bruk «i går»-testen på lista frå oppstarten.</p>", lysbilete: "4 til 6" },
      { fase: "Svake verb", min: 14, gjer: "<p>Gå gjennom dei fire klassane med vekt på -ar i presens av a-verb. Ta spørsmålet og to tavleøvingar.</p>", lysbilete: "7 til 12" },
      { fase: "Sterke verb og bokmål", min: 13, gjer: "<p>Les dei sterke verba i kor, køyr tavleøving utan alternativ, ta perfektumsspørsmålet og gå gjennom verba som skil seg mest frå bokmål.</p>", lysbilete: "13 til 17" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane arbeider i modulen og skriv dag-teksten. Dei som blir ferdige, går vidare til mengdetreninga.</p>", lysbilete: "18" },
      { fase: "Avslutning", min: 4, gjer: "<p>Oppsummer og lat elevane velje tre sterke verb dei skal lære utanåt.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Presens heiter <em>kaster</em> på nynorsk òg.»", hjelp: "a-verba har <em class=\"nn\">-ar</em> i presens: <em class=\"nn\">kastar, snakkar, hoppar</em>. Samanlikn med preteritum <em class=\"nn\">kasta</em>: presens har ein ekstra r." },
      { feil: "«<em>har skreiv</em> er perfektum.»", hjelp: "Perfektum er <em class=\"nn\">har</em> + perfektum partisipp, og for sterke verb er det ei eiga form: <em class=\"nn\">har skrive</em>. Lat elevane seie heile rekkja høgt." },
      { feil: "«Alle verb får -te eller -de i preteritum.»", hjelp: "Det gjeld berre e-verb og j-verb. a-verb får <em class=\"nn\">-a</em>, og sterke verb får inga ending: <em class=\"nn\">skreiv, fann, gjekk</em>." },
      { feil: "«<em>spiste</em> og <em>gikk</em> er nynorsk.»", hjelp: "Dei vanlege verba <em class=\"nn\">ete</em> og <em class=\"nn\">gå</em> har eigne former: <em class=\"nn\">åt</em> og <em class=\"nn\">gjekk</em>. Lag ei liste over dei verba eleven oftast bommar på." },
    ],
    samtale: [
      "Kvifor trur du dei sterke verba heiter sterke? Dei klarer seg utan ending.",
      "Kva sterke verb liknar på engelsk, og kva liknar på bokmål?",
      "Korleis kan du sjekke om eit verb er a-verb eller e-verb når du skriv?",
      "Kva verbfeil trur du lesaren legg mest merke til i ein nynorsktekst?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein huskelapp med dei fire klassane og ti sterke verb.",
        "Lat elevane alltid bøye i ei fast setning: «Eg … no. Eg … i går. Eg har …».",
        "Start med a-verb, som er den største og mest regelrette gruppa.",
      ],
      utfordring: [
        "Lat elevane finne ti verb i ein nynorsktekst frå Del 5, sortere dei i klassar og bøye dei.",
        "Be elevane samanlikne sterke verb i nynorsk, bokmål, engelsk og eit anna språk dei kan.",
      ],
    },
    vurdering: [
      "Tavleøvingane viser om klassen skil mellom presens og preteritum og kjenner dei sterke verba.",
      "Dag-teksten i modulen viser om eleven bruker preteritum rett i eigen tekst.",
      "Kjenneteikn på god måloppnåing: eleven bøyer a-verb rett i presens, kan dei vanlegaste sterke verba og rettar verbfeil i eigne tekstar.",
    ],
    vidare: "Følg opp med mengdetreninga Verb: tider og klassar i Del 2, og la elevane øve på dei sterke verba over fleire veker. Verb kjem att i Typiske feil i Del 4.",
  },
});

/* ======================================================================
   PRONOMEN OG SPØRJEORD
   ====================================================================== */
Larar.register("grammatikk-pronomen", {
  tittelnotat: "Pronomen og spørjeord er små ord som kjem att i nesten kvar setning. Difor blir feila synlege, men dei er òg lette å rette. Sei til elevane at i dag lærer dei ord som dei kjem til å bruke hundre gonger i kvar tekst.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>skilje <strong>subjektsform</strong> og <strong>objektsform</strong></li>
        <li>unngå fella <em class="nn">de</em> og <em class="nn">dei</em></li>
        <li>bøye <strong>eigedomspronomen</strong></li>
        <li>bruke rette <strong>spørjeord</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Forklar at pronomen er ord som står i staden for eit substantiv: <em>Kari kjem</em> blir <em>ho kjem</em>.",
    },
    {
      type: "diskuter",
      title: "Kva heiter dei på nynorsk?",
      prompt: `<p class="stor midt"><em class="bm">jeg</em> &nbsp;·&nbsp; <em class="bm">hun</em> &nbsp;·&nbsp; <em class="bm">dere</em> &nbsp;·&nbsp; <em class="bm">dem</em> &nbsp;·&nbsp; <em class="bm">hvorfor</em></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">eg, ho, de/dykk, dei, kvifor</em>",
      notes: "Dei fleste kan <em>eg</em> og <em>ho</em>. <em>dere</em> og <em>dem</em> er vanskelegare. Spar forklaringa: det er nettopp det timen handlar om. Legg merke til at <em>dere</em> har to svar, og spør om nokon veit kvifor.",
    },
    {
      title: "Subjekt og objekt",
      body: `<div class="pronomenpar">
          <div class="pp-par"><span class="ledd subjekt">eg</span><span class="pp-pil">→</span><span class="ledd objekt">meg</span></div>
          <div class="pp-par"><span class="ledd subjekt">du</span><span class="pp-pil">→</span><span class="ledd objekt">deg</span></div>
          <div class="pp-par"><span class="ledd subjekt">ho</span><span class="pp-pil">→</span><span class="ledd objekt">henne</span></div>
          <div class="pp-par"><span class="ledd subjekt">vi</span><span class="pp-pil">→</span><span class="ledd objekt">oss</span></div>
          <div class="pp-par"><span class="ledd subjekt">de</span><span class="pp-pil">→</span><span class="ledd objekt">dykk</span></div>
          <p class="pp-dome"><span class="ledd subjekt">Eg</span> ser <span class="ledd objekt">deg</span>. <span class="ledd subjekt">Du</span> ser <span class="ledd objekt">meg</span>.</p>
        </div>`,
      steps: ["<p class=\"midt\">Subjektet <strong>gjer</strong> noko. Objektet blir gjort noko <strong>med</strong>.</p>"],
      notes: "Fargane er dei same som i setningslæra: blått for subjekt, raudt for objekt. Byt om på døma: <em>Eg ser deg</em> og <em>Du ser meg</em>. Når personen byter rolle, byter pronomenet form.",
    },
    {
      title: "Alle personlege pronomen",
      body: `<table>
          <thead><tr><th></th><th>Subjekt</th><th>Objekt</th></tr></thead>
          <tbody>
            <tr><td>1. person eintal</td><td><em class="nn">eg</em></td><td><em class="nn">meg</em></td></tr>
            <tr><td>2. person eintal</td><td><em class="nn">du</em></td><td><em class="nn">deg</em></td></tr>
            <tr><td>3. person eintal</td><td><em class="nn">han, ho, det</em></td><td><em class="nn">han, henne, det</em></td></tr>
            <tr><td>1. person fleirtal</td><td><em class="nn">vi / me</em></td><td><em class="nn">oss</em></td></tr>
            <tr><td>2. person fleirtal</td><td><em class="nn">de</em></td><td><em class="nn">dykk</em></td></tr>
            <tr><td>3. person fleirtal</td><td><em class="nn">dei</em></td><td><em class="nn">dei</em></td></tr>
          </tbody>
        </table>`,
      notes: "Tre ting å peike på: <em>vi</em> og <em>me</em> er likestilte, så elevane kan velje, men bør halde seg til éi form i same tekst. <em>han</em> er både subjekt og objekt på nynorsk. <em>honom</em> er lov som objektsform, men sjeldan brukt. Bokmålsforma <em>ham</em> finst ikkje. I 2. person fleirtal er <em>dokker</em> òg tillate, både som subjekt og objekt.",
    },
    {
      title: "Fella: de og dei",
      body: `<div class="to-kol">
          <div class="boks"><h3>Nynorsk <em class="nn">de</em></h3><p class="stor">= bokmål <em class="bm">dere</em></p><p><em class="nn">Kjem de i kveld?</em></p></div>
          <div class="boks"><h3>Nynorsk <em class="nn">dei</em></h3><p class="stor">= bokmål <em class="bm">de / dem</em></p><p><em class="nn">Dei kjem i kveld.</em></p></div>
        </div>`,
      steps: ["<p class=\"midt merk\">Bokmål <em class=\"bm\">dem</em> finst ikkje på nynorsk.</p>"],
      notes: "Dette er den vanlegaste pronomenfeilen. Elevane skriv <em>de</em> fordi det ser ut som bokmål <em>de</em>, men då snakkar dei til lesaren i staden for om nokon andre. Spør: snakkar du <strong>til</strong> dei, eller <strong>om</strong> dei? Til: <em>de</em>. Om: <em>dei</em>.",
    },
    {
      type: "sporsmal",
      question: "Læraren seier til klassen: «Kan ___ opne bøkene?»",
      options: ["<em>de</em>", "<em>dei</em>", "<em>dykk</em>", "<em>dere</em>"],
      correct: 0,
      explain: "Læraren snakkar til klassen, og pronomenet er subjekt: <em class=\"nn\">de</em>. <em class=\"nn\">dykk</em> er objektsforma, og <em class=\"nn\">dei</em> brukar vi om andre.",
      notes: "Lat elevane vise svaret med fingrane. Følg opp med objektsforma: «Eg ser ___» gir <em>dykk</em>.",
    },
    {
      type: "drill",
      title: "Subjekt eller objekt?",
      intro: "Er pronomenet subjekt eller objekt i setninga?",
      spec: { bank: "sentences", set: ["pronomen"], mode: "choice" },
      n: 6,
      notes: "Be elevane grunngi svaret: gjer personen noko, eller blir noko gjort med han eller ho? Nokre oppgåver har bokmålsforma som alternativ, så elevane må sjå etter både funksjon og skriftspråk.",
    },
    {
      title: "Eigedomspronomen",
      body: `<div class="former" data-spel>
          <div class="form"><span class="etikett">hankjønn</span><span class="ordform">bilen <b>min</b></span></div>
          <div class="form"><span class="etikett">hokjønn</span><span class="ordform">boka <b>mi</b></span></div>
          <div class="form"><span class="etikett">inkjekjønn</span><span class="ordform">huset <b>mitt</b></span></div>
          <div class="form"><span class="etikett">fleirtal</span><span class="ordform">bøkene <b>mine</b></span></div>
        </div>`,
      steps: ["<p class=\"midt\">Eigedomspronomenet rettar seg etter <strong>substantivet</strong>, ikkje etter eigaren.</p>"],
      notes: "Same mønster gjeld <em>din, di, ditt, dine</em>. Legg merke til at eigedomspronomenet vanlegvis står etter substantivet, og at substantivet då står i bestemt form: <em>boka mi</em>. Hokjønnsforma <em>mi</em> er den som oftast forsvinn hos bokmålsbrukarar: dei skriv <em>boka min</em>. Hugs kjønnet frå substantivmodulen.",
    },
    {
      title: "Nokre bøyer seg ikkje",
      body: `<div class="to-kol">
          <div class="boks"><h3>Bøyer seg</h3><p class="stor"><em class="nn">min, mi, mitt, mine</em></p><p class="stor"><em class="nn">din, di, ditt, dine</em></p><p class="stor"><em class="nn">vår, vårt, våre</em></p></div>
          <div class="boks"><h3>Står i ro</h3><p class="stor"><em class="nn">hans</em></p><p class="stor"><em class="nn">hennar</em></p><p class="stor"><em class="nn">dykkar · deira</em></p></div>
        </div>`,
      notes: "<em>hennar, dykkar, deira</em> er dei nynorske formene av bokmål <em>hennes, deres</em>. Minn om fella frå i stad: <em>dykkar</em> høyrer til <em>de</em>, og <em>deira</em> høyrer til <em>dei</em>. <em>vår</em> har same form i hankjønn og hokjønn: <em>bilen vår, boka vår</em>.",
    },
    {
      type: "sporsmal",
      question: "Det er klokka ___ som ligg der.",
      options: ["<em>din</em>", "<em>di</em>", "<em>ditt</em>", "<em>dine</em>"],
      correct: 1,
      explain: "<em class=\"nn\">klokke</em> er hokjønn: <em class=\"nn\">ei klokke, klokka di</em>.",
      notes: "Spør først: kva kjønn har <em>klokke</em>? Når elevane har svart «hokjønn», er det lett å velje <em>di</em>.",
    },
    {
      title: "Spørjeord",
      body: `<table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">hva</em></td><td><em class="nn">kva</em></td></tr>
            <tr><td><em class="bm">hvem</em></td><td><em class="nn">kven</em></td></tr>
            <tr><td><em class="bm">hvor</em></td><td><em class="nn">kvar / kor</em></td></tr>
            <tr><td><em class="bm">hvordan</em></td><td><em class="nn">korleis</em></td></tr>
            <tr><td><em class="bm">hvorfor</em></td><td><em class="nn">kvifor</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Bokmål <em class=\"bm\">hv-</em> blir nynorsk <strong>kv-</strong> eller <strong>k-</strong>.</p>"],
      notes: "Mønsteret hv til kv hjelper for dei fleste, men <em>korleis</em> og <em>kor</em> må lærast særskilt. <em>når</em> er likt på begge skriftspråka. Vanlege feilstavingar er <em>kordan</em> og <em>kvordan</em>.",
    },
    {
      title: "Kvar eller kor?",
      steps: [
        "<p class=\"stor\"><em class=\"nn\"><strong>Kvar</strong> bur du?</em> → stad</p>",
        "<p class=\"stor\"><em class=\"nn\"><strong>Kor</strong> mange er de?</em> → mengd</p>",
        "<p class=\"stor\"><em class=\"nn\"><strong>Kor</strong> fort spring du?</em> → grad</p>",
      ],
      notes: "Hugseregel: kan du svare med ein stad, er det <em>kvar</em>. Står spørjeordet framfor eit adjektiv eller <em>mange</em> og <em>mykje</em>, er det <em>kor</em>. I skriftleg nynorsk er <em>kvar</em> det trygge valet når du spør om stad.",
    },
    {
      type: "drill",
      title: "Kvar eller kor?",
      spec: { bank: "sentences", set: ["kvarKor"], mode: "choice" },
      n: 5,
      notes: "Be elevane seie om setninga spør om stad, mengd eller grad før dei vel.",
    },
    {
      type: "drill",
      title: "Spørjeord på nynorsk",
      intro: "Kva heiter spørjeordet på nynorsk?",
      spec: { bank: "words", filter: { tags: ["sporjeord"] }, tasks: ["bm2nn"], mode: "choice" },
      n: 6,
      notes: "Nokre av oppgåvene har fleire ord, som <em>kva for ein</em> og <em>kor mange</em>. Lat elevane lage eit spørsmål med ordet etter at svaret er vist.",
    },
    {
      type: "diskuter",
      title: "Set om til nynorsk",
      prompt: `<p class="stor midt"><em class="bm">Hvor bor du, og hvorfor flyttet dere hit?</em></p>`,
      form: "Skriv saman i par",
      tid: 3,
      svar: "<em class=\"nn\">Kvar bur du, og kvifor flytta de hit?</em>",
      notes: "Tre ting å sjå etter: <em>kvar</em> om stad, <em>kvifor</em>, og <em>de</em> fordi pronomenet er subjekt for <em>flytta</em>. <em>flytte</em> er eit a-verb, så preteritum er <em>flytta</em>. Be eit par skrive svaret på tavla og la klassen rette.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Para saman bokmål og nynorsk.</li>
          <li>Set inn rett personleg pronomen og eigedomspronomen.</li>
          <li>Sorter orda og gjer omsetjinga.</li>
        </ul>`,
      tid: 10,
      notes: "Gå rundt og spør: er pronomenet subjekt eller objekt? Kva kjønn har substantivet? Dei som blir tidleg ferdige, kan gå vidare til mengdetreninga Pronomen, spørjeord og småord.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Subjekt og objekt: <em class=\"nn\">eg/meg, ho/henne, de/dykk</em></p>",
        "<p class=\"stor\"><em class=\"nn\">de</em> = <em class=\"bm\">dere</em> &nbsp;·&nbsp; <em class=\"nn\">dei</em> = <em class=\"bm\">de/dem</em></p>",
        "<p class=\"stor\"><em class=\"nn\">bilen min, boka mi, huset mitt</em></p>",
        "<p class=\"stor\"><em class=\"nn\">kva, kven, kvar, korleis, kvifor</em></p>",
      ],
      notes: "Be elevane skrive tre spørsmål til sidemannen på nynorsk med tre ulike spørjeord, og svare på spørsmåla dei får.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen tek for seg personlege pronomen i subjekts- og objektsform, eigedomspronomen og spørjeord. Den største feilkjelda er <em class=\"nn\">de</em> og <em class=\"nn\">dei</em>, som ser ut som bokmålsord, men tyder noko anna. Eigedomspronomena byggjer på kjønna frå substantivmodulen, og spørjeorda er blant dei orda som oftast avslører at ein tekst er skriven av ein bokmålsbrukar.</p>",
    mal: [
      "Elevane kan bruke personlege pronomen rett i subjekts- og objektsform.",
      "Elevane kan skilje mellom <em class=\"nn\">de</em> (bokmål <em class=\"bm\">dere</em>) og <em class=\"nn\">dei</em> (bokmål <em class=\"bm\">de/dem</em>).",
      "Elevane kan bøye eigedomspronomen etter kjønn og tal på substantivet.",
      "Elevane kan bruke dei nynorske spørjeorda og skilje mellom <em class=\"nn\">kvar</em> og <em class=\"nn\">kor</em>.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kjenne omgrepa subjekt og objekt og vite kva kjønn vanlege substantiv har. Modulane om setningsledd og substantiv gir det grunnlaget.",
    forebuing: [
      "Test presentasjonen på tavla, særleg tavleøvingane på lysbilete 8, 14 og 15.",
      "Tenk gjennom korleis du forklarer skilnaden på å snakke til nokon og om nokon, som er nøkkelen til <em class=\"nn\">de</em> og <em class=\"nn\">dei</em>.",
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og lat elevane gjette nynorskformene av fem bokmålsord.</p>", lysbilete: "2 og 3" },
      { fase: "Personlege pronomen", min: 12, gjer: "<p>Vis pronomenpara og tabellen, forklar fella med <em class=\"nn\">de</em> og <em class=\"nn\">dei</em>, ta spørsmålet og køyr tavleøvinga.</p>", lysbilete: "4 til 8" },
      { fase: "Eigedomspronomen", min: 7, gjer: "<p>Vis korleis eigedomspronomenet rettar seg etter substantivet, og ta spørsmålet om <em class=\"nn\">klokka di</em>.</p>", lysbilete: "9 til 11" },
      { fase: "Spørjeord", min: 9, gjer: "<p>Gå gjennom spørjeorda og <em class=\"nn\">kvar</em>/<em class=\"nn\">kor</em>, køyr to korte tavleøvingar og lat elevane setje om ei setning i par.</p>", lysbilete: "12 til 16" },
      { fase: "Eigenarbeid", min: 10, gjer: "<p>Elevane arbeider i modulen. Dei som blir ferdige, går vidare til mengdetreninga.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane stille kvarandre spørsmål med nynorske spørjeord.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«<em>de</em> tyder det same som på bokmål.»", hjelp: "Nynorsk <em class=\"nn\">de</em> tyder bokmål <em class=\"bm\">dere</em>. Når du snakkar om andre, skal det vere <em class=\"nn\">dei</em>. Spør: til eller om?" },
      { feil: "«Objektsforma av <em>han</em> er <em>ham</em>.»", hjelp: "<em class=\"bm\">ham</em> er bokmål. På nynorsk er <em class=\"nn\">han</em> både subjekt og objekt: <em class=\"nn\">Eg såg han.</em>" },
      { feil: "«Det heiter <em>boka min</em>.»", hjelp: "Eigedomspronomenet rettar seg etter substantivet. <em class=\"nn\">bok</em> er hokjønn, så det blir <em class=\"nn\">boka mi</em>." },
      { feil: "«<em>kordan</em> er nynorsk for <em>hvordan</em>.»", hjelp: "Det heiter <em class=\"nn\">korleis</em>. <em>kordan</em> finst i mange dialektar, men ikkje i skriftleg nynorsk." },
    ],
    samtale: [
      "Kva pronomen bruker du i talemålet ditt, og er dei like dei nynorske?",
      "Kvifor trur du <em class=\"nn\">de</em> og <em class=\"nn\">dei</em> er så lette å blande?",
      "Kvifor trur du eigedomspronomenet står etter substantivet på nynorsk?",
      "Kva spørjeord i dialekten din liknar mest på nynorsk?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein huskelapp med pronomenpara og spørjeorda.",
        "Lat elevane markere subjektet med blått og objektet med raudt før dei vel pronomen.",
        "Øv på <em class=\"nn\">de</em> og <em class=\"nn\">dei</em> munnleg med korte setningar før dei skriv.",
      ],
      utfordring: [
        "Lat elevane øve på <em class=\"nn\">sin, si, sitt, sine</em> og <em class=\"nn\">hans, hennar</em> i mengdetreninga for pronomen og småord.",
        "Be elevane skrive ein kort dialog der alle personlege pronomen er med minst éin gong.",
      ],
    },
    vurdering: [
      "Tavleøvingane viser om klassen skil subjekts- og objektsform og kan spørjeorda.",
      "Utfyllings- og omsetjingsoppgåvene i modulen viser om eleven bruker pronomena rett i setningar.",
      "Kjenneteikn på god måloppnåing: eleven bruker <em class=\"nn\">de, dykk</em> og <em class=\"nn\">dei</em> rett, bøyer eigedomspronomen etter kjønn og skriv spørjeorda utan bokmålsformer.",
    ],
    vidare: "Følg opp med mengdetreninga Pronomen, spørjeord og småord i Del 2, der elevane òg øver på <em class=\"nn\">nokon/noko/nokre</em> og <em class=\"nn\">sin/hans</em>.",
  },
});

/* ======================================================================
   ADJEKTIV: SAMSVARSBØYING
   ====================================================================== */
Larar.register("grammatikk-adjektiv", {
  tittelnotat: "Adjektivbøying handlar om samsvar: adjektivet må passe til substantivet. Mønsteret er enkelt, men feila er vanlege, særleg når adjektivet står langt frå substantivet. Knyt timen til substantivmodulen: kan du kjønnet, kan du bøye adjektivet.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>bøye adjektiv etter <strong>kjønn og tal</strong></li>
        <li>bruke <strong>-e</strong> i bestemt form</li>
        <li>få <strong>samsvar</strong> etter <em class="nn">er</em></li>
        <li>gradbøye: <em class="nn">fin, finare, finast</em></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Minn elevane om at adjektiv er ord som skildrar: dei fortel korleis noko er, og står gjerne framfor eit substantiv eller etter <em>er</em>.",
    },
    {
      type: "diskuter",
      title: "Kva er feil?",
      prompt: `<p class="stor midt"><em class="nn">eit fin hus</em></p><p class="stor midt"><em class="nn">Huset er stor.</em></p><p class="stor midt"><em class="nn">den fin guten</em></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">eit fint hus</em>, <em class=\"nn\">Huset er stort.</em>, <em class=\"nn\">den fine guten</em>",
      notes: "Mange høyrer feila sjølv om dei ikkje kan forklare dei. Lat elevane rette først, og samle forklaringane deira på tavla. Resten av timen gir dei orda for det dei allereie høyrer.",
    },
    {
      title: "Adjektivet rettar seg etter substantivet",
      body: `<div class="former" data-spel>
          <div class="form"><span class="etikett">hankjønn</span><span class="ordform">ein <b>fin</b> gut</span></div>
          <div class="form"><span class="etikett">hokjønn</span><span class="ordform">ei <b>fin</b> jente</span></div>
          <div class="form"><span class="etikett">inkjekjønn</span><span class="ordform">eit fin<b>t</b> hus</span></div>
          <div class="form"><span class="etikett">fleirtal</span><span class="ordform">fin<b>e</b> gutar</span></div>
        </div>`,
      steps: ["<p class=\"midt stor\">Kjønn og tal på substantivet styrer endinga.</p>"],
      notes: "Dette kallar vi samsvarsbøying. Peik på at hankjønn og hokjønn har same form, så det er berre inkjekjønn og fleirtal som skil seg ut. Det gjer adjektiva lettare enn substantiva.",
    },
    {
      title: "Ubestemt form",
      body: `<table>
          <thead><tr><th>Hankjønn</th><th>Hokjønn</th><th>Inkjekjønn</th><th>Fleirtal</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">ein fin gut</em></td><td><em class="nn">ei fin jente</em></td><td><em class="nn">eit fin<strong>t</strong> hus</em></td><td><em class="nn">fin<strong>e</strong> hus</em></td></tr>
            <tr><td><em class="nn">ein stor bil</em></td><td><em class="nn">ei stor klokke</em></td><td><em class="nn">eit stor<strong>t</strong> hus</em></td><td><em class="nn">stor<strong>e</strong> bilar</em></td></tr>
          </tbody>
        </table>`,
      steps: [
        "<p class=\"stor midt\">Inkjekjønn eintal: <strong>-t</strong></p>",
        "<p class=\"stor midt\">Fleirtal: <strong>-e</strong> i alle kjønn</p>",
      ],
      notes: "To endingar å hugse: -t og -e. Legg merke til at fleirtal får -e same kva kjønn substantivet har: <em>fine gutar, fine jenter, fine hus</em>.",
    },
    {
      type: "sporsmal",
      question: "Det står eit ___ tre i hagen. (stor)",
      options: ["<em>stor</em>", "<em>stort</em>", "<em>store</em>", "<em>storet</em>"],
      correct: 1,
      explain: "<em class=\"nn\">tre</em> er inkjekjønn: <em class=\"nn\">eit tre</em>. Då får adjektivet <em class=\"nn\">-t</em>: <em class=\"nn\">eit stort tre</em>.",
      notes: "Artikkelen <em>eit</em> avslører kjønnet. Lær elevane å sjå etter artikkelen når dei skal bøye adjektivet.",
    },
    {
      type: "drill",
      title: "Inkjekjønnsforma",
      intro: "Sei forma høgt: <em class=\"nn\">eit … hus</em>",
      spec: { bank: "adjectives", tasks: ["neuter"], mode: "mixed" },
      n: 6,
      notes: "Nokre adjektiv får ikkje -t, til dømes <em>billeg</em> og <em>vanleg</em>. Nokre får -tt, som <em>nytt</em>. Og <em>liten</em> blir <em>lite</em>. Når slike dukkar opp, kan du peike fram mot lysbilete 13.",
    },
    {
      title: "Bestemt form: alltid -e",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">den fin<strong>e</strong> guten</em></p>",
        "<p class=\"stor\"><em class=\"nn\">den fin<strong>e</strong> jenta</em></p>",
        "<p class=\"stor\"><em class=\"nn\">det fin<strong>e</strong> huset</em></p>",
        "<p class=\"stor\"><em class=\"nn\">dei fin<strong>e</strong> gutane</em></p>",
      ],
      notes: "I bestemt form er det ingen skilnad på kjønna: adjektivet får alltid -e. Legg merke til at vi bruker både <em>den/det/dei</em> framfor og bestemt form på substantivet: <em>den fine guten</em>. Det kallar vi dobbel bestemming, og det er likt på bokmål.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett: <em class=\"nn\">den ___ guten</em>",
      options: ["<em>fin</em>", "<em>fint</em>", "<em>fine</em>", "<em>finen</em>"],
      correct: 2,
      explain: "I bestemt form får adjektivet <em class=\"nn\">-e</em>: <em class=\"nn\">den fine guten</em>.",
      notes: "<em>den</em> og <em>guten</em> viser at det er bestemt form. Spør: kva ending får adjektivet alltid i bestemt form?",
    },
    {
      type: "drill",
      title: "Fleirtal og bestemt form",
      intro: "Sei forma høgt: <em class=\"nn\">mange … hus</em>",
      spec: { bank: "adjectives", tasks: ["plural"], mode: "mixed" },
      n: 5,
      notes: "Same form blir brukt i fleirtal og i bestemt form: <em>fine hus</em> og <em>det fine huset</em>. Unntaket er <em>liten</em>: fleirtal er <em>små</em>, men bestemt eintal er <em>den vesle</em> eller <em>den litle</em>.",
    },
    {
      title: "Samsvar etter «er»",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">Guten er fin.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Jenta er fin.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Huset er fin<strong>t</strong>.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Bilane er fin<strong>e</strong>.</em></p>",
      ],
      notes: "Etter <em>er</em> og <em>blir</em> står adjektivet som predikativ, og det bøyer seg etter subjektet. Her kjem dei fleste feila, fordi adjektivet står langt frå substantivet. Tips: finn subjektet og tenk deg adjektivet framfor det. <em>eit fint hus</em> gir <em>huset er fint</em>. Legg merke til at adjektivet ikkje får bestemt form sjølv om subjektet er bestemt: <em>huset er fint</em>, ikkje <em>huset er fine</em>.",
    },
    {
      type: "drill",
      title: "Bøy adjektivet etter subjektet",
      intro: "Finn subjektet først.",
      spec: { bank: "sentences", set: ["predikativ"], mode: "type" },
      n: 6,
      notes: "Be elevane seie kva kjønn og tal subjektet har før dei svarer. Lat alle skrive svaret på ein kladdelapp før du viser løysinga.",
    },
    {
      title: "Nokre skil seg ut",
      body: `<table>
          <thead><tr><th></th><th>Inkjekjønn</th><th>Fleirtal</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">vanleg</em></td><td><em class="nn">eit vanleg hus</em></td><td><em class="nn">vanlege</em></td></tr>
            <tr><td><em class="nn">praktisk</em></td><td><em class="nn">eit praktisk råd</em></td><td><em class="nn">praktiske</em></td></tr>
            <tr><td><em class="nn">ny</em></td><td><em class="nn">eit ny<strong>tt</strong> hus</em></td><td><em class="nn">nye</em></td></tr>
            <tr><td><em class="nn">liten</em></td><td><em class="nn">eit lite hus</em></td><td><em class="nn">små</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Adjektiv på <strong>-eg, -ig</strong> og <strong>-isk</strong> får ikkje -t.</p>"],
      notes: "Mange skriv <em>vanlegt</em> og <em>praktiskt</em>, men dei orda får ingen -t. Adjektiv som endar på trykksterk vokal, får dobbel t: <em>nytt, blått</em>. <em>liten</em> er heilt uregelrett: <em>ein liten gut, ei lita jente, eit lite hus, små hus, den vesle guten</em>. Dette er ekstra stoff utover modulen, så ta det etter kor langt klassen har kome.",
    },
    {
      title: "Gradbøying",
      body: `<table>
          <thead><tr><th>Positiv</th><th>Komparativ</th><th>Superlativ</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">fin</em></td><td><em class="nn">fin<strong>are</strong></em></td><td><em class="nn">fin<strong>ast</strong></em></td></tr>
            <tr><td><em class="nn">stor</em></td><td><em class="nn">større</em></td><td><em class="nn">størst</em></td></tr>
            <tr><td><em class="nn">liten</em></td><td><em class="nn">mindre</em></td><td><em class="nn">minst</em></td></tr>
            <tr><td><em class="nn">god</em></td><td><em class="nn">betre</em></td><td><em class="nn">best</em></td></tr>
            <tr><td><em class="nn">gamal</em></td><td><em class="nn">eldre</em></td><td><em class="nn">eldst</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Regelrett: <strong>-are</strong> og <strong>-ast</strong>, ikkje <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em>.</p>"],
      notes: "Dei fleste adjektiv følgjer mønsteret <em>fin, finare, finast</em>. Bokmål har <em>finere, finest</em>, så her bommar mange. Dei uregelrette er dei same som på bokmål, men pass på <em>betre</em> (ikkje <em>bedre</em>). Både <em>gamal</em> og <em>gammal</em> er rett nynorsk.",
    },
    {
      type: "drill",
      title: "Komparativ og superlativ",
      intro: "Sei forma høgt: <em class=\"nn\">… enn</em> eller <em class=\"nn\">aller …</em>",
      spec: { bank: "adjectives", tasks: ["comp", "sup"], mode: "mixed" },
      n: 6,
      notes: "Lat elevane bruke forma i ei setning: «Bilen min er finare enn din.» Då blir det tydeleg at komparativ samanliknar to, og superlativ samanliknar fleire.",
    },
    {
      type: "diskuter",
      title: "Skildre klasserommet",
      prompt: `<p class="stor">Skriv tre setningar om klasserommet med <em class="nn">er</em> + adjektiv.</p><p><em class="nn">Tavla er … &nbsp;·&nbsp; Golvet er … &nbsp;·&nbsp; Stolane er …</em></p>`,
      form: "Skriv saman i par",
      tid: 3,
      svar: "Til dømes: <em class=\"nn\">Tavla er kvit. Golvet er reint. Stolane er harde.</em>",
      notes: "Døma er valde så elevane får eitt hokjønnsord, eitt inkjekjønnsord og eitt fleirtalsord. Lat nokre par lese opp, og be klassen lytte etter endingane. Denne oppgåva er ei god oppvarming til skriveoppgåva i modulen.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Set <em class="nn">fin</em> og <em class="nn">stor</em> i rett form.</li>
          <li>Para saman gradbøyingane.</li>
          <li>Skildre eit rom eller ein stad med minst seks adjektiv.</li>
        </ul>`,
      tid: 10,
      notes: "Gå rundt og les skildringane. Peik på eit adjektiv og spør: kva substantiv høyrer det til, og kva kjønn har det? Dei som blir tidleg ferdige, kan gå vidare til mengdetreninga Adjektiv: samsvar og gradbøying.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Inkjekjønn: <em class=\"nn\">eit fin<strong>t</strong> hus</em></p>",
        "<p class=\"stor\">Fleirtal og bestemt form: <em class=\"nn\">fin<strong>e</strong></em></p>",
        "<p class=\"stor\">Etter <em class=\"nn\">er</em>: <em class=\"nn\">Huset er fin<strong>t</strong>.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">fin, fin<strong>are</strong>, fin<strong>ast</strong></em></p>",
      ],
      notes: "Be elevane skrive éi setning med eit adjektiv i inkjekjønn etter <em>er</em> på ein exit-lapp. Det er den vanskelegaste forma, og lappane viser kven som har fått det med seg.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen handlar om korleis adjektivet rettar seg etter substantivet i kjønn, tal og bestemtheit, både framfor substantivet og etter <em class=\"nn\">er</em>. I tillegg øver elevane på gradbøying. Mønsteret er enklare enn for substantiva: hankjønn og hokjønn har same form, inkjekjønn får <em class=\"nn\">-t</em>, og fleirtal og bestemt form får <em class=\"nn\">-e</em>. Dei vanlegaste feila er manglande samsvar etter <em class=\"nn\">er</em> og bokmålsendingane <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em>.</p>",
    mal: [
      "Elevane kan bøye adjektiv etter kjønn og tal i ubestemt form.",
      "Elevane kan bruke <em class=\"nn\">-e</em> på adjektivet i bestemt form.",
      "Elevane kan bøye adjektivet etter subjektet når det står etter <em class=\"nn\">er</em> eller <em class=\"nn\">blir</em>.",
      "Elevane kan gradbøye regelrette adjektiv med <em class=\"nn\">-are</em> og <em class=\"nn\">-ast</em> og dei vanlegaste uregelrette.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane må kjenne dei tre kjønna og bøyinga av substantiv. Ta modulen Substantiv: kjønn og bøying først. Omgrepet predikativ frå setningslæra er ein fordel, men ikkje eit krav.",
    forebuing: [
      "Test presentasjonen på tavla, særleg figuren på lysbilete 4 og tavleøvingane.",
      "Ha kladdelappar eller mini-tavler klare til tavleøvinga utan alternativ på lysbilete 12.",
      "Ha små lappar klare til exit-lappen til slutt.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og lat elevane rette tre feil i par.</p>", lysbilete: "2 og 3" },
      { fase: "Ubestemt form", min: 9, gjer: "<p>Vis figuren og tabellen, ta spørsmålet om <em class=\"nn\">eit stort tre</em> og køyr tavleøvinga i inkjekjønn.</p>", lysbilete: "4 til 7" },
      { fase: "Bestemt form og predikativ", min: 10, gjer: "<p>Gå gjennom bestemt form og samsvar etter <em class=\"nn\">er</em>, med spørsmål og to tavleøvingar.</p>", lysbilete: "8 til 12" },
      { fase: "Unntak og gradbøying", min: 9, gjer: "<p>Vis adjektiva som skil seg ut, gå gjennom gradbøyinga med tavleøving og lat elevane skildre klasserommet i par.</p>", lysbilete: "13 til 16" },
      { fase: "Eigenarbeid", min: 10, gjer: "<p>Elevane arbeider i modulen. Dei som blir ferdige, går vidare til mengdetreninga.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive éi setning med inkjekjønn etter <em class=\"nn\">er</em> på ein exit-lapp.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«<em>Huset er stor</em> er rett, for <em>stor</em> er grunnforma.»", hjelp: "Adjektivet etter <em class=\"nn\">er</em> bøyer seg etter subjektet. Tenk deg adjektivet framfor substantivet: <em class=\"nn\">eit stort hus</em> gir <em class=\"nn\">huset er stort</em>." },
      { feil: "«Når subjektet er bestemt, skal adjektivet ha -e: <em>huset er fine</em>.»", hjelp: "Etter <em class=\"nn\">er</em> bruker vi ubestemt form av adjektivet. <em class=\"nn\">-e</em> kjem berre når subjektet er fleirtal: <em class=\"nn\">husa er fine</em>." },
      { feil: "«Komparativ heiter <em>finere</em> og superlativ <em>finest</em>.»", hjelp: "På nynorsk er endingane <em class=\"nn\">-are</em> og <em class=\"nn\">-ast</em>: <em class=\"nn\">finare, finast</em>." },
      { feil: "«Alle adjektiv får -t i inkjekjønn.»", hjelp: "Adjektiv på <em class=\"nn\">-eg, -ig</em> og <em class=\"nn\">-isk</em> får ikkje -t: <em class=\"nn\">eit vanleg hus, eit praktisk råd</em>." },
    ],
    samtale: [
      "Kvifor trur du det er lettare å bøye adjektivet rett når det står rett framfor substantivet?",
      "Kva kjenneteiknar ei god skildring? Kan ein bruke for mange adjektiv?",
      "Kvifor trur du dei vanlegaste adjektiva, som <em class=\"nn\">god</em> og <em class=\"nn\">liten</em>, er uregelrette?",
      "Høyrer du samsvarsbøying i talemålet ditt, til dømes <em class=\"nn\">huset er stort</em>?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein huskelapp med dei tre endingane: ingen, -t og -e.",
        "Lat elevane skrive artikkelen eller subjektet med farge før dei bøyer adjektivet.",
        "Bruk dei same få adjektiva, som <em class=\"nn\">fin</em> og <em class=\"nn\">stor</em>, til mønsteret sit.",
      ],
      utfordring: [
        "Lat elevane finne adjektiv i ein nynorsktekst frå Del 5 og forklare forma på kvart av dei.",
        "Be elevane undersøkje bøyinga av <em class=\"nn\">liten</em> og <em class=\"nn\">annan</em> i Nynorskordboka og lage ein tabell.",
      ],
    },
    vurdering: [
      "Tavleøvingane viser om klassen meistrar inkjekjønn, fleirtal, predikativ og gradbøying.",
      "Skildringa i modulen viser om eleven får samsvar mellom adjektiv og substantiv i eigen tekst.",
      "Kjenneteikn på god måloppnåing: eleven bøyer adjektiv rett både framfor substantivet og etter <em class=\"nn\">er</em>, og gradbøyer utan bokmålsendingar.",
    ],
    vidare: "Følg opp med mengdetreninga Adjektiv: samsvar og gradbøying i Del 2. Samsvar i predikativ kjem att i setningslæra og under Typiske feil i Del 4.",
  },
});
