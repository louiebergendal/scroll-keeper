import peoples from './peoples'
import upbringings from './upbringings'
import professions from './professions'
import chosenByFate from './chosenByFate'

export const backgroundCategoryNiceNames = {
	people: 'Folk',
	upbringing: 'Uppväxt',
	profession: 'Livnäring',
	chosenByFate: 'Ödesvald',
}

export const getBackgroundSkillsListNiceNames = (key) => {
	if (peoples[key]) return peoples[key].niceName
	if (upbringings[key]) return upbringings[key].niceName
	if (professions[key]) return professions[key].niceName
	if (chosenByFate[key]) return chosenByFate[key].niceName
	return null
}

export default {
	peoples,
	upbringings,
	professions,
	chosenByFate,
}
