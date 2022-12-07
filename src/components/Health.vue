<template>
	<div class='fancy padding-small align-center position-relative'>
		<div class="corner -inner-top-left-side"></div>
		<div class="corner -inner-bottom-left-side"></div>
		<div class="corner -inner-top-right-side"></div>
		<div class="corner -inner-bottom-right-side"></div>

		<div class='health-wrapper flex'>
			<div class="flex width-whole -dir-col margin-top-small margin-right-small">
				<div v-if="characterStore.sheet.fate" class='flex margin-bottom-small'>
					<div class='health-level-title bold font-size-nano padding-right-small'>{{ fateNiceName }}:</div>
					<div
						v-for='index in characterStore.sheet.fate'
						:key='index'
						class='health-point fate'
					>
					</div>
				</div>
				<div
					v-for='(healthLevel, key, i) in characterStore.sheet.health'
					:key='healthLevel'
					class='flex health-level'
					:class="{
						'no-margin': i >= Object.keys(characterStore.sheet.health).length - 1
					}"
				>
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
			<div class="flex -h-spread width-fourth -dir-col margin-top-small health-button-wrapper">
				<div class="flex -h-spread card background-brightness-medium">
					<div>
						<label for="damage-button-group" class="font-size-tiny padding-left-tiny">Skada</label>
					</div>
					<div>
						<button
							type="submit"
							name="damage-button-group"
							class="-small -no-right-curve -no-left-curve -semi-symbol"
							@click="addStrainToDB(dealDamage)"	
						>
							<span>+</span>
						</button>
						<button
							type="submit"
							name="damage-button-group"
							class="-small -no-left-curve -semi-symbol"
							@click="addStrainToDB(healDamage)"
						>
							<span>-</span>
						</button>
					</div>
				</div>

				<div class="flex -h-spread card background-brightness-medium">
					<div>
						<label for="fatigue-button-group" class="font-size-tiny padding-left-tiny">Utmattning</label>
					</div>
					<div>
						<button
							type="submit"
							name="fatigue-button-group"
							class="-small -no-right-curve -no-left-curve -semi-symbol"
							@click="addStrainToDB(dealFatigue)"
						>
							<span>+</span>
						</button>
						<button
							type="submit"
							name="fatigue-button-group"
							class="-small -no-left-curve -semi-symbol"
							@click="addStrainToDB(healFatigue)"
						>
							<span>-</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { getHealthLevelNiceName } from '../rules/characteristics/secondaryCharacteristics/health'
	import { fateNiceName } from '../rules/characteristics/fate'

	export default {
		setup() {
			const characterStore = useCharacterStore()
			const totalHealth = characterStore.sheet.health

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
	.health-level {
		margin-bottom: 3px;
	}
	.health-level.no-margin {
		margin-bottom: 0;
	}
	.health-point {
		width: 100%;
		height: 1.5rem;
		background-color: rgb(168, 213, 129);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
		border: 1px solid #559c1e;
		border-radius: 5px;
		margin-right: 2px;
	}
	.damage {
		background-color: rgb(218, 114, 95);
		border: 1px solid #9c1e1e;
	}
	.fatigue {
		background-color: rgb(237, 229, 134);
		box-shadow: inset 0 1px 0 rgb(247, 240, 165);
		border: 1px solid #948d54;
	}
	.fate {
		background-color: rgb(149, 178, 198);
		border: 1px solid #58758a;
	}
	.health-button-wrapper {
		width: 100%;
	}
	.health-level-title {
		min-width: 10rem;
		text-align: right;
		margin-top: -0.4rem;
	}
</style>
