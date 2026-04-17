# Oracle RAG Layer

This directory defines the retrieval and citation layer for a philosophy Oracle over the corpus.

## Inputs

Use segmented corpus files:

- `corpus/normalized/jsonl/gutenberg.segmented.jsonl`
- `corpus/normalized/jsonl/standard_ebooks.segmented.jsonl`
- `corpus/normalized/jsonl/internet_archive.segmented.jsonl`
- `corpus/normalized/jsonl/ia_resolved.segmented.jsonl`
- `corpus/normalized/jsonl/lane_b.segmented.jsonl`

Use manifests and reports for rights/provenance:

- `corpus/manifests/works.jsonl`
- `corpus/manifests/versions.jsonl`
- `corpus/reports/source_quality.md`
- `corpus/reports/ocr_quality_scores.jsonl`

## Query Flow

1. Retrieve candidate chunks from segmented JSONL-derived index.
2. Filter or down-rank low-quality OCR and retrieval-only material.
3. Answer only from retrieved context when citation is requested.
4. Cite every substantive corpus-backed claim with the citation schema.
5. Refuse exact source/page claims when metadata is absent.

## Eval Loop

Run prompts from `corpus/evals/*.jsonl` before and after retrieval changes. Score with each item's `expected_behavior` and `scoring_notes`.
