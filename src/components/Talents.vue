<template>
	<div class='talents-wrapper card dark padding-small margin-bottom-nano width-whole flex'>
		<h3 class='margin-top-nano align-center'>Talanger</h3>
		<div
			v-for='talent in independentCharacterTalents(character.sheet.traits)'
			:key='talent.key'
			class='width-whole flex'
		>
			<div :class="{ 'invalid-background bold': contains(character.sheet.metadata.invalidLevels, talent.key) }" class='width-whole card medium padding-nano margin-nano align-center'>
				<span class='font-size-nano trait-card-align'>
					{{ talent.name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { independentCharacterTalents } from '../rules/characteristics/traits'
	import { contains } from '../rules/utils'

	export default {
		setup() {
			const character = useCharacterStore()

			return {
				character,
				independentCharacterTalents,
				contains
			}
		}
	}
</script>

<style>
	.talents-wrapper {
		flex-direction: column;
	}
</style>
