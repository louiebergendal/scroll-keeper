import { addProficiencyBonus } from '../../mechanics.js'
import { getNiceNameSortedList } from './traitsUtils.js'

const melee = {
	key: 'melee',
	name: 'Närkamp',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}
  
const accuracy = {
	key: 'accuracy',
	name: 'Pricksäkerhet',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const stealth = {
	key: 'stealth',
	name: 'Lönndom',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const athletics = {
	key: 'athletics',
	name: 'Spänstighet',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const extrasensation = {
	key: 'extrasensation',
	name: 'Varsel',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const force = {
	key: 'force',
	name: 'Kraft',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const lore = {
	key: 'lore',
	name: 'Rykten & legender',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const arcane = {
	key: 'arcane',
	name: 'Arkana',
	addProficiencyBonus: (fv) => addProficiencyBonus(fv, 2)
}

const battle = {
	melee,
	accuracy,
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

const flatAttributeSkills = {
	melee,
	accuracy,
	stealth,
	athletics,
	extrasensation,
	force,
	lore,
	arcane,
}

export const attributeSkillKeysList = () => Object.keys(flatAttributeSkills).sort()
export const attributeSkillKeysListNiceNameSorted = () => getNiceNameSortedList(attributeSkillKeysList())

export default attributeSkills