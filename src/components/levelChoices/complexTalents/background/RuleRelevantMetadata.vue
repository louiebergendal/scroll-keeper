<template>
	<div>
		<div
			:class="{
				'selected': chosenByFateIsSelected
			}"
			class="flex card light padding-top-small padding-bottom-small padding-left-tiny padding-right-small">
			
			<div class="width-whole padding-top-nano margin-top-nano">
				<input
					type="checkbox"
					id="is-chosen-by-fate"
					class="margin-small"
					v-model="chosenByFateIsSelected"
				/>
				<label
					for="is-chosen-by-fate"
					class="display-inline-block margin-top-tiny"
				>
					Ödesvald
				</label>
			</div>

			<button
				type="submit"
				class="margin-left-nano width-third"
				@click="setIsChosenByFate()"
			>
				Uppdatera
			</button>

		</div>

	</div>
</template>

<script>
	import { ref } from 'vue'
	import { useCharacterStore } from '../../../../stores/character'

	export default {
		emits: ['update-tabs'],
		setup(props) {
			const characterStore = useCharacterStore()
			const chosenByFateIsSelected = ref(characterStore.metadata.isChosenByFate)

			return {
				characterStore,
				chosenByFateIsSelected,
			}
		},
		methods: {
			setIsChosenByFate() {
				this.characterStore.updateIsChosenByFate(this.chosenByFateIsSelected)
				this.$emit('update-tabs')
			}
		}
	}
</script>

<style>

</style>