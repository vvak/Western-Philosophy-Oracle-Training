import { App, TerraformOutput, TerraformResource, TerraformResourceConfig, TerraformStack, TerraformVariable } from "cdktf";
import { Construct } from "constructs";
import { GoogleBetaProvider } from "@cdktf/provider-google-beta/lib/provider";

type Attrs = { [key: string]: unknown };

class RawResource extends TerraformResource {
  constructor(scope: Construct, id: string, private readonly type: string, private readonly attrs: Attrs, config: TerraformResourceConfig = {}) {
    super(scope, id, { ...config, terraformResourceType: type, terraformGeneratorMetadata: { providerName: "google-beta" } });
  }
  protected synthesizeAttributes(): Attrs { return this.attrs; }
}

class GpuJobStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const projectId = new TerraformVariable(this, "projectId", { type: "string" });
    const region = new TerraformVariable(this, "region", { type: "string", default: "us-central1" });
    const jobName = new TerraformVariable(this, "jobName", { type: "string", default: "gemma4-pilot-train" });
    const image = new TerraformVariable(this, "image", { type: "string", description: "Training container image URI." });
    const datasetUri = new TerraformVariable(this, "datasetUri", { type: "string", default: "" });
    const outputUri = new TerraformVariable(this, "outputUri", { type: "string", default: "" });
    const configPath = new TerraformVariable(this, "configPath", { type: "string", default: "training/configs/lora_sft_pilot.yaml" });
    const gpuType = new TerraformVariable(this, "gpuType", { type: "string", default: "nvidia-l4" });
    const command = new TerraformVariable(this, "command", { type: "list(string)", default: [] });
    const args = new TerraformVariable(this, "args", { type: "list(string)", default: [] });

    const provider = new GoogleBetaProvider(this, "google-beta", { project: projectId.stringValue, region: region.stringValue });

    const runApi = new RawResource(this, "run_api", "google_project_service", {
      project: projectId.stringValue,
      service: "run.googleapis.com",
      disable_on_destroy: false
    }, { provider });
    const arApi = new RawResource(this, "artifact_registry_api", "google_project_service", {
      project: projectId.stringValue,
      service: "artifactregistry.googleapis.com",
      disable_on_destroy: false
    }, { provider });
    const storageApi = new RawResource(this, "storage_api", "google_project_service", {
      project: projectId.stringValue,
      service: "storage.googleapis.com",
      disable_on_destroy: false
    }, { provider });

    const repo = new RawResource(this, "training_images", "google_artifact_registry_repository", {
      project: projectId.stringValue,
      location: region.stringValue,
      repository_id: "oracle-training",
      format: "DOCKER",
      description: "Container images for Western Philosophy Oracle training jobs."
    }, { provider, dependsOn: [arApi] });

    const bucket = new RawResource(this, "training_artifacts", "google_storage_bucket", {
      project: projectId.stringValue,
      name: "${var.projectId}-oracle-training-artifacts",
      location: region.stringValue,
      uniform_bucket_level_access: true,
      force_destroy: false
    }, { provider, dependsOn: [storageApi] });

    const sa = new RawResource(this, "job_sa", "google_service_account", {
      project: projectId.stringValue,
      account_id: "oracle-training-job",
      display_name: "Oracle training Cloud Run Job"
    }, { provider });

    const storageIam = new RawResource(this, "job_sa_storage", "google_storage_bucket_iam_member", {
      bucket: "${google_storage_bucket.training_artifacts.name}",
      role: "roles/storage.objectAdmin",
      member: "serviceAccount:${google_service_account.job_sa.email}"
    }, { provider, dependsOn: [bucket, sa] });

    const job = new RawResource(this, "gemma4_training_job", "google_cloud_run_v2_job", {
      project: projectId.stringValue,
      name: jobName.stringValue,
      location: region.stringValue,
      deletion_protection: false,
      template: [{
        task_count: 1,
        parallelism: 1,
        template: [{
          service_account: "${google_service_account.job_sa.email}",
          timeout: "3600s",
          max_retries: 0,
          gpu_zonal_redundancy_disabled: true,
          node_selector: [{ accelerator: gpuType.stringValue }],
          containers: [{
            image: image.stringValue,
            command: command.listValue,
            args: args.listValue,
            env: [
              { name: "DATASET_URI", value: datasetUri.stringValue },
              { name: "OUTPUT_URI", value: outputUri.stringValue },
              { name: "TRAINING_CONFIG", value: configPath.stringValue },
              { name: "MODEL_ID", value: "google/gemma-4-E2B-it" }
            ],
            resources: [{
              limits: {
                cpu: "4",
                memory: "16Gi",
                "nvidia.com/gpu": "1"
              }
            }]
          }]
        }]
      }]
    }, { provider, dependsOn: [runApi, storageIam, repo] });

    new TerraformOutput(this, "jobName", { value: jobName.stringValue });
    new TerraformOutput(this, "region", { value: region.stringValue });
    new TerraformOutput(this, "artifactRegistryRepo", { value: "${google_artifact_registry_repository.training_images.name}" });
    new TerraformOutput(this, "artifactBucket", { value: "${google_storage_bucket.training_artifacts.name}" });
    new TerraformOutput(this, "execute", { value: "gcloud run jobs execute ${var.jobName} --region ${var.region} --wait" });
  }
}

const app = new App();
new GpuJobStack(app, "cloud-run-gpu-training");
app.synth();
