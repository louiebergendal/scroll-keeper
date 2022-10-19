// Bonus type saved to db for comparison if rules are updated

export const blankCharacter = {
	metadata: {
		name: 'Noob',
		level: 1,
		isChosenByFate: false,
		invalidLevels: {}
	},
	state: {
		currentStrain: {
			damage: 0,
			fatigue: 0
		}
	},
	history: {
		1: {
			bonusType: 'talent',
			choice: 'background'
		}
	}
}