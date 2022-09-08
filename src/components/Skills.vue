<template>
	<div class='skills-wrapper card dark padding-tiny margin-bottom-nano width-whole flex'>
		<h3 class='attributes margin-top-nano align-center'>Färdigheter</h3>
		<div
			v-for='skill in independentSkillsList'
			:key='skill.key'
			class='width-whole flex'
		>
			<div class='width-whole card medium padding-nano margin-nano italic align-center'>
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
	export default {
		setup() {
			const character = useCharacterStore()
			const characterSkillKeys = character.getTraits
			const independentSkillsList = independentCharacterSkills(characterSkillKeys)
			return {
				independentSkillsList
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
