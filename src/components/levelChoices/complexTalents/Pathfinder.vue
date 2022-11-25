<template>
	<div class="padding-small">

		<div v-for="pathfinderSkill in pathfinderOptions.list" class="card margin-bottom-nano" :key="pathfinderSkill.key">

			<!-- not owned -->
			<div
				v-if="!this.validate.traitIsOwned(pathfinderSkill.key)"
				class="padding-bottom-tiny"
				:class="{
					'touched-by-error': this.validate.traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': this.validate.traitIsInvalidAtThisLevel(pathfinderSkill.key)
				}"
			>
				
				<label class="display-inline-block text-margins" :for="pathfinderSkill.key">
					<input type="radio"
						v-model="selected"
						:value="pathfinderSkill.key"
						:id="pathfinderSkill.key"
						@change="inputEventHandler"
						class="margin-tiny vertical-align-top"
						:disabled="(
							(
								this.validate.cannotChooseTrait(pathfinderSkill.key)
								&& !this.validate.traitIsSelected(pathfinderSkill.key)
							) || this.validate.cannotChooseTrait('pathfinder')
						)"
					/>

					<span>{{ pathfinderSkill.name }}</span>

					<span 
						v-if="
							this.validate.traitIsTouchedByError(pathfinderSkill.key)
							&& !this.validate.traitIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny"
					>
						<InvalidOccurrence 
							:characteristic="pathfinderSkill.key"
							:selectedLevel="selectedLevel"
						/>
					</span>

					<span
						v-if="
							containsKey(pathfinderSkill.key, characterStore.sheet.traits)
							&& !containsKey(pathfinderSkill.key, validationSheet.traits)
							&& !this.validate.traitIsTouchedByError(pathfinderSkill.key)"
						class="font-size-nano display-inline font-contrast-lowest margin-left-small"
					>
						Vald på en senare erfarenhetsnivå
					</span>

				</label>
			</div>

			<!-- already owned -->
			<div
				v-if="this.validate.traitIsOwned(pathfinderSkill.key)"
				:class="{
					'touched-by-error': this.validate.traitIsTouchedByError(pathfinderSkill.key),
					'invalid-background': (
						this.validate.traitIsInvalidAtThisLevel(pathfinderSkill.key)
						&& this.validate.traitIsSelected(pathfinderSkill.key)
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
							this.validate.traitIsTouchedByError(pathfinderSkill.key)
							&& !this.validate.traitIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny"
					>
						<InvalidOccurrence 
							:characteristic="pathfinderSkill.key"
							:selectedLevel="selectedLevel"
						/>
					</span>

					<div
						v-if="
							this.validate.cannotChooseTrait(pathfinderSkill.key)
							&& pathfinderSkill.key === selected
							&& this.validate.traitIsInvalidAtThisLevel(pathfinderSkill.key)"
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
	import TraitValidatorBridge from '../../../validators/TraitValidatorBridge'
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

			let validate = undefined
			let originalPathfinderChoiceKey = ''

			if (characterStore.history[selectedLevel]
				&& characterStore.history[selectedLevel].complexPayload
				&& characterStore.history[selectedLevel].complexPayload.pathfinder
				&& characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			){
				originalPathfinderChoiceKey = characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			}

			const selected = ref(originalPathfinderChoiceKey)

			return {
				characterStore,
				characterSheet,
				characterTraits,
				validationSheet,
				pathfinderOptions,
				selected,
				selectedLevel,
				originalPathfinderChoiceKey,
				validate,
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
			this.validate = new TraitValidatorBridge(
				this.characterSheet.traits,
				this.characterSheet.attributes,
				this.selectedLevel,
				this.characterStore.metadata.invalidLevels,
				this.selected,
				this.characterSheet,
				this.originalPathfinderChoiceKey
			)
			this.characterStore.$subscribe((_mutation, state) => {
				this.validate.update(
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.selectedLevel,
					state.metadata.invalidLevels,
					this.selected,
					this.characterSheet,
					this.originalPathfinderChoiceKey
				)
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
								0: this.selected
							}
						},
						key: 'pathfinder'
					}
				}

				this.$emit('complexPayload', complexPayload)
			},
			canChoosePathfinderSkill(pathfinderSkillKey) {
				return canChooseTrait(
					pathfinderSkillKey,
					this.characterSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.characterSheet.metadata.level
				)
			},
			isOwned(pathfinderSkillKey) {
				return containsKey(pathfinderSkillKey, this.characterTraits)
			},
			isSelected(pathfinderSkillKey) {
				return pathfinderSkillKey === this.selected
			},
			invalidPathfinderSkillChoiceIsNotUnselected(key) {
				return this.invalidChoiceIsNotUnChecked(
					key,
					this.characterStore.metadata.invalidLevels,
					this.originalPathfinderChoiceKey,
					this.selectedList)
			},
			pathfinderSkillIsTouchedByError(key) {
				return (this.isTouchedByError(
					key,
					this.characterStore.metadata.invalidLevels
					) || (key === this.selected && this.isOwned(key))
				)
			},
			pathfinderSkillIsInvalidAtThisLevel(key) {
				return (this.isInvalidAtThisLevel(
					key,
					this.characterStore.metadata.invalidLevels,
					this.selectedLevel
					) || (key === this.selected && this.isOwned(key))
				)
			},
			getFailedTraitRequirements(traitKey) {
				return getFailedRequirements(
					traitKey,
					this.validationSheet.traits,
					this.characterSheet.attributes,
					this.characterSheet.metadata.isChosenByFate,
					this.selectedLevel
				)
			},
			getErrorMessage(traitKey) {
				return getFailedTraitRequirementsErrorMessage(
					this.getFailedTraitRequirements(traitKey)
				)
			}

		}
	}
</script>

<style>
</style>
