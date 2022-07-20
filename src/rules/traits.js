// * * * S K I L L S  /  F Ä R D I G H E T E R * * * //

// * * * N O T E P A D * * * //

// RULE CHANGES:
// - Removed "night owl"

// * * * C O N T E N T * * * //

import attributeSkillsList from './traitLists/attributeSkills'
import generalSkillsList from './traitLists/generalSkills'
import knowledgeSkillsList from './traitLists/knowledgeSkills'
import favouredTerrainSkillsList from './traitLists/favouredTerrainSkills'
import talentsList from './traitLists/talents'
import { Logger } from 'sass'

const name = "Färdigheter"

const allTraitsList = {
  ...attributeSkillsList,
  ...generalSkillsList,
  ...knowledgeSkillsList,
  ...favouredTerrainSkillsList,
  ...talentsList
}

// * * * Internal functions * * * //
/**
* compares a characterSkills array to skillList and assigns 'hasSkill: true'
* to the skills that have been chosen by the character
*/
function assignOwnershipToSkills(skillList, characterSkills) {
  let skillListWithOwnership = {}
  Object.assign(skillListWithOwnership, skillList)
  Object.keys(skillListWithOwnership).forEach(skillIndex => {
    characterSkills.forEach(characterSkill => {
      if (characterSkill === skillListWithOwnership[skillIndex].key) {
        skillListWithOwnership[skillIndex].hasSkill = true
      }
    })
  })
  return skillListWithOwnership
}

function skillWithOwnershipFromSkill(skill, characterSkills = []) {
  let skillWithOwnership = {}
  Object.assign(skillWithOwnership, skill)
  characterSkills.forEach(characterSkill => {
    if (characterSkill === skillWithOwnership.key) {
      skillWithOwnership.hasSkill = true
    }
  })
  return skillWithOwnership
}

// * * * Exports * * * //

/**
* user-friendly title
*/
export const skillsName = name

/**
* Returns a 'attributeSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function attributeSkills(characterSkills = []) {
  let list = attributeSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}

/**
* Returns a 'generalSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function generalSkills(characterSkills = []) {
  const list = generalSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}
/**
* Returns an array containing the keys of generalSkillsList
*/
export const generalSkillListKeys = () => Object.keys(generalSkillsList)

/**
* Returns a 'knowledgeSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function knowledgeSkills(characterSkills = []) {
  const list = knowledgeSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}
/**
* Returns an array containing the keys of knowledgeSkillsList
*/
export const knowledgeSkillListKeys = () => Object.keys(knowledgeSkillsList)

/**
* Returns a 'favouredTerrainSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function favouredTerrainSkills(characterSkills = []) {
  const list = favouredTerrainSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}
/**
* Returns an array containing the keys of favouredTerrainSkillsList
*/
export const favouredTerrainSkillListKeys = () => Object.keys(favouredTerrainSkillsList)

/**
* Returns an 'allSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function allSkills(characterSkills = []) {
  const list = allTraitsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}
/**
* Returns an array containing the keys of allTraitsList
*/
export const allSkillListKeys = () => Object.keys(allTraitsList)

/**
* Compares a characterSkills array to a single skill and assigns 'hasSkill: true'
* to the skill if it has been chosen by the character.
*/
export function skillWithOwnershipFromKey(skillKey, characterSkills = []) {
  const skill = allTraitsList[skillKey]
  const skillWithOwnership = skillWithOwnershipFromSkill(skill, characterSkills)
  return skillWithOwnership
}

// * * * I N D E P E N D E N T  U T I L I T I E S * * * //
// Functions that are skill related and should be served by the skills module,
// but that do not rely on the contents of this file or its imports.

// TODO:

// canChooseSkill(flatCharacter, skillKey) => return boolean,
// Does the character fill the requirements for choosing a specific skill?

export function canChooseSkill(skillKey, flatCharacter) {
  
  // access target skills requirements
  const skill = allTraitsList[skillKey]

  if (skill.requirements) {
    let requirementsAreMet = true

    // check required skills
    if (skill.requirements.skills) {
      const requiredSkills = skill.requirements.skills

      requiredSkills.forEach(requiredSkill => {
        if(!hasSkill(requiredSkill, flatCharacter.characterSkills)) {
          requirementsAreMet = false
        }
      })
    }

    // check required attributes
    if (skill.requirements.attributes) {
      const requiredAttributeKeys = Object.keys(skill.requirements.attributes)

      requiredAttributeKeys.forEach(requiredAttributeKey => {
        const requiredAttributeValue = skill.requirements.attributes[requiredAttributeKey]
        const characterAttributeValue = flatCharacter.characterAttributes[requiredAttributeKey]

        if (requiredAttributeValue > characterAttributeValue) {
          requirementsAreMet = false
        }
      })
    }

    // check required talents
    if (skill.requirements.talents) {
      const requiredTalents = skill.requirements.talents

      requiredTalents.forEach(requiredTalent => {
        if(!hasTalent(requiredTalent, flatCharacter.characterTalents)) {
          requirementsAreMet = false
        }
      })
    }

    return requirementsAreMet
  }
}


export function hasSkill(skillKey, characterSkills) {
  return characterSkills.includes(skillKey) ? true : false
}

