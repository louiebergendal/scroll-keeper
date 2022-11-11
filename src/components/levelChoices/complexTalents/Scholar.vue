<template>
	<div class="width-whole padding-small">

		<div class="padding-bottom-small">Poäng att placera: {{(choicesAmount - selectedList.length)}}</div>

		<div  :key="scholarSkill.key" v-for="scholarSkill in scholarOptions.list">
			<div
				class="card padding-nano padding-left-small padding-bottom-tiny trait-card-align margin-bottom-nano"
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
					class="checkbox-align margin-right-small vertical-align-top margin-bottom-nano"
					:disabled="(
						canChooseScholarSkillAndIsSelected('scholar')
						|| canChooseScholarSkillAndIsSelected(scholarSkill.key)
						|| (
							contains(scholarSkill.key, checkedOptionsList)
							&& !contains(scholarSkill.key, selectedList)
						)
						|| (
							selectedList.length >= choicesAmount
							&& !contains(scholarSkill.key, checkedOptionsList)
						)
					)"
				/>
				<label class="display-inline-block" :for="scholarSkill.key">
					<div>{{getTraitNiceName(scholarSkill.key)}}</div>
					<div
						v-if="
							!canChooseScholarSkill(scholarSkill.key)
							&& contains(scholarSkill.key, checkedOptionsList)
							&& scholarSkillIsInvalidAtThisLevel(scholarSkill.key)"
						class="font-size-tiny display-inline"
					>
						{{getErrorMessage(scholarSkill.key)}}
					</div>
				</label>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait, getTraitNiceName, getFailedTraitRequirementsErrorMessage, getFailedRequirements } from '../../../rules/characteristics/traits'
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
				getFailedRequirements,
				getFailedTraitRequirementsErrorMessage
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
			},
			getFailedTraitRequirements(traitKey) {
				return getFailedRequirements(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getErrorMessage(traitKey) {
				return getFailedTraitRequirementsErrorMessage(
					this.getFailedTraitRequirements(traitKey)
				)
			}


		}

	}
</script>

<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
	.checkbox-align {
		margin-top: 0.8rem;
	}
</style>
