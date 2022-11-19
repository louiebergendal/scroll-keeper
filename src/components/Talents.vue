<template>
	<div class='fancy talents-wrapper padding-left-small padding-right-small padding-bottom-small padding-top-tiny width-whole flex position-relative'>
		<div class="corner -inner-top-left"></div>
		<div class="corner -inner-bottom-right"></div>
		<div class="corner -top-middle-small"></div>
		<div v-if="Object.keys(independentCharacterTalents(characterStore.sheet.traits)).length > 1" class="corner -right-middle-small"></div>
		<h3 class='align-center margin-bottom-tiny padding-bottom-nano padding-top-nano'>Talanger</h3>

		<div
			v-for='talent in independentCharacterTalents(characterStore.sheet.traits)'
			:key='talent.key'
			class='width-whole flex'
		>
			<div v-if="talent.key !== 'background'"
				:class="{ 'touched-by-error': 
					isTouchedByError(
						talent.key,
						characterStore.sheet.metadata.invalidLevels
					)
				}"
				class='width-whole card medium padding-nano margin-bottom-nano align-center'>
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
	import { isTouchedByError } from '../utilities/validators'

	export default {
		setup() {
			const characterStore = useCharacterStore()

			return {
				characterStore,
				independentCharacterTalents,
				isTouchedByError
			}
		}
	}
</script>

<style>
	.talents-wrapper {
		flex-direction: column;
	}
</style>
