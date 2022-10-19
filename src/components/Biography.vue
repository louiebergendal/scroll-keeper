<template>
	<div class='card padding-small margin-bottom-medium'>
		I AM BIOGRAPHY
		<div class='padding-bottom-nano'>
			<div v-if="character.history[1].complexPayload" class="flex">
				<div><b>{{character.history[1].complexPayload['people'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['people'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['people'].choices[1][0])}})</div>
			</div>
		</div>

		<div class='padding-bottom-nano'>
			<div v-if="character.history[1].complexPayload" class="flex">
				<div><b>{{character.history[1].complexPayload['upbringing'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['upbringing'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['upbringing'].choices[1][0])}})</div>
			</div>
		</div>

		<div class='padding-bottom-nano'>
			<div v-if="character.history[1].complexPayload" class="flex">
				<div><b>{{character.history[1].complexPayload['profession'].key}}</b> ({{getTraitNiceName(character.history[1].complexPayload['profession'].choices[0][0])}}, {{getTraitNiceName(character.history[1].complexPayload['profession'].choices[1][0])}})</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'

	/*
		Ful mock för att hitta datan 
	*/

	export default {
		setup() {
			const character = useCharacterStore()

			return {
				character,
				getTraitNiceName

			}
		}
	}
</script>

<style>

</style>
