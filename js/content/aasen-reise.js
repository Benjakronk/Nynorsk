/* Innhaldet i 3D-forelesinga om reisene til Ivar Aasen (aasen-reise.html).

   `stader` er alle stoppestadene med koordinatar (grader nord og aust, frå
   stadnamnregisteret til Kartverket). `kapittel` er forelesinga: kvart
   kapittel har ein tekst og ei liste stopp i rekkjefølgje, og kartet teiknar
   ruta som rette liner mellom stoppa. Datoane er henta frå reisekarta i
   skriftserien til Ivar Aasen-selskapet (Målsamlingar frå Ivar Aasen,
   1994–2002), slik dei er attgjevne på allmenning.no/reiser, og frå
   biografien til Ottar Grepstad på nynorsk.no. Stader som ikkje lét seg
   plassere sikkert, er utelatne, så ruta er ei forenkling. */

window.AASEN_REISE = {
  stader: {
    aasen:        { namn: "Åsen i Ørsta",       lat: 62.179, lon: 6.062 },
    ekset:        { namn: "Ekset",              lat: 62.163, lon: 6.030 },
    heroy:        { namn: "Herøy",              lat: 62.314, lon: 5.679 },
    solnor:       { namn: "Solnør",             lat: 62.488, lon: 6.730 },
    volda:        { namn: "Volda",              lat: 62.146, lon: 6.071 },
    alesund:      { namn: "Ålesund",            lat: 62.472, lon: 6.155 },
    bergen:       { namn: "Bergen",             lat: 60.393, lon: 5.324 },
    nordfjordeid: { namn: "Nordfjordeid",       lat: 61.912, lon: 5.986 },
    breim:        { namn: "Breim",              lat: 61.734, lon: 6.434 },
    forde:        { namn: "Førde",              lat: 61.452, lon: 5.857 },
    vadheim:      { namn: "Vadheim",            lat: 61.209, lon: 5.825 },
    fronningen:   { namn: "Frønningen",         lat: 61.110, lon: 7.070 },
    laerdal:      { namn: "Lærdalsøyri",        lat: 61.100, lon: 7.474 },
    kroken:       { namn: "Kroken",             lat: 61.308, lon: 7.351 },
    solvorn:      { namn: "Solvorn",            lat: 61.301, lon: 7.247 },
    sogndal:      { namn: "Sogndal",            lat: 61.229, lon: 7.096 },
    vik:          { namn: "Vik",                lat: 61.087, lon: 6.579 },
    sygnefest:    { namn: "Sygnefest",          lat: 61.063, lon: 5.074 },
    eivindvik:    { namn: "Eivindvik",          lat: 60.981, lon: 5.075 },
    fonnebost:    { namn: "Fonnebost",          lat: 60.746, lon: 5.172 },
    haus:         { namn: "Haus",               lat: 60.453, lon: 5.495 },
    litlebergen:  { namn: "Litlebergen",        lat: 60.541, lon: 5.235 },
    vaksdal:      { namn: "Vaksdal",            lat: 60.479, lon: 5.737 },
    evanger:      { namn: "Evanger",            lat: 60.647, lon: 6.112 },
    voss:         { namn: "Vossevangen",        lat: 60.629, lon: 6.415 },
    granvin:      { namn: "Granvin",            lat: 60.524, lon: 6.719 },
    ullensvang:   { namn: "Ullensvang",         lat: 60.320, lon: 6.655 },
    strandebarm:  { namn: "Strandebarm",        lat: 60.271, lon: 6.012 },
    hellvik:      { namn: "Hellvik",            lat: 59.916, lon: 5.792 },
    skanevik:     { namn: "Skånevik",           lat: 59.733, lon: 5.938 },
    etne:         { namn: "Etne",               lat: 59.665, lon: 5.937 },
    olen:         { namn: "Ølen",               lat: 59.604, lon: 5.808 },
    sandeid:      { namn: "Sandeid",            lat: 59.544, lon: 5.862 },
    hinderavag:   { namn: "Hinderåvåg",         lat: 59.348, lon: 5.800 },
    judaberg:     { namn: "Judaberg",           lat: 59.172, lon: 5.876 },
    stavanger:    { namn: "Stavanger",          lat: 58.969, lon: 5.729 },
    mossige:      { namn: "Mossige",            lat: 58.693, lon: 5.722 },
    haarr:        { namn: "Hårr",               lat: 58.560, lon: 5.661 },
    egersund:     { namn: "Egersund",           lat: 58.452, lon: 6.002 },
    heskestad:    { namn: "Heskestad",          lat: 58.494, lon: 6.357 },
    moi:          { namn: "Moi",                lat: 58.457, lon: 6.552 },
    sirnes:       { namn: "Sirnes",             lat: 58.411, lon: 6.625 },
    flekkefjord:  { namn: "Flekkefjord",        lat: 58.297, lon: 6.660 },
    feda:         { namn: "Feda",               lat: 58.266, lon: 6.819 },
    vigeland:     { namn: "Vigeland",           lat: 58.084, lon: 7.305 },
    mandal:       { namn: "Mandal",             lat: 58.027, lon: 7.453 },
    sogne:        { namn: "Søgne",              lat: 58.093, lon: 7.783 },
    kristiansand: { namn: "Kristiansand",       lat: 58.146, lon: 7.996 },
    mosby:        { namn: "Mosby",              lat: 58.218, lon: 7.923 },
    haegeland:    { namn: "Hægeland",           lat: 58.383, lon: 7.741 },
    kile:         { namn: "Kile",               lat: 58.408, lon: 7.764 },
    longerak:     { namn: "Longerak",           lat: 58.750, lon: 7.853 },
    langeid:      { namn: "Langeid",            lat: 58.989, lon: 7.538 },
    homme:        { namn: "Homme i Valle",      lat: 59.235, lon: 7.548 },
    landvik:      { namn: "Landvik",            lat: 58.339, lon: 8.522 },
    arendal:      { namn: "Arendal",            lat: 58.461, lon: 8.767 },
    amli:         { namn: "Åmli",               lat: 58.766, lon: 8.484 },
    haugsjasund:  { namn: "Haugsjåsund",        lat: 58.944, lon: 8.505 },
    nissedal:     { namn: "Nissedal",           lat: 59.162, lon: 8.506 },
    spjotsodd:    { namn: "Spjotsodd",          lat: 59.363, lon: 8.526 },
    seljord:      { namn: "Seljord",            lat: 59.485, lon: 8.630 },
    hjartdal:     { namn: "Hjartdal",           lat: 59.597, lon: 8.718 },
    heddal:       { namn: "Heddal",             lat: 59.581, lon: 9.109 },
    kongsberg:    { namn: "Kongsberg",          lat: 59.663, lon: 9.647 },
    vikersund:    { namn: "Vikersund",          lat: 59.968, lon: 9.991 },
    norderhov:    { namn: "Norderhov",          lat: 60.131, lon: 10.270 },
    krodsherad:   { namn: "Krødsherad",         lat: 60.125, lon: 9.784 },
    gulsvik:      { namn: "Gulsvik",            lat: 60.383, lon: 9.609 },
    nesbyen:      { namn: "Nes i Hallingdal",   lat: 60.568, lon: 9.103 },
    christiania:  { namn: "Christiania",        lat: 59.913, lon: 10.746 },
    bruflat:      { namn: "Bruflat",            lat: 60.889, lon: 9.643 },
    fagernes:     { namn: "Fagernes",           lat: 60.986, lon: 9.232 },
    aurdal:       { namn: "Aurdal",             lat: 60.924, lon: 9.415 },
    mustad:       { namn: "Mustad",             lat: 60.809, lon: 10.475 },
    ringsaker:    { namn: "Ringsaker",          lat: 60.903, lon: 10.725 },
    lillehammer:  { namn: "Lillehammer",        lat: 61.115, lon: 10.466 },
    ringebu:      { namn: "Ringebu",            lat: 61.530, lon: 10.139 },
    formo:        { namn: "Formo i Sel",        lat: 61.834, lon: 9.499 },
    tofte:        { namn: "Tofte",              lat: 62.003, lon: 9.239 },
    fokstua:      { namn: "Fokstugu",           lat: 62.114, lon: 9.280 },
    hjerkinn:     { namn: "Hjerkinn",           lat: 62.223, lon: 9.550 },
    kongsvoll:    { namn: "Kongsvoll",          lat: 62.303, lon: 9.606 },
    oppdal:       { namn: "Oppdal",             lat: 62.601, lon: 9.677 },
    berkak:       { namn: "Berkåk",             lat: 62.828, lon: 10.009 },
    melhus:       { namn: "Melhus",             lat: 63.287, lon: 10.275 },
    trondheim:    { namn: "Trondheim",          lat: 63.430, lon: 10.395 },
    kristiansund: { namn: "Kristiansund",       lat: 63.110, lon: 7.728 },
    donnem:       { namn: "Dønnem",             lat: 62.932, lon: 7.797 },
    surnadal:     { namn: "Surnadal",           lat: 62.974, lon: 8.726 },
    garberg:      { namn: "Garberg",            lat: 63.102, lon: 9.473 },
    bergem:       { namn: "Bergem",             lat: 63.164, lon: 9.683 },
    orkanger:     { namn: "Orkanger",           lat: 63.307, lon: 9.850 },
    agdenes:      { namn: "Agdenes",            lat: 63.644, lon: 9.738 },
    beian:        { namn: "Beian",              lat: 63.652, lon: 9.569 },
    bjoroya:      { namn: "Bjørøya",            lat: 64.573, lon: 10.847 },
    alstahaug:    { namn: "Alstahaug",          lat: 65.893, lon: 12.398 },
    sovik:        { namn: "Søvik",              lat: 65.922, lon: 12.457 },
    kulstad:      { namn: "Kulstad i Vefsn",    lat: 65.877, lon: 13.229 },
    luktvatnet:   { namn: "Luktvatnet",         lat: 66.047, lon: 13.528 },
    krakoya:      { namn: "Kråkøya",            lat: 64.766, lon: 11.186 },
    fosnes:       { namn: "Fosnes",             lat: 64.684, lon: 11.300 },
    havika:       { namn: "Havika",             lat: 64.489, lon: 11.500 },
    argard:       { namn: "Årgård",             lat: 64.271, lon: 11.191 },
    steinkjer:    { namn: "Steinkjer",          lat: 64.015, lon: 11.495 },
    svepstad:     { namn: "Svepstad",           lat: 63.960, lon: 11.516 },
    frosta:       { namn: "Frosta",             lat: 63.605, lon: 10.774 },
    ler:          { namn: "Ler",                lat: 63.199, lon: 10.301 },
    storen:       { namn: "Støren",             lat: 63.039, lon: 10.285 },
    hov:          { namn: "Hov i Ålen",         lat: 62.843, lon: 11.295 },
    os:           { namn: "Os i Østerdalen",    lat: 62.496, lon: 11.223 },
    tylldalen:    { namn: "Tylldalen",          lat: 62.102, lon: 10.791 },
    akre:         { namn: "Åkre",               lat: 61.722, lon: 11.199 },
    opphus:       { namn: "Opphus",             lat: 61.330, lon: 11.257 },
    aset:         { namn: "Åset",               lat: 61.082, lon: 11.351 },
    minne:        { namn: "Minne",              lat: 60.394, lon: 11.221 },
    klofta:       { namn: "Kløfta",             lat: 60.074, lon: 11.138 },
    svolvaer:     { namn: "Svolvær",            lat: 68.235, lon: 14.564 },
    kabelvag:     { namn: "Kabelvåg",           lat: 68.211, lon: 14.476 },
    tromso:       { namn: "Tromsø",             lat: 69.655, lon: 18.964 },
    bodo:         { namn: "Bodø",               lat: 67.283, lon: 14.375 },
  },

  kapittel: [
    {
      id: "innleiing", tid: "Før 1842", tittel: "Eit land utan eige skriftspråk", kamera: "land",
      tekst: `
        <p>I 1814 fekk Noreg eiga grunnlov, men skriftspråket var framleis dansk. Folk
        snakka norske dialektar og skreiv dansk, og avstanden mellom tale og skrift var
        stor, særleg for bønder og fiskarar.</p>
        <p>Ivar Aasen meinte at eit norsk skriftspråk måtte byggjast på det folk faktisk
        sa. Ikkje på éin dialekt, men på det dialektane hadde felles. Alt i 1836, 22 år
        gamal, skreiv han ned planen i stykket «Om vort Skriftsprog».</p>
        <p>Men då måtte nokon reise rundt og finne ut korleis folk snakka. Denne
        forelesinga følgjer den reisa. Bruk knappane eller piltastane for å gå vidare,
        og dra i kartet for å snu det.</p>`,
      stopp: [],
    },
    {
      id: "orsta", tid: "1813", tittel: "Åsen i Ørsta",
      tekst: `
        <p>Ivar Aasen vart fødd 5. august 1813 på garden Åsen i Ørsta på Sunnmøre, den
        yngste av ni søsken. Mora døydde då han var tre år, faren då han var tretten.</p>
        <p>Nokre kilometer unna, på Ekset ved Voldsfjorden, hadde lensmann Sivert
        Aarflot bygd opp bibliotek, trykkjeri og avis. Der lånte Aasen bøker og las
        «med en vis Graadighed», som han sa sjølv. Atten år gamal vart han
        omgangsskulelærar i heimbygda.</p>`,
      stopp: [["aasen", "fødd 5. august 1813"], ["ekset", "biblioteket"]],
    },
    {
      id: "solnor", tid: "1833–1842", tittel: "Solnør: sju år som huslærar",
      tekst: `
        <p>Tjue år gamal reiste Aasen til prost Thoresen i Herøy for å lære meir. I 1835
        vart han huslærar hjå kaptein Daae på Solnør i Skodje, og der vart han i sju
        år.</p>
        <p>På Solnør lærte han seg norrønt, dansk, engelsk, fransk, tysk og latin på eiga
        hand. Samstundes tok han til å granske sitt eige mål: han skreiv ein grammatikk
        over sunnmørsdialekten, «Den søndmørske Dialekt», og samla ord frå bygdene rundt
        seg.</p>`,
      stopp: [["aasen", "1833"], ["heroy", "1833 til 1835"], ["solnor", "1835 til 1842"]],
    },
    {
      id: "bergen-1841", tid: "Sommaren 1841", tittel: "Bergen: biskopen og stipendet",
      tekst: `
        <p>Sommaren 1841 reiste Aasen til Bergen med plantesamlinga si og grammatikken.
        Biskop Jacob Neumann vart imponert, og få dagar seinare stod ein omtale av
        «denne mærkelige unge Bonde» på trykk i Bergens Stiftstidende.</p>
        <p>Artiklane vart lesne i Trondheim. Der leidde Frederik Moltke Bugge Det
        Kongelige Norske Videnskabers Selskab, og han sytte for at Aasen fekk eit årleg
        stipend på 150 spesidalar for å granske dialektane i Bergens stift. «Intet kan
        sammenlignes med Reiser», skreiv Aasen i dagboka etter Bergensturen.</p>`,
      stopp: [["solnor", "1841"], ["bergen", "sommaren 1841"], ["solnor", "til september 1842"]],
    },
    {
      id: "1842", tid: "Hausten 1842", tittel: "Nordfjord, Sunnfjord og Sogn",
      tekst: `
        <p>Den 29. september 1842 la Aasen i veg frå Ekset. Ruta gjekk sørover gjennom
        Nordfjord og Sunnfjord til Sognefjorden, og så innover fjorden til Lærdal og
        Luster.</p>
        <p>Arbeidsmåten var enkel og krevjande: han budde hjå folk, lytta, spurde og
        skreiv ned ord, bøyingar og uttale i notatbøkene sine. Kvar bygd vart samanlikna
        med dei førre.</p>`,
      stopp: [
        ["ekset", "29. september 1842"], ["nordfjordeid", "29. september til 4. oktober"],
        ["breim", "4. til 5. oktober"], ["forde", "5. til 6. oktober"], ["vadheim", "6. til 8. oktober"],
        ["fronningen", "8. til 9. oktober"], ["laerdal", "9. til 19. oktober"], ["kroken", "19. til 21. oktober"],
        ["solvorn", "21. til 22. oktober"], ["sogndal", "frå 22. oktober 1842"],
      ],
    },
    {
      id: "1843-var", tid: "Vinteren 1842–43", tittel: "Vinter i Sogndal, vår i Gulen",
      tekst: `
        <p>I Sogndal vart Aasen verande heile vinteren, frå 22. oktober 1842 til
        28. februar 1843. Vintrane brukte han til å ordne det han hadde samla, og til å
        skrive rapportar til Videnskabsselskabet i Trondheim.</p>
        <p>Om våren gjekk turen utover fjorden: Vik, Sygnefest og til slutt Eivindvik
        ytst i Gulen, der han var i nesten to månader.</p>`,
      stopp: [
        ["sogndal", "22. oktober 1842 til 28. februar 1843"], ["vik", "28. februar til 8. mars 1843"],
        ["sygnefest", "18. til 20. mars"], ["eivindvik", "20. mars til 13. mai 1843"],
      ],
    },
    {
      id: "1843-haust", tid: "1843–44", tittel: "Nordhordland og Bergen",
      tekst: `
        <p>Frå Eivindvik gjekk ferda sørover til Nordhordland og Osterøy, og i juni 1843
        var Aasen i Bergen att. Så slo han seg til på Litlebergen i Meland, og der vart
        han i ni månader, frå 21. juni 1843 til 19. mars 1844.</p>
        <p>Aasen samla ikkje berre ord. Alt han skreiv ned undervegs, måtte skrivast
        reint, ordnast og samanliknast, og det arbeidet tok like lang tid som sjølve
        reisinga.</p>`,
      stopp: [
        ["eivindvik", "13. mai 1843"], ["fonnebost", "13. til 14. mai"], ["haus", "19. mai til 1. juni"],
        ["bergen", "2. til 21. juni 1843"], ["litlebergen", "21. juni 1843 til 19. mars 1844"],
      ],
    },
    {
      id: "1844-var", tid: "Våren 1844", tittel: "Voss og Hardanger",
      tekst: `
        <p>Våren 1844 gjekk turen innover til Voss og Hardanger. Fem veker på Vossevangen,
        sju veker i Ullensvang og ti veker i Skånevik: no tok han seg god tid på kvar
        stad.</p>
        <p>Måla i dei indre bygdene på Vestlandet, som Voss, Hardanger og Sogn, hadde
        halde på mange gamle former frå norrønt. Slike former kom til å vege tungt når
        Aasen seinare skulle velje kva som skulle inn i landsmålet.</p>`,
      stopp: [
        ["litlebergen", "19. mars 1844"], ["vaksdal", "19. til 20. mars"], ["evanger", "20. til 21. mars"],
        ["voss", "21. mars til 26. april"], ["granvin", "26. til 28. april"], ["ullensvang", "28. april til 19. juni"],
        ["strandebarm", "19. til 26. juni"], ["hellvik", "26. til 27. juni"], ["skanevik", "27. juni til 4. september 1844"],
      ],
    },
    {
      id: "1844-haust", tid: "Hausten 1844", tittel: "Ryfylke, Jæren og Sørlandet",
      tekst: `
        <p>Oppdraget frå Trondheim var no utvida til fleire landsdelar. I september 1844
        gjekk turen sørover gjennom Ryfylke til Stavanger, og vidare til Jæren. På garden
        Mossige i Time vart han i seks veker.</p>
        <p>Så følgde han kysten austover, gjennom Dalane og Lister til Mandal og
        Kristiansand, der han kom fram 19. november.</p>`,
      stopp: [
        ["skanevik", "4. september 1844"], ["etne", "september"], ["olen", "september"], ["sandeid", "4. til 5. september"],
        ["hinderavag", "5. til 9. september"], ["judaberg", "9. til 14. september"], ["stavanger", "14. til 18. september"],
        ["mossige", "18. september til 30. oktober"], ["haarr", "30. til 31. oktober"], ["egersund", "31. oktober til 1. november"],
        ["heskestad", "november"], ["moi", "4. til 5. november"], ["sirnes", "november"], ["flekkefjord", "november"],
        ["feda", "5. til 12. november"], ["vigeland", "13. til 15. november"], ["mandal", "november"],
        ["sogne", "15. til 19. november"], ["kristiansand", "19. til 22. november 1844"],
      ],
    },
    {
      id: "setesdal", tid: "Desember 1844", tittel: "Setesdal midt på vinteren",
      tekst: `
        <p>Frå Kristiansand tok Aasen ein tur opp Setesdal midt på vinteren, heilt til
        Homme i Valle, der han var i ti dagar. Setesdal var kjend for eit gammalt og
        særmerkt mål, og dalen låg avsides nok til at mykje av det gamle hadde halde
        seg.</p>
        <p>Jula 1844 feira han i Kristiansand, der han vart til 8. januar.</p>`,
      stopp: [
        ["kristiansand", "22. november 1844"], ["mosby", "november"], ["haegeland", "november"], ["kile", "22. til 23. november"],
        ["longerak", "24. til 25. november"], ["langeid", "25. til 26. november"], ["homme", "26. november til 6. desember"],
        ["langeid", "6. til 7. desember"], ["longerak", "8. til 9. desember"], ["kristiansand", "11. desember 1844 til 8. januar 1845"],
      ],
    },
    {
      id: "seljord", tid: "Vinteren 1845", tittel: "Aust-Agder og vinter i Seljord",
      tekst: `
        <p>I januar 1845 gjekk ferda vidare austover langs kysten til Arendal, og så
        innover skogsbygdene i Aust-Agder og Telemark. Den 22. januar kom han til
        Seljord, og der vart han til 15. mai.</p>
        <p>Seljord var den tredje vinteren på reise. Telemark hadde, som Setesdal, eit
        talemål med mange gamle former, og Aasen fekk god tid til å studere det.</p>`,
      stopp: [
        ["kristiansand", "8. januar 1845"], ["landvik", "januar"], ["arendal", "januar"], ["amli", "17. til 18. januar"],
        ["haugsjasund", "19. til 20. januar"], ["nissedal", "20. til 21. januar"], ["spjotsodd", "21. til 22. januar"],
        ["seljord", "22. januar til 15. mai 1845"],
      ],
    },
    {
      id: "christiania-1845", tid: "Sommaren 1845", tittel: "Hallingdal og hovudstaden",
      tekst: `
        <p>Frå Seljord gjekk turen over Kongsberg og Ringerike til Hallingdal, der han var
        seks veker på Nes. Så reiste han til Christiania, og 19. juli 1845 var han for
        første gong i hovudstaden.</p>
        <p>Der vart han berre ni dagar. Byane interesserte han mindre enn bygdene: det
        var det nedervde talemålet han leita etter, og det fann han hjå bøndene.</p>`,
      stopp: [
        ["seljord", "15. mai 1845"], ["hjartdal", "15. til 16. mai"], ["heddal", "16. til 17. mai"], ["kongsberg", "18. til 22. mai"],
        ["vikersund", "mai"], ["norderhov", "24. til 26. mai"], ["krodsherad", "26. til 27. mai"], ["gulsvik", "27. til 28. mai"],
        ["nesbyen", "28. mai til 14. juli"], ["gulsvik", "14. til 15. juli"], ["krodsherad", "15. til 16. juli"],
        ["christiania", "19. til 28. juli 1845"],
      ],
    },
    {
      id: "dovre", tid: "Hausten 1845", tittel: "Valdres, Gudbrandsdalen og over Dovre",
      tekst: `
        <p>Frå Christiania reiste Aasen nordover gjennom Valdres, og så til Ringsaker,
        Lillehammer og oppover Gudbrandsdalen. På Formo i Sel budde han i to månader,
        frå 1. september til 3. november.</p>
        <p>I november gjekk han over Dovrefjell. Den 11. november 1845 kom han til
        Trondheim, byen der stipendet kom frå, og der vart han vinteren over.</p>`,
      stopp: [
        ["christiania", "28. juli 1845"], ["bruflat", "4. til 5. august"], ["fagernes", "5. til 6. august"], ["aurdal", "august"],
        ["mustad", "20. til 22. august"], ["ringsaker", "22. til 28. august"], ["lillehammer", "28. til 29. august"],
        ["ringebu", "august"], ["formo", "1. september til 3. november"], ["tofte", "3. til 4. november"],
        ["fokstua", "4. til 5. november"], ["hjerkinn", "november"], ["kongsvoll", "5. til 6. november"],
        ["oppdal", "6. til 7. november"], ["berkak", "7. til 8. november"], ["melhus", "november"],
        ["trondheim", "11. november 1845 til 21. mai 1846"],
      ],
    },
    {
      id: "helgeland", tid: "Sommaren 1846", tittel: "Nordmøre, Fosen og Helgeland",
      tekst: `
        <p>Sommaren 1846 gjekk reisa først vestover til Nordmøre og Orkdalen, så ut til
        Fosen, og i september med båt nordover kysten til Helgeland. På Kulstad i Vefsn
        og Søvik i Alstahaug var han i om lag ein månad.</p>
        <p>Dette var det lengste nord han kom på langferda. Nordanfor Helgeland kom han
        først i 1851.</p>`,
      stopp: [
        ["trondheim", "21. mai 1846"], ["kristiansund", "21. til 22. mai"], ["donnem", "22. mai til 23. juni"],
        ["surnadal", "24. til 25. juni"], ["garberg", "25. til 26. juni"], ["bergem", "26. juni til 8. august"],
        ["orkanger", "8. til 12. august"], ["agdenes", "12. til 13. august"], ["beian", "13. august til 3. september"],
        ["bjoroya", "3. til 5. september"], ["alstahaug", "5. til 7. september"], ["kulstad", "7. til 19. september"],
        ["luktvatnet", "19. til 24. september"], ["kulstad", "24. september til 5. oktober"], ["sovik", "5. til 13. oktober 1846"],
      ],
    },
    {
      id: "namdalen", tid: "Hausten 1846", tittel: "Namdalen og Innherad",
      tekst: `
        <p>I oktober vende han sørover att, gjennom Namdalen og Innherad. I Namdalen og
        ved Steinkjer vart han fleire veker kvar stad.</p>
        <p>Den 5. desember 1846 var han tilbake i Trondheim. Langferda var over: på fire
        år hadde han reist om lag 4550 kilometer, til fots, med hest og med båt. No
        skulle materialet bli bok.</p>`,
      stopp: [
        ["sovik", "13. oktober 1846"], ["alstahaug", "13. til 14. oktober"], ["krakoya", "14. til 16. oktober"],
        ["fosnes", "17. til 18. oktober"], ["havika", "19. oktober til 2. november"], ["argard", "2. til 3. november"],
        ["steinkjer", "3. til 5. november"], ["svepstad", "5. november til 2. desember"], ["frosta", "3. til 4. desember"],
        ["trondheim", "frå 5. desember 1846"],
      ],
    },
    {
      id: "1847", tid: "1847", tittel: "Trondheim og vegen til hovudstaden",
      tekst: `
        <p>I Trondheim sat Aasen i ni månader og skreiv på grammatikken. Hausten 1847
        reiste han sørover gjennom Gauldalen og Østerdalen, og 24. september 1847 kom
        han til Christiania.</p>
        <p>Der vart han buande resten av livet. Arbeidet som venta, «ikke vel kunne
        udføres andensteds end i en stor By», skreiv han. Der fanst bibliotek,
        prenteverk og lærde folk å drøfte med.</p>`,
      stopp: [
        ["trondheim", "5. desember 1846 til 8. september 1847"], ["ler", "8. til 9. september"], ["storen", "9. til 10. september"],
        ["hov", "10. til 11. september"], ["os", "11. til 12. september"], ["tylldalen", "12. til 13. september"],
        ["akre", "13. til 14. september"], ["opphus", "15. til 20. september"], ["aset", "20. til 21. september"],
        ["minne", "22. til 23. september"], ["klofta", "23. til 24. september"], ["christiania", "frå 24. september 1847"],
      ],
    },
    {
      id: "grammatikk", tid: "1848–1851", tittel: "Grammatikken og ordboka",
      tekst: `
        <p>I 1848 kom «Det norske Folkesprogs Grammatik», og i 1850 «Ordbog over det
        norske Folkesprog» med nær 24 000 oppslagsord. På drygt tre år hadde han gjort
        reisenotata om til grammatikk og ordbok.</p>
        <p>Frå august 1850 til september 1851 budde han heime i Ørsta. I 1851 vedtok
        Stortinget å gi han eit årleg stipend på 300 spesidalar, og han vart den første
        statsstipendiaten i landet. Same året gav han det nye språket namnet
        landsmål.</p>`,
      stopp: [["christiania", "1847 til 1850"], ["aasen", "august 1850 til september 1851"]],
    },
    {
      id: "tromso", tid: "Sommaren 1851", tittel: "Lofoten og Tromsø",
      tekst: `
        <p>Sommaren 1851 reiste Aasen frå Volda med båt nordover langs heile kysten:
        Trondheim, Lofoten og til slutt Tromsø, der han var 13. til 18. juli. Lenger nord
        kom han aldri, og i Finnmark var han aldri.</p>
        <p>Frå no av budde han fast i Christiania og reiste om somrane. I dei ti åra 1852
        til 1861 var han på innsamlingsreise kvar sommar, og like eins 1864 til 1868.</p>`,
      stopp: [
        ["volda", "15. juni 1851"], ["alesund", "22. til 23. juni"], ["trondheim", "23. til 25. juni"],
        ["svolvaer", "28. juni til 2. juli"], ["kabelvag", "2. til 11. juli"], ["tromso", "13. til 18. juli"],
        ["bodo", "20. juli"], ["trondheim", "22. til 23. juli"], ["volda", "27. juli 1851"],
      ],
    },
    {
      id: "slutt", tid: "1853–1896", tittel: "Eit skriftspråk bygd på reiser", kamera: "land",
      tekst: `
        <p>I 1853 viste Aasen i «Prøver af Landsmaalet i Norge» korleis det nye språket
        kunne sjå ut. Så kom «Norsk Grammatik» i 1864 og «Norsk Ordbog» i 1873, med om
        lag 45 000 oppslagsord. I 1885 vedtok Stortinget at landsmålet skulle vere
        jamstilt med det danske skriftspråket.</p>
        <p>Alt i alt reiste Aasen om lag 28 350 kilometer og var på farten 2794 dagar.
        Han var innom halvparten av dagens kommunar. Ivar Aasen døydde i Kristiania
        23. september 1896, 83 år gamal.</p>`,
      stopp: [],
    },
  ],
};
