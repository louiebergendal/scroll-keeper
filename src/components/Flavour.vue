<template>
	<div>
		<div>H J Ö N K</div>
		<div class="file-upload">

			<div class="card margin-small padding-small">
				<h3>Namn:</h3>
				<label for="character-name">
					<input 
						type="text"
						id="character-name"
						v-model="characterName"
						@change="renameCharacter"
					>
				</label>
			</div>

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
				characterStore,
				characterName
			}
		},
		methods: {
			renameCharacter(data) {
				this.characterStore.updateCharacterName(data.target.value)
			}
		}
	}
</script>

<style></style>