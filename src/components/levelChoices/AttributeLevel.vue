<template>
	<div class='card square medium padding-large -fill'>

		<h3 class="align-center margin-top-nano margin-bottom-tiny">Öka en grundegenskap!</h3>
		Tak {{ getAttributeLvlCeiling(selectedLevel) }}

		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-nano width-whole'
		>
			<div
				:class="{
					'font-contrast-lowest': (
						!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)
						&& !attributeIsTouchedByError(attribute.key)
					)
				}"
				class="width-whole flex"
			>
				<div
					class="card dark width-whole padding-bottom-tiny"
					:class="{
						'touched-by-error': attributeIsTouchedByError(attribute.key),
						'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key) && attributeIsInvalidAtThisLevel(attribute.key)
					}"
				>
					<input
						type="radio"
						:id="attribute.key"
						:value="attribute.key"
						v-model="tempLevelChoiceKey"
						name="attribute"
						:disabled="!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)"
						class="margin-tiny radio-margins"
					/>
					<label :for='attribute.key' class="display-inline-block text-margins">

						<div>{{ getAttributeLongName(attribute.key) }}</div>

						<div 
							v-if="
								attributeIsInvalidAtThisLevel(attribute.key)
								&& invalidAttributeChoiceIsNotDeselected(attribute.key)
							"
							class="font-size-tiny"
						>
							Man får inte ha mer än {{ getAttributeLvlCeiling(selectedLevel) }} på den här erfarenhetsnivån.
						</div>

						<div 
							v-if="
								((
									attributeIsInvalidAtThisLevel(attribute.key)) 
									&& invalidAttributeChoiceIsNotDeselected(attribute.key)
								|| (
									attributeIsTouchedByError(attribute.key) && (!attributeIsInvalidAtThisLevel(attribute.key))
								)) || !invalidAttributeChoiceIsNotDeselected(attribute.key)
							"
						>
							<InvalidOccurrence 
								:characteristic="attribute.key"
								:characterStore="characterStore"
								:selectedLevel="selectedLevel"
							/>
						</div>

					</label>
				</div>
				<div
					v-if="tempLevelChoiceKey === attribute.key"
					:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
					class="card padding-top-nano light width-fourth margin-left-tiny align-center"
				>
					{{characterAttributes[attribute.key]}} + 1
				</div>
				<div
					v-if="tempLevelChoiceKey !== attribute.key"
					:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
					class="card padding-top-nano light width-fourth margin-left-tiny align-center"
				>
					{{ characterAttributes[attribute.key] }}
				</div>
			</div>
		</div>

		<button
			:disabled="!levelIsChangable"
			type="submit"
			class="margin-top-tiny margin-left-nano"
			@click="submitNewAttributeLevel()"
		>
			Submitta!
		</button>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import {
		attributes,
		getAttributeShortName,
		getAttributeLongName,
		canChooseAttribute,
		getAttributeLvlCeiling
	} from '../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import { contains } from '../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../utilities/validators'
	import InvalidOccurrence from '../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['selectedLevel', 'characterStore'],
		setup(props) {
			const characterStore = props.characterStore
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			const characterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const characterAttributes = characterSheet.attributes

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) originalLevelChoiceKey = characterStore.history[selectedLevel].choice
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)

			return {
				characterStore,
				selectedLevel,
				levelIsChangable,
				attributes,
				characterAttributes,
				originalLevelChoiceKey,
				tempLevelChoiceKey,
				getAttributeShortName,
				getAttributeLongName,
				canChooseAttribute,
				getAttributeLvlCeiling,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
			}
		},
		methods: {
			submitNewAttributeLevel() {
				this.characterStore.submitNewLevelChoice(
					this.tempLevelChoiceKey,
					this.selectedLevel,
					'attribute'
				)
				this.$emit('update-tabs')
			},
			isSelected(attributeKey){
				return attributeKey === this.tempLevelChoiceKey
			},
			invalidAttributeChoiceIsNotDeselected(key) {
				const isInvalidChoiceNotDeselected = this.invalidChoiceIsNotDeselected(
					key,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.tempLevelChoiceKey
				)
				return isInvalidChoiceNotDeselected
			},
			attributeIsTouchedByError(key) {
				const isTouchedByError = this.isTouchedByError(
					key,
					this.characterStore.metadata.invalidLevels
				)
				return isTouchedByError
			},
			attributeIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(
					key,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
				)
			},
			getInvalidOccurrences(key) {

				let invalidOccurrencesList = []

				for (const invalidLevel in this.characterStore.metadata.invalidLevels) {
					const invalidLevelBonus = this.characterStore.metadata.invalidLevels[invalidLevel]

					if (typeof invalidLevelBonus === 'object'
						&& contains(key, invalidLevelBonus)
					) {
						invalidOccurrencesList.push(invalidLevel)
					}

					if (typeof invalidLevelBonus === 'string'
						&& invalidLevelBonus === key
					) {
						invalidOccurrencesList.push(invalidLevel)
					}
				}
				
				return invalidOccurrencesList
			}
		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
	.radio-margins {
		margin-top: 1rem !important;
		margin-left: 1rem !important;
		margin-right: 1rem !important;
		vertical-align: top;
	}
	.text-margins {
	}
</style>
