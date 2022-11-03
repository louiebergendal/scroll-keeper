<template>
	<div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Välj en grej!</h3>
		Vald bonus: {{ getTraitNiceName(tempLevelChoiceKey) }}

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- trait is owned by tempCharacter (and clicked) but not valid --> 
			<div v-if="
				(
					contains(invalidLevels, key)
					&&
					contains(Object.keys(invalidLevels), selectedLevel.toString())
					&&
					trait.key === tempLevelChoiceKey
				)"
				class="card invalid flex width-whole"
			>
				<input type="radio" id="{{key}}" disabled="true" checked class="margin-tiny"/>
				<label for="{{key}}" class="bold font-contrast-high"> {{ trait.name }} </label>

				<!-- user guidance -->
				<div v-if="trait.requirements">
					<div v-for="(requiredTrait, key) in trait.requirements.traits" :key='key' class="flex margin-left-small">
						<p v-if="allSkills()[requiredTrait]" >Färdighetskrav: {{getTraitNiceName(requiredTrait)}}</p>
						<p v-if="allTalents()[requiredTrait]" >Talangkrav: {{getTraitNiceName(requiredTrait)}}</p>
					</div>
					<div v-for="(requiredAttribute, key) in trait.requirements.attributes" :key='key' class="flex margin-left-small">
						Grundegenskapskrav {{key}}: {{requiredAttribute}}
					</div>
					<div v-if="trait.requirements.metadata && trait.requirements.metadata.isChosenByFate" class="flex margin-left-small">
						Karaktären måste vara ödesvald
					</div>
					<div v-if="trait.requirements.metadata && trait.requirements.metadata.level" class="flex margin-left-small">
						Erfarenhetskrav: {{trait.requirements.metadata.level}}
					</div>
				</div>
			</div>

			<!-- trait is owned by tempCharacter but not valid -->
			<div v-if="
				(
					contains(invalidLevels, key)
					&&
					trait.key !== tempLevelChoiceKey
				)"
				class="card invalid width-whole"
			>
				<input type="radio" id="{{trait.key}}" disabled="true" class="margin-tiny"/>
				<label for="{{trait.key}}" class="font-contrast-lowest"> {{ trait.name }} </label>
				<div>Egenskapen har plockats olagligt på erfarenhetsnivå {{Object.keys(invalidLevels).find(element => element !== trait.key)}}</div>
			</div>

			<!-- trait is already owned by tempCharacter -->
			<div v-if="contains(tempCharacterTraitsList, trait.key) && !contains(invalidLevels, key)" class="card dark flex width-whole">
				<input type="radio" id="{{trait.key}}" disabled="true" checked class="margin-tiny"/>
				<label for="{{trait.key}}" class="bold font-contrast-low"> {{ trait.name }} </label>
			</div>

			<!-- trait is not owned by tempCharacter and cannot be chosen -->
			<div v-if="
				(
					!contains(tempCharacterTraitsList,trait.key)
					&&
					!canChooseTrait(
						trait.key,
						tempCharacterSheet.traits,
						tempCharacterSheet.attributes,
						tempCharacterSheet.metadata.isChosenByFate,
						selectedLevel
					)
				)
				&&
				!contains(
					invalidLevels,
					key
				)"
				class="card light width-whole"
			>
				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait"  disabled="true" class="margin-tiny"/>
				<label for="{{trait.key}}" class="font-contrast-lowest"> {{ trait.name }} </label>
			</div>

			<!-- trait is not owned by tempCharacter and can be chosen -->
			<div v-if="
				(
					!contains(tempCharacterTraitsList, trait.key
					) 
					&& 
					canChooseTrait(
						trait.key,
						tempCharacterSheet.traits,
						tempCharacterSheet.attributes,
						tempCharacterSheet.metadata.isChosenByFate,
						selectedLevel
					)
				)"
				:checked="trait.key === tempLevelChoiceKey"
				class="card medium width-whole"
			>
				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait" class="margin-tiny"/>
				<label for="{{trait.key}}"> {{ trait.name }} </label>

				<div v-if="(contains(Object.keys(trait), 'complexTrait') && trait.key === 'background')">
					<Background :characterStore="characterStore" @complex-payload="complexPayload" />
				</div>
				<div v-if="(contains(Object.keys(trait), 'complexTrait') && trait.key === 'scholar' && tempLevelChoiceKey === 'scholar')">
					<Scholar :tempCharacterSheet="tempCharacterSheet" :tempValidationSheet="tempValidationSheet" @complex-payload="complexPayload"/>
				</div>
				<div v-if="(contains(Object.keys(trait), 'complexTrait') && trait.key === 'pathfinder' && tempLevelChoiceKey === 'pathfinder')">
					<Pathfinder :tempCharacterSheet="tempCharacterSheet" @complex-payload="complexPayload"/>
				</div>
			</div>

		</div>
		<button :disabled="
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
	import { allSkills, allTalents, canChooseTrait, getTraitNiceName } from '../../rules/characteristics/traits'
	import { contains } from '../../rules/utils'
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
			const invalidLevels = tempValidationSheet.metadata.invalidLevels

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
				allTalents
			}
		},
		methods: {
			submitNewTraitLevel() {
				this.characterStore.submitNewLevelChoice(this.tempLevelChoiceKey, this.selectedLevel, this.traitType, this.complexTraitData)
				this.$emit('update-tabs') // gul varning i loggen
			},
			complexPayload(data) {
				let isValid = true

				for (const option in data) {	
					for (const choiceGroup in data[option].choices) {
						for (const skillChoice in data[option].choices[choiceGroup]) {
							if (!data[option].choices[choiceGroup][skillChoice]) {
								isValid = false
							}
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
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
