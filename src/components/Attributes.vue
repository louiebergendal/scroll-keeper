<template>
	<div class='card dark padding-right-tiny padding-top-tiny padding-left-tiny'>
		<Attribute :attribute='attributes.battle' />
		<Attribute :attribute='attributes.agility' />
		<Attribute :attribute='attributes.spirit' />
		<Attribute :attribute='attributes.knowledge' />
		<Attribute :attribute='attributes.physique' />
	</div>
</template>

<script>
	import Attribute from './Attribute.vue'
	import { attributes } from '../rules/characteristics/attributes'
	
	export default {
		components: {
			Attribute
		},
		setup() {
			return {
				attributes
			}
		}
	}
</script>


<style></style>
