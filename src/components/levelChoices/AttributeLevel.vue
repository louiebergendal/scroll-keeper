<template>
	<div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Öka en grundegenskap!</h3>
		Vald bonus: {{getAttributeLongName(tempLevelChoiceKey)}}
		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-nano width-whole'
		>
			<div :class="{ 'font-contrast-lowest': !canChooseAttribute(tempCharacterAttributes[attribute.key], selectedLevel) }" class="width-half flex">
				<div class="card dark width-whole">
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
				<div v-if="tempLevelChoiceKey === attribute.key" class="card dark width-fourth margin-left-tiny align-center">
					{{tempCharacterAttributes[attribute.key]}} + 1
				</div>
				<div v-if="tempLevelChoiceKey !== attribute.key" class="card dark width-fourth margin-left-tiny align-center">
					{{tempCharacterAttributes[attribute.key]}}
				</div>
			</div>
		</div>
		<button type="submit" class="margin-top-tiny margin-left-nano">Submitta!</button>
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
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
			const tempCharacterSheet = flattenCharacter(characterHistory, selectedLevel - 1) // -1 to account for current lvling
			const tempCharacterAttributes = tempCharacterSheet.attributes

			return {
				attributes,
				originalLevelChoiceKey,
				selectedLevel,
				tempCharacterAttributes,
				tempCharacterSheet,
				tempLevelChoiceKey,
				getAttributeShortName,
				getAttributeLongName,
				canChooseAttribute
			}
		}
	}

</script>


<style></style>
