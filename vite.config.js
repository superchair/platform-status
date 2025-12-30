import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Dev cluster proxies
      "/dev/dealer-service": {
        target: "https://dealer-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/dealer-service/, ""),
      },
      "/dev/consumer-core": {
        target: "https://consumer-core.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/consumer-core/, ""),
      },
      "/dev/unreachable": {
        target: "https://unreachable.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/unreachable/, ""),
      },
      // Staging cluster proxies
      "/staging/dealer-service": {
        target: "https://dealer-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/dealer-service/, ""),
      },
      "/staging/consumer-core": {
        target: "https://consumer-core.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/consumer-core/, ""),
      },
      "/staging/unreachable": {
        target: "https://unreachable.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/unreachable/, ""),
      },
      // Production cluster proxies
      "/prod/dealer-service": {
        target: "https://dealer-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/dealer-service/, ""),
      },
      "/prod/consumer-core": {
        target: "https://consumer-core.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/consumer-core/, ""),
      },
      "/prod/unreachable": {
        target: "https://unreachable.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/unreachable/, ""),
      },
    },
  },
});
