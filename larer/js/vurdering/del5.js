/* Vurdering for Del 5: Lesing og tekstforståing. Formatet står i larer/README.md under «Vurdering». */
Vurdering.register(5, {
  intro: `<p>Del 5 vurderer lesekompetanse og tekstforståing: om eleven kan finne informasjon i ein tekst, tolke det som ikkje blir sagt rett ut, forklare kva verkemidla gjer med lesaren, samanlikne tekstar og setje dei i samanheng med forfattarane og tida dei høyrer til. Fordi alt dette skjer på nynorsk, viser svara til eleven òg sidemålskompetanse.</p>
<p>Kvar lesemodul har ein kurstekst skriven i stilen til ein nynorskforfattar, og modulane om Vinje, Garborg og Duun har i tillegg ein ekte tekst i original staving. Undervegsvurderingane under er knytte til tekstane i kvar modul og passar som exit-lapp eller avslutning på økta. Sluttvurderingane følgjer eksamensforma etter 10. trinn: <strong>leseprøva</strong> liknar oppgåve 1 (lesing), og <strong>skriveoppgåva om to tekstar</strong> liknar oppgåve 3 (lesing og skriving). Den <strong>munnlege fagsamtalen</strong> gir eleven høve til å vise forståinga på ein annan måte.</p>`,
  lareplan: [1, 2, 3, 5, 6, 11, 12, 13, 15],
  kompetanse: `<p>Etter Del 5 skal eleven kunne lese skjønnlitteratur og sakprosa på nynorsk og vise forståing ved å finne opplysningar som står direkte i teksten, tolke handlingar, replikkar og bilete og grunngi tolkinga med sitat. Eleven skal kunne kjenne att og forklare verkemiddel som korte setningar, gjentaking, symbol, besjeling, samanlikning og tilbakeblikk, og bruke fagomgrep om dei. Eleven skal kunne samanlikne to tekstar, plassere nynorskforfattarane i tid og forklare at nynorsk har vore eit litteraturspråk sidan 1800-talet. Når eleven skriv om tekstane, skal det skje på nynorsk med den ordbøyinga, det ordforrådet og den rettskrivinga som kjenneteikna under skildrar.</p>`,
  kjenneteikn: [
    {
      omrade: "Forstå og attgi innhald",
      lag: "Finn enkelte opplysningar som står direkte i teksten, men blandar gjerne saman detaljar eller personar. Attgir handlinga i store trekk.",
      middels: "Finn dei sentrale opplysningane i teksten og attgir handlinga i rett rekkjefølgje med eigne ord. Skil mellom det viktige og det mindre viktige.",
      hog: "Finn opplysningar raskt og presist, også når dei er spreidde i teksten. Oppsummerer kort og treffande og ser kva opplysningar som er viktige for tolkinga.",
    },
    {
      omrade: "Tolke tekstar",
      lag: "Gir ei enkel tolking av kva ein person kjenner eller meiner, men grunngir lite eller berre med eiga meining.",
      middels: "Tolkar det underforståtte i replikkar og handlingar og grunngir tolkinga med minst eitt døme eller sitat frå teksten.",
      hog: "Tolkar sjølvstendig og på fleire nivå, til dømes eit symbol eller ein open slutt, ser fleire moglege tolkingar og grunngir med treffande sitat. Skil tydeleg mellom spor i teksten og gjetting.",
    },
    {
      omrade: "Verkemiddel og fagomgrep",
      lag: "Kjenner att eit par verkemiddel, til dømes korte setningar eller gjentaking, når dei blir peika ut, og seier noko enkelt om dei.",
      middels: "Finn verkemiddel som gjentaking, samanlikning, besjeling og symbol sjølv, namngir dei med fagomgrep og forklarer verknaden på stemning eller tempo.",
      hog: "Bruker fagomgrep presist og forklarer korleis verkemidla verkar saman og kva dei gjer med tydinga av heile teksten.",
    },
    {
      omrade: "Samanlikne tekstar og setje dei i samanheng",
      lag: "Nemner ein likskap eller ein skilnad mellom to tekstar. Kjenner namnet på nokre nynorskforfattarar.",
      middels: "Samanliknar to tekstar på fleire punkt med konkrete døme frå begge. Plasserer forfattarane i rett tid og knyter stiltrekk til nokre av dei.",
      hog: "Samanliknar punkt for punkt og forklarer kvifor tekstane er ulike, til dømes ut frå tid, sjanger eller stil. Ser samanhengar mellom forfattarar, som at Nilssen lånte tittelen <em class=\"nn\">Tung tids tale</em> frå Halldis Moren Vesaas.",
    },
    {
      omrade: "Skrive om tekstar på sidemålet",
      lag: "Meistrar sentrale reglar for ordbøying, rettskriving og teiknsetjing på nynorsk. Har eit enkelt ordforråd og bruker enkelte ord som er typiske for nynorsk.",
      middels: "Meistrar hovudreglar for ordbøying og reglar for rettskriving og sentrale reglar for teiknsetjing. Har relevant ordforråd, bruker sentrale nynorske ord og uttrykk og uttrykkjer seg tenleg om tekstane.",
      hog: "Meistrar i hovudtrekk ordbøyinga, reglar for rettskriving og i hovudtrekk reglar for teiknsetjing. Har variert ordforråd og bruker nynorske ord, uttrykk og fagomgrep med presisjon og variasjon.",
    },
  ],
  provar: [
    {
      id: "leseprove",
      tittel: "Leseprøve: «Klokka i gangen»",
      type: "skriftleg",
      tid: "60 minutt",
      form: "Individuelt, på papir",
      hjelpemiddel: "Ordbok (papir eller ordbokene.no)",
      karaktergrunnlag: true,
      lareplan: [1, 2, 6, 11, 12],
      modular: ["lesing-garborg", "lesing-duun", "lesing-t-vesaas", "lesing-hm-vesaas", "lesing-grytten", "lesing-nilssen", "lesing-samanlikning"],
      lararinfo: `<p><strong>Føremål.</strong> Prøva liknar oppgåve 1 på eksamen etter 10. trinn: ein ukjend nynorsktekst med spørsmål på fleire nivå. Teksten «Klokka i gangen» er skriven for denne prøva og er ikkje henta frå nokon forfattar. Han har same slags trekk som kurstekstane i Del 5: mykje er underforstått, kjenslene blir viste gjennom detaljar og handlingar, og klokka kan lesast som eit symbol.</p>
<p><strong>Oppbygging.</strong> Del A prøver å finne informasjon, del B å tolke, del C verkemiddel og del D refleksjon og samanlikning med tekstane i delen. Poenga stig med nivået, så ein elev som berre svarar på del A, når ikkje opp til låg måloppnåing.</p>
<p><strong>Gjennomføring.</strong> Be elevane lese teksten to gonger før dei svarar, slik dei har gjort i lesemodulane. Svara skal skrivast på nynorsk med heile setningar der spørsmålet ber om det. Poenga gjeld innhaldet. Språket i svara vurderer du for seg i den siste rada i skjemaet, og det kan telje med i den samla vurderinga i skriftleg sidemål.</p>
<p><strong>Tilpassing.</strong> Elevar som treng det, kan få teksten lesen høgt eller få ekstra tid. Det endrar ikkje kva prøva måler. Elevar med fritak frå vurdering med karakter i sidemål kan ta prøva som undervegsvurdering.</p>
<p><strong>Kva prøva ikkje viser.</strong> Prøva viser lite om korleis eleven skriv lengre tekstar på nynorsk. Bruk skriveoppgåva om to tekstar til det.</p>`,
      elevark: `<p>Les teksten nøye to gonger. Svar deretter på spørsmåla. Skriv på nynorsk, og bruk heile setningar når spørsmålet ber om å forklare eller grunngi.</p>
<h4>Klokka i gangen</h4>
<p>Nøkkelen låg under den flate steinen ved trappa, der han alltid hadde lege. Sigrid kjende han med fingrane før ho såg han, kald og litt rusten, og ho stod ei stund med han i handa før ho låste opp.</p>
<p>Huset til bestemor lukta som før: grønsåpe, ullgenserar og noko søtt, kanskje dei siste epla i kjellaren. Men det var stilt på ein ny måte. Kjøleskapet stod med døra på gløtt, tomt og vaska. På kjøkenbordet låg ein bunke papir frå eigedomsmeklaren. Mor hadde lagt ein lapp oppå: «Vel deg éin ting. Berre éin.»</p>
<p>Sigrid gjekk frå rom til rom. I stova hang bileta framleis på veggen, men i tankane til alle andre var dei alt tekne ned. Om ei veke skulle det kome folk med lastebil.</p>
<p>Ute i gangen hang klokka. Ho hadde stoppa på tjue over tre. Ingen visste når. Kanskje den dagen bestemor fall, kanskje seinare. Då Sigrid var lita, var det ho som fekk trekkje opp klokka kvar søndag. Bestemor løfta henne opp, og Sigrid kjende pusten hennar i nakken medan ho vreid nøkkelen sju gonger, aldri åtte.</p>
<p>«Sju gonger», hadde bestemor sagt. «Ho toler ikkje meir enn det. Ingen gjer det.»</p>
<p>Sigrid opna glasdøra. Den vesle nøkkelen hang på ein spikar inne i skapet, der han skulle. Ho sette han i holet og vreid. Éin gong. To. Det knirka. Tre, fire, fem, seks. Sju.</p>
<p>Så dytta ho borti pendelen.</p>
<p>Først skjedde ingenting. Så byrja klokka å tikke, nølande til å byrje med, så stødig, som om ho hadde stått der og venta på at nokon skulle kome. Lyden fylte gangen, så stova, så heile huset.</p>
<p>Sigrid sette seg i trappa og lytta. Klokka viste feil tid. Ute hadde det vore mørkt lenge, men etter klokka var det midt på ettermiddagen. Det gjorde ingenting.</p>
<p>Då mor ringde og spurde kva ho hadde valt, svara ho ikkje med ein gong.<br>
«Eg tek klokka», sa ho til slutt.<br>
«Men ho går jo ikkje.»<br>
«Jo», sa Sigrid. «No gjer ho det.»</p>
<p class="liten">Teksten er skriven for denne prøva.</p>

<h4>Del A: Finn i teksten (6 poeng)</h4>
<ol>
<li>Kvar låg nøkkelen til huset? (1 poeng)<div class="skrivelinjer"></div></li>
<li>Kva stod det på lappen frå mor? (1 poeng)<div class="skrivelinjer"></div></li>
<li>Kor mange gonger skulle klokka trekkjast opp, og kva grunn gav bestemor? (2 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Huset skal seljast. Finn to spor i teksten som viser det. (2 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>

<h4>Del B: Tolk teksten (10 poeng)</h4>
<ol start="5">
<li>Kva har truleg skjedd med bestemor? Grunngi svaret med to stader i teksten. (3 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>«I stova hang bileta framleis på veggen, men i tankane til alle andre var dei alt tekne ned.» Forklar setninga med eigne ord. (2 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Bestemor seier om klokka: «Ho toler ikkje meir enn det. Ingen gjer det.» Kva kan «Ingen gjer det» bety? (3 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Kvifor svarar ikkje Sigrid med ein gong når mor ringjer? (2 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>

<h4>Del C: Verkemiddel (10 poeng)</h4>
<ol start="9">
<li>Finn eitt døme på samanlikning eller besjeling i teksten. Skriv av dømet, og forklar kva det gjer med lesaren. (3 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Klokka kan lesast som eit symbol. Kva kan ho stå for? Grunngi med teksten. (4 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Teksten seier aldri rett ut kva Sigrid kjenner. Vis med to døme korleis kjenslene hennar kjem fram likevel. (3 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>

<h4>Del D: Reflekter (8 poeng)</h4>
<ol start="12">
<li>Mor seier at klokka ikkje går. Sigrid svarar: «Jo. No gjer ho det.» Kva meiner Sigrid, og kva fortel slutten om korleis ho møter det at bestemor er borte? (4 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Kva for ein av kurstekstane i Del 5 minner «Klokka i gangen» deg mest om? Nemn tittelen, og vis to konkrete likskapar i innhald eller stil. (4 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<p>Svara under er døme. Godta andre svar som er rette og grunngitte med teksten. Halve poeng er ikkje nødvendig: gi poeng for kvart element som er med.</p>
<ol>
<li>Under den flate steinen ved trappa. (1)</li>
<li>«Vel deg éin ting. Berre éin.» (1)</li>
<li>Sju gonger (1). Bestemor sa at klokka ikkje toler meir enn det (1).</li>
<li>To av desse, 1 poeng kvar: papir frå eigedomsmeklaren på kjøkenbordet; folk skal kome med lastebil om ei veke; kjøleskapet er tomt og vaska; mor ber Sigrid velje éin ting.</li>
<li>Bestemor er truleg død, eller ho bur ikkje lenger i huset (1). Spor, 1 poeng kvar for to: «den dagen bestemor fall»; huset skal seljast og tømmast; Sigrid får velje ein ting etter henne; klokka har stått sidan ingen veit når. Godta «flytta på sjukeheim» når svaret er grunngitt.</li>
<li>Bileta heng der framleis, men for familien er huset alt avslutta (1). Dei har tenkt ferdig om huset og planlagt å tømme det, sjølv om ingenting er flytta enno. Sigrid er kanskje den einaste som ikkje er der (1).</li>
<li>1 poeng: menneske toler heller ikkje meir enn ei viss mengd. 2 poeng: svaret ser at replikken har dobbel tyding, han handlar både om klokka og om menneske. 3 poeng: knyter det òg til bestemor eller Sigrid, til dømes at bestemor sjølv ikkje tolte meir, eller at Sigrid ber på mykje no.</li>
<li>Ho treng tid, valet er viktig og vanskeleg, eller ho veit ikkje korleis ho skal forklare kvifor ho vel ei klokke som ikkje går (1). Grunngiving med teksten eller situasjonen (1).</li>
<li>Døme: «som om ho hadde stått der og venta på at nokon skulle kome» (samanlikning og besjeling); klokka blir omtala som «ho» som «toler»; lyden «fylte» huset. Rett døme (1), rett omgrep (1), verknad (1), til dømes at klokka blir som eit levande vesen eller ein person som har venta på Sigrid, og at huset får liv att.</li>
<li>Rimelege tydingar: tida, livet til bestemor, minna, samanhengen mellom bestemor og Sigrid. 1 poeng for ei tyding, 1 for grunngiving med at klokka stoppa då bestemor fall eller seinare, 1 for at ho går att når Sigrid trekkjer henne opp, 1 for ei samla tolking: til dømes at minna om bestemor lever vidare i Sigrid, eller at livet held fram sjølv om nokon er borte.</li>
<li>To døme, inntil 3 poeng: ho står lenge med nøkkelen i handa før ho låser opp; ho går frå rom til rom; ho hugsar pusten til bestemor i nakken; ho tel vridingane slik ho lærte; ho set seg i trappa og lyttar; ho svarar ikkje med ein gong. Høgaste poeng når eleven forklarer kva kjensle detaljen viser.</li>
<li>Sigrid meiner at klokka går no fordi ho sjølv har trekt henne opp (1). I overført tyding: noko av bestemor lever vidare, og Sigrid tek vare på det (1). Slutten viser at ho møter sorga med ei handling og ikkje med ord (1), og at ho ikkje vil la det som var, bli borte, eller at ho finn trøyst (1).</li>
<li>Fleire svar er rette. Døme: «Ein morgon» (ein liten augneblink får stor plass, tankar om det som er borte, sanseinntrykk som lukt); «Heim att» eller «Bestefar og stormen» (det usagde i familien, handlingar i staden for ord, eldre familiemedlem); «Jenta og isen» (åleine, korte setningar, eit symbol); «Klassebilete» (ein ting som hjelper forteljaren å forstå tida som har gått). Rett tittel (1), to grunngitte likskapar (2), presis bruk av konkrete døme eller fagomgrep (1).</li>
</ol>`,
      poeng: { maks: 34, lag: "9 til 16 poeng", middels: "17 til 26 poeng", hog: "27 til 34 poeng" },
      skjema: [
        {
          omrade: "Finne informasjon (del A)",
          lag: "Finn nokre av opplysningane, men svarar ufullstendig eller med detaljar frå feil stad i teksten.",
          middels: "Finn dei fleste opplysningane og svarar presist på spørsmåla.",
          hog: "Finn alle opplysningane raskt og presist og tek med begge spora der spørsmålet ber om det.",
        },
        {
          omrade: "Tolking (del B)",
          lag: "Gir korte tolkingar utan grunngiving, eller attgir berre det som står.",
          middels: "Tolkar det underforståtte om bestemor og Sigrid og grunngir med minst eitt spor frå teksten.",
          hog: "Ser den doble tydinga i replikkane, grunngir med fleire spor og skil mellom det teksten seier og det eleven sluttar seg til.",
        },
        {
          omrade: "Verkemiddel (del C)",
          lag: "Finn eit døme, men namngir det ikkje eller seier lite om verknaden.",
          middels: "Finn og namngir samanlikning eller besjeling og gir ei rimeleg tolking av klokka som symbol.",
          hog: "Forklarer verknaden presist og knyter symbolet til heile teksten, frå klokka som stoppa til klokka som går.",
        },
        {
          omrade: "Refleksjon og samanlikning (del D)",
          lag: "Gir ei enkel meining om slutten eller nemner ein kurstekst utan døme.",
          middels: "Tolkar slutten og samanliknar med ein kurstekst ved hjelp av eitt eller to konkrete trekk.",
          hog: "Reflekterer sjølvstendig over slutten og samanliknar med ein kurstekst ved hjelp av konkrete døme og fagomgrep.",
        },
        {
          omrade: "Språket i svara",
          lag: "Svarar på nynorsk og meistrar sentrale reglar, men med mange feil i bøying og rettskriving og innslag av bokmål.",
          middels: "Meistrar hovudreglar for bøying og rettskriving på nynorsk og bruker sentrale nynorske ord.",
          hog: "Svarar i presis og variert nynorsk med få feil og bruker fagomgrep naturleg.",
        },
      ],
    },
    {
      id: "skriv-om-to-tekstar",
      tittel: "Lesing og skriving: skriv om to tekstar",
      type: "skriving",
      tid: "To skuletimar (90 minutt)",
      form: "Individuelt, for hand eller på PC",
      hjelpemiddel: "Kurstekstane på papir eller i kurset, ordbok",
      karaktergrunnlag: true,
      lareplan: [1, 2, 6, 10, 11, 12],
      modular: ["lesing-vinje", "lesing-garborg", "lesing-t-vesaas", "lesing-hm-vesaas", "lesing-fosse", "lesing-grytten", "lesing-nilssen", "lesing-samanlikning"],
      lararinfo: `<p><strong>Føremål.</strong> Oppgåva liknar oppgåve 3 på eksamen, der eleven skal vise både lesing og skriving. Eleven skriv ein samanliknande eller tolkande tekst på nynorsk om to tekstar frå Del 5. Ho viser både tekstforståing og sidemålskompetanse i ein lengre tekst, og veg difor tyngst av vurderingane i delen.</p>
<p><strong>Førebuing.</strong> Skriv ut dei to tekstane i kvart alternativ, eller la elevane opne modulane. Elevane bør ha gjort samanlikningsoppgåva i modulen «Samanlikn tekstane» først. Avgjer på førehand om rettskrivingskontroll på PC er lov, og noter det. Med kontrollen slått på viser teksten mindre om kva eleven meistrar sjølv i rettskriving, men framleis mykje om bøying, ordforråd og setningsbygnad.</p>
<p><strong>Vurdering.</strong> Bruk skjemaet. Dei tre første radene gjeld tekstforståing og skriving om litteratur, dei tre siste gjeld sidemålet. Ver merksam på at alternativ D (kurstekst og ekte tekst av Vinje) krev at eleven les landsmål med ordliste, og at samanlikning av språket er ein del av oppgåva der. Ein tekst skriven på bokmål viser ikkje kompetanse i sidemål.</p>
<p><strong>Tilpassing.</strong> Elevar som treng støtte, kan få ein skrivestart med setningsopningar som «Begge tekstane …», «Medan …, er …» og «Ein skilnad er at …». Det endrar ikkje kva oppgåva måler. Elevar som vil ha utfordring, kan trekkje inn ein ekte tekst av forfattaren som dei har lese på Nettbiblioteket.</p>`,
      elevark: `<p>Du har lese ni tekstar i Del 5. No skal du skrive ein tekst på nynorsk der du samanliknar to av dei. Vel <strong>eitt</strong> av alternativa under.</p>
<h4>Alternativ A: Åleine</h4>
<p>«Jenta og isen» (i stilen til Tarjei Vesaas) og «Frå hytta» (i stilen til Jon Fosse) handlar begge om ein ung person som er åleine med naturen og tankane sine. Samanlikn korleis tekstane viser kva personen tenkjer og kjenner, og korleis korte setningar i den eine og gjentaking i den andre skaper stemninga.</p>
<h4>Alternativ B: Det som ikkje blir sagt</h4>
<p>I «Heim att» (i stilen til Arne Garborg) og «Bussen klokka kvart over fem» (i stilen til Frode Grytten) er det viktigaste usagt. Samanlikn korleis tekstane bruker replikkar, handlingar og detaljar til å vise det personane ikkje seier.</p>
<h4>Alternativ C: Å sjå tilbake</h4>
<p>«Ein morgon» (i stilen til Halldis Moren Vesaas) og «Klassebilete» (i stilen til Olaug Nilssen) handlar begge om ein forteljar som ser tilbake. Samanlikn kva forteljarane ser tilbake på, korleis små detaljar får stor tyding, og kva tekstane seier om tid og tap.</p>
<h4>Alternativ D: Før og no</h4>
<p>Tolk og samanlikn «Med toget over vidda», som er skriven i stilen til Aasmund Olavsson Vinje, og diktet «Ved Rundarne» frå 1864, som Vinje skreiv sjølv. Vis korleis begge tekstane går frå det forteljaren ser til det han tenkjer, og skriv kort om kva som skil språket i diktet frå nynorsk i dag.</p>
<h4>Krav til teksten</h4>
<ul>
<li>Skriv 400 til 600 ord på nynorsk, og gi teksten ein tittel.</li>
<li>Innleiinga skal presentere dei to tekstane: tittel, kven tekstane er skrivne av eller i stilen til, og sjanger.</li>
<li>Hovuddelen skal samanlikne tekstane på minst to punkt, til dømes innhald, forteljar, stemning eller verkemiddel. Bruk fagomgrep.</li>
<li>Ta med minst eitt kort sitat frå kvar tekst, i hermeteikn, og forklar kva sitatet viser.</li>
<li>Avslutninga skal samle tankane dine og seie noko om kva samanlikninga har fått deg til å sjå.</li>
</ul>
<p class="liten">Tips: Les begge tekstane på nytt før du skriv. Noter tre likskapar og tre skilnader. Vel dei to eller tre som du kan seie mest om.</p>`,
      fasit: `<p>Døme på kva ein tekst på høgt nivå kan ta opp. Bruk det som støtte, ikkje som fasit: andre gode tolkingar skal godtakast.</p>
<ul>
<li><strong>A:</strong> Begge personane er åleine og ser ut over eit snølandskap, men jenta i «Jenta og isen» går ut og prøver isen, medan forteljaren i «Frå hytta» sit stille ved vindauget. Korte setningar og korte avsnitt gir eit sakte, lyttande tempo hos Vesaas («Isen heldt.»). Hos Fosse skaper gjentakinga «Snøen fell» ein rytme som speglar at tankane går i ring. Isen og snøen kan lesast som bilete på det indre. Begge tekstane har ei indre reise: «Det var som ho hadde vore på ei lang reise» og «eg har vore lenger vekk enn nokon kan vite».</li>
<li><strong>B:</strong> Far seier «Du er heime» og «Det var fint», og mor klemmer utan å seie noko. Lina avviser mora to gonger og ser ut av vindauget når Marius spør om Sander. I begge tekstane viser handlingane det replikkane ikkje seier. Ein skilnad er at «Heim att» forklarer logikken i familien («Når noko var stort, sa ein lite»), medan Grytten-teksten aldri fortel kva som har skjedd.</li>
<li><strong>C:</strong> Begge forteljarane ser tilbake, men på ulik måte: «Ein morgon» skildrar ein heil morgon og avslører først mot slutten at han ligg i fortida («det fanst ei tid då slike morgonar var alle eg hadde»), medan «Klassebilete» bruker eit fotografi til å samanlikne då og no. Lukt, lys og lydar ber stemninga i den første, nøkterne opplysningar om flytting og død i den andre. Begge seier at verdien av noko blir tydeleg i ettertid.</li>
<li><strong>D:</strong> Begge tekstane startar i eit konkret fjellandskap og går over i tankar om minne, oss sjølve eller det vi ikkje veit. Diktet er tettare og meir høgtidleg, med rim og faste strofer, medan kursteksten er laus i tonen og har replikkar og humor. Om språket: stor bokstav i substantiva, <em class="nn">aa</em> for <em class="nn">å</em> og former som <em class="nn">saag</em> og <em class="nn">Snjo</em>.</li>
</ul>`,
      skjema: [
        {
          omrade: "Tekstforståing og tolking",
          lag: "Attgir mest innhaldet i dei to tekstane, med lite tolking. Kan misforstå delar av handlinga.",
          middels: "Viser god forståing av begge tekstane og tolkar det sentrale, til dømes det usagde eller tilbakeblikket, med støtte i teksten.",
          hog: "Tolkar sjølvstendig og nyansert, ser fleire lag i tekstane og grunngir tolkingane med treffande sitat.",
        },
        {
          omrade: "Samanlikning, verkemiddel og fagomgrep",
          lag: "Skriv om éin tekst om gongen og nemner ein likskap eller ein skilnad. Få eller ingen fagomgrep.",
          middels: "Samanliknar på minst to punkt og forklarer verknaden av eitt eller to verkemiddel med fagomgrep.",
          hog: "Samanliknar gjennomgåande punkt for punkt og forklarer korleis ulike verkemiddel gir ulik stemning eller tyding. Bruker fagomgrep presist.",
        },
        {
          omrade: "Bruk av tekstane, struktur og tekstbinding",
          lag: "Har lite sitat eller døme. Teksten har ei enkel inndeling, men avsnitta heng laust saman.",
          middels: "Har innleiing, hovuddel og avslutning, sitat frå begge tekstane og bindeord som viser samanlikning, til dømes <em class=\"nn\">medan</em>, <em class=\"nn\">derimot</em> og <em class=\"nn\">begge</em>.",
          hog: "Har ein tydeleg raud tråd, sitat som er godt valde og fletta inn i teksten, og varierte overgangar mellom avsnitta.",
        },
        {
          omrade: "Ordbøying på sidemålet",
          lag: "Meistrar sentrale reglar, til dømes <em class=\"nn\">eg</em>, <em class=\"nn\">ikkje</em> og <em class=\"nn\">-ar</em> i fleirtal av hankjønnsord, men har mange feil i bøying av substantiv og verb.",
          middels: "Meistrar hovudreglar for bøying av substantiv, verb og pronomen. Feila er spreidde og gjer ikkje teksten vanskeleg å lese.",
          hog: "Meistrar i hovudtrekk ordbøyinga, òg hokjønn, sterke verb og samsvarsbøying, og er konsekvent i formvala.",
        },
        {
          omrade: "Ordforråd på sidemålet",
          lag: "Har eit enkelt ordforråd og bruker enkelte ord som er typiske for nynorsk. Ein del bokmålsord.",
          middels: "Har relevant ordforråd og bruker sentrale nynorske ord og uttrykk, som <em class=\"nn\">kvifor</em>, <em class=\"nn\">korleis</em>, <em class=\"nn\">medan</em> og <em class=\"nn\">til dømes</em>. Uttrykkjer seg tenleg om litteratur.",
          hog: "Har variert ordforråd og bruker nynorske ord, uttrykk og fagomgrep med presisjon og variasjon.",
        },
        {
          omrade: "Rettskriving og teiknsetjing",
          lag: "Meistrar sentrale reglar for rettskriving og teiknsetjing, men har mange feil.",
          middels: "Meistrar reglar for rettskriving og sentrale reglar for teiknsetjing, til dømes punktum, komma etter leddsetning først og hermeteikn rundt sitat.",
          hog: "Meistrar reglar for rettskriving og i hovudtrekk reglar for teiknsetjing, òg sitatteknikk.",
        },
      ],
    },
    {
      id: "fagsamtale-forfattar",
      tittel: "Munnleg fagsamtale om ein forfattar og ein tekst",
      type: "munnleg",
      tid: "10 minutt per elev (3 minutt innleiing og 7 minutt samtale)",
      form: "Individuelt eller i par, med ei veke til førebuing",
      hjelpemiddel: "Eitt ark med stikkord",
      karaktergrunnlag: true,
      lareplan: [1, 2, 3, 9, 15],
      modular: ["nynorskforfattarane", "lesing-vinje", "lesing-garborg", "lesing-duun", "lesing-t-vesaas", "lesing-hm-vesaas", "lesing-fosse", "lesing-grytten", "lesing-eikemo", "lesing-nilssen"],
      lararinfo: `<p><strong>Føremål.</strong> Fagsamtalen lèt eleven vise kunnskap om ein nynorskforfattar og forståing av ein tekst munnleg. Han passar for elevar som får vist meir munnleg enn skriftleg, og kan inngå i grunnlaget for karakteren i norsk munnleg. Eleven kan snakke hovudmålet sitt. Det er forståinga og fagspråket som blir vurdert, ikkje sidemålet.</p>
<p><strong>Gjennomføring.</strong> Eleven vel ein av dei ni forfattarane og førebur seg med elevarket. Det er ein fordel om eleven har lese ein ekte tekst av forfattaren, til dømes gjennom oppgåvene «Les ekte … på Nettbiblioteket» i lesemodulane eller lenkjene i «Møt nynorskforfattarane». Eleven innleier i om lag tre minutt. Deretter stiller du oppfølgingsspørsmål. Vel spørsmål som lèt eleven gå frå å attgi til å tolke og samanlikne.</p>
<p><strong>Spørsmål du kan stille.</strong></p>
<ul>
<li>Kvar i tida høyrer forfattaren heime, og kva anna skjedde med nynorsken då?</li>
<li>Kva stiltrekk såg du i kursteksten? Les opp ei setning som viser det.</li>
<li>Kva skjer ikkje på overflata i teksten, men ligg under?</li>
<li>Kva ville gått tapt om teksten var skriven i ein heilt annan stil, til dømes med lange forklaringar?</li>
<li>Kva forfattar i Del 5 er mest ulik denne, og kvifor?</li>
<li>Om eleven har lese ein ekte tekst: Stemde han med kursteksten? Kva var ulikt?</li>
</ul>
<p><strong>Fakta å kjenne att (frå kurset).</strong> Vinje: <em class="nn">Dølen</em> frå 1858, <em class="nn">Ferdaminne fraa Sumaren 1860</em>, «Ved Rondane». Garborg: <em class="nn">Bondestudentar</em> (1883), <em class="nn">Haugtussa</em> (1895). Duun: <em class="nn">Juvikfolket</em> (1918–1923). Tarjei Vesaas: <em class="nn">Is-slottet</em> (1963), <em class="nn">Fuglane</em> (1957). Halldis Moren Vesaas: <em class="nn">Tung tids tale</em> (1945). Fosse: Nobelprisen i 2023, <em class="nn">Morgon og kveld</em> (2000). Grytten: <em class="nn">Bikubesong</em> (1999). Eikemo: <em class="nn">Samtidsruinar</em> (2008), essayistisk stil. Nilssen: <em class="nn">Få meg på, for faen</em> (2005), <em class="nn">Tung tids tale</em> (2017).</p>`,
      elevark: `<h4>Førebu deg til fagsamtalen</h4>
<p>Vel éin av forfattarane frå Del 5: Aasmund Olavsson Vinje, Arne Garborg, Olav Duun, Tarjei Vesaas, Halldis Moren Vesaas, Jon Fosse, Frode Grytten, Marit Eikemo eller Olaug Nilssen.</p>
<p>Du skal snakke i om lag tre minutt. Deretter stiller læraren deg spørsmål. Du får ha med eitt ark med stikkord, men ikkje ferdige setningar.</p>
<ol>
<li><strong>Forfattaren:</strong> Kven er han eller ho, og når levde eller skriv forfattaren? Nemn eitt eller to kjende verk.</li>
<li><strong>Stilen:</strong> Kva kjenneteiknar stilen? Bruk minst to fagomgrep, til dømes korte setningar, gjentaking, symbol, det underforståtte, tilbakeblikk eller nøktern tone.</li>
<li><strong>Kursteksten:</strong> Vel ei kort setning eller ein stad i kursteksten i stilen til forfattaren. Les han høgt, og forklar kva han viser om stilen eller tydinga.</li>
<li><strong>Tolking:</strong> Kva handlar teksten om under overflata? Grunngi med teksten.</li>
<li><strong>Samanlikning:</strong> Samanlikn med ein annan tekst frå Del 5, eller med ein ekte tekst av forfattaren som du har lese.</li>
</ol>
<p>Stikkord:</p>
<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div>`,
      skjema: [
        {
          omrade: "Kunnskap om forfattaren og tida",
          lag: "Plasserer forfattaren omtrent i tid og nemner eitt verk eller eit stikkord om stilen.",
          middels: "Plasserer forfattaren i rett tid, nemner sentrale verk og skildrar stilen med eigne ord og nokre fagomgrep.",
          hog: "Set forfattaren inn i ein samanheng, til dømes landsmålet på 1800-talet eller samtida i dag, og ser samband med andre nynorskforfattarar.",
        },
        {
          omrade: "Tolking av tekst",
          lag: "Attgir innhaldet i kursteksten og seier noko enkelt om kva han handlar om.",
          middels: "Tolkar det som ligg under overflata og grunngir med ein konkret stad i teksten.",
          hog: "Tolkar sjølvstendig, drøftar fleire moglege tolkingar og grunngir med sitat og verkemiddel.",
        },
        {
          omrade: "Fagspråk og verkemiddel",
          lag: "Bruker eit par fagomgrep, men ikkje alltid presist.",
          middels: "Bruker fagomgrep rett og forklarer kva eitt eller to verkemiddel gjer med lesaren.",
          hog: "Bruker fagomgrep presist og naturleg i samtalen og forklarer samspelet mellom stil og tyding.",
        },
        {
          omrade: "Samanlikning og refleksjon i samtalen",
          lag: "Svarar kort på spørsmål og nemner ein enkel likskap eller skilnad.",
          middels: "Samanliknar med ein annan tekst og svarar utdjupande på oppfølgingsspørsmål.",
          hog: "Samanliknar presist, byggjer vidare på spørsmåla og trekkjer inn eigne refleksjonar eller ekte tekstar av forfattaren.",
        },
      ],
    },
  ],
  undervegs: {
    "nynorskforfattarane": {
      tittel: "Exit-lapp",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>Møt nynorskforfattarane</strong></p>
<ol>
<li>Skriv dei ni forfattarane i rett kolonne: Vinje, Garborg, Duun, Tarjei Vesaas, Halldis Moren Vesaas, Fosse, Grytten, Eikemo, Nilssen.
<table><thead><tr><th>1800-talet</th><th>Tidleg 1900-tal</th><th>Samtid</th></tr></thead><tbody><tr><td>&nbsp;<br>&nbsp;</td><td>&nbsp;<br>&nbsp;</td><td>&nbsp;<br>&nbsp;</td></tr></tbody></table></li>
<li>Kven skriv slik? Skriv namnet på forfattaren.
<ol type="a">
<li>Lange setningar utan vanlege punktum, og det same blir sagt om att.</li>
<li>Enkle ord og korte setningar, og naturen speglar menneskesinnet.</li>
<li>Ironisk og observant, og blandar høgt og lågt i reisebrev.</li>
<li>Essayistisk: stiller spørsmål meir enn ho gir svar.</li>
</ol><div class="skrivelinjer"></div></li>
<li>Olaug Nilssen kalla romanen sin frå 2017 <em class="nn">Tung tids tale</em>. Kvifor er tittelen spesiell?<div class="skrivelinjer"></div></li>
<li>Kva forfattar vil du lese meir av? Skriv eitt stikkord om stilen.<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>1800-talet: Vinje og Garborg. Tidleg 1900-tal: Duun, Tarjei Vesaas og Halldis Moren Vesaas. Samtid: Fosse, Grytten, Eikemo og Nilssen.</li>
<li>a) Jon Fosse. b) Tarjei Vesaas. c) Aasmund Olavsson Vinje. d) Marit Eikemo.</li>
<li>Tittelen er lånt frå diktet til Halldis Moren Vesaas frå 1945. Nilssen seier at det no òg er ei tung tid for mange foreldre.</li>
<li>Eige svar. Stikkordet skal passe til forfattaren.</li>
</ol>`,
      sjaa: [
        "Plasserer eleven forfattarane i rett tid, særleg skiljet mellom 1800-talet og samtida?",
        "Knyter eleven stilskildringane til rett forfattar, eller blandar eleven Fosse og Tarjei Vesaas?",
        "Ser eleven at Nilssen viser til eit eldre dikt, og ikkje berre at tittelen er lik?",
        "Passar stikkordet i spørsmål 4 til forfattaren eleven valde?",
      ],
      framover: "Elevar som blandar forfattarane, kan lage ein tabell med tre kolonnar (namn, tid, stil) og fylle han ut med stikkord frå modulen. Be dei byrje med tre forfattarar, éin frå kvar tid, og leggje til fleire etter kvart som dei les tekstane i lesemodulane.",
    },
    "lesing-vinje": {
      tittel: "Sjå og tenkje",
      tid: 10,
      form: "Åleine, med tekstane framfor seg",
      oppgave: `<p><strong>«Med toget over vidda» og «Ved Rundarne»</strong></p>
<ol>
<li>Fyll ut tabellen med to stader i «Med toget over vidda».
<table><thead><tr><th>Det forteljaren ser eller høyrer</th><th>Det forteljaren tenkjer om det</th></tr></thead><tbody><tr><td>&nbsp;<br>&nbsp;</td><td>&nbsp;<br>&nbsp;</td></tr><tr><td>&nbsp;<br>&nbsp;</td><td>&nbsp;<br>&nbsp;</td></tr></tbody></table></li>
<li>I «Ved Rundarne» skriv Vinje: «Alt er som før, men det er meir forklaarat». Kva meiner han?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Nemn eitt trekk som dei to tekstane har sams.<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Døme: guten spør, og mora svarar tolmodig utan å vite alt, og forteljaren tenkjer at vaksne gir svar med stødig stemme sjølv om dei berre delvis veit. Dei to engelskmennene skal gå over vidda, og forteljaren tenkjer at det er noko fint med å gå, og at dei kanskje skjønar noko vi har gløymt. Det luktar sjø, og han tenkjer: slik er Noreg.</li>
<li>Landskapet er det same, men han forstår det betre eller ser det klarare no, fordi han er eldre.</li>
<li>Begge startar i eit konkret fjellandskap og går over til tankar om noko større, som minne, kven vi er eller kva vi ikkje veit.</li>
</ol>`,
      sjaa: [
        "Skil eleven mellom observasjon og tanke, eller står det same i begge kolonnane?",
        "Går eleven frå det konkrete til det allmenne i siste kolonne?",
        "Forstår eleven hovudinnhaldet i landsmålsteksten med hjelp av ordlista?",
      ],
      framover: "Elevar som skriv det same i begge kolonnane, kan øve med spørsmålet «og kva tenkjer han om det?» etter kvar observasjon. La dei finne setninga «Kanskje han skjønar noko vi har gløymt» og sjå kva observasjon ho heng på. Elevar som strevar med landsmålet, kan lese éi strofe høgt saman med ein medelev og ordlista.",
    },
    "lesing-garborg": {
      tittel: "Det som ikkje blir sagt",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>«Heim att»</strong></p>
<p>«Du er heime», sa han.<br>«Ja.»<br>«Det var fint.»</p>
<ol>
<li>Far seier berre nokre få ord. Kva meiner han eigentleg?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Finn ei handling eller ein detalj i teksten som viser kva Anders kjenner, utan at kjensla blir namngitt. Skriv kva kjensle du trur det er.<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Daniel i «Bondestudentar» og Anders i «Heim att» går i kvar si retning. Forklar kort.<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Far er glad for at Anders er heime og bryr seg om han, men i familien seier ein lite når noko er stort. Det er ikkje mangel på kjærleik.</li>
<li>Døme: mor klemmer han lenge utan å seie noko; han vil smile, men klarar det ikkje; han søv ikkje den første natta; kroppen hugsar fjøsarbeidet; han kjenner at han er her, og at det er nok ein augneblink.</li>
<li>Daniel drøymer seg bort frå heimen, mot presteskulen og byen. Anders kjem den motsette vegen, heim att etter fire år i byen.</li>
</ol>`,
      sjaa: [
        "Ser eleven at far bryr seg, eller les eleven dei korte replikkane som kulde?",
        "Finn eleven ein konkret detalj og knyter han til ei kjensle?",
        "Ser eleven den motsette retninga i dei to tekstane?",
      ],
      framover: "Elevar som les far som kald, kan finne setninga «Når noko var stort, sa ein lite» og lese replikkane på nytt med henne i tankane. Neste steg er å skrive om replikken med det far ville sagt om han sa alt rett ut, og samanlikne verknaden.",
    },
    "lesing-duun": {
      tittel: "Vendepunktet",
      tid: 10,
      form: "Åleine",
      oppgave: `<p><strong>«Bestefar og stormen» og «Juvikingar»</strong></p>
<ol>
<li>Kva er vendepunktet i «Bestefar og stormen»? Forklar kort.<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>«Far sa ingenting. Han peika berre.» Kva viser denne handlinga om far?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Skriv av eit døme der vêret blir skildra som om det var levande. Kva heiter dette verkemiddelet?<div class="skrivelinjer"></div></li>
<li>I «Juvikingar» står det: «Per såg berre på han. Kom gjorde han ikkje.» Kva får vi vite om Per på desse få orda?<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Når far ser bestefar i stormen og vel å la han hjelpe i staden for å sende han heim. Godta òg at bestefar snakkar til mor etterpå, om eleven grunngir.</li>
<li>Far lèt bestefar få vere den han har vore heile livet. Han viser respekt og omsorg utan å lage ei sak ut av det.</li>
<li>Døme: «Vinden reiv i alt han nådde», «vinden tok orda», regnet «som finn deg uansett kva du har på deg». Besjeling eller personifikasjon.</li>
<li>Per er trassig og stolt. Han nektar å gjere meir pliktarbeid enn dei var samde om, og lèt seg ikkje kommandere.</li>
</ol>`,
      sjaa: [
        "Peikar eleven på ein konkret augneblink som vendepunkt, eller attgir eleven heile handlinga?",
        "Tolkar eleven handlinga til far, eller les eleven henne som at far er streng?",
        "Finn eleven besjeling og namngir verkemiddelet?",
        "Ser eleven kor mykje Duun seier med få ord?",
      ],
      framover: "Elevar som attgir i staden for å peike ut vendepunktet, kan teikne ei enkel spenningskurve over teksten og markere staden der noko snur. Elevar som ikkje finn besjeling, kan leite etter verb som vanlegvis blir brukte om menneske eller dyr, og som her blir brukte om vind og regn.",
    },
    "lesing-t-vesaas": {
      tittel: "Sitat og tolking",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>«Jenta og isen»</strong></p>
<ol>
<li>Isen kan vere meir enn berre is. Kva kan han stå for? Skriv av eit sitat som støttar tolkinga di.<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>«Heile dalen heldt pusten.» Kva verkemiddel er dette, og kva gjer det med stemninga?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Kva gjer dei korte setningane og avsnitta med tempoet når du les?<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Døme: noko nytt og ukjent som jenta våger seg ut på; det å bli stor og gå åleine; noko skjørt der det kan liggje mørke ting under. Sitat som «Isen heldt», «Innunder seg såg ho noko mørkt» eller «Den første gongen ho gjekk åleine på isen».</li>
<li>Besjeling eller personifikasjon: dalen blir omtala som om han pustar. Det blir heilt stilt og spent, som om naturen ventar.</li>
<li>Lesaren stoppar opp mellom kvart bilete. Tempoet blir sakte og roleg, og kvar detalj får plass.</li>
</ol>`,
      sjaa: [
        "Grunngir eleven tolkinga med eit sitat, eller berre med eiga meining?",
        "Namngir eleven verkemiddelet og forklarer verknaden, ikkje berre kva det betyr?",
        "Knyter eleven form (korte setningar) til innhald (stilla og varsemda)?",
      ],
      framover: "Elevar som tolkar utan sitat, kan bruke malen «Eg trur isen står for …, fordi det står at …». Elevar som ikkje ser isen som symbol, kan samanlikne med noko dei sjølve har gjort for første gong og spørje: kva er likt med å gå ut på ny is?",
    },
    "lesing-hm-vesaas": {
      tittel: "Eitt sitat, tre spørsmål",
      tid: 7,
      form: "Åleine",
      oppgave: `<p><strong>«Ein morgon»</strong></p>
<p>«Slike ting er det ikkje noko stort med, før dei er borte. Då vert dei det største vi har att.»</p>
<ol>
<li>Teksten ser tilbake. Finn ei setning som viser at morgonen ligg i fortida.<div class="skrivelinjer"></div></li>
<li>Nemn to sanseinntrykk frå teksten, og skriv kva sans dei høyrer til.<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Byrjinga og slutten av teksten liknar kvarandre. Kva er likt, og kva har endra seg?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>«For det fanst ei tid då slike morgonar var alle eg hadde.» Godta òg «det er kanskje difor eg hugsar han».</li>
<li>Døme: lukta av kaffi, «brun og bitter og varm» (lukt); fuglane syng, vatnet syd (høyrsel); ei lys stripe over golvet (syn).</li>
<li>Teksten byrjar med «Det er ikkje noko stort med ein morgon i april» og sluttar med «Slike ting er det ikkje noko stort med, før dei er borte». Orda er nesten dei same, men no veit lesaren at morgonen er borte og har vorte det største forteljaren har att. Teksten har ei ramme.</li>
</ol>`,
      sjaa: [
        "Ser eleven tilbakeblikket, eller trur eleven at alt skjer no?",
        "Kjenner eleven att sanseinntrykk og skil mellom sansane?",
        "Ser eleven ramma og korleis tydinga av same ord endrar seg?",
      ],
      framover: "Elevar som ikkje ser tilbakeblikket, kan lese dei to siste avsnitta høgt og streke under alle verb i fortid. Neste steg er å finne kva som kan vere borte, og grunngi med teksten. Det er lov å vere usikker så lenge tolkinga er grunngitt.",
    },
    "lesing-fosse": {
      tittel: "Overflate og djup",
      tid: 10,
      form: "Åleine",
      oppgave: `<p><strong>«Frå hytta»</strong></p>
<ol>
<li>Fyll ut tabellen.
<table><thead><tr><th>Det som skjer på overflata</th><th>Det som ligg under</th></tr></thead><tbody><tr><td>&nbsp;<br>&nbsp;<br>&nbsp;</td><td>&nbsp;<br>&nbsp;<br>&nbsp;</td></tr></tbody></table></li>
<li>«Snøen fell» kjem att mange gonger. Kva gjer gjentakinga med teksten?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Korleis tolkar du «eg har vore lenger vekk enn nokon kan vite»?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Overflata: han sit ved vindauget, snøen fell, han ser ikkje på klokka, telefonen ligg i jakka, han vil bli natta over. Under: han har drege utan å seie det til nokon, han veit ikkje kvifor han måtte, forholdet til mor er stilt («Vi har den slags forhold no»), han forstår bestefar på ein ny måte.</li>
<li>Ho skaper ein langsam, nesten meditativ rytme som passar med at han sit stille. Lesaren blir verande i teksten, og tankane ser ut til å gå i ring.</li>
<li>Han har ikkje reist langt på kartet, men han har vore på ei indre reise i tankane og kjenslene sine.</li>
</ol>`,
      sjaa: [
        "Skil eleven mellom det som skjer og det som ligg under, eller står handling i begge kolonnane?",
        "Forklarer eleven verknaden av gjentakinga, ikkje berre at ho finst?",
        "Tolkar eleven reisa som indre og grunngir med teksten?",
      ],
      framover: "Elevar som berre ser at «ingenting skjer», kan leite etter setningar med «eg veit ikkje» og «kanskje» og spørje kva forteljaren er usikker på. Neste steg er å skrive tre setningar om same ting med og utan gjentaking og kjenne skilnaden i rytmen.",
    },
    "lesing-grytten": {
      tittel: "Spor i teksten",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>«Bussen klokka kvart over fem»</strong></p>
<ol>
<li>Teksten fortel aldri kva som har skjedd. Finn tre spor i teksten som viser at noko er gale.<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Kva trur du har skjedd? Grunngi med spora dine.<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Kvifor trur du forfattaren held tilbake kva som har skjedd?<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Døme: Lina svarar ikkje når mor ringjer, og avviser samtalen andre gongen; ho seier ingenting og ser ut av vindauget når Marius spør om Sander; Marius seier «Det går nok bra» og «Du må ikkje vere åleine om det er noko»; Marte gir henne genser og te, men ingen spørsmål; stemma til mor er lita, som om ho òg har grine.</li>
<li>Eige svar. Rimelege tolkingar er at noko har skjedd med Sander, eller at det har vore ein konflikt heime. Svaret må byggje på spora og ikkje på fritt oppdikta hendingar.</li>
<li>Lesaren må sjølv fylle ut, og då kjenner vi meir av det Lina kjenner. Det passar òg med at ho ikkje vil snakke om det.</li>
</ol>`,
      sjaa: [
        "Finn eleven spor som faktisk står i teksten?",
        "Skil eleven mellom tolking som byggjer på spor og fri gjetting?",
        "Ser eleven at Marius og Marte skjønar meir enn dei seier?",
        "Forklarer eleven verknaden av det underforståtte på lesaren?",
      ],
      framover: "Elevar som gjettar fritt, kan skrive spora i éin kolonne og tolkinga i ein annan og dra ei linje frå kvar tolking til spora som støttar henne. Ei tolking utan linje er ei gjetting. Neste steg er å finne eit spor i omgivnadene, til dømes regnet eller parken som vart riven.",
    },
    "lesing-eikemo": {
      tittel: "Essay eller debattinnlegg?",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>«Om å lese sakte»</strong></p>
<ol>
<li>Set kryss: passar trekket best for eit essay eller for ein argumenterande tekst?
<table><thead><tr><th>Trekk</th><th>Essay</th><th>Argumenterande tekst</th></tr></thead><tbody>
<tr><td>a) Tenkjer høgt og kan skifte meining undervegs</td><td></td><td></td></tr>
<tr><td>b) Har ein klar påstand som skal forsvarast</td><td></td><td></td></tr>
<tr><td>c) Kan ende i eit spørsmål utan svar</td><td></td><td></td></tr>
<tr><td>d) Vil overtyde lesaren om å gjere noko</td><td></td><td></td></tr>
</tbody></table></li>
<li>Finn eitt kvardagsbilete som teksten bruker til å seie noko stort. Kva seier det?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Skriv om ein situasjon der du les raskt, og ein der du les sakte. Kvifor les du ulikt?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Essay: a og c. Argumenterande tekst: b og d.</li>
<li>Døme: laurdagen i lenestolen då ho var tolv år; lukta av hekk som framleis minner om ein scene i ei bok; læraren som bad elevane lese same dikt tre gonger; foten som vippar når ho les fort. Bileta viser at sakte lesing kan endre oss, medan rask lesing berre gir informasjon.</li>
<li>Eige svar. Sjå etter om eleven knyter lesemåten til føremålet, til dømes å leite etter informasjon eller å leve seg inn i ei forteljing.</li>
</ol>`,
      sjaa: [
        "Skil eleven essayet frå den argumenterande teksten?",
        "Ser eleven korleis det konkrete biletet peikar mot eit stort spørsmål?",
        "Reflekterer eleven over eigne lesestrategiar og knyter dei til føremålet med lesinga?",
      ],
      framover: "Elevar som meiner at teksten argumenterer mot skjermlesing, kan leite etter alle spørsmålsteikn i teksten og lese dei to siste setningane på nytt: forfattaren seier at ho ikkje veit svaret. Neste steg er å skrive tre setningar om eiga lesing der minst éi er eit ope spørsmål.",
    },
    "lesing-nilssen": {
      tittel: "Detaljar i staden for kjensleord",
      tid: 8,
      form: "Åleine",
      oppgave: `<p><strong>«Klassebilete»</strong></p>
<ol>
<li>Kva skriv forteljaren om Mikkel? Kvifor trur du ho skriv så kort om han?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Finn to detaljar frå biletet eller frå dagen i dag som viser kjensler utan at kjensla blir namngitt.<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
<li>Forteljaren seier at «å sjå på eit gamalt bilete kan vere arbeid». Kva meiner ho?<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Han døydde i ei ulukke i fjor sommar, står lengst til venstre, smiler skeivt og har på seg ei Brann-trøye. Den korte, nøkterne omtalen gjer at det vonde står sterkare, og lèt lesaren kjenne sjølv.</li>
<li>Døme: Henrik ser ned i golvet; forteljaren ser rett i kamera, men smiler ikkje; den stygge blå hettegenseren; ho la biletet vekk, men tok det fram att neste dag; «Var det ikkje noko du skulle gjere?» «Jo.»</li>
<li>Ho bruker biletet til å forstå korleis ho har vorte den ho er: kor mange val, uhell og avskjedar som har vore mellom jenta på biletet og jenta som sit på senga no.</li>
</ol>`,
      sjaa: [
        "Ser eleven at den korte omtalen av Mikkel er eit val, og ikkje at ho ikkje bryr seg?",
        "Finn eleven konkrete detaljar og forklarer kva kjensle dei viser?",
        "Tolkar eleven «arbeid» som ein måte å forstå seg sjølv på?",
      ],
      framover: "Elevar som les den nøkterne tonen som kjenslekald, kan skrive om avsnittet om Mikkel med mange kjensleord og samanlikne dei to versjonane. Kva verkar sterkast? Neste steg er å finne den same teknikken i eigen tekst i skriveoppgåva i modulen.",
    },
    "lesing-samanlikning": {
      tittel: "Samanlikningstabell",
      tid: 12,
      form: "I par, så åleine",
      oppgave: `<p><strong>Samanlikn tekstane</strong></p>
<p>Vel to av dei ni tekstane i Del 5. Fyll ut tabellen saman med ein medelev. Skriv så åleine to setningar som samanliknar.</p>
<table><thead><tr><th></th><th>Tekst 1: __________________</th><th>Tekst 2: __________________</th></tr></thead><tbody>
<tr><td>Skriven i stilen til</td><td></td><td></td></tr>
<tr><td>Sjanger</td><td></td><td></td></tr>
<tr><td>Setningar og avsnitt (korte, lange, gjentaking, dialog)</td><td></td><td></td></tr>
<tr><td>Stemning</td><td></td><td></td></tr>
<tr><td>Eit kort sitat som viser stilen</td><td></td><td></td></tr>
</tbody></table>
<ol>
<li>Skriv éi setning om ein likskap. Bruk <em class="nn">begge</em>.<div class="skrivelinjer"></div></li>
<li>Skriv éi setning om ein skilnad. Bruk <em class="nn">medan</em> eller <em class="nn">derimot</em>.<div class="skrivelinjer"></div></li>
</ol>`,
      sjaa: [
        "Plasserer eleven tekstane rett i stil og sjanger, til dømes tankestraum for Fosse og essay for Eikemo?",
        "Skildrar eleven setningsbygnaden med konkrete trekk og eit sitat som faktisk viser stilen?",
        "Samanliknar eleven i same setning, eller skriv eleven om éin tekst om gongen?",
        "Er setningane skrivne på nynorsk med rett bruk av bindeorda?",
      ],
      framover: "Elevar som skriv om éin tekst om gongen, kan bruke malen «I … er …, medan … i … er …» og fylle ut éi rad i tabellen om gongen. Neste steg er å forklare kvifor skilnaden finst: kva gjer dei korte setningane som dei lange ikkje gjer? Dette er grunnlaget for skriveoppgåva om to tekstar.",
    },
  },
  eigenvurdering: [
    "namngi fleire nynorskforfattarar, plassere dei i tid og nemne eitt verk av nokre av dei",
    "finne opplysningar som står direkte i ein tekst",
    "tolke det som ikkje blir sagt rett ut, og grunngi tolkinga med sitat frå teksten",
    "kjenne att verkemiddel som korte setningar, gjentaking, symbol, besjeling og tilbakeblikk, og forklare kva dei gjer med lesaren",
    "lese ein eldre tekst på landsmål med hjelp av ordliste og forklare kva han handlar om",
    "samanlikne to tekstar med fagomgrep og konkrete døme frå begge",
    "velje lesemåte etter kva eg les og kvifor, og forklare korleis eg les",
    "skrive om tekstar på nynorsk med rett bøying og typiske nynorske ord",
  ],
});
