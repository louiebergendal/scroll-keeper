<template>
	<div v-if="character.history[1].complexPayload" class='card padding-small margin-bottom-medium'>
		BIOGRAPHY
		<div v-if="character.history[1].complexPayload['people'].choices" class="flex">
			<div><b>{{character.history[1].complexPayload['people'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['people'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['people'].choices[1][0])}})</div>
		</div>
		<div v-if="character.history[1].complexPayload['upbringing'].choices" class="flex">
			<div><b>{{character.history[1].complexPayload['upbringing'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['upbringing'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['upbringing'].choices[1][0])}})</div>
		</div>
		<div v-if="character.history[1].complexPayload['profession'].choices" class="flex">
			<div><b>{{character.history[1].complexPayload['profession'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['profession'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['profession'].choices[1][0])}})</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'

	export default {
		setup() {
			const character = useCharacterStore()

			return {
				character,
				getTraitNiceName,
			}
		}
	}
</script>

<style>

</style>
