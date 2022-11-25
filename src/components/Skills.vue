<template>
	<div class='fancy talents-wrapper padding-left-small padding-right-small padding-bottom-small padding-top-tiny width-whole flex position-relative'>

		<h3 class='align-center margin-bottom-tiny padding-bottom-nano padding-top-nano'>Färdigheter</h3>
		<div
			v-for='skill in independentCharacterSkills(characterStore.sheet.traits)'
			:key='skill.key'
			class='width-whole flex'
		>
			<div 
				:class="{ 'touched-by-error': 
					isTouchedByError(
						skill.key,
						characterStore.sheet.metadata.invalidLevels
					)
				}"
				class='width-whole card medium padding-nano align-center'
			>
				<span class='flextrait-card-align font-size-nano'>
					<span v-if="isBackgroundSkill(skill.key)" class="align left">
						x
						<span>
							{{ skill.name }}
						</span>
					</span>
				</span>
				<span class='flextrait-card-align font-size-nano'>
					<span v-if="!isBackgroundSkill(skill.key)" class="align left">
						o
						<span>
							{{ skill.name }}
						</span>
					</span>
				</span>

			</div>
		</div>



	</div>
</template>

<script>
	import { useCharacterStore } from '../stores/character'
	import { independentCharacterSkills } from '../rules/characteristics/traits'
	import { isTouchedByError } from '../validators/validators'
	import { containsKey } from '../rules/utils'

	export default {
		setup() {
			const characterStore = useCharacterStore()

			return {
				characterStore,
				independentCharacterSkills,
				isTouchedByError,
				containsKey
			}
		},
		methods: {
			isBackgroundSkill(traitKey) {
				const peopleSkillKeysList = Object.values(this.characterStore.history[1].complexPayload.people).flat(2)
				const upbringingSkillKeysList = Object.values(this.characterStore.history[1].complexPayload.upbringing).flat(2)
				const proffessionSkillKeysList = Object.values(this.characterStore.history[1].complexPayload.profession).flat(2)

				if (
					containsKey(traitKey, peopleSkillKeysList)
					||
					containsKey(traitKey, upbringingSkillKeysList)
					||
					containsKey(traitKey, proffessionSkillKeysList)
				) { return true }
				return false
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
