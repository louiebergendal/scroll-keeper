<template>
	<div class="radio-button-group">
		<label :key="option" :for="caseProp + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="caseProp"
				:value="option"
				:id="caseProp + '-' + option"
				:checked="option == selected"
				:disabled="contains(invalidOptionsProp, option) && option !== selected"
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
			const invalidOptionsProp = ref(props.invalidOptionsList ? props.invalidOptionsList : []) 

			return {
				caseProp,
				invalidOptionsProp,
				contains
			}
		},
		beforeUpdate() {

		},
		methods: {
			emitOption(option) {

				console.log('PANG!!');
				console.log('option: ', option);
				console.log('caseProp: ', this.caseProp);
				console.log('invalidOptionsProp: ', this.invalidOptionsProp);

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