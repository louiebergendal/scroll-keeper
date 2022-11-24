import { containsKey, explodeInvalidList } from '../rules/utils'

export const invalidChoiceIsNotDeselected = (
	key,
	invalidLevels,
	originalLevelChoiceKey,
	tempLevelChoiceKey
) => {
	return isTouchedByError(key, invalidLevels)
		&& !(
			originalLevelChoiceKey === key
			&& originalLevelChoiceKey !== tempLevelChoiceKey
		)
}

export const invalidChoiceIsNotUnChecked = (
	key,
	invalidLevels,
	originalLevelChoiceKeysList,
	tempLevelChoiceKeysList
) => {
	return isTouchedByError(
		key, invalidLevels)
		&& !(
			containsKey(key, originalLevelChoiceKeysList)
			&& !containsKey(key, tempLevelChoiceKeysList)
		)
}

export const isTouchedByError = (key, invalidLevels) => {
	const isTouchedByError = containsKey(key, explodeInvalidList(invalidLevels))
	return isTouchedByError
}

export const isInvalidAtThisLevel = (key, invalidLevels, selectedLevel) => {
	if (isTouchedByError(key, invalidLevels)) {
		if (typeof invalidLevels[selectedLevel] === 'string') return invalidLevels[selectedLevel] === key
		return containsKey(key, invalidLevels[selectedLevel])
	} return false
}

// prototype touched-by-error error message handler
export const isInvalidAtLevel = (key, invalidLevels) => {
	for (const level in invalidLevels) {
		const invalidLevel = invalidLevels[level]
		if (isKey(key, invalidLevel)) return level
	}
	return false
}

function isKey(key, invalidLevel) {
	if (typeof invalidLevel === 'object' || 'array') {
		return containsKey(key, invalidLevel)
	}	return key === invalidLevel
}
