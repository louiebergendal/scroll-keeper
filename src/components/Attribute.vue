<template>
	<div class='attribute padding-right-tiny padding-left-tiny margin-bottom-nano flex'>
		<div class='width-whole flex margin-bottom-nano'>
			<div class='padding-nano width-half align-center'>
				<span class='font-size-tiny bold'>{{ attribute.shortName }}</span>
			</div>
			<div class='attribute-value padding-left-small padding-nano margin-left-tiny align-center width-half'>
				<span class='font-size-tiny bold'>{{ character.sheet.attributes[props.attribute.key] }}</span>
			</div>
		</div>
		<div v-if='showAttributeSkills'>
			<div
				v-for='skill in attributeSkills'
				:key='skill.key'
				class='width-whole flex'
			>
				<div class='width-half card medium padding-nano italic align-center'>
					<span
						v-if='contains(character.sheet.traits, skill.key)'
						class='font-size-nano bold'
					>
						- {{ skill.name }} -
					</span>
					<span
						v-if='!contains(character.sheet.traits, skill.key)'
						class='font-size-nano'
					>
						{{ skill.name }}
					</span>
				</div>
				<div class='skill-value card light padding-nano flex width-half margin-left-tiny'>
					<div class='padding-left-small padding-nano width-fourth padding-left-huge'>
						<span
							v-if='contains(character.sheet.traits, skill.key)'
							class='vertical-correction font-size-nano bold'
						>
							{{ skill.addProficiencyBonus(character.sheet.attributes[props.attribute.key]) }}
						</span>
						<span
							v-if='!contains(character.sheet.traits, skill.key)'
							class='vertical-correction font-size-nano'
						>
							{{ character.sheet.attributes[props.attribute.key] }}
						</span>
					</div>
					<div class='padding-nano italic padding-right-medium'>
						<span
							v-if='contains(character.sheet.traits, skill.key)'
							class='vertical-correction font-size-nano align-right bold'
							:class='{ "font-contrast-low": skill.addProficiencyBonus(character.sheet.attributes[props.attribute.key]) < (skill.addProficiencyBonus(baseValue)) }'
						>
							{{ setAttributeValueName(skill.addProficiencyBonus(character.sheet.attributes[props.attribute.key])) }}
						</span>
						<span
							v-if='!contains(character.sheet.traits, skill.key)'
							class='vertical-correction font-size-nano align-right'
							:class='{ "font-contrast-lowest": character.sheet.attributes[props.attribute.key] < (skill.addProficiencyBonus(baseValue)) }'
						>
							{{ setAttributeValueName(character.sheet.attributes[props.attribute.key]) }}
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

	export default {
		props: ['attribute', 'showAttributeSkills' ],
		setup(props) {
			const character = useCharacterStore()
			const attributeSkills = specificAttributeSkills(props.attribute.key, character.sheet.traits)
			const showAttributeSkills = props.showAttributeSkills

			return {
				attributeSkills,
				baseValue,
				showAttributeSkills,
				character,
				props,
				setAttributeValueName,
				contains
			}
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
