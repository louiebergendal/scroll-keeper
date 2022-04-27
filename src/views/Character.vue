<template>
  <div class="character">Character</div>
	{{ this.$route.params.userUid }}
	<Traits />
</template>

<script>
import Traits from '../components/Traits.vue';
export default {
  components: {
    Traits
  }
}
</script>

<style></style>
