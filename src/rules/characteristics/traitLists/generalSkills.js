import { 
	addProficiencyBonus,
	removeSucRollPenalty,
	addAdvantage,
	freeReroll,
	multiplyActionTime,
	refineProvisions,
	addMaxCarryingCapacityBonus
} from '../../mechanics.js'
import { getNiceNameSortedList } from './traitsUtils.js'
import { baseValue } from '../attributes'

const animalHusbandry = {
	key: 'animalHusbandry',
	name: 'Djurskötsel',
	addAdvantage: (advantage) => addAdvantage(advantage),
	addLoyalAnimal: (beast) => beast.loyal = true
}

const craftsman = {
	key: 'craftsman',
	name: 'Hantverk',
	requirements: {
		traits: ['crafting'],
		attributes: {
			knowledge: baseValue + 1,
			physique: baseValue + 1
		},
		metadata: {
			level: 11,
		},
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
}

const beastOfBurden = {
	key: 'beastOfBurden',
	name: 'Packåsna',
	addMaxCarryingCapacityBonus: (carryingCapacity) => addMaxCarryingCapacityBonus(carryingCapacity, 1)
}

const bookworm = {
	key: 'bookworm',
	name: 'Bokmal',
	requirements: {
		attributes: {
			knowledge: baseValue + 2
		}
	},
	softUnlock: (fv) => removeSucRollPenalty(fv),
	fastReader: (actionTime) => multiplyActionTime(actionTime, 0.5)
}

const brawling = {
	key: 'brawling',
	name: 'Slagsmål',
	requirements: {
		traits: ['melee']
	},
	usageRequirements: ['unarmed'],
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
	retroactivelyLowerOffensivePower: (power) => power - 2,
	retroactivelyLowerCritRoll: (critRoll) => critRoll - 2
}

const carouse = {
	key: 'carouse',
	name: 'Berusningsvana',
	usageRequirements: ['drunk'],
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
}

const cook = {
	key: 'cook',
	name: 'Kok-konst',
	usageRequirements: ['fire'],
	addGroupMoraleBonus: (morale) => morale + 1,
	refineProvisions: (provisions) => refineProvisions(provisions)
}

const crafting = {
	key: 'crafting',
	name: 'Händig',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const cutthroat = {
	key: 'cutthroat',
	name: 'Överfall',
	requirements: {
		attributes: {
			agility: baseValue + 2
		}
	},
	usageRequirements: ['unnoticed'],
	addDamageBonus: (dmg) => dmg + 6,
	retroactivelyLowerCritRoll: (critRoll) => critRoll - 2,
	retroactivelyIncreaseCritRoll: (critRoll) => critRoll += 2
}

// PUT IN PLUGIN
const flight = {
	key: 'flight',
	name: 'Flyga',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const gamesAndGambling = {
	key: 'gamesAndGambling',
	name: 'Spel & dobbel',
	freeReroll: (roll) => freeReroll(roll)
}

const hardy = {
	key: 'hardy',
	name: 'Härdad',
	addMaxHealthBonus: (health) => health += 2
}

const intrusion = {
	key: 'intrusion',
	name: 'Inbrott',
	actionTimeLockpick: () => 1
}

const meticulous = {
	key: 'meticulous',
	name: 'Noggrann',
	usageRequirements: ['extendedAction'],
	freeReroll: (roll) => freeReroll(roll)
}

const performer = {
	key: 'performer',
	name: 'Underhållning',
	addGroupMoraleBonus: (morale) => morale += 1
}

const physician = {
	key: 'physician',
	name: 'Omvårdnad',
	requirements: {
		traits: ['arcane']
	},
	addHealCeilingBonus: (ceiling) => ceiling += 2
}

const resolve = {
	key: 'resolve',
	name: 'Beslutsam',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv),
	addAdvantage: (advantage) => addAdvantage(advantage)
}

const riding = {
	key: 'riding',
	name: 'Rida',
	usageRequirements: ['normalTerrain', 'road', 'mounted'],
	addNarrativeMovementSpeedBonus: (speed) => speed * 1.5,
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
	addReducedActionTime: (actionPointsCost) => actionPointsCost - 1
}

const seamanship = {
	key: 'seamanship',
	name: 'Sjövana',
	usageRequirements: ['boat'],
	addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
	addMoraleBonus: (morale) => morale += 2
}

const sixthSense = {
	key: 'sixthSense',
	name: 'Varsel',
	requirements: {
		traits: ['extrasensation'],
		attributes: {
			spirit: baseValue + 2,
		},
		metadata: {
			level: 21,
			isChosenByFate: true,
		},
	},
	sense: (ExtrasensationRolls) => ExtrasensationRolls += 1
}

const speechReading = {
	key: 'speechReading',
	name: 'Läppläsning',
	softUnlock: (fv) => removeSucRollPenalty(fv),
}

const survival = {
	key: 'survival',
	name: 'Överlevnad',
	addForagingBonus: (provisions) => provisions += 1
}

const thief = {
	key: 'thief',
	name: 'Stjäla',
	addAdvantage: (advantage) => addAdvantage(advantage),
	requirements: {
		traits: ['stealth']
	},
}

const tracking = {
	key: 'tracking',
	name: 'Spåra',
	softUnlock: (fv) => removeSucRollPenalty(fv),
	addForagingBonus: (provisions) => provisions + 1,
	addForagingBonusIfWinter: (provisions) => provisions + 1
}

const unarmouredFighting = {
	key: 'unarmouredFighting',
	name: 'Bar bringa',
	usageRequirements: ['unarmoured'],
	addInitiativeBonus: (initiative) => initiative + 1,
	addFateBonus: (fate) => fate += 4
}

const vigilant = {
	key: 'vigilant',
	name: 'Vaksam',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
}

const warfare = {
	key: 'warfare',
	name: 'Fältslag',
	usageRequirements: ['formation'],
	addFormationBonus: (fv) => fv += 1
}

const wayfinding = {
	key: 'wayfinding',
	name: 'Orientera',
	usageRequirements: ['roughTerrain', 'miserableTerrain'],
	addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
}

const weatherBeaten = {
	key: 'weatherBeaten',
	name: 'Väderbiten',
	addMoraleBonus: (morale) => morale += 1
}

const generalSkills = {
	craftsman,
	animalHusbandry,
	beastOfBurden,
	bookworm,
	brawling,
	carouse,
	cook,
	crafting,
	cutthroat,
	gamesAndGambling,
	hardy,
	intrusion,
	meticulous,
	performer,
	physician, 
	resolve,
	riding,
	seamanship,
	sixthSense,
	speechReading,
	survival,
	thief,
	tracking,
	unarmouredFighting,
	vigilant,
	warfare,
	wayfinding,
	weatherBeaten,

	flight,
}

export const generalSkillKeysList = () => Object.keys(generalSkills)
export const generalSkillKeysListNiceNameSorted = () => getNiceNameSortedList(generalSkillKeysList())

export default generalSkills
