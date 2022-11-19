<template>
	<div v-if="hasComplexPayload" class='fancy width-whole padding-small margin-bottom-medium position-relative'>
		<div class="corner -inner-top-right-side"></div>
		<div class="corner -inner-bottom-right"></div>
		<div class="corner -right-middle-small"></div>
		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				Namn
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ characterName }} ({{ characterStore.metadata.level }}) </span>
				</div>
			</div>
		</div>

		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.people }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-left-small padding-right-small padding-top-nano padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ peopleNiceName }} </span><br/>
					<span class="font-size-nano">
						{{ getTraitNiceName(peopleMandatorySkills) }},
						{{ getTraitNiceName(peopleChosenSkills) }}
					</span>
				</div>
			</div>
		</div>

		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.upbringing }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ upbringingNiceName }} </span><br/>
					<span class="font-size-nano">
						{{ getTraitNiceName(upbringingChosenSkills1) }},
						{{ getTraitNiceName(upbringingChosenSkills2) }}
					</span>
				</div>
			</div>
		</div>

		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.profession }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="bold">{{ professionNiceName }} </span><br/>
					<span class="font-size-nano">
						{{ getTraitNiceName(professionChosenSkills1) }},
						{{ getTraitNiceName(professionChosenSkills2) }}
					</span>
				</div>
			</div>
		</div>

		<div v-if="characterStore.sheet.metadata.description" class="flex">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				Beskrivning:
			</div>
			<div class="card font-size-tiny margin-top-tiny medium width-whole padding-top-nano padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="font-size-nano">{{ characterStore.sheet.metadata.description.trimStart() }}</span>
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

			const characterName = ref('')

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
				characterName,

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

				this.characterName = state.metadata.name

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
		text-align:center;
		padding-top: 3px;
	}
</style>
