<template>
	<div v-if="hasComplexPayload" class='card dark padding-bottom-small margin-bottom-medium'>
		<div class="align-center bold padding-tiny">Bakgrund</div>
		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">{{peopleNiceName}}: </div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<span class="align">
					{{getTraitNiceName(peopleMandatorySkills)}},
					{{getTraitNiceName(peopleChosenSkills)}}
				</span>
			</div>
		</div>

		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">{{upbringingNiceName}}:</div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<span class="align">
					{{getTraitNiceName(upbringingChosenSkills1)}},
					{{getTraitNiceName(upbringingChosenSkills2)}}
				</span>
			</div>
		</div>

		<div class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">{{professionNiceName}}:</div>
			<div class="card font-size-tiny medium width-whole padding-left-small padding-top-nano padding-bottom-nano margin-right-small">
				<span class="align">
					{{getTraitNiceName(professionChosenSkills1)}},
					{{getTraitNiceName(professionChosenSkills2)}}
				</span>
			</div>
		</div>

	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getTraitNiceName } from '../rules/characteristics/traits'
	import background from '../rules/complexTraits/background/background'
	import { ref } from 'vue';

	export default {
		setup(props) {
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
			console.log(background)
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
		vertical-align: middle;
	}
	.background-title {
		text-align: right;
		min-width: 10rem;
		padding-top: 3px;
	}
</style>
