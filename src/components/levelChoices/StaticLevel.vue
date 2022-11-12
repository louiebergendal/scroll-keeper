<template>
    <div class='card square medium padding-large align-center -fill'>

		<h3 class="align-center margin-top-nano margin-bottom-huge">Klicka på knappen för att bli bättre</h3>
		<button
			:disabled="!levelIsChangable"
			type="submit"
			class="margin-top-tiny margin-left-nano"
			@click="submitNewStaticLevel()"
		>
			Öka {{ traitToBeIncreased }}
		</button>

	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue'

	export default {
		props: ['characteristic', 'selectedLevel'],
		setup(props) {
			const characterStore = useCharacterStore()
			const traitToBeIncreased = props.characteristic
			const selectedLevel = props.selectedLevel
			const levelIsChangable = ref(selectedLevel <= characterStore.metadata.level + 1)

			return {
				characterStore,
				traitToBeIncreased,
				selectedLevel,
				levelIsChangable
			}
		},
		methods: {
			submitNewStaticLevel() {
				this.characterStore.submitNewLevelChoice('', this.selectedLevel, this.traitToBeIncreased)
				this.$emit('update-tabs')
			},
		},
	}
</script>


<style></style>
