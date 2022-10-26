<template>
	<div class="radio-button-group">
		<label :key="option" :for="name + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="name"
				:value="option"
				:id="name + '-' + option"
				:checked="contains(selectedOptions, option) && !contains(invalidOptions, option)"
				:disabled="contains(invalidOptions, option)"
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
			const selectedOptions = ref(props.selected ? props.selected : [])
			const invalidOptions = ref(props.invalidOptionsList ? props.invalidOptionsList : [])

			return {
				contains,
				selectedOptions,
				invalidOptions
			}
		},
		beforeUpdate() {
			this.selectedOptions = this.selected ? this.selected : []
			this.invalidOptions = this.invalidOptionsList ? this.invalidOptionsList : []
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