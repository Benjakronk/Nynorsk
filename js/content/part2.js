/* Del 2 — Grammatikk og skriveregler */

Modules.register({
  id: "grammatikk-substantiv",
  part: 2,
  title: "Substantiv — kjønn og bøying",
  summary: "Hankjønn, hokjønn og inkjekjønn med rette endingar.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Tre kjønn",
      content: `
        <p>På nynorsk har substantiva tre kjønn: <strong>hankjønn</strong>,
        <strong>hokjønn</strong> og <strong>inkjekjønn</strong>. Kjønnet styrer kva artikkel
        og endingar du brukar.</p>

        <h3>Vanleg bøying</h3>
        <table>
          <thead>
            <tr><th>Kjønn</th><th>Ubest. eintal</th><th>Best. eintal</th><th>Ubest. fleirtal</th><th>Best. fleirtal</th></tr>
          </thead>
          <tbody>
            <tr><td>Hankjønn</td><td>ein gut</td><td>guten</td><td>gutar</td><td>gutane</td></tr>
            <tr><td>Hokjønn</td><td>ei jente</td><td>jenta</td><td>jenter</td><td>jentene</td></tr>
            <tr><td>Inkjekjønn (sterkt)</td><td>eit hus</td><td>huset</td><td>hus</td><td>husa</td></tr>
            <tr><td>Inkjekjønn (svakt)</td><td>eit eple</td><td>eplet</td><td>eple</td><td>epla</td></tr>
          </tbody>
        </table>

        <h3>Hokjønn med omlyd</h3>
        <p>Nokre hokjønnsord endrar vokalen i fleirtal:</p>
        <table>
          <tbody>
            <tr><td>ei bok</td><td>boka</td><td>bøker</td><td>bøkene</td></tr>
            <tr><td>ei hand</td><td>handa</td><td>hender</td><td>hendene</td></tr>
            <tr><td>ei natt</td><td>natta</td><td>netter</td><td>nettene</td></tr>
          </tbody>
        </table>

        <h3>Skilnaden frå bokmål</h3>
        <p>Bokmål har gjerne <em class="bm">en/et</em> og fleirtal på <em class="bm">-ene</em>
        i inkjekjønn (husene). Nynorsk har <em class="nn">ein/ei/eit</em> og fleirtal på
        <em class="nn">-a</em> i inkjekjønn (<em class="nn">husa</em>). Hokjønn på nynorsk
        får ikkje «-en», men <em class="nn">-a</em>: <em class="nn">jenta</em>, ikkje
        <em class="bm">jenten</em>.</p>

        <div class="callout warn">
          <strong>Vanleg feil:</strong> <em class="bm">jenten</em>, <em class="bm">boken</em>,
          <em class="bm">husene</em>. Rett nynorsk: <em class="nn">jenta</em>,
          <em class="nn">boka</em>, <em class="nn">husa</em>.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter substantiva etter kjønn:",
      categories: {
        "Hankjønn (ein …)": ["bil", "stol", "skog", "gut", "hund"],
        "Hokjønn (ei …)": ["jente", "bok", "klokke", "natt", "sol"],
        "Inkjekjønn (eit …)": ["hus", "barn", "eple", "tre", "år"],
      },
      explanation: "Kjønnet kan du sjekke i ei ordliste (t.d. Nynorskordboka). Det er sjeldan å sjå på ordet kva kjønn det har.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett artikkel — <em class=\"nn\">ein</em>, <em class=\"nn\">ei</em> eller <em class=\"nn\">eit</em>:",
      items: [
        { prompt: "___ gut ", accept: ["ein"] },
        { prompt: "___ jente ", accept: ["ei"] },
        { prompt: "___ hus ", accept: ["eit"] },
        { prompt: "___ bok ", accept: ["ei"] },
        { prompt: "___ eple ", accept: ["eit"] },
        { prompt: "___ bil ", accept: ["ein"] },
        { prompt: "___ klokke ", accept: ["ei"] },
        { prompt: "___ tre ", accept: ["eit"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Skriv substantivet i <strong>bestemt eintal</strong>:",
      items: [
        { prompt: "ein gut → ___", accept: ["guten"] },
        { prompt: "ei jente → ___", accept: ["jenta"] },
        { prompt: "eit hus → ___", accept: ["huset"] },
        { prompt: "ei bok → ___", accept: ["boka"] },
        { prompt: "eit eple → ___", accept: ["eplet"] },
        { prompt: "ein bil → ___", accept: ["bilen"] },
      ],
      explanation: "Hankjønn får -en, hokjønn -a, inkjekjønn -et.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Skriv substantivet i <strong>bestemt fleirtal</strong>:",
      items: [
        { prompt: "gutar → ___", accept: ["gutane"] },
        { prompt: "jenter → ___", accept: ["jentene"] },
        { prompt: "hus → ___", accept: ["husa"] },
        { prompt: "bøker → ___", accept: ["bøkene"] },
        { prompt: "eple → ___", accept: ["epla"] },
        { prompt: "bilar → ___", accept: ["bilane"] },
      ],
      explanation: "Hankjønn fleirtal best. = -ane; hokjønn = -ene; inkjekjønn = -a.",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman bokmål og nynorsk:",
      pairs: [
        ["jenten", "jenta"],
        ["boken", "boka"],
        ["husene", "husa"],
        ["epler", "eple"],
        ["bøkene", "bøkene"],
        ["bilene", "bilane"],
      ],
      explanation: "Merk: «bøkene» er likt på begge skriftspråka, medan «bilene» blir <em class=\"nn\">bilane</em> på nynorsk.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Jenten leste boken i hele dag.",
      accept: [
        "Jenta las boka heile dagen.",
        "Jenta las boka i heile dag.",
      ],
      hint: "«leste» (preteritum av lese) heiter «las» på nynorsk; «heile» har ofte ein -e meir.",
      explanation: "Verbet «å lese» er sterkt og bøyest: lese – les – las – har lese.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv setningar",
      question: "Skriv fem korte setningar der du brukar substantiv frå alle tre kjønna. Marker gjerne kva som er kva kjønn med farge eller understreking.",
      minWords: 30,
      checklist: [
        "Minst eitt hankjønnsord (ein …).",
        "Minst eitt hokjønnsord (ei …).",
        "Minst eitt inkjekjønnsord (eit …).",
        "Bruk gjerne både eintal og fleirtal.",
      ],
    },
  ],
});

Modules.register({
  id: "grammatikk-verb",
  part: 2,
  title: "Verb — sterke og svake",
  summary: "Presens, preteritum og perfektum partisipp.",
  estimatedMinutes: 30,
  sections: [
    {
      type: "lesson",
      title: "Verbsystemet på nynorsk",
      content: `
        <p>Verb på nynorsk har infinitiv på <strong>-e</strong> (hovudform). Du finn fire
        store grupper svake verb og ei stor gruppe sterke verb.</p>

        <h3>Svake verb — fire klasser</h3>
        <table>
          <thead><tr><th>Klasse</th><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perf. partisipp</th></tr></thead>
          <tbody>
            <tr><td>a-verb</td><td>å kaste</td><td>kastar</td><td>kasta</td><td>har kasta</td></tr>
            <tr><td>e-verb</td><td>å høyre</td><td>høyrer</td><td>høyrde</td><td>har høyrt</td></tr>
            <tr><td>j-verb</td><td>å spørje</td><td>spør</td><td>spurde</td><td>har spurt</td></tr>
            <tr><td>kortverb</td><td>å bu</td><td>bur</td><td>budde</td><td>har budd</td></tr>
          </tbody>
        </table>

        <h3>Sterke verb — vokalskifte</h3>
        <p>Sterke verb skifter vokal i preteritum og endar ikkje på -te/-de:</p>
        <table>
          <tbody>
            <tr><td>å skrive</td><td>skriv</td><td>skreiv</td><td>har skrive</td></tr>
            <tr><td>å finne</td><td>finn</td><td>fann</td><td>har funne</td></tr>
            <tr><td>å gå</td><td>går</td><td>gjekk</td><td>har gått</td></tr>
            <tr><td>å vere</td><td>er</td><td>var</td><td>har vore</td></tr>
            <tr><td>å sjå</td><td>ser</td><td>såg</td><td>har sett</td></tr>
            <tr><td>å gi</td><td>gir/gjev</td><td>gav</td><td>har gjeve/gitt</td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Tips:</strong> Sterke verb må du lære utanåt — som engelske «irregular
          verbs». Ei kort liste med 20–30 vanlege sterke verb dekkjer det meste.
        </div>

        <h3>Skilnader frå bokmål</h3>
        <ul>
          <li><em class="bm">spise</em> → <em class="nn">ete</em> (ete – et – åt – har ete)</li>
          <li><em class="bm">gjør</em> → <em class="nn">gjer</em> (gjere – gjer – gjorde – har gjort)</li>
          <li><em class="bm">sier</em> → <em class="nn">seier</em> (seie – seier – sa – har sagt)</li>
          <li><em class="bm">blir</em> → <em class="nn">blir</em> eller <em class="nn">vert</em> (vere/verte er litt ulike verb)</li>
        </ul>
      `,
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter verba i rett klasse (sjå preteritum):",
      categories: {
        "a-verb (preteritum -a)": ["å kaste", "å hoppe", "å snakke", "å vente"],
        "e-verb (preteritum -de/-te)": ["å høyre", "å lære", "å kjøpe", "å reise"],
        "Sterke verb (vokalskifte)": ["å skrive", "å finne", "å vere", "å gå"],
      },
      explanation: "a-verba endar på -a i preteritum (kasta). e-verba på -de/-te (høyrde, lærte). Sterke verb endrar vokalen (skreiv, fann).",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set verbet i <strong>presens</strong>:",
      items: [
        { prompt: "(å kaste) Eg ___ ballen.", accept: ["kastar"] },
        { prompt: "(å høyre) Du ___ musikk.", accept: ["høyrer"] },
        { prompt: "(å skrive) Ho ___ ein tekst.", accept: ["skriv"] },
        { prompt: "(å vere) Vi ___ heime.", accept: ["er"] },
        { prompt: "(å gå) Dei ___ på skulen.", accept: ["går"] },
        { prompt: "(å bu) Han ___ i Bergen.", accept: ["bur"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set verbet i <strong>preteritum</strong>:",
      items: [
        { prompt: "(å kaste) Eg ___ ballen i går.", accept: ["kasta"] },
        { prompt: "(å høyre) Du ___ musikk i går.", accept: ["høyrde"] },
        { prompt: "(å skrive) Ho ___ ein tekst i går.", accept: ["skreiv"] },
        { prompt: "(å vere) Vi ___ heime i går.", accept: ["var"] },
        { prompt: "(å gå) Dei ___ på skulen i går.", accept: ["gjekk"] },
        { prompt: "(å finne) Han ___ nøkkelen i går.", accept: ["fann"] },
        { prompt: "(å sjå) Eg ___ filmen i går.", accept: ["såg"] },
        { prompt: "(å seie) Ho ___ ifrå.", accept: ["sa"] },
      ],
      explanation: "Hugs vokalskiftet i sterke verb: skrive→skreiv, finne→fann, sjå→såg, seie→sa.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set verbet i <strong>perfektum</strong> (har …):",
      items: [
        { prompt: "(å kaste) Eg har ___ ballen.", accept: ["kasta"] },
        { prompt: "(å skrive) Ho har ___ teksten.", accept: ["skrive"] },
        { prompt: "(å gå) Dei har ___ heim.", accept: ["gått"] },
        { prompt: "(å vere) Vi har ___ der før.", accept: ["vore"] },
        { prompt: "(å ete) Han har ___ middag.", accept: ["ete"] },
        { prompt: "(å sjå) Du har ___ filmen.", accept: ["sett"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman presens og preteritum:",
      pairs: [
        ["går", "gjekk"],
        ["er", "var"],
        ["skriv", "skreiv"],
        ["finn", "fann"],
        ["ser", "såg"],
        ["seier", "sa"],
        ["et", "åt"],
        ["gjer", "gjorde"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett perfektum av <em class=\"nn\">å skrive</em>?",
      options: ["har skreiv", "har skrive", "har skrivd", "har skrivet"],
      correct: 1,
      explanation: "Sterke verb har eiga perfektumsform. Skrive – skriv – skreiv – har skrive.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Vi gikk hjem og spiste middag.",
      accept: [
        "Vi gjekk heim og åt middag.",
        "Me gjekk heim og åt middag.",
      ],
      hint: "«gikk» → preteritum av «å gå»; «spiste» → preteritum av «å ete».",
      explanation: "<em class=\"nn\">Gjekk</em> kjem av <em class=\"nn\">å gå</em>; <em class=\"nn\">åt</em> kjem av <em class=\"nn\">å ete</em>. Både «vi» og «me» er tillatne på nynorsk.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv ein liten dag-tekst",
      question: "Skriv kort om kva du gjorde i går (60–120 ord). Bruk minst fem verb i preteritum.",
      minWords: 60,
      checklist: [
        "Minst fem ulike verb i preteritum.",
        "Prøv å ha med både svake og sterke verb.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "grammatikk-pronomen",
  part: 2,
  title: "Pronomen og spørjeord",
  summary: "Personlege pronomen, eigedom og kva/korleis/kvifor.",
  estimatedMinutes: 20,
  sections: [
    {
      type: "lesson",
      title: "Personlege pronomen",
      content: `
        <table>
          <thead><tr><th></th><th>Subjekt</th><th>Objekt</th></tr></thead>
          <tbody>
            <tr><td>1. person eintal</td><td>eg</td><td>meg</td></tr>
            <tr><td>2. person eintal</td><td>du</td><td>deg</td></tr>
            <tr><td>3. person eintal (han)</td><td>han</td><td>han / honom (sjeldan)</td></tr>
            <tr><td>3. person eintal (ho)</td><td>ho</td><td>henne</td></tr>
            <tr><td>3. person eintal (det)</td><td>det</td><td>det</td></tr>
            <tr><td>1. person fleirtal</td><td>vi / me</td><td>oss</td></tr>
            <tr><td>2. person fleirtal</td><td>de</td><td>dykk</td></tr>
            <tr><td>3. person fleirtal</td><td>dei</td><td>dei</td></tr>
          </tbody>
        </table>

        <p>Både <em class="nn">vi</em> og <em class="nn">me</em> er likestilte. Bruk den du
        kjenner deg mest heime i.</p>

        <h3>Eigedomspronomen</h3>
        <table>
          <thead><tr><th>Eigar</th><th>Hankjønn</th><th>Hokjønn</th><th>Inkjekjønn</th><th>Fleirtal</th></tr></thead>
          <tbody>
            <tr><td>min</td><td>min</td><td>mi</td><td>mitt</td><td>mine</td></tr>
            <tr><td>din</td><td>din</td><td>di</td><td>ditt</td><td>dine</td></tr>
            <tr><td>hans</td><td>hans</td><td>hans</td><td>hans</td><td>hans</td></tr>
            <tr><td>hennar</td><td>hennar</td><td>hennar</td><td>hennar</td><td>hennar</td></tr>
            <tr><td>vår</td><td>vår</td><td>vår</td><td>vårt</td><td>våre</td></tr>
            <tr><td>dykkar</td><td>dykkar</td><td>dykkar</td><td>dykkar</td><td>dykkar</td></tr>
            <tr><td>deira</td><td>deira</td><td>deira</td><td>deira</td><td>deira</td></tr>
          </tbody>
        </table>

        <h3>Spørjeord</h3>
        <table>
          <tbody>
            <tr><td>kva</td><td>hva (bm)</td></tr>
            <tr><td>kven</td><td>hvem (bm)</td></tr>
            <tr><td>kvar / kor</td><td>hvor (bm) — «kvar» = stad, «kor» = grad/mengd</td></tr>
            <tr><td>korleis</td><td>hvordan (bm)</td></tr>
            <tr><td>kvifor</td><td>hvorfor (bm)</td></tr>
            <tr><td>når</td><td>når (likt)</td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Merk:</strong> <em class="nn">kvar</em> og <em class="nn">kor</em> kan vere
          litt forvirrande. <em class="nn">Kvar bur du?</em> (stad) — <em class="nn">Kor
          mange er de?</em> (mengd) — <em class="nn">Kor fort spring du?</em> (grad).
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman bokmål og nynorsk:",
      pairs: [
        ["jeg", "eg"],
        ["meg", "meg"],
        ["hun", "ho"],
        ["henne", "henne"],
        ["dere", "de"],
        ["deres (objekt)", "dykk"],
        ["de", "dei"],
        ["dem", "dei"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett pronomen:",
      items: [
        { prompt: "___ heiter Ola. (Eg/Du?)", accept: ["Eg", "eg"] },
        { prompt: "Læraren såg ___. (meg/eg?)", accept: ["meg"] },
        { prompt: "___ er beste venen min. (Han/Ho/Det?) — det er Sara.", accept: ["Ho", "ho"] },
        { prompt: "Gi boka til ___. (henne/ho?)", accept: ["henne"] },
        { prompt: "Vil ___ vere med? (de/dykk?)", accept: ["de"] },
        { prompt: "Eg ringjer ___ i kveld. (dykk/de?)", accept: ["dykk"] },
      ],
      explanation: "Subjekt: eg, du, han, ho, det, vi/me, de, dei. Objekt: meg, deg, han, henne, det, oss, dykk, dei.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn eigedomspronomenet i rett form:",
      items: [
        { prompt: "Dette er bilen ___ (min/mi/mitt).", accept: ["min"] },
        { prompt: "Her er boka ___ (min/mi/mitt).", accept: ["mi"] },
        { prompt: "Der står huset ___ (min/mi/mitt).", accept: ["mitt"] },
        { prompt: "Dette er bøkene ___ (min/mi/mitt/mine).", accept: ["mine"] },
        { prompt: "Det er klokka ___ (din/di/ditt).", accept: ["di"] },
        { prompt: "Det er eplet ___ (din/di/ditt).", accept: ["ditt"] },
      ],
      explanation: "Eigedomspronomenet samsvarer i kjønn og tal med substantivet: bilen min, boka mi, huset mitt, bøkene mine.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett spørjeord: «___ heiter du?»",
      options: ["Kva", "Korleis", "Kvifor", "Kvar"],
      correct: 0,
      explanation: "Du spør om eit namn — det blir <em class=\"nn\">Kva heiter du?</em>",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett spørjeord: «___ kom du så seint?»",
      options: ["Kvar", "Kva", "Kvifor", "Korleis"],
      correct: 2,
      explanation: "Spør om grunn → <em class=\"nn\">kvifor</em>.",
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter orda:",
      categories: {
        "Personleg pronomen": ["eg", "ho", "dei", "dykk"],
        "Eigedomspronomen": ["min", "hennar", "vårt", "deira"],
        "Spørjeord": ["kva", "kvifor", "korleis", "kven"],
      },
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Hvor bor du, og hvorfor flyttet dere hit?",
      accept: [
        "Kvar bur du, og kvifor flytta de hit?",
        "Kvar bur du, og kvifor flytta dykk hit?",
      ],
      hint: "«hvor» → «kvar» (stad); «hvorfor» → «kvifor»; «dere» → «de» (subjekt).",
      explanation: "Subjektsforma er <em class=\"nn\">de</em>; objektsforma er <em class=\"nn\">dykk</em>. Her er det subjektet for verbet «flytta», så det skal vere <em class=\"nn\">de</em>.",
    },
  ],
});

Modules.register({
  id: "grammatikk-adjektiv",
  part: 2,
  title: "Adjektiv — samsvarsbøying",
  summary: "Korleis adjektivet rettar seg etter substantivet.",
  estimatedMinutes: 20,
  sections: [
    {
      type: "lesson",
      title: "Adjektivet rettar seg etter substantivet",
      content: `
        <p>Adjektivet endrar form etter kjønn og tal på substantivet — også i predikativ
        bruk (etter «er»).</p>

        <h3>Ubestemt form</h3>
        <table>
          <tbody>
            <tr><td>ein fin gut</td><td>ei fin jente</td><td>eit fin<strong>t</strong> hus</td><td>fin<strong>e</strong> gutar / jenter / hus</td></tr>
            <tr><td>ein stor bil</td><td>ei stor klokke</td><td>eit stor<strong>t</strong> hus</td><td>stor<strong>e</strong> bilar</td></tr>
          </tbody>
        </table>

        <h3>Bestemt form</h3>
        <p>I bestemt form blir adjektivet på <strong>-e</strong> i alle kjønn:</p>
        <ul>
          <li>den fin<strong>e</strong> guten</li>
          <li>den fin<strong>e</strong> jenta</li>
          <li>det fin<strong>e</strong> huset</li>
          <li>dei fin<strong>e</strong> gutane</li>
        </ul>

        <h3>Predikativ samsvar</h3>
        <ul>
          <li>Guten er fin.</li>
          <li>Jenta er fin.</li>
          <li>Huset er <strong>fint</strong>.</li>
          <li>Bilane er fin<strong>e</strong>.</li>
        </ul>

        <h3>Komparasjon</h3>
        <table>
          <thead><tr><th>Positiv</th><th>Komparativ</th><th>Superlativ</th></tr></thead>
          <tbody>
            <tr><td>fin</td><td>finare</td><td>finast</td></tr>
            <tr><td>stor</td><td>større</td><td>størst</td></tr>
            <tr><td>liten</td><td>mindre</td><td>minst</td></tr>
            <tr><td>god</td><td>betre</td><td>best</td></tr>
            <tr><td>gamal</td><td>eldre</td><td>eldst</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set adjektivet <em class=\"nn\">fin</em> i rett form:",
      items: [
        { prompt: "ein ___ gut", accept: ["fin"] },
        { prompt: "ei ___ jente", accept: ["fin"] },
        { prompt: "eit ___ hus", accept: ["fint"] },
        { prompt: "___ gutar", accept: ["fine"] },
        { prompt: "den ___ jenta", accept: ["fine"] },
        { prompt: "Huset er ___.", accept: ["fint"] },
        { prompt: "Bilane er ___.", accept: ["fine"] },
      ],
      explanation: "Inkjekjønn eintal får -t (fint). Fleirtal og bestemt form får -e (fine).",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set adjektivet <em class=\"nn\">stor</em> i rett form:",
      items: [
        { prompt: "ein ___ bil", accept: ["stor"] },
        { prompt: "ei ___ klokke", accept: ["stor"] },
        { prompt: "eit ___ tre", accept: ["stort"] },
        { prompt: "___ tre", accept: ["store"] },
        { prompt: "Huset er ___.", accept: ["stort"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman positiv, komparativ og superlativ:",
      pairs: [
        ["god – betre – ?", "best"],
        ["liten – ? – minst", "mindre"],
        ["stor – større – ?", "størst"],
        ["gamal – ? – eldst", "eldre"],
        ["fin – finare – ?", "finast"],
      ],
      explanation: "Nokre vanlege adjektiv har uregelrett bøying (god/betre/best). Andre er regelrette (fin/finare/finast).",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett: «Huset er …»",
      options: ["fin", "fint", "fine", "finen"],
      correct: 1,
      explanation: "Inkjekjønn eintal predikativt får -t: <em class=\"nn\">Huset er fint.</em>",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett: «den … guten»",
      options: ["fin", "fint", "fine", "finen"],
      correct: 2,
      explanation: "I bestemt form blir adjektivet på -e: <em class=\"nn\">den fine guten</em>.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Huset er stort og pent.",
      accept: [
        "Huset er stort og fint.",
        "Huset er stort og pent.",
      ],
      hint: "Begge adjektiva må stå i inkjekjønn fordi «huset» er inkjekjønn.",
      explanation: "«Pent» finst òg på nynorsk, men «fint» er meir vanleg. Begge formene er korrekte her.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Beskriv noko",
      question: "Skriv ein kort tekst (50–100 ord) der du beskriv eit rom eller ein stad du kjenner godt. Bruk minst seks ulike adjektiv i rett form.",
      minWords: 50,
      checklist: [
        "Minst seks ulike adjektiv.",
        "Bruk både hankjønn, hokjønn og inkjekjønn.",
        "Hugs samsvar: «huset er stort», «bilane er store».",
      ],
    },
  ],
});

Modules.register({
  id: "grammatikk-skriveregler",
  part: 2,
  title: "Skriveregler og vanlege fallgruver",
  summary: "Dei viktigaste skilnadene og fellene du må passe på.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Dei vanlegaste fallgruvene",
      content: `
        <h3>Småord du må kunne</h3>
        <table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td>ikke</td><td>ikkje</td></tr>
            <tr><td>bare</td><td>berre</td></tr>
            <tr><td>fra</td><td>frå</td></tr>
            <tr><td>også</td><td>også / òg</td></tr>
            <tr><td>mye</td><td>mykje</td></tr>
            <tr><td>noe</td><td>noko</td></tr>
            <tr><td>noen (hank./hokj.)</td><td>nokon</td></tr>
            <tr><td>noen (inkjekj./mengd)</td><td>noko</td></tr>
            <tr><td>hva</td><td>kva</td></tr>
            <tr><td>hvem</td><td>kven</td></tr>
            <tr><td>hvor (stad)</td><td>kvar</td></tr>
            <tr><td>hvor (grad/mengd)</td><td>kor</td></tr>
            <tr><td>hvordan</td><td>korleis</td></tr>
            <tr><td>hvorfor</td><td>kvifor</td></tr>
          </tbody>
        </table>

        <h3>Diftongar</h3>
        <p>Mange ord har diftong på nynorsk der bokmål har monoftong:</p>
        <ul>
          <li>bein (ben), stein (sten), bein (bein), reisa (reisa)</li>
          <li>raud (rød), draum (drøm), straum (strøm)</li>
          <li>høyre (høre), nøye (nøyaktig)</li>
        </ul>

        <h3>«Noko» og «nokon»</h3>
        <p>Dette er ein klassisk feilkjelde:</p>
        <ul>
          <li><em class="nn">noko</em> brukar du om <strong>mengd</strong> eller om
              <strong>inkjekjønn</strong>: «Eg ser <em class="nn">noko</em>», «Vil du ha
              <em class="nn">noko</em> brød?»</li>
          <li><em class="nn">nokon</em> brukar du om <strong>hankjønn/hokjønn</strong>:
              «Står det <em class="nn">nokon</em> der?»</li>
          <li>Fleirtal: <em class="nn">nokre</em>: «<em class="nn">nokre</em> bøker»</li>
        </ul>

        <h3>Samansette ord</h3>
        <p>Som i bokmål skal samansette ord skrivast i <strong>eitt ord</strong>:</p>
        <ul>
          <li>Rett: <em class="nn">bilkøyring</em>, <em class="nn">skuleelev</em></li>
          <li>Feil: <em class="bm">bil køyring</em>, <em class="bm">skule elev</em></li>
        </ul>

        <h3>«Vart» og «blei»</h3>
        <p>Båe er tillatne for preteritum av <em class="nn">å bli/verte</em>. Mange bruker
        <em class="nn">vart</em> i nynorsk: «Det <em class="nn">vart</em> seint.»</p>
      `,
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman bokmål og nynorsk:",
      pairs: [
        ["ikke", "ikkje"],
        ["bare", "berre"],
        ["hva", "kva"],
        ["hvordan", "korleis"],
        ["hvorfor", "kvifor"],
        ["fra", "frå"],
        ["mye", "mykje"],
        ["hvem", "kven"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett: «Eg vil ha ___ brød.»",
      options: ["noko", "nokon", "nokre", "noen"],
      correct: 0,
      explanation: "«Brød» er inkjekjønn (eit brød). Då brukar vi <em class=\"nn\">noko</em>.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett: «Er det ___ heime?»",
      options: ["noko", "nokon", "nokre", "noen"],
      correct: 1,
      explanation: "Spørsmålet handlar om ein person (hankjønn/hokjønn) → <em class=\"nn\">nokon</em>.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett: «Eg las ___ bøker i ferien.»",
      options: ["noko", "nokon", "nokre", "noen"],
      correct: 2,
      explanation: "Fleirtal av «nokon» er <em class=\"nn\">nokre</em>.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Rett opp setningane — fyll inn rett nynorskord:",
      items: [
        { prompt: "Eg veit ___ (ikke) kva du meiner.", accept: ["ikkje"] },
        { prompt: "Han er ___ (bare) ti år.", accept: ["berre"] },
        { prompt: "___ (Hvordan) går det med deg?", accept: ["Korleis", "korleis"] },
        { prompt: "Vi kjem ___ (fra) Bergen.", accept: ["frå"] },
        { prompt: "___ (Hva) heiter du?", accept: ["Kva", "kva"] },
        { prompt: "Ho et ___ (mye) frukt.", accept: ["mykje"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter formene — kva er rett nynorsk og kva er feil?",
      categories: {
        "Rett nynorsk": ["ikkje", "berre", "kva", "frå", "korleis", "mykje", "kvifor"],
        "Ikkje rett (bokmål)": ["ikke", "bare", "hva", "fra", "hvordan", "mye", "hvorfor"],
      },
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Jeg vet ikke hvorfor han ikke kom.",
      accept: [
        "Eg veit ikkje kvifor han ikkje kom.",
      ],
      hint: "«vet» → «veit»; «ikke» → «ikkje»; «hvorfor» → «kvifor».",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Vi har bare litt mat, men det er nok til oss alle.",
      accept: [
        "Vi har berre litt mat, men det er nok til oss alle.",
        "Me har berre litt mat, men det er nok til oss alle.",
      ],
      hint: "«bare» → «berre»; «vi» kan bli «vi» eller «me».",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Eigen feilretting",
      question: "Skriv fem setningar på bokmål, og deretter dei same fem på nynorsk. Marker gjerne kva som er endra.",
      minWords: 40,
      checklist: [
        "Fem setningar på bokmål.",
        "Same setningar på nynorsk.",
        "Bruk minst tre av småorda: ikkje, berre, kva, kvifor, korleis, frå, mykje.",
      ],
    },
  ],
});
