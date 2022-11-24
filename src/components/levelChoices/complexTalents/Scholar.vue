<template>
	<div class="width-whole padding-small">

		<div class="padding-bottom-small">Poäng att placera: {{(choicesAmount - selectedList.length)}}</div>

		<!-- v-for "scholarOptions" -->
		<div v-for="scholarSkill in scholarOptions.list" :key="scholarSkill.key">

			<!-- not owned -->
			<div v-if="!isOwned(scholarSkill.key) || isSelected(scholarSkill.key) ">
				<div
					class="card padding-nano padding-left-small padding-bottom-tiny margin-bottom-nano trait-card-align"
					:class="{
						'medium': !scholarSkillsIsTouchedByError(scholarOptions.list),
						'touched-by-error': scholarSkillIsTouchedByError(scholarSkill.key),
						'invalid-background':
								isChecked(scholarSkill.key)
								&& scholarSkillIsInvalidAtThisLevel(scholarSkill.key),
						'font-contrast-lowest':
							invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key)
							&& !scholarSkillIsTouchedByError(scholarSkill.key)
					}"
				>
					<input type="checkbox"
						v-model="checkedOptionsList"
						:id="scholarSkill.key"
						:value="scholarSkill.key"
						@change="inputEventHandler"
						class="checkbox-align margin-right-small vertical-align-top margin-bottom-tiny"
						:disabled="(
								(!canChooseScholarSkill(scholarSkill.key)
									|| selectedList.length >= choicesAmount
									|| !canChooseScholarSkill('scholar')
								)
								&&
								!isSelected(scholarSkill.key)
						)"
					/>
					<label class="display-inline-block" :for="scholarSkill.key">
						<span class="padding-top-nano">{{ getTraitNiceName(scholarSkill.key) }}</span>

						<span 
							v-if="
								scholarSkillIsTouchedByError(scholarSkill.key)
								&& !scholarSkillIsInvalidAtThisLevel(scholarSkill.key)"
							class="font-size-tiny"
						>
							<InvalidOccurrence 
								:characteristic="scholarSkill.key"
								:characterStore="characterStore"
								:selectedLevel="selectedLevel"
							/>
						</span>	

						<span
							v-if="
								containsKey(scholarSkill.key, characterStore.sheet.traits)
								&& !containsKey(scholarSkill.key, tempValidationSheet.traits)
								&& !scholarSkillIsTouchedByError(scholarSkill.key)"
							class="font-size-nano display-inline font-contrast-lowest margin-left-small"
						>
							Vald på en senare erfarenhetsnivå
						</span>

						<p
							v-if="
								scholarSkillIsInvalidAtThisLevel(scholarSkill.key)
								&& isChecked(scholarSkill.key)
							"
							class="font-size-tiny display-inline"
						>
							{{ getErrorMessage(scholarSkill.key) }}
						</p>

					</label>
				</div>
			</div>

			<!-- owned, not selected -->
			<div v-if="isOwned(scholarSkill.key) && !isSelected(scholarSkill.key)">
				<div
					class="card padding-nano padding-left-small padding-bottom-tiny margin-bottom-nano trait-card-align"
					:class="{
						'medium': !scholarSkillsIsTouchedByError(scholarOptions.list),
						'touched-by-error': scholarSkillIsTouchedByError(scholarSkill.key),
						'invalid-background':
								isChecked(scholarSkill.key)
								&& scholarSkillIsInvalidAtThisLevel(scholarSkill.key),
						'font-contrast-lowest':
							invalidScholarSkillChoiceIsNotUnchecked(scholarSkill.key)
							&& !scholarSkillIsTouchedByError(scholarSkill.key)
					}"
				>
					<input type="checkbox"
						checked
						disabled
						:id="scholarSkill.key"
						:value="scholarSkill.key"
						@change="inputEventHandler"
						class="checkbox-align margin-right-small vertical-align-top margin-bottom-tiny"
					/>
					<label class="display-inline-block" :for="scholarSkill.key">
						<span class="padding-top-nano">{{ getTraitNiceName(scholarSkill.key) }}</span>
						<span 
							v-if="
								scholarSkillIsTouchedByError(scholarSkill.key)
								&& !scholarSkillIsInvalidAtThisLevel(scholarSkill.key)"
							class="font-size-tiny"
						>
							<InvalidOccurrence 
								:characteristic="scholarSkill.key"
								:characterStore="characterStore"
								:selectedLevel="selectedLevel"
							/>
						</span>
						<p
							v-if="
								scholarSkillIsInvalidAtThisLevel(scholarSkill.key)
								&& isChecked(scholarSkill.key)"
							class="font-size-tiny display-inline"
						>
							{{ getErrorMessage(scholarSkill.key) }}
						</p>
					</label>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait, getTraitNiceName, getFailedTraitRequirementsErrorMessage, getFailedRequirements } from '../../../rules/characteristics/traits'
	import { scholar } from '../../../rules/characteristics/traitLists/talents'
	import { containsKey } from '../../../rules/utils'
	import { isInvalidAtThisLevel, isTouchedByError, invalidChoiceIsNotUnChecked } from '../../../utilities/validators'
	import InvalidOccurrence from '../../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['tempCharacterSheet', 'tempValidationSheet', 'characterStore'],
		setup(props) {
			const characterStore = props.characterStore
			const characterSheet = props.tempCharacterSheet
			const validationSheet = ref(props.tempValidationSheet)
			const selectedLevel = validationSheet.value.metadata.selectedLevel
			const characterTraits = characterSheet.traits
			const scholarOptions = scholar.complexTrait[0]
			const choicesAmount = scholarOptions.choices
			const currentLevel = Object.values(characterStore.history)[selectedLevel - 1]

			const originalCheckedOptionsList = validationSheet.value.traits.filter(
				skill => containsKey(skill, Object.keys(scholarOptions.list))
			)
			const checkedOptionsList = ref(originalCheckedOptionsList)

			let originalScholarChoices = []

			if (currentLevel
				&& currentLevel.complexPayload
				&& currentLevel.complexPayload.scholar
			) originalScholarChoices = [currentLevel.complexPayload.scholar.choices].flat(2)

			const selectedList = ref(checkedOptionsList.value.filter(
				skill => (
					!containsKey(skill, characterTraits)
					|| containsKey(skill, originalScholarChoices)
				))
			)

			return {
				characterSheet,
				characterTraits,
				scholarOptions,
				choicesAmount,
				checkedOptionsList,
				originalScholarChoices,
				selectedList,
				containsKey,
				canChooseTrait,
				scholar,
				getTraitNiceName,
				selectedLevel,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
				originalCheckedOptionsList,
				getFailedRequirements,
				getFailedTraitRequirementsErrorMessage
			}
		},
		watch: {
			tempValidationSheet: {
				handler(newVal) {
					console.log('ping!');
					console.log('newVal: ', newVal);
					this.validationSheet = newVal
				},
				immediate: true
			}
		},
		methods: {
			inputEventHandler() {

				this.selectedList = this.checkedOptionsList.filter(skill => (
					!containsKey(skill, this.characterTraits)
					|| containsKey(skill, this.originalScholarChoices)
				))

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
			canChooseScholarSkill(scholarSkillKey) {
				return canChooseTrait(
					scholarSkillKey,
					this.characterTraits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.characterSheet.metadata.level
				)
			},
			isOwned(scholarSkillKey) {
				return containsKey(scholarSkillKey, this.characterTraits)
			},
			isSelected(scholarSkillKey) {
				return containsKey(scholarSkillKey, this.selectedList)
			},
			isChecked(scholarSkillKey) {
				return containsKey(scholarSkillKey, this.checkedOptionsList)
			},
			invalidScholarSkillChoiceIsNotUnchecked(key) {
				return this.invalidChoiceIsNotUnChecked(
					key,
					this.characterStore.metadata.invalidLevels,
					this.originalCheckedOptionsList,
					this.selectedList
				)
			},
			scholarSkillsIsTouchedByError(scholarKeyList) {
				for (const item in scholarKeyList) {
				 	if (this.scholarSkillIsTouchedByError(scholarKeyList[item].key)) return true
				}
				return false
			},
			scholarSkillIsTouchedByError(key) {
				return (this.isTouchedByError(
					key,
					this.characterStore.metadata.invalidLevels
					) || (this.isSelected(key) && this.isOwned(key))
				)
			},
			scholarSkillIsInvalidAtThisLevel(key) {
				return (this.isInvalidAtThisLevel(
					key,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
					) || (this.isSelected(key) && this.isOwned(key))
				)
			},
			getFailedTraitRequirements(traitKey) {
				return getFailedRequirements(
					traitKey,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
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
