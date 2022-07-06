const traitNames = {
	battle: 'battle',
	agility: 'agility',
	spirit: 'spirit',
	knowledge: 'knowledge',
	physique: 'physique'
}

export const traits = {
	[traitNames.battle]: {
		key: traitNames.battle,
		longName: 'Kamp',
		shortName: 'KAM'
	},
	[traitNames.agility]: {
		key: traitNames.agility,
		longName: 'Smidighet',
		shortName: 'SMI'
	},
	[traitNames.spirit]: {
		key: traitNames.spirit,
		longName: 'Andlighet',
		shortName: 'AND'
	},
	[traitNames.knowledge]: {
		key: traitNames.knowledge,
		longName: 'Kunskap',
		shortName: 'KUN'
	},
	[traitNames.physique]: {
		key: traitNames.physique,
		longName: 'Fysik',
		shortName: 'FYS'
	}
}

export const baseValue = 3

export const setTraitValueName = (traitValue) => {
	const chosenPoints = traitValue - baseValue
	if (chosenPoints <= 1) return "Kass"
	if (chosenPoints <= 3) return "Halvdan"
	if (chosenPoints <= 5) return "Duglig"
	if (chosenPoints <= 7) return "Skicklig"
	return "Ypperlig"
}