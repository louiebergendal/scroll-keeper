<template>
    <div class="fancy width-whole padding-small position-relative">
		<div class="corner -inner-top-left"></div>
		<div class="corner -inner-bottom-right"></div>
		<div class="corner -top-middle-small-2"></div>
		<div class="corner -right-middle-small"></div>
        <div
			class="avatar position-relative"
			:style="{ backgroundImage: 'url(' + avatarUrl + ')' }"
		>
			<div class="corner img -img-top-right"></div>
			<div class="corner img -img-top-left"></div>
			<div class="corner img -img-bottom-right"></div>
			<div class="corner img -img-bottom-left"></div>
			<img class="transparent" :src="avatarUrl" alt="avatar">
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
			const avatarUrl = ref(characterStore.metadata.avatarUrl || '/img/default-avatar.png')

			return {
                characterStore,
				avatarUrl
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
				this.avatarUrl = state.metadata.avatarUrl || '/img/default-avatar.png'
			})
		}
	}
</script>

<style>
	.transparent {
		opacity: 0;
		width:100%;
	}
</style>