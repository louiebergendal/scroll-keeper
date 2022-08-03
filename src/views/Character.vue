<template>
	<div class="character padding-medium">
		<Attributes />
		<div class="padding-bottom-medium"></div>
		<Health />
		<Skills />
		<Talents />

		<LevelLadder />
	</div>
</template>

<script>
	import Attributes from '../components/Attributes.vue'
	import Health from '../components/Health.vue'
	import Skills from '../components/Skills.vue'
	import Talents from '../components/Talents.vue'
	//import LevelLadder from '../components/LevelLadder.vue';

	export default {
		components: {
			Attributes,
			Health,
			Skills,
			Talents
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