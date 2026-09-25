# CYBER-BRIDGE — T3.1 — Reference demonstrator

Open `CYBER-BRIDGE_T3.1_demonstrator.html` in any browser. No server, no installation,
no network. Fonts are embedded, so it renders identically on any machine.

A demonstrator of the **normative model**, built by DNSC as T3.1 task coordinator. It is not
the CYBER-BRIDGE product interface — that layer is implemented by CLONE. Its purpose is to show
pilot users what the model does, and to serve as a functional specification handed to CLONE.

## Catalogue — 130 atomic requirements

| Instrument | Requirements | Applies from |
|---|---|---|
| NIS2 Art. 21(2)(a)–(j) — risk-management measures | 49 | 18.10.2024 |
| NIS2 Art. 23 — reporting obligations | 6 | 18.10.2024 |
| CRA Art. 14 — reporting obligations | 6 | 11.09.2026 |
| CRA Annex I, Part I — product security | 42 | 11.12.2027 |
| CRA Annex I, Part II — vulnerability handling | 27 | 11.12.2027 |

By verification: 12 deadline · 10 machine-readable artefact · 108 documented attestation.
By regime: 75 CRA · 55 NIS2.

Decomposition follows the atomicity rules fixed at the calibration session: one requirement is
one obligation that can carry a verdict of its own. Where a provision contains several
obligations, each becomes a separate requirement — CRA Annex I, Part I, point 2(c) yields five,
because a product can satisfy automatic updates and still fail to offer an opt-out.

The Commission Implementing Regulation (EU) 2024/2690 layer is **not** included. It applies to a
defined subgroup of entities and must be authored from the Annex text itself, with
`requires_flags = cir_2690_scope`, rather than inferred.

## Eight screens

1. **Regulatory catalogue** — filterable by instrument.
2. **Applicability** — an organisation carrying two roles at once; both regimes engage.
3. **Evidence** — recorded timestamps and reporting submissions.
4. **Artefact ingestion** — real documents parsed; properties derived, never asserted.
5. **Assessment** — five states, with the observation behind each.
6. **Gap register** — every non-satisfied finding, with requirement, reason, owner, target.
7. **Overlapping regimes** — three obligation chains on a piecewise timeline.
8. **Change monitoring** — source register, requirement-level change set, propagated impact.

## Pipeline

    registru-cerinte.xlsx -> catalog/*.json (OSCAL) -> specs/obligations.json -> policies/engine.rego

    python3 authoring/emit_catalogues.py
    python3 scripts/catalog_to_spec.py 'catalog/*.json' specs/obligations.json
    python3 scripts/ingest.py evidence/artifacts/*.json --out evidence/artifacts-manifest.json
    opa eval -d policies/ -d specs/obligations.json -i evidence/case-mfg-007.json \
        'data.cyberbridge' --format json > /tmp/mfg.json
    python3 scripts/build_demonstrator.py

Nothing in the demonstrator is hand-written. The registry round-trips: 130 requirements out,
130 back in.

## Worked assessment

A manufacturer that is also an essential entity, assessed against all 130 requirements with 31
attestations and five evidence documents supplied: 35 satisfied, 7 partially satisfied,
77 insufficient evidence, 12 not applicable.

The large insufficient-evidence count is the correct result, not a defect. An organisation that
has supplied 31 attestations against 130 requirements has not failed 77 of them — it has not yet
supplied what would allow them to be verified. Collapsing that into non-compliance is exactly the
error the fifth state exists to prevent.

## Evidence ingestion

Parsers: CycloneDX SBOM, SPDX 2.x SBOM, CycloneDX VEX, CSAF 2.0 advisory, security test record.
Each reports only what the document establishes. An unrecognised file is rejected and reported,
never partially interpreted.

Two bills of materials were supplied. The RTU-400 CycloneDX document carries a declared dependency
graph and a recent timestamp; the Update Service SPDX document carries neither, and the assessment
says so. Both are shown, because artefact obligations attach to a product, not to an organisation.

## Regulatory change monitoring

    python3 scripts/monitor.py check monitor/sources.json --adapter snapshot \
        --snapshot monitor/snapshots --out monitor/events.json
    python3 scripts/monitor.py diff <catalogue_before> <catalogue_after> --out monitor/changeset.json
    python3 scripts/monitor.py propagate monitor/changeset.json \
        --profiles monitor/profiles.json --assessments monitor/assessments.json --out monitor/impact.json

Comparison is at the level of the requirement. The fingerprint covers only the normative fields —
statement, deadline, basis, required content, applicability, jurisdiction, recipient — so a
renumbered recital does not invalidate an assessment while an added mandatory content element does.

Fetching uses a pluggable adapter: `eurlex` queries the Cellar service and needs outbound network;
`snapshot` reads a recorded state, for hosts that have none.

## Limits

- Every statement is `DRAFT-VERIFY`. These are decompositions of provisions, not verbatim text, and
  must be confirmed against the consolidated text on EUR-Lex by ENC before anything leaves DNSC.
- The CIR 2024/2690 layer is outstanding.
- The live EUR-Lex adapter is implemented but has not been exercised against the service.
- All organisations and figures are illustrative. Output is evidence-based self-assessment and does
  not constitute a determination of legal compliance by DNSC.
