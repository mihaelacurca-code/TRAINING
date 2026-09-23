# Cyber-Bridge Range

Platformă bilingvă (RO/EN) de training și simulare pentru **toate cele zece sectoare** din bibliotecă, construită după `../design/design-experience-blueprint.md` și `../design/ui-design-system.md`, cu conținutul sectorial real din `../prompts/sectors/`.

`index.html` plus patru fișiere de date în `data/`. Fără build, fără dependențe, fără back-end.

## Integrare în cyber-bridge.eu

Identitatea vizuală implicită este cea a site-ului: fundal deschis albastru-rece, motivul de grilă din hero, albastrul de acțiune, titluri grele cu bara scurtă în degrade dedesubt.

**Tot ce ține de brand este în `theme.css`.** Componentele din `index.html` nu conțin nicio culoare sau font literal — folosesc numai variabile. Ca să treci de la valorile citite dintr-o captură la cele oficiale, schimbi blocul BRAND din `theme.css` și nimic altceva.

### Parametri de integrare

| Parametru | Valori | Efect |
|---|---|---|
| `?skin=` | `brand` (implicit), `dark` | Identitatea site-ului sau modul cyber range întunecat |
| `?embed=1` | | Ascunde lockup-ul propriu de brand și strânge spațierea, pentru o pagină gazdă care are deja antet |
| `?lang=` | `ro`, `en` | Limba de pornire |
| `?sector=` | `health`, `transport`, `energy`, `manufacturing`, `finance`, `retail`, `digital`, `tourism`, `professional`, `public` | Sectorul încărcat |
| `?view=` | `mc`, `sectors`, `thr`, `sim`, `mat`, `kit`, `cmp` | Ecranul de pornire |
| `?role=` | `mgmt`, `tech`, `hyg` | Traseul |

Se combină. Exemplu — pagina „Use Cases" poate lega direct peisajul de amenințări din energie, în engleză, fără antetul platformei:

```
…/index.html?embed=1&lang=en&sector=energy&view=thr
```

### Încorporare

```html
<iframe src="…/index.html?embed=1&lang=ro"
        style="width:100%;height:82vh;border:0;border-radius:16px"
        title="Cyber-Bridge Range"
        allow="clipboard-write"></iframe>
```

Platforma se redimensionează singură și nu iese niciodată în scroll orizontal sub 400px.

### Cele două skin-uri

Implicit rulează în identitatea site-ului. Modul **range**, întunecat, rămâne disponibil din comutatorul din bară sau cu `?skin=dark`: pentru Simulation Lab pe proiector și pentru livrarea în sală, unde tensiunea și lizibilitatea sub presiune contează mai mult decât integrarea în pagină.

## Atmosferă per sector

În identitatea site-ului, culoarea de acțiune rămâne albastrul brandului în toate sectoarele, ca platforma să nu-și schimbe identitatea de la un sector la altul. Se schimbă doar **atmosfera** din fundal, peste grila site-ului: fiecare sector are o semnătură proprie de mișcare în fundal — puls de monitor la sănătate, flux liniar la transport, rețea cu impulsuri de curent la energie, ritm mecanic la producție, ticker rapid la finanțe, unde de trafic la retail, mesh la servicii digitale, derivă lentă la turism, foi care cad la servicii profesionale, grilă structurată la administrație. În timpul simulării, fundalul escaladează spre roșu pe măsură ce scenariul avansează: tensiunea este informație, nu decor. Totul se oprește la `prefers-reduced-motion`.

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
| **Facilitator** | Rolul de facilitator din metodologie (Etapa 9), implementat în platformă: explică, ajută la completarea instrumentelor și propune drafturi, fără să dea răspunsul unui inject înainte de decizie |

**Bucla completă a produsului este implementată:** deciziile din simulare mișcă cele patru axe → axa cea mai slabă determină instrumentele recomandate → starea instrumentelor intră înapoi în scorul de readiness. Asta este logica `ASSESS → TRAIN → SIMULATE → re-măsurare` din varianta C.

## Facilitatorul

Metodologia cere, pentru orice tabletop, un **rol de facilitator**. Platforma avea inject-uri, decizii și consecințe, dar nu avea pe nimeni care să conducă exercițiul — iar varianta self-service pentru IMM-uri spune explicit că trebuie să funcționeze fără trainer. Facilitatorul umple exact acest gol.

**Formă.** Nu un chip animat. Design blueprint-ul interzice mascotele și tonul infantil, iar un cap uman stilizat într-un centru de comandă cade în uncanny valley. Este o **prezență**: un nucleu reactiv cu stări vizibile — inactiv, gândește, vorbește, alertă. În timpul unei simulări escaladate trece pe roșu, odată cu fundalul.

**Ce știe.** Sectorul, ecranul curent, decalajele reale de maturitate, indicatorii critici, amenințarea selectată, instrumentul deschis și ce e deja completat în el, momentul din scenariu.

**Regulile care contează.** Sunt în prompt și sunt verificabile:

1. **Nu dă răspunsul înainte de decizie.** Cât timp un inject e nedecis, facilitatorul primește instrucțiune explicită să nu evalueze opțiunile, să nu sugereze care e bună și să nu anticipeze consecința. Reformulează și întreabă ce informație lipsește. După decizie, discută liber.
2. Nu transformă o bună practică în obligație legală.
3. Pentru orice referință legală spune că se verifică în textul în vigoare.
4. Nu presupune CISO, SOC, SIEM sau buget.
5. Scurt — maximum 120 de cuvinte. Un facilitator nu ține prelegeri.

**Ce poate face concret.** Explică o amenințare fără jargon; spune de unde începi dacă ai o singură zi; și, cu instrumentul deschis, **propune un draft** — rânduri sau câmpuri specifice sectorului, care se adaugă la ce ai deja completat și pe care le editezi tu. Draftul nu suprascrie niciodată conținut existent.

**Citire cu voce tare**, opțională, prin sinteza vocală a browserului. Implicit oprită.

**Cost.** Răspunsurile sunt generate pe contul de Claude al vizitatorului, care își dă acordul la prima întrebare. Dacă refuză sau capabilitatea nu e disponibilă, butonul dispare și restul platformei funcționează neschimbat.

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
