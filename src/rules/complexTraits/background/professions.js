
import { knowledgeSkillKeysList } from '../../characteristics/traitLists/knowledgeSkills'

const fighter = {
	key: 'fighter',
	niceName: 'Krigare',
	description: 'krigare',
	skillsLists: {
		0: {
			choices: 1,
			list: ['melee', 'accuracy']
		},
		1: {
			choices: 1,
			list: ['unarmouredFighting', 'warfare', 'brawling']
		}
	},
}

const outlaw = {
	key: 'outlaw',
	niceName: 'Missdådare',
	description: 'missdådare',
	skillsLists: {
		0: {
			choices: 1,
			list: ['stealth', 'vigilant']
		},
		1: {
			choices: 1,
			list: ['carouse', 'brawling', 'intrusion']
		}
	},
}

const commoner = {
	key: 'commoner',
	niceName: 'Gårdsman',
	description: 'gårdsman',
	skillsLists: {
		0: {
			choices: 1,
			list: ['crafting', 'beastOfBurden']
		},
		1: {
			choices: 1,
			list: ['animalHusbandry', 'carouse', 'cook']
		}
	},
}

const thinker = {
	key: 'thinker',
	niceName: 'Lärd',
	description: 'Lärd',
	skillsLists: {
		0: {
			choices: 1,
			list: knowledgeSkillKeysList()
		},
		1: {
			choices: 1,
			list: ['bookworm', 'meticulous', 'performer']
		}
	},
}

export default {
	fighter,
	outlaw,
	commoner,
	thinker
}
