<template>
  <div class="profile">Profile</div>
</template>

<script>
import { getDatabase } from "firebase/database";

export default {
  setup() {
    const db = getDatabase();
    return {
      db,
    };
  },
  methods: {},
};
</script>

<style></style>
