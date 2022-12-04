<template>
	<div class='fancy padding-right-tiny padding-left-tiny position-relative'>
		<div class="corner -inner-top-right"></div>
		<div class="corner -inner-bottom-left-side"></div>
		<div class="corner -top-middle"></div>
		<div class="corner -left-middle"></div>
		<Attribute :attribute-prop='attributes.battle' :icon-url-prop='"iconKam"' />
		<Attribute :attribute-prop='attributes.agility' :icon-url-prop='"iconSmi"'/>
		<Attribute :attribute-prop='attributes.spirit' :icon-url-prop='"iconAnd"'/>
		<Attribute :attribute-prop='attributes.knowledge' :icon-url-prop='"iconKun"'/>
		<Attribute :attribute-prop='attributes.physique' :icon-url-prop='"iconFys"'/>
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
