<template>
	<div class='character padding-medium'>
		<div class='width-whole flex'>
			<span class='wrapper flex width-whole'>
				<Attributes />
				<div class='padding-bottom-medium'></div>
				<Competence />
				<div class='padding-bottom-medium'></div>
			</span>
			<span class='wrapper flex -v-center width-half margin-left-medium'>
				<Skills />
				<div class='padding-bottom-medium'></div>
				<Talents />
			</span>
		</div>
		<Health />
	</div>
	<LevelLadder />
</template>

<script>
	import Attributes from '../components/Attributes.vue'
	import Health from '../components/Health.vue'
	import Skills from '../components/Skills.vue'
	import Talents from '../components/Talents.vue'
	import Competence from '../components/Competence.vue'
	import LevelLadder from '../components/LevelLadder.vue'

	export default {
		components: {
			Attributes,
			Health,
			Skills,
			Talents,
			Competence,
			LevelLadder
		},
		setup() {}
	}
</script>

<style>
	.character {
		position: relative;
		margin-left: 5rem;
	}
	.wrapper {
		flex-direction: column;
	}
</style>

