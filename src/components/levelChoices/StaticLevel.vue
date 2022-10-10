<template>
    <div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Klicka på knappen för att bli bättre</h3>
		<button type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewStaticLevel()">Öka {{ traitToBeIncreased }}</button>
	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'

	export default {
		props: ['characteristic', 'selectedLevel'],
		setup(props) {
			const character = useCharacterStore()
            const traitToBeIncreased = props.characteristic
			const selectedLevel = props.selectedLevel
			
			return {
				character,
                traitToBeIncreased,
				selectedLevel
			}
		},
		methods: {
			submitNewStaticLevel() {
				this.character.submitNewLevelChoice('', this.selectedLevel, this.traitToBeIncreased)
				this.$emit('update-tabs')
			},
		},
	}
</script>


<style></style>
