/* Lærarinnhald for Del 2 · Mengdetrening. Formatet står i larer/README.md.
   Tavleøvingane (type "drill") brukar same spesifikasjon som drill-seksjonane i
   js/content/part2-trening.js, så klassen øver på dei same oppgåvene som i modulen. */

Larar.register("trening-substantiv", {
  tittelnotat: "Ei kort og intensiv økt: vi repeterer mønstera for dei tre kjønna og øver saman på tavla før elevane trenar sjølve. Sei det høgt: målet er ikkje å lære noko nytt, men å få formene til å sitje så godt at dei kjem av seg sjølv når vi skriv.",
  slides: [
    {
      title: "I dag trenar vi",
      body: `<ul class="stor">
        <li>kjønn: <em class="nn">ein, ei, eit</em></li>
        <li>bestemt form eintal</li>
        <li>ubestemt og bestemt fleirtal</li>
        <li>hokjønn og inkjekjønn, der feila skjer</li>
      </ul>`,
      notes: "Fortel at økta er bygd som ei treningsøkt: kort oppvarming, mange repetisjonar i fellesskap og så eigentrening med oppgåver på tavla. Elevane treng skrivebok, og gjerne ei mini-tavle eller eit ark til dei skriftlege rundane.",
    },
    {
      type: "diskuter",
      title: "Kva er gale?",
      prompt: `<p class="stor"><em class="bm">Jenten</em> las <em class="bm">boken</em> i eit av <em class="bm">husene</em>.</p>
        <p>Rett setninga til nynorsk. Kvifor trur du så mange skriv slik?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">Jenta las boka i eit av husa.</em> Bokmål brukar ofte <em class=\"bm\">-en</em> på hokjønnsord og <em class=\"bm\">-ene</em> på inkjekjønn i fleirtal. Nynorsk har <em class=\"nn\">-a</em> på begge stadene.",
      notes: "Lat elevane forklare kvifor feila kjem: dei fleste les og høyrer mest bokmål, og bokmål kan bruke hankjønnsendingar på hokjønnsord. Poenget er at <em>-a</em> er ei nøkkelending på nynorsk: <em>jenta, boka</em> i eintal og <em>husa</em> i fleirtal.",
    },
    {
      title: "Tre kjønn, tre mønster",
      body: `<div class="kjonnkort">
          <div class="kort han"><span class="artikkel">ein</span><span class="ord">gut</span><span class="former">guten · gutar · gutane</span></div>
          <div class="kort ho"><span class="artikkel">ei</span><span class="ord">jente</span><span class="former">jenta · jenter · jentene</span></div>
          <div class="kort inkje"><span class="artikkel">eit</span><span class="ord">hus</span><span class="former">huset · hus · husa</span></div>
        </div>`,
      steps: [
        "<p class=\"midt stor\">hankjønn <strong>-en, -ar, -ane</strong> · hokjønn <strong>-a, -er, -ene</strong> · inkjekjønn <strong>-et, inga ending, -a</strong></p>",
      ],
      notes: "Les rekkjene høgt i kor, gjerne to gonger: «ein gut, guten, gutar, gutane». Rytmen hjelper. Minn om at kjønnet sjeldan kan sjåast på ordet, så det må lærast saman med ordet, eller slåast opp i Nynorskordboka.",
    },
    {
      type: "drill",
      title: "Kva kjønn har ordet?",
      intro: "Vis svaret med fingrane: éin finger for <em class=\"nn\">ein</em>, to for <em class=\"nn\">ei</em>, tre for <em class=\"nn\">eit</em>.",
      spec: { bank: "nouns", tasks: ["gender"], mode: "choice" },
      n: 8,
      notes: "Tel til tre, og så viser alle samtidig. Då ser du raskt kven som er usikre, og ingen kan kopiere sidemannen. Er klassen delt, spør: kva seier du i dialekten din? Mange dialektar har tre kjønn, og det hjelper.",
    },
    {
      type: "sporsmal",
      question: "Kva er bestemt form fleirtal av <em class=\"nn\">eit hus</em>?",
      options: ["<em>husene</em>", "<em>husa</em>", "<em>husan</em>", "<em>husar</em>"],
      correct: 1,
      explain: "Inkjekjønnsord får <em class=\"nn\">-a</em> i bestemt form fleirtal: <em class=\"nn\">husa, epla, åra</em>. <em class=\"bm\">husene</em> er bokmål.",
      notes: "Dette er truleg den vanlegaste substantivfeilen på nynorsk. Spør etterpå: kva andre ord kjenner de som følgjer same mønster? Til dømes <em>eit år, åra</em> og <em>eit tak, taka</em>.",
    },
    {
      type: "drill",
      title: "Bestemt form eintal",
      intro: "Skriv på mini-tavla eller arket. Alle held opp samtidig.",
      spec: { bank: "nouns", tasks: ["defSg"], mode: "type" },
      n: 6,
      notes: "Skriftleg runde: elevane skriv svaret og held det opp når du seier «no». Sjå etter <em>-en</em> på hokjønnsord. Ser du det, stopp opp og spør: kva kjønn har ordet? Då finn dei ofte feilen sjølve.",
    },
    {
      title: "Fleirtal: tre endingar",
      steps: [
        "<p class=\"stor\">Hankjønn: <em class=\"nn\">gutar</em> → <em class=\"nn\">gutane</em></p>",
        "<p class=\"stor\">Hokjønn: <em class=\"nn\">jenter</em> → <em class=\"nn\">jentene</em></p>",
        "<p class=\"stor\">Inkjekjønn: <em class=\"nn\">hus</em> → <em class=\"nn\">husa</em></p>",
        "<p class=\"midt\">Inkjekjønn har <strong>inga ending</strong> i ubestemt fleirtal: <em class=\"nn\">mange hus, mange eple</em>.</p>",
      ],
      notes: "Peik på at hankjønn har <em>a</em> i endingane og hokjønn har <em>e</em>. Hugseregel: <em>-ar, -ane</em> for han, <em>-er, -ene</em> for ho. Nokre ord er uregelrette, til dømes <em>ein mann, menn</em> og <em>ein fot, føter</em>. Dei kjem i tavleøvinga og blir forklarte der.",
    },
    {
      type: "drill",
      title: "Ubestemt form fleirtal",
      intro: "Mange … Skriv forma på mini-tavla.",
      spec: { bank: "nouns", tasks: ["indefPl"], mode: "type" },
      n: 6,
      notes: "Når eit uregelrett ord dukkar opp, les forklaringa på kortet høgt. Spør om nokon kjenner fleire ord med vokalskifte i fleirtal.",
    },
    {
      type: "drill",
      title: "Bestemt form fleirtal",
      intro: "Alle … Lag mot lag: rett svar gir poeng til laget.",
      spec: { bank: "nouns", tasks: ["defPl"], mode: "type" },
      n: 6,
      notes: "Del klassen i to lag. Laga svarer annankvar gong, og laget får eitt forsøk etter å ha rådført seg i ti sekund. Svarer laget feil, kan det andre laget stele poenget.",
    },
    {
      title: "Hokjønn: her går det oftast gale",
      steps: [
        "<p class=\"stor\">Bestemt eintal på <strong>-a</strong>: <em class=\"nn\">boka, sola, døra</em></p>",
        "<p class=\"stor\">Omlyd i fleirtal: <em class=\"nn\">bok → bøker, hand → hender, natt → netter</em></p>",
        "<p class=\"stor\">Nokre får <strong>-ar</strong>: <em class=\"nn\">elv → elvar, øy → øyar</em></p>",
      ],
      notes: "Omlyd betyr at vokalen skifter. Elevane kjenner fenomenet frå engelsk <em>foot, feet</em>. Hokjønnsorda med <em>-ar</em> i fleirtal er få, men dei kjem i øvinga. Minn om at <em class=\"bm\">boken</em> og <em class=\"bm\">solen</em> alltid er feil på nynorsk.",
    },
    {
      type: "drill",
      title: "Berre hokjønnsord",
      intro: "Bestemt eintal, ubestemt fleirtal og bestemt fleirtal om kvarandre.",
      spec: { bank: "nouns", filter: { g: ["f"] }, tasks: ["defSg", "indefPl", "defPl"], mode: "mixed" },
      n: 8,
      notes: "Når kortet har alternativ, kan klassen stemme med tommel opp eller ned for kvart alternativ du peikar på. Når det ikkje har alternativ, spør du ein elev om gongen.",
    },
    {
      type: "drill",
      title: "Inkjekjønn i fleirtal",
      intro: "Inga ending i ubestemt fleirtal, <em class=\"nn\">-a</em> i bestemt fleirtal.",
      spec: { bank: "nouns", filter: { g: ["n"] }, tasks: ["indefPl", "defPl"], mode: "mixed" },
      n: 6,
      notes: "Lat klassen seie svaret i kor. Høyrer du <em>-ene</em> nokon stad, ta oppgåva ein gong til. Legg merke til ord som sluttar på <em>-e</em>: <em>eit eple, fleire eple, epla</em>.",
    },
    {
      type: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter ordet på nynorsk?",
      spec: { bank: "nouns", tasks: ["fromBm"], mode: "mixed" },
      n: 6,
      notes: "Desse orda er ulike på dei to skriftspråka: <em>vatn, namn, auge, veke, skule</em>. Spør etter kvart ord: kjenner nokon ordet frå dialekten sin? Det er ofte der nynorskforma kjem frå.",
    },
    {
      type: "oppgave",
      title: "1. Kjønn og bestemt form",
      body: `<p>Skriv ordet med <em class="nn">ein, ei</em> eller <em class="nn">eit</em>, og så i bestemt form eintal.<br><span class="liten">Døme: <em class="nn">gut</em> → <em class="nn">ein gut, guten</em></span></p>
        <div class="to-kol stor">
          <ol><li>bok</li><li>hus</li><li>skule</li><li>jente</li><li>eple</li></ol>
          <ol start="6"><li>veke</li><li>hage</li><li>vindauge</li><li>natt</li><li>tre</li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 ei bok, boka · 2 eit hus, huset · 3 ein skule, skulen · 4 ei jente, jenta · 5 eit eple, eplet · 6 ei veke, veka · 7 ein hage, hagen · 8 eit vindauge, vindauget · 9 ei natt, natta · 10 eit tre, treet",
      notes: "Elevane skriv i skriveboka og rettar sjølve med ein annan farge når fasiten kjem. Be dei setje ring rundt dei orda dei bomma på: det blir ordlista deira til avslutninga. Sjå særleg etter <em class=\"bm\">boken, uken</em> og <em class=\"bm\">natten</em>.",
    },
    {
      type: "oppgave",
      title: "2. Fleirtal",
      body: `<p>Skriv ubestemt og bestemt fleirtal: <em class="nn">mange …, alle …</em><br><span class="liten">Døme: <em class="nn">ein gut</em> → <em class="nn">gutar, gutane</em></span></p>
        <div class="to-kol stor">
          <ol><li>ein bil</li><li>ei klokke</li><li>eit år</li><li>ei hand</li><li>ein fot</li></ol>
          <ol start="6"><li>eit brev</li><li>ei øy</li><li>ei tann</li><li>eit bilete</li><li>ein bonde</li></ol>
        </div>`,
      form: "Åleine",
      tid: 6,
      svar: "1 bilar, bilane · 2 klokker, klokkene · 3 år, åra · 4 hender, hendene · 5 føter, føtene · 6 brev, breva · 7 øyar, øyane · 8 tenner, tennene · 9 bilete, bileta · 10 bønder, bøndene",
      notes: "Her kjem alle tre mønstera og nokre uregelrette ord. Når fasiten kjem, spør: kva ord har vokalskifte? (<em>hender, føter, tenner, bønder</em>). Og kva hokjønnsord får <em>-ar</em>? (<em>øyar</em>). Inkjekjønnsorda <em>år, brev, bilete</em> har inga ending i ubestemt fleirtal.",
    },
    {
      type: "oppgave",
      title: "3. Rett substantiva",
      body: `<p>Substantiva står på bokmål. Skriv setningane rett på nynorsk.</p>
        <ol>
          <li>Boken ligg på bordet.</li>
          <li>Husene i byen er gamle.</li>
          <li>Klokken er snart tolv.</li>
          <li>Skolen ligg ved elven.</li>
          <li>Barna åt eplene.</li>
          <li>Vi las navnene på brevene.</li>
        </ol>`,
      form: "Åleine, så samanlikn med sidemannen",
      tid: 5,
      svar: "1 <em class=\"nn\">Boka</em> ligg på bordet. 2 <em class=\"nn\">Husa</em> i byen er gamle. 3 <em class=\"nn\">Klokka</em> er snart tolv. 4 <em class=\"nn\">Skulen</em> ligg ved <em class=\"nn\">elva</em>. 5 Barna åt <em class=\"nn\">epla</em>. 6 Vi las <em class=\"nn\">namna</em> på <em class=\"nn\">breva</em>.",
      notes: "Oppgåva trenar dei to vanlegaste feila: <em>-en</em> på hokjønnsord og <em>-ene</em> på inkjekjønn i fleirtal. I tillegg er <em>skule</em> og <em>namn</em> ulike ord på dei to skriftspråka. Er det tid til overs, kan elevane skrive tre eigne setningar med hokjønnsord i bestemt form.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Hokjønn: <em class=\"nn\">jenta, boka</em>, aldri <em class=\"bm\">-en</em></p>",
        "<p class=\"stor\">Inkjekjønn fleirtal: <em class=\"nn\">hus → husa</em>, aldri <em class=\"bm\">-ene</em></p>",
        "<p class=\"stor\">Usikker på kjønnet? Slå opp i <strong>Nynorskordboka</strong>.</p>",
      ],
      notes: "Spør klassen: kva ord bomma du på i dag? Lat to eller tre elevar seie eitt ord kvar, og skriv dei på tavla. Det er ordlista de tek med til neste skrivetime.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Ei kort treningsøkt der klassen repeterer bøyingsmønstera for substantiv og øver saman på tavla før elevane løyser oppgåver i skriveboka. Tavleøvingane trekkjer ord frå ordbanken i kurset, så klassen får nye ord kvar gong, og oppgåvelysbileta har fasit som elevane rettar etter. Heile økta kan gjennomførast utan PC. Økta passar som oppvarming før ein skrivetime eller som repetisjon etter modulen Substantiv: kjønn og bøying.</p>",
    mal: [
      "Elevane kan velje rett artikkel (<em class=\"nn\">ein, ei, eit</em>) for vanlege substantiv.",
      "Elevane kan bøye substantiv i alle tre kjønn i bestemt eintal og i fleirtal.",
      "Elevane unngår dei vanlegaste bokmålsformene: <em class=\"bm\">-en</em> på hokjønnsord og <em class=\"bm\">-ene</em> på inkjekjønn i fleirtal.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør ha gått gjennom modulen Substantiv: kjønn og bøying, eller i alle fall kjenne omgrepa kjønn, eintal, fleirtal og bestemt form.",
    forebuing: [
      "Test tavleøvingane på førehand, og legg merke til at knappen «Nye oppgåver» gir nye ord.",
      "Ha mini-tavler, ark eller lappar klare til dei skriftlege rundane.",
      "Bestem korleis du deler klassen i to lag til lysbilete 10.",
      "Sjå til at elevane har skrivebok og ein penn i ein annan farge til å rette med.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom målet for økta og la elevane rette bokmålssetninga i par.</p>", lysbilete: "2 og 3" },
      { fase: "Kjønn og bestemt form", min: 7, gjer: "<p>Repeter mønstera i kor, ta fingerrunden om kjønn, spørsmålet om <em class=\"nn\">husa</em> og ein skriftleg runde på mini-tavler.</p>", lysbilete: "4 til 7" },
      { fase: "Fleirtal", min: 6, gjer: "<p>Vis dei tre fleirtalsendingane og ta ein skriftleg runde og ein lagkonkurranse.</p>", lysbilete: "8 til 10" },
      { fase: "Hokjønn og inkjekjønn", min: 6, gjer: "<p>Repeter <em class=\"nn\">-a</em> og omlyd, og ta tavlerundane om hokjønn, inkjekjønn og bokmålsord.</p>", lysbilete: "11 til 14" },
      { fase: "Eigentrening", min: 19, gjer: "<p>Elevane løyser tre oppgåver i skriveboka: kjønn og bestemt form, fleirtal og retting av bokmålsformer. Vis fasiten etter kvar oppgåve, og la elevane rette sjølve og setje ring rundt orda dei bomma på.</p>", lysbilete: "15 til 17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og samle ordlista med dei orda klassen bomma på.</p>", lysbilete: "18" },
    ],
    misoppfatningar: [
      { feil: "«Jenten, boken, solen.»", hjelp: "Hokjønnsord får <em class=\"nn\">-a</em> i bestemt eintal på nynorsk. Bruk kjønnskortet: <em class=\"nn\">ei jente, jenta</em>." },
      { feil: "«Husene, eplene, årene.»", hjelp: "Inkjekjønn har <em class=\"nn\">-a</em> i bestemt fleirtal: <em class=\"nn\">husa, epla, åra</em>. Lat elevane seie rekkja <em class=\"nn\">eit hus, huset, hus, husa</em> høgt." },
      { feil: "«Mange husar» eller «mange huser».", hjelp: "Inkjekjønnsord har inga ending i ubestemt fleirtal: <em class=\"nn\">mange hus, mange eple</em>." },
      { feil: "«Alle bokene.»", hjelp: "Nokre hokjønnsord skifter vokal i fleirtal: <em class=\"nn\">bøker, bøkene</em>. Samanlikn med engelsk <em>foot, feet</em>." },
    ],
    samtale: [
      "Kvifor trur du hokjønnsorda er dei som oftast blir skrivne feil?",
      "Har dialekten din tre kjønn? Hjelper det deg når du skriv nynorsk?",
      "Kva gjer du når du ikkje veit kva kjønn eit ord har?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane kjønnskortet frå lysbilete 4 som huskelapp under eigentreninga.",
        "La elevar som skriv seint, gjere berre dei fem første orda i oppgåve 1 og 2.",
        "Bruk fleirvalsrundane (tommel eller fingrar) meir enn dei skriftlege for elevar som skriv seint.",
      ],
      utfordring: [
        "La elevane som blir tidleg ferdige, skrive fem eigne setningar med hokjønnsord og inkjekjønnsord i bestemt fleirtal.",
        "La elevane finne fem uregelrette substantiv i Nynorskordboka og lage ei tavleoppgåve til klassen.",
      ],
    },
    vurdering: [
      "Fingerrunden og mini-tavlene viser raskt kva kjønn og former klassen er usikker på.",
      "Skrivebøkene viser kva ord kvar elev bomma på. Be elevane telje feila i kvar oppgåve, eller sjå over eit utval bøker etter timen.",
      "Kjenneteikn på god måloppnåing: eleven bøyer også hokjønns- og inkjekjønnsord rett i eigne tekstar, ikkje berre i øvingane.",
    ],
    vidare: "Følg opp med treningsøktene i verb og adjektiv, og bruk blandingsøkta som oppvarming før neste skrivetime. Ordlista frå avslutninga kan hengast opp i klasserommet. Mengdetreninga Substantiv: kjønn og bøying i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});

Larar.register("trening-verb", {
  tittelnotat: "Verb er der flest nynorskfeil skjer, og der mengdetrening hjelper mest. I dag repeterer vi dei fem verbgruppene og øver i fellesskap, gruppe for gruppe, før elevane trenar sjølve. Sei gjerne at målet er å høyre når ei form er feil, slik vi høyrer det på engelsk.",
  slides: [
    {
      title: "I dag trenar vi",
      body: `<ul class="stor">
        <li>kva slags verb det er</li>
        <li>a-verb og e-verb i preteritum</li>
        <li>presens utan bokmålsendingar</li>
        <li>sterke verb med vokalskifte</li>
      </ul>`,
      notes: "Gå raskt gjennom planen. Minn om dei tre tidene vi øver på: presens (i dag), preteritum (i går) og perfektum (har). Elevane treng mini-tavle eller ark.",
    },
    {
      type: "diskuter",
      title: "Kvifor skriv vi feil?",
      prompt: `<p class="stor">I går <em class="bm">kastet</em> ho ballen, og no <em class="bm">spiser</em> ho.</p>
        <p>Rett til nynorsk. Kvifor trur du mange skriv slik?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">I går kasta ho ballen, og no et ho.</em> <em class=\"bm\">kastet</em> er bokmålsendinga for a-verb, og <em class=\"bm\">spise</em> heiter <em class=\"nn\">ete</em> på nynorsk: <em class=\"nn\">et, åt, har ete</em>.",
      notes: "Mange skriv slik fordi dei tenkjer på bokmål og omset ord for ord. Få fram at det er to ulike feil: ei feil ending og eit ord som heiter noko anna. Begge typane kjem i tavleøvingane.",
    },
    {
      title: "Fem verbgrupper",
      body: `<table>
          <thead><tr><th>Gruppe</th><th>Presens</th><th>Preteritum</th><th>Perfektum</th></tr></thead>
          <tbody>
            <tr><td>a-verb</td><td><em class="nn">kastar</em></td><td><em class="nn">kasta</em></td><td><em class="nn">har kasta</em></td></tr>
            <tr><td>e-verb</td><td><em class="nn">høyrer</em></td><td><em class="nn">høyrde</em></td><td><em class="nn">har høyrt</em></td></tr>
            <tr><td>j-verb</td><td><em class="nn">spør</em></td><td><em class="nn">spurde</em></td><td><em class="nn">har spurt</em></td></tr>
            <tr><td>kortverb</td><td><em class="nn">bur</em></td><td><em class="nn">budde</em></td><td><em class="nn">har budd</em></td></tr>
            <tr><td>sterke verb</td><td><em class="nn">skriv</em></td><td><em class="nn">skreiv</em></td><td><em class="nn">har skrive</em></td></tr>
          </tbody>
        </table>`,
      notes: "Les tabellen høgt i kor, rad for rad. Peik på at dei fire første gruppene er svake verb: dei får ei ending i preteritum. Sterke verb skifter vokal i staden. I tillegg finst ei lita gruppe uregelrette verb, som <em>seie, sa, har sagt</em> og <em>gjere, gjorde, har gjort</em>.",
    },
    {
      title: "Knepet: sjå på preteritum",
      steps: [
        "<p class=\"stor\">Bokmål <em class=\"bm\">kastet</em> → a-verb: <em class=\"nn\">kasta</em></p>",
        "<p class=\"stor\">Bokmål <em class=\"bm\">kjøpte, hørte</em> → oftast e-verb: <em class=\"nn\">kjøpte, høyrde</em></p>",
        "<p class=\"stor\">Vokalen skifter: <em class=\"nn\">skriv → skreiv</em> → sterkt verb</p>",
        "<p class=\"midt\">Preteritum på nynorsk endar aldri på <em class=\"bm\">-et</em>.</p>",
      ],
      notes: "Knepet er eit hjelpemiddel, ikkje ein lov. Nokre verb som har <em class=\"bm\">-te</em> på bokmål, er j-verb på nynorsk: <em class=\"bm\">spurte</em> blir <em class=\"nn\">spurde</em>, <em class=\"bm\">solgte</em> blir <em class=\"nn\">selde</em>. Er elevane usikre, er ordboka det sikraste.",
    },
    {
      type: "drill",
      title: "Kva slags verb er det?",
      intro: "Tenk på preteritum. Vis svaret med fingrane når alternativa står på tavla.",
      spec: { bank: "verbs", tasks: ["cls"], mode: "choice" },
      n: 6,
      notes: "Les alternativa høgt og nummerer dei frå éin til fire. Alle viser svaret med fingrane samtidig. Spør ein elev som svara rett: kva form i preteritum tenkte du på?",
    },
    {
      type: "drill",
      title: "A-verb i preteritum",
      intro: "Skriv preteritum på mini-tavla. Aldri <em class=\"bm\">-et</em>!",
      spec: { bank: "verbs", filter: { cls: ["a"] }, tasks: ["pret"], mode: "type" },
      n: 6,
      notes: "Denne runden skal gå fort, for alle a-verb følgjer same mønster. Poenget er å drille bort <em class=\"bm\">-et</em>. Ser du det på ei tavle, be eleven lese forma høgt: <em>kasta</em> høyrest rett ut, <em>kastet</em> gjer det ikkje.",
    },
    {
      type: "drill",
      title: "E-verb i preteritum og perfektum",
      intro: "Preteritum på <em class=\"nn\">-de</em> eller <em class=\"nn\">-te</em>, perfektum på <em class=\"nn\">-d</em> eller <em class=\"nn\">-t</em>.",
      spec: { bank: "verbs", filter: { cls: ["e"] }, tasks: ["pret", "perf"], mode: "type" },
      n: 6,
      notes: "Om verbet får <em>-de</em> eller <em>-te</em>, må ein ofte høyre seg fram til: <em>høyrde, levde</em> men <em>kjøpte, reiste</em>. Lat elevane seie forma høgt før dei skriv. I perfektum kan dei skrive med eller utan <em>har</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva er presens av <em class=\"nn\">å skrive</em>?",
      options: ["<em>skriver</em>", "<em>skriv</em>", "<em>skrivar</em>", "<em>skreiv</em>"],
      correct: 1,
      explain: "Sterke verb får inga ending i presens: <em class=\"nn\">skriv, finn, kjem, et</em>. <em class=\"bm\">skriver</em> er bokmål, og <em class=\"nn\">skreiv</em> er preteritum.",
      notes: "Spør kvifor så mange vel <em>skriver</em>. Svaret er at bokmål har <em>-er</em> i presens for nesten alle verb. På nynorsk har berre e-verba <em>-er</em>.",
    },
    {
      type: "drill",
      title: "Presens av svake verb",
      intro: "A-verb <em class=\"nn\">-ar</em>, e-verb <em class=\"nn\">-er</em>, dei fleste j-verb utan ending, kortverb <em class=\"nn\">-r</em>.",
      spec: { bank: "verbs", filter: { cls: ["a", "e", "j", "kort"] }, tasks: ["pres"], mode: "mixed" },
      n: 8,
      notes: "Tommel opp eller ned: peik på alternativa eitt og eitt, og klassen stemmer. Ta ein prat om j-verba: dei fleste mistar j-en og endinga (<em>spør, tel, set, vel</em>), men nokre held på han (<em>byggjer, følgjer</em>).",
    },
    {
      title: "Sterke verb: vokalen skifter",
      body: `<div class="vokalskifte" data-spel>
          <div class="vs-rad sterk"><span class="vs-namn">sterkt verb</span><span class="vs-form">skr<b>i</b>v</span><span class="vs-pil">→</span><span class="vs-form">skr<b>ei</b>v</span><span class="vs-pil">→</span><span class="vs-form">har skr<b>i</b>ve</span></div>
          <div class="vs-rad sterk"><span class="vs-namn"></span><span class="vs-form">f<b>i</b>nn</span><span class="vs-pil">→</span><span class="vs-form">f<b>a</b>nn</span><span class="vs-pil">→</span><span class="vs-form">har f<b>u</b>nne</span></div>
        </div>`,
      steps: [
        "<p>Presens: inga ending (<em class=\"nn\">kjem, skriv</em>), eller berre <strong>-r</strong> etter vokal (<em class=\"nn\">går, ser</em>)</p>",
        "<p>Preteritum: <strong>inga ending</strong>: <em class=\"nn\">skreiv, gjekk, åt</em></p>",
        "<p>Perfektum: oftast <strong>-e</strong>: <em class=\"nn\">har skrive, har funne</em>, men <em class=\"nn\">har gått, har sett</em></p>",
      ],
      notes: "Sterke verb må lærast utanåt, på same måte som «irregular verbs» på engelsk. Dei vanlegaste er også dei viktigaste: <em>vere, gå, kome, sjå, få, ta, gi, ete, skrive, finne</em>. Ta gjerne fire eller fem rekkjer høgt i kor.",
    },
    {
      type: "drill",
      title: "Sterke verb i preteritum",
      intro: "Lag mot lag: skriv forma, rådfør dykk i ti sekund.",
      spec: { bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pret"], mode: "type" },
      n: 8,
      notes: "Laga skriv svaret på kvar si tavle eller ark. Rett svar gir eitt poeng. Er begge laga rette, går poenget til laget som var raskast. Legg merke til at både <em>gav</em> og <em>ga</em>, <em>blei</em> og <em>vart</em> er rette.",
    },
    {
      type: "drill",
      title: "Sterke verb i presens og perfektum",
      intro: "Presens utan <em class=\"bm\">-er</em>, perfektum oftast på <em class=\"nn\">-e</em>.",
      spec: { bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pres", "perf"], mode: "mixed" },
      n: 6,
      notes: "Spør ein elev om gongen, og la resten seie «rett» eller «feil» før du viser svaret. Ta ekstra tid på verb som <em>kome</em>: <em>kjem, kom, har kome</em>. Både <em>kome</em> og <em>komme</em> er rette.",
    },
    {
      type: "drill",
      title: "J-verb, kortverb og uregelrette verb",
      intro: "Dei små gruppene som ofte blir gløymde.",
      spec: { bank: "verbs", filter: { cls: ["j", "kort", "u"] }, tasks: ["pres", "pret", "perf"], mode: "mixed" },
      n: 6,
      notes: "Mange av desse er svært vanlege: <em>seie, gjere, vite, ha, bu, tru</em>. Minn om at <em class=\"bm\">sier</em> og <em class=\"bm\">gjør</em> er bokmål, og at det heiter <em class=\"nn\">seier</em> og <em class=\"nn\">gjer</em>.",
    },
    {
      type: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter verbet på nynorsk? Skriv infinitiv utan «å».",
      spec: { bank: "verbs", tasks: ["fromBm"], mode: "mixed" },
      n: 6,
      notes: "Rask munnleg runde. Mange av orda skil seg berre med ein vokal eller ein konsonant (<em>spele, byrje, hugse</em>). Spør: kvifor trur du <em>spise</em> og <em>løpe</em> heiter noko heilt anna?",
    },
    {
      type: "oppgave",
      title: "1. Bøy verba",
      body: `<p>Skriv presens, preteritum og perfektum.<br><span class="liten">Døme: <em class="nn">kaste</em> → <em class="nn">kastar, kasta, har kasta</em></span></p>
        <div class="to-kol stor">
          <ol><li>høyre</li><li>spørje</li><li>bu</li><li>skrive</li></ol>
          <ol start="5"><li>kjøpe</li><li>gå</li><li>seie</li><li>snakke</li></ol>
        </div>`,
      form: "Åleine",
      tid: 6,
      svar: "1 høyrer, høyrde, har høyrt · 2 spør, spurde, har spurt · 3 bur, budde, har budd · 4 skriv, skreiv, har skrive · 5 kjøper, kjøpte, har kjøpt · 6 går, gjekk, har gått · 7 seier, sa, har sagt · 8 snakkar, snakka, har snakka",
      notes: "Eitt verb frå kvar gruppe, pluss eitt uregelrett og eitt ekstra a-verb. Når fasiten kjem, spør: kva gruppe høyrer kvart verb til? Sjå etter <em class=\"bm\">spurte</em>, <em class=\"bm\">skriver</em> og <em class=\"bm\">snakket</em>.",
    },
    {
      type: "oppgave",
      title: "2. I går …",
      body: `<p>Skriv verbet i preteritum.</p>
        <ol>
          <li>I går ___ eg ei heil bok. (lese)</li>
          <li>Ho ___ ballen over gjerdet. (kaste)</li>
          <li>Han ___ eit brev til bestemor. (skrive)</li>
          <li>Dei ___ i Bergen i fem år. (bu)</li>
          <li>Kven ___ den siste kaka? (ete)</li>
          <li>Vi ___ heim etter skulen. (gå)</li>
          <li>Guten ___ på isen. (falle)</li>
          <li>Eg ___ ikkje svaret. (vite)</li>
        </ol>`,
      form: "Åleine",
      tid: 5,
      svar: "1 las · 2 kasta · 3 skreiv · 4 budde · 5 åt · 6 gjekk · 7 fall · 8 visste",
      notes: "Mange av desse er sterke verb. Når fasiten kjem, lat elevane lese setningane høgt: <em>las, skreiv, åt, gjekk, fall</em> skal høyrast naturlege ut. <em class=\"bm\">falt</em> og <em class=\"bm\">gikk</em> er bokmål.",
    },
    {
      type: "oppgave",
      title: "3. Rett verba",
      body: `<p>Verba står på bokmål. Skriv setningane rett på nynorsk.</p>
        <ol>
          <li>Ho skriver brev kvar veke.</li>
          <li>Eg finner ikkje nøklane.</li>
          <li>Han kommer heim klokka fem.</li>
          <li>Vi snakker nynorsk i timen.</li>
          <li>Eg kastet ballen i går.</li>
          <li>Han har skrevet ei lang bok.</li>
        </ol>`,
      form: "Åleine, så samanlikn med sidemannen",
      tid: 4,
      svar: "1 <em class=\"nn\">skriv</em> · 2 <em class=\"nn\">finn</em> · 3 <em class=\"nn\">kjem</em> · 4 <em class=\"nn\">snakkar</em> · 5 <em class=\"nn\">kasta</em> · 6 <em class=\"nn\">har skrive</em>",
      notes: "Dei fire første er presens. Minn om regelen: sterke verb får inga ending i presens, a-verb får <em>-ar</em>. Elevar som blir tidleg ferdige, kan skrive heile rekkja (infinitiv, presens, preteritum, perfektum) for kvart verb.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">A-verb: <em class=\"nn\">kasta</em>, aldri <em class=\"bm\">kastet</em></p>",
        "<p class=\"stor\">Sterke verb: inga ending i presens, <em class=\"nn\">skriv, kjem</em></p>",
        "<p class=\"stor\">Usikker? Sjå på preteritum, eller slå opp i ordboka.</p>",
      ],
      notes: "Be elevane skrive ned tre verb dei bomma på i dag, med heile rekkja: infinitiv, presens, preteritum, perfektum. Lappen kan dei ha liggjande framme neste gong dei skriv.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Ei treningsøkt der klassen repeterer dei fem verbgruppene på nynorsk og øver gruppe for gruppe på tavla før elevane løyser oppgåver i skriveboka. Verb er det området der elevane gjer flest feil på sidemål, og der mengdetrening gir mest att. Tavleøvingane trekkjer verb frå ordbanken i kurset, så økta kan gjerast fleire gonger med nye verb. Heile økta kan gjennomførast utan PC.</p>",
    mal: [
      "Elevane kan avgjere om eit verb er a-verb, e-verb, j-verb, kortverb eller sterkt verb.",
      "Elevane kan bøye svake verb i presens, preteritum og perfektum utan bokmålsendingar.",
      "Elevane kan dei vanlegaste sterke verba i alle tre tidene.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør ha arbeidd med modulane Verb: sterke og svake og Bøyingsomgrep, og kjenne omgrepa presens, preteritum og perfektum.",
    forebuing: [
      "Test tavleøvingane på førehand. Knappen «Nye oppgåver» gir nye verb.",
      "Ha mini-tavler, ark eller lappar klare, og bestem korleis du deler klassen i to lag til lysbilete 12.",
      "Sjå til at elevane har skrivebok og ein penn i ein annan farge til å rette med.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom planen og la elevane rette bokmålssetninga i par.</p>", lysbilete: "2 og 3" },
      { fase: "Repetisjon av gruppene", min: 5, gjer: "<p>Les tabellen i kor, vis knepet med preteritum og ta ein fingerrunde om verbklasse.</p>", lysbilete: "4 til 6" },
      { fase: "Svake verb", min: 7, gjer: "<p>Skriftlege rundar med a-verb og e-verb, spørsmålet om <em class=\"nn\">skriv</em> og ein tommelrunde med presens.</p>", lysbilete: "7 til 10" },
      { fase: "Sterke og uregelrette verb", min: 9, gjer: "<p>Vis vokalskiftet, køyr lagkonkurransen med sterke verb og ta rundane med små grupper og bokmålsord.</p>", lysbilete: "11 til 15" },
      { fase: "Eigentrening", min: 16, gjer: "<p>Elevane løyser tre oppgåver i skriveboka: bøy verba, set inn preteritum og rett bokmålsformer. Vis fasiten etter kvar oppgåve, og la elevane rette sjølve.</p>", lysbilete: "16 til 18" },
      { fase: "Avslutning", min: 4, gjer: "<p>Oppsummer og lat elevane skrive tre verb med heile rekkja på ein lapp.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Ho kastet ballen.»", hjelp: "A-verb får <em class=\"nn\">-a</em> i preteritum og perfektum: <em class=\"nn\">kasta, har kasta</em>. <em class=\"bm\">-et</em> finst ikkje i nynorske verbformer." },
      { feil: "«Han skriver, finner, kommer.»", hjelp: "Sterke verb får inga ending i presens: <em class=\"nn\">skriv, finn, kjem</em>. Berre e-verba har <em class=\"nn\">-er</em>." },
      { feil: "«Eg spørjer» eller «han spurte».", hjelp: "Dei fleste j-verba mistar j-en og endinga i presens og får <em class=\"nn\">-de</em> i preteritum: <em class=\"nn\">spør, spurde, har spurt</em>." },
      { feil: "«Ho har skrivi» eller «har skrevet».", hjelp: "Sterke verb får oftast <em class=\"nn\">-e</em> i perfektum: <em class=\"nn\">har skrive, har funne</em>. Unntaka er verb som <em class=\"nn\">har gått, har sett, har fått</em>." },
    ],
    samtale: [
      "Kvifor trur du verb er det området der det blir flest feil på nynorsk?",
      "Kva er likt og ulikt mellom sterke verb på nynorsk og «irregular verbs» på engelsk?",
      "Kva knep brukar du når du er usikker på kva gruppe eit verb høyrer til?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane tabellen frå lysbilete 4 som huskelapp under eigentreninga.",
        "La elevar som skriv seint, gjere berre dei fire første verba i oppgåve 1 og bruke tabellen som hjelp.",
        "Lag ei eiga liste med dei ti vanlegaste sterke verba som eleven lærer utanåt.",
      ],
      utfordring: [
        "La elevane som blir tidleg ferdige, finne fem sterke verb til og skrive heile rekkja for kvart av dei.",
        "La elevane skrive ein kort tekst i preteritum og markere alle verba etter gruppe.",
      ],
    },
    vurdering: [
      "Fingerrunden viser om elevane kan plassere verba i rett gruppe. Mini-tavlene viser kva former som sit.",
      "Skrivebøkene viser kva former som sit. Sjå særleg på sterke verb i preteritum (oppgåve 2) og presens (oppgåve 3).",
      "Kjenneteikn på god måloppnåing: eleven bruker rette verbformer i eigne tekstar og kan grunngi forma med verbgruppa.",
    ],
    vidare: "Følg opp med ein skrivetime der elevane fortel noko i preteritum, og bruk blandingsøkta som oppvarming. Elevar som slit med sterke verb, kan lære ti verb utanåt til neste gong. Mengdetreninga Verb: tider og klassar i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});

Larar.register("trening-adjektiv", {
  tittelnotat: "Ei kort økt om adjektiv: vi repeterer samsvarsbøying og gradbøying og øver saman på tavla før elevane trenar sjølve. Adjektiva er ikkje vanskelege, men nokre få feil går att i nesten alle tekstar, og dei tek vi i dag.",
  slides: [
    {
      title: "I dag trenar vi",
      body: `<ul class="stor">
        <li>adjektiv i inkjekjønn: <em class="nn">eit stort hus</em></li>
        <li>fleirtal og bestemt form: <em class="nn">store hus</em></li>
        <li>gradbøying: <em class="nn">finare, finast</em></li>
      </ul>`,
      notes: "Minn om kva eit adjektiv er: eit ord som seier korleis noko er. Test raskt: kan du setje ordet inn i «ein … bil»? Då er det truleg eit adjektiv.",
    },
    {
      type: "diskuter",
      title: "Kvifor skriv vi slik?",
      prompt: `<p class="stor">Dette var den <em class="bm">fineste</em> og mest <em class="bm">vanlige</em> bilen, men <em class="bm">dyrere</em> enn eit <em class="bm">vanligt</em> hus.</p>
        <p>Finn feila. Kvifor trur du mange skriv <em class="bm">-ere</em> og <em class="bm">-este</em> på nynorsk?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">Dette var den finaste og mest vanlege bilen, men dyrare enn eit vanleg hus.</em> Bokmål gradbøyer med <em class=\"bm\">-ere/-est</em>, nynorsk med <em class=\"nn\">-are/-ast</em>. Adjektiv på <em class=\"nn\">-leg</em> får ikkje <em class=\"nn\">-t</em> i inkjekjønn.",
      notes: "Fire feil i éi setning. La para telje kor mange dei fann før du viser svaret. Mange skriv <em>-ere</em> fordi dei les mest bokmål, og fordi endinga er trykklett og lett å oversjå. Poenget er at ho må lærast som eit fast mønster.",
    },
    {
      title: "Adjektivet rettar seg etter substantivet",
      body: `<div class="former" data-spel>
          <div class="form"><span class="etikett">hankjønn</span><span class="ordform">ein <b>fin</b> gut</span></div>
          <div class="form"><span class="etikett">hokjønn</span><span class="ordform">ei <b>fin</b> jente</span></div>
          <div class="form"><span class="etikett">inkjekjønn</span><span class="ordform">eit fin<b>t</b> hus</span></div>
          <div class="form"><span class="etikett">fleirtal</span><span class="ordform">fin<b>e</b> gutar</span></div>
        </div>`,
      steps: [
        "<p class=\"midt\">Bestemt form får også <strong>-e</strong>: <em class=\"nn\">den fine guten, det store huset</em></p>",
      ],
      notes: "Hugseregel: <em>-t</em> i inkjekjønn, <em>-e</em> i fleirtal og bestemt form. Same reglane gjeld etter <em>er</em>: <em>huset er stort, bilane er fine</em>.",
    },
    {
      title: "Unntak i inkjekjønn",
      body: `<table>
          <thead><tr><th>Når adjektivet …</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td>endar på <strong>-leg, -ig, -sk</strong></td><td><em class="nn">eit vanleg hus, eit viktig val, eit norsk ord</em></td></tr>
            <tr><td>endar på <strong>-t</strong></td><td><em class="nn">eit lett spørsmål, eit trøytt barn</em></td></tr>
            <tr><td>endar på lang vokal</td><td><em class="nn">ny → nytt, brei → breitt</em></td></tr>
            <tr><td>endar på <strong>-en</strong></td><td><em class="nn">open → ope, liten → lite</em></td></tr>
            <tr><td>endar på dobbel konsonant</td><td><em class="nn">snill → snilt, tjukk → tjukt</em></td></tr>
          </tbody>
        </table>`,
      notes: "Den viktigaste raden er den første: <em>-leg</em> og <em>-ig</em> får aldri <em>-t</em>. Det er også der bokmålet lurer mest, fordi bokmål skriv <em class=\"bm\">vanlig</em> og nokre skriv <em class=\"bm\">vanligt</em>. Dei andre radene kan du gå raskare gjennom.",
    },
    {
      type: "drill",
      title: "Inkjekjønn: eit … hus",
      intro: "Skriv adjektivet på mini-tavla. Alle held opp samtidig.",
      spec: { bank: "adjectives", tasks: ["neuter"], mode: "type" },
      n: 8,
      notes: "Når eit ord frå unntakstabellen dukkar opp, spør: kva rad høyrer det til? Sei gjerne frasen høgt med <em>eit … hus</em> først, så høyrer elevane forma.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett? <em class=\"nn\">Det var eit ___ val.</em> (viktig)",
      options: ["<em>viktigt</em>", "<em>viktig</em>", "<em>viktige</em>"],
      correct: 1,
      explain: "Adjektiv på <em class=\"nn\">-ig</em> og <em class=\"nn\">-leg</em> får ikkje <em class=\"nn\">-t</em> i inkjekjønn: <em class=\"nn\">eit viktig val, eit vanleg hus</em>.",
      notes: "Tommel opp eller ned for kvart alternativ. Følg opp med eit tilleggsspørsmål: kva heiter det i fleirtal? <em>viktige val</em>.",
    },
    {
      type: "drill",
      title: "Fleirtal: mange … hus",
      intro: "Fleirtal er same form som bestemt form: <em class=\"nn\">mange store hus, det store huset</em>.",
      spec: { bank: "adjectives", tasks: ["plural"], mode: "type" },
      n: 6,
      notes: "Nokre adjektiv mistar ein vokal i fleirtal: <em>gammal → gamle, open → opne, vakker → vakre</em>. Og eitt er heilt spesielt: <em>liten → små</em>. Ta ein ekstra runde med «Nye oppgåver» om klassen er stø.",
    },
    {
      title: "Gradbøying: -are og -ast",
      body: `<p class="kjempe midt"><em class="nn">fin → fin<strong>are</strong> → fin<strong>ast</strong></em></p>`,
      steps: [
        "<table><tbody><tr><td><em class=\"nn\">god</em></td><td><em class=\"nn\">betre</em></td><td><em class=\"nn\">best</em></td></tr><tr><td><em class=\"nn\">liten</em></td><td><em class=\"nn\">mindre</em></td><td><em class=\"nn\">minst</em></td></tr><tr><td><em class=\"nn\">gammal</em></td><td><em class=\"nn\">eldre</em></td><td><em class=\"nn\">eldst</em></td></tr><tr><td><em class=\"nn\">stor</em></td><td><em class=\"nn\">større</em></td><td><em class=\"nn\">størst</em></td></tr></tbody></table>",
        "<p class=\"midt\">Lange adjektiv: <em class=\"nn\">meir spennande, mest spennande</em></p>",
      ],
      notes: "Hugseregel: nynorsk har <em>a</em> der bokmål har <em>e</em>: <em>-are, -ast</em>. Dei uregelrette liknar på bokmål og engelsk (<em>good, better, best</em>), så dei sit ofte allereie. Nemn også <em>ung, yngre, yngst</em> og <em>lang, lengre, lengst</em>.",
    },
    {
      type: "drill",
      title: "Komparativ: … enn",
      intro: "Skriv eller vel komparativ.",
      spec: { bank: "adjectives", tasks: ["comp"], mode: "mixed" },
      n: 6,
      notes: "Lat klassen svare i kor. Høyrer du <em>-ere</em>, stopp og la ein elev skrive forma på tavla. Adjektiv på <em>-leg</em> får berre <em>-are</em>: <em>vanlegare</em>.",
    },
    {
      type: "drill",
      title: "Superlativ: aller …",
      intro: "Skriv eller vel superlativ.",
      spec: { bank: "adjectives", tasks: ["sup"], mode: "mixed" },
      n: 6,
      notes: "Spør når <em>vakker</em> eller <em>open</em> dukkar opp: kvifor fell <em>e</em>-en bort i <em>vakrast</em> og <em>opnast</em>? Same mønster som i fleirtal. Minn også om at bestemt form av superlativ får <em>-e</em>: <em>den finaste bilen</em>.",
    },
    {
      type: "drill",
      title: "Blanda adjektivrunde",
      intro: "Lag mot lag: samsvar og gradbøying om kvarandre.",
      spec: { bank: "adjectives", tasks: ["neuter", "plural", "comp", "sup"], mode: "mixed" },
      n: 8,
      notes: "Laga svarer annankvar gong. Rett svar gir eitt poeng, og laget kan få eitt bonuspoeng om det kan seie ein regel som forklarer svaret. Svarer laget feil, kan det andre laget stele poenget.",
    },
    {
      type: "oppgave",
      title: "1. Inkjekjønn",
      body: `<p>Skriv frasen med adjektivet i rett form.</p>
        <div class="to-kol stor">
          <ol><li>eit (stor) hus</li><li>eit (vanleg) problem</li><li>eit (ny) bilete</li><li>eit (open) vindauge</li><li>eit (snill) barn</li></ol>
          <ol start="6"><li>eit (lett) spørsmål</li><li>eit (raud) eple</li><li>eit (viktig) val</li><li>eit (gammal) fjell</li><li>eit (liten) egg</li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 stort · 2 vanleg · 3 nytt · 4 ope · 5 snilt · 6 lett · 7 raudt · 8 viktig · 9 gammalt · 10 lite",
      notes: "Nesten alle radene i unntakstabellen er med. Når fasiten kjem, spør for kvart unntak: kva rad i tabellen høyrer det til? Sjå særleg etter <em class=\"bm\">vanlegt</em>, <em class=\"bm\">viktigt</em> og <em class=\"bm\">opent</em>.",
    },
    {
      type: "oppgave",
      title: "2. Fleirtal og bestemt form",
      body: `<p>Skriv frasen med adjektivet i rett form.</p>
        <div class="to-kol stor">
          <ol><li>mange (fin) bilar</li><li>den (stor) båten</li><li>dei (gammal) husa</li><li>to (liten) kattar</li><li>det (open) vindauget</li></ol>
          <ol start="6"><li>(vakker) fjell</li><li>den (vanleg) feilen</li><li>dei (trøytt) elevane</li><li>(sikker) svar</li><li>det (kvit) huset</li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 fine · 2 store · 3 gamle · 4 små · 5 opne · 6 vakre · 7 vanlege · 8 trøytte · 9 sikre · 10 kvite",
      notes: "Alle får <em>-e</em>, men nokre mistar ein vokal: <em>gamle, opne, vakre, sikre</em>. Og <em>liten</em> blir <em>små</em>. Minn om at bestemt form og fleirtal har same adjektivform.",
    },
    {
      type: "oppgave",
      title: "3. Gradbøying",
      body: `<p>Skriv komparativ og superlativ.<br><span class="liten">Døme: <em class="nn">fin</em> → <em class="nn">finare, finast</em></span></p>
        <div class="to-kol stor">
          <ol><li>varm</li><li>stor</li><li>god</li><li>vanleg</li><li>gammal</li></ol>
          <ol start="6"><li>vakker</li><li>liten</li><li>rask</li><li>open</li><li>ung</li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 varmare, varmast · 2 større, størst · 3 betre, best · 4 vanlegare, vanlegast · 5 eldre, eldst · 6 vakrare, vakrast · 7 mindre, minst · 8 raskare, raskast · 9 opnare, opnast · 10 yngre, yngst",
      notes: "Sjå etter <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em>. Dei uregelrette (<em>større, betre, eldre, mindre, yngre</em>) sit ofte allereie, så feila kjem helst på dei regelrette.",
    },
    {
      type: "oppgave",
      title: "4. Finn og rett feila",
      body: `<p class="stor">Den sommaren var den varmeste på lenge. Vi budde i eit gammalt og vanlegt hus ved sjøen. Huset var stor, men hagen var liten. Om kvelden var vatnet finere enn om dagen. Det var den fineste ferien eg har hatt.</p>
        <p>Det er fem feil. Skriv dei rette formene.</p>`,
      form: "I par",
      tid: 5,
      svar: "<em class=\"nn\">varmaste</em> · <em class=\"nn\">vanleg</em> (hus) · <em class=\"nn\">stort</em> (huset var …) · <em class=\"nn\">finare</em> · <em class=\"nn\">finaste</em>",
      notes: "Para skriv ned feila og rettingane i skriveboka. Merk at <em>hagen var liten</em> er rett: <em>hage</em> er hankjønn. Spør etterpå kva regel kvar feil bryt: gradbøying, <em>-leg</em> utan <em>-t</em>, eller predikativ i inkjekjønn.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">eit stort hus</em>, men <em class=\"nn\">eit vanleg hus</em></p>",
        "<p class=\"stor\">Fleirtal og bestemt form på <strong>-e</strong></p>",
        "<p class=\"stor\"><em class=\"nn\">-are</em> og <em class=\"nn\">-ast</em>, aldri <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em></p>",
      ],
      notes: "Exit-spørsmål: be kvar elev skrive éi setning med eit adjektiv i superlativ på ein lapp før dei går. Då ser du raskt kven som har fått med seg <em>-ast</em>.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Ei kort treningsøkt om adjektiv. Klassen repeterer samsvarsbøying og gradbøying og øver saman på tavla før elevane løyser oppgåver i skriveboka, med fasit på tavla. Heile økta kan gjennomførast utan PC. Dei vanlegaste feila er <em class=\"bm\">-t</em> på adjektiv som endar på <em class=\"nn\">-leg</em> og <em class=\"nn\">-ig</em>, og bokmålsendingane <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em>. Økta passar som oppvarming eller som repetisjon etter modulen Adjektiv: samsvarsbøying.</p>",
    mal: [
      "Elevane kan bøye adjektiv i inkjekjønn, fleirtal og bestemt form, også dei vanlegaste unntaka.",
      "Elevane kan gradbøye adjektiv med <em class=\"nn\">-are</em> og <em class=\"nn\">-ast</em> og kjenner dei vanlegaste uregelrette adjektiva.",
      "Elevane kan forklare kvifor adjektiv på <em class=\"nn\">-leg</em> og <em class=\"nn\">-ig</em> ikkje får <em class=\"nn\">-t</em> i inkjekjønn.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør kjenne dei tre kjønna og ha arbeidd med modulen Adjektiv: samsvarsbøying.",
    forebuing: [
      "Test tavleøvingane på førehand og prøv knappen «Nye oppgåver».",
      "Ha mini-tavler eller ark klare, og bestem korleis du deler klassen i to lag til lysbilete 12.",
      "Ha små lappar klare til exit-spørsmålet.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom planen og la para finne dei fire feila i setninga.</p>", lysbilete: "2 og 3" },
      { fase: "Samsvarsbøying", min: 8, gjer: "<p>Repeter figuren og unntakstabellen, ta ein skriftleg runde med inkjekjønn, spørsmålet om <em class=\"nn\">viktig</em> og ein runde med fleirtal.</p>", lysbilete: "4 til 8" },
      { fase: "Gradbøying", min: 5, gjer: "<p>Vis <em class=\"nn\">-are/-ast</em> og dei uregelrette, og ta rundane med komparativ og superlativ.</p>", lysbilete: "9 til 11" },
      { fase: "Lagkonkurranse", min: 3, gjer: "<p>Blanda runde med lag mot lag.</p>", lysbilete: "12" },
      { fase: "Eigentrening", min: 23, gjer: "<p>Elevane løyser fire oppgåver i skriveboka: inkjekjønn, fleirtal og bestemt form, gradbøying og ein kort tekst med feil. Vis fasiten etter kvar oppgåve, og la elevane rette sjølve.</p>", lysbilete: "13 til 16" },
      { fase: "Avslutning", min: 2, gjer: "<p>Oppsummer og samle inn exit-lappane.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Eit vanlegt hus», «eit viktigt val».", hjelp: "Adjektiv på <em class=\"nn\">-leg</em> og <em class=\"nn\">-ig</em> får aldri <em class=\"nn\">-t</em>: <em class=\"nn\">eit vanleg hus, eit viktig val</em>." },
      { feil: "«Finere, finest.»", hjelp: "Nynorsk gradbøyer med <em class=\"nn\">-are</em> og <em class=\"nn\">-ast</em>: <em class=\"nn\">finare, finast</em>. Hugs: <em class=\"nn\">a</em> der bokmål har <em class=\"bm\">e</em>." },
      { feil: "«Huset er stor.»", hjelp: "Adjektivet rettar seg etter substantivet også etter <em class=\"nn\">er</em>: <em class=\"nn\">huset er stort</em>. Tenk deg adjektivet framfor substantivet: <em class=\"nn\">eit stort hus</em>." },
      { feil: "«Eit opent vindauge», «gammale hus».", hjelp: "Adjektiv på <em class=\"nn\">-en</em> får <em class=\"nn\">-e</em> i inkjekjønn: <em class=\"nn\">eit ope vindauge</em>. <em class=\"nn\">gammal, vakker, open</em> mistar ein vokal i fleirtal: <em class=\"nn\">gamle, vakre, opne</em>." },
    ],
    samtale: [
      "Kvifor trur du <em class=\"bm\">-ere</em> og <em class=\"bm\">-est</em> sit så godt, sjølv hos elevar som elles skriv god nynorsk?",
      "Kva er likt mellom gradbøyinga på nynorsk, bokmål og engelsk?",
      "Korleis kan du sjekke om adjektivet i ei setning har rett form?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane unntakstabellen frå lysbilete 5 som huskelapp.",
        "La elevane seie frasen <em class=\"nn\">eit … hus</em> høgt før dei skriv inkjekjønnsforma.",
        "Start med den vanlege gradbøyinga (<em class=\"nn\">fin, finare, finast</em>) før dei uregelrette.",
      ],
      utfordring: [
        "La elevane som blir tidleg ferdige med oppgåve 4, skrive ein tilsvarande tekst med fem adjektivfeil til sidemannen.",
        "La elevane skrive ein reklametekst med minst ti adjektiv i ulike former og bytte med sidemannen for retting.",
      ],
    },
    vurdering: [
      "Mini-tavlene og oppgåve 1 i skriveboka viser raskt om klassen har fått med seg unntaka i inkjekjønn.",
      "Exit-lappen viser om eleven brukar <em class=\"nn\">-ast</em> i superlativ.",
      "Kjenneteikn på god måloppnåing: eleven bøyer adjektiva rett også når dei står etter <em class=\"nn\">er</em> og <em class=\"nn\">blir</em> i eigne tekstar.",
    ],
    vidare: "Følg opp med treningsøkta i setningslære, der adjektivet som predikativ skal bøyast etter subjektet, og med blandingsøkta. Mengdetreninga Adjektiv: samsvar og gradbøying i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});

Larar.register("trening-smaord", {
  tittelnotat: "Småorda er dei orda vi les forbi utan å leggje merke til dei, og difor blir dei ofte ståande på bokmål: <em class=\"bm\">ikke, bare, hva, noen</em>. I dag øver vi dei inn som gloser og i setningar. Sei gjerne til elevane at dette er den raskaste vegen til færre feil: småorda står i nesten kvar setning.",
  slides: [
    {
      title: "I dag trenar vi",
      body: `<ul class="stor">
        <li>spørjeord og andre småord</li>
        <li><em class="nn">ho/henne</em> og <em class="nn">de/dykk/dei</em></li>
        <li><em class="nn">noko, nokon, nokre</em></li>
        <li><em class="nn">då/når, kvar/kor, sin/hans</em></li>
      </ul>`,
      notes: "Økta har mange korte rundar. Hald tempoet oppe: repetisjonen tek kort tid, og det meste av tida går til øving. Elevane treng mini-tavle eller ark.",
    },
    {
      type: "diskuter",
      title: "Kvifor blir småorda ståande?",
      prompt: `<p class="stor"><em class="bm">Hva</em> gjer du <em class="bm">hvis</em> det <em class="bm">ikke</em> kjem <em class="bm">noen</em>?</p>
        <p>Rett setninga. Kvifor trur du det er nettopp desse orda som blir ståande på bokmål?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">Kva gjer du viss (dersom) det ikkje kjem nokon?</em> Småorda les vi forbi fordi vi berre ser etter innhaldsorda. Difor må dei øvast inn til dei kjem automatisk.",
      notes: "Få fram at feila i småorda sjeldan kjem av at elevane ikkje kan orda. Dei kjem av at hjernen skriv på autopilot. Mengdetrening er difor ein god medisin. Tips til skriving: les teksten baklengs setning for setning, då ser du småorda betre.",
    },
    {
      title: "Spørjeorda",
      body: `<table>
          <tbody>
            <tr><td><em class="bm">hva</em></td><td>→</td><td><em class="nn">kva</em></td><td><em class="bm">hvordan</em></td><td>→</td><td><em class="nn">korleis</em></td></tr>
            <tr><td><em class="bm">hvem</em></td><td>→</td><td><em class="nn">kven</em></td><td><em class="bm">hvorfor</em></td><td>→</td><td><em class="nn">kvifor</em></td></tr>
            <tr><td><em class="bm">hvor</em> (stad)</td><td>→</td><td><em class="nn">kvar</em></td><td><em class="bm">hvor</em> (grad)</td><td>→</td><td><em class="nn">kor</em></td></tr>
            <tr><td><em class="bm">hvilken</em></td><td>→</td><td><em class="nn">kva for ein</em></td><td><em class="bm">hvor mye</em></td><td>→</td><td><em class="nn">kor mykje</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt stor\"><em class=\"bm\">hv-</em> blir <em class=\"nn\">kv-</em></p>"],
      notes: "Hugseregelen <em>hv</em> blir <em>kv</em> gjeld nesten alle spørjeorda. Unntaka er <em>korleis</em> og <em>kor</em>, som berre har <em>k</em>. <em>kvar</em> og <em>kor</em> kjem vi tilbake til seinare i timen.",
    },
    {
      type: "drill",
      title: "Spørjeorda",
      intro: "Kva heiter spørjeordet på nynorsk? Svar i kor.",
      spec: { bank: "words", filter: { tags: ["sporjeord"] }, tasks: ["bm2nn"], mode: "mixed" },
      n: 6,
      notes: "Rask kor-runde. Tel ned frå tre, og så svarer heile klassen. Er det mange ulike svar, ta oppgåva ein gong til.",
    },
    {
      type: "drill",
      title: "Småord frå bokmål til nynorsk",
      intro: "Skriv nynorskordet på mini-tavla. Er fleire former rette, held det med éi.",
      spec: { bank: "words", filter: { tags: ["smaord", "pronomen", "adjektiv", "diverse"] }, tasks: ["bm2nn"], mode: "type" },
      n: 8,
      notes: "Alle held opp tavla samtidig. Sjå særleg etter stavefeil som <em>ikje</em> for <em>ikkje</em> og <em>mykkje</em> for <em>mykje</em>. Når fleire former er rette (til dømes <em>viss, dersom, om</em>), vis at alle er godtekne.",
    },
    {
      type: "drill",
      title: "-het og -else: finst det eit betre ord?",
      intro: "Kva heiter ordet på nynorsk?",
      spec: { bank: "words", filter: { tags: ["het"] }, tasks: ["bm2nn"], mode: "mixed" },
      n: 6,
      notes: "Spør først: kvifor trur du nynorsk unngår <em class=\"bm\">-het</em> og <em class=\"bm\">-else</em>? Endingane kom inn frå tysk, og Ivar Aasen ville ha ord som var laga av norsk ordtilfang. Nynorsk brukar gjerne <em>-dom, -leik, -ing, -sle</em>: <em>fridom, kjærleik, oppleving, kjensle</em>.",
    },
    {
      title: "Pronomen: subjekt og objekt",
      body: `<div class="pronomenpar">
          <div class="pp-par"><span class="ledd subjekt">eg</span><span class="pp-pil">→</span><span class="ledd objekt">meg</span></div>
          <div class="pp-par"><span class="ledd subjekt">ho</span><span class="pp-pil">→</span><span class="ledd objekt">henne</span></div>
          <div class="pp-par"><span class="ledd subjekt">vi</span><span class="pp-pil">→</span><span class="ledd objekt">oss</span></div>
          <div class="pp-par"><span class="ledd subjekt">de</span><span class="pp-pil">→</span><span class="ledd objekt">dykk</span></div>
          <p class="pp-dome"><span class="ledd subjekt">Ho</span> ser <span class="ledd objekt">dykk</span>. <span class="ledd subjekt">De</span> ser <span class="ledd objekt">henne</span>.</p>
        </div>`,
      steps: [
        "<p class=\"midt\"><em class=\"nn\">han</em> og <em class=\"nn\">dei</em> er like som subjekt og objekt. <em class=\"nn\">de</em> tyder «dere».</p>",
      ],
      notes: "Den store fella er <em>de</em> og <em>dei</em>. Bokmål <em class=\"bm\">de</em> (dei, 3. person) er <em class=\"nn\">dei</em> på nynorsk, medan nynorsk <em class=\"nn\">de</em> tyder «dere». Bokmål <em class=\"bm\">dem</em> og <em class=\"bm\">ham</em> finst ikkje på nynorsk. <em class=\"nn\">dokker</em> er også tillate for «dere».",
    },
    {
      type: "drill",
      title: "Pronomen i setning",
      intro: "Er ordet subjekt eller objekt? Vel rett form.",
      spec: { bank: "sentences", set: "pronomen", mode: "mixed" },
      n: 6,
      notes: "Be elevane grunngi kvart svar: er pronomenet subjekt (den som gjer noko) eller objekt (den som noko skjer med)? Lat ein elev lese setninga høgt med rett form.",
    },
    {
      title: "Noko, nokon eller nokre?",
      body: `<table>
          <tbody>
            <tr><td><em class="nn">nokon</em></td><td>om personar, og om hankjønnsord i spørsmål og nekting</td><td><em class="nn">Er det nokon heime?</em></td></tr>
            <tr><td><em class="nn">noko</em></td><td>om mengd og ting, og om inkjekjønnsord</td><td><em class="nn">Vil du ha noko kaffi?</em></td></tr>
            <tr><td><em class="nn">noka</em></td><td>om hokjønnsord i spørsmål og nekting</td><td><em class="nn">Er det noka avis her?</em></td></tr>
            <tr><td><em class="nn">nokre</em></td><td>fleire ting eller personar</td><td><em class="nn">Eg har lese nokre bøker.</em></td></tr>
          </tbody>
        </table>`,
      notes: "Bokmål <em class=\"bm\">noen</em> og <em class=\"bm\">noe</em> kan bli fire ulike ord på nynorsk, og det er difor feila kjem. Sei til elevane: tenk på kva det er snakk om. Ein person? <em>nokon</em>. Ei mengd eller ein ting? <em>noko</em>. Fleire? <em>nokre</em>. I positive setningar om éin ting brukar vi <em>ein, ei, eit</em>: <em>Eg såg ein hund</em>.",
    },
    {
      type: "drill",
      title: "Noko, nokon eller nokre?",
      intro: "Set inn rett form. Mini-tavle eller tommel.",
      spec: { bank: "sentences", set: "nokon", mode: "mixed" },
      n: 6,
      notes: "Når alternativa står på tavla, peik på dei eitt om gongen og la klassen stemme med tommel opp eller ned. Når det er skriveoppgåve, brukar dei mini-tavla.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">___ gammal er du?</em>",
      options: ["<em>Kvar</em>", "<em>Kor</em>", "<em>Kva</em>", "<em>Hvor</em>"],
      correct: 1,
      explain: "<em class=\"nn\">kor</em> spør om grad eller mengd: <em class=\"nn\">kor gammal, kor mange, kor langt</em>. <em class=\"nn\">kvar</em> spør om stad: <em class=\"nn\">Kvar bur du?</em>",
      notes: "Mange vel <em>kvar</em> fordi bokmål har eitt ord, <em>hvor</em>, for begge delar. Hugseregel: står det eit adjektiv eller <em>mange/mykje</em> etter spørjeordet, er det <em>kor</em>.",
    },
    {
      type: "drill",
      title: "Då eller når? Kvar eller kor?",
      intro: "«Den gongen då, kvar gong når.» «Kvar bur du? Kor gammal er du?»",
      spec: { bank: "sentences", set: ["daNar", "kvarKor"], mode: "mixed" },
      n: 6,
      notes: "Lat klassen seie hugseregelen i kor før de byrjar. For kvar oppgåve: er det éin gong i fortida (då), eller kvar gong og framtid (når)? Er det stad (kvar) eller grad (kor)? Hugs at bokmål <em class=\"bm\">da</em> ikkje finst på nynorsk.",
    },
    {
      title: "Sin eller hans? Seg eller kvarandre?",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">sin, si, sitt, sine</em> viser tilbake til subjektet: <em class=\"nn\">Per tok si bok.</em></p>",
        "<p class=\"stor\">Elles <em class=\"nn\">hans, hennar, deira</em>: <em class=\"nn\">Kari møtte Ola og hans bror.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">seg</em> om same person, <em class=\"nn\">kvarandre</em> når dei gjer noko mot kvarandre</p>",
        "<p class=\"stor\"><em class=\"nn\">òg</em> = også, <em class=\"nn\">og</em> bind saman: <em class=\"nn\">Kari og Per kjem òg.</em></p>",
      ],
      notes: "Still spørsmålet «kven eig det?» og «er det subjektet?». Er svaret ja, blir det <em>sin, si, sitt, sine</em>, bøygd etter kjønnet på det som blir eigd. Nemn òg <em>enno</em> og <em>endå</em>: begge kan tyde «fortsatt», men berre <em>endå</em> tyder «enda» som i <em>endå betre</em>.",
    },
    {
      type: "drill",
      title: "Sin, seg, enno eller òg?",
      intro: "Lag mot lag: vel rett ord.",
      spec: { bank: "sentences", set: ["possessiv", "refleksiv", "ennoEnda", "ogsaa"], mode: "mixed" },
      n: 8,
      notes: "Laga svarer annankvar gong. Rett svar gir eitt poeng, og eitt bonuspoeng om laget kan forklare kvifor. Svarer laget feil, kan det andre laget stele poenget.",
    },
    {
      type: "oppgave",
      title: "1. Småord på nynorsk",
      body: `<p>Skriv ordet på nynorsk.</p>
        <div class="to-kol stor">
          <ol><li><em class="bm">ikke</em></li><li><em class="bm">bare</em></li><li><em class="bm">hvordan</em></li><li><em class="bm">noe</em></li><li><em class="bm">fra</em></li></ol>
          <ol start="6"><li><em class="bm">mye</em></li><li><em class="bm">sammen</em></li><li><em class="bm">hvis</em></li><li><em class="bm">hjemme</em></li><li><em class="bm">hverandre</em></li></ol>
        </div>`,
      form: "Åleine",
      tid: 4,
      svar: "1 ikkje · 2 berre · 3 korleis · 4 noko · 5 frå · 6 mykje · 7 saman · 8 viss, dersom eller om · 9 heime · 10 kvarandre",
      notes: "Sjå etter stavefeil som <em>ikje</em>, <em>mykkje</em> og <em>kverandre</em>. Til nr. 8: alle tre formene er rette.",
    },
    {
      type: "oppgave",
      title: "2. Pronomen",
      body: `<p>Vel rett ord og skriv heile setninga.</p>
        <ol>
          <li>Eg såg ___ i går. (ho / henne)</li>
          <li>___ kjem i morgon. (ho / henne)</li>
          <li>Kan ___ hjelpe meg? (de / dykk)</li>
          <li>Eg skal ringje ___ i kveld. (de / dykk)</li>
          <li>___ er trøytte etter turen. (dei / de)</li>
          <li>Ho fortalde ___ alt. (vi / oss)</li>
        </ol>`,
      form: "Åleine",
      tid: 3,
      svar: "1 henne · 2 Ho · 3 de · 4 dykk · 5 Dei · 6 oss",
      notes: "Be elevane grunngi når fasiten kjem: er pronomenet subjekt eller objekt? Nr. 5 handlar om andre personar, og då blir det <em>dei</em>. <em>dokker</em> er òg rett i nr. 3 og 4.",
    },
    {
      type: "oppgave",
      title: "3. Noko, nokon eller nokre?",
      body: `<p>Skriv setninga med rett ord.</p>
        <ol>
          <li>Er det ___ heime?</li>
          <li>Vil du ha ___ kaffi?</li>
          <li>Eg har lese ___ bøker i sommar.</li>
          <li>Eg ser ikkje ___ hus her.</li>
          <li>Kan ___ hjelpe meg med leksene?</li>
          <li>Det står ___ elevar utanfor.</li>
        </ol>`,
      form: "Åleine",
      tid: 3,
      svar: "1 nokon · 2 noko · 3 nokre · 4 noko · 5 nokon · 6 nokre",
      notes: "Bruk spørsmåla frå tabellen: ein person? <em>nokon</em>. Ei mengd eller eit inkjekjønnsord? <em>noko</em>. Fleire? <em>nokre</em>. Nr. 4 er ei felle: <em>hus</em> er inkjekjønn, så det blir <em>noko</em>.",
    },
    {
      type: "oppgave",
      title: "4. Blanda småord",
      body: `<p>Vel rett ord og skriv heile setninga.</p>
        <ol>
          <li>___ eg var liten, budde vi i Bergen. (då / når)</li>
          <li>Ring meg ___ du kjem fram. (då / når)</li>
          <li>___ gammal er du? (kvar / kor)</li>
          <li>Veit du ___ nøklane er? (kvar / kor)</li>
          <li>Per tok ___ bok og gjekk. (si / hans)</li>
          <li>Kari møtte Ola og ___ bror. (sin / hans)</li>
          <li>Dei hjelpte ___ med leksene. (seg / kvarandre)</li>
          <li>Eg vil ___ vere med. (òg / og)</li>
        </ol>`,
      form: "I par",
      tid: 4,
      svar: "1 Då · 2 når · 3 Kor · 4 kvar · 5 si · 6 hans · 7 kvarandre · 8 òg (eller også)",
      notes: "Para skal kunne seie regelen bak kvart svar. Har du tid, ta to eller tre av setningane i plenum og lat eit par forklare. Er det mange som bommar på <em>sin/hans</em>, gå tilbake til lysbilete 14.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\"><em class=\"bm\">hv-</em> blir <em class=\"nn\">kv-</em>: <em class=\"nn\">kva, kven, kvifor</em></p>",
        "<p class=\"stor\"><em class=\"nn\">ho</em> gjer, <em class=\"nn\">henne</em> skjer det med. <em class=\"nn\">de</em> = «dere».</p>",
        "<p class=\"stor\">Ein person <em class=\"nn\">nokon</em>, ei mengd <em class=\"nn\">noko</em>, fleire <em class=\"nn\">nokre</em></p>",
      ],
      notes: "Be kvar elev skrive dei tre småorda dei oftast skriv feil, på ein lapp som dei legg i pennalet og brukar som sjekkliste neste gong dei skriv.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Ei treningsøkt om småorda: spørjeord, pronomen og andre ord som ofte blir ståande på bokmål. Klassen repeterer dei viktigaste reglane og øver i fellesskap, først som gloser og så i setningar med <em class=\"nn\">ho/henne</em>, <em class=\"nn\">de/dykk/dei</em>, <em class=\"nn\">noko/nokon/nokre</em>, <em class=\"nn\">då/når</em>, <em class=\"nn\">kvar/kor</em> og <em class=\"nn\">sin/hans</em>. Småorda står i nesten kvar setning, så det lønner seg å øve dei inn til dei kjem av seg sjølv. Til slutt løyser elevane oppgåver i skriveboka, med fasit på tavla, så heile økta kan gjennomførast utan PC.</p>",
    mal: [
      "Elevane kan skrive dei vanlegaste spørjeorda og småorda på nynorsk.",
      "Elevane kan velje rett mellom subjekts- og objektsform av pronomena, og mellom <em class=\"nn\">de</em>, <em class=\"nn\">dykk</em> og <em class=\"nn\">dei</em>.",
      "Elevane kan velje rett mellom <em class=\"nn\">noko, nokon, noka</em> og <em class=\"nn\">nokre</em>, <em class=\"nn\">då</em> og <em class=\"nn\">når</em>, <em class=\"nn\">kvar</em> og <em class=\"nn\">kor</em>.",
      "Elevane kan bruke <em class=\"nn\">sin/si/sitt/sine</em> når eigaren er subjektet.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør ha arbeidd med modulane Pronomen og spørjeord og Skrivereglar og vanlege fallgruver, og kjenne omgrepa subjekt og objekt.",
    forebuing: [
      "Test tavleøvingane på førehand. Knappen «Nye oppgåver» gir nye ord og setningar.",
      "Ha mini-tavler eller ark klare, og bestem korleis du deler klassen i to lag til lysbilete 15.",
      "Ha små lappar klare til sjekklista i avslutninga.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom planen og la para rette setninga med fire småord.</p>", lysbilete: "2 og 3" },
      { fase: "Gloser", min: 8, gjer: "<p>Repeter spørjeorda og ta tre rundar: spørjeord i kor, småord på mini-tavle og ord på <em class=\"bm\">-het</em> og <em class=\"bm\">-else</em>.</p>", lysbilete: "4 til 7" },
      { fase: "Pronomen og noko/nokon", min: 7, gjer: "<p>Vis pronomenpara og tabellen for <em class=\"nn\">noko/nokon/nokre</em>, med ein tavlerunde etter kvar.</p>", lysbilete: "8 til 11" },
      { fase: "Då/når, kvar/kor og sin/hans", min: 8, gjer: "<p>Spørsmål om <em class=\"nn\">kor</em>, tavlerunde med då/når og kvar/kor, repetisjon av <em class=\"nn\">sin/hans</em> og lagkonkurranse.</p>", lysbilete: "12 til 15" },
      { fase: "Eigentrening", min: 15, gjer: "<p>Elevane løyser fire oppgåver i skriveboka, gloser først og så setningar. Vis fasiten etter kvar oppgåve, og la elevane rette sjølve.</p>", lysbilete: "16 til 19" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive sin eigen sjekklistelapp med tre småord.</p>", lysbilete: "20" },
    ],
    misoppfatningar: [
      { feil: "«De kom i går» om ein gjeng andre personar.", hjelp: "Nynorsk <em class=\"nn\">de</em> tyder «dere». Om andre personar heiter det <em class=\"nn\">dei</em>, både som subjekt og objekt." },
      { feil: "«Eg såg ho i går.»", hjelp: "<em class=\"nn\">ho</em> er subjektsform. Som objekt heiter det <em class=\"nn\">henne</em>: <em class=\"nn\">Eg såg henne.</em>" },
      { feil: "«Har du noko penn?» eller «Er det noko heime?»", hjelp: "<em class=\"nn\">nokon</em> om personar og hankjønnsord i spørsmål og nekting: <em class=\"nn\">Er det nokon heime? Har du nokon penn?</em> <em class=\"nn\">noko</em> om mengd og inkjekjønnsord." },
      { feil: "«Kvar gammal er du?»", hjelp: "<em class=\"nn\">kvar</em> spør om stad. Om grad og mengd heiter det <em class=\"nn\">kor</em>: <em class=\"nn\">kor gammal, kor mange</em>." },
      { feil: "«Per tok hans bok» om si eiga bok.", hjelp: "Når eigaren er subjektet, heiter det <em class=\"nn\">sin, si, sitt, sine</em>: <em class=\"nn\">Per tok si bok.</em> <em class=\"nn\">hans</em> betyr at boka høyrer til ein annan." },
    ],
    samtale: [
      "Kvifor trur du det er nettopp småorda som blir ståande på bokmål?",
      "Kva knep kan du bruke for å finne småorda når du les korrektur på din eigen tekst?",
      "Kvifor trur du Ivar Aasen ville unngå endingane <em class=\"bm\">-het</em> og <em class=\"bm\">-else</em>?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei liste med dei tjue vanlegaste småorda som huskelapp.",
        "La elevar som skriv seint, skrive berre ordet som manglar i oppgåve 2 til 4, ikkje heile setninga.",
        "Bruk alternativa på tavla (tommel opp og ned) meir enn skriftlege rundar.",
      ],
      utfordring: [
        "La elevane som blir tidleg ferdige, lage éi eiga setning til kvar av reglane i oppgåve 4.",
        "La elevane ta ein bokmålstekst på 100 ord og omsetje alle småorda, og telje kor mange det var.",
      ],
    },
    vurdering: [
      "Kor-rundane og mini-tavlene viser raskt kva småord klassen er usikker på.",
      "Lagkonkurransen med bonuspoeng viser om elevane kan forklare <em class=\"nn\">sin/hans</em> og <em class=\"nn\">seg/kvarandre</em>, ikkje berre gjette.",
      "Kjenneteikn på god måloppnåing: eleven har få eller ingen bokmålssmåord i eigne tekstar og brukar <em class=\"nn\">de/dei</em> og <em class=\"nn\">noko/nokon</em> rett.",
    ],
    vidare: "Følg opp med ein korrekturrunde på ein eigen tekst der elevane berre ser etter småord, og med blandingsøkta. Mengdetreninga Pronomen, spørjeord og småord i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});

Larar.register("trening-setning", {
  tittelnotat: "Ei treningsøkt i setningslære. Vi repeterer framgangsmåten frå modulen Setningslære og øver saman på tavla: verbal, subjekt, ledd, heilsetning og leddsetning, ordstilling og predikativ. Sei det høgt: alt byrjar med verbalet. Finn du det, finn du resten.",
  slides: [
    {
      title: "I dag trenar vi",
      body: `<ul class="stor">
        <li>finne <strong>verbalet</strong> og <strong>subjektet</strong></li>
        <li>kjenne att <strong>ledda</strong></li>
        <li>skilje <strong>heilsetning</strong> og <strong>leddsetning</strong></li>
        <li>få <strong>ordstillinga</strong> rett</li>
      </ul>`,
      notes: "Minn om at setningslæra ikkje er eit mål i seg sjølv. Ho gir oss verktøy til å rette ordstilling, <em>ikkje</em>-plassering og samsvar i eigne tekstar.",
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
      notes: "Lat klassen seie framgangsmåten høgt, steg for steg, før du viser neste steg. Verbalet kan vere fleire ord: <em>har lese, skal reise, må gå</em>. Test: set inn <em>i går</em> eller <em>i morgon</em>, og sjå kva ord som endrar seg.",
    },
    {
      type: "drill",
      title: "Finn verbalet",
      intro: "Skriv verbalet på mini-tavla. Er det fleire ord, skriv du alle.",
      spec: { bank: "sentences", set: "finnVerbal", mode: "type" },
      n: 6,
      notes: "Alle held opp tavla samtidig. Den vanlegaste feilen er å skrive berre eitt av orda når verbalet er samansett: <em>har</em> utan <em>lese</em>. Spør då: kva skjer i setninga?",
    },
    {
      type: "sporsmal",
      question: "Kva er subjektet i <em class=\"nn\">I går kjøpte guten nye sko</em>?",
      options: ["<em>I går</em>", "<em>kjøpte</em>", "<em>guten</em>", "<em>nye sko</em>"],
      correct: 2,
      explain: "Finn verbalet først: <em class=\"nn\">kjøpte</em>. Spør så «kven kjøpte?»: <em class=\"nn\">guten</em>. Subjektet står etter verbalet fordi setninga byrjar med eit adverbial.",
      notes: "Lat elevane vise svaret med fingrane, éin til fire. Mange vel <em>I går</em> fordi dei trur subjektet alltid står først. Spør: kva er det som kjøper? Kan <em>i går</em> kjøpe sko?",
    },
    {
      type: "drill",
      title: "Finn subjektet",
      intro: "Spør «kven eller kva + verbalet?». Subjektet kan stå etter verbalet.",
      spec: { bank: "sentences", set: "finnSubjekt", mode: "type" },
      n: 6,
      notes: "Be ein elev seie spørsmålet høgt for kvar oppgåve: «kven kjem?», «kva kjem?». Lat klassen skrive svaret på mini-tavla før du viser det.",
    },
    {
      type: "drill",
      title: "Kva ledd er det?",
      intro: "Lag mot lag: svar og grunngi med spørsmålet de stilte.",
      spec: { bank: "sentences", set: "ledd", mode: "choice" },
      n: 6,
      notes: "Laga svarer annankvar gong. Eitt poeng for rett ledd, og eitt bonuspoeng om laget kan seie kva spørsmål dei stilte. Ta ein ekstra prat om skilnaden på objekt og indirekte objekt: det indirekte objektet svarer på «til kven?».",
    },
    {
      title: "Heilsetning og leddsetning",
      body: `<div class="setningsboksar">
          <div class="setningsboks heil"><span class="sb-namn">heilsetning</span>Vi gjekk heim <span class="setningsboks ledd"><span class="sb-namn">leddsetning</span><b>fordi</b> det regna</span>.</div>
        </div>`,
      steps: [
        "<p>Ei <strong>heilsetning</strong> kan stå åleine. Ei <strong>leddsetning</strong> kan ikkje.</p>",
        "<p><strong>Konjunksjonar</strong> bind saman heilsetningar: berre <em class=\"nn\">og, men, eller, for</em></p>",
        "<p><strong>Subjunksjonar</strong> innleier leddsetningar: <em class=\"nn\">at, fordi, når, då, som, dersom, sjølv om</em></p>",
      ],
      notes: "Hugseregelen er at konjunksjonane er få: <em>og, men, eller, for</em>. Alle andre bindeord som innleier ei setning, er subjunksjonar. I tavleøvinga kjem òg preposisjonar: ord som står framfor eit substantiv utan verbal, som <em>etter maten</em>.",
    },
    {
      type: "drill",
      title: "Heilsetning eller leddsetning?",
      intro: "Kan delen stå åleine? Manglar ho verbal?",
      spec: { bank: "sentences", set: "heilLedd", mode: "choice" },
      n: 5,
      notes: "Lat elevane lese delen høgt åleine: gir han meining? Svaralternativet «berre eit ledd» gjeld delar utan verbal, som <em>i går kveld</em>.",
    },
    {
      type: "drill",
      title: "Konjunksjon eller subjunksjon?",
      intro: "Bind ordet saman heilsetningar, innleier det ei leddsetning, eller står det framfor eit substantiv?",
      spec: { bank: "sentences", set: "konjSubj", mode: "choice" },
      n: 6,
      notes: "Fingerrunde: éin for konjunksjon, to for subjunksjon, tre for preposisjon. Ord som <em>etter</em> og <em>før</em> kan vere både subjunksjon og preposisjon. Spør då: kjem det eit verbal etter?",
    },
    {
      type: "diskuter",
      title: "Kva er gale?",
      prompt: `<p class="stor"><em>Då han kom heim, han åt middag.</em></p>
        <p>Kvifor trur du mange skriv slik? Korleis skal det vere?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "<em class=\"nn\">Då han kom heim, åt han middag.</em> Leddsetninga tel som eitt ledd på plass 1, så verbalet må stå på plass 2, rett etter kommaet. Mange skriv feil fordi engelsk har subjektet først: <em>When he came home, he ate dinner.</em>",
      notes: "V2-regelen: i ei forteljande heilsetning står verbalet på andreplass, same kva som står først. Elevar med anna morsmål enn norsk bommar ofte her. Tel ledda høgt med fingrane: éin er heile leddsetninga, to er verbalet.",
    },
    {
      type: "drill",
      title: "Verbalet på andreplass",
      intro: "Vel rett rekkjefølgje. Tommel opp eller ned for kvart alternativ.",
      spec: { bank: "sentences", set: "v2", mode: "choice" },
      n: 5,
      notes: "Peik på alternativa eitt om gongen og la klassen stemme. Be ein elev telje ledda i det rette alternativet: kva står på plass 1, og kva står på plass 2?",
    },
    {
      type: "drill",
      title: "Kvar står «ikkje»?",
      intro: "Heilsetning: etter verbalet. Leddsetning: framfor verbalet.",
      spec: { bank: "sentences", set: "ikkjePlass", mode: "choice" },
      n: 5,
      notes: "Lat elevane lese alle alternativa høgt før dei vel. Øyret hjelper ofte. Minn om ikkje-testen: han kan også brukast til å finne ut om noko er ei leddsetning.",
    },
    {
      type: "drill",
      title: "Predikativet rettar seg etter subjektet",
      intro: "Bøy adjektivet i parentesen. Skriv på mini-tavla.",
      spec: { bank: "sentences", set: "predikativ", mode: "type" },
      n: 6,
      notes: "Tips til elevane: finn subjektet og set adjektivet framfor det. <em>Huset er (stor)</em> blir <em>eit stort hus</em>, altså <em>Huset er stort</em>. Fleirtal får <em>-e</em>: <em>Bøkene er gamle</em>.",
    },
    {
      type: "oppgave",
      title: "1. Verbal og subjekt",
      body: `<p>Skriv verbalet og subjektet i kvar setning.</p>
        <ol>
          <li>Kari les ei bok.</li>
          <li>I går kjøpte vi is.</li>
          <li>Ho har lese boka.</li>
          <li>No kjem toget.</li>
          <li>Etter middagen gjekk barna ut.</li>
          <li>Bestemor til Kari bur i Bergen.</li>
        </ol>`,
      form: "Åleine",
      tid: 4,
      svar: "1 les, Kari · 2 kjøpte, vi · 3 har lese, Ho · 4 kjem, toget · 5 gjekk, barna · 6 bur, Bestemor til Kari",
      notes: "Minn om rekkjefølgja: verbalet først, så «kven eller kva + verbalet?». I nr. 2, 4 og 5 står subjektet etter verbalet. I nr. 6 er heile <em>Bestemor til Kari</em> subjektet.",
    },
    {
      type: "oppgave",
      title: "2. Kva ledd er det?",
      body: `<p>Kva ledd er orda i feit skrift? Vel mellom subjekt, objekt, indirekte objekt, predikativ og adverbial.</p>
        <ol>
          <li>Kari gav <strong>guten</strong> ei bok.</li>
          <li>Mor mi er <strong>lærar</strong>.</li>
          <li><strong>Hunden</strong> jaga katten.</li>
          <li>Vi kjøpte is <strong>på stranda</strong>.</li>
          <li>Læraren viste oss <strong>filmen</strong>.</li>
          <li>Barna vart <strong>trøytte</strong>.</li>
        </ol>`,
      form: "Åleine",
      tid: 4,
      svar: "1 indirekte objekt · 2 predikativ · 3 subjekt · 4 adverbial · 5 objekt · 6 predikativ",
      notes: "Be elevane skrive spørsmålet dei stilte ved sida av svaret, til dømes «til kven gav Kari?» i nr. 1. Då ser du om dei grunngir eller gjettar.",
    },
    {
      type: "oppgave",
      title: "3. Rett ordstillinga",
      body: `<p>Skriv setningane med rett ordstilling.</p>
        <ol>
          <li>I går han kom heim.</li>
          <li>Då han kom heim, han åt middag.</li>
          <li>Dersom det regnar, vi blir inne.</li>
          <li>Han kom ikkje fordi han ville ikkje.</li>
          <li>Ho sa at ho kom ikkje.</li>
          <li>Eg kjenner ein gut som gir aldri opp.</li>
        </ol>`,
      form: "Åleine, så samanlikn med sidemannen",
      tid: 4,
      svar: "1 I går <strong>kom han</strong> heim. 2 Då han kom heim, <strong>åt han</strong> middag. 3 Dersom det regnar, <strong>blir vi</strong> inne. 4 … fordi han <strong>ikkje ville</strong>. 5 … at ho <strong>ikkje kom</strong>. 6 … som <strong>aldri gir</strong> opp.",
      notes: "Dei tre første handlar om V2: verbalet på andreplass. Dei tre siste handlar om <em>ikkje</em> og <em>aldri</em> i leddsetningar: framfor verbalet.",
    },
    {
      type: "oppgave",
      title: "4. Predikativ",
      body: `<p>Bøy adjektivet etter subjektet.</p>
        <div class="to-kol stor">
          <ol><li>Huset er (stor).</li><li>Bilen er (stor).</li><li>Bøkene er (gammal).</li><li>Barna er (glad).</li></ol>
          <ol start="5"><li>Eplet er (raud).</li><li>Vêret vart (kald).</li><li>Gutane vart (trøytt).</li><li>Suppa er (varm).</li></ol>
        </div>`,
      form: "Åleine",
      tid: 3,
      svar: "1 stort · 2 stor · 3 gamle · 4 glade · 5 raudt · 6 kaldt · 7 trøytte · 8 varm",
      notes: "Knepet: set adjektivet framfor subjektet. <em>eit stort hus</em>, altså <em>Huset er stort</em>. Hokjønn og hankjønn i eintal får inga ending: <em>Bilen er stor, Suppa er varm</em>.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Finn <strong>verbalet</strong> først, så spør du deg fram.</p>",
        "<p class=\"stor\">Verbalet står på <strong>andreplass</strong> i heilsetninga.</p>",
        "<p class=\"stor\">I leddsetninga står <em class=\"nn\">ikkje</em> <strong>framfor</strong> verbalet.</p>",
      ],
      notes: "Exit-lapp: be elevane skrive ei setning som byrjar med ei leddsetning, med rett ordstilling. Då ser du om V2-regelen sit.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Ei treningsøkt i setningslære der klassen repeterer framgangsmåten frå modulen Setningslære og øver i fellesskap på å finne verbal og subjekt, kjenne att ledda, skilje heilsetning og leddsetning, og få ordstillinga rett. Tavleøvingane trekkjer setningar frå oppgåvebanken i kurset, så økta kan gjerast fleire gonger. Til slutt løyser elevane oppgåver i skriveboka, med fasit på tavla, så heile økta kan gjennomførast utan PC.</p>",
    mal: [
      "Elevane kan finne verbalet og subjektet i ei setning, også når subjektet står etter verbalet.",
      "Elevane kan kjenne att dei vanlege setningsledda og grunngi svaret med faste spørsmål.",
      "Elevane kan skilje heilsetning frå leddsetning og konjunksjon frå subjunksjon.",
      "Elevane kan bruke V2-regelen og plassere <em class=\"nn\">ikkje</em> rett.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør ha arbeidd med modulen Setningslære og kjenne omgrepa verbal, subjekt, objekt og adverbial.",
    forebuing: [
      "Test tavleøvingane på førehand og prøv knappen «Nye oppgåver».",
      "Ha mini-tavler eller ark klare, og bestem korleis du deler klassen i to lag til lysbilete 7.",
      "Ha små lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Oppstart", min: 3, gjer: "<p>Gå gjennom planen og repeter framgangsmåten i kor.</p>", lysbilete: "2 og 3" },
      { fase: "Verbal, subjekt og ledd", min: 9, gjer: "<p>Skriftlege rundar med verbal og subjekt, spørsmålet om subjektet etter verbalet og lagkonkurransen om ledda.</p>", lysbilete: "4 til 7" },
      { fase: "Heilsetning og leddsetning", min: 6, gjer: "<p>Repeter setningsboksane og bindeorda, og ta rundane om heilsetning, leddsetning og bindeord.</p>", lysbilete: "8 til 10" },
      { fase: "Ordstilling og samsvar", min: 8, gjer: "<p>Diskuter feilen med V2, ta rundane om V2 og <em class=\"nn\">ikkje</em>, og ein skriftleg runde med predikativ.</p>", lysbilete: "11 til 14" },
      { fase: "Eigentrening", min: 16, gjer: "<p>Elevane løyser fire oppgåver i skriveboka: verbal og subjekt, ledd, ordstilling og predikativ. Vis fasiten etter kvar oppgåve, og la elevane rette sjølve.</p>", lysbilete: "15 til 18" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og samle inn exit-lappane.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Subjektet er det første ordet i setninga.»", hjelp: "Vis ei setning som byrjar med eit adverbial: <em class=\"nn\">I går kjøpte guten sko.</em> Finn verbalet først og spør «kven kjøpte?»." },
      { feil: "«Verbalet i <em class=\"nn\">Ho har lese boka</em> er <em class=\"nn\">har</em>.»", hjelp: "Verbalet kan vere fleire ord. Alle verba som høyrer saman, er verbalet: <em class=\"nn\">har lese</em>." },
      { feil: "«Då han kom heim, han åt middag.»", hjelp: "Leddsetninga tel som eitt ledd på plass 1. Verbalet må stå på plass 2: <em class=\"nn\">Då han kom heim, åt han middag.</em>" },
      { feil: "«… fordi han ville ikkje.»", hjelp: "I leddsetningar står <em class=\"nn\">ikkje</em> framfor verbalet: <em class=\"nn\">fordi han ikkje ville</em>." },
    ],
    samtale: [
      "Kvifor er det lurt å finne verbalet før subjektet?",
      "Kvifor trur du mange set subjektet først sjølv når setninga byrjar med eit adverbial?",
      "Korleis kan setningslæra hjelpe deg når du les korrektur på din eigen tekst?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei huskelapp med dei fem spørsmåla i rekkjefølgje.",
        "La elevar som slit, gjere oppgåve 1 og 4 grundig før dei tek fatt på dei andre.",
        "La elevane markere ledda med fargar når dei skriv av setningane i skriveboka.",
      ],
      utfordring: [
        "La elevane som blir tidleg ferdige, skrive tre eigne setningar som byrjar med ei leddsetning, med rett ordstilling.",
        "La elevane finne fem setningar i ein eigen tekst som byrjar med noko anna enn subjektet, og sjekke V2.",
      ],
    },
    vurdering: [
      "Mini-tavlene og oppgåve 1 i skriveboka viser om grunnlaget med verbal og subjekt sit.",
      "Bonuspoenga i lagkonkurransen viser om elevane kan grunngi ledda, ikkje berre gjette.",
      "Kjenneteikn på god måloppnåing: eleven brukar V2 rett etter innleiande leddsetningar og plasserer <em class=\"nn\">ikkje</em> rett i eigne tekstar.",
    ],
    vidare: "Følg opp med modulen om setningsbygnad under Typiske feil i Del 4, der elevane brukar setningslæra til å rette tekstar, og med blandingsøkta. Mengdetreninga Setningslære: ledd, setningar og ordstilling i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});

Larar.register("trening-blanda", {
  tittelnotat: "Blandingsøkta er ein test på om kunnskapen sit når alt kjem om kvarandre, slik det gjer når vi skriv. Bruk ho som oppvarming før ein skrivetime eller som repetisjon før ei prøve. Sei til elevane at feila i dag er gull verdt: dei viser kva kvar enkelt bør trene meir på.",
  slides: [
    {
      title: "Blandingsøkt",
      body: `<ul class="stor">
        <li>substantiv, verb, adjektiv og småord om kvarandre</li>
        <li>setningar med pronomen, då/når og ordstilling</li>
        <li>finn feila i ein kort tekst</li>
        <li>kva skal <strong>du</strong> trene meir på?</li>
      </ul>`,
      notes: "Fortel at økta er bygd som ein konkurranse i tre rundar, lag mot lag. Del klassen i to eller fire lag før de byrjar. Hald ei poengtavle på sida av tavla.",
    },
    {
      type: "diskuter",
      title: "Kva feil gjer du oftast?",
      prompt: `<p class="stor">Kva nynorskfeil trur du at du sjølv gjer oftast?</p>
        <p>Skriv det ned før vi byrjar. Vi ser om du hadde rett til slutt.</p>`,
      form: "Tenk sjølv, så fortel sidemannen",
      tid: 2,
      notes: "Poenget er at elevane skal bli bevisste på eigne feil. Be dei skrive gjetninga si på ein lapp. I avslutninga samanliknar dei med kva dei faktisk bomma på i tavlerundane og i oppgåvene i skriveboka.",
    },
    {
      title: "Sjekklista",
      steps: [
        "<p class=\"stor\">Substantiv: <em class=\"nn\">jenta, boka, husa</em></p>",
        "<p class=\"stor\">Verb: <em class=\"nn\">kasta, høyrde, skreiv</em>, og <em class=\"nn\">skriv</em> i presens</p>",
        "<p class=\"stor\">Adjektiv: <em class=\"nn\">eit stort hus, eit vanleg hus, finare, finast</em></p>",
        "<p class=\"stor\">Småord: <em class=\"nn\">ikkje, berre, kva, nokon, då</em></p>",
        "<p class=\"stor\">Ordstilling: verbalet på <strong>andreplass</strong></p>",
      ],
      notes: "Gå raskt gjennom lista, eitt punkt om gongen. For kvart punkt kan du spørje: kva er den vanlegaste feilen her? Svara er <em class=\"bm\">jenten</em>, <em class=\"bm\">kastet</em>, <em class=\"bm\">skriver</em>, <em class=\"bm\">vanligt</em>, <em class=\"bm\">ikke</em> og subjektet på plass 2.",
    },
    {
      type: "drill",
      title: "Runde 1: alt om kvarandre",
      intro: "Lag mot lag. Rett svar gir eitt poeng.",
      spec: {
        mix: [
          { bank: "nouns", tasks: ["gender", "defSg", "indefPl", "defPl"] },
          { bank: "verbs", tasks: ["pres", "pret", "perf"] },
          { bank: "adjectives", tasks: ["neuter", "plural", "comp", "sup"] },
          { bank: "words", tasks: ["bm2nn"] },
        ],
        mode: "mixed",
      },
      n: 8,
      notes: "Laga svarer annankvar gong og får ti sekund til å rådføre seg. Svarer laget feil, kan det andre laget stele poenget. Legg merke til kva slags oppgåver som går gale: substantiv, verb, adjektiv eller småord. Det bruker du på lysbilete 10.",
    },
    {
      type: "sporsmal",
      question: "Kva for ei setning er skriven rett?",
      options: [
        "<em>Jenten kasta ballen til dei.</em>",
        "<em>Jenta kastet ballen til dei.</em>",
        "<em>Jenta kasta ballen til dei.</em>",
        "<em>Jenta kasta ballen til dem.</em>",
      ],
      correct: 2,
      explain: "<em class=\"nn\">Jenta kasta ballen til dei.</em> Hokjønn får <em class=\"nn\">-a</em>, a-verb får <em class=\"nn\">-a</em> i preteritum, og <em class=\"bm\">dem</em> heiter <em class=\"nn\">dei</em> på nynorsk.",
      notes: "Fingerrunde, éin til fire. Kvart feil alternativ har éin feil. Be elevane som valde rett, peike ut feilen i dei tre andre.",
    },
    {
      type: "drill",
      title: "Runde 2: setningar",
      intro: "Pronomen, noko/nokon, då/når, kvar/kor, sin/hans og setningslære.",
      spec: { bank: "sentences", mode: "mixed" },
      n: 8,
      notes: "Same lagreglar som i runde 1. Her kjem oppgåver frå alle setningssetta, også setningslære. Be laget grunngi svaret for eit bonuspoeng.",
    },
    {
      type: "diskuter",
      title: "Runde 3: finn feila",
      prompt: `<p>I går skrev eg eit brev til bestemor. Da eg kom heim, eg åt middag med jenten som bur ved sida av oss. Huset hennar er stor, men ho har ikke nokon hage.</p>
        <p class="stor">Det er seks feil. Finn alle!</p>`,
      form: "Laget samarbeider",
      tid: 3,
      svar: "<em class=\"nn\">skreiv</em> (sterkt verb), <em class=\"nn\">Då</em> (éin gong i fortida), <em class=\"nn\">åt eg</em> (verbalet på andreplass), <em class=\"nn\">jenta</em> (hokjønn), <em class=\"nn\">stort</em> (predikativ etter <em class=\"nn\">huset</em>), <em class=\"nn\">ikkje</em>.",
      notes: "Laga skriv ned feila og rettingane. Eitt poeng per feil dei finn og rettar, og minuspoeng for ting som var rette. <em>nokon hage</em> er rett: hankjønn i ei nekting. Mange går i den fella og tel det som feil.",
    },
    {
      type: "drill",
      title: "Finalerunde",
      intro: "Éi oppgåve per lag. Det laget som leiar, byrjar.",
      spec: {
        mix: [
          { bank: "nouns", tasks: ["gender", "defSg", "indefPl", "defPl"] },
          { bank: "verbs", tasks: ["pres", "pret", "perf"] },
          { bank: "adjectives", tasks: ["neuter", "plural", "comp", "sup"] },
          { bank: "words", tasks: ["bm2nn"] },
        ],
        mode: "mixed",
      },
      n: 6,
      notes: "Trykk «Nye oppgåver» om du vil ha andre ord enn i runde 1. Finalen kan gi dobbelt poeng, så laget som ligg bak, har noko å kjempe for. Kår vinnaren før de går vidare.",
    },
    {
      title: "Kva bomma vi på?",
      body: `<table>
          <thead><tr><th>Bomma du på …</th><th>Sjå ekstra godt etter i …</th></tr></thead>
          <tbody>
            <tr><td>kjønn, fleirtal og verbformer</td><td>oppgåve 1</td></tr>
            <tr><td><em class="nn">-t</em>, <em class="nn">-are</em>, <em class="nn">-ast</em> og småord</td><td>oppgåve 2</td></tr>
            <tr><td>pronomen, <em class="nn">då/når</em>, <em class="nn">kvar/kor</em></td><td>oppgåve 3</td></tr>
            <tr><td>ordstilling</td><td>oppgåve 4, din eigen tekst</td></tr>
          </tbody>
        </table>`,
      notes: "Spør klassen: kva slags oppgåver gjekk dårlegast i dag? Samanlikn med det du noterte i runde 1 og 2. Be kvar elev sjå på lappen frå starten: hadde dei rett i kva feil dei gjer oftast? Tabellen viser kvar i oppgåvene som kjem, dei skal vere ekstra merksame.",
    },
    {
      type: "oppgave",
      title: "1. Substantiv og verb",
      body: `<p>Skriv forma.</p>
        <div class="to-kol">
          <ol><li>bestemt eintal: <em class="nn">ei jente</em></li><li>bestemt fleirtal: <em class="nn">eit år</em></li><li>ubestemt fleirtal: <em class="nn">ei hand</em></li><li>bestemt fleirtal: <em class="nn">ein gut</em></li><li>bestemt eintal: <em class="nn">ei bok</em></li></ol>
          <ol start="6"><li>preteritum: <em class="nn">kaste</em></li><li>presens: <em class="nn">skrive</em></li><li>preteritum: <em class="nn">høyre</em></li><li>perfektum: <em class="nn">finne</em></li><li>presens: <em class="nn">kome</em></li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 jenta · 2 åra · 3 hender · 4 gutane · 5 boka · 6 kasta · 7 skriv · 8 høyrde · 9 har funne · 10 kjem",
      notes: "Elevane rettar sjølve med ein annan farge og tel kor mange dei hadde rett. Dei skriv talet i margen, så dei ser kva del som gjekk dårlegast til slutt.",
    },
    {
      type: "oppgave",
      title: "2. Adjektiv og småord",
      body: `<p>Skriv rett form, eller skriv ordet på nynorsk.</p>
        <div class="to-kol">
          <ol><li>eit (vanleg) hus</li><li>eit (stor) hus</li><li>komparativ: <em class="nn">fin</em></li><li>superlativ: <em class="nn">gammal</em></li><li>mange (gammal) bøker</li></ol>
          <ol start="6"><li><em class="bm">ikke</em></li><li><em class="bm">hvordan</em></li><li><em class="bm">bare</em></li><li><em class="bm">fra</em></li><li><em class="bm">hjemme</em></li></ol>
        </div>`,
      form: "Åleine",
      tid: 5,
      svar: "1 vanleg · 2 stort · 3 finare · 4 eldst · 5 gamle · 6 ikkje · 7 korleis · 8 berre · 9 frå · 10 heime",
      notes: "Same framgangsmåte: rett med ein annan farge og skriv talet på rette svar i margen.",
    },
    {
      type: "oppgave",
      title: "3. Set inn rett ord",
      body: `<p>Skriv setninga med rett ord.</p>
        <ol>
          <li>Eg såg ___ i går. (ho / henne)</li>
          <li>___ eg var liten, budde vi i Bergen. (då / når)</li>
          <li>___ gammal er du? (kvar / kor)</li>
          <li>Vil du ha ___ kaffi? (nokon / noko / nokre)</li>
          <li>Jentene henta ___ jakker. (sine / deira)</li>
          <li>___ er trøytte etter turen. (dei / de)</li>
        </ol>`,
      form: "Åleine",
      tid: 4,
      svar: "1 henne · 2 Då · 3 Kor · 4 noko · 5 sine · 6 Dei",
      notes: "Når fasiten kjem, be elevar som svara rett, seie regelen: objektsform, éin gong i fortida, grad, mengd, eigaren er subjektet, andre personar.",
    },
    {
      type: "oppgave",
      title: "4. Skriv sjølv",
      body: `<p class="stor">Skriv fem eller seks setningar om kva du gjorde i helga.</p>
        <ul>
          <li>Bruk minst tre verb i preteritum.</li>
          <li>Bruk eitt adjektiv i inkjekjønn.</li>
          <li>Byrj éi setning med <em class="nn">Då …</em></li>
          <li>Les over med sjekklista før du er ferdig.</li>
        </ul>`,
      form: "Åleine, så byt med sidemannen",
      tid: 6,
      notes: "Etter fire minutt byter elevane bok med sidemannen og ser etter feil frå sjekklista på lysbilete 4. Bla gjerne tilbake dit. Sjå særleg etter ordstillinga etter <em>Då …</em>: <em>Då eg kom heim, åt eg middag</em>.",
    },
    {
      title: "Til neste gong du skriv",
      steps: [
        "<p class=\"stor\">Skriv ned <strong>éin</strong> feil du vil sjå etter i neste tekst.</p>",
        "<p class=\"stor\">Les sjekklista <strong>før</strong> du skriv, som oppvarming.</p>",
      ],
      notes: "Exit-lapp: elevane skriv den eine feilen dei vil sjå etter, og leverer lappen i døra. Del lappane ut att før neste skrivetime, så dei har sjekkpunktet sitt klart.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Blandingsøkta samlar alt frå mengdetreninga: substantiv, verb, adjektiv, småord og setningar om kvarandre. Presentasjonen er bygd som ein lagkonkurranse i tre rundar med ein kort tekst der elevane skal finne feila. Etterpå løyser elevane oppgåver i skriveboka, med fasit på tavla, og skriv ein kort tekst sjølve. Heile økta kan gjennomførast utan PC. Målet er at kvar elev finn ut kva han eller ho bør trene meir på. Økta passar som oppvarming før ein skrivetime, som repetisjon før ei prøve, eller som ein avslutning på arbeidet med grammatikken i Del 2.</p>",
    mal: [
      "Elevane kan bruke rette former av substantiv, verb, adjektiv og småord når oppgåvene kjem om kvarandre.",
      "Elevane kan finne og rette typiske bokmålsfeil og ordstillingsfeil i ein kort tekst.",
      "Elevane kan vurdere kva dei sjølve bør trene meir på.",
    ],
    lareplan: [11, 12],
    forkunnskapar: "Elevane bør ha hatt dei fleste treningsøktene i Del 2, eller i alle fall ha arbeidd med grammatikken om substantiv, verb, adjektiv og pronomen.",
    forebuing: [
      "Test tavleøvingane på førehand og prøv knappen «Nye oppgåver».",
      "Bestem laginndelinga og lag ei enkel poengtavle på sida av tavla.",
      "Ha lappar klare til gjetninga i starten og exit-lappen til slutt.",
      "Sjå til at elevane har skrivebok og ein penn i ein annan farge til å rette med.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Del inn i lag, la elevane gjette kva feil dei sjølve gjer oftast, og gå raskt gjennom sjekklista.</p>", lysbilete: "2 til 4" },
      { fase: "Runde 1 og 2", min: 7, gjer: "<p>Lagkonkurranse med ord og former, spørsmålet med fire setningar og setningsrunden.</p>", lysbilete: "5 til 7" },
      { fase: "Runde 3 og finale", min: 6, gjer: "<p>Laga finn dei seks feila i teksten, og så kjem finalerunden.</p>", lysbilete: "8 og 9" },
      { fase: "Refleksjon", min: 2, gjer: "<p>Klassen ser på kva som gjekk dårlegast, og kvar elev samanliknar med gjetninga si.</p>", lysbilete: "10" },
      { fase: "Eigentrening", min: 24, gjer: "<p>Elevane løyser tre korte oppgåver i skriveboka og rettar sjølve etter fasiten. Til slutt skriv dei fem eller seks setningar om helga og byter med sidemannen for å sjå etter feil frå sjekklista.</p>", lysbilete: "11 til 14" },
      { fase: "Avslutning", min: 2, gjer: "<p>Exit-lapp med éin feil eleven vil sjå etter i neste tekst.</p>", lysbilete: "15" },
    ],
    misoppfatningar: [
      { feil: "«Eg kan reglane, så eg treng ikkje trene.»", hjelp: "Blandingsrunden viser skilnaden på å kunne ein regel og å bruke han når alt kjem om kvarandre. Samanlikn resultatet med gjetninga frå starten." },
      { feil: "«Har ikke nokon hage» blir retta til «ikkje noko hage».", hjelp: "<em class=\"nn\">hage</em> er hankjønn, så i spørsmål og nekting heiter det <em class=\"nn\">nokon hage</em>. <em class=\"nn\">noko</em> brukar vi om inkjekjønnsord og mengd." },
      { feil: "«Da eg kom heim, eg åt …»", hjelp: "To feil på éin gong: <em class=\"bm\">da</em> finst ikkje på nynorsk, og verbalet skal stå på andreplass: <em class=\"nn\">Då eg kom heim, åt eg …</em>" },
      { feil: "«Huset hennar er stor.»", hjelp: "Predikativet rettar seg etter subjektet: <em class=\"nn\">huset</em> er inkjekjønn, så det heiter <em class=\"nn\">stort</em>." },
    ],
    samtale: [
      "Kvifor er det vanskelegare å skrive rett når alt kjem om kvarandre enn når du øver på éin ting?",
      "Hadde du rett i kva feil du gjer oftast? Kva overraska deg?",
      "Korleis kan du bruke det du lærte i dag neste gong du skriv ein tekst på nynorsk?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane sjekklista frå lysbilete 4 som huskelapp.",
        "La elevar som skriv seint, gjere oppgåve 1 til 3 og skrive tre setningar i oppgåve 4.",
        "Sett saman laga slik at sterke og svake elevar er fordelte.",
      ],
      utfordring: [
        "Utfordre elevane til å skrive teksten i oppgåve 4 utan éin einaste feil, og til å bruke minst tre leddsetningar.",
        "La elevane skrive sin eigen «finn feila»-tekst med seks feil til eit anna lag.",
      ],
    },
    vurdering: [
      "Poengtavla og notata dine frå runde 1 og 2 viser kva område klassen samla sett er svakast på.",
      "Talet på rette svar i margen i oppgåve 1 til 3 og teksten i oppgåve 4 gir eit raskt bilete av kvar enkelt elev.",
      "Kjenneteikn på god måloppnåing: eleven har nesten alt rett i oppgåve 1 til 3, finn alle seks feila i teksten og skriv ein eigen tekst med få feil.",
    ],
    vidare: "Bruk blandingsøkta som fast oppvarming før skrivetimar. Følg opp med den treningsøkta som passar feila klassen gjorde, og med Typiske feil i Del 4. Blandingsøkta og dei andre mengdetreningane i kurset kan elevane bruke på PC som frivillig lekse.",
  },
});
