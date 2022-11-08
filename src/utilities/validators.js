import { contains, explodeInvalidList } from '../rules/utils'
import { equals } from './utils'

export const invalidChoiceIsNotDeselected = (key, invalidLevels, originalLevelChoiceKey, tempLevelChoiceKey) => {
	return contains(
		explodeInvalidList(invalidLevels), key)
		&& !(originalLevelChoiceKey === key && originalLevelChoiceKey !== tempLevelChoiceKey)
}

export const invalidChoiceIsNotUnChecked = (key, invalidLevels, originalLevelChoiceKeysList, tempLevelChoiceKeysList) => {
	return contains(
		explodeInvalidList(invalidLevels), key)
		&& !(contains(originalLevelChoiceKeysList, key) && !contains(tempLevelChoiceKeysList, key))
}

export const isTouchedByError = (key, invalidLevels) => {
	return contains(explodeInvalidList(invalidLevels), key)
}

export const isInvalidAtThisLevel = (key, invalidLevels, selectedLevel) => {
	if (isTouchedByError(key, invalidLevels)) {
		if (typeof invalidLevels[selectedLevel] === 'string') return invalidLevels[selectedLevel] === key
		return contains(invalidLevels[selectedLevel], key)
	} return false
}


