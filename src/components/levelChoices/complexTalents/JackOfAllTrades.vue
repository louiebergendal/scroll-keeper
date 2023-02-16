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

			disabledList: {{ disabledAttributeKeysList }}

			<div
				v-for='attribute in attributes'
				:key='attribute.key'
				class='width-whole flex margin-bottom-nano width-whole'
			> <!-- complextrait,  not attributes -->
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
							'selected': containsKey(attribute.key, selectedAttributeChoiceKeysList) && !attributeIsTouchedByError(attribute.key),
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
									type="checkbox"
									:id="attribute.key"
									:value="attribute.key"
									v-model="selectedAttributeChoiceKeysList"
									:disabled="
										(!canChooseAttribute(characterAttributes[attribute.key], selectedLevel)
										|| containsKey(attribute.key, disabledAttributeKeysList))
										&& !containsKey(attribute.key, selectedAttributeChoiceKeysList)
									"
									name="attribute"
									class="trait-input"
									@change="updateSelectedChoiceKeys({
										id: 'JackOfAllTrades-attributeList',
										option: [attribute.key],
										statusToSet: containsKey(attribute.key, selectedAttributeChoiceKeysList)
									})"
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
						v-if="containsKey(attribute.key, selectedAttributeChoiceKeysList)"
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
						v-if="!containsKey(attribute.key, selectedAttributeChoiceKeysList)"
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
	import { jackOfAllTrades } from '../../../rules/characteristics/traitLists/talents'
	import { invalidChoiceIsNotUnChecked, isInvalidAtThisLevel, isTouchedByError } from '../../../validators/validators'
	import { containsKey } from '../../../rules/utils'

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
			//const jackOfAllTradesAttributeOptions = jackOfAllTrades.complexTrait[1]
			const attributeChoicesAmount = jackOfAllTrades.complexTrait[1].choices
			const disabledAttributeKeysList = ref([])

			let originalJackOfAllTradesChoiceKeysList = []

			// original choices
			if (characterStore.history[selectedLevel]
				&& characterStore.history[selectedLevel].complexPayload
				&& characterStore.history[selectedLevel].complexPayload.jackOfAllTrades
				&& characterStore.history[selectedLevel].complexPayload.jackOfAllTrades.choices.toString()
			){
				originalJackOfAllTradesChoiceKeysList = characterStore.history[selectedLevel].complexPayload.jackOfAllTrades.choices
			}
			console.log("originalJackOfAllTradesChoiceKeysList (after declaration): ", originalJackOfAllTradesChoiceKeysList)

			// selected skill
			const selectedSkillChoiceKey = ref('')
			if (originalJackOfAllTradesChoiceKeysList[0]) {
				selectedSkillChoiceKey.value = originalJackOfAllTradesChoiceKeysList[0]
			}

			// selected attributes
			const selectedAttributeChoiceKeysList = ref([])
			if (originalJackOfAllTradesChoiceKeysList[1]) {
				selectedAttributeChoiceKeysList.value = originalJackOfAllTradesChoiceKeysList[1]
			}

			console.log('---> selectedAttributeChoiceKeysList 1: ', selectedAttributeChoiceKeysList.value);

			const choicesLeft = ref(0)
			
			return {
				characterStore,
				characterSheet,
				characterAttributes,
				validationSheet,
				selectedSkillChoiceKey,
				selectedAttributeChoiceKeysList,
				selectedLevel,
				originalJackOfAllTradesChoiceKeysList,
				choicesLeft,
				attributeChoicesAmount,
				disabledAttributeKeysList,

				attributes,
				getAttributeLongName,
				canChooseAttribute,
				getAttributeLvlCeiling,

				invalidChoiceIsNotUnChecked,
				isInvalidAtThisLevel,
				isTouchedByError,

				containsKey
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
			})
			this.updateSelectedChoiceKeys({
				id: 'JackOfAllTrades-skillList-0',
				option: this.originalJackOfAllTradesChoiceKeysList[0]
			})
			this.updateSelectedChoiceKeys({
				id: 'JackOfAllTrades-attributeList',
				option: this.originalJackOfAllTradesChoiceKeysList[1]
			})

			if (this.selectedAttributeChoiceKeysList.length) {
				this.choicesLeft = this.attributeChoicesAmount - this.selectedAttributeChoiceKeysList.length
			} else {
				this.choicesLeft = this.attributeChoicesAmount
			}
			
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
				console.log('--- --- --- // in updateSelectedChoiceKeys // --- --- ---');
				if (data.id === 'JackOfAllTrades-skillList-0') {
					this.selectedSkillChoiceKey = data.option
				}
				if (data.id === 'JackOfAllTrades-attributeList' && data.option !== undefined) {

					if(data.statusToSet !== false){ // true or undefined
						console.log('to be pushed: ', data.option);
						this.selectedAttributeChoiceKeysList.push(data.option)
					} else {
						this.selectedAttributeChoiceKeysList = this.selectedAttributeChoiceKeysList.filter((keys) => {
							return containsKey(keys, data.option);
						})
					}

					if (this.selectedAttributeChoiceKeysList.length) {
						this.choicesLeft = this.attributeChoicesAmount - this.selectedAttributeChoiceKeysList.length
					} else {
						this.choicesLeft = this.attributeChoicesAmount
					}
				}


				console.log('data: ', data);
				console.log('selectedAttributeChoiceKeysList: ', this.selectedAttributeChoiceKeysList);
				console.log('--- --- --- --- --- --- --- ---');

				const complexPayload = {
					jackOfAllTrades: {
						choices: {
							0: {
								0: this.selectedSkillChoiceKey
							},
							1: {
								0: this.selectedAttributeChoiceKeysList[0],
								1: this.selectedAttributeChoiceKeysList[1]
							}
						},
						key: 'jackOfAllTrades'
					}
				}
				this.updateDisabledList()

				this.$emit('complexPayload', complexPayload)
			},
			invalidAttributeChoiceIsNotDeselected(key) {
				if (this.originalJackOfAllTradesChoiceKeysList && this.originalJackOfAllTradesChoiceKeysList[1]) {

					const isInvalidChoiceNotDeselected = this.invalidChoiceIsNotUnChecked(
						key,
						this.characterStore.metadata.invalidLevels,
						this.originalJackOfAllTradesChoiceKeysList[1].toString(),
						this.selectedAttributeChoiceKeysList
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

			/* attributeOptionShouldBeDisabled(attributeKey) {

			}, */

			getAttributesByValue() {
				const characterAttributes = this.validationSheet.attributes
				let attributesByValue = {}
				Object.entries(characterAttributes).forEach((attribute) => {
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
			updateDisabledList() {
				this.disabledAttributeKeysList = []
				const attributesByValue = this.getAttributesByValue()
				const attributeValuesArray = Object.keys(attributesByValue).map((key) => {
					return parseInt(key)
				})
				let min = Infinity;
				let secondMin = Infinity;

				for (let i= 0; i< attributeValuesArray.length; i++) {
					if (attributeValuesArray[i]< min) {
						secondMin = min;
						min = attributeValuesArray[i]; 
					} else if (attributeValuesArray[i]< secondMin) {
						secondMin = attributeValuesArray[i]; 
					}
				}

				const lowestAttributesLists = {
					lowest: attributesByValue[min],
					secondLowest: attributesByValue[secondMin]
				}

				for (let i = 0; i < attributeValuesArray.length; i++) {
					const attributeKeys = attributesByValue[attributeValuesArray[i]]
					attributeKeys.forEach((attributeKey) => {
						if (containsKey(attributeKey, lowestAttributesLists.lowest)) {
							return
						}

						const choicesMade = this.attributeChoicesAmount - this.choicesLeft
					
						if (
							containsKey(attributeKey, lowestAttributesLists.secondLowest)
							&& choicesMade >= lowestAttributesLists.lowest.length
						) {
							return
						}
						this.disabledAttributeKeysList.push(attributeKey)
					})

				}
			}

		}
	}
</script>

<style>
</style>
