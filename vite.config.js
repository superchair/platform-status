import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/dealer-service": {
        target: "https://dealer-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dealer-service/, ""),
      },
      "/consumer-core": {
        target: "https://consumer-core.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/consumer-core/, ""),
      },
      "/unreachable": {
        target: "https://unreachable.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/unreachable/, ""),
      },
    },
  },
});
