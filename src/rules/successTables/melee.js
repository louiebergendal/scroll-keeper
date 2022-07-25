import { Logger } from "sass"
import { sucRoll, d6 } from "../rolls"
import { useStore } from '../../stores/character'
import { traitWithOwnershipFromKey } from '../traits'

// character
const store = useStore()

// sums up attributeValue and attributeSkill
let fv = store.characterAttributes.battle
const attributeSkill = traitWithOwnershipFromKey('melee', store.characterTraits)
if (attributeSkill.isOwned) { fv = attributeSkill.addProficiencyBonus(fv) }

// makes the roll
const roll = sucRoll((fv+3), 0)
const successRating = roll.key
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


export default {}
