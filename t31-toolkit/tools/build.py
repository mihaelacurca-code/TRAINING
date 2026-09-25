"""Build the CYBER-BRIDGE T3.1 compliance toolkit into one self-contained HTML file.

    python3 tools/build.py                       # -> index.html
    python3 tools/build.py --fragment out.html   # body-only variant, for hosts that add their own <html>/<head>

Inputs, all under source/:
    registru-cerinte.xlsx   the requirement registry (130 atomic requirements), single source of truth
    worked-example.json     the original demonstrator's worked assessment (tools/extract_worked_example.py)
    pilots.json             applicability profiles for the five pilots and the illustrative organisation
    monitor.json            recorded state of the regulatory change-monitoring run
    samples.json            sample evidence documents for the ingestion screen

Nothing in the catalogue is typed into the page by hand: every requirement comes from the registry.
"""
import base64, datetime, json, pathlib, sys

import openpyxl

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "source"
TOOLS = ROOT / "tools"

GROUPS = {
    "nis2-art21": {"label": "NIS2 Art. 21(2)", "long": "NIS2 Art. 21(2) — risk-management measures"},
    "nis2-art23": {"label": "NIS2 Art. 23", "long": "NIS2 Art. 23 — reporting obligations"},
    "cra-art14": {"label": "CRA Art. 14", "long": "CRA Art. 14 — reporting obligations"},
    "cra-anxI-partI": {"label": "CRA Annex I · I", "long": "CRA Annex I, Part I — product security"},
    "cra-anxI-partII": {"label": "CRA Annex I · II", "long": "CRA Annex I, Part II — vulnerability handling"},
}


def split(v):
    return [x.strip() for x in str(v).split(";") if x.strip()] if v else []


def catalogue():
    ws = openpyxl.load_workbook(SRC / "registru-cerinte.xlsx", read_only=True)["requirements"]
    rows = list(ws.iter_rows(values_only=True))
    head = rows[0]
    out = []
    for r in rows[1:]:
        if not r[0]:
            continue
        d = dict(zip(head, r))
        out.append({
            "id": d["id"], "g": d["group"], "title": d["title"], "stmt": d["statement"],
            "eli": d["source-eli"], "regime": d["regime"], "otype": d["obligation-type"],
            "check": d["check_type"] or "deadline", "atype": d["artifact_type"],
            "aprops": split(d["artifact_properties"]), "roles": split(d["requires_roles"]),
            "flags": split(d["requires_flags"]), "content": split(d["required_content"]),
            "vmethod": d["verification-method"], "etype": d["evidence-type"],
            "from": (d["applies_from"] or "")[:10], "jur": split(d["jurisdiction"]),
            "iso": d["crosswalk-iso27001"], "review": d["legal-review-status"],
            "text": d["text_status"],
        })
    order = list(GROUPS)
    out.sort(key=lambda x: (order.index(x["g"]), x["id"]))
    return out


def build():
    req = catalogue()
    data = {
        "built": datetime.date.today().isoformat(),
        "groups": GROUPS,
        "req": req,
        "profiles": json.loads((SRC / "pilots.json").read_text(encoding="utf-8"))["profiles"],
        "worked": json.loads((SRC / "worked-example.json").read_text(encoding="utf-8")),
        "monitor": json.loads((SRC / "monitor.json").read_text(encoding="utf-8")),
        "samples": json.loads((SRC / "samples.json").read_text(encoding="utf-8")),
    }
    logo_path = ROOT.parent / "platform" / "logo.webp"
    logo = "data:image/webp;base64," + base64.b64encode(logo_path.read_bytes()).decode()
    page = (TOOLS / "app.html").read_text(encoding="utf-8")
    page = page.replace("/*CSS*/", (TOOLS / "app.css").read_text(encoding="utf-8"))
    page = page.replace("/*JS*/", (TOOLS / "app.js").read_text(encoding="utf-8"))
    # keep "</" out of the inline JSON so no string can close the script element
    page = page.replace("/*DATA*/", json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/"))
    page = page.replace("{{LOGO}}", logo)
    return page, len(req)


def main():
    page, n = build()
    if len(sys.argv) == 3 and sys.argv[1] == "--fragment":
        head_end = page.index("</head>")
        title_css = page[page.index("<title>"):head_end]
        body = page[page.index("<body>") + len("<body>"):page.index("</body>")]
        pathlib.Path(sys.argv[2]).write_text(title_css + body, encoding="utf-8")
        print(f"{n} requirements -> {sys.argv[2]} (fragment)")
        return
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print(f"{n} requirements -> index.html ({len(page) // 1024} KB)")


if __name__ == "__main__":
    main()
