<template>
	<div class='fancy padding-right-tiny padding-left-tiny position-relative'>
		<div class="corner -inner-top-right"></div>
		<div class="corner -inner-bottom-left-side"></div>
		<Attribute :attribute='attributes.battle' :iconUrl='"iconKam"' />
		<Attribute :attribute='attributes.agility' :iconUrl='"iconSmi"'/>
		<Attribute :attribute='attributes.spirit' :iconUrl='"iconAnd"'/>
		<Attribute :attribute='attributes.knowledge' :iconUrl='"iconKun"'/>
		<Attribute :attribute='attributes.physique' :iconUrl='"iconFys"'/>
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
