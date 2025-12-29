export async function fetchWithTimeout(url, { timeoutMs = 5000 } = {}) {
  const controller = new AbortController();
  const signal = controller.signal;
  const start =
    typeof performance !== "undefined" && performance.now
      ? performance.now()
      : Date.now();
  const timer = setTimeout(
    () => controller.abort(new Error("timeout")),
    timeoutMs
  );
  try {
    const res = await fetch(url, { signal });
    clearTimeout(timer);
    const end =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();
    const durationMs = end - start;
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    let data;
    if (contentType.includes("application/json")) {
      try {
        data = await res.json();
      } catch (_) {
        // ignore JSON parse errors
      }
    }
    return { ok: res.ok, status: res.status, data, durationMs };
  } catch (err) {
    clearTimeout(timer);
    const end =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();
    const durationMs = end - start;
    return {
      ok: false,
      status: 0,
      error: err?.message || String(err),
      durationMs,
    };
  }
}

export async function getServiceStatus(url, opts = {}) {
  const r = await fetchWithTimeout(url, opts);
  const online = r.ok && r.status !== 404;
  return {
    online,
    statusCode: r.status,
    data: r.data,
    error: r.error,
    durationMs: r.durationMs,
  };
}
