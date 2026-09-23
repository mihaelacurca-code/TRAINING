# VARIANTA A — Platformă web de training cyber pentru IMM-uri

> Overlay peste `../01-master-prompt-platform.md`. Se adaugă **după** promptul master.

---

## OVERLAY

Aplică următoarele constrângeri și accente peste promptul master.

### Ipoteza centrală despre utilizator

Organizația-tip are **5–50 de angajați**, nu are CISO, nu are SOC, nu are SIEM și nu are personal dedicat securității. Infrastructura este administrată fie de o persoană cu atribuții mixte, fie de un furnizor extern. Bugetul de securitate este sub pragul la care orice soluție enterprise devine discutabilă. Persoana care intră în platformă o face între două sarcini operaționale, nu într-un context de training dedicat.

**Consecință de design:** fiecare unitate de valoare trebuie să fie livrabilă în **sub 20 de minute** și să producă un artefact concret.

### Accente obligatorii

1. **Self-service complet.** Platforma trebuie să funcționeze fără trainer. Traseul implicit este ghidat, nu ales de utilizator.
2. **Time-to-first-value sub 15 minute.** Primul lucru după onboarding este un quick assessment care produce imediat un scor și primele trei acțiuni.
3. **Artefacte, nu lecții.** Fiecare modul se termină cu ceva ce organizația **are**: un registru, un plan, o listă de contacte, o procedură de o pagină.
4. **Fără presupoziții de instrumente plătite.** Pentru fiecare recomandare indică: varianta cu zero cost (inclusiv funcții deja incluse în ce folosesc deja — Microsoft 365, Google Workspace, sistemul de operare, routerul), varianta low-cost și, doar apoi, varianta avansată.
5. **Delegabilitate.** Pentru fiecare măsură indică explicit dacă poate fi executată intern sau trebuie cerută furnizorului IT — și **cum se formulează cererea către furnizor**, ca text gata de trimis.
6. **Continuitate peste întreruperi.** Utilizatorul va fi întrerupt. Progresul se salvează la nivel de pas, iar reintrarea începe cu un rezumat de trei rânduri.

### Module cu prioritate ridicată

Ordonează curriculumul după **reducerea de risc pe unitatea de efort**, nu după logica academică. Pentru IMM-uri, primele cinci module acoperă de regulă: identitate și MFA · backup și test de restaurare · phishing și BEC · actualizări și expunere externă · răspuns minim la incident. Confirmă sau ajustează ordinea în funcție de sector, dar justifică explicit.

### Secțiuni ale platformei — ajustare

Păstrează: Mission Control · Sector Academy · Simulation Lab (variantă scurtă) · Readiness Dashboard · Toolkit Vault · Incident Response Center · Cyber Hygiene Zone · Supply Chain Security.

Simplifică: Compliance Navigator devine **„Ce mi se aplică"** — un traseu de 10 întrebări care produce lista obligațiilor reale ale organizației, cu distincția legal / standard / bună practică.

Elimină sau amână: Technical Lab avansat, Management Briefing Room ca secțiune separată (managementul este adesea aceeași persoană cu proprietarul).

### Livrabil suplimentar obligatoriu

**„Planul de 90 de zile pentru firma mea"** — generat automat din rezultatele quick assessment-ului, cu maximum 12 acțiuni, fiecare cu: ce se face, cine o face (rol real, nu funcție inexistentă), cât durează, cât costă, ce risc reduce, cum se verifică că s-a făcut.

### Ce trebuie evitat explicit

- Vocabular care presupune structuri inexistente („escaladează către SOC", „conform politicii tale de clasificare a datelor").
- Recomandări care încep cu „implementează o soluție de...".
- Cerințe de documentație care depășesc o pagină per procedură.
- Orice pas care necesită mai mult de 30 de minute fără rezultat vizibil.
