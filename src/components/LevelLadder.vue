<template>

	<div v-for="level in levelArray" :key="level.level">
		<Level
			:level="level.level"
			:levelBonus="level.levelBonus"
			:hasChosen="level.hasChosen"
			:choice="level.choice"
		/>
	</div>
</template>

<script>
	import experienceTableMaker from '../rules/experienceTableMaker.js'
	import Level from './Level.vue'
	
	export default {
		props: ['characterHistory'],
		components: {
			Level
		},
		setup(props) {
			const characterHistory = props.characterHistory.history
			const currentLevel = props.characterHistory.metadata.currentLevel
			const fullExperienceTable = experienceTableMaker(31) // HÅRDKODAT
			const currentExperienceTable = experienceTableMaker(currentLevel)

			let levelArray = []
			for (let i = 0; i < fullExperienceTable.length; i++) {
				const levelIndex = i + 1 // fullExperienceTable is 0-indexed, characterHistory is 1-indexed
				
				const hasChosen = characterHistory[levelIndex] !== undefined
				let choice = ""

				if (hasChosen) {
					choice = characterHistory[levelIndex].choice
				} 

				const level = {
					level: levelIndex,
					levelBonus: fullExperienceTable[i], // fullExperienceTable is 0-indexed
					hasChosen: hasChosen,
					choice: choice
				}

				levelArray.push(level)
			}

			return {
				currentExperienceTable,
				fullExperienceTable,
				characterHistory,
				levelArray
			}
		},
	}
</script>

<style></style>