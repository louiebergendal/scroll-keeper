import { Logger } from "sass"

export function sucRoll(fv, sv, mv = 0) {
  let result = d8(2)
	console.log("result: ", result)
}

export function d8(dieAmount, advantage = 1) {
	const advantageDiceAmount = Math.abs(advantage)
	const totalDieAmount = (dieAmount + advantageDiceAmount)
	let rollsArray = []
	let rollTotal = 0;

	// roll the dice
	for (let i = 0; i < totalDieAmount; i++) {
		const roll = Math.floor(Math.random() * 8) + 1
		console.log('- roll: ', roll);
		rollsArray.push(roll)
	}
	rollsArray = accountForAdvantage(rollsArray, advantage)

	return {
		rolls: rollsArray,
		rollTotal
	}
}

function accountForAdvantage(rollsArray, advantage = 0) {
	console.log('rollsArray before: ', rollsArray);
	const advantageDiceAmount = Math.abs(advantage)
	let newRollsArray = [...rollsArray] // copy array, to make sure the original is not mutated

	// account for advantage
	if (advantage > 0) { newRollsArray = removeLowest(newRollsArray, advantageDiceAmount) }

	// account for disadvantage
	if (advantage < 0) { newRollsArray = removeHighest(newRollsArray, advantageDiceAmount) }

	console.log('rollsArray after: ', newRollsArray);
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

// test
console.log('d8(2, -3): ', d8(2, 4));