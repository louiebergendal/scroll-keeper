import { addProficiencyBonus } from "../mechanics.js"



const melee = {
    key: "melee",
    name: "Närkamp",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}
  
const accuracy = {
    key: "accuracy",
    name: "Pricksäkerhet",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const stealth = {
    key: "stealth",
    name: "Lönndom",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const athletics = {
    key: "athletics",
    name: "Spänstighet",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const extrasensation = {
    key: "extrasensation",
    name: "Förnimma",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const force = {
    key: "force",
    name: "Kraft",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const lore = {
    key: "lore",
    name: "Rykten & legender",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const alchemy = {
    key: "alchemy",
    name: "Kropp & brygder",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}



export default {
    melee,
    accuracy,
    stealth,
    athletics,
    extrasensation,
    force,
    lore,
    alchemy
}