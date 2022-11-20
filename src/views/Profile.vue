<template>
  <div class="main-bg padding-top-medium padding-left-medium padding-right-medium">
		<div class='inner-bg padding-top-small padding-left-small padding-right-small'>
      <h2>Profile</h2>
      <div>{{userUid}}</div>
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
