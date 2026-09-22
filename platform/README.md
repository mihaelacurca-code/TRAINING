# Redută Cyber Range — demo funcțional

Platforma efectivă, construită după `../design/design-experience-blueprint.md` și `../design/ui-design-system.md`, cu conținutul sectorial real din `../prompts/sectors/01-health.md`.

Un singur fișier: `index.html`. Fără build, fără dependențe, fără back-end. Se deschide direct în browser.

## Ce funcționează

| Secțiune | Stare |
|---|---|
| **Mission Control** | Scor de readiness calculat, semnale legate de KPI reali, misiuni care se schimbă pe rol |
| **Threat Landscape** | Cele 7 amenințări sectoriale pe hartă probabilitate × impact, cu tactici MITRE ATT&CK și indicatori timpurii; matricea de active critice |
| **Simulation Lab** | Scenariul de ransomware, 6 decizii sub ceas, consecințe pe 4 axe, jurnal de decizii, debrief care trimite către instrumentele care închid lacuna |
| **Readiness** | Matricea de maturitate 16 domenii × 6 niveluri, cu nivel actual și țintă; indicatori cu formule |
| **Toolkit Vault** | Cele 16 instrumente, cu stare care intră în scorul de readiness |
| **Compliance Navigator** | Maparea actelor, cu separarea strictă legal / standard / bună practică |

**Bucla completă a produsului este implementată:** deciziile din simulare mișcă cele patru axe → axa cea mai slabă determină instrumentele recomandate → starea instrumentelor intră înapoi în scorul de readiness. Asta este logica `ASSESS → TRAIN → SIMULATE → re-măsurare` din varianta C.

## Ce este demonstrativ

- **Un singur sector și un singur scenariu.** Sănătate, scenariul 1 din 3. Celelalte nouă sectoare din bibliotecă au conținutul scris, dar nu sunt încă încărcate în platformă.
- **Instrumentele se pot doar marca**, nu completa. În produsul complet fiecare se completează în interfață și se exportă.
- **Scorurile de maturitate sunt date de exemplu** pentru o clinică de 90 de angajați, nu rezultatul unei evaluări reale.
- **Progresul se păstrează doar în browserul vizitatorului** (`localStorage`), nu pe server și nu între dispozitive.

## Rolul în bibliotecă

Prompturile din `../prompts/` descriu platforma. Acesta este un exemplar construit: arată ce anume produce briefing-ul și stabilește ștacheta vizuală și de interacțiune pentru orice implementare ulterioară.

## Accesibilitate

Contrast WCAG 2.2 AA inclusiv pe accente · informația nu depinde niciodată doar de culoare (fiecare stare are și formă) · navigare completă la tastatură, inclusiv pe harta de amenințări · `prefers-reduced-motion` respectat · ceasul de decizie poate fi oprit oricând, ca presiunea de timp să nu devină barieră · fără scroll orizontal la 400px, tabelele au containerul lor.
