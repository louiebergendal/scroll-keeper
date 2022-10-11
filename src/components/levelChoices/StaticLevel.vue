<template>
    <div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Klicka på knappen för att bli bättre</h3>
		<button :disabled="!levelIsChangable" type="submit" class="margin-top-tiny margin-left-nano" @click="submitNewStaticLevel()">Öka {{ traitToBeIncreased }}</button>
	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue'

	export default {
		props: ['characteristic', 'selectedLevel'],
		setup(props) {
			const character = useCharacterStore()
            const traitToBeIncreased = props.characteristic
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= character.metadata.level + 1)
			
			return {
				character,
                traitToBeIncreased,
				selectedLevel,
				levelIsChangable
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
