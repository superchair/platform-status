<template>
  <div class="card">
    <header class="card-header">
      <h3 class="title">{{ service.name }}</h3>
      <span class="badge" :class="badgeClass">
        <template v-if="result?.online">Online</template>
        <template v-else-if="!loading && result">Offline</template>
        <template v-else>Loading</template>
      </span>
    </header>
    <section class="content">
      <template v-if="result?.online">
        <pre v-if="result?.data">{{ pretty(result.data) }}</pre>
        <pre v-else>(no JSON body)</pre>
      </template>
      <template v-else-if="!loading && result">
        <p>Offline</p>
        <p v-if="result.statusCode">Status: {{ result.statusCode }}</p>
        <p v-if="result.error">Error: {{ result.error }}</p>
      </template>
      <template v-else>
        <p>Loading...</p>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  service: { type: Object, required: true },
  result: { type: Object, required: false },
  loading: { type: Boolean, required: true },
})

const badgeClass = computed(() => {
  if (props.result?.online) return 'green'
  if (!props.loading && props.result && !props.result.online) return 'red'
  return 'gray'
})

function pretty(obj) {
  try { return JSON.stringify(obj, null, 2) } catch { return String(obj) }
}
</script>

<style scoped>
.card { border:1px solid #e5e7eb; border-radius:8px; background:#fff; overflow:hidden; display:flex; flex-direction:column; }
.card-header { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #e5e7eb; }
.title { margin:0; font-size:16px; font-weight:600; }
.badge { padding:2px 8px; border-radius:999px; font-size:12px; color:#111; border:1px solid transparent; }
.badge.green { background:#dcfce7; border-color:#16a34a; }
.badge.red { background:#fee2e2; border-color:#dc2626; }
.badge.gray { background:#f3f4f6; border-color:#9ca3af; }
.content { padding:12px 14px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:13px; overflow:auto; }
</style>
