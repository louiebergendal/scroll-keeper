<template>
	<div class='attribute padding-right-tiny padding-left-tiny margin-bottom-nano flex'>
		<div class='width-whole flex margin-bottom-nano'>
			<div class='padding-nano width-half attribute-headline align-center'>
				<img class="attribute-icon" :src="attributeIcon" />
				<span
					:class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}"
					class='trait-card-align attribute-headline font-size-small'>
						<span class="bold">{{attribute.shortName}}</span>
				</span>
			</div>
			<div class='attribute-value padding-left-small padding-nano margin-left-tiny align-center width-half'>
				<span :class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}" class='font-size-tiny attribute-value-align bold'>{{characterAttributes[attributeProp.key]}}</span>
			</div>
		</div>
		<div>
			<div
				v-for='(skill, key, skillIndex) in attributeSkills'
				:key='skill.key'
				class='width-whole flex'
			>

				<div
					class='attribute-skill width-half card medium padding-nano align-center'
					:class="{
						'touched-by-error': characteristicIsTouchedByError(skill.key),
						'attribute-skill-top': skillIndex === 0,
						'attribute-skill-bottom': skillIndex === 1
					}">
					<div
						v-if="contains(skill.key, characterTraits)"
						:class="{
							'svg-error-filter': characteristicIsTouchedByError(skill.key)
						}"
						class="attribute-skill-marker"
					>
					</div>
					<span
						class='font-size-tiny trait-card-align'
						:class="{'bold': contains(skill.key, characterTraits)}"
					>
						{{ skill.name }}
					</span>
				</div>
				<div
					class='skill-value card light flex width-half margin-left-tiny'
					:class="{
						'attribute-skill-top': skillIndex === 0,
						'attribute-skill-bottom': skillIndex === 1
					}"
				>
					<div class='padding-left-small width-fourth padding-left-huge'>
						<span
							v-if='contains(skill.key, characterTraits)'
							class='attribute-value-align bold'
							:class="{'invalid-text': characteristicIsTouchedByError(attribute.key) || characteristicIsTouchedByError(skill.key)}"
						>
							{{skill.addProficiencyBonus(characterAttributes[attributeProp.key])}}
						</span>
						<span
							v-if='!contains(skill.key, characterTraits)'
							class='attribute-value-align'
							:class="{'invalid-text': characteristicIsTouchedByError(attribute.key)}"
						>
							{{characterAttributes[attributeProp.key]}}
						</span>
					</div>
					<div class='padding-nano padding-right-medium'>
						<span
							v-if='contains(skill.key, characterTraits)'
							class='trait-card-align font-size-tiny align-right bold'
							:class='{"invalid-text": characteristicIsTouchedByError(skill.key)}'
						>
							{{setAttributeValueName(skill.addProficiencyBonus(characterAttributes[attributeProp.key]))}}
						</span>
						<span
							v-if='!contains(skill.key, characterTraits)'
							class='trait-card-align font-size-tiny align-right'
							:class='{ "font-contrast-lowest": characterAttributes[attributeProp.key] < (skill.addProficiencyBonus(baseValue)) }'
						>
							{{setAttributeValueName(characterAttributes[attributeProp.key])}}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { setAttributeValueName, baseValue } from '../rules/characteristics/attributes'
	import { specificAttributeSkills } from '../rules/characteristics/traits'
	import { contains, explodeInvalidList } from '../rules/utils'
	import { useCharacterStore } from '../stores/character'
	import { ref } from 'vue'
	import { isTouchedByError } from '../utilities/validators'

	export default {
		props: ['attribute', 'iconUrl'],
		setup(props) {
			const characterStore = useCharacterStore()
			const attributeProp = props.attribute

			const characterTraits = ref([])
			const characterAttributes = ref({})
			const invalidLevels = ref({})

			const attributeSkills = specificAttributeSkills(attributeProp.key, characterStore.sheet.traits)

			const attributeIcon = '/img/' + props.iconUrl + '.png'

			return {
				attributeProp,
				attributeIcon,
				characterStore,

				characterTraits,
				characterAttributes,
				invalidLevels,

				attributeSkills,
				baseValue,

				setAttributeValueName,
				contains,
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
		}
	}
</script>

<style>
</style>
