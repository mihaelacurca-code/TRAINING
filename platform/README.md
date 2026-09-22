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
| **Simulation Lab** | Un scenariu propriu fiecărui sector, 4-5 decizii sub ceas, consecințe pe 4 axe (prima axă diferă per sector), jurnal de decizii, debrief care recomandă instrumentele care acoperă axa cea mai slabă |
| **Readiness** | Matricea de maturitate 16 domenii × 6 niveluri, cu nivel actual și țintă; indicatori cu formule |
| **Toolkit Vault** | 18 instrumente per sector: 16 de bază plus două specifice sectorului; starea intră în scorul de readiness |
| **Compliance Navigator** | Maparea actelor, cu separarea strictă legal / standard / bună practică |

**Bucla completă a produsului este implementată:** deciziile din simulare mișcă cele patru axe → axa cea mai slabă determină instrumentele recomandate → starea instrumentelor intră înapoi în scorul de readiness. Asta este logica `ASSESS → TRAIN → SIMULATE → re-măsurare` din varianta C.

## Ce este demonstrativ

- **Un scenariu per sector**, din cele trei pe care le descrie metodologia (tehnic, lanț de aprovizionare, criză).
- **Instrumentele se pot doar marca**, nu completa. În produsul complet fiecare se completează în interfață și se exportă.
- **Scorurile de maturitate sunt date de exemplu** pentru profilul de organizație afișat, nu rezultatul unei evaluări reale.
- **Progresul se păstrează doar în browserul vizitatorului** (`localStorage`), nu pe server și nu între dispozitive.

## Rolul în bibliotecă

Prompturile din `../prompts/` descriu platforma. Acesta este un exemplar construit: arată ce anume produce briefing-ul și stabilește ștacheta vizuală și de interacțiune pentru orice implementare ulterioară.

## Accesibilitate

Contrast WCAG 2.2 AA inclusiv pe accente · informația nu depinde niciodată doar de culoare (fiecare stare are și formă) · navigare completă la tastatură, inclusiv pe harta de amenințări · `prefers-reduced-motion` respectat · ceasul de decizie poate fi oprit oricând, ca presiunea de timp să nu devină barieră · fără scroll orizontal la 400px, tabelele au containerul lor.
