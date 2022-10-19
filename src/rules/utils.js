export const contains = (list, key) => {
	if (typeof list === 'object') list = Object.values(list)
	return list.includes(key)
}

export const findDuplicates = (arr) => {
	let sorted_arr = arr.slice().sort();
	let results = [];

	for (let i = 0; i < sorted_arr.length - 1; i++) {
	  if (sorted_arr[i + 1] == sorted_arr[i]) {
		results.push(sorted_arr[i]);
	  }
	}

	return results;
}

export const capitalize = (string) => {
	const capitalizedLetter = string.charAt(0).toUpperCase()
	const remainingString = string.slice(1, string.length)
	return capitalizedLetter + remainingString
}

