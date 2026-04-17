# Release Checklist

## Dataset

- [ ] `corpus/reports/status.json` refreshed.
- [ ] `corpus/exports/training_manifest.jsonl` validates.
- [ ] `corpus/exports/training_text.jsonl` validates.
- [ ] `corpus/exports/training_text_token_counts_summary.json` exists.
- [ ] `corpus/exports/training_export_report.md` reviewed.
- [ ] OCR reject/retrieval-only exclusions verified.

## Pilot

- [ ] `corpus/training/pilot/train.jsonl` validates.
- [ ] `corpus/training/pilot/manifest.json` reviewed.
- [ ] `corpus/training/pilot/report.md` reviewed.

## Eval

- [ ] `corpus/evals/*.jsonl` validates.
- [ ] Baseline evals run on base model.
- [ ] Post-training evals run on trained checkpoint.
- [ ] Hallucination trap failures reviewed.
- [ ] Provenance failures reviewed.

## Oracle

- [ ] `oracle/citation_schema.json` validates as JSON.
- [ ] Retrieval design reviewed.
- [ ] System prompt reviewed.
- [ ] Refusal behavior tested against eval traps.

## Rights

- [ ] License summary reviewed.
- [ ] Per-item review records resolved or excluded.
- [ ] Modern copyrighted sources excluded.
- [ ] Source URLs and edition metadata spot-checked.

## Model

- [ ] Training configs reviewed.
- [ ] Training command recorded.
- [ ] Package versions pinned.
- [ ] Hardware/runtime recorded.
- [ ] Model card completed.
- [ ] Known risks documented.
