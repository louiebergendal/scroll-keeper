<template>
	<div class='card dark padding-right-small padding-top-tiny padding-left-small padding-bottom-small align-center'>
		<h3 class='health margin-top-nano align-center'>Hälsa</h3>
		<div class='health-wrapper flex'>
			<div>{{character.sheet.health.well.max}}</div>
			<div v-if="character.sheet.fate" class='flex'>
				<div class='health-level-title padding-right-tiny'>fate</div>
				<div
					v-for='index in character.sheet.fate'
					:key='index'
					class='health-point fate margin-bottom-small'
				>
			</div>
			</div>
			<div v-for='healthLevel in character.sheet.health' :key='healthLevel' class='health-level-wrapper flex'>
				<div class='health-level-title padding-right-tiny'>{{ healthLevel._frontend_title }}</div>
				<div
					v-for='index in healthLevel.currentStrain.damage'
					:key='"damage-" + index'
					class='health-point damage'
				>
				</div>
				<div
					v-for='index in healthLevel.currentStrain.fatigue'
					:key='"fatigue-" + index'
					class='health-point fatigue'
				>
				</div>
				<div
					v-for='index in healthLevel._frontend_remainder'
					:key='"health-" + index'
					class='health-point'
				>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'

	export default {
		setup() {
			let character = useCharacterStore()

			for (let healthLevel in character.sheet.health) {
				character.sheet.health[healthLevel]._frontend_title = healthLevel
				character.sheet.health[healthLevel]._frontend_remainder = 0
				character.sheet.health[healthLevel]._frontend_remainder =
					character.sheet.health[healthLevel].max - (character.sheet.health[healthLevel].currentStrain.damage + character.sheet.health[healthLevel].currentStrain.fatigue)
			}

			return {
				character
			}
		}
	}
</script>

<style>
	.health-wrapper {
		flex-direction: column
		
	}
	.health-point {
		width: 100%;
		height: 1.5rem;
		background-color: rgb(152, 204, 107);
		border: 1px solid #559c1e;
		border-radius: 5px;
		margin-right: 5px;
		margin-bottom: 1px;
	}
	.damage {
		background-color: rgb(218, 114, 95);
		border: 1px solid #9c1e1e;
	}
	.fatigue {
		background-color: rgb(218, 208, 95);
		border: 1px solid #a7884b;
	}
	.fate {
		background-color: rgb(149, 178, 198);
		border: 1px solid #58758a;
	}
	.health-level-title {
		min-width: 10rem;
		text-align: right;
		margin-top: -0.30rem;
	}
</style>