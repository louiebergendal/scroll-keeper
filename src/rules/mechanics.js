const proficiencyBonus = 2
const softUnlockBonus = 6

export const addProficiencyBonus = (fv) => fv + proficiencyBonus
export const removeSucRollPenalty = (fv) => fv + softUnlockBonus
export const addAdvantage = (roll) => console.log(roll)  // <--- this needs roll mechanics
export const freeReroll = (roll) => console.log(roll)    // <--- this needs roll mechanics too
export const canPickExtractsOnForageRoll = (roll) => console.log(roll) // <--- this needs foraging
export const canChoseExtraEffects = () => console.log('can chose extra effects!');
export const canUseVia = () => console.log('can use via!');
export const canUseSigns = () => console.log('can use signs!');
export const multiplyActionTime = (actionTime, factor) => actionTime * factor
export const refineProvisions = (provisions) => console.log(provisions) // <--- this needs gear
export const increaseCarryingCapacity = (carryingCapacity) => console.log(carryingCapacity) // <--- this needs carryingCapacity
export const IncreaseForagingByOne = (provisions) => provisions + 1
