// * * M E C H A N I C S /  S P E L M E K A N I K * * //

// * * * N O T E P A D * * * //


// * * * C O N T E N T * * * //

export const mechanicsName = "Spelmekanik"

const proficiencyBonus = 2
const softUnlockBonus = 6

export const addProficiencyBonus = (fv) => fv + proficiencyBonus
export const removeSucRollPenalty = (fv) => fv + softUnlockBonus
export const addAdvantage = (roll) => console.log(roll)  // <--- this needs roll mechanics
export const freeReroll = (roll) => console.log(roll)    // <--- this needs roll mechanics too
export const canPickExtractsOnForageRoll = (roll) => console.log(roll) // <--- this needs foraging
export const canChoseExtraEffects = () => console.log('can choose extra effects!');
export const canUseVia = () => console.log('can use via!');
export const canUseSigns = () => console.log('can use signs!');
export const multiplyActionTime = (actionTime, factor) => actionTime * factor
export const refineProvisions = (provisions) => console.log(provisions) // <--- this needs gear
export const increaseCarryingCapacity = (carryingCapacity) => console.log(carryingCapacity) // <--- this needs carryingCapacity
export const increaseForagingByOne = (provisions) => provisions + 1
