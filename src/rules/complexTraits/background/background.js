import peoples from './peoples'
import upbringings from './upbringings'
import professions from './professions'

export const backgroundCategoryNiceNames = {
	people: 'Folk',
	upbringing: 'Uppväxt',
	profession: 'Livnäring'
}

export const getBackgroundSkillsListNiceNames = (key) => {
	if (peoples[key]) return peoples[key].niceName
	if (upbringings[key]) return upbringings[key].niceName
	if (professions[key]) return professions[key].niceName
	return null
}

export default {
	peoples,
	upbringings,
	professions
}
