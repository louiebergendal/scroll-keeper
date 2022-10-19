// Bonus type saved to db for comparison if rules are updated

const VilleVakt = {
	metadata: {
		name: 'Ville Vakt',
		currentLevel: 3,
		isChosenByFate: false,
		invalidLevels: {}
	},
	state: {
		currentStrain: {
			damage: 8,
			fatigue: 4
		}
	},
	history: {
		1: {
			bonusType: 'talent',
			choice: 'background',
			complexPayload: {
				people: {
					key: 'davanic',
					choices: {
						1: '',
						2: ''
					}
				},
				upbringing: {
					key: 'davanic',
					choices: {
						1: '',
						2: ''
					}
				},
				profession: {
					key: 'davanic',
					choices: {
						1: '',
						2: ''
					}
				}
			}
		},
		2: {
			bonusType: 'attribute',
			choice: 'battle'
		},
		3: {
			bonusType: 'skill',
			choice: 'basicKnowledgeDavand'
		},
		4: {
			bonusType: 'attribute',
			choice: 'physique'
		},
		5: {
			bonusType: 'fate',
			choice: ''
		},
		6: {
			bonusType: 'attribute',
			choice: 'agility'
		},
		7: {
			bonusType: 'competence',
			choice: ''
		},
		8: {
			bonusType: 'attribute',
			choice: 'battle'
		},
		9: {
			bonusType: 'skill',
			choice: 'accuracy'
		},
		10: {
			bonusType: 'attribute',
			choice: 'physique'
		},
		11: {
			bonusType: 'talent',
			choice: 'steady'
		},
		12: {
			bonusType: 'attribute',
			choice: 'battle'
		},
		13: {
			bonusType: 'skill',
			choice: 'favouredTerrainPlains'
		},
		14: {
			bonusType: 'attribute',
			choice: 'physique'
		},
		15: {
			bonusType: 'fate',
			choice: ''
		},
		16: {
			bonusType: 'attribute',
			choice: 'agility'
		},
		17: {
			bonusType: 'competence',
			choice: ''
		},
		18: {
			bonusType: 'attribute',
			choice: 'battle'
		},
		19: {
			bonusType: 'skill',
			choice: 'hardy'
		},
		20: {
			bonusType: 'attribute',
			choice: 'physique'
		},
		21: {
			bonusType: 'talent',
			choice: 'massive'
		},
		22: {
			bonusType: 'attribute',
			choice: 'battle'
		},
	}
}

export {
    VilleVakt
}