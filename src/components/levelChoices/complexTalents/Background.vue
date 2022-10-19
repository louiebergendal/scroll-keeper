<template>
	<div>

		<!-- peoples -->
		<div class="card margin-small padding-small">
			{{peoplesTitle}}:
			<RadioButtonGroup
				:options="peoplesOptions"
				:selected="peoplesChoice"
				:case="peoplesTitle"
				@input="inputEventHandler"
			/>
			
			<div v-if="peoples[peoplesChoice]">
				<hr>
				<div>
					<div :key="skill" v-for="skill in peoples[peoplesChoice].mandatorySkills">
						<label :for="'mandatory-' + skill">
							<input type="radio" :id="'mandatory-' + skill" checked="true" disabled="true">
							{{skill}}
						</label>
					</div>
				</div>
				<div :key="skillList" v-for="(skillList, index) in peoples[peoplesChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="peoplesSkillsChoiceList"
						:case="peoplesTitle + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="currentBackgroundSkillsList"
						@input="inputEventHandler"
					/>
				</div>
			</div>
		</div>

		<!-- upbringings -->
		<div class="card padding-small margin-small">
			{{upbringingsTitle}}:
			<RadioButtonGroup
				:options="upbringingsOptions"
				:selected="upbringingsChoice"
				:case="upbringingsTitle"
				@input="inputEventHandler"
			/>
			<div v-if="upbringings[upbringingsChoice]">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in upbringings[upbringingsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="upbringingsSkillsChoiceList[index]"
						:case="upbringingsTitle + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="currentBackgroundSkillsList"
						@input="inputEventHandler"
					/>
				</div>
			</div>
		</div>

		<!-- professions -->
		<div class="card padding-small margin-small">
			{{professionsTitle}}:
			<RadioButtonGroup
				:options="professionsOptions"
				:selected="professionsChoice"
				:case="professionsTitle"
				@input="inputEventHandler"
			/>
			<div v-if="professions[professionsChoice]">
				<hr>
				<div :key="skillList" v-for="(skillList, index) in professions[professionsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="professionsSkillsChoiceList[index]"
						:case="professionsTitle + '-' + 'skillList' + '-' + index"
						:invalidOptionsList="currentBackgroundSkillsList"
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
	//import { useCharacterStore } from '../../../stores/character'

	export default {
		components: {
			RadioButtonGroup
		},
		setup() {
			// const character = useCharacterStore()
			// ha kvar orginalvalen
			// traitlevel är referens

			const peoples = background.complexTrait.peoples
			const peoplesTitle = Object.keys(background.complexTrait)[0]
			const peoplesOptions = Object.keys(peoples)
			const peoplesChoice = ref()
			const peoplesSkillsMandatoryList = ref([])
			const peoplesSkillsChoiceList = ref([])

			const upbringings = background.complexTrait.upbringings
			const upbringingsTitle = Object.keys(background.complexTrait)[1]
			const upbringingsOptions = Object.keys(upbringings)
			const upbringingsChoice = ref()
			const upbringingsSkillsChoiceList = ref([])

			const professions = background.complexTrait.professions
			const professionsTitle = Object.keys(background.complexTrait)[2]
			const professionsOptions = Object.keys(professions)
			const professionsChoice = ref()
			const professionsSkillsChoiceList = ref([])

			const currentBackgroundSkillsList = ref([])

			return {
				peoples,
				peoplesTitle,
				peoplesOptions,
				peoplesChoice,
				peoplesSkillsMandatoryList,
				peoplesSkillsChoiceList,

				upbringings,
				upbringingsTitle,
				upbringingsOptions,
				upbringingsChoice,
				upbringingsSkillsChoiceList,

				professions,
				professionsTitle,
				professionsOptions,
				professionsChoice,
				professionsSkillsChoiceList,

				currentBackgroundSkillsList,
			}
		},
		onBeforeUnmount: {},
		methods: {
			inputEventHandler(data) {				

				// peoples
				if (data.id === 'peoples') {
					this.peoplesChoice = data.option
					this.peoplesSkillsChoiceList[0] = undefined
				}
				if (this.peoplesChoice) this.peoplesSkillsMandatoryList = background.complexTrait.peoples[this.peoplesChoice].mandatorySkills
				if (data.id === 'peoples-skillList-0') this.peoplesSkillsChoiceList[0] = data.option

				// upbringings
				if (data.id === 'upbringings') {
					this.upbringingsChoice = data.option
					this.upbringingsSkillsChoiceList[0] = undefined
					this.upbringingsSkillsChoiceList[1] = undefined
				}
				if (data.id === 'upbringings-skillList-0') this.upbringingsSkillsChoiceList[0] = data.option
				if (data.id === 'upbringings-skillList-1') this.upbringingsSkillsChoiceList[1] = data.option

				// professions
				if (data.id === 'professions') {
					this.professionsChoice = data.option
					this.professionsSkillsChoiceList[0] = undefined
					this.professionsSkillsChoiceList[1] = undefined
				}
				if (data.id === 'professions-skillList-0') this.professionsSkillsChoiceList[0] = data.option
				if (data.id === 'professions-skillList-1') this.professionsSkillsChoiceList[1] = data.option

				this.currentBackgroundSkillsList = this.peoplesSkillsChoiceList.concat(this.upbringingsSkillsChoiceList, this.professionsSkillsChoiceList)

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
