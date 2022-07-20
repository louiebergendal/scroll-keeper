<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="attributes margin-top-nano align-center">Attributes</h3>
    <Attribute
      :attribute="attributes.battle"
      :attributeSkills="[skillsWithOwnership.melee, skillsWithOwnership.accuracy]"
    />
    <Attribute
      :attribute="attributes.agility"
      :attributeSkills="[skillsWithOwnership.stealth, skillsWithOwnership.athletics]"
    />
    <Attribute
      :attribute="attributes.spirit"
      :attributeSkills="[skillsWithOwnership.extrasensation, skillsWithOwnership.force]"
    />
    <Attribute
      :attribute="attributes.knowledge"
      :attributeSkills="[skillsWithOwnership.lore, skillsWithOwnership.alchemy]"
    />
    <Attribute
      :attribute="attributes.physique"
    />
  </div>
</template>

<script>
  import Attribute from './Attribute.vue';
	import { attributes } from '../rules/attributes.js'
  import { attributeSkills, canChooseSkill } from '../rules/traits.js'
	import { useStore } from '../stores/character'

  export default {
		components: {
      Attribute
    },
    setup() {
      const store = useStore()
      const skillsWithOwnership = attributeSkills(store.characterSkills)

      console.log('canChooseSkill: ', canChooseSkill('brawling', store));

      return {
        attributes,
        skillsWithOwnership,
        store
      }
    },
  }
</script>


<style></style>
