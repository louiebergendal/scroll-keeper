<template>
	<div>

		<span class="trait-align">{{ trait.name }}</span>

		<span 
			v-if="
				traitIsTouchedByError()
				&& !traitIsInvalidAtThisLevel()"
			class="font-size-tiny"
		>
			<InvalidOccurrence 
				:characteristicProp="trait.key"
				:selectedLevelProp="selectedLevel"
			/>
		</span>						
		
		<span
			v-if="
				containsKey(trait.key, characterStore.sheet.traits)
				&& !containsKey(trait.key, validationSheet.traits)
				&& !traitIsTouchedByError()"
			class="trait-align display-block font-size-nano font-contrast-lowest margin-left-small"
		>
			Vald på en senare erfarenhetsnivå
		</span>

		<p 
			v-if="cannotChooseTrait() && isSelected()"
			class="font-size-nano display-block margin-left-small"
		>
			{{ getFailedRequirementsMessage() }}
		</p>

		<span
			v-if="cannotChooseTrait() && !traitIsTouchedByError() && !isOwned()"
			class="font-size-nano display-block margin-left-small"
		>
			{{ getFailedRequirementsMessage() }}
		</span>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../../stores/character'
	import {
		canChooseTrait,
		getFailedRequirements,
		getFailedTraitRequirementsErrorMessage
	} from '../../../rules/characteristics/traits'
	import { containsKey } from '../../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../../validators/validators'
	import InvalidOccurrence from '../../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['traitProp' ,'selectedLevelProp', 'traitTypeProp', 'tempValidationSheetProp', 'tempCharacterSheetProp','selectedChoiceKeyProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const traitType = props.traitTypeProp
			const trait = props.traitProp
			const characterSheet = props.tempCharacterSheetProp
			const validationSheet = props.tempValidationSheetProp
			const selectedChoiceKey = props.selectedChoiceKeyProp

			return {
				characterStore,
				trait,
				traitType,
				characterSheet,
				validationSheet,
				selectedChoiceKey,
				selectedLevel,
				containsKey,
				canChooseTrait,
				getFailedRequirements,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				getFailedTraitRequirementsErrorMessage,
				
			}
		},
		watch: {
			tempValidationSheetProp: {
				handler(newVal) {
					this.validationSheet = newVal
				},
				immediate: true
			},
			tempCharacterSheetProp: {
				handler(newVal) {
					this.characterSheet = newVal
				},
				immediate: true
			},
			selectedChoiceKeyProp: {
				handler(newVal) {

					this.selectedChoiceKey = newVal
				},
				immediate: true
			},
			traitProp: {
				handler(newVal) {
					this.trait = newVal
				},
				immediate: true
			},

		},
		methods: {
			isOwned(){
				return containsKey(this.trait.key, this.characterSheet.traits)
			},
			isSelected(){
				return this.trait.key === this.selectedChoiceKey
			},
			traitIsTouchedByError() {
				return (
					this.isTouchedByError(
						this.trait.key,
						this.characterStore.metadata.invalidLevels
					) || (
						this.isSelected() && this.isOwned()
					)
				)
			},
			traitIsInvalidAtThisLevel() {
				return isInvalidAtThisLevel(
					this.trait.key,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
				)
			},
			invalidTraitChoiceIsNotDeselected(traitKey) {
				return this.invalidChoiceIsNotDeselected(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.selectedChoiceKey
				)
			},
			cannotChooseTrait() {
				return !canChooseTrait(
					this.trait.key,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getFailedTraitRequirements() {
				const failedRequirements = this.getFailedRequirements(
					this.trait.key,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			},
			getFailedRequirementsMessage() {
				const failedRequirements = this.getFailedTraitRequirements()
				const errorMessage = this.getFailedTraitRequirementsErrorMessage(failedRequirements)
				return errorMessage
			}
		}
	}

</script>

<style>
	.trait-align {
		vertical-align: middle;
	}
</style>