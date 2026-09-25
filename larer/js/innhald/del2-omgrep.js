/* Lærarinnhald for Del 2 · Grunnomgrep. Formatet står i larer/README.md. */

Larar.register("omgrep-ordet", {
  tittelnotat: "Denne timen gir elevane orda dei treng for å snakke om bøying: rot, stamme og ending. Sei det rett ut: dei fleste nynorskfeil sit i endinga, så den som ser kvar stamma sluttar og endinga byrjar, rettar lettare sine eigne feil.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>dele ord i <strong>rot</strong>, <strong>stamme</strong> og <strong>ending</strong></li>
        <li>skilje <strong>bøying</strong> frå <strong>orddanning</strong></li>
        <li>kjenne att <strong>avleiing</strong> og <strong>samansetning</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at omgrepa kjem att i heile Del 2 og i ordboka i Del 3, der ordboka viser nettopp stamme og ending.",
    },
    {
      type: "diskuter",
      title: "Kva bitar er ordet laga av?",
      prompt: `<p class="kjempe midt"><em class="nn">skulegutane</em></p>
        <p class="midt">Del ordet i så mange bitar som mogleg. Kva fortel kvar bit?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">skule</em> + <em class=\"nn\">gut</em> + <em class=\"nn\">ane</em>. <em class=\"nn\">skule</em> er eit eige ord, <em class=\"nn\">gut</em> er rota, og <em class=\"nn\">-ane</em> fortel at det er fleire og bestemt.",
      notes: "Lat elevane gjette fritt. Mange deler i <em>skule</em> og <em>gutane</em>. Spør då: kan <em>gutane</em> delast vidare? Kva er det som gjer at det er fleire gutar?",
    },
    {
      title: "Tre omgrep",
      steps: [
        "<p class=\"stor\"><strong>Rot:</strong> den minste delen med tyding. <em class=\"nn\">gut, kast, fin</em></p>",
        "<p class=\"stor\"><strong>Stamme:</strong> det endinga blir hengd på. <em class=\"nn\">gut-, skulegut-</em></p>",
        "<p class=\"stor\"><strong>Ending:</strong> fortel om <em>forma</em>: tal, bestemtheit, tid, grad. <em class=\"nn\">-ane, -ar, -are</em></p>",
      ],
      notes: "Ofte er stamma lik rota. Skilnaden syner seg først når ordet har eit forledd eller ei etterstaving: i <em>skulegutane</em> er rota <em>gut</em>, men stamma <em>skulegut-</em>. Understrek at endinga ikkje lagar eit nytt ord, berre ei ny form av same ordet.",
    },
    {
      title: "Sjå ordet bli bygd",
      body: `<div class="ordbygg" data-spel>
          <div class="ord">
            <span class="del forledd">skule</span><span class="del rot">gut</span><span class="del ending">ane</span>
          </div>
          <div class="forklar">
            <span class="merk forledd">skule: forledd i samansetninga</span>
            <span class="merk rot">gut: rot, den minste delen med tyding</span>
            <span class="merk ending">-ane: ending, bestemt form fleirtal</span>
          </div>
          <p class="stamme-linje">Stamma er alt før endinga: <em class="nn">skulegut-</em></p>
          <button type="button" class="btn secondary small spel-btn">Spel av på nytt</button>
        </div>`,
      notes: "Figuren spelar av når lysbiletet kjem fram. Trykk «Spel av på nytt» og peik på fargane. Samanlikn med oppgåva dei nettopp diskuterte.",
    },
    {
      type: "sporsmal",
      question: "Kva er <strong>stamma</strong> i <em class=\"nn\">gutane</em>?",
      options: ["<em class=\"nn\">gut-</em>", "<em class=\"nn\">gutane</em>", "<em class=\"nn\">-ane</em>"],
      correct: 0,
      explain: "Stamma er den delen endinga blir hengd på: <em class=\"nn\">gut-</em> + <em class=\"nn\">-ane</em>. Endinga fortel bestemt form fleirtal.",
      notes: "Lat elevane vise svaret med fingrane. Vel nokon <em>-ane</em>, har dei forveksla stamme og ending. Spør: kva del er lik i gut, guten, gutar og gutane?",
    },
    {
      title: "Stamme og ending i praksis",
      body: `<table>
          <thead><tr><th>Ord</th><th>Stamme</th><th>Ending</th><th>Endinga fortel</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">gutane</em></td><td>gut-</td><td>-ane</td><td>bestemt fleirtal</td></tr>
            <tr><td><em class="nn">jenta</em></td><td>jent-</td><td>-a</td><td>bestemt eintal</td></tr>
            <tr><td><em class="nn">kastar</em></td><td>kast-</td><td>-ar</td><td>presens</td></tr>
            <tr><td><em class="nn">høyrde</em></td><td>høyr-</td><td>-de</td><td>preteritum</td></tr>
            <tr><td><em class="nn">finare</em></td><td>fin-</td><td>-are</td><td>komparativ</td></tr>
          </tbody>
        </table>`,
      notes: "Dek over dei to siste kolonnane og lat klassen fylle ut rad for rad før du viser dei. Poenget er at endingane finst i alle dei bøyelege ordklassane: substantiv, verb og adjektiv.",
    },
    {
      title: "Når ordet endar på -e",
      body: `<p class="kjempe midt"><em class="nn">jente</em> → <em class="nn">jent</em> + <em class="nn">a</em> = <em class="nn">jenta</em></p>`,
      steps: [
        "<p><strong>Substantiv:</strong> stryk <em class=\"nn\">-e</em> i grunnforma: <em class=\"nn\">gut-, jent-, epl-</em></p>",
        "<p><strong>Verb:</strong> stryk <em class=\"nn\">-e</em> i infinitiv: <em class=\"nn\">kast-, høyr-, skriv-</em></p>",
        "<p><strong>Adjektiv:</strong> grunnforma er stamma: <em class=\"nn\">fin-, stor-</em></p>",
      ],
      notes: "Den trykklette <em>-e</em>-en fell bort før endinga. Difor heiter det <em>jenta</em> og <em>jenter</em>, ikkje <em>jentea</em>. Kortverb som <em>bu</em> og <em>nå</em> har ingen <em>-e</em> å stryke, så der er infinitiven og stamma like.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">jente</em> blir <em class=\"nn\">jenta</em>. Kva er stamma?",
      options: ["<em class=\"nn\">jent-</em>", "<em class=\"nn\">jente-</em>", "<em class=\"nn\">jenta-</em>"],
      correct: 0,
      explain: "<em class=\"nn\">-e</em>-en i grunnforma fell bort før endinga. Stamma er <em class=\"nn\">jent-</em>, og det gir <em class=\"nn\">jenta</em> og <em class=\"nn\">jenter</em>.",
      notes: "Bruk gjerne spørsmålet til å repetere regelen frå førre lysbilete. Be ein elev forklare kvifor <em>jente-</em> er feil.",
    },
    {
      title: "Kvifor bry seg?",
      body: `<table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kastet</em></td><td><em class="nn">kasta</em></td></tr>
            <tr><td><em class="bm">boken</em></td><td><em class="nn">boka</em></td></tr>
            <tr><td><em class="bm">husene</em></td><td><em class="nn">husa</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"stor midt\">Stamma er den same. Det er <strong>endinga</strong> du må passe på.</p>"],
      notes: "Dette er grunnen til at vi lærer omgrepa. Dei fleste nynorskfeil er endingsfeil. Når elevane les korrektur på eigne tekstar, kan dei spørje seg: er endinga nynorsk?",
    },
    {
      type: "drill",
      title: "Vel rett ending",
      intro: "Les ordet høgt. Klassen seier forma før du viser svaret.",
      spec: { bank: "nouns", filter: { g: ["f", "n"] }, tasks: ["defSg", "defPl"], mode: "choice" },
      n: 6,
      notes: "Oppgåvene er hokjønns- og inkjekjønnsord, der bokmålsendingane oftast sniker seg inn. Be elevane seie kva endinga fortel, til dømes «-a, bestemt eintal hokjønn». Trykk «Nye oppgåver» for ein ny runde.",
    },
    {
      title: "Bøying eller orddanning?",
      body: `<div class="to-kol">
          <div class="boks"><h3>Bøying</h3><p>same ord, ny form</p><p><em class="nn">kaste → kastar → kasta</em></p><p><em class="nn">gut → gutar</em></p></div>
          <div class="boks"><h3>Orddanning</h3><p>eit nytt ord, ny tyding</p><p><em class="nn">kaste → kasting</em></p><p><em class="nn">skule + bok → skulebok</em></p></div>
        </div>`,
      notes: "Bøying hengjer ei ending på stamma, og ordet høyrer framleis til same ordklasse. Orddanning lagar eit nytt ord, ofte i ein ny ordklasse. <em>kasting</em> er eit substantiv, sjølv om det er laga av verbet <em>kaste</em>.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">kastar</em> og <em class=\"nn\">kasting</em>: kva er kva?",
      options: [
        "<em class=\"nn\">kastar</em> er bøying, <em class=\"nn\">kasting</em> er orddanning",
        "Begge er bøying",
        "Begge er orddanning",
      ],
      correct: 0,
      explain: "<em class=\"nn\">kastar</em> er verbet <em class=\"nn\">kaste</em> i presens. <em class=\"nn\">kasting</em> er eit nytt ord, eit substantiv: <em class=\"nn\">ei kasting</em>.",
      notes: "Test med artikkel: kan du seie <em>ei kasting</em>? Ja, altså er det eit substantiv og eit nytt ord. <em>kastar</em> i <em>ho kastar ballen</em> er berre verbet i ei anna form.",
    },
    {
      title: "Avleiing",
      body: "<p class=\"stor\">Vi lagar eit nytt ord med ei <strong>forstaving</strong> eller ei <strong>etterstaving</strong>.</p>",
      steps: [
        "<p class=\"stor\">Forstaving: <em class=\"nn\"><strong>u</strong>farleg, <strong>mis</strong>nøgd, <strong>sam</strong>arbeid</em></p>",
        "<p class=\"stor\">Etterstaving: <em class=\"nn\">kast<strong>ing</strong>, lær<strong>ar</strong>, ven<strong>leg</strong>, søk<strong>nad</strong></em></p>",
      ],
      notes: "Forstavinga endrar tydinga: <em>u-</em> snur henne. Etterstavinga gir ofte ny ordklasse: <em>-ing</em> og <em>-ar</em> gjer verb til substantiv, <em>-leg</em> gjer substantiv til adjektiv. Legg merke til skrivemåten <em>venleg</em> med éin <em>n</em>.",
    },
    {
      title: "Nynorske etterstavingar",
      body: `<table>
          <thead><tr><th>Nynorsk</th><th>Bokmål</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">fri<strong>dom</strong></em></td><td><em class="bm">fri<strong>het</strong></em></td></tr>
            <tr><td><em class="nn">kjær<strong>leik</strong></em></td><td><em class="bm">kjærlig<strong>het</strong></em></td></tr>
            <tr><td><em class="nn">stor<strong>leik</strong></em></td><td><em class="bm">størr<strong>else</strong></em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Nynorsk brukar gjerne <em class=\"nn\">-dom, -leik, -skap, -nad</em> der bokmål har <em class=\"bm\">-het</em> og <em class=\"bm\">-else</em>.</p>"],
      notes: "Dette er nyttig i sidemålsskriving: ser elevane ei bokmålsending som <em>-het</em>, bør dei stoppe opp og finne det nynorske ordet. Spør klassen om dei kjenner fleire, til dømes <em>sjukdom</em> og <em>kunnskap</em>.",
    },
    {
      title: "Samansetning",
      body: `<p class="kjempe midt"><em class="nn">skule + bok = skulebok</em></p>`,
      steps: [
        "<p class=\"stor\"><strong>Sisteleddet bestemmer</strong> kjønn og bøying: <em class=\"nn\">ei skule<strong>bok</strong></em></p>",
        "<p class=\"stor\">Nokre gonger kjem ein bindebokstav: <em class=\"nn\">barn<strong>e</strong>hage, arbeid<strong>s</strong>dag</em></p>",
        "<p class=\"stor\">Alltid i <strong>eitt ord</strong>: <em class=\"nn\">skulebok</em>, ikkje <em class=\"bm\">skule bok</em></p>",
      ],
      notes: "Spør klassen: kva kjønn har <em>fotballag</em>? Sisteleddet er <em>lag</em>, som er inkjekjønn, så det heiter <em>eit fotballag</em>. Særskriving er ein vanleg feil i alle tekstar, uansett målform.",
    },
    {
      type: "sporsmal",
      question: "Kva er <strong>rota</strong> i <em class=\"nn\">sjukdomen</em>?",
      options: ["<em class=\"nn\">sjuk</em>", "<em class=\"nn\">sjukdom</em>", "<em class=\"nn\">dom</em>", "<em class=\"nn\">sjukdomen</em>"],
      correct: 0,
      explain: "<em class=\"nn\">sjuk</em> + etterstavinga <em class=\"nn\">-dom</em> + endinga <em class=\"nn\">-en</em>. Rota er <em class=\"nn\">sjuk</em>, stamma er <em class=\"nn\">sjukdom-</em>.",
      notes: "Dette er det vanskelegaste spørsmålet i timen, fordi rot og stamme ikkje er like. Teikn ordet opp på tavla i tre fargar, som i figuren tidlegare.",
    },
    {
      type: "diskuter",
      title: "Sorter orda",
      prompt: `<p class="stor midt"><em class="nn">gutar · ufarleg · fotball · fridom · kasta · barnehage</em></p>
        <p class="midt">Bøying, avleiing eller samansetning?</p>`,
      form: "Arbeid i par",
      tid: 3,
      svar: "Bøying: <em class=\"nn\">gutar, kasta</em>. Avleiing: <em class=\"nn\">ufarleg, fridom</em>. Samansetning: <em class=\"nn\">fotball, barnehage</em>.",
      notes: "Gi elevane den raske testen: er det same ordet i ei anna form? Då er det bøying. Har ordet fått ny tyding eller ny ordklasse? Då er det orddanning. Er det to ord, er det samansetning.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Gjer sjekkspørsmåla og oppgåvene i modulen.</li>
          <li>Sorter bøying, avleiing og samansetning.</li>
          <li>Start på ordjakta: ti ord delte i stamme og ending.</li>
        </ul>`,
      tid: 12,
      notes: "Gå rundt og be elevane forklare kva endinga fortel. Ordjakta kan gjerast ferdig heime eller i neste time, gjerne med ein tekst frå Del 5.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\"><strong>Stamme + ending</strong>: endinga fortel om forma.</p>",
        "<p class=\"stor\">Ein trykklett <em class=\"nn\">-e</em> fell bort: <em class=\"nn\">jent-a</em>.</p>",
        "<p class=\"stor\"><strong>Bøying</strong> gir ny form, <strong>orddanning</strong> gir nytt ord.</p>",
        "<p class=\"stor\">I samansetningar bestemmer <strong>sisteleddet</strong>.</p>",
      ],
      notes: "Be elevane skrive eitt ord på ein lapp og dele det i stamme og ending før dei går. Lappane viser deg kven som har forstått omgrepa.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen gir elevane dei grunnleggjande omgrepa for oppbygginga av ord: rot, stamme og ending, og skilnaden mellom bøying og orddanning (avleiing og samansetning). Omgrepa er reiskapen elevane treng for å forstå bøyingsmønstera i resten av Del 2 og for å lese ordbokartiklar i Del 3. Hovudbodskapen er praktisk: dei fleste nynorskfeil er endingsfeil, og stamma er den same på bokmål og nynorsk.</p>",
    mal: [
      "Elevane kan dele eit ord i stamme og ending og seie kva endinga fortel.",
      "Elevane kan forklare skilnaden på rot og stamme.",
      "Elevane kan skilje bøying frå orddanning.",
      "Elevane kan kjenne att avleiing og samansetning og veit at sisteleddet bestemmer kjønnet.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Ingen særskilde. Det hjelper om elevane kjenner orda substantiv, verb og adjektiv, men dei blir forklarte i modulen Ordklassane: ei oversikt.",
    forebuing: [
      "Test figuren på lysbilete 5 på tavla, og sjå at knappen «Spel av på nytt» verkar.",
      "Ha tre tusjar i ulike fargar klare, så du kan teikne ord i rot, stamme og ending på tavla.",
      "Ha små lappar klare til exit-lappen til slutt.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og lat elevane dele ordet <em class=\"nn\">skulegutane</em> i bitar.</p>", lysbilete: "2 og 3" },
      { fase: "Rot, stamme og ending", min: 12, gjer: "<p>Innfør dei tre omgrepa med figuren, finn stamma i fleire ord og vis kvifor endinga er det viktigaste på nynorsk. Avslutt med ein tavlerunde på endingar.</p>", lysbilete: "4 til 11" },
      { fase: "Bøying og orddanning", min: 13, gjer: "<p>Skil bøying frå orddanning, gå gjennom avleiing og samansetning, og lat elevane sortere orda i par.</p>", lysbilete: "12 til 18" },
      { fase: "Eigenarbeid", min: 12, gjer: "<p>Elevane arbeider i modulen og startar på ordjakta.</p>", lysbilete: "19" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane dele eitt ord i stamme og ending på ein exit-lapp.</p>", lysbilete: "20" },
    ],
    misoppfatningar: [
      { feil: "«Stamma i <em class=\"nn\">jenta</em> er <em class=\"nn\">jente-</em>.»", hjelp: "Vis at den trykklette <em class=\"nn\">-e</em>-en fell bort før endinga: <em class=\"nn\">jent-a, jent-er, jent-ene</em>. Stamma er det som er likt i alle formene." },
      { feil: "«Rot og stamme er det same.»", hjelp: "Ofte er dei like, men ikkje alltid. I <em class=\"nn\">sjukdomen</em> er rota <em class=\"nn\">sjuk</em> og stamma <em class=\"nn\">sjukdom-</em>. Teikn ordet i tre fargar." },
      { feil: "«<em class=\"nn\">kasting</em> er ei bøyingsform av <em class=\"nn\">kaste</em>.»", hjelp: "Spør om ordet har fått ny ordklasse. <em class=\"nn\">ei kasting</em> er eit substantiv, altså eit nytt ord laga ved avleiing." },
      { feil: "«<em class=\"nn\">skulebok</em> er hankjønn, fordi <em class=\"nn\">skule</em> er hankjønn.»", hjelp: "Det er sisteleddet som bestemmer. <em class=\"nn\">bok</em> er hokjønn, så det heiter <em class=\"nn\">ei skulebok</em>." },
    ],
    samtale: [
      "Kvifor er det nyttig å vite kva som er stamme og kva som er ending når du skriv sidemål?",
      "Kan de finne ord der rota og stamma ikkje er like?",
      "Kvifor trur de nynorsk har <em class=\"nn\">-dom</em> og <em class=\"nn\">-leik</em> der bokmål har <em class=\"bm\">-het</em>?",
      "Kva skjer med tydinga når vi skriv eit samansett ord i to ord?",
    ],
    tilpassing: {
      stotte: [
        "Bruk korte ord med tydeleg ending først: <em class=\"nn\">gutar, huset, kastar</em>.",
        "Lat elevane skrive stamma og endinga i to ulike fargar.",
        "Gi ei huskelapp med dei tre omgrepa og eitt døme på kvart.",
      ],
      utfordring: [
        "Be elevane finne ord med både forstaving, etterstaving og bøyingsending, som <em class=\"nn\">uvenleg</em> eller <em class=\"nn\">samarbeidet</em>.",
        "Lat elevane samle nynorske ord på <em class=\"nn\">-dom, -leik, -skap</em> og <em class=\"nn\">-nad</em> og finne bokmålsorda som svarer til dei.",
      ],
    },
    vurdering: [
      "Tavlespørsmåla og sorteringa i par viser raskt om klassen skil stamme frå ending og bøying frå orddanning.",
      "Ordjakta viser om eleven kan bruke omgrepa på ord frå ekte tekstar.",
      "Kjenneteikn på god måloppnåing: eleven deler ord rett også når rot og stamme er ulike, og forklarer kva endinga fortel med rett fagomgrep.",
    ],
    vidare: "Gå vidare til modulen Ordklassane: ei oversikt og deretter Bøyingsomgrep: substantiv og verb, der endingane blir sette i system.",
  },
});

Larar.register("omgrep-ordklassar", {
  tittelnotat: "Ordklassane er grunnmuren for all grammatikk. Poenget i dag er ikkje å pugge ei liste, men å ha ein test for kvar ordklasse, og å sjå på kva ordet gjer i setninga.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>kjenne att dei <strong>ti ordklassane</strong></li>
        <li>ha ein <strong>test</strong> for kvar av dei</li>
        <li>skilje <strong>bøyelege</strong> frå <strong>ubøyelege</strong></li>
        <li>løyse dei vanlegaste <strong>forvekslingane</strong></li>
      </ul>`,
      notes: "Fortel at ordklassane er nøkkelen til rettskriving: veit du kva ordklasse eit ord høyrer til, veit du kva endingar du må sjekke.",
    },
    {
      type: "diskuter",
      title: "Kva hugsar de?",
      prompt: "<p class=\"stor\">Kor mange ordklassar kan de namngi? Finn eitt døme på kvar.</p>",
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv forslaga på tavla og tel dei opp. Dei fleste hugsar substantiv, verb og adjektiv. Dei små ordklassane, som determinativ og subjunksjon, er det få som hugsar. Det er dei vi skal bruke mest tid på.",
    },
    {
      title: "Ti ordklassar i éi setning",
      body: `<div class="ordklassar" data-spel>
          <p class="ordkl-setning"><span class="ordkl" data-kl="interjeksjon">Au!</span> <span class="ordkl" data-kl="determinativ">Den</span> <span class="ordkl" data-kl="adjektiv">gamle</span> <span class="ordkl" data-kl="substantiv">mannen</span> <span class="ordkl" data-kl="verb">gjekk</span> <span class="ordkl" data-kl="adverb">sakte</span> <span class="ordkl" data-kl="preposisjon">over</span> <span class="ordkl" data-kl="determinativ">den</span> <span class="ordkl" data-kl="adjektiv">lange</span> <span class="ordkl" data-kl="substantiv">brua,</span> <span class="ordkl" data-kl="konjunksjon">men</span> <span class="ordkl" data-kl="pronomen">han</span> <span class="ordkl" data-kl="verb">datt</span> <span class="ordkl" data-kl="adverb">ikkje,</span> <span class="ordkl" data-kl="subjunksjon">fordi</span> <span class="ordkl" data-kl="pronomen">han</span> <span class="ordkl" data-kl="verb">heldt</span> <span class="ordkl" data-kl="pronomen">seg</span> <span class="ordkl" data-kl="preposisjon">i</span> <span class="ordkl" data-kl="substantiv">rekkverket.</span></p>
          <div class="ordkl-legende"><button type="button" class="ordkl-knapp" data-kl="substantiv"><i class="ordkl-farge substantiv"></i>substantiv</button><button type="button" class="ordkl-knapp" data-kl="verb"><i class="ordkl-farge verb"></i>verb</button><button type="button" class="ordkl-knapp" data-kl="adjektiv"><i class="ordkl-farge adjektiv"></i>adjektiv</button><button type="button" class="ordkl-knapp" data-kl="adverb"><i class="ordkl-farge adverb"></i>adverb</button><button type="button" class="ordkl-knapp" data-kl="pronomen"><i class="ordkl-farge pronomen"></i>pronomen</button><button type="button" class="ordkl-knapp" data-kl="determinativ"><i class="ordkl-farge determinativ"></i>determinativ</button><button type="button" class="ordkl-knapp" data-kl="preposisjon"><i class="ordkl-farge preposisjon"></i>preposisjon</button><button type="button" class="ordkl-knapp" data-kl="konjunksjon"><i class="ordkl-farge konjunksjon"></i>konjunksjon</button><button type="button" class="ordkl-knapp" data-kl="subjunksjon"><i class="ordkl-farge subjunksjon"></i>subjunksjon</button><button type="button" class="ordkl-knapp" data-kl="interjeksjon"><i class="ordkl-farge interjeksjon"></i>interjeksjon</button></div>
        </div>`,
      notes: "Trykk på knappane éin etter éin og la klassen seie kva ord som lyser opp. Spør før du trykkjer: kva ord i setninga trur de er verb? Legg merke til at <em>den</em> er determinativ fordi det står saman med eit substantiv.",
    },
    {
      title: "Dei tre store",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Substantiv</h3><p>Kan du setje <em class="nn">ein/ei/eit</em> framfor?</p><p><em class="nn">ein gut, ei bok, eit hus</em></p></div>
          <div class="boks"><h3>Verb</h3><p>Kan du setje <em class="nn">å</em> framfor og bøye i tid?</p><p><em class="nn">å kaste, kastar, kasta</em></p></div>
          <div class="boks"><h3>Adjektiv</h3><p>Kan du gradbøye ordet?</p><p><em class="nn">fin, finare, finast</em></p></div>
        </div>`,
      notes: "Substantiv er namn på personar, ting, stader, kjensler og idear. Minn om at <em>ei glede</em> er eit substantiv sjølv om det er ei kjensle. Adjektiv rettar seg òg etter substantivet: <em>fin, fint, fine</em>.",
    },
    {
      type: "sporsmal",
      question: "Du vil finne ut om eit ord er eit <strong>verb</strong>. Kva test brukar du?",
      options: [
        "Kan du setje <em class=\"nn\">å</em> framfor og bøye i tid?",
        "Kan du setje <em class=\"nn\">ein/ei/eit</em> framfor?",
        "Kan du gradbøye ordet?",
      ],
      correct: 0,
      explain: "<em class=\"nn\">å kaste, kastar, kasta</em>. Artikkeltesten høyrer til substantiv, og gradbøying til adjektiv.",
      notes: "Etter svaret: lat elevane prøve testen på eit par ord høgt, til dømes <em>sove</em> og <em>glede</em>. <em>Glede</em> består begge testane, og det viser at same ordforma kan vere både verb og substantiv.",
    },
    {
      title: "Ord som står til eller i staden for",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Adverb</h3><p>korleis, kvar, når, kor mykje</p><p><em class="nn">ikkje, no, her, ofte</em></p></div>
          <div class="boks"><h3>Pronomen</h3><p>står i staden for eit substantiv</p><p><em class="nn">eg, ho, dei, seg</em></p></div>
          <div class="boks"><h3>Determinativ</h3><p>står saman med eit substantiv</p><p><em class="nn">min bil, denne boka, tre hus</em></p></div>
        </div>`,
      notes: "Pronomentesten: kan du byte ordet ut med eit namn? <em>Ho les</em> blir <em>Kari les</em>. Determinativet fortel kven noko tilhøyrer, kor mange det er, eller kva for eitt det er. Talord og artiklane <em>ein, ei, eit</em> høyrer òg hit.",
    },
    {
      title: "Småorda som bind saman",
      steps: [
        "<p class=\"stor\"><strong>Preposisjon:</strong> eit substantiv etter. <em class=\"nn\">på bordet, til skulen</em></p>",
        "<p class=\"stor\"><strong>Konjunksjon:</strong> bind saman like ledd. <em class=\"nn\">og, men, eller, for</em></p>",
        "<p class=\"stor\"><strong>Subjunksjon:</strong> ei heil setning etter. <em class=\"nn\">at, fordi, dersom</em></p>",
        "<p class=\"stor\"><strong>Interjeksjon:</strong> kan stå åleine. <em class=\"nn\">Au! Ja. Hei!</em></p>",
      ],
      notes: "Hugseregel frå setningslæra: det finst berre fire konjunksjonar, og dei står mellom to ledd som er like, som <em>gut og jente</em>. Subjunksjonen innleier ei leddsetning med subjekt og verbal: <em>fordi vi var trøytte</em>.",
    },
    {
      type: "drill",
      title: "Kva ordklasse er ordet?",
      intro: "Les setninga høgt. Klassen svarer og seier kva test dei brukte.",
      spec: {
        items: [
          { prompt: "Kva ordklasse er «på» i «Boka ligg på bordet»?", accept: ["preposisjon"], options: ["adverb", "konjunksjon"], why: "Det står eit substantiv rett etter: <em class=\"nn\">på bordet</em>." },
          { prompt: "Kva ordklasse er «men» i «Eg kom, men ho gjekk»?", accept: ["konjunksjon"], options: ["subjunksjon", "preposisjon"], why: "<em class=\"nn\">men</em> bind saman to heilsetningar." },
          { prompt: "Kva ordklasse er «fordi» i «Eg kom fordi du bad meg»?", accept: ["subjunksjon"], options: ["konjunksjon", "adverb"], why: "Det kjem ei heil setning etter: <em class=\"nn\">du bad meg</em>." },
          { prompt: "Kva ordklasse er «denne» i «Denne boka er god»?", accept: ["determinativ"], options: ["pronomen", "adjektiv"], why: "<em class=\"nn\">denne</em> står saman med substantivet <em class=\"nn\">boka</em>." },
          { prompt: "Kva ordklasse er «ho» i «Ho les mykje»?", accept: ["pronomen"], options: ["determinativ", "substantiv"], why: "<em class=\"nn\">ho</em> står i staden for eit namn: <em class=\"nn\">Kari les mykje</em>." },
          { prompt: "Kva ordklasse er «raskt» i «Han sprang raskt»?", accept: ["adverb"], options: ["adjektiv", "verb"], why: "<em class=\"nn\">raskt</em> fortel korleis han sprang, og seier noko om verbet." },
          { prompt: "Kva ordklasse er «rask» i «Ein rask bil»?", accept: ["adjektiv"], options: ["adverb", "determinativ"], why: "<em class=\"nn\">rask</em> beskriv substantivet <em class=\"nn\">bil</em>." },
          { prompt: "Kva ordklasse er «au» i «Au, det gjorde vondt!»?", accept: ["interjeksjon"], options: ["adverb", "pronomen"], why: "Eit utrop som kan stå åleine." },
          { prompt: "Kva ordklasse er «ofte» i «Vi et ofte fisk»?", accept: ["adverb"], options: ["adjektiv", "preposisjon"], why: "<em class=\"nn\">ofte</em> svarer på når, og beskriv ikkje eit substantiv." },
          { prompt: "Kva ordklasse er «dei» i «Eg las dei i går»?", accept: ["pronomen"], options: ["determinativ", "konjunksjon"], why: "<em class=\"nn\">dei</em> står i staden for heile substantivfrasen, til dømes <em class=\"nn\">bøkene</em>." },
          { prompt: "Kva ordklasse er «glede» i «Ho kjende stor glede»?", accept: ["substantiv"], options: ["verb", "adjektiv"], why: "Du kan setje artikkel framfor: <em class=\"nn\">ei glede</em>. Her er det namn på ei kjensle." },
          { prompt: "Kva ordklasse er «heldt» i «Han heldt seg i rekkverket»?", accept: ["verb"], options: ["substantiv", "adverb"], why: "<em class=\"nn\">heldt</em> er preteritum av <em class=\"nn\">å halde</em>." },
        ],
        mode: "choice",
      },
      n: 6,
      notes: "Oppgåvene blir trekte tilfeldig frå ei liste på tolv. Krev at elevane grunngir svaret med testen, ikkje berre namnet på ordklassen. Trykk «Nye oppgåver» for ein ny runde.",
    },
    {
      title: "Bøyelege og ubøyelege",
      body: `<div class="to-kol">
          <div class="boks"><h3>Bøyelege</h3><p>substantiv, verb, adjektiv, pronomen, determinativ</p><p><em class="nn">gut, guten, gutar</em></p></div>
          <div class="boks"><h3>Ubøyelege</h3><p>adverb, preposisjon, konjunksjon, subjunksjon, interjeksjon</p><p><em class="nn">på, og, fordi, au</em></p></div>
        </div>`,
      steps: ["<p class=\"stor midt\">Nesten alle nynorskfeil skjer i dei <strong>bøyelege</strong> ordklassane.</p>"],
      notes: "Det er der endingane er. Er eit ord eit substantiv, må eleven sjekke kjønn og fleirtalsending. Er det eit verb, må eleven finne ut om det er a-verb, e-verb eller sterkt. Dei ubøyelege orda lærer ein som gloser: <em>ikke</em> blir <em>ikkje</em>, <em>hvis</em> blir <em>dersom</em> eller <em>viss</em>. Nokre få adverb kan gradbøyast: <em>ofte, oftare, oftast</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva for ein ordklasse er <strong>ubøyeleg</strong>?",
      options: ["Preposisjon", "Substantiv", "Adjektiv", "Pronomen"],
      correct: 0,
      explain: "<em class=\"nn\">på, i, til</em> ser alltid like ut. Pronomen bøyer seg òg: <em class=\"nn\">eg, meg</em> og <em class=\"nn\">ho, henne</em>.",
      notes: "Mange trur pronomen er ubøyelege. Vis at dei har subjekt- og objektform: <em>vi, oss</em>. Determinativ bøyer seg i kjønn og tal: <em>min, mi, mitt, mine</em>.",
    },
    {
      title: "Adjektiv eller adverb?",
      body: `<table>
          <thead><tr><th>Setning</th><th>Beskriv</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">ein <strong>fin</strong> dag</em></td><td>substantivet</td><td>adjektiv</td></tr>
            <tr><td><em class="nn">Ho song <strong>fint</strong>.</em></td><td>verbet</td><td>adverb</td></tr>
            <tr><td><em class="nn">ein <strong>rask</strong> bil</em></td><td>substantivet</td><td>adjektiv</td></tr>
            <tr><td><em class="nn">Han sprang <strong>raskt</strong>.</em></td><td>verbet</td><td>adverb</td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Spør alltid: kva gjer ordet <strong>her</strong>?</p>"],
      notes: "Same ord kan høyre til ulike ordklassar alt etter korleis det blir brukt. Adverbet har ofte same form som adjektivet i inkjekjønn: <em>fint, raskt</em>. Spør: kva slags dag? Då er det adjektiv. Korleis song ho? Då er det adverb.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">Ho song <strong>fint</strong> på konserten.</em> Kva ordklasse er <em class=\"nn\">fint</em>?",
      options: ["Adjektiv", "Adverb", "Verb", "Substantiv"],
      correct: 1,
      explain: "<em class=\"nn\">fint</em> fortel korleis ho song, og seier noko om verbet. I <em class=\"nn\">ein fin konsert</em> er ordet adjektiv.",
      notes: "Mange vel adjektiv fordi dei kjenner ordet <em>fin</em>. Det er nettopp den feilen vi øver på: å sjå på ordet åleine i staden for i setninga.",
    },
    {
      title: "Preposisjon eller subjunksjon?",
      body: `<table>
          <thead><tr><th>Setning</th><th>Etter ordet</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">ut <strong>etter</strong> middagen</em></td><td>substantiv</td><td>preposisjon</td></tr>
            <tr><td><em class="nn">ut <strong>etter at</strong> vi hadde ete</em></td><td>setning</td><td>subjunksjon</td></tr>
            <tr><td><em class="nn">Ho kom <strong>før</strong> deg.</em></td><td>pronomen</td><td>preposisjon</td></tr>
            <tr><td><em class="nn">Ho kom <strong>før</strong> du vakna.</em></td><td>setning</td><td>subjunksjon</td></tr>
          </tbody>
        </table>`,
      notes: "Testen er å sjå på det som kjem etter ordet. Eit substantiv eller eit pronomen gir preposisjon. Ei setning med subjekt og verbal gir subjunksjon. Ord som <em>etter, før, sidan</em> og <em>til</em> kan vere begge delar.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\"><strong>Etter at</strong> vi hadde ete, gjekk vi ut.</em> Kva ordklasse er <em class=\"nn\">etter at</em>?",
      options: ["Preposisjon", "Subjunksjon", "Konjunksjon", "Adverb"],
      correct: 1,
      explain: "Det kjem ei heil setning etter: <em class=\"nn\">vi hadde ete</em>. Då er det subjunksjon.",
      notes: "Be elevane peike ut subjektet og verbalet i det som kjem etter. Finn dei begge, er det ei setning, og då er ordet framfor ein subjunksjon.",
    },
    {
      title: "Determinativ eller pronomen?",
      body: `<table>
          <thead><tr><th>Setning</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td><em class="nn"><strong>Dei</strong> bøkene er gamle.</em></td><td>determinativ</td></tr>
            <tr><td><em class="nn">Eg las <strong>dei</strong> i går.</em></td><td>pronomen</td></tr>
            <tr><td><em class="nn"><strong>Det</strong> huset er stort.</em></td><td>determinativ</td></tr>
            <tr><td><em class="nn"><strong>Det</strong> regnar.</em></td><td>pronomen</td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Står ordet <strong>saman med</strong> eit substantiv, eller <strong>i staden for</strong>?</p>"],
      notes: "Eit determinativ høyrer saman med eit substantiv, anten substantivet står der eller er underforstått: i <em>Bilen er min</em> er <em>min</em> determinativ. Ord som <em>den, det, dei, denne</em> kan vere begge delar, medan <em>eg, du, han, ho, vi, seg</em> alltid er pronomen.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">Har du lese <strong>dei</strong> bøkene?</em> Kva ordklasse er <em class=\"nn\">dei</em>?",
      options: ["Pronomen", "Determinativ", "Adjektiv", "Konjunksjon"],
      correct: 1,
      explain: "<em class=\"nn\">dei</em> står saman med <em class=\"nn\">bøkene</em> og peikar ut kva for nokre bøker. I <em class=\"nn\">Har du lese dei?</em> er det pronomen.",
      notes: "Etter svaret: stryk <em>bøkene</em> på tavla og spør kva ordklasse <em>dei</em> er no. Då står det i staden for substantivet og er pronomen.",
    },
    {
      type: "diskuter",
      title: "Tre gonger «før»",
      prompt: `<p class="stor"><em class="nn">Ho kom <strong>før</strong> deg.</em></p>
        <p class="stor"><em class="nn">Ho kom <strong>før</strong> du vakna.</em></p>
        <p class="stor"><em class="nn">Eg har sett det <strong>før</strong>.</em></p>
        <p>Kva ordklasse er <em class="nn">før</em> i kvar setning? Grunngi med ein test.</p>`,
      form: "Arbeid i par",
      tid: 3,
      svar: "Preposisjon (eit pronomen etter), subjunksjon (ei setning etter) og adverb (fortel når, og har ingenting etter seg).",
      notes: "Dette samlar heile timen: eit ord «er» ikkje ein ordklasse åleine. Lat eit par elevar forklare svaret med testane før du viser løysinga.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Gjer sjekkspørsmåla og sorteringsrundane i modulen.</li>
          <li>Fyll inn namnet på ordklassen i oppgåva med setningane.</li>
          <li>Para saman ordklasse og kjenneteikn til slutt.</li>
        </ul>`,
      tid: 16,
      notes: "Sorteringsrundane blir vanskelegare frå runde 1 til runde 3. Gå rundt og spør «kva test brukte du?» når elevane er usikre. Dei som blir tidleg ferdige, kan finne alle ti ordklassane i ein tekst frå Del 5.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Ti ordklassar, <strong>ein test</strong> for kvar.</p>",
        "<p class=\"stor\">Fem er <strong>bøyelege</strong>: der er endingane og feila.</p>",
        "<p class=\"stor\">Same ord kan høyre til fleire ordklassar.</p>",
        "<p class=\"stor\">Spør alltid: kva gjer ordet <strong>her</strong>?</p>",
      ],
      notes: "Exit-lapp: be elevane skrive éi setning der <em>fint</em> er adjektiv og éi der det er adverb.",
    },
  ],
  guide: {
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen gir ei oversikt over dei ti ordklassane med ein test for kvar, skil mellom bøyelege og ubøyelege ordklassar og tek for seg dei tre vanlegaste forvekslingane: adjektiv og adverb, preposisjon og subjunksjon, determinativ og pronomen. Hovudpoenget er at ordklassen avheng av kva ordet gjer i setninga. Kunnskapen er grunnlaget for bøyingsmodulane i Del 2, fordi det er i dei bøyelege ordklassane nynorskfeila oppstår.</p>",
    mal: [
      "Elevane kan namngi dei ti ordklassane og gi døme på kvar.",
      "Elevane kan bruke ein test for å avgjere ordklassen til eit ord i ei setning.",
      "Elevane kan skilje bøyelege frå ubøyelege ordklassar og forklare kvifor det er nyttig på nynorsk.",
      "Elevane kan skilje adjektiv frå adverb, preposisjon frå subjunksjon og determinativ frå pronomen.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane har arbeidd med ordklassar på barneskulen og kjenner som regel substantiv, verb og adjektiv. Modulen Ordet: stamme, ending og rot er nyttig å ha gjort først, fordi omgrepet ending blir brukt om dei bøyelege ordklassane.",
    forebuing: [
      "Test figuren på lysbilete 4 på tavla, og sjå at knappane for kvar ordklasse lyser opp orda.",
      "Skriv setningane frå lysbilete 17 og 18 på tavla om du vil stryke og endre dei medan du forklarar.",
      "Ha små lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og lat elevane namngi så mange ordklassar dei kan.</p>", lysbilete: "2 og 3" },
      { fase: "Ti ordklassar", min: 15, gjer: "<p>Vis alle ti i figuren, gå gjennom testane i tre grupper og køyr tavleøvinga.</p>", lysbilete: "4 til 9" },
      { fase: "Bøyelege og ubøyelege", min: 5, gjer: "<p>Del ordklassane i to og knyt det til kvar nynorskfeila skjer.</p>", lysbilete: "10 og 11" },
      { fase: "Forvekslingar", min: 15, gjer: "<p>Gå gjennom dei tre forvekslingane med spørsmål til kvar, og avslutt med «før» i tre setningar.</p>", lysbilete: "12 til 18" },
      { fase: "Eigenarbeid", min: 16, gjer: "<p>Elevane arbeider med sorteringsrundane og oppgåvene i modulen.</p>", lysbilete: "19" },
      { fase: "Avslutning", min: 4, gjer: "<p>Oppsummer og lat elevane skrive to setningar med <em class=\"nn\">fint</em> på exit-lappen.</p>", lysbilete: "20" },
    ],
    misoppfatningar: [
      { feil: "«Eit ord har alltid same ordklasse.»", hjelp: "Vis <em class=\"nn\">før</em> i tre setningar: preposisjon, subjunksjon og adverb. Spør alltid kva ordet gjer her." },
      { feil: "«<em class=\"nn\">fint</em> endar på -t, så det er adjektiv i inkjekjønn.»", hjelp: "Spør kva ordet beskriv. I <em class=\"nn\">Ho song fint</em> er det ikkje noko substantiv å beskrive, berre verbet. Då er det adverb." },
      { feil: "«Alle småord er pronomen.»", hjelp: "Skil mellom å stå saman med eit substantiv (determinativ: <em class=\"nn\">min bil</em>) og å stå i staden for eit substantiv (pronomen: <em class=\"nn\">han</em>)." },
      { feil: "«Kjensler og idear kan ikkje vere substantiv.»", hjelp: "Bruk artikkeltesten: <em class=\"nn\">ei glede, ein idé, ein fridom</em>. Består ordet testen, er det substantiv." },
    ],
    samtale: [
      "Kvifor er det meir nyttig å ha ein test enn å pugge ei liste med ord?",
      "Kvifor trur de dei fleste nynorskfeila skjer i dei bøyelege ordklassane?",
      "Kan de finne andre ord som kan høyre til fleire ordklassar?",
      "Kva ordklassar finst i andre språk de kan, og har dei same testane?",
    ],
    tilpassing: {
      stotte: [
        "Start med dei tre store ordklassane og legg til dei andre gradvis, slik sorteringsrundane i modulen gjer.",
        "Gi elevane ei huskelapp med testen for kvar ordklasse.",
        "Bruk same fargar som i figuren når elevane markerer ord i ein tekst.",
      ],
      utfordring: [
        "Be elevane skrive ei setning der alle ti ordklassane er med, slik som i figuren.",
        "Lat elevane finne ord som kan vere både preposisjon, subjunksjon og adverb, og lage setningar til kvar bruk.",
      ],
    },
    vurdering: [
      "Tavleøvinga og spørsmåla viser om elevane brukar testane eller gjettar ut frå ordet åleine.",
      "Sorteringsrundane i modulen viser kva ordklassar den enkelte eleven meistrar.",
      "Kjenneteikn på god måloppnåing: eleven avgjer ordklassen ut frå funksjonen i setninga og grunngir svaret med ein test.",
    ],
    vidare: "Gå vidare til Bøyingsomgrep: substantiv og verb, og deretter til bøyingsmodulane i Del 2. Setningslæra i Grunnomgrep byggjer vidare på skiljet mellom konjunksjon og subjunksjon.",
  },
});

Larar.register("omgrep-boying", {
  tittelnotat: "Denne timen handlar om omgrepa bak bøyingstabellane. Elevane skal forstå kva orda kjønn, bestemtheit, tempus og partisipp tyder, så dei kan lese ordboka og snakke presist om feila sine.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>forstå <strong>kjønn</strong>, <strong>tal</strong> og <strong>bestemtheit</strong></li>
        <li>kjenne <strong>tempus</strong>, <strong>partisipp</strong> og <strong>imperativ</strong></li>
        <li>skilje <strong>sterke</strong> og <strong>svake</strong> verb</li>
        <li>finne <strong>verbklassen</strong> med ein tommelfingerregel</li>
      </ul>`,
      notes: "Fortel at dette er omgrepa ordboka og rettleiingane i kurset brukar. Målet er ikkje å pugge tabellar, men å forstå kva tabellane seier.",
    },
    {
      type: "diskuter",
      title: "Kva fortel ordboka?",
      prompt: `<p class="kjempe midt"><em class="nn">bok</em> f. -a, bøker, bøkene</p>
        <p class="midt">Kva tyder kvar del av oppslaget?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<strong>f.</strong> = hokjønn (<em class=\"nn\">ei bok</em>). <strong>-a</strong> = bestemt eintal (<em class=\"nn\">boka</em>). <em class=\"nn\">bøker</em> = ubestemt fleirtal. <em class=\"nn\">bøkene</em> = bestemt fleirtal.",
      notes: "Lat elevane gjette. Mange veit ikkje at f. står for femininum, altså hokjønn. Etter timen skal dei kunne lese heile oppslaget.",
    },
    {
      title: "Tre kjønn",
      body: `<div class="kjonnkort">
          <div class="kort han"><span class="artikkel">ein</span><span class="ord">gut</span><span class="former">guten · gutar · gutane</span></div>
          <div class="kort ho"><span class="artikkel">ei</span><span class="ord">jente</span><span class="former">jenta · jenter · jentene</span></div>
          <div class="kort inkje"><span class="artikkel">eit</span><span class="ord">hus</span><span class="former">huset · hus · husa</span></div>
        </div>`,
      steps: [
        "<p class=\"midt\">Kjønn har ingenting med biologi å gjere. Det avgjer <strong>artikkel</strong> og <strong>endingar</strong>.</p>",
        "<p class=\"midt stor\">På nynorsk <strong>må</strong> du bruke alle tre.</p>",
      ],
      notes: "<em>Ei bok</em> er ikkje meir kvinneleg enn <em>ein stol</em>. Mange bokmålsbrukarar skriv berre hankjønn og inkjekjønn. På nynorsk er hokjønn obligatorisk, og det er hokjønnsorda som oftast blir feil.",
    },
    {
      title: "Tal og bestemtheit",
      body: `<div class="former" data-spel>
          <div class="form"><span class="etikett">ubestemt eintal</span><span class="ordform">ein <b>gut</b></span></div>
          <div class="form"><span class="etikett">bestemt eintal</span><span class="ordform">gut<b>en</b></span></div>
          <div class="form"><span class="etikett">ubestemt fleirtal</span><span class="ordform">gut<b>ar</b></span></div>
          <div class="form"><span class="etikett">bestemt fleirtal</span><span class="ordform">gut<b>ane</b></span></div>
        </div>`,
      steps: [
        "<p><strong>Tal:</strong> éin eller fleire. Eintal eller fleirtal.</p>",
        "<p><strong>Bestemtheit:</strong> noko nytt og tilfeldig (<em class=\"nn\">ein gut</em>) eller noko kjent (<em class=\"nn\">guten</em>).</p>",
      ],
      notes: "Tal og bestemtheit gir til saman fire former. Stamma <em>gut-</em> står i ro, og det er berre endinga som skifter. På norsk ligg bestemtheita i endinga, ikkje i ein eigen artikkel som på engelsk <em>the</em>.",
    },
    {
      title: "Dei fire formene",
      body: `<table>
          <thead><tr><th></th><th>ubest. eintal</th><th>best. eintal</th><th>ubest. fleirtal</th><th>best. fleirtal</th></tr></thead>
          <tbody>
            <tr><td>han</td><td><em class="nn">ein gut</em></td><td><em class="nn">guten</em></td><td><em class="nn">gutar</em></td><td><em class="nn">gutane</em></td></tr>
            <tr><td>ho</td><td><em class="nn">ei jente</em></td><td><em class="nn"><strong>jenta</strong></em></td><td><em class="nn">jenter</em></td><td><em class="nn">jentene</em></td></tr>
            <tr><td>inkje</td><td><em class="nn">eit hus</em></td><td><em class="nn">huset</em></td><td><em class="nn">hus</em></td><td><em class="nn"><strong>husa</strong></em></td></tr>
          </tbody>
        </table>`,
      steps: [
        "<p class=\"stor\">Hokjønn bestemt eintal: <em class=\"nn\">-a</em>. <em class=\"nn\">boka</em>, ikkje <em class=\"bm\">boken</em></p>",
        "<p class=\"stor\">Inkjekjønn bestemt fleirtal: <em class=\"nn\">-a</em>. <em class=\"nn\">husa</em>, ikkje <em class=\"bm\">husene</em></p>",
      ],
      notes: "Dei to utheva formene er dei bokmålselevar oftast bommar på. Peik på dei og be klassen seie fleire døme: <em>sola, jenta, epla, barna</em>. Legg merke til at inkjekjønn ubestemt fleirtal er lik eintal: <em>eit hus, mange hus</em>.",
    },
    {
      type: "drill",
      title: "Kjønn og former",
      intro: "Klassen svarer i kor før du viser svaret.",
      spec: { bank: "nouns", tasks: ["gender", "defSg", "defPl"], mode: "choice" },
      n: 6,
      notes: "Oppgåvene er trekte frå ordbanken, så runden blir ny kvar gong. Be elevane seie kjønnet høgt før dei vel form, til dømes «ei bok, så boka».",
    },
    {
      title: "Eigedom utan s-genitiv",
      body: `<table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Karis bok</em></td><td><em class="nn">boka til Kari</em></td><td><em class="nn">Kari si bok</em></td></tr>
            <tr><td><em class="bm">guttens sykkel</em></td><td><em class="nn">sykkelen til guten</em></td><td><em class="nn">guten sin sykkel</em></td></tr>
            <tr><td><em class="bm">barnas rom</em></td><td><em class="nn">rommet til barna</em></td><td><em class="nn">barna sitt rom</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt stor\"><em class=\"nn\">sin, si, sitt, sine</em> rettar seg etter <strong>det som blir eigd</strong>.</p>"],
      notes: "På nynorsk skal vi vanlegvis ikkje bruke s-genitiv. Gå gjennom rekkja: <em>Kari sin bil</em> (hankjønn), <em>Kari si bok</em> (hokjønn), <em>Kari sitt hus</em> (inkjekjønn), <em>Kari sine bøker</em> (fleirtal). Her får elevane bruk for kjønnet dei nettopp har øvd på.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett på nynorsk?",
      options: ["<em class=\"nn\">Kari si bok</em>", "<em class=\"nn\">Kari sin bok</em>", "<em class=\"bm\">Karis bok</em>"],
      correct: 0,
      explain: "<em class=\"nn\">bok</em> er hokjønn, så det må vere <em class=\"nn\">si</em>. <em class=\"nn\">boka til Kari</em> er òg rett.",
      notes: "Den vanlegaste feilen er <em>sin</em> på alle ord. Spør: kva er det Kari eig? Kva kjønn har det ordet?",
    },
    {
      title: "Finitt og infinitt",
      body: `<div class="to-kol">
          <div class="boks"><h3>Finitte</h3><p>bøygde i tid, eller imperativ</p><p><em class="nn">kastar, kasta, kast!</em></p></div>
          <div class="boks"><h3>Infinitte</h3><p>fortel ikkje tid åleine</p><p><em class="nn">(å) kaste, (har) kasta, kastande</em></p></div>
        </div>`,
      steps: ["<p class=\"stor midt\">Ei setning treng eit <strong>finitt</strong> verb.</p>"],
      notes: "Infinitiv er forma du finn i ordboka, den som kan ha <em>å</em> framfor seg. Dei infinitte formene treng eit hjelpeverb for å fortelje tid: <em>har kasta, skal kaste</em>. Knyt det til setningslæra: verbalet i ei setning inneheld alltid eit finitt verb.",
    },
    {
      type: "sporsmal",
      question: "Er <em class=\"nn\">kastar</em> finitt eller infinitt?",
      options: ["Finitt, for det er bøygd i tid", "Infinitt, for det kan stå etter <em class=\"nn\">har</em>", "Infinitt, for det er grunnforma"],
      correct: 0,
      explain: "<em class=\"nn\">kastar</em> står i presens og er finitt. <em class=\"nn\">(å) kaste</em> og <em class=\"nn\">(har) kasta</em> er infinitte.",
      notes: "Den som vel det andre svaret, har blanda <em>kastar</em> og <em>kasta</em>. Det er ein god inngang til tempus på neste lysbilete.",
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
      steps: ["<p class=\"midt\">Enkle tider: éi verbform. Samansette tider: <em class=\"nn\">har/hadde</em> + perfektum partisipp.</p>"],
      notes: "Gå frå venstre mot høgre og lag ei setning til kvar form: <em>Eg hadde kasta ballen då du kom. Eg kasta ballen i går. Eg har kasta ballen, så no er han borte. Eg kastar ballen.</em> Framtid lagar vi med <em>skal</em> eller <em>vil</em> pluss infinitiv.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">Eg <strong>hadde kasta</strong> ballen då du kom.</em> Kva tempus?",
      options: ["Preteritum perfektum", "Presens perfektum", "Preteritum"],
      correct: 0,
      explain: "<em class=\"nn\">hadde</em> + perfektum partisipp: noko som var ferdig før noko anna i fortida. Med <em class=\"nn\">har</em> hadde det vore presens perfektum.",
      notes: "Hugseregel: namnet på den samansette tida kjem frå hjelpeverbet. <em>har</em> står i presens, altså presens perfektum. <em>hadde</em> står i preteritum, altså preteritum perfektum.",
    },
    {
      title: "Partisipp og imperativ",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Perfektum partisipp</h3><p><em class="nn">har skrive</em></p><p><em class="nn">eit skrive brev</em></p></div>
          <div class="boks"><h3>Presens partisipp</h3><p>alltid <em class="nn">-ande</em></p><p><em class="nn">ein syngjande fugl</em></p></div>
          <div class="boks"><h3>Imperativ</h3><p>lik stamma</p><p><em class="nn">kom! skriv! kast!</em></p></div>
        </div>`,
      notes: "Perfektum partisipp står etter <em>har</em> og <em>hadde</em>, og kan brukast som adjektiv: <em>ein skriven tekst, eit skrive brev, skrivne tekstar</em>. Presens partisipp har <em>-ende</em> på bokmål, men alltid <em>-ande</em> på nynorsk. Imperativ er infinitiv utan <em>-e</em>. Kortverb er like i infinitiv og imperativ: <em>bu her!</em>",
    },
    {
      title: "Sterke og svake verb",
      body: `<div class="vokalskifte" data-spel>
          <div class="vs-rad svak"><span class="vs-namn">svakt verb: ending</span><span class="vs-form">kast<b>ar</b></span><span class="vs-pil">→</span><span class="vs-form">kast<b>a</b></span><span class="vs-pil">→</span><span class="vs-form">har kast<b>a</b></span></div>
          <div class="vs-rad sterk"><span class="vs-namn">sterkt verb: vokalskifte</span><span class="vs-form">skr<b>i</b>v</span><span class="vs-pil">→</span><span class="vs-form">skr<b>ei</b>v</span><span class="vs-pil">→</span><span class="vs-form">har skr<b>i</b>ve</span></div>
          <div class="vs-rad sterk"><span class="vs-namn"></span><span class="vs-form">f<b>i</b>nn</span><span class="vs-pil">→</span><span class="vs-form">f<b>a</b>nn</span><span class="vs-pil">→</span><span class="vs-form">har f<b>u</b>nne</span></div>
        </div>`,
      steps: [
        "<p class=\"stor\"><strong>Svake:</strong> ending i preteritum. <em class=\"nn\">kasta, høyrde, kjøpte, budde</em></p>",
        "<p class=\"stor\"><strong>Sterke:</strong> inga ending, ny vokal. <em class=\"nn\">skreiv, fann, åt, såg</em></p>",
      ],
      notes: "Skiljet går på preteritum. Sterke verb har heller ingen <em>-ar</em> eller <em>-er</em> i presens: <em>skriv, finn, et, ser</em>. Spør klassen om fleire sterke verb dei kjenner, til dømes <em>drikke, drakk</em> og <em>sove, sov</em>.",
    },
    {
      title: "Kva verbklasse er det?",
      body: `<div class="vegvisar">
          <div class="vv-start">Kva endar verbet på i preteritum på bokmål?</div>
          <div class="vv-greiner">
            <div class="vv-grein"><span class="vv-val"><em class="bm">-et</em> / <em class="bm">-a</em></span><span class="vv-pil">↓</span><span class="vv-svar a">a-verb<small>kasta · kastar</small></span></div>
            <div class="vv-grein"><span class="vv-val"><em class="bm">-te</em> / <em class="bm">-de</em></span><span class="vv-pil">↓</span><span class="vv-svar e">e-verb<small>kjøpte · kjøper</small></span></div>
            <div class="vv-grein"><span class="vv-val"><em class="bm">-dde</em></span><span class="vv-pil">↓</span><span class="vv-svar kort">kortverb<small>budde · bur</small></span></div>
            <div class="vv-grein"><span class="vv-val">ny vokal, inga ending</span><span class="vv-pil">↓</span><span class="vv-svar sterk">sterkt verb<small>skreiv · skriv</small></span></div>
          </div>
        </div>`,
      notes: "Tommelfingerregelen: bruk bokmålsforma i preteritum som nøkkel. <em>kastet</em> gir a-verbet <em>kasta</em>, <em>hørte</em> gir e-verbet <em>høyrde</em>, <em>bodde</em> gir kortverbet <em>budde</em>. Regelen dekkjer dei aller fleste verba. Har bokmål to former, som <em>bygde</em> og <em>bygget</em>, må ein slå opp.",
    },
    {
      type: "sporsmal",
      question: "Bokmål har <em class=\"bm\">hun hoppet</em>. Kva blir det på nynorsk?",
      options: ["<em class=\"nn\">ho hoppa</em> (a-verb)", "<em class=\"nn\">ho hoppte</em> (e-verb)", "<em class=\"nn\">ho hoppde</em> (e-verb)", "<em class=\"nn\">ho hopp</em> (sterkt verb)"],
      correct: 0,
      explain: "Bokmål <em class=\"bm\">-et</em> gir a-verb: <em class=\"nn\">hoppe · hoppar · hoppa · har hoppa</em>.",
      notes: "Lat elevane gå gjennom vegvisaren høgt: kva endar verbet på i preteritum på bokmål? <em>-et</em>. Då er det a-verb, og presens blir <em>hoppar</em>.",
    },
    {
      title: "J-verb og kortverb",
      body: `<div class="to-kol">
          <div class="boks"><h3>J-verb</h3><p><em class="nn">spørje · spør · spurde · har spurt</em></p><p><em class="nn">velje · vel · valde · har valt</em></p><p class="liten">mistar j-en, inga ending i presens</p></div>
          <div class="boks"><h3>Kortverb</h3><p><em class="nn">bu · bur · budde · har budd</em></p><p><em class="nn">nå · når · nådde · har nådd</em></p><p class="liten">-r, -dde, -dd</p></div>
        </div>`,
      steps: ["<p class=\"midt\">Pass på: <em class=\"nn\">gå, få, stå, sjå, ha</em> er korte, men <strong>ikkje</strong> kortverb: <em class=\"nn\">gå · går · gjekk · har gått</em></p>"],
      notes: "J-verb skiftar ofte vokal, men dei er likevel svake, fordi dei har ending i preteritum: <em>spurde, valde</em>. Spør klassen: kvifor er <em>spørje</em> eit svakt verb? Kortverb har berre éi staving og ingen <em>-e</em> i infinitiv.",
    },
    {
      type: "drill",
      title: "Kva slags verb?",
      intro: "Tenk på preteritum. Klassen svarer før du viser løysinga.",
      spec: { bank: "verbs", filter: { cls: ["a", "e", "j", "kort", "sterk"] }, tasks: ["cls"], mode: "choice" },
      n: 6,
      notes: "Be elevane seie preteritumsforma høgt før dei vel klasse. Løysinga viser heile rekkja, så les henne opp saman med klassen.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Gjer sjekkspørsmåla i modulen.</li>
          <li>Bøy heile rekkja og sorter setningane etter tempus.</li>
          <li>Øv på j-verb og kortverb, og omset setninga til slutt.</li>
        </ul>`,
      tid: 13,
      notes: "Gå rundt og be elevane bruke omgrepa når dei forklarer, til dømes «det er preteritum av eit e-verb». Dei som blir tidleg ferdige, kan ta mengdetreninga for substantiv og verb.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Tre kjønn: bruk <strong>alle tre</strong>.</p>",
        "<p class=\"stor\"><em class=\"nn\">boka</em> og <em class=\"nn\">husa</em>: to viktige <em class=\"nn\">-a</em>-endingar.</p>",
        "<p class=\"stor\"><strong>Svake</strong> verb får ending, <strong>sterke</strong> skiftar vokal.</p>",
        "<p class=\"stor\">Bokmålspreteritum er nøkkelen til verbklassen.</p>",
      ],
      notes: "Exit-lapp: be elevane skrive eitt substantiv i alle fire formene og eitt verb i infinitiv, presens, preteritum og presens perfektum.",
    },
  ],
  guide: {
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen forklarar omgrepa bak bøyinga av substantiv og verb: kjønn, tal og bestemtheit, eigedom utan s-genitiv, finitte og infinitte former, tempus, partisipp, imperativ, sterke og svake verb og dei små gruppene j-verb og kortverb. Målet er at elevane skal forstå kva omgrepa tyder, ikkje berre kjenne tabellane, slik at dei kan lese ordboka, forstå tilbakemeldingar og bruke fagspråk om eigne feil.</p>",
    mal: [
      "Elevane kan forklare kjønn, tal og bestemtheit og bøye substantiv i alle fire formene.",
      "Elevane kan uttrykkje eigedom på nynorsk utan s-genitiv.",
      "Elevane kan skilje finitte og infinitte verbformer og namngi dei fire tempusa.",
      "Elevane kan skilje sterke og svake verb og finne verbklassen med bokmålspreteritum som nøkkel.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kjenne omgrepa stamme og ending frå modulen Ordet: stamme, ending og rot, og kunne kjenne att substantiv og verb frå modulen Ordklassane: ei oversikt.",
    forebuing: [
      "Test figurane på lysbilete 5, 12 og 15 på tavla.",
      "Ha ei ordbok eller ordbokene.no klar, så du kan vise eit ekte oppslag etter lysbilete 3.",
      "Ha små lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og lat elevane tolke ordbokoppslaget.</p>", lysbilete: "2 og 3" },
      { fase: "Substantiv", min: 14, gjer: "<p>Gå gjennom kjønn, tal og bestemtheit og dei fire formene, køyr tavleøvinga og vis eigedom utan s-genitiv.</p>", lysbilete: "4 til 9" },
      { fase: "Verbformer", min: 14, gjer: "<p>Skil finitte og infinitte former, gå gjennom tempuslinja og vis partisipp og imperativ.</p>", lysbilete: "10 til 14" },
      { fase: "Verbklassar", min: 12, gjer: "<p>Vis sterke og svake verb, bruk vegvisaren, gå gjennom j-verb og kortverb, og køyr tavleøvinga.</p>", lysbilete: "15 til 19" },
      { fase: "Eigenarbeid", min: 13, gjer: "<p>Elevane arbeider med oppgåvene i modulen.</p>", lysbilete: "20" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane bøye eitt substantiv og eitt verb på exit-lappen.</p>", lysbilete: "21" },
    ],
    misoppfatningar: [
      { feil: "«Kjønnet har med biologi å gjere.»", hjelp: "Kjønn er eit grammatisk merke som styrer artikkel og endingar. <em class=\"nn\">ei bok</em> er ikkje meir kvinneleg enn <em class=\"nn\">ein stol</em>." },
      { feil: "«<em class=\"bm\">boken</em> og <em class=\"bm\">husene</em> er rett på nynorsk.»", hjelp: "Hokjønn bestemt eintal og inkjekjønn bestemt fleirtal får begge <em class=\"nn\">-a</em>: <em class=\"nn\">boka, husa</em>. Øv med kjønnskorta." },
      { feil: "«Det heiter <em class=\"nn\">Kari sin bok</em>.»", hjelp: "<em class=\"nn\">sin, si, sitt, sine</em> rettar seg etter det som blir eigd. <em class=\"nn\">bok</em> er hokjønn, så det blir <em class=\"nn\">Kari si bok</em>, eller <em class=\"nn\">boka til Kari</em>." },
      { feil: "«<em class=\"nn\">spørje</em> er sterkt fordi det skiftar vokal.»", hjelp: "Skiljet går på om preteritum har ending. <em class=\"nn\">spurde</em> har <em class=\"nn\">-de</em>, så verbet er svakt." },
      { feil: "«<em class=\"nn\">gå</em> og <em class=\"nn\">sjå</em> er kortverb.»", hjelp: "Dei er korte, men bøyer seg annleis: <em class=\"nn\">gå, går, gjekk, har gått</em>. Kortverb har <em class=\"nn\">-dde</em> i preteritum, som <em class=\"nn\">budde</em>." },
    ],
    samtale: [
      "Kvifor er hokjønn vanskelegare for dei som skriv bokmål til vanleg?",
      "Kva er skilnaden på «eg kasta ballen» og «eg har kasta ballen»?",
      "Kvifor fungerer bokmålspreteritum som nøkkel til verbklassen på nynorsk?",
      "Kva er fordelen med å kunne namna på formene når du får tilbakemelding på ein tekst?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane kjønnskorta og tempuslinja som huskelapp.",
        "Lat elevane arbeide med eitt ord av kvart kjønn og eitt verb av kvar klasse før dei tek fleire.",
        "Bruk vegvisaren som sjekkliste når elevane er usikre på eit verb.",
      ],
      utfordring: [
        "Be elevane lage ein eigen vegvisar for substantiv: korleis finn du kjønnet når du ikkje veit det?",
        "Lat elevane finne sterke verb i ein tekst frå Del 5 og skrive heile bøyingsrekkja for kvart av dei.",
      ],
    },
    vurdering: [
      "Tavleøvingane viser om klassen held kjønna og verbklassane frå kvarandre.",
      "Oppgåvene med bøyingsrekkjer og tempus i modulen viser om den enkelte eleven kan bruke omgrepa.",
      "Kjenneteikn på god måloppnåing: eleven bøyer substantiv rett i alle tre kjønn, skil tempusa og forklarer verbklassen med rett fagomgrep.",
    ],
    vidare: "Gå vidare til bøyingsmodulane i Del 2, der substantiv og verb blir øvde grundig, og til mengdetreninga for substantiv og verb. Ordbokmodulane i Del 3 byggjer på at elevane kan lese forkortingar som f. og -a.",
  },
});

Larar.register("omgrep-setning", {
  tittelnotat: "Setningslære kan kjennast tørt, men det er denne kunnskapen som gjer at elevane kan rette ordstilling, då/når og samsvar i eigne tekstar. Sei det høgt: i dag lærer vi verktøy vi skal bruke når vi skriv.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>finne <strong>setningsledda</strong> med faste spørsmål</li>
        <li>skilje <strong>heilsetning</strong> frå <strong>leddsetning</strong></li>
        <li>velje rett mellom <em class="nn">då</em> og <em class="nn">når</em></li>
        <li>setje <strong>verbalet på andreplass</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at alt dette kjem att i Typiske feil i Del 4, der elevane skal finne feila i eigne tekstar.",
    },
    {
      type: "diskuter",
      title: "Kva er ei setning?",
      prompt: `<p>Kva av desse er setningar?</p>
        <p><em class="nn">Kari les.</em> &nbsp;·&nbsp; <em class="nn">I går.</em> &nbsp;·&nbsp; <em class="nn">Kom!</em> &nbsp;·&nbsp; <em class="nn">fordi det regna</em></p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">Kari les</em> og <em class=\"nn\">Kom!</em> er setningar: dei har eit verbal og kan stå åleine. <em class=\"nn\">I går</em> manglar verbal. <em class=\"nn\">fordi det regna</em> har verbal, men kan ikkje stå åleine: det er ei leddsetning.",
      notes: "Lat elevane gjette før du viser svaret. Poenget er at ei setning treng eit verbal, og at nokre setningar ikkje kan stå åleine. Det siste kjem vi tilbake til.",
    },
    {
      title: "Setningsledda",
      body: `<div class="leddsetning">
          <span class="ledd subjekt">Kari<small>subjekt</small></span>
          <span class="ledd verbal">gav<small>verbal</small></span>
          <span class="ledd iobj">guten<small>indirekte objekt</small></span>
          <span class="ledd objekt">ei bok<small>objekt</small></span>
          <span class="ledd adverbial">i går<small>adverbial</small></span>
        </div>`,
      steps: [
        "<p><strong>Verbal:</strong> kva skjer? Alltid eit verb.</p>",
        "<p><strong>Subjekt:</strong> kven eller kva gjer det?</p>",
        "<p><strong>Objekt:</strong> kven eller kva går handlinga ut over? <strong>Indirekte objekt:</strong> til kven?</p>",
        "<p><strong>Adverbial:</strong> kvar, når, korleis eller kvifor?</p>",
      ],
      notes: "Eit ledd kan vere eitt ord eller fleire ord som høyrer saman, som <em>ei bok</em>. Vis eitt steg om gongen og peik på fargen i figuren.",
    },
    {
      title: "Spør alltid i same rekkjefølgje",
      steps: [
        "<p class=\"stor\">1. Finn <strong>verbalet</strong>. Kva skjer?</p>",
        "<p class=\"stor\">2. <strong>Kven/kva</strong> + verbal? → subjektet</p>",
        "<p class=\"stor\">3. <strong>Kven/kva</strong> + subjekt + verbal? → objektet</p>",
        "<p class=\"stor\">4. Er verbalet <em class=\"nn\">er, blir, heiter</em>? → <strong>predikativ</strong></p>",
        "<p class=\"stor\">5. Resten: kvar, når, korleis, kvifor → <strong>adverbial</strong></p>",
      ],
      notes: "Dette er framgangsmåten elevane skal kunne utanåt. Det vanlegaste problemet er at dei startar med subjektet. Seier dei «Kari er subjektet fordi ho står først», svar med ei setning der subjektet ikkje står først: <em>I går kjøpte guten sko</em>.",
    },
    {
      title: "Vi analyserer saman",
      body: `<div class="analyse" data-analyse>
          <p class="an-setning">
            <span class="an-ord" data-ledd="adverbial">I går</span>
            <span class="an-ord" data-ledd="verbal">kjøpte</span>
            <span class="an-ord" data-ledd="subjekt">guten</span>
            <span class="an-ord" data-ledd="objekt">nye sko</span>
            <span class="an-ord" data-ledd="adverbial">på senteret.</span>
          </p>
          <p class="an-spm">Trykk «Neste steg» og analyser setninga i rett rekkjefølgje.</p>
          <div class="btn-row"><button type="button" class="btn secondary small an-neste">Neste steg</button><button type="button" class="btn secondary small an-start" hidden>Start på nytt</button></div>
        </div>`,
      notes: "Spør klassen før du trykkjer på «Neste steg» kvar gong: kva er verbalet? Kven kjøpte? Legg merke til at subjektet står etter verbalet her, fordi setninga byrjar med eit adverbial. Det er V2-regelen, som kjem seinare i timen.",
    },
    {
      type: "sporsmal",
      question: "Kva ledd er <em class=\"nn\">guten</em> i <em class=\"nn\">Kari gav guten ei bok</em>?",
      options: ["Subjekt", "Objekt", "Indirekte objekt", "Adverbial"],
      correct: 2,
      explain: "Spør «til kven?». Kari gav ei bok til guten, så <em class=\"nn\">guten</em> er indirekte objekt. <em class=\"nn\">ei bok</em> er objektet.",
      notes: "Lat elevane vise svaret med fingrane: ein til fire. Mange vel objekt. Spør då: kva gav Kari? Svaret er boka, ikkje guten.",
    },
    {
      title: "Predikativet rettar seg etter subjektet",
      body: "<p>Etter <em class=\"nn\">er, blir, verte, heiter</em> kjem eit predikativ. Er det eit adjektiv, bøyer vi det etter subjektet.</p>",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">Bilen er <strong>stor</strong>.</em> <span class=\"liten\">hankjønn eintal</span></p>",
        "<p class=\"stor\"><em class=\"nn\">Huset er <strong>stort</strong>.</em> <span class=\"liten\">inkjekjønn eintal: -t</span></p>",
        "<p class=\"stor\"><em class=\"nn\">Bøkene er <strong>gamle</strong>.</em> <span class=\"liten\">fleirtal: -e</span></p>",
      ],
      notes: "Feilen skjer fordi adjektivet står langt frå substantivet. Tips til elevane: finn subjektet, og tenk deg adjektivet framfor det. <em>eit stort hus</em> gir <em>huset er stort</em>.",
    },
    {
      type: "drill",
      title: "Kva ledd er det?",
      intro: "Les setninga høgt. Klassen svarer før du viser løysinga.",
      spec: { bank: "sentences", set: ["ledd"], mode: "choice" },
      n: 5,
      notes: "Oppgåvene blir trekte tilfeldig frå ordbanken, så du får nye kvar gong. Trykk «Nye oppgåver» om du vil ta ein runde til. Be elevane grunngi svaret med spørsmålet dei stilte.",
    },
    {
      title: "Heilsetning og leddsetning",
      body: `<div class="setningsboksar">
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Vi gjekk heim <span class="setningsboks ledd"><span class="sb-namn">leddsetning (adverbial)</span><b>fordi</b> det regna</span>.</div>
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Guten <span class="setningsboks ledd"><span class="sb-namn">relativsetning</span><b>som</b> bur her</span>, er snill.</div>
        </div>`,
      steps: [
        "<p>Ei <strong>heilsetning</strong> kan stå åleine. Ei <strong>leddsetning</strong> er eit ledd inne i ei anna setning og kan ikkje stå åleine.</p>",
      ],
      notes: "Peik på boksane: leddsetninga ligg inne i heilsetninga og gjer jobben til eitt ledd. <em>fordi det regna</em> svarer på kvifor, altså eit adverbial.",
    },
    {
      title: "Konjunksjon eller subjunksjon?",
      body: `<div class="to-kol">
          <div class="boks"><h3>Konjunksjon</h3><p><em class="nn">og, men, eller, for</em></p><p>bind saman to heilsetningar</p><p><em class="nn">Eg kom, <strong>men</strong> ho gjekk.</em></p></div>
          <div class="boks"><h3>Subjunksjon</h3><p><em class="nn">at, fordi, dersom, når, då, som, sjølv om</em></p><p>gjer setninga etter til ei leddsetning</p><p><em class="nn">Eg kom <strong>fordi</strong> ho gjekk.</em></p></div>
        </div>`,
      steps: ["<p class=\"midt\">Det finst berre fire konjunksjonar. Alle dei andre bindeorda er subjunksjonar.</p>"],
      notes: "Hugseregelen er at konjunksjonane er få: og, men, eller, for. Lær dei, så veit du at resten er subjunksjonar.",
    },
    {
      type: "sporsmal",
      question: "Kva for ei av setningane har ei leddsetning?",
      options: [
        "<em class=\"nn\">Eg kom, men ho gjekk.</em>",
        "<em class=\"nn\">Eg kom fordi ho gjekk.</em>",
        "<em class=\"nn\">Eg kom, og ho gjekk.</em>",
      ],
      correct: 1,
      explain: "<em class=\"nn\">fordi</em> er ein subjunksjon, så <em class=\"nn\">fordi ho gjekk</em> er ei leddsetning. <em class=\"nn\">men</em> og <em class=\"nn\">og</em> bind saman to heilsetningar.",
      notes: "Spør etter at svaret er vist: kan <em>fordi ho gjekk</em> stå åleine? Nei. Kan <em>ho gjekk</em>? Ja.",
    },
    {
      title: "Då eller når?",
      body: `<div class="daanaar">
          <div class="dn-rad"><span class="dn-ord">då</span><span class="dn-linje"><i class="dn-prikk"></i></span><span class="dn-tekst">éin bestemt gong i fortida: <em class="nn">Då eg var liten …</em></span></div>
          <div class="dn-rad"><span class="dn-ord">når</span><span class="dn-linje fleire"><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-pil"></i></span><span class="dn-tekst">kvar gong, vanlegvis, eller i framtida: <em class="nn">Når eg kjem heim, …</em></span></div>
        </div>`,
      steps: [
        "<p class=\"kjempe midt\">«Den gongen då, kvar gong når.»</p>",
        "<p class=\"midt\">Bokmål <em class=\"bm\">da</em> finst ikkje på nynorsk.</p>",
      ],
      notes: "Denne feilen er blant dei aller vanlegaste i sidemålstekstar. Be elevane seie hugseregelen høgt i kor.",
    },
    {
      type: "drill",
      title: "Då eller når?",
      spec: { bank: "sentences", set: ["daNar"], mode: "choice" },
      n: 5,
      notes: "Be elevane seie hugseregelen for kvar oppgåve: er det éin gong i fortida, eller kvar gong?",
    },
    {
      title: "Verbalet står på andreplass",
      body: `<div class="v2demo" data-v2>
          <div class="v2rad">
            <span class="ledd subjekt" data-plass="1">Han</span>
            <span class="ledd verbal" data-plass="2">kom</span>
            <span class="ledd adverbial" data-plass="3">i går</span>
          </div>
          <button type="button" class="btn secondary small v2-btn">Flytt «i går» fremst</button>
          <p class="v2forklar">Verbalet <em class="nn">kom</em> står på andreplass same kva som står først.</p>
        </div>`,
      steps: [
        "<p>Ei leddsetning først tel som <strong>eitt</strong> ledd: <em class=\"nn\">Då han kom heim, <strong>åt han</strong> middag.</em></p>",
      ],
      notes: "Trykk på knappen i figuren og vis at subjektet må vike. Elevar med anna morsmål enn norsk bommar ofte her, så gi mange døme. Det siste steget er det vanskelegaste: etter ei leddsetning kjem verbalet rett etter kommaet.",
    },
    {
      title: "Ikkje-testen",
      body: `<table>
          <thead><tr><th>Heilsetning</th><th>Leddsetning</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Han kom <strong>ikkje</strong>.</em></td><td><em class="nn">… fordi han <strong>ikkje</strong> kom.</em></td></tr>
            <tr><td><em class="nn">Ho er <strong>alltid</strong> blid.</em></td><td><em class="nn">… sjølv om ho <strong>alltid</strong> er blid.</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"stor\">I leddsetninga står <em class=\"nn\">ikkje</em> <strong>framfor</strong> verbalet. I heilsetninga står det <strong>etter</strong>.</p>"],
      notes: "Ikkje-testen kan elevane bruke når dei er usikre på om noko er ei leddsetning: set inn ikkje og høyr kvar det står naturleg.",
    },
    {
      type: "drill",
      title: "Kvar står «ikkje»?",
      spec: { bank: "sentences", set: ["ikkjePlass"], mode: "choice" },
      n: 4,
      notes: "Lat elevane lese alle tre alternativa høgt før dei vel. Øyret hjelper ofte.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les gjennom fagtekstane og gjer sjekkspørsmåla.</li>
          <li>Gjer sorteringsoppgåvene om heilsetning, leddsetning og bindeord.</li>
          <li>Skriv den korte teksten til slutt og analyser to av setningane.</li>
        </ul>`,
      tid: 20,
      notes: "Gå rundt og spør elevane kva spørsmål dei stiller for å finne leddet. Dei som blir tidleg ferdige, kan ta mengdetreninga i setningslære.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Finn <strong>verbalet</strong> først, så spør du deg fram til resten.</p>",
        "<p class=\"stor\">Ei <strong>leddsetning</strong> kan ikkje stå åleine og byrjar ofte med ein subjunksjon.</p>",
        "<p class=\"stor\"><strong>Den gongen då, kvar gong når.</strong></p>",
        "<p class=\"stor\">Verbalet står på <strong>andreplass</strong> i heilsetninga.</p>",
      ],
      notes: "Be elevane skrive ned den regelen dei trur dei har mest bruk for, på ein lapp dei leverer i døra.",
    },
  ],
  guide: {
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen gir elevane omgrepa dei treng for å snakke om og rette setningsbygnad: setningsledd, heilsetning og leddsetning, konjunksjon og subjunksjon, <em class=\"nn\">då</em> og <em class=\"nn\">når</em>, verbalet på andreplass og samsvar i predikativ. Stoffet er grunnlaget for modulen om setningsbygnad under Typiske feil i Del 4 og for mengdetreninga i setningslære.</p>",
    mal: [
      "Elevane kan finne verbal, subjekt, objekt, indirekte objekt, predikativ og adverbial med faste spørsmål.",
      "Elevane kan skilje heilsetning frå leddsetning og konjunksjon frå subjunksjon.",
      "Elevane kan velje rett mellom <em class=\"nn\">då</em> og <em class=\"nn\">når</em>.",
      "Elevane kan bruke V2-regelen og plassere <em class=\"nn\">ikkje</em> rett i heilsetning og leddsetning.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kjenne ordklassane, særleg verb, substantiv og adjektiv. Modulen Ordklassane: ei oversikt dekkjer dette.",
    forebuing: [
      "Test presentasjonen på tavla på førehand, særleg dei interaktive figurane på lysbilete 5 og 14.",
      "Ha små lappar klare til exit-lappen til slutt.",
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og la elevane diskutere kva som er ei setning.</p>", lysbilete: "2 og 3" },
      { fase: "Setningsledd", min: 15, gjer: "<p>Innfør ledda og framgangsmåten. Analyser setninga saman, ta spørsmålet og predikativet, og køyr ein tavlerunde.</p>", lysbilete: "4 til 9" },
      { fase: "Heilsetning og leddsetning", min: 10, gjer: "<p>Vis setningsboksane, skil konjunksjon frå subjunksjon, og gå gjennom då og når med tavleøving.</p>", lysbilete: "10 til 14" },
      { fase: "Ordstilling", min: 8, gjer: "<p>Demonstrer V2 med figuren og ikkje-testen, og ta ein kort tavlerunde.</p>", lysbilete: "15 til 17" },
      { fase: "Eigenarbeid", min: 17, gjer: "<p>Elevane arbeider i modulen. Dei som blir ferdige, går vidare til mengdetreninga i setningslære.</p>", lysbilete: "18" },
      { fase: "Avslutning", min: 5, gjer: "<p>Oppsummer og lat elevane skrive ein exit-lapp med den regelen dei har mest bruk for.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Subjektet er det som står først.»", hjelp: "Vis ei setning som byrjar med eit adverbial, som <em class=\"nn\">I går kjøpte guten sko</em>. Finn verbalet først og spør «kven kjøpte?»." },
      { feil: "«Alt etter verbalet er objekt.»", hjelp: "Etter <em class=\"nn\">er</em> og <em class=\"nn\">blir</em> kjem eit predikativ. Og adverbial som <em class=\"nn\">i går</em> svarer ikkje på «kva?»." },
      { feil: "«Då og når betyr det same.»", hjelp: "Teikn ei tidslinje: éin prikk i fortida er <em class=\"nn\">då</em>, mange prikkar eller framtid er <em class=\"nn\">når</em>." },
      { feil: "«Då han kom heim, han åt middag.»", hjelp: "Leddsetninga tel som eitt ledd på plass 1. Tel ledda høgt: plass 1 er heile leddsetninga, plass 2 må vere verbalet." },
    ],
    samtale: [
      "Kvifor er det lurt å finne verbalet før subjektet?",
      "Kva skjer med subjektet når vi flyttar eit adverbial fremst i setninga?",
      "Korleis kan ikkje-testen hjelpe deg når du skriv?",
      "Finst det liknande reglar i andre språk du kan?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei huskelapp med dei fem spørsmåla i rekkjefølgje.",
        "Bruk korte setningar med tre ledd før de går over til lengre setningar.",
        "La elevane markere ledda med fargar, same fargar som i figurane.",
      ],
      utfordring: [
        "Be elevane finne leddsetningar i ein tekst frå Del 5 og seie kva ledd dei er.",
        "La elevane skrive om ein tekst slik at fleire setningar byrjar med adverbial, og sjekke V2.",
      ],
    },
    vurdering: [
      "Tavleøvingane viser raskt om klassen har forstått ledda, då/når og plasseringa av ikkje.",
      "Skriveoppgåva til slutt i modulen viser om eleven kan bruke leddsetningar og analysere eigne setningar.",
      "Kjenneteikn på god måloppnåing: eleven finn ledda i lengre setningar, grunngir svaret med spørsmåla og bruker V2 rett etter innleiande leddsetningar.",
    ],
    vidare: "Følg opp med mengdetreninga i setningslære i Del 2 og modulen om setningsbygnad under Typiske feil i Del 4.",
  },
});
