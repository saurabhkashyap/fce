
import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";
import { Volume, VolumeMount } from "kubernetes-models/v1";

const project = "fce";
const name = "n8n";

const downloadsVolume = new Volume({
  name: "downloads",
});

const downloadsVolumeMount = new VolumeMount({
  name: "downloads",
  mountPath: "/tmp/download"
});

const createManifests = async () => {
  const manifests = await create(name, {
    env,
    config: {
      containerPort: 5678,
      subDomainPrefix: "n8n-",
    },
    deployment: {
      image: getGithubRegistryImagePath(({ project, name })),
      volumes: [downloadsVolume],
      container: {
        resources: {
          requests: {
            cpu: "50m",
            memory: "128Mi",
          },
          limits: {
            cpu: "4",
            memory: "1280Mi",
          },
        },
        volumeMounts: [downloadsVolumeMount]
      },
    },
  });

  return [...manifests];
}

export default createManifests;
