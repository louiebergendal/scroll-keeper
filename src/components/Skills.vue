<template>
	<div class='skills-wrapper card dark padding-tiny margin-bottom-nano width-whole flex'>
		<h3 class='margin-top-nano align-center'>Färdigheter</h3>
		<div
			v-for='skill in independentCharacterSkills(character.sheet.traits)'
			:key='skill.key'
			class='width-whole flex'
		>
			<div :class="{ 'invalid bold': !levelChoiceIsValid(skill.key, character.sheet.metadata.invalidLevels) }" class='width-whole card medium padding-nano margin-nano italic align-center'>
				<span class='font-size-nano'>
					{{ skill.name }}					
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { independentCharacterSkills } from '../rules/characteristics/traits'
	import { levelChoiceIsValid } from '../rules/utils'

	export default {
		setup() {
			const character = useCharacterStore()

			return {
				character,
				independentCharacterSkills,
				levelChoiceIsValid
			}
		}
	}
</script>

<style>
	.invalid {
		background: rgb(247, 63, 46) !important;
	}
	.skills-wrapper {
		flex-direction: column;
	}
</style>
