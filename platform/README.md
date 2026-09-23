# Cyber-Bridge Range

Platformă bilingvă (RO/EN) de training și simulare pentru **toate cele zece sectoare** din bibliotecă, construită după `../design/design-experience-blueprint.md` și `../design/ui-design-system.md`, cu conținutul sectorial real din `../prompts/sectors/`.

`index.html` plus patru fișiere de date în `data/`. Fără build, fără dependențe, fără back-end.

## Atmosferă per sector

Accentul UI rămâne constant, ca semantica risc/alertă să nu se strice. Se schimbă **atmosfera**: fiecare sector are o semnătură proprie de mișcare în fundal — puls de monitor la sănătate, flux liniar la transport, rețea cu impulsuri de curent la energie, ritm mecanic la producție, ticker rapid la finanțe, unde de trafic la retail, mesh la servicii digitale, derivă lentă la turism, foi care cad la servicii profesionale, grilă structurată la administrație. În timpul simulării, fundalul escaladează spre roșu pe măsură ce scenariul avansează: tensiunea este informație, nu decor. Totul se oprește la `prefers-reduced-motion`.

## Ce funcționează

| Secțiune | Stare |
|---|---|
| **Mission Control** | Scor de readiness calculat, semnale legate de KPI reali, misiuni generate din decalajele reale de maturitate ale sectorului |
| **Sectoare** | Toate cele zece, cu scorul fiecăruia și încadrarea NIS2 orientativă |
| **Threat Landscape** | 6-8 amenințări per sector pe hartă probabilitate × impact, cu tactici MITRE ATT&CK și indicatori timpurii; matricea de active critice |
| **Simulation Lab** | **Trei scenarii per sector** — incident tehnic, lanț de aprovizionare, criză și continuitate — cu decizii sub ceas, consecințe pe 4 axe (prima axă diferă per sector), jurnal de decizii și debrief care recomandă instrumentele care acoperă axa cea mai slabă |
| **Readiness** | Matricea de maturitate 16 domenii × 6 niveluri, cu nivel actual și țintă; indicatori cu formule |
| **Toolkit Vault** | 18 instrumente per sector, **completabile efectiv**: tabele cu rânduri, formulare și liste de verificare, fiecare cu schema lui. Se salvează automat și se exportă (`.csv` pentru tabele, `.md` pentru restul). Starea intră în scorul de readiness |
| **Compliance Navigator** | Maparea actelor, cu separarea strictă legal / standard / bună practică |

**Bucla completă a produsului este implementată:** deciziile din simulare mișcă cele patru axe → axa cea mai slabă determină instrumentele recomandate → starea instrumentelor intră înapoi în scorul de readiness. Asta este logica `ASSESS → TRAIN → SIMULATE → re-măsurare` din varianta C.

## Unde se păstrează datele

Două straturi distincte, deliberat:

- **Preferințele de vizualizare** — limbă, rol, sector curent, progresul prin scenariu — stau în `localStorage`, deci sunt ale fiecărui vizitator și nu pleacă nicăieri.
- **Instrumentele completate** stau în baza de date partajată a artifactului (capabilitatea `db`), pentru că exact asta sunt: registrul de active al organizației, planul de răspuns, chestionarul de furnizor. Mai multe persoane le completează împreună, iar conținutul supraviețuiește republicărilor.

> **Atenție la partajare.** Conținutul completat este vizibil oricui poate deschide pagina. Dacă artifactul este partajat prin link public, nu completa în el date reale ale unei organizații. Pentru uz real, restrânge partajarea din meniul Share al paginii.

Dacă stocarea partajată nu este disponibilă în vizualizarea curentă, platforma revine automat la `localStorage` și spune asta în interfață.

## Ce rămâne demonstrativ

- **Scorurile de maturitate sunt date de exemplu** pentru profilul de organizație afișat, nu rezultatul unei evaluări reale.
- **Exportul depinde de vizualizare**: dacă platforma nu poate oferi fișierul, spune asta în loc să eșueze tăcut.
- Conținutul juridic rămâne de verificat în surse oficiale înainte de orice livrare comercială, ca peste tot în bibliotecă.

## Rolul în bibliotecă

Prompturile din `../prompts/` descriu platforma. Acesta este un exemplar construit: arată ce anume produce briefing-ul și stabilește ștacheta vizuală și de interacțiune pentru orice implementare ulterioară.

## Accesibilitate

Contrast WCAG 2.2 AA inclusiv pe accente · informația nu depinde niciodată doar de culoare (fiecare stare are și formă) · navigare completă la tastatură, inclusiv pe harta de amenințări · `prefers-reduced-motion` respectat · ceasul de decizie poate fi oprit oricând, ca presiunea de timp să nu devină barieră · fără scroll orizontal la 400px, tabelele au containerul lor.
