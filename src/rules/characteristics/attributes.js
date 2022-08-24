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

export const baseValue = 3

export const setAttributeValueName = (attributeValue) => {
	const chosenPoints = attributeValue - baseValue
	if (chosenPoints <= 1) return 'Kass'
	if (chosenPoints <= 3) return 'Halvdan'
	if (chosenPoints <= 5) return 'Duglig'
	if (chosenPoints <= 7) return 'Skicklig'
	return 'Ypperlig'
}

export const getAttributeShortName = (attributeKey) => {
	return attributes[attributeKey].shortName
}

export const getAttributeLongName = (attributeKey) => {
	return attributes[attributeKey].longName
}

export const canChooseAttribute = (attributeValue, characterLevel) => {
	const levelEquivalenceClass = ((Math.trunc((characterLevel -1) / 10) * 2) +1)
	const levelEquivalenceClassRepresentant = characterLevel % 10

	let lvlCeil = levelEquivalenceClass + baseValue
	if (levelEquivalenceClassRepresentant >= 8 || levelEquivalenceClassRepresentant === 0) { lvlCeil++ }

	if (attributeValue >= lvlCeil) { return false }
	return true
}

