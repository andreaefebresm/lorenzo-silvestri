import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-27',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
  ],

  image: {
    contentful: {
      baseURL: 'https://images.ctfassets.net',
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'it', language: 'it-IT', name: 'Italiano' },
    ],
  },

  fonts: {
    families: [
      { name: 'IBM Plex Sans', provider: 'google', weights: [300, 400, 500, 600] },
    ],
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      contentful: {
        spaceId: '',
        deliveryToken: '',
        previewToken: '',
        environment: 'master',
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})