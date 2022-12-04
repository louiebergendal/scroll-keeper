<template>
	<div class='card flex -dir-col square medium padding-large -fill'>

		<h3 class="align-center margin-top-nano margin-bottom-medium">Öka en grundegenskap!</h3>
		<div
			v-for='attribute in attributes'
			:key='attribute.key'
			class='width-whole flex margin-bottom-nano width-whole'
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
					:class="{
						'selected': selectedChoiceKey === attribute.key && !attributeIsTouchedByError(attribute.key),
						'touched-by-error': attributeIsTouchedByError(attribute.key),
						'invalid-background': (
							invalidAttributeChoiceIsNotDeselected(attribute.key) 
							&& attributeIsInvalidAtThisLevel(attribute.key)
						)
					}"
					class="width-whole card dark"
				>
					<label
						:for='attribute.key'
						class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start"
						:class="{
							'touched-by-error': attributeIsTouchedByError(attribute.key),
							'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key) && attributeIsInvalidAtThisLevel(attribute.key)
						}">
						<input
							type="radio"
							:id="attribute.key"
							:value="attribute.key"
							v-model="selectedChoiceKey"
							name="attribute"
							:disabled="!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)"
							class="trait-input"
						/>
						<div>
							<div class="margin-top-tiny">{{ getAttributeLongName(attribute.key) }}</div>
							<div 
								v-if="(
									attributeIsInvalidAtThisLevel(attribute.key)
									&& invalidAttributeChoiceIsNotDeselected(attribute.key)
								|| (
									attributeIsTouchedByError(attribute.key) && (!attributeIsInvalidAtThisLevel(attribute.key))
								)) || !invalidAttributeChoiceIsNotDeselected(attribute.key)
							"
						>
							<InvalidOccurrence 
								:characteristic-prop="attribute.key"
								:selected-level-prop="selectedLevel"
							/>
						</div>

							<div 
								v-if="((
										attributeIsInvalidAtThisLevel(attribute.key)) 
										&& invalidAttributeChoiceIsNotDeselected(attribute.key)
									|| (
										attributeIsTouchedByError(attribute.key) && (!attributeIsInvalidAtThisLevel(attribute.key))
									)) || !invalidAttributeChoiceIsNotDeselected(attribute.key)
								"
							>
								<InvalidOccurrence 
									:characteristicProp="attribute.key"
									:selectedLevelProp="selectedLevel"
								/>
							</div>
						</div>
					</label>
				</div>
				<div
					v-if="selectedChoiceKey === attribute.key"
					class="width-fourth flex margin-left-tiny"
				>
					<div
						:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
						class="card light width-half align-center"
					>
						<span class="vertical-align-middle bold font-size-small">+ 1</span>
					</div>
					<div class="card light width-half align-center margin-left-nano">
						<div class="bold font-size-medium attribute-result">{{ characterAttributes[attribute.key] + 1}} </div>
					</div>
				</div>
				<div
					v-if="selectedChoiceKey !== attribute.key"
					:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute.key)}"
					class="width-fourth card light margin-left-tiny align-center"
				>
					<span class="vertical-align-middle">{{ characterAttributes[attribute.key] }} </span>
				</div>
			</div>
		</div>
		<div class="width-whole flex">
			<div class="width-whole padding-left-small">
			</div>
			<div class="width-fourth align-center">
				<span>Tak: {{ getAttributeLvlCeiling(selectedLevel) }}</span>
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
	import { useCharacterStore } from '../../stores/character'
	import {
		attributes,
		getAttributeShortName,
		getAttributeLongName,
		canChooseAttribute,
		getAttributeLvlCeiling
	} from '../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../utilities/characterFlattener'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../validators/validators'
	import InvalidOccurrence from '../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['selectedLevelProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			const characterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const characterAttributes = characterSheet.attributes

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) originalLevelChoiceKey = characterStore.history[selectedLevel].choice
			const selectedChoiceKey = ref(originalLevelChoiceKey)

			return {
				characterStore,
				selectedLevel,
				levelIsChangable,
				attributes,
				characterAttributes,
				originalLevelChoiceKey,
				selectedChoiceKey,
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
					this.selectedChoiceKey,
					this.selectedLevel,
					'attribute'
				)
				this.$emit('update-tabs')
			},
			invalidAttributeChoiceIsNotDeselected(key) {
				const isInvalidChoiceNotDeselected = this.invalidChoiceIsNotDeselected(
					key,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.selectedChoiceKey
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
			}
		}
	}
</script>


<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
	.attribute-result {
		margin-top: -1px;
	}
</style>
