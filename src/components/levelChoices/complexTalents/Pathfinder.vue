<template>
	<div>
		<div :key="pathfinderSkill.key" v-for="pathfinderSkill in pathfinderOptions.list">
			
			<!-- not owned -->
			<div v-if="!contains(pathfinderSkill.key, characterSheet.traits)">
				<input type="radio"
					v-model="selected"
					:value="pathfinderSkill.key"
					:id="pathfinderSkill.key"
					@change="inputEventHandler"
					:disabled="(
						!canChooseTrait(
							pathfinderSkill.key,
							characterTraits,
							characterSheet.attributes,
							false, 
							characterSheet.metadata.level
						)
						||
						contains(pathfinderSkill.key, characterTraits)
					)"
				/>
				<label :for="pathfinderSkill.key">{{pathfinderSkill.name}}</label>
			</div>

			<!-- already owned -->
			<div 
				v-if="contains(pathfinderSkill.key, characterSheet.traits)"
				:class="{
					'touched-by-error': pathfinderSkillIsTouchedByError(pathfinderSkill.key),
					'invalid-background': pathfinderSkillIsInvalidAtThisLevel(pathfinderSkill.key)}"
			>
				<input
					type="radio"
					:id="pathfinderSkill.key + '-owned'"
					disabled
					checked='true'
				/>
				<label :for="pathfinderSkill.key + '-owned'" class="display-inline-block" >
					{{ pathfinderSkill.name }}
					<div
						v-if="
							!canChoosePathfinderSkill(pathfinderSkill.key)
							&& pathfinderSkill.key === selected
							&& pathfinderSkillIsInvalidAtThisLevel(pathfinderSkill.key)"
						class="font-size-tiny display-inline"
					>
						{{getErrorMessage(pathfinderSkill.key)}}
					</div>
				</label>
			</div>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait, getFailedRequirements, getFailedTraitRequirementsErrorMessage } from '../../../rules/characteristics/traits'
	import { pathfinder } from '../../../rules/characteristics/traitLists/talents'
	import { contains } from '../../../rules/utils'
	import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError, invalidChoiceIsNotUnChecked } from '../../../utilities/validators'


	export default {
		props: ['tempCharacterSheet', 'tempValidationSheet', 'characterStore'],
		setup(props) {
			const characterStore = props.characterStore
			const characterSheet = props.tempCharacterSheet
			const characterTraits = characterSheet.traits
			const validationSheet = props.tempValidationSheet
			const selectedLevel = validationSheet.metadata.selectedLevel
			const pathfinderOptions = pathfinder.complexTrait[0]

			let originalPathfinderChoiceKey = ''
			if (characterStore.history[validationSheet.metadata.selectedLevel].complexPayload
				&& characterStore.history[validationSheet.metadata.selectedLevel].complexPayload.pathfinder
				&& characterStore.history[validationSheet.metadata.selectedLevel].complexPayload.pathfinder.choices.toString()
			){
				originalPathfinderChoiceKey = characterStore.history[validationSheet.metadata.selectedLevel].complexPayload.pathfinder.choices.toString()
			}

			if (originalPathfinderChoiceKey != '' && contains(originalPathfinderChoiceKey, characterTraits)) {
				originalPathfinderChoiceKey = ''
			}
			const selected = ref(originalPathfinderChoiceKey)

			return {
				characterSheet,
				characterTraits,
				pathfinderOptions,
				selected,
				contains,
				canChooseTrait,
				validationSheet,
				selectedLevel,

				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
				getFailedRequirements,
				getFailedTraitRequirementsErrorMessage,
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
			canChoosePathfinderSkillAndIsSelected(pathfinderSkillKey) {
				return (!this.canChoosePathfinderSkill(pathfinderSkillKey) && !contains(pathfinderSkillKey, this.selectedList))
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
			invalidPathfinderSkillChoiceIsNotUnselected(key) {
				return this.invalidChoiceIsNotUnChecked(key, this.validationSheet.metadata.invalidLevels, this.originalPathfinderChoiceKey, this.selectedList)
			},
			pathfinderSkillIsTouchedByError(key) {
				return this.isTouchedByError(key, this.validationSheet.metadata.invalidLevels)
			},
			pathfinderSkillIsInvalidAtThisLevel(key) {
				return this.isInvalidAtThisLevel(key, this.validationSheet.metadata.invalidLevels, this.selectedLevel)
			},
			getFailedTraitRequirements(traitKey) {
				return getFailedRequirements(
					traitKey, 
					this.tempCharacterSheet.traits, 
					this.tempCharacterSheet.attributes, 
					this.tempCharacterSheet.metadata.isChosenByFate, 
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