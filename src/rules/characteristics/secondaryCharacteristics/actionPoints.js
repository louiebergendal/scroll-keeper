import { tryApplyTraitEffectOnValue } from '../traits'

export const niceName = "Handlingspoäng"
export const typesNiceNames = {
	basic: "Normala",
	quick: "Snabba"
}

export const baseValue = {
    basic: 2,
    quick: 1
}

export const calculateMaxActionPoints = (characterTraitList) => {
    let maxActionPoints = { ...baseValue }
    maxActionPoints = tryApplyTraitEffectOnValue(maxActionPoints, 'addBasicActionPointsBonus', characterTraitList)
    return maxActionPoints
}