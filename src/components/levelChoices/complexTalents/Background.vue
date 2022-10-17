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
			<hr>
			<div v-if="peoples[peoplesChoice]">
				<div>
					<b>Mandatory Skills</b>
					<div :key="skill" v-for="skill in peoples[peoplesChoice].mandatorySkills">
						<label :for="skill">
							<input type="radio" :id="skill" checked="true" disabled="true">
							{{skill}}
						</label>
					</div>
					<hr>
				</div>
				<div :key="skillList" v-for="(skillList, index) in peoples[peoplesChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="peoplesSkillsChoice"
						:case="peoplesTitle + '-' + 'skillList' + '-' + index"
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
			<hr>
			<div v-if="upbringings[upbringingsChoice]">
				<div :key="skillList" v-for="(skillList, index) in upbringings[upbringingsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="upbringingsSkillsChoice[index]"
						:case="upbringingsTitle + '-' + 'skillList' + '-' + index"
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
			<hr>
			<div v-if="professions[professionsChoice]">
				<div :key="skillList" v-for="(skillList, index) in professions[professionsChoice].skillsLists">
					<RadioButtonGroup
						:options="skillList.list"
						:selected="professionsSkillsChoice[index]"
						:case="professionsTitle + '-' + 'skillList' + '-' + index"
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

	export default {
		components: {
			RadioButtonGroup
		},
		setup() {

			const peoples = background.complexTrait.peoples
			const peoplesTitle = Object.keys(background.complexTrait)[0]
			const peoplesOptions = Object.keys(peoples)
			const peoplesChoice = ref()
			const peoplesSkillsMandatory = ref()
			const peoplesSkillsChoice = ref([])

			const upbringings = background.complexTrait.upbringings
			const upbringingsTitle = Object.keys(background.complexTrait)[1]
			const upbringingsOptions = Object.keys(upbringings)
			const upbringingsChoice = ref()
			const upbringingsSkillsChoice = ref([])

			const professions = background.complexTrait.professions
			const professionsTitle = Object.keys(background.complexTrait)[2]
			const professionsOptions = Object.keys(professions)
			const professionsChoice = ref()
			const professionsSkillsChoice = ref([])

			return {
				peoples,
				peoplesTitle,
				peoplesOptions,
				peoplesChoice,
				peoplesSkillsMandatory,
				peoplesSkillsChoice,

				upbringings,
				upbringingsTitle,
				upbringingsOptions,
				upbringingsChoice,
				upbringingsSkillsChoice,

				professions,
				professionsTitle,
				professionsOptions,
				professionsChoice,
				professionsSkillsChoice
			}
		},
		methods: {
			inputEventHandler(data) {

				if (data.id === 'peoples') this.peoplesChoice = data.option
				if (data.id === 'peoples-skillList-0') this.peoplesSkillsChoice[0] = data.option

				if (data.id === 'upbringings') this.upbringingsChoice = data.option
				if (data.id === 'upbringings-skillList-0') this.upbringingsSkillsChoice[0] = data.option
				if (data.id === 'upbringings-skillList-1') this.upbringingsSkillsChoice[1] = data.option

				if (data.id === 'professions') this.professionsChoice = data.option
				if (data.id === 'professions-skillList-0') this.professionsSkillsChoice[0] = data.option
				if (data.id === 'professions-skillList-1') this.professionsSkillsChoice[1] = data.option

				if (this.peoplesChoice) {
					this.peoplesSkillsMandatory = background.complexTrait.peoples[this.peoplesChoice].mandatorySkills
				}

				const complexPayload = {
					people: {
						choices: {
							0: {
								0: this.peoplesSkillsMandatory
							},
							1: {
								0: this.peoplesSkillsChoice[0]
							},
						},
						key: this.peoplesChoice
					},
					upbringing: {
						choices: {
							0: {
								0: this.upbringingsSkillsChoice[0],
							},
							1: {
								0: this.upbringingsSkillsChoice[1]
							}
						},
						key: this.upbringingsChoice
					},
					profession: {
						choices: {
							0: {
								0: this.professionsSkillsChoice[0]
							},
							1: {
								0: this.professionsSkillsChoice[1]
							}
						},
						key: this.professionsChoice
					},		
				}

				console.log('complexPayload: ', complexPayload);
				this.$emit('complexPayload', complexPayload)
				//emitta här
			}
		}
	}
</script>


<style>
</style>
