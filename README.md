# Cyber Resilience Training Library

Bibliotecă de prompturi profesionale pentru generarea de **programe de training și platforme de simulare în cybersecurity**, cu nucleu metodologic comun și ramuri sectoriale distincte.

Scopul: IMM-urile, organizațiile publice și private și ceilalți stakeholderi să își crească concret nivelul de pregătire, reziliență și capacitate de răspuns — nu prin awareness generic, ci prin scenarii, decizii, exerciții și instrumente operaționale.

---

## Logica bibliotecii

```
                 ┌──────────────────────────────┐
                 │   NUCLEU METODOLOGIC COMUN   │
                 │  (etape, structură, rigoare) │
                 └──────────────┬───────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
   Master Prompt           Master Prompt            Variante
   „Training"              „Platformă"              de produs
   (curs / program)        (produs digital          (A / B / C)
                            + design)
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
   Ramuri sectoriale (10)                      Design Blueprint
   Health, Transport, Energy, ...               + Design System
```

Același nucleu metodologic, dar **scenarii, riscuri, active și obligații diferite** pentru fiecare sector.

---

## Structura repo-ului

| Cale | Ce conține | Când îl folosești |
|---|---|---|
| `prompts/00-master-prompt-training.md` | Master prompt pentru **module de training** sectoriale (20 etape) | Vrei un program de curs: module, scenarii, tabletop, toolkit, trainer guide |
| `prompts/01-master-prompt-platform.md` | Master prompt pentru **platformă de training și simulare** (25 etape, conținut + design integrat) | Vrei conceptul complet de produs digital: arhitectură, UX/UI futurist, conținut, evaluări |
| `prompts/02-input-template.md` | Blocul INPUT de completat + ghid de completare | Înainte de orice rulare |
| `prompts/variants/` | 3 variante de produs (IMM / instituțional / mixt) | Când știi exact tipul de platformă |
| `prompts/sectors/` | 10 ramuri sectoriale, cu INPUT precompletat și brief sectorial | Pentru fiecare sector din bibliotecă |
| `design/design-experience-blueprint.md` | Brief-ul de design futurist și imersiv | Când generezi UX/UI sau treci la implementare vizuală |
| `design/ui-design-system.md` | Design system: tokens, componente, ecrane, motion, accesibilitate | Pentru UI efectiv / front-end |
| `docs/methodology.md` | Explicația nucleului metodologic și a succesiunii etapelor | Pentru a înțelege sau a modifica prompturile |
| `docs/quality-checklist.md` | Checklist de validare a output-ului generat | După fiecare rulare, înainte de livrare |
| `docs/sources.md` | Surse oficiale prioritare și reguli de citare | Pentru verificarea legislației și a statisticilor |
| `platform/` | **Platforma construită** — Cyber-Bridge Range, bilingvă, toate cele 10 sectoare | Ca să vezi ce produce brieful, nu doar cum se cere |

---

## Cum se folosește

1. **Alege ramura**: deschide fișierul sectorului din `prompts/sectors/`.
2. **Completează INPUT-ul**: fiecare fișier sectorial are deja un bloc INPUT precompletat cu ipoteze rezonabile — ajustează-l.
3. **Rulează în doi pași**:
   - Pasul 1 — cere doar **arhitectura** (Etapa 0–6 pentru platformă, Etapa 1–4 pentru training) și logica succesiunii modulelor.
   - Pasul 2 — cere dezvoltarea **modul cu modul**, păstrând consistența.
4. **Validează** output-ul cu `docs/quality-checklist.md`.
5. **Verifică legislația** în sursele din `docs/sources.md` înainte de livrare către client.

> Rularea „dintr-o singură bucată" produce conținut superficial. Prompturile sunt construite explicit pentru livrare etapizată.

---

## Principii ne-negociabile

1. Sector specific, nu awareness generic.
2. Scenario based și risk based.
3. Adaptat IMM-urilor: nu presupune CISO, SOC, SIEM sau buget enterprise.
4. Pentru fiecare recomandare există o alternativă realistă pentru resurse limitate.
5. Distincție clară între **must have / should have / advanced capability**.
6. Distincție clară între **cerință legală / cerință de standard / bună practică recomandată**.
7. Fără statistici, incidente sau obligații legale inventate. Incidentele reale se citează.
8. Simplifică **modul de explicare**, nu complexitatea problemei.

---

## Avertisment privind referințele legale

Prompturile cer modelului să folosească surse oficiale actualizate. Modelele pot totuși produce referințe imprecise.
**Orice referință legală din output-ul generat se verifică manual** în EUR-Lex, la autoritatea națională competentă (în România: DNSC pentru NIS2, ANSPDCP pentru GDPR) și în textele oficiale ale standardelor, înainte de a fi folosită în training livrat comercial sau instituțional.
