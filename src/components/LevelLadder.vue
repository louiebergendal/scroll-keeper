<template>
	<div class="level-ladder card dark padding-small width-half">
		<div
			v-for="level in levelArray"
			:key="level.level"
			class="card medium padding-top-nano margin-bottom-tiny"
		>
			<Level
				:level="level.level"
				:levelBonus="level.levelBonus"
				:hasChosen="level.hasChosen"
				:choice="level.choice"
			/>
		</div>
	</div>
  <Drawer />
</template>

<script>
	import experienceTableMaker from '../rules/experienceTableMaker.js'
	import Level from './Level.vue'
  import Drawer from './Drawer.vue'
	import { useStore } from '../stores/character'

	export default {
		components: {
			Level,
      Drawer
		},
		setup() {
			const character = useStore()
			const characterHistory = character.getHistory
			const currentLevel = character.getLevel
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
				levelArray,
				store
			}
		},
	}
</script>

<style>
	.level-ladder {
		position: absolute;
		top: 0;
		max-height: 100vh;
		overflow: scroll;
	}
</style>
