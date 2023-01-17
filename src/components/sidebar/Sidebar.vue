<template>
	<div
		class="slideInLeft, flex, sidebar"
		:class="{ closed: isClosed}"
	>
		<div v-if="isSelected === 'level-ladder'">
			<LevelLadder />
		</div>
		<div v-if="isSelected === 'biography'">
			<Flavour />
		</div>
		<div class="drawer-handle-wrapper">
			<div
				:class="{
					'selected': isSelected === 'level-ladder',
					'disabled': !hasCharacter 
				}"
				class="icon -level-ladder"
				@click="hasCharacter ? toggleOrShow('level-ladder') : () => {}" >
			</div>
			<div
				:class="{
					'selected': isSelected === 'biography',
					'disabled': !hasCharacter }"
				class="icon -biography"
				@click="hasCharacter ? toggleOrShow('biography') : () => {}" >
			</div>
			<div
				class="drawer-handle"
				@click="toggleFoldOut">
			</div>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../stores/character'
	import LevelLadder from './LevelLadder.vue'
	import Flavour from './Flavour.vue'

	export default {
		components: {
			LevelLadder,
			Flavour
		},
		setup(props) {
			const characterStore = useCharacterStore()
			const isClosed = ref(true)
			const isSelected = ref('')
			const hasCharacter = characterStore ? true : false

			return {
				characterStore,
				isClosed,
				isSelected,
				hasCharacter
			}
		},
		methods: {
			toggleFoldOut(_event) {
				if (this.isClosed && !this.isSelected) return
				this.isClosed = !this.isClosed
			},
			openFoldOutAndSelect(moduleKey) {
				this.isClosed = false
				this.isSelected = moduleKey
			},
			toggleOrShow(moduleKey) {
				if (this.isSelected === moduleKey) {
					this.isClosed = true
					this.isSelected = ''
					return
				}
				this.openFoldOutAndSelect(moduleKey)
			},
		}
	}
</script>

<style>
</style>
