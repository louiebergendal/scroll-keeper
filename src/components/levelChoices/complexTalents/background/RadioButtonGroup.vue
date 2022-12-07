<template>
	<div class="radio-button-group">
		<label
			:class="{
				'selected': containsKey(option, selectedOptions) && !containsKey(option, invalidOptions)
			}"
			class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
			:key="option"
			:for="name + '-' + option"
			v-for="option in options"
		>
			<input
				type="radio"
				class="trait-input"
				:name="name"
				:value="option"
				:id="name + '-' + option"
				:checked="containsKey(option, selectedOptions) && !containsKey(option, invalidOptions)"
				:disabled="containsKey(option, invalidOptions)"
				@change="emitOption(option)" 
			/>
			<div>
				<span class="trait-align">
					<span v-if="getTraitNiceName(option)">{{ getTraitNiceName(option) }}</span>
					<span v-if="getBackgroundSkillsListNiceNames(option)">{{ getBackgroundSkillsListNiceNames(option) }}</span>
				</span>
			</div>
		</label>
	</div>
</template>
  
<script>
	import { containsKey } from '../../../../rules/utils'
	import { getTraitNiceName } from '../../../../rules/characteristics/traits'
	import { getBackgroundSkillsListNiceNames } from '../../../../rules/complexTraits/background/background'

	export default {
		name: 'BaseRadioButtonGroup',
		props: ['nameProp', 'optionsProp', 'selectedProp', 'invalidOptionsListProp'],
		setup(props) {
			const name = props.nameProp
			const options = props.optionsProp
			const selectedOptions = props.selectedProp ? props.selectedProp : ['']
			const invalidOptions = props.invalidOptionsListProp ? props.invalidOptionsListProp : ['']


			return {
				name,
				options,
				selectedOptions,
				invalidOptions,
				getTraitNiceName,
				getBackgroundSkillsListNiceNames,
				containsKey,
			}
		},
		watch: {
			selectedProp: {
				handler(newVal) {
					this.selectedOptions = newVal
					this.emitOption(newVal)
				},
				immediate: true
			},
			invalidOptionsListProp: {
				handler(newVal) {
					this.invalidOptions = newVal
				},
				immediate: true
			},
			optionsProp: {
				handler(newVal) {
					this.options = newVal
				},
				immediate: true
			}
		},
		methods: {
			emitOption(option) {
				this.$emit('input', {
					id: this.name,
					option
				})
			}
		}
	}
</script>
  
<style>

</style>