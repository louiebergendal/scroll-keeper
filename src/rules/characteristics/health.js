// * * * N O T E P A D * * * //
/* 
    later:
    - size base health
    - towering.addHealthBonus
*/

import { allTraits } from './traits'

const baseValue = 2

export const calculateMaxHealth = (physiqueValue, characterTraitList) => {
	const traitList = allTraits(characterTraitList)
    let maxHealth = physiqueValue + baseValue // baseValue added here to be included in multiplication at return
    for (const trait in traitList) {
        const traitObject = traitList[trait]
        if (traitObject.isOwned && traitObject.addHealthBonus) {
            maxHealth = traitList[trait].addHealthBonus(maxHealth)
        }
    }
    // Everything that modifies maxHealth should be added before final multiplication
    return maxHealth = maxHealth * 3
}