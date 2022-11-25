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
					<span class="font-size-nano">{{ characterName }} ({{ characterStore.metadata.level }}) </span>
				</div>
			</div>
		</div>

		<!-- people -->
		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.people }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-left-small padding-right-small padding-top-nano padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="font-size-nano">{{ peopleNiceName }} </span><br/>
				</div>
			</div>
		</div>

		<!-- upbringing -->
		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.upbringing }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="font-size-nano">{{ upbringingNiceName }} </span><br/>
				</div>
			</div>
		</div>

		<!-- profession -->
		<div class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				{{ backgroundCategoryNiceNames.profession }}
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="font-size-nano">{{ professionNiceName }} </span><br/>
				</div>
			</div>
		</div>

		<!-- description -->
		<div v-if="characterStore.sheet.metadata.description" class="flex -dir-col">
			<div class="bold align margin-right-small padding-left-small font-size-tiny background-title">
				Beskrivning:
			</div>
			<div class="card align-center margin-top-tiny font-size-tiny medium width-whole padding-top-nano padding-left-small padding-right-small padding-bottom-nano">
				<div class="align padding-bottom-tiny">
					<span class="font-size-nano">{{ characterStore.sheet.metadata.description }}</span>
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
			const characterDescription = ref('')

			const peopleNiceName = ref('')
			const upbringingNiceName = ref('')
			const professionNiceName = ref('')

			return {
				characterStore,
				characterName,
				characterDescription,

				hasComplexPayload,

				peopleNiceName,
				upbringingNiceName,
				professionNiceName,

				getTraitNiceName,
				backgroundCategoryNiceNames,
				background
			}
		},
		beforeMount() {
			this.characterStore.$subscribe((_mutation, state) => {

				this.characterName = state.metadata.name
				this.changeCharacterDescription = state.metadata.description

				const complexPayload = state.history[1].complexPayload

				this.hasComplexPayload = complexPayload.people.key !== ''
				if (this.hasComplexPayload) {
					this.peopleNiceName = background.peoples[complexPayload.people.key].niceName
					this.upbringingNiceName = background.upbringings[complexPayload.upbringing.key].niceName
					this.professionNiceName = background.professions[complexPayload.profession.key].niceName
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
