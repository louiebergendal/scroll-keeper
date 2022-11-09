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
					'invalid-background': pathfinderSkillIsTouchedByError(pathfinderSkill.key)}"
			>
				<input
					type="radio"
					:id="pathfinderSkill.key + '-owned'"
					disabled
					checked='true'
				/>
				<label :for="pathfinderSkill.key + '-owned'" :class="{ 'font-contrast-low' : !pathfinderSkillIsTouchedByError(pathfinderSkill.key) }" >
					{{ pathfinderSkill.name }} 
				</label>
			</div>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait } from '../../../rules/characteristics/traits'
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
			const pathfinderOptions = pathfinder.complexTrait[0]

			let originalPathfinderChoiceKey = ''
			
			if (characterStore.history[validationSheet.metadata.selectedLevel].complexPayload && characterStore.history[validationSheet.metadata.selectedLevel].complexPayload.pathfinder.choices.toString()) {
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

				invalidChoiceIsNotDeselected,
				isInvalidAtThisLevel,
				isTouchedByError,
				invalidChoiceIsNotUnChecked,
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
			invalidPathfinderSkillChoiceIsNotUnselected(key) {
				return this.invalidChoiceIsNotUnChecked(key, this.validationSheet.metadata.invalidLevels, this.originalPathfinderChoiceKey, this.selectedList)
			},
			pathfinderSkillIsTouchedByError(key) {
				return this.isTouchedByError(key, this.validationSheet.metadata.invalidLevels)
			},
			pathfinderSkillIsInvalidAtThisLevel(key) {
				return isInvalidAtThisLevel(key, this.validationSheet.metadata.invalidLevels, this.selectedLevel)
			}
		} 
	}
</script>