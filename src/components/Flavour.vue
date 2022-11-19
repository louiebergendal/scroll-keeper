<template>
	<div>
		<div>H J Ö N K</div>
		<div>{{characterStore.metadata.avatarUrl}}</div>
		<img :src="characterStore.metadata.avatarUrl" alt="avatar">
		<div class="file-upload">
			<form className='form'>
        		<input type='file' />
        		<button
					@click="uploadAvatar"
					type='submit'
				>
					Ladda Upp
				</button>
      		</form>
		</div>
		<div>
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

			<div class="card margin-small padding-small">
				<h3>Beskrivning:</h3>
				<label for="character-description">
					<textarea
						placeholder="beskriv din karaktär"
						id="character-description"
						v-model="characterDescription"
						@change="changeCharacterDescription"
					></textarea>
				</label>
			</div>

		</div>
	</div>
</template>
<script>
	import { useCharacterStore } from '../stores/character'
	import { uploadAndGetUrl } from '../api/firebaseStorageApi'
	import { ref } from 'vue'

	export default {
		setup() {
			const characterStore = useCharacterStore()
			const characterName = ref(characterStore.metadata.name)
			const characterDescription = ref(characterStore.metadata.description)
			console.log("characterStore: ", characterStore)
			return {
				characterStore,
				characterName,
				characterDescription,
				uploadAndGetUrl
			}
		},
		methods: {
			async uploadAvatar(e) {
				e.preventDefault()

				const characterRefString = this.characterStore.metadata.characterRefString
				let avatarStorageString = '/img/avatar'
				const file = e.target?.form[0]?.files[0]
				const fileExtension = file.name.split('.').pop()

				avatarStorageString = avatarStorageString + '.' + fileExtension

				const metadata = {contentType: file.type}
				const refPath = characterRefString + avatarStorageString
				this.uploadAndGetUrl(refPath, file, metadata, this.characterStore.updateCharacterAvatarUrl)
			},
			renameCharacter(data) {
				this.characterStore.updateCharacterName(data.target.value)
			},
			changeCharacterDescription(data) {
				this.characterStore.updateCharacterDescription(data.target.value)
			}
		}
	}
</script>

<style></style>