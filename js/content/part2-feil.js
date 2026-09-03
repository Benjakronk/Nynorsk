/* Del 2 · Typiske feil — modular ordna etter feiltype.
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
                <td>E-verb får <strong>-t</strong> i perfektum. (Her er «har lært» rett – men pass på a-verba!)</td></tr>
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
      explanation: "Legg merke til «jentene»: hokjønnsord får -ene i bestemt fleirtal, så det er rett. «jentane» er feil – den endinga høyrer hankjønn til.",
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
      question: "No er teksten lengre. Det er <strong>5 feil</strong> – alle er bøyingsfeil.",
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
      question: "Skriv fem–åtte setningar om noko du gjorde i helga. Bruk minst tre a-verb og to sterke verb i preteritum, og minst to hokjønnsord og eitt inkjekjønnsord i bestemt form. Gå så gjennom teksten med dei tre raske kontrollane frå leksjonen.",
      minWords: 50,
      checklist: [
        "Ingen verb i fortid på -et.",
        "Ingen sterke verb i presens på -er.",
        "Hokjønnsord i bestemt eintal på -a, inkjekjønnsord i bestemt fleirtal på -a.",
      ],
    },
  ],
});
