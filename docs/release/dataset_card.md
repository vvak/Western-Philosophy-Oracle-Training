# Western Philosophy Corpus Dataset Card

## Dataset

Public-domain-first Western philosophy corpus for retrieval, evaluation, and domain-adaptive language-model preparation.

## Current Export

- Training text export: `corpus/exports/training_text.jsonl`
- Training manifest: `corpus/exports/training_manifest.jsonl`
- Training export report: `corpus/exports/training_export_report.md`
- Records: 591
- Gemma 4 tokens: 98,899,245
- Text characters: 353,693,082

## Pilot Shard

- Path: `corpus/training/pilot/train.jsonl`
- Records: 166
- Tokens: 9,048,694
- Manifest: `corpus/training/pilot/manifest.json`
- Report: `corpus/training/pilot/report.md`

## Evaluation Sets

- `corpus/evals/philosophy_qa.jsonl`
- `corpus/evals/provenance.jsonl`
- `corpus/evals/hallucination_traps.jsonl`
- `corpus/evals/oracle_style.jsonl`

## Oracle Layer

- Retrieval design: `oracle/retrieval_design.md`
- System prompt: `oracle/system_prompt.md`
- Citation schema: `oracle/citation_schema.json`

## Sources

- Project Gutenberg
- Standard Ebooks
- Internet Archive public-domain scans
- Lane B public-domain commentaries and secondary literature

## Quality Controls

- Source/version manifests preserve provenance.
- Deduped source files feed the final export.
- OCR scores are recorded in `corpus/reports/ocr_quality_scores.jsonl`.
- `reject` OCR is skipped during normalization.
- `ocr_bronze` is excluded from training export as retrieval-only.

## Intended Use

- Domain-adaptive pretraining experiments.
- Retrieval and citation experiments.
- Baseline evaluation of philosophy QA, provenance behavior, hallucination resistance, and Oracle-style responses.

## Not Intended For

- Legal or scholarly citation without checking the source edition.
- Training on modern copyrighted philosophy.
- Treating OCR-heavy records as equally reliable with clean public-domain editions.
