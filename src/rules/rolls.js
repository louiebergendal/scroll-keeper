// * * * R O L L S  /  T Ä R N I N G S S L A G * * * //


// * * * C O N T E N T * * * //

import { Logger } from 'sass'

// * * * Internal functions * * * //

/**
* diceRoll:
* - Rolls a set of identical dice and returns an object containg the result of each individual roll and their total value.
* @param {number} diceSides - The amount of sides on each die
* @param {number} diceAmount - The amount of dice to be rolled
* @param {number[]} [advantage] - A positive value represents 'advantage', and a negative value represnts 'disadvantage'
*/
function diceRoll(diceSides, diceAmount, advantage = 0) {
	const advantageDiceAmount = Math.abs(advantage)
	const totalDiceAmount = (diceAmount + advantageDiceAmount)
	let rollsArray = []
	let rollResult = 0

	// roll the dice
	for (let i = 0; i < totalDiceAmount; i++) {
		const roll = Math.floor(Math.random() * diceSides) + 1
		rollsArray.push(roll)
	}

	console.log('raw rollsArray(', 'd', diceSides, '): ', rollsArray)

	// account for advantage
	rollsArray = removeAdvantageDice(rollsArray, advantage)

	// sum up the result
	rollsArray.forEach(roll => {
		rollResult += roll
	})

	return {
		rolls: rollsArray,
		rollResult
	}
}

/**
* removeAdvantageDice:
* - Removes an amount of lowest or highest results from a diceRoll
* @param {number} rollsArray - The amount of dice to be rolled
* @param {number[]} [advantage] - A positive value represents 'advantage', and a negative value represnts 'disadvantage'
*/
function removeAdvantageDice(rollsArray, advantage = 0) {
	const advantageDiceAmount = Math.abs(advantage)
	let newRollsArray = [...rollsArray] // copy array, to make sure the original is not mutated
	if (advantage > 0) { newRollsArray = removeLowest(newRollsArray, advantageDiceAmount) }
	if (advantage < 0) { newRollsArray = removeHighest(newRollsArray, advantageDiceAmount) }
	return newRollsArray
}

function removeLowest(rollsArray, amount) {
	const newRollsArray = [...rollsArray] // copy array, to make sure the original is not mutated
	for (let i = 0; i < amount; i++) { 
		const lowestRoll = Math.min(...newRollsArray)
		const indexOfLowestRoll = newRollsArray.indexOf(lowestRoll)
		newRollsArray.splice(indexOfLowestRoll, 1) 
	}
	return newRollsArray
}

function removeHighest(rollsArray, amount) {
	const newRollsArray = [...rollsArray] // copy array, to make sure the original is not mutated
	for (let i = 0; i < amount; i++) { 
		const highestRoll = Math.max(...newRollsArray)
		const indexOfHighestRoll = newRollsArray.indexOf(highestRoll)
		newRollsArray.splice(indexOfHighestRoll, 1) 
	}
	return newRollsArray
}


// * * * Exports * * * //

/**
* d8:
* - Rolls a set of D8 and returns an object containg the result of each individual roll and their total value.
* @param {number} diceAmount - The amount of d8 to be rolled
* @param {number[]} [advantage] - A positive value represents 'advantage', and a negative value represnts 'disadvantage'
*/
export function d8(diceAmount, advantage = 0) {
	return diceRoll(8, diceAmount, advantage)
}

/**
* d6:
* - Rolls a set of D6 and returns an object containg the result of each individual roll and their total value.
* @param {number} diceAmount - The amount of d6 to be rolled
* @param {number[]} [advantage] - A positive value represents 'advantage', and a negative value represnts 'disadvantage'
*/
export function d6(diceAmount, advantage = 0) {
	return diceRoll(6, diceAmount, advantage)
}

/**
* sucRoll:
* - Makes a 'Success roll' and returns an object containing the a 'key' and 'rollResult'.
* @param {number} fv - the characters value
* @param {number} sv - the situations value
* @param {number[]} [advantage] - A positive value represents 'advantage', and a negative value represnts 'disadvantage'.
* @param {number[]} [mv] - the opposing characters value
*/
export function sucRoll(fv, sv, options = {}) {
	const advantage = options.advantage ? options.advantage : 0
	const mv = options.mv ? options.mv : 0

	const diceRollObject = d8(2, advantage)
	const rollResult = diceRollObject.rollResult
	const finalResult = (rollResult + fv + sv - mv)

	if (finalResult >= 23) return { key: 'triumph', 		rollResult: finalResult }
	if (finalResult >= 20) return { key: 'success', 		rollResult: finalResult }
	if (finalResult >= 17) return { key: 'partialSuccess', 	rollResult: finalResult }
	if (finalResult >= 14) return { key: 'failure', 		rollResult: finalResult }
	if (finalResult <= 13) return { key: 'totalFailure', 	rollResult: finalResult }
}

export function damageRoll(targetCharacter, diceAmount, offensivePower, advantage = 0) {
	const power = offensivePower - targetCharacter.getPower.defensive

	// roll d6
	let rollsList = d6(diceAmount, advantage).rolls

	// account for offensive and defensive power
	const modifiedRollsList = rollsList.map(roll => {
		roll += power
		if (roll < 0) { roll = 0 }
		return roll 
	})

	// sumup
	const sum = modifiedRollsList.reduce((a, b) => a + b)

	return sum
}

