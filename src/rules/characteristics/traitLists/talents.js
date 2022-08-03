

// * * * Exports * * * //

export const steady = {
    key: 'steady',
    name: 'Stadig',
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
    key: 'quick',
    name: 'Kvick',
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

export const scholar = {
    key: 'scholar',
    name: 'Lärd',
    isOwned: false,
    requirements: {
        attributes: {
            knowledge: 5
        }
    },
    retroactivelyAddInformationRollBonus: (informationRollResult) => informationRollResult += 2,
    appendToTraitList: (characterTraitList, traitsToAppend) => characterTraitList.concat(traitsToAppend)
}

export const quiet = {
    key: 'quiet',
    name: 'Tyst',
    isOwned: false,
    requirements: {
        attributes: {
            agility: 5
        },
        traits: ['stealth']
    },
    retroactivelyAddStealthMVBonus: (mv) => mv += 2,
    decreasePartialSuccessRisk: (roll) => roll - 1 
}


export default {
    steady,
    quick,
    scholar,
    quiet
}