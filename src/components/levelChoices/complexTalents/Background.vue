<template>
	<div>

		<!-- PEOPLES -->
		<div class="card margin-small padding-small">
			<h3>Folk:</h3>
			<RadioButtonGroup
				:nameProp="'peoples'"
				:optionsProp="Object.keys(peoplesOptions)"
				:selectedProp="peoplesChoiceKey"
				@input="inputEventHandler"
			/>
			<div v-if="peoplesChoiceKey">
				<hr>
				<hr>
				<div>
					<div :key="skill" v-for="skill in peoplesOptions[peoplesChoiceKey].mandatorySkills">
						<label :for="'mandatory-' + skill">
							<input type="radio" :id="'mandatory-' + skill" checked="true" disabled="true">
							{{ getTraitNiceName(skill) }}
						</label>
					</div>
				</div>
				<hr>
				<div>
					<RadioButtonGroup
						:nameProp="'peoples' + '-' + 'skillList' + '-' + 0"
						:optionsProp="peoplesOptions[peoplesChoiceKey].skillsLists[0].list"
						:selectedProp="setSelectedIfValid(
							invalidKnowledgeSkillsForPeoplesChoicesList,
							peoplesSkillsChoiceList?.[0]?.toString()
						)"
						:invalidOptionsListProp="invalidPeoplesChoicesList" 
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

		<!-- UPBRINGINGS -->
		<div class="card margin-small padding-small">
			<h3>Uppväxt:</h3>
			<RadioButtonGroup
				:nameProp="'upbringings'"
				:optionsProp="Object.keys(upbringingsOptions)"
				:selectedProp="upbringingsChoiceKey"
				@input="inputEventHandler"
			/>
			<div v-if="upbringingsChoiceKey">
				<hr>
				<hr>
				<div>
					<RadioButtonGroup
						:nameProp="'upbringings' + '-' + 'skillList' + '-' + 0"
						:optionsProp="upbringingsOptions[upbringingsChoiceKey].skillsLists[0].list"
						:selectedProp="setSelectedIfValid(
							invalidKnowledgeSkillsForUpbringingsChoicesList,
							upbringingsSkillsChoiceList?.[0]?.toString()
						)"
						:invalidOptionsListProp="invalidUpbringingsChoicesList" 
						@input="inputEventHandler"
					/>
					<hr>
					<RadioButtonGroup
						:nameProp="'upbringings' + '-' + 'skillList' + '-' + 1"
						:optionsProp="upbringingsOptions[upbringingsChoiceKey].skillsLists[1].list"
						:selectedProp="setSelectedIfValid(
							invalidKnowledgeSkillsForUpbringingsChoicesList,
							upbringingsSkillsChoiceList?.[1]?.toString()
						)"
						:invalidOptionsListProp="invalidUpbringingsChoicesList" 
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

		<!-- PROFESSIONS -->
		<div class="card margin-small padding-small">
			<h3>Livnäring:</h3>
			<RadioButtonGroup
				:nameProp="'professions'"
				:optionsProp="Object.keys(professionsOptions)"
				:selectedProp="professionsChoiceKey"
				@input="inputEventHandler"
			/>
			<div v-if="professionsChoiceKey">
				<hr>
				<hr>
				<div>
					<RadioButtonGroup
						:nameProp="'professions' + '-' + 'skillList' + '-' + 0"
						:optionsProp="professionsOptions[professionsChoiceKey].skillsLists[0].list"
						:selectedProp="setSelectedIfValid(
							invalidKnowledgeSkillsForProfessionsChoicesList,
							professionsSkillsChoiceList?.[0]?.toString()
						)"
						:invalidOptionsListProp="invalidProfessionsChoicesList"
						@input="inputEventHandler"
					/>
					<hr>
					<RadioButtonGroup
						:nameProp="'professions' + '-' + 'skillList' + '-' + 1"
						:optionsProp="professionsOptions[professionsChoiceKey].skillsLists[1].list"
						:selectedProp="setSelectedIfValid(
							invalidKnowledgeSkillsForProfessionsChoicesList,
							professionsSkillsChoiceList?.[1]?.toString()
						)"
						:invalidOptionsListProp="invalidProfessionsChoicesList"
						@input="inputEventHandler"
					/>
				</div>
				<hr>
			</div>
		</div>

		<!-- CHOSEN BY FATE -->
		<div v-if="isChosenByFate" class="card margin-small padding-small">
			<h3>Fri färdighet:</h3>
			<RadioButtonGroup
				:nameProp="'professions' + '-' + 'skillList' + '-' + 0"
				:optionsProp="allTraitListKeys"
				:selectedProp="setSelectedIfValid(
					invalidKnowledgeSkillsForProfessionsChoicesList,
					professionsSkillsChoiceList?.[0]?.toString()
				)"
				:invalidOptionsListProp="invalidProfessionsChoicesList"
				@input="inputEventHandler"
			/>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'
	import { canChooseTrait, getTraitNiceName, allTraitListKeys } from '../../../rules/characteristics/traits'
	import { background } from '../../../rules/characteristics/traitLists/talents'
	import { knowledgeSkillKeysList } from '../../../rules/characteristics/traitLists/knowledgeSkills'
	import RadioButtonGroup from '../../generic/RadioButtonGroup.vue'
	import { containsKey } from '../../../rules/utils'

	export default {
		components: {
			RadioButtonGroup
		},
		setup(props) {
			const characterStore = useCharacterStore()
			const characterStoreLocal = {}

			// --- IS CHOSEN BY FATE ---
			const isChosenByFate = ref(false)
			const invalidFreeOptionChoicesList = ref()


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
				characterStoreLocal,

				isChosenByFate,
				allTraitListKeys,

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
				canChooseTrait,
				getTraitNiceName
			}
		},
		beforeMount() {
			this.updateInvalidChoicesList()

			this.characterStore.$subscribe((_mutation, state) => {

				this.characterStoreLocal = state
				this.isChosenByFate = state.metadata.isChosenByFate

			})
		},
		methods: {
			setSelectedIfValid(invalidList, key) {
				if (containsKey(key, invalidList)) key = ''
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
/* 				this.invalidChosenByFateChoicesList.length = 0 */

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
			}
		}
	}
</script>