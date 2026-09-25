/* Lærarinnhald for Del 4 · Typiske feil. Formatet står i larer/README.md. */

/* ------------------------------------------------------------------ */
Larar.register("grammatikk-skriveregler", {
  tittelnotat: `Denne modulen er inngangen til Typiske feil. Sei det rett ut: dei fleste feila i sidemålstekstar er dei same små orda og dei same fellene, om og om igjen. Kan elevane dei, forsvinn ein stor del av raudblyanten.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lære dei <strong>småorda</strong> som oftast blir feil</li>
        <li>kjenne att <strong>diftongane</strong></li>
        <li>velje rett mellom <em class="nn">noko, nokon</em> og <em class="nn">nokre</em></li>
        <li>skrive <strong>samansette ord</strong> i eitt</li>
      </ul>`,
      notes: `Gå raskt gjennom måla. Fortel at resten av Typiske feil byggjer på dette: bøying, bokmålsord, småord, setningsbygnad og til slutt rettelesing av heile tekstar.`,
    },
    {
      type: "diskuter",
      title: "Kva avslører bokmålet?",
      prompt: `<p>Ein elev har skrive:</p>
        <p class="stor"><em class="bm">Jeg vet ikke hvorfor han ikke kom.</em></p>
        <p>Kva ord må endrast for at setninga skal bli nynorsk?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: `<em class="nn">Eg veit ikkje kvifor han ikkje kom.</em> Fem av sju ord er endra, og alle er småord eller vanlege verb.`,
      notes: `Lat elevane peike ut orda før du viser svaret. Poenget er at det er dei små, vanlege orda som avslører bokmålet. Spør gjerne: kva for eitt av orda ville de gløymt å rette?`,
    },
    {
      title: "Småord du må kunne",
      body: `<div class="to-kol">
          <table>
            <tbody>
              <tr><td><em class="bm">ikke</em></td><td>→ <em class="nn">ikkje</em></td></tr>
              <tr><td><em class="bm">bare</em></td><td>→ <em class="nn">berre</em></td></tr>
              <tr><td><em class="bm">fra</em></td><td>→ <em class="nn">frå</em></td></tr>
              <tr><td><em class="bm">mye</em></td><td>→ <em class="nn">mykje</em></td></tr>
              <tr><td><em class="bm">noe</em></td><td>→ <em class="nn">noko</em></td></tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr><td><em class="bm">hva</em></td><td>→ <em class="nn">kva</em></td></tr>
              <tr><td><em class="bm">hvem</em></td><td>→ <em class="nn">kven</em></td></tr>
              <tr><td><em class="bm">hvordan</em></td><td>→ <em class="nn">korleis</em></td></tr>
              <tr><td><em class="bm">hvorfor</em></td><td>→ <em class="nn">kvifor</em></td></tr>
              <tr><td><em class="bm">også</em></td><td>→ <em class="nn">også / òg</em></td></tr>
            </tbody>
          </table>
        </div>`,
      notes: `Les lista høgt i kor: læraren seier bokmålsordet, klassen svarer med nynorskordet. <em>Også</em> er med for å vise at det er lov på nynorsk, ved sida av <em>òg</em>. Mange elevar trur at alt som liknar bokmål, er feil.`,
    },
    {
      title: "Hvor: kvar eller kor?",
      body: `<div class="to-kol">
          <div class="boks"><h3>kvar</h3><p>stad</p><p><em class="nn">Kvar bur du?</em></p></div>
          <div class="boks"><h3>kor</h3><p>grad og mengd</p><p><em class="nn">Kor mange kjem?</em></p></div>
        </div>`,
      steps: [
        `<p class="midt"><em class="nn">Kor</em> kan òg brukast om stad. Men <em class="nn">kvar</em> kan <strong>aldri</strong> brukast om grad.</p>`,
      ],
      notes: `Bokmål har eitt ord, <em>hvor</em>, der nynorsk har to. Hugseregel: spør du om ein stad, kan du bruke begge. Spør du om kor mykje, kor mange eller kor lenge, er det berre <em>kor</em>. <em class="bm">Kvar mange</em> er alltid feil.`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett: «___ mange elevar går i klassen?»",
      options: ["Kvar", "Kor", "Hvor", "Kvor"],
      correct: 1,
      explain: `Spørsmålet handlar om mengd, så det må vere <em class="nn">kor</em>. <em class="nn">Kvar</em> brukar vi om stad. <em class="bm">Hvor</em> er bokmål, og <em class="bm">kvor</em> finst ikkje.`,
      notes: `Lat elevane vise svaret med fingrane. <em>Kvor</em> er ei blandingsform som dukkar opp i elevtekstar. Nemn det gjerne.`,
    },
    {
      type: "drill",
      title: "Spørjeorda",
      intro: "Kva heiter spørjeordet på nynorsk? Klassen svarer før du viser løysinga.",
      spec: { bank: "words", filter: { tags: ["sporjeord"] }, tasks: ["bm2nn"], mode: "type" },
      n: 6,
      notes: `Oppgåvene blir trekte tilfeldig frå ordbanken. Peik på ein elev om gongen, eller lat heile klassen svare i kor. Trykk «Nye oppgåver» om du vil ta ein runde til.`,
    },
    {
      title: "Diftongar",
      body: `<p>Mange ord har <strong>to vokalar</strong> på nynorsk der bokmål har éin:</p>`,
      steps: [
        `<p class="stor"><em class="bm">ben, sten, hjem</em> → <em class="nn">bein, stein, heim</em></p>`,
        `<p class="stor"><em class="bm">øye</em> → <em class="nn">auge</em></p>`,
        `<p class="stor"><em class="bm">rød, drøm, strøm</em> → <em class="nn">raud, draum, straum</em></p>`,
        `<p class="stor"><em class="bm">høre</em> → <em class="nn">høyre</em></p>`,
      ],
      notes: `Seier elevane orda høgt, høyrer dei ofte skilnaden sjølve. Mange dialektar har diftongane, så spør gjerne om nokon i klassen seier <em>stein</em> eller <em>heim</em>. Då har dei ein knagg å henge regelen på.`,
    },
    {
      title: "Noko eller nokon?",
      body: `<p class="kjempe midt">Kan du telje det?</p>`,
      steps: [
        `<p class="stor">Ei mengd du ikkje tel → <em class="nn">noko</em>: <em class="nn">noko brød, noko vatn</em></p>`,
        `<p class="stor">Éin ting du tel → <em class="nn">ein, ei, eit</em>: <em class="nn">Eg vil ha eit hus.</em></p>`,
        `<p class="stor">Fleire ting → <em class="nn">nokre</em>: <em class="nn">Eg las nokre bøker.</em></p>`,
      ],
      notes: `Mange elevar har lært at <em>noko</em> er inkjekjønn. Den regelen kjem til kort: <em>noko brød</em> går fint, men <em class="bm">noko hus</em> går ikkje i ei positiv setning, sjølv om begge orda er inkjekjønn. Det er teljinga som avgjer, ikkje kjønnet.`,
    },
    {
      title: "Spørsmål og nekting",
      body: `<table>
          <thead><tr><th></th><th>Positiv setning</th><th>Spørsmål eller nekting</th></tr></thead>
          <tbody>
            <tr><td>Éin ting</td><td><em class="nn">eit hus</em></td><td><em class="nn">Ser du noko hus?</em></td></tr>
            <tr><td>Fleire ting</td><td><em class="nn">nokre bøker</em></td><td><em class="nn">Har du lese nokon bøker?</em></td></tr>
            <tr><td>Person</td><td></td><td><em class="nn">Er det nokon heime?</em></td></tr>
          </tbody>
        </table>`,
      notes: `I spørsmål og nekting bruker vi <em>nokon, noka, noko</em> etter kjønnet: <em>nokon gut, noka jente, noko hus</em>. I fleirtal kan <em>nokon</em> stå i spørsmål og nekting. Står ordet åleine, er <em>noko</em> ein ting og <em>nokon</em> ein person: <em>Eg ser noko. Er det nokon heime?</em>`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett: «Eg vil ha ___ hus når eg blir vaksen.»",
      options: ["noko", "nokon", "eit", "noka"],
      correct: 2,
      explain: `Eit hus kan du telje, og setninga er positiv. Då heiter det <em class="nn">eit hus</em>.`,
      notes: `Dette er fella. Mange vel <em>noko</em> fordi hus er inkjekjønn. Spør klassen: kan du telje hus? Ja. Er setninga eit spørsmål eller ei nekting? Nei. Då står det att <em>eit</em>.`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett: «Vi gjekk lenge, men vi såg ikkje ___ hus.»",
      options: ["eit", "noko", "nokon", "nokre"],
      correct: 1,
      explain: `No er setninga ei nekting, og då bruker vi <em class="nn">noko</em> om inkjekjønnsord: <em class="nn">ikkje noko hus</em>.`,
      notes: `Set dette spørsmålet rett etter det førre med vilje. Same ordet, men no er det ei nekting, og då skiftar svaret. Lat elevane forklare kvifor svaret er ulikt.`,
    },
    {
      type: "diskuter",
      title: "Brød eller brød?",
      prompt: `<p class="stor"><em class="nn">Eg kjøpte noko brød.</em></p>
        <p class="stor"><em class="nn">Eg kjøpte nokre brød.</em></p>
        <p>Begge er rette. Kva er skilnaden?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: `<em class="nn">Noko brød</em> er ei mengd, altså litt brød. <em class="nn">Nokre brød</em> er fleire heile brød som du kan telje: eitt, to, tre.`,
      notes: `Poenget er at «kan eg telje det?» handlar om kva du meiner, ikkje berre om sjølve ordet. Med <em>hus</em> er det ikkje noko val, for hus tel du alltid.`,
    },
    {
      type: "drill",
      title: "Noko, nokon eller nokre?",
      intro: "Les setninga høgt. Kan du telje det? Er det eit spørsmål eller ei nekting?",
      spec: { bank: "sentences", set: ["nokon"], mode: "choice" },
      n: 5,
      notes: `Be elevane grunngi kvart svar med dei to spørsmåla: kan eg telje det, og er setninga positiv?`,
    },
    {
      title: "Samansette ord",
      body: `<p class="stor midt">Skriv dei i <strong>eitt ord</strong>, akkurat som på bokmål.</p>
        <div class="to-kol">
          <div class="boks"><h3>Feil</h3><p><em class="bm">bil køyring</em></p><p><em class="bm">skule elev</em></p></div>
          <div class="boks"><h3>Rett</h3><p><em class="nn">bilkøyring</em></p><p><em class="nn">skuleelev</em></p></div>
        </div>`,
      steps: [
        `<p class="midt">Og preteritum av <em class="nn">bli/verte</em>: både <em class="nn">blei</em> og <em class="nn">vart</em> er rett. <em class="bm">ble</em> er bokmål.</p>`,
      ],
      notes: `Særskriving er ikkje ein nynorskfeil spesielt, men han dukkar opp i alle elevtekstar. Vis skilnaden i tyding med eit døme: ein <em>røykfri</em> restaurant og ein <em>røyk fri</em> restaurant. Om vart og blei: vel éi form og hald deg til henne i heile teksten.`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor midt"><em class="bm">Vi har bare litt mat, men mor kjem heim fra butikken med mye godt.</em></p>`,
      steps: [
        `<p class="midt">Det er <strong>3 feil</strong>.</p>`,
      ],
      svar: `<em class="nn">Vi har <strong>berre</strong> litt mat, men mor kjem heim <strong>frå</strong> butikken med <strong>mykje</strong> godt.</em>`,
      notes: `Lat elevane skrive rettinga på eit ark eller ei minitavle før du viser svaret. Legg merke til at <em>vi</em> er rett: både <em>vi</em> og <em>me</em> er tillatne på nynorsk.`,
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les leksjonen og para saman bokmål og nynorsk.</li>
          <li>Gjer fleirvalsoppgåvene om <em class="nn">noko, nokon, nokre</em>.</li>
          <li>Skriv fem setningar på bokmål og dei same på nynorsk til slutt.</li>
        </ul>`,
      tid: 12,
      notes: `Gå rundt og sjå særleg på noko/nokon-oppgåvene. Spør elevar som svarer feil: kan du telje det? Dei som blir tidleg ferdige, kan ta mengdetreninga med småord i Del 2.`,
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor">Lær <strong>småorda</strong>: <em class="nn">ikkje, berre, frå, kva, korleis, kvifor</em>.</p>`,
        `<p class="stor"><em class="nn">kvar</em> = stad, <em class="nn">kor</em> = grad og mengd.</p>`,
        `<p class="stor">Kan du telje det? <em class="nn">noko brød</em>, men <em class="nn">eit hus</em>.</p>`,
        `<p class="stor">Samansette ord i <strong>eitt</strong>.</p>`,
      ],
      notes: `Be elevane skrive ned det småordet dei trur dei oftast skriv feil, og hengje lappen på pulten til neste skriveøkt.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen samlar dei vanlegaste fallgruvene i nynorsktekstar: småord som <em class="nn">ikkje, berre, frå, kva, korleis</em>, diftongar, skiljet mellom <em class="nn">kvar</em> og <em class="nn">kor</em>, valet mellom <em class="nn">noko, nokon</em> og <em class="nn">nokre</em>, og særskriving. Han er inngangen til gruppa Typiske feil og gir elevane eit felles grunnlag før dei går laus på bøying, bokmålsord, småord og setningsbygnad kvar for seg.</p>`,
    mal: [
      `Elevane kan skrive dei vanlegaste småorda og spørjeorda på nynorsk.`,
      `Elevane kan velje rett mellom <em class="nn">kvar</em> og <em class="nn">kor</em>.`,
      `Elevane kan bruke teljetesten til å velje mellom <em class="nn">noko, nokon, nokre</em> og <em class="nn">ein, ei, eit</em>.`,
      `Elevane skriv samansette ord i eitt ord.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør kjenne omgrepa substantiv og kjønn. Modulane om substantiv og om småord i Del 2 er ein fordel, men ikkje eit krav.`,
    forebuing: [
      `Test presentasjonen og dei to tavleøvingane (lysbilete 7 og 14) på tavla.`,
      `Ha minitavler eller kladdeark klare til finn-feila-lysbiletet.`,
      `Ha små lappar klare til avslutninga.`,
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: `<p>Gå gjennom måla og lat elevane finne bokmålsorda i setninga.</p>`, lysbilete: "2 og 3" },
      { fase: "Småord og spørjeord", min: 9, gjer: `<p>Les lista i kor, gå gjennom kvar og kor, ta spørsmålet og ein tavlerunde med spørjeord. Vis diftongane.</p>`, lysbilete: "4 til 8" },
      { fase: "Noko og nokon", min: 11, gjer: `<p>Innfør teljetesten, vis tabellen for spørsmål og nekting, ta dei to spørsmåla etter kvarandre og samtalen om brød. Avslutt med tavleøving.</p>`, lysbilete: "9 til 14" },
      { fase: "Samansette ord og feilfinning", min: 5, gjer: `<p>Vis særskriving og vart/blei, og lat elevane finne feila i setninga.</p>`, lysbilete: "15 og 16" },
      { fase: "Eigenarbeid", min: 12, gjer: `<p>Elevane arbeider i modulen.</p>`, lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: `<p>Oppsummer og lat elevane skrive ned det småordet dei oftast skriv feil.</p>`, lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: `«<em class="nn">Noko</em> er inkjekjønn, så det heiter <em class="bm">noko hus</em>.»`, hjelp: `Bruk teljetesten. Hus kan du telje, så i ei positiv setning heiter det <em class="nn">eit hus</em>. <em class="nn">Noko</em> står til mengder (<em class="nn">noko brød</em>) og i spørsmål og nekting (<em class="nn">ikkje noko hus</em>).` },
      { feil: `«<em class="nn">Kvar</em> er nynorsk for <em class="bm">hvor</em>, alltid.»`, hjelp: `Skil mellom stad og grad. <em class="nn">Kvar bur du?</em> men <em class="nn">Kor mange kjem?</em> <em class="bm">Kvar mange</em> er alltid feil.` },
      { feil: `«<em class="nn">Også</em> er bokmål, så det må vere <em class="nn">òg</em>.»`, hjelp: `Begge er rette på nynorsk og tyder det same. Mange elevar overrettar ord som liknar bokmål. Vis dei at ordboka avgjer, ikkje kjensla.` },
    ],
    samtale: [
      `Kvifor trur du det er nettopp dei små orda som oftast blir feil?`,
      `Kva er skilnaden på <em class="nn">noko brød</em> og <em class="nn">nokre brød</em>?`,
      `Har dialekten din diftongar som <em class="nn">stein</em> og <em class="nn">heim</em>? Hjelper det når du skriv nynorsk?`,
    ],
    tilpassing: {
      stotte: [
        `Gi elevane ein huskelapp med småorda og spørjeorda, bokmål til venstre og nynorsk til høgre.`,
        `Lat elevane bruke teljetesten som to faste spørsmål: kan eg telje det, og er setninga positiv?`,
        `Start med mengdetreninga i spørjeord før dei går laus på noko/nokon.`,
      ],
      utfordring: [
        `Be elevane lage fem eigne setningar der <em class="nn">noko</em>, <em class="nn">nokon</em>, <em class="nn">nokre</em> og <em class="nn">eit</em> alle er med, og forklare valet.`,
        `Lat elevane finne ord i ordboka som kan vere både mengd og ting du tel, slik som <em class="nn">brød</em>.`,
      ],
    },
    vurdering: [
      `Tavleøvingane og dei to noko-spørsmåla viser raskt om klassen har forstått teljetesten.`,
      `Omsetjingsoppgåvene og skriveoppgåva til slutt viser om eleven bruker småorda rett i eigne setningar.`,
      `Kjenneteikn på god måloppnåing: eleven skriv småorda rett utan hjelp og kan grunngi valet mellom <em class="nn">noko, nokon</em> og <em class="nn">nokre</em>.`,
    ],
    vidare: `Gå vidare til Feil i bøying. Elevar som treng meir øving på småorda, kan bruke mengdetreninga med småord i Del 2.`,
  },
});

/* ------------------------------------------------------------------ */
Larar.register("feil-boying", {
  tittelnotat: `Dei fleste feila i nynorsktekstar er endingsfeil: ordet er rett, men endinga er henta frå bokmål. Det gode er at nokre få reglar rettar det meste. Sei det til elevane: i dag lærer de tre kontrollar som tek mange av feila i teksten dykkar.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>luke ut <em class="bm">-et</em> i fortid</li>
        <li>stryke <em class="bm">-er</em> på sterke verb</li>
        <li>rette <em class="bm">-en</em> og <em class="bm">-ene</em> på substantiv</li>
        <li>bøye adjektivet rett</li>
      </ul>`,
      notes: `Gå raskt gjennom måla. Nemn at alt dette er repetisjon frå grammatikken i Del 2. No er målet å finne feila i ein tekst.`,
    },
    {
      title: "Finn feila",
      body: `<p class="kjempe midt"><em class="bm">Jenten kastet ballen til hunden sin.</em></p>`,
      steps: [`<p class="midt">Det er <strong>2 feil</strong>.</p>`],
      svar: `<em class="nn"><strong>Jenta kasta</strong> ballen til hunden sin.</em> Hokjønn får -a i bestemt form, og a-verb får -a i fortid.`,
      notes: `Start med å la elevane finne feila utan hjelp. Mange ser <em>kastet</em>, færre ser <em>jenten</em>. Legg merke til at <em>hunden</em> er rett, for hund er hankjønn.`,
    },
    {
      title: "A-verb: -a, ikkje -et",
      body: `<table>
          <thead><tr><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kastet, hoppet, snakket</em></td><td><em class="nn">kasta, hoppa, snakka</em></td></tr>
            <tr><td><em class="bm">har kastet</em></td><td><em class="nn">har kasta</em></td></tr>
          </tbody>
        </table>`,
      steps: [`<p class="kjempe midt">Endinga <em class="bm">-et</em> finst ikkje på nynorsk.</p>`],
      notes: `Dette er den aller vanlegaste feilen. Regelen er enkel: ser du eit verb i fortid på -et, byt til -a. A-verba får -a både i preteritum og perfektum.`,
    },
    {
      type: "drill",
      title: "A-verb i fortid",
      intro: "Kva heiter preteritum? Klassen svarer i kor.",
      spec: { bank: "verbs", filter: { cls: ["a"] }, tasks: ["pret"], mode: "type" },
      n: 5,
      notes: `Hald tempoet oppe. Poenget er at -a skal sitje i øyret. Trykk «Nye oppgåver» for ein runde til om det går tregt.`,
    },
    {
      title: "Sterke verb: inga -er",
      body: `<table>
          <thead><tr><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kommer, skriver, finner</em></td><td><em class="nn">kjem, skriv, finn</em></td></tr>
          </tbody>
        </table>`,
      steps: [
        `<p class="stor">I presens står stamma åleine, ofte med <strong>vokalskifte</strong>.</p>`,
        `<p class="stor">Perfektum på <strong>-e</strong>: <em class="bm">har skrevet</em> → <em class="nn">har skrive</em>, <em class="bm">har funnet</em> → <em class="nn">har funne</em></p>`,
      ],
      notes: `Svake verb har -ar eller -er i presens (<em>kastar, kjøper</em>). Sterke verb har inga ending. Vokalskiftet ser du i <em>kome → kjem</em> og <em>sove → søv</em>. Kontrollen er: står det eit sterkt verb i presens på -er, stryk endinga.`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett: «Han ___ enno.» (sove)",
      options: ["sover", "søver", "søv", "sov"],
      correct: 2,
      explain: `<em class="nn">Sove</em> er eit sterkt verb: presens <em class="nn">søv</em>, utan ending og med vokalskifte. <em class="nn">Sov</em> er preteritum.`,
      notes: `<em>Søver</em> er ei vanleg blandingsform: vokalskiftet er med, men -er-endinga heng att. Spør klassen kva som er feil med ho.`,
    },
    {
      type: "drill",
      title: "Sterke verb i presens",
      intro: "Kva heiter presens? Hugs: inga -er.",
      spec: { bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pres"], mode: "type" },
      n: 5,
      notes: `Seier ein elev forma med -er, spør: er dette eit sterkt verb? Kva skjer då med endinga?`,
    },
    {
      title: "Substantiv: -a er nøkkelen",
      body: `<table>
          <thead><tr><th></th><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td>Hokjønn, bestemt eintal</td><td><em class="bm">boken, døren</em></td><td><em class="nn">boka, døra</em></td></tr>
            <tr><td>Inkjekjønn, bestemt fleirtal</td><td><em class="bm">husene, barnene</em></td><td><em class="nn">husa, barna</em></td></tr>
            <tr><td>Hankjønn, fleirtal</td><td><em class="bm">biler, bilene</em></td><td><em class="nn">bilar, bilane</em></td></tr>
          </tbody>
        </table>`,
      notes: `Peik på dei to øvste radene: begge feila rettar du med -a. Hankjønn får som regel -ar og -ane. Kan elevane kjønnet på ordet, kan dei bøyinga.`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett: «___ song i kor.» (jente, bestemt fleirtal)",
      options: ["Jentane", "Jentene", "Jentena"],
      correct: 1,
      explain: `Hokjønnsord får <em class="nn">-er</em> og <em class="nn">-ene</em> i fleirtal, akkurat som på bokmål: <em class="nn">jenter, jentene</em>. <em class="bm">Jentane</em> er hankjønnsbøying.`,
      notes: `Dette er overrettinga. Når elevane har lært at nynorsk har -ar og -ane, set dei det på alt. Minn dei om at berre hankjønnsord får -ar og -ane.`,
    },
    {
      type: "drill",
      title: "Hokjønnsord i bestemt form",
      intro: "Kva heiter ordet i bestemt form eintal?",
      spec: { bank: "nouns", filter: { g: ["f"] }, tasks: ["defSg"], mode: "type" },
      n: 6,
      notes: `Alle orda i denne runden er hokjønn, så svaret skal alltid ende på -a. Spør til slutt: kva ville bokmålsforma ha vore?`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor midt"><em class="bm">Alle husene i bygda har raude tak, og bilene står parkert langs den smale veien.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>.</p>`],
      svar: `<em class="nn">Alle <strong>husa</strong> i bygda har raude tak, og <strong>bilane</strong> står parkert langs den smale <strong>vegen</strong>.</em>`,
      notes: `<em>Husa</em>: inkjekjønn i bestemt fleirtal. <em>Bilane</em>: hankjønn. <em>Vegen</em> er eit bokmålsord meir enn ein bøyingsfeil: <em class="bm">vei</em> heiter <em>veg</em> på nynorsk. Bygda er rett, for bygd er hokjønn.`,
    },
    {
      title: "Adjektivet",
      steps: [
        `<p class="stor"><em class="bm">eit stor hus</em> → <em class="nn">eit stort hus</em> <span class="liten">inkjekjønn: -t</span></p>`,
        `<p class="stor"><em class="bm">ein fint dag</em> → <em class="nn">ein fin dag</em> <span class="liten">berre inkjekjønn får -t</span></p>`,
        `<p class="stor"><em class="bm">dei store hus</em> → <em class="nn">dei store husa</em> <span class="liten">dobbel bestemming</span></p>`,
      ],
      notes: `Tre ulike feil. Den første gløymer -t, den andre set -t der det ikkje skal vere. Den tredje handlar om dobbel bestemming: etter <em>den, det, dei</em> skal substantivet òg stå i bestemt form.`,
    },
    {
      type: "sporsmal",
      question: "Kva er rett?",
      options: [`<em class="nn">dei gamle husa</em>`, `<em class="nn">dei gamle husene</em>`, `<em class="nn">dei gamle hus</em>`],
      correct: 0,
      explain: `Inkjekjønn får -a i bestemt fleirtal, og etter <em class="nn">dei</em> skal substantivet stå i bestemt form: <em class="nn">dei gamle husa</em>.`,
      notes: `Her er to feil i eitt: det andre alternativet har bokmålsending, det tredje manglar dobbel bestemming.`,
    },
    {
      title: "Finn feila",
      body: `<p><em class="bm">I sommar reiste vi til ei lita hytte ved sjøen. Kvar morgon hoppet vi i vatnet, og etterpå spilte vi fotball på stranden. Om kvelden leste far høgt frå ei gammal bok, og vi sovnet tidleg.</em></p>`,
      steps: [`<p class="midt">Det er <strong>5 feil</strong>, og alle er bøyingsfeil.</p>`],
      svar: `<em class="bm">hoppet</em> → <em class="nn">hoppa</em>, <em class="bm">spilte</em> → <em class="nn">spela</em>, <em class="bm">stranden</em> → <em class="nn">stranda</em>, <em class="bm">leste</em> → <em class="nn">las</em>, <em class="bm">sovnet</em> → <em class="nn">sovna</em>`,
      notes: `Lat elevane arbeide to og to i to minutt. <em>Spilte</em> og <em>leste</em> er vanskelegast: på nynorsk er <em>spele</em> eit a-verb (<em>spela</em>), og <em>lese</em> er sterkt (<em>les, las, har lese</em>). <em>Reiste</em> er rett, for reise er eit e-verb.`,
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Sorter formene: rett eller feil?</li>
          <li>Fyll inn verb og substantiv.</li>
          <li>Finn feila i setningane og teksten.</li>
          <li>Skriv om helga di og kontroller teksten.</li>
        </ul>`,
      tid: 12,
      notes: `Gå rundt og be elevane seie kva for ein regel dei bruker når dei rettar. Dei som blir tidleg ferdige, kan ta mengdetreninga med verb og substantiv i Del 2.`,
    },
    {
      title: "Tre raske kontrollar",
      steps: [
        `<p class="stor">1. Verb i fortid på <em class="bm">-et</em>? Byt til <em class="nn">-a</em>.</p>`,
        `<p class="stor">2. Sterkt verb i presens på <em class="bm">-er</em>? Stryk endinga.</p>`,
        `<p class="stor">3. Hokjønn på <em class="bm">-en</em> eller inkjekjønn i fleirtal på <em class="bm">-ene</em>? Byt til <em class="nn">-a</em>.</p>`,
      ],
      notes: `Dette er oppsummeringa. Be elevane skrive dei tre kontrollane inn i skriveboka eller på innsida av permen. Dei skal bruke dei kvar gong dei leverer ein nynorsktekst.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen tek føre seg endingsfeila som oftast går att i nynorsktekstar: <em class="bm">-et</em> i fortid på a-verb, <em class="bm">-er</em> i presens på sterke verb, bokmålsendingar på hokjønns- og inkjekjønnsord, og feil bøying av adjektiv. Målet er ikkje å lære bøyinga på nytt, men å gi elevane tre raske kontrollar dei kan bruke på eigne tekstar.</p>`,
    mal: [
      `Elevane kan finne og rette <em class="bm">-et</em> i fortid og <em class="bm">-er</em> i presens på sterke verb.`,
      `Elevane kan rette bestemt form av hokjønnsord og inkjekjønnsord i fleirtal.`,
      `Elevane kan bøye adjektivet rett i inkjekjønn og bruke dobbel bestemming.`,
      `Elevane kan bruke tre faste kontrollar når dei les gjennom eigen tekst.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør kjenne verbklassane (a-verb, e-verb, sterke verb) og dei tre kjønna. Modulane om verb og substantiv i Del 2 dekkjer dette.`,
    forebuing: [
      `Test tavleøvingane på lysbilete 5, 8 og 11 på førehand.`,
      `Ha minitavler eller kladdeark klare til finn-feila-lysbileta.`,
      `Sjå til at elevane har tilgang til kurset på eigen maskin.`,
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: `<p>Gå gjennom måla og lat elevane finne dei to feila i setninga om jenta.</p>`, lysbilete: "2 og 3" },
      { fase: "Verb", min: 10, gjer: `<p>Gå gjennom -et og -er, ta spørsmålet om <em class="nn">søv</em> og to korte tavlerundar.</p>`, lysbilete: "4 til 8" },
      { fase: "Substantiv og adjektiv", min: 11, gjer: `<p>Vis tabellen, ta spørsmålet om <em class="nn">jentene</em>, tavlerunden og finn-feila-setninga. Gå gjennom adjektivet.</p>`, lysbilete: "9 til 14" },
      { fase: "Feilfinning i tekst", min: 5, gjer: `<p>Elevane finn dei fem feila to og to før du viser svaret.</p>`, lysbilete: "15" },
      { fase: "Eigenarbeid", min: 12, gjer: `<p>Elevane arbeider i modulen.</p>`, lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: `<p>Gå gjennom dei tre kontrollane og lat elevane skrive dei ned.</p>`, lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: `«Alle fleirtalsformer på nynorsk endar på -ar og -ane.»`, hjelp: `Berre hankjønnsord. Hokjønn har <em class="nn">jenter, jentene</em>, og inkjekjønn har <em class="nn">hus, husa</em>. Lat eleven finne kjønnet først.` },
      { feil: `«<em class="nn">Søver</em> og <em class="nn">kjemer</em> er nynorsk, for vokalen er endra.»`, hjelp: `Sterke verb har <em>både</em> vokalskifte og inga ending i presens: <em class="nn">søv, kjem</em>. Seier eleven -er, spør om verbet er sterkt.` },
      { feil: `«Alle verb i fortid endar på -a.»`, hjelp: `Berre a-verba. E-verb har <em class="nn">-te</em> eller <em class="nn">-de</em> (<em class="nn">reiste, kjøpte</em>), og sterke verb har eiga form (<em class="nn">las, sov</em>). Lat eleven slå opp verbet om han er usikker.` },
    ],
    samtale: [
      `Kvifor trur du endingane er det som oftast blir feil når vi skriv nynorsk?`,
      `Korleis kan du finne ut om eit substantiv er hokjønn når du er usikker?`,
      `Kva av dei tre kontrollane trur du at du treng mest?`,
    ],
    tilpassing: {
      stotte: [
        `Lat elevane berre bruke den første kontrollen (-et) i første runde, og leggje til dei andre etter kvart.`,
        `Gi elevane ei liste med dei vanlegaste sterke verba i presens: <em class="nn">kjem, går, ser, et, søv, skriv, finn</em>.`,
        `Lat elevane markere alle verb i ein farge og alle substantiv i ein annan før dei rettar.`,
      ],
      utfordring: [
        `Be elevane skrive ein tekst der dei med vilje gøymer fem bøyingsfeil, og la ein medelev finne dei.`,
        `Lat elevane finne verb som kan vere både a-verb og e-verb på nynorsk, og slå opp i ordboka.`,
      ],
    },
    vurdering: [
      `Finn-feila-lysbileta viser raskt kva feiltypar klassen ser, og kva dei overser.`,
      `Skriveoppgåva til slutt i modulen viser om eleven brukar kontrollane på eigen tekst.`,
      `Kjenneteikn på god måloppnåing: eleven finn endingsfeila utan hint og kan forklare regelen bak kvar retting.`,
    ],
    vidare: `Gå vidare til Bokmålsord som snik seg inn. Elevar som treng meir øving, kan bruke mengdetreninga med verb og substantiv i Del 2.`,
  },
});

/* ------------------------------------------------------------------ */
Larar.register("feil-bokmalsord", {
  tittelnotat: `Bokmålsord kjem i to slag: dei som ikkje finst på nynorsk, og dei som er lov, men har eit betre nynorskord. Poenget med timen er å lære elevane å skilje dei, så dei rettar det som er feil og lèt det som er rett, stå.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>kjenne att ord som <strong>berre finst på bokmål</strong></li>
        <li>finne betre ord for <em class="bm">-het</em> og <em class="bm">-else</em></li>
        <li>vite kva <em>an-</em> og <em>be-</em>ord som er lov</li>
        <li><strong>ikkje overrette</strong></li>
      </ul>`,
      notes: `Gå raskt gjennom måla. Det siste punktet er viktig: mange elevar har lært at alle be-ord er feil, og rettar difor ord som er heilt i orden.`,
    },
    {
      title: "To slags bokmålsord",
      body: `<div class="to-kol">
          <div class="boks"><h3>Finst ikkje</h3><p>Må bytast ut.</p><p><em class="bm">jeg, hvis, uke</em></p></div>
          <div class="boks"><h3>Lov, men …</h3><p>Nynorsk har ofte eit betre ord.</p><p><em class="nn">forskjell</em> → <em class="nn">skilnad</em></p></div>
        </div>`,
      notes: `Teikn gjerne dei to boksane på tavla og la dei stå heile timen. Kvar gong de møter eit nytt ord, spør: kva boks høyrer det til i?`,
    },
    {
      title: "Ord som berre finst på bokmål",
      body: `<div class="to-kol">
          <table>
            <tbody>
              <tr><td><em class="bm">hvis</em></td><td>→ <em class="nn">viss, dersom, om</em></td></tr>
              <tr><td><em class="bm">selv</em></td><td>→ <em class="nn">sjølv</em></td></tr>
              <tr><td><em class="bm">hverandre</em></td><td>→ <em class="nn">kvarandre</em></td></tr>
              <tr><td><em class="bm">annerledes</em></td><td>→ <em class="nn">annleis</em></td></tr>
              <tr><td><em class="bm">siden</em></td><td>→ <em class="nn">sidan</em></td></tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr><td><em class="bm">uke</em></td><td>→ <em class="nn">veke</em></td></tr>
              <tr><td><em class="bm">spise</em></td><td>→ <em class="nn">ete</em></td></tr>
              <tr><td><em class="bm">kirke</em></td><td>→ <em class="nn">kyrkje</em></td></tr>
              <tr><td><em class="bm">søster</em></td><td>→ <em class="nn">syster</em></td></tr>
              <tr><td><em class="bm">sammen</em></td><td>→ <em class="nn">saman</em></td></tr>
            </tbody>
          </table>
        </div>`,
      notes: `Sei bokmålsordet og lat klassen svare. Pass på <em>spise</em>: nynorsk har <em>ete, et, åt, har ete</em>. Elevane skriv ofte <em class="bm">spiste</em> sjølv når resten av teksten er god nynorsk. Resten av lista står i leksjonen: <em>hjem → heim, vei → veg, penger → pengar, klær → klede</em>.`,
    },
    {
      type: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter ordet på nynorsk? Klassen svarer i kor.",
      spec: { bank: "words", filter: { tags: ["smaord", "diverse"] }, tasks: ["bm2nn"], mode: "type" },
      n: 6,
      notes: `Er fleire former tillatne, held det at elevane seier éi av dei. Trykk «Nye oppgåver» om du vil ta ein runde til.`,
    },
    {
      type: "sporsmal",
      question: "Kva for ei setning er rett nynorsk?",
      options: [`<em class="nn">Eg kjem nå.</em>`, `<em class="bm">Jeg kjem no.</em>`, `<em class="bm">Eg kjem ikke no.</em>`],
      correct: 0,
      explain: `<em class="nn">Nå</em> er tillate på nynorsk ved sida av <em class="nn">no</em>. <em class="bm">Jeg</em> og <em class="bm">ikke</em> er reine bokmålsord.`,
      notes: `Mange elevar vel feil her fordi dei trur <em>nå</em> er bokmål. Poenget er at ikkje alt som liknar bokmål, er feil. Vel éi form, <em>no</em> eller <em>nå</em>, og hald deg til henne i heile teksten.`,
    },
    {
      title: "Finn feila",
      body: `<p class="kjempe midt"><em class="bm">Jeg trur ikke at vi rekk bussen hvis vi ikkje spring.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>.</p>`],
      svar: `<em class="nn"><strong>Eg</strong> trur <strong>ikkje</strong> at vi rekk bussen <strong>viss</strong> (dersom, om) vi ikkje spring.</em>`,
      notes: `Legg merke til at <em>ikkje</em> seinare i setninga er rett. Slik ser elevtekstar ofte ut: same ordet står rett éin stad og feil ein annan stad. Det er difor vi les korrektur.`,
    },
    {
      title: "-het og -else",
      body: `<table>
          <thead><tr><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kjærlighet</em></td><td><em class="nn">kjærleik</em></td></tr>
            <tr><td><em class="bm">frihet</em></td><td><em class="nn">fridom</em></td></tr>
            <tr><td><em class="bm">sannhet</em></td><td><em class="nn">sanning</em></td></tr>
            <tr><td><em class="bm">mulighet</em></td><td><em class="nn">moglegheit, høve, sjanse</em></td></tr>
            <tr><td><em class="bm">bevegelse</em></td><td><em class="nn">rørsle</em></td></tr>
            <tr><td><em class="bm">skuffelse</em></td><td><em class="nn">vonbrot</em></td></tr>
          </tbody>
        </table>`,
      notes: `Ord på -het og -else er nesten alltid feil på nynorsk. Legg merke til <em>moglegheit</em>: ho endar på -heit, ikkje -het, og er heilt vanleg nynorsk.`,
    },
    {
      title: "Mønsteret",
      steps: [
        `<p class="stor"><em class="bm">-het</em> → <em class="nn">-leik</em> (kjærleik), <em class="nn">-dom</em> (fridom), <em class="nn">-skap</em> (dumskap), <em class="nn">-ing</em> (sanning)</p>`,
        `<p class="stor"><em class="bm">-else</em> → <em class="nn">-ing</em> (øving), <em class="nn">-sle</em> (rørsle, kjensle) eller eit heilt anna ord (vonbrot)</p>`,
      ],
      notes: `Elevane treng ikkje pugge alle orda. Kan dei mønsteret, veit dei at dei skal leite etter eit anna ord når dei ser -het eller -else. Så slår dei opp.`,
    },
    {
      type: "drill",
      title: "Finst det eit betre ord?",
      intro: "Kva heiter ordet på nynorsk?",
      spec: { bank: "words", filter: { tags: ["het"] }, tasks: ["bm2nn"], mode: "mixed" },
      n: 6,
      notes: `Nokre av orda er vanskelege. Gi elevane hint med mønsteret: kva ending passar, -leik, -dom eller -sle?`,
    },
    {
      title: "Lov, men finst betre ord",
      body: `<table>
          <thead><tr><th>Lov</th><th>Ofte betre</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">anbefale</em></td><td><em class="nn">tilrå, rå til</em></td></tr>
            <tr><td><em class="nn">betydning</em></td><td><em class="nn">tyding</em></td></tr>
            <tr><td><em class="nn">forskjell</em></td><td><em class="nn">skilnad</em></td></tr>
            <tr><td><em class="nn">erfaring</em></td><td><em class="nn">røynsle</em></td></tr>
          </tbody>
        </table>`,
      steps: [`<p class="midt">Heilt greie: <em class="nn">betale, begynne, bety, bestemme, forklaring</em></p>`],
      notes: `Orda til venstre står i Nynorskordboka og er ikkje feil. Men ein tekst med mange av dei kjennest meir som bokmål. Oppmuntre elevane til å prøve dei nynorske alternativa, men ikkje trekk for dei tillatne formene.`,
    },
    {
      type: "sporsmal",
      question: "Kva for eitt av orda er <strong>feil</strong> på nynorsk?",
      options: [`<em class="nn">betale</em>`, `<em class="nn">forklaring</em>`, `<em class="bm">kjærlighet</em>`, `<em class="nn">begynne</em>`],
      correct: 2,
      explain: `<em class="bm">Kjærlighet</em> finst ikkje på nynorsk. Ordet er <em class="nn">kjærleik</em>. Dei andre tre er heilt vanleg nynorsk.`,
      notes: `Elevar som har lært at be-ord er feil, vel <em>betale</em> eller <em>begynne</em>. Bruk det til å snakke om overretting.`,
    },
    {
      title: "Ikkje overrett!",
      body: `<p class="stor midt">Står ordet i <strong>Nynorskordboka</strong>, er det lov.</p>
        <p class="midt">ordbokene.no</p>`,
      steps: [`<p class="stor midt"><em class="nn">Betale</em> er nynorsk. <em class="nn">Forklaring</em> er nynorsk.</p>`],
      notes: `Vis gjerne ordbokene.no på tavla og slå opp eit par ord saman med klassen, til dømes <em>begynne</em> og <em>begynnelse</em>. Det første står der, det andre gjer ikkje: nynorsk har <em>byrjing</em>.`,
    },
    {
      type: "diskuter",
      title: "Kva boks?",
      prompt: `<p>Sorter orda: <strong>feil</strong>, <strong>lov men finst betre</strong>, eller <strong>heilt greitt</strong>?</p>
        <p class="stor"><em>sannhet · bestemme · forskjell · bevegelse · erfaring · moglegheit</em></p>`,
      form: "To og to",
      tid: 3,
      svar: `Feil: <em class="bm">sannhet, bevegelse</em>. Lov, men finst betre: <em class="nn">forskjell</em> (skilnad), <em class="nn">erfaring</em> (røynsle). Heilt greitt: <em class="nn">bestemme, moglegheit</em>.`,
      notes: `Bruk dei to boksane frå tidlegare i timen. Lat elevane grunngi plasseringa: kva ending har ordet, og står det i ordboka?`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor"><em class="bm">Eg og syster mi gjorde leksene sammen i går. Etterpå gjekk vi hjem til bestemor, som bur rett ved kirken, og spiste vaflar.</em></p>`,
      steps: [`<p class="midt">Det er <strong>4 feil</strong>.</p>`],
      svar: `<em class="bm">sammen</em> → <em class="nn">saman</em>, <em class="bm">hjem</em> → <em class="nn">heim</em>, <em class="bm">kirken</em> → <em class="nn">kyrkja</em>, <em class="bm">spiste</em> → <em class="nn">åt</em>`,
      notes: `<em>Kyrkja</em> er dobbel retting: både ordet og endinga, sidan kyrkje er hokjønn. <em>Spiste</em> blir <em>åt</em>, preteritum av <em>ete</em>. Legg merke til at <em>syster mi</em> er rett.`,
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Para saman bokmål og nynorsk.</li>
          <li>Sorter orda i dei tre gruppene.</li>
          <li>Fyll inn, set om og finn feila i tekstane.</li>
        </ul>`,
      tid: 12,
      notes: `Gå rundt og sjå særleg på sorteringsoppgåva. Spør elevar som plasserer be-ord under «feil»: har du sjekka ordboka? Dei som blir tidleg ferdige, kan ta -het-drillen i Del 2.`,
    },
    {
      title: "Tre raske kontrollar",
      steps: [
        `<p class="stor">1. Leit etter snikarane: <em class="bm">ikke, bare, hva, jeg, hvis, da, siden, selv</em>.</p>`,
        `<p class="stor">2. Leit etter <em class="bm">-het</em> og <em class="bm">-else</em>. Finn eit nynorskord.</p>`,
        `<p class="stor">3. Eit an- eller be-ord? Sjekk ordboka <strong>før</strong> du rettar.</p>`,
      ],
      notes: `Be elevane skrive ned eitt ord dei ofte har skrive feil, og nynorskordet ved sida av. Samle lappane og bruk dei som oppvarming neste gong.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen handlar om bokmålsord som snik seg inn i nynorsktekstar. Elevane lærer å skilje mellom ord som ikkje finst på nynorsk (<em class="bm">jeg, hvis, uke, frihet</em>), ord som er lov men har eit betre nynorskord (<em class="nn">forskjell, erfaring</em>), og ord som er heilt greie (<em class="nn">betale, forklaring</em>). Eit viktig mål er å hindre overretting: at elevane strekar under kvart be-ord og rettar det som er rett.</p>`,
    mal: [
      `Elevane kan byte ut dei vanlegaste orda som berre finst på bokmål.`,
      `Elevane kan finne nynorske ord for bokmålsord på <em class="bm">-het</em> og <em class="bm">-else</em>.`,
      `Elevane kan skilje mellom ord som er feil, ord som er lov, og ord som har eit betre nynorsk alternativ.`,
      `Elevane bruker ordboka til å sjekke ord dei er usikre på.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør ha gått gjennom Skrivereglar og vanlege fallgruver. Det er ein fordel om dei har brukt Nynorskordboka før (Del 3).`,
    forebuing: [
      `Test tavleøvingane på lysbilete 5 og 10.`,
      `Ha ordbokene.no open i ei eiga fane, så du kan slå opp ord på tavla.`,
      `Teikn gjerne dei to boksane frå lysbilete 3 på tavla før timen.`,
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: `<p>Gå gjennom måla og innfør dei to slaga bokmålsord.</p>`, lysbilete: "2 og 3" },
      { fase: "Ord som ikkje finst", min: 9, gjer: `<p>Gå gjennom lista, ta ein tavlerunde, spørsmålet om <em class="nn">nå</em> og den første feilfinninga.</p>`, lysbilete: "4 til 7" },
      { fase: "-het, -else og be-ord", min: 12, gjer: `<p>Vis tabellen og mønsteret, ta tavlerunden og gå gjennom orda som er lov. Snakk om overretting.</p>`, lysbilete: "8 til 13" },
      { fase: "Sortering og feilfinning", min: 5, gjer: `<p>Elevane sorterer orda to og to og finn feila i teksten.</p>`, lysbilete: "14 og 15" },
      { fase: "Eigenarbeid", min: 12, gjer: `<p>Elevane arbeider i modulen.</p>`, lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: `<p>Gå gjennom dei tre kontrollane og lat elevane skrive ned eitt ord dei ofte skriv feil.</p>`, lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: `«Alle ord som byrjar på an- eller be-, er feil på nynorsk.»`, hjelp: `Mange er heilt vanlege: <em class="nn">betale, begynne, bety, bestemme</em>. Lær elevane å slå opp før dei rettar.` },
      { feil: `«<em class="nn">Nå</em> er bokmål, så det må vere <em class="nn">no</em>.»`, hjelp: `Begge formene er tillatne på nynorsk. Det viktige er å vere konsekvent i same tekst.` },
      { feil: `«<em class="nn">Moglegheit</em> er feil, for det endar på -het.»`, hjelp: `Det endar på <em class="nn">-heit</em>, og det står i Nynorskordboka. Det er <em class="bm">mulighet</em> som er feil.` },
    ],
    samtale: [
      `Kvifor trur du nokre bokmålsord er lov på nynorsk, og andre ikkje?`,
      `Kva er skilnaden på å skrive korrekt nynorsk og å skrive god nynorsk?`,
      `Korleis kan du vite om eit ord er lov når du er usikker?`,
    ],
    tilpassing: {
      stotte: [
        `Gi elevane ei liste med dei ti vanlegaste snikarane og nynorskorda ved sida av.`,
        `Lat elevane berre leite etter éin feiltype om gongen: først reine bokmålsord, så -het og -else.`,
        `Vis korleis ein slår opp i Nynorskordboka, steg for steg.`,
      ],
      utfordring: [
        `Be elevane finne fem nye ord på -het eller -else i ein bokmålstekst og finne nynorske ord for dei i ordboka.`,
        `Lat elevane skrive om eit avsnitt med mange «lov, men»-ord til eit meir typisk nynorsk avsnitt, og samanlikne.`,
      ],
    },
    vurdering: [
      `Sorteringa på lysbilete 14 viser om elevane skil mellom feil og tillatne ord.`,
      `Finn-feila-oppgåvene i modulen viser om eleven ser bokmålsorda i ein samanhengande tekst.`,
      `Kjenneteikn på god måloppnåing: eleven rettar reine bokmålsord, vel gjerne nynorske alternativ, og overrettar ikkje tillatne ord.`,
    ],
    vidare: `Gå vidare til Småord og funksjonsord. Elevar som treng meir øving, kan bruke drillen med -het og -else i mengdetreninga med småord i Del 2.`,
  },
});

/* ------------------------------------------------------------------ */
Larar.register("feil-smaord", {
  tittelnotat: `Småorda er dei orda vi skriv fortast og tenkjer minst over, og difor er det her bokmålet snik seg inn. Den største fella er <em>de</em> og <em>dei</em>, som tyder noko anna på nynorsk enn på bokmål. Start timen med nettopp den.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>skilje <em class="nn">de</em>, <em class="nn">dei</em> og <em class="nn">dykk</em></li>
        <li>bruke pronomen utan bokmålsformer</li>
        <li>velje <em class="nn">sin</em> eller <em class="nn">hans</em></li>
        <li>velje <em class="nn">då</em> eller <em class="nn">når</em>, <em class="nn">kvar</em> eller <em class="nn">kor</em></li>
      </ul>`,
      notes: `Gå raskt gjennom måla. Fortel at dette er feil som òg flinke nynorskskrivarar gjer, fordi orda er så små at vi ikkje legg merke til dei.`,
    },
    {
      type: "sporsmal",
      question: "Du snakkar til to vener som er seine. Kva seier du?",
      options: [`<em class="nn">Dei må skunde dykk!</em>`, `<em class="nn">De må skunde dykk!</em>`, `<em class="nn">De må skunde dei!</em>`],
      correct: 1,
      explain: `Du snakkar <strong>til</strong> dei: <em class="nn">de</em> er subjekt og <em class="nn">dykk</em> er objekt. <em class="nn">Dei må skunde seg</em> ville handla om nokon andre.`,
      notes: `Ta dette før du forklarer noko. Mange vel det første alternativet, fordi <em>dei</em> kjennest meir nynorsk. Det er den største fella i heile modulen.`,
    },
    {
      title: "Den største fella",
      body: `<div class="to-kol">
          <div class="boks"><h3><em class="nn">de</em></h3><p>dei du snakkar <strong>til</strong></p><p>= <em class="bm">dere</em></p><p><em class="nn">De må skunde dykk.</em></p></div>
          <div class="boks"><h3><em class="nn">dei</em></h3><p>dei du snakkar <strong>om</strong></p><p>= <em class="bm">de, dem</em></p><p><em class="nn">Dei må skunde seg.</em></p></div>
        </div>`,
      notes: `Teikn gjerne to piler på tavla: ei mot klassen (de) og ei mot døra (dei). Spør: snakkar eg til dykk eller om nokon andre?`,
    },
    {
      title: "Pronomen",
      body: `<table>
          <thead><tr><th>Subjekt</th><th>Objekt</th><th>Eigedom</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">han</em></td><td><em class="nn">han</em> (honom)</td><td><em class="nn">hans</em></td></tr>
            <tr><td><em class="nn">ho</em></td><td><em class="nn">henne</em> (ho)</td><td><em class="nn">hennar</em></td></tr>
            <tr><td><em class="nn">de</em></td><td><em class="nn">dykk</em></td><td><em class="nn">dykkar</em></td></tr>
            <tr><td><em class="nn">dei</em></td><td><em class="nn">dei</em></td><td><em class="nn">deira</em></td></tr>
          </tbody>
        </table>`,
      steps: [`<p class="stor midt">Finst ikkje: <em class="bm">hun, ham, dem, hennes, deres</em></p>`],
      notes: `<em>Dokker</em> og <em>dokkar</em> er òg tillatne for <em>de, dykk, dykkar</em>. Legg vekt på at <em>dei</em> er same form som subjekt og objekt. <em class="bm">Dem</em> finst ikkje.`,
    },
    {
      type: "drill",
      title: "Pronomen i setning",
      intro: "Les setninga høgt. Er det subjekt eller objekt? Snakkar vi til nokon eller om nokon?",
      spec: { bank: "sentences", set: ["pronomen"], mode: "choice" },
      n: 6,
      notes: `Be elevane seie kvifor: er ordet subjekt eller objekt? Oppgåvene blir trekte tilfeldig, så du får nye kvar gong.`,
    },
    {
      title: "Då eller når?",
      body: `<div class="daanaar">
          <div class="dn-rad"><span class="dn-ord">då</span><span class="dn-linje"><i class="dn-prikk"></i></span><span class="dn-tekst">éin gong i fortida: <em class="nn">Då eg vakna i går …</em></span></div>
          <div class="dn-rad"><span class="dn-ord">når</span><span class="dn-linje fleire"><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-pil"></i></span><span class="dn-tekst">kvar gong eller framtid: <em class="nn">Når eg vaknar, et eg frukost.</em></span></div>
        </div>`,
      steps: [
        `<p class="stor midt"><em class="nn">kvar</em> = stad, <em class="nn">kor</em> = grad og mengd</p>`,
      ],
      notes: `Hugseregelen er «den gongen då, kvar gong når». Minn om at <em class="bm">kvar mange</em> alltid er feil, medan <em>kor</em> òg kan brukast om stad.`,
    },
    {
      type: "drill",
      title: "Då eller når? Kvar eller kor?",
      spec: { bank: "sentences", set: ["daNar", "kvarKor"], mode: "choice" },
      n: 6,
      notes: `Be elevane seie hugseregelen for kvar oppgåve: éin gong i fortida, eller kvar gong? Stad eller mengd?`,
    },
    {
      title: "Eigedom: Kari si bok",
      body: `<p class="stor midt">Ikkje <em class="bm">Karis bok</em>, men <em class="nn">Kari si bok</em> eller <em class="nn">boka til Kari</em>.</p>`,
      steps: [
        `<p class="stor"><em class="nn">Kari sin</em> bil · <em class="nn">Kari si</em> bok · <em class="nn">Kari sitt</em> hus · <em class="nn">Kari sine</em> bøker</p>`,
        `<p class="stor midt">Feil: <em class="bm">Kari sin bok</em> (manglar samsvar)</p>`,
      ],
      notes: `Sin-forma må samsvare med det ein eig, ikkje med den som eig. Bok er hokjønn, så det heiter <em>si</em>, same kven som eig boka: også <em>Per si bok</em>.`,
    },
    {
      title: "Sin eller hans?",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">Han tok boka <strong>si</strong>.</em></td><td>si eiga bok</td></tr>
            <tr><td><em class="nn">Han tok boka <strong>hans</strong>.</em></td><td>boka til ein annan</td></tr>
          </tbody>
        </table>`,
      steps: [`<p class="stor midt"><em class="nn">sin, si, sitt, sine</em> peikar tilbake på <strong>subjektet</strong>.</p>`],
      notes: `Lat to elevar spele det: den eine tek si eiga bok, den andre tek boka til sidemannen. Spør klassen kva setning som passar til kva handling.`,
    },
    {
      type: "sporsmal",
      question: "Kari gløymde boka på skulen. Per tok boka ___ og sprang etter henne.",
      options: ["si", "hennar", "hennes", "sin"],
      correct: 1,
      explain: `Subjektet er Per, men boka er Kari si. Difor kan det ikkje vere <em class="nn">si</em>. Det heiter <em class="nn">hennar</em>. <em class="bm">Hennes</em> finst ikkje på nynorsk.`,
      notes: `Spør: kven er subjektet? Per. Er det Per si bok? Nei. Då må det vere <em>hennar</em>.`,
    },
    {
      type: "drill",
      title: "Sin eller hans?",
      spec: { bank: "sentences", set: ["possessiv"], mode: "choice" },
      n: 5,
      notes: `Be elevane peike ut subjektet før dei vel. Peikar eigedomsordet tilbake på det, er det sin, si, sitt eller sine.`,
    },
    {
      title: "Ein, ei, eit og kva for ein",
      steps: [
        `<p class="stor"><em class="bm">en, et</em> → <em class="nn">ein bil, ei bok, eit hus</em></p>`,
        `<p class="stor"><em class="bm">hvilken</em> → <em class="nn">kva for ein</em> (bil), <em class="nn">kva for ei</em> (bok), <em class="nn">kva for eit</em> (hus)</p>`,
        `<p class="stor">Ofte held det med <em class="nn">kva</em>: <em class="nn">Kva bok les du?</em></p>`,
      ],
      notes: `<em class="bm">En</em> og <em class="bm">et</em> er alltid feil i ein nynorsktekst. Dei er lette å oversjå fordi dei er så korte. I fleirtal heiter det <em>kva for nokre</em> (bøker).`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor midt">Emma snakkar til to vener:</p>
        <p class="kjempe midt"><em class="bm">Dei må skunde dykk, for filmen startar om fem minutt, og hun har alt kjøpt billettane til dere.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>.</p>`],
      svar: `<em class="nn"><strong>De</strong> må skunde dykk, … og <strong>ho</strong> har alt kjøpt billettane til <strong>dykk</strong>.</em>`,
      notes: `<em>Dere</em> som objekt heiter <em>dykk</em> (eller <em>dokker</em>). Spør klassen kvifor <em>dykk</em> er rett i starten av setninga, men <em>dei</em> er feil.`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor"><em class="bm">Kari sin bok ligg på bordet, men Karis penal er borte. Per seier at han la det i sekken hennes i går.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>, og alle handlar om eigedom.</p>`],
      svar: `<em class="nn">Kari <strong>si</strong> bok</em>, <em class="nn">Kari <strong>sitt</strong> penal</em> (eller <em class="nn">penalet til Kari</em>), <em class="nn">sekken <strong>hennar</strong></em>`,
      notes: `Bok er hokjønn: <em>si</em>. Penal er inkjekjønn: <em>sitt</em>. Til slutt er det <em>hennar</em> og ikkje <em>sin</em>, for subjektet er Per, og sekken er Kari sin.`,
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Fleirval om <em class="nn">de/dei</em> og <em class="nn">si/hennar</em>.</li>
          <li>Fyll inn pronomen og småord.</li>
          <li>Finn feila i setningane og i klassetur-teksten.</li>
        </ul>`,
      tid: 12,
      notes: `Klassetur-teksten til slutt har sju feil og er den vanskelegaste. Hjelp elevane med hintet: sjå særleg etter de/dei, då/når og eigedomsord. Dei som blir tidleg ferdige, kan ta småordsdrillane i Del 2.`,
    },
    {
      title: "Tre raske kontrollar",
      steps: [
        `<p class="stor">1. <em class="nn">de</em> eller <em class="nn">dei</em>? Snakkar du <strong>til</strong> eller <strong>om</strong>?</p>`,
        `<p class="stor">2. <em class="nn">sin/si/sitt/sine</em>? Peikar det tilbake på subjektet?</p>`,
        `<p class="stor">3. Leit etter <em class="bm">hun, ham, dem, hennes, deres, en, et</em>.</p>`,
      ],
      notes: `Avslutt med ein rask munnleg runde: sei ei setning med de eller dei, og lat klassen seie om du snakkar til eller om nokon.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen tek føre seg dei små orda som avslører bokmålstenking: personlege pronomen og særleg skiljet mellom <em class="nn">de, dei</em> og <em class="nn">dykk</em>, eigedomsord med <em class="nn">sin/si/sitt/sine</em> mot <em class="nn">hans/hennar/deira</em>, <em class="nn">då/når</em>, <em class="nn">kvar/kor</em>, <em class="nn">ein/ei/eit</em> og <em class="nn">kva for ein</em>. Dette er feil som også sterke elevar gjer, fordi orda går så fort i skrivinga.</p>`,
    mal: [
      `Elevane kan skilje mellom <em class="nn">de</em>, <em class="nn">dei</em> og <em class="nn">dykk</em>.`,
      `Elevane bruker nynorske pronomen og eigedomsord utan bokmålsformer.`,
      `Elevane kan velje mellom <em class="nn">sin</em> og <em class="nn">hans/hennar/deira</em> ut frå subjektet.`,
      `Elevane kan velje rett mellom <em class="nn">då/når</em> og <em class="nn">kvar/kor</em>.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør kjenne omgrepa subjekt og objekt. Modulane om pronomen i Del 2 og om setningsledd i Grunnomgrep dekkjer dette.`,
    forebuing: [
      `Test tavleøvingane på lysbilete 6, 8 og 12, og sjå at då/når-figuren på lysbilete 7 blir vist rett.`,
      `Ha minitavler eller kladdeark klare til finn-feila-lysbileta.`,
      `Tenk ut eit par eigne døme med de og dei frå klasserommet.`,
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: `<p>Gå gjennom måla og ta spørsmålet om dei seine venene før du forklarer. Vis så skiljet mellom de og dei.</p>`, lysbilete: "2 til 4" },
      { fase: "Pronomen", min: 6, gjer: `<p>Gå gjennom tabellen og ta ein tavlerunde.</p>`, lysbilete: "5 og 6" },
      { fase: "Då, når, kvar, kor", min: 5, gjer: `<p>Vis figuren og ta ein tavlerunde.</p>`, lysbilete: "7 og 8" },
      { fase: "Eigedom", min: 9, gjer: `<p>Gå gjennom sin-forma og samsvar, sin mot hans, spørsmålet om Kari si bok og ein tavlerunde. Vis ein/ei/eit og kva for ein.</p>`, lysbilete: "9 til 13" },
      { fase: "Feilfinning", min: 5, gjer: `<p>Elevane finn feila i dei to setningane.</p>`, lysbilete: "14 og 15" },
      { fase: "Eigenarbeid", min: 12, gjer: `<p>Elevane arbeider i modulen.</p>`, lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: `<p>Gå gjennom dei tre kontrollane med ein munnleg runde.</p>`, lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: `«<em class="nn">Dei</em> er nynorsk for <em class="bm">de</em>, så <em class="nn">de</em> er alltid feil.»`, hjelp: `<em class="nn">De</em> finst på nynorsk, men tyder <em class="bm">dere</em>. Spør: snakkar du til nokon eller om nokon?` },
      { feil: `«<em class="nn">Sin</em> betyr at nokon eig noko, så det passar alltid.»`, hjelp: `<em class="nn">Sin</em> peikar tilbake på subjektet i setninga. Er det nokon andre som eig tingen, bruker vi <em class="nn">hans, hennar, deira</em>.` },
      { feil: `«<em class="nn">Kari sin bok</em> er rett, for det er Kari som eig.»`, hjelp: `Sin-forma samsvarer med det ein eig: bok er hokjønn, så det heiter <em class="nn">Kari si bok</em>.` },
      { feil: `«<em class="nn">Henne</em> er bokmål.»`, hjelp: `<em class="nn">Henne</em> er rett objektsform på nynorsk. Det er <em class="bm">hennes</em> som er bokmål, og det heiter <em class="nn">hennar</em>.` },
    ],
    samtale: [
      `Kvifor trur du det er så lett å blande <em class="nn">de</em> og <em class="nn">dei</em>?`,
      `Kva er skilnaden på <em class="nn">Han tok boka si</em> og <em class="nn">Han tok boka hans</em>? Kan det bli misforståingar?`,
      `Seier du <em>de</em>, <em>dokker</em> eller noko anna på dialekten din når du snakkar til fleire?`,
    ],
    tilpassing: {
      stotte: [
        `Gi elevane pronomentabellen på ein huskelapp.`,
        `Lat elevane teikne ei pil i margen for kvar de/dei: mot lesaren (de) eller bort (dei).`,
        `Bruk berre dei korte finn-feila-setningane før dei går laus på klassetur-teksten.`,
      ],
      utfordring: [
        `Be elevane skrive ein kort dialog der ein person snakkar både til og om ei gruppe, og bruke de, dykk, dei og deira rett.`,
        `Lat elevane finne setningar der sin og hans gir ulik tyding, og forklare skilnaden.`,
      ],
    },
    vurdering: [
      `Spørsmålet på lysbilete 3 viser kor mange som har de/dei-fella før undervisninga. Spør same spørsmål på slutten av timen og samanlikn.`,
      `Klassetur-teksten i modulen viser om eleven finn småordfeila i ein lengre tekst.`,
      `Kjenneteikn på god måloppnåing: eleven bruker de, dei og dykk rett, vel sin eller hans ut frå subjektet og skriv ikkje bokmålspronomen.`,
    ],
    vidare: `Gå vidare til Setningsbygnad og stil. Elevar som treng meir øving, kan bruke drillane med pronomen, possessiv og då/når i mengdetreninga med småord i Del 2.`,
  },
});

/* ------------------------------------------------------------------ */
Larar.register("feil-setning", {
  tittelnotat: `Ein tekst kan ha rett kvart einaste ord og likevel lukte bokmål. Då sit feilen i setningsbygnaden. Denne timen handlar om å skrive nynorsk som flyt, ikkje bokmål med nynorske endingar.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>bruke <strong>s-passiv</strong> berre der han høyrer heime</li>
        <li>kurere <strong>substantivsjuke</strong></li>
        <li>skrive om <strong>s-genitiv</strong></li>
        <li>gjere tunge setningar <strong>lette</strong></li>
      </ul>`,
      notes: `Gå raskt gjennom måla. Fortel at dette er skilnaden mellom rett nynorsk og god nynorsk. Nokre av punkta er reine feil (s-passiv, s-genitiv), andre er stil.`,
    },
    {
      type: "diskuter",
      title: "Kva er skilnaden?",
      prompt: `<p class="stor"><em class="nn">Det vart teke ei avgjerd om å avlyse turen.</em></p>
        <p class="stor"><em class="nn">Dei avgjorde å avlyse turen.</em></p>
        <p>Begge er rett nynorsk. Kva for ei er best, og kvifor?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: `Den andre er best. I den første er handlinga gøymd i substantivet <em class="nn">avgjerd</em>, og vi veit ikkje kven som gjorde det. I den andre gjer verbet jobben, og subjektet er tydeleg.`,
      notes: `Lat elevane kjenne på skilnaden før du gir han eit namn. Dei fleste ser at den andre er kortare og klarare. Kom tilbake til dette når de snakkar om substantivsjuke.`,
    },
    {
      title: "S-passiv: berre etter modalverb",
      body: `<div class="to-kol">
          <div class="boks"><h3>Feil</h3><p><em class="bm">Bilen vaskes kvar laurdag.</em></p></div>
          <div class="boks"><h3>Rett</h3><p><em class="nn">Bilen blir vaska kvar laurdag.</em></p><p><em class="nn">Vi vaskar bilen kvar laurdag.</em></p></div>
        </div>`,
      steps: [`<p class="stor midt">Etter <em class="nn">kan, skal, må, bør, vil</em> er s-passiv greitt: <em class="nn">Bilen må vaskast.</em></p>`],
      notes: `Utan modalverb har elevane to val: <em>blir/vert</em> + partisipp, eller skriv om til aktiv. Aktiv er ofte best, fordi lesaren får vite kven som gjer noko. Hugs samsvar i fleirtal: <em>Billettar blir selde</em>.`,
    },
    {
      title: "Ikkje passiv",
      body: `<p class="kjempe midt"><em class="nn">finst · synest · trivst · minnest · kjennest</em></p>`,
      steps: [`<p class="stor midt">Eigne verb på <strong>-st</strong>. Dei er alltid rette.</p>`],
      notes: `Dette hindrar overretting. <em>Det finst mange løysingar</em> og <em>Ho synest det er gøy</em> er ikkje passiv, og skal ikkje skrivast om. Ein test: kan du setje <em>blir</em> + partisipp i staden? <em>Det blir funne mange løysingar</em> tyder noko anna.`,
    },
    {
      type: "sporsmal",
      question: "Kva for ei setning må skrivast om?",
      options: [`<em class="nn">Bilen må vaskast.</em>`, `<em class="nn">Det finst mange løysingar.</em>`, `<em class="bm">Døra opnast klokka åtte.</em>`, `<em class="nn">Ho synest det er gøy.</em>`],
      correct: 2,
      explain: `<em class="bm">Opnast</em> står utan modalverb, så det skal vere <em class="nn">Døra blir opna klokka åtte</em>. <em class="nn">Må vaskast</em> har modalverb, og <em class="nn">finst</em> og <em class="nn">synest</em> er eigne verb.`,
      notes: `Lat elevane grunngi kvifor dei andre tre er rette. Det er like viktig som å finne feilen.`,
    },
    {
      type: "diskuter",
      title: "Greitt eller skriv om?",
      prompt: `<ul>
          <li><em>Billettane kan kjøpast i døra.</em></li>
          <li><em>Maten lagast på kjøkkenet.</em></li>
          <li><em>Leksene bør gjerast før middag.</em></li>
          <li><em>Brevet sendast i morgon.</em></li>
          <li><em>Det seiast at han er rik.</em></li>
        </ul>`,
      form: "Tommel opp eller ned",
      tid: 2,
      svar: `Greitt: <em class="nn">kan kjøpast, bør gjerast</em>. Skriv om: <em class="nn">Maten blir laga</em>, <em class="nn">Brevet blir sendt</em>, <em class="nn">Det blir sagt at han er rik</em> (eller <em class="nn">Folk seier at han er rik</em>).`,
      notes: `Les setningane éi og éi og lat klassen vise tommel opp for greitt og ned for skriv om. Be ein elev om å skrive om kvar av dei som er feil, munnleg.`,
    },
    {
      title: "Substantivsjuke",
      body: `<p class="stor midt"><em class="bm">Ho gjorde ei vurdering av søknaden.</em></p>`,
      steps: [
        `<p class="stor midt">→ <em class="nn">Ho vurderte søknaden.</em></p>`,
        `<p class="midt">Handlinga er gøymd i eit substantiv. Finn verbet, og la det gjere jobben.</p>`,
      ],
      notes: `Substantivsjuke er ikkje feil rettskriving, men dårleg stil, og han er vanleg i nynorsk som er omsett frå bokmål. Kom tilbake til setninga om avgjerda frå starten av timen.`,
    },
    {
      title: "Leit etter …",
      body: `<div class="to-kol">
          <div class="boks"><h3>Substantiv på</h3><p class="stor"><em>-ing, -nad, -sjon</em></p></div>
          <div class="boks"><h3>saman med</h3><p class="stor"><em class="bm">skjer, finn stad, blir gjort, av</em></p></div>
        </div>`,
      steps: [`<p class="stor midt">Der ligg det ofte eit verb og ventar.</p>`],
      notes: `Døme frå leksjonen: <em class="bm">Gjennomføring av testen skjer i morgon</em> blir <em>Vi gjennomfører testen i morgon</em>. Ord på -ing er ikkje feil i seg sjølv, det er kombinasjonen med eit tomt verb som gjer setninga tung.`,
    },
    {
      type: "diskuter",
      title: "Kurer substantivsjuka",
      prompt: `<p class="stor"><em class="bm">Innsamling av pengar finn stad i mai.</em></p>
        <p class="stor"><em class="bm">Gjennomføring av testen skjer i morgon.</em></p>`,
      form: "Skriv om to og to",
      tid: 3,
      svar: `<em class="nn">Vi samlar inn pengar i mai.</em> <em class="nn">Vi gjennomfører testen i morgon.</em> (eller <em class="nn">Testen blir gjennomført i morgon.</em>)`,
      notes: `Be elevane skrive på minitavle eller ark. Spør etterpå: kven gjer noko i setninga no? Mange ulike løysingar kan vere rette, så lenge verbet gjer jobben.`,
    },
    {
      title: "S-genitiv",
      body: `<p class="stor midt"><em class="bm">skulens rektor</em> → <em class="nn">rektoren på skulen</em> / <em class="nn">skulen sin rektor</em></p>`,
      steps: [
        `<p class="stor">Faste uttrykk er greie: <em class="nn">til fjells, til sjøs, til bords</em></p>`,
        `<p class="stor">Men ikkje overdriv: <em class="bm">bilen sin motor sin lyd</em> → <em class="nn">lyden frå motoren i bilen</em></p>`,
      ],
      notes: `Omskriving med <em>til, på, i</em> er ofte finast. Sin-forma er grei, men blir tung når ho står fleire gonger etter kvarandre. Hugs samsvar: <em>kommunen sitt budsjett</em>, <em>skulen sin rektor</em>.`,
    },
    {
      title: "Tunge setningar",
      steps: [
        `<p class="stor"><em class="bm">Det er mange som meiner at prøva var vanskeleg.</em><br>→ <em class="nn">Mange meiner at prøva var vanskeleg.</em></p>`,
        `<p class="stor"><em class="bm">Det var i går som han kom.</em><br>→ <em class="nn">Han kom i går.</em></p>`,
      ],
      notes: `«Det er … som» kan brukast når du verkeleg vil framheve noko, men som regel er den korte setninga betre. Vis at setninga blir kortare og tydelegare utan at noko av innhaldet forsvinn.`,
    },
    {
      title: "Ordstilling",
      steps: [
        `<p class="stor"><em class="bm">Ho sa at ho kom ikkje.</em> → <em class="nn">Ho sa at ho <strong>ikkje kom</strong>.</em></p>`,
        `<p class="stor"><em class="bm">I går eg såg ein film.</em> → <em class="nn">I går <strong>såg eg</strong> ein film.</em></p>`,
      ],
      notes: `Den første: i leddsetningar står <em>ikkje</em> framfor verbet. Den andre: verbet står alltid på andreplass i heilsetningar. Den siste feilen er vanleg hos elevar med engelsk eller eit anna morsmål i øyret. Viss de har hatt Grunnomgrep i Del 2, kan du vise til V2-figuren.`,
    },
    {
      title: "Tre småting",
      steps: [
        `<p class="stor"><em class="nn">har blitt</em> og <em class="nn">er blitt</em>: begge er rette.</p>`,
        `<p class="stor">Dobbel bestemming: <em class="nn">den nye bilen</em>, ikkje <em class="bm">den nye bil</em>.</p>`,
        `<p class="stor">Ingen artikkel framfor yrke: <em class="nn">Ho er lærar.</em></p>`,
      ],
      notes: `Med adjektiv kjem artikkelen tilbake: <em>Ho er ein flink lærar</em>. <em>Har vorte</em> er òg rett. Det første punktet er med for å hindre overretting.`,
    },
    {
      type: "sporsmal",
      question: "Bokmål: <em class=\"bm\">Karis søster er en sykepleier.</em> Kva er best nynorsk?",
      options: [
        `<em class="nn">Kari sin syster er ein sjukepleiar.</em>`,
        `<em class="nn">Kari si syster er sjukepleiar.</em>`,
        `<em class="nn">Karis syster er sjukepleiar.</em>`,
        `<em class="nn">Kari si syster er ein sjukepleiar.</em>`,
      ],
      correct: 1,
      explain: `Syster er hokjønn, så det heiter <em class="nn">Kari si syster</em> (eller <em class="nn">syster til Kari</em>). Framfor yrke står det ingen artikkel: <em class="nn">er sjukepleiar</em>.`,
      notes: `Tre av alternativa har éin eller to feil. Lat elevane finne feilen i kvart av dei: samsvar, s-genitiv og artikkel.`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor"><em class="bm">Skulens nye gymsal opnast i morgon, og alle elevane er inviterte. Den gamle sal skal rivast til hausten.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>. Éin s-passiv er rett!</p>`],
      svar: `<em class="nn"><strong>Skulen sin</strong> nye gymsal <strong>blir opna</strong> i morgon … <strong>Den gamle salen</strong> skal rivast til hausten.</em>`,
      notes: `<em>Skal rivast</em> er rett, for det står eit modalverb framfor. Spør klassen kven som rørte den. Det er ei god påminning om at vi ikkje skal rette det som er rett.`,
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Set om til god nynorsk.</li>
          <li>Sorter: grei s-form eller skriv om?</li>
          <li>Finn feila i idrettsdag-teksten.</li>
          <li>Skriv om det tunge avsnittet til slutt.</li>
        </ul>`,
      tid: 12,
      notes: `Omskrivingsoppgåva til slutt har mange rette løysingar. Gå rundt og spør: kven gjer noko i setninga di? Dei som blir tidleg ferdige, kan sjå på ein eigen tekst og leite etter s-passiv.`,
    },
    {
      title: "Tre raske kontrollar",
      steps: [
        `<p class="stor">1. Verb på <em class="bm">-es</em> eller <em class="bm">-ast</em>? Står det eit modalverb framfor?</p>`,
        `<p class="stor">2. <em class="bm">skjer, finn stad, -ing av</em>? Finn verbet som gøymer seg.</p>`,
        `<p class="stor">3. <em class="bm">-s</em> på eit substantiv? Skriv om med <em class="nn">til</em> eller <em class="nn">sin</em>.</p>`,
      ],
      notes: `Be elevane skrive ned den kontrollen dei trur dei treng mest. Neste modul er rettelesing, der alle feiltypane kjem saman i heile tekstar.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen handlar om setningsbygnad og stil: s-passiv utan modalverb, substantivsjuke, s-genitiv, tunge «det er … som»-setningar, ordstilling i leddsetningar og heilsetningar, dobbel bestemming og artikkel framfor yrke. Nokre av punkta er reine feil, andre er stil. Målet er at elevane skal skrive nynorsk som flyt, ikkje bokmål med nynorske endingar.</p>`,
    mal: [
      `Elevane kan skrive om s-passiv utan modalverb med <em class="nn">blir/vert</em> eller til aktiv.`,
      `Elevane kan kjenne att substantivsjuke og skrive om slik at verbet gjer jobben.`,
      `Elevane kan skrive om s-genitiv med preposisjon eller sin-form.`,
      `Elevane kan bruke dobbel bestemming og rett ordstilling.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør kjenne omgrepa verb, subjekt og modalverb, og ha vore gjennom Feil i bøying og Småord og funksjonsord. Grunnomgrep i Del 2 er ein fordel for ordstillinga.`,
    forebuing: [
      `Ha minitavler eller kladdeark klare til omskrivingane på lysbilete 10.`,
      `Finn gjerne eit døme på substantivsjuke frå ein ekte tekst, til dømes eit skriv frå skulen eller kommunen.`,
      `Sjå til at elevane har tilgang til kurset på eigen maskin.`,
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: `<p>Gå gjennom måla og lat elevane samanlikne dei to setningane om avgjerda.</p>`, lysbilete: "2 og 3" },
      { fase: "S-passiv", min: 9, gjer: `<p>Innfør regelen, vis verba på -st som ikkje er passiv, ta spørsmålet og tommel-runden.</p>`, lysbilete: "4 til 7" },
      { fase: "Substantivsjuke", min: 6, gjer: `<p>Vis dømet og kva elevane skal leite etter, og lat dei skrive om to setningar.</p>`, lysbilete: "8 til 10" },
      { fase: "S-genitiv og andre feller", min: 8, gjer: `<p>Gå gjennom s-genitiv, tunge setningar, ordstilling og dei tre småtinga. Ta spørsmålet om Kari si syster.</p>`, lysbilete: "11 til 15" },
      { fase: "Feilfinning", min: 3, gjer: `<p>Elevane finn dei tre feila i gymsal-setninga.</p>`, lysbilete: "16" },
      { fase: "Eigenarbeid", min: 12, gjer: `<p>Elevane arbeider i modulen.</p>`, lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: `<p>Gå gjennom dei tre kontrollane.</p>`, lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: `«S-passiv er alltid feil på nynorsk.»`, hjelp: `Etter modalverb er han heilt rett: <em class="nn">Bilen må vaskast</em>. Lat eleven sjå etter <em class="nn">kan, skal, må, bør, vil</em> framfor verbet.` },
      { feil: `«<em class="nn">Finst</em> og <em class="nn">synest</em> er s-passiv og må skrivast om.»`, hjelp: `Dei er eigne verb på -st og alltid rette. Prøv <em>blir</em> + partisipp: tydinga endrar seg, så det er ikkje passiv.` },
      { feil: `«Substantivsjuke er ein rettskrivingsfeil.»`, hjelp: `Setningane kan vere heilt korrekte. Det handlar om stil: teksten blir tyngre og mindre klar. Spør: kven gjer noko i setninga?` },
      { feil: `«<em class="nn">Har blitt</em> er bokmål, det må vere <em class="nn">er blitt</em>.»`, hjelp: `Begge er rette på nynorsk, og <em class="nn">har vorte</em> og <em class="nn">er vorten</em> òg.` },
    ],
    samtale: [
      `Kvifor trur du substantivsjuke er så vanleg i offentlege tekstar?`,
      `Kva skjer med ein tekst når handlinga blir gøymd i substantiv? Kven tapar på det?`,
      `Når kan det vere lurt å bruke passiv, sjølv om aktiv er klarare?`,
    ],
    tilpassing: {
      stotte: [
        `Gi elevane ei liste med modalverba: <em class="nn">kan, skal, må, bør, vil</em>. Står eitt av dei framfor, er s-passiv greitt.`,
        `Lat elevane starte med s-passiv og s-genitiv, som er reine feil, før dei går laus på substantivsjuke, som er stil.`,
        `Gi ferdige subjekt å velje mellom når dei skriv om til aktiv: <em class="nn">vi, dei, elevrådet</em>.`,
      ],
      utfordring: [
        `Be elevane finne eit døme på substantivsjuke i ein ekte tekst, til dømes eit skriv frå kommunen, og skrive det om.`,
        `Lat elevane skrive eit avsnitt med vilje tungt, byte med ein medelev og skrive kvarandre sine avsnitt om.`,
      ],
    },
    vurdering: [
      `Tommel-runden på lysbilete 7 viser om elevane skil mellom s-passiv etter modalverb og utan.`,
      `Omskrivingsoppgåva til slutt i modulen viser om eleven kan gjere ein tung tekst lettare utan å endre innhaldet.`,
      `Kjenneteikn på god måloppnåing: eleven rettar s-passiv og s-genitiv, skriv om substantivsjuke til aktive setningar og overrettar ikkje s-passiv etter modalverb.`,
    ],
    vidare: `Gå vidare til Rettelesing: finn og rett feila, der alle feiltypane frå Typiske feil kjem saman i heile tekstar.`,
  },
});

/* ------------------------------------------------------------------ */
Larar.register("feil-rettelesing", {
  tittelnotat: `Dette er avslutninga på Typiske feil. No kjem alle feiltypane saman i heile tekstar, slik dei gjer i elevane sine eigne innleveringar. Poenget er at korrekturlesing er ein eigen dugleik som kan trenast, og at det finst ein metode for det.`,
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lære ein <strong>metode</strong> for korrekturlesing</li>
        <li>bruke ei <strong>sjekkliste</strong> med dei vanlegaste feila</li>
        <li>finne feil i <strong>heile tekstar</strong></li>
        <li>rette <strong>vår eigen</strong> tekst</li>
      </ul>`,
      notes: `Fortel at dette er den same jobben som elevane må gjere på slutten av kvar skriveprøve. Det dei øver på i dag, kan dei bruke med ein gong.`,
    },
    {
      type: "diskuter",
      title: "Kvifor ser vi ikkje feila våre?",
      prompt: `<p class="stor">Kvifor er det lettare å finne feil i andre sine tekstar enn i din eigen?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: `Lat eit par par dele. Poenget du vil fram til: når vi les eigen tekst, veit vi kva som skal stå der, og hjernen fyller inn. Vi les det vi meinte, ikkje det som står. Metoden i dag er laga for å lure hjernen.`,
    },
    {
      title: "Les tre gonger",
      steps: [
        `<p class="stor"><strong>1. Innhald.</strong> Heng teksten saman? Manglar det ord?</p>`,
        `<p class="stor"><strong>2. Endingar.</strong> Sjå berre på slutten av orda.</p>`,
        `<p class="stor"><strong>3. Småord.</strong> Stopp ved kvart lite ord.</p>`,
      ],
      notes: `Kvar gjennomlesing har berre eitt fokus. Innhaldet først, fordi det ikkje er noko vits i å finpusse ei setning du seinare stryk. Endingane er der dei fleste feila ligg: verb i fortid, substantiv i bestemt form, adjektiv i inkjekjønn. Småorda er dei hjernen hoppar over når du les fort: <em>ikkje, berre, kva, dei, de, noko, nokon, då, når</em>.`,
    },
    {
      title: "Lur hjernen",
      body: `<div class="to-kol">
          <div class="boks"><h3>Les høgt</h3><p>Du høyrer det du ikkje ser.</p></div>
          <div class="boks"><h3>Les baklengs</h3><p>Siste setning først.</p></div>
        </div>`,
      notes: `Når du les baklengs, mistar du samanhengen, og då sluttar hjernen å gjette. Du ser det som faktisk står. Å lese høgt kan gjerast lågt, med leppene, i ein prøvesituasjon.`,
    },
    {
      title: "Sjekkliste: endingar",
      body: `<table>
          <thead><tr><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kastet, snakket</em></td><td class="steg"><em class="nn">kasta, snakka</em></td></tr>
            <tr><td><em class="bm">kommer, finner</em></td><td class="steg"><em class="nn">kjem, finn</em></td></tr>
            <tr><td><em class="bm">boken, døren</em></td><td class="steg"><em class="nn">boka, døra</em></td></tr>
            <tr><td><em class="bm">husene, barnene</em></td><td class="steg"><em class="nn">husa, barna</em></td></tr>
          </tbody>
        </table>`,
      notes: `Dette er repetisjon frå Feil i bøying. Den rette forma kjem fram rad for rad. Spør klassen om rett form og regelen bak før du trykkjer: a-verb, sterke verb, hokjønn, inkjekjønn i fleirtal.`,
    },
    {
      title: "Sjekkliste: småord",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">de / dei</em></td><td>til eller om?</td></tr>
            <tr><td><em class="nn">noko / nokon</em></td><td>ting eller person? kan du telje det?</td></tr>
            <tr><td><em class="nn">då / når</em></td><td>éin gong i fortida eller kvar gong?</td></tr>
            <tr><td><em class="nn">kvar / kor</em></td><td>stad eller grad?</td></tr>
            <tr><td><em class="nn">hennar, deira</em></td><td>ikkje <em class="bm">hennes, deres</em></td></tr>
          </tbody>
        </table>`,
      notes: `Kvar rad har eit kontrollspørsmål. Det er spørsmålet elevane skal stille seg når dei stoppar ved ordet i tredje gjennomlesing.`,
    },
    {
      title: "Sjekkliste: setningar og ord",
      body: `<table>
          <thead><tr><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Maten lagast på kjøkkenet.</em></td><td><em class="nn">Maten blir laga …</em></td></tr>
            <tr><td><em class="bm">skulens rektor</em></td><td><em class="nn">rektoren på skulen</em></td></tr>
            <tr><td><em class="bm">fot ball</em></td><td><em class="nn">fotball</em></td></tr>
            <tr><td><em class="bm">ikke, bare, hva, jeg, hun</em></td><td><em class="nn">ikkje, berre, kva, eg, ho</em></td></tr>
          </tbody>
        </table>`,
      notes: `S-passiv er berre lov etter modalverb. S-genitiv skriv vi om med preposisjon eller sin-form. Heile sjekklista står i leksjonen i modulen, så elevane kan ha henne open når dei arbeider.`,
    },
    {
      title: "Vi les korrektur saman",
      body: `<p><em>Kjære dagbok! I dag var den verste dagen på lenge. Eg vakna for seint, hoppet over frukosten og sprang til bussen, men han køyrde rett forbi meg. Då eg endeleg kom fram til skulen, hadde klassa alt byrja på prøven i matte. Læraren såg strengt på meg, men sa ikke noko. Etterpå snakket eg med Sara i friminuttet, og ho lo så ho grein. No ligg eg i sengen og håpar at morgondagen blir betre.</em></p>`,
      steps: [`<p class="midt">Det er <strong>5 feil</strong>.</p>`],
      svar: `<em class="bm">hoppet</em> → <em class="nn">hoppa</em>, <em class="bm">prøven</em> → <em class="nn">prøva</em>, <em class="bm">ikke</em> → <em class="nn">ikkje</em>, <em class="bm">snakket</em> → <em class="nn">snakka</em>, <em class="bm">sengen</em> → <em class="nn">senga</em>`,
      notes: `Dette er tekst 1 i modulen. Gjer metoden høgt: les éin gong for endingar (hoppet, prøven, snakket, sengen), så éin gong for småord (ikke). Legg merke til at teksten er skriven utan markering av feila, slik elevane møter dei i eigen tekst. <em>Klassa</em> og <em>han køyrde</em> (om bussen) er rette.`,
    },
    {
      type: "sporsmal",
      question: "Emma skriv til Jonas og broren hans: «Filmen startar halv åtte, så ___ må vere ved kinoen seinast klokka sju.»",
      options: ["dei", "de", "dykk", "dere"],
      correct: 1,
      explain: `Emma snakkar <strong>til</strong> Jonas og broren, og ordet er subjekt. Då heiter det <em class="nn">de</em>. <em class="nn">Dykk</em> er objektsform, og <em class="bm">dere</em> er bokmål.`,
      notes: `Frå tekst 2. I teksten står <em>dei</em>, som mange elevar ikkje reagerer på. Kontrollspørsmålet er: til eller om?`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor"><em class="bm">Ho fortel at elevrådet samlet inn over to hundre underskrifter når dei starta aksjonen i haust.</em></p>
        <p class="stor"><em class="bm">«Eg veit ikkje kvar mange som har klaga på dette», seier han.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>.</p>`],
      svar: `<em class="bm">samlet</em> → <em class="nn">samla</em>, <em class="bm">når</em> → <em class="nn">då</em> (éin gong i fortida), <em class="bm">kvar mange</em> → <em class="nn">kor mange</em>`,
      notes: `Frå tekst 3, nyheitssaka. Då/når og kvar/kor er vanskelege fordi begge orda finst på nynorsk. Eleven må forstå setninga for å finne feilen. I same tekst står <em>Kvar dei ekstra minutta skal hentast frå</em>, og det er rett, for det handlar om stad.`,
    },
    {
      title: "Finn feila",
      body: `<p class="stor"><em class="bm">Maten lagast ikkje på skulen. Rektor seier at kommunens budsjett ikkje rekk til, men i fjor ble det brukt hundre tusen kroner på nye skilt.</em></p>`,
      steps: [`<p class="midt">Det er <strong>3 feil</strong>. Rettinga kan vere fleire ord.</p>`],
      svar: `<em class="nn">Maten <strong>blir</strong> ikkje <strong>laga</strong> på skulen.</em> <em class="bm">kommunens</em> → <em class="nn">kommunen sitt</em>, <em class="bm">ble</em> → <em class="nn">blei</em> eller <em class="nn">vart</em>`,
      notes: `Frå tekst 4, lesarinnlegget. Her er feila vanskelegare å sjå fordi orda liknar nynorsk: <em>lagast</em> har nynorsk ending, men står utan modalverb. Spør: kva hjelpeverb står framfor?`,
    },
    {
      title: "To feller i tekst 5",
      steps: [
        `<p class="stor"><em class="bm">Nora fann fram lomme lykta.</em> → <em class="nn">lommelykta</em></p>`,
        `<p class="stor">Stemma snakkar til Nora og Sam:<br><em class="bm">«Eg lurte på når dei kom til å dukke opp.»</em> → <em class="nn">de</em></p>`,
      ],
      notes: `Tekst 5 er den vanskelegaste. Særskrivinga rettar eleven ved å klikke på det første ordet og skrive heile ordet. <em>Dei</em> står fleire gonger i teksten, men berre éin gong er det feil. Det er ei god øving i å lese kvar setning for seg og spørje: til eller om?`,
    },
    {
      type: "diskuter",
      title: "Kva feil gjer du?",
      prompt: `<p class="stor">Tenk på den siste nynorskteksten din. Kva for éin feiltype trur du du gjer oftast?</p>`,
      form: "Tenk sjølv, så del med sidemannen",
      tid: 2,
      notes: `Dette førebur den siste oppgåva i modulen, der elevane rettar eigen tekst og skriv ei oppsummering. Ta gjerne ei rask handsopprekking: kor mange trur det er endingar? Småord? Bokmålsord?`,
    },
    {
      type: "oppgave",
      title: "Fem tekstar",
      body: `<ul>
          <li>Tekst 1 til 5 blir lengre og vanskelegare.</li>
          <li>Klikk på feilen, skriv rett form.</li>
          <li>Les tre gonger før du trykkjer «Sjekk svar».</li>
        </ul>`,
      tid: 10,
      notes: `Minn elevane om at alle ord som ikkje er feil, er korrekt nynorsk. Dei treng altså ikkje tvile på kvart ord. Oppmuntre dei til å bruke metoden, ikkje berre lese éin gong og klikke. Ikkje alle rekk alle fem tekstane, og det er greitt.`,
    },
    {
      type: "oppgave",
      title: "Rett din eigen tekst",
      body: `<ul>
          <li>Hent fram ein nynorsktekst du har skrive før.</li>
          <li>Les han tre gonger med sjekklista.</li>
          <li>Skriv kva feil du fann, og kva du må passe på.</li>
        </ul>`,
      tid: 10,
      notes: `Har elevane ingen eigen tekst, skriv dei ein ny på minst 100 ord om ein dag dei hugsar godt. Oppsummeringa deira er gull for deg: ho viser kva feiltypar kvar elev slit med. Samle henne inn eller be elevane lagre henne.`,
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor">Les <strong>tre gonger</strong>: innhald, endingar, småord.</p>`,
        `<p class="stor">Les <strong>høgt</strong> eller <strong>baklengs</strong>.</p>`,
        `<p class="stor">Bruk <strong>sjekklista</strong>.</p>`,
        `<p class="stor">Kjenn <strong>dine eigne</strong> typiske feil.</p>`,
      ],
      notes: `Be elevane skrive ned den feiltypen dei fann oftast i eigen tekst, og bruke det som eit personleg fokuspunkt i neste skriveoppgåve på nynorsk.`,
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: `<p>Modulen avsluttar Typiske feil. Elevane lærer ein metode for korrekturlesing: les teksten tre gonger, éin gong for innhald, éin for endingar og éin for småord, og bruk ei sjekkliste med dei vanlegaste feila. Så trenar dei på fem heile tekstar med skjulte feil og stigande vanskegrad, frå dagboknotat til forteljing, og avsluttar med å rette sin eigen tekst.</p>`,
    mal: [
      `Elevane kan bruke ein fast metode for korrekturlesing med tre gjennomlesingar.`,
      `Elevane kan finne og rette bøyingsfeil, bokmålsord, småordfeil og feil i setningsbygnad i ein samanhengande tekst.`,
      `Elevane kan rette sin eigen tekst og peike på kva feiltypar dei sjølve bør passe ekstra på.`,
    ],
    lareplan: [11, 12],
    forkunnskapar: `Elevane bør ha vore gjennom dei andre modulane i Typiske feil: skrivereglar, bøying, bokmålsord, småord og setningsbygnad. Modulen repeterer alle feiltypane.`,
    forebuing: [
      `Be elevane på førehand ta med eller finne fram ein nynorsktekst dei har skrive, til den siste oppgåva.`,
      `Les gjennom dei fem tekstane i modulen og fasiten i rettleiinga, så du kjenner feila.`,
      `Skriv gjerne ut sjekklista frå leksjonen til elevar som vil ha henne på papir.`,
    ],
    okt: [
      { fase: "Oppstart", min: 3, gjer: `<p>Gå gjennom måla og lat elevane diskutere kvifor det er vanskeleg å sjå eigne feil.</p>`, lysbilete: "2 og 3" },
      { fase: "Metoden", min: 6, gjer: `<p>Gå gjennom dei tre gjennomlesingane, tipsa om å lese høgt og baklengs, og dei tre delane av sjekklista.</p>`, lysbilete: "4 til 8" },
      { fase: "Korrektur saman", min: 10, gjer: `<p>Les dagboknotatet saman med metoden, ta spørsmålet om de/dei og finn feila i utdraga frå tekst 3, 4 og 5.</p>`, lysbilete: "9 til 13" },
      { fase: "Refleksjon", min: 3, gjer: `<p>Elevane tenkjer over kva feiltype dei sjølve gjer oftast.</p>`, lysbilete: "14" },
      { fase: "Eigenarbeid: tekstane", min: 10, gjer: `<p>Elevane arbeider med tekst 1 til 5 i modulen.</p>`, lysbilete: "15" },
      { fase: "Eigenarbeid: eigen tekst", min: 10, gjer: `<p>Elevane rettar sin eigen tekst med metoden og skriv oppsummeringa.</p>`, lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: `<p>Oppsummer metoden og lat elevane velje eit personleg fokuspunkt.</p>`, lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: `«Eg har lese gjennom teksten éin gong, så han er ferdig.»`, hjelp: `Éi gjennomlesing fangar lite, fordi hjernen fyller inn det du meinte. Lat eleven lese éin gong berre for endingar og ein gong berre for småord, og sjå kor mange fleire feil han finn.` },
      { feil: `«Når eit ord står rett éin stad, står det rett overalt.»`, hjelp: `I tekst 5 står <em class="nn">dei</em> fleire gonger, og berre éin gong er det feil. Kvar setning må lesast for seg.` },
      { feil: `«<em class="nn">Når</em> og <em class="nn">kvar</em> er nynorsk, så dei er alltid rette.»`, hjelp: `Begge orda finst, men har ulik tyding. Eleven må forstå setninga: éin gong i fortida gir <em class="nn">då</em>, grad og mengd gir <em class="nn">kor</em>.` },
    ],
    samtale: [
      `Kvifor trur du det hjelper å lese teksten baklengs?`,
      `Kva feiltypar var lettast å finne, og kva var vanskelegast? Kvifor?`,
      `Korleis kan du bruke metoden på ei skriveprøve der du har dårleg tid?`,
    ],
    tilpassing: {
      stotte: [
        `Lat elevane berre gjere tekst 1 og 2, og bruke tida på å lese dei med metoden.`,
        `Gi elevane sjekklista på papir, og lat dei krysse av for kvar feiltype dei har leita etter.`,
        `Lat elevane arbeide to og to på dei lengste tekstane, der den eine les høgt.`,
      ],
      utfordring: [
        `Be elevane skrive ein eigen tekst med ti gøymde feil av ulike typar og la ein medelev rette han.`,
        `Lat elevane rette ein tekst dei ikkje har skrive sjølve, til dømes ein tekst frå ein medelev, og grunngi kvar retting med ein regel.`,
      ],
    },
    vurdering: [
      `Tekst 1 til 5 i modulen viser kor langt eleven kjem med stigande vanskegrad, og kva feiltypar han overser.`,
      `Oppsummeringa i den siste oppgåva viser om eleven kjenner sine eigne typiske feil.`,
      `Kjenneteikn på god måloppnåing: eleven finn dei fleste feila i tekst 4 og 5, grunngir rettingane og brukar metoden på eigen tekst.`,
    ],
    vidare: `Bruk metoden og sjekklista i alle nynorsktekstar elevane skriv framover, til dømes i skrivemodulane i Del 4. Oppsummeringane frå den siste oppgåva gir deg eit godt grunnlag for individuelle mål i sidemålsundervisninga.`,
  },
});
