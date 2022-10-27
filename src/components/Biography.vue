<template> 
	<div v-if="hasComplexPayload" class='card padding-small margin-bottom-medium'>

		<div class="flex">
			<div><b>{{peopleKey}} </b>
				(
					{{getTraitNiceName(peopleMandatorySkills)}},
					{{getTraitNiceName(peopleChosenSkills)}}
				)
			</div>
		</div>

		<div class="flex">
			<div><b>{{upbringingKey}} </b>
				(
					{{getTraitNiceName(upbringingChosenSkills1)}},
					{{getTraitNiceName(upbringingChosenSkills2)}}
				)
			</div>
		</div>

		<div class="flex">
			<div><b>{{professionKey}} </b>
				(
					{{getTraitNiceName(professionChosenSkills1)}},
					{{getTraitNiceName(professionChosenSkills2)}}
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
			const hasComplexPayload = ref(characterStore.history[1].complexPayload !== undefined)

			const peopleKey = ref('')
			const peopleMandatorySkills = ref([])
			const peopleChosenSkills = ref([])

			const upbringingKey = ref('')
			const upbringingChosenSkills1 = ref([])
			const upbringingChosenSkills2 = ref([])

			const professionKey = ref('')
			const professionChosenSkills1 = ref([])
			const professionChosenSkills2 = ref([])

			return {
				characterStore,
				hasComplexPayload,

				peopleKey,
				peopleMandatorySkills,
				peopleChosenSkills,

				upbringingKey,
				upbringingChosenSkills1,
				upbringingChosenSkills2,

				professionKey,
				professionChosenSkills1,
				professionChosenSkills2,

				getTraitNiceName,
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {
				const complexPayload = state.history[1].complexPayload
				this.hasComplexPayload = complexPayload.people.key !== ''
				if (this.hasComplexPayload) {
					this.peopleKey = complexPayload.people.key
					this.peopleMandatorySkills = complexPayload.people.choices[0]
					this.peopleChosenSkills = complexPayload.people.choices[1]

					this.upbringingKey = complexPayload.upbringing.key
					this.upbringingChosenSkills1 = complexPayload.upbringing.choices[0]
					this.upbringingChosenSkills2 = complexPayload.upbringing.choices[1]

					this.professionKey = complexPayload.profession.key
					this.professionChosenSkills1 = complexPayload.profession.choices[0]
					this.professionChosenSkills2 = complexPayload.profession.choices[1]
				}
			})
		}
	}

</script>

<style>

</style>
