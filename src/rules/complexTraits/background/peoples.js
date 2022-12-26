const davanic = {
	key: 'davanic',
	niceName: 'Davan',
	description: 'davan',
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'seamanship', 'carouse', 'beastOfBurden', 'knowledgeVendBasic']
		},
		1: {
			choices: 2,
			list: ['knowledgeDavandBasic', 'knowledgeDavandAdvanced']
		}
	},
}

const vendic = {
	key: 'vendic',
	niceName: 'Vender',
	description: 'vend',
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'riding', 'brawling', 'knowledgeDavandBasic', 'knowledgeArcaneBasic']
		},
		1: {
			choices: 2,
			list: ['knowledgeVendBasic', 'knowledgeVendAdvanced'], 
		}
	},
}

const sodoric = {
	key: 'sodoric',
	niceName: 'Sodorit',
	description: 'sodorfolk',
	skillsLists: {
		0: {
			choices: 1,
			list: ['knowledgeChemistryBasic', 'wayfinding', 'brawling', 'weatherBeaten', 'knowledgeOrunBasic']
		},
		1: {
			choices: 2,
			list: ['knowledgeSodorBasic', 'knowledgeSodorAdvanced']
		}
	},
}

const durchic = {
	key: 'durchic',
	niceName: 'Durcher',
	description: 'durcher',
	skillsLists: {
		0: {
			choices: 1,
			list: ['knowledgeDavandBasic', 'knowledgeSodorBasic', 'knowledgeSidraBasic', 'knowledgeOrunBasic', 'wayfinding']
		},
		1: {
			choices: 2,
			list: ['knowledgeDurcherBasic', 'knowledgeDurcherAdvanced']
		}
	},
}

export default {
	davanic,
	vendic,
	sodoric,
	durchic
}
