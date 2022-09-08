// implementera i någon stabil vy

import { defineStore } from 'pinia'
import {
	ref as fbRef,
	getDatabase,
	onValue,
} from 'firebase/database'
import { blankCharacter } from '../mocks/blankCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'

export const useCharacterStore = defineStore('character', {
	state: () => {

		let initialCharacter = blankCharacter // blankCharacter if no charUID, else charUID
		let selectedCharacter = undefined
		let characterHistory = {}

		if (selectedCharacter) { 
			characterHistory = selectedCharacter
		} else { 
			characterHistory = initialCharacter
		}

		console.log('characterHistory: ', characterHistory);


		const currentLevel = characterHistory.metadata.currentLevel
		const characterSheet = flattenCharacter(characterHistory, currentLevel)
		return {
			metadata: blankCharacter.metadata,
			sheet: characterSheet,
			history: blankCharacter
		}
	},
	getters: {
		getHistory: (state) => state.history,
		getSheet: (state) => state.sheet,
		getLevel: (state) => state.metadata.currentLevel,
		getName: (state) => state.metadata.name,
		getAttributes: (state) => state.sheet.attributes,
		getCompetence: (state) => state.sheet.competence,
		getTraits: (state) => state.sheet.traits,
		getState: (state) => state.sheet.state,
		getMaxHealth: (state) => state.maxHealthValue,
		getHealth: (state) => state.sheet.health,
		getPower: (state) => state.sheet.power,
		getCurrentStrain: (state) => state.sheet.state.currentStrain
	},
	actions: {
		addStrain(addedStrain) {
			this.sheet.state.currentStrain.damage += addedStrain.damage
			this.sheet.state.currentStrain.fatigue += addedStrain.fatigue
		},
		retrieveAndSetDBCharacter(userUid, selectedCharacterUid) {
			const db = getDatabase()
			const refString = 'users/' + userUid + '/characters/' + selectedCharacterUid
			const characterRef = fbRef(db, refString)

			onValue(characterRef, (snapshot) => {
				const dbCharacter = snapshot.val()

				this.history = dbCharacter
				this.sheet = flattenCharacter(dbCharacter, dbCharacter.metadata.currentLevel)
				this.metadata = dbCharacter.metadata
			})
		},
	},
})

/* 
			onValue(characterRef, (snapshot) => {
				const dbCharacter = snapshot.val()
				
				this.history = dbCharacter
				this.sheet = flattenCharacter(dbCharacter, dbCharacter.metadata.currentLevel)
				this.metadata = dbCharacter.metadata
			})
*/