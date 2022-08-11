
import { 
    removeSucRollPenalty,
    addAdvantage,
    canPickExtractsOnForageRoll,
    canChoseExtraEffects,
    canUseVia,
    canUseSigns
} from '../../mechanics.js'



const basicKnowledgeDavand = {
    key: 'basicKnowledgeDavand',
    name: 'Ytlig kunskap (Davand)',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeDavand = {
    key: 'advancedKnowledgeDavand',
    name: 'Fördjupad kunskap (Davand)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeDavand']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeVend = {
    key: 'basicKnowledgeVend',
    name: 'Ytlig kunskap (Vend)',
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeVend = {
    key: 'advancedKnowledgeVend',
    name: 'Fördjupad kunskap (Vend)',
    requirements: {
        traits: ['basicKnowledgeVend']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSodor = {
    key: 'basicKnowledgeSodor',
    name: 'Ytlig kunskap (Sodor)',
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSodor = {
    key: 'advancedKnowledgeSodor',
    name: 'Fördjupad kunskap (Sodor)',
    requirements: {
        traits: ['basicKnowledgeSodor']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSidra = {
    key: 'basicKnowledgeSidra',
    name: 'Ytlig kunskap (Sidra)',
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSidra = {
    key: 'advancedKnowledgeSidra',
    name: 'Fördjupad kunskap (Sidra)',
    requirements: {
        traits: ['basicKnowledgeSidra']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeChemistry = { // placeholder name
    key: 'basicKnowledgeChemistry',
    name: 'Ytlig kunskap (Extrakt)',
    softUnlock: (fv) => removeSucRollPenalty(fv),
    canPickExtractsOnForageRoll: (roll) => canPickExtractsOnForageRoll(roll)
}

const advancedKnowledgeChemistry = { // placeholder name
    key: 'advancedKnowledgeChemistry',
    name: 'Fördjupad kunskap (Extrakt)',
    requirements: {
        traits: ['basicKnowledgeChemistry']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll),
    canChoseExtraEffects: () => canChoseExtraEffects()
}

const basicKnowledgeArcane = {
    key: 'basicKnowledgeArcane',
    name: 'Ytlig kunskap (Magi)',
    softUnlock: (fv) => removeSucRollPenalty(fv),
    canUseVia: () => canUseVia(),
    canUseSigns: () => canUseSigns() // rungaldr
}

const advancedKnowledgeArcane = {
    key: 'advancedKnowledgeArcane',
    name: 'Fördjupad kunskap (Magi)',
    requirements: {
        traits: ['basicKnowledgeArcane']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll),
    addSpellbookPointsBonus: (spellbookPoints) => spellbookPoints + 1
}

export default {
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
    advancedKnowledgeArcane
}