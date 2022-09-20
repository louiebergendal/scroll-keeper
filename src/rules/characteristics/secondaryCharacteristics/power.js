
import { tryApplyTraitEffectOnValue } from '../traits'

const baseValue = {
	offensive: 0,
	defensive: 0
}

/** 
* Returns an power-object containing offensive power and defensive power.
* @param {string[]} characterTraitList
* @param {number} [characterSize] 
*/
export const calculatePower = (characterTraitList, characterSize = 0) => {
	let power = { ...baseValue }
	power.offensive += characterSize
	power.defensive += characterSize
	power = tryApplyTraitEffectOnValue(power, 'addPowerBonus', characterTraitList)

	return power
}