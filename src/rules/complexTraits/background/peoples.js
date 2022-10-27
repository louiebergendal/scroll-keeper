const davanic = {
	key: 'davanic',
	niceName: 'Davan',
	description: 'davan',
	mandatorySkills: ['basicKnowledgeDavand'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'seamanship', 'carouse', 'beastOfBurden', 'basicKnowledgeVend']
		}
	},
}

const vendic = {
	key: 'vendic',
	niceName: 'Vender',
	description: 'vend',
	mandatorySkills: ['basicKnowledgeVend'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'riding', 'brawling', 'basicKnowledgeDavand', 'basicKnowledgeArcane']
		}
	},
}

const sodoric = {
	key: 'sodoric',
	niceName: 'Sodorit',
	description: 'sodorfolk',
	mandatorySkills: ['basicKnowledgeSodor'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['basicKnowledgeChemistry', 'wayfinding', 'brawling', 'weatherBeaten', 'basicKnowledgeOrun']
		}
	},
}

const durchic = {
	key: 'durchic',
	niceName: 'Durcher',
	description: 'durcher',
	mandatorySkills: ['basicKnowledgeDurcher'],
	skillsLists: {
		0: {
			choices: 1,
			list: ['basicKnowledgeDavand', 'basicKnowledgeSodor', 'basicKnowledgeSidra', 'basicKnowledgeOrun', 'wayfinding']
		}
	},
}

export default {
	davanic,
	vendic,
	sodoric,
	durchic
}
