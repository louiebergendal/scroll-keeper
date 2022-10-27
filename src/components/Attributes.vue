<template>
	<div class='card dark padding-top-small padding-right-tiny padding-left-tiny'>
		<h3 class="margin-top-nano align-center">Grundegenskaper</h3>
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
