<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="traits margin-top-nano align-center">Traits</h3>
    <Trait
      :trait="traits.battle"
      :skills="[skillsWithOwnership.melee, skillsWithOwnership.accuracy]"
    />
    <Trait
      :trait="traits.agility"
      :skills="[skillsWithOwnership.stealth, skillsWithOwnership.athletics]"
    />
    <Trait
      :trait="traits.spirit"
      :skills="[skillsWithOwnership.extrasensation, skillsWithOwnership.force]"
    />
    <Trait
      :trait="traits.knowledge"
      :skills="[skillsWithOwnership.lore, skillsWithOwnership.alchemy]"
    />
    <Trait
      :trait="this.traits.physique"
    />
  </div>
</template>

<script>
  import Trait from '../components/Trait.vue';
	import { traits } from '../rules/traits.js'
  import { traitSkills } from '../rules/skills.js'
	import { useStore } from '../stores/character'

  export default {
		components: {
      Trait
    },
    setup() {
      const store = useStore()

      const skillsWithOwnership = traitSkills(store.characterSkills)

      return {
        traits,
        skillsWithOwnership,
        store
      }
    },
  }
</script>


<style></style>
