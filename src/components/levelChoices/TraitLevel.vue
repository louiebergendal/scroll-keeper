<template>
	<div class="card square medium padding-large -fill">

		<div v-if="selectedLevel !== 1">
			<h3 v-if="traitType === 'skill'" class="align-center margin-top-nano margin-bottom-tiny">Välj en färdighet!</h3>
			<h3 v-if="traitType === 'talent'" class="align-center margin-top-nano margin-bottom-tiny">Välj en talang!</h3>
		</div>

		<div v-if="traitType === 'skill'">
			<TraitLevelTraitGroup 
				:selected-level-prop="selectedLevel"
				:trait-type-prop="'attributeSkills'"
				:selected-choice-key-prop="selectedChoiceKey"
				:temp-character-sheet-prop="tempCharacterSheet"
				:temp-validation-sheet-prop="tempValidationSheet"
				@selected-choiceKey="updateSelectedChoiceKey"
				@complex-payload="complexPayload"
			/>
			<TraitLevelTraitGroup 
				:selected-level-prop="selectedLevel"
				:trait-type-prop="'generalSkills'"
				:selected-choice-key-prop="selectedChoiceKey"
				:temp-character-sheet-prop="tempCharacterSheet"
				:temp-validation-sheet-prop="tempValidationSheet"
				@selected-choiceKey="updateSelectedChoiceKey"
			/>
			<TraitLevelTraitGroup 
				:selected-level-prop="selectedLevel"
				:trait-type-prop="'knowledgeSkills'"
				:selected-choice-key-prop="selectedChoiceKey"
				:temp-character-sheet-prop="tempCharacterSheet"
				:temp-validation-sheet-prop="tempValidationSheet"
				@selected-choiceKey="updateSelectedChoiceKey"
				@complex-payload="complexPayload"
			/>
			<TraitLevelTraitGroup 
				:selected-level-prop="selectedLevel"
				:trait-type-prop="'favouredTerrainSkills'"
				:selected-choice-key-prop="selectedChoiceKey"
				:temp-character-sheet-prop="tempCharacterSheet"
				:temp-validation-sheet-prop="tempValidationSheet"
				@selected-choiceKey="updateSelectedChoiceKey"
				@complex-payload="complexPayload"
			/>
		</div>

		<div v-if="traitType === 'talent'">
			<TraitLevelTraitGroup 
				:selected-level-prop="selectedLevel"
				:trait-type-prop="'talents'"
				:selected-choice-key-prop="selectedChoiceKey"
				:temp-character-sheet-prop="tempCharacterSheet"
				:temp-validation-sheet-prop="tempValidationSheet"
				@selected-choiceKey="updateSelectedChoiceKey"
				@complex-payload="complexPayload"
			/>
		</div>
		
		<button
			:disabled="
				(
					!selectedChoiceKey
					||
					(traits[selectedChoiceKey].complexTrait
					&& !hasFullComplexPayload)
					||
					!canChooseTrait(
						traits[selectedChoiceKey].key,
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
	import { useCharacterStore } from '../../stores/character'
	import {
		allSkills,
		allTalents,
		canChooseTrait,
		getFailedRequirements
	} from '../../rules/characteristics/traits'
	import { invalidChoiceIsNotDeselected, isTouchedByError, isInvalidAtThisLevel } from '../../validators/validators'
	import { containsKey } from '../../rules/utils'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import RuleRelevantMetadata from './RuleRelevantMetadata.vue'
	import TraitLevelCardText from '../generic/TraitLevelCardText.vue'
	import TraitLevelTraitGroup from './TraitLevelTraitGroup.vue'
	import Background from './complexTalents/Background.vue'
	import Scholar from './complexTalents/Scholar.vue'
	import Pathfinder from './complexTalents/Pathfinder.vue'

	export default {
		components: {
			RuleRelevantMetadata,
			TraitLevelCardText,
			Pathfinder,
			Background,
			Scholar,
			TraitLevelTraitGroup
		},
		props: ['selectedLevelProp', 'traitTypeProp'],
		emits: ['complexPayload', 'update-tabs', 'selected-choiceKey'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const traitType = props.traitTypeProp
			
			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			let tempValidationSheet = ref(flattenCharacter(characterStore, selectedLevel))
			
			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) { originalLevelChoiceKey = characterStore.history[selectedLevel].choice }
			const selectedChoiceKey = ref(originalLevelChoiceKey)
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
				selectedChoiceKey,
				selectedLevel,
				complexTraitData,
				hasFullComplexPayload,
				containsKey,
				canChooseTrait,
				getFailedRequirements,
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {})
		},
		methods: {
			submitNewTraitLevel() {
				this.characterStore.submitNewLevelChoice(
					this.selectedChoiceKey,
					this.selectedLevel,
					this.traitType,
					this.complexTraitData
				)
				this.$emit('update-tabs')
				this.tempValidationSheet = flattenCharacter(this.characterStore, this.selectedLevel)
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
			updateSelectedChoiceKey(data) {
				this.selectedChoiceKey = data.selectedChoiceKey
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
				const failedRequirements = getFailedRequirements(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			}
		}
	}
</script>

<style>

</style>
