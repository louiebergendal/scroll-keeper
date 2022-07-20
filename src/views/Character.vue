<template>
	<div class="character">Character</div>
	<Attributes />
	<LevelLadder />
</template>

<script>
	import Attributes from '../components/Attributes.vue';
	//import LevelLadder from '../components/LevelLadder.vue';

	export default {
		components: {
			Attributes
			//LevelLadder
		},
		setup() {
		}
	}
</script>

<style>
	.character {
		position: relative;
	}
</style>