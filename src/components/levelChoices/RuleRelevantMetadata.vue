<template>
	<div>
		<div class="flex card dark padding-tiny">
			
			<div class="width-whole padding-top-nano margin-top-nano">
				<input
					type="checkbox"
					id="is-chosen-by-fate"
					class="margin-small"
					v-model="ChosenByFateIsSelected"
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
				class="margin-left-nano width-fourth"
				@click="setIsChosenByFate()"
			>
				Ändra
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