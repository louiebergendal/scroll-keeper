<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="traits margin-top-nano align-center">Traits</h3>
    <Trait
      :trait="this.traits.battle"
      :skills="[skillsWithOwnership.melee, skillsWithOwnership.accuracy]"
    />
    <Trait
      :trait="this.traits.agility"
      :skills="[skillsWithOwnership.stealth, skillsWithOwnership.athletics]"
    />
    <Trait
      :trait="this.traits.spirit"
      :skills="[skillsWithOwnership.extrasensation, skillsWithOwnership.force]"
    />
    <Trait
      :trait="this.traits.knowledge"
      :skills="[skillsWithOwnership.lore, skillsWithOwnership.alchemy]"
    />
    <Trait
      :trait="this.traits.physique"
    />
  </div>
</template>

<script>
  import { ref as vRef } from "vue";
  import Trait from '../components/Trait.vue';
	import experienceTable from '../rules/experienceTableMaker.js';
	import { traits } from '../rules/traits.js'
  import { traitSkills } from '../rules/skills.js'
	import { useStore } from '../stores/character'

  import {
    ref as fbRef,
    getDatabase,
  } from "firebase/database";

  export default {
		components: {
			experienceTable,
      Trait
    },
    setup() {
      const store = useStore()
      const db = getDatabase();

      const battle = vRef(0);
      const agility = vRef(0);
      const spirit = vRef(0);
      const knowledge = vRef(0);
      const physique = vRef(0);
      const skillsWithOwnership = traitSkills(store.characterSkills)

      return {
        battle,
        agility,
        spirit,
        knowledge,
        physique,
        traits,
        skillsWithOwnership,
        store
      }
    },
  }
</script>


<style></style>
