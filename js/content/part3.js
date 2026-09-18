/* Del 3: Ordbok og oppslag */

Modules.register({
  id: "ordbok-verktoya",
  part: 3,
  title: "Tre ordbøker, tre styrkar",
  summary: "Lexin, ordbokene.no og papirordboka: kva dei er laga for, og når du bør bruke kva.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Kva slags ordbok har du framfor deg?",
      content: `
        <p>Ei ordbok svarar på fire spørsmål: <strong>Finst ordet?</strong>
        <strong>Kva tyder det?</strong> <strong>Kva ordklasse og kjønn har det?</strong>
        <strong>Korleis blir det bøygd?</strong> Alle tre ordbøkene under svarar på dette,
        men dei er laga for ulike lesarar.</p>

        <h3>Lexin</h3>
        <p><a href="https://lexin.oslomet.no/" target="_blank" rel="noopener">lexin.oslomet.no</a>
        er laga for elevar som held på å lære norsk. Forklaringane er korte og enkle, og
        kvart ord har døme på korleis det blir brukt i ei setning. Du får både bokmål og
        nynorsk, og i tillegg atten andre språk, så du kan slå opp frå morsmålet ditt.
        Ordboka les òg orda høgt med talesyntese, slik at du høyrer uttalen. Lexin blir
        laga av NAFO ved OsloMet på oppdrag frå Utdanningsdirektoratet.</p>

        <h3>Ordbokene.no</h3>
        <p><a href="https://ordbokene.no/" target="_blank" rel="noopener">ordbokene.no</a>
        er <em>Bokmålsordboka</em> og <em>Nynorskordboka</em>, og dei viser den offisielle
        rettskrivinga. Står ei form der, er ho lov å bruke. Nynorskordboka har rundt 90 000
        oppslagsord og Bokmålsordboka rundt 65 000, så her finn du langt fleire ord enn i
        Lexin. Du får bøying, uttale, ordhistorie, faste uttrykk og døme. Ordbøkene blir
        drivne av Språkrådet og Universitetet i Bergen, og finst òg som app på telefonen.</p>

        <h3>Papirordboka</h3>
        <p>Ei ordbok i bokform treng verken straum, nett eller innlogging. Ho er alltid
        den same, og på mange prøver er ho det einaste hjelpemiddelet du får. Til gjengjeld
        må du kunne alfabetet godt, for du må finne ordet sjølv.</p>

        <div class="callout">
          <strong>Kort sagt:</strong> Lexin forklarar, ordbokene.no avgjer kva som er rett,
          og papirordboka verkar alltid.
        </div>
      `,
    },
    {
      type: "lesson",
      title: "Kva vel du når?",
      content: `
        <table>
          <tr><th>Du lurer på …</th><th>Slå opp i</th></tr>
          <tr><td>Kva tyder dette ordet?</td>
              <td>Lexin, for der er forklaringa enklast.</td></tr>
          <tr><td>Er dette lov å skrive på nynorsk?</td>
              <td>Nynorskordboka på ordbokene.no. Står ordet der, er det innanfor norma.</td></tr>
          <tr><td>Kva kjønn har ordet, og korleis bøyer eg det?</td>
              <td>Begge. Nynorskordboka viser alle dei tillatne formene.</td></tr>
          <tr><td>Korleis uttalar eg ordet?</td>
              <td>Lexin, som les ordet høgt.</td></tr>
          <tr><td>Kva heiter dette ordet på morsmålet mitt?</td>
              <td>Lexin, som har atten andre språk.</td></tr>
          <tr><td>Nettet er nede, eller du sit på ei prøve utan maskin.</td>
              <td>Papirordboka.</td></tr>
        </table>

        <div class="callout warn">
          <strong>På prøver og eksamen</strong> er det Utdanningsdirektoratet og skulen din
          som bestemmer kva hjelpemiddel du får bruke. Minoritetsspråklege elevar har lov å
          bruke Lexin på eksamen. Spør læraren din i god tid kva som gjeld for di prøve,
          og øv på det hjelpemiddelet du faktisk får ha med deg.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Du skal skrive ein tekst på nynorsk og lurer på om <em class=\"nn\">venskap</em> er ei lovleg form. Kvar sjekkar du best?",
      options: [
        "I Lexin, for der er forklaringane enklast",
        "I Nynorskordboka på ordbokene.no, som viser den offisielle rettskrivinga",
        "På ei nettside med synonym",
        "Eg gjettar ut frå korleis ordet ser ut på bokmål",
      ],
      correct: 1,
      explanation: "Ordbokene.no viser den offisielle rettskrivinga. Står forma i Nynorskordboka, er ho lov. Lexin forklarar tydingar godt, men er ei mindre ordbok og avgjer ikkje norma.",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Kva ordbok passar best til kvar oppgåve?",
      pairs: [
        ["Høyre korleis ordet blir uttalt", "Lexin, som les ordet høgt"],
        ["Sjekke om ei bøyingsform er lov", "Nynorskordboka på ordbokene.no"],
        ["Slå opp når nettet er nede", "Papirordboka"],
        ["Finne ordet på morsmålet ditt", "Lexin, som har atten språk"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er den viktigaste skilnaden mellom Lexin og Nynorskordboka?",
      options: [
        "Lexin er på papir, Nynorskordboka er på nett",
        "Lexin er laga for dei som held på å lære norsk og har enkle forklaringar, mens Nynorskordboka er større og viser heile den offisielle norma",
        "Lexin har berre bokmål",
        "Nynorskordboka har ikkje bøying",
      ],
      correct: 1,
      explanation: "Lexin er laga for elevar som lærer norsk, med enkle forklaringar, døme og uttale på mange språk. Nynorskordboka har rundt 90 000 oppslagsord og viser den offisielle rettskrivinga.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Planlegg prøva",
      question: "Du skal ha ei prøve i nynorsk om to veker. Skriv 40 til 80 ord om kva du gjer <em>før</em> prøva for å vere sikker på at du får brukt ordboka godt.",
      minWords: 40,
      checklist: [
        "Kva spør du læraren om?",
        "Kva hjelpemiddel øver du på, og kvifor akkurat det?",
        "Kvifor held det ikkje å slå opp for første gong midt i prøva?",
      ],
    },
  ],
});

Modules.register({
  id: "ordbok-grunnform",
  part: 3,
  title: "Finn oppslagsordet",
  summary: "Ordbøker listar orda i grunnform. Slik finn du ho når ordet står bøygd i teksten.",
  estimatedMinutes: 30,
  sections: [
    {
      type: "lesson",
      title: "Ordboka kjenner berre grunnforma",
      content: `
        <p>Du leitar etter <em class="nn">bøkene</em> og finn ingenting. Det er ikkje fordi
        ordet er feil, men fordi ordbøker listar orda i <strong>grunnform</strong>. Du må
        rulle bøyinga tilbake før du slår opp.</p>

        <table>
          <tr><th>Ordklasse</th><th>Grunnforma er</th><th>Døme</th></tr>
          <tr><td>Substantiv</td><td>ubestemt form eintal</td>
              <td><em class="nn">bøkene</em> → <em class="nn">bok</em></td></tr>
          <tr><td>Verb</td><td>infinitiv</td>
              <td><em class="nn">sprang</em> → <em class="nn">springe</em></td></tr>
          <tr><td>Adjektiv</td><td>positiv, altså den korte forma</td>
              <td><em class="nn">finaste</em> → <em class="nn">fin</em></td></tr>
        </table>

        <h3>Slik rullar du tilbake</h3>
        <ul>
          <li><strong>Substantiv:</strong> stryk endingane <em class="nn">-a</em>,
              <em class="nn">-en</em>, <em class="nn">-ar</em>, <em class="nn">-ane</em>,
              <em class="nn">-er</em>, <em class="nn">-ene</em>.
              <em class="nn">jentene</em> → <em class="nn">jente</em>,
              <em class="nn">husa</em> → <em class="nn">hus</em>.</li>
          <li><strong>Svake verb:</strong> stryk <em class="nn">-a</em>, <em class="nn">-te</em>,
              <em class="nn">-de</em> eller <em class="nn">-r</em> og legg til
              <em class="nn">-e</em>. <em class="nn">kasta</em> → <em class="nn">kaste</em>,
              <em class="nn">høyrde</em> → <em class="nn">høyre</em>.</li>
          <li><strong>Sterke verb</strong> byter vokal, og då hjelper det ikkje å stryke
              endingar: <em class="nn">fann</em> → <em class="nn">finne</em>,
              <em class="nn">gjekk</em> → <em class="nn">gå</em>,
              <em class="nn">saup</em> → <em class="nn">supe</em>. Her må du kjenne verbet,
              eller la ordboka hjelpe deg.</li>
        </ul>

        <div class="callout">
          <strong>Snarveg på nett:</strong> På ordbokene.no og i Lexin kan du skrive inn den
          bøygde forma. Søket finn som regel oppslagsordet likevel, og viser deg kva
          grunnform forma høyrer til. I papirordboka finst ikkje den snarvegen.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Skriv grunnforma du må slå opp på, altså det ordet som står i ordboka.",
      items: [
        { prompt: "gutane → ___", accept: ["gut", "gutt"] },
        { prompt: "skreiv → ___", accept: ["skrive"] },
        { prompt: "høgaste → ___", accept: ["høg"] },
        { prompt: "hendene → ___", accept: ["hand"] },
        { prompt: "sov → ___", accept: ["sove"] },
      ],
      explanation: "Substantiv skal stå i ubestemt form eintal, verb i infinitiv og adjektiv i positiv. Legg merke til at <em class=\"nn\">hendene</em> og <em class=\"nn\">sov</em> byter vokal, så du må kjenne ordet.",
    },
    {
      type: "lesson",
      title: "Alfabetet i papirordboka",
      content: `
        <p>I papirordboka finn du ordet ved å følgje alfabetet. To ting overraskar mange:</p>
        <ul>
          <li><strong>Æ, ø og å står sist</strong>, i den rekkjefølgja, etter z.
              <em class="nn">år</em> kjem altså heilt bakarst i boka, ikkje først.</li>
          <li><strong>Leieorda øvst på sida</strong> viser det første og siste oppslagsordet
              på sida. Bruk dei til å bla deg fram, i staden for å lese kvar side.</li>
        </ul>
        <p>Ord som byrjar likt, blir sorterte på neste bokstav:
        <em class="nn">stad</em>, <em class="nn">stamme</em>, <em class="nn">stein</em>,
        <em class="nn">stor</em>, <em class="nn">styre</em>.</p>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva for ei rekkje står i rett alfabetisk rekkjefølgje?",
      options: [
        "ånd, bok, eple, søster",
        "bok, eple, søster, ånd",
        "bok, ånd, eple, søster",
        "eple, bok, ånd, søster",
      ],
      correct: 1,
      explanation: "Æ, ø og å står sist i alfabetet. Difor kjem <em class=\"nn\">ånd</em> etter <em class=\"nn\">søster</em>, og ikkje først.",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Kva oppslagsord må du leite etter?",
      pairs: [
        ["auga", "auge"],
        ["gjekk", "gå"],
        ["verst", "vond"],
        ["nettene", "natt"],
      ],
      explanation: "Alle fire er bøygde former som ser annleis ut enn grunnforma. <em class=\"nn\">Verst</em> høyrer til <em class=\"nn\">vond</em>, som blir gradbøygd <em class=\"nn\">vond, verre, verst</em>.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Forklar framgangsmåten",
      question: "Du les setninga «Dei bar sekkene opp bakken». Skriv 30 til 60 ord om kva to ord du må slå opp for å sjekke bøyinga, kva grunnform du leitar etter, og korleis du kom fram til henne.",
      minWords: 30,
      checklist: [
        "Nemn båe orda, eitt verb og eitt substantiv.",
        "Skriv grunnforma til kvart av dei.",
        "Forklar kvifor det eine ikkje kan løysast ved å stryke ei ending.",
      ],
    },
  ],
});

Modules.register({
  id: "ordbok-artikkel",
  part: 3,
  title: "Les ein ordbokartikkel",
  summary: "Forkortingar, kjønn, bøyingsformer og døme: slik hentar du ut det du treng.",
  estimatedMinutes: 30,
  sections: [
    {
      type: "lesson",
      title: "Kva står kvar?",
      content: `
        <p>Ein ordbokartikkel er tettpakka med informasjon. Slik ser ein typisk artikkel ut
        i Nynorskordboka, litt forenkla:</p>

        <div class="callout">
          <strong>bok</strong> f1 &nbsp; <em>bøying:</em> boka, bøker, bøkene<br>
          1 samling av blad med tekst, bundne saman mellom to permar<br>
          &nbsp;&nbsp;<em>lese ei bok, ei bok om fuglar</em><br>
          2 rekneskap, protokoll<br>
          &nbsp;&nbsp;<em>føre bok over utgiftene</em>
        </div>

        <ul>
          <li><strong>bok</strong> i halvfeit skrift er <strong>oppslagsordet</strong>,
              altså grunnforma.</li>
          <li><strong>f</strong> tyder hokjønn. Du vil òg sjå <strong>m</strong> for
              hankjønn, <strong>n</strong> for inkjekjønn, <strong>v</strong> for verb og
              <strong>adj</strong> for adjektiv. Talet etter, som <strong>f1</strong>,
              viser kva bøyingsmønster ordet følgjer.</li>
          <li><strong>Bøyinga</strong> står i rekkjefølgja bestemt eintal, ubestemt fleirtal,
              bestemt fleirtal: <em class="nn">boka, bøker, bøkene</em>. Står det fleire
              former skilde med komma på same plass, er begge lov.</li>
          <li><strong>Tydingane</strong> er nummererte. Den vanlegaste kjem først.</li>
          <li><strong>Døma</strong> står i kursiv og viser ordet i bruk. Dei er ofte det
              mest nyttige i heile artikkelen, for dei viser kva preposisjon eller
              bøyingsform ordet plar ha.</li>
        </ul>

        <div class="callout warn">
          <strong>Ikkje stopp ved tydinga.</strong> Det er bøyinga og døma som reddar deg
          når du skriv. Veit du at det heiter <em class="nn">boka</em> og ikkje
          <em class="bm">boken</em>, har oppslaget gjort jobben sin.
        </div>
      `,
    },
    {
      type: "reading",
      title: "Slå opp i denne artikkelen",
      passage: `
        <p class="muted">Forenkla artikkel frå Nynorskordboka:</p>
        <div class="callout">
          <strong>lærar</strong> m1 &nbsp; <em>bøying:</em> læraren, lærarar, lærarane<br>
          person som underviser<br>
          &nbsp;&nbsp;<em>ho er lærar i norsk, læraren vår er sjuk</em>
        </div>
        <div class="callout">
          <strong>skrive</strong> v. &nbsp; <em>bøying:</em> skriv, skreiv, skrive<br>
          1 setje bokstavar på papir eller skjerm<br>
          &nbsp;&nbsp;<em>skrive eit brev, skrive med blyant</em><br>
          2 lage ein tekst<br>
          &nbsp;&nbsp;<em>han har skrive ei bok</em>
        </div>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva kjønn har <em class=\"nn\">lærar</em>, og kva heiter bestemt form eintal?",
          options: [
            "Hokjønn, <em class=\"nn\">læraren</em>",
            "Hankjønn, <em class=\"nn\">læraren</em>",
            "Hankjønn, <em class=\"bm\">læreren</em>",
            "Inkjekjønn, <em class=\"nn\">lærarane</em>",
          ],
          correct: 1,
          explanation: "<strong>m</strong> tyder hankjønn, og den første bøyingsforma som står oppført, er bestemt form eintal: <em class=\"nn\">læraren</em>.",
        },
        {
          type: "multipleChoice",
          question: "Kva er preteritum av <em class=\"nn\">skrive</em>?",
          options: [
            "<em class=\"nn\">skriv</em>",
            "<em class=\"nn\">skreiv</em>",
            "<em class=\"bm\">skrev</em>",
            "<em class=\"nn\">skrive</em>",
          ],
          correct: 1,
          explanation: "Bøyinga står i rekkjefølgja presens, preteritum, perfektum partisipp: <em class=\"nn\">skriv, skreiv, skrive</em>.",
        },
        {
          type: "freeShort",
          question: "Skriv ei setning der du bruker <em class=\"nn\">lærar</em> i bestemt form fleirtal.",
          modelAnswer: "Lærarane på skulen vår har planleggingsdag på måndag.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Artikkelen fortel at <em class=\"nn\">bok</em> er hokjønn og blir bøygd <em class=\"nn\">boka, bøker, bøkene</em>. Fyll inn rett form.",
      items: [
        { prompt: "Eg las ___ ferdig i går. (bestemt eintal)", accept: ["boka"] },
        { prompt: "Han har lese tre ___ i sommar. (ubestemt fleirtal)", accept: ["bøker"] },
        { prompt: "Alle ___ stod i hylla. (bestemt fleirtal)", accept: ["bøkene"] },
      ],
      explanation: "Hokjønnsord får <em class=\"nn\">-a</em> i bestemt form eintal. <em class=\"nn\">Bok</em> har i tillegg omlyd i fleirtal: <em class=\"nn\">bøker, bøkene</em>.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "I ein artikkel står det <em>bøying:</em> <em class=\"nn\">sola, soler, solene</em> og i tillegg <em class=\"nn\">sol f1</em>. Kva fortel <strong>f1</strong> deg?",
      options: [
        "At ordet har éi tyding",
        "At ordet er hokjønn og følgjer bøyingsmønster 1",
        "At ordet står på side 1",
        "At ordet er eit framandord",
      ],
      correct: 1,
      explanation: "Bokstaven viser ordklasse og kjønn, og talet viser kva bøyingsmønster ordet følgjer. Du treng ikkje kunne mønstera utanåt, for bøyingsformene står oppførte rett etterpå.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Kva er døma gode for?",
      question: "Skriv 30 til 60 ord om kvifor døma i kursiv ofte er meir nyttige enn sjølve forklaringa når du skal skrive ein tekst.",
      minWords: 30,
      checklist: [
        "Kva ser du i eit døme som ikkje står i forklaringa?",
        "Kva veit du som regel frå før når du slår opp?",
      ],
    },
  ],
});

Modules.register({
  id: "ordbok-i-skriving",
  part: 3,
  title: "Bruk ordboka mens du skriv",
  summary: "Når er det verdt å slå opp, kva slår du opp, og korleis finn du nynorskordet når du berre kjenner bokmålsordet?",
  estimatedMinutes: 35,
  sections: [
    {
      type: "lesson",
      title: "Fire gonger det løner seg å slå opp",
      content: `
        <p>Du kan ikkje slå opp kvart ord. Desse fire situasjonane er verdt tida:</p>
        <ol>
          <li><strong>Du er usikker på kjønnet.</strong> Heiter det
              <em class="nn">ei bok</em> eller <em class="nn">eit bok</em>? Kjønnet styrer
              både artikkelen og bøyinga, så ein feil her smittar over på heile setninga.</li>
          <li><strong>Du er usikker på bøyinga.</strong> Særleg fleirtal av hankjønnsord
              (<em class="nn">-ar</em> og <em class="nn">-ane</em>) og preteritum av sterke
              verb.</li>
          <li><strong>Ordet luktar bokmål.</strong> Kjenner du att eit ord frå bokmål og er
              i tvil, søk det opp i Nynorskordboka. Får du treff, er ordet lov. Får du
              ingen treff, må du finne eit anna ord.</li>
          <li><strong>Du har brukt same ord fem gonger.</strong> Då kan du leite etter eit
              ord som tyder omtrent det same.</li>
        </ol>

        <h3>Frå bokmålsord til nynorskord</h3>
        <p>Ordbøkene er ikkje omsetjingsordbøker mellom bokmål og nynorsk, men du kjem
        langt med denne framgangsmåten:</p>
        <ol>
          <li>Søk bokmålsordet i <strong>Nynorskordboka</strong>. Mange ord er like i dei to
              målformene, og då får du treff med ein gong.</li>
          <li>Får du ikkje treff, slå opp ordet i <strong>Bokmålsordboka</strong> og les
              forklaringa. Forklaringa gir deg som regel eit anna ord du kan søkje på.
              <em class="bm">Anledning</em> blir forklart som «høve, sjanse», og
              <em class="nn">høve</em> finn du i Nynorskordboka.</li>
          <li>På ordbokene.no kan du søkje i begge ordbøkene samtidig, så du ser med ein
              gong om ordet finst i begge.</li>
          <li>I <strong>Lexin</strong> kan du byte mellom bokmål og nynorsk på same
              oppslagsord, og det er ofte den raskaste vegen for korte, vanlege ord.</li>
        </ol>

        <div class="callout warn">
          <strong>Ein vanleg felle:</strong> At eit ord finst i Nynorskordboka, tyder ikkje
          at det passar i teksten din. <em class="nn">Bok</em> og <em class="nn">bøker</em>
          er rett, men står ordet der som noko heilt anna enn det du meinte, har du valt
          feil ord. Les alltid forklaringa og eitt døme før du bruker ordet.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Du har skrive <em class=\"bm\">forskjellen</em> i teksten din, og finn ikkje ordet i Nynorskordboka. Kva gjer du?",
      options: [
        "Bruker ordet likevel, for det høyrest greitt ut",
        "Slår opp ordet i Bokmålsordboka, les forklaringa og finn eit nynorskord derifrå, til dømes <em class=\"nn\">skilnaden</em>",
        "Stryk heile setninga",
        "Byter til eit engelsk ord",
      ],
      correct: 1,
      explanation: "Forklaringa i Bokmålsordboka gir deg orda du kan søkje vidare på. <em class=\"bm\">Forskjell</em> blir forklart som «ulikskap, skilnad», og <em class=\"nn\">skilnad</em> står i Nynorskordboka.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Du har slege opp orda og fått denne informasjonen. Fyll inn rett form i setninga.",
      items: [
        { prompt: "<em>veke f1: veka, veker, vekene.</em> Neste ___ skal vi på tur. (bestemt eintal)", accept: ["veka"] },
        { prompt: "<em>stad m1: staden, stader, stadene.</em> Vi møttest på same ___ som sist. (bestemt eintal)", accept: ["staden"] },
        { prompt: "<em>finne v: finn, fann, funne.</em> I går ___ eg lommeboka mi. (preteritum)", accept: ["fann"] },
        { prompt: "<em>gut m1: guten, gutar, gutane.</em> Alle ___ i klassa var med. (bestemt fleirtal)", accept: ["gutane"] },
      ],
      explanation: "Når du har bøyingslinja framfor deg, er oppgåva berre å velje rett plass i rekkja. Substantiv: bestemt eintal, ubestemt fleirtal, bestemt fleirtal. Verb: presens, preteritum, perfektum partisipp.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk. Bruk ordboka på dei orda du er usikker på.",
      source: "Forskjellen mellom de to bøkene er ikke stor, men jeg likte den første best.",
      accept: [
        "Skilnaden mellom dei to bøkene er ikkje stor, men eg likte den første best.",
        "Skilnaden mellom dei to bøkene er ikkje stor, men eg likte den fyrste best.",
      ],
      hint: "Slå opp <em class=\"bm\">forskjell</em> i Bokmålsordboka og sjå kva nynorskord forklaringa gir deg.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv og slå opp",
      question: "Skriv ein tekst på 80 til 150 ord om ein stad du kjenner godt. Slå opp minst fem ord undervegs, og skriv til slutt ei linje under teksten der du listar orda du slo opp og kva du fann ut.",
      minWords: 80,
      checklist: [
        "Slå opp kjønnet på minst to substantiv.",
        "Slå opp preteritum av minst eitt sterkt verb.",
        "Sjekk minst eitt ord du mistenkjer er bokmål.",
        "List orda du slo opp nedst i teksten.",
        "Bruk «Sjekk språket»-knappen til slutt.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Svar medeleven",
      question: "Ein medelev seier: «Eg gidd ikkje slå opp, eg skriv berre som det høyrest ut.» Skriv 40 til 80 ord om kva du vil svare.",
      minWords: 40,
      checklist: [
        "Når fungerer metoden hans, og når gjer han det ikkje?",
        "Kva slags feil er vanskelege å høyre?",
        "Kor lang tid tek eigentleg fem oppslag?",
      ],
    },
  ],
});
