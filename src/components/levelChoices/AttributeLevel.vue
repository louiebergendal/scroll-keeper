<template>
	<div class='card medium padding-tiny'>

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Öka en grundegenskap!</h3>

		<div>Vald bonus: {{tempLevelChoiceKey}}</div>

		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-nano width-whole'
		>
			<div
				:class="{ 'font-contrast-lowest': !canChooseAttribute(tempCharacterAttributes[attribute.key], selectedLevel) }"
				class="width-half flex"
			>
				<div
					:class="{
						'invalid': attributeChoiceIsNotValidButIsSelected(
							tempValidationSheet.metadata.invalidLevels,
							attribute.key,
							tempLevelChoiceKey
						)
					}"
					class="card dark width-whole"
				>
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

				<div
					v-if="tempLevelChoiceKey === attribute.key"
					:class="{
						'invalid': attributeChoiceIsNotValidButIsSelected(
							tempValidationSheet.metadata.invalidLevels,
							attribute.key,
							tempLevelChoiceKey
						)
					}"
					class="card dark width-fourth margin-left-tiny align-center"
				>
					{{tempCharacterAttributes[attribute.key]}} + 1
				</div>

				<div v-if="tempLevelChoiceKey !== attribute.key" class="card dark width-fourth margin-left-tiny align-center">
					{{tempCharacterAttributes[attribute.key]}}
				</div>

			</div>
		</div>

		<button type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewChoice(tempLevelChoiceKey)">Submitta!</button>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue'
	import { attributes, getAttributeShortName, getAttributeLongName, canChooseAttribute } from '../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import { levelChoiceIsValid } from '../../rules/utils'

	export default {
		props: ['selectedLevel'],
		setup(props) {
			const character = useCharacterStore()
			const characterHistory = character.history
			const selectedLevel = props.selectedLevel
			const originalLevelChoiceKey = characterHistory[selectedLevel].choice
			console.log('--- flattenCharacter in "AttributeLevel (tempCharacterSheet)" ---');
			const tempCharacterSheet = flattenCharacter(characterHistory, selectedLevel - 1) // -1 to account for current lvling
			console.log('--- flattenCharacter in "AttributeLevel (tempValidationSheet)" ---');
			const tempValidationSheet =  flattenCharacter(characterHistory, selectedLevel) 
			const tempCharacterAttributes = tempCharacterSheet.attributes
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
 
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

			}
		},
		methods: {
			attributeChoiceIsNotValidButIsSelected(invalidLevels, attributeKey, tempLevelChoiceKey) {
				if (!levelChoiceIsValid(attributeKey, invalidLevels)) {
					for (const invalidLevel in invalidLevels) {
						if (invalidLevels[invalidLevel] === tempLevelChoiceKey) return true
					}
				}
			},
			submitNewChoice(tempLevelChoiceKey) {
				const refString = this.character.metadata.characterRefString + '/history/' + this.selectedLevel
				const data = { choice: tempLevelChoiceKey }
				this.character.updateCharacterField(refString, data)
			}

		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
