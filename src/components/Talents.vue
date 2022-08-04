<template>
    <div class='skills-wrapper card dark padding-tiny margin-bottom-nano width-fourth flex'>
        <h3 class='attributes margin-top-nano align-center'>Talanger</h3>
		<div
			v-for='talent in independentTalentsList'
			:key='talent.key'
			class='width-whole flex'
		>
			<div class='width-whole card medium padding-nano margin-nano italic align-center'>
				<span class='font-size-nano'>
                    {{ talent.name }}
				</span>
			</div>
		</div>
    </div>
</template>

<script>
	import { useStore } from '../stores/character'
    import { independentCharacterTalentsWithOwnership } from '../rules/characteristics/traits';
	export default {
        setup() {
			const character = useStore()
            const characterTraitKeys = character.getTraits
            const independentTalentsList = independentCharacterTalentsWithOwnership(characterTraitKeys)
			return {
                independentTalentsList
			}
		}
	}
</script>

<style>
	.skills-wrapper {
		flex-direction: column;
	}
</style>
