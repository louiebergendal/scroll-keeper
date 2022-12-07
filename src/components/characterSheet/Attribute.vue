<template>
	<div class='attribute padding-right-tiny padding-left-tiny padding-top-nano margin-bottom-nano flex'>
		<div class='width-whole flex margin-bottom-nano'>
			<div class='padding-nano width-whole attribute-headline align-center'>
				<img class="attribute-icon" :src="attributeIcon" />
				<span
					:class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}"
					class='trait-card-align attribute-headline font-size-small'>
						<span class="bold">{{ attribute.shortName }}</span>
				</span>
			</div>
			<div class='attribute-value margin-left-tiny align-center width-half'>
				<span
					:class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}"
					class='font-size-tiny attribute-value-align bold'
				>
					{{ characterAttributes[attribute.key] }}
				</span>
			</div>
		</div>
		<div>
			<div
				v-for='(skill, key, skillIndex) in attributeSkills'
				:key='skill.key'
				class='width-whole flex'
			>

				<div
					class='attribute-skill width-whole card medium padding-nano align-center margin-right-tiny'
					:class="{
						'touched-by-error': characteristicIsTouchedByError(skill.key),
						'attribute-skill-top': skillIndex === 0,
						'attribute-skill-bottom': skillIndex === 1
					}"
				>
					<div
						v-if="isOwned(skill.key)"
						:class="{
							'svg-error-filter': characteristicIsTouchedByError(skill.key)
						}"
						class="attribute-skill-marker"
					>
					</div>
					<span
						class='font-size-tiny trait-card-align'
						:class="{'bold': isOwned(skill.key)}"
					>
						{{ skill.name }}
					</span>
				</div>
				<div
					class='skill-value card light flex -h-center width-half'
					:class="{
						'attribute-skill-top': skillIndex === 0,
						'attribute-skill-bottom': skillIndex === 1
					}"
				>
					<div class='align-center width-full'>
						<span
							v-if='isOwned(skill.key)'
							class='attribute-value-align bold'
							:class="{
								'invalid-text':
									characteristicIsTouchedByError(attribute.key)
									|| characteristicIsTouchedByError(skill.key)}"
						>
							{{ skill.addProficiencyBonus(characterAttributes[attribute.key]) }}
						</span>
						<span
							v-if='!isOwned(skill.key)'
							class='attribute-value-align'
							:class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}"
						>
							{{ characterAttributes[attribute.key] }}
						</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { setAttributeValueName, baseValue } from '../../rules/characteristics/attributes'
	import { specificAttributeSkills } from '../../rules/characteristics/traits'
	import { containsKey, explodeInvalidList } from '../../rules/utils'
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue'
	import { isTouchedByError } from '../../validators/validators'

	export default {
		props: ['attributeProp', 'iconUrlProp'], // ska "iconURL" vara här?
		setup(props) {
			const characterStore = useCharacterStore()
			const attribute = props.attributeProp
			const attributeIcon = '/img/' + props.iconUrlProp + '.png'

			const characterTraits = ref([])
			const characterAttributes = ref({})
			const invalidLevels = ref({})
			const attributeSkills = specificAttributeSkills(attribute.key, characterStore.sheet.traits)

			return {
				attribute,
				attributeIcon,
				characterStore,

				characterTraits,
				characterAttributes,
				invalidLevels,

				attributeSkills,
				baseValue,

				setAttributeValueName,
				containsKey,
				explodeInvalidList,

				isTouchedByError

			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
				const sheet = state.sheet
				this.characterTraits = sheet.traits
				this.characterAttributes = sheet.attributes
				this.invalidLevels = state.metadata.invalidLevels
			})
		},
		methods: {
			characteristicIsTouchedByError(key) {
				return this.isTouchedByError(key, this.invalidLevels)
			},
			isOwned(traitKey){
				return containsKey(traitKey, this.characterTraits)
			}
		}
	}
</script>

<style>
</style>
