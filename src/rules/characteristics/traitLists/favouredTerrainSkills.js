import { addProficiencyBonus, increaseForagingByOne } from '../../mechanics.js'

const favouredTerrainForest = {
  key: "favouredTerrainForest",
  name: "Vana (Skog)",
  isOwned: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  increaseForagingByOne: (provisions) => increaseForagingByOne(provisions)
}

const favouredTerrainMountains = {
  key: "favouredTerrainMountains",
  name: "Vana (Berg)",
  isOwned: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  increaseForagingByOne: (provisions) => increaseForagingByOne(provisions)
}

const favouredTerrainPlains = {
  key: "favouredTerrainPlains",
  name: "Vana (Slätt)",
  isOwned: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  increaseForagingByOne: (provisions) => increaseForagingByOne(provisions)
}

const favouredTerrainUrban = {
  key: "favouredTerrainUrban",
  name: "Vana (Stad)",
  isOwned: false,
  addProficiencyBonus: (fv) => addProficiencyBonus(fv),
  increaseForagingByOne: (provisions) => increaseForagingByOne(provisions)
}

export default {
  favouredTerrainForest,
  favouredTerrainMountains,
  favouredTerrainPlains,
  favouredTerrainUrban
}
