
<template>
    <nav>
      <router-link class="margin-small" to="/"> Home </router-link> |
      <router-link class="margin-small" to="/profile"> Profile </router-link> |
      <span v-if="this.isLoggedIn">
        <a class="margin-small" @click="logOut"> Logout </a>
      </span>
      <span v-else>
        <router-link class="margin-small" to="/register"> Register </router-link> |
        <router-link class="margin-small" to="/login"> Login </router-link>
      </span>
    </nav>
    <router-view />
</template>

<script>
import { ref, onBeforeMount, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loginPath = "/login";
    const registerPath = "/register";
    const homePath = "/";
    const isLoggedIn = ref(true);
    const auth = getAuth();
    return {
      router,
      route,
      loginPath,
      registerPath,
      homePath,
      isLoggedIn,
      auth
    }
  },
  beforeMount() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.isLoggedIn = true;
        console.log("logged in as: ", user.uid, user.email);
      } else {
        this.isLoggedIn = false;
        this.router.replace(this.loginPath);
      }
    });
  },
  methods: {
    logOut() {
      signOut(this.auth)
        .then(() => {
          console.log("Successfully logged out");
          this.router.push("/");
        })
        .catch((error) => {
          console.log("An error occurred: ", error);
        });
    }
  }
};
</script>

<style lang="scss">
  @import "./style/themes/_warm.scss";
</style>
