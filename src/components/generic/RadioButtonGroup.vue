<template>
	<div class="radio-button-group">
		<label :key="option" :for="name + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="name"
				:value="option"
				:id="name + '-' + option"
				:checked="containsKey(option, selectedOptions) && !containsKey(option, invalidOptions)"
				:disabled="containsKey(option, invalidOptions)"
				@change="emitOption(option)" 
			/>
				<span v-if="getTraitNiceName(option)">{{ getTraitNiceName(option) }}</span>
				<span v-if="getBackgroundSkillsListNiceNames(option)">{{ getBackgroundSkillsListNiceNames(option) }}</span>
		</label>
	</div>
</template>
  
<script>
	import { containsKey } from '../../rules/utils'
	import { getTraitNiceName } from '../../rules/characteristics/traits'
	import { getBackgroundSkillsListNiceNames } from '../../rules/complexTraits/background/background'

	export default {
		name: 'BaseRadioButtonGroup',
		props: ['name', 'options', 'selected', 'invalidOptionsList'],
		setup(props) {
			const selectedOptions = props.selected ? props.selected : ['']
			const invalidOptions = props.invalidOptionsList ? props.invalidOptionsList : ['']
			const name = props.name

			return {
				selectedOptions,
				invalidOptions,
				name,
				getTraitNiceName,
				getBackgroundSkillsListNiceNames,
				containsKey,
			}
		},
		watch: {
			selected: {
				handler(newVal) {
					this.selectedOptions = newVal
					this.emitOption(newVal)
				},
				immediate: true
			},
			invalidOptionsList: {
				handler(newVal) {
					this.invalidOptions = newVal
				},
				immediate: true
			},
		},
		methods: {
			emitOption(option) {
				this.$emit("input", {
					id: this.name,
					option
				})
			}
		}
	}
</script>
  
<style>

</style>