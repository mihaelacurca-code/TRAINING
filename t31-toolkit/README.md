# CYBER-BRIDGE — T3.1 — Toolkit de tracking și monitoring al conformității

`index.html` este un singur fișier, fără server și fără instalare. Deschide-l în orice browser. Fonturile vin de la Google Fonts; fără rețea, pagina folosește fonturile sistemului și funcționează la fel.

Pornește de la demonstratorul de referință T3.1 (DNSC), păstrat neschimbat în `original/`. Păstrează modelul normativ: 130 de cerințe atomice, cinci stări și nicio notă agregată. Îl transformă dintr-o prezentare statică într-un instrument de lucru, în identitatea vizuală cyber-bridge.eu, cu cei cinci piloți ai proiectului.

## Ce s-a schimbat față de demonstrator

| Demonstrator (original) | Toolkit |
|---|---|
| Opt ecrane statice, generate o singură dată | Zece ecrane care recalculează tot la fiecare modificare |
| O singură organizație fictivă | **Cinci piloți** (energie, software, administrație publică, law enforcement, IoT) + exemplul fictiv EnergyGate, cu comutare dintr-un meniu |
| Profilul de aplicabilitate doar afișat | Profil editabil: rolurile, clasificarea și alinierea voluntară recalculează imediat cerințele angajate, cu motivul fiecărei excluderi |
| Evaluarea nu se putea modifica | **Tracker**: stare, dovadă, responsabil, termen, observație și istoric pentru fiecare cerință |
| Registrul de gap-uri: toate cele 123 de intrări cu „Compliance Officer / 30 days” | Priorități P1–P3, responsabil și termen editabile, depășiri calculate, export CSV și OSCAL POA&M |
| Cronologie fixă, evaluată la o dată trecută | **Ceasuri de raportare live**: înregistrezi incidentul, apar termenele NIS2 Art. 23 / CRA Art. 14 cu numărătoare inversă; înregistrezi transmiterea și conținutul ei |
| Rezultatele parsării documentelor erau precalculate | **Parsare reală în browser**: CycloneDX, SPDX, VEX, CSAF 2.0, raport de testare. Poți încărca fișiere proprii |
| Impactul schimbărilor calculat pe organizații fictive | Impactul calculat pe profilurile piloților și pe evaluările înregistrate. Buton „Flag for re-assessment” care marchează rândurile în tracker |
| — | Export/import al stării complete, CSV, OSCAL assessment-results |

## Piloții

Proiectul are cinci piloți în sectoarele energie, software, administrație publică, law enforcement și IoT. Numele partenerilor **nu sunt presupuse**: fiecare card de pilot are un câmp în care se completează organizația. Rolurile sunt ipoteze de lucru (`source/pilots.json`) și trebuie confirmate cu pilotul și cu ENC:

| Pilot | Rol ipotetic | Ce validează |
|---|---|---|
| Energie | entitate esențială (NIS2 Anexa I) | ceasurile Art. 23, lanțul de aprovizionare OT |
| Software | producător (CRA) | Art. 14, aplicabil din 11.09.2026; SBOM și CSAF ca dovezi |
| Administrație publică | entitate esențială (Anexa I, sector 10, prin transpunere) | guvernanță, instruire, controlul accesului |
| Law enforcement | niciunul: NIS2 Art. 2(7) îl exclude | motorul de aplicabilitate arată *de ce* nu se aplică nimic; urmărire în aliniere voluntară |
| IoT | producător + entitate importantă (Anexa II, sector 5) | CRA Anexa I Partea I; ambele regimuri pe un singur incident |

## Construire

```
pip install openpyxl
python3 tools/extract_worked_example.py   # original/ -> source/worked-example.json
python3 tools/build.py                    # source/ + tools/app.* -> index.html
```

Catalogul nu se scrie de mână în pagină: fiecare cerință vine din `source/registru-cerinte.xlsx`. Identitatea vizuală urmează `../platform/theme.css` (albastrul #2563EB, grila de fundal, titlurile Montserrat cu bara scurtă), iar logo-ul este cel oficial din `../platform/logo.webp`. Pagina are și temă întunecată, care urmează setarea sistemului.

## Neconcordanțe găsite în demonstratorul original

De corectat în pipeline-ul DNSC. Toolkit-ul le evită, pentru că recalculează totul din aceleași date.

1. **Două evaluări diferite, ambele prezentate ca rezultat.** Ecranul *Assessment* arată 3 satisfăcute / 117 dovezi insuficiente; tabelul „Resulting assessment” de pe ecranul *Artefact ingestion* și README-ul arată ~35 / 77. Ecranul Assessment pare rulat fără atestări.
2. **Tabelul „Resulting assessment — CRA Annex I, Part II”** conține toate cele 117 cerințe, inclusiv NIS2 și Partea I.
3. **Acoperirea din Source register** (NIS2 „6 requirements”, CRA „14”) nu corespunde catalogului (55 și 75).
4. **Schimbarea la `nis2.art23.4.d`** apare în change set, deși sursa NIS2 este marcată „unchanged”. Aici este atribuită reviziei de catalog v0.3.0.
5. **Registrul de gap-uri** atribuie același responsabil și același termen („Compliance Officer”, „30 days”) tuturor celor 123 de intrări, deci nu poate fi folosit ca plan de acțiune.
6. **Timpul de întârziere:** `cra.art14.4.a` este raportat „3 h over”; transmiterea la 11:00 față de termenul 08:30 înseamnă 2 h 30 min.
7. **„Aegean Port Authority”** are profilul `PRF-RO-ENERGY-EE` (energie, RO), probabil din greșeală.
8. Profilul menționează `cra.anxI.II.6.vex`, care nu există în registru. Documentele VEX sunt parsate, dar nicio cerință din v0.3.0 nu le folosește.

## Unde se păstrează datele

Tot ce se înregistrează rămâne în `localStorage`, în browserul respectiv. Nu pleacă nicăieri și nu se partajează între utilizatori. Pentru predare către CLONE sau pentru arhivare se folosește ecranul **Export**. Pentru uz real, cu mai mulți utilizatori, stocarea trebuie mutată în back-end-ul platformei CYBER-BRIDGE.

## Limite

- Toate enunțurile sunt `DRAFT-VERIFY` / `PENDING-ENC` până la confirmarea pe textul consolidat din EUR-Lex.
- Stratul CIR (UE) 2024/2690 lipsește în continuare. Schimbarea lui este afișată, dar nu se poate propaga.
- Monitorizarea arată ultima rulare înregistrată (adaptorul `snapshot`). Adaptorul EUR-Lex live rămâne în pipeline-ul Python.
- Termenele statutare sunt calculate după textul regulamentelor (24 h / 72 h / o lună / 14 zile de la remediere). Trebuie verificate împreună cu ENC, inclusiv pentru regulile naționale de transpunere.
- Rezultatul este o autoevaluare bazată pe dovezi, nu o constatare a conformității de către DNSC.
