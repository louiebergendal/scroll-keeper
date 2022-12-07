<template>
  <div class="main-bg padding-top-medium padding-left-medium padding-right-medium">
		<div class='inner-bg padding-top-small padding-left-small padding-right-small'>
      <h2 class="align-center margin-top-small">Profile</h2>
      <div class="width-whole align-center">
        <div class="card align-center width-half padding-small" v-if="userUid">{{userUid}}</div>
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import { getDatabase } from "firebase/database";
import { useRoute } from 'vue-router'
import Sidebar from '../components/sidebar/Sidebar.vue'

export default {
  components: {
		Sidebar
	},
  setup() {
    const route = useRoute()
    const db = getDatabase()
    const userUid = route.params.userUid

    return {
      db,
      userUid
    };
  },
  methods: {},
};
</script>

<style></style>
