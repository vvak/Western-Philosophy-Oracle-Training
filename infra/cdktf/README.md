# CDKTF Cloud Run GPU Job

Deploys a Cloud Run Job for Gemma pilot training.

Defaults:

- Cloud Run Job
- 1 GPU
- GPU type: `nvidia-l4`
- CPU: `4`
- memory: `16Gi`
- parallelism/tasks: `1`

Note: current Cloud Run Serverless GPU docs support `nvidia-l4` for jobs, not NVIDIA T4. Keep `gpuType=nvidia-l4` unless GCP adds another valid Cloud Run accelerator.

## Setup

```bash
cd /Users/vlad/projects/western-philosophy-oracle-training/infra/cdktf
npm install
npm run get
```

## Configure

Use env vars or CDKTF variables:

```bash
export CDKTF_VAR_projectId="YOUR_GCP_PROJECT"
export CDKTF_VAR_region="us-central1"
export CDKTF_VAR_image="REGION-docker.pkg.dev/PROJECT/REPO/IMAGE:TAG"
export CDKTF_VAR_datasetUri="gs://BUCKET/path/train.jsonl"
export CDKTF_VAR_outputUri="gs://BUCKET/runs/gemma4-pilot"
```

Optional:

```bash
export CDKTF_VAR_jobName="gemma4-pilot-train"
export CDKTF_VAR_command='["python","-m","training.run"]'
export CDKTF_VAR_args='["--config","training/configs/lora_sft_pilot.yaml"]'
```

## Deploy

```bash
npm run synth
npm run deploy
```

## Execute

```bash
gcloud run jobs execute gemma4-pilot-train --region "$CDKTF_VAR_region" --wait
```

## Resources

Creates:

- Artifact Registry repo for training images
- GCS bucket for training artifacts
- Cloud Run Job service account
- Cloud Run Job with GPU limits

The image itself must already exist.
