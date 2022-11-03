export const baseValue = 0
export const fateNiceName = 'Öde'

export const accountForFate = (strainSum, fate) => {
	
	strainSum -= fate
	if (strainSum < 0) { strainSum = 0 }

	fate -= strainSum
	if (fate > 0) { fate = 0 }

	let remainder = {
		strainRemainder: strainSum,
		fateRemainder: fate
	}

	return remainder
}