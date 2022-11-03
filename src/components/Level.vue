<template>
	<div :class="{ bold: hasChosen }">
		<div class="align-center level">{{ level }}</div>
		<div class="align-center card light margin-tiny capitalize">
			{{ levelBonus }}
			<span class="" v-if="hasChosen">
				<span v-if="choice">: </span>
				{{ choice }}
			</span></div>
	</div>
</template>

<script>
	export default {
		props: ["level", "levelBonus", "hasChosen", "choice"],
		setup() {
			return {
				
			}
		}
	}
</script>

<style>
	.level {
		background: rgb(255,251,246);
		background: linear-gradient(90deg, rgba(255,251,246,0) 0%, rgba(255,251,246,1) 50%, rgba(255,251,246,0) 100%);	
	}
	.capitalize {
		text-transform: capitalize;
	}
</style>