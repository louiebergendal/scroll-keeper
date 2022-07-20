<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="attributes margin-top-nano align-center">Attributes</h3>
    <Attribute
      :attribute="attributes.battle"
      :attributeSkills="[attributeSkillsWithOwnership.melee, attributeSkillsWithOwnership.accuracy]"
    />
    <Attribute
      :attribute="attributes.agility"
      :attributeSkills="[attributeSkillsWithOwnership.stealth, attributeSkillsWithOwnership.athletics]"
    />
    <Attribute
      :attribute="attributes.spirit"
      :attributeSkills="[attributeSkillsWithOwnership.extrasensation, attributeSkillsWithOwnership.force]"
    />
    <Attribute
      :attribute="attributes.knowledge"
      :attributeSkills="[attributeSkillsWithOwnership.lore, attributeSkillsWithOwnership.alchemy]"
    />
    <Attribute
      :attribute="attributes.physique"
    />
  </div>
</template>

<script>
  import Attribute from './Attribute.vue';
	import { attributes } from '../rules/attributes.js'
  import { attributeSkills, canChooseTrait } from '../rules/traits.js'
	import { useStore } from '../stores/character'

  export default {
		components: {
      Attribute
    },
    setup() {
      const store = useStore()
      const attributeSkillsWithOwnership = attributeSkills(store.characterTraits)

      return {
        attributes,
        attributeSkillsWithOwnership,
        store
      }
    },
  }
</script>


<style></style>
