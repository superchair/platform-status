import { reactive, ref } from "vue";
import {
  CLUSTERS,
  SERVICES_BY_CLUSTER,
  getServiceUrl,
} from "../constants/services";
import { getServiceStatus } from "../services/statusApi";

export function useStatusDashboard() {
  const clusters = CLUSTERS;
  const servicesByCluster = SERVICES_BY_CLUSTER;
  const results = reactive(new Map());
  const loadingByCluster = reactive(
    Object.fromEntries(clusters.map((c) => [c, false]))
  );
  const lastUpdatedByCluster = reactive(
    Object.fromEntries(clusters.map((c) => [c, null]))
  );

  const debounceTimers = Object.fromEntries(clusters.map((c) => [c, null]));

  const runRefreshCluster = async (cluster) => {
    loadingByCluster[cluster] = true;
    const tasks = servicesByCluster[cluster].map((s) =>
      (async () => {
        const res = await getServiceStatus(getServiceUrl(s, cluster));
        return { key: `${cluster}::${s.name}`, res };
      })()
    );
    const settled = await Promise.allSettled(tasks);
    settled.forEach((s) => {
      if (s.status === "fulfilled") {
        results.set(s.value.key, s.value.res);
      } else {
        const key = s.reason?.key || `${cluster}::unknown`;
        results.set(key, {
          online: false,
          statusCode: 0,
          error: s.reason?.message || "Unknown error",
          durationMs: 0,
        });
      }
    });
    lastUpdatedByCluster[cluster] = new Date();
    loadingByCluster[cluster] = false;
  };

  const refreshCluster = (cluster) => {
    if (debounceTimers[cluster]) clearTimeout(debounceTimers[cluster]);
    debounceTimers[cluster] = setTimeout(() => runRefreshCluster(cluster), 500);
  };

  const runRefreshAll = async () => {
    // Refresh all clusters sequentially to avoid overwhelming endpoints
    for (const cluster of clusters) {
      await runRefreshCluster(cluster);
    }
  };

  const refreshAll = () => {
    // Fire-and-forget all clusters refresh without debounce
    runRefreshAll();
  };

  return {
    clusters,
    servicesByCluster,
    results,
    loadingByCluster,
    lastUpdatedByCluster,
    refreshCluster,
    refreshAll,
  };
}

export default useStatusDashboard;
