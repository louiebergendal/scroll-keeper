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
						canChooseScholarSkillAndIsSelected(scholarSkill.key)
						||
						(
							contains(checkedOptionsList, scholarSkill.key)
							&&
							!contains(selectedList, scholarSkill.key)
						)
						||
						(
							selectedList.length >= choicesAmount
							&&
							!contains(checkedOptionsList, scholarSkill.key)
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
// contains()
// contains(invalidLevels[selectedLevel], scholarSkill.key)

/* :class="{
						'touched-by-error': scholarSkillIsTouchedByError(scholarSkill.key),
						'invalid-background':
							!scholarSkillIsInvalidAtThisLevel(scholarSkill.key) && invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key),
						'font-contrast-lowest':
							invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key)
							&& !scholarSkillIsTouchedByError(scholarSkill.key)
					}"> */


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
					skill => contains(
						Object.keys(scholarOptions.list),
						skill
					)
				)
			const checkedOptionsList = ref(originalCheckedOptionsList)
			const selectedList = ref(checkedOptionsList.value.filter(skill => !contains(characterSheet.traits, skill)))
			const invalidLevels = ref(props.tempValidationSheet.metadata.invalidLevels)
			console.log('invalidLevels in setup: ', invalidLevels)
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
				invalidLevels,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
				originalCheckedOptionsList,
			}
		},
		methods: {
			inputEventHandler() {
				this.selectedList = this.checkedOptionsList.filter(skill => !contains(this.characterSheet.traits, skill))

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
				return (!this.canChooseScholarSkill(scholarSkillKey) && !contains(this.selectedList, scholarSkillKey))
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
				return this.invalidChoiceIsNotUnChecked(key, this.invalidLevels, this.originalCheckedOptionsList, this.selectedList)
			},
			scholarSkillIsTouchedByError(key) {
				console.log('key: ', key);
				console.log('this.invalidLevels: ', this.validationSheet.metadata.invalidLevels);
				console.log('-----');

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
