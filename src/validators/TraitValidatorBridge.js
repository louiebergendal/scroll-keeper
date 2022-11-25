import {
    canChooseTrait,
    getFailedRequirements
} from '../rules/characteristics/traits'
import { invalidChoiceIsNotDeselected, isInvalidAtThisLevel, isTouchedByError } from './validators'
import { containsKey } from '../rules/utils'
import { useCharacterStore } from '../stores/character'


export default class TraitValidatorBridge {
    constructor (
        traits,
        attributes,
        selectedLevel,
        invalidLevels,
        tempLevelChoiceKey,
        tempCharacterSheet,
        originalLevelChoiceKey,
    ) {
        this.characterStore = useCharacterStore()
        this.localCharacterStore = {}

        this.characterStore.$subscribe((_mutation, state)=> {
            this.localCharacterStore = Object.assign({}, state)
        })

        this.traits = traits
        this.attributes = attributes
        this.selectedLevel = selectedLevel
        this.invalidLevels = invalidLevels
        this.tempLevelChoiceKey = tempLevelChoiceKey
        this.tempCharacterSheet = tempCharacterSheet
        this.originalLevelChoiceKey = originalLevelChoiceKey
    }

    update(
        traits,
        attributes,
        selectedLevel,
        invalidLevels,
        tempLevelChoiceKey,
        tempCharacterSheet,
        originalLevelChoiceKey,
    ) {
        this.traits = traits
        this.attributes = attributes
        this.selectedLevel = selectedLevel
        this.invalidLevels = invalidLevels
        this.tempLevelChoiceKey = tempLevelChoiceKey
        this.tempCharacterSheet = tempCharacterSheet
        this.originalLevelChoiceKey = originalLevelChoiceKey
    }
    traitIsChecked(scholarSkillKey, checkedOptionsList) {
        return containsKey(scholarSkillKey, checkedOptionsList)
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