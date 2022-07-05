import {traits, baseValue} from '../rules/traits'

const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const levelHistoryKeys = Object.keys(levelHistory)
	const metadata = characterHistory.metadata

	let flatCharacter = {
		metadata: metadata,
		traits: {
			battle: baseValue,
			agility: baseValue,
			spirit: baseValue,
			knowledge: baseValue,
			physique: baseValue
		},
	}

	// one-index because level starts at one
	for (let i = 1; i <= metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice
		
		for (const trait in traits) {
			if (trait === chosenBonus) {
				flatCharacter.traits[chosenBonus]++
			}
		}
	}
	return flatCharacter
}

export {
	flattenCharacter
}