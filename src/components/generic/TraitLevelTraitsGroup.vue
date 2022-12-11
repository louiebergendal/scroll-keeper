<template>
	<div class="">
		<!-- loop sortedNiceTraits -->
		<div v-for="(trait, key) in sortedNiceTraits" :key="key" class="flex">

			<div v-if="trait.key !== 'background'" class="width-whole">
				<TraitLevelTraitCard 
					:traitProp="trait"
					:isFontContrastLowestProp="cannotChooseTrait(trait.key) && !traitIsTouchedByError(trait.key)"
					:isTouchedByErrorProp="traitIsTouchedByError(trait.key)"
					:isInvalidProp="traitIsInvalidAtThisLevel(trait.key) && traitIsSelected(trait.key)"
					:isSelectedProp="traitIsSelected(trait.key)"
					:cannotChooseTraitProp="cannotChooseTrait(trait.key)"
				>
					<template #input>
						<input
							type="radio"
							v-model="selectedChoiceKey"
							:value="trait.key"
							:id="trait.key"
							:disabled="cannotChooseTrait(trait.key)"
							class="trait-input"
							@change="emitOption(selectedChoiceKey)" 
						/>
					</template>

					<template #cardText>
						<TraitLevelCardText
							:traitProp="trait"									
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="traitType"
							:tempValidationSheetProp="tempValidationSheet"
							:tempCharacterSheetProp="tempCharacterSheet"
							:selectedChoiceKeyProp="selectedChoiceKey"
						/>
					</template>

					<template #complexTrait>
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
					</template>

					<template #ruleRelevantMetadata>
						<RuleRelevantMetadata @update-tabs="$emit('update-tabs')" />
					</template>
				</TraitLevelTraitCard>
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
	import RuleRelevantMetadata from '../levelChoices/complexTalents/background/RuleRelevantMetadata.vue'
	import TraitLevelCardText from './TraitLevelCardText.vue'
	import TraitLevelTraitCard from './TraitLevelTraitCard.vue'
	import Scholar from '../levelChoices/complexTalents/Scholar.vue'
	import Pathfinder from '../levelChoices/complexTalents/Pathfinder.vue'
	import Background from '../levelChoices/complexTalents/background/Background.vue'

	export default {
		components: {
			RuleRelevantMetadata,
			TraitLevelCardText,
			TraitLevelTraitCard,
			Pathfinder,
			Scholar,
			Background
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
