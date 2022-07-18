// * * S K I L L S * * //
import traitSkillsList from './skillLists/traitSkills'
import generalSkillsList from './skillLists/generalSkills'
import knowledgeSkillsList from './skillLists/knowledgeSkills'
import favouredTerrainSkillsList from './skillLists/favouredTerrainSkills'

const name = "Färdigheter"
const allSkillsList = {
  ...traitSkillsList,
  ...generalSkillsList,
  ...knowledgeSkillsList,
  ...favouredTerrainSkillsList
}

console.log('allSkillsList: ', allSkillsList);

// TODO:
// - Fill in the missing skills
// - Skill code should be ordered alphabetically
// - Generalise functions representing commonly occurring behaviours of skills
// - - Example: "addProficiencyBonus"

// STUFF:
// - Removed "night owl"



// * * Internal functions * * //
/**
* compares a characterSkills array to skillList and assigns 'hasSkill: true'
* to the skills that have been chosen by the character
*/
function assignOwnershipToSkills(skillList, characterSkills) {
  let skillListWithOwnership = {}
  Object.assign(skillListWithOwnership, skillList)
  Object.keys(skillListWithOwnership).forEach(skillIndex => {
    characterSkills.forEach(characterSkill => {

      if (characterSkill === skillListWithOwnership[skillIndex].key ) {
        skillListWithOwnership[skillIndex].hasSkill = true
      }
    })
  })
  return skillListWithOwnership
}

function skillWithOwnershipFromSkill(skill, characterSkills = []) {

  //  makes a copy of the parameter skillObject
  let skillWithOwnership = {}
  Object.assign(skillWithOwnership, skill)

  // loops and checks if the skill matches any skill in characterSkills
  characterSkills.forEach(characterSkill => {
    if (characterSkill === skillWithOwnership.key) {

      // tells the skill that it is owned
      skillWithOwnership.hasSkill = true
    }
  })

  return skillWithOwnership
}

// * * Exports * * //
/**
* user-friendly title
*/
export const skillsName = name

/**
* Returns a 'traitSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function traitSkills(characterSkills = []) {
  let list = traitSkillsList
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
* Returns a 'knowledgeSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function favouredTerrainSkills(characterSkills = []) {
  const list = favouredTerrainSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}

/**
* Returns an 'allSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
* will return a list where all skills have 'hasSkill: false'
*/
export function allSkills(characterSkills = []) {
  const list = allSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}

/**
* Compares a characterSkills array to a single skill and assigns 'hasSkill: true'
* to the skill if it has been chosen by the character.
*/
export function skillWithOwnershipFromKey(skillKey, characterSkills = []) {

  // use the skillKey to get the skillObject
  const skill = allSkillsList[skillKey]
  const skillWithOwnership = skillWithOwnershipFromSkill(skill, characterSkills)
  return skillWithOwnership
}



console.log('[accuracy, plupp]: ', skillWithOwnershipFromKey('melee', ['accuracy', 'plupp']));
console.log('[accuracy, melee]: ', skillWithOwnershipFromKey('melee', ['accuracy', 'melee']));
console.log('[melee, accuracy]: ', skillWithOwnershipFromKey('melee', ['melee', 'accuracy']));