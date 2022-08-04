
import { tryApplyTraitEffectOnValue } from '../traits'

const baseValue = {
    offensive: 0,
    defensive: 0
}
export const calculatePower = (characterTraitList, size = 0) => {
    let power = { ...baseValue }
    power.offensive += size
    power.defensive += size
    power = tryApplyTraitEffectOnValue(power, 'addPowerBonus', characterTraitList)
    return power
}