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
      "/dev/lender-aggregator-proxy-service": {
        target:
          "https://lender-aggregator-proxy-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/dev\/lender-aggregator-proxy-service/, ""),
      },
      "/dev/otp-service": {
        target: "https://otp-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/otp-service/, ""),
      },
      "/dev/crm-integration-service": {
        target: "https://crm-integration-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/crm-integration-service/, ""),
      },
      "/dev/vin-decoder": {
        target: "https://vin-decoder.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/vin-decoder/, ""),
      },
      "/dev/inventory-core-service": {
        target: "https://inventory-core-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/inventory-core-service/, ""),
      },
      "/dev/url-shortener": {
        target: "https://url-shortener.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/url-shortener/, ""),
      },
      "/dev/consumer-authentication-service": {
        target:
          "https://consumer-authentication-service.dev.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/dev\/consumer-authentication-service/, ""),
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
      "/staging/lender-aggregator-proxy-service": {
        target:
          "https://lender-aggregator-proxy-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/staging\/lender-aggregator-proxy-service/, ""),
      },
      "/staging/otp-service": {
        target: "https://otp-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/otp-service/, ""),
      },
      "/staging/crm-integration-service": {
        target: "https://crm-integration-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/staging\/crm-integration-service/, ""),
      },
      "/staging/vin-decoder": {
        target: "https://vin-decoder.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/vin-decoder/, ""),
      },
      "/staging/inventory-core-service": {
        target: "https://inventory-core-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/staging\/inventory-core-service/, ""),
      },
      "/staging/url-shortener": {
        target: "https://url-shortener.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/staging\/url-shortener/, ""),
      },
      "/staging/consumer-authentication-service": {
        target:
          "https://consumer-authentication-service.stage.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/staging\/consumer-authentication-service/, ""),
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
      "/prod/lender-aggregator-proxy-service": {
        target: "https://lender-aggregator-proxy-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/prod\/lender-aggregator-proxy-service/, ""),
      },
      "/prod/otp-service": {
        target: "https://otp-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/otp-service/, ""),
      },
      "/prod/crm-integration-service": {
        target: "https://crm-integration-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/crm-integration-service/, ""),
      },
      "/prod/vin-decoder": {
        target: "https://vin-decoder.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/vin-decoder/, ""),
      },
      "/prod/inventory-core-service": {
        target: "https://inventory-core-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/inventory-core-service/, ""),
      },
      "/prod/url-shortener": {
        target: "https://url-shortener.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/prod\/url-shortener/, ""),
      },
      "/prod/consumer-authentication-service": {
        target: "https://consumer-authentication-service.autoverify.services",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/prod\/consumer-authentication-service/, ""),
      },
    },
  },
});
