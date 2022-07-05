<template>
	<div class="character">Character</div>
	<p>{{ this.character.metadata.name }}</p>
	<Traits :traitValues="this.character.traits" />
	<LevelLadder :characterHistory="this.characterHistory" />
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
			const characterHistory = VilleVakt // HÅRDKODAT
			const character = flattenCharacter(VilleVakt) // HÅRDKODAT
			return {
				character,
				characterHistory
			}
		}
	}
</script>

<style></style>