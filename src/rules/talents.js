const steady = {
    key: "steady",
    name: "Stadig",
    isOwned: false,
    requirements: {
        traits: {
            battle: 5,
            physique: 5
        }
    },
    addOutgoingDamagebonus: (damageBonus) => damageBonus + 1,
    reduceincommingDamageBonus: (damageBonus) => damageBonus - 1
}

const quick = {
    key: "quick",
    name: "Kvick",
    isOwned: false,
    requirements: {
        traits: {
            battle: 5,
            agility: 5
        }
    },
    usageRequirements: ['healthy'],
    addAction: (actionPoints) => actionPoints + 1
}



export default {
    steady,
    quick
}