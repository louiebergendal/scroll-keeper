// implementera i någon stabil vy

import { defineStore } from 'pinia'
import {
	ref as fbRef,
	getDatabase,
	onValue,
} from 'firebase/database'
import { blankCharacter } from '../mocks/blankCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'
import { createRefs } from '../api/firebaseApi'

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
			const refString = 'users/' + userUid + '/characters/' + characterUid

			onValue(createRefs(refString), (snapshot) => {
				const newCharacterState = snapshot.val()
				const currentLevel = newCharacterState.metadata.currentLevel
				const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel)		
				this.metadata = newCharacterState.metadata
				this.sheet = newCharacterSheet
				this.history = newCharacterState
			})
		},
	},
})