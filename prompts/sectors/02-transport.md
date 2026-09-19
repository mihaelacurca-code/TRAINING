# RAMURA SECTORIALĂ 02 — TRANSPORT

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Transportul figurează în Anexa I — sectoare de înaltă criticitate, cu subsectoarele aerian, feroviar, naval și rutier. Transpusă în România prin **Legea nr. 58/2024**; autoritate competentă și CSIRT național: **DNSC**. | Cerință legală, condiționată de încadrare |
| **CER** (Directiva (UE) 2022/2557) | Reziliența entităților critice, inclusiv fizică. Complementară NIS2: aceeași entitate poate avea obligații în ambele regimuri. | Cerință legală, condiționată de desemnare |
| **EASA Part-IS** (Regulamentele (UE) 2022/1645 și 2023/203) | Managementul securității informației pentru organizațiile din aviație. | Cerință legală pentru organizațiile vizate |
| **IMO** — rezoluția privind managementul riscului cibernetic maritim și ghidurile aferente | Integrarea riscului cibernetic în sistemul de management al siguranței (ISM). | Cerință în regimul maritim |
| **ISPS Code** | Securitatea navelor și a facilităților portuare; interfață cu securitatea cibernetică. | Cerință legală în regimul maritim |
| **CEN/CENELEC TS 50701** | Securitate cibernetică pentru aplicații feroviare. | Standard / bună practică |
| **IEC 62443** | Securitate pentru sisteme de automatizare și control industrial (semnalizare, terminale, manipulare de marfă). | Standard / bună practică |
| **GDPR** | Date ale pasagerilor, geolocalizare, telematică de flotă, supraveghere video. | Cerință legală |

**Atenție:** o firmă de transport rutier de marfă cu 30 de camioane este, în marea majoritate a cazurilor, **în afara** domeniului NIS2 prin praguri de dimensiune — dar este un furnizor critic pentru clienți care sunt în domeniu, iar cerințele ajung la ea **pe cale contractuală**. Trainingul trebuie să explice exact acest mecanism.

---

## 2. Profil operațional

**Procese critice:** planificarea rutelor și a curselor · alocarea vehiculelor și a echipajelor · urmărirea transporturilor · manipularea și trasabilitatea mărfii · emiterea documentelor de transport · vămuire · ticketing și rezervări · mentenanță · dispecerat · semnalizare și control al traficului (feroviar, portuar, aeroportuar).

**Sisteme tipice:** TMS (Transport Management System) · WMS în terminale și depozite · sisteme de ticketing și rezervări · telematică de flotă și tahografe digitale · GPS/AIS/ADS-B · sisteme de semnalizare și control (OT) · sisteme de manipulare a containerelor · sisteme de gestiune a porților și barierelor · EDI cu clienții și autoritățile vamale · aplicații mobile pentru șoferi.

**Date procesate:** date de pasageri (inclusiv PNR, unde este cazul) · date de plată · geolocalizare · date de personal (ore de conducere, odihnă) · documente comerciale și vamale · date despre marfă, uneori sensibile comercial.

**Dependențe critice:** furnizorul TMS · furnizorul de telematică · operatorul portuar/aeroportuar/de infrastructură · sistemele vamale naționale · GNSS · conectivitate mobilă pentru flotă · brokeri și case de expediții · platforme de licitare a curselor.

**Unde securitatea devine imediat operațională:** dacă TMS-ul sau EDI-ul cad, marfa se oprește fizic. Într-un terminal, indisponibilitatea sistemului de manipulare înseamnă coadă de camioane la poartă în 30 de minute.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| TMS / dispecerat | Critică | Ransomware, indisponibilitate | Server unic, acces de la distanță fără MFA, backup local | Oprirea planificării și a livrărilor | MFA, backup offline, procedură de dispecerat degradat |
| EDI / integrări cu clienți și vamă | Critică | Compromitere, manipulare de mesaje | Conturi de serviciu cu parole vechi, lipsa validării | Blocarea fluxului de marfă, erori de vămuire | Rotația credențialelor, validare, monitorizarea eșecurilor |
| Telematică de flotă | Ridicată | Compromiterea platformei, urmărire neautorizată | Platformă administrată de furnizor, parole implicite pe unități | Expunerea rutelor, facilitarea furtului de marfă | Verificarea furnizorului, MFA administrativ, limitarea accesului la date de rută |
| Sisteme OT (semnalizare, porți, manipulare) | Critică | Compromitere, indisponibilitate | Rețea comună cu IT, acces de la distanță al integratorului, echipamente vechi | Oprirea operațiunilor, risc de siguranță | Segmentare strictă IT/OT, acces de la distanță controlat, inventar |
| Ticketing și rezervări | Ridicată | DDoS, fraudă, exfiltrare | Expunere publică, integrare cu procesatori de plăți | Pierdere de venit, breșă de date de plată | Limitare de rată, WAF, conformitate cu cerințele de plată |
| Identități și acces | Critică | Credential theft, phishing | Conturi partajate în dispecerat, personal cu fluctuație mare | Acces neautorizat la operațiuni | Conturi nominale, dezactivare rapidă la plecare, MFA |
| Documente de transport și vamale | Ridicată | Fraudă, alterare | Trimitere prin email neprotejat, documente scanate stocate necontrolat | Fraudă de marfă, probleme vamale | Canale controlate, semnătură electronică unde e posibil |
| Backup | Critică | Criptare, ștergere | Copie unică, pe aceeași rețea | Imposibilitatea reluării | 3-2-1, copie imuabilă, test documentat |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Ransomware asupra dispeceratului | Criminalitate organizată | Phishing, RDP/VPN expus, vulnerabilitate de perimetru | TMS, backup | Initial Access, Lateral Movement, Impact | Oprirea curselor, penalități contractuale | Ridicată | Conturi noi de administrator, dezactivarea protecției, trafic ieșit masiv |
| Fraudă pe marfă facilitată cibernetic | Grupuri specializate în furt de marfă | Compromiterea emailului brokerului, acces la platforme de licitare, date de rută | Email, telematică, TMS | Initial Access, Collection, Impact | Pierderea fizică a mărfii | Ridicată | Cereri de modificare a punctului de livrare, transportatori noi fără istoric, presiune de urgență |
| BEC pe plăți și expediții | Criminalitate financiară | Email compromis, domenii similare | Financiar, operațiuni | Initial Access, Impact | Pierdere financiară directă | Ridicată | Schimbări de IBAN, reguli de redirecționare, comunicare mutată pe alt canal |
| Compromiterea furnizorului de software de transport | Actori avansați, criminalitate | Acces de mentenanță, actualizare compromisă | Toate sistemele operaționale | Supply Chain Compromise, Persistence | Compromiterea simultană a mai multor operatori | Medie | Conexiuni de mentenanță neanunțate, modificări nedocumentate |
| Atac asupra OT în terminal / infrastructură | Actori avansați, hacktivism | Punte IT→OT, acces al integratorului | Semnalizare, manipulare, porți | Lateral Movement, Inhibit Response Function, Impact | Oprirea operării, risc de siguranță | Medie | Trafic neobișnuit spre segmentul OT, comenzi în afara programului |
| Interferență GNSS (bruiaj/spoofing) | Actori statali, contextual | Mediu radio | Navigație, telematică | — (în afara ATT&CK Enterprise) | Pierderea poziționării, devieri | Variabilă, în funcție de zonă | Poziții inconsistente, salturi de coordonate, pierderea fixului |
| DDoS pe canale publice | Hacktivism, extorcare | Expunere publică | Ticketing, site, API | Impact | Pierdere de venit, imagine | Medie | Creșteri bruște de trafic, degradare |

> Interferența GNSS se tratează ca risc operațional real în anumite zone geografice, cu proceduri de navigație alternativă. Nu o prezenta ca fiind un atac informatic asupra flotei — mecanismul este diferit și confuzia strică credibilitatea trainingului.

---

## 5. Particularitatea IMM în acest sector

1. **Operațiunea nu se oprește niciodată.** Camioanele sunt pe drum, navele în port, cursele programate. Nu există „fereastră de mentenanță" comodă și nici răgaz de o zi pentru investigație. Procedurile de răspuns trebuie scrise pentru execuție în paralel cu operarea.
2. **Personal distribuit și cu fluctuație mare.** Șoferi, dispeceri, operatori de terminal — mulți, mobili, cu acces din teren, adesea de pe dispozitive personale. Modulul de igienă cibernetică trebuie construit pentru telefon, nu pentru birou.
3. **Presiunea contractuală vine înaintea legii.** Pentru o firmă mică de transport, primul motiv real de a se ocupa de securitate este chestionarul primit de la un client mare. Folosește asta: construiește trainingul în jurul capacității de a răspunde credibil la acel chestionar.
4. **Marfa e ținta, nu datele.** Spre deosebire de alte sectoare, aici atacul cibernetic e adesea un mijloc pentru un furt fizic. Scenariile trebuie să reflecte asta.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: TMS criptat luni la 05:00**
Firmă de transport rutier internațional, 45 de angajați, 60 de camioane. La 05:00 dispecerul nu poate deschide planificarea. 38 de curse sunt în derulare, 12 trebuie încărcate până la 08:00. Nu există listă pe hârtie a curselor. Decizii: cum se reconstituie planificarea, cum se contactează șoferii, ce se spune clienților, dacă se plătește, când și cui se notifică.

**Scenariul 2 — supply chain: platforma de telematică a furnizorului, compromisă**
Furnizorul de telematică anunță că un terț a obținut acces la consola de administrare a mai multor clienți, cu posibilitatea de a vizualiza rutele istorice și în timp real. În aceeași săptămână, două transporturi de valoare mare sunt jefuite în puncte de oprire obișnuite. Decizii: se suspendă serviciul, cum se schimbă rutele și punctele de oprire, ce se comunică clienților și asigurătorului, cum se colaborează cu poliția, ce se cere contractual furnizorului.

**Scenariul 3 — criză și continuitate: terminal blocat 48 de ore**
Un terminal intermodal își pierde sistemul de gestiune a porții și de poziționare a containerelor. Camioanele se acumulează, operatorii feroviari întârzie, clienții cer explicații. Nu se știe încă dacă este atac sau defecțiune. Decizii: operare manuală, prioritizarea mărfurilor perisabile și periculoase, comunicare cu autoritățile portuare/vamale, momentul declarării incidentului, reconstrucția trasabilității containerelor după restaurare.

---

## 7. Inject-uri sectoriale

1. `T+20 min` — Trei șoferi sună că aplicația de pe telefon nu mai primește comenzi de transport. **Decizie:** se trece pe comunicare telefonică și pe ce listă? **Testează:** existența unui plan de dispecerat degradat.
2. `T+45 min` — Un client mare cere confirmare scrisă că transportul lui nu e afectat. **Decizie:** ce se confirmă când încă nu știi. **Testează:** comunicarea onestă sub incertitudine.
3. `T+1h 15` — Vama respinge o declarație pentru că datele transmise prin EDI sunt inconsistente. **Decizie:** se oprește fluxul EDI complet? **Testează:** înțelegerea dependențelor externe.
4. `T+2h` — Un broker trimite prin email o schimbare urgentă a punctului de descărcare pentru un transport de valoare. **Decizie:** se execută? cum se verifică? **Testează:** procedura de verificare pe canal secundar.
5. `T+4h` — Asigurătorul întreabă dacă incidentul afectează acoperirea pentru marfa în tranzit. **Decizie:** cine răspunde și pe ce bază. **Testează:** cunoașterea propriilor polițe.
6. `T+6h` — Un dispecer recunoaște că a folosit același cont cu un coleg de pe tura anterioară. **Decizie:** cum afectează investigația. **Testează:** consecințele conturilor partajate, fără a transforma momentul în vânătoare de vinovați.
7. `T+10h` — Furnizorul TMS cere acces VPN cu drepturi extinse pentru remediere. **Decizie:** se acordă, cu ce limitări și ce jurnalizare. **Testează:** controlul accesului furnizorului.
8. `T+18h` — Apare o postare pe un grup profesional cu numele firmei și „au fost sparți, nu mai lucrați cu ei". **Decizie:** răspuns public sau nu. **Testează:** disciplina comunicării.
9. `T+30h` — Un transport de valoare mare nu mai răspunde la telematică de 40 de minute. **Decizie:** se tratează ca incident de securitate sau ca furt în desfășurare? cine se anunță? **Testează:** legătura dintre cibernetic și fizic.
10. `T+50h` — Un client solicită dovada că datele lui comerciale nu au fost exfiltrate. **Decizie:** ce dovezi există. **Testează:** existența jurnalizării înainte de incident.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Curse reconstituibile fără sisteme | curse cu copie offline accesibilă / total curse active × 100 | 100% |
| Timp până la dispecerat degradat funcțional | minute de la pierderea TMS până la operare pe procedură alternativă | < 60 min |
| MFA pe accesul la TMS, telematică și email | conturi cu MFA / total conturi × 100 | 100% |
| Verificare pe canal secundar a modificărilor de livrare și plată | modificări verificate / total modificări solicitate prin email × 100 | 100% |
| Separare IT/OT în terminale | segmente OT fără rută directă către IT / total segmente OT × 100 | 100% |
| Dezactivarea conturilor la plecarea din firmă | conturi dezactivate în 24h / total plecări × 100 | 100% |
| Chestionare de securitate primite de la clienți, la care există răspuns documentat | răspunsuri complete / chestionare primite × 100 | 100% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Transport
Subsector: transport rutier de marfă și expediții, firme cu 20-250 de angajați
Țară/regiune: România / Uniunea Europeană
Public țintă: management, dispecerat, personal administrativ și financiar, șoferi,
              persoana cu atribuții IT sau furnizorul extern
Nivel: mixed
Durată totală: 1 zi + o sesiune separată de exercițiu
Format: hibrid
Număr participanți: 25
Scop principal: după training, firma poate opera 24 de ore fără sistemele informatice și poate
                răspunde documentat la chestionarele de securitate ale clienților mari
Reglementări: NIS2 (cu verificarea încadrării; adesea aplicabilă indirect, prin contracte),
              Legea nr. 58/2024, GDPR, cerințe contractuale ale clienților
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Transport
2. Subsector: transport rutier, expediții și terminale intermodale mici și mijlocii
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, dispecerat, operațiuni, financiar, personal din teren, furnizori IT
5. Nivel: mixed
6. Format: platformă web, cu zonă mobilă pentru personalul din teren
7. Scop principal: continuitate operațională și capacitate de răspuns la cerințele clienților mari
8. Reglementări: NIS2 / Legea 58/2024, CER unde este cazul, GDPR, cerințe contractuale
9. Constrângeri: operare non-stop, personal distribuit și cu fluctuație, fără IT intern, buget redus
10. Rezultat urmărit: pregătire operațională, exerciții de continuitate, toolkit, evaluare de maturitate
```

---

## 10. Capcane de evitat

- **Să tratezi transportul ca pe un singur sector.** Aerian, feroviar, naval și rutier au regimuri de reglementare, sisteme și culturi complet diferite. Alege subsectorul înainte de a genera conținut.
- **Să ignori legătura cibernetic–fizic.** Aici, un incident informatic devine frecvent un furt de marfă. Scenariile care se opresc la „datele au fost criptate" ratează esențialul.
- **Să presupui infrastructură IT clasică în OT.** Sistemele de semnalizare și manipulare nu se tratează ca servere de birou.
- **Să vorbești despre GNSS jamming ca despre un „hack".** Explică mecanismul corect sau lasă-l deoparte.
- **Să construiești modulul de igienă pentru birou.** Publicul e pe telefon, în cabină, în port, la poartă.
