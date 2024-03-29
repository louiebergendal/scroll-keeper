// * * * T R A I T S  /  K A R A K T Ä R S E G E N S K A P E R * * * //

// * * * N O T E P A D * * * //


// * * * C O N T E N T * * * //

import { getAttributeLongName } from './attributes'
import attributeSkillsImport from './traitLists/attributeSkills'
import generalSkillsImport from './traitLists/generalSkills'
import knowledgeSkillsImport from './traitLists/knowledgeSkills'
import favouredTerrainSkillsImport from './traitLists/favouredTerrainSkills'
import masterSkillsImport from './traitLists/masterSkills'
import talentsListImport from './traitLists/talents'
import { containsKey } from '../utils'
import background from '../complexTraits/background/background'

const name = 'Färdigheter och Talanger'

const attributeSkillsList = Object.assign({}, attributeSkillsImport)
const generalSkillsList = Object.assign({}, generalSkillsImport)
const knowledgeSkillsList = Object.assign({}, knowledgeSkillsImport)
const favouredTerrainSkillsList = Object.assign({}, favouredTerrainSkillsImport)
const masterSkillsList = Object.assign({}, masterSkillsImport)
const talentsList = Object.assign({}, talentsListImport)

const allSkillsList = Object.assign({}, {
	...attributeSkillsList.battle,
	...attributeSkillsList.agility,
	...attributeSkillsList.spirit,
	...attributeSkillsList.knowledge,
	...generalSkillsList,
	...knowledgeSkillsList,
	...favouredTerrainSkillsList,
	...masterSkillsList
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
* - Returns a 'attributeSkills' list.
*/
export function attributeSkills() {
	return {
		...attributeSkillsImport.agility,
		...attributeSkillsImport.battle,
		...attributeSkillsImport.knowledge,
		...attributeSkillsImport.spirit
	}
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
* - Returns an 'attributeSkill' list.
* @param {string} specificAttributeKey - Returns skills associated with a specific attribute
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
* - Returns a 'knowledgeSkills' list.
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
* - Returns a 'favouredTerrainSkills' list.
*/
export function favouredTerrainSkills() {
	return favouredTerrainSkillsList
}
/**
* Returns an array containing the keys of favouredTerrainSkillsList
*/
export const favouredTerrainSkillListKeys = () => Object.keys(favouredTerrainSkillsList)

/**
* masterSkills:
* - Returns a 'masterSkills' list.
*/
export function masterSkills() {
	return masterSkillsList
}
/**
* Returns an array containing the keys of favouredTerrainSkillsList
*/
export const masterSkillListKeys = () => Object.keys(masterSkillsList)

/**
* talents:
* - Returns a 'talents' list.
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
* - Returns an 'allTraits' list.
*/
export const allTraits = () => allTraitsList
/**
* Returns an array containing the keys of allTraitsList
*/
export const allTraitListKeys = () => Object.keys(allTraitsList)

/**
* skills:
* - Returns an 'skills' list.
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

		if (traitIsValid && traitFromKey(traitKey, characterTraits)) { traits[traitKey] = traitFromKey(traitKey, characterTraits) }
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





// * * * I N D E P E N D E N T  U T I L I T I E S * * * //
// Functions that are trait related and should be served by the traits module,
// but that do not rely on the contents of this file or its imports.

/**
* takes in as parameters, a 'value', a string by the name of [traitEffect] and a string[] of
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
		if (traitObject && traitObject[traitEffect]) { modifiedValue = traitObject[traitEffect](modifiedValue) }
	}
	
	return modifiedValue
}

export function canChooseTrait(traitKey, characterTraitList, characterAttributes, isChosenByFate, selectedLevel){
	const error = getFailedRequirements(
		traitKey,
		characterTraitList,
		characterAttributes,
		isChosenByFate,
		selectedLevel
	)
	return Object.keys(error).length === 0
}

export function getFailedRequirements(
	traitKey, 
	characterTraitList,
	characterAttributes,
	isChosenByFate,
	selectedLevel
) {

	// access target trait requirements
	const trait = allTraitsList[traitKey] || {}
	const failedRequirements = {}

	// check if trait is already owned
	if (containsKey(traitKey, characterTraitList)) {
		failedRequirements.isAlreadyOwned = true
	}

	if (trait.requirements) {

		// check required traits
		if (trait.requirements.traits) {
			const requiredTraitKeysList = trait.requirements.traits
			let failedRequiredTraitsKeysList = []

			requiredTraitKeysList.forEach(requiredTraitKey => {
				if(!containsKey(requiredTraitKey, characterTraitList)) {
					failedRequiredTraitsKeysList.push(requiredTraitKey)
				}
			})
			if(failedRequiredTraitsKeysList.length !== 0) {
				failedRequirements.traits = (failedRequiredTraitsKeysList)
			}
		}

		// check required attributes
		if (trait.requirements.attributes) {
			const requiredAttributeList = Object.keys(trait.requirements.attributes)
			let failedRequiredAttributesList = []

			requiredAttributeList.forEach(requiredAttributeKey => {
				const requiredAttributeValue = trait.requirements.attributes[requiredAttributeKey]
				const characterAttributeValue = characterAttributes[requiredAttributeKey]
				if (requiredAttributeValue > characterAttributeValue) {
					failedRequiredAttributesList = {
						...failedRequiredAttributesList,
						[requiredAttributeKey]: requiredAttributeValue
					}
					if(failedRequiredAttributesList.length !== 0) {
						failedRequirements.attributes = failedRequiredAttributesList
					}
				}
			})
		}
		// check required level
		const requiredMetadata = {...trait.requirements.metadata}
		const requiredLevel = (requiredMetadata.level -1) // -1 to account for current lvling
		if (requiredLevel && requiredLevel > selectedLevel) {
			failedRequirements.metadata = {
				...failedRequirements.metadata,
				level: requiredLevel
			} 
		}
		// check if isChosenByFate
		if (requiredMetadata.isChosenByFate) {

			if (!isChosenByFate) {
				failedRequirements.metadata = {
					...failedRequirements.metadata,
					isChosenByFate: isChosenByFate
				}
			}
		}
		// If it's a masterskill, check how many masterskills are already owned and compare to allowed masterskills per level
		if (trait.requirements.mastery === true) {

			const amountOfMasterSkillsAllowed = amountMasterSkillsAtLevel(selectedLevel)
			let amountOfMasterSkillsOwnedAtSelectedLevel = 0

			characterTraitList.forEach((traitKey) => {
				if (masterSkillsList[traitKey]) {
					amountOfMasterSkillsOwnedAtSelectedLevel ++
				}
			})
			
			if ((amountOfMasterSkillsOwnedAtSelectedLevel + 1) > amountOfMasterSkillsAllowed ) { // +1 to account for current level masterSkillchoice
				
				failedRequirements.mastery = {
					...failedRequirements.mastery,
					amountOfMasterSkillsAllowed: amountOfMasterSkillsAllowed
				}
			}
				
		} 
	}

	return failedRequirements
}

export function getFailedTraitRequirementsErrorMessage(failedTraitRequirements) {

	let traitsErrorString = ""

	// designing error strings
	if (failedTraitRequirements.traits) {
		Object.values(failedTraitRequirements.traits).forEach((traitKey, index) => {
			const traitNiceName = getTraitNiceName(traitKey)
			if (index === 0) {
				traitsErrorString = traitNiceName
			} else {
				traitsErrorString += ', ' + traitNiceName
			}
		})
	}

	let attributesErrorString = ""
	if (failedTraitRequirements.attributes) {
		Object.keys(failedTraitRequirements.attributes).forEach((attributeKey, index) => {
			const attributeNiceName = getAttributeLongName(attributeKey)
			if (index === 0) {
				attributesErrorString = attributeNiceName + ': ' + failedTraitRequirements.attributes[attributeKey] 
			} else {
				attributesErrorString += ', ' + attributeNiceName + ': ' + failedTraitRequirements.attributes[attributeKey]
			}
		})
	}

	let isNotChosenByFateErrorString = ''
	if (failedTraitRequirements.metadata && failedTraitRequirements.metadata.isChosenByFate === false) {
		isNotChosenByFateErrorString = 'Ödesvald'
	}

	let levelErrorString = ''
	if (failedTraitRequirements.metadata && failedTraitRequirements.metadata.level) {
		levelErrorString = 'Erfarenhet: ' + failedTraitRequirements.metadata.level
	}

	// putting error strings together
	attributesErrorString =
		(traitsErrorString && attributesErrorString)
			? attributesErrorString + ', '
			: attributesErrorString + ''

	traitsErrorString = traitsErrorString ? traitsErrorString : ''

	let failedRequirementsString = attributesErrorString + traitsErrorString || ''
	if (isNotChosenByFateErrorString) {
		failedRequirementsString =
			(failedRequirementsString)
				? failedRequirementsString + ', ' + isNotChosenByFateErrorString
				: isNotChosenByFateErrorString
	}
	if (levelErrorString) {
		failedRequirementsString =
			(failedRequirementsString)
				? failedRequirementsString + ', ' + levelErrorString
				: levelErrorString
	}

	// other fail reasons
	let otherFailReasonsString = ''

	// already owned
	let isAlreadyOwnedErrorString = ''
	if (failedTraitRequirements.isAlreadyOwned) isAlreadyOwnedErrorString = 'Redan vald'

	if (isAlreadyOwnedErrorString
		&& (attributesErrorString.length === 0 && traitsErrorString.length === 0)
	) {
		isAlreadyOwnedErrorString === isAlreadyOwnedErrorString + ', '
	}

	// amount of master skills allowed
	let amountOfMasterSkillsAllowedErrorString = ''

	if (failedTraitRequirements.mastery) {
		amountOfMasterSkillsAllowedErrorString = 
			'Man får inte ha fler än ' + failedTraitRequirements.mastery.amountOfMasterSkillsAllowed + ' mästarfärdigheter på den här erfarenhetsnivån '
	}

	// already owned should take precedence over amount of masterskills
	if (amountOfMasterSkillsAllowedErrorString !== '') otherFailReasonsString = amountOfMasterSkillsAllowedErrorString
	if (isAlreadyOwnedErrorString !== '') otherFailReasonsString = isAlreadyOwnedErrorString

	let returnString =
		(otherFailReasonsString !== '')
			? otherFailReasonsString
			: 'Kräver: ' + failedRequirementsString

	return returnString
}

function amountMasterSkillsAtLevel(level) {
	let allowedAmount = Math.floor(level / 10 - 2)
	if (allowedAmount < 0) allowedAmount = 0
	return allowedAmount
}

export function traitFromKey(traitKey) {
	return allTraitsList[traitKey]
}

export function getTraitNiceName(traitKey) {
	const trait = traitFromKey(traitKey) ? traitFromKey(traitKey) : null
	if (trait) { return trait.name }
}

export function removeTraitsWithRequirements(traits) {
	const tempTraits = { ...traits } // remove reference
	for (const trait in tempTraits) {
		if (tempTraits[trait].requirements) delete tempTraits[trait]
	}
	return tempTraits
}

export function getComplexTraitChoiceKey(complexTraitCategoryKey, address1, address2, complexPayload) {
	return complexPayload[complexTraitCategoryKey].choices[address1][address2]
}

export function alterComplexTrait(traitKey, complexTraitCategoryKey, address1, address2, complexPayload) {
	complexPayload[complexTraitCategoryKey].choices[address1][address2] = traitKey
	return complexPayload
}

export function getComplexTraitCategorySkillsList(complexTraitCategoryKey, address1, ) {
	background.complexTraitCategoryKey
}

