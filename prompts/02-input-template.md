# INPUT TEMPLATE — blocul de completat înainte de rulare

Calitatea output-ului depinde aproape integral de calitatea INPUT-ului. Un INPUT vag produce un curs generic, exact ce prompturile încearcă să evite.

---

## Blocul de copiat

```
INPUT

1.  Sector:                       [ ]
2.  Subsector:                    [ ]
3.  Țară / regiune:               România / Uniunea Europeană
4.  Public țintă:                 [ ]
5.  Nivel:                        [beginner / intermediate / advanced / mixed]
6.  Durată totală:                [ ]            (doar pentru promptul de training)
7.  Format:                       [ ]
8.  Număr participanți:           [ ]            (doar pentru promptul de training)
9.  Scop principal:               [ ]
10. Reglementări / framework-uri: [ ]
11. Constrângeri:                 [ ]            (doar pentru promptul de platformă)
12. Rezultat urmărit:             [ ]            (doar pentru promptul de platformă)

Context suplimentar (opțional, dar recomandat):
- Profil tipic al organizației: [nr. angajați, cifră de afaceri, existența/absența IT intern]
- Sisteme cunoscute în uz:      [ ]
- Incidente anterioare:         [ ]
- Buget disponibil:             [ ]
- Cine livrează trainingul:     [trainer intern / consultant / autoritate / asociație sectorială]
- Limba livrării:               [română / engleză / bilingv]
```

---

## Ghid de completare

### 1–2. Sector și subsector
Cu cât mai îngust, cu atât mai bun. „Health" produce conținut mediu; „cabinete stomatologice private cu 5–20 angajați" produce conținut utilizabil a doua zi.

### 4. Public țintă
Nu scrie „toată lumea". Dacă publicul este mixt, spune explicit compoziția aproximativă: *„60% personal operațional non-tehnic, 25% management, 15% IT (1 persoană/organizație, fără specializare securitate)"*.

### 5. Nivel
`mixed` este realist pentru IMM-uri, dar cere explicit modelului să separe traseele (management / tehnic / igienă cibernetică), altfel conținutul se aplatizează la cel mai mic numitor comun.

### 6. Durată
Ancora care determină numărul de module:

| Durată | Module recomandate |
|---|---|
| 4 ore | 4–5 |
| 1 zi | 6–7 |
| 2 zile | 8–10 |
| 5 zile | 10–12 + laborator |
| Program modular | 10–12, livrate în serie |

### 9. Scop principal
Formulează-l ca rezultat observabil, nu ca temă. Nu „awareness de securitate", ci *„după training, fiecare organizație participantă are un registru de active critice completat și un plan de răspuns la incident de o pagină"*.

### 10. Reglementări
Include doar actele **aplicabile efectiv**. Fișierele din `prompts/sectors/` conțin deja analiza de aplicabilitate pentru fiecare sector, inclusiv cazurile în care sectorul **nu** intră în domeniul NIS2 și intră doar indirect, ca furnizor.

### 11. Constrângeri
Cel mai valoros câmp pentru IMM-uri. Scrie realitatea: *„fără personal IT dedicat; infrastructura administrată de un furnizor extern; buget sub 3.000 EUR/an pentru securitate"*. Modelul va calibra toate recomandările în funcție de acest câmp.

---

## Rularea în doi pași (recomandat)

**Pasul 1 — arhitectura**
> Rulează doar Etapele 0–6 (platformă) sau 1–4 (training). Oprește-te după Curriculum Map și explică logica succesiunii modulelor. Nu dezvolta încă materia.

**Pasul 2 — dezvoltarea**
> Dezvoltă acum Modulul 1 integral, conform Etapei 7. Păstrează consistența cu arhitectura aprobată. După fiecare modul, oprește-te și așteaptă confirmarea.

Livrarea „dintr-o singură bucată" a tuturor celor 33 de secțiuni produce, previzibil, conținut superficial pe fiecare.

---

## Comenzi de aprofundare utile după rulare

- „Rescrie Modulul 4 presupunând că organizația nu are niciun instrument de securitate plătit."
- „Extinde Scenariul 2 cu 6 injects suplimentare pentru faza de recovery."
- „Transformă toolkit-ul în tabele completabile, cu coloane și exemple de rânduri completate."
- „Pentru fiecare măsură din planul de 30 de zile, indică cine o execută într-o firmă de 12 oameni fără IT intern."
- „Separă în tabel ce este cerință legală, ce este cerință de standard și ce este bună practică; marchează sursa pentru fiecare rând."
