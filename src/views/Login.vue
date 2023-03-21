<template>
  <div class="main-bg padding-top-medium padding-left-medium padding-right-medium">
		<div class='inner-bg padding-top-small padding-left-small padding-right-small'>
      <div class="flex faux-modal-container -dir-col">
        <h2 class="align-center margin-top-small">Login</h2>
        <div class="card dark padding-small faux-modal">
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
          <p class="align-center"><button @click="signIn">Submit</button></p>
        </div>
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Sidebar from '../components/sidebar/Sidebar.vue'

export default {
  components: {
		Sidebar
	},
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
