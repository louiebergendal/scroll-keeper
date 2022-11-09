<template>
	<div class="radio-button-group">
		<label :key="option" :for="name + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="name"
				:value="option"
				:id="name + '-' + option"
				:checked="contains(option, selectedOptions) && !contains(option, invalidOptions)"
				:disabled="contains(option, invalidOptions)"
				@change="emitOption(option)" 
			/>
				{{ option }}
		</label>
	</div>
</template>
  
<script>
	import { contains } from '../../rules/utils'
	import { ref } from 'vue'

	export default {
		name: 'BaseRadioButtonGroup',
		props: ['name', 'options', 'selected', 'invalidOptionsList'],
		setup(props) {
			const selectedOptions = props.selected ? props.selected : ['']
			const invalidOptions = props.invalidOptionsList ? props.invalidOptionsList : ['']

			return {
				contains,
				selectedOptions,
				invalidOptions
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
				handler(newVal, oldVal) {
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