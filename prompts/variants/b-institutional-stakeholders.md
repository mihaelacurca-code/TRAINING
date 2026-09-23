# VARIANTA B — Platformă pentru stakeholderi instituționali și autorități

> Overlay peste `../01-master-prompt-platform.md`. Se adaugă **după** promptul master.

---

## OVERLAY

Aplică următoarele constrângeri și accente peste promptul master.

### Ipoteza centrală despre utilizator

Utilizatorul nu este o singură organizație, ci o **entitate care coordonează, supraveghează sau sprijină un sector**: autoritate competentă, instituție publică, CSIRT sectorial, asociație patronală sau profesională, cluster, agenție de dezvoltare. Interesul principal nu este doar propria reziliență, ci **nivelul de pregătire al populației de organizații** pe care o coordonează.

**Consecință de design:** platforma trebuie să opereze la două niveluri simultan — organizație individuală și agregat sectorial.

### Accente obligatorii

1. **Vedere agregată.** Readiness Dashboard are un nivel „sector": distribuția nivelurilor de maturitate, domeniile cele mai slabe, evoluția în timp, comparație între subsectoare. Datele individuale rămân anonimizate în vederea agregată.
2. **Exercițiu sectorial multi-organizație.** Tabletop-ul suportă mai multe organizații simultan, cu roluri distincte: operatori, furnizor comun, autoritate, CSIRT, presă. Include cel puțin un scenariu în care **un singur furnizor comun cade** și afectează mai mulți operatori.
3. **Fluxul de notificare și raportare.** Modelează explicit traseul unei notificări de incident dinspre organizație către autoritate: cine notifică, în ce termen, în ce format, ce se întâmplă mai departe, ce feedback primește organizația. Include și perspectiva autorității: triaj, corelare între raportări, identificarea unui incident sistemic.
4. **Distribuția de conținut.** Autoritatea trebuie să poată emite către sector: alerte, ghiduri, campanii de exerciții, cerințe de raportare. Platforma include o zonă de **publicare coordonată**.
5. **Rigoare juridică maximă.** Orice afirmație privind obligații se marchează cu actul normativ, articolul și data versiunii consultate. Separarea legal / standard / bună practică este strictă. Acolo unde interpretarea este neclară sau depinde de ghidurile autorității naționale, spune explicit că este o zonă de interpretare și nu propune o concluzie fermă.
6. **Neutralitate.** Fără recomandări de produse comerciale nominalizate. Categoriile de soluții se descriu funcțional; instrumentele open-source pot fi numite.

### Secțiuni suplimentare ale platformei

| Secțiune | Scop |
|---|---|
| **Sector Readiness Observatory** | starea agregată a sectorului, tendințe, zone critice |
| **Exercise Coordination** | planificarea, lansarea și evaluarea exercițiilor sectoriale |
| **Advisory & Alert Desk** | emiterea și urmărirea alertelor și ghidurilor către sector |
| **Reporting Console** | fluxul de notificări de incident, triaj, corelare |
| **Capacity Building Programme** | programe de sprijin pentru organizațiile cu maturitate scăzută |

### Livrabile suplimentare obligatorii

1. **Sector Readiness Report** — raport periodic, agregat, cu metodologie explicită de calcul și limitări declarate.
2. **Exercise After-Action Report** — șablon de raport post-exercițiu sectorial, cu constatări, lacune sistemice și recomandări.
3. **Model de fluxuri de escaladare** între organizație, autoritate competentă și CSIRT, cu termene și responsabili.

### Ce trebuie evitat explicit

- Prezentarea unei interpretări juridice proprii ca fiind poziția autorității.
- Agregare care permite reidentificarea unei organizații mici dintr-un subsector cu puțini membri — definește un prag minim de agregare.
- Metrici de sector care creează stimulent pentru sub-raportarea incidentelor.
