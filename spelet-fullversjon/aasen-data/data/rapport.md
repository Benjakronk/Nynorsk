# Rapport frå importen og sjekken

Rapporten er laga av tools/importer.py og tools/sjekk.py. Han blir skriven på nytt kvar gong skripta køyrer. Kvar line viser til fila og lina i eksporten av designdokumentet, så feilen kan rettast i fana.

## 1 Tal på einingar per fil

| Fil | Del | Tal |
| --- | --- | --- |
| fiendar/bossar.json |  | 98 |
| fiendar/familiar.json |  | 61 |
| fiendar/namngjevne.json |  | 189 |
| fiendar/vanlege.json |  | 452 |
| fiendar/mote/barndomen.json |  | 3 |
| fiendar/mote/christiania_aara.json |  | 12 |
| fiendar/mote/fimbulvinteren.json |  | 98 |
| fiendar/mote/reiseaara.json |  | 66 |
| fiendar/mote/ungdomen.json |  | 9 |
| fiendar/mote/utan_epoke.json |  | 11 |
| figurar/evner.json |  | 223 |
| figurar/figurar.json |  | 16 |
| lyd/sfx.json |  | 229 |
| manus/dagboka.json | sider | 15 |
| manus/dagboka.json | spor | 8 |
| manus/sideoppdrag.json |  | 93 |
| manus/scener/S1.json |  | 63 |
| manus/scener/S2.json |  | 101 |
| manus/scener/del1.json |  | 31 |
| manus/scener/del2.json |  | 29 |
| manus/scener/del3.json |  | 25 |
| manus/scener/del4.json |  | 31 |
| manus/scener/del5.json |  | 31 |
| manus/scener/del6.json |  | 25 |
| manus/scener/del7.json |  | 37 |
| ord/familiar.json |  | 7 |
| ord/kapittel.json | kapittel | 14 |
| ord/kapittel.json | merke | 3 |
| ord/kapittel.json | rangar | 8 |
| ord/lydtre.json | greiner | 23 |
| ord/lydtre.json | nodar | 53 |
| ord/lydtre.json | meistring | 6 |
| ord/oppslag.json |  | 527 |
| ord/trekk.json |  | 21 |
| system/epokar.json | epokar | 8 |
| system/epokar.json | tider | 4 |
| system/flagg.json |  | 140 |
| system/statusar.json |  | 44 |
| ting/butikktypar.json |  | 8 |
| ting/kistereglar.json | tal_per_stad | 8 |
| ting/kistereglar.json | fordeling | 5 |
| ting/kistereglar.json | niva | 5 |
| ting/ting.json |  | 53 |
| ting/utstyr.json |  | 107 |
| ting/ventekister.json |  | 14 |
| verda/verdskart.json | epokar | 11 |
| verda/verdskart.json | knutepunkt | 49 |
| verda/verdskart.json | reiser | 6 |
| verda/villmarker.json |  | 12 |
| verda/stader/austlandet_innlandet_og_verdskartet.json | stader | 25 |
| verda/stader/austlandet_innlandet_og_verdskartet.json | skjermar | 113 |
| verda/stader/austlandet_innlandet_og_verdskartet.json | rom | 47 |
| verda/stader/austlandet_innlandet_og_verdskartet.json | kister | 52 |
| verda/stader/austlandet_innlandet_og_verdskartet.json | butikkar | 43 |
| verda/stader/bergen_og_nordhordland.json | stader | 17 |
| verda/stader/bergen_og_nordhordland.json | skjermar | 49 |
| verda/stader/bergen_og_nordhordland.json | rom | 86 |
| verda/stader/bergen_og_nordhordland.json | kister | 66 |
| verda/stader/bergen_og_nordhordland.json | butikkar | 12 |
| verda/stader/christiania.json | stader | 13 |
| verda/stader/christiania.json | skjermar | 53 |
| verda/stader/christiania.json | rom | 91 |
| verda/stader/christiania.json | kister | 53 |
| verda/stader/christiania.json | butikkar | 21 |
| verda/stader/orsta_og_sunnmore.json | stader | 20 |
| verda/stader/orsta_og_sunnmore.json | skjermar | 81 |
| verda/stader/orsta_og_sunnmore.json | rom | 25 |
| verda/stader/orsta_og_sunnmore.json | kister | 35 |
| verda/stader/orsta_og_sunnmore.json | butikkar | 21 |
| verda/stader/sagahallen_og_superbossdungeonane.json | stader | 12 |
| verda/stader/sagahallen_og_superbossdungeonane.json | skjermar | 0 |
| verda/stader/sagahallen_og_superbossdungeonane.json | rom | 100 |
| verda/stader/sagahallen_og_superbossdungeonane.json | kister | 46 |
| verda/stader/sagahallen_og_superbossdungeonane.json | butikkar | 21 |
| verda/stader/trondelag_og_nord_noreg.json | stader | 14 |
| verda/stader/trondelag_og_nord_noreg.json | skjermar | 75 |
| verda/stader/trondelag_og_nord_noreg.json | rom | 34 |
| verda/stader/trondelag_og_nord_noreg.json | kister | 49 |
| verda/stader/trondelag_og_nord_noreg.json | butikkar | 19 |
| verda/stader/vestlandet_sorlandet_og_telemark.json | stader | 30 |
| verda/stader/vestlandet_sorlandet_og_telemark.json | skjermar | 88 |
| verda/stader/vestlandet_sorlandet_og_telemark.json | rom | 35 |
| verda/stader/vestlandet_sorlandet_og_telemark.json | kister | 59 |
| verda/stader/vestlandet_sorlandet_og_telemark.json | butikkar | 32 |
| verda/stader/villmarkene_v1_til_v6.json | stader | 13 |
| verda/stader/villmarkene_v1_til_v6.json | skjermar | 90 |
| verda/stader/villmarkene_v1_til_v6.json | rom | 43 |
| verda/stader/villmarkene_v1_til_v6.json | kister | 54 |
| verda/stader/villmarkene_v1_til_v6.json | butikkar | 19 |
| verda/stader/villmarkene_v7_til_v12.json | stader | 12 |
| verda/stader/villmarkene_v7_til_v12.json | skjermar | 74 |
| verda/stader/villmarkene_v7_til_v12.json | rom | 37 |
| verda/stader/villmarkene_v7_til_v12.json | kister | 48 |
| verda/stader/villmarkene_v7_til_v12.json | butikkar | 22 |

### Kontrollsummane i fana Datamodell

| Eining | Fil | Dokumentet seier | Datafilene har | Avvik |
| --- | --- | --- | --- | --- |
| Oppslag i Ordboka | ord/oppslag.json | 527 | 527 |  |
| Familiar av vanlege fiendar | fiendar/familiar.json | 61 | 61 |  |
| Variantar av vanlege fiendar | fiendar/vanlege.json | 452 | 452 |  |
| Skjermar | verda/stader:skjermar | 625 | 623 | -2 |
| Rom i dungeonar | verda/stader:rom | 498 | 498 |  |
| Kister | verda/stader:kister | 462 | 462 |  |
| Rader med butikkar og kvile | verda/stader:butikkar | 219 | 210 | -9 |

Tabellane med skjermar i kartfanene har 626 rader. 3 av skjermane står i to faner og er slegne saman med skjermen i fana som eig staden. Difor har datafilene 623 skjermar.

Forklaring på avvika:

- Kontrollsum: fana Christiania har 52 skjermar etter oversikta i Kart og rom, men tabellane i fana har 53 (07 Kart og rom/00 Kart og rom.md:21)
- Kontrollsum: fana Christiania har 30 butikkar og kvile etter oversikta i Kart og rom, men tabellane i fana har 21 (07 Kart og rom/00 Kart og rom.md:21)
- Kontrollsum: 2 skjermar i fana villmarkene V1 til V6 er slegne saman med skjermen i fana som eig staden (tabellen Stader som står i to faner), og står som alias der
- Kontrollsum: 1 skjermar i fana villmarkene V7 til V12 er slegne saman med skjermen i fana som eig staden (tabellen Stader som står i to faner), og står som alias der

## 2 Det skriptet ikkje kunne tolke

### 09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md

- Line 23: Rada for 11.13 manglar kolonnen Nr. Nummeret står i parentes etter oppslaget, og kolonnane er flytte eitt steg. Skriptet har lese rada med nummeret frå parentesen
- Line 38: Rada for 11.28 manglar kolonnen Nr. Nummeret står i parentes etter oppslaget, og kolonnane er flytte eitt steg. Skriptet har lese rada med nummeret frå parentesen
- Line 46: Rada for 11.36 manglar kolonnen Nr. Nummeret står i parentes etter oppslaget, og kolonnane er flytte eitt steg. Skriptet har lese rada med nummeret frå parentesen
- Line 46: 11.36 folkesnakk er i familien harde konsonantar, men står ikkje i Trekka til orda
- Line 117: Rad utan nummer og oppslag (berre «7.13, Trappa ved Vor Frelsers kyrkje, Christiania. Kven sa det: du» i kolonnen Kjelde i spelet). Ho ser ut til å høyre til rada over. Skriptet har hoppa over henne

### 05 Mekanikk/09a Bestiarium vanlege fiendar.md

- Line 114: Kleggen på slåttemyra: slaget av segl i «1 (sverm)» kunne ikkje tolkast
- Line 115: Myggen i torvmyra: slaget av segl i «1 (sverm)» kunne ikkje tolkast
- Line 116: Myggen på Dovre: slaget av segl i «2 (sverm)» kunne ikkje tolkast
- Line 117: Vepsane i bakgarden: slaget av segl i «2 (sverm)» kunne ikkje tolkast
- Line 118: Myggen på finnmyra: slaget av segl i «3 (sverm)» kunne ikkje tolkast
- Line 827: Snøvetten i bratten: Trinn og nivå «I, fast» kunne ikkje tolkast heilt

### 05 Mekanikk/05 Fiendar og bossar.md

- Line 103: Bossen Musekongen og hoffet hans har ingen fasar med Liv og segl som kunne lesast
- Line 230: Bossen Den trykte huldra har ingen fasar med Liv og segl som kunne lesast
- Line 236: Bossen Settardjevelen har ingen fasar med Liv og segl som kunne lesast
- Line 248: Bossen Hugin og Munin har ingen fasar med Liv og segl som kunne lesast
- Line 304: Bossen Fanen har ingen fasar med Liv og segl som kunne lesast
- Line 343: Bossen Knudsen mot Moe og Asbjørnsen har ingen fasar med Liv og segl som kunne lesast
- Line 387: Bossen Gjeldsboka i Kautokeino har ingen fasar med Liv og segl som kunne lesast
- Line 451: Bossen Tor og Odin har ingen fasar med Liv og segl som kunne lesast
- Line 608: Bossen Konventikkelplakaten: «Kan ikkje skadast» kunne ikkje tolkast som Liv og segl
- Line 624: Bossen Blekk-Henrik: «Tre fasar med 4 000 Liv kvar og 5, 5 og 3 dropar» kunne ikkje tolkast som Liv og segl
- Line 633: Bossen Bannkongen: «Ingen Liv. Stevjing som eigen kampmodus» kunne ikkje tolkast som Liv og segl
- Line 662: Bossen Fossegrimen i isen: «3 800 Liv. 2 rimkrystallar framfor 3 knutar av fosseskum» kunne ikkje tolkast som Liv og segl
- Line 667: Bossen Iskappa på Glittertind: «5 500 Liv. Ho startar med 4 rimkrystallar og legg på seg eitt til kvar runde, høgst 8» kunne ikkje tolkast som Liv og segl
- Line 685: Vanskekurva: «Nøkken» har ingen eigen bolk som boss
- Line 691: Vanskekurva: «Tarjei» har ingen eigen bolk som boss
- Line 691: Vanskekurva: «Gamle-Tarjei» har ingen eigen bolk som boss
- Line 695: Vanskekurva: «Aslaug mot Vinje» har ingen eigen bolk som boss
- Line 697: Vanskekurva: «Stilebokblekket» har ingen eigen bolk som boss
- Line 699: Vanskekurva: «Frostvette» har ingen eigen bolk som boss
- Line 705: Vanskekurva: «Sideoppdrag i byen» har ingen eigen bolk som boss
- Line 715: Vanskekurva: «Brennevinsånda» har ingen eigen bolk som boss
- Line 716: Vanskekurva: «Andhrimner» har ingen eigen bolk som boss
- Line 717: Vanskekurva: «Samlarane» har ingen eigen bolk som boss
- Line 720: Vanskekurva: «Personlege oppdrag» har ingen eigen bolk som boss
- Line 726: Vanskekurva: «Aslaug mot Vinje igjen» har ingen eigen bolk som boss
- Line 727: Vanskekurva: «Regionale sideoppdrag» har ingen eigen bolk som boss
- Line 732: Vanskekurva: «Olav» har ingen eigen bolk som boss

### 05 Mekanikk/10 Superbossar.md

- Line 166: Superbossen Sjøormen ved Stad har ingen fasetabell
- Line 216: Superbossen Ormen i Lofotveggen har ingen fasetabell
- Line 358: Superbossen Dæmringen i Welhavens salong har ingen fasetabell

### 05 Mekanikk/09b Møtetabellar barndomen til Christiania.md

- Line 135: Sona «Stien og skaret»: nivået «fast» kunne ikkje tolkast
- Line 1242: Startmåten: fienden «Musekongen og hoffet (1.3)» finst ikkje i bestiaria
- Line 1257: Startmåten: fienden «Kopistar» finst ikkje i bestiaria
- Line 1258: Startmåten: fienden «Protokollfantar» finst ikkje i bestiaria
- Line 1259: Startmåten: fienden «Snøvettar i 1.17» finst ikkje i bestiaria
- Line 1265: Startmåten: fienden «Snøvettar» finst ikkje i bestiaria
- Line 1282: Startmåten: fienden «Brannvaka under Bryggen (2.9)» finst ikkje i bestiaria
- Line 1287: Startmåten: fienden «Fossegrimen i Tvinde (S1.17)» finst ikkje i bestiaria
- Line 1326: Startmåten: fienden «Blekkvesenet i kyrkjeboka (3.5)» finst ikkje i bestiaria
- Line 1327: Startmåten: fienden «Folkevesen frå epoketabellen» finst ikkje i bestiaria
- Line 1329: Startmåten: fienden «Stilebokblekket (3.11)» finst ikkje i bestiaria
- Line 1357: Startmåten: fienden «Frostvettene ved Hjerkinn (3.16)» finst ikkje i bestiaria
- Line 1381: Startmåten: fienden «Skulebok-, trykkeri- og teaterblekk» finst ikkje i bestiaria
- Line 1388: Startmåten: fienden «Isravnen over Nordmarka ved enden av vegen (4.30)» finst ikkje i bestiaria

### 05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md

- Line 1059: Sona «Postvegen frå Drammen over Hokksund og Modum»: nivået «39 i 1852 og 43 i 1853» kunne ikkje tolkast
- Line 1082: Sona «Skogen langs Krøderen og under Norefjell»: nivået «39 i 1852 og 43 i 1853» kunne ikkje tolkast
- Line 1745: Startmåten: fienden «Gjeldsbøkene og Brennevinsånda» finst ikkje i bestiaria
- Line 1768: Startmåten: fienden «Bannkongen i Lærdal» finst ikkje i bestiaria
- Line 1816: Startmåten: fienden «Den første skrivaren» finst ikkje i bestiaria
- Line 1889: Startmåten: fienden «Frosne gardsvesen» finst ikkje i bestiaria
- Line 1894: Startmåten: fienden «Fimbulvintervesen: frostvette, isvesen, Frostmus og ravnar av is» finst ikkje i bestiaria
- Line 1895: Startmåten: fienden «Fimbulvintervesen: stormvesen og frosne kulissar» finst ikkje i bestiaria

### 05 Mekanikk/09d Møtetabellar villmarkene.md

- Line 53: Sona «Trollgjølet på Molaup» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 159: Sona «Under Nigardsbreen» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 310: Sona «Røysene ved Hå» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 413: Sona «Blesterplassen på Hovden» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 491: Sona «Steinbua under Falkenuten» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 575: Sona «Jøtulberget i Vågå» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 653: Sona «Grova ved Hjerkinn» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 760: Sona «Kirkehelleren på Sanna» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 861: Sona «Romsdalshornet» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 943: Sona «Tømmervasen i Glomma» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 1040: Sona «Svedjebrannen» har ikkje noko årstal i overskrifta, så epoken er ukjend
- Line 1104: Startmåten: fienden «Kladden i havgrotta (S2.6)» finst ikkje i bestiaria
- Line 1136: Startmåten: fienden «Frostvettene ved Hjerkinn (3.16)» finst ikkje i bestiaria

### 07 Kart og rom/03 Kart Christiania.md

- Line 117: Skjermen CHR-08: «Dampskipsbrygga» er verken ein butikktype eller kvile
- Line 118: Skjermen CHR-15 og CHR-17: «Skyss» er verken ein butikktype eller kvile

### 07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md

- Line 591: Skjermen BYO-02: «Ingen» er verken ein butikktype eller kvile

### 07 Kart og rom/08 Kart villmarkene V7 til V12.md

- Line 130: Skjermen FOK-06: «Fjellstua på Hjerkinn» er verken ein butikktype eller kvile

### 07 Kart og rom/00 Kart og rom.md

- Line 62: Staden «Kjelda ved Byklestigen og Valle» står i to faner. ID-ane «Vestlandet: VLE-03 og VLE-04» og «Villmarkene V1 til V6: BYK-skjermane» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman
- Line 63: Staden «Vågakallen» står i to faner. ID-ane «Sagahallen og superbossane: DVK» og «Trøndelag og Nord-Noreg: LFN-08 og LFN-09» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman
- Line 64: Staden «Stiklestad» står i to faner. ID-ane «Trøndelag og Nord-Noreg: TRL-05» og «Sagahallen og superbossane: DST» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman
- Line 65: Staden «Olavsbrønnen» står i to faner. ID-ane «Trøndelag og Nord-Noreg: OLA for 1846» og «Sagahallen og superbossane: OLB for 1853» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman
- Line 66: Staden «Vor Frelsers kyrkje i november 1853» står i to faner. ID-ane «Christiania» og «Sagahallen og superbossane: SGH-10» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman

### 04 Manus/04 Christiania.md

- Line 451: Det står ikkje kva som opnar Thrane
- Line 583: Det står ikkje kva som opnar Studentfabrikken

## 3 Brotne tilvisingar og andre funn frå sjekken

### Varer i butikkar som ikkje finst i ting- eller utstyrstabellane (49)

- Butikken på BGN-11b: «Hardingfele» (07 Kart og rom/02 Kart Bergen og Nordhordland.md:75)
- Butikken på LBG-01a: «Post kjem med båten» (07 Kart og rom/02 Kart Bergen og Nordhordland.md:323)
- Butikken på LBG-01a: «Mons ber han opp» (07 Kart og rom/02 Kart Bergen og Nordhordland.md:323)
- Butikken på CHR-09a: «Klokkaren sel Preikeboka» (07 Kart og rom/03 Kart Christiania.md:102)
- Butikken på CHR-15: «Skinnkufte i 1845» (07 Kart og rom/03 Kart Christiania.md:111)
- Butikken på ORV-04a: «Røykjelse om partyet ikkje har henne» (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:159)
- Butikken på EKS-01c: «Inga ord-reiskap i T1» (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:202)
- Butikken på ALS-03b: «Inga utstyr med stad Ålesund» (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:402)
- Butikken på SGH-11: «Salmeboka» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:67)
- Butikken på TRD-10a: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:80)
- Butikken på TRD-13a: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:82)
- Butikken på TRD-13a: «med lusekam» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:82)
- Butikken på TRD-13b: «det beste ord-reiskapet i ein bokhandel før Trondheim» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:83)
- Butikken på TRD-13c: «T2: skinnkufte» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:84)
- Butikken på TRD-13c: «det beste i kvart slag» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:84)
- Butikken på TRD-13c: «T4: pelslue av oter» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:84)
- Butikken på TRD-13d: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:85)
- Butikken på TRL-01: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:86)
- Butikken på NMR-03a: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:176)
- Butikken på NMR-04: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:177)
- Butikken på DFB-01: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:202)
- Butikken på DFB-01: «med lusekam» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:202)
- Butikken på HLG-05a: «Varene til typen» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:231)
- Butikken på LFN-01a: «Varene til typen i T4» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:294)
- Butikken på LFN-07a: «Varene til typen i T4» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:296)
- Butikken på LFN-07a: «Kofte til Ravdna» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:296)
- Butikken på LFN-10: «Lasso av lærreim til Ravdna» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:297)
- Butikken på LKG-06: «1853 òg kjøtsuppe» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:48)
- Butikken på LRD-01a: «Frå Bergen: bergensfrakk» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:50)
- Butikken på LRD-02: «Kremmarvarer» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:51)
- Butikken på VNG-04: «Frå Sogn: reisekappe av vadmål» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:95)
- Butikken på UTN-01a: «1853 òg kjøtsuppe» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:99)
- Butikken på STV-01: «Ullsokkar i 1852» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:153)
- Butikken på STV-01: «1853» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:153)
- Butikken på STV-02a: «Tabellen har inga ord-reiskap» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:155)
- Butikken på STV-03: «1853 òg kjøtsuppe» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:156)
- Butikken på KRS-01: «Ullsokkar i 1853» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:219)
- Butikken på KRS-04a: «Forslag: vertinna leiger ut kammerset att i 1850 til 1853» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:221)
- Butikken på NUT-01: «1853 òg kjøtsuppe» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:267)
- Butikken på SEL-02: «Frå tidlegare regionar: reisekappe av vadmål» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:271)
- Butikken på JOT-03: «Kremmarvarer» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:68)
- Butikken på JOT-03: «Ikkje utstyr» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:68)
- Butikken på JOT-07: «Gjestgiverivarer» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:69)
- Butikken på HKY-02: «Handelsstaden i Mosjøen står i kartet for Helgeland» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:192)
- Butikken på RMD-04: «Gjestgiverivarer» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:251)
- Butikken på RMD-09: «Handelsstadvarer» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:253)
- Butikken på RMD-09: «Ikkje utstyr» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:253)
- Butikken på FSK-02: «Kremmarvarer» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:373)
- Butikken på FSK-02: «Ikkje utstyr» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:373)

### Ord i utfallet til ei scene som ikkje finst i Ordboka (41)

- Scena S1_12_1: «Vardeljos» (04 Manus/08 Sideoppdrag 1.md:225)
- Scena S1_19_1: «Lyngtrollet» (04 Manus/08 Sideoppdrag 1.md:343)
- Scena S1_25_1: «Skarre» (04 Manus/08 Sideoppdrag 1.md:441)
- Scena S1_26_1: «Seljord-lista» (04 Manus/08 Sideoppdrag 1.md:455)
- Scena S1_31_1: «Postbåten» (04 Manus/08 Sideoppdrag 1.md:547)
- Scena S1_samtale_3: «Ásinn» (04 Manus/08 Sideoppdrag 1.md:779)
- Scena S1_samtale_3: «Ivar» (04 Manus/08 Sideoppdrag 1.md:779)
- Scena S1_samtale_4: «Letta» (04 Manus/08 Sideoppdrag 1.md:787)
- Scena S2_40_3: «Brevet» (04 Manus/09 Sideoppdrag 2.md:653)
- Scena S2_25_2: «kontrollert» (04 Manus/09 Sideoppdrag 2.md:857)
- Scena s2_1: «alt» (04 Manus/02 Reiseårene, første del.md:7)
- Scena s2_3: «Sognemålet» (04 Manus/02 Reiseårene, første del.md:63)
- Scena s2_5: «gamle-Erik» (04 Manus/02 Reiseårene, første del.md:107)
- Scena s2_13: «grense» (04 Manus/02 Reiseårene, første del.md:355)
- Scena s2_15: «Stavanger.» (04 Manus/02 Reiseårene, første del.md:409)
- Scena s2_22: «Landstads» (04 Manus/02 Reiseårene, første del.md:643)
- Scena s3_7: «Sorg» (04 Manus/03 Reiseårene, andre del.md:149)
- Scena s3_22: «Helgeland» (04 Manus/03 Reiseårene, andre del.md:471)
- Scena s3_22: «grense» (04 Manus/03 Reiseårene, andre del.md:471)
- Scena s4_5: «lært» (04 Manus/04 Christiania.md:161)
- Scena s4_6: «Spaltekrig» (04 Manus/04 Christiania.md:179)
- Scena s4_9: «Trykt» (04 Manus/04 Christiania.md:255)
- Scena s4_16: «Radikal» (04 Manus/04 Christiania.md:455)
- Scena s4_17: «Prikkane» (04 Manus/04 Christiania.md:479)
- Scena s5_5: «Vinterord» (04 Manus/05 Fimbulvinteren, første del.md:144)
- Scena s5_5b: «Årflot» (04 Manus/05 Fimbulvinteren, første del.md:170)
- Scena s5_6: «Norma» (04 Manus/05 Fimbulvinteren, første del.md:234)
- Scena s5_12b: «høyrer» (04 Manus/05 Fimbulvinteren, første del.md:456)
- Scena s5_12c: «Grannemål» (04 Manus/05 Fimbulvinteren, første del.md:520)
- Scena s5_14: «Arbeiderbladet» (04 Manus/05 Fimbulvinteren, første del.md:664)
- Scena s5_14: «Anger» (04 Manus/05 Fimbulvinteren, første del.md:664)
- Scena s5_17: «Anger» (04 Manus/05 Fimbulvinteren, første del.md:768)
- Scena s5_22: «Talemålstreet» (04 Manus/05 Fimbulvinteren, første del.md:942)
- Scena s5_23: «kjedelig» (04 Manus/05 Fimbulvinteren, første del.md:970)
- Scena s6_2: «strok» (04 Manus/06 Fimbulvinteren, andre del.md:51)
- Scena s6_6: «lært» (04 Manus/06 Fimbulvinteren, andre del.md:163)
- Scena s6_8: «Fortæl» (04 Manus/06 Fimbulvinteren, andre del.md:265)
- Scena s6_13: «Dovre» (04 Manus/06 Fimbulvinteren, andre del.md:439)
- Scena s6_13: «gitte» (04 Manus/06 Fimbulvinteren, andre del.md:439)
- Scena s6_18: «kan» (04 Manus/06 Fimbulvinteren, andre del.md:617)
- Scena s7_1: «Sagahallen» (04 Manus/07 Sluttkampen og epilogen.md:7)

### Ord frå fiendar som ikkje finst i Ordboka (382)

- Kjellarrotta på Nordnes (vanlege): «rotta» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:64)
- Lagerrotta under Bryggen (vanlege): «bryggja» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:65)
- Rotta i Vaterland (vanlege): «kjellar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:66)
- Skipsrotta i Vågen (vanlege): «skute» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:67)
- Kråka på bøen (vanlege): «såkorn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:75)
- Kvitkråka (vanlege): «sjeldsynt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:77)
- Nøtteskrika (vanlege): «hasl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:78)
- Kråka på isvegen (vanlege): «åte» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:79)
- Terna på holmen (vanlege): «terne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:87)
- Ternene på Holsnøy (vanlege): «egg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:88)
- Ternene på Jæren (vanlege): «mo» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:89)
- Ternene på Vega (vanlege): «dun» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:90)
- Ulvane på Hardangervidda (vanlege): «skotpremie» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:98)
- Ulvane på Filefjell (vanlege): «ulvegrav» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:99)
- Ulvane på Fokstumyra (vanlege): «dy» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:100)
- Ulvane i Gauldalen (vanlege): «sporsnø» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:101)
- Ulvane i Vefsn (vanlege): «tamrein» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:102)
- Ulvane på Romerike (vanlege): «gjetar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:104)
- Ulvane på Mjøsisen (vanlege): «isveg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:105)
- Myggen ved tjørna (vanlege): «sumar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:113)
- Kleggen på slåttemyra (vanlege): «klegg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:114)
- Myggen på Dovre (vanlege): «fjellstove» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:116)
- Vepsane i bakgarden (vanlege): «veps» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:117)
- Myggen på finnmyra (vanlege): «sviing» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:118)
- Reven i Bondalen (vanlege): «geitesti» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:127)
- Reven i lauvlia (vanlege): «lauvkjerv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:128)
- Reven i frukthagane (vanlege): «apalblom» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:129)
- Reven på Jæren (vanlege): «lyng» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:130)
- Reven i Nordmarka (vanlege): «revehi» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:132)
- Reven på Årflot (vanlege): «ragg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:133)
- Reven ved Akerselva (vanlege): «sag» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:134)
- Reven på Mjøsisen (vanlege): «hålke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:135)
- Fjellreven på vidda (vanlege): «vidde» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:136)
- Reven på Kristiansten (vanlege): «voll» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:137)
- Reven ved Fredriksten (vanlege): «vollgrav» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:138)
- Reven på svaberga (vanlege): «svaberg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:139)
- Bjørnen i Lærdal (vanlege): «hi» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:147)
- Bjørnen på Voss (vanlege): «maur» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:148)
- Bjørnen i Rauland (vanlege): «fell» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:149)
- Bjørnen ved Krøderen (vanlege): «lefse» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:150)
- Bjørnen i Finnskogen (vanlege): «granskog» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:151)
- Den vekte bjørnen i Luster (vanlege): «dvale» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:152)
- Jerven under vidda (vanlege): «jarv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:161)
- Jerven på heia (vanlege): «nist» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:162)
- Jerven på Filefjell (vanlege): «skinn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:163)
- Jerven i Visdalen (vanlege): «stølsbu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:164)
- Jerven ved Kongsvold (vanlege): «matbu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:165)
- Jerven i Vefsn (vanlege): «sanking» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:166)
- Jerven på Hardangervidda (vanlege): «gøymsle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:168)
- Jerven på Dovre (vanlege): «jerv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:169)
- Jerven i Bykle (vanlege): «glupsk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:170)
- Skoggaupa i Valle (vanlege): «gaupe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:178)
- Skoggaupa i Krokskogen (vanlege): «hogst» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:180)
- Skoggaupa i Hjartdal (vanlege): «bar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:181)
- Skoggaupa i Verdal (vanlege): «dusk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:182)
- Skoggaupa i Nordmarka (vanlege): «premie» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:183)
- Skoggaupa under Norefjell (vanlege): «li» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:184)
- Skoggaupa i Bygland (vanlege): «bygd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:185)
- Røyskatten i steingarden (vanlege): «røyskatt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:193)
- Røyskatten i røysa (vanlege): «steinrøys» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:194)
- Mården i Seljordsskogen (vanlege): «mård» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:195)
- Grevlingen på Ekeberg (vanlege): «grevling» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:196)
- Mården under Norefjell (vanlege): «blank» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:197)
- Mården i stabburet (vanlege): «stabbur» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:198)
- Mården i Nordmarka (vanlege): «koie» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:199)
- Oteren i fjøra (vanlege): «otter» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:207)
- Oteren under Molaup (vanlege): «smell» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:208)
- Oteren på Holsnøy (vanlege): «stig» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:209)
- Oteren på Leka (vanlege): «tare» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:210)
- Oteren i Krøderen (vanlege): «garn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:212)
- Oteren under Bryggen (vanlege): «våg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:214)
- Oteren ved elveosen (vanlege): «fjøremål» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:215)
- Oteren i råka (vanlege): «råk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:216)
- Oteren i Nidelva (vanlege): «påle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:217)
- Ikornen i Seljord (vanlege): «ikorne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:226)
- Ikornen i brannskogen (vanlege): «kongle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:227)
- Ikornen ved Hokksund (vanlege): «kongle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:228)
- Ikornen på Bakklandet (vanlege): «nøtt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:229)
- Haren på bøen (vanlege): «hare» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:237)
- Haren i lyngheia (vanlege): «sprett» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:238)
- Haren i svedja (vanlege): «svedje» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:239)
- Haren ved Lågen (vanlege): «lauvkjerv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:241)
- Haren ved grensa (vanlege): «landemerke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:242)
- Haren på markene (vanlege): «snare» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:243)
- Orrhanen på leiken (vanlege): «orre» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:251)
- Rypa under Folgefonna (vanlege): «fonnkant» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:252)
- Tiuren i furuskogen (vanlege): «tidur» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:253)
- Rypa på Bykleheia (vanlege): «vier» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:254)
- Røya i Valdres (vanlege): «røy» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:256)
- Rypa på Fokstumyra (vanlege): «skratt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:258)
- Rypa i lia (vanlege): «bjørk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:259)
- Tiuren i Rauland (vanlege): «storfugl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:260)
- Orrfuglen i snøen (vanlege): «orrfugl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:261)
- Rypene ved Hjerkinn (vanlege): «vidje» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:262)
- Rypa på vidda (vanlege): «grålysing» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:263)
- Tiuren i Valle (vanlege): «grein» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:266)
- Sjøørna over Fedje (vanlege): «havørn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:275)
- Landørna over Ullensvang (vanlege): «reir» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:276)
- Jaktfalken på Falkeriset (vanlege): «falk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:277)
- Jaktfalken i buret (vanlege): «sveltebur» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:278)
- Sjøørna ved Grip (vanlege): «skjergard» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:280)
- Sjøørna ved Vega (vanlege): «ærfugl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:281)
- Landørna over Lesja (vanlege): «høgd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:282)
- Sjøørna over Vestfjorden (vanlege): «line» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:284)
- Sjøørna i Nord-Troms (vanlege): «krambu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:285)
- Landørna over Dovre (vanlege): «klo» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:286)
- Landørna over Mjøsa (vanlege): «åtsel» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:287)
- Kvitfalken over Hårteigen (vanlege): «sikteline» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:288)
- Kattugla i løa (vanlege): «kattugle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:296)
- Kattugla på kyrkjebakken (vanlege): «nattmål» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:297)
- Snøugla i lemenåret (vanlege): «snøugle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:298)
- Jordugla på Fokstumyra (vanlege): «jordugle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:299)
- Kattugla på kyrkjegarden (vanlege): «myrker» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:300)
- Kattugla på vollane (vanlege): «skumring» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:301)
- Haukugla i Innherred (vanlege): «gran» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:305)
- Kattugla på festningsvegen (vanlege): «myrkfælen» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:306)
- Ormen i røysa på Voss (vanlege): «eiter» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:314)
- Ormen på Ekeberg (vanlege): «solbakke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:316)
- Hjortekolla i Leikanger (vanlege): «kolle» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:324)
- Hjortekolla i Ullensvang (vanlege): «hind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:325)
- Hjortekolla i Luster (vanlege): «fôr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:326)
- Elgkua i Gauldalen (vanlege): «osp» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:334)
- Elgkua på Romerike (vanlege): «tråkk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:336)
- Reinsflokken på Bykleheiane (vanlege): «dyregrav» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:345)
- Simleflokken ved Møsstrond (vanlege): «kalving» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:346)
- Reinsflokken på Filefjell (vanlege): «reinmose» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:347)
- Reinsflokken i Jotunfjella (vanlege): «reinsjegar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:348)
- Reinsflokken i Rondane (vanlege): «beite» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:349)
- Reinsflokken ved fangstgropene (vanlege): «grop» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:350)
- Reinsflokken på Hardangervidda (vanlege): «lav» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:351)
- Reinsflokken på Dovre (vanlege): «flokk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:352)
- Selen i Storfjorden (vanlege): «sel» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:361)
- Steinkobben i sundet (vanlege): «flu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:362)
- Nisa i Alverstraumen (vanlege): «nise» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:363)
- Steinkobben på Jæren (vanlege): «brim» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:364)
- Selen ved Kristiansund (vanlege): «steinkobbe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:365)
- Selen på fjordisen (vanlege): «isføre» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:367)
- Selen i fiskeværet (vanlege): «fiskevær» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:368)
- Selen i Karmsundet (vanlege): «grunne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:369)
- Selen i Vågen (vanlege): «logn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:370)
- Steinkobben på Iddefjorden (vanlege): «botn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:371)
- Steinkobben ved Odderøya (vanlege): «odde» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:372)
- Svartbaken på hovden (vanlege): «svartbak» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:380)
- Skarven på skjeret (vanlege): «skarv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:381)
- Svartbaken ved Hå (vanlege): «vrakgods» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:382)
- Ærfuglen på Vega (vanlege): «ædgavl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:383)
- Krykkjene på Værøy (vanlege): «krykkje» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:385)
- Ærfuglen i snøen (vanlege): «dun» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:387)
- Skarven på holmane (vanlege): «sjøfugl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:388)
- Skarven på Bryggen (vanlege): «møne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:389)
- Svartbaken ved Ila (vanlege): «flomål» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:390)
- Fiskemåsane på holmane (vanlege): «måke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:392)
- Små vetter ved runene (vanlege): «hella» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:404)
- Runevetten ved Borgund (vanlege): «stav» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:405)
- Runevetten under Bryggen (vanlege): «pinne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:406)
- Oskevetten under Bryggen (vanlege): «oske» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:407)
- Vetten ved bautaen (vanlege): «bauta» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:408)
- Runevetten ved blestertufta (vanlege): «blester» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:409)
- Vetten ved eldstaden (vanlege): «eldstad» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:411)
- Runevetten ved Urnes (vanlege): «krot» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:412)
- Runevetten i treskurden (vanlege): «slyng» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:413)
- Tussen i røysa (vanlege): «røys» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:421)
- Tussen i gravrøysa (vanlege): «røys» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:423)
- Nissen i låven (vanlege): «låve» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:424)
- Nissen i stallen (vanlege): «krubbe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:425)
- Nissen i den kalde låven (vanlege): «smørauge» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:426)
- Draugen i fjøra (vanlege): «tang» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:434)
- Draugen på boen (vanlege): «boe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:435)
- Draugen ved Revet (vanlege): «forlis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:436)
- Draugen ved Kristiansund (vanlege): «klippfisk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:437)
- Draugen i Kirkehelleren (vanlege): «hellar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:439)
- Draugen ved Brusanden (vanlege): «brusand» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:441)
- Draugen i Folla-kopien (vanlege): «ripe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:442)
- Draugen i havdjupet (vanlege): «havdjup» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:443)
- Huldrekallen under tindane (vanlege): «tind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:451)
- Huldrekallen ved setra (vanlege): «buføring» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:454)
- Vettane på heia (vanlege): «tuft» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:455)
- Vettane i kollen (vanlege): «koll» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:457)
- Huldrebudeia (vanlege): «budeie» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:458)
- Huldrekua (vanlege): «bufe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:459)
- Vettane i ura ved Horgheim (vanlege): «steinblokk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:461)
- Huldra i granskogen (vanlege): «huldre» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:462)
- Nøkkeungen i tjørna (vanlege): «siv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:471)
- Nøkken i Vosso (vanlege): «hyl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:472)
- Vassnykken i Setesdal (vanlege): «sal» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:473)
- Myrnøkken på Hovden (vanlege): «myrmalm» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:474)
- Nøkken i Krøderen (vanlege): «vik» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:475)
- Nøkken under stokkane (vanlege): «stokk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:477)
- Nøkken under isen (vanlege): «våk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:478)
- Nøkken ved Helgøya (vanlege): «isfiske» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:479)
- Trollungen under brua (vanlege): «bru» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:489)
- Trollungen i Jøtulberget (vanlege): «kaststein» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:490)
- Trollungane på Dovre (vanlege): «gubbe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:491)
- Trollungen i grova (vanlege): «grov» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:492)
- Trollungen på eggen (vanlege): «egg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:493)
- Trollungane på julestua (vanlege): «gjestebod» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:494)
- Trollungen ved gullhaugen (vanlege): «gullhaug» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:495)
- Skrømtet i steinbua (vanlege): «falkonar» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:504)
- Skrømtet langs Krøderen (vanlege): «dauding» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:506)
- Skrømtet på Trondhjemsvegen (vanlege): «krossveg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:507)
- Grimen i Lærdalselva (vanlege): «grim» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:515)
- Grimen i Feigefossen (vanlege): «fosseskodde» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:516)
- Grimen under Skjervsfossen (vanlege): «fele» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:517)
- Grimen i den frosne fossen (vanlege): «streng» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:520)
- Lakkseglet (vanlege): «skil» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:533)
- Blekkdropen i breen (vanlege): «teig» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:534)
- Tingblekket (vanlege): «granne» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:535)
- Trykksverta (vanlege): «onn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:536)
- Kopisten (vanlege): «stove» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:544)
- Kopisten i tingstova (vanlege): «kårkall» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:545)
- Kopisten i arkivkjellaren (vanlege): «bøn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:546)
- Teaterkopisten (vanlege): «gjøn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:547)
- Den frosne kopisten (vanlege): «kjøpstad» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:549)
- Kopisten i kanselliarkivet (vanlege): «avskrift» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:550)
- Skinnskrivaren (vanlege): «skinn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:551)
- Protokollfanten (vanlege): «sakefall» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:559)
- Tollprotokollen (vanlege): «fat» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:560)
- Fattigprotokollen (vanlege): «armod» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:561)
- Arrestprotokollen i frosten (vanlege): «lenkje» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:562)
- Paragrafen i tingstova (vanlege): «teig» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:570)
- Plakatparagrafen (vanlege): «samkome» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:571)
- Brennevinsparagrafen (vanlege): «kjetel» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:572)
- Paragrafen i lensmannsprotokollen (vanlege): «dagsverk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:573)
- Rimparagrafen (vanlege): «landemerke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:574)
- Paragrafen i kanselliarkivet (vanlege): «grannelag» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:575)
- Renteskrivaren i rekneskapsbøkene (vanlege): «avgjeld» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:583)
- Renteskrivaren hos pengelånaren (vanlege): «auke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:585)
- Renteskrivaren i fiskeværet (vanlege): «vær» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:586)
- Renteskrivaren hos Heggelund (vanlege): «byte» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:587)
- Renteskrivaren i lensmannsgarden (vanlege): «skyld» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:588)
- Renteskrivaren i kanselliarkivet (vanlege): «tiend» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:589)
- Forordninga i Sogn (vanlege): «påbod» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:597)
- Lysinga på kyrkjebakken (vanlege): «lysing» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:598)
- Avisarket (vanlege): «tidend» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:599)
- Innførsla i dåpsboka (vanlege): «Ingebjørg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:613)
- Det vandrande dåpsnamnet (vanlege): «Torbjørg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:614)
- Innførsla i sakristiet (vanlege): «Kjersti» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:615)
- Innførsla i bispegarden (vanlege): «Brita» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:616)
- Innførsla på kyrkjeloftet (vanlege): «Guri» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:617)
- Innførsla i arkivet i Krødsherad (vanlege): «Ragnhild» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:618)
- Den frosne innførsla (vanlege): «Jon» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:619)
- Innførsla i kanselliarkivet (vanlege): «Gunnhild» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:620)
- ABC-vesenet i skulekjellaren (vanlege): «gutt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:628)
- ABC-vesenet i Pipervika (vanlege): «jente» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:629)
- ABC-vesenet i Klasse 4 B (vanlege): «dugurd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:630)
- ABC-vesenet i kongevegen (vanlege): «hage» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:631)
- Forklaringa (vanlege): «samvit» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:632)
- Korrekturarket i settarsalen (vanlege): «bjørk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:640)
- Korrekturarket på tørkeloftet (vanlege): «gras» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:641)
- Komplimentet i salongen (vanlege): «bondsk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:644)
- Stileblekket i skulekjellaren (vanlege): «tjue» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:652)
- Stila med laudabilis (vanlege): «lauv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:653)
- Stileblekket i latinskulen (vanlege): «leksa» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:654)
- Stileblekket i Klasse 4 B (vanlege): «nista» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:655)
- Stimannen som grev etter skatten (vanlege): «gull» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:668)
- Stimannen på postvegen (vanlege): «ran» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:669)
- Stimannen i Krokskogen (vanlege): «stimann» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:670)
- Stimannen på isvegen (vanlege): «skiføre» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:671)
- Smuglaren i Vågen (vanlege): «sjøbu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:679)
- Tobakkssmuglaren under Bryggen (vanlege): «skrå» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:680)
- Brennevinssmuglaren på Jæren (vanlege): «flo» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:681)
- Smuglaren på isen ved Drøbak (vanlege): «slede» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:682)
- Drammekaren på Strandsiden (vanlege): «dram» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:690)
- Drammekaren på kyrkjebakken (vanlege): «kyrkjebakke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:691)
- Skyssguten på Nes (vanlege): «karjol» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:692)
- Drammekaren på skysskiftet (vanlege): «skysskifte» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:693)
- Bryllaupsgjesten frå Gulsvik (vanlege): «heimferd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:694)
- Den fulle fiskaren i været (vanlege): «rorbu» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:695)
- Nattvektaren i Stavanger (vanlege): «non» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:703)
- Nattvektaren i Trondheim (vanlege): «dagmål» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:704)
- Nattvektaren i Christiania (vanlege): «kveldsleite» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:705)
- Vektaren i kulda (vanlege): «gry» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:706)
- Soldaten på eksersisplassen (vanlege): «vakt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:715)
- Den verva soldaten (vanlege): «tromme» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:716)
- Festningsvakta på Akershus (vanlege): «heimveg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:717)
- Soldaten på Fredriksten (vanlege): «skanse» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:718)
- Skreppekaren på Vossevangen (vanlege): «skreppa» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:727)
- Kvaksalvaren i Stavanger (vanlege): «lækjedom» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:738)
- Kvaksalvaren i pakkhuskjellaren (vanlege): «kamfer» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:740)
- Fløtaren på Glomma (vanlege): «fløtarhake» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:748)
- Tømmerfløtaren i vasen (vanlege): «vase» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:749)
- Fløtaren i vinterhogsten (vanlege): «tømmerlunn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:750)
- Ravnen i magasinet (vanlege): «bók» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:762)
- Ravnen over Ørsta (vanlege): «hræ» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:763)
- Ravnen over Nidaros (vanlege): «hrafn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:764)
- Ravnen på mønet (vanlege): «vængr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:765)
- Einherjen frå Hjørungavåg (vanlege): «víg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:773)
- Einherjen frå Hafrsfjord (vanlege): «skjǫldr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:774)
- Einherjen i draugvegen (vanlege): «valr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:775)
- Einherjen i gudevegen (vanlege): «brynja» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:776)
- Runeskuggen under Bryggen (vanlege): «rún» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:784)
- Runeskuggen ved Borgund (vanlege): «stafr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:785)
- Runeskuggen i kongsgarden (vanlege): «kefli» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:786)
- Skrinberaren (vanlege): «skrín» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:788)
- Den sjuke pilegrimen (vanlege): «heill» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:789)
- Skalden på Avaldsnes (vanlege): «hróðr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:798)
- Skalden ved Nidaros (vanlege): «drápa» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:799)
- Skalden i gudevegen (vanlege): «kenning» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:800)
- Skalden med skaldemjøden (vanlege): «Óðrerir» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:801)
- Kvedaren frå Selja (vanlege): «kvæði» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:802)
- Jotunskuggen på Hardangervidda (vanlege): «risi» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:810)
- Jotunskuggen på Gaustatoppen (vanlege): «bergrisi» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:812)
- Jotunskuggen i Jotunfjella (vanlege): «jǫtunn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:813)
- Jotunskuggen i gudevegen (vanlege): «hrímþurs» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:814)
- Frostvetten på tunet (vanlege): «rim» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:828)
- Frostvetten i Bondalen (vanlege): «fonnfall» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:829)
- Frostvettane på Veblungsnes (vanlege): «martnad» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:830)
- Frostvetten i fiskeværet (vanlege): «sjørøyk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:831)
- Frostvetten i ærfuglhuset (vanlege): «ærfuglhus» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:832)
- Frostvetten på Nes (vanlege): «kvitfrost» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:834)
- Frostvetten i lauvlia (vanlege): «rimlauv» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:836)
- Frostvetten ved Hårteigen (vanlege): «rabbe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:837)
- Frostvetten på Stiklestad (vanlege): «fylking» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:838)
- Frostvetten i fjøra ved Ila (vanlege): «brenning» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:840)
- Frostvetten på Fokstumyra (vanlege): «frostmyr» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:841)
- Frostvetten ved røykstova (vanlege): «røykomn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:842)
- Frostvetten ved Fetsund (vanlege): «ferjestad» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:843)
- Frostvettane ved Fredrikshald (vanlege): «sludd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:844)
- Frostvetten i frukthagen (vanlege): «kvitblom» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:846)
- Frostvetten på heia (vanlege): «nysnø» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:847)
- Isvesenet ved Drøbak (vanlege): «drivis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:856)
- Isvesenet i Hjørundfjorden (vanlege): «svartis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:857)
- Isvesenet i Rauma (vanlege): «fossis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:858)
- Isvesenet i Karmsundet (vanlege): «sund» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:859)
- Isvesenet i Drammenselva (vanlege): «fløyting» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:861)
- Isvesenet på Hardangerfjorden (vanlege): «isgang» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:862)
- Isvesenet i Mjøsa (vanlege): «stålis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:863)
- Isvesenet i Lågen (vanlege): «issvull» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:864)
- Isvesenet ved Nigardsbreen (vanlege): «brefall» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:865)
- Isvesenet i Nidelva (vanlege): «os» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:866)
- Isvesenet på Styggebreen (vanlege): «bresprekk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:867)
- Isvesenet på øyrane (vanlege): «lågvatn» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:869)
- Isvesenet i havgrotta (vanlege): «fjøre» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:870)
- Isvesenet i Sørfjorden (vanlege): «fjordis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:872)
- Isvesenet ved Odderøya (vanlege): «holme» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:873)
- Isvesenet i Otra (vanlege): «elveis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:874)
- Isvesenet i råka (vanlege): «nyis» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:875)
- Snøfokket på Trondhjemsvegen (vanlege): «snøfokk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:883)
- Skredrøyken i Romsdalen (vanlege): «snøskred» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:884)
- Snøfokket over lyngheia (vanlege): «lyngsviing» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:886)
- Snørokket over Hemsedal (vanlege): «snørok» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:887)
- Drevet på vidda (vanlege): «snødrev» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:890)
- Uvêret i Innherred (vanlege): «solmørke» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:891)
- Stormen over Trondheimsfjorden (vanlege): «søgang» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:892)
- Snøfokket ved vardane (vanlege): «vardeveg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:894)
- Snødrevet i Kvadraturen (vanlege): «takskjegg» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:895)
- Snødrevet frå Folgefonna (vanlege): «fonnrok» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:896)
- Kastevinden i Byklestigen (vanlege): «kastevind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:897)
- Fimbulvinden på Gaustatoppen (vanlege): «fjellvind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:898)
- Frostmusene i fjøset (vanlege): «bing» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:906)
- Frostmusene i Vaterland (vanlege): «skorpe» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:907)
- Frostmusene i Sufflørkassa (vanlege): «tråd» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:908)
- Frostmusene i stabburet (vanlege): «kornloft» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:909)
- Frostmusene under fjøsgolvet (vanlege): «fjøl» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:910)
- Frostmusene på Bakklandet (vanlege): «bryggeloft» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:911)
- Isravnen over Nordmarka (vanlege): «frostrøyk» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:919)
- Isravnen over Dovre (vanlege): «nordavind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:920)
- Isravnen over Nord-Troms (vanlege): «mørketid» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:921)
- Isravnen over Romerike (vanlege): «grunnlov» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:922)
- Isravnen over Tinn (vanlege): «tind» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:923)
- Isravnen over Finnskogen (vanlege): «ulvespor» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:924)
- Isravnen over Christiansholm (vanlege): «festning» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:925)
- Isravnen i porthallen (vanlege): «isrose» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:926)
- Rimkopisten hos Botten-Hansen (vanlege): «nordljos» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:934)
- Rimkopisten på kyrkjeloftet (vanlege): «frostnatt» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:935)
- Gløymslefrimerket (vanlege): «heimhug» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:936)
- Rimkopisten i arkivet i Krødsherad (vanlege): «hela» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:937)
- Kulissen i Komediehuset (vanlege): «knake» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:945)
- Kulissen i Christiania Theater (vanlege): «stivfrosen» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:946)
- Kulissen i kopien av Komediehuset (vanlege): «januarkveld» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:947)
- Ljomet (vanlege): «ljom» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:960)
- Gufsen (vanlege): «gufs» (05 Mekanikk/09a Bestiarium vanlege fiendar.md:962)
- Trykkerirotta (namngjevne): «gnage» (05 Mekanikk/07 Bestiarium dyr.md:138)
- Lusa (namngjevne): «lus» (05 Mekanikk/07 Bestiarium dyr.md:140)
- Den tause (namngjevne): «den tause» (05 Mekanikk/07 Bestiarium dyr.md:170)
- Vårflokken (namngjevne): «dåra» (05 Mekanikk/07 Bestiarium dyr.md:246)
- Vågekvalen i Skogsvåg (namngjevne): «kval i sundet» (05 Mekanikk/07 Bestiarium dyr.md:263)
- Den bundne haugkona (namngjevne): «Underjordiske» (05 Mekanikk/08 Bestiarium fabeldyr og folkevesen.md:213)
- Alvis (namngjevne): «alvis» (05 Mekanikk/08 Bestiarium fabeldyr og folkevesen.md:230)
- Heilaren (namngjevne): «gøyme» (05 Mekanikk/09 Bestiarium menneske.md:140)
- Grensesmuglaren (namngjevne): «skilje» (05 Mekanikk/09 Bestiarium menneske.md:141)
- Tryllekunstnaren med beger og kuler (namngjevne): «gjøgl» (05 Mekanikk/09 Bestiarium menneske.md:260)

### Fiendar i møtegrupper som ikkje finst (10)

- Sona Draugvegen, torvgarden (7.4), gruppe 1: «Det frosne gardsvesenet» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1621)
- Sona Draugvegen, torvgarden (7.4), gruppe 3: «Det frosne gardsvesenet» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1623)
- Sona Draugvegen, torvgarden (7.4), gruppe 4: «Det frosne gardsvesenet» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1624)
- Sona Draugvegen, torvgarden (7.4), gruppe 7: «Det frosne gardsvesenet» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1627)
- Sona Draugvegen, torvgarden (7.4), gruppe 8: «Det frosne gardsvesenet» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1628)
- Sona Kongevegen, kongsgarden (7.6), gruppe 2: «Sagakongen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1662)
- Sona Kongevegen, kongsgarden (7.6), gruppe 3: «Sagakongen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1663)
- Sona Kongevegen, kongsgarden (7.6), gruppe 6: «Sagakongen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1666)
- Sona Kongevegen, kongsgarden (7.6), gruppe 8: «Sagakongen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1668)
- Sona Kongevegen, kongsgarden (7.6), gruppe 9: «Sagakongen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1669)

### Utgangar med namn som ikkje kunne slåast opp (53)

- DRM-04: «Christiania» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:116)
- RMS-01: «Ørsta og Sunnmøre, isvegen» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:343)
- DOV-03: «Villmark V8, grova ved Hjerkinn» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:391)
- DOV-03: «Dovre, fjellstua på Hjerkinn» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:391)
- DOV-03: «Dovre, kongevegen mot Kongsvold» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:391)
- DOV-04: «Villmark V8» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:394)
- ROM-02: «Christiania» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:459)
- ROM-05: «Utgard i Eidaskogen» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:462)
- RSU-01: «Voss og Hardanger» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:564)
- RSU-01: «Sørfjorden» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:564)
- RSU-03: «Rogaland, båten til Stavanger» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:566)
- BYO-01: «Kristiansand» (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:582)
- OST-02: «Voss og Hardanger» (07 Kart og rom/02 Kart Bergen og Nordhordland.md:334)
- CHR-01a: «Sagahallen» (07 Kart og rom/03 Kart Christiania.md:14)
- SGH-01: «Christiania» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:13)
- SGH-01: «Universitetet ved Slottsveien» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:13)
- SGH-28: «Etter 7.10: SGH-01 Handskriftsamlinga og ut til Christiania» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:42)
- DST-01: «Trøndelag» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:83)
- DST-01: «Stiklestad og Innherred» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:83)
- DBO-01: «Sogn» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:93)
- DMJ-01: «Mjøsa, isvegen og strendene» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:104)
- DSD-01: «Ørsta og Sunnmøre» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:115)
- DSD-01: «Stad og Selje» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:115)
- DBY-01: «Setesdal, leikvollen på Bygland» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:139)
- DUR-01: «Sogn» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:148)
- OLB-01: «Trondheim» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:198)
- OLB-01: «Nidarosdomen» (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:198)
- TRL-06: «Superbossdungeon Skipet ned gjennom Folla, lag 1» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:60)
- OLA-03: «Superbossdungeon Olavsbrønnen, etasje 1» (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:121)
- BGD-01: «Filefjell» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:31)
- BGD-01: «Drakestadene: under golvet i Borgund» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:31)
- LFH-01: «Villmark V3, inngangsvarden» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:71)
- LFH-01: «Voss og Hardanger» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:71)
- LFH-01: «Lofthus» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:71)
- GAU-01: «Drakestadene: Gaustatoppen» (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:249)
- HJF-01: «Ørsta og Sunnmøre» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:13)
- HJF-01: «Bondalen» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:13)
- LYS-01: «Sogn, båten over fjorden» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:91)
- JRN-01: «Rogaland, lyngheia ved bygda» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:262)
- JRN-01: «Rogaland, isvegen nord frå Stavanger» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:262)
- BYK-01: «Setesdal, dalen langs Otra» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:335)
- HVR-01: «Telemark» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:412)
- HVR-01: «Tveitli» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:412)
- HVR-11: «Telemark» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:423)
- HVR-11: «Tveitli» (07 Kart og rom/07 Kart villmarkene V1 til V6.md:423)
- JOT-01: «Gudbrandsdalen» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:15)
- FOK-01: «Gudbrandsdalen» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:78)
- FOK-03: «Dovre» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:80)
- FOK-09: «Dovre» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:107)
- HKY-01: «Helgeland» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:138)
- HKY-01: «Brønnøy» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:138)
- RMD-01: «Gudbrandsdalen» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:201)
- RMD-01: «Lesja» (07 Kart og rom/08 Kart villmarkene V7 til V12.md:201)

### Utgangar som berre går éin veg (61)

- FIL-04 → BGD-01, men BGD-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:273)
- GBD-05 → JOT-01, men JOT-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:300)
- GBD-08 → RMD-01, men RMD-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:303)
- RMS-02 → RMD-01, men RMD-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:344)
- MJO-04 → DMJ-02, men DMJ-02 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:364)
- DOV-01 → GBD-06, men GBD-06 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:388)
- DOV-02 → FOK-01, men FOK-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:389)
- EDS-04 → EDS-01, men EDS-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:457)
- ROM-03 → OYR-01, men OYR-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:460)
- ROM-04 → FSK-01, men FSK-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:461)
- BYO-02 → BYG-01, men BYG-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:583)
- PSN-14 → PSN-01, men PSN-01 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:240)
- FHL-05 → GBD-07, men GBD-07 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:328)
- HJK-01 → DOV-02, men DOV-02 har inga utgang attende (07 Kart og rom/05 Kart Austlandet, innlandet og verdskartet.md:425)
- ALV-01 → BGN-01, men BGN-01 har inga utgang attende (07 Kart og rom/02 Kart Bergen og Nordhordland.md:304)
- OST-02 → VNG-01, men VNG-01 har inga utgang attende (07 Kart og rom/02 Kart Bergen og Nordhordland.md:334)
- CHR-01 → CHR-08, men CHR-08 har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:13)
- CHR-03b → CHR-03a, men CHR-03a har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:20)
- CHR-10a → SGH-02, men SGH-02 har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:40)
- MAL-05 → MAL-06, men MAL-06 har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:228)
- BHH-03 → BHH-07, men BHH-07 har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:260)
- WEL-06 → WEL-02, men WEL-02 har inga utgang attende (07 Kart og rom/03 Kart Christiania.md:379)
- ARF-01 → ORV-01, men ORV-01 har inga utgang attende (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:172)
- BON-04 → HJF-02, men HJF-02 har inga utgang attende (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:236)
- UGF-10 → UGF-01, men UGF-01 har inga utgang attende (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:79)
- EGL-02 → EGL-03, men EGL-03 har inga utgang attende (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:320)
- EGL-03 → SLN-01b, men SLN-01b har inga utgang attende (07 Kart og rom/01 Kart Ørsta og Sunnmøre.md:321)
- SGH-08 → SGH-09, men SGH-09 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:21)
- SGH-17 → SGH-18, men SGH-18 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:31)
- SGH-25 → SGH-26, men SGH-26 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:39)
- SGH-26 → SGH-27, men SGH-27 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:40)
- SGH-27 → SGH-28, men SGH-28 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:41)
- DBO-01 → BGD-01, men BGD-01 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:93)
- DBO-03 → DBO-04, men DBO-04 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:95)
- DMJ-04 → DMJ-01, men DMJ-01 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:107)
- DSD-04 → DSD-05, men DSD-05 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:118)
- DSD-05 → DSD-02, men DSD-02 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:119)
- DUR-01 → LYS-05, men LYS-05 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:148)
- DUR-03 → DUR-04, men DUR-04 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:150)
- DUR-04 → DUR-01, men DUR-01 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:151)
- DVK-01 → LFN-02, men LFN-02 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:159)
- OLB-13 → OLB-01, men OLB-01 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:210)
- SFO-10 → SFO-01, men SFO-01 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:245)
- UTG-14 → UTG-15, men UTG-15 har inga utgang attende (07 Kart og rom/09 Kart Sagahallen og superbossdungeonane.md:283)
- TRD-05 → TRD-02, men TRD-02 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:37)
- HLG-01 → TRD-07, men TRD-07 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:210)
- HLG-03 → HKY-01, men HKY-01 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:212)
- KAU-08 → KAU-02, men KAU-02 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:329)
- DFB-06 → HLG-01, men HLG-01 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:190)
- TBV-06 → VAR-01, men VAR-01 har inga utgang attende (07 Kart og rom/06 Kart Trøndelag og Nord-Noreg.md:311)
- HFS-01 → LYS-01, men LYS-01 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:23)
- JAR-02 → JRN-01, men JRN-01 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:129)
- VLE-04 → BYK-01, men BYK-01 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:172)
- KRS-05 → KRS-02, men KRS-02 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:204)
- SEL-02a → SAK-08, men SAK-08 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:235)
- RAU-03 → HVR-01, men HVR-01 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:247)
- SAK-06 → SEL-01, men SEL-01 har inga utgang attende (07 Kart og rom/04 Kart Vestlandet, Sørlandet og Telemark.md:286)
- HJF-16 → HJF-07, men HJF-07 har inga utgang attende (07 Kart og rom/07 Kart villmarkene V1 til V6.md:29)
- FOK-03 → DOV-02, men DOV-02 har inga utgang attende (07 Kart og rom/08 Kart villmarkene V7 til V12.md:80)
- FOK-09 → DOV-06, men DOV-06 har inga utgang attende (07 Kart og rom/08 Kart villmarkene V7 til V12.md:107)
- HKY-13 → HKY-08, men HKY-08 har inga utgang attende (07 Kart og rom/08 Kart villmarkene V7 til V12.md:173)

### Oppslag som ingen scene, fiende eller stad gjev (181)

- 1.02 moder (Kjelde i spelet: ny: 1.1, Ivar ved grava («Kvar er mor?»)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:12)
- 1.03 no (Kjelde i spelet: ny: 1.1 mora) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:13)
- 1.11 sæter (Kjelde i spelet: ny: 1.2 budeia Brita) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:21)
- 1.12 grjot (Kjelde i spelet: ny: 1.2 faren ved gjerdet; 3.3 Nes, ordgåta med Tandberg) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:22)
- 1.15 ja (Kjelde i spelet: ny: 1.1 mora) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:25)
- 1.16 nei (Kjelde i spelet: ny: 1.9 tussen («Nei.»)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:26)
- 1.17 katt (Kjelde i spelet: ny: 1.3 tussen og Musekongen) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:27)
- 1.19 bås (Kjelde i spelet: ny: 1.3 tussen i båsen) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:29)
- 1.31 sut (Kjelde i spelet: ny: 1.4 tussen etter at faren døydde; ny: Gamle-Tarjei i Bygland, S1.22) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:41)
- 1.32 klen (Kjelde i spelet: ny: 1.4 faren i sengkammerset) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:42)
- 1.34 skam (Kjelde i spelet: ny: 1.5 presten (ordet på statusen)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:44)
- 1.41 gut (Kjelde i spelet: ny: 1.9 tussen («Du er ein gut.»)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:51)
- 1.44 åttæring (Kjelde i spelet: ny: 1.10 fiskarane i Ørstavika) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:54)
- 1.52 trå (Kjelde i spelet: ny: 1.15 Aasen i lampelyset) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:62)
- 1.56 dåm (Kjelde i spelet: ny: 1.16 gamle Sunniva i drengestova) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:66)
- 1.59 gjenta (Kjelde i spelet: ny: S1.3 Marta, jenta som spurde) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:69)
- 1.62 støkk (Kjelde i spelet: ny: 1.17 Aasen når kvinna i snøen reiser seg) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:72)
- 2.04 kval (Kjelde i spelet: Vågekvalen (bestiarium, Vågen i Bergen 1841)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:91)
- 2.13 turrfisk (Kjelde i spelet: ny: ein nordlandsfar ved Vågen, 1.19) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:100)
- 2.14 jagt (Kjelde i spelet: ny: nordlandsfaren ved Vågen, 1.19) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:101)
- 2.15 skip (Kjelde i spelet: ny: ein tysk kontorist på Bryggen, 1.19) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:102)
- 2.19 elder (Kjelde i spelet: ny: Mons på Litlebergen, 2.6) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:106)
- 2.25 lykt (Kjelde i spelet: ny: S1.12 fyrvaktaren på Hellisøy) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:112)
- 2.26 seid (Kjelde i spelet: ny: S1.12 fiskarane på Fedje) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:113)
- 2.27 aldri (Kjelde i spelet: ny: ein bryggjegut på Bryggen, 1.19) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:114)
- 2.28 staup (Kjelde i spelet: ny: ein gjest i kjellaren på Nordnes) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:115)
- 3.02 steikja (Kjelde i spelet: ny: 2.3 bonden Anders) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:136)
- 3.03 eple (Kjelde i spelet: ny: 2.3 frukttrea på garden til Anders) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:137)
- 3.07 kveld (Kjelde i spelet: ny: 2.4 Per («Kvedl. Det er når det vert mørkt.»); ny: huldra, Gamle ord (lista i prologen)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:141)
- 3.09 kjerring (Kjelde i spelet: ny: 2.5 Anders («Ikkje sei noko meir, kjerring!»)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:143)
- 3.12 banna (Kjelde i spelet: ny: 2.5 Per) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:146)
- 3.15 turka (Kjelde i spelet: ny: S1.9 Lars Hauge på tunet) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:149)
- 3.17 nykk (Kjelde i spelet: ny: S1.10 Nøkken i Hafslovatnet) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:151)
- 3.18 hest (Kjelde i spelet: ny: S1.10 guten Knut) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:152)
- 3.19 kvit (Kjelde i spelet: ny: S1.10 guten Knut) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:153)
- 3.21 sidan (Kjelde i spelet: ny: Ingeborg i Leikanger, 2.5 («Det er lenge siaa»)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:155)
- 3.23 sogning (Kjelde i spelet: ny: Dagboka, «Folket i Sogn bander uophørlig») (09 Ordboka/02 Ordlista kapittel 1 til 3.md:157)
- 3.31 haust (Kjelde i spelet: ny: Dagboka, Aasen kjem til Sogn i oktober 1842) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:165)
- 3.35 gauk (Kjelde i spelet: ny: Per om våren 1843; ny: Aslaug, stevet om gauken, 2.25) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:169)
- 3.38 vette (Kjelde i spelet: S2.34 eit barn i Sogn) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:172)
- 3.40 rot (Kjelde i spelet: Nidhoggsungen (superboss, Urnes)) (09 Ordboka/02 Ordlista kapittel 1 til 3.md:174)
- 4.08 grensa (Kjelde i spelet: 2.13 Ullensvang, Olav (folk)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:24)
- 4.23 kjerald (Kjelde i spelet: ny: kona som ber eple i eit kjerald i frukthagen på Lofthus, S1.18) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:39)
- 4.26 ingen (Kjelde i spelet: ny: Olav i Ullensvang, 2.13 («Ingjein eig denne bøen»)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:42)
- 4.28 låt (Kjelde i spelet: ny: Nils på Lofthus, 2.12) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:44)
- 4.29 han (Kjelde i spelet: ny: skulemeister Dahl på Vangen på Voss, 2.11) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:45)
- 4.30 skaut (Kjelde i spelet: ny: brura i Brudestova på Voss, S1.16) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:46)
- 4.34 plukka (Kjelde i spelet: ny: plukkarane i frukthagen, S1.18) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:50)
- 4.35 mest (Kjelde i spelet: ny: Brita på Voss, 2.11) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:51)
- 5.22 sylgja (Kjelde i spelet: ny: sylvsmeden i Valle, S1.23) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:80)
- 5.23 her (Kjelde i spelet: ny: laksefiskaren ved Mandalselva, S1.24) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:81)
- 5.24 preika (Kjelde i spelet: ny: lekpredikanten i konventikkelen, S1.20) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:82)
- 5.25 kvia (Kjelde i spelet: ny: Tobias på lyngheia, S1.19) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:83)
- 5.27 gjæta (Kjelde i spelet: ny: Tobias på lyngheia, S1.19) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:85)
- 5.29 øyk (Kjelde i spelet: ny: skysskaren i Setesdal, 2.18) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:87)
- 5.31 skipar (Kjelde i spelet: ny: skipparen på brygga i Kristiansand, S1.24) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:89)
- 5.32 åker (Kjelde i spelet: ny: bonden på Jæren, 2.14) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:90)
- 5.33 ogso (Kjelde i spelet: ny: Ane i Stavanger, S1.20) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:91)
- 5.34 stakk (Kjelde i spelet: ny: torvskjeraren på Jæren, 2.14) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:92)
- 5.37 ljå (Kjelde i spelet: ny: slåttekarane på Jæren, 2.14) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:95)
- 5.39 or (Kjelde i spelet: ny: Gamle-Tarjei, S1.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:97)
- 5.40 aure (Kjelde i spelet: ny: ein aurefiskar ved Mandalselva, S1.24) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:98)
- 6.27 attåt (Kjelde i spelet: ny: kona i Rauland, 2.26 («Graut og mjølk attat»)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:132)
- 6.28 fager (Kjelde i spelet: ny: Landstad og visa om Kivlemøyane, 2.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:133)
- 6.29 kvida (Kjelde i spelet: ny: Vinje på Tveitli, 2.27) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:134)
- 6.30 mjå (Kjelde i spelet: ny: Aslaug om ei møy i visa, 2.25) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:135)
- 6.31 sylv (Kjelde i spelet: ny: sylvet i haugen til haugbonden i Seljord (bestiarium)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:136)
- 6.32 gangar (Kjelde i spelet: ny: spelemannen som spelar ein gangar for Aslaug på Tveitli, 2.25) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:137)
- 6.33 stutt (Kjelde i spelet: ny: Aslaug om korte stev, 2.25) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:138)
- 6.34 spott (Kjelde i spelet: ny: Vinje på Tveitli, 2.27) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:139)
- 6.35 sverd (Kjelde i spelet: ny: kjempevisa hos Landstad, 2.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:140)
- 6.36 sum (Kjelde i spelet: ny: kona i Rauland, 2.26) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:141)
- 6.37 fyrr (Kjelde i spelet: ny: Landstad, 2.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:142)
- 6.38 kjempa (Kjelde i spelet: ny: kjempevisa hos Landstad, 2.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:143)
- 6.39 rosa (Kjelde i spelet: ny: rosemålaren i Rauland, 2.26) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:144)
- 6.40 klokkar (Kjelde i spelet: ny: klokkaren i Seljord kyrkje, 2.23) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:145)
- 6.41 svartebok (Kjelde i spelet: ny: Vinje om svarteboka i bygda, 2.27) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:146)
- 6.42 møy (Kjelde i spelet: ny: Kivlemøyane, Kivledalen 1853 (bestiarium, fabeldyr)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:147)
- 6.43 kvikna (Kjelde i spelet: ny: Landstad ved sjukesenga, 2.22) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:148)
- 6.44 hoppa (Kjelde i spelet: ny: hopparen i Morgedal, S2.25) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:149)
- 6.45 heilag (Kjelde i spelet: ny: Landstad i Seljord kyrkje, 2.23) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:150)
- 7.08 bøling (Kjelde i spelet: S2.15 bestemor Kari (sideoppdrag)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:165)
- 7.11 kvitel (Kjelde i spelet: ny: den unge Tandberg under kvitelen i senga, ordgåta 3.3) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:168)
- 7.19 loft (Kjelde i spelet: 3.3 Nes, ordgåta med Tandberg (folk)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:176)
- 7.21 når (Kjelde i spelet: ny: postopnaren på Nes, 3.1 («Ner kjem posten?»)) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:178)
- 7.28 trøya (Kjelde i spelet: ny: hallingane i raude trøyer på ekserserplassen, 3.4) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:185)
- 7.29 kvann (Kjelde i spelet: ny: budeia på ein støl i Numedal) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:186)
- 7.30 millom (Kjelde i spelet: ny: kjøgemeisteren i Gulsvik, 4.18) (09 Ordboka/03 Ordlista kapittel 4 til 7.md:187)
- 8.01 andøva (Kjelde i spelet: den gamle fiskaren, 3.19 (havord: «Andøvsbåt»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:11)
- 8.03 bøta (Kjelde i spelet: ny: den gamle fiskaren som bøter garn, 3.19) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:13)
- 8.04 dei (Kjelde i spelet: ny: ei kone på Bakklandet, Trondheim 1846 («Dem kjem no»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:14)
- 8.06 eid (Kjelde i spelet: ny: ein bonde på Fosen, 1846) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:16)
- 8.10 hamleband (Kjelde i spelet: den gamle fiskaren, 3.19 (havord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:20)
- 8.13 kaupstad (Kjelde i spelet: ny: handelsmannen på dampbåten, 3.20 (seier «Kjøbstad»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:23)
- 8.16 knut (Kjelde i spelet: ny: den gamle fiskaren som knyter ein knute, 3.19) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:26)
- 8.17 kvåda (Kjelde i spelet: ny: ein tømmerkar i skogane i Trøndelag, 1846) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:27)
- 8.18 lel (Kjelde i spelet: ny: båtmannen under bybrua ved Bakklandet, 1846 («Han kjem lell»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:28)
- 8.19 medan (Kjelde i spelet: ny: ein tømmerkar i skogane i Inntrøndelag, 1846) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:29)
- 8.20 nordanfjells (Kjelde i spelet: ny: sekretæren i Selskabet, 3.17 (seier «nordenfjelds»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:30)
- 8.21 olsok (Kjelde i spelet: ny: Maren, S1.40) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:31)
- 8.23 reip (Kjelde i spelet: ny: mannskapet som surrar tønnene, 3.21) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:33)
- 8.29 tjuv (Kjelde i spelet: ny: vaktaren på Bakklandet, Trondheim 1846) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:39)
- 8.30 tollepinne (Kjelde i spelet: den gamle fiskaren, 3.19 (havord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:40)
- 8.35 øks (Kjelde i spelet: ny: ekkoet av Olav ved kjelda, S1.40) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:45)
- 9.01 akkar (Kjelde i spelet: ny: blekkvesen i krambua i Lofoten, ordet under streken for «Blæksprutte», 1851) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:53)
- 9.02 åta (Kjelde i spelet: ny: ein fiskar på Værøy, 1851) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:54)
- 9.04 der (Kjelde i spelet: ny: ein los i Moskenes, 1851 («Dar går straumen»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:56)
- 9.13 ho (Kjelde i spelet: ny: ei kone frå Salten i fiskeværet i Lofoten, 1851) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:65)
- 9.14 juksa (Kjelde i spelet: ny: krambua til Heggelund i Nord-Troms, som sel juksa med jernkjetting (sjå Håkjerringa)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:66)
- 9.15 keip (Kjelde i spelet: ny: ein gamal høvedsmann i fiskeværet, 5.15) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:67)
- 9.16 kjos (Kjelde i spelet: ny: ei kone i fiskeværet, 5.15) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:68)
- 9.19 kveita (Kjelde i spelet: ny: fiskarane i Lofoten, 5.15) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:71)
- 9.23 malstraum (Kjelde i spelet: ny: ein los i Moskenes, 1851) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:75)
- 9.27 rok (Kjelde i spelet: ny: stormen ved Lovund i segna om nattdraugen, Skipet ned gjennom Folla 1853) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:79)
- 9.29 skinnstakk (Kjelde i spelet: ny: ein lofotkar om bord på dampbåten, 3.20) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:81)
- 9.32 skuld (Kjelde i spelet: ny: Brennevinsånda, 5.18) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:84)
- 9.33 steinbit (Kjelde i spelet: ny: ein fiskar på Vega, 1846) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:85)
- 10.04 budeigja (Kjelde i spelet: ny: Ragnhild, budeia på Lesja, S1.36) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:98)
- 10.11 hjå (Kjelde i spelet: ny: stuekona Marit på fjellstua, S2.27 («Du kan bu sjaa oss»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:105)
- 10.16 kvila (Kjelde i spelet: ny: kvileplassane ved vardane, S1.37) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:110)
- 10.18 leita (Kjelde i spelet: ny: sporet ved Hjerkinn, 3.16 (spelaren leitar mellom vardane)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:112)
- 10.20 nokon (Kjelde i spelet: ny: ein reinsjeger på fjellstua på Hjerkinn, S2.27) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:114)
- 10.23 trakka (Kjelde i spelet: ny: S1.37 Kongevegen og vardane (partyet trakkar i snøstormen)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:117)
- 10.25 yver (Kjelde i spelet: ny: stuevertinna på Hjerkinn, 3.16 («Dåkk har gått over i dette veret?»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:119)
- 12.01 au (Kjelde i spelet: ny: ein husmann i Hallingdal som frys på fingrane, fimbulvinteren 1852) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:127)
- 12.03 blota (Kjelde i spelet: ny: ein bonde i Hallingdal, våren 1852) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:129)
- 12.04 brøyta (Kjelde i spelet: ny: brøytekarane på Kongevegen over Dovre, fimbulvinteren 1852) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:130)
- 12.05 eimyrja (Kjelde i spelet: ny: 5.2 Det tomme fjøset (glørne i eldhuset på Åsen)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:131)
- 12.06 eisa (Kjelde i spelet: ny: Sondre ved elden i botnen av bakken, S2.25) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:132)
- 12.07 fjuk (Kjelde i spelet: ny: S2.25 Hopprennet i Morgedal (snøord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:133)
- 12.09 fok (Kjelde i spelet: ny: S2.25 (snøord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:135)
- 12.10 frjosa (Kjelde i spelet: ny: Isen, S2.8) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:136)
- 12.12 frøysa (Kjelde i spelet: ny: ravnar av is (fimbulvintervesen)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:138)
- 12.13 føyk (Kjelde i spelet: ny: Fonnvetten, S2.25 (fase to)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:139)
- 12.14 gneiste (Kjelde i spelet: ny: Ole Bull, 6.1 Teateret i snøen) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:140)
- 12.15 hålka (Kjelde i spelet: ny: S2.25 (snøord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:141)
- 12.18 kaldtokke (Kjelde i spelet: ny: Rimskrivarane på Hjerkinn, 6.12) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:144)
- 12.21 klake (Kjelde i spelet: ny: S2.25 (snøord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:147)
- 12.22 knaka (Kjelde i spelet: ny: dei frosne kulissane, 6.1 Teateret i snøen) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:148)
- 12.24 krape (Kjelde i spelet: ny: Isen, S2.8 (andre fase)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:150)
- 12.26 kvitna (Kjelde i spelet: ny: Frostvette (fimbulvintervesen), Ørsta vinteren 1850-51) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:152)
- 12.27 kvitvise (Kjelde i spelet: ny: Aslaug, Rauland våren 1853) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:153)
- 12.29 mjell (Kjelde i spelet: ny: S2.25 (snøord)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:155)
- 12.30 nordan (Kjelde i spelet: ny: ein skysskar på Dovre, fimbulvinteren 1852 («Han kjem nordan»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:156)
- 12.31 omn (Kjelde i spelet: ny: 6.1 Teateret i snøen (omnen i garderoben)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:157)
- 12.33 skjol (Kjelde i spelet: ny: reinsjegerane som søkjer ly, Dovrefjell fimbulvinteren 1852) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:159)
- 12.34 spraka (Kjelde i spelet: ny: jenta på garden, 5.2) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:160)
- 12.37 ute (Kjelde i spelet: ny: brøytekarane på Kongevegen over Dovre, fimbulvinteren 1852) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:163)
- 12.38 vetter (Kjelde i spelet: ny: ei kone i Seljord, jula 1852 («i Vet»)) (09 Ordboka/04 Ordlista kapittel 8 til 10 og 12.md:164)
- 11.02 slask (Kjelde i spelet: ny: fiskekona frå Nesodden på Stortorvet (3.11)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:12)
- 11.09 gøyma (Kjelde i spelet: Heilaren i Vaterland 1848 (bestiarium)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:19)
- 11.20 fy (Kjelde i spelet: ny: ei høkarkone i Vika, 1848 («Fy skamme deg!»)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:30)
- 11.25 gnaga (Kjelde i spelet: Trykkerirotta 1849 (bestiarium)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:35)
- 11.32 fant (Kjelde i spelet: ny: bestemor Kari om hallingane på Pipervikbrygga, S2.15) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:42)
- 11.33 lempa (Kjelde i spelet: ny: bestemor Kari («Ein må lempa seg i byen»), S2.15) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:43)
- 11.34 kista (Kjelde i spelet: ny: emigrantkista til bestemor Kari, S2.15) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:44)
- 11.46 stakkar (Kjelde i spelet: ny: tiggarguten ved Vor Frelsers kyrkje (bestiarium, menneske)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:56)
- 11.49 so (Kjelde i spelet: ny: tiggarguten på Stortorvet, 3.11) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:59)
- 13.01 hagl (Kjelde i spelet: huldra, Gamle ord (prologen)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:68)
- 13.02 tegja (Kjelde i spelet: huldra, Gamle ord («þegi», prologen og 1.23)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:69)
- 13.05 atter (Kjelde i spelet: ny: huldra når ho kjem att til leirbålet (samtale)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:72)
- 13.06 øyra (Kjelde i spelet: ny: huldra, minnebit etter 5.17) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:73)
- 13.07 vit (Kjelde i spelet: ny: huldra ved leirbålet på langferda (samtale)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:74)
- 13.09 kvik (Kjelde i spelet: ny: eit Edda-blad i montrane (4.8)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:76)
- 13.11 mjød (Kjelde i spelet: ny: Særimne-kvelden hos patriotane (5.7); ny: haugbonden i Seljord (bestiarium)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:78)
- 13.15 ask (Kjelde i spelet: ny: gudevegen i Sagahallen, 7.7 (askegreiner i taket)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:82)
- 13.17 gap (Kjelde i spelet: ny: dei tre vegane i Sagahallen (7.3)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:84)
- 13.18 um (Kjelde i spelet: ny: porten til Sagahallen, 7.3 (Hávamál 1 står risse over døra)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:85)
- 13.19 burt (Kjelde i spelet: ny: Glåm i draugvegen, 7.4 («Gakk burt!»)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:86)
- 13.20 gjest (Kjelde i spelet: ny: Odin som Gestumblinde, første gåta i gåtekampen (7.7)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:87)
- 13.21 spjot (Kjelde i spelet: ny: einherjane i gudevegen (7.7, bestiarium); ny: kjempevisa hos Landstad, 2.22) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:88)
- 13.22 ljod (Kjelde i spelet: ny: Heimdall ved Bifrost i gudevegen (7.7, bestiarium)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:89)
- 13.23 galder (Kjelde i spelet: ny: volva ved inngangen til gudevegen (7.7, bestiarium)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:90)
- 13.26 unna (Kjelde i spelet: ny: Ingebjørg-pinnen blant runepinnane (7.10)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:93)
- 13.27 fe (Kjelde i spelet: ny: runegåtene (S2.36)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:94)
- 13.28 kaun (Kjelde i spelet: ny: bautaene og dei heilage kjeldene (S2.34)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:95)
- 13.29 arv (Kjelde i spelet: ny: runesteinen ved Tune (S2.34)) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:96)
- 13.30 lindorm (Kjelde i spelet: ny: dragehovuda på stavkyrkjene (S2.34), det gamle ordet for drake) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:97)
- 14.10 giva (Kjelde i spelet: Opnar seg i 6.18, Aslaug gir eit ord) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:114)
- 14.11 tru (Kjelde i spelet: Opnar seg i 6.20, Kapellanen i Krødsherad, når planen til kyrkja blir lagd fram) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:115)
- 14.12 landsmål (Kjelde i spelet: 7.1, Prøver af Landsmaalet, der maal blir oppgradert) (09 Ordboka/05 Ordlista kapittel 11, 13 og 14.md:116)

### Scener som ingen skjerm har (15)

- S1_5_1 Hornet (04 Manus/08 Sideoppdrag 1.md:85)
- S1_33_1 Supplicanterne (04 Manus/08 Sideoppdrag 1.md:581)
- S2_3_2 Slik Halvor skreiv (04 Manus/09 Sideoppdrag 2.md:121)
- S2_21_2 Lasterommet (04 Manus/09 Sideoppdrag 2.md:753)
- s2_6 Litlebergen (04 Manus/02 Reiseårene, første del.md:157)
- s4_28 Munch talar (04 Manus/04 Christiania.md:781)
- s5_25 Sagahallen (04 Manus/05 Fimbulvinteren, første del.md:1030)
- s6_4 Mellomspel: Oleana (04 Manus/06 Fimbulvinteren, andre del.md:97)
- s7_14b Breva (04 Manus/07 Sluttkampen og epilogen.md:1201)
- s7_25 Dølen (04 Manus/07 Sluttkampen og epilogen.md:1606)
- s7_26 Brev frå Roma (04 Manus/07 Sluttkampen og epilogen.md:1644)
- s7_27 Jamstillinga (04 Manus/07 Sluttkampen og epilogen.md:1714)
- s7_29 Det nye testamentet (04 Manus/07 Sluttkampen og epilogen.md:1844)
- s7_30 Den tomme sida (04 Manus/07 Sluttkampen og epilogen.md:1886)
- s7_31 Rulleteksten (04 Manus/07 Sluttkampen og epilogen.md:1912)

### Møtesoner utan skjerm (46)

- 9b_bakgardane_rundt_stortorvet_om_natta_i_marknadsveka_februar_1849 «Bakgardane rundt Stortorvet om natta i marknadsveka, februar 1849» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:1042)
- 9b_gatene_i_christiania_natta_til_4._august_1850_unntak «Gatene i Christiania natta til 4. august 1850 (Unntak)» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:1128)
- 9b_strendene_ved_kroderen_utmarka_og_kollane «Strendene ved Krøderen, utmarka og kollane» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:1203)
- 9c_hallingdal_postvegen_og_bygdene_fraa_kroderen_til_aal «Hallingdal: postvegen og bygdene frå Krøderen til Ål» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:180)
- 9c_sogn_bygdene_ved_stavkyrkjene_i_laerdal_og_luster «Sogn: bygdene ved stavkyrkjene i Lærdal og Luster» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:236)
- 9c_voss_og_hardangerfjorden_vegane_og_isvegen «Voss og Hardangerfjorden: vegane og isvegen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:257)
- 9c_hardangervidda «Hardangervidda» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:280)
- 9c_gardane_og_bygdevegane_i_seljord_rauland_og_hjartdal «Gardane og bygdevegane i Seljord, Rauland og Hjartdal» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:322)
- 9c_vatna_og_utmarka_i_rauland_og_ved_tinnsjoen «Vatna og utmarka i Rauland og ved Tinnsjøen» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:345)
- 9c_postvegen_over_dovrefjell «Postvegen over Dovrefjell» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:501)
- 9c_torget_og_gatene_i_den_frosne_byen_unntak «Torget og gatene i den frosne byen (Unntak)» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:524)
- 9c_bakgardane_om_dagen_1851_og_1852 «Bakgardane om dagen, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:687)
- 9c_bakgardane_om_kvelden_og_natta_1851_og_1852 «Bakgardane om kvelden og natta, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:706)
- 9c_kjellarane_i_vaterland_og_under_arresten_1851_og_1852 «Kjellarane i Vaterland og under arresten, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:725)
- 9c_byutkantane_nordmarka_akerselva_krokskogen_og_ekeberg_1851_og_1852 «Byutkantane: Nordmarka, Akerselva, Krokskogen og Ekeberg, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:746)
- 9c_vollane_paa_akershus_1851_og_1852 «Vollane på Akershus, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:767)
- 9c_isen_paa_christianiafjorden_ned_mot_drobak_1851_og_1852 «Isen på Christianiafjorden ned mot Drøbak, 1851 og 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:788)
- 9c_trondhjemsvegen_over_romerike_januar_1851 «Trondhjemsvegen over Romerike, januar 1851» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:927)
- 9c_trondhjemsvegen_over_romerike_fraa_juni_1852 «Trondhjemsvegen over Romerike, frå juni 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:948)
- 9c_isvegen_over_mjosa_januar_1851 «Isvegen over Mjøsa, januar 1851» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:971)
- 9c_isvegen_over_mjosa_fraa_juni_1852 «Isvegen over Mjøsa, frå juni 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:990)
- 9c_postvegen_gjennom_gudbrandsdalen_januar_1851 «Postvegen gjennom Gudbrandsdalen, januar 1851» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1013)
- 9c_postvegen_gjennom_gudbrandsdalen_fraa_juni_1852 «Postvegen gjennom Gudbrandsdalen, frå juni 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1034)
- 9c_isvegen_og_holmane_nord_fraa_stavanger_mars_1852 «Isvegen og holmane nord frå Stavanger, mars 1852» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1122)
- 9c_isvegen_og_holmane_den_store_opninga «Isvegen og holmane, den store opninga» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1143)
- 9c_gardane_og_dalvegen_i_valle_og_bygland «Gardane og dalvegen i Valle og Bygland» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1191)
- 9c_heiane «Heiane» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1210)
- 9c_kanselliarkivet_under_akershus_etasje_4_til_6_kyrkjebokene «Kanselliarkivet under Akershus, etasje 4 til 6: kyrkjebøkene» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1379)
- 9c_kanselliarkivet_under_akershus_etasje_7_til_9_skulebokene «Kanselliarkivet under Akershus, etasje 7 til 9: skulebøkene» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1393)
- 9c_kanselliarkivet_under_akershus_etasje_10_til_12_kopistane «Kanselliarkivet under Akershus, etasje 10 til 12: kopistane» (05 Mekanikk/09c Møtetabellar fimbulvinteren og Sagahallen.md:1407)
- 9b_vegane_i_leikanger_sogndal_og_laerdal «Vegane i Leikanger, Sogndal og Lærdal» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:232)
- 9b_innmarka_og_gardane_i_sogn «Innmarka og gardane i Sogn» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:249)
- 9b_skogen_urene_og_elvane_langs_fjorden_og_i_laerdal «Skogen, urene og elvane langs fjorden og i Lærdal» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:266)
- 9b_vegane_utmarka_og_elvane_paa_voss «Vegane, utmarka og elvane på Voss» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:383)
- 9b_frukthagane_utmarka_og_slaattemyrane_over_ullensvang_og_kanten_av_vidda «Frukthagane, utmarka og slåttemyrane over Ullensvang og kanten av vidda» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:425)
- 9b_strendene_og_lyngheia_paa_jaeren «Strendene og lyngheia på Jæren» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:466)
- 9b_stavanger_bakgardane_kaiene_og_byutkanten «Stavanger: bakgardane, kaiene og byutkanten» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:487)
- 9b_dalen_langs_otra_heiane_og_stolane «Dalen langs Otra, heiane og stølane» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:509)
- 9b_vegane_kyrkjebakkane_og_innmarka_i_seljord_kviteseid_og_vinje «Vegane, kyrkjebakkane og innmarka i Seljord, Kviteseid og Vinje» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:534)
- 9b_skogen_og_haugane_kring_seljord_og_utmarka_i_rauland «Skogen og haugane kring Seljord og utmarka i Rauland» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:554)
- 9b_vegane_skysskifta_og_gardane_paa_nes_og_i_aal «Vegane, skysskifta og gardane på Nes og i Ål» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:626)
- 9b_postvegen_og_skysskifta_1845 «Postvegen og skysskifta, 1845» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:730)
- 9b_fjellet_over_dalen_rondane_og_lesja_1845 «Fjellet over dalen, Rondane og Lesja, 1845» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:747)
- 9b_postvegen_og_fjellet_sommaren_1847 «Postvegen og fjellet, sommaren 1847» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:764)
- 9b_kongevegen_over_dovrefjell_november_1845 «Kongevegen over Dovrefjell, november 1845» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:789)
- 9b_dovrefjell_sommaren_1847 «Dovrefjell, sommaren 1847» (05 Mekanikk/09b Møtetabellar barndomen til Christiania.md:807)

### Kister med ting over nivået på staden (1)

- K-UBR-11-1: messingkompass høyrer til nivå 20 og opp etter Varer og kister, men sonene på UBR-11 i tida T2 har nivå 14 (07 Kart og rom/02 Kart Bergen og Nordhordland.md:152)

## 4 Motseiingar mellom faner

- «Fugledåre» står både som vare (05 Mekanikk/13 Varer og kister.md:62) og som utstyr (05 Mekanikk/02 Nivå, eigenskapar og utstyr.md:858). Begge postane er med, i kvar si fil (05 Mekanikk/13 Varer og kister.md:62, 05 Mekanikk/02 Nivå, eigenskapar og utstyr.md:858)
- Ande for Grunnord: Magisystemet seier «Éin alliert får same høvesbonusen på neste handling», Ordboka del 3 seier «Éin alliert får same høvesbonusen på neste handling mot same mål» (09 Ordboka/01 Magisystemet frå ord til galdr.md:127, 09 Ordboka/00 Ordboka.md:165)
- Grafikk og stil har stemning for epoken «Sagahallen 1853», men lista over lag i Verda (Same stad gjennom tida) har ingen epoke med det namnet eller dei åra (10 Produksjon/02 Grafikk og stil.md:128, 06 Verda/00 Verda.md:118)
- Samspelet «Gje han ord» står i figurfana, men ikkje i den samla lista i Grunnsystemet (05 Mekanikk/04 Figurar Collett til jotunen.md:543)
- Samspelet «Salme og bøn» står i figurfana, men ikkje i den samla lista i Grunnsystemet (05 Mekanikk/04 Figurar Collett til jotunen.md:545)
- Samspelet «Ord og joik» står i figurfana, men ikkje i den samla lista i Grunnsystemet (05 Mekanikk/04 Figurar Collett til jotunen.md:546)
- Oversikta i Manus seier 198 scener i hovudhistoria, men fanene har 209 overskrifter «Scene». del 2: 28 i oversikta, 29 overskrifter «Scene» i fana (mellom dei s2_24b); del 5: 29 i oversikta, 31 overskrifter «Scene» i fana (mellom dei s5_5b, s5_12b, s5_12c, s5_13b); del 6: 22 i oversikta, 25 overskrifter «Scene» i fana (mellom dei s6_7b, s6_19b, s6_19c); del 7: 32 i oversikta, 37 overskrifter «Scene» i fana (mellom dei s7_7b, s7_9b, s7_9c, s7_14b, s7_17b) (04 Manus/00 Manus.md:5)
- Oversikta i Manus seier 84 oppdrag og 32 samtalar, skriptet fann 93 oppdrag og 32 samtalar (04 Manus/00 Manus.md:5)

## Merknader

- Fargane og teikna til lydfamiliane står ikkje i dokumentet (Grafikk og stil har dei ikkje). Fargane finst i prototypen (FAMILIAR i data.js) og høyrer heime i data/hand/ord/familiar.json. Felta farge og teikn er null til då
- Oppslagsordet «ør» står 2 gonger (1.37, 5.39). Det første har ID-en or, dei andre har tal etter
- Feltet hove_merke er null på alle oppslag. Dokumentet har inga liste over tydingsmerke, og Høvesbonus-kolonnen er fri tekst, så merka kan ikkje lesast sikkert
- Feltet felt (bruk utanfor kamp) er null på alle oppslag. Ordlistene har ingen kolonne for det
- Familien til kvar form (former[].fam) er rekna ut med regelrekkja i Magisystemet. Feltet fam på oppslaget er familien som står i ordlista
- Feltet god (sann eller usann) er null på alle statusar. Dokumentet deler ikkje statusane i gode og vonde. Feltet ikon er null av same grunn
- Tida T1 til T4 på kvar epoke er sett etter åra i tabellen Tidene i Varer og kister. Etter oppgjeret og Epilogen har fått T4, fordi T4 er «1850 til 1853 og seinare»
- Felta portrett og kartfigur (filnamn) er null på alle figurar. Dokumentet har ingen filnamn. Prototypen har dei i PORTRETT og U i data.js
- Ressursen til figurane er lesen frå setningar som «Ekte er ein målar frå 0 til 5». Ikonet står ikkje i dokumentet og er null
- Scenene i sideoppdraga har ID-en til oppdraget og eit løpenummer (S1_1_1). I S2 står nummeret i manus (S2.1.1 blir S2_1_1). Samtalane undervegs har ID-ar som S1_samtale_1
- Flagga står ikkje med namn i dokumentet. Skriptet lagar eitt flagg per val i manus (<scene>_val, med bokstavane som verdiar) og les tilvisingar som «val B i S1.28» eller «1.17, val B» i manus, sideoppdrag og kartfanene. Standardverdien er null for alle
