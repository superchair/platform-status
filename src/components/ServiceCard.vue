<template>
  <div class="card h-100">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h3 class="h6 m-0">{{ service.host }}</h3>
      <span class="badge" :class="badgeClass">
        <template v-if="result?.online">Online</template>
        <template v-else-if="!loading && result">Offline</template>
        <template v-else>Loading</template>
      </span>
    </div>
    <div class="card-body">
      <template v-if="result?.online">
        <pre
          v-if="result?.data"
          class="mb-0"
        ><code>{{ pretty(result.data) }}</code></pre>
        <p v-else class="mb-0 text-muted fst-italic">(no JSON body)</p>
      </template>
      <template v-else-if="!loading && result">
        <p class="mb-1 fw-semibold">Offline</p>
        <p v-if="result.statusCode" class="mb-1">
          Status: {{ result.statusCode }}
        </p>
        <p v-if="result.error" class="mb-0 text-muted">
          Error: {{ result.error }}
        </p>
      </template>
      <template v-else>
        <p class="mb-0 text-muted">Loading...</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  service: { type: Object, required: true },
  result: { type: Object, required: false },
  loading: { type: Boolean, required: true },
});

const badgeClass = computed(() => {
  if (props.result?.online) return "bg-success";
  if (!props.loading && props.result && !props.result.online)
    return "bg-danger";
  return "bg-secondary";
});

function pretty(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}
</script>

<style scoped>
pre {
  background: #f8f9fa;
  padding: 8px;
  border-radius: 4px;
}
</style>
