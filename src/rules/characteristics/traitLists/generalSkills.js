import { 
    addProficiencyBonus,
    removeSucRollPenalty,
    addAdvantage,
    freeReroll,
    multiplyActionTime,
    refineProvisions,
    addMaxCarryingCapacityBonus
} from '../../mechanics.js'

const animalHusbandry = {
    key: 'animalHusbandry', // should the key have the same spelling as the object?
    name: 'Djurskötsel',
    isOwned: false,
    addAdvantage: (advantage) => addAdvantage(advantage),
    loyalAnimal: (beast) => beast.loyal = true
}

const beastOfBurden = {
    key: 'beastOfBurden',
    name: 'Packåsna',
    isOwned: false,
    addMaxCarryingCapacityBonus: (carryingCapacity) => addMaxCarryingCapacityBonus(carryingCapacity)
}

const bookworm = {
    key: 'bookworm',
    name: 'Bokmal',
    isOwned: false,
    requirements: {
        attributes: {
            knowledge: 5
        }
    },
    softUnlock: (fv) => removeSucRollPenalty(fv),
    fastReader: (actionTime) => multiplyActionTime(actionTime, 0.5)
}

const brawling = {
    key: 'brawling',
    name: 'Slagsmål',
    isOwned: false,
    requirements: {
        traits: ['melee']
    },
    usageRequirements: ['unarmed'],
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    retroactivelyLowerOffensivePower: (power) => power - 2,
    retroactivelyLowerCritRoll: (critRoll) => critRoll - 2
}

const carouse = {
    key: 'carouse',
    name: 'Berusningsvana',
    isOwned: false,
    usageRequirements: ['drunk'],
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    freeReroll: (roll) => freeReroll(roll)
}

const cook = {
    key: 'cook',
    name: 'kok-konst',
    isOwned: false,
    usageRequirements: ['fire'],
    addGroupMoraleBonus: (morale) => morale + 1,
    refineProvisions: (provisions) => refineProvisions(provisions)
}

const crafting = {
    key: 'crafting',
    name: 'Hantverk',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const cutthroat = {
    key: 'cutthroat',
    name: 'Överfall',
    isOwned: false,
    requirements: {
        attributes: {
            agility: 5
        }
    },
    usageRequirements: ['unnoticed'],
    addDamageBonus: (dmg) => dmg + 6,
    retroactivelyLowerCritRoll: (critRoll) => critRoll - 2,
    retroactivelyIncreaseCritRoll: (critRoll) => critRoll += 2
}

const fast = {
    key: 'fast',
    name: 'Flyfotad',
    isOwned: false,
    requirements: {
        attributes: {
            agility: 7
        }
    },
    usageRequirements: ['standing'],
    addFastMovementBonus: (movement) => movement++,
    addSprintMovementBonus:  (movement) => movement += 2
}

const hardy = {
    key: 'hardy',
    name: 'Härdad',
    isOwned: false,
    addMaxHealthBonus: (health) => health += 2
}

const intrusion = {
    key: 'intrusion',
    name: 'Inbrott',
    isOwned: false,
    actionTimeLockpick: () => 1
}

const meticulous = {
    key: 'meticulous',
    name: 'noggrann',
    isOwned: false,
    usageRequirements: ['extendedAction'],
    freeReroll: (roll) => freeReroll(roll)
}

const performer = {
    key: 'performer',
    name: 'Underhållning',
    isOwned: false,
    addGroupMoraleBonus: (morale) => morale += 1
}

const physician = {
    key: 'physician',
    name: 'Omvårdnad',
    isOwned: false,
    requirements: {
        traits: ['alchemy']
    },
    addHealCeilingBonus: (ceiling) => ceiling += 2
}

const resolve = {
    key: 'resolve',
    name: 'Beslutsamhet',
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    addAdvantage: (advantage) => addAdvantage(advantage)
}

const riding = {
    key: 'riding',
    name: 'Rida',
    isOwned: false,
    usageRequirements: ['normalTerrain', 'road', 'mounted'],
    addNarrativeMovementSpeedBonus: (speed) => speed * 1.5,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    addReducedActionTime: (actionPointsCost) => actionPointsCost - 1
}

const seamanship = {
    key: 'seamanship',
    name: 'Sjövana',
    isOwned: false,
    usageRequirements: ['boat'],
    addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    addMoraleBonus: (morale) => morale += 2
}

const tracking = {
    key: 'tracking',
    name: 'Spåra',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv),
    addForagingBonus: (provisions) => provisions + 1,
    addForagingBonusIfWinter: (provisions) => provisions + 1
}

const unarmouredFighting = {
    key: 'unarmouredFighting',
    name: 'Bar bringa',
    isOwned: false,
    usageRequirements: ['unarmoured'],
    addInitiativeBonus: (initiative) => initiative + 1,
    addFateBonus: (fate) => fate += 4
}

const vigilant = {
    key: 'vigilant',
    name: 'Vaksam',
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const warfare = {
    key: 'warfare',
    name: 'Fältslag',
    isOwned: false,
    usageRequirements: ['formation'],
    addFormationBonus: (fv) => fv += 1
}

const wayfinding = {
    key: 'wayfinding',
    name: 'Orientera',
    isOwned: false,
    usageRequirements: ['roughTerrain', 'miserableTerrain'],
    addGroupNarrativeMovementSpeedBonus: (speed) => speed * 1.25,
    addForagingBonus: (provisions) => provisions += 1
}

const weatherBeaten = {
    key: 'weatherBeaten',
    name: 'Väderbiten',
    isOwned: false,
    addMoraleBonus: (morale) => morale += 1
}

export default {
    animalHusbandry,
    beastOfBurden,
    bookworm,
    brawling,
    carouse,
    cook,
    crafting,
    cutthroat,
    fast,
    hardy,
    intrusion,
    meticulous,
    performer,
    physician, 
    resolve,
    riding,
    seamanship, 
    tracking,
    unarmouredFighting,
    vigilant,
    warfare,
    wayfinding,
    weatherBeaten
}
