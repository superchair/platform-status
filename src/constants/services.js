export const SERVICES = [
  {
    name: "dealer-service.dev.autoverify.services",
    host: "dealer-service.dev.autoverify.services",
    devPath: "/dealer-service/info",
    prodUrl: "https://dealer-service.dev.autoverify.services/info",
  },
  {
    name: "consumer-core.dev.autoverify.services",
    host: "consumer-core.dev.autoverify.services",
    devPath: "/consumer-core/info",
    prodUrl: "https://consumer-core.dev.autoverify.services/info",
  },
  {
    name: "unreachable.dev.autoverify.services",
    host: "unreachable.dev.autoverify.services",
    devPath: "/unreachable/info",
    prodUrl: "https://unreachable.dev.autoverify.services/info",
  },
];

export function getServiceUrl(service) {
  return import.meta.env.DEV ? service.devPath : service.prodUrl;
}
