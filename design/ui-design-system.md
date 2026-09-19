# UI DESIGN SYSTEM

Specificația de implementare pentru platformă. Se folosește ca input pentru generarea de UI, prototipuri sau front-end.
Conceptul și justificările sunt în `design-experience-blueprint.md`.

---

## 1. Design tokens

### Culoare — bază

| Token | Valoare | Utilizare |
|---|---|---|
| `--bg-deep` | `#05070D` | fundalul cel mai adânc, spațiul din spatele panourilor |
| `--bg-base` | `#0A0E17` | fundal de aplicație |
| `--bg-raised` | `#111726` | panouri, carduri |
| `--bg-overlay` | `#161E30` | modale, drawere, overlay-uri |
| `--surface-glass` | `rgba(17,23,38,0.62)` | panouri glassmorphic (`backdrop-filter: blur(18px)`) |
| `--border-subtle` | `rgba(145,175,220,0.14)` | contur implicit de panou |
| `--border-strong` | `rgba(145,175,220,0.28)` | contur de panou activ |

### Culoare — text

| Token | Valoare | Contrast pe `--bg-base` |
|---|---|---|
| `--text-primary` | `#E8EEF9` | 15.4:1 |
| `--text-secondary` | `#A9B6CC` | 8.1:1 |
| `--text-muted` | `#7C8AA3` | 4.9:1 — minim admis pentru text |
| `--text-inverse` | `#05070D` | pe fundaluri de accent solide |

> Nu folosi text sub `--text-muted`. Dacă un text trebuie „stins" mai mult, el nu trebuie afișat.

### Culoare — semantică

| Token | Valoare | Semnificație | Formă asociată (obligatorie) |
|---|---|---|---|
| `--accent-primary` | `#38E1FF` (cyan) | informație, navigație, stare normală | cerc plin |
| `--accent-secondary` | `#2EE6C4` (teal) | confirmat, implementat, succes | bifă |
| `--accent-sim` | `#9B6BFF` (violet) | simulare / scenariu activ | romb |
| `--signal-warning` | `#FFB547` (amber) | risc, decizie în așteptare | triunghi |
| `--signal-critical` | `#FF6B4A` (orange-red) | incident activ, breșă | octogon |
| `--signal-neutral` | `#7C8AA3` | inactiv, necunoscut, nedeterminat | linie |

**Regulă:** culoarea nu poartă niciodată singură informația. Fiecare stare are culoare **și** formă/icon **și** etichetă text.

### Scala de maturitate (0–5)

`#3A4356` (0 Absent) → `#4E5C7A` (1 Initial) → `#3E7FA8` (2 Basic) → `#2E9FB5` (3 Managed) → `#2EC5A8` (4 Advanced) → `#2EE6C4` (5 Resilient)

Secvențială, monotonă ca luminozitate, distinguibilă în deuteranopie și protanopie.

### Spațiere

Scală de 4px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`
Gutter de panou: 24px desktop, 16px sub 1024px, 16px mobile (fără scroll orizontal).

### Radius

`--r-sm: 6px` (input, tag) · `--r-md: 12px` (card) · `--r-lg: 20px` (panou) · `--r-full: 999px` (pill, progres circular)

### Elevație

Fără umbre negre grele. Elevația se construiește din: contur luminos + blur de fundal + glow de accent difuz.

```
--elev-1: 0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.45)
--elev-2: 0 1px 0 rgba(255,255,255,0.07) inset, 0 16px 48px rgba(0,0,0,0.55)
--elev-focus: 0 0 0 1px var(--accent-primary), 0 0 32px rgba(56,225,255,0.22)
```

---

## 2. Tipografie

| Rol | Familie | Greutate | Dimensiune / line-height |
|---|---|---|---|
| Display | grotesk geometric (ex. Space Grotesk, Chakra Petch) | 600 | 48–64px / 1.1 |
| Heading 1 | idem | 600 | 32px / 1.2 |
| Heading 2 | idem | 600 | 24px / 1.3 |
| Heading 3 | idem | 500 | 18px / 1.4 |
| Body | sans umanist (ex. Inter) | 400 | 16px / 1.6 |
| Body small | idem | 400 | 14px / 1.55 |
| Data / cod / timestamp | mono (ex. JetBrains Mono, IBM Plex Mono) | 400–500 | 13–14px / 1.5 |
| Label / eyebrow | mono, uppercase, `letter-spacing: 0.08em` | 500 | 11–12px |

Conținutul de curs se setează la minimum 16px, lățime maximă de linie 72 de caractere.
Timpii, ID-urile de incident, IOC-urile și valorile numerice folosesc **întotdeauna** mono — cifrele trebuie să fie tabulare.

---

## 3. Component library

### Primitive
Button (primary / secondary / ghost / danger) · Icon button · Input · Select · Textarea · Checkbox · Radio · Toggle · Slider · Tag · Badge · Tooltip · Avatar · Divider · Breadcrumb · Tabs · Accordion · Modal · Drawer · Toast

### Componente de domeniu

| Componentă | Rol | Elemente cheie |
|---|---|---|
| **MissionCard** | unitate de conținut (modul, misiune, exercițiu) | titlu, rol țintă, durată, stare, nivel de risc acoperit, next action |
| **ReadinessRing** | scor de pregătire | inel de progres, scor central, delta față de perioada anterioară, segmente pe domeniu |
| **ThreatMap** | peisajul de amenințări sectorial | noduri de amenințare, legături către active, filtre pe likelihood/impact, alternativă tabelară |
| **AssetGraph** | active critice și dependențe | graf forțat, criticitate prin dimensiune, stare prin culoare+formă |
| **IncidentTimeline** | cronologia unui scenariu | axă T+0…T+72h, markeri de decizie, ramificații, momentul curent |
| **InjectPanel** | livrarea unui inject în tabletop | sursa, mesajul, ceasul, opțiunile de decizie, câmp de justificare |
| **DecisionPrompt** | punct de decizie | context, opțiuni, timp rămas, buton de confirmare, fără hint |
| **ConsequenceReveal** | consecința deciziei | ce s-a întâmplat, de ce, ce ar fi fost alternativa, referință la material |
| **MaturityMatrix** | model de maturitate | 16 domenii × 6 niveluri, celula curentă, celula țintă, criterii observabile la hover |
| **ComplianceMap** | mapare la reglementări | modul × act normativ, marcaj legal/standard/bună practică, stare de acoperire |
| **ToolkitItem** | template descărcabil | nume, scop, format, timp estimat de completare, stare (necompletat/în lucru/finalizat) |
| **KpiTile** | indicator | valoare, unitate, trend, formulă la hover, prag de alertă |
| **RoleSwitch** | schimbare de traseu | management / tehnic / igienă cibernetică |
| **CommandBar** | căutare și acțiune rapidă (`Ctrl/Cmd+K`) | comenzi, navigare, întrebări către asistent |

### Stări obligatorii pentru fiecare componentă
`default · hover · focus-visible · active · disabled · loading · empty · error`

O componentă fără stare `empty` și `error` definită nu este considerată terminată.

---

## 4. Layout și grid

- Grid de 12 coloane, gutter 24px, lățime maximă de conținut 1440px, cu zonă de „respirație" laterală la ecrane mai late.
- **Shell-ul aplicației:** rail de navigație stânga (colapsabil, 72px / 248px), bară de context sus (rol, sector, readiness, command bar), zonă de lucru, panou contextual dreapta (colapsabil, 360px).
- Modul simulare intră în **focus mode**: rail-ul și panourile colapsează, rămân contextul, ceasul și decizia.
- Dashboard-urile folosesc panouri modulare, rearanjabile, cu dimensiuni predefinite (1×1, 2×1, 2×2, 4×2).

---

## 5. Motion

| Interacțiune | Durată | Easing |
|---|---|---|
| Hover / feedback micro | 120 ms | `ease-out` |
| Deschidere panou, tab | 200 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| Tranziție de ecran | 320 ms | idem |
| Intrare în simulare (coborâre în spațiu) | 600 ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Apariție inject (întrerupere laterală) | 240 ms | `ease-out`, cu ușor overshoot |
| Puls de alertă critică | 1600 ms, buclă | `ease-in-out` |

Reguli: nimic nu pulsează permanent în afara stării critice; nicio animație nu blochează input-ul; `prefers-reduced-motion: reduce` elimină parallax, glow pulsatoriu și tranzițiile de profunzime, păstrând doar fade de 120 ms.

---

## 6. Data visualization

1. Fiecare vizualizare răspunde la o singură întrebare, scrisă în titlu ca întrebare sau afirmație, nu ca etichetă („Ce ne-ar opri operarea mâine?", nu „Riscuri").
2. Fiecare vizualizare are alternativă tabelară accesibilă printr-un singur click.
3. Maximum 6 serii categoriale pe un grafic; peste 6, grupează în „alte".
4. Fără axe 3D pentru date cantitative. 3D doar pentru relații spațiale (grafuri, hărți).
5. Culorile de risc respectă exclusiv scala semantică; nu se reutilizează pentru categorii neutre.
6. Fiecare KPI afișează formula la hover și pragul care declanșează atenție.
7. Fără grafic fără acțiune: sub fiecare vizualizare, cel puțin o acțiune propusă.

---

## 7. Ecrane cheie

| Ecran | Purpose | Main blocks | Key interactions | Emotional effect |
|---|---|---|---|---|
| **Mission Control** (home) | orientare în 3 secunde | ReadinessRing, next best action, alerte sectoriale, misiuni în curs, deadline-uri de conformitate | schimbare de rol, intrare în misiune, command bar | control, claritate |
| **Sector Academy** | parcurgerea curriculei | traseu vizual pe module, MissionCards, prerechizite, progres | filtrare pe rol, lansare modul | orientare, progres |
| **Module page** | învățare efectivă | conținut lizibil, exemple sectoriale, „cum face un IMM", exercițiu, quiz | note, marcare, descărcare template | concentrare |
| **Threat Landscape** | înțelegerea peisajului | ThreatMap, AssetGraph, filtre likelihood/impact, fișe de amenințare | selecție nod, comutare tabel, drill-down | conștientizare |
| **Simulation Lab** | decizie sub presiune | IncidentTimeline, DecisionPrompt, ceas, consecințe | alegere, justificare, ramificare | tensiune controlată |
| **Tabletop Interface** | exercițiu de echipă | InjectPanel, roluri, ceas de exercițiu, log de decizii, note facilitator | primire inject, decizie, escaladare | coordonare |
| **Incident Response Center** | operare pe flux | cele 9 etape, responsabili, documente necesare, ceas de notificare legală | avans etapă, generare raport | fermitate |
| **Readiness / Maturity Dashboard** | măsurare | MaturityMatrix, scoruri pe domeniu, țintă, comparație sectorială | setare țintă, plan generat | luciditate |
| **Compliance Navigator** | orientare în obligații | ComplianceMap, filtru legal/standard/bună practică, stare de acoperire | drill către modul, export dovezi | siguranță |
| **Toolkit Vault** | instrumente | ToolkitItems pe categorii, stare de completare, export | completare în platformă, descărcare | utilitate imediată |
| **Management Briefing Room** | decizie executivă | cele 10 întrebări de management, scor, top 3 investiții, raport de o pagină | generare raport board | claritate decizională |
| **Technical Lab** | practică tehnică | exerciții, unelte open-source, date de laborator, validare | rezolvare, verificare | competență |
| **Assessment** | evaluare | întrebări, scenarii, timp, progres | răspuns, revizuire, rezultat + explicații | corectitudine |

---

## 8. Microcopy

**Ton:** clar, încrezător, inteligent, profesionist, uman. Fără jargon inutil, fără marketing, fără dramatizare.

| Context | Exemplu |
|---|---|
| Buton principal | `Intră în scenariu` · `Confirmă decizia` · `Generează planul` |
| Buton secundar | `Vezi contextul` · `Compară cu sectorul` |
| Empty state — toolkit | „Niciun instrument completat încă. Începe cu registrul de active critice — 20 de minute, și devine baza pentru tot restul." |
| Empty state — incidente | „Niciun incident înregistrat. Bine. Folosește timpul acesta ca să exersezi unul." |
| Alertă de risc | „3 sisteme critice nu au backup testat în ultimele 90 de zile." |
| Alertă critică | „Incident activ. Termenul de notificare timpurie expiră în 19:42." |
| Succes | „Plan de răspuns salvat. Trimite-l echipei înainte să ai nevoie de el." |
| Eroare | „Nu am putut salva răspunsul. Datele tale sunt păstrate local — reîncearcă." |
| Onboarding | „Spune-ne ce fel de organizație ești. Restul platformei se așază în jurul acestui răspuns." |
| Prompt de simulare | „Ai 4 minute. Ce faci primul lucru?" |
| Consecință | „Ai izolat serverul. Ai oprit propagarea — și ai oprit și facturarea. Iată ce ar fi presupus alternativa." |
| Progres | „Nivel 2 din 5 la Incident Response. Îți lipsesc două lucruri: un contact de escaladare și un test de restaurare." |

**De evitat:** „Felicitări!", „Ești un erou al securității!", „Oops!", „Se pare că ceva n-a mers bine.", orice exclamație fără informație.

---

## 9. Definition of done pentru un ecran

Un ecran este gata când:

1. Răspunde la „unde sunt / ce văd / ce urmează" fără explicații suplimentare.
2. Are un singur next best action evident.
3. Toate stările componentelor sunt definite, inclusiv `empty` și `error`.
4. Trece contrastul AA, inclusiv pe elementele de accent.
5. Este complet navigabil la tastatură, cu focus vizibil.
6. Funcționează cu `prefers-reduced-motion`.
7. Are un comportament definit pentru fiecare breakpoint, inclusiv schimbarea de sarcină pe mobil.
8. Nicio informație nu depinde exclusiv de culoare.
9. Fiecare vizualizare are alternativă tabelară.
10. Microcopy-ul respectă tonul și nu conține exclamații fără informație.
