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
				!traitIsOwned(trait.key)
				&& !(selectedLevel === 1 && trait.key !== 'background')
			"
				class="card width-whole dark margin-bottom-nano"
				:class="{
					'touched-by-error':
					traitIsTouchedByError(trait.key)
						&& containsKey('complexTrait', Object.keys(trait))
						&& traitIsSelected(trait.key)
				}"
			>
				<div
					class=""
					:class="{
						'touched-by-error -sub': traitIsTouchedByError(trait.key),
						'invalid-background':
							traitIsInvalidAtThisLevel(trait.key)
							&& traitIsSelected(trait.key),
						'font-contrast-lowest':
							invalidTraitChoiceIsNotDeselected(trait.key)
							&& !traitIsTouchedByError(trait.key),
						' -angled-bottom':
							containsKey('complexTrait', Object.keys(trait))
							&& traitIsSelected(trait.key)
					}"
				>
					<label
						:for="key"
						class="display-inline-block"
						:class="{
							'font-contrast-lowest':
								(cannotChooseTrait(trait.key)
								&& !traitIsTouchedByError(trait.key))
						}"
					>
						<input
							type="radio"
							v-model="selectedChoiceKey"
							:value="key"
							:id="key"
							:disabled="cannotChooseTrait(trait.key)"
							class="margin-tiny vertical-align-top"
						/>
						<TraitLevelCardText
							:traitProp="trait"									
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="traitType"
							:tempValidationSheetProp="tempValidationSheet"
							:tempCharacterSheetProp="tempCharacterSheet"
							:selectedChoiceKeyProp="selectedChoiceKey"
						/>
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
						<RuleRelevantMetadata @update-tabs="$emit('update-tabs')" />
						<Background
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'scholar' && selectedChoiceKey === 'scholar'">
						<Scholar
							:tempCharacterSheet="tempCharacterSheet"
							:tempValidationSheet="tempValidationSheet"
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'pathfinder' && selectedChoiceKey === 'pathfinder'">
						<Pathfinder
							:tempCharacterSheet="tempCharacterSheet"
							:tempValidationSheet="tempValidationSheet"
							@complex-payload="complexPayload"
						/>
					</div>
				</div>

			</div>

			<!-- already owned -->
			<div 
				v-if="traitIsOwned(trait.key) && trait.key !== 'background'"
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
					<label
						:for="key + '-owned'"
						class="display-inline-block"
						:class="{ 'font-contrast-lowest' : !traitIsTouchedByError(trait.key) }"
					>
						<input
							type="radio"
							:id="key + '-owned'"
							disabled
							checked='true'
							class="margin-tiny vertical-align-top"
						/>
						<TraitLevelCardText
							:traitProp="trait"
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="traitType"
							:tempValidationSheetProp="tempValidationSheet"
							:tempCharacterSheetProp="tempCharacterSheet"
							:selectedChoiceKeyProp="selectedChoiceKey"
						/>
					</label>
				</div>
			</div>

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
	import Background from './complexTalents/Background.vue'
	import Scholar from './complexTalents/Scholar.vue'
	import Pathfinder from './complexTalents/Pathfinder.vue'

	export default {
		components: {
			RuleRelevantMetadata,
			TraitLevelCardText,
			Pathfinder,
			Background,
			Scholar
		},
		props: ['selectedLevelProp', 'traitTypeProp'],
		emits: ['complexPayload', 'update-tabs'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const traitType = props.traitTypeProp
			
			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			let tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) { originalLevelChoiceKey = characterStore.history[selectedLevel].choice }
			const selectedChoiceKey = ref(originalLevelChoiceKey)
			let traits
			if (traitType === 'skill') { traits = allSkills() }
			if (traitType === 'talent') { traits = allTalents() }

			// console.log('traits: ', Object.values(traits).sort());

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
			this.characterStore.$subscribe((_mutation, state) => {
			})
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
			traitIsOwned(traitKey){
				return containsKey(traitKey, this.tempCharacterSheet.traits)
			},
			traitIsSelected(traitKey){
				return traitKey === this.selectedChoiceKey
			},
			invalidTraitChoiceIsNotDeselected(traitKey) {
				return invalidChoiceIsNotDeselected(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.selectedChoiceKey
				)
			},
			traitIsTouchedByError(traitKey) {
				return (isTouchedByError(
					traitKey,
					this.characterStore.metadata.invalidLevels
					) || (this.traitIsSelected(traitKey) && this.traitIsOwned(traitKey))
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
				const failedRequirements = getFailedRequirements(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			},
			
		}
	}
</script>

<style>

</style>
