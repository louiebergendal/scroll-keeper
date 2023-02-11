<template>
	<div class="padding-left-small padding-right-small padding-bottom-small padding-top-small">

		<TabbedTraitsGroup
			:nameProp="'JackOfAllTrades-skillList-0'"
			:selectedProp="[selectedSkillChoiceKey]"
			:invalidOptionsListProp="characterSheet.traits"
			:isBackground="false"
			@input="updateSelectedChoiceKeys"
		/>

		<div class='card flex -dir-col'> <!-- make pretty -->
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
							'selected': selectedAttributeChoiceKey === attribute.key && !attributeIsTouchedByError(attribute.key),
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
									v-model="selectedAttributeChoiceKey"
									:disabled="!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)"
									name="attribute"
									class="trait-input"
									@change="updateSelectedChoiceKeys"
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
						</div>
					</div>
					<div
						v-if="selectedAttributeChoiceKey === attribute.key"
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
						v-if="selectedAttributeChoiceKey !== attribute.key"
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
		</div>	

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'
	import TabbedTraitsGroup from '../traitLevel/TabbedTraitsGroup.vue'
	import InvalidOccurrence from '../../generic/InvalidOccurrence.vue'
	import {
		attributes,
		getAttributeLongName,
		canChooseAttribute,
		getAttributeLvlCeiling
	} from '../../../rules/characteristics/attributes'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from '../../../validators/validators'

	export default {
		name: 'JackOfAllTrades',
		components: {
			TabbedTraitsGroup,
			InvalidOccurrence
		},
		props: ['characterSheetProp', 'validationSheetProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const characterSheet = props.characterSheetProp
			const characterAttributes = characterSheet.attributes
			const validationSheet = props.validationSheetProp
			const selectedLevel = validationSheet.metadata.selectedLevel
			let originalJackOfAllTradesChoiceKeysList = []

			// original choices
			if (characterStore.history[selectedLevel]
				&& characterStore.history[selectedLevel].complexPayload
				&& characterStore.history[selectedLevel].complexPayload.jackOfAllTrades
				&& characterStore.history[selectedLevel].complexPayload.jackOfAllTrades.choices.toString()
			){
				originalJackOfAllTradesChoiceKeysList = characterStore.history[selectedLevel].complexPayload.jackOfAllTrades.choices
			}

			// selected skill
			const selectedSkillChoiceKey = ref('')
			if (originalJackOfAllTradesChoiceKeysList[0]) {
				selectedSkillChoiceKey.value = originalJackOfAllTradesChoiceKeysList[0].toString()
			}

			// selected attribute
			const selectedAttributeChoiceKey = ref('')
			if (originalJackOfAllTradesChoiceKeysList[1]) {
				selectedAttributeChoiceKey.value = originalJackOfAllTradesChoiceKeysList[1].toString()
			}

			return {
				characterStore,
				characterSheet,
				characterAttributes,
				validationSheet,
				selectedSkillChoiceKey,
				selectedAttributeChoiceKey,
				selectedLevel,
				originalJackOfAllTradesChoiceKeysList,

				attributes,
				getAttributeLongName,
				canChooseAttribute,
				getAttributeLvlCeiling,

				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError
			}
		},
		beforeMount() {
			this.findLowestAttributes() /* test */
			this.characterStore.$subscribe((_mutation, state) => {
			})
			this.updateSelectedChoiceKeys({
				id: 'JackOfAllTrades-skillList-0',
				option: this.selectedSkillChoiceKey
			})
			this.updateSelectedChoiceKeys({
				id: 'JackOfAllTrades-attributeList-0',
				option: this.selectedAttributeChoiceKey
			})
		},
		watch: {
			validationSheetProp: {
				handler(newVal) {
					if (this.validationSheet !== newVal) {
						this.validationSheet = newVal
					}
				},
				immediate: true
			}
		},
		methods: {
			updateSelectedChoiceKeys(data) {

				if (data.id === 'JackOfAllTrades-skillList-0') {
					this.selectedSkillChoiceKey = data.option
				}
				if (data.id === 'JackOfAllTrades-attributeList-0') {
					this.selectedAttributeChoiceKey = data.option
				}

				const complexPayload = {
					jackOfAllTrades: {
						choices: {
							0: {
								0: this.selectedSkillChoiceKey
							},
							1: {
								0: this.selectedAttributeChoiceKey
							}
						},
						key: 'jackOfAllTrades'
					}
				}

				this.$emit('complexPayload', complexPayload)
			},
			invalidAttributeChoiceIsNotDeselected(key) {
				if (this.originalJackOfAllTradesChoiceKeysList && this.originalJackOfAllTradesChoiceKeysList[1]) {
					const isInvalidChoiceNotDeselected = this.invalidChoiceIsNotDeselected(
						key,
						this.characterStore.metadata.invalidLevels,
						this.originalJackOfAllTradesChoiceKeysList[1].toString(),
						this.selectedAttributeChoiceKey
					)
					return isInvalidChoiceNotDeselected
				}
				return true
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

			findLowestAttributes() {
				const characterAttributes = this.validationSheet.attributes
				let attributesByValue = {}
				Object.entries(characterAttributes).map((attribute) => {
					if (!attributesByValue[attribute[1]]) {
						attributesByValue = {
							...attributesByValue,
							[attribute[1]]: []
						}
					}
					attributesByValue[attribute[1]].push(attribute[0])
				});
				return attributesByValue
			},

		}
	}
</script>

<style>
</style>
