/* CYBER-BRIDGE T3.1 — compliance tracking & monitoring toolkit.
   Everything the page shows is computed from window.CB (built from the registry)
   and from the tracking state the user records. No aggregate compliance score is
   produced anywhere: the five states are always shown side by side. */
(function(){
"use strict";
var D = window.CB;
var REQ = D.req, BY = {};
REQ.forEach(function(r){ BY[r.id] = r; });
var GROUPS = D.groups, GKEYS = Object.keys(GROUPS);

var ST = {
  not:  {l:"Not satisfied", s:"✕"},
  part: {l:"Partially satisfied", s:"◐"},
  ins:  {l:"Insufficient evidence", s:"?"},
  sat:  {l:"Satisfied", s:"●"},
  na:   {l:"Not applicable", s:"–"}
};
var ORDER = ["not","part","ins","sat","na"];
var ROLES = {essential_entity:"Essential entity (NIS2)", important_entity:"Important entity (NIS2)", manufacturer:"Manufacturer (CRA)"};
var FLAGS = {
  significant_incident:"Significant incident (NIS2)",
  actively_exploited_vulnerability:"Actively exploited vulnerability (CRA)",
  severe_product_incident:"Severe incident affecting product security (CRA)",
  csirt_requested_intermediate:"CSIRT requested an intermediate report",
  incident_ongoing_at_final_report:"Incident still ongoing at final report",
  trust_service_provider:"Trust service provider"
};
var INC_FLAGS = ["significant_incident","actively_exploited_vulnerability","severe_product_incident","csirt_requested_intermediate","incident_ongoing_at_final_report"];

/* Statutory clocks for the twelve reporting obligations.
   from: what the period runs from; h / d / m: hours, days, months. */
var RULE = {
  "nis2.art23.4.a":     {from:"aware", h:24,  chain:"nis2", lab:"Early warning"},
  "nis2.art23.4.b":     {from:"aware", h:72,  chain:"nis2", lab:"Incident notification"},
  "nis2.art23.4.b.tsp": {from:"aware", h:24,  chain:"nis2", lab:"Notification (trust service provider)"},
  "nis2.art23.4.c":     {from:"request",       chain:"nis2", lab:"Intermediate report"},
  "nis2.art23.4.d":     {from:"sub:nis2.art23.4.b", m:1, chain:"nis2", lab:"Final report"},
  "nis2.art23.4.e":     {from:"sub:nis2.art23.4.b", m:1, chain:"nis2", lab:"Progress report"},
  "cra.art14.2.a":      {from:"aware", h:24,  chain:"cra2", lab:"Early warning"},
  "cra.art14.2.b":      {from:"aware", h:72,  chain:"cra2", lab:"Vulnerability notification"},
  "cra.art14.2.c":      {from:"remedy", d:14, chain:"cra2", lab:"Final report"},
  "cra.art14.4.a":      {from:"aware", h:24,  chain:"cra4", lab:"Early warning"},
  "cra.art14.4.b":      {from:"aware", h:72,  chain:"cra4", lab:"Incident notification"},
  "cra.art14.4.c":      {from:"sub:cra.art14.4.b", m:1, chain:"cra4", lab:"Final report"}
};
var CHAINS = {
  nis2: {lab:"NIS2 · Article 23", to:"National CSIRT or competent authority (in Romania: DNSC)", color:"var(--nis2)"},
  cra2: {lab:"CRA · Article 14(2)", to:"Coordinator CSIRT and ENISA, via the Single Reporting Platform", color:"var(--cra)"},
  cra4: {lab:"CRA · Article 14(4)", to:"Coordinator CSIRT and ENISA, via the Single Reporting Platform", color:"var(--cra)"}
};
var BASE_LAB = {aware:"awareness", remedy:"remedy available", request:"CSIRT request"};

var TABS = [
  ["overview","Overview"],["pilots","Pilots"],["catalogue","Catalogue"],["applicability","Applicability"],
  ["tracker","Tracker"],["gaps","Gap register"],["incidents","Reporting clocks"],["evidence","Evidence"],
  ["monitoring","Change monitoring"],["exchange","Export"]
];

/* ------------------------------------------------------------------ utils */
function $(s, el){ return (el||document).querySelector(s); }
function $$(s, el){ return Array.prototype.slice.call((el||document).querySelectorAll(s)); }
function esc(v){ return String(v == null ? "" : v).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function pad(n){ return (n < 10 ? "0" : "") + n; }
function now(){ return new Date(); }
function todayISO(){ var d = now(); return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
function localStamp(d){ d = d || now(); return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+"T"+pad(d.getHours())+":"+pad(d.getMinutes()); }
function parse(s){ if(!s) return null; var d = new Date(s.length === 10 ? s+"T00:00" : s); return isNaN(d) ? null : d; }
function fmt(s){ var d = typeof s === "string" ? parse(s) : s; if(!d) return "—"; return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+" "+pad(d.getHours())+":"+pad(d.getMinutes()); }
function fmtD(s){ var d = typeof s === "string" ? parse(s) : s; if(!d) return "—"; return pad(d.getDate())+"."+pad(d.getMonth()+1)+"."+d.getFullYear(); }
function dayDiff(a, b){ return Math.round((parse(a) - parse(b)) / 864e5); }
function dur(ms){
  var neg = ms < 0; ms = Math.abs(ms);
  var h = Math.floor(ms/36e5), m = Math.floor(ms%36e5/6e4), d = Math.floor(h/24);
  var s = d >= 2 ? d+" d "+(h%24)+" h" : h >= 1 ? h+" h "+pad(m)+" min" : m+" min";
  return (neg ? "-" : "") + s;
}
function uuid(){ try { return crypto.randomUUID(); } catch(e){ return "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g, function(){ return (Math.random()*16|0).toString(16); }); } }
function human(k){ return String(k).replace(/_/g, " "); }
function pill(st, extra){ return '<span class="pill '+st+'"><i aria-hidden="true">'+ST[st].s+'</i>'+(extra || ST[st].l)+'</span>'; }
function regTag(r){ return '<span class="tag '+r.regime.toLowerCase()+'">'+r.regime+'</span>'; }
function inForce(r){ return !r.from || r.from <= todayISO(); }
function toast(msg){ var t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(function(){ t.classList.remove("on"); }, 2600); }

/* ------------------------------------------------------------------ state */
var KEY = "cb-t31-toolkit-v1";
var S, storageOk = true;

function seed(){
  var s = {v:1, active:"p-energy", prof:{}, track:{}, inc:{}, docs:{}, review:{}, ack:{}, ui:{}};
  D.profiles.forEach(function(p){
    s.prof[p.id] = {name:p.name, partner:"", roles:p.roles.slice(), flags:p.flags.slice(), voluntary:!!p.voluntary, ms:p.ms||""};
    s.track[p.id] = {}; s.inc[p.id] = []; s.docs[p.id] = []; s.review[p.id] = {};
  });
  // illustrative organisation: seeded from the original demonstrator's worked assessment
  var W = D.worked, owners = {"nis2-art21":"CISO","cra-anxI-partI":"Product Security Lead","cra-anxI-partII":"PSIRT Lead"};
  Object.keys(W.rows).forEach(function(id){
    var r = BY[id], w = W.rows[id];
    if(!r || RULE[id] || r.check === "artifact") return;   // clocks and artefacts are derived, not typed in
    var rec = {st:w.st, ev:w.ev || "", note:w.ev ? "" : (w.st === "ins" ? "" : w.obs), owner:"", due:"", upd:"2026-09-18T10:00",
               hist:[{t:"2026-09-18T10:00", st:w.st, by:"Imported from T3.1 demonstrator (A-014)"}]};
    if(w.st !== "sat" && w.st !== "na"){
      rec.owner = owners[r.g] || "Compliance Officer";
      rec.due = r.g === "nis2-art21" ? (/^nis2\.art21\.2\.b/.test(id) ? "2026-09-21" : "2026-10-31") : "2027-06-30";
    }
    s.track.demo[id] = rec;
  });
  var inc = JSON.parse(JSON.stringify(W.incident));
  inc.id = "INC-2026-001"; inc.request = "";
  s.inc.demo = [inc];
  // the five demonstrator documents, re-ingested through the same parsers the user gets
  ["advisory-EG-CSAF-2026-0007.json","sbom-rtu400-cyclonedx.json","sbom-updservice-spdx.json","testreport-rtu400.json","vex-rtu400-cyclonedx.json","scanner-export.json"].forEach(function(f){
    s.docs.demo.push(parseDoc(f, D.samples[f], "2026-09-18T10:00"));
  });
  return s;
}
function load(){
  var raw = null;
  try { raw = JSON.parse(localStorage.getItem(KEY)); } catch(e){ storageOk = false; }
  S = raw && raw.v === 1 ? raw : seed();
  D.profiles.forEach(function(p){ // profiles added after a save
    if(!S.prof[p.id]){ var f = seed(); S.prof[p.id] = f.prof[p.id]; S.track[p.id] = {}; S.inc[p.id] = []; S.docs[p.id] = []; S.review[p.id] = {}; }
  });
  if(!S.prof[S.active]) S.active = "p-energy";
}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; } catch(e){ storageOk = false; } }

function P(){ return S.active; }
function profMeta(pid){ return D.profiles.filter(function(p){ return p.id === pid; })[0]; }
function profName(pid){ var s = S.prof[pid], m = profMeta(pid); return m.kind === "pilot" ? m.sector + " pilot" + (s.partner ? " · " + s.partner : "") : s.name; }

/* ------------------------------------------------------------------ applicability */
function incidentFlags(pid){
  var f = {};
  (S.inc[pid] || []).forEach(function(i){ i.flags.forEach(function(x){ f[x] = 1; }); });
  S.prof[pid].flags.forEach(function(x){ f[x] = 1; });
  return f;
}
/* m: "mand" (must address), "vol" (voluntary alignment), "out" (not engaged) */
function appl(r, pid){
  var p = S.prof[pid];
  var roleOk = r.roles.some(function(x){ return p.roles.indexOf(x) >= 0; });
  if(!roleOk){
    if(p.voluntary && r.g === "nis2-art21") return {m:"vol", why:"voluntary alignment"};
    return {m:"out", why:"requires role: " + r.roles.map(function(x){ return ROLES[x] || x; }).join(" or "), kind:"role"};
  }
  if(r.flags.length){
    var f = incidentFlags(pid);
    var need = r.flags.filter(function(x){ return !f[x]; });
    if(need.length) return {m:"out", why:"engages only when recorded: " + need.map(function(x){ return FLAGS[x] || human(x); }).join(" + "), kind:"event"};
  }
  return {m:"mand"};
}
function engaged(pid, incVol){
  return REQ.filter(function(r){ var a = appl(r, pid).m; return a === "mand" || (incVol && a === "vol"); });
}

/* ------------------------------------------------------------------ clocks */
function addPeriod(d, ru){
  var x = new Date(d.getTime());
  if(ru.h) x = new Date(x.getTime() + ru.h*36e5);
  if(ru.d) x = new Date(x.getTime() + ru.d*864e5);
  if(ru.m) x.setMonth(x.getMonth() + ru.m);
  return x;
}
function subOf(inc, id){ var s = inc.submits && inc.submits[id]; if(!s) return null; return typeof s === "string" ? {t:s, content:[]} : s; }
function clockBase(inc, ru){
  if(ru.from === "aware") return parse(inc.aware);
  if(ru.from === "remedy") return inc.remedy && parse(inc.remedy) <= now() ? parse(inc.remedy) : null;
  if(ru.from === "request") return parse(inc.request);
  var s = subOf(inc, ru.from.slice(4)); return s ? parse(s.t) : null;
}
function clockFor(r, inc, pid){
  var ru = RULE[r.id], pf = S.prof[pid].flags;
  var has = r.flags.every(function(f){ return inc.flags.indexOf(f) >= 0 || pf.indexOf(f) >= 0; });
  if(!has) return null;
  var base = clockBase(inc, ru), sub = subOf(inc, r.id), due = base && (ru.h || ru.d || ru.m) ? addPeriod(base, ru) : null;
  var out = {r:r, ru:ru, inc:inc, base:base, due:due, sub:sub};
  var missing = sub ? r.content.filter(function(c){ return (sub.content||[]).indexOf(c) < 0; }) : [];
  out.missing = missing;
  if(sub){
    var late = due ? parse(sub.t) - due : 0;
    if(late > 0){ out.st = "not"; out.obs = "submitted " + dur(late) + " after the deadline"; }
    else if(missing.length){ out.st = "part"; out.obs = "submitted on time; missing required content: " + missing.map(human).join(", "); }
    else { out.st = "sat"; out.obs = "submitted on time with all required content"; }
    return out;
  }
  if(!base){
    out.st = "ins";
    out.obs = ru.from === "remedy" ? "clock not started: no corrective or mitigating measure available yet"
            : ru.from === "request" ? "no statutory period: due when the CSIRT or competent authority requests it"
            : "clock not started: " + (RULE[ru.from.slice(4)] || {}).lab.toLowerCase() + " not yet submitted";
    return out;
  }
  if(now() > due){ out.st = "not"; out.obs = "no submission recorded; deadline passed " + dur(now() - due) + " ago"; }
  else { out.st = "ins"; out.obs = "open: due in " + dur(due - now()); }
  return out;
}
function worst(list){ var best = "sat"; list.forEach(function(s){ if(ORDER.indexOf(s) < ORDER.indexOf(best)) best = s; }); return best; }

/* ------------------------------------------------------------------ evidence parsers */
var DAY = 864e5;
function productKey(name){ var m = String(name || "unknown").match(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*/); return m ? m[0] : "unknown"; }
function parseDoc(file, j, when){
  var doc = {file:file, at:when || localStamp(), props:[], absent:[], type:null, fmt:"", info:"", product:""};
  function set(k, ok){ (ok ? doc.props : doc.absent).push(k); }
  try {
    if(j && j.document && /^2\./.test(String(j.document.csaf_version))){
      var v = j.vulnerabilities || [], tr = j.document.tracking || {};
      var names = ((j.product_tree || {}).full_product_names || []).map(function(p){ return p.name; });
      doc.type = "advisory"; doc.fmt = "CSAF " + j.document.csaf_version;
      doc.product = productKey(names[0]);
      doc.info = "vulnerabilities: " + v.length + " · id: " + (tr.id || "—") + " · released: " + fmt(tr.initial_release_date);
      set("machine_readable_format", true);
      set("vulnerabilities_listed", v.length > 0);
      set("vulnerability_description", v.length && v.every(function(x){ return (x.notes||[]).some(function(n){ return n.category === "description" && n.text; }); }));
      set("severity_stated", v.length && v.every(function(x){ return (x.scores||[]).length || (x.threats||[]).some(function(t){ return t.category === "impact"; }); }));
      set("affected_products_identified", v.length && v.every(function(x){ return x.product_status && (x.product_status.known_affected||[]).length; }));
      set("remediation_stated", v.length && v.every(function(x){ return (x.remediations||[]).length; }));
      var tlp = ((j.document.distribution || {}).tlp || {}).label;
      set("publicly_disclosed", (tlp === "CLEAR" || tlp === "WHITE") && tr.status === "final");
    } else if(j && j.bomFormat === "CycloneDX" && (j.components || []).length){
      var c = j.components, md = j.metadata || {}, root = (md.component || {})["bom-ref"];
      var top = (j.dependencies || []).filter(function(d){ return d.ref === root; })[0];
      doc.type = "sbom"; doc.fmt = "CycloneDX " + j.specVersion;
      doc.product = productKey((md.component || {}).name);
      doc.info = "components: " + c.length + " · top-level dependencies: " + (top ? (top.dependsOn||[]).length : 0) + " · timestamp: " + fmt(md.timestamp);
      set("machine_readable_format", true);
      set("components_identified", c.every(function(x){ return x.name && x.version; }));
      set("top_level_dependencies", !!(top && (top.dependsOn||[]).length));
      set("kept_current", md.timestamp && (now() - parse(md.timestamp)) < 180*DAY);
      set("licences_recorded", c.every(function(x){ return (x.licenses||[]).length; }));
    } else if(j && j.bomFormat === "CycloneDX" && (j.vulnerabilities || []).length){
      var vv = j.vulnerabilities;
      doc.type = "vex"; doc.fmt = "CycloneDX VEX " + j.specVersion;
      doc.product = productKey(((j.metadata || {}).component || {}).name);
      doc.info = "vulnerabilities: " + vv.length + " · states: " + vv.map(function(x){ return (x.analysis||{}).state || "none"; }).join(", ");
      set("machine_readable_format", true);
      set("vulnerabilities_listed", true);
      set("exploitability_status", vv.every(function(x){ return x.analysis && x.analysis.state; }));
      set("justification_recorded", vv.filter(function(x){ return (x.analysis||{}).state === "not_affected"; }).every(function(x){ return x.analysis.justification; }));
    } else if(j && /^SPDX-2\./.test(j.spdxVersion || "")){
      var pk = j.packages || [], rel = (j.relationships || []).filter(function(x){ return x.relationshipType === "DEPENDS_ON" || x.relationshipType === "CONTAINS"; });
      doc.type = "sbom"; doc.fmt = j.spdxVersion.replace("-", " ");
      doc.product = productKey(j.name);
      doc.info = "components: " + pk.length + " · top-level dependencies: " + rel.length + " · timestamp: " + fmt((j.creationInfo||{}).created);
      set("machine_readable_format", true);
      set("components_identified", pk.length && pk.every(function(x){ return x.name && x.versionInfo; }));
      set("top_level_dependencies", rel.length > 0);
      set("kept_current", (j.creationInfo||{}).created && (now() - parse(j.creationInfo.created)) < 180*DAY);
      set("licences_recorded", pk.every(function(x){ return x.licenseConcluded && x.licenseConcluded !== "NOASSERTION"; }));
    } else if(j && j.record_type === "security_test_report"){
      doc.type = "test_report"; doc.fmt = "security test record";
      doc.product = productKey(j.product);
      doc.info = "executed: " + fmt(j.executed) + " · method: " + (j.method || "—") + " · findings: " + (Array.isArray(j.findings) ? j.findings.length : "—");
      set("scope_defined", Array.isArray(j.scope) ? j.scope.length > 0 : !!j.scope);
      set("findings_recorded", Array.isArray(j.findings));
      set("executed_within_review_period", j.executed && (now() - parse(j.executed)) < 365*DAY);
      set("method_stated", !!j.method);
    }
  } catch(e){ doc.type = null; }
  if(!doc.type){ doc.props = []; doc.absent = []; doc.info = "unrecognised artefact format — not ingested"; }
  return doc;
}
/* artefact obligations attach to a product: evaluate per product, report the worst */
function artefactState(r, pid){
  var docs = (S.docs[pid] || []).filter(function(d){ return d.type === r.atype; });
  if(!docs.length) return {st:"ins", obs:"no " + human(r.atype) + " document supplied", ev:""};
  var prods = {};
  docs.forEach(function(d){ (prods[d.product] = prods[d.product] || []).push(d); });
  var parts = [], states = [];
  Object.keys(prods).forEach(function(p){
    var have = {}; prods[p].forEach(function(d){ d.props.forEach(function(k){ have[k] = d.file; }); });
    var miss = r.aprops.filter(function(k){ return !have[k]; });
    var st = !miss.length ? "sat" : miss.length < r.aprops.length ? "part" : "not";
    states.push(st);
    parts.push(p + ": " + (miss.length ? "does not establish " + miss.map(human).join(", ") : "all properties established"));
  });
  return {st:worst(states), obs:parts.join(" · "), ev:docs.map(function(d){ return d.file; }).join(", ")};
}

/* ------------------------------------------------------------------ the one evaluation everything reads */
function evalReq(r, pid){
  var a = appl(r, pid);
  var rev = (S.review[pid] || {})[r.id];
  if(a.m === "out") return {st:"na", obs:a.why, a:a, derived:true};
  if(RULE[r.id]){
    var cs = (S.inc[pid] || []).map(function(i){ return clockFor(r, i, pid); }).filter(Boolean);
    if(!cs.length) return {st:"na", obs:"no incident with this classification recorded", a:a, derived:true};
    var w = worst(cs.map(function(c){ return c.st; }));
    var c0 = cs.filter(function(c){ return c.st === w; })[0];
    return {st:w, obs:c0.obs + (cs.length > 1 ? " (" + cs.length + " incidents)" : ""), a:a, derived:"clock", due:c0.due, review:rev};
  }
  if(r.check === "artifact"){
    var x = artefactState(r, pid);
    return {st:x.st, obs:x.obs, ev:x.ev, a:a, derived:"artefact", review:rev};
  }
  var t = (S.track[pid] || {})[r.id];
  if(!t) return {st:"ins", obs:"no attestation recorded for this requirement", a:a, review:rev};
  var obs = t.st === "part" && !t.ev ? "implementation attested but no documentary reference provided" : t.note || (t.ev ? "evidence: " + t.ev : "");
  return {st:t.st, obs:obs, ev:t.ev, owner:t.owner, due:t.due, rec:t, a:a, review:rev};
}
function evalAll(pid, incVol){
  return engaged(pid, incVol).map(function(r){ var e = evalReq(r, pid); e.r = r; return e; });
}
function counts(list){ var c = {sat:0,part:0,ins:0,not:0,na:0}; list.forEach(function(e){ c[e.st]++; }); return c; }

/* gap register: everything engaged and not satisfied / not applicable */
function gaps(pid){
  return evalAll(pid, S.prof[pid].voluntary).filter(function(e){ return e.st === "not" || e.st === "part" || e.st === "ins"; }).map(function(e){
    var r = e.r, t = (S.track[pid] || {})[r.id] || {};
    var owner = t.owner || "", due = t.due || "";
    var clock = e.derived === "clock";
    var prio = !inForce(r) ? 3 : (e.st === "not" || clock) ? 1 : 2;
    if(e.a.m === "vol") prio = 3;
    var overdue = clock ? e.st === "not" : (due && due < todayISO());
    return {e:e, r:r, owner:owner, due:clock && e.due ? localStamp(e.due).slice(0,10) : due, prio:prio, overdue:!!overdue, clock:clock};
  }).sort(function(a, b){ return a.prio - b.prio || (b.overdue - a.overdue) || String(a.due || "9").localeCompare(String(b.due || "9")) || a.r.id.localeCompare(b.r.id); });
}

/* ------------------------------------------------------------------ change monitoring */
function changeImpact(){
  var M = D.monitor;
  return M.changes.map(function(c){
    var r = BY[c.req];
    var hits = D.profiles.map(function(p){
      var roleOk = r.roles.some(function(x){ return S.prof[p.id].roles.indexOf(x) >= 0; });
      if(!roleOk) return null;
      var stale = [];
      var t = (S.track[p.id] || {})[r.id];
      if(t && t.upd && t.upd.slice(0,10) <= c.date) stale.push("assessment recorded " + t.upd.slice(0,10));
      (S.inc[p.id] || []).forEach(function(i){ var s = subOf(i, r.id); if(s && s.t.slice(0,10) <= c.date) stale.push(i.id + " submission " + s.t.slice(0,10)); });
      return {pid:p.id, stale:stale, flagged:!!(S.review[p.id] || {})[r.id]};
    }).filter(Boolean);
    return {c:c, r:r, hits:hits};
  });
}
function openReviews(pid){ return Object.keys(S.review[pid] || {}).length; }

/* ------------------------------------------------------------------ rendering */
var tab = "overview";
var ui = {cat:{g:"all", q:"", chk:"all"}, trk:{st:"all", g:"all", q:"", review:false}, inc:null};

function render(){
  var sw = $("#prof-switch");
  sw.innerHTML = D.profiles.map(function(p){ return '<option value="'+p.id+'"'+(p.id === P() ? " selected" : "")+'>'+esc(profName(p.id))+(p.kind === "demo" ? " (illustrative)" : "")+'</option>'; }).join("");
  var overdue = gaps(P()).filter(function(g){ return g.overdue; }).length;
  $("#tabs").innerHTML = TABS.map(function(t){
    var extra = t[0] === "gaps" && overdue ? '<span class="cnt" title="overdue">'+overdue+'</span>' : t[0] === "monitoring" && openReviews(P()) ? '<span class="cnt" title="to re-assess">'+openReviews(P())+'</span>' : "";
    return '<button type="button" data-tab="'+t[0]+'"'+(t[0] === tab ? ' aria-current="page"' : "")+'>'+t[1]+extra+'</button>';
  }).join("");
  $("#main").innerHTML = (VIEWS[tab] || VIEWS.overview)();
  if(tab === "incidents") tickClocks();
}
function go(t){
  tab = t; render(); window.scrollTo(0, 0);
  try { history.replaceState(null, "", "#" + t); } catch(e){}
  S.ui.tab = t; save();
}

function header(eyebrow, title, lead, right){
  return '<div class="head"><div class="head-row"><div><span class="eyebrow">'+eyebrow+'</span><h1>'+title+'</h1></div>'+(right||"")+'</div>'+(lead ? '<p class="lead">'+lead+'</p>' : "")+'</div>';
}
function distRow(label, c, total, extraUp){
  var segs = ORDER.map(function(k){ return c[k] ? '<span class="'+k+'" style="width:'+(c[k]/total*100)+'%" title="'+ST[k].l+': '+c[k]+'"></span>' : ""; }).join("");
  if(extraUp) segs += '<span class="up" style="width:'+(extraUp/total*100)+'%" title="Not yet applicable: '+extraUp+'"></span>';
  return '<div class="lbl">'+label+'</div><div class="bar" role="img" aria-label="'+esc(label)+': '+ORDER.map(function(k){ return c[k]+" "+ST[k].l.toLowerCase(); }).join(", ")+'">'+segs+'</div><div class="num muted" style="text-align:right">'+total+'</div>';
}
function legend(){
  return '<div class="legend">'+ORDER.map(function(k){ return '<span>'+pill(k)+'</span>'; }).join("")+'</div>';
}

var VIEWS = {};

/* ---------- overview ---------- */
VIEWS.overview = function(){
  var pid = P(), meta = profMeta(pid), prof = S.prof[pid];
  var list = evalAll(pid, prof.voluntary);
  var force = list.filter(function(e){ return inForce(e.r); }), later = list.filter(function(e){ return !inForce(e.r); });
  var c = counts(force), G = gaps(pid), od = G.filter(function(g){ return g.overdue; });
  var clocks = [];
  (S.inc[pid] || []).forEach(function(i){ incClocks(i, pid).forEach(function(k){ if(!k.sub && k.due) clocks.push(k); }); });
  var open = clocks.filter(function(k){ return k.due > now(); }).sort(function(a, b){ return a.due - b.due; });
  var h = '<section class="hero"><div><span class="eyebrow">CYBER-BRIDGE · T3.1</span><h1>Compliance tracking &amp; monitoring</h1>'+
    '<p class="lead">One catalogue of 130 atomic NIS2 and CRA requirements, applied to each pilot\'s profile. Record evidence, run the statutory reporting clocks, keep the gap register current and see which assessments a regulatory change invalidates.</p></div>'+
    '<div class="panel"><span class="eyebrow">Now tracking</span><h3 style="font-size:18px;margin:4px 0 6px;font-family:var(--font-display)">'+esc(profName(pid))+'</h3>'+
    '<div>'+(prof.roles.length ? prof.roles.map(function(r){ return '<span class="tag">'+esc(ROLES[r])+'</span>'; }).join("") : '<span class="tag">No NIS2 or CRA role</span>')+(prof.voluntary ? '<span class="tag">Voluntary alignment</span>' : "")+'</div>'+
    '<p class="note" style="margin-top:6px">'+esc(meta.basis)+'</p>'+
    '<div class="toolbar" style="margin:10px 0 0"><button class="btn small" data-go="tracker">Open tracker</button><button class="btn small sec" data-go="pilots">Switch pilot</button></div></div></section>';
  h += '<div class="grid g4 kpis">'+
    '<div class="kpi brand"><span>Requirements engaged</span><b>'+list.length+'</b><small>'+force.length+' in force · '+later.length+' from 11.12.2027</small></div>'+
    '<div class="kpi'+(od.length ? " alert" : "")+'"><span>Open gaps</span><b>'+G.length+'</b><small>'+od.length+' overdue · '+G.filter(function(g){ return g.prio === 1; }).length+' priority 1</small></div>'+
    '<div class="kpi'+(open.length ? " alert" : "")+'"><span>Reporting clocks running</span><b>'+open.length+'</b><small>'+(open.length ? "next due " + fmt(open[0].due) : "no open statutory deadline")+'</small></div>'+
    '<div class="kpi'+(openReviews(pid) ? " alert" : "")+'"><span>Assessments to re-check</span><b>'+openReviews(pid)+'</b><small>after regulatory changes</small></div></div>';
  // distribution
  h += '<div class="grid g2" style="margin-top:14px;align-items:start"><div class="grid"><div class="panel"><h2 style="margin-top:0">Where each instrument stands</h2><div class="dist">';
  GKEYS.forEach(function(g){
    var l = list.filter(function(e){ return e.r.g === g; }); if(!l.length) return;
    var lf = l.filter(function(e){ return inForce(e.r); });
    h += distRow(GROUPS[g].label, counts(lf), l.length, l.length - lf.length);
  });
  if(!list.length) h += '<div class="lbl" style="grid-column:1/-1">No requirement engages this profile. See Applicability for the reason each one is excluded.</div>';
  h += '</div>'+legend()+'<p class="note">Hatched: engaged but not yet applicable. No aggregate score is produced: "insufficient evidence" means nothing has been supplied yet and is never counted as a failure.</p></div>'+calendar()+'</div>';
  // attention
  var att = [];
  clocks.forEach(function(k){ att.push({s:k.due < now() ? "not" : "part", t:CHAINS[k.ru.chain].lab + " — " + k.ru.lab, m:(k.due < now() ? "overdue by " + dur(now() - k.due) : "due " + fmt(k.due) + " (in " + dur(k.due - now()) + ")") + " · " + k.inc.id, go:"incidents", k:k.due}); });
  G.filter(function(g){ return g.overdue && !g.clock; }).forEach(function(g){ att.push({s:"not", t:g.r.id + " — " + g.r.title, m:"target " + fmtD(g.due) + " passed · " + (g.owner || "no owner"), go:"gaps", k:parse(g.due)}); });
  Object.keys(S.review[pid] || {}).forEach(function(id){ att.push({s:"part", t:id + " — re-assess after change", m:BY[id].title, go:"monitoring", k:now()}); });
  G.filter(function(g){ return !g.owner && !g.clock && g.prio < 3; }).slice(0, 1).forEach(function(){ att.push({s:"ins", t:"Gaps without an owner", m:G.filter(function(g){ return !g.owner && !g.clock && g.prio < 3; }).length + " in-force gaps have no owner assigned", go:"gaps", k:now()}); });
  att.sort(function(a, b){ return ORDER.indexOf(a.s) - ORDER.indexOf(b.s) || a.k - b.k; });
  h += '<div class="panel"><h2 style="margin-top:0">Needs attention</h2>'+(att.length ? '<div class="att">'+att.slice(0, 7).map(function(a){
    return '<div class="att-item"><span class="stripe" style="background:var(--'+a.s+')"></span><div><div class="t">'+esc(a.t)+'</div><div class="m">'+esc(a.m)+'</div></div><button class="btn small sec" data-go="'+a.go+'">Open</button></div>';
  }).join("")+'</div>'+(att.length > 7 ? '<p class="note">'+(att.length - 7)+' more in the gap register.</p>' : "") : '<p class="muted">Nothing overdue, no clock running and no change waiting for review.</p>')+'</div></div>';
  h += '<div class="panel flush" style="margin-top:14px"><h2 style="margin:14px 20px 8px">All pilots at a glance</h2><div class="tbl-wrap"><table><thead><tr><th>Profile</th><th>Roles</th><th class="num">Engaged</th><th>'+pill("sat")+'</th><th>'+pill("part")+'</th><th>'+pill("ins")+'</th><th>'+pill("not")+'</th><th class="num">Open gaps</th><th class="num">Overdue</th></tr></thead><tbody>'+
    D.profiles.map(function(p){
      var l = evalAll(p.id, S.prof[p.id].voluntary), cc = counts(l), G2 = gaps(p.id), o = G2.filter(function(g){ return g.overdue; }).length;
      return '<tr><td><button class="rowlink" style="font-family:var(--font-body)" data-prof="'+p.id+'">'+esc(profName(p.id))+'</button>'+(p.kind === "demo" ? '<div class="sub">illustrative</div>' : "")+'</td><td style="font-size:12px">'+(S.prof[p.id].roles.map(function(r){ return esc(ROLES[r]); }).join("<br>") || '<span class="muted">none'+(S.prof[p.id].voluntary ? " · voluntary" : "")+'</span>')+'</td><td class="num">'+l.length+'</td><td class="num">'+cc.sat+'</td><td class="num">'+cc.part+'</td><td class="num">'+cc.ins+'</td><td class="num">'+cc.not+'</td><td class="num">'+G2.length+'</td><td class="num"'+(o ? ' style="color:var(--not);font-weight:600"' : "")+'>'+o+'</td></tr>';
    }).join("")+'</tbody></table></div></div>';
  if(!storageOk) h += '<p class="callout warn" style="margin-top:14px">This browser is not letting the page save. Changes last until you close it; use Export to keep them.</p>';
  return h;
};
function calendar(){
  var cal = [
    ["2024-10-18","NIS2 Art. 21 and Art. 23 apply (transposition deadline 17.10.2024)"],
    ["2026-09-11","CRA Art. 14 reporting obligations apply"],
    ["2027-12-11","CRA Annex I essential requirements apply"]
  ];
  return '<div class="panel"><h2 style="margin-top:0">Regulatory calendar</h2><div class="cal">'+cal.map(function(c){
    var d = dayDiff(c[0], todayISO());
    return '<div class="cal-row"><span class="d">'+fmtD(c[0])+'</span><span>'+c[1]+'</span>'+(d > 0 ? '<span class="pill up"><i>→</i>in '+d+' days</span>' : '<span class="pill ghost">in force</span>')+'</div>';
  }).join("")+'</div><p class="note">The CIR (EU) 2024/2690 layer is not yet in the catalogue.</p></div>';
}

/* ---------- pilots ---------- */
VIEWS.pilots = function(){
  var h = header("Five pilot deployments", "CYBER-BRIDGE pilots", "The project validates its tools in five real-world pilots: energy, software, public administration, law enforcement and IoT. Each pilot carries its own applicability profile, so the same catalogue produces a different set of obligations for each one.");
  h += '<p class="callout">The roles below are working hypotheses for each pilot, to be confirmed by the pilot owner and by ENC. Type the partner organisation\'s name on its card; it stays in this browser and in exports.</p>';
  h += '<div class="grid g3">';
  D.profiles.forEach(function(p){
    var s = S.prof[p.id], l = evalAll(p.id, s.voluntary);
    var n2 = l.filter(function(e){ return e.r.regime === "NIS2"; }).length, cr = l.filter(function(e){ return e.r.regime === "CRA"; }).length;
    var G = gaps(p.id);
    h += '<article class="panel pilot'+(p.id === P() ? " active" : "")+'"><div class="pilot-head"><div><div class="sector">'+esc(p.sector)+'</div><div class="code">'+esc(p.code)+(p.kind === "demo" ? " · illustrative, not a pilot" : "")+'</div></div>'+(p.id === P() ? '<span class="pill sat"><i>●</i>Tracking</span>' : "")+'</div>';
    if(p.kind === "pilot") h += '<label class="sr" for="pn-'+p.id+'">Partner organisation for the '+esc(p.sector)+' pilot</label><input class="pname" id="pn-'+p.id+'" data-partner="'+p.id+'" placeholder="Partner organisation (enter name)" value="'+esc(s.partner)+'">';
    else h += '<div style="font-weight:600">'+esc(s.name)+'</div>';
    h += '<div>'+(s.roles.length ? s.roles.map(function(r){ return '<span class="tag">'+esc(ROLES[r])+'</span>'; }).join("") : '<span class="tag">No NIS2 or CRA role</span>')+(s.voluntary ? '<span class="tag">Voluntary alignment</span>' : "")+'</div>';
    h += '<p class="basis">'+esc(p.basis)+'</p><div><h3>What this pilot validates</h3><ul>'+p.focus.map(function(f){ return '<li>'+esc(f)+'</li>'; }).join("")+'</ul></div>';
    h += '<div class="muted" style="font-size:12.5px">Assets in scope: '+esc(p.assets)+'</div>';
    h += '<div class="counts"><span><b>'+n2+'</b>NIS2</span><span><b>'+cr+'</b>CRA</span><span><b>'+G.length+'</b>open gaps</span></div>';
    h += '<div class="foot-row">'+(p.id === P() ? '<button class="btn small" data-go="tracker">Open tracker</button>' : '<button class="btn small" data-prof="'+p.id+'">Track this pilot</button>')+'<button class="btn small sec" data-prof-go="'+p.id+'" data-target="applicability">Profile</button></div></article>';
  });
  h += '</div><p class="note">Pilot sectors as published by the project: energy, software, public administration, law enforcement and IoT. Partner names, Member States and product scope come from each pilot\'s Grant Agreement annex and are not assumed here.</p>';
  return h;
};

/* ---------- catalogue ---------- */
VIEWS.catalogue = function(){
  var f = ui.cat, q = f.q.toLowerCase();
  var rows = REQ.filter(function(r){
    return (f.g === "all" || r.g === f.g) && (f.chk === "all" || r.check === f.chk) &&
      (!q || (r.id + " " + r.title + " " + r.stmt + " " + (r.iso || "")).toLowerCase().indexOf(q) >= 0);
  });
  var nChk = function(k){ return REQ.filter(function(r){ return r.check === k; }).length; };
  var h = header("Regulatory catalogue", "130 atomic requirements", "Each requirement is one obligation that can carry a verdict of its own, anchored to its provision by ELI, with the kind of verification it admits and its legal review status. Built from registru-cerinte.xlsx.");
  h += '<p class="callout warn">All statements are DRAFT-VERIFY decompositions pending ENC confirmation against the consolidated text on EUR-Lex. Nothing marked pending is final.</p>';
  h += '<div class="toolbar">'+[["all","All",REQ.length]].concat(GKEYS.map(function(g){ return [g, GROUPS[g].label, REQ.filter(function(r){ return r.g === g; }).length]; })).map(function(x){
    return '<button class="chip" data-catg="'+x[0]+'" aria-pressed="'+(f.g === x[0])+'">'+esc(x[1])+'<span class="n">'+x[2]+'</span></button>';
  }).join("")+'</div>';
  h += '<div class="toolbar"><label class="sr" for="cat-q">Search the catalogue</label><input class="search" id="cat-q" type="search" placeholder="Search by id, title, statement or ISO 27001 control" value="'+esc(f.q)+'">'+
    '<label class="sr" for="cat-chk">Verification</label><select class="sel" id="cat-chk"><option value="all">Any verification</option>'+["attestation","artifact","deadline"].map(function(k){ return '<option value="'+k+'"'+(f.chk === k ? " selected" : "")+'>'+k+' ('+nChk(k)+')</option>'; }).join("")+'</select>'+
    '<span class="muted num" style="font-size:13px">'+rows.length+' shown</span></div>';
  h += '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Requirement</th><th>Title and statement</th><th>Regime</th><th>Verification</th><th>Applies from</th><th>For '+esc(profName(P()))+'</th></tr></thead><tbody>'+
    rows.map(function(r){
      var a = appl(r, P());
      return '<tr><td><button class="rowlink" data-req="'+r.id+'">'+r.id+'</button></td><td>'+esc(r.title)+'<div class="sub">'+esc(r.stmt.length > 150 ? r.stmt.slice(0, 150) + "…" : r.stmt)+'</div></td><td>'+regTag(r)+'</td><td><span class="tag">'+r.check+'</span>'+(r.iso ? '<div class="sub">ISO 27001 '+esc(r.iso)+'</div>' : "")+'</td><td class="mono">'+fmtD(r.from)+'</td><td>'+(a.m === "mand" ? '<span class="tag yes">engaged</span>' : a.m === "vol" ? '<span class="tag">voluntary</span>' : '<span class="tag no">'+(a.kind === "event" ? "on event" : "not engaged")+'</span>')+'</td></tr>';
    }).join("")+'</tbody></table></div></div>';
  return h;
};

/* ---------- applicability ---------- */
VIEWS.applicability = function(){
  var pid = P(), p = S.prof[pid], meta = profMeta(pid);
  var h = header("Applicability profile", esc(profName(pid)), "The profile decides which requirements this organisation must address. Change a role and the tracker, gap register and clocks follow immediately.");
  h += '<div class="grid g2"><div class="panel"><h2 style="margin-top:0">Roles</h2><div class="checks">'+Object.keys(ROLES).map(function(k){
    return '<label class="check"><input type="checkbox" data-role="'+k+'"'+(p.roles.indexOf(k) >= 0 ? " checked" : "")+'> '+ROLES[k]+'</label>';
  }).join("")+'</div><h2>Standing classification</h2><div class="checks"><label class="check"><input type="checkbox" data-pflag="trust_service_provider"'+(p.flags.indexOf("trust_service_provider") >= 0 ? " checked" : "")+'> Trust service provider</label>'+
  '<label class="check"><input type="checkbox" id="vol"'+(p.voluntary ? " checked" : "")+'> Track NIS2 Art. 21 in voluntary alignment</label></div>'+
  '<div class="form-grid" style="margin-top:14px"><label class="field">Member State<input id="ms" maxlength="2" value="'+esc(p.ms)+'" placeholder="e.g. RO"></label></div>'+
  '<p class="note">'+esc(meta.basis)+'</p><p class="note">Event-driven obligations (Art. 23, Art. 14) engage when an incident with that classification is recorded under Reporting clocks.</p></div>';
  var byM = {mand:[], vol:[], out:[]};
  REQ.forEach(function(r){ var a = appl(r, pid); byM[a.m].push({r:r, a:a}); });
  h += '<div class="panel"><h2 style="margin-top:0">Result</h2><div class="grid g3" style="margin-bottom:14px"><div class="kpi brand"><span>Must address</span><b>'+byM.mand.length+'</b></div><div class="kpi"><span>Voluntary</span><b>'+byM.vol.length+'</b></div><div class="kpi"><span>Not engaged</span><b>'+byM.out.length+'</b></div></div><div class="dist">';
  GKEYS.forEach(function(g){
    var n = REQ.filter(function(r){ return r.g === g; }).length, m = byM.mand.filter(function(x){ return x.r.g === g; }).length, v = byM.vol.filter(function(x){ return x.r.g === g; }).length;
    h += '<div class="lbl">'+GROUPS[g].label+'</div><div class="bar"><span class="sat" style="width:'+(m/n*100)+'%;background:var(--brand)"></span><span style="width:'+(v/n*100)+'%;background:var(--brand);opacity:.35"></span></div><div class="num muted" style="text-align:right">'+m+(v ? "+"+v : "")+'/'+n+'</div>';
  });
  h += '</div></div></div>';
  var reasons = {};
  byM.out.forEach(function(x){ (reasons[x.a.why] = reasons[x.a.why] || []).push(x.r); });
  h += '<h2>Why requirements are excluded</h2>';
  var rk = Object.keys(reasons);
  h += rk.length ? '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Reason</th><th class="num">Count</th><th>Requirements</th></tr></thead><tbody>'+rk.map(function(k){
    return '<tr><td>'+esc(k)+'</td><td class="num">'+reasons[k].length+'</td><td>'+reasons[k].slice(0, 12).map(function(r){ return '<button class="rowlink" data-req="'+r.id+'" style="margin-right:8px">'+r.id+'</button>'; }).join("")+(reasons[k].length > 12 ? '<span class="muted">+'+(reasons[k].length - 12)+' more</span>' : "")+'</td></tr>';
  }).join("")+'</tbody></table></div></div>' : '<p class="muted">Every requirement in the catalogue engages this profile.</p>';
  return h;
};

/* ---------- tracker ---------- */
VIEWS.tracker = function(){
  var pid = P(), f = ui.trk, q = f.q.toLowerCase();
  var all = evalAll(pid, S.prof[pid].voluntary), c = counts(all);
  var rows = all.filter(function(e){
    return (f.st === "all" || e.st === f.st) && (f.g === "all" || e.r.g === f.g) && (!f.review || e.review) &&
      (!q || (e.r.id + " " + e.r.title + " " + (e.obs || "") + " " + (e.owner || "")).toLowerCase().indexOf(q) >= 0);
  });
  var h = header("Assessment tracker", esc(profName(pid)), "Each engaged requirement returns exactly one of five states. Attestations are recorded here; reporting obligations are computed from the clocks and artefact obligations from the documents ingested.");
  h += '<div class="toolbar">'+[["all","All",all.length]].concat(ORDER.map(function(k){ return [k, ST[k].l, c[k]]; })).map(function(x){
    return '<button class="chip" data-trkst="'+x[0]+'" aria-pressed="'+(f.st === x[0])+'">'+(x[0] !== "all" ? '<span aria-hidden="true">'+ST[x[0]].s+' </span>' : "")+esc(x[1])+'<span class="n">'+x[2]+'</span></button>';
  }).join("")+'</div>';
  h += '<div class="toolbar"><label class="sr" for="trk-q">Search the tracker</label><input class="search" id="trk-q" type="search" placeholder="Search by id, title, observation or owner" value="'+esc(f.q)+'">'+
    '<label class="sr" for="trk-g">Instrument</label><select class="sel" id="trk-g"><option value="all">All instruments</option>'+GKEYS.map(function(g){ return '<option value="'+g+'"'+(f.g === g ? " selected" : "")+'>'+GROUPS[g].label+'</option>'; }).join("")+'</select>'+
    '<label class="check"><input type="checkbox" id="trk-rev"'+(f.review ? " checked" : "")+'> Needs re-assessment</label><span class="muted num" style="font-size:13px">'+rows.length+' shown</span></div>';
  if(!all.length) return h + '<p class="callout">No requirement engages this profile. Open Applicability to see why, or switch on voluntary alignment.</p>';
  h += '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Requirement</th><th>Obligation</th><th>State</th><th>Observation</th><th>Owner</th><th>Updated</th></tr></thead><tbody>'+
    rows.map(function(e){
      var r = e.r, src = e.derived === "clock" ? '<span class="tag">clock</span>' : e.derived === "artefact" ? '<span class="tag">artefact</span>' : "";
      return '<tr><td><button class="rowlink" data-req="'+r.id+'">'+r.id+'</button><div class="sub">'+GROUPS[r.g].label+'</div></td><td>'+esc(r.title)+'<div class="sub">'+regTag(r)+src+(inForce(r) ? "" : '<span class="pill up"><i>→</i>from '+fmtD(r.from)+'</span>')+(e.a.m === "vol" ? '<span class="tag">voluntary</span>' : "")+'</div></td><td>'+pill(e.st)+(e.review ? '<div class="sub"><span class="pill part"><i>!</i>re-assess</span></div>' : "")+'</td><td class="muted" style="font-size:12.5px;max-width:340px">'+esc(e.obs || "")+'</td><td style="font-size:12.5px">'+esc(e.owner || "")+'</td><td class="mono muted">'+(e.rec ? e.rec.upd.slice(0,10) : "")+'</td></tr>';
    }).join("")+'</tbody></table></div></div>';
  return h;
};

/* ---------- gap register ---------- */
VIEWS.gaps = function(){
  var pid = P(), G = gaps(pid);
  var od = G.filter(function(g){ return g.overdue; }).length, noOwner = G.filter(function(g){ return !g.owner && !g.clock; }).length;
  var h = header("Gap register", esc(profName(pid)), "Every engaged finding that is not satisfied becomes an entry with the requirement that produced it, the reason, an owner and a target date. Priority 1: in force and failed, or a statutory clock. Priority 2: in force, evidence incomplete. Priority 3: not yet applicable or voluntary.",
    '<div class="toolbar" style="margin:0"><button class="btn small sec" data-export="gaps-csv">Export CSV</button><button class="btn small sec" data-export="poam">OSCAL POA&amp;M</button></div>');
  h += '<div class="grid g4 kpis" style="margin-bottom:14px"><div class="kpi"><span>Open entries</span><b>'+G.length+'</b></div><div class="kpi'+(od ? " alert" : "")+'"><span>Overdue</span><b>'+od+'</b></div><div class="kpi"><span>Priority 1</span><b>'+G.filter(function(g){ return g.prio === 1; }).length+'</b></div><div class="kpi"><span>No owner</span><b>'+noOwner+'</b></div></div>';
  if(!G.length) return h + '<p class="callout">No open gaps for this profile.</p>';
  h += '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>P</th><th>Requirement</th><th>State</th><th>Reason</th><th>Owner</th><th>Target</th><th>Status</th></tr></thead><tbody>'+
    G.map(function(g){
      var r = g.r, e = g.e, dd = g.due ? dayDiff(g.due, todayISO()) : null;
      var status = g.clock ? (e.st === "not" ? '<span class="pill not"><i>!</i>deadline missed</span>' : e.due ? '<span class="pill part"><i>◷</i>statutory clock</span>' : '<span class="pill ghost">waiting on event</span>')
        : !g.due ? '<span class="pill ghost">no target</span>' : dd < 0 ? '<span class="pill not"><i>!</i>'+(-dd)+' d overdue</span>' : '<span class="pill ghost">'+dd+' d left</span>';
      var ownerCell = g.clock ? '<span class="muted" style="font-size:12.5px">Incident manager</span>' : '<label class="sr" for="go-'+r.id+'">Owner of '+r.id+'</label><input type="text" id="go-'+r.id+'" data-gap-owner="'+r.id+'" value="'+esc(g.owner)+'" placeholder="Assign">';
      var dueCell = g.clock ? '<span class="mono" style="font-size:12px">'+(g.due ? fmtD(g.due) : "—")+'</span>' : '<label class="sr" for="gd-'+r.id+'">Target date for '+r.id+'</label><input type="date" id="gd-'+r.id+'" data-gap-due="'+r.id+'" value="'+esc(g.due)+'">';
      return '<tr><td><span class="prio p'+g.prio+'">P'+g.prio+'</span></td><td><button class="rowlink" data-req="'+r.id+'">'+r.id+'</button><div class="sub">'+esc(r.title)+'</div></td><td>'+pill(e.st)+'</td><td class="muted" style="font-size:12.5px;max-width:300px">'+esc(e.obs)+'</td><td>'+ownerCell+'</td><td>'+dueCell+'</td><td>'+status+'</td></tr>';
    }).join("")+'</tbody></table></div></div><p class="note">Serialised as an OSCAL plan of action and milestones. Owners and dates are saved as you type.</p>';
  return h;
};

/* ---------- reporting clocks ---------- */
function incClocks(inc, pid){
  var roles = S.prof[pid].roles;
  return Object.keys(RULE).map(function(id){ return clockFor(BY[id], inc, pid); }).filter(function(k){ return k && k.r.roles.some(function(x){ return roles.indexOf(x) >= 0; }); });
}
VIEWS.incidents = function(){
  var pid = P(), incs = S.inc[pid] || [];
  if(ui.inc !== "__new" && !incs.some(function(i){ return i.id === ui.inc; })) ui.inc = incs.length ? incs[incs.length - 1].id : "__new";
  var h = header("Reporting clocks", "Incident reporting under NIS2 and CRA", "One incident can start up to three reporting chains, to different recipients, running from different trigger events. Record the moment of awareness and the classification; the deadlines, countdowns and states follow.");
  h += '<div class="inc-list">'+incs.map(function(i){ return '<button class="chip" data-inc="'+i.id+'" aria-pressed="'+(i.id === ui.inc)+'">'+esc(i.id)+'</button>'; }).join("")+'<button class="chip" data-inc="__new" aria-pressed="'+(ui.inc === "__new")+'">+ Record incident</button></div>';
  if(ui.inc === "__new") return h + incForm();
  var inc = incs.filter(function(i){ return i.id === ui.inc; })[0];
  var ks = incClocks(inc, pid);
  h += '<div class="panel" style="margin-bottom:14px"><div class="head-row"><div><h3 style="font-size:16px">'+esc(inc.title)+'</h3><div class="muted" style="font-size:13px">Aware '+fmt(inc.aware)+' · remedy '+(!inc.remedy ? "not yet available" : parse(inc.remedy) > now() ? "expected " + fmt(inc.remedy) : "available " + fmt(inc.remedy))+'</div><div style="margin-top:6px">'+inc.flags.map(function(f){ return '<span class="tag">'+esc(FLAGS[f])+'</span>'; }).join("")+'</div></div>'+
    '<div class="toolbar" style="margin:0"><label class="field" style="flex-direction:row;align-items:center">Remedy available <input type="datetime-local" id="inc-remedy" value="'+esc(inc.remedy || "")+'"></label><button class="btn small danger" data-delinc="'+inc.id+'">Delete incident</button></div></div></div>';
  if(!ks.length) return h + '<p class="callout warn">This profile has no role that these classifications engage. Check the roles under Applicability.</p>';
  h += timeline(inc, ks);
  h += '<h2>Notifications</h2><div class="clocks">'+ks.map(function(k){ return clockCard(k); }).join("")+'</div>';
  h += divergence(inc, ks);
  return h;
};
function incForm(){
  return '<form class="panel" id="inc-form"><h2 style="margin-top:0">Record an incident</h2><div class="form-grid">'+
    '<label class="field">Short title<input id="if-title" required placeholder="e.g. Ransomware on billing servers"></label>'+
    '<label class="field">Became aware at<input id="if-aware" type="datetime-local" required value="'+localStamp()+'"></label>'+
    '<label class="field">Remedy available at (optional)<input id="if-remedy" type="datetime-local"></label></div>'+
    '<h3 style="margin-top:14px">Classification</h3><div class="checks">'+INC_FLAGS.map(function(f){ return '<label class="check"><input type="checkbox" data-iflag="'+f+'"'+(f === "significant_incident" ? " checked" : "")+'> '+FLAGS[f]+'</label>'; }).join("")+'</div>'+
    '<div class="toolbar" style="margin:16px 0 0"><button class="btn" type="submit">Start the clocks</button></div></form>';
}
function clockCard(k){
  var r = k.r, ch = CHAINS[k.ru.chain], id = r.id;
  var pct = k.base && k.due ? Math.max(0, Math.min(100, (now() - k.base) / (k.due - k.base) * 100)) : 0;
  var big = k.sub ? "Submitted" : !k.due ? "—" : k.due > now() ? '<span data-count="'+k.due.getTime()+'">'+dur(k.due - now())+'</span>' : "Overdue " + dur(now() - k.due);
  var h = '<div class="clock '+k.st+'"><div class="reg" style="color:'+ch.color+'">'+ch.lab+'</div><div class="ttl">'+esc(k.ru.lab)+' <span class="mono muted">'+id+'</span></div>'+
    '<div class="big">'+big+'</div>'+(k.due && !k.sub ? '<div class="meter"><span style="width:'+pct+'%"></span></div>' : "")+
    '<div class="meta">'+(k.due ? "Deadline " + fmt(k.due) + " · " : "")+(k.ru.h ? k.ru.h + " h" : k.ru.d ? k.ru.d + " days" : k.ru.m ? "1 month" : "no statutory period")+' from '+esc(BASE_LAB[k.ru.from] || (RULE[k.ru.from.slice(4)] || {}).lab.toLowerCase() + " submission")+'</div>'+
    '<div>'+pill(k.st)+'</div><div class="meta">'+esc(k.obs)+'</div><div class="meta">To: '+esc(ch.to)+'</div>';
  if(k.sub){
    h += '<details><summary>Submission '+fmt(k.sub.t)+'</summary><p style="margin:6px 0">Content: '+(k.sub.content || []).map(human).join(", ")+'</p><button class="btn small danger" data-unsub="'+id+'">Remove submission</button></details>';
  } else {
    h += '<details><summary>Record submission</summary><form data-subform="'+id+'" style="display:flex;flex-direction:column;gap:8px;margin-top:8px"><label class="field">Submitted at<input type="datetime-local" required value="'+localStamp()+'" data-subt></label>'+
      (r.content.length ? '<div class="field">Content included<div class="checks">'+r.content.map(function(c){ return '<label class="check"><input type="checkbox" data-subc="'+c+'" checked> '+human(c)+'</label>'; }).join("")+'</div></div>' : "")+
      '<button class="btn small" type="submit">Record submission</button></form></details>';
  }
  return h + '</div>';
}
function timeline(inc, ks){
  var t0 = parse(inc.aware), chains = {};
  ks.forEach(function(k){ (chains[k.ru.chain] = chains[k.ru.chain] || []).push(k); });
  var ends = ks.map(function(k){ return k.due || (k.sub && parse(k.sub.t)); }).filter(Boolean).concat([now()]);
  var span = Math.max.apply(null, ends.map(function(d){ return d - t0; })) * 1.04, wk = 7*864e5;
  // first week at expanded scale: 0-7 d -> 0-52 %, the rest -> 52-100 %
  function x(d){ var ms = d - t0; if(span <= wk) return ms / span * 100; return ms <= wk ? ms / wk * 52 : 52 + (ms - wk) / (span - wk) * 48; }
  var h = '<div class="panel"><div class="muted" style="font-size:12.5px;margin-bottom:6px">Aware '+fmt(t0)+'. The first week is drawn at expanded scale; the dashed mark is the scale break. Red line: now.</div><div class="tl">';
  Object.keys(CHAINS).forEach(function(c){
    if(!chains[c]) return;
    var list = chains[c].filter(function(k){ return k.due || k.sub; });
    h += '<div class="tl-row"><div class="tl-name" style="color:'+CHAINS[c].color+'">'+CHAINS[c].lab+'<small>'+esc(CHAINS[c].to)+'</small></div><div class="tl-track"><div class="tl-line"></div>'+(span > wk ? '<span class="tl-brk" style="left:52%"></span>' : "");
    list.forEach(function(k, i){
      var d = k.sub ? parse(k.sub.t) : k.due, px = Math.max(0, Math.min(100, x(d)));
      var col = k.st === "sat" ? "var(--sat)" : k.st === "not" ? "var(--not)" : k.st === "part" ? "var(--part)" : CHAINS[c].color;
      h += '<span class="tl-mk" style="left:'+px+'%;background:'+col+'" title="'+esc(k.ru.lab+" — "+ST[k.st].l)+'"></span><span class="tl-lab '+(i % 2 ? "dn" : "up")+'" style="left:'+Math.max(6, Math.min(94, px))+'%">'+esc(k.ru.lab)+' · '+(k.sub ? "sent " : "due ")+fmtD(d).slice(0,5)+'</span>';
    });
    var nx = x(now()); if(nx <= 100) h += '<span class="tl-now" style="left:'+nx+'%"></span>';
    h += '</div></div>';
  });
  return h + '</div></div>';
}
function divergence(inc, ks){
  var fin = ks.filter(function(k){ return /Final/.test(k.ru.lab); });
  var n2 = fin.filter(function(k){ return k.ru.chain === "nis2" && k.due; })[0], cr = fin.filter(function(k){ return k.ru.chain !== "nis2"; });
  if(!n2 || !cr.length) return "";
  return '<h2>Where the clocks diverge</h2><div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>CRA final report</th><th>Runs from</th><th>NIS2 final report</th><th>Runs from</th><th class="num">Difference</th></tr></thead><tbody>'+
    cr.map(function(k){ var d = k.due ? (k.due - n2.due) / 36e5 : null; return '<tr><td class="mono">'+k.r.id+'</td><td class="muted">'+esc(BASE_LAB[k.ru.from] || (RULE[k.ru.from.slice(4)] || {}).lab.toLowerCase())+'</td><td class="mono">'+n2.r.id+'</td><td class="muted">incident notification</td><td class="num" style="font-weight:600;color:var(--part)">'+(d === null ? "not started" : (d > 0 ? "+" : "")+Math.round(d)+" h")+'</td></tr>'; }).join("")+
    '</tbody></table></div></div><p class="note">Similar windows, different trigger events: the CRA final report for a vulnerability runs from the moment a remedy exists, which may come late or never.</p>';
}
function tickClocks(){
  clearInterval(tickClocks._i);
  tickClocks._i = setInterval(function(){
    if(tab !== "incidents"){ clearInterval(tickClocks._i); return; }
    $$("[data-count]").forEach(function(el){ var ms = +el.dataset.count - now(); el.textContent = ms > 0 ? dur(ms) : "due now"; });
  }, 30000);
}

/* ---------- evidence ---------- */
VIEWS.evidence = function(){
  var pid = P(), docs = S.docs[pid] || [];
  var arts = engaged(pid).filter(function(r){ return r.check === "artifact"; });
  var h = header("Evidence ingestion", "Machine-readable artefacts", "Documents are parsed in this browser and each one reports only what it establishes. Nothing is asserted on the organisation's behalf: a property the file does not carry stays absent, and the assessment reflects that. An unrecognised file is rejected, never partially read.");
  h += '<div class="grid g2"><div class="drop" id="drop"><b>Drop JSON evidence here</b><div class="muted" style="font-size:13px">CycloneDX or SPDX 2.x SBOM · CycloneDX VEX · CSAF 2.0 advisory · security test record</div><label class="btn small" for="file-in" style="cursor:pointer">Choose files</label><input type="file" id="file-in" accept=".json,application/json" multiple class="sr"></div>'+
    '<div class="panel"><h3>Try a sample document</h3><p class="muted" style="font-size:13px;margin:0 0 10px">The five documents from the original demonstrator, plus one it rejects.</p><div class="checks">'+Object.keys(D.samples).map(function(f){ return '<button class="chip" data-sample="'+f+'">'+esc(f)+'</button>'; }).join("")+'</div></div></div>';
  h += '<h2>Documents supplied by '+esc(profName(pid))+'</h2>';
  h += docs.length ? '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Type</th><th>File</th><th>Format and content</th><th>Properties</th><th></th></tr></thead><tbody>'+docs.map(function(d, i){
    return '<tr><td>'+(d.type ? '<span class="tag">'+human(d.type)+'</span>' : '<span class="pill not"><i>✕</i>rejected</span>')+'</td><td class="mono">'+esc(d.file)+'<div class="sub">product: '+esc(d.product || "—")+'</div></td><td>'+esc(d.fmt)+'<div class="sub">'+esc(d.info)+'</div></td><td>'+
      d.props.map(function(p){ return '<span class="tag yes">✓ '+human(p)+'</span>'; }).join("")+d.absent.map(function(p){ return '<span class="tag no">'+human(p)+'</span>'; }).join("")+'</td><td><button class="btn small danger" data-deldoc="'+i+'">Remove</button></td></tr>';
  }).join("")+'</tbody></table></div></div>' : '<p class="muted">No documents yet. Drop a file or load a sample.</p>';
  h += '<h2>Resulting assessment — artefact obligations</h2>';
  if(!arts.length) return h + '<p class="callout">No artefact obligation engages this profile (they apply to CRA manufacturers).</p>';
  h += '<div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Requirement</th><th>Obligation</th><th>Needs</th><th>State</th><th>Per product</th></tr></thead><tbody>'+arts.map(function(r){
    var x = artefactState(r, pid);
    return '<tr><td><button class="rowlink" data-req="'+r.id+'">'+r.id+'</button></td><td>'+esc(r.title)+'<div class="sub">'+human(r.atype)+'</div></td><td>'+r.aprops.map(function(p){ return '<span class="tag">'+human(p)+'</span>'; }).join("")+'</td><td>'+pill(x.st)+'</td><td class="muted" style="font-size:12.5px">'+esc(x.obs)+'</td></tr>';
  }).join("")+'</tbody></table></div></div><p class="note">Artefact obligations attach to a product, not to an organisation, so each product is assessed separately and the weakest result is reported. VEX documents are parsed, but no requirement in catalogue v0.3.0 consumes them yet.</p>';
  return h;
};
function ingest(file, text){
  var j = null; try { j = JSON.parse(text); } catch(e){}
  var d = parseDoc(file, j);
  var pid = P();
  S.docs[pid] = (S.docs[pid] || []).filter(function(x){ return x.file !== file; }).concat([d]);
  save(); render();
  toast(d.type ? file + ": " + d.props.length + " properties established" : file + " was rejected: format not recognised");
}

/* ---------- change monitoring ---------- */
VIEWS.monitoring = function(){
  var M = D.monitor, imp = changeImpact();
  var covers = function(s){ return s.covers.regime ? REQ.filter(function(r){ return r.regime === s.covers.regime; }).length : s.covers.ids ? s.covers.ids.length : 0; };
  var profsHit = {}; imp.forEach(function(x){ x.hits.forEach(function(h){ profsHit[h.pid] = 1; }); });
  var toReview = imp.reduce(function(n, x){ return n + x.hits.filter(function(h){ return h.stale.length && !h.flagged; }).length; }, 0);
  var h = header("Regulatory change monitoring", "What changed, and whose assessment it invalidates", "Sources are compared requirement by requirement. The fingerprint covers only normative fields (statement, deadline, basis, required content, applicability, jurisdiction, recipient), so a renumbered recital changes nothing while an added mandatory content element flags every assessment that relied on the old text.");
  h += '<div class="grid g4 kpis" style="margin-bottom:6px"><div class="kpi"><span>Sources monitored</span><b>'+M.sources.length+'</b><small>last check '+fmtD(M.checked)+'</small></div><div class="kpi"><span>Requirements changed</span><b>'+M.changes.length+'</b></div><div class="kpi"><span>Profiles affected</span><b>'+Object.keys(profsHit).length+'</b><small>of '+D.profiles.length+'</small></div><div class="kpi'+(toReview ? " alert" : "")+'"><span>Not yet flagged</span><b>'+toReview+'</b><small>assessments to re-check</small></div></div>';
  h += '<h2>Source register</h2><div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Instrument</th><th>Version at last check</th><th class="num">Catalogue coverage</th><th>State</th></tr></thead><tbody>'+M.sources.map(function(s){
    return '<tr><td>'+esc(s.title)+'<div class="sub mono">'+esc(s.eli)+'</div>'+(s.remark ? '<div class="sub">'+esc(s.remark)+'</div>' : "")+'</td><td class="mono">'+esc(s.version)+'</td><td class="num">'+covers(s)+' requirements</td><td>'+(s.state === "changed" ? '<span class="pill part"><i>△</i>changed</span>' : '<span class="pill sat"><i>●</i>unchanged</span>')+'</td></tr>';
  }).join("")+'</tbody></table></div></div>';
  h += '<p class="callout warn">The CIR (EU) 2024/2690 corrigendum cannot propagate: that layer is not yet authored in the catalogue, so no assessment can be flagged by it. It must be authored from the Annex text with requires_flags = cir_2690_scope.</p>';
  h += '<h2>Requirement-level change set</h2><div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Requirement</th><th>Obligation</th><th>Change</th><th>Origin</th></tr></thead><tbody>'+imp.map(function(x){
    var src = x.c.source === "catalogue" ? "Catalogue revision v0.3.0" : (M.sources.filter(function(s){ return s.id === x.c.source; })[0] || {}).title;
    return '<tr><td><button class="rowlink" data-req="'+x.r.id+'">'+x.r.id+'</button></td><td>'+esc(x.r.title)+' '+regTag(x.r)+'</td><td><span class="pill part"><i>△</i>'+esc(x.c.kind)+'</span><div class="sub">'+esc(x.c.field)+' · added <span class="mono">'+esc(x.c.added)+'</span></div></td><td class="muted" style="font-size:12.5px">'+esc(src)+'</td></tr>';
  }).join("")+'</tbody></table></div></div>';
  h += '<h2>Propagated impact across pilots</h2><div class="panel flush"><div class="tbl-wrap"><table><thead><tr><th>Profile</th><th>Changed requirements it carries</th><th>Assessments relying on the old text</th><th></th></tr></thead><tbody>';
  D.profiles.forEach(function(p){
    var mine = imp.map(function(x){ var hh = x.hits.filter(function(h){ return h.pid === p.id; })[0]; return hh ? {x:x, h:hh} : null; }).filter(Boolean);
    var stale = mine.filter(function(m){ return m.h.stale.length; });
    var flagged = mine.filter(function(m){ return m.h.flagged; }).length;
    h += '<tr><td><button class="rowlink" style="font-family:var(--font-body)" data-prof="'+p.id+'">'+esc(profName(p.id))+'</button></td><td>'+(mine.length ? mine.map(function(m){ return '<span class="tag">'+m.x.r.id+'</span>'; }).join("") : '<span class="muted">none</span>')+'</td><td style="font-size:12.5px">'+(stale.length ? stale.map(function(m){ return '<div><span class="mono">'+m.x.r.id+'</span>: '+esc(m.h.stale.join("; "))+'</div>'; }).join("") : mine.length ? '<span class="muted">no assessment recorded yet; future ones use the new text</span>' : "")+'</td><td>'+
      (stale.length ? (flagged >= stale.length ? '<span class="pill sat"><i>●</i>flagged</span>' : '<button class="btn small" data-flag="'+p.id+'">Flag for re-assessment</button>') : "")+'</td></tr>';
  });
  h += '</tbody></table></div></div><p class="note">Fetching uses a pluggable adapter: a live EUR-Lex Cellar client, or the recorded snapshot shown here where the host has no outbound network. Flagged rows appear in the tracker with a re-assess mark until someone records a new assessment.</p>';
  return h;
};

/* ---------- export ---------- */
VIEWS.exchange = function(){
  var h = header("Export and exchange", "Take the record with you", "Everything recorded here is kept in this browser only. Export it to hand over to CLONE, to archive a pilot\'s state, or to move it to another machine.");
  var items = [
    ["state","Full toolkit state (JSON)","All profiles, attestations, incidents, documents and flags. Import it back on another machine."],
    ["tracker-csv","Tracker for the current profile (CSV)","One row per engaged requirement with state, observation, evidence, owner and date."],
    ["gaps-csv","Gap register (CSV)","Priority, requirement, state, reason, owner, target."],
    ["ar","OSCAL assessment results (JSON)","Findings for the current profile. The five-state verdict is kept in a property; OSCAL itself only has satisfied / not-satisfied."],
    ["poam","OSCAL plan of action and milestones (JSON)","The gap register as POA&M items."]
  ];
  h += '<div class="grid g2">'+items.map(function(x){ return '<div class="panel"><h3>'+x[1]+'</h3><p class="muted" style="font-size:13px;margin:0 0 12px">'+x[2]+'</p><button class="btn small" data-export="'+x[0]+'">Export</button></div>'; }).join("")+
    '<div class="panel"><h3>Import a saved state</h3><p class="muted" style="font-size:13px;margin:0 0 12px">Replaces what is in this browser.</p><label class="btn small sec" for="imp-file" style="cursor:pointer">Choose JSON file</label><input type="file" id="imp-file" accept=".json" class="sr"> <button class="btn small sec" data-paste>Paste JSON</button></div></div>';
  h += '<h2>Reset</h2><div class="panel"><p style="margin:0 0 10px;font-size:13.5px">Return to the starting state: empty pilots and the illustrative worked example. This cannot be undone.</p><div id="reset-zone"><button class="btn small danger" data-reset>Reset toolkit</button></div></div>';
  return h;
};
function csv(rows){ return rows.map(function(r){ return r.map(function(v){ v = String(v == null ? "" : v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(","); }).join("\n"); }
function exportText(kind){
  var pid = P(), stamp = new Date().toISOString(), slug = profMeta(pid).code.toLowerCase();
  if(kind === "state") return {name:"cyber-bridge-t31-state.json", text:JSON.stringify(S, null, 1)};
  if(kind === "tracker-csv") return {name:"tracker-" + slug + ".csv", text:csv([["requirement","instrument","regime","title","state","observation","evidence","owner","target","applies_from","updated"]].concat(
    evalAll(pid, S.prof[pid].voluntary).map(function(e){ return [e.r.id, GROUPS[e.r.g].label, e.r.regime, e.r.title, ST[e.st].l, e.obs, e.ev || "", e.owner || "", e.due ? (typeof e.due === "string" ? e.due : localStamp(e.due)) : "", e.r.from, e.rec ? e.rec.upd : ""]; })))};
  if(kind === "gaps-csv") return {name:"gaps-" + slug + ".csv", text:csv([["priority","requirement","title","state","reason","owner","target","overdue"]].concat(
    gaps(pid).map(function(g){ return ["P" + g.prio, g.r.id, g.r.title, ST[g.e.st].l, g.e.obs, g.clock ? "Incident manager" : g.owner, g.due, g.overdue ? "yes" : "no"]; })))};
  var meta = {title:"CYBER-BRIDGE T3.1 — " + profName(pid), "last-modified":stamp, version:"0.3.0-draft", "oscal-version":"1.1.2"};
  if(kind === "ar") return {name:"assessment-results-" + slug + ".json", text:JSON.stringify({"assessment-results":{uuid:uuid(), metadata:meta, "import-ap":{href:"#cyber-bridge-t31-catalogue"},
    results:[{uuid:uuid(), title:"Evidence-based self-assessment", description:"Five-state evaluation against catalogue v0.3.0-draft.", start:stamp,
      findings:evalAll(pid, S.prof[pid].voluntary).map(function(e){ return {uuid:uuid(), title:e.r.title, description:e.obs || ST[e.st].l,
        props:[{name:"cyber-bridge-state", value:e.st}, {name:"regime", value:e.r.regime}],
        target:{type:"objective-id", "target-id":e.r.id, status:{state:e.st === "sat" ? "satisfied" : "not-satisfied", reason:ST[e.st].l}}}; })}]}}, null, 1)};
  if(kind === "poam") return {name:"poam-" + slug + ".json", text:JSON.stringify({"plan-of-action-and-milestones":{uuid:uuid(), metadata:meta,
    "poam-items":gaps(pid).map(function(g){ return {uuid:uuid(), title:g.r.id + " — " + g.r.title, description:g.e.obs,
      props:[{name:"priority", value:"P" + g.prio}, {name:"state", value:g.e.st}, {name:"owner", value:g.clock ? "Incident manager" : g.owner || "unassigned"}, {name:"target-date", value:g.due || ""}]}; })}}, null, 1)};
}
function showExport(kind){
  var x = exportText(kind);
  var m = $("#modal");
  m.innerHTML = '<div class="modal-box"><div class="head-row"><h3 style="font-size:16px;margin:0">'+esc(x.name)+'</h3><span class="muted num" style="font-size:12px">'+Math.ceil(x.text.length/1024)+' KB</span></div><label class="sr" for="exp-txt">Export content</label><textarea id="exp-txt" readonly>'+esc(x.text)+'</textarea><div class="row"><button class="btn sec" data-close>Close</button><button class="btn sec" data-dl>Download file</button><button class="btn" data-copy>Copy to clipboard</button></div><p class="note" style="margin:0">If the download does nothing in this view, copy the text and save it as '+esc(x.name)+'.</p></div>';
  m.hidden = false;
  $("[data-copy]", m).onclick = function(){
    var ta = $("#exp-txt");
    var done = function(){ toast("Copied " + x.name); };
    try { navigator.clipboard.writeText(x.text).then(done, function(){ ta.select(); toast("Select-all done — press Ctrl/Cmd+C"); }); } catch(e){ ta.select(); toast("Select-all done — press Ctrl/Cmd+C"); }
  };
  $("[data-dl]", m).onclick = function(){
    try { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([x.text], {type:"text/plain"})); a.download = x.name; document.body.appendChild(a); a.click(); a.remove(); } catch(e){}
  };
  $("[data-close]", m).onclick = closeModal;
}
function showPaste(){
  var m = $("#modal");
  m.innerHTML = '<form class="modal-box" id="paste-form"><h3 style="font-size:16px;margin:0">Paste a saved state</h3><label class="sr" for="paste-txt">Saved state JSON</label><textarea id="paste-txt" placeholder="Paste the JSON exported from this toolkit"></textarea><div class="row"><button type="button" class="btn sec" data-close>Cancel</button><button class="btn" type="submit">Import</button></div></form>';
  m.hidden = false;
  $("[data-close]", m).onclick = closeModal;
  $("#paste-form").onsubmit = function(ev){ ev.preventDefault(); importState($("#paste-txt").value); };
}
function importState(text){
  try {
    var j = JSON.parse(text);
    if(!j || j.v !== 1 || !j.prof || !j.track) throw new Error("not a toolkit state");
    S = j; save(); closeModal(); render(); toast("State imported");
  } catch(e){ toast("That file is not a toolkit state export. Nothing was changed."); }
}
function closeModal(){ var m = $("#modal"); m.hidden = true; m.innerHTML = ""; }

/* ---------- requirement drawer ---------- */
function openReq(id){
  var r = BY[id], pid = P(), e = evalReq(r, pid), t = (S.track[pid] || {})[id] || {};
  var editable = !e.derived && e.a.m !== "out";
  var h = '<button class="close" data-closedrawer>Close</button><span class="eyebrow">'+esc(GROUPS[r.g].long)+'</span><h2>'+esc(r.title)+'</h2><div class="mono muted">'+r.id+'</div>'+
    '<p class="stmt">'+esc(r.stmt)+'</p><dl class="kv">'+
    '<dt>Source</dt><dd><a href="'+esc(r.eli)+'" target="_blank" rel="noopener">'+esc(r.eli.replace("http://data.europa.eu/eli/", "ELI "))+'</a></dd>'+
    '<dt>Regime</dt><dd>'+regTag(r)+' <span class="tag">'+esc(r.otype)+'</span></dd>'+
    '<dt>Applies to</dt><dd>'+r.roles.map(function(x){ return esc(ROLES[x]); }).join(" or ")+(r.flags.length ? '<div class="sub">when: '+r.flags.map(function(f){ return esc(FLAGS[f] || human(f)); }).join(" + ")+'</div>' : "")+'</dd>'+
    '<dt>Applies from</dt><dd>'+fmtD(r.from)+(inForce(r) ? "" : ' <span class="pill up"><i>→</i>in '+dayDiff(r.from, todayISO())+' days</span>')+'</dd>'+
    '<dt>Verification</dt><dd>'+esc(r.check)+' · '+esc(r.vmethod)+' · evidence: '+esc(human(r.etype))+'</dd>'+
    (r.content.length ? '<dt>Required content</dt><dd>'+r.content.map(function(c){ return '<span class="tag">'+human(c)+'</span>'; }).join("")+'</dd>' : "")+
    (r.aprops.length ? '<dt>Artefact must show</dt><dd>'+r.aprops.map(function(c){ return '<span class="tag">'+human(c)+'</span>'; }).join("")+'</dd>' : "")+
    (r.iso ? '<dt>ISO/IEC 27001</dt><dd>'+esc(r.iso)+'</dd>' : "")+
    '<dt>Jurisdiction</dt><dd>'+r.jur.map(esc).join(" · ")+'</dd>'+
    '<dt>Legal review</dt><dd><span class="pill part"><i>△</i>'+esc(r.review)+'</span> <span class="tag">'+esc(r.text)+'</span></dd></dl>';
  h += '<h2>'+esc(profName(pid))+'</h2><p>'+pill(e.st)+(e.review ? ' <span class="pill part"><i>!</i>re-assess: required content changed</span>' : "")+'</p><p class="muted" style="font-size:13px">'+esc(e.obs || "")+'</p>';
  if(e.derived === "clock") h += '<button class="btn small" data-go="incidents">Open reporting clocks</button>';
  else if(e.derived === "artefact") h += '<button class="btn small" data-go="evidence">Open evidence ingestion</button>';
  else if(editable){
    h += '<form id="rec-form" class="panel" style="display:flex;flex-direction:column;gap:12px;margin-top:10px"><div class="form-grid">'+
      '<label class="field">State<select id="rf-st">'+ORDER.map(function(k){ return '<option value="'+k+'"'+((t.st || "ins") === k ? " selected" : "")+'>'+ST[k].s+' '+ST[k].l+'</option>'; }).join("")+'</select></label>'+
      '<label class="field">Owner<input id="rf-owner" value="'+esc(t.owner || "")+'" placeholder="Role or person"></label>'+
      '<label class="field">Target date<input id="rf-due" type="date" value="'+esc(t.due || "")+'"></label></div>'+
      '<label class="field">Evidence reference<input id="rf-ev" value="'+esc(t.ev || "")+'" placeholder="Document id, section, link"></label>'+
      '<label class="field">Observation<textarea id="rf-note" placeholder="What the evidence shows, or what is missing">'+esc(t.note || "")+'</textarea></label>'+
      '<div class="toolbar" style="margin:0"><button class="btn" type="submit">Save assessment</button><span class="muted" style="font-size:12px">A partial state without an evidence reference is recorded as attested without documentation.</span></div></form>';
  } else h += '<p class="muted" style="font-size:13px">Not engaged for this profile, so nothing is tracked here.</p>';
  if(t.hist && t.hist.length) h += '<h2>History</h2><ul class="hist">'+t.hist.slice().reverse().map(function(x){ return '<li><span class="mono muted">'+fmt(x.t)+'</span>'+pill(x.st)+'<span class="muted">'+esc(x.by || "")+'</span></li>'; }).join("")+'</ul>';
  var d = $("#drawer"); d.innerHTML = h; d.hidden = false; $("#scrim").hidden = false;
  d.dataset.req = id; d.scrollTop = 0; $("[data-closedrawer]", d).focus();
}
function closeDrawer(){ $("#drawer").hidden = true; $("#scrim").hidden = true; }

/* ------------------------------------------------------------------ events */
document.addEventListener("click", function(ev){
  var b = ev.target.closest("button, [data-go]"); if(!b) return;
  var ds = b.dataset;
  if(ds.tab){ go(ds.tab); return; }
  if(ds.go){ ev.preventDefault(); closeDrawer(); go(ds.go); return; }
  if(ds.prof){ S.active = ds.prof; save(); render(); toast("Now tracking " + profName(ds.prof)); return; }
  if(ds.profGo){ S.active = ds.profGo; save(); go(ds.target); return; }
  if(ds.req){ openReq(ds.req); return; }
  if(ds.closedrawer !== undefined){ closeDrawer(); return; }
  if(ds.catg){ ui.cat.g = ds.catg; render(); return; }
  if(ds.trkst){ ui.trk.st = ds.trkst; render(); return; }
  if(ds.inc){ ui.inc = ds.inc === "__new" ? "__new" : ds.inc; render(); return; }
  if(ds.delinc){ S.inc[P()] = S.inc[P()].filter(function(i){ return i.id !== ds.delinc; }); ui.inc = null; save(); render(); toast("Incident deleted"); return; }
  if(ds.unsub){ var inc = curInc(); delete inc.submits[ds.unsub]; save(); render(); return; }
  if(ds.sample){ ingest(ds.sample, JSON.stringify(D.samples[ds.sample])); return; }
  if(ds.deldoc){ S.docs[P()].splice(+ds.deldoc, 1); save(); render(); return; }
  if(ds.flag){
    var pid = ds.flag;
    changeImpact().forEach(function(x){ x.hits.forEach(function(h){ if(h.pid === pid && h.stale.length) S.review[pid][x.r.id] = x.c.id; }); });
    save(); render(); toast("Flagged in the tracker for " + profName(pid)); return;
  }
  if(ds.export){ showExport(ds.export); return; }
  if(ds.paste !== undefined){ showPaste(); return; }
  if(ds.reset !== undefined){
    $("#reset-zone").innerHTML = '<span style="font-size:13.5px;margin-right:10px">Erase everything recorded in this browser?</span><button class="btn small danger" data-reset-yes>Yes, reset</button> <button class="btn small sec" data-reset-no>Keep my data</button>';
    return;
  }
  if(ds.resetYes !== undefined){ S = seed(); save(); render(); toast("Toolkit reset"); return; }
  if(ds.resetNo !== undefined){ render(); return; }
});
function curInc(){ return (S.inc[P()] || []).filter(function(i){ return i.id === ui.inc; })[0]; }

document.addEventListener("input", function(ev){
  var t = ev.target, ds = t.dataset;
  if(t.id === "cat-q"){ ui.cat.q = t.value; rerenderKeep(t); return; }
  if(t.id === "trk-q"){ ui.trk.q = t.value; rerenderKeep(t); return; }
  if(ds.partner){ S.prof[ds.partner].partner = t.value.slice(0, 80); save(); var o = $('#prof-switch option[value="'+ds.partner+'"]'); if(o) o.textContent = profName(ds.partner); return; }
  if(ds.gapOwner){ setTrack(ds.gapOwner, {owner:t.value}); return; }
  if(t.id === "ms"){ S.prof[P()].ms = t.value.toUpperCase(); save(); return; }
});
function rerenderKeep(el){
  var id = el.id, pos = el.selectionStart;
  render();
  var n = document.getElementById(id); if(n){ n.focus(); try { n.setSelectionRange(pos, pos); } catch(e){} }
}
document.addEventListener("change", function(ev){
  var t = ev.target, ds = t.dataset, p = S.prof[P()];
  if(t.id === "prof-switch"){ S.active = t.value; save(); closeDrawer(); render(); return; }
  if(t.id === "cat-chk"){ ui.cat.chk = t.value; render(); return; }
  if(t.id === "trk-g"){ ui.trk.g = t.value; render(); return; }
  if(t.id === "trk-rev"){ ui.trk.review = t.checked; render(); return; }
  if(ds.role){ p.roles = t.checked ? p.roles.concat([ds.role]) : p.roles.filter(function(x){ return x !== ds.role; }); save(); render(); return; }
  if(ds.pflag){ p.flags = t.checked ? p.flags.concat([ds.pflag]) : p.flags.filter(function(x){ return x !== ds.pflag; }); save(); render(); return; }
  if(t.id === "vol"){ p.voluntary = t.checked; save(); render(); return; }
  if(ds.gapDue){ setTrack(ds.gapDue, {due:t.value}); render(); return; }
  if(t.id === "inc-remedy"){ curInc().remedy = t.value; save(); render(); return; }
  if(t.id === "file-in"){ readFiles(t.files); return; }
  if(t.id === "imp-file" && t.files[0]){ var fr = new FileReader(); fr.onload = function(){ importState(fr.result); }; fr.readAsText(t.files[0]); return; }
});
function setTrack(id, patch){
  var pid = P(), t = S.track[pid][id] || (S.track[pid][id] = {st:"ins", ev:"", note:"", owner:"", due:"", upd:localStamp(), hist:[]});
  Object.keys(patch).forEach(function(k){ t[k] = patch[k]; });
  save();
}
function readFiles(files){
  Array.prototype.forEach.call(files || [], function(f){
    if(f.size > 5e6){ toast(f.name + " is larger than 5 MB and was skipped"); return; }
    var fr = new FileReader(); fr.onload = function(){ ingest(f.name, fr.result); }; fr.readAsText(f);
  });
}
document.addEventListener("submit", function(ev){
  var f = ev.target; ev.preventDefault();
  if(f.id === "rec-form"){
    var id = $("#drawer").dataset.req, pid = P(), st = $("#rf-st").value;
    var t = S.track[pid][id] || (S.track[pid][id] = {hist:[]});
    t.st = st; t.owner = $("#rf-owner").value; t.due = $("#rf-due").value; t.ev = $("#rf-ev").value; t.note = $("#rf-note").value;
    t.upd = localStamp(); t.hist = (t.hist || []).concat([{t:t.upd, st:st, by:"Recorded in toolkit"}]);
    delete S.review[pid][id];
    save(); render(); openReq(id); toast("Saved: " + id + " · " + ST[st].l);
    return;
  }
  if(f.id === "inc-form"){
    var pid2 = P(), n = (S.inc[pid2] || []).length + 1;
    var inc = {id:"INC-" + new Date().getFullYear() + "-" + ("00" + n).slice(-3), title:$("#if-title").value, aware:$("#if-aware").value, remedy:$("#if-remedy").value, request:"",
      flags:$$("[data-iflag]").filter(function(c){ return c.checked; }).map(function(c){ return c.dataset.iflag; }), submits:{}};
    if(!inc.flags.length){ toast("Choose at least one classification"); return; }
    S.inc[pid2].push(inc); ui.inc = inc.id; save(); render(); toast("Clocks started for " + inc.id);
    return;
  }
  if(f.dataset.subform){
    var inc2 = curInc(), rid = f.dataset.subform;
    inc2.submits[rid] = {t:$("[data-subt]", f).value, content:$$("[data-subc]", f).filter(function(c){ return c.checked; }).map(function(c){ return c.dataset.subc; })};
    delete S.review[P()][rid];
    save(); render(); toast("Submission recorded for " + rid);
  }
});
document.addEventListener("keydown", function(ev){
  if(ev.key === "Escape"){ if(!$("#modal").hidden) closeModal(); else if(!$("#drawer").hidden) closeDrawer(); }
});
$("#scrim").addEventListener("click", closeDrawer);
document.addEventListener("dragover", function(ev){ var d = $("#drop"); if(d && d.contains(ev.target)){ ev.preventDefault(); d.classList.add("over"); } });
document.addEventListener("dragleave", function(){ var d = $("#drop"); if(d) d.classList.remove("over"); });
document.addEventListener("drop", function(ev){ var d = $("#drop"); if(d && d.contains(ev.target)){ ev.preventDefault(); d.classList.remove("over"); readFiles(ev.dataTransfer.files); } });

/* ------------------------------------------------------------------ boot */
load();
var h0 = (location.hash || "").replace("#", "");
tab = TABS.some(function(t){ return t[0] === h0; }) ? h0 : (S.ui && S.ui.tab) || "overview";
render();
})();
