import { allSkills } from '../rules/skills'
import { traits, baseValue } from '../rules/traits'

const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const metadata = characterHistory.metadata

	let characterSkillList = []

	let baseCharacter = {
		metadata: metadata,
		traits: {
			battle: baseValue,
			agility: baseValue,
			spirit: baseValue,
			knowledge: baseValue,
			physique: baseValue
		},
		skills: []
	}

	// one-index because level starts at one
	for (let i = 1; i <= metadata.currentLevel; i++) {
		const chosenBonus = levelHistory[i].choice

		for (const trait in traits) {
			if (trait === chosenBonus) {
				baseCharacter.traits[chosenBonus]++
			}
		}

		for (const skill in allSkills()) {
			if (skill === chosenBonus) {
				characterSkillList.push(skill)
			}
		}

	}

	const flattenedCharacter = {
		...baseCharacter,
		skills: characterSkillList
	}
	return flattenedCharacter
}

export {
	flattenCharacter
}
