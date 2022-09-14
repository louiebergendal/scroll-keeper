<template>
	<div :class="{ closed: isClosed, 'level-ladder': true, flex: true, slideInLeft: true }">
		<div class='levels'>
			<Wizard
				squared-tabs
				navigable-tabs
				vertical-tabs
				:custom-tabs="levelTabDataList"
				@change="onChangeCurrentTab"
			>
				<div v-for="level in levelList" :key="level.level">
					<div v-if="currentTabIndex === level.level">
						{{ level.choiceName }} 
						<div v-if="level.levelBonus === 'skill'">
							<TraitLevel :selectedLevel="currentTabIndex"  :traitType="'skill'" />
						</div>
						<div v-if="level.levelBonus === 'attribute'">
							<AttributeLevel :selectedLevel="currentTabIndex" />
						</div>
						<div v-if="level.levelBonus === 'talent'">
							<TraitLevel :selectedLevel="currentTabIndex" :traitType="'talent'" />
						</div>
						<div v-if="level.levelBonus === 'fate'">
							<StaticLevel :characteristic="'fate'" />
						</div>
						<div v-if="level.levelBonus === 'competence'">
							<StaticLevel :characteristic="'competence'" />
						</div>

					</div>
				</div>
			</Wizard>
		</div>
		<div class="drawer-handle" @click='toggleFoldOut'></div>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import experienceTableMaker from '../rules/experienceTableMaker.js'
	import Level from './Level.vue'
	import { useCharacterStore } from '../stores/character'
	import Wizard from 'form-wizard-vue3'
	import TraitLevel from '../components/levelChoices/TraitLevel.vue'
	import AttributeLevel from '../components/levelChoices/AttributeLevel.vue'
	import StaticLevel from '../components/levelChoices/StaticLevel.vue'
	import { flattenCharacter } from '../utilities/characterFlattener'
	import { getTraitNiceName } from '../rules/characteristics/traits'

	export default {
		components: {
			Level,
			Wizard,
			AttributeLevel,
			TraitLevel,
			StaticLevel
		},
		setup() {
			const character = useCharacterStore()
			const characterHistory = character.history
			const currentLevel = character.metadata.currentLevel
			const fullExperienceTable = experienceTableMaker(31) // HÅRDKODAT
			const currentExperienceTable = experienceTableMaker(currentLevel)

			let isClosed = ref(true)
			let currentTabIndex = ref(0)

			const getChoiceName = function(levelBonus) {
				if (levelBonus === 'skill') return 'Färdighet'
				if (levelBonus === 'attribute') return 'Grundegenskap'
				if (levelBonus === 'talent') return 'Talang'
				if (levelBonus === 'competence') return 'Kompetens'
				if (levelBonus === 'fate') return 'Öde'
			}

			const toggleFoldOut = function(_event) {
				isClosed.value = !isClosed.value
			}

			let tempCharacterSheet
			const onChangeCurrentTab = function(index) {
				currentTabIndex.value = index + 1
				tempCharacterSheet = flattenCharacter(characterHistory, currentTabIndex.value)
			}

			let levelList = []
			let levelTabDataList = []
			for (let i = 0; i < fullExperienceTable.length; i++) {
				const levelIndex = i + 1 // fullExperienceTable is 0-indexed, characterHistory is 1-indexed
				const hasChosen = characterHistory[levelIndex] !== undefined
				let choice = ''
				if (hasChosen) { choice = characterHistory[levelIndex].choice }
				let levelBonus = fullExperienceTable[i] // fullExperienceTable is 0-indexed
				const level = {
					level: levelIndex,
					levelBonus: levelBonus,
					hasChosen: hasChosen,
					choice: choice
				}
				let levelTabData = level.levelBonus
				if (level.hasChosen) { 
					const traitNiceName = getTraitNiceName(level.choice)
					const attributeNiceName = '' //getAttributeNiceName()
					if ((levelBonus === getChoiceName('skill') || levelBonus === getChoiceName('talent')) && traitNiceName ) {
						levelTabData = getChoiceName(levelBonus) + ': ' + traitNiceName
					} else if ((levelBonus === getChoiceName('attribute')) && attributeNiceName) {
						levelTabData = getChoiceName(levelBonus) + ': ' + attributeNiceName
					} else {
						// Fate'n stuff

					}

				} // call getTraitNiceName here!
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

<style lang='scss'>
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
