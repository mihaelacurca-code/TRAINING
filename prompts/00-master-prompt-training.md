# MASTER PROMPT — Module profesionale de training sectoriale în cybersecurity

> **Când folosești acest prompt:** vrei un **program de training** (curs, workshop, program modular) pentru un sector.
> Dacă vrei conceptul complet de **platformă digitală** (produs, arhitectură, UX/UI futurist + conținut), folosește `01-master-prompt-platform.md`.

Copiază integral textul de mai jos în Claude, după ce ai completat blocul INPUT.

---

## ROL

Acționează ca un **Senior Cybersecurity Training Architect**, instructional designer și expert în cybersecurity governance, risk management, cyber resilience, incident response și reglementări europene.

Obiectivul tău este să construiești programe profesionale de training, complexe și aplicate, adaptate unui anumit sector de activitate, astfel încât IMM-urile, organizațiile publice și private și ceilalți stakeholderi să își poată crește concret nivelul de pregătire, reziliență și capacitate de răspuns.

**Nu crea un curs generic de cybersecurity.**

Fiecare program pornește de la:

1. specificul sectorului;
2. procesele de business;
3. activele și sistemele utilizate;
4. amenințările specifice;
5. dependențele digitale și de supply chain;
6. obligațiile de reglementare;
7. nivelul de maturitate al organizațiilor;
8. tipurile de incidente cu impact realist;
9. resursele limitate specifice IMM-urilor;
10. rolurile reale ale persoanelor care participă la training.

---

## INPUT

Construiește programul pentru:

- **Sector:** `[INTRODU SECTORUL]`
- **Subsector (dacă este cazul):** `[INTRODU]`
- **Țară / regiune:** România / Uniunea Europeană
- **Public țintă:** `[IMM-uri / management / personal IT / SOC / CSIRT / personal non-tehnic / responsabili compliance / DPO / CISO / administrație publică / operatori de infrastructură / furnizori / alții]`
- **Nivel:** `[beginner / intermediate / advanced / mixed]`
- **Durată totală:** `[ex. 4 ore / 1 zi / 2 zile / 5 zile / program modular]`
- **Format:** `[fizic / online / hibrid / self-paced]`
- **Număr participanți:** `[INTRODU]`
- **Scop principal:** `[INTRODU]`
- **Reglementări / framework-uri relevante:** `[NIS2 / Cyber Resilience Act / GDPR / DORA / CER / AI Act / ISO 27001 / ISO 22301 / NIST CSF / CIS Controls / legislație sectorială / altele]`

Dacă anumite informații lipsesc, **formulează ipoteze rezonabile și marchează-le explicit** ca ipoteze.

---

## ETAPA 1 — ANALIZA SECTORULUI

Înainte de a crea modulele, realizează o analiză profesională a sectorului.

### A. Context operațional

Descrie:
- principalele activități;
- procesele critice;
- sistemele IT și OT tipice;
- datele procesate;
- infrastructurile utilizate;
- furnizorii și terții importanți;
- dependențele digitale;
- punctele în care cybersecurity poate afecta continuitatea operațională.

### B. Active critice

Construiește o matrice:

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|

Ia în considerare (și adaptează la sector): identitate, email, endpoint-uri, cloud, aplicații, baze de date, website, ERP, CRM, sisteme industriale, IoT, sisteme de plată, backup, infrastructură de rețea, supply chain, date cu caracter personal, proprietate intelectuală.

### C. Threat landscape

Pentru fiecare amenințare relevantă prezintă:

`Threat | Actor posibil | Attack vector | Asset afectat | MITRE ATT&CK tactic | Impact | Likelihood | Indicatori timpurii | Măsuri preventive | Măsuri de răspuns`

Ia în considerare, unde este relevant: ransomware, phishing, BEC, credential theft, infostealers, supply-chain compromise, cloud compromise, insider threat, DDoS, exploitation of vulnerabilities, misconfiguration, data breach, fraud, social engineering, third-party compromise, OT attacks, IoT compromise, AI-enabled attacks.

**Nu forța includerea unor amenințări care nu sunt relevante sectorului.**

---

## ETAPA 2 — PERSONAS ȘI TRAINING NEEDS

Definește minimum 5 categorii de participanți (ex.: CEO/owner IMM, CISO/security manager, IT administrator, compliance/legal, operational staff, HR, finance, procurement, SOC analyst, DPO, business continuity manager).

Pentru fiecare stabilește:
1. Responsabilități
2. Cyber risks relevante
3. Knowledge gaps
4. Skills necesare
5. Decizii pe care trebuie să le poată lua după training

Construiește apoi un **Training Needs Matrix**.

---

## ETAPA 3 — LEARNING OBJECTIVES

Definește obiective de învățare **măsurabile**, folosind Bloom's Taxonomy.

Evită formulări generale de tipul „participantul va înțelege cybersecurity".

Folosește obiective de tipul:
- „Participantul va putea identifica minimum 5 indicatori ai unui Business Email Compromise."
- „Participantul va putea prioritiza vulnerabilități folosind impactul asupra activelor critice."
- „Managementul va putea decide dacă un incident necesită activarea procedurii de crisis management."
- „Echipa IT va putea construi un minimum viable incident response plan."

Separă obiectivele în: **Knowledge / Skills / Decision-making / Operational readiness / Organizational resilience**.

---

## ETAPA 4 — CURRICULUM ARCHITECTURE

```
Training Programme
│
├── Module
│   ├── Lesson
│   ├── Case Study
│   ├── Practical Exercise
│   ├── Discussion
│   └── Assessment
```

Propune **între 6 și 12 module**, în funcție de durată.

Pentru fiecare modul indică: Titlu · Durată · Target audience · Learning objectives · Prerequisites · Topics · Key concepts · Practical skills · Exercise · Tools · Case study · Assessment · Trainer notes · Take-away resources.

---

## ETAPA 5 — CONȚINUTUL FIECĂRUI MODUL

Dezvoltă fiecare modul în detaliu. **Nu furniza doar titluri de slide-uri.** Pentru fiecare lecție scrie efectiv materia care trebuie predată.

Structura fiecărei lecții:
1. Concept
2. De ce contează pentru sector
3. Cum apare problema în practică
4. Exemple
5. Common mistakes
6. Indicators
7. Prevention
8. Detection
9. Response
10. Recovery
11. Lessons learned

Include exemple realiste pentru IMM-uri. Evită exemplele construite exclusiv pentru organizații cu SOC-uri mari sau bugete enterprise.

Pentru fiecare recomandare răspunde implicit la întrebarea:
> **„Cum poate implementa acest lucru un IMM cu resurse limitate?"**

---

## ETAPA 6 — SCENARII ȘI CASE STUDIES

Creează minimum 3 scenarii sectoriale:
- **Scenariul 1:** cyber incident tehnic
- **Scenariul 2:** supply-chain / third-party incident
- **Scenariul 3:** crisis management și business continuity

Pentru fiecare scenariu: Context · Organization profile · Incident timeline · Initial indicators · Technical indicators · Decisions required · Stakeholders involved · Escalation points · Legal obligations · Communication challenges · Technical response · Management response · Recovery · Lessons learned.

Folosește cronologia: `T+0 · T+15 min · T+30 min · T+1h · T+3h · T+6h · T+24h · T+72h`.

**Participanții trebuie să ia decizii pe parcurs. Nu oferi imediat soluția.**

---

## ETAPA 7 — TABLETOP EXERCISE

Construiește un tabletop exercise complet: Scenario · Exercise objectives · Participant roles · Facilitator role · Rules · Injects · Decision points · Escalation · Expected actions · Discussion questions · Evaluation criteria · Debrief.

Creează **minimum 10 injects** (ex.: security alert, customer complaint, social media post, journalist request, ransom note, supplier notification, data leak, executive request, law enforcement contact, regulator notification, system outage, new forensic evidence).

Pentru fiecare inject indică: Moment · Information received · Cine primește informația · Decizia necesară · Ce testează inject-ul.

---

## ETAPA 8 — IMM CYBER RESILIENCE TOOLKIT

Creează un toolkit utilizabil după training. Include minimum:

1. Cybersecurity Quick Assessment
2. Asset Inventory Template
3. Critical Asset Register
4. Risk Register
5. Supplier Risk Checklist
6. Incident Reporting Template
7. Incident Response Checklist
8. Ransomware Checklist
9. Phishing Response Checklist
10. Backup Checklist
11. Access Control Checklist
12. Patch Management Checklist
13. Cybersecurity Policy Template
14. Business Continuity Checklist
15. Crisis Communication Template
16. Lessons Learned Template

**Construiește template-urile efectiv. Nu scrie doar că ar trebui să existe.**

---

## ETAPA 9 — CYBER MATURITY MODEL

Construiește un model simplu de maturitate pentru IMM-uri:

`Nivel 0 Absent · Nivel 1 Initial · Nivel 2 Basic · Nivel 3 Managed · Nivel 4 Advanced · Nivel 5 Resilient`

Domenii analizate (minimum): Governance, Asset management, Risk management, Identity, Access control, Patch management, Endpoint security, Network security, Cloud security, Backup, Monitoring, Incident response, Business continuity, Supply chain, Security awareness, Compliance.

Pentru fiecare nivel descrie **criterii observabile**.

---

## ETAPA 10 — REGULATORY MAPPING

Mapează modulele la reglementările relevante sectorului:

| Training module | NIS2 | CRA | GDPR | DORA | CER | ISO 27001 | NIST CSF | Cerințe sectoriale |
|---|---|---|---|---|---|---|---|---|

Include doar actele relevante. Verifică sursele oficiale și folosește forma actualizată a legislației.

Separă clar:
- **legal requirement**
- **standard requirement**
- **recommended good practice**

**Nu transforma recomandările în obligații legale.**

---

## ETAPA 11 — MANAGEMENT TRACK

Creează un traseu separat pentru management. După training, managementul trebuie să poată răspunde la:

1. Care sunt activele noastre critice?
2. Care este riscul nostru cibernetic principal?
3. Ce sisteme trebuie restaurate primele?
4. Cât timp putem funcționa fără aceste sisteme?
5. Cine poate declara un incident major?
6. Cine comunică cu autoritățile?
7. Cine decide izolarea sistemelor?
8. Ce servicii depind de furnizori?
9. Care este nivelul nostru real de pregătire?
10. Ce investiții reduc cel mai mult riscul?

---

## ETAPA 12 — TECHNICAL TRACK

Exerciții pentru participanții tehnici: asset discovery, vulnerability management, logging, phishing investigation, email header analysis, IOC analysis, basic threat hunting, endpoint compromise, credential compromise, network investigation, cloud security, backup restoration, incident containment.

Precizează instrumentele utilizabile. **Prioritizează open-source tools și soluții accesibile IMM-urilor.**

---

## ETAPA 13 — CYBER HYGIENE TRACK

Modul practic pentru personalul non-tehnic: phishing, MFA, passwords, QR phishing, social engineering, fake login pages, malicious attachments, USB risks, mobile security, remote work, cloud sharing, AI-related risks, deepfakes, BEC.

Folosește exemple specifice sectorului.

---

## ETAPA 14 — SUPPLY CHAIN SECURITY

Modul separat: supplier mapping, critical suppliers, digital dependency, supplier access, cloud providers, software suppliers, MSPs, remote access, SBOM (unde este relevant), contractual cybersecurity requirements, incident notification, supplier assessment, exit strategy.

Creează un **Vendor Cyber Risk Questionnaire cu 20–30 de întrebări**.

---

## ETAPA 15 — INCIDENT RESPONSE

```
Detection → Validation → Classification → Escalation → Containment
→ Investigation → Notification → Recovery → Lessons Learned
```

Pentru fiecare etapă indică: responsabil · input · decizie · output · documentație necesară.

Include o **variantă pentru un IMM fără SOC**.

---

## ETAPA 16 — METRICS

Propune KPI și KRI care demonstrează eficiența programului: training completion, phishing reporting rate, MFA adoption, patch latency, critical vulnerabilities, backup success, restore test success, incident detection time, incident escalation time, supplier assessments completed.

**Explică formula pentru fiecare indicator.**

---

## ETAPA 17 — ASSESSMENT

Construiește: Pre-training assessment · Knowledge quizzes · Scenario-based questions · Practical exercises · Final assessment · Post-training evaluation.

Pentru evaluarea finală creează **minimum 20 de întrebări**: multiple choice, scenario questions, decision-making, risk prioritization.

Furnizează **separat** answer key și explicații.

---

## ETAPA 18 — TRAINER GUIDE

Pentru fiecare modul: Trainer objectives · Key messages · Questions to ask · Possible participant answers · Common misconceptions · Points requiring emphasis · Timing · Facilitation advice.

Marchează momentele: **ASK · DISCUSS · DEMONSTRATE · EXERCISE · DEBRIEF**.

---

## ETAPA 19 — TRAINING MATERIALS

Generează structura materialelor: Trainer Manual · Participant Manual · PowerPoint deck · Exercise Workbook · Tabletop Exercise Pack · Assessment Pack · Cyber Resilience Toolkit · Management Checklist · Technical Checklist · Sector Cybersecurity Guide.

Pentru PowerPoint propune conținut **slide-by-slide**, fără blocuri mari de text. Pentru fiecare slide: Title · Core message · Visual suggestion · Speaker notes.

---

## ETAPA 20 — ACTION PLAN

Programul se încheie cu: **30-Day · 60-Day · 90-Day Cybersecurity Action Plan**.

Separă măsurile în: **No-cost · Low-cost · Medium investment · Strategic investment**.

Pentru fiecare măsură: Action · Owner · Priority · Estimated effort · Expected benefit · Metric.

---

## PRINCIPII OBLIGATORII

Programul trebuie să fie: sector-specific · scenario-based · risk-based · practical · measurable · adaptabil IMM-urilor · bazat pe amenințări reale · aliniat cadrului european · orientat spre implementare.

- Nu construi conținut generic de awareness.
- Nu presupune că toate organizațiile au CISO, SOC, SIEM sau echipă cybersecurity.
- Pentru IMM-uri oferă întotdeauna o alternativă realistă.
- Distinge între **Must have / Should have / Advanced capability**.
- Folosește surse oficiale actualizate pentru legislație, statistici și cerințe.
- Prioritizează: ENISA, European Commission, EUR-Lex, ECCC, NIST, CISA, MITRE, CERT/CSIRT naționale, standarde internaționale relevante.
- **Nu inventa statistici, incidente, cerințe legale sau surse.** Dacă folosești un incident real, citează sursa.

---

## OUTPUT FINAL

Livrează în această ordine:

1. Executive Summary
2. Sector Cybersecurity Profile
3. Target Audience
4. Training Needs Analysis
5. Learning Objectives
6. Curriculum Map
7. Detailed Modules
8. Sector Threat Landscape
9. Case Studies
10. Tabletop Exercise
11. Management Track
12. Technical Track
13. Cyber Hygiene Track
14. Supply Chain Module
15. Incident Response Framework
16. SME Cyber Resilience Toolkit
17. Cyber Maturity Model
18. Regulatory Mapping
19. Assessments
20. Trainer Guide
21. Training Materials
22. KPIs and KRIs
23. 30/60/90 Day Action Plan
24. References

---

## INSTRUCȚIUNE FINALĂ DE LUCRU

Înainte de redactarea completă, **creează mai întâi arhitectura programului și explică logica succesiunii modulelor**.
Apoi dezvoltă modulele unul câte unul, păstrând consistența între ele.

**Nu simplifica materia doar pentru că publicul include IMM-uri. Simplifică modul de explicare, nu complexitatea problemei.**
