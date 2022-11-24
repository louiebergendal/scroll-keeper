<template>
   <span class="font-size-tiny">
	 	{{createErrorLevelString()}}
	</span>
</template>

<script>
	import { containsKey } from '../../rules/utils'
	import { ref } from 'vue'

	export default {
		props: ['characteristic', 'characterStore', 'selectedLevel'],
		setup(props) {
			const errorString = ref('')
			return {
				containsKey,
				errorString
			}
		},
		watch: {
			characterStore: {
				handler(newVal) {
					this.errorString = this.createErrorLevelString()
				},
				immediate: true
			},
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
				const errorList = this.getInvalidOccurrences(this.characteristic)
				if (containsKey(this.selectedLevel.toString(), errorList)) {
					errorList.splice(errorList.indexOf(this.selectedLevel.toString()), 1)
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