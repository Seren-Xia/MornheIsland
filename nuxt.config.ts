// https://nuxt.com/docs/api/configuration/nuxt-config
import { execSync } from "child_process";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
      public: {
        COMMIT_REF:
          process.env.COMMIT_REF ||
          execSync("git rev-parse HEAD").toString().trim() ||
          "未知",
        RUNTIME: process.env.NODE_ENV || "production",
        VERSION: "0.0.1-alpha.0",
        COMMIT_DATE:
          process.env.COMMIT_DATE ||
          execSync("git show -s --format=%ci").toString().trim() ||
          "未知",
      },
    },

  nitro: {
    prerender: {
      failOnError: false
    }
  },

  routeRules: {
    "/spa/**": { ssr: false },
  },

  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:7000/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [tailwindcss()],
  },

  modules: ["@pinia/nuxt", "@element-plus/nuxt"],
})