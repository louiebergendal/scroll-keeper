

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
    addPowerBonus: (power) => {
        power.offensive += 1
        power.defensive += 1
        return power
    }
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
    addBasicActionPointsBonus: (actionPoints) => {
        actionPoints.basic += 1
        return actionPoints
    }
}


export default {
    steady,
    quick
}