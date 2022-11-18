<template>
	<div class='fancy talents-wrapper padding-small width-whole flex'>
		<h3 class='align-center'>Talanger</h3>

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
