import { allTraits } from '../rules/characteristics/traits'
import { attributes, baseValue as attributeBaseValue } from '../rules/characteristics/attributes'
import { baseValue as movementBaseValue } from '../rules/characteristics/secondaryCharacteristics/movement'
import { baseValue as actionPointBaseValue } from '../rules/characteristics/secondaryCharacteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from '../rules/characteristics/competence'
import { baseValue as fateBaseValue } from '../rules/characteristics/fate'

import { calculateMaxHealthValue, createHealth } from '../rules/characteristics/secondaryCharacteristics/health'
import { calculateCarryingCapacity } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
import { calculateInitiative } from '../rules/characteristics/secondaryCharacteristics/initiative'
import { calculatePower } from '../rules/characteristics/secondaryCharacteristics/power'
import { calculateMaxActionPoints } from '../rules/characteristics/secondaryCharacteristics/actionPoints'

const flattenCharacter = (characterHistory, targetLevel) => {
	const levelHistoryList = characterHistory.history
	const metadata = characterHistory.metadata
	const state = characterHistory.state
	let characterTraitList = []

	let baseCharacter = {
		metadata: metadata,
		state: state,
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
		if (levelHistoryList[i]=== undefined) { break }
		const currentLevel = levelHistoryList[i]
		const bonusType = currentLevel.bonusType
		const chosenBonus = currentLevel.choice
		const traitList = allTraits()

		// COMPETENCE
		if (bonusType === 'competence')
			baseCharacter.competence++

		// FATE
		if (bonusType === 'fate')
			baseCharacter.fate += 3

		// ATTRIBUTES
		for (const attribute in attributes) {
			if (attribute === chosenBonus)
				baseCharacter.attributes[chosenBonus]++
		}

		// TRAITS
		for (const trait in traitList) {
			if (trait === chosenBonus)
				characterTraitList.push(trait)
		}

		// * * * SECONDARY CHARACTERISTICS * * * //

		// POWER
		baseCharacter.power = calculatePower(characterTraitList)

		// MAX HEALTH VALUE
		baseCharacter.maxHealthValue = calculateMaxHealthValue(
			baseCharacter.attributes.physique,
			characterTraitList
		) // maxHealthValue baseValue is set here

		// HEALTH ( Relies on maxHealthValue being set )
		baseCharacter.health = createHealth(
			baseCharacter.maxHealthValue,
			baseCharacter.state.currentStrain
		)

		// CARRYING CAPACITY
		baseCharacter.carryingCapacity = calculateCarryingCapacity(
			baseCharacter.attributes.physique,
			characterTraitList
		)

		// INITIATIVE
		baseCharacter.initiative = calculateInitiative(
			baseCharacter.attributes.battle,
			characterTraitList,
			baseCharacter.metadata.currentLevel
		)

		// ACTION POINTS
		baseCharacter.actionPoints = calculateMaxActionPoints(characterTraitList)
	}

	const flattenedCharacter = {
		...baseCharacter,
		traits: characterTraitList
	}
	return flattenedCharacter
}

export {
	flattenCharacter
}