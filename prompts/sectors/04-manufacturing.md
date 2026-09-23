# RAMURA SECTORIALĂ 04 — MANUFACTURING

> Se folosește împreună cu `../00-master-prompt-training.md` sau `../01-master-prompt-platform.md`.
> Toate referințele legale se verifică în EUR-Lex și la autoritatea națională înainte de livrare.

---

## 1. Notă de aplicabilitate regulatorie

| Act | Relevanță pentru sector | Tip |
|---|---|---|
| **NIS2** (Directiva (UE) 2022/2555) | Producția figurează în **Anexa II** — alte sectoare critice, dar **numai pentru anumite ramuri**: dispozitive medicale, calculatoare și produse electronice și optice, echipamente electrice, mașini și utilaje, autovehicule, alte echipamente de transport. De asemenea, producția și distribuția de substanțe chimice și de alimente. Transpusă în România prin **Legea nr. 58/2024**. | Cerință legală, condiționată de ramură și de praguri |
| **Cyber Resilience Act** (Regulamentul (UE) 2024/2847) | Produse cu elemente digitale. Direct relevant pentru producătorii de echipamente conectate, software încorporat sau componente digitale. Calendar de aplicare etapizat — **verifică datele exacte în vigoare**. | Cerință legală pentru producători |
| **Regulamentul privind echipamentele tehnice** (Regulamentul (UE) 2023/1230) | Înlocuiește Directiva Mașini; include cerințe relevante pentru protecția împotriva coruperii software-ului de siguranță. **Verifică data de aplicare.** | Cerință legală pentru producători |
| **IEC 62443** | Referința centrală pentru securitatea sistemelor de automatizare industrială, atât pentru operatori cât și pentru producători. | Standard / bună practică |
| **ISO 27001** | Sistem de management al securității informației; adesea cerut contractual de clienții OEM. | Standard, frecvent obligație contractuală |
| **TISAX** | Schemă de evaluare folosită în industria auto europeană. | Cerință contractuală de facto în lanțul auto |
| **GDPR** | Date de personal, control acces, supraveghere video, date ale clienților B2B. | Cerință legală |

**Atenție:** un producător de subansamble metalice cu 120 de angajați poate să **nu** intre în NIS2 prin ramura sa, dar dacă livrează către un OEM auto, cerințele îi vin prin **TISAX și contract**, cu efect practic imediat. Pentru acest sector, presiunea contractuală este de regulă mai puternică decât cea legală — construiește trainingul în consecință.

---

## 2. Profil operațional

**Procese critice:** planificarea producției · aprovizionarea cu materii prime · execuția pe linie · controlul calității · trasabilitatea loturilor · ambalarea și expedierea · mentenanța · proiectarea produsului.

**Sisteme tipice:** ERP · MES · SCADA și PLC pe linii · roboți industriali · sisteme CNC · sisteme de viziune și control al calității · senzori și IIoT · WMS · sisteme CAD/CAM și PLM · sisteme de mentenanță (CMMS) · acces de la distanță al furnizorilor de utilaje · sisteme de pontaj și control acces.

**Date procesate:** rețete și parametri de proces · desene tehnice și proprietate intelectuală · comenzi și prețuri de la clienți · date de trasabilitate a loturilor · date de personal · date de furnizori.

**Dependențe critice:** furnizorul ERP/MES · producătorii de utilaje cu mentenanță de la distanță · integratorul de automatizări · furnizorii de materii prime cu integrare EDI · clienții OEM cu portaluri de comandă · furnizorul de conectivitate.

**Unde securitatea devine imediat operațională:** linia care se oprește costă pe minut, calculabil. Trasabilitatea pierdută poate declanșa o retragere de produs. Desenele tehnice exfiltrate erodează avantajul competitiv pe termen lung.

---

## 3. Active critice

| Activ | Importanță | Amenințări | Vulnerabilități tipice | Impact potențial | Măsuri recomandate |
|---|---|---|---|---|---|
| ERP / MES | Critică | Ransomware, indisponibilitate, manipulare | Server unic, acces de la distanță fără MFA, integrări cu conturi privilegiate | Oprirea planificării și a producției | MFA, segmentare, backup offline, procedură de producție degradată |
| PLC / roboți / CNC | Critică | Manipulare, indisponibilitate, malware transportat | Rețea plată, USB liber, firmware vechi, parole implicite | Oprirea liniei, rebuturi, risc de siguranță | Segmentare pe celule, control USB, inventar, copii de program |
| Programe CNC și rețete de proces | Critică | Exfiltrare, alterare | Stocare pe partajări deschise, fără versionare | Produse neconforme, pierdere de proprietate intelectuală | Control al accesului, versionare, verificare de integritate |
| Desene tehnice / PLM | Ridicată | Spionaj industrial, exfiltrare | Acces larg, partajare prin email, plecări de personal | Pierderea avantajului competitiv | Clasificare, acces pe bază de necesitate, jurnalizare, proceduri la plecare |
| Trasabilitatea loturilor | Critică | Pierdere, alterare | Date doar în MES, fără copie | Retragere de produs extinsă inutil | Copii redundante, export periodic, verificare de integritate |
| Acces de la distanță al furnizorilor de utilaje | Critică | Abuz, compromitere a furnizorului | Router celular montat de furnizor, necunoscut echipei IT | Punct de intrare invizibil în OT | Inventar al tuturor conexiunilor, jump host, acces just-in-time |
| Portaluri ale clienților OEM | Ridicată | Credential theft, fraudă | Conturi partajate între colegi | Pierderea accesului la comenzi, fraudă | Conturi nominale, MFA, revizuire periodică |
| Backup | Critică | Criptare, ștergere | Copie unică pe aceeași rețea, restaurare netestată | Oprire prelungită | 3-2-1, copie imuabilă, test documentat, inclusiv pentru MES |

---

## 4. Threat landscape prioritizat

| Amenințare | Actor | Vector | Activ afectat | MITRE ATT&CK (Enterprise / ICS) | Impact | Probabilitate | Indicatori timpurii |
|---|---|---|---|---|---|---|---|
| Ransomware cu oprire de producție | Criminalitate organizată | Phishing, VPN/RDP expus, vulnerabilitate de perimetru | ERP, MES, uneori OT | Initial Access, Lateral Movement, Impact | Oprirea liniilor, penalități de livrare | Ridicată | Conturi noi privilegiate, dezactivarea protecției, ștergerea copiilor umbră |
| Spionaj industrial | Concurență, actori statali, insideri | Phishing țintit, exfiltrare de către angajați la plecare | PLM, CAD, rețete | Collection, Exfiltration | Pierderea avantajului competitiv, replicarea produsului | Medie | Descărcări masive înainte de demisie, acces la proiecte fără legătură cu rolul |
| Malware transportat în OT | Oportunist, furnizori, contractori | USB, laptop de service, imagine de mentenanță | PLC, HMI, CNC | ICS: Initial Access, Impair Process Control | Rebuturi, oprire, risc de siguranță | Medie–ridicată | Alerte pe stațiile de proces, comportament anormal al utilajelor |
| BEC și fraudă pe furnizori | Criminalitate financiară | Email compromis, domenii similare | Financiar, aprovizionare | Initial Access, Impact | Pierdere financiară, întreruperi de aprovizionare | Ridicată | Schimbări de IBAN, facturi urgente, reguli de redirecționare |
| Compromiterea furnizorului de utilaje sau software | Actori avansați, criminalitate | Mentenanță de la distanță, actualizare | OT și IT | Supply Chain Compromise, Persistence | Compromitere greu detectabilă, multi-client | Medie | Conexiuni în afara ferestrelor agreate, modificări nedocumentate |
| Manipularea parametrilor de proces | Insider, actor avansat | Acces la HMI sau la rețete | Calitate, siguranță | ICS: Impair Process Control | Produse neconforme, retragere, risc de siguranță | Scăzută, impact ridicat | Abateri de calitate fără cauză mecanică, modificări de rețetă fără trasabilitate |
| Extorcare fără criptare (doar exfiltrare) | Criminalitate | Acces persistent, exfiltrare lentă | Contracte, prețuri, proiecte | Exfiltration, Impact | Presiune comercială, expunerea prețurilor față de clienți | În creștere | Trafic ieșit constant către servicii de stocare, arhive create noaptea |

---

## 5. Particularitatea IMM în acest sector

1. **Costul se calculează pe minut.** Producătorii știu exact cât costă o oră de linie oprită. Este cel mai bun argument disponibil într-un training — folosește-l pentru a construi prioritizarea riscurilor, nu doar ca ilustrație.
2. **Utilajele trăiesc 20 de ani, software-ul lor nu.** Un strung cu control numeric cumpărat în 2009 rulează un sistem de operare nesuportat și nu poate fi actualizat fără acordul producătorului. Trainingul trebuie să predea izolare și compensare, nu modernizare imaginară.
3. **Furnizorii intră în fabrică fără ca IT-ul să știe.** Routerul celular montat de tehnicianul care a instalat utilajul este cel mai frecvent punct de intrare necunoscut. Primul exercițiu util în acest sector este **inventarul conexiunilor externe**.
4. **Cerința vine de la client, nu de la stat.** Chestionarul TISAX sau al OEM-ului deschide bugetul mai repede decât orice referință legală. Structurează modulul de conformitate în jurul lui.
5. **Proprietatea intelectuală e activul pe termen lung.** Producția se reia în trei zile. Un desen tehnic ajuns la un concurent nu se recuperează niciodată.

---

## 6. Semințe de scenarii

**Scenariul 1 — incident tehnic: ransomware în timpul schimbului de noapte**
Producător de componente, 140 de angajați, trei linii, livrare just-in-time către un OEM auto. La 23:40, MES-ul devine indisponibil; la 00:15 se confirmă criptarea în rețeaua de birou. Liniile rulează încă, pe programele deja încărcate, dar nu se mai poate înregistra trasabilitatea. Livrarea de la 06:00 este contractuală, cu penalizare pe oră. Decizii: se continuă producția fără trasabilitate, se oprește, cum se înregistrează manual, ce se comunică OEM-ului și când.

**Scenariul 2 — supply chain: tehnicianul furnizorului de utilaje**
În timpul unei intervenții programate, tehnicianul producătorului de utilaje conectează laptopul propriu la celula de producție. A doua zi, sistemul de securitate semnalează comportament anormal pe două HMI-uri. Furnizorul confirmă, după două zile, că a avut un incident intern. Decizii: se suspendă contractele de mentenanță de la distanță (cu risc de a rămâne fără suport), cum se verifică celelalte utilaje ale aceluiași furnizor, ce se cere contractual de acum înainte, dacă există obligație de notificare.

**Scenariul 3 — criză și continuitate: exfiltrare și extorcare comercială**
Nimic nu este criptat. Un grup criminal trimite direct directorului general un eșantion care conține contractul-cadru cu principalul client, prețurile negociate și desenele a două produse în dezvoltare. Cere plată în 72 de ore, amenințând că trimite materialul clienților și concurenței. Decizii: se informează clientul (cu riscul de a pierde contractul) sau nu, se plătește, se notifică autoritatea, cum se evaluează ce anume a fost luat, ce se comunică intern.

---

## 7. Inject-uri sectoriale

1. `T+30 min` — Șeful de tură întreabă dacă poate continua producția înregistrând loturile pe hârtie. **Decizie:** da sau nu și în ce formă. **Testează:** existența unei proceduri de trasabilitate degradată.
2. `T+1h` — OEM-ul solicită confirmarea livrării de la 06:00. **Decizie:** ce se comunică și de către cine. **Testează:** gestionarea relației cu clientul critic sub incertitudine.
3. `T+2h` — Un operator raportează că un robot a executat o mișcare neașteptată la repornire. **Decizie:** se oprește celula, se declară incident de siguranță? **Testează:** prioritizarea siguranței persoanelor.
4. `T+3h` — Furnizorul ERP propune restaurarea rapidă dintr-o copie de acum 6 zile. **Decizie:** se acceptă pierderea a 6 zile de date? **Testează:** înțelegerea RPO în termeni de business.
5. `T+5h` — Departamentul de calitate nu poate demonstra trasabilitatea pentru loturile din ultimele 8 ore. **Decizie:** se blochează loturile? se livrează? **Testează:** legătura dintre incident IT și conformitatea produsului.
6. `T+8h` — Un angajat menționează că același furnizor a avut acces și la linia 3, prin „un router pe care l-au adus ei". **Decizie:** cum se tratează descoperirea unei conexiuni necunoscute. **Testează:** realitatea inventarului de conexiuni.
7. `T+14h` — Apare o cerere de răscumpărare cu eșantion de desene tehnice. **Decizie:** se schimbă încadrarea incidentului? cine este informat? **Testează:** recunoașterea exfiltrării ca incident distinct de criptare.
8. `T+20h` — Clientul OEM trimite un chestionar de securitate urgent, cu termen 48 de ore. **Decizie:** cine răspunde și cu ce. **Testează:** capacitatea de a documenta starea reală.
9. `T+36h` — Un fost angajat, plecat acum două luni la un concurent, apare în jurnalele de acces ca activ în urmă cu trei săptămâni. **Decizie:** cum se tratează. **Testează:** procedurile de dezactivare la plecare.
10. `T+60h` — Asigurătorul cibernetic cere raportul preliminar. **Decizie:** ce conține și cine îl semnează. **Testează:** documentarea pe parcurs, nu retroactivă.

---

## 8. KPI sectoriale

| Indicator | Formulă | Prag orientativ |
|---|---|---|
| Conexiuni externe către OT, inventariate | conexiuni documentate și aprobate / total conexiuni descoperite × 100 | 100% |
| Timp până la producție cu trasabilitate degradată | minute de la pierderea MES până la înregistrare alternativă funcțională | < 30 min |
| Programe CNC și rețete versionate și salvate extern | active versionate / total × 100 | 100% |
| MFA pe ERP, portaluri de client și acces de la distanță | conturi cu MFA / total × 100 | 100% |
| Dezactivarea accesului la plecarea din firmă | conturi dezactivate în 24h / total plecări × 100 | 100% |
| Test de restaurare MES/ERP | teste complete documentate în ultimele 12 luni | ≥ 2 |
| Cost estimat al unei ore de oprire, cunoscut și documentat | există / nu există, pe fiecare linie | există pentru 100% din linii |
| Chestionare de client cu răspuns documentat și dovezi | răspunsuri complete / chestionare primite × 100 | 100% |

---

## 9. Blocuri INPUT precompletate

### Pentru `00-master-prompt-training.md`

```
Sector: Producție industrială
Subsector: producție de componente și subansamble, inclusiv furnizori în lanțul auto, 50-250 angajați
Țară/regiune: România / Uniunea Europeană
Public țintă: management, producție și mentenanță, calitate, aprovizionare, financiar,
              persoana cu atribuții IT, integratorul de automatizări
Nivel: mixed, cu traseu tehnic distinct pentru OT
Durată totală: 2 zile
Format: fizic, cu exercițiu în fabrică
Număr participanți: 22
Scop principal: după training, firma are inventarul complet al conexiunilor externe către producție,
                o procedură de trasabilitate degradată testată și răspuns documentat la chestionarele clienților
Reglementări: NIS2 (verifică ramura și pragurile), Legea nr. 58/2024, CRA pentru produsele proprii
              cu elemente digitale, IEC 62443, ISO 27001, cerințe TISAX/OEM
```

### Pentru `01-master-prompt-platform.md`

```
1. Sector: Producție industrială
2. Subsector: furnizori din lanțul auto și producție de echipamente, 50-250 angajați
3. Țară/regiune: România / Uniunea Europeană
4. Public țintă: management, producție, mentenanță, calitate, aprovizionare, IT, integratori
5. Nivel: mixed
6. Format: platformă web, cu laborator OT simulat
7. Scop principal: continuitate de producție și capacitate de a satisface cerințele clienților OEM
8. Reglementări: NIS2 / Legea 58/2024, CRA, IEC 62443, ISO 27001, TISAX
9. Constrângeri: utilaje cu ciclu de viață lung și software neactualizabil, acces al furnizorilor
                 slab controlat, IT redus, producție în trei schimburi
10. Rezultat urmărit: evaluare de maturitate OT/IT, exerciții de oprire de linie, toolkit de control al furnizorilor
```

---

## 10. Capcane de evitat

- **Să tratezi „manufacturing" ca un bloc omogen.** Un producător de dispozitive medicale și o turnătorie au regimuri regulatorii și riscuri diferite. Alege ramura.
- **Să promiți patching pe utilaje.** Nu se întâmplă. Predă izolare, control USB, copii de program și monitorizare pasivă.
- **Să treci peste proprietatea intelectuală.** Este cel mai mare risc pe termen lung și cel mai puțin discutat în trainingurile generice.
- **Să ignori extorcarea fără criptare.** Tot mai multe incidente nu opresc nimic — doar amenință cu publicarea. Scenariile trebuie să acopere și acest caz.
- **Să presupui că IT-ul cunoaște rețeaua de producție.** În majoritatea cazurilor, nu o cunoaște. Începe cu descoperirea, nu cu apărarea.
