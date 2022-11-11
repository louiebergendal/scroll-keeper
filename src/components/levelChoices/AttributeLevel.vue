<template>
	<div class='card square medium padding-large -fill'>

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Öka en grundegenskap!</h3>

		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-nano width-whole'
		>
			<div
				:class="{
					'font-contrast-lowest': (
						!canChooseAttribute(tempCharacterAttributes[attribute.key], selectedLevel)
						&& !attributeIsTouchedByError(attribute.key)
					)
				}"
				class="width-whole flex"
			>
				<div
					class="card width-whole"
					:class="{
						'touched-by-error': attributeIsTouchedByError(attribute.key),
						'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key) && attributeIsInvalidAtThisLevel(attribute.key)
					}"
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
					<!-- <img class="attribute-icon" :src="attributeIcon" /> -->
					<label for="{{attribute.key}}"> {{getAttributeLongName(attribute.key)}} </label>
				</div>
				<div
					v-if="tempLevelChoiceKey === attribute.key"
					:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
					class="card dark width-fourth margin-left-tiny align-center"
				>
					{{tempCharacterAttributes[attribute.key]}} + 1
				</div>
				<div
					v-if="tempLevelChoiceKey !== attribute.key"
					:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
					class="card dark width-fourth margin-left-tiny align-center"
				>
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
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../utilities/validators'

	export default {
		props: ['selectedLevel', 'characterStore'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			const tempCharacterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const tempCharacterAttributes = tempCharacterSheet.attributes

			const tempValidationSheet = flattenCharacter(characterStore, selectedLevel)
			const invalidLevels = ref(tempValidationSheet.metadata.invalidLevels)

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) originalLevelChoiceKey = characterStore.history[selectedLevel].choice
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)

			const attributeIcon = '/img/' + props.iconUrl + '.png'
			return {
				characterStore,
				selectedLevel,
				levelIsChangable,
				attributes,
				tempCharacterAttributes,
				invalidLevels,
				originalLevelChoiceKey,
				tempLevelChoiceKey,
				getAttributeShortName,
				getAttributeLongName,
				canChooseAttribute,

				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
			}
		},
		methods: {
			submitNewAttributeLevel() {
				this.characterStore.submitNewLevelChoice(this.tempLevelChoiceKey, this.selectedLevel, 'attribute') // tell database
				this.$emit('update-tabs') // tell level ladder
				this.invalidLevels = this.characterStore.metadata.invalidLevels
			},
			invalidAttributeChoiceIsNotDeselected(key) {
				return this.invalidChoiceIsNotDeselected(key, this.invalidLevels, this.originalLevelChoiceKey, this.tempLevelChoiceKey)
			},
			attributeIsTouchedByError(key) {
				return this.isTouchedByError(key, this.invalidLevels)
			},
			attributeIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(key, this.invalidLevels, this.selectedLevel)
			}
		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
</style>
