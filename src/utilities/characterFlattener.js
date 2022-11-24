import { allTraits, canChooseTrait } from '../rules/characteristics/traits'
import { attributes, baseValue as attributeBaseValue, canChooseAttribute } from '../rules/characteristics/attributes'
import { baseValue as movementBaseValue } from '../rules/characteristics/secondaryCharacteristics/movement'
import { baseValue as actionPointBaseValue } from '../rules/characteristics/secondaryCharacteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from '../rules/characteristics/competence'
import { baseValue as fateBaseValue } from '../rules/characteristics/fate'
import { containsKey, findDuplicates } from '../rules/utils'
import { calculateMaxHealthValue, createHealth } from '../rules/characteristics/secondaryCharacteristics/health'
import { calculateCarryingCapacity } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { calculateInitiative } from '../rules/characteristics/secondaryCharacteristics/initiative'
import { calculatePower } from '../rules/characteristics/secondaryCharacteristics/power'
import { calculateMaxActionPoints } from '../rules/characteristics/secondaryCharacteristics/actionPoints'

const flattenCharacter = (databaseCharacter, targetLevel) => {
	let characterTraitList = []

	let baseCharacterSheet = {
		metadata: Object.assign({}, databaseCharacter.metadata), // P R O K Z Y K I L L A H
		state: Object.assign({}, databaseCharacter.state), // P R O K Z Y K I L L A H
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
	baseCharacterSheet.metadata.selectedLevel = targetLevel

	// one-index because level starts at one
	for (let levelIndex = 1; levelIndex <= targetLevel; levelIndex++) {
		if (databaseCharacter.history[levelIndex]=== undefined) { break }
		const currentLevel = databaseCharacter.history[levelIndex]
		const bonusType = currentLevel.bonusType
		const chosenBonus = currentLevel.choice
		const traitList = allTraits()

		// ADD COMPETENCE
		if (bonusType === 'competence')
			baseCharacterSheet.competence++

		// ADD FATE
		if (bonusType === 'fate') 
			baseCharacterSheet.fate += 3
		if (!databaseCharacter.metadata.isChosenByFate) {
			baseCharacterSheet.fate = baseCharacterSheet.fate * 0
		}

		// ADD ATTRIBUTES
		for (const attribute in attributes) {
			if (attribute === chosenBonus){
				baseCharacterSheet.attributes[chosenBonus]++
			}
		}

		const oldTraitsList = [...characterTraitList]

		// ADD TRAITS
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

								// if any of the traits in the complexPayload are already owned, traitKey is invalid
								if (containsKey(skillChoiceKey, characterTraitList)) {
									invalidComplexTraitLevel.push(traitKey)
									invalidComplexTraitLevel.push(skillChoiceKey)
								}

								if (skillChoiceKey && skillChoiceKey.length > 0 && !containsKey(skillChoiceKey, characterTraitList)) {

									// validate complexPayload
									if (bonusType === 'talent' && traitKey !== 'background' && !canChooseTrait(
										skillChoiceKey,
										characterTraitList, 
										baseCharacterSheet.attributes, 
										baseCharacterSheet.metadata.isChosenByFate, 
										levelIndex
									)) {
										// if there are any errors, push to invalidComplexTraitLevel
										if (!containsKey(skillChoiceKey, invalidComplexTraitLevel)) invalidComplexTraitLevel.push(skillChoiceKey)
									}
									characterTraitList.push(skillChoiceKey)
								}
							}
						}
					}

					// if there are invalid skill choices in complexPayload, push complex talent to invalidComplexTraitLevel
					if (invalidComplexTraitLevel.length > 0) invalidComplexTraitLevel.push(traitKey)

					// validate complex talent
					if ((!containsKey(traitKey, invalidComplexTraitLevel)) && !canChooseTrait(
						traitKey,
						characterTraitList, 
						baseCharacterSheet.attributes, 
						baseCharacterSheet.metadata.isChosenByFate, 
						targetLevel
					)) { 
						invalidComplexTraitLevel.push(traitKey)
					}

					// if there are any errors, push invalidComplexTraitLevel to invalidlist
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
			oldTraitsList,
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
			oldTraitsList, 
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