const wilderness = {
	key: 'wilderness',
	niceName: 'Vildmark',
	description: 'vildmark',
	skillsLists: {
		0: {
			choices: 1,
			list: ['wayfinding', 'tracking', 'weatherBeaten']
		},
        1: {
			choices: 1,
			list: ['favouredTerrainForest', 'favouredTerrainMountains', 'favouredTerrainPlains']
		}
	},
}

const rural = {
	key: 'rural',
	niceName: 'Bygd',
	description: 'bygd',
	skillsLists: {
		0: {
			choices: 1,
			list: ['animalHusbandry', 'beastOfBurden', 'wayfinding']
		},
        1: {
			choices: 1,
			list: ['favouredTerrainForest', 'favouredTerrainMountains', 'favouredTerrainPlains']
		}
	},
}

const urban = {
	key: 'urban',
	niceName: 'Stad',
	description: 'stad',
	skillsLists: {
		0: {
			choices: 1,
			list: ['vigilant', 'lore', 'carouse']
		},
        1: {
			choices: 1,
			list: ['favouredTerrainUrban']
		}
	},
}

const seafaring = {
	key: 'seafaring',
	niceName: 'Sjöfart',
	description: 'sjöfart',
	skillsLists: {
		0: {
			choices: 1,
			list: ['lore', 'crafting', 'weatherBeaten']
		},
        1: {
			choices: 1,
			list: ['seamanship']
		}
	},
}

export default {
    wilderness,
    rural,
    urban,
    seafaring
}