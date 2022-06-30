<template>
  <h2 class="traits">Traits</h2>
  <Trait :trait="this.traits.battle" :traitValue="traitValues.battle"/>
  <Trait :trait="this.traits.agility" :traitValue="traitValues.agility"/>
	<Trait :trait="this.traits.spirit" :traitValue="traitValues.spirit"/>
	<Trait :trait="this.traits.knowledge" :traitValue="traitValues.knowledge"/>
	<Trait :trait="this.traits.physique" :traitValue="traitValues.physique"/>
</template>

<script>
  import { ref as vRef } from "vue";
  import Trait from '../components/Trait.vue';
	import experienceTable from '../rules/experienceTable.js';
	import { traits } from '../rules/traits.js'

  import {
    ref as fbRef,
    getDatabase,
  } from "firebase/database";

  export default {
    props: ["traitValues"],
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
        traits
      }
    },
  }
</script>


<style></style>
