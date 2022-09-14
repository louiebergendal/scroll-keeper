<template>
	<div class='skills-wrapper card dark padding-tiny margin-bottom-nano width-whole flex'>
		<h3 class='attributes margin-top-nano align-center'>Talanger</h3>
		<div
			v-for='talent in independentCharacterTalents(character.sheet.traits)'
			:key='talent.key'
			class='width-whole flex'
		>
			<div class='width-whole card medium padding-nano margin-nano italic align-center'>
				<span class='font-size-nano'>
					{{ talent.name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { independentCharacterTalents } from '../rules/characteristics/traits'

	export default {
		setup() {
			const character = useCharacterStore()

			return {
				character,
				independentCharacterTalents
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
