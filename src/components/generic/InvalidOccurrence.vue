<template>
   <span class="font-size-tiny">
	 	{{ createErrorLevelString() }}
	</span>
</template>

<script>
	import { containsKey } from '../../rules/utils'
	import { ref } from 'vue'
	import { useCharacterStore } from '../../stores/character'

	export default {
		props: ['characteristicProp', 'selectedLevelProp'],
		setup(props) {
			const errorString = ref('')
			const characterStore = useCharacterStore()

			return {
				containsKey,
				characterStore,
				errorString
			}
		},
		methods: {
			createErrorLevelString() {
				const levelErrors = this.getLevelErrors()
				if (levelErrors.errorList.length) {
					if (levelErrors.isTouchedByError) 
						return 'Även fel på nivå: ' + levelErrors.errorList.join(', ')
					return 'Fel på nivå: ' + levelErrors.errorList.join(', ')
				}
			},
			getLevelErrors() {
				const errorList = this.getInvalidOccurrences(this.characteristicProp)
				if (containsKey(this.selectedLevelProp.toString(), errorList)) {
					errorList.splice(errorList.indexOf(this.selectedLevelProp.toString()), 1)
					return { errorList, isTouchedByError: true }
				}
				return { errorList, isTouchedByError: false }
			},
			getInvalidOccurrences(key) {
				let invalidLevels = this.characterStore.metadata.invalidLevels
				let invalidOccurrencesList = []

				for (const invalidLevel in invalidLevels) {
					const invalidLevelBonus = invalidLevels[invalidLevel]

					if (typeof invalidLevelBonus === 'object'
						&& containsKey(key, invalidLevelBonus)
					) {
						invalidOccurrencesList.push(invalidLevel)
					}

					if (typeof invalidLevelBonus === 'string'
						&& invalidLevelBonus === key
					) {
						invalidOccurrencesList.push(invalidLevel)
					}
				}
				
				return invalidOccurrencesList
			}
		}
	}
</script>

<style>

</style>