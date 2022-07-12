// * * INTERNAL * * //

const proficiencyBonus = 2
const addProficiencyBonus = (fv) => fv + proficiencyBonus

// * * EXPORTED * * //

// * * TraitSkills * * //
const melee = {
    key: "melee",
    name: "Närkamp",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const accuracy = {
    key: "accuracy",
    name: "Pricksäkerhet",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const stealth = {
    key: "stealth",
    name: "Lönndom",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const athletics = {
    key: "athletics",
    name: "Spänstighet",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const extrasensation = {
    key: "extrasensation",
    name: "Förnimma",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const force = {
    key: "force",
    name: "Kraft",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const lore = {
    key: "lore",
    name: "Rykten & legender",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}

const alchemy = {
    key: "alchemy",
    name: "Kropp & brygder",
    hasSkill: false,
    addBonus: (fv) => addProficiencyBonus(fv)
}


// * * General Skills * * //

const brawling = {
    key: "brawling",
    name: "Slagsmål",
    hasSkill: false,
    requirements: {
        skills: ['melee']
    },
    usageRequirements: ['unarmed'],
    addBonus: (fv) => addProficiencyBonus(fv),
    retroactivelyLowerDamageBonus: (damageBonus) => damageBonus - 2,
    retroactivelyLowerCritRoll: (critRoll) => critRoll - 2
}


// * * * * * * * * //

export const traitSkills = {
    melee,
    accuracy,
    stealth,
    athletics,
    extrasensation,
    force,
    lore,
    alchemy
}

export const generalSkills = {
    brawling
}

export const allSkills = {
    ...traitSkills,
    ...generalSkills
}
