import { allTraits } from '../rules/characteristics/traits'
import { attributes, baseValue as attributeBaseValue } from '../rules/characteristics/attributes'
import { baseValue as movementBaseValue } from '../rules/characteristics/movement'
import { baseValue as actionPointBaseValue } from '../rules/characteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from '../rules/characteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from '../rules/characteristics/competence'
import { baseValue as fateBaseValue } from '../rules/characteristics/fate'

import { calculateMaxHealth } from '../rules/characteristics/health'
import { calculateCarryingCapacity } from '../rules/characteristics/carryingCapacity'
import { calculateInitiative } from '../rules/characteristics/initiative'
import { calculatePower } from '../rules/characteristics/power'
import { calculateMaxActionPoints } from '../rules/characteristics/actionPoints'


const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const metadata = characterHistory.metadata
	const state = characterHistory.state

	let characterTraitList = []

	let baseCharacter = {
		metadata: metadata,
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
		maxHealth: 0, // baseValue included in calculateMaxHealth()
		fate: fateBaseValue,
		competence: competenceBaseValue,
		initiative: {},
		actionPoints: actionPointBaseValue
	}

	// one-index because level starts at one
	for (let i = 1; i <= metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice
		const bonusType = levelHistory[i].bonusType
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

		// MAX HEALTH
		baseCharacter.maxHealth = calculateMaxHealth(
			baseCharacter.attributes.physique,
			characterTraitList
		) // maxHealth baseValue is set here

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

		// POWER
		baseCharacter.power = calculatePower(characterTraitList)

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
