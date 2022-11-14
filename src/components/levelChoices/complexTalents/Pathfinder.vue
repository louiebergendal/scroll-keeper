<template>
	<div class="padding-small">

		<div v-for="pathfinderSkill in pathfinderOptions.list" class="card margin-bottom-nano" :key="pathfinderSkill.key">

			<!-- not owned -->
			<div 
				v-if="!isOwned(pathfinderSkill.key)"
				class="padding-bottom-tiny"
				:class="{
					'touched-by-error': pathfinderSkillIsTouchedByError(pathfinderSkill.key),
					'invalid-background': pathfinderSkillIsInvalidAtThisLevel(pathfinderSkill.key)
				}"
			>
				<input type="radio"
					v-model="selected"
					:value="pathfinderSkill.key"
					:id="pathfinderSkill.key"
					@change="inputEventHandler"
					class="margin-tiny vertical-align-top"
					:disabled="(
						(
							!canChoosePathfinderSkill(pathfinderSkill.key)
							&& !isSelected(pathfinderSkill.key)
						) || !canChoosePathfinderSkill('pathfinder')
					)"
				/>
				<label :for="pathfinderSkill.key">{{ pathfinderSkill.name }}</label>
			</div>

			<!-- already owned -->
			<div
				v-if="isOwned(pathfinderSkill.key)"
				:class="{
					'touched-by-error': pathfinderSkillIsTouchedByError(pathfinderSkill.key),
					'invalid-background': (pathfinderSkillIsInvalidAtThisLevel(pathfinderSkill.key) && isSelected(pathfinderSkill.key))
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
				<label :for="pathfinderSkill.key + '-owned'" class="display-inline-block" >
					{{ pathfinderSkill.name }}
					<div
						v-if="
							!canChoosePathfinderSkill(pathfinderSkill.key)
							&& pathfinderSkill.key === selected
							&& pathfinderSkillIsInvalidAtThisLevel(pathfinderSkill.key)"
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
	import { canChooseTrait, getFailedRequirements, getFailedTraitRequirementsErrorMessage } from '../../../rules/characteristics/traits'
	import { pathfinder } from '../../../rules/characteristics/traitLists/talents'
	import { contains } from '../../../rules/utils'
	import { isInvalidAtThisLevel, isTouchedByError, invalidChoiceIsNotUnChecked } from '../../../utilities/validators'

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

			if (characterStore.history[selectedLevel]
				&& characterStore.history[selectedLevel].complexPayload
				&& characterStore.history[selectedLevel].complexPayload.pathfinder
				&& characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			){
				originalPathfinderChoiceKey = characterStore.history[selectedLevel].complexPayload.pathfinder.choices.toString()
			}

			const selected = ref(originalPathfinderChoiceKey)

			return {
				characterSheet,
				characterTraits,
				validationSheet,
				pathfinderOptions,
				selected,
				selectedLevel,
				originalPathfinderChoiceKey,
				contains,
				canChooseTrait,
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
				return contains(pathfinderSkillKey, this.characterTraits)
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
