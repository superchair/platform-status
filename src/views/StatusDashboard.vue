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
          :disabled="loadingByCluster[activeCluster]"
          @click="refreshCluster(activeCluster)"
        >
          {{ loadingByCluster[activeCluster] ? "Refreshing…" : "Refresh" }}
        </button>
      </div>
    </div>

    <template v-if="isAuthenticated">
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item" v-for="cluster in clusters" :key="cluster">
          <button
            class="nav-link"
            :class="{ active: cluster === activeCluster }"
            @click="activeCluster = cluster"
          >
            {{ cluster }}
          </button>
        </li>
      </ul>

      <div class="row g-3">
        <div
          class="col-12 col-md-6"
          v-for="svc in servicesByCluster[activeCluster]"
          :key="`${activeCluster}::${svc.name}`"
        >
          <ServiceCard
            :service="svc"
            :result="results.get(`${activeCluster}::${svc.name}`)"
            :loading="loadingByCluster[activeCluster]"
          />
        </div>
      </div>
    </template>
    <div v-else-if="!isLoading" class="alert alert-warning" role="alert">
      You need to log in to view service status. Use the Log In button in the
      header to authenticate.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ServiceCard from "../components/ServiceCard.vue";
import { useStatusDashboard } from "../composables/useStatusDashboard";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

const {
  clusters,
  servicesByCluster,
  results,
  loadingByCluster,
  lastUpdatedByCluster,
  refreshCluster,
} = useStatusDashboard();

const activeCluster = ref(clusters[0]);
const { isAuthenticated, isLoading } = useAuth0();
const router = useRouter();

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace({ name: "splash" });
  } else {
    refreshCluster(activeCluster.value);
  }
});

watch(isAuthenticated, (val) => {
  if (!val) {
    router.replace({ name: "splash" });
  } else {
    refreshCluster(activeCluster.value);
  }
});

watch(activeCluster, (val) => {
  if (isAuthenticated.value) {
    refreshCluster(val);
  }
});

const lastUpdatedText = computed(() => {
  const lu = lastUpdatedByCluster[activeCluster.value];
  if (!lu) return "—";
  const d = new Date(lu);
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : String(lu);
});
</script>
