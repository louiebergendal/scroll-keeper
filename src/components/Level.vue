<template>
	<p :class="{ bold: hasChosen }">
		{{ level }}: {{ levelBonus }}<br/>
		<span v-if="hasChosen">{{ choice }}</span>
	</p>
</template>

<script>
	export default {
		props: ["level", "levelBonus", "hasChosen", "choice"],
		setup(props) {
			return {
				
			}
		}
	}
</script>

<style></style>