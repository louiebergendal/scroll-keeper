<template>
    <div class="fancy width-whole padding-small position-relative">
		<div class="corner -inner-top-left"></div>
		<div class="corner -inner-bottom-right"></div>
		<div class="corner -top-middle-small"></div>
		<div class="corner -right-middle-small"></div>
        <div
			class="avatar"
			:style="{ backgroundImage: 'url(' + characterStore.metadata.avatarUrl + ')' }">
			<img class="transparent" :src="characterStore.metadata.avatarUrl" alt="avatar">
		</div>
    </div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { ref } from 'vue'

	export default {
		setup() {
			const characterStore = useCharacterStore()
			const characterName = ref(characterStore.metadata.name)

			return {
                characterStore
			}
		},
		methods: {

		}
	}
</script>

<style>
	.transparent {
		opacity: 0;
		width:100%;
	}
</style>