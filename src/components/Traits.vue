<template>
  <div class="traits">Traits</div>
</template>

<script>
import { ref as vRef } from "vue";
import {
  ref as fbRef,
  getDatabase,
} from "firebase/database";

export default {
  setup() {
    const db = getDatabase();

    const battle = vRef(0);
    const agility = vRef(0);
    const spirit = vRef(0);
    const knowledge = vRef(0);
    const physique = vRef(0);

    const traitNames = {
      battle: {
        longName: 'Kamp',
        shortName: 'KAM'
      },
      agility: {
        longName: 'Smidighet',
        shortName: 'SMI'
      },
      spirit: {
        longName: 'Andlighet',
        shortName: 'AND'
      },
      knowledge: {
        longName: 'Kunskap',
        shortName: 'KUN'
      },
      physique: {
        longName: 'Fysik',
        shortName: 'FYS'
      }
    };
    console.log("does this load?");
    return {
      battle,
      agility,
      spirit,
      knowledge,
      physique,
      traitNames
    }
  },
}
</script>


<style></style>
