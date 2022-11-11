<template>
	<div>
		<!-- NAME -->
		<div class="card margin-small padding-small">
			NAME:
			<label for="character-name" >
				<input type="text" id="character-name" v-model="characterName" @change="renameCharacter">
			</label>

		</div>

		<!-- PEOPLES -->
		<div class="card margin-small padding-small">
			Peoples: 
			<RadioButtonGroup
				:options="Object.keys(peoplesOptions)"
				:selected="peoplesChoiceKey"
				:name="'peoples'"
				@input="inputEventHandler"
			/>
			<div v-if="peoplesChoiceKey">
				<hr>
				<hr>
				<div>
					<div :key="skill" v-for="skill in peoplesOptions[peoplesChoiceKey].mandatorySkills">
						<label :for="'mandatory-' + skill">
							<input type="radio" :id="'mandatory-' + skill" checked="true" disabled="true">
							{{skill}}
						</label>
					</div>
				</div>
				<hr>
				<div>
					<RadioButtonGroup
						:options="peoplesOptions[peoplesChoiceKey].skillsLists[0].list"
						:selected="setSelectedIfValid(invalidKnowledgeSkillsForPeoplesChoicesList, peoplesSkillsChoiceList?.[0]?.toString())"
						:name="'peoples' + '-' + 'skillList' + '-' + 0"
						:invalidOptionsList="invalidPeoplesChoicesList" 
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

		<!-- UPBRINGINGS -->
		<div class="card margin-small padding-small">
			Upbringings:
			<RadioButtonGroup
				:options="Object.keys(upbringingsOptions)"
				:selected="upbringingsChoiceKey"
				:name="'upbringings'"
				@input="inputEventHandler"
			/>
			<div v-if="upbringingsChoiceKey">
				<hr>
				<hr>
				<div>
					<RadioButtonGroup
						:options="upbringingsOptions[upbringingsChoiceKey].skillsLists[0].list"
						:selected="setSelectedIfValid(invalidKnowledgeSkillsForUpbringingsChoicesList, upbringingsSkillsChoiceList?.[0]?.toString())"
						:name="'upbringings' + '-' + 'skillList' + '-' + 0"
						:invalidOptionsList="invalidUpbringingsChoicesList" 
						@input="inputEventHandler"
					/>
					<hr>
					<RadioButtonGroup
						:options="upbringingsOptions[upbringingsChoiceKey].skillsLists[1].list"
						:selected="setSelectedIfValid(invalidKnowledgeSkillsForUpbringingsChoicesList, upbringingsSkillsChoiceList?.[1]?.toString())"
						:name="'upbringings' + '-' + 'skillList' + '-' + 1"
						:invalidOptionsList="invalidUpbringingsChoicesList" 
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

		<!-- PROFESSIONS -->
		<div class="card margin-small padding-small">
			Professions:
			<RadioButtonGroup
				:options="Object.keys(professionsOptions)"
				:selected="professionsChoiceKey"
				:name="'professions'"
				@input="inputEventHandler"
			/>
			<div v-if="professionsChoiceKey">
				<hr>
				<hr>
				<div>
					<RadioButtonGroup
						:options="professionsOptions[professionsChoiceKey].skillsLists[0].list"
						:selected="setSelectedIfValid(invalidKnowledgeSkillsForProfessionsChoicesList, professionsSkillsChoiceList?.[0]?.toString())"
						:name="'professions' + '-' + 'skillList' + '-' + 0"
						:invalidOptionsList="invalidProfessionsChoicesList"
						@input="inputEventHandler"
					/>
					<hr>
					<RadioButtonGroup
						:options="professionsOptions[professionsChoiceKey].skillsLists[1].list"
						:selected="setSelectedIfValid(invalidKnowledgeSkillsForProfessionsChoicesList, professionsSkillsChoiceList?.[1]?.toString())"
						:name="'professions' + '-' + 'skillList' + '-' + 1"
						:invalidOptionsList="invalidProfessionsChoicesList"
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait } from '../../../rules/characteristics/traits'
	import { background } from '../../../rules/characteristics/traitLists/talents'
	import { knowledgeSkillKeysList } from '../../../rules/characteristics/traitLists/knowledgeSkills'
	import RadioButtonGroup from '../../generic/RadioButtonGroup.vue'
	import { contains } from '../../../rules/utils'

	export default {
		components: {
			RadioButtonGroup
		},
		props: ['characterStore'],
		setup(props) {
			const characterStore = props.characterStore // should we use store or tempSheet?
			const characterName = ref(characterStore.metadata.name)

			// --- PEOPLES ---

			// Available Options
			const peoplesOptions = background.complexTrait.peoples

			// Chosen People Key
			const peoplesChoiceKey = ref(characterStore.history[1].complexPayload.people.key)

			// Chosen People Mandatory Skills - PROXY
			const peoplesSkillsMandatoryList =
				peoplesChoiceKey.value
					? peoplesOptions[peoplesChoiceKey.value].mandatorySkills
					: []

			// Chosen People Optional Skills - PROXY
			const peoplesSkillsChoiceList = 
				characterStore.history[1].complexPayload.people.choices
					? Object.values(characterStore.history[1].complexPayload.people.choices)[1]
					: []
			const invalidPeoplesChoicesList = ref([])
			const invalidKnowledgeSkillsForPeoplesChoicesList = ref([])

			// --- UPBRINGINGS ---

			// Available Options
			const upbringingsOptions = background.complexTrait.upbringings

			// Chosen Upbringing Key
			const upbringingsChoiceKey = ref(characterStore.history[1].complexPayload.upbringing.key)

			// Chosen Upbringing Optional Skills - PROXY
			const upbringingsSkillsChoiceList = 
				characterStore.history[1].complexPayload.upbringing.choices
					? Object.values(characterStore.history[1].complexPayload.upbringing.choices)
					: []
			const invalidUpbringingsChoicesList = ref([])
			const invalidKnowledgeSkillsForUpbringingsChoicesList = ref([])

			// --- PROFESSIONS ---

			// Available Options
			const professionsOptions = background.complexTrait.professions

			// Chosen Profession Key
			const professionsChoiceKey = ref(characterStore.history[1].complexPayload.profession.key)

			// Chosen Profession Optional Skills - PROXY
			const professionsSkillsChoiceList = 
				characterStore.history[1].complexPayload.profession.choices
					? Object.values(characterStore.history[1].complexPayload.profession.choices)
					: []
			const invalidProfessionsChoicesList = ref([])
			const invalidKnowledgeSkillsForProfessionsChoicesList = ref([])

			return {
				characterStore,
				characterName,

				peoplesOptions,
				peoplesChoiceKey,
				peoplesSkillsMandatoryList,
				peoplesSkillsChoiceList,
				invalidPeoplesChoicesList,
				invalidKnowledgeSkillsForPeoplesChoicesList,

				upbringingsOptions,
				upbringingsChoiceKey,
				upbringingsSkillsChoiceList,
				invalidUpbringingsChoicesList,
				invalidKnowledgeSkillsForUpbringingsChoicesList,

				professionsOptions,
				professionsChoiceKey,
				professionsSkillsChoiceList,
				invalidProfessionsChoicesList,
				invalidKnowledgeSkillsForProfessionsChoicesList,

				knowledgeSkillKeysList,
				canChooseTrait
			}
		},
		beforeMount() {
			this.updateInvalidChoicesList()
		},
		methods: {
			setSelectedIfValid(invalidList, key) {
				if (contains(key, invalidList)) key = ''
				return key
			},
			validateKnowledgeSkills(choiceList) {
				const knowledgeSkillKeyList = this.knowledgeSkillKeysList()
				let invalidKnowledgeSkills = []
				for (const knowledgeSkillKey in knowledgeSkillKeyList) {
					if (!this.canChooseTrait(
						knowledgeSkillKeyList[knowledgeSkillKey],
						choiceList,
						this.characterStore.attributes,
						this.characterStore.metadata.isChosenByFate,
						1
					)) {
						invalidKnowledgeSkills.push(knowledgeSkillKeyList[knowledgeSkillKey])
					}
					
				}
				return invalidKnowledgeSkills
			},
			updateInvalidChoicesList() {
				this.invalidPeoplesChoicesList.length = 0
				this.invalidUpbringingsChoicesList.length = 0
				this.invalidProfessionsChoicesList.length = 0

				// peoples
				this.invalidPeoplesChoicesList = this.invalidPeoplesChoicesList.concat(
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1],
					this.professionsSkillsChoiceList[0],
					this.professionsSkillsChoiceList[1],
				)
				this.invalidKnowledgeSkillsForPeoplesChoicesList = 
					this.validateKnowledgeSkills(this.invalidPeoplesChoicesList)
				this.invalidPeoplesChoicesList =
					this.invalidPeoplesChoicesList.concat(this.invalidKnowledgeSkillsForPeoplesChoicesList)
				
				// upbringings
				this.invalidUpbringingsChoicesList = this.invalidUpbringingsChoicesList.concat(
					this.peoplesSkillsMandatoryList,
					this.peoplesSkillsChoiceList[0],
					this.professionsSkillsChoiceList[0],
					this.professionsSkillsChoiceList[1]
				)
				this.invalidKnowledgeSkillsForUpbringingsChoicesList = 
					this.validateKnowledgeSkills(this.invalidUpbringingsChoicesList)
				this.invalidUpbringingsChoicesList =
					this.invalidUpbringingsChoicesList.concat(this.invalidKnowledgeSkillsForUpbringingsChoicesList)

				// professions
				this.invalidProfessionsChoicesList = this.invalidProfessionsChoicesList.concat(
					this.peoplesSkillsMandatoryList,
					this.peoplesSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1]
				)
				this.invalidKnowledgeSkillsForProfessionsChoicesList =
					this.validateKnowledgeSkills(this.invalidProfessionsChoicesList)
				this.invalidProfessionsChoicesList =
					this.invalidProfessionsChoicesList.concat(this.invalidKnowledgeSkillsForProfessionsChoicesList)

			},
			inputEventHandler(data) {

				// peoples
				if (data.id === 'peoples') {
					this.peoplesChoiceKey = data.option
					this.peoplesSkillsChoiceList.length = 0
				}
				if (this.peoplesChoiceKey) this.peoplesSkillsMandatoryList = this.peoplesOptions[this.peoplesChoiceKey].mandatorySkills
				if (data.id === 'peoples-skillList-0') this.peoplesSkillsChoiceList[0] = data.option

				// upbringings
				if (data.id === 'upbringings') {
					this.upbringingsChoiceKey = data.option
					this.upbringingsSkillsChoiceList.length = 0
				}
				if (data.id === 'upbringings-skillList-0') this.upbringingsSkillsChoiceList[0] = data.option
				if (data.id === 'upbringings-skillList-1') this.upbringingsSkillsChoiceList[1] = data.option

				// professions
				if (data.id === 'professions') {
					this.professionsChoiceKey = data.option
					this.professionsSkillsChoiceList.length = 0
				} 
				if (data.id === 'professions-skillList-0') this.professionsSkillsChoiceList[0] = data.option
				if (data.id === 'professions-skillList-1') this.professionsSkillsChoiceList[1] = data.option

				this.updateInvalidChoicesList()

				const complexPayload = {
					people: {
						choices: {
							0: {
								0: this.peoplesSkillsMandatoryList[0]
							},
							1: {
								0: this.peoplesSkillsChoiceList[0]
							},
						},
						key: this.peoplesChoiceKey
					},
					upbringing: {
						choices: {
							0: {
								0: this.upbringingsSkillsChoiceList[0]
							},
							1: {
								0: this.upbringingsSkillsChoiceList[1]
							},
						},
						key: this.upbringingsChoiceKey
					},
					profession: {
						choices: {
							0: {
								0: this.professionsSkillsChoiceList[0]
							},
							1: {
								0: this.professionsSkillsChoiceList[1]
							},
						},
						key: this.professionsChoiceKey
					}	
				}

				this.$emit('complexPayload', complexPayload)
			},
			renameCharacter(data) {
				this.characterStore.updateCharacterName(data.target.value)
			}
		}
	}
</script>