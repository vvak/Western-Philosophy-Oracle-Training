# Western Philosophy Oracle Training

Training, benchmarking, and Oracle/RAG scaffolding for models built on the `western-philosophy-corpus` dataset.

Dataset/corpus repo:

```text
https://github.com/vvak/Western-Philosophy-Corpus-Agent
```

This repo should contain training-specific material only: configs, runs, eval runners, Oracle prompts, retrieval design, release docs, and experiment notes.


## Boundary

Corpus repo owns:

- manifests
- acquisition scripts
- raw/normalized corpus artifacts
- token counts
- rights reports
- dataset versioning
- eval dataset source files

Training repo owns:

- training configs
- benchmark/eval runs
- model run metadata
- Oracle/RAG design
- release docs for trained artifacts
- deployment notes


## Current Contents

```text
agents/
corpus/evals/
docs/release/
infra/cdktf/
oracle/
training/
```

`corpus/evals/` is copied here for training convenience. Treat the corpus repo as source of truth.


## Phase Order

```text
1. Verify imported dataset/evals
2. Run baseline eval on base Gemma 4
3. Run tiny LoRA/SFT pilot
4. Run eval on tuned model
5. Compare base vs tuned
6. Adjust data/config or scale
7. Update Oracle/RAG docs
8. Update release docs
```


## Dataset Input

Expected dataset export from corpus repo:

```text
https://github.com/vvak/Western-Philosophy-Corpus-Agent/corpus/training/pilot/train.jsonl
https://github.com/vvak/Western-Philosophy-Corpus-Agent/training/pilot/manifest.json
```

Configs should reference dataset versions explicitly.


## Model Target

Default prototype target:

```text
google/gemma-4-E2B-it
```

Use Gemma tokenizer/processor for counts and formatting.


## Safety Gates

Do not train unless:

- pilot dataset validates
- eval baseline exists
- rights summary is current
- config references exact dataset paths
- output path is outside corpus source folders

Do not commit:

- checkpoints
- secrets/API keys
- large generated artifacts
- local cache directories


## Agents

- `agents/training-config-agent.md`: config templates.
- `agents/rag-oracle-agent.md`: retrieval/citation design.
- `agents/release-docs-agent.md`: model/dataset/release docs.

Corpus-only agents remain in the corpus repo.


## Cloud Run GPU Job

CDKTF infra lives in:

```text
infra/cdktf/
```

It deploys a Cloud Run Job for pilot training with:

- 1 GPU
- 4 CPU
- 16Gi memory
- configurable container image

Current Cloud Run Serverless GPU docs support `nvidia-l4`; T4 is not a valid Cloud Run GPU type at this time.
