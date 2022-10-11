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
					<div v-if="currentTabIndex === level.level" >
						<div v-if="level.levelBonus === 'skill'">
							<TraitLevel :selectedLevel="currentTabIndex" :traitType="'skill'" @update-tabs="updateLevelTabData" />
						</div>
						<div v-if="level.levelBonus === 'attribute'">
							<AttributeLevel :selectedLevel="currentTabIndex" @update-tabs="updateLevelTabData" />
						</div>
						<div v-if="level.levelBonus === 'talent'">
							<TraitLevel :selectedLevel="currentTabIndex" :traitType="'talent'" @update-tabs="updateLevelTabData" />
						</div>
						<div v-if="level.levelBonus === 'fate'">
							<StaticLevel :selectedLevel="currentTabIndex" :characteristic="'fate'" @update-tabs="updateLevelTabData"/>
						</div>
						<div v-if="level.levelBonus === 'competence'">
							<StaticLevel :selectedLevel="currentTabIndex" :characteristic="'competence'" @update-tabs="updateLevelTabData"/>
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
	import { useCharacterStore } from '../stores/character'
	import Wizard from 'form-wizard-vue3'
	import TraitLevel from '../components/levelChoices/TraitLevel.vue'
	import AttributeLevel from '../components/levelChoices/AttributeLevel.vue'
	import StaticLevel from '../components/levelChoices/StaticLevel.vue'
	import { getTraitNiceName } from '../rules/characteristics/traits'	
	import { getAttributeLongName } from '../rules/characteristics/attributes'
	import { contains } from '../rules/utils'
	import { getLevelBonusNiceName } from '../rules/level'

	export default {
		components: {
			Wizard,
			AttributeLevel,
			TraitLevel,
			StaticLevel
		},
		setup() {
			const character = useCharacterStore()
			const experienceTable = ref(experienceTableMaker(character.metadata.level + 1)) // HÅRDKODAT
			const isClosed = ref(true)
			const currentTabIndex = ref(0)
			const levelTabDataList = ref([])
			const levelList = ref([])

			return {
				Wizard,
				experienceTable,
				character,
				levelList,
				isClosed,
				levelTabDataList,
				currentTabIndex
			}
		},
		mounted() {
			this.updateLevelTabData()
		},
		updated() {
			this.updateLevelTabData()
		},
		methods: {
			updateLevelTabData() {
				this.experienceTable = experienceTableMaker(this.character.metadata.level + 1)
				this.levelTabDataList.length = 0
				this.levelList.length = 0

				for (let i = 0; i < this.experienceTable.length; i++) {
					const levelIndex = i + 1 // experienceTable is 0-indexed, characterHistory is 1-indexed
					let choice = ''
					if (this.character.history[levelIndex] !== undefined){
						choice = this.character.history[levelIndex].choice
					}
					let levelBonus = this.experienceTable[i] // experienceTable is 0-indexed
					const level = {
						level: levelIndex,
						levelBonus: levelBonus,
						hasChosen: this.character.history[levelIndex] !== undefined,
						choice: choice
					}

					let levelTabData = levelBonus
					let niceName = ''
					if (this.character.history[levelIndex] !== undefined) {
						if (levelBonus === 'skill' || levelBonus === 'talent') {
							niceName = getTraitNiceName(choice)
							levelTabData = getLevelBonusNiceName(levelBonus) + ': ' + niceName
						} else if (levelBonus === 'attribute') {
							niceName = getAttributeLongName(choice)
							levelTabData = getLevelBonusNiceName(levelBonus) + ': ' + niceName
						} else {
							// Fate'n stuff
							levelTabData = getLevelBonusNiceName(levelBonus)
						}
					}

					const containsInvalidChoice = contains(Object.keys(this.character.metadata.invalidLevels), levelIndex.toString())
					const appendedInvalidMarker = containsInvalidChoice ? 'invalidStep' : ''
					this.levelTabDataList.push({ title: levelTabData, id: levelIndex + '-' + appendedInvalidMarker})
					this.levelList.push(level)
				}
			},
			toggleFoldOut(_event) {
				this.isClosed = !this.isClosed	
			},
			onChangeCurrentTab(index) {
				this.currentTabIndex = index + 1
			}
		}
	}

	// 	for (let i = 0; i < this.fullExperienceTable.length; i++) {
</script>

<style lang='scss'>
	@import '../style/themes/_variables-warm.scss';
	@import '../assets/wizard/form-wizard-vue3.scss';

	[id$="invalidStep"].fw-squared-tab {
		background: red !important;
	}
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
	.invalid {
		background: red;
	}
</style>
