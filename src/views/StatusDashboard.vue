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

    <div v-if="isAuthenticated" class="row g-3">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="svc in services"
        :key="svc.name"
      >
        <ServiceCard
          :service="svc"
          :result="results.get(svc.name)"
          :loading="loading"
        />
      </div>
    </div>
    <div v-else class="alert alert-warning" role="alert">
      You need to log in to view service status. Use the Log In button in the
      header to authenticate.
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import ServiceCard from "../components/ServiceCard.vue";
import { useStatusDashboard } from "../composables/useStatusDashboard";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

const { services, results, loading, lastUpdated, refresh } =
  useStatusDashboard();
const { isAuthenticated } = useAuth0();
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
