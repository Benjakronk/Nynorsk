/* Del 2 · Grunnomgrep: undervisningsmodular om grammatiske omgrep */

Modules.register({
  id: "omgrep-ordet",
  part: 2,
  group: "omgrep",
  title: "Ordet: stamme, ending og rot",
  summary: "Kva eit ord er bygd opp av, og skilnaden på å bøye eit ord og å lage eit nytt.",
  estimatedMinutes: 25,
  sections: [
    {
      id: "ord1",
      type: "lesson",
      title: "Kva er eit ord bygd opp av?",
      content: `
        <p>Dei fleste ord kan delast i mindre bitar som kvar for seg ber tyding. Sjå på ordet
        <em class="nn">gutane</em>: det består av <em class="nn">gut</em> (ein ung mann) og
        <em class="nn">-ane</em> (fleire, bestemte). Når du kan sjå desse bitane, blir
        nynorsk bøying mykje lettare å forstå og å hugse.</p>

        <h3>Tre omgrep du treng</h3>
        <table>
          <thead><tr><th>Omgrep</th><th>Kva det er</th><th>Døme</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Rot</strong></td>
              <td>Den minste delen av ordet som har tyding, og som ikkje kan delast vidare.</td>
              <td><em class="nn">gut</em>, <em class="nn">kast</em>, <em class="nn">fin</em>, <em class="nn">fri</em> (i <em class="nn">fridom</em>)</td>
            </tr>
            <tr>
              <td><strong>Stamme</strong></td>
              <td>Den delen av ordet som endingane blir hengde på. Ofte er stamma lik rota, men
              ho kan òg vere ei rot pluss forstaving, etterstaving eller eit anna ord.</td>
              <td><em class="nn">gut-</em> (gut<em>ane</em>), <em class="nn">skulegut-</em> (skulegut<em>ane</em>),
              <em class="nn">kasting-</em> (kasting<em>a</em>)</td>
            </tr>
            <tr>
              <td><strong>Ending</strong></td>
              <td>Den delen som blir hengd på stamma og fortel om <em>form</em>: tal, bestemtheit,
              tid, grad. Endinga lagar ikkje eit nytt ord, berre ei ny form av det same ordet.</td>
              <td><em class="nn">-ar, -ane, -a, -er, -ene, -et</em> (substantiv) ·
              <em class="nn">-ar, -a, -er, -te, -de, -t</em> (verb) · <em class="nn">-are, -ast</em> (adjektiv)</td>
            </tr>
          </tbody>
        </table>

        <h3>Sjå ordet bli bygd</h3>
        <div class="ordbygg" data-spel>
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
        </div>
      `,
    },
    {
      id: "ord2",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: stamme og ending",
      question: "Kva er <em class=\"nn\">stamma</em> i ordet <em class=\"nn\">gutane</em>?",
      options: [
        "gut-",
        "gutane",
        "-ane",
      ],
      correct: 0,
      explanation: "Stamma er den delen endingane blir hengde på. <em class=\"nn\">gutane</em> er stamma <em class=\"nn\">gut-</em> pluss endinga <em class=\"nn\">-ane</em>, som fortel bestemt form fleirtal.",
    },
    {
      id: "ord3",
      type: "lesson",
      title: "Slik ser det ut i praksis",
      content: `        <h3>Slik ser det ut i praksis</h3>
        <table>
          <thead><tr><th>Ord</th><th>Stamme</th><th>Ending</th><th>Kva endinga fortel</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">gutane</em></td><td>gut-</td><td>-ane</td><td>bestemt form fleirtal</td></tr>
            <tr><td><em class="nn">jenta</em></td><td>jent-</td><td>-a</td><td>bestemt form eintal</td></tr>
            <tr><td><em class="nn">husa</em></td><td>hus-</td><td>-a</td><td>bestemt form fleirtal</td></tr>
            <tr><td><em class="nn">kastar</em></td><td>kast-</td><td>-ar</td><td>presens (no)</td></tr>
            <tr><td><em class="nn">kasta</em></td><td>kast-</td><td>-a</td><td>preteritum (før)</td></tr>
            <tr><td><em class="nn">høyrde</em></td><td>høyr-</td><td>-de</td><td>preteritum</td></tr>
            <tr><td><em class="nn">finare</em></td><td>fin-</td><td>-are</td><td>komparativ (meir enn)</td></tr>
          </tbody>
        </table>

        <p>Legg merke til <em class="nn">jenta</em>: når ordet endar på <em class="nn">-e</em>
        i grunnforma (<em class="nn">jente</em>), fell denne <em class="nn">-e</em>-en bort
        før endinga. Stamma er <em class="nn">jent-</em>, ikkje <em class="bm">jente-</em>.
        Difor heiter det <em class="nn">jenta</em> og <em class="nn">jenter</em>, ikkje
        <em class="bm">jentea</em>.</p>

        <div class="callout">
          <strong>Slik finn du stamma:</strong>
          <ul>
            <li><strong>Substantiv:</strong> ta ubestemt form eintal utan artikkel, og stryk ein eventuell
            <em class="nn">-e</em>: <em class="nn">gut-, jent-, hus-, epl-</em>.</li>
            <li><strong>Verb:</strong> ta infinitiven og stryk <em class="nn">-e</em>: <em class="nn">kast-, høyr-, skriv-</em>.
            (Kortverb som <em class="nn">bu</em> og <em class="nn">nå</em> har ingen -e å stryke.)</li>
            <li><strong>Adjektiv:</strong> grunnforma er stamma: <em class="nn">fin-, stor-, gammal-</em>.</li>
          </ul>
        </div>

        <div class="callout warn">
          <strong>Kvifor bry seg?</strong> Dei fleste nynorskfeil er <em>endingsfeil</em>:
          <em class="bm">kastet</em> i staden for <em class="nn">kasta</em>,
          <em class="bm">boken</em> i staden for <em class="nn">boka</em>,
          <em class="bm">husene</em> i staden for <em class="nn">husa</em>. Stamma er den same
          på bokmål og nynorsk. Det er endinga du må passe på.
        </div>
      `,
    },
    {
      id: "ord4",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: stamma når ordet endar på -e",
      question: "Ordet <em class=\"nn\">jente</em> blir <em class=\"nn\">jenta</em> i bestemt form. Kva er stamma?",
      options: [
        "jent-",
        "jente-",
        "jenta-",
      ],
      correct: 0,
      explanation: "Når ordet endar på <em class=\"nn\">-e</em> i grunnforma, fell den <em class=\"nn\">-e</em>-en bort før endinga. Difor heiter det <em class=\"nn\">jenta</em> og <em class=\"nn\">jenter</em>, ikkje <em class=\"nn\">jentea</em>.",
    },
    {
      id: "ord5",
      type: "lesson",
      title: "Bøying eller orddanning?",
      content: `
        <p>Vi endrar ord på to heilt ulike måtar. Det er viktig å halde dei frå kvarandre.</p>

        <h3>Bøying: same ord, ny form</h3>
        <p>Når vi <strong>bøyer</strong> eit ord, hengjer vi ei ending på stamma. Ordet tyder
        det same og høyrer til same ordklasse, og vi har berre valt ei anna form:
        <em class="nn">gut – guten – gutar – gutane</em>, <em class="nn">kaste – kastar – kasta</em>,
        <em class="nn">fin – finare – finast</em>.</p>

        <h3>Orddanning: eit nytt ord</h3>
        <p>Når vi driv <strong>orddanning</strong>, lagar vi eit nytt ord med ny tyding, og
        ofte ny ordklasse. Det skjer på to måtar:</p>

      `,
    },
    {
      id: "ord6",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: bøying mot orddanning",
      question: "<em class=\"nn\">kastar</em> og <em class=\"nn\">kasting</em> er laga frå same stamme. Kva er kva?",
      options: [
        "<em class=\"nn\">kastar</em> er bøying, <em class=\"nn\">kasting</em> er orddanning",
        "Begge er bøying",
        "Begge er orddanning",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">kastar</em> er framleis verbet <em class=\"nn\">kaste</em>, berre i presens. <em class=\"nn\">kasting</em> er eit nytt ord i ei ny ordklasse, eit substantiv.",
    },
    {
      id: "ord7",
      type: "lesson",
      title: "Orddanning 1: avleiing",
      content: `        <h3>1. Avleiing: forstaving eller etterstaving</h3>
        <table>
          <thead><tr><th>Forstaving (prefiks)</th><th>Døme</th><th>Kva ho gjer</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">u-</em></td><td>ufarleg, uvenn, uro</td><td>snur tydinga</td></tr>
            <tr><td><em class="nn">mis-</em></td><td>mistyde, misnøgd</td><td>«feil», «dårleg»</td></tr>
            <tr><td><em class="nn">sam-</em></td><td>samarbeid, samtale</td><td>«i lag»</td></tr>
            <tr><td><em class="nn">for-</em></td><td>forstå, fortelje</td><td>endrar tydinga</td></tr>
          </tbody>
        </table>
        <table>
          <thead><tr><th>Etterstaving (suffiks)</th><th>Døme</th><th>Ny ordklasse</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">-ing</em></td><td>kaste → kast<strong>ing</strong>, lese → les<strong>ing</strong></td><td>verb → substantiv (handlinga)</td></tr>
            <tr><td><em class="nn">-nad</em></td><td>søkje → søk<strong>nad</strong>, bu → bu<strong>nad</strong></td><td>verb → substantiv</td></tr>
            <tr><td><em class="nn">-ar</em></td><td>lære → lær<strong>ar</strong>, lese → les<strong>ar</strong></td><td>verb → substantiv (den som gjer det)</td></tr>
            <tr><td><em class="nn">-leg</em></td><td>venn → ven<strong>leg</strong>, fare → far<strong>leg</strong></td><td>substantiv → adjektiv</td></tr>
            <tr><td><em class="nn">-sam</em></td><td>verke → verk<strong>sam</strong>, spare → spar<strong>sam</strong></td><td>verb → adjektiv</td></tr>
            <tr><td><em class="nn">-skap</em></td><td>venn → venn<strong>skap</strong>, kunne → kunn<strong>skap</strong></td><td>→ substantiv (abstrakt)</td></tr>
            <tr><td><em class="nn">-dom</em></td><td>fri → fri<strong>dom</strong>, sjuk → sjuk<strong>dom</strong></td><td>adjektiv → substantiv</td></tr>
            <tr><td><em class="nn">-leik</em></td><td>kjær → kjær<strong>leik</strong>, stor → stor<strong>leik</strong></td><td>adjektiv → substantiv</td></tr>
          </tbody>
        </table>
        <p>Legg merke til at nynorsk gjerne brukar <em class="nn">-dom, -leik, -skap</em> og
        <em class="nn">-nad</em> der bokmål brukar <em class="bm">-het</em> og
        <em class="bm">-else</em>: <em class="nn">fridom</em> (frihet), <em class="nn">kjærleik</em>
        (kjærlighet), <em class="nn">søknad</em> (søknad), <em class="nn">røynsle</em> (erfaring).</p>

      `,
    },
    {
      id: "ord8",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: forstaving og etterstaving",
      question: "I ordet <em class=\"nn\">ufarleg</em>, kva er <em class=\"nn\">u-</em> og <em class=\"nn\">-leg</em>?",
      options: [
        "<em class=\"nn\">u-</em> er forstaving, <em class=\"nn\">-leg</em> er etterstaving",
        "Begge er forstavingar",
        "<em class=\"nn\">u-</em> er etterstaving, <em class=\"nn\">-leg</em> er forstaving",
      ],
      correct: 0,
      explanation: "Ei forstaving står framfor stamma, ei etterstaving etter. <em class=\"nn\">u-</em> snur tydinga, og <em class=\"nn\">-leg</em> gjer substantivet <em class=\"nn\">fare</em> om til eit adjektiv.",
    },
    {
      id: "ord9",
      type: "lesson",
      title: "Orddanning 2: samansetning",
      content: `        <h3>2. Samansetning: to ord blir eitt</h3>
        <p><em class="nn">skule + bok = skulebok</em>, <em class="nn">fot + ball = fotball</em>,
        <em class="nn">sommar + ferie = sommarferie</em>. Nokre gonger kjem det ein bindebokstav
        mellom ledda: <em class="nn">barn<strong>e</strong>hage</em>, <em class="nn">arbeid<strong>s</strong>dag</em>.</p>
        <div class="callout">
          <strong>Sisteleddet bestemmer.</strong> Det siste ordet i ei samansetning avgjer kjønn og
          bøying: <em class="nn">ei skule<strong>bok</strong></em> (fordi <em class="nn">bok</em> er hokjønn),
          <em class="nn">eit fot<strong>ballag</strong></em> (fordi <em class="nn">lag</em> er inkjekjønn).
          Samansette ord skal alltid skrivast i <strong>eitt ord</strong>: <em class="nn">skulebok</em>,
          ikkje <em class="bm">skule bok</em>.
        </div>

        <h3>Den raske testen</h3>
        <ul>
          <li>Er det <strong>same ordet i ei anna form</strong> (fleirtal, bestemt, fortid, grad)? → <strong>bøying</strong></li>
          <li>Har ordet fått <strong>ny tyding eller ny ordklasse</strong>? → <strong>orddanning</strong>
          (avleiing om det er ei for- eller etterstaving, samansetning om det er to ord)</li>
        </ul>
      `,
    },
    {
      id: "ord10",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: sisteleddet bestemmer",
      question: "Kva kjønn har ordet <em class=\"nn\">skulebok</em>?",
      options: [
        "Hokjønn, fordi <em class=\"nn\">bok</em> er hokjønn",
        "Hankjønn, fordi <em class=\"nn\">skule</em> er hankjønn",
        "Inkjekjønn",
      ],
      correct: 0,
      explanation: "Sisteleddet avgjer kjønn og bøying i eit samansett ord. <em class=\"nn\">bok</em> er hokjønn, så det heiter <em class=\"nn\">ei skulebok</em>.",
    },
    {
      id: "ord11",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Del ordet i stamme og ending. Skriv stamma utan bindestrek og endinga med bindestrek (t.d. <em class=\"nn\">gut</em> og <em class=\"nn\">-ane</em>).",
      items: [
        { prompt: "gutane: stamma er ___", accept: ["gut"] },
        { prompt: "gutane: endinga er ___", accept: ["-ane", "ane"] },
        { prompt: "jenta: stamma er ___", accept: ["jent"] },
        { prompt: "jenta: endinga er ___", accept: ["-a", "a"] },
        { prompt: "kastar: stamma er ___", accept: ["kast"] },
        { prompt: "kastar: endinga er ___", accept: ["-ar", "ar"] },
        { prompt: "høyrde: endinga er ___", accept: ["-de", "de"] },
        { prompt: "finare: endinga er ___", accept: ["-are", "are"] },
      ],
      explanation: "Stamma er den delen endinga blir hengd på. Hugs at -e i grunnforma (jente, kaste) fell bort før endinga: jent-a, kast-ar.",
    },
    {
      id: "ord12",
      type: "exercise",
      exerciseType: "categorize",
      question: "Bøying, avleiing eller samansetning? Sorter orda.",
      categories: {
        "Bøying (same ord, ny form)": ["gutar", "kasta", "finare", "husa", "jentene"],
        "Avleiing (for- eller etterstaving)": ["ufarleg", "kasting", "fridom", "lærar", "misnøgd"],
        "Samansetning (to ord)": ["skulebok", "fotball", "regnjakke", "sommarferie", "barnehage"],
      },
      explanation: "Bøying gir ei ny form av same ord (gut → gutar). Avleiing legg til ei forstaving eller etterstaving og lagar eit nytt ord (fri → fridom). Samansetning set saman to ord (skule + bok).",
    },
    {
      id: "ord13",
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman endinga med det ho fortel:",
      pairs: [
        ["-ane i «gutane»", "bestemt form fleirtal, hankjønn"],
        ["-a i «jenta»", "bestemt form eintal, hokjønn"],
        ["-ene i «jentene»", "bestemt form fleirtal, hokjønn"],
        ["-ar i «kastar»", "presens"],
        ["-a i «kasta»", "preteritum"],
        ["-are i «finare»", "komparativ"],
        ["-et i «huset»", "bestemt form eintal, inkjekjønn"],
      ],
      explanation: "Same bokstav kan vere ulike endingar: -a er bestemt eintal på hokjønnsord (jenta), bestemt fleirtal på inkjekjønnsord (husa) og preteritum av a-verb (kasta).",
    },
    {
      id: "ord14",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er <strong>rota</strong> i ordet <em class=\"nn\">sjukdomen</em>?",
      options: ["sjuk", "sjukdom", "dom", "sjukdomen"],
      correct: 0,
      explanation: "Rota er den minste delen med tyding, og her er det <em class=\"nn\">sjuk</em>. Så kjem etterstavinga <em class=\"nn\">-dom</em>, som lagar eit substantiv av adjektivet, og til slutt bøyingsendinga <em class=\"nn\">-en</em> (bestemt form eintal). Heile ordet: <em class=\"nn\">sjuk + dom + en</em>.",
    },
    {
      id: "ord15",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva for eit av desse orda er laga ved <strong>avleiing</strong>?",
      options: ["fotball", "kasting", "gutane", "huset"],
      correct: 1,
      explanation: "<em class=\"nn\">kasting</em> er verbet <em class=\"nn\">kaste</em> + etterstavinga <em class=\"nn\">-ing</em>, altså eit nytt ord (substantiv). <em class=\"nn\">fotball</em> er samansetning, <em class=\"nn\">gutane</em> og <em class=\"nn\">huset</em> er bøying.",
    },
    {
      id: "ord16",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Lag nye ord med etterstaving:",
      items: [
        { prompt: "å lese → ein person som les: ein ___", accept: ["lesar"] },
        { prompt: "fri → tilstanden å vere fri: ___", accept: ["fridom"] },
        { prompt: "å kaste → sjølve handlinga: ___", accept: ["kasting"] },
        { prompt: "å søkje → det du sender inn: ein ___", accept: ["søknad"] },
        { prompt: "sjuk → det å vere sjuk: ___", accept: ["sjukdom"] },
        { prompt: "kjær → kjensla: ___", accept: ["kjærleik"] },
      ],
      explanation: "Nynorsk brukar gjerne -ar (lesar), -dom (fridom, sjukdom), -ing (kasting), -nad (søknad) og -leik (kjærleik).",
    },
    {
      id: "ord17",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set saman orda til eitt ord, og vel rett artikkel til slutt:",
      items: [
        { prompt: "skule + bok = ___", accept: ["skulebok"] },
        { prompt: "fot + ball = ___", accept: ["fotball"] },
        { prompt: "sommar + ferie = ___", accept: ["sommarferie"] },
        { prompt: "barn + hage = ___ (hugs bindebokstaven)", accept: ["barnehage"] },
        { prompt: "Kva artikkel får «skulebok»? ___ skulebok", accept: ["ei"] },
        { prompt: "Kva artikkel får «fotballag»? ___ fotballag", accept: ["eit"] },
      ],
      explanation: "Sisteleddet bestemmer kjønnet: bok er hokjønn (ei skulebok), lag er inkjekjønn (eit fotballag).",
    },
    {
      id: "ord18",
      type: "exercise",
      exerciseType: "freeText",
      title: "Ordjakt",
      question: "Finn ti ord i ei bok, ei avis eller på ei nettside. Skriv kvart ord, del det i stamme og ending, og skriv kva endinga fortel. Døme: «bøkene = bøk- + -ene, bestemt form fleirtal». Finn minst eitt ord som er laga ved avleiing og eitt ved samansetning.",
      minWords: 60,
      checklist: [
        "Ti ord, kvart delt i stamme og ending.",
        "Kva fortel endinga (tal, bestemtheit, tid, grad)?",
        "Minst eitt avleidd ord og eitt samansett ord. Merk dei.",
      ],
    },
  ],
});

Modules.register({
  id: "omgrep-ordklassar",
  part: 2,
  group: "omgrep",
  title: "Ordklassane: ei oversikt",
  summary: "Dei ti ordklassane, korleis du kjenner dei att, og dei vanlegaste forvekslingane.",
  estimatedMinutes: 30,
  sections: [
    {
      id: "okl1",
      type: "lesson",
      title: "Ti ordklassar",
      content: `
        <div class="ordklassar" data-spel>
          <p class="ordkl-setning"><span class="ordkl" data-kl="interjeksjon">Au!</span> <span class="ordkl" data-kl="determinativ">Den</span> <span class="ordkl" data-kl="adjektiv">gamle</span> <span class="ordkl" data-kl="substantiv">mannen</span> <span class="ordkl" data-kl="verb">gjekk</span> <span class="ordkl" data-kl="adverb">sakte</span> <span class="ordkl" data-kl="preposisjon">over</span> <span class="ordkl" data-kl="determinativ">den</span> <span class="ordkl" data-kl="adjektiv">lange</span> <span class="ordkl" data-kl="substantiv">brua,</span> <span class="ordkl" data-kl="konjunksjon">men</span> <span class="ordkl" data-kl="pronomen">han</span> <span class="ordkl" data-kl="verb">datt</span> <span class="ordkl" data-kl="adverb">ikkje,</span> <span class="ordkl" data-kl="subjunksjon">fordi</span> <span class="ordkl" data-kl="pronomen">han</span> <span class="ordkl" data-kl="verb">heldt</span> <span class="ordkl" data-kl="pronomen">seg</span> <span class="ordkl" data-kl="preposisjon">i</span> <span class="ordkl" data-kl="substantiv">rekkverket.</span></p>
          <div class="ordkl-legende"><button type="button" class="ordkl-knapp" data-kl="substantiv"><i class="ordkl-farge substantiv"></i>substantiv</button><button type="button" class="ordkl-knapp" data-kl="verb"><i class="ordkl-farge verb"></i>verb</button><button type="button" class="ordkl-knapp" data-kl="adjektiv"><i class="ordkl-farge adjektiv"></i>adjektiv</button><button type="button" class="ordkl-knapp" data-kl="adverb"><i class="ordkl-farge adverb"></i>adverb</button><button type="button" class="ordkl-knapp" data-kl="pronomen"><i class="ordkl-farge pronomen"></i>pronomen</button><button type="button" class="ordkl-knapp" data-kl="determinativ"><i class="ordkl-farge determinativ"></i>determinativ</button><button type="button" class="ordkl-knapp" data-kl="preposisjon"><i class="ordkl-farge preposisjon"></i>preposisjon</button><button type="button" class="ordkl-knapp" data-kl="konjunksjon"><i class="ordkl-farge konjunksjon"></i>konjunksjon</button><button type="button" class="ordkl-knapp" data-kl="subjunksjon"><i class="ordkl-farge subjunksjon"></i>subjunksjon</button><button type="button" class="ordkl-knapp" data-kl="interjeksjon"><i class="ordkl-farge interjeksjon"></i>interjeksjon</button></div>
          <p class="muted-note">Trykk på ein ordklasse for å sjå kva ord i setninga som høyrer til han. Alle ti er med.</p>
        </div>
        <p>Alle ord i språket høyrer til ein <strong>ordklasse</strong>. Ordklassen fortel
        kva slags ord det er, korleis det kan bøyast, og kva jobb det kan gjere i ei setning.
        I skulen deler vi orda i <strong>ti ordklassar</strong>. Du treng ikkje pugge dei
        som ei liste. Du treng ein <em>test</em> for kvar av dei.</p>

        <table>
          <thead><tr><th>Ordklasse</th><th>Kva orda gjer</th><th>Test</th><th>Døme</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Substantiv</strong></td>
              <td>Namn på personar, ting, stader, kjensler og idear.</td>
              <td>Kan du setje <em class="nn">ein/ei/eit</em> framfor? (<em class="nn">ein gut, ei bok, eit hus</em>)</td>
              <td><em class="nn">gut, bok, hus, glede, Bergen</em></td>
            </tr>
            <tr>
              <td><strong>Verb</strong></td>
              <td>Fortel kva som skjer, blir gjort eller er.</td>
              <td>Kan du setje <em class="nn">å</em> framfor og bøye i tid? (<em class="nn">å kaste – kastar – kasta</em>)</td>
              <td><em class="nn">kaste, skrive, sove, vere</em></td>
            </tr>
            <tr>
              <td><strong>Adjektiv</strong></td>
              <td>Beskriv eit substantiv: korleis noko er.</td>
              <td>Kan du gradbøye? (<em class="nn">fin – finare – finast</em>) Rettar det seg etter substantivet? (<em class="nn">fin, fint, fine</em>)</td>
              <td><em class="nn">fin, stor, raud, gammal, glad</em></td>
            </tr>
            <tr>
              <td><strong>Adverb</strong></td>
              <td>Seier noko om verbet, adjektivet eller heile setninga: korleis, kvar, når, kor mykje.</td>
              <td>Svarer det på «korleis / kvar / når / kor mykje?» utan å beskrive eit substantiv?</td>
              <td><em class="nn">ikkje, no, her, ofte, svært, heldigvis</em></td>
            </tr>
            <tr>
              <td><strong>Pronomen</strong></td>
              <td>Står i staden for eit substantiv eller ein heil frase.</td>
              <td>Kan du byte ordet ut med eit namn eller eit substantiv? (<em class="nn">ho les → Kari les</em>)</td>
              <td><em class="nn">eg, du, han, ho, det, vi, dei, seg, kven, kva</em></td>
            </tr>
            <tr>
              <td><strong>Determinativ</strong></td>
              <td>Står til eit substantiv og «bestemmer» det: kven det tilhøyrer, kor mange, kva for eitt.</td>
              <td>Står det saman med eit substantiv? (<em class="nn">min bil, denne boka, tre hus, ein gut</em>)</td>
              <td><em class="nn">min, din, vår, denne, dette, den, alle, mange, tre, ein/ei/eit</em></td>
            </tr>
            <tr>
              <td><strong>Preposisjon</strong></td>
              <td>Viser plass, retning, tid eller forhold.</td>
              <td>Kan du setje eit substantiv rett etter? (<em class="nn">på bordet, til skulen, etter middagen</em>)</td>
              <td><em class="nn">på, i, til, frå, etter, under, med, utan</em></td>
            </tr>
            <tr>
              <td><strong>Konjunksjon</strong></td>
              <td>Bind saman to like ledd eller to heilsetningar.</td>
              <td>Står det <em>mellom</em> to ledd som er like? (<em class="nn">gut og jente</em>, <em class="nn">eg kom, men ho gjekk</em>)</td>
              <td><em class="nn">og, men, eller, for</em></td>
            </tr>
            <tr>
              <td><strong>Subjunksjon</strong></td>
              <td>Innleier ei leddsetning.</td>
              <td>Kjem det ei heil setning (med subjekt og verbal) rett etter? (<em class="nn">fordi vi var trøytte</em>)</td>
              <td><em class="nn">at, fordi, dersom, når, då, som, om, sjølv om</em></td>
            </tr>
            <tr>
              <td><strong>Interjeksjon</strong></td>
              <td>Utrop, svarord og lydord. Står ofte åleine.</td>
              <td>Kan ordet stå heilt for seg sjølv som ei ytring? (<em class="nn">Au! Ja. Hei!</em>)</td>
              <td><em class="nn">ja, nei, au, hei, uff, takk</em></td>
            </tr>
          </tbody>
        </table>

      `,
    },
    {
      id: "okl2",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: testen for verb",
      question: "Du vil finne ut om eit ord er eit verb. Kva test brukar du?",
      options: [
        "Kan du setje <em class=\"nn\">å</em> framfor og bøye ordet i tid?",
        "Kan du setje <em class=\"nn\">ein/ei/eit</em> framfor?",
        "Kan du gradbøye ordet?",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">å kaste, kastar, kasta</em>. Testen med <em class=\"nn\">ein/ei/eit</em> høyrer til substantiv, og gradbøying høyrer til adjektiv.",
    },
    {
      id: "okl3",
      type: "lesson",
      title: "Bøyelege og ubøyelege ordklassar",
      content: `        <h3>Bøyelege og ubøyelege ordklassar</h3>
        <p>Nokre ordklassar kan skifte form, og dei er <strong>bøyelege</strong>. Andre ser alltid like
        ut, og dei er <strong>ubøyelege</strong>.</p>
        <table>
          <thead><tr><th>Bøyelege</th><th>Kva dei bøyer seg i</th></tr></thead>
          <tbody>
            <tr><td>Substantiv</td><td>tal og bestemtheit: <em class="nn">gut – guten – gutar – gutane</em></td></tr>
            <tr><td>Verb</td><td>tid: <em class="nn">kaste – kastar – kasta – har kasta</em></td></tr>
            <tr><td>Adjektiv</td><td>grad og samsvar: <em class="nn">fin – finare – finast</em>, <em class="nn">fin – fint – fine</em></td></tr>
            <tr><td>Pronomen</td><td>subjekt- og objektform: <em class="nn">eg – meg, ho – henne, vi – oss</em></td></tr>
            <tr><td>Determinativ</td><td>kjønn og tal: <em class="nn">min – mi – mitt – mine</em>, <em class="nn">denne – dette – desse</em></td></tr>
          </tbody>
        </table>
        <table>
          <thead><tr><th>Ubøyelege</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td>Adverb</td><td><em class="nn">ikkje, her, no, alltid</em> (nokre få kan gradbøyast: <em class="nn">ofte – oftare – oftast</em>)</td></tr>
            <tr><td>Preposisjon</td><td><em class="nn">på, i, til, frå</em></td></tr>
            <tr><td>Konjunksjon</td><td><em class="nn">og, men, eller</em></td></tr>
            <tr><td>Subjunksjon</td><td><em class="nn">at, fordi, dersom</em></td></tr>
            <tr><td>Interjeksjon</td><td><em class="nn">au, ja, hei</em></td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Kvifor er dette nyttig på nynorsk?</strong> Nesten alle nynorskfeil skjer i dei
          bøyelege ordklassane, for det er der endingane er. Veit du at eit ord er eit substantiv,
          veit du òg at du må sjekke kjønn og fleirtalsending. Veit du at det er eit verb, må du
          finne ut om det er a-verb, e-verb eller sterkt. Dei ubøyelege orda kan du berre lære
          som gloser (<em class="bm">ikke</em> → <em class="nn">ikkje</em>, <em class="bm">hvis</em> →
          <em class="nn">dersom/viss</em>).
        </div>
      `,
    },
    {
      id: "okl4",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: bøyeleg eller ubøyeleg",
      question: "Kva for ei av desse ordklassane er <strong>ubøyeleg</strong>?",
      options: [
        "Preposisjon",
        "Substantiv",
        "Adjektiv",
      ],
      correct: 0,
      explanation: "Preposisjonar som <em class=\"nn\">på, i, til</em> ser alltid like ut. Substantiv bøyer seg i tal og bestemtheit, og adjektiv i grad og samsvar.",
    },
    {
      id: "okl5",
      type: "lesson",
      title: "Forveksling 1: adjektiv eller adverb?",
      content: `
        <p>Same ord kan høyre til ulike ordklassar alt etter korleis det blir brukt. Difor må du
        alltid sjå på ordet <em>i setninga</em>, ikkje berre på ordet åleine.</p>

        <h3>1. Adjektiv eller adverb?</h3>
        <table>
          <thead><tr><th>Setning</th><th>Kva ordet beskriv</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td>Det var ein <strong>fin</strong> dag.</td><td>substantivet <em class="nn">dag</em></td><td>adjektiv</td></tr>
            <tr><td>Ho song <strong>fint</strong>.</td><td>verbet <em class="nn">song</em> (korleis song ho?)</td><td>adverb</td></tr>
            <tr><td>Ein <strong>rask</strong> bil.</td><td>substantivet <em class="nn">bil</em></td><td>adjektiv</td></tr>
            <tr><td>Han sprang <strong>raskt</strong>.</td><td>verbet <em class="nn">sprang</em></td><td>adverb</td></tr>
          </tbody>
        </table>
        <p><strong>Testen:</strong> Beskriv ordet eit substantiv (kva slags dag? kva slags bil?), er
        det eit <strong>adjektiv</strong>. Fortel det <em>korleis</em> noko skjer, er det
        <strong>adverb</strong>. Legg merke til at adverbet ofte har same form som adjektivet
        i inkjekjønn (<em class="nn">fint, raskt</em>).</p>

      `,
    },
    {
      id: "okl6",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: adjektiv eller adverb",
      question: "I setninga <em class=\"nn\">Ho song fint</em>, kva ordklasse er <em class=\"nn\">fint</em>?",
      options: [
        "Adverb, for det fortel korleis ho song",
        "Adjektiv, for det endar på <em class=\"nn\">-t</em>",
        "Substantiv",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">fint</em> seier noko om verbet <em class=\"nn\">song</em>, ikkje om eit substantiv. Då er det adverb. I <em class=\"nn\">eit fint hus</em> er same ordet adjektiv.",
    },
    {
      id: "okl7",
      type: "lesson",
      title: "Forveksling 2: preposisjon eller subjunksjon?",
      content: `        <h3>2. Preposisjon eller subjunksjon?</h3>
        <table>
          <thead><tr><th>Setning</th><th>Kva kjem etter ordet?</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td>Vi gjekk ut <strong>etter</strong> middagen.</td><td>eit substantiv: <em class="nn">middagen</em></td><td>preposisjon</td></tr>
            <tr><td>Vi gjekk ut <strong>etter at</strong> vi hadde ete.</td><td>ei heil setning: <em class="nn">vi hadde ete</em></td><td>subjunksjon</td></tr>
            <tr><td>Ho kom <strong>før</strong> deg.</td><td>eit pronomen: <em class="nn">deg</em></td><td>preposisjon</td></tr>
            <tr><td>Ho kom <strong>før</strong> du vakna.</td><td>ei heil setning: <em class="nn">du vakna</em></td><td>subjunksjon</td></tr>
          </tbody>
        </table>
        <p><strong>Testen:</strong> Sjå på det som kjem <em>etter</em> ordet. Eit substantiv eller
        pronomen → <strong>preposisjon</strong>. Ei setning med subjekt og verbal →
        <strong>subjunksjon</strong>. Ord som <em class="nn">etter, før, sidan</em> og
        <em class="nn">til</em> kan vere begge delar.</p>

      `,
    },
    {
      id: "okl8",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: preposisjon eller subjunksjon",
      question: "I <em class=\"nn\">før vi åt</em>, kva ordklasse er <em class=\"nn\">før</em>?",
      options: [
        "Subjunksjon, for det kjem ei heil setning etter",
        "Preposisjon, for det kjem eit substantiv etter",
        "Adverb",
      ],
      correct: 0,
      explanation: "Etter <em class=\"nn\">før</em> står her setninga <em class=\"nn\">vi åt</em>, med både subjekt og verbal. Då er <em class=\"nn\">før</em> subjunksjon. I <em class=\"nn\">før middagen</em> er det preposisjon.",
    },
    {
      id: "okl9",
      type: "lesson",
      title: "Forveksling 3: determinativ eller pronomen?",
      content: `        <h3>3. Determinativ eller pronomen?</h3>
        <table>
          <thead><tr><th>Setning</th><th>Forklaring</th><th>Ordklasse</th></tr></thead>
          <tbody>
            <tr><td><strong>Min</strong> bil er raud.</td><td><em class="nn">min</em> står til substantivet <em class="nn">bil</em></td><td>determinativ</td></tr>
            <tr><td>Bilen er <strong>min</strong>.</td><td>substantivet er underforstått: <em class="nn">min</em> (bil)</td><td>determinativ</td></tr>
            <tr><td><strong>Dei</strong> bøkene er gamle.</td><td><em class="nn">dei</em> står til substantivet <em class="nn">bøkene</em></td><td>determinativ</td></tr>
            <tr><td>Eg las <strong>dei</strong> i går.</td><td><em class="nn">dei</em> står i staden for <em class="nn">bøkene</em></td><td>pronomen</td></tr>
            <tr><td><strong>Det</strong> huset er stort.</td><td><em class="nn">det</em> peikar ut eit bestemt hus</td><td>determinativ</td></tr>
            <tr><td><strong>Det</strong> regnar.</td><td><em class="nn">det</em> står ikkje til noko substantiv</td><td>pronomen</td></tr>
          </tbody>
        </table>
        <p><strong>Testen:</strong> Eit <strong>determinativ</strong> høyrer saman med eit substantiv,
        anten det står der (<em class="nn">min bil</em>) eller er underforstått
        (<em class="nn">bilen er min</em>). Eit <strong>pronomen</strong> står <em>i staden for</em>
        heile substantivfrasen. Ord som <em class="nn">den, det, dei, denne</em> kan vere begge
        delar, medan <em class="nn">eg, du, han, ho, vi, seg</em> alltid er pronomen.</p>

        <div class="callout warn">
          <strong>Vanleg feil:</strong> å tru at eit ord «er» ein ordklasse, uansett samanheng.
          <em class="nn">Fint</em> er adjektiv i <em class="nn">eit fint hus</em>, men adverb i
          <em class="nn">ho song fint</em>. <em class="nn">Før</em> er preposisjon i
          <em class="nn">før middagen</em>, subjunksjon i <em class="nn">før vi åt</em>, og adverb i
          <em class="nn">eg har sett det før</em>. Spør alltid: kva gjer ordet <em>her</em>?
        </div>
      `,
    },
    {
      id: "okl10",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: determinativ eller pronomen",
      question: "I spørsmålet <em class=\"nn\">Har du lese dei?</em>, kva er <em class=\"nn\">dei</em>?",
      options: [
        "Pronomen, for det står i staden for substantivet",
        "Determinativ, for det peikar ut noko",
        "Subjunksjon",
      ],
      correct: 0,
      explanation: "Her erstattar <em class=\"nn\">dei</em> heile substantivfrasen. I <em class=\"nn\">dei bøkene</em> står ordet saman med substantivet, og då er det determinativ.",
    },
    {
      id: "okl11",
      type: "exercise",
      exerciseType: "categorize",
      question: "Runde 1: Substantiv, verb eller adjektiv? Sorter orda.",
      categories: {
        "Substantiv": ["bok", "hus", "jente", "skule", "hund"],
        "Verb": ["kaste", "skrive", "lese", "springe", "sove"],
        "Adjektiv": ["fin", "stor", "raud", "gammal", "glad"],
      },
      explanation: "Substantiv kan ha ein/ei/eit framfor (ei bok, eit hus). Verb kan ha å framfor og bøyast i tid (å kaste – kasta). Adjektiv kan gradbøyast (fin – finare – finast).",
    },
    {
      id: "okl12",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva ordklasse er det utheva ordet? «Ho song <strong>fint</strong> på konserten.»",
      options: ["Adjektiv", "Adverb", "Verb", "Substantiv"],
      correct: 1,
      explanation: "<em class=\"nn\">fint</em> fortel <em>korleis</em> ho song, og det seier noko om verbet, ikkje om eit substantiv. Då er det brukt som adverb. I «ein <em class=\"nn\">fin</em> konsert» hadde det vore adjektiv.",
    },
    {
      id: "okl13",
      type: "exercise",
      exerciseType: "categorize",
      question: "Runde 2: No med fem ordklassar. Sorter orda.",
      categories: {
        "Substantiv": ["glede", "lærar", "Bergen"],
        "Verb": ["vere", "høyre", "gå"],
        "Adjektiv": ["ung", "blå", "trøytt"],
        "Adverb": ["ikkje", "ofte", "her", "no"],
        "Pronomen": ["eg", "ho", "dei", "seg"],
      },
      explanation: "Adverb som ikkje, ofte, her og no er ubøyelege og svarer på kvar/når/korleis. Pronomen står i staden for eit substantiv (ho = Kari). Glede er eit substantiv sjølv om det er ei kjensle: ei glede.",
    },
    {
      id: "okl14",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Skriv namnet på ordklassen. Sjå på det ordet som står i hermeteikn, slik det er brukt i setninga.",
      items: [
        { prompt: "«på» i «Boka ligg på bordet» er ein ___", accept: ["preposisjon"] },
        { prompt: "«men» i «Eg kom, men ho gjekk» er ein ___", accept: ["konjunksjon"] },
        { prompt: "«fordi» i «Eg kom fordi du bad meg» er ein ___", accept: ["subjunksjon"] },
        { prompt: "«au» i «Au, det gjorde vondt!» er ein ___", accept: ["interjeksjon"] },
        { prompt: "«denne» i «Denne boka er god» er eit ___", accept: ["determinativ"] },
        { prompt: "«ho» i «Ho les mykje» er eit ___", accept: ["pronomen"] },
        { prompt: "«raskt» i «Han sprang raskt» er eit ___", accept: ["adverb"] },
        { prompt: "«rask» i «Ein rask bil» er eit ___", accept: ["adjektiv"] },
      ],
      explanation: "Preposisjonen har eit substantiv etter seg (på bordet), konjunksjonen bind saman to heilsetningar, subjunksjonen innleier ei leddsetning (fordi du bad meg). Denne står til boka (determinativ), ho står i staden for eit namn (pronomen).",
    },
    {
      id: "okl15",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva ordklasse er det utheva uttrykket? «<strong>Etter at</strong> vi hadde ete, gjekk vi ut.»",
      options: ["Preposisjon", "Subjunksjon", "Konjunksjon", "Adverb"],
      correct: 1,
      explanation: "Etter <em class=\"nn\">etter at</em> kjem ei heil setning med subjekt og verbal (<em class=\"nn\">vi hadde ete</em>). Då er det ein subjunksjon. I «<em class=\"nn\">etter</em> middagen» er <em class=\"nn\">etter</em> preposisjon, fordi det berre kjem eit substantiv etter.",
    },
    {
      id: "okl16",
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman ordklassen med kjenneteiknet:",
      pairs: [
        ["Substantiv", "kan ha ein/ei/eit framfor"],
        ["Verb", "kan bøyast i tid"],
        ["Adjektiv", "kan gradbøyast og rettar seg etter substantivet"],
        ["Adverb", "fortel korleis, kvar eller når, utan å beskrive eit substantiv"],
        ["Pronomen", "står i staden for eit substantiv: eg, ho, dei"],
        ["Determinativ", "bestemmer eit substantiv: min, denne, alle, tre"],
        ["Preposisjon", "står framfor eit substantiv: på, i, til"],
        ["Konjunksjon", "bind saman like ledd: og, men, eller"],
        ["Subjunksjon", "innleier ei leddsetning: at, fordi, dersom"],
        ["Interjeksjon", "utrop og svarord: au, ja, nei"],
      ],
      explanation: "Kvar ordklasse har sin test. Dei fem første er bøyelege, dei fem siste er (stort sett) ubøyelege.",
    },
    {
      id: "okl17",
      type: "exercise",
      exerciseType: "categorize",
      question: "Runde 3: Dei vanskelege småorda. Sorter orda.",
      categories: {
        "Determinativ": ["min", "denne", "alle", "tre"],
        "Pronomen": ["han", "seg", "kven", "vi"],
        "Preposisjon": ["under", "frå", "med", "på"],
        "Konjunksjon": ["og", "men", "eller"],
        "Subjunksjon": ["at", "fordi", "dersom", "sjølv om"],
      },
      explanation: "Determinativ står til eit substantiv (min bil, tre hus). Pronomen står åleine i staden for eit substantiv (han, seg, kven). Preposisjonar har eit substantiv etter seg, konjunksjonar bind saman like ledd, og subjunksjonar innleier leddsetningar.",
    },
    {
      id: "okl18",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva ordklasse er det utheva ordet? «Har du lese <strong>dei</strong> bøkene?»",
      options: ["Pronomen", "Determinativ", "Adjektiv", "Konjunksjon"],
      correct: 1,
      explanation: "<em class=\"nn\">dei</em> står saman med substantivet <em class=\"nn\">bøkene</em> og peikar ut kva for nokre bøker, og då er det determinativ. I «Har du lese <em class=\"nn\">dei</em>?» står <em class=\"nn\">dei</em> i staden for bøkene, og då er det pronomen.",
    },
  ],
});

Modules.register({
  id: "omgrep-boying",
  part: 2,
  group: "omgrep",
  title: "Bøyingsomgrep: substantiv og verb",
  summary: "Kjønn, tal og bestemtheit, tempus, partisipp, imperativ og verbklassane. Kva omgrepa tyder, ikkje berre tabellane.",
  estimatedMinutes: 30,
  sections: [
    {
      id: "boy1",
      type: "lesson",
      title: "Kjønn, tal og bestemtheit",
      content: `
        <p>Når du slår opp eit substantiv i ordboka, står det gjerne noko slikt:
        <em class="nn">bok f. -a, bøker, bøkene</em>. For å lese det må du kunne tre omgrep:
        <strong>kjønn</strong>, <strong>tal</strong> og <strong>bestemtheit</strong>.</p>

        <h3>Kjønn (genus)</h3>
        <p>Kvart substantiv har eit fast <strong>kjønn</strong>. Det har ingenting med
        biologi å gjere, og <em class="nn">ei bok</em> er ikkje meir «kvinneleg» enn
        <em class="nn">ein stol</em>. Kjønnet fortel kva artikkel og kva endingar ordet får.
        Nynorsk har tre kjønn, og du <em>må</em> bruke alle tre:</p>
        <ul>
          <li><strong>Hankjønn:</strong> <em class="nn">ein gut, ein bil, ein stol</em></li>
          <li><strong>Hokjønn:</strong> <em class="nn">ei jente, ei bok, ei sol</em></li>
          <li><strong>Inkjekjønn:</strong> <em class="nn">eit hus, eit eple, eit barn</em></li>
        </ul>

        <h3>Tal (numerus)</h3>
        <p><strong>Tal</strong> fortel om det er éin eller fleire: <strong>eintal</strong>
        (<em class="nn">ein gut</em>) eller <strong>fleirtal</strong> (<em class="nn">gutar</em>).</p>

        <h3>Bestemtheit</h3>
        <p><strong>Ubestemt form</strong> brukar du om noko som er nytt eller tilfeldig:
        <em class="nn">ein gut</em> (ein eller annan gut). <strong>Bestemt form</strong> brukar
        du om noko kjent og bestemt: <em class="nn">guten</em> (den guten vi snakkar om).
        På norsk ligg bestemtheita i <em>endinga</em>: <em class="nn">-en, -a, -et</em> i eintal,
        <em class="nn">-ane, -ene, -a</em> i fleirtal.</p>

      `,
    },
    {
      id: "boy2",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: kjønn",
      question: "Kva kjønn har ordet <em class=\"nn\">bok</em>?",
      options: [
        "Hokjønn",
        "Hankjønn",
        "Inkjekjønn",
      ],
      correct: 0,
      explanation: "Det heiter <em class=\"nn\">ei bok</em>. Hokjønnsord får <em class=\"nn\">-a</em> i bestemt eintal: <em class=\"nn\">boka</em>.",
    },
    {
      id: "boy3",
      type: "lesson",
      title: "Dei fire formene",
      content: `        <h3>Dei fire formene</h3>
        <p>Set du saman tal og bestemtheit, får kvart substantiv fire former. Kjønnet avgjer
        kva endingar som blir brukte:</p>
        <table>
          <thead><tr><th>Kjønn</th><th>Ubestemt eintal</th><th>Bestemt eintal</th><th>Ubestemt fleirtal</th><th>Bestemt fleirtal</th></tr></thead>
          <tbody>
            <tr><td>Hankjønn</td><td><em class="nn">ein gut</em></td><td><em class="nn">guten</em></td><td><em class="nn">gutar</em></td><td><em class="nn">gutane</em></td></tr>
            <tr><td>Hokjønn</td><td><em class="nn">ei jente</em></td><td><em class="nn">jenta</em></td><td><em class="nn">jenter</em></td><td><em class="nn">jentene</em></td></tr>
            <tr><td>Inkjekjønn</td><td><em class="nn">eit hus</em></td><td><em class="nn">huset</em></td><td><em class="nn">hus</em></td><td><em class="nn">husa</em></td></tr>
          </tbody>
        </table>
        <div class="callout warn">
          <strong>Dei to endingane bokmålselevar oftast bommar på:</strong> hokjønn bestemt eintal
          skal ha <em class="nn">-a</em> (<em class="nn">boka, jenta, sola</em>, ikkje
          <em class="bm">boken</em>), og inkjekjønn bestemt fleirtal skal ha <em class="nn">-a</em>
          (<em class="nn">husa, epla, barna</em>, ikkje <em class="bm">husene</em>).
        </div>

        <h3>Same ordet, fire former</h3>
        <div class="former" data-spel>
          <div class="form"><span class="etikett">ubestemt eintal</span><span class="ordform">ein <b>gut</b></span></div>
          <div class="form"><span class="etikett">bestemt eintal</span><span class="ordform">gut<b>en</b></span></div>
          <div class="form"><span class="etikett">ubestemt fleirtal</span><span class="ordform">gut<b>ar</b></span></div>
          <div class="form"><span class="etikett">bestemt fleirtal</span><span class="ordform">gut<b>ane</b></span></div>
        </div>
        <p class="muted-note">Stamma <em class="nn">gut-</em> står i ro. Det er berre endinga som skifter.</p>
      `,
    },
    {
      id: "boy4",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: bestemt form eintal",
      question: "Kva er rett bestemt form eintal av <em class=\"nn\">ei sol</em>?",
      options: [
        "sola",
        "solen",
        "solet",
      ],
      correct: 0,
      explanation: "Hokjønn bestemt eintal får <em class=\"nn\">-a</em> på nynorsk. <em class=\"bm\">solen</em> er bokmålsforma, og er ein av dei vanlegaste feila.",
    },
    {
      id: "boy5",
      type: "lesson",
      title: "Eigedom: ikkje s-genitiv",
      content: `        <h3>Eigedom: ikkje s-genitiv</h3>
        <p>På bokmål viser du ofte eigedom med <em class="bm">-s</em>: <em class="bm">Karis bok,
        guttens sykkel</em>. På nynorsk skal du vanlegvis <strong>ikkje</strong> bruke s-genitiv.
        Du har to gode alternativ:</p>
        <table>
          <thead><tr><th>Bokmål</th><th>Nynorsk med preposisjon</th><th>Nynorsk med sin/si/sitt/sine</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Karis bok</em></td><td><em class="nn">boka til Kari</em></td><td><em class="nn">Kari si bok</em></td></tr>
            <tr><td><em class="bm">guttens sykkel</em></td><td><em class="nn">sykkelen til guten</em></td><td><em class="nn">guten sin sykkel</em></td></tr>
            <tr><td><em class="bm">barnas rom</em></td><td><em class="nn">rommet til barna</em></td><td><em class="nn">barna sitt rom</em></td></tr>
            <tr><td><em class="bm">bilens dør</em></td><td><em class="nn">døra på bilen</em> / <em class="nn">bildøra</em></td><td>(ikkje brukt)</td></tr>
          </tbody>
        </table>
        <p>Legg merke til at <em class="nn">sin/si/sitt/sine</em> rettar seg etter <em>det som
        blir eigd</em>: <em class="nn">Kari <strong>si</strong> bok</em> (bok er hokjønn),
        <em class="nn">Kari <strong>sin</strong> bil</em> (hankjønn), <em class="nn">Kari
        <strong>sitt</strong> hus</em> (inkjekjønn), <em class="nn">Kari <strong>sine</strong>
        bøker</em> (fleirtal).</p>
      `,
    },
    {
      id: "boy6",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: sin, si, sitt, sine",
      question: "Kva er rett på nynorsk?",
      options: [
        "Kari si bok",
        "Kari sin bok",
        "Karis bok",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">sin/si/sitt/sine</em> rettar seg etter det som blir eigd. <em class=\"nn\">bok</em> er hokjønn, difor <em class=\"nn\">si</em>. S-genitiv unngår vi på nynorsk.",
    },
    {
      id: "boy7",
      type: "lesson",
      title: "Infinitiv, finitt og infinitt",
      content: `        <h3>Infinitiv: grunnforma</h3>
        <p><strong>Infinitiv</strong> er den forma du finn i ordboka, og den som kan ha
        <em class="nn">å</em> framfor seg: <em class="nn">å kaste, å skrive, å bu</em>. Infinitiven
        fortel ikkje noko om <em>når</em> noko skjer.</p>

        <h3>Finitte og infinitte former</h3>
        <p>Ei verbform er <strong>finitt</strong> når ho er bøygd i tid (eller er imperativ). Ei
        setning må ha eit finitt verb for å vere ei setning. Dei <strong>infinitte</strong> formene
        (infinitiv og partisipp) fortel ikkje tid åleine, for dei treng eit hjelpeverb.</p>
        <table>
          <thead><tr><th>Finitte former</th><th>Infinitte former</th></tr></thead>
          <tbody>
            <tr>
              <td>presens: <em class="nn">kastar</em><br>preteritum: <em class="nn">kasta</em><br>imperativ: <em class="nn">kast!</em></td>
              <td>infinitiv: <em class="nn">(å) kaste</em><br>perfektum partisipp: <em class="nn">(har) kasta</em><br>presens partisipp: <em class="nn">kastande</em></td>
            </tr>
          </tbody>
        </table>

      `,
    },
    {
      id: "boy8",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: finitt eller infinitt",
      question: "Er <em class=\"nn\">kastar</em> ei finitt eller ei infinitt verbform?",
      options: [
        "Finitt, for ho er bøygd i tid",
        "Infinitt, for ho kan stå etter <em class=\"nn\">har</em>",
        "Infinitt, for ho er grunnforma",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">kastar</em> står i presens og er difor finitt. Ei setning må ha eit finitt verb. <em class=\"nn\">(å) kaste</em> og <em class=\"nn\">(har) kasta</em> er infinitte.",
    },
    {
      id: "boy9",
      type: "lesson",
      title: "Tempus: tidene",
      content: `
        <div class="tempuslinje">
          <div class="tl-akse"><span class="tl-fortid">fortid</span><span class="tl-no">no</span><span class="tl-framtid">framtid</span></div>
          <div class="tl-punkt" style="--x: 8%"><b>hadde kasta</b><small>preteritum perfektum: ferdig før noko anna i fortida</small></div>
          <div class="tl-punkt" style="--x: 30%"><b>kasta</b><small>preteritum: i går</small></div>
          <div class="tl-punkt tl-bru" style="--x: 50%"><b>har kasta</b><small>presens perfektum: har skjedd, og gjeld framleis no</small></div>
          <div class="tl-punkt tl-naa" style="--x: 64%"><b>kastar</b><small>presens: no, vanlegvis</small></div>
          <div class="tl-punkt" style="--x: 88%"><b>skal kaste</b><small>framtid: med hjelpeverb</small></div>
        </div>        <h3>Tempus: tidene</h3>
        <p><strong>Tempus</strong> tyder «tid». Dei to enkle tidene lagar du med ending eller
        vokalskifte; dei to samansette lagar du med hjelpeverbet <em class="nn">ha</em> pluss
        perfektum partisipp.</p>
        <table>
          <thead><tr><th>Tempus</th><th>Kva det fortel</th><th>Døme</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Preteritum perfektum</strong></td>
              <td>noko som var ferdig <em>før</em> noko anna i fortida</td>
              <td><em class="nn">Eg <strong>hadde kasta</strong> ballen då du kom.</em></td>
            </tr>
            <tr>
              <td><strong>Preteritum</strong></td>
              <td>noko som skjedde på eit bestemt tidspunkt i fortida</td>
              <td><em class="nn">Eg <strong>kasta</strong> ballen i går.</em></td>
            </tr>
            <tr>
              <td><strong>Presens perfektum</strong></td>
              <td>noko som har skjedd, og som framleis har noko å seie no</td>
              <td><em class="nn">Eg <strong>har kasta</strong> ballen, så no er han borte.</em></td>
            </tr>
            <tr>
              <td><strong>Presens</strong></td>
              <td>no, vanlegvis, eller i framtida</td>
              <td><em class="nn">Eg <strong>kastar</strong> ballen.</em></td>
            </tr>
          </tbody>
        </table>
        <p>Tenk deg ei tidslinje frå venstre til høgre: <em>hadde kasta → kasta → har kasta →
        kastar</em>. Preteritum perfektum ligg lengst bak, presens ligg her og no.
        Framtid uttrykkjer vi med <em class="nn">skal</em> eller <em class="nn">vil</em> pluss
        infinitiv: <em class="nn">Eg skal kaste ballen.</em></p>

      `,
    },
    {
      id: "boy10",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: tempus",
      question: "Kva tempus står verbet i i setninga <em class=\"nn\">Eg hadde kasta ballen då du kom</em>?",
      options: [
        "Preteritum perfektum",
        "Presens perfektum",
        "Preteritum",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">hadde</em> pluss perfektum partisipp gir preteritum perfektum, altså noko som var ferdig før noko anna i fortida. Med <em class=\"nn\">har</em> hadde det vore presens perfektum.",
    },
    {
      id: "boy11",
      type: "lesson",
      title: "Partisipp og imperativ",
      content: `        <h3>Dei to partisippa</h3>
        <ul>
          <li><strong>Perfektum partisipp</strong> er forma som står etter <em class="nn">har/hadde</em>
          (<em class="nn">har kasta, har høyrt, har skrive</em>). Ho kan òg brukast som adjektiv:
          <em class="nn">ein skriven tekst, eit skrive brev, skrivne tekstar</em>.</li>
          <li><strong>Presens partisipp</strong> endar på <em class="nn">-ande</em> og beskriv
          noko som held på: <em class="nn">ein syngjande fugl, eit sovande barn, ei gåande dame</em>.
          Bokmål har <em class="bm">-ende</em> (<em class="bm">syngende</em>); på nynorsk er det
          alltid <em class="nn">-ande</em>.</li>
        </ul>

        <h3>Imperativ: bydeforma</h3>
        <p><strong>Imperativ</strong> brukar du når du ber eller kommanderer. Forma er lik
        <strong>stamma</strong>, altså infinitiv utan <em class="nn">-e</em>:
        <em class="nn">kom! skriv! kast! høyr! et!</em> Kortverb er like i infinitiv og imperativ:
        <em class="nn">bu her! nå bussen!</em></p>

      `,
    },
    {
      id: "boy12",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: presens partisipp",
      question: "Kva er rett presens partisipp på nynorsk?",
      options: [
        "ein syngjande fugl",
        "ein syngende fugl",
        "ein syngen fugl",
      ],
      correct: 0,
      explanation: "Presens partisipp endar alltid på <em class=\"nn\">-ande</em> på nynorsk. <em class=\"bm\">-ende</em> er bokmålsforma.",
    },
    {
      id: "boy13",
      type: "lesson",
      title: "Sterke og svake verb",
      content: `        <h3>Sterke og svake verb</h3>
        <p>Dette er dei to hovudgruppene av verb, og skilnaden ligg i korleis dei lagar
        <strong>preteritum</strong>:</p>
        <ul>
          <li><strong>Svake verb</strong> får ei <strong>ending</strong> i preteritum:
          <em class="nn">kast<strong>a</strong>, høyr<strong>de</strong>, kjøp<strong>te</strong>,
          bu<strong>dde</strong></em>.</li>
          <li><strong>Sterke verb</strong> får <strong>inga ending</strong> i preteritum, men skiftar
          som regel <strong>vokal</strong>: <em class="nn">skrive – skreiv, finne – fann, ete – åt,
          sjå – såg</em>. I presens har dei heller ikkje <em class="nn">-ar/-er</em>:
          <em class="nn">skriv, finn, et, ser</em>.</li>
        </ul>

        <div class="callout">
          <strong>Tommelfingerregel for a-verb og e-verb:</strong> Bruk bokmålsforma i preteritum
          som nøkkel.
          <ul>
            <li>Bokmål <em class="bm">-et</em> eller <em class="bm">-a</em> → <strong>a-verb</strong> på nynorsk:
            <em class="bm">kastet</em> → <em class="nn">kasta</em>, <em class="bm">hoppet</em> → <em class="nn">hoppa</em>,
            <em class="bm">vasket</em> → <em class="nn">vaska</em>. Presens får <em class="nn">-ar</em>: <em class="nn">kastar</em>.</li>
            <li>Bokmål <em class="bm">-te</em> eller <em class="bm">-de</em> → <strong>e-verb</strong> på nynorsk:
            <em class="bm">kjøpte</em> → <em class="nn">kjøpte</em>, <em class="bm">hørte</em> → <em class="nn">høyrde</em>,
            <em class="bm">levde</em> → <em class="nn">levde</em>. Presens får <em class="nn">-er</em>: <em class="nn">kjøper</em>.</li>
            <li>Bokmål <em class="bm">-dde</em> → <strong>kortverb</strong>: <em class="bm">bodde</em> → <em class="nn">budde</em>,
            <em class="bm">trodde</em> → <em class="nn">trudde</em>.</li>
          </ul>
          Regelen dekkjer dei aller fleste verba. Nokre få verb har begge former på bokmål
          (<em class="bm">bygde/bygget</em>); då må du slå opp.
        </div>

        <h3>Vegvisar: kva verbklasse er det?</h3>
        <div class="vegvisar">
          <div class="vv-start">Kva endar verbet på i preteritum på bokmål?</div>
          <div class="vv-greiner">
            <div class="vv-grein"><span class="vv-val"><em class="bm">-et</em> / <em class="bm">-a</em></span><span class="vv-pil">↓</span><span class="vv-svar a">a-verb<small>kasta · kastar</small></span></div>
            <div class="vv-grein"><span class="vv-val"><em class="bm">-te</em> / <em class="bm">-de</em></span><span class="vv-pil">↓</span><span class="vv-svar e">e-verb<small>kjøpte · kjøper</small></span></div>
            <div class="vv-grein"><span class="vv-val"><em class="bm">-dde</em></span><span class="vv-pil">↓</span><span class="vv-svar kort">kortverb<small>budde · bur</small></span></div>
            <div class="vv-grein"><span class="vv-val">ny vokal, inga ending</span><span class="vv-pil">↓</span><span class="vv-svar sterk">sterkt verb<small>skreiv · skriv</small></span></div>
          </div>
        </div>
      `,
    },
    {
      id: "boy14",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: a-verb eller e-verb",
      question: "Bokmål har <em class=\"bm\">hoppet</em> i preteritum. Kva verbklasse blir dette på nynorsk?",
      options: [
        "A-verb, så det heiter <em class=\"nn\">hoppa</em>",
        "E-verb, så det heiter <em class=\"nn\">hoppte</em>",
        "Sterkt verb",
      ],
      correct: 0,
      explanation: "Bokmål <em class=\"bm\">-et</em> eller <em class=\"bm\">-a</em> i preteritum tyder a-verb på nynorsk. Presens får <em class=\"nn\">-ar</em>: <em class=\"nn\">hoppar</em>.",
    },
    {
      id: "boy15",
      type: "lesson",
      title: "J-verb og kortverb",
      content: `        <h3>To små grupper: j-verb og kortverb</h3>
        <p><strong>J-verb</strong> har <em class="nn">-je</em> eller <em class="nn">-ja</em> i infinitiv. Dei mistar
        <em class="nn">j</em>-en i dei andre formene, får <strong>inga ending i presens</strong> og
        skiftar ofte vokal i preteritum, men dei er likevel svake, fordi dei har ending
        (<em class="nn">-de</em>) i preteritum.</p>
        <table>
          <thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perf. partisipp</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">å spørje</em></td><td><em class="nn">spør</em></td><td><em class="nn">spurde</em></td><td><em class="nn">har spurt</em></td></tr>
            <tr><td><em class="nn">å velje</em></td><td><em class="nn">vel</em></td><td><em class="nn">valde</em></td><td><em class="nn">har valt</em></td></tr>
            <tr><td><em class="nn">å telje</em></td><td><em class="nn">tel</em></td><td><em class="nn">talde</em></td><td><em class="nn">har talt</em></td></tr>
            <tr><td><em class="nn">å selje</em></td><td><em class="nn">sel</em></td><td><em class="nn">selde</em></td><td><em class="nn">har selt</em></td></tr>
            <tr><td><em class="nn">å setje</em></td><td><em class="nn">set</em></td><td><em class="nn">sette</em></td><td><em class="nn">har sett</em></td></tr>
            <tr><td><em class="nn">å krevje</em></td><td><em class="nn">krev</em></td><td><em class="nn">kravde</em></td><td><em class="nn">har kravt</em></td></tr>
          </tbody>
        </table>
        <p><strong>Kortverb</strong> har berre éi staving og ingen <em class="nn">-e</em> i infinitiv.
        Dei får <em class="nn">-r</em> i presens, <em class="nn">-dde</em> i preteritum og
        <em class="nn">-dd</em> i perfektum partisipp.</p>
        <table>
          <thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perf. partisipp</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">å bu</em></td><td><em class="nn">bur</em></td><td><em class="nn">budde</em></td><td><em class="nn">har budd</em></td></tr>
            <tr><td><em class="nn">å nå</em></td><td><em class="nn">når</em></td><td><em class="nn">nådde</em></td><td><em class="nn">har nådd</em></td></tr>
            <tr><td><em class="nn">å tru</em></td><td><em class="nn">trur</em></td><td><em class="nn">trudde</em></td><td><em class="nn">har trudd</em></td></tr>
            <tr><td><em class="nn">å sy</em></td><td><em class="nn">syr</em></td><td><em class="nn">sydde</em></td><td><em class="nn">har sydd</em></td></tr>
            <tr><td><em class="nn">å skje</em></td><td><em class="nn">skjer</em></td><td><em class="nn">skjedde</em></td><td><em class="nn">har skjedd</em></td></tr>
          </tbody>
        </table>
        <div class="callout warn">
          <strong>Pass på:</strong> Ikkje alle korte verb er kortverb! <em class="nn">gå, få, stå, sjå</em>
          og <em class="nn">ha</em> er korte, men bøyer seg annleis: <em class="nn">gå – går – gjekk – har gått</em>,
          <em class="nn">sjå – ser – såg – har sett</em>, <em class="nn">ha – har – hadde – har hatt</em>.
        </div>
      `,
    },
    {
      id: "boy16",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: kvifor j-verb er svake",
      question: "Kvifor er <em class=\"nn\">å spørje</em> rekna som eit svakt verb?",
      options: [
        "Fordi det har ending i preteritum: <em class=\"nn\">spurde</em>",
        "Fordi det skiftar vokal",
        "Fordi det mistar <em class=\"nn\">j</em>-en",
      ],
      correct: 0,
      explanation: "Skiljet mellom sterkt og svakt går på om preteritum har ending. J-verb skiftar ofte vokal, men dei har <em class=\"nn\">-de</em> i preteritum, og då er dei svake.",
    },
    {
      id: "boy17",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Bøy heile rekkja. Fyll inn forma som manglar.",
      items: [
        { prompt: "ei jente – ___ – jenter – jentene", accept: ["jenta"] },
        { prompt: "eit hus – huset – ___ – husa", accept: ["hus"] },
        { prompt: "ein gut – guten – gutar – ___", accept: ["gutane"] },
        { prompt: "ei bok – boka – ___ – bøkene", accept: ["bøker"] },
        { prompt: "eit eple – eplet – eple – ___", accept: ["epla"] },
        { prompt: "å kaste – kastar – ___ – har kasta", accept: ["kasta"] },
        { prompt: "å høyre – ___ – høyrde – har høyrt", accept: ["høyrer"] },
        { prompt: "å skrive – skriv – ___ – har skrive", accept: ["skreiv"] },
      ],
      explanation: "Substantiv: ubestemt eintal – bestemt eintal – ubestemt fleirtal – bestemt fleirtal. Verb: infinitiv – presens – preteritum – presens perfektum. Hugs -a i jenta og epla, og at sterke verb som skrive skiftar vokal i preteritum (skreiv).",
    },
    {
      id: "boy18",
      type: "exercise",
      exerciseType: "categorize",
      question: "Kva tempus står verbet i? Sorter setningane.",
      categories: {
        "Presens": ["eg kastar", "ho skriv", "dei bur her"],
        "Preteritum": ["eg kasta", "ho skreiv", "dei budde her"],
        "Presens perfektum": ["eg har kasta", "ho har skrive", "dei har budd her"],
        "Preteritum perfektum": ["eg hadde kasta", "ho hadde skrive", "dei hadde budd her"],
      },
      explanation: "Presens og preteritum er enkle tider (éi verbform). Presens perfektum har hjelpeverbet har, preteritum perfektum har hadde, og begge har perfektum partisipp etter.",
    },
    {
      id: "boy19",
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman omgrepet med dømet:",
      pairs: [
        ["Infinitiv", "å skrive"],
        ["Presens", "ho skriv no"],
        ["Preteritum", "ho skreiv i går"],
        ["Presens perfektum", "ho har skrive"],
        ["Preteritum perfektum", "ho hadde skrive"],
        ["Perfektum partisipp", "brevet er skrive"],
        ["Presens partisipp", "ein skrivande elev"],
        ["Imperativ", "skriv namnet ditt!"],
      ],
      explanation: "Legg merke til at same form kan ha ulike namn etter kva ho gjer: skriv er presens i «ho skriv», men imperativ i «skriv!». Skrive er infinitiv med å, men perfektum partisipp etter har/er.",
    },
    {
      id: "boy20",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er god nynorsk for bokmål <em class=\"bm\">Karis bok</em>?",
      options: ["Karis bok", "boka til Kari", "Kari sin bok", "Karis boka"],
      correct: 1,
      explanation: "Nynorsk unngår s-genitiv. Skriv <em class=\"nn\">boka til Kari</em> eller <em class=\"nn\">Kari si bok</em>. <em class=\"nn\">Kari sin bok</em> er feil fordi <em class=\"nn\">bok</em> er hokjønn, og då må det vere <em class=\"nn\">si</em>.",
    },
    {
      id: "boy21",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Bokmål har <em class=\"bm\">hun hoppet</em>. Bruk tommelfingerregelen: kva verbklasse er <em class=\"nn\">hoppe</em> på nynorsk, og kva blir preteritum?",
      options: ["a-verb: ho hoppa", "e-verb: ho hoppte", "e-verb: ho hoppde", "sterkt verb: ho hopp"],
      correct: 0,
      explanation: "Bokmål <em class=\"bm\">-et</em> i preteritum (<em class=\"bm\">hoppet</em>) tyder a-verb på nynorsk: <em class=\"nn\">hoppe – hoppar – hoppa – har hoppa</em>. Hadde bokmål hatt <em class=\"bm\">-te</em> (som i <em class=\"bm\">kjøpte</em>), hadde det vore e-verb.",
    },
    {
      id: "boy22",
      type: "exercise",
      exerciseType: "categorize",
      question: "Sterkt eller svakt verb? Sjå på preteritumsforma og sorter.",
      categories: {
        "Sterke verb (vokalskifte, inga ending)": ["skreiv", "fann", "gjekk", "såg", "åt"],
        "Svake verb (ending)": ["kasta", "høyrde", "budde", "spurde", "kjøpte"],
      },
      explanation: "Sterke verb har inga ending i preteritum, men skiftar vokal: skrive → skreiv, ete → åt. Svake verb får ei ending: -a (kasta), -de (høyrde, spurde), -te (kjøpte) eller -dde (budde).",
    },
    {
      id: "boy23",
      type: "exercise",
      exerciseType: "fillIn",
      question: "J-verb og kortverb. Fyll inn rett form av verbet i parentes.",
      items: [
        { prompt: "(spørje) Ho ___ læraren om hjelp i går.", accept: ["spurde"] },
        { prompt: "(velje) Vi har ___ eit nytt lag.", accept: ["valt"] },
        { prompt: "(setje) Han ___ seg alltid bakarst i klasserommet.", accept: ["set"] },
        { prompt: "(telje) Kan du ___ til hundre på nynorsk?", accept: ["telje"] },
        { prompt: "(bu) Dei ___ i Bergen no.", accept: ["bur"] },
        { prompt: "(nå) Eg ___ akkurat bussen i dag tidleg.", accept: ["nådde"] },
        { prompt: "(tru) Ho har ___ på det heile tida.", accept: ["trudd"] },
        { prompt: "(sy) Bestemor ___ ein kjole til meg i fjor.", accept: ["sydde"] },
      ],
      explanation: "J-verb mistar j-en og har inga ending i presens (set, spør), men får -de/-te i preteritum (spurde, sette) og -t i partisipp (valt). Kortverb får -r, -dde, -dd: bur, nådde, trudd, sydde.",
    },
    {
      id: "boy24",
      type: "exercise",
      exerciseType: "translate",
      question: "Omset setninga til nynorsk. Sjå på verba: eitt er a-verb og eitt er e-verb.",
      source: "Jeg kastet ballen før jeg hørte deg.",
      accept: [
        "Eg kasta ballen før eg høyrde deg",
      ],
      hint: "kastet → a-verb, hørte → e-verb med øy.",
      explanation: "<em class=\"bm\">kastet</em> har <em class=\"bm\">-et</em> → a-verb: <em class=\"nn\">kasta</em>. <em class=\"bm\">hørte</em> har <em class=\"bm\">-te</em> → e-verb: <em class=\"nn\">høyrde</em> (hugs diftongen <em class=\"nn\">øy</em>). <em class=\"nn\">Før</em> er her subjunksjon, fordi det kjem ei heil setning etter.",
    },
  ],
});

Modules.register({
  id: "omgrep-setning",
  part: 2,
  group: "omgrep",
  title: "Setningslære",
  summary: "Setningsledd, heilsetning og leddsetning, då/når, ordstilling og samsvar i predikativ.",
  estimatedMinutes: 30,
  sections: [
    {
      id: "set1",
      type: "lesson",
      title: "Setningsledda",
      content: `
        <div class="leddsetning">
          <span class="ledd subjekt">Kari<small>subjekt</small></span>
          <span class="ledd verbal">gav<small>verbal</small></span>
          <span class="ledd iobj">guten<small>indirekte objekt</small></span>
          <span class="ledd objekt">ei bok<small>objekt</small></span>
          <span class="ledd adverbial">i går<small>adverbial</small></span>
        </div>
        <p>Ei setning er bygd opp av <strong>setningsledd</strong>. Eit ledd kan vere eitt ord
        eller fleire ord som høyrer saman og gjer same jobb. Du finn ledda ved å
        <em>stille spørsmål</em> til setninga, alltid i same rekkjefølgje.</p>

        <table>
          <thead><tr><th>Ledd</th><th>Kva det gjer</th><th>Slik finn du det</th><th>Døme</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Verbal</strong></td>
              <td>Fortel kva som skjer. Er alltid eit verb i finitt form (pluss eventuelle infinitte former).</td>
              <td>Finn verbet først! Kva skjer?</td>
              <td>Kari <strong>les</strong> ei bok. · Kari <strong>har lese</strong> boka.</td>
            </tr>
            <tr>
              <td><strong>Subjekt</strong></td>
              <td>Den eller det som gjer handlinga.</td>
              <td><strong>Kven/kva</strong> + verbal? («Kven les?» → Kari)</td>
              <td><strong>Kari</strong> les ei bok.</td>
            </tr>
            <tr>
              <td><strong>Objekt</strong></td>
              <td>Den eller det handlinga går ut over.</td>
              <td><strong>Kven/kva</strong> + subjekt + verbal? («Kva les Kari?» → ei bok)</td>
              <td>Kari les <strong>ei bok</strong>.</td>
            </tr>
            <tr>
              <td><strong>Indirekte objekt</strong></td>
              <td>Den som får eller tek imot noko.</td>
              <td><strong>Til kven</strong>? («Til kven gav Kari ei bok?» → guten)</td>
              <td>Kari gav <strong>guten</strong> ei bok.</td>
            </tr>
            <tr>
              <td><strong>Predikativ</strong></td>
              <td>Seier kva eller korleis subjektet <em>er</em>. Står etter <em class="nn">vere, bli, verte, heite</em>.</td>
              <td>Kva/korleis <em>er</em> subjektet?</td>
              <td>Kari er <strong>glad</strong>. · Kari er <strong>lærar</strong>.</td>
            </tr>
            <tr>
              <td><strong>Adverbial</strong></td>
              <td>Fortel kvar, når, korleis eller kvifor noko skjer.</td>
              <td><strong>Kvar / når / korleis / kvifor</strong>?</td>
              <td>Kari les <strong>på rommet</strong> <strong>kvar kveld</strong>.</td>
            </tr>
          </tbody>
        </table>

      `,
    },
    {
      id: "set2",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: indirekte objekt",
      question: "I setninga <em class=\"nn\">Kari gav guten ei bok</em>, kva ledd er <em class=\"nn\">guten</em>?",
      options: [
        "Indirekte objekt",
        "Subjekt",
        "Objekt",
      ],
      correct: 0,
      explanation: "Spør «til kven?». Kari gav ei bok til guten, så <em class=\"nn\">guten</em> er indirekte objekt. <em class=\"nn\">ei bok</em> er objektet.",
    },
    {
      id: "set3",
      type: "lesson",
      title: "Framgangsmåten",
      content: `
        <div class="analyse" data-analyse>
          <p class="an-setning">
            <span class="an-ord" data-ledd="adverbial">I går</span>
            <span class="an-ord" data-ledd="verbal">kjøpte</span>
            <span class="an-ord" data-ledd="subjekt">guten</span>
            <span class="an-ord" data-ledd="objekt">nye sko</span>
            <span class="an-ord" data-ledd="adverbial">på senteret.</span>
          </p>
          <p class="an-spm">Trykk «Neste steg» og analyser setninga i rett rekkjefølgje.</p>
          <div class="btn-row"><button type="button" class="btn secondary small an-neste">Neste steg</button><button type="button" class="btn secondary small an-start" hidden>Start på nytt</button></div>
        </div>        <h3>Framgangsmåten</h3>
        <ol>
          <li>Finn <strong>verbalet</strong>. Det er nøkkelen til alt anna.</li>
          <li>Spør «kven/kva + verbal?» → <strong>subjektet</strong>.</li>
          <li>Spør «kven/kva + subjekt + verbal?» → <strong>objektet</strong>.</li>
          <li>Er verbalet <em class="nn">er/blir/heiter</em>? Då har du eit <strong>predikativ</strong> i staden for objekt.</li>
          <li>Resten som svarer på kvar/når/korleis/kvifor, er <strong>adverbial</strong>.</li>
        </ol>
        <p>Døme: <em class="nn">I går kjøpte guten nye sko på senteret.</em> Verbal:
        <em class="nn">kjøpte</em>. Kven kjøpte? <em class="nn">guten</em> (subjekt). Kva kjøpte
        guten? <em class="nn">nye sko</em> (objekt). Når og kvar? <em class="nn">i går</em>,
        <em class="nn">på senteret</em> (adverbial).</p>

        <div class="callout">
          <strong>Predikativet må samsvare.</strong> Når predikativet er eit adjektiv, rettar det seg
          etter subjektet i kjønn og tal, akkurat som eit adjektiv framfor substantivet:
          <ul>
            <li><em class="nn">Huset er <strong>stort</strong>.</em> (inkjekjønn eintal → -t)</li>
            <li><em class="nn">Bilen er <strong>stor</strong>.</em> (hankjønn eintal)</li>
            <li><em class="nn">Bøkene er <strong>gamle</strong>.</em> (fleirtal → -e)</li>
            <li><em class="nn">Jenta er <strong>glad</strong>.</em> · <em class="nn">Barna er <strong>glade</strong>.</em></li>
          </ul>
          Her gjer mange feil fordi adjektivet står langt frå substantivet. Finn subjektet, og
          bøy etter det.
        </div>
      `,
    },
    {
      id: "set4",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: kva du finn først",
      question: "Kva ledd bør du alltid finne først når du analyserer ei setning?",
      options: [
        "Verbalet",
        "Subjektet",
        "Adverbialet",
      ],
      correct: 0,
      explanation: "Verbalet er nøkkelen til alt anna. Når du har det, finn du subjektet ved å spørje «kven eller kva + verbal?».",
    },
    {
      id: "set5",
      type: "lesson",
      title: "Heilsetning og leddsetning",
      content: `        <h3>Heilsetning og leddsetning</h3>
        <p>Ei <strong>heilsetning</strong> kan stå åleine og gi meining: <em class="nn">Vi gjekk
        heim.</em> Ei <strong>leddsetning</strong> er ei setning inne i ei anna setning. Ho
        fungerer som eit <em>ledd</em> i heilsetninga og kan ikkje stå åleine:
        <em class="nn">Vi gjekk heim <strong>fordi det regna</strong>.</em> Leddsetninga
        <em class="nn">fordi det regna</em> er adverbial i heilsetninga (ho svarer på «kvifor?»).</p>
        <p>Leddsetningar blir som regel innleidde av ein <strong>subjunksjon</strong>. Her er
        skilnaden på konjunksjon og subjunksjon avgjerande:</p>
        <table>
          <thead><tr><th></th><th>Konjunksjon</th><th>Subjunksjon</th></tr></thead>
          <tbody>
            <tr><td>Orda</td><td><em class="nn">og, men, eller, for</em></td><td><em class="nn">at, fordi, dersom, viss, når, då, som, om, sjølv om, medan, før, etter at</em></td></tr>
            <tr><td>Kva dei gjer</td><td>bind saman to <em>heilsetningar</em> (eller to like ledd)</td><td>gjer setninga som kjem etter, til ei <em>leddsetning</em></td></tr>
            <tr><td>Døme</td><td><em class="nn">Eg kom, <strong>men</strong> ho gjekk.</em></td><td><em class="nn">Eg kom <strong>fordi</strong> ho gjekk.</em></td></tr>
          </tbody>
        </table>

        <h3>Relativsetningar med «som»</h3>
        <p>Ei <strong>relativsetning</strong> er ei leddsetning som beskriv eit ord i setninga
        framfor. Ho blir innleidd med subjunksjonen <em class="nn">som</em>:
        <em class="nn">Guten <strong>som bur her</strong>, er snill.</em> ·
        <em class="nn">Boka <strong>som eg las</strong>, var god.</em> Hugs komma
        etter ei innskoten leddsetning.</p>

        <h3>Setning i setning</h3>
        <div class="setningsboksar">
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Vi gjekk heim <span class="setningsboks ledd"><span class="sb-namn">leddsetning (adverbial)</span><b>fordi</b> det regna</span>.</div>
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Guten <span class="setningsboks ledd"><span class="sb-namn">relativsetning</span><b>som</b> bur her</span>, er snill.</div>
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Eg kom</div><span class="sb-bind"><b>men</b> (konjunksjon bind saman)</span><div class="setningsboks heil"><span class="sb-namn">heilsetning</span>ho gjekk.</div>
        </div>
      `,
    },
    {
      id: "set6",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: konjunksjon eller subjunksjon",
      question: "Kva skil ein subjunksjon frå ein konjunksjon?",
      options: [
        "Subjunksjonen gjer setninga som kjem etter, til ei leddsetning",
        "Subjunksjonen bind saman to heilsetningar",
        "Det er ingen skilnad",
      ],
      correct: 0,
      explanation: "<em class=\"nn\">Eg kom, men ho gjekk</em> har to heilsetningar bundne saman av konjunksjonen <em class=\"nn\">men</em>. <em class=\"nn\">Eg kom fordi ho gjekk</em> har ei leddsetning, innleidd av subjunksjonen <em class=\"nn\">fordi</em>.",
    },
    {
      id: "set7",
      type: "lesson",
      title: "Då eller når?",
      content: `
        <div class="daanaar">
          <div class="dn-rad"><span class="dn-ord">då</span><span class="dn-linje"><i class="dn-prikk"></i></span><span class="dn-tekst">éin bestemt gong i fortida: <em class="nn">Då eg var liten …</em></span></div>
          <div class="dn-rad"><span class="dn-ord">når</span><span class="dn-linje fleire"><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-prikk"></i><i class="dn-pil"></i></span><span class="dn-tekst">kvar gong, vanlegvis, eller i framtida: <em class="nn">Når eg kjem heim, …</em></span></div>
        </div>        <h3>Då eller når?</h3>
        <p>Begge er subjunksjonar som innleier tidssetningar, men dei tyder ikkje det same.
        Hugseregelen er: <strong>«Den gongen då, kvar gong når.»</strong></p>
        <table>
          <thead><tr><th></th><th>Bruk</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td><strong>då</strong></td><td>éin bestemt gong i fortida</td><td><em class="nn"><strong>Då</strong> eg var liten, budde vi i Bergen.</em> · <em class="nn">Ho lo <strong>då</strong> ho såg biletet.</em></td></tr>
            <tr><td><strong>når</strong></td><td>noko som skjer fleire gonger, vanlegvis, eller i framtida</td><td><em class="nn"><strong>Når</strong> det regnar, tek eg paraply.</em> · <em class="nn">Ring meg <strong>når</strong> du kjem heim.</em></td></tr>
          </tbody>
        </table>
        <div class="callout warn">
          <strong>Vanleg feil:</strong> bokmål <em class="bm">da</em> finst ikkje på nynorsk. Det heiter
          <em class="nn">då</em>, både som subjunksjon (<em class="nn">då eg kom</em>) og som adverb
          (<em class="nn">då gjekk vi</em>, <em class="nn">kom då!</em>).
        </div>

      `,
    },
    {
      id: "set8",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: då eller når",
      question: "Kva er rett: <em class=\"nn\">___ eg var liten, budde vi i Bergen</em>?",
      options: [
        "Då",
        "Når",
        "Da",
      ],
      correct: 0,
      explanation: "Det skjedde éin bestemt gong i fortida, så det heiter <em class=\"nn\">då</em>. Hugseregelen er «den gongen då, kvar gong når». Bokmål <em class=\"bm\">da</em> finst ikkje på nynorsk.",
    },
    {
      id: "set9",
      type: "lesson",
      title: "Ordstilling: V2-regelen",
      content: `
        <div class="v2demo" data-v2>
          <div class="v2rad">
            <span class="ledd subjekt" data-plass="1">Han</span>
            <span class="ledd verbal" data-plass="2">kom</span>
            <span class="ledd adverbial" data-plass="3">i går</span>
          </div>
          <button type="button" class="btn secondary small v2-btn">Flytt «i går» fremst</button>
          <p class="v2forklar">Verbalet <em class="nn">kom</em> står på andreplass same kva som står først.</p>
        </div>        <h3>Ordstilling: verbalet på andreplass</h3>
        <p>I ei forteljande heilsetning står det finitte verbalet <strong>alltid på andreplass</strong>
        (dette blir kalla <strong>V2</strong>). Første plass kan fyllast av subjektet, men òg av eit
        adverbial eller eit objekt. Flyttar du noko anna fram, må subjektet vike plass og stå
        <em>etter</em> verbalet:</p>
        <table>
          <thead><tr><th>Plass 1</th><th>Plass 2 (verbal)</th><th>Resten</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Han</em></td><td><em class="nn">kom</em></td><td><em class="nn">heim i går.</em></td></tr>
            <tr><td><em class="nn">I går</em></td><td><em class="nn">kom</em></td><td><em class="nn">han heim.</em></td></tr>
            <tr><td><em class="nn">Då han kom heim,</em></td><td><em class="nn">åt</em></td><td><em class="nn">han middag.</em></td></tr>
          </tbody>
        </table>
        <p>Legg merke til den siste: ei leddsetning som står først, tel som <em>éitt ledd</em> på
        plass 1. Difor kjem verbalet rett etter kommaet, og subjektet etterpå:
        <em class="nn">Då han kom heim, <strong>åt han</strong></em>, ikkje
        <em class="bm">Då han kom heim, han åt</em>.</p>

        <h3>Leddsetningar har ikkje V2</h3>
        <p>Inne i ei leddsetning gjeld ein annan regel: subjektet kjem rett etter subjunksjonen,
        og setningsadverbial som <em class="nn">ikkje, alltid, aldri, ofte</em> står
        <strong>framfor</strong> verbalet:</p>
        <table>
          <thead><tr><th>Heilsetning</th><th>Leddsetning</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Han kom <strong>ikkje</strong>.</em></td><td><em class="nn">… fordi han <strong>ikkje</strong> kom.</em></td></tr>
            <tr><td><em class="nn">Ho er <strong>alltid</strong> blid.</em></td><td><em class="nn">… sjølv om ho <strong>alltid</strong> er blid.</em></td></tr>
            <tr><td><em class="nn">Dei et <strong>aldri</strong> kjøt.</em></td><td><em class="nn">… at dei <strong>aldri</strong> et kjøt.</em></td></tr>
          </tbody>
        </table>
        <div class="callout">
          <strong>Ikkje-testen:</strong> Er du usikker på om noko er ei leddsetning? Set inn
          <em class="nn">ikkje</em>. Står <em class="nn">ikkje</em> naturleg <em>framfor</em> verbalet
          (<em class="nn">fordi han ikkje kom</em>), er det ei leddsetning. Står det <em>etter</em>
          (<em class="nn">han kom ikkje</em>), er det ei heilsetning.
        </div>
      `,
    },
    {
      id: "set10",
      type: "exercise",
      exerciseType: "multipleChoice",
      title: "Sjekk: verbalet på andreplass",
      question: "Kva er rett?",
      options: [
        "Då han kom heim, åt han middag.",
        "Då han kom heim, han åt middag.",
        "Då han kom heim, middag åt han.",
      ],
      correct: 0,
      explanation: "Ei leddsetning som står først, tel som eitt ledd på plass 1. Difor må det finitte verbalet kome rett etter kommaet, og subjektet etterpå.",
    },
    {
      id: "set11",
      type: "exercise",
      exerciseType: "fillIn",
      question: "Finn setningsledda. Skriv berre orda som utgjer leddet.",
      items: [
        { prompt: "«Kari les ei bok.» Subjektet er ___", accept: ["Kari"] },
        { prompt: "«Kari les ei bok.» Verbalet er ___", accept: ["les"] },
        { prompt: "«Kari les ei bok.» Objektet er ___", accept: ["ei bok", "bok"] },
        { prompt: "«I går kjøpte guten nye sko.» Verbalet er ___", accept: ["kjøpte"] },
        { prompt: "«I går kjøpte guten nye sko.» Subjektet er ___", accept: ["guten"] },
        { prompt: "«I går kjøpte guten nye sko.» Objektet er ___", accept: ["nye sko", "sko"] },
        { prompt: "«I går kjøpte guten nye sko.» Adverbialet er ___", accept: ["i går"] },
        { prompt: "«Huset er stort.» Predikativet er ___", accept: ["stort"] },
      ],
      explanation: "Finn verbalet først. «Kven kjøpte?» → guten (subjekt). «Kva kjøpte guten?» → nye sko (objekt). «Når?» → i går (adverbial). Etter er kjem eit predikativ, ikkje eit objekt: stort.",
    },
    {
      id: "set12",
      type: "exercise",
      exerciseType: "categorize",
      question: "Heilsetning eller leddsetning? Sorter.",
      categories: {
        "Heilsetning (kan stå åleine)": ["Ho kom heim.", "Eg les ei bok.", "Vi gjekk ut.", "Det regnar."],
        "Leddsetning (kan ikkje stå åleine)": ["fordi det regna", "at han var sjuk", "når du kjem", "som bur her", "dersom du vil"],
      },
      explanation: "Leddsetningane byrjar med ein subjunksjon (fordi, at, når, som, dersom) og gir ikkje meining åleine, for dei treng ei heilsetning å høyre til.",
    },
    {
      id: "set13",
      type: "exercise",
      exerciseType: "categorize",
      question: "Konjunksjon eller subjunksjon? Sorter bindeorda.",
      categories: {
        "Konjunksjon (bind saman heilsetningar)": ["og", "men", "eller"],
        "Subjunksjon (innleier leddsetning)": ["at", "fordi", "dersom", "når", "då", "som", "sjølv om"],
      },
      explanation: "Det er berre ei handfull konjunksjonar: og, men, eller, for. Alle dei andre bindeorda er subjunksjonar og gjer setninga etter til ei leddsetning.",
    },
    {
      id: "set14",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva ord skal inn? «___ eg var liten, budde vi i Bergen.»",
      options: ["Då", "Når", "Da", "Nå"],
      correct: 0,
      explanation: "Det handlar om éin bestemt periode i fortida («den gongen då»). <em class=\"bm\">Da</em> finst ikkje på nynorsk, og <em class=\"nn\">nå</em> er eit adverb som tyder «no».",
    },
    {
      id: "set15",
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva setning har rett ordstilling?",
      options: [
        "I går han kom ikkje heim.",
        "I går kom han ikkje heim.",
        "Ho sa at han kom ikkje heim i går.",
        "I går han ikkje kom heim.",
      ],
      correct: 1,
      explanation: "I ei heilsetning skal verbalet stå på andreplass: <em class=\"nn\">I går <strong>kom</strong> han</em>. I leddsetninga <em class=\"nn\">at han ikkje kom</em> må <em class=\"nn\">ikkje</em> stå framfor verbalet, og difor er det tredje alternativet feil.",
    },
    {
      id: "set16",
      type: "exercise",
      exerciseType: "translate",
      question: "Omset til nynorsk. Pass på då/når, ordstillinga etter leddsetninga og plasseringa av «ikkje».",
      source: "Da han kom hjem, spiste han ikke middag fordi han ikke var sulten.",
      accept: [
        "Då han kom heim, åt han ikkje middag fordi han ikkje var svolten",
        "Då han kom heim, åt han ikkje middag, fordi han ikkje var svolten",
        "Då han kom heim, åt han ikkje middag fordi han ikkje var sulten",
        "Då han kom heim, åt han ikkje middag, fordi han ikkje var sulten",
      ],
      hint: "spise → ete (sterkt verb: et – åt – har ete); sulten → svolten (eller sulten).",
      explanation: "<em class=\"nn\">Då</em> fordi det er éin bestemt gong. Leddsetninga står først, så verbalet kjem rett etter kommaet: <em class=\"nn\">åt han</em>. I leddsetninga <em class=\"nn\">fordi han ikkje var svolten</em> står <em class=\"nn\">ikkje</em> framfor verbalet.",
    },
    {
      id: "set17",
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman setningsleddet med det utheva dømet. Alle døma er henta frå setninga «I går gav Kari guten ei bok på skulen» og «Kari er glad».",
      pairs: [
        ["Subjekt", "Kari i «Kari gav guten ei bok»"],
        ["Verbal", "gav i «Kari gav guten ei bok»"],
        ["Objekt", "ei bok i «Kari gav guten ei bok»"],
        ["Indirekte objekt", "guten i «Kari gav guten ei bok»"],
        ["Adverbial (tid)", "i går i «I går gav Kari …»"],
        ["Adverbial (stad)", "på skulen i «… ei bok på skulen»"],
        ["Predikativ", "glad i «Kari er glad»"],
      ],
      explanation: "Kven gav? Kari (subjekt). Kva gav ho? Ei bok (objekt). Til kven? Guten (indirekte objekt). Når og kvar? I går, på skulen (adverbial). Etter er kjem predikativet glad.",
    },
    {
      id: "set18",
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv og analyser",
      question: "Skriv ein kort tekst på nynorsk (minst 80 ord) om noko du gjorde i helga. Bruk minst tre leddsetningar med ulike subjunksjonar (t.d. då, fordi, som, sjølv om), og la minst éi setning byrje med eit adverbial (t.d. «I går», «Etter middagen»). Til slutt: vel to av setningane dine og skriv under kva som er subjekt, verbal og objekt/predikativ i dei.",
      minWords: 80,
      checklist: [
        "Minst tre leddsetningar med ulike subjunksjonar, og «ikkje» framfor verbalet om du brukar det der.",
        "Minst éi heilsetning som byrjar med eit adverbial, med verbalet på andreplass.",
        "Rett då/når: «den gongen då, kvar gong når».",
        "To setningar analyserte: subjekt, verbal og objekt/predikativ.",
        "Samsvar i predikativ: «huset er stort», «bøkene er gamle».",
      ],
    },
  ],
});
