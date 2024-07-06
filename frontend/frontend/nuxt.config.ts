// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@pinia/nuxt"],

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
      ripple: true,
      inputStyle: "filled",
    },
    components: {
      include: "*",
      exclude: ["Editor"],
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: [
    "primevue/resources/themes/lara-light-green/theme.css",
    "~/assets/css/main.css",
    "primeicons/primeicons.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
