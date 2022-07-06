<template>
	<div class="character">Character</div>
	<Traits />
	<LevelLadder />
</template>

<script>
	import Traits from '../components/Traits.vue';
	import LevelLadder from '../components/LevelLadder.vue';

	export default {
		components: {
			Traits,
			LevelLadder
		},
		setup() {
		}
	}
</script>

<style></style>