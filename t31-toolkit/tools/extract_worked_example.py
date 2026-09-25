"""Extract the worked assessment from the original T3.1 demonstrator.

The original ships its worked example (a fictional manufacturer that is also an
essential entity) only as rendered HTML. This script reads it back into
source/worked-example.json so the toolkit can seed its illustrative profile
from the same figures, instead of re-typing them.

    python3 tools/extract_worked_example.py
"""
import html, json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "original" / "CYBER-BRIDGE_T3.1_demonstrator.html"
OUT = ROOT / "source" / "worked-example.json"

STATE = {"Satisfied": "sat", "Partially satisfied": "part", "Insufficient evidence": "ins",
         "Not satisfied": "not", "Not applicable": "na"}


def cells(tr):
    out = []
    for c in re.findall(r"<td[^>]*>(.*?)</td>", tr, re.S):
        out.append(re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", c))).strip())
    return out


def main():
    s = SRC.read_text(encoding="utf-8")
    rows = {}
    # 1. attestation and artefact results: "Resulting assessment" table on the ingestion screen
    a = s[s.index("Resulting assessment"):s.index('id="s-assessment"')]
    for tr in re.findall(r"<tr>(.*?)</tr>", a, re.S):
        c = cells(tr)
        if len(c) >= 4 and c[2] in STATE:
            obs = c[3]
            ev = "" if obs.startswith(("no attestation", "implementation attested")) else obs
            rows[c[0]] = {"st": STATE[c[2]], "obs": obs, "ev": ev}
    # 2. deadline results: reporting obligations from the Assessment screen
    b = s[s.index('id="s-assessment"'):s.index('id="s-gaps"')]
    for tr in re.findall(r"<tr>(.*?)</tr>", b, re.S):
        c = cells(tr)
        if len(c) >= 6 and (c[0].startswith("nis2.art23") or c[0].startswith("cra.art14")):
            rows[c[0]] = {"st": STATE[c[3]], "obs": c[4], "ev": "", "deadline": c[5]}
    incident = {
        "title": "RTU-400 exploited vulnerability and grid-control incident",
        "aware": "2026-09-14T08:30",
        "remedy": "2026-11-03T12:00",
        "flags": ["significant_incident", "actively_exploited_vulnerability", "severe_product_incident"],
        # submissions and the content each carried, as listed on the Evidence screen
        "submits": {
            "nis2.art23.4.a": {"t": "2026-09-14T20:00", "content": ["malicious_act_suspected", "cross_border_impact"]},
            "nis2.art23.4.b": {"t": "2026-09-16T09:00", "content": ["initial_assessment", "severity", "impact", "indicators_of_compromise"]},
            "cra.art14.2.a": {"t": "2026-09-14T22:10", "content": ["member_states_made_available"]},
            "cra.art14.4.a": {"t": "2026-09-15T11:00", "content": ["malicious_act_suspected"]},
            "cra.art14.2.b": {"t": "2026-09-16T09:00", "content": ["product_info", "exploit_nature", "corrective_measures"]},
            "cra.art14.4.b": {"t": "2026-09-17T07:00", "content": ["incident_nature", "initial_assessment", "corrective_measures", "user_measures"]},
        },
    }
    OUT.write_text(json.dumps({"source": SRC.name, "rows": rows, "incident": incident},
                              indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(rows)} assessed requirements -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
