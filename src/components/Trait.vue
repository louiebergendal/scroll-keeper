<template>
	<div class="trait padding-right-tiny padding-left-tiny margin-bottom-nano flex">
		<div class="width-whole flex margin-bottom-nano">
			<div class="padding-nano width-half align-center">
				<span class="font-size-tiny bold">{{ trait.shortName }}</span>
			</div>
			<div class="trait-value padding-left-small padding-nano margin-left-tiny align-center width-half">
				<span class="font-size-tiny bold">{{ traitValue }}</span>
			</div>
		</div>
		<div
			v-for="skill in skills"
			:key="skill.key"
			class="width-whole flex"
		>
			<div class="width-half card medium padding-nano italic align-center">
				<span class="font-size-nano">
					{{ skill.name }}
				</span>
			</div>
			<div class="skill-value card light padding-nano flex width-half margin-left-tiny align-center ">
				<div class="padding-left-small padding-nano width-fourth">
					<span
						v-if="skill.hasSkill"
						class="vertical-correction font-size-nano bold"
					>
							{{ skill.addBonus(traitValue) }}
					</span>
					<span
						v-if="!skill.hasSkill"
						class="vertical-correction font-size-nano bold">
							{{ traitValue }}
					</span>
				</div>
				<div class="padding-nano italic">
					<span
						v-if="skill.hasSkill"
						class="vertical-correction font-size-nano align-right">
							{{ setTraitValueName(skill.addBonus(traitValue)) }}
					</span>
					<span
						v-if="!skill.hasSkill"
						class="vertical-correction font-size-nano align-right">
							{{ setTraitValueName(traitValue) }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { setTraitValueName } from '../rules/traits'
	import { useStore } from '../stores/character'


	export default {
		props: ["trait", "skills"],
		setup(props) {
			const store = useStore()

			const addHasSkillToSkill = () => {
				let skillList = {}
				Object.assign(skillList, props.skills) // PROPS ARE READ ONLY
				Object.keys(skillList).forEach(skillIndex => {
					store.characterSheet.skills.forEach(characterSkill => {
						if (characterSkill === skillList[skillIndex].key ) {
							skillList[skillIndex].hasSkill = true
						}
					})
				})
				return skillList
			}

			const skillList = addHasSkillToSkill()
			const traitValue = store.characterSheet.traits[props.trait.key]
			return {
				setTraitValueName,
				addHasSkillToSkill,
				skillList,
				traitValue,
				store
			}
		}
	}
</script>

<style>
	.trait {
		flex-direction: column;
	}
	.skill-value {
		justify-content: space-around;
	}
	.vertical-correction {
		vertical-align: text-bottom;
	}
	.trait-value {
		background: rgb(255,251,246);
		background: linear-gradient(90deg, rgba(255,251,246,0) 0%, rgba(255,251,246,1) 50%, rgba(255,251,246,0) 100%);	
	}
</style>