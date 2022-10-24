<template> 
	<div v-if="hasComplexPayload" class='card padding-small margin-bottom-medium'>
		<div class="flex">
			<div><b>peopleKey: {{peopleKey}}</b>
				(
					{{getTraitNiceName(peopleMandatorySkills)}},
					{{getTraitNiceName(peopleChosenSkills)}}
				)
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'
	import { ref } from 'vue';

	export default {
		setup(props) {
			const characterStore = useCharacterStore()
			const complexPayload = characterStore.history[1].complexPayload
			const hasComplexPayload = ref(complexPayload !== undefined)
			const peopleKey = ref(complexPayload.people.key)
			const peopleMandatorySkills = ref(complexPayload.people.choices[0])
			const peopleChosenSkills = ref(complexPayload.people.choices[1])

			return {
				characterStore,
				peopleKey,
				hasComplexPayload,
				peopleMandatorySkills,
				peopleChosenSkills,
				getTraitNiceName,
			}
		},
		mounted() {
			this.characterStore.$subscribe((mutation, state) => {
				this.hasComplexPayload = state.history[1].complexPayload !== undefined
				this.peopleKey = state.history[1].complexPayload.people.key
				this.peopleMandatorySkills = state.history[1].complexPayload.people.choices[0]
				this.peopleChosenSkills = state.history[1].complexPayload.people.choices[1]
			})
		}
	}

</script>

<style>

</style>




<!--
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
	import { ref } from 'vue'

	export default {
		setup() {
			const character = useCharacterStore()
			const characterRef = ref(character)
			const characterName = character.metadata.name

/* 			console.log('characterRef: ', characterRef.value);
			console.log('character: ', character);
			console.log('characterName: ', characterName);
			console.log('characterRef.metadata: ', characterRef.value.metadata); */

/* 			while (characterRef.value.metadata.name !== 'Loader') {
				console.log('ping!');
				break
			} */
			if (character.metadata.name !== 'Loader') {
				console.log('character.metadata.name: ', character.metadata.name);
			}

			return {
				character,
				getTraitNiceName,
			}
		}
	}
</script>

<style>

</style> -->





 <!-- ======== FÖRSTA VARIANTEN ======== -->
<!-- 	<template>
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

</style> -->



 <!-- ======== ANDRA VARIANTEN ======== -->
<!-- <template>
	<div v-if="characterBackgroundPayload" class='card padding-small margin-bottom-medium'>
		BIOGRAPHY
		<div v-if="characterBackgroundPayload['people'].choices" class="flex">
			<div><b>{{characterBackgroundPayload['people'].key}}</b> ({{getTraitNiceName(characterBackgroundPayload['people'].choices[0][0])}}, {{getTraitNiceName(characterBackgroundPayload['people'].choices[1][0])}})</div>
		</div>
		<div v-if="characterBackgroundPayload['upbringing'].choices" class="flex">
			<div><b>{{characterBackgroundPayload['upbringing'].key}}</b> ({{getTraitNiceName(characterBackgroundPayload['upbringing'].choices[0][0])}}, {{getTraitNiceName(characterBackgroundPayload['upbringing'].choices[1][0])}})</div>
		</div>
		<div v-if="characterBackgroundPayload['profession'].choices" class="flex">
			<div><b>{{characterBackgroundPayload['profession'].key}}</b> ({{getTraitNiceName(characterBackgroundPayload['profession'].choices[0][0])}}, {{getTraitNiceName(characterBackgroundPayload['profession'].choices[1][0])}})</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'
	import { ref } from 'vue'

	/* försök med refs() */
	/* den här tömmer sina fält när man laddar om sidan */

	export default {
		setup() {
			const character = useCharacterStore()
			const characterBackgroundPayload = ref(character.history[1].complexPayload)

			return {
				character,
				getTraitNiceName,
				characterBackgroundPayload,
			}
		}
	}
</script>

<style>

</style>
 -->

 <!-- ======== TREDJE VARIANTEN ======== -->
<!-- <template>
	<div v-if="backgroundPayload" class='card padding-small margin-bottom-medium'>
		BIOGRAPHY
		<div v-if="backgroundPayload['people'].choices" class="flex">
			<div><b>{{backgroundPayload['people'].key}}</b> ({{getTraitNiceName(backgroundPayload['people'].choices[0][0])}}, {{getTraitNiceName(backgroundPayload['people'].choices[1][0])}})</div>
		</div>
		<div v-if="backgroundPayload['upbringing'].choices" class="flex">
			<div><b>{{backgroundPayload['upbringing'].key}}</b> ({{getTraitNiceName(backgroundPayload['upbringing'].choices[0][0])}}, {{getTraitNiceName(backgroundPayload['upbringing'].choices[1][0])}})</div>
		</div>
		<div v-if="backgroundPayload['profession'].choices" class="flex">
			<div><b>{{backgroundPayload['profession'].key}}</b> ({{getTraitNiceName(backgroundPayload['profession'].choices[0][0])}}, {{getTraitNiceName(backgroundPayload['profession'].choices[1][0])}})</div>
		</div>
	</div>
</template>

<script setup>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'
	import { ref } from 'vue';

	/* försök med setup och refs() */
	/* den här tömmer sina fält när man laddar om sidan */

	const character = useCharacterStore()
	const backgroundPayload = ref(character.history[1].complexPayload)

</script>

<style>

</style> -->

<!--
		<div v-if="backgroundHistory" class='card padding-small margin-bottom-medium'>
		<div v-if="peopleChoices" class="flex">
			<div><b>peopleKey: {{backgroundLevel.people.key}}</b>
				(
					{{getTraitNiceName(peopleChoices[0][0])}},
					{{getTraitNiceName(peopleChoices[1][0])}}
				)
			</div>
		</div>
		<div v-if="upbringingChoices" class="flex">
			<div><b>{{upbringingChoiceKey}}</b>
				(
					{{getTraitNiceName(upbringingChoices[0][0])}},
					{{getTraitNiceName(upbringingChoices[1][0])}}
				)
			</div>
		</div>
		<div v-if="professionChoices" class="flex">
			<div><b>{{professionChoiceKey}}</b>
				(
					{{getTraitNiceName(professionChoices[0][0])}},
					{{getTraitNiceName(professionChoices[1][0])}}
				)
			</div>
		</div>
	</div>
-->