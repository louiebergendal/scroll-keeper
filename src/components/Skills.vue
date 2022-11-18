<template>
	<div class='fancy skills-wrapper padding-small width-whole flex'>
		<h3 class='align-center'>Färdigheter</h3>
		<div
			v-for='skill in independentCharacterSkills(characterStore.sheet.traits)'
			:key='skill.key'
			class='width-whole flex'
		>
			<div 
				:class="{ 'touched-by-error': 
					isTouchedByError(
						skill.key,
						characterStore.sheet.metadata.invalidLevels
					)
				}"
				class='width-whole card medium padding-nano align-center'
			>
				<span class='trait-card-align font-size-nano'>
					{{ skill.name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { independentCharacterSkills } from '../rules/characteristics/traits'
	import { isTouchedByError } from '../utilities/validators'

	export default {
		setup() {
			const characterStore = useCharacterStore()

			return {
				characterStore,
				independentCharacterSkills,
				isTouchedByError
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
