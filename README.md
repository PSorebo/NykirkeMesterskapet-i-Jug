# JUG Arena – Rafle/Jug-turnering

Første versjon av resultatregistrering og storskjermvisning.

## Start
Åpne `index.html` i en nettleser, eller legg alle filene i roten av et GitHub-repository og aktiver **Settings → Pages → Deploy from a branch → main / root**.

## Bruk
1. Kontroller deltakerlisten under **Deltakere** (40 navn fra aprilturneringen ligger inne).
2. Under **Bordtrekning** trekker du hovedrunde 1, 2 og 3 hver for seg.
3. Under **Registrer resultater** klikker du 1–5 på spillerne ved hvert bord. Grønn markering betyr valgt plassering.
4. Etter alle tre hovedrunder trekkes A- og B-sluttspill (20 i hver, 4 bord à 5). Hver klasse spiller to runder.
5. **Finalebord** viser de fem beste når de to sluttspillrundene er fullført. A er rangert etter poeng i hovedrunde + A-sluttspill; B etter B-sluttspillet alene.
6. **Storskjerm** kan vises i egen fane på samme PC. Bytt mellom visninger med pilene, og velg fullskjerm.
7. Ta **backup** under Innstillinger etter hver runde.

## Poeng og rangering
Lavest poengsum er best. Ved likhet gjelder flest 1.-plasser, deretter flest 2.-plasser, osv. Hvis to fortsatt er helt like akkurat på kvalifiseringsgrensen, krever det en avgjørelse fra arrangøren.

## Viktig om lagring
Data lagres i nettleserens `localStorage`. Flere faner på **samme nettsted og nettleserprofil** synkroniserer via BroadcastChannel. Ulike maskiner/mobiler synkroniserer **ikke** med hverandre. Å slette nettleserdata kan slette turneringen. GitHub Pages er kun hosting, ikke en database. Neste versjon kan bruke for eksempel Supabase for delte live-resultater og arrangørinnlogging.

## Merk
Bordtrekningene er tilfeldige. Versjon 1 forsøker ikke å minimere gjentatte motstandere. Fullstendig uavgjort over grensen må avgjøres av arrangøren.

## Oppdatering 1.1 (26. oktober 2026)

- Deltakere uten registrerte resultater markeres som «VENTER» og får ikke 0 poeng som en ledende poengsum.
- Poeng og resultatlister merkes som foreløpige underveis.
- A/B-kvalifisering bekreftes først når hele hovedrunden er ferdig.
- Storskjermen viser resultatframdrift for hver hovedrunde.
- Ved fullstendig poeng- og plasseringslikhet akkurat mellom 20. og 21. plass sperres automatisk sluttspilltrekning. Arrangøren må gjennomføre en ekstra avgjørelse; egen funksjon for å registrere denne kommer i senere versjon.

**Oppdatering av eksisterende installasjon:** Ta først en JSON-sikkerhetskopi i «Innstillinger / backup». Pakk ut den nye ZIP-filen og erstatt tidligere nettsidefiler med de nye. Ved samme adresse/opprinnelse i nettleseren forsøker siden å fortsette på eksisterende lokale data. Behold uansett JSON-sikkerhetskopien.


## Nytt i v1.2
- Storskjerm bytter automatisk visning hvert 15. sekund (topp 10, plass 11–20, 21–30, 31–40, A/B-grense og bord; etter hovedrunde også A/B-sluttspill).
- Plassendringer vises med opp/ned-piler og antall plasser etter minst to **fullførte** hovedrunder. Sammenligningen er mot forrige fullførte hovedrunde, så delvise resultater gir ikke misvisende piler.
- A/B-grensen vises kun etter tre fullførte hovedrunder. Visningene kan også skiftes med pilknapper.
- Eksisterende lokal lagring bruker fortsatt samme nøkkel, så data fra v1.1 beholdes i samme nettleser/opprinnelse. Ta likevel sikkerhetskopi før oppgradering.


## Oppdatering v1.3
Storskjermens hovedtittel er endret fra JUG ARENA til NykirkeMesterskapet i Jug. Øvrige funksjoner og lokal lagringsnøkkel er uendret.


## Versjon 1.4: mesterskapsvisning
- Automatisk intro med pokalplakat, Hall of Fame og egen finalistvisning inngår nå i skjermrotasjonen (15 sekunder per visning).
- Tidligere vinnere er hentet fra brukerens historikkplakat: 2024 Camilla Skovly; 2024 Ivar Lundstad; 2025 Ole Andreassen; 2025 Trond Anders Solberg; 2026 Vidar Bugge Hansen.
- Finalesiden har fått en pokalbanner. Registrerte finaleplasseringer vises med vinner i storskjermens finalevisning.
- Beholdt lokal lagringsnøkkel `jug-arena-v1` for kompatibilitet. Bruk sikkerhetskopi før oppdatering.
- Bilder lagret lokalt i `assets/`, og må ligge ved siden av nettsidens øvrige filer ved opplasting til GitHub Pages.

## Versjon 1.5 – 52 deltakere
- Legg inn de 52 nye navnene via Deltakere (én per linje). Dette nullstiller eksisterende testresultater.
- I hver hovedrunde fordeles 52 på 10 bord: åtte bord med fem og to bord med seks.
- På et seksmannsbord får både de to siste 5 poeng. Registrer begge med knappen «5». Andre plasseringer brukes nøyaktig én gang.
- Etter tre runder går de 26 beste til A, resten (26) til B. Hvert sluttspill har fem bord: fire med fem og ett med seks.
- Ved poenglikhet teller flest 1.-plasser, så flest 2.-plasser osv. Helt identiske resultater på grensen avgjøres av arrangøren.
- Viktig: Ta sikkerhetskopi før du erstatter deltakerlisten.


## Deltakerliste – oktober 2026
Dette er en foreløpig import med 48 av forventede 52 navn. FIRE DELTAKERE MANGLER. Avklar disse før trekning. Denne versjonen har en egen lagringsnøkkel for å unngå at resultatene fra apriltesten overstyrer deltakerne. Eksporter gammel backup før bytte.
