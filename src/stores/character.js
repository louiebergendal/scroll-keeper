import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { loaderCharacter } from '../mocks/loaderCharacterHistory'
import { flattenCharacter } from '../utilities/characterFlattener'
import { createRefs, updateData } from '../api/firebaseApi'

const noobUid = '687sdasd7asdt78tsadfvs5sd'

export const useCharacterStore = defineStore('character', {
	state: () => {
		const currentLevel = loaderCharacter.metadata.level
		const characterSheet = flattenCharacter(loaderCharacter, currentLevel) 

		return {
			...loaderCharacter,
			sheet: characterSheet,
		}
	},
	actions: {

		// Downstream
		setPath() {
			const characterRefString = this.router.currentRoute.value.fullPath
			console.log("characterRefString: ", characterRefString)
			onValue(createRefs(characterRefString), (snapshot) => {
				const newCharacterState = snapshot.val()
				newCharacterState.metadata.characterRefString = characterRefString
				newCharacterState.metadata.invalidLevels = {}
				const currentLevel = newCharacterState.metadata.level
				const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel)
				this.metadata = newCharacterState.metadata
				this.sheet = newCharacterSheet
				this.history = newCharacterState.history
				this.state = newCharacterState.state
			})
		},

		// Upstream
		updateCharacterField(refString, data) {
			console.log("Updates Database")
			updateData(refString, data)
		},
		submitNewLevelChoice(choiceKey, selectedLevel, bonusType, complexTraitData = undefined) {
			const levelRefString = this.metadata.characterRefString + '/history/' + selectedLevel
			const level = { bonusType: bonusType, choice: choiceKey }
			if (complexTraitData) level.complexPayload = complexTraitData

			const isLvlUp = selectedLevel === this.metadata.level + 1

			if (isLvlUp){
				this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { level: selectedLevel })
			}

			this.updateCharacterField(levelRefString, level)
		}
	},
})