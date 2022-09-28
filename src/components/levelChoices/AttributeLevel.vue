<template>
	<div class='card medium padding-tiny'>

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Öka en grundegenskap!</h3>

		<div>Vald bonus: {{tempLevelChoiceKey}}</div>

		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-nano width-whole'
		>
			<div :class="{ 'font-contrast-lowest': !canChooseAttribute(tempCharacterAttributes[attribute.key], selectedLevel) }" class="width-half flex">

				<div :class="{ 'invalid': (tempValidationSheet.metadata.invalidLevels[selectedLevel] === attribute.key && tempValidationSheet.metadata.invalidLevels[selectedLevel] === tempLevelChoiceKey)}" class="card dark width-whole">
					<input
						type="radio" 
						id="{{attribute.key}}" 
						:value='attribute.key' 
						v-model="tempLevelChoiceKey" 
						name="attribute" 
						:disabled="!canChooseAttribute(tempCharacterAttributes[attribute.key], selectedLevel)"
						
						class="margin-tiny"
					/>
					<label for="{{attribute.key}}"> {{getAttributeShortName(attribute.key)}} </label>
				</div>

				<div v-if="tempLevelChoiceKey === attribute.key" :class="{ 'invalid': (tempValidationSheet.metadata.invalidLevels[selectedLevel] === attribute.key && tempValidationSheet.metadata.invalidLevels[selectedLevel] === tempLevelChoiceKey)}" class="card dark width-fourth margin-left-tiny align-center">
					{{tempCharacterAttributes[attribute.key]}} + 1
				</div>

				<div v-if="tempLevelChoiceKey !== attribute.key" class="card dark width-fourth margin-left-tiny align-center">
					{{tempCharacterAttributes[attribute.key]}}
				</div>

			</div>
		</div>

		<button type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewChoice">Submitta!</button>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue'
	import { attributes, getAttributeShortName, getAttributeLongName, canChooseAttribute } from '../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../utilities/characterFlattener'

	export default {
		props: ['selectedLevel'],
		setup(props) {
			const character = useCharacterStore()
			const characterHistory = character.history
			const selectedLevel = props.selectedLevel
			const originalLevelChoiceKey = characterHistory.history[selectedLevel].choice
			const tempCharacterSheet = flattenCharacter(characterHistory, selectedLevel - 1) // -1 to account for current lvling
			const tempValidationSheet =  flattenCharacter(characterHistory, selectedLevel) 
			const tempCharacterAttributes = tempCharacterSheet.attributes
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)

			const submitNewChoice = function() {
				const refString = character.metadata.characterRefString + '/history/' + selectedLevel
				const data = { choice: tempLevelChoiceKey.value }
				character.updateCharacterField(refString, data)
			}

			return {
				attributes,
				character,
				originalLevelChoiceKey,
				selectedLevel,
				tempCharacterAttributes,
				tempCharacterSheet,
				tempValidationSheet,
				tempLevelChoiceKey,
				getAttributeShortName,
				getAttributeLongName,
				canChooseAttribute,
				submitNewChoice
			}
		}
	}
/* "push lvl choise to db"
	
*/
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
