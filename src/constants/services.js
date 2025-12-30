// ECS clusters
export const CLUSTERS = [
  "dev-external-ecs",
  "staging-external-ecs",
  "production-external-ecs",
];

// Base services (serviceId used to build hosts)
export const BASE_SERVICES = [
  { name: "dealer-service" },
  { name: "consumer-core" },
  { name: "lender-aggregator-proxy-service" },
  { name: "otp-service" },
  { name: "crm-integration-service" },
  { name: "vin-decoder" },
  { name: "inventory-core-service" },
  { name: "url-shortener" },
  { name: "consumer-authentication-service" },
];

function hostForCluster(serviceName, cluster) {
  if (cluster === "dev-external-ecs")
    return `${serviceName}.dev.autoverify.services`;
  if (cluster === "staging-external-ecs")
    return `${serviceName}.stage.autoverify.services`;
  if (cluster === "production-external-ecs")
    return `${serviceName}.autoverify.services`;
  return `${serviceName}.autoverify.services`;
}

// Build services grouped by cluster
export const SERVICES_BY_CLUSTER = CLUSTERS.reduce((acc, cluster) => {
  acc[cluster] = BASE_SERVICES.map((s) => {
    const host = hostForCluster(s.name, cluster);
    // In dev, use prefixed paths to enable proxying per cluster
    const devPrefix =
      cluster === "dev-external-ecs"
        ? "/dev"
        : cluster === "staging-external-ecs"
        ? "/staging"
        : "/prod";
    return {
      name: s.name, // display & key
      host,
      devPath: `${devPrefix}/${s.name}/info`,
      url: `https://${host}/info`,
    };
  });
  return acc;
}, {});

export function getServiceUrl(service, cluster) {
  // In dev, use the proxy path; otherwise full https host
  return import.meta.env.DEV ? service.devPath : service.url;
}
