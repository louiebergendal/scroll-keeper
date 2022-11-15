<template>
    <div class='card square medium padding-large align-center -fill'>

		<div class='card light padding-medium width-half center'>
			<h3 class="align-center margin-top-nano margin-bottom-huge">Klicka på knappen för att bli bättre</h3>
			<button
				type="submit"
				class="margin-top-tiny margin-left-nano"
				@click="submitNewStaticLevel()"
			>
				Öka {{ getStaticCharacteristicNiceName(traitToBeIncreased) }}
			</button>
		</div>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'

	export default {
		props: ['characteristic', 'selectedLevel'],
		setup(props) {
			const characterStore = useCharacterStore()
			const traitToBeIncreased = props.characteristic
			const selectedLevel = props.selectedLevel

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
				if (characteristicKey === 'competence') return 'erfarenhetsbonus'
				if (characteristicKey === 'fate') return 'öde'
			}
		},
	}
</script>


<style></style>
