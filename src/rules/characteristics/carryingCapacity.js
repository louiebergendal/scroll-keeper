import { allTraits } from './traits'

export const baseValue = 2

export const calculateCarryingCapacity = (physiqueValue, characterTraitList) => {
	const traitList = allTraits(characterTraitList)
    let maxCarryingCapacity = physiqueValue + baseValue
    for (const trait in traitList) {
        const traitObject = traitList[trait]
        if (traitObject.isOwned && traitObject.addCarryingCapacityBonus) {
            maxCarryingCapacity = traitList[trait].addCarryingCapacityBonus(maxCarryingCapacity)
        }
    } 
    return maxCarryingCapacity = maxCarryingCapacity * 4
}