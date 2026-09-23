# RAMURA SECTORIALĂ 06 — RETAIL & E-COMMERCE

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Comerțul cu amănuntul **nu figurează ca sector distinct**. Intră însă: **piețele online (marketplace-uri)** ca furnizori digitali în Anexa II, precum și distribuția de alimente în anumite condiții. Un magazin online propriu nu este marketplace. Verifică încadrarea concretă. | Cerință legală doar pentru categoriile vizate |
| **GDPR** | Date de client, comenzi, profilare, marketing, cookie-uri, programe de fidelitate. Sectorul cu cea mai mare expunere pe volum de persoane vizate. | Cerință legală, universală |
| **PCI DSS** | Obligatoriu contractual pentru cine procesează, stochează sau transmite date de card. Nivelul de cerințe depinde de volum și de modul de integrare a plăților. | Cerință contractuală de schemă, **nu lege** |
| **DSA** (Regulamentul (UE) 2022/2065) | Servicii intermediare online, inclusiv piețe online: trasabilitatea comercianților, notificare și acțiune, transparență. | Cerință legală pentru categoriile vizate |
| **Directiva ePrivacy** și legislația națională de transpunere | Cookie-uri, comunicări comerciale, marketing direct. | Cerință legală |
| **Legislația de protecție a consumatorului** | Interacțiune cu securitatea: informarea clientului în caz de breșă, practici comerciale. | Cerință legală |
| **Cyber Resilience Act** | Relevant dacă retailerul **fabrică sau importă** produse cu elemente digitale (electronice de consum, dispozitive conectate). | Cerință legală pentru producători/importatori/distribuitori |

**Atenție:** pentru un retailer român tipic, ordinea reală a presiunii este: **PCI DSS (contractual) > GDPR (legal) > cerințele platformelor și ale marketplace-urilor pe care vinde > NIS2 (adesea inaplicabil direct)**. Construiește modulul de conformitate în această ordine, nu invers.

---

## 2. Profil operațional

**Procese critice:** afișarea catalogului și a prețurilor · procesarea comenzilor · încasarea și plata · gestiunea stocului · livrarea și retururile · relația cu clientul · campaniile de marketing · aprovizionarea.

**Sisteme tipice:** platformă de e-commerce (frecvent open-source sau SaaS, cu module terțe) · sisteme POS în magazine fizice · ERP sau software de gestiune · WMS · integrări cu marketplace-uri · procesatori de plăți · CRM și platforme de email marketing · sisteme de curierat · instrumente de analytics și pixeli de urmărire · chat și suport clienți · sisteme de fidelizare.

**Date procesate:** date de identificare și contact ale clienților · adrese de livrare · istoric de comenzi · date de plată (frecvent tokenizate la procesator) · comportament de navigare · date de angajați · date de furnizori.

**Dependențe critice:** furnizorul platformei de e-commerce și dezvoltatorul extern · procesatorul de plăți · agenția de marketing cu acces administrativ · furnizorii de module și teme · serviciile de curierat · marketplace-urile · furnizorul de găzduire · CDN-ul.

**Unde securitatea devine imediat operațională:** magazinul căzut înseamnă zero venit pe durata indisponibilității, calculabil pe oră. În perioadele de vârf (Black Friday, sărbători), aceeași oră costă de zece ori mai mult.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| Platforma de e-commerce | Critică | Compromitere web, skimming, ransomware, DDoS | Module și teme terțe neactualizate, panou de administrare expus, lipsa MFA | Oprirea vânzărilor, furt de date de card, listare pe liste de blocare | Actualizări disciplinate, MFA pe administrare, restricționarea accesului la panou, WAF |
| Pagina de plată | Critică | Web skimming (injectarea de scripturi în pagină) | Scripturi terțe fără control, lipsa politicii de securitate a conținutului | Furt de date de card la scară, sancțiuni de schemă | Minimizarea scripturilor terțe, politică de securitate a conținutului, verificarea integrității, redirecționare/iframe către procesator |
| Conturi de administrare și de agenție | Critică | Credential theft, abuz | Conturi partajate cu agenția, fără MFA, rămase active după încheierea colaborării | Preluarea magazinului | Conturi nominale, MFA, revizuire trimestrială, revocare la finalul contractului |
| Baza de clienți și CRM | Critică | Exfiltrare, extorcare, abuz de marketing | Export nelimitat, acces larg al echipei de marketing | Sancțiune GDPR, pierderea încrederii | Limitarea exportului, jurnalizare, minimizare, retenție definită |
| Conturi de client | Ridicată | Credential stuffing, preluare de cont | Fără limitare de rată, fără detectarea reutilizării parolelor | Fraudă, puncte de fidelitate furate, reclamații | Limitare de rată, detectarea autentificărilor anormale, MFA opțional, alertare la schimbarea datelor |
| POS și magazine fizice | Ridicată | Malware, skimming fizic, acces neautorizat | Rețea comună cu Wi-Fi-ul pentru clienți, stații cu sisteme vechi | Compromiterea plăților în magazin | Separarea rețelelor, actualizări, control fizic |
| Integrări cu marketplace-uri | Ridicată | Compromiterea cheilor, manipulare de comenzi | Chei API stocate în clar, drepturi excesive | Comenzi false, pierderea contului de vânzător | Rotația cheilor, privilegii minime, monitorizarea anomaliilor |
| Backup și configurații | Critică | Criptare, pierdere | Copii pe același server, fără test de restaurare | Indisponibilitate prelungită | 3-2-1, copie externă, test documentat lunar |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Web skimming / injectare de script în pagina de plată | Grupuri specializate în furt de carduri | Modul terț compromis, acces la administrare, dependență JavaScript | Pagina de plată | Initial Access, Collection, Exfiltration | Furt de date de card, sancțiuni de schemă, pierderea posibilității de a accepta carduri | Ridicată | Scripturi noi în pagină, cereri către domenii necunoscute, modificări de fișiere nedocumentate |
| Credential stuffing și preluare de cont | Criminalitate automatizată | Liste de parole scurse, boți | Conturi de client | Credential Access, Impact | Fraudă, reclamații, pierderea încrederii | Foarte ridicată | Vârfuri de autentificări eșuate, IP-uri distribuite, autentificări reușite de pe dispozitive noi |
| Ransomware pe gestiune și logistică | Criminalitate organizată | Phishing, RDP expus, furnizor | ERP, WMS, POS | Initial Access, Lateral Movement, Impact | Oprirea livrărilor și a magazinelor | Ridicată | Conturi privilegiate noi, dezactivarea protecției |
| Compromiterea unui modul sau a unei teme | Criminalitate | Actualizare de la un furnizor terț, extensie abandonată | Platforma | Supply Chain Compromise | Preluarea magazinului, skimming | Ridicată | Modificări de fișiere, module fără actualizări de mult timp |
| DDoS în perioada de vârf | Extorcare, concurență neloială | Expunere publică | Site, API | Impact | Pierdere directă de venit, exact când e maximă | Medie–ridicată | Amenințări prealabile, creșteri bruște de trafic |
| Fraudă pe comenzi și retururi | Criminalitate, clienți frauduloși | Carduri furate, abuz de politici | Financiar, stoc | — | Pierdere financiară, chargeback-uri | Ridicată | Comenzi cu adrese de livrare noi și valoare mare, tipare de retur |
| BEC pe furnizori și logistică | Criminalitate financiară | Email compromis | Financiar | Initial Access, Impact | Plăți către conturi false | Ridicată | Schimbări de IBAN, presiune de urgență |
| Exfiltrare și extorcare a bazei de clienți | Criminalitate | Acces la bază, backup expus | CRM, baza de date | Exfiltration, Impact | Sancțiune, notificare în masă, prejudiciu de imagine | Medie–ridicată | Interogări masive, arhive create, trafic ieșit neobișnuit |

---

## 5. Particularitatea IMM în acest sector

1. **Magazinul e construit de altcineva.** Platforma e făcută de o agenție sau de un freelancer care, de regulă, mai are și acum acces administrativ. Primul exercițiu util: **cine are acces la magazinul tău, chiar acum?**
2. **Terții sunt în pagină, nu doar în infrastructură.** Un magazin tipic încarcă 15–30 de scripturi terțe: analytics, chat, remarketing, recenzii, plăți. Fiecare este un punct de compromitere a paginii de plată. Acesta este riscul cel mai subestimat al sectorului.
3. **Sezonalitatea e un factor de risc.** Atacurile se calibrează pe perioadele de vârf, când toleranța la oprire este zero și tentația de a „rezolva repede" duce la decizii proaste. Exercițiile trebuie plasate în context de Black Friday.
4. **Datele de card, de obicei, nu sunt la tine — dar responsabilitatea, da.** Chiar cu plată redirecționată către procesator, skimmingul din pagina proprie fură datele înainte să ajungă acolo. Explică mecanismul, nu doar concluzia.
5. **Venitul pe oră este cunoscut.** Ca și în producție, ai un argument numeric imediat pentru prioritizare. Folosește-l.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: skimming descoperit în Black Friday**
Magazin online cu 4 milioane EUR cifră de afaceri anuală, 25 de angajați. În a doua zi de campanie, procesatorul de plăți semnalează o rată anormală de fraudă pe cardurile folosite pe site. Se descoperă un script necunoscut, încărcat de pe un domeniu care imită un furnizor de analytics, prezent de 9 zile. Decizii: se oprește magazinul în vârful campaniei, se oprește doar plata cu cardul, cum se determină câți clienți sunt afectați, când și cum se notifică, ce se comunică procesatorului și schemelor de card.

**Scenariul 2 — supply chain: agenția care a construit magazinul**
Agenția anunță că a fost compromisă și că atacatorii au avut acces la managerul de parole al echipei, unde erau credențialele clienților. Agenția administrează și magazinele altor 60 de firme. Decizii: ce se schimbă și în ce ordine, cum se verifică dacă magazinul a fost deja modificat, cine face asta când singura persoană care cunoaște platforma este chiar agenția, ce se cere contractual de acum înainte.

**Scenariul 3 — criză și continuitate: exfiltrarea bazei de clienți**
Un mesaj anonim cere plată, atașând un fișier cu 8.000 de înregistrări reale de clienți: nume, email, telefon, adresă, istoric de comenzi. Nu există dovada unei intruziuni în platformă; suspiciunea cade pe un export făcut printr-un cont de marketing. Decizii: se notifică ANSPDCP și în ce termen, se informează cei 8.000 de clienți, se plătește, cum se investighează fără instrumente de jurnalizare, ce se comunică public înainte ca altcineva să o facă.

---

## 7. Inject-uri sectoriale

1. `T+15 min` — Procesatorul de plăți amenință cu suspendarea serviciului dacă rata de fraudă nu scade. **Decizie:** se oprește plata cu cardul? **Testează:** prioritizarea între venit imediat și risc contractual.
2. `T+40 min` — Directorul de marketing cere să nu se oprească site-ul, pentru că s-au investit 30.000 EUR în campanie. **Decizie:** cine arbitrează. **Testează:** existența unui mandat clar de decizie în criză.
3. `T+1h` — Dezvoltatorul extern răspunde că „nu a modificat nimic" și cere acces la baza de date pentru verificare. **Decizie:** se acordă? **Testează:** controlul accesului în timpul unei investigații.
4. `T+2h` — Un client postează captura unei tranzacții frauduloase, la 20 de minute după ce a cumpărat de pe site. **Decizie:** se răspunde public? ce se spune? **Testează:** comunicarea în canal public înainte de a avea certitudini.
5. `T+4h` — Se constată că scriptul suspect este prezent și în versiunea mobilă, încărcat dintr-un modul de recenzii. **Decizie:** se dezactivează toate modulele terțe? **Testează:** înțelegerea suprafeței de atac din pagină.
6. `T+6h` — Echipa descoperă că jurnalele de acces la panoul de administrare se păstrează doar 7 zile, iar scriptul e prezent de 9. **Decizie:** cum se procedează fără dovezi. **Testează:** consecințele retenției insuficiente.
7. `T+10h` — O schemă de card solicită informații despre incident. **Decizie:** cine răspunde și ce se declară. **Testează:** cunoașterea obligațiilor contractuale.
8. `T+18h` — Un marketplace pe care firma vinde suspendă contul de vânzător „până la clarificare". **Decizie:** cum se gestionează al doilea canal de venit. **Testează:** dependența de platforme terțe.
9. `T+30h` — Se pune întrebarea dacă a fost breșă de date cu caracter personal și dacă trebuie notificat ANSPDCP. **Decizie:** clasificarea și termenul. **Testează:** distincția între incident de securitate și breșă notificabilă.
10. `T+50h` — Un competitor distribuie știrea în grupuri de industrie. **Decizie:** răspuns public sau tăcere. **Testează:** pregătirea comunicării de criză.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Scripturi terțe în pagina de plată | număr de domenii externe care încarcă cod în pagina de plată | cât mai aproape de 0; fiecare justificat |
| Politică de securitate a conținutului activă și în mod de aplicare | da / nu, pe paginile de plată | da |
| MFA pe conturile de administrare, inclusiv ale agenției | conturi cu MFA / total conturi administrative × 100 | 100% |
| Conturi de agenție și de dezvoltator active fără contract curent | număr | 0 |
| Timp de aplicare a actualizărilor critice pentru platformă și module | zile de la publicare până la aplicare | < 7 zile |
| Retenția jurnalelor de administrare | zile | ≥ 90 |
| Test de restaurare a magazinului | restaurări complete reușite în ultimele 12 luni | ≥ 2 |
| Rata de autentificări eșuate pe conturile de client | eșuări / total încercări × 100, urmărită ca tendință | alertare la dublarea mediei |
| Venit pe oră cunoscut, pe perioade normale și de vârf | există / nu există | există, documentat |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Retail și comerț electronic
Subsector: magazine online cu operare proprie și prezență pe marketplace-uri, 10-100 de angajați
Țară/regiune: România / Uniunea Europeană
Public țintă: management, marketing și e-commerce, financiar, relații cu clienții,
              dezvoltatorul sau agenția externă, responsabil GDPR
Nivel: mixed
Durată totală: 1 zi + sesiune de exercițiu în context de campanie
Format: online sau hibrid
Număr participanți: 25
Scop principal: după training, firma știe exact cine are acces la magazin, ce scripturi terțe
                rulează în pagina de plată și cum procedează dacă apare skimming în campanie
Reglementări: GDPR, PCI DSS (contractual), ePrivacy, DSA dacă operează marketplace,
              NIS2 doar dacă se încadrează ca furnizor digital
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Retail și comerț electronic
2. Subsector: comerț online și omnichannel, IMM-uri
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, e-commerce și marketing, financiar, suport clienți, agenții și dezvoltatori externi
5. Nivel: mixed
6. Format: platformă web
7. Scop principal: protejarea veniturilor și a datelor de client, pregătire pentru perioadele de vârf
8. Reglementări: GDPR, PCI DSS, ePrivacy, DSA unde e cazul
9. Constrângeri: platformă administrată de terți, sezonalitate accentuată, fără IT intern, buget redus
10. Rezultat urmărit: awareness operațional, exerciții de campanie, toolkit, evaluare de maturitate
```

---

## 10. Capcane de evitat

- **Să prezinți PCI DSS ca obligație legală.** Este cerință contractuală. Efectul practic e sever, dar natura juridică diferă.
- **Să spui că NIS2 se aplică oricărui magazin online.** În general nu se aplică. Afirmația falsă distruge credibilitatea întregului training.
- **Să ignori scripturile terțe.** Este vectorul cel mai specific acestui sector și cel mai puțin prezent în materialele generice.
- **Să construiești exerciții în afara sezonului.** Un incident în februarie și unul în Black Friday sunt exerciții complet diferite.
- **Să presupui că firma controlează propriul magazin.** De cele mai multe ori, nu îl controlează. Începe cu recuperarea controlului asupra accesului.
