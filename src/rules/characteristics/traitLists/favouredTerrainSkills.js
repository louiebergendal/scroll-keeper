import { addProficiencyBonus, addForagingBonus } from '../../mechanics.js'

const favouredTerrainForest = {
  key: 'favouredTerrainForest',
  name: 'Vana (Skog)',
  addProficiencyBonus: (fv) => addProficiencyBonus(fv, 1),
  addForagingBonus: (provisions) => addForagingBonus(provisions, 1)
}

const favouredTerrainMountains = {
  key: 'favouredTerrainMountains',
  name: 'Vana (Berg)',
  addProficiencyBonus: (fv) => addProficiencyBonus(fv, 1),
  addForagingBonus: (provisions) => addForagingBonus(provisions, 1)
}

const favouredTerrainPlains = {
  key: 'favouredTerrainPlains',
  name: 'Vana (Slätt)',
  addProficiencyBonus: (fv) => addProficiencyBonus(fv, 1),
  addForagingBonus: (provisions) => addForagingBonus(provisions, 1)
}

const favouredTerrainUrban = {
  key: 'favouredTerrainUrban',
  name: 'Vana (Stad)',
  addProficiencyBonus: (fv) => addProficiencyBonus(fv, 1),
  addForagingBonus: (provisions) => addForagingBonus(provisions, 1)
}

export default {
  favouredTerrainForest,
  favouredTerrainMountains,
  favouredTerrainPlains,
  favouredTerrainUrban
}
