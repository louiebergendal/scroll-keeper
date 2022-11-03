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
						'invalid-background': attributeChoiceIsNotValidButIsSelected(
							invalidLevels,
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
					<label for="{{attribute.key}}"> {{getAttributeLongName(attribute.key)}} </label>
				</div>
				<div
					v-if="tempLevelChoiceKey === attribute.key"
					:class="{
						'invalid': attributeChoiceIsNotValidButIsSelected(
							invalidLevels,
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

		<button :disabled="!levelIsChangable" type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewAttributeLevel()">Submitta!</button>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { attributes, getAttributeShortName, getAttributeLongName, canChooseAttribute } from '../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import { contains } from '../../rules/utils'

	export default {
		props: ['selectedLevel', 'characterStore'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const tempCharacterAttributes = tempCharacterSheet.attributes

			const tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const invalidLevels = tempValidationSheet.metadata.invalidLevels

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) originalLevelChoiceKey = characterStore.history[selectedLevel].choice
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)

			return {
				attributes,
				characterStore,
				selectedLevel,

				tempCharacterAttributes,
				invalidLevels,
				tempLevelChoiceKey,

				getAttributeShortName,
				getAttributeLongName,

				canChooseAttribute,
				levelIsChangable
			}
		},
		methods: {
			attributeChoiceIsNotValidButIsSelected(invalidLevels, attributeKey, tempLevelChoiceKey) {
				if (contains(invalidLevels, attributeKey)) {
					for (const invalidLevel in invalidLevels) {
						if (invalidLevels[invalidLevel] === tempLevelChoiceKey) return true
					}
				}
			},
			submitNewAttributeLevel() {
				this.characterStore.submitNewLevelChoice(this.tempLevelChoiceKey, this.selectedLevel, 'attribute') // tell database
				this.$emit('update-tabs') // tell level ladder
			},

		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
