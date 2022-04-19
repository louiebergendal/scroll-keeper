<template>
  <div class="faux-modal-container">
    <div class="card dark padding-small faux-modal">
      <h2>Login</h2>
      <form>
        <p>
          <input
            type="text"
            placeholder="Email"
            class="margin-bottom-small"
            v-model="email"
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            class="margin-bottom-small"
            v-model="password"
          />
        </p>
      </form>
      <p class="align-right"><button @click="signIn">Submit</button></p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    return {
      email,
      password,
      router,
    };
  },
  methods: {
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user: ", user);
          this.router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
  },
};
</script>
