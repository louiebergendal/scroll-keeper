// * * S K I L L S * * //

const name = "Färdigheter"

// TODO:
// - Fill in the missing skills
// - Skill code should be ordered alphabetically
// - Generalise functions representing commonly occurring behaviours of skills
// - - Example: "addProficiencyBonus"
// - - Put these under the Skill Rules header
// - - If these common patterns grow into a large list, refactor into a new file

// STUFF:
// - Removed "night owl"


// * * Skill Rules * * //

const proficiencyBonus = 2
const softUnlockBonus = 6

const addProficiencyBonus = (fv) => fv + proficiencyBonus
const removeSucRollPenalty = (fv) => fv + softUnlockBonus
const addAdvantage = (roll) => console.log(roll)  // <--- this needs roll mechanics
const freeReroll = (roll) => console.log(roll)    // <--- this needs roll mechanics too

const canChoseExtraEffects = () => console.log('can chose extra effects!');
const canUseVia = () => console.log('can use via!');
const canUseSigns = () => console.log('can use signs!');

const multiplyActionTime = (actionTime, factor) => actionTime * factor
const refineProvisions = (provisions) => console.log(provisions) // <--- this needs gear

const increaseCarryingCapacity = (carryingCapacity) => console.log(carryingCapacity) // <--- this needs carryingCapacity

const canPickExtractsOnForageRoll = (roll) => console.log(roll) // <--- this needs foraging

// * * traitSkills * * //

const melee = {
  key: "melee",
  name: "Närkamp",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv) // <--- is this bad practice?
}

const accuracy = {
  key: "accuracy",
  name: "Pricksäkerhet",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const stealth = {
  key: "stealth",
  name: "Lönndom",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const athletics = {
  key: "athletics",
  name: "Spänstighet",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const extrasensation = {
  key: "extrasensation",
  name: "Förnimma",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const force = {
  key: "force",
  name: "Kraft",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const lore = {
  key: "lore",
  name: "Rykten & legender",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const alchemy = {
  key: "alchemy",
  name: "Kropp & brygder",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}


// * * generalSkills * * //

const animalHusbandry = {
  key: "animal husbandry", // should the key have the same spelling as the object?
  name: "Djurskötsel",
  hasSkill: false,
  addAdvantage: (sucRoll) => addAdvantage(sucRoll),
  loyalAnimal: (beast) => beast.loyal = true
}

const beastOfBurden = {
  key: "beast of burden",
  name: "Packåsna",
  hasSkill: false,
  increaseCarryingCapacity: (carryingCapacity) => increaseCarryingCapacity(carryingCapacity)
}

const bookworm = {
  key: "bookworm",
  name: "Bokmal",
  hasSkill: false,
  requirements: {
    traits: {
      knowledge: 5
    }
  },
  softUnlock: (fv) => removeSucRollPenalty(fv),
  fastReader: (actionTime) => multiplyActionTime(actionTime, 0.5)
}

const brawling = {
  key: "brawling",
  name: "Slagsmål",
  hasSkill: false,
  requirements: {
      skills: ['melee']
  },
  usageRequirements: ['unarmed'],
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  retroactivelyLowerDamageBonus: (damageBonus) => damageBonus - 2,
  retroactivelyLowerCritRoll: (critRoll) => critRoll - 2
}

const carouse = {
  key: "carouse",
  name: "Berusningsvana",
  hasSkill: false,
  usageRequirements: ['drunk'],
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const cook = {
  key: "cook",
  name: "kok-konst",
  hasSkill: false,
  usageRequirements: ['fire'],
  increaseGroupMorale: (morale) => morale + 1,
  refineProvisions: (provisions) => refineProvisions(provisions)
}

const crafting = {
  key: "crafting",
  name: "Hantverk",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv)
}

const cutthroat = {
  key: "cutthroat",
  name: "Överfall",
  hasSkill: false,
  requirements: {
    traits: {
      agility: 5
    }
  },
  usageRequirements: ['unnoticed'],
  increaseDamage: (dmg) => dmg + 6,
  retroactivelyLowerCritRoll: (critRoll) => critRoll - 2,
  retroactivelyIncreaseCritRoll: (critRoll) => critRoll + 2
}

const fast = {
  key: "fast",
  name: "Flyfotad",
  hasSkill: false,
  requirements: {
    traits: {
      agility: 7
    }
  },
  usageRequirements: ['standing'],
  increaseFastMovement: (movement) => movement + 1,
  increaseSprintMovement:  (movement) => movement + 2
}

const forager = {
  key: "forager",
  name: "Överlevnad",
  hasSkill: false,
  IncreaseForaging: (provisions) => provisions + 2
}

const hardy = {
  key: "hardy",
  name: "Härdad",
  hasSkill: false,
  addHealthBonus: (health) => health + 2
}

const intrusion = {
  key: "intrusion",
  name: "Inbrott",
  hasSkill: false,
  actionTimeRollPick: () => 1
}

const meticulous = {
  key: "meticulous",
  name: "noggrann",
  hasSkill: false,
  usageRequirements: ['formation'],
  freeReroll: (roll) => freeReroll(roll)
}

const performer = {
  key: "performer",
  name: "Underhållning",
  hasSkill: false,
  increaseGroupMorale: (morale) => morale + 1
}

const physician = {
  key: "physician",
  name: "Omvårdnad",
  hasSkill: false,
  requirements: {
    skills: ['alchemy']
  },
  increaseHealCealingForRestingCarachtersInGroup: (cealing) => cealing + 2
}

const resolve = {
  key: "resolve",
  name: "Beslutsamhet",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const riding = {
  key: "riding",
  name: "Rida",
  hasSkill: false,
  usageRequirements: ['normal terrain', 'road'],
  increaseGroupNarrativeMovementSpeed: (speed) => speed * 1.5
}

const seamanship = { // new name needed
  key: "seamanship",
  name: "Sjövana",
  hasSkill: false,
  usageRequirements: ['boat'],
  increaseGroupNarrativeMovementSpeed: (speed) => speed * 1.25,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  increaseMorale: (morale) => morale + 2
}

const tracking = { // new name needed
  key: "tracking",
  name: "Spåra",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv),
  IncreaseForaging: (provisions) => provisions + 1,
  IncreaseForagingIfWinter: (provisions) => provisions + 1
}

const unarmouredFighting = {
  key: "unarmoured fighting",
  name: "Bar bringa",
  hasSkill: false,
  usageRequirements: ['unarmoured'],
  addInitiative: (initiative) => initiative + 1,
  addFateAtBeginningOfCombat: (fate) => fate + 2
}

const vigilant = {
  key: "vigilant",
  name: "Vaksam",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv)
}

const warfare = {
  key: "warfare",
  name: "Fältslag",
  hasSkill: false,
  usageRequirements: ['formation'],
  addFormationBonus: (fv) => fv + 1
}

const wayfinding = {
  key: "wayfinding",
  name: "Orientera",
  hasSkill: false,
  usageRequirements: ['rough terrain', 'miserable terrain'],
  increaseGroupNarrativeMovementSpeed: (speed) => speed * 1.25
}

const weatherBeaten = {
  key: "weather-beaten",
  name: "Väderbiten",
  hasSkill: false,
  increaseMorale: (morale) => morale + 1
}

// * * AccustomedTo * * //

const accustomedToForest = { // placeholder name
  key: "accustomed to forest",
  name: "Vana (Skog)",
  hasSkill: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  IncreaseForaging: (provisions) => provisions + 1
}

// * * Knowledge skills * * //

const basicKnowledgeDavand = {
  key: "basic knowledge davand",
  name: "Ytlig kunskap (Davand)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeDavand = {
  key: "advanced knowledge davand",
  name: "Fördjupad kunskap (Davand)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge davand']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeVend = {
  key: "basic knowledge vend",
  name: "Ytlig kunskap (Vend)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeVend = {
  key: "advanced knowledge vend",
  name: "Fördjupad kunskap (Vend)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge vend']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSodor = {
  key: "basic knowledge sodor",
  name: "Ytlig kunskap (Sodor)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSodor = {
  key: "advanced knowledge Sodor",
  name: "Fördjupad kunskap (Sodor)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge sodor']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSidra = {
  key: "basic knowledge sidra",
  name: "Ytlig kunskap (Sidra)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSidra = {
  key: "advanced knowledge sidra",
  name: "Fördjupad kunskap (Sidra)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge sidra']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeChemistry = { // placeholder name
  key: "basic knowledge chemistry",
  name: "Ytlig kunskap (Extrakt)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv),
  canPickExtractsOnForageRoll: (roll) => canPickExtractsOnForageRoll(roll)
}

const advancedKnowledgeChemistry = { // placeholder name
  key: "advanced knowledge chemistry",
  name: "Fördjupad kunskap (Extrakt)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge chemistry']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll),
  canChoseExtraEffects: () => canChoseExtraEffects()
}

const basicKnowledgeArcane = {
  key: "basic knowledge arcane",
  name: "Ytlig kunskap (Magi)",
  hasSkill: false,
  softUnlock: (fv) => removeSucRollPenalty(fv),
  canUseVia: () => canUseVia(),
  canUseSigns: () => canUseSigns() // rungaldr
}

const advancedKnowledgeArcane = {
  key: "advanced knowledge arcane",
  name: "Fördjupad kunskap (Magi)",
  hasSkill: false,
  requirements: {
    skills: ['basic knowledge arcane']
  },
  addAdvantage: (sucRoll) => addAdvantage(sucRoll),
  addSpellbookPoint: (spellbookPoints) => spellbookPoints + 1
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
  animalHusbandry,
  beastOfBurden,
  bookworm,
  brawling,
  carouse,
  cook,
  crafting,
  cutthroat,
  fast,
  forager,
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
  weatherBeaten,
  accustomedToForest
}

const knowledgeSkillsList = {
  basicKnowledgeDavand,
  advancedKnowledgeDavand,
  basicKnowledgeVend,
  advancedKnowledgeVend,
  basicKnowledgeSodor,
  advancedKnowledgeSodor,
  basicKnowledgeSidra,
  advancedKnowledgeSidra,
  basicKnowledgeChemistry,
  advancedKnowledgeChemistry,
  basicKnowledgeArcane,
  advancedKnowledgeArcane,
}

const allSkillsList = {
  ...traitSkillsList,
  ...generalSkillsList,
  ...knowledgeSkillsList
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
* Returns an 'allSkills' list with 'hasSkill: true' assigned to
* the appropriate character skills. Providing no 'characterSkills' value
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

/**
* Compares a characterSkills array to a single skill and assigns 'hasSkill: true'
* to the skills that have been chosen by the character.
*/
export function skillWithOwnershipFromKey(skillKey, characterSkills = []) {

  // use the skillKey to get the skillObject
  const skill = allSkillsList[skillKey]

  const skillWithOwnership = skillWithOwnershipFromSkill(skill, characterSkills)

  return skillWithOwnership
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


console.log('ANNAN 1: ', skillWithOwnershipFromKey('melee', ['accuracy', 'plupp']));
console.log('ANNAN 2: ', skillWithOwnershipFromKey('melee', ['accuracy', 'melee']));
console.log('ANNAN 3: ', skillWithOwnershipFromKey('melee', ['melee', 'accuracy']));