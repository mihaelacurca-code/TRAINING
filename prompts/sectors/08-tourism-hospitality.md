# RAMURA SECTORIALĂ 08 — TOURISM & HOSPITALITY

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Turismul și ospitalitatea **nu figurează** nici în Anexa I, nici în Anexa II. Un hotel, o agenție de turism sau un restaurant nu intră, ca atare, în domeniul de aplicare. Pot exista situații particulare (de exemplu, o entitate din grup care prestează servicii TIC gestionate), dar acestea sunt excepții, nu regula. | **În general inaplicabilă** — spune asta explicit |
| **GDPR** | Regimul central pentru acest sector. Date de identificare, documente de identitate, date de plată, preferințe, uneori date privind sănătatea (alergii, accesibilitate, servicii medicale în stațiuni), supraveghere video, date de minori. | Cerință legală, centrală |
| **PCI DSS** | Obligatoriu contractual pentru cine procesează carduri — practic, toți. Sectorul are o particularitate: datele de card circulă frecvent prin canale nepotrivite (email, fax, telefon, formulare de garanție). | Cerință contractuală de schemă |
| **Legislația privind evidența turiștilor** | Obligații naționale de înregistrare a datelor de cazare; intersectează direct minimizarea datelor și retenția. **Verifică forma actuală a cerințelor naționale.** | Cerință legală națională |
| **Directiva ePrivacy** și transpunerea națională | Marketing direct, newslettere, cookie-uri pe site-ul de rezervări. | Cerință legală |
| **Directiva privind pachetele de servicii de călătorie** | Relevantă pentru agenții și touroperatori; intersecție cu continuitatea serviciului către turist. | Cerință legală pentru categoriile vizate |

**Atenție:** tentația în acest sector este să inventezi aplicabilitate NIS2 pentru a da greutate trainingului. Nu o face. Sectorul are un caz de business propriu, foarte puternic, fără NIS2: **frauda pe rezervări, breșele de date de oaspeți și sancțiunile GDPR** sunt motivele reale, verificabile, iar credibilitatea trainingului depinde de onestitatea acestei încadrări.

---

## 2. Profil operațional

**Procese critice:** rezervarea și confirmarea · check-in și check-out · încasarea și garantarea plății · gestionarea camerelor și a curățeniei · restaurație și vânzare la punctul de servire · evenimente și grupuri · relația cu platformele de rezervări · programe de fidelizare.

**Sisteme tipice:** PMS (Property Management System) · channel manager și motor de rezervări propriu · POS în restaurant și bar · sisteme de închidere electronică a camerelor · Wi-Fi pentru oaspeți · sisteme de automatizare a clădirii (climatizare, iluminat, acces) · supraveghere video · sisteme de spa și acces · CRM și platforme de marketing · integrări cu agenții de turism online.

**Date procesate:** date de identificare ale oaspeților, inclusiv copii ale documentelor de identitate · date de plată · date de contact · preferințe și comportament · date privind sănătatea, ocazional · date de angajați, cu fluctuație mare · imagini de supraveghere.

**Dependențe critice:** platformele de rezervări online · furnizorul PMS (frecvent SaaS) · channel manager · procesatorul de plăți · furnizorul de Wi-Fi și de rețea · furnizorul de închideri electronice · agenția de marketing.

**Unde securitatea devine imediat operațională:** dacă PMS-ul cade în ziua de check-in a unui grup de 80 de persoane, recepția se blochează fizic. Dacă închiderile electronice nu funcționează, oaspeții nu pot intra în camere. Impactul e vizibil, public și imediat.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| PMS | Critică | Ransomware, exfiltrare, indisponibilitate | Conturi partajate pe recepție, MFA absent, acces de la distanță al furnizorului | Blocarea recepției, breșă de date de oaspeți | Conturi nominale, MFA, procedură de check-in degradat, control al accesului furnizorului |
| Conturi pe platformele de rezervări | Critică | Preluare de cont, fraudă prin mesagerie | MFA absent, conturi partajate cu managerul plecat din firmă | Fraudă asupra oaspeților în numele hotelului, suspendarea listării | MFA, conturi nominale, revizuire lunară, verificarea mesajelor suspecte |
| Date de card și garanții | Critică | Exfiltrare, utilizare frauduloasă | Carduri notate pe hârtie, trimise prin email, stocate în câmpuri libere din PMS | Sancțiuni de schemă, pierderea posibilității de a accepta carduri | Interzicerea canalelor nepotrivite, tokenizare, formulare securizate, instruire la recepție |
| Închideri electronice și control acces | Critică | Compromitere, indisponibilitate | Sisteme vechi, rețea comună, mentenanță de la distanță necontrolată | Risc pentru siguranța oaspeților, blocarea accesului | Segmentare, inventar, control al mentenanței, procedură de acces manual |
| Wi-Fi pentru oaspeți | Ridicată | Punte către rețeaua internă, abuz | Aceeași rețea pentru oaspeți și pentru operare, parolă unică afișată | Compromiterea sistemelor operaționale | Separare strictă, izolare între clienți, fără acces către rețeaua internă |
| POS restaurant și bar | Ridicată | Malware, fraudă internă | Stații vechi, conturi partajate între ture | Fraudă, compromiterea plăților | Actualizări, conturi individuale, reconciliere zilnică |
| Sisteme de automatizare a clădirii | Ridicată | Compromitere, indisponibilitate | Acces de la distanță al instalatorului, parole implicite | Disconfort major, risc operațional, costuri | Separare de rețea, schimbarea credențialelor implicite, jurnalizare |
| CRM și baza de oaspeți | Ridicată | Exfiltrare, abuz de marketing | Export nelimitat, retenție nedefinită, acces al agenției | Sancțiune GDPR, prejudiciu de imagine | Minimizare, retenție definită, limitarea exportului, contract cu agenția |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Fraudă prin mesageria platformelor de rezervări | Criminalitate organizată | Preluarea contului de partener, mesaje către oaspeți cu linkuri de „confirmare a plății" | Cont de platformă, oaspeți | Valid Accounts, Impact | Oaspeți fraudați în numele hotelului, suspendarea contului, prejudiciu de imagine | **Foarte ridicată** — cel mai caracteristic risc al sectorului | Mesaje trimise în afara orelor, șabloane care cer plata în afara platformei, plângeri ale oaspeților |
| Ransomware pe PMS | Criminalitate organizată | Phishing pe recepție, acces de la distanță | PMS, POS | Initial Access, Lateral Movement, Impact | Blocarea operării în plin sezon | Ridicată | Conturi noi, dezactivarea protecției, fișiere redenumite |
| Exfiltrarea datelor de oaspeți | Criminalitate | Acces la PMS/CRM, backup expus | Date de oaspeți, documente de identitate | Collection, Exfiltration | Sancțiune GDPR, notificarea persoanelor vizate | Medie–ridicată | Exporturi masive, acces în afara programului |
| Compromiterea datelor de card la recepție | Criminalitate, insider | Carduri notate, canale de email, POS compromis | Date de plată | Collection | Sancțiuni de schemă, fraudă în lanț | Ridicată | Reclamații de fraudă corelate cu perioada șederii |
| Phishing pe rezervări de grup și evenimente | Criminalitate financiară | Cereri false de ofertă cu atașament, BEC | Email, financiar | Initial Access, Impact | Malware, plăți frauduloase | Ridicată | Cereri urgente de ofertă, atașamente neașteptate, schimbări de IBAN |
| Abuz al Wi-Fi-ului pentru oaspeți | Oportunist | Rețea comună, izolare absentă | Rețea internă | Lateral Movement | Compromiterea sistemelor operaționale | Medie | Trafic dinspre segmentul de oaspeți către sisteme interne |
| Fraudă internă la punctul de vânzare | Personal | Conturi partajate, lipsa reconcilierii | POS, încasări | — | Pierdere financiară continuă, greu detectabilă | Medie–ridicată | Anulări frecvente, discrepanțe la reconciliere |
| Compromiterea sistemelor de acces și a automatizării | Oportunist, contractori | Mentenanță de la distanță, parole implicite | Închideri, climatizare | — | Risc pentru oaspeți, întreruperea serviciului | Scăzută–medie | Deschideri neexplicate în jurnale, modificări de configurație |

---

## 5. Particularitatea IMM în acest sector

1. **Fluctuația de personal e structurală.** Sezonierii, studenții, schimbul de tură — publicul trainingului se schimbă de câteva ori pe an. Conținutul trebuie proiectat pentru **livrare repetabilă în 30 de minute**, nu pentru un curs anual de două zile. Include un modul de onboarding de securitate pentru personal nou.
2. **Recepția e linia întâi.** Aici se primesc cardurile, se răspunde la mesaje, se deschid atașamente, se dau informații la telefon. Cea mai mare parte a riscului real trece prin trei persoane cu salarii mici și multă presiune. Trainingul trebuie să le ofere **proceduri simple și dreptul de a refuza**, nu teorie.
3. **Platformele de rezervări sunt și canal de atac.** Este singularitatea sectorului: frauda vine prin canalul comercial legitim, iar victima directă este oaspetele, nu hotelul. Hotelul suportă consecința reputațională și comercială.
4. **Sezonalitatea concentrează riscul.** Vârful de ocupare coincide cu personalul cel mai puțin experimentat și cu cea mai mică toleranță la oprire.
5. **Nu ai NIS2, dar ai ANSPDCP.** Motivația de conformitate este reală și trebuie prezentată corect: protecția datelor, nu securitatea cibernetică a infrastructurii critice.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: PMS indisponibil în ziua de vârf**
Hotel de 120 de camere, 48 de angajați, ocupare 100%, un grup de 80 de persoane sosește la 15:00. La 11:30 PMS-ul devine inaccesibil; furnizorul SaaS confirmă „un incident de securitate în investigare". Nu există listă tipărită a rezervărilor zilei. Decizii: cum se face check-in-ul, cum se alocă camerele fără să apară suprapuneri, ce se spune oaspeților, cum se încasează, ce se face cu cheile electronice dacă sistemul lor depinde de PMS.

**Scenariul 2 — supply chain: contul de pe platforma de rezervări, preluat**
Oaspeții încep să sune că au primit prin mesageria platformei un link de „reconfirmare a plății" și că au introdus datele cardului. Mesajele au fost trimise din contul oficial al hotelului. Platforma nu răspunde imediat. Decizii: cum se oprește trimiterea mesajelor, ce se comunică oaspeților deja afectați, cine îi contactează și pe ce canal, dacă este breșă de date în sensul GDPR, ce se raportează și cui, cum se gestionează valul de recenzii negative.

**Scenariul 3 — criză și continuitate: breșă a datelor de oaspeți**
Un cercetător în securitate anunță că a găsit accesibilă public o copie de rezervă a bazei hotelului, conținând datele a 14.000 de oaspeți din ultimii patru ani, inclusiv copii scanate ale documentelor de identitate. Copia fusese încărcată de un fost furnizor IT. Decizii: notificarea ANSPDCP în termen, informarea persoanelor vizate, cum se determină cine este afectat, ce se comunică public, răspunderea între hotel și fostul furnizor, retenția datelor care nu trebuiau păstrate.

---

## 7. Inject-uri sectoriale

1. `T+15 min` — Grupul de 80 de persoane sosește mai devreme. **Decizie:** cum se procedează fără PMS. **Testează:** existența unei proceduri de check-in pe hârtie.
2. `T+35 min` — Un recepționer propune să noteze datele cardurilor pe o listă, „până revine sistemul". **Decizie:** se permite? ce alternativă există? **Testează:** disciplina privind datele de card sub presiune operațională.
3. `T+1h` — Un oaspete sună furios: a plătit pe un link primit prin platformă și nu are rezervare. **Decizie:** ce i se spune, cine preia cazul. **Testează:** capacitatea de a recunoaște o fraudă în desfășurare.
4. `T+2h` — Managerul de vânzări cere acces la contul de platformă „ca să vadă ce se întâmplă". **Decizie:** se acordă în mijlocul unui incident? **Testează:** controlul accesului în timpul unui incident.
5. `T+3h` — Apar primele recenzii publice: „hotel care fură datele cardurilor". **Decizie:** se răspunde public, cu ce mesaj. **Testează:** comunicarea de criză orientată către oaspete, nu defensivă.
6. `T+5h` — Se constată că fostul director de vânzări, plecat acum 8 luni, are încă acces la contul de platformă. **Decizie:** consecințe și acțiune imediată. **Testează:** procedurile de offboarding într-un sector cu fluctuație mare.
7. `T+8h` — Procesatorul de plăți solicită explicații privind rata de contestare. **Decizie:** cine răspunde. **Testează:** cunoașterea obligațiilor contractuale.
8. `T+20h` — Se pune întrebarea dacă trebuie notificat ANSPDCP. **Decizie:** clasificare și termen. **Testează:** distincția între fraudă asupra oaspeților și breșă a datelor deținute de hotel.
9. `T+30h` — Un angajat sezonier, plecat acum o lună, e semnalat ca având încă acces la Wi-Fi-ul intern și la POS. **Decizie:** acțiune și evaluare de impact. **Testează:** gestionarea accesului personalului sezonier.
10. `T+48h` — O agenție de turism parteneră cere garanții scrise că datele clienților ei nu au fost afectate. **Decizie:** ce se poate afirma. **Testează:** existența jurnalizării și a evidenței fluxurilor de date.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| MFA pe conturile de pe platformele de rezervări | conturi cu MFA / total conturi × 100 | 100% |
| Conturi active ale persoanelor care nu mai lucrează în unitate | număr | 0 |
| Date de card scrise pe hârtie sau trimise prin email | incidente identificate pe lună | 0 |
| Instruire de securitate la angajare, inclusiv pentru sezonieri | angajați instruiți în prima săptămână / total angajări × 100 | 100% |
| Separarea Wi-Fi oaspeți / operare, verificată | da / nu, testat | da, testat semestrial |
| Procedură de check-in degradat, exersată | exerciții documentate în ultimele 12 luni | ≥ 2, dintre care unul în sezon |
| Retenția datelor de oaspeți conform politicii | seturi de date peste termenul de retenție / total × 100 | 0% |
| Timp până la contactarea oaspeților afectați de o fraudă | ore de la identificare la contactare | < 4 h |
| Copii ale documentelor de identitate stocate fără temei | număr | 0 |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Turism și ospitalitate
Subsector: hoteluri și pensiuni independente, 10-150 de camere
Țară/regiune: România / Uniunea Europeană
Public țintă: management, recepție, vânzări și rezervări, restaurație, personal sezonier,
              furnizorul IT extern, responsabil GDPR
Nivel: beginner / mixed
Durată totală: 4 ore pentru personal + 4 ore pentru management, cu modul de onboarding de 30 de minute
Format: fizic, repetabil pe ture
Număr participanți: 30 în serii de câte 10
Scop principal: după training, recepția are proceduri clare pentru datele de card și pentru mesajele
                suspecte de pe platforme, iar unitatea poate opera 24 de ore fără PMS
Reglementări: GDPR (central), PCI DSS (contractual), ePrivacy, obligații naționale de evidență
              a turiștilor. NIS2 NU se aplică în general acestui sector — menționează explicit.
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Turism și ospitalitate
2. Subsector: hoteluri, pensiuni, agenții de turism, restaurante
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, recepție, rezervări, restaurație, personal sezonier
5. Nivel: beginner / mixed
6. Format: platformă web cu acces mobil, module scurte, repetabile
7. Scop principal: protecția oaspeților și a datelor, continuitate operațională în sezon
8. Reglementări: GDPR, PCI DSS, ePrivacy, obligații naționale de evidență a turiștilor
9. Constrângeri: fluctuație mare de personal, sezonalitate, fără IT intern, buget redus,
                 personal cu timp foarte limitat pentru training
10. Rezultat urmărit: awareness operațional repetabil, proceduri de recepție, toolkit, evaluare rapidă
```

---

## 10. Capcane de evitat

- **Să inventezi aplicabilitatea NIS2.** Nu se aplică, în general. Spune-o clar. Sectorul are motive suficiente fără ea.
- **Să construiești un curs de două zile.** Personalul nu va participa. Proiectează module de 20–30 de minute, repetabile la fiecare val de angajări.
- **Să ignori frauda prin platformele de rezervări.** Este riscul definitoriu al sectorului și lipsește aproape complet din materialele generice.
- **Să vorbești despre „utilizatori".** Aici sunt recepționeri, cameriste, ospătari, manageri de sezon. Vocabularul contează pentru acceptare.
- **Să tratezi datele de card ca o problemă tehnică.** Este o problemă de procedură la recepție, rezolvabilă fără niciun instrument plătit.
