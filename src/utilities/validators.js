import { contains, explodeInvalidList } from '../rules/utils'
import { equals } from './utils'

export const invalidChoiceIsNotDeselected = (key, invalidLevels, originalLevelChoiceKey, tempLevelChoiceKey) => {

/* 	console.log('key: ', key);
	console.log('invalidLevels: ', invalidLevels);
	console.log('originalLevelChoiceKey: ', originalLevelChoiceKey);
	console.log('tempLevelChoiceKey: ', tempLevelChoiceKey);
	console.log('----'); */

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
	if (isTouchedByError(key, invalidLevels)) return invalidLevels[selectedLevel] === key
	return true
}


