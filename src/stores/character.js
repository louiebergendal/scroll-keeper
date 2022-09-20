// implementera i någon stabil vy

import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { blankCharacter } from '../mocks/blankCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'
import { createRefs, updateData } from '../api/firebaseApi'

export const useCharacterStore = defineStore('character', {
	state: () => {
		const currentLevel = blankCharacter.metadata.currentLevel
		const characterSheet = flattenCharacter(blankCharacter, currentLevel)

		return {
			metadata: blankCharacter.metadata,
			sheet: characterSheet,
			history: blankCharacter
		}
	},
	actions: {
		addStrain(addedStrain) {
			
			this.sheet.state.currentStrain.damage += addedStrain.damage
			this.sheet.state.currentStrain.fatigue += addedStrain.fatigue

		},
		setCharacterPath(userUid, characterUid) {
			const characterRefString = 'users/' + userUid + '/characters/' + characterUid

			onValue(createRefs(characterRefString), (snapshot) => {

				const newCharacterState = snapshot.val()
				//console.log('newCharacterState 1: ', newCharacterState);
				newCharacterState.metadata.characterRefString = characterRefString
				//console.log('newCharacterState 2: ', newCharacterState);

				if (newCharacterState) {
					const currentLevel = newCharacterState.metadata.currentLevel
					const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel) // add new Strain here
					this.metadata = newCharacterState.metadata
					this.sheet = newCharacterSheet
					this.history = newCharacterState	
				}
			})
		},
		updateCharacterField(refString, data) {
			updateData(refString, data)
		}

	},
})