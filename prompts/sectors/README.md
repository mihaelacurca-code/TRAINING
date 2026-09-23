# Ramuri sectoriale

Același nucleu metodologic, scenarii și obligații diferite.

Fiecare fișier conține:

1. **Notă de aplicabilitate regulatorie** — ce se aplică efectiv sectorului, inclusiv cazurile în care sectorul **nu** intră în NIS2 și intră doar indirect, ca furnizor.
2. **Profil operațional** — procese critice, sisteme, date, dependențe.
3. **Active critice** — matrice sectorială.
4. **Threat landscape prioritizat** — amenințările care contează efectiv, cu tactici MITRE ATT&CK.
5. **Particularitatea IMM** — ce diferențiază organizațiile mici din acest sector.
6. **Seminţe de scenarii** — trei scenarii sectoriale gata de dezvoltat.
7. **Inject-uri sectoriale** — exemple specifice, nu generice.
8. **KPI sectoriale**.
9. **Blocuri INPUT precompletate** — pentru promptul de training și cel de platformă.
10. **Capcane** — greșeli tipice de conținut pentru sectorul respectiv.

| # | Sector | Fișier | NIS2 (orientativ) |
|---|---|---|---|
| 01 | Health | `01-health.md` | Anexa I — sector de înaltă criticitate |
| 02 | Transport | `02-transport.md` | Anexa I — sector de înaltă criticitate |
| 03 | Energy | `03-energy.md` | Anexa I — sector de înaltă criticitate |
| 04 | Manufacturing | `04-manufacturing.md` | Anexa II — parțial, în funcție de subsector |
| 05 | Financial Services | `05-financial-services.md` | Anexa I, cu DORA ca lex specialis |
| 06 | Retail & e-Commerce | `06-retail-ecommerce.md` | În general în afara domeniului; marketplace-urile online — Anexa II |
| 07 | Digital Services & Cloud | `07-digital-services-cloud.md` | Anexa I (infrastructură digitală, ICT B2B) și Anexa II |
| 08 | Tourism & Hospitality | `08-tourism-hospitality.md` | În general în afara domeniului |
| 09 | Professional Services | `09-professional-services.md` | În general în afara domeniului; relevant ca furnizor |
| 10 | Public Administration | `10-public-administration.md` | Anexa I, cu particularități naționale |

---

## Avertisment privind coloana NIS2

Coloana de mai sus este **orientativă**, pentru a ghida completarea INPUT-ului. Aplicabilitatea reală depinde de:

- activitatea concretă a entității, nu de eticheta sectorului;
- pragurile de dimensiune (regula generală vizează entitățile mijlocii și mari, cu excepții care se aplică indiferent de dimensiune);
- calificarea ca entitate esențială sau importantă;
- **legea națională de transpunere** și deciziile autorității competente — în România, Legea nr. 58/2024 și DNSC.

Încadrarea unei organizații concrete se stabilește juridic, nu dintr-un tabel de orientare. Verifică textul în vigoare în EUR-Lex și la autoritatea națională înainte de a afirma ceva într-un training livrat.

---

## Cum extinzi biblioteca cu un sector nou

1. Copiază structura unui fișier existent din acest director.
2. Începe cu **nota de aplicabilitate regulatorie** — ea determină jumătate din conținut.
3. Scrie profilul operațional **înainte** de threat landscape; amenințările derivă din procese și active, nu invers.
4. Testul de validare: dacă schimbi numele sectorului în text și conținutul rămâne plauzibil, fișierul nu este suficient de specific. Rescrie-l.
