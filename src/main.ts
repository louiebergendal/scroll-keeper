import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNNKsfm5XvoUOuCdAxhx38IjGW2_wIe64",
  authDomain: "scroll-keeper.firebaseapp.com",
  databaseURL:
    "https://scroll-keeper-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "scroll-keeper",
  storageBucket: "scroll-keeper.appspot.com",
  messagingSenderId: "635232477486",
  appId: "1:635232477486:web:f0d570f944dd58a4d49abf",
};
initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
