
import { 
	removeSucRollPenalty,
	addAdvantage,
	canPickExtractsOnForageRoll,
	canChoseExtraEffects,
	canUseVia,
	canUseSigns
} from '../../mechanics.js'
import { getNiceNameSortedList } from './traitsUtils.js'



const knowledgeDavandBasic = {
	key: 'knowledgeDavandBasic',
	name: 'Ytlig kunskap (Davand)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeDavandAdvanced = {
	key: 'knowledgeDavandAdvanced',
	name: 'Normal kunskap (Davand)',
	requirements: {
		traits: ['knowledgeDavandBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const knowledgeDavandExpert = {
	key: 'knowledgeDavandExpert',
	name: 'Fördjupad kunskap (Davand)',
	requirements: {
		traits: ['knowledgeDavandAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}



const knowledgeVendBasic = {
	key: 'knowledgeVendBasic',
	name: 'Ytlig kunskap (Vend)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeVendAdvanced = {
	key: 'knowledgeVendAdvanced',
	name: 'Normal kunskap (Vend)',
	requirements: {
		traits: ['knowledgeVendBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const knowledgeVendExpert = {
	key: 'knowledgeVendExpert',
	name: 'Fördjupad kunskap (Vend)',
	requirements: {
		traits: ['knowledgeVendAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}



const knowledgeSodorBasic = {
	key: 'knowledgeSodorBasic',
	name: 'Ytlig kunskap (Sodor)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeSodorAdvanced = {
	key: 'knowledgeSodorAdvanced',
	name: 'Normal kunskap (Sodor)',
	requirements: {
		traits: ['knowledgeSodorBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const knowledgeSodorExpert = {
	key: 'knowledgeSodorExpert',
	name: 'Fördjupad kunskap (Sodor)',
	requirements: {
		traits: ['knowledgeSodorAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}



const knowledgeSidraBasic = {
	key: 'knowledgeSidraBasic',
	name: 'Ytlig kunskap (Sidra)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeSidraAdvanced = {
	key: 'knowledgeSidraAdvanced',
	name: 'Normal kunskap (Sidra)',
	requirements: {
		traits: ['knowledgeSidraBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const knowledgeSidraExpert = {
	key: 'knowledgeSidraExpert',
	name: 'Fördjupad kunskap (Sidra)',
	requirements: {
		traits: ['knowledgeSidraAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}



const knowledgeDurcherBasic = {
	key: 'knowledgeDurcherBasic',
	name: 'Ytlig kunskap (Durcher)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeDurcherAdvanced = {
	key: 'knowledgeDurcherAdvanced',
	name: 'Normal kunskap (Durcher)',
	requirements: {
		traits: ['knowledgeDurcherBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}

const knowledgeDurcherExpert = {
	key: 'knowledgeDurcherExpert',
	name: 'Fördjupad kunskap (Durcher)',
	requirements: {
		traits: ['knowledgeDurcherAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll)
}



const knowledgeOrunBasic = {
	key: 'knowledgeOrunBasic',
	name: 'Ytlig kunskap (Troll)',
	softUnlock: (fv) => removeSucRollPenalty(fv)
}

const knowledgeOrunAdvanced = {
	key: 'knowledgeOrunAdvanced',
	name: 'Normal kunskap (Troll)',
	requirements: {
		traits: ['knowledgeOrunBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
	canChoseExtraEffects: () => canChoseExtraEffects()
}

const knowledgeOrunExpert = {
	key: 'knowledgeOrunExpert',
	name: 'Fördjupad kunskap (Troll)',
	requirements: {
		traits: ['knowledgeOrunAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
	canChoseExtraEffects: () => canChoseExtraEffects()
}



const knowledgeChemistryBasic = {
	key: 'knowledgeChemistryBasic',
	name: 'Ytlig kunskap (Extrakt)',
	softUnlock: (fv) => removeSucRollPenalty(fv),
	canPickExtractsOnForageRoll: (roll) => canPickExtractsOnForageRoll(roll)
}

const knowledgeChemistryAdvanced = {
	key: 'knowledgeChemistryAdvanced',
	name: 'Normal kunskap (Extrakt)',
	requirements: {
		traits: ['knowledgeChemistryBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
	canChoseExtraEffects: () => canChoseExtraEffects()
}

const knowledgeChemistryExpert = {
	key: 'knowledgeChemistryExpert',
	name: 'Fördjupad kunskap (Extrakt)',
	requirements: {
		traits: ['knowledgeChemistryAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
}



const knowledgeArcaneBasic = {
	key: 'knowledgeArcaneBasic',
	name: 'Ytlig kunskap (Magi)',
	softUnlock: (fv) => removeSucRollPenalty(fv),
	canUseVia: () => canUseVia(),
	canUseSigns: () => canUseSigns() // rungaldr
}

const knowledgeArcaneAdvanced = {
	key: 'knowledgeArcaneAdvanced',
	name: 'Normal kunskap (Magi)',
	requirements: {
		traits: ['knowledgeArcaneBasic']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
	addSpellbookPointsBonus: (spellbookPoints) => spellbookPoints + 1
}

const knowledgeArcaneExpert = {
	key: 'knowledgeArcaneExpert',
	name: 'Fördjupad kunskap (Magi)',
	requirements: {
		traits: ['knowledgeArcaneAdvanced']
	},
	addAdvantage: (sucRoll) => addAdvantage(sucRoll),
	addCantrip: (addCantrip) => addCantrip + 1
}



const knowledgeSkills = {
	knowledgeDavandBasic,
	knowledgeDavandAdvanced,
	knowledgeDavandExpert,

	knowledgeVendBasic,
	knowledgeVendAdvanced,
	knowledgeVendExpert,

	knowledgeSodorBasic,
	knowledgeSodorAdvanced,
	knowledgeSodorExpert,

	knowledgeSidraBasic,
	knowledgeSidraAdvanced,
	knowledgeSidraExpert,

	knowledgeDurcherBasic,
	knowledgeDurcherAdvanced,
	knowledgeDurcherExpert,

	knowledgeOrunBasic,
	knowledgeOrunAdvanced,
	knowledgeOrunExpert,

	knowledgeChemistryBasic,
	knowledgeChemistryAdvanced,
	knowledgeChemistryExpert,
	
	knowledgeArcaneBasic,
	knowledgeArcaneAdvanced,
	knowledgeArcaneExpert
}

export const knowledgeSkillKeysList = () => Object.keys(knowledgeSkills)
export const knowledgeSkillKeysListNiceNameSorted = () => getNiceNameSortedList(knowledgeSkillKeysList())

export default knowledgeSkills