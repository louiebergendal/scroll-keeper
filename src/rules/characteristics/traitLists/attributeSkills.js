import { addProficiencyBonus } from '../../mechanics.js'

const melee = {
    key: 'melee',
    name: 'Närkamp',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}
  
const accuracy = {
    key: 'accuracy',
    name: 'Pricksäkerhet',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const stealth = {
    key: 'stealth',
    name: 'Lönndom',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const athletics = {
    key: 'athletics',
    name: 'Spänstighet',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const extrasensation = {
    key: 'extrasensation',
    name: 'Förnimma',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const force = {
    key: 'force',
    name: 'Kraft',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const lore = {
    key: 'lore',
    name: 'Rykten & legender',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const arcane = {
    key: 'arcane',
    name: 'Arkana',
    addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const battle = {
	melee,
	accuracy
}

const agility = {
	stealth,
	athletics,
}

const spirit = {
	extrasensation,
	force,
}

const knowledge = {
	lore,
	arcane,
}

const attributeSkills = {
	battle,
	agility,
	spirit,
	knowledge
}

export default attributeSkills