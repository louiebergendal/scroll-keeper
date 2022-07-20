import { allSkills } from '../rules/traits'
import { attributes, baseValue } from '../rules/attributes'

const flattenCharacter = (characterHistory) => {
	const levelHistory = characterHistory.history
	const metadata = characterHistory.metadata

	let characterSkillList = []

	let baseCharacter = {
		metadata: metadata,
		attributes: {
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
		const skillList = allSkills()
		// const talentList = allTalents()

		for (const attribute in attributes) {
			if (attribute === chosenBonus) {
				baseCharacter.attributes[chosenBonus]++
			}
		}

		for (const skill in skillList) {
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
