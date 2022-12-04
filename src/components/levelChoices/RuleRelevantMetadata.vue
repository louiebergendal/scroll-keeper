<template>
	<div>

		<div class="flex card margin-small padding-small">
			
			<div class=" width-whole">
				<h3 class="display-inline">Ödesvald:</h3>
				<input
					type="checkbox"
					id="is-chosen-by-fate"
					class="margin-tiny vertical-align-top"
					v-model="ChosenByFateIsSelected"
				/>
				<label
					for="is-chosen-by-fate"
					class="display-inline-block"
				>
					Är ödesvald: {{ characterStore.metadata.isChosenByFate }}
				</label>
			</div>

			<button
				type="submit"
				class="margin-top-tiny margin-left-nano"
				@click="setIsChosenByFate()"
			>
				Submitta!
			</button>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../stores/character'

	export default {
		emits: ['update-tabs'],
		setup(props) {
			const characterStore = useCharacterStore()
			const ChosenByFateIsSelected = ref(characterStore.metadata.isChosenByFate)

			return {
				characterStore,
				ChosenByFateIsSelected,
			}
		},
		methods: {
			setIsChosenByFate() {
				this.characterStore.updateIsChosenByFate(this.ChosenByFateIsSelected)
				this.$emit('update-tabs')
			}
		}
	}
</script>

<style>

</style>