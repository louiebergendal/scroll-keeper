
import { knowledgeSkillKeysList } from '../../characteristics/traitLists/knowledgeSkills'

const fighter = {
	key: 'fighter',
	niceName: 'Krigare',
	description: 'krigare',
	skillsLists: {
		1: {
			choices: 1,
			list: ['melee', 'accuracy']
		},
        2: {
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
		1: {
			choices: 1,
			list: ['stealth', 'vigilant']
		},
        2: {
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
		1: {
			choices: 1,
			list: ['crafting', 'beastOfBurden']
		},
        2: {
			choices: 1,
			list: ['animalHusbandry', 'carouse', 'cooking']
		}
	},
}

const thinker = {
	key: 'thinker',
	niceName: 'KunskapsTörstare',
	description: 'kunskapsTörstare',
	skillsLists: {
		1: {
			choices: 1,
			list: knowledgeSkillKeysList()
		},
        2: {
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