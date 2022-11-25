<template>
	<div class="padding-small">

		<div v-for="pathfinderSkill in pathfinderOptions.list" class="card margin-bottom-nano" :key="pathfinderSkill.key">

			<!-- not owned -->
			<div
				v-if="!traitIsOwned(pathfinderSkill.key)"
				class="padding-bottom-tiny"
				:class="{
					'touched-by-error': traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': traitIsInvalidAtThisLevel(pathfinderSkill.key)
				}"
			>
				
				<label class="display-inline-block text-margins" :for="pathfinderSkill.key">
					<input type="radio"
						v-model="selectedChoiceKey"
						:value="pathfinderSkill.key"
						:id="pathfinderSkill.key"
						@change="inputEventHandler"
						class="margin-tiny vertical-align-top"
						:disabled="(
							(
								cannotChooseTrait(pathfinderSkill.key)
								&& !traitIsSelected(pathfinderSkill.key)
							) || cannotChooseTrait('pathfinder')
						)"
					/>

					<span>{{ pathfinderSkill.name }}</span>

					<span 
						v-if="
							traitIsTouchedByError(pathfinderSkill.key)
							&& !traitIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny"
					>
						<InvalidOccurrence 
							:characteristicProp="pathfinderSkill.key"
							:selectedLevelProp="selectedLevel"
						/>
					</span>
					{{ validationSheet.metadata.selectedLevel }}
					<span
						v-if="
							containsKey(pathfinderSkill.key, characterStore.sheet.traits)
							&& !containsKey(pathfinderSkill.key, validationSheet.traits)
							&& !traitIsTouchedByError(pathfinderSkill.key)"
						class="font-size-nano display-inline font-contrast-lowest margin-left-small"
					>
						Vald på en senare erfarenhetsnivå
					</span>

				</label>
			</div>

			<!-- already owned -->
			<div
				v-if="traitIsOwned(pathfinderSkill.key)"
				:class="{
					'touched-by-error': traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': (
						traitIsInvalidAtThisLevel(pathfinderSkill.key)
						&& traitIsSelected(pathfinderSkill.key)
					)
				}"
				class="padding-bottom-tiny"
			>
				<input
					type="radio"
					:id="pathfinderSkill.key + '-owned'"
					disabled
					checked='true'
					class="margin-tiny vertical-align-top"
				/>
				<label :for="pathfinderSkill.key + '-owned'" class="display-inline-block text-margins" >
					<span>{{ pathfinderSkill.name }}</span>

					<span 
						v-if="
							traitIsTouchedByError(pathfinderSkill.key)
							&& !traitIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny"
					>
						<InvalidOccurrence 
							:characteristicProp="pathfinderSkill.key"
							:selectedLevelProp="selectedLevel"
						/>
					</span>

					<div
						v-if="
							cannotChooseTrait(pathfinderSkill.key)
							&& pathfinderSkill.key === selectedChoiceKey
							&& traitIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny display-inline"
					>
						{{ getErrorMessage(pathfinderSkill.key) }}
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
		props: ['tempCharacterSheet', 'tempValidationSheet'],
		setup(props) {
			const characterStore = useCharacterStore()
			const characterSheet = props.tempCharacterSheet
			const characterTraits = characterSheet.traits
			const validationSheet = props.tempValidationSheet
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
				return containsKey(traitKey, this.tempCharacterSheet.traits)
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
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getFailedTraitRequirements(traitKey) {
				const failedRequirements = getFailedRequirements(
					traitKey,
					this.tempCharacterSheet.traits,
					this.tempCharacterSheet.attributes,
					this.tempCharacterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
				return failedRequirements
			},

		}
	}
</script>

<style>
</style>
