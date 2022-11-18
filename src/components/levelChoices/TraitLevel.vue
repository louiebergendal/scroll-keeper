<template>
	<div class="card square medium padding-large -fill">


		<div v-if="traitType === 'skill' && selectedLevel !== 1">
			<h3 v-if="traitType === 'skill'" class="align-center margin-top-nano margin-bottom-tiny">Välj en färdighet!</h3>
			<h3 v-if="traitType === 'talent'" class="align-center margin-top-nano margin-bottom-tiny">Välj en talang!</h3>
		</div>

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- not owned -->
			<div v-if="
				!isOwned(trait.key)
				&& !(selectedLevel === 1 && trait.key !== 'background')
			"
				class="card width-whole dark margin-bottom-nano"
				:class="{
					'touched-by-error':
						traitIsTouchedByError(trait.key)
						&& contains('complexTrait', Object.keys(trait))
						&& isSelected(trait.key)
				}"
			>
				<div
					class="padding-bottom-tiny"
					:class="{
						'touched-by-error -sub': traitIsTouchedByError(trait.key),
						'invalid-background':
							traitIsInvalidAtThisLevel(trait.key)
							&& isSelected(trait.key)
						,
						'font-contrast-lowest':
							invalidTraitChoiceIsNotDeselected(trait.key)
							&& !traitIsTouchedByError(trait.key),
						' -angled-bottom':
							contains('complexTrait', Object.keys(trait))
							&& isSelected(trait.key)
					}"
				>
					<input
						type="radio"
						v-model="tempLevelChoiceKey"
						:value="key"
						:id="key"
						:disabled="cannotChooseTrait(trait.key)"
						class="margin-tiny vertical-align-top radio-margins"
					/>
					<label
						:for="key"
						class="display-inline-block text-margins"
						:class="{
							'font-contrast-lowest':
								(cannotChooseTrait(trait.key)
								&& !traitIsTouchedByError(trait.key))}"
					>
						{{ trait.name }}
						<br>

						<span v-if="traitIsTouchedByError(trait.key) && !traitIsInvalidAtThisLevel(trait.key)">
							{{getInvalidOccurences(trait.key)}}
						</span>						
						
						<p v-if="cannotChooseTrait(trait.key) && isSelected(trait.key)"
							class="font-size-tiny display-inline"
						>
							{{getErrorMessage(trait.key)}}
						</p>

					</label>
				</div>

				<!-- complex traits -->
				<div
					v-if="contains('complexTrait', Object.keys(trait))"
					class="width-whole angled-top"
					:class="{
						'touched-by-error': traitIsTouchedByError(trait.key),
						'font-contrast-lowest':
							invalidTraitChoiceIsNotDeselected(trait.key)
							&& !traitIsTouchedByError(trait.key)
					}"
				>
					<div v-if="trait.key === 'background'">
						<Background
							:characterStore="characterStore"
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'scholar' && tempLevelChoiceKey === 'scholar'">
						<Scholar
							:tempCharacterSheet="tempCharacterSheet"
							:tempValidationSheet="tempValidationSheet"
							:characterStore="characterStore"
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'pathfinder' && tempLevelChoiceKey === 'pathfinder'">
						<Pathfinder :characterStore="characterStore"
							:tempCharacterSheet="tempCharacterSheet"
							:tempValidationSheet="tempValidationSheet"
							@complex-payload="complexPayload"
						/>
					</div>
				</div>

			</div>

			<!-- already owned -->
			<div v-if="isOwned(trait.key)"
				class="card dark width-whole flex margin-bottom-nano"
			>
				<div
					class="padding-bottom-tiny padding-top-nano width-whole"
					:class="{
						'touched-by-error': traitIsTouchedByError(trait.key),
						'invalid-background':
							traitIsInvalidAtThisLevel(trait.key)
							&& invalidTraitChoiceIsNotDeselected(trait.key)
					}"
				>
					<input
						type="radio"
						:id="key + '-owned'"
						disabled
						checked='true'
						class="margin-tiny vertical-align-top radio-margins"
					/>
					<label
						:for="key + '-owned'"
						class="display-inline-block text-margins"
						:class="{ 'font-contrast-low' : !traitIsTouchedByError(trait.key) }"
					>
						<span class="display-inline">{{ trait.name }}</span>

						<span v-if="traitIsTouchedByError(trait.key) && !traitIsInvalidAtThisLevel(trait.key)">
							{{getInvalidOccurences(trait.key)}}
						</span>

						<p v-if="traitIsInvalidAtThisLevel(trait.key) && invalidTraitChoiceIsNotDeselected(trait.key)"
							class="font-size-tiny display-inline"
						>
							{{getErrorMessage(trait.key)}}
						</p>
					</label>
				</div>
			</div>

		</div>

		<button
			:disabled="
				(
					!tempLevelChoiceKey
					||
					(
						traits[tempLevelChoiceKey].complexTrait
						&&
						!hasFullComplexPayload
					)
					||
					!canChooseTrait(
						traits[tempLevelChoiceKey].key,
						tempCharacterSheet.traits,
						tempCharacterSheet.attributes,
						tempCharacterSheet.metadata.isChosenByFate,
						selectedLevel
					)
				)"
			type="submit"
			class="margin-top-tiny margin-left-nano"
			@click="submitNewTraitLevel()"
		>
			Submitta!
		</button>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import {
		allSkills,
		allTalents,
		canChooseTrait,
		getFailedRequirements,
		getFailedTraitRequirementsErrorMessage
	} from '../../rules/characteristics/traits'
	import { contains } from '../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../utilities/validators'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import Background from './complexTalents/Background.vue'
	import Scholar from './complexTalents/Scholar.vue'
	import Pathfinder from './complexTalents/Pathfinder.vue'

	export default {
		components: {
			Pathfinder,
			Background,
			Scholar
		},
		props: ['selectedLevel', 'traitType', 'characterStore'],
		emits: ['complexPayload', 'update-tabs'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const traitType = props.traitType

			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) { originalLevelChoiceKey = characterStore.history[selectedLevel].choice }
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
			let traits
			if (traitType === 'skill') { traits = allSkills() }
			if (traitType === 'talent') { traits = allTalents() }

			return {
				characterStore,
				traitType,
				traits,
				tempCharacterSheet,
				tempValidationSheet,
				originalLevelChoiceKey,
				tempLevelChoiceKey,
				characterStore,
				selectedLevel,
				complexTraitData,
				hasFullComplexPayload,
				contains,
				canChooseTrait,
				getFailedRequirements,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				getFailedTraitRequirementsErrorMessage,
			}
		},
		methods: {
			submitNewTraitLevel() {
				this.characterStore.submitNewLevelChoice(
					this.tempLevelChoiceKey,
					this.selectedLevel,
					this.traitType,
					this.complexTraitData
				)
				this.$emit('update-tabs')
				this.tempValidationSheet = this.tempValidationSheet
			},
			complexPayload(data) {
				let isValid = true
				for (const option in data) {
					for (const choiceGroup in data[option].choices) {
						for (const skillChoice in data[option].choices[choiceGroup]) {
							const skillChoiceKey = data[option].choices[choiceGroup][skillChoice]
							if (!skillChoiceKey) isValid = false
							if (this.traitIsInvalidAtThisLevel(skillChoiceKey)) isValid = false
						}
					}
				}
				this.hasFullComplexPayload = isValid
				this.complexTraitData = data
			},
			isOwned(traitKey){
				return contains(traitKey, this.tempCharacterSheet.traits)
			},
			isSelected(traitKey){
				return traitKey === this.tempLevelChoiceKey
			},
			invalidTraitChoiceIsNotDeselected(traitKey) {
				return this.invalidChoiceIsNotDeselected(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.tempLevelChoiceKey
				)
			},
			traitIsTouchedByError(traitKey) {
				return (this.isTouchedByError(
					traitKey,
					this.characterStore.metadata.invalidLevels
					) || (this.isSelected(traitKey) && this.isOwned(traitKey))
				)
			},
			traitIsInvalidAtThisLevel(traitKey) {
				return isInvalidAtThisLevel(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
				)
			},
			cannotChooseTrait(traitKey) {
				return !canChooseTrait(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getFailedTraitRequirements(traitKey) {
				const failedRequirements = this.getFailedRequirements(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			},
			getErrorMessage(traitKey) {
				const failedRequirements = this.getFailedTraitRequirements(traitKey)
				const errorMessage = this.getFailedTraitRequirementsErrorMessage(failedRequirements)
				return errorMessage
			},
			getInvalidOccurences(key) {
				let invalidLevels = this.characterStore.metadata.invalidLevels
				let invalidOccurrencesList = []

				for (const invalidLevel in invalidLevels) {
					const invalidLevelBonus = invalidLevels[invalidLevel]

					if (typeof invalidLevelBonus === 'object'
						&& contains(key, invalidLevelBonus)
					) {
						invalidOccurrencesList.push(invalidLevel)
					}

					if (typeof invalidLevelBonus === 'string'
						&& invalidLevelBonus === key
					) {
						invalidOccurrencesList.push(invalidLevel)
					}
				}
				
				return invalidOccurrencesList
			}
		}
	}
</script>

<style>
	.radio-margins {
		margin-top: 1rem !important;
		margin-left: 1rem !important;
		margin-right: 1rem !important;
	}
	.text-margins {
		margin-top: 0.3rem !important;
	}
</style>
