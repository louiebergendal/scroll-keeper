

// * * * Exports * * * //

export const steady = {
	key: 'steady',
	name: 'Stadig',
	isOwned: false,
	requirements: {
		attributes: {
			battle: 5,
			physique: 5
		}
	},
	addPowerBonus: (power) => {
		power.offensive += 1
		power.defensive += 1
		return power
	}
}

export const quick = {
	key: 'quick',
	name: 'Kvick',
	isOwned: false,
	requirements: {
		attributes: {
			battle: 5,
			agility: 5
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
	isOwned: false,
	requirements: {
		attributes: {
			knowledge: 5
		}
	},
	retroactivelyAddInformationRollBonus: (informationRollResult) => informationRollResult += 2,
	appendToTraitList: (characterTraitList, traitsToAppend) => characterTraitList.concat(traitsToAppend)
}

export const quiet = {
	key: 'quiet',
	name: 'Tyst',
	isOwned: false,
	requirements: {
		attributes: {
			agility: 5
		},
		traits: ['stealth']
	},
	retroactivelyAddStealthMVBonus: (mv) => mv += 2,
	decreasePartialSuccessRisk: (roll) => roll - 1 
}

export const scrutiny = {
	key: 'scrutiny',
	name: 'Skärskåda',
	isOwned: false,
	requirements: {
		isChosenByFate: true
	},
	addScrutinyAction: () => addScrutinyAction(),
	addProficiencyBonus: (mv) => addProficiencyBonus(mv),
}

export const pathFinder = {
	key: 'pathFinder',
	name: 'Stigfinnare',
	isOwned: false,
	requirements: {
		traits: ['wayfinding']
	},
	addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
	addForagingBonus: (provisions) => provisions += 2,
	addMoraleBonus: (morale) => morale += 1,
	appendToTraitList: (characterTraitList, traitsToAppend) => characterTraitList.concat(traitsToAppend)
}

export const silverTongued = {
	key: 'silverTongued',
	name: 'Silvertunga',
	isOwned: false,
	retroactivelyAddInfluenceRollBonus: (influenceRollResult) => influenceRollResult += 2,
	addProficiencyBonus: (fv) => addProficiencyBonus(fv),
	addProficiencyBonus: (mv) => addProficiencyBonus(mv),
}

export const spellCaster = {
	key: 'spellCaster',
	name: 'Besvärjare',
	isOwned: false,
	requirements: {
		isChosenByFate: true,
		attributes: {
			spirit: 5
		},
		traits: ['force']
	},
	addSpellbookPointsBonus: (spellBookPoints) => spellBookPoints += 5,
	canCastSpells: () => canCastSpells()
}

export const marksman = {
	key: 'marksman',
	name: 'Skarpskytt',
	isOwned: false,
	requirements: {
		attributes: {
			battle: 5
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
	isOwned: false,
	requirements: {
		attributes: {
			agility: 5
		},
	},
	addInitiativeBonus: (initiative) => initiative + 1,
	drawItemIsResponsiveAction: () => drawItemIsResponsiveAction()
}

export const masterSpellCaster = {
	key: 'masterSpellCaster',
	name: 'Besvärjelsemästare',
	isOwned: false,
	requirements: {
		metadata: {
			level: 31
		},
		attributes: {
			agility: 7
		},
		traits: ['spellCaster']
	},
	addSpellbookPointsBonus: (spellBookPoints) => spellBookPoints += 2,
	addManaBonus: (mana) => mana + 1,
}

export const brutal = {
	key: 'brutal',
	name: 'Brutal',
	isOwned: false,
	requirements: {
		attributes: {
			battle: 7,
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
	isOwned: false,
	requirements: {
		attributes: {
			battle: 5,
			physique: 7,
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

/*
	artisan
	medicus
	trustedHenchmen
*/

export default {
	steady,
	quick,
	scholar,
	quiet,
	scrutiny,
	pathFinder,
	silverTongued,
	spellCaster,
	marksman,
	lightningReflexes,
	masterSpellCaster,
	brutal,
	massive
}