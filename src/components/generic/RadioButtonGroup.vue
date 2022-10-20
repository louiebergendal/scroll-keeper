<template>
	<div class="radio-button-group">
		<label :key="option" :for="caseProp + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="caseProp"
				:value="option"
				:id="caseProp + '-' + option"
				:checked="option == selected"
				:disabled="contains(invalidOptionsProp, option)"
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
		props: ['case', 'options', 'selected', 'invalidOptionsList'],
		setup(props) {
			const caseProp = props.case
			const invalidOptionsProp = props.invalidOptionsList ? props.invalidOptionsList : []

			return {
				caseProp,
				invalidOptionsProp,
				contains
			}
		},
		methods: {
			emitOption(option) {
				this.$emit("input", {
					id: this.caseProp,
					option
				})
			}
		}
	}
</script>
  
<style>

</style>