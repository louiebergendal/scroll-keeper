// * * * N O T E P A D * * * //
/* 
    later:
    - size base health
    - towering.addHealthBonus
*/

import { tryApplyTraitEffectOnValue } from './traits'

const baseValue = 2

export const calculateMaxHealth = (physiqueValue, characterTraitList) => {
    let maxHealth = physiqueValue + baseValue // baseValue added here to be included in multiplication at return
    maxHealth = tryApplyTraitEffectOnValue(maxHealth, 'addMaxHealthBonus', characterTraitList)
    // Everything that modifies maxHealth should be added before final multiplication
    return maxHealth = maxHealth * 3
}