# Surse oficiale și reguli de citare

Prompturile cer modelului să folosească surse oficiale actualizate. Acest document spune care sunt ele și cum se verifică output-ul.

---

## 1. Ierarhia surselor

**Nivelul 1 — text normativ.** Singura sursă acceptabilă pentru o afirmație despre o obligație legală.

| Sursă | Ce conține | Link |
|---|---|---|
| EUR-Lex | Textele consolidate ale legislației UE | https://eur-lex.europa.eu |
| Monitorul Oficial / portalul legislativ național | Legislația română, inclusiv transpunerile | https://legislatie.just.ro |

**Nivelul 2 — autoritate competentă.** Interpretare oficială, ghiduri, formulare, liste de entități.

| Sursă | Domeniu |
|---|---|
| **DNSC** — Directoratul Național de Securitate Cibernetică | NIS2 în România, CSIRT național, alerte |
| **ANSPDCP** — Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal | GDPR în România |
| **ASF**, **BNR** | Entități financiare, DORA, PSD2 |
| **ENISA** — Agenția Uniunii Europene pentru Securitate Cibernetică | Ghiduri, rapoarte, peisajul amenințărilor |
| **Comisia Europeană** | Acte de punere în aplicare, ghiduri, întrebări frecvente |
| **EDPB** — Comitetul European pentru Protecția Datelor | Ghiduri GDPR |
| **ECCC** — Centrul European de Competențe în domeniul Securității Cibernetice | Programe, finanțare |

**Nivelul 3 — referințe tehnice.** Pentru controale și practici, nu pentru obligații legale.

NIST (Cybersecurity Framework, publicațiile 800-*) · CISA · MITRE ATT&CK și ATT&CK for ICS · CIS Controls · standardele ISO/IEC și IEC relevante · CERT-urile și CSIRT-urile naționale.

**Nivelul 4 — surse comerciale.** Rapoarte de industrie, studii de furnizori. Utilizabile pentru tendințe, **niciodată** pentru afirmații despre obligații și doar cu citare explicită a autorului și a anului. Într-o livrare instituțională sau publică, preferă să le eviți.

---

## 2. Reguli de citare în materialele de training

1. **Orice obligație se citează cu actul și articolul.** „Notificarea se face în cel mult 72 de ore (GDPR, art. 33 alin. 1)" — nu „legea cere 72 de ore".
2. **Orice cifră are sursă și an.** Dacă nu ai sursă, formulează calitativ: „un procent semnificativ" este preferabil unei cifre inventate.
3. **Orice incident real se citează.** Sursa, data, ce s-a confirmat oficial și ce a rămas neconfirmat. Dacă nu poți cita, prezintă-l ca scenariu construit — și spune asta.
4. **Legislația se datează.** „Verificat în EUR-Lex la data de …". Actele se modifică; un material de training fără dată devine periculos în 18 luni.
5. **Interpretarea se marchează.** Când răspunsul depinde de ghidurile autorității sau de practică încă neconsolidată, spune-o. Nu propune o concluzie fermă acolo unde nu există una.

---

## 3. Erori frecvente de verificat în output

| Eroare | De ce e gravă | Cum o corectezi |
|---|---|---|
| Aplicabilitate NIS2 extinsă la sectoare neacoperite | Compromite tot materialul de conformitate | Verifică Anexa I și Anexa II, plus transpunerea națională |
| PCI DSS prezentat ca obligație legală | Confuzie între contract și lege | Marchează-l ca cerință contractuală a schemelor de card |
| Praguri de dimensiune ignorate | Entități mici declarate în domeniu fără temei | Verifică regula generală și excepțiile care se aplică indiferent de dimensiune |
| Termene de notificare amestecate între regimuri | Termenele NIS2, GDPR și DORA sunt distincte | Tratează fiecare regim separat, cu actul lui |
| Statistici „din piață" fără autor | Primul lucru pe care îl verifică un participant informat | Elimină sau citează |
| Denumiri de autorități aproximative | Semnalează superficialitate | Folosește denumirea oficială completă, cel puțin la prima menționare |
| Date de aplicare a actelor recente, afirmate din memorie | CRA, AI Act și altele au calendare etapizate | Verifică fiecare dată în textul actului |

---

## 4. Procedura minimă de verificare înainte de livrare

1. Extrage din output **toate** afirmațiile care conțin o obligație, un termen sau o cifră.
2. Pentru fiecare, identifică sursa de nivel 1 sau 2.
3. Marchează în material sursa și data verificării.
4. Elimină sau reformulează ce nu poate fi susținut.
5. Adaugă la final o notă: materialul reflectă legislația la data X; utilizatorul verifică forma în vigoare.

Pentru un program livrat comercial sau instituțional, pasul 2 nu este opțional. Un model lingvistic poate produce referințe plauzibile și greșite, iar în conformitate o referință greșită este mai dăunătoare decât absența ei.

---

## 5. Notă privind actele cu aplicare etapizată

Câteva acte relevante pentru bibliotecă au calendare de aplicare pe etape, iar afirmațiile despre ele îmbătrânesc rapid. Verifică **întotdeauna** în textul actului, nu din memorie și nu din materiale secundare:

- **Cyber Resilience Act** — Regulamentul (UE) 2024/2847
- **AI Act** — Regulamentul (UE) 2024/1689
- **DORA** — Regulamentul (UE) 2022/2554 și standardele tehnice aferente
- **NIS2** — Directiva (UE) 2022/2555 și transpunerea națională (în România, Legea nr. 58/2024 și actele subsecvente)
- **CER** — Directiva (UE) 2022/2557 și desemnările naționale

Aceleași acte sunt și cele în legătură cu care modelele produc cel mai frecvent date de aplicare inexacte.
