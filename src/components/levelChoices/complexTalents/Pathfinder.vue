<template>
	<div class="padding-left-small padding-right-small padding-bottom-small padding-top-small">

		<TraitLevelTraitsGroup
			:selectedLevelProp="selectedLevel"
			:traitTypeProp="'favouredTerrainSkills'"
			:selectedChoiceKeyProp="selectedChoiceKey"
			:tempCharacterSheetProp="characterSheet"
			:tempValidationSheetProp="validationSheet"
			@selected-choice-key="updateSelectedChoiceKey"
			@update-tabs="$emit('update-tabs')"
		/>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../stores/character'

	export default {
		name: 'Pathfinder',
		props: ['characterSheetProp', 'validationSheetProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const characterSheet = props.characterSheetProp
			const validationSheet = props.validationSheetProp
			const selectedLevel = validationSheet.metadata.selectedLevel
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
				validationSheet,
				selectedChoiceKey,
				selectedLevel,
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
			})
			this.updateSelectedChoiceKey({selectedChoiceKey: this.selectedChoiceKey})
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
			updateSelectedChoiceKey(data) {
				this.selectedChoiceKey = data.selectedChoiceKey

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
		}
	}
</script>

<style>
</style>
