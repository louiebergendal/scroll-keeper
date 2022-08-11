<template>
	<div class='card dark padding-right-tiny padding-top-tiny padding-left-tiny'>
		<p>I AM SKILL LEVEL</p>
		{{selectedSkillLevel}}
		<div
			v-for='skill in skills'
			:key='skill.key'
			class='width-whole flex'
		>
			<div v-if="contains(characterTraits, skill.key)" class="bold">
				<input type="radio" class="skill {{skill.key}}" id="{{skill.key}}" name="skill" value="{{skill.key}}" disabled="true">
				<label for="{{skill.key}}">{{skill.name}}</label>
			</div>
			<div v-if="!contains(characterTraits, skill.key)">
				<input type="radio" class="skill {{skill.key}}" id="{{skill.key}}" name="skill" value="{{skill.key}}">
				<label for="{{skill.key}}">{{skill.name}}</label>
			</div>
		</div>
	</div>
</template>

<script>
	import { useStore } from '../../stores/character'
	import { allSkills, canChooseTrait, specificAttributeSkills } from '../../rules/characteristics/traits'
	import { contains } from '../../rules/utils'
	import { flattenCharacter } from '../../utilities/characterFlattener' // FLATTENER IS FOR FLATTENING

	export default {
		props: ['selectedLevel'],
		setup(props) {
			const character = useStore()
			const characterTraits = character.getTraits
			const selectedSkillLevel = props.selectedLevel
			const skills = allSkills()

			console.log("selectedSkillLevel: ", selectedSkillLevel) // CURRENTLY SELECTED LEVEL

			return {
				skills,
				canChooseTrait,
				characterTraits,
				selectedSkillLevel,
				contains
			}
		}
	}

/* 
fundering:
ska man flattena ett formulär fram till currentLevel i levelLadder??
sedan utgå ifrån det formuläret
*/
</script>


<style></style>
