// Bonus type saved to db for comparison if rules are updated

export const loaderCharacter = {
	metadata: {
		name: 'Loader',
		level: 0,
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
			choice: 'background',
			complexPayload: {
				people: {
					key: '',
					choices: {
						0: {},
						1: {},
					}
				},
				upbringing: {
					key: '',
					choices: {
						0: {},
						1: {},
					}
				},
				profession: {
					key: '',
					choices: {
						0: {},
						1: {},
					}
				}
			}
		},
	}
}