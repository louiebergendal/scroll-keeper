<template>
	<div class="character padding-medium">
		<Attributes />
		<div class="padding-bottom-medium"></div>
		<Health />
		<LevelLadder />
	</div>
</template>

<script>
	import Attributes from '../components/Attributes.vue';
	import Health from '../components/Health.vue';
	//import LevelLadder from '../components/LevelLadder.vue';

	export default {
		components: {
			Attributes,
			Health
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