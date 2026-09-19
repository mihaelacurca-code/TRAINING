# Metodologia bibliotecii

De ce prompturile au forma aceasta și de ce etapele sunt în ordinea aceasta.

---

## 1. Problema pe care o rezolvă

Cererea „fă-mi un training de cybersecurity pentru sectorul X" produce, previzibil, același rezultat: un curs despre parole, phishing și backup, cu un capitol de NIS2 lipit la final. Este conținut corect și inutil — nu schimbă nimic în organizația care îl primește.

Motivele sunt structurale:

| Cauză | Efect în output |
|---|---|
| Modelul nu știe ce face efectiv organizația | Exemple generice, care nu se recunosc |
| Nu există ancoră de constrângeri | Recomandări care presupun SOC, SIEM, buget |
| Lipsește ierarhia de risc | Toate măsurile par la fel de importante |
| Reglementarea e tratată ca temă, nu ca filtru | Obligații inventate sau extinse abuziv |
| Se cere totul deodată | Superficialitate uniformă pe 30 de secțiuni |

Prompturile din această bibliotecă atacă fiecare dintre aceste cauze printr-o etapă dedicată, plasată **înainte** de conținut.

---

## 2. Logica succesiunii etapelor

Ordinea nu este arbitrară. Fiecare etapă produce inputul obligatoriu al următoarei.

```
   SECTOR
     │  ce face organizația, cu ce sisteme, de cine depinde
     ▼
   ACTIVE CRITICE
     │  ce se pierde dacă pică fiecare lucru
     ▼
   THREAT LANDSCAPE
     │  cine și cum atacă tocmai aceste active
     ▼
   PERSONAS
     │  cine, în organizație, poate face ceva în privința asta
     ▼
   LEARNING OBJECTIVES
     │  ce trebuie să poată face fiecare, măsurabil
     ▼
   CURRICULUM
     │  ce module produc exact acele capabilități
     ▼
   CONȚINUT · SCENARII · EXERCIȚII
     │  materia efectivă, sub presiune realistă
     ▼
   TOOLKIT · MATURITATE · CONFORMITATE
     │  ce rămâne organizației după ce pleacă trainerul
     ▼
   ACTION PLAN
        ce se face luni dimineață
```

**Regula de aur:** o etapă nu poate fi sărită. Dacă modelul generează module fără să fi produs mai întâi matricea de active și peisajul de amenințări, modulele vor fi generice — pentru că nu au de unde să fie altceva.

### De ce amenințările vin după active, nu înainte

Lista de amenințări este aceeași pentru toate sectoarele dacă o ceri direct. Devine sectorială abia când e derivată din active concrete: „ransomware" e generic; „ransomware care criptează PACS-ul și oprește imagistica sâmbătă noaptea" e util. Ordinea active → amenințări forțează această specificitate.

### De ce personas vine după amenințări

Nevoile de training nu se deduc din organigramă, ci din întrebarea: *cine poate face ceva în legătură cu aceste riscuri concrete?* Uneori răspunsul e surprinzător — în ospitalitate, recepția contează mai mult decât IT-ul; în administrația locală, compartimentul de achiziții are mai multă pârghie decât informaticianul.

### De ce obiectivele de învățare sunt separate în cinci categorii

`Knowledge / Skills / Decision-making / Operational readiness / Organizational resilience`

Pentru că trainingurile de securitate se opresc, de obicei, la primul nivel. Separarea forțează modelul să producă obiective de decizie și de pregătire operațională, nu doar de cunoaștere. Un participant care „știe ce este un BEC" și unul care „poate decide, în 5 minute, dacă o cerere de plată este legitimă" sunt rezultate diferite.

---

## 3. Cele patru mecanisme anti-generic

Prompturile conțin patru constrângeri care fac diferența. Dacă modifici prompturile, păstrează-le.

### Mecanismul 1 — Întrebarea IMM-ului

> „Cum poate implementa acest lucru un IMM cu resurse limitate?"

Aplicată la **fiecare** recomandare. Elimină automat sfaturile de tipul „implementați o soluție EDR cu monitorizare 24/7" pentru o firmă de 14 oameni și forțează alternativa: ce e deja inclus în ce folosesc, ce costă puțin, ce se cere furnizorului.

### Mecanismul 2 — Separarea legal / standard / bună practică

Trei categorii, niciodată amestecate. Previne cea mai dăunătoare eroare posibilă într-un training de conformitate: prezentarea unei bune practici drept obligație legală. Odată descoperită de un participant, această eroare compromite întreaga livrare.

### Mecanismul 3 — Decizia înaintea soluției

În scenarii și tabletop, participanții decid **înainte** de a primi răspunsul, iar consecința deciziei greșite e arătată explicit. Fără acest mecanism, un scenariu devine o poveste ilustrativă, nu un exercițiu.

### Mecanismul 4 — Artefactul obligatoriu

Fiecare modul se termină cu ceva ce organizația **are** după training: un registru, o procedură de o pagină, o listă de contacte, un plan. Trainingul fără artefact se evaporă în două săptămâni.

---

## 4. Ce adaugă stratul de design (promptul de platformă)

Promptul de platformă nu este promptul de training „plus niște culori". Designul rezolvă probleme pedagogice concrete:

| Problemă de învățare | Soluție de design |
|---|---|
| Participantul nu înțelege ce e relevant pentru el | Trasee pe rol, nu meniu comun cu permisiuni |
| Conținutul se uită în două săptămâni | Artefacte în Toolkit Vault, revenire la ele în muncă |
| Presiunea reală nu se poate simula prin citit | Simulare cu ceas, decizii cronometrate, consecințe |
| Progresul se percepe ca bifare | Readiness score legat de capabilități observabile |
| Riscul abstract nu mobilizează | Threat map legat de activele proprii |
| Nu se știe ce urmează | Un singur next best action pe fiecare ecran |

De aceea principiul din `design/design-experience-blueprint.md` spune: *fiecare vizual justifică o decizie*. Estetica futuristă nu e decor — este ceea ce face ca un instrument profesional să fie deschis a doua oară.

---

## 5. Rularea etapizată

Prompturile cer explicit livrare în doi timpi, pentru că raportul dintre lungimea contextului și adâncimea fiecărei secțiuni este invers proporțional.

**Pasul 1 — arhitectura.** Etapele 0–6 (platformă) sau 1–4 (training). Output: profilul sectorului, activele, amenințările, personas, obiectivele, harta de curriculum și **logica succesiunii modulelor**. Se validează aici, unde corecțiile sunt ieftine.

**Pasul 2 — dezvoltarea.** Modul cu modul, cu oprire după fiecare. Fiecare modul se raportează la arhitectura aprobată, ceea ce menține consistența.

Un semn că rularea a fost prea comprimată: modulele au titluri bune și conținut interschimbabil.

---

## 6. Cum se extinde biblioteca

### Un sector nou

1. Pornește de la **nota de aplicabilitate regulatorie**. Ea decide jumătate din conținut și este partea în care se fac cele mai multe erori.
2. Scrie profilul operațional înainte de amenințări.
3. Derivă amenințările din active, nu dintr-o listă generală.
4. Identifică **particularitatea IMM** a sectorului — ce anume face ca organizațiile mici din acest sector să fie diferite. Dacă nu găsești nimic specific, nu ai înțeles încă sectorul.
5. Testul final: schimbă numele sectorului în text. Dacă restul rămâne plauzibil, fișierul nu e gata.

### Un subsector

Subsectoarele merită fișiere proprii când diferă **activele critice** sau **regimul de reglementare**, nu doar vocabularul. „Transport aerian" și „transport rutier de marfă" merită fișiere separate. „Contabilitate" și „consultanță fiscală" nu.

### O variantă de produs

Variantele sunt overlay-uri, nu prompturi complete. Conțin doar: ipoteza despre utilizator, accentele obligatorii, secțiunile adăugate sau eliminate, livrabilele suplimentare și lista de lucruri de evitat. Dacă o variantă repetă promptul master, e prost construită.

---

## 7. Limitele metodei

Onestitate necesară:

- **Modelul nu cunoaște organizația.** Produce un program bun pentru un sector, nu pentru o firmă anume. Adaptarea finală rămâne a trainerului.
- **Referințele legale trebuie verificate.** Metodologia reduce riscul prin separarea categoriilor și prin nota de aplicabilitate, dar nu îl elimină. Vezi `sources.md`.
- **Scenariile sunt plauzibile, nu documentate.** Dacă un training are nevoie de incidente reale, ele se citează din surse oficiale; scenariile generate sunt construcții didactice și trebuie prezentate ca atare.
- **Nu înlocuiește evaluarea de risc.** Un program de training, oricât de sectorial, nu este o analiză de risc a organizației. Poate însă produce condițiile în care organizația își face una.
