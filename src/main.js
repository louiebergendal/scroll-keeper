import { createApp, markRaw } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import router from "./router"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./config"
import Tab from './components/generic/tabs/Tab.vue'
import Tabs from './components/generic/tabs/Tabs.vue'
import TraitLevelTraitsGroup from './components/levelChoices/traitLevel/TraitLevelTraitsGroup.vue'
import TraitLevelTraitCard from './components/levelChoices/traitLevel/TraitLevelTraitCard.vue'

initializeApp(firebaseConfig)
const pinia = createPinia()
const app = createApp(App)
  .component('tabs', Tabs)
  .component('tab', Tab)
  .component('TraitLevelTraitsGroup', TraitLevelTraitsGroup)
  .component('TraitLevelTraitCard', TraitLevelTraitCard)
  
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia).use(router).mount("#app")