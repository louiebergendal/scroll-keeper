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
				<span
					v-if="skill.hasSkill"
					class="font-size-nano bold">
						- {{ skill.name }} -
				</span>
				<span
					v-if="!skill.hasSkill"
					class="font-size-nano">
						{{ skill.name }}
				</span>
			</div>
			<div class="skill-value card light padding-nano flex width-half margin-left-tiny">
				<div class="padding-left-small padding-nano width-fourth padding-left-huge">
					<span
						v-if="skill.hasSkill"
						class="vertical-correction font-size-nano bold">
							{{ skill.addBonus(traitValue) }}
					</span>
					<span
						v-if="!skill.hasSkill"
						class="vertical-correction font-size-nano">
							{{ traitValue }}
					</span>
				</div>
				<div class="padding-nano italic padding-right-medium">
					<span
						v-if="skill.hasSkill"
						class="vertical-correction font-size-nano align-right bold">
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
			const traitValue = store.characterTraits[props.trait.key]
			return {
				setTraitValueName,
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
		justify-content: space-between;
	}
	.vertical-correction {
		vertical-align: text-bottom;
	}
	.trait-value {
		background: rgb(255,251,246);
		background: linear-gradient(90deg, rgba(255,251,246,0) 0%, rgba(255,251,246,1) 50%, rgba(255,251,246,0) 100%);
	}
</style>
