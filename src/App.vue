<template>
  <nav class="main-nav">
    <router-link class="logo" @click="close($event)"  :to="{ name: 'Home' }"></router-link>
    <!--<router-link class="margin-small" :to="{ name: 'Vendic Dictionary' }">
      Vendic Dictionary
    </router-link>
    |
    -->
      <div
        :class="{ 'closed' : isClosed }"
        class="menu-trigger-wrapper"
        @click="toggleFoldOut($event)"
      >
        <div class="foldout-menu-trigger">
        </div>
      </div>
    <div
      :class="{ 'closed' : isClosed }"
      class="foldout-menu"
    >
      <router-link v-if="userUid" @click="toggleFoldOut($event)" class="menu-item" :to="{ name: 'Characters', params: {
        userUid: userUid,
        userDisplayName: userDisplayName
      } }">
        Characters
      </router-link>
      <router-link class="menu-item" @click="toggleFoldOut($event)" :to="{ name: 'Home' }">
        Home
      </router-link>
      <router-link class="menu-item" @click="toggleFoldOut($event)" :to="{ name: 'Profile', params: {
        userUid: userUid,
        } }">
        Profile
      </router-link>
      <a v-if="this.isLoggedIn" class="menu-item padding-bottom-large" @click="logOut"> Logout </a>
      <div v-else>
        <router-link class="menu-item" @click="toggleFoldOut($event)" :to="{ name: 'Register' }">
          Register
        </router-link>
        <router-link class="menu-item" @click="toggleFoldOut($event)" :to="{ name: 'Login' }">
          Login
        </router-link>
      </div>
    </div>
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

    const isClosed = ref(true);

    return {
      router,
      route,
      loginPath,
      registerPath,
      homePath,
      isLoggedIn,
      auth,
      userUid,
      userDisplayName,
      isClosed
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
    toggleFoldOut(_event) {
      this.isClosed = !this.isClosed
    },
    close(_event) {
      this.isClosed = true
    },
    logOut() {
      this.toggleFoldOut();
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

</style>
