<template>

	<!-- background -->
	<div
		v-if="(isBackgroundLevelProp && trait.key === 'background') && trait.key === 'background'"
		class="width-whole"
	>
		<h3 class="align-center margin-bottom-medium margin-top-nano">Bakgrund</h3>
		<div class="margin-bottom-small">
			<slot name='ruleRelevantMetadata'>RuleRelevantMetadata har inte laddat!</slot> <!-- slot -->
		</div>

		<slot name='background'>Background har inte laddat!</slot> <!-- slot -->
	</div>

	<!-- trait -->
	<div v-if="!isBackgroundLevel"
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
				<slot name='input'>ping</slot> <!-- slot -->
				<slot name='cardText'>pong</slot> <!-- slot -->
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
			<slot name="complexTrait">Egenskapsalternativ har inte laddat!</slot> <!-- slot -->
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
	import TraitLevelCardText from './TraitLevelCardText.vue'
	import Background from '../levelChoices/complexTalents/background/Background.vue'
	import Scholar from '../levelChoices/complexTalents/Scholar.vue'
	import Pathfinder from '../levelChoices/complexTalents/Pathfinder.vue'

	export default {
		components: {
			RuleRelevantMetadata,
			TraitLevelCardText,
			Pathfinder,
			Background,
			Scholar
		},
		props: ['traitProp', 'isFontContrastLowestProp', 'isTouchedByErrorProp', 'isInvalidProp', 'isSelectedProp', 'cannotChooseTraitProp', 'isBackgroundLevelProp'],
		setup(props) {
			const trait = props.traitProp
			const isFontContrastLowest = ref(props.fontContrastLowestProp)
			const isTouchedByError = ref(props.touchedByErrorProp)
			const isInvalid = ref(props.invalidProp)
			const isSelected = ref(props.selectedProp)
			const cannotChooseTrait = ref(props.cannotChooseTraitProp)
			const isBackgroundLevel = ref(props.isBackgroundLevelProp)

			trait.niceName = getTraitNiceName(trait.key)


			return {
				trait,
				isFontContrastLowest,
				isTouchedByError,
				isInvalid,
				isSelected,
				cannotChooseTrait,
				isBackgroundLevel,
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
			},
			isBackgroundLevelProp: {
				handler(newVal) {
					this.isBackgroundLevel = newVal
				},
				immediate: true
			}
		}
	}
</script>

<style>

</style>