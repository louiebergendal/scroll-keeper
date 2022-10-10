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

		return {
			...blankCharacter,
			sheet: characterSheet,
		}
	},
	actions: {
		setCharacterPath(userUid, characterUid = noobUid) {
			const characterRefString = 'users/' + userUid + '/characters/' + characterUid

			onValue(createRefs(characterRefString), (snapshot) => {
				const newCharacterState = snapshot.val()
				newCharacterState.metadata.characterRefString = characterRefString

				if (newCharacterState) {
					const currentLevel = newCharacterState.metadata.currentLevel
					const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel)
					this.metadata = newCharacterState.metadata
					this.sheet = newCharacterSheet
					this.history = newCharacterState.history
					this.state = newCharacterState.state
				}
			})
		},
		updateCharacterField(refString, data) {
			updateData(refString, data)
		},
		submitNewLevelChoice(choiceKey, selectedLevel, bonusType) {
			console.log('bonusType === fate', bonusType === 'fate');

			if (bonusType === 'fate') {
				console.log('choiceKey: ', choiceKey);
				console.log('selectedLevel: ', selectedLevel);
				console.log('bonusType: ', bonusType);
			}



			const levelRefString = this.metadata.characterRefString + '/history/' + selectedLevel
			const level = { bonusType: bonusType, choice: choiceKey }
			this.updateCharacterField(levelRefString, level)
			const isLvlUp = selectedLevel >= this.metadata.currentLevel

			if (isLvlUp)
				this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { currentLevel: selectedLevel })

		}
	},
})