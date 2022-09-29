export const contains = (list, key) => list.includes(key)

export const levelChoiceIsValid = ( levelChoice, invalidLevels ) => {
    for (const invalidLevel in invalidLevels) {
		if (invalidLevels[invalidLevel] === levelChoice) return false
	}
	return true
}

export const capitalize = (string) => {
	const capitalizedLetter = string.charAt(0).toUpperCase()
	const remainingString = string.slice(1, string.length)
	return capitalizedLetter + remainingString
}

