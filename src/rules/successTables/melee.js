import { sucRoll, d6 } from '../rolls'
import { dealStrain } from '../strain'
import { traitWithOwnershipFromKey } from '../characteristics/traits'


export function meleeSuccessTable(sucRollResult) {

    const successRating = sucRollResult.key
    let result

    // success table
    if (successRating === 'totalFailure') {
        result = 'miss!'
        console.log('VML')
    }
    if (successRating === 'failure') {
        result = d6(1)
        console.log('failure - 1d6: ', result.rollResult)
    }
    if (successRating === 'partialSuccess') {
        result = d6(2)
        console.log('partialSuccess - 2d6: ', result.rollResult)
    }
    if (successRating === 'success') {
        result = d6(2, 1)
        console.log('success - 2d6+: ', result.rollResult)
    }
    if (successRating === 'triumph') {
        result = d6(3, 1)
        console.log('triumph - 3d6+: ', result.rollResult)
    }
}


export default {}
