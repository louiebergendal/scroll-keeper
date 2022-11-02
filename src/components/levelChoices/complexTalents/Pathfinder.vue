<template>
	<div>
		<div :key="pathfinderSkill.key" v-for="pathfinderSkill in pathfinderOptions.list">
			<div>
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
						contains(
							characterTraits, 
							pathfinderSkill.key
						)
					)"
				/>
				<label :for="pathfinderSkill.key">{{pathfinderSkill.key}}</label>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { canChooseTrait } from '../../../rules/characteristics/traits'
	import { pathfinder } from '../../../rules/characteristics/traitLists/talents'
	import { contains } from '../../../rules/utils'

	export default {
		props: ['tempCharacterSheet'],
		setup(props) {
			const characterSheet = props.tempCharacterSheet
			const characterTraits = characterSheet.traits
			const pathfinderOptions = pathfinder.complexTrait[0]
			const selected = ref('')

			return {
				characterSheet,
				characterTraits,
				pathfinderOptions,
				selected,
				contains,
				canChooseTrait
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
			}
		} 
	}
</script>