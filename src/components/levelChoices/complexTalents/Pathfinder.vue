<template>
	<div class="padding-left-small padding-right-small padding-bottom-small padding-top-small">

		<div
			v-for="pathfinderSkill in pathfinderOptions.list"
			:key="pathfinderSkill.key"
			:class="{
				'card medium margin-bottom-nano': !traitIsTouchedByError(pathfinderSkill.key),
				'selected': !traitIsTouchedByError(pathfinderSkill.key) && traitIsSelected(pathfinderSkill.key)
			}"
		>

			<!-- not owned -->
			<div
				v-if="!traitIsOwned(pathfinderSkill.key)"
				:class="{
					'touched-by-error card medium margin-bottom-nano': traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': traitIsInvalidAtThisLevel(pathfinderSkill.key)
				}"
			>
				
				<label class="flex -v-start padding-left-tiny padding-right-tiny padding-bottom-tiny" :for="pathfinderSkill.key">
					<input type="radio"
						v-model="selectedChoiceKey"
						:value="pathfinderSkill.key"
						:id="pathfinderSkill.key"
						@change="inputEventHandler"
						class="trait-input"
						:disabled="(
							(
								cannotChooseTrait(pathfinderSkill.key)
								&& !traitIsSelected(pathfinderSkill.key)
							) || cannotChooseTrait('pathfinder')
						)"
					/>
					<div>
						<span
							class="trait-align"
							:class="{
								'font-contrast-medium normal': !traitIsTouchedByError(pathfinderSkill.key)
							}"
						>{{ pathfinderSkill.name }}</span>
						<span 
							v-if="
								traitIsTouchedByError(pathfinderSkill.key)
								&& !traitIsInvalidAtThisLevel(pathfinderSkill.key)"
							class="font-size-nano margin-left-small"
						>
							<InvalidOccurrence 
								:characteristicProp="pathfinderSkill.key"
								:selectedLevelProp="selectedLevel"
							/>
						</span>
						<span
							v-if="
								containsKey(pathfinderSkill.key, characterStore.sheet.traits)
								&& !containsKey(pathfinderSkill.key, validationSheet.traits)
								&& !traitIsTouchedByError(pathfinderSkill.key)"
							class="margin-left-small font-size-nano display-inline font-contrast-lowest margin-left-small"
						>
							Vald på en senare erfarenhetsnivå
						</span>
					</div>

				</label>
			</div>

			<!-- already owned -->
			<div
				v-if="traitIsOwned(pathfinderSkill.key)"
				:class="{
					'touched-by-error margin-bottom-nano': traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': (
						traitIsInvalidAtThisLevel(pathfinderSkill.key)
						&& traitIsSelected(pathfinderSkill.key)
					)
				}"
			>
				<label :for="pathfinderSkill.key + '-owned'" class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny flex -v-start" >
					<input
						type="radio"
						:id="pathfinderSkill.key + '-owned'"
						disabled
						checked='true'
						class="trait-input"
					/>
					<div>
						<span class="trait-align">{{ pathfinderSkill.name }}</span>
						<div 
							v-if="
								traitIsTouchedByError(pathfinderSkill.key)
								&& !traitIsInvalidAtThisLevel(pathfinderSkill.key)
							"
							class="font-size-nano margin-left-small"
						>
							<InvalidOccurrence 
								:characteristicProp="pathfinderSkill.key"
								:selectedLevelProp="selectedLevel"
							/>
						</div>

						<div
							v-if="
								cannotChooseTrait(pathfinderSkill.key)
								&& pathfinderSkill.key === selectedChoiceKey
								&& traitIsInvalidAtThisLevel(pathfinderSkill.key)
							"
							class="font-size-nano margin-left-small"
						>
							{{ getErrorMessage(pathfinderSkill.key) }}
						</div>
					</div>
				</label>
			</div>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'
	import { canChooseTrait, getFailedRequirements, getFailedTraitRequirementsErrorMessage } from '../../../rules/characteristics/traits'
	import { pathfinder } from '../../../rules/characteristics/traitLists/talents'
	import { containsKey } from '../../../rules/utils'
	import { isInvalidAtThisLevel, isTouchedByError, invalidChoiceIsNotUnChecked } from '../../../validators/validators'
	import InvalidOccurrence from '../../generic/InvalidOccurrence.vue'

	export default {
		components: {
			InvalidOccurrence
		},
		props: ['characterSheetProp', 'validationSheetProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const characterSheet = props.characterSheetProp
			const characterTraits = characterSheet.traits
			console.log("characterTraits: ", characterTraits)
			const validationSheet = props.validationSheetProp
			const selectedLevel = validationSheet.metadata.selectedLevel
			const pathfinderOptions = pathfinder.complexTrait[0]
			let originalPathfinderChoiceKey = ''

			if (characterStore.history[selectedLevel]
				&& characterStore.history[selectedLevel].complexPayload
				&& characterStore.history[selectedLevel].complexPayload.pathfinder
				&& characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			){
				originalPathfinderChoiceKey = characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			}
			const selectedChoiceKey = ref(originalPathfinderChoiceKey)


			return {
				characterStore,
				characterSheet,
				characterTraits,
				validationSheet,
				pathfinderOptions,
				selectedChoiceKey,
				selectedLevel,
				originalPathfinderChoiceKey,
				containsKey,
				canChooseTrait,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
				getFailedRequirements,
				getFailedTraitRequirementsErrorMessage,
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
			})
		},
		watch: {
			tempValidationSheet: {
				handler(newVal) {
					this.validationSheet = newVal
				},
				immediate: true
			}
		},
		methods: {
			inputEventHandler() {

				const complexPayload = {
					pathfinder: {
						choices: {
							0: {
								0: this.selectedChoiceKey
							}
						},
						key: 'pathfinder'
					}
				}

				this.$emit('complexPayload', complexPayload)
			},
			getErrorMessage(traitKey) {
				return getFailedTraitRequirementsErrorMessage(
					this.getFailedTraitRequirements(traitKey)
				)
			},
			traitIsOwned(traitKey){
				return containsKey(traitKey, this.characterSheet.traits)
			},
			traitIsSelected(traitKey){
				return traitKey === this.selectedChoiceKey
			},
			invalidTraitChoiceIsNotDeselected(traitKey) {
				return invalidChoiceIsNotDeselected(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.originalLevelChoiceKey,
					this.selectedChoiceKey
				)
			},
			traitIsTouchedByError(traitKey) {
				return (isTouchedByError(
					traitKey,
					this.characterStore.metadata.invalidLevels
					) || (this.traitIsSelected(traitKey) && this.traitIsOwned(traitKey))
				)
			},
			traitIsInvalidAtThisLevel(traitKey) {
				return isInvalidAtThisLevel(
					traitKey,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
				)
			},
			cannotChooseTrait(traitKey) {
				return !canChooseTrait(
					traitKey,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getFailedTraitRequirements(traitKey) {
				const failedRequirements = getFailedRequirements(
					traitKey,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			},

		}
	}
</script>

<style>
</style>
