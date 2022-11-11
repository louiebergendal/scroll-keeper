import { contains, explodeInvalidList } from '../rules/utils'
import { equals } from './utils'

export const invalidChoiceIsNotDeselected = (key, invalidLevels, originalLevelChoiceKey, tempLevelChoiceKey) => {
	return isTouchedByError(
		key, invalidLevels)
		&& !(originalLevelChoiceKey === key && originalLevelChoiceKey !== tempLevelChoiceKey)
}

export const invalidChoiceIsNotUnChecked = (key, invalidLevels, originalLevelChoiceKeysList, tempLevelChoiceKeysList) => {
	return isTouchedByError(
		key, invalidLevels)
		&& !(contains(key, originalLevelChoiceKeysList) && !contains(key, tempLevelChoiceKeysList))
}

export const isTouchedByError = (key, invalidLevels) => {
	return contains(key, explodeInvalidList(invalidLevels))
}

export const isInvalidAtThisLevel = (key, invalidLevels, selectedLevel) => {
	if (isTouchedByError(key, invalidLevels)) {
		if (typeof invalidLevels[selectedLevel] === 'string') return invalidLevels[selectedLevel] === key
		return contains(key, invalidLevels[selectedLevel])
	} return false
}


