<template>
	<div class='competence fancy padding-right-tiny padding-left-tiny margin-bottom-nano flex position-relative'>
		<div class="corner -inner-top-left-side"></div>
		<div class="corner -inner-bottom-left-side"></div>
		<div class='width-whole flex margin-bottom-nano'>
			<div class='padding-nano width-half align-center trait-card-align'>
				<span class='font-size-tiny trait-card-align bold'>Erfarenhetsbonus</span>
			</div>
			<div class='attribute-value padding-left-tiny padding-nano margin-left-tiny align-center width-half'>
				<span class='font-size-tiny attribute-value-align bold'> {{ characterStore.sheet.competence }} </span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'

	export default {
		setup() {
			const characterStore = useCharacterStore()

			return {
				characterStore
			}
		}
	}
</script>

<style>
	.competence {
		flex-direction: column;
	}
	.skill-value {
		justify-content: space-between;
	}
	.vertical-correction {
		vertical-align: text-bottom;
	}
</style>
