<template>
<div class="main-bg padding-medium">
	<h2 class="align-center">Karaktärer</h2>
	<div v-for="(character, key) in charactersVref" :key='key' class="flex card -h-spread medium -hoverable">
		<router-link  v-if='key' class="width-whole padding-tiny padding-bottom-small padding-left-small" :to="{ name: 'Character', params: {
			userUid: userUid,
			characterUid: key
		} }">
			{{character.metadata.name}} ({{character.metadata.level}})
		</router-link>
		<span class="align-right icon-delete" @click="removeCharacter(key)"></span>
	</div>

	<button type="submit" class="margin-top-tiny margin-left-nano" @click="createNewCharacter()">Ny karaktär</button>
</div>
</template>

<script>
	import Character from './Character.vue'
	import { blankCharacter } from '../mocks/blankCharacterHistory'
	import { useRoute } from 'vue-router'
	import { onValue } from 'firebase/database'
	import { createRefs, pushDataToCollection, removeData } from '../api/firebaseApi'
	import { ref as Vref } from 'vue';

	export default {
		components: {
			Character
		},
		setup() {
			const route = useRoute()
			const charactersVref = Vref({})
			const userUid = route.params.userUid

			return {
				charactersVref,
				userUid,
				blankCharacter
			}
		},
		mounted() {
			this.setCharactersListPath(this.userUid)
		},
		methods: {
			setCharactersListPath(userUid) {
				const charactersRefString = 'users/' + userUid + '/characters'

				onValue(createRefs(charactersRefString), (snapshot) => {
					this.charactersVref = snapshot.val()
				})
			},
			removeCharacter(charUid) {
				const characterRefString = 'users/' + this.userUid + '/characters' + '/' + charUid
				removeData(characterRefString)

			},
			createNewCharacter() {
				const charactersRefString = 'users/' + this.userUid + '/characters'
				const newRef = pushDataToCollection(charactersRefString, this.blankCharacter)
				this.$router.push({
					name: 'Character',
					params: {
						userUid: this.userUid,
						characterUid: newRef.key
					}
				})
			}
		}
	}
</script>
