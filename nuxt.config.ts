import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    buildAssetsDir: 'assets',
  },

  ssr: true,
  target: "universal",

  head: {
    titleTemplate: "LK",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'nuxt3-vuex-module',
    'nuxt-socket-io',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  io: {
    sockets: [{
      name: 'main',
      // url: 'http://localhost:3001',
      url: 'http://158.160.142.248',
      default: true,
    }]
  }
})
