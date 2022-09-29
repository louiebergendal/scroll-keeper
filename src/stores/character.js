import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { blankCharacter } from '../mocks/blankCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'
import { createRefs, updateData } from '../api/firebaseApi'

const noobUid = '687sdasd7asdt78tsadfvs5sd'

export const useCharacterStore = defineStore('character', {
	state: () => {
		const currentLevel = blankCharacter.metadata.currentLevel
		const characterSheet = flattenCharacter(blankCharacter, currentLevel)
		console.log("blankCharacter: ", blankCharacter)
		console.log("characterSheet: ", characterSheet)
		return {
			...blankCharacter,
			sheet: characterSheet,
		}
	},
	actions: {
		addStrain(addedStrain) {
			this.sheet.state.currentStrain.damage += addedStrain.damage
			this.sheet.state.currentStrain.fatigue += addedStrain.fatigue
		},
		setCharacterPath(userUid, characterUid = noobUid) {
			const characterRefString = 'users/' + userUid + '/characters/' + characterUid
			onValue(createRefs(characterRefString), (snapshot) => {
				const newCharacterState = snapshot.val()
				newCharacterState.metadata.characterRefString = characterRefString

				if (newCharacterState) {
					const currentLevel = newCharacterState.metadata.currentLevel
					const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel) // add new Strain here
					console.log("newCharacterState: ", newCharacterState)
					console.log("this in character.js: ", this)
					console.log("newCharacterState.history: ", newCharacterState.history)

					this.metadata = newCharacterState.metadata
					this.sheet = newCharacterSheet
					this.history = newCharacterState.history
					console.log("this.history after setting: ", this.history)
				}
			})
		},
		updateCharacterField(refString, data) {
			updateData(refString, data)
		}

	},
})