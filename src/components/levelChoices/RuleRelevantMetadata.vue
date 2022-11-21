<template>
	<div>

		<div class="flex card margin-small padding-small">

			<h3>Ödesvald:</h3>
			<div class="flex card margin-small padding-small width-whole">
				<input
					type="checkbox"
					id="is-chosen-by-fate"
					class="margin-tiny vertical-align-top radio-margins"
					v-model="isChosenByFate"
				/>
				<label
					for="is-chosen-by-fate"
					class="display-inline-block text-margins"
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