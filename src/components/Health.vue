<template>
	<div class='card dark padding-right-small padding-top-tiny padding-left-small padding-bottom-small align-center'>

		<h3 class='health margin-top-nano align-center'>Hälsa ({{characterStore.sheet.health.well.max}})</h3>

		<div class="flex">
			<div class="health-level-title"></div>
			<div class="flex margin-bottom-tiny health-button-wrapper">
				<button type="submit" class="health-button margin-right-tiny margin-bottom-tiny -small" @click="addStrainToDB(dealDamage)">Tag 1 Skada</button>
				<button type="submit" class="health-button margin-right-tiny margin-bottom-tiny -small" @click="addStrainToDB(dealFatigue)">Tag 1 Utmattning</button>
				<button type="submit" class="health-button margin-right-tiny margin-bottom-tiny -small" @click="addStrainToDB(healDamage)">Läk 1 Skada</button>
				<button type="submit" class="health-button margin-bottom-tiny -small" @click="addStrainToDB(healFatigue)">Läk 1 Utmattning</button>
			</div>
		</div>

		<div class='health-wrapper card medium padding-top-small padding-bottom-tiny padding-right-small flex'>
				<div v-if="characterStore.sheet.fate" class='flex'>
					<div class='health-level-title bold font-size-nano padding-right-small'>{{ fateNiceName }}:</div>
					<div
						v-for='index in characterStore.sheet.fate'
						:key='index'
						class='health-point fate margin-bottom-small'
					>
				</div>
			</div>
			<div v-for='healthLevel in characterStore.sheet.health' :key='healthLevel' class='flex'>
				<div class='health-level-title bold font-size-nano padding-right-small'>{{ getHealthLevelNiceName(healthLevel._frontend_key) }}:</div>
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
			const characterStore = useCharacterStore()
			const totalHealth = characterStore.sheet.health
			
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

			for (let healthLevel in totalHealth) {
				totalHealth[healthLevel]._frontend_title = healthLevel
				totalHealth[healthLevel]._frontend_remainder = 0
				totalHealth[healthLevel]._frontend_remainder =
				totalHealth[healthLevel].max - (totalHealth[healthLevel].currentStrain.damage + totalHealth[healthLevel].currentStrain.fatigue)
			}

			return {
				characterStore,
				dealDamage,
				dealFatigue,
				healDamage,
				healFatigue,
				fateNiceName,
				getHealthLevelNiceName,
			}
		},

		methods: {
			addStrainToDB(strain) {
				let currentDamage = this.characterStore.state.currentStrain.damage
				let currentFatigue = this.characterStore.state.currentStrain.fatigue

				if (currentDamage < 0) { currentDamage = 0 }
				if (currentFatigue < 0) { currentFatigue = 0 }

				const newStrain = {
					damage: currentDamage += strain.damage,
					fatigue: currentFatigue += strain.fatigue
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
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
		border: 1px solid #559c1e;
		border-radius: 5px;
		margin-right: 2px;
		margin-bottom: 3px;
	}
	.damage {
		background-color: rgb(218, 114, 95);
		border: 1px solid #9c1e1e;
	}
	.fatigue {
		background-color: rgb(255 242 96);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
		border: 1px solid #b7a312;
	}
	.fate {
		background-color: rgb(149, 178, 198);
		border: 1px solid #58758a;
	}
	.health-button-wrapper {
		width: 100%;
	}
	.health-button {
		width: 100%;
	}
	.health-level-title {
		min-width: 10rem;
		text-align: right;
		margin-top: -0.4rem;
	}
</style>
