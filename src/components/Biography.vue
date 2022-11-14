<template>
	<div v-if="hasComplexPayload" class='card dark padding-bottom-small margin-bottom-medium'>
		
		<div class="align-center bold padding-tiny">Bakgrund</div>

		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.people }}:
			</div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ peopleNiceName }}: </span>
					<span class="font-size-nano">
						{{ getTraitNiceName(peopleMandatorySkills) }},
						{{ getTraitNiceName(peopleChosenSkills) }}
					</span>
				</div>
			</div>
		</div>

		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.upbringing }}:
			</div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ upbringingNiceName }}: </span>
					<span class="font-size-nano">
						{{ getTraitNiceName(upbringingChosenSkills1) }},
						{{ getTraitNiceName(upbringingChosenSkills2) }}
					</span>
				</div>
			</div>
		</div>

		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.profession }}:
			</div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ professionNiceName }}: </span>
					<span class="font-size-nano">
						{{ getTraitNiceName(professionChosenSkills1) }},
						{{ getTraitNiceName(professionChosenSkills2) }}
					</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'
	import background, { backgroundCategoryNiceNames } from '../rules/complexTraits/background/background'
	import { ref } from 'vue';

	export default {
		setup() {
			const characterStore = useCharacterStore()
			const hasComplexPayload = ref(characterStore.history[1].complexPayload !== undefined)

			const peopleNiceName = ref('')
			const peopleMandatorySkills = ref([])
			const peopleChosenSkills = ref([])

			const upbringingNiceName = ref('')
			const upbringingChosenSkills1 = ref([])
			const upbringingChosenSkills2 = ref([])

			const professionNiceName = ref('')
			const professionChosenSkills1 = ref([])
			const professionChosenSkills2 = ref([])

			return {
				characterStore,
				hasComplexPayload,

				peopleNiceName,
				peopleMandatorySkills,
				peopleChosenSkills,

				upbringingNiceName,
				upbringingChosenSkills1,
				upbringingChosenSkills2,

				professionNiceName,
				professionChosenSkills1,
				professionChosenSkills2,

				getTraitNiceName,
				backgroundCategoryNiceNames,
				background
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {

				const complexPayload = state.history[1].complexPayload

				this.hasComplexPayload = complexPayload.people.key !== ''
				if (this.hasComplexPayload) {
					this.peopleNiceName = background.peoples[complexPayload.people.key].niceName
					this.peopleMandatorySkills = complexPayload.people.choices[0]
					this.peopleChosenSkills = complexPayload.people.choices[1]

					this.upbringingNiceName = background.upbringings[complexPayload.upbringing.key].niceName
					this.upbringingChosenSkills1 = complexPayload.upbringing.choices[0]
					this.upbringingChosenSkills2 = complexPayload.upbringing.choices[1]

					this.professionNiceName = background.professions[complexPayload.profession.key].niceName
					this.professionChosenSkills1 = complexPayload.profession.choices[0]
					this.professionChosenSkills2 = complexPayload.profession.choices[1]
				}
			})
		}
	}

</script>

<style>
	.align {
		vertical-align: super;
	}
	.background-title {
		text-align: right;
		min-width: 10rem;
		padding-top: 3px;
	}
</style>
