<template>

	<!-- trait -->
	<div
		class="card width-whole dark margin-bottom-nano"
		:class="{
			'touched-by-error':isTouchedByError,
			'selected': traitIsSelected(trait.key)
		}"
	>
		<div
			:class="{
				'touched-by-error -sub': isTouchedByError,
				'invalid-background': isInvalid,
				'font-contrast-lowest': isFontContrastLowest,
				' -angled-bottom':
					containsKey('complexTrait', Object.keys(trait))
					&& traitIsSelected(trait.key)
			}"
		>
			<label
				:for="trait.key"
				class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start"
				:class="{
					'font-contrast-lowest': isFontContrastLowest
				}"
			>
				<input
					type="radio"
					:checked="traitIsSelected(trait.key)"
					:value="trait.key"
					:id="trait.key"
					:disabled="cannotChooseTrait"
					class="trait-input"
					@change="emitOption(trait.key)" 
				/>
				<slot name='cardText'></slot> <!-- slot -->
			</label>
		</div>

		<!-- complex traits -->
		<div
			v-if="containsKey('complexTrait', Object.keys(trait))"
			class="width-whole angled-top"
			:class="{
				'touched-by-error': isTouchedByError,
				'font-contrast-lowest': isFontContrastLowest
			}"
		>
			<slot name="complexTrait"></slot> <!-- slot -->
		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { containsKey } from '../../../rules/utils'

	export default {
		name: 'TraitLevelTraitCard',
		props: ['traitProp', 'isFontContrastLowestProp', 'isTouchedByErrorProp', 'isInvalidProp', 'selectedChoiceKeyProp', 'cannotChooseTraitProp'],
		setup(props) {
			const trait = props.traitProp
			const isFontContrastLowest = ref(props.fontContrastLowestProp)
			const isTouchedByError = ref(props.touchedByErrorProp)
			const isInvalid = ref(props.invalidProp)
			const selectedChoiceKey = ref(props.selectedChoiceKeyProp)
			const cannotChooseTrait = ref(props.cannotChooseTraitProp)

			return {
				trait,
				isFontContrastLowest,
				isTouchedByError,
				isInvalid,
				selectedChoiceKey,
				cannotChooseTrait,
				containsKey
			}
		},
		watch: {
			traitProp: {
				handler(newVal) {
					this.trait = newVal
				},
				immediate: true
			},
			isFontContrastLowestProp: {
				handler(newVal) {
					this.isFontContrastLowest = newVal
				},
				immediate: true
			},
			isTouchedByErrorProp: {
				handler(newVal) {
					this.isTouchedByError = newVal
				},
				immediate: true
			},
			isInvalidProp: {
				handler(newVal) {
					this.isInvalid = newVal
				},
				immediate: true
			},
			selectedChoiceKeyProp: {
				handler(newVal) {
					this.selectedChoiceKey = newVal
				},
				immediate: true
			},
			cannotChooseTraitProp: {
				handler(newVal) {
					this.cannotChooseTrait = newVal
				},
				immediate: true
			},	
		},
		methods: {
			emitOption(selectedChoiceKey) {
				this.$emit('option', selectedChoiceKey)
			},
			traitIsSelected(traitKey){
				return traitKey === this.selectedChoiceKey
			},
		}
	}
</script>

<style>

</style>