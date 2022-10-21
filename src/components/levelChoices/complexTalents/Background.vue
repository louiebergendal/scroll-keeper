<template>
	<div>

		<!-- PEOPLES -->
		<div class="card margin-small padding-small">
			Peoples: 
			<RadioButtonGroup
				:options="Object.keys(peoplesOptions)"
				:selected="[character.history[1].complexPayload['people'].key]"
				:case="'peoples'"
				:invalidOptionsList="[]"
				@input="inputEventHandler"
			/>
			<div v-if="peoplesChoice">
				<hr>
				<div>
					<div :key="skill" v-for="skill in peoplesOptions[peoplesChoice].mandatorySkills">
						<label :for="'mandatory-' + skill">
							<input type="radio" :id="'mandatory-' + skill" checked="true" disabled="true">
							{{skill}}
						</label>
					</div>
				</div>
				<div :key="skillList" v-for="(skillList, index) in peoplesOptions[peoplesChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="peoplesSkillsChoiceList[0]"
						:case="'peoples' + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="upbringingsSkillsChoiceList.concat(professionsSkillsChoiceList)"
						@input="inputEventHandler"
					/>
				</div>
			</div>
		</div>

		<!-- UPBRINGINGS -->
		<div class="card padding-small margin-small">
			Upbringings:
			<RadioButtonGroup
				:options="Object.keys(upbringingsOptions)"
				:selected="[character.history[1].complexPayload['upbringing'].key]"
				:case="'upbringings'"
				:invalidOptionsList="[]"
				@input="inputEventHandler"
			/>
			<div v-if="upbringingsOptions[upbringingsChoice]">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in upbringingsOptions[upbringingsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="upbringingsSkillsChoiceList[index]"
						:case="'upbringings' + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="peoplesSkillsChoiceList.concat(peoplesSkillsMandatoryList, professionsSkillsChoiceList)"
						@input="inputEventHandler"
					/>
				</div>
			</div>
		</div>

		<!-- PROFESSIONS -->
		<div class="card padding-small margin-small">
			Professions:
			<RadioButtonGroup
				:options="Object.keys(professionsOptions)"
				:selected="[character.history[1].complexPayload['profession'].key]"
				:case="'professions'"
				:invalidOptionsList="[]"
				@input="inputEventHandler"
			/>
			<div v-if="professionsOptions[professionsChoice]">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in professionsOptions[professionsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="professionsSkillsChoiceList[index]"
						:case="'professions' + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="peoplesSkillsChoiceList.concat(peoplesSkillsMandatoryList, upbringingsSkillsChoiceList)"
						@input="inputEventHandler"
					/>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { background } from '../../../rules/characteristics/traitLists/talents'
	import RadioButtonGroup from '../../generic/RadioButtonGroup.vue'
	import { useCharacterStore } from '../../../stores/character'

	export default {
		components: {
			RadioButtonGroup
		},
		setup() {
			const character = useCharacterStore()

			const peoplesOptions = background.complexTrait.peoples
			const peoplesChoice = ref(character.history[1].complexPayload.people.key ? character.history[1].complexPayload.people.key : undefined)
			const peoplesSkillsMandatoryList = ref(peoplesChoice.value ? peoplesOptions[peoplesChoice.value].mandatorySkills : [])
			const peoplesSkillsChoiceList = ref(character.history[1].complexPayload.people.choices ? [Object.values(character.history[1].complexPayload.people.choices)[1]] : [])

			const upbringingsOptions = background.complexTrait.upbringings
			const upbringingsChoice = ref(character.history[1].complexPayload.upbringing.key ? character.history[1].complexPayload.upbringing.key : undefined)
			const upbringingsSkillsChoiceList = ref(character.history[1].complexPayload.upbringing.choices ? Object.values(character.history[1].complexPayload.upbringing.choices) : [])

			const professionsOptions = background.complexTrait.professions
			const professionsChoice = ref(character.history[1].complexPayload.profession.key ? character.history[1].complexPayload.profession.key : undefined)
			const professionsSkillsChoiceList = ref(character.history[1].complexPayload.profession.choices ? Object.values(character.history[1].complexPayload.profession.choices) : [])

			return {
				character,

				peoplesOptions,
				peoplesChoice,
				peoplesSkillsMandatoryList,
				peoplesSkillsChoiceList,

				upbringingsOptions,
				upbringingsChoice,
				upbringingsSkillsChoiceList,

				professionsOptions,
				professionsChoice,
				professionsSkillsChoiceList,
			}
		},
		methods: {
			inputEventHandler(data) {	

				// peoples
				if (data.id === 'peoples') this.peoplesChoice = data.option
				if (this.peoplesChoice) this.peoplesSkillsMandatoryList = this.peoplesOptions[this.peoplesChoice].mandatorySkills
				if (data.id === 'peoples-skillList-0') this.peoplesSkillsChoiceList[0] = data.option

				// upbringings
				if (data.id === 'upbringings') this.upbringingsChoice = data.option
				if (data.id === 'upbringings-skillList-0') this.upbringingsSkillsChoiceList[0] = data.option
				if (data.id === 'upbringings-skillList-1') this.upbringingsSkillsChoiceList[1] = data.option

				// professions
				if (data.id === 'professions') this.professionsChoice = data.option
				if (data.id === 'professions-skillList-0') this.professionsSkillsChoiceList[0] = data.option
				if (data.id === 'professions-skillList-1') this.professionsSkillsChoiceList[1] = data.option

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
						key: this.peoplesChoice
					},
					upbringing: {
						choices: {
							0: {
								0: this.upbringingsSkillsChoiceList[0],
							},
							1: {
								0: this.upbringingsSkillsChoiceList[1]
							}
						},
						key: this.upbringingsChoice
					},
					profession: {
						choices: {
							0: {
								0: this.professionsSkillsChoiceList[0]
							},
							1: {
								0: this.professionsSkillsChoiceList[1]
							}
						},
						key: this.professionsChoice
					},		
				}

				this.$emit('complexPayload', complexPayload)
			}
		}
	}
</script>


<style>
</style>
