/* Vurdering for Del 3: Ordbok og oppslag. Formatet står i larer/README.md under «Vurdering».
   Alle svar i fasitane er kontrollerte mot Nynorskordboka (ord.uib.no) i oktober 2026. */
Vurdering.register(3, {
  intro: `<p>Del 3 vurderer om eleven kan bruke ordboka som reiskap i nynorsk skriving: velje rett ordbok, finne oppslagsordet når ordet står bøygd, lese kjønn, bøying og tyding ut av artikkelen, og finne eit nynorskord ut frå eit bokmålsord.</p>
<p>Undervegsvurderingane er korte exit-lappar til slutten av kvar modul. Sluttvurderinga har to delar: ei praktisk ordbokprøve på ordbokene.no, som viser oppslagsferdigheitene kvar for seg, og ei skriveoppgåve der eleven rettar og forbetrar ein tekst med ordboka og grunngir rettingane. Den siste viser best om ordbokbruken gir betre nynorsk i tekst, og bør vege tyngst.</p>`,
  lareplan: [11, 12],
  kompetanse: `<p>Etter delen skal eleven kunne bruke Nynorskordboka på ordbokene.no til å kontrollere og forbetre eigen nynorsk. Det viser seg ved at eleven finn grunnforma til bøygde ord, også sterke verb og substantiv med vokalskifte, hentar ut kjønn og rett bøyingsform frå artikkelen, vel den tydinga som passar i samanhengen, og byter ut bokmålsord med nynorskord som finst i ordboka. I eigne tekstar skal eleven kunne grunngi ei retting med det ordboka viser.</p>`,
  kjenneteikn: [
    {
      omrade: "Velje ordbok",
      lag: "Kjenner til ordbokene.no og vel Nynorskordboka når spørsmålet er om eit ord er lov på nynorsk.",
      middels: "Vel rett ordbok i vanlege situasjonar og grunngir valet med kva ordboka er laga for (norm, forklaring, uttale, papir).",
      hog: "Vel ordbok sikkert ut frå kva spørsmålet gjeld, og forklarar kvifor Nynorskordboka avgjer kva som er rett, medan Lexin forklarar.",
    },
    {
      omrade: "Finne oppslagsordet",
      lag: "Finn grunnforma til regelrette substantiv og svake verb, til dømes <em class=\"nn\">fuglane</em> og <em class=\"nn\">kasta</em>.",
      middels: "Finn grunnforma til dei fleste bøygde former, også ein del sterke verb, og bruker søket på ordbokene.no ved tvil.",
      hog: "Finn grunnforma til sterke verb, substantiv med vokalskifte og uregelrette adjektiv, og forklarar kvifor ein ikkje kan stryke ei ending på <em class=\"nn\">batt</em> eller <em class=\"nn\">døtrene</em>.",
    },
    {
      omrade: "Lese bøyingsinformasjon",
      lag: "Les kjønnet og bestemt form eintal ut av artikkelen, men blandar ofte plassane i bøyingsrekkja.",
      middels: "Hentar ut rett form av substantiv og verb frå bøyingsrekkja og bruker henne rett i ei setning.",
      hog: "Hentar ut alle formene sikkert, ser når fleire former er jamstilte, og bruker kjønn og bøying konsekvent i tekst.",
    },
    {
      omrade: "Velje rett tyding og rett ord",
      lag: "Les den første tydinga og bruker henne, sjølv når ho ikkje passar i setninga.",
      middels: "Vel rett tyding når artikkelen har fleire, og finn nynorskord for vanlege bokmålsord via søket eller forklaringa i Bokmålsordboka.",
      hog: "Skil mellom like oppslagsord (til dømes <em class=\"nn\">ballen</em> og <em class=\"nn\">ballet</em>), vel tyding ut frå samanhengen og finn nynorskord som passar både i tyding og form.",
    },
    {
      omrade: "Bruke ordboka i eigen tekst",
      lag: "Rettar nokre openberre bokmålsord i ein tekst, men grunngir sjeldan rettinga og rettar av og til rette former til feil.",
      middels: "Rettar dei fleste feila i bøying, kjønn og ordval og grunngir rettingane med det ordboka viser.",
      hog: "Finn og rettar nesten alle feila, grunngir presist (kjønn, bøyingsform, tyding) og lèt jamstilte former stå. Forbetrar i tillegg ordval og variasjon.",
    },
  ],
  provar: [
    {
      id: "ordbokprove",
      tittel: "Praktisk ordbokprøve på ordbokene.no",
      type: "praktisk",
      tid: "45 minutt",
      form: "Individuelt",
      hjelpemiddel: "ordbokene.no (Nynorskordboka og Bokmålsordboka)",
      karaktergrunnlag: true,
      lareplan: [11, 12],
      modular: ["ordbok-grunnform", "ordbok-artikkel", "ordbok-i-skriving"],
      lararinfo: `<p><strong>Føremål:</strong> Prøva viser om eleven kan gjere dei fire oppslaga som betyr mest i skriving: finne oppslagsordet, lese bøyinga, velje rett tyding og finne nynorskordet.</p>
<p><strong>Gjennomføring:</strong> Eleven treng PC eller nettbrett med ordbokene.no. Andre nettsider, omsetjingsverktøy og KI er ikkje lov. Elevar som bruker Lexin på prøver, kan få bruke Lexin i tillegg. Svara blir skrivne på arket.</p>
<p><strong>Før prøva:</strong> Alle svar er kontrollerte mot Nynorskordboka i oktober 2026. Ordboka blir oppdatert, særleg nummereringa av tydingar. Slå difor opp <em class="nn">tak</em>, <em class="nn">ball</em> og <em class="nn">fil</em> dagen før og sjå at fasiten i del C framleis stemmer.</p>
<p><strong>Kva prøva viser og ikkje viser:</strong> Prøva viser delkompetanse i ordbokbruk, ikkje om eleven skriv god nynorsk. Ho bør difor vege mindre enn skriveoppgåva. Godta alle former som står som jamstilte i ordboka.</p>`,
      elevark: `<p>Bruk ordbokene.no. Skriv svara på arket.</p>
<h4>Del A: Finn oppslagsordet (8 poeng)</h4>
<p>Skriv oppslagsordet (grunnforma) til det utheva ordet, slik det står i Nynorskordboka.</p>
<ol>
<li>Katten <strong>smaug</strong> inn gjennom døra. ____________</li>
<li>Ho <strong>batt</strong> båten fast til brygga. ____________</li>
<li>Vi <strong>fraus</strong> på hendene. ____________</li>
<li>Han <strong>spurde</strong> om vegen. ____________</li>
<li><strong>Døtrene</strong> hennar bur i byen. ____________</li>
<li><strong>Brørne</strong> mine spelar fotball. ____________</li>
<li><strong>Tærne</strong> mine var iskalde. ____________</li>
<li>Dei <strong>gamle</strong> husa stod tomme. ____________</li>
</ol>
<h4>Del B: Les bøyinga (18 poeng)</h4>
<p>Slå opp orda og fyll ut tabellane. Står det fleire jamstilte former, held det å skrive éi.</p>
<table>
<tr><th>Substantiv</th><th>Kjønn</th><th>Bestemt form eintal</th><th>Bestemt form fleirtal</th></tr>
<tr><td>kyrkje</td><td></td><td></td><td></td></tr>
<tr><td>vatn</td><td></td><td></td><td></td></tr>
<tr><td>bonde</td><td></td><td></td><td></td></tr>
</table>
<table>
<tr><th>Verb</th><th>Presens</th><th>Preteritum</th><th>Perfektum partisipp (har …)</th></tr>
<tr><td>gråte</td><td></td><td></td><td></td></tr>
<tr><td>velje</td><td></td><td></td><td></td></tr>
<tr><td>døy</td><td></td><td></td><td></td></tr>
</table>
<h4>Del C: Vel rett tyding (8 poeng)</h4>
<p>Slå opp det utheva ordet. Det kan finnast fleire artiklar med same oppslagsord. Skriv kva kjønn ordet har i denne setninga, og skriv med eigne ord eller med ordbokas ord kva det tyder her.</p>
<ol>
<li>Ho kjøpte ny kjole til <strong>ballet</strong> på skulen.<div class="skrivelinjer"></div></li>
<li>Elden fekk <strong>tak</strong> i det tørre graset.<div class="skrivelinjer"></div></li>
<li>Kommunen sette eit <strong>tak</strong> på kor mykje bygget kunne koste.<div class="skrivelinjer"></div></li>
<li>Bilen la seg over i venstre <strong>fil</strong>.<div class="skrivelinjer"></div></li>
</ol>
<h4>Del D: Finn nynorskordet (8 poeng)</h4>
<p>Det utheva ordet er bokmål og står ikkje i Nynorskordboka. Finn eit nynorskord som tyder det same, og skriv det i den forma det må ha i setninga.</p>
<ol>
<li>Vi <strong>spiste</strong> middag klokka fem. ____________</li>
<li>Det var i <strong>begynnelsen</strong> av året. ____________</li>
<li>Ho bur <strong>fremdeles</strong> heime. ____________</li>
<li>Han var borte frå skulen på grunn av <strong>sykdom</strong>. ____________</li>
<li>Det var ei stor <strong>hendelse</strong> i bygda. ____________</li>
<li>Etter kampen var ho <strong>lykkelig</strong>. ____________</li>
<li>Vel eitt av orda i del D og forklar korleis du fann nynorskordet. (2 poeng)<div class="skrivelinjer"></div><div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<h4>Del A (1 poeng kvar)</h4>
<ol>
<li><em class="nn">smyge</em> (sterkt verb)</li>
<li><em class="nn">binde</em> (sterkt verb)</li>
<li><em class="nn">fryse</em> (sterkt verb)</li>
<li><em class="nn">spørje</em></li>
<li><em class="nn">dotter</em></li>
<li><em class="nn">bror</em></li>
<li><em class="nn">tå</em></li>
<li><em class="nn">gammal</em> eller <em class="nn">gamal</em> (begge står i same artikkel)</li>
</ol>
<p>Godta a-infinitiv (<em class="nn">smyga, binda</em> …), sidan ordboka viser begge infinitivsformene.</p>
<h4>Del B (1 poeng per rute)</h4>
<table>
<tr><th>Substantiv</th><th>Kjønn</th><th>Bestemt eintal</th><th>Bestemt fleirtal</th></tr>
<tr><td>kyrkje</td><td>hokjønn</td><td><em class="nn">kyrkja</em></td><td><em class="nn">kyrkjene</em></td></tr>
<tr><td>vatn</td><td>inkjekjønn</td><td><em class="nn">vatnet</em></td><td><em class="nn">vatna</em></td></tr>
<tr><td>bonde</td><td>hankjønn</td><td><em class="nn">bonden</em></td><td><em class="nn">bøndene</em></td></tr>
</table>
<table>
<tr><th>Verb</th><th>Presens</th><th>Preteritum</th><th>Perfektum partisipp</th></tr>
<tr><td>gråte</td><td><em class="nn">græt</em></td><td><em class="nn">gret</em></td><td><em class="nn">gråte</em></td></tr>
<tr><td>velje</td><td><em class="nn">vel</em></td><td><em class="nn">valde</em></td><td><em class="nn">valt</em></td></tr>
<tr><td>døy</td><td><em class="nn">døyr</em></td><td><em class="nn">døydde</em></td><td><em class="nn">døydd</em> eller <em class="nn">døytt</em></td></tr>
</table>
<p>Søket på <em class="nn">kyrkje</em> og <em class="nn">vatn</em> gir òg eit verb (<em class="nn">kyrkje</em>, <em class="nn">vatne</em>). Eleven skal bruke substantivet.</p>
<h4>Del C (2 poeng kvar: 1 for rett artikkel eller kjønn, 1 for rett tyding)</h4>
<ol>
<li>Inkjekjønn (<em class="nn">ballet</em>). Artikkelen <em class="nn">ball</em> 2: «(finare) danselag». Elevar som vel <em class="nn">ein ball</em> (kule å leike med), har ikkje lese kjønnet ut av forma <em class="nn">ballet</em>.</li>
<li>Inkjekjønn. Artikkelen <em class="nn">tak</em> 2, tyding 2: «det at noko festar seg; feste, hald». Døme i ordboka: <em class="nn">elden fekk tak</em>.</li>
<li>Inkjekjønn. Artikkelen <em class="nn">tak</em> 1, tyding 3: «avgrensing, øvre grense». Døme i ordboka: <em class="nn">setje tak på løyvingane</em>.</li>
<li>Hokjønn. Artikkelen <em class="nn">fil</em> 2, tyding 1: «kvart av fleire langsgåande felt av køyrebane; køyrefelt».</li>
</ol>
<p>Godta forklaringar med eigne ord som treffer tydinga. Nummeret på artikkelen og tydinga er ikkje påkravd.</p>
<h4>Del D (1 poeng kvar, oppgåve 7 gir 2 poeng)</h4>
<ol>
<li><em class="nn">åt</em> (grunnform <em class="nn">ete</em>). Bokmålsordboka forklarar <em class="bm">spise</em> med mellom anna «ete». Gi ikkje poeng for <em class="nn">ete</em> eller <em class="nn">et</em>, sidan setninga krev preteritum.</li>
<li><em class="nn">byrjinga</em> eller <em class="nn">starten</em>. Bokmålsordboka gir «start» i forklaringa.</li>
<li><em class="nn">framleis</em>, <em class="nn">enno</em>, <em class="nn">ennå</em>, <em class="nn">enda</em> eller <em class="nn">endå</em>. Bokmålsordboka gir «ennå» i forklaringa.</li>
<li><em class="nn">sjukdom</em>. Bokmålsordboka har oppslagsordet <em class="bm">sykdom / sjukdom</em>.</li>
<li><em class="nn">hending</em>. Bokmålsordboka har oppslagsordet <em class="bm">hendelse / hending</em>. Ordet er hokjønn og passar med <em class="nn">ei stor</em>.</li>
<li><em class="nn">lykkeleg</em> eller <em class="nn">lukkeleg</em>. Søket i Nynorskordboka foreslår begge.</li>
<li>2 poeng: eleven skildrar ein framgangsmåte som verkar (slo opp bokmålsordet i Bokmålsordboka og fann eit ord i forklaringa, eller fekk forslag i søket), og fortel at det nye ordet er sjekka i Nynorskordboka. 1 poeng: framgangsmåten er nemnd, men utan kontroll i Nynorskordboka.</li>
</ol>`,
      poeng: { maks: 42, lag: "13 til 24 poeng", middels: "25 til 35 poeng", hog: "36 til 42 poeng" },
      skjema: [
        {
          omrade: "Finne oppslagsordet (del A)",
          lag: "Finn grunnforma til substantiva med regelrett bøying, men ikkje til dei sterke verba.",
          middels: "Finn grunnforma til dei fleste orda, også nokre sterke verb.",
          hog: "Finn grunnforma til alle eller nesten alle orda, også <em class=\"nn\">batt</em>, <em class=\"nn\">døtrene</em> og <em class=\"nn\">gamle</em>.",
        },
        {
          omrade: "Lese bøyinga (del B)",
          lag: "Finn kjønnet og nokre former, men set ofte formene på feil plass.",
          middels: "Fyller ut dei fleste rutene rett, med enkelte feil i verba.",
          hog: "Fyller ut alle eller nesten alle rutene rett og vel substantivet når søket òg gir eit verb.",
        },
        {
          omrade: "Velje rett tyding (del C)",
          lag: "Vel den første artikkelen eller tydinga utan å sjå på samanhengen.",
          middels: "Vel rett tyding i dei fleste setningane.",
          hog: "Vel rett artikkel og tyding i alle setningane og bruker kjønnet til å skilje like oppslagsord.",
        },
        {
          omrade: "Finne nynorskordet (del D)",
          lag: "Finn nynorskord for nokre av orda, men ofte i feil form.",
          middels: "Finn nynorskord for dei fleste orda og skildrar ein framgangsmåte som verkar.",
          hog: "Finn nynorskord i rett form for alle orda og forklarar framgangsmåten presist.",
        },
      ],
    },
    {
      id: "rett-med-ordboka",
      tittel: "Rett og forbetre ein tekst med ordboka",
      type: "skriving",
      tid: "60 minutt",
      form: "Individuelt",
      hjelpemiddel: "ordbokene.no eller papirordbok",
      karaktergrunnlag: true,
      lareplan: [11, 12],
      modular: ["ordbok-artikkel", "ordbok-i-skriving"],
      lararinfo: `<p><strong>Føremål:</strong> Oppgåva viser om eleven kan bruke ordboka til å finne og rette feil i ein nynorsktekst, og grunngi rettingane med det ordboka viser. Det er denne kompetansen som gir betre rettskriving og ordbøying i eigne tekstar.</p>
<p><strong>Gjennomføring:</strong> Eleven får den utdelte teksten med ti planta feil. Fortel at feila er av tre slag: bokmålsord, feil kjønn og feil bøying. Grunngivinga i tabellen veg like tungt som sjølve rettinga.</p>
<p><strong>Variant med eigen tekst:</strong> Eleven kan i staden bruke ein eigen nynorsktekst på 150 til 250 ord, til dømes teksten om ein stad frå modulen Bruk ordboka mens du skriv. Eleven slår då opp minst åtte ord, rettar det som må rettast og fyller ut same tabell. Bruk same skjema.</p>
<p><strong>Tilpassing:</strong> Elevar som treng det, kan få vite kva setningar feila står i. Det gjer oppgåva lettare, og det bør nemnast i vurderinga.</p>
<p><strong>Kva oppgåva ikkje viser:</strong> Ho viser ikkje om eleven skriv god nynorsk frå grunnen av. Samanlikn gjerne med tekstar eleven skriv i Del 4.</p>`,
      elevark: `<p>Teksten under er skriven på nynorsk, men har <strong>ti feil</strong>. Nokre ord er bokmål, nokre har feil kjønn, og nokre er feil bøygde. Bruk ordboka.</p>
<div class="callout">
<p><strong>Ein tur til hytta</strong></p>
<p>I begynnelsen av sommarferien drog familien min til hytta ved sjøen. Vi skulle vere der i eit veke. Då vi kom fram, var det kaldt inne, så far fyrte i omnen. Mor og veslebroren min spiste brødskiver medan eg bar inn bagasjen. Om kvelden rodde vi ut på fjorden og fiska. Vi fekk fire torskar, og far reinska fiskene på brygga. Då sola gikk ned, var vi tilbake i hytta. På hylla fant eg ein gammal kikkert som nokon hadde gløymt. Det var ein koselig kveld. Neste morgon kunne vi ikkje opne døren, for det hadde blåst kraftig om natta, og ei stor grein låg framfor. Til slutt fekk vi ho bort, men far var fremdeles sur då vi sette oss i bilen. Eg håpar vi kjem tilbake til hausten, for då kan vi plukke alle eplene i hagen.</p>
</div>
<h4>Oppgåve 1: Rett feila</h4>
<p>Fyll ut tabellen. I den siste kolonnen skriv du kva du slo opp, og kva ordboka viste deg. Døme: «Slo opp <em>bok</em>. Ordet er hokjønn, så det heiter <em>ei bok</em>.»</p>
<table>
<tr><th>Feil</th><th>Rett form</th><th>Kva slo du opp, og kva viste ordboka?</th></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
<tr><td>&nbsp;</td><td></td><td></td></tr>
</table>
<h4>Oppgåve 2: Gjer teksten betre</h4>
<p>Vel to setningar du vil gjere betre, til dømes med eit meir presist eller meir variert ord. Skriv dei nye setningane, og forklar kva du har endra og kvifor. Sjekk nye ord i ordboka.</p>
<div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div><div class="skrivelinjer"></div>`,
      fasit: `<h4>Dei ti feila</h4>
<table>
<tr><th>Feil</th><th>Rett form</th><th>Kva ordboka viser</th></tr>
<tr><td><em class="bm">begynnelsen</em></td><td><em class="nn">byrjinga</em> eller <em class="nn">starten</em></td><td>Bokmålsord, ingen treff i Nynorskordboka. Bokmålsordboka forklarar med «start». <em class="nn">byrjing</em> er hokjønn.</td></tr>
<tr><td><em class="bm">eit veke</em></td><td><em class="nn">ei veke</em></td><td><em class="nn">veke</em> er hokjønn.</td></tr>
<tr><td><em class="bm">spiste</em></td><td><em class="nn">åt</em></td><td>Bokmålsord. Nynorsk har <em class="nn">ete</em>, preteritum <em class="nn">åt</em>.</td></tr>
<tr><td><em class="bm">fiskene</em></td><td><em class="nn">fiskane</em></td><td><em class="nn">fisk</em> er hankjønn, bestemt fleirtal <em class="nn">fiskane</em>.</td></tr>
<tr><td><em class="bm">gikk</em></td><td><em class="nn">gjekk</em></td><td>Preteritum av <em class="nn">gå</em>.</td></tr>
<tr><td><em class="bm">fant</em></td><td><em class="nn">fann</em></td><td>Preteritum av <em class="nn">finne</em>. NB: Søket på <em class="nn">fant</em> gir treff, men på substantivet <em class="nn">fant</em> (ein kar, ein kjeltring). Treff betyr ikkje at forma er rett.</td></tr>
<tr><td><em class="bm">koselig</em></td><td><em class="nn">koseleg</em></td><td>Adjektiv på <em class="bm">-lig</em> heiter <em class="nn">-leg</em> på nynorsk.</td></tr>
<tr><td><em class="bm">døren</em></td><td><em class="nn">døra</em></td><td><em class="nn">dør</em> er hokjønn, bestemt eintal <em class="nn">døra</em>.</td></tr>
<tr><td><em class="bm">fremdeles</em></td><td><em class="nn">framleis</em>, <em class="nn">enno</em>, <em class="nn">ennå</em>, <em class="nn">enda</em> eller <em class="nn">endå</em></td><td>Bokmålsord. Bokmålsordboka forklarar med «ennå».</td></tr>
<tr><td><em class="bm">eplene</em></td><td><em class="nn">epla</em></td><td><em class="nn">eple</em> er inkjekjønn, bestemt fleirtal <em class="nn">epla</em>.</td></tr>
</table>
<p><strong>Former som er rette og skal stå:</strong> <em class="nn">drog</em>, <em class="nn">fyrte</em>, <em class="nn">rodde</em>, <em class="nn">fiska</em>, <em class="nn">torskar</em>, <em class="nn">reinska</em>, <em class="nn">kikkert</em>, <em class="nn">blåst</em>, <em class="nn">grein</em> (hokjønn, difor <em class="nn">ho</em>) og <em class="nn">håpar</em>. Elevar som endrar <em class="nn">håpar</em> til <em class="nn">håper</em>, gjer ingen feil, for begge er lov. Elevar som endrar ei rett form til ei ugyldig form, har gjort ein ny feil.</p>
<p><strong>Oppgåve 2:</strong> Ingen fasit. Gode svar byter til dømes ut <em class="nn">var det kaldt inne</em> med noko meir presist, varierer setningsbyrjingane (mange byrjar med <em class="nn">Vi</em> eller <em class="nn">Då</em>), eller vel eit meir presist verb enn <em class="nn">fekk vi ho bort</em>. Sjå etter at nye ord er rett bøygde nynorskord.</p>`,
      skjema: [
        {
          omrade: "Finne feila",
          lag: "Finn 3 til 5 av feila, mest dei openberre bokmålsorda.",
          middels: "Finn 6 til 8 av feila, også nokre feil i kjønn og bøying.",
          hog: "Finn 9 eller 10 av feila og rettar ikkje rette former til feil.",
        },
        {
          omrade: "Rette til rett nynorsk form",
          lag: "Rettar fleire ord til ei form som framleis er feil, til dømes rett ord i feil bøying.",
          middels: "Dei fleste rettingane er rette former som passar i setninga.",
          hog: "Alle eller nesten alle rettingane er rette, med rett kjønn og rett bøying i samanhengen.",
        },
        {
          omrade: "Grunngi med ordboka",
          lag: "Grunngivinga manglar eller er generell («det er bokmål»).",
          middels: "Grunngir dei fleste rettingane med oppslagsordet og det ordboka viste (kjønn, form, forklaring).",
          hog: "Grunngir presist: nemner oppslagsordet, kjønn eller bøyingsform, og ser når eit treff ikkje er det rette ordet.",
        },
        {
          omrade: "Forbetre teksten",
          lag: "Endrar lite, eller nye ord er bokmål eller feil bøygde.",
          middels: "Gjer to endringar som gjer setningane betre, og nye ord er rette.",
          hog: "Gjer endringar som tydeleg gir meir presist eller variert språk, og forklarar kvifor.",
        },
      ],
    },
  ],
  undervegs: {
    "ordbok-verktoya": {
      tittel: "Exit-lapp",
      tid: 7,
      form: "Åleine",
      oppgave: `<p><strong>Kva ordbok vel du?</strong> Skriv <em>Lexin</em>, <em>Nynorskordboka</em> eller <em>papirordboka</em>, og ei kort grunngiving.</p>
<ol>
<li>Du lurer på om <em class="nn">venskap</em> er lov å skrive på nynorsk.<div class="skrivelinjer"></div></li>
<li>Du vil høyre korleis <em class="nn">kyrkje</em> blir uttalt.<div class="skrivelinjer"></div></li>
<li>Du sit på ei prøve utan PC og nett.<div class="skrivelinjer"></div></li>
<li>Du vil vite kva <em class="nn">høve</em> heiter på morsmålet ditt.<div class="skrivelinjer"></div></li>
<li>Du vil vite kva fleirtal av <em class="nn">kyrkje</em> er på nynorsk.<div class="skrivelinjer"></div></li>
</ol>
<p>Kva er dei fire spørsmåla ei ordbok svarar på?</p><div class="skrivelinjer"></div><div class="skrivelinjer"></div>`,
      fasit: `<ol>
<li>Nynorskordboka på ordbokene.no: ho viser den offisielle rettskrivinga.</li>
<li>Lexin: ho les ordet høgt.</li>
<li>Papirordboka: ho treng ikkje nett.</li>
<li>Lexin: ho har mange andre språk.</li>
<li>Nynorskordboka: ho viser alle tillatne bøyingsformer (<em class="nn">kyrkjer</em>).</li>
</ol>
<p>Dei fire spørsmåla: Finst ordet? Kva tyder det? Kva ordklasse og kjønn har det? Korleis blir det bøygd?</p>`,
      sjaa: [
        "Vel eleven Nynorskordboka når spørsmålet er kva som er lov på nynorsk?",
        "Er grunngivinga knytt til kva ordboka er laga for, ikkje berre «den er best»?",
        "Kan eleven nemne alle fire spørsmåla, særleg kjønn og bøying?",
      ],
      framover: "Elevar som vel Lexin til normspørsmål, kan få to minutt med begge ordbøkene opne og slå opp same ord. La dei skrive ned éin ting Nynorskordboka viser som Lexin ikkje viser. Repeter tabellen «Kva vel du når?» i elevmodulen.",
    },
    "ordbok-grunnform": {
      tittel: "Exit-lapp",
      tid: 8,
      form: "Åleine, utan ordbok",
      oppgave: `<p><strong>1.</strong> Skriv grunnforma, altså det ordet du må slå opp. Set ring rundt dei to sterke verba.</p>
<ol>
<li><em class="nn">fuglane</em> → ____________</li>
<li><em class="nn">drakk</em> → ____________</li>
<li><em class="nn">tennene</em> → ____________</li>
<li><em class="nn">kyrkjene</em> → ____________</li>
<li><em class="nn">sprakk</em> → ____________</li>
<li><em class="nn">føtene</em> → ____________</li>
</ol>
<p><strong>2.</strong> Set orda i den rekkjefølgja dei står i papirordboka: <em class="nn">år, bok, øy, stein, stad</em></p>
<div class="skrivelinjer"></div>`,
      fasit: `<ol>
<li><em class="nn">fugl</em></li>
<li><em class="nn">drikke</em> (sterkt verb)</li>
<li><em class="nn">tann</em></li>
<li><em class="nn">kyrkje</em></li>
<li><em class="nn">sprekke</em> (sterkt verb)</li>
<li><em class="nn">fot</em></li>
</ol>
<p>Rekkjefølgje: <em class="nn">bok, stad, stein, øy, år</em>.</p>`,
      sjaa: [
        "Finn eleven grunnforma til substantiv med vokalskifte (<em class=\"nn\">tennene, føtene</em>), eller blir det <em class=\"bm\">tenn</em> og <em class=\"bm\">føt</em>?",
        "Skriv eleven infinitiv av dei sterke verba, eller berre ei avkorta form som <em class=\"bm\">drakke</em>?",
        "Plasserer eleven ø og å sist, og i rett innbyrdes rekkjefølgje?",
      ],
      framover: "Elevar som strevar med vokalskifte, kan søkje dei bøygde formene på ordbokene.no og skrive opp kva oppslagsord søket gir. Lag ei liste over sterke verb dei møter ofte (gå, finne, drikke, skrive) med preteritum ved sidan av.",
    },
    "ordbok-artikkel": {
      tittel: "Exit-lapp",
      tid: 8,
      form: "Åleine",
      oppgave: `<p>Forenkla artiklar frå Nynorskordboka:</p>
<div class="callout">
<p><strong>tann</strong> f &nbsp; <em>bøying:</em> tanna, tenner, tennene<br>
1 hard bite- og tyggjereiskap i munnen<br>
&nbsp;&nbsp;<em>ha vondt i tanna, kvite tenner</em></p>
<p><strong>ete</strong> v &nbsp; <em>bøying:</em> et, åt, ete<br>
1 innta næring i form av mat<br>
&nbsp;&nbsp;<em>dei sat og åt, dei et brød til frukost</em></p>
</div>
<ol>
<li>Kva kjønn har <em class="nn">tann</em>? Kva i artikkelen fortel deg det? ____________</li>
<li>Fyll inn: Eg har hol i to ____________. (ubestemt fleirtal)</li>
<li>Fyll inn: Tannlegen sjekka alle ____________ mine. (bestemt fleirtal)</li>
<li>Fyll inn: I går ____________ vi pizza. (preteritum av <em class="nn">ete</em>)</li>
<li>Fyll inn: Har du ____________ middag? (perfektum partisipp)</li>
<li>Kva viser døma i kursiv som forklaringa ikkje viser?<div class="skrivelinjer"></div></li>
</ol>`,
      fasit: `<ol>
<li>Hokjønn. Det står <strong>f</strong>, og bestemt eintal er <em class="nn">tanna</em>.</li>
<li><em class="nn">tenner</em></li>
<li><em class="nn">tennene</em></li>
<li><em class="nn">åt</em></li>
<li><em class="nn">ete</em></li>
<li>Til dømes: korleis ordet blir brukt i ei setning, kva bøyingsform og preposisjon det plar ha (<em class="nn">vondt i tanna</em>).</li>
</ol>`,
      sjaa: [
        "Hentar eleven formene ut frå plassen i bøyingsrekkja, til dømes <em class=\"nn\">tenner</em> i ubestemt og <em class=\"nn\">tennene</em> i bestemt fleirtal?",
        "Bruker eleven perfektum partisipp <em class=\"nn\">ete</em> og ikkje <em class=\"bm\">spist</em> eller <em class=\"bm\">etet</em>?",
        "Kan eleven forklare kva døma er gode for?",
      ],
      framover: "Elevar som blandar plassane i rekkjefølgja, kan skrive rekkjefølgja som ein hugseregel på innsida av skriveboka: substantiv: bestemt eintal, ubestemt fleirtal, bestemt fleirtal; verb: presens, preteritum, perfektum partisipp. Øv med tre nye ord på ordbokene.no neste time.",
    },
    "ordbok-i-skriving": {
      tittel: "Exit-lapp med ordboka",
      tid: 10,
      form: "Åleine, med ordbokene.no",
      oppgave: `<p>Det utheva ordet er feil eller du må velje. Slå opp, skriv rett form og kva du slo opp.</p>
<ol>
<li>Eg var så <strong>sulten</strong> etter turen.<div class="skrivelinjer"></div></li>
<li>Vi gjekk inn i (<strong>ein / ei / eit</strong>) kyrkje.<div class="skrivelinjer"></div></li>
<li>I går (<strong>frys / fraus</strong>) eg på hendene.<div class="skrivelinjer"></div></li>
<li>Eg har gløymt <strong>huskelappen</strong> heime.<div class="skrivelinjer"></div></li>
</ol>
<p>Kva gjer du når eit ord ikkje gir treff i Nynorskordboka?</p><div class="skrivelinjer"></div>`,
      fasit: `<ol>
<li><em class="nn">svolten</em>. <em class="bm">sulten</em> gir ingen treff i Nynorskordboka.</li>
<li><em class="nn">ei kyrkje</em>. Ordet er hokjønn.</li>
<li><em class="nn">fraus</em>. Preteritum av <em class="nn">fryse</em>.</li>
<li><em class="nn">hugselappen</em>. <em class="bm">huskelapp</em> gir ingen treff, <em class="nn">hugselapp</em> er hankjønn.</li>
</ol>
<p>Siste spørsmål: slå opp ordet i Bokmålsordboka og søk vidare på eit ord frå forklaringa, eller sjå på forslaga i søket. Kontroller det nye ordet i Nynorskordboka.</p>`,
      sjaa: [
        "Skriv eleven kva som er slått opp, eller berre svaret?",
        "Får eleven med rett form i setninga, til dømes bestemt form <em class=\"nn\">hugselappen</em>?",
        "Kjenner eleven framgangsmåten via Bokmålsordboka når eit ord ikkje gir treff?",
      ],
      framover: "Be elevar som ikkje skriv kva dei slo opp, om å halde fram med å liste oppslaga under kvar tekst i Del 4. Gå gjennom lista saman med eleven og spør: Kvifor slo du opp akkurat dette? Kva anna burde du ha slått opp?",
    },
  },
  eigenvurdering: [
    "velje rett ordbok og forklare kvifor",
    "finne oppslagsordet når ordet står bøygd, også for sterke verb",
    "finne fram i papirordboka med alfabetet og leieorda",
    "lese kjønnet ut av ein ordbokartikkel",
    "hente ut rett bøyingsform frå bøyingsrekkja",
    "velje den tydinga som passar i setninga",
    "finne eit nynorskord når eg berre kjenner bokmålsordet",
    "grunngi ei retting i teksten min med det ordboka viser",
  ],
});
