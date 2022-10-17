<template>
    <div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Välj en grej!</h3>
		Vald bonus: {{ getTraitNiceName(tempLevelChoiceKey) }}

		<!--loop traits-->
		<div v-for="(trait, key) in traits" :key='key' class="flex">

			<!-- trait is owned by tempCharacter (and clicked) but not valid --> 
			<div v-if="!levelChoiceIsValid(key, tempValidationSheet.metadata.invalidLevels) && key === tempLevelChoiceKey" class="card invalid flex width-whole">
				<input type="radio" id="{{trait.key}}" disabled="true" checked class="margin-tiny"/>
				<label for="{{trait.key}}" class="bold font-contrast-high"> {{ trait.name }} </label>
				<div v-for="(requiredTrait, key) in trait.requirements.traits" :key='key' class="flex margin-left-small">
					<p v-if="allSkills()[requiredTrait]" >Färdighetskrav: {{getTraitNiceName(requiredTrait)}}</p>
					<p v-if="allTalents()[requiredTrait]" >Talangkrav: {{getTraitNiceName(requiredTrait)}}</p>
				</div>
				<div v-for="(requiredAttribute, key) in trait.requirements.attributes" :key='key' class="flex margin-left-small">Grundegenskapskrav {{key}}: {{requiredAttribute}}</div>
				<div v-if="trait.requirements.metadata && trait.requirements.metadata.isChosenByFate">
					Karaktären måste vara ödesvald
				</div>
				<div v-if="trait.requirements.metadata && trait.requirements.metadata.level">
					Erfarenhetskrav: {{trait.requirements.metadata.level}}
				</div>
			</div>

			<!-- trait is owned by tempCharacter but not valid -->
			<div v-if="!levelChoiceIsValid(key, tempValidationSheet.metadata.invalidLevels) && key !== tempLevelChoiceKey" class="card light width-whole">
				<input type="radio" id="{{trait.key}}" disabled="true" class="margin-tiny"/>
				<label for="{{trait.key}}" class="font-contrast-lowest"> {{ trait.name }} </label>
			</div>

			<!-- trait is already owned by tempCharacter -->
			<div v-if="contains(tempcharacterTraitsList, trait.key) && levelChoiceIsValid(key, tempValidationSheet.metadata.invalidLevels)" class="card dark flex width-whole">
				<input type="radio" id="{{trait.key}}" disabled="true" checked class="margin-tiny"/>
				<label for="{{trait.key}}" class="bold font-contrast-low"> {{ trait.name }} </label>



			</div>

			<!-- trait is not owned by tempCharacter and cannot be chosen -->
			<div v-if="(!contains(tempcharacterTraitsList, trait.key) && !canChooseTrait(trait.key, tempCharacterSheet.traits, tempCharacterSheet.attributes, tempCharacterSheet.metadata.isChosenByFate, selectedLevel)) && levelChoiceIsValid(key, tempValidationSheet.metadata.invalidLevels)" class="card light width-whole">
				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait"  disabled="true" class="margin-tiny"/>
				<label for="{{trait.key}}" class="font-contrast-lowest"> {{ trait.name }} </label>
			</div>

			<!-- trait is not owned by tempCharacter and can be chosen -->
			<div v-if="(!contains(tempcharacterTraitsList, trait.key) && canChooseTrait(trait.key, tempCharacterSheet.traits, tempCharacterSheet.attributes, tempCharacterSheet.metadata.isChosenByFate, selectedLevel))" :checked="trait.key === tempLevelChoiceKey" class="card medium width-whole">

				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait" class="margin-tiny"/>
				<label for="{{trait.key}}"> {{ trait.name }} </label>

				<div v-if="contains(Object.keys(trait), 'complexTrait')">
					<Background @complex-payload="complexPayload"/>
				</div>

			</div>
		</div>
		<button :disabled="!levelIsChangable" type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewTraitLevel()">Submitta!</button>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue';
	import { allSkills, allTalents, canChooseTrait, getTraitNiceName } from '../../rules/characteristics/traits'
	import { contains, levelChoiceIsValid } from '../../rules/utils'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import Background from './complexTalents/Background.vue'

	export default {
		components: {
			Background
		},
		props: ['selectedLevel', 'traitType'],
		emits: ['complexPayload'],
		setup(props) {
			const character = useCharacterStore()
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= character.metadata.level + 1)
            const traitType = props.traitType
			const tempCharacterSheet = flattenCharacter(character, selectedLevel - 1) // -1 to account for current lvling
			const tempValidationSheet = flattenCharacter(character, selectedLevel) 
			const tempcharacterTraitsList = tempCharacterSheet.traits
			
			const selectedGroup = ref('')
			const complexTraitData = ref({})

			console.log('tempcharacterTraitsList: ', tempcharacterTraitsList);

			let originalLevelChoiceKey = ''
			if (selectedLevel <= character.metadata.level) { originalLevelChoiceKey = character.history[selectedLevel].choice }
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
			
            let traits
            if (traitType === 'skill') { traits = allSkills() }
            if (traitType === 'talent') { traits = allTalents() }

			return {
                traitType,
				traits,
				tempcharacterTraitsList,
				tempCharacterSheet,
				tempValidationSheet,
				tempLevelChoiceKey,
				character,
				selectedLevel,
				levelIsChangable,
				complexTraitData,
				selectedGroup,
				contains,
				canChooseTrait,
				getTraitNiceName,
				levelChoiceIsValid,
				allSkills,
				allTalents

			}
		},
		methods: {
			submitNewTraitLevel() {
				this.character.submitNewLevelChoice(this.tempLevelChoiceKey, this.selectedLevel, this.traitType)
				this.$emit('update-tabs')
			},
			complexPayload(data) {
				console.log('Ping!');
				console.log('data:', data);
			}
		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
