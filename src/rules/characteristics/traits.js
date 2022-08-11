// * * * T R A I T S  /  K A R A K T Ä R S E G E N S K A P E R * * * //

// * * * N O T E P A D * * * //

// RULE CHANGES:
// - Removed 'night owl'


// * * * C O N T E N T * * * //

import attributeSkillsImport from './traitLists/attributeSkills'
import generalSkillsImport from './traitLists/generalSkills'
import knowledgeSkillsImport from './traitLists/knowledgeSkills'
import favouredTerrainSkillsImport from './traitLists/favouredTerrainSkills'
import talentsListImport from './traitLists/talents'

const name = "Färdigheter och Talanger"

const attributeSkillsList = Object.assign({}, attributeSkillsImport)
const generalSkillsList = Object.assign({}, generalSkillsImport)
const knowledgeSkillsList = Object.assign({}, knowledgeSkillsImport)
const favouredTerrainSkillsList = Object.assign({}, favouredTerrainSkillsImport)
const talentsList = Object.assign({}, talentsListImport)

const allSkillsList = Object.assign({}, {
	...attributeSkillsList.battle,
	...attributeSkillsList.agility,
	...attributeSkillsList.spirit,
	...attributeSkillsList.knowledge,
	...generalSkillsList,
	...knowledgeSkillsList,
	...favouredTerrainSkillsList
})

const allTraitsList = Object.assign({}, {
	...allSkillsList,
	...talentsList
})


// * * * Internal functions * * * //

// * * * Exports * * * //

/**
* user-friendly title
*/
export const traitsName = name

/**
* attributeSkills:
* - Returns a 'attributeSkills' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterSkills' value
* will return a list where all traits have 'isOwned: false'
* @param {string[]} [characterSkills] - An array containing skills owned by the character
*/
export function attributeSkills() {
	let explodedList = {}
	Object.keys(list, (attributeKey) => {
		explodedList = {
			...explodedList,
			...list[attributeKey]
		}
	})
	return explodedList
}
/**
* Returns an array containing the keys of attributeSkillListKeys
*/
export const attributeSkillListKeys = () => {
	let list = []
	for (const attribute in attributeSkillsList) {
		const specificAttributeSkills = attributeSkillsList[attribute]
		for (const attributeSkill in specificAttributeSkills) {
			list.push(attributeSkill)
		}
	}
	return list
}

/**
* specificAttributeSkills:
* - Returns an 'attributeSkill' list with 'isOwned: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'isOwned: false'
* @param {string} specificAttributeKey - Returns skills associated with a specific attribute
* @param {string[]} [characterSkills] - An array containing skills owned by the character
*/
export function specificAttributeSkills(specificAttributeKey) {
	return attributeSkillsList[specificAttributeKey]
}

/**
* generalSkills.
* - Returns a 'generalSkills' list
*/
export function generalSkills() {
	return generalSkillsList
}
/**
* Returns an array containing the keys of generalSkillsList
*/
export const generalSkillListKeys = () => Object.keys(generalSkillsList)

/**
* knowledgeSkills:
* - Returns a 'knowledgeSkills' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterSkills' value
* will return a list where all traits have 'isOwned: false'
*/
export function knowledgeSkills() {
	return knowledgeSkillsList
}

/**
* Returns an array containing the keys of knowledgeSkillsList
*/
export const knowledgeSkillListKeys = () => Object.keys(knowledgeSkillsList)

/**
* favouredTerrainSkills:
* - Returns a 'favouredTerrainSkills' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterSkills' value
* will return a list where all traits have 'isOwned: false'
*/
export function favouredTerrainSkills() {
	return favouredTerrainSkillsList
}
/**
* Returns an array containing the keys of favouredTerrainSkillsList
*/
export const favouredTerrainSkillListKeys = () => Object.keys(favouredTerrainSkillsList)

/**
* talents:
* - Returns a 'talents' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterSkills' value
* will return a list where all traits have 'isOwned: false'
*/
export function allTalents() {
	return talentsList
}
/**
* Returns an array containing the keys of talentsList
*/
export const talentsListKeys = () => Object.keys(talentsList)

/**
* allTraits:
* - Returns an 'allTraits' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterTraits' value
* will return a list where all traits have 'isOwned: false'
*/
export function allTraits() {
	return allTraitsList
}
/**
* Returns an array containing the keys of allTraitsList
*/
export const allTraitListKeys = () => Object.keys(allTraitsList)

/**
* skills:
* - Returns an 'skills' list with 'isOwned: true' assigned to
* the appropriate character traits. Providing no 'characterTraits' value
* will return a list where all traits have 'isOwned: false'
*/
export function allSkills() {
	return allSkillsList
}

/**
* Returns an array containing the keys of allSkillsList
*/
export const skillsListKeys = () => Object.keys(allSkillsList)

/**
* independentCharacterSkills:
* - Compares a characterTraits array to attributeSkills and talents. 
* returns a traitlist without attributeSkills or talents.
*/
export function independentCharacterSkills(characterTraits = []) {
	let traits = {}
	const attributeSkillKeys = attributeSkillListKeys()
	const talentKeys = talentsListKeys()
	characterTraits.forEach(traitKey => {
		let traitIsValid = true
		attributeSkillKeys.forEach(attributeSkillKey => {
			if (traitKey === attributeSkillKey) { traitIsValid = false }
		})
		talentKeys.forEach(talentKey => {
			if (traitKey === talentKey) { traitIsValid = false }
		})
		if (traitIsValid) { traits[traitKey] = traitFromKey(traitKey, characterTraits) }
	})
	return traits
}

/**
* characterTalents:
* - Compares a characterTraits array to talents.
* returns a traitlist with owned talents.
*/
export function independentCharacterTalents(characterTraits) {
	let traits = {}
	const talentKeys = talentsListKeys()
	characterTraits.forEach(traitKey => {
		let traitIsValid = false
		talentKeys.forEach(talentKey => {
			if (traitKey === talentKey) { traitIsValid = true }
		})
		if (traitIsValid) { traits[traitKey] = traitFromKey(traitKey, characterTraits) }
	})
	return traits
}


export function traitFromKey(traitKey) {
	return allTraitsList[traitKey]
}


// * * * I N D E P E N D E N T  U T I L I T I E S * * * //
// Functions that are trait related and should be served by the traits module,
// but that do not rely on the contents of this file or its imports.

/**
* tryApplyTraitEffectOnValue:
* - takes in as parameters, a 'value', a string by the name of [traitEffect] and a string[] of
* character traitKeys. It will identify traits in characterTraitList that have a function by
* the name of [traitEffect] and then apply [traitEffect] on 'value'. Then 'value' will be returned.
* The returned value will have the same format as the input 'value' param.
*/
export function tryApplyTraitEffectOnValue(value, traitEffect, characterTraitList) {
	let characterTraits = {}
	characterTraitList.forEach((traitKey) => {
		characterTraits[traitKey] = allTraits()[traitKey]
	})
	let modifiedValue = value
	for (const traitKey in characterTraits) {
		const traitObject = characterTraits[traitKey]
		if (traitObject[traitEffect]) { modifiedValue = traitObject[traitEffect](modifiedValue) }
	}
	return modifiedValue
}

/**
* canChooseTrait:
* - Compares a characterTraits array to a single trait and assigns 'isOwned: true'
* to the trait if it has been chosen by the character.
*/
export function canChooseTrait(traitKey, flatCharacter) {
	
	// access target trait requirements
	const trait = allTraitsList[traitKey] // <-- is this relying on the contents of this file or its imports?

	if (trait.requirements) {
		let requirementsAreMet = true

		// check required traits
		if (trait.requirements.traits) {
			const requiredTraits = trait.requirements.traits
			requiredTraits.forEach(requiredTrait => {
				if(!hasTrait(requiredTrait, flatCharacter.characterTraits)) { requirementsAreMet = false }
			})
		}

		// check required attributes
		if (trait.requirements.attributes) {
			const requiredAttributeKeys = Object.keys(trait.requirements.attributes)
			requiredAttributeKeys.forEach(requiredAttributeKey => {
				const requiredAttributeValue = trait.requirements.attributes[requiredAttributeKey]
				const characterAttributeValue = flatCharacter.characterAttributes[requiredAttributeKey]
				if (requiredAttributeValue > characterAttributeValue) { requirementsAreMet = false }
			})
		}

		return requirementsAreMet
	}
}


export function hasTrait(traitKey, characterTraits) {
 	return characterTraits.includes(traitKey) ? true : false
}