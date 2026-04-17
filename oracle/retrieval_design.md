# Retrieval Design

## Index Records

Index one record per segmented chunk. Required metadata:

- `chunk_id` or `doc_id`
- `parent_doc_id`
- `work_id`
- `version_id`
- `title`
- `author`
- `translator`
- `language`
- `source`
- `source_id`
- `source_url`
- `license_status`
- `quality_tier`
- `ocr_quality_score`
- `ocr_quality_class`
- `training_eligibility`
- `hierarchy`
- `offsets`
- `text`

## Ranking

Initial retrieval can use hybrid lexical + embedding search.

Recommended ranking boosts:

- Tier 1 clean primary texts.
- Standard Ebooks and Project Gutenberg clean editions.
- Exact philosopher/work matches.
- Chunks with clear hierarchy and source URL.

Recommended down-ranks:

- `tier_4_ocr_expansion`.
- `ocr_bronze`.
- missing source URL.
- broad secondary source when the question asks for primary text.

Hard exclusions:

- OCR class `reject`.
- records with missing license/provenance.
- modern copyrighted or review-gated records.

## Citation Behavior

Every answer with source-specific claims should include citations conforming to `oracle/citation_schema.json`.

When exact page/section data is unavailable, cite available hierarchy and offsets instead of inventing pages.

## Refusal Behavior

Refuse or caveat when:

- requested text is not in retrieved context,
- source rights are unclear,
- user asks for modern copyrighted translation,
- citation requires page/edition data not present,
- answer would rely on low-quality OCR without warning.
