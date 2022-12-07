<template>
	<div class='fancy padding-right-tiny padding-left-tiny position-relative'>
		<div class="corner -inner-top-right"></div>
		<div class="corner -inner-bottom-left-side"></div>
		<div class="corner -top-middle"></div>
		<div class="corner -left-middle"></div>
		<Attribute :attributeProp='attributes.battle' :iconUrlProp='"iconKam"' />
		<Attribute :attributeProp='attributes.agility' :iconUrlProp='"iconSmi"'/>
		<Attribute :attributeProp='attributes.spirit' :iconUrlProp='"iconAnd"'/>
		<Attribute :attributeProp='attributes.knowledge' :iconUrlProp='"iconKun"'/>
		<Attribute :attributeProp='attributes.physique' :iconUrlProp='"iconFys"'/>
	</div>
</template>

<script>
	import Attribute from './Attribute.vue'
	import { attributes } from '../../rules/characteristics/attributes'

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
