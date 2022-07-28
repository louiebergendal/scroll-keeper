import { allTraits } from '../rules/traits'
import { attributes, baseValue } from '../rules/attributes'

import { calculateMaxHealth, damageRoll } from '../rules/health'


const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const metadata = characterHistory.metadata
	const state = characterHistory.state

	let characterTraitList = []

	let baseCharacter = {
		metadata: metadata,
		attributes: {
			battle: baseValue,
			agility: baseValue,
			spirit: baseValue,
			knowledge: baseValue,
			physique: baseValue
		},
		traits: [],
		maxHealth: 0
	}

	// one-index because level starts at one
	for (let i = 1; i <= metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice
		const traitList = allTraits()

		for (const attribute in attributes) {
			if (attribute === chosenBonus) {
				baseCharacter.attributes[chosenBonus]++
			}
		}

		for (const trait in traitList) {
			if (trait === chosenBonus) {
				characterTraitList.push(trait)
			}
		}

		baseCharacter.maxHealth =
			calculateMaxHealth(baseCharacter.attributes.physique, characterTraitList)
	}



	const flattenedCharacter = {
		...baseCharacter,
		traits: characterTraitList
	}

	console.log('OJOJOJOJ');
	console.log('DAMAGE ROLL: ', damageRoll(flattenedCharacter, 0, 0, 0));





	return flattenedCharacter
}

export {
	flattenCharacter
}
