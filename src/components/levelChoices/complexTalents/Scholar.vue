<template>
	<div>
		
		Poäng att placera: {{(choicesAmount - selectedList.length)}}
		<hr>
		<div :key="scholarSkill.key" v-for="scholarSkill in scholarOptions.list">
			<div>
				<input type="checkbox"
					v-model="checkedOptionsList"
					:id="scholarSkill.key"
					:value="scholarSkill.key"
					@change="inputEventHandler"
					:disabled="( 
						!canChooseTrait(
							scholarSkill.key,
							characterTraits,
							characterSheet.attributes,
							false, characterSheet.metadata.level
						)
						||
						contains(
							characterTraits, 
							scholarSkill.key
						)
						||
						(
							selectedList.length >= choicesAmount
							&&
							!contains(
								checkedOptionsList, 
								scholarSkill.key
							)
						)
					)"
				/>
				<label :for="scholarSkill.key">{{scholarSkill.key}}</label>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait } from '../../../rules/characteristics/traits'
	import { scholar } from '../../../rules/characteristics/traitLists/talents'
	import { contains } from '../../../rules/utils'

	export default {
		props: ['tempCharacterSheet', 'tempValidationSheet'],
		setup(props) {
			const characterSheet = props.tempCharacterSheet
			const characterTraits = characterSheet.traits
			const validationSheet = props.tempValidationSheet
			const scholarOptions = scholar.complexTrait[0]
			const choicesAmount = scholarOptions.choices
			const checkedOptionsList = ref(validationSheet.traits.filter(skill => contains(Object.keys(scholarOptions.list), skill)))
			const selectedList = ref(checkedOptionsList.value.filter(skill => !contains(characterTraits, skill)))

			return {
				characterSheet,
				characterTraits,
				scholarOptions,
				choicesAmount,
				checkedOptionsList,
				selectedList,
				contains,
				canChooseTrait,
				scholar,
			}
		},
		methods: {
			inputEventHandler() {
				this.selectedList = this.checkedOptionsList.filter(skill => !contains(this.characterTraits, skill));

				const complexPayload = {
					scholar: {
						choices: {
							0: {
								0: this.selectedList[0]
							},
							1: {
								0: this.selectedList[1]
							},
						},
						key: 'scholar'
					}
				}

				this.$emit('complexPayload', complexPayload)
			}
		} 
	}
</script>