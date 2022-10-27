<template>
	<div v-if="characterStore.metadata.name !== 'Loader'">
		<div class='character padding-medium'>
			<div class="align-center bold">
				<p>{{characterStore.metadata.name}} ( {{characterStore.metadata.level}} )</p>
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
		<LevelLadder :characterStore="characterStore" />
	</div>
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
			const characterStore = useCharacterStore()
			return {
				characterStore, 
				route
			}
		},
		beforeMount() {
			this.characterStore.setPath()
		}
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

