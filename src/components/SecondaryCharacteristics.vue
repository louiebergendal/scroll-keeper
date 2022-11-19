<template>
	<div class="fancy padding-top-tiny padding-left-small padding-right-small padding-bottom-small position-relative flex -dir-col">
		<div class="corner -inner-bottom-left-side"></div>
		<div class="corner -inner-top-left-side"></div>
		<div class="width-whole flex">
			<div class="width-half margin-right-tiny">
				<div class="font-size-tiny align-center bold">{{ powerNiceName }}</div>
				<div class="card margin-top-tiny font-size-tiny align-center padding-left-small padding-right-small padding-bottom-tiny medium">
					{{powerTypesNiceNames.offensive}}: {{characterStore.sheet.power.offensive}},
					{{powerTypesNiceNames.defensive}}: {{characterStore.sheet.power.defensive}}
				</div>
			</div>
			<div class="width-half">
				<div class="font-size-tiny align-center bold">{{ actionPointsNiceName }}</div>
				<div class="card margin-top-tiny font-size-tiny align-center padding-left-small padding-right-small padding-bottom-tiny medium">
					{{actionPointsTypesNiceNames.basic}}: {{characterStore.sheet.actionPoints.basic}},
					{{actionPointsTypesNiceNames.quick}}: {{characterStore.sheet.actionPoints.quick}}
				</div>
			</div>
		</div>
		<div class="width-whole flex">
			<div class="width-half margin-right-tiny">
				<div class="font-size-tiny align-center bold">{{ carryingCapacityNiceName }}</div>
				<div class="card margin-top-tiny font-size-tiny align-center padding-left-small padding-right-small padding-bottom-tiny medium">
					{{characterStore.sheet.carryingCapacity / 4}}
				</div>
			</div>
			<div class="width-half">
				<div class="font-size-tiny align-center bold">{{ movementNiceName }}</div>
				<div class="card margin-top-tiny font-size-tiny align-center padding-left-small padding-right-small padding-bottom-tiny medium">
					{{characterStore.sheet.movement}}
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { isTouchedByError } from '../utilities/validators'
	import {
		niceName as powerNiceName,
		typesNiceNames as powerTypesNiceNames 
	} from '../rules/characteristics/secondaryCharacteristics/power'
	import {
		niceName as actionPointsNiceName,
		typesNiceNames as actionPointsTypesNiceNames
	} from '../rules/characteristics/secondaryCharacteristics/actionPoints'
	import { niceName as carryingCapacityNiceName } from '../rules/characteristics/secondaryCharacteristics/carryingCapacity'
	import { niceName as initiativeNiceName } from '../rules/characteristics/secondaryCharacteristics/initiative'
	import { niceName as movementNiceName } from '../rules/characteristics/secondaryCharacteristics/movement'

	export default {
		setup() {
			const characterStore = useCharacterStore()
			console.log(powerNiceName)
			return {
				characterStore,
				powerNiceName,
				powerTypesNiceNames,
				actionPointsNiceName,
				actionPointsTypesNiceNames,
				carryingCapacityNiceName,
				initiativeNiceName,
				movementNiceName
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
