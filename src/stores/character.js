import { defineStore, mapState, mapStores, mapActions } from 'pinia'
import { VilleVakt } from '../mocks/mockCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'

/* 
	to be used in views 
*/

export const useStore = defineStore('activeCharacter', {
	state: () => {
		const characterHistory = VilleVakt // HÅRDKODAD MOCK
		const currentLevel = characterHistory.metadata.currentLevel
		const characterSheet = flattenCharacter(characterHistory, currentLevel)
		return {
			metadata: characterHistory.metadata,
			sheet: characterSheet,
			history: characterHistory
		}
	},

	actions: {
		addStrain(addedStrain) {
			this.sheet.state.currentStrain.damage += addedStrain.damage
			this.sheet.state.currentStrain.fatigue += addedStrain.fatigue
		}
	},

	getters: {
		getHistory: (state) => state.history,
		getSheet: 	(state) => state.sheet,
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
	}
})

export default {
	computed: {
		...mapStores(useStore),
		...mapState(useStore, [
			'getHistory',
			'getSheet',
			'getAttributes',
			'getCompetence',
			'getTraits',
			'getLevel',
			'getName',
			'getState',
			'getMaxHealth',
			'getHealth',
			'getPower',
			'getCurrentStrain'
		]),
	}
}
