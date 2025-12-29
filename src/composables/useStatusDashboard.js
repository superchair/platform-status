import { reactive, ref, onMounted } from 'vue'
import { SERVICES, getServiceUrl } from '../constants/services'
import { getServiceStatus } from '../services/statusApi'

export function useStatusDashboard() {
  const services = SERVICES
  const results = reactive(new Map())
  const loading = ref(false)
  const lastUpdated = ref(null)

  let debounceTimer = null

  const runRefresh = async () => {
    loading.value = true
    const tasks = services.map(async (s) => {
      const res = await getServiceStatus(getServiceUrl(s))
      return { name: s.name, res }
    })
    const settled = await Promise.allSettled(tasks)
    settled.forEach((s) => {
      if (s.status === 'fulfilled') {
        results.set(s.value.name, s.value.res)
      } else {
        results.set('unknown', {
          online: false,
          statusCode: 0,
          error: s.reason?.message || 'Unknown error',
          durationMs: 0,
        })
      }
    })
    lastUpdated.value = new Date()
    loading.value = false
  }

  const refresh = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(runRefresh, 500)
  }

  onMounted(() => refresh())

  return { services, results, loading, lastUpdated, refresh }
}

export default useStatusDashboard
