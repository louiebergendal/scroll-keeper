import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { loaderCharacter } from '../mocks/loaderCharacterHistory'
import { flattenCharacter } from '../rules/characterFlattener'
import { createRefs, updateData, removeData } from '../api/firebaseApi'
import { allTraits as getAllTraits, traitFromKey } from '../rules/characteristics/traits'

import { attributes } from '../rules/characteristics/attributes'

export const useCharacterStore = defineStore('character', {
	state: () => {
		const currentLevel = loaderCharacter.metadata.level
		const characterSheet = flattenCharacter(loaderCharacter, currentLevel)
		const allTraits = getAllTraits()

		return {
			...loaderCharacter,
			sheet: characterSheet,
			allTraits
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
					this.catchOutdatedLevelKeys(this.history)
				}
			)
		},
		handleInvalidChoice(levelIndex, choice) {
			this.metadata.invalidLevels = {
				...this.metadata.invalidLevels,
				[levelIndex]: ['invalidKey', choice]
			}
		},
		validateComplexPayload(levelIndex, complexPayload) {
			for (const complexTraitCategory in complexPayload) {
				const choices = complexPayload[complexTraitCategory].choices

				for (const choiceIndex in choices) {
					const choicesList = choices[choiceIndex]

					for (const choiceIndex in choicesList) {
						const choice = choicesList[choiceIndex]

						if (!this.allTraits[choice]) {
							// add to invalidLevels
							this.handleInvalidChoice(levelIndex, choice)
							choices[choiceIndex][choice] = ''
						}
					}

				}
			}
		},
		catchOutdatedLevelKeys(history) {
			for(const levelIndex in history) {
				const level = history[levelIndex]
				
				if (level.bonusType === 'attribute'
					&& !attributes[level.choice]
				) {
					this.handleInvalidChoice(levelIndex, level.choice)
					level.choice = ''
				}

				if (level.bonusType === 'skill'
				 	&& !this.allTraits[level.choice]
				) {
					this.handleInvalidChoice(levelIndex, level.choice)
					level.choice = ''
				}

				if (level.bonusType === 'talent') {
					if (!this.allTraits[level.choice]) {
						this.handleInvalidChoice(levelIndex, level.choice)
						level.choice = ''
					}
					if (level.complexPayload) {

						// add to invalidLevels if complexPayload is invalid
						this.validateComplexPayload(levelIndex, level.complexPayload)

						/* target */
						const chosenTrait = traitFromKey(level.choice)
						const complexTrait = chosenTrait.complexTrait

						for (const choiceCategory in complexTrait) {
							//console.log('choiceCategory: ', complexTrait[choiceCategory]);
						}
					}

				}
				
			}
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