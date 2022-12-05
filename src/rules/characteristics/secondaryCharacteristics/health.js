// * * * N O T E P A D * * * //
/*
	later:
	- size base health
	- towering.addHealthBonus
*/

import { tryApplyTraitEffectOnValue } from '../traits'

export const niceName = "Hälsa"
const baseValue = 4

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

const createHealthLevelWithOverflow = (healthLevelMaxValue, strain, healthLevelKey) => {
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
				}, // lagt till "_frontend_remainder" & "_frontend_title: healthLevelTitle"
				_frontend_remainder: 0,
				_frontend_key: healthLevelKey
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
				}, // lagt till "_frontend_remainder" & "_frontend_title: healthLevelTitle"
				_frontend_remainder: 0,
				_frontend_key: healthLevelKey
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
			}, // lagt till "_frontend_remainder" & "_frontend_title: healthLevelTitle"
			_frontend_remainder: healthLevelMaxValue - (strain.damage + strain.fatigue),
			_frontend_key: healthLevelKey
		},
		overflowedStrain
	}
}

const createHealthLevels = (maxHealthValue, strain) => {
	let health = {}
	const healthLevelMaxValue = maxHealthValue / 3
	let remainder = createHealthLevelWithOverflow(healthLevelMaxValue, strain, 'well')
	health['well'] = remainder.healthLevel
	remainder = createHealthLevelWithOverflow(healthLevelMaxValue, remainder.overflowedStrain, 'strained')
	health['strained'] = remainder.healthLevel
	remainder = createHealthLevelWithOverflow(healthLevelMaxValue, remainder.overflowedStrain, 'incapacitated')
	health['incapacitated'] = remainder.healthLevel

	return health
}
 
export const calculateMaxHealthValue = (physiqueValue, characterTraitList) => {
	let maxHealthValue = physiqueValue + baseValue // baseValue added here to be included in multiplication at return
	maxHealthValue = tryApplyTraitEffectOnValue(maxHealthValue, 'addMaxHealthBonus', characterTraitList)
	// Everything that modifies maxHealth should be added before final multiplication
	return maxHealthValue = maxHealthValue * 3
}

export const createHealth = (
	maxHealthValue,
	currentStrain,
	newStrain = undefined
) => {
	let strain = currentStrain
	if (newStrain) strain = sumStrains(currentStrain, newStrain)
	return createHealthLevels(maxHealthValue, strain)
}

export function getHealthLevelNiceName(healthLevelKey) {
	if (healthLevelKey === 'well') return 'Frisk'
	if (healthLevelKey === 'strained') return 'Skadad'
	if (healthLevelKey === 'incapacitated') return 'Sänkt'
}
