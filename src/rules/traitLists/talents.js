

// * * * Exports * * * //

export const steady = {
    key: "steady",
    name: "Stadig",
    isOwned: false,
    requirements: {
        attributes: {
            battle: 5,
            physique: 5
        }
    },
    addOutgoingDamagebonus: (damageBonus) => damageBonus + 1,
    reduceincommingDamageBonus: (damageBonus) => damageBonus - 1
}

export const quick = {
    key: "quick",
    name: "Kvick",
    isOwned: false,
    requirements: {
        attributes: {
            battle: 5,
            agility: 5
        }
    },
    usageRequirements: ['well'],
    addAction: (actionPoints) => actionPoints + 1
}

export default {
    steady,
    quick
}