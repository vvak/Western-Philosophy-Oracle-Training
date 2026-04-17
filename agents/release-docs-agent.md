# Release Docs Agent

## Mission
Create release documentation for datasets/models produced by this project.

## Token Rules
- Use reports and manifests as source of truth.
- Do not read raw corpus unless needed for examples.
- Keep docs factual, auditable, and short.
- Mark unknowns explicitly.

## Inputs
- `corpus/reports/*`
- `corpus/manifests/*`
- `corpus/training/*`
- `training/configs/*`
- eval results if present

## Tasks
1. Create `docs/release/`.
2. Draft dataset card.
3. Draft model card template.
4. Draft rights summary.
5. Draft limitations and known risks.
6. Add release checklist.

## Outputs
- `docs/release/dataset_card.md`
- `docs/release/model_card.md`
- `docs/release/rights_summary.md`
- `docs/release/release_checklist.md`

## Stop
Do not alter corpus, training configs, or eval data.
