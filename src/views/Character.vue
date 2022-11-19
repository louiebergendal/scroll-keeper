<template>
	<div class="main-bg padding-top-medium padding-left-medium padding-right-medium" v-if="characterStore.metadata.name !== 'Loader'">
		<div class='character padding-top-small padding-left-small padding-right-small'>
			<div class="corner -top-left"></div>
			<div class="corner -top-right"></div>
			<div class="corner -bottom-left"></div>
			<div class="corner -bottom-right"></div>
			<div class='width-whole flex'>
				<div class='wrapper flex width-whole'>
					<Attributes />
					<div class='padding-bottom-medium'></div>
					<Competence />
					<div class='padding-bottom-medium'></div>
					<Biography />
				</div>
				<span class='wrapper flex -v-center width-half margin-left-medium'>
					<Talents />
					<div class='padding-bottom-medium'></div>
					<Skills />
				</span>
			</div>
			<Health />

		</div>
		<Sidebar :characterStore="characterStore" />
	</div>
</template>

<script>
	import Attributes from '../components/Attributes.vue'
	import Health from '../components/Health.vue'
	import Skills from '../components/Skills.vue'
	import Talents from '../components/Talents.vue'
	import Competence from '../components/Competence.vue'
	import Sidebar from '../components/Sidebar.vue'
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
			Biography,
			Sidebar
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
</style>
