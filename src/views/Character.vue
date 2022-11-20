<template>
	<div class="main-bg padding-top-medium padding-left-medium padding-right-medium" v-if="characterStore.metadata.name !== 'Loader'">
		<div class='inner-bg padding-top-small padding-left-small padding-right-small'>
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
					<secondary-characteristics />
					<div class='padding-bottom-medium'></div>

				</div>
				<div class="width-half margin-left-medium">
					<Talents />
					<div class='padding-bottom-medium'></div>
					<Skills />
				</div>
				<div class='wrapper flex -v-center width-half margin-left-medium'>
					<Avatar />
					<div class='padding-bottom-medium'></div>
					<Biography />
				</div>
			</div>
			<Health />

		</div>
		<Sidebar :characterStore="characterStore" />
	</div>
</template>

<script>
	import Attributes from '../components/Attributes.vue'
	import Avatar from '../components/Avatar.vue'
	import Health from '../components/Health.vue'
	import Skills from '../components/Skills.vue'
	import Talents from '../components/Talents.vue'
	import Competence from '../components/Competence.vue'
	import SecondaryCharacteristics from '../components/SecondaryCharacteristics.vue'
	import Biography from '../components/Biography.vue'
	import Sidebar from '../components/sidebar/Sidebar.vue'
	import { useCharacterStore } from '../stores/character'
	import { useRoute } from 'vue-router'


	export default {
		components: {
			Attributes,
			Avatar,
			Health,
			Skills,
			Talents,
			Competence,
			SecondaryCharacteristics,
			Biography,
			Sidebar,
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
