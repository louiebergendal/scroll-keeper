<template>
	<div class="card medium padding-tiny">

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Välj en grej!</h3>

		invalidLevels: {{invalidLevels}}

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- not owned -->
			<div v-if="!contains(tempCharacterSheet.traits, key)" 
				class="card width-whole dark margin-bottom-nano" 
				:class="{
					'touched-by-error': traitIsTouchedByError(key),
					'invalid-background': invalidTraitChoiceIsNotDeselected(key) && traitIsInvalidAtThisLevel(key)
				}"
			>
				<div 
					class="padding-bottom-tiny"
					:class="{	
						'touched-by-error': traitIsTouchedByError(key),
						'invalid-background':
							traitIsInvalidAtThisLevel(key)
							&& (tempLevelChoiceKey == key)
						,
						'font-contrast-lowest': invalidTraitChoiceIsNotDeselected(key) && !traitIsTouchedByError(key),
						' -angled-bottom': contains(Object.keys(trait), 'complexTrait') && tempLevelChoiceKey === key
					}"
				>
					<input
						type="radio"
						v-model="tempLevelChoiceKey"
						:value="key"
						:id="key"
						:disabled="!canChooseTrait(
							trait.key, 
							tempCharacterSheet.traits, 
							tempCharacterSheet.attributes, 
							tempCharacterSheet.metadata.isChosenByFate, 
							selectedLevel
						)"
						class="margin-tiny"
					/>
					<label 
						:for="key"
						:class="{
							'font-contrast-lowest'
							: (!canChooseTrait(
								trait.key, 
								tempCharacterSheet.traits, 
								tempCharacterSheet.attributes, 
								tempCharacterSheet.metadata.isChosenByFate, 
								selectedLevel
							) && !traitIsTouchedByError(key))}"
					>
						{{ trait.name }}
					</label>
				</div>

				<!-- complex traits -->
				<div
					v-if="contains(Object.keys(trait), 'complexTrait')"
					class="width-whole angled-top"
					:class="{
						'touched-by-error': traitIsTouchedByError(key),
						'font-contrast-lowest': invalidTraitChoiceIsNotDeselected(key) && !traitIsTouchedByError(key)
					}"
				>
					<div v-if="trait.key === 'background'">
						<Background :characterStore="characterStore" @complex-payload="complexPayload" />
					</div>
					<div v-if="trait.key === 'scholar' && tempLevelChoiceKey === 'scholar'">
						<Scholar :tempCharacterSheet="tempCharacterSheet" :tempValidationSheet="tempValidationSheet" @complex-payload="complexPayload"/>
						{{tempCharacterSheet.metadata.invalidLevels}}
					
					</div>
					<div v-if="trait.key === 'pathfinder' && tempLevelChoiceKey === 'pathfinder'">
						<Pathfinder :tempCharacterSheet="tempCharacterSheet" @complex-payload="complexPayload"/>
					</div>
				</div>
				
			</div>

			<!-- already owned -->
			<div 
				v-if="contains(tempCharacterSheet.traits, key)"
				class="card dark flex width-whole padding-bottom-tiny padding-top-nano margin-bottom-nano"
				:class="{
					'invalid-background': isInvalidAtThisLevel(key, invalidLevels, selectedLevel)}"
			>
				<input
					type="radio"
					:id="key + '-owned'"
					disabled
					checked='true'
					class="margin-tiny"
				/>
				<label :for="key + '-owned'" :class="{ 'font-contrast-low' : !traitIsTouchedByError(key) }" >
					{{ trait.name }}
				</label>
			</div>
		</div>

		<button
			:disabled="
				(
					!levelIsChangable
					||
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
			@click="submitNewTraitLevel()">
			Submitta! 
		</button>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { allSkills, allTalents, canChooseTrait, getTraitNiceName } from '../../rules/characteristics/traits'
	import { contains, explodeInvalidList } from '../../rules/utils'
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
		emits: ['complexPayload'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const traitType = props.traitType
		
			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const tempCharacterTraitsList = tempCharacterSheet.traits
			const tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const invalidLevels = ref(tempValidationSheet.metadata.invalidLevels)

			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)
			const complexTraitData = ref({})
			const hasFullComplexPayload = ref()

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) { originalLevelChoiceKey = characterStore.history[selectedLevel].choice }
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
			
			let traits
			if (traitType === 'skill') { traits = allSkills() }
			if (traitType === 'talent') { traits = allTalents() }

			return {
				traitType,
				traits,
				tempCharacterTraitsList,
				tempCharacterSheet,
				tempValidationSheet,
				invalidLevels,
				originalLevelChoiceKey,
				tempLevelChoiceKey,
				characterStore,
				selectedLevel,
				levelIsChangable,
				complexTraitData,
				hasFullComplexPayload,
				contains,
				canChooseTrait,
				getTraitNiceName,
				allSkills,
				allTalents,
				explodeInvalidList,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError
			}
		},
		methods: {
			submitNewTraitLevel() {
				this.characterStore.submitNewLevelChoice(this.tempLevelChoiceKey, this.selectedLevel, this.traitType, this.complexTraitData)
				this.$emit('update-tabs') // gul varning i loggen
				this.invalidLevels = this.characterStore.metadata.invalidLevels
			},
			complexPayload(data) {
				let isValid = true

				for (const option in data) {	
					for (const choiceGroup in data[option].choices) {
						for (const skillChoice in data[option].choices[choiceGroup]) {
							const skillChoiceKey = data[option].choices[choiceGroup][skillChoice]
							if (!skillChoiceKey) { isValid = false }
							if (contains(explodeInvalidList(this.invalidLevels), skillChoiceKey)) { isValid = false }
						}
					}
				}

				this.hasFullComplexPayload = isValid
				this.complexTraitData = data
			},
			invalidTraitChoiceIsNotDeselected(key) {
				return this.invalidChoiceIsNotDeselected(key, this.invalidLevels, this.originalLevelChoiceKey, this.tempLevelChoiceKey)
			},
			traitIsTouchedByError(key) {
				return this.isTouchedByError(key, this.invalidLevels)
			},
			traitIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(key, this.invalidLevels, this.selectedLevel)
			}
		}
	}
</script>

<style>
</style>
