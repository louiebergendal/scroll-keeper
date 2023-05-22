import { defineStore } from 'pinia'
import { onValue } from 'firebase/database'
import { loaderCharacter } from '../mocks/loaderCharacterHistory'
import { flattenCharacter } from '../rules/characterFlattener'
import { createRefs, updateData, removeData } from '../api/firebaseApi'
import { allTraits as getAllTraits, traitFromKey } from '../rules/characteristics/traits'

import { attributes } from '../rules/characteristics/attributes'
import { containsKey } from '../rules/utils'

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
					// to account for that the code might ignore that it's a string in an object,
					// and only treat it as a string, if it's the only thing in the object.
					if (typeof choicesList !== 'string') {

						for (const innerChoiceIndex in choicesList) {
							const choice = choicesList[innerChoiceIndex]
							if (!this.allTraits[choice] && !containsKey(choice, Object.keys(attributes))) {
								// add to invalidLevels
								this.handleInvalidChoice(levelIndex, choice)
								choices[innerChoiceIndex][choice] = '' // ? vad gör det här för skillnad ?
							}
						}
					} else {
						if (!this.allTraits[choicesList] && !containsKey(choicesList, Object.keys(attributes))) {
							// add to invalidLevels
							this.handleInvalidChoice(levelIndex, choicesList)
							choices[choiceIndex][choicesList] = '' // ? vad gör det här för skillnad ?
						}
					}
				}
			}
		},
		catchOutdatedLevelKeys(history) {

			// WIP //

			for(const levelIndex in history) {
				const level = history[levelIndex]

				if (level.bonusType === 'attribute'
					&& !attributes[level.choice]
				) {
					// add to invalidLevels
					this.handleInvalidChoice(levelIndex, level.choice)
					level.choice = ''
				}

				if (level.bonusType === 'talent'
					|| level.bonusType === 'skill'
				) {
					const traitChoice = this.allTraits[level.choice]

					if (!traitChoice) {
						// add to invalidLevels
						this.handleInvalidChoice(levelIndex, level.choice)
						level.choice = ''
					}

					if (traitChoice && traitChoice.key !== level.choice) {
						console.log("ERROR: trait object and trait key-property should share name. Trait key-property: ", traitChoice.key);
					}

					if (level.complexPayload) {
						// find and handle outdated traits or attributes in complexPayload
						this.validateComplexPayload(levelIndex, level.complexPayload)

						// see if the background skillsList in rules contains the chosen skills.
						if (level.choice === 'background') {
							for (const choiceCategory in level.complexPayload) {
								const chosenCategory = level.complexPayload[choiceCategory]

								for (const chosenSkillsListIndex in chosenCategory.choices) {
									for (const skillChoiceIndex in chosenCategory.choices[chosenSkillsListIndex]) {
										const skillKeyFromComplexPayload = chosenCategory.choices[chosenSkillsListIndex][skillChoiceIndex]
										//const refString = this.metadata.characterRefString + '/history/1/complexPayload/' + choiceCategory + '/choices/' + chosenSkillsListIndex + '/' + skillChoiceIndex
						
										// console.logga ifall skill.key har annat namn än skill-objektet

										if (
											traitChoice.complexTrait[choiceCategory + 's']?.[choiceCategory + 's'][chosenCategory.key]
											&& !containsKey(skillKeyFromComplexPayload, traitChoice.complexTrait[choiceCategory + 's'][choiceCategory + 's'][chosenCategory.key].skillsLists[chosenSkillsListIndex].list)
										) {
											this.handleInvalidChoice(levelIndex, skillKeyFromComplexPayload)
											level.complexPayload[choiceCategory].choices[chosenSkillsListIndex][skillChoiceIndex] = ''
										}
									}
								}
							}
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
			this.updateCharacterField(this.metadata.characterRefString + '/metadata/', { avatarUrl: url })
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