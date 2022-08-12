<template>
	<div :class="{ closed: isClosed, 'level-ladder': true, flex: true, slideInLeft: true }">
		<div class="levels">
			<Wizard
				squared-tabs
				navigable-tabs
				vertical-tabs
				:custom-tabs="levelTabDataList"
				@change="onChangeCurrentTab"
			>
				<div v-for='level in levelList' :key='level.level'>
					<div v-if="currentTabIndex === level.level">
						{{ level.levelBonus }}
						<div v-if="level.levelBonus === 'skill'">
							<SkillLevel :characterSheet="tempCharacterSheet" :selectedLevel="currentTabIndex"  />
						</div>
					</div>
				</div>
			</Wizard>
		</div>
		<div class="drawer-handle" @click='toggleFoldOut'></div>
	</div>
</template>

<script>

	import { ref } from "vue";
	import experienceTableMaker from '../rules/experienceTableMaker.js'
	import Level from './Level.vue'
	import { useStore } from '../stores/character'
	import Wizard from 'form-wizard-vue3'
	import SkillLevel from '../components/levelChoices/SkillLevel.vue'
	import { flattenCharacter } from '../utilities/characterFlattener'

	export default {
		components: {
			Level,
			Wizard,
			SkillLevel
		},
		setup() {
			const character = useStore()
			const characterHistory = character.getHistory
			const levelHistoryList = characterHistory.history
			const currentLevel = character.getLevel
			const fullExperienceTable = experienceTableMaker(31) // HÅRDKODAT
			const currentExperienceTable = experienceTableMaker(currentLevel)

			let isClosed = ref(true)
			let currentTabIndex = ref(0)
			const toggleFoldOut = function(_event) {
				isClosed.value = !isClosed.value
			}

			let tempCharacterSheet
			const onChangeCurrentTab = function(index) {
				currentTabIndex.value = index + 1
				tempCharacterSheet = flattenCharacter(characterHistory, currentTabIndex.value)
				console.log('tempCharacterSheet: ', tempCharacterSheet);
			}

			let levelList = []
			let levelTabDataList = []
			for (let i = 0; i < fullExperienceTable.length; i++) {
				const levelIndex = i + 1 // fullExperienceTable is 0-indexed, characterHistory is 1-indexed
				const hasChosen = levelHistoryList[levelIndex] !== undefined
				let choice = ''
				if (hasChosen) { choice = levelHistoryList[levelIndex].choice }
				const level = {
					level: levelIndex,
					levelBonus: fullExperienceTable[i], // fullExperienceTable is 0-indexed
					hasChosen: hasChosen,
					choice: choice
				}
				let levelTabData = level.levelBonus
				if (level.hasChosen) { levelTabData = level.levelBonus + ': ' + level.choice }
				levelTabDataList.push({ title: levelTabData })
				levelList.push(level)
			}

			return {
				Wizard,
				tempCharacterSheet,
				currentExperienceTable,
				fullExperienceTable,
				characterHistory,
				levelList,
				isClosed,
				levelTabDataList,
				currentTabIndex,
				toggleFoldOut,
				onChangeCurrentTab
			}
		},
	}
</script>

<style lang="scss">
	@import '../style/themes/_variables-warm.scss';
	@import '../assets/wizard/form-wizard-vue3.scss';

	.level-ladder {
		position: absolute;
		top: 0;
		left: 0;
		height: fit-content;
		min-height: 100vh;
		max-width: 100vw;
		min-width: 100vw;
		width: 100vw;
		overflow: scroll;
		background-color: $background-brightness-low;
	}
	.levels {
		height: 100%;
		max-width: calc(100vw - 5rem);
		min-width: calc(100vw - 5rem);
		width: calc(100vw - 5rem);
	}
	.drawer-handle {
		width: 5rem;
		min-height: 100vh;
		max-height: fit-content;
		background-color: rgba(0, 0, 0, 0.185);
	}
	.closed {
		margin-left: calc(-100vw + 5rem);
		height: 100vh;
		overflow: hidden;
	}
</style>
