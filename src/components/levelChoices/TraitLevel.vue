<template>
    <div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Välj en grej!</h3>
		Vald bonus: {{ getTraitNiceName(tempLevelChoiceKey) }}

		<div v-for="(trait, key) in traits" :key='key' class="flex">
			<!-- trait is already owned -->
			<div v-if="contains(tempcharacterTraits, trait.key)" class="card dark flex width-whole">
				<input type="radio" id="{{trait.key}}" disabled="true" checked class="margin-tiny"/>
				<label for="{{trait.key}}" class="bold font-contrast-low"> {{ trait.name }} </label>
			</div>

			<!-- trait is not owned and cannot be chosen -->
			<div v-if="(!contains(tempcharacterTraits, trait.key) && !canChooseTrait(trait.key, tempCharacterSheet))" class="card light width-whole">
				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait"  disabled="true" class="margin-tiny"/>
				<label for="{{trait.key}}" class="font-contrast-lowest"> {{ trait.name }} </label>
			</div>

			<!-- trait is not owned and can be chosen -->
			<div v-if="(!contains(tempcharacterTraits, trait.key) && canChooseTrait(trait.key, tempCharacterSheet))" :checked="trait.key === tempLevelChoiceKey" class="card medium width-whole">
				<input type="radio" id="{{trait.key}}" :value='trait.key' v-model="tempLevelChoiceKey" name="trait" class="margin-tiny"/>
				<label for="{{trait.key}}"> {{ trait.name }} </label>
			</div>
		</div>
		<button type="submit" class="margin-top-tiny margin-left-nano">Submitta!</button>
	</div>
</template>

<script>
	import { useCharacterStore } from '../../stores/character'
	import { ref } from 'vue';
	import { allSkills, allTalents, canChooseTrait, getTraitNiceName } from '../../rules/characteristics/traits'
	import { contains } from '../../rules/utils'
	import { flattenCharacter } from '../../utilities/characterFlattener'

	export default {
		props: ['selectedLevel', 'traitType'],
		setup(props) {
			const character = useCharacterStore()
			const characterHistory = character.getHistory
			const selectedLevel = props.selectedLevel
            const traitType = props.traitType
			const originalLevelChoiceKey = characterHistory.history[selectedLevel].choice
			const tempLevelChoiceKey = ref(originalLevelChoiceKey)
			const tempCharacterSheet = flattenCharacter(characterHistory, selectedLevel - 1) // -1 to account for current lvling
			const tempcharacterTraits = tempCharacterSheet.traits

            let traits
            if (traitType === 'skill') { traits = allSkills() }
            if (traitType === 'talent') { traits = allTalents() }

			return {
                traitType,
				traits,
				tempcharacterTraits,
				tempCharacterSheet,
				tempLevelChoiceKey,
				contains,
				canChooseTrait,
				getTraitNiceName,
			}
		}
	}
</script>


<style></style>
