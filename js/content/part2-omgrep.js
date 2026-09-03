/* Del 2 · Grunnomgrep — undervisningsmodular om grammatiske omgrep */

Modules.register({
  id: "omgrep-ordet",
  part: 2,
  group: "omgrep",
  title: "Ordet: stamme, ending og rot",
  summary: "Kva eit ord er bygd opp av, og skilnaden på å bøye eit ord og å lage eit nytt.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Kva er eit ord bygd opp av?",
      content: `
        <p>Dei fleste ord kan delast i mindre bitar som kvar for seg ber tyding. Sjå på ordet
        <em class="nn">gutane</em>: det består av <em class="nn">gut</em> (ein ung mann) og
        <em class="nn">-ane</em> (fleire, bestemte). Når du kan sjå desse bitane, blir
        nynorsk bøying mykje lettare å forstå – og å hugse.</p>

        <h3>Tre omgrep du treng</h3>
        <table>
          <thead><tr><th>Omgrep</th><th>Kva det er</th><th>Døme</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Rot</strong></td>
              <td>Den minste delen av ordet som har tyding, og som ikkje kan delast vidare.</td>
              <td><em class="nn">gut</em>, <em class="nn">kast</em>, <em class="nn">fin</em>, <em class="nn">far</em> (i <em class="nn">ufarleg</em>)</td>
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
              tid, grad. Endinga lagar ikkje eit nytt ord – berre ei ny form av det same ordet.</td>
              <td><em class="nn">-ar, -ane, -a, -er, -ene, -et</em> (substantiv) ·
              <em class="nn">-ar, -a, -er, -te, -de, -t</em> (verb) · <em class="nn">-are, -ast</em> (adjektiv)</td>
            </tr>
          </tbody>
        </table>

        <h3>Slik ser det ut i praksis</h3>
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
          på bokmål og nynorsk – det er endinga du må passe på.
        </div>
      `,
    },
    {
      type: "lesson",
      title: "Bøying eller orddanning?",
      content: `
        <p>Vi endrar ord på to heilt ulike måtar. Det er viktig å halde dei frå kvarandre.</p>

        <h3>Bøying: same ord, ny form</h3>
        <p>Når vi <strong>bøyer</strong> eit ord, hengjer vi ei ending på stamma. Ordet tyder
        det same og høyrer til same ordklasse – vi har berre valt ei anna form:
        <em class="nn">gut – guten – gutar – gutane</em>, <em class="nn">kaste – kastar – kasta</em>,
        <em class="nn">fin – finare – finast</em>.</p>

        <h3>Orddanning: eit nytt ord</h3>
        <p>Når vi driv <strong>orddanning</strong>, lagar vi eit nytt ord med ny tyding – og
        ofte ny ordklasse. Det skjer på to måtar:</p>

        <h3>1. Avleiing – forstaving eller etterstaving</h3>
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

        <h3>2. Samansetning – to ord blir eitt</h3>
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
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er <strong>rota</strong> i ordet <em class=\"nn\">ufarlege</em>?",
      options: ["u", "far", "farleg", "ufarleg"],
      correct: 1,
      explanation: "Rota er den minste delen med tyding: <em class=\"nn\">far</em> (= fare). <em class=\"nn\">u-</em> er ei forstaving, <em class=\"nn\">-leg</em> ei etterstaving og <em class=\"nn\">-e</em> ei bøyingsending (fleirtal/bestemt form).",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva for eit av desse orda er laga ved <strong>avleiing</strong>?",
      options: ["fotball", "kasting", "gutane", "huset"],
      correct: 1,
      explanation: "<em class=\"nn\">kasting</em> er verbet <em class=\"nn\">kaste</em> + etterstavinga <em class=\"nn\">-ing</em> – eit nytt ord (substantiv). <em class=\"nn\">fotball</em> er samansetning, <em class=\"nn\">gutane</em> og <em class=\"nn\">huset</em> er bøying.",
    },
    {
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
      type: "exercise",
      exerciseType: "freeText",
      title: "Ordjakt",
      question: "Finn ti ord i ei bok, ei avis eller på ei nettside. Skriv kvart ord, del det i stamme og ending, og skriv kva endinga fortel. Døme: «bøkene = bøk- + -ene, bestemt form fleirtal». Finn minst eitt ord som er laga ved avleiing og eitt ved samansetning.",
      minWords: 60,
      checklist: [
        "Ti ord, kvart delt i stamme og ending.",
        "Kva fortel endinga (tal, bestemtheit, tid, grad)?",
        "Minst eitt avleidd ord og eitt samansett ord – merk dei.",
      ],
    },
  ],
});
