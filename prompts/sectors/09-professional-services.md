# RAMURA SECTORIALĂ 09 — PROFESSIONAL SERVICES

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Acoperă: avocatură, contabilitate și audit, consultanță, arhitectură și inginerie, notariat, resurse umane, agenții de marketing.
> Toate referințele legale se verifică în EUR-Lex, la autoritatea națională și la organismele profesionale înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Serviciile profesionale **nu figurează** ca sector nici în Anexa I, nici în Anexa II. Excepție notabilă: **organizațiile de cercetare** apar în Anexa II, iar o firmă care prestează servicii TIC gestionate intră pe acel temei, nu pe cel de „consultanță". Regula generală: **nu se aplică direct**. | **În general inaplicabilă direct**; relevantă indirect, ca furnizor |
| **GDPR** | Regimul central. Firmele din acest sector sunt frecvent **persoane împuternicite** pentru clienți (contabilitate, salarizare, resurse umane, marketing) și **operatori** pentru datele proprii. Art. 28 impune obligații contractuale și de securitate concrete. | Cerință legală, centrală |
| **Secretul profesional** — legislația și codurile deontologice aplicabile (avocatură, notariat, audit, expertiză contabilă) | Obligație de confidențialitate mai strictă decât GDPR în anumite privințe, cu sancțiuni disciplinare proprii. | Cerință legală și deontologică |
| **Legislația privind prevenirea spălării banilor** | Se aplică anumitor profesii (avocați, notari, contabili, auditori) în situații determinate; intersectează securitatea documentelor și a raportărilor. | Cerință legală pentru categoriile vizate |
| **DORA** (Regulamentul (UE) 2022/2554) | Relevant **indirect**: o firmă care prestează servicii TIC pentru entități financiare intră în regimul contractual al furnizorilor TIC. Un contabil sau un avocat care doar consiliază o bancă **nu** devine furnizor TIC. Nu extinde acest regim dincolo de sfera lui. | Cerință contractuală, pentru furnizorii TIC |
| **ISO 27001** | Cerință contractuală frecventă în licitații și în relația cu clienții corporativi. | Standard / cerință contractuală de facto |

**Atenție:** acesta este sectorul în care trainingurile generice greșesc cel mai des, afirmând aplicabilitatea NIS2. Pentru o firmă de contabilitate, motivația reală este alta și este suficient de puternică: **deține datele financiare și de personal ale zeci sau sute de clienți, într-un singur loc**. Este o țintă cu randament ridicat tocmai din acest motiv.

---

## 2. Profil operațional

**Procese critice:** primirea și prelucrarea documentelor de la clienți · întocmirea și depunerea declarațiilor · salarizarea · redactarea și transmiterea de acte · arhivarea · facturarea · relația cu autoritățile · gestionarea termenelor legale.

**Sisteme tipice:** software de contabilitate și salarizare · software de gestiune a dosarelor · semnătură electronică și portaluri ale autorităților · email (canalul principal de lucru) · stocare în cloud și partajări de fișiere · sisteme de facturare · instrumente de colaborare · scanere și arhive locale · calculatoare personale ale angajaților, frecvent în regim de lucru hibrid.

**Date procesate:** situații financiare ale clienților · date de salarizare, inclusiv date sensibile · date de identificare ale angajaților clienților · documente juridice, uneori în litigii sensibile · contracte și informații comerciale confidențiale · date privind proceduri în curs, cu valoare pentru terți.

**Dependențe critice:** furnizorul software-ului de contabilitate/salarizare · furnizorul de email și de stocare în cloud · portalurile autorităților · furnizorul de semnătură electronică · furnizorul IT extern · arhiva fizică.

**Unde securitatea devine imediat operațională:** termenele legale nu se amână pentru incidente informatice. Un ransomware în perioada de depunere a declarațiilor produce simultan pierdere financiară, răspundere față de clienți și expunere disciplinară.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| Email | Critică | BEC, phishing, exfiltrare | MFA absent, reguli de redirecționare nemonitorizate, atașamente cu date de clienți | Fraudă, breșă pentru mai mulți clienți simultan | MFA, alertare pe reguli noi de redirecționare, DMARC, politici de atașamente |
| Software de contabilitate și salarizare | Critică | Ransomware, exfiltrare | Instalare locală pe un singur server, backup pe aceeași mașină, conturi partajate | Imposibilitatea respectării termenelor, breșă pentru toți clienții | Backup offline testat, conturi nominale, MFA unde e disponibil |
| Documente ale clienților | Critică | Exfiltrare, extorcare, pierdere | Stocare dezorganizată, partajări deschise, copii pe dispozitive personale | Încălcarea secretului profesional, răspundere | Structură de acces pe client, minimizare, criptare, interzicerea copiilor locale necontrolate |
| Semnătură electronică | Critică | Utilizare neautorizată | Token lăsat conectat, PIN partajat, dispozitiv nesupravegheat | Acte semnate fraudulos | Control fizic, PIN individual, deconectare la părăsirea biroului |
| Credențiale pentru portalurile autorităților | Critică | Furt, abuz | Stocate în fișiere, partajate în echipă | Acces fraudulos în numele clienților | Manager de parole, conturi individuale, rotație |
| Stocare în cloud și partajări | Ridicată | Expunere publică, acces excesiv | Linkuri „oricine cu linkul", partajări nerevocate | Breșă tăcută | Partajări cu expirare, revizuire periodică, dezactivarea linkurilor publice |
| Dispozitive ale angajaților | Ridicată | Furt, malware, pierdere | Fără criptare, fără blocare, uz mixt personal/profesional | Pierderea datelor de client | Criptare de disc, blocare automată, separare a utilizării |
| Arhiva fizică | Ridicată | Acces neautorizat, distrugere | Dulapuri neîncuiate, documente pe birouri | Încălcarea secretului profesional | Control fizic, politica biroului curat, distrugere controlată |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| BEC și fraudă pe plăți ale clienților | Criminalitate financiară | Email compromis, domenii similare, interceptarea conversațiilor | Email, relația cu clientul | Initial Access, Collection, Impact | Pierdere pentru client, răspundere profesională, pierderea clientului | **Foarte ridicată** — riscul definitoriu al sectorului | Reguli noi de redirecționare, conversații continuate de pe domenii similare, cereri de schimbare a contului bancar |
| Ransomware în perioada de termene | Criminalitate organizată | Phishing, RDP expus, furnizor IT | Software de contabilitate, documente | Initial Access, Lateral Movement, Impact | Imposibilitatea depunerii, răspundere față de toți clienții | Ridicată | Conturi noi privilegiate, dezactivarea protecției, ștergerea copiilor umbră |
| Exfiltrare și extorcare a documentelor de clienți | Criminalitate | Acces persistent, partajări expuse | Documente, dosare | Collection, Exfiltration, Impact | Încălcarea secretului profesional, presiune maximă | Medie–ridicată, în creștere | Arhive create noaptea, trafic către servicii de stocare |
| Compromiterea unui client prin firmă | Actori avansați | Firma ca punct de intrare către clienți mai mari | Email, acces la sistemele clientului | Supply Chain Compromise | Compromiterea clientului, pierdere de reputație ireversibilă | Medie | Acces la sistemele clientului în afara programului, cereri neobișnuite de acces |
| Phishing cu teme fiscale și juridice | Criminalitate | Mesaje care imită autorități sau instanțe | Email, credențiale | Initial Access, Credential Access | Compromitere, fraudă | Foarte ridicată | Mesaje cu termene imperative, atașamente neașteptate, domenii apropiate de cele oficiale |
| Insider la plecare | Personal | Copierea bazei de clienți și a documentelor | Documente, contacte | Collection | Pierdere comercială, încălcare de confidențialitate | Medie | Descărcări masive înainte de demisie, trimiteri către adrese personale |
| Pierderea sau furtul unui dispozitiv | Oportunist | Laptop în mașină, telefon în transport | Date de client | — | Breșă notificabilă | Medie | — (prevenirea contează, nu detectarea) |
| Configurare greșită a partajărilor | Neintenționat | Link public, folder partajat greșit | Documente | — | Breșă tăcută, descoperită de terți | Ridicată | Alerte de la clienți sau de la motoare de căutare |

---

## 5. Particularitatea IMM în acest sector

1. **Concentrare de risc fără concentrare de resurse.** O firmă de contabilitate cu 12 angajați poate deține datele financiare și de salarizare a 200 de firme. Riscul agregat depășește cu mult capacitatea de apărare. Acesta este mesajul central al trainingului.
2. **Emailul este sistemul de operare al firmei.** Totul trece prin el: documente, aprobări, facturi, instrucțiuni de plată. Prin urmare, cel mai eficient modul nu este despre rețea, ci despre **procedura de verificare a instrucțiunilor de plată** și despre igiena cutiei poștale.
3. **Termenele legale nu se negociază.** Continuitatea are o dimensiune juridică: nu poți amâna o depunere invocând un incident. Planul de continuitate trebuie construit în jurul calendarului fiscal și procedural.
4. **Secretul profesional adaugă un strat de răspundere.** Pentru avocați, notari și auditori, o breșă nu înseamnă doar GDPR, ci și răspundere disciplinară. Include acest palier explicit; el mobilizează mai mult decât amenda administrativă.
5. **Clienții mari devin auditori.** O corporație care externalizează salarizarea va cere garanții contractuale, iar tot mai des dovezi. Capacitatea de a răspunde devine avantaj comercial.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: ransomware cu trei zile înainte de termenul de depunere**
Firmă de contabilitate, 14 angajați, 180 de clienți. Luni dimineață, serverul cu software-ul de contabilitate și arhiva de documente este criptat. Termenul de depunere pentru majoritatea clienților este joi. Backup-ul există, dar pe același server. Decizii: se anunță clienții, se plătește, se reconstituie manual pentru clienții mari, cum se prioritizează cei 180 de clienți, ce se comunică ANSPDCP și în ce calitate — de operator sau de persoană împuternicită.

**Scenariul 2 — supply chain: conversație de email deturnată**
Un client primește, în cadrul unei conversații reale și în curs, un mesaj aparent de la firmă, cu factura corectă dar cu IBAN modificat. Plătește 68.000 RON. Se constată ulterior că nu firma a fost compromisă, ci cutia poștală a clientului — dar mesajul a folosit conținut real din corespondența cu firma. Decizii: cine este răspunzător, ce se comunică, cum se verifică dacă și firma este compromisă, ce procedură se introduce astfel încât să nu se mai poată repeta, ce se spune celorlalți clienți.

**Scenariul 3 — criză și continuitate: extorcare cu documente de client**
Un grup criminal publică pe un site de scurgeri numele firmei și eșantioane din documente: contracte ale unui client aflat în litigiu și state de plată ale altui client. Cere plată în 5 zile. Nu există dovada modului de acces; jurnalele se păstrează 14 zile și nu arată nimic relevant. Decizii: informarea clienților afectați și a celor potențial afectați, notificarea ANSPDCP, raportarea către organismul profesional dacă este cazul, dacă se plătește, comunicarea publică, gestionarea riscului de pierdere în masă a clienților.

---

## 7. Inject-uri sectoriale

1. `T+20 min` — Doi clienți sună să întrebe dacă își pot depune declarațiile la timp. **Decizie:** ce se promite. **Testează:** comunicarea onestă privind termenele.
2. `T+45 min` — Un angajat menționează că are o copie relativ recentă a unor dosare pe laptopul personal. **Decizie:** se folosește? ce implicații are faptul că ea există? **Testează:** tensiunea dintre continuitate și politica de date.
3. `T+1h 30` — Furnizorul IT extern propune plata răscumpărării ca „cea mai rapidă soluție". **Decizie:** cine decide și pe ce criterii. **Testează:** existența unui proces de decizie, nu a unui reflex.
4. `T+3h` — Un client corporativ cere, conform contractului, notificare în 24 de ore și detalii privind datele afectate. **Decizie:** ce se transmite. **Testează:** cunoașterea propriilor obligații contractuale ca persoană împuternicită.
5. `T+5h` — Se pune întrebarea dacă firma este operator sau persoană împuternicită pentru datele afectate. **Decizie:** clarificare și consecințe asupra notificării. **Testează:** înțelegerea rolurilor GDPR — frecvent confuză în acest sector.
6. `T+8h` — Un angajat a trimis deja un email către toți clienții, din proprie inițiativă. **Decizie:** cum se gestionează. **Testează:** existența unei reguli privind cine comunică.
7. `T+24h` — Apare o cerere de plată cu eșantion de documente. **Decizie:** se schimbă încadrarea incidentului din indisponibilitate în breșă. **Testează:** capacitatea de reclasificare.
8. `T+30h` — Organismul profesional solicită informații. **Decizie:** ce se raportează și de către cine. **Testează:** cunoașterea palierului deontologic.
9. `T+48h` — Un client aflat în litigiu întreabă dacă documentele lui sunt printre cele publicate. **Decizie:** ce se poate afirma cu certitudine. **Testează:** existența unei evidențe a datelor deținute.
10. `T+72h` — Trei clienți anunță rezilierea. **Decizie:** cum se gestionează comercial și ce se schimbă structural. **Testează:** trecerea de la răspuns la lecții învățate.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| MFA pe email și pe portalurile autorităților | conturi cu MFA / total × 100 | 100% |
| Verificare pe canal secundar a modificărilor de cont bancar | modificări verificate telefonic / total solicitări × 100 | 100% |
| Alertare la crearea de reguli de redirecționare în cutiile poștale | activă / inactivă | activă, cu verificare lunară |
| Backup offline al datelor de clienți, testat | restaurări complete reușite în ultimele 12 luni | ≥ 2 |
| Timp de restaurare pentru clienții prioritari | ore de la incident la capacitatea de a lucra pentru primii 20 de clienți | < 24 h |
| Partajări publice active în stocarea în cloud | număr de linkuri accesibile fără autentificare | 0 |
| Evidența datelor deținute per client | clienți cu inventar documentat / total × 100 | 100% |
| Contracte de împuternicire actualizate (art. 28) | contracte conforme / total clienți pentru care se prelucrează date × 100 | 100% |
| Dispozitive cu criptare de disc activă | dispozitive criptate / total × 100 | 100% |
| Revocarea accesului la plecarea din firmă | conturi dezactivate în 24h / total plecări × 100 | 100% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Servicii profesionale
Subsector: firme de contabilitate, salarizare și consultanță fiscală, 5-50 de angajați
Țară/regiune: România / Uniunea Europeană
Public țintă: asociați și management, contabili și economiști, personal administrativ,
              furnizorul IT extern, responsabil cu protecția datelor
Nivel: beginner / intermediate
Durată totală: 1 zi
Format: fizic sau online
Număr participanți: 15
Scop principal: după training, firma are o procedură obligatorie de verificare a instrucțiunilor
                de plată, backup offline testat și un plan de continuitate construit pe calendarul fiscal
Reglementări: GDPR (operator și persoană împuternicită, art. 28, 32, 33, 34), secret profesional
              și norme deontologice aplicabile, legislația de prevenire a spălării banilor unde e cazul.
              NIS2 NU se aplică în general acestui sector — menționează explicit și explică de ce
              cerințele pot ajunge totuși pe cale contractuală.
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Servicii profesionale
2. Subsector: contabilitate, avocatură, consultanță, resurse umane
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: asociați, profesioniști, personal administrativ, furnizori IT externi
5. Nivel: beginner / intermediate
6. Format: platformă web, module scurte
7. Scop principal: protecția datelor clienților și continuitate în raport cu termenele legale
8. Reglementări: GDPR, secret profesional, norme deontologice, cerințe contractuale ale clienților
9. Constrângeri: echipă mică, dependență totală de email, sezonalitate dictată de calendarul fiscal,
                 fără IT intern, buget redus
10. Rezultat urmărit: awareness operațional, proceduri de verificare, toolkit contractual, evaluare de maturitate
```

---

## 10. Capcane de evitat

- **Să afirmi că NIS2 se aplică firmelor de consultanță sau contabilitate.** În general nu se aplică. Eroarea este frecventă și costisitoare pentru credibilitate.
- **Să confunzi rolul de operator cu cel de persoană împuternicită.** Consecințele privind notificarea diferă substanțial. Această clarificare este ea însăși un modul.
- **Să subdimensionezi BEC-ul.** Este riscul cel mai probabil și cel mai păgubitor pentru acest sector. Merită cel puțin un modul dedicat, cu exercițiu practic.
- **Să propui soluții tehnice complexe.** Cea mai eficientă măsură din acest sector — verificarea telefonică a oricărei schimbări de cont bancar — nu costă nimic și nu necesită niciun instrument.
- **Să ignori palierul deontologic.** Pentru profesiile reglementate, răspunderea disciplinară este un argument mai puternic decât amenda GDPR.
