<template>
	<div class="character padding-medium">
		<Attributes />
		<div class="padding-bottom-tiny"></div>
		<Competence />
		<div class="padding-bottom-medium"></div>
		<Health />
		<div class="padding-bottom-medium"></div>
		<Skills />
		<div class="padding-bottom-medium"></div>
		<Talents />

		<LevelLadder />
	</div>
</template>

<script>
	import Attributes from '../components/Attributes.vue'
	import Health from '../components/Health.vue'
	import Skills from '../components/Skills.vue'
	import Talents from '../components/Talents.vue'
	import Competence from '../components/Competence.vue'
	//import LevelLadder from '../components/LevelLadder.vue';

	export default {
		components: {
			Attributes,
			Health,
			Skills,
			Talents,
			Competence
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