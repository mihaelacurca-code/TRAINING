# RAMURA SECTORIALĂ 03 — ENERGY

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Energia figurează în Anexa I — sectoare de înaltă criticitate: energie electrică, termoficare și răcire centralizată, petrol, gaze, hidrogen. Transpusă în România prin **Legea nr. 58/2024**; autoritate competentă și CSIRT național: **DNSC**. | Cerință legală, condiționată de încadrare |
| **CER** (Directiva (UE) 2022/2557) | Reziliența entităților critice; energia este unul dintre sectoarele vizate. Regim complementar celui NIS2. | Cerință legală, condiționată de desemnare |
| **Codul de rețea privind securitatea cibernetică** pentru fluxurile transfrontaliere de energie electrică (Regulamentul delegat (UE) 2024/1366) | Cerințe specifice pentru entitățile din sectorul electricității cu impact transfrontalier. **Verifică domeniul de aplicare și calendarul.** | Cerință legală pentru entitățile vizate |
| **IEC 62443** | Securitate pentru sisteme de automatizare și control industrial — referința principală pentru zona OT. | Standard / bună practică |
| **IEC 62351** | Securitate pentru protocoalele de comunicație din sistemele energetice (IEC 61850, ICCP etc.). | Standard / bună practică |
| **ISO 27019** | Ghid de securitate a informației pentru industria energetică. | Standard / bună practică |
| **GDPR** | Date de consum, contorizare inteligentă, date de client. | Cerință legală |

**Atenție:** un producător de energie din surse regenerabile cu un parc fotovoltaic de câțiva MW, administrat de 8 oameni, poate fi sub pragurile NIS2 — dar activele lui sunt conectate la rețea și controlate de la distanță, iar cerințele ajung prin contractul cu operatorul de rețea sau cu agregatorul. Explică acest traseu explicit.

---

## 2. Profil operațional

**Procese critice:** producție · echilibrare și dispecerizare · distribuție · măsurare și decontare · mentenanță programată și corectivă · tranzacționare pe piață · gestionarea situațiilor de avarie.

**Sisteme tipice:** SCADA · sisteme de control distribuit (DCS) · RTU și PLC în stații și puncte de măsurare · sisteme de protecție (IED) · EMS/DMS · sisteme de contorizare inteligentă (AMI/MDM) · platforme de monitorizare a parcurilor eoliene și fotovoltaice (adesea administrate de producătorul de turbine/invertoare, din afara țării) · sisteme de tranzacționare · ERP și sisteme de facturare · sisteme de mentenanță (CMMS) · acces de la distanță pentru integratori.

**Date procesate:** telemetrie operațională · date de producție și consum · date de contorizare a clienților · date de piață și poziții comerciale · planuri și scheme de rețea.

**Dependențe critice:** operatorul de transport și de distribuție · furnizorul SCADA/EMS și integratorul de automatizări · producătorul echipamentelor (turbine, invertoare, transformatoare) cu monitorizare de la distanță · furnizorul de comunicații pentru punctele izolate · platformele de piață · agregatorii.

**Unde securitatea devine imediat operațională:** o comandă eronată sau blocată în SCADA are consecință fizică. Diferența față de IT clasic: aici nu poți „reporni și vedem ce se întâmplă".

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| SCADA / EMS / DCS | Critică | Compromitere, manipulare de comenzi, indisponibilitate | Punte IT→OT insuficient controlată, stații de inginerie cu acces la internet, conturi partajate | Pierderea controlului, întrerupere de alimentare, avarie de echipament | Segmentare pe zone și conduits (IEC 62443), stații de inginerie dedicate, jurnalizare, control al comenzilor critice |
| PLC / RTU / IED | Critică | Manipulare, denial of service | Protocoale fără autentificare, firmware vechi, acces fizic slab controlat | Declanșări false, pierderea protecției | Inventar, control al accesului fizic, actualizare planificată, monitorizare pasivă |
| Acces de la distanță al integratorului / producătorului | Critică | Abuz, compromitere a furnizorului | Tunel permanent, cont comun, lipsa aprobării per sesiune | Punct unic de intrare în OT | Acces just-in-time, aprobare per sesiune, înregistrarea sesiunii, jump host |
| Sisteme de contorizare (AMI/MDM) | Ridicată | Fraudă, exfiltrare, manipulare de date | Chei slab gestionate, acces larg la baza de date | Pierdere financiară, breșă de date, decontare eronată | Gestionarea cheilor, separarea rolurilor, control al integrității |
| Stații de inginerie și laptopuri de mentenanță | Critică | Malware transportat, credential theft | Aceleași laptopuri folosite și pe internet, USB nerestricționat | Introducerea malware-ului direct în OT | Laptopuri dedicate, control USB, scanare la intrare, listă albă de aplicații |
| Istoric de proces (historian) | Ridicată | Exfiltrare, alterare | Acces din rețeaua de birou, conturi de serviciu cu drepturi mari | Pierderea trasabilității, informație valoroasă pentru atacator | Acces unidirecțional (data diode sau replicare), conturi cu privilegii minime |
| Sisteme de tranzacționare | Ridicată | Fraudă, manipulare | Acces insuficient controlat, lipsa separării funcțiilor | Pierdere financiară semnificativă | Separarea funcțiilor, MFA, limite și alerte pe tranzacții |
| Backup și configurații de echipamente | Critică | Criptare, pierdere | Configurații nesalvate, salvate doar local | Timp de restabilire foarte lung | Copii offline ale configurațiilor, versionare, test de restaurare pe echipament de rezervă |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK (Enterprise / ICS) | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Ransomware în IT cu efect asupra OT | Criminalitate organizată | Phishing, perimetru expus | ERP, historian, uneori SCADA | Initial Access, Lateral Movement, Impact | Oprirea preventivă a operării, pierderea vizibilității | Ridicată | Conturi noi privilegiate, dezactivarea protecției, trafic anormal către segmentul de proces |
| Intruziune țintită în OT | Actori statali sau sponsorizați | Acces al furnizorului, compromitere a IT urmată de pivot | SCADA, PLC, IED | ICS: Initial Access, Lateral Movement, Inhibit Response Function, Impair Process Control | Întrerupere de alimentare, avarie fizică | Scăzută–medie, dar impact maxim | Comenzi în afara ferestrelor, sesiuni de inginerie neprogramate, modificări de logică |
| Compromiterea lanțului de aprovizionare de automatizări | Actori avansați | Actualizare de firmware, integrator, echipament nou | Toate nivelurile OT | Supply Chain Compromise, Persistence | Compromitere de durată, greu de detectat | Medie | Firmware fără semnătură verificată, livrări în afara procesului obișnuit |
| Abuz al accesului de la distanță | Criminalitate, insider | Tunel permanent al integratorului | SCADA, PLC | Valid Accounts, Remote Services | Control neautorizat | Medie–ridicată | Conectări în afara orelor, de la locații noi, fără ticket asociat |
| Hacktivism și DDoS | Grupuri ideologice | Servicii publice expuse, portaluri de client | Site, portal, uneori interfețe expuse greșit | Impact | Imagine, pierderea canalelor de client | Medie | Anunțuri publice prealabile, creșteri de trafic |
| Fraudă pe piață și BEC | Criminalitate financiară | Email compromis, acces la tranzacționare | Tranzacționare, financiar | Initial Access, Impact | Pierdere financiară mare, rapidă | Medie | Modificări de cont, ordine atipice, presiune de urgență |
| Insider cu acces operațional | Personal, contractori | Acces legitim folosit abuziv | SCADA, configurații | Valid Accounts | Avarie, indisponibilitate | Scăzută, impact ridicat | Acțiuni în afara atribuțiilor, descărcări de configurații |

---

## 5. Particularitatea IMM în acest sector

1. **Consecința e fizică, nu doar economică.** Un producător mic de energie nu riscă „pierderea datelor", riscă o avarie de echipament sau o penalitate de dezechilibru. Trainingul trebuie să pornească de la proces, nu de la date.
2. **OT-ul nu e administrat de el.** Parcurile eoliene și fotovoltaice mici sunt monitorizate și adesea controlate de producătorul echipamentelor, de la distanță, din altă țară. Cea mai importantă capabilitate pentru acest public este **guvernanța accesului furnizorului**, nu apărarea perimetrului.
3. **Disponibilitatea bate confidențialitatea.** Ordinea clasică CIA se inversează. Orice recomandare care ar putea introduce risc de indisponibilitate trebuie prezentată cu procedura de testare aferentă.
4. **Ferestre de mentenanță rare și scumpe.** Patching-ul se planifică cu luni înainte. Trainingul trebuie să predea controale compensatorii ca soluție de bază, nu ca excepție.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: pierderea vizibilității SCADA**
Producător de energie regenerabilă, 3 parcuri, 14 angajați. La ora 03:20, dispeceratul pierde telemetria de la toate cele 3 parcuri simultan. Producția pare să continue, dar nu poate fi confirmată și nici comandată. Furnizorul de monitorizare nu răspunde. Decizii: se deplasează echipaj la fața locului, se anunță operatorul de rețea, se tratează ca incident de securitate sau ca defecțiune de comunicații, când se notifică autoritatea, cum se gestionează expunerea de dezechilibru.

**Scenariul 2 — supply chain: actualizare de firmware compromisă**
Producătorul invertoarelor anunță o actualizare de securitate obligatorie, distribuită prin portalul său. După instalare pe un parc, apar reporniri repetate și comenzi neașteptate. Un alt operator din țară raportează același comportament. Decizii: se oprește instalarea pe celelalte parcuri, se revine la versiunea anterioară (dacă e posibil), cum se verifică autenticitatea actualizării, ce se comunică operatorului de rețea și autorității, cum se reconstruiește încrederea în furnizor.

**Scenariul 3 — criză și continuitate: ransomware în IT, decizie despre OT**
Ransomware criptează rețeaua administrativă: ERP, email, sistemul de mentenanță, historian-ul replicat. OT pare neatins, dar nu există certitudine și nici vizibilitate completă. Operatorul de rețea cere confirmare că producția e sigură. Decizii: se oprește producția preventiv (cu pierdere certă) sau se continuă (cu risc incert), cine are autoritatea, ce dovezi sunt necesare pentru a decide, cum se comunică și ce se raportează.

---

## 7. Inject-uri sectoriale

1. `T+15 min` — Operatorul de rețea sună și cere confirmarea capacității disponibile pentru următoarea oră. **Decizie:** ce se declară fără telemetrie. **Testează:** obligațiile operaționale în lipsa sistemelor.
2. `T+40 min` — Tehnicianul de la fața locului raportează că panoul local afișează valori normale. **Decizie:** se consideră problema doar de comunicații? **Testează:** rezistența la concluzii premature.
3. `T+1h` — Furnizorul de monitorizare răspunde și cere acces VPN cu drepturi de administrator pentru diagnostic. **Decizie:** se acordă, cu ce condiții, cine aprobă. **Testează:** guvernanța accesului furnizorului sub presiune.
4. `T+2h` — Echipa IT descoperă un cont de serviciu creat acum 9 zile, cu drepturi în segmentul de proces. **Decizie:** se dezactivează imediat sau se monitorizează? **Testează:** înțelegerea compromisului dintre containment și investigație.
5. `T+3h` — Departamentul comercial semnalează o expunere de dezechilibru care crește cu fiecare oră. **Decizie:** prioritatea între cost financiar și prudență operațională. **Testează:** existența unui mandat de decizie economică în criză.
6. `T+5h` — Apare o știre despre „atac asupra infrastructurii energetice din România". **Decizie:** se confirmă, se infirmă, se tace. **Testează:** disciplina comunicării într-un sector sensibil.
7. `T+7h` — DNSC solicită informații preliminare. **Decizie:** cine este punctul de contact, ce se transmite în această fază. **Testează:** existența unui responsabil desemnat pentru relația cu autoritatea.
8. `T+12h` — Se descoperă că ultimele copii ale configurațiilor PLC datează de acum 14 luni. **Decizie:** cum se procedează la restaurare. **Testează:** disciplina de backup pentru active OT.
9. `T+24h` — Un al doilea producător, cu același furnizor de monitorizare, raportează simptome similare. **Decizie:** se schimbă încadrarea incidentului? **Testează:** recunoașterea unui incident de lanț de aprovizionare.
10. `T+48h` — Asigurătorul cere dovada că s-au respectat măsurile declarate la încheierea poliței. **Decizie:** ce dovezi există. **Testează:** legătura dintre documentație și realitate operațională.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Sesiuni de acces de la distanță în OT aprobate individual | sesiuni cu aprobare și jurnalizare / total sesiuni × 100 | 100% |
| Inventar OT complet | active OT identificate și clasificate / total estimat × 100 | > 95% |
| Copii actualizate ale configurațiilor PLC/RTU | active cu configurație salvată în ultimele 90 de zile / total × 100 | > 95% |
| Separare IT/OT verificată | puncte de interconectare documentate și controlate / total puncte identificate × 100 | 100% |
| Timp până la detectarea pierderii de vizibilitate SCADA | minute de la pierderea telemetriei până la alertă | < 5 min |
| Exerciții de operare fără SCADA | număr de exerciții documentate în ultimele 12 luni | ≥ 2 |
| Stații de inginerie dedicate | stații fără acces la internet și email / total stații de inginerie × 100 | 100% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Energie
Subsector: producători de energie din surse regenerabile și operatori de instalații mici și mijlocii
Țară/regiune: România / Uniunea Europeană
Public țintă: management, personal de exploatare și mentenanță, responsabil de conformitate,
              persoana cu atribuții IT, integratorul/furnizorul de automatizări
Nivel: mixed, cu traseu tehnic distinct pentru personalul OT
Durată totală: 2 zile
Format: fizic, cu exercițiu de tip tabletop în a doua zi
Număr participanți: 18
Scop principal: după training, organizația poate opera 12 ore fără sisteme de monitorizare, are
                control documentat asupra accesului furnizorilor în OT și un plan de notificare
Reglementări: NIS2 / Legea nr. 58/2024, CER unde este cazul, codul de rețea privind securitatea
              cibernetică pentru electricitate (dacă e aplicabil), IEC 62443 ca referință
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Energie
2. Subsector: producție din surse regenerabile, distribuție locală, termoficare
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, exploatare, mentenanță, conformitate, integratori
5. Nivel: mixed
6. Format: platformă web, cu laborator OT simulat
7. Scop principal: reziliență operațională și guvernanța accesului în OT
8. Reglementări: NIS2 / Legea 58/2024, CER, cod de rețea electricitate, IEC 62443, IEC 62351, ISO 27019
9. Constrângeri: OT administrat de furnizori externi, ferestre de mentenanță rare,
                 echipamente cu ciclu de viață lung, personal tehnic redus
10. Rezultat urmărit: evaluare de maturitate OT, exerciții de operare degradată, toolkit de control al furnizorilor
```

---

## 10. Capcane de evitat

- **Să transferi practici IT în OT fără traducere.** „Aplică patch-urile lunar" și „rulează un scan de vulnerabilități" pot fi periculoase într-o instalație în funcțiune. Predă întâi de ce, apoi cum.
- **Să folosești incidente celebre fără context.** Dacă citezi un incident real din sector, citează sursa și explică ce este transferabil la o organizație mică din România și ce nu.
- **Să reduci totul la segmentare.** Segmentarea e necesară, dar insuficientă fără control al accesului furnizorilor, inventar și copii de configurație.
- **Să ignori dimensiunea comercială.** Dezechilibrul și poziția de piață sunt consecințe imediate și cuantificabile; managementul le înțelege mai bine decât orice argument tehnic.
- **Să presupui existența unui SOC.** Pentru o organizație de 14 oameni, „monitorizare" înseamnă alerte configurate corect și un număr de telefon care răspunde noaptea.
