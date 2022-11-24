<template>
	<div class="card square medium padding-large -fill">

		<div v-if="traitType === 'skill' && selectedLevel !== 1">
			<h3 v-if="traitType === 'skill'" class="align-center margin-top-nano margin-bottom-tiny">Välj en färdighet!</h3>
			<h3 v-if="traitType === 'talent'" class="align-center margin-top-nano margin-bottom-tiny">Välj en talang!</h3>
		</div>

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- break up into "SkillGroup"-components. One for general skills, one for attributeskills etc -->

			<!-- not owned -->
			<div v-if="
				!isOwned(trait.key)
				&& !(selectedLevel === 1 && trait.key !== 'background')
			"
				class="card width-whole dark margin-bottom-nano"
				:class="{
					'touched-by-error':
						traitIsTouchedByError(trait.key)
						&& containsKey('complexTrait', Object.keys(trait))
						&& isSelected(trait.key)
				}"
			>
				<div
					class=""
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
							containsKey('complexTrait', Object.keys(trait))
							&& isSelected(trait.key)
					}"
				>
					<label
						:for="key"
						class="display-inline-block"
						:class="{
							'font-contrast-lowest':
								(cannotChooseTrait(trait.key)
								&& !traitIsTouchedByError(trait.key))}"
					>
						<input
							type="radio"
							v-model="tempLevelChoiceKey"
							:value="key"
							:id="key"
							:disabled="cannotChooseTrait(trait.key)"
							class="margin-tiny vertical-align-top"
						/>
						<span class="margin-top-tiny">{{ trait.name }}</span>

						<span 
							v-if="
								traitIsTouchedByError(trait.key)
								&& !traitIsInvalidAtThisLevel(trait.key)"
							class="font-size-tiny"
						>
							<InvalidOccurrence 
								:characteristic="trait.key"
								:characterStore="characterStore"
								:selectedLevel="selectedLevel"
							/>
						</span>						
						
						<span
							v-if="
								containsKey(trait.key, characterStore.sheet.traits)
								&& !containsKey(trait.key, tempValidationSheet.traits)
								&& !traitIsTouchedByError(trait.key)"
							class="font-size-nano display-inline font-contrast-lowest margin-left-small"
						>
							Vald på en senare erfarenhetsnivå
						</span>

						<p 
							v-if="cannotChooseTrait(trait.key) && isSelected(trait.key)"
							class="font-size-tiny display-inline"
						>
							{{ getFailedRequirementsMessage(trait.key) }}
						</p>

						<span
							v-if="cannotChooseTrait(trait.key) && !traitIsTouchedByError(trait.key)"
							class="font-size-nano display-inline margin-left-small"
						>
							{{ getFailedRequirementsMessage(trait.key) }}
						</span>
					</label>

				</div>

				<!-- complex traits -->
				<div
					v-if="containsKey('complexTrait', Object.keys(trait))"
					class="width-whole angled-top"
					:class="{
						'touched-by-error': traitIsTouchedByError(trait.key),
						'font-contrast-lowest':
							invalidTraitChoiceIsNotDeselected(trait.key)
							&& !traitIsTouchedByError(trait.key)
					}"
				>
					<div v-if="trait.key === 'background'">
						<RuleRelevantMetadata :characterStore="characterStore" @update-tabs="$emit('update-tabs')" />
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
			<div 
				v-if="isOwned(trait.key)"
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
						class="margin-tiny vertical-align-top"
					/>
					<label
						:for="key + '-owned'"
						class="display-inline-block"
						:class="{ 'font-contrast-low' : !traitIsTouchedByError(trait.key) }"
					>
						<span>{{ trait.name }}</span>

						<div
							v-if="
								traitIsTouchedByError(trait.key)
								&& !traitIsInvalidAtThisLevel(trait.key)"
							>
								<InvalidOccurrence 
									:characteristic="trait.key"
									:characterStore="characterStore"
									:selectedLevel="selectedLevel"
								/>
						</div>

						<p 
							v-if="traitIsInvalidAtThisLevel(trait.key)
							&& invalidTraitChoiceIsNotDeselected(trait.key)"
							class="font-size-tiny display-inline"
						>
							{{ getFailedRequirementsMessage(trait.key) }}
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
	import { containsKey } from '../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../utilities/validators'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import InvalidOccurrence from '../generic/InvalidOccurrence.vue'
	import RuleRelevantMetadata from './RuleRelevantMetadata.vue'
	import Background from './complexTalents/Background.vue'
	import Scholar from './complexTalents/Scholar.vue'
	import Pathfinder from './complexTalents/Pathfinder.vue'

	export default {
		components: {
			InvalidOccurrence,
			RuleRelevantMetadata,
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
			let tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			console.log("tempCharacterSheet: ", tempCharacterSheet.metadata.level, tempCharacterSheet.metadata.selectedLevel)
			console.log("tempValidationSheet: ", tempValidationSheet.metadata.level, tempValidationSheet.metadata.selectedLevel)
			console.log('tempValidationSheet.traits: ', tempValidationSheet.traits);
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
				selectedLevel,
				complexTraitData,
				hasFullComplexPayload,
				containsKey,
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
			isOwned(traitKey){
				return containsKey(traitKey, this.tempCharacterSheet.traits)
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
			getFailedRequirementsMessage(traitKey) {
				const failedRequirements = this.getFailedTraitRequirements(traitKey)
				const errorMessage = this.getFailedTraitRequirementsErrorMessage(failedRequirements)
				return errorMessage
			},
			getInvalidOccurrences(key) {
				let invalidLevels = this.characterStore.metadata.invalidLevels
				let invalidOccurrencesList = []

				for (const invalidLevel in invalidLevels) {
					const invalidLevelBonus = invalidLevels[invalidLevel]

					if (typeof invalidLevelBonus === 'object'
						&& containsKey(key, invalidLevelBonus)
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

</style>
