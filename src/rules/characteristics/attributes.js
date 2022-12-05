const attributeNames = {
	battle: 'battle',
	agility: 'agility',
	spirit: 'spirit',
	knowledge: 'knowledge',
	physique: 'physique'
}

export const attributes = {
	[attributeNames.battle]: {
		key: attributeNames.battle,
		longName: 'Kamp',
		shortName: 'KAM'
	},
	[attributeNames.agility]: {
		key: attributeNames.agility,
		longName: 'Smidighet',
		shortName: 'SMI'
	},
	[attributeNames.spirit]: {
		key: attributeNames.spirit,
		longName: 'Andlighet',
		shortName: 'AND'
	},
	[attributeNames.knowledge]: {
		key: attributeNames.knowledge,
		longName: 'Kunskap',
		shortName: 'KUN'
	},
	[attributeNames.physique]: {
		key: attributeNames.physique,
		longName: 'Fysik',
		shortName: 'FYS'
	}
}

export const baseValue = 2

/**
* Returns an 'attributeValueName'-string.
* @param {number} attributeValue
*/
export const setAttributeValueName = (attributeValue) => {
	const chosenPoints = attributeValue - baseValue
	if (chosenPoints <= 1) return 'Dålig'
	if (chosenPoints <= 3) return 'Medioker'
	if (chosenPoints <= 5) return 'Duglig'
	if (chosenPoints <= 7) return 'Skicklig'
	if (chosenPoints <= 9) return 'Framstående'
	return 'Mästerlig'
}

/** 
* @param {string} attributeKey
*/
export const getAttributeShortName = (attributeKey) => {
	return attributes[attributeKey].shortName
}

/** 
* @param {string} attributeKey
*/
export const getAttributeLongName = (attributeKey) => {	
	if (attributeKey) { return attributes[attributeKey].longName }
	return ''
}

/** 
* Checks wether a specific attriubute can be chosen as a levelBonus.
* Returns true or false.
* @param {number} attributeValue
* @param {number} characterLevel
*/
export const canChooseAttribute = (attributeValue, characterLevel) => {
	if (attributeValue >= getAttributeLvlCeiling(characterLevel)) { return false }
	return true
}

/** 
* Calculates the maximum value a characteristic can have at a certain level.
* Returns a number.
* @param {number} characterLevel
*/
export const getAttributeLvlCeiling = (characterLevel) => {
	const levelEquivalenceClass = ((Math.trunc((characterLevel - 1) / 10) * 2) + 1)
	const levelEquivalenceClassRepresentant = characterLevel % 10
	let lvlCeil = levelEquivalenceClass + baseValue
	if (levelEquivalenceClassRepresentant >= 8 || levelEquivalenceClassRepresentant === 0) { lvlCeil++ }
	return lvlCeil
}