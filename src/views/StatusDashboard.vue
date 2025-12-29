<template>
  <section>
    <header class="header">
      <h2 class="heading">Service Status</h2>
      <div class="controls">
        <span class="timestamp">Last updated: {{ lastUpdatedText }}</span>
        <button class="refresh" :disabled="loading" @click="refresh">
          {{ loading ? 'Refreshing…' : 'Refresh' }}
        </button>
      </div>
    </header>
    <div class="grid">
      <ServiceCard
        v-for="svc in services"
        :key="svc.name"
        :service="svc"
        :result="results.get(svc.name)"
        :loading="loading"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { useStatusDashboard } from '../composables/useStatusDashboard'

const { services, results, loading, lastUpdated, refresh } = useStatusDashboard()

const lastUpdatedText = computed(() => {
  if (!lastUpdated.value) return '—'
  const d = new Date(lastUpdated.value)
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : String(lastUpdated.value)
})
</script>

<style scoped>
.header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }
.heading { margin:0; font-size:20px; }
.controls { display:flex; align-items:center; gap:12px; }
.timestamp { color:#6b7280; font-size:12px; }
.refresh { padding:6px 10px; }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px; }
</style>
