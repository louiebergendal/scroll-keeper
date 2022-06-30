import {traits, baseValue} from '../rules/traits'

const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const levelHistoryKeys = Object.keys(levelHistory)

	let flatCharacter = {
		traits: {
			battle: baseValue,
			agility: baseValue,
			spirit: baseValue,
			knowledge: baseValue,
			physique: baseValue
		},
	}

	// one-index because level starts at one
	for (let i = 1; i <= characterHistory.metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice
		
		for (const trait in traits) {
			if (trait === chosenBonus) {
				flatCharacter.traits[chosenBonus]++
			}
		}
	}
	console.log('flatCharacter: ', flatCharacter)
	return flatCharacter
}

export {
	flattenCharacter
}