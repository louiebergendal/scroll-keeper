<template>
  <div class=" main-bg profile padding-top-medium align-center">
    <h2>Profile</h2>
    <div>{{userUid}}</div>
  </div>
</template>

<script>
import { getDatabase } from "firebase/database";
import { useRoute } from 'vue-router'

export default {
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
