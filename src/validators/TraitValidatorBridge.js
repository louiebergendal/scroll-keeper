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
        console.log("-------------------------------------------")
        console.log("LOUIE! ")
        console.log("METADATA.INVALIDLEVELS ÄR PROXY IBLAND")
        console.log("METADATA.SELECTEDLEVEL HAR ETT INKONSEKVENT BETEENDE. FINNS IBLAND, ÄR ALLTID FEL.")
        console.log("BORDE VARA EN LEVEL LÄGRE")

        console.log("INGET FEL PÅ LOGIKEN I VALIDERINGEN")
        console.log("DET ÄR RESPONSIVITETSRELATERAT OCH RELATERAT TILL FEL SELECTEDLEVEL")
        console.log("DU KAN SE PROBLEMET I METADATAN SOM LOGGAS UT")
        console.log("-------------------------------------------")
        this.characterStore = useCharacterStore()
        this.invalidLevels = Object.assign({}, this.characterStore.metadata.invalidLevels)

        this.selectedLevel = selectedLevel - 1
        this.tempLevelChoiceKey = tempLevelChoiceKey
        this.originalLevelChoiceKey = originalLevelChoiceKey

        this.tempCharacterSheet = flattenCharacter(this.characterStore, this.selectedLevel) // -1 to account for current lvling
        console.log("this.tempCharacterSheet metadata (constructor): ", this.tempCharacterSheet.metadata)
    }
    init() {
        this.characterStore.$subscribe((_mutation, state) => {
            this.selectedLevel = Object.assign({}, state.metadata.selectedLevel)
            this.tempCharacterSheet = flattenCharacter(state, this.selectedLevel - 1) // -1 to account for current lvling
            this.tempCharacterSheet.metadata.selectedLevel = this.selectedLevel - 1
            console.log("this.tempCharacterSheet metadata (init): ", this.tempCharacterSheet.metadata)
            this.traits = this.tempCharacterSheet.traits
            this.attributes = this.tempCharacterSheet.attributes
            this.invalidLevels = Object.assign({}, state.metadata.invalidLevels)
            console.log("init in TVB: ", state)
        })
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