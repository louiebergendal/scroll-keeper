<template>
	<div class="">
		<!-- loop sortedNiceTraits -->
		<div v-for="(trait, key) in sortedNiceTraits" :key="key" class="flex">
			<div v-if="trait.key !== 'background'" class="width-whole">
				<TraitLevelTraitCard 
					:traitProp = "trait"
					:isFontContrastLowestProp="cannotChooseTrait(trait.key) && !traitIsTouchedByError(trait.key)"
					:isTouchedByErrorProp="traitIsTouchedByError(trait.key)"
					:isInvalidProp="traitIsInvalidAtThisLevel(trait.key) && traitIsSelected(trait.key)"
					:selectedChoiceKeyProp="selectedChoiceKey"
					:cannotChooseTraitProp="cannotChooseTrait(trait.key)"
					:tempCharacterSheetProp="tempCharacterSheet"
					@option="emitOption"
				>
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
						<!-- <div v-if="trait.key === 'jackOfAllTrades' && selectedChoiceKey === 'jackOfAllTrades'">
							<JackOfAllTrades
								:characterSheetProp="tempCharacterSheet"
								:validationSheetProp="tempValidationSheet"
								@complex-payload="complexPayload"
							/>
						</div> -->
					</template>
				</TraitLevelTraitCard>
			</div>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'
	import {
		canChooseTrait,
		allTalents,
		attributeSkills,
		generalSkills,
		knowledgeSkills,
		favouredTerrainSkills,
		masterSkills
	} from '../../../rules/characteristics/traits'
	import { invalidChoiceIsNotDeselected, isTouchedByError, isInvalidAtThisLevel } from '../../../validators/validators'
	import { containsKey } from '../../../rules/utils'
	import TraitLevelCardText from './TraitLevelCardText.vue'
	import Scholar from '../complexTalents/Scholar.vue'
	import Pathfinder from '../complexTalents/Pathfinder.vue'
	//import JackOfAllTrades from '../complexTalents/JackOfAllTrades.vue'

	export default {
		name: 'TraitLevelTraitsGroup',
		components: {
			TraitLevelCardText,
			Pathfinder,
			Scholar
		},
		props: ['selectedLevelProp', 'traitTypeProp', 'selectedChoiceKeyProp', 'tempCharacterSheetProp', 'tempValidationSheetProp'],
		emits: ['complexPayload', 'selected-choice-key'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const traitType = props.traitTypeProp
			const tempCharacterSheet = props.tempCharacterSheetProp
			const tempValidationSheet = ref(props.tempValidationSheetProp)
			const complexTraitData = ref({})
			const selectedChoiceKey = ref(props.selectedChoiceKeyProp)
			
			let traits
			if (traitType === 'attributeSkills') { traits = attributeSkills() }
			if (traitType === 'generalSkills') { traits = generalSkills() }
			if (traitType === 'knowledgeSkills') { traits = knowledgeSkills() }
			if (traitType === 'favouredTerrainSkills') { traits = favouredTerrainSkills() }
			if (traitType === 'masterSkills') { traits = masterSkills() }
			if (traitType === 'talents') { traits = allTalents() }

			// get nice names
			let niceTraitKeysList = []
			for (const traitKey in traits) {
				const trait = traits[traitKey]
				niceTraitKeysList.push(trait.name)
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
					if (trait.name === niceTraitKey) sortedNiceTraits.push(trait)
				}	
			}

			return {
				characterStore,
				traitType,
				sortedNiceTraits,
				tempCharacterSheet,
				tempValidationSheet,
				selectedChoiceKey,
				selectedLevel,
				complexTraitData,
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
				this.$emit('selected-choice-key', {
					selectedChoiceKey
				})
			}
			
		}
	}
</script>

<style>

</style>
