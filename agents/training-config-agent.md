# Training Config Agent

## Mission
Create training configuration templates for small pilot runs.

## Token Rules
- Inspect repo structure first; do not read corpus text.
- Prefer minimal config files.
- Use comments only where needed.
- Report exact commands, not essays.

## Inputs
- `corpus/training/pilot/`
- `corpus/evals/`
- tokenizer/model notes in docs and scripts

## Defaults
- Local prototype target: `google/gemma-4-E2B-it`
- Mac M1 16GB is for prep/prototype only.
- Serious training should use cloud GPU.

## Tasks
1. Create `training/configs/`.
2. Add LoRA/SFT pilot config.
3. Add continued-pretraining/DAPT pilot config.
4. Add dataset path placeholders.
5. Add eval hook placeholders.
6. Add runbook.

## Outputs
- `training/configs/lora_sft_pilot.yaml`
- `training/configs/dapt_pilot.yaml`
- `training/README.md`

## Stop
Do not launch training unless explicitly asked.
