// * * * N O T E P A D * * * //

/* 
        later:
        - size base health
        - towering.addHealthBonus
*/


// secondary stats

import { allTraits } from '../rules/traits'
import { d6 } from '../rules/rolls'

const baseValue = 2

const calculateDamageBonusReduction = (targetCharacterTraitList, targetCharacterSize = 0) => {
	const traitList = allTraits(targetCharacterTraitList)
    let damageBonusReduction = targetCharacterSize

    // steady
    damageBonusReduction = traitList.steady.isOwned
        ? traitList.steady.addDamageBonusReduction(damageBonusReduction)
        : damageBonusReduction

    return damageBonusReduction
}

export const calculateMaxHealth = (physiqueValue, characterTraitList) => {
	const traitList = allTraits(characterTraitList)
    let maxHealth = physiqueValue + baseValue

    // hardy
    maxHealth = traitList.hardy.isOwned
        ? traitList.hardy.addHealthBonus(maxHealth)
        : maxHealth

    return maxHealth = maxHealth * 3
}

// call for this in melee
// ta en diceRollArray? modifiera den och räkna ut?
// eller slå allt?
export const damageRoll = (targetCharacter, damageBonus, diceAmount, advantage) => {
    let targetDamageBonusReduction = calculateDamageBonusReduction(targetCharacter.traits)

    // need talents, gear and currentHealth
    
    //const targetCurrentHealth = targetCharacter.currentHealth
    //const targetDamageBonusReduction = 
    return targetDamageBonusReduction
}