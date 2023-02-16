<template>
	<div class='card flex -dir-col square medium padding-large -fill'>

		<h3 class="align-center margin-top-nano margin-bottom-medium">Öka en grundegenskap</h3>

		<div 
			v-if="
				characterStore.metadata.invalidLevels[selectedLevel]
				&& characterStore.metadata.invalidLevels[selectedLevel][0] === 'invalidKey'"
			class="card padding-left-small margin-bottom-small font-size-nano padding-tiny touched-by-error invalid-background"
		>
			Det har skett en karaktärsbrytande uppdatering av regelverket. Ditt val på den här erfarenhetsnivån är inte längre giltigt.
			För att åtgärda felet, gör ett nytt val på den här erfarenhetsnivån.
			<br>
			<br>
			Den ogiltiga egenskapens nyckel: [ <span class="italic">{{ characterStore.metadata.invalidLevels[selectedLevel][1] }}</span> ]
		</div>

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
					<div class="flex">
						<label
							:for='attribute.key'
							class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start width-whole"
						>
							<input
								type="radio"
								:id="attribute.key"
								:value="attribute.key"
								v-model="selectedChoiceKey"
								:disabled="!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)"
								name="attribute"
								class="trait-input"
								@change="updateSelectedChoiceKey()"
							/>
							<div class=" margin-top-tiny">
								{{ getAttributeLongName(attribute.key) }}
							</div>
						</label>
						
						<span @click="onClickToggleDescription(attribute.key)" class="font-contrast-medium margin-top-small margin-right-small info-button-inline float-right">
							<span class="info-button-content"> i </span>
						</span>

					</div>
					
					
					<div class="width-whole">
						<div
							v-if="(
								attributeIsInvalidAtThisLevel(attribute.key)
								&& invalidAttributeChoiceIsNotDeselected(attribute.key)
							|| (
								attributeIsTouchedByError(attribute.key)
								&& (!attributeIsInvalidAtThisLevel(attribute.key)))
							) || !invalidAttributeChoiceIsNotDeselected(attribute.key)"
							class="margin-left-small padding-bottom-tiny font-size-nano negative-top-margin attribute-info-margin"
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
							class="margin-left-small padding-bottom-tiny font-size-nano negative-top-margin attribute-info-margin"
						>
							<span class="font-size-nano display-block margin-left-small margin-top-nano padding-top-nano">
								Tak: {{ getAttributeLvlCeiling(selectedLevel) }}
							</span>
						</div>
						<div v-show="visibleAttributeDescriptions[attribute.key]" class="attribute-info-margin card medium font-contrast-medium padding-bottom-tiny padding-left-tiny margin-right-tiny margin-bottom-tiny padding-right-tiny font-size-nano">
							{{ attributes[attribute.key].description }}
						</div>
					</div>
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

		<div class="align-center">
			<button
			:disabled="!levelIsChangable"
			type="submit"
			@click="submitNewAttributeLevel()"
		>
			Uppdatera
		</button>
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
		props: ['selectedLevelProp'],
		emits: ['selected-level-type', 'update-tabs'],
		setup(props) {
			const characterStore = useCharacterStore()
			const visibleAttributeDescriptionsDefaults = {
				battle: false,
				agility: false,
				spirit: false,
				knowledge: false,
				physique: false,
			}
			const visibleAttributeDescriptions = ref(visibleAttributeDescriptionsDefaults)
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
				visibleAttributeDescriptionsDefaults,
				visibleAttributeDescriptions,
				getAttributeLongName,
				canChooseAttribute,
				getAttributeLvlCeiling,
				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
			}
		},
		methods: {
			resetSelection() {
				// this should be declared here, but is used in LevelLadder.
				this.selectedChoiceKey = ''
			},
			updateSelectedChoiceKey() {
				this.$emit('selected-level-type', {
					type: "attribute",
					isInvalid: this.selectedChoiceKey ? this.attributeIsInvalidAtThisLevel(this.selectedChoiceKey) : false,
					selectedChoiceKey: this.selectedChoiceKey,
				})
			},
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
			onClickToggleDescription(attributeKey) {
				this.visibleAttributeDescriptions = this.visibleAttributeDescriptionsDefaults
				this.visibleAttributeDescriptions[attributeKey] = !this.visibleAttributeDescriptions[attributeKey]
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
	.attribute-info-margin {
		margin-left: 3.4rem !important; 
	}
	.negative-top-margin {
		margin-top: -0.8rem;
	}
</style>
