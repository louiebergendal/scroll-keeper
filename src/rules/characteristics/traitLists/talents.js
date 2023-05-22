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
	complexTrait: {
		...complexTraitBackground
	}
}

export const steady = {
	key: 'steady',
	name: 'Stadig',
	description: 'Karaktären ökar skadebonus på sina egna anfall, och reducerar skadebonus på mottagna anfall, med 1.',
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
	description: 'Karaktären får 1 extra handling per stridsrunda.',
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
	description: 'Karaktären får 2 färdighetspoäng att placera i 2 olika kunskapsfärdigheter, samt +2 FV på 1 kunskapsslag retroaktivt.',
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
	description: 'Passivt svårare att upptäcka, samt +2 MV mot 1 vaksamhetsslag retroaktivt.',
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
	description: '2 gånger per spelmöte kan man slå ett framgångsslag för att se ifall någon talar sanning eller inte. Karaktären får också +2 MV mot 1 inflytandesslag.',
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
	description: 'Karaktärens följe färdas 25% snabbare offroad. Karaktären hittar 2 mer mat när den samlar och får +2 trevnad.',
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
	description: '+2 inflytande, samt +2 FV på 1 inflytandeslag retroaktivt.',
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
	description: 'Karaktären kan kasta besvärjelser.',
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
	description: '+1 skadebonus på avståndsanfall. Ytterligare +1 skadebonus ifall karaktären har siktat.',
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


/* advanced talents */

export const masterSpellCaster = {
	key: 'masterSpellCaster',
	name: 'Besvärjelsemästare',
	description: 'Karaktären får fler besvärjelser, samt mana dedikerat till cantrips varje spelmöte. Denna mana går inte att spara mellan spelmöten.',
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
	name: 'Våldsam',
	description: 'Karaktärens närstridsanfall får +1 skadebonus. Skadeyttringar orsakade av karaktären dubblas, givet att målet inte är gigantiskt.',
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
	description: 'Karaktären får +4 hälsa, reducerar skadebonus på mottagna anfall med 1, och räknas alltid som frisk då man räknar ut läkningstaket.',
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
	description: 'Karaktären får 2 underhuggare att bossa runt helt gratis. Skulle de dö så kan man rekrytera nya.',
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
	description: 'detta är en plugin.',
	requirements: {
		metadata: {
			level: 31,
			isChosenByFate: true,
		},
		attributes: {
			knowledge: baseValue + 4
		},
		traits: ['bookworm', 'crafting']
	},
}


/* export const jackOfAllTrades = {
	key: 'jackOfAllTrades',
	name: 'Mångsysslare',
	description: 'Karaktären får 1 allmän färdighet, och får 2 grundegenskapspoäng att placera på sina lägsta grundegenskaper.',
	requirements: {
		metadata: {
			level: 21
		},
	},
	complexTrait: {
		0: {
			choices: 1,
			list: [].concat(attributeSkills, generalSkills, knowledgeSkills, favouredTerrainSkills)
		},
		1: {
			choices: 2,
			list: Object.keys(attributes)
		},
	},
} */

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

	// advanced talents
	masterSpellCaster,
	brutal,
	massive,
	trustedHenchmen,
	//jackOfAllTrades,

	// plugins
	engineer
}