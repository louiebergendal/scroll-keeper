<template>
	<div class="padding-left-small padding-right-small padding-bottom-small padding-top-small">

		<!-- if selected is in arraybrackets tab-plupps work, but not origninal selected key and vice versa -->
		<TabbedTraitsGroup
			:nameProp="'JackOfAllTrades-skillList-0'"
			:selectedProp="[selectedSkillChoiceKey]"
			:invalidOptionsListProp="characterSheet.traits"
			:isBackground="false"
			@input="updateSelectedChoiceKeys"
		/>

		<div class='card flex -dir-col'>

			<div
				v-for='attribute in attributeOptionsList'
				:key='attribute'
				class='width-whole flex margin-bottom-nano width-whole'
			>
				<div
					:class="{
						'font-contrast-lowest': (
							!canChooseAttribute(characterAttributes[attribute], selectedLevel)
							&& !attributeIsTouchedByError(attribute)
						)
					}"
					class="width-whole flex"
				>
					<div
						:class="{
							'selected': containsKey(attribute, selectedAttributeChoiceKeysList) && !attributeIsTouchedByError(attribute),
							'touched-by-error': attributeIsTouchedByError(attribute),
							'invalid-background': (
								invalidAttributeChoiceIsNotDeselected(attribute) 
								&& attributeIsInvalidAtThisLevel(attribute)
							)
						}"
						class="width-whole card dark"
					>
						<div class="flex">
							<label
								:for='attribute'
								class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start width-whole"
							>
								<input
									type="checkbox"
									:id="attribute"
									:value="attribute"
									v-model="selectedAttributeChoiceKeysList"
									:disabled="
										(!canChooseAttribute(characterAttributes[attribute], selectedLevel)
										|| containsKey(attribute, disabledAttributeKeysList)
										|| choicesLeft < 1)
										&& !containsKey(attribute, selectedAttributeChoiceKeysList)
									"
									name="attribute"
									class="trait-input"
									@change="updateSelectedChoiceKeys({
										id: 'JackOfAllTrades-attributeList',
										option: [attribute],
										statusToSet: containsKey(attribute, selectedAttributeChoiceKeysList)
									})"
								/>
								<div class=" margin-top-tiny">
									{{ getAttributeLongName(attribute) }}
								</div>
							</label>
							
							<span @click="onClickToggleDescription(attribute)" class="font-contrast-medium margin-top-small margin-right-small info-button-inline float-right">
								<span class="info-button-content"> i </span>
							</span>

						</div>
						
						
						<div class="width-whole">
							<div
								v-if="(
									attributeIsInvalidAtThisLevel(attribute)
									&& invalidAttributeChoiceIsNotDeselected(attribute)
								|| (
									attributeIsTouchedByError(attribute)
									&& (!attributeIsInvalidAtThisLevel(attribute)))
								) || !invalidAttributeChoiceIsNotDeselected(attribute)"
								class="margin-left-small padding-bottom-tiny font-size-nano negative-top-margin attribute-info-margin"
							>
								<InvalidOccurrence 
									:characteristicProp="attribute"
									:selectedLevelProp="selectedLevel"
								/>
							</div>
							<div
								v-if="
									attributeIsInvalidAtThisLevel(attribute)
									&& invalidAttributeChoiceIsNotDeselected(attribute)" 
								class="margin-left-small padding-bottom-tiny font-size-nano negative-top-margin attribute-info-margin"
							>
								<span class="font-size-nano display-block margin-left-small margin-top-nano padding-top-nano">
									Tak: {{ getAttributeLvlCeiling(selectedLevel) }}
								</span>
							</div>
						</div>
					</div>
					<div
						v-if="containsKey(attribute, selectedAttributeChoiceKeysList)"
						class="width-fourth flex margin-left-tiny"
					>
						<div
							:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute)}"
							class="card light width-half align-center"
						>
							<span class="vertical-align-middle bold font-size-small">+ 1</span>
						</div>
						<div class="card light width-half align-center margin-left-nano">
							<div class="bold font-size-medium attribute-result">{{ characterAttributes[attribute] + 1}} </div>
						</div>
					</div>
					<div
						v-if="!containsKey(attribute, selectedAttributeChoiceKeysList)"
						:class="{'invalid-background': invalidAttributeChoiceIsNotDeselected(attribute)}"
						class="width-fourth card light margin-left-tiny align-center"
					>
						<span class="vertical-align-middle">{{ characterAttributes[attribute] }} </span>
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
	import TraitLevel from '../traitLevel/TraitLevel.vue'

	export default {
		name: 'JackOfAllTrades',
		components: {
			TabbedTraitsGroup,
			InvalidOccurrence,
			TraitLevel
		},
		props: ['characterSheetProp', 'validationSheetProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const characterSheet = props.characterSheetProp
			const characterAttributes = characterSheet.attributes
			const validationSheet = props.validationSheetProp
			const selectedLevel = validationSheet.metadata.selectedLevel
			const attributeOptionsList = jackOfAllTrades.complexTrait[1].list
			const attributeChoicesAmount = jackOfAllTrades.complexTrait[1].choices
			const disabledAttributeKeysList = ref([])

			let originalJackOfAllTradesChoiceKeysList = []

			// original choices
			if (characterStore.history[selectedLevel]?.complexPayload?.jackOfAllTrades?.choices){
				console.log("ping")
				originalJackOfAllTradesChoiceKeysList = characterStore.history[selectedLevel].complexPayload.jackOfAllTrades.choices
				console.log("originalJackOfAllTradesChoiceKeysList: ", originalJackOfAllTradesChoiceKeysList)
			}

			// selected skill
			const selectedSkillChoiceKey = ref('')
			if (originalJackOfAllTradesChoiceKeysList[0]) {
				selectedSkillChoiceKey.value = originalJackOfAllTradesChoiceKeysList[0]?.[0]
				console.log("selectedSkillChoiceKey.value: ", selectedSkillChoiceKey.value)
			}

			// selected attributes
			const selectedAttributeChoiceKeysList = ref([])
			if (originalJackOfAllTradesChoiceKeysList[1]) {
				selectedAttributeChoiceKeysList.value = originalJackOfAllTradesChoiceKeysList[1]
			} 

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
				attributeOptionsList,
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
				option: this.originalJackOfAllTradesChoiceKeysList[0]?.[0]
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

			this.updateDisabledList()
			
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

				if (data.id === 'JackOfAllTrades-attributeList' && data.option !== undefined) {
					if (this.selectedAttributeChoiceKeysList.length) {
						this.choicesLeft = this.attributeChoicesAmount - this.selectedAttributeChoiceKeysList.length
					} else {
						this.choicesLeft = this.attributeChoicesAmount
					}
				}

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
				const attributeValuesList = Object.keys(attributesByValue).map((key) => {
					return parseInt(key)
				})
				let min = Infinity;
				let secondMin = Infinity;

				for (let i = 0; i < attributeValuesList.length; i++) {
					if (attributeValuesList[i] < min) {
						secondMin = min;
						min = attributeValuesList[i]; 
					} else if (attributeValuesList[i] < secondMin) {
						secondMin = attributeValuesList[i]; 
					}
				}

				const lowestAttributesLists = {
					lowest: attributesByValue[min],
					secondLowest: attributesByValue[secondMin]
				}

				for (let i = 0; i < attributeValuesList.length; i++) {

					const attributeKeys = attributesByValue[attributeValuesList[i]]
					attributeKeys.forEach((attributeKey) => {

						if (containsKey(attributeKey, lowestAttributesLists.lowest)) {
							return
						}

						let secondLowestAvailable = true
						for (let i = 0; i < lowestAttributesLists.lowest.length; i++) {
							const attribute = lowestAttributesLists.lowest[i];
							if (!containsKey(attribute, this.selectedAttributeChoiceKeysList)) {
								secondLowestAvailable = false
							}
						}

						if (containsKey(attributeKey, lowestAttributesLists.secondLowest)
							&& secondLowestAvailable
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
