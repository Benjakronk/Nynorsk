/* Vurdering for Del 4: Skriving og tekstarbeid. Formatet står i larer/README.md under «Vurdering». */
Vurdering.register(4, {
  intro: `<p>Del 4 er den delen av kurset som viser kompetansen i skriftleg sidemål tydelegast. Her skriv elevane eigne tekstar på nynorsk og arbeider med dei feila som oftast går att. Delen har to grupper: <strong>Skriving</strong> (omsetjing, korte tekstar og lengre tekstar) og <strong>Typiske feil</strong> (skrivereglar, bøying, bokmålsord, småord, setningsbygnad og rettelesing).</p>
    <p>Vurderingane heng saman slik:</p>
    <ul>
      <li><strong>Undervegs:</strong> Kvar modul har ei kort oppgåve til slutten av økta. Ho viser kva eleven meistrar no, og gir grunnlag for framovermelding. Ho skal ikkje ha karakter.</li>
      <li><strong>Skriveoppgåve i sidemål:</strong> Ein heil tekst skriven under like vilkår, bygd opp som skrivedelen på eksamen. Dette er den viktigaste vurderinga i delen og eignar seg godt i karaktergrunnlaget.</li>
      <li><strong>Rettelesingsprøve:</strong> Ein kort tekst med 16 planta feil. Prøva viser om eleven kjenner att og kan rette dei vanlegaste feiltypane, og om eleven kan forklare reglane med fagomgrep.</li>
      <li><strong>Skrivemappe:</strong> Første utkast, revidert tekst og ein feillogg med refleksjon. Mappa viser om eleven kan arbeide vidare med eigen tekst og kjenner sine eigne typiske feil.</li>
    </ul>
    <p>Skriveoppgåva og mappa viser sidemålskompetansen i samanhengande tekst og bør vege tyngst. Rettelesingsprøva viser ein del av kompetansen, nemleg formverk og rettskriving i ein tekst eleven ikkje har skrive sjølv.</p>`,

  lareplan: [10, 11, 12, 13, 6],

  kompetanse: `<p>Etter Del 4 skal eleven kunne skrive tekstar på nynorsk i ulike sjangrar og for ulike formål, tilpassa mottakaren. Eleven skal bøye verb, substantiv, adjektiv og pronomen etter nynorskreglane, bruke nynorske ord og småord, binde teksten saman og setje teikn rett. Eleven skal kunne lese korrektur på eigen og andre sin tekst, rette feil med grunngiving og skrive om tung bokmålsprega stil til naturleg nynorsk. Kjenneteikna under er skrivne for samanhengande tekstar eleven skriv sjølv.</p>`,

  kjenneteikn: [
    {
      omrade: "Innhald, sjanger og formål",
      lag: "Teksten svarer delvis på oppgåva. Eleven bruker nokre trekk ved sjangeren, men formålet og mottakaren kjem lite fram.",
      middels: "Teksten svarer på oppgåva og har relevant innhald. Eleven bruker sentrale trekk ved sjangeren og tilpassar tonen til mottakaren.",
      hog: "Teksten svarer presist på oppgåva og har innhald som er utdjupa og godt valt. Eleven bruker sjangertrekka medvite og tilpassar innhald og tone tydeleg til mottakar og formål.",
    },
    {
      omrade: "Tekststruktur og tekstbinding",
      lag: "Teksten har ein enkel struktur med byrjing og slutt. Eleven bruker nokre enkle bindeord, til dømes <em class=\"nn\">og, men, så</em>.",
      middels: "Teksten har ein tydeleg struktur med avsnitt som høver til sjangeren. Eleven bruker fleire bindeord og bind setningar og avsnitt saman på ein funksjonell måte.",
      hog: "Teksten har ein heilskapleg og føremålstenleg struktur. Eleven bruker varierte bindeord og overgangar, og tekstbindinga gjer det lett å følgje tankegangen.",
    },
    {
      omrade: "Språkbruk og ordforråd på sidemålet",
      lag: "Eleven har eit enkelt ordforråd og bruker enkelte ord og uttrykk som er typiske for nynorsk. Fleire bokmålsord blir ståande.",
      middels: "Eleven har eit relevant ordforråd, bruker sentrale nynorske ord og uttrykk og uttrykkjer seg tenleg. Få bokmålsord, og setningane er stort sett naturlege på nynorsk.",
      hog: "Eleven har eit variert ordforråd og bruker relevante nynorske ord og uttrykk med presisjon og variasjon. Eleven vel gjerne nynorske alternativ framfor tunge konstruksjonar som s-genitiv og substantivsjuke.",
    },
    {
      omrade: "Ordbøying på sidemålet",
      lag: "Eleven meistrar sentrale reglar for ordbøying, til dømes <em class=\"nn\">-a</em> på hokjønnsord i bestemt form og nynorske pronomen, men har mange feil i verb og fleirtal.",
      middels: "Eleven meistrar hovudreglane for ordbøying: a-verb, sterke verb i presens, bestemt form av substantiv og samsvar i adjektivet. Feila følgjer gjerne eitt eller to mønster.",
      hog: "Eleven meistrar i hovudtrekk ordbøyinga, også i mindre vanlege verb og ord. Eleven held seg konsekvent til dei valfrie formene han har valt.",
    },
    {
      omrade: "Rettskriving og teiknsetjing",
      lag: "Eleven meistrar sentrale reglar for rettskriving og teiknsetjing, til dømes punktum og stor forbokstav, men har ein del særskriving og manglande komma.",
      middels: "Eleven meistrar reglar for rettskriving og sentrale reglar for teiknsetjing, til dømes komma før <em class=\"nn\">men</em> og etter leddsetning først i setninga.",
      hog: "Eleven meistrar reglar for rettskriving og i hovudtrekk reglar for teiknsetjing, også replikkteikn og komma ved innskotne leddsetningar.",
    },
    {
      omrade: "Korrektur og arbeid med eigen tekst",
      lag: "Eleven rettar nokre feil når han får peikt på dei, mest bokmålsord som <em class=\"bm\">ikke</em> og <em class=\"bm\">jeg</em>.",
      middels: "Eleven finn og rettar dei fleste feila i ein tekst og kan forklare dei vanlegaste reglane med fagomgrep. Eleven kjenner nokre av sine eigne typiske feil.",
      hog: "Eleven les korrektur systematisk, rettar feil utan å overrette jamstilte former og grunngir rettingane presist. Eleven kjenner sine eigne feilmønster og bruker dei når han reviderer.",
    },
  ],

  provar: [
    /* ---------------------------------------------------------------- */
    {
      id: "skriveoppgave-sidemal",
      tittel: "Skriveoppgåve i sidemål",
      type: "skriving",
      tid: "90 minutt (to skuletimar)",
      form: "Individuelt",
      hjelpemiddel: "Ordbok på papir eller ordbokene.no. Stavekontroll på nynorsk om eleven skriv på PC. Ikkje KI-verktøy.",
      karaktergrunnlag: true,
      lareplan: [10, 11, 13, 6],
      modular: ["skriving-omsetjing", "skriving-korte-tekstar", "skriving-lengre-tekstar", "feil-rettelesing"],
      lararinfo: `<p><strong>Føremål.</strong> Oppgåva liknar skrivedelen på eksamen i sidemål etter 10. trinn: eleven vel éi av fire oppgåver i ulike sjangrar, kvar med eit tydeleg formål og ein tydeleg mottakar, og skriv ein heil tekst utan førebuing. Teksten viser kompetansen i skriftleg sidemål betre enn noka anna vurdering i kurset, og han kan inngå i grunnlaget for karakteren i norsk skriftleg (8. og 9. trinn) eller norsk skriftleg sidemål (10. trinn).</p>
        <p><strong>Gjennomføring.</strong> Del ut elevarket og gå gjennom vurderingsområda før elevane byrjar, så dei veit kva som blir vurdert. Elevane skal ikkje førebu seg på temaa. Følg gjerne dei same hjelpemiddelreglane som på eksamen same året, så elevane får øve under like vilkår. Stavekontrollen markerer ikkje ord som finst i ei anna tyding, til dømes <em class="bm">kastet</em> (bestemt form av <em class="nn">kast</em>) der det skal stå <em class="nn">kasta</em>, og han ser ikkje feil val mellom <em class="nn">de</em> og <em class="nn">dei</em> eller <em class="nn">då</em> og <em class="nn">når</em>. Teksten viser difor framleis formverket til eleven.</p>
        <p><strong>Vurdering.</strong> Bruk skjemaet under. Les teksten éin gong for innhald og struktur og éin gong for språket. Rettleiinga under fasit har rettekodar og kjenneteikn på gode svar til kvar oppgåve. Ta omsyn til at elevane har hatt kortare formell opplæring i sidemål enn i hovudmål. Ein tekst som i hovudsak er skriven på bokmål, viser ikkje kompetanse i sidemål.</p>
        <p><strong>Tilpassing.</strong> Elevar med rett til det kan få lengre tid eller skrive med talegjenkjenning. Ei skriveramme gjer det lettare å kome i gang, men då viser teksten mindre om kva eleven får til åleine. Elevar med fritak frå vurdering med karakter i sidemål kan skrive oppgåva og få undervegsvurdering utan karakter.</p>
        <p><strong>Kva oppgåva ikkje viser.</strong> Ho viser ikkje lesekompetanse, og ho viser ikkje korleis eleven arbeider med ein tekst over tid. Det får du sjå i skrivemappa.</p>`,
      elevark: `<p>Vel <strong>éi</strong> av oppgåvene under og skriv teksten på <strong>nynorsk</strong>. Les alle oppgåvene før du vel.</p>
        <p><strong>Rammer:</strong> Du har 90 minutt. Teksten skal vere på om lag 300 til 600 ord. Du kan bruke ordbok. Set av dei siste ti minutta til å lese korrektur.</p>

        <h4>Oppgåve A: Lesarinnlegg (argumentere)</h4>
        <p>Kommunen vil spare pengar og har foreslått å stengje ungdomsklubben to av dei tre kveldane han er open i veka. Skriv eit lesarinnlegg til lokalavisa der du tek eit tydeleg standpunkt i saka.</p>
        <p><em>Mottakar:</em> lesarane av lokalavisa, mellom anna politikarane i kommunestyret.</p>
        <ul>
          <li>Gi innlegget ei overskrift som fangar interessa.</li>
          <li>Få fram standpunktet ditt i innleiinga.</li>
          <li>Bruk minst to argument med døme, og svar på eitt motargument.</li>
          <li>Avslutt med ein konklusjon eller ei oppmoding.</li>
        </ul>

        <h4>Oppgåve B: Novelle (fortelje)</h4>
        <p>Skriv ei novelle som byrjar slik: <em class="nn">«Då eg opna døra, var det første eg såg, ein lapp på golvet.»</em></p>
        <p><em>Mottakar:</em> jamaldringar som les bidraga i ein skrivekonkurranse for ungdom.</p>
        <ul>
          <li>Bruk anslaget til å vekkje eit spørsmål hos lesaren.</li>
          <li>Bygg opp spenning mot eit vendepunkt.</li>
          <li>Bruk skildring og minst to replikkar med rett teiknsetjing.</li>
          <li>Gi novella ein tittel.</li>
        </ul>

        <h4>Oppgåve C: Informerande artikkel (informere)</h4>
        <p>Skriv ein artikkel til nettsida til skulen der du presenterer ein fritidsaktivitet eller ein stad i nærmiljøet for elevar som skal byrje på 8. trinn neste haust.</p>
        <p><em>Mottakar:</em> dei nye elevane og foreldra deira.</p>
        <ul>
          <li>Gi artikkelen ein tittel og ein kort ingress.</li>
          <li>Bruk mellomtitlar.</li>
          <li>Ta med det lesaren treng å vite: kva, kvar, når, kven det passar for og kva det kostar.</li>
          <li>Skriv sakleg, men gjerne slik at lesaren får lyst til å prøve.</li>
        </ul>

        <h4>Oppgåve D: Reflekterande tekst (reflektere)</h4>
        <p>Vi bruker språket ulikt når vi snakkar med vener, skriv meldingar, skriv skuletekstar og les. Skriv ein reflekterande tekst om korleis du sjølv bruker språket i ulike situasjonar, og kva det betyr for deg å kunne skrive på to skriftspråk.</p>
        <p><em>Mottakar:</em> elevar, lærarar og føresette som les ei samling med elevtekstar som skulen gir ut.</p>
        <ul>
          <li>Ta utgangspunkt i eigne erfaringar og konkrete døme.</li>
          <li>Drøft spørsmålet frå fleire sider, og vis kva du sjølv meiner.</li>
          <li>Gi teksten ein tittel og ei avslutning som rundar av tankane dine.</li>
        </ul>

        <h4>Dette blir vurdert</h4>
        <ul>
          <li>Innhald og formål: om teksten svarer på oppgåva og passar til mottakaren.</li>
          <li>Tekststruktur og tekstbinding: avsnitt, oppbygging og bindeord.</li>
          <li>Språkbruk og ordforråd på nynorsk.</li>
          <li>Ordbøying på nynorsk.</li>
          <li>Rettskriving og teiknsetjing.</li>
        </ul>
        <p><strong>Hugs:</strong> Vel éi form når du kan velje, og hald deg til henne gjennom heile teksten, til dømes <em class="nn">vart</em> eller <em class="nn">blei</em>, <em class="nn">kome</em> eller <em class="nn">komme</em>.</p>`,
      fasit: `<h4>Rettleiing til vurderinga</h4>
        <ol>
          <li>Les heile teksten éin gong for innhald, sjanger og struktur før du ser på språket.</li>
          <li>Les éin gong til for språket. Marker feil med rettekodar, så eleven og du ser mønsteret: <strong>B</strong> bøying, <strong>O</strong> bokmålsord, <strong>S</strong> småord og pronomen, <strong>R</strong> rettskriving og særskriving, <strong>T</strong> teiknsetjing. Bruk <strong>N</strong> (nynorsk stil) om s-genitiv, s-passiv utan modalverb og substantivsjuke: dette er ikkje rettskrivingsfeil, men det seier noko om ordforrådet og språkbruken.</li>
          <li>Tel ikkje feil mekanisk. Same feil mange gonger er éin regel eleven ikkje meistrar enno. Mange ulike feiltypar seier meir om nivået enn mange feil av same type.</li>
          <li>Valfrie former er ikkje feil. Nynorskordboka har mange jamstilte former som liknar bokmål, til dømes <em class="nn">begynne, komme, mens, også, sette, blei, derfor, søster, ennå, forskjell, betydning</em>. Slå opp før du rettar. Blandar eleven to jamstilte former i same tekst, er det eit spørsmål om konsekvens, og det veg lite.</li>
          <li>Set nivået ut frå heilskapen i teksten. Skjemaet hjelper deg å sjå kvart område for seg, men kvart område er ikkje eit eige poengtal.</li>
        </ol>
        <h4>Kjenneteikn på eit godt svar</h4>
        <ul>
          <li><strong>A, lesarinnlegg:</strong> tydeleg standpunkt tidleg, argument med konkrete døme frå kvardagen til ungdom, eit motargument som blir svart på (til dømes at kommunen må spare), og ei avslutning som vender seg til politikarane. Saklege appellformer, og patos brukt med måte.</li>
          <li><strong>B, novelle:</strong> anslaget blir følgt opp, spenninga byggjer seg opp mot eit vendepunkt, og skildringar og replikkar viser i staden for å fortelje. Replikkane har rett teiknsetjing og nytt avsnitt ved ny talar. Konsekvent tid, som regel preteritum.</li>
          <li><strong>C, artikkel:</strong> tittel, ingress og mellomtitlar, det viktigaste først, konkret og korrekt informasjon og ein tone som passar for nye elevar og foreldre.</li>
          <li><strong>D, reflekterande tekst:</strong> konkrete døme frå eige liv, fleire sider av saka, eigne meiningar som blir grunngitte, og ei avslutning som samlar tankane. Gjerne refleksjon over sidemålet som ein ressurs og som ei utfordring.</li>
        </ul>
        <h4>Framovermelding</h4>
        <p>Gi to til tre konkrete punkt: eitt om innhald eller struktur og eitt eller to om språket. Vis til modulen som øver på feiltypen eleven har flest av, til dømes Feil i bøying eller Småord og funksjonsord.</p>`,
      skjema: [
        {
          omrade: "Innhald og formål",
          lag: "Teksten svarer delvis på oppgåva. Innhaldet er tynt eller lite relevant, og mottakaren kjem lite fram. Eleven bruker nokre trekk ved sjangeren.",
          middels: "Teksten svarer på oppgåva og har relevant innhald med nokre døme eller detaljar. Sjangertrekka er med, og tonen passar stort sett til mottakaren.",
          hog: "Teksten svarer presist på oppgåva, og innhaldet er utdjupa, godt valt og tilpassa mottakaren. Sjangertrekka er brukte medvite, og eleven viser sjølvstendig tenking eller kreativitet.",
        },
        {
          omrade: "Tekststruktur og tekstbinding",
          lag: "Teksten har byrjing og slutt, men lite avsnittsinndeling. Setningane står ofte etter kvarandre utan bindeord, eller med dei same enkle bindeorda.",
          middels: "Teksten har ein tydeleg struktur med innleiing, hovuddel og avslutning og avsnitt som høver til sjangeren. Bindeord knyter setningar og avsnitt saman.",
          hog: "Strukturen er heilskapleg og tener formålet. Avsnitta har tydelege tema, og varierte bindeord og overgangar gjer at teksten flyt.",
        },
        {
          omrade: "Språkbruk og ordforråd på sidemålet",
          lag: "Enkelt ordforråd med enkelte typiske nynorske ord og uttrykk. Fleire bokmålsord som <em class=\"bm\">ikke, hjem, mye, hverandre</em> blir ståande.",
          middels: "Relevant ordforråd. Eleven bruker sentrale nynorske ord og uttrykk og uttrykkjer seg tenleg. Få bokmålsord, men ein del setningar er bygde som på bokmål.",
          hog: "Variert og presist ordforråd. Eleven bruker relevante nynorske ord og uttrykk og skriv naturleg nynorsk, til dømes med verb i staden for substantivsjuke og <em class=\"nn\">blir</em>-passiv eller aktiv i staden for s-passiv.",
        },
        {
          omrade: "Ordbøying på sidemålet",
          lag: "Eleven meistrar sentrale reglar, til dømes <em class=\"nn\">eg, ikkje</em> og hokjønnsord på <em class=\"nn\">-a</em>, men har mange feil i a-verb, sterke verb og fleirtal av substantiv.",
          middels: "Eleven meistrar hovudreglane for bøying av verb, substantiv og adjektiv. Nokre feil går att, til dømes i sterke verb eller inkjekjønn i fleirtal.",
          hog: "Eleven meistrar i hovudtrekk ordbøyinga, også pronomen og eigedomsord som <em class=\"nn\">de, dykk, hennar, deira</em>. Valfrie former er konsekvente.",
        },
        {
          omrade: "Rettskriving og teiknsetjing",
          lag: "Eleven meistrar sentrale reglar for rettskriving og teiknsetjing, men har fleire særskrivingar, skrivefeil og manglande komma.",
          middels: "Eleven meistrar reglar for rettskriving og sentrale reglar for teiknsetjing, til dømes komma mellom heilsetningar og etter leddsetning først i setninga.",
          hog: "Eleven meistrar reglar for rettskriving og i hovudtrekk reglar for teiknsetjing, også replikkteikn og komma ved innskotne leddsetningar.",
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "rettelesingsprove",
      tittel: "Rettelesingsprøve: finn og rett feila",
      type: "skriftleg",
      tid: "40 minutt",
      form: "Individuelt",
      hjelpemiddel: "Ingen hjelpemiddel",
      karaktergrunnlag: true,
      lareplan: [11, 12],
      modular: ["grammatikk-skriveregler", "feil-boying", "feil-bokmalsord", "feil-smaord", "feil-setning", "feil-rettelesing"],
      lararinfo: `<p><strong>Føremål.</strong> Prøva samlar gruppa Typiske feil. Eleven les ein kort nynorsktekst med 16 planta feil av ulike typar, rettar dei og forklarer fire av rettingane med fagomgrep. Ein bonusdel spør etter to stader der språket er rett, men lite nynorsk i stilen.</p>
        <p><strong>Om teksten.</strong> Utanom dei 16 feila er teksten korrekt nynorsk etter Nynorskordboka. Nokre ord er med for å sjå om eleven overrettar: <em class="nn">begynte, mens, også, blei</em> er jamstilte former, <em class="nn">måtte hentast</em> er s-passiv etter modalverb, <em class="nn">Når eg tenkjer tilbake</em> er rett bruk av <em class="nn">når</em>, og <em class="nn">mobilen sin</em> peikar rett tilbake på subjektet. Teksten bruker <em class="nn">blei</em>, så <em class="nn">vart</em> er ikkje rett som retting nokon stad.</p>
        <p><strong>Stilval er ikkje feil.</strong> S-genitiven <em class="nn">klassens kontaktlærar</em> og s-passiven <em class="nn">biletet visast</em> er tillatne på nynorsk, men lite brukte og tunge. Dei er difor ikkje rekna med i dei 16 feila, men høyrer til bonusdelen. Markerer eleven dei i del 1, flytt dei til del 3 og gi poeng der.</p>
        <p><strong>Kva prøva viser.</strong> Prøva viser om eleven kjenner att feiltypane i ein tekst han ikkje har skrive sjølv. Ho viser ikkje om eleven unngår feila i eigen tekst, så ho bør ikkje stå åleine i karaktergrunnlaget. Sjå kva feiltypar eleven overser, og bruk det i framovermeldinga.</p>
        <p><strong>Tilpassing.</strong> Les teksten høgt for elevar som treng det, eller del han i to ark. Elevar som strevar mykje, kan få vite kva for avsnitt feila står i.</p>`,
      elevark: `<p>Ein elev har skrive denne teksten til skuleavisa. Teksten har <strong>16 feil</strong>. Feila kan vere bøyingsfeil, bokmålsord, feil småord eller pronomen, særskriving og teiknsetjing. Alle ord som ikkje er feil, er rett nynorsk.</p>
        <div style="line-height:2.1">
          <p><strong>Ei veke på fjellet</strong></p>
          <p>I september reiste heile 9B på leirskule i Rondane. Vi tok toget frå Oslo, og frå stasjonen gjekk vi det siste stykket til ei gammal turist hytte. Hytta ligger ved eit lite vatn, langt frå næraste veg.</p>
          <p>Den første dagen gjekk vi opp på Storronden. Turen tok fire timar, og eg veit ikkje kvar mange gonger vi stoppa for å kvile. Når vi endeleg stod på toppen, kunne vi sjå fjellene i alle retningar. Mange begynte å ta bilete med ein gong.</p>
          <p>Om kveldane laga vi mat saman på ein gammal vedomn i stuen. Vatnet måtte hentast i bekken, så det tok lang tid. Nokre elevar klaget over det, men dei fleste syntest det var kjekt å hjelpe hverandre, og vi lo mye. Mens vi venta på maten, fortalde Kari Lie, som er klassens kontaktlærar, om korleis besteforeldra hennes levde på ein fjellgard.</p>
          <p>Kari var streng om morgonen. «No må dei skunde dykk!» ropa ho kvar dag klokka sju.</p>
          <p>Den siste kvelden kom ein rein heilt bort til hytta. Det var eit stor og vakkert dyr. Reinen var ikkje det minste redd. Jonas tok eit bilete av han med mobilen sin, og biletet visast no på storskjermen i klasserommet vårt.</p>
          <p>Då vi kom hjem igjen var alle trøytte. Eg har aldri sovet så godt som den natta. Når eg tenkjer tilbake på turen, er det friheten eg hugsar best. Vi hadde ikkje dekning på mobilen, og ingen visste kva som skjedde i resten av verda. Det var uvant, men også godt. Det blei ei veke vi aldri kjem til å gløyme.</p>
        </div>

        <h4>Del 1: Finn og rett feila (32 poeng)</h4>
        <p>Stryk under kvar feil i teksten. Skriv feilen og rett form i tabellen. Manglar det eit teikn, skriv ordet før og etter og set inn teiknet. Er eit ord delt i to, skriv begge delane i kolonnen for feil. Du får eitt poeng for kvar feil du finn, og eitt poeng for rett form.</p>
        <table>
          <thead><tr><th>Nr.</th><th>Feil i teksten</th><th>Rett form</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td></tr><tr><td>2</td><td></td><td></td></tr><tr><td>3</td><td></td><td></td></tr><tr><td>4</td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td></tr><tr><td>6</td><td></td><td></td></tr><tr><td>7</td><td></td><td></td></tr><tr><td>8</td><td></td><td></td></tr>
            <tr><td>9</td><td></td><td></td></tr><tr><td>10</td><td></td><td></td></tr><tr><td>11</td><td></td><td></td></tr><tr><td>12</td><td></td><td></td></tr>
            <tr><td>13</td><td></td><td></td></tr><tr><td>14</td><td></td><td></td></tr><tr><td>15</td><td></td><td></td></tr><tr><td>16</td><td></td><td></td></tr>
          </tbody>
        </table>

        <h4>Del 2: Forklar (8 poeng)</h4>
        <p>Vel fire av feila du fann, gjerne av ulike typar. Forklar kvifor kvar av dei er feil. Bruk fagomgrep som <em>a-verb, sterkt verb, presens, preteritum, hokjønn, inkjekjønn, bestemt form, fleirtal, subjekt, leddsetning</em>.</p>
        <ol>
          <li><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
        </ol>

        <h4>Del 3: Gjer teksten meir nynorsk (bonus, 2 poeng)</h4>
        <p>I tillegg til dei 16 feila er det to stader i teksten der språket er rett, men lite nynorsk i stilen. Den eine er ein s-genitiv, den andre er ein s-passiv utan modalverb. Finn dei og skriv dei om.</p>
        <div class="skrivelinjer"></div><div class="skrivelinjer"></div>`,
      fasit: `<h4>Del 1: dei 16 feila</h4>
        <table>
          <thead><tr><th>Nr.</th><th>Feil</th><th>Rett form</th><th>Feiltype og regel</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><em class="bm">turist hytte</em></td><td><em class="nn">turisthytte</em></td><td>Særskriving: samansette ord skal skrivast i eitt ord.</td></tr>
            <tr><td>2</td><td><em class="bm">ligger</em></td><td><em class="nn">ligg</em></td><td>Bøying: sterke verb har inga ending i presens.</td></tr>
            <tr><td>3</td><td><em class="bm">kvar</em> mange</td><td><em class="nn">kor</em> mange</td><td>Småord: <em class="nn">kor</em> om grad og mengd, <em class="nn">kvar</em> berre om stad.</td></tr>
            <tr><td>4</td><td><em class="bm">Når</em> vi endeleg stod</td><td><em class="nn">Då</em></td><td>Småord: <em class="nn">då</em> om éi hending i fortida.</td></tr>
            <tr><td>5</td><td><em class="bm">fjellene</em></td><td><em class="nn">fjella</em></td><td>Bøying: inkjekjønnsord får <em class="nn">-a</em> i bestemt form fleirtal.</td></tr>
            <tr><td>6</td><td><em class="bm">stuen</em></td><td><em class="nn">stua</em></td><td>Bøying: hokjønnsord får <em class="nn">-a</em> i bestemt form eintal.</td></tr>
            <tr><td>7</td><td><em class="bm">klaget</em></td><td><em class="nn">klaga</em></td><td>Bøying: a-verb får <em class="nn">-a</em> i preteritum.</td></tr>
            <tr><td>8</td><td><em class="bm">hverandre</em></td><td><em class="nn">kvarandre</em></td><td>Bokmålsord.</td></tr>
            <tr><td>9</td><td><em class="bm">mye</em></td><td><em class="nn">mykje</em></td><td>Bokmålsord.</td></tr>
            <tr><td>10</td><td><em class="bm">hennes</em></td><td><em class="nn">hennar</em></td><td>Pronomen: eigedomsordet heiter <em class="nn">hennar</em>. Ikkje godta <em class="nn">sine</em>, for subjektet i leddsetninga er besteforeldra.</td></tr>
            <tr><td>11</td><td>«No må <em class="bm">dei</em> skunde dykk!»</td><td><em class="nn">de</em></td><td>Pronomen: Kari snakkar til elevane, så subjektet er <em class="nn">de</em>. <em class="nn">Dykk</em> viser det same.</td></tr>
            <tr><td>12</td><td>eit <em class="bm">stor</em> og vakkert dyr</td><td><em class="nn">stort</em></td><td>Bøying: adjektivet får <em class="nn">-t</em> i inkjekjønn eintal.</td></tr>
            <tr><td>13</td><td><em class="bm">hjem</em></td><td><em class="nn">heim</em></td><td>Bokmålsord.</td></tr>
            <tr><td>14</td><td>heim igjen <em class="bm">var</em></td><td>heim igjen<strong>,</strong> var</td><td>Teiknsetjing: komma etter leddsetning som står først i setninga.</td></tr>
            <tr><td>15</td><td><em class="bm">sovet</em></td><td><em class="nn">sove</em></td><td>Bøying: sterke verb har perfektum partisipp på <em class="nn">-e</em> (<em class="nn">har sove</em>).</td></tr>
            <tr><td>16</td><td><em class="bm">friheten</em></td><td><em class="nn">fridomen</em> (eller <em class="nn">fridommen</em>)</td><td>Bokmålsord: ord på <em class="bm">-het</em> finst ikkje. Nynorsk har <em class="nn">fridom</em>.</td></tr>
          </tbody>
        </table>
        <p><strong>Poeng i del 1:</strong> Eitt poeng for å finne feilen og eitt for rett form. Rettar eleven eit ord som var rett, til ei form som er feil, trekk eitt poeng (aldri under 0 i del 1). Byter eleven ei jamstilt form med ei anna, til dømes <em class="nn">begynte</em> til <em class="nn">byrja</em> eller <em class="nn">mens</em> til <em class="nn">medan</em>, gir det verken pluss eller minus. Markerer eleven s-genitiven eller s-passiven, flytt det til del 3.</p>
        <p><strong>Ikkje feil (overretting):</strong> <em class="nn">begynte, mens, også, blei</em> (jamstilte former), <em class="nn">måtte hentast</em> (s-passiv etter modalverb), <em class="nn">Når eg tenkjer tilbake</em> (gjentaking i notid), <em class="nn">mobilen sin</em> (peikar på subjektet Jonas), <em class="nn">av han</em> (om reinen), <em class="nn">næraste</em> (jamstilt med <em class="nn">nærmaste</em>).</p>
        <h4>Del 2: forklaringar</h4>
        <p>To poeng per forklaring: eitt for rett regel og eitt for presist fagomgrep. Døme på fullt svar: «<em class="nn">Klaga</em> er eit a-verb. A-verb får <em class="nn">-a</em> i preteritum på nynorsk, ikkje <em class="bm">-et</em>.» Eitt poeng: «Det heiter <em class="nn">klaga</em> på nynorsk.» (rett, men utan regel).</p>
        <h4>Del 3: bonus</h4>
        <ul>
          <li><em class="nn">klassens kontaktlærar</em> → <em class="nn">kontaktlæraren i klassen</em> eller <em class="nn">klassen sin kontaktlærar</em>. Godta òg <em class="nn">kontaktlæraren vår</em>.</li>
          <li><em class="nn">biletet visast no</em> → <em class="nn">biletet blir vist no</em> eller <em class="nn">no viser vi biletet</em>. Godta andre aktive omskrivingar som held på innhaldet.</li>
        </ul>
        <p>Bonuspoenga kan løfte ein elev mot neste nivå, men maksimal poengsum er 40.</p>`,
      poeng: { maks: 40, lag: "12 til 21 poeng", middels: "22 til 32 poeng", hog: "33 til 40 poeng" },
      skjema: [
        {
          omrade: "Bøying (feil 2, 5, 6, 7, 12, 15)",
          lag: "Finn og rettar nokre bøyingsfeil, oftast dei som skil seg mest frå nynorsk, til dømes <em class=\"bm\">klaget</em>.",
          middels: "Finn og rettar dei fleste bøyingsfeila i verb og substantiv. Kan oversjå adjektivsamsvaret eller perfektum av sterke verb.",
          hog: "Finn og rettar så godt som alle bøyingsfeila, også <em class=\"bm\">stor</em> og <em class=\"bm\">sovet</em>.",
        },
        {
          omrade: "Ordforråd, småord og pronomen (feil 3, 4, 8 til 11, 13, 16)",
          lag: "Rettar dei tydelegaste bokmålsorda, men ser ikkje feila med <em class=\"nn\">kvar/kor, då/når</em> og <em class=\"nn\">de/dei</em>.",
          middels: "Rettar bokmålsorda og dei fleste småordfeila. Kan oversjå <em class=\"nn\">de/dei</em> eller <em class=\"nn\">hennar</em>.",
          hog: "Rettar alle bokmålsorda og småordfeila og overrettar ikkje jamstilte former som <em class=\"nn\">begynte, mens, også</em>.",
        },
        {
          omrade: "Rettskriving og teiknsetjing (feil 1 og 14)",
          lag: "Finn verken særskrivinga eller det manglande kommaet, eller berre éin av dei utan rett retting.",
          middels: "Finn og rettar éin av dei to feila.",
          hog: "Finn og rettar begge feila.",
        },
        {
          omrade: "Forklaring med fagomgrep (del 2)",
          lag: "Gir rett form, men forklarer lite eller utan fagomgrep.",
          middels: "Forklarer dei fleste rettingane med rett regel og nokre fagomgrep.",
          hog: "Forklarer alle fire rettingane presist med rette fagomgrep og kan skilje regel frå døme.",
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "skrivemappe",
      tittel: "Skrivemappe: frå utkast til ferdig tekst",
      type: "skriving",
      tid: "Tre økter over to til tre veker",
      form: "Individuelt, med respons frå lærar og medelev",
      hjelpemiddel: "Ordbok og sjekklista frå rettelesingsmodulen",
      karaktergrunnlag: true,
      lareplan: [10, 11, 12],
      modular: ["skriving-korte-tekstar", "skriving-lengre-tekstar", "feil-rettelesing", "feil-boying", "feil-smaord"],
      lararinfo: `<p><strong>Føremål.</strong> Mappa viser om eleven kan arbeide vidare med eigen tekst: revidere innhald og struktur, rette språket og kjenne sine eigne typiske feil. Det er dette Nynorsksenteret tilrår for sidemål: hyppig skriving, respons undervegs og selektiv retting. Mappa kan inngå i karaktergrunnlaget, men det er kompetansen som syner seg i den reviderte teksten, feilloggen og refleksjonen som blir vurdert, ikkje kor mykje tid eleven har brukt.</p>
        <p><strong>Gjennomføring.</strong></p>
        <ol>
          <li><strong>Økt 1:</strong> Eleven skriv første utkast, gjerne ei av oppgåvene i Korte tekstar eller Lengre tekstar, eller ei oppgåve frå skriveoppgåva i sidemål.</li>
          <li><strong>Mellom øktene:</strong> Gi respons på innhald og struktur og på berre éin eller to feiltypar i språket. Marker feila med rettekodar (B, O, S, R, T), men skriv ikkje inn rett form. La gjerne ein medelev gi respons på innhaldet.</li>
          <li><strong>Økt 2:</strong> Eleven reviderer teksten og fører feilloggen.</li>
          <li><strong>Økt 3:</strong> Eleven les korrektur i tre rundar og skriv refleksjonen. Eleven leverer utkastet med respons, den reviderte teksten, feilloggen og refleksjonen.</li>
        </ol>
        <p><strong>Vurdering.</strong> Vurder den reviderte teksten med skjemaet til skriveoppgåva i sidemål, og vurder revisjonen, feilloggen og refleksjonen med skjemaet under. Hugs at teksten er skriven med respons, så han viser kva eleven får til med rettleiing.</p>
        <p><strong>Tilpassing.</strong> Elevar som treng det, kan få ein ferdig utfylt rad i feilloggen som døme, eller ei kortare tekstoppgåve.</p>`,
      elevark: `<p>I dette arbeidet skal du skrive ein tekst på nynorsk, få respons og gjere teksten betre. Du skal òg finne ut kva feil <em>du</em> oftast gjer, så du kan passe på dei i neste tekst.</p>
        <h4>Steg 1: Første utkast</h4>
        <p>Skriv teksten læraren har gitt deg. Ta vare på utkastet, for du skal levere det saman med den ferdige teksten.</p>
        <h4>Steg 2: Respons</h4>
        <p>Du får respons på innhaldet og koder i margen for språkfeil: <strong>B</strong> bøying, <strong>O</strong> bokmålsord, <strong>S</strong> småord og pronomen, <strong>R</strong> rettskriving og særskriving, <strong>T</strong> teiknsetjing. Du må sjølv finne rett form.</p>
        <h4>Steg 3: Revider</h4>
        <ul>
          <li>Gjer endringar i innhaldet først: Manglar det noko? Kan oppbygginga bli tydelegare?</li>
          <li>Rett så språket. Bruk ordboka når du er usikker.</li>
          <li>Les korrektur i tre rundar: éin for innhald, éin for endingar og éin for småord.</li>
        </ul>
        <h4>Steg 4: Feilloggen min</h4>
        <p>Skriv inn minst fem feil frå utkastet ditt, gjerne av ulike typar.</p>
        <table>
          <thead><tr><th>Feiltype</th><th>Slik skreiv eg</th><th>Rett form</th><th>Regelen med mine ord</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        <h4>Steg 5: Refleksjon</h4>
        <ol>
          <li>Kva endra du i innhaldet eller oppbygginga, og kvifor vart teksten betre av det?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li>Kva feiltype hadde du flest av? Kvifor trur du det er nettopp den?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li>Kva vil du gjere for å unngå denne feilen i neste tekst?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
        </ol>
        <p><strong>Du leverer:</strong> første utkast med respons, den reviderte teksten, feilloggen og refleksjonen.</p>`,
      skjema: [
        {
          omrade: "Revisjon av innhald og struktur",
          lag: "Den reviderte teksten er nesten lik utkastet. Endringane gjeld enkeltord.",
          middels: "Eleven har følgt opp responsen og gjort teksten tydelegare, til dømes med betre avsnitt, eit nytt døme eller ei betre avslutning.",
          hog: "Eleven har revidert sjølvstendig og gjort endringar som styrkjer teksten tydeleg, også utover det responsen peikte på.",
        },
        {
          omrade: "Språkleg retting",
          lag: "Eleven har retta nokre av dei markerte feila, og nokre rettingar er nye feil.",
          middels: "Eleven har retta dei fleste markerte feila rett og funne nokre feil sjølv.",
          hog: "Eleven har retta dei markerte feila, funne dei fleste andre feila sjølv og ikkje overretta jamstilte former.",
        },
        {
          omrade: "Feillogg og fagspråk",
          lag: "Feilloggen har rett form, men regelen manglar eller er uklar.",
          middels: "Feilloggen har rett form og ein forståeleg regel for dei fleste feila, med nokre fagomgrep.",
          hog: "Feilloggen er presis, sorterer feila etter type og forklarer reglane med rette fagomgrep.",
        },
        {
          omrade: "Refleksjon over eigne typiske feil",
          lag: "Eleven nemner ein feiltype, men knyter han lite til eigen tekst.",
          middels: "Eleven peikar på sin vanlegaste feiltype med døme og foreslår ein konkret måte å unngå han på.",
          hog: "Eleven ser mønster i eigne feil, forklarer kvifor dei oppstår (til dømes påverknad frå bokmål) og legg ein realistisk plan for neste tekst.",
        },
      ],
    },
  ],

  undervegs: {
    "skriving-omsetjing": {
      tittel: "Exit-lapp: set om fem setningar",
      tid: 8,
      form: "Åleine",
      oppgave: `<p>Set om til nynorsk. Bruk dei tre tankestega: småord, verb, substantiv.</p>
        <ol>
          <li><em class="bm">Jeg har ikke sett den nye filmen.</em><div class="skrivelinjer"></div></li>
          <li><em class="bm">Hun kommer hjem fra skolen klokka tre.</em><div class="skrivelinjer"></div></li>
          <li><em class="bm">Vi kastet snøballer på hverandre hele dagen.</em><div class="skrivelinjer"></div></li>
          <li><em class="bm">Hvorfor skrev du ikke ferdig historien?</em><div class="skrivelinjer"></div></li>
          <li><em class="bm">Husene i bygda er gamle.</em><div class="skrivelinjer"></div></li>
        </ol>
        <p>Kva for eit ord var du mest usikker på?</p><div class="skrivelinjer"></div>`,
      fasit: `<ol>
          <li><em class="nn">Eg har ikkje sett den nye filmen.</em></li>
          <li><em class="nn">Ho kjem heim frå skulen klokka tre.</em> Godta <em class="nn">skolen</em>, som er jamstilt med <em class="nn">skulen</em>.</li>
          <li><em class="nn">Vi kasta snøballar på kvarandre heile dagen.</em> Godta <em class="nn">Me</em>.</li>
          <li><em class="nn">Kvifor skreiv du ikkje ferdig historia?</em> Godta <em class="nn">Korfor</em>, <em class="nn">forteljinga</em> og <em class="nn">soga</em>.</li>
          <li><em class="nn">Husa i bygda er gamle.</em></li>
        </ol>`,
      sjaa: [
        "Småorda: <em class=\"nn\">eg, ikkje, ho, heim, frå, kvarandre, heile, kvifor</em>.",
        "Verba: sterkt verb i presens (<em class=\"nn\">kjem</em>), a-verb i preteritum (<em class=\"nn\">kasta</em>) og sterkt verb i preteritum (<em class=\"nn\">skreiv</em>).",
        "Substantiva: hankjønn i fleirtal (<em class=\"nn\">snøballar</em>), hokjønn (<em class=\"nn\">historia</em>) og inkjekjønn i bestemt fleirtal (<em class=\"nn\">husa</em>).",
        "Om eleven overrettar ord som er like, til dømes <em class=\"nn\">filmen</em> og <em class=\"nn\">bygda</em>.",
      ],
      framover: "Er småorda rette, men verba feil: be eleven skrive dei tre stega i margen og ta éin runde berre for verba. Er substantiva feil: øv på hokjønn og inkjekjønn med modulen Feil i bøying. Elevar som meistrar alt, kan setje om eit kort avisutdrag og grunngi fem av vala.",
    },

    "skriving-korte-tekstar": {
      tittel: "Minitekst: same bodskap til to mottakarar",
      tid: 12,
      form: "Åleine",
      oppgave: `<p>Du kan ikkje kome på trening på torsdag fordi du skal til tannlegen.</p>
        <ol>
          <li>Skriv ei kort melding om dette til ein venn på laget (20 til 40 ord).<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li>Skriv ein kort e-post om det same til trenaren (40 til 70 ord). Hugs opning, ærend og helsing.<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
          <li>Skriv to ting du endra fordi mottakaren var ein annan.<div class="skrivelinjer"></div></li>
        </ol>`,
      sjaa: [
        "Tonen: uformell i meldinga, høfleg i e-posten med opning, tydeleg ærend og helsing.",
        "Om eleven kan forklare kva som skil dei to tekstane.",
        "Konsekvent nynorsk i begge tekstane, også i meldinga: <em class=\"nn\">eg, kjem, ikkje, heim</em>.",
        "Verb i presens og framtid: <em class=\"nn\">kan ikkje kome, skal til tannlegen</em>.",
      ],
      framover: "Har eleven same tone i begge tekstane: vis ein høfleg e-post og ei melding side om side og la eleven markere skilnadene. Har eleven bokmålsord i meldinga: minn om at sjangeren er uformell, men orda skal vere nynorske. Elevar som meistrar dette, kan skrive same bodskap som ein formell søknad om permisjon.",
    },

    "skriving-lengre-tekstar": {
      tittel: "Minitekst: innleiing og eitt avsnitt",
      tid: 18,
      form: "Åleine",
      oppgave: `<p>Vel <strong>éi</strong> av oppgåvene.</p>
        <ol>
          <li><strong>Argumentere:</strong> «Skulen bør ha ein fridag med friluftsliv kvar månad.» Skriv innleiinga med standpunktet ditt og eitt avsnitt med eitt argument og eit døme. Bruk minst to bindeord.</li>
          <li><strong>Fortelje:</strong> Skriv anslaget og presentasjonen til ei forteljing om ein dag som ikkje gjekk som planlagt. Ta med minst éin replikk og éi skildring der du bruker ein sans.</li>
        </ol>
        <div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div>
        <p>Strek under bindeorda eller replikken i teksten din.</p>`,
      sjaa: [
        "Argumenterande: tydeleg standpunkt i innleiinga, eit avsnitt med temasetning, argument og døme, og bindeord som <em class=\"nn\">fordi, dessutan, til dømes</em>.",
        "Forteljande: anslag som vekkjer eit spørsmål, og ein replikk med rett teiknsetjing.",
        "Ordstilling etter innleiande bindeord: <em class=\"nn\">Dessutan er det</em>, ikkje <em class=\"bm\">Dessutan det er</em>.",
        "Formverket i ein lengre tekst: a-verb, sterke verb og bestemt form.",
      ],
      framover: "Manglar standpunktet eller anslaget: vis to modellopningar og la eleven skrive om si eiga. Står setningane laust etter kvarandre: gi eleven ei liste med bindeord og be han knyte saman tre av setningane. Elevar som meistrar dette, kan skrive eit motargument og svare på det.",
    },

    "grammatikk-skriveregler": {
      tittel: "Exit-lapp: småord, teljetest og samanskriving",
      tid: 7,
      form: "Åleine",
      oppgave: `<p>Skriv rett nynorskord i luka.</p>
        <ol>
          <li>___ (hvorfor) kom du ikkje i går?</li>
          <li>___ (hvor) mange bøker har du lese i år?</li>
          <li>___ (hvor) har du lagt jakka?</li>
          <li>Vi treng ___ mjøl til kaka. (noko, nokon, nokre, eit)</li>
          <li>Ho kjøpte ___ blyantar i går. (noko, nokon, nokre, eit)</li>
          <li>Eg ser ikkje ___ bil på parkeringsplassen. (noko, nokon, nokre, ein)</li>
          <li>Han vil kjøpe ___ sykkel til sommaren. (noko, nokon, nokre, ein)</li>
        </ol>
        <p>8. Skriv orda rett: <em class="bm">skule sekk</em> og <em class="bm">fotball trening</em>.</p><div class="skrivelinjer"></div>`,
      fasit: `<ol>
          <li><em class="nn">Kvifor</em>. Godta <em class="nn">Korfor</em>.</li>
          <li><em class="nn">Kor</em> (grad og mengd)</li>
          <li><em class="nn">Kvar</em> (stad). Godta <em class="nn">Kor</em>.</li>
          <li><em class="nn">noko</em> (mengd du ikkje tel)</li>
          <li><em class="nn">nokre</em> (fleire ting, positiv setning)</li>
          <li><em class="nn">nokon</em> (hankjønn, nekting)</li>
          <li><em class="nn">ein</em> (éin ting du tel, positiv setning)</li>
          <li><em class="nn">skulesekk, fotballtrening</em></li>
        </ol>`,
      sjaa: [
        "Om eleven skil <em class=\"nn\">kvar</em> (stad) frå <em class=\"nn\">kor</em> (grad).",
        "Om eleven bruker teljetesten: mengd eller ting du tel, positiv setning eller nekting.",
        "Om eleven skriv samansette ord i eitt ord.",
      ],
      framover: "Feil på 4 til 7: gå gjennom dei to spørsmåla i teljetesten (kan eg telje det, og er setninga positiv?) med tre nye døme. Feil på 2 og 3: lat eleven lage to eigne setningar, éi med <em class=\"nn\">kvar</em> og éi med <em class=\"nn\">kor</em>. Særskriving: lat eleven leite etter samansette ord i ein eigen tekst.",
    },

    "feil-boying": {
      tittel: "Finn feila: endingar",
      tid: 7,
      form: "Åleine",
      oppgave: `<p>Det er <strong>6 feil</strong> i setningane. Stryk under feila og skriv rett form over.</p>
        <ol>
          <li>Jenten kastet ballen over gjerdet.</li>
          <li>Han skriver brev til bestemor kvar veke.</li>
          <li>Alle eplene låg på eit stor fat.</li>
          <li>Har du sovet godt?</li>
        </ol>
        <p>Vel éin av rettingane og skriv regelen.</p><div class="skrivelinjer"></div>`,
      fasit: `<ol>
          <li><em class="nn">Jenta kasta</em> ballen over gjerdet. (hokjønn i bestemt form på <em class="nn">-a</em>, a-verb i preteritum på <em class="nn">-a</em>)</li>
          <li>Han <em class="nn">skriv</em> brev til bestemor kvar veke. (sterkt verb utan ending i presens)</li>
          <li>Alle <em class="nn">epla</em> låg på eit <em class="nn">stort</em> fat. (inkjekjønn i bestemt fleirtal på <em class="nn">-a</em>, adjektiv med <em class="nn">-t</em> i inkjekjønn)</li>
          <li>Har du <em class="nn">sove</em> godt? (sterkt verb i perfektum på <em class="nn">-e</em>)</li>
        </ol>`,
      sjaa: [
        "Kva for ein av dei tre raske kontrollane eleven bruker: <em class=\"bm\">-et</em> i fortid, <em class=\"bm\">-er</em> på sterke verb, <em class=\"bm\">-en</em> og <em class=\"bm\">-ene</em> på substantiv.",
        "Om eleven ser adjektivsamsvaret (<em class=\"nn\">stort</em>) og perfektum (<em class=\"nn\">sove</em>), som ofte blir oversett.",
        "Om regelen eleven skriv, bruker fagomgrep som a-verb, sterkt verb, hokjønn og bestemt form.",
      ],
      framover: "Gi eleven dei tre kontrollane på ein hugselapp og be han lese ein eigen tekst éin gong for kvar kontroll. Overser eleven adjektiv og perfektum, er neste steg å øve på <em class=\"nn\">eit stort hus</em> og <em class=\"nn\">har skrive, har sove</em> i modulen Feil i bøying.",
    },

    "feil-bokmalsord": {
      tittel: "Exit-lapp: feil, lov eller heilt greitt?",
      tid: 8,
      form: "Åleine",
      oppgave: `<p>Skriv <strong>F</strong> om ordet er feil på nynorsk, og skriv nynorskordet. Skriv <strong>L</strong> om ordet er lov, men det finst eit betre nynorskord, og skriv det. Skriv <strong>G</strong> om ordet er heilt greitt.</p>
        <table>
          <thead><tr><th>Ord</th><th>F, L eller G</th><th>Nynorskord</th></tr></thead>
          <tbody>
            <tr><td><em>hverandre</em></td><td></td><td></td></tr>
            <tr><td><em>kjærlighet</em></td><td></td><td></td></tr>
            <tr><td><em>betale</em></td><td></td><td></td></tr>
            <tr><td><em>forskjell</em></td><td></td><td></td></tr>
            <tr><td><em>begynne</em></td><td></td><td></td></tr>
            <tr><td><em>sammen</em></td><td></td><td></td></tr>
            <tr><td><em>erfaring</em></td><td></td><td></td></tr>
            <tr><td><em>frihet</em></td><td></td><td></td></tr>
            <tr><td><em>forklaring</em></td><td></td><td></td></tr>
            <tr><td><em>hjemme</em></td><td></td><td></td></tr>
          </tbody>
        </table>`,
      fasit: `<ul>
          <li>F: <em class="bm">hverandre</em> → <em class="nn">kvarandre</em>, <em class="bm">kjærlighet</em> → <em class="nn">kjærleik</em>, <em class="bm">sammen</em> → <em class="nn">saman</em>, <em class="bm">frihet</em> → <em class="nn">fridom</em>, <em class="bm">hjemme</em> → <em class="nn">heime</em>.</li>
          <li>L: <em class="nn">forskjell</em> → <em class="nn">skilnad</em>, <em class="nn">erfaring</em> → <em class="nn">røynsle</em>.</li>
          <li>G: <em class="nn">betale, begynne, forklaring</em>.</li>
        </ul>
        <p>Skiljet mellom L og G er glidande. Godta G for <em class="nn">forskjell</em> og <em class="nn">erfaring</em>, for begge står i ordboka. Det viktige er at eleven ikkje skriv F ved ord som er lov.</p>`,
      sjaa: [
        "Om eleven kjenner att reine bokmålsord og kan nynorskordet.",
        "Om eleven overrettar: skriv eleven F ved <em class=\"nn\">begynne, betale</em> eller <em class=\"nn\">forklaring</em>?",
        "Om eleven kjenner mønsteret med <em class=\"bm\">-het</em> og nynorske ord på <em class=\"nn\">-leik</em> og <em class=\"nn\">-dom</em>.",
      ],
      framover: "Overrettar eleven be-ord: vis korleis ein slår opp i Nynorskordboka, og lat eleven sjekke tre ord sjølv. Står bokmålsorda att: lat eleven lage ei personleg liste over dei fem orda han oftast gløymer, og bruke henne i korrekturen.",
    },

    "feil-smaord": {
      tittel: "Exit-lapp: de, dei, hennar og då",
      tid: 8,
      form: "Åleine",
      oppgave: `<p>Skriv rett ord i luka.</p>
        <ol>
          <li>Ola spør dei to venene sine: «Kan ___ hjelpe meg med flyttinga?»</li>
          <li>Ola fortel mor si om venene: «Eg skal møte ___ etter skulen.»</li>
          <li>Siri leita etter jakka ___ (si eller hennar), men fann ho ikkje.</li>
          <li>Siri gløymde sekken. Per bar sekken ___ heim til henne.</li>
          <li>___ (Da/Når) eg kom heim i går, var det ingen der.</li>
          <li>___ (Da/Når) det snør, går vi på ski.</li>
          <li>___ (Hvor) lang tid tek turen?</li>
          <li>___ (Hvor) ligg skulen din?</li>
        </ol>`,
      fasit: `<ol>
          <li><em class="nn">de</em> (eller <em class="nn">dokker</em>): Ola snakkar til dei.</li>
          <li><em class="nn">dei</em>: Ola snakkar om dei.</li>
          <li><em class="nn">si</em>: jakka er Siri si eiga, og Siri er subjektet.</li>
          <li><em class="nn">hennar</em>: subjektet er Per, men sekken er Siri sin.</li>
          <li><em class="nn">Då</em>: éi hending i fortida.</li>
          <li><em class="nn">Når</em>: kvar gong.</li>
          <li><em class="nn">Kor</em>: grad.</li>
          <li><em class="nn">Kvar</em>: stad. Godta <em class="nn">Kor</em>.</li>
        </ol>`,
      sjaa: [
        "Om eleven skil <em class=\"nn\">de</em> (dei du snakkar til) frå <em class=\"nn\">dei</em> (dei du snakkar om).",
        "Om eleven vel <em class=\"nn\">si</em> eller <em class=\"nn\">hennar</em> ut frå kven som er subjekt.",
        "Om eleven skil <em class=\"nn\">då/når</em> og <em class=\"nn\">kvar/kor</em>.",
      ],
      framover: "Feil på 1 og 2: lat eleven stille spørsmålet «snakkar nokon til dei eller om dei?» høgt ved kvar <em class=\"nn\">de</em> og <em class=\"nn\">dei</em> i ein eigen tekst. Feil på 3 og 4: teikn ei pil frå eigedomsordet til subjektet. Feil på 5 og 6: gi eleven tidslinja frå modulen med éin prikk for <em class=\"nn\">då</em> og mange for <em class=\"nn\">når</em>.",
    },

    "feil-setning": {
      tittel: "Skriv om: frå tungt til naturleg nynorsk",
      tid: 10,
      form: "Åleine, så i par",
      oppgave: `<p>Setningane er rette eller nesten rette, men dei fleste er tunge eller lite nynorske. Skriv dei om så dei blir naturleg nynorsk. Éi setning er god som ho er. Skriv <strong>OK</strong> ved henne.</p>
        <ol>
          <li>Kakene seljast i kantina kvar fredag.<div class="skrivelinjer"></div></li>
          <li>Skulens rektor heldt tale på avslutninga.<div class="skrivelinjer"></div></li>
          <li>Gjennomføring av turen skjer i mai.<div class="skrivelinjer"></div></li>
          <li>Leksene må gjerast før fredag.<div class="skrivelinjer"></div></li>
          <li>Den nye sal er større enn den gamle.<div class="skrivelinjer"></div></li>
        </ol>
        <p>Samanlikn med sidemannen. Har de skrive om på ulike måtar?</p>`,
      fasit: `<ol>
          <li><em class="nn">Kakene blir selde i kantina kvar fredag.</em> eller <em class="nn">Vi sel kaker i kantina kvar fredag.</em> Godta <em class="nn">vert</em> og <em class="nn">blir selt</em>. S-passiv utan modalverb er lov, men lite brukt på nynorsk.</li>
          <li><em class="nn">Rektoren på skulen heldt tale på avslutninga.</em> eller <em class="nn">Skulen sin rektor ...</em> S-genitiv er lov, men tung.</li>
          <li><em class="nn">Vi gjennomfører turen i mai.</em> eller <em class="nn">Turen blir gjennomført i mai.</em> Godta <em class="nn">Vi drar på turen i mai.</em></li>
          <li>OK: s-passiv etter modalverb.</li>
          <li><em class="nn">Den nye salen er større enn den gamle.</em> Dobbel bestemming.</li>
        </ol>`,
      sjaa: [
        "Om eleven skriv om s-passiv med <em class=\"nn\">blir/vert</em> eller til aktiv, og lèt s-passiven etter modalverb stå.",
        "Om eleven finn verbet som gøymer seg i substantivsjuka.",
        "Om innhaldet er det same etter omskrivinga.",
        "Om eleven bruker dobbel bestemming etter <em class=\"nn\">den, det, dei</em>.",
      ],
      framover: "Skriv eleven om setning 4: repeter at s-passiv etter <em class=\"nn\">kan, skal, må, bør, vil</em> er naturleg nynorsk. Står substantivsjuka att: spør «kven gjer kva?» og lat svaret bli den nye setninga. Elevar som meistrar dette, kan skrive om eit avsnitt frå ein offentleg tekst.",
    },

    "feil-rettelesing": {
      tittel: "Exit-lapp: les korrektur",
      tid: 10,
      form: "Åleine",
      oppgave: `<p>Teksten har <strong>6 feil</strong>. Stryk under feila og skriv rett form over.</p>
        <p style="line-height:2.1">I går var vi på kino. Vi hadde kjøpt billettene på nett, men vi kom for seint fordi bussen stoppet ved kvar haldeplass. Når vi endeleg kom inn, var salen nesten full, og vi måtte sitte heilt framme. Filmen begynte med ein gong. Han handla om to søsken som leitar etter faren sin. Slutten var trist, men jeg likte filmen likevel. Etterpå gjekk vi på kafé og spiste pizza før vi tok bussen hjem.</p>
        <p>Kva for ein feiltype fann du flest av? Er det den same feiltypen du oftast gjer sjølv?</p><div class="skrivelinjer"></div>`,
      fasit: `<ol>
          <li><em class="bm">billettene</em> → <em class="nn">billettane</em> (hankjønn)</li>
          <li><em class="bm">stoppet</em> → <em class="nn">stoppa</em> (a-verb)</li>
          <li><em class="bm">Når</em> → <em class="nn">Då</em> (éi hending i fortida)</li>
          <li><em class="bm">jeg</em> → <em class="nn">eg</em></li>
          <li><em class="bm">spiste</em> → <em class="nn">åt</em></li>
          <li><em class="bm">hjem</em> → <em class="nn">heim</em></li>
        </ol>
        <p>Ikkje feil: <em class="nn">begynte, sitte, søsken, leitar, sin</em>.</p>`,
      sjaa: [
        "Kor mange av feila eleven finn, og kva feiltype eleven overser.",
        "Om eleven overrettar jamstilte former som <em class=\"nn\">begynte</em> og <em class=\"nn\">sitte</em>.",
        "Om eleven kan seie noko om sine eigne typiske feil.",
      ],
      framover: "Finn eleven berre bokmålsorda: lat eleven lese teksten éin gong berre for endingar. Finn eleven feila, men ikkje i eigen tekst: lat eleven lese sin eigen tekst baklengs, setning for setning. Elevar som finn alt, kan lage ein rettelesingstekst med fem feil til ein medelev og skrive fasit.",
    },
  },

  eigenvurdering: [
    "skrive ein tekst på nynorsk som er tilpassa mottakaren og formålet",
    "byggje opp ei forteljing og ein argumenterande tekst og binde avsnitta saman med bindeord",
    "bøye verb rett på nynorsk, til dømes <em class=\"nn\">kasta, kjem, har skrive</em>",
    "bøye substantiv og adjektiv rett, til dømes <em class=\"nn\">boka, husa, bilane, eit stort hus</em>",
    "byte ut bokmålsord og vite at ord som <em class=\"nn\">begynne</em> og <em class=\"nn\">også</em> er lov på nynorsk",
    "velje rett mellom <em class=\"nn\">de, dei, dykk</em>, mellom <em class=\"nn\">då, når</em> og mellom <em class=\"nn\">kvar, kor</em>",
    "skrive om s-passiv, s-genitiv og tunge setningar til naturleg nynorsk",
    "lese korrektur på min eigen tekst i tre rundar og finne mine typiske feil",
  ],
});
