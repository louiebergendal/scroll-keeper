<template>
	<div>

		<div class="flex card margin-small padding-small">
			
			<div class=" width-whole">
				<h3 class="display-inline">Ödesvald:</h3>
				<input
					type="checkbox"
					id="is-chosen-by-fate"
					class="margin-tiny vertical-align-top"
					v-model="isChosenByFate"
				/>
				<label
					for="is-chosen-by-fate"
					class="display-inline-block"
				>
					Är ödesvald: {{ isChosenByFate }}
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

	export default {
		props: ['characterStore'],
		emits: ['update-tabs'],
		setup(props) {
			const characterStore = props.characterStore
			const isChosenByFate = ref(characterStore.metadata.isChosenByFate)

			return {
				characterStore,
				isChosenByFate,
			}
		},
		methods: {
			setIsChosenByFate() {
				this.characterStore.updateIsChosenByFate(this.isChosenByFate)
				this.$emit('update-tabs')
			}
		}
	}
</script>

<style>

</style>