import { allTraits } from '../traits'

export const baseValue = 0

export const calculateInitiative = (battleValue, characterTraitList, currentLevel, size = 0) => {
    const traits = allTraits()

    let hasUnarmouredFighting = false
    for (const key in characterTraitList) {
        const traitKey = characterTraitList[key]
        if (traitKey === 'unarmouredFighting') {
            hasUnarmouredFighting = true
        }
        // Trait does not exist yet, code does not run
        if (traitKey === 'lightningReflexes') {
            size = traits[traitKey].addInitiativeSizeBonus(size)
        }
    }
    return {
        size,
        battleValue,
        currentLevel,
        hasUnarmouredFighting
    }
}