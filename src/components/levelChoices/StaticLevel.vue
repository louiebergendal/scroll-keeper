<template>
    <div class='card square medium padding-large align-center -fill'>

		<div class='card light padding-medium width-whole center'>
			<h3 class="align-center margin-top-nano margin-bottom-huge">Öka en sekundär egenskap</h3>
			<button
				type="submit"
				class="margin-top-tiny margin-left-nano"
				@click="submitNewStaticLevel()"
			>
				Öka {{ getStaticCharacteristicNiceName(traitToBeIncreased) }} och Uppdatera
			</button>
		</div>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'

	export default {
		props: ['characteristicProp', 'selectedLevelProp'],
		setup(props) {
			const characterStore = useCharacterStore()
			const traitToBeIncreased = props.characteristicProp
			const selectedLevel = props.selectedLevelProp

			return {
				characterStore,
				traitToBeIncreased,
				selectedLevel,
				
			}
		},
		methods: {
			submitNewStaticLevel() {
				this.characterStore.submitNewLevelChoice('', this.selectedLevel, this.traitToBeIncreased)
				this.$emit('update-tabs')
			},
			getStaticCharacteristicNiceName(characteristicKey) {
				if (characteristicKey === 'competence') return 'Erfarenhetsbonus'
				if (characteristicKey === 'fate') return 'Öde'
			}
		},
	}
</script>


<style></style>
