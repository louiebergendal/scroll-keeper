<template>
	<div class='card dark padding-right-tiny padding-top-tiny padding-left-tiny'>
		<Attribute :attribute='attributes.battle' :showAttributeSkills='true'/>
		<Attribute :attribute='attributes.agility' :showAttributeSkills='true'/>
		<Attribute :attribute='attributes.spirit' :showAttributeSkills='true'/>
		<Attribute :attribute='attributes.knowledge' :showAttributeSkills='true'/>
		<Attribute :attribute='attributes.physique' :showAttributeSkills='true'/>
	</div>
</template>

<script>
	import Attribute from './Attribute.vue'
	import { attributes } from '../rules/characteristics/attributes'
	import { useCharacterStore } from '../stores/character'


	export default {
		components: {
			Attribute
		},
		setup() {
			const annan = useCharacterStore()
			console.log('annan in special!: ', annan.sheet)

			return {
				attributes
			}
		}
	}
</script>


<style></style>
