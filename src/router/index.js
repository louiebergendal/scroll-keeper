import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

// Add routes here
// reach them anywhere with
// <router-link :to="{name: '[NAME]'}">NAME</router-link>

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  // Hard coded as there is just one conlang at the moment
  {
    path: "/dictionaries/vendi",
    name: "Vendic Dictionary",
    component: () => import("../views/Dictionary.vue"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

export default router;
