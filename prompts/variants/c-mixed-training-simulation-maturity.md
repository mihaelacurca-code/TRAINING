# VARIANTA C — Platformă mixtă: training + simulare + evaluare de maturitate

> Overlay peste `../01-master-prompt-platform.md`. Se adaugă **după** promptul master.

---

## OVERLAY

Aplică următoarele constrângeri și accente peste promptul master.

### Ipoteza centrală despre utilizator

Platforma este folosită de organizații mai mature sau de intermediari (consultanți, centre de training, MSP-uri, integratori) care lucrează cu mai mulți clienți. Există cel puțin o persoană cu responsabilitate explicită de securitate. Nevoia nu este doar învățarea, ci **ciclul complet: măsoară → antrenează → testează → re-măsoară**.

### Arhitectura în trei zone

```
        ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
        │  ASSESS      │ ──▶ │  TRAIN       │ ──▶ │  SIMULATE    │
        │  maturitate  │     │  capabilități│     │  sub presiune│
        └──────▲───────┘     └──────────────┘     └──────┬───────┘
               │                                          │
               └──────────── re-măsurare ◀────────────────┘
```

**Regula care ține produsul împreună:** fiecare lacună identificată în ASSESS se leagă de module concrete din TRAIN și de cel puțin un scenariu din SIMULATE; fiecare rezultat din SIMULATE actualizează scorul din ASSESS. Nicio zonă nu există izolat.

### Accente obligatorii

1. **Trasabilitate lacună → intervenție → dovadă.** Pentru fiecare lacună: modulul care o acoperă, exercițiul care o testează, artefactul care dovedește remedierea, data re-evaluării.
2. **Evaluarea de maturitate în două forme:** una rapidă (20–30 de întrebări, 30 de minute, autoevaluare) și una aprofundată (evidence-based, cu cerințe de dovadă per domeniu și criterii de verificare pentru evaluator).
3. **Simulare pe niveluri.** Tabletop discursiv → simulare cu decizii cronometrate → exercițiu tehnic pe artefacte reale (loguri, headere, imagini de disc simulate, capturi de trafic). Fiecare nivel are criterii de promovare.
4. **Multi-tenant.** Consultantul sau centrul de training gestionează mai multe organizații: profiluri separate, comparație între clienți, șabloane reutilizabile, branding minim configurabil.
5. **Evaluator workspace.** Instrumente pentru cel care conduce evaluarea și exercițiul: grile de notare, observație structurată, cronometrare, note pe roluri, generare automată de after-action report.
6. **Re-măsurare programată.** Platforma propune activ momentul următoarei evaluări și arată deltele între cicluri — valoarea reală a produsului este în al doilea ciclu, nu în primul.

### Secțiuni suplimentare ale platformei

| Secțiune | Scop |
|---|---|
| **Assessment Studio** | construirea și rularea evaluărilor de maturitate, cu cerințe de dovadă |
| **Gap-to-Action Engine** | translatarea automată a lacunelor în plan de training și exerciții |
| **Exercise Designer** | construirea de scenarii și inject-uri proprii, pe baza bibliotecii sectoriale |
| **Evaluator Workspace** | grile, observație, notare, after-action report |
| **Portfolio View** | vederea de portofoliu pentru consultanți: toate organizațiile, toate ciclurile |
| **Evidence Locker** | dovezile colectate, versionate, exportabile pentru audit |

### Livrabile suplimentare obligatorii

1. **Maturity Assessment Report** — pe 16 domenii, cu nivel actual, nivel țintă, justificare, dovezi și plan de închidere a decalajului.
2. **Exercise Design Kit** — metodologie de construire a unui scenariu nou: de la obiective de exercițiu la inject-uri și criterii de evaluare.
3. **Capability Progression Map** — traseul unei organizații de la nivelul 1 la nivelul 4, pe fiecare domeniu, cu efort estimat.

### Ce trebuie evitat explicit

- Scoruri de maturitate fără criterii observabile în spate.
- Autoevaluare prezentată ca echivalentă cu evaluare bazată pe dovezi — marchează clar diferența în orice raport.
- Exerciții tehnice care necesită infrastructură pe care clientul-tip nu o poate ridica; oferă alternativă rulabilă local.
