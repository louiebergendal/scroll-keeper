<template>
	<div class="character">Character</div>
	
	<Traits :traitValues="this.character.traits" />
	<LevelLadder />
</template>

<script>
	import Traits from '../components/Traits.vue';
	import LevelLadder from '../components/LevelLadder.vue';
	import { VilleVakt } from '../mocks/mockCharacterHistory';
	import { flattenCharacter } from '../utilities/characterFlattener';

	export default {
		components: {
			Traits,
			LevelLadder
		},
		setup() {
			const character = flattenCharacter(VilleVakt)
			return {
				character
			}
		}
	}
</script>

<style></style>