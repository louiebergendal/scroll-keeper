import { 
    addOffensivePowerBonus,
	addDefensivePowerBonus,
    addAdvantage,
    addProficiencyBonus
} from '../../mechanics.js'

import knowledgeSkills from './knowledgeSkills'
import favouredTerrainSkills from './favouredTerrainSkills'
import { baseValue } from '../attributes'

import complexTraitBackground from '../../complexTraits/background/background'

// * * * Exports * * * //

export const acrobat = {
	key: 'acrobat',
	name: 'Akrobatisk',
	requirements: {
		metadata: {
			level: 11,
		},
		attributes: {
			agility: baseValue + 2,
			physique: baseValue + 1
		},
		traits: ['athletics']
	},
	addFastMovementBonus: (movement) => movement ++,
	addSprintMovementBonus:  (movement) => movement += 2,
    addAdvantage: (advantage) => addAdvantage(advantage),
	quickWithdrawal: () => quickWithdrawal(),
	leapUp: () => leapUp(),
	reduceFallimngDamage: () => reduceFallimngDamage()
}

export const background = {
	key: 'background',
	name: 'Bakgrund',
	description: 'Rollpersonen kommer någonstans ifrån och har levt ett liv som påverkat vem den är och vad den kan. Det här kan antingen slås fram med tärning eller väljas. Vilken av metoderna som används får SL avgöra.',
	complexTrait: {
		...complexTraitBackground
	}
}

export const steady = {
	key: 'steady',
	name: 'Stadig',
	description: 'Man är stor, stark och helt uppenbart byggd för strid.',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			battle: baseValue + 2,
			physique: baseValue + 2
		}
	},
	addPowerBonus: (power) => {
		addOffensivePowerBonus(power, 1)
		addDefensivePowerBonus(power, 1)
		return power
	}
}

export const quick = {
	key: 'quick',
	name: 'Kvick',
	description: 'Man rör sig precist och snabbt, varsig man delar ut anfall eller undflyr vakter.',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			battle: baseValue + 2,
			agility: baseValue + 2
		}
	},
	usageRequirements: ['well'],
	addBasicActionPointsBonus: (actionPoints) => {
		actionPoints.basic += 1
		return actionPoints
	}
}

export const scholar = {
	key: 'scholar',
	name: 'Lärd',
	description: 'Man har samlat på sig en stor mängd kunskaper.',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			knowledge: baseValue + 2
		}
	},
	retroactivelyAddInformationRollBonus: (rollResult) => addProficiencyBonus(rollResult, 2),
	complexTrait: {
		0: {
			choices: 2,
			list: knowledgeSkills
		}
	}
}

export const quiet = {
	key: 'quiet',
	name: 'Tyst',
	description: 'Man rör sig tyst och placrar fötterna säkert.',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			agility: baseValue + 2
		},
		traits: ['stealth']
	},
	retroactivelyAddStealthMVBonus: (mv) => addProficiencyBonus(mv, 2),
	decreasePartialSuccessRisk: (roll) => roll - 1 
}

export const scrutiny = {
	key: 'scrutiny',
	name: 'Skärskåda',
	description: 'Man har förmågan att se med blotta ögat ifall någon far med osanning.',
	requirements: {
		metadata: {
			level: 11,
			isChosenByFate: true
		}
	},
	addScrutinyAction: () => addScrutinyAction(),
    addProficiencyBonus: (mv) => addProficiencyBonus(mv, 2),
}

export const pathfinder = {
	key: 'pathfinder',
	name: 'Stigfinnare',
	description: 'Man hittar de snabbaste rutterna, och går orörd genom ur och skur.',
	requirements: {
		metadata: {
			level: 11
		},
		traits: ['wayfinding']
	},
	addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
	addForagingBonus: (provisions) => provisions += 2,
	addMoraleBonus: (morale) => morale += 1,
	complexTrait: {
		0: {
			choices: 1,
			list: favouredTerrainSkills
		}
	}
}

export const silverTongued = {
	key: 'silverTongued',
	name: 'Silvertunga',
	description: 'Man framstår som en pålitlig person man gärna lyssnar på.',
	requirements: {
		metadata: {
			level: 11
		}
	},
	retroactivelyAddInfluenceRollBonus: (rollResult) => addProficiencyBonus(rollResult, 2),
    addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2),
    addProficiencyBonus: (mv) => addProficiencyBonus(mv, 2),
}

export const spellCaster = {
	key: 'spellCaster',
	name: 'Besvärjare',
	description: 'Man kan få universum att lyda sina tankar.',
	requirements: {
		metadata: {
			level: 11,
			isChosenByFate: true,
		},
		attributes: {
			spirit: baseValue + 2
		},
		traits: ['force']
	},
	addSpellbookPointsBonus: (spellBookPoints) => spellBookPoints += 5,
	canCastSpells: () => canCastSpells()
}

export const marksman = {
	key: 'marksman',
	name: 'Skarpskytt',
	description: '',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			battle: baseValue + 2,
			physique: baseValue + 1
		},
		traits: ['accuracy']
	},
	addPowerBonus: (power) => {
		power.offensive += 1
		return power
	}
}

export const lightningReflexes = {
	key: 'lightningReflexes',
	name: 'Blixtsnabba reflexer',
	requirements: {
		metadata: {
			level: 11
		},
		attributes: {
			agility: baseValue + 2
		},
	},
	addInitiativeSizeBonus: (initiative) => initiative -= 1,
	drawItemIsResponsiveAction: () => drawItemIsResponsiveAction()
}


/* advanced talents */

export const masterSpellCaster = {
	key: 'masterSpellCaster',
	name: 'Besvärjelsemästare',
	requirements: {
		metadata: {
			level: 31
		},
		attributes: {
			spirit: baseValue + 3
		},
		traits: ['spellCaster', 'knowledgeArcaneAdvanced']
	},
	addSpellbookPointsBonus: (spellBookPoints) => spellBookPoints += 2,
	addManaBonus: (mana) => mana + 1,
}

export const brutal = {
	key: 'brutal',
	name: 'Brutal',
	requirements: {
		attributes: {
			battle: 6,
		},
		traits: ['melee']
	},
	addPowerBonus: (power) => {
		power.offensive += 1
		return power
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
}

export const massive = {
	key: 'massive',
	name: 'Massiv',
	requirements: {
		attributes: {
			battle: baseValue + 2,
			physique: baseValue + 3,
		},
		traits: ['hardy', 'steady']
	},
	addPowerBonus: (power) => {
		power.defensive += 1
		return power
	},
	addAdvantage: (advantage) => addAdvantage(advantage),
	addMaxHealthBonus: (health) => health += 4,
}

export const trustedHenchmen = {
	key: 'trustedHenchmen',
	name: 'Trogna underhuggare',
	requirements: {
		metadata: {
			level: 21,
			isChosenByFate: true
		}
	},
	addLoyalMook: (mooksList) => addLoyalMook(mooksList)
}

// PUT IN PLUGIN
export const engineer = {
	key: 'engineer',
	name: 'Ingenjör',
	requirements: {
		metadata: {
			level: 30,
			isChosenByFate: true,
		},
		attributes: {
			knowledge: baseValue + 4
		},
		traits: ['bookworm', 'crafting']
	},
}
export const complexTalents = {
	scholar,
	pathfinder,
	background
}

export default {
	// basic talents
	acrobat,
	background,
	scrutiny,
	steady,
	quick,
	pathfinder,
	silverTongued,
	scholar,
	spellCaster,
	quiet,
	marksman,
	lightningReflexes,

	// advanced talents
	masterSpellCaster,
	brutal,
	massive,
	trustedHenchmen,

	engineer
}