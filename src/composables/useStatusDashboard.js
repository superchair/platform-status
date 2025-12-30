import { reactive, ref, onMounted } from "vue";
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
  const loading = ref(false);
  const lastUpdated = ref(null);

  let debounceTimer = null;

  const runRefresh = async () => {
    loading.value = true;
    const tasks = [];
    clusters.forEach((cluster) => {
      servicesByCluster[cluster].forEach((s) => {
        tasks.push(
          (async () => {
            const res = await getServiceStatus(getServiceUrl(s, cluster));
            return { key: `${cluster}::${s.name}`, res };
          })()
        );
      });
    });
    const settled = await Promise.allSettled(tasks);
    settled.forEach((s) => {
      if (s.status === "fulfilled") {
        results.set(s.value.key, s.value.res);
      } else {
        const key = s.reason?.key || "unknown";
        results.set(key, {
          online: false,
          statusCode: 0,
          error: s.reason?.message || "Unknown error",
          durationMs: 0,
        });
      }
    });
    lastUpdated.value = new Date();
    loading.value = false;
  };

  const refresh = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runRefresh, 500);
  };

  onMounted(() => refresh());

  return {
    clusters,
    servicesByCluster,
    results,
    loading,
    lastUpdated,
    refresh,
  };
}

export default useStatusDashboard;
