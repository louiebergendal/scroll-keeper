import peoples from './peoples'
import upbringings from './upbringings'
import professions from './professions'

const peoplesDescription = 'Folket representerar din karaktärs etnicitet.'
const upbringingsDescription = 'Uppväxten representerar miljön i vilken din karaktär spenderade sin barndom.'
const professionsDescription = 'Livnäringen representerar din karaktärs yrke eller sysselsättning.'

export const backgroundCategoryNiceNames = {
	people: 'Folk',
	upbringing: 'Uppväxt',
	profession: 'Livnäring',
}

export const getBackgroundSkillsListNiceNames = (key) => {
	if (peoples[key]) return peoples[key].niceName
	if (upbringings[key]) return upbringings[key].niceName
	if (professions[key]) return professions[key].niceName
	return null
}

export default {
	peoples: {
		peoples: peoples,
		description: peoplesDescription
	},
	upbringings: {
		upbringings: upbringings,
		description: upbringingsDescription
	},
	professions: {
		professions: professions,
		description: professionsDescription
	},
}

