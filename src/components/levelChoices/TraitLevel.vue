<template>
	<div class="card square medium padding-large">

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Välj en grej!</h3>

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- not owned -->
			<div v-if="!contains(key, tempCharacterSheet.traits)" 
				class="card width-whole dark margin-bottom-nano" 
				:class="{
					'touched-by-error': traitIsTouchedByError(key),
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
						' -angled-bottom': contains('complexTrait', Object.keys(trait)) && tempLevelChoiceKey === key
					}"
				>
					<input
						type="radio"
						v-model="tempLevelChoiceKey"
						:value="key"
						:id="key"
						:disabled="cannotChoseTrait(trait.key)"
						class="margin-tiny"
					/>
					<label 
						:for="key"
						:class="{
							'font-contrast-lowest'
							: (cannotChoseTrait(trait.key) && !traitIsTouchedByError(key))}"
					>
						{{ trait.name }}
					</label>
				</div>

				<!-- complex traits -->
				<div
					v-if="contains('complexTrait', Object.keys(trait))"
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
					</div>
					<div v-if="trait.key === 'pathfinder' && tempLevelChoiceKey === 'pathfinder'">
						<Pathfinder :characterStore="characterStore" :tempCharacterSheet="tempCharacterSheet" :tempValidationSheet="tempValidationSheet" @complex-payload="complexPayload"/>
					</div>
				</div>
								
			</div>

			<!-- already owned -->
			<div 
				v-if="contains(key, tempCharacterSheet.traits)"
				class="card dark flex width-whole padding-bottom-tiny padding-top-nano margin-bottom-nano"
				:class="{
					'touched-by-error': traitIsTouchedByError(key),
					'invalid-background': traitIsInvalidAtThisLevel(key)}"
			>
				<input
					type="radio"
					:id="key + '-owned'"
					disabled
					checked='true'
					class="margin-tiny"
				/>
				<label :for="key + '-owned'" :class="{ 'font-contrast-low' : !traitIsTouchedByError(key) }" >
					{{ trait.name }} <!-- CSS Error? -->
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
		emits: ['complexPayload', 'update-tabs'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const traitType = props.traitType
		
			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const tempCharacterTraitsList = tempCharacterSheet.traits
			const tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const invalidLevels = ref(characterStore.metadata.invalidLevels)

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
				characterStore,
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

				this.tempValidationSheet.metadata.invalidLevels = this.characterStore.metadata.invalidLevels
				this.tempValidationSheet = this.tempValidationSheet

			},
			complexPayload(data) {
				let isValid = true

				for (const option in data) {	
					for (const choiceGroup in data[option].choices) {
						for (const skillChoice in data[option].choices[choiceGroup]) {
							const skillChoiceKey = data[option].choices[choiceGroup][skillChoice]
							if (!skillChoiceKey) { isValid = false }
							if (contains(skillChoiceKey, explodeInvalidList(this.characterStore.metadata.invalidLevels))) { isValid = false }
						}
					}
				}

				this.hasFullComplexPayload = isValid
				this.complexTraitData = data
			},
			invalidTraitChoiceIsNotDeselected(key) {
				return this.invalidChoiceIsNotDeselected(key, this.characterStore.metadata.invalidLevels, this.originalLevelChoiceKey, this.tempLevelChoiceKey)
			},
			traitIsTouchedByError(key) {
				return this.isTouchedByError(key, this.characterStore.metadata.invalidLevels)
			},
			traitIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(key, this.characterStore.metadata.invalidLevels, this.selectedLevel)
			},
			cannotChoseTrait(key) {
				return !canChooseTrait(
					key, 
					this.tempCharacterSheet.traits, 
					this.tempCharacterSheet.attributes, 
					this.tempCharacterSheet.metadata.isChosenByFate, 
					this.selectedLevel
				)
			}
		}
	}
</script>

<style>
</style>
