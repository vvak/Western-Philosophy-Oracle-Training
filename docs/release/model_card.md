# Model Card Template

## Model

- Base model: `google/gemma-4-E2B-it`
- Training method: unknown until run
- Dataset: `corpus/training/pilot/train.jsonl`
- Config templates:
  - `training/configs/lora_sft_pilot.yaml`
  - `training/configs/dapt_pilot.yaml`

## Training Status

No model training has been launched from this repo.

## Available Training Configs

- LoRA/SFT pilot: `training/configs/lora_sft_pilot.yaml`
- DAPT pilot: `training/configs/dapt_pilot.yaml`
- Runbook: `training/README.md`

These are templates only. They do not define a pinned trainer stack or launch command.

## Evaluation

Baseline eval sets:

- `corpus/evals/philosophy_qa.jsonl`
- `corpus/evals/provenance.jsonl`
- `corpus/evals/hallucination_traps.jsonl`
- `corpus/evals/oracle_style.jsonl`

Record baseline and post-training scores before release.

Oracle retrieval behavior should also be checked against:

- `oracle/system_prompt.md`
- `oracle/retrieval_design.md`
- `oracle/citation_schema.json`

## Known Risks

- OCR noise and edition ambiguity.
- Overconfident historical claims.
- Fabricated citations or page numbers.
- Rights/provenance mistakes if source metadata is ignored.

## Required Before Release

- Training command and exact package versions.
- Hardware/runtime details.
- Base-model license review.
- Eval results.
- Sample outputs and failure cases.
