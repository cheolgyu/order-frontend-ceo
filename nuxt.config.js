//import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
const envPath = `./.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({ path: envPath })
import pkg from "./package";

export default {
  manifest: {
    background_color: "purple",
    description: "Shows random fox pictures. Hey, at least it isn't cats.",
    display: "fullscreen",

    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
    start_url: "/index",
  },

  mode: "spa",
  env: {
    // API_URL: process.env.VUE_APP_API_URL
    VUE_APP_WS_URL: process.env.VUE_APP_WS_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/i18n.js",
    "@/plugins/vuelidate.js",
    "@/plugins/axios.js",
    "@/plugins/vuedraggable.js",
    {
      src: '~/plugins/firebase.js',
      ssr: false
    }
  ],

  axios: {
    baseURL: process.env.VUE_APP_API_URL
    // prefix: '/api'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    '@nuxtjs/dotenv'
  ],
  dotenv: {
    filename: envPath
  },
  // Doc: https://github.com/nuxt-community/vuetify-module
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    optionsPath: "./vuetify.options.js"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
*/
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      /*
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
*/
    }
  }
};
