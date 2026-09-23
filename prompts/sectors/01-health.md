# RAMURA SECTORIALĂ 01 — HEALTH

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Sănătatea figurează în Anexa I — sectoare de înaltă criticitate (furnizori de asistență medicală, laboratoare de referință, cercetare și fabricație de medicamente și dispozitive medicale critice). Transpusă în România prin **Legea nr. 58/2024**; autoritatea competentă și CSIRT național: **DNSC**. | Cerință legală, condiționată de încadrare |
| **GDPR** (Regulamentul (UE) 2016/679) | Datele privind sănătatea sunt categorie specială (art. 9). Notificare către autoritatea de supraveghere — în România **ANSPDCP** — fără întârzieri nejustificate și, în general, în cel mult 72 de ore de la luarea la cunoștință. | Cerință legală, aplicabilă practic tuturor |
| **MDR / IVDR** (2017/745, 2017/746) | Cerințe de securitate pentru dispozitive medicale și dispozitive de diagnostic in vitro, inclusiv software ca dispozitiv medical. Relevant pentru producători și, indirect, pentru utilizatori prin condițiile de menținere a conformității. | Cerință legală pentru producători |
| **Cyber Resilience Act** (Regulamentul (UE) 2024/2847) | Produse cu elemente digitale. Relevant pentru producătorii de software și echipamente medicale conectate; calendar de aplicare etapizat — **verifică datele exacte în vigoare**. | Cerință legală pentru producători/distribuitori |
| **ISO 27001 / ISO 27799** | Sistem de management al securității informației, cu ghid specific pentru sănătate. | Cerință de standard (voluntară, dacă nu e contractuală) |
| **IEC 80001** | Managementul riscului pentru rețelele IT care încorporează dispozitive medicale. | Bună practică / standard |

**Atenție:** un cabinet individual sau o clinică mică poate să **nu** intre în domeniul NIS2 din cauza pragurilor de dimensiune, dar rămâne integral sub GDPR și poate fi tras în sfera cerințelor prin contractele cu spitale sau case de asigurări. Tratează cele două lucruri separat în training.

---

## 2. Profil operațional

**Procese critice:** programare și triaj · internare și externare · prescriere și administrare de medicamente · imagistică și interpretare · analize de laborator · blocul operator · urgențe · decontare cu asigurătorul · aprovizionare cu consumabile și medicamente.

**Sisteme tipice:** HIS (Hospital Information System) · EHR/EMR · PACS și modalități imagistice (CT, RMN, radiologie, ecografie) · LIS (laborator) · RIS · sisteme de farmacie și dozatoare automate · dispozitive medicale conectate (monitoare, pompe de infuzie, ventilatoare) · sisteme de acces și supraveghere · BMS (gaze medicale, temperatură, ventilație) · platforme de telemedicină · soluții de programare online.

**Date procesate:** date privind sănătatea, date genetice, imagistică, rețete, date de identificare, date de asigurare, date financiare, date de cercetare clinică.

**Dependențe critice:** furnizorul HIS/EHR (adesea unic și cu acces de la distanță) · furnizorul PACS · laboratoare externe · furnizori de dispozitive medicale cu contracte de mentenanță la distanță · conexiunea cu casa de asigurări · furnizor de internet · furnizor de energie.

**Unde securitatea devine imediat operațională:** dacă PACS-ul sau HIS-ul nu răspund, triajul, imagistica și blocul operator încetinesc sau se opresc. Impactul nu este financiar în primul rând, ci clinic.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| HIS / EHR | Critică | Ransomware, acces neautorizat, exfiltrare | Acces de la distanță al furnizorului fără MFA, conturi partajate pe secții, versiuni vechi | Oprirea activității clinice, breșă masivă de date de sănătate | MFA pe accesul furnizorului, conturi nominale, jurnalizare acces la dosare, backup testat |
| PACS / imagistică | Critică | Ransomware, expunere pe internet | Servere PACS expuse, protocol DICOM fără autentificare, sisteme de operare neactualizate pe stațiile modalităților | Pierderea accesului la imagini, diagnostic întârziat | Segmentare de rețea, interzicerea expunerii directe, backup separat, acord cu furnizorul privind actualizările |
| Dispozitive medicale conectate | Critică | Compromitere, indisponibilitate, mișcare laterală | Sisteme de operare nesuportate, imposibilitatea actualizării fără acordul producătorului, parole implicite | Risc clinic direct pentru pacient | Segmentare strictă (VLAN dedicat), inventar, monitorizare, clauze de securitate în contractul de mentenanță |
| Identități și conturi clinice | Critică | Credential theft, phishing, abuz intern | Conturi partajate pe post de lucru, sesiuni rămase deschise, MFA absent pe acces extern | Acces necontrolat la dosare, imposibilitatea atribuirii unei acțiuni | MFA pe tot accesul extern, sesiuni cu blocare automată, badge/card pentru autentificare rapidă |
| Backup | Critică | Criptare, ștergere | Backup pe același domeniu, fără copie offline, restaurare netestată | Imposibilitatea reluării activității | Regula 3-2-1, o copie imuabilă sau offline, test de restaurare trimestrial documentat |
| Laborator (LIS) | Ridicată | Ransomware, alterarea datelor | Integrare directă cu analizoare, conturi de serviciu cu privilegii mari | Rezultate indisponibile sau nesigure | Segmentare, control al integrității, procedură de lucru pe hârtie |
| Telemedicină / programare online | Ridicată | Compromitere web, scraping, DDoS | Platformă administrată extern, lipsa limitării de rată | Expunere de date, oprirea programărilor | Verificarea furnizorului, MFA administrativ, limitare de rată |
| Sisteme de facilitate (gaze, temperatură) | Ridicată | Compromitere OT/BMS | Rețea comună cu IT-ul administrativ, acces de la distanță al instalatorului | Risc pentru pacienți, pierderea stocurilor termosensibile | Separare de rețea, acces de la distanță controlat și jurnalizat |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK (tactici) | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Ransomware cu dublă extorcare | Grupuri criminale organizate | Phishing, VPN/RDP expus, vulnerabilitate în echipament de perimetru | HIS, PACS, backup | Initial Access, Credential Access, Lateral Movement, Exfiltration, Impact | Oprirea activității clinice, redirecționarea urgențelor, breșă de date | Ridicată | Conturi de administrator noi, dezactivarea antivirusului, volume mari de trafic ieșit noaptea, ștergerea copiilor umbră |
| Exfiltrarea dosarelor de pacient | Criminalitate cibernetică, insider | Credential theft, acces excesiv, dispozitiv pierdut | EHR, arhive | Collection, Exfiltration | Sancțiune GDPR, pierderea încrederii, șantaj asupra pacienților | Ridicată | Interogări în masă, acces în afara programului, export neobișnuit de rapoarte |
| Compromiterea furnizorului HIS | Grupuri avansate, criminalitate | Acces de la distanță al furnizorului, actualizare compromisă | Toate sistemele clinice | Initial Access, Supply Chain Compromise, Persistence | Compromitere simultană a mai multor unități medicale | Medie–ridicată | Conexiuni de mentenanță în afara ferestrelor agreate, modificări neanunțate |
| Compromiterea dispozitivelor medicale | Oportunist, uneori nedirijat | Rețea plată, sisteme nesuportate | Monitoare, pompe, ventilatoare | Lateral Movement, Impact | Risc clinic direct, indisponibilitate | Medie | Trafic neașteptat dinspre segmentul medical, reporniri inexplicabile |
| BEC și fraudă pe achiziții | Criminalitate financiară | Email compromis, spoofing | Financiar, aprovizionare | Initial Access, Impact | Pierdere financiară, întârzieri în aprovizionare | Ridicată | Schimbare de IBAN prin email, reguli noi de redirecționare în cutia poștală |
| Indisponibilitate prin DDoS | Hacktivism, extorcare | Expunere publică a serviciilor | Site, programare online, telemedicină | Impact | Oprirea canalelor publice | Medie | Creșteri bruște de trafic, degradare a răspunsului |
| Insider neintenționat | Personal | Partajarea conturilor, trimiterea de date pe canale personale | Date de pacient | — | Breșă de date | Ridicată | Trimiteri către domenii personale, printuri masive |

---

## 5. Particularitatea IMM în acest sector

Cabinetul, clinica mică sau laboratorul privat au o combinație rară: **date cu risc maxim și resurse minime**. Trei consecințe pentru training:

1. **Nu există administrator IT.** Infrastructura e ținută de un furnizor extern care are acces permanent și, adesea, nelimitat. Cel mai eficient modul pentru acest public nu este despre firewall-uri, ci despre **ce ceri contractual furnizorului și cum verifici**.
2. **Software-ul medical dictează.** Nu poți actualiza ce vrei; producătorul poate invalida garanția sau conformitatea. Trainingul trebuie să învețe **compensarea prin segmentare și control de acces**, nu patching idealizat.
3. **Continuitatea clinică e prioritară față de cea informatică.** Procedura de lucru degradat (pe hârtie) nu e un plan B jenant, e o capabilitate care se exersează. Include-o explicit în scenarii.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: ransomware în noaptea de sâmbătă spre duminică**
Clinică privată cu 90 de angajați, două locații, HIS administrat extern. Criptarea începe la 02:10, este observată la 06:40 de asistenta de la recepție care nu poate deschide programările. Blocul operator are 4 intervenții programate la ora 08:00. Decizii: se operează sau nu, se anunță pacienții, se izolează rețeaua (și se pierde accesul la rezultatele de laborator), cine decide, când se notifică DNSC și ANSPDCP, ce se comunică.

**Scenariul 2 — supply chain: furnizorul HIS anunță o compromitere**
Furnizorul trimite luni dimineață un email prin care anunță „un incident de securitate care ar fi putut afecta conexiunile de mentenanță ale clienților". Nu oferă detalii și nu răspunde la telefon. Clinica trebuie să decidă dacă suspendă accesul furnizorului — fără de care nu poate opera sistemul — dacă are obligație de notificare, ce spune pacienților și cum verifică independent dacă a fost afectată.

**Scenariul 3 — criză și continuitate: PACS indisponibil 72 de ore**
Serverul PACS este compromis, imaginile din ultimele 11 zile nu sunt recuperabile din backup din cauza unei erori de configurare descoperite abia acum. Trebuie gestionate: pacienții care trebuie rechemați la investigații, relația cu medicii care au emis diagnostice pe baza imaginilor, comunicarea publică, întrebarea dacă este breșă de date sau incident de disponibilitate, reconstrucția și lecțiile învățate.

---

## 7. Inject-uri sectoriale

1. `T+25 min` — Asistenta-șefă raportează că monitoarele de pe ATI afișează erori de conectare la rețea. **Decizie:** se izolează segmentul medical? **Testează:** înțelegerea riscului clinic al izolării.
2. `T+50 min` — Un medic întreabă dacă poate folosi telefonul personal pentru a fotografia rezultatele și a le trimite pe WhatsApp colegului de gardă. **Decizie:** se permite ca măsură temporară? **Testează:** echilibrul între continuitate clinică și protecția datelor.
3. `T+1h 30` — Furnizorul HIS cere credențiale de administrator de domeniu „ca să investigheze mai repede". **Decizie:** se acordă? în ce condiții? **Testează:** controlul accesului furnizorului sub presiune.
4. `T+3h` — Un jurnalist local sună și întreabă de ce s-au anulat operațiile de azi. **Decizie:** cine răspunde și ce spune. **Testează:** existența unui purtător de cuvânt desemnat.
5. `T+5h` — Pe un forum apare un mesaj cu 40 de nume de pacienți și CNP-uri, ca „mostră". **Decizie:** se declanșează notificarea GDPR? către cine, în ce termen? **Testează:** distincția între suspiciune și confirmare a breșei.
6. `T+8h` — Atacatorii transmit o cerere de răscumpărare cu termen de 48 de ore. **Decizie:** cine are autoritatea de a decide și ce consultări sunt necesare. **Testează:** existența unui mandat clar de decizie.
7. `T+20h` — Casa de asigurări solicită raportările lunare, cu termen mâine. **Decizie:** se cere amânare, se raportează incidentul? **Testează:** conștientizarea obligațiilor conexe.
8. `T+30h` — Backup-ul se restaurează, dar lipsesc 11 zile de imagistică. **Decizie:** se rechemă pacienții? cine îi anunță? **Testează:** gestionarea consecințelor clinice ale unui incident IT.
9. `T+48h` — Un angajat postează pe Facebook că „la noi e dezastru, nimeni nu știe ce face". **Decizie:** răspuns intern și extern. **Testează:** comunicarea internă în criză.
10. `T+70h` — Autoritatea solicită raportul final privind incidentul. **Decizie:** cine îl redactează și ce conține. **Testează:** capacitatea de documentare pe parcursul incidentului, nu retroactiv.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Acoperire MFA pe accesul extern la sisteme clinice | conturi externe cu MFA / total conturi externe × 100 | 100% |
| Dispozitive medicale inventariate și segmentate | dispozitive în VLAN dedicat / total dispozitive conectate × 100 | > 90% |
| Test de restaurare a HIS/PACS | număr de teste reușite documentate în ultimele 12 luni | ≥ 4, cu cel puțin unul complet |
| Timp până la activarea procedurii de lucru degradat | minute de la declararea indisponibilității până la trecerea pe procedura pe hârtie | < 30 min |
| Conturi partajate pe secții | număr de conturi cu mai mulți utilizatori declarați | 0 |
| Revizuirea accesului furnizorilor | furnizori cu acces revizuit în ultimele 6 luni / total × 100 | 100% |
| Rata de raportare a phishingului de către personalul clinic | mesaje raportate / mesaje de test trimise × 100 | > 40% și în creștere |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Sănătate
Subsector: unități medicale private mici și mijlocii (clinici, laboratoare, cabinete grupate)
Țară/regiune: România / Uniunea Europeană
Public țintă: management (administrator/director medical), personal administrativ și de recepție,
              personal clinic, persoana cu atribuții IT sau furnizorul IT extern, DPO
Nivel: mixed
Durată totală: 2 zile (sau program modular în 6 sesiuni)
Format: hibrid
Număr participanți: 20
Scop principal: după training, fiecare organizație participantă are un registru al activelor clinice
                critice, o procedură de lucru degradat testată și un plan de răspuns la incident de o pagină
Reglementări: NIS2 (cu verificarea încadrării), Legea nr. 58/2024, GDPR (art. 9 și art. 33-34),
              MDR/IVDR unde este cazul, ISO 27001 / ISO 27799 ca referință
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Sănătate
2. Subsector: furnizori privați de servicii medicale, sub 250 de angajați
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, personal clinic, personal administrativ, furnizor IT extern, DPO
5. Nivel: mixed
6. Format: platformă web
7. Scop principal: capability building și pregătire pentru continuitatea clinică în caz de incident
8. Reglementări: NIS2 / Legea 58/2024, GDPR, MDR/IVDR, ISO 27799
9. Constrângeri: fără personal IT intern, infrastructură administrată de furnizor extern,
                 software clinic care nu poate fi actualizat liber, buget redus
10. Rezultat urmărit: evaluare de maturitate + toolkit operațional + exerciții de continuitate clinică
```

---

## 10. Capcane de evitat

- **Tratarea dispozitivelor medicale ca endpoint-uri obișnuite.** Nu se patchează la discreție, nu se instalează agenți fără acordul producătorului. Trainingul trebuie să învețe controale compensatorii.
- **Presupunerea că „date de sănătate" înseamnă doar dosarul electronic.** Programările, rețetele, imagistica, facturarea și chiar lista de pacienți dintr-o zi sunt tot date privind sănătatea.
- **Confuzia între indisponibilitate și breșă.** Un ransomware poate fi ambele, sau doar una. Obligațiile de notificare diferă. Scenariile trebuie să forțeze această distincție.
- **Ignorarea lucrului degradat.** Orice modul de continuitate care nu ajunge la „ce facem pe hârtie în următoarele 8 ore" este incomplet pentru acest sector.
- **Exemple din spitale universitare americane.** Publicul este o clinică din România cu 40 de oameni. Exemplele trebuie să semene cu el.
