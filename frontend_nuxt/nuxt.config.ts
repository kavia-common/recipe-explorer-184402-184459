/**
 * Nuxt configuration enabling public runtime config for API base and
 * relaxed CORS headers for demo preview.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // Read from env NUXT_PUBLIC_API_BASE if present. If empty/undefined, composable falls back to mock.
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
