/* Del 2 · Typiske feil — Rettelesing: finn og rett feila
   Fem lengre findError-tekstar med stigande vanskegrad. Sjå toppkommentaren i
   part2-feil.js for skjemaet. Alle ord som ikkje er registrerte feil, må vere
   korrekt nynorsk, sidan eleven kan klikke på kva som helst ord. */

Modules.register({
  id: "feil-rettelesing",
  part: 2,
  group: "feil",
  title: "Rettelesing: finn og rett feila",
  summary: "Fem heile tekstar med skjulte feil, frå dagboknotat til forteljing. Tren på å lese korrektur slik du må gjere på din eigen tekst.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Slik les du korrektur",
      content: `
        <p>Når du har skrive ferdig ein tekst på nynorsk, er du ikkje ferdig. Dei fleste feila
        oppdagar du først når du les teksten <strong>éin gong til</strong> – og då hjelper det å
        vite kva du leitar etter. Å lese korrektur er ein eigen dugleik, og han kan trenast.</p>

        <div class="callout">
          <strong>Les teksten tre gonger, med kvart sitt fokus:</strong>
          <ol>
            <li><strong>Innhald.</strong> Heng teksten saman? Manglar det ord? Gjer eventuelle endringar i
                innhaldet no, før du finpussar språket.</li>
            <li><strong>Endingar.</strong> Sjå berre på slutten av orda. Verb i fortid, substantiv i bestemt form,
                adjektiv i inkjekjønn. Det er her dei fleste feila ligg.</li>
            <li><strong>Småord.</strong> Les sakte og stopp ved kvart einaste lite ord: <em class="nn">ikkje, berre,
                kva, dei, de, noko, nokon, då, når</em>. Småorda er dei orda hjernen hoppar over når du les fort.</li>
          </ol>
        </div>

        <p>Eit tips: Les teksten <strong>høgt</strong>, eller les setningane <strong>baklengs</strong> – siste
        setning først. Då sluttar hjernen å gjette kva som står der, og du ser det som faktisk står.</p>

        <h3>Sjekkliste: dei vanlegaste feila</h3>
        <table>
          <thead><tr><th>Feiltype</th><th>Feil</th><th>Rett</th></tr></thead>
          <tbody>
            <tr><td>-et i fortid</td><td><em class="bm">kastet, snakket</em></td><td><em class="nn">kasta, snakka</em></td></tr>
            <tr><td>-er på sterke verb</td><td><em class="bm">kommer, finner</em></td><td><em class="nn">kjem, finn</em></td></tr>
            <tr><td>Hokjønn på -en</td><td><em class="bm">boken, døren</em></td><td><em class="nn">boka, døra</em></td></tr>
            <tr><td>Inkjekjønn på -ene</td><td><em class="bm">husene, barnene</em></td><td><em class="nn">husa, barna</em></td></tr>
            <tr><td>Bokmålsord</td><td><em class="bm">ikke, bare, hva, jeg, hun, noe, samme</em></td><td><em class="nn">ikkje, berre, kva, eg, ho, noko, same</em></td></tr>
            <tr><td>de / dei / dykk</td><td><em class="bm">Dei må skunde dykk</em></td><td><em class="nn">De må skunde dykk</em> (de = subjekt, dykk = objekt, dei = «dei andre»)</td></tr>
            <tr><td>noko / nokon</td><td><em class="bm">nokon å drikke, noko pengar</em></td><td><em class="nn">noko å drikke, nokre pengar</em> (noko = ting, nokon = person)</td></tr>
            <tr><td>då / når</td><td><em class="bm">Når eg vakna i går</em></td><td><em class="nn">Då eg vakna i går</em> (då = éin gong i fortid, når = kvar gong / framtid)</td></tr>
            <tr><td>kvar / kor</td><td><em class="bm">Kvar mange kjem?</em></td><td><em class="nn">Kor mange kjem?</em> (kvar = stad, kor = grad)</td></tr>
            <tr><td>Possessiv</td><td><em class="bm">boka hennes, huset deres</em></td><td><em class="nn">boka hennar, huset deira</em></td></tr>
            <tr><td>S-passiv</td><td><em class="bm">Maten lagast på kjøkkenet</em></td><td><em class="nn">Maten blir laga på kjøkkenet</em> (s-passiv berre etter kan/skal/må)</td></tr>
            <tr><td>S-genitiv</td><td><em class="bm">skulens rektor</em></td><td><em class="nn">rektoren på skulen, skulen sin rektor</em></td></tr>
            <tr><td>Særskriving</td><td><em class="bm">fot ball, skule veske</em></td><td><em class="nn">fotball, skuleveske</em></td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Slik gjer du oppgåvene her:</strong> Klikk på eit ord du meiner er feil, skriv rett form i feltet
          som dukkar opp, og trykk «Sjekk svar» når du har funne alle. Tekstane blir lengre og feila vanskelegare
          for kvar oppgåve. Ver nøyaktig: alle ord som ikkje er feil, er korrekt nynorsk.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "findError",
      title: "Tekst 1: Dagboknotat",
      question: "Eit dagboknotat. Her er det <strong>5 feil</strong>: bøyingsfeil og bokmålsord. Klikk på feila og skriv rett form.",
      text: "Kjære dagbok! I dag var den verste dagen på lenge. Eg vakna for seint, hoppet over frukosten og sprang til bussen, men han køyrde rett forbi meg. Då eg endeleg kom fram til skulen, hadde klassa alt byrja på prøven i matte. Læraren såg strengt på meg, men sa ikke noko. Etterpå snakket eg med Sara i friminuttet, og ho lo så ho grein. No ligg eg i sengen og håpar at morgondagen blir betre.",
      errors: [
        { token: "hoppet", accept: ["hoppa"] },
        { token: "prøven", accept: ["prøva"] },
        { token: "ikke", accept: ["ikkje"] },
        { token: "snakket", accept: ["snakka"] },
        { token: "sengen", accept: ["senga"] },
      ],
      explanation: "A-verb får -a i preteritum: hoppa, snakka. Hokjønnsord får -a i bestemt form eintal: prøva, senga. Og «ikke» heiter «ikkje».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      title: "Tekst 2: Melding til ein ven",
      question: "Ei melding til ein ven. Det er <strong>6 feil</strong>. No må du òg sjå etter småord: de/dei og noko/nokon.",
      text: "Hei Jonas! Er du heime i kveld? Eg og Mia tenkte å dra på kino, og vi lurte på om du og bror din vil vere med. Filmen startar halv åtte, så dei må vere ved kinoen seinast klokka sju. Eg har alt kjøpt billettene, så de treng ikkje tenkje på det. Har du noko pengar til popkorn? Eg har bare femti kroner sjølv, for eg gløymde lommeboka mi heime i går, og mor mi blei skikkeleg irritert. Hun sa at eg må skjerpe meg. Svar så fort du kan! Vi kommer ikkje til å vente om du er sein. Klem, Emma",
      errors: [
        { token: "dei", accept: ["de"] },
        { token: "billettene", accept: ["billettane"] },
        { token: "noko", accept: ["nokre", "nokon"] },
        { token: "Hun", accept: ["Ho"] },
        { token: "kommer", accept: ["kjem"] },
        { token: "bare", accept: ["berre"] },
      ],
      explanation: "Emma snakkar til Jonas og broren, altså «de» (subjekt i 2. person fleirtal), ikkje «dei». Billett er hankjønn: billettane. Pengar er fleirtal, så det heiter «nokre pengar» (eller «nokon pengar» i spørsmål) – «noko» brukar vi berre om ting i eintal, som «noko mat». «Hun» heiter «ho». Sterke verb har inga -er-ending i presens: kjem. Og «bare» heiter «berre».",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      title: "Tekst 3: Nyheitssak frå skuleavisa",
      question: "Ei kort nyheitssak frå skuleavisa. Det er <strong>7 feil</strong>. Sjå etter då/når, kvar/kor og possessiv i tillegg til det du har trena på.",
      text: "Elevrådet vann kampen om lengre friminutt\n\nEtter fleire månader med diskusjon har rektor endeleg sagt ja: Frå neste veke får elevene ved Fjellheim ungdomsskule ti minutt lengre storefri.\n\n«Vi er kjempenøgde», seier elevrådsleiar Aisha Khan (15). Ho fortel at elevrådet samlet inn over to hundre underskrifter når dei starta aksjonen i haust. Mange elevar meinte at storefri var for kort til å rekkje både mat og frisk luft.\n\nRektor Per Nesheim seier at han var skeptisk i byrjinga, men at argumentene til elevane overtydde han. «Eg veit ikkje kvar mange som har klaga på dette», seier han. Også lærarane deres har støtta saken. Kvar dei ekstra minutta skal hentast frå, er enno ikkje avgjort, men elevane håpar at skuledagen ikkje blir lengre.\n\n«Dette viser at det nyttar å seie ifrå», seier Aisha.",
      errors: [
        { token: "elevene", accept: ["elevane"] },
        { token: "samlet", accept: ["samla"] },
        { token: "når", accept: ["då"] },
        { token: "argumentene", accept: ["argumenta"] },
        { token: "kvar", accept: ["kor"] },
        { token: "deres", accept: ["deira"] },
        { token: "saken", accept: ["saka"] },
      ],
      explanation: "Hankjønn: elevane. A-verb: samla. «Då dei starta aksjonen» – det skjedde éin gong i fortida, så det heiter «då», ikkje «når». Inkjekjønn i bestemt fleirtal: argumenta. «Kor mange» – kor brukar vi om grad og mengd, kvar om stad (legg merke til at «Kvar dei ekstra minutta skal hentast frå» er rett!). Possessiv i fleirtal: deira. Hokjønn: saka.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      title: "Tekst 4: Lesarinnlegg",
      question: "Eit lesarinnlegg. Det er <strong>8 feil</strong>. No kjem òg s-passiv og s-genitiv inn. Hugs at rettinga kan vere fleire ord, til dømes «blir laga» eller «kommunen sitt».",
      text: "Gi oss ei kantine som er verd namnet!\n\nKvar dag står over tre hundre elevar i kø for å kjøpe mat i kantina vår. Utvalet er det same året rundt: tørre rundstykke, ein pastasalat som ingen vil ha, og ei sjokolademjølk som stort sett er utseld før klokka elleve. Maten lagast ikkje på skulen, men blir levert i plastboksar frå ein fabrikk to mil unna.\n\nVi ber berre om varm mat eit par dagar i veka, litt frukt og priser som ein vanleg fjortenåring har råd til. Rektor seier at kommunens budsjett ikkje rekk til, men i fjor ble det brukt hundre tusen kroner på nye skilt til parkeringsplassen. Kva er viktigast: at bilene står rett, eller at elevane får i seg noko som helst?\n\nVi har spurt rektor mange gonger, men får alltid det samme svaret. Kvar veke kommer det nye lovnader, og ingenting skjer. Vi er sju timar om dagen på skulen, og då må vi kunne vente at nokon tek lunsjen på alvor. Skuleleiinga burde lytte til dem det gjeld.\n\nSint niandeklassing",
      errors: [
        { token: "lagast", accept: ["blir laga", "vert laga"] },
        { token: "priser", accept: ["prisar"] },
        { token: "kommunens", accept: ["kommunen sitt"] },
        { token: "ble", accept: ["blei", "vart"] },
        { token: "bilene", accept: ["bilane"] },
        { token: "samme", accept: ["same"] },
        { token: "kommer", accept: ["kjem"] },
        { token: "dem", accept: ["dei"] },
      ],
      explanation: "S-passiv brukar vi berre etter modale hjelpeverb (kan lagast, skal lagast). Elles skriv vi «blir laga» eller «vert laga». S-genitiv finst ikkje på nynorsk: «kommunen sitt budsjett» (eller «budsjettet til kommunen»). Hankjønn: prisar, bilane. Preteritum av bli: blei eller vart. «Samme» heiter «same», «kommer» heiter «kjem», og «dem» heiter «dei» – nynorsk har same form i subjekt og objekt.",
    },
    {
      type: "exercise",
      exerciseType: "findError",
      title: "Tekst 5: Utdrag av ei forteljing",
      question: "Eit utdrag av ei forteljing. Det er <strong>10 feil</strong>, og alle feiltypane er med. Ein av feila er ei særskriving: klikk då på det <strong>første</strong> ordet og skriv heile det samansette ordet i feltet. Eitt av feilorda står fleire gonger i teksten – berre éin av gongene er det feil.",
      text: "Det var alt mørkt då Nora og Sam kom fram til det gamle naustet. Regnet hadde slutta, men vinden reiv i takplatene, og sjøen slo mot steinane nedanfor. Nora fann fram lomme lykta og lyste inn gjennom sprekken i døra.\n\n«Ser du noko?» kviskra Sam.\n\n«Berre gamle garn og ei bøtte», sa ho. «Og … vent litt.» Lyset stoppet på noko blankt inst i kroken. Ei kiste. Ho var ikkje stor, men låsen glinsa som om nokon nyleg hadde pussa han. Låsen brukast tydelegvis framleis.\n\nSam trakk pusten. «Vi kan ikkje berre gå inn. Dette er Halvorsens naust.»\n\n«Halvorsen har vore død i tre år», sa Nora og dytta opp døra. Ho stoppa brått. På golvet låg det ferske fotspor, og dei var større enn hennes eigne. Nokon hadde vore her, kanskje for berre noen minutt sidan.\n\nBak dei knirka trinnene i trappa.\n\n«Hva var det?» kviskra Sam.\n\nNora snudde seg så fort at lykta datt i golvet og slokna. I mørkret høyrde dei ei stemme dei ikkje kjende igjen.\n\n«Så de fann fram likevel», sa stemma roleg. «Eg lurte på når dei kom til å dukke opp.»",
      errors: [
        { token: "lomme", accept: ["lommelykta"] },
        { token: "stoppet", accept: ["stoppa"] },
        { token: "brukast", accept: ["blir brukt", "vert brukt"] },
        { token: "trakk", accept: ["trekte", "drog"] },
        { token: "Halvorsens", accept: ["Halvorsen sitt"] },
        { token: "hennes", accept: ["hennar"] },
        { token: "noen", accept: ["nokre", "nokon"] },
        { token: "trinnene", accept: ["trinna"] },
        { token: "Hva", accept: ["Kva"] },
        { token: "dei", accept: ["de"], nth: 5 },
      ],
      explanation: "Særskriving: «lomme lykta» skal vere eitt ord, lommelykta. A-verb: stoppa. S-passiv utan modalt hjelpeverb er feil: «blir brukt» / «vert brukt». «Trekkje» er eit e-verb med preteritum «trekte» (ein kan òg seie «drog pusten»). S-genitiv finst ikkje: «Halvorsen sitt naust» (eller «naustet til Halvorsen»). Possessiv: hennar. «Noen» heiter «nokre» (eller «nokon» i fleirtal). Inkjekjønn i bestemt fleirtal: trinna. «Hva» heiter «kva». Og i den siste replikken snakkar stemma til Nora og Sam, så det skal vere «de kom til å dukke opp» – dei andre gongene «dei» står i teksten, tyder det «dei andre» og er rett.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Rett din eigen tekst",
      question: "Hent fram ein nynorsktekst du har skrive tidlegare (ein tekst frå ei prøve, ei innlevering eller eit utkast). Har du ingen, skriv ein ny tekst på minst 100 ord om ein dag du hugsar godt. Les så teksten tre gonger slik leksjonen forklarer: éin gong for innhald, éin gong for endingar og éin gong for småord. Bruk sjekklista. Skriv til slutt ei kort oppsummering: Kva feil fann du, kor mange var det av kvar type, og kva for éin feiltype bør du passe ekstra på framover?",
      minWords: 80,
      checklist: [
        "Eg har lese teksten tre gonger, med kvart sitt fokus (innhald, endingar, småord).",
        "Ingen verb i fortid endar på -et, og ingen sterke verb i presens endar på -er.",
        "Hokjønnsord i bestemt eintal og inkjekjønnsord i bestemt fleirtal endar på -a.",
        "Eg har sjekka småorda: ikkje, berre, kva, eg, ho, de/dei/dykk, noko/nokon, då/når, kvar/kor.",
        "Ingen s-passiv utan modalt hjelpeverb, ingen s-genitiv, og alle samansette ord er skrivne i eitt.",
      ],
    },
  ],
});
