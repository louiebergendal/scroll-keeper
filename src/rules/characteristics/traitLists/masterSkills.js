import { 
	addProficiencyBonus,
	addAdvantage,
	freeReroll,
} from '../../mechanics.js'
import { getNiceNameSortedList } from './traitsUtils.js'
import { baseValue } from '../attributes'

const artisan = {
	key: 'artisan',
	name: 'Mästerhantverkare',
	requirements: {
		traits: ['craftsman', 'arcane'],
		attributes: {
			knowledge: baseValue + 2,
			spirit: baseValue + 1
		},
		mastery: true
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
	canMakeExuisiteGear: () => canMakeExuisiteGear(),
}

const assassination = {
	key: 'assassination',
	name: 'Lönnhugg',
	requirements: {
		traits: ['cutthroat'],
		attributes: {
			agility: baseValue + 4,
			battle: baseValue + 2
		},
		mastery: true
	},
	addDamageBonus: (dmg) => dmg + 4,
	choseCritRoll: (targetValue, roll) => roll = targetValue
}

const beastMaster = {
	key: 'beastMaster',
	name: 'Bestvän',
	requirements: {
		traits: ['animalHusbandry', 'extrasensation'],
		attributes: {
			spirit: baseValue + 4,
		},
		metadata: {
			isChosenByFate: true
		},
		mastery: true
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
	addLoyalAnimal: (beast) => beast.loyal = true,
	addScrutinyAction: () => addScrutinyAction(),
}

const karate = {
	key: 'karate',
	name: 'Slagskämpe',
	requirements: {
		traits: ['brawler', 'melee'],
		attributes: {
			physique: baseValue + 2,
			knowledge: baseValue + 4
		},
	},
	usageRequirements: ['unarmed'],
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
	increaseOffensivePower: (power) => power + 1
}

const lightningReflexes = {
	key: 'lightningReflexes',
	name: 'Blixtsnabba reflexer',
	requirements: {
		traits: ['vigilant'],
		attributes: {
			agility: baseValue + 4,
			battle: baseValue + 4
		},
		mastery: true
	},
	readyAsReactiveAction: (action) => readyAsReactiveAction(action),
}

const magicalAffinity = {
	key: 'magicalAffinity',
	name: 'Magisk ådra',
	requirements: {
		attributes: {
			spirit: baseValue + 3
		},
		metadata: {
			isChosenByFate: true
		},
		mastery: true
	},
	addCantrip: (cantrips) => cantrips + 1
}

const masterPerformer = {
	key: 'masterPerformer',
	name: 'Underhållningsmästare',
	requirements: {
		traits: ['performer'],
		attributes: {
			knowledge: baseValue + 3
		},
		mastery: true
	},
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 5)
}

const monsterSlayer = {
	key: 'monsterSlayer',
	name: 'Monsterbane',
	requirements: {
		traits: ['resolve', 'athletics'],
		attributes: {
			battle: baseValue + 6,
			physique: baseValue + 4
		},
		metadata: {
			isChosenByFate: true
		},
		mastery: true
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
	freeReroll: (roll) => freeReroll(roll),
}

const seafarer = {
	key: 'seafarer',
	name: 'Sjöfarare',
	requirements: {
		traits: ['wayfinding', 'seamanship'],
		attributes: {
			physique: baseValue + 2,
			knowledge: baseValue + 1
		},
		metadata: {
			isChosenByFate: true
		},
		mastery: true
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
	addMoraleBonus: (morale) => morale += 1
}

// TEST
const test = {
	key: 'test',
	name: 'TEST',
	requirements: {
		mastery: true
	},
}


const masterSkills = {
	artisan,
	assassination,
	beastMaster,
	karate,
	lightningReflexes,
	magicalAffinity,
	masterPerformer,
	monsterSlayer,
	seafarer,
	test
}

export const masterSkillKeysList = () => Object.keys(masterSkills)
export const masterSkillKeysListNiceNameSorted = () => getNiceNameSortedList(masterSkillKeysList())

export default masterSkills