# Checklist de validare a output-ului

Se parcurge după fiecare rulare, înainte de livrare. Orice „nu" înseamnă rerulare parțială, nu corectură cosmetică.

---

## A. Specificitate sectorială

- [ ] Dacă înlocuiesc numele sectorului în text, conținutul **nu** mai are sens. (Dacă are, e generic.)
- [ ] Activele critice sunt cele ale sectorului, nu o listă standard de IT.
- [ ] Amenințările sunt derivate din active concrete, nu preluate dintr-o listă universală.
- [ ] Amenințările irelevante pentru sector au fost **excluse**, nu incluse „pentru completitudine".
- [ ] Exemplele descriu organizații de dimensiunea publicului țintă, din România sau din UE.
- [ ] Vocabularul este cel al sectorului (recepționer, dispecer, asistentă-șefă, operator de tură), nu „utilizatori" și „stakeholderi".

## B. Realism pentru IMM-uri

- [ ] Nicio recomandare nu presupune CISO, SOC, SIEM sau echipă de securitate, fără alternativă.
- [ ] Fiecare măsură are o variantă fără cost sau cu cost redus, explicit indicată.
- [ ] Este precizat, pentru fiecare măsură, **cine o execută** într-o organizație fără IT intern.
- [ ] Măsurile care depind de un furnizor extern sunt marcate ca atare, cu formularea cererii către furnizor.
- [ ] Distincția **must have / should have / advanced capability** apare explicit.
- [ ] Nicio procedură din toolkit nu depășește ce poate completa realist o organizație mică.

## C. Corectitudine regulatorie

- [ ] Fiecare act normativ invocat este **efectiv aplicabil** sectorului și tipului de entitate.
- [ ] Se afirmă explicit și acolo unde un act **nu** se aplică (ex.: NIS2 pentru ospitalitate sau servicii profesionale).
- [ ] Cerințele legale, cerințele de standard și bunele practici sunt în categorii separate, niciodată amestecate.
- [ ] PCI DSS, TISAX, SOC 2 sunt prezentate ca cerințe contractuale, nu ca lege.
- [ ] Termenele de notificare sunt însoțite de actul care le prevede.
- [ ] Nu există nicio cifră de amendă, statistică sau procent fără sursă citabilă.
- [ ] Referințele la legislația națională indică actul concret și faptul că trebuie verificată forma în vigoare.
- [ ] Zonele de interpretare sunt marcate ca atare, nu prezentate ca certitudini.

## D. Calitate pedagogică

- [ ] Obiectivele de învățare sunt măsurabile și verificabile, nu „va înțelege".
- [ ] Există obiective în toate cele cinci categorii: knowledge, skills, decision-making, operational readiness, organizational resilience.
- [ ] Fiecare lecție conține materia efectivă, nu titluri de slide-uri.
- [ ] Fiecare modul produce un **artefact** concret pentru organizație.
- [ ] Traseele pe rol (management / tehnic / igienă cibernetică) sunt distincte, nu același conținut cu alt titlu.
- [ ] Durata declarată este realistă în raport cu volumul de conținut.

## E. Scenarii și exerciții

- [ ] Minimum 3 scenarii, acoperind: incident tehnic, lanț de aprovizionare, criză și continuitate.
- [ ] Cronologia folosește T+0 … T+72h și forțează decizii pe parcurs.
- [ ] Soluția **nu** este oferită înainte de decizia participantului.
- [ ] Consecințele deciziilor greșite sunt explicitate, nu doar cele ale deciziilor corecte.
- [ ] Tabletop-ul are minimum 10 injects, fiecare cu: moment, informație, destinatar, decizie necesară, ce testează.
- [ ] Inject-urile sunt sectoriale, nu interschimbabile între sectoare.
- [ ] Cel puțin un inject testează o dilemă reală (continuitate vs. securitate, transparență vs. acuratețe).

## F. Toolkit și instrumente

- [ ] Template-urile sunt **construite efectiv**, cu coloane, câmpuri și exemple completate.
- [ ] Niciun element de toolkit nu se rezumă la descrierea a ceea ce ar trebui să conțină.
- [ ] Instrumentele tehnice recomandate sunt open-source sau accesibile unei organizații mici.
- [ ] Nu există recomandări de produse comerciale nominalizate acolo unde neutralitatea este cerută (sector public, livrare instituțională).

## G. Măsurare

- [ ] Fiecare KPI are formulă explicită.
- [ ] Fiecare KPI are prag sau tendință de referință.
- [ ] Indicatorii pot fi colectați realist de organizația-țintă, fără instrumente pe care nu le are.
- [ ] Niciun indicator nu creează stimulent pentru sub-raportarea incidentelor.

## H. Evaluare

- [ ] Evaluarea finală are minimum 20 de întrebări.
- [ ] Include întrebări de scenariu, de decizie și de prioritizare a riscului, nu doar cunoștințe.
- [ ] Answer key și explicațiile sunt livrate **separat** de întrebări.
- [ ] Explicațiile spun de ce răspunsurile greșite sunt greșite, nu doar care este cel corect.

## I. Design (numai pentru promptul de platformă)

- [ ] Fiecare vizualizare propusă este justificată printr-o decizie pe care o sprijină.
- [ ] Contrastul respectă WCAG 2.2 AA, inclusiv pe elementele de accent.
- [ ] Nicio informație nu depinde exclusiv de culoare.
- [ ] Există comportament definit pentru `prefers-reduced-motion`.
- [ ] Fiecare ecran are un singur next best action.
- [ ] Sunt definite stările `empty` și `error` pentru componentele de domeniu.
- [ ] Gamificarea trece testul: ar putea apărea într-un raport către consiliul de administrație.
- [ ] Microcopy-ul nu conține exclamații fără informație.

## J. Onestitate

- [ ] Ipotezele formulate de model în lipsa informațiilor sunt marcate explicit ca ipoteze.
- [ ] Incidentele reale citate au sursă; cele fără sursă sunt prezentate ca scenarii construite.
- [ ] Nu există nicio afirmație care să nu poată fi susținută în fața unui participant informat.
- [ ] Limitele programului sunt declarate: ce **nu** acoperă și ce rămâne de făcut cu altă ocazie.

---

## Cele cinci erori care compromit o livrare

Dacă apare una singură dintre ele, întregul training își pierde credibilitatea în fața unui participant informat:

1. **Aplicabilitate legală inventată** — „NIS2 se aplică hotelului dumneavoastră".
2. **Statistică fără sursă** — „78% dintre IMM-uri care suferă un atac se închid în 6 luni".
3. **Bună practică prezentată ca obligație** — „legea vă obligă să aveți un SOC".
4. **Recomandare imposibilă** — „monitorizare 24/7" pentru o firmă de 12 oameni.
5. **Exemplu care nu seamănă cu publicul** — spital universitar american pentru o clinică din Bacău.
