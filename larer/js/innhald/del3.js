/* Lærarinnhald for Del 3 · Ordbok. Formatet står i larer/README.md. */

/* Figur som går att: artikkelen for «bok» frå modulen Les ein ordbokartikkel. */
const ORDARTIKKEL_BOK = `<div class="ordartikkel">
    <div class="hovud"><span class="merk" data-n="1"><strong>bok</strong></span> <span class="merk" data-n="2">f1</span> &nbsp; <em>bøying:</em> <span class="merk" data-n="3">boka, bøker, bøkene</span></div>
    <div class="tyding"><span class="merk" data-n="4">1</span> samling av blad med tekst, bundne saman mellom to permar</div>
    <div class="dome"><span class="merk" data-n="5"><em>lese ei bok, ei bok om fuglar</em></span></div>
    <div class="tyding"><span class="merk" data-n="4">2</span> rekneskap, protokoll</div>
    <div class="dome"><span class="merk" data-n="5"><em>føre bok over utgiftene</em></span></div>
  </div>`;

Larar.register("ordbok-verktoya", {
  tittelnotat: "Mange elevar slår opp i den første ordboka Google gir dei, eller gjettar. I dag lærer dei at det finst tre ordbøker med kvar sin styrke, og at valet avheng av kva dei lurer på. Ha ordbokene.no og lexin.oslomet.no opne i kvar si fane før timen, og ha ei papirordbok klar på kateteret.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>bli kjende med <strong>tre ordbøker</strong></li>
        <li>finne ut kva kvar av dei er <strong>best</strong> til</li>
        <li>øve på å <strong>velje rett ordbok</strong> til rett spørsmål</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Sei at timen er praktisk: du kjem til å slå opp live på tavla, og elevane skal etterpå prøve sjølve og skrive i skriveboka.",
    },
    {
      type: "diskuter",
      title: "Når slo du opp sist?",
      prompt: `<p class="stor">Når brukte du ei ordbok sist?</p>
        <p>Kva slo du opp, og kvar leita du?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Lytt etter kva elevane faktisk bruker: Google, omsetjingsteneste, app, ingenting. Skriv stikkord på tavla. Du kan kome tilbake til lista til slutt og spørje kva av desse som svarer på om ei form er lov på nynorsk.",
    },
    {
      title: "Fire spørsmål ordboka svarar på",
      steps: [
        `<p class="stor">1. <strong>Finst</strong> ordet?</p>`,
        `<p class="stor">2. Kva <strong>tyder</strong> det?</p>`,
        `<p class="stor">3. Kva <strong>ordklasse og kjønn</strong> har det?</p>`,
        `<p class="stor">4. Korleis blir det <strong>bøygd</strong>?</p>`,
      ],
      notes: "Alle tre ordbøkene svarar på desse fire spørsmåla, men dei er laga for ulike lesarar. Spør klassen kva av spørsmåla dei treng mest når dei skriv nynorsk. Svaret er som regel 3 og 4: kjønn og bøying.",
    },
    {
      kicker: "Ordbok 1",
      title: "Lexin",
      body: `<p class="midt stor"><strong>lexin.oslomet.no</strong></p>`,
      steps: [
        `<p class="stor">Korte, <strong>enkle forklaringar</strong> og døme</p>`,
        `<p class="stor">Bokmål, nynorsk og <strong>atten andre språk</strong></p>`,
        `<p class="stor">Les ordet <strong>høgt</strong></p>`,
      ],
      notes: "Lexin er laga for elevar som held på å lære norsk. Kvart ord har døme på korleis det blir brukt i ei setning. Ordboka les orda høgt med talesyntese, så ein høyrer uttalen. Lexin blir laga av NAFO ved OsloMet på oppdrag frå Utdanningsdirektoratet. Gjer elevar med anna morsmål merksame på at dei kan slå opp frå morsmålet sitt.",
    },
    {
      kicker: "Demonstrasjon",
      title: "Vi slår opp i Lexin",
      steps: [
        `<p class="stor">1. Slå opp <em class="nn">høve</em></p>`,
        `<p class="stor">2. Les forklaringa og dømet</p>`,
        `<p class="stor">3. Lytt til uttalen</p>`,
        `<p class="stor">4. Sjå kva språk du kan velje</p>`,
      ],
      notes: "Byt til fana med lexin.oslomet.no og gjer dette live. Slå opp <em>høve</em>, eller eit anna ord elevane ikkje kjenner så godt. Be klassen sjå etter: kor lang er forklaringa? Står det eit døme i ei setning? Trykk på lyden så alle høyrer uttalen. Vis til slutt lista over språk og spør om nokon i klassen har eit morsmål som står der. Prøv gjerne oppslaget før timen, så du veit kva som kjem opp.",
    },
    {
      kicker: "Ordbok 2",
      title: "Ordbokene.no",
      body: `<p class="midt stor"><strong>Nynorskordboka</strong> og <strong>Bokmålsordboka</strong></p>`,
      steps: [
        `<p class="stor">Viser den <strong>offisielle rettskrivinga</strong></p>`,
        `<p class="stor">Står forma der, er ho <strong>lov</strong></p>`,
        `<p class="stor">Nynorskordboka: rundt <strong>90 000</strong> oppslagsord</p>`,
      ],
      notes: "Bokmålsordboka har rundt 65 000 oppslagsord, så her finn ein langt fleire ord enn i Lexin. Ein får bøying, uttale, ordhistorie, faste uttrykk og døme. Ordbøkene blir drivne av Språkrådet og Universitetet i Bergen, og finst òg som app på telefonen. Det viktigaste å hugse: det er denne ordboka som avgjer kva som er rett.",
    },
    {
      kicker: "Demonstrasjon",
      title: "Vi slår opp på ordbokene.no",
      steps: [
        `<p class="stor">1. Slå opp <em class="nn">bok</em> i Nynorskordboka</p>`,
        `<p class="stor">2. Finn <strong>kjønnet</strong> og <strong>bøyinga</strong></p>`,
        `<p class="stor">3. Er <em class="nn">venskap</em> lov på nynorsk?</p>`,
      ],
      notes: "Byt til fana med ordbokene.no. Slå opp <em>bok</em> og be klassen finne kjønnet og formene <em>boka, bøker, bøkene</em>. Samanlikn med Lexin: kor mykje meir står det her? Peik på bøyingstabellen og døma. Slå så opp <em>venskap</em> og spør: står ordet i Nynorskordboka? Då er det lov. Sjekk resultatet på førehand, så du veit kva du viser. Nemn at det finst ein app om nokon vil ha ordboka på telefonen.",
    },
    {
      kicker: "Ordbok 3",
      title: "Papirordboka",
      steps: [
        `<p class="stor">Treng verken straum, nett eller innlogging</p>`,
        `<p class="stor">Er alltid den same</p>`,
        `<p class="stor">Ofte det <strong>einaste hjelpemiddelet</strong> på prøver</p>`,
        `<p class="stor">Men: du må kunne <strong>alfabetet</strong> godt</p>`,
      ],
      notes: "Hald opp papirordboka. Spør kor mange som har slått opp i ei ordbok i bokform. Poenget er at ho alltid verkar, men at elevane må finne ordet sjølve. Det øver dei på i neste modul, Finn oppslagsordet.",
    },
    {
      title: "Kort sagt",
      steps: [
        `<p class="kjempe midt">Lexin <strong>forklarar</strong>.</p>`,
        `<p class="kjempe midt">Ordbokene.no <strong>avgjer</strong>.</p>`,
        `<p class="kjempe midt">Papiret <strong>verkar alltid</strong>.</p>`,
      ],
      notes: "Dette er hugseregelen for timen. Be klassen seie han høgt saman, gjerne to gonger.",
    },
    {
      title: "Kva lurer du på?",
      body: `<div class="vegvisar">
          <div class="vv-start">Kva lurer du på?</div>
          <div class="vv-greiner">
            <div class="vv-grein"><span class="vv-val">Kva tyder ordet?</span><span class="vv-pil">↓</span><span class="vv-svar a">Lexin<small>enklast forklaring</small></span></div>
            <div class="vv-grein"><span class="vv-val">Er det lov?</span><span class="vv-pil">↓</span><span class="vv-svar e">Nynorskordboka<small>offisiell rettskriving</small></span></div>
            <div class="vv-grein"><span class="vv-val">Uttale eller morsmål?</span><span class="vv-pil">↓</span><span class="vv-svar kort">Lexin<small>les høgt, 18 språk</small></span></div>
            <div class="vv-grein"><span class="vv-val">Utan nett?</span><span class="vv-pil">↓</span><span class="vv-svar sterk">Papirordboka<small>verkar alltid</small></span></div>
          </div>
        </div>`,
      steps: [`<p class="midt">Kjønn og bøying: begge nettordbøkene. Nynorskordboka viser <strong>alle</strong> tillatne former.</p>`],
      notes: "Figuren er ei samanfatning av tabellen i modulen. Gå gjennom greinene frå venstre. Det siste steget er viktig: kjønn og bøying finn ein i begge, men berre Nynorskordboka viser alle formene som er lov.",
    },
    {
      type: "sporsmal",
      question: "Er <em class=\"nn\">venskap</em> ei lovleg form på nynorsk? Kvar sjekkar du best?",
      options: [
        "I Lexin, for der er forklaringane enklast",
        "I Nynorskordboka på ordbokene.no",
        "På ei nettside med synonym",
        "Eg gjettar ut frå bokmål",
      ],
      correct: 1,
      explain: "Ordbokene.no viser den offisielle rettskrivinga. Står forma i Nynorskordboka, er ho lov. Lexin forklarar godt, men avgjer ikkje norma.",
      notes: "Lat elevane vise svaret med fingrane. Vel nokon Lexin, spør: kven lagar Lexin, og kva er ho laga for? Lexin er ei mindre ordbok for dei som lærer norsk.",
    },
    {
      type: "sporsmal",
      question: "Du vil høyre korleis ordet blir uttalt. Kva ordbok vel du?",
      options: ["Lexin", "Papirordboka", "Ingen av dei kan hjelpe"],
      correct: 0,
      explain: "Lexin les ordet høgt med talesyntese.",
      notes: "Kort spørsmål som repetisjon. Du kan leggje til: kva om du vil finne ordet på morsmålet ditt? Òg Lexin, som har atten andre språk.",
    },
    {
      type: "diskuter",
      title: "Kva ordbok?",
      prompt: `<ol>
          <li>Du veit ikkje kva <em class="nn">høve</em> tyder.</li>
          <li>Du lurer på om <em class="nn">bøkene</em> er rett fleirtal.</li>
          <li>Nettet er nede.</li>
          <li>Du vil vite kva ordet heiter på arabisk.</li>
        </ol>`,
      form: "Snakk med sidemannen",
      tid: 3,
      svar: "1 Lexin, der forklaringa er enklast. 2 Nynorskordboka, som viser alle tillatne former. 3 Papirordboka. 4 Lexin, som har atten andre språk.",
      notes: "Be para bli samde om eitt svar per situasjon og grunngi det. Ta éin situasjon per par i plenum. Godta at fleire svar kan vere rimelege på nummer 2, så lenge dei veit at Nynorskordboka er den som avgjer.",
    },
    {
      title: "På prøver og eksamen",
      body: `<div class="callout">
          <p class="stor">Skulen og Utdanningsdirektoratet bestemmer <strong>kva hjelpemiddel</strong> du får bruke.</p>
        </div>`,
      steps: [
        `<p class="stor">Spør læraren <strong>i god tid</strong>.</p>`,
        `<p class="stor">Øv på det hjelpemiddelet du <strong>faktisk</strong> får ha med.</p>`,
      ],
      notes: "Fortel kva som gjeld ved skulen dykkar og på neste prøve. Minoritetsspråklege elevar har lov å bruke Lexin på eksamen. Poenget er at det ikkje held å slå opp for første gong midt i prøva: ein må vere vand med ordboka på førehand.",
    },
    {
      type: "oppgave",
      title: "Prøv begge ordbøkene",
      body: `<ol class="stor">
          <li>Slå opp <em class="nn">vindauge</em> i Lexin. Skriv forklaringa med eigne ord.</li>
          <li>Slå opp same ord i Nynorskordboka. Kva kjønn har det?</li>
          <li>Skriv to ting som står i Nynorskordboka, men ikkje i Lexin.</li>
          <li>Er <em class="nn">kjærleik</em> lov på nynorsk? Kvar sjekka du?</li>
        </ol>`,
      utstyr: ["skrivebok", "ordbok"],
      form: "I par",
      tid: 8,
      svar: "2 Inkjekjønn: <em class=\"nn\">eit vindauge</em>. 3 Til dømes fleire bøyingsformer, ordhistorie og faste uttrykk. 4 Ja, <em class=\"nn\">kjærleik</em> står i Nynorskordboka, og då er ordet lov.",
      notes: "Para deler éin skjerm, mobil eller PC, med lexin.oslomet.no og ordbokene.no. Den eine søkjer, den andre skriv. Har ikkje elevane tilgang til ordbøkene, gjer du oppslaga på tavla og lèt klassen svare i skriveboka. Poenget med nummer 3 er at elevane ser kor mykje meir Nynorskordboka har. Prøv oppslaga på førehand.",
    },
    {
      type: "oppgave",
      title: "Planlegg prøva",
      body: `<p class="stor">Du skal ha prøve i nynorsk om to veker. Skriv 40 til 80 ord om kva du gjer <strong>før</strong> prøva.</p>
        <ol class="stor">
          <li>Kva spør du læraren om?</li>
          <li>Kva hjelpemiddel øver du på, og kvifor?</li>
          <li>Kvifor held det ikkje å slå opp første gong midt i prøva?</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      notes: "Skriveoppgåva er ein god stad å fange opp kven som veit kva hjelpemiddel dei får bruke. Les nokre svar undervegs, og ta med eitt eller to gode svar i oppsummeringa.",
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor"><strong>Lexin:</strong> enkle forklaringar, uttale, mange språk.</p>`,
        `<p class="stor"><strong>Nynorskordboka:</strong> avgjer kva som er lov.</p>`,
        `<p class="stor"><strong>Papirordboka:</strong> verkar alltid, men krev alfabetet.</p>`,
      ],
      notes: "Gå tilbake til lista frå byrjinga av timen: kva av det elevane brukte, kan fortelje om ei form er lov på nynorsk? Avslutt med å be kvar elev seie kva ordbok dei kjem til å bruke neste gong dei skriv nynorsk.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen presenterer dei tre ordbøkene elevane møter i nynorskarbeidet: Lexin, ordbokene.no og papirordboka. Målet er at elevane skal vite kva kvar ordbok er laga for og velje rett ordbok til rett spørsmål. Kjernen er skiljet mellom Lexin, som forklarar enkelt, og Nynorskordboka, som avgjer kva som er lov. Modulen er inngangen til resten av Del 3.</p>",
    mal: [
      "Elevane kan nemne dei fire spørsmåla ei ordbok svarar på.",
      "Elevane kan forklare kva Lexin, ordbokene.no og papirordboka er laga for.",
      "Elevane kan velje rett ordbok ut frå kva dei lurer på.",
      "Elevane veit korleis dei finn ut kva hjelpemiddel dei får bruke på prøver.",
    ],
    lareplan: [11],
    forkunnskapar: "Ingen særlege. Det hjelper om elevane kjenner orda kjønn og bøying frå Del 2.",
    forebuing: [
      "Opne lexin.oslomet.no og ordbokene.no i kvar si fane, og test at lyden verkar på tavla.",
      "Slå opp <em class=\"nn\">høve</em>, <em class=\"nn\">bok</em> og <em class=\"nn\">venskap</em> på førehand, så du veit kva som kjem opp.",
      "Ha med ei papirordbok å vise fram.",
      "Finn ut kva hjelpemiddel som gjeld på neste prøve, så du kan svare konkret på lysbilete 15.",
      "Sjå til at para har tilgang til lexin.oslomet.no og ordbokene.no på mobil eller PC til oppgåva på lysbilete 16. Elles gjer du oppslaga felles på tavla.",
      "Elevane treng skrivebok.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane fortelje når dei sist slo opp noko.</p>", lysbilete: "2 og 3" },
      { fase: "Tre ordbøker", min: 14, gjer: "<p>Gå gjennom dei fire spørsmåla, og presenter kvar ordbok. Gjer dei to demonstrasjonane live på tavla.</p>", lysbilete: "4 til 9" },
      { fase: "Kva vel du når?", min: 9, gjer: "<p>Hugseregelen, vegvisaren, to spørsmål og samtalen om fire situasjonar. Avslutt med kva som gjeld på prøver.</p>", lysbilete: "10 til 15" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Para slår opp same ord i Lexin og Nynorskordboka og skriv svara i skriveboka. Deretter skriv kvar elev om kva dei gjer før prøva.</p>", lysbilete: "16 og 17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og kom tilbake til lista frå oppstarten.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Lexin og Nynorskordboka er det same.»", hjelp: "Lexin er laga for dei som lærer norsk, med enkle forklaringar. Nynorskordboka er mykje større og viser den offisielle norma. Slå opp same ord i begge og samanlikn." },
      { feil: "«Står ordet i Lexin, er det rett nynorsk.»", hjelp: "Lexin avgjer ikkje norma. Er du usikker på om ei form er lov, er det Nynorskordboka som gjeld." },
      { feil: "«Eg treng ikkje øve på ordboka, eg slår berre opp på prøva.»", hjelp: "Den som slår opp for første gong midt i prøva, brukar lang tid. Øv på det hjelpemiddelet du faktisk får ha med." },
    ],
    samtale: [
      "Kvifor trur du det finst ei eiga ordbok for dei som lærer norsk?",
      "Kva er fordelen med ei ordbok som ikkje treng nett?",
      "Kva meiner vi med at Nynorskordboka avgjer kva som er rett?",
      "Når har du brukt ei omsetjingsteneste i staden for ei ordbok, og kva gjekk bra eller gale?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein lapp med hugseregelen: Lexin forklarar, ordbokene.no avgjer, papiret verkar alltid.",
        "Elevar med anna morsmål kan starte i Lexin frå morsmålet sitt.",
        "La elevane arbeide i par, der den eine søkjer og den andre les opp.",
      ],
      utfordring: [
        "Be elevane slå opp same ord i Lexin og Nynorskordboka og skrive tre skilnader dei ser.",
        "La elevane lage eigne situasjonar som dei andre skal velje ordbok til.",
      ],
    },
    vurdering: [
      "Spørsmåla og samtalen om fire situasjonar viser om klassen skil mellom Lexin og Nynorskordboka.",
      "Oppslagsoppgåva viser om eleven finn fram i begge nettordbøkene og ser kva Nynorskordboka har som Lexin manglar.",
      "Skriveoppgåva om prøva viser om eleven har ein plan for å bruke ordboka godt.",
      "Kjenneteikn på god måloppnåing: eleven vel rett ordbok og grunngir valet med kva ordboka er laga for.",
    ],
    vidare: "Gå vidare til Finn oppslagsordet, der elevane lærer å finne grunnforma og bruke alfabetet i papirordboka. Elevmodulen Tre ordbøker, tre styrkar kan brukast som frivillig lekse.",
  },
});

Larar.register("ordbok-grunnform", {
  tittelnotat: "Den vanlegaste grunnen til at elevar ikkje finn eit ord i ordboka, er at dei leitar etter den bøygde forma. I dag lærer dei å rulle bøyinga tilbake til grunnforma, og å finne fram i alfabetet i papirordboka. Ha ordbokene.no open og ei papirordbok klar.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>finne <strong>grunnforma</strong> til eit bøygd ord</li>
        <li>kjenne att <strong>sterke verb</strong> som byter vokal</li>
        <li>finne fram i <strong>alfabetet</strong> i papirordboka</li>
      </ul>`,
      notes: "Knyt an til førre modul: no veit elevane kva ordbok dei skal velje. I dag handlar det om korleis dei finn ordet.",
    },
    {
      type: "diskuter",
      title: "Kvifor finn eg det ikkje?",
      prompt: `<p class="stor">Du slår opp <em class="nn">bøkene</em> i papirordboka.</p>
        <p class="stor">Ordet står ikkje der. Kvifor?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "Ordbøker listar orda i grunnform. Du må slå opp <em class=\"nn\">bok</em>.",
      notes: "Lat elevane gjette. Nokon seier kanskje at ordet er feil. Det er det ikkje: det står berre i ei anna form enn den ordboka bruker.",
    },
    {
      title: "Ordboka kjenner berre grunnforma",
      body: `<table>
          <thead><tr><th>Ordklasse</th><th>Grunnforma er</th><th>Døme</th></tr></thead>
          <tbody>
            <tr class="steg"><td>Substantiv</td><td>ubestemt form eintal</td><td><em class="nn">bøkene</em> → <em class="nn">bok</em></td></tr>
            <tr class="steg"><td>Verb</td><td>infinitiv</td><td><em class="nn">sprang</em> → <em class="nn">springe</em></td></tr>
            <tr class="steg"><td>Adjektiv</td><td>positiv, den korte forma</td><td><em class="nn">finaste</em> → <em class="nn">fin</em></td></tr>
          </tbody>
        </table>`,
      notes: "Dette er tabellen elevane skal kunne. Radene kjem fram éi og éi. Spør klassen etter eitt døme til på kvar rad før du trykkjer fram den neste. Hugs å seie kva positiv er: den forma adjektivet har før det blir gradbøygd.",
    },
    {
      title: "Substantiv: stryk endinga",
      body: `<p class="midt stor"><em class="nn">-a · -en · -ar · -ane · -er · -ene</em></p>`,
      steps: [
        `<p class="kjempe midt"><em class="nn">jent<strong>ene</strong></em> → <em class="nn">jente</em></p>`,
        `<p class="kjempe midt"><em class="nn">hus<strong>a</strong></em> → <em class="nn">hus</em></p>`,
      ],
      notes: "Vis endingane først, og stryk dei så i døma. Legg merke til at <em>jentene</em> blir <em>jente</em>, ikkje <em>jent</em>: ein må kjenne ordet nok til å vite at det endar på -e i grunnforma.",
    },
    {
      title: "Svake verb: stryk og legg til -e",
      body: `<p class="midt stor">stryk <em class="nn">-a, -te, -de, -r</em> → legg til <em class="nn">-e</em></p>`,
      steps: [
        `<p class="kjempe midt"><em class="nn">kast<strong>a</strong></em> → <em class="nn">kaste</em></p>`,
        `<p class="kjempe midt"><em class="nn">høyr<strong>de</strong></em> → <em class="nn">høyre</em></p>`,
      ],
      notes: "Svake verb er greie: endinga kjem av, og ein legg til -e for å få infinitiv. Spør etter fleire døme frå klassen, til dømes <em>snakka</em> eller <em>kjøpte</em>.",
    },
    {
      title: "Sterke verb byter vokal",
      steps: [
        `<p class="kjempe midt"><em class="nn">fann</em> → <em class="nn">finne</em></p>`,
        `<p class="kjempe midt"><em class="nn">gjekk</em> → <em class="nn">gå</em></p>`,
        `<p class="kjempe midt"><em class="nn">saup</em> → <em class="nn">supe</em></p>`,
        `<p class="stor midt">Her hjelper det ikkje å stryke endingar.</p>`,
      ],
      notes: "Dette er den vanskelege gruppa. Her må ein kjenne verbet eller la ordboka hjelpe til, noko vi viser på tavla om litt. <em>Saup</em> er eit godt døme fordi få elevar kjenner det: prøv å stryke ei ending, og sjå at det ikkje går.",
    },
    {
      type: "sporsmal",
      question: "Kva må du slå opp for å finne <em class=\"nn\">gutane</em>?",
      options: [
        "<em class=\"nn\">gutan</em>",
        "<em class=\"nn\">gut</em>",
        "<em class=\"nn\">gutar</em>",
        "<em class=\"nn\">gutane</em>",
      ],
      correct: 1,
      explain: "Substantiv står i ubestemt form eintal. Stryk <em class=\"nn\">-ane</em>, så står du att med <em class=\"nn\">gut</em>. Forma <em class=\"nn\">gutt</em> er òg lov.",
      notes: "Mange vel <em>gutar</em> fordi det er den første forma dei kjenner att. Minn om at ubestemt eintal er éin gut, utan ending.",
    },
    {
      type: "diskuter",
      title: "Finn grunnforma",
      prompt: `<p class="stor"><em class="nn">skreiv · høgaste · hendene · sov · auga</em></p>`,
      form: "Skriv på ark, to og to",
      tid: 3,
      svar: "<em class=\"nn\">skrive, høg, hand, sove, auge</em>. <em class=\"nn\">Hendene</em>, <em class=\"nn\">skreiv</em> og <em class=\"nn\">sov</em> byter vokal, så der må du kjenne ordet.",
      notes: "Be para merke av dei orda der det ikkje held å stryke ei ending. Det er poenget med øvinga: nokre ord må ein kjenne. <em>Auga</em> er bestemt form eintal av <em>auge</em>, som er inkjekjønn.",
    },
    {
      kicker: "Demonstrasjon",
      title: "Snarvegen på nett",
      steps: [
        `<p class="stor">1. Skriv <em class="nn">bøkene</em> i søket på ordbokene.no</p>`,
        `<p class="stor">2. Skriv <em class="nn">sprang</em></p>`,
        `<p class="stor">3. Skriv <em class="nn">verst</em></p>`,
        `<p class="stor">Søket finn som regel <strong>grunnforma</strong> for deg.</p>`,
      ],
      notes: "Gjer dette live på ordbokene.no. Skriv den bøygde forma og be klassen sjå etter kva oppslagsord søket viser. Poenget: på nett, i ordbokene.no og i Lexin, kan ein skrive inn den bøygde forma, og søket viser kva grunnform ho høyrer til. <em>Verst</em> høyrer til <em>vond</em>: vond, verre, verst. Prøv orda på førehand, for søket finn grunnforma som regel, men ikkje alltid. Understrek til slutt at i papirordboka finst ikkje denne snarvegen.",
    },
    {
      title: "Papirordboka: æ, ø og å står sist",
      body: `<p class="kjempe midt">… x · y · z · <strong>æ · ø · å</strong></p>`,
      steps: [
        `<p class="stor midt"><em class="nn">år</em> står heilt <strong>bakarst</strong> i boka.</p>`,
        `<p class="stor midt">Bruk <strong>leieorda</strong> øvst på sida.</p>`,
      ],
      notes: "Mange trur at å kjem tidleg fordi han liknar på a. Vis i papirordboka kvar å-orda står. Leieorda øvst på sida viser det første og det siste oppslagsordet på sida. Vis korleis du blar fram med dei i staden for å lese kvar side: slå opp eit ord med klassen og sei høgt kva leieorda seier.",
    },
    {
      type: "sporsmal",
      question: "Kva rekkje står i rett alfabetisk rekkjefølgje?",
      options: [
        "ånd, bok, eple, søster",
        "bok, eple, søster, ånd",
        "bok, ånd, eple, søster",
        "eple, bok, ånd, søster",
      ],
      correct: 1,
      explain: "Æ, ø og å står sist i alfabetet. Difor kjem <em class=\"nn\">ånd</em> etter <em class=\"nn\">søster</em>.",
      notes: "Den vanlegaste feilen er å setje <em>ånd</em> først eller rett etter <em>bok</em>. Spør kva bokstav som kjem etter z.",
    },
    {
      type: "diskuter",
      title: "Set i rekkjefølgje",
      prompt: `<p class="stor"><em class="nn">stor · stamme · styre · stad · stein</em></p>`,
      form: "Kvar for seg, så samanlikn med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">stad, stamme, stein, stor, styre</em>. Alle byrjar på st, så du sorterer på den tredje bokstaven: a, e, o, y.",
      notes: "Ord som byrjar likt, blir sorterte på neste bokstav. Her er dei to første bokstavane like i alle orda, og <em>stad</em> og <em>stamme</em> er like heilt til fjerde bokstav: d kjem før m.",
    },
    {
      type: "sporsmal",
      question: "Kva oppslagsord må du leite etter for å finne <em class=\"nn\">verst</em>?",
      options: [
        "<em class=\"nn\">vers</em>",
        "<em class=\"nn\">verre</em>",
        "<em class=\"nn\">vond</em>",
        "<em class=\"nn\">verst</em>",
      ],
      correct: 2,
      explain: "<em class=\"nn\">Verst</em> høyrer til <em class=\"nn\">vond</em>, som blir gradbøygd <em class=\"nn\">vond, verre, verst</em>. Adjektiv står i positiv i ordboka.",
      notes: "Eit døme på at ein ikkje alltid kan rulle bøyinga tilbake ved å stryke. Spør om klassen kjenner fleire slike: <em>god, betre, best</em>.",
    },
    {
      type: "oppgave",
      title: "Finn oppslagsordet",
      body: `<p class="stor">Skriv grunnforma. Set ei stjerne ved dei orda der det ikkje held å stryke endinga.</p>
        <ol class="stor">
          <li><em class="nn">nettene</em></li>
          <li><em class="nn">drakk</em></li>
          <li><em class="nn">kjøpte</em></li>
          <li><em class="nn">yngste</em></li>
          <li><em class="nn">bøndene</em></li>
        </ol>`,
      form: "Åleine",
      tid: 5,
      svar: "<em class=\"nn\">natt, drikke, kjøpe, ung, bonde</em>. Stjerne ved <em class=\"nn\">nettene, drakk, yngste</em> og <em class=\"nn\">bøndene</em>: dei byter vokal.",
      notes: "Berre <em>kjøpte</em> kan løysast ved å stryke endinga og leggje til -e. <em>Yngste</em> høyrer til <em>ung</em>: ung, yngre, yngst. Ta svara munnleg før du viser fasiten, og spør korleis elevane visste grunnforma til dei orda som byter vokal.",
    },
    {
      type: "oppgave",
      title: "Alfabetet",
      body: `<p class="stor">Skriv orda i alfabetisk rekkjefølgje.</p>
        <ol class="stor">
          <li><em class="nn">øy · sol · åker · snø · ære</em></li>
          <li><em class="nn">skule · skog · skip · skjorte</em></li>
        </ol>`,
      form: "Åleine",
      tid: 3,
      svar: "1 <em class=\"nn\">snø, sol, ære, øy, åker</em>. 2 <em class=\"nn\">skip, skjorte, skog, skule</em>: alle byrjar på sk, så du sorterer på den tredje bokstaven.",
      notes: "Den første rekkja øver på æ, ø og å sist. Den andre øver på ord som byrjar likt. Har du papirordbøker, kan to eller tre elevar sjekke svaret ved å finne orda i boka.",
    },
    {
      type: "oppgave",
      title: "Forklar framgangsmåten",
      body: `<p class="kjempe midt"><em class="nn">Dei bar sekkene opp bakken.</em></p>
        <p class="stor">Skriv 30 til 60 ord:</p>
        <ol class="stor">
          <li>Kva verb og kva substantiv må du slå opp?</li>
          <li>Kva er grunnforma til kvart av dei?</li>
          <li>Kvifor held det ikkje å stryke ei ending på det eine?</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "<em class=\"nn\">bar</em> → <em class=\"nn\">bere</em> og <em class=\"nn\">sekkene</em> → <em class=\"nn\">sekk</em>. <em class=\"nn\">Bere</em> er eit sterkt verb som byter vokal, så du må kjenne verbet eller søkje på nett. (<em class=\"nn\">bakken</em> → <em class=\"nn\">bakke</em> er òg rett.)",
      notes: "Sjå etter om elevane forklarar kvifor verbet ikkje kan løysast ved å stryke ei ending. Å stryke -ene i <em>sekkene</em> går fint. Nokre vel <em>bakken</em> i staden for <em>sekkene</em>, og det er òg rett.",
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor">Ordboka listar orda i <strong>grunnform</strong>.</p>`,
        `<p class="stor">Stryk endinga, men pass på <strong>sterke verb</strong>.</p>`,
        `<p class="stor">På nett finn søket ofte grunnforma for deg.</p>`,
        `<p class="stor">I papirordboka står <strong>æ, ø, å</strong> sist.</p>`,
      ],
      notes: "Avslutt med ein rask runde: seie eit bøygd ord høgt, og la klassen rope grunnforma. Til dømes <em>husa, gjekk, finaste, nettene</em>.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen lærer elevane at ordbøker listar orda i grunnform, og korleis dei rullar bøyinga tilbake: substantiv til ubestemt form eintal, verb til infinitiv og adjektiv til positiv. Sterke verb og uregelrette ord må ein kjenne, eller få hjelp av søket på nett. Til slutt øver elevane på alfabetet i papirordboka, der æ, ø og å står sist.</p>",
    mal: [
      "Elevane kan finne grunnforma til substantiv, verb og adjektiv.",
      "Elevane veit at sterke verb byter vokal og ikkje kan løysast ved å stryke ei ending.",
      "Elevane kan bruke søket på nett til å finne grunnforma.",
      "Elevane kan finne fram i papirordboka med alfabetet og leieorda.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kjenne ordklassane substantiv, verb og adjektiv, og vite kva ubestemt og bestemt form er. Modulen Tre ordbøker, tre styrkar bør vere gjennomgått.",
    forebuing: [
      "Test søka på lysbilete 10 på ordbokene.no før timen: <em class=\"nn\">bøkene</em>, <em class=\"nn\">sprang</em> og <em class=\"nn\">verst</em>.",
      "Ha med ei eller fleire papirordbøker, gjerne nok til at para kan dele.",
      "Finn eit ord i papirordboka på førehand som du kan bruke til å vise leieorda.",
      "Elevane treng berre skrivebok. Oppgåvene på lysbilete 15 til 17 kan gjerast utan ordbok.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane forklare kvifor <em class=\"nn\">bøkene</em> ikkje står i ordboka.</p>", lysbilete: "2 og 3" },
      { fase: "Grunnforma", min: 13, gjer: "<p>Gå gjennom tabellen, substantiv, svake og sterke verb. Ta spørsmålet om <em class=\"nn\">gutane</em> og la para finne grunnforma til fem ord.</p>", lysbilete: "4 til 9" },
      { fase: "Snarveg og alfabet", min: 10, gjer: "<p>Demonstrer søket på ordbokene.no live. Vis alfabetet og leieorda i papirordboka, og ta øvingane om rekkjefølgje og <em class=\"nn\">verst</em>.</p>", lysbilete: "10 til 14" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane skriv grunnforma til fem ord, set ord i alfabetisk rekkjefølgje og forklarar framgangsmåten for <em class=\"nn\">Dei bar sekkene opp bakken</em> i skriveboka. Gå gjennom fasiten etter kvar oppgåve.</p>", lysbilete: "15 til 17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og ta ein munnleg runde med bøygde ord.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Ordet finst ikkje, så det er feil.»", hjelp: "Ordet står i grunnform. Rull bøyinga tilbake og prøv på nytt." },
      { feil: "«<em class=\"nn\">fann</em> må vere <em class=\"nn\">fanne</em>.»", hjelp: "Sterke verb byter vokal. Å stryke endinga og leggje til -e gir ikkje rett infinitiv. Bruk søket på nett eller lær dei vanlegaste sterke verba." },
      { feil: "«Å kjem tidleg i alfabetet, rett etter a.»", hjelp: "Æ, ø og å står sist, i den rekkjefølgja, etter z." },
      { feil: "«Grunnforma er fleirtal når ordet oftast står i fleirtal.»", hjelp: "Substantiv står alltid i ubestemt form eintal i ordboka: <em class=\"nn\">hendene</em> står under <em class=\"nn\">hand</em>." },
    ],
    samtale: [
      "Kvifor trur du ordbøkene berre listar grunnforma?",
      "Kva ord kan du ikkje finne grunnforma til ved å stryke endinga?",
      "Når er papirordboka raskare enn nettet, og når er ho seinare?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane tabellen med dei tre ordklassane og grunnforma som huskelapp.",
        "Start med substantiv og svake verb før de tek sterke verb.",
        "La elevane bruke søket på nett til å sjekke svara sine.",
      ],
      utfordring: [
        "Be elevane lage ei liste over ti sterke verb med preteritum og infinitiv.",
        "La elevane konkurrere om kven som finn eit ord raskast i papirordboka, og forklare korleis dei brukte leieorda.",
      ],
    },
    vurdering: [
      "Spørsmåla og samtaleoppgåvene viser raskt om klassen finn grunnforma.",
      "Skriveoppgåva om <em class=\"nn\">Dei bar sekkene opp bakken</em> viser om eleven kan forklare framgangsmåten og skil mellom svake og sterke verb.",
      "Kjenneteikn på god måloppnåing: eleven finn grunnforma til sterke verb og uregelrette adjektiv, og kan grunngi kvifor.",
    ],
    vidare: "Gå vidare til Les ein ordbokartikkel, der elevane lærer å hente ut kjønn, bøying og døme når dei har funne ordet. Elevmodulen Finn oppslagsordet kan brukast som frivillig lekse.",
  },
});

Larar.register("ordbok-artikkel", {
  tittelnotat: "No finn elevane ordet. Men mange les berre tydinga og lukkar ordboka. I dag lærer dei å lese heile artikkelen: kjønn, bøying og døme er det som hjelper når dei skriv. Ha ordbokene.no open på tavla.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein <strong>ordbokartikkel</strong> frå topp til botn</li>
        <li>forstå <strong>forkortingane</strong> for ordklasse og kjønn</li>
        <li>bruke <strong>bøyinga</strong> og <strong>døma</strong> når vi skriv</li>
      </ul>`,
      notes: "Knyt an til førre modul: no kan elevane finne oppslagsordet. I dag handlar det om kva dei gjer når dei har funne det.",
    },
    {
      type: "diskuter",
      title: "Kva står i ein ordbokartikkel?",
      prompt: `<p class="stor">Nemn så mange ting du kan som står i ein artikkel i ordboka.</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv forslaga på tavla. Dei fleste nemner tydinga. Færre nemner kjønn, bøying og døme. Det er dei tinga vi skal leggje vekt på i dag.",
    },
    {
      title: "Kva står kvar?",
      body: ORDARTIKKEL_BOK,
      steps: [
        `<p><span class="merk" data-n="1"></span> <strong>Oppslagsordet</strong> i grunnform</p>`,
        `<p><span class="merk" data-n="2"></span> <strong>Ordklasse og kjønn</strong> · <span class="merk" data-n="3"></span> <strong>Bøyinga</strong></p>`,
        `<p><span class="merk" data-n="4"></span> <strong>Tydingane</strong> · <span class="merk" data-n="5"></span> <strong>Døma</strong> i kursiv</p>`,
      ],
      notes: "Artikkelen er litt forenkla samanlikna med Nynorskordboka. Peik på dei nummererte merka i figuren mens du viser stega. Spør klassen for kvart nummer: kva fortel dette deg?",
    },
    {
      title: "Forkortingane",
      body: `<table>
          <tbody>
            <tr><td class="stor"><strong>m</strong></td><td class="stor">hankjønn</td></tr>
            <tr><td class="stor"><strong>f</strong></td><td class="stor">hokjønn</td></tr>
            <tr><td class="stor"><strong>n</strong></td><td class="stor">inkjekjønn</td></tr>
            <tr><td class="stor"><strong>v</strong></td><td class="stor">verb</td></tr>
            <tr><td class="stor"><strong>adj</strong></td><td class="stor">adjektiv</td></tr>
          </tbody>
        </table>`,
      steps: [`<p class="stor midt">Talet etter, som <strong>f1</strong>, viser <strong>bøyingsmønsteret</strong>.</p>`],
      notes: "Elevane treng ikkje kunne bøyingsmønstera utanåt, for bøyingsformene står oppførte rett etterpå. Det viktige er bokstaven: han fortel kjønnet, og kjønnet styrer artikkelen og bøyinga.",
    },
    {
      title: "Bøyinga står alltid i same rekkjefølgje",
      steps: [
        `<p class="stor"><strong>Substantiv:</strong> bestemt eintal, ubestemt fleirtal, bestemt fleirtal</p>
         <p class="stor midt"><em class="nn">boka, bøker, bøkene</em></p>`,
        `<p class="stor"><strong>Verb:</strong> presens, preteritum, perfektum partisipp</p>
         <p class="stor midt"><em class="nn">skriv, skreiv, skrive</em></p>`,
        `<p class="midt">Står det to former på same plass, skilde med komma, er <strong>begge lov</strong>.</p>`,
      ],
      notes: "Dette er det viktigaste lysbiletet i timen. Når elevane kjenner rekkjefølgja, er det lett å plukke ut rett form. Øv munnleg: kva er ubestemt fleirtal av bok? Kva er preteritum av skrive?",
    },
    {
      title: "Tydingar og døme",
      steps: [
        `<p class="stor">Tydingane er <strong>nummererte</strong>. Den vanlegaste kjem først.</p>`,
        `<p class="stor">Døma i <em>kursiv</em> viser ordet <strong>i bruk</strong>.</p>`,
        `<p class="stor">Døma viser kva <strong>preposisjon</strong> og <strong>bøyingsform</strong> ordet plar ha.</p>`,
      ],
      notes: "Døma er ofte det mest nyttige i heile artikkelen. Peik på <em>ei bok om fuglar</em> i figuren: her ser ein både at det heiter <em>ei</em> bok, og at ein bruker <em>om</em>.",
    },
    {
      kicker: "Demonstrasjon",
      title: "Ein ekte artikkel",
      steps: [
        `<p class="stor">1. Slå opp <em class="nn">bok</em> i Nynorskordboka</p>`,
        `<p class="stor">2. Finn nummer 1 til 5 frå figuren</p>`,
        `<p class="stor">3. Slå opp <em class="nn">skrive</em>: finn preteritum</p>`,
      ],
      notes: "Byt til ordbokene.no og slå opp <em>bok</em>. Be klassen peike ut oppslagsordet, kjønnet, bøyinga, tydingane og døma i den ekte artikkelen. Gjer dei merksame på at den ekte artikkelen har meir enn figuren, mellom anna uttale, ordhistorie og faste uttrykk. Slå så opp <em>skrive</em> og la klassen finne preteritum. Sjå gjennom begge artiklane før timen, så du veit korleis dei ser ut.",
    },
    {
      type: "sporsmal",
      question: "<strong>lærar</strong> m1 · <em>bøying:</em> læraren, lærarar, lærarane<br><br>Kva kjønn har ordet, og kva er bestemt form eintal?",
      options: [
        "Hokjønn, <em class=\"nn\">læraren</em>",
        "Hankjønn, <em class=\"nn\">læraren</em>",
        "Hankjønn, <em class=\"bm\">læreren</em>",
        "Inkjekjønn, <em class=\"nn\">lærarane</em>",
      ],
      correct: 1,
      explain: "<strong>m</strong> tyder hankjønn, og den første bøyingsforma er bestemt form eintal: <em class=\"nn\">læraren</em>.",
      notes: "Alternativ tre er ei bokmålsform. Bruk det til å minne om at ordboka viser nynorskforma, og at det er ho ein skal skrive.",
    },
    {
      type: "sporsmal",
      question: "<strong>skrive</strong> v · <em>bøying:</em> skriv, skreiv, skrive<br><br>Kva er preteritum?",
      options: [
        "<em class=\"nn\">skriv</em>",
        "<em class=\"nn\">skreiv</em>",
        "<em class=\"bm\">skrev</em>",
        "<em class=\"nn\">skrive</em>",
      ],
      correct: 1,
      explain: "Verbbøyinga står i rekkjefølgja presens, preteritum, perfektum partisipp: <em class=\"nn\">skriv, skreiv, skrive</em>.",
      notes: "Elevar som vel <em>skriv</em>, har teke den første forma. Minn om at infinitiv er oppslagsordet, så den første forma i bøyinga er presens.",
    },
    {
      type: "sporsmal",
      question: "Det står <strong>sol f1</strong>. Kva fortel <strong>f1</strong> deg?",
      options: [
        "At ordet har éi tyding",
        "At ordet er hokjønn og følgjer bøyingsmønster 1",
        "At ordet står på side 1",
        "At ordet er eit framandord",
      ],
      correct: 1,
      explain: "Bokstaven viser ordklasse og kjønn, og talet viser bøyingsmønsteret. Bøyingsformene står rett etterpå: <em class=\"nn\">sola, soler, solene</em>.",
      notes: "Mange trur talet viser kor mange tydingar ordet har. Peik tilbake på figuren: tydingane har eigne nummer lenger ned.",
    },
    {
      type: "diskuter",
      title: "Bruk bøyinga",
      prompt: `<p><strong>bok</strong> f1 · boka, bøker, bøkene</p>
        <ol>
          <li><em class="nn">Eg las ___ ferdig i går.</em></li>
          <li><em class="nn">Han har lese tre ___ i sommar.</em></li>
          <li><em class="nn">Alle ___ stod i hylla.</em></li>
        </ol>`,
      form: "Kvar for seg, så samanlikn med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">boka, bøker, bøkene</em>. Bestemt eintal, ubestemt fleirtal, bestemt fleirtal.",
      notes: "Be elevane seie kva form setninga krev før dei vel: éi bestemt bok, fleire ubestemte, alle dei bestemte. Hokjønnsord får -a i bestemt eintal. <em>Bok</em> har i tillegg omlyd i fleirtal.",
    },
    {
      title: "Ikkje stopp ved tydinga",
      steps: [
        `<p class="stor midt">Tydinga kjenner du ofte frå før.</p>`,
        `<p class="stor midt">Det er <strong>bøyinga</strong> og <strong>døma</strong> som reddar deg.</p>`,
        `<p class="kjempe midt"><em class="nn">boka</em>, ikkje <em class="bm">boken</em></p>`,
      ],
      notes: "Når elevane skriv nynorsk, veit dei som regel kva ordet tyder. Det dei lurer på, er kjønn og form. Har oppslaget gitt dei <em>boka</em> og ikkje <em>boken</em>, har det gjort jobben sin.",
    },
    {
      type: "diskuter",
      title: "Kva er døma gode for?",
      prompt: `<p class="stor">Kvifor er døma i kursiv ofte meir nyttige enn forklaringa når du skal skrive?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      svar: "Døma viser ordet i bruk: kjønnet (<em class=\"nn\">ei bok</em>), bøyingsforma og kva preposisjon ordet plar ha (<em class=\"nn\">ei bok om fuglar</em>). Tydinga veit du som regel frå før.",
      notes: "Dette er det viktigaste poenget i timen, og det kjem att når elevane slår opp sjølve om litt. Lat to eller tre par dele svaret sitt før du viser svaret.",
    },
    {
      type: "oppgave",
      title: "Les artikkelen",
      body: `<div class="boks">
          <p class="stor"><strong>fjell</strong> n1 · <em>bøying:</em> fjellet, fjell, fjella</p>
          <p class="stor"><strong>drikke</strong> v · <em>bøying:</em> drikk, drakk, drukke</p>
        </div>
        <ol class="stor">
          <li>Kva kjønn har <em class="nn">fjell</em>? Skriv <em class="nn">ein</em>, <em class="nn">ei</em> eller <em class="nn">eit</em> framfor.</li>
          <li><em class="nn">Vi gjekk på tre ___ i ferien.</em></li>
          <li><em class="nn">Vi såg ned frå ___ .</em></li>
          <li><em class="nn">I går ___ eg to glas vatn.</em></li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "1 Inkjekjønn: <em class=\"nn\">eit fjell</em>. 2 <em class=\"nn\">fjell</em> (ubestemt fleirtal). 3 <em class=\"nn\">fjellet</em> (bestemt eintal). 4 <em class=\"nn\">drakk</em> (preteritum).",
      notes: "Artiklane er forenkla. Be elevane seie kva form setninga krev før dei vel plass i rekkja. Nummer 2 er ei felle: inkjekjønnsord som <em>fjell</em> har ingen ending i ubestemt fleirtal, så forma er lik oppslagsordet.",
    },
    {
      type: "oppgave",
      title: "Slå opp sjølve",
      body: `<p class="stor">Slå opp i Nynorskordboka. Skriv kjønn eller ordklasse og bøyinga.</p>
        <ol class="stor">
          <li><em class="nn">jente</em></li>
          <li><em class="nn">hest</em></li>
          <li><em class="nn">springe</em></li>
          <li>Skriv av eitt døme. Kva viser det om ordet?</li>
        </ol>`,
      utstyr: ["skrivebok", "ordbok"],
      form: "I par",
      tid: 7,
      svar: "<em class=\"nn\">jente</em> hokjønn: <em class=\"nn\">jenta, jenter, jentene</em>. <em class=\"nn\">hest</em> hankjønn: <em class=\"nn\">hesten, hestar, hestane</em>. <em class=\"nn\">springe</em> verb: <em class=\"nn\">spring, sprang, sprunge</em>.",
      notes: "Para deler éin skjerm med ordbokene.no, mobil eller PC. Har ikkje elevane tilgang, slår du opp orda på tavla og lèt klassen skrive ned kjønn og bøying frå den ekte artikkelen. Sjekk før timen korleis artiklane ser ut: ordboka kan vise fleire tillatne former enn fasiten. Dei som blir tidleg ferdige, kan slå opp tre ord frå eigne tekstar og skrive kjønn og bøying.",
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor"><strong>m, f, n</strong> fortel kjønnet.</p>`,
        `<p class="stor">Bøyinga står i <strong>fast rekkjefølgje</strong>.</p>`,
        `<p class="stor">Den <strong>vanlegaste tydinga</strong> kjem først.</p>`,
        `<p class="stor">Les <strong>døma</strong>.</p>`,
      ],
      notes: "Be elevane skrive rekkjefølgja for substantiv og verb på ein lapp. Det er den dei har mest bruk for.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen lærer elevane å lese ein ordbokartikkel i Nynorskordboka: oppslagsord, forkortingar for ordklasse og kjønn, bøyingsformene i fast rekkjefølgje, nummererte tydingar og døme i kursiv. Hovudpoenget er at bøyinga og døma er det som hjelper når ein skriv, ikkje berre tydinga.</p>",
    mal: [
      "Elevane kan forklare forkortingane m, f, n, v og adj, og kva talet etter bokstaven viser.",
      "Elevane kan hente ut rett bøyingsform ut frå rekkjefølgja i artikkelen.",
      "Elevane veit at den vanlegaste tydinga kjem først.",
      "Elevane kan bruke døma til å finne kjønn, form og preposisjon.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kunne finne grunnforma (modulen Finn oppslagsordet) og kjenne omgrepa bestemt og ubestemt form, eintal og fleirtal, presens, preteritum og perfektum partisipp.",
    forebuing: [
      "Slå opp <em class=\"nn\">bok</em> og <em class=\"nn\">skrive</em> på ordbokene.no før timen og sjå korleis artiklane ser ut.",
      "Ha ordbokene.no open i ei fane, så du kan byte raskt til demonstrasjonen på lysbilete 8.",
      "Ha små lappar klare til oppsummeringa.",
      "Sjå til at para har tilgang til ordbokene.no på mobil eller PC til oppgåva på lysbilete 16, eller ha papirordbøker klare. Elles slår du opp orda felles på tavla.",
      "Slå opp <em class=\"nn\">jente</em>, <em class=\"nn\">hest</em> og <em class=\"nn\">springe</em> på førehand, så du veit kva former ordboka viser.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane nemne kva som står i ein ordbokartikkel.</p>", lysbilete: "2 og 3" },
      { fase: "Delane i artikkelen", min: 12, gjer: "<p>Gå gjennom figuren, forkortingane, rekkjefølgja i bøyinga og tydingar og døme. Demonstrer ein ekte artikkel live.</p>", lysbilete: "4 til 8" },
      { fase: "Øving i klassen", min: 11, gjer: "<p>Tre spørsmål, fyll inn formene av <em class=\"nn\">bok</em>, og samtale om kva døma er gode for.</p>", lysbilete: "9 til 14" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane les to artiklar på tavla og vel rett form i skriveboka. Deretter slår para opp tre ord i Nynorskordboka og skriv ned kjønn og bøying.</p>", lysbilete: "15 og 16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og la elevane skrive rekkjefølgja i bøyinga på ein lapp.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Talet i <strong>f1</strong> er talet på tydingar.»", hjelp: "Talet viser bøyingsmønsteret. Tydingane har eigne nummer lenger ned i artikkelen." },
      { feil: "«Den første forma i bøyinga er grunnforma.»", hjelp: "Grunnforma er oppslagsordet. Den første forma i bøyinga er bestemt eintal for substantiv og presens for verb." },
      { feil: "«Eg treng berre tydinga.»", hjelp: "Når du skriv, veit du som regel kva ordet tyder. Det du treng, er kjønnet og forma, og det står i bøyinga og døma." },
      { feil: "«To former på same plass betyr at ordboka er usikker.»", hjelp: "Står det to former skilde med komma, er begge lov. Vel éi og bruk henne gjennom heile teksten." },
    ],
    samtale: [
      "Kvifor trur du den vanlegaste tydinga står først?",
      "Kva kan eit døme fortelje deg som forklaringa ikkje seier?",
      "Kvifor er kjønnet så viktig å sjekke når du skriv nynorsk?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein kopi av figuren med dei fem nummera forklarte.",
        "Gi elevane rekkjefølgja i bøyinga for substantiv og verb på ein huskelapp.",
        "La elevane arbeide med éin artikkel om gongen og markere dei fem delane med fargar.",
      ],
      utfordring: [
        "Be elevane finne eit ord med to tillatne former på same plass og skrive ei setning med kvar.",
        "La elevane samanlikne artikkelen for same ord i Nynorskordboka og Bokmålsordboka og skrive kva som er ulikt.",
      ],
    },
    vurdering: [
      "Spørsmåla på tavla viser om klassen kan lese kjønn og bøying ut av artikkelen.",
      "Oppgåva med <em class=\"nn\">fjell</em> og <em class=\"nn\">drikke</em> viser om eleven vel rett form ut frå rekkjefølgja.",
      "Oppslagsoppgåva viser om eleven finn kjønn og bøying i ein ekte artikkel.",
      "Kjenneteikn på god måloppnåing: eleven hentar ut kjønn, rett bøyingsform og preposisjon frå ein ukjend artikkel, og forklarar kvifor døma er nyttige.",
    ],
    vidare: "Gå vidare til Bruk ordboka mens du skriv, der elevane bruker det dei har lært i eigne tekstar og lærer å finne nynorskordet når dei berre kjenner bokmålsordet. Elevmodulen Les ein ordbokartikkel kan brukast som frivillig lekse.",
  },
});

Larar.register("ordbok-i-skriving", {
  tittelnotat: "Dette er modulen der ordbokbruken blir ein vane. Elevane lærer når det løner seg å slå opp, og korleis dei finn nynorskordet når dei berre kjenner bokmålsordet. Ha ordbokene.no og Lexin opne i kvar si fane.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>vite <strong>når</strong> det løner seg å slå opp</li>
        <li>gå frå <strong>bokmålsord</strong> til <strong>nynorskord</strong></li>
        <li>bruke ordboka i <strong>eigen tekst</strong></li>
      </ul>`,
      notes: "Dette er den siste ordbokmodulen. Sei at målet er at elevane skal slå opp fem ord i ein tekst utan at det tek lang tid.",
    },
    {
      type: "diskuter",
      title: "Treng vi eigentleg ordboka?",
      prompt: `<p class="stor">«Eg gidd ikkje slå opp, eg skriv berre som det høyrest ut.»</p>
        <p>Er du einig? Når fungerer det, og når gjer det ikkje?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Lat elevane få seie at dei er einige. Samle argumenta på tavla. Kom tilbake til påstanden på slutten av timen, når elevane har sett kor fort eit oppslag går. Feil i kjønn og bøying er vanskelege å høyre, særleg for den som snakkar bokmålsnært.",
    },
    {
      title: "Fire gonger det løner seg",
      steps: [
        `<p class="stor">1. Du er usikker på <strong>kjønnet</strong>.</p>`,
        `<p class="stor">2. Du er usikker på <strong>bøyinga</strong>.</p>`,
        `<p class="stor">3. Ordet <strong>luktar bokmål</strong>.</p>`,
        `<p class="stor">4. Du har brukt <strong>same ord</strong> fem gonger.</p>`,
      ],
      notes: "Ein kan ikkje slå opp kvart ord. Desse fire situasjonane er verdt tida. Under bøyinga er det særleg fleirtal av hankjønnsord (-ar og -ane) og preteritum av sterke verb som er vanskeleg. Under nummer 4 kan ein leite etter eit ord som tyder omtrent det same.",
    },
    {
      title: "Kjønnet smittar",
      body: `<p class="kjempe midt"><em class="nn">ei bok</em> eller <em class="nn">eit bok</em>?</p>`,
      steps: [
        `<p class="stor midt">Kjønnet styrer <strong>artikkelen</strong> og <strong>bøyinga</strong>.</p>`,
        `<p class="stor midt">Ein feil her smittar over på heile setninga.</p>`,
      ],
      notes: "Vis kva som skjer om kjønnet er feil: artikkelen blir feil, bestemt form blir feil, og eit adjektiv som skildrar ordet, kan òg bli feil. Difor er kjønnet det første ein bør sjekke.",
    },
    {
      type: "sporsmal",
      question: "Du søkjer eit ord som luktar bokmål i Nynorskordboka og får <strong>ingen treff</strong>. Kva betyr det?",
      options: [
        "Ordet er lov likevel",
        "Du må finne eit anna ord",
        "Du må slå opp i Lexin i staden",
      ],
      correct: 1,
      explain: "Får du treff i Nynorskordboka, er ordet lov. Får du ingen treff, må du finne eit anna ord. Hugs å sjekke at du har søkt på grunnforma.",
      notes: "Koplinga til modulen om grunnform er viktig: har eleven søkt på ei bøygd form i papirordboka, kan han få null treff sjølv om ordet er lov.",
    },
    {
      title: "Frå bokmålsord til nynorskord",
      body: `<div class="vegvisar">
          <div class="vv-start">Du kjenner berre bokmålsordet</div>
          <div class="vv-greiner">
            <div class="vv-grein"><span class="vv-val">Søk i Nynorskordboka</span><span class="vv-pil">↓</span><span class="vv-svar a">Treff?<small>ordet er lov</small></span></div>
            <div class="vv-grein"><span class="vv-val">Ingen treff</span><span class="vv-pil">↓</span><span class="vv-svar e">Bokmålsordboka<small>les forklaringa</small></span></div>
            <div class="vv-grein"><span class="vv-val">Søk begge samtidig</span><span class="vv-pil">↓</span><span class="vv-svar kort">ordbokene.no<small>finst ordet i begge?</small></span></div>
            <div class="vv-grein"><span class="vv-val">Kort, vanleg ord</span><span class="vv-pil">↓</span><span class="vv-svar sterk">Lexin<small>byt målform</small></span></div>
          </div>
        </div>`,
      steps: [`<p class="midt">Ordbøkene er <strong>ikkje</strong> omsetjingsordbøker, men forklaringa gir deg eit nytt ord å søkje på.</p>`],
      notes: "Gå gjennom greinene. 1: mange ord er like i dei to målformene, og då får ein treff med ein gong. 2: forklaringa i Bokmålsordboka gir som regel eit anna ord å søkje på. 3: på ordbokene.no kan ein søkje i begge ordbøkene samtidig. 4: i Lexin kan ein byte mellom bokmål og nynorsk på same oppslagsord, og det er ofte raskast for korte, vanlege ord.",
    },
    {
      kicker: "Demonstrasjon",
      title: "Kva heiter <em class=\"bm\">anledning</em> på nynorsk?",
      steps: [
        `<p class="stor">1. Søk <em class="bm">anledning</em> i Nynorskordboka</p>`,
        `<p class="stor">2. Les forklaringa i Bokmålsordboka</p>`,
        `<p class="stor">3. Søk <em class="nn">høve</em> i Nynorskordboka</p>`,
        `<p class="stor">4. Les eitt døme</p>`,
      ],
      notes: "Gjer dette live på ordbokene.no. I Bokmålsordboka blir <em>anledning</em> forklart som «høve, sjanse» i Bokmålsordboka. Be klassen sjå etter kva ord forklaringa gir, og søk så vidare på <em>høve</em>. Les eit døme høgt, så klassen ser at ordet passar i same samanheng. Vis gjerne til slutt at du kan søkje i begge ordbøkene samtidig. Test oppslaget på førehand.",
    },
    {
      type: "sporsmal",
      question: "Du har skrive <em class=\"bm\">forskjellen</em> og finn ikkje ordet i Nynorskordboka. Kva gjer du?",
      options: [
        "Bruker ordet likevel, det høyrest greitt ut",
        "Les forklaringa i Bokmålsordboka og finn t.d. <em class=\"nn\">skilnaden</em>",
        "Stryk heile setninga",
        "Byter til eit engelsk ord",
      ],
      correct: 1,
      explain: "<em class=\"bm\">Forskjell</em> blir forklart som «ulikskap, skilnad», og <em class=\"nn\">skilnad</em> står i Nynorskordboka.",
      notes: "Om du har tid, gjer oppslaget live etter at svaret er vist: <em>forskjell</em> i Bokmålsordboka, så <em>skilnad</em> i Nynorskordboka.",
    },
    {
      title: "Felle: ordet finst, men passar det?",
      steps: [
        `<p class="stor midt">At ordet står i Nynorskordboka, betyr ikkje at det passar i <strong>din</strong> tekst.</p>`,
        `<p class="kjempe midt">Les <strong>forklaringa</strong> og <strong>eitt døme</strong>.</p>`,
      ],
      notes: "Står ordet der som noko heilt anna enn det eleven meinte, er det feil ord sjølv om skrivemåten er lov. Denne vanen tek berre nokre sekund og hindrar mange rare setningar.",
    },
    {
      type: "diskuter",
      title: "Vel rett plass i rekkja",
      prompt: `<ol>
          <li><em>veke f1: veka, veker, vekene</em><br><em class="nn">Neste ___ skal vi på tur.</em></li>
          <li><em>finne v: finn, fann, funne</em><br><em class="nn">I går ___ eg lommeboka mi.</em></li>
          <li><em>gut m1: guten, gutar, gutane</em><br><em class="nn">Alle ___ i klassa var med.</em></li>
        </ol>`,
      form: "Kvar for seg, så samanlikn med sidemannen",
      tid: 3,
      svar: "<em class=\"nn\">veka, fann, gutane</em>. Substantiv: bestemt eintal, ubestemt fleirtal, bestemt fleirtal. Verb: presens, preteritum, perfektum partisipp.",
      notes: "Når bøyingslinja står framfor ein, er oppgåva berre å velje rett plass i rekkja. Be elevane seie kva form setninga krev før dei vel. Dette repeterer førre modul.",
    },
    {
      type: "diskuter",
      title: "Set om til nynorsk",
      prompt: `<p class="stor"><em class="bm">Forskjellen mellom de to bøkene er ikke stor, men jeg likte den første best.</em></p>`,
      form: "To og to, med ordboka open",
      tid: 4,
      svar: "<em class=\"nn\">Skilnaden mellom dei to bøkene er ikkje stor, men eg likte den første best.</em> <em class=\"nn\">Fyrste</em> er òg lov.",
      notes: "Be para bruke ordbokene.no på dei orda dei er usikre på. Spør etterpå kva ord dei slo opp. Sannsynlegvis <em>forskjell</em>. Nokre slår kanskje opp <em>første</em> og ser at <em>fyrste</em> òg er lov.",
    },
    {
      type: "oppgave",
      title: "Skriv og slå opp",
      body: `<p class="stor">Skriv 80 til 150 ord om ein <strong>stad du kjenner godt</strong>. Slå opp minst fem ord:</p>
        <ol class="stor">
          <li><strong>Kjønnet</strong> på minst to substantiv</li>
          <li><strong>Preteritum</strong> av minst eitt sterkt verb</li>
          <li>Minst eitt ord som <strong>luktar bokmål</strong></li>
          <li>List orda og kva du fann ut, <strong>nedst</strong> i teksten.</li>
        </ol>`,
      steps: [`<p class="midt">Ferdig? Byt skrivebok med sidemannen og finn eitt ord som burde vore slått opp.</p>`],
      utstyr: ["skrivebok", "ordbok"],
      form: "Åleine",
      tid: 15,
      notes: "Elevane skriv i skriveboka og slår opp på ordbokene.no på mobil eller PC, eller i papirordboka. Gå rundt og sjå på lista over oppslag: der ser du om dei slår opp dei rette tinga. Trykk fram steget for dei som blir tidleg ferdige.",
    },
    {
      type: "diskuter",
      title: "Tilbake til påstanden",
      prompt: `<p class="stor">«Eg gidd ikkje slå opp, eg skriv berre som det høyrest ut.»</p>
        <p>Kor lang tid tok dei fem oppslaga dine? Kva fann du ut?</p>`,
      form: "Heile klassen",
      tid: 4,
      notes: "Spør kor lang tid fem oppslag tok. Svaret er som regel eit par minutt. Spør så kva slags feil elevane fann som dei ikkje ville ha høyrt: typisk kjønn, fleirtal og preteritum. Som lekse kan elevane skrive 40 til 80 ord om kva dei vil svare ein medelev som seier dette, eller gjere den siste skriveoppgåva i elevmodulen, Svar medeleven.",
    },
    {
      title: "Oppsummering",
      steps: [
        `<p class="stor">Slå opp ved tvil om <strong>kjønn</strong>, <strong>bøying</strong> og <strong>bokmålsord</strong>.</p>`,
        `<p class="stor">Ingen treff? Gå via <strong>Bokmålsordboka</strong>.</p>`,
        `<p class="stor">Les alltid <strong>forklaringa</strong> og <strong>eitt døme</strong>.</p>`,
      ],
      notes: "Avslutt med at elevane skriv ned eitt ord dei slo opp i dag som dei trur dei kjem til å gløyme. Det er ordet dei bør slå opp neste gong òg.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen samlar det elevane har lært i Del 3 og set det i arbeid i eigen tekst. Elevane lærer fire situasjonar der det løner seg å slå opp: tvil om kjønn, tvil om bøying, ord som luktar bokmål og ord som er brukte for mange gonger. Dei lærer òg ein framgangsmåte for å finne nynorskordet når dei berre kjenner bokmålsordet, og å sjekke at ordet dei finn, passar i teksten.</p>",
    mal: [
      "Elevane kan nemne dei fire situasjonane der det løner seg å slå opp.",
      "Elevane kan finne eit nynorskord via forklaringa i Bokmålsordboka.",
      "Elevane les forklaring og døme før dei bruker eit nytt ord.",
      "Elevane bruker ordboka undervegs når dei skriv eigen tekst på nynorsk.",
    ],
    lareplan: [10, 11],
    forkunnskapar: "Elevane bør ha gått gjennom dei tre første ordbokmodulane: Tre ordbøker, tre styrkar, Finn oppslagsordet og Les ein ordbokartikkel.",
    forebuing: [
      "Test oppslaga på ordbokene.no før timen: <em class=\"bm\">anledning</em>, <em class=\"nn\">høve</em>, <em class=\"bm\">forskjell</em> og <em class=\"nn\">skilnad</em>.",
      "Ha ordbokene.no og Lexin opne i kvar si fane på tavla.",
      "Sjå til at elevane har tilgang til ordbokene.no på mobil eller PC på lysbilete 12 og 13, eller ha papirordbøker klare. Elevane skriv i skriveboka.",
    ],
    okt: [
      { fase: "Oppstart", min: 3, gjer: "<p>Gå gjennom måla og la elevane ta stilling til påstanden om å skrive som det høyrest ut.</p>", lysbilete: "2 og 3" },
      { fase: "Når slår vi opp?", min: 5, gjer: "<p>Gå gjennom dei fire situasjonane, kjønn som smittar, og spørsmålet om null treff.</p>", lysbilete: "4 til 6" },
      { fase: "Frå bokmål til nynorsk", min: 8, gjer: "<p>Vis vegvisaren og demonstrer <em class=\"bm\">anledning</em> live. Ta spørsmålet om <em class=\"bm\">forskjellen</em> og snakk om fella.</p>", lysbilete: "7 til 10" },
      { fase: "Øving i klassen", min: 8, gjer: "<p>Vel rett plass i bøyingsrekkja, og set om ei setning med ordboka open.</p>", lysbilete: "11 og 12" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane skriv teksten om ein stad og slår opp minst fem ord. Dei som blir ferdige, byter skrivebok med sidemannen og finn eitt ord som burde vore slått opp.</p>", lysbilete: "13" },
      { fase: "Avslutning", min: 6, gjer: "<p>Gå tilbake til påstanden frå oppstarten og oppsummer.</p>", lysbilete: "14 og 15" },
    ],
    misoppfatningar: [
      { feil: "«Står ordet i Nynorskordboka, kan eg bruke det.»", hjelp: "Skrivemåten er lov, men ordet må òg tyde det du meiner. Les forklaringa og eitt døme." },
      { feil: "«Ordboka kan omsetje frå bokmål til nynorsk.»", hjelp: "Ordbøkene er ikkje omsetjingsordbøker. Men forklaringa i Bokmålsordboka gir som regel eit ord du kan søkje vidare på." },
      { feil: "«Eg høyrer om noko er feil.»", hjelp: "Feil i kjønn og bøying er vanskelege å høyre, særleg når bokmålsforma er kjend. Eit oppslag tek berre nokre sekund." },
      { feil: "«Eg må slå opp kvart ord.»", hjelp: "Nei, berre når du er i tvil om kjønn, bøying, eit ord som luktar bokmål, eller når du har brukt same ord for mange gonger." },
    ],
    samtale: [
      "Kva ord slår du oftast opp, og kvifor?",
      "Korleis kjenner du at eit ord luktar bokmål?",
      "Kvifor er det lurt å lese eit døme før du bruker eit nytt ord?",
      "Kva er skilnaden mellom ei ordbok og ei omsetjingsteneste?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane vegvisaren som huskelapp mens dei skriv.",
        "La elevane skrive ein kortare tekst og slå opp tre ord i staden for fem.",
        "Bruk Lexin og byt mellom bokmål og nynorsk for korte, vanlege ord.",
      ],
      utfordring: [
        "Be elevane finne tre bokmålsord i ein eigen tekst og vise vegen til nynorskordet via Bokmålsordboka.",
        "La elevane skrive ein tekst der dei unngår å bruke same ord meir enn to gonger, og bruke ordboka til å finne ord som tyder omtrent det same.",
      ],
    },
    vurdering: [
      "Lista over oppslag under teksten viser om eleven slår opp dei rette tinga: kjønn, sterke verb og bokmålsord.",
      "Omsetjingsoppgåva viser om eleven kan gå via Bokmålsordboka.",
      "Kjenneteikn på god måloppnåing: eleven slår opp målretta undervegs, finn nynorskord via forklaringar og sjekkar at ordet passar i samanhengen.",
    ],
    vidare: "Følg opp i skrivemodulane i Del 4. Be elevane halde fram med å liste oppslaga sine under tekstane, og bruk modulane under Typiske feil for å øve på kjønn og bøying. Elevmodulen Bruk ordboka mens du skriv kan brukast som frivillig lekse.",
  },
});
