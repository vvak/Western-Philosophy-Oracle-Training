# Training Configs

This directory contains pilot configuration templates only. Do not launch training from this repo without an explicit run script and hardware target.

## Inputs

- Pilot dataset: `corpus/training/pilot/train.jsonl`
- Pilot manifest: `corpus/training/pilot/manifest.json`
- Eval sets: `corpus/evals/*.jsonl`
- Local prototype model/tokenizer: `google/gemma-4-E2B-it`

## Configs

- `training/configs/lora_sft_pilot.yaml`: LoRA/SFT-style pilot template.
- `training/configs/dapt_pilot.yaml`: continued-pretraining/DAPT pilot template.

## Suggested Dry Checks

```bash
python3 scripts/audit/validate_jsonl.py corpus/training/pilot/train.jsonl
python3 scripts/audit/validate_jsonl.py corpus/evals/philosophy_qa.jsonl
python3 scripts/audit/validate_jsonl.py corpus/evals/provenance.jsonl
python3 scripts/audit/validate_jsonl.py corpus/evals/hallucination_traps.jsonl
python3 scripts/audit/validate_jsonl.py corpus/evals/oracle_style.jsonl
```

## Launch Notes

Mac M1 16GB is suitable for dataset prep and small smoke tests only. Serious LoRA or DAPT runs should use a cloud GPU. Before launching, choose an actual trainer stack, implement a runner, pin package versions, and run the baseline evals against the untrained base model.
