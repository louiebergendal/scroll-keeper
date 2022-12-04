import {
	canChooseTrait,
	getFailedRequirements
} from '../rules/characteristics/traits'
import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from './validators'
import { containsKey } from '../rules/utils'
import { useCharacterStore } from '../stores/character'
import { flattenCharacter } from '../utilities/characterFlattener'


export default class TraitValidatorBridge {
	constructor (
		selectedLevel,
		tempLevelChoiceKey,
		originalLevelChoiceKey,
	) {
		this.characterStore = useCharacterStore()
		this.invalidLevels = Object.assign({}, this.characterStore.metadata.invalidLevels)

		this.selectedLevel = selectedLevel

		this.tempLevelChoiceKey = tempLevelChoiceKey
		this.originalLevelChoiceKey = originalLevelChoiceKey

		this.tempCharacterSheet = flattenCharacter(this.characterStore, this.selectedLevel - 1) // -1 to account for current lvling

	}
	init() {
		this.characterStore.$subscribe((_mutation, state) => {
			this.selectedLevel = state.metadata.selectedLevel

			this.tempCharacterSheet = flattenCharacter(state, this.selectedLevel - 1) // -1 to account for current lvling
			this.tempCharacterSheet.metadata.selectedLevel = this.selectedLevel - 1
			
			this.traits = this.tempCharacterSheet.traits
			this.attributes = this.tempCharacterSheet.attributes
			this.invalidLevels = Object.assign({}, state.metadata.invalidLevels)
		})
	}
	traitIsOwned(traitKey){
		return containsKey(traitKey, this.tempCharacterSheet.traits)
	}
	traitIsSelected(traitKey){
		return traitKey === this.tempLevelChoiceKey
	}
	invalidTraitChoiceIsNotDeselected(traitKey) {
		return invalidChoiceIsNotDeselected(
			traitKey,
			this.invalidLevels,
			this.originalLevelChoiceKey,
			this.tempLevelChoiceKey
		)
	}
	traitIsTouchedByError(traitKey) {
		return (isTouchedByError(
			traitKey,
			this.invalidLevels
			) || (this.traitIsSelected(traitKey) && this.traitIsOwned(traitKey))
		)
	}
	traitIsInvalidAtThisLevel(traitKey) {
		return isInvalidAtThisLevel(
			traitKey,
			this.invalidLevels,
			this.selectedLevel
		)
	}
	cannotChooseTrait(traitKey) {
		return !canChooseTrait(
			traitKey,
			this.tempCharacterSheet.traits,
			this.tempCharacterSheet.attributes,
			this.tempCharacterSheet.metadata.isChosenByFate,
			this.selectedLevel
		)
	}
	getFailedTraitRequirements(traitKey) {
		const failedRequirements = getFailedRequirements(
			traitKey,
			this.tempCharacterSheet.traits,
			this.tempCharacterSheet.attributes,
			this.tempCharacterSheet.metadata.isChosenByFate,
			this.selectedLevel
		)
		return failedRequirements
	}

}