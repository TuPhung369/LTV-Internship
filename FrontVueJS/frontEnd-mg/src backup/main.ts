
import mitt from 'mitt'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/app.scss'
import './assets/css/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import ScriptX from 'vue-scriptx'
import Ads from 'vue-google-adsense'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const emitter = mitt()
const app = createApp(App)

const createNewApp = () => {
  app.provide('eventHub', emitter)
  app.use(router)
  app.use(createPinia())
  app.use(ScriptX)
  app.use(Ads.Adsense)
  app.use(Ads.InArticleAdsense)
  app.use(Ads.InFeedAdsense)
  app.config.globalProperties.emitter = emitter
  app.mount('#app')
}
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const initData = async () => {
  return Promise.resolve()
}

const initialize = async () => {
  emitter.on('initialized', createNewApp)
  return initData()
}

initialize().then(() => {
  emitter.emit('initialized')
})
