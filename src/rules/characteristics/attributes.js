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
		shortName: 'KAM',
		description: 'Kamp (KAM) representerar karaktärens duglighet i strid. Den med högt värde i Kamp tillfogar mer skada då den anfaller och är själv bättre på att undgå skada då den försvarar sig. Exakt vilka egenskaper som leder till detta varierar från karaktär till karaktär.'
	},
	[attributeNames.agility]: {
		key: attributeNames.agility,
		longName: 'Smidighet',
		shortName: 'SMI',
		description: 'Smidighet (SMI) representerar karaktärens kroppskontroll, balans, vighet, finmotorik och koordination. Karaktärer med hög Smidighet rör sig obemärkt, flytande och graciöst. De kan ta långa och exakta språng och klättra uppför berg, trädstammar och husfasader. De har flinka fingrar och är skickliga på att dyrka upp lås och stjäla föremål från intet ont anande offer. Karaktärer med låg Smidighet är klumpiga.'
	},
	[attributeNames.spirit]: {
		key: attributeNames.spirit,
		longName: 'Andlighet',
		shortName: 'AND',
		description: 'Andlighet (AND) är karaktärens kontakt och förnimmelse av det övernaturliga och ickefysiska. Att tyda magiska runor går på kunskap, men att kasta besvärjelser eller känna närvaron av en osalig ande går på Andlighet. Någon med högt i Andlighet är troligen väldigt vidskeplig och skrockfull.'
	},
	[attributeNames.knowledge]: {
		key: attributeNames.knowledge,
		longName: 'Kunskap',
		shortName: 'KUN',
		description: 'Kunskap (KUN) visar en karaktärs allmänbildning. Någon med högt i Kunskap har god koll på skrönor, rykten, legender, fakta etc. Det kan röra sig om allt ifrån historia till extraktkunskap, tydande av uråldriga runor, andra kulturer, kännedom om den undre världen, administration eller kunskap om demoner.'
	},
	[attributeNames.physique]: {
		key: attributeNames.physique,
		longName: 'Fysik',
		shortName: 'FYS',
		description: 'Fysik (FYS) representerar karaktärens fysiska form, kondition och styrka. Personer med hög Fysik tål mycket och kan bära tunga lass.'
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
	if (attributeKey && attributes[attributeKey]) { return attributes[attributeKey].longName }
	return null
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