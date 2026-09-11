/* Del 2 · Typiske feil: modular ordna etter feiltype.
   Oppgåvetypen «findError» let eleven klikke på feil ord og rette det:
     { type: "exercise", exerciseType: "findError",
       question: "Finn og rett feila. Det er 2 feil.",
       text: "Jenten kastet ballen.",                 // rein tekst, ingen HTML
       errors: [ { token: "Jenten", accept: ["Jenta"] },
                 { token: "kastet", accept: ["kasta"] } ],  // token må stå ordrett i teksten; nth: 2 om ordet står fleire gonger
       explanation: "…" } */

Modules.register({
  id: "feil-boying",
  part: 2,
  group: "feil",
  title: "Feil i bøying",
  summary: "-et der det skal vere -a, -er på sterke verb, -en på hokjønnsord: endingsfeila du kan luke ut.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Bøyingsfeil du kan luke ut",
      content: `
        <p>Dei aller fleste feila i nynorsktekstar er <strong>endingsfeil</strong>: ordet er rett,
        men endinga er henta frå bokmål. Det gode er at det er få reglar som skal til for å
        rette dei fleste. Her er feila lærarar ser oftast.</p>

        <h3>Verb</h3>
        <table>
          <thead><tr><th>Feil</th><th>Rett</th><th>Regel</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">kastet, hoppet, snakket</em></td><td><em class="nn">kasta, hoppa, snakka</em></td>
                <td>A-verb får <strong>-a</strong> i preteritum og perfektum. Endinga -et finst ikkje på nynorsk.</td></tr>
            <tr><td><em class="bm">kommer, skriver, finner</em></td><td><em class="nn">kjem, skriv, finn</em></td>
                <td>Sterke verb har <strong>inga -er-ending</strong> i presens. Stamma står åleine (ofte med vokalskifte).</td></tr>
            <tr><td><em class="bm">har skrevet, har funnet</em></td><td><em class="nn">har skrive, har funne</em></td>
                <td>Sterke verb har eiga perfektumsform på <strong>-e</strong>.</td></tr>
            <tr><td><em class="bm">har kjøpet, har lært</em></td><td><em class="nn">har kjøpt, har lært</em></td>
                <td>E-verb får <strong>-t</strong> i perfektum. (Her er «har lært» rett, men pass på a-verba!)</td></tr>
          </tbody>
        </table>

        <h3>Substantiv</h3>
        <table>
          <thead><tr><th>Feil</th><th>Rett</th><th>Regel</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">boken, jenten, døren</em></td><td><em class="nn">boka, jenta, døra</em></td>
                <td>Hokjønnsord får <strong>-a</strong> i bestemt form eintal.</td></tr>
            <tr><td><em class="bm">husene, barnene, årene</em></td><td><em class="nn">husa, barna, åra</em></td>
                <td>Inkjekjønnsord får <strong>-a</strong> i bestemt form fleirtal.</td></tr>
            <tr><td><em class="bm">biler, bilene, lærere</em></td><td><em class="nn">bilar, bilane, lærarar</em></td>
                <td>Hankjønnsord får som regel <strong>-ar / -ane</strong>.</td></tr>
            <tr><td><em class="bm">jentar, jentane</em></td><td><em class="nn">jenter, jentene</em></td>
                <td>Men ikkje overdriv: hokjønnsord får <strong>-er / -ene</strong>, akkurat som på bokmål.</td></tr>
          </tbody>
        </table>

        <h3>Adjektiv og bestemt form</h3>
        <table>
          <thead><tr><th>Feil</th><th>Rett</th><th>Regel</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">eit stor hus</em></td><td><em class="nn">eit stort hus</em></td>
                <td>Adjektivet får <strong>-t</strong> i inkjekjønn eintal.</td></tr>
            <tr><td><em class="bm">dei store hus</em></td><td><em class="nn">dei store husa</em></td>
                <td>Etter <em class="nn">den/det/dei</em> skal substantivet òg stå i bestemt form (dobbel bestemming).</td></tr>
            <tr><td><em class="bm">ein fint dag</em></td><td><em class="nn">ein fin dag</em></td>
                <td>Berre inkjekjønn får -t. Hankjønn og hokjønn har grunnforma.</td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Tre raske kontrollar når du les gjennom teksten din:</strong>
          <ol>
            <li>Står eit verb i fortid på <em class="bm">-et</em>? Byt til <em class="nn">-a</em>.</li>
            <li>Står eit sterkt verb i presens på <em class="bm">-er</em>? Stryk endinga
                (<em class="bm">kommer</em> → <em class="nn">kjem</em>, <em class="bm">skriver</em> → <em class="nn">skriv</em>).</li>
            <li>Står eit hokjønnsord på <em class="bm">-en</em>, eller eit inkjekjønnsord i fleirtal på
                <em class="bm">-ene</em>? Byt til <em class="nn">-a</em>.</li>
          </ol>
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Rett eller feil på nynorsk? Sorter formene.",
      categories: {
        "Rett nynorsk": ["kasta", "kjem", "boka", "husa", "bilar", "jentene", "har skrive", "eit stort hus"],
        "Feil (bokmålsending)": ["kastet", "kommer", "boken", "husene", "biler", "jentane", "har skrevet", "eit stor hus"],
      },
      explanation: "Legg merke til «jentene»: hokjønnsord får -ene i bestemt fleirtal, så det er rett. «jentane» er feil, for den endinga høyrer hankjønn til.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett verbform:",
      items: [
        { prompt: "I går ___ (kaste) han ballen langt.", accept: ["kasta"] },
        { prompt: "Ho ___ (komme) alltid for seint.", accept: ["kjem"] },
        { prompt: "Vi har ___ (skrive) ferdig teksten.", accept: ["skrive"] },
        { prompt: "Dei ___ (hoppe) i sjøen kvar dag i sommar.", accept: ["hoppa"] },
        { prompt: "Han ___ (sove) enno.", accept: ["søv"] },
        { prompt: "Har du ___ (finne) nøklane?", accept: ["funne"] },
      ],
      explanation: "A-verb: kasta, hoppa. Sterke verb i presens utan ending: kjem, søv. Sterke verb i perfektum på -e: skrive, funne.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett substantivform:",
      items: [
        { prompt: "Eg las ___ (bok, bestemt eintal) i går.", accept: ["boka"] },
        { prompt: "Alle ___ (hus, bestemt fleirtal) i gata er raude.", accept: ["husa"] },
        { prompt: "Det står tre ___ (bil, ubestemt fleirtal) utanfor.", accept: ["bilar"] },
        { prompt: "___ (jente, bestemt fleirtal) song i kor.", accept: ["Jentene"] },
        { prompt: "Vi såg mange ___ (barn, ubestemt fleirtal) på stranda.", accept: ["barn", "born"] },
        { prompt: "Han lukka ___ (dør, bestemt eintal) stille.", accept: ["døra"] },
      ],
      explanation: "Hokjønn: boka, døra, jentene. Inkjekjønn: husa, barn/born. Hankjønn: bilar.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett?",
      options: ["Eit stor hus", "Eit stort hus", "Eit store hus"],
      correct: 1,
      explanation: "Adjektivet får -t i inkjekjønn eintal: eit stor<strong>t</strong> hus. «Store» er fleirtal eller bestemt form: dei store husa.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett?",
      options: ["dei gamle husa", "dei gamle husene", "dei gamle hus"],
      correct: 0,
      explanation: "Inkjekjønn får -a i bestemt fleirtal (husa), og etter «dei» skal substantivet stå i bestemt form.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Klikk på eit ord for å markere det, og skriv rett form. Det er <strong>2 feil</strong> i setninga.",
      text: "Jenten kastet ballen til hunden sin.",
      errors: [
        { token: "Jenten", accept: ["Jenta"] },
        { token: "kastet", accept: ["kasta"] },
      ],
      explanation: "Hokjønn får -a i bestemt form eintal (jenta). A-verb får -a i preteritum (kasta).",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>2 feil</strong>.",
      text: "Han kommer heim kvar dag klokka fire og skriver lekser før middag.",
      errors: [
        { token: "kommer", accept: ["kjem"] },
        { token: "skriver", accept: ["skriv"] },
      ],
      explanation: "Sterke verb har inga -er-ending i presens: kjem, skriv.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>3 feil</strong>.",
      text: "Alle husene i bygda har raude tak, og bilene står parkert langs den smale veien.",
      errors: [
        { token: "husene", accept: ["husa"] },
        { token: "bilene", accept: ["bilane"] },
        { token: "veien", accept: ["vegen"] },
      ],
      explanation: "Inkjekjønn: husa. Hankjønn: bilane. Og «vei» heiter «veg» på nynorsk: vegen.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "No er teksten lengre. Det er <strong>5 feil</strong>, og alle er bøyingsfeil.",
      text: "I sommar reiste vi til ei lita hytte ved sjøen. Kvar morgon hoppet vi i vatnet, og etterpå spilte vi fotball på stranden. Om kvelden leste far høgt frå ei gammal bok, og vi sovnet tidleg. Det var dei beste vekene i heile året.",
      errors: [
        { token: "hoppet", accept: ["hoppa"] },
        { token: "spilte", accept: ["spela"] },
        { token: "stranden", accept: ["stranda"] },
        { token: "leste", accept: ["las"] },
        { token: "sovnet", accept: ["sovna"] },
      ],
      explanation: "A-verb: hoppa, spela, sovna. Sterkt verb: las (lese – les – las – har lese). Hokjønn: stranda.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv og kontroller",
      question: "Skriv fem til åtte setningar om noko du gjorde i helga. Bruk minst tre a-verb og to sterke verb i preteritum, og minst to hokjønnsord og eitt inkjekjønnsord i bestemt form. Gå så gjennom teksten med dei tre raske kontrollane frå leksjonen.",
      minWords: 50,
      checklist: [
        "Ingen verb i fortid på -et.",
        "Ingen sterke verb i presens på -er.",
        "Hokjønnsord i bestemt eintal på -a, inkjekjønnsord i bestemt fleirtal på -a.",
      ],
    },
  ],
});

Modules.register({
  id: "feil-bokmalsord",
  part: 2,
  group: "feil",
  title: "Bokmålsord som snik seg inn",
  summary: "Ord som berre finst på bokmål, og an-/be-/-het/-else-ord: kva som er feil, kva som er lov, og kva som finst betre ord for.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "To slags bokmålsord",
      content: `
        <p>Når du skriv nynorsk, snik det seg inn ord frå bokmål utan at du merkar det. Dei kjem i
        to slag. Nokre ord <strong>finst rett og slett ikkje</strong> på nynorsk, og dei må du byte ut.
        Andre ord er <strong>lov</strong>, men nynorsk har ofte eit betre og meir naturleg ord.
        Det er viktig å skilje mellom desse to gruppene, så du ikkje rettar det som er rett.</p>

        <h3>Del 1: Ord som berre finst på bokmål</h3>
        <p>Desse orda er <strong>feil</strong> i ein nynorsktekst. Lær deg nynorskordet.</p>
        <table>
          <thead><tr><th>Feil (bokmål)</th><th>Rett (nynorsk)</th><th>Feil (bokmål)</th><th>Rett (nynorsk)</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">jeg</em></td><td><em class="nn">eg</em></td><td><em class="bm">hverandre</em></td><td><em class="nn">kvarandre</em></td></tr>
            <tr><td><em class="bm">ikke</em></td><td><em class="nn">ikkje</em></td><td><em class="bm">annerledes</em></td><td><em class="nn">annleis</em></td></tr>
            <tr><td><em class="bm">bare</em></td><td><em class="nn">berre</em></td><td><em class="bm">hjem</em></td><td><em class="nn">heim</em></td></tr>
            <tr><td><em class="bm">hva</em></td><td><em class="nn">kva</em></td><td><em class="bm">ben</em></td><td><em class="nn">bein</em></td></tr>
            <tr><td><em class="bm">hvordan</em></td><td><em class="nn">korleis</em></td><td><em class="bm">vei</em></td><td><em class="nn">veg</em></td></tr>
            <tr><td><em class="bm">hvis</em></td><td><em class="nn">viss, dersom, om</em></td><td><em class="bm">kirke</em></td><td><em class="nn">kyrkje</em></td></tr>
            <tr><td><em class="bm">hvilken</em></td><td><em class="nn">kva for ein</em></td><td><em class="bm">søster</em></td><td><em class="nn">syster</em></td></tr>
            <tr><td><em class="bm">selv</em></td><td><em class="nn">sjølv</em></td><td><em class="bm">da</em></td><td><em class="nn">då</em></td></tr>
            <tr><td><em class="bm">uke</em></td><td><em class="nn">veke</em></td><td><em class="bm">siden</em></td><td><em class="nn">sidan</em></td></tr>
            <tr><td><em class="bm">øye</em></td><td><em class="nn">auge</em></td><td><em class="bm">ennå</em></td><td><em class="nn">enno, endå</em></td></tr>
            <tr><td><em class="bm">spise</em></td><td><em class="nn">ete</em></td><td><em class="bm">penger</em></td><td><em class="nn">pengar</em></td></tr>
            <tr><td><em class="bm">gjøre</em></td><td><em class="nn">gjere</em></td><td><em class="bm">klær</em></td><td><em class="nn">klede</em></td></tr>
            <tr><td><em class="bm">sammen</em></td><td><em class="nn">saman</em></td><td></td><td></td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Men «nå» er lov!</strong> Mange trur at berre <em class="nn">no</em> er rett nynorsk, men
          <em class="nn">nå</em> er òg tillate: «Eg kjem <em class="nn">no</em>» og «Eg kjem <em class="nn">nå</em>»
          er begge rette. Vel den forma du likar best, og hald deg til henne.
        </div>

        <h3>Del 2: an-, be-, -het og -else</h3>
        <p>Du har kanskje høyrt at ord som byrjar på <em>an-</em> og <em>be-</em> eller endar på <em>-het</em> og
        <em>-else</em> ikkje er nynorsk. Det stemmer <strong>ikkje heilt</strong>. Mange slike ord er heilt vanlege
        og tillatne på nynorsk: <em class="nn">betale, begynne, bety, bestemme, forklaring, moglegheit</em>.
        Det du må lære deg, er å skilje mellom tre grupper:</p>

        <table>
          <thead><tr><th>Ord</th><th>Status</th><th>Bruk heller</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">mulighet</em></td><td><strong>Feil</strong></td><td><em class="nn">høve, moglegheit, sjanse</em></td></tr>
            <tr><td><em class="bm">sannhet</em></td><td><strong>Feil</strong></td><td><em class="nn">sanning</em></td></tr>
            <tr><td><em class="bm">frihet</em></td><td><strong>Feil</strong></td><td><em class="nn">fridom</em></td></tr>
            <tr><td><em class="bm">kjærlighet</em></td><td><strong>Feil</strong></td><td><em class="nn">kjærleik</em></td></tr>
            <tr><td><em class="bm">skuffelse</em></td><td><strong>Feil</strong></td><td><em class="nn">vonbrot</em></td></tr>
            <tr><td><em class="bm">bevegelse</em></td><td><strong>Feil</strong></td><td><em class="nn">rørsle</em></td></tr>
            <tr><td><em class="nn">anbefale</em></td><td>Lov, men finst betre ord</td><td><em class="nn">rå til, tilrå</em></td></tr>
            <tr><td><em class="nn">betydning</em></td><td>Lov, men finst betre ord</td><td><em class="nn">tyding</em></td></tr>
            <tr><td><em class="nn">forskjell</em></td><td>Lov, men finst betre ord</td><td><em class="nn">skilnad</em></td></tr>
            <tr><td><em class="nn">erfaring</em></td><td>Lov, men finst betre ord</td><td><em class="nn">røynsle</em> (eller erfaring)</td></tr>
            <tr><td><em class="nn">begynne</em></td><td>Heilt greitt</td><td>(<em class="nn">byrje</em> er like bra)</td></tr>
            <tr><td><em class="nn">betale, bety, bestemme, forklaring, moglegheit</em></td><td>Heilt greitt</td><td>(ingen)</td></tr>
          </tbody>
        </table>

        <p>Legg merke til mønsteret: Ord på <em class="bm">-het</em> er nesten alltid feil. Nynorsk lagar slike
        ord med <em class="nn">-leik</em> (kjærleik), <em class="nn">-dom</em> (fridom), <em class="nn">-skap</em>
        (dumskap) eller <em class="nn">-ing</em> (sanning). Ord på <em class="bm">-else</em> er som regel feil òg,
        og nynorsk brukar <em class="nn">-ing</em> (øving), <em class="nn">-sle</em> (rørsle, kjensle) eller eit
        heilt anna ord (vonbrot). Ord på <em>be-</em> og <em>for-</em> er derimot oftast heilt greie.</p>

        <div class="callout warn">
          <strong>Ikkje overrett!</strong> Om du strekar under kvart einaste be-ord i teksten din, endar du
          med å rette ord som er heilt rette. <em class="nn">Betale</em> er nynorsk. <em class="nn">Forklaring</em>
          er nynorsk. Er du usikker, slå opp i <a href="https://ordbokene.no/nno" target="_blank" rel="noopener">Nynorskordboka</a>. Står ordet der, er det lov.
        </div>

        <div class="callout">
          <strong>Tre raske kontrollar:</strong>
          <ol>
            <li>Leit etter dei vanlegaste snikarane: <em class="bm">ikke, bare, hva, jeg, hvis, da, siden, selv</em>.</li>
            <li>Leit etter ord på <em class="bm">-het</em> og <em class="bm">-else</em>. Finn eit nynorskord i staden.</li>
            <li>Ser du eit an-/be-ord? Sjekk om det står i ordboka før du rettar. Finst det eit betre nynorskord, bruk det.</li>
          </ol>
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman bokmålsordet med nynorskordet:",
      pairs: [
        ["uke", "veke"],
        ["øye", "auge"],
        ["hverandre", "kvarandre"],
        ["annerledes", "annleis"],
        ["kirke", "kyrkje"],
        ["søster", "syster"],
        ["klær", "klede"],
        ["sammen", "saman"],
      ],
      explanation: "Alle desse orda til venstre finst berre på bokmål. Lær deg nynorskorda utanåt.",
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter orda. Er dei feil på nynorsk, lov men med eit betre alternativ, eller heilt greie?",
      categories: {
        "Feil på nynorsk": ["mulighet", "sannhet", "kjærlighet", "frihet", "bevegelse", "skuffelse", "hverandre"],
        "Lov, men finst betre ord": ["anbefale", "forskjell", "erfaring", "betydning"],
        "Heilt greitt": ["betale", "forklaring", "moglegheit", "bestemme", "sanning", "kjærleik", "byrje"],
      },
      explanation: "Ord på -het og -else er som regel feil: sanning, kjærleik, fridom, rørsle, vonbrot. «Anbefale», «forskjell», «erfaring» og «betydning» står i ordboka, men «tilrå», «skilnad», «røynsle» og «tyding» er ofte betre. Og «betale», «forklaring», «moglegheit» og «bestemme» er heilt vanleg nynorsk.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn nynorskordet i staden for bokmålsordet i parentes:",
      items: [
        { prompt: "Vi ___ (spise) middag klokka fem.", accept: ["et"] },
        { prompt: "Eg har ikkje sett henne ___ (siden) i fjor.", accept: ["sidan"] },
        { prompt: "Har du ___ (penger) til bussen?", accept: ["pengar"] },
        { prompt: "Dei gifta seg i ___ (kirke, bestemt form) på Voss.", accept: ["kyrkja"] },
        { prompt: "Vi må ___ (gjøre) leksene før vi går ut.", accept: ["gjere", "gjera"] },
        { prompt: "___ (Hvis) det regnar, blir vi heime.", accept: ["Viss", "Dersom", "Om"] },
        { prompt: "Eg er ikkje ferdig ___ (ennå).", accept: ["enno", "endå"] },
        { prompt: "Ho kom ___ (hjem) seint i går kveld.", accept: ["heim"] },
      ],
      explanation: "ete – et – åt – har ete. «Siden» heiter «sidan», «penger» heiter «pengar», «kirke» heiter «kyrkje» (kyrkja i bestemt form). «Gjøre» heiter «gjere» (eller «gjera»). «Hvis» kan bli «viss», «dersom» eller «om». «Ennå» heiter «enno» eller «endå». «Hjem» heiter «heim».",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva for ei setning er rett nynorsk?",
      options: ["Eg kjem nå.", "Jeg kjem no.", "Eg kjem ikke no."],
      correct: 0,
      explanation: "«Nå» er tillate på nynorsk ved sida av «no». Derimot er «jeg» og «ikke» reine bokmålsord.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Søsteren min spiser sammen med vennene sine hver uke.",
      accept: [
        "Syster mi et saman med venene sine kvar veke.",
        "Systera mi et saman med venene sine kvar veke.",
        "Syster mi et saman med vennene sine kvar veke.",
        "Systera mi et saman med vennene sine kvar veke.",
      ],
      hint: "«søster» → «syster»; «spiser» → «et»; «sammen» → «saman»; «hver uke» → «kvar veke». Hugs at «min» blir «mi» etter eit hokjønnsord.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Hvis du ikke kommer hjem nå, blir mor din sint.",
      accept: [
        "Viss du ikkje kjem heim no, blir mor di sint.",
        "Viss du ikkje kjem heim nå, blir mor di sint.",
        "Viss du ikkje kjem heim no, vert mor di sint.",
        "Viss du ikkje kjem heim nå, vert mor di sint.",
        "Dersom du ikkje kjem heim no, blir mor di sint.",
        "Dersom du ikkje kjem heim nå, blir mor di sint.",
        "Dersom du ikkje kjem heim no, vert mor di sint.",
        "Dersom du ikkje kjem heim nå, vert mor di sint.",
        "Om du ikkje kjem heim no, blir mor di sint.",
        "Om du ikkje kjem heim nå, blir mor di sint.",
        "Om du ikkje kjem heim no, vert mor di sint.",
        "Om du ikkje kjem heim nå, vert mor di sint.",
      ],
      hint: "«hvis» → «viss/dersom/om»; «kommer» → «kjem»; «hjem» → «heim»; «nå» kan stå som «no» eller «nå». Og «mor din» → «mor di».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett bokmålsorda. Det er <strong>3 feil</strong> i setninga.",
      text: "Jeg trur ikke at vi rekk bussen hvis vi ikkje spring.",
      errors: [
        { token: "Jeg", accept: ["Eg"] },
        { token: "ikke", accept: ["ikkje"] },
        { token: "hvis", accept: ["viss", "dersom", "om"] },
      ],
      explanation: "«Jeg» heiter «eg», «ikke» heiter «ikkje», og «hvis» heiter «viss», «dersom» eller «om». Legg merke til at «ikkje» seinare i setninga er rett.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett bokmålsorda. Det er <strong>4 feil</strong>.",
      text: "Eg og syster mi gjorde leksene sammen i går. Etterpå gjekk vi hjem til bestemor, som bur rett ved kirken, og spiste vaflar.",
      errors: [
        { token: "sammen", accept: ["saman"] },
        { token: "hjem", accept: ["heim"] },
        { token: "kirken", accept: ["kyrkja"] },
        { token: "spiste", accept: ["åt"] },
      ],
      explanation: "«Sammen» heiter «saman», «hjem» heiter «heim». «Kirke» heiter «kyrkje», og i bestemt form «kyrkja» (hokjønn). «Spise» heiter «ete», og preteritum er «åt».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "No er teksten lengre. Det er <strong>6 feil</strong>: fem reine bokmålsord og eitt ord på -het.",
      text: "Kvar sommar reiser familien min til ei lita øy på Vestlandet. Vi bur i eit gammalt hus som bestefar bygde selv, og det ligg berre nokre meter frå sjøen. I fjor fekk bror min ein diger torsk, og han var så stolt at han ikke ville snakke om noko anna på ei heil uke. Det beste med ferien er at vi har god tid til hverandre. Ingen ser på klokka, og ingen må gjøre noko dei ikkje har lyst til. Eg trur at den friheten er grunnen til at vi kjem tilbake år etter år.",
      errors: [
        { token: "selv", accept: ["sjølv"] },
        { token: "ikke", accept: ["ikkje"] },
        { token: "uke", accept: ["veke"] },
        { token: "hverandre", accept: ["kvarandre"] },
        { token: "gjøre", accept: ["gjere", "gjera"] },
        { token: "friheten", accept: ["fridomen", "fridommen"] },
      ],
      explanation: "«Selv» heiter «sjølv», «ikke» heiter «ikkje», «uke» heiter «veke», «hverandre» heiter «kvarandre», og «gjøre» heiter «gjere». «Frihet» finst ikkje på nynorsk. Ordet er «fridom», i bestemt form «fridomen» (eller «fridommen»).",
    },
  ],
});

Modules.register({
  id: "feil-smaord",
  part: 2,
  group: "feil",
  title: "Småord og funksjonsord",
  summary: "Pronomen, eigedomsord og dei små orda som avslører bokmålstenking: de/dei, ho/henne, sin/hans, då/når, kvar/kor.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Småorda som avslører deg",
      content: `
        <p>Dei små orda er dei du skriv fortast og tenkjer minst over. Nettopp derfor er det her
        bokmålet snik seg inn. Her er fellene lærarar ser oftast.</p>

        <h3>Pronomen</h3>
        <table>
          <thead><tr><th>Bokmål</th><th>Nynorsk (subjekt)</th><th>Nynorsk (objekt)</th><th>Eigedomsord</th></tr></thead>
          <tbody>
            <tr><td>jeg / meg</td><td><em class="nn">eg</em></td><td><em class="nn">meg</em></td><td><em class="nn">min, mi, mitt, mine</em></td></tr>
            <tr><td>han / ham</td><td><em class="nn">han</em></td><td><em class="nn">han</em> (honom)</td><td><em class="nn">hans</em></td></tr>
            <tr><td>hun / henne</td><td><em class="nn">ho</em></td><td><em class="nn">henne</em> (ho)</td><td><em class="nn">hennar</em></td></tr>
            <tr><td>vi / oss</td><td><em class="nn">vi</em> (me)</td><td><em class="nn">oss</em></td><td><em class="nn">vår, vårt, våre</em></td></tr>
            <tr><td>dere / dere</td><td><em class="nn">de</em> (dokker)</td><td><em class="nn">dykk</em> (dokker)</td><td><em class="nn">dykkar</em> (dokkar)</td></tr>
            <tr><td>de / dem</td><td><em class="nn">dei</em></td><td><em class="nn">dei</em></td><td><em class="nn">deira</em></td></tr>
          </tbody>
        </table>

        <div class="callout warn">
          <strong>Den største fella: «de».</strong> På bokmål tyder <em class="bm">de</em> «dei andre». På nynorsk
          tyder <em class="nn">de</em> «dere», altså dei du snakkar til! «<em class="nn">De</em> må skunde
          <em class="nn">dykk</em>» = «Dere må skynde dere». «<em class="nn">Dei</em> må skunde seg» = «De må skynde seg».
          Og <em class="bm">ham</em>, <em class="bm">dem</em>, <em class="bm">hennes</em> og <em class="bm">deres</em>
          finst ikkje på nynorsk.
        </div>

        <h3>seg, sjølv, kvarandre</h3>
        <ul>
          <li><em class="nn">seg</em> peikar tilbake på subjektet: «Dei vaska <em class="nn">seg</em>.»</li>
          <li><em class="nn">sjølv</em> understrekar: «Ho gjorde det <em class="nn">sjølv</em>.» (Ikkje <em class="bm">selv</em>.)</li>
          <li><em class="nn">kvarandre</em> er gjensidig: «Dei hjelpte <em class="nn">kvarandre</em>.» (Ikkje <em class="bm">hverandre</em>.)</li>
        </ul>

        <h3>noko, nokon, noka, nokre</h3>
        <p>Kort repetisjon: <em class="nn">nokon</em> (hankjønn: nokon gut), <em class="nn">noka</em> (hokjønn: noka jente),
        <em class="nn">noko</em> (inkjekjønn og mengd: noko hus, noko mat), <em class="nn">nokre</em> (fleirtal: nokre bøker).
        I spørsmål og nekting kan <em class="nn">nokon</em> òg stå til fleirtal: «Har du <em class="nn">nokon</em> pengar?»</p>

        <h3>kva for ein / ei / eit</h3>
        <p>Bokmål <em class="bm">hvilken/hvilket/hvilke</em> heiter <em class="nn">kva for ein</em> (bil), <em class="nn">kva for ei</em> (bok),
        <em class="nn">kva for eit</em> (hus) og <em class="nn">kva for nokre</em> (bøker). Ofte held det med berre <em class="nn">kva</em>:
        «<em class="nn">Kva</em> bok les du?»</p>

        <h3>Små ord som liknar kvarandre</h3>
        <table>
          <thead><tr><th>Ord</th><th>Bruk</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">då</em> / <em class="nn">når</em></td><td><em class="nn">då</em> = éin gong i fortida; <em class="nn">når</em> = kvar gong, framtid</td>
                <td><em class="nn">Då</em> eg vakna i går. <em class="nn">Når</em> eg vaknar, et eg frukost.</td></tr>
            <tr><td><em class="nn">kvar</em> / <em class="nn">kor</em></td><td><em class="nn">kvar</em> = stad (og «kvar» = hver); <em class="nn">kor</em> = grad og mengd</td>
                <td><em class="nn">Kvar</em> bur du? <em class="nn">Kor</em> mange kjem? <em class="nn">Kor</em> lenge varer det?</td></tr>
            <tr><td><em class="nn">enno</em> / <em class="nn">endå</em></td><td>begge = «ennå»; <em class="nn">endå</em> tyder òg «enda»</td>
                <td>Eg er ikkje ferdig <em class="nn">enno</em>. Det vart <em class="nn">endå</em> betre.</td></tr>
            <tr><td><em class="nn">òg</em> / <em class="nn">også</em> / <em class="nn">og</em></td><td><em class="nn">òg</em> og <em class="nn">også</em> tyder det same; <em class="nn">og</em> bind saman</td>
                <td>Eg vil <em class="nn">òg</em> vere med. Per <em class="nn">og</em> Kari kjem.</td></tr>
            <tr><td><em class="nn">sidan</em> / <em class="nn">fordi</em> / <em class="nn">for</em></td><td><em class="nn">sidan</em> = tid; <em class="nn">fordi</em> og <em class="nn">for</em> = årsak</td>
                <td>Eg har ikkje sett han <em class="nn">sidan</em> i fjor. Eg gjekk heim, <em class="nn">for</em> eg var trøytt.</td></tr>
          </tbody>
        </table>
        <p>Merk: <em class="nn">kor</em> kan òg brukast om stad («Kor bur du?»), men <em class="nn">kvar</em> kan
        <strong>aldri</strong> brukast om grad. «Kvar mange» er alltid feil.</p>

        <h3>Eigedom: Kari si bok</h3>
        <p>På nynorsk unngår vi s-genitiv. I staden skriv vi anten <em class="nn">boka til Kari</em> eller
        <em class="nn">Kari si bok</em>. Vel du <em class="nn">sin</em>-forma, må ho <strong>samsvare</strong> med det ein eig:</p>
        <ul>
          <li><em class="nn">Kari sin</em> bil (hankjønn), <em class="nn">Kari si</em> bok (hokjønn),
              <em class="nn">Kari sitt</em> hus (inkjekjønn), <em class="nn">Kari sine</em> bøker (fleirtal)</li>
          <li>Feil: <em class="bm">Karis bok</em> (s-genitiv) og <em class="bm">Kari sin bok</em> (manglar samsvar)</li>
        </ul>

        <h3>sin/si/sitt/sine eller hans/hennar/deira?</h3>
        <p><em class="nn">Sin, si, sitt, sine</em> peikar alltid tilbake på <strong>subjektet</strong> i setninga.
        <em class="nn">Hans, hennar, deira</em> peikar på nokon annan.</p>
        <table>
          <thead><tr><th>Setning</th><th>Tyding</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Han tok boka si.</em></td><td>Han tok si eiga bok.</td></tr>
            <tr><td><em class="nn">Han tok boka hans.</em></td><td>Han tok boka til ein annan gut.</td></tr>
            <tr><td><em class="nn">Ho ringde mor si.</em></td><td>Ho ringde si eiga mor.</td></tr>
            <tr><td><em class="nn">Ho ringde mor hennar.</em></td><td>Ho ringde mora til ei anna jente.</td></tr>
          </tbody>
        </table>

        <h3>ein, ei, eit</h3>
        <p>Bokmål har <em class="bm">en</em> og <em class="bm">et</em>. Nynorsk har alltid tre: <em class="nn">ein</em> bil,
        <em class="nn">ei</em> bok, <em class="nn">eit</em> hus. Skriv du <em class="bm">en</em> eller <em class="bm">et</em>
        i ein nynorsktekst, er det alltid feil.</p>

        <div class="callout">
          <strong>Tre raske kontrollar:</strong>
          <ol>
            <li>Kvar gong du har skrive <em class="nn">de</em> eller <em class="nn">dei</em>: Snakkar nokon <em>til</em> dei (de), eller <em>om</em> dei (dei)?</li>
            <li>Kvar gong du har skrive <em class="nn">sin/si/sitt/sine</em>: Peikar ordet tilbake på subjektet? Om ikkje, skal det vere <em class="nn">hans/hennar/deira</em>.</li>
            <li>Leit etter <em class="bm">hun, ham, dem, hennes, deres, en, et</em>. Dei finst ikkje på nynorsk.</li>
          </ol>
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Du snakkar til to vener som er seine. Kva seier du?",
      options: ["Dei må skunde dykk!", "De må skunde dykk!", "De må skunde dei!"],
      correct: 1,
      explanation: "Du snakkar til dei, altså 2. person fleirtal: «de» som subjekt og «dykk» som objekt. «Dei må skunde seg» ville handla om nokon andre.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kari gløymde boka på skulen. Per tok boka ___ og sprang etter henne. Kva skal stå i luka?",
      options: ["si", "hennar", "hennes", "sin"],
      correct: 1,
      explanation: "Boka er Kari si, ikkje Per si. «Sin/si» peikar tilbake på subjektet (Per), så det må vere «hennar». «Hennes» finst ikkje på nynorsk.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett pronomen eller eigedomsord (bokmålsordet står i parentes):",
      items: [
        { prompt: "Kan ___ (dere) hjelpe meg med dette?", accept: ["de", "dokker"] },
        { prompt: "Eg såg ___ (henne) på butikken i går.", accept: ["henne", "ho"] },
        { prompt: "Har du sett ___ (dem) i dag?", accept: ["dei"] },
        { prompt: "___ (Hun) kjem i morgon.", accept: ["Ho"] },
        { prompt: "Boka ___ (hennes) ligg på bordet.", accept: ["hennar"] },
        { prompt: "Eg helsar på ___ (dere) i morgon.", accept: ["dykk", "dokker"] },
        { prompt: "Har de hugsa jakkene ___ (deres)?", accept: ["dykkar", "dokkar"] },
      ],
      explanation: "«Dere» som subjekt er «de», som objekt «dykk» (eller «dokker» begge stader). «Hun» er «ho», «henne» er «henne» (eller «ho»). «Dem» er «dei». «Hennes» er «hennar». «Deres» om dei du snakkar til, er «dykkar»; om andre er det «deira».",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Set inn rett småord:",
      items: [
        { prompt: "___ (Da/Når) eg var liten, budde vi i Bergen.", accept: ["Då"] },
        { prompt: "___ (Da/Når) det regnar, held vi oss inne.", accept: ["Når"] },
        { prompt: "___ (Hvor) mange elevar går i klassen?", accept: ["Kor"] },
        { prompt: "___ (Hvor) har du lagt nøklane?", accept: ["Kvar", "Kor"] },
        { prompt: "Er du ikkje ferdig ___ (ennå)?", accept: ["enno", "endå"] },
        { prompt: "Eg vil ___ (også) vere med.", accept: ["òg", "også"] },
        { prompt: "___ (Hvilken) genser vil du ha?", accept: ["Kva for ein", "Kva"] },
      ],
      explanation: "Då = éin gong i fortida, når = kvar gong. Kor mange (grad), kvar/kor har du lagt (stad). Enno og endå er begge rette. Òg og også tyder det same. «Hvilken genser» blir «kva for ein genser» (genser er hankjønn) eller berre «kva genser».",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman bokmål og nynorsk:",
      pairs: [
        ["dere (subjekt)", "de"],
        ["dere (objekt)", "dykk"],
        ["hun", "ho"],
        ["dem", "dei"],
        ["hennes", "hennar"],
        ["deres (om andre)", "deira"],
        ["hverandre", "kvarandre"],
        ["hvilken", "kva for ein"],
      ],
      explanation: "Legg spesielt merke til at bokmål «dere» blir «de» (subjekt) og «dykk» (objekt), medan bokmål «de» og «dem» begge blir «dei».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>3 feil</strong> i setninga. Emma snakkar til to vener.",
      text: "Dei må skunde dykk, for filmen startar om fem minutt, og hun har alt kjøpt billettane til dere.",
      errors: [
        { token: "Dei", accept: ["De"] },
        { token: "hun", accept: ["ho"] },
        { token: "dere", accept: ["dykk", "dokker"] },
      ],
      explanation: "Emma snakkar til venene, så det skal vere «De må skunde dykk». «Hun» heiter «ho», og «dere» som objekt heiter «dykk» (eller «dokker»).",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>3 feil</strong>, og alle handlar om eigedom.",
      text: "Kari sin bok ligg på bordet, men Karis penal er borte. Ho leitar overalt, men finn det ikkje. Til slutt spør ho Per om han har sett det, og han seier at han la det i sekken hennes i går.",
      errors: [
        { token: "sin", accept: ["si"] },
        { token: "Karis", accept: ["Kari sitt"] },
        { token: "hennes", accept: ["hennar"] },
      ],
      explanation: "Bok er hokjønn, så det heiter «Kari si bok». S-genitiv unngår vi: «Kari sitt penal» (penal er inkjekjønn) eller «penalet til Kari». «Hennes» heiter «hennar», og her er det rett med «hennar», ikkje «sin», sidan sekken er Kari sin, ikkje Per sin.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "No er teksten lengre. Det er <strong>7 feil</strong>, alle er småord. Sjå særleg etter de/dei, då/når, pronomen og eigedomsord.",
      text: "I dag hadde vi klassetur til Bergen. «Dei må møte på stasjonen klokka åtte», sa læraren til oss, men Jonas kom ikkje før halv ni. Når han endeleg dukka opp, var alle irriterte, og Sara sa at ho aldri meir ville vente på ham. Vi gjekk først til torget og kjøpte nokre reker, og etterpå tok vi Fløibanen opp. Ida hadde gløymt jakka si på toget, så Mia lånte henne en genser. Vi var òg innom eit museum, og Kristian påstod at han hadde vore der før med foreldrene hans. Då vi kom heim, var Jonas ennå sur.",
      errors: [
        { token: "Dei", accept: ["De", "Dokker"] },
        { token: "Når", accept: ["Då"] },
        { token: "ham", accept: ["han", "honom"] },
        { token: "en", accept: ["ein"] },
        { token: "foreldrene", accept: ["foreldra"] },
        { token: "hans", accept: ["sine"] },
        { token: "ennå", accept: ["enno", "endå"] },
      ],
      explanation: "Læraren snakkar til elevane: «De må møte». Éin gong i fortida: «Då han endeleg dukka opp». «Ham» heiter «han» (eller «honom»). «En genser» heiter «ein genser». Foreldre er inkjekjønn i fleirtal: «foreldra», og sidan det er Kristian sine eigne foreldre, skal det vere «foreldra sine», ikkje «hans». «Ennå» heiter «enno» eller «endå».",
    },
  ],
});

Modules.register({
  id: "feil-setning",
  part: 2,
  group: "feil",
  title: "Setningsbygnad og stil",
  summary: "S-passiv, substantivsjuke, s-genitiv og tunge setningar: slik skriv du nynorsk som flyt, ikkje bokmål med nynorske endingar.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Skriv nynorsk, ikkje omsett bokmål",
      content: `
        <p>Sjølv om kvart einaste ord er rett, kan ein tekst likevel lukte bokmål. Då sit feilen i
        <strong>setningsbygnaden</strong>: passiv der nynorsk vil ha aktiv, substantiv der nynorsk vil ha verb,
        og tunge konstruksjonar der nynorsk vil ha korte setningar. Her er dei viktigaste.</p>

        <h3>S-passiv: berre etter modalverb</h3>
        <table>
          <thead><tr><th>Feil</th><th>Rett</th><th>Regel</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Bilen vaskes kvar laurdag.</em></td><td><em class="nn">Bilen blir vaska kvar laurdag.</em><br><em class="nn">Vi vaskar bilen kvar laurdag.</em></td>
                <td>Bruk <strong>bli/verte + partisipp</strong>, eller skriv om til aktiv.</td></tr>
            <tr><td><em class="bm">Billettar selges i døra.</em></td><td><em class="nn">Billettar blir selde i døra.</em><br><em class="nn">Dei sel billettar i døra.</em></td>
                <td>Same regel. Hugs samsvar: billettar → selde.</td></tr>
            <tr><td>(ikkje aktuelt)</td><td><em class="nn">Bilen må vaskast. Billettane kan kjøpast i døra. Dette skal gjerast i dag.</em></td>
                <td>Etter <strong>kan, skal, må, bør, vil</strong> er s-passiv heilt greitt.</td></tr>
          </tbody>
        </table>
        <p>Nokre verb på -st er ikkje passiv, men eigne verb: <em class="nn">finst, synest, kjennest, trivst, minnest</em>.
        Dei er alltid rette.</p>

        <h3>Substantivsjuke</h3>
        <p>Når du gøymer handlinga i eit substantiv og hektar på eit tomt verb som <em class="bm">skjer</em>,
        <em class="bm">finn stad</em> eller <em class="bm">blir gjort</em>, blir teksten tung. Finn verbet, og la det gjere jobben.</p>
        <table>
          <thead><tr><th>Tungt</th><th>Lett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Gjennomføring av testen skjer i morgon.</em></td><td><em class="nn">Testen blir gjennomført i morgon.</em> / <em class="nn">Vi gjennomfører testen i morgon.</em></td></tr>
            <tr><td><em class="bm">Ho gjorde ei vurdering av søknaden.</em></td><td><em class="nn">Ho vurderte søknaden.</em></td></tr>
            <tr><td><em class="bm">Det vart teke ei avgjerd om å avlyse.</em></td><td><em class="nn">Dei avgjorde å avlyse.</em></td></tr>
            <tr><td><em class="bm">Innsamling av pengar finn stad i mai.</em></td><td><em class="nn">Vi samlar inn pengar i mai.</em></td></tr>
          </tbody>
        </table>
        <p>Tips: Leit etter substantiv på <em>-ing</em>, <em>-nad</em> og <em>-sjon</em> saman med <em class="bm">skjer</em>,
        <em class="bm">finn stad</em>, <em class="bm">av</em>. Der ligg det ofte eit verb og ventar.</p>

        <h3>S-genitiv og garpegenitiv</h3>
        <ul>
          <li>Feil: <em class="bm">skulens rektor, kommunens budsjett</em>. Rett: <em class="nn">rektoren på skulen, budsjettet til kommunen</em>,
              eller <em class="nn">skulen sin rektor, kommunen sitt budsjett</em>.</li>
          <li>Faste uttrykk med -s er greie: <em class="nn">til fjells, til sjøs, til bords</em>.</li>
          <li>Men ikkje overdriv <em class="nn">sin</em>-forma. <em class="bm">Bilen sin motor sin lyd</em> er tungt.
              Skriv heller <em class="nn">lyden frå motoren i bilen</em>.</li>
        </ul>

        <h3>Tunge «det»-setningar og unødvendig «som»</h3>
        <table>
          <thead><tr><th>Tungt</th><th>Lett</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">Det er mange som meiner at prøva var vanskeleg.</em></td><td><em class="nn">Mange meiner at prøva var vanskeleg.</em></td></tr>
            <tr><td><em class="bm">Det var Per som vann løpet.</em></td><td><em class="nn">Per vann løpet.</em></td></tr>
            <tr><td><em class="bm">Det var i går som han kom.</em></td><td><em class="nn">Han kom i går.</em></td></tr>
          </tbody>
        </table>
        <p>«Det er … som» kan brukast når du verkeleg vil framheve noko, men som regel er den korte setninga betre.</p>

        <h3>Ordstilling frå engelsk og bokmål</h3>
        <ul>
          <li>I leddsetningar står <em class="nn">ikkje</em> og andre adverb <strong>framfor</strong> verbet:
              <em class="bm">Ho sa at ho kom ikkje</em> → <em class="nn">Ho sa at ho ikkje kom</em>.</li>
          <li>Verbet står alltid på andreplass i hovudsetningar: <em class="bm">I går eg såg ein film</em> →
              <em class="nn">I går såg eg ein film</em>.</li>
        </ul>

        <h3>Tre småting som ofte går gale</h3>
        <table>
          <thead><tr><th>Regel</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td><strong>har blitt / er blitt</strong>: begge er rette.</td>
                <td><em class="nn">Ho har blitt sjuk. Ho er blitt sjuk. Ho har vorte sjuk.</em></td></tr>
            <tr><td><strong>Dobbel bestemming</strong>: etter <em class="nn">den/det/dei</em> skal substantivet stå i bestemt form.</td>
                <td><em class="nn">den nye bilen, det store huset, dei gamle bøkene</em>, ikkje <em class="bm">den nye bil</em>.</td></tr>
            <tr><td><strong>Ingen artikkel</strong> framfor yrke og nasjonalitet.</td>
                <td><em class="nn">Ho er lærar. Han er svensk.</em> Men med adjektiv: <em class="nn">Ho er ein flink lærar.</em></td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Tre raske kontrollar:</strong>
          <ol>
            <li>Leit etter verb på <em class="bm">-es</em> eller <em class="bm">-ast</em>. Står det eit modalverb framfor? Om ikkje, skriv om med <em class="nn">blir/vert</em> eller til aktiv.</li>
            <li>Leit etter <em class="bm">skjer</em>, <em class="bm">finn stad</em> og <em class="bm">-ing av</em>. Finn verbet som gøymer seg, og bruk det.</li>
            <li>Leit etter <em class="bm">-s</em> på slutten av eit substantiv (skulens). Skriv om med <em class="nn">til</em> eller <em class="nn">sin/si/sitt/sine</em>.</li>
          </ol>
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til god nynorsk. Unngå s-passiv.",
      source: "Bilen vaskes hver lørdag.",
      accept: [
        "Bilen blir vaska kvar laurdag.",
        "Bilen vert vaska kvar laurdag.",
        "Vi vaskar bilen kvar laurdag.",
        "Me vaskar bilen kvar laurdag.",
      ],
      hint: "Bruk «blir/vert vaska», eller skriv om til aktiv med «vi vaskar».",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til god nynorsk. Kvitt deg med substantivsjuka.",
      source: "Gjennomføringen av prøven skjer i morgen.",
      accept: [
        "Prøva blir gjennomført i morgon.",
        "Prøva vert gjennomført i morgon.",
        "Vi gjennomfører prøva i morgon.",
        "Me gjennomfører prøva i morgon.",
      ],
      hint: "Finn verbet som gøymer seg i «gjennomføring». Prøve er hokjønn: prøva.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til god nynorsk. Pass på s-genitiven og artikkelen.",
      source: "Karis søster er en sykepleier.",
      accept: [
        "Syster til Kari er sjukepleiar.",
        "Systera til Kari er sjukepleiar.",
        "Kari si syster er sjukepleiar.",
      ],
      hint: "Skriv om «Karis» med «til» eller «si». Ingen artikkel framfor yrke: «er sjukepleiar».",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva for ei setning er best nynorsk?",
      options: [
        "Det ble tatt en beslutning om å avlyse turen.",
        "Det vart teke ei avgjerd om å avlyse turen.",
        "Dei avgjorde å avlyse turen.",
      ],
      correct: 2,
      explanation: "Den første er bokmål. Den andre er korrekt nynorsk, men lid av substantivsjuke: handlinga er gøymd i «avgjerd». Den tredje let verbet gjere jobben.",
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter uttrykka: Er s-forma grei, eller må setninga skrivast om?",
      categories: {
        "Greitt": ["Bilen må vaskast", "Billettane kan kjøpast i døra", "Dette skal gjerast i dag", "Det finst mange løysingar", "Ho synest det er gøy", "Leksene bør gjerast før middag"],
        "Skriv om": ["Bilen vaskes kvar laurdag", "Billettar selges i døra", "Maten lagast på kjøkkenet", "Døra opnast klokka åtte", "Det seiast at han er rik", "Brevet sendast i morgon"],
      },
      explanation: "S-passiv er grei etter modalverb (må, kan, skal, bør, vil). «Finst» og «synest» er eigne verb, ikkje passiv. Utan modalverb må du skrive om: «Bilen blir vaska», «Billettar blir selde», «Maten blir laga», «Døra blir opna», «Det blir sagt», «Brevet blir sendt».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>3 feil</strong>: to s-passivar og éi manglande dobbel bestemming. Rettinga kan vere fleire ord, til dømes «blir vaska».",
      text: "Bilen vaskes kvar laurdag, og etterpå selges den gamle sykkel på nettet.",
      errors: [
        { token: "vaskes", accept: ["blir vaska", "vert vaska"] },
        { token: "selges", accept: ["blir seld", "vert seld", "blir selt", "vert selt"] },
        { token: "sykkel", accept: ["sykkelen"] },
      ],
      explanation: "Utan modalverb skriv vi om: «blir vaska», «blir seld». Og etter «den» skal substantivet stå i bestemt form: «den gamle sykkelen».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "Finn og rett feila. Det er <strong>3 feil</strong>. Éin s-passiv er rett, så ikkje rør han!",
      text: "Skulens nye gymsal opnast i morgon, og alle elevane er inviterte. Den gamle sal skal rivast til hausten.",
      errors: [
        { token: "Skulens", accept: ["Skulen sin"] },
        { token: "opnast", accept: ["blir opna", "vert opna"] },
        { token: "sal", accept: ["salen"] },
      ],
      explanation: "S-genitiv skriv vi om: «Skulen sin nye gymsal» (eller «den nye gymsalen på skulen»). «Opnast» står utan modalverb, så det skal vere «blir opna». «Den gamle salen» treng dobbel bestemming. «Skal rivast» er derimot heilt rett, sidan det står eit modalverb framfor.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      question: "No er teksten lengre. Det er <strong>6 feil</strong>: s-passiv utan modalverb, s-genitiv, manglande dobbel bestemming og éi bokmålsform av «bli». Hugs at rettinga kan vere fleire ord.",
      text: "Kvar vår arrangerer skulen vår ein stor idrettsdag. Dagen planleggjast av elevrådet, og lærarane hjelper til der det trengst. I år ble det bestemt at dagen skulle haldast på den nye bane ved elva. Billettar til grillfesten om kvelden selges i kantina heile veka, og pengane går til klasseturen. Kommunens ordførar har lova å kome og dele ut premiar. Premiane delast ut klokka fem. Elevane er spente, for i fjor vann niande trinn nesten alt, og i år vil tiande trinn slå tilbake. Rektor seier at det viktigaste ikkje er å vinne, men at alle deltek.",
      errors: [
        { token: "planleggjast", accept: ["blir planlagd", "vert planlagd", "blir planlagt", "vert planlagt"] },
        { token: "ble", accept: ["blei", "vart"] },
        { token: "bane", accept: ["banen"] },
        { token: "selges", accept: ["blir selde", "vert selde", "blir selt", "vert selt"] },
        { token: "Kommunens", accept: ["Kommunen sin"] },
        { token: "delast", accept: ["blir delte", "vert delte", "blir delt", "vert delt"] },
      ],
      explanation: "S-passiv utan modalverb skriv vi om: «Dagen blir planlagd», «Billettar blir selde», «Premiane blir delte ut». Preteritum av bli er «blei» eller «vart». Dobbel bestemming: «den nye banen». S-genitiv: «Kommunen sin ordførar» (eller «ordføraren i kommunen»). Legg merke til at «skulle haldast» og «trengst» er rette.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv om avsnittet",
      question: "Avsnittet under er korrekt nynorsk, men tungt og fullt av substantivsjuke og s-passiv. Skriv det om så det blir aktivt og konkret: Bruk verb i staden for substantiv, og bruk s-passiv berre etter modalverb. Innhaldet skal vere det same.<br><br><em>«Innsamling av pengar til klasseturen skjer i heile vår. Gjennomføring av kakesal finn stad kvar fredag, og det vart gjort ei avgjerd av elevrådet om at inntektene delast likt mellom klassane. Ei vurdering av reisemål vil bli gjort av lærarane i mai.»</em>",
      minWords: 30,
      checklist: [
        "Ingen «skjer», «finn stad» eller «blir gjort». Handlinga ligg i verbet.",
        "Ingen s-passiv utan modalverb («delast» er skrive om).",
        "Kvar setning har eit tydeleg subjekt som gjer noko: vi, elevrådet, lærarane.",
        "Innhaldet er det same som i originalen.",
      ],
    },
  ],
});
