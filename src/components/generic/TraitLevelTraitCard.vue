<template>

	<!-- trait -->
	<div
		class="card width-whole dark margin-bottom-nano"
		:class="{
			'touched-by-error':isTouchedByError,
			'selected': isSelectedProp
		}"
	>
		<div
			class=""
			:class="{
				'touched-by-error -sub': isTouchedByError,
				'invalid-background': isInvalid,
				'font-contrast-lowest': isFontContrastLowest,
				' -angled-bottom':
					containsKey('complexTrait', Object.keys(trait))
					&& isSelectedProp
			}"
		>
			<label
				:for="trait.key"
				class="flex padding-left-tiny padding-right-tiny padding-bottom-tiny -v-start"
				:class="{
					'font-contrast-lowest': isFontContrastLowest
				}"
			>
				<slot name='input'></slot> <!-- slot -->
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
	import {
		getTraitNiceName
	} from '../../rules/characteristics/traits'
	import { containsKey } from '../../rules/utils'
	import RuleRelevantMetadata from '../levelChoices/complexTalents/background/RuleRelevantMetadata.vue'
	import Scholar from '../levelChoices/complexTalents/Scholar.vue'
	import Pathfinder from '../levelChoices/complexTalents/Pathfinder.vue'

	export default {
		components: {
			RuleRelevantMetadata,
			Pathfinder,
			Scholar
		},
		props: ['traitProp', 'isFontContrastLowestProp', 'isTouchedByErrorProp', 'isInvalidProp', 'isSelectedProp', 'cannotChooseTraitProp'],
		setup(props) {
			const trait = props.traitProp
			const isFontContrastLowest = ref(props.fontContrastLowestProp)
			const isTouchedByError = ref(props.touchedByErrorProp)
			const isInvalid = ref(props.invalidProp)
			const isSelected = ref(props.selectedProp)
			const cannotChooseTrait = ref(props.cannotChooseTraitProp)

			trait.niceName = getTraitNiceName(trait.key)


			return {
				trait,
				isFontContrastLowest,
				isTouchedByError,
				isInvalid,
				isSelected,
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
			isSelectedProp: {
				handler(newVal) {
					this.isSelected = newVal
				},
				immediate: true
			},
			cannotChooseTraitProp: {
				handler(newVal) {
					this.cannotChooseTrait = newVal
				},
				immediate: true
			}
		}
	}
</script>

<style>

</style>