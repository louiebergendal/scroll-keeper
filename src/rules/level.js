
import { fateNiceName } from '../rules/characteristics/fate'


const skillNiceName = 'Färdighet'
const attributeNiceName = 'Grundegenskap'
const talentNiceName = 'Talang'
const competenceNiceName = 'Erfarenhetsbonus'
const flexibleNiceName = 'Valfri'

export function getLevelBonusNiceName(levelBonus) {
	if (levelBonus === 'skill') return skillNiceName
	if (levelBonus === 'attribute') return attributeNiceName
	if (levelBonus === 'talent') return talentNiceName
	if (levelBonus === 'competence') return competenceNiceName
	if (levelBonus === 'fate') return fateNiceName
	if (levelBonus === 'flexible') return flexibleNiceName
}

