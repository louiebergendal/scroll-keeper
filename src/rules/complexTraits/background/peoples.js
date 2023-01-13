const davanic = {
	key: 'davanic',
	niceName: 'Davan',
	description: 'davan',
	mandatorySkills: ['knowledgeDavandBasic', 'knowledgeDavandAdvanced'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'seamanship', 'carouse', 'beastOfBurden', 'knowledgeVendBasic']
		}
	},
}

const vendic = {
	key: 'vendic',
	niceName: 'Vender',
	description: 'vend',
	mandatorySkills: ['knowledgeVendBasic', 'knowledgeVendAdvanced'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'riding', 'brawling', 'knowledgeDavandBasic', 'knowledgeArcaneBasic']
		}
	},
}

const sodoric = {
	key: 'sodoric',
	niceName: 'Sodorit',
	description: 'sodorfolk',
	mandatorySkills: ['knowledgeSodorBasic', 'knowledgeSodorAdvanced'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['knowledgeChemistryBasic', 'wayfinding', 'brawling', 'weatherBeaten', 'knowledgeOrunBasic']
		}
	},
}

const durchic = {
	key: 'durchic',
	niceName: 'Durcher',
	description: 'durcher',
	mandatorySkills: ['knowledgeDurcherBasic', 'knowledgeDurcherAdvanced'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['knowledgeDavandBasic', 'knowledgeSodorBasic', 'knowledgeSidraBasic', 'knowledgeOrunBasic', 'wayfinding']
		}
	},
}

export default {
	davanic,
	vendic,
	sodoric,
	durchic
}
