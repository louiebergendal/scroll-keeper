<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="traits margin-top-nano align-center">Traits</h3>
    <Trait
      :trait="this.traits.battle"
      :traitSkills="[traitSkills.melee, traitSkills.accuracy]"
    />
    <Trait
      :trait="this.traits.agility"
      :traitSkills="[traitSkills.stealth, traitSkills.athletics]"
    />
    <Trait
      :trait="this.traits.spirit"
      :traitSkills="[traitSkills.force, traitSkills.extrasensation]"
    />
    <Trait
      :trait="this.traits.knowledge"
      :traitSkills="[traitSkills.lore, traitSkills.alchemy]"
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
      const db = getDatabase();

      const battle = vRef(0);
      const agility = vRef(0);
      const spirit = vRef(0);
      const knowledge = vRef(0);
      const physique = vRef(0);

      return {
        battle,
        agility,
        spirit,
        knowledge,
        physique,
        traits,
        traitSkills
      }
    },
  }
</script>


<style></style>
