import { allTraits, canChooseTrait } from '../rules/characteristics/traits'
import { attributes, baseValue as attributeBaseValue, canChooseAttribute } from '../rules/characteristics/attributes'
import { baseValue as movementBaseValue } from '../rules/characteristics/secondaryCharacteristics/movement'
import { baseValue as actionPointBaseValue } from '../rules/characteristics/secondaryCharacteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from '../rules/characteristics/competence'
import { baseValue as fateBaseValue } from '../rules/characteristics/fate'

import { contains } from '../rules/utils'

import { calculateMaxHealthValue, createHealth } from '../rules/characteristics/secondaryCharacteristics/health'
import { calculateCarryingCapacity } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { calculateInitiative } from '../rules/characteristics/secondaryCharacteristics/initiative'
import { calculatePower } from '../rules/characteristics/secondaryCharacteristics/power'
import { calculateMaxActionPoints } from '../rules/characteristics/secondaryCharacteristics/actionPoints'
import { complexTalents } from '../rules/characteristics/traitLists/talents'

//const traitIsComplexTalent = (traitKey) => contains(complexTalents, traitKey)

const flattenCharacter = (databaseCharacter, targetLevel) => {
	let characterTraitList = []

	databaseCharacter.metadata.selectedLevel = targetLevel
	databaseCharacter.metadata.invalidLevels = {}
	databaseCharacter.metadata.background = {}

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
	for (let i = 1; i <= targetLevel; i++) {
		if (databaseCharacter.history[i]=== undefined) { break }
		const currentLevel = databaseCharacter.history[i]
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
			console.log("currentLevel: ", currentLevel)
			if (currentLevel.complexPayload) {
				for (const choiceCategory in currentLevel.complexPayload) { // ex. 'people'
					// write connection between complexTalent and into metadata
					baseCharacterSheet.metadata.background[choiceCategory] = currentLevel.complexPayload[choiceCategory].key
					for (const choiceGroup in choiceCategory.choices) { // ex. 1
						for (const choiceKey in choiceGroup) { // ex. 'basicKnowledgeDavand
							characterTraitList.push(choiceKey)
						}
					}
				}
				console.log("baseCharacterSheet.metadata.background - at end of trait loop: ", baseCharacterSheet.metadata.background)
			}
			if (traitKey === chosenBonus) {
				characterTraitList.push(traitKey)
			}
		}

		// VALIDATE SKILLS
		if (bonusType === 'talent' && !canChooseTrait(chosenBonus, characterTraitList, baseCharacterSheet.attributes, baseCharacterSheet.metadata.isChosenByFate, targetLevel)) {
			// add invalid skill choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[i] = chosenBonus
		}

		// VALIDATE TALENTS
		if (bonusType === 'skill' && !canChooseTrait(chosenBonus, characterTraitList, baseCharacterSheet.attributes, baseCharacterSheet.metadata.isChosenByFate, targetLevel)) {
			// add invalid talent choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[i] = chosenBonus
		}

		// VALIDATE ATTRIBUTES
		if (bonusType === 'attribute' && !canChooseAttribute(baseCharacterSheet.attributes[chosenBonus] - 1, i)) {
			// add invalid attribute choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[i] = chosenBonus
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