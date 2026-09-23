# DESIGN EXPERIENCE BLUEPRINT

Brief-ul de design pentru platformă: futurist, imersiv, memorabil — dar operațional, nu decorativ.
Se folosește ca anexă la `prompts/01-master-prompt-platform.md` sau ca prompt de sine stătător pentru generarea de UI.

---

## 1. Design philosophy

**Nu un LMS. Un centru de comandă pentru reziliență.**

Platforma nu prezintă conținut; ea pune utilizatorul într-o poziție operațională. Fiecare ecran răspunde la una dintre întrebările: *unde sunt? ce se întâmplă? ce trebuie să decid? ce am de făcut mai departe?*

Cinci reguli care rezolvă orice dispută de design:

1. **Claritatea operațională bate spectacolul.** Dacă un efect vizual încetinește o decizie, efectul dispare.
2. **Tensiunea este informație.** Alerta, riscul și presiunea de timp se resimt vizual, pentru că așa se resimt și în realitate.
3. **Progresul este capacitate, nu punctaj.** Nu bifezi lecții, îți construiești readiness.
4. **Fiecare vizual justifică o decizie.** Dacă nu ajută la înțelegere sau la alegere, nu intră în interfață.
5. **Fără infantilizare.** Publicul conduce firme și gestionează incidente reale. Tonul este de instrument profesional.

---

## 2. Metafore de interfață

| Metaforă | Unde apare | Ce comunică |
|---|---|---|
| **Mission Control** | Home / dashboard principal | „Ai o imagine completă a situației tale." |
| **Cyber Range / Simulation Lab** | Scenarii, tabletop | „Aici se exersează sub presiune, fără consecințe reale." |
| **Threat Horizon** | Threat landscape sectorial | „Amenințările sunt un peisaj, nu o listă." |
| **Readiness Core** | Scor de pregătire, maturitate | „Reziliența este o stare măsurabilă, nu o opinie." |
| **Vault** | Toolkit | „Instrumentele sunt bunuri, nu atașamente." |
| **Navigator** | Compliance | „Conformitatea este un traseu, nu un dosar." |
| **War Room** | Incident response center | „Aici se decide, nu se studiază." |

Metaforele nu se amestecă pe același ecran. Un ecran, o metaforă dominantă.

---

## 3. Visual language

### Bază
Fundal dark profund (antracit / midnight blue / graphite), cu adâncime construită din straturi, nu din umbre grele. Senzația țintă: **sticlă suspendată peste un spațiu adânc**.

### Straturi (z-depth)
```
Strat 0 — Deep space      fundalul, grid subtil, gradient radial lent
Strat 1 — Surface         panouri glassmorphic, blur controlat, border 1px luminos
Strat 2 — Focus           cardul/panoul activ, glow de accent, elevație
Strat 3 — Overlay         comandă rapidă, inject-uri, alerte critice, modale
Strat 4 — Signal          alerte de nivel critic; singurul strat care poate întrerupe
```

### Lumină
Lumina este semantică, nu decorativă:
- **cyan / electric blue** — informație, navigație, stare normală
- **teal** — confirmare, control implementat, progres
- **violet** — simulare, scenariu activ, mod exercițiu
- **amber** — risc, atenție, decizie în așteptare
- **orange / roșu controlat** — alertă, incident activ, breșă

Glow-ul semnalează **stare**, nu importanță estetică. Un element care strălucește fără motiv este un bug de design.

### Mișcare
Cinematică, dar scurtă. Tranzițiile spun ceva: intrarea într-un scenariu „coboară" în spațiu; ieșirea „urcă"; un inject „intră lateral" ca o întrerupere reală. Durată: 180–320 ms pentru UI, până la 600 ms pentru tranziții de context. Totul respectă `prefers-reduced-motion`.

### Profunzime 3D / pseudo-3D
Permis pentru: harta de amenințări, graful de dependențe supply chain, orbita de progres, vizualizarea maturității. Interzis pentru: formulare, tabele, checklist-uri, conținut de citit.

---

## 4. UX principles

1. **Orientare în 3 secunde.** Orice ecran răspunde imediat la: unde sunt, ce văd, ce urmează.
2. **Un singur next best action.** Fiecare ecran propune explicit următorul pas relevant pentru rol.
3. **Rolul definește platforma.** Managerul, administratorul IT și angajatul non-tehnic văd sisteme de navigație diferite, nu același meniu cu permisiuni diferite.
4. **Decizia înaintea explicației.** În simulare, utilizatorul decide întâi și primește explicația după — inclusiv consecințele deciziei greșite.
5. **Nicio fundătură.** Fiecare rezultat, scor sau finalizare duce într-o acțiune: un template, un exercițiu, un plan.
6. **Timpul este vizibil.** În scenarii și incidente, presiunea de timp se afișează permanent.
7. **Ieșire demnă.** Utilizatorul poate întrerupe orice simulare fără să piardă progresul și fără ton moralizator.
8. **Progres portabil.** Orice rezultat poate deveni document exportabil pentru management sau auditor.

---

## 5. Emotional arc

Designul urmărește un arc deliberat pe parcursul utilizării:

```
Curiozitate  →  Conștientizare  →  Tensiune  →  Control  →  Competență  →  Încredere
 (onboarding)    (threat map)     (scenariu)  (răspuns)   (debrief)    (readiness)
```

Tensiunea este permisă doar în simulare și doar temporar. Platforma nu culpabilizează și nu speculează frica: după fiecare moment de tensiune urmează obligatoriu un moment de control (debrief, plan, instrument concret).

---

## 6. Gamification — serioasă, discretă

**Da:** readiness score, niveluri de maturitate, misiuni finalizate, badge-uri de capabilitate („Incident Commander — Level 2"), streak de exerciții de echipă, comparație anonimizată cu sectorul.

**Nu:** avataruri jucăușe, confetti, clasamente publice între colegi, puncte fără semnificație operațională, mascote, sunete de recompensă.

Testul: *ar putea acest element să apară într-un raport către consiliul de administrație fără să scadă credibilitatea?* Dacă nu, iese.

---

## 7. Accessibility

Non-negociabil, chiar și într-o interfață dark și cinematică:

- Contrast minim **4.5:1** pentru text normal, **3:1** pentru text mare și componente UI (WCAG 2.2 AA).
- **Culoarea nu poartă niciodată singură informația.** Fiecare stare are și formă, icon sau etichetă.
- Focus vizibil pe toate elementele interactive, cu contur de minimum 2px și contrast 3:1.
- Navigare completă la tastatură, inclusiv în simulări și tabletop.
- `prefers-reduced-motion` dezactivează parallax, glow pulsatoriu și tranziții de profunzime.
- Temporizatoarele din scenarii pot fi extinse sau oprite; presiunea de timp nu devine barieră de accesibilitate.
- Text minim 16px pentru conținut de curs; fără text gri deschis pe gri închis.
- Vizualizările complexe (hărți, grafuri) au întotdeauna o alternativă tabelară.
- Suport pentru screen readers pe fluxurile de învățare și evaluare, cu `aria-live` pentru inject-uri și alerte.

---

## 8. Responsive behavior

| Breakpoint | Comportament |
|---|---|
| `≥1440px` — Command | Layout complet: multi-panel, hărți 3D, timeline extins, comandă rapidă |
| `1024–1439px` — Operator | Panouri colapsabile, vizualizări simplificate, timeline compact |
| `768–1023px` — Field | Single-column, hărțile devin liste prioritizate, simulările păstrează doar decizia și contextul |
| `<768px` — Mobile | Consum și micro-learning: lecții scurte, checklist-uri, notificări, răspuns rapid la inject-uri. Fără tabletop complet, fără laborator tehnic |

Principiu: pe ecran mic nu se comprimă interfața, ci se **schimbă sarcina**.

---

## 9. Ce ar strica designul

Lista de lucruri care anulează conceptul, oricât de bine ar fi executat restul:

- Fundal dark folosit ca simplă temă, peste un layout de LMS clasic.
- Carduri de curs identice, în grilă, fără ierarhie de risc sau relevanță.
- Glow și neon aplicate uniform, fără semantică.
- Dashboard-uri cu grafice care nu determină nicio decizie.
- Conținut de citit așezat peste imagini în mișcare.
- Termeni tehnici afișați fără traducere operațională pentru management.
- Scoruri care nu explică ce anume trebuie făcut ca să crească.
