// * * S K I L L S * * //
// TODO:
// - Fill in the missing skills
// - Generalise functions representing commonly occurring behaviours of skills
// - - If these common patterns grow into a large list, refactor into a new file

// * * Skill Rules * * //
const proficiencyBonus = 2
const addProficiencyBonus = (fv) => fv + proficiencyBonus


// * * traitSkills * * //

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


// * * generalSkills * * //

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


// * * Skill categories * * //

const traitSkillsList = {
  melee,
  accuracy,
  stealth,
  athletics,
  extrasensation,
  force,
  lore,
  alchemy
}

const generalSkillsList = {
  brawling
}


// * * Internal methods * * //

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

// * * Exports * * //

/**
* returns a traitSkills list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no characterSkills value
* will return a list where all skills have 'hasSkill: false'
*/
export function traitSkills(characterSkills = []) {
  let list = traitSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}

/**
* returns a generalSkills list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no characterSkills value
* will return a list where all skills have 'hasSkill: false'
*/
export function generalSkills(characterSkills = []) {
  const list = generalSkillsList
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}

/**
* returns a allSkills list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no characterSkills value
* will return a list where all skills have 'hasSkill: false'
*/
export function allSkills(characterSkills = []) {
  const list = {
    ...traitSkillsList,
    ...generalSkillsList
  }
  if (characterSkills.length) return assignOwnershipToSkills(list, characterSkills)
  return list
}
