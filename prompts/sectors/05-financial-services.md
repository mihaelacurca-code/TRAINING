# RAMURA SECTORIALĂ 05 — FINANCIAL SERVICES

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex, la ASF, BNR și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **DORA** (Regulamentul (UE) 2022/2554) | Reziliența operațională digitală pentru entitățile financiare. Se aplică de la **17 ianuarie 2025**. Acoperă managementul riscului TIC, raportarea incidentelor majore legate de TIC, testarea rezilienței operaționale digitale, managementul riscului furnizorilor terți de TIC și schimbul de informații. Include și entități mici: instituții de plată, IFN-uri, brokeri de asigurare, administratori de fonduri — cu **principiul proporționalității** și un cadru simplificat pentru anumite categorii. | Cerință legală, direct aplicabilă |
| **NIS2** (Directiva (UE) 2022/2555) | Bancar și infrastructuri ale pieței financiare figurează în Anexa I, dar **DORA funcționează ca lex specialis** pentru cerințele de management al riscului TIC și de raportare a incidentelor la entitățile financiare vizate. Verifică atent articulația celor două regimuri pentru entitatea concretă. | Cerință legală, cu raport de specialitate față de DORA |
| **PSD2** (Directiva (UE) 2015/2366) și standardele tehnice aferente | Autentificare strictă a clienților, securitatea plăților, raportarea incidentelor operaționale și de securitate. | Cerință legală pentru prestatorii de servicii de plată |
| **GDPR** | Date financiare, date de identificare, profilare, scoring. | Cerință legală |
| **AMLD / legislația de prevenire a spălării banilor** | Intersecție cu frauda și cu raportarea tranzacțiilor suspecte. | Cerință legală |
| **PCI DSS** | Securitatea datelor de card, pentru cine procesează, stochează sau transmite date de card. | Cerință contractuală de schemă, nu lege |
| **ISO 27001 / ISO 22301** | Management al securității informației și al continuității. | Standard, frecvent așteptat de supraveghetor |
| **AI Act** (Regulamentul (UE) 2024/1689) | Relevant pentru scoring de credit și alte utilizări cu risc ridicat. **Verifică etapizarea aplicării.** | Cerință legală, etapizată |

**Atenție:** acesta este singurul sector din bibliotecă în care regimul de reglementare este **mai strict decât intuiția obișnuită despre IMM-uri**. O instituție de plată cu 30 de angajați are obligații DORA reale. Nu construi conținut care sugerează că dimensiunea mică atrage automat cerințe reduse — atrage proporționalitate, ceea ce este altceva.

---

## 2. Profil operațional

**Procese critice:** onboarding și KYC · inițierea și procesarea plăților · decontare și reconciliere · creditare și scoring · administrarea conturilor · raportare către supraveghetor · gestionarea fraudei · custodie și administrare de active.

**Sisteme tipice:** core banking sau sistem de evidență · sisteme de plăți și conectori către infrastructuri de decontare · platforme de internet și mobile banking · API-uri de open banking · sisteme antifraudă · sisteme AML și de screening · CRM · data warehouse și raportare · sisteme de tranzacționare · soluții de semnătură electronică și identificare la distanță.

**Date procesate:** date de identificare, date financiare, tranzacții, date de card, scoruri și decizii automate, date de conformitate, înregistrări ale convorbirilor.

**Dependențe critice:** furnizorul de core banking (adesea unic, adesea cloud) · procesatorii de plăți și de carduri · furnizorii de identificare la distanță · infrastructuri de decontare · furnizorii de cloud · agențiile de raportare a creditelor · furnizorii de servicii antifraudă.

**Unde securitatea devine imediat operațională:** indisponibilitatea plăților este vizibilă public în minute; frauda produce pierdere directă; un incident major legat de TIC declanșează obligații de raportare cu termene scurte.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| Sistem de evidență / core | Critică | Ransomware, indisponibilitate, manipulare | Dependență de un furnizor unic, acces privilegiat al furnizorului, testare de restaurare insuficientă | Oprirea serviciului, pierderea integrității evidențelor | Registru al furnizorilor TIC, drepturi contractuale de audit și de ieșire, teste de restaurare documentate |
| Canale de plată și API-uri | Critică | Fraudă, abuz de API, DDoS | Limitare de rată insuficientă, autorizare slabă, chei expuse | Fraudă, indisponibilitate, sancțiune | Autentificare strictă, limitare de rată, monitorizarea anomaliilor, rotația cheilor |
| Conturi privilegiate și de administrare | Critică | Credential theft, abuz intern | Lipsa separării funcțiilor, conturi de serviciu cu drepturi excesive | Fraudă internă, compromitere completă | Separarea funcțiilor, dublă aprobare, MFA rezistent la phishing, jurnalizare |
| Date de client și de card | Critică | Exfiltrare, extorcare | Stocare excesivă, tokenizare parțială, medii de test cu date reale | Sancțiune, pierderea încrederii, fraudă în lanț | Minimizare, tokenizare, interdicția datelor reale în test |
| Sisteme antifraudă și AML | Critică | Ocolire, manipulare de praguri | Reguli învechite, praguri modificabile fără control | Fraudă nedetectată, neconformitate | Control al modificărilor, revizuire periodică, alertare la schimbarea pragurilor |
| Canale de comunicare cu clienții | Ridicată | Phishing în numele instituției, vishing | Lipsa DMARC, canale neclare pentru client | Fraudă asupra clienților, prejudiciu de imagine | SPF/DKIM/DMARC în politică de respingere, educarea clienților, canal unic de verificare |
| Jurnale și dovezi | Critică | Ștergere, insuficiență | Retenție scurtă, jurnale nesincronizate | Imposibilitatea investigării și a raportării | Retenție definită, sincronizare de timp, stocare protejată la modificare |
| Furnizori TIC critici | Critică | Concentrare, compromitere, ieșire bruscă | Contracte fără clauze DORA, lipsa strategiei de ieșire | Indisponibilitate prelungită, neconformitate | Registru de informații, clauze contractuale, plan de ieșire testat |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Fraudă prin inginerie socială asupra clienților | Criminalitate organizată | Vishing, smishing, pagini false, deepfake vocal | Conturi de client, canale de plată | Initial Access (asupra clientului), Impact | Pierdere pentru client și pentru instituție, litigii | Foarte ridicată | Vârfuri de plăți către beneficiari noi, dispozitive noi, tipare de sesiune atipice |
| Compromiterea furnizorului TIC critic | Actori avansați, criminalitate | Acces de administrare, actualizare, cloud partajat | Core, plăți, date | Supply Chain Compromise, Valid Accounts | Indisponibilitate sau breșă la scară, incident major raportabil | Medie, impact foarte ridicat | Activitate de administrare neanunțată, notificări vagi din partea furnizorului |
| Ransomware cu extorcare dublă | Criminalitate organizată | Phishing, perimetru, acces prin terț | Toate | Initial Access, Lateral Movement, Exfiltration, Impact | Oprirea serviciilor, breșă, raportare | Ridicată | Conturi privilegiate noi, exfiltrare nocturnă, dezactivarea protecției |
| BEC și fraudă pe plăți interne | Criminalitate financiară | Email compromis, deepfake de autoritate | Trezorerie, operațiuni | Initial Access, Impact | Pierdere directă, adesea mare | Ridicată | Cereri urgente de la conducere, modificări de beneficiar, presiune pe confidențialitate |
| Abuz de API și de open banking | Criminalitate, actori automatizați | Chei compromise, autorizare deficitară, credential stuffing | API-uri, conturi | Credential Access, Impact | Fraudă, expunere de date | Ridicată | Creșteri de erori de autorizare, volume atipice, IP-uri noi |
| Insider cu acces la fonduri sau date | Personal, contractori | Acces legitim, privilegii excesive | Plăți, date de client | Valid Accounts, Collection | Fraudă, breșă | Scăzută, impact ridicat | Acces în afara atribuțiilor, tranzacții sub praguri de alertare |
| DDoS pe canale publice | Extorcare, hacktivism | Expunere publică | Internet banking, site | Impact | Indisponibilitate vizibilă public | Medie | Amenințări prealabile, creșteri bruște de trafic |
| Fraudă asistată de AI (deepfake video/voce) | Criminalitate | Apel video fals, voce clonată | Autorizarea plăților, onboarding la distanță | Impact | Plăți frauduloase, onboarding fraudulos | În creștere rapidă | Cereri de derogare de la procedură, calitate audio/video suspectă, refuz de verificare secundară |

---

## 5. Particularitatea IMM în acest sector

1. **Proporționalitate, nu exceptare.** O entitate mică are obligații reale, calibrate. Cea mai frecventă eroare de conținut este să sugerezi că regulile „sunt pentru bănci". Corectează activ această percepție.
2. **Registrul furnizorilor TIC e punctul de plecare.** Pentru multe entități mici, prima capabilitate reală cerută de DORA este să știe exact ce furnizori TIC are, care sunt critici și ce prevede contractul. Începe de aici — e și util, și verificabil.
3. **Frauda e mai probabilă decât intruziunea.** Pentru entitățile mici, pierderea vine de obicei prin inginerie socială asupra clientului sau a angajatului, nu prin exploatarea unei vulnerabilități. Alocă ponderea corespunzătoare în curriculum.
4. **Dependența de un singur furnizor e riscul structural.** Dacă furnizorul de core cade, entitatea nu are alternativă. Strategia de ieșire nu e birocrație, e singura protecție.
5. **Termenele de raportare sunt scurte.** Capacitatea de a decide rapid dacă un incident este „major" și cine îl raportează trebuie exersată, nu doar documentată.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: indisponibilitatea plăților în ziua de salarii**
Instituție de plată, 40 de angajați, platformă găzduită de un furnizor unic. Vineri, în ziua cu cel mai mare volum al lunii, procesarea se oprește. Furnizorul spune inițial „investigăm", apoi confirmă un incident de securitate la el, fără detalii. Clienții sună, unii postează public. Decizii: ce se comunică și când, dacă incidentul se califică drept major, cine decide asta, ce se raportează și către cine, ce se face cu plățile aflate în curs.

**Scenariul 2 — supply chain: furnizorul de identificare la distanță, compromis**
Furnizorul care realizează verificarea de identitate la onboarding anunță o breșă care ar fi putut permite validarea unor identități false pe o perioadă de trei săptămâni. Entitatea a deschis în acea perioadă 340 de conturi. Decizii: se suspendă onboarding-ul, se re-verifică toate conturile, ce se face cu cele care au deja tranzacții, cum se gestionează relația cu supraveghetorul și cu AML, ce clauze contractuale se pot invoca.

**Scenariul 3 — criză și continuitate: fraudă asistată de deepfake**
Directorul financiar primește un apel video de la o persoană care arată și vorbește exact ca directorul general, aflat în delegație. Cere o plată urgentă către un furnizor nou, pentru o achiziție „confidențială". Plata se execută. A doua zi, frauda este descoperită. Decizii: recuperarea fondurilor, notificarea autorităților și a băncii, dacă este incident de securitate raportabil, comunicarea internă fără a distruge încrederea în echipă, ce control se introduce astfel încât să nu depindă de vigilența unei singure persoane.

---

## 7. Inject-uri sectoriale

1. `T+20 min` — Furnizorul transmite un mesaj vag: „investigăm o problemă tehnică". **Decizie:** se tratează ca incident de securitate? **Testează:** clasificarea în condiții de informație insuficientă.
2. `T+45 min` — Primii clienți postează public că nu le-au intrat salariile. **Decizie:** se comunică public acum sau se așteaptă confirmarea. **Testează:** echilibrul dintre transparență și acuratețe.
3. `T+1h 30` — Se pune întrebarea dacă incidentul îndeplinește criteriile de incident major. **Decizie:** cine are autoritatea de a clasifica și pe ce bază. **Testează:** existența unei proceduri de clasificare, nu a unei opinii.
4. `T+2h` — Departamentul juridic întreabă ce prevede contractul cu furnizorul privind notificarea și asistența. **Decizie:** se poate răspunde în 10 minute? **Testează:** accesibilitatea registrului de furnizori TIC.
5. `T+3h` — Un angajat propune trecerea temporară pe un proces manual pentru plățile urgente. **Decizie:** se acceptă, cu ce controale compensatorii. **Testează:** menținerea separării funcțiilor în regim degradat.
6. `T+5h` — Supraveghetorul solicită informații preliminare. **Decizie:** cine este punctul de contact și ce se transmite. **Testează:** existența unui responsabil desemnat.
7. `T+8h` — Se constată o creștere a plăților către beneficiari nou adăugați, în timpul incidentului. **Decizie:** se blochează categoria? **Testează:** recunoașterea fraudei oportuniste în timpul unei crize.
8. `T+16h` — Furnizorul confirmă exfiltrarea unui set de date de client. **Decizie:** se declanșează notificarea GDPR și informarea persoanelor vizate? **Testează:** articularea între regimurile de raportare.
9. `T+30h` — Presa financiară solicită un punct de vedere. **Decizie:** cine răspunde și ce se spune. **Testează:** disciplina comunicării într-un sector sensibil la încredere.
10. `T+72h` — Se cere raportul intermediar. **Decizie:** ce conține, pe ce dovezi se bazează. **Testează:** documentarea pe parcurs și calitatea jurnalelor.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Registru al furnizorilor TIC, complet și actualizat | furnizori documentați cu criticitate și clauze / total furnizori TIC × 100 | 100% |
| Furnizori critici cu strategie de ieșire documentată | furnizori cu plan de ieșire / furnizori critici × 100 | 100% |
| Timp până la clasificarea unui incident ca major sau nu | ore de la detectare până la decizia documentată | < 4 h |
| MFA rezistent la phishing pe conturi privilegiate | conturi privilegiate cu MFA rezistent la phishing / total × 100 | 100% |
| Plăți peste prag cu dublă aprobare efectivă | plăți cu dublă aprobare / plăți peste prag × 100 | 100% |
| Verificare pe canal secundar pentru cereri de plată atipice | cereri verificate / cereri atipice × 100 | 100% |
| Teste de reziliență operațională digitală documentate | teste efectuate / teste planificate × 100 | 100% |
| DMARC în politică de respingere pe domeniile proprii | domenii cu p=reject / total domenii × 100 | 100% |
| Rata de raportare a tentativelor de fraudă de către angajați | tentative raportate / tentative identificate × 100 | > 80% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Servicii financiare
Subsector: instituții de plată, IFN-uri, brokeri și administratori de fonduri mici și mijlocii
Țară/regiune: România / Uniunea Europeană
Public țintă: management, conformitate și risc, operațiuni și plăți, IT, ofițer AML, DPO
Nivel: intermediate, cu traseu executiv separat
Durată totală: 2 zile
Format: hibrid
Număr participanți: 20
Scop principal: după training, entitatea are registrul furnizorilor TIC completat, o procedură
                documentată de clasificare a incidentelor majore și un exercițiu de raportare realizat
Reglementări: DORA (aplicabil din 17 ianuarie 2025), NIS2 / Legea nr. 58/2024 în articulație cu DORA,
              PSD2, GDPR, PCI DSS unde este cazul, ISO 27001 / ISO 22301 ca referință
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Servicii financiare
2. Subsector: entități financiare mici și mijlocii sub incidența DORA
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, risc și conformitate, operațiuni, IT, AML, DPO
5. Nivel: intermediate / advanced
6. Format: platformă web
7. Scop principal: conformitate demonstrabilă și reziliență operațională digitală
8. Reglementări: DORA, NIS2, PSD2, GDPR, PCI DSS, ISO 27001, ISO 22301, AI Act unde e relevant
9. Constrângeri: echipă mică de conformitate, dependență de un furnizor TIC unic,
                 termene scurte de raportare, buget limitat pentru testare
10. Rezultat urmărit: conformitate, registru de furnizori, exerciții de raportare, evaluare de maturitate
```

---

## 10. Capcane de evitat

- **Să sugerezi că entitățile mici sunt exceptate de la DORA.** Sunt supuse proporționalității, nu exceptării. Această eroare compromite întregul training.
- **Să confunzi PCI DSS cu o obligație legală.** Este o cerință contractuală a schemelor de card. Distincția contează pentru credibilitate.
- **Să tratezi NIS2 și DORA ca alternative.** Articulația dintre ele este tehnică și trebuie prezentată cu prudență, nu simplificată într-o propoziție.
- **Să subdimensionezi frauda.** Pentru entitățile mici, este scenariul cel mai probabil și cel mai costisitor. Merită mai mult spațiu decât intruziunea avansată.
- **Să inventezi cifre de fraudă „din piață".** Dacă nu ai o sursă oficială citabilă, formulează calitativ.
