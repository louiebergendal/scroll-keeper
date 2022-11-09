<template>
	<div class="width-whole padding-small">

		<div class="padding-bottom-small">Poäng att placera: {{(choicesAmount - selectedList.length)}}</div>

		<div  :key="scholarSkill.key" v-for="scholarSkill in scholarOptions.list">
			<div
				class="card padding-nano padding-left-small padding-bottom-tiny trait-card-align"
				:class="{
					'touched-by-error': scholarSkillIsTouchedByError(scholarSkill.key),
					'invalid-background':
						scholarSkillIsInvalidAtThisLevel(scholarSkill.key) 
						&& invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key),
					'font-contrast-lowest':
						invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key)
						&& !scholarSkillIsTouchedByError(scholarSkill.key)
				}">
				<input type="checkbox"
					v-model="checkedOptionsList"
					:id="scholarSkill.key"
					:value="scholarSkill.key"
					@change="inputEventHandler"
					class="margin-right-small"
					:disabled="(
						canChooseScholarSkillAndIsSelected('scholar')
						||
						canChooseScholarSkillAndIsSelected(scholarSkill.key)
						||
						(
							contains(scholarSkill.key, checkedOptionsList)
							&&
							!contains(scholarSkill.key, selectedList)
						)
						||
						(
							selectedList.length >= choicesAmount
							&&
							!contains(scholarSkill.key, checkedOptionsList)
						)
					)"
				/>
				<label :for="scholarSkill.key">
					{{getTraitNiceName(scholarSkill.key)}}
				</label>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait, getTraitNiceName } from '../../../rules/characteristics/traits'
	import { scholar } from '../../../rules/characteristics/traitLists/talents'
	import { contains } from '../../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError, invalidChoiceIsNotUnChecked } from '../../../utilities/validators'

	export default {
		props: ['tempCharacterSheet', 'tempValidationSheet'],
		setup(props) {
			const characterSheet = props.tempCharacterSheet
			const validationSheet = props.tempValidationSheet
			const scholarOptions = scholar.complexTrait[0]
			const choicesAmount = scholarOptions.choices
			const originalCheckedOptionsList = validationSheet.traits.filter(
				skill => contains(skill, Object.keys(scholarOptions.list))
			)
			const checkedOptionsList = ref(originalCheckedOptionsList)
			const selectedList = ref(checkedOptionsList.value.filter(skill => !contains(skill, characterSheet.traits)))
			const selectedLevel = validationSheet.metadata.selectedLevel


			// ska kolla om den är i invalidList
			// ska också kolla om något i selectedList är i invalidList			

			return {
				characterSheet,
				scholarOptions,
				choicesAmount,
				checkedOptionsList,
				selectedList,
				contains,
				canChooseTrait,
				scholar,
				getTraitNiceName,
				selectedLevel,

				validationSheet,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
				originalCheckedOptionsList,
			}
		},
		methods: {
			inputEventHandler() {
				this.selectedList = this.checkedOptionsList.filter(skill => !contains(skill, this.characterSheet.traits))

				const complexPayload = {
					scholar: {
						choices: {
							0: {
								0: this.selectedList[0]
							},
							1: {
								0: this.selectedList[1]
							},
						},
						key: 'scholar'
					}
				}

				this.$emit('complexPayload', complexPayload)
			},
			canChooseScholarSkillAndIsSelected(scholarSkillKey) {
				return (!this.canChooseScholarSkill(scholarSkillKey) && !contains(scholarSkillKey, this.selectedList))
			},
			canChooseScholarSkill(scholarSkillKey) {
				return canChooseTrait(
					scholarSkillKey,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.characterSheet.metadata.level
				)
			},
			invalidScholarSkillChoiceIsNotUnchecked(key) {
				return this.invalidChoiceIsNotUnChecked(key, this.validationSheet.metadata.invalidLevels, this.originalCheckedOptionsList, this.selectedList)
			},
			scholarSkillIsTouchedByError(key) {
				return this.isTouchedByError(key, this.validationSheet.metadata.invalidLevels)
			},
			scholarSkillIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(key, this.validationSheet.metadata.invalidLevels, this.selectedLevel)
			}

		}

	}
</script>

<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
