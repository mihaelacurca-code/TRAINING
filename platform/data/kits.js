/* Cyber-Bridge Range — schemele instrumentelor / toolkit instrument schemas
   type: "table" (rânduri) · "form" (câmpuri) · "check" (listă de verificare) */
(function(){
const t=(ro,en)=>({ro:ro,en:en});
const c=(k,ro,en)=>({k:k,n:t(ro,en)});

window.KIT_SCHEMA={
/* ---- nucleu comun ---- */
reg:{type:"table",cols:[
 c("a","Activ","Asset"),c("p","Proces care se oprește","Process that stops"),
 c("t","Timp maxim tolerabil","Maximum tolerable outage"),c("o","Cine răspunde","Owner"),
 c("b","Backup: unde și testat când","Backup: where and last tested")]},
deg:{type:"form",fields:[
 {k:"trg",n:t("Cine declară trecerea pe lucru degradat","Who declares the switch to degraded mode")},
 {k:"f1",n:t("Primele 30 de minute: cine face ce","First 30 minutes: who does what"),long:true},
 {k:"f2",n:t("Cum se înregistrează activitatea pe hârtie","How activity is recorded on paper"),long:true},
 {k:"f3",n:t("Ce se comunică clienților sau beneficiarilor","What is communicated to customers or beneficiaries"),long:true},
 {k:"f4",n:t("Cum se reintroduc datele la revenire","How data is re-entered on recovery"),long:true},
 {k:"tst",n:t("Data ultimului exercițiu","Date of the last drill")}]},
ir:{type:"form",fields:[
 {k:"d",n:t("Cine poate declara un incident major","Who can declare a major incident")},
 {k:"i",n:t("Cine decide izolarea sistemelor","Who decides to isolate systems")},
 {k:"a",n:t("Cine comunică cu autoritatea și la ce număr","Who contacts the authority, and on what number")},
 {k:"p",n:t("Cine vorbește public și cine nu","Who speaks publicly and who does not")},
 {k:"e",n:t("Contacte de escaladare, în afara programului","Escalation contacts, out of hours"),long:true},
 {k:"x",n:t("Furnizori de apelat, cu numere directe","Suppliers to call, with direct numbers"),long:true}]},
rw:{type:"check",items:[
 t("Izolează de rețea, nu opri alimentarea","Isolate from the network, do not cut power"),
 t("Notează ora exactă a primului semnal","Record the exact time of the first signal"),
 t("Fotografiază mesajul de răscumpărare","Photograph the ransom note"),
 t("Salvează jurnalele înainte de orice remediere","Preserve logs before any remediation"),
 t("Verifică dacă backup-urile sunt accesibile și neafectate","Check whether backups are reachable and unaffected"),
 t("Nu reporni sistemele afectate","Do not reboot affected systems"),
 t("Schimbă credențialele privilegiate de pe un sistem curat","Change privileged credentials from a clean system"),
 t("Stabilește dacă există și exfiltrare, nu doar criptare","Establish whether there is exfiltration, not only encryption"),
 t("Pornește ceasul de notificare și documentează decizia","Start the notification clock and document the decision"),
 t("Nu contacta atacatorul fără decizie de conducere","Do not contact the attacker without a leadership decision")]},
bk:{type:"table",cols:[
 c("s","Sistem","System"),c("f","Frecvență","Frequency"),c("l","Unde se păstrează","Where it is kept"),
 c("o","Copie offline sau imuabilă","Offline or immutable copy"),
 c("d","Ultima restaurare testată","Last tested restore"),c("r","Timp de restaurare măsurat","Measured restore time")]},
vnd:{type:"table",cols:[
 c("f","Furnizor","Supplier"),c("s","Serviciu","Service"),c("cr","Critic (da/nu)","Critical (yes/no)"),
 c("a","Tip de acces la sistemele noastre","Type of access to our systems"),
 c("n","Termen de notificare în contract","Notification deadline in contract"),
 c("e","Plan de ieșire","Exit plan")]},
ph:{type:"check",items:[
 t("Orice schimbare de cont bancar se confirmă telefonic","Any bank account change is confirmed by phone"),
 t("Numărul de telefon se ia din contract, nu din email","The phone number comes from the contract, not the email"),
 t("Regula nu are excepție pentru urgență","The rule has no exception for urgency"),
 t("Regula nu are excepție pentru confidențialitate","The rule has no exception for confidentiality"),
 t("Plățile peste prag cer a doua aprobare","Payments above the threshold require a second approval"),
 t("Alertă la crearea de reguli noi de redirecționare","Alert on creation of new mailbox forwarding rules"),
 t("Angajatul care raportează o greșeală nu este sancționat","An employee who reports a mistake is not sanctioned"),
 t("Există un canal clar pentru raportarea mesajelor suspecte","There is a clear channel for reporting suspicious messages")]},
risk:{type:"table",cols:[
 c("r","Risc","Risk"),c("a","Activ afectat","Asset affected"),
 c("p","Probabilitate 1-5","Likelihood 1-5"),c("i","Impact 1-5","Impact 1-5"),
 c("m","Măsură","Measure"),c("o","Cine răspunde","Owner"),c("d","Termen","Deadline")]},
not:{type:"form",fields:[
 {k:"w",n:t("Ce s-a întâmplat, în trei propoziții","What happened, in three sentences"),long:true},
 {k:"t",n:t("Când a început și când a fost detectat","When it started and when it was detected")},
 {k:"s",n:t("Sisteme și date afectate","Systems and data affected"),long:true},
 {k:"n",n:t("Număr estimat de persoane afectate","Estimated number of people affected")},
 {k:"m",n:t("Măsuri luate până acum","Measures taken so far"),long:true},
 {k:"c",n:t("Persoana de contact și datele ei","Contact person and their details")},
 {k:"r",n:t("Ce rămâne de stabilit","What remains to be established"),long:true}]},
acl:{type:"check",items:[
 t("Fiecare persoană are cont propriu, nominal","Every person has their own named account"),
 t("Nu există conturi partajate între colegi","There are no accounts shared between colleagues"),
 t("MFA activ pe tot accesul din exterior","MFA active on all external access"),
 t("Conturile se dezactivează în 24 de ore de la plecare","Accounts are disabled within 24 hours of departure"),
 t("Accesul furnizorilor este temporar și aprobat","Supplier access is temporary and approved"),
 t("Lista de acces se revizuiește semestrial","The access list is reviewed every six months"),
 t("Există evidența cine are drepturi de administrator","There is a record of who holds administrator rights")]},
pat:{type:"table",cols:[
 c("s","Sistem sau echipament","System or equipment"),
 c("u","Se poate actualiza (da/nu/cu acord)","Can be updated (yes/no/with approval)"),
 c("w","Fereastră de mentenanță","Maintenance window"),
 c("c","Dacă nu: ce compensează","If not: compensating control"),c("o","Cine răspunde","Owner")]},
pol:{type:"form",fields:[
 {k:"s",n:t("Ce acoperă politica și pe cine","What the policy covers and for whom")},
 {k:"r",n:t("Reguli obligatorii, maximum șapte","Mandatory rules, seven at most"),long:true},
 {k:"x",n:t("Ce este interzis explicit","What is explicitly prohibited"),long:true},
 {k:"i",n:t("Cum se raportează un incident","How an incident is reported")},
 {k:"o",n:t("Cine aprobă excepțiile","Who approves exceptions")},
 {k:"d",n:t("Data aprobării și a următoarei revizuiri","Approval date and next review date")}]},
bc:{type:"table",cols:[
 c("s","Serviciu","Service"),c("p","Prioritate 1-3","Priority 1-3"),
 c("t","Timp maxim de întrerupere","Maximum tolerable downtime"),
 c("a","Cum se operează fără sisteme","How it operates without systems"),
 c("o","Cine răspunde","Owner")]},
com:{type:"form",fields:[
 {k:"s",n:t("Purtător de cuvânt desemnat și înlocuitor","Designated spokesperson and deputy")},
 {k:"i",n:t("Mesaj intern, primele ore","Internal message, first hours"),long:true},
 {k:"c",n:t("Mesaj către clienți sau beneficiari","Message to customers or beneficiaries"),long:true},
 {k:"p",n:t("Mesaj public sau de presă","Public or press message"),long:true},
 {k:"a",n:t("Ce nu se spune niciodată public","What is never said publicly"),long:true},
 {k:"u",n:t("Cadența actualizărilor","Update cadence")}]},
ll:{type:"form",fields:[
 {k:"w",n:t("Ce a funcționat","What worked"),long:true},
 {k:"n",n:t("Ce nu a funcționat","What did not work"),long:true},
 {k:"s",n:t("Ce ne-a surprins","What surprised us"),long:true},
 {k:"c",n:t("Ce schimbăm, concret","What we change, concretely"),long:true},
 {k:"o",n:t("Cine răspunde de fiecare schimbare","Who owns each change")},
 {k:"d",n:t("Termen de verificare","Verification deadline")}]},
sup:{type:"check",items:[
 t("Are politică de securitate scrisă și aprobată","Has a written, approved security policy"),
 t("Aplică MFA pe accesul la sistemele clienților","Applies MFA on access to client systems"),
 t("Jurnalizează sesiunile de intervenție la distanță","Logs remote intervention sessions"),
 t("Notifică incidentele într-un termen stabilit","Notifies incidents within a defined deadline"),
 t("Testează restaurarea datelor clienților","Tests restoration of client data"),
 t("Are un responsabil de securitate identificabil","Has an identifiable security contact"),
 t("Subcontractează? Către cine și în ce condiții","Subcontracts? To whom and under what terms"),
 t("Acceptă clauze de audit și de ieșire","Accepts audit and exit clauses")]},

/* ---- instrumente sectoriale ---- */
dev2:{type:"table",cols:[
 c("d","Dispozitiv","Device"),c("s","Secție","Ward or unit"),c("n","Segment de rețea","Network segment"),
 c("u","Cine poate actualiza","Who may update"),c("r","Risc dacă devine indisponibil","Risk if unavailable")]},
clin2:{type:"table",cols:[
 c("s","Serviciu clinic","Clinical service"),c("p","Se menține / se amână","Maintained / postponed"),
 c("a","Alternativa fără sisteme","Alternative without systems"),c("d","Cine decide","Who decides")]},
disp2:{type:"form",fields:[
 {k:"l",n:t("Unde se găsește lista curselor, offline","Where the job list is kept, offline")},
 {k:"f",n:t("Frecvența copiei offline","Offline copy frequency")},
 {k:"c",n:t("Cum se contactează șoferii fără sistem","How drivers are contacted without the system"),long:true},
 {k:"p",n:t("Ordinea de prioritate a curselor","Priority order of jobs"),long:true},
 {k:"k",n:t("Cine preia dispeceratul manual","Who takes over manual dispatch")}]},
frd2:{type:"check",items:[
 t("Orice schimbare de punct de descărcare se confirmă telefonic","Any drop-point change is confirmed by phone"),
 t("Numărul se ia din contract, nu din emailul primit","The number comes from the contract, not the received email"),
 t("Transportatorii noi se verifică înainte de alocare","New carriers are checked before allocation"),
 t("Rutele transporturilor de valoare nu se comunică pe email","High-value routes are not communicated by email"),
 t("Punctele de oprire se rotesc periodic","Stopping points are rotated periodically"),
 t("Pierderea semnalului pe marfă de valoare se tratează ca incident","Signal loss on a high-value load is treated as an incident")]},
ot2:{type:"table",cols:[
 c("e","Echipament","Equipment"),c("l","Amplasament","Location"),c("f","Versiune firmware","Firmware version"),
 c("a","Cine are acces","Who has access"),c("c","Configurație salvată la","Configuration saved on")]},
cfg2:{type:"table",cols:[
 c("e","Echipament","Equipment"),c("v","Versiune configurație","Configuration version"),
 c("d","Data salvării","Date saved"),c("l","Unde este copia offline","Where the offline copy is"),
 c("t","Restaurare testată la","Restore tested on")]},
conn2:{type:"table",cols:[
 c("c","Conexiune sau echipament","Connection or device"),c("l","Unde se află fizic","Physical location"),
 c("f","Furnizor","Supplier"),c("p","Scop","Purpose"),
 c("a","Aprobată (da/nu)","Approved (yes/no)"),c("j","Jurnalizată (da/nu)","Logged (yes/no)")]},
trace2:{type:"form",fields:[
 {k:"f",n:t("Formularul de lot pe hârtie: unde se află","Paper batch form: where it is kept")},
 {k:"w",n:t("Ce se înregistrează obligatoriu","What must be recorded"),long:true},
 {k:"s",n:t("Cine semnează fiecare fișă","Who signs each sheet")},
 {k:"r",n:t("Cum se reintroduc datele în MES","How data is re-entered into the MES"),long:true},
 {k:"q",n:t("Acceptat de calitate? Data acordului","Accepted by quality? Date of agreement")}]},
reg2:{type:"table",cols:[
 c("f","Furnizor TIC","ICT provider"),c("s","Serviciu prestat","Service provided"),
 c("c","Critic (da/nu)","Critical (yes/no)"),c("n","Termen de notificare","Notification deadline"),
 c("a","Clauze de audit","Audit clauses"),c("e","Strategie de ieșire","Exit strategy"),
 c("l","Locația datelor","Data location")]},
cls2:{type:"form",fields:[
 {k:"w",n:t("Cine clasifică un incident ca major","Who classifies an incident as major")},
 {k:"c",n:t("Criteriile folosite","The criteria used"),long:true},
 {k:"t",n:t("În cât timp de la detectare","Within what time from detection")},
 {k:"b",n:t("Cine decide dacă cel dintâi nu e disponibil","Who decides if the first person is unavailable")},
 {k:"d",n:t("Unde se documentează decizia","Where the decision is documented")}]},
scr2:{type:"table",cols:[
 c("d","Domeniu extern","External domain"),c("s","Ce script încarcă","What script it loads"),
 c("p","Prezent în checkout (da/nu)","Present in checkout (yes/no)"),
 c("j","Justificare","Justification"),c("a","Păstrat / eliminat","Kept / removed")]},
acc2:{type:"table",cols:[
 c("p","Persoană sau firmă","Person or company"),c("r","Rol","Role"),
 c("s","Ce acces are","What access they hold"),c("c","Contract în vigoare (da/nu)","Contract in force (yes/no)"),
 c("m","MFA activ (da/nu)","MFA active (yes/no)"),c("a","Acțiune","Action")]},
jit2:{type:"check",items:[
 t("Accesul la mediile clienților este temporar, nu permanent","Access to client environments is temporary, not permanent"),
 t("Fiecare sesiune are o aprobare și un motiv","Every session has an approval and a reason"),
 t("Sesiunile sunt înregistrate","Sessions are recorded"),
 t("MFA rezistent la phishing pe conturile privilegiate","Phishing-resistant MFA on privileged accounts"),
 t("Contul de urgență este testat semestrial","The break-glass account is tested every six months"),
 t("Parola contului de urgență este deținută de două persoane","The break-glass password is held by two people"),
 t("Credențialele se revocă în 24 de ore de la plecarea unui coleg","Credentials are revoked within 24 hours of a colleague leaving")]},
ord2:{type:"table",cols:[
 c("c","Client","Client"),c("s","Serviciu prestat","Service provided"),
 c("k","Criticitate pentru societate 1-3","Criticality to society 1-3"),
 c("r","Obligații proprii de raportare","Their own reporting obligations"),
 c("o","Ordinea de restaurare","Restore order"),c("n","Termen contractual de notificare","Contractual notification deadline")]},
ota2:{type:"check",items:[
 t("MFA activ pe fiecare platformă de rezervări","MFA active on every booking platform"),
 t("Fiecare persoană are cont propriu, nu unul comun","Each person has their own account, not a shared one"),
 t("Lista de acces se verifică lunar","The access list is checked monthly"),
 t("Conturile foștilor angajați sunt închise","Former employees' accounts are closed"),
 t("Personalul știe că hotelul nu cere plăți prin link","Staff know the hotel never requests payment by link"),
 t("Există un mesaj pregătit pentru oaspeții fraudați","There is a prepared message for defrauded guests")]},
card2:{type:"check",items:[
 t("Datele de card nu se scriu niciodată pe hârtie","Card data is never written on paper"),
 t("Datele de card nu se primesc și nu se trimit pe email","Card data is never received or sent by email"),
 t("Nu se introduc în câmpuri libere din PMS","It is never entered in free-text PMS fields"),
 t("Garanțiile se iau prin formular securizat sau terminal","Guarantees are taken via secure form or terminal"),
 t("Personalul nou este instruit în prima zi","New staff are trained on day one"),
 t("Notițele cu date de card se distrug imediat","Any notes with card data are destroyed immediately")]},
iban2:{type:"form",fields:[
 {k:"r",n:t("Regula, într-o propoziție","The rule, in one sentence")},
 {k:"w",n:t("Cine are voie să confirme o schimbare de cont","Who may confirm an account change")},
 {k:"n",n:t("De unde se ia numărul de telefon","Where the phone number comes from")},
 {k:"e",n:t("Excepții admise","Permitted exceptions"),hint:t("Răspunsul corect este: niciuna","The correct answer is: none")},
 {k:"c",n:t("Cum se comunică regula clienților","How the rule is communicated to clients"),long:true},
 {k:"d",n:t("Data intrării în vigoare","Effective date")}]},
cal2:{type:"table",cols:[
 c("t","Termen legal","Statutory deadline"),c("d","Data","Date"),
 c("n","Clienți afectați","Clients affected"),
 c("a","Ce se poate face fără sisteme","What can be done without systems"),
 c("p","Prioritate 1-3","Priority 1-3")]},
proc2:{type:"check",items:[
 t("Jurnalizarea sesiunilor de mentenanță, puse la dispoziție la cerere","Maintenance session logging, provided on request"),
 t("Notificarea incidentelor de securitate într-un termen ferm","Security incident notification within a firm deadline"),
 t("Acces aprobat per intervenție, nu permanent","Access approved per intervention, not permanent"),
 t("Test anual de restaurare, cu raport","Annual restore test, with a report"),
 t("Backup offline, în sarcina furnizorului sau a noastră","Offline backup, whether the supplier's duty or ours"),
 t("Predarea datelor și documentației la încetarea contractului","Handover of data and documentation at contract end"),
 t("Persoană de contact pentru securitate, nominalizată","A named security contact")]},
doc2:{type:"form",fields:[
 {k:"s",n:t("Ce servere și unde se află fizic","What servers exist and where they are physically")},
 {k:"a",n:t("Cine are acces și cu ce drepturi","Who has access and with what rights"),long:true},
 {k:"b",n:t("Unde este backup-ul și cum se restaurează","Where the backup is and how it is restored"),long:true},
 {k:"f",n:t("Furnizori și numere de contact","Suppliers and contact numbers"),long:true},
 {k:"p",n:t("Unde se păstrează parolele administrative","Where administrative passwords are kept")},
 {k:"w",n:t("Cine este a doua persoană care știe toate acestea","Who is the second person who knows all this")},
 {k:"d",n:t("Data ultimei verificări","Date of last verification")}]}
};
})();
