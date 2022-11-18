import { createApp, markRaw } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import router from "./router"
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config"

initializeApp(firebaseConfig)
const pinia = createPinia()
const app = createApp(App)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia).use(router).mount("#app")