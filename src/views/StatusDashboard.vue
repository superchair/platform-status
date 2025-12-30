<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-between my-3">
      <h2 class="h5 m-0">Service Status</h2>
      <div class="d-flex align-items-center gap-3">
        <span class="text-muted small"
          >Last updated: {{ lastUpdatedText }}</span
        >
        <button
          class="btn btn-primary btn-sm"
          :disabled="loading"
          @click="refresh"
        >
          {{ loading ? "Refreshing…" : "Refresh" }}
        </button>
      </div>
    </div>

    <template v-if="isAuthenticated">
      <section v-for="cluster in clusters" :key="cluster" class="mb-4">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <h3 class="h6 text-uppercase text-muted m-0">{{ cluster }}</h3>
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            :aria-expanded="!collapsed[cluster]"
            @click="toggleCollapsed(cluster)"
          >
            {{ collapsed[cluster] ? "Show" : "Hide" }}
          </button>
        </div>
        <div class="row g-3" v-show="!collapsed[cluster]">
          <div
            class="col-12 col-md-6"
            v-for="svc in servicesByCluster[cluster]"
            :key="`${cluster}::${svc.name}`"
          >
            <ServiceCard
              :service="svc"
              :result="results.get(`${cluster}::${svc.name}`)"
              :loading="loading"
            />
          </div>
        </div>
      </section>
    </template>
    <div v-else-if="!isLoading" class="alert alert-warning" role="alert">
      You need to log in to view service status. Use the Log In button in the
      header to authenticate.
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import ServiceCard from "../components/ServiceCard.vue";
import { useStatusDashboard } from "../composables/useStatusDashboard";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

const { clusters, servicesByCluster, results, loading, lastUpdated, refresh } =
  useStatusDashboard();

const collapsed = reactive(Object.fromEntries(clusters.map((c) => [c, true])));
const toggleCollapsed = (c) => {
  collapsed[c] = !collapsed[c];
};
const { isAuthenticated, isLoading } = useAuth0();
const router = useRouter();

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace({ name: "splash" });
  }
});

watch(isAuthenticated, (val) => {
  if (!val) {
    router.replace({ name: "splash" });
  }
});

const lastUpdatedText = computed(() => {
  if (!lastUpdated.value) return "—";
  const d = new Date(lastUpdated.value);
  return Number.isFinite(d.getTime())
    ? d.toLocaleString()
    : String(lastUpdated.value);
});
</script>
