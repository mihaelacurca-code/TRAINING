# RAMURA SECTORIALĂ 10 — PUBLIC ADMINISTRATION

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex, la DNSC și în legislația națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Administrația publică figurează în **Anexa I**, cu o particularitate importantă: directiva vizează entitățile administrației publice centrale, iar includerea entităților de la nivel regional și local este lăsată, în bună măsură, în marja de apreciere a statelor membre. **Domeniul concret pentru România se stabilește prin Legea nr. 58/2024 și actele subsecvente** — verifică textul în vigoare și listele/criteriile stabilite de autoritate. Autoritate competentă și CSIRT național: **DNSC**. | Cerință legală, cu domeniu stabilit național |
| **CER** (Directiva (UE) 2022/2557) | Poate viza entități publice desemnate ca entități critice. | Cerință legală, condiționată de desemnare |
| **GDPR** | Prelucrare pe scară largă de date ale cetățenilor, adesea în temeiuri de interes public. Obligația de a desemna un responsabil cu protecția datelor este regula pentru autoritățile publice. | Cerință legală |
| **eIDAS** | Identificare electronică și servicii de încredere în relația cu cetățeanul. | Cerință legală |
| **Legislația națională privind interoperabilitatea, guvernarea electronică și arhivarea electronică** | Cadru operațional direct relevant. **Verifică forma în vigoare.** | Cerință legală națională |
| **AI Act** (Regulamentul (UE) 2024/1689) | Relevant pentru sistemele algoritmice folosite în decizii administrative. **Verifică etapizarea aplicării.** | Cerință legală, etapizată |
| **ISO 27001 / NIST CSF / CIS Controls** | Referințe de structurare a programului de securitate. | Standard / bună practică |

**Atenție:** o primărie de comună cu 15 angajați și un liceu au realități complet diferite de cele ale unui minister, chiar dacă vocabularul reglementării este același. Nu genera conținut care presupune structuri inexistente. Verifică întotdeauna dacă entitatea-țintă intră efectiv în domeniul de aplicare și spune explicit când nu intră, dar are totuși obligații sub GDPR.

---

## 2. Profil operațional

**Procese critice:** furnizarea serviciilor către cetățeni · emiterea de acte și autorizații · încasarea taxelor și impozitelor locale · achiziții publice · evidența populației și a patrimoniului · salarizarea și resursele umane · registratura și circuitul documentelor · raportarea către instituții superioare · gestionarea situațiilor de urgență.

**Sisteme tipice:** sisteme de evidență fiscală locală · registratură electronică și management de documente · portaluri de servicii pentru cetățeni · sisteme de plată online a taxelor · sisteme de achiziții publice · sisteme de salarizare și resurse umane · GIS și urbanism · sisteme de stare civilă · email instituțional · site instituțional · rețele locale cu echipamente de vârste foarte diferite · supraveghere video urbană · sisteme de iluminat public inteligent, în unele cazuri.

**Date procesate:** date de identificare ale cetățenilor · date fiscale și de patrimoniu · date de stare civilă · date de asistență socială, frecvent sensibile · date de personal · documente de achiziții · informații cu regim special, în anumite cazuri.

**Dependențe critice:** furnizorii de software administrativ (adesea puțini la număr, cu poziție dominantă local) · furnizorul IT extern sau societatea de informatică a consiliului · sistemele naționale cu care se interconectează · furnizorul de internet, adesea unic în localitățile mici · furnizorul de găzduire a site-ului.

**Unde securitatea devine imediat operațională:** dacă sistemul de taxe este indisponibil, cetățenii nu pot plăti și nu pot obține acte. Serviciul public se oprește vizibil, iar presiunea politică este imediată.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| Sistem de evidență fiscală | Critică | Ransomware, manipulare, indisponibilitate | Server unic în sediu, backup pe aceeași rețea, acces de la distanță al furnizorului fără control | Oprirea încasărilor și a eliberării actelor | Backup offline testat, MFA pe accesul furnizorului, jurnalizare, procedură de lucru degradat |
| Registratură și arhivă electronică | Critică | Criptare, pierdere, alterare | Digitalizare fără copii, fără versionare | Pierderea trasabilității actelor administrative | Copii redundante, verificare de integritate, procedură de arhivare |
| Date de stare civilă și asistență socială | Critică | Exfiltrare, abuz, acces intern neautorizat | Acces larg, jurnalizare absentă, curiozitate internă | Breșă cu impact grav asupra persoanelor vulnerabile | Acces strict pe bază de necesitate, jurnalizare și revizuire, sancțiuni clare |
| Email instituțional | Critică | Phishing, BEC, uzurpare | Fără MFA, fără DMARC, adrese generice partajate | Fraudă în achiziții, mesaje false în numele instituției | MFA, DMARC în politică de respingere, conturi nominale |
| Portal de servicii pentru cetățeni | Ridicată | Defacement, DDoS, compromitere | Site pe platformă neactualizată, găzduire neadministrată | Pierderea încrederii, indisponibilitate publică | Actualizări, găzduire administrată, monitorizare, plan de restaurare |
| Achiziții publice | Critică | Fraudă, manipulare de documente, BEC | Documente prin email, fără verificare a modificărilor | Prejudiciu bugetar, litigii, răspundere | Canale oficiale, verificare pe canal secundar, separarea funcțiilor |
| Conturi privilegiate și acces al furnizorilor | Critică | Abuz, compromitere | Conturi comune, acces permanent, fără jurnalizare | Compromitere completă, greu de atribuit | Conturi nominale, acces temporar aprobat, înregistrarea sesiunilor |
| Backup | Critică | Criptare, pierdere | Copie unică, în aceeași clădire, netestată | Pierdere definitivă de date publice | 3-2-1, copie în altă locație, test documentat |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Ransomware asupra sistemelor administrative | Criminalitate organizată | Phishing, RDP expus, furnizor | Evidență fiscală, registratură, arhivă | Initial Access, Lateral Movement, Impact | Oprirea serviciilor publice, pierdere de date, presiune politică | Ridicată | Conturi noi privilegiate, dezactivarea protecției, ștergerea copiilor umbră |
| Phishing și uzurpare a identității instituției | Criminalitate, hacktivism | Domenii similare, lipsa DMARC | Email, încrederea cetățenilor | Initial Access, Impact | Fraudă asupra cetățenilor, prejudiciu de imagine | Foarte ridicată | Semnalări ale cetățenilor, domenii nou înregistrate similare |
| Defacement și DDoS | Hacktivism | Site expus, platformă neactualizată | Portal, site | Impact | Vizibilitate publică negativă, pierderea canalului | Medie–ridicată | Revendicări publice, scanări, creșteri de trafic |
| Fraudă în achiziții publice (BEC) | Criminalitate financiară | Email compromis, documente modificate | Buget, achiziții | Initial Access, Impact | Prejudiciu bugetar, răspundere administrativă și penală | Ridicată | Schimbări de IBAN, documente retrimise „corectate", presiune de urgență |
| Exfiltrarea datelor cetățenilor | Criminalitate, actori statali | Acces persistent, baze expuse, furnizor | Date de stare civilă, fiscale, sociale | Collection, Exfiltration | Breșă cu impact asupra unui număr mare de persoane | Medie | Interogări masive, arhive create, trafic ieșit atipic |
| Spionaj și acces persistent | Actori statali sau sponsorizați | Phishing țintit, vulnerabilități de perimetru, furnizor | Documente, comunicații interne | Persistence, Collection | Compromitere de durată, exfiltrare tăcută | Scăzută–medie, în funcție de nivelul entității | Conexiuni la ore atipice, instrumente de administrare folosite neobișnuit |
| Acces intern neautorizat din curiozitate | Personal | Acces legitim, absența jurnalizării | Date de cetățeni | Valid Accounts | Breșă, încălcarea încrederii publice, sancțiune | Ridicată | Consultări fără temei procedural, tipare de acces la persoane publice sau cunoscute |
| Compromiterea furnizorului de software administrativ | Criminalitate, actori avansați | Acces de mentenanță, actualizare | Toate sistemele | Supply Chain Compromise | Compromitere simultană a mai multor instituții | Medie | Intervenții neanunțate, modificări nedocumentate |

---

## 5. Particularitatea IMM-ului echivalent în acest sector

Pentru administrația publică, echivalentul IMM-ului este **primăria de comună sau de oraș mic, școala, spitalul orășenesc, serviciul public local**. Trăsături specifice:

1. **O singură persoană „se ocupă de calculatoare".** Adesea are și alte atribuții, adesea nu are formare în securitate, adesea este singurul care știe parolele. Riscul de persoană unică este structural și trebuie tratat ca atare.
2. **Achiziția publică dictează ritmul.** Nu poți cumpăra rapid, nu poți schimba furnizorul ușor, iar criteriul prețului cel mai scăzut modelează ce se poate obține. Trainingul trebuie să predea **cum se scrie cerința de securitate în caietul de sarcini** — este pârghia cea mai eficientă disponibilă.
3. **Furnizorul are poziție dominantă local.** Software-ul administrativ vine, adesea, de la un număr mic de furnizori. Dependența este reală și trebuie gestionată contractual, nu tehnic.
4. **Vizibilitatea publică amplifică orice incident.** Un site defăcut al unei primării devine știre națională; același lucru într-o firmă privată trece neobservat. Comunicarea de criză are o greutate disproporționată.
5. **Cetățeanul nu are alternativă.** Spre deosebire de un client privat, cetățeanul nu poate alege alt furnizor de serviciu public. Continuitatea are, aici, o dimensiune de echitate, nu doar comercială.
6. **Bugetul este public și rigid.** Măsurile fără cost și cele integrabile în achiziții existente au valoare disproporționată față de orice recomandare care presupune o investiție nouă.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: ransomware în primărie, luni dimineața**
Primărie de oraș mic, 60 de angajați, un informatician. Luni la 08:15 nu funcționează nici evidența fiscală, nici registratura. La ghișee se formează coadă. Backup-ul se face pe un disc extern conectat permanent la același server. Decizii: se comunică public sau se încearcă rezolvarea discretă, cum se emit actele urgente, cum se preiau plățile, cine notifică DNSC și ANSPDCP și în ce termen, ce se comunică consiliului local și presei.

**Scenariul 2 — supply chain: furnizorul de software administrativ, compromis**
Furnizorul care deservește 30 de unități administrative din județ anunță un incident de securitate care ar fi putut afecta conexiunile de mentenanță. Alte două primării raportează deja comportamente anormale. Decizii: se suspendă accesul furnizorului (fără de care sistemul nu poate fi operat), cum se verifică independent, cum se coordonează cu celelalte instituții afectate și cu DNSC, ce se comunică cetățenilor, ce se schimbă în contractul următor.

**Scenariul 3 — criză și continuitate: expunerea datelor de asistență socială**
Un jurnalist anunță că a primit un fișier cu date privind beneficiarii de ajutor social din localitate: nume, adrese, situație familială, venituri, uneori informații privind sănătatea. Fișierul pare exportat din sistemul propriu. Nu există jurnalizare a exporturilor. Decizii: notificarea ANSPDCP, informarea persoanelor vizate — persoane în situații vulnerabile, care pot fi expuse unui risc real —, cum se stabilește sursa, ce se comunică public, cum se restabilește încrederea.

---

## 7. Inject-uri sectoriale

1. `T+20 min` — La ghișee sunt 40 de persoane, unele venite din alte localități. **Decizie:** se închide programul cu publicul sau se lucrează pe hârtie. **Testează:** existența unei proceduri de serviciu degradat.
2. `T+40 min` — Un consilier local cere explicații și amenință cu o postare publică. **Decizie:** cine comunică cu aleșii și ce se spune. **Testează:** separarea comunicării politice de gestionarea incidentului.
3. `T+1h` — Informaticianul, singura persoană care cunoaște infrastructura, este în concediu medical. **Decizie:** cum se procedează. **Testează:** riscul de persoană unică și existența documentației.
4. `T+2h` — Furnizorul cere acces de administrator și plata unei intervenții de urgență, neprevăzută în contract. **Decizie:** se aprobă? cum, în regim de achiziție publică? **Testează:** pregătirea pentru achiziții în situații de urgență.
5. `T+3h` — Un cetățean anunță că a primit un email „de la primărie" prin care i se cere plata unei taxe pe un cont nou. **Decizie:** se emite un anunț public? **Testează:** recunoașterea fraudei oportuniste și protecția cetățeanului.
6. `T+5h` — Presa locală solicită un punct de vedere. **Decizie:** cine răspunde și ce se declară când încă nu se cunoaște amploarea. **Testează:** comunicarea publică sub incertitudine.
7. `T+8h` — Se constată că ultimul backup verificat are 4 luni. **Decizie:** cum se procedează și ce se comunică. **Testează:** consecințele lipsei testelor de restaurare.
8. `T+24h` — DNSC solicită informații preliminare. **Decizie:** cine este punctul de contact și ce se transmite. **Testează:** existența unui responsabil desemnat, nu improvizat.
9. `T+36h` — Se descoperă că un cont al unui fost angajat, plecat acum doi ani, a fost folosit pentru acces. **Decizie:** consecințe și măsuri imediate. **Testează:** disciplina de gestionare a conturilor.
10. `T+72h` — Consiliul local cere un raport și măsuri. **Decizie:** ce se prezintă, ce se solicită bugetar. **Testează:** transformarea incidentului în decizie de investiție, cu argumente.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| MFA pe email instituțional și pe accesul de la distanță | conturi cu MFA / total × 100 | 100% |
| DMARC în politică de respingere pe domeniul instituției | da / nu | da |
| Backup offline testat | restaurări complete reușite în ultimele 12 luni | ≥ 2 |
| Conturi active ale persoanelor care nu mai lucrează în instituție | număr | 0 |
| Cerințe de securitate incluse în caietele de sarcini pentru achiziții IT | achiziții cu cerințe / total achiziții IT × 100 | 100% |
| Sesiuni de mentenanță ale furnizorilor, aprobate și jurnalizate | sesiuni conforme / total × 100 | 100% |
| Jurnalizarea accesului la date de cetățeni și revizuirea ei | luni cu revizuire documentată / 12 | 12 |
| Timp până la comunicarea publică în caz de indisponibilitate a serviciilor | ore de la confirmare la anunț | < 4 h |
| Documentarea infrastructurii, accesibilă unei a doua persoane | există / nu există | există, verificat anual |
| Personal instruit în ultimele 12 luni | angajați instruiți / total × 100 | > 90% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Administrație publică
Subsector: administrație publică locală — primării de oraș și de comună, servicii publice locale
Țară/regiune: România / Uniunea Europeană
Public țintă: primar și secretar general, șefi de compartimente, personal de la ghișee și registratură,
              compartiment financiar și achiziții, informaticianul instituției, responsabil cu
              protecția datelor
Nivel: mixed, predominant beginner pe partea tehnică
Durată totală: 1 zi + sesiune separată pentru conducere
Format: fizic
Număr participanți: 25
Scop principal: după training, instituția poate furniza serviciile esențiale 48 de ore fără sisteme
                informatice, are backup offline testat și include cerințe de securitate în achizițiile IT
Reglementări: NIS2 / Legea nr. 58/2024 (verifică încadrarea concretă a entității), GDPR,
              eIDAS, legislația națională privind guvernarea electronică și arhivarea
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Administrație publică
2. Subsector: administrație locală și instituții publice subordonate
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: conducere, personal operativ, achiziții, informaticieni, responsabili cu protecția datelor
5. Nivel: mixed
6. Format: platformă web
7. Scop principal: continuitatea serviciului public și conformitate cu cadrul național și european
8. Reglementări: NIS2 / Legea 58/2024, GDPR, eIDAS, legislație națională de guvernare electronică
9. Constrângeri: o singură persoană cu atribuții IT, buget rigid și public, dependență de furnizori
                 cu poziție dominantă, achiziție publică lentă, infrastructură eterogenă
10. Rezultat urmărit: pregătire operațională, conformitate, exerciții de serviciu degradat,
                      toolkit de achiziții cu cerințe de securitate, evaluare de maturitate
```

---

## 10. Capcane de evitat

- **Să presupui că NIS2 se aplică automat oricărei primării.** Domeniul concret pentru nivelul local se stabilește prin legislația națională. Verifică și spune ce știi cu certitudine și ce trebuie confirmat.
- **Să propui măsuri care presupun buget disponibil imediat.** Bugetul public nu funcționează așa. Prioritizează măsurile fără cost și pe cele care intră în achiziții deja planificate.
- **Să ignori pârghia caietului de sarcini.** Este cel mai puternic instrument de securitate disponibil unei instituții publice mici, și aproape niciodată predat.
- **Să tratezi riscul de persoană unică drept detaliu.** În administrația locală, este riscul principal. Documentarea și a doua persoană sunt măsuri de securitate, nu de resurse umane.
- **Să folosești exemple din ministere pentru o comună.** Scara diferă cu trei ordine de mărime. Exemplele trebuie să semene cu publicul din sală.
- **Să neglijezi dimensiunea de echitate.** Datele de asistență socială privesc persoane vulnerabile; o breșă are consecințe reale asupra lor, nu doar administrative.
