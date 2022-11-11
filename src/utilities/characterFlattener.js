import { allTraits, canChooseTrait } from '../rules/characteristics/traits'
import { attributes, baseValue as attributeBaseValue, canChooseAttribute } from '../rules/characteristics/attributes'
import { baseValue as movementBaseValue } from '../rules/characteristics/secondaryCharacteristics/movement'
import { baseValue as actionPointBaseValue } from '../rules/characteristics/secondaryCharacteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from '../rules/characteristics/competence'
import { baseValue as fateBaseValue } from '../rules/characteristics/fate'
import { contains, findDuplicates } from '../rules/utils'
import { calculateMaxHealthValue, createHealth } from '../rules/characteristics/secondaryCharacteristics/health'
import { calculateCarryingCapacity } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { calculateInitiative } from '../rules/characteristics/secondaryCharacteristics/initiative'
import { calculatePower } from '../rules/characteristics/secondaryCharacteristics/power'
import { calculateMaxActionPoints } from '../rules/characteristics/secondaryCharacteristics/actionPoints'

const flattenCharacter = (databaseCharacter, targetLevel) => {
	let characterTraitList = []

	databaseCharacter.metadata.selectedLevel = targetLevel

	let baseCharacterSheet = {
		metadata: databaseCharacter.metadata,
		state: databaseCharacter.state,
		attributes: {
			battle: attributeBaseValue,
			agility: attributeBaseValue,
			spirit: attributeBaseValue,
			knowledge: attributeBaseValue,
			physique: attributeBaseValue
		},
		traits: [],
		power: {
			offensive: 0,
			defensive: 0
		},
		movement: movementBaseValue,
		carryingCapacity: carryingCapacityBaseValue,
		maxHealthValue: 0,
		health: {},
		fate: fateBaseValue,
		competence: competenceBaseValue,
		initiative: {},
		actionPoints: actionPointBaseValue
	}

	// one-index because level starts at one
	for (let levelIndex = 1; levelIndex <= targetLevel; levelIndex++) {
		if (databaseCharacter.history[levelIndex]=== undefined) { break }
		const currentLevel = databaseCharacter.history[levelIndex]
		const bonusType = currentLevel.bonusType
		const chosenBonus = currentLevel.choice
		const traitList = allTraits()

		// COMPETENCE
		if (bonusType === 'competence')
			baseCharacterSheet.competence++

		// FATE
		if (bonusType === 'fate')
			baseCharacterSheet.fate += 3

		// ATTRIBUTES
		for (const attribute in attributes) {
			if (attribute === chosenBonus){
				baseCharacterSheet.attributes[chosenBonus]++
			}
		}

		// TRAITS
		for (const traitKey in traitList) {

			if (traitKey === chosenBonus) {
				let invalidComplexTraitLevel = []

				// complex payload
				if (currentLevel.complexPayload) {
					const levelComplexPayload = currentLevel.complexPayload

					for (const choiceCategory in levelComplexPayload) { // ex. 'people'
						const skillChoicesList = levelComplexPayload[choiceCategory].choices

						for (const choiceGroup in skillChoicesList) { // ex. 1

							for (const choiceKey in skillChoicesList[choiceGroup]) { // ex. 'basicKnowledgeDavand'
								const skillChoiceKey = skillChoicesList[choiceGroup][choiceKey]

								// if any of the traits in the complexPayload is already owned, traitKey is invalid
								if (contains(skillChoiceKey, characterTraitList)) invalidComplexTraitLevel.push(traitKey)

								if (!contains(skillChoiceKey, characterTraitList) && skillChoiceKey.length > 0) {

									if (bonusType === 'talent' && traitKey !== 'background' && !canChooseTrait(
										skillChoiceKey,
										characterTraitList, 
										baseCharacterSheet.attributes, 
										baseCharacterSheet.metadata.isChosenByFate, 
										levelIndex
									)) {
										// add invalid skill choices to invalidLevelObject
										invalidComplexTraitLevel.push(skillChoiceKey)
									}
									characterTraitList.push(skillChoiceKey)
								}
							}
						}
					}

					// any invalid skill choices?
					if (invalidComplexTraitLevel.length > 0) invalidComplexTraitLevel.push(traitKey)

					// validate complex talent
					if ((!contains(traitKey, invalidComplexTraitLevel)) && !canChooseTrait(
						traitKey,
						characterTraitList, 
						baseCharacterSheet.attributes, 
						baseCharacterSheet.metadata.isChosenByFate, 
						targetLevel
					)) { 
						invalidComplexTraitLevel.push(traitKey)
					}

					// if there are any errors, push to invalidlist
					if (invalidComplexTraitLevel.length > 0) {
						baseCharacterSheet.metadata.invalidLevels[levelIndex] = invalidComplexTraitLevel
					}
				}

				characterTraitList.push(traitKey)
			}
		}

		// VALIDATE NON-COMPLEX TALENTS
		if (bonusType === 'talent' && !currentLevel.complexPayload && !canChooseTrait(
			chosenBonus, 
			characterTraitList, 
			baseCharacterSheet.attributes, 
			baseCharacterSheet.metadata.isChosenByFate, 
			targetLevel
		)) {
			// add invalid talent choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}

		// VALIDATE SKILLS
		if (bonusType === 'skill' && !canChooseTrait(
			chosenBonus, 
			characterTraitList, 
			baseCharacterSheet.attributes, 
			baseCharacterSheet.metadata.isChosenByFate, 
			targetLevel
		)) {
			// add invalid skill choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}

		// VALIDATE ATTRIBUTES
		if (bonusType === 'attribute' && !canChooseAttribute(baseCharacterSheet.attributes[chosenBonus] - 1, levelIndex)) {
			// add invalid attribute choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}


		// * * * SECONDARY CHARACTERISTICS * * * //

		// POWER
		baseCharacterSheet.power = calculatePower(characterTraitList)

		// MAX HEALTH VALUE
		baseCharacterSheet.maxHealthValue = calculateMaxHealthValue(
			baseCharacterSheet.attributes.physique,
			characterTraitList
		) // maxHealthValue baseValue is set here

		// HEALTH ( relies on maxHealthValue being set )
		baseCharacterSheet.health = createHealth(
			baseCharacterSheet.maxHealthValue,
			baseCharacterSheet.state.currentStrain
		)

		// CARRYING CAPACITY
		baseCharacterSheet.carryingCapacity = calculateCarryingCapacity(
			baseCharacterSheet.attributes.physique,
			characterTraitList
		)

		// INITIATIVE
		baseCharacterSheet.initiative = calculateInitiative(
			baseCharacterSheet.attributes.battle,
			characterTraitList,
			baseCharacterSheet.metadata.level
		)

		// ACTION POINTS
		baseCharacterSheet.actionPoints = calculateMaxActionPoints(characterTraitList)
	}

	const flattenedCharacter = {
		...baseCharacterSheet,
		traits: characterTraitList
	}
	return flattenedCharacter
}

export {
	flattenCharacter
}