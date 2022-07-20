import { allTraits } from '../rules/traits'
import { attributes, baseValue } from '../rules/attributes'

const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const metadata = characterHistory.metadata

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
		traits: []
	}

	// one-index because level starts at one
	for (let i = 1; i <= metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice
		const traitList = allTraits()
		// const talentList = allTalents()

		for (const attribute in attributes) {
			if (attribute === chosenBonus) {
				baseCharacter.attributes[chosenBonus]++
			}
		}

		for (const skill in traitList) {
			if (skill === chosenBonus) {
				characterTraitList.push(skill)
			}
		}
	}

	const flattenedCharacter = {
		...baseCharacter,
		traits: characterTraitList
	}
	return flattenedCharacter
}

export {
	flattenCharacter
}
