import { addProficiencyBonus, IncreaseForagingByOne } from "../mechanics.js"



const favouredTerrainForest = {
    key: "favouredTerrainForest",
    name: "Vana (Skog)",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    IncreaseForagingByOne: (provisions) => IncreaseForagingByOne(provisions)
}

const favouredTerrainMountains = {
    key: "favouredTerrainForest",
    name: "Vana (Skog)",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    IncreaseForagingByOne: (provisions) => IncreaseForagingByOne(provisions)
}

const favouredTerrainPlains = {
    key: "favouredTerrainForest",
    name: "Vana (Skog)",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    IncreaseForagingByOne: (provisions) => IncreaseForagingByOne(provisions)
}

const favouredTerrainUrban = {
    key: "favouredTerrainForest",
    name: "Vana (Skog)",
    isOwned: false,
    addProficiencyBonus: (fv) => addProficiencyBonus(fv),
    IncreaseForagingByOne: (provisions) => IncreaseForagingByOne(provisions)
}



export default {
    favouredTerrainForest,
    favouredTerrainMountains,
    favouredTerrainPlains,
    favouredTerrainUrban
}