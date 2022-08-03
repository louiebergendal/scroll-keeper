
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
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeVend = {
    key: 'advancedKnowledgeVend',
    name: 'Fördjupad kunskap (Vend)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeVend']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSodor = {
    key: 'basicKnowledgeSodor',
    name: 'Ytlig kunskap (Sodor)',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSodor = {
    key: 'advancedKnowledgeSodor',
    name: 'Fördjupad kunskap (Sodor)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeSodor']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeSidra = {
    key: 'basicKnowledgeSidra',
    name: 'Ytlig kunskap (Sidra)',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv)
}

const advancedKnowledgeSidra = {
    key: 'advancedKnowledgeSidra',
    name: 'Fördjupad kunskap (Sidra)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeSidra']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const basicKnowledgeChemistry = { // placeholder name
    key: 'basicKnowledgeChemistry',
    name: 'Ytlig kunskap (Extrakt)',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv),
    canPickExtractsOnForageRoll: (roll) => canPickExtractsOnForageRoll(roll)
}

const advancedKnowledgeChemistry = { // placeholder name
    key: 'advancedKnowledgeChemistry',
    name: 'Fördjupad kunskap (Extrakt)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeChemistry']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll),
    canChoseExtraEffects: () => canChoseExtraEffects()
}

const basicKnowledgeArcane = {
    key: 'basicKnowledgeArcane',
    name: 'Ytlig kunskap (Magi)',
    isOwned: false,
    softUnlock: (fv) => removeSucRollPenalty(fv),
    canUseVia: () => canUseVia(),
    canUseSigns: () => canUseSigns() // rungaldr
}

const advancedKnowledgeArcane = {
    key: 'advancedKnowledgeArcane',
    name: 'Fördjupad kunskap (Magi)',
    isOwned: false,
    requirements: {
        traits: ['basicKnowledgeArcane']
    },
    addAdvantage: (sucRoll) => addAdvantage(sucRoll),
    addSpellbookPoint: (spellbookPoints) => spellbookPoints + 1
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