import { getTraitNiceName } from '../traits.js'

export const getNiceNameSortedList = (traits) => {
    console.log("getNiceNameSortedList traits: ", traits)
    let niceTraitKeysList = []
    for (const traitKey in traits) {
        const trait = traits[traitKey]
        trait.niceName = getTraitNiceName(traitKey)
        niceTraitKeysList.push(trait.niceName)
    }
    // trim and sort nice names
    niceTraitKeysList = niceTraitKeysList.sort()

    // build sorted trait array for template use
    let sortedNiceTraits = []
    for (let i = 0; i < niceTraitKeysList.length; i++) {
        const niceTraitKey = niceTraitKeysList[i];
        // second loop
        for (const traitKey in traits) {
            const trait = traits[traitKey]
            if (trait.niceName === niceTraitKey) sortedNiceTraits.push(trait)
        }	
    }
    return sortedNiceTraits;
}