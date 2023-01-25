const davanic = {
	key: 'davanic',
	niceName: 'Davan',
	description: 'davan',
	skillsLists: {
		0: {
			choices: 2,
			list: ['knowledgeDavandBasic', 'knowledgeDavandAdvanced']
		},
		1: {
			choices: 1,
			list: ['animalHusbandry', 'seamanship', 'carouse', 'beastOfBurden', 'knowledgeVendBasic']
		}
	},
}

const vendic = {
	key: 'vendic',
	niceName: 'Vender',
	description: 'vend',
	skillsLists: {
		0: {
			choices: 2,
			list: ['knowledgeVendBasic', 'knowledgeVendAdvanced']
		},
		1: {
			choices: 1,
			list: ['animalHusbandry', 'riding', 'brawling', 'knowledgeDavandBasic', 'knowledgeArcaneBasic']
		}
	},
}

const sodoric = {
	key: 'sodoric',
	niceName: 'Sodorit',
	description: 'sodorfolk',
	skillsLists: {
		0: {
			choices: 2,
			list: ['knowledgeSodorBasic', 'knowledgeSodorAdvanced']
		},
		1: {
			choices: 1,
			list: ['knowledgeChemistryBasic', 'wayfinding', 'brawling', 'weatherBeaten', 'knowledgeOrunBasic']
		}
	},
}

const durchic = {
	key: 'durchic',
	niceName: 'Durcher',
	description: 'durcher',
	skillsLists: {
		0: {
			choices: 2,
			list: ['knowledgeDurcherBasic', 'knowledgeDurcherAdvanced']
		},
		1: {
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
