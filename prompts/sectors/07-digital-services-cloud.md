# RAMURA SECTORIALĂ 07 — DIGITAL SERVICES & CLOUD

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Sectorul este acoperit pe **două paliere**: Anexa I include infrastructura digitală (furnizori de servicii de cloud computing, centre de date, rețele de livrare de conținut, furnizori de servicii DNS, registre de nume TLD, furnizori de servicii de încredere, rețele și servicii de comunicații electronice) și **furnizorii de servicii gestionate de TIC și de servicii gestionate de securitate TIC (B2B)**; Anexa II include furnizorii digitali (piețe online, motoare de căutare, platforme de rețele sociale). Anumite categorii intră **indiferent de dimensiune**. Transpusă în România prin **Legea nr. 58/2024**; autoritate competentă și CSIRT: **DNSC**. | Cerință legală, frecvent aplicabilă |
| **Cyber Resilience Act** (Regulamentul (UE) 2024/2847) | Produse cu elemente digitale, inclusiv software comercializat. Direct relevant pentru firmele de software. Calendar etapizat — **verifică datele exacte în vigoare**. | Cerință legală pentru producători de software |
| **GDPR** | Rolul de persoană împuternicită pentru clienți; obligații contractuale (art. 28), asistență la notificarea breșelor, transferuri internaționale. | Cerință legală |
| **DORA** | Relevant indirect: un furnizor TIC către entități financiare intră sub cerințe contractuale DORA, iar unii furnizori pot fi desemnați critici. | Cerință contractuală, cu regim special pentru furnizorii critici |
| **eIDAS** | Pentru furnizorii de servicii de încredere. | Cerință legală pentru categoriile vizate |
| **ISO 27001 / ISO 27017 / ISO 27018 / SOC 2** | Așteptare de piață quasi-obligatorie în vânzarea B2B. | Standard / cerință contractuală de facto |

**Atenție:** acest sector este singurul din bibliotecă în care organizația este simultan **entitate reglementată** și **element de risc pentru alții**. Un MSP din România cu 25 de angajați poate fi în domeniul NIS2 ca furnizor de servicii gestionate, poate fi persoană împuternicită pentru 200 de clienți și poate fi furnizor TIC pentru o entitate financiară. Trainingul trebuie să acopere ambele perspective.

---

## 2. Profil operațional

**Procese critice:** dezvoltarea și livrarea de software · operarea infrastructurii clienților · suport și intervenții · gestionarea accesului la mediile clienților · backup și restaurare pentru clienți · onboarding și offboarding de clienți · gestionarea incidentelor la clienți.

**Sisteme tipice:** infrastructură cloud (conturi și abonamente proprii și ale clienților) · pipeline CI/CD · depozite de cod · registre de containere · instrumente de management la distanță (RMM) · sisteme de ticketing · manageri de parole și seifuri de secrete · instrumente de monitorizare · platforme de backup · medii de dezvoltare, test și producție · rețele VPN către clienți.

**Date procesate:** date ale clienților în mediile administrate · credențiale privilegiate pentru sistemele clienților · cod sursă și proprietate intelectuală · configurații și documentații de infrastructură · date de facturare.

**Dependențe critice:** furnizorii de cloud · registratorii de domenii · furnizorii de certificate · dependențele open-source din cod · furnizorul RMM și instrumentele de administrare · furnizorii de identitate · furnizorii de backup.

**Unde securitatea devine imediat operațională:** compromiterea acestei organizații nu afectează o organizație, ci pe toți clienții ei simultan. Este definiția unui incident de lanț de aprovizionare.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| Instrumente de administrare la distanță (RMM) | Critică | Compromitere, abuz | Cont unic de administrare, MFA absent, lipsa restricției de rețea | Compromiterea simultană a tuturor clienților | MFA rezistent la phishing, conturi nominale, restricții de acces, jurnalizare completă, alertare pe acțiuni în masă |
| Credențiale privilegiate ale clienților | Critică | Furt, abuz intern | Stocate în manager comun, fără rotație, partajate în echipă | Acces necontrolat la toți clienții | Seif de secrete, acces just-in-time, rotație automată, aprobare per sesiune |
| Pipeline CI/CD și depozite de cod | Critică | Injectare de cod, furt de secrete | Secrete în cod, tokenuri cu drepturi excesive, lipsa revizuirii obligatorii | Distribuirea de cod compromis către clienți | Revizuire obligatorie, scanare de secrete, tokenuri cu durată scurtă, semnarea artefactelor |
| Conturi de cloud (proprii și ale clienților) | Critică | Preluare, escaladare, configurare greșită | Roluri prea largi, conturi de urgență fără protecție, jurnalizare dezactivată | Compromitere de mediu, exfiltrare, costuri | Privilegii minime, separarea mediilor, jurnalizare centralizată, alertare pe modificări de politici |
| Dependențe open-source | Ridicată | Pachete compromise, typosquatting | Instalare fără fixarea versiunilor, fără inventar | Introducerea de cod malițios în produs | SBOM, fixarea versiunilor, verificare de integritate, actualizare controlată |
| Domenii, DNS și certificate | Critică | Preluare de domeniu, redirecționare | Registrator fără MFA, DNS administrat neglijent, expirări | Interceptare, indisponibilitate, pierderea încrederii | MFA și blocare la registrator, monitorizarea expirării, control al modificărilor DNS |
| Date ale clienților în medii administrate | Critică | Exfiltrare, ștergere | Separare insuficientă între clienți, acces larg al echipei | Breșă multi-client, răspundere contractuală | Izolare per client, acces pe bază de necesitate, jurnalizare, criptare |
| Backup-uri ale clienților | Critică | Criptare, ștergere | Aceleași credențiale ca producția | Pierderea capacității de a-i repune pe clienți în funcțiune | Credențiale separate, imuabilitate, teste de restaurare per client |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Compromiterea furnizorului pentru a ajunge la clienți | Actori avansați, criminalitate organizată | Phishing pe administratori, RMM, credențiale | RMM, credențiale, CI/CD | Initial Access, Valid Accounts, Supply Chain Compromise, Impact | Compromitere simultană a portofoliului de clienți | Medie, impact maxim | Acțiuni în masă în RMM, conectări din locații noi, script-uri rulate pe mai mulți clienți |
| Injectarea de cod în lanțul de build | Actori avansați | Dependență compromisă, token de CI furat, insider | CI/CD, artefacte | Supply Chain Compromise, Persistence | Distribuirea de produs compromis | Scăzută–medie, impact maxim | Build-uri fără corespondent în cod, modificări în configurația pipeline-ului |
| Furt de secrete și tokenuri | Criminalitate, automatizat | Secrete în depozite publice, infostealer pe stații de dezvoltare | Cloud, API-uri | Credential Access | Acces la medii de producție | Ridicată | Utilizarea tokenurilor din locații noi, apeluri API atipice |
| Preluarea contului de cloud | Criminalitate | Credential stuffing, MFA absent, roluri permisive | Infrastructură | Valid Accounts, Privilege Escalation | Exfiltrare, ștergere, cost, indisponibilitate | Medie–ridicată | Crearea de roluri noi, dezactivarea jurnalizării, resurse noi în regiuni neobișnuite |
| Ransomware asupra furnizorului | Criminalitate organizată | Phishing, perimetru | Toate, inclusiv backup-urile clienților | Initial Access, Lateral Movement, Impact | Oprirea tuturor clienților simultan | Medie–ridicată | Conturi privilegiate noi, ștergerea copiilor umbră |
| Insider cu acces privilegiat | Personal, contractori | Acces legitim | Date și medii ale clienților | Valid Accounts, Collection | Breșă multi-client, răspundere | Scăzută, impact ridicat | Acces la clienți fără ticket asociat, descărcări masive |
| Abuz de API și configurare greșită expusă | Automatizat, oportunist | Stocare publică, API fără autorizare | Date de client | Initial Access, Collection | Breșă tăcută, descoperită de terți | Ridicată | Scanări, acces din surse necunoscute, alerte de la cercetători |
| Preluare de domeniu sau DNS | Criminalitate | Registrator compromis, expirare | Domenii, email, certificate | Impact | Interceptare, pierderea totală a încrederii | Scăzută, impact ridicat | Modificări DNS neautorizate, avertismente de expirare ignorate |

---

## 5. Particularitatea IMM în acest sector

1. **Ești vectorul.** Un MSP sau o firmă de software mică e compromisă nu pentru ce are, ci pentru cine are ca clienți. Acest lucru trebuie spus direct, în primul modul, fără menajamente.
2. **Ai putere asimetrică.** Aceeași echipă de 6 oameni poate, cu o singură comandă, să modifice sistemele a 200 de organizații. Guvernanța accesului privilegiat nu e birocrație, e proporțională cu puterea deținută.
3. **Clienții tăi te vor audita.** Pe măsură ce NIS2 și DORA se maturizează, chestionarele și cerințele contractuale devin condiție de vânzare. Trainingul care produce capacitatea de a răspunde credibil are rentabilitate comercială directă.
4. **Viteza e cultura.** Într-o echipă de dezvoltare mică, orice control perceput ca frână va fi ocolit. Controalele trebuie proiectate ca parte din flux — revizuire în pull request, scanare în pipeline, secrete în seif — nu ca proces separat.
5. **Obligația față de clienți e contractuală și rapidă.** Termenul de notificare către un client este adesea mai scurt decât cel legal. Verifică-ți propriile contracte înainte de a construi procedura.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: RMM folosit pentru distribuție de ransomware**
MSP cu 22 de angajați și 180 de clienți. Sâmbătă la 04:00, mai mulți clienți raportează că stațiile sunt criptate. Se constată că scriptul a fost distribuit prin propriul instrument de administrare la distanță, de pe un cont de tehnician. Decizii: se oprește RMM-ul complet (pierzând și capacitatea de a ajuta clienții), cum se comunică celor 180 de clienți simultan, care clienți se restaurează primii și pe ce criteriu, care sunt obligațiile de notificare — proprii și ale clienților.

**Scenariul 2 — supply chain: dependență compromisă în produsul propriu**
O bibliotecă open-source folosită în produs primește o actualizare care conține cod malițios. Versiunea a fost inclusă în două lansări, livrate către 40 de clienți în ultimele 11 zile. Decizii: se anunță clienții înainte de a ști dacă au fost afectați, cum se determină cine a instalat versiunile, cum se retrag versiunile, ce se comunică public, ce obligații apar în raport cu Cyber Resilience Act pentru un produs cu elemente digitale.

**Scenariul 3 — criză și continuitate: contul de cloud principal, preluat**
Contul de cloud în care rulează infrastructura pentru toți clienții SaaS este preluat prin compromiterea unui cont de administrator fără MFA. Atacatorul creează roluri noi, dezactivează jurnalizarea și începe să șteargă resurse. Contul de urgență („break-glass") există, dar nimeni nu l-a testat de 14 luni și persoana care îi deține parola este în concediu. Decizii: cum se recâștigă controlul, ce se comunică clienților și când, cum se reconstituie ce s-a pierdut, ce se raportează.

---

## 7. Inject-uri sectoriale

1. `T+20 min` — Trei clienți sună simultan. **Decizie:** cine preia comunicarea și ce mesaj unic se folosește. **Testează:** existența unui plan de comunicare multi-client.
2. `T+40 min` — Echipa propune oprirea totală a RMM-ului. **Decizie:** se oprește, deși pierzi capacitatea de intervenție? **Testează:** compromisul dintre containment și capacitatea de răspuns.
3. `T+1h` — Un client mare, entitate financiară, cere formal notificarea conform contractului, în 4 ore. **Decizie:** ce se transmite în această fază. **Testează:** cunoașterea propriilor obligații contractuale.
4. `T+2h` — Se descoperă că un tehnician plecat acum 5 luni avea încă acces activ în seiful de secrete. **Decizie:** cum afectează investigația și ce se comunică. **Testează:** procedurile de offboarding.
5. `T+3h` — Un client întreabă dacă backup-urile lui sunt intacte. **Decizie:** se poate răspunde cu certitudine? **Testează:** separarea credențialelor de backup.
6. `T+5h` — Un jurnalist de tehnologie publică o întrebare pe rețelele sociale despre „un furnizor din România afectat". **Decizie:** se răspunde public. **Testează:** disciplina de comunicare.
7. `T+8h` — Trebuie stabilită ordinea de restaurare pentru 180 de clienți. **Decizie:** pe ce criteriu — mărime, contract, criticitate, ordine alfabetică? **Testează:** existența unei clasificări prealabile a clienților.
8. `T+14h` — Un client amenință cu rezilierea și cere despăgubiri. **Decizie:** cine gestionează relația și ce se promite. **Testează:** separarea rolurilor tehnice de cele comerciale în criză.
9. `T+24h` — DNSC solicită informații, având mai multe raportări convergente de la clienți. **Decizie:** ce se transmite, cum se coordonează cu raportările clienților. **Testează:** rolul de furnizor într-un incident sistemic.
10. `T+60h` — Se pune întrebarea dacă produsul livrat mai poate fi considerat sigur. **Decizie:** se emite o versiune nouă, se retrage, se notifică. **Testează:** responsabilitatea de producător, dincolo de cea de operator.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| MFA rezistent la phishing pe conturi privilegiate și pe RMM | conturi conforme / total conturi privilegiate × 100 | 100% |
| Acces la mediile clienților acordat just-in-time | sesiuni cu acces temporar și aprobat / total sesiuni × 100 | > 90% |
| Secrete detectate în depozite de cod | număr de secrete active descoperite la scanare | 0 |
| Clienți clasificați după criticitate și ordine de restaurare | clienți clasificați / total × 100 | 100% |
| Test al contului de urgență (break-glass) | teste documentate în ultimele 12 luni | ≥ 2 |
| SBOM disponibil pentru produsele livrate | produse cu SBOM actualizat / total produse × 100 | 100% |
| Timp până la notificarea clienților afectați | ore de la confirmarea impactului la notificare | sub termenul contractual cel mai scurt |
| Dezactivarea accesului la plecarea din firmă | conturi și secrete revocate în 24h / total plecări × 100 | 100% |
| Teste de restaurare per client | clienți cu restaurare testată în ultimele 12 luni / total × 100 | > 80% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Servicii digitale și cloud
Subsector: furnizori de servicii gestionate (MSP) și firme de software, 10-100 de angajați
Țară/regiune: România / Uniunea Europeană
Public țintă: management, echipa tehnică și de operare, dezvoltatori, suport,
              responsabil de conformitate, responsabil comercial
Nivel: intermediate / advanced
Durată totală: 2 zile
Format: hibrid, cu laborator tehnic
Număr participanți: 18
Scop principal: după training, organizația are guvernanță documentată a accesului privilegiat la
                clienți, o clasificare a clienților pentru ordinea de restaurare și o procedură
                testată de notificare multi-client
Reglementări: NIS2 / Legea nr. 58/2024 (adesea aplicabilă direct), CRA pentru produsele proprii,
              GDPR în rol de persoană împuternicită, cerințe DORA venite de la clienți financiari,
              ISO 27001 / SOC 2 ca așteptare de piață
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Servicii digitale și cloud
2. Subsector: MSP, furnizori SaaS, firme de dezvoltare software
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, operațiuni, dezvoltare, suport, conformitate, comercial
5. Nivel: intermediate / advanced
6. Format: platformă web cu laborator tehnic
7. Scop principal: reducerea riscului de a deveni vector de compromitere pentru clienți și
                   capacitatea de a demonstra conformitate în vânzarea B2B
8. Reglementări: NIS2 / Legea 58/2024, CRA, GDPR (art. 28), DORA pe cale contractuală, ISO 27001
9. Constrângeri: echipă mică cu putere administrativă mare, cultură orientată spre viteză,
                 dependență de instrumente terțe, portofoliu mare de clienți
10. Rezultat urmărit: capability building, exerciții multi-client, evaluare de maturitate, toolkit contractual
```

---

## 10. Capcane de evitat

- **Să tratezi organizația doar ca victimă.** Aici, organizația este și vector. Ambele perspective trebuie predate.
- **Să propui controale care încetinesc livrarea fără integrare în flux.** Vor fi ocolite în două săptămâni. Proiectează-le în pipeline.
- **Să confunzi rolul de operator cu cel de producător.** Obligațiile diferă: CRA vizează produsul, NIS2 vizează operarea. Un MSP care și dezvoltă software are ambele.
- **Să presupui că „e în cloud, deci e securizat".** Modelul de responsabilitate partajată trebuie predat explicit, cu exemple de ce rămâne în sarcina organizației.
- **Să ignori ordinea de restaurare.** Într-un incident multi-client, absența unei clasificări prealabile transformă răspunsul tehnic într-o criză comercială.
