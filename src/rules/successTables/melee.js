import { damageRoll } from '../rolls'
import { dealStrain } from '../strain'

export function meleeSuccessTable(sucRollResult, targetCharacter, offensivePower) {
	const successRating = sucRollResult.key
	let damageRollResult

	// success table
	if (successRating === 'totalFailure') {
		damageRollResult = 'miss!'
	}
	if (successRating === 'failure') {
		damageRollResult = damageRoll(targetCharacter, 1, offensivePower, 0)
	}
	if (successRating === 'partialSuccess') {
		damageRollResult = damageRoll(targetCharacter, 2, offensivePower, 0)
	}
	if (successRating === 'success') {
		damageRollResult = damageRoll(targetCharacter, 2, offensivePower, 1)
	}
	if (successRating === 'triumph') {
		damageRollResult = damageRoll(targetCharacter, 3, offensivePower, 1)
	}

	const strain = dealStrain(damageRollResult, true)

	return strain
}
