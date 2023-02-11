import { allTraits, canChooseTrait, allTraitListKeys } from './characteristics/traits'
import { attributes, baseValue as attributeBaseValue, canChooseAttribute } from './characteristics/attributes'
import { baseValue as movementBaseValue } from './characteristics/secondaryCharacteristics/movement'
import { baseValue as actionPointBaseValue } from './characteristics/secondaryCharacteristics/actionPoints'
import { baseValue as carryingCapacityBaseValue } from './characteristics/secondaryCharacteristics/carryingCapacity'
import { baseValue as competenceBaseValue } from './characteristics/competence'
import { baseValue as fateBaseValue } from './characteristics/fate'
import { containsKey } from './utils'
import { calculateMaxHealthValue, createHealth } from './characteristics/secondaryCharacteristics/health'
import { calculateCarryingCapacity } from './characteristics/secondaryCharacteristics/carryingCapacity'
import { calculateInitiative } from './characteristics/secondaryCharacteristics/initiative'
import { calculatePower } from './characteristics/secondaryCharacteristics/power'
import { calculateMaxActionPoints } from './characteristics/secondaryCharacteristics/actionPoints'

const flattenCharacter = (databaseCharacter, targetLevel) => {
	let characterTraitList = []

	let baseCharacterSheet = {
		metadata: Object.assign({}, databaseCharacter.metadata), // P R O K Z Y K I L L A H
		state: Object.assign({}, databaseCharacter.state), // P R O K Z Y K I L L A H
		attributes: {
			battle: attributeBaseValue,
			agility: attributeBaseValue,
			spirit: attributeBaseValue,
			knowledge: attributeBaseValue,
			physique: attributeBaseValue
		},
		traits: [],
		power: {
			offensive: 0,
			defensive: 0
		},
		movement: movementBaseValue,
		carryingCapacity: carryingCapacityBaseValue,
		maxHealthValue: 0,
		health: {},
		fate: fateBaseValue,
		competence: competenceBaseValue,
		initiative: {},
		actionPoints: actionPointBaseValue
	}
	baseCharacterSheet.metadata.selectedLevel = targetLevel

	// one-index because level starts at one
	for (let levelIndex = 1; levelIndex <= targetLevel; levelIndex++) {
		if (databaseCharacter.history[levelIndex]=== undefined) { break }
		const currentLevel = databaseCharacter.history[levelIndex]
		const bonusType = currentLevel.bonusType
		const chosenBonus = currentLevel.choice
		const traitList = allTraits()
		const allTraitKeysList = allTraitListKeys()

		// ADD COMPETENCE & FATE
		if (bonusType === 'competence') {
			baseCharacterSheet.competence ++
			if (databaseCharacter.metadata.isChosenByFate) {
				baseCharacterSheet.fate += 3
			}
		}

		// ADD ATTRIBUTES
		for (const attribute in attributes) {
			if (attribute === chosenBonus) {
				baseCharacterSheet.attributes[chosenBonus]++
			}
		}

		// ADD TRAITS
		const oldTraitsList = [...characterTraitList] // make a copy of the old list
		for (const traitKey in traitList) {

			if (traitKey === chosenBonus) {
				let invalidComplexTraitLevel = []

				// complex payload
				if (currentLevel.complexPayload) {
					const levelComplexPayload = currentLevel.complexPayload

					for (const choiceCategory in levelComplexPayload) { // ex. 'people'
						const complexChoicesList = levelComplexPayload[choiceCategory].choices

						for (const choiceGroup in complexChoicesList) { // ex. 1

							for (const choiceKey in complexChoicesList[choiceGroup]) { // ex. 'KnowledgeDavandBasic'
								const characteristicChoiceKey = complexChoicesList[choiceGroup][choiceKey]

								// if trait
								if (containsKey(characteristicChoiceKey, allTraitKeysList)) {

									// if any of the traits in the complexPayload are already owned, traitKey is invalid
									if (containsKey(characteristicChoiceKey, characterTraitList)) {
										invalidComplexTraitLevel.push(traitKey)
										invalidComplexTraitLevel.push(characteristicChoiceKey)
									}

									if (characteristicChoiceKey && characteristicChoiceKey.length > 0 && !containsKey(characteristicChoiceKey, characterTraitList)) {

										// validate skill in complexPayload
										if (bonusType === 'talent' && traitKey !== 'background' && !canChooseTrait(
											characteristicChoiceKey,
											characterTraitList, 
											baseCharacterSheet.attributes, 
											baseCharacterSheet.metadata.isChosenByFate, 
											levelIndex
										)) {
											// if there are any errors, push to invalidComplexTraitLevel
											if (!containsKey(characteristicChoiceKey, invalidComplexTraitLevel)) invalidComplexTraitLevel.push(characteristicChoiceKey)
										}
										characterTraitList.push(characteristicChoiceKey)
									}
								} else { // if not trait

									baseCharacterSheet.attributes[characteristicChoiceKey]++
									if (!canChooseAttribute(baseCharacterSheet.attributes[characteristicChoiceKey] - 1, levelIndex)) {
										// add invalid attribute choices to invalidLevels
										invalidComplexTraitLevel.push(characteristicChoiceKey)
									}

								}
							}
						}
					}

					// if there are invalid skill choices in complexPayload, push complex talent to invalidComplexTraitLevel
					if (invalidComplexTraitLevel.length > 0) invalidComplexTraitLevel.push(traitKey)

					// validate complex talent
					if ((!containsKey(traitKey, invalidComplexTraitLevel)) && !canChooseTrait(
						traitKey,
						characterTraitList, 
						baseCharacterSheet.attributes, 
						baseCharacterSheet.metadata.isChosenByFate, 
						targetLevel
					)) { 
						invalidComplexTraitLevel.push(traitKey)
					}

					// if there are any errors, push invalidComplexTraitLevel to invalidlist
					if (invalidComplexTraitLevel.length > 0) {
						baseCharacterSheet.metadata.invalidLevels[levelIndex] = invalidComplexTraitLevel
					}
				}

				characterTraitList.push(traitKey)
			}
		}
		
		// VALIDATE NON-COMPLEX TALENTS
		if (bonusType === 'talent' && !currentLevel.complexPayload && !canChooseTrait(
			chosenBonus, 
			oldTraitsList,
			baseCharacterSheet.attributes, 
			baseCharacterSheet.metadata.isChosenByFate, 
			targetLevel
		)) {
			// add invalid talent choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}

		// VALIDATE SKILLS
		if (bonusType === 'skill' && !canChooseTrait(
			chosenBonus, 
			oldTraitsList, 
			baseCharacterSheet.attributes, 
			baseCharacterSheet.metadata.isChosenByFate, 
			targetLevel
		)) {
			// add invalid skill choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}

		// VALIDATE ATTRIBUTES
		if (bonusType === 'attribute' && !canChooseAttribute(baseCharacterSheet.attributes[chosenBonus] - 1, levelIndex)) {
			// add invalid attribute choices to invalidLevels
			baseCharacterSheet.metadata.invalidLevels[levelIndex] = chosenBonus
		}


		// * * * SECONDARY CHARACTERISTICS * * * //

		// POWER
		baseCharacterSheet.power = calculatePower(characterTraitList)

		// MAX HEALTH VALUE
		baseCharacterSheet.maxHealthValue = calculateMaxHealthValue(
			baseCharacterSheet.attributes.physique,
			characterTraitList
		) // maxHealthValue baseValue is set here

		// HEALTH ( relies on maxHealthValue being set )
		baseCharacterSheet.health = createHealth(
			baseCharacterSheet.maxHealthValue,
			baseCharacterSheet.state.currentStrain
		)

		// CARRYING CAPACITY
		baseCharacterSheet.carryingCapacity = calculateCarryingCapacity(
			baseCharacterSheet.attributes.physique,
			characterTraitList
		)

		// INITIATIVE
		baseCharacterSheet.initiative = calculateInitiative(
			baseCharacterSheet.attributes.battle,
			characterTraitList,
			baseCharacterSheet.metadata.level
		)

		// ACTION POINTS
		baseCharacterSheet.actionPoints = calculateMaxActionPoints(characterTraitList)
	}

	const flattenedCharacter = {
		...baseCharacterSheet,
		traits: characterTraitList
	}

	return flattenedCharacter
}

export {
	flattenCharacter
}