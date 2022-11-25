export const blankCharacter = {
	metadata: {
		name: 'Noob',
		level: 1,
		isChosenByFate: false,
		invalidLevels: {},
		selectedLevel: 1,
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
						0: {
							0: ''
						},
						1: {
							0: ''
						},
					}
				},
				upbringing: {
					key: '',
					choices: {
						0: {
							0: ''
						},
						1: {
							0: ''
						},
					}
				},
				profession: {
					key: '',
					choices: {
						0: {
							0: ''
						},
						1: {
							0: ''
						},
					}
				}
			}
		},
	}
}