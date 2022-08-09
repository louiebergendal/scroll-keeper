// * * * N O T E P A D * * * //
/*
	later:
	- size base health
	- towering.addHealthBonus
*/

import { tryApplyTraitEffectOnValue } from '../traits'
import {  } from '../traits'

import { meleeSuccessTable } from '../../successTables/melee'
import { sucRoll } from '../../rolls'
import { useStore } from '../../../stores/character'

const baseValue = 2

const createtHealthLevelState = (healthValue, strainValue) => {
	let result = {
		strainOverflow: 0,
		healthRemainder: 0
	}
	let healthRemainder = healthValue - strainValue
	if (healthRemainder < 0) {
		result.strainOverflow = -healthRemainder
		healthRemainder = 0
	} else {
		result.healthRemainder = healthRemainder
	}
	return result
}

const sumStrains = (oldStrain, newStrain) => {
	return {
		damage: oldStrain.damage + newStrain.damage,
		fatigue: oldStrain.fatigue + newStrain.fatigue
	}
}

const createHealthLevelWithOverflow = (healthLevelMaxValue, strain) => {
	// does damage overflow max health on this level?
	let newHealthLevelState = createtHealthLevelState(healthLevelMaxValue, strain.damage)
	let overflowedStrain = {
		damage: newHealthLevelState.strainOverflow,
		fatigue: strain.fatigue
	}
	// EARLY RETURN: damage did overflow
	if (newHealthLevelState.strainOverflow) {
		return {
			healthLevel: {
				max: healthLevelMaxValue,
				currentStrain: {
					damage: healthLevelMaxValue,
					fatigue: 0
				}
			},
		overflowedStrain
		}
	}
	// it didn't.
	// does fatigue overflow max health on this level?
	newHealthLevelState = createtHealthLevelState(
		newHealthLevelState.healthRemainder,
		overflowedStrain.fatigue
	)
	overflowedStrain.fatigue = newHealthLevelState.strainOverflow
	// EARLY RETURN: damage did not overflow but fatigue did
	if (newHealthLevelState.strainOverflow) {
		return {
		healthLevel: {
			max: healthLevelMaxValue,
			currentStrain: {
				damage: strain.damage | 0,
				fatigue: healthLevelMaxValue - strain.damage
			}
		},
		overflowedStrain
		}
	}
	// it didn't.
	// no overflow case, triggers if damage and fatigue combined
	// fail to exceed this level's max health
	return {
		healthLevel: {
		max: healthLevelMaxValue,
		currentStrain: {
			damage: strain.damage,
			fatigue: strain.fatigue
		}
		},
		overflowedStrain
	}
}

const createHealthLevels = (maxHealthValue, strain) => {
	let health = {}
	const healthLevelMaxValue = maxHealthValue / 3
	let remainder = createHealthLevelWithOverflow(healthLevelMaxValue, strain)
	health['well'] = remainder.healthLevel
	remainder = createHealthLevelWithOverflow(healthLevelMaxValue, remainder.overflowedStrain)
	health['strained'] = remainder.healthLevel
	remainder = createHealthLevelWithOverflow(healthLevelMaxValue, remainder.overflowedStrain)
	health['incapacitated'] = remainder.healthLevel
	return health
}

export const calculateMaxHealthValue = (physiqueValue, characterTraitList) => {
	let maxHealthValue = physiqueValue + baseValue // baseValue added here to be included in multiplication at return
	maxHealthValue = tryApplyTraitEffectOnValue(maxHealthValue, 'addMaxHealthBonus', characterTraitList)
	// Everything that modifies maxHealth should be added before final multiplication
	return maxHealthValue = maxHealthValue * 3
}

/* TEST */
/* const offensivePower = character.power.offensive + 2
const sucRollResult = sucRoll(12, 0)
console.log('sucRollResult: ', sucRollResult)
const meleeAttack = meleeSuccessTable(sucRollResult, character, offensivePower)
console.log('meleeAttack: ', meleeAttack);
character.addStrain(meleeAttack) */



export const createHealth = (
	maxHealthValue,
	currentStrain,
	newStrain = undefined
) => {
	let strain = currentStrain
	if (newStrain) strain = sumStrains(currentStrain, newStrain)
	return createHealthLevels(maxHealthValue, strain)
}



