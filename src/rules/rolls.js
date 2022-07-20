export function sucRoll(fv, sv, mv = 0) {
  let result = d8(2)
	console.log("result: ", result)
}

export function d8(n = 2) {
	let rollsArray = []
	let rollTotal = 0
	for (let i = 0; i < n; i++) {
		const roll = Math.floor(Math.random() * 8) + 1
		rollsArray.push(roll)
		rollTotal += roll
	}
	return {
		rolls: rollsArray,
		rollTotal
	}
}