/* Lærarinnhald for Del 5 · Lesing: lesemodulane frå Tarjei Vesaas til Olaug Nilssen,
   og samanlikninga til slutt. Formatet står i larer/README.md.
   Tekstane i modulane er skrivne for kurset i stilen til forfattarane. Sitata under
   er ordrette frå modulane, ikkje frå forfattarane sjølve. */

const KJELDE_T_VESAAS = "«Jenta og isen», skriven for kurset i stilen til Tarjei Vesaas";
const KJELDE_HM_VESAAS = "«Ein morgon», skriven for kurset i stilen til Halldis Moren Vesaas";
const KJELDE_FOSSE = "«Frå hytta», skriven for kurset i stilen til Jon Fosse";
const KJELDE_GRYTTEN = "«Bussen klokka kvart over fem», skriven for kurset i stilen til Frode Grytten";
const KJELDE_EIKEMO = "«Om å lese sakte», skriven for kurset i stilen til Marit Eikemo";
const KJELDE_NILSSEN = "«Klassebilete», skriven for kurset i stilen til Olaug Nilssen";

/* ------------------------------------------------------------------ */

Larar.register("lesing-t-vesaas", {
  tittelnotat: "Dette er ei leseøkt. Sei tydeleg frå starten at «Jenta og isen» er skriven for kurset i stilen til Tarjei Vesaas, ikkje av Vesaas sjølv. Målet er at elevane skal kjenne att stilen, og at nokre av dei får lyst til å lese den ekte Is-slottet på Nettbiblioteket.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein kort tekst i stilen til <strong>Tarjei Vesaas</strong></li>
        <li>sjå kva <strong>korte setningar</strong> gjer med stemninga</li>
        <li>tolke <strong>isen</strong> som meir enn is</li>
        <li>finne vegen til den ekte Vesaas</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at teksten er kort, men at vi skal lese han to gonger, og at den andre lesinga er den viktigaste.",
    },
    {
      type: "bilete",
      src: "bilete/t-vesaas.jpg",
      alt: "Portrett av Tarjei Vesaas",
      caption: "Tarjei Vesaas. Foto: Nasjonalbiblioteket (ingen kjende restriksjonar).",
      body: `<p class="stor"><strong>Tarjei Vesaas</strong> (1897–1970)</p>
        <ul>
          <li>frå Vinje i Telemark</li>
          <li>romanar og dikt</li>
          <li><em class="nn">Is-slottet</em> (1963) og <em class="nn">Fuglane</em> (1957)</li>
        </ul>`,
      notes: "Hald det kort. Vesaas voks opp på ein gard og budde mesteparten av livet i bygda si. Han var gift med lyrikaren Halldis Moren Vesaas, som er neste tekst i kurset. Is-slottet fekk Nordisk råds litteraturpris i 1964. Vil du vite meir, står det i modulen Møt nynorskforfattarane.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Teksten heiter <strong>«Jenta og isen»</strong>.</p>
        <p>Kva trur de han handlar om? Og kva kan <em>is</em> stå for, utanom frosen vatn?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv tre eller fire forslag på tavla og la dei stå. Etter lesinga går de tilbake og ser kva som stemde. Kjem ingen på noko om den andre delen av spørsmålet, spør: kva tyder det å gå på tynn is?",
    },
    {
      title: "Ord i teksten",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">det knaka</em></td><td>det lagar ein knirkande lyd</td></tr>
            <tr><td><em class="nn">lyttande</em></td><td>medan ho lyttar</td></tr>
            <tr><td><em class="nn">bredda</em></td><td>kanten av vatnet</td></tr>
            <tr><td><em class="nn">veslesyster</em></td><td>vesle syster, lillesøster</td></tr>
            <tr><td><em class="nn">ein augneblink</em></td><td>eit lite augeblikk</td></tr>
          </tbody>
        </table>`,
      notes: "Orda er enkle, og det er eit poeng i seg sjølv: Vesaas skriv med vanlege ord. Spør om nokon veit kva det tyder når is knakar. Elevar som har gått på is, kan fortelje om lyden. Det gjer lesinga meir konkret.",
    },
    {
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Kor <strong>korte</strong> avsnitta er, og kva det gjer med tempoet.</p>`,
        `<p class="stor">2. <strong>Isen</strong> som meir enn berre is.</p>`,
        `<p class="stor">3. Alt som <strong>ikkje</strong> blir forklart.</p>`,
      ],
      notes: "Dette er dei same tre punkta som står i elevmodulen. Lesestrategi: første gong les elevane utan å stoppe. Andre gong les dei sakte og skriv ned i skriveboka éi linje der dei kjenner at tempoet går ned, og éin ting som ikkje blir forklart.",
    },
    {
      type: "oppgave",
      title: "Les «Jenta og isen»",
      body: `<ol>
          <li>Lytt medan læraren les teksten høgt på tavla.</li>
          <li>Les han ein gong til, stille og sakte.</li>
          <li>Skriv i skriveboka: éi linje der tempoet går ned, og éin ting som ikkje blir forklart.</li>
        </ol>`,
      form: "Åleine",
      tid: 8,
      notes: "Teksten står på neste lysbilete og blir vist side for side. Les høgt første gong, og ta pausar der det er linjeskift. Pausane er ein del av teksten. Andre gong les elevane stille medan du blar i roleg tempo: spør om alle er ferdige før du blar vidare. Mange elevar les korte tekstar for fort, så gi dei tida. Ikkje start samtalen før dei fleste har lese to gonger.",
    },
    {
      type: "tekst",
      title: "«Jenta og isen»",
      text: `
        <p>Jenta gjekk åleine ut på isen.<br>
        Det var første gong i år.<br>
        Isen var ny og blank, og det knaka i han, slik ny is gjer.</p>

        <p>Ho stod stilt ei lang stund.<br>
        Stein i hand.<br>
        Slepp han.<br>
        Kanskje han ville sprekke gjennom, kanskje han ville gli og bli liggjande.<br>
        Steinen gleid og stoppa to meter framme.<br>
        Isen heldt.</p>

        <p>Då våga ho seg fram, eit steg om gongen, lyttande.<br>
        Innunder seg såg ho noko mørkt. Ein skugge. Kanskje ein fisk.<br>
        Eller ei grein som hang ned. Det skulle ikkje vere fisk her, tenkte ho. Vatnet er
        for grunt. Men kanskje.</p>

        <p>Lyset frå sola låg som ein veg over isen, like rett som om nokon hadde streka
        han opp med ein linjal.<br>
        Ho gjekk langs vegen.<br>
        Bortover.</p>

        <p>Det var stilt.<br>
        Ein måse skreik langt borte.<br>
        Snøen ved bredda var blå i skuggen, gul der sola tok.<br>
        Heile dalen heldt pusten.</p>

        <p>Då ho hadde gått så langt at huset hennar berre var ein liten prikk, snudde
        ho.<br>
        Det var som ho hadde vore på ei lang reise.<br>
        Nokon ville sjå etter henne snart, mor kanskje, eller veslesyster, og då måtte
        ho vere der.</p>

        <p>Men ho ville gjerne berre stå her ein augneblink til.<br>
        Berre kjenne at ho var åleine.<br>
        Berre ho og isen og dei mørke skuggane under.</p>

        <p>Ein dag, tenkte ho, skulle ho skrive om dette. Ho visste ikkje korleis, og
        ikkje når, men ho skulle hugse det. Den første gongen ho gjekk åleine på isen.
        Den blå snøen. Steinen som ikkje sprakk gjennom.</p>

        <p>Då snudde ho og gjekk heim, og fotspora hennar var dei einaste på isen den dagen.</p>`,
      kjelde: KJELDE_T_VESAAS,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Les høgt første gong, og la elevane lese stille andre gong medan du blar. Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 15 og treng å sjå i teksten.",
    },
    {
      type: "sitat",
      text: "Ho stod stilt ei lang stund.<br>Stein i hand.<br>Slepp han.",
      kjelde: KJELDE_T_VESAAS,
      notes: "Spør: er «Stein i hand» ei heil setning? Nei, det manglar verbal. Kva gjer det med lesinga? Det går seint, som om vi står der saman med henne. Følg opp: kvifor slepp ho steinen? Ho testar isen. Teksten seier det aldri, men lesaren skjønar det. Spørsmål 2 på lysbilete 15 handlar om dette, så ikkje gå for djupt i svaret her.",
    },
    {
      type: "sporsmal",
      question: "Kva gjer dei korte avsnitta, med berre éi setning per linje?",
      options: [
        "Dei gjer teksten raskare og meir spennande.",
        "Dei gjer at vi stoppar opp ved kvart bilete, så tempoet går ned.",
        "Dei viser at forfattaren hadde dårleg tid.",
        "Dei gjer teksten lettare for små born.",
      ],
      correct: 1,
      explain: "Kvar linje får stå åleine. Lesaren stoppar opp, akkurat slik jenta gjer ute på isen. Rytmen i teksten speglar det som skjer.",
      notes: "Mange vel det første alternativet, fordi korte setningar ofte gir fart i actionscener. Her er det motsett: det er stilt, og kvar linje er eit nytt bilete. Dette førebur spørsmål 3 på lysbilete 15, så la elevane formulere det med eigne ord.",
    },
    {
      type: "sitat",
      text: "Det var stilt.<br>Ein måse skreik langt borte.<br>Snøen ved bredda var blå i skuggen, gul der sola tok.<br>Heile dalen heldt pusten.",
      kjelde: KJELDE_T_VESAAS,
      notes: "Peik på den siste linja. Ein dal kan ikkje halde pusten: det er besjeling (personifikasjon). Spør: kvifor skriv ikkje forfattaren berre «det var heilt stille»? Fordi naturen då blir med i det som skjer, som om han ventar saman med jenta. Legg òg merke til fargane blå og gul: sanseinntrykk i staden for kjensleord.",
    },
    {
      type: "diskuter",
      title: "Isen som meir enn is",
      prompt: `<p>Isen er <em class="nn">ny og blank</em>, det <em class="nn">knakar</em> i han, men <em class="nn">isen heldt</em>.</p>
        <p class="stor">Kva kan isen stå for i livet til jenta?</p>`,
      form: "I grupper på tre",
      tid: 4,
      svar: "Det finst ikkje éin fasit. Isen kan stå for noko nytt og litt farleg som ho våger åleine, for å bli eldre og sjølvstendig, eller for det ukjende under overflata: dei mørke skuggane ho ikkje veit kva er.",
      notes: "Gå tilbake til forslaga frå førlesinga og sjå om nokon av dei passar. Krev at gruppene peikar på eit ord eller ei linje i teksten når dei kjem med ei tolking. Elevane pleier å oversjå at det er første gong ho gjer dette, og at ho er åleine: det er to viktige spor.",
    },
    {
      type: "sitat",
      text: "Ein dag, tenkte ho, skulle ho skrive om dette. Ho visste ikkje korleis, og ikkje når, men ho skulle hugse det.",
      kjelde: KJELDE_T_VESAAS,
      notes: "Her skjønar vi at turen betyr noko stort for henne, sjølv om ingenting dramatisk skjer. Les òg siste setninga i teksten høgt: «fotspora hennar var dei einaste på isen den dagen». Spør kva det biletet seier om henne. Mange svarar at ho er einsam. Utfordre: kan det òg bety at ho var den første, den som våga?",
    },
    {
      title: "Slik skriv Vesaas",
      body: `<table>
          <thead><tr><th>I teksten</th><th>Kva det gjer</th></tr></thead>
          <tbody>
            <tr><td>korte setningar, enkle ord</td><td>ro, stillheit, djupe tema i små ord</td></tr>
            <tr><td>naturen «held pusten»</td><td>naturen speglar kjenslene</td></tr>
            <tr><td>isen, skuggane, fotspora</td><td>symbol som lesaren tolkar</td></tr>
            <tr><td>lite blir forklart</td><td>lesaren må fylle inn</td></tr>
          </tbody>
        </table>`,
      notes: "Samandrag av stiltrekka. Be elevane skrive tabellen av i kortversjon, for dei treng han når dei skal lese ekte Vesaas og i samanlikningsmodulen til slutt. Stiltrekka er dei same som i Møt nynorskforfattarane: sparsam, poetisk og symbolsk.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Sjå tilbake i teksten før du svarar.</p>
        <ol>
          <li>Korleis verkar jenta gjennom teksten?</li>
          <li>Kvifor kastar jenta ein stein på isen?</li>
          <li>Kvifor trur du forfattaren brukar så korte avsnitt, somme tider berre éi setning per linje?</li>
          <li>Kva tyder setninga «Heile dalen heldt pusten» i denne samanhengen?</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      svar: "1. Full av undring og åleine, men ikkje skremd. 2. For å teste om isen er sterk nok. 3. Døme: lesaren stoppar opp ved kvart bilete, og den rolege rytmen passar med stemninga på isen. 4. Døme: det er heilt stilt, som om naturen ventar saman med jenta.",
      notes: "Gå rundt og les svara. Spørsmål 1 og 2 har eitt rett svar, 3 og 4 er tolking. Ver særleg merksam på spørsmålet om korte avsnitt: eit godt svar seier både kva avsnitta gjer med tempoet og korleis det passar med stemninga. Treng elevane teksten, gå tilbake til lysbilete 8. Minn elevane på at svara på 3 og 4 er døme, eitt av fleire moglege svar.",
    },
    {
      type: "oppgave",
      title: "Skriv som Vesaas",
      body: `<p>Skriv 120–200 ord om nokon som gjer noko dei er redde for.</p>
        <ol>
          <li>Ingen setning lengre enn ti ord.</li>
          <li>Bruk vanlege, enkle ord.</li>
          <li>La naturen spegle det personen kjenner.</li>
          <li>Ikkje forklar slutten.</li>
        </ol>`,
      form: "Åleine",
      tid: 8,
      notes: "Elevane byrjar på skriveoppgåva i skriveboka og gjer ho ferdig heime om dei ikkje rekk det. Tiordsgrensa er eit godt verktøy: be elevane telje orda i den lengste setninga si. Mange synest det er vanskeleg å la vere å forklare slutten. Spør: kva ville Vesaas ha kutta?",
    },
    {
      title: "Vidare: les ekte Vesaas",
      body: `<p class="stor"><em class="nn">Is-slottet</em> og <em class="nn">Fuglane</em> ligg gratis på Nettbiblioteket (nb.no).</p>
        <p>Lekse: les minst fem sider av <em class="nn">Is-slottet</em>.</p>`,
      notes: "Nettbiblioteket krev inga innlogging, men elevane må vere i Noreg. Dei kan lese på skjermen, men ikkje laste ned. Anbefal Is-slottet: han er kort, og opningskapitla høyrer til dei finaste i norsk litteratur. Oppgåva nedst i elevmodulen fører rett til boka og har skrivespørsmål til lesinga. Ho kan givast som frivillig lekse.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med den korte teksten «Jenta og isen», skriven for kurset i stilen til Tarjei Vesaas. Teksten er enkel å lese, men krev tolking: korte setningar, naturskildring som speglar kjensler, og symbol som ikkje blir forklarte. Presentasjonen følgjer førlesing, lesing og samtale. Heile teksten står på tavla, og elevane svarar på spørsmål og skriv i skriveboka. Til slutt får dei vegen til den ekte Vesaas på Nettbiblioteket som lekse.</p>",
    mal: [
      "Elevane kan forklare korleis korte setningar og avsnitt påverkar tempo og stemning.",
      "Elevane kan tolke isen og naturskildringa som symbol og grunngi tolkinga med døme frå teksten.",
      "Elevane kan kjenne att sentrale stiltrekk hos Tarjei Vesaas.",
      "Elevane kan bruke lesestrategiar som gjentatt og sakte lesing.",
    ],
    lareplan: [1, 2, 3, 5, 12],
    forkunnskapar: "Ingen særlege. Det er ein fordel om elevane har vore gjennom Møt nynorskforfattarane, men lysbilete 3 gir det dei treng å vite om Vesaas.",
    forebuing: [
      "Les «Jenta og isen» høgt for deg sjølv på førehand, så du finn rytmen og pausane.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand, så du veit kvar sidene skiftar.",
      "Sjekk at Nettbiblioteket opnar Is-slottet, så du kan vise vegen dit når du gir leksa.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om Vesaas, forventingar ut frå tittelen og ord i teksten.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 10, gjer: "<p>Gå gjennom kva elevane skal sjå etter. Les teksten høgt frå tavla, og la elevane lese han stille ein gong til medan du blar.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 12, gjer: "<p>Snakk om korte setningar og tempo, besjelinga av dalen, isen som symbol og slutten. Samle stiltrekka i tabellen.</p>", lysbilete: "9 til 14" },
      { fase: "Spørsmål til teksten", min: 7, gjer: "<p>Elevane svarar på dei fire spørsmåla i skriveboka. Vis svaret til slutt.</p>", lysbilete: "15" },
      { fase: "Skriving", min: 8, gjer: "<p>Elevane byrjar på skriveoppgåva med berre korte setningar i skriveboka.</p>", lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til den ekte Vesaas og gi Is-slottet på Nettbiblioteket som lekse.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Teksten er skriven av Tarjei Vesaas.»", hjelp: "Teksten er skriven for kurset i stilen til Vesaas. Det står under teksten på tavla, og det er difor elevane får ein ekte tekst som lekse." },
      { feil: "«Korte setningar er barnslege.»", hjelp: "Vis at dei korte setningane gir ro og stillheit, og at orda er enkle medan tema er djupe: frykt, einsemd og mot." },
      { feil: "«Det skjer jo ingenting.»", hjelp: "Spør kva som skjer inne i jenta. Ho gjer noko for første gong, åleine, og bestemmer seg for å hugse det. I tekstar som denne er det indre det viktigaste." },
      { feil: "«Ei tolking er berre det eg synest.»", hjelp: "Ei tolking må byggje på noko som står i teksten. Be eleven peike på ordet eller linja tolkinga kjem frå." },
    ],
    samtale: [
      "Kvifor trur du forfattaren ikkje fortel kva skuggen under isen er?",
      "Kva seier det om jenta at ho vil vere åleine ein augneblink til?",
      "Kva betyr det at fotspora hennar var dei einaste på isen?",
      "Kjenner du deg att i å gjere noko for første gong åleine?",
    ],
    tilpassing: {
      stotte: [
        "Les teksten høgt saman, og la eleven følgje med i teksten på tavla.",
        "Gi eleven dei tre punkta frå lysbilete 6 som ei lesehjelp på papir.",
        "La eleven svare munnleg på dei korte spørsmåla før han eller ho skriv.",
      ],
      utfordring: [
        "Be eleven finne alle stader der naturen speglar kjenslene til jenta, og skrive ein kort analyse.",
        "La eleven lese opningskapitla av Is-slottet og samanlikne med «Jenta og isen».",
      ],
    },
    vurdering: [
      "Dei korte svara viser om eleven kan forklare verkemiddel og ikkje berre attfortelje.",
      "Skriveoppgåva viser om eleven kan bruke stiltrekka sjølv: korte setningar, natur som spegel og open slutt.",
      "Kjenneteikn på god måloppnåing: eleven tolkar isen eller slutten, grunngir med sitat og forklarer kva verkemidla gjer med lesaren.",
    ],
    vidare: "Gå vidare til «Ein morgon» i stilen til Halldis Moren Vesaas, som var gift med Tarjei Vesaas. Til slutt samanliknar elevane alle tekstane i Samanlikn tekstane. Som frivillig lekse kan elevane lese Is-slottet på Nettbiblioteket og skrive om lesinga, slik oppgåva nedst i elevmodulen legg opp til. Elevmodulen har òg same tekst og spørsmål med dømesvar.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-hm-vesaas", {
  tittelnotat: "«Ein morgon» er skriven for kurset i stilen til Halldis Moren Vesaas, ikkje av henne. Teksten handlar om ein heilt vanleg morgon, og det er heile poenget: kva skjer når ein liten augneblink får all plassen? Sei gjerne at det er ein tekst som opnar seg når ein les han for andre gong.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein tekst i stilen til <strong>Halldis Moren Vesaas</strong></li>
        <li>sjå korleis <strong>lukter og lydar</strong> skaper stemning</li>
        <li>finne ut <strong>når</strong> forteljaren fortel frå</li>
        <li>tolke den siste setninga</li>
      </ul>`,
      notes: "Punktet om når forteljaren fortel frå, er det viktigaste tolkingsgrepet i timen. Ikkje avslør det no.",
    },
    {
      type: "bilete",
      src: "bilete/hm-vesaas.png",
      alt: "Portrett av Halldis Moren Vesaas",
      caption: "Halldis Moren Vesaas. Foto via Wikimedia Commons, User:Orland (fri bruk).",
      body: `<p class="stor"><strong>Halldis Moren Vesaas</strong> (1907–1995)</p>
        <ul>
          <li>frå Trysil</li>
          <li>lyrikar og gjendiktar</li>
          <li>kvinneliv, kjærleik, familie, krig og det daglege</li>
          <li><em class="nn">Tung tids tale</em> (1945)</li>
        </ul>`,
      notes: "Ho debuterte tidleg, med Harpe og dolk i 1929, og vart raskt ein av dei viktigaste lyrikarane i si tid. Ho var gift med Tarjei Vesaas, men forfattarskapen hennar var sjølvstendig. Tung tids tale er dikt skrivne under krigen. Forklar kva ein gjendiktar er: ein som omset dikt og gjer dei om til dikt på eit anna språk.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Tenk på ein heilt vanleg morgon heime.</p>
        <p>Kva høyrer du? Kva luktar det? Kven er vaken først?</p>`,
      form: "Tenk sjølv, så sidemannen",
      tid: 2,
      notes: "La elevane tenke i stillheit i eit halvt minutt først. Ingen treng å dele noko privat: det held å nemne ein lyd eller ei lukt. Samle nokre på tavla. Poenget er at sansane er det som gjer ein morgon til din morgon.",
    },
    {
      title: "Ord i teksten",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">vatnet syd</em></td><td>vatnet kokar</td></tr>
            <tr><td><em class="nn">kveldsskift</em></td><td>arbeid om kvelden</td></tr>
            <tr><td><em class="nn">attende</em></td><td>tilbake</td></tr>
            <tr><td><em class="nn">vert</em></td><td>blir</td></tr>
          </tbody>
        </table>`,
      notes: "<em>vert</em> og <em>blir</em> er begge rett på nynorsk. Teksten bruker <em>vert</em> i den siste setninga, noko som gir ein litt høgtidleg klang. Det er eit lite stilval elevane kan leggje merke til.",
    },
    {
      type: "bilete",
      src: "bilete/backer-blatt-interior.jpg",
      alt: "Måleri av ei kvinne som sit og syr i ei stille stove med blå møblar og ei potteplante ved vindauget",
      caption: "«Blått interiør» av Harriet Backer, 1883 (offentleg eigedom)",
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Kor <strong>små</strong> hendingane er, og kor mykje plass dei får.</p>`,
        `<p class="stor">2. <strong>Lukter og lydar</strong> i staden for forklaringar.</p>`,
        `<p class="stor">3. Den siste tanken om kva vi først skjønar <strong>i ettertid</strong>.</p>`,
      ],
      notes: "Punkta er frå elevmodulen. Lesestrategi: be elevane skrive alle sanseinntrykk i éi liste i skriveboka, og alt som blir sagt høgt i ei anna. Dei vil sjå at det er mykje meir av det første.",
    },
    {
      type: "oppgave",
      title: "Les «Ein morgon»",
      body: `<ol>
          <li>Lytt medan læraren les teksten høgt på tavla.</li>
          <li>Les han ein gong til, stille.</li>
          <li>Skriv tre overskrifter i skriveboka: <strong>lukter</strong>, <strong>lydar</strong> og <strong>lys</strong>. Skriv det du finn under kvar.</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      notes: "Teksten står på neste lysbilete og blir vist side for side. Les roleg. Teksten har ein lågmælt tone, og det bør høyrast. Andre gong les elevane stille medan du blar. Merk deg kven som blir ferdig fort: be dei lese dei to siste avsnitta ein gong til.",
    },
    {
      type: "tekst",
      title: "«Ein morgon»",
      text: `
        <p>Det er ikkje noko stort med ein morgon i april. Sola står opp, slik ho gjer
        kvar dag. Fuglane syng utanfor. Eg ligg under dyna og ser strålane finne vegen
        mellom gardinene og leggje ei lys stripe over golvet.</p>

        <p>Eg veit at i kjøkenet står far. Han kokar kaffe. Vatnet syd, han slår det
        over filteret, og ei lukt, brun og bitter og varm, legg seg over heile huset.
        Det er denne lukta som vekkjer meg, meir enn fuglane, meir enn lyset.</p>

        <p>Eg kjem ned i pysjamasen. Far snur seg ikkje. Han veit at eg er der.<br>
        «Brød på bordet», seier han.<br>
        «Mm.»</p>

        <p>Vi sit, og vi seier ikkje mykje. Det er ikkje fordi vi ikkje har noko å seie.
        Det er fordi det er morgon, og vi har heile dagen til å seie det. No skal vi
        berre vere her, han og eg, med kaffe og brød og lyset som flyttar seg over
        kjøkenbordet.</p>

        <p>Mor søv enno. Ho jobbar kveldsskift, kjem heim seint. Eg går stilt når eg
        skal opp att for å hente skuleboka. Eg lukkar døra utan ein lyd.</p>

        <p>Då eg går ut, vinkar far frå vindauget. Eg vinkar attende. Og det er ingenting
        spesielt med denne morgonen, og det er kanskje difor eg hugsar han. For det
        fanst ei tid då slike morgonar var alle eg hadde. Ein far i kjøkenet. Eit brød.
        Eit lys på golvet. Ei mor som sov.</p>

        <p>Slike ting er det ikkje noko stort med, før dei er borte. Då vert dei det
        største vi har att.</p>`,
      kjelde: KJELDE_HM_VESAAS,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Les høgt første gong, og la elevane lese stille andre gong medan du blar. Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 16.",
    },
    {
      type: "sitat",
      text: "Vatnet syd, han slår det over filteret, og ei lukt, brun og bitter og varm, legg seg over heile huset.",
      kjelde: KJELDE_HM_VESAAS,
      notes: "Spør: kan ei lukt vere brun? Ikkje eigentleg, men vi skjønar det straks. Forfattaren blandar sansane: farge, smak og kjensle om kvarandre. Legg òg merke til at lukta vekkjer forteljaren, meir enn fuglane og lyset. Kva seier det om kor viktig faren er?",
    },
    {
      type: "sporsmal",
      question: "«Vi sit, og vi seier ikkje mykje.» Kvifor?",
      options: [
        "Dei er uvener etter ein krangel.",
        "Dei er trøytte og sure.",
        "Dei treng ikkje ord: dei har heile dagen til å seie det.",
        "Far høyrer dårleg.",
      ],
      correct: 2,
      explain: "Teksten seier det sjølv: «Det er ikkje fordi vi ikkje har noko å seie. Det er fordi det er morgon, og vi har heile dagen til å seie det.» Stillheita er trygg, ikkje kjølig.",
      notes: "Elevar som les fort, vel ofte eit av dei første alternativa, fordi stillheit mellom menneske ofte tyder konflikt. Her er det motsett. Samanlikn med replikkane: «Brød på bordet» og «Mm.» Det er nok.",
    },
    {
      type: "sitat",
      text: "Mor søv enno. Ho jobbar kveldsskift, kjem heim seint. Eg går stilt når eg skal opp att for å hente skuleboka. Eg lukkar døra utan ein lyd.",
      kjelde: KJELDE_HM_VESAAS,
      notes: "Omsorg blir vist gjennom handling, ikkje sagt. Forteljaren skriv aldri at ho er glad i mor, men går stilt og lukkar døra utan ein lyd. Spør elevane om dei finn fleire stader der kjensler blir viste gjennom små handlingar, til dømes at far vinkar frå vindauget.",
    },
    {
      title: "Når fortel forteljaren frå?",
      body: `<p class="stor"><em class="nn">Eg ligg under dyna …</em> &nbsp;·&nbsp; <em class="nn">Då eg går ut …</em></p>`,
      steps: [
        `<p>Mesteparten står i <strong>presens</strong>: som om det skjer no.</p>`,
        `<p class="stor"><em class="nn">«For det fanst ei tid då slike morgonar var alle eg hadde.»</em></p>`,
        `<p><strong>fanst</strong> er preteritum: forteljaren ser <strong>tilbake</strong>. Den tida er over.</p>`,
      ],
      notes: "Dette er nøkkelen til teksten, og dei fleste elevane oversjår det på første lesing. Morgonen blir fortald som om han skjer no, men så skjønar vi at forteljaren hugsar. Spør: kor gammal kan forteljaren vere no? Kva kan ha endra seg? Ikkje gi svar, det kjem i neste samtale.",
    },
    {
      type: "sitat",
      text: "Slike ting er det ikkje noko stort med, før dei er borte. Då vert dei det største vi har att.",
      kjelde: KJELDE_HM_VESAAS,
      notes: "Legg merke til at teksten byrjar med nesten same ord: «Det er ikkje noko stort med ein morgon i april.» Slutten svarar på byrjinga. Det kallar vi ei ramme. Spør: har tydinga av «ikkje noko stort» endra seg frå byrjinga til slutten?",
    },
    {
      type: "diskuter",
      title: "Kva er borte?",
      prompt: `<p class="stor">Teksten seier aldri kva som har skjedd.</p>
        <p>Kva kan vere «borte»? Og kvifor trur de forfattaren ikkje fortel det?</p>`,
      form: "I grupper på tre",
      tid: 4,
      svar: "Teksten let det stå ope. Forteljaren kan ha flytta heimanfrå, barndommen kan vere over, familien kan ha endra seg, eller nokon kan vere død. Fordi det ikkje blir sagt, kan kvar lesar kjenne att sitt eige tap.",
      notes: "Nokre elevar vil seie at far er død. Det er ei mogleg lesing, men spør kva i teksten som støttar det. Det viktige er at elevane ser at det opne er eit val. Ver merksam på at temaet tap kan røre ved elevar som har mist nokon. Hald samtalen på teksten.",
    },
    {
      title: "Kvifor kallar vi han lyrisk?",
      steps: [
        `<p class="stor"><strong>Sansar</strong> i staden for forklaringar</p>`,
        `<p class="stor"><strong>Rytme</strong>: <em class="nn">Ein far i kjøkenet. Eit brød. Eit lys på golvet. Ei mor som sov.</em></p>`,
        `<p class="stor"><strong>Ramme</strong>: slutten svarar på byrjinga</p>`,
        `<p class="stor">Ein <strong>augneblink</strong> får all plassen</p>`,
      ],
      notes: "Teksten er prosa, men han har mykje felles med lyrikk. Les oppramsinga høgt: fire korte bilete, nesten som ei strofe. I samanlikningsmodulen står sjangeren som «lyrisk kvardagsskildring». Knyt det til at Halldis Moren Vesaas først og fremst var lyrikar.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Sjå tilbake i teksten før du svarar.</p>
        <ol>
          <li>Kva tid på året er det i teksten?</li>
          <li>Korleis verkar forholdet mellom forteljaren og faren?</li>
          <li>Kva meiner forteljaren med setninga «Slike ting er det ikkje noko stort med, før dei er borte»?</li>
        </ol>`,
      form: "Åleine",
      tid: 5,
      svar: "1. April. 2. Stilt, varmt og innforstått. 3. Døme: vi ser sjeldan kor verdfulle dei små kvardagsaugneblinkane er medan vi har dei. Først når dei tek slutt, skjønar vi kor mykje dei betydde.",
      notes: "Dei to første spørsmåla går fort. Bruk tida på det tredje: eit godt svar tolkar setninga og ikkje berre gjentek henne. Treng elevane teksten, gå tilbake til lysbilete 8.",
    },
    {
      type: "oppgave",
      title: "Skriv: ein heilt vanleg augneblink",
      body: `<p>Skriv 120–200 ord om ein heilt vanleg augneblink heime, så nøye at lesaren skjønar at han betyr noko.</p>
        <ol>
          <li>Vel éin augneblink, ikkje ein heil dag.</li>
          <li>Ta med minst éin lukt og éin lyd.</li>
          <li>Du får ikkje skrive <em>at</em> augneblinken betyr noko.</li>
          <li>Avslutt med ei setning som opnar i staden for å lukke.</li>
        </ol>`,
      form: "Åleine",
      tid: 9,
      notes: "Skriveoppgåva er krevjande fordi elevane ikkje får forklare. Tips: vel ein augneblink som varer under eit minutt. Les gjerne opp eit par gode setningar undervegs, med løyve frå eleven. Det dei ikkje rekk, kan vere lekse.",
    },
    {
      title: "Vidare: les ekte dikt",
      body: `<p class="stor"><em class="nn">Tung tids tale</em> (1945) ligg på Nettbiblioteket.</p>
        <p class="stor"><em class="nn">«Det heiter ikkje: eg no lenger. Heretter heiter det: vi.»</em></p>`,
      notes: "Linja er gjengitt slik ho står i Nettbiblioteket-oppgåva i elevmodulen. Dikta er skrivne under krigen. Spør: kvifor kan det vere viktig å seie «vi» i staden for «eg» i ei tung tid? Oppgåva i elevmodulen ber elevane lese titteldiktet og to andre dikt og samanlikne tonen med «Ein morgon». Ho passar som frivillig lekse. Olaug Nilssen har lånt tittelen til romanen sin frå dette diktet, og det kjem elevane til å møte seinare.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med «Ein morgon», ein kort, lyrisk kvardagstekst skriven for kurset i stilen til Halldis Moren Vesaas. Det skjer nesten ingenting, og nettopp difor må elevane lese nøye: sansane, dei små handlingane og skiftet frå presens til eit tilbakeblikk gjer teksten til ein tekst om tap og takksemd. Heile teksten står på tavla, og elevane svarar på spørsmåla og skriv i skriveboka. Diktsamlinga Tung tids tale på Nettbiblioteket kan vere lekse.</p>",
    mal: [
      "Elevane kan forklare korleis sanseinntrykk og små handlingar skaper stemning og viser kjensler.",
      "Elevane kan sjå at forteljaren ser tilbake, og forklare kva det gjer med tydinga av teksten.",
      "Elevane kan tolke den siste setninga og grunngi tolkinga med døme frå teksten.",
      "Elevane kan kjenne att trekk ved lyrisk prosa: rytme, ramme og biletbruk.",
    ],
    lareplan: [1, 2, 3, 5, 6],
    forkunnskapar: "Elevane bør kjenne omgrepa presens og preteritum. Modulen passar godt etter «Jenta og isen», sidan dei to forfattarane var gifte.",
    forebuing: [
      "Les teksten høgt for deg sjølv og finn stadene der tempus skifter.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand, så du veit kvar sidene skiftar.",
      "Sjekk at Tung tids tale opnar på Nettbiblioteket, så du kan vise vegen dit når du gir leksa.",
      "Tenk gjennom om nokon i klassen har opplevd tap nyleg, og hald samtalen om kva som er «borte» nær teksten.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om forfattaren, samtale om sansar på ein vanleg morgon og ord i teksten.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 9, gjer: "<p>Gå gjennom kva elevane skal sjå etter. Les høgt frå tavla, og la elevane lese stille ein gong til og skrive ned lukter, lydar og lys.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 14, gjer: "<p>Lukt og sansar, stillheita mellom far og barn, omsorg i handling, tempusskiftet, ramma og kva som er borte. Samle trekka ved lyrisk prosa.</p>", lysbilete: "9 til 15" },
      { fase: "Spørsmål til teksten", min: 5, gjer: "<p>Elevane svarar på dei tre spørsmåla i skriveboka. Vis svaret til slutt.</p>", lysbilete: "16" },
      { fase: "Skriving", min: 9, gjer: "<p>Elevane skriv om ein vanleg augneblink i skriveboka.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til Tung tids tale og snakk kort om linja om «eg» og «vi».</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Dei seier så lite, så dei er nok uvener.»", hjelp: "Vis setninga «Det er ikkje fordi vi ikkje har noko å seie.» Stillheita er trygg. Spør korleis far viser at han veit at barnet er der." },
      { feil: "«Alt skjer no.»", hjelp: "Peik på «For det fanst ei tid då slike morgonar var alle eg hadde». Preteritum viser at forteljaren ser tilbake på noko som er over." },
      { feil: "«Det står ikkje kva som er borte, så det går ikkje an å tolke.»", hjelp: "Nettopp det opne er eit verkemiddel. Ei god tolking seier kva som kan vere borte, og peikar på kva i teksten som gjer det mogleg." },
      { feil: "«Dette er eit dikt.»", hjelp: "Teksten er prosa, men lyrisk: han har rytme, bilete og ramme som eit dikt. Samanlikn med dei ekte dikta i Tung tids tale." },
    ],
    samtale: [
      "Kvifor er det lukta og ikkje fuglane som vekkjer forteljaren?",
      "Kva seier det om familien at forteljaren går stilt forbi mor?",
      "Korleis endrar det lesinga at vi til slutt skjønar at forteljaren ser tilbake?",
      "Er du samd i at vanlege ting først blir store når dei er borte?",
    ],
    tilpassing: {
      stotte: [
        "La eleven lage ei liste med tre kolonnar: lukter, lydar og lys, og fylle ut under lesinga.",
        "Gi eleven startsetningar til det korte svaret: «Forteljaren meiner at …» og «Det ser vi når …».",
        "La eleven skrive skriveoppgåva i presens med berre fem til åtte setningar.",
      ],
      utfordring: [
        "Be eleven skrive om teksten slik at han står heilt i preteritum, og forklare kva som går tapt.",
        "La eleven lese titteldiktet i Tung tids tale og skrive om korleis tonen skil seg frå «Ein morgon».",
      ],
    },
    vurdering: [
      "Det korte svaret om den siste setninga viser om eleven kan tolke og ikkje berre gjenta.",
      "Skriveoppgåva viser om eleven kan skape stemning med sansar utan å forklare.",
      "Kjenneteikn på god måloppnåing: eleven ser tilbakeblikket, knyter slutten til byrjinga og bruker sitat i tolkinga.",
    ],
    vidare: "Gå vidare til «Frå hytta» i stilen til Jon Fosse, som er ein heilt annan måte å skrive stille på. Nettbiblioteket-oppgåva om Tung tids tale i elevmodulen passar godt som frivillig lekse, og knyter an til Olaug Nilssen seinare i kurset. Elevmodulen har òg same tekst og spørsmål med dømesvar.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-fosse", {
  tittelnotat: "«Frå hytta» er skriven for kurset i stilen til Jon Fosse, ikkje av Fosse. Teksten er lengre og meir krevjande enn dei førre: lange setningar, mykje gjentaking og nesten inga handling. Førebu elevane på at det er meint slik, og at nokre kjem til å synest han er keisam første gong. Det er ein god stad å starte samtalen.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein tankestraum i stilen til <strong>Jon Fosse</strong></li>
        <li>sjå kva <strong>gjentaking</strong> gjer med stemninga</li>
        <li>snakke om ei <strong>indre reise</strong></li>
        <li>finne vegen til den ekte Fosse</li>
      </ul>`,
      notes: "Sei at teksten kan kjennast lang, og at det er ein del av opplevinga. Be elevane leggje merke til når dei blir utolmodige, og kvifor.",
    },
    {
      type: "bilete",
      src: "bilete/fosse.jpg",
      alt: "Portrett av Jon Fosse",
      caption: "Jon Fosse. Foto: Tom A. Kolstad / Det Norske Samlaget (CC BY-SA 4.0).",
      body: `<p class="stor"><strong>Jon Fosse</strong>, fødd 1959</p>
        <ul>
          <li>frå Haugesund</li>
          <li>dramatikar, romanforfattar og lyrikar</li>
          <li><strong>Nobelprisen i litteratur 2023</strong></li>
          <li>omsett til over 50 språk</li>
        </ul>`,
      notes: "Fosse er den fjerde norske nobelvinnaren i litteratur, etter Bjørnson, Hamsun og Undset. Han skriv på nynorsk. Det kan vere verdt å stoppe opp ved: ein nynorskforfattar er i dag blant dei mest spelte dramatikarane i verda. Morgon og kveld (2000) er ein god inngang, og ho ligg på Nettbiblioteket.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Har du nokon gong berre sete og sett ut av eit vindauge lenge?</p>
        <p>Kva tenkte du på? Kvar gjekk tankane?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Målet er å få elevane til å kjenne att korleis tankane hoppar når ein sit stille: frå det ein ser, til eit minne, til noko heilt anna. Det er det ein tankestraum prøver å fange.",
    },
    {
      title: "To omgrep",
      body: `<div class="to-kol">
          <div class="boks"><h3>Tankestraum</h3><p>Teksten følgjer tankane slik dei kjem, utan å rydde dei.</p></div>
          <div class="boks"><h3>Gjentaking</h3><p>Det same ordet eller den same setninga kjem att, med vilje.</p></div>
        </div>`,
      steps: [`<p class="midt">Ord: <em class="nn">frigjerande</em> (gjer deg fri), <em class="nn">snøfonn</em> (haug av snø)</p>`],
      notes: "Gjentaking i ein skuletekst blir ofte retta som ein feil. Her er det eit verkemiddel. Poenget er at forfattaren vel det medvite. Det er òg eit tips til skriveoppgåva: gjentakinga skal vere valt med omhug.",
    },
    {
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Kva ord og setningar som <strong>kjem att</strong>, og kor ofte.</p>`,
        `<p class="stor">2. Kor <strong>lite</strong> som faktisk skjer.</p>`,
        `<p class="stor">3. Å reise langt, eller å kome ein annan stad <strong>i hovudet</strong>.</p>`,
      ],
      notes: "Gi kvar elev eit oppdrag: tel kor mange gonger «snøen fell» står i teksten. Svaret er seks gonger, to av dei som eigne avsnitt. Då les dei merksamt, og gjentakinga blir synleg.",
    },
    {
      type: "oppgave",
      title: "Les «Frå hytta»",
      body: `<ol>
          <li>Lytt medan læraren les første avsnitt høgt.</li>
          <li>Les resten stille på tavla.</li>
          <li>Tel: kor mange gonger står <em class="nn">snøen fell</em>? Skriv talet i skriveboka.</li>
        </ol>`,
      form: "Åleine",
      tid: 10,
      notes: "Teksten står på neste lysbilete og blir vist side for side. Les første avsnitt høgt utan å ta pause ved komma, nesten i eitt andedrag. Då høyrer elevane rytmen. Teksten er lang, så la dei lese resten stille medan du blar i roleg tempo. Spør om alle er ferdige før du blar vidare. Elevar som strevar, kan lese avsnitta med bestefar og slutten nøye og skumlese resten.",
    },
    {
      type: "tekst",
      title: "«Frå hytta»",
      text: `
        <p>Eg sit ved vindauget i hytta og ser ut og snøen fell og det er stilt og eg
        har sett ut sidan klokka åtte, ja eg har sett ut og snøen har falle og det har
        vore stilt heile tida. Det er ingen som veit kvar eg er. Det er ingen som har
        spurt heller. Eg drog hit i går kveld. Eg drog hit fordi eg måtte. Eg veit
        ikkje kvifor eg måtte, men eg måtte, og no er eg her, og snøen fell.</p>

        <p>Det er ei gammal hytte. Ho høyrer til mor og far, men dei brukar henne
        ikkje lenger, dei vart for gamle, og det er ikkje veg heilt fram, du må gå dei
        siste tre hundre meter, og det er for mykje for far no. Så hytta står. Eg har
        nøkkelen i ein skuff heime. Eg tok han med meg. Eg sa ikkje til nokon at eg
        tok han.</p>

        <p>Snøen fell. Det er noko med snø som fell. Det er at han fell, ja, det er
        det. Han fell og han fell, og under han ligg det meir snø, og under det meir,
        og slik er snø, han kjem på toppen av seg sjølv og blir djupare. Eg såg ein
        gong i ein dokumentar at ein nede i Antarktis kunne grave gjennom snø som var
        ti tusen år gamal. Ti tusen år. Eg veit ikkje kvifor eg tenkjer på det no, men
        det er det eg tenkjer på.</p>

        <p>Klokka er kanskje to. Eg har ikkje sett på klokka. Eg ser ikkje på klokka.
        Det er noko frigjerande ved å ikkje sjå på klokka. Klokka går likevel, men ho
        går ikkje for meg no.</p>

        <p>Eg har det ikkje verre. Det er ikkje difor eg drog hit. Eg har det ikkje
        betre heller. Det er ikkje difor. Det er noko anna. Det er at eg ville sjå.
        Sjå noko. Sjå snøen falle, kanskje. Sjå at noko fell, og fell, og fell, og at
        det er greitt at det fell.</p>

        <p>Mor ringjer kanskje. Eg veit ikkje. Telefonen er i jakka i gangen, og eg
        har ikkje vore i gangen sidan i går kveld. Kanskje ho har ringt mange gonger.
        Kanskje ho ikkje har ringt i det heile. Det er noko spesielt med å ikkje vite,
        å berre la noko vere.</p>

        <p>Eg tenkjer på bestefar. Eg veit ikkje kvifor. Han har vore død i seks år.
        Men eg tenkjer på han no. Han brukte å sitje ved dette vindauget, han òg. Han
        sat med ein kopp kaffe. Han sa ikkje mykje. Han sat berre. Eg trudde då at
        han var keisam. Eg trudde han ikkje hadde noko å seie. No skjønar eg at han
        kanskje hadde alt å seie, og at han berre såg ut av vindauget, og at det å sjå
        ut av vindauget var hans måte å seie det på.</p>

        <p>Snøen fell.</p>

        <p>Det er rart med snø. Han er kald, men når du står lenge nok i han, blir det
        varmt på ein måte. Det er ikkje varmt på huda. Det er noko anna. Eg hugsar då
        eg var seks år og fall i ei snøfonn, og eg vart liggjande, og mor måtte hente
        meg, og då eg kom inn att, var det som om eg hadde vore på ei lang reise.</p>

        <p>Det er det same no. Eg har vore på ei lang reise sidan i går kveld. Eg sit
        her og eg har ikkje gått nokon stad, men eg har vore lenger vekk enn nokon
        kan vite.</p>

        <p>Klokka er kanskje tre.</p>

        <p>Eg trur eg blir her natta over. Det er nok ved. Det er pasta i skapet. Mor
        og far rydda ikkje skikkeleg etter siste gong dei var her.</p>

        <p>Snøen fell.</p>

        <p>I morgon skal eg gå ned att. Eg skal seie til mor at eg var hjå Sander. Ho
        kjem ikkje til å tru meg. Men ho kjem ikkje til å spørje meir heller. Vi har
        den slags forhold no.</p>

        <p>Snøen fell, og det er stilt, og eg veit ikkje kva eg gjer her, men det er
        kanskje det eg gjer. Som ikkje veit. Som sit.</p>`,
      kjelde: KJELDE_FOSSE,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Les første avsnitt høgt, og bla så i roleg tempo medan elevane les stille og tel «snøen fell». Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 16.",
    },
    {
      type: "sitat",
      text: "Eg sit ved vindauget i hytta og ser ut og snøen fell og det er stilt og eg har sett ut sidan klokka åtte, ja eg har sett ut og snøen har falle og det har vore stilt heile tida.",
      kjelde: KJELDE_FOSSE,
      notes: "Tel kor mange gonger «og» står i setninga. Når forfattaren bind alt saman med og, får ingenting meir vekt enn noko anna. Det blir ein jamn straum, som snøen. Spør: korleis ville setninga vore om ho var delt opp i fem korte? Samanlikn gjerne med Vesaas-teksten dei har lese.",
    },
    {
      type: "sporsmal",
      question: "«Snøen fell» står seks gonger i teksten. Kva gjer gjentakinga?",
      options: [
        "Ho viser at forfattaren ikkje fann på noko anna.",
        "Ho gir ein langsam rytme, så lesaren òg må sitje lenge.",
        "Ho fortel at det kjem ein storm.",
        "Ho gjer teksten meir spennande.",
      ],
      correct: 1,
      explain: "Gjentakinga gir ein roleg, nesten meditativ rytme som passar med det forteljaren gjer: sit og ser ut. Lesaren blir tvinga til å sitje der saman med han.",
      notes: "Fekk elevane seks på teljinga? Mange får tre eller fire fordi dei berre legg merke til dei korte avsnitta. Følg opp: er «Snøen fell» det same kvar gong? Mot slutten kjem det saman med «eg veit ikkje kva eg gjer her». Tydinga glir litt.",
    },
    {
      title: "Det skjer nesten ingenting",
      body: `<div class="to-kol">
          <div class="boks"><h3>På overflata</h3><p>Ein ungdom sit i ei hytte. Det snør. Klokka går.</p></div>
          <div class="boks"><h3>Under</h3><p>Rømming, uro, eit forhold til mor, ein død bestefar, tid og minne.</p></div>
        </div>`,
      notes: "Dette er typisk for Fosse slik han er skildra i kurset: det skjer lite på overflata, men under ligg det djupe spørsmål. Be elevane finne eitt ord eller éi setning som peikar mot det som ligg under. Døme: «Vi har den slags forhold no».",
    },
    {
      type: "sitat",
      text: "Eg trudde då at han var keisam. Eg trudde han ikkje hadde noko å seie. No skjønar eg at han kanskje hadde alt å seie, og at han berre såg ut av vindauget, og at det å sjå ut av vindauget var hans måte å seie det på.",
      kjelde: KJELDE_FOSSE,
      notes: "Forteljaren sit ved det same vindauget som bestefar. Spør: kva har forteljaren skjønt no som han ikkje skjønte før? Og: gjer forteljaren det same som bestefar no? Mange oppdagar her at teksten speglar seg sjølv: forteljaren blir den stille mannen ved vindauget.",
    },
    {
      type: "sitat",
      text: "Eg sit her og eg har ikkje gått nokon stad, men eg har vore lenger vekk enn nokon kan vite.",
      kjelde: KJELDE_FOSSE,
      notes: "Dette er setninga spørsmål 4 på lysbilete 16 handlar om. La elevane forklare med eigne ord kva ei indre reise er. Knyt det gjerne til minnet om snøfonna: «då eg kom inn att, var det som om eg hadde vore på ei lang reise». Same bilete, same tyding.",
    },
    {
      type: "diskuter",
      title: "Kvifor drog han?",
      prompt: `<p><em class="nn">«Eg har det ikkje verre. […] Eg har det ikkje betre heller.»</em></p>
        <p class="stor">Kvifor trur de han drog til hytta?</p>`,
      form: "I grupper på tre",
      tid: 5,
      svar: "Teksten gir inga klar forklaring. Han seier at han ville «sjå noko». Det kan handle om å trenge ro, om noko uavklart med mor, om sorg etter bestefar, eller om å prøve å forstå seg sjølv. Det opne er eit verkemiddel.",
      notes: "Be gruppene finne minst to spor i teksten. Mange peikar på mor: han tek nøkkelen utan å seie det, telefonen ligg i gangen, og han skal lyge om at han var hjå Sander. Spør: er det bekymringsfullt at han rømmer, eller er det sunt å trekkje seg unna? Det er ein god samtale om korleis teksten framstiller livet til unge.",
    },
    {
      type: "bilete",
      src: "bilete/hytte-sno.jpg",
      alt: "Ei gammal tømmerhytte med snø på taket i eit kvitt fjellandskap",
      caption: "Hytte på Rekdalsetra. Foto: Mænsard vokser (CC BY-SA 4.0)",
      title: "Ein ungdom i hytta",
      steps: [
        `<p class="stor">Han tek nøkkelen utan å seie det til nokon.</p>`,
        `<p class="stor">Telefonen ligg i jakka i gangen.</p>`,
        `<p class="stor"><em class="nn">«Ho kjem ikkje til å tru meg. Men ho kjem ikkje til å spørje meir heller.»</em></p>`,
      ],
      notes: "Elevane oversjår ofte at forteljaren er ung: han bur heime, hytta er foreldra sine, han må forklare seg for mor. Spør: kva seier «Vi har den slags forhold no» om han og mor? Kjenner elevane att behovet for å vere i fred ei stund? Hald samtalen på teksten om det blir personleg.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Bruk teljinga di i svaret om gjentaking.</p>
        <ol>
          <li>Korleis kom forteljaren til hytta?</li>
          <li>Kva tenkjer forteljaren om bestefar?</li>
          <li>Korleis brukar forfattaren gjentaking til å skape stemning?</li>
          <li>Korleis tolkar du linja «eg har vore lenger vekk enn nokon kan vite»?</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      svar: "1. Han drog dit åleine, utan å seie det til nokon. 2. Han forstår no at bestefar kanskje hadde mykje å seie, men sa det ved å sitje stille og sjå ut. 3. Døme: «snøen fell» kjem att seks gonger og gir ein langsam rytme, så lesaren òg sit lenge. 4. Døme: han har vore på ei indre reise. Det viktigaste skjer i hovudet, ikkje på kartet.",
      notes: "I svaret om gjentaking er det bra om eleven både nemner kva som blir gjenteke og kva det gjer med stemninga. Treng elevane teksten, gå tilbake til lysbilete 8.",
    },
    {
      type: "oppgave",
      title: "Skriv: ein tankestraum",
      body: `<p>Skriv 150–250 ord frå ein person som sit stille ein stad. Byrj no, skriv ferdig heime.</p>
        <ol>
          <li>Vel éi setning som kjem att minst fire gonger.</li>
          <li>La personen sitje stille. Handlinga skjer inne i hovudet.</li>
          <li>Bruk lange setningar bundne saman med <em>og</em>, og lite punktum.</li>
          <li>Ingen forklaring til lesaren.</li>
        </ol>`,
      form: "Åleine",
      tid: 3,
      notes: "Elevane rekk berre å byrje i timen, så resten er lekse. Be dei velje gjentakinga først og skrive henne øvst i skriveboka. Minn om at tankestraumen skal ha lange setningar og lite punktum.",
    },
    {
      title: "Vidare: les ekte Fosse",
      body: `<p class="stor"><em class="nn">Morgon og kveld</em> (2000) ligg på Nettbiblioteket.</p>
        <p>Kort bok. Opninga handlar om ein fødsel. Les minst ti sider.</p>`,
      notes: "Førebu elevane på at den ekte Fosse går endå lenger enn kurstekstane: lange setningar utan vanlege punktum. Nettbiblioteket-oppgåva i elevmodulen ber elevane telje ei gjentaking der òg. Ho passar som frivillig lekse.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med «Frå hytta», ein tankestraum skriven for kurset i stilen til Jon Fosse. Ein ungdom har dratt åleine til hytta til foreldra og sit og ser snøen falle. Det skjer nesten ingenting, men teksten handlar om tid, minne, ein død bestefar og eit forhold til mor. Økta legg vekt på gjentaking og lange setningar som verkemiddel, og på korleis ei indre reise kan vere lengre enn ei ytre.</p>",
    mal: [
      "Elevane kan forklare korleis gjentaking og lange setningar skaper rytme og stemning.",
      "Elevane kan skilje mellom det som skjer på overflata og det som ligg under i ein tekst.",
      "Elevane kan tolke ideen om ei indre reise og grunngi tolkinga med sitat.",
      "Elevane kan reflektere over korleis teksten framstiller ein ungdom som trekkjer seg unna.",
    ],
    lareplan: [1, 2, 3, 5, 12],
    forkunnskapar: "Elevane bør ha lese minst éin av dei kortare tekstane i Del 5, gjerne «Jenta og isen», slik at dei kan samanlikne setningslengd og tempo.",
    forebuing: [
      "Øv på å lese første avsnitt høgt utan pausar, så elevane høyrer rytmen.",
      "Tel sjølv kor mange gonger «snøen fell» står i teksten, så du kan kontrollere elevane: seks gonger, to som eigne avsnitt.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand. Teksten er lang og går over fleire sider.",
      "Sjekk at Morgon og kveld opnar på Nettbiblioteket, så du kan vise vegen dit når du gir leksa.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om Fosse, samtale om å sitje stille og omgrepa tankestraum og gjentaking.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 11, gjer: "<p>Gi teljeoppdraget. Les første avsnitt høgt frå tavla, og bla vidare medan elevane les resten stille.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 16, gjer: "<p>Lange setningar og gjentaking, overflate og djup, bestefar, den indre reisa, kvifor han drog og ungdommen i teksten.</p>", lysbilete: "9 til 15" },
      { fase: "Spørsmål og skriving", min: 10, gjer: "<p>Elevane svarar på dei fire spørsmåla i skriveboka, og byrjar på tankestraumen. Resten av skriveoppgåva er lekse.</p>", lysbilete: "16 og 17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til Morgon og kveld på Nettbiblioteket.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Gjentaking er dårleg språk.»", hjelp: "I ein fagtekst kan gjentaking vere slurv, men her er ho vald med vilje. Spør kva teksten ville mista om vi strauk alle «snøen fell» utanom den første." },
      { feil: "«Teksten er keisam fordi ingenting skjer.»", hjelp: "Keisemda er ein del av opplevinga: lesaren skal sitje lenge, slik forteljaren gjer. Be eleven finne det som skjer inne i forteljaren." },
      { feil: "«Han har det vondt, det er difor han drog.»", hjelp: "Teksten seier sjølv «Eg har det ikkje verre». Ei god tolking tek omsyn til at forteljaren avviser dei enklaste forklaringane." },
      { feil: "«Ein tankestraum har ingen struktur.»", hjelp: "Vis korleis «snøen fell» og klokkesletta deler teksten opp, og korleis bestefar og barndomsminnet speglar kvarandre." },
    ],
    samtale: [
      "Kva ville skje med stemninga om teksten var skriven i korte setningar?",
      "Kvifor tenkjer forteljaren på snø som er ti tusen år gammal?",
      "Kva har forteljaren og bestefar felles?",
      "Er det å dra åleine til hytta ei flukt eller ei leiting?",
    ],
    tilpassing: {
      stotte: [
        "La eleven lese dei tre avsnitta om bestefar, «Snøen fell» og slutten nøye, og skumlese resten.",
        "Lytt til teksten saman, og la eleven setje strek kvar gong «snøen fell» blir lese.",
        "Gi eleven eitt av dei korte spørsmåla å svare munnleg på først.",
      ],
      utfordring: [
        "Be eleven skrive om eitt avsnitt til korte setningar og forklare kva som endrar seg.",
        "La eleven lese byrjinga av Morgon og kveld og samanlikne bruken av punktum med «Frå hytta».",
      ],
    },
    vurdering: [
      "Svaret om gjentaking viser om eleven kan forklare eit verkemiddel og verknaden av det.",
      "Tankestraumen i skriveoppgåva viser om eleven kan bruke gjentaking medvite.",
      "Kjenneteikn på god måloppnåing: eleven skil overflate frå djup, tolkar den indre reisa og bruker konkrete døme frå teksten.",
    ],
    vidare: "Gå vidare til «Bussen klokka kvart over fem» i stilen til Frode Grytten. Fosse og Grytten er eit godt par i samanlikningsmodulen: lange, bundne setningar mot korte og klipte. Som frivillig lekse kan elevane lese Morgon og kveld på Nettbiblioteket, slik oppgåva nedst i elevmodulen legg opp til.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-grytten", {
  tittelnotat: "«Bussen klokka kvart over fem» er skriven for kurset i stilen til Frode Grytten, ikkje av Grytten. Det mest særmerkte er alt som ikkje blir sagt: vi får aldri vite kva som har skjedd. Sei til elevane at dei skal lese som detektivar: leite etter spor.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein kvardagstekst i stilen til <strong>Frode Grytten</strong></li>
        <li>leite etter det <strong>underforståtte</strong></li>
        <li>sjå korleis <strong>staden</strong> speglar stemninga</li>
        <li>finne vegen til den ekte Grytten</li>
      </ul>`,
      notes: "Det underforståtte er hovudpoenget i timen. Skriv ordet på tavla og la det stå.",
    },
    {
      type: "bilete",
      src: "bilete/grytten.jpg",
      alt: "Portrett av Frode Grytten",
      caption: "Frode Grytten. Foto: Jarvin (CC BY 3.0).",
      body: `<p class="stor"><strong>Frode Grytten</strong>, fødd 1960</p>
        <ul>
          <li>frå Odda i Hardanger</li>
          <li>forfattar og journalist</li>
          <li>små augneblink: ein bussreise, eit møte, ein middag</li>
          <li><em class="nn">Bikubesong</em> (1999)</li>
        </ul>`,
      notes: "Grytten voks opp i industribygda Odda, og industriarbeidarane og bygdesamfunnet pregar mykje av forfattarskapen. Bikubesong er bygd opp som mange korte forteljingar om naboar i ei blokk i Odda, og fekk Brageprisen. Han skriv òg kommentarar i avisene.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Korleis kan du sjå på nokon at noko er gale, utan at dei seier det?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Samle svar på tavla: ser ned, svarar kort, sit åleine, tek ikkje telefonen. Når elevane les, vil dei finne fleire av desse teikna hos Lina. Då har dei sjølve laga lesenøkkelen.",
    },
    {
      title: "Ord og omgrep",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">avvise ein samtale</em></td><td>trykkje nei når telefonen ringjer</td></tr>
            <tr><td><em class="nn">grine</em></td><td>gråte</td></tr>
            <tr><td><em class="nn">innandørs</em></td><td>inne</td></tr>
            <tr><td><strong>underforstått</strong></td><td>noko lesaren skjønar utan at det står</td></tr>
          </tbody>
        </table>`,
      notes: "Underforstått er omgrepet elevane skal bruke i svara sine. Du kan nemne at det er som eit isfjell: det meste ligg under vatnet. Spør om dei kjenner att dette frå filmar eller seriar, der det viktigaste ofte ligg i det personane ikkje seier.",
    },
    {
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Alt teksten <strong>ikkje</strong> fortel om kva som har skjedd.</p>`,
        `<p class="stor">2. Kor mykje som ligg i at ho avviser mora <strong>to gonger</strong>.</p>`,
        `<p class="stor">3. Den korte, <strong>klipte</strong> rytmen.</p>`,
      ],
      notes: "Lesestrategi: be elevane lage to lister i skriveboka medan dei les andre gong. Den eine: kva veit vi? Den andre: kva veit vi ikkje? Listene blir brukte på lysbilete 11.",
    },
    {
      type: "oppgave",
      title: "Les «Bussen klokka kvart over fem»",
      body: `<ol>
          <li>Lytt medan læraren les teksten høgt på tavla.</li>
          <li>Les han ein gong til, stille.</li>
          <li>Lag to lister i skriveboka: <strong>Kva veit vi?</strong> og <strong>Kva veit vi ikkje?</strong></li>
        </ol>`,
      form: "Åleine",
      tid: 8,
      notes: "Teksten står på neste lysbilete og blir vist side for side. Les replikkane nøkternt og kort, slik dei står. Ikkje legg for mykje kjensle i stemma: det er det teksten sjølv held att. Andre gong les elevane stille medan du blar.",
    },
    {
      type: "tekst",
      title: "«Bussen klokka kvart over fem»",
      text: `
        <p>Lina står på busshaldeplassen klokka kvart over fem. Det regnar.</p>

        <p>Ikkje skikkeleg regn, berre den slags som gjer alt litt fuktig utan å gi seg
        utslag i pyttar. Ho har på seg ei tynn jakke. Den nye, frå Zara. Ho er litt for
        kald, men ho vil ikkje gå inn att.</p>

        <p>Mor ringjer.<br>
        Ho svarar ikkje.</p>

        <p>Bussen kjem ti minutt for seint, slik bussar pleier. Ho set seg lengst bak.
        Ein gut ho kjenner litt frå skulen, Marius, set seg ned ved sida av henne.</p>

        <p>«Hei», seier han.<br>
        «Hei.»<br>
        «Skal du heim?»<br>
        «Til Marte.»<br>
        «Å. Du har ikkje sett Sander i dag?»</p>

        <p>Ho seier ikkje noko. Ser ut av vindauget. Marius forstår.</p>

        <p>Bussen rullar gjennom regnet. Forbi Coop Extra, forbi den nye blokka som dei
        reiv vekk parken for. Lina hugsar at ho leikte i den parken då ho var lita. No
        står det bygningar der, og folk bur i dei, og det er sikkert greitt for dei
        som bur der, men ho saknar parken.</p>

        <p>«Det går nok bra», seier Marius. Han veit ikkje kva som har skjedd, men han
        skjønar noko.<br>
        «Mm.»</p>

        <p>Mor ringjer igjen. Ho avviser samtalen.</p>

        <p>Ved Solheim går Marius av.<br>
        «Bra du klemmer på», seier han når han reiser seg. «Du veit. Du må ikkje vere
        åleine om det er noko.»</p>

        <p>Ho nikkar. Han er litt rar, Marius, men nokre gonger seier han slike ting, og
        då veit ein at han har lytta heile tida.</p>

        <p>Bussen tek til venstre opp Fløensbakken. Lina lener panna mot vindauget.
        Kaldt. Bra.</p>

        <p>Heime hjå Marte er det varmt. Marte gjev henne ein tørr genser. Ein kopp te.
        Ingen spørsmål.</p>

        <p>Etter ein time ringjer Lina mor.<br>
        «Eg er hjå Marte. Eg kjem heim i kveld.»<br>
        «Greitt», seier mor.</p>

        <p>Stemma er lita, som om mor òg har grine.</p>

        <p>Då dei legg på, sit Lina lenge på senga til Marte og ser ut. Det regnar enno.
        Men ho er innandørs no, og det luktar te, og det er nesten greitt.</p>`,
      kjelde: KJELDE_GRYTTEN,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Les høgt første gong, og la elevane lese stille andre gong medan du blar. Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 16.",
    },
    {
      type: "sitat",
      text: "Mor ringjer.<br>Ho svarar ikkje.",
      kjelde: KJELDE_GRYTTEN,
      notes: "To setningar, fire ord. Ingen forklaring, ingen tanke. Spør: kva kjenner Lina her? Elevane gjettar gjerne sinne, skam eller sorg. Følg opp: korleis kan vi vite det når teksten ikkje seier det? Svaret er at vi les handlinga. Seinare avviser ho samtalen ein gong til, og då er det endå tydelegare.",
    },
    {
      type: "sporsmal",
      question: "Marius spør om Sander. Lina seier ingenting. Kva gjer forfattaren her?",
      options: [
        "Han gløymer å skrive kva Lina svarar.",
        "Han viser at spørsmålet treffer noko vondt, utan å seie kva.",
        "Han viser at Lina ikkje høyrde spørsmålet.",
        "Han viser at Lina ikkje likar Marius.",
      ],
      correct: 1,
      explain: "Tausheita er svaret. «Ho seier ikkje noko. Ser ut av vindauget. Marius forstår.» Både Marius og lesaren skjønar at Sander har noko med saka å gjere.",
      notes: "Poenget er at det som ikkje blir sagt, er ein del av teksten. Spør vidare: kven kan Sander vere? Teksten seier det ikkje, og det er lov å la spørsmålet stå ope.",
    },
    {
      title: "Kva veit vi, og kva veit vi ikkje?",
      body: `<div class="to-kol">
          <div class="boks"><h3>Vi veit</h3><p>Lina vil ikkje snakke med mor.</p><p>Noko har med Sander å gjere.</p><p>Ho skal til Marte.</p></div>
          <div class="boks"><h3>Vi veit ikkje</h3><p>Kva som har skjedd.</p><p>Kven Sander er.</p><p>Kvifor mor har grine.</p></div>
        </div>`,
      notes: "Samanlikn med listene elevane laga under lesinga. Legg merke til at lista over det vi ikkje veit, handlar om dei viktigaste tinga. Det er det underforståtte: teksten gir oss nok til å kjenne alvoret, men ikkje nok til å vite kva det er.",
    },
    {
      type: "sitat",
      text: "Bussen tek til venstre opp Fløensbakken. Lina lener panna mot vindauget. Kaldt. Bra.",
      kjelde: KJELDE_GRYTTEN,
      notes: "«Kaldt. Bra.» er to ord utan verb. Kvifor er det bra at vindauget er kaldt? Ho treng noko som kjølar ned, kanskje etter å ha grine, kanskje for å roe seg. Den klipte rytmen passar med ein person som ikkje vil tenkje for mykje. Dette er stoff til spørsmål 4 på lysbilete 16.",
    },
    {
      type: "bilete",
      src: "bilete/odda-1890.jpg",
      alt: "Farga fotografi av Odda innst i Sørfjorden, med kyrkje, hus og høge fjell",
      caption: "Odda rundt 1890–1900. Detroit Publishing Co. / Library of Congress (ingen kjende restriksjonar)",
      title: "Staden speglar stemninga",
      steps: [
        `<p class="stor"><strong>Regnet</strong>: <em class="nn">den slags som gjer alt litt fuktig</em></p>`,
        `<p class="stor"><strong>Parken</strong> som vart riven: <em class="nn">men ho saknar parken</em></p>`,
        `<p class="stor"><strong>Hjå Marte</strong>: varmt, tørr genser, te, ingen spørsmål</p>`,
      ],
      notes: "Regnet er ikkje dramatisk, berre ubehageleg, som stemninga. Parken er noko som er tapt, og kanskje eit bilete på at noko anna òg har gått tapt for Lina. Hjå Marte er det varmt og trygt. Spør: kvifor er «ingen spørsmål» så viktig for Lina?",
    },
    {
      type: "sitat",
      text: "Stemma er lita, som om mor òg har grine.",
      kjelde: KJELDE_GRYTTEN,
      notes: "Mange elevar les forbi det vesle ordet «òg». Spør: kva fortel det? At Lina har grine. Det har ikkje stått nokon stad før. Og det fortel at mor òg har det vondt. Kanskje er dei ikkje berre uvener, men lei seg for det same. Dette er eit godt døme på korleis eitt ord kan endre lesinga av heile teksten.",
    },
    {
      type: "diskuter",
      title: "Kva har skjedd?",
      prompt: `<p class="stor">Kom med eit forslag, og finn to spor i teksten som støttar det.</p>
        <p>Kvifor trur de forfattaren aldri fortel det?</p>`,
      form: "I grupper på tre",
      tid: 5,
      svar: "Det finst ikkje éitt rett svar. Gode forslag byggjer på spora: Sander, dei to avvisingane, at mor òg har grine, og at Marius seier «Du må ikkje vere åleine om det er noko». Når forfattaren ikkje fortel, må lesaren gjere jobben, og teksten blir meir levande.",
      notes: "Krev spor. Eit forslag utan spor er gjetting, eit forslag med spor er tolking. Merk deg om nokon gruppe meiner at det ikkje spelar noka rolle kva som har skjedd: det er eit modent svar, for teksten handlar om korleis Lina taklar det og om kven som stiller opp.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Sjå tilbake i teksten før du svarar.</p>
        <ol>
          <li>Korleis verkar forholdet mellom Lina og mora hennar?</li>
          <li>Kva slags person verkar Marius som?</li>
          <li>Korleis brukar forfattaren det at Lina ikkje svarar telefonen frå mora, til å skildre kjenslene hennar?</li>
          <li>Kvifor trur du teksten er sett saman av så korte setningar og avsnitt?</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "1. Anstrengt: det er noko som ikkje er sagt mellom dei. 2. Stille, men merksam: han skjønar at noko er gale. 3. Døme: ho avviser mora to gonger utan eit ord, så vi skjønar at noko er vondt utan å få vite kva. 4. Døme: den klipte rytmen passar med at Lina ikkje vil snakke om det som har skjedd.",
      notes: "Spørsmål 3 og 4 er dei viktigaste. Eit godt svar peikar på noko i teksten, som dei to avvisingane eller «Kaldt. Bra.». Treng elevane teksten, gå tilbake til lysbilete 8.",
    },
    {
      type: "oppgave",
      title: "Skriv: ein augneblink som betyr meir",
      body: `<p>Skriv ei kort forteljing (150–250 ord) frå ein buss, ein butikk eller ein heis. To personar møtest. Noko har skjedd som lesaren aldri får vite heilt kva er.</p>
        <ol>
          <li>Hald deg til éin stad og eit kort tidsrom.</li>
          <li>Bruk korte setningar og korte replikkar.</li>
          <li>Ikkje forklar kva som har skjedd.</li>
          <li>Ta med éin detalj frå omgivnadene som speglar stemninga.</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      notes: "Skriveoppgåva er vanskeleg fordi elevane gjerne vil forklare. Tips: skriv først ned kva som har skjedd på ein lapp, og la det så vere ute av teksten. Gå rundt og spør: kvar i teksten din kan lesaren sjå at noko er gale? Det elevane ikkje rekk, kan vere lekse.",
    },
    {
      title: "Vidare: les ekte Grytten",
      body: `<p class="stor"><em class="nn">Bikubesong</em> (1999) ligg på Nettbiblioteket.</p>
        <p>Korte historier frå same bygard i Odda. Byrj kvar som helst.</p>`,
      notes: "Nettbiblioteket-oppgåva i elevmodulen ber elevane lese to eller tre kapittel og finne noko teksten ikkje seier rett ut. Det er same ferdigheit som i timen i dag. Ho passar som frivillig lekse.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med «Bussen klokka kvart over fem», ein urban kvardagstekst skriven for kurset i stilen til Frode Grytten. Lina tek bussen til venninna Marte, avviser mora to gonger og vil ikkje snakke om det som har skjedd. Lesaren får aldri vite kva det er. Økta øver elevane i å lese det underforståtte, å finne spor og å sjå korleis stad, vêr og korte setningar ber stemninga.</p>",
    mal: [
      "Elevane kan forklare kva det underforståtte er, og finne døme på det i teksten.",
      "Elevane kan tolke handlingar og replikkar som uttrykk for kjensler.",
      "Elevane kan forklare korleis korte setningar og skildring av staden skaper stemning.",
      "Elevane kan reflektere over korleis teksten framstiller ein ungdom i ein vanskeleg situasjon.",
    ],
    lareplan: [1, 2, 3, 5, 12],
    forkunnskapar: "Ingen særlege. Har elevane lese «Jenta og isen» eller «Frå hytta», kan du vise til at òg dei tekstane held mykje tilbake.",
    forebuing: [
      "Les teksten og lag dine eigne lister over kva vi veit og ikkje veit, så du kan hjelpe gruppene.",
      "Merk deg ordet «òg» i setninga om stemma til mor. Det er ein detalj mange oversjår.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand, så du veit kvar sidene skiftar.",
      "Sjekk at Bikubesong opnar på Nettbiblioteket, så du kan vise vegen dit når du gir leksa.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om Grytten, samtale om teikn på at noko er gale og omgrepet underforstått.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 9, gjer: "<p>Gå gjennom kva elevane skal sjå etter. Les høgt frå tavla, og la elevane lese stille ein gong til og lage to lister i skriveboka.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 15, gjer: "<p>Avvisingane, tausheita om Sander, kva vi veit og ikkje veit, klipt rytme, staden som spegel, ordet «òg» og kva som har skjedd.</p>", lysbilete: "9 til 15" },
      { fase: "Spørsmål til teksten", min: 6, gjer: "<p>Elevane svarar på dei fire spørsmåla i skriveboka. Vis svaret til slutt.</p>", lysbilete: "16" },
      { fase: "Skriving", min: 7, gjer: "<p>Elevane byrjar på forteljinga der det viktigaste aldri blir sagt.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til Bikubesong på Nettbiblioteket.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Teksten er uferdig, for han fortel ikkje kva som skjedde.»", hjelp: "Det er eit medvite val. Spør kva teksten ville mista om første avsnitt forklarte alt." },
      { feil: "«Lina er berre sint på mora.»", hjelp: "Peik på at mor òg har grine. Forholdet er vondt, ikkje berre sint. Kanskje er dei lei seg for det same." },
      { feil: "«Ei tolking er det same som ei gjetting.»", hjelp: "Ei tolking byggjer på spor i teksten. Be eleven alltid seie kva i teksten som gjer at han eller ho meiner det." },
      { feil: "«Marius er berre ein bifigur.»", hjelp: "Marius viser at nokon ser Lina. Replikken «Du må ikkje vere åleine om det er noko» er ein av dei viktigaste i teksten." },
    ],
    samtale: [
      "Kvifor svarar ikkje Lina på spørsmålet om Sander?",
      "Kva betyr det at Marius «har lytta heile tida»?",
      "Kvifor trur du Lina ringjer mor etter ein time hjå Marte?",
      "Kva er skilnaden på korleis Marius og Marte hjelper Lina?",
    ],
    tilpassing: {
      stotte: [
        "Gi eleven ei ferdig tabell med to kolonnar, Kva veit vi? og Kva veit vi ikkje?, med eitt døme i kvar.",
        "Les dialogane saman i klassen med to elevar som tek rollene.",
        "La eleven svare på dei to første spørsmåla, som har eitt rett svar, før dei to tolkingsspørsmåla.",
      ],
      utfordring: [
        "Be eleven skrive det same møtet frå synsvinkelen til Marius, framleis utan å seie kva som har skjedd.",
        "La eleven lese to kapittel av Bikubesong og samanlikne korleis det underforståtte blir brukt.",
      ],
    },
    vurdering: [
      "Dei korte svara viser om eleven kan knyte handlingar og rytme til kjensler og stemning.",
      "Skriveoppgåva viser om eleven kan halde tilbake informasjon og likevel gjere alvoret synleg.",
      "Kjenneteikn på god måloppnåing: eleven finn fleire spor, skil tolking frå gjetting og forklarer kva det underforståtte gjer med lesaren.",
    ],
    vidare: "Gå vidare til «Om å lese sakte» i stilen til Marit Eikemo, som òg er frå Odda, men skriv essay. Grytten og Fosse er eit godt par i samanlikningsmodulen. Som frivillig lekse kan elevane lese i Bikubesong på Nettbiblioteket, slik oppgåva nedst i elevmodulen legg opp til.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-eikemo", {
  tittelnotat: "«Om å lese sakte» er skriven for kurset i stilen til Marit Eikemo, ikkje av henne. Det er den einaste essayistiske teksten i rekkja, og han handlar om noko elevane sjølve driv med kvar dag: å lese raskt på skjerm. Bruk det: denne timen er både ei leseøkt og ein samtale om korleis vi les.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese eit <strong>essay</strong> i stilen til <strong>Marit Eikemo</strong></li>
        <li>finne ut kva eit essay gjer</li>
        <li>samanlikne <strong>rask</strong> og <strong>sakte</strong> lesing</li>
        <li>diskutere korleis vi les i dag</li>
      </ul>`,
      notes: "Sjangeren er ny i rekkja: dei andre tekstane har vore forteljingar. Sei det, slik at elevane er budde på at denne teksten tenkjer høgt i staden for å fortelje ei historie.",
    },
    {
      title: "Marit Eikemo",
      body: `<p class="stor"><strong>Marit Eikemo</strong>, fødd 1971</p>
        <ul class="stor">
          <li>frå Odda i Hardanger</li>
          <li>skjønnlitteratur og sakprosa</li>
          <li>essayistisk: stiller spørsmål meir enn ho gjev svar</li>
          <li><em class="nn">Her, no</em> (1999), <em class="nn">Samtidsruinar</em> (2008)</li>
        </ul>`,
      notes: "Det finst ikkje noko fritt portrett av Eikemo, så her er det berre tekst. Ho har vore leiar for Litteratursymposiet i Odda, og er kjend for å skrive nært på samtida. Samtidsruinar er ei essaysamling om kva som blir att etter industrisamfunna. Ho kjem frå same stad som Frode Grytten.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Kor lenge brukar du på ein artikkel på nettet?</p>
        <p>Når las du sist noko så lenge at du gløymde tida?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "La elevane vere ærlege. Mange les sjeldan lenge, og det er ikkje noko nederlag. Samle nokre svar på tavla i to kolonnar: kort og lenge. Du kjem tilbake til dei på lysbilete 11.",
    },
    {
      title: "Kva er eit essay?",
      body: `<table>
          <thead><tr><th>Argumenterande tekst</th><th>Essay</th></tr></thead>
          <tbody>
            <tr><td>har ein påstand frå starten</td><td>startar i noko konkret</td></tr>
            <tr><td>overtyder</td><td>tenkjer høgt</td></tr>
            <tr><td>argument for og mot</td><td>spørsmål undervegs</td></tr>
            <tr><td>konklusjon</td><td>kan ende i eit spørsmål</td></tr>
          </tbody>
        </table>`,
      notes: "Elevane kjenner argumenterande tekstar godt frå skriving. Poenget er skilnaden: eit essay er ikkje ute etter å vinne ein diskusjon, men å utforske. Det er lov å skifte meining undervegs. Minn om at skilnaden er første punkt på neste lysbilete, «Sjå etter dette når du les».",
    },
    {
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Kvar teksten liknar på eit essay, og ikkje ein argumenterande tekst.</p>`,
        `<p class="stor">2. Korleis eit <strong>kvardagsleg bilete</strong> seier noko stort.</p>`,
        `<p class="stor">3. At teksten <strong>ikkje</strong> endar i ein fasit.</p>`,
      ],
      notes: "Lesestrategi: be elevane skrive av kvart spørsmål teksten stiller. Det viser raskt kor mykje teksten spør. Ord som kan trenge forklaring: <em>i sveip</em> (fort og overflatisk), <em>meiningsmotstand</em> (nokon som er usamd), <em>institusjon</em>.",
    },
    {
      type: "oppgave",
      title: "Les «Om å lese sakte»",
      body: `<ol>
          <li>Les teksten stille på tavla.</li>
          <li>Skriv av kvart spørsmål teksten stiller.</li>
          <li>Les han ein gong til, sakte.</li>
        </ol>`,
      form: "Åleine",
      tid: 8,
      notes: "Teksten står på neste lysbilete og blir vist side for side. La elevane lese stille sjølve denne gongen: det passar godt med tema. Bla i roleg tempo, og spør om alle er ferdige før du blar vidare. Du kan gjerne seie at dei skal lese han sakte med vilje, og sjå om dei merkar skilnaden. Teksten stiller fire spørsmål.",
    },
    {
      type: "tekst",
      title: "«Om å lese sakte»",
      text: `
        <p>Det er noko som har endra seg dei siste åra. Eg les meir enn nokon gong, men
        eg les annleis. Ein artikkel på nettet tek eg i sveip. Eg får tak i hovudpoenget,
        eg sjekkar lengda på kommentarfelta, eg blar ned for å sjå om det kjem ein
        meiningsmotstand. Heile teksten har eg lese på eit halvt minutt. Eg veit kva han
        seier, eg veit kva han prøver å gjere, og eg går vidare.</p>

        <p>Men er det å lese?</p>

        <p>Då eg var tolv år, sat eg i ein lenestol heile laurdagen og las ei bok om
        ein gut som rømde frå ein institusjon. Eg veit at det var ein laurdag fordi mor
        laga middag to gonger, og eg åt på dei begge utan å skjøne kor lang tid det
        hadde gått. Eg hugsar ikkje slutten av boka. Eg hugsar ein scene der guten
        gøymer seg i ein hekk, og lukta av hekk har sidan hatt noko med den scenen å
        gjere, sjølv om eg ikkje veit kva slags hekk det skulle vere, og forfattaren
        neppe har tenkt på lukt i det heile.</p>

        <p>Slik kan ei bok bli. Ho blir ikkje informasjon. Ho blir lukt og rom og kjensle.
        Og det krev tid. Det krev at ein gjev frå seg kontrollen ei lita stund, at ein
        lar teksten skje med ein sjølv.</p>

        <p>Eg er ikkje sikker på at eg kan det lenger. Når eg les ein artikkel på fjorten
        minutt, sit eg og uroleg vippar med foten. Eg har lyst til å gå vidare. Eg veit
        at ingen kjem til å spørje meg ut om teksten. Eg veit at det viktige er at eg
        har lese han, ikkje at eg har lese han godt.</p>

        <p>Men eg meiner at vi taper noko her. Ikkje noko stort, kanskje, men noko
        presist: evna til å bli endra av ein tekst. Ein artikkel kan endre meg dersom eg
        les han sakte, dersom eg blir ståande att i han ei stund. Dersom eg les han
        raskt, blir han berre ein ting eg veit.</p>

        <p>Ein lærar fortalde meg ein gong at ho bad elevane sine lese same dikt tre
        gonger på rad. Første gongen for å skjøne. Andre gongen for å høyre. Tredje
        gongen for å bu i det. Ho sa at det var den tredje gongen som var lesinga. Dei
        to første var berre øvingar.</p>

        <p>Eg trur det stemmer. Og eg trur at vi alle treng å spørje oss sjølve: kva er
        det å lese, eigentleg? Er det å trekke informasjon ut av tekst? Eller er det
        noko meir? Eg veit ikkje kva svaret er. Eg veit berre at eg saknar laurdagar i
        lenestolen.</p>`,
      kjelde: KJELDE_EIKEMO,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Elevane les stille medan du blar, to gonger. Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 16.",
    },
    {
      type: "sitat",
      text: "Men er det å lese?",
      kjelde: KJELDE_EIKEMO,
      notes: "Eit heilt avsnitt med berre fem ord, rett etter ei skildring av rask lesing. Spør: kvifor står spørsmålet åleine? Det bremsar lesaren og vender teksten. Dette er ikkje eit retorisk spørsmål med eit opplagt svar, men eit spørsmål teksten sjølv undersøkjer. Samanlikn med spørsmåla elevane skreiv av: det er fire, og tre av dei står tett saman i det siste avsnittet.",
    },
    {
      type: "sitat",
      text: "Slik kan ei bok bli. Ho blir ikkje informasjon. Ho blir lukt og rom og kjensle.",
      kjelde: KJELDE_EIKEMO,
      notes: "Dette er det konkrete biletet som ber det store spørsmålet: hekken og lukta frå boka forfattaren las som tolvåring. Poenget er at ho ikkje hugsar slutten, men ho hugsar ei lukt. Spør elevane om dei hugsar ein detalj frå ei bok eller ein film betre enn handlinga.",
    },
    {
      type: "bilete",
      src: "bilete/backer-lampelys.jpg",
      alt: "Måleri av ei kvinne som sit og les ved eit bord med ei oljelampe i ei gammal stove",
      caption: "«Ved lampelys» av Harriet Backer, 1890 (offentleg eigedom)",
      title: "To måtar å lese på",
      body: `<div class="to-kol">
          <div class="boks"><h3>Rask</h3><p><em class="nn">i sveip</em></p><p>hovudpoenget</p><p><em class="nn">ein ting eg veit</em></p></div>
          <div class="boks"><h3>Sakte</h3><p><em class="nn">laurdagar i lenestolen</em></p><p><em class="nn">lukt og rom og kjensle</em></p><p><em class="nn">bli endra av ein tekst</em></p></div>
        </div>`,
      notes: "Gå tilbake til tavla frå førlesinga. Kva av det elevane fortalde, høyrer til kvar kolonne? Legg merke til at forfattaren ikkje seier at rask lesing er gale. Ho les sjølv på den måten. Spør: kva er det ho seier vi taper?",
    },
    {
      type: "sitat",
      text: "Første gongen for å skjøne. Andre gongen for å høyre. Tredje gongen for å bu i det.",
      kjelde: KJELDE_EIKEMO,
      notes: "Dette kjem frå ein lærar forfattaren møtte. Elevane har faktisk brukt denne lesestrategien i alle lesemodulane: les éin gong, så ein gong til, sakte. Spør: kva er skilnaden på å høyre og å bu i ein tekst? Neste lysbilete prøver det i praksis.",
    },
    {
      type: "diskuter",
      title: "Prøv sjølv",
      prompt: `<p class="stor">Les det siste avsnittet tre gonger.</p>
        <p><em class="nn">«Eg trur det stemmer. Og eg trur at vi alle treng å spørje oss sjølve: kva er det å lese, eigentleg? Er det å trekke informasjon ut av tekst? Eller er det noko meir? Eg veit ikkje kva svaret er. Eg veit berre at eg saknar laurdagar i lenestolen.»</em></p>
        <p>Kva la du merke til den tredje gongen som du ikkje såg den første?</p>`,
      form: "Åleine, så sidemannen",
      tid: 4,
      notes: "Gi elevane ro til å lese. Vanlege svar: at spørsmåla kjem tett, at teksten ikkje svarar, at slutten om lenestolen er personleg og litt trist. Dette er òg eit godt høve til å snakke om lesestrategiar: kva gjer du når ein tekst er vanskeleg?",
    },
    {
      type: "sporsmal",
      question: "Korleis sluttar teksten?",
      options: [
        "Med ein klar konklusjon om at alle må lese sakte.",
        "Med spørsmål og eit personleg sakn, utan fasit.",
        "Med eit krav til skulen om meir lesing.",
        "Med eit samandrag av argumenta.",
      ],
      correct: 1,
      explain: "«Eg veit ikkje kva svaret er. Eg veit berre at eg saknar laurdagar i lenestolen.» Essayet endar ope, i ei kjensle, ikkje i ein påstand.",
      notes: "Elevar som er vane med argumenterande tekstar, vel ofte det første alternativet. Vis at forfattaren seier rett ut at ho ikkje veit svaret. Spør: er det ein svak eller ein sterk slutt? Mange vil seie svak først, og ombestemme seg når de snakkar om det.",
    },
    {
      type: "diskuter",
      title: "Er du samd?",
      prompt: `<p class="stor">Taper vi noko når vi les raskt på skjerm?</p>
        <p>Grunngi med eit døme frå din eigen kvardag.</p>`,
      form: "Heile klassen",
      tid: 5,
      notes: "Ein sakleg samtale der elevane skal grunngi. Unngå at det blir ein moralpreik om skjermbruk: det gjer ikkje teksten heller. Løft fram elevar som ser fordelar med rask lesing. Knyt det til at forfattaren sjølv held tvilen open, og at elevane kan gjere det same i essayet sitt.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Sjå tilbake i teksten før du svarar.</p>
        <ol>
          <li>Kva meiner forfattaren om å lese ein artikkel på eit halvt minutt?</li>
          <li>Kva sa læraren om å lese eit dikt tre gonger på rad?</li>
          <li>Kva meiner forfattaren med å «bli endra av ein tekst»?</li>
          <li>Liknar lesinga di meir på den raske eller den sakte måten forfattaren skildrar? Grunngi.</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "1. At det knapt er å lese: ein får informasjon, men ikkje meir. 2. At den tredje gongen er den eigentlege lesinga: då bur ein i diktet. 3. Døme: at ein tekst kan gjere noko med tankane og kjenslene våre når vi les sakte og gir han tid. 4. Her finst ingen fasit, men svaret må grunngivast med eit døme.",
      notes: "Spørsmål 4 handlar om eleven sjølv, så her finst ikkje fasit. Treng elevane teksten, gå tilbake til lysbilete 8.",
    },
    {
      type: "oppgave",
      title: "Skriv: eit lite essay",
      body: `<p>Skriv eit lite essay (150–250 ord) der du stiller spørsmål ved ein vane du sjølv har.</p>
        <ol>
          <li>Start i noko heilt konkret og kvardagsleg.</li>
          <li>Still minst to spørsmål undervegs.</li>
          <li>Prøv éin tanke som du sjølv avviser etterpå.</li>
          <li>Du treng ikkje konkludere, men avslutninga skal vere medviten.</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      notes: "Essayoppgåva ber elevane prøve ein tanke dei avviser etterpå. Det er uvant. Gi eit døme munnleg: «Først tenkte eg at eg sjekkar mobilen fordi eg kjeder meg. Men eigentleg …». Elevane byrjar i timen og skriv ferdig heime.",
    },
    {
      title: "Vidare: les ekte Eikemo",
      body: `<p class="stor"><em class="nn">Her, no</em> (1999) ligg på Nettbiblioteket.</p>
        <p>Les minst eitt heilt portrett eller kapittel.</p>`,
      notes: "Her, no er debutboka hennar, med undertittelen «møte med unge menneske». Samtidsruinar (2008) er for ny for Nettbiblioteket, som dekkjer bøker til og med 2005. Nettbiblioteket-oppgåva i elevmodulen ber elevane finne eit spørsmål Eikemo stiller utan å svare på det. Ho passar som frivillig lekse.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med «Om å lese sakte», eit kort essay skrive for kurset i stilen til Marit Eikemo. Teksten samanliknar rask lesing på skjerm med sakte lesing i ein lenestol, og endar i eit ope spørsmål. Økta lærer elevane kva eit essay er, korleis eit konkret kvardagsbilete kan bere eit stort spørsmål, og gir dei høve til å reflektere over sine eigne lesevanar og lesestrategiar.</p>",
    mal: [
      "Elevane kan forklare kva som skil eit essay frå ein argumenterande tekst.",
      "Elevane kan vise korleis teksten bruker konkrete bilete til å drøfte eit stort spørsmål.",
      "Elevane kan reflektere over sin eigen bruk av lesestrategiar og lesevanar.",
      "Elevane kan diskutere korleis digitale medium påverkar lesinga, og grunngi synspunkta sine.",
    ],
    lareplan: [1, 3, 8, 9, 12],
    forkunnskapar: "Elevane bør kjenne argumenterande tekst frå Del 4, slik at dei kan samanlikne med essayet.",
    forebuing: [
      "Tenk gjennom eitt eige døme på rask og sakte lesing som du kan fortelje om.",
      "Førebu eit munnleg døme på ein tanke som blir avvist i eit essay, til skriveoppgåva.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand, så du veit kvar sidene skiftar.",
      "Sjekk at Her, no opnar på Nettbiblioteket, så du kan vise vegen dit når du gir leksa.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om Eikemo, samtale om eigne lesevanar og kva eit essay er.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 9, gjer: "<p>Gå gjennom kva elevane skal sjå etter. Elevane les stille på tavla medan du blar, skriv av spørsmåla i teksten og les ein gong til.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 16, gjer: "<p>Spørsmålet som vender teksten, biletet av boka som lukt, rask og sakte lesing, tre gonger lesing i praksis, den opne slutten og ein klassesamtale om skjermlesing.</p>", lysbilete: "9 til 15" },
      { fase: "Spørsmål til teksten", min: 6, gjer: "<p>Elevane svarar på dei fire spørsmåla i skriveboka. Vis svaret til slutt.</p>", lysbilete: "16" },
      { fase: "Skriving", min: 6, gjer: "<p>Elevane byrjar på essayet i skriveboka og skriv ferdig heime.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til Her, no på Nettbiblioteket.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Forfattaren meiner at det er gale å lese på skjerm.»", hjelp: "Ho les sjølv raskt og seier at ho ikkje veit svaret. Ho spør kva vi taper, ho fordømer ikkje." },
      { feil: "«Eit essay må ha ein konklusjon.»", hjelp: "Eit essay tenkjer høgt og kan ende i eit spørsmål. Vis slutten: «Eg veit ikkje kva svaret er.»" },
      { feil: "«Eit essay er det same som eit debattinnlegg.»", hjelp: "Samanlikn med tabellen på lysbilete 5. Debattinnlegget vil overtyde, essayet vil utforske." },
      { feil: "«Hekken har ingenting med saka å gjere.»", hjelp: "Minnet om hekken er beviset for poenget: boka vart lukt og kjensle, ikkje informasjon." },
    ],
    samtale: [
      "Kva meiner forfattaren med at ein tekst kan endre oss?",
      "Kvifor hugsar forfattaren ei lukt, men ikkje slutten på boka?",
      "Når les du raskt, og når les du sakte? Kva avgjer det?",
      "Er det ein svakheit eller ein styrke at teksten ikkje svarar på spørsmålet sitt?",
    ],
    tilpassing: {
      stotte: [
        "Lytt til teksten saman før eleven les sjølv.",
        "Gi eleven tabellen med rask og sakte lesing som eit skjema å fylle ut.",
        "La essayet vere kortare, med tre spørsmål og eitt døme frå kvardagen.",
      ],
      utfordring: [
        "Be eleven skrive eit svar til forfattaren i form av eit essay som forsvarer rask lesing.",
        "La eleven lese eit kapittel av Her, no og finne kvar Eikemo startar i noko konkret.",
      ],
    },
    vurdering: [
      "Svaret om å «bli endra av ein tekst» viser om eleven kan tolke ein abstrakt tanke med eigne ord.",
      "Essayet viser om eleven kan tenkje høgt, stille spørsmål og avslutte medvite utan fasit.",
      "Kjenneteikn på god måloppnåing: eleven skil essay frå argumenterande tekst, bruker døme frå teksten og reflekterer sjølvstendig over eigne lesevanar.",
    ],
    vidare: "Gå vidare til «Klassebilete» i stilen til Olaug Nilssen. Samanlikningsmodulen til slutt byggjer på dei same stiltrekka. Som frivillig lekse kan elevane lese i Her, no på Nettbiblioteket, slik oppgåva nedst i elevmodulen legg opp til.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-nilssen", {
  tittelnotat: "«Klassebilete» er skriven for kurset i stilen til Olaug Nilssen, ikkje av henne. Forteljaren er femten år og ser på eit klassebilete frå 7. trinn. Teksten nemner at ein klassekamerat har døydd. Tenk gjennom klassen din på førehand, og ver budd på at temaet kan røre ved nokon.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ein tekst i stilen til <strong>Olaug Nilssen</strong></li>
        <li>sjå kva ein <strong>nøktern tone</strong> gjer med noko vondt</li>
        <li>snakke om korleis eit bilete kan <strong>forklare oss sjølve</strong></li>
        <li>finne vegen til den ekte Nilssen</li>
      </ul>`,
      notes: "Forteljaren er på same alder som elevane. Det gjer teksten nær. Sei at det er lov å lese han som ein tekst, og at ingen treng å dele noko personleg.",
    },
    {
      type: "bilete",
      src: "bilete/nilssen.jpg",
      alt: "Portrett av Olaug Nilssen",
      caption: "Olaug Nilssen. Foto: Olav Helland (CC BY-SA 4.0).",
      body: `<p class="stor"><strong>Olaug Nilssen</strong>, fødd 1977</p>
        <ul>
          <li>frå Førde i Sunnfjord</li>
          <li>forfattar og dramatikar</li>
          <li>direkte og ærleg, humor og smerte</li>
          <li><em class="nn">Tung tids tale</em> (2017), Brageprisen</li>
        </ul>`,
      notes: "Nilssen skriv ofte rått og personleg om ting som ikkje er lette å skrive om: psykisk helse, foreldreskap, kjønn og omsorg. Ho stiller spørsmål ved kva som er normalt. Tittelen Tung tids tale er lånt frå diktet til Halldis Moren Vesaas frå 1945. Har elevane lese «Ein morgon», kan dei kjenne att tittelen.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p class="stor">Tenk på eit gammalt klassebilete av deg sjølv.</p>
        <p>Kva ville du leggje merke til om du såg på det i dag?</p>`,
      form: "Tenk sjølv",
      tid: 2,
      notes: "Dette er ein stille tankeøving, ingen treng å dele. Spør etterpå berre: var det noko som hadde endra seg? Nokre vil kanskje seie noko frivillig. Førlesinga gjer at elevane kjenner att situasjonen når dei les.",
    },
    {
      title: "Ord og omgrep",
      body: `<table>
          <tbody>
            <tr><td><strong>nøktern</strong></td><td>roleg og sakleg, utan store ord</td></tr>
            <tr><td><strong>nostalgi</strong></td><td>lengt tilbake til ei tid som var</td></tr>
            <tr><td><em class="nn">å dvele ved</em></td><td>å bli verande lenge ved noko</td></tr>
          </tbody>
        </table>`,
      notes: "Nøktern er nøkkelordet. Poenget er kontrasten: innhaldet er alvorleg, men tonen er roleg. Nostalgi kjem att i teksten, der forteljaren seier at det å sjå på biletet ikkje berre er nostalgi.",
    },
    {
      type: "bilete",
      src: "bilete/klassebilete-1903.jpg",
      alt: "Gammalt svart-kvitt klassebilete av jenter i rader med lærarinnene sine",
      caption: "Klassebilete, Trondheim om lag 1903. Trondheim byarkiv (CC BY 2.0)",
      title: "Sjå etter dette når du les",
      steps: [
        `<p class="stor">1. Den <strong>nøkterne</strong> tonen når ho fortel om noko vondt.</p>`,
        `<p class="stor">2. Korleis eit <strong>bilete</strong> blir ein måte å forstå seg sjølv på.</p>`,
        `<p class="stor">3. Kva ho nemner <strong>kort</strong>, og kva ho <strong>dvelar</strong> ved.</p>`,
      ],
      notes: "Lesestrategi: be elevane lage to lister i skriveboka: det som blir nemnt kort, og det forteljaren bruker mange ord på. Dei vil sjå at det vondaste får færrast ord.",
    },
    {
      type: "oppgave",
      title: "Les «Klassebilete»",
      body: `<ol>
          <li>Lytt medan læraren les teksten høgt på tavla.</li>
          <li>Les han ein gong til, stille.</li>
          <li>Lag to lister i skriveboka: <strong>Kva blir nemnt kort?</strong> og <strong>Kva får mange ord?</strong></li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      notes: "Teksten står på neste lysbilete og blir vist side for side. Les roleg og sakleg, utan å dramatisere avsnittet om Mikkel. Den nøkterne tonen skal høyrast. Andre gong les elevane stille medan du blar.",
    },
    {
      type: "tekst",
      title: "«Klassebilete»",
      text: `
        <p>Eg har sett på det klassebiletet frå 7. trinn fleire gonger denne hausten. Eg
        veit ikkje kvifor. Det ligg i ein skuff på rommet mitt, saman med gamle prøver
        og eit halvbrukt notathefte. Eg drog det fram ein dag eg skulle rydde, og no
        ligg det øvst, og eg ser på det.</p>

        <p>Tjueåtte ungar. Sju lærarar bak. Eg står på bakerste rad mellom Lisa og
        Henrik. Lisa har raudt hår og smiler så det skin. Henrik ser ned i golvet. Eg
        ser rett i kamera, men eg smiler ikkje. Eg har på meg ein blå hettegenser eg
        hugsar at eg syntest var stygg, men som mor sa eg måtte ha på den dagen fordi
        alt anna var i vasken.</p>

        <p>To av jentene på biletet bur ikkje i landet lenger. Familiane deira flytta.
        Tre av gutane går i klassen min på vidaregåande no, men vi seier ikkje hei
        lenger. Ein gut, Mikkel, døydde i ei ulukke i fjor sommar. Han står lengst
        til venstre, smiler skeivt, har på seg ei Brann-trøye.</p>

        <p>Eg veit ikkje kva eg leitar etter når eg ser på det. Kanskje noko som ein
        gong var rett. Kanskje meg sjølv, slik eg såg meg sjølv den gongen: som ei
        jente som hadde alt framom seg, alt ope, alt mogleg. No er eg femten, og det
        meste er framleis ope, men det er mindre ope enn det var.</p>

        <p>Mor kom inn her om dagen då eg sat med biletet på fanget.<br>
        «Ser du på dei gamle bileta?»<br>
        «Litt.»<br>
        «Var det ikkje noko du skulle gjere?»<br>
        «Jo.»</p>

        <p>Eg la det vekk då. Men neste dag tok eg det fram att.</p>

        <p>Eg trur kanskje vaksne ikkje skjønar at å sjå på eit gamalt bilete kan vere
        arbeid òg. Det er ikkje berre nostalgi. Det er noko ein gjer for å finne ut
        korleis ein er kome hit. Kor mange val og uhell og avskjeder som skal til for
        at den jenta på biletet, ho i den stygge blå hettegenseren, blir til den jenta
        som no sit på senga si og tenkjer.</p>`,
      kjelde: KJELDE_NILSSEN,
      notes: "Heile teksten, ordrett som i elevmodulen. Kvart trykk blar ei side. Les høgt første gong, og la elevane lese stille andre gong medan du blar. Kom tilbake hit når elevane svarar på spørsmåla på lysbilete 16.",
    },
    {
      type: "sitat",
      text: "Tjueåtte ungar. Sju lærarar bak. Eg står på bakerste rad mellom Lisa og Henrik.",
      kjelde: KJELDE_NILSSEN,
      notes: "Teksten skildrar biletet som ein kamera: tal, plassar, namn. Spør: kvifor startar forfattaren med tal og ikkje med kjensler? Det gir ein nøktern tone frå byrjinga. Legg òg merke til detaljane om Lisa, Henrik og forteljaren: éin smiler, éin ser ned, éin ser i kamera utan å smile.",
    },
    {
      type: "sitat",
      text: "Ein gut, Mikkel, døydde i ei ulukke i fjor sommar. Han står lengst til venstre, smiler skeivt, har på seg ei Brann-trøye.",
      kjelde: KJELDE_NILSSEN,
      notes: "Den vondaste opplysninga i teksten står i éi kort setning. Så går forteljaren rett tilbake til biletet: det skeive smilet, fotballtrøya. Ho skriv ikkje kva ho kjenner. Spør: blir det mindre sterkt av det? Dei fleste elevane meiner det blir sterkare. Hald samtalen på teksten.",
    },
    {
      type: "sporsmal",
      question: "Kvifor verkar setningane om Mikkel så sterkt, sjølv om dei er korte?",
      options: [
        "Fordi forteljaren skriv mykje om kor lei seg ho er.",
        "Fordi den nøkterne tonen og dei konkrete detaljane lèt lesaren kjenne sorga sjølv.",
        "Fordi Mikkel er hovudpersonen i teksten.",
        "Fordi setningane har mange adjektiv.",
      ],
      correct: 1,
      explain: "Forteljaren seier ingenting om kjenslene sine. Det skeive smilet og Brann-trøya gjer Mikkel levande, og lesaren må sjølv kjenne tapet.",
      notes: "Dette er nær det som står i tipset til skriveoppgåva: «Nilssen skriv nøkternt om det som gjer vondt. Det gjer det sterkare, ikkje svakare.» Les gjerne den setninga høgt etter at svaret er vist.",
    },
    {
      type: "sitat",
      text: "No er eg femten, og det meste er framleis ope, men det er mindre ope enn det var.",
      kjelde: KJELDE_NILSSEN,
      notes: "Ei setning om kva det er å vere ung. Spør elevane: kva kan ha gjort livet «mindre ope» sidan 7. trinn? Teksten sjølv nemner val, uhell og avskjedar. Kjenner de att tanken, eller er de usamde? Mange femtenåringar vil seie at dei har meir fridom no. Det er ein god samtale om korleis teksten framstiller livssituasjonen til unge.",
    },
    {
      title: "Samtalen med mor",
      body: `<p class="stor"><em class="nn">«Ser du på dei gamle bileta?»<br>«Litt.»<br>«Var det ikkje noko du skulle gjere?»<br>«Jo.»</em></p>`,
      steps: [
        `<p>Mor ser berre at dottera sit og ser på bilete. Dottera forklarar ikkje.</p>`,
        `<p class="stor"><em class="nn">«Eg la det vekk då. Men neste dag tok eg det fram att.»</em></p>`,
      ],
      notes: "Replikkane er korte og nesten komiske, men dei viser at mor og dotter ikkje snakkar om det same. Knyt det til den siste delen av teksten: «Eg trur kanskje vaksne ikkje skjønar …». Spør: har mor gjort noko gale? Eller er det berre vanskeleg å forklare?",
    },
    {
      type: "sitat",
      text: "Eg trur kanskje vaksne ikkje skjønar at å sjå på eit gamalt bilete kan vere arbeid òg. Det er ikkje berre nostalgi. Det er noko ein gjer for å finne ut korleis ein er kome hit.",
      kjelde: KJELDE_NILSSEN,
      notes: "Dette er tolkingsnøkkelen, og tema for spørsmål 3 på lysbilete 16. Elevane oversjår ofte ordet «kanskje»: forteljaren er ikkje skråsikker. Legg òg merke til at teksten sluttar med «den jenta som no sit på senga si og tenkjer», altså i notida, med biletet i fanget.",
    },
    {
      type: "diskuter",
      title: "Arbeid eller nostalgi?",
      prompt: `<p class="stor">Kva er skilnaden på å <em>minnast</em> og å <em>arbeide</em> med eit minne?</p>
        <p>Kvifor trur de forteljaren treng å gjere det no?</p>`,
      form: "I grupper på tre",
      tid: 5,
      svar: "Nostalgi er å lengte tilbake. Arbeid er å prøve å forstå: kva som har skjedd mellom då og no, og kva som har gjort ein til den ein er. Forteljaren har opplevd tap og endringar, mellom anna at Mikkel døydde, og treng å finne ut korleis ho er kome hit.",
      notes: "Be gruppene bruke minst eitt sitat. Gode grupper ser at biletet ikkje berre viser fortida, men blir eit verktøy for å forstå notida. Knyt gjerne an til «Ein morgon», der forteljaren òg ser tilbake.",
    },
    {
      type: "oppgave",
      title: "Spørsmål til teksten",
      body: `<p>Svar med heile setningar. Sjå tilbake i teksten før du svarar.</p>
        <ol>
          <li>Kvifor likte forteljaren ikkje hettegenseren ho hadde på seg på klassebiletet?</li>
          <li>Korleis snakkar forteljaren om Mikkel?</li>
          <li>Kva meiner forteljaren med at «å sjå på eit gamalt bilete kan vere arbeid»?</li>
          <li>Korleis viser teksten at livet til forteljaren har endra seg sidan 7. trinn?</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "1. Ho syntest han var stygg, men måtte ha han på fordi alt anna var i vasken. 2. Sakleg og kort, men med nærleik. 3. Døme: det er ein måte å forstå seg sjølv på, å sjå kva som har skjedd mellom då og no. 4. To jenter har flytta ut av landet, tre gutar seier ikkje hei lenger, Mikkel er død, og det meste er «mindre ope» enn før.",
      notes: "Spørsmål 3 og 4 er dei viktigaste. På spørsmål 4 bør eleven nemne fleire konkrete endringar. Treng elevane teksten, gå tilbake til lysbilete 8.",
    },
    {
      type: "oppgave",
      title: "Skriv: eit bilete du hugsar",
      body: `<p>Vel eit bilete du kjenner godt: eit klassebilete, eit feriebilete eller eit familiebilete. Skriv 150–250 ord slik at lesaren skjønar kva som har endra seg sidan biletet vart teke.</p>
        <ol>
          <li>Skildre biletet konkret før du seier noko om det.</li>
          <li>Nemn minst tre personar eller detaljar.</li>
          <li>Skriv om minst éin ting som har endra seg.</li>
          <li>Hald tonen nøktern. Du kan gjerne dikte biletet.</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      notes: "Skriveoppgåva ber elevane skrive om eit eige bilete. Sei tydeleg at dei kan dikte, så ingen må skrive om noko privat dei ikkje vil. Tips: nemn tre personar eller detaljar før du seier noko om kva som har endra seg. Det elevane ikkje rekk, kan vere lekse.",
    },
    {
      title: "Vidare: les ekte Nilssen",
      body: `<p class="stor"><em class="nn">Få meg på, for faen</em> (2005) ligg på Nettbiblioteket.</p>
        <p>Roman om ungdom. Les minst ti sider.</p>`,
      notes: "Romanen handlar om ungdom og seksualitet, har ein direkte tittel og vart òg film. Kjenn til innhaldet før du gir oppgåva, og vurder om nokre elevar bør få velje ein annan tekst frå Del 5 i staden. Nettbiblioteket-oppgåva i elevmodulen ber elevane finne stader der språket ligg tett på talemål, og sjå korleis humor og alvor går om kvarandre. Ho passar som frivillig lekse.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er ei leseøkt med «Klassebilete», ein personleg tekst skriven for kurset i stilen til Olaug Nilssen. Ei femten år gammal jente ser på eit klassebilete frå 7. trinn og tenkjer på kva som har skjedd sidan: venner som har flytta, venskap som har tatt slutt og ein klassekamerat som har døydd. Økta legg vekt på den nøkterne tonen som verkemiddel, og på korleis teksten framstiller det å vere ung og å forstå seg sjølv gjennom minne.</p>",
    mal: [
      "Elevane kan forklare korleis ein nøktern tone kan gjere noko vondt sterkare.",
      "Elevane kan vise korleis konkrete detaljar erstattar kjensleord i teksten.",
      "Elevane kan tolke kva forteljaren meiner med at det å sjå på eit bilete kan vere arbeid.",
      "Elevane kan reflektere over korleis teksten framstiller livssituasjonen til unge.",
    ],
    lareplan: [1, 2, 3, 5, 12],
    forkunnskapar: "Ingen særlege. Har elevane lese «Ein morgon», kan dei samanlikne to tekstar der forteljaren ser tilbake.",
    forebuing: [
      "Tenk gjennom om nokon i klassen har mist ein venn eller eit familiemedlem, og snakk eventuelt med eleven på førehand.",
      "Bla gjennom tekstlysbiletet (lysbilete 8) på tavla på førehand, så du veit kvar sidene skiftar.",
      "Kjenn til innhaldet i Få meg på, for faen før du gir Nettbiblioteket-leksa, og ha eit alternativ klart.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Mål for timen, kort om Nilssen, ein stille tankeøving om klassebilete og omgrepa nøktern og nostalgi.</p>", lysbilete: "2 til 5" },
      { fase: "Lesing", min: 9, gjer: "<p>Gå gjennom kva elevane skal sjå etter. Les høgt frå tavla, og la elevane lese stille ein gong til og skrive ned kva som er kort og langt.</p>", lysbilete: "6 til 8" },
      { fase: "Samtale", min: 15, gjer: "<p>Biletskildringa, setningane om Mikkel, kva det er å vere femten, samtalen med mor og tanken om at bilete kan vere arbeid.</p>", lysbilete: "9 til 15" },
      { fase: "Spørsmål til teksten", min: 6, gjer: "<p>Elevane svarar på dei fire spørsmåla i skriveboka. Vis svaret til slutt.</p>", lysbilete: "16" },
      { fase: "Skriving", min: 7, gjer: "<p>Elevane skriv om eit bilete dei kjenner godt, eller eit oppdikta bilete.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til Nettbiblioteket, og gi eventuelt eit alternativ til dei som treng det.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Ho bryr seg ikkje om Mikkel, for ho skriv så lite om han.»", hjelp: "Den nøkterne tonen er eit verkemiddel. Spør kvifor ho hugsar det skeive smilet og Brann-trøya, og kva det seier." },
      { feil: "«Teksten handlar om Mikkel.»", hjelp: "Teksten handlar om forteljaren og korleis ho har kome dit ho er. Mikkel er ein av fleire skjebner ho nemner." },
      { feil: "«Mor er slem.»", hjelp: "Mor ser berre overflata. Teksten seier at vaksne «kanskje» ikkje skjønar. Poenget er at det er vanskeleg å forklare, ikkje at nokon er slem." },
      { feil: "«Nøktern betyr kjenslekald.»", hjelp: "Nøktern betyr sakleg og roleg. Kjenslene er der, men dei blir viste gjennom detaljar i staden for å bli sagt." },
    ],
    samtale: [
      "Kvifor skriv forteljaren at ho ikkje veit kva ho leitar etter?",
      "Kva seier den stygge blå hettegenseren om korleis ho ser på seg sjølv?",
      "Er det sant at det meste blir mindre ope når ein blir eldre?",
      "Korleis ville teksten vore om han var skriven med store kjensleord?",
    ],
    tilpassing: {
      stotte: [
        "Gi eleven ein tabell med to kolonnar: kva står på biletet, og kva har endra seg.",
        "La eleven svare munnleg på det tredje spørsmålet før han eller ho skriv.",
        "La skriveoppgåva handle om eit oppdikta bilete om eleven ønskjer det.",
      ],
      utfordring: [
        "Be eleven skrive om avsnittet om Mikkel med sterke kjensleord, og forklare kvifor originalen verkar sterkare.",
        "La eleven samanlikne «Klassebilete» med «Ein morgon»: to forteljarar som ser tilbake.",
      ],
    },
    vurdering: [
      "Dei korte svara viser om eleven kan tolke og forklare endringane i livet til forteljaren med døme.",
      "Skriveoppgåva viser om eleven kan halde ein nøktern tone og la detaljar bere kjenslene.",
      "Kjenneteikn på god måloppnåing: eleven forklarer verknaden av den nøkterne tonen, bruker sitat og reflekterer over kva teksten seier om å vere ung.",
    ],
    vidare: "Avslutt lesemodulane med Samanlikn tekstane, der elevane held dei ni tekstane opp mot kvarandre. Nilssen og Halldis Moren Vesaas er eit godt par, sidan Nilssen har lånt tittelen Tung tids tale frå diktet hennar. Som frivillig lekse kan elevane lese i Få meg på, for faen på Nettbiblioteket, slik oppgåva nedst i elevmodulen legg opp til, eller ein annan tekst du har valt.",
  },
});

/* ------------------------------------------------------------------ */

Larar.register("lesing-samanlikning", {
  tittelnotat: "Dette er avslutninga på lesemodulane i Del 5. Elevane skal sjå dei ni tekstane i samanheng og setje ord på kva som skil stilane. Det går best om dei har lese dei fleste tekstane. Har dei lese få, kan du bruke sitata på lysbileta og utdraga frå alle ni tekstane på lysbilete 9 som ein felles referanse.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>sjå dei <strong>ni tekstane</strong> i samanheng</li>
        <li>lage ei <strong>verktøykasse</strong> for å samanlikne stil</li>
        <li>samanlikne to tekstar med døme</li>
        <li>prøve å skrive i ein stil sjølv</li>
      </ul>`,
      notes: "Minn elevane på at alle tekstane i lesemodulane er skrivne for kurset i stilen til forfattarane, med unntak av utdraga frå Vinje, Garborg og Duun som er merkte som ekte. I dag handlar det om stilane.",
    },
    {
      title: "Ni tekstar, ni stemmer",
      body: `<table>
          <thead><tr><th>Stilen til</th><th>Tekst</th><th>Det mest særmerkte</th></tr></thead>
          <tbody>
            <tr><td>Vinje</td><td>«Med toget over vidda»</td><td>observasjon blir ettertanke</td></tr>
            <tr><td>Garborg</td><td>«Heim att»</td><td>alt som ikkje blir sagt</td></tr>
            <tr><td>Duun</td><td>«Bestefar og stormen»</td><td>naturen som motstandar</td></tr>
            <tr><td>T. Vesaas</td><td>«Jenta og isen»</td><td>korte setningar, enkle ord</td></tr>
            <tr><td>H. M. Vesaas</td><td>«Ein morgon»</td><td>ein augneblink får all plassen</td></tr>
            <tr><td>Fosse</td><td>«Frå hytta»</td><td>gjentaking</td></tr>
            <tr><td>Grytten</td><td>«Bussen klokka kvart over fem»</td><td>det underforståtte</td></tr>
            <tr><td>Eikemo</td><td>«Om å lese sakte»</td><td>spørsmål utan fasit</td></tr>
            <tr><td>Nilssen</td><td>«Klassebilete»</td><td>nøktern tone om noko vondt</td></tr>
          </tbody>
        </table>`,
      notes: "Tabellen står i elevmodulen, med sjanger i tillegg. Spør klassen kva tekst dei hugsar best, og kvifor. Ofte er det teksten med det tydelegaste stiltrekket. Legg merke til at stikkorda i høgre kolonne er verkemiddel, ikkje handling.",
    },
    {
      title: "Kven er stilen?",
      steps: [
        `<p class="stor"><em class="nn">«Kaldt. Bra.»</em></p>`,
        `<p class="stor"><em class="nn">«Heile dalen heldt pusten.»</em></p>`,
        `<p class="stor"><em class="nn">«Men ikkje sauene. Han gløymde aldri sauene.»</em></p>`,
        `<p class="stor"><em class="nn">«Når noko var stort, sa ein lite. Når noko var lite, sa ein meir.»</em></p>`,
        `<p class="stor"><em class="nn">«Eg veit berre at eg saknar laurdagar i lenestolen.»</em></p>`,
      ],
      svar: "Grytten, Tarjei Vesaas, Duun, Garborg og Eikemo.",
      notes: "Vis eitt sitat om gongen og la klassen gjette før du går vidare. Be dei grunngi: kva i sitatet peikar mot forfattaren? «Kaldt. Bra.» er klipt og urbant. «Heile dalen heldt pusten» har natur og korte ord. Sauene og stormen er Duun. Garborg-sitatet handlar om det som ikkje blir sagt. Lenestolen er Eikemo.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">«Snøen fell, og det er stilt, og eg veit ikkje kva eg gjer her, men det er kanskje det eg gjer.»</em> Kva stil er dette?",
      options: ["Tarjei Vesaas", "Jon Fosse", "Frode Grytten", "Olaug Nilssen"],
      correct: 1,
      explain: "Lange setningar bundne saman med <em class=\"nn\">og</em>, gjentaking og ein forteljar som ikkje veit. Det er «Frå hytta» i stilen til Jon Fosse.",
      notes: "Nokre vel Vesaas fordi det handlar om vinter og stillheit. Spør då om setningslengda: Vesaas-teksten har korte linjer, denne er éi lang. Tema kan vere likt, stilen er ulik. Det er poenget med heile timen.",
    },
    {
      title: "Verktøykasse for samanlikning",
      body: `<div class="to-kol">
          <div class="boks"><h3>Form</h3><p>setningslengd</p><p>avsnitt</p><p>gjentaking</p><p>dialog</p></div>
          <div class="boks"><h3>Innhald og tone</h3><p>kva blir sagt, kva blir ikkje sagt</p><p>stad og natur</p><p>tone: varm, nøktern, klipt</p><p>kven fortel</p></div>
        </div>`,
      notes: "Dette er spørsmåla elevane kan stille til kva tekst som helst. Be dei skrive dei ned i skriveboka. Samanlikningsoppgåva på lysbilete 14 ber særleg om setningar, avsnitt, gjentaking og dialog. Fagomgrep gir betre samanlikningar: «Fosse bruker gjentaking» er betre enn «Fosse seier det same mange gonger».",
    },
    {
      title: "Lang og kort",
      body: `<div class="to-kol">
          <div class="boks"><h3>Fosse</h3><p><em class="nn">«Eg sit ved vindauget i hytta og ser ut og snøen fell og det er stilt og eg har sett ut sidan klokka åtte …»</em></p></div>
          <div class="boks"><h3>Grytten</h3><p><em class="nn">«Mor ringjer. Ho svarar ikkje.»</em></p></div>
        </div>`,
      steps: [`<p class="midt stor">Same verkemiddel, motsett bruk: setningslengd.</p>`],
      notes: "Begge tekstane handlar om ein ungdom som ikkje vil snakke med mor. Likevel er dei heilt ulike å lese. Spør: kva kjensle gir den lange setninga? Ro, straum, uklarheit. Den korte? Spenning, avvising. Dette er eit døme på ei samanlikning med konkret døme frå kvar tekst.",
    },
    {
      title: "Det som ikkje blir sagt",
      steps: [
        `<p class="stor"><strong>Garborg</strong>: far seier «Det var fint», og går ut att</p>`,
        `<p class="stor"><strong>H. M. Vesaas</strong>: far og barn seier nesten ingenting</p>`,
        `<p class="stor"><strong>Grytten</strong>: Lina avviser mor to gonger</p>`,
        `<p class="stor"><strong>Nilssen</strong>: «Ser du på dei gamle bileta?» «Litt.»</p>`,
      ],
      notes: "Mange av tekstane har eit felles tema: det som ikkje blir sagt mellom foreldre og barn. Men tausheita betyr ulike ting. Hos Halldis Moren Vesaas er ho trygg. Hos Grytten er ho vond. Hos Garborg er ho ein måte å vise kjærleik på. Spør klassen kva tausheita tyder i kvar tekst.",
    },
    {
      type: "tekst",
      title: "Utdrag frå dei ni tekstane",
      text: `
        <p><strong>«Med toget over vidda»</strong> (Vinje)</p>
        <p>Eg sit att med ein liten tanke om at det er noko fint med eit folk som
        framleis går til fots over fjellet. Vi har bilar og fly og hurtigbåtar, og
        likevel finn ein engelskmann ut at det beste han kan gjere i Noreg, er å gå.
        Kanskje han skjønar noko vi har gløymt.</p>

        <p><strong>«Heim att»</strong> (Garborg)</p>
        <p>Far kom inn etter ein halvtime. «Du er heime», sa han.<br>
        «Ja.»<br>
        «Det var fint.»</p>
        <p>Far gjekk ut att. Det var ikkje mangel på kjærleik. Det var berre måten dei
        var her, alle saman. Når noko var stort, sa ein lite. Når noko var lite, sa ein
        meir.</p>

        <p><strong>«Bestefar og stormen»</strong> (Duun)</p>
        <p>Bestefar gjekk mot beitet. Han gjekk så raskt at vi hadde vondt for å nå
        han. Vinden bles rett i andleta våre. Det byrja å regne òg, men i sidesprut,
        ikkje rett ned. Det var den slags regn som finn deg uansett kva du har på deg.</p>

        <p><strong>«Jenta og isen»</strong> (Tarjei Vesaas)</p>
        <p>Det var stilt.<br>
        Ein måse skreik langt borte.<br>
        Snøen ved bredda var blå i skuggen, gul der sola tok.<br>
        Heile dalen heldt pusten.</p>

        <p><strong>«Ein morgon»</strong> (Halldis Moren Vesaas)</p>
        <p>Vi sit, og vi seier ikkje mykje. Det er ikkje fordi vi ikkje har noko å seie.
        Det er fordi det er morgon, og vi har heile dagen til å seie det. No skal vi
        berre vere her, han og eg, med kaffe og brød og lyset som flyttar seg over
        kjøkenbordet.</p>

        <p><strong>«Frå hytta»</strong> (Jon Fosse)</p>
        <p>Eg sit ved vindauget i hytta og ser ut og snøen fell og det er stilt og eg
        har sett ut sidan klokka åtte, ja eg har sett ut og snøen har falle og det har
        vore stilt heile tida. Det er ingen som veit kvar eg er. Det er ingen som har
        spurt heller. Eg drog hit i går kveld. Eg drog hit fordi eg måtte. Eg veit
        ikkje kvifor eg måtte, men eg måtte, og no er eg her, og snøen fell.</p>

        <p><strong>«Bussen klokka kvart over fem»</strong> (Frode Grytten)</p>
        <p>Mor ringjer.<br>
        Ho svarar ikkje.</p>
        <p>Bussen tek til venstre opp Fløensbakken. Lina lener panna mot vindauget.
        Kaldt. Bra.</p>

        <p><strong>«Om å lese sakte»</strong> (Marit Eikemo)</p>
        <p>Men er det å lese?</p>
        <p>Eg trur det stemmer. Og eg trur at vi alle treng å spørje oss sjølve: kva er
        det å lese, eigentleg? Er det å trekke informasjon ut av tekst? Eller er det
        noko meir? Eg veit ikkje kva svaret er. Eg veit berre at eg saknar laurdagar i
        lenestolen.</p>

        <p><strong>«Klassebilete»</strong> (Olaug Nilssen)</p>
        <p>To av jentene på biletet bur ikkje i landet lenger. Familiane deira flytta.
        Tre av gutane går i klassen min på vidaregåande no, men vi seier ikkje hei
        lenger. Ein gut, Mikkel, døydde i ei ulukke i fjor sommar. Han står lengst
        til venstre, smiler skeivt, har på seg ei Brann-trøye.</p>`,
      kjelde: "Alle ni er skrivne for kurset i stilen til forfattarane.",
      notes: "Eitt utdrag frå kvar tekst, ordrett, så elevane har døme å vise til i gruppesamtalen og i samanlikninga sjølv om dei ikkje hugsar tekstane. Bla gjennom utdraga saman, og les gjerne nokre av dei høgt. Når elevane skriv, kan du gå tilbake hit og bla til dei to tekstane dei fleste har valt. Elevane kan òg bruke sitata på lysbilete 4, 7 og 8.",
    },
    {
      type: "diskuter",
      title: "Vel to",
      prompt: `<p class="stor">Vel to tekstar som er svært ulike.</p>
        <p>Korleis skaper dei stemning på kvar sin måte? Finn eitt døme frå kvar.</p>`,
      form: "I grupper på tre",
      tid: 6,
      notes: "Gode par er Fosse og Grytten, eller Duun og Halldis Moren Vesaas. Gruppene skal bruke verktøykassa og utdraga på lysbilete 9. Be kvar gruppe presentere éi setning der dei samanliknar med eit døme. Samtalen er ei munnleg øving til skriveoppgåva.",
    },
    {
      title: "Slik byggjer du ei samanlikning",
      steps: [
        `<p class="stor">1. Namngi dei to tekstane.</p>`,
        `<p class="stor">2. Kva har dei <strong>felles</strong>?</p>`,
        `<p class="stor">3. Kva er <strong>ulikt</strong>: stil, stemning, innhald?</p>`,
        `<p class="stor">4. Eitt konkret <strong>døme</strong> frå kvar tekst.</p>`,
        `<p class="stor">5. Kva gjer skilnaden med lesaren?</p>`,
      ],
      notes: "Elevane kan skrive punkt for punkt (stil, så stemning) eller tekst for tekst (først den eine, så den andre). Punkt for punkt gir oftast betre samanlikning, fordi skilnadene kjem tydelegare fram. Gode bindeord: <em>medan</em>, <em>derimot</em>, <em>på same måte</em>, <em>begge</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva er den beste samanlikningssetninga?",
      options: [
        "Fosse er betre enn Grytten.",
        "Begge tekstane er fine og spennande.",
        "Medan Fosse bind setningane saman med «og», kappar Grytten dei opp: «Kaldt. Bra.»",
        "Grytten-teksten handlar om ein buss.",
      ],
      correct: 2,
      explain: "Den tredje setninga seier kva som er ulikt, bruker eit fagomgrep og har eit konkret døme. Dei andre er smak, gjenfortelling eller for vage.",
      notes: "Bruk svaret som modell. Be elevane skrive éi slik setning om dei to tekstane dei snakka om i gruppa, før dei går i gang med skrivinga.",
    },
    {
      title: "Skriv i ein stil",
      body: `<table>
          <thead><tr><th>Stilen til</th><th>Lån dette</th></tr></thead>
          <tbody>
            <tr><td>Tarjei Vesaas</td><td>ingen setning over ti ord, natur som spegel</td></tr>
            <tr><td>Jon Fosse</td><td>lange setningar med og, éi setning som kjem att</td></tr>
            <tr><td>Frode Grytten</td><td>korte replikkar, det viktigaste blir aldri sagt</td></tr>
            <tr><td>Marit Eikemo</td><td>start konkret, still spørsmål, ingen fasit</td></tr>
            <tr><td>Olaug Nilssen</td><td>nøktern tone om noko alvorleg</td></tr>
          </tbody>
        </table>`,
      notes: "Oppgåve 2 på lysbilete 15 lèt elevane skrive ein ny tekst i stilen til éin forfattar, om eit emne forfattaren aldri har skrive om. Tabellen er henta frå skriveoppgåvene i lesemodulane. Ein morosam variant er å skrive om noko heilt kvardagsleg, som ein matpakke, i stilen til Fosse. Å etterlikne ein stil er ein av dei beste måtane å oppdage kva stilen består av.",
    },
    {
      type: "oppgave",
      title: "Samanlikn to tekstar",
      body: `<p>Vel to av dei ni tekstane og samanlikn dei. Skriv 150–250 ord.</p>
        <ol>
          <li>Namngi dei to tekstane.</li>
          <li>Stil: lange eller korte setningar, gjentaking, dialog.</li>
          <li>Stemning og innhald: kva kjensler skaper tekstane?</li>
          <li>Minst eitt konkret døme frå kvar tekst.</li>
        </ol>`,
      form: "Åleine",
      tid: 12,
      svar: "Døme på ei god setning: Medan Fosse bind setningane saman med «og», kappar Grytten dei opp: «Kaldt. Bra.»",
      notes: "Alle skal gjere samanlikninga. Gå rundt og sjekk at samanlikningane har eitt konkret døme frå kvar tekst. Det er det elevane oftast gløymer. Treng dei døme, gå tilbake til utdraga på lysbilete 9 og bla til tekstane dei har valt.",
    },
    {
      type: "oppgave",
      title: "Vel éi oppgåve til",
      body: `<ol>
          <li><strong>Favoritten din</strong>: kva tekst likte du best, og kvifor? Skriv 100–200 ord med minst eitt døme frå teksten.</li>
          <li><strong>Skriv i ein stil</strong>: skriv ein ny tekst (150–250 ord) i stilen til éin av forfattarane, om noko han eller ho aldri har skrive om. Skriv namnet øvst, og tre linjer til slutt om korleis du trefte stilen.</li>
        </ol>`,
      form: "Åleine",
      tid: 7,
      notes: "Elevane vel éi av dei to oppgåvene og byrjar i timen. Resten kan vere lekse. Tabellen på lysbilete 13 hjelper dei som vel stilskriving.",
    },
    {
      title: "Vidare: frå kurstekst til ekte bok",
      body: `<p class="stor">Vel éin forfattar og les ein ekte tekst.</p>
        <p>Nettbiblioteket (nb.no) og bokselskap.no er gratis.</p>`,
      notes: "Avslutt med å minne om at tekstane i kurset berre er ein inngang. Lenkjene til ekte tekstar står i kvar lesemodul og i Møt nynorskforfattarane. Exit-lapp: kva forfattar vil du lese meir av, og kvifor?",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen avsluttar lesemodulane i Del 5. Elevane held dei ni tekstane opp mot kvarandre, frå Vinje til Nilssen, og set ord på kva som skil stilane: setningslengd, gjentaking, dialog, tone og det som ikkje blir sagt. Økta gir elevane ei verktøykasse for å samanlikne tekstar, ein modell for ei god samanlikningssetning og eit utgangspunkt for å skrive i ein stil sjølve.</p>",
    mal: [
      "Elevane kan kjenne att stiltrekk frå dei ni tekstane og knyte dei til forfattarane.",
      "Elevane kan samanlikne to tekstar med fagomgrep og konkrete døme.",
      "Elevane kan forklare korleis ulike verkemiddel skaper ulik stemning, sjølv når tema er likt.",
      "Elevane kan bruke stiltrekk frå ein forfattar i ein eigen tekst og grunngi vala.",
    ],
    lareplan: [1, 2, 3, 12, 13],
    forkunnskapar: "Elevane bør ha lese dei fleste av dei ni lesemodulane i Del 5, minst tre eller fire. Sitata på lysbileta og utdraga på lysbilete 9 gir ein felles referanse for dei som har lese færre.",
    forebuing: [
      "Sjå gjennom tabellen på lysbilete 3 og utdraga på lysbilete 9, og vel eit par tekstpar du kan tilrå til elevar som ikkje veit kva dei skal velje.",
      "Finn ut kva tekstar klassen har lese, så du veit kva du kan byggje på.",
      "Ha lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Oppstart", min: 6, gjer: "<p>Mål for timen, oversikt over dei ni tekstane og sitatleiken om kven stilen er.</p>", lysbilete: "2 til 5" },
      { fase: "Verktøy for samanlikning", min: 11, gjer: "<p>Verktøykassa, lang og kort setning, det som ikkje blir sagt, utdraga frå dei ni tekstane og gruppesamtale om to tekstar.</p>", lysbilete: "6 til 10" },
      { fase: "Frå samtale til tekst", min: 6, gjer: "<p>Struktur for ei samanlikning, modellsetninga og kva stiltrekk elevane kan låne.</p>", lysbilete: "11 til 13" },
      { fase: "Skriving", min: 19, gjer: "<p>Elevane skriv samanlikninga i skriveboka, og vel så mellom favoritt og stilskriving.</p>", lysbilete: "14 og 15" },
      { fase: "Avslutning", min: 3, gjer: "<p>Vis vegen til ekte tekstar og ta exit-lappen.</p>", lysbilete: "16" },
    ],
    misoppfatningar: [
      { feil: "«Å samanlikne er å fortelje kva begge tekstane handlar om.»", hjelp: "Ei samanlikning viser kva som er likt og ulikt, og kva det gjer. Vis modellsetninga på lysbilete 12." },
      { feil: "«Tekstane med same tema er like.»", hjelp: "Fosse og Grytten har begge ein ungdom som unngår mor, men stilen er motsett. Tema og stil er to ulike ting." },
      { feil: "«Den beste teksten er den eg likar best.»", hjelp: "Smak er lov i favorittoppgåva, men i samanlikninga skal eleven forklare verknad, ikkje rangere." },
      { feil: "«Alle tekstane i kurset er skrivne av forfattarane.»", hjelp: "Dei fleste er skrivne for kurset i stilen til forfattarane. Berre dei merkte utdraga frå Vinje, Garborg og Duun er ekte." },
    ],
    samtale: [
      "Kva tekst har det tydelegaste stiltrekket, og kvifor hugsar vi han best?",
      "Kvifor handlar så mange av tekstane om det som ikkje blir sagt?",
      "Kan korte og lange setningar skape same stemning?",
      "Kva lærte du om ein stil ved å prøve å skrive i han?",
    ],
    tilpassing: {
      stotte: [
        "Gi eleven eit ferdig tekstpar, til dømes «Jenta og isen» og «Frå hytta», og verktøykassa som skjema.",
        "Gi eleven startsetningar: «Begge tekstane …», «Medan … , …», «Dette gjer at lesaren …».",
        "La eleven samanlikne berre eitt stiltrekk, som setningslengd.",
      ],
      utfordring: [
        "Be eleven samanlikne tre tekstar og finne eit felles tema med ulik stil.",
        "La eleven samanlikne ein kurstekst med ein ekte tekst av same forfattar frå Nettbiblioteket.",
      ],
    },
    vurdering: [
      "Samanlikningsoppgåva viser om eleven bruker fagomgrep og eitt konkret døme frå kvar tekst.",
      "Stilskrivinga viser om eleven har forstått kva stilen består av, særleg i dei tre linjene om kva eleven gjorde for å treffe stilen.",
      "Kjenneteikn på god måloppnåing: eleven samanliknar punkt for punkt, forklarer verknaden av verkemidla og grunngir med sitat.",
    ],
    vidare: "Elevane kan gå tilbake til Møt nynorskforfattarane og lese ein ekte tekst av forfattaren dei valde. Skriveoppgåvene i Del 4 gir høve til å bruke stiltrekka i eigne forteljingar.",
  },
});
