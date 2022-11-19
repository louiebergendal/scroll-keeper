import { tryApplyTraitEffectOnValue } from '../traits'

export const niceName = "Bärförmåga"
export const baseValue = 2

export const calculateCarryingCapacity = (physiqueValue, characterTraitList) => {
    let maxCarryingCapacity = physiqueValue + baseValue
    maxCarryingCapacity = tryApplyTraitEffectOnValue(maxCarryingCapacity, 'addMaxCarryingCapacityBonus', characterTraitList)
    return maxCarryingCapacity = maxCarryingCapacity * 4
}