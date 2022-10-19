<template>
	<div class='character padding-medium'>
		<div class="align-center bold">
			<p>{{character.metadata.name}} ( {{character.metadata.level}} )</p>
			{{character.metadata.invalidLevels}}
		</div>
		<div class='width-whole flex'>
			<span class='wrapper flex width-whole'>
				<Attributes />
				<div class='padding-bottom-medium'></div>
				<Competence />
				<div class='padding-bottom-medium'></div>
			</span>
			<span class='wrapper flex -v-center width-half margin-left-medium'>
				<Talents />
				<div class='padding-bottom-medium'></div>
				<Skills />
			</span>
		</div>
		<Biography />
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
	import { useCharacterStore } from '../stores/character'
	import { useRoute } from 'vue-router'
	import Biography from '../components/Biography.vue'
	import { ref } from 'vue'

	export default {
		components: {
			Attributes,
			Health,
			Skills,
			Talents,
			Competence,
			LevelLadder,
			Biography
		},
		setup() {
			const route = useRoute()
			const character = useCharacterStore()
			character.setCharacterPath(route.params.userUid, route.params.characterUid)

			return {
				character, 
				route
			}
		},
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

