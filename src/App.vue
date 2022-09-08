<template>
  <nav class="main-nav">
    <router-link class="margin-small" :to="{ name: 'Vendic Dictionary' }">
      Vendic Dictionary
    </router-link>
    |
    <router-link v-if="userUid" class="margin-small" :to="{ name: 'Characters', params: {
      userUid: userUid,
      userDisplayName: userDisplayName
    } }">
      Characters
    </router-link>
    |
    <router-link class="margin-small" :to="{ name: 'Home' }">
      Home
    </router-link>
    |
    <router-link class="margin-small" :to="{ name: 'Profile' }">
      Profile
    </router-link>
    |
    <span v-if="this.isLoggedIn">
      <a class="margin-small" @click="logOut"> Logout </a>
    </span>
    <span v-else>
      <router-link class="margin-small" :to="{ name: 'Register' }">
        Register
      </router-link>
      |
      <router-link class="margin-small" :to="{ name: 'Login' }">
        Login
      </router-link>
    </span>
  </nav>
  <router-view />
</template>

<script>
import { ref } from "vue";
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
    const userUid = ref("");
    const userDisplayName = ref("");

    return {
      router,
      route,
      loginPath,
      registerPath,
      homePath,
      isLoggedIn,
      auth,
      userUid,
      userDisplayName

    };
  },
  beforeMount() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userUid = user.uid;
        this.userDisplayName = user.displayName;
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
          this.router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log("An error occurred: ", error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "./style/themes/_warm.scss";
.main-nav {
  margin-left: 5rem;
}
</style>
