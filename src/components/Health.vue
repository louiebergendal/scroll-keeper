<template>
	<div class='card dark padding-right-small padding-top-tiny padding-left-small padding-bottom-small align-center'>
		<h3 class='health margin-top-nano align-center'>Hälsa ({{characterStore.sheet.health.well.max}})</h3>

		<button type="submit" class="margin-tiny" @click="addStrainToDB(dealDamage)">Ta 1 Skada</button>
		<button type="submit" class="margin-tiny" @click="addStrainToDB(dealFatigue)">Ta 1 Utmattning</button>
		<button type="submit" class="margin-tiny" @click="addStrainToDB(healDamage)">Hela 1 Skada</button>
		<button type="submit" class="margin-tiny" @click="addStrainToDB(healFatigue)">Hela 1 Utmattning</button>

		<div class='health-wrapper flex'>
			<div></div>
			<div v-if="characterStore.sheet.fate" class='flex'>
				<div class='health-level-title padding-right-tiny'>{{ fateNiceName }}</div>
				<div
					v-for='index in characterStore.sheet.fate'
					:key='index'
					class='health-point fate margin-bottom-small'
				>
			</div>
			</div>
			<div v-for='healthLevel in characterStore.sheet.health' :key='healthLevel' class='health-level-wrapper flex'>
				<div class='health-level-title padding-right-tiny'>{{ getHealthLevelNiceName(healthLevel._frontend_key) }}</div>
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
	import { getHealthLevelNiceName } from '../rules/characteristics/secondaryCharacteristics/health'
	import { fateNiceName } from '../rules/characteristics/fate'
	//import { dealStrain } from '../rules/strain'

	export default {
		setup() {
			let characterStore = useCharacterStore()

			// inför "maxFate" och "currentFate"

			const dealDamage = {
				damage: 1,
				fatigue: 0
			}
			const dealFatigue = {
				damage: 0,
				fatigue: 1
			}
			const healDamage = {
				damage: -1,
				fatigue: 0
			}
			const healFatigue = {
				damage: 0,
				fatigue: -1
			}

			for (let healthLevel in characterStore.sheet.health) {
				characterStore.sheet.health[healthLevel]._frontend_title = healthLevel
				characterStore.sheet.health[healthLevel]._frontend_remainder = 0
				characterStore.sheet.health[healthLevel]._frontend_remainder =
				characterStore.sheet.health[healthLevel].max - (characterStore.sheet.health[healthLevel].currentStrain.damage + characterStore.sheet.health[healthLevel].currentStrain.fatigue)
			}

			return {
				characterStore,
				dealDamage,
				dealFatigue,
				healDamage,
				healFatigue,
				fateNiceName,
				getHealthLevelNiceName
			}
		},
		methods: {
			addStrainToDB(strain) {

				if (this.characterStore.state.currentStrain.damage < 0) { this.characterStore.state.currentStrain.damage = 0 }
				if (this.characterStore.state.currentStrain.fatigue < 0) { this.characterStore.state.currentStrain.fatigue = 0 }

				const newStrain = {
					damage: this.characterStore.state.currentStrain.damage += strain.damage,
					fatigue: this.characterStore.state.currentStrain.fatigue += strain.fatigue
				}
				if (newStrain.damage < 0) { newStrain.damage = 0 }
				if (newStrain.fatigue < 0) { newStrain.fatigue = 0 }

				const refString = this.characterStore.metadata.characterRefString + '/state/currentStrain'
				this.characterStore.updateCharacterField(refString, newStrain)
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