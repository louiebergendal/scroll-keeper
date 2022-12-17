import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { loaderCharacter } from '../mocks/loaderCharacterHistory'
import { flattenCharacter } from '../rules/characterFlattener'
import { createRefs, updateData, removeData } from '../api/firebaseApi'
import { traitFromKey } from '../rules/characteristics/traits'

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
			onValue(
				createRefs(characterRefString), (snapshot) => {
					const newCharacterState = snapshot.val()
					if (newCharacterState !== null) {
						newCharacterState.metadata.characterRefString = characterRefString
						newCharacterState.metadata.invalidLevels = {}
	
						const currentLevel = newCharacterState.metadata.level
						const newCharacterSheet = flattenCharacter(newCharacterState, currentLevel)
						this.metadata = newCharacterState.metadata
						this.sheet = newCharacterSheet
						this.history = newCharacterState.history
						this.state = newCharacterState.state
					}
				}
			)
		},

		// Upstream
		updateCharacterField(refString, data) {
			updateData(refString, data)
		},
		submitNewLevelChoice(choiceKey, selectedLevel, bonusType, complexTraitData = undefined) {
			const levelRefString = this.metadata.characterRefString + '/history/' + selectedLevel
			const level = { bonusType: bonusType, choice: choiceKey }

			if (bonusType === 'talent' && complexTraitData && traitFromKey(choiceKey).complexTrait) {
				level.complexPayload = complexTraitData
			}

			const isLvlUp = selectedLevel === this.metadata.level + 1

			if (isLvlUp){
				this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { level: selectedLevel })
			}

			removeData(levelRefString + '/complexPayload')
			this.updateCharacterField(levelRefString, level)
		},
		updateCharacterAvatarUrl(url) {
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', {avatarUrl: url})
		},
		updateCharacterName(name) {
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { name: name })
		},
		updateCharacterDescription(description) {
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { description: description })
		},
		updatePeopleDescription(peopleDescription) {
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { peopleDescription: peopleDescription })
		},
		updateIsChosenByFate(isChosenByFate) {
			if (isChosenByFate === false) {

				removeData(this.metadata.characterRefString + '/history/1/' + '/complexPayload/chosenByFate')
			}
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { isChosenByFate: isChosenByFate })
		}
	},
})