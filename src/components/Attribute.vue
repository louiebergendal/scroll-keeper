<template>
	<div class='attribute padding-right-tiny padding-left-tiny margin-bottom-nano flex'>
		<div class='width-whole flex margin-bottom-nano'>
			<div class='padding-nano width-half align-center'>
				<span :class="{'invalid-text': attributeAffectedByDefect}" class='font-size-tiny bold'>{{ attribute.shortName }}</span>
			</div>
			<div class='attribute-value padding-left-small padding-nano margin-left-tiny align-center width-half'>
				<span :class="{'invalid-text': attributeAffectedByDefect}" class='font-size-tiny bold'>{{ characterAttributes[attributeProp.key] }}</span>
			</div>
		</div>
		<div>
			<div
				v-for='skill in attributeSkills'
				:key='skill.key'
				class='width-whole flex'
			>
				<div class='width-half card medium padding-nano italic align-center' :class="{'invalid-background': contains(invalidLevels, skill.key)}">

					<!-- taken -->
					<span
						v-if='contains(characterTraits, skill.key)'
						class='font-size-nano bold trait-card-align'
					>
						- {{ skill.name }} -
					</span>

					<!-- not taken -->
					<span
						v-if='!contains(characterTraits, skill.key)'
						class='font-size-nano font-contrast-low trait-card-align'
					>
						{{ skill.name }}
					</span>
				</div>
				<div class='skill-value card light flex width-half margin-left-tiny'>
					<div class='padding-left-small width-fourth padding-left-huge'>
						<span
							v-if='contains(characterTraits, skill.key)'
							class='vertical-correction font-size-nano bold'
							:class="{'invalid-text': attributeAffectedByDefect || contains(invalidLevels, skill.key)}"
						>
							{{ skill.addProficiencyBonus(characterAttributes[attributeProp.key]) }}
						</span>
						<span
							v-if='!contains(characterTraits, skill.key)'
							class='vertical-correction font-size-nano'
							:class="{'invalid-text': attributeAffectedByDefect}"
						>
							{{ characterAttributes[attributeProp.key] }}
						</span>
					</div>
					<div class='padding-nano italic padding-right-medium'>
						<span
							v-if='contains(characterTraits, skill.key)'
							class='vertical-correction font-size-nano align-right bold'
							:class='{"invalid-text": contains(invalidLevels, skill.key)}'
						>
							{{ setAttributeValueName(skill.addProficiencyBonus(characterAttributes[attributeProp.key])) }}
						</span>
						<span
							v-if='!contains(characterTraits, skill.key)'
							class='vertical-correction font-size-nano align-right'
							:class='{ "font-contrast-lowest": characterAttributes[attributeProp.key] < (skill.addProficiencyBonus(baseValue)) }'
						>
							{{ setAttributeValueName(characterAttributes[attributeProp.key]) }}
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
	import { contains } from '../rules/utils'
	import { useCharacterStore } from '../stores/character'
	import { ref } from 'vue'

	export default {
		props: ['attribute'],
		setup(props) {
			const characterStore = useCharacterStore()
			const attributeProp = props.attribute

			const characterTraits = ref([])
			const characterAttributes = ref({})
			const invalidLevels = ref({})

			const attributeSkills = specificAttributeSkills(attributeProp.key, characterStore.sheet.traits)
			const attributeAffectedByDefect = ref(false)

			return {
				attributeProp,
				characterStore,

				characterTraits,
				characterAttributes,
				invalidLevels,

				attributeSkills,
				baseValue,
				attributeAffectedByDefect,
				setAttributeValueName,
				contains

			}
		},
		beforeUpdate() {
			this.attributeAffectedByDefect =
				Object.values(this.characterStore.metadata.invalidLevels).indexOf(this.attributeProp.key) === 0;
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
				const sheet = state.sheet
				this.characterTraits = sheet.traits
				this.characterAttributes = sheet.attributes
				this.invalidLevels = state.metadata.invalidLevels
			})
		}
	}
</script>

<style>
	.attribute {
		flex-direction: column;
	}
	.skill-value {
		justify-content: space-between;
	}
	.vertical-correction {
		vertical-align: text-bottom;
	}
	.attribute-value {
		background: rgb(255,251,246);
		background: linear-gradient(90deg, rgba(255,251,246,0) 0%, rgba(255,251,246,1) 50%, rgba(255,251,246,0) 100%);
	}
</style>
