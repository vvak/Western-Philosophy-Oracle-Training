# RAG Oracle Agent

## Mission
Design the retrieval/citation Oracle layer over the corpus.

## Token Rules
- Read manifests/reports, not raw text.
- Use existing folder conventions.
- Keep docs implementation-ready and compact.
- Avoid building UI unless requested.

## Inputs
- `corpus/manifests/*.jsonl`
- `corpus/reports/*`
- segmentation/chunking outputs if present

## Tasks
1. Create `oracle/`.
2. Define retrieval architecture.
3. Define citation/provenance format.
4. Define Oracle system prompt.
5. Define refusal behavior for missing/uncertain sources.
6. Define eval loop against `corpus/evals/`.

## Outputs
- `oracle/README.md`
- `oracle/system_prompt.md`
- `oracle/retrieval_design.md`
- `oracle/citation_schema.json`

## Stop
Do not train. Do not ingest new corpus data.
