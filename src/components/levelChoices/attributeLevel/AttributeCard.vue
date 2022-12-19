<template>

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
				}"
			>
				<input
					type="radio"
					:id="attribute.key"
					:value="attribute.key"
					name="attribute"
					:disabled="!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)"
					class="trait-input"
					@change="emitOption(trait.key)"
				/>
				
				<div>
					<div class="margin-top-tiny">
						{{ getAttributeLongName(attribute.key) }}
						<span class="float-right margin-right-tiny">i</span> <!-- target -->
					</div>
					
					<div class="card medium padding-bottom-tiny padding-left-tiny padding-right-tiny font-size-nano">
						{{attribute.description}}
					</div>
					<div  
						v-if="(
							attributeIsInvalidAtThisLevel(attribute.key)
							&& invalidAttributeChoiceIsNotDeselected(attribute.key)
						|| (
							attributeIsTouchedByError(attribute.key)
							&& (!attributeIsInvalidAtThisLevel(attribute.key)))
						) || !invalidAttributeChoiceIsNotDeselected(attribute.key)"
					>
						<InvalidOccurrence 
							:characteristicProp="attribute.key"
							:selectedLevelProp="selectedLevel"
						/>
					</div>
					<div
						v-if="
							attributeIsInvalidAtThisLevel(attribute.key)
							&& invalidAttributeChoiceIsNotDeselected(attribute.key)" 
						class="margin-left-small font-size-nano"
					>
						Tak: {{ getAttributeLvlCeiling(selectedLevel) }}
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

</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'
	import {
		attributes,
		getAttributeLongName,
		canChooseAttribute,
		getAttributeLvlCeiling
	} from '../../../rules/characteristics/attributes'
	import { flattenCharacter } from '../../../rules/characterFlattener'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../../validators/validators'
	import InvalidOccurrence from '../../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['trait', 'isFontContrastLowestProp', 'isTouchedByErrorProp', 'isInvalidProp', 'selectedChoiceKeyProp', 'font-contrast-lowest'],
		setup(props) {
			const characterStore = useCharacterStore()
			const selectedLevel = props.selectedLevelProp
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			const characterSheet = flattenCharacter(characterStore, selectedLevel - 1) // -1 to account for current lvling
			const characterAttributes = characterSheet.attributes

			let originalLevelChoiceKey = ''
			if (selectedLevel <= characterStore.metadata.level) originalLevelChoiceKey = characterStore.history[selectedLevel].choice
			const selectedChoiceKey = ref(originalLevelChoiceKey)

			const showDescription = ref(false)

			return {
				characterStore,
				selectedLevel,
				levelIsChangable,
				attribute,
				characterAttributes,
				originalLevelChoiceKey,
				selectedChoiceKey,
				showDescription,
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
			},
			emitOption(selectedChoiceKey) {
				this.$emit('option', selectedChoiceKey)
			},

			/* 
			this is a function in a vue component.
			it is supposed to be called when the user clicks the toggle button.
			when clicked ir should toggle the visibbility of the description of the attribute.
			*/
			onClickToggleDescription() {
				this.showDescription = !this.showDescription
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
