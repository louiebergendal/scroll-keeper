<template>
<div class="flex levels padding-large">

	<div class="flex card dark padding-small width-whole margin-right-medium -dir-col">
		<div class="margin-bottom-small">
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

		<div>
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

		<div v-if="characterStore.history[1].complexPayload">
			{{characterStore.history[1].complexPayload['people'].key}}
			<label for="people-description">
				<textarea
					placeholder="stamm, region etc."
					id="people-description"
					v-model="peopleDescription"
					@change="changePeopleDescription"
				></textarea>
			</label>
		</div>

	</div>

	<div class="flex card dark padding-small width-half -dir-col">
		<img class="avatar-preview" :src="characterStore.metadata.avatarUrl" alt="avatar">
		<div class="file-upload align-center">
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
	</div>

</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { uploadAndGetUrl } from '../../api/firebaseStorageApi'
	import { ref } from 'vue'

	export default {
		setup() {
			const characterStore = useCharacterStore()
			const characterName = ref(characterStore.metadata.name)
			const characterDescription = ref(characterStore.metadata.description)
			const peopleDescription = ref(characterStore.metadata.peopleDescription)

			return {
				characterStore,
				characterName,
				characterDescription,
				peopleDescription,
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
			},
			changePeopleDescription(data) {
				this.characterStore.updatePeopleDescription(data.target.value)
			}
		}
	}
</script>

<style>
	.avatar-preview {
		width: 100%;
	}
	input[type="file"] {
    	display: none;
	}
	.file-upload {
		display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
	}

</style>