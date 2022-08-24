// * * M E C H A N I C S /  S P E L M E K A N I K * * //

// * * * N O T E P A D * * * //


// * * * C O N T E N T * * * //

export const mechanicsName = 'Spelmekanik'

const softUnlockBonus = 6

export const removeSucRollPenalty = (fv) => fv + softUnlockBonus
export const freeReroll = (roll) => console.log(roll)    // <--- this needs roll mechanics too
export const canPickExtractsOnForageRoll = (roll) => console.log(roll) // <--- this needs foraging
export const canChoseExtraEffects = () => console.log('can choose extra effects!');
export const canUseVia = () => console.log('can use via!');
export const canUseSigns = () => console.log('can use signs!');

export const addProficiencyBonus = (fv, increment) => fv + increment
export const addAdvantage = (roll, increment) => console.log(roll, increment)  // <--- this needs roll mechanics
export const multiplyActionTime = (actionTime, factor) => actionTime * factor
export const refineProvisions = (provisions, quality) => console.log(provisions, quality) // <--- this needs gear
export const addMaxCarryingCapacityBonus = (carryingCapacity) => console.log(carryingCapacity) // <--- this needs carryingCapacity
export const addForagingBonus = (provisions, increment) => provisions + increment

export const addOffensivePowerBonus = (power, increment) => {
    power.offensive += increment
    return power
}
export const addDefensivePowerBonus = (power, increment) => {
    power.defensive += increment
    return power
}