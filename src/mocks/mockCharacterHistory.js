// Bonus type saved to db for comparison if rules are updated

const VilleVakt = {
	metadata: {
		name: "Ville Vakt",
		currentLevel: 11
	},
	state: {
		currentStrain: {
			damage: 3,
			fatigue: 6
		}
	},
	history: {
		1: {
			bonusType: "talent",
			choice: "background"
		},
		2: {
			bonusType: "attribute",
			choice: "battle"
		},
		3: {
			bonusType: "skill",
			choice: "unarmouredFighting"
		},
		4: {
			bonusType: "attribute",
			choice: "battle"
		},
		5: {
			bonusType: "fate",
			choice: ""
		},
		6: {
			bonusType: "attribute",
			choice: "physique"
		},
		7: {
			bonusType: "competence",
			choice: ""
		},
		8: {
			bonusType: "attribute",
			choice: "physique"
		},
		9: {
			bonusType: "skill",
			choice: "hardy"
		},
		10: {
			bonusType: "attribute",
			choice: "agility"
		},
		11: {
			bonusType: "talent",
			choice: "steady"
		}
	}
}

export {
    VilleVakt
}