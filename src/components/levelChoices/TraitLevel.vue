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
				!this.validate.traitIsOwned(trait.key)
				&& !(selectedLevel === 1 && trait.key !== 'background')
			"
				class="card width-whole dark margin-bottom-nano"
				:class="{
					'touched-by-error':
					this.validate.traitIsTouchedByError(trait.key)
						&& containsKey('complexTrait', Object.keys(trait))
						&& this.validate.traitIsSelected(trait.key)
				}"
			>
				<div
					class=""
					:class="{
						'touched-by-error -sub': this.validate.traitIsTouchedByError(trait.key),
						'invalid-background':
							this.validate.traitIsInvalidAtThisLevel(trait.key)
							&& this.validate.traitIsSelected(trait.key),
						'font-contrast-lowest':
							this.validate.invalidTraitChoiceIsNotDeselected(trait.key)
							&& !this.validate.traitIsTouchedByError(trait.key),
						' -angled-bottom':
							containsKey('complexTrait', Object.keys(trait))
							&& this.validate.traitIsSelected(trait.key)
					}"
				>
					<label
						:for="key"
						class="display-inline-block"
						:class="{
							'font-contrast-lowest':
								(this.validate.cannotChooseTrait(trait.key)
								&& !this.validate.traitIsTouchedByError(trait.key))
						}"
					>
						<input
							type="radio"
							v-model="tempLevelChoiceKey"
							:value="key"
							:id="key"
							:disabled="this.validate.cannotChooseTrait(trait.key)"
							class="margin-tiny vertical-align-top"
						/>
						<TraitLevelCardText
							:traitProp="trait"
							:selectedLevel="selectedLevel"
							:traitType="traitType"
							:tempValidationSheet="tempValidationSheet"
							:tempCharacterSheet="tempCharacterSheet"
							:tempLevelChoiceKeyProp="tempLevelChoiceKey"
						/>
					</label>

				</div>

				<!-- complex traits -->
				<div
					v-if="containsKey('complexTrait', Object.keys(trait))"
					class="width-whole angled-top"
					:class="{
						'touched-by-error': this.validate.traitIsTouchedByError(trait.key),
						'font-contrast-lowest':
						this.validate.invalidTraitChoiceIsNotDeselected(trait.key)
							&& !this.validate.traitIsTouchedByError(trait.key)
					}"
				>
					<div v-if="trait.key === 'background'">
						<RuleRelevantMetadata @update-tabs="$emit('update-tabs')" />
						<Background
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'scholar' && tempLevelChoiceKey === 'scholar'">
						<Scholar
							:tempCharacterSheet="tempCharacterSheet"
							:tempValidationSheet="tempValidationSheet"
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'pathfinder' && tempLevelChoiceKey === 'pathfinder'">
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
				v-if="this.validate.traitIsOwned(trait.key) && trait.key !== 'background'"
				class="card dark width-whole flex margin-bottom-nano"
			>
				<div
					class="padding-bottom-tiny padding-top-nano width-whole"
					:class="{
						'touched-by-error': this.validate.traitIsTouchedByError(trait.key),
						'invalid-background':
						this.validate.traitIsInvalidAtThisLevel(trait.key)
							&& this.validate.invalidTraitChoiceIsNotDeselected(trait.key)
					}"
				>
					<label
						:for="key + '-owned'"
						class="display-inline-block"
						:class="{ 'font-contrast-lowest' : !this.validate.traitIsTouchedByError(trait.key) }"
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
							:selectedLevel="selectedLevel"
							:traitType="traitType"
							:tempValidationSheet="tempValidationSheet"
							:tempCharacterSheet="tempCharacterSheet"
							:tempLevelChoiceKeyProp="tempLevelChoiceKey"
						/>
					</label>
				</div>
			</div>

		</div>

		<button
			:disabled="
				(
					!tempLevelChoiceKey
					||
					(traits[tempLevelChoiceKey].complexTrait
					&& !hasFullComplexPayload)
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
	import { useCharacterStore } from '../../stores/character'
	import {
		allSkills,
		allTalents,
		canChooseTrait,
		getFailedRequirements
	} from '../../rules/characteristics/traits'
	import TraitValidatorBridge from '../../validators/TraitValidatorBridge'
	import { containsKey } from '../../rules/utils'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import InvalidOccurrence from '../generic/InvalidOccurrence.vue'
	import RuleRelevantMetadata from './RuleRelevantMetadata.vue'
	import TraitLevelCardText from '../generic/TraitLevelCardText.vue'
	import Background from './complexTalents/Background.vue'
	import Scholar from './complexTalents/Scholar.vue'
	import Pathfinder from './complexTalents/Pathfinder.vue'

	export default {
		components: {
			InvalidOccurrence,
			RuleRelevantMetadata,
			TraitLevelCardText,
			Pathfinder,
			Background,
			Scholar
		},
		props: ['selectedLevel', 'traitType'],
		emits: ['complexPayload', 'update-tabs'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevel
			const traitType = props.traitType
			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			let tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()
			let validate = undefined

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
				validate,
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
			}
		},
		beforeMount() {
			this.validate = new TraitValidatorBridge(
				this.tempCharacterSheet.traits,
				this.tempCharacterSheet.attributes,
				this.selectedLevel,
				this.characterStore.metadata.invalidLevels,
				this.tempLevelChoiceKey,
				this.tempCharacterSheet,
				this.originalLevelChoiceKey
			)
			this.characterStore.$subscribe((_mutation, state) => {

			})
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
							if (this.validate.traitIsInvalidAtThisLevel(skillChoiceKey)) isValid = false
						}
					}
				}
				this.hasFullComplexPayload = isValid
				this.complexTraitData = data
			}
		}
	}
</script>

<style>

</style>
