<template>
	<div class="margin-bottom-small">
		<!-- loop sortedNiceTraits -->
		<div v-for="(trait, key) in sortedNiceTraits" :key="key" class="flex">
			<div
				class="width-whole"
				v-if="(selectedLevel === 1 && trait.key === 'background') && trait.key === 'background'"
			>
				<div class="margin-bottom-small">
					<RuleRelevantMetadata @update-tabs="$emit('update-tabs')" />
				</div>
				<Background @complex-payload="complexPayload"/>
		</div>
			<!-- not owned -->
			<div v-if="
				!traitIsOwned(trait.key)
				&& !(selectedLevel === 1 && trait.key !== 'background')
				&& trait.key !== 'background'
			"
				class="card width-whole dark margin-bottom-nano"
				:class="{
					'touched-by-error':
						traitIsTouchedByError(trait.key)
						&& containsKey('complexTrait', Object.keys(trait))
						&& traitIsSelected(trait.key),
					'selected': traitIsSelected(trait.key) && !traitIsTouchedByError(trait.key)
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
						:for="trait.key"
						class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start"
						:class="{
							'font-contrast-lowest':
								(cannotChooseTrait(trait.key)
								&& !traitIsTouchedByError(trait.key))
						}"
					>
						<input
							type="radio"
							v-model="selectedChoiceKey"
							:value="trait.key"
							:id="trait.key"
							:disabled="cannotChooseTrait(trait.key)"
							class="trait-input"
							@change="emitOption(selectedChoiceKey)" 
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
						<RuleRelevantMetadata
							@update-tabs="$emit('update-tabs')"
						/>
						<Background
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'scholar' && selectedChoiceKey === 'scholar'">
						<Scholar
							:characterSheetProp="tempCharacterSheet"
							:validationSheetProp="tempValidationSheet"
							@complex-payload="complexPayload"
						/>
					</div>
					<div v-if="trait.key === 'pathfinder' && selectedChoiceKey === 'pathfinder'">
						<Pathfinder
							:characterSheetProp="tempCharacterSheet"
							:validationSheetProp="tempValidationSheet"
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
					class="width-whole"
					:class="{
						'touched-by-error': traitIsTouchedByError(trait.key),
						'invalid-background':
						traitIsInvalidAtThisLevel(trait.key)
							&& invalidTraitChoiceIsNotDeselected(trait.key)
					}"
				>
					<label
						:for="key + '-owned'"
						class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start"
						:class="{ 'font-contrast-lowest' : !traitIsTouchedByError(trait.key) }"
					>
						<input
							type="radio"
							:id="key + '-owned'"
							disabled
							checked='true'
							class="trait-input"
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

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../stores/character'
	import {
		canChooseTrait,
		allTalents,
		attributeSkills,
		generalSkills,
		knowledgeSkills,
		favouredTerrainSkills,
		getTraitNiceName
	} from '../../rules/characteristics/traits'
	import { invalidChoiceIsNotDeselected, isTouchedByError, isInvalidAtThisLevel } from '../../validators/validators'
	import { containsKey } from '../../rules/utils'
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
		props: ['selectedLevelProp', 'traitTypeProp', 'selectedChoiceKeyProp', 'tempCharacterSheetProp', 'tempValidationSheetProp'],
		emits: ['complexPayload', 'update-tabs', 'selected-choiceKey'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const traitType = props.traitTypeProp
			const tempCharacterSheet = props.tempCharacterSheetProp
			const tempValidationSheet = ref(props.tempValidationSheetProp)

			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()

			const selectedChoiceKey = ref(props.selectedChoiceKeyProp)
			
			let traits
			if (traitType === 'attributeSkills') { traits = attributeSkills() }
			if (traitType === 'generalSkills') { traits = generalSkills() }
			if (traitType === 'knowledgeSkills') { traits = knowledgeSkills() }
			if (traitType === 'favouredTerrainSkills') { traits = favouredTerrainSkills() }
			if (traitType === 'talents') { traits = allTalents() }

			// get nice names
			let niceTraitKeysList = []
			for (const traitKey in traits) {
				const trait = traits[traitKey]
				trait.niceName = getTraitNiceName(traitKey)
				niceTraitKeysList.push(trait.niceName)
			}

			// trim and sort nice names
			niceTraitKeysList = niceTraitKeysList.sort()

			// build sorted trait array for template use
			let sortedNiceTraits = []
			for (let i = 0; i < niceTraitKeysList.length; i++) {
				const niceTraitKey = niceTraitKeysList[i];
				// second loop
				for (const traitKey in traits) {
					const trait = traits[traitKey]
					if (trait.niceName === niceTraitKey) sortedNiceTraits.push(trait)
				}	
			}

			return {
				characterStore,
				traitType,
				sortedNiceTraits,
				niceTraitKeysList,
				tempCharacterSheet,
				tempValidationSheet,
				selectedChoiceKey,
				selectedLevel,
				complexTraitData,
				hasFullComplexPayload,
				containsKey,
				canChooseTrait,
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
			})
		},
		watch: {
			tempValidationSheetProp: {
				handler(newVal) {
					this.tempValidationSheet.traits = newVal.traits
				},
				immediate: true
			},
			selectedChoiceKeyProp: {
				handler(newVal) {
					this.selectedChoiceKey = newVal
				},
				immediate: true
			}
		},
		methods: {
			complexPayload(data) {
				this.complexTraitData = data
				this.$emit('complexPayload', this.complexTraitData)
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
					this.selectedChoiceKeyProp,
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
			emitOption(selectedChoiceKey) {
				this.$emit('selected-choiceKey', {
					selectedChoiceKey
				})
			}
			
		}
	}
</script>

<style>

</style>
