<template>
	<div>
		<!-- PEOPLES -->
		<div class="card margin-small padding-small">
			Peoples: 
			<RadioButtonGroup
				:options="Object.keys(peoplesOptions)"
				:selected="peoplesChoiceKey"
				:name="'peoples'"
				@input="inputEventHandler"
			/>
			<div>
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
				<div :key="skillList" v-for="(skillList, index) in peoplesOptions[peoplesChoiceKey].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="peoplesSkillsChoiceList[0]"
						:name="'peoples' + '-' + 'skillList' + '-' + index"
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
				:selected="[characterStore.history[1].complexPayload['upbringing'].key]"
				:name="'upbringings'"
				@input="inputEventHandler"
			/>
			<div v-if="upbringingsChoiceKey != ''">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in upbringingsOptions[upbringingsChoiceKey].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="upbringingsSkillsChoiceList[index]"
						:name="'upbringings' + '-' + 'skillList' + '-' + index"
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
				:selected="[characterStore.history[1].complexPayload['profession'].key]"
				:name="'professions'"
				@input="inputEventHandler"
			/>
			<div v-if="professionsChoiceKey != ''">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in professionsOptions[professionsChoiceKey].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="professionsSkillsChoiceList[index]"
						:name="'professions' + '-' + 'skillList' + '-' + index"
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

	export default {
		components: {
			RadioButtonGroup
		},
		props: ['characterStore'],
		setup(props) {
			const characterStore = props.characterStore

			// --- PEOPLES ---

			// Available Options
			const peoplesOptions = background.complexTrait.peoples

			// Chosen People Key
			const peoplesChoiceKey = ref(characterStore.history[1].complexPayload.people.key)

			// Chosen People Mandatory Skills
			const peoplesSkillsMandatoryList = ref(peoplesOptions[peoplesChoiceKey.value].mandatorySkills)

			// Chosen People Optional Skills
			const peoplesSkillsChoiceList = ref([Object.values(characterStore.history[1].complexPayload.people.choices)[1]])

			const invalidPeoplesChoicesList = ref([])

			// --- UPBRINGINGS ---

			// Available Options
			const upbringingsOptions = background.complexTrait.upbringings

			// Chosen Upbringing Key
			const upbringingsChoiceKey = ref(characterStore.history[1].complexPayload.upbringing.key)

			// Chosen Upbringing Optional Skills
			const upbringingsSkillsChoiceList = ref([Object.values(characterStore.history[1].complexPayload.upbringing.choices)][0])

			const invalidUpbringingsChoicesList = ref([])

			// --- PROFESSIONS ---

			// Available Options
			const professionsOptions = background.complexTrait.professions

			// Chosen Profession Key
			const professionsChoiceKey = ref(characterStore.history[1].complexPayload.profession.key)

			// Chosen Profession Optional Skills
			const professionsSkillsChoiceList = ref([Object.values(characterStore.history[1].complexPayload.profession.choices)][0])

			const invalidProfessionsChoicesList = ref([])

			const allChoicesList = ref([])

			return {
				characterStore,

				peoplesOptions,
				peoplesChoiceKey,
				peoplesSkillsMandatoryList,
				peoplesSkillsChoiceList,
				invalidPeoplesChoicesList,

				upbringingsOptions,
				upbringingsChoiceKey,
				upbringingsSkillsChoiceList,
				invalidUpbringingsChoicesList,

				professionsOptions,
				professionsChoiceKey,
				professionsSkillsChoiceList,
				invalidProfessionsChoicesList,

				allChoicesList,

				knowledgeSkillKeysList,
				canChooseTrait
			}
		},
		methods: {
			validateKnowledgeSkills(choiceList) {
				const knowledgeSkillKeyList = this.knowledgeSkillKeysList()
				let invalidKnowledgeSkills = []
				for (const traitKey in knowledgeSkillKeyList) {
					if (!this.canChooseTrait(
						knowledgeSkillKeyList[traitKey],
						choiceList,
						this.characterStore.attributes,
						this.characterStore.metadata.isChosenByFate,
						1
					)) {
						invalidKnowledgeSkills.push(knowledgeSkillKeyList[traitKey])
					}
				}
				return invalidKnowledgeSkills
			},
			inputEventHandler(data) {
				// peoples
				if (data.id === 'peoples') {
					this.peoplesChoiceKey = data.option
					this.peoplesSkillsMandatoryList.length = 0
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

				this.allChoicesList.length = 0
				this.invalidPeoplesChoicesList.length = 0
				this.invalidUpbringingsChoicesList.length = 0
				this.invalidProfessionsChoicesList.length = 0

				this.invalidPeoplesChoicesList = this.invalidPeoplesChoicesList.concat(
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1],
					this.professionsSkillsChoiceList[0],
					this.professionsSkillsChoiceList[1],
				)
				const invalidKnowledgeSkillsForPeoplesChoicesList = 
					this.validateKnowledgeSkills(this.invalidPeoplesChoicesList)

				this.invalidPeoplesChoicesList =
					this.invalidPeoplesChoicesList.concat(invalidKnowledgeSkillsForPeoplesChoicesList)
				
				this.invalidUpbringingsChoicesList = this.invalidUpbringingsChoicesList.concat(
					this.peoplesSkillsMandatoryList,
					this.peoplesSkillsChoiceList[0],
					this.professionsSkillsChoiceList[0],
					this.professionsSkillsChoiceList[1]
				)
				const invalidKnowledgeSkillsForUpbringingsChoicesList = 
					this.validateKnowledgeSkills(this.invalidUpbringingsChoicesList)

				this.invalidUpbringingsChoicesList =
					this.invalidUpbringingsChoicesList.concat(invalidKnowledgeSkillsForUpbringingsChoicesList)

				this.invalidProfessionsChoicesList = this.invalidProfessionsChoicesList.concat(
					this.peoplesSkillsMandatoryList,
					this.peoplesSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1]
				)
				const invalidKnowledgeSkillsForProfessionsChoicesList =
					this.validateKnowledgeSkills(this.invalidProfessionsChoicesList)
					
				this.invalidProfessionsChoicesList =
					this.invalidProfessionsChoicesList.concat(invalidKnowledgeSkillsForProfessionsChoicesList)

				// data structure emitted one level up and then to database, history[1].complexPayload
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
				console.log("complexPayload: ", complexPayload)

				this.$emit('complexPayload', complexPayload)
			}
		}
	}
</script>