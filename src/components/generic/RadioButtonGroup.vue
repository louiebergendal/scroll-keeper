<template>
	<div class="radio-button-group">
		<label :key="option" :for="caseProp + '-' + option" v-for="option in options">
			<input
				type="radio" 
				:name="caseProp"
				:value="option"
				:id="caseProp + '-' + option"
				:checked="option == selected"
				@change="emitOption(option)" 
			/>
				{{ option }}
		</label>
	</div>
</template>
  
<script>
	export default {
		name: 'BaseRadioButtonGroup',
		props: ['case', 'options', 'selected'],
		setup(props) {
			const caseProp = props.case

			return {
				caseProp
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