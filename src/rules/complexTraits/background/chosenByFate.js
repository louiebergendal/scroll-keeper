import { attributeSkillKeysList } from '../../characteristics/traitLists/attributeSkills'
import { favouredTerrainSkillKeysList } from '../../characteristics/traitLists/favouredTerrainSkills'
import { generalSkillKeysList } from '../../characteristics/traitLists/generalSkills'
import { knowledgeSkillKeysList } from '../../characteristics/traitLists/knowledgeSkills'


const allSkillKeysList = [].concat(
    attributeSkillKeysList(),
    favouredTerrainSkillKeysList(),
    generalSkillKeysList(),
    knowledgeSkillKeysList()
)

const chosenByFate = {
	key: 'chosenByFate',
	niceName: 'Ödesvald',
	description: 'Ödesvald',
	skillsLists: {
		0: {
			choices: 1,
			list: allSkillKeysList
		}
	},
}

export default chosenByFate