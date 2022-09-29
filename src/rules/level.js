const skillNiceName = 'Färdighet'
const attributeNiceName = 'Grundegenskap'
const talentNiceName = 'Talang'
const competenceNiceName = 'Erfarenhetsbonus'
const fateNiceName = 'Öde'

export function getLevelBonusNiceName(levelBonus) {
	if (levelBonus === 'skill') return skillNiceName
	if (levelBonus === 'attribute') return attributeNiceName
	if (levelBonus === 'talent') return talentNiceName
	if (levelBonus === 'competence') return competenceNiceName
	if (levelBonus === 'fate') return fateNiceName
}